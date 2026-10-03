/**
 * 自动化领域逻辑测试（纯函数，无 Web Audio）：
 *  - 关键帧稳定 id、严格时间顺序、同刻冲突拒绝且原轨保留
 *  - 逆序移动被拒绝（不静默重排）
 *  - 提交/撤销产生单调 revision 与可审计历史；撤销恢复前态
 *  - 采样（2D/3D/方位读数同源）线性插值、持住、循环回绕、yaw 最短路径
 *  - buildSchedule 输出 AudioContext 绝对时间事件；循环跨周期复制
 *  - v1 工程迁移补 automation/orientation，脏关键帧被丢弃但不阻断
 */
import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  AutomationError,
  buildSchedule,
  clearKeyframes,
  commitKeyframe,
  deleteKeyframe,
  emptyLane,
  isSorted,
  lerpAngle,
  migrateDoc,
  moveKeyframe,
  sampleLane,
  undoLast,
} from '../src/lib/automation.ts';
import type { ProjectDoc } from '../src/types.ts';

const pos = (x: number, y = 0, z = 0) => ({ x, y, z });

describe('关键帧提交：稳定 id / 顺序 / 冲突拒绝', () => {
  it('提交后按时间排序保存，帧 id 稳定不变', () => {
    let lane = emptyLane('t');
    const r1 = commitKeyframe(lane, { time: 1, param: 'position', position: pos(1) });
    lane = r1.lane;
    const r0 = commitKeyframe(lane, { time: 0, param: 'position', position: pos(0) });
    lane = r0.lane;
    assert.deepEqual(
      lane.keyframes.map((k) => k.time),
      [0, 1],
    );
    // 中间插入允许（既有帧相对顺序不变），id 保持
    const idsBefore = lane.keyframes.map((k) => k.id);
    const rm = commitKeyframe(lane, { time: 0.5, param: 'gain', gain: 0.5 });
    lane = rm.lane;
    assert.deepEqual(
      lane.keyframes.map((k) => k.time),
      [0, 0.5, 1],
    );
    const posFrames = lane.keyframes.filter((k) => k.param === 'position').map((k) => k.id);
    assert.deepEqual(posFrames.sort(), [...idsBefore].sort());
    assert.ok(isSorted(lane));
  });

  it('同一时刻提交冲突关键帧被拒绝，原轨原样保留', () => {
    let lane = emptyLane('t');
    lane = commitKeyframe(lane, { time: 0.5, param: 'position', position: pos(1) }).lane;
    const snapshot = lane.keyframes;
    assert.throws(
      () => commitKeyframe(lane, { time: 0.5, param: 'gain', gain: 0.3 }),
      (e: unknown) => e instanceof AutomationError && e.code === 'conflict',
    );
    // 原数组引用与内容不变
    assert.equal(lane.keyframes, snapshot);
    assert.equal(lane.keyframes.length, 1);
    assert.equal(lane.revisionSeq, 1, '拒绝不产生新版本');
  });

  it('逆序移动（跨过相邻帧）被拒绝，不静默重排', () => {
    let lane = emptyLane('t');
    lane = commitKeyframe(lane, { time: 0, param: 'gain', gain: 0 }).lane;
    const mid = commitKeyframe(lane, { time: 1, param: 'gain', gain: 0.5 });
    lane = mid.lane;
    lane = commitKeyframe(lane, { time: 2, param: 'gain', gain: 1 }).lane;
    const midId = lane.keyframes.find((k) => k.time === 1)!.id;
    assert.throws(
      () => moveKeyframe(lane, midId, 3),
      (e: unknown) => e instanceof AutomationError && e.code === 'conflict',
    );
    // 移动到已占用时刻同样拒绝
    assert.throws(
      () => moveKeyframe(lane, midId, 2),
      (e: unknown) => e instanceof AutomationError && e.code === 'conflict',
    );
    assert.deepEqual(
      lane.keyframes.map((k) => k.time),
      [0, 1, 2],
    );
  });

  it('非法值/负时间拒绝', () => {
    const lane = emptyLane('t');
    assert.throws(() => commitKeyframe(lane, { time: -1, param: 'gain', gain: 1 }), AutomationError);
    assert.throws(
      () => commitKeyframe(lane, { time: 1, param: 'position', position: pos(NaN) }),
      AutomationError,
    );
    assert.throws(
      () => commitKeyframe(lane, { time: 1, param: 'position' }),
      AutomationError,
    );
  });

  it('删除不存在帧抛 not-found', () => {
    assert.throws(() => deleteKeyframe(emptyLane('t'), 'nope'), AutomationError);
  });
});

describe('版本与撤销审计', () => {
  it('每次提交/清空递增 revision，撤销恢复前态且自身留痕', () => {
    let lane = emptyLane('t');
    lane = commitKeyframe(lane, { time: 0, param: 'gain', gain: 0.2 }).lane;
    lane = commitKeyframe(lane, { time: 1, param: 'gain', gain: 0.8 }).lane;
    assert.equal(lane.revisionSeq, 2);
    const cleared = clearKeyframes(lane);
    lane = cleared.lane;
    assert.equal(lane.keyframes.length, 0);
    assert.equal(lane.revisionSeq, 3);
    assert.equal(cleared.revision.action, 'clear');
    assert.equal(cleared.revision.pre?.length, 2);

    const undone = undoLast(lane);
    lane = undone.lane;
    assert.equal(undone.revision.action, 'undo');
    assert.equal(undone.revision.reverts, cleared.revision.id);
    assert.equal(lane.keyframes.length, 2, '撤销应恢复清空之前的两帧');
    assert.equal(lane.revisionSeq, 4, '撤销本身是新版本');
  });

  it('连续撤销沿版本链回退', () => {
    let lane = emptyLane('t');
    lane = commitKeyframe(lane, { time: 0, param: 'gain', gain: 0 }).lane;
    lane = commitKeyframe(lane, { time: 1, param: 'gain', gain: 1 }).lane;
    lane = undoLast(lane).lane; // 撤销第二次提交 → 剩 1 帧
    assert.equal(lane.keyframes.length, 1);
    lane = undoLast(lane).lane; // 撤销撤销 → 又剩 2 帧
    assert.equal(lane.keyframes.length, 2);
  });
});

describe('采样：2D/3D/方位/Panner 调度唯一来源', () => {
  function lane() {
    let l = emptyLane('t');
    l = commitKeyframe(l, { time: 0, param: 'position', position: pos(0) }).lane;
    l = commitKeyframe(l, { time: 2, param: 'position', position: pos(4, 2) }).lane;
    l = commitKeyframe(l, { time: 1, param: 'gain', gain: 1 }).lane;
    l = commitKeyframe(l, { time: 3, param: 'gain', gain: 0 }).lane;
    return l;
  }

  it('线性插值；首帧前为静态基线（传入 baseline）；末帧后持住末值', () => {
    const l = lane();
    const mid = sampleLane(l, 1);
    assert.ok(Math.abs(mid.position!.x - 2) < 1e-9);
    assert.ok(Math.abs(mid.position!.y - 1) < 1e-9);
    assert.ok(Math.abs(mid.gain! - 1) < 1e-9, 't=1 恰为增益首帧，值=1');
    // 增益帧 t=1(值1)→t=3(值0)，t=2 为中点 0.5
    const between = sampleLane(l, 2);
    assert.ok(Math.abs(between.gain! - 0.5) < 1e-9);
    // 首帧之前：无 baseline 缺省，有 baseline 持住基线
    const beforeNone = sampleLane(l, -5);
    assert.equal(beforeNone.position, undefined);
    assert.equal(beforeNone.gain, undefined);
    const base = { position: pos(7, 8, 9), gain: 0.42 };
    const before = sampleLane(l, -5, undefined, base);
    assert.ok(Math.abs(before.position!.x - 7) < 1e-9);
    assert.ok(Math.abs(before.gain! - 0.42) < 1e-9);
    const after = sampleLane(l, 99);
    assert.ok(Math.abs(after.position!.x - 4) < 1e-9);
    assert.ok(Math.abs(after.gain! - 0) < 1e-9);
  });

  it('循环回绕：0 与 period 同值，跨边界插值连续', () => {
    let l = emptyLane('t');
    l = commitKeyframe(l, { time: 0, param: 'position', position: pos(0) }).lane;
    l = commitKeyframe(l, { time: 1, param: 'position', position: pos(2) }).lane;
    const atWrap = sampleLane(l, 2, 2);
    assert.ok(Math.abs(atWrap.position!.x - 0) < 1e-9, 't=period 应等于 t=0');
    // 周期 2：1.5 处在最后帧(1,x2) 与第一帧(2,x0) 之间
    const cross = sampleLane(l, 1.5, 2);
    assert.ok(Math.abs(cross.position!.x - 1) < 1e-9, `跨边界中点应为 1，实际 ${cross.position!.x}`);
  });

  it('yaw 最短角路径插值：170°→-170° 走 +20° 而不是 -340°', () => {
    const d90 = lerpAngle((170 * Math.PI) / 180, (-170 * Math.PI) / 180, 0.5);
    assert.ok(Math.abs(d90 - Math.PI) < 1e-9, `半程应≈π，实际 ${d90}`);
    let l = emptyLane('t');
    l = commitKeyframe(l, {
      time: 0,
      param: 'orientation',
      orientation: { yaw: (170 * Math.PI) / 180, pitch: 0 },
    }).lane;
    l = commitKeyframe(l, {
      time: 1,
      param: 'orientation',
      orientation: { yaw: (-170 * Math.PI) / 180, pitch: 0 },
    }).lane;
    const s = sampleLane(l, 0.5);
    assert.ok(Math.abs(s.orientation!.yaw - Math.PI) < 1e-6);
  });

  it('停用 lane 时采样为空（回退到静态基线）', () => {
    const l = { ...lane(), enabled: false };
    assert.deepEqual(sampleLane(l, 1), {});
  });
});

describe('buildSchedule：AudioContext 时钟事件', () => {
  it('非循环：窗口起点 setValue，窗口内关键帧 ramp，绝对时间换算正确', () => {
    let l = emptyLane('t');
    l = commitKeyframe(l, { time: 0, param: 'position', position: pos(0) }).lane;
    l = commitKeyframe(l, { time: 1, param: 'position', position: pos(10) }).lane;
    // startOffset=2, baseAbsTime=5：媒体 t 对应时钟 5+(t-2)
    const sch = buildSchedule({
      lane: l,
      fromMedia: 2,
      toMedia: 2.5,
      baseAbsTime: 5,
      period: undefined,
      startOffset: 2,
    });
    const xSet = sch.events.filter((e) => e.component === 'x' && e.kind === 'setValue');
    assert.equal(xSet.length, 1);
    assert.ok(Math.abs(xSet[0].time - 5) < 1e-9);
    assert.ok(Math.abs(xSet[0].value - 10) < 1e-9, '媒体2s已越过末帧，持住10');
  });

  it('循环：窗口跨回绕点时复制下一周期锚点', () => {
    let l = emptyLane('t');
    l = commitKeyframe(l, { time: 0, param: 'gain', gain: 0 }).lane;
    l = commitKeyframe(l, { time: 0.5, param: 'gain', gain: 1 }).lane;
    const sch = buildSchedule({
      lane: l,
      fromMedia: 0.9,
      toMedia: 1.3,
      baseAbsTime: 0,
      period: 1,
      startOffset: 0.9,
    });
    const gains = sch.events.filter((e) => e.component === 'gain');
    // 下一周的媒体 1.0（gain0）换算到时钟：0 + (1.0-0.9) = 0.1
    assert.ok(
      gains.some((e) => Math.abs(e.time - 0.1) < 1e-9 && Math.abs(e.value) < 1e-9),
      '回绕点应复制下一周期 gain=0 锚点到绝对时钟 0.1s',
    );
  });

  it('朝向帧生成与 forwardVector 同源的 oX/oY/oZ 序列', () => {
    let l = emptyLane('t');
    l = commitKeyframe(l, {
      time: 0,
      param: 'orientation',
      orientation: { yaw: Math.PI / 2, pitch: 0 },
    }).lane;
    const sch = buildSchedule({
      lane: l,
      fromMedia: 0,
      toMedia: 0.1,
      baseAbsTime: 0,
      period: undefined,
      startOffset: 0,
    });
    const ox = sch.events.find((e) => e.component === 'oX' && Math.abs(e.time) < 1e-9);
    const oz = sch.events.find((e) => e.component === 'oZ' && Math.abs(e.time) < 1e-9);
    assert.ok(ox && Math.abs(ox.value - 1) < 1e-9, 'yaw=90° 前方 +X');
    assert.ok(oz && Math.abs(oz.value - 0) < 1e-9);
  });
});

describe('工程迁移（IndexedDB 重载）', () => {
  it('v1 文档补 automation 与 orientation，升到 v2，不自动播放字段', () => {
    const v1 = {
      version: 1,
      tracks: [
        {
          id: 'a',
          name: 'A',
          sourceType: 'tone',
          loop: true,
          muted: false,
          solo: false,
          gain: 0.9,
          channel: 0,
          color: '#fff',
          position: { x: 1, y: 0, z: 0 },
          status: 'ready',
        },
      ],
      listener: { position: { x: 0, y: 0, z: 3 }, yaw: 0, pitch: 0, earHeight: 0 },
      spatial: {
        distanceModel: 'inverse',
        refDistance: 1,
        rolloffFactor: 1,
        maxDistance: 30,
        positionTimeConstant: 0.06,
        hrtfIR: 'none',
      },
      busGain: 1,
      masterGain: 0.9,
      savedAt: 0,
    } as unknown as ProjectDoc;
    const m = migrateDoc(v1)!;
    assert.equal(m.version, 2);
    assert.ok(m.automation);
    assert.deepEqual(m.tracks[0].orientation, { yaw: 0, pitch: 0 });
  });

  it('脏关键帧（同刻/逆序/缺值）被清理，孤儿 lane 被丢弃，不抛异常', () => {
    const dirty = {
      version: 2,
      tracks: [
        {
          id: 'a',
          name: 'A',
          sourceType: 'tone',
          loop: false,
          muted: false,
          solo: false,
          gain: 1,
          channel: 0,
          color: '#fff',
          position: { x: 0, y: 0, z: 0 },
          orientation: { yaw: 0, pitch: 0 },
          status: 'ready',
        },
      ],
      automation: {
        a: {
          trackId: 'a',
          version: 1,
          enabled: true,
          revisionSeq: 0,
          revisions: [],
          keyframes: [
            { id: 'g1', time: 1, param: 'gain', gain: 1 },
            { id: 'g2', time: 1, param: 'gain', gain: 0 }, // 同刻丢弃
            { id: 'g3', time: 0.5, param: 'gain', gain: 0.5 }, // 逆序丢弃
            { id: 'bad', time: 2, param: 'position' }, // 缺值丢弃
          ],
        },
        ghost: {
          trackId: 'ghost',
          version: 1,
          enabled: true,
          revisionSeq: 0,
          revisions: [],
          keyframes: [{ id: 'x', time: 0, param: 'gain', gain: 1 }],
        },
      },
      listener: { position: { x: 0, y: 0, z: 0 }, yaw: 0, pitch: 0, earHeight: 0 },
      spatial: {
        distanceModel: 'inverse',
        refDistance: 1,
        rolloffFactor: 1,
        maxDistance: 30,
        positionTimeConstant: 0.06,
        hrtfIR: 'none',
      },
      busGain: 1,
      masterGain: 0.9,
      savedAt: 0,
    } as unknown as ProjectDoc;
    const m = migrateDoc(dirty)!;
    assert.deepEqual(
      m.automation.a.keyframes.map((k) => k.id),
      ['g1'],
    );
    assert.equal(m.automation.ghost, undefined);
  });

  it('完全损坏的文档返回 null', () => {
    assert.equal(migrateDoc(null), null);
    assert.equal(migrateDoc({}), null);
  });
});
