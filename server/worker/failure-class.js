/**
 * Classification of a SINGLE worker attempt outcome into a failure tier
 * (2026-08-28 `worker-failure-tiers-queue-hold` spec §3).
 *
 * This module is pure and deliberately blind to queue state: it never sees a
 * bead's retry history, the clock, or `queue.hold`. Repetition, promotion and
 * release live in `queue-hold.js`, which consumes {@link causeKey} to decide
 * whether two attempts failed for "the same" reason.
 *
 * Tier meaning (spec §3.1-§3.4):
 *   - `parked`     — the session ended successfully while waiting on a user
 *                    decision; not a failure, and the queue keeps running.
 *   - `individual` — this bead failed; the queue keeps running.
 *   - `env`        — environment failure; backoff retry + queue hold.
 *   - `systemic`   — every bead would hit the same wall; the queue stops.
 */

/**
 * @typedef {'parked' | 'individual' | 'env' | 'systemic'} FailureTier
 */

/**
 * @typedef {Object} FailureVerdict
 * @property {boolean} success
 * @property {string} [reason]
 * @property {string | null} [summary]
 */

/**
 * @typedef {Object} FailureInput
 * @property {string | null} cause
 * @property {Object | null} [cause_detail]
 * @property {FailureVerdict | null} [verdict]
 * @property {string | null} [bead_status]
 * @property {string | null} [pr_url]
 * @property {string | null} [awaiting_user]
 */

/**
 * @typedef {Object} FailureRetryPolicy
 * @property {number} max
 * @property {ReadonlyArray<number>} delays_ms
 */

/**
 * @typedef {Object} FailureClassification
 * @property {FailureTier} tier
 * @property {FailureRetryPolicy | null} retry
 * @property {string} cause
 * @property {string | null} summary
 * @property {string | null} env_group
 */

/**
 * Backoff ladder for `env` retries. Owned here because it is part of the
 * classification output contract (spec §3); `queue-hold.js` re-exports it so a
 * scheduler reads one ladder.
 *
 * @type {ReadonlyArray<number>}
 */
export const RETRY_DELAYS_MS = Object.freeze([120000, 300000, 900000]);

/** Attempts a single env lineage may spend before promotion (spec §3.3). */
export const RETRY_MAX = 3;

/** Longest summary line kept on an attempt record (spec §6). */
export const SUMMARY_MAX_CHARS = 200;

/** Cause written when the classifier is given no cause at all. */
export const UNKNOWN_CAUSE = 'unknown';

/**
 * Environment failure patterns (spec §3.3). `api` covers provider-side outages
 * and transport faults; `runtime` covers a missing or unauthenticated CLI.
 *
 * @type {ReadonlyArray<{ group: string, re: RegExp }>}
 */
export const ENV_ERROR_PATTERNS = Object.freeze([
  Object.freeze({
    group: 'api',
    re: /API Error: 5\d\d|Overloaded|overloaded_error|rate.?limit|429|ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up|fetch failed/i
  }),
  Object.freeze({
    group: 'runtime',
    re: /command not found|ENOENT|spawn .* ENOENT|login status|not authenticated/i
  })
]);

/** Causes that are environmental regardless of the session's error text. */
const ALWAYS_ENV_CAUSES = new Set([
  'verify_failed:gh_observation_failed',
  'verify_failed:bd_read_failed',
  'quickfix_landing_failed:bd_read_failed',
  'verify_cmd_spawn_error',
  'spawn_failed',
  'codex_home_prepare_failed'
]);

/** Cause prefixes (`<prefix>:<detail>`) that are environmental. */
const ALWAYS_ENV_PREFIXES = ['spawn_failed'];

/** Causes that stop the queue on first sight (spec §3.4). */
const ALWAYS_SYSTEMIC_CAUSES = new Set([
  'base_landing_detected',
  'gh_unavailable',
  'bd_unreachable',
  'verify_red',
  'cleanup_failed'
]);

/** Cause prefixes that stop the queue on first sight. */
const ALWAYS_SYSTEMIC_PREFIXES = ['cleanup_failed'];

/** `loud_fail_blocker` reasons that are a breached prevention layer (§3.4). */
const SYSTEMIC_BLOCKER_REASONS = new Set([
  'hook_bypass_blocked',
  'merge_to_base_blocked'
]);

/** Session-level causes whose tier depends on the error text (spec §3.3). */
const PATTERN_SENSITIVE_CAUSES = new Set([
  'session_failed:is_error',
  'session_ended_unresolved'
]);

/**
 * Causes whose "same cause" comparison key carries the matched pattern group
 * instead of the bare cause (spec §3.3): two beads dying on unrelated session
 * errors must not read as one systemic outage.
 */
const GROUP_KEYED_CAUSES = new Set(['session_failed:is_error']);

/** Bead statuses that mean the work landed, so a successful end is not parked. */
const SETTLED_BEAD_STATUSES = new Set(['resolved', 'closed']);

/**
 * Causes the successful-session outcome rules (§3.1-§3.2) are allowed to
 * REPLACE. A caller that already carries a hard cause (`base_landing_detected`,
 * `cleanup_failed`, …) keeps it even when the session itself exited 0.
 */
const OUTCOME_REPLACEABLE_CAUSES = new Set([
  '',
  'verify_failed:pr_missing',
  'session_ended_unresolved',
  'session_parked'
]);

/** Literal summary used when a runner produced no readable last line (§6). */
export const NO_RESULT_SUMMARY = 'no_result';

/**
 * First non-empty line of `text`, trimmed and capped at
 * {@link SUMMARY_MAX_CHARS}.
 *
 * @param {unknown} text
 * @returns {string | null}
 */
export function extractSummary(text) {
  if (typeof text !== 'string') {
    return null;
  }
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length > 0) {
      return trimmed.slice(0, SUMMARY_MAX_CHARS);
    }
  }
  return null;
}

/**
 * Name of the environment pattern group `summary` matches, or `null`.
 *
 * @param {unknown} summary
 * @returns {string | null}
 */
export function matchEnvPattern(summary) {
  if (typeof summary !== 'string') {
    return null;
  }
  for (const entry of ENV_ERROR_PATTERNS) {
    if (entry.re.test(summary)) {
      return entry.group;
    }
  }
  return null;
}

/**
 * Comparison key for "the same cause" in queue-hold promotion (spec §3.3): the
 * first two colon segments, with the matched pattern group appended for the
 * session error causes whose text decides the tier.
 *
 * @param {string | null | undefined} cause
 * @param {string | null} [env_group]
 */
export function causeKey(cause, env_group) {
  if (typeof cause !== 'string' || cause.length === 0) {
    return UNKNOWN_CAUSE;
  }
  const head = cause.split(':').slice(0, 2).join(':');
  if (GROUP_KEYED_CAUSES.has(head) && typeof env_group === 'string') {
    return `${head}:${env_group}`;
  }
  return head;
}

/**
 * @param {string} cause
 * @param {ReadonlyArray<string>} prefixes
 */
function hasPrefix(cause, prefixes) {
  return prefixes.some((prefix) => cause.startsWith(`${prefix}:`));
}

/**
 * @param {FailureInput} input
 * @returns {string | null}
 */
function readSummary(input) {
  const from_verdict = extractSummary(input.verdict?.summary);
  if (from_verdict !== null) {
    return from_verdict;
  }
  const detail = /** @type {{ summary?: unknown } | null | undefined} */ (
    input.cause_detail
  );
  return extractSummary(detail?.summary);
}

/**
 * @param {FailureInput} input
 * @returns {boolean}
 */
function endedWithoutDelivery(input) {
  return (
    input.verdict?.success === true &&
    !SETTLED_BEAD_STATUSES.has(String(input.bead_status ?? '')) &&
    !input.pr_url
  );
}

/**
 * @param {FailureTier} tier
 * @param {string} cause
 * @param {string | null} summary
 * @param {string | null} env_group
 * @returns {FailureClassification}
 */
function classification(tier, cause, summary, env_group) {
  return {
    tier,
    retry:
      tier === 'env' ? { max: RETRY_MAX, delays_ms: RETRY_DELAYS_MS } : null,
    cause,
    summary,
    env_group
  };
}

/**
 * Classify one attempt outcome (spec §3).
 *
 * @param {FailureInput} input
 * @returns {FailureClassification}
 */
export function classifyFailure(input) {
  const summary = readSummary(input);
  const raw_cause = typeof input.cause === 'string' ? input.cause : '';

  // §3.1-§3.2: a session that exited 0 without delivering is judged by its
  // ending, not by the placeholder cause the caller carried in.
  if (
    OUTCOME_REPLACEABLE_CAUSES.has(raw_cause) &&
    endedWithoutDelivery(input)
  ) {
    if (typeof input.awaiting_user === 'string') {
      return classification('parked', 'session_parked', summary, null);
    }
    const env_group = matchEnvPattern(summary);
    return classification(
      env_group === null ? 'individual' : 'env',
      'session_ended_unresolved',
      summary,
      env_group
    );
  }

  const cause = raw_cause === '' ? UNKNOWN_CAUSE : raw_cause;

  if (PATTERN_SENSITIVE_CAUSES.has(cause)) {
    const env_group = matchEnvPattern(summary);
    return classification(
      env_group === null ? 'individual' : 'env',
      cause,
      summary,
      env_group
    );
  }

  if (ALWAYS_ENV_CAUSES.has(cause) || hasPrefix(cause, ALWAYS_ENV_PREFIXES)) {
    return classification('env', cause, summary, null);
  }

  if (
    ALWAYS_SYSTEMIC_CAUSES.has(cause) ||
    hasPrefix(cause, ALWAYS_SYSTEMIC_PREFIXES)
  ) {
    return classification('systemic', cause, summary, null);
  }

  if (cause === 'loud_fail_blocker') {
    const detail = /** @type {{ reason?: unknown } | null | undefined} */ (
      input.cause_detail
    );
    const reason = typeof detail?.reason === 'string' ? detail.reason : '';
    if (SYSTEMIC_BLOCKER_REASONS.has(reason)) {
      return classification('systemic', cause, summary, null);
    }
    return classification('individual', cause, summary, null);
  }

  // Fail-quiet default (spec §3.2): an unknown cause fails its own bead only.
  return classification('individual', cause, summary, null);
}

/**
 * Last reportable sentence of a codex session (spec §6): `turn.failed` error
 * message first, then the last `agent_message`, then the literal `no_result`.
 *
 * @param {unknown} raw_events - raw codex jsonl objects, in emission order.
 * @returns {string}
 */
export function codexSummary(raw_events) {
  if (!Array.isArray(raw_events)) {
    return NO_RESULT_SUMMARY;
  }
  /** @type {string | null} */
  let turn_failed = null;
  /** @type {string | null} */
  let agent_message = null;
  for (const event of raw_events) {
    if (!event || typeof event !== 'object') {
      continue;
    }
    const record = /** @type {Record<string, any>} */ (event);
    if (record.type === 'turn.failed') {
      const message = extractSummary(record.error?.message);
      if (message !== null) {
        turn_failed = message;
      }
      continue;
    }
    if (
      record.type === 'item.completed' &&
      record.item?.type === 'agent_message'
    ) {
      const text = extractSummary(record.item?.text);
      if (text !== null) {
        agent_message = text;
      }
    }
  }
  return turn_failed ?? agent_message ?? NO_RESULT_SUMMARY;
}

/**
 * Last reportable sentence of a claude session (spec §6): the final `result`
 * event's text, or its error text when the run is flagged `is_error`.
 *
 * @param {unknown} raw_events - raw claude stream-json objects, in order.
 * @returns {string}
 */
export function claudeSummary(raw_events) {
  if (!Array.isArray(raw_events)) {
    return NO_RESULT_SUMMARY;
  }
  /** @type {Record<string, any> | null} */
  let last_result = null;
  for (const event of raw_events) {
    if (event && typeof event === 'object') {
      const record = /** @type {Record<string, any>} */ (event);
      if (record.type === 'result') {
        last_result = record;
      }
    }
  }
  if (last_result === null) {
    return NO_RESULT_SUMMARY;
  }
  const from_result = extractSummary(last_result.result);
  if (last_result.is_error === true) {
    return (
      from_result ?? extractSummary(last_result.error) ?? NO_RESULT_SUMMARY
    );
  }
  return from_result ?? NO_RESULT_SUMMARY;
}
