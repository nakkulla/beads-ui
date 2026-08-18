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
  interrupted_without_terminal_exit: '작업이 종료 기록 없이 중단됐습니다.',
  // Cleanup step 1 (base 포함 확인). This step runs before any repo operation
  // exists, so a stop here produces no operation card and no failure_kind —
  // the cleanup record's raw reason is the ONLY thing that can say what
  // happened, and these sentences are what turns it into an answer.
  base_unresolved: 'PR이 어느 base 브랜치로 머지되는지 확정하지 못했습니다.',
  base_ref_unobserved: 'PR의 base 브랜치를 아직 관측하지 못했습니다.',
  merge_sha_unobserved: '머지 커밋 SHA를 아직 관측하지 못했습니다.',
  base_fetch_failed: '원격 base 브랜치를 fetch하지 못했습니다.',
  base_rev_unavailable: 'fetch한 원격 base 브랜치의 커밋을 읽지 못했습니다.',
  base_ff_diverged:
    '로컬 base 브랜치가 원격과 갈라져 fast-forward로 정렬할 수 없습니다.',
  deployment_target_not_covering_merge:
    '배포 대상 base가 이 머지 커밋을 포함하지 않습니다.',
  deployment_candidate_ancestry_check_failed:
    '배포 대상 base가 이 머지 커밋을 포함하는지 확인하지 못했습니다.'
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
    // Own-property only: a token like `constructor` or `toString` would
    // otherwise match a prototype member and escape the raw-token fallback.
    if (Object.hasOwn(FAILURE_CATEGORIES, segment)) {
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
    if (Object.hasOwn(FAILURE_SENTENCES, segment)) {
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

/**
 * The human text for a repo-operation failure, which carries TWO contract
 * tokens: the raw `failure.code` and the server's own `failure_kind`
 * classification.
 *
 * They answer different halves. `failure_kind` is what the policy contract calls
 * this failure (검증 실패 · 배포 실패 · 중단됨) and is the only half that knows a
 * bare `script_failed` was a deploy script; `failure.code` is the specific cause
 * and, when it maps, says more than the kind can. So the category comes from the
 * kind first and the sentence from the code first, each falling back to the
 * other, and only a pair that maps to nothing at all falls back to the raw code.
 *
 * @param {unknown} kind - Server `failure_kind` (`other` when unclassified).
 * @param {unknown} code - Raw `failure.code`.
 * @returns {string}
 */
export function operationFailureText(kind, code) {
  const category = failureCategory(kind) ?? failureCategory(code);
  const sentence = failureSentence(code) ?? failureSentence(kind);
  if (category && sentence) {
    return `${category} — ${sentence}`;
  }
  if (category || sentence) {
    return /** @type {string} */ (category || sentence);
  }
  return typeof code === 'string' ? code : '';
}
