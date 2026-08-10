/**
 * In-memory token-usage tally for RUNNING attempts (UI-raqh §1).
 *
 * The claude adapter lifts `usage` off the stream (`runner/claude.js`
 * `normalize()`); this is where the running total lives until the attempt ends
 * and the scheduler persists it onto the `Attempt` record. Like the PR
 * observation cache it is process-wide, workspace-scoped, and DELIBERATELY
 * non-persistent: a live counter belongs to a live process, and a crash simply
 * loses it (the attempt itself is orphaned anyway).
 *
 * The one rule that matters: a streaming session repeats the SAME `message.id`
 * across several assistant events, each carrying the message's usage SO FAR
 * (the `claude-tools.jsonl` fixture repeats one id 4× and another 2×). Adding
 * per event would therefore double-count, so usage is stored PER MESSAGE ID and
 * a repeat REPLACES. The `result` event's usage is the session's own
 * authoritative total, so it replaces the whole tally rather than joining it.
 */
import path from 'node:path';

/**
 * The usage fields carried through from the stream. Every one is optional —
 * claude omits what does not apply, and a missing field is never invented.
 *
 * @typedef {Object} UsageTally
 * @property {number} input_tokens
 * @property {number} output_tokens
 * @property {number} cache_read_input_tokens
 * @property {number} cache_creation_input_tokens
 * @property {number} [reasoning_output_tokens] - Optional Codex reasoning
 * breakdown; this is not part of a Codex headline subtotal.
 * @property {number} [total_cost_usd] - Present only once a `result` event
 * reported one (assistant events carry no cost).
 * @property {boolean} [replayed] - Present only on a tally rebuilt from the
 * session log after a restart (UI-ediw): a PARTIAL number.
 */

/**
 * One usage payload as it arrives off the stream.
 *
 * @typedef {{ message_id?: string, input_tokens?: unknown, output_tokens?: unknown, cache_read_input_tokens?: unknown, cache_creation_input_tokens?: unknown, reasoning_output_tokens?: unknown, total_cost_usd?: unknown }} UsageInput
 */

/**
 * The numeric usage fields, in tally order. Cost is deliberately outside: it
 * is reported once, by the `result` event, not per message.
 *
 * @type {Array<'input_tokens'|'output_tokens'|'cache_read_input_tokens'|'cache_creation_input_tokens'|'reasoning_output_tokens'>}
 */
const SUM_FIELDS = [
  'input_tokens',
  'output_tokens',
  'cache_read_input_tokens',
  'cache_creation_input_tokens',
  'reasoning_output_tokens'
];

/**
 * @param {unknown} value
 * @returns {number}
 */
function numeric(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * Whether a payload carries at least one usable number. A payload with none is
 * dropped rather than stored as an all-zero record, so "nothing observed" stays
 * distinguishable from "observed zero".
 *
 * @param {UsageInput} input
 * @returns {boolean}
 */
function hasAnyNumber(input) {
  for (const field of SUM_FIELDS) {
    if (typeof input[field] === 'number' && Number.isFinite(input[field])) {
      return true;
    }
  }
  return (
    typeof input.total_cost_usd === 'number' &&
    Number.isFinite(input.total_cost_usd)
  );
}

/**
 * Normalize a stream payload to the tally shape (unknown/absent → 0).
 *
 * @param {UsageInput} input
 * @returns {UsageTally}
 */
function toTally(input) {
  /** @type {UsageTally} */
  const tally = {
    input_tokens: numeric(input.input_tokens),
    output_tokens: numeric(input.output_tokens),
    cache_read_input_tokens: numeric(input.cache_read_input_tokens),
    cache_creation_input_tokens: numeric(input.cache_creation_input_tokens),
    reasoning_output_tokens: numeric(input.reasoning_output_tokens)
  };
  if (
    typeof input.total_cost_usd === 'number' &&
    Number.isFinite(input.total_cost_usd)
  ) {
    tally.total_cost_usd = input.total_cost_usd;
  }
  return tally;
}

/**
 * One attempt's live tally: either per-message records still accumulating, or
 * the authoritative total a `result` event settled.
 *
 * `replayed` marks a tally rebuilt from the session log after a server restart
 * (UI-ediw): the events the dead pipe swallowed are unrecoverable, so the
 * number is a partial one and must say so.
 *
 * @typedef {{ by_message: Map<string, UsageTally>, authoritative: UsageTally|null, replayed?: boolean }} AttemptTally
 */

/**
 * Create a usage store. One instance is held by the worker runtime so the
 * scheduler (writer) and the ws snapshot decoration (reader) share it.
 */
export function createUsageStore() {
  /** @type {Map<string, Map<string, AttemptTally>>} */
  const by_workspace = new Map();

  /**
   * Workspace keys are RESOLVED, exactly like the queue store's and the PR
   * observation cache's, so writer and reader can never end up on two lanes for
   * the same workspace.
   *
   * @param {string} workspace
   * @returns {Map<string, AttemptTally>}
   */
  function laneFor(workspace) {
    const key = path.resolve(String(workspace || ''));
    let lane = by_workspace.get(key);
    if (!lane) {
      lane = new Map();
      by_workspace.set(key, lane);
    }
    return lane;
  }

  /**
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {AttemptTally}
   */
  function entryFor(workspace, attempt_id) {
    const lane = laneFor(workspace);
    let entry = lane.get(attempt_id);
    if (!entry) {
      entry = { by_message: new Map(), authoritative: null };
      lane.set(attempt_id, entry);
    }
    return entry;
  }

  return {
    /**
     * Record one assistant-event usage payload. A payload for a `message_id`
     * already seen REPLACES the prior one (see the module comment); a payload
     * without an id is keyed by the empty string, which collapses a runner that
     * reports no ids into a single slot rather than summing its repeats.
     *
     * Ignored once a `result` settled the attempt: nothing that arrives after
     * the session's own total can improve on it.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {UsageInput} input
     */
    record(workspace, attempt_id, input) {
      if (!input || !hasAnyNumber(input)) {
        return;
      }
      const entry = entryFor(workspace, attempt_id);
      if (entry.authoritative) {
        return;
      }
      entry.by_message.set(String(input.message_id || ''), toTally(input));
    },

    /**
     * Record the `result` event's usage as the attempt's authoritative total,
     * dropping the per-message tally it supersedes.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {UsageInput} input
     */
    recordResult(workspace, attempt_id, input) {
      if (!input || !hasAnyNumber(input)) {
        return;
      }
      const entry = entryFor(workspace, attempt_id);
      entry.by_message.clear();
      entry.authoritative = toTally(input);
    },

    /**
     * Mark an attempt's tally as rebuilt from the session log (UI-ediw). Only
     * the replay routine calls this, so a live session never carries the flag.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     */
    markReplayed(workspace, attempt_id) {
      entryFor(workspace, attempt_id).replayed = true;
    },

    /**
     * One attempt's usage so far, or null when nothing usable was recorded.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {UsageTally|null}
     */
    get(workspace, attempt_id) {
      const entry = laneFor(workspace).get(attempt_id);
      if (!entry) {
        return null;
      }
      if (entry.authoritative) {
        return entry.replayed
          ? { ...entry.authoritative, replayed: true }
          : { ...entry.authoritative };
      }
      if (entry.by_message.size === 0) {
        return null;
      }
      /** @type {UsageTally} */
      const total = {
        input_tokens: 0,
        output_tokens: 0,
        cache_read_input_tokens: 0,
        cache_creation_input_tokens: 0,
        reasoning_output_tokens: 0
      };
      let cost = 0;
      let has_cost = false;
      for (const tally of entry.by_message.values()) {
        for (const field of SUM_FIELDS) {
          total[field] = numeric(total[field]) + numeric(tally[field]);
        }
        if (typeof tally.total_cost_usd === 'number') {
          cost += tally.total_cost_usd;
          has_cost = true;
        }
      }
      if (has_cost) {
        total.total_cost_usd = cost;
      }
      if (entry.replayed) {
        total.replayed = true;
      }
      return total;
    },

    /**
     * Drop one attempt's tally — called once the scheduler has persisted it
     * onto the attempt record, so the live map holds only live sessions.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     */
    clearAttempt(workspace, attempt_id) {
      laneFor(workspace).delete(attempt_id);
    },

    /**
     * Drop everything (server restart semantics; test hook).
     */
    clear() {
      by_workspace.clear();
    }
  };
}
