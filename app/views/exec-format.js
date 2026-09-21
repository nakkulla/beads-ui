import { html } from 'lit-html';

/**
 * Shared execution-ownership formatters: `planned_execution` and `exec_receipt`
 * presentation used by the Worker running tiles, the child rollup chips and the
 * issue detail panel. These moved out of the retired Board card module when the
 * Board tab was retired (UI-p7s2 §7.3) — the Board was never their only reader.
 */

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

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
 * Planned/actual execution chips for one rollup child row. Renders nothing when
 * the child carries no valid `planned_execution` presentation.
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
  return html`<span class="worker-card__roll-child-chips">
    ${plannedExecutionChip(planned_execution, exec_receipt)}
    ${compactExecutionChip(exec_receipt)}
  </span>`;
}
