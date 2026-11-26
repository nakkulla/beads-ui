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
