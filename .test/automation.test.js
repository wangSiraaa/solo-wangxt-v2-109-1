// test/automation.test.ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";

// src/lib/automation.ts
var LANE_VERSION = 1;
var MAX_REVISIONS = 60;
var TWO_PI = Math.PI * 2;
var AutomationError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.name = "AutomationError";
    this.code = code;
  }
};
var counter = 0;
function uid(prefix) {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter.toString(36)}`;
}
function isFiniteNumber(v) {
  return typeof v === "number" && Number.isFinite(v);
}
function isValidValue(kf) {
  if (kf.param === "position") {
    return !!kf.position && isFiniteNumber(kf.position.x) && isFiniteNumber(kf.position.y) && isFiniteNumber(kf.position.z);
  }
  if (kf.param === "orientation") {
    return !!kf.orientation && isFiniteNumber(kf.orientation.yaw) && isFiniteNumber(kf.orientation.pitch);
  }
  return isFiniteNumber(kf.gain);
}
function emptyLane(trackId) {
  return {
    trackId,
    version: LANE_VERSION,
    enabled: true,
    keyframes: [],
    revisions: [],
    revisionSeq: 0
  };
}
function keyframeAt(lane, time, eps = 1e-6) {
  return lane.keyframes.find((k) => Math.abs(k.time - time) <= eps);
}
function framesOf(lane, param) {
  return lane.keyframes.filter((k) => k.param === param);
}
function isSorted(lane) {
  for (let i = 1; i < lane.keyframes.length; i++) {
    if (lane.keyframes[i].time <= lane.keyframes[i - 1].time) return false;
  }
  return true;
}
function cloneValue(kf) {
  if (kf.param === "position") return { position: { ...kf.position } };
  if (kf.param === "orientation") return { orientation: { ...kf.orientation } };
  return { gain: kf.gain };
}
function normalizeValue(kf) {
  if (kf.param === "orientation" && kf.orientation) {
    return { ...kf, orientation: { yaw: kf.orientation.yaw, pitch: kf.orientation.pitch } };
  }
  return kf;
}
function pushRevision(lane, entry) {
  const revision = {
    id: uid("rev"),
    revision: lane.revisionSeq + 1,
    at: Date.now(),
    ...entry
  };
  lane.revisionSeq = revision.revision;
  lane.revisions = [...lane.revisions, revision].slice(-MAX_REVISIONS);
  return revision;
}
function commitKeyframe(laneIn, frame) {
  const lane = {
    ...laneIn,
    keyframes: [...laneIn.keyframes],
    revisions: [...laneIn.revisions]
  };
  if (!isFiniteNumber(frame.time) || frame.time < 0) {
    throw new AutomationError("invalid", "\u5173\u952E\u5E27\u65F6\u95F4\u5FC5\u987B\u4E3A\u975E\u8D1F\u6709\u9650\u6570");
  }
  if (!isValidValue(frame)) {
    throw new AutomationError("invalid", `\u5173\u952E\u5E27\u7F3A\u5C11\u53C2\u6570 ${frame.param} \u7684\u6709\u6548\u503C`);
  }
  const clash = keyframeAt(lane, frame.time);
  if (clash) {
    throw new AutomationError(
      "conflict",
      `\u65F6\u95F4 ${frame.time.toFixed(3)}s \u5DF2\u5B58\u5728\u5173\u952E\u5E27\uFF08${clash.id}\uFF09\uFF0C\u62D2\u7EDD\u540C\u523B\u63D0\u4EA4`
    );
  }
  const insertAt = lane.keyframes.findIndex((k) => k.time > frame.time);
  const at = insertAt === -1 ? lane.keyframes.length : insertAt;
  const kf = normalizeValue({
    id: frame.id ?? uid("kf"),
    time: frame.time,
    param: frame.param,
    createdAt: Date.now(),
    ...frame.param === "position" ? { position: { ...frame.position } } : {},
    ...frame.param === "orientation" ? { orientation: { ...frame.orientation } } : {},
    ...frame.param === "gain" ? { gain: frame.gain } : {}
  });
  const pre = lane.keyframes;
  lane.keyframes = [...lane.keyframes.slice(0, at), kf, ...lane.keyframes.slice(at)];
  if (!isSorted(lane)) {
    throw new AutomationError("conflict", "\u63D0\u4EA4\u4F1A\u7834\u574F\u5173\u952E\u5E27\u987A\u5E8F");
  }
  const revision = pushRevision(lane, {
    action: "commit",
    summary: `\u63D0\u4EA4 ${paramLabel(frame.param)} \u5173\u952E\u5E27 @${frame.time.toFixed(2)}s`,
    keyframes: lane.keyframes,
    pre
  });
  return { lane, revision };
}
function deleteKeyframe(laneIn, id) {
  const idx = laneIn.keyframes.findIndex((k) => k.id === id);
  if (idx === -1) throw new AutomationError("not-found", `\u5173\u952E\u5E27 ${id} \u4E0D\u5B58\u5728`);
  const lane = {
    ...laneIn,
    keyframes: laneIn.keyframes.filter((k) => k.id !== id),
    revisions: [...laneIn.revisions]
  };
  const removed = laneIn.keyframes[idx];
  const revision = pushRevision(lane, {
    action: "commit",
    summary: `\u5220\u9664 ${paramLabel(removed.param)} \u5173\u952E\u5E27 @${removed.time.toFixed(2)}s`,
    keyframes: lane.keyframes,
    pre: laneIn.keyframes
  });
  return { lane, revision };
}
function moveKeyframe(laneIn, id, time) {
  if (!isFiniteNumber(time) || time < 0) {
    throw new AutomationError("invalid", "\u5173\u952E\u5E27\u65F6\u95F4\u5FC5\u987B\u4E3A\u975E\u8D1F\u6709\u9650\u6570");
  }
  const idx = laneIn.keyframes.findIndex((k) => k.id === id);
  if (idx === -1) throw new AutomationError("not-found", `\u5173\u952E\u5E27 ${id} \u4E0D\u5B58\u5728`);
  const frame = laneIn.keyframes[idx];
  if (Math.abs(frame.time - time) <= 1e-9) {
    const rev = laneIn.revisions[laneIn.revisions.length - 1];
    return { lane: laneIn, revision: rev };
  }
  const clash = laneIn.keyframes.find((k) => k.id !== id && Math.abs(k.time - time) <= 1e-6);
  if (clash) {
    throw new AutomationError("conflict", `\u65F6\u95F4 ${time.toFixed(3)}s \u5DF2\u88AB\u5173\u952E\u5E27 ${clash.id} \u5360\u7528`);
  }
  const prevFrame = laneIn.keyframes[idx - 1];
  const nextFrame = laneIn.keyframes[idx + 1];
  if (prevFrame && time <= prevFrame.time) {
    throw new AutomationError(
      "conflict",
      `\u65E9\u4E8E\u524D\u4E00\u5E27 ${prevFrame.time.toFixed(3)}s \u4F1A\u53CD\u8F6C\u987A\u5E8F\uFF0C\u62D2\u7EDD\u79FB\u52A8`
    );
  }
  if (nextFrame && time >= nextFrame.time) {
    throw new AutomationError(
      "conflict",
      `\u665A\u4E8E\u540E\u4E00\u5E27 ${nextFrame.time.toFixed(3)}s \u4F1A\u53CD\u8F6C\u987A\u5E8F\uFF0C\u62D2\u7EDD\u79FB\u52A8`
    );
  }
  const others = laneIn.keyframes.filter((k) => k.id !== id);
  const target = others.findIndex((k) => k.time > time);
  const at = target === -1 ? others.length : target;
  const candidate = [...others.slice(0, at), { ...frame, time }, ...others.slice(at)];
  if (!isSorted({ ...laneIn, keyframes: candidate })) {
    throw new AutomationError("conflict", "\u79FB\u52A8\u4F1A\u53CD\u8F6C\u65E2\u6709\u5173\u952E\u5E27\u987A\u5E8F\uFF0C\u62D2\u7EDD\u9759\u9ED8\u91CD\u6392");
  }
  const lane = { ...laneIn, keyframes: candidate, revisions: [...laneIn.revisions] };
  const revision = pushRevision(lane, {
    action: "commit",
    summary: `\u79FB\u52A8 ${paramLabel(frame.param)} \u5173\u952E\u5E27 ${frame.time.toFixed(2)}s \u2192 ${time.toFixed(2)}s`,
    keyframes: lane.keyframes,
    pre: laneIn.keyframes
  });
  return { lane, revision };
}
function clearKeyframes(laneIn) {
  if (laneIn.keyframes.length === 0) {
    const rev = laneIn.revisions[laneIn.revisions.length - 1];
    return { lane: laneIn, revision: rev };
  }
  const lane = { ...laneIn, keyframes: [], revisions: [...laneIn.revisions] };
  const revision = pushRevision(lane, {
    action: "clear",
    summary: "\u6E05\u7A7A\u5168\u90E8\u5173\u952E\u5E27",
    keyframes: [],
    pre: laneIn.keyframes
  });
  return { lane, revision };
}
function undoLast(laneIn) {
  if (laneIn.revisions.length === 0) {
    throw new AutomationError("invalid", "\u6CA1\u6709\u53EF\u64A4\u9500\u7684\u81EA\u52A8\u5316\u7248\u672C");
  }
  const last = laneIn.revisions[laneIn.revisions.length - 1];
  const targetPre = last.pre;
  if (!targetPre) {
    throw new AutomationError("invalid", "\u8BE5\u7248\u672C\u6CA1\u6709\u53EF\u6062\u590D\u7684\u524D\u6001\uFF08\u53EF\u80FD\u6765\u81EA\u65E7\u5DE5\u7A0B\u8FC1\u79FB\uFF09");
  }
  const restored = targetPre.map((k) => ({ ...k, ...cloneValue(k) }));
  const probe = { ...laneIn, keyframes: restored };
  if (!isSorted(probe)) {
    throw new AutomationError("conflict", "\u64A4\u9500\u4F1A\u6062\u590D\u51FA\u9006\u5E8F\u5173\u952E\u5E27\uFF0C\u5DF2\u62D2\u7EDD");
  }
  const lane = { ...laneIn, keyframes: restored, revisions: [...laneIn.revisions] };
  const revision = pushRevision(lane, {
    action: "undo",
    summary: `\u64A4\u9500\uFF1A${last.summary}`,
    keyframes: lane.keyframes,
    pre: last.keyframes,
    reverts: last.id
  });
  return { lane, revision };
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
function paramLabel(p) {
  return p === "position" ? "\u4F4D\u7F6E" : p === "orientation" ? "\u671D\u5411" : "\u589E\u76CA";
}
var ORIENTATION_SAMPLE_STEP = 1 / 40;
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
function sanitizeKeyframe(raw) {
  if (!raw || typeof raw !== "object") return null;
  const k = raw;
  const param = k.param;
  if (param !== "position" && param !== "orientation" && param !== "gain") return null;
  if (!isFiniteNumber(k.time) || k.time < 0 || typeof k.id !== "string") return null;
  const base = { id: k.id, time: k.time, param, createdAt: isFiniteNumber(k.createdAt) ? k.createdAt : 0 };
  if (param === "position") {
    const p = k.position;
    if (!p || ![p.x, p.y, p.z].every(isFiniteNumber)) return null;
    return { ...base, position: { x: p.x, y: p.y, z: p.z } };
  }
  if (param === "orientation") {
    const o = k.orientation;
    if (!o || ![o.yaw, o.pitch].every(isFiniteNumber)) return null;
    return { ...base, orientation: { yaw: o.yaw, pitch: o.pitch } };
  }
  if (!isFiniteNumber(k.gain)) return null;
  return { ...base, gain: k.gain };
}
function sanitizeLane(raw, trackId) {
  if (!raw || typeof raw !== "object") return null;
  const l = raw;
  const kfs = Array.isArray(l.keyframes) ? l.keyframes.map(sanitizeKeyframe).filter((k) => !!k) : [];
  const cleaned = [];
  for (const kf of kfs) {
    const clash = cleaned.some((k) => Math.abs(k.time - kf.time) <= 1e-6);
    const lastT = cleaned.length ? cleaned[cleaned.length - 1].time : -Infinity;
    if (!clash && kf.time > lastT) cleaned.push(kf);
  }
  const revisions = Array.isArray(l.revisions) ? l.revisions.filter(
    (r) => !!r && typeof r === "object" && typeof r.id === "string" && isFiniteNumber(r.revision)
  ) ?? [] : [];
  const maxRev = revisions.reduce((m, r) => Math.max(m, r.revision), 0);
  return {
    trackId,
    version: LANE_VERSION,
    enabled: typeof l.enabled === "boolean" ? l.enabled : true,
    keyframes: cleaned,
    revisions,
    revisionSeq: isFiniteNumber(l.revisionSeq) ? Math.max(l.revisionSeq, maxRev) : maxRev
  };
}
function migrateDoc(raw) {
  if (!raw || typeof raw !== "object") return null;
  const d = raw;
  if (!Array.isArray(d.tracks)) return null;
  const tracks = d.tracks;
  const autoRaw = d.automation ?? {};
  const automation = {};
  const trackIds = new Set(tracks.map((t) => t.id));
  for (const t of tracks) {
    const o = t.orientation;
    if (!o || !isFiniteNumber(o.yaw) || !isFiniteNumber(o.pitch)) {
      t.orientation = { yaw: 0, pitch: 0 };
    }
    const lane = sanitizeLane(autoRaw[t.id], t.id);
    if (lane && lane.keyframes.length >= 0) automation[t.id] = lane;
  }
  for (const id of Object.keys(autoRaw)) {
    if (trackIds.has(id)) continue;
    delete automation[id];
  }
  return {
    version: 2,
    tracks,
    automation,
    listener: d.listener,
    spatial: d.spatial,
    busGain: isFiniteNumber(d.busGain) ? d.busGain : 1,
    masterGain: isFiniteNumber(d.masterGain) ? d.masterGain : 0.9,
    savedAt: isFiniteNumber(d.savedAt) ? d.savedAt : 0,
    name: typeof d.name === "string" ? d.name : void 0
  };
}

// test/automation.test.ts
var pos = (x, y = 0, z = 0) => ({ x, y, z });
describe("\u5173\u952E\u5E27\u63D0\u4EA4\uFF1A\u7A33\u5B9A id / \u987A\u5E8F / \u51B2\u7A81\u62D2\u7EDD", () => {
  it("\u63D0\u4EA4\u540E\u6309\u65F6\u95F4\u6392\u5E8F\u4FDD\u5B58\uFF0C\u5E27 id \u7A33\u5B9A\u4E0D\u53D8", () => {
    let lane = emptyLane("t");
    const r1 = commitKeyframe(lane, { time: 1, param: "position", position: pos(1) });
    lane = r1.lane;
    const r0 = commitKeyframe(lane, { time: 0, param: "position", position: pos(0) });
    lane = r0.lane;
    assert.deepEqual(
      lane.keyframes.map((k) => k.time),
      [0, 1]
    );
    const idsBefore = lane.keyframes.map((k) => k.id);
    const rm = commitKeyframe(lane, { time: 0.5, param: "gain", gain: 0.5 });
    lane = rm.lane;
    assert.deepEqual(
      lane.keyframes.map((k) => k.time),
      [0, 0.5, 1]
    );
    const posFrames = lane.keyframes.filter((k) => k.param === "position").map((k) => k.id);
    assert.deepEqual(posFrames.sort(), [...idsBefore].sort());
    assert.ok(isSorted(lane));
  });
  it("\u540C\u4E00\u65F6\u523B\u63D0\u4EA4\u51B2\u7A81\u5173\u952E\u5E27\u88AB\u62D2\u7EDD\uFF0C\u539F\u8F68\u539F\u6837\u4FDD\u7559", () => {
    let lane = emptyLane("t");
    lane = commitKeyframe(lane, { time: 0.5, param: "position", position: pos(1) }).lane;
    const snapshot = lane.keyframes;
    assert.throws(
      () => commitKeyframe(lane, { time: 0.5, param: "gain", gain: 0.3 }),
      (e) => e instanceof AutomationError && e.code === "conflict"
    );
    assert.equal(lane.keyframes, snapshot);
    assert.equal(lane.keyframes.length, 1);
    assert.equal(lane.revisionSeq, 1, "\u62D2\u7EDD\u4E0D\u4EA7\u751F\u65B0\u7248\u672C");
  });
  it("\u9006\u5E8F\u79FB\u52A8\uFF08\u8DE8\u8FC7\u76F8\u90BB\u5E27\uFF09\u88AB\u62D2\u7EDD\uFF0C\u4E0D\u9759\u9ED8\u91CD\u6392", () => {
    let lane = emptyLane("t");
    lane = commitKeyframe(lane, { time: 0, param: "gain", gain: 0 }).lane;
    const mid = commitKeyframe(lane, { time: 1, param: "gain", gain: 0.5 });
    lane = mid.lane;
    lane = commitKeyframe(lane, { time: 2, param: "gain", gain: 1 }).lane;
    const midId = lane.keyframes.find((k) => k.time === 1).id;
    assert.throws(
      () => moveKeyframe(lane, midId, 3),
      (e) => e instanceof AutomationError && e.code === "conflict"
    );
    assert.throws(
      () => moveKeyframe(lane, midId, 2),
      (e) => e instanceof AutomationError && e.code === "conflict"
    );
    assert.deepEqual(
      lane.keyframes.map((k) => k.time),
      [0, 1, 2]
    );
  });
  it("\u975E\u6CD5\u503C/\u8D1F\u65F6\u95F4\u62D2\u7EDD", () => {
    const lane = emptyLane("t");
    assert.throws(() => commitKeyframe(lane, { time: -1, param: "gain", gain: 1 }), AutomationError);
    assert.throws(
      () => commitKeyframe(lane, { time: 1, param: "position", position: pos(NaN) }),
      AutomationError
    );
    assert.throws(
      () => commitKeyframe(lane, { time: 1, param: "position" }),
      AutomationError
    );
  });
  it("\u5220\u9664\u4E0D\u5B58\u5728\u5E27\u629B not-found", () => {
    assert.throws(() => deleteKeyframe(emptyLane("t"), "nope"), AutomationError);
  });
});
describe("\u7248\u672C\u4E0E\u64A4\u9500\u5BA1\u8BA1", () => {
  it("\u6BCF\u6B21\u63D0\u4EA4/\u6E05\u7A7A\u9012\u589E revision\uFF0C\u64A4\u9500\u6062\u590D\u524D\u6001\u4E14\u81EA\u8EAB\u7559\u75D5", () => {
    let lane = emptyLane("t");
    lane = commitKeyframe(lane, { time: 0, param: "gain", gain: 0.2 }).lane;
    lane = commitKeyframe(lane, { time: 1, param: "gain", gain: 0.8 }).lane;
    assert.equal(lane.revisionSeq, 2);
    const cleared = clearKeyframes(lane);
    lane = cleared.lane;
    assert.equal(lane.keyframes.length, 0);
    assert.equal(lane.revisionSeq, 3);
    assert.equal(cleared.revision.action, "clear");
    assert.equal(cleared.revision.pre?.length, 2);
    const undone = undoLast(lane);
    lane = undone.lane;
    assert.equal(undone.revision.action, "undo");
    assert.equal(undone.revision.reverts, cleared.revision.id);
    assert.equal(lane.keyframes.length, 2, "\u64A4\u9500\u5E94\u6062\u590D\u6E05\u7A7A\u4E4B\u524D\u7684\u4E24\u5E27");
    assert.equal(lane.revisionSeq, 4, "\u64A4\u9500\u672C\u8EAB\u662F\u65B0\u7248\u672C");
  });
  it("\u8FDE\u7EED\u64A4\u9500\u6CBF\u7248\u672C\u94FE\u56DE\u9000", () => {
    let lane = emptyLane("t");
    lane = commitKeyframe(lane, { time: 0, param: "gain", gain: 0 }).lane;
    lane = commitKeyframe(lane, { time: 1, param: "gain", gain: 1 }).lane;
    lane = undoLast(lane).lane;
    assert.equal(lane.keyframes.length, 1);
    lane = undoLast(lane).lane;
    assert.equal(lane.keyframes.length, 2);
  });
});
describe("\u91C7\u6837\uFF1A2D/3D/\u65B9\u4F4D/Panner \u8C03\u5EA6\u552F\u4E00\u6765\u6E90", () => {
  function lane() {
    let l = emptyLane("t");
    l = commitKeyframe(l, { time: 0, param: "position", position: pos(0) }).lane;
    l = commitKeyframe(l, { time: 2, param: "position", position: pos(4, 2) }).lane;
    l = commitKeyframe(l, { time: 1, param: "gain", gain: 1 }).lane;
    l = commitKeyframe(l, { time: 3, param: "gain", gain: 0 }).lane;
    return l;
  }
  it("\u7EBF\u6027\u63D2\u503C\uFF1B\u9996\u5E27\u524D\u4E3A\u9759\u6001\u57FA\u7EBF\uFF08\u4F20\u5165 baseline\uFF09\uFF1B\u672B\u5E27\u540E\u6301\u4F4F\u672B\u503C", () => {
    const l = lane();
    const mid = sampleLane(l, 1);
    assert.ok(Math.abs(mid.position.x - 2) < 1e-9);
    assert.ok(Math.abs(mid.position.y - 1) < 1e-9);
    assert.ok(Math.abs(mid.gain - 1) < 1e-9, "t=1 \u6070\u4E3A\u589E\u76CA\u9996\u5E27\uFF0C\u503C=1");
    const between = sampleLane(l, 2);
    assert.ok(Math.abs(between.gain - 0.5) < 1e-9);
    const beforeNone = sampleLane(l, -5);
    assert.equal(beforeNone.position, void 0);
    assert.equal(beforeNone.gain, void 0);
    const base = { position: pos(7, 8, 9), gain: 0.42 };
    const before = sampleLane(l, -5, void 0, base);
    assert.ok(Math.abs(before.position.x - 7) < 1e-9);
    assert.ok(Math.abs(before.gain - 0.42) < 1e-9);
    const after = sampleLane(l, 99);
    assert.ok(Math.abs(after.position.x - 4) < 1e-9);
    assert.ok(Math.abs(after.gain - 0) < 1e-9);
  });
  it("\u5FAA\u73AF\u56DE\u7ED5\uFF1A0 \u4E0E period \u540C\u503C\uFF0C\u8DE8\u8FB9\u754C\u63D2\u503C\u8FDE\u7EED", () => {
    let l = emptyLane("t");
    l = commitKeyframe(l, { time: 0, param: "position", position: pos(0) }).lane;
    l = commitKeyframe(l, { time: 1, param: "position", position: pos(2) }).lane;
    const atWrap = sampleLane(l, 2, 2);
    assert.ok(Math.abs(atWrap.position.x - 0) < 1e-9, "t=period \u5E94\u7B49\u4E8E t=0");
    const cross = sampleLane(l, 1.5, 2);
    assert.ok(Math.abs(cross.position.x - 1) < 1e-9, `\u8DE8\u8FB9\u754C\u4E2D\u70B9\u5E94\u4E3A 1\uFF0C\u5B9E\u9645 ${cross.position.x}`);
  });
  it("yaw \u6700\u77ED\u89D2\u8DEF\u5F84\u63D2\u503C\uFF1A170\xB0\u2192-170\xB0 \u8D70 +20\xB0 \u800C\u4E0D\u662F -340\xB0", () => {
    const d90 = lerpAngle(170 * Math.PI / 180, -170 * Math.PI / 180, 0.5);
    assert.ok(Math.abs(d90 - Math.PI) < 1e-9, `\u534A\u7A0B\u5E94\u2248\u03C0\uFF0C\u5B9E\u9645 ${d90}`);
    let l = emptyLane("t");
    l = commitKeyframe(l, {
      time: 0,
      param: "orientation",
      orientation: { yaw: 170 * Math.PI / 180, pitch: 0 }
    }).lane;
    l = commitKeyframe(l, {
      time: 1,
      param: "orientation",
      orientation: { yaw: -170 * Math.PI / 180, pitch: 0 }
    }).lane;
    const s = sampleLane(l, 0.5);
    assert.ok(Math.abs(s.orientation.yaw - Math.PI) < 1e-6);
  });
  it("\u505C\u7528 lane \u65F6\u91C7\u6837\u4E3A\u7A7A\uFF08\u56DE\u9000\u5230\u9759\u6001\u57FA\u7EBF\uFF09", () => {
    const l = { ...lane(), enabled: false };
    assert.deepEqual(sampleLane(l, 1), {});
  });
});
describe("buildSchedule\uFF1AAudioContext \u65F6\u949F\u4E8B\u4EF6", () => {
  it("\u975E\u5FAA\u73AF\uFF1A\u7A97\u53E3\u8D77\u70B9 setValue\uFF0C\u7A97\u53E3\u5185\u5173\u952E\u5E27 ramp\uFF0C\u7EDD\u5BF9\u65F6\u95F4\u6362\u7B97\u6B63\u786E", () => {
    let l = emptyLane("t");
    l = commitKeyframe(l, { time: 0, param: "position", position: pos(0) }).lane;
    l = commitKeyframe(l, { time: 1, param: "position", position: pos(10) }).lane;
    const sch = buildSchedule({
      lane: l,
      fromMedia: 2,
      toMedia: 2.5,
      baseAbsTime: 5,
      period: void 0,
      startOffset: 2
    });
    const xSet = sch.events.filter((e) => e.component === "x" && e.kind === "setValue");
    assert.equal(xSet.length, 1);
    assert.ok(Math.abs(xSet[0].time - 5) < 1e-9);
    assert.ok(Math.abs(xSet[0].value - 10) < 1e-9, "\u5A92\u4F532s\u5DF2\u8D8A\u8FC7\u672B\u5E27\uFF0C\u6301\u4F4F10");
  });
  it("\u5FAA\u73AF\uFF1A\u7A97\u53E3\u8DE8\u56DE\u7ED5\u70B9\u65F6\u590D\u5236\u4E0B\u4E00\u5468\u671F\u951A\u70B9", () => {
    let l = emptyLane("t");
    l = commitKeyframe(l, { time: 0, param: "gain", gain: 0 }).lane;
    l = commitKeyframe(l, { time: 0.5, param: "gain", gain: 1 }).lane;
    const sch = buildSchedule({
      lane: l,
      fromMedia: 0.9,
      toMedia: 1.3,
      baseAbsTime: 0,
      period: 1,
      startOffset: 0.9
    });
    const gains = sch.events.filter((e) => e.component === "gain");
    assert.ok(
      gains.some((e) => Math.abs(e.time - 0.1) < 1e-9 && Math.abs(e.value) < 1e-9),
      "\u56DE\u7ED5\u70B9\u5E94\u590D\u5236\u4E0B\u4E00\u5468\u671F gain=0 \u951A\u70B9\u5230\u7EDD\u5BF9\u65F6\u949F 0.1s"
    );
  });
  it("\u671D\u5411\u5E27\u751F\u6210\u4E0E forwardVector \u540C\u6E90\u7684 oX/oY/oZ \u5E8F\u5217", () => {
    let l = emptyLane("t");
    l = commitKeyframe(l, {
      time: 0,
      param: "orientation",
      orientation: { yaw: Math.PI / 2, pitch: 0 }
    }).lane;
    const sch = buildSchedule({
      lane: l,
      fromMedia: 0,
      toMedia: 0.1,
      baseAbsTime: 0,
      period: void 0,
      startOffset: 0
    });
    const ox = sch.events.find((e) => e.component === "oX" && Math.abs(e.time) < 1e-9);
    const oz = sch.events.find((e) => e.component === "oZ" && Math.abs(e.time) < 1e-9);
    assert.ok(ox && Math.abs(ox.value - 1) < 1e-9, "yaw=90\xB0 \u524D\u65B9 +X");
    assert.ok(oz && Math.abs(oz.value - 0) < 1e-9);
  });
});
describe("\u5DE5\u7A0B\u8FC1\u79FB\uFF08IndexedDB \u91CD\u8F7D\uFF09", () => {
  it("v1 \u6587\u6863\u8865 automation \u4E0E orientation\uFF0C\u5347\u5230 v2\uFF0C\u4E0D\u81EA\u52A8\u64AD\u653E\u5B57\u6BB5", () => {
    const v1 = {
      version: 1,
      tracks: [
        {
          id: "a",
          name: "A",
          sourceType: "tone",
          loop: true,
          muted: false,
          solo: false,
          gain: 0.9,
          channel: 0,
          color: "#fff",
          position: { x: 1, y: 0, z: 0 },
          status: "ready"
        }
      ],
      listener: { position: { x: 0, y: 0, z: 3 }, yaw: 0, pitch: 0, earHeight: 0 },
      spatial: {
        distanceModel: "inverse",
        refDistance: 1,
        rolloffFactor: 1,
        maxDistance: 30,
        positionTimeConstant: 0.06,
        hrtfIR: "none"
      },
      busGain: 1,
      masterGain: 0.9,
      savedAt: 0
    };
    const m = migrateDoc(v1);
    assert.equal(m.version, 2);
    assert.ok(m.automation);
    assert.deepEqual(m.tracks[0].orientation, { yaw: 0, pitch: 0 });
  });
  it("\u810F\u5173\u952E\u5E27\uFF08\u540C\u523B/\u9006\u5E8F/\u7F3A\u503C\uFF09\u88AB\u6E05\u7406\uFF0C\u5B64\u513F lane \u88AB\u4E22\u5F03\uFF0C\u4E0D\u629B\u5F02\u5E38", () => {
    const dirty = {
      version: 2,
      tracks: [
        {
          id: "a",
          name: "A",
          sourceType: "tone",
          loop: false,
          muted: false,
          solo: false,
          gain: 1,
          channel: 0,
          color: "#fff",
          position: { x: 0, y: 0, z: 0 },
          orientation: { yaw: 0, pitch: 0 },
          status: "ready"
        }
      ],
      automation: {
        a: {
          trackId: "a",
          version: 1,
          enabled: true,
          revisionSeq: 0,
          revisions: [],
          keyframes: [
            { id: "g1", time: 1, param: "gain", gain: 1 },
            { id: "g2", time: 1, param: "gain", gain: 0 },
            // 同刻丢弃
            { id: "g3", time: 0.5, param: "gain", gain: 0.5 },
            // 逆序丢弃
            { id: "bad", time: 2, param: "position" }
            // 缺值丢弃
          ]
        },
        ghost: {
          trackId: "ghost",
          version: 1,
          enabled: true,
          revisionSeq: 0,
          revisions: [],
          keyframes: [{ id: "x", time: 0, param: "gain", gain: 1 }]
        }
      },
      listener: { position: { x: 0, y: 0, z: 0 }, yaw: 0, pitch: 0, earHeight: 0 },
      spatial: {
        distanceModel: "inverse",
        refDistance: 1,
        rolloffFactor: 1,
        maxDistance: 30,
        positionTimeConstant: 0.06,
        hrtfIR: "none"
      },
      busGain: 1,
      masterGain: 0.9,
      savedAt: 0
    };
    const m = migrateDoc(dirty);
    assert.deepEqual(
      m.automation.a.keyframes.map((k) => k.id),
      ["g1"]
    );
    assert.equal(m.automation.ghost, void 0);
  });
  it("\u5B8C\u5168\u635F\u574F\u7684\u6587\u6863\u8FD4\u56DE null", () => {
    assert.equal(migrateDoc(null), null);
    assert.equal(migrateDoc({}), null);
  });
});
