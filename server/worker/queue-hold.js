/**
 * Queue hold reducer (2026-08-28 `worker-failure-tiers-queue-hold` spec §4).
 *
 * `failure-class.js` judges ONE attempt; this module owns everything that needs
 * a queue's memory: the env backoff ladder, release on retry success, promotion
 * to a systemic stop, and the 30-minute cross-bead repetition rule.
 *
 * The reducer is pure — it never mutates the state it is given and never reads
 * a clock of its own. Callers pass `now`, and every event may carry its own
 * `at`; `at` wins when present so a replay reproduces the same transitions.
 *
 * Effects are the reducer's only output channel to the scheduler. They describe
 * what the caller must do (schedule a retry, fail an attempt, redispatch beads)
 * and never carry state the caller could read back off the returned state.
 */
import { RETRY_DELAYS_MS, RETRY_MAX } from './failure-class.js';

export { RETRY_DELAYS_MS, RETRY_MAX };

/**
 * @typedef {'env' | 'systemic'} HoldKind
 */

/**
 * @typedef {Object} QueueHold
 * @property {HoldKind} kind
 * @property {string} cause
 * @property {number} since
 * @property {string[]} bead_ids
 * @property {string | null} [halted_by_attempt_id]
 */

/**
 * @typedef {Object} RetryLineage
 * @property {string} bead_id
 * @property {string | null} origin_attempt_id
 * @property {string} cause
 * @property {number | null} next_at
 * @property {number} attempts
 */

/**
 * @typedef {Object} HoldHistoryEntry
 * @property {string} bead_id
 * @property {string} cause
 * @property {number} at
 */

/**
 * @typedef {Object} QueueHoldState
 * @property {QueueHold | null} hold
 * @property {RetryLineage[]} lineages
 * @property {HoldHistoryEntry[]} hold_history
 */

/**
 * @typedef {Object} EnvFailureEvent
 * @property {'env_failure'} kind
 * @property {string} bead_id
 * @property {string} attempt_id
 * @property {string} cause
 * @property {number} [at]
 * @property {string} [origin_attempt_id]
 */

/**
 * @typedef {Object} SystemicFailureEvent
 * @property {'systemic_failure'} kind
 * @property {string} bead_id
 * @property {string} [attempt_id]
 * @property {string} cause
 * @property {number} [at]
 */

/**
 * @typedef {Object} RetrySucceededEvent
 * @property {'retry_succeeded'} kind
 * @property {string} bead_id
 * @property {number} [at]
 */

/**
 * @typedef {Object} RetryDispatchedEvent
 * @property {'retry_dispatched'} kind
 * @property {string} bead_id
 * @property {string} [attempt_id]
 * @property {number} [at]
 */

/**
 * @typedef {Object} ResumeEvent
 * @property {'resume'} kind
 * @property {number} [at]
 */

/**
 * @typedef {Object} RetryNowEvent
 * @property {'retry_now'} kind
 * @property {number} [at]
 */

/**
 * @typedef {EnvFailureEvent | SystemicFailureEvent | RetrySucceededEvent
 *   | RetryDispatchedEvent | ResumeEvent | RetryNowEvent} QueueHoldEvent
 */

/**
 * @typedef {Object} QueueHoldEffect
 * @property {'retry_scheduled' | 'attempt_failed' | 'promoted' | 'redispatch'} kind
 * @property {string} [bead_id]
 * @property {string} [attempt_id]
 * @property {string | null} [origin_attempt_id]
 * @property {string} [cause]
 * @property {number} [next_at]
 * @property {number} [attempts]
 * @property {string[]} [bead_ids]
 */

/**
 * @typedef {Object} QueueHoldResult
 * @property {QueueHoldState} state
 * @property {QueueHoldEffect[]} effects
 */

/** Window of the cross-bead repetition rule (spec §3.3). */
export const HOLD_HISTORY_WINDOW_MS = 30 * 60 * 1000;

/**
 * @returns {QueueHoldState}
 */
function emptyState() {
  return { hold: null, lineages: [], hold_history: [] };
}

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
 * @param {Iterable<string>} values
 * @returns {string[]}
 */
function dedupe(values) {
  /** @type {string[]} */
  const out = [];
  for (const value of values) {
    if (isNonEmptyString(value) && !out.includes(value)) {
      out.push(value);
    }
  }
  return out;
}

/**
 * Tolerant loader for the durable `queue.json` fields (spec §4). Malformed
 * entries are dropped rather than rejected: a queue must still start when one
 * record was written by an older shape.
 *
 * @param {unknown} raw
 * @param {number} [now] - prunes history older than the 30-minute window.
 * @returns {QueueHoldState}
 */
export function normalizeHoldState(raw, now) {
  if (!raw || typeof raw !== 'object') {
    return emptyState();
  }
  const source = /** @type {Record<string, any>} */ (raw);
  const state = emptyState();

  const hold = source.hold;
  if (
    hold &&
    typeof hold === 'object' &&
    (hold.kind === 'env' || hold.kind === 'systemic') &&
    isNonEmptyString(hold.cause) &&
    isFiniteNumber(hold.since)
  ) {
    state.hold = {
      kind: hold.kind,
      cause: hold.cause,
      since: hold.since,
      bead_ids: dedupe(Array.isArray(hold.bead_ids) ? hold.bead_ids : []),
      halted_by_attempt_id: isNonEmptyString(hold.halted_by_attempt_id)
        ? hold.halted_by_attempt_id
        : null
    };
  }

  if (Array.isArray(source.lineages)) {
    for (const entry of source.lineages) {
      if (
        entry &&
        typeof entry === 'object' &&
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
          attempts: isFiniteNumber(entry.attempts) ? entry.attempts : 1
        });
      }
    }
  }

  if (Array.isArray(source.hold_history)) {
    for (const entry of source.hold_history) {
      if (
        entry &&
        typeof entry === 'object' &&
        isNonEmptyString(entry.bead_id) &&
        isNonEmptyString(entry.cause) &&
        isFiniteNumber(entry.at)
      ) {
        state.hold_history.push({
          bead_id: entry.bead_id,
          cause: entry.cause,
          at: entry.at
        });
      }
    }
  }
  state.hold_history = pruneHistory(state.hold_history, now);

  return state;
}

/**
 * @param {HoldHistoryEntry[]} history
 * @param {number} [now]
 * @returns {HoldHistoryEntry[]}
 */
function pruneHistory(history, now) {
  if (!isFiniteNumber(now)) {
    return history;
  }
  return history.filter((entry) => now - entry.at <= HOLD_HISTORY_WINDOW_MS);
}

/**
 * Retry delay for the failure that brings a lineage to `attempts`. The ladder
 * is clamped so a lineage can never index past its last rung.
 *
 * @param {number} attempts
 */
function retryDelayMs(attempts) {
  const index = Math.min(Math.max(attempts - 1, 0), RETRY_DELAYS_MS.length - 1);
  return RETRY_DELAYS_MS[index];
}

/**
 * Earliest scheduled retry across all lineages, ignoring lineages already in
 * flight (`next_at === null`).
 *
 * @param {QueueHoldState} state
 * @returns {number | null}
 */
export function earliestRetryAt(state) {
  /** @type {number | null} */
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
 * Lineages whose retry is due at `now`.
 *
 * @param {QueueHoldState} state
 * @param {number} now
 * @returns {RetryLineage[]}
 */
export function dueRetries(state, now) {
  return state.lineages.filter(
    (lineage) => isFiniteNumber(lineage.next_at) && lineage.next_at <= now
  );
}

/**
 * @param {QueueHoldState} state
 * @param {string} bead_id
 * @param {string} cause
 * @param {number} at
 * @returns {string[]}
 */
function systemicBeadIds(state, bead_id, cause, at) {
  return dedupe([
    ...(state.hold ? state.hold.bead_ids : []),
    ...state.lineages.map((lineage) => lineage.bead_id),
    ...state.hold_history
      .filter(
        (entry) =>
          entry.cause === cause && at - entry.at <= HOLD_HISTORY_WINDOW_MS
      )
      .map((entry) => entry.bead_id),
    bead_id
  ]);
}

/**
 * @param {QueueHoldState} state
 * @param {EnvFailureEvent} event
 * @param {number} at
 * @returns {QueueHoldResult}
 */
function reduceEnvFailure(state, event, at) {
  const bead_id = event.bead_id;
  const cause = event.cause;
  const history = pruneHistory(
    [...state.hold_history, { bead_id, cause, at }],
    at
  );

  // A systemic stop already holds the queue: record the bead and fail the
  // attempt, but do not open a retry ladder underneath the stop.
  if (state.hold && state.hold.kind === 'systemic') {
    return {
      state: {
        hold: {
          ...state.hold,
          bead_ids: dedupe([...state.hold.bead_ids, bead_id])
        },
        lineages: state.lineages.map((lineage) => ({ ...lineage })),
        hold_history: history
      },
      effects: [{ kind: 'attempt_failed', attempt_id: event.attempt_id }]
    };
  }

  const index = state.lineages.findIndex(
    (lineage) => lineage.bead_id === bead_id
  );

  // Promotion (spec §3.3): the same cause already burned a DIFFERENT bead,
  // either as a live lineage or within the 30-minute history window.
  const repeated_on_other_bead =
    index === -1 &&
    (state.lineages.some(
      (lineage) => lineage.cause === cause && lineage.bead_id !== bead_id
    ) ||
      state.hold_history.some(
        (entry) =>
          entry.cause === cause &&
          entry.bead_id !== bead_id &&
          at - entry.at <= HOLD_HISTORY_WINDOW_MS
      ));

  const attempts = index === -1 ? 1 : state.lineages[index].attempts + 1;
  // `RETRY_MAX` counts RETRIES, not failures: the first failure opens the
  // lineage and each of the three ladder rungs buys one retry, so promotion is
  // the failure AFTER the last rung (`attempts > RETRY_MAX`). Promoting at
  // `>=` would spend only two rungs and leave `RETRY_DELAYS_MS[2]` dead.
  const exhausted = index !== -1 && attempts > RETRY_MAX;

  if (repeated_on_other_bead || exhausted) {
    const lineages = state.lineages.map((lineage, position) =>
      position === index
        ? { ...lineage, cause, attempts, next_at: null }
        : { ...lineage }
    );
    return {
      state: {
        hold: {
          kind: 'systemic',
          cause,
          since: at,
          bead_ids: systemicBeadIds(state, bead_id, cause, at),
          halted_by_attempt_id: event.attempt_id
        },
        lineages,
        hold_history: history
      },
      effects: [
        { kind: 'attempt_failed', attempt_id: event.attempt_id },
        { kind: 'promoted', cause }
      ]
    };
  }

  const next_at = at + retryDelayMs(attempts);
  const origin_attempt_id =
    index === -1
      ? (event.origin_attempt_id ?? event.attempt_id)
      : state.lineages[index].origin_attempt_id;
  /** @type {RetryLineage} */
  const lineage = {
    bead_id,
    origin_attempt_id: origin_attempt_id ?? null,
    cause,
    next_at,
    attempts
  };
  const lineages =
    index === -1
      ? [...state.lineages.map((entry) => ({ ...entry })), lineage]
      : state.lineages.map((entry, position) =>
          position === index ? lineage : { ...entry }
        );

  /** @type {QueueHold} */
  const hold =
    state.hold === null
      ? {
          kind: 'env',
          cause,
          since: at,
          bead_ids: [bead_id],
          halted_by_attempt_id: null
        }
      : { ...state.hold, bead_ids: dedupe([...state.hold.bead_ids, bead_id]) };

  return {
    state: { hold, lineages, hold_history: history },
    effects: [
      {
        kind: 'retry_scheduled',
        bead_id,
        origin_attempt_id: lineage.origin_attempt_id,
        next_at,
        attempts
      }
    ]
  };
}

/**
 * A `systemic` tier failure (spec §3.4) stops the queue on FIRST sight: there
 * is no ladder to climb and no repetition to wait for. An env hold underneath
 * is overwritten rather than merged — a systemic stop is strictly stronger —
 * but the lineages are preserved, so `재개` still redispatches the beads that
 * were mid-retry when the wall appeared.
 *
 * @param {QueueHoldState} state
 * @param {SystemicFailureEvent} event
 * @param {number} at
 * @returns {QueueHoldResult}
 */
function reduceSystemicFailure(state, event, at) {
  const already_systemic =
    state.hold !== null && state.hold.kind === 'systemic';
  /** @type {QueueHold} */
  const hold = already_systemic
    ? {
        .../** @type {QueueHold} */ (state.hold),
        bead_ids: dedupe([
          .../** @type {QueueHold} */ (state.hold).bead_ids,
          event.bead_id
        ])
      }
    : {
        kind: 'systemic',
        cause: event.cause,
        since: at,
        bead_ids: dedupe([
          ...(state.hold ? state.hold.bead_ids : []),
          ...state.lineages.map((lineage) => lineage.bead_id),
          event.bead_id
        ]),
        halted_by_attempt_id: isNonEmptyString(event.attempt_id)
          ? event.attempt_id
          : null
      };
  return {
    state: {
      hold,
      lineages: state.lineages.map((lineage) => ({ ...lineage })),
      hold_history: [...state.hold_history]
    },
    effects: already_systemic ? [] : [{ kind: 'promoted', cause: event.cause }]
  };
}

/**
 * @param {QueueHoldState} state
 * @param {RetrySucceededEvent} event
 * @returns {QueueHoldResult}
 */
function reduceRetrySucceeded(state, event) {
  const lineages = state.lineages
    .filter((lineage) => lineage.bead_id !== event.bead_id)
    .map((lineage) => ({ ...lineage }));

  /** @type {QueueHold | null} */
  let hold = state.hold === null ? null : { ...state.hold };
  if (hold !== null && hold.kind === 'env') {
    // Two lineages with different causes can share one env hold; a single
    // recovery must not release the other one (spec §3.3).
    hold =
      lineages.length === 0
        ? null
        : {
            ...hold,
            bead_ids: hold.bead_ids.filter((id) => id !== event.bead_id)
          };
  }

  return {
    state: { hold, lineages, hold_history: [...state.hold_history] },
    effects: []
  };
}

/**
 * @param {QueueHoldState} state
 * @returns {QueueHoldResult}
 */
function reduceResume(state) {
  if (state.hold === null) {
    return { state, effects: [] };
  }
  const bead_ids = dedupe([
    ...state.hold.bead_ids,
    ...state.lineages.map((lineage) => lineage.bead_id)
  ]);
  // History is cleared with the hold: keeping it would let the very next env
  // failure re-promote through the 30-minute rule the user just acknowledged.
  return {
    state: { hold: null, lineages: [], hold_history: [] },
    effects: [{ kind: 'redispatch', bead_ids }]
  };
}

/**
 * @param {QueueHoldState} state
 * @param {number} at
 * @returns {QueueHoldResult}
 */
function reduceRetryNow(state, at) {
  if (state.hold === null || state.hold.kind !== 'env') {
    return { state, effects: [] };
  }
  return {
    state: {
      hold: { ...state.hold },
      lineages: state.lineages.map((lineage) => ({ ...lineage, next_at: at })),
      hold_history: [...state.hold_history]
    },
    effects: []
  };
}

/**
 * @param {QueueHoldState} state
 * @param {RetryDispatchedEvent} event
 * @returns {QueueHoldResult}
 */
function reduceRetryDispatched(state, event) {
  return {
    state: {
      hold: state.hold === null ? null : { ...state.hold },
      lineages: state.lineages.map((lineage) =>
        lineage.bead_id === event.bead_id
          ? { ...lineage, next_at: null }
          : { ...lineage }
      ),
      hold_history: [...state.hold_history]
    },
    effects: []
  };
}

/**
 * Apply one queue event to the hold state.
 *
 * @param {unknown} state - durable state; tolerated in any shape.
 * @param {QueueHoldEvent} event
 * @param {number} now
 * @returns {QueueHoldResult}
 */
export function reduceQueueHold(state, event, now) {
  const current = normalizeHoldState(state, now);
  if (!event || typeof event !== 'object') {
    return { state: current, effects: [] };
  }
  const at = isFiniteNumber(event.at) ? event.at : now;

  switch (event.kind) {
    case 'env_failure': {
      if (!isNonEmptyString(event.bead_id) || !isNonEmptyString(event.cause)) {
        return { state: current, effects: [] };
      }
      return reduceEnvFailure(current, event, at);
    }
    case 'systemic_failure': {
      if (!isNonEmptyString(event.bead_id) || !isNonEmptyString(event.cause)) {
        return { state: current, effects: [] };
      }
      return reduceSystemicFailure(current, event, at);
    }
    case 'retry_succeeded': {
      if (!isNonEmptyString(event.bead_id)) {
        return { state: current, effects: [] };
      }
      return reduceRetrySucceeded(current, event);
    }
    case 'retry_dispatched': {
      if (!isNonEmptyString(event.bead_id)) {
        return { state: current, effects: [] };
      }
      return reduceRetryDispatched(current, event);
    }
    case 'resume':
      return reduceResume(current);
    case 'retry_now':
      return reduceRetryNow(current, at);
    default:
      // Fail-quiet: an unknown event leaves the queue exactly as it was.
      return { state: current, effects: [] };
  }
}
