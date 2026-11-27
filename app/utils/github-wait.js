/**
 * The merge queue's GitHub connection-wait vocabulary (UI-aui8 §3.2–§3.9) —
 * the ONE copy the server (pr actions, merge queue, queue store, notify) and
 * the Worker/monitor cards read. Pure data with no imports, like
 * `failure-sentences.js`, so both runtimes can load it.
 */

/**
 * The refusal and hold reason of a transient GitHub failure (`network`,
 * `rate_limit`) anywhere in a merge turn. Where it failed is the wait point,
 * never part of the reason.
 */
export const GITHUB_UNREACHABLE = 'github_unreachable';

/**
 * The hold reason of a permanent GitHub failure whose PR head was never read
 * (UI-aui8 §3.6): no head can be pinned, so the item keeps its slot instead of
 * halting the drain.
 */
export const GITHUB_HEAD_UNREADABLE = 'github_head_unreadable';

/**
 * The exclusion reason of a candidate that moved on three consecutive
 * pre-merge rechecks of one turn (UI-aui8 §3.4).
 */
export const VERIFY_CANDIDATE_MOVED = 'verify_candidate_moved';

/**
 * Where in a merge turn a GitHub call failed.
 *
 * @typedef {'gate_read'|'verify_recheck'|'merge_command'|'merge_confirm'|'resolution'} GithubWaitPoint
 */

/**
 * Wait point → the Korean phrase a badge tooltip, history line and
 * notification body say.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const GITHUB_WAIT_POINT_LABELS = Object.freeze({
  gate_read: '게이트 읽기',
  verify_recheck: '머지 직전 재확인',
  merge_command: '머지 명령',
  merge_confirm: '머지 뒤 상태 확인',
  resolution: '충돌 해소·base 갱신'
});

/**
 * GitHub failure class → the Korean phrase for a tooltip or notification.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const GITHUB_FAILURE_CLASS_LABELS = Object.freeze({
  network: '네트워크',
  rate_limit: '호출 한도',
  auth: '인증',
  unknown: '알 수 없음'
});

/**
 * The Korean phrase of a permanent GitHub failure or a moved-candidate
 * exclusion (UI-aui8 §3.9).
 *
 * @type {Readonly<Record<string, string>>}
 */
export const GITHUB_FAILURE_PHRASES = Object.freeze({
  [VERIFY_CANDIDATE_MOVED]: '머지 직전 후보가 계속 바뀜',
  auth: 'GitHub 인증 실패',
  unknown: 'GitHub 확인 실패'
});

/**
 * The name of the connection wait wherever a person reads it — the PR-wait
 * badge, a history line, a refused `[머지]` click (UI-aui8 §3.9, §3.10).
 */
export const GITHUB_WAIT_LABEL = 'GitHub 연결 대기';

/**
 * Reason prefixes whose tail is the GitHub failure class of a permanent
 * failure (UI-aui8 §3.2, §3.6), each with the wait point it failed at: the
 * gate read (PR read, workspace and foreign base fetch), the base update, the
 * merge command, the post-merge confirm, and the pre-merge recheck.
 *
 * @type {Readonly<Record<string, GithubWaitPoint>>}
 */
const CLASS_TAIL_POINTS = Object.freeze({
  'gh_failed:': 'gate_read',
  'base_unresolved:fetch:': 'gate_read',
  'base_fetch_failed:': 'gate_read',
  'update_branch_failed:': 'resolution',
  'merge_failed:': 'merge_command',
  'merge_unconfirmed_timeout:': 'merge_confirm',
  'verify_candidate_unreadable:': 'verify_recheck'
});

/**
 * The failure class a permanent-failure reason ends with, or null.
 *
 * @param {string} reason
 * @returns {string|null}
 */
function classTailOf(reason) {
  for (const prefix of Object.keys(CLASS_TAIL_POINTS)) {
    if (reason.startsWith(prefix)) {
      const tail = reason.slice(prefix.length);
      return Object.hasOwn(GITHUB_FAILURE_CLASS_LABELS, tail) ? tail : null;
    }
  }
  return null;
}

/**
 * The wait point a GitHub exclusion reason failed at (UI-aui8 §3.9: the point
 * rides in the tooltip), or null for a reason that names none.
 *
 * @param {unknown} reason
 * @returns {GithubWaitPoint|null}
 */
export function githubFailurePoint(reason) {
  if (typeof reason !== 'string') {
    return null;
  }
  if (reason.replace(/^retry_exhausted:/, '') === VERIFY_CANDIDATE_MOVED) {
    return 'verify_recheck';
  }
  for (const [prefix, point] of Object.entries(CLASS_TAIL_POINTS)) {
    if (reason.startsWith(prefix)) {
      return point;
    }
  }
  return null;
}

/**
 * The Korean phrase of a permanent GitHub failure or a moved-candidate
 * exclusion (UI-aui8 §3.9), chosen by the failure class — the one given, or
 * the one the reason ends with. Null for the connection wait and for any
 * reason GitHub did not decide, so the caller keeps its own wording.
 *
 * @param {unknown} reason - A refusal, hold or exclusion reason.
 * @param {unknown} [failure_class]
 * @returns {string|null}
 */
export function githubFailurePhrase(reason, failure_class) {
  const text =
    typeof reason === 'string' ? reason.replace(/^retry_exhausted:/, '') : '';
  if (text === VERIFY_CANDIDATE_MOVED) {
    return GITHUB_FAILURE_PHRASES[VERIFY_CANDIDATE_MOVED];
  }
  if (text === GITHUB_UNREACHABLE) {
    return null;
  }
  const given =
    typeof failure_class === 'string' && failure_class.length > 0
      ? failure_class
      : null;
  if (text === GITHUB_HEAD_UNREADABLE) {
    return (
      GITHUB_FAILURE_PHRASES[given ?? 'unknown'] ??
      GITHUB_FAILURE_PHRASES.unknown
    );
  }
  const failure = given ?? classTailOf(text);
  return failure !== null && Object.hasOwn(GITHUB_FAILURE_PHRASES, failure)
    ? GITHUB_FAILURE_PHRASES[failure]
    : null;
}

/**
 * The Korean reason a GitHub refusal reads as (UI-aui8 §3.10): the
 * connection wait by name, a permanent failure by its class phrase, and null
 * for a reason GitHub did not decide.
 *
 * @param {unknown} reason
 * @param {unknown} [failure_class]
 * @returns {string|null}
 */
export function githubReasonText(reason, failure_class) {
  if (reason === GITHUB_UNREACHABLE) {
    return GITHUB_WAIT_LABEL;
  }
  return githubFailurePhrase(reason, failure_class);
}

/**
 * Whether a merge hold is the connection wait (UI-aui8 §3.3).
 *
 * @param {unknown} hold - A `merge_holds` record, or nothing.
 * @returns {boolean}
 */
export function isGithubWaitHold(hold) {
  return (
    !!hold &&
    typeof hold === 'object' &&
    /** @type {{ reason?: unknown }} */ (hold).reason === GITHUB_UNREACHABLE
  );
}

/**
 * Whether a merge hold is one of the GitHub holds — the connection wait or the
 * permanent-failure hold — that no review session, resolver or failure
 * conversation reacts to (UI-aui8 §3.3, §3.6).
 *
 * @param {unknown} hold - A `merge_holds` record, or nothing.
 * @returns {boolean}
 */
export function isGithubHold(hold) {
  if (!hold || typeof hold !== 'object') {
    return false;
  }
  const reason = /** @type {{ reason?: unknown }} */ (hold).reason;
  return reason === GITHUB_UNREACHABLE || reason === GITHUB_HEAD_UNREADABLE;
}
