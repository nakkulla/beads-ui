import { html } from 'lit-html';
import { isForeignBlocker } from '../../utils/blocker-scope.js';
import { isChipEnabled, visibleLabels } from '../../utils/label-policy.js';
import {
  coerceTimestampMs,
  formatRelativeTime,
  formatTimestampLocal
} from '../../utils/relative-time.js';
import { childRollupTemplate } from '../child-rollup.js';
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
 * @property {{ kind: 'delegated'|'main', reason: string | null } | null} [planned_execution]
 * @property {ExecReceipt | null} [exec_receipt]
 * @property {{ actor: string, sha: string } | null} [impl_entry]
 * @property {{ attempt: string, prior_sha: string, sha: string } | null} [resolver]
 */

/**
 * @typedef {Object} BoardCardBlockedInfo
 * @property {boolean} external - Stored `status=blocked`: waiting on something outside the tracker.
 * @property {string | null} reason - Short `metadata.blocked_reason`, when set.
 * @property {string[]} blockers - Bead ids that must land first.
 */

/**
 * The rollup row/shape the shared `childRollupTemplate` consumes. Aliased
 * rather than restated so Board and Worker cannot drift into two child shapes.
 *
 * @typedef {import('../../utils/child-rollup.js').ChildRow} BoardCardChild
 */

/**
 * @typedef {import('../../utils/child-rollup.js').ChildRollup} BoardCardRollup
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
 * @property {import('./stepper.js').OpenDocHandler} [onOpenDoc] - Opens the
 * spec/plan document behind a stepper cell; absent leaves the stepper static.
 * @property {(id: string) => Record<string, unknown>|null} [cleanupFailureFor]
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
 * One dependency-blocked chip's text, sharing the `+n` collapse rule across
 * both scopes so the two chips read as one vocabulary.
 *
 * @param {string[]} blockers
 */
function dependencyChipLabel(blockers) {
  const shown = blockers.slice(0, BLOCKER_PREVIEW_COUNT).join(', ');
  const rest = blockers.length - BLOCKER_PREVIEW_COUNT;
  return `⛓ blocked: ${shown}${rest > 0 ? ` +${rest}` : ''}`;
}

/**
 * Render the blocked-reason chips. The two blockers are independent, so a bead
 * that is both externally blocked and dependency-blocked shows both chips:
 *
 * - `⏸` external — a stored `status=blocked`, optionally with a short reason,
 * - `⛓` dependency — the beads that must land first.
 *
 * A dependency-blocked bead splits into at most two `⛓` chips — same-repo and
 * 타 레포 ({@link isForeignBlocker}) — because the ids collapse into ONE chip
 * text and one chip cannot carry two colors. The wording stays identical; only
 * the color says the blocker sits outside this repository, where closing it is
 * not this board's to do.
 *
 * @param {string} owner_id
 * @param {BoardCardBlockedInfo | undefined} blocked_info
 * @returns {TemplateResult[]}
 */
function blockedChips(owner_id, blocked_info) {
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
  /** @type {string[]} */
  const same_repo = [];
  /** @type {string[]} */
  const foreign = [];
  for (const id of blockers) {
    (isForeignBlocker(owner_id, id) ? foreign : same_repo).push(id);
  }
  if (same_repo.length > 0) {
    items.push(
      html`<span class="ctl-chip ctl-chip--blocked-dep"
        >${dependencyChipLabel(same_repo)}</span
      >`
    );
  }
  if (foreign.length > 0) {
    items.push(
      html`<span class="ctl-chip ctl-chip--blocked-foreign"
        >${dependencyChipLabel(foreign)}</span
      >`
    );
  }
  return items;
}

/**
 * @typedef {Object} PlannedExecutionPresentation
 * @property {'delegated'|'main'} kind
 * @property {string} label
 * @property {string} title
 */

/**
 * Korean display label for normalized execution ownership.
 *
 * @param {unknown} kind
 * @returns {string | null}
 */
function executionKindLabel(kind) {
  if (kind === 'delegated') {
    return '위임';
  }
  if (kind === 'main') {
    return '메인';
  }
  return null;
}

/**
 * @typedef {Object} ExecReceipt
 * @property {string} kind
 * @property {string} actor
 * @property {string | null} effort - Resolved dispatch effort on a delegated
 * receipt; `null` on `main:` receipts and on historical delegated ones written
 * before the contract carried the segment.
 * @property {string} sha
 */

/**
 * The receipt's actor as the contract writes it: `<model>:<effort>` when the
 * dispatch pinned an effort, the bare actor otherwise. Keeping the two joined
 * here means every display that shows an actor stays lossless.
 *
 * @param {ExecReceipt} exec_receipt
 */
export function execReceiptActor(exec_receipt) {
  return exec_receipt.effort
    ? `${exec_receipt.actor}:${exec_receipt.effort}`
    : exec_receipt.actor;
}

/**
 * The full receipt string as stored in metadata, rebuilt from the normalized
 * object so tooltips and key/value rows never drop the effort segment.
 *
 * @param {ExecReceipt} exec_receipt
 */
export function formatExecReceipt(exec_receipt) {
  return `${exec_receipt.kind}:${execReceiptActor(exec_receipt)}@${exec_receipt.sha}`;
}

/**
 * Shared planned/actual label and tooltip formatter for cards, folded rows,
 * and the detail summary. Inputs are normalized workflow objects, never raw
 * metadata strings.
 *
 * @param {{ kind: string, reason: string | null } | null | undefined} planned_execution
 * @param {ExecReceipt | null | undefined} exec_receipt
 * @returns {PlannedExecutionPresentation | null}
 */
export function formatPlannedExecution(planned_execution, exec_receipt) {
  if (!planned_execution) {
    return null;
  }
  const planned_label = executionKindLabel(planned_execution.kind);
  const reason = planned_execution.reason;
  const valid_reason =
    planned_execution.kind === 'delegated'
      ? reason === null
      : typeof reason === 'string' &&
        reason.trim().length > 0 &&
        !/[\r\n]/.test(reason);
  if (!planned_label || !valid_reason) {
    return null;
  }
  const actual_label = executionKindLabel(exec_receipt?.kind);
  const mismatch =
    actual_label !== null && exec_receipt?.kind !== planned_execution.kind;
  const label = `계획 · ${planned_label}${mismatch ? ` → ${actual_label}` : ''}`;
  const planned_summary = `planned_execution ${planned_execution.kind}${typeof reason === 'string' ? `:${reason}` : ''}`;
  const actual_summary = exec_receipt
    ? ` · exec_receipt ${formatExecReceipt(exec_receipt)}`
    : '';
  return {
    kind: /** @type {'delegated'|'main'} */ (planned_execution.kind),
    label,
    title: `${planned_summary}${actual_summary}`
  };
}

/**
 * @param {{ kind: string, reason: string | null } | null | undefined} planned_execution
 * @param {ExecReceipt | null | undefined} exec_receipt
 * @returns {TemplateResult | null}
 */
function plannedExecutionChip(planned_execution, exec_receipt) {
  const presentation = formatPlannedExecution(planned_execution, exec_receipt);
  return presentation
    ? html`<span
        class="ctl-chip ctl-chip--planned"
        data-kind=${presentation.kind}
        title=${presentation.title}
        >${presentation.label}</span
      >`
    : null;
}

/**
 * @param {ExecReceipt | null | undefined} exec_receipt
 * @returns {TemplateResult | null}
 */
function compactExecutionChip(exec_receipt) {
  if (!exec_receipt) {
    return null;
  }
  const label = executionKindLabel(exec_receipt.kind);
  if (!label) {
    return null;
  }
  return html`<span
    class="ctl-chip ctl-chip--exec-receipt"
    title=${`exec_receipt ${formatExecReceipt(exec_receipt)}`}
    >${`실행 · ${label}`}</span
  >`;
}

/**
 * Card chips row: route · ⚡fast_track · PR #n · ⚑ conflict resolution ·
 * labels · ↩ provenance · blocked reason. The PR chip is present only when a pr_url produced one
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
  const planned_chip = plannedExecutionChip(
    chips.planned_execution,
    chips.exec_receipt
  );
  if (planned_chip) {
    items.push(planned_chip);
  }
  if (chips.exec_receipt) {
    const receipt = chips.exec_receipt;
    items.push(
      html`<span
        class="ctl-chip ctl-chip--exec-receipt"
        title=${`exec_receipt ${formatExecReceipt(receipt)}`}
        >${`exec ${receipt.kind === 'delegated' ? execReceiptActor(receipt) : `main:${receipt.actor}`} · ${receipt.sha.slice(0, 7)}`}</span
      >`
    );
  }
  if (chips.impl_entry) {
    const entry = chips.impl_entry;
    items.push(
      html`<span
        class="ctl-chip ctl-chip--impl-entry"
        title=${`impl_entry ${entry.actor}@${entry.sha}`}
        >${`impl ${entry.actor} · ${entry.sha.slice(0, 7)}`}</span
      >`
    );
  }
  if (chips.resolver) {
    const resolver = chips.resolver;
    items.push(
      html`<span
        class="ctl-chip ctl-chip--resolver"
        title=${`impl_review resolver-self:${resolver.attempt} · ${resolver.prior_sha.slice(0, 7)} → ${resolver.sha.slice(0, 7)}`}
        >⚑ 충돌 해소</span
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
    items.push(...blockedChips(issue.id, issue.blocked_info));
  }
  const cleanup_failure = ctx.cleanupFailureFor
    ? ctx.cleanupFailureFor(issue.id)
    : null;
  if (cleanup_failure && isChipEnabled(policy, 'blocked')) {
    items.push(
      html`<span class="ctl-chip ctl-chip--cleanup">⚠ 정리 멈춤</span>`
    );
  }
  if (items.length === 0) {
    return '';
  }
  return html`<div class="board-card__chips">${items}</div>`;
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
 * @returns {TemplateResult | string}
 */
function rollTemplate(issue, ctx) {
  const rollup = ctx.rollupFor
    ? ctx.rollupFor(issue.id)
    : { total: 0, count: 0, current: null, children: [] };
  return childRollupTemplate(rollup, {
    parent_id: issue.id,
    // Expanded unless the caller explicitly collapsed this card (default open).
    expanded: ctx.isExpanded ? ctx.isExpanded(issue.id) : true,
    trailing: timesTemplate(issue),
    empty_label: 'children 없음',
    childChips: childExecChips,
    onToggle: (ev) => ctx.onRollupToggle && ctx.onRollupToggle(ev, issue.id),
    onChildClick: (ev, child_id) =>
      ctx.onChildClick && ctx.onChildClick(ev, child_id)
  });
}

/**
 * Per-child execution chips inside a rollup row: the planned delegation and the
 * receipt of what actually ran. Null when the child has neither.
 *
 * @param {any} child
 * @returns {TemplateResult | null}
 */
export function childExecChips(child) {
  const planned_execution = child?.workflow?.chips?.planned_execution;
  const exec_receipt = child?.workflow?.chips?.exec_receipt;
  if (!formatPlannedExecution(planned_execution, exec_receipt)) {
    return null;
  }
  return html`<span class="board-card__roll-child-chips">
    ${plannedExecutionChip(planned_execution, exec_receipt)}
    ${compactExecutionChip(exec_receipt)}
  </span>`;
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
        ? stepperTemplate(issue.workflow, issue.status, {
            onOpenDoc: ctx.onOpenDoc
          })
        : ''}
      ${rollTemplate(issue, ctx)}
    </article>
  `;
}
