/**
 * 空间自动化纯逻辑：与 Web Audio / React 无关，可直接在 Node 下测试。
 *
 * 关键约定：
 *  - 关键帧在轨内始终按 time 升序、time 唯一；
 *  - 任何会破坏“时间唯一 / 顺序递增”的提交都被显式拒绝（AutomationError），
 *    调用方保留原轨，绝不静默重排；
 *  - 只保存出现过的参数（稀疏参数轨）；段内线性插值，关键帧之间没有的参数
 *    保持阶梯（hold），首尾之外恒定保持端点值；
 *  - 每次被接受的编辑产生 revision+1 的新版本，可经 AutomationHistory 审计。
 */
import type {
  AutomationHistory,
  AutomationHistoryEntry,
  AutomationKeyframe,
  AutomationLane,
  AutomationParams,
  ProjectDoc,
  Vec3,
} from '../types';

export type AutomationParamName = 'position' | 'orientation' | 'gain';
const ALL_PARAMS: AutomationParamName[] = ['position', 'orientation', 'gain'];

let seq = 0;
/** 稳定标识：编辑保留 id；新建才分配 */
export function newAutomationId(prefix: string): string {
  seq += 1;
  return `${prefix}-${Date.now().toString(36)}-${seq}`;
}

export function emptyLane(): AutomationLane {
  return { schema: 1, keyframes: [], revision: 0, updatedAt: 0 };
}

export function emptyHistory(): AutomationHistory {
  return { version: 1, undo: [], redo: [] };
}

export class AutomationError extends Error {
  code:
    | 'DUP_TIME'
    | 'ORDER_VIOLATION'
    | 'NOT_FOUND'
    | 'BAD_VALUE'
    | 'REVISION_MISMATCH';
  constructor(
    code: AutomationError['code'],
    message: string,
  ) {
    super(message);
    this.name = 'AutomationError';
    this.code = code;
  }
}

const HISTORY_LIMIT = 100;

function isFiniteNum(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function validVec3(v: unknown): v is Vec3 {
  return (
    !!v &&
    typeof v === 'object' &&
    isFiniteNum((v as Vec3).x) &&
    isFiniteNum((v as Vec3).y) &&
    isFiniteNum((v as Vec3).z)
  );
}

/** 校验一份参数：值必须有限，增益非负且不超过推子上限 */
export function validateParams(params: AutomationParams): void {
  if (params.position && !validVec3(params.position)) {
    throw new AutomationError('BAD_VALUE', '位置必须是有限的三维坐标');
  }
  if (params.orientation) {
    if (!validVec3(params.orientation)) {
      throw new AutomationError('BAD_VALUE', '朝向必须是有限的三维向量');
    }
    const { x, y, z } = params.orientation;
    const len = Math.hypot(x, y, z);
    if (len < 1e-6) throw new AutomationError('BAD_VALUE', '朝向向量不能为零向量');
  }
  if (params.gain !== undefined) {
    if (!isFiniteNum(params.gain) || params.gain < 0 || params.gain > 1.5) {
      throw new AutomationError('BAD_VALUE', '增益必须是 0..1.5 之间的有限数');
    }
  }
}

function validTime(time: number): void {
  if (!isFiniteNum(time) || time < 0) {
    throw new AutomationError('BAD_VALUE', '关键帧时间必须是非负有限秒数');
  }
}

function cloneLane(lane: AutomationLane): AutomationLane {
  return {
    schema: 1,
    revision: lane.revision,
    updatedAt: lane.updatedAt,
    keyframes: lane.keyframes.map((k) => ({
      id: k.id,
      time: k.time,
      params: cloneParams(k.params),
    })),
  };
}

export function cloneParams(p: AutomationParams): AutomationParams {
  return {
    ...(p.position ? { position: { ...p.position } } : {}),
    ...(p.orientation ? { orientation: { ...p.orientation } } : {}),
    ...(p.gain !== undefined ? { gain: p.gain } : {}),
  };
}

/** 结构规整：只排序用于加载/迁移等“没有作者意图”的场合，编辑路径不走这里 */
export function normalizeLane(input: unknown): AutomationLane {
  if (!input || typeof input !== 'object') return emptyLane();
  const l = input as Partial<AutomationLane>;
  const raw = Array.isArray(l.keyframes) ? l.keyframes : [];
  const seen = new Set<string>();
  const keyframes: AutomationKeyframe[] = [];
  for (const k of raw) {
    if (!k || typeof k !== 'object') continue;
    const kf = k as Partial<AutomationKeyframe>;
    if (typeof kf.id !== 'string' || !kf.id || seen.has(kf.id)) continue;
    if (!isFiniteNum(kf.time) || kf.time < 0) continue;
    const params: AutomationParams = {};
    if (validVec3(kf.params?.position)) params.position = { ...kf.params!.position! };
    if (validVec3(kf.params?.orientation)) {
      const o = kf.params!.orientation!;
      if (Math.hypot(o.x, o.y, o.z) >= 1e-6) params.orientation = { ...o };
    }
    if (isFiniteNum(kf.params?.gain) && kf.params!.gain! >= 0 && kf.params!.gain! <= 1.5) {
      params.gain = kf.params!.gain!;
    }
    if (Object.keys(params).length === 0) continue;
    seen.add(kf.id);
    keyframes.push({ id: kf.id, time: kf.time, params });
  }
  keyframes.sort((a, b) => a.time - b.time);
  return {
    schema: 1,
    keyframes,
    revision: isFiniteNum(l.revision) ? Math.max(0, Math.floor(l.revision as number)) : 0,
    updatedAt: isFiniteNum(l.updatedAt) ? (l.updatedAt as number) : 0,
  };
}

function commit(lane: AutomationLane, keyframes: AutomationKeyframe[]): AutomationLane {
  return {
    schema: 1,
    keyframes,
    revision: lane.revision + 1,
    updatedAt: Date.now(),
  };
}

export interface AddKeyframeInput {
  id?: string;
  time: number;
  params: AutomationParams;
}

/**
 * 新增关键帧。同一时间已存在关键帧 → 拒绝（不覆盖、不合并不重排）。
 */
export function addKeyframe(lane: AutomationLane, input: AddKeyframeInput): AutomationLane {
  validTime(input.time);
  validateParams(input.params);
  if (Object.keys(input.params).length === 0) {
    throw new AutomationError('BAD_VALUE', '关键帧至少需要一个参数');
  }
  if (lane.keyframes.some((k) => k.time === input.time)) {
    throw new AutomationError(
      'DUP_TIME',
      `时间 ${input.time.toFixed(3)}s 已有关键帧；拒绝在同一时刻重复提交`,
    );
  }
  const kf: AutomationKeyframe = {
    id: input.id ?? newAutomationId('kf'),
    time: input.time,
    params: cloneParams(input.params),
  };
  const next = [...lane.keyframes, kf].sort((a, b) => a.time - b.time);
  return commit(lane, next);
}

export interface UpdateKeyframeInput {
  id: string;
  /** 不传 = 保持原时间；新时间与相邻帧冲突/逆序时拒绝 */
  time?: number;
  /** 整体替换参数（合并语义见 patchParams） */
  params?: AutomationParams;
  patch?: boolean;
}

/**
 * 编辑关键帧（稳定 id 保持不变）。
 * 移动时间越过相邻帧、或与另一帧时间相同 → 拒绝，原轨保留。
 */
export function updateKeyframe(lane: AutomationLane, input: UpdateKeyframeInput): AutomationLane {
  const idx = lane.keyframes.findIndex((k) => k.id === input.id);
  if (idx < 0) throw new AutomationError('NOT_FOUND', '关键帧不存在或已被删除');
  const current = lane.keyframes[idx];
  const nextTime = input.time ?? current.time;
  validTime(nextTime);

  const nextParams = input.params
    ? input.patch
      ? { ...current.params, ...cloneParams(input.params) }
      : cloneParams(input.params)
    : current.params;
  validateParams(nextParams);
  if (Object.keys(nextParams).length === 0) {
    throw new AutomationError('BAD_VALUE', '关键帧至少需要一个参数');
  }

  const prev = lane.keyframes[idx - 1];
  const nxt = lane.keyframes[idx + 1];
  if (prev && nextTime <= prev.time) {
    throw new AutomationError(
      'ORDER_VIOLATION',
      `新时间 ${nextTime.toFixed(3)}s 不早于前一关键帧 ${prev.time.toFixed(3)}s；拒绝逆序重排`,
    );
  }
  if (nxt && nextTime >= nxt.time) {
    throw new AutomationError(
      'ORDER_VIOLATION',
      `新时间 ${nextTime.toFixed(3)}s 不晚于后一关键帧 ${nxt.time.toFixed(3)}s；拒绝逆序重排`,
    );
  }

  const updated: AutomationKeyframe = { id: current.id, time: nextTime, params: nextParams };
  const arr = lane.keyframes.slice();
  arr[idx] = updated;
  arr.sort((a, b) => a.time - b.time);
  return commit(lane, arr);
}

export function removeKeyframe(lane: AutomationLane, id: string): AutomationLane {
  if (!lane.keyframes.some((k) => k.id === id)) {
    throw new AutomationError('NOT_FOUND', '关键帧不存在或已被删除');
  }
  return commit(
    lane,
    lane.keyframes.filter((k) => k.id !== id),
  );
}

/** 清空整轨（产生新版本，可撤销） */
export function clearLane(lane: AutomationLane): AutomationLane {
  if (lane.keyframes.length === 0) return lane;
  return commit(lane, []);
}

// ---------- 插值采样 ----------

function lerp(a: number, b: number, u: number): number {
  return a + (b - a) * u;
}

function lerpVec3(a: Vec3, b: Vec3, u: number): Vec3 {
  return { x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), z: lerp(a.z, b.z, u) };
}

/**
 * 在工程相对时间 t 处采样自动化轨（不考虑循环；循环由调用方先取模）。
 * 稀疏参数语义：
 *  - 首次出现之前：该参数不存在（undefined），由调用方回退到手动/当前值；
 *  - 两个承载该参数的关键帧之间：线性插值（中间夹带其他帧不影响）；
 *  - 末次出现之后：保持最后值（阶梯）；
 *  - 单关键帧：从该时刻起保持恒定。
 */
export function sampleLane(lane: AutomationLane, t: number): AutomationParams {
  const kfs = lane.keyframes;
  const out: AutomationParams = {};
  if (kfs.length === 0) return out;

  for (const name of ALL_PARAMS) {
    // 该参数出现过的关键帧（按时间升序，keyframes 本身有序）
    let first = -1;
    let last = -1;
    for (let i = 0; i < kfs.length; i++) {
      if (getParam(kfs[i].params, name) !== undefined) {
        if (first < 0) first = i;
        last = i;
      }
    }
    if (first < 0) continue;

    // 参数尚未开始：不接管（交还给手动值）
    if (t < kfs[first].time) continue;
    if (t >= kfs[last].time) {
      assignParam(out, name, getParam(kfs[last].params, name));
      continue;
    }

    // 找到 t 所在区间；若无该参数的后帧则保持左值
    let li = -1;
    let ri = -1;
    for (let i = 0; i < kfs.length; i++) {
      if (getParam(kfs[i].params, name) === undefined) continue;
      if (kfs[i].time <= t) li = i;
      if (kfs[i].time >= t && ri < 0) ri = i;
    }
    const lv = getParam(kfs[li].params, name);
    const rv = ri >= 0 ? getParam(kfs[ri].params, name) : undefined;
    if (rv === undefined || ri === li) {
      assignParam(out, name, lv);
    } else {
      const span = kfs[ri].time - kfs[li].time;
      const u = span > 0 ? (t - kfs[li].time) / span : 0;
      if (name === 'gain') {
        out.gain = lerp(lv as number, rv as number, u);
      } else {
        assignParam(out, name, lerpVec3(lv as Vec3, rv as Vec3, u));
      }
    }
  }
  return out;
}

/** 循环播放：把播放头折叠回 [0, cycle) 再采样 */
export function sampleLaneLoop(lane: AutomationLane, t: number, cycle: number): AutomationParams {
  if (!Number.isFinite(cycle) || cycle <= 0) return sampleLane(lane, t);
  const m = ((t % cycle) + cycle) % cycle;
  return sampleLane(lane, m);
}

function getParam(p: AutomationParams, name: AutomationParamName): number | Vec3 | undefined {
  return p[name];
}

function assignParam(out: AutomationParams, name: AutomationParamName, v: number | Vec3 | undefined) {
  if (v === undefined) return;
  if (name === 'gain') out.gain = v as number;
  else if (name === 'position') out.position = { ...(v as Vec3) };
  else out.orientation = { ...(v as Vec3) };
}

/** 该轨是否包含任一参数的关键帧 */
export function laneHasParam(lane: AutomationLane, name: AutomationParamName): boolean {
  return lane.keyframes.some((k) => getParam(k.params, name) !== undefined);
}

export function laneDuration(lane: AutomationLane): number {
  return lane.keyframes.reduce((m, k) => Math.max(m, k.time), 0);
}

// ---------- 撤销历史 ----------

/**
 * 把一次“已验证成功”的编辑记入历史。redo 在新编辑发生时清空（标准分歧模型）。
 * before/after 均为深拷贝快照，事后不会被篡改。
 */
export function pushHistory(
  history: AutomationHistory,
  entry: Omit<AutomationHistoryEntry, 'id' | 'at'>,
): AutomationHistory {
  const full: AutomationHistoryEntry = {
    ...entry,
    before: cloneLane(entry.before),
    after: cloneLane(entry.after),
    id: newAutomationId('hist'),
    at: Date.now(),
  };
  const undo = [...history.undo, full];
  while (undo.length > HISTORY_LIMIT) undo.shift();
  return { version: 1, undo, redo: [] };
}

export function canUndo(h: AutomationHistory): boolean {
  return h.undo.length > 0;
}

export function canRedo(h: AutomationHistory): boolean {
  return h.redo.length > 0;
}

export interface UndoResult {
  history: AutomationHistory;
  trackId: string;
  lane: AutomationLane;
  entry: AutomationHistoryEntry;
}

export function undoHistory(h: AutomationHistory, lanes: Map<string, AutomationLane>): UndoResult {
  const entry = h.undo[h.undo.length - 1];
  if (!entry) throw new AutomationError('NOT_FOUND', '没有可撤销的自动化编辑');
  if (!lanes.has(entry.trackId)) {
    throw new AutomationError('NOT_FOUND', '目标声轨已不存在');
  }
  // 审计：撤销只允许回到 entry.before；当前轨必须仍是 entry.after（revision 一致）
  const cur = lanes.get(entry.trackId)!;
  if (cur.revision !== entry.after.revision) {
    throw new AutomationError(
      'REVISION_MISMATCH',
      '自动化轨已被其他编辑改动（版本不一致），拒绝覆盖撤销',
    );
  }
  return {
    history: { version: 1, undo: h.undo.slice(0, -1), redo: [...h.redo, entry] },
    trackId: entry.trackId,
    lane: cloneLane(entry.before),
    entry,
  };
}

export function redoHistory(h: AutomationHistory, lanes: Map<string, AutomationLane>): UndoResult {
  const entry = h.redo[h.redo.length - 1];
  if (!entry) throw new AutomationError('NOT_FOUND', '没有可重做的自动化编辑');
  if (!lanes.has(entry.trackId)) {
    throw new AutomationError('NOT_FOUND', '目标声轨已不存在');
  }
  const cur = lanes.get(entry.trackId)!;
  if (cur.revision !== entry.before.revision) {
    throw new AutomationError(
      'REVISION_MISMATCH',
      '自动化轨已被其他编辑改动（版本不一致），拒绝覆盖重做',
    );
  }
  return {
    history: { version: 1, undo: [...h.undo, entry], redo: h.redo.slice(0, -1) },
    trackId: entry.trackId,
    lane: cloneLane(entry.after),
    entry,
  };
}

// ---------- 工程迁移 ----------

/**
 * 读取期迁移：v1（无 automation 字段）→ v2。
 * 只做结构恢复，不创建播放状态、不自动播放。
 */
export function migrateDoc(input: unknown): ProjectDoc | null {
  if (!input || typeof input !== 'object') return null;
  const d = input as Partial<ProjectDoc> & { version?: number };
  if (!Array.isArray(d.tracks) || !d.listener || !d.spatial) return null;
  const tracks = d.tracks.map((t) => ({
    ...t,
    automation: normalizeLane(t.automation),
  }));
  const history: AutomationHistory =
    d.automationHistory &&
    typeof d.automationHistory === 'object' &&
    Array.isArray((d.automationHistory as AutomationHistory).undo)
      ? {
          version: 1,
          undo: (d.automationHistory as AutomationHistory).undo,
          redo: Array.isArray((d.automationHistory as AutomationHistory).redo)
            ? (d.automationHistory as AutomationHistory).redo
            : [],
        }
      : emptyHistory();
  return {
    version: 2,
    tracks,
    listener: d.listener,
    spatial: d.spatial,
    busGain: typeof d.busGain === 'number' ? d.busGain : 1,
    masterGain: typeof d.masterGain === 'number' ? d.masterGain : 0.9,
    savedAt: typeof d.savedAt === 'number' ? d.savedAt : 0,
    name: d.name,
    automationHistory: history,
  };
}
