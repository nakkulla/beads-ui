import { html } from 'lit-html';
import { cmpChildOrder } from '../../data/sort.js';
import { coerceTimestampMs } from '../../utils/relative-time.js';
import { stepperTemplate } from './stepper.js';

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
 * @property {import('./stepper.js').WorkflowSummary & { chips?: BoardCardChips }} [workflow]
 */

/**
 * @typedef {Object} BoardCardChips
 * @property {'spec_backed'|'full_plan'} [route]
 * @property {boolean} [fast_track]
 * @property {{ number: number | null, ci: string | null } | null} [pr]
 */

/**
 * @typedef {{ id: string, title?: string, status?: string, metadata?: Record<string, unknown> | null, created_at?: number | string }} BoardCardChild
 */

/**
 * @typedef {Object} BoardCardRollup
 * @property {number} total
 * @property {number} count
 * @property {BoardCardChild | null} current
 * @property {BoardCardChild[]} children
 */

/**
 * @typedef {Object} BoardCardContext
 * @property {(ev: MouseEvent, id: string) => void} onCardClick
 * @property {(ev: Event, id: string) => void} onCopyId
 * @property {(ev: DragEvent, id: string) => void} onDragStart
 * @property {(ev: DragEvent) => void} onDragEnd
 * @property {(id: string) => BoardCardRollup} [rollupFor]
 * @property {(id: string) => boolean} [isExpanded]
 * @property {(ev: Event, id: string) => void} [onRollupToggle]
 * @property {(ev: Event, id: string) => void} [onChildClick]
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
 * Workflow chips row: route · ⚡fast_track · PR #n · CI. The PR chip is present
 * only when a pr_url produced a PR chip server-side, keeping it in agreement
 * with the stepper PR cell.
 *
 * @param {(import('./stepper.js').WorkflowSummary & { chips?: BoardCardChips }) | undefined} workflow
 * @returns {TemplateResult | string}
 */
function chipsTemplate(workflow) {
  const chips = workflow && workflow.chips;
  if (!chips) {
    return '';
  }
  /** @type {TemplateResult[]} */
  const items = [];
  if (chips.route) {
    items.push(
      html`<span class="ctl-chip ctl-chip--route">${chips.route}</span>`
    );
  }
  if (chips.fast_track) {
    items.push(html`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`);
  }
  if (chips.pr) {
    const n = chips.pr.number;
    const ci = chips.pr.ci;
    const label = `PR${n != null ? ` #${n}` : ''}${ci ? ` · CI ${ci}` : ''}`;
    items.push(html`<span class="ctl-chip ctl-chip--pr">${label}</span>`);
  }
  if (items.length === 0) {
    return '';
  }
  return html`<div class="board-card__chips">${items}</div>`;
}

/**
 * @param {string | undefined} status
 * @returns {string}
 */
function statusDotClass(status) {
  switch (status) {
    case 'in_progress':
      return 'board-card__dot board-card__dot--progress';
    case 'resolved':
      return 'board-card__dot board-card__dot--resolved';
    case 'closed':
      return 'board-card__dot board-card__dot--closed';
    case 'blocked':
      return 'board-card__dot board-card__dot--blocked';
    default:
      return 'board-card__dot';
  }
}

/**
 * Child rollup (spec §3.3): always shows "children N/M" + the in_progress child
 * one-liner when children>0. Expanded by default (the toggle collapses it), the
 * children render as compact rows — status dot + ordinal + title — ordered by
 * `cmpChildOrder`; a row click opens the child in the detail panel. No per-child
 * stepper or chips. Elapsed sits on the right of the meta row.
 *
 * @param {BoardCardIssue} issue
 * @param {BoardCardContext} ctx
 * @param {string} elapsed
 * @returns {TemplateResult}
 */
function rollTemplate(issue, ctx, elapsed) {
  const rollup = ctx.rollupFor
    ? ctx.rollupFor(issue.id)
    : { total: 0, count: 0, current: null, children: [] };
  const total = rollup.total || 0;
  // Expanded unless the caller explicitly collapsed this card (default open).
  const expanded = ctx.isExpanded ? ctx.isExpanded(issue.id) : true;
  const ordered =
    total > 0 ? rollup.children.slice().sort(cmpChildOrder) : rollup.children;
  return html`
    <div class="board-card__roll">
      <div class="board-card__roll-meta">
        ${total > 0
          ? html`<button
              type="button"
              class="board-card__roll-toggle"
              aria-expanded=${expanded ? 'true' : 'false'}
              @click=${(/** @type {Event} */ ev) =>
                ctx.onRollupToggle && ctx.onRollupToggle(ev, issue.id)}
            >
              children ${rollup.count}/${total} ${expanded ? '▴' : '▾'}
            </button>`
          : html`<span class="board-card__roll-none">children 없음</span>`}
        ${elapsed
          ? html`<span class="board-card__elapsed">${elapsed}</span>`
          : ''}
      </div>
      ${total > 0 && rollup.current
        ? html`<div class="board-card__roll-current">
            └
            <span class="board-card__cur-child"
              >● ${rollup.current.title || rollup.current.id}</span
            >
          </div>`
        : ''}
      ${expanded && total > 0
        ? html`<div class="board-card__roll-list">
            ${ordered.map(
              (c, i) =>
                html`<button
                  type="button"
                  class="board-card__roll-child"
                  @click=${(/** @type {Event} */ ev) =>
                    ctx.onChildClick && ctx.onChildClick(ev, c.id)}
                >
                  <span class=${statusDotClass(c.status)}>●</span>
                  <span class="board-card__roll-child-ord">${i + 1}</span>
                  <span class="board-card__roll-child-title"
                    >${c.title || c.id}</span
                  >
                </button>`
            )}
          </div>`
        : ''}
    </div>
  `;
}

/**
 * Board card (board-card-final.html anatomy): mono id chip (copy), priority
 * badge, title, workflow chips, route-driven stepper, and the child-rollup /
 * elapsed footer.
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
      ${chipsTemplate(issue.workflow)}
      ${issue.workflow ? stepperTemplate(issue.workflow, issue.status) : ''}
      ${rollTemplate(issue, ctx, elapsed)}
    </article>
  `;
}
