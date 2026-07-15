/**
 * Running grid + banner templates for the Worker console (spec §5.2, §5.6).
 *
 * Phase 10: the running grid renders REAL attempt tiles derived from the queue
 * snapshot's `attempts` (status='running'), pushed via `worker-queue-snapshot`.
 * The banners area carries the auto-advance state and the breaker Failed banner
 * (derived from failed/orphaned attempts). The transcript viewer (tile click →
 * drawer) is Phase 11 — here the tile just surfaces attempt data.
 *
 * Grid: `repeat(auto-fill, minmax(215px,1fr))` with its own internal scroll
 * (`worker-final.html`); one column on mobile.
 */
import { html } from 'lit-html';

/**
 * @typedef {Object} RunningTile
 * @property {string} bead_id
 * @property {string} title
 * @property {'serial'|'parallel'} lane
 * @property {string|null} runner
 * @property {string|null} model
 * @property {number|null} started_at
 */

/**
 * @typedef {Object} BreakerBanner
 * @property {string} repo
 * @property {string} reason
 */

/**
 * Format an elapsed duration (ms) as `MmSSs` / `SSs`.
 *
 * @param {number} ms
 * @returns {string}
 */
function formatElapsed(ms) {
  if (!Number.isFinite(ms) || ms < 0) {
    return '0s';
  }
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
}

/**
 * Banners area above the running grid.
 *
 * @param {{ autoAdvance: boolean, breaker?: BreakerBanner|null }} state
 * @returns {import('lit-html').TemplateResult}
 */
export function bannersTemplate(state) {
  return html`<div class="worker-banners">
    ${state.autoAdvance
      ? html`<div class="worker-banner worker-banner--on" role="status">
          ▶ 자동 진행 켜짐 — Serial head 1 + Parallel 슬롯까지 실행합니다.
        </div>`
      : html`<div class="worker-banner worker-banner--off" role="status">
          ⏸ 자동 진행 꺼짐 — 새 세션을 시작하지 않습니다. ▶로 재개.
        </div>`}
    ${state.breaker
      ? html`<div class="worker-banner worker-banner--breaker" role="alert">
          ⛔ ${state.breaker.repo || 'repo'} 세션 실패로 차단 —
          ${state.breaker.reason || ''}. 신규 launch·머지 진입 차단, 수동 ▶
          필요.
        </div>`
      : ''}
  </div>`;
}

/**
 * One running-session tile.
 *
 * @param {RunningTile} tile
 * @param {number} now
 * @returns {import('lit-html').TemplateResult}
 */
function runningTile(tile, now) {
  const badge = tile.lane === 'serial' ? 'serial' : '∥';
  const elapsed =
    typeof tile.started_at === 'number'
      ? formatElapsed(now - tile.started_at)
      : '—';
  const meta = [tile.runner, tile.model].filter(Boolean).join(' · ');
  return html`<div class="rtile" data-bead-id=${tile.bead_id}>
    <div class="rtile__hd">
      <span class="rtile__dot" aria-hidden="true"></span>
      <span class="rtile__id">${tile.bead_id}</span>
      <span class="rtile__badge rtile__badge--${tile.lane}">${badge}</span>
      <span class="rtile__elapsed">${elapsed}</span>
      <button type="button" class="rtile__stop" title="중지" aria-label="중지">
        ■
      </button>
    </div>
    <div class="rtile__title">${tile.title}</div>
    ${meta ? html`<div class="rtile__meta">${meta}</div>` : ''}
  </div>`;
}

/**
 * Running grid. Renders one tile per running attempt; empty message otherwise.
 *
 * @param {RunningTile[]} tiles
 * @param {number} [now]
 * @returns {import('lit-html').TemplateResult}
 */
export function runningGridTemplate(tiles, now = Date.now()) {
  const list = Array.isArray(tiles) ? tiles : [];
  return html`<div class="worker-rungrid" id="worker-rungrid">
    ${list.length === 0
      ? html`<div class="worker-rungrid__empty">실행 세션 없음</div>`
      : list.map((t) => runningTile(t, now))}
  </div>`;
}
