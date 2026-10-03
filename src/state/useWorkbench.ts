import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type {
  AutomationKeyframe,
  AutomationLane,
  AutomationParams,
  DisplayTrack,
  LevelState,
  ListenerState,
  NamedProject,
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
  addKeyframe,
  AutomationError,
  clearLane,
  emptyHistory,
  emptyLane,
  laneDuration,
  laneHasParam,
  migrateDoc,
  pushHistory,
  redoHistory,
  removeKeyframe,
  sampleLane,
  sampleLaneLoop,
  undoHistory,
  updateKeyframe,
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
    automation: emptyLane(),
    status: 'pending',
  };
}

function emptyDoc(): ProjectDoc {
  return {
    version: 2,
    tracks: [],
    listener: { ...DEFAULT_LISTENER, position: { ...DEFAULT_LISTENER.position } },
    spatial: { ...DEFAULT_SPATIAL },
    busGain: 1,
    masterGain: 0.9,
    savedAt: 0,
    automationHistory: emptyHistory(),
  };
}

/** 播放中用于 2D/3D/方位读数的“当前时刻”声轨（自动化采样位置/方向/增益） */
function deriveDisplayTracks(
  tracks: Track[],
  playing: Set<string>,
  overrides: Set<string>,
): DisplayTrack[] {
  return tracks.map((t) => {
    if (!playing.has(t.id) || t.automation.keyframes.length === 0) return t;
    if (overrides.has(t.id)) return t; // 人工临时覆盖：所见即所拖
    const ph = engine.getProgress(t.id);
    if (ph == null) return t;
    const cycle = t.duration && t.duration > 0 ? t.duration : Math.max(laneDuration(t.automation), 0.001);
    const s = t.loop ? sampleLaneLoop(t.automation, ph, cycle) : sampleLane(t.automation, ph);
    return {
      ...t,
      position: s.position ? { ...s.position } : t.position,
      gain: s.gain !== undefined ? s.gain : t.gain,
      effectiveOrientation: s.orientation ? { ...s.orientation } : undefined,
    };
  });
}

export interface WorkbenchApi {
  doc: ProjectDoc;
  displayTracks: DisplayTrack[];
  unlock: UnlockState;
  unlockError: string | null;
  playingIds: Set<string>;
  overrideIds: Set<string>;
  levels: LevelState;
  selectedId: string | null;
  projects: NamedProject[];
  loadedProjectId: string | null;
  loadedProjectName: string | null;
  saveState: 'idle' | 'saving' | 'saved';
  globalError: string | null;
  automationError: string | null;
  canUndoAutomation: boolean;
  canRedoAutomation: boolean;
  selectTrack: (id: string | null) => void;
  unlockAudio: () => Promise<void>;
  addSample: (type: Exclude<SourceType, 'file'>) => Promise<void>;
  addFiles: (files: FileList | File[]) => Promise<void>;
  removeTrack: (id: string) => Promise<void>;
  updateTrack: (id: string, patch: Partial<Track>) => void;
  moveTrack: (id: string, position: Track['position']) => void;
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
  // 空间自动化
  addAutomationKeyframe: (
    trackId: string,
    time: number,
    params: AutomationParams,
  ) => boolean;
  updateAutomationKeyframe: (
    trackId: string,
    keyId: string,
    input: { time?: number; params?: AutomationParams; patch?: boolean },
  ) => boolean;
  removeAutomationKeyframe: (trackId: string, keyId: string) => boolean;
  clearAutomation: (trackId: string) => void;
  undoAutomation: () => void;
  redoAutomation: () => void;
  dismissAutomationError: () => void;
  beginManualOverride: (trackId: string) => void;
  cancelOverride: (trackId: string) => void;
  commitOverride: (trackId: string, time?: number) => boolean;
  saveProjectAs: (name: string) => Promise<void>;
  loadProject: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  newProject: () => Promise<void>;
  dismissGlobalError: () => void;
}

export function useWorkbench(): WorkbenchApi {
  const [doc, setDoc] = useState<ProjectDoc>(emptyDoc);
  const [unlock, setUnlock] = useState<UnlockState>('locked');
  const [unlockError, setUnlockError] = useState<string | null>(null);
  const [playingIds, setPlayingIds] = useState<Set<string>>(new Set());
  const [overrideIds, setOverrideIds] = useState<Set<string>>(new Set());
  const [levels, setLevels] = useState<LevelState>({ l: 0, r: 0, clipL: false, clipR: false });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [projects, setProjects] = useState<NamedProject[]>([]);
  const [loadedProjectId, setLoadedProjectId] = useState<string | null>(null);
  const [loadedProjectName, setLoadedProjectName] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [automationError, setAutomationError] = useState<string | null>(null);
  const [displayTracks, setDisplayTracks] = useState<DisplayTrack[]>([]);

  const docRef = useRef(doc);
  docRef.current = doc;
  const playingRef = useRef(playingIds);
  playingRef.current = playingIds;
  const overrideRef = useRef(overrideIds);
  overrideRef.current = overrideIds;
  const initDone = useRef(false);

  // ---------- 播放光标：rAF 驱动 2D/3D/方位读数与自动化保持同步 ----------
  useEffect(() => {
    if (playingIds.size === 0) {
      setDisplayTracks(deriveDisplayTracks(docRef.current.tracks, new Set(), overrideRef.current));
      return;
    }
    let raf = 0;
    const tick = () => {
      setDisplayTracks(
        deriveDisplayTracks(docRef.current.tracks, playingRef.current, overrideRef.current),
      );
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playingIds]);

  // 非播放时 doc 变化也要刷新展示轨（编辑/撤销/载入）
  useEffect(() => {
    if (playingIds.size === 0) {
      setDisplayTracks(deriveDisplayTracks(doc.tracks, new Set(), overrideIds));
    }
  }, [doc, playingIds, overrideIds]);

  // ---------- 初始化：恢复会话与工程列表，绝不自动播放 ----------
  useEffect(() => {
    // React StrictMode 会双重挂载；用标志保证只加载一次，cancelled 只阻止写状态
    if (initDone.current) return;
    initDone.current = true;
    let cancelled = false;
    (async () => {
      try {
        const [rawSession, list] = await Promise.all([idb.loadSession(), idb.listProjects()]);
        if (cancelled) return;
        if (list) setProjects(list);
        const session = migrateDoc(rawSession);
        if (session) {
          // 恢复全部参数，但播放状态一律归零（不擅自自动播放）。
          // 文件轨标记 pending，待音频解锁后重新注入 Blob 解码。
          setDoc({
            ...session,
            tracks: session.tracks.map((t) => ({
              ...t,
              status: 'pending' as const,
              errorMessage: undefined,
            })),
          });
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

  useEffect(() => {
    return engine.onEnded((trackId) => {
      setPlayingIds((prev) => {
        if (!prev.has(trackId)) return prev;
        const next = new Set(prev);
        next.delete(trackId);
        return next;
      });
      setOverrideIds((prev) => {
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

      // 注入文件 Blob
      for (const t of docRef.current.tracks) {
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
          automation: emptyLane(),
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
    setPlayingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setOverrideIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setDoc((d) => ({
      ...d,
      tracks: d.tracks.filter((x) => x.id !== id),
      // 同步清理撤销历史中指向该轨的条目，避免对不存在轨执行撤销
      automationHistory: {
        version: 1,
        undo: d.automationHistory.undo.filter((e) => e.trackId !== id),
        redo: d.automationHistory.redo.filter((e) => e.trackId !== id),
      },
    }));
    setSelectedId((cur) => (cur === id ? null : cur));
  }, []);

  /**
   * 播放中调整实时参数（位置拖拽 / 增益推子）时，显式进入人工临时覆盖。
   * 覆盖只取消尚未发生的自动化事件，不改动关键帧数据。
   */
  const enterOverrideIfPlaying = useCallback((id: string) => {
    if (engine.isPlaying(id) && engine.isAutomationArmed(id)) {
      engine.beginOverride(id);
      setOverrideIds((prev) => {
        if (prev.has(id)) return prev;
        const next = new Set(prev);
        next.add(id);
        return next;
      });
    }
  }, []);

  const updateTrack = useCallback(
    (id: string, patch: Partial<Track>) => {
      const prev = docRef.current.tracks.find((x) => x.id === id);
      if (!prev) return;
      // 增益推子在自动化播放中属于人工接管
      if (patch.gain !== undefined && patch.gain !== prev.gain) {
        enterOverrideIfPlaying(id);
      }
      patchTrack(id, patch);
      // 切换所选输入声道需要重建输入图（splitter 接线改变）
      if (
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
    [enterOverrideIfPlaying],
  );

  const moveTrack = useCallback(
    (id: string, position: Track['position']) => {
      enterOverrideIfPlaying(id);
      setDoc((d) => ({
        ...d,
        tracks: d.tracks.map((t) => (t.id === id ? { ...t, position: { ...position } } : t)),
      }));
    },
    [enterOverrideIfPlaying],
  );

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

  /** 传输打断覆盖：回到计划轨迹在当前位置的采样值（原关键帧不受影响） */
  const reconcileOverrideOnTransport = useCallback((id: string, atOffset?: number) => {
    setOverrideIds((prev) => {
      if (!prev.has(id)) return prev;
      const t = docRef.current.tracks.find((x) => x.id === id);
      if (t && t.automation.keyframes.length > 0) {
        const ph =
          atOffset ??
          (t.duration && t.duration > 0 ? Math.min(engine.getProgress(id) ?? 0, t.duration) : 0);
        const s =
          t.loop && t.duration
            ? sampleLaneLoop(t.automation, ph, t.duration)
            : sampleLane(t.automation, ph);
        patchTrack(id, {
          ...(s.position ? { position: { ...s.position } } : {}),
          ...(s.gain !== undefined ? { gain: s.gain } : {}),
        });
      }
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

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

  const pause = useCallback(
    (id: string) => {
      const t = docRef.current.tracks.find((x) => x.id === id);
      if (!t) return;
      const offset = engine.getProgress(id) ?? 0;
      engine.pauseTrack(t);
      reconcileOverrideOnTransport(id, offset);
      setPlayingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    [reconcileOverrideOnTransport],
  );

  const stop = useCallback(
    (id: string) => {
      const t = docRef.current.tracks.find((x) => x.id === id);
      if (!t) return;
      engine.stopTrack(t);
      reconcileOverrideOnTransport(id, 0);
      setPlayingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    },
    [reconcileOverrideOnTransport],
  );

  const seek = useCallback(
    async (id: string, offsetSec: number) => {
      const t = docRef.current.tracks.find((x) => x.id === id);
      if (!t) return;
      const wasPlaying = engine.isPlaying(id);
      await engine.seekTrack(t, offsetSec, wasPlaying);
      reconcileOverrideOnTransport(id, offsetSec);
      setPlayingIds((prev) => {
        const next = new Set(prev);
        if (wasPlaying) next.add(id);
        else next.delete(id);
        return next;
      });
    },
    [reconcileOverrideOnTransport],
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
    for (const t of docRef.current.tracks) {
      engine.stopTrack(t);
      reconcileOverrideOnTransport(t.id, 0);
    }
    setPlayingIds(new Set());
  }, [reconcileOverrideOnTransport]);

  const clearClips = useCallback(() => {
    engine.clearClipLatch();
    setLevels((l) => ({ ...l, clipL: false, clipR: false }));
  }, []);

  // ---------- 空间自动化编辑（写入前校验，冲突显式拒绝，原轨保留） ----------

  const reportAutoError = useCallback((err: unknown) => {
    if (err instanceof AutomationError) setAutomationError(err.message);
    else setAutomationError(err instanceof Error ? err.message : String(err));
  }, []);

  const applyAutomation = useCallback(
    (
      trackId: string,
      label: string,
      mutate: (lane: AutomationLane) => AutomationLane,
    ): boolean => {
      const t = docRef.current.tracks.find((x) => x.id === trackId);
      if (!t) return false;
      let after: AutomationLane;
      try {
        after = mutate(t.automation);
      } catch (err) {
        reportAutoError(err);
        return false;
      }
      if (after === t.automation) return true;
      setDoc((d) => ({
        ...d,
        tracks: d.tracks.map((x) => (x.id === trackId ? { ...x, automation: after } : x)),
        automationHistory: pushHistory(d.automationHistory, {
          trackId,
          label,
          before: t.automation,
          after,
        }),
      }));
      setAutomationError(null);
      return true;
    },
    [reportAutoError],
  );

  const addAutomationKeyframe = useCallback(
    (trackId: string, time: number, params: AutomationParams) =>
      applyAutomation(
        trackId,
        '添加关键帧',
        (lane) => addKeyframe(lane, { time, params }),
      ),
    [applyAutomation],
  );

  const updateAutomationKeyframe = useCallback(
    (
      trackId: string,
      keyId: string,
      input: { time?: number; params?: AutomationParams; patch?: boolean },
    ) =>
      applyAutomation(trackId, '编辑关键帧', (lane) =>
        updateKeyframe(lane, { id: keyId, ...input }),
      ),
    [applyAutomation],
  );

  const removeAutomationKeyframe = useCallback(
    (trackId: string, keyId: string) =>
      applyAutomation(trackId, '删除关键帧', (lane) => removeKeyframe(lane, keyId)),
    [applyAutomation],
  );

  const clearAutomation = useCallback(
    (trackId: string) => {
      applyAutomation(trackId, '清空自动化轨', (lane) => clearLane(lane));
    },
    [applyAutomation],
  );

  const undoAutomation = useCallback(() => {
    const lanes = new Map(docRef.current.tracks.map((t) => [t.id, t.automation]));
    try {
      const res = undoHistory(docRef.current.automationHistory, lanes);
      setDoc((d) => ({
        ...d,
        automationHistory: res.history,
        tracks: d.tracks.map((t) =>
          t.id === res.trackId ? { ...t, automation: res.lane } : t,
        ),
      }));
      setAutomationError(null);
    } catch (err) {
      reportAutoError(err);
    }
  }, [reportAutoError]);

  const redoAutomation = useCallback(() => {
    const lanes = new Map(docRef.current.tracks.map((t) => [t.id, t.automation]));
    try {
      const res = redoHistory(docRef.current.automationHistory, lanes);
      setDoc((d) => ({
        ...d,
        automationHistory: res.history,
        tracks: d.tracks.map((t) =>
          t.id === res.trackId ? { ...t, automation: res.lane } : t,
        ),
      }));
      setAutomationError(null);
    } catch (err) {
      reportAutoError(err);
    }
  }, [reportAutoError]);

  const dismissAutomationError = useCallback(() => setAutomationError(null), []);

  const beginManualOverride = useCallback(
    (trackId: string) => enterOverrideIfPlaying(trackId),
    [enterOverrideIfPlaying],
  );

  /** 取消临时覆盖：引擎在当前播放头重新锚定计划；视图位置回到计划采样 */
  const cancelOverride = useCallback((trackId: string) => {
    const t = docRef.current.tracks.find((x) => x.id === trackId);
    if (!t) return;
    const ph = engine.getProgress(trackId) ?? 0;
    if (engine.isOverride(trackId)) engine.cancelOverride(trackId);
    if (t.automation.keyframes.length > 0) {
      const s =
        t.loop && t.duration
          ? sampleLaneLoop(t.automation, ph, t.duration)
          : sampleLane(t.automation, ph);
      patchTrack(trackId, {
        ...(s.position ? { position: { ...s.position } } : {}),
        ...(s.gain !== undefined ? { gain: s.gain } : {}),
      });
    }
    setOverrideIds((prev) => {
      const next = new Set(prev);
      next.delete(trackId);
      return next;
    });
  }, []);

  /**
   * 提交临时覆盖为新关键帧：时间相同 → 拒绝并保留覆盖（由用户决定改时或取消）。
   * 提交成功产生 revision+1 的新版本；引擎在播放头重新 arm，覆盖自然结束。
   */
  const commitOverride = useCallback(
    (trackId: string, forcedTime?: number): boolean => {
      const t = docRef.current.tracks.find((x) => x.id === trackId);
      if (!t) return false;
      const rawTime = forcedTime ?? engine.getProgress(trackId) ?? 0;
      const time = Math.round(rawTime * 1000) / 1000;
      if (t.automation.keyframes.some((k) => Math.abs(k.time - time) < 0.001)) {
        setAutomationError(
          `时间 ${time.toFixed(3)}s 已存在关键帧：提交被拒绝，原自动化轨保持不变`,
        );
        return false;
      }
      const params: AutomationParams = { position: { ...t.position } };
      // 若自动化原本承载增益/朝向，则一并快照当前值（保持参数轨语义完整）
      if (laneHasParam(t.automation, 'gain')) params.gain = t.gain;
      const ok = applyAutomation(trackId, '提交临时覆盖', (lane) =>
        addKeyframe(lane, { time, params }),
      );
      if (ok) {
        setOverrideIds((prev) => {
          const next = new Set(prev);
          next.delete(trackId);
          return next;
        });
      }
      return ok;
    },
    [applyAutomation],
  );

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
      const raw = await idb.getProject(id);
      if (!raw) return;
      const p = migrateDoc(raw);
      if (!p) {
        setGlobalError('工程文件结构损坏，无法载入');
        return;
      }
      // 先拆除当前声轨节点
      for (const t of docRef.current.tracks) engine.removeTrack(t.id);
      setPlayingIds(new Set());
      setOverrideIds(new Set());
      const restored: ProjectDoc = {
        ...p,
        tracks: p.tracks.map((t) => ({
          ...t,
          // 内置样例可重建；文件声轨等待 Blob 注入解码；不自动播放
          status: 'pending' as const,
          errorMessage: undefined,
        })),
      };
      setDoc(restored);
      setLoadedProjectId(raw.id);
      setLoadedProjectName(raw.name);
      setSelectedId(null);
      // 若已解锁，走一遍解锁同步逻辑（手动触发：状态不变，effect 不会重跑）
      if (engine.unlock === 'unlocked') {
        for (const t of restored.tracks) {
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
    setPlayingIds(new Set());
    setOverrideIds(new Set());
    setDoc(emptyDoc());
    setLoadedProjectId(null);
    setLoadedProjectName(null);
    setSelectedId(null);
  }, []);

  const dismissGlobalError = useCallback(() => setGlobalError(null), []);

  const canUndoAutomation = doc.automationHistory.undo.length > 0;
  const canRedoAutomation = doc.automationHistory.redo.length > 0;

  const api = useMemo<WorkbenchApi>(
    () => ({
      doc,
      displayTracks,
      unlock,
      unlockError,
      playingIds,
      overrideIds,
      levels,
      selectedId,
      projects,
      loadedProjectId,
      loadedProjectName,
      saveState,
      globalError,
      automationError,
      canUndoAutomation,
      canRedoAutomation,
      selectTrack,
      unlockAudio,
      addSample,
      addFiles,
      removeTrack,
      updateTrack,
      moveTrack,
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
      addAutomationKeyframe,
      updateAutomationKeyframe,
      removeAutomationKeyframe,
      clearAutomation,
      undoAutomation,
      redoAutomation,
      dismissAutomationError,
      beginManualOverride,
      cancelOverride,
      commitOverride,
      saveProjectAs,
      loadProject,
      deleteProject,
      newProject,
      dismissGlobalError,
    }),
    [
      doc,
      displayTracks,
      unlock,
      unlockError,
      playingIds,
      overrideIds,
      levels,
      selectedId,
      projects,
      loadedProjectId,
      loadedProjectName,
      saveState,
      globalError,
      automationError,
      canUndoAutomation,
      canRedoAutomation,
      selectTrack,
      unlockAudio,
      addSample,
      addFiles,
      removeTrack,
      updateTrack,
      moveTrack,
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
      addAutomationKeyframe,
      updateAutomationKeyframe,
      removeAutomationKeyframe,
      clearAutomation,
      undoAutomation,
      redoAutomation,
      dismissAutomationError,
      beginManualOverride,
      cancelOverride,
      commitOverride,
      saveProjectAs,
      loadProject,
      deleteProject,
      newProject,
      dismissGlobalError,
    ],
  );

  return api;
}

/** 供 UI 判断某轨是否含某参数自动化 */
export function trackLaneHasParam(lane: AutomationLane, name: 'position' | 'orientation' | 'gain') {
  return laneHasParam(lane, name);
}

export type { AutomationKeyframe, Vec3 };
