var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/lib/spatial.ts
function forwardVector(yaw, pitch = 0) {
  return {
    x: Math.sin(yaw) * Math.cos(pitch),
    y: Math.sin(pitch),
    z: -Math.cos(yaw) * Math.cos(pitch)
  };
}
var init_spatial = __esm({
  "src/lib/spatial.ts"() {
    "use strict";
  }
});

// src/lib/samples.ts
var samples_exports = {};
__export(samples_exports, {
  SAMPLE_LABELS: () => SAMPLE_LABELS,
  createDuoBuffer: () => createDuoBuffer,
  createPulseBuffer: () => createPulseBuffer,
  createSampleBuffer: () => createSampleBuffer,
  createToneBuffer: () => createToneBuffer
});
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function createPulseBuffer(ctx) {
  const sr = ctx.sampleRate;
  const dur = 1.6;
  const buf = ctx.createBuffer(1, Math.floor(sr * dur), sr);
  const data = buf.getChannelData(0);
  const pulseStarts = [0.05, 0.55, 1.05];
  for (const start of pulseStarts) {
    const s0 = Math.floor(start * sr);
    const n = Math.floor(0.05 * sr);
    for (let i = 0; i < n; i++) {
      const t = i / sr;
      const env = Math.pow(1 - i / n, 1.6);
      data[s0 + i] = Math.sin(2 * Math.PI * 1200 * t) * env * 0.9;
    }
  }
  return buf;
}
function createToneBuffer(ctx) {
  const sr = ctx.sampleRate;
  const dur = 3;
  const buf = ctx.createBuffer(1, Math.floor(sr * dur), sr);
  const data = buf.getChannelData(0);
  const n = data.length;
  for (let i = 0; i < n; i++) {
    const t = i / sr;
    const fade = Math.min(1, t / 0.02, (dur - t) / 0.05);
    data[i] = Math.sin(2 * Math.PI * 440 * t) * 0.5 * fade;
  }
  return buf;
}
function createDuoBuffer(ctx, _variant) {
  const sr = ctx.sampleRate;
  const dur = 4;
  const buf = ctx.createBuffer(1, Math.floor(sr * dur), sr);
  const data = buf.getChannelData(0);
  const rand = mulberry32(20260929);
  for (let i = 0; i < data.length; i++) {
    const t = i / sr;
    const noise = (rand() * 2 - 1) * 0.18;
    const tone = Math.sin(2 * Math.PI * 330 * t) * 0.28;
    const lfo = 0.5 + 0.5 * Math.sin(2 * Math.PI * 2 * t);
    const fade = Math.min(1, t / 0.05, (dur - t) / 0.1);
    data[i] = (noise + tone) * (0.6 + 0.4 * lfo) * fade;
  }
  return buf;
}
function createSampleBuffer(ctx, type) {
  switch (type) {
    case "pulse":
      return createPulseBuffer(ctx);
    case "tone":
      return createToneBuffer(ctx);
    case "duoA":
      return createDuoBuffer(ctx, "A");
    case "duoB":
      return createDuoBuffer(ctx, "B");
    default:
      throw new Error(`\u975E\u5185\u7F6E\u6837\u4F8B\u7C7B\u578B: ${type}`);
  }
}
var SAMPLE_LABELS;
var init_samples = __esm({
  "src/lib/samples.ts"() {
    "use strict";
    SAMPLE_LABELS = {
      pulse: "\u8109\u51B2\u6837\u4F8B\uFF08\u65B9\u4F4D\u6D4B\u8BD5\uFF09",
      tone: "\u5355\u97F3\u6837\u4F8B\uFF08\u58F0\u50CF/\u8DDD\u79BB\uFF09",
      duoA: "\u53CC\u58F0\u6E90 A\uFF08\u540C\u6B65\u5DE6\uFF09",
      duoB: "\u53CC\u58F0\u6E90 B\uFF08\u540C\u6B65\u53F3\uFF09"
    };
  }
});

// src/lib/automation.ts
function framesOf(lane, param) {
  return lane.keyframes.filter((k) => k.param === param);
}
function lerp(a, b, f) {
  return a + (b - a) * f;
}
function lerpAngle(a, b, f) {
  let d = ((b - a) % TWO_PI + TWO_PI) % TWO_PI;
  if (d > Math.PI) d -= TWO_PI;
  return a + d * f;
}
function wrapPi(a) {
  let v = (a % TWO_PI + TWO_PI) % TWO_PI;
  if (v > Math.PI) v -= TWO_PI;
  return v;
}
function valueOf(kf) {
  if (kf.param === "position") return kf.position;
  if (kf.param === "orientation") return kf.orientation;
  return kf.gain;
}
function segmentAt(frames, time, period) {
  if (frames.length === 0) return void 0;
  const span = period;
  if (frames.length === 1) return { prev: frames[0], next: frames[0], f: 0 };
  if (span === void 0) {
    if (time <= frames[0].time) return { prev: frames[0], next: frames[0], f: 0 };
    const last2 = frames[frames.length - 1];
    if (time >= last2.time) return { prev: last2, next: last2, f: 0 };
  }
  const phases = frames.map((k) => {
    let p = k.time;
    if (span !== void 0) {
      p = (p % span + span) % span;
    }
    return { k, p };
  });
  phases.sort((a, b) => a.p - b.p || a.k.createdAt - b.k.createdAt);
  const t = span !== void 0 ? (time % span + span) % span : time;
  if (t <= phases[0].p) {
    if (span === void 0) return { prev: phases[0].k, next: phases[0].k, f: 0 };
    if (phases[0].p === 0) {
      const first3 = phases[0];
      const last3 = phases[phases.length - 1];
      if (t === 0) return { prev: first3.k, next: first3.k, f: 0 };
      const d2 = first3.p + span - last3.p;
      const f3 = (t - last3.p) / d2;
      return { prev: last3.k, next: first3.k, f: Math.min(1, Math.max(0, f3)) };
    }
    const first2 = phases[0];
    const last2 = phases[phases.length - 1];
    const f2 = (t + (span - last2.p)) / (first2.p + (span - last2.p));
    return { prev: last2.k, next: first2.k, f: Math.min(1, Math.max(0, f2)) };
  }
  for (let i = 0; i < phases.length - 1; i++) {
    if (t >= phases[i].p && t <= phases[i + 1].p) {
      const d2 = phases[i + 1].p - phases[i].p || 1;
      return { prev: phases[i].k, next: phases[i + 1].k, f: Math.min(1, Math.max(0, (t - phases[i].p) / d2)) };
    }
  }
  if (span === void 0) {
    const last2 = phases[phases.length - 1];
    return { prev: last2.k, next: last2.k, f: 0 };
  }
  const last = phases[phases.length - 1];
  const first = phases[0];
  const d = first.p + (span - last.p);
  const f = first.p === 0 ? (t - last.p) / d : (t - last.p) / d;
  return { prev: last.k, next: first.k, f: Math.min(1, Math.max(0, f)) };
}
function sampleLane(lane, time, loopPeriod, baseline) {
  const out = {};
  if (!lane.enabled) return out;
  const period = loopPeriod !== void 0 && loopPeriod > 0 ? loopPeriod : void 0;
  for (const param of ["position", "orientation", "gain"]) {
    const frames = framesOf(lane, param);
    if (frames.length === 0) continue;
    if (period === void 0 && time < frames[0].time) {
      if (param === "position" && baseline?.position) out.position = { ...baseline.position };
      else if (param === "orientation" && baseline?.orientation) {
        out.orientation = { ...baseline.orientation };
      } else if (param === "gain" && baseline?.gain !== void 0) {
        out.gain = baseline.gain;
      }
      continue;
    }
    const seg = segmentAt(frames, time, period);
    if (!seg) continue;
    const a = valueOf(seg.prev);
    const b = valueOf(seg.next);
    if (param === "position") {
      const pa = a;
      const pb = b;
      out.position = {
        x: lerp(pa.x, pb.x, seg.f),
        y: lerp(pa.y, pb.y, seg.f),
        z: lerp(pa.z, pb.z, seg.f)
      };
    } else if (param === "orientation") {
      const oa = a;
      const ob = b;
      out.orientation = {
        yaw: wrapPi(lerpAngle(oa.yaw, ob.yaw, seg.f)),
        pitch: lerp(oa.pitch, ob.pitch, seg.f)
      };
    } else {
      out.gain = lerp(a, b, seg.f);
    }
  }
  return out;
}
function buildSchedule(spec) {
  const { lane, fromMedia, toMedia, baseAbsTime, period, baseline } = spec;
  const events = [];
  if (!lane.enabled || toMedia <= fromMedia) return { events };
  const loop = period !== void 0 && period > 0;
  const span = loop ? period : Infinity;
  const toAbs = (media) => baseAbsTime + (media - spec.startOffset);
  const framesOfParam = (p) => lane.keyframes.filter((k) => k.param === p);
  const kfVal = (paramName, kf) => {
    if (paramName === "position") {
      const p = kf.position;
      return { x: p.x, y: p.y, z: p.z, gain: 0 };
    }
    return { x: 0, y: 0, z: 0, gain: kf.gain };
  };
  const rampComponents = (paramName, comps) => {
    const frames = framesOfParam(paramName);
    if (frames.length === 0) return;
    const anchors = [];
    if (!loop) {
      for (const kf of frames) anchors.push({ media: kf.time, v: kfVal(paramName, kf) });
    } else {
      const firstCycle = Math.floor(Math.max(0, fromMedia) / span) - 1;
      const lastCycle = Math.ceil(toMedia / span) + 1;
      for (let c = firstCycle; c <= lastCycle; c++) {
        for (const kf of frames) anchors.push({ media: c * span + kf.time, v: kfVal(paramName, kf) });
      }
      anchors.sort((a, b) => a.media - b.media);
    }
    const startSample = sampleLane(lane, Math.max(0, fromMedia), loop ? span : void 0, baseline);
    let startPos;
    if (paramName === "position" && startSample.position) {
      startPos = { ...startSample.position, gain: 0 };
    } else if (paramName === "gain" && startSample.gain !== void 0) {
      startPos = { x: 0, y: 0, z: 0, gain: startSample.gain };
    }
    for (const comp of comps) {
      const key = comp;
      let startVal = startPos?.[key];
      if (startVal === void 0) {
        continue;
      }
      events.push({ component: comp, time: toAbs(fromMedia), value: startVal, kind: "setValue" });
      for (const a of anchors) {
        if (a.media < fromMedia - 1e-7 || a.media > toMedia + 1e-7) continue;
        if (Math.abs(a.media - fromMedia) <= 1e-7) continue;
        events.push({ component: comp, time: toAbs(a.media), value: a.v[key], kind: "linearRamp" });
      }
    }
  };
  rampComponents("position", ["x", "y", "z"]);
  rampComponents("gain", ["gain"]);
  const oriFrames = framesOfParam("orientation");
  if (oriFrames.length > 0) {
    const startSample = sampleLane(lane, Math.max(0, fromMedia), loop ? span : void 0, baseline);
    if (startSample.orientation) {
      const f0 = forwardFromOrientation(startSample.orientation.yaw, startSample.orientation.pitch);
      events.push({ component: "oX", time: toAbs(fromMedia), value: f0.x, kind: "setValue" });
      events.push({ component: "oY", time: toAbs(fromMedia), value: f0.y, kind: "setValue" });
      events.push({ component: "oZ", time: toAbs(fromMedia), value: f0.z, kind: "setValue" });
    }
    let t = fromMedia + ORIENTATION_SAMPLE_STEP;
    for (; t <= toMedia + 1e-7; t += ORIENTATION_SAMPLE_STEP) {
      const s = sampleLane(lane, t, loop ? span : void 0, baseline).orientation;
      if (!s) continue;
      const f = forwardFromOrientation(s.yaw, s.pitch);
      const at = toAbs(t);
      events.push({ component: "oX", time: at, value: f.x, kind: "setValue" });
      events.push({ component: "oY", time: at, value: f.y, kind: "setValue" });
      events.push({ component: "oZ", time: at, value: f.z, kind: "setValue" });
    }
  }
  events.sort(
    (a, b) => a.component < b.component ? -1 : a.component > b.component ? 1 : a.time - b.time
  );
  return { events };
}
function forwardFromOrientation(yaw, pitch) {
  return {
    x: Math.sin(yaw) * Math.cos(pitch),
    y: Math.sin(pitch),
    z: -Math.cos(yaw) * Math.cos(pitch)
  };
}
var TWO_PI, ORIENTATION_SAMPLE_STEP;
var init_automation = __esm({
  "src/lib/automation.ts"() {
    "use strict";
    TWO_PI = Math.PI * 2;
    ORIENTATION_SAMPLE_STEP = 1 / 40;
  }
});

// src/lib/audioEngine.ts
var audioEngine_exports = {};
__export(audioEngine_exports, {
  AudioEngine: () => AudioEngine,
  DecodeError: () => DecodeError
});
function localUp(yaw, pitch) {
  const cp = Math.cos(pitch);
  const sp = Math.sin(pitch);
  return {
    x: -sp * Math.sin(yaw),
    y: cp,
    z: sp * Math.cos(yaw)
  };
}
var DecodeError, AudioEngine;
var init_audioEngine = __esm({
  "src/lib/audioEngine.ts"() {
    "use strict";
    init_spatial();
    init_samples();
    init_automation();
    DecodeError = class extends Error {
      trackId;
      constructor(trackId, message) {
        super(message);
        this.name = "DecodeError";
        this.trackId = trackId;
      }
    };
    AudioEngine = class _AudioEngine {
      ctx = null;
      unlock = "locked";
      busGain = null;
      masterGain = null;
      soloBus = null;
      muteBus = null;
      analyser = null;
      timeDomainBuf = new Float32Array(new ArrayBuffer(8192));
      peakWorklet = null;
      workletFailed = false;
      voices = /* @__PURE__ */ new Map();
      buffers = /* @__PURE__ */ new Map();
      pendingFiles = /* @__PURE__ */ new Map();
      spatial = null;
      anySolo = false;
      /** 每轨自动化轨（工程相对时间关键帧），由 UI 层同步 */
      lanes = /* @__PURE__ */ new Map();
      /**
       * 播放中人工拖拽/推子形成的临时覆盖：键存在表示该参数由人工接管，
       * 自动化调度跳过它。取消覆盖后立刻回到计划轨迹；提交才写入关键帧。
       */
      overrides = /* @__PURE__ */ new Map();
      /** 最近一次调度器输出的媒体时间，供 live 读数与测试断言 */
      lastMediaTime = /* @__PURE__ */ new Map();
      unlockListeners = /* @__PURE__ */ new Set();
      levelListeners = /* @__PURE__ */ new Set();
      endedListeners = /* @__PURE__ */ new Set();
      liveListeners = /* @__PURE__ */ new Set();
      rafHandle = 0;
      /** 调度前瞻窗口（秒）：每个 rAF tick 重排该窗口内的全部 AudioParam 事件 */
      static SCHEDULE_AHEAD = 0.35;
      /** live 读数 rAF 节流间隔（秒） */
      static LIVE_INTERVAL = 1 / 30;
      lastLiveEmit = 0;
      clipLatchL = false;
      clipLatchR = false;
      lastPeak = { l: 0, r: 0, clipL: false, clipR: false };
      onUnlock(fn) {
        this.unlockListeners.add(fn);
        fn(this.unlock);
        return () => {
          this.unlockListeners.delete(fn);
        };
      }
      onLevels(fn) {
        this.levelListeners.add(fn);
        return () => {
          this.levelListeners.delete(fn);
        };
      }
      onEnded(fn) {
        this.endedListeners.add(fn);
        return () => {
          this.endedListeners.delete(fn);
        };
      }
      onLive(fn) {
        this.liveListeners.add(fn);
        return () => {
          this.liveListeners.delete(fn);
        };
      }
      emitUnlock() {
        this.unlockListeners.forEach((fn) => fn(this.unlock));
      }
      /** 必须在用户手势中调用；与“未解锁”分别上报明确的失败状态 */
      async resume() {
        if (this.unlock === "unlocked" && this.ctx) {
          if (this.ctx.state === "suspended") await this.ctx.resume();
          return;
        }
        this.unlock = "unlocking";
        this.emitUnlock();
        try {
          const Ctor = window.AudioContext ?? window.webkitAudioContext;
          if (!Ctor) throw new Error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301 Web Audio API");
          const ctx = new Ctor();
          this.ctx = ctx;
          this.buildGraph(ctx);
          if (ctx.state === "suspended") await ctx.resume();
          if (ctx.state !== "running") {
            throw new Error("AudioContext \u88AB\u6D4F\u89C8\u5668\u7B56\u7565\u963B\u6B62\uFF0C\u672A\u80FD\u8FDB\u5165 running \u72B6\u6001");
          }
          this.unlock = "unlocked";
          this.emitUnlock();
          this.startMeterLoop();
          void this.ensurePeakWorklet(ctx);
        } catch (err) {
          this.unlock = "failed";
          this.emitUnlock();
          throw err;
        }
      }
      buildGraph(ctx) {
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
        this.masterGain.connect(this.analyser);
        this.analyser.connect(ctx.destination);
      }
      /**
       * 峰值/削波检测器串联在 masterGain 之后、destination 之前的真实输出链上，
       * 逐采样扫描。Worklet 源码以 Blob 注入，无需额外网络资源。
       */
      async ensurePeakWorklet(ctx) {
        if (this.peakWorklet || this.workletFailed) return !!this.peakWorklet;
        try {
          const workletSource = `
class PeakMeterProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    const in0 = inputs[0];
    const out0 = outputs[0];
    if (!in0 || in0.length === 0) {
      // \u4E0A\u6E38\u9759\u9ED8\u4F18\u5316\u65F6\u8F93\u51FA\u4FDD\u6301\u96F6\u586B\u5145\u5373\u53EF
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
      if (ol) ol[i] = vl; // \u5FC5\u987B\u663E\u5F0F\u900F\u4F20\uFF0C\u5426\u5219\u8F93\u51FA\u9759\u97F3
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
          const blob = new Blob([workletSource], { type: "application/javascript" });
          const url = URL.createObjectURL(blob);
          try {
            await ctx.audioWorklet.addModule(url);
          } finally {
            URL.revokeObjectURL(url);
          }
          const node = new AudioWorkletNode(ctx, "peak-meter", {
            // 节点串在真实输出链上：必须保持立体声直通，避免被下混成单声道
            numberOfInputs: 1,
            numberOfOutputs: 1,
            outputChannelCount: [2]
          });
          node.channelCount = 2;
          node.channelInterpretation = "speakers";
          this.masterGain.disconnect();
          this.masterGain.connect(node);
          this.analyser.disconnect();
          node.connect(this.analyser);
          this.analyser.connect(ctx.destination);
          node.port.onmessage = (e) => {
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
      startMeterLoop() {
        const tick = () => {
          if (!this.peakWorklet && this.analyser) {
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
              clipR: this.clipLatchR
            };
          }
          this.tickAutomation();
          const p = this.lastPeak;
          this.levelListeners.forEach((fn) => fn({ ...p }));
          const now = this.ctx?.currentTime ?? 0;
          if (now - this.lastLiveEmit >= _AudioEngine.LIVE_INTERVAL) {
            this.lastLiveEmit = now;
            this.emitLive();
          }
          this.rafHandle = requestAnimationFrame(tick);
        };
        this.rafHandle = requestAnimationFrame(tick);
      }
      // ---------- 全局参数 ----------
      setSpatialSettings(s) {
        this.spatial = s;
        if (!this.ctx) return;
        for (const v of this.voices.values()) {
          v.panner.distanceModel = s.distanceModel;
          v.panner.refDistance = s.refDistance;
          v.panner.rolloffFactor = s.rolloffFactor;
          v.panner.maxDistance = s.maxDistance;
        }
      }
      setBusGain(g2) {
        if (this.busGain && this.ctx) {
          this.busGain.gain.setTargetAtTime(g2, this.ctx.currentTime, 0.01);
        }
      }
      setMasterGain(g2) {
        if (this.masterGain && this.ctx) {
          this.masterGain.gain.setTargetAtTime(g2, this.ctx.currentTime, 0.01);
        }
      }
      /** 听者位置/朝向；朝向定义与 spatial.ts、Three.js 相机严格一致 */
      setListener(l) {
        if (!this.ctx) return;
        const t = this.ctx.currentTime;
        const f = forwardVector(l.yaw, l.pitch);
        const u = localUp(l.yaw, l.pitch);
        const li = this.ctx.listener;
        const set = (p, v) => {
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
      async ensureTrack(track) {
        if (!this.ctx || this.unlock !== "unlocked") return;
        let buffer = this.buffers.get(track.id);
        if (!buffer) {
          if (track.sourceType === "file") {
            const blob = this.pendingFiles.get(track.id);
            if (!blob) return;
            try {
              const arr = await blob.arrayBuffer();
              buffer = await this.ctx.decodeAudioData(arr.slice(0));
            } catch (err) {
              throw new DecodeError(
                track.id,
                `\u97F3\u9891\u89E3\u7801\u5931\u8D25\uFF1A${err instanceof Error ? err.message : "\u4E0D\u652F\u6301\u7684\u7F16\u7801\u6216\u6587\u4EF6\u635F\u574F"}`
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
      setFileBlob(trackId, blob) {
        this.pendingFiles.set(trackId, blob);
      }
      dropBuffer(trackId) {
        this.buffers.delete(trackId);
      }
      createVoice(track, buffer) {
        const ctx = this.ctx;
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = track.loop;
        const trackGain = ctx.createGain();
        trackGain.gain.value = track.muted ? 0 : track.gain;
        const panner = new PannerNode(ctx, {
          panningModel: "HRTF",
          distanceModel: this.spatial?.distanceModel ?? "inverse",
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
          orientationZ: forwardVector(track.orientation.yaw, track.orientation.pitch).z
        });
        if (buffer.numberOfChannels <= 1) {
          source.connect(trackGain);
        } else {
          const splitter = ctx.createChannelSplitter(buffer.numberOfChannels);
          source.connect(splitter);
          const ch = Math.min(track.channel, buffer.numberOfChannels - 1);
          splitter.connect(trackGain, ch);
        }
        trackGain.connect(panner);
        const audible = this.shouldBeAudible(track);
        panner.connect(audible ? this.soloBus : this.muteBus);
        const voice = {
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
          duration: buffer.duration
        };
        source.onended = () => {
          if (!voice.playing) return;
          const latest = voice.spec;
          voice.playing = false;
          voice.consumed = true;
          voice.offset = 0;
          const fresh = this.createVoice(latest, buffer);
          fresh.offset = 0;
          this.voices.set(track.id, fresh);
          this.endedListeners.forEach((fn) => fn(track.id));
        };
        return voice;
      }
      shouldBeAudible(track) {
        if (track.muted) return false;
        if (this.anySolo) return track.solo;
        return true;
      }
      /**
       * 实时参数更新：不触碰 source 节点 —— 移动声源不会重启音轨。
       * 播放中若某参数已被自动化或人工覆盖接管，则跳过该参数，避免两条写入互相打架。
       */
      updateVoiceLive(voice, track) {
        const ctx = this.ctx;
        const t = ctx.currentTime;
        const tau = Math.max(5e-3, this.spatial?.positionTimeConstant ?? 0.05);
        const owner = this.paramOwnership(voice.trackId);
        if (!voice.playing || !owner.has("position")) {
          voice.panner.positionX.setTargetAtTime(track.position.x, t, tau);
          voice.panner.positionY.setTargetAtTime(track.position.y, t, tau);
          voice.panner.positionZ.setTargetAtTime(track.position.z, t, tau);
        }
        if (!voice.playing || !owner.has("orientation")) {
          const f = forwardVector(track.orientation.yaw, track.orientation.pitch);
          voice.panner.orientationX.setTargetAtTime(f.x, t, tau);
          voice.panner.orientationY.setTargetAtTime(f.y, t, tau);
          voice.panner.orientationZ.setTargetAtTime(f.z, t, tau);
        }
        voice.panner.distanceModel = this.spatial?.distanceModel ?? voice.panner.distanceModel;
        const gainOwned = voice.playing && (owner.has("gain") || track.muted);
        if (!gainOwned) {
          voice.trackGain.gain.setTargetAtTime(track.muted ? 0 : track.gain, t, 0.01);
        } else if (track.muted) {
          voice.trackGain.gain.setTargetAtTime(0, t, 5e-3);
        }
        if (voice.source.loop !== track.loop) voice.source.loop = track.loop;
        const audible = this.shouldBeAudible(track);
        if (audible !== voice.audiblyRouted) {
          voice.panner.disconnect();
          voice.panner.connect(audible ? this.soloBus : this.muteBus);
          voice.audiblyRouted = audible;
        }
        voice.spec = track;
      }
      /** 静音/独奏变化：重新评估全部路由（增益本身在 updateVoiceLive 中已设置） */
      reevaluateRouting(tracks) {
        this.anySolo = tracks.some((t) => t.solo);
        if (!this.ctx) return;
        for (const tr of tracks) {
          const v = this.voices.get(tr.id);
          if (!v) continue;
          const audible = this.shouldBeAudible(tr);
          if (audible !== v.audiblyRouted) {
            v.panner.disconnect();
            v.panner.connect(audible ? this.soloBus : this.muteBus);
            v.audiblyRouted = audible;
          }
          const owner = this.paramOwnership(tr.id);
          if (tr.muted) {
            v.trackGain.gain.setTargetAtTime(0, this.ctx.currentTime, 5e-3);
          } else if (!(v.playing && owner.has("gain"))) {
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
      syncTracks(tracks) {
        if (!this.ctx) return;
        this.anySolo = tracks.some((t) => t.solo);
        for (const tr of tracks) {
          const v = this.voices.get(tr.id);
          if (v) this.updateVoiceLive(v, tr);
        }
      }
      getChannelCount(trackId) {
        return this.buffers.get(trackId)?.numberOfChannels ?? null;
      }
      /**
       * 重建声轨输入图（切换立体声文件的 L/R 声道时使用）。
       * 保持播放偏移；若原本在播放，从同一位置继续（声道选择本身不属于“移动”）。
       */
      async rebuildVoiceGraph(track) {
        await this.ensureTrack(track);
        const old = this.voices.get(track.id);
        const buf = this.buffers.get(track.id);
        if (!old || !buf) return;
        const wasPlaying = old.playing;
        const offset = wasPlaying ? this.currentOffset(old) : old.offset;
        const nv = this.replaceVoice(old, track, buf, offset);
        if (wasPlaying) {
          nv.source.start(this.ctx.currentTime, offset);
          nv.startedAt = this.ctx.currentTime;
          nv.playing = true;
          nv.consumed = true;
          this.tickAutomation();
        }
      }
      // ---------- 自动化调度 ----------
      /** UI 层把工程内全部自动化轨同步给引擎（引用替换，不复制关键帧） */
      setAutomationLanes(lanes) {
        this.lanes = new Map(Object.entries(lanes));
      }
      paramOwnership(trackId) {
        const owned = /* @__PURE__ */ new Set();
        const lane = this.lanes.get(trackId);
        if (lane?.enabled) {
          if (lane.keyframes.some((k) => k.param === "position")) owned.add("position");
          if (lane.keyframes.some((k) => k.param === "orientation")) owned.add("orientation");
          if (lane.keyframes.some((k) => k.param === "gain")) owned.add("gain");
        }
        for (const p of this.overrides.get(trackId) ?? []) owned.add(p);
        return owned;
      }
      /** 播放中人工操作开始：该参数进入临时覆盖，立即取消它的自动化计划事件 */
      beginOverride(trackId, param, value) {
        const v = this.voices.get(trackId);
        if (!v || !v.playing) return;
        let set = this.overrides.get(trackId);
        if (!set) {
          set = /* @__PURE__ */ new Set();
          this.overrides.set(trackId, set);
        }
        set.add(param);
        this.applyOverrideValue(v, param, value);
      }
      /** 覆盖过程中持续写入（拖拽移动），不触碰 source */
      updateOverride(trackId, param, value) {
        const v = this.voices.get(trackId);
        if (!v || !v.playing || !this.overrides.get(trackId)?.has(param)) return;
        this.applyOverrideValue(v, param, value);
      }
      applyOverrideValue(v, param, value) {
        const ctx = this.ctx;
        const now = ctx.currentTime;
        const cancel = (p) => {
          if (!p) return;
          p.cancelScheduledValues(now);
        };
        const smooth = (p, x) => {
          if (p) {
            try {
              p.setTargetAtTime(x, now, Math.max(5e-3, this.spatial?.positionTimeConstant ?? 0.05));
            } catch {
              p.setValueAtTime(x, now);
            }
          }
        };
        if (param === "position") {
          const pos = value;
          cancel(v.panner.positionX);
          cancel(v.panner.positionY);
          cancel(v.panner.positionZ);
          smooth(v.panner.positionX, pos.x);
          smooth(v.panner.positionY, pos.y);
          smooth(v.panner.positionZ, pos.z);
        } else if (param === "orientation") {
          const o = value;
          const f = forwardVector(o.yaw, o.pitch);
          cancel(v.panner.orientationX);
          cancel(v.panner.orientationY);
          cancel(v.panner.orientationZ);
          smooth(v.panner.orientationX, f.x);
          smooth(v.panner.orientationY, f.y);
          smooth(v.panner.orientationZ, f.z);
        } else {
          cancel(v.trackGain.gain);
          smooth(v.trackGain.gain, v.spec.muted ? 0 : value);
        }
      }
      /** 取消覆盖：返回该参数当前“计划值”供 UI 回弹到轨迹；调度器下一 tick 重排 */
      cancelOverride(trackId, param) {
        const set = this.overrides.get(trackId);
        if (!set) return null;
        set.delete(param);
        if (set.size === 0) this.overrides.delete(trackId);
        const v = this.voices.get(trackId);
        if (!v) return null;
        const media = this.currentMediaTime(v);
        const lane = this.lanes.get(trackId);
        const s = lane ? sampleLane(lane, media, v.spec.loop ? v.duration : void 0, {
          position: v.spec.position,
          orientation: v.spec.orientation,
          gain: v.spec.muted ? 0 : v.spec.gain
        }) : {};
        if (param === "position") {
          const pos = s.position ?? v.spec.position;
          this.applyImmediateParam(v, param, pos);
          return pos;
        }
        if (param === "orientation") {
          const o = s.orientation ?? v.spec.orientation;
          this.applyImmediateParam(v, param, o);
          return o;
        }
        const g2 = s.gain ?? v.spec.gain;
        this.applyImmediateParam(v, param, g2);
        return g2;
      }
      /** 提交覆盖后调用：清除该参数覆盖（UI 会把关键帧写入 lane 并同步） */
      clearOverride(trackId, param) {
        const set = this.overrides.get(trackId);
        if (!set) return;
        set.delete(param);
        if (set.size === 0) this.overrides.delete(trackId);
      }
      /** 暂停/停止/seek/切歌：全部覆盖作废，参数所有权回归工程数据 */
      clearAllOverrides(trackId) {
        if (trackId) this.overrides.delete(trackId);
        else this.overrides.clear();
      }
      hasOverride(trackId, param) {
        return this.overrides.get(trackId)?.has(param) ?? false;
      }
      getOverrides(trackId) {
        return [...this.overrides.get(trackId) ?? []];
      }
      applyImmediateParam(v, param, value) {
        const now = this.ctx.currentTime;
        if (param === "position") {
          const p = value;
          v.panner.positionX.cancelScheduledValues(now);
          v.panner.positionY.cancelScheduledValues(now);
          v.panner.positionZ.cancelScheduledValues(now);
          v.panner.positionX.setValueAtTime(p.x, now);
          v.panner.positionY.setValueAtTime(p.y, now);
          v.panner.positionZ.setValueAtTime(p.z, now);
        } else if (param === "orientation") {
          const o = value;
          const f = forwardVector(o.yaw, o.pitch);
          v.panner.orientationX.cancelScheduledValues(now);
          v.panner.orientationY.cancelScheduledValues(now);
          v.panner.orientationZ.cancelScheduledValues(now);
          v.panner.orientationX.setValueAtTime(f.x, now);
          v.panner.orientationY.setValueAtTime(f.y, now);
          v.panner.orientationZ.setValueAtTime(f.z, now);
        } else {
          v.trackGain.gain.cancelScheduledValues(now);
          v.trackGain.gain.setValueAtTime(v.spec.muted ? 0 : value, now);
        }
      }
      currentMediaTime(v) {
        if (!v.playing) return v.offset;
        let p = v.offset + (this.ctx.currentTime - v.startedAt);
        if (v.spec.loop) p = (p % v.duration + v.duration) % v.duration;
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
      tickAutomation() {
        if (!this.ctx) return;
        for (const [trackId, v] of this.voices) {
          if (!v.playing) continue;
          const lane = this.lanes.get(trackId);
          if (!lane || !lane.enabled || lane.keyframes.length === 0) continue;
          const now = this.ctx.currentTime;
          const mediaWrapped = this.currentMediaTime(v);
          this.lastMediaTime.set(trackId, mediaWrapped);
          const period = v.spec.loop ? v.duration : void 0;
          const mediaLinear = v.playing ? v.spec.loop ? v.offset + (now - v.startedAt) : Math.min(v.offset + (now - v.startedAt), v.duration) : v.offset;
          const schedule = buildSchedule({
            lane,
            fromMedia: mediaLinear,
            toMedia: mediaLinear + _AudioEngine.SCHEDULE_AHEAD,
            baseAbsTime: v.startedAt,
            period,
            startOffset: v.offset,
            baseline: {
              position: v.spec.position,
              orientation: v.spec.orientation,
              gain: v.spec.muted ? 0 : v.spec.gain
            }
          });
          const overridden = this.overrides.get(trackId) ?? /* @__PURE__ */ new Set();
          const muted = v.spec.muted;
          const paramOfComp = (c) => c === "gain" ? "gain" : c === "x" || c === "y" || c === "z" ? "position" : "orientation";
          const involvedParams = new Set(schedule.events.map((e) => paramOfComp(e.component)));
          for (const p of involvedParams) {
            if (overridden.has(p)) continue;
            if (p === "position") {
              v.panner.positionX.cancelScheduledValues(now);
              v.panner.positionY.cancelScheduledValues(now);
              v.panner.positionZ.cancelScheduledValues(now);
            } else if (p === "orientation") {
              v.panner.orientationX.cancelScheduledValues(now);
              v.panner.orientationY.cancelScheduledValues(now);
              v.panner.orientationZ.cancelScheduledValues(now);
            } else {
              v.trackGain.gain.cancelScheduledValues(now);
            }
          }
          for (const e of schedule.events) {
            if (e.time < now - 1e-4) continue;
            const p = paramOfComp(e.component);
            if (overridden.has(p)) continue;
            const target = this.automationAudioParam(v, e.component);
            if (!target) continue;
            const value = muted && p === "gain" ? 0 : e.value;
            try {
              if (e.kind === "setValue") target.setValueAtTime(value, e.time);
              else target.linearRampToValueAtTime(value, e.time);
            } catch {
            }
          }
        }
      }
      automationAudioParam(v, comp) {
        if (comp === "x") return v.panner.positionX;
        if (comp === "y") return v.panner.positionY;
        if (comp === "z") return v.panner.positionZ;
        if (comp === "oX") return v.panner.orientationX;
        if (comp === "oY") return v.panner.orientationY;
        if (comp === "oZ") return v.panner.orientationZ;
        if (comp === "gain") return v.trackGain.gain;
        return null;
      }
      /**
       * 把“实际写进 PannerNode 的东西”作为唯一读数发出：
       * 未被覆盖的参数直接采样自动化曲线；被覆盖的参数读 AudioParam.value，
       * 2D/3D/方位显示都消费这一份，保证与实际声像一致。
       */
      emitLive() {
        if (!this.ctx || this.liveListeners.size === 0) return;
        let any = false;
        const updates = /* @__PURE__ */ new Map();
        for (const [trackId, v] of this.voices) {
          if (!v.playing) continue;
          any = true;
          const media = this.currentMediaTime(v);
          const lane = this.lanes.get(trackId);
          const sampled = lane ? sampleLane(lane, media, v.spec.loop ? v.duration : void 0, {
            position: v.spec.position,
            orientation: v.spec.orientation,
            gain: v.spec.muted ? 0 : v.spec.gain
          }) : {};
          const overridden = this.overrides.get(trackId);
          const t = { mediaTime: media };
          const autoActive = lane?.enabled && lane.keyframes.length > 0;
          if (overridden?.has("position")) {
            t.position = {
              x: v.panner.positionX.value,
              y: v.panner.positionY.value,
              z: v.panner.positionZ.value
            };
          } else if (sampled.position) t.position = sampled.position;
          else if (autoActive) t.position = { ...v.spec.position };
          if (overridden?.has("orientation")) {
            t.orientation = { ...v.spec.orientation };
          } else if (sampled.orientation) t.orientation = sampled.orientation;
          else if (autoActive) t.orientation = { ...v.spec.orientation };
          if (overridden?.has("gain")) t.gain = v.trackGain.gain.value;
          else if (sampled.gain !== void 0) t.gain = sampled.gain;
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
      getMediaTime(trackId) {
        return this.getMediaTimeForTest(trackId) ?? 0;
      }
      /** 测试用：立即执行一次自动化重排 */
      runAutomationTickForTest() {
        this.tickAutomation();
      }
      getMediaTimeForTest(trackId) {
        const v = this.voices.get(trackId);
        return v ? this.currentMediaTime(v) : void 0;
      }
      // ---------- 传输控制 ----------
      async playTrack(track) {
        await this.ensureTrack(track);
        let voice = this.voices.get(track.id);
        if (!voice) return;
        if (voice.playing) return;
        if (voice.consumed) {
          const buf = this.buffers.get(track.id);
          voice = this.replaceVoice(voice, track, buf, voice.offset);
        }
        const ctx = this.ctx;
        voice.source.start(ctx.currentTime, voice.offset % voice.duration);
        voice.startedAt = ctx.currentTime;
        voice.playing = true;
        voice.consumed = true;
        this.tickAutomation();
      }
      pauseTrack(track) {
        const voice = this.voices.get(track.id);
        if (!voice || !voice.playing) return;
        voice.offset = this.currentOffset(voice);
        this.replaceVoice(voice, track, this.buffers.get(track.id), voice.offset);
      }
      stopTrack(track) {
        const voice = this.voices.get(track.id);
        if (!voice) return;
        if (voice.playing || voice.consumed) {
          this.replaceVoice(voice, track, this.buffers.get(track.id), 0);
        } else {
          voice.offset = 0;
        }
      }
      /** 跳转：offsetSec 秒处；autoplay=true 时立即继续播放 */
      async seekTrack(track, offsetSec, autoplay) {
        await this.ensureTrack(track);
        const voice = this.voices.get(track.id);
        const buf = this.buffers.get(track.id);
        if (!voice || !buf) return;
        const offset = track.loop ? (offsetSec % buf.duration + buf.duration) % buf.duration : Math.min(Math.max(0, offsetSec), buf.duration);
        const nv = this.replaceVoice(voice, track, buf, offset);
        if (autoplay) {
          nv.source.start(this.ctx.currentTime, offset);
          nv.startedAt = this.ctx.currentTime;
          nv.playing = true;
          nv.consumed = true;
          this.tickAutomation();
        }
      }
      /**
       * 停止旧节点并按最新参数重建（仅用于暂停/停止/跳转）。
       * 位置移动严禁走此路径。
       */
      replaceVoice(old, track, buffer, offset) {
        try {
          old.source.onended = null;
          old.source.stop();
        } catch {
        }
        old.source.disconnect();
        old.trackGain.disconnect();
        old.panner.disconnect();
        const nv = this.createVoice(track, buffer);
        nv.offset = offset;
        this.voices.set(track.id, nv);
        return nv;
      }
      currentOffset(v) {
        let p = v.offset + (this.ctx.currentTime - v.startedAt);
        p = v.spec.loop ? (p % v.duration + v.duration) % v.duration : Math.min(p, v.duration);
        return p;
      }
      removeTrack(trackId) {
        const voice = this.voices.get(trackId);
        if (voice) {
          try {
            voice.source.onended = null;
            voice.source.stop();
          } catch {
          }
          voice.source.disconnect();
          voice.trackGain.disconnect();
          voice.panner.disconnect();
        }
        this.voices.delete(trackId);
        this.buffers.delete(trackId);
        this.pendingFiles.delete(trackId);
      }
      getProgress(trackId) {
        const v = this.voices.get(trackId);
        if (!v) return null;
        return v.playing ? this.currentOffset(v) : v.offset;
      }
      getDuration(trackId) {
        return this.buffers.get(trackId)?.duration ?? null;
      }
      isPlaying(trackId) {
        return this.voices.get(trackId)?.playing ?? false;
      }
      dispose() {
        cancelAnimationFrame(this.rafHandle);
        for (const id of [...this.voices.keys()]) this.removeTrack(id);
        void this.ctx?.close();
        this.ctx = null;
        this.unlock = "locked";
      }
    };
  }
});

// test/engine.test.ts
import assert from "node:assert/strict";
import { describe, it, beforeEach, afterEach } from "node:test";
var FakeAudioParam = class {
  value;
  events = [];
  ramps = [];
  cancels = [];
  constructor(v) {
    this.value = v;
  }
  setTargetAtTime(v, time, tc) {
    this.value = v;
    this.events.push({ time, value: v, tc });
  }
  setValueAtTime(v, time) {
    this.value = v;
    this.events.push({ time, value: v, tc: 0 });
  }
  linearRampToValueAtTime(v, time) {
    this.ramps.push({ time, value: v });
  }
  cancelScheduledValues(time) {
    this.cancels.push(time);
    this.events = this.events.filter((e) => e.time < time);
    this.ramps = this.ramps.filter((e) => e.time < time);
  }
  cancelAndHoldAtTime(time) {
    this.cancelScheduledValues(time);
  }
};
var FakeNode = class {
  connects = [];
  disconnected = false;
  connectedFrom = [];
  connect(node, out, inp) {
    const target = node.input ?? node;
    this.connects.push({ node: target, out, inp });
    target.connectedFrom.push(this);
    return target;
  }
  disconnect() {
    this.connects = [];
    this.disconnected = true;
  }
};
var FakeGain = class extends FakeNode {
  gain = new FakeAudioParam(1);
};
var FakeStereoPanner = class extends FakeNode {
};
var FakeDestination = class extends FakeNode {
};
var FakePanner = class extends FakeNode {
  panningModel = "HRTF";
  distanceModel = "inverse";
  refDistance = 1;
  rolloffFactor = 1;
  maxDistance = 100;
  positionX = new FakeAudioParam(0);
  positionY = new FakeAudioParam(0);
  positionZ = new FakeAudioParam(0);
  positionTimeConstant = 0;
  orientationX = new FakeAudioParam(0);
  orientationY = new FakeAudioParam(0);
  orientationZ = new FakeAudioParam(-1);
  constructor(_ctx, opts = {}) {
    super();
    Object.assign(this, opts);
    if (opts.positionX !== void 0) this.positionX = new FakeAudioParam(opts.positionX);
    if (opts.positionY !== void 0) this.positionY = new FakeAudioParam(opts.positionY);
    if (opts.positionZ !== void 0) this.positionZ = new FakeAudioParam(opts.positionZ);
    if (opts.orientationX !== void 0) this.orientationX = new FakeAudioParam(opts.orientationX);
    if (opts.orientationY !== void 0) this.orientationY = new FakeAudioParam(opts.orientationY);
    if (opts.orientationZ !== void 0) this.orientationZ = new FakeAudioParam(opts.orientationZ);
  }
};
var FakeBufferSource = class extends FakeNode {
  buffer = null;
  loop = false;
  started = [];
  stopped = 0;
  onended = null;
  start(time, offset = 0) {
    this.started.push({ time, offset });
  }
  stop() {
    this.stopped++;
  }
};
var FakeBuffer = class {
  duration;
  numberOfChannels;
  length;
  sampleRate;
  data;
  constructor(ch, length, sr, duration) {
    this.numberOfChannels = ch;
    this.length = length;
    this.sampleRate = sr;
    this.duration = duration;
    this.data = Array.from({ length: ch }, () => new Float32Array(length));
  }
  getChannelData(i) {
    return this.data[i];
  }
};
var FakeSplitter = class extends FakeNode {
  constructor(channels) {
    super();
    this.channels = channels;
  }
};
var FakeMerger = class extends FakeNode {
};
var FakeListener = class {
  positionX = new FakeAudioParam(0);
  positionY = new FakeAudioParam(0);
  positionZ = new FakeAudioParam(0);
  forwardX = new FakeAudioParam(0);
  forwardY = new FakeAudioParam(0);
  forwardZ = new FakeAudioParam(-1);
  upX = new FakeAudioParam(0);
  upY = new FakeAudioParam(1);
  upZ = new FakeAudioParam(0);
};
var FakeAnalyser = class extends FakeNode {
  fftSize = 2048;
  getFloatTimeDomainData(arr) {
    arr.fill(0);
  }
};
var FakeAudioContext = class {
  state = "running";
  currentTime = 0;
  playbackRate = { value: 1 };
  destination = new FakeDestination();
  listener = new FakeListener();
  sampleRate = 48e3;
  audioWorklet = {
    addModule: async () => {
      throw new Error("worklet unavailable in test");
    }
  };
  createGain() {
    return new FakeGain();
  }
  createBufferSource() {
    return new FakeBufferSource();
  }
  createBuffer(ch, length, sr) {
    return new FakeBuffer(ch, length, sr, length / sr);
  }
  createChannelSplitter(ch) {
    return new FakeSplitter(ch);
  }
  createChannelMerger(ch) {
    return new FakeMerger();
  }
  createAnalyser() {
    return new FakeAnalyser();
  }
  createStereoPanner() {
    return new FakeStereoPanner();
  }
  async resume() {
    this.state = "running";
  }
  async decodeAudioData(buf) {
    const text = new TextDecoder().decode(buf);
    if (text === "BAD") throw new Error("EncodingError: fake bad file");
    return new FakeBuffer(1, 48e3, 48e3, 1);
  }
  async close() {
  }
};
var g = globalThis;
g.AudioContext = FakeAudioContext;
g.requestAnimationFrame = (fn) => {
  return setTimeout(() => fn(0), 16);
};
g.cancelAnimationFrame = (id) => clearTimeout(id);
g.window = globalThis;
g.PannerNode = FakePanner;
var { AudioEngine: AudioEngine2, DecodeError: DecodeError2 } = await Promise.resolve().then(() => (init_audioEngine(), audioEngine_exports));
var { createSampleBuffer: createSampleBuffer2 } = await Promise.resolve().then(() => (init_samples(), samples_exports));
function baseTrack(over = {}) {
  return {
    id: "t1",
    name: "T",
    sourceType: "tone",
    loop: false,
    muted: false,
    solo: false,
    gain: 0.8,
    channel: 0,
    color: "#fff",
    position: { x: 2, y: 0, z: 0 },
    orientation: { yaw: 0, pitch: 0 },
    status: "pending",
    ...over
  };
}
describe("AudioEngine \u56FE\u884C\u4E3A\uFF08\u6A21\u62DF\u73AF\u5883\uFF09", () => {
  let engine;
  beforeEach(() => {
    engine = new AudioEngine2();
  });
  afterEach(() => {
    engine.dispose();
  });
  it("resume \u89E3\u9501\uFF1BsetListener \u5199\u5165\u4E0E\u7A7A\u95F4\u6570\u5B66\u4E00\u81F4\u7684\u671D\u5411", async () => {
    await engine.resume();
    assert.equal(engine.unlock, "unlocked");
    engine.setListener({
      position: { x: 0, y: 0, z: 3 },
      yaw: Math.PI / 2,
      // 右转 → forward (+1,0,0)
      pitch: 0,
      earHeight: 0
    });
    const li = engine.ctx.listener;
    assert.ok(Math.abs(li.forwardX.value - 1) < 1e-6);
    assert.ok(Math.abs(li.forwardZ.value) < 1e-6);
    assert.ok(Math.abs(li.upY.value - 1) < 1e-6);
    assert.ok(Math.abs(li.positionZ.value - 3) < 1e-6);
  });
  it("\u58F0\u8F68\u94FE\u8DEF\u4E3A source\u2192trackGain\u2192HRTF panner\u2192soloBus\u2192\u2026\u2192destination\uFF1B\u8DDD\u79BB\u6A21\u578B\u53C2\u6570\u4E0B\u53D1", async () => {
    await engine.resume();
    engine.setSpatialSettings({
      distanceModel: "exponential",
      refDistance: 2,
      rolloffFactor: 1.5,
      maxDistance: 25,
      positionTimeConstant: 0.05,
      hrtfIR: "none"
    });
    const track = baseTrack();
    await engine.ensureTrack(track);
    const voices = engine.voices;
    const v = voices.get("t1");
    assert.equal(v.panner.panningModel, "HRTF");
    assert.equal(v.panner.distanceModel, "exponential");
    assert.equal(v.panner.refDistance, 2);
    assert.equal(v.panner.rolloffFactor, 1.5);
    assert.equal(v.panner.maxDistance, 25);
    assert.ok(Math.abs(v.panner.positionX.value - 2) < 1e-9);
    assert.ok(v.source.connects.some((c) => c.node === v.trackGain));
    assert.ok(v.trackGain.connects.some((c) => c.node === v.panner));
    const soloBus = engine.soloBus;
    assert.ok(v.panner.connects.some((c) => c.node === soloBus));
  });
  it("\u9759\u97F3\u771F\u5B9E\u628A trackGain \u7F6E 0\uFF1B\u72EC\u594F\u628A\u975E\u72EC\u594F\u58F0\u8F68\u5207\u5230 muteBus", async () => {
    await engine.resume();
    const a = baseTrack({ id: "a" });
    const b = baseTrack({ id: "b", position: { x: -2, y: 0, z: 0 } });
    await engine.ensureTrack(a);
    await engine.ensureTrack(b);
    const voices = engine.voices;
    const muteBus = engine.muteBus;
    engine.syncTracks([{ ...a, muted: true }, b]);
    assert.equal(voices.get("a").trackGain.gain.value, 0);
    assert.equal(voices.get("b").trackGain.gain.value, 0.8);
    engine.syncTracks([{ ...a, muted: true }, { ...b, solo: true }]);
    assert.ok(voices.get("a").panner.connects.some((c) => c.node === muteBus));
    assert.ok(
      voices.get("b").panner.connects.every((c) => c.node !== muteBus)
    );
    engine.syncTracks([{ ...a, muted: true }, b]);
    assert.ok(voices.get("a").panner.connects.some((c) => c.node === muteBus));
    assert.ok(
      voices.get("a").panner.connects.every((c) => c.node === muteBus)
    );
  });
  it("\u79FB\u52A8\u58F0\u6E90\u53EA\u5199 AudioParam\uFF0C\u7EDD\u4E0D stop/start source\uFF08\u4E0D\u91CD\u542F\u97F3\u8F68\uFF09", async () => {
    await engine.resume();
    const t = baseTrack();
    await engine.playTrack(t);
    const v = engine.voices.get("t1");
    const startsBefore = v.source.started.length;
    const stopsBefore = v.source.stopped;
    for (let i = 0; i < 10; i++) {
      engine.syncTracks([
        { ...t, position: { x: 2 + i * 0.1, y: 0.5, z: -i * 0.2 } }
      ]);
    }
    assert.ok(Math.abs(v.panner.positionX.value - 2.9) < 1e-9);
    assert.ok(Math.abs(v.panner.positionY.value - 0.5) < 1e-9);
    assert.ok(Math.abs(v.panner.positionZ.value - -1.8) < 1e-9);
    assert.equal(v.source.started.length, startsBefore);
    assert.equal(v.source.stopped, stopsBefore);
  });
  it("\u6682\u505C\u4F1A\u505C\u6B62\u5E76\u91CD\u5EFA\u8282\u70B9\u4E14\u4FDD\u7559\u504F\u79FB\uFF1B\u518D\u6B21\u64AD\u653E\u4ECE\u504F\u79FB\u5F00\u59CB", async () => {
    await engine.resume();
    const ctx = engine.ctx;
    const t = { ...baseTrack(), loop: false };
    await engine.playTrack(t);
    ctx.currentTime = 0.3;
    engine.pauseTrack(t);
    await engine.playTrack({ ...t });
    const v = engine.voices.get("t1");
    const last = v.source.started[v.source.started.length - 1];
    assert.ok(Math.abs(last.offset - 0.3) < 1e-6);
  });
  it("\u603B\u7EBF\u4E0E\u4E3B\u589E\u76CA\u771F\u5B9E\u5199\u5165\u5BF9\u5E94 GainNode", async () => {
    await engine.resume();
    engine.setBusGain(0.42);
    engine.setMasterGain(0.71);
    const bus = engine.busGain;
    const master = engine.masterGain;
    assert.ok(Math.abs(bus.gain.value - 0.42) < 1e-9);
    assert.ok(Math.abs(master.gain.value - 0.71) < 1e-9);
    const analyser = engine.analyser;
    const destination = engine.ctx.destination;
    assert.ok(analyser.connects.some((c) => c.node === destination));
  });
  it("\u574F\u6587\u4EF6\u89E3\u7801\u5931\u8D25\u629B\u51FA DecodeError\uFF0C\u4E14\u4E0D\u5F71\u54CD\u5176\u4ED6\u58F0\u8F68", async () => {
    await engine.resume();
    const bad = baseTrack({ id: "bad", sourceType: "file" });
    engine.setFileBlob("bad", new Blob([new TextEncoder().encode("BAD")], { type: "audio/x" }));
    await assert.rejects(engine.ensureTrack(bad), (err) => err instanceof DecodeError2);
    const good = baseTrack({ id: "good" });
    await engine.ensureTrack(good);
    const voices = engine.voices;
    assert.ok(voices.has("good"));
  });
  it("\u5185\u7F6E\u6837\u4F8B\u7F13\u51B2\u53EF\u7ECF\u5F15\u64CE\u5408\u6210\uFF0C\u65F6\u957F\u4E0E\u58F0\u9053\u7B26\u5408\u9884\u671F", async () => {
    await engine.resume();
    const buf = createSampleBuffer2(engine.ctx, "pulse");
    assert.equal(buf.numberOfChannels, 1);
    assert.ok(Math.abs(buf.duration - 1.6) < 1e-6);
  });
  function automationLane(trackId) {
    return {
      trackId,
      version: 1,
      enabled: true,
      revisionSeq: 3,
      revisions: [],
      keyframes: [
        { id: "kf1", time: 0, param: "position", position: { x: -3, y: 0, z: 0 }, createdAt: 0 },
        { id: "kf2", time: 0.5, param: "position", position: { x: 3, y: 0, z: 0 }, createdAt: 0 },
        { id: "kf3", time: 0.2, param: "gain", gain: 0.2, createdAt: 0 },
        { id: "kf4", time: 0.55, param: "gain", gain: 1, createdAt: 0 }
      ]
    };
  }
  it("\u64AD\u653E\u81EA\u52A8\u5316\uFF1A\u4F4D\u7F6E/\u589E\u76CA\u6309 AudioContext \u65F6\u949F\u6392\u5165 AudioParam\uFF0Csource \u4E0D\u91CD\u542F", async () => {
    await engine.resume();
    const t = { ...baseTrack(), loop: false, position: { x: -3, y: 0, z: 0 } };
    engine.setAutomationLanes({ t1: automationLane("t1") });
    await engine.playTrack(t);
    const v = engine.voices.get("t1");
    const starts = v.source.started.length;
    assert.ok(v.panner.positionX.events.some((e) => Math.abs(e.value - -3) < 1e-9));
    const ctx = engine.ctx;
    ctx.currentTime = 0.2;
    engine.runAutomationTickForTest();
    assert.equal(v.source.started.length, starts);
    assert.equal(v.source.stopped, 0);
    ctx.currentTime = 0.4;
    engine.runAutomationTickForTest();
    const xRampTo3 = v.panner.positionX.ramps.some(
      (r) => Math.abs(r.time - 0.5) < 1e-9 && Math.abs(r.value - 3) < 1e-9
    );
    assert.ok(xRampTo3, "x \u5E94\u5728 0.5s \u7EBF\u6027 ramp \u5230 +3");
    const gainRampToOne = v.trackGain.gain.ramps.some(
      (r) => Math.abs(r.time - 0.55) < 1e-9 && Math.abs(r.value - 1) < 1e-9
    );
    assert.ok(gainRampToOne, "gain \u5E94\u5728 0.55s ramp \u5230 1");
    assert.equal(v.source.started.length, 1);
    assert.equal(v.source.stopped, 0);
  });
  it("\u6682\u505C\u2192seek\u2192\u518D\u64AD\uFF1A\u65E7\u8C03\u5EA6\u968F\u8282\u70B9\u9500\u6BC1\uFF0C\u65B0\u8282\u70B9\u91CD\u65B0\u8C03\u5EA6\uFF0C\u4E0D\u53E0\u52A0/\u4E0D\u91CD\u590D\u53D1\u58F0", async () => {
    await engine.resume();
    const t = { ...baseTrack(), loop: false };
    engine.setAutomationLanes({ t1: automationLane("t1") });
    await engine.playTrack(t);
    const ctx = engine.ctx;
    ctx.currentTime = 0.1;
    engine.runAutomationTickForTest();
    engine.pauseTrack(t);
    await engine.seekTrack(t, 0.3, false);
    const voices1 = engine.voices;
    const before = voices1.get("t1").source;
    assert.equal(before.started.length, 0, "seek \u540E\u672A\u64AD\u653E\u7684 source \u4E0D\u5E94 start");
    await engine.playTrack(t);
    const after = voices1.get("t1").source;
    assert.equal(after.started.length, 1);
    const px = voices1.get("t1").panner.positionX;
    const times = px.events.map((e) => e.time);
    assert.ok(times.every((tm) => tm >= 0, 1e-9), "\u4E0D\u5E94\u51FA\u73B0 seek \u524D\u5A92\u4F53\u65F6\u95F4\u7684\u65E7\u4E8B\u4EF6");
  });
  it("\u5FAA\u73AF\u64AD\u653E\uFF1A\u8DE8\u56DE\u7ED5\u8FB9\u754C\u7684\u4F4D\u7F6E\u5305\u7EDC\u5468\u671F\u91CD\u590D\uFF0C\u4E14\u4E0D\u91CD\u542F source", async () => {
    await engine.resume();
    const ctx = engine.ctx;
    const t = { ...baseTrack(), loop: true, position: { x: 0, y: 0, z: 0 } };
    const lane = {
      trackId: "t1",
      version: 1,
      enabled: true,
      revisionSeq: 1,
      revisions: [],
      keyframes: [
        { id: "a", time: 0, param: "position", position: { x: 0, y: 0, z: 0 }, createdAt: 0 },
        { id: "b", time: 0.5, param: "position", position: { x: 2, y: 0, z: 0 }, createdAt: 0 }
      ]
    };
    engine.setAutomationLanes({ t1: lane });
    await engine.playTrack(t);
    const v = engine.voices.get("t1");
    ctx.currentTime = 2.9;
    engine.runAutomationTickForTest();
    let rampTimes = v.panner.positionX.ramps.map((r) => r.time);
    assert.ok(rampTimes.some((tm) => Math.abs(tm - 3) < 1e-6), "\u56DE\u7ED5\u70B9 3.0s \u5E94\u91CD\u6392 x=0");
    ctx.currentTime = 3.2;
    engine.runAutomationTickForTest();
    rampTimes = v.panner.positionX.ramps.map((r) => r.time);
    assert.ok(rampTimes.some((tm) => Math.abs(tm - 3.5) < 1e-6), "\u4E0B\u4E00\u5468\u671F 3.5s \u5E94\u91CD\u6392 x=2");
    assert.equal(v.source.started.length, 1);
    assert.equal(v.source.stopped, 0);
  });
  it("\u64AD\u653E\u4E2D\u4EBA\u5DE5\u8986\u76D6\u63A5\u7BA1\u4F4D\u7F6E\u53C2\u6570\uFF1B\u53D6\u6D88\u540E\u56DE\u5230\u8BA1\u5212\u503C\uFF1B\u63D0\u4EA4\u6E05\u9664\u8986\u76D6", async () => {
    await engine.resume();
    const ctx = engine.ctx;
    const t = { ...baseTrack(), loop: false, position: { x: -3, y: 0, z: 0 } };
    engine.setAutomationLanes({ t1: automationLane("t1") });
    await engine.playTrack(t);
    ctx.currentTime = 0.4;
    engine.beginOverride("t1", "position", { x: 10, y: 1, z: 2 });
    const v = engine.voices.get("t1");
    assert.equal(engine.hasOverride("t1", "position"), true);
    engine.runAutomationTickForTest();
    assert.ok(Math.abs(v.panner.positionX.value - 10) < 1e-9);
    const planned = engine.cancelOverride("t1", "position");
    assert.ok(Math.abs(planned.x - 1.8) < 1e-6, `\u8BA1\u5212x\u5E94\u22481.8\uFF0C\u5B9E\u9645 ${planned.x}`);
    assert.equal(engine.hasOverride("t1", "position"), false);
  });
});
