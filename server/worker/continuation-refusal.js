/**
 * The one classification of continuation refusals (2026-10-01
 * transient-outage-stall-reconcile spec D1). The provider auto-resume retry
 * (D2) and the due-retry disposition (D3) both read it, so a refusal means the
 * same thing on either path.
 *
 * `transient` clears once the environment recovers, `wait` once another
 * condition does, `closed` means the bead is already closed, and every other
 * reason — including one this table has never heard of — is `permanent`, so
 * an unknown refusal is never retried forever.
 */

/** @typedef {'transient'|'wait'|'closed'|'permanent'} RefusalClass */

/** @type {ReadonlySet<string>} */
const TRANSIENT_REASONS = new Set([
  'bd_snapshot_failed',
  'gh_unavailable',
  'git_error',
  'receipt_unreachable',
  'workspace_accounts_unavailable',
  'default_exec_preset_resolution_unavailable',
  'default_exec_preset_resolution_failed',
  'exec_restore_capture_failed',
  'attempt_prerecord_failed',
  'guard_hook_install_failed'
]);

/** @type {ReadonlySet<string>} */
const WAIT_REASONS = new Set([
  'provider_gate',
  'prerequisite_unmet',
  'grace_period',
  'serial_lane_not_head',
  'serial_lane_occupied',
  'bead_running',
  'external_wait'
]);

/**
 * The admission badges D4 clears on the workspace's next successful bd read:
 * the `transient` reasons an admission check records.
 *
 * @type {ReadonlyArray<string>}
 */
export const TRANSIENT_ADMISSION_REASONS = Object.freeze([
  'bd_snapshot_failed',
  'gh_unavailable',
  'git_error'
]);

/**
 * Delay before the next automatic resume after the 1st, 2nd and 3rd
 * consecutive refusal; every later refusal waits the last entry (D2).
 *
 * @type {ReadonlyArray<number>}
 */
export const AUTO_RESUME_RETRY_DELAYS_MS = Object.freeze([
  5 * 60_000,
  15 * 60_000,
  30 * 60_000,
  60 * 60_000
]);

/**
 * Classify one refusal reason; an unlisted `not_ready:<status>` is a `wait`.
 *
 * @param {unknown} reason
 * @returns {RefusalClass}
 */
export function continuationRefusalClass(reason) {
  if (typeof reason !== 'string' || reason.length === 0) {
    return 'permanent';
  }
  if (reason === 'not_ready:closed') {
    return 'closed';
  }
  if (reason.startsWith('not_ready:')) {
    return 'wait';
  }
  if (TRANSIENT_REASONS.has(reason)) {
    return 'transient';
  }
  if (WAIT_REASONS.has(reason)) {
    return 'wait';
  }
  return 'permanent';
}

/**
 * Whether a refusal of this class is worth another automatic try.
 *
 * @param {RefusalClass} refusal_class
 * @returns {boolean}
 */
export function isRetryableRefusal(refusal_class) {
  return refusal_class === 'transient' || refusal_class === 'wait';
}

/**
 * The wait after the `count`-th consecutive refusal (count ≥ 1).
 *
 * @param {number} count
 * @returns {number}
 */
export function autoResumeRetryDelayMs(count) {
  const index = Math.min(
    Math.max(0, Math.floor(count) - 1),
    AUTO_RESUME_RETRY_DELAYS_MS.length - 1
  );
  return AUTO_RESUME_RETRY_DELAYS_MS[index];
}
