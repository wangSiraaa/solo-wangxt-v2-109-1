/** 共享类型定义 */

export type DistanceModel = 'exponential' | 'inverse' | 'linear';

export type SourceType = 'file' | 'pulse' | 'tone' | 'duoA' | 'duoB';

export type TrackStatus =
  | 'pending' // 等待音频解锁后解码/生成
  | 'loading'
  | 'ready'
  | 'decode-error';

/**
 * 关键帧承载的参数集合：只保存出现过的字段（稀疏参数轨）。
 * 坐标系与全局约定一致：+X 右、+Y 上、+Z 后；orientation 为声源朝向单位向量。
 */
export interface AutomationParams {
  position?: Vec3;
  orientation?: Vec3;
  /** 轨道线性增益（与推子同一量纲，静音时真实链路由 trackGain=0 接管） */
  gain?: number;
}

/**
 * 单个空间自动化关键帧。
 * - id：稳定标识，编辑（移动时间/改值）保持 id 不变
 * - time：工程相对时间（秒），同一轨内唯一且按时间严格递增
 */
export interface AutomationKeyframe {
  id: string;
  time: number;
  params: AutomationParams;
}

/**
 * 每轨空间自动化轨。
 * - schema：轨结构版本（持久化迁移用）
 * - keyframes：始终按 time 升序、time 唯一；冲突提交在写入前被拒绝，绝不静默重排
 * - revision：内容版本号，每次被接受的编辑 +1，撤销/提交均可审计
 */
export interface AutomationLane {
  schema: 1;
  keyframes: AutomationKeyframe[];
  revision: number;
  updatedAt: number;
}

/** 一条可审计的自动化编辑记录（撤销/重放依据） */
export interface AutomationHistoryEntry {
  id: string;
  trackId: string;
  label: string;
  at: number;
  before: AutomationLane;
  after: AutomationLane;
}

/** 工程级自动化撤销历史（仅记录自动化轨编辑，不记录播放状态） */
export interface AutomationHistory {
  version: 1;
  undo: AutomationHistoryEntry[];
  redo: AutomationHistoryEntry[];
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
  /** 推子线性增益（0..1.5），真实进入音频链；自动化播放时由关键帧接管 */
  gain: number;
  /** 立体声文件选用的输入声道：HRTF 需要单声道输入 */
  channel: number;
  /** 解码后文件的声道数（决定 UI 是否显示 L/R 选择） */
  channels?: number;
  /** UI 颜色 */
  color: string;
  /** 声源世界坐标，单位米，右手系：+X 右，+Y 上，+Z 朝向屏幕（听者后方） */
  position: Vec3;
  /** 每轨空间自动化轨（位置/方向/增益关键帧） */
  automation: AutomationLane;
  status: TrackStatus;
  errorMessage?: string;
  duration?: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
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
  /** 2：新增每轨 automation 与 automationHistory；v1 工程读取时自动迁移 */
  version: 2;
  tracks: Track[];
  listener: ListenerState;
  spatial: SpatialSettings;
  busGain: number;
  masterGain: number;
  savedAt: number;
  name?: string;
  automationHistory: AutomationHistory;
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

/** 供视图渲染使用的“当前时刻”声轨：播放时叠加自动化采样位置/方向 */
export interface DisplayTrack extends Track {
  /** 自动化在当前播放头处采样得到的朝向（关键帧含方向时） */
  effectiveOrientation?: Vec3;
}
