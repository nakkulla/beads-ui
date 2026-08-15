/**
 * Pure resolution-ladder judgments over the two durable failure surfaces.
 * Contract membership and limits come from the pinned artifact; this module
 * only normalizes runtime evidence and decides which already-declared stage is
 * reachable.
 */
import { CLEANUP_STEPS } from './pr-actions.js';

/**
 * @typedef {'unconsumed'|'consumed'|'not_applicable'|'absorbed'} ScriptRetryStatus
 */

/**
 * Runner invocation identity exists only after both durable invocation traces
 * were recorded. The prerecord-time blob and mode alone are not proof that a
 * runner was ever invoked.
 *
 * @param {any} operation
 * @returns {string|null}
 */
export function scriptIdentity(operation) {
  if (
    typeof operation?.started_at !== 'number' ||
    typeof operation?.log_path !== 'string' ||
    operation.log_path.length === 0 ||
    typeof operation?.script_blob_sha !== 'string' ||
    typeof operation?.script_mode !== 'string'
  ) {
    return null;
  }
  return `${operation.script_blob_sha}:${operation.script_mode}`;
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function validFailure(value) {
  return (
    isRecord(value) &&
    typeof value.code === 'string' &&
    typeof value.fingerprint === 'string'
  );
}

/**
 * Cleanup failures are resolution subjects when they stop one of the durable
 * cleanup cursor steps. The pinned policy controls the ladder; this predicate
 * only recognizes the repository's existing cleanup state surface.
 *
 * @param {unknown} value
 * @returns {boolean}
 */
export function isCleanupResolutionFailure(value) {
  return isRecord(value) && typeof value.reason === 'string';
}

/**
 * Interpret optional retry state without giving legacy terminal failures a new
 * retry. A malformed retry object also fails closed as consumed.
 *
 * @param {any} operation
 * @returns {{ status: ScriptRetryStatus, first_failure: any|null, first_fingerprint: string|null }}
 */
export function normalizeScriptRetry(operation) {
  const retry = operation?.retry;
  if (retry === undefined || retry === null) {
    if (operation?.state === 'failed' || operation?.state === 'repairing') {
      return {
        status: 'consumed',
        first_failure: operation?.failure || null,
        first_fingerprint: operation?.failure?.fingerprint || null
      };
    }
    if (operation?.state === 'succeeded') {
      return {
        status: 'not_applicable',
        first_failure: null,
        first_fingerprint: null
      };
    }
    return {
      status: 'unconsumed',
      first_failure: null,
      first_fingerprint: null
    };
  }
  if (!isRecord(retry)) {
    return {
      status: 'consumed',
      first_failure: operation?.failure || null,
      first_fingerprint: operation?.failure?.fingerprint || null
    };
  }
  const first_failure = validFailure(retry.first_failure)
    ? retry.first_failure
    : null;
  const first_fingerprint =
    typeof retry.first_fingerprint === 'string'
      ? retry.first_fingerprint
      : first_failure?.fingerprint || null;
  if (
    isRecord(retry.absorbed) &&
    validFailure(retry.absorbed.first_failure) &&
    typeof retry.absorbed.first_fingerprint === 'string' &&
    typeof retry.absorbed.at === 'number'
  ) {
    return { status: 'absorbed', first_failure, first_fingerprint };
  }
  if (retry.outcome === 'not_applicable') {
    return { status: 'not_applicable', first_failure, first_fingerprint };
  }
  if (
    Array.isArray(retry.consumed_key) &&
    retry.consumed_key.length === 3 &&
    retry.consumed_key.every((part) => typeof part === 'string')
  ) {
    return { status: 'consumed', first_failure, first_fingerprint };
  }
  if (
    retry.consumed_key === null &&
    first_failure &&
    operation?.state === 'retry_pending'
  ) {
    return { status: 'unconsumed', first_failure, first_fingerprint };
  }
  return {
    status:
      operation?.state === 'queued' || operation?.state === 'running'
        ? 'unconsumed'
        : 'consumed',
    first_failure,
    first_fingerprint
  };
}

/**
 * @param {any} operation
 * @returns {boolean}
 */
export function scriptRetryApplicable(operation) {
  return (
    scriptIdentity(operation) !== null &&
    normalizeScriptRetry(operation).status === 'unconsumed'
  );
}

/**
 * @param {any} operation
 * @returns {[string, string, string]|null}
 */
export function scriptRetryConsumptionKey(operation) {
  const script_identity = scriptIdentity(operation);
  if (
    script_identity === null ||
    typeof operation?.attempt_id !== 'string' ||
    typeof operation?.target_sha !== 'string'
  ) {
    return null;
  }
  return [operation.attempt_id, operation.target_sha, script_identity];
}

/**
 * @param {any} operation
 * @param {string} operation_id
 * @returns {any}
 */
function operationSubject(operation, operation_id) {
  const auto_used = Number.isInteger(operation.repair?.auto_used)
    ? operation.repair.auto_used
    : 0;
  return {
    subject_id: `op:${operation_id}`,
    source: 'operation',
    owner_bead: operation.repair?.owner_bead || null,
    operation_id,
    operation,
    repair: operation.repair,
    dismissed: operation.dismissed || null,
    script_retry: normalizeScriptRetry(operation).status,
    stage:
      operation.repair?.ladder_stage ||
      (auto_used > 0 ? 'user_triggered_session' : 'auto_repair_session')
  };
}

/**
 * @param {string} bead_id
 * @param {any} failure
 * @returns {any}
 */
function cleanupSubject(bead_id, failure) {
  const repair = isRecord(failure.repair) ? failure.repair : {};
  const auto_used = Number.isInteger(repair.auto_used) ? repair.auto_used : 0;
  return {
    subject_id: `cleanup:${bead_id}`,
    source: 'cleanup',
    owner_bead: bead_id,
    bead_id,
    cleanup_failure: failure,
    repair,
    dismissed: null,
    script_retry: 'not_applicable',
    stage:
      repair.ladder_stage ||
      (auto_used > 0 ? 'user_triggered_session' : 'auto_repair_session')
  };
}

/**
 * Normalize unresolved operation failures and cursor-stopping cleanup failures
 * into one subject list. A failed operation bound to a bead wins over the less
 * specific cleanup row for that bead.
 *
 * @param {{ repo_operations?: Record<string, any>, cleanup_failed?: Record<string, any>, pr_wait?: any[], completion_intents?: Record<string, any> }} queue
 * @returns {any[]}
 */
export function normalizeResolutionSubjects(queue) {
  /** @type {any[]} */
  const subjects = [];
  /** @type {Set<string>} */
  const operation_beads = new Set();
  for (const [operation_id, operation] of Object.entries(
    queue.repo_operations || {}
  )) {
    if (
      operation?.superseded_by ||
      typeof operation.failure?.code !== 'string'
    ) {
      continue;
    }
    // Claiming the bead is wider than being a subject. Only a `failed` record
    // is an unresolved subject, but a record already `repairing` still OWNS its
    // bead's resolution — dropping it here would let the same failure's cleanup
    // row promote into a second subject the moment the ladder starts working on
    // the first one, which is exactly one failure with two sessions.
    if (operation.state !== 'failed' && operation.state !== 'repairing') {
      continue;
    }
    for (const entry of Array.isArray(operation.subjects)
      ? operation.subjects
      : []) {
      if (typeof entry?.bead_id === 'string') {
        operation_beads.add(entry.bead_id);
      }
    }
    if (operation.state !== 'failed') {
      continue;
    }
    subjects.push(operationSubject(operation, operation_id));
  }
  const rows = Array.isArray(queue.pr_wait) ? queue.pr_wait : [];
  const intents = /** @type {Record<string, any>} */ (
    queue.completion_intents || {}
  );
  for (const [bead_id, failure] of Object.entries(queue.cleanup_failed || {})) {
    // The completion-intent lane owns a bead it is actively repairing through
    // its own linked repair PR. Promoting that bead's cleanup row here would put
    // two automatic dispatchers on one failure, so the ladder yields while that
    // lane holds it and picks the row up only once the lane is no longer working
    // on it.
    const intent_phase = intents[bead_id]?.phase;
    if (
      intent_phase === 'repairing' ||
      intent_phase === 'waiting_repair_pr' ||
      operation_beads.has(bead_id) ||
      !isCleanupResolutionFailure(failure) ||
      !CLEANUP_STEPS.includes(failure.step) ||
      !rows.some(
        (row) => row?.bead_id === bead_id && row.cleanup_cursor === failure.step
      )
    ) {
      continue;
    }
    subjects.push(cleanupSubject(bead_id, failure));
  }
  return subjects;
}

/**
 * @param {{ policy_supported: boolean, auto_repair: boolean, subject: any }} input
 * @returns {{ script_retry: boolean, auto_repair_session: boolean, user_triggered_session: boolean }}
 */
export function resolutionAccess(input) {
  const subject = input.subject?.operation || input.subject;
  const terminal_unresolved =
    input.subject?.source === 'cleanup' ||
    (subject?.state === 'failed' && !subject?.superseded_by);
  const automatic =
    input.policy_supported === true &&
    input.auto_repair === true &&
    !subject?.dismissed;
  return {
    script_retry:
      automatic &&
      (subject?.state === 'running' || subject?.state === 'retry_pending') &&
      scriptRetryApplicable(subject),
    auto_repair_session: automatic && terminal_unresolved,
    user_triggered_session: terminal_unresolved
  };
}

/**
 * @param {any} operation
 * @returns {string}
 */
function repairEvidenceKey(operation) {
  return [
    operation.target_sha || '',
    operation.target_tree || '',
    operation.script_blob_sha || '',
    operation.script_mode || '',
    operation.effective_base_sha || ''
  ].join('|');
}

/**
 * The repeated-fingerprint guard is meaningful only after the current chain has
 * spent its automatic session, and it compares evidence inside that chain only.
 *
 * @param {Record<string, any>} operations
 * @param {string} operation_id
 * @returns {boolean}
 */
export function reproducedWithoutNewEvidence(operations, operation_id) {
  const operation = operations[operation_id];
  const chain_id = operation?.repair?.chain_id || operation_id;
  const fingerprint = operation?.failure?.fingerprint;
  if (typeof fingerprint !== 'string' || fingerprint.length === 0) {
    return false;
  }
  // A record that opened its own chain carries no `chain_id`, so every chain
  // comparison must apply the SAME id-fallback the subject used. Comparing a
  // bare null against the resolved chain id would read a legacy record as
  // belonging to no chain, and the guard would then miss a chain that has in
  // fact already spent its automatic session.
  const chainIdOf = (/** @type {string} */ id, /** @type {any} */ candidate) =>
    candidate.repair?.chain_id || id;
  const chain_consumed = Object.entries(operations).some(
    ([candidate_id, candidate]) =>
      chainIdOf(candidate_id, candidate) === chain_id &&
      (candidate.repair?.auto_used > 0 ||
        candidate.repair?.ladder_stage === 'user_triggered_session')
  );
  if (!chain_consumed) {
    return false;
  }
  const evidence = repairEvidenceKey(operation);
  return Object.entries(operations).some(([candidate_id, candidate]) => {
    if (candidate_id === operation_id) {
      return false;
    }
    return (
      chainIdOf(candidate_id, candidate) === chain_id &&
      candidate.failure?.fingerprint === fingerprint &&
      repairEvidenceKey(candidate) === evidence
    );
  });
}
