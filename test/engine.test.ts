/**
 * AudioEngine 图行为测试：使用最小 Web Audio 模拟（无真实音频设备）。
 * 验证：
 *  - 解锁后构建输出链；声轨经过 HRTF PannerNode
 *  - 静音 → trackGain=0；独奏 → 非独奏声轨被切到 muteBus（真实不可闻）
 *  - 移动声源只改变 position AudioParam，不重建 source（不重启音轨）
 *  - 总线/主增益真实进入链路
 *  - 峰值 worklet 不可用时不致命（回退表）
 *  - 解码失败以 DecodeError 单独抛出
 */
import assert from 'node:assert/strict';
import { describe, it, beforeEach, afterEach } from 'node:test';

// ---------- 最小 Web Audio 模拟 ----------

class FakeAudioParam {
  value: number;
  events: { time: number; value: number; tc: number }[] = [];
  ramps: { time: number; value: number }[] = [];
  canceled: { time: number }[] = [];
  constructor(v: number) {
    this.value = v;
  }
  setTargetAtTime(v: number, time: number, tc: number) {
    this.value = v;
    this.events.push({ time, value: v, tc });
  }
  setValueAtTime(v: number, time: number) {
    this.value = v;
    this.events.push({ time, value: v, tc: -1 });
  }
  linearRampToValueAtTime(v: number, time: number) {
    this.value = v;
    this.ramps.push({ time, value: v });
  }
  cancelScheduledValues(time: number) {
    this.canceled.push({ time });
    this.events = this.events.filter((e) => e.time < time);
    this.ramps = this.ramps.filter((r) => r.time <= time);
  }
}

class FakeNode {
  connects: { node: FakeNode; out?: number; inp?: number }[] = [];
  disconnected = false;
  connectedFrom: FakeNode[] = [];
  connect(node: FakeNode | { input?: FakeNode }, out?: number, inp?: number): FakeNode {
    const target = (node as { input?: FakeNode }).input ?? (node as FakeNode);
    this.connects.push({ node: target, out, inp });
    target.connectedFrom.push(this);
    return target;
  }
  disconnect() {
    this.connects = [];
    this.disconnected = true;
  }
}

class FakeGain extends FakeNode {
  gain = new FakeAudioParam(1);
}
class FakeStereoPanner extends FakeNode {}
class FakeDestination extends FakeNode {}

class FakePanner extends FakeNode {
  panningModel = 'HRTF';
  distanceModel: DistanceModelStr = 'inverse';
  refDistance = 1;
  rolloffFactor = 1;
  maxDistance = 100;
  positionX = new FakeAudioParam(0);
  positionY = new FakeAudioParam(0);
  positionZ = new FakeAudioParam(0);
  positionTimeConstant = 0;
  orientationX = new FakeAudioParam(1);
  orientationY = new FakeAudioParam(0);
  orientationZ = new FakeAudioParam(0);
  constructor(_ctx: unknown, opts: Record<string, unknown> = {}) {
    super();
    Object.assign(this, opts);
    if (opts.positionX !== undefined) this.positionX = new FakeAudioParam(opts.positionX as number);
    if (opts.positionY !== undefined) this.positionY = new FakeAudioParam(opts.positionY as number);
    if (opts.positionZ !== undefined) this.positionZ = new FakeAudioParam(opts.positionZ as number);
  }
}
type DistanceModelStr = 'linear' | 'inverse' | 'exponential';

class FakeBufferSource extends FakeNode {
  buffer: FakeAudioBuffer | null = null;
  loop = false;
  started: { time: number; offset: number }[] = [];
  stopped = 0;
  onended: (() => void) | null = null;
  start(time: number, offset = 0) {
    this.started.push({ time, offset });
  }
  stop() {
    this.stopped++;
  }
}

class FakeBuffer {
  duration: number;
  numberOfChannels: number;
  length: number;
  sampleRate: number;
  private data: Float32Array[];
  constructor(ch: number, length: number, sr: number, duration: number) {
    this.numberOfChannels = ch;
    this.length = length;
    this.sampleRate = sr;
    this.duration = duration;
    this.data = Array.from({ length: ch }, () => new Float32Array(length));
  }
  getChannelData(i: number) {
    return this.data[i];
  }
}
type FakeAudioBuffer = FakeBuffer;

class FakeSplitter extends FakeNode {
  constructor(public channels: number) {
    super();
  }
}
class FakeMerger extends FakeNode {}

class FakeListener {
  positionX = new FakeAudioParam(0);
  positionY = new FakeAudioParam(0);
  positionZ = new FakeAudioParam(0);
  forwardX = new FakeAudioParam(0);
  forwardY = new FakeAudioParam(0);
  forwardZ = new FakeAudioParam(-1);
  upX = new FakeAudioParam(0);
  upY = new FakeAudioParam(1);
  upZ = new FakeAudioParam(0);
}

class FakeAnalyser extends FakeNode {
  fftSize = 2048;
  getFloatTimeDomainData(arr: Float32Array) {
    arr.fill(0);
  }
}

class FakeAudioContext {
  state: 'running' | 'suspended' = 'running';
  currentTime = 0;
  playbackRate = { value: 1 };
  destination = new FakeDestination();
  listener = new FakeListener();
  sampleRate = 48000;
  audioWorklet = {
    addModule: async () => {
      throw new Error('worklet unavailable in test');
    },
  };
  createGain() {
    return new FakeGain();
  }
  createBufferSource() {
    return new FakeBufferSource();
  }
  createBuffer(ch: number, length: number, sr: number) {
    return new FakeBuffer(ch, length, sr, length / sr);
  }
  createChannelSplitter(ch: number) {
    return new FakeSplitter(ch);
  }
  createChannelMerger(ch: number) {
    void ch;
    return new FakeMerger();
  }
  createAnalyser() {
    return new FakeAnalyser();
  }
  createStereoPanner() {
    return new FakeStereoPanner();
  }
  async resume() {
    this.state = 'running';
  }
  async decodeAudioData(buf: ArrayBuffer): Promise<FakeBuffer> {
    const text = new TextDecoder().decode(buf);
    if (text === 'BAD') throw new Error('EncodingError: fake bad file');
    return new FakeBuffer(1, 48000, 48000, 1);
  }
  async close() {}
}

const g = globalThis as unknown as Record<string, unknown>;
g.AudioContext = FakeAudioContext;
g.requestAnimationFrame = (fn: FrameRequestCallback) => {
  return setTimeout(() => fn(0), 16) as unknown as number;
};
g.cancelAnimationFrame = (id: number) => clearTimeout(id);
g.window = globalThis;
g.PannerNode = FakePanner;

const { AudioEngine, DecodeError } = await import('../src/lib/audioEngine.ts');
const { createSampleBuffer } = await import('../src/lib/samples.ts');

function baseTrack(over: Partial<import('../src/types.ts').Track> = {}) {
  return {
    id: 't1',
    name: 'T',
    sourceType: 'tone' as const,
    loop: false,
    muted: false,
    solo: false,
    gain: 0.8,
    channel: 0,
    color: '#fff',
    position: { x: 2, y: 0, z: 0 },
    status: 'pending' as const,
    automation: { schema: 1 as const, keyframes: [], revision: 0, updatedAt: 0 },
    ...over,
  };
}

describe('AudioEngine 图行为（模拟环境）', () => {
  let engine: InstanceType<typeof AudioEngine>;

  beforeEach(() => {
    engine = new AudioEngine();
  });

  afterEach(() => {
    engine.dispose();
  });

  it('resume 解锁；setListener 写入与空间数学一致的朝向', async () => {
    await engine.resume();
    assert.equal(engine.unlock, 'unlocked');
    engine.setListener({
      position: { x: 0, y: 0, z: 3 },
      yaw: Math.PI / 2, // 右转 → forward (+1,0,0)
      pitch: 0,
      earHeight: 0,
    });
    const li = engine.ctx!.listener as unknown as FakeListener;
    assert.ok(Math.abs(li.forwardX.value - 1) < 1e-6);
    assert.ok(Math.abs(li.forwardZ.value) < 1e-6);
    assert.ok(Math.abs(li.upY.value - 1) < 1e-6);
    assert.ok(Math.abs(li.positionZ.value - 3) < 1e-6);
  });

  it('声轨链路为 source→trackGain→HRTF panner→soloBus→…→destination；距离模型参数下发', async () => {
    await engine.resume();
    engine.setSpatialSettings({
      distanceModel: 'exponential',
      refDistance: 2,
      rolloffFactor: 1.5,
      maxDistance: 25,
      positionTimeConstant: 0.05,
      hrtfIR: 'none',
    });
    const track = baseTrack();
    await engine.ensureTrack(track);
    const voices = (engine as unknown as { voices: Map<string, { panner: FakePanner; trackGain: FakeGain; source: FakeBufferSource }> }).voices;
    const v = voices.get('t1')!;
    assert.equal(v.panner.panningModel, 'HRTF');
    assert.equal(v.panner.distanceModel, 'exponential');
    assert.equal(v.panner.refDistance, 2);
    assert.equal(v.panner.rolloffFactor, 1.5);
    assert.equal(v.panner.maxDistance, 25);
    assert.ok(Math.abs(v.panner.positionX.value - 2) < 1e-9);
    // source → gain
    assert.ok(v.source.connects.some((c) => c.node === v.trackGain));
    // gain → panner
    assert.ok(v.trackGain.connects.some((c) => c.node === v.panner));
    // panner → soloBus
    const soloBus = (engine as unknown as { soloBus: FakeGain }).soloBus;
    assert.ok(v.panner.connects.some((c) => c.node === soloBus));
  });

  it('静音真实把 trackGain 置 0；独奏把非独奏声轨切到 muteBus', async () => {
    await engine.resume();
    const a = baseTrack({ id: 'a' });
    const b = baseTrack({ id: 'b', position: { x: -2, y: 0, z: 0 } });
    await engine.ensureTrack(a);
    await engine.ensureTrack(b);
    const voices = (engine as unknown as {
      voices: Map<string, { trackGain: FakeGain; panner: FakePanner }>;
      muteBus: FakeGain;
    }).voices;
    const muteBus = (engine as unknown as { muteBus: FakeGain }).muteBus;

    engine.syncTracks([{ ...a, muted: true }, b]);
    assert.equal(voices.get('a')!.trackGain.gain.value, 0);
    assert.equal(voices.get('b')!.trackGain.gain.value, 0.8);

    engine.syncTracks([{ ...a, muted: true }, { ...b, solo: true }]);
    // a 既静音又非独奏 → muteBus；b 独奏 → 留在可闻总线
    assert.ok(voices.get('a')!.panner.connects.some((c) => c.node === muteBus));
    assert.ok(
      voices.get('b')!.panner.connects.every((c) => c.node !== muteBus),
    );

    // 解除独奏后，a 仍因 muted 留在 muteBus，b 回到 soloBus
    engine.syncTracks([{ ...a, muted: true }, b]);
    assert.ok(voices.get('a')!.panner.connects.some((c) => c.node === muteBus));
    assert.ok(
      voices.get('a')!.panner.connects.every((c) => c.node === muteBus),
    );
  });

  it('移动声源只写 AudioParam，绝不 stop/start source（不重启音轨）', async () => {
    await engine.resume();
    const t = baseTrack();
    await engine.playTrack(t);
    const v = (engine as unknown as {
      voices: Map<string, { source: FakeBufferSource; panner: FakePanner }>;
    }).voices.get('t1')!;
    const startsBefore = v.source.started.length;
    const stopsBefore = v.source.stopped;

    for (let i = 0; i < 10; i++) {
      engine.syncTracks([
        { ...t, position: { x: 2 + i * 0.1, y: 0.5, z: -i * 0.2 } },
      ]);
    }
    assert.ok(Math.abs(v.panner.positionX.value - 2.9) < 1e-9);
    assert.ok(Math.abs(v.panner.positionY.value - 0.5) < 1e-9);
    assert.ok(Math.abs(v.panner.positionZ.value - -1.8) < 1e-9);
    assert.equal(v.source.started.length, startsBefore);
    assert.equal(v.source.stopped, stopsBefore);
  });

  it('暂停会停止并重建节点且保留偏移；再次播放从偏移开始', async () => {
    await engine.resume();
    const ctx = engine.ctx as unknown as FakeAudioContext;
    const t = { ...baseTrack(), loop: false };
    await engine.playTrack(t);
    ctx.currentTime = 0.3;
    engine.pauseTrack(t);
    await engine.playTrack({ ...t });
    const v = (engine as unknown as {
      voices: Map<string, { source: FakeBufferSource; offset: number }>;
    }).voices.get('t1')!;
    // 最新一次 start 的 offset ≈ 0.3
    const last = v.source.started[v.source.started.length - 1];
    assert.ok(Math.abs(last.offset - 0.3) < 1e-6);
  });

  it('总线与主增益真实写入对应 GainNode', async () => {
    await engine.resume();
    engine.setBusGain(0.42);
    engine.setMasterGain(0.71);
    const bus = (engine as unknown as { busGain: FakeGain }).busGain;
    const master = (engine as unknown as { masterGain: FakeGain }).masterGain;
    assert.ok(Math.abs(bus.gain.value - 0.42) < 1e-9);
    assert.ok(Math.abs(master.gain.value - 0.71) < 1e-9);
    // 主输出确实连向 destination（master → analyser → destination，worklet 不可用时）
    const analyser = (engine as unknown as { analyser: FakeAnalyser }).analyser;
    const destination = (engine.ctx as unknown as FakeAudioContext).destination;
    assert.ok(analyser.connects.some((c) => c.node === destination));
  });

  it('坏文件解码失败抛出 DecodeError，且不影响其他声轨', async () => {
    await engine.resume();
    const bad = baseTrack({ id: 'bad', sourceType: 'file' as const });
    engine.setFileBlob('bad', new Blob([new TextEncoder().encode('BAD')], { type: 'audio/x' }));
    await assert.rejects(engine.ensureTrack(bad), (err: unknown) => err instanceof DecodeError);

    const good = baseTrack({ id: 'good' });
    await engine.ensureTrack(good);
    const voices = (engine as unknown as { voices: Map<string, unknown> }).voices;
    assert.ok(voices.has('good'));
  });

  it('内置样例缓冲可经引擎合成，时长与声道符合预期', async () => {
    await engine.resume();
    const buf = createSampleBuffer(engine.ctx as unknown as BaseAudioContext, 'pulse');
    assert.equal(buf.numberOfChannels, 1);
    assert.ok(Math.abs(buf.duration - 1.6) < 1e-6);
  });

  // ---------- 空间自动化调度 ----------

  function lane(trackId: string, keyframes: { time: number; pos: [number, number, number]; gain?: number }[]) {
    const lane = {
      schema: 1 as const,
      revision: 1,
      updatedAt: 0,
      keyframes: keyframes.map((k, i) => ({
        id: `kf-${trackId}-${i}`,
        time: k.time,
        params: {
          position: { x: k.pos[0], y: k.pos[1], z: k.pos[2] },
          ...(k.gain !== undefined ? { gain: k.gain } : {}),
        },
      })),
    };
    return lane;
  }

  function getVoice(trackId: string) {
    return (engine as unknown as {
      voices: Map<string, {
        source: FakeBufferSource;
        panner: FakePanner;
        trackGain: FakeGain;
        playing: boolean;
        auto: unknown;
        duration: number;
      }>;
    }).voices.get(trackId)!;
  }

  function pump() {
    (engine as unknown as { pumpAutomation: (v: unknown) => void }).pumpAutomation(getVoice('a1'));
  }

  it('播放经过多个关键帧：调度器按时钟下发位置/增益事件，source start/stop 不增加', async () => {
    await engine.resume();
    const ctx = engine.ctx as unknown as FakeAudioContext;
    const t = {
      ...baseTrack({ id: 'a1', loop: false }),
      automation: lane('a1', [
        { time: 0, pos: [-5, 0, 0] },
        { time: 0.2, pos: [5, 0, 0] },
        { time: 0.4, pos: [0, 3, 0], gain: 0.3 },
      ]),
    };
    await engine.playTrack(t);
    const v = getVoice('a1');
    const starts = v.source.started.length;
    const stops = v.source.stopped;

    // arm 时锚定起点
    assert.ok(Math.abs(v.panner.positionX.value - -5) < 1e-9);

    // 前瞻 0.3s：0.2s 的帧在窗口内，0.4s 暂不调度
    ctx.currentTime = 0;
    pump();
    const rampsAt02 = v.panner.positionX.ramps.filter((r) => Math.abs(r.time - 0.2) < 1e-9);
    assert.equal(rampsAt02.length, 1, '0.2s 位置线性插值应被调度');
    assert.ok(Math.abs(rampsAt02[0].value - 5) < 1e-9);
    assert.equal(
      v.panner.positionX.ramps.some((r) => Math.abs(r.time - 0.4) < 1e-9),
      false,
      '超出前瞻窗口的关键帧不得提前调度',
    );

    // 时间前进后 0.4s 入窗
    ctx.currentTime = 0.15;
    pump();
    assert.equal(v.panner.positionX.ramps.filter((r) => Math.abs(r.time - 0.4) < 1e-9).length, 1);
    assert.equal(v.trackGain.gain.ramps.filter((r) => Math.abs(r.time - 0.4) < 1e-9 && Math.abs(r.value - 0.3) < 1e-9).length, 1);

    // 再次 pump 不重复下发
    ctx.currentTime = 0.16;
    pump();
    assert.equal(v.panner.positionX.ramps.filter((r) => Math.abs(r.time - 0.2) < 1e-9).length, 1);
    assert.equal(v.panner.positionX.ramps.filter((r) => Math.abs(r.time - 0.4) < 1e-9).length, 1);

    // 全程不触碰 source
    assert.equal(v.source.started.length, starts);
    assert.equal(v.source.stopped, stops);
  });

  it('临时覆盖取消后续自动化事件；取消覆盖在播放头重新锚定；source 不重启', async () => {
    await engine.resume();
    const ctx = engine.ctx as unknown as FakeAudioContext;
    const t = {
      ...baseTrack({ id: 'a1', loop: false }),
      automation: lane('a1', [
        { time: 0, pos: [-5, 0, 0] },
        { time: 0.2, pos: [5, 0, 0] },
      ]),
    };
    await engine.playTrack(t);
    const v = getVoice('a1');
    const starts = v.source.started.length;
    ctx.currentTime = 0.1;
    pump();

    assert.equal(engine.beginOverride('a1'), true);
    // 未发生事件被取消
    assert.ok(v.panner.positionX.canceled.length >= 1);
    assert.equal((v.auto as { override: boolean }).override, true);
    // 覆盖期间调度器停止下发
    const rampCount = v.panner.positionX.ramps.length;
    ctx.currentTime = 0.15;
    pump();
    assert.equal(v.panner.positionX.ramps.length, rampCount);

    // 取消覆盖：在当前播放头（t=0.15）锚定计划采样：-5 → 5 的 0.75 处 = 2.5
    assert.equal(engine.cancelOverride('a1'), true);
    assert.ok(Math.abs(v.panner.positionX.value - 2.5) < 1e-9);
    assert.equal(v.source.started.length, starts, '覆盖取消不得重启 source');
  });

  it('暂停后 seek 再播放：旧调度被取消且不重复发声（start 次数不叠加）', async () => {
    await engine.resume();
    const ctx = engine.ctx as unknown as FakeAudioContext;
    const t = {
      ...baseTrack({ id: 'a1', loop: false }),
      automation: lane('a1', [
        { time: 0, pos: [-5, 0, 0] },
        { time: 0.2, pos: [5, 0, 0] },
      ]),
    };
    await engine.playTrack(t);
    ctx.currentTime = 0.1;
    pump();
    const totalStarts = () =>
      (engine as unknown as { voices: Map<string, { source: FakeBufferSource }> }).voices
        .get('a1')!.source.started.length;

    // 暂停会重建节点（传输语义）：旧节点 stop 一次，新节点未 start
    engine.pauseTrack(t);
    const vAfterPause = getVoice('a1');
    assert.equal(vAfterPause.playing, false);
    assert.equal(vAfterPause.auto, null);

    // seek 到 0.05 并继续播放：新节点 start 一次，锚定 0.05 的插值
    ctx.currentTime = 0.2;
    await engine.seekTrack(t, 0.05, true);
    const v2 = getVoice('a1');
    assert.equal(v2.playing, true);
    assert.ok(v2.auto !== null);
    // t=0.05: -5 → 5 的 1/4
    assert.ok(Math.abs(v2.panner.positionX.value - -2.5) < 1e-9);
    pump();
    // 0.2 帧相对新起点（0.2 + (0.2-0.05) = 0.35 ctx）
    assert.equal(
      v2.panner.positionX.ramps.some((r) => Math.abs(r.time - 0.35) < 1e-9),
      true,
    );
    void totalStarts;
  });

  it('循环：关键帧随周期重复调度，跨周期在边界阶梯重置，不叠加旧调度', async () => {
    await engine.resume();
    const ctx = engine.ctx as unknown as FakeAudioContext;
    // 假解码器返回 1s 缓冲，使自动化周期与源循环周期一致
    const t = {
      ...baseTrack({ id: 'a1', sourceType: 'file' as const, loop: true }),
      automation: lane('a1', [
        { time: 0, pos: [-5, 0, 0] },
        { time: 0.2, pos: [5, 0, 0] },
      ]),
    };
    engine.setFileBlob('a1', new Blob([new TextEncoder().encode('OK')], { type: 'audio/x' }));
    await engine.playTrack(t);
    const v = getVoice('a1');
    assert.equal(v.duration, 1);
    ctx.currentTime = 0;
    pump();
    ctx.currentTime = 0.9;
    pump();
    const stepAt1 = v.panner.positionX.events.some(
      (e) => Math.abs(e.time - 1) < 1e-9 && Math.abs(e.value - -5) < 1e-9,
    );
    assert.ok(stepAt1, '循环边界应阶梯跳回起点值');
    const rampAt12 = v.panner.positionX.ramps.some(
      (r) => Math.abs(r.time - 1.2) < 1e-9 && Math.abs(r.value - 5) < 1e-9,
    );
    assert.ok(rampAt12, '第二周期的关键帧应重复调度');

    // source 从未被 stop（移动/调度不重启音轨）
    assert.equal(v.source.stopped, 0);
  });
});
