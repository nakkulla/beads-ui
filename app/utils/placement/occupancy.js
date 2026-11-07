/**
 * What the store's `place-bundle` would do with a waiting or lane-occupying
 * bead (UI-blx2 §3.1, §3.4), read off one `worker-queue` snapshot: take it as
 * a step, bind it to a lane, or neither.
 *
 * The store judges on `queue.json` (`server/worker/queue-store.js`
 * `placeBundle`: `member_active`, `member_occupant`, `bind_holds_lane`,
 * `bind_not_holdable`). That module reads the filesystem and cannot load in the
 * browser, so the two status sets below are copies — a test pins them to the
 * store's exports. Two differences stay, both inherited from the wire: "latest"
 * is the timestamp order of `latestImplementationAttempts`, because the
 * snapshot's key order is not the store's insertion order (`lane-model.js`
 * `lastImplementationStatus`), and a lane held through a lineage root reads
 * from the server's own `lane_states`.
 */
import { discardOperationActive } from '../../../server/worker/discard-phase.js';
import {
  activeAttemptStates,
  isImplementationAttempt,
  latestImplementationAttempts
} from '../active-attempts.js';

/**
 * Copy of the store's `TERMINAL_ATTEMPT_STATUSES`: an attempt in any other
 * status still owns its bead, and the store refuses that bead as a step.
 *
 * @type {ReadonlySet<string>}
 */
export const TERMINAL_ATTEMPT_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped',
  'discarded',
  'parked',
  'retry_wait',
  'superseded',
  'waiting'
]);

/**
 * Copy of the store's `LANE_RELEASING_ATTEMPT_STATUSES`: the statuses that let
 * go of a serial lane.
 *
 * @type {ReadonlySet<string>}
 */
export const LANE_RELEASING_ATTEMPT_STATUSES = new Set([
  'done',
  'stopped',
  'discarded',
  'waiting'
]);

/** @type {ReadonlyArray<string>} */
const SERIAL_IDS = ['s1', 's2', 's3', 's4', 's5'];

/**
 * @typedef {Object} BeadOccupancy
 * @property {boolean} occupant - The store refuses the bead as a `place` or
 * `place-bundle` step: it runs, waits on a PR, has a discard in flight, or has
 * an implementation attempt that holds — or, stamped with a lane, would hold —
 * a serial lane.
 * @property {string|null} held_lane - The serial lane (`s1`..`s5`, configured
 * or hidden) the bead's own records hold now.
 * @property {boolean} bindable - The store would take the bead as `binds`: it
 * holds no serial lane and has an unshelved `pr_wait` row or a lane-holding
 * implementation attempt, and no discard is in flight.
 * @property {'discard_active'|'not_holdable'|null} bind_refusal - Why the
 * store would refuse a lane-less occupant as `binds` (`discard_active`, or
 * `bind_not_holdable` for an occupant with neither an unshelved `pr_wait` row
 * nor a lane-holding implementation attempt); null when the bead is no such
 * occupant.
 * @property {string|null} state - What the bead is doing, for the bind line:
 * the 실행중 seat state (`running`·`paused`·`failed`), `pr_wait`, or the latest
 * implementation status of a lane-holding attempt (`parked`·`retry_wait`·…).
 */

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * @param {unknown} lane
 * @returns {lane is string}
 */
function isSerialId(lane) {
  return typeof lane === 'string' && SERIAL_IDS.includes(lane);
}

/**
 * @param {any} attempt
 * @returns {number}
 */
function timeOf(attempt) {
  return attempt.started_at ?? attempt.finished_at ?? 0;
}

/**
 * Build the occupancy reader of one snapshot. Every bead is judged on first
 * read and remembered.
 *
 * @param {Record<string, any>} queue - `worker-queue` snapshot.
 * @param {Map<string, number>} done_at_by_bead - `done` rows' `added_at`.
 * @returns {(bead_id: string) => BeadOccupancy}
 */
export function occupancyReader(queue, done_at_by_bead) {
  const attempts = objectOf(queue.attempts);
  /** @type {Map<string, any[]>} */
  const attempts_by_bead = new Map();
  /** @type {Set<string>} */
  const resumed_ids = new Set();
  for (const attempt of Object.values(attempts)) {
    if (!attempt || typeof attempt.bead_id !== 'string') {
      continue;
    }
    const list = attempts_by_bead.get(attempt.bead_id) || [];
    list.push(attempt);
    attempts_by_bead.set(attempt.bead_id, list);
    if (typeof attempt.resumed_from === 'string' && attempt.resumed_from) {
      resumed_ids.add(attempt.resumed_from);
    }
  }
  const latest_implementation = latestImplementationAttempts(attempts);
  const seats = activeAttemptStates(attempts, done_at_by_bead).winners;
  const shelved = objectOf(queue.merge_shelved);
  /** @type {Map<string, any>} */
  const pr_wait = new Map();
  for (const entry of Array.isArray(queue.pr_wait) ? queue.pr_wait : []) {
    // An external overlay row is a session's PR, not a store row: the store
    // neither refuses nor binds a bead by it.
    if (entry && typeof entry.bead_id === 'string' && entry.external !== true) {
      pr_wait.set(entry.bead_id, entry);
    }
  }
  /** @type {Map<string, any[]>} */
  const discards = new Map();
  for (const operation of Object.values(objectOf(queue.discard_operations))) {
    if (
      operation &&
      typeof operation.bead_id === 'string' &&
      discardOperationActive(operation)
    ) {
      const list = discards.get(operation.bead_id) || [];
      list.push(operation);
      discards.set(operation.bead_id, list);
    }
  }
  /** @type {Map<string, string>} */
  const lane_state_holder = new Map();
  const lane_states = objectOf(queue.lane_states);
  for (const lane_id of SERIAL_IDS) {
    const occupied = objectOf(lane_states[lane_id]).occupied_by;
    for (const id of Array.isArray(occupied) ? occupied : []) {
      if (typeof id === 'string' && !lane_state_holder.has(id)) {
        lane_state_holder.set(id, lane_id);
      }
    }
  }

  /**
   * The store's `attemptHoldsSerialLane`: a record outside the releasing set
   * that is a leaf, and when an ended implementation attempt, its bead's
   * latest.
   *
   * @param {any} attempt
   * @returns {boolean}
   */
  const holds = (attempt) => {
    if (
      LANE_RELEASING_ATTEMPT_STATUSES.has(String(attempt.status)) ||
      resumed_ids.has(attempt.attempt_id)
    ) {
      return false;
    }
    return !(
      isImplementationAttempt(attempt) &&
      TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status)) &&
      latest_implementation.get(attempt.bead_id) !== attempt
    );
  };

  /**
   * @param {any[]} own
   * @returns {any|null}
   */
  const latestOf = (own) => {
    /** @type {any|null} */
    let latest = null;
    for (const attempt of own) {
      if (latest === null || timeOf(attempt) >= timeOf(latest)) {
        latest = attempt;
      }
    }
    return latest;
  };

  /**
   * The lane the bead's own records hold — the store's `laneHolds` read for
   * one bead, with the server's `lane_states` first.
   *
   * @param {string} bead_id
   * @param {any[]} own
   * @returns {string|null}
   */
  const heldLaneOf = (bead_id, own) => {
    const from_states = lane_state_holder.get(bead_id);
    if (from_states) {
      return from_states;
    }
    for (const attempt of own) {
      if (holds(attempt) && isSerialId(attempt.serial_lane_id)) {
        return attempt.serial_lane_id;
      }
    }
    const entry = pr_wait.get(bead_id);
    if (entry && !Object.hasOwn(shelved, bead_id)) {
      const last = latestOf(own);
      if (last && isSerialId(last.serial_lane_id)) {
        return last.serial_lane_id;
      }
      if (isSerialId(entry.serial_lane_id)) {
        return entry.serial_lane_id;
      }
    }
    for (const operation of discards.get(bead_id) || []) {
      const attempt =
        (typeof operation.attempt_id === 'string' &&
          attempts[operation.attempt_id]) ||
        latestOf(own);
      if (attempt && isSerialId(attempt.serial_lane_id)) {
        return attempt.serial_lane_id;
      }
    }
    return null;
  };

  /** @type {Map<string, BeadOccupancy>} */
  const memo = new Map();
  return (bead_id) => {
    const known = memo.get(bead_id);
    if (known) {
      return known;
    }
    const own = attempts_by_bead.get(bead_id) || [];
    const in_pr_wait = pr_wait.has(bead_id);
    const unshelved_pr_wait = in_pr_wait && !Object.hasOwn(shelved, bead_id);
    const discarding = discards.has(bead_id);
    const holdable = own.some(
      (attempt) => isImplementationAttempt(attempt) && holds(attempt)
    );
    const active =
      own.some(
        (attempt) => !TERMINAL_ATTEMPT_STATUSES.has(String(attempt.status))
      ) ||
      in_pr_wait ||
      discarding;
    const held_lane = heldLaneOf(bead_id, own);
    const seat = seats.get(bead_id);
    const latest = latest_implementation.get(bead_id);
    const occupant = active || holdable || held_lane !== null || !!seat;
    const bindable =
      held_lane === null && !discarding && (unshelved_pr_wait || holdable);
    /** @type {BeadOccupancy} */
    const result = {
      occupant,
      held_lane,
      bindable,
      bind_refusal:
        !occupant || held_lane !== null || bindable
          ? null
          : discarding
            ? 'discard_active'
            : 'not_holdable',
      state: seat
        ? seat.run_state
        : unshelved_pr_wait
          ? 'pr_wait'
          : holdable && latest && typeof latest.status === 'string'
            ? latest.status
            : null
    };
    memo.set(bead_id, result);
    return result;
  };
}
