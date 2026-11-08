/**
 * Pure script-retry judgments over the durable operation record.
 *
 * The ladder the pinned artifact declares is ONE step (`script_retry`) since
 * UI-s582 §2: contract membership and limits come from the artifact, and this
 * module only normalizes runtime evidence and decides whether that one step is
 * reachable. After it, the raw terminal `failed` remains intact while recovery
 * classification selects a condition wait or an ordinary workflow repair handoff.
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

/** @type {Record<string, Record<string, string[]|null>>} */
const TRANSIENT_CLEANUP_FAILURES = {
  branch_cleanup: {
    worktree_remove_failed: [
      'observe_failed',
      'delivered_unobservable',
      'archive_failed'
    ],
    local_branch_delete_failed: ['ref_delete_failed'],
    remote_branch_delete_failed: null
  },
  base_containment: {
    merge_sha_unobserved: null,
    base_fetch_failed: null,
    base_rev_unavailable: null
  }
};

/**
 * Classify only cleanup observations owned by the completion replay lane.
 * Missing manager evidence never authorizes another worktree removal.
 *
 * @param {unknown} failure
 * @returns {'transient'|'deterministic'|'unowned'}
 */
export function cleanupFailureRetryClass(failure) {
  if (!isRecord(failure)) {
    return 'deterministic';
  }
  const { step, reason, detail } = failure;
  if (
    typeof reason === 'string' &&
    (reason.startsWith('internal_record_failed:') ||
      [
        'internal_record_failed',
        'cleanup_journal_conflict',
        'cleanup_completion_unrecorded',
        'cleanup_replay_unavailable'
      ].includes(reason))
  ) {
    return 'unowned';
  }
  if (typeof step !== 'string') {
    return 'deterministic';
  }
  if (!Object.hasOwn(TRANSIENT_CLEANUP_FAILURES, step)) {
    return 'unowned';
  }
  const reasons = TRANSIENT_CLEANUP_FAILURES[step];
  if (typeof reason !== 'string' || !Object.hasOwn(reasons, reason)) {
    return 'deterministic';
  }
  if (detail !== undefined && detail !== null && typeof detail !== 'string') {
    return 'deterministic';
  }
  const manager_reasons = reasons[reason];
  if (manager_reasons === null) {
    return 'transient';
  }
  const tokens =
    typeof detail === 'string'
      ? detail
          .split(/\s+/)
          .filter((token) => token.startsWith('manager_reason='))
      : [];
  return tokens.length === 1 &&
    manager_reasons.includes(tokens[0].slice('manager_reason='.length))
    ? 'transient'
    : 'deterministic';
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
 * Return the durable deadline only for a schedulable cleanup observation.
 *
 * @param {unknown} failure
 * @returns {number|null}
 */
export function cleanupRetryWaitUntil(failure) {
  if (!isRecord(failure) || cleanupFailureRetryClass(failure) !== 'transient') {
    return null;
  }
  const { retry_count, next_retry_at } = failure;
  return Number.isInteger(retry_count) &&
    retry_count >= 0 &&
    retry_count < 3 &&
    typeof next_retry_at === 'number' &&
    Number.isFinite(next_retry_at)
    ? next_retry_at
    : null;
}

/**
 * Keep a scheduled cleanup in the queue without blocking later merges.
 *
 * @param {any} queue
 * @param {string} bead_id
 * @param {number} now
 * @returns {boolean}
 */
export function cleanupRetryParked(queue, bead_id, now) {
  const intent = queue?.completion_intents?.[bead_id];
  if (intent?.phase !== 'cleaning' || intent.active_op) {
    return false;
  }
  const until = cleanupRetryWaitUntil(queue?.cleanup_failed?.[bead_id]);
  return until !== null && now < until;
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
 * @typedef {{ failure_code: string, interval_ms: number, deadline_ms: number }} ConditionWaitPolicy
 * @typedef {{ tip_id: string, head_id: string, next_at: number, deadline_at: number }} ConditionWaitSchedule
 */

/**
 * Whether one record is an automatic deploy that settled on the contract's
 * `[deploy]` exit-75 condition wait (dotfiles-rnyd9).
 *
 * @param {any} operation
 * @param {ConditionWaitPolicy} policy
 * @returns {boolean}
 */
function isConditionWaitRecord(operation, policy) {
  return (
    isRecord(operation) &&
    operation.kind === 'deploy' &&
    operation.state === 'failed' &&
    operation.failure?.code === policy.failure_code &&
    typeof operation.finished_at === 'number' &&
    Number.isFinite(operation.finished_at)
  );
}

/**
 * The recheck schedule of a `condition_wait` tip, read from durable records
 * only, so a restart answers the same: the next recheck is the tip's
 * `finished_at` plus the contract interval, and the deadline is the chain
 * head's — the first `condition_wait` reached by following `retry_of` back —
 * `finished_at` plus the contract deadline. Null for any other record, a
 * superseded one, a Bead-less manual run (classification only, no recheck),
 * or while the pinned contract grants no condition wait.
 *
 * @param {Record<string, any>} operations
 * @param {string} tip_id
 * @param {ConditionWaitPolicy|null} policy
 * @returns {ConditionWaitSchedule|null}
 */
export function conditionWaitSchedule(operations, tip_id, policy) {
  const tip = operations?.[tip_id];
  if (
    !policy ||
    !isConditionWaitRecord(tip, policy) ||
    tip.source === 'manual' ||
    tip.dismissed ||
    tip.superseded_by
  ) {
    return null;
  }
  let head_id = tip_id;
  const seen = new Set([tip_id]);
  let cursor = tip;
  while (
    typeof cursor.retry_of === 'string' &&
    !seen.has(cursor.retry_of) &&
    isRecord(operations[cursor.retry_of])
  ) {
    seen.add(cursor.retry_of);
    const predecessor_id = cursor.retry_of;
    cursor = operations[predecessor_id];
    if (isConditionWaitRecord(cursor, policy)) {
      head_id = predecessor_id;
    }
  }
  return {
    tip_id,
    head_id,
    next_at: tip.finished_at + policy.interval_ms,
    deadline_at: operations[head_id].finished_at + policy.deadline_ms
  };
}

/**
 * The current `condition_wait` tip deploying one Bead, as its schedule: the
 * newest unsuperseded record naming the Bead that {@link conditionWaitSchedule}
 * accepts. Null when the Bead's deploy is not waiting on a condition.
 *
 * @param {Record<string, any>} operations
 * @param {string} bead_id
 * @param {ConditionWaitPolicy|null} policy
 * @returns {ConditionWaitSchedule|null}
 */
export function conditionWaitTipFor(operations, bead_id, policy) {
  /** @type {ConditionWaitSchedule|null} */
  let found = null;
  for (const [operation_id, operation] of Object.entries(operations || {})) {
    if (
      !Array.isArray(operation?.subjects) ||
      !operation.subjects.some(
        (/** @type {any} */ subject) => subject?.bead_id === bead_id
      )
    ) {
      continue;
    }
    const schedule = conditionWaitSchedule(operations, operation_id, policy);
    if (
      schedule !== null &&
      (found === null ||
        operation.finished_at > operations[found.tip_id].finished_at)
    ) {
      found = schedule;
    }
  }
  return found;
}

/**
 * Where a condition-wait schedule stands at `now`: `due` once the next
 * recheck time came inside the deadline, `expired` from the deadline on (the
 * automatic recheck stops and a person decides), `waiting` before either.
 *
 * @param {ConditionWaitSchedule} schedule
 * @param {number} now
 * @returns {'due'|'waiting'|'expired'}
 */
export function conditionWaitState(schedule, now) {
  if (now >= schedule.deadline_at) {
    return 'expired';
  }
  return now >= schedule.next_at ? 'due' : 'waiting';
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
