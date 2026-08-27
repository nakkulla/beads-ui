/**
 * Pure script-retry judgments over the durable operation record.
 *
 * The ladder the pinned artifact declares is ONE step (`script_retry`) since
 * UI-s582 §2: contract membership and limits come from the artifact, and this
 * module only normalizes runtime evidence and decides whether that one step is
 * reachable. Everything after it is a terminal `failed` a human re-runs.
 */

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
 * Whether a cleanup row carries a recorded failure reason. Read by the merge
 * candidate and completion-intent lanes to recognize the repository's existing
 * cleanup state surface; it decides nothing about the ladder.
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
    if (operation?.state === 'failed') {
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
 * Whether the ONE automatic ladder step is open for this operation right now.
 *
 * `script_retry` is always on when the pinned schema is understood — there is
 * no workspace toggle since UI-s582 §2 — so the gate is the record's own
 * evidence: not dismissed, still in a pre-terminal state, and an invocation
 * identity that proves a script actually ran.
 *
 * @param {{ policy_supported: boolean, subject: any }} input
 * @returns {{ script_retry: boolean }}
 */
export function resolutionAccess(input) {
  const subject = input.subject;
  return {
    script_retry:
      input.policy_supported === true &&
      !subject?.dismissed &&
      (subject?.state === 'running' || subject?.state === 'retry_pending') &&
      scriptRetryApplicable(subject)
  };
}
