import { sessionPreferredReason } from './session-preferred.js';

export const WORKER_INELIGIBLE_LABEL = 'worker-ineligible';

/**
 * The beads-ui metadata key the `session-preferred` chip click writes (UI-lbm5
 * §4.1, UI-57us). Same standing as `applied_exec_preset`: a consumer-owned
 * key, not a contract key.
 */
export const EXEC_LANE_KEY = 'exec_lane';

/**
 * The one `exec_lane` value that opts a valid `session-preferred` Bead out of
 * the session lane into a headless Worker run (UI-57us).
 */
export const EXEC_LANE_WORKER = 'worker';

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
 *   - a valid `session-preferred` attachment (label AND enum reason) →
 *     `session`, unless its metadata `exec_lane` is `worker` (UI-57us). An
 *     absent key, a stored `session` and any other value all mean `session`.
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
    /** @type {any} */ (metadata)[EXEC_LANE_KEY] !== EXEC_LANE_WORKER
  ) {
    return 'session';
  }
  return 'worker';
}
