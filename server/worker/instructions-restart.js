import { EXEC_SETTING_KEYS } from './exec-enums.js';
import { RUNNERS } from './runner/index.js';

/**
 * The instructions-restart entry point's eligibility rules (UI-qce9 §2·§4), as
 * ONE pure module. The pause guard, the resume resolver and the wire decoration
 * all ask this — a second copy would let the disabled button and the server
 * refusal disagree about the same record.
 *
 * @import { Attempt } from './queue-store.js'
 */

/**
 * Why a record cannot be restarted with instructions. The strings are the
 * tooltip the disabled button shows, so they are user sentences rather than
 * codes; the `code` beside them is what the server logs and tests assert.
 *
 * @type {Record<string, string>}
 */
export const RESTART_INELIGIBLE_REASONS = {
  not_implementation: '구현 세션이 아닌 실행에는 제공하지 않습니다.',
  no_session_id: '세션 ID 기록 전 — 재시작 불가',
  no_process_identity: '프로세스 신원이 기록되지 않아 재시작할 수 없습니다.',
  exec_incomplete:
    '실행 설정 기록이 불완전해 같은 설정으로 재시작할 수 없습니다.',
  account_missing:
    '실행 계정이 기록되지 않아 같은 계정으로 재시작할 수 없습니다.',
  not_restartable: '재시작할 수 있는 상태가 아닙니다.',
  pause_not_settled: '중단 정산이 끝나지 않아 이어할 수 없습니다.'
};

/**
 * Resolve a verified process identity from the durable record. Legacy attempts
 * may infer `pgid = pid`, but every observed value is proven before a signal.
 *
 * @param {any} attempt
 * @returns {{ pid: number, pgid: number, started_at: number }|null}
 */
export function processIdentityOf(attempt) {
  const identity = attempt?.process_identity;
  if (
    identity &&
    Number.isInteger(identity.pid) &&
    Number.isInteger(identity.pgid) &&
    Number.isFinite(identity.started_at)
  ) {
    return identity;
  }
  if (
    attempt &&
    Number.isInteger(attempt.pid) &&
    Number.isFinite(attempt.started_at)
  ) {
    return {
      pid: attempt.pid,
      pgid: attempt.pid,
      started_at: attempt.started_at
    };
  }
  return null;
}

/**
 * The provider account this record actually ran under, by its recorded runner.
 * `null` on a record that pinned no account: §5.2 refuses to read that as
 * evidence of the account that happened to be logged in.
 *
 * @param {any} attempt
 * @returns {string|null}
 */
export function activeAccountOf(attempt) {
  const value =
    attempt?.runner === 'codex'
      ? attempt?.codex_account
      : attempt?.claude_account;
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Whether this record is an ORDINARY implementation run (§2). Review sessions,
 * conflict resolutions, REVISE dispositions, cleanup diagnoses and retired
 * lanes each have a different result owner, so the queue's own authority — not
 * a user restart — moves them. A quick_fix-lane implementation IS one.
 *
 * @param {any} attempt
 * @returns {boolean}
 */
export function isOrdinaryImplementationAttempt(attempt) {
  if (!attempt || typeof attempt !== 'object') {
    return false;
  }
  const kind = attempt.kind;
  if (kind !== undefined && kind !== null && kind !== 'implementation') {
    return false;
  }
  return (
    attempt.conflict_resolution !== true &&
    attempt.external_conflict !== true &&
    attempt.cleanup_diagnosis !== true &&
    (attempt.disposition === undefined ||
      attempt.disposition === null ||
      attempt.disposition === false)
  );
}

/**
 * Whether the execution tuple is recorded completely enough to be REUSED
 * verbatim (§5.2). Missing values are never topped up from current defaults, so
 * an incomplete record is a refusal rather than an approximation.
 *
 * @param {any} attempt
 * @returns {boolean}
 */
export function execRecordComplete(attempt) {
  const values = attempt?.exec_values;
  if (!values || typeof values !== 'object' || Array.isArray(values)) {
    return false;
  }
  if (
    !EXEC_SETTING_KEYS.every(
      (key) =>
        Object.hasOwn(values, key) &&
        (typeof values[key] === 'string' || values[key] === null)
    )
  ) {
    return false;
  }
  return (
    Object.hasOwn(attempt, 'model') &&
    Object.hasOwn(attempt, 'effort') &&
    Object.hasOwn(attempt, 'speed')
  );
}

/**
 * @typedef {Object} RestartEligibility
 * @property {boolean} eligible
 * @property {string|null} code - Machine reason; null when eligible.
 * @property {string|null} reason - The user sentence for `code`.
 */

/**
 * @param {string} code
 * @returns {RestartEligibility}
 */
function refuse(code) {
  return {
    eligible: false,
    code,
    reason: RESTART_INELIGIBLE_REASONS[code] ?? null
  };
}

/**
 * The RECORD half of the judgment: everything that must be true of the stored
 * attempt regardless of what state it is in right now.
 *
 * @param {any} attempt
 * @returns {RestartEligibility}
 */
export function restartRecordEligibility(attempt) {
  const recorded = recordedExecutionEligibility(attempt);
  if (!recorded.eligible) {
    return recorded;
  }
  if (processIdentityOf(attempt) === null) {
    return refuse('no_process_identity');
  }
  return recorded;
}

/**
 * The RESUME half of the record judgment (§5.2): what the recorded attempt
 * must carry for its session and execution tuple to be reused verbatim. A
 * process identity is not part of it — that is what a SIGNAL needs, and a
 * resume targets a record whose process is already gone.
 *
 * @param {any} attempt
 * @returns {RestartEligibility}
 */
export function recordedExecutionEligibility(attempt) {
  if (!isOrdinaryImplementationAttempt(attempt)) {
    return refuse('not_implementation');
  }
  if (
    typeof attempt.session_id !== 'string' ||
    attempt.session_id.length === 0
  ) {
    return refuse('no_session_id');
  }
  if (
    typeof attempt.runner !== 'string' ||
    !RUNNERS.includes(attempt.runner) ||
    !execRecordComplete(attempt)
  ) {
    return refuse('exec_incomplete');
  }
  if (activeAccountOf(attempt) === null) {
    return refuse('account_missing');
  }
  return { eligible: true, code: null, reason: null };
}

/**
 * The full judgment the button and the pause guard share: the record checks
 * plus the state gate. A `running` attempt may be restarted (pause first); a
 * `paused` one whose durable pause reached `done` may be continued directly.
 *
 * @param {any} attempt
 * @returns {RestartEligibility}
 */
export function instructionsRestartEligibility(attempt) {
  const record = restartRecordEligibility(attempt);
  if (!record.eligible) {
    return record;
  }
  if (attempt.status === 'running') {
    return record;
  }
  if (attempt.status === 'paused') {
    return attempt.control?.kind === 'pause' && attempt.control.phase === 'done'
      ? record
      : refuse('pause_not_settled');
  }
  return refuse('not_restartable');
}
