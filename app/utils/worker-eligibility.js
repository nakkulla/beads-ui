import { sessionPreferredReason } from './session-preferred.js';

export const WORKER_INELIGIBLE_LABEL = 'worker-ineligible';

/**
 * The beads-ui metadata key a `세션 권장` chip click writes (UI-lbm5 §4.1).
 * Same standing as `applied_exec_preset`: a consumer-owned key, not a contract
 * key.
 */
export const EXEC_LANE_KEY = 'exec_lane';

/** The one `exec_lane` value that selects the session lane. */
export const EXEC_LANE_SESSION = 'session';

/**
 * Keep only label entries the workflow contract can name.
 *
 * @param {unknown} value
 * @returns {string[]}
 */
export function workerLabels(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === 'string')
    : [];
}

/**
 * Whether a Bead is explicitly limited to the interactive lane.
 *
 * @param {unknown} labels
 * @returns {boolean}
 */
export function isWorkerIneligible(labels) {
  return workerLabels(labels).includes(WORKER_INELIGIBLE_LABEL);
}

/**
 * How a queued Bead runs (UI-lbm5 §4.1) — the ONE judgment the server
 * projection, the cards and the scheduler share:
 *
 *   - `worker-ineligible` → `session`, always.
 *   - a valid `session-preferred` attachment (label AND enum reason) whose
 *     metadata `exec_lane` is `session` → `session`.
 *   - anything else → `worker`. A stray `exec_lane` without a valid attachment
 *     is ignored (fail-quiet).
 *
 * @param {unknown} labels
 * @param {unknown} metadata
 * @returns {'worker'|'session'}
 */
export function execLaneOf(labels, metadata) {
  if (isWorkerIneligible(labels)) {
    return 'session';
  }
  if (
    sessionPreferredReason(labels, metadata) !== '' &&
    /** @type {any} */ (metadata)[EXEC_LANE_KEY] === EXEC_LANE_SESSION
  ) {
    return 'session';
  }
  return 'worker';
}
