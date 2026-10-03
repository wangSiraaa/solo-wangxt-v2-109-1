/**
 * AudioEngine —— Web Audio 核心，与 React 状态解耦。
 *
 * 信号链（每条声轨）：
 *   AudioBufferSourceNode ──► [ChannelSplitter 选取单声道]
 *      ──► trackGain ──► PannerNode(HRTF + 明确距离模型) ──► soloBus ──► busGain
 *                                          └（非独奏/静音）──► muteBus(增益0) ──┘
 *                                                                              ▼
 *                                                        masterGain ─► peakWorklet(逐采样峰值/削波)
 *                                                                              ├► AnalyserNode(回退表)
 *                                                                              └► AudioDestination
 *
 * 关键约定：
 *  - 移动声源只更新 PannerNode 的 position AudioParam（setTargetAtTime 平滑），
 *    绝不 stop/start 源节点，因此移动不会重启音轨。
 *  - 静音 = trackGain.gain=0；独奏通过 soloBus/muteBus 真实切换路由。
 *  - 峰值/削波在实际输出链末端（destination 之前）由 AudioWorklet 逐采样检测；
 *    Worklet 不可用时回退到 AnalyserNode 时域峰值（同样在输出链上）。
 *  - AudioContext 必须由用户手势解锁；解码失败逐条声轨以 DecodeError 上报。
 */
import type {
  AutomationLane,
  AutomationParam,
  LevelState,
  ListenerState,
  LiveTransform,
  Orientation,
  SpatialSettings,
  Track,
  UnlockState,
  Vec3,
} from '../types';
import { forwardVector } from './spatial';
import { createSampleBuffer } from './samples';
import { buildSchedule, sampleLane } from './automation';

interface TrackVoice {
  trackId: string;
  spec: Track;
  source: AudioBufferSourceNode;
  trackGain: GainNode;
  panner: PannerNode;
  /** true = 接在 soloBus（可听见）；false = 接在增益为 0 的 muteBus */
  audiblyRouted: boolean;
  playing: boolean;
  consumed: boolean; // source 是否已 start 过（结束后必须重建才能再播）
  startedAt: number;
  offset: number;
  duration: number;
}

export type EngineUnlockListener = (state: UnlockState) => void;
export type EngineLevelListener = (level: LevelState) => void;
export type EngineEndedListener = (trackId: string) => void;
/** 播放中每帧（rAF）实际声像读数；无播放声轨时收到 null */
export type EngineLiveListener = (updates: Map<string, LiveTransform> | null) => void;

export class DecodeError extends Error {
  trackId: string;
  constructor(trackId: string, message: string) {
    super(message);
    this.name = 'DecodeError';
    this.trackId = trackId;
  }
}

export class AudioEngine {
  ctx: AudioContext | null = null;
  unlock: UnlockState = 'locked';

  private busGain: GainNode | null = null;
  private masterGain: GainNode | null = null;
  private soloBus: GainNode | null = null;
  private muteBus: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private timeDomainBuf: Float32Array<ArrayBuffer> = new Float32Array(new ArrayBuffer(8192));
  private peakWorklet: AudioWorkletNode | null = null;
  private workletFailed = false;

  private voices = new Map<string, TrackVoice>();
  private buffers = new Map<string, AudioBuffer>();
  private pendingFiles = new Map<string, Blob>();

  private spatial: SpatialSettings | null = null;
  private anySolo = false;

  /** 每轨自动化轨（工程相对时间关键帧），由 UI 层同步 */
  private lanes = new Map<string, AutomationLane>();
  /**
   * 播放中人工拖拽/推子形成的临时覆盖：键存在表示该参数由人工接管，
   * 自动化调度跳过它。取消覆盖后立刻回到计划轨迹；提交才写入关键帧。
   */
  private overrides = new Map<string, Set<AutomationParam>>();
  /** 最近一次调度器输出的媒体时间，供 live 读数与测试断言 */
  private lastMediaTime = new Map<string, number>();

  private unlockListeners = new Set<EngineUnlockListener>();
  private levelListeners = new Set<EngineLevelListener>();
  private endedListeners = new Set<EngineEndedListener>();
  private liveListeners = new Set<EngineLiveListener>();
  private rafHandle = 0;
  /** 调度前瞻窗口（秒）：每个 rAF tick 重排该窗口内的全部 AudioParam 事件 */
  private static readonly SCHEDULE_AHEAD = 0.35;
  /** live 读数 rAF 节流间隔（秒） */
  private static readonly LIVE_INTERVAL = 1 / 30;
  private lastLiveEmit = 0;
  private clipLatchL = false;
  private clipLatchR = false;
  private lastPeak: LevelState = { l: 0, r: 0, clipL: false, clipR: false };

  onUnlock(fn: EngineUnlockListener): () => void {
    this.unlockListeners.add(fn);
    fn(this.unlock);
    return () => {
      this.unlockListeners.delete(fn);
    };
  }
  onLevels(fn: EngineLevelListener): () => void {
    this.levelListeners.add(fn);
    return () => {
      this.levelListeners.delete(fn);
    };
  }
  onEnded(fn: EngineEndedListener): () => void {
    this.endedListeners.add(fn);
    return () => {
      this.endedListeners.delete(fn);
    };
  }
  onLive(fn: EngineLiveListener): () => void {
    this.liveListeners.add(fn);
    return () => {
      this.liveListeners.delete(fn);
    };
  }

  private emitUnlock() {
    this.unlockListeners.forEach((fn) => fn(this.unlock));
  }

  /** 必须在用户手势中调用；与“未解锁”分别上报明确的失败状态 */
  async resume(): Promise<void> {
    if (this.unlock === 'unlocked' && this.ctx) {
      if (this.ctx.state === 'suspended') await this.ctx.resume();
      return;
    }
    this.unlock = 'unlocking';
    this.emitUnlock();
    try {
      const Ctor: typeof AudioContext =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) throw new Error('当前浏览器不支持 Web Audio API');
      const ctx = new Ctor();
      this.ctx = ctx;
      this.buildGraph(ctx);
      if (ctx.state === 'suspended') await ctx.resume();
      if (ctx.state !== 'running') {
        throw new Error('AudioContext 被浏览器策略阻止，未能进入 running 状态');
      }
      this.unlock = 'unlocked';
      this.emitUnlock();
      this.startMeterLoop();
      void this.ensurePeakWorklet(ctx);
    } catch (err) {
      this.unlock = 'failed';
      this.emitUnlock();
      throw err;
    }
  }

  private buildGraph(ctx: AudioContext) {
    this.soloBus = ctx.createGain();
    this.muteBus = ctx.createGain();
    this.muteBus.gain.value = 0;
    this.busGain = ctx.createGain();
    this.masterGain = ctx.createGain();
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    this.timeDomainBuf = new Float32Array(new ArrayBuffer(this.analyser.fftSize * 4));

    this.soloBus.connect(this.busGain);
    this.muteBus.connect(this.busGain);
    this.busGain.connect(this.masterGain);
    // 先经过 analyser（回退表）；worklet 加载成功后串入 master 与 destination 之间
    this.masterGain.connect(this.analyser);
    this.analyser.connect(ctx.destination);
  }

  /**
   * 峰值/削波检测器串联在 masterGain 之后、destination 之前的真实输出链上，
   * 逐采样扫描。Worklet 源码以 Blob 注入，无需额外网络资源。
   */
  private async ensurePeakWorklet(ctx: AudioContext): Promise<boolean> {
    if (this.peakWorklet || this.workletFailed) return !!this.peakWorklet;
    try {
      const workletSource = `
class PeakMeterProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    const in0 = inputs[0];
    const out0 = outputs[0];
    if (!in0 || in0.length === 0) {
      // 上游静默优化时输出保持零填充即可
      return true;
    }
    let peakL = 0, peakR = 0, clipL = false, clipR = false;
    const l = in0[0];
    const r = in0[1] || in0[0];
    const ol = out0[0];
    const or = out0[1] || out0[0];
    for (let i = 0; i < l.length; i++) {
      const vl = l[i];
      const al = Math.abs(vl);
      if (al > peakL) peakL = al;
      if (al >= 1.0) clipL = true;
      if (ol) ol[i] = vl; // 必须显式透传，否则输出静音
    }
    if (r && or) for (let i = 0; i < r.length; i++) {
      const vr = r[i];
      const ar = Math.abs(vr);
      if (ar > peakR) peakR = ar;
      if (ar >= 1.0) clipR = true;
      if (out0[1]) or[i] = vr;
    }
    this.port.postMessage({ l: peakL, r: peakR, clipL, clipR });
    return true;
  }
}
registerProcessor('peak-meter', PeakMeterProcessor);
`;
      const blob = new Blob([workletSource], { type: 'application/javascript' });
      const url = URL.createObjectURL(blob);
      try {
        await ctx.audioWorklet.addModule(url);
      } finally {
        URL.revokeObjectURL(url);
      }

      const node = new AudioWorkletNode(ctx, 'peak-meter', {
        // 节点串在真实输出链上：必须保持立体声直通，避免被下混成单声道
        numberOfInputs: 1,
        numberOfOutputs: 1,
        outputChannelCount: [2],
      });
      node.channelCount = 2;
      node.channelInterpretation = 'speakers';
      // 重排实际链路：masterGain -> peakWorklet -> analyser -> destination
      this.masterGain!.disconnect();
      this.masterGain!.connect(node);
      this.analyser!.disconnect();
      node.connect(this.analyser!);
      this.analyser!.connect(ctx.destination);
      node.port.onmessage = (e: MessageEvent<LevelState>) => {
        const d = e.data;
        if (d.clipL) this.clipLatchL = true;
        if (d.clipR) this.clipLatchR = true;
        this.lastPeak = { l: d.l, r: d.r, clipL: this.clipLatchL, clipR: this.clipLatchR };
      };
      this.peakWorklet = node;
      return true;
    } catch {
      this.workletFailed = true;
      return false;
    }
  }

  clearClipLatch() {
    this.clipLatchL = false;
    this.clipLatchR = false;
  }

  private startMeterLoop() {
    const tick = () => {
      if (!this.peakWorklet && this.analyser) {
        // 回退：AnalyserNode 时域块峰值，仍挂在真实输出链上
        this.analyser.getFloatTimeDomainData(this.timeDomainBuf);
        let peak = 0;
        for (let i = 0; i < this.timeDomainBuf.length; i++) {
          const a = Math.abs(this.timeDomainBuf[i]);
          if (a > peak) peak = a;
        }
        if (peak >= 1) {
          this.clipLatchL = true;
          this.clipLatchR = true;
        }
        this.lastPeak = {
          l: peak,
          r: peak,
          clipL: this.clipLatchL,
          clipR: this.clipLatchR,
        };
      }
      // 自动化在同一 rAF 时钟上重排（内部换算到 AudioContext.currentTime）
      this.tickAutomation();
      const p = this.lastPeak;
      this.levelListeners.forEach((fn) => fn({ ...p }));
      const now = this.ctx?.currentTime ?? 0;
      if (now - this.lastLiveEmit >= AudioEngine.LIVE_INTERVAL) {
        this.lastLiveEmit = now;
        this.emitLive();
      }
      this.rafHandle = requestAnimationFrame(tick);
    };
    this.rafHandle = requestAnimationFrame(tick);
  }

  // ---------- 全局参数 ----------

  setSpatialSettings(s: SpatialSettings) {
    this.spatial = s;
    if (!this.ctx) return;
    for (const v of this.voices.values()) {
      v.panner.distanceModel = s.distanceModel;
      v.panner.refDistance = s.refDistance;
      v.panner.rolloffFactor = s.rolloffFactor;
      v.panner.maxDistance = s.maxDistance;
    }
  }

  setBusGain(g: number) {
    if (this.busGain && this.ctx) {
      this.busGain.gain.setTargetAtTime(g, this.ctx.currentTime, 0.01);
    }
  }

  setMasterGain(g: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(g, this.ctx.currentTime, 0.01);
    }
  }

  /** 听者位置/朝向；朝向定义与 spatial.ts、Three.js 相机严格一致 */
  setListener(l: ListenerState) {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const f = forwardVector(l.yaw, l.pitch);
    const u = localUp(l.yaw, l.pitch);
    const li = this.ctx.listener;
    const set = (p: AudioParam | undefined, v: number) => {
      if (p) p.setTargetAtTime(v, t, 0.02);
    };
    set(li.positionX, l.position.x);
    set(li.positionY, l.position.y);
    set(li.positionZ, l.position.z);
    set(li.forwardX, f.x);
    set(li.forwardY, f.y);
    set(li.forwardZ, f.z);
    set(li.upX, u.x);
    set(li.upY, u.y);
    set(li.upZ, u.z);
  }

  // ---------- 声轨缓冲与节点 ----------

  /**
   * 确保声轨缓冲与节点就绪。
   * 已存在的 voice 只做实时参数更新（位置/增益/路由/loop），绝不重启源。
   */
  async ensureTrack(track: Track): Promise<void> {
    if (!this.ctx || this.unlock !== 'unlocked') return;

    let buffer = this.buffers.get(track.id);
    if (!buffer) {
      if (track.sourceType === 'file') {
        const blob = this.pendingFiles.get(track.id);
        if (!blob) return; // Blob 尚未由 UI 从 IndexedDB 注入
        try {
          const arr = await blob.arrayBuffer();
          // slice(0)：decodeAudioData 会 detach ArrayBuffer，保留原始 Blob 不受影响
          buffer = await this.ctx.decodeAudioData(arr.slice(0));
        } catch (err) {
          throw new DecodeError(
            track.id,
            `音频解码失败：${err instanceof Error ? err.message : '不支持的编码或文件损坏'}`,
          );
        }
      } else {
        buffer = createSampleBuffer(this.ctx, track.sourceType);
      }
      this.buffers.set(track.id, buffer);
    }

    const existing = this.voices.get(track.id);
    if (!existing) {
      this.voices.set(track.id, this.createVoice(track, buffer));
    } else {
      this.updateVoiceLive(existing, track);
    }
  }

  /** 文件 Blob 在解锁后由 UI 层提供（来自 IndexedDB，全程本地） */
  setFileBlob(trackId: string, blob: Blob) {
    this.pendingFiles.set(trackId, blob);
  }

  dropBuffer(trackId: string) {
    this.buffers.delete(trackId);
  }

  private createVoice(track: Track, buffer: AudioBuffer): TrackVoice {
    const ctx = this.ctx!;
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = track.loop;

    const trackGain = ctx.createGain();
    trackGain.gain.value = track.muted ? 0 : track.gain;

    const panner = new PannerNode(ctx, {
      panningModel: 'HRTF',
      distanceModel: this.spatial?.distanceModel ?? 'inverse',
      refDistance: this.spatial?.refDistance ?? 1,
      rolloffFactor: this.spatial?.rolloffFactor ?? 1,
      maxDistance: this.spatial?.maxDistance ?? 100,
      positionX: track.position.x,
      positionY: track.position.y,
      positionZ: track.position.z,
      // 声源朝向：与 2D/3D/方位读数共用 forwardVector(yaw,pitch)。
      // 仅当应用对 PannerNode 设置非默认 cone 时才有声学效果；数值保持三方一致。
      orientationX: forwardVector(track.orientation.yaw, track.orientation.pitch).x,
      orientationY: forwardVector(track.orientation.yaw, track.orientation.pitch).y,
      orientationZ: forwardVector(track.orientation.yaw, track.orientation.pitch).z,
    });

    // 立体声文件：HRTF 需要单声道输入，显式选取文件原始左/右声道
    if (buffer.numberOfChannels <= 1) {
      source.connect(trackGain);
    } else {
      const splitter = ctx.createChannelSplitter(buffer.numberOfChannels);
      source.connect(splitter);
      const ch = Math.min(track.channel, buffer.numberOfChannels - 1);
      // splitter 单口输出为单声道，接入立体声 gain 时浏览器自动等声级上混
      splitter.connect(trackGain, ch);
    }
    trackGain.connect(panner);

    const audible = this.shouldBeAudible(track);
    panner.connect(audible ? this.soloBus! : this.muteBus!);

    const voice: TrackVoice = {
      trackId: track.id,
      spec: track,
      source,
      trackGain,
      panner,
      audiblyRouted: audible,
      playing: false,
      consumed: false,
      startedAt: 0,
      offset: 0,
      duration: buffer.duration,
    };

    source.onended = () => {
      if (!voice.playing) return; // stop() 触发的 onended 忽略
      const latest = voice.spec;
      voice.playing = false;
      voice.consumed = true;
      voice.offset = 0;
      // 以最新参数立即重建待播 voice，保证自然结束后再次按播放不会对已结束 source start
      const fresh = this.createVoice(latest, buffer);
      fresh.offset = 0;
      this.voices.set(track.id, fresh);
      this.endedListeners.forEach((fn) => fn(track.id));
    };
    return voice;
  }

  private shouldBeAudible(track: Track): boolean {
    if (track.muted) return false;
    if (this.anySolo) return track.solo;
    return true;
  }

  /**
   * 实时参数更新：不触碰 source 节点 —— 移动声源不会重启音轨。
   * 播放中若某参数已被自动化或人工覆盖接管，则跳过该参数，避免两条写入互相打架。
   */
  private updateVoiceLive(voice: TrackVoice, track: Track) {
    const ctx = this.ctx!;
    const t = ctx.currentTime;
    const tau = Math.max(0.005, this.spatial?.positionTimeConstant ?? 0.05);
    const owner = this.paramOwnership(voice.trackId);

    if (!voice.playing || !owner.has('position')) {
      voice.panner.positionX.setTargetAtTime(track.position.x, t, tau);
      voice.panner.positionY.setTargetAtTime(track.position.y, t, tau);
      voice.panner.positionZ.setTargetAtTime(track.position.z, t, tau);
    }
    if (!voice.playing || !owner.has('orientation')) {
      const f = forwardVector(track.orientation.yaw, track.orientation.pitch);
      voice.panner.orientationX.setTargetAtTime(f.x, t, tau);
      voice.panner.orientationY.setTargetAtTime(f.y, t, tau);
      voice.panner.orientationZ.setTargetAtTime(f.z, t, tau);
    }
    voice.panner.distanceModel = this.spatial?.distanceModel ?? voice.panner.distanceModel;

    // 增益：静音最高优先；播放中由自动化/覆盖调度时不在此平滑
    const gainOwned = voice.playing && (owner.has('gain') || track.muted);
    if (!gainOwned) {
      voice.trackGain.gain.setTargetAtTime(track.muted ? 0 : track.gain, t, 0.01);
    } else if (track.muted) {
      voice.trackGain.gain.setTargetAtTime(0, t, 0.005);
    }
    if (voice.source.loop !== track.loop) voice.source.loop = track.loop;

    const audible = this.shouldBeAudible(track);
    if (audible !== voice.audiblyRouted) {
      voice.panner.disconnect();
      voice.panner.connect(audible ? this.soloBus! : this.muteBus!);
      voice.audiblyRouted = audible;
    }
    voice.spec = track;
  }

  /** 静音/独奏变化：重新评估全部路由（增益本身在 updateVoiceLive 中已设置） */
  reevaluateRouting(tracks: Track[]) {
    this.anySolo = tracks.some((t) => t.solo);
    if (!this.ctx) return;
    for (const tr of tracks) {
      const v = this.voices.get(tr.id);
      if (!v) continue;
      const audible = this.shouldBeAudible(tr);
      if (audible !== v.audiblyRouted) {
        v.panner.disconnect();
        v.panner.connect(audible ? this.soloBus! : this.muteBus!);
        v.audiblyRouted = audible;
      }
      const owner = this.paramOwnership(tr.id);
      if (tr.muted) {
        v.trackGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.005);
      } else if (!(v.playing && owner.has('gain'))) {
        v.trackGain.gain.setTargetAtTime(tr.gain, this.ctx.currentTime, 0.01);
      }
      v.spec = tr;
    }
  }

  /**
   * 高频实时同步：对已存在的 voice 更新位置/增益/loop/独奏路由。
   * 不创建节点、不触碰 source，移动声源不会重启音轨。
   * 尚未创建 voice 的声轨（未解锁/未解码）跳过，由 ensureTrack 负责。
   */
  syncTracks(tracks: Track[]) {
    if (!this.ctx) return;
    this.anySolo = tracks.some((t) => t.solo);
    for (const tr of tracks) {
      const v = this.voices.get(tr.id);
      if (v) this.updateVoiceLive(v, tr);
    }
  }

  getChannelCount(trackId: string): number | null {
    return this.buffers.get(trackId)?.numberOfChannels ?? null;
  }

  /**
   * 重建声轨输入图（切换立体声文件的 L/R 声道时使用）。
   * 保持播放偏移；若原本在播放，从同一位置继续（声道选择本身不属于“移动”）。
   */
  async rebuildVoiceGraph(track: Track): Promise<void> {
    await this.ensureTrack(track);
    const old = this.voices.get(track.id);
    const buf = this.buffers.get(track.id);
    if (!old || !buf) return;
    const wasPlaying = old.playing;
    const offset = wasPlaying ? this.currentOffset(old) : old.offset;
    const nv = this.replaceVoice(old, track, buf, offset);
    if (wasPlaying) {
      nv.source.start(this.ctx!.currentTime, offset);
      nv.startedAt = this.ctx!.currentTime;
      nv.playing = true;
      nv.consumed = true;
      this.tickAutomation();
    }
  }

  // ---------- 自动化调度 ----------

  /** UI 层把工程内全部自动化轨同步给引擎（引用替换，不复制关键帧） */
  setAutomationLanes(lanes: Record<string, AutomationLane>) {
    this.lanes = new Map(Object.entries(lanes));
  }

  private paramOwnership(trackId: string): Set<AutomationParam> {
    const owned = new Set<AutomationParam>();
    const lane = this.lanes.get(trackId);
    if (lane?.enabled) {
      if (lane.keyframes.some((k) => k.param === 'position')) owned.add('position');
      if (lane.keyframes.some((k) => k.param === 'orientation')) owned.add('orientation');
      if (lane.keyframes.some((k) => k.param === 'gain')) owned.add('gain');
    }
    for (const p of this.overrides.get(trackId) ?? []) owned.add(p);
    return owned;
  }

  /** 播放中人工操作开始：该参数进入临时覆盖，立即取消它的自动化计划事件 */
  beginOverride(trackId: string, param: AutomationParam, value: Vec3 | Orientation | number) {
    const v = this.voices.get(trackId);
    if (!v || !v.playing) return;
    let set = this.overrides.get(trackId);
    if (!set) {
      set = new Set();
      this.overrides.set(trackId, set);
    }
    set.add(param);
    this.applyOverrideValue(v, param, value);
  }

  /** 覆盖过程中持续写入（拖拽移动），不触碰 source */
  updateOverride(trackId: string, param: AutomationParam, value: Vec3 | Orientation | number) {
    const v = this.voices.get(trackId);
    if (!v || !v.playing || !this.overrides.get(trackId)?.has(param)) return;
    this.applyOverrideValue(v, param, value);
  }

  private applyOverrideValue(v: TrackVoice, param: AutomationParam, value: Vec3 | Orientation | number) {
    const ctx = this.ctx!;
    const now = ctx.currentTime;
    const cancel = (p: AudioParam | undefined) => {
      if (!p) return;
      // 先取消尚未生效的自动化事件，再以当前值平滑接管
      p.cancelScheduledValues(now);
    };
    const smooth = (p: AudioParam | undefined, x: number) => {
      if (p) {
        try {
          p.setTargetAtTime(x, now, Math.max(0.005, this.spatial?.positionTimeConstant ?? 0.05));
        } catch {
          p.setValueAtTime(x, now);
        }
      }
    };
    if (param === 'position') {
      const pos = value as Vec3;
      cancel(v.panner.positionX);
      cancel(v.panner.positionY);
      cancel(v.panner.positionZ);
      smooth(v.panner.positionX, pos.x);
      smooth(v.panner.positionY, pos.y);
      smooth(v.panner.positionZ, pos.z);
    } else if (param === 'orientation') {
      const o = value as Orientation;
      const f = forwardVector(o.yaw, o.pitch);
      cancel(v.panner.orientationX);
      cancel(v.panner.orientationY);
      cancel(v.panner.orientationZ);
      smooth(v.panner.orientationX, f.x);
      smooth(v.panner.orientationY, f.y);
      smooth(v.panner.orientationZ, f.z);
    } else {
      cancel(v.trackGain.gain);
      smooth(v.trackGain.gain, v.spec.muted ? 0 : (value as number));
    }
  }

  /** 取消覆盖：返回该参数当前“计划值”供 UI 回弹到轨迹；调度器下一 tick 重排 */
  cancelOverride(trackId: string, param: AutomationParam): Vec3 | Orientation | number | null {
    const set = this.overrides.get(trackId);
    if (!set) return null;
    set.delete(param);
    if (set.size === 0) this.overrides.delete(trackId);
    const v = this.voices.get(trackId);
    if (!v) return null;
    const media = this.currentMediaTime(v);
    const lane = this.lanes.get(trackId);
    const s = lane
      ? sampleLane(lane, media, v.spec.loop ? v.duration : undefined, {
          position: v.spec.position,
          orientation: v.spec.orientation,
          gain: v.spec.muted ? 0 : v.spec.gain,
        })
      : {};
    // 立即把该参数拉回计划值，避免停留在覆盖值到下一 tick
    if (param === 'position') {
      const pos = s.position ?? v.spec.position;
      this.applyImmediateParam(v, param, pos);
      return pos;
    }
    if (param === 'orientation') {
      const o = s.orientation ?? v.spec.orientation;
      this.applyImmediateParam(v, param, o);
      return o;
    }
    const g = s.gain ?? v.spec.gain;
    this.applyImmediateParam(v, param, g);
    return g;
  }

  /** 提交覆盖后调用：清除该参数覆盖（UI 会把关键帧写入 lane 并同步） */
  clearOverride(trackId: string, param: AutomationParam) {
    const set = this.overrides.get(trackId);
    if (!set) return;
    set.delete(param);
    if (set.size === 0) this.overrides.delete(trackId);
  }

  /** 暂停/停止/seek/切歌：全部覆盖作废，参数所有权回归工程数据 */
  clearAllOverrides(trackId?: string) {
    if (trackId) this.overrides.delete(trackId);
    else this.overrides.clear();
  }

  hasOverride(trackId: string, param: AutomationParam): boolean {
    return this.overrides.get(trackId)?.has(param) ?? false;
  }

  getOverrides(trackId: string): AutomationParam[] {
    return [...(this.overrides.get(trackId) ?? [])];
  }

  private applyImmediateParam(v: TrackVoice, param: AutomationParam, value: Vec3 | Orientation | number) {
    const now = this.ctx!.currentTime;
    if (param === 'position') {
      const p = value as Vec3;
      v.panner.positionX.cancelScheduledValues(now);
      v.panner.positionY.cancelScheduledValues(now);
      v.panner.positionZ.cancelScheduledValues(now);
      v.panner.positionX.setValueAtTime(p.x, now);
      v.panner.positionY.setValueAtTime(p.y, now);
      v.panner.positionZ.setValueAtTime(p.z, now);
    } else if (param === 'orientation') {
      const o = value as Orientation;
      const f = forwardVector(o.yaw, o.pitch);
      v.panner.orientationX.cancelScheduledValues(now);
      v.panner.orientationY.cancelScheduledValues(now);
      v.panner.orientationZ.cancelScheduledValues(now);
      v.panner.orientationX.setValueAtTime(f.x, now);
      v.panner.orientationY.setValueAtTime(f.y, now);
      v.panner.orientationZ.setValueAtTime(f.z, now);
    } else {
      v.trackGain.gain.cancelScheduledValues(now);
      v.trackGain.gain.setValueAtTime(v.spec.muted ? 0 : (value as number), now);
    }
  }

  private currentMediaTime(v: TrackVoice): number {
    if (!v.playing) return v.offset;
    let p = v.offset + (this.ctx!.currentTime - v.startedAt);
    if (v.spec.loop) p = ((p % v.duration) + v.duration) % v.duration;
    else p = Math.min(p, v.duration);
    return p;
  }

  /**
   * 每帧（rAF）对所有播放中的 voice 重排自动化。
   * 关键设计：
   *  - 总是先 cancelScheduledValues(now) 再重建前瞻窗口事件，
   *    seek/暂停后再播、循环回绕都不会叠加旧调度（旧事件在重排时被清掉）。
   *  - 事件时间一律换算为 AudioContext 绝对时间，浏览器音频线程按时执行，
   *    不依赖 JS 定时器精度；BufferSource 从不重启。
   *  - 人工覆盖的参数完全跳过（取消时才回来）。
   */
  private tickAutomation() {
    if (!this.ctx) return;
    for (const [trackId, v] of this.voices) {
      if (!v.playing) continue;
      const lane = this.lanes.get(trackId);
      if (!lane || !lane.enabled || lane.keyframes.length === 0) continue;
      const now = this.ctx.currentTime;
      const mediaWrapped = this.currentMediaTime(v);
      this.lastMediaTime.set(trackId, mediaWrapped);
      const period = v.spec.loop ? v.duration : undefined;
      // 调度使用**未回绕**的工程时间（随 AudioContext 线性增长）；
      // buildSchedule/sampleLane 内部按 period 自行取模，回绕前后才能映射到
      // 正确的 AudioContext 绝对时间（如媒体第二圈 0.2s ↔ ctx 3.2s）。
      const mediaLinear = v.playing
        ? v.spec.loop
          ? v.offset + (now - v.startedAt)
          : Math.min(v.offset + (now - v.startedAt), v.duration)
        : v.offset;
      const schedule = buildSchedule({
        lane,
        fromMedia: mediaLinear,
        toMedia: mediaLinear + AudioEngine.SCHEDULE_AHEAD,
        baseAbsTime: v.startedAt,
        period,
        startOffset: v.offset,
        baseline: {
          position: v.spec.position,
          orientation: v.spec.orientation,
          gain: v.spec.muted ? 0 : v.spec.gain,
        },
      });
      const overridden = this.overrides.get(trackId) ?? new Set<AutomationParam>();
      const muted = v.spec.muted;
      // 按 component 分组；先取消每个相关 AudioParam 的未来事件
      const paramOfComp = (c: string): AutomationParam =>
        c === 'gain' ? 'gain' : c === 'x' || c === 'y' || c === 'z' ? 'position' : 'orientation';
      const involvedParams = new Set(schedule.events.map((e) => paramOfComp(e.component)));
      for (const p of involvedParams) {
        if (overridden.has(p)) continue;
        if (p === 'position') {
          v.panner.positionX.cancelScheduledValues(now);
          v.panner.positionY.cancelScheduledValues(now);
          v.panner.positionZ.cancelScheduledValues(now);
        } else if (p === 'orientation') {
          v.panner.orientationX.cancelScheduledValues(now);
          v.panner.orientationY.cancelScheduledValues(now);
          v.panner.orientationZ.cancelScheduledValues(now);
        } else {
          v.trackGain.gain.cancelScheduledValues(now);
        }
      }
      for (const e of schedule.events) {
        if (e.time < now - 1e-4) continue; // 理论不会，防御
        const p = paramOfComp(e.component);
        if (overridden.has(p)) continue;
        const target = this.automationAudioParam(v, e.component);
        if (!target) continue;
        // 静音绝对优先：自动化增益事件全部改写为 0（未来 ramp 也不会产生声音），
        // 解除静音后下一 tick 用真实曲线重排
        const value = muted && p === 'gain' ? 0 : e.value;
        try {
          if (e.kind === 'setValue') target.setValueAtTime(value, e.time);
          else target.linearRampToValueAtTime(value, e.time);
        } catch {
          /* 个别浏览器对过期时间抛错：忽略即可，下一 tick 重排 */
        }
      }
    }
  }

  private automationAudioParam(
    v: TrackVoice,
    comp: 'x' | 'y' | 'z' | 'oX' | 'oY' | 'oZ' | 'gain',
  ): AudioParam | null {
    if (comp === 'x') return v.panner.positionX;
    if (comp === 'y') return v.panner.positionY;
    if (comp === 'z') return v.panner.positionZ;
    if (comp === 'oX') return v.panner.orientationX;
    if (comp === 'oY') return v.panner.orientationY;
    if (comp === 'oZ') return v.panner.orientationZ;
    if (comp === 'gain') return v.trackGain.gain;
    return null;
  }

  /**
   * 把“实际写进 PannerNode 的东西”作为唯一读数发出：
   * 未被覆盖的参数直接采样自动化曲线；被覆盖的参数读 AudioParam.value，
   * 2D/3D/方位显示都消费这一份，保证与实际声像一致。
   */
  private emitLive() {
    if (!this.ctx || this.liveListeners.size === 0) return;
    let any = false;
    const updates = new Map<string, LiveTransform>();
    for (const [trackId, v] of this.voices) {
      if (!v.playing) continue;
      any = true;
      const media = this.currentMediaTime(v);
      const lane = this.lanes.get(trackId);
      const sampled = lane
        ? sampleLane(lane, media, v.spec.loop ? v.duration : undefined, {
            position: v.spec.position,
            orientation: v.spec.orientation,
            gain: v.spec.muted ? 0 : v.spec.gain,
          })
        : {};
      const overridden = this.overrides.get(trackId);
      const t: LiveTransform = { mediaTime: media };
      // 只要该轨启用了自动化，播放中读数就持续报告“实际值”
      // （首帧前为静态基线，关键帧段为曲线值，覆盖时读 AudioParam）。
      const autoActive = lane?.enabled && lane.keyframes.length > 0;
      if (overridden?.has('position')) {
        t.position = {
          x: v.panner.positionX.value,
          y: v.panner.positionY.value,
          z: v.panner.positionZ.value,
        };
      } else if (sampled.position) t.position = sampled.position;
      else if (autoActive) t.position = { ...v.spec.position };
      if (overridden?.has('orientation')) {
        // 覆盖值已写入 doc/voice.spec；读数与之保持一致
        t.orientation = { ...v.spec.orientation };
      } else if (sampled.orientation) t.orientation = sampled.orientation;
      else if (autoActive) t.orientation = { ...v.spec.orientation };
      if (overridden?.has('gain')) t.gain = v.trackGain.gain.value;
      else if (sampled.gain !== undefined) t.gain = sampled.gain;
      else if (autoActive) t.gain = v.spec.muted ? 0 : v.spec.gain;
      updates.set(trackId, t);
    }
    if (any) this.liveListeners.forEach((fn) => fn(updates));
    else {
      let hasPending = false;
      for (const v of this.voices.values()) if (v.playing) hasPending = true;
      if (!hasPending) this.liveListeners.forEach((fn) => fn(null));
    }
  }

  /** 当前媒体时间（秒，循环时回绕）；提交覆盖关键帧的时间戳来源 */
  getMediaTime(trackId: string): number {
    return this.getMediaTimeForTest(trackId) ?? 0;
  }

  /** 测试用：立即执行一次自动化重排 */
  runAutomationTickForTest() {
    this.tickAutomation();
  }

  getMediaTimeForTest(trackId: string): number | undefined {
    const v = this.voices.get(trackId);
    return v ? this.currentMediaTime(v) : undefined;
  }

  // ---------- 传输控制 ----------

  async playTrack(track: Track): Promise<void> {
    await this.ensureTrack(track);
    let voice = this.voices.get(track.id);
    if (!voice) return;
    if (voice.playing) return;
    if (voice.consumed) {
      // 自然结束后未被 onended 重建的兜底
      const buf = this.buffers.get(track.id)!;
      voice = this.replaceVoice(voice, track, buf, voice.offset);
    }
    const ctx = this.ctx!;
    voice.source.start(ctx.currentTime, voice.offset % voice.duration);
    voice.startedAt = ctx.currentTime;
    voice.playing = true;
    voice.consumed = true;
    // 立即排第一批自动化事件，避免第一帧使用静态基线造成起步跳变
    this.tickAutomation();
  }

  pauseTrack(track: Track) {
    const voice = this.voices.get(track.id);
    if (!voice || !voice.playing) return;
    voice.offset = this.currentOffset(voice);
    this.replaceVoice(voice, track, this.buffers.get(track.id)!, voice.offset);
  }

  stopTrack(track: Track) {
    const voice = this.voices.get(track.id);
    if (!voice) return;
    if (voice.playing || voice.consumed) {
      this.replaceVoice(voice, track, this.buffers.get(track.id)!, 0);
    } else {
      voice.offset = 0;
    }
  }

  /** 跳转：offsetSec 秒处；autoplay=true 时立即继续播放 */
  async seekTrack(track: Track, offsetSec: number, autoplay: boolean) {
    await this.ensureTrack(track);
    const voice = this.voices.get(track.id);
    const buf = this.buffers.get(track.id);
    if (!voice || !buf) return;
    const offset = track.loop
      ? ((offsetSec % buf.duration) + buf.duration) % buf.duration
      : Math.min(Math.max(0, offsetSec), buf.duration);
    const nv = this.replaceVoice(voice, track, buf, offset);
    if (autoplay) {
      nv.source.start(this.ctx!.currentTime, offset);
      nv.startedAt = this.ctx!.currentTime;
      nv.playing = true;
      nv.consumed = true;
      // seek 后旧 voice 已销毁，新节点上立刻按新媒体时间排自动化，绝不叠加旧调度
      this.tickAutomation();
    }
  }

  /**
   * 停止旧节点并按最新参数重建（仅用于暂停/停止/跳转）。
   * 位置移动严禁走此路径。
   */
  private replaceVoice(
    old: TrackVoice,
    track: Track,
    buffer: AudioBuffer,
    offset: number,
  ): TrackVoice {
    try {
      old.source.onended = null;
      old.source.stop();
    } catch {
      /* 已停止 */
    }
    old.source.disconnect();
    old.trackGain.disconnect();
    old.panner.disconnect();
    const nv = this.createVoice(track, buffer);
    nv.offset = offset;
    this.voices.set(track.id, nv);
    return nv;
  }

  private currentOffset(v: TrackVoice): number {
    let p = v.offset + (this.ctx!.currentTime - v.startedAt);
    p = v.spec.loop ? ((p % v.duration) + v.duration) % v.duration : Math.min(p, v.duration);
    return p;
  }

  removeTrack(trackId: string) {
    const voice = this.voices.get(trackId);
    if (voice) {
      try {
        voice.source.onended = null;
        voice.source.stop();
      } catch {
        /* ignore */
      }
      voice.source.disconnect();
      voice.trackGain.disconnect();
      voice.panner.disconnect();
    }
    this.voices.delete(trackId);
    this.buffers.delete(trackId);
    this.pendingFiles.delete(trackId);
  }

  getProgress(trackId: string): number | null {
    const v = this.voices.get(trackId);
    if (!v) return null;
    return v.playing ? this.currentOffset(v) : v.offset;
  }

  getDuration(trackId: string): number | null {
    return this.buffers.get(trackId)?.duration ?? null;
  }

  isPlaying(trackId: string): boolean {
    return this.voices.get(trackId)?.playing ?? false;
  }

  dispose() {
    cancelAnimationFrame(this.rafHandle);
    for (const id of [...this.voices.keys()]) this.removeTrack(id);
    void this.ctx?.close();
    this.ctx = null;
    this.unlock = 'locked';
  }
}

/**
 * 听者本地 +Y(上) 经 yaw(绕世界Y，正值右转) 与 pitch(绕本地右向量，正值抬头)
 * 后的世界上方向量。满足 right = forward × up。
 */
function localUp(yaw: number, pitch: number): { x: number; y: number; z: number } {
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  // 抬头时头顶略向 +Z（听者身后）倾；再绕世界 Y 按“右转”约定施加 yaw
  return {
    x: -sp * Math.sin(yaw),
    y: cp,
    z: sp * Math.cos(yaw),
  };
}
