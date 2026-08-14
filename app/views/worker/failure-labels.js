/**
 * One shared vocabulary for repo-operation and cleanup failures (UI-q0uy §4.3).
 *
 * The contract tokens themselves are owned by dotfiles' workflow contract —
 * this module is a CONSUMER map that only says a known token in Korean. Three
 * category words (검증 실패 · 배포 실패 · 중단됨) plus one cause sentence per
 * known code, so the strip, the timeline and the session banner all describe
 * the same failure the same way.
 *
 * An unknown token is never guessed at: it travels through as the raw string
 * (the `POLICY_TOKEN_LABELS` fallback convention), and every surface keeps the
 * raw code inside its "세부" disclosure regardless, so the debugging path is
 * preserved even where a sentence exists.
 */

/**
 * Contract token → the human category word.
 *
 * @type {Record<string, string>}
 */
const FAILURE_CATEGORIES = {
  verify_failed: '검증 실패',
  verify_cmd_failed: '검증 실패',
  verify_script_failure: '검증 실패',
  deploy_failed: '배포 실패',
  deploy_script_failure: '배포 실패',
  interrupted_without_terminal_exit: '중단됨'
};

/**
 * Contract token → the cause sentence.
 *
 * @type {Record<string, string>}
 */
const FAILURE_SENTENCES = {
  repo_ops_worktree_unowned:
    '배포 워크트리가 아직 Worker 소유가 아니어서 스크립트 실행 전에 중단됐습니다.',
  verify_cmd_failed: '머지 후 검증 명령이 실패했습니다.',
  gh_observation_failed: 'GitHub에서 PR 상태를 읽지 못했습니다.',
  verify_script_failure: '검증 스크립트가 실패했습니다.',
  deploy_script_failure: '배포 스크립트가 실패했습니다.',
  interrupted_without_terminal_exit: '작업이 종료 기록 없이 중단됐습니다.'
};

/**
 * Split a possibly composite code (`verify_failed:gh_observation_failed`) into
 * its segments. A non-string or empty value yields no segments at all, which is
 * what keeps every accessor below fail-quiet.
 *
 * @param {unknown} code
 * @returns {string[]}
 */
function segmentsOf(code) {
  if (typeof code !== 'string' || code.length === 0) {
    return [];
  }
  return code.split(':').filter((segment) => segment.length > 0);
}

/**
 * The category word for a failure code, or null when no segment maps to one.
 *
 * @param {unknown} code
 * @returns {string|null}
 */
export function failureCategory(code) {
  for (const segment of segmentsOf(code)) {
    if (FAILURE_CATEGORIES[segment]) {
      return FAILURE_CATEGORIES[segment];
    }
  }
  return null;
}

/**
 * The cause sentence for a failure code, or null when no segment maps to one.
 * The LAST matching segment wins: in `verify_failed:gh_observation_failed` the
 * prefix names the lane and the suffix names what actually went wrong.
 *
 * @param {unknown} code
 * @returns {string|null}
 */
export function failureSentence(code) {
  /** @type {string|null} */
  let found = null;
  for (const segment of segmentsOf(code)) {
    if (FAILURE_SENTENCES[segment]) {
      found = FAILURE_SENTENCES[segment];
    }
  }
  return found;
}

/**
 * The human text for a failure code: `범주 — 문장` when both are known, either
 * half alone when only one is, and the RAW code when neither is (§4.3 폴백).
 * An empty/absent code renders nothing.
 *
 * @param {unknown} code
 * @returns {string}
 */
export function failureText(code) {
  const category = failureCategory(code);
  const sentence = failureSentence(code);
  if (category && sentence) {
    return `${category} — ${sentence}`;
  }
  if (category || sentence) {
    return /** @type {string} */ (category || sentence);
  }
  return typeof code === 'string' ? code : '';
}

/**
 * Whether this code has any mapped wording at all. Surfaces use it to decide
 * whether the raw token is being shown as a fallback (which §7-2 allows) rather
 * than as a leak.
 *
 * @param {unknown} code
 * @returns {boolean}
 */
export function isKnownFailure(code) {
  return failureCategory(code) !== null || failureSentence(code) !== null;
}
