import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  AutomationLane,
  AutomationParam,
  LevelState,
  ListenerState,
  LiveTransform,
  NamedProject,
  Orientation,
  ProjectDoc,
  SourceType,
  SpatialSettings,
  Track,
  UnlockState,
  Vec3,
} from '../types';
import { engine } from '../lib/engineInstance';
import { DecodeError } from '../lib/audioEngine';
import * as idb from '../lib/idb';
import { SAMPLE_LABELS } from '../lib/samples';
import {
  AutomationError,
  commitKeyframe,
  deleteKeyframe as laneDeleteKeyframe,
  emptyLane,
  laneFor,
  migrateDoc,
  moveKeyframe as laneMoveKeyframe,
  sampleLane,
  setEnabled as laneSetEnabled,
  clearKeyframes as laneClearKeyframes,
  undoLast as laneUndoLast,
  updateKeyframeValue as laneUpdateKeyframeValue,
} from '../lib/automation';

const COLORS = ['#e8734a', '#4ecdc4', '#ffe066', '#a78bfa', '#f472b6', '#34d399', '#60a5fa'];

const DEFAULT_SPATIAL: SpatialSettings = {
  distanceModel: 'inverse',
  refDistance: 1,
  rolloffFactor: 1,
  maxDistance: 30,
  positionTimeConstant: 0.06,
  hrtfIR: 'none',
};

const DEFAULT_LISTENER: ListenerState = {
  position: { x: 0, y: 0, z: 3 },
  yaw: 0,
  pitch: 0,
  earHeight: 0,
};

let counter = 0;
function uid(prefix: string): string {
  counter += 1;
  return `${prefix}-${Date.now().toString(36)}-${counter}`;
}

function sampleTrack(type: Exclude<SourceType, 'file'>, index: number): Track {
  const presets: Record<Exclude<SourceType, 'file'>, Partial<Track> & { position: Track['position'] }> = {
    pulse: { position: { x: -3, y: 0, z: 0 }, loop: true },
    tone: { position: { x: 3, y: 0, z: 0 }, loop: true },
    duoA: { position: { x: -2, y: 0, z: 0 }, loop: true },
    duoB: { position: { x: 2, y: 0, z: 0 }, loop: true },
  };
  const p = presets[type];
  return {
    id: uid('trk'),
    name: SAMPLE_LABELS[type],
    sourceType: type,
    loop: p.loop ?? true,
    muted: false,
    solo: false,
    gain: 0.9,
    channel: 0,
    color: COLORS[index % COLORS.length],
    position: { ...p.position },
    orientation: { yaw: 0, pitch: 0 },
    status: 'pending',
  };
}

function emptyDoc(): ProjectDoc {
  return {
    version: 2,
    tracks: [],
    automation: {},
    listener: { ...DEFAULT_LISTENER, position: { ...DEFAULT_LISTENER.position } },
    spatial: { ...DEFAULT_SPATIAL },
    busGain: 1,
    masterGain: 0.9,
    savedAt: 0,
  };
}

export interface AutomationFrameInput {
  time: number;
  param: AutomationParam;
  position?: Vec3;
  orientation?: Orientation;
  gain?: number;
}

/** 播放中人工拖拽产生的临时覆盖（仅对正在播放的声轨存在） */
export interface OverrideState {
  trackId: string;
  params: AutomationParam[];
}

export interface WorkbenchApi {
  doc: ProjectDoc;
  unlock: UnlockState;
  unlockError: string | null;
  playingIds: Set<string>;
  levels: LevelState;
  selectedId: string | null;
  projects: NamedProject[];
  loadedProjectId: string | null;
  loadedProjectName: string | null;
  saveState: 'idle' | 'saving' | 'saved';
  globalError: string | null;
  /** 播放中实际声像（2D/3D/方位/增益读数共用），无播放声轨时为 null */
  live: Map<string, LiveTransform> | null;
  /** 正在临时覆盖自动化的声轨及其参数 */
  overrides: Map<string, OverrideState>;
  selectTrack: (id: string | null) => void;
  unlockAudio: () => Promise<void>;
  addSample: (type: Exclude<SourceType, 'file'>) => Promise<void>;
  addFiles: (files: FileList | File[]) => Promise<void>;
  removeTrack: (id: string) => Promise<void>;
  updateTrack: (id: string, patch: Partial<Track>) => void;
  moveTrack: (id: string, position: Track['position']) => void;
  setOrientation: (id: string, orientation: Orientation) => void;
  setListener: (
    patch:
      | Partial<Omit<ListenerState, 'position'>>
      | { position: Partial<ListenerState['position']> },
  ) => void;
  setSpatial: (patch: Partial<SpatialSettings>) => void;
  setBusGain: (v: number) => void;
  setMasterGain: (v: number) => void;
  play: (id: string) => Promise<void>;
  pause: (id: string) => void;
  stop: (id: string) => void;
  seek: (id: string, offsetSec: number) => Promise<void>;
  togglePlay: (id: string) => Promise<void>;
  playAll: () => Promise<void>;
  stopAll: () => void;
  clearClips: () => void;
  saveProjectAs: (name: string) => Promise<void>;
  loadProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  newProject: () => Promise<void>;
  dismissGlobalError: () => void;
  // ---- 每轨空间自动化 ----
  lane: (trackId: string) => AutomationLane;
  commitFrame: (trackId: string, frame: AutomationFrameInput) => { ok: boolean; error?: string };
  deleteFrame: (trackId: string, keyframeId: string) => { ok: boolean; error?: string };
  moveFrame: (trackId: string, keyframeId: string, time: number) => { ok: boolean; error?: string };
  updateFrameValue: (
    trackId: string,
    keyframeId: string,
    value: { position?: Vec3; orientation?: Orientation; gain?: number },
  ) => { ok: boolean; error?: string };
  setLaneEnabled: (trackId: string, enabled: boolean) => void;
  clearFrames: (trackId: string) => { ok: boolean; error?: string };
  undoAutomation: (trackId: string) => { ok: boolean; error?: string };
  /** 采样某轨在工程时间 time 的计划值（Inspector/覆盖回弹共用） */
  plannedAt: (track: Track, time: number) => { position: Vec3; orientation: Orientation; gain: number };
  // ---- 播放中人工覆盖 ----
  armOverride: (trackId: string, param: AutomationParam, value: Vec3 | Orientation | number) => void;
  updateOverrideValue: (
    trackId: string,
    param: AutomationParam,
    value: Vec3 | Orientation | number,
  ) => void;
  cancelOverride: (trackId: string, param: AutomationParam) => void;
  commitOverride: (trackId: string, param: AutomationParam) => { ok: boolean; error?: string };
  cancelAllOverrides: (trackId: string) => void;
}

export function useWorkbench(): WorkbenchApi {
  const [doc, setDoc] = useState<ProjectDoc>(emptyDoc);
  const [unlock, setUnlock] = useState<UnlockState>('locked');
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [playingIds, setPlayingIds] = useState<Set<string>>(new Set());
  const [levels, setLevels] = useState<LevelState>({ l: 0, r: 0, clipL: false, clipR: false });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [projects, setProjects] = useState<NamedProject[]>([]);
  const [loadedProjectId, setLoadedProjectId] = useState<string | null>(null);
  const [loadedProjectName, setLoadedProjectName] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [live, setLive] = useState<Map<string, LiveTransform> | null>(null);
  const [overrideMap, setOverrideMap] = useState<Map<string, OverrideState>>(new Map());

  const docRef = useRef(doc);
  docRef.current = doc;
  const overrideRef = useRef(overrideMap);
  overrideRef.current = overrideMap;
  const initDone = useRef(false);

  // ---------- 初始化：恢复会话与工程列表，绝不自动播放 ----------
  useEffect(() => {
    // React StrictMode 会双重挂载；用标志保证只加载一次，cancelled 只阻止写状态
    if (initDone.current) return;
    initDone.current = true;
    let cancelled = false;
    (async () => {
      try {
        const [session, list] = await Promise.all([idb.loadSession(), idb.listProjects()]);
        if (cancelled) return;
        if (list) setProjects(list);
        if (session) {
          // v1→v2 迁移：补自动化轨/声源朝向；脏数据在 migrateDoc 内被健壮化。
          // 恢复全部参数，但播放状态一律归零（不擅自自动播放）。
          // 文件轨标记 pending，待音频解锁后重新注入 Blob 解码。
          const migrated = migrateDoc(session);
          if (migrated) {
            setDoc({
              ...migrated,
              tracks: migrated.tracks.map((t) => ({
                ...t,
                status: 'pending',
                errorMessage: undefined,
              })),
            });
          }
        }
      } catch (err) {
        if (!cancelled) {
          setGlobalError(`读取本地工程失败：${err instanceof Error ? err.message : String(err)}`);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // ---------- 引擎事件订阅 ----------
  useEffect(() => engine.onUnlock(setUnlock), []);
  useEffect(() => engine.onLevels(setLevels), []);
  useEffect(() => engine.onLive(setLive), []);

  useEffect(() => {
    return engine.onEnded((trackId) => {
      // 自然结束：临时覆盖随播放结束作废（参数所有权回归静态值）
      engine.clearAllOverrides(trackId);
      setOverrideMap((prev) => {
        if (!prev.has(trackId)) return prev;
        const next = new Map(prev);
        next.delete(trackId);
        return next;
      });
      setPlayingIds((prev) => {
        if (!prev.has(trackId)) return prev;
        const next = new Set(prev);
        next.delete(trackId);
        return next;
      });
    });
  }, []);

  // ---------- 全局参数同步到音频链 ----------
  useEffect(() => {
    engine.setSpatialSettings(doc.spatial);
  }, [doc.spatial]);

  useEffect(() => {
    engine.setListener(doc.listener);
  }, [doc.listener]);

  useEffect(() => {
    engine.setBusGain(doc.busGain);
  }, [doc.busGain]);

  useEffect(() => {
    engine.setMasterGain(doc.masterGain);
  }, [doc.masterGain]);

  // 声轨任意参数（位置/增益/静音/独奏/loop）实时同步到音频链：
  // syncTracks 只更新 AudioParam 与路由，不重建 source，移动不会重启音轨
  useEffect(() => {
    engine.syncTracks(doc.tracks);
  }, [doc.tracks]);

  // 自动化轨同步到引擎（仅替换引用；调度在 AudioContext 时钟上做）
  useEffect(() => {
    engine.setAutomationLanes(doc.automation);
  }, [doc.automation]);

  // ---------- 解锁后：同步全部声轨（解码/合成 + 参数），但不播放 ----------
  useEffect(() => {
    if (unlock !== 'unlocked') return;
    let cancelled = false;
    (async () => {
      // 先把当前全局参数推入音频图（恢复工程后这些 effect 不会因解锁而重跑）
      engine.setSpatialSettings(docRef.current.spatial);
      engine.setListener(docRef.current.listener);
      engine.setBusGain(docRef.current.busGain);
      engine.setMasterGain(docRef.current.masterGain);

      // 注入文件 Blob（逐个容错：单个 Blob 读取失败不阻断其他轨）
      for (const t of docRef.current.tracks) {
        if (cancelled) return;
        if (t.sourceType === 'file' && t.blobKey && t.status !== 'ready') {
          try {
            const blob = await idb.getBlob(t.blobKey);
            if (blob) engine.setFileBlob(t.id, blob);
            else if (!cancelled) {
              patchTrack(t.id, { status: 'decode-error', errorMessage: '本地音频 Blob 缺失' });
            }
          } catch {
            if (!cancelled) {
              patchTrack(t.id, { status: 'decode-error', errorMessage: '读取本地音频失败' });
            }
          }
        }
      }
      for (const t of docRef.current.tracks) {
        if (cancelled) return;
        try {
          await engine.ensureTrack(t);
          if (cancelled) return;
          // 解码期间声轨可能已被删除
          if (!docRef.current.tracks.some((x) => x.id === t.id)) {
            engine.removeTrack(t.id);
            continue;
          }
          const dur = engine.getDuration(t.id);
          const ch = engine.getChannelCount(t.id);
          patchTrack(t.id, {
            status: 'ready',
            errorMessage: undefined,
            duration: dur ?? t.duration,
            channels: ch ?? t.channels,
          });
        } catch (err) {
          if (cancelled) return;
          if (err instanceof DecodeError) {
            patchTrack(t.id, { status: 'decode-error', errorMessage: err.message });
          } else {
            // 其他合成失败也只标记该轨，绝不阻断其他轨
            patchTrack(t.id, {
              status: 'decode-error',
              errorMessage: err instanceof Error ? err.message : String(err),
            });
          }
        }
      }
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlock]);

  // ---------- 自动保存会话（参数，不保存播放状态），防抖 ----------
  const saveTimer = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!initDone.current) return;
    setSaveState('saving');
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(async () => {
      const snapshot: ProjectDoc = {
        ...docRef.current,
        savedAt: Date.now(),
      };
      try {
        await idb.saveSession(snapshot);
        setSaveState('saved');
        window.setTimeout(() => setSaveState('idle'), 1200);
      } catch {
        setSaveState('idle');
      }
    }, 500);
    return () => window.clearTimeout(saveTimer.current);
  }, [doc]);

  function patchTrack(id: string, patch: Partial<Track>) {
    setDoc((d) => ({
      ...d,
      tracks: d.tracks.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    }));
  }

  function addOverrideParam(trackId: string, param: AutomationParam) {
    setOverrideMap((prev) => {
      const cur = prev.get(trackId);
      if (cur?.params.includes(param)) return prev;
      const next = new Map(prev);
      next.set(trackId, {
        trackId,
        params: cur ? [...cur.params, param] : [param],
      });
      return next;
    });
  }

  function removeOverrideParamState(trackId: string, param: AutomationParam) {
    setOverrideMap((prev) => {
      const cur = prev.get(trackId);
      if (!cur) return prev;
      const params = cur.params.filter((p) => p !== param);
      const next = new Map(prev);
      if (params.length === 0) next.delete(trackId);
      else next.set(trackId, { trackId, params });
      return next;
    });
  }

  /** 暂停/停止/seek/切歌后：覆盖全部作废（参数所有权回归工程数据） */
  function resetOverridesForTransport(trackId: string) {
    engine.clearAllOverrides(trackId);
    setOverrideMap((prev) => {
      if (!prev.has(trackId)) return prev;
      const next = new Map(prev);
      next.delete(trackId);
      return next;
    });
  }

  const selectTrack = useCallback((id: string | null) => setSelectedId(id), []);

  const unlockAudio = useCallback(async () => {
    setUnlockError(null);
    try {
      await engine.resume();
    } catch (err) {
      setUnlockError(err instanceof Error ? err.message : String(err));
    }
  }, []);

  const addSample = useCallback(async (type: Exclude<SourceType, 'file'>) => {
    if (engine.unlock !== 'unlocked') {
      // 解锁失败时不继续；用户在遮罩上能看到明确错误
      await unlockAudio();
      if ((engine.unlock as UnlockState) !== 'unlocked') return;
    }
    const track = sampleTrack(type, docRef.current.tracks.length);
    setDoc((d) => ({ ...d, tracks: [...d.tracks, track] }));
    if (engine.unlock === 'unlocked') {
      try {
        await engine.ensureTrack(track);
        const dur = engine.getDuration(track.id);
        const ch = engine.getChannelCount(track.id);
        patchTrack(track.id, {
          status: 'ready',
          duration: dur ?? undefined,
          channels: ch ?? undefined,
        });
      } catch {
        patchTrack(track.id, { status: 'decode-error', errorMessage: '样例合成失败' });
      }
    }
    setSelectedId(track.id);
  }, [unlock, unlockAudio]);

  const addFiles = useCallback(
    async (files: FileList | File[]) => {
      const arr = [...files];
      if (arr.length === 0) return;
      if (engine.unlock !== 'unlocked') {
        await unlockAudio();
        if ((engine.unlock as UnlockState) !== 'unlocked') return;
      }
      for (let i = 0; i < arr.length; i++) {
        const file = arr[i];
        const blobKey = uid('blob');
        const idx = docRef.current.tracks.length + i;
        const track: Track = {
          id: uid('trk'),
          name: file.name,
          sourceType: 'file',
          blobKey,
          originalFileName: file.name,
          loop: false,
          muted: false,
          solo: false,
          gain: 0.9,
          channel: 0,
          color: COLORS[idx % COLORS.length],
          position: {
            x: Math.cos((idx * 2 * Math.PI) / Math.max(arr.length, 1)) * 2.5,
            y: 0,
            z: Math.sin((idx * 2 * Math.PI) / Math.max(arr.length, 1)) * 2.5,
          },
          orientation: { yaw: 0, pitch: 0 },
          status: engine.unlock === 'unlocked' ? 'loading' : 'pending',
        };
        setDoc((d) => ({ ...d, tracks: [...d.tracks, track] }));
        try {
          await idb.putBlob(blobKey, file);
        } catch {
          patchTrack(track.id, {
            status: 'decode-error',
            errorMessage: '音频写入本地 IndexedDB 失败（浏览器存储可能已满）',
          });
          continue;
        }
        if (engine.unlock !== 'unlocked') continue;
        engine.setFileBlob(track.id, file);
        try {
          // 用户可能在解码期间删除了该声轨
          if (!docRef.current.tracks.some((x) => x.id === track.id)) continue;
          await engine.ensureTrack(track);
          if (!docRef.current.tracks.some((x) => x.id === track.id)) {
            engine.removeTrack(track.id);
            continue;
          }
          const dur = engine.getDuration(track.id);
          const ch = engine.getChannelCount(track.id);
          patchTrack(track.id, {
            status: 'ready',
            duration: dur ?? undefined,
            channels: ch ?? undefined,
          });
        } catch (err) {
          if (!docRef.current.tracks.some((x) => x.id === track.id)) continue;
          if (err instanceof DecodeError) {
            patchTrack(track.id, { status: 'decode-error', errorMessage: err.message });
          } else {
            patchTrack(track.id, {
              status: 'decode-error',
              errorMessage: err instanceof Error ? err.message : String(err),
            });
          }
        }
      }
    },
    [unlock, unlockAudio],
  );

  const removeTrack = useCallback(async (id: string) => {
    const t = docRef.current.tracks.find((x) => x.id === id);
    engine.removeTrack(id);
    if (t?.blobKey) {
      try {
        await idb.deleteBlob(t.blobKey);
      } catch {
        /* 忽略清理失败 */
      }
    }
    engine.clearAllOverrides(id);
    setPlayingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setOverrideMap((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
    setDoc((d) => {
      if (!d.automation[id]) return { ...d, tracks: d.tracks.filter((x) => x.id !== id) };
      const automation = { ...d.automation };
      delete automation[id];
      return { ...d, tracks: d.tracks.filter((x) => x.id !== id), automation };
    });
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  const updateTrack = useCallback(
    (id: string, patch: Partial<Track>) => {
      const prev = docRef.current.tracks.find((x) => x.id === id);
      patchTrack(id, patch);
      // 播放中拖增益推子 = 对 gain 的显式临时覆盖（不篡改自动化曲线）
      if (
        prev &&
        patch.gain !== undefined &&
        patch.gain !== prev.gain &&
        engine.isPlaying(id) &&
        !engine.hasOverride(id, 'gain') &&
        laneFor(docRef.current, id).enabled &&
        laneFor(docRef.current, id).keyframes.some((k) => k.param === 'gain')
      ) {
        engine.beginOverride(id, 'gain', patch.gain);
        addOverrideParam(id, 'gain');
      }
      // 切换所选输入声道需要重建输入图（splitter 接线改变）
      if (
        prev &&
        patch.channel !== undefined &&
        patch.channel !== prev.channel &&
        engine.unlock === 'unlocked'
      ) {
        const merged: Track = { ...prev, ...patch };
        void engine.rebuildVoiceGraph(merged).catch((err) => {
          if (err instanceof DecodeError) {
            patchTrack(id, { status: 'decode-error', errorMessage: err.message });
          }
        });
      }
    },
    [],
  );

  const moveTrack = useCallback((id: string, position: Track['position']) => {
    // 播放中拖拽：若该轨有位置自动化，进入临时覆盖；否则只是普通静态移动
    if (
      engine.isPlaying(id) &&
      !engine.hasOverride(id, 'position') &&
      laneFor(docRef.current, id).enabled &&
      laneFor(docRef.current, id).keyframes.some((k) => k.param === 'position')
    ) {
      engine.beginOverride(id, 'position', position);
      addOverrideParam(id, 'position');
    } else if (engine.hasOverride(id, 'position')) {
      engine.updateOverride(id, 'position', position);
    }
    setDoc((d) => ({
      ...d,
      tracks: d.tracks.map((t) => (t.id === id ? { ...t, position: { ...position } } : t)),
    }));
  }, []);

  const setOrientation = useCallback((id: string, orientation: Orientation) => {
    if (
      engine.isPlaying(id) &&
      !engine.hasOverride(id, 'orientation') &&
      laneFor(docRef.current, id).enabled &&
      laneFor(docRef.current, id).keyframes.some((k) => k.param === 'orientation')
    ) {
      engine.beginOverride(id, 'orientation', orientation);
      addOverrideParam(id, 'orientation');
    } else if (engine.hasOverride(id, 'orientation')) {
      engine.updateOverride(id, 'orientation', orientation);
    }
    setDoc((d) => ({
      ...d,
      tracks: d.tracks.map((t) => (t.id === id ? { ...t, orientation: { ...orientation } } : t)),
    }));
  }, []);

  const setListener = useCallback(
    (patch: Partial<ListenerState> | { position: Partial<ListenerState['position']> }) => {
      setDoc((d) => {
        if ('position' in patch) {
          return {
            ...d,
            listener: {
              ...d.listener,
              position: { ...d.listener.position, ...(patch as { position: Partial<ListenerState['position']> }).position },
            },
          };
        }
        return { ...d, listener: { ...d.listener, ...(patch as Partial<ListenerState>) } };
      });
    },
    [],
  );

  const setSpatial = useCallback((patch: Partial<SpatialSettings>) => {
    setDoc((d) => ({ ...d, spatial: { ...d.spatial, ...patch } }));
  }, []);

  const setBusGain = useCallback((v: number) => {
    setDoc((d) => ({ ...d, busGain: v }));
  }, []);

  const setMasterGain = useCallback((v: number) => {
    setDoc((d) => ({ ...d, masterGain: v }));
  }, []);

  // ---------- 传输 ----------
  const play = useCallback(
    async (id: string) => {
      if (engine.unlock !== 'unlocked') await unlockAudio();
      const t = docRef.current.tracks.find((x) => x.id === id);
      if (!t || t.status === 'decode-error') return;
      try {
        await engine.playTrack(t);
        setPlayingIds((prev) => {
          const next = new Set(prev);
          next.add(id);
          return next;
        });
      } catch (err) {
        if (err instanceof DecodeError) {
          patchTrack(id, { status: 'decode-error', errorMessage: err.message });
        } else {
          setGlobalError(err instanceof Error ? err.message : String(err));
        }
      }
    },
    [unlockAudio],
  );

  const pause = useCallback((id: string) => {
    const t = docRef.current.tracks.find((x) => x.id === id);
    if (!t) return;
    resetOverridesForTransport(id);
    engine.pauseTrack(t);
    setPlayingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const stop = useCallback((id: string) => {
    const t = docRef.current.tracks.find((x) => x.id === id);
    if (!t) return;
    resetOverridesForTransport(id);
    engine.stopTrack(t);
    setPlayingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const seek = useCallback(
    async (id: string, offsetSec: number) => {
      const t = docRef.current.tracks.find((x) => x.id === id);
      if (!t) return;
      // seek 会重建 source：所有临时覆盖作废，旧节点的自动化调度随节点销毁
      resetOverridesForTransport(id);
      const wasPlaying = engine.isPlaying(id);
      await engine.seekTrack(t, offsetSec, wasPlaying);
      setPlayingIds((prev) => {
        const next = new Set(prev);
        if (wasPlaying) next.add(id);
        else next.delete(id);
        return next;
      });
    },
    [],
  );

  const togglePlay = useCallback(
    async (id: string) => {
      if (engine.isPlaying(id)) pause(id);
      else await play(id);
    },
    [pause, play],
  );

  const playAll = useCallback(async () => {
    if (engine.unlock !== 'unlocked') await unlockAudio();
    for (const t of docRef.current.tracks) {
      if (t.status === 'decode-error') continue;
      try {
        await engine.playTrack(t);
        setPlayingIds((prev) => new Set(prev).add(t.id));
      } catch (err) {
        if (err instanceof DecodeError) {
          patchTrack(t.id, { status: 'decode-error', errorMessage: err.message });
        }
      }
    }
  }, [unlockAudio]);

  const stopAll = useCallback(() => {
    for (const t of docRef.current.tracks) engine.stopTrack(t);
    engine.clearAllOverrides();
    setPlayingIds(new Set());
    setOverrideMap(new Map());
  }, []);

  const clearClips = useCallback(() => {
    engine.clearClipLatch();
    setLevels((l) => ({ ...l, clipL: false, clipR: false }));
  }, []);

  // ---------- 具名工程 ----------
  const refreshProjects = useCallback(async () => {
    setProjects(await idb.listProjects());
  }, []);

  const saveProjectAs = useCallback(
    async (name: string) => {
      const id = loadedProjectId ?? uid('proj');
      const named: NamedProject = {
        id,
        name: name.trim() || `工程 ${new Date().toLocaleString()}`,
        savedAt: Date.now(),
        doc: { ...docRef.current, savedAt: Date.now() },
      };
      await idb.saveProject(named);
      setLoadedProjectId(id);
      setLoadedProjectName(named.name);
      await refreshProjects();
    },
    [loadedProjectId, refreshProjects],
  );

  const loadProject = useCallback(
    async (id: string) => {
      const p = await idb.getProject(id);
      if (!p) return;
      // 先拆除当前声轨节点
      for (const t of docRef.current.tracks) engine.removeTrack(t.id);
      engine.clearAllOverrides();
      setPlayingIds(new Set());
      setOverrideMap(new Map());
      // v1 工程迁移与健壮化（自动化/朝向）；失败的单轨不阻断整份载入
      const restored = migrateDoc(p.doc);
      if (!restored) {
        setGlobalError('工程文件已损坏，无法载入');
        return;
      }
      const doc: ProjectDoc = {
        ...restored,
        tracks: restored.tracks.map((t) => ({ ...t, status: 'pending' as const })),
      };
      setDoc(doc);
      setLoadedProjectId(p.id);
      setLoadedProjectName(p.name);
      setSelectedId(null);
      // 若已解锁，走一遍解锁同步逻辑（手动触发：状态不变，effect 不会重跑）
      if (engine.unlock === 'unlocked') {
        for (const t of doc.tracks) {
          if (t.sourceType === 'file' && t.blobKey) {
            try {
              const blob = await idb.getBlob(t.blobKey);
              if (blob) engine.setFileBlob(t.id, blob);
              else patchTrack(t.id, { status: 'decode-error', errorMessage: '本地音频 Blob 缺失' });
            } catch {
              patchTrack(t.id, { status: 'decode-error', errorMessage: '读取本地音频失败' });
            }
          }
          try {
            await engine.ensureTrack(t);
            patchTrack(t.id, {
              status: 'ready',
              duration: engine.getDuration(t.id) ?? t.duration,
              channels: engine.getChannelCount(t.id) ?? t.channels,
              errorMessage: undefined,
            });
          } catch (err) {
            // 单条失败（未解码/解码失败）只标记该轨，绝不阻断其他轨
            if (err instanceof DecodeError) {
              patchTrack(t.id, { status: 'decode-error', errorMessage: err.message });
            }
          }
        }
      }
    },
    [],
  );

  const deleteProject = useCallback(
    async (id: string) => {
      await idb.deleteProject(id);
      if (loadedProjectId === id) {
        setLoadedProjectId(null);
        setLoadedProjectName(null);
      }
      await refreshProjects();
    },
    [loadedProjectId, refreshProjects],
  );

  const newProject = useCallback(async () => {
    for (const t of docRef.current.tracks) engine.removeTrack(t.id);
    engine.clearAllOverrides();
    setPlayingIds(new Set());
    setOverrideMap(new Map());
    setDoc(emptyDoc());
    setLoadedProjectId(null);
    setLoadedProjectName(null);
    setSelectedId(null);
  }, []);

  const dismissGlobalError = useCallback(() => setGlobalError(null), []);

  // ---------- 每轨自动化 ----------

  const lane = useCallback((trackId: string) => laneFor(docRef.current, trackId), []);

  /** 纯函数式变更：在当前 lane 上执行 mutation，原子地写回 doc；冲突返回错误且原轨不动 */
  function mutateLane(
    trackId: string,
    fn: (l: AutomationLane) => { lane: AutomationLane },
  ): { ok: boolean; error?: string } {
    let result: { ok: boolean; error?: string } = { ok: true };
    setDoc((d) => {
      const current = d.automation[trackId] ?? emptyLane(trackId);
      try {
        const { lane: next } = fn(current);
        const automation = { ...d.automation, [trackId]: next };
        return { ...d, automation };
      } catch (err) {
        result = {
          ok: false,
          error: err instanceof AutomationError ? err.message : String(err),
        };
        return d; // 拒绝时原轨原样保留
      }
    });
    return result;
  }

  const commitFrame = useCallback((trackId: string, frame: AutomationFrameInput) => {
    return mutateLane(trackId, (l) => commitKeyframe(l, frame));
  }, []);

  const deleteFrame = useCallback((trackId: string, keyframeId: string) => {
    return mutateLane(trackId, (l) => laneDeleteKeyframe(l, keyframeId));
  }, []);

  const moveFrame = useCallback((trackId: string, keyframeId: string, time: number) => {
    return mutateLane(trackId, (l) => laneMoveKeyframe(l, keyframeId, time));
  }, []);

  const updateFrameValue = useCallback(
    (
      trackId: string,
      keyframeId: string,
      value: { position?: Vec3; orientation?: Orientation; gain?: number },
    ) => {
      return mutateLane(trackId, (l) => laneUpdateKeyframeValue(l, keyframeId, value));
    },
    [],
  );

  const setLaneEnabled = useCallback((trackId: string, enabled: boolean) => {
    setDoc((d) => {
      const current = d.automation[trackId] ?? emptyLane(trackId);
      const next = laneSetEnabled(current, enabled);
      if (next === current) return d;
      return { ...d, automation: { ...d.automation, [trackId]: next } };
    });
  }, []);

  const clearFrames = useCallback((trackId: string) => {
    return mutateLane(trackId, (l) => laneClearKeyframes(l));
  }, []);

  const undoAutomation = useCallback((trackId: string) => {
    return mutateLane(trackId, (l) => laneUndoLast(l));
  }, []);

  const plannedAt = useCallback((track: Track, time: number) => {
    const l = laneFor(docRef.current, track.id);
    const s = sampleLane(l, time, track.loop ? track.duration : undefined);
    return {
      position: s.position ?? track.position,
      orientation: s.orientation ?? track.orientation,
      gain: s.gain ?? track.gain,
    };
  }, []);

  // ---------- 播放中人工覆盖 ----------

  const armOverride = useCallback(
    (trackId: string, param: AutomationParam, value: Vec3 | Orientation | number) => {
      if (!engine.isPlaying(trackId)) return;
      engine.beginOverride(trackId, param, value);
      addOverrideParam(trackId, param);
    },
    [],
  );

  const updateOverrideValue = useCallback(
    (trackId: string, param: AutomationParam, value: Vec3 | Orientation | number) => {
      engine.updateOverride(trackId, param, value);
    },
    [],
  );

  /** 取消覆盖：参数立即回到计划轨迹（引擎取消调度+回弹，doc 也恢复为计划值） */
  const cancelOverride = useCallback((trackId: string, param: AutomationParam) => {
    // 若覆盖已被提交等流程清掉，引擎返回 null：仅同步 UI 状态即可
    const planned = engine.cancelOverride(trackId, param) as
      | Vec3
      | Orientation
      | number
      | null;
    removeOverrideParamState(trackId, param);
    if (planned === null) return;
    if (param === 'position') {
      const p = planned as Vec3;
      setDoc((d) => ({
        ...d,
        tracks: d.tracks.map((t) => (t.id === trackId ? { ...t, position: { ...p } } : t)),
      }));
    } else if (param === 'orientation') {
      const o = planned as Orientation;
      setDoc((d) => ({
        ...d,
        tracks: d.tracks.map((t) => (t.id === trackId ? { ...t, orientation: { ...o } } : t)),
      }));
    } else {
      const g = planned as number;
      setDoc((d) => ({
        ...d,
        tracks: d.tracks.map((t) => (t.id === trackId ? { ...t, gain: g } : t)),
      }));
    }
  }, []);

  const cancelAllOverrides = useCallback((trackId: string) => {
    for (const p of engine.getOverrides(trackId)) {
      cancelOverride(trackId, p);
    }
  }, [cancelOverride]);

  /**
   * 提交覆盖：在当前播放媒体时间把临时值显式写成新关键帧（可审计新版本）。
   * 同刻冲突会被 commitKeyframe 拒绝，原自动化轨保留，覆盖继续保留给用户重新选择。
   */
  const commitOverride = useCallback(
    (trackId: string, param: AutomationParam): { ok: boolean; error?: string } => {
      const t = docRef.current.tracks.find((x) => x.id === trackId);
      if (!t) return { ok: false, error: '声轨不存在' };
      const media = engine.getMediaTime(trackId);
      const frame: AutomationFrameInput =
        param === 'position'
          ? { time: media, param, position: { ...t.position } }
          : param === 'orientation'
            ? { time: media, param, orientation: { ...t.orientation } }
            : { time: media, param, gain: t.gain };
      const res = mutateLane(trackId, (l) => commitKeyframe(l, frame));
      if (res.ok) {
        engine.clearOverride(trackId, param);
        removeOverrideParamState(trackId, param);
      }
      return res;
    },
    [],
  );

  const overridesApi = useMemo(() => {
    const m = new Map<string, OverrideState>();
    for (const [id, st] of overrideMap) m.set(id, st);
    return m;
  }, [overrideMap]);

  const api = useMemo<WorkbenchApi>(
    () => ({
      doc,
      unlock,
      unlockError,
      playingIds,
      levels,
      selectedId,
      projects,
      loadedProjectId,
      loadedProjectName,
      saveState,
      globalError,
      live,
      overrides: overridesApi,
      selectTrack,
      unlockAudio,
      addSample,
      addFiles,
      removeTrack,
      updateTrack,
      moveTrack,
      setOrientation,
      setListener,
      setSpatial,
      setBusGain,
      setMasterGain,
      play,
      pause,
      stop,
      seek,
      togglePlay,
      playAll,
      stopAll,
      clearClips,
      saveProjectAs,
      loadProject,
      deleteProject,
      newProject,
      dismissGlobalError,
      lane,
      commitFrame,
      deleteFrame,
      moveFrame,
      updateFrameValue,
      setLaneEnabled,
      clearFrames,
      undoAutomation,
      plannedAt,
      armOverride,
      updateOverrideValue,
      cancelOverride,
      commitOverride,
      cancelAllOverrides,
    }),
    [
      doc,
      unlock,
      unlockError,
      playingIds,
      levels,
      selectedId,
      projects,
      loadedProjectId,
      loadedProjectName,
      saveState,
      globalError,
      live,
      overridesApi,
      selectTrack,
      unlockAudio,
      addSample,
      addFiles,
      removeTrack,
      updateTrack,
      moveTrack,
      setOrientation,
      setListener,
      setSpatial,
      setBusGain,
      setMasterGain,
      play,
      pause,
      stop,
      seek,
      togglePlay,
      playAll,
      stopAll,
      clearClips,
      saveProjectAs,
      loadProject,
      deleteProject,
      newProject,
      dismissGlobalError,
      lane,
      commitFrame,
      deleteFrame,
      moveFrame,
      updateFrameValue,
      setLaneEnabled,
      clearFrames,
      undoAutomation,
      plannedAt,
      armOverride,
      updateOverrideValue,
      cancelOverride,
      commitOverride,
      cancelAllOverrides,
    ],
  );

  return api;
}
