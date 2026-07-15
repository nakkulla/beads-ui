import { html } from 'lit-html';
import { coerceTimestampMs } from '../../utils/relative-time.js';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/**
 * @typedef {Object} BoardCardIssue
 * @property {string} id
 * @property {string} [title]
 * @property {string} [status]
 * @property {number} [priority]
 * @property {number | string} [updated_at]
 * @property {number | string} [created_at]
 */

/**
 * @typedef {Object} BoardCardContext
 * @property {(ev: MouseEvent, id: string) => void} onCardClick
 * @property {(ev: Event, id: string) => void} onCopyId
 * @property {(ev: DragEvent, id: string) => void} onDragStart
 * @property {(ev: DragEvent) => void} onDragEnd
 */

/**
 * Format an elapsed duration compactly (e.g. "3d", "6h", "12m", "now").
 *
 * @param {number | string | null | undefined} timestamp_value
 * @param {number} [now_ms]
 * @returns {string}
 */
export function formatElapsedCompact(timestamp_value, now_ms) {
  const event_ms = coerceTimestampMs(timestamp_value);
  if (event_ms === null) {
    return '';
  }
  const reference_ms = typeof now_ms === 'number' ? now_ms : Date.now();
  const diff_ms = Math.max(0, reference_ms - event_ms);
  const minutes = Math.floor(diff_ms / 60_000);
  if (minutes < 1) {
    return 'now';
  }
  if (minutes < 60) {
    return `${minutes}m`;
  }
  const hours = Math.floor(diff_ms / 3_600_000);
  if (hours < 24) {
    return `${hours}h`;
  }
  const days = Math.floor(diff_ms / 86_400_000);
  if (days < 7) {
    return `${days}d`;
  }
  const weeks = Math.floor(days / 7);
  if (days < 30) {
    return `${weeks}w`;
  }
  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months}mo`;
  }
  return `${Math.floor(days / 365)}y`;
}

/**
 * Render a priority label like "P2" (only when priority is a number).
 *
 * @param {number | undefined} priority
 * @returns {string}
 */
function priorityLabel(priority) {
  if (typeof priority !== 'number' || !Number.isFinite(priority)) {
    return '';
  }
  return `P${Math.max(0, Math.min(4, priority))}`;
}

/**
 * Card v1 skeleton (board-card-final.html anatomy): mono id chip (copy),
 * priority badge, title, elapsed time, and a `.roll` placeholder row.
 * Chips / stepper / rollup land in Phase 8 — the `.board-card__extras`
 * hook renders only when extension content is supplied.
 *
 * @param {BoardCardIssue} issue
 * @param {BoardCardContext} ctx
 * @returns {TemplateResult}
 */
export function cardTemplate(issue, ctx) {
  const pri = priorityLabel(issue.priority);
  const elapsed = formatElapsedCompact(issue.updated_at ?? issue.created_at);
  return html`
    <article
      class="board-card"
      data-issue-id=${issue.id}
      role="listitem"
      tabindex="-1"
      draggable="true"
      @click=${(/** @type {MouseEvent} */ ev) => ctx.onCardClick(ev, issue.id)}
      @dragstart=${(/** @type {DragEvent} */ ev) =>
        ctx.onDragStart(ev, issue.id)}
      @dragend=${ctx.onDragEnd}
    >
      <div class="board-card__head">
        <button
          type="button"
          class="board-card__id"
          title="ID 복사"
          aria-label=${`이슈 ID ${issue.id} 복사`}
          @click=${(/** @type {Event} */ ev) => ctx.onCopyId(ev, issue.id)}
        >
          ${issue.id}
        </button>
        ${pri ? html`<span class="board-card__pri">${pri}</span>` : ''}
      </div>
      <div class="board-card__title">${issue.title || '(제목 없음)'}</div>
      <div class="board-card__roll">
        <span class="board-card__roll-meta"></span>
        ${elapsed
          ? html`<span class="board-card__elapsed">${elapsed}</span>`
          : ''}
      </div>
    </article>
  `;
}
