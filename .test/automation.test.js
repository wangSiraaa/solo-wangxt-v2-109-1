// test/automation.test.ts
import assert from "node:assert/strict";
import { describe, it } from "node:test";

// src/lib/automation.ts
var ALL_PARAMS = ["position", "orientation", "gain"];
var seq = 0;
function newAutomationId(prefix) {
  seq += 1;
  return `${prefix}-${Date.now().toString(36)}-${seq}`;
}
function emptyLane() {
  return { schema: 1, keyframes: [], revision: 0, updatedAt: 0 };
}
function emptyHistory() {
  return { version: 1, undo: [], redo: [] };
}
var AutomationError = class extends Error {
  code;
  constructor(code, message) {
    super(message);
    this.name = "AutomationError";
    this.code = code;
  }
};
var HISTORY_LIMIT = 100;
function isFiniteNum(v) {
  return typeof v === "number" && Number.isFinite(v);
}
function validVec3(v) {
  return !!v && typeof v === "object" && isFiniteNum(v.x) && isFiniteNum(v.y) && isFiniteNum(v.z);
}
function validateParams(params) {
  if (params.position && !validVec3(params.position)) {
    throw new AutomationError("BAD_VALUE", "\u4F4D\u7F6E\u5FC5\u987B\u662F\u6709\u9650\u7684\u4E09\u7EF4\u5750\u6807");
  }
  if (params.orientation) {
    if (!validVec3(params.orientation)) {
      throw new AutomationError("BAD_VALUE", "\u671D\u5411\u5FC5\u987B\u662F\u6709\u9650\u7684\u4E09\u7EF4\u5411\u91CF");
    }
    const { x, y, z } = params.orientation;
    const len = Math.hypot(x, y, z);
    if (len < 1e-6) throw new AutomationError("BAD_VALUE", "\u671D\u5411\u5411\u91CF\u4E0D\u80FD\u4E3A\u96F6\u5411\u91CF");
  }
  if (params.gain !== void 0) {
    if (!isFiniteNum(params.gain) || params.gain < 0 || params.gain > 1.5) {
      throw new AutomationError("BAD_VALUE", "\u589E\u76CA\u5FC5\u987B\u662F 0..1.5 \u4E4B\u95F4\u7684\u6709\u9650\u6570");
    }
  }
}
function validTime(time) {
  if (!isFiniteNum(time) || time < 0) {
    throw new AutomationError("BAD_VALUE", "\u5173\u952E\u5E27\u65F6\u95F4\u5FC5\u987B\u662F\u975E\u8D1F\u6709\u9650\u79D2\u6570");
  }
}
function cloneLane(lane) {
  return {
    schema: 1,
    revision: lane.revision,
    updatedAt: lane.updatedAt,
    keyframes: lane.keyframes.map((k) => ({
      id: k.id,
      time: k.time,
      params: cloneParams(k.params)
    }))
  };
}
function cloneParams(p) {
  return {
    ...p.position ? { position: { ...p.position } } : {},
    ...p.orientation ? { orientation: { ...p.orientation } } : {},
    ...p.gain !== void 0 ? { gain: p.gain } : {}
  };
}
function normalizeLane(input) {
  if (!input || typeof input !== "object") return emptyLane();
  const l = input;
  const raw = Array.isArray(l.keyframes) ? l.keyframes : [];
  const seen = /* @__PURE__ */ new Set();
  const keyframes = [];
  for (const k of raw) {
    if (!k || typeof k !== "object") continue;
    const kf = k;
    if (typeof kf.id !== "string" || !kf.id || seen.has(kf.id)) continue;
    if (!isFiniteNum(kf.time) || kf.time < 0) continue;
    const params = {};
    if (validVec3(kf.params?.position)) params.position = { ...kf.params.position };
    if (validVec3(kf.params?.orientation)) {
      const o = kf.params.orientation;
      if (Math.hypot(o.x, o.y, o.z) >= 1e-6) params.orientation = { ...o };
    }
    if (isFiniteNum(kf.params?.gain) && kf.params.gain >= 0 && kf.params.gain <= 1.5) {
      params.gain = kf.params.gain;
    }
    if (Object.keys(params).length === 0) continue;
    seen.add(kf.id);
    keyframes.push({ id: kf.id, time: kf.time, params });
  }
  keyframes.sort((a, b) => a.time - b.time);
  return {
    schema: 1,
    keyframes,
    revision: isFiniteNum(l.revision) ? Math.max(0, Math.floor(l.revision)) : 0,
    updatedAt: isFiniteNum(l.updatedAt) ? l.updatedAt : 0
  };
}
function commit(lane, keyframes) {
  return {
    schema: 1,
    keyframes,
    revision: lane.revision + 1,
    updatedAt: Date.now()
  };
}
function addKeyframe(lane, input) {
  validTime(input.time);
  validateParams(input.params);
  if (Object.keys(input.params).length === 0) {
    throw new AutomationError("BAD_VALUE", "\u5173\u952E\u5E27\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u53C2\u6570");
  }
  if (lane.keyframes.some((k) => k.time === input.time)) {
    throw new AutomationError(
      "DUP_TIME",
      `\u65F6\u95F4 ${input.time.toFixed(3)}s \u5DF2\u6709\u5173\u952E\u5E27\uFF1B\u62D2\u7EDD\u5728\u540C\u4E00\u65F6\u523B\u91CD\u590D\u63D0\u4EA4`
    );
  }
  const kf = {
    id: input.id ?? newAutomationId("kf"),
    time: input.time,
    params: cloneParams(input.params)
  };
  const next = [...lane.keyframes, kf].sort((a, b) => a.time - b.time);
  return commit(lane, next);
}
function updateKeyframe(lane, input) {
  const idx = lane.keyframes.findIndex((k) => k.id === input.id);
  if (idx < 0) throw new AutomationError("NOT_FOUND", "\u5173\u952E\u5E27\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664");
  const current = lane.keyframes[idx];
  const nextTime = input.time ?? current.time;
  validTime(nextTime);
  const nextParams = input.params ? input.patch ? { ...current.params, ...cloneParams(input.params) } : cloneParams(input.params) : current.params;
  validateParams(nextParams);
  if (Object.keys(nextParams).length === 0) {
    throw new AutomationError("BAD_VALUE", "\u5173\u952E\u5E27\u81F3\u5C11\u9700\u8981\u4E00\u4E2A\u53C2\u6570");
  }
  const prev = lane.keyframes[idx - 1];
  const nxt = lane.keyframes[idx + 1];
  if (prev && nextTime <= prev.time) {
    throw new AutomationError(
      "ORDER_VIOLATION",
      `\u65B0\u65F6\u95F4 ${nextTime.toFixed(3)}s \u4E0D\u65E9\u4E8E\u524D\u4E00\u5173\u952E\u5E27 ${prev.time.toFixed(3)}s\uFF1B\u62D2\u7EDD\u9006\u5E8F\u91CD\u6392`
    );
  }
  if (nxt && nextTime >= nxt.time) {
    throw new AutomationError(
      "ORDER_VIOLATION",
      `\u65B0\u65F6\u95F4 ${nextTime.toFixed(3)}s \u4E0D\u665A\u4E8E\u540E\u4E00\u5173\u952E\u5E27 ${nxt.time.toFixed(3)}s\uFF1B\u62D2\u7EDD\u9006\u5E8F\u91CD\u6392`
    );
  }
  const updated = { id: current.id, time: nextTime, params: nextParams };
  const arr = lane.keyframes.slice();
  arr[idx] = updated;
  arr.sort((a, b) => a.time - b.time);
  return commit(lane, arr);
}
function removeKeyframe(lane, id) {
  if (!lane.keyframes.some((k) => k.id === id)) {
    throw new AutomationError("NOT_FOUND", "\u5173\u952E\u5E27\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u5220\u9664");
  }
  return commit(
    lane,
    lane.keyframes.filter((k) => k.id !== id)
  );
}
function clearLane(lane) {
  if (lane.keyframes.length === 0) return lane;
  return commit(lane, []);
}
function lerp(a, b, u) {
  return a + (b - a) * u;
}
function lerpVec3(a, b, u) {
  return { x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), z: lerp(a.z, b.z, u) };
}
function sampleLane(lane, t) {
  const kfs = lane.keyframes;
  const out = {};
  if (kfs.length === 0) return out;
  for (const name of ALL_PARAMS) {
    let first = -1;
    let last = -1;
    for (let i = 0; i < kfs.length; i++) {
      if (getParam(kfs[i].params, name) !== void 0) {
        if (first < 0) first = i;
        last = i;
      }
    }
    if (first < 0) continue;
    if (t < kfs[first].time) continue;
    if (t >= kfs[last].time) {
      assignParam(out, name, getParam(kfs[last].params, name));
      continue;
    }
    let li = -1;
    let ri = -1;
    for (let i = 0; i < kfs.length; i++) {
      if (getParam(kfs[i].params, name) === void 0) continue;
      if (kfs[i].time <= t) li = i;
      if (kfs[i].time >= t && ri < 0) ri = i;
    }
    const lv = getParam(kfs[li].params, name);
    const rv = ri >= 0 ? getParam(kfs[ri].params, name) : void 0;
    if (rv === void 0 || ri === li) {
      assignParam(out, name, lv);
    } else {
      const span = kfs[ri].time - kfs[li].time;
      const u = span > 0 ? (t - kfs[li].time) / span : 0;
      if (name === "gain") {
        out.gain = lerp(lv, rv, u);
      } else {
        assignParam(out, name, lerpVec3(lv, rv, u));
      }
    }
  }
  return out;
}
function sampleLaneLoop(lane, t, cycle) {
  if (!Number.isFinite(cycle) || cycle <= 0) return sampleLane(lane, t);
  const m = (t % cycle + cycle) % cycle;
  return sampleLane(lane, m);
}
function getParam(p, name) {
  return p[name];
}
function assignParam(out, name, v) {
  if (v === void 0) return;
  if (name === "gain") out.gain = v;
  else if (name === "position") out.position = { ...v };
  else out.orientation = { ...v };
}
function pushHistory(history, entry) {
  const full = {
    ...entry,
    before: cloneLane(entry.before),
    after: cloneLane(entry.after),
    id: newAutomationId("hist"),
    at: Date.now()
  };
  const undo = [...history.undo, full];
  while (undo.length > HISTORY_LIMIT) undo.shift();
  return { version: 1, undo, redo: [] };
}
function undoHistory(h, lanes) {
  const entry = h.undo[h.undo.length - 1];
  if (!entry) throw new AutomationError("NOT_FOUND", "\u6CA1\u6709\u53EF\u64A4\u9500\u7684\u81EA\u52A8\u5316\u7F16\u8F91");
  if (!lanes.has(entry.trackId)) {
    throw new AutomationError("NOT_FOUND", "\u76EE\u6807\u58F0\u8F68\u5DF2\u4E0D\u5B58\u5728");
  }
  const cur = lanes.get(entry.trackId);
  if (cur.revision !== entry.after.revision) {
    throw new AutomationError(
      "REVISION_MISMATCH",
      "\u81EA\u52A8\u5316\u8F68\u5DF2\u88AB\u5176\u4ED6\u7F16\u8F91\u6539\u52A8\uFF08\u7248\u672C\u4E0D\u4E00\u81F4\uFF09\uFF0C\u62D2\u7EDD\u8986\u76D6\u64A4\u9500"
    );
  }
  return {
    history: { version: 1, undo: h.undo.slice(0, -1), redo: [...h.redo, entry] },
    trackId: entry.trackId,
    lane: cloneLane(entry.before),
    entry
  };
}
function redoHistory(h, lanes) {
  const entry = h.redo[h.redo.length - 1];
  if (!entry) throw new AutomationError("NOT_FOUND", "\u6CA1\u6709\u53EF\u91CD\u505A\u7684\u81EA\u52A8\u5316\u7F16\u8F91");
  if (!lanes.has(entry.trackId)) {
    throw new AutomationError("NOT_FOUND", "\u76EE\u6807\u58F0\u8F68\u5DF2\u4E0D\u5B58\u5728");
  }
  const cur = lanes.get(entry.trackId);
  if (cur.revision !== entry.before.revision) {
    throw new AutomationError(
      "REVISION_MISMATCH",
      "\u81EA\u52A8\u5316\u8F68\u5DF2\u88AB\u5176\u4ED6\u7F16\u8F91\u6539\u52A8\uFF08\u7248\u672C\u4E0D\u4E00\u81F4\uFF09\uFF0C\u62D2\u7EDD\u8986\u76D6\u91CD\u505A"
    );
  }
  return {
    history: { version: 1, undo: [...h.undo, entry], redo: h.redo.slice(0, -1) },
    trackId: entry.trackId,
    lane: cloneLane(entry.after),
    entry
  };
}
function migrateDoc(input) {
  if (!input || typeof input !== "object") return null;
  const d = input;
  if (!Array.isArray(d.tracks) || !d.listener || !d.spatial) return null;
  const tracks = d.tracks.map((t) => ({
    ...t,
    automation: normalizeLane(t.automation)
  }));
  const history = d.automationHistory && typeof d.automationHistory === "object" && Array.isArray(d.automationHistory.undo) ? {
    version: 1,
    undo: d.automationHistory.undo,
    redo: Array.isArray(d.automationHistory.redo) ? d.automationHistory.redo : []
  } : emptyHistory();
  return {
    version: 2,
    tracks,
    listener: d.listener,
    spatial: d.spatial,
    busGain: typeof d.busGain === "number" ? d.busGain : 1,
    masterGain: typeof d.masterGain === "number" ? d.masterGain : 0.9,
    savedAt: typeof d.savedAt === "number" ? d.savedAt : 0,
    name: d.name,
    automationHistory: history
  };
}

// test/automation.test.ts
describe("\u7A7A\u95F4\u81EA\u52A8\u5316\u8F68\uFF1A\u6807\u8BC6\u3001\u987A\u5E8F\u3001\u7248\u672C", () => {
  it("\u5173\u952E\u5E27\u6309\u65F6\u95F4\u4FDD\u5B58\u4E14 revision \u5355\u8C03\u9012\u589E\uFF1B\u7A33\u5B9A id \u5728\u7F16\u8F91\u4E2D\u4FDD\u6301", () => {
    let lane = emptyLane();
    lane = addKeyframe(lane, { time: 1, params: { position: { x: 1, y: 0, z: 0 } } });
    lane = addKeyframe(lane, { time: 0, params: { position: { x: 0, y: 0, z: 0 } } });
    assert.equal(lane.keyframes[0].time, 0);
    assert.equal(lane.keyframes[1].time, 1);
    assert.equal(lane.revision, 2);
    const id = lane.keyframes[1].id;
    lane = updateKeyframe(lane, { id, time: 2 });
    assert.equal(lane.keyframes.find((k) => k.id === id).time, 2);
    assert.equal(lane.revision, 3);
  });
  it("\u540C\u4E00\u65F6\u523B\u63D0\u4EA4\u51B2\u7A81\u5173\u952E\u5E27\u88AB\u62D2\u7EDD\uFF0C\u539F\u8F68\u4FDD\u6301\u4E0D\u53D8", () => {
    let lane = addKeyframe(emptyLane(), {
      time: 0.5,
      params: { position: { x: 1, y: 0, z: 0 } }
    });
    const snapshot = JSON.parse(JSON.stringify(lane));
    assert.throws(
      () => addKeyframe(lane, { time: 0.5, params: { gain: 0.2 } }),
      (err) => err instanceof AutomationError && err.code === "DUP_TIME"
    );
    assert.deepEqual(JSON.parse(JSON.stringify(lane)), snapshot);
    assert.equal(lane.keyframes.length, 1);
    assert.equal(lane.revision, snapshot.revision);
  });
  it("\u6539\u65F6\u95F4\u8D8A\u8FC7\u76F8\u90BB\u5E27\uFF08\u9006\u5E8F\uFF09\u88AB\u62D2\u7EDD\uFF0C\u7EDD\u4E0D\u9759\u9ED8\u91CD\u6392", () => {
    let lane = emptyLane();
    lane = addKeyframe(lane, { time: 0, params: { gain: 0 } });
    lane = addKeyframe(lane, { time: 1, params: { gain: 1 } });
    const secondId = lane.keyframes[1].id;
    assert.throws(
      () => updateKeyframe(lane, { id: secondId, time: 0 }),
      (err) => err instanceof AutomationError && err.code === "ORDER_VIOLATION"
    );
    assert.throws(
      () => updateKeyframe(lane, { id: secondId, time: -1 }),
      AutomationError
    );
    assert.deepEqual(lane.keyframes.map((k) => k.time), [0, 1]);
  });
  it("\u5220\u9664/\u6E05\u7A7A\u5747\u4EA7\u751F\u65B0\u7248\u672C\uFF0C\u4E14\u4E0D\u5B58\u5728\u7684 id \u62A5\u9519", () => {
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
  it("\u975E\u6CD5\u503C\u88AB\u62D2\u7EDD\uFF1A\u975E\u6709\u9650\u5750\u6807\u3001\u96F6\u671D\u5411\u5411\u91CF\u3001\u8D85\u754C\u589E\u76CA", () => {
    assert.throws(
      () => addKeyframe(emptyLane(), { time: 0, params: { position: { x: NaN, y: 0, z: 0 } } }),
      (e) => e instanceof AutomationError && e.code === "BAD_VALUE"
    );
    assert.throws(
      () => addKeyframe(emptyLane(), { time: 0, params: { orientation: { x: 0, y: 0, z: 0 } } }),
      AutomationError
    );
    assert.throws(
      () => addKeyframe(emptyLane(), { time: 0, params: { gain: 2 } }),
      AutomationError
    );
  });
});
describe("\u91C7\u6837\uFF1A\u63D2\u503C\u3001\u9636\u68AF\u3001\u4FDD\u6301\u3001\u5FAA\u73AF", () => {
  const lane = (() => {
    let l = emptyLane();
    l = addKeyframe(l, { time: 0, params: { position: { x: -10, y: 0, z: 0 }, gain: 0 } });
    l = addKeyframe(l, { time: 1, params: { position: { x: 10, y: 0, z: 0 }, gain: 1 } });
    return l;
  })();
  it("\u6BB5\u5185\u7EBF\u6027\u63D2\u503C\uFF1B\u8D77\u70B9\u4E4B\u524D\u4E0D\u63A5\u7BA1\uFF0C\u672B\u5C3E\u4E4B\u540E\u4FDD\u6301\u672B\u503C", () => {
    assert.equal(sampleLane(lane, -1).position, void 0);
    assert.equal(sampleLane(lane, 0).position.x, -10);
    assert.equal(sampleLane(lane, 0.5).position.x, 0);
    assert.equal(sampleLane(lane, 0.25).gain, 0.25);
    assert.equal(sampleLane(lane, 2).position.x, 10);
  });
  it("\u7A00\u758F\u53C2\u6570\uFF1A\u4EC5\u4E00\u4E2A\u5173\u952E\u5E27\u627F\u8F7D\u7684\u53C2\u6570\u5728\u5168\u5C40\u4FDD\u6301\u6052\u5B9A\uFF08\u9636\u68AF\uFF09", () => {
    let l = addKeyframe(emptyLane(), {
      time: 0,
      params: { position: { x: 0, y: 0, z: 0 } }
    });
    l = addKeyframe(l, { time: 1, params: { position: { x: 4, y: 0, z: 0 }, gain: 0.5 } });
    assert.equal(sampleLane(l, 0).gain, void 0);
    assert.equal(sampleLane(l, 1).gain, 0.5);
    assert.equal(sampleLane(l, 9).gain, 0.5);
  });
  it("\u5FAA\u73AF\u91C7\u6837\u628A\u64AD\u653E\u5934\u6298\u53E0\u56DE\u5468\u671F", () => {
    assert.ok(Math.abs(sampleLaneLoop(lane, 1.5, 1).position.x - 0) < 1e-9);
    assert.ok(Math.abs(sampleLaneLoop(lane, 2, 1).position.x - -10) < 1e-9);
  });
});
describe("\u64A4\u9500/\u91CD\u505A\u5386\u53F2\uFF1A\u53EF\u5BA1\u8BA1\u3001\u7248\u672C\u51B2\u7A81\u62D2\u7EDD", () => {
  it("\u64A4\u9500\u56DE\u5230 before \u5FEB\u7167\uFF0C\u91CD\u505A\u6062\u590D\uFF1B\u65B0\u7F16\u8F91\u6E05\u7A7A redo", () => {
    let lane = addKeyframe(emptyLane(), { time: 0, params: { gain: 0.5 } });
    const rev1 = lane.revision;
    let history = emptyHistory();
    const before = JSON.parse(JSON.stringify(lane));
    const after2 = addKeyframe(lane, { time: 1, params: { gain: 1 } });
    history = pushHistory(history, { trackId: "t", label: "add", before: lane, after: after2 });
    lane = after2;
    const lanes = /* @__PURE__ */ new Map([["t", lane]]);
    const u = undoHistory(history, lanes);
    assert.equal(u.lane.revision, rev1);
    assert.deepEqual(u.lane.keyframes.length, 1);
    history = u.history;
    lane = u.lane;
    const lanes2 = /* @__PURE__ */ new Map([["t", lane]]);
    const r = redoHistory(history, lanes2);
    assert.equal(r.lane.keyframes.length, 2);
    history = r.history;
    lane = r.lane;
    const after3 = updateKeyframe(lane, { id: lane.keyframes[0].id, params: { gain: 0.2 } });
    history = pushHistory(history, { trackId: "t", label: "edit", before: lane, after: after3 });
    assert.equal(history.redo.length, 0);
    assert.equal(history.undo.length, 2);
  });
  it("\u5F53\u524D\u8F68 revision \u4E0E\u5386\u53F2\u5FEB\u7167\u4E0D\u4E00\u81F4\u65F6\u62D2\u7EDD\u64A4\u9500\uFF08\u9632\u6B62\u8986\u76D6\u65B0\u7F16\u8F91\uFF09", () => {
    let lane = addKeyframe(emptyLane(), { time: 0, params: { gain: 0.5 } });
    const lane2 = addKeyframe(lane, { time: 1, params: { gain: 1 } });
    const history = pushHistory(emptyHistory(), {
      trackId: "t",
      label: "add",
      before: lane,
      after: lane2
    });
    const diverged = addKeyframe(lane2, { time: 2, params: { gain: 0.9 } });
    assert.throws(
      () => undoHistory(history, /* @__PURE__ */ new Map([["t", diverged]])),
      (e) => e instanceof AutomationError && e.code === "REVISION_MISMATCH"
    );
  });
});
describe("\u5DE5\u7A0B\u8FC1\u79FB", () => {
  it("v1 \u5DE5\u7A0B\uFF08\u65E0 automation\uFF09\u8FC1\u79FB\u4E3A v2\uFF0C\u7A7A\u81EA\u52A8\u5316\u8F68\u4E14\u4E0D\u62A5\u9519", () => {
    const v1 = {
      version: 1,
      tracks: [
        {
          id: "x",
          name: "n",
          sourceType: "tone",
          loop: true,
          muted: false,
          solo: false,
          gain: 1,
          channel: 0,
          color: "#fff",
          position: { x: 0, y: 0, z: 0 },
          status: "ready"
        }
      ],
      listener: { position: { x: 0, y: 0, z: 0 }, yaw: 0, pitch: 0, earHeight: 0 },
      spatial: {
        distanceModel: "inverse",
        refDistance: 1,
        rolloffFactor: 1,
        maxDistance: 30,
        positionTimeConstant: 0.05,
        hrtfIR: "none"
      },
      busGain: 1,
      masterGain: 1,
      savedAt: 0
    };
    const doc = migrateDoc(v1);
    assert.ok(doc);
    assert.equal(doc.version, 2);
    assert.equal(doc.tracks[0].automation.keyframes.length, 0);
    assert.deepEqual(doc.automationHistory.undo, []);
  });
  it("\u635F\u574F\u8F93\u5165\u8FD4\u56DE null\uFF1B\u4E71\u5E8F/\u540C\u523B\u810F\u6570\u636E\u5728\u52A0\u8F7D\u671F\u89C4\u6574\uFF08\u4EC5\u8FC1\u79FB\u8DEF\u5F84\uFF09", () => {
    assert.equal(migrateDoc(null), null);
    const doc = migrateDoc({
      version: 2,
      tracks: [
        {
          id: "x",
          name: "n",
          sourceType: "tone",
          loop: true,
          muted: false,
          solo: false,
          gain: 1,
          channel: 0,
          color: "#fff",
          position: { x: 0, y: 0, z: 0 },
          status: "ready",
          automation: {
            schema: 1,
            revision: 5,
            keyframes: [
              { id: "b", time: 2, params: { gain: 0.5 } },
              { id: "a", time: 0, params: { position: { x: 1, y: 0, z: 0 } } },
              { id: "bad", time: -3, params: { gain: 0.1 } }
            ]
          }
        }
      ],
      listener: { position: { x: 0, y: 0, z: 0 }, yaw: 0, pitch: 0, earHeight: 0 },
      spatial: {
        distanceModel: "inverse",
        refDistance: 1,
        rolloffFactor: 1,
        maxDistance: 30,
        positionTimeConstant: 0.05,
        hrtfIR: "none"
      },
      busGain: 1,
      masterGain: 1,
      savedAt: 0
    });
    assert.deepEqual(doc.tracks[0].automation.keyframes.map((k) => k.time), [0, 2]);
  });
});
