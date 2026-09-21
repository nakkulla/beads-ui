/**
 * Per-Bead retry lineages. The reducer never mutates its input or reads a clock.
 * Queue-wide stops are retired; one lineage cannot stop another Bead.
 */
import { RETRY_DELAYS_MS, RETRY_MAX } from './failure-class.js';

export { RETRY_DELAYS_MS, RETRY_MAX };

/**
 * @typedef {Object} RetryLineage
 * @property {string} bead_id
 * @property {string | null} origin_attempt_id
 * @property {string} cause
 * @property {number | null} next_at
 * @property {number} attempts
 * @property {number} [base_moved_count]
 */

/**
 * @typedef {{ lineages: RetryLineage[] }} RetryState
 * @typedef {Object} RetryScheduledEvent
 * @property {'retry_scheduled'} kind
 * @property {string} bead_id
 * @property {string} attempt_id
 * @property {string} cause
 * @property {number} [at]
 * @property {string} [origin_attempt_id]
 * @typedef {{ kind: 'retry_succeeded'|'retry_dispatched'|'retry_deferred'|'retry_now', bead_id: string, at?: number }} RetryUpdateEvent
 * @typedef {RetryScheduledEvent|RetryUpdateEvent} RetryEvent
 * @typedef {Object} RetryEffect
 * @property {'retry_scheduled'|'attempt_failed'} kind
 * @property {string} [bead_id]
 * @property {string} [attempt_id]
 * @property {string|null} [origin_attempt_id]
 * @property {number} [next_at]
 * @property {number} [attempts]
 * @typedef {{ state: RetryState, effects: RetryEffect[] }} RetryResult
 */

/**
 * @param {unknown} value
 * @returns {value is string}
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.length > 0;
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

/**
 * Malformed lineages are dropped; retired queue fields are never returned.
 *
 * @param {unknown} raw
 * @returns {RetryState}
 */
export function normalizeRetryState(raw) {
  /** @type {RetryState} */
  const state = { lineages: [] };
  if (!raw || typeof raw !== 'object') {
    return state;
  }
  const source = /** @type {Record<string, any>} */ (raw);
  if (!Array.isArray(source.lineages)) {
    return state;
  }
  for (const entry of source.lineages) {
    if (
      entry &&
      isNonEmptyString(entry.bead_id) &&
      isNonEmptyString(entry.cause)
    ) {
      state.lineages.push({
        bead_id: entry.bead_id,
        origin_attempt_id: isNonEmptyString(entry.origin_attempt_id)
          ? entry.origin_attempt_id
          : null,
        cause: entry.cause,
        next_at: isFiniteNumber(entry.next_at) ? entry.next_at : null,
        attempts: isFiniteNumber(entry.attempts) ? entry.attempts : 1,
        ...(isFiniteNumber(entry.base_moved_count)
          ? { base_moved_count: entry.base_moved_count }
          : {})
      });
    }
  }
  return state;
}

/**
 * @param {RetryState} state
 * @returns {number|null}
 */
export function earliestRetryAt(state) {
  /** @type {number|null} */
  let earliest = null;
  for (const lineage of state.lineages) {
    if (isFiniteNumber(lineage.next_at)) {
      if (earliest === null || lineage.next_at < earliest) {
        earliest = lineage.next_at;
      }
    }
  }
  return earliest;
}

/**
 * @param {RetryState} state
 * @param {number} now
 * @returns {RetryLineage[]}
 */
export function dueRetries(state, now) {
  return state.lineages.filter(
    (lineage) => isFiniteNumber(lineage.next_at) && lineage.next_at <= now
  );
}

/**
 * Each failure spends the next rung of the same lineage, even if its cause
 * changed. The first failure opens the ladder; the fourth exhausts three retries.
 *
 * @param {RetryState} state
 * @param {RetryScheduledEvent} event
 * @param {number} at
 * @returns {RetryResult}
 */
function scheduleRetry(state, event, at) {
  const index = state.lineages.findIndex(
    (lineage) => lineage.bead_id === event.bead_id
  );
  const prior = index === -1 ? null : state.lineages[index];
  const attempts = (prior?.attempts ?? 0) + 1;
  const base_moved_count =
    (prior?.base_moved_count ?? 0) + (event.cause === 'base_moved' ? 1 : 0);
  const exhausted =
    event.cause === 'base_moved' ? base_moved_count >= 3 : attempts > RETRY_MAX;
  const delay =
    event.cause === 'base_moved'
      ? RETRY_DELAYS_MS[0]
      : RETRY_DELAYS_MS[Math.min(attempts - 1, RETRY_DELAYS_MS.length - 1)];
  const next_at = exhausted ? null : at + delay;
  const origin_attempt_id =
    prior?.origin_attempt_id ?? event.origin_attempt_id ?? event.attempt_id;
  /** @type {RetryLineage} */
  const lineage = {
    bead_id: event.bead_id,
    origin_attempt_id,
    cause: event.cause,
    attempts,
    next_at,
    ...(base_moved_count > 0 ? { base_moved_count } : {})
  };
  const lineages =
    index === -1
      ? [...state.lineages, lineage]
      : state.lineages.map((entry, position) =>
          position === index ? lineage : entry
        );
  return {
    state: { lineages },
    effects: exhausted
      ? [{ kind: 'attempt_failed', attempt_id: event.attempt_id }]
      : [
          {
            kind: 'retry_scheduled',
            bead_id: event.bead_id,
            origin_attempt_id,
            attempts,
            next_at: /** @type {number} */ (next_at)
          }
        ]
  };
}

/**
 * @param {unknown} state
 * @param {RetryEvent} event
 * @param {number} now
 * @returns {RetryResult}
 */
export function reduceRetryState(state, event, now) {
  const current = normalizeRetryState(state);
  if (!event || !isNonEmptyString(event.bead_id)) {
    return { state: current, effects: [] };
  }
  const at = isFiniteNumber(event.at) ? event.at : now;
  if (event.kind === 'retry_scheduled') {
    return isNonEmptyString(event.cause)
      ? scheduleRetry(current, event, at)
      : { state: current, effects: [] };
  }
  if (event.kind === 'retry_succeeded') {
    return {
      state: {
        lineages: current.lineages.filter(
          (entry) => entry.bead_id !== event.bead_id
        )
      },
      effects: []
    };
  }
  if (
    !['retry_dispatched', 'retry_deferred', 'retry_now'].includes(event.kind)
  ) {
    return { state: current, effects: [] };
  }
  return {
    state: {
      lineages: current.lineages.map((lineage) =>
        lineage.bead_id === event.bead_id
          ? {
              ...lineage,
              next_at:
                event.kind === 'retry_dispatched'
                  ? null
                  : event.kind === 'retry_now'
                    ? at
                    : at + RETRY_DELAYS_MS[0]
            }
          : lineage
      )
    },
    effects: []
  };
}
