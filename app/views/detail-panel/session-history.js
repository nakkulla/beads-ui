import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {Object} SessionAttempt
 * @property {string} attempt_id
 * @property {string} [bead_id]
 * @property {string} [status] - running/done/failed/orphaned.
 * @property {number|null} [started_at]
 * @property {string|null} [runner]
 * @property {string|null} [model]
 */

/** @type {Record<string, string>} */
const STATUS_GLYPH = {
  running: '●',
  done: '✓',
  failed: '✗',
  orphaned: '⚠'
};

/**
 * Format an epoch-ms timestamp as a short `HH:MM` label (empty when absent).
 *
 * @param {number|null|undefined} ms
 * @returns {string}
 */
function shortTime(ms) {
  if (typeof ms !== 'number' || !Number.isFinite(ms)) {
    return '';
  }
  const d = new Date(ms);
  const h = String(d.getHours()).padStart(2, '0');
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * Session-history section (spec §5.6): lists a bead's past/live Worker attempts;
 * clicking one opens the transcript drawer against the persisted (or live) log.
 *
 * @param {SessionAttempt[]} [attempts]
 * @param {{ onOpen?: (attempt_id: string) => void }} [handlers]
 * @returns {TemplateResult}
 */
export function sessionHistoryTemplate(attempts, handlers = {}) {
  const list = Array.isArray(attempts) ? attempts : [];
  if (list.length === 0) {
    return html`
      <div class="detail-section-label">세션 이력</div>
      <div class="detail-empty" data-seam="session-history">세션 이력 없음</div>
    `;
  }
  return html`
    <div class="detail-section-label">세션 이력</div>
    <div class="detail-sessions" data-seam="session-history">
      ${list.map(
        (a) =>
          html`<button
            type="button"
            class="detail-session detail-session--${a.status || 'unknown'}"
            data-attempt-id=${a.attempt_id}
            @click=${() => handlers.onOpen && handlers.onOpen(a.attempt_id)}
          >
            <span class="detail-session__glyph"
              >${STATUS_GLYPH[a.status || ''] || '·'}</span
            >
            <span class="detail-session__id">${a.attempt_id}</span>
            <span class="detail-session__meta"
              >${[a.runner, a.model].filter(Boolean).join(' · ')}</span
            >
            <span class="detail-session__time">${shortTime(a.started_at)}</span>
          </button>`
      )}
    </div>
  `;
}
