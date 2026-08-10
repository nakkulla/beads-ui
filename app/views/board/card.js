import { html } from 'lit-html';
import { cmpChildOrder } from '../../data/sort.js';
import { isChipEnabled, visibleLabels } from '../../utils/label-policy.js';
import {
  coerceTimestampMs,
  formatRelativeTime,
  formatTimestampLocal
} from '../../utils/relative-time.js';
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
 * @property {string[]} [labels]
 * @property {string} [from_id] - Origin bead of a `discovered-from` edge.
 * @property {BoardCardBlockedInfo} [blocked_info]
 * @property {import('./stepper.js').WorkflowSummary & { chips?: BoardCardChips }} [workflow]
 */

/**
 * @typedef {Object} BoardCardChips
 * @property {'quick_fix'|'spec_backed'|'full_plan'} [route]
 * @property {'explicit'|'derived'} [route_source]
 * @property {boolean} [fast_track]
 * @property {{ number: number | null } | null} [pr]
 */

/**
 * @typedef {Object} BoardCardBlockedInfo
 * @property {boolean} external - Stored `status=blocked`: waiting on something outside the tracker.
 * @property {string | null} reason - Short `metadata.blocked_reason`, when set.
 * @property {string[]} blockers - Bead ids that must land first.
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
 * @property {(ev: Event, id: string) => void} [onFromChipClick]
 * @property {(id: string) => Record<string, unknown>|null} [cleanupFailureFor]
 * @property {(id: string) => boolean} [isCleanupDiagnosisPending]
 * @property {(ev: Event, id: string) => void} [onCleanupDiagnose]
 * @property {import('../../utils/label-policy.js').DisplayPolicy | null} [policy]
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

/** Blocker ids listed inline before the rest collapse into a `+n` suffix. */
const BLOCKER_PREVIEW_COUNT = 2;

/**
 * Render the blocked-reason chips. The two blockers are independent, so a bead
 * that is both externally blocked and dependency-blocked shows both chips:
 *
 * - `⏸` external — a stored `status=blocked`, optionally with a short reason,
 * - `⛓` dependency — the beads that must land first.
 *
 * @param {BoardCardBlockedInfo | undefined} blocked_info
 * @returns {TemplateResult[]}
 */
function blockedChips(blocked_info) {
  if (!blocked_info) {
    return [];
  }
  /** @type {TemplateResult[]} */
  const items = [];
  if (blocked_info.external) {
    const label = blocked_info.reason
      ? `⏸ blocked: ${blocked_info.reason}`
      : '⏸ blocked';
    items.push(html`<span class="ctl-chip ctl-chip--blocked">${label}</span>`);
  }
  const blockers = Array.isArray(blocked_info.blockers)
    ? blocked_info.blockers
    : [];
  if (blockers.length > 0) {
    const shown = blockers.slice(0, BLOCKER_PREVIEW_COUNT).join(', ');
    const rest = blockers.length - BLOCKER_PREVIEW_COUNT;
    const label = `⛓ blocked: ${shown}${rest > 0 ? ` +${rest}` : ''}`;
    items.push(
      html`<span class="ctl-chip ctl-chip--blocked-dep">${label}</span>`
    );
  }
  return items;
}

/**
 * Card chips row: route · ⚡fast_track · PR #n · labels · ↩ provenance ·
 * blocked reason. The PR chip is present only when a pr_url produced one
 * server-side, keeping it in agreement with the stepper PR cell. Labels render
 * by default and the display policy only subtracts; each derived chip family
 * can be switched off independently via `policy.chips`.
 *
 * @param {BoardCardIssue} issue
 * @param {BoardCardContext} ctx
 * @returns {TemplateResult | string}
 */
function chipsTemplate(issue, ctx) {
  const policy = ctx.policy || null;
  const chips = (issue.workflow && issue.workflow.chips) || {};
  /** @type {TemplateResult[]} */
  const items = [];
  if (chips.route && isChipEnabled(policy, 'route')) {
    // A derived route is internal fallback only; the chip names the missing
    // metadata pin instead of exposing that fallback as a route decision.
    const derived = chips.route_source === 'derived';
    items.push(
      html`<span
        class="ctl-chip ctl-chip--route${derived ? ' is-derived' : ''}"
        title=${derived ? 'route 미핀 (metadata unset)' : 'route'}
        >${derived ? 'unset' : chips.route}</span
      >`
    );
  }
  if (chips.fast_track && isChipEnabled(policy, 'fast_track')) {
    items.push(html`<span class="ctl-chip ctl-chip--ft">⚡ fast_track</span>`);
  }
  if (chips.pr && isChipEnabled(policy, 'pr')) {
    const n = chips.pr.number;
    items.push(
      html`<span class="ctl-chip ctl-chip--pr"
        >${`PR${n != null ? ` #${n}` : ''}`}</span
      >`
    );
  }
  for (const label of visibleLabels(issue.labels, policy)) {
    items.push(html`<span class="ctl-chip ctl-chip--label">${label}</span>`);
  }
  if (issue.from_id && isChipEnabled(policy, 'from')) {
    items.push(
      html`<button
        type="button"
        class="ctl-chip ctl-chip--from"
        title=${`출처 ${issue.from_id} 열기`}
        @click=${(/** @type {Event} */ ev) => {
          // The chip sits inside the card's own click target, so the card must
          // not also open behind the navigation.
          ev.stopPropagation();
          if (ctx.onFromChipClick) {
            ctx.onFromChipClick(ev, String(issue.from_id));
          }
        }}
      >
        ↩ from ${issue.from_id}
      </button>`
    );
  }
  if (isChipEnabled(policy, 'blocked')) {
    items.push(...blockedChips(issue.blocked_info));
  }
  const cleanup_failure = ctx.cleanupFailureFor
    ? ctx.cleanupFailureFor(issue.id)
    : null;
  if (cleanup_failure && isChipEnabled(policy, 'blocked')) {
    const diagnosis_pending = ctx.isCleanupDiagnosisPending
      ? ctx.isCleanupDiagnosisPending(issue.id)
      : false;
    items.push(
      html`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 실패</span>`
    );
    items.push(
      html`<button
        type="button"
        class="ctl-chip ctl-chip--cleanup board-card__cleanup-diagnose"
        data-bead-id=${issue.id}
        ?disabled=${diagnosis_pending}
        title="정리 실패 원인을 AI 세션으로 분류합니다"
        @click=${(/** @type {Event} */ ev) => {
          if (ctx.onCleanupDiagnose) {
            ctx.onCleanupDiagnose(ev, issue.id);
          }
        }}
      >
        AI 정리
      </button>`
    );
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
 * Created/updated meta (UX v3 spec §1): two Korean relative times with a
 * local-timezone absolute tooltip each. Replaces the old single elapsed.
 *
 * @param {BoardCardIssue} issue
 * @returns {TemplateResult | string}
 */
function timesTemplate(issue) {
  const created = formatRelativeTime(issue.created_at);
  const updated = formatRelativeTime(issue.updated_at);
  if (!created && !updated) {
    return '';
  }
  return html`<span class="board-card__times">
    ${created
      ? html`<span
          class="board-card__time"
          title=${`생성 ${formatTimestampLocal(issue.created_at)}`}
          >생성 ${created}</span
        >`
      : ''}
    ${created && updated
      ? html`<span class="board-card__time-sep">·</span>`
      : ''}
    ${updated
      ? html`<span
          class="board-card__time"
          title=${`수정 ${formatTimestampLocal(issue.updated_at)}`}
          >수정 ${updated}</span
        >`
      : ''}
  </span>`;
}

/**
 * Child rollup (spec §3.3): always shows "children N/M" + the in_progress child
 * one-liner when children>0. Expanded by default (the toggle collapses it), the
 * children render as compact rows — status dot + ordinal + title — ordered by
 * `cmpChildOrder`; a row click opens the child in the detail panel. No per-child
 * stepper or chips. The created/updated meta sits on the right of the meta row.
 *
 * @param {BoardCardIssue} issue
 * @param {BoardCardContext} ctx
 * @returns {TemplateResult}
 */
function rollTemplate(issue, ctx) {
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
        ${timesTemplate(issue)}
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
      ${chipsTemplate(issue, ctx)}
      ${issue.workflow && isChipEnabled(ctx.policy || null, 'stepper')
        ? stepperTemplate(issue.workflow, issue.status)
        : ''}
      ${rollTemplate(issue, ctx)}
    </article>
  `;
}
