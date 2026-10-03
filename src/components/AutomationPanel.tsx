import { useEffect, useRef, useState } from 'react';
import type { AutomationKeyframe, Track } from '../types';
import type { WorkbenchApi } from '../state/useWorkbench';
import { laneDuration } from '../lib/automation';

interface Props {
  track: Track;
  /** 播放进度（秒），由 TrackRow 的 rAF 提供 */
  playhead: number;
  /** 新关键帧默认位置：播放中为自动化采样位置（与 2D/3D/读数一致） */
  currentPosition: Track['position'];
  /** 新关键帧默认增益：播放中为自动化采样增益 */
  currentGain: number;
  api: WorkbenchApi;
}

function fmt(t: number): string {
  return `${t.toFixed(2)}s`;
}

/**
 * 每轨空间自动化轨：
 *  - 时间轴点击空白 = 以当前位置/增益（及既有朝向）提交新关键帧；
 *  - 同一时刻提交会被数据层拒绝（DUP_TIME），错误显示在面板顶部，原轨保留；
 *  - 关键帧稳定 id 展示短码；拖动“时”输入改时间，逆序/同刻同样被拒绝；
 *  - 播放头竖线随播放推进，覆盖状态由 TrackRow 上的横幅处理。
 */
export function AutomationPanel({ track, playhead, currentPosition, currentGain, api }: Props) {
  const lane = track.automation;
  const [selectedKf, setSelectedKf] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  const duration =
    track.duration && track.duration > 0
      ? Math.max(track.duration, laneDuration(lane))
      : Math.max(1, laneDuration(lane));
  const span = Math.max(duration, 0.5);

  useEffect(() => {
    if (selectedKf && !lane.keyframes.some((k) => k.id === selectedKf)) {
      setSelectedKf(null);
    }
  }, [lane.keyframes, selectedKf]);

  const pct = (t: number) => `${Math.min(100, Math.max(0, (t / span) * 100))}%`;

  const addAt = (time: number) =>
    api.addAutomationKeyframe(track.id, Math.max(0, Math.round(time * 1000) / 1000), {
      position: { ...currentPosition },
      gain: currentGain,
    });

  const onStripClick = (e: React.MouseEvent) => {
    if (!stripRef.current) return;
    const rect = stripRef.current.getBoundingClientRect();
    const time = ((e.clientX - rect.left) / rect.width) * span;
    addAt(time);
  };

  const kf: AutomationKeyframe | null =
    lane.keyframes.find((k) => k.id === selectedKf) ?? null;

  return (
    <div className="automation-panel">
      <div className="automation-head">
        <button
          className="btn mini ghost"
          onClick={() => setOpen((v) => !v)}
          title="展开/收起空间自动化轨"
        >
          {open ? '▾' : '▸'} 空间自动化
        </button>
        <span className="muted small">
          {lane.keyframes.length} 帧 · v{lane.revision}
        </span>
        {open && (
          <>
            <button
              className="btn mini"
              onClick={() => addAt(api.playingIds.has(track.id) ? playhead : 0)}
              title="在当前播放头（未播放时为 0）以当前位置/增益添加关键帧"
            >
              ＋ 此处
            </button>
            <button
              className="btn mini"
              disabled={!api.canUndoAutomation}
              onClick={() => api.undoAutomation()}
              title="撤销上一次自动化编辑"
            >
              ↶ 撤销
            </button>
            <button
              className="btn mini"
              disabled={!api.canRedoAutomation}
              onClick={() => api.redoAutomation()}
              title="重做"
            >
              ↷
            </button>
            <button
              className="btn mini ghost danger"
              disabled={lane.keyframes.length === 0}
              onClick={() => {
                if (confirm('清空该轨全部关键帧？（可撤销）')) {
                  api.clearAutomation(track.id);
                  setSelectedKf(null);
                }
              }}
            >
              清空
            </button>
          </>
        )}
      </div>

      {open && (
        <>
          {api.automationError && track.id === api.selectedId && (
            <div className="automation-error">⚠ {api.automationError}</div>
          )}
          <div
            ref={stripRef}
            className="automation-strip"
            onClick={onStripClick}
            title="点击空白处在该时间以当前位置/增益添加关键帧"
          >
            {lane.keyframes.map((k) => (
              <button
                key={k.id}
                className={`automation-kf ${selectedKf === k.id ? 'selected' : ''}`}
                style={{ left: pct(k.time) }}
                title={`${fmt(k.time)} · ${k.id.slice(-5)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedKf(k.id);
                  api.selectTrack(track.id);
                }}
              />
            ))}
            {api.playingIds.has(track.id) && (
              <div className="automation-playhead" style={{ left: pct(playhead) }} />
            )}
          </div>

          <div className="automation-hint small muted">
            点击时间轴添加关键帧（工程相对时间 {fmt(span)} 量程）
            {api.playingIds.has(track.id)
              ? ' · 播放中拖拽声源/推子为临时覆盖，可取消或提交为新关键帧'
              : ''}
          </div>

          {kf && (
            <KeyframeEditor
              key={kf.id}
              track={track}
              kf={kf}
              api={api}
              onClose={() => setSelectedKf(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

function KeyframeEditor({
  track,
  kf,
  api,
  onClose,
}: {
  track: Track;
  kf: AutomationKeyframe;
  api: WorkbenchApi;
  onClose: () => void;
}) {
  const hasPos = !!kf.params.position;
  const hasGain = kf.params.gain !== undefined;
  const hasOrient = !!kf.params.orientation;

  const patchNum = (key: 'time', value: number) => {
    if (key === 'time') api.updateAutomationKeyframe(track.id, kf.id, { time: value });
  };

  return (
    <div className="kf-editor" onClick={(e) => e.stopPropagation()}>
      <div className="kf-editor-row">
        <label className="kf-field">
          <span>时间</span>
          <input
            type="number"
            min={0}
            step={0.05}
            defaultValue={Number(kf.time.toFixed(3))}
            onBlur={(e) => {
              const v = Number(e.target.value);
              if (Number.isFinite(v) && Math.abs(v - kf.time) > 1e-6) patchNum('time', v);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') (e.target as HTMLInputElement).blur();
            }}
          />
        </label>
        <span className="muted small">id …{kf.id.slice(-6)}</span>
        <button
          className="btn mini ghost danger"
          onClick={() => {
            api.removeAutomationKeyframe(track.id, kf.id);
            onClose();
          }}
        >
          删帧
        </button>
      </div>

      {hasPos && (
        <div className="kf-editor-row">
          {(['x', 'y', 'z'] as const).map((ax) => (
            <label key={ax} className="kf-field">
              <span>位置 {ax.toUpperCase()}</span>
              <input
                type="number"
                step={0.1}
                defaultValue={Number(kf.params.position![ax].toFixed(3))}
                onBlur={(e) => {
                  const v = Number(e.target.value);
                  if (!Number.isFinite(v)) return;
                  api.updateAutomationKeyframe(track.id, kf.id, {
                    patch: true,
                    params: { position: { ...kf.params.position!, [ax]: v } },
                  });
                }}
              />
            </label>
          ))}
        </div>
      )}

      {hasGain && (
        <div className="kf-editor-row">
          <label className="kf-field grow">
            <span>增益 0..1.5</span>
            <input
              type="number"
              min={0}
              max={1.5}
              step={0.01}
              defaultValue={Number(kf.params.gain!.toFixed(3))}
              onBlur={(e) => {
                const v = Number(e.target.value);
                if (!Number.isFinite(v)) return;
                api.updateAutomationKeyframe(track.id, kf.id, {
                  patch: true,
                  params: { gain: v },
                });
              }}
            />
          </label>
        </div>
      )}

      {hasOrient && (
        <div className="kf-editor-row">
          {(['x', 'y', 'z'] as const).map((ax) => (
            <label key={ax} className="kf-field">
              <span>朝向 {ax.toUpperCase()}</span>
              <input
                type="number"
                step={0.1}
                defaultValue={Number(kf.params.orientation![ax].toFixed(3))}
                onBlur={(e) => {
                  const v = Number(e.target.value);
                  if (!Number.isFinite(v)) return;
                  api.updateAutomationKeyframe(track.id, kf.id, {
                    patch: true,
                    params: { orientation: { ...kf.params.orientation!, [ax]: v } },
                  });
                }}
              />
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
