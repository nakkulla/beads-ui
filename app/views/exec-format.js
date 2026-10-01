/**
 * Shared execution-ownership formatters: `planned_execution` and `exec_receipt`
 * presentation used by the Worker running tiles and the issue detail panel.
 * These moved out of the retired Board card module when the Board tab was
 * retired (UI-p7s2 §7.3) — the Board was never their only reader.
 */

/**
 * One unit of an enumerated plan, ready to list (unit, 종류, 사유).
 *
 * @typedef {Object} PlannedExecutionUnitPresentation
 * @property {string} unit
 * @property {'delegated'|'main'} kind
 * @property {string} kind_label
 * @property {string | null} reason
 */

/**
 * @typedef {Object} PlannedExecutionPresentation
 * @property {'delegated'|'main'} kind - For an enumerated plan, `main` when any
 * unit is main (the one worth drawing attention to), else `delegated`.
 * @property {string} label
 * @property {string} title
 * @property {PlannedExecutionUnitPresentation[]} [units] - Present only for an
 * enumerated plan: one entry per unit, in plan order, for the popup and detail.
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
 * Whether a value is a reason a `main` plan may carry: non-blank, one line.
 *
 * @param {unknown} reason
 * @returns {reason is string}
 */
function validMainReason(reason) {
  return (
    typeof reason === 'string' &&
    reason.trim().length > 0 &&
    !/[\r\n]/.test(reason)
  );
}

/**
 * The enumerated form of {@link formatPlannedExecution}: the one-line
 * `계획 · 위임 n / 메인 m` summary plus the per-unit list. A unit with an
 * unreadable kind or reason makes the whole presentation `null` (fail-quiet).
 *
 * @param {unknown} units
 * @param {ExecReceipt | null | undefined} exec_receipt
 * @returns {PlannedExecutionPresentation | null}
 */
function formatPlannedUnits(units, exec_receipt) {
  if (!Array.isArray(units) || units.length === 0) {
    return null;
  }
  /** @type {PlannedExecutionUnitPresentation[]} */
  const presented = [];
  for (const entry of units) {
    const kind_label = executionKindLabel(entry?.kind);
    const valid_reason =
      entry?.kind === 'delegated'
        ? entry.reason === null
        : validMainReason(entry?.reason);
    if (!kind_label || !valid_reason || !entry.unit) {
      return null;
    }
    presented.push({
      unit: String(entry.unit),
      kind: entry.kind,
      kind_label,
      reason: entry.reason
    });
  }
  const main_units = presented.filter((entry) => entry.kind === 'main');
  const delegated_count = presented.length - main_units.length;
  const planned_summary = `planned_execution ${presented
    .map((entry) => `${entry.unit}:${entry.kind}`)
    .join('; ')}`;
  const reason_summary =
    main_units.length > 0
      ? ` · planned_execution_reason ${main_units
          .map((entry) => `${entry.unit}:${entry.reason}`)
          .join('; ')}`
      : '';
  const actual_summary = exec_receipt
    ? ` · exec_receipt ${formatExecReceipt(exec_receipt)}`
    : '';
  return {
    kind: main_units.length > 0 ? 'main' : 'delegated',
    label: `계획 · 위임 ${delegated_count} / 메인 ${main_units.length}`,
    title: `${planned_summary}${reason_summary}${actual_summary}`,
    units: presented
  };
}

/**
 * Shared planned/actual label and tooltip formatter for cards, folded rows,
 * and the detail summary. Inputs are normalized workflow objects, never raw
 * metadata strings. A plan the server normalized as `{ units }` yields the
 * summary label plus the per-unit list; the scalar forms are unchanged.
 *
 * @param {{ kind: string, reason: string | null } | { units: unknown[] } | null | undefined} planned_execution
 * @param {ExecReceipt | null | undefined} exec_receipt
 * @returns {PlannedExecutionPresentation | null}
 */
export function formatPlannedExecution(planned_execution, exec_receipt) {
  if (!planned_execution) {
    return null;
  }
  if ('units' in planned_execution) {
    return formatPlannedUnits(planned_execution.units, exec_receipt);
  }
  const planned_label = executionKindLabel(planned_execution.kind);
  const reason = planned_execution.reason;
  const valid_reason =
    planned_execution.kind === 'delegated'
      ? reason === null
      : validMainReason(reason);
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
