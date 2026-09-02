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
 *   - `waiting`    — the session refused to START because a prerequisite of
 *                    this bead is still open (2026-08-28
 *                    worker-prerequisite-wait-tier spec §4.3); not a failure,
 *                    and `bd ready` absence — not a fence — is what holds it.
 *   - `individual` — this bead failed; the queue keeps running.
 *   - `env`        — environment failure; backoff retry + queue hold.
 *   - `systemic`   — every bead would hit the same wall; the queue stops.
 */
// The cause sentences of the landing/merge/cleanup contract tokens (spec §6
// row 4). Imported from the dependency-free leaf under `app/utils/`, the same
// direction `completion-intent.js` already takes: the map is pure data shared
// by both runtimes, so reading it here keeps this module pure.
import { FAILURE_SENTENCES } from '../../app/utils/failure-sentences.js';

/**
 * @typedef {'parked' | 'waiting' | 'individual' | 'env' | 'systemic'} FailureTier
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
 * @property {'waiting'} [tier_hint] - The caller's PROOF that it already
 * observed the four prerequisite-wait conditions (waiting-tier spec §4.2).
 * Without it a `prerequisite_unmet` cause classifies as the fail-quiet default,
 * so no caller can reach the tier by naming the cause alone.
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
 * Environment failure patterns (spec §3.3). Per provider-outage-hold-resume
 * §4.1, `api` keeps transport faults only; provider HTTP/overload tokens belong
 * to the runner classifier. `runtime` covers a missing or unauthenticated CLI.
 *
 * @type {ReadonlyArray<{ group: string, re: RegExp }>}
 */
export const ENV_ERROR_PATTERNS = Object.freeze([
  Object.freeze({
    group: 'api',
    re: /ECONNRESET|ETIMEDOUT|ENOTFOUND|socket hang up|fetch failed/i
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
  'session_ended_unresolved',
  'session_hard_stop:environment'
]);

/**
 * Causes whose "same cause" comparison key carries the matched pattern group
 * instead of the bare cause (spec §3.3): two beads dying on unrelated session
 * errors must not read as one systemic outage.
 */
const GROUP_KEYED_CAUSES = new Set([
  'session_failed:is_error',
  'session_hard_stop:environment'
]);

/**
 * Causes that never take part in queue-hold promotion (waiting-tier spec §4.3).
 * A `prerequisite_unmet` ending is a terminal WAIT, not a failure: two of them
 * in a row say the blocker is still open, never that the environment is.
 */
const NON_PROMOTING_CAUSES = new Set(['prerequisite_unmet']);

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
 * Lines a verify/deploy script prints when it is announcing its own failure
 * (spec §6 row 2). Matched against the TRIMMED line so an indented test-runner
 * failure is not missed by the anchor.
 *
 * @type {RegExp}
 */
export const SCRIPT_FAILURE_LINE_RE =
  /^(FAIL|✗|Error|error:|npm ERR!|Traceback|AssertionError)/;

/**
 * The one line that says why a verify/deploy script failed (spec §6 row 2):
 * the first line that announces a failure, and otherwise the last non-empty
 * line — a script that ends by printing its own error needs no pattern, and a
 * script that fails in the middle of a long run does.
 *
 * @param {unknown} output - The script's captured stdout+stderr.
 * @returns {string | null} null when there is no non-empty line at all.
 */
export function scriptSummary(output) {
  if (typeof output !== 'string') {
    return null;
  }
  /** @type {string | null} */
  let last_non_empty = null;
  for (const line of output.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      continue;
    }
    if (SCRIPT_FAILURE_LINE_RE.test(trimmed)) {
      return trimmed.slice(0, SUMMARY_MAX_CHARS);
    }
    last_non_empty = trimmed;
  }
  return last_non_empty === null
    ? null
    : last_non_empty.slice(0, SUMMARY_MAX_CHARS);
}

/**
 * The message a guard kill announces (spec §6 row 3), verbatim. It lives here
 * rather than at either kill site because there are two of them — the live
 * engine (`runner/session.js`) and the restart monitor (`session-monitor.js`,
 * whose evidence the scheduler later turns into a `loud_fail_blocker`) — and a
 * second copy of the sentence is exactly how one kill starts reading as two
 * different facts.
 *
 * A kill with no command is the interactive-request kill, whose message has
 * always been the reason itself.
 *
 * @param {{ reason?: unknown, command?: unknown } | null | undefined} detail
 * @returns {string}
 */
export function guardKillMessage(detail) {
  const reason = typeof detail?.reason === 'string' ? detail.reason : '';
  const command = typeof detail?.command === 'string' ? detail.command : null;
  if (command === null) {
    return reason;
  }
  if (reason === 'merge_to_base_blocked') {
    return `landing on the base branch is never permitted: ${command}`;
  }
  if (reason === 'hook_bypass_blocked') {
    return `disabling the git hooks is never permitted: ${command}`;
  }
  // Unreachable while the effect table names only the two kinds above as
  // kills; kept so a NEW kind still says something.
  return `the session engine refused this command: ${command}`;
}

/**
 * The landing/merge/cleanup summary for a failure token (spec §6 row 4): the
 * token's `failure-sentences.js` sentence, with the detail token appended when
 * the cause carries one the sentence does not already name.
 *
 * Segment lookup runs front-to-back and keeps the LAST match, mirroring
 * `app/views/worker/failure-labels.js failureSentence` so the server and the
 * card say the same thing about the same code. An unknown token is never
 * guessed at: it yields `null` and the caller keeps showing the raw cause.
 *
 * @param {unknown} cause
 * @returns {string | null}
 */
export function failureTokenSummary(cause) {
  if (typeof cause !== 'string' || cause.length === 0) {
    return null;
  }
  const segments = cause.split(':').filter((segment) => segment.length > 0);
  /** @type {string | null} */
  let sentence = null;
  /** @type {string | null} */
  let sentence_segment = null;
  for (const segment of segments) {
    if (Object.hasOwn(FAILURE_SENTENCES, segment)) {
      sentence = FAILURE_SENTENCES[segment];
      sentence_segment = segment;
    }
  }
  if (sentence === null) {
    return null;
  }
  const detail_token = segments[segments.length - 1];
  const text =
    detail_token === sentence_segment
      ? sentence
      : `${sentence} (${detail_token})`;
  return text.slice(0, SUMMARY_MAX_CHARS);
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
 * @returns {string | null} null for a cause that never promotes (§4.3).
 */
export function causeKey(cause, env_group) {
  if (typeof cause !== 'string' || cause.length === 0) {
    return UNKNOWN_CAUSE;
  }
  const head = cause.split(':').slice(0, 2).join(':');
  if (NON_PROMOTING_CAUSES.has(head)) {
    return null;
  }
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
 * `summary` falls back to the cause token's own sentence (§6 row 4) — the
 * landing, merge and cleanup failures have no session text to quote, so the
 * contract token is the only thing that can say what happened. The fallback is
 * applied HERE and not in {@link readSummary} on purpose: the env-pattern match
 * must keep reading the failure's real text, never a Korean sentence this
 * module synthesized.
 *
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
    summary: summary ?? failureTokenSummary(cause),
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

  // Waiting-tier spec §4.3, ahead of every other rule: a prerequisite wait is
  // an ending the CALLER proved, and its inputs (exit 0, bead still open, no
  // PR) are exactly the ones §3.1-§3.2 below would otherwise read as an
  // undelivered session. The proof is the hint plus the blockers the caller
  // observed; either missing falls through to the fail-quiet default.
  if (raw_cause === 'prerequisite_unmet') {
    const detail = /** @type {{ blockers?: unknown } | null | undefined} */ (
      input.cause_detail
    );
    if (
      input.tier_hint === 'waiting' &&
      Array.isArray(detail?.blockers) &&
      detail.blockers.length > 0
    ) {
      return classification('waiting', raw_cause, summary, null);
    }
  }

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
