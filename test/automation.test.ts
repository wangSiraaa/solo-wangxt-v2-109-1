/**
 * 空间自动化纯逻辑测试（无 DOM / 无 Web Audio）：
 *  - 关键帧稳定 id、顺序与版本
 *  - 同刻 / 逆序提交被显式拒绝，原轨保留
 *  - 插值/阶梯/循环采样
 *  - 撤销/重做审计与版本冲突
 *  - v1 → v2 工程迁移
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  addKeyframe,
  AutomationError,
  clearLane,
  emptyHistory,
  emptyLane,
  migrateDoc,
  pushHistory,
  redoHistory,
  removeKeyframe,
  sampleLane,
  sampleLaneLoop,
  undoHistory,
  updateKeyframe,
} from '../src/lib/automation.ts';

describe('空间自动化轨：标识、顺序、版本', () => {
  it('关键帧按时间保存且 revision 单调递增；稳定 id 在编辑中保持', () => {
    let lane = emptyLane();
    lane = addKeyframe(lane, { time: 1, params: { position: { x: 1, y: 0, z: 0 } } });
    lane = addKeyframe(lane, { time: 0, params: { position: { x: 0, y: 0, z: 0 } } });
    assert.equal(lane.keyframes[0].time, 0);
    assert.equal(lane.keyframes[1].time, 1);
    assert.equal(lane.revision, 2);
    const id = lane.keyframes[1].id;
    lane = updateKeyframe(lane, { id, time: 2 });
    assert.equal(lane.keyframes.find((k) => k.id === id)!.time, 2);
    assert.equal(lane.revision, 3);
  });

  it('同一时刻提交冲突关键帧被拒绝，原轨保持不变', () => {
    let lane = addKeyframe(emptyLane(), {
      time: 0.5,
      params: { position: { x: 1, y: 0, z: 0 } },
    });
    const snapshot = JSON.parse(JSON.stringify(lane));
    assert.throws(
      () => addKeyframe(lane, { time: 0.5, params: { gain: 0.2 } }),
      (err: unknown) => err instanceof AutomationError && err.code === 'DUP_TIME',
    );
    assert.deepEqual(JSON.parse(JSON.stringify(lane)), snapshot);
    assert.equal(lane.keyframes.length, 1);
    assert.equal(lane.revision, snapshot.revision);
  });

  it('改时间越过相邻帧（逆序）被拒绝，绝不静默重排', () => {
    let lane = emptyLane();
    lane = addKeyframe(lane, { time: 0, params: { gain: 0 } });
    lane = addKeyframe(lane, { time: 1, params: { gain: 1 } });
    const secondId = lane.keyframes[1].id;
    assert.throws(
      () => updateKeyframe(lane, { id: secondId, time: 0 }),
      (err: unknown) => err instanceof AutomationError && err.code === 'ORDER_VIOLATION',
    );
    assert.throws(
      () => updateKeyframe(lane, { id: secondId, time: -1 }),
      AutomationError,
    );
    // 原顺序未被改动
    assert.deepEqual(lane.keyframes.map((k) => k.time), [0, 1]);
  });

  it('删除/清空均产生新版本，且不存在的 id 报错', () => {
    let lane = addKeyframe(emptyLane(), { time: 0, params: { gain: 0.4 } });
    const id = lane.keyframes[0].id;
    lane = removeKeyframe(lane, id);
    assert.equal(lane.keyframes.length, 0);
    assert.equal(lane.revision, 2);
    assert.throws(() => removeKeyframe(lane, id), AutomationError);
    lane = addKeyframe(lane, { time: 0, params: { gain: 0.4 } });
    const revBefore = lane.revision;
    const cleared = clearLane(lane);
    assert.equal(cleared.revision, revBefore + 1);
  });

  it('非法值被拒绝：非有限坐标、零朝向向量、超界增益', () => {
    assert.throws(
      () => addKeyframe(emptyLane(), { time: 0, params: { position: { x: NaN, y: 0, z: 0 } } }),
      (e: unknown) => e instanceof AutomationError && e.code === 'BAD_VALUE',
    );
    assert.throws(
      () => addKeyframe(emptyLane(), { time: 0, params: { orientation: { x: 0, y: 0, z: 0 } } }),
      AutomationError,
    );
    assert.throws(
      () => addKeyframe(emptyLane(), { time: 0, params: { gain: 2 } }),
      AutomationError,
    );
  });
});

describe('采样：插值、阶梯、保持、循环', () => {
  const lane = (() => {
    let l = emptyLane();
    l = addKeyframe(l, { time: 0, params: { position: { x: -10, y: 0, z: 0 }, gain: 0 } });
    l = addKeyframe(l, { time: 1, params: { position: { x: 10, y: 0, z: 0 }, gain: 1 } });
    return l;
  })();

  it('段内线性插值；起点之前不接管，末尾之后保持末值', () => {
    assert.equal(sampleLane(lane, -1).position, undefined);
    assert.equal(sampleLane(lane, 0).position!.x, -10);
    assert.equal(sampleLane(lane, 0.5).position!.x, 0);
    assert.equal(sampleLane(lane, 0.25).gain, 0.25);
    assert.equal(sampleLane(lane, 2).position!.x, 10);
  });

  it('稀疏参数：仅一个关键帧承载的参数在全局保持恒定（阶梯）', () => {
    let l = addKeyframe(emptyLane(), {
      time: 0,
      params: { position: { x: 0, y: 0, z: 0 } },
    });
    l = addKeyframe(l, { time: 1, params: { position: { x: 4, y: 0, z: 0 }, gain: 0.5 } });
    assert.equal(sampleLane(l, 0).gain, undefined); // gain 在 t<1 未出现
    assert.equal(sampleLane(l, 1).gain, 0.5);
    assert.equal(sampleLane(l, 9).gain, 0.5); // 最后值保持
  });

  it('循环采样把播放头折叠回周期', () => {
    assert.ok(Math.abs(sampleLaneLoop(lane, 1.5, 1).position!.x - 0) < 1e-9);
    assert.ok(Math.abs(sampleLaneLoop(lane, 2, 1).position!.x - -10) < 1e-9);
  });
});

describe('撤销/重做历史：可审计、版本冲突拒绝', () => {
  it('撤销回到 before 快照，重做恢复；新编辑清空 redo', () => {
    let lane = addKeyframe(emptyLane(), { time: 0, params: { gain: 0.5 } });
    const rev1 = lane.revision;
    let history = emptyHistory();
    const before = JSON.parse(JSON.stringify(lane));
    const after2 = addKeyframe(lane, { time: 1, params: { gain: 1 } });
    history = pushHistory(history, { trackId: 't', label: 'add', before: lane, after: after2 });
    lane = after2;

    const lanes = new Map([['t', lane]]);
    const u = undoHistory(history, lanes);
    assert.equal(u.lane.revision, rev1);
    assert.deepEqual(u.lane.keyframes.length, 1);
    history = u.history;
    lane = u.lane;

    const lanes2 = new Map([['t', lane]]);
    const r = redoHistory(history, lanes2);
    assert.equal(r.lane.keyframes.length, 2);
    history = r.history;
    lane = r.lane;
    void before;

    // 新编辑后 redo 清空
    const after3 = updateKeyframe(lane, { id: lane.keyframes[0].id, params: { gain: 0.2 } });
    history = pushHistory(history, { trackId: 't', label: 'edit', before: lane, after: after3 });
    assert.equal(history.redo.length, 0);
    assert.equal(history.undo.length, 2);
  });

  it('当前轨 revision 与历史快照不一致时拒绝撤销（防止覆盖新编辑）', () => {
    let lane = addKeyframe(emptyLane(), { time: 0, params: { gain: 0.5 } });
    const lane2 = addKeyframe(lane, { time: 1, params: { gain: 1 } });
    const history = pushHistory(emptyHistory(), {
      trackId: 't',
      label: 'add',
      before: lane,
      after: lane2,
    });
    // 又发生了一次未入栈编辑 → revision 偏离 after
    const diverged = addKeyframe(lane2, { time: 2, params: { gain: 0.9 } });
    assert.throws(
      () => undoHistory(history, new Map([['t', diverged]])),
      (e: unknown) => e instanceof AutomationError && e.code === 'REVISION_MISMATCH',
    );
  });
});

describe('工程迁移', () => {
  it('v1 工程（无 automation）迁移为 v2，空自动化轨且不报错', () => {
    const v1 = {
      version: 1,
      tracks: [
        {
          id: 'x',
          name: 'n',
          sourceType: 'tone',
          loop: true,
          muted: false,
          solo: false,
          gain: 1,
          channel: 0,
          color: '#fff',
          position: { x: 0, y: 0, z: 0 },
          status: 'ready',
        },
      ],
      listener: { position: { x: 0, y: 0, z: 0 }, yaw: 0, pitch: 0, earHeight: 0 },
      spatial: {
        distanceModel: 'inverse',
        refDistance: 1,
        rolloffFactor: 1,
        maxDistance: 30,
        positionTimeConstant: 0.05,
        hrtfIR: 'none',
      },
      busGain: 1,
      masterGain: 1,
      savedAt: 0,
    };
    const doc = migrateDoc(v1);
    assert.ok(doc);
    assert.equal(doc!.version, 2);
    assert.equal(doc!.tracks[0].automation.keyframes.length, 0);
    assert.deepEqual(doc!.automationHistory.undo, []);
  });

  it('损坏输入返回 null；乱序/同刻脏数据在加载期规整（仅迁移路径）', () => {
    assert.equal(migrateDoc(null), null);
    const doc = migrateDoc({
      version: 2,
      tracks: [
        {
          id: 'x',
          name: 'n',
          sourceType: 'tone',
          loop: true,
          muted: false,
          solo: false,
          gain: 1,
          channel: 0,
          color: '#fff',
          position: { x: 0, y: 0, z: 0 },
          status: 'ready',
          automation: {
            schema: 1,
            revision: 5,
            keyframes: [
              { id: 'b', time: 2, params: { gain: 0.5 } },
              { id: 'a', time: 0, params: { position: { x: 1, y: 0, z: 0 } } },
              { id: 'bad', time: -3, params: { gain: 0.1 } },
            ],
          },
        },
      ],
      listener: { position: { x: 0, y: 0, z: 0 }, yaw: 0, pitch: 0, earHeight: 0 },
      spatial: {
        distanceModel: 'inverse',
        refDistance: 1,
        rolloffFactor: 1,
        maxDistance: 30,
        positionTimeConstant: 0.05,
        hrtfIR: 'none',
      },
      busGain: 1,
      masterGain: 1,
      savedAt: 0,
    });
    assert.deepEqual(doc!.tracks[0].automation.keyframes.map((k) => k.time), [0, 2]);
  });
});
