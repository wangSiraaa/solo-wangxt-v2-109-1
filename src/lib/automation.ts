/**
 * automation.ts —— 每轨空间自动化的纯领域逻辑（无 DOM / Web Audio 依赖）。
 *
 * 不变量：
 *  1. 关键帧以工程相对时间保存，数组按 time 严格递增；顺序即提交顺序，
 *     任何“同时间冲突”或“需要静默重排既有帧”的操作一律拒绝，原数组保持不变。
 *  2. 每帧有稳定 id（创建后不变），lane 有结构版本 version，
 *     每次变更产生单调递增的 revision 与不可变审计记录 AutomationRevision。
 *  3. 撤销恢复的是上一个版本的完整快照，且撤销本身也留下一条 'undo' 记录，
 *     全部历史可审计。
 *  4. 采样（sampleLane）是 2D/3D/方位读数与 PannerNode 调度的共同来源，
 *     避免二维、三维、左右声道语义各算各的。
 */
import type {
  AutomationKeyframe,
  AutomationLane,
  AutomationParam,
  AutomationRevision,
  Orientation,
  ProjectDoc,
  Vec3,
} from '../types';

export const LANE_VERSION = 1;
const MAX_REVISIONS = 60;
const TWO_PI = Math.PI * 2;

export class AutomationError extends Error {
  code: 'conflict' | 'not-found' | 'invalid';
  constructor(code: AutomationError['code'], message: string) {
    super(message);
    this.name = 'AutomationError';
    this.code = code;
  }
}

export interface MutationResult {
  lane: AutomationLane;
  revision: AutomationRevision;
}

let counter = 0;
export function uid(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter.toString(36)}`;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function isValidValue(kf: Pick<AutomationKeyframe, 'param' | 'position' | 'orientation' | 'gain'>): boolean {
  if (kf.param === 'position') {
    return (
      !!kf.position &&
      isFiniteNumber(kf.position.x) &&
      isFiniteNumber(kf.position.y) &&
      isFiniteNumber(kf.position.z)
    );
  }
  if (kf.param === 'orientation') {
    return !!kf.orientation && isFiniteNumber(kf.orientation.yaw) && isFiniteNumber(kf.orientation.pitch);
  }
  return isFiniteNumber(kf.gain);
}

/** 新建空自动化轨 */
export function emptyLane(trackId: string): AutomationLane {
  return {
    trackId,
    version: LANE_VERSION,
    enabled: true,
    keyframes: [],
    revisions: [],
    revisionSeq: 0,
  };
}

export function laneFor(doc: Pick<ProjectDoc, 'automation'>, trackId: string): AutomationLane {
  return doc.automation[trackId] ?? emptyLane(trackId);
}

/** 轨道内任一关键帧是否占用 time（严格比较，eps 内也算冲突） */
export function keyframeAt(lane: AutomationLane, time: number, eps = 1e-6): AutomationKeyframe | undefined {
  return lane.keyframes.find((k) => Math.abs(k.time - time) <= eps);
}

function framesOf(lane: AutomationLane, param: AutomationParam): AutomationKeyframe[] {
  return lane.keyframes.filter((k) => k.param === param);
}

/** 断言 lane 当前为严格时间递增（加载外部数据后的健壮性检查） */
export function isSorted(lane: AutomationLane): boolean {
  for (let i = 1; i < lane.keyframes.length; i++) {
    if (lane.keyframes[i].time <= lane.keyframes[i - 1].time) return false;
  }
  return true;
}

function cloneValue(kf: AutomationKeyframe) {
  if (kf.param === 'position') return { position: { ...kf.position! } };
  if (kf.param === 'orientation') return { orientation: { ...kf.orientation! } };
  return { gain: kf.gain as number };
}

function normalizeValue(kf: AutomationKeyframe): AutomationKeyframe {
  if (kf.param === 'orientation' && kf.orientation) {
    // yaw 不在这里归一化到 [-π,π]：保留提交值，插值时走最短路径
    return { ...kf, orientation: { yaw: kf.orientation.yaw, pitch: kf.orientation.pitch } };
  }
  return kf;
}

function pushRevision(
  lane: AutomationLane,
  entry: Omit<AutomationRevision, 'id' | 'revision' | 'at' | 'keyframes'> & {
    keyframes: AutomationKeyframe[];
  },
): AutomationRevision {
  const revision: AutomationRevision = {
    id: uid('rev'),
    revision: lane.revisionSeq + 1,
    at: Date.now(),
    ...entry,
  };
  lane.revisionSeq = revision.revision;
  lane.revisions = [...lane.revisions, revision].slice(-MAX_REVISIONS);
  return revision;
}

/** 提交关键帧：同 time 冲突或逆序（需要静默重排既有帧）一律拒绝 */
export function commitKeyframe(
  laneIn: AutomationLane,
  frame: {
    time: number;
    param: AutomationParam;
    position?: Vec3;
    orientation?: Orientation;
    gain?: number;
    id?: string;
  },
): MutationResult {
  const lane: AutomationLane = {
    ...laneIn,
    keyframes: [...laneIn.keyframes],
    revisions: [...laneIn.revisions],
  };
  if (!isFiniteNumber(frame.time) || frame.time < 0) {
    throw new AutomationError('invalid', '关键帧时间必须为非负有限数');
  }
  if (!isValidValue(frame)) {
    throw new AutomationError('invalid', `关键帧缺少参数 ${frame.param} 的有效值`);
  }
  // 同时间冲突：绝不悄悄替换或重排，保留原轨
  const clash = keyframeAt(lane, frame.time);
  if (clash) {
    throw new AutomationError(
      'conflict',
      `时间 ${frame.time.toFixed(3)}s 已存在关键帧（${clash.id}），拒绝同刻提交`,
    );
  }
  // 逆序保护：新帧必须保持整体严格递增；若插在中间会“改动既有顺序的位置”，
  // 这里的规则是允许中间插入（不重排既有帧，既有帧相对顺序不变），
  // 但拒绝与既有帧时间相同。真正的逆序指 moveKeyframe。
  const insertAt = lane.keyframes.findIndex((k) => k.time > frame.time);
  const at = insertAt === -1 ? lane.keyframes.length : insertAt;
  const kf: AutomationKeyframe = normalizeValue({
    id: frame.id ?? uid('kf'),
    time: frame.time,
    param: frame.param,
    createdAt: Date.now(),
    ...(frame.param === 'position' ? { position: { ...frame.position! } } : {}),
    ...(frame.param === 'orientation' ? { orientation: { ...frame.orientation! } } : {}),
    ...(frame.param === 'gain' ? { gain: frame.gain } : {}),
  });
  const pre = lane.keyframes;
  lane.keyframes = [...lane.keyframes.slice(0, at), kf, ...lane.keyframes.slice(at)];
  if (!isSorted(lane)) {
    // 理论不可达：冲突已在前面拦截
    throw new AutomationError('conflict', '提交会破坏关键帧顺序');
  }
  const revision = pushRevision(lane, {
    action: 'commit',
    summary: `提交 ${paramLabel(frame.param)} 关键帧 @${frame.time.toFixed(2)}s`,
    keyframes: lane.keyframes,
    pre,
  });
  return { lane, revision };
}

export function deleteKeyframe(laneIn: AutomationLane, id: string): MutationResult {
  const idx = laneIn.keyframes.findIndex((k) => k.id === id);
  if (idx === -1) throw new AutomationError('not-found', `关键帧 ${id} 不存在`);
  const lane: AutomationLane = {
    ...laneIn,
    keyframes: laneIn.keyframes.filter((k) => k.id !== id),
    revisions: [...laneIn.revisions],
  };
  const removed = laneIn.keyframes[idx];
  const revision = pushRevision(lane, {
    action: 'commit',
    summary: `删除 ${paramLabel(removed.param)} 关键帧 @${removed.time.toFixed(2)}s`,
    keyframes: lane.keyframes,
    pre: laneIn.keyframes,
  });
  return { lane, revision };
}

/**
 * 移动关键帧时间。若目标时刻被占用，或移动后既有帧相对顺序被反转
 * （需要静默重排），拒绝并返回原轨。
 */
export function moveKeyframe(laneIn: AutomationLane, id: string, time: number): MutationResult {
  if (!isFiniteNumber(time) || time < 0) {
    throw new AutomationError('invalid', '关键帧时间必须为非负有限数');
  }
  const idx = laneIn.keyframes.findIndex((k) => k.id === id);
  if (idx === -1) throw new AutomationError('not-found', `关键帧 ${id} 不存在`);
  const frame = laneIn.keyframes[idx];
  if (Math.abs(frame.time - time) <= 1e-9) {
    // 无变化：不产生新版本
    const rev = laneIn.revisions[laneIn.revisions.length - 1];
    return { lane: laneIn, revision: rev as AutomationRevision };
  }
  const clash = laneIn.keyframes.find((k) => k.id !== id && Math.abs(k.time - time) <= 1e-6);
  if (clash) {
    throw new AutomationError('conflict', `时间 ${time.toFixed(3)}s 已被关键帧 ${clash.id} 占用`);
  }
  // 顺序相反保护：被移动帧不得跨过任何相邻帧——它在保存顺序中的秩只能为 0 位移。
  // 允许的目标区间是其前后邻居之间的开区间；越界即“反转相对顺序”，拒绝静默重排。
  const prevFrame = laneIn.keyframes[idx - 1];
  const nextFrame = laneIn.keyframes[idx + 1];
  if (prevFrame && time <= prevFrame.time) {
    throw new AutomationError(
      'conflict',
      `早于前一帧 ${prevFrame.time.toFixed(3)}s 会反转顺序，拒绝移动`,
    );
  }
  if (nextFrame && time >= nextFrame.time) {
    throw new AutomationError(
      'conflict',
      `晚于后一帧 ${nextFrame.time.toFixed(3)}s 会反转顺序，拒绝移动`,
    );
  }
  const others = laneIn.keyframes.filter((k) => k.id !== id);
  const target = others.findIndex((k) => k.time > time);
  const at = target === -1 ? others.length : target;
  const candidate = [...others.slice(0, at), { ...frame, time }, ...others.slice(at)];
  if (!isSorted({ ...laneIn, keyframes: candidate })) {
    throw new AutomationError('conflict', '移动会反转既有关键帧顺序，拒绝静默重排');
  }
  const lane: AutomationLane = { ...laneIn, keyframes: candidate, revisions: [...laneIn.revisions] };
  const revision = pushRevision(lane, {
    action: 'commit',
    summary: `移动 ${paramLabel(frame.param)} 关键帧 ${frame.time.toFixed(2)}s → ${time.toFixed(2)}s`,
    keyframes: lane.keyframes,
    pre: laneIn.keyframes,
  });
  return { lane, revision };
}

/** 只改关键帧携带的值（不动时间、不动顺序），同样留痕 */
export function updateKeyframeValue(
  laneIn: AutomationLane,
  id: string,
  value: { position?: Vec3; orientation?: Orientation; gain?: number },
): MutationResult {
  const idx = laneIn.keyframes.findIndex((k) => k.id === id);
  if (idx === -1) throw new AutomationError('not-found', `关键帧 ${id} 不存在`);
  const old = laneIn.keyframes[idx];
  let next: AutomationKeyframe;
  if (old.param === 'position' && value.position) {
    next = { ...old, position: { ...value.position } };
  } else if (old.param === 'orientation' && value.orientation) {
    next = { ...old, orientation: { ...value.orientation } };
  } else if (old.param === 'gain' && isFiniteNumber(value.gain)) {
    next = { ...old, gain: value.gain };
  } else {
    throw new AutomationError('invalid', `关键帧 ${id} 的 ${old.param} 值无效`);
  }
  if (!isValidValue(next)) throw new AutomationError('invalid', '关键帧值无效');
  next = normalizeValue(next);
  const keyframes = laneIn.keyframes.map((k) => (k.id === id ? next : k));
  const lane: AutomationLane = { ...laneIn, keyframes, revisions: [...laneIn.revisions] };
  const revision = pushRevision(lane, {
    action: 'commit',
    summary: `修改 ${paramLabel(old.param)} 关键帧 @${old.time.toFixed(2)}s 的值`,
    keyframes: lane.keyframes,
    pre: laneIn.keyframes,
  });
  return { lane, revision };
}

/** 清空整条轨的关键帧（保留 lane 本身与启用开关），产生可撤销版本 */
export function clearKeyframes(laneIn: AutomationLane): MutationResult {
  if (laneIn.keyframes.length === 0) {
    const rev = laneIn.revisions[laneIn.revisions.length - 1];
    return { lane: laneIn, revision: rev as AutomationRevision };
  }
  const lane: AutomationLane = { ...laneIn, keyframes: [], revisions: [...laneIn.revisions] };
  const revision = pushRevision(lane, {
    action: 'clear',
    summary: '清空全部关键帧',
    keyframes: [],
    pre: laneIn.keyframes,
  });
  return { lane, revision };
}

/** 启用/停用不改变关键帧数据，不属于新版本 */
export function setEnabled(lane: AutomationLane, enabled: boolean): AutomationLane {
  if (lane.enabled === enabled) return lane;
  return { ...lane, enabled };
}

/**
 * 撤销：恢复上一个带 pre 的版本快照。
 * 撤销本身也是一个可审计版本（action='undo'），但它的 pre 指向前一个版本的 pre，
 * 连续撤销会沿版本链继续回退，绝不静默丢失历史。
 */
export function undoLast(laneIn: AutomationLane): MutationResult {
  if (laneIn.revisions.length === 0) {
    throw new AutomationError('invalid', '没有可撤销的自动化版本');
  }
  const last = laneIn.revisions[laneIn.revisions.length - 1];
  // 无论上一条是提交还是撤销，一律恢复该条目的 pre：
  // 提交链中 pre 是逐级前态，因此连续撤销会沿版本链逐版回退（不会原地踏步）。
  const targetPre = last.pre;
  if (!targetPre) {
    throw new AutomationError('invalid', '该版本没有可恢复的前态（可能来自旧工程迁移）');
  }
  // 恢复快照：仍按 time 校验排序，拒绝恢复会破坏不变量的数据
  const restored = targetPre.map((k) => ({ ...k, ...cloneValue(k) }));
  const probe = { ...laneIn, keyframes: restored };
  if (!isSorted(probe)) {
    throw new AutomationError('conflict', '撤销会恢复出逆序关键帧，已拒绝');
  }
  const lane: AutomationLane = { ...laneIn, keyframes: restored, revisions: [...laneIn.revisions] };
  const revision = pushRevision(lane, {
    action: 'undo',
    summary: `撤销：${last.summary}`,
    keyframes: lane.keyframes,
    pre: last.keyframes,
    reverts: last.id,
  });
  return { lane, revision };
}

// ---------------- 采样（2D/3D/读数/Panner 调度唯一来源） ----------------

function lerp(a: number, b: number, f: number): number {
  return a + (b - a) * f;
}

/** yaw 最短角路径插值，避免从 179° 反向扫到 -179° 时绕远一圈 */
export function lerpAngle(a: number, b: number, f: number): number {
  let d = ((b - a) % TWO_PI + TWO_PI) % TWO_PI;
  if (d > Math.PI) d -= TWO_PI;
  return a + d * f;
}

function wrapPi(a: number): number {
  let v = ((a % TWO_PI) + TWO_PI) % TWO_PI;
  if (v > Math.PI) v -= TWO_PI;
  return v;
}

function valueOf(kf: AutomationKeyframe): number | Vec3 | Orientation {
  if (kf.param === 'position') return kf.position!;
  if (kf.param === 'orientation') return kf.orientation!;
  return kf.gain!;
}

interface Segment {
  prev: AutomationKeyframe;
  next: AutomationKeyframe;
  f: number;
}

/**
 * 在（可能周期回绕的）时间轴上找到 param 对应关键帧在 time 处的包络段。
 * period 为 undefined 时：区间外持住末值/初值（音频自然结束后不再有意义）。
 * period 给定时：按 period 周期循环，[0, period) 为一个周期。
 */
function segmentAt(
  frames: AutomationKeyframe[],
  time: number,
  period: number | undefined,
): Segment | undefined {
  if (frames.length === 0) return undefined;
  const span = period;
  // 单帧：非循环直接持住；循环也始终持住该帧值（包络与周期无关）
  if (frames.length === 1) return { prev: frames[0], next: frames[0], f: 0 };

  if (span === undefined) {
    if (time <= frames[0].time) return { prev: frames[0], next: frames[0], f: 0 };
    const last = frames[frames.length - 1];
    if (time >= last.time) return { prev: last, next: last, f: 0 };
  }

  // 把所有帧展开成一个以 time 为中心的周期视图：prev 取不晚于 phase 的最后一帧，
  // next 取它的下一帧；循环时可能跨周期边界（最后一帧 → 第一帧+period）。
  const phases = frames.map((k) => {
    let p = k.time;
    if (span !== undefined) {
      p = ((p % span) + span) % span;
    }
    return { k, p };
  });
  // 周期内相同 phase 的帧理论上被时间冲突拦截；防御性排序，晚者优先
  phases.sort((a, b) => a.p - b.p || a.k.createdAt - b.k.createdAt);
  const t = span !== undefined ? ((time % span) + span) % span : time;

  if (t <= phases[0].p) {
    if (span === undefined) return { prev: phases[0].k, next: phases[0].k, f: 0 };
    if (phases[0].p === 0) {
      // 首帧位于周期原点（phase 0）：
      //  - t===0（即 period 回绕点）就是首帧本身，f=0
      //  - 否则目标帧在 +span 处，上一帧是本周期最后一帧（如 t=0.9,末帧0.5,span=1 → f=0.8）
      const first = phases[0];
      const last = phases[phases.length - 1];
      if (t === 0) return { prev: first.k, next: first.k, f: 0 };
      const d = first.p + span - last.p;
      const f = (t - last.p) / d;
      return { prev: last.k, next: first.k, f: Math.min(1, Math.max(0, f)) };
    }
    // 首帧晚于 0：跨 0 点回绕，上一帧是上一周期的最后一帧
    const first = phases[0];
    const last = phases[phases.length - 1];
    const f = (t + (span - last.p)) / (first.p + (span - last.p));
    return { prev: last.k, next: first.k, f: Math.min(1, Math.max(0, f)) };
  }
  for (let i = 0; i < phases.length - 1; i++) {
    if (t >= phases[i].p && t <= phases[i + 1].p) {
      const d = phases[i + 1].p - phases[i].p || 1;
      return { prev: phases[i].k, next: phases[i + 1].k, f: Math.min(1, Math.max(0, (t - phases[i].p) / d)) };
    }
  }
  if (span === undefined) {
    const last = phases[phases.length - 1];
    return { prev: last.k, next: last.k, f: 0 };
  }
  // t 越过最后一帧，朝本周期结束后的第一帧插值（跨周期）
  const last = phases[phases.length - 1];
  const first = phases[0];
  const d = first.p + (span - last.p);
  // 首帧位于周期原点时，周期末 t→span 应收敛到首帧值（f→1）
  const f = first.p === 0 ? (t - last.p) / d : (t - last.p) / d;
  return { prev: last.k, next: first.k, f: Math.min(1, Math.max(0, f)) };
}

export interface SampledLane {
  position?: Vec3;
  orientation?: Orientation;
  gain?: number;
}

/** 静态基线（声轨当前位置/朝向/增益）：非循环首帧之前持住这些值 */
export interface SampleBaseline {
  position?: Vec3;
  orientation?: Orientation;
  gain?: number;
}

/**
 * 按工程相对时间采样整条 lane（未启用或无帧的参数缺省，由调用方回退到声轨基线）。
 * loopPeriod 传入声轨时长时按周期采样（循环播放），任意时刻都有包络；否则线性：
 * 首帧之前返回基线 baseline（默认缺省，由调用方用声轨静态值），末帧之后持住末值。
 */
export function sampleLane(
  lane: AutomationLane,
  time: number,
  loopPeriod?: number,
  baseline?: SampleBaseline,
): SampledLane {
  const out: SampledLane = {};
  if (!lane.enabled) return out;
  const period = loopPeriod !== undefined && loopPeriod > 0 ? loopPeriod : undefined;
  for (const param of ['position', 'orientation', 'gain'] as const) {
    const frames = framesOf(lane, param);
    if (frames.length === 0) continue;
    if (period === undefined && time < frames[0].time) {
      // 首帧前：声轨静态基线（默认缺省，让 UI/引擎继续用 doc 参数）
      if (param === 'position' && baseline?.position) out.position = { ...baseline.position };
      else if (param === 'orientation' && baseline?.orientation) {
        out.orientation = { ...baseline.orientation };
      } else if (param === 'gain' && baseline?.gain !== undefined) {
        out.gain = baseline.gain;
      }
      continue;
    }
    const seg = segmentAt(frames, time, period);
    if (!seg) continue;
    const a = valueOf(seg.prev);
    const b = valueOf(seg.next);
    if (param === 'position') {
      const pa = a as Vec3;
      const pb = b as Vec3;
      out.position = {
        x: lerp(pa.x, pb.x, seg.f),
        y: lerp(pa.y, pb.y, seg.f),
        z: lerp(pa.z, pb.z, seg.f),
      };
    } else if (param === 'orientation') {
      const oa = a as Orientation;
      const ob = b as Orientation;
      out.orientation = {
        yaw: wrapPi(lerpAngle(oa.yaw, ob.yaw, seg.f)),
        pitch: lerp(oa.pitch, ob.pitch, seg.f),
      };
    } else {
      out.gain = lerp(a as number, b as number, seg.f);
    }
  }
  return out;
}

/** 最早关键帧时间（无帧返回 null） */
export function firstFrameTime(lane: AutomationLane): number | null {
  return lane.keyframes.length ? lane.keyframes[0].time : null;
}

/** 最晚关键帧时间（无帧返回 null）；循环轨调度需要 */
export function lastFrameTime(lane: AutomationLane): number | null {
  return lane.keyframes.length ? lane.keyframes[lane.keyframes.length - 1].time : null;
}

export function paramLabel(p: AutomationParam): string {
  return p === 'position' ? '位置' : p === 'orientation' ? '朝向' : '增益';
}

/**
 * 调度事件（由引擎翻译成 AudioParam.setValueAtTime / linearRampToValueAtTime）。
 * 每个分量独立一串；time 为 AudioContext 绝对时间。
 *
 * 注意：PannerNode 的朝向只暴露 orientationX/Y/Z 向量（没有 yaw/pitch AudioParam），
 * 因此朝向不做“角度线性 ramp”，而是把 yaw/pitch 包络按固定步进密集重采样成
 * 前向向量的 setValue 序列——这与 2D/3D/方位读数使用的 forwardVector 完全同源。
 */
export interface ScheduledComponent {
  component: 'x' | 'y' | 'z' | 'oX' | 'oY' | 'oZ' | 'gain';
  time: number;
  value: number;
  kind: 'setValue' | 'linearRamp';
}

export interface AutomationSchedule {
  events: ScheduledComponent[];
}

/** 朝向包络重采样步进（秒） */
export const ORIENTATION_SAMPLE_STEP = 1 / 40;

/**
 * 把关键帧在一个调度窗口 [fromMedia, toMedia] 内展开成 AudioParam 事件。
 * - 位置/增益：窗口起点 setValue 到当前包络值，随后对窗口内关键帧 linearRamp。
 * - 朝向：按 ORIENTATION_SAMPLE_STEP 密集重采样 yaw/pitch，输出前向向量 setValue。
 * - 循环（period 为时长）：跨回绕边界复制首尾帧；位置/增益周期外推，
 *   yaw 在展开锚点时先做最短路径连续化，保证回绕点不跳变；每周期自动重复。
 * - 非循环：首帧之前保持 baseline（声轨静态参数），窗口跨过首帧时 ramp 过去；
 *   末帧之后持住末值。
 * baseAbsTime = 播放起点对应的 AudioContext 时钟；mediaTime 与之线性换算。
 */
export function buildSchedule(spec: {
  lane: AutomationLane;
  fromMedia: number;
  toMedia: number;
  baseAbsTime: number;
  period: number | undefined;
  startOffset: number;
  baseline?: SampleBaseline;
}): AutomationSchedule {
  const { lane, fromMedia, toMedia, baseAbsTime, period, baseline } = spec;
  const events: ScheduledComponent[] = [];
  if (!lane.enabled || toMedia <= fromMedia) return { events };

  const loop = period !== undefined && period > 0;
  const span = loop ? period! : Infinity;
  const toAbs = (media: number) => baseAbsTime + (media - spec.startOffset);

  // 某参数的关键帧（保存顺序已严格递增）
  const framesOfParam = (p: AutomationParam) => lane.keyframes.filter((k) => k.param === p);

  type Key = 'x' | 'y' | 'z' | 'gain';
  const kfVal = (paramName: Extract<AutomationParam, 'position' | 'gain'>, kf: AutomationKeyframe): Record<Key, number> => {
    if (paramName === 'position') {
      const p = kf.position!;
      return { x: p.x, y: p.y, z: p.z, gain: 0 };
    }
    return { x: 0, y: 0, z: 0, gain: kf.gain! };
  };

  // ---- 位置 / 增益：锚点 + 线性 ramp ----
  const rampComponents = (
    paramName: Extract<AutomationParam, 'position' | 'gain'>,
    comps: ScheduledComponent['component'][],
  ) => {
    const frames = framesOfParam(paramName);
    if (frames.length === 0) return;
    interface Anchor {
      media: number;
      v: Record<Key, number>;
    }
    const anchors: Anchor[] = [];
    if (!loop) {
      for (const kf of frames) anchors.push({ media: kf.time, v: kfVal(paramName, kf) });
    } else {
      // 多取一周期保证窗口终点附近的锚点齐全（c*span + 末帧时间 <= toMedia 即可）
      const firstCycle = Math.floor(Math.max(0, fromMedia) / span) - 1;
      const lastCycle = Math.ceil(toMedia / span) + 1;
      for (let c = firstCycle; c <= lastCycle; c++) {
        for (const kf of frames) anchors.push({ media: c * span + kf.time, v: kfVal(paramName, kf) });
      }
      anchors.sort((a, b) => a.media - b.media);
    }

    const startSample = sampleLane(lane, Math.max(0, fromMedia), loop ? span : undefined, baseline);
    let startPos: Record<Key, number> | undefined;
    if (paramName === 'position' && startSample.position) {
      startPos = { ...startSample.position, gain: 0 };
    } else if (paramName === 'gain' && startSample.gain !== undefined) {
      startPos = { x: 0, y: 0, z: 0, gain: startSample.gain };
    }

    for (const comp of comps) {
      const key = comp as Key;
      let startVal = startPos?.[key];
      if (startVal === undefined) {
        // 无基线又未到首帧：不发射任何事件（让参数保持声轨静态值）
        continue;
      }
      events.push({ component: comp, time: toAbs(fromMedia), value: startVal, kind: 'setValue' });
      for (const a of anchors) {
        // 仅排除窗口起点（避免与 setValue 同时刻冲突）；窗口终点保留——
        // 它可能正是循环回绕点，丢掉会导致回绕处没有目标值
        if (a.media < fromMedia - 1e-7 || a.media > toMedia + 1e-7) continue;
        if (Math.abs(a.media - fromMedia) <= 1e-7) continue;
        events.push({ component: comp, time: toAbs(a.media), value: a.v[key], kind: 'linearRamp' });
      }
    }
  };

  rampComponents('position', ['x', 'y', 'z']);
  rampComponents('gain', ['gain']);

  // ---- 朝向：密集重采样 yaw/pitch → 前向向量 setValue ----
  const oriFrames = framesOfParam('orientation');
  if (oriFrames.length > 0) {
    const startSample = sampleLane(lane, Math.max(0, fromMedia), loop ? span : undefined, baseline);
    if (startSample.orientation) {
      const f0 = forwardFromOrientation(startSample.orientation.yaw, startSample.orientation.pitch);
      events.push({ component: 'oX', time: toAbs(fromMedia), value: f0.x, kind: 'setValue' });
      events.push({ component: 'oY', time: toAbs(fromMedia), value: f0.y, kind: 'setValue' });
      events.push({ component: 'oZ', time: toAbs(fromMedia), value: f0.z, kind: 'setValue' });
    }
    // 首帧之前且无基线：不发射朝向事件（保持声轨静态朝向）
    let t = fromMedia + ORIENTATION_SAMPLE_STEP;
    for (; t <= toMedia + 1e-7; t += ORIENTATION_SAMPLE_STEP) {
      const s = sampleLane(lane, t, loop ? span : undefined, baseline).orientation;
      if (!s) continue;
      const f = forwardFromOrientation(s.yaw, s.pitch);
      const at = toAbs(t);
      events.push({ component: 'oX', time: at, value: f.x, kind: 'setValue' });
      events.push({ component: 'oY', time: at, value: f.y, kind: 'setValue' });
      events.push({ component: 'oZ', time: at, value: f.z, kind: 'setValue' });
    }
  }

  events.sort((a, b) =>
    a.component < b.component ? -1 : a.component > b.component ? 1 : a.time - b.time,
  );
  return { events };
}

/**
 * 前向向量：与 spatial.ts 的 forwardVector 同一约定，这里独立实现以保持
 * automation 模块无内部相互依赖之外的耦合（约定：yaw=0 → -Z，yaw+ 右转）。
 */
export function forwardFromOrientation(yaw: number, pitch: number): { x: number; y: number; z: number } {
  return {
    x: Math.sin(yaw) * Math.cos(pitch),
    y: Math.sin(pitch),
    z: -Math.cos(yaw) * Math.cos(pitch),
  };
}

// ---------------- 工程迁移与健壮化（IndexedDB 载入） ----------------

function sanitizeKeyframe(raw: unknown): AutomationKeyframe | null {
  if (!raw || typeof raw !== 'object') return null;
  const k = raw as Record<string, unknown>;
  const param = k.param as AutomationParam;
  if (param !== 'position' && param !== 'orientation' && param !== 'gain') return null;
  if (!isFiniteNumber(k.time) || (k.time as number) < 0 || typeof k.id !== 'string') return null;
  const base = { id: k.id as string, time: k.time as number, param, createdAt: isFiniteNumber(k.createdAt) ? (k.createdAt as number) : 0 };
  if (param === 'position') {
    const p = k.position as Vec3 | undefined;
    if (!p || ![p.x, p.y, p.z].every(isFiniteNumber)) return null;
    return { ...base, position: { x: p.x, y: p.y, z: p.z } };
  }
  if (param === 'orientation') {
    const o = k.orientation as Orientation | undefined;
    if (!o || ![o.yaw, o.pitch].every(isFiniteNumber)) return null;
    return { ...base, orientation: { yaw: o.yaw, pitch: o.pitch } };
  }
  if (!isFiniteNumber(k.gain)) return null;
  return { ...base, gain: k.gain as number };
}

function sanitizeLane(raw: unknown, trackId: string): AutomationLane | null {
  if (!raw || typeof raw !== 'object') return null;
  const l = raw as Record<string, unknown>;
  const kfs = Array.isArray(l.keyframes)
    ? (l.keyframes.map(sanitizeKeyframe).filter((k): k is AutomationKeyframe => !!k))
    : [];
  // 关键帧按 time 排序后去重：载入时若发现逆序/同刻脏数据，保留先出现者、
  // 丢弃造成逆序的帧（这是迁移修复，不是播放期静默重排——拒绝规则只作用于实时提交）。
  const cleaned: AutomationKeyframe[] = [];
  for (const kf of kfs) {
    const clash = cleaned.some((k) => Math.abs(k.time - kf.time) <= 1e-6);
    const lastT = cleaned.length ? cleaned[cleaned.length - 1].time : -Infinity;
    if (!clash && kf.time > lastT) cleaned.push(kf);
  }
  const revisions = Array.isArray(l.revisions)
    ? (l.revisions.filter(
        (r): r is AutomationRevision =>
          !!r &&
          typeof r === 'object' &&
          typeof (r as AutomationRevision).id === 'string' &&
          isFiniteNumber((r as AutomationRevision).revision),
      ) ?? [])
    : [];
  const maxRev = revisions.reduce((m, r) => Math.max(m, r.revision), 0);
  return {
    trackId,
    version: LANE_VERSION,
    enabled: typeof l.enabled === 'boolean' ? l.enabled : true,
    keyframes: cleaned,
    revisions,
    revisionSeq: isFiniteNumber(l.revisionSeq) ? Math.max(l.revisionSeq as number, maxRev) : maxRev,
  };
}

/**
 * 迁移并健壮化任意历史版本的 ProjectDoc：
 *  - v1：补 automation、track.orientation，version 升到 2
 *  - 丢弃孤儿 lane、非法关键帧；绝不抛异常阻断其他轨
 */
export function migrateDoc(raw: unknown): ProjectDoc | null {
  if (!raw || typeof raw !== 'object') return null;
  const d = raw as Record<string, unknown>;
  if (!Array.isArray(d.tracks)) return null;
  const tracks = d.tracks as ProjectDoc['tracks'];
  const autoRaw = (d.automation ?? {}) as Record<string, unknown>;
  const automation: Record<string, AutomationLane> = {};
  const trackIds = new Set(tracks.map((t) => t.id));
  for (const t of tracks) {
    // 补声源朝向（旧工程）
    const o = (t as { orientation?: Orientation }).orientation;
    if (!o || !isFiniteNumber(o.yaw) || !isFiniteNumber(o.pitch)) {
      t.orientation = { yaw: 0, pitch: 0 };
    }
    const lane = sanitizeLane(autoRaw[t.id], t.id);
    if (lane && lane.keyframes.length >= 0) automation[t.id] = lane;
  }
  // 仅保留存在声轨的 lane
  for (const id of Object.keys(autoRaw)) {
    if (trackIds.has(id)) continue;
    delete automation[id];
  }
  return {
    version: 2,
    tracks,
    automation,
    listener: d.listener as ProjectDoc['listener'],
    spatial: d.spatial as ProjectDoc['spatial'],
    busGain: isFiniteNumber(d.busGain) ? (d.busGain as number) : 1,
    masterGain: isFiniteNumber(d.masterGain) ? (d.masterGain as number) : 0.9,
    savedAt: isFiniteNumber(d.savedAt) ? (d.savedAt as number) : 0,
    name: typeof d.name === 'string' ? d.name : undefined,
  };
}
