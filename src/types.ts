/** 共享类型定义 */

export type DistanceModel = 'exponential' | 'inverse' | 'linear';

export type SourceType = 'file' | 'pulse' | 'tone' | 'duoA' | 'duoB';

export type TrackStatus =
  | 'pending' // 等待音频解锁后解码/生成
  | 'loading'
  | 'ready'
  | 'decode-error';

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

/**
 * 声源朝向（PannerNode 的 orientation 语义）。
 * 与听者朝向共用同一套约定：yaw=0 朝 -Z，yaw 正值向右转身；pitch 正值抬头。
 * PannerNode 实际写入 forwardVector(yaw,pitch)，与 2D/3D 视图、方位读数同源。
 */
export interface Orientation {
  yaw: number;
  pitch: number;
}

/** 可被自动化的已存在声轨参数 */
export type AutomationParam = 'position' | 'orientation' | 'gain';

/**
 * 单个关键帧。
 * - time 为**工程相对时间**（秒），不是墙上时钟，也不是 AudioContext 时间。
 * - id 稳定，创建后不变；关键帧在轨内按 time 严格递增保存，绝不静默重排。
 * - 三种参数各自独立：param 指明本帧携带哪一个值。
 */
export interface AutomationKeyframe {
  id: string;
  time: number;
  param: AutomationParam;
  position?: Vec3;
  orientation?: Orientation;
  gain?: number;
  createdAt: number;
}

export type AutomationAction = 'commit' | 'undo' | 'clear' | 'import';

/**
 * 自动化版本记录：每次提交/清空/撤销都产生一条不可变审计记录，
 * keyframes 保存该版本生效后的完整关键帧快照；pre 保存提交前快照（用于撤销）。
 */
export interface AutomationRevision {
  id: string;
  /** 轨内单调递增版本号 */
  revision: number;
  at: number;
  action: AutomationAction;
  summary: string;
  /** 该版本生效后的关键帧快照（插入顺序） */
  keyframes: AutomationKeyframe[];
  /** commit/clear 时的提交前快照，供撤销恢复 */
  pre?: AutomationKeyframe[];
  /** action === 'undo' 时，指向被撤销的版本 id */
  reverts?: string;
}

/**
 * 每轨一条空间自动化轨（lane）。
 * version 为 lane 数据结构版本；keyframes 按 time 严格递增，
 * 同时间冲突 / 逆序移动一律拒绝，原数组原样保留。
 */
export interface AutomationLane {
  trackId: string;
  version: 1;
  enabled: boolean;
  keyframes: AutomationKeyframe[];
  revisions: AutomationRevision[];
  revisionSeq: number;
}

export interface Track {
  id: string;
  name: string;
  sourceType: SourceType;
  /** file 类型时为 IDB 中的 Blob 键；内置样例重新生成，不需要持久化音频 */
  blobKey?: string;
  originalFileName?: string;
  loop: boolean;
  muted: boolean;
  solo: boolean;
  /** 推子线性增益（0..1.5），真实进入音频链 */
  gain: number;
  /** 立体声文件选用的输入声道：HRTF 需要单声道输入 */
  channel: number;
  /** 解码后文件的声道数（决定 UI 是否显示 L/R 选择） */
  channels?: number;
  /** UI 颜色 */
  color: string;
  /** 声源世界坐标，单位米，右手系：+X 右，+Y 上，+Z 朝向屏幕（听者后方） */
  position: Vec3;
  /** 声源朝向（静态基线；自动化播放时由关键帧曲线接管） */
  orientation: Orientation;
  status: TrackStatus;
  errorMessage?: string;
  duration?: number;
}

export interface ListenerState {
  position: Vec3;
  /** 偏航角（弧度），绕世界 +Y 轴；yaw=0 时朝向 -Z（屏幕内） */
  yaw: number;
  /** 俯仰角（弧度），绕本地右向量，正为向上看 */
  pitch: number;
  /** 听者耳高基准（暂以 position.y 为准，保留字段） */
  earHeight: number;
}

export interface SpatialSettings {
  distanceModel: DistanceModel;
  refDistance: number;
  rolloffFactor: number;
  maxDistance: number;
  /** PannerNode 内部平滑时间（秒），移动时不中断音频 */
  positionTimeConstant: number;
  /** HRTF 内部分辨率（部分浏览器不支持读取/设置则忽略） */
  hrtfIR: 'none';
}

export interface ProjectDoc {
  /** 2：含每轨自动化轨 automation 与 track.orientation；1 为旧工程，载入时迁移 */
  version: 2;
  tracks: Track[];
  /** 以 trackId 为键的自动化轨；声轨删除时连同删除 */
  automation: Record<string, AutomationLane>;
  listener: ListenerState;
  spatial: SpatialSettings;
  busGain: number;
  masterGain: number;
  savedAt: number;
  name?: string;
}

export interface NamedProject {
  id: string;
  name: string;
  savedAt: number;
  doc: ProjectDoc;
}

export interface LevelState {
  /** 线性峰值 0..1+ */
  l: number;
  r: number;
  /** 锁存的削波标记（任意采样 >= 1.0） */
  clipL: boolean;
  clipR: boolean;
}

export type UnlockState = 'locked' | 'unlocking' | 'unlocked' | 'failed';

export interface ProgressInfo {
  trackId: string;
  current: number;
  duration: number;
}

/**
 * 引擎每帧上报的“实际声像”读数（播放自动化时）。
 * UI（2D/3D/方位/增益）与 PannerNode 调度共用这一份值，保证语义一致。
 */
export interface LiveTransform {
  /** 当前播放媒体时间（秒，循环时为回绕后时间） */
  mediaTime: number;
  position?: Vec3;
  orientation?: Orientation;
  gain?: number;
}
