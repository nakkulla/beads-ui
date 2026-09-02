/**
 * One shared vocabulary for repo-operation and cleanup failures (UI-q0uy §4.3).
 *
 * The contract tokens themselves are owned by dotfiles' workflow contract —
 * this module is a CONSUMER map that only says a known token in Korean. A small
 * set of category words (검증 실패 · 배포 실패 · 잡 실패 · 중단됨) plus one cause
 * sentence per known code, so the strip, the timeline and the session banner
 * all describe the same failure the same way.
 *
 * An unknown token is never guessed at: it travels through as the raw string
 * (the `POLICY_TOKEN_LABELS` fallback convention), and every surface keeps the
 * raw code inside its "세부" disclosure regardless, so the debugging path is
 * preserved even where a sentence exists.
 */
// The cause sentences live in a dependency-free leaf (UI-8w4t §4) so the
// server's completion failure comment can read the SAME map; this module pulls
// lit-html through `lanes.js` and therefore cannot be the shared copy.
import { FAILURE_SENTENCES } from '../../utils/failure-sentences.js';
import { formatElapsed } from './lanes.js';

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
  // UI-i60a §4. A post-merge job is not a deployment: it runs once per file,
  // against the merged tree, and calling its failure 배포 실패 would send a
  // reader to the deploy script that never ran. The token is derived in THIS
  // repository (`classifyRepoOperationFailure`), so the word is added here with
  // it rather than waiting on the pinned policy artifact.
  job_script_failure: '잡 실패',
  interrupted_without_terminal_exit: '중단됨',
  quickfix_landing_failed: '착지 실패',
  runner_exit: '세션 실패',
  // UI-5ym8 §3: 파킹은 실패가 아니라 사람의 결정을 기다리는 결말이고, 세션이
  // 미해소로 정상 종료한 것은 세션 자체의 실패와 다른 사실이다. 둘 다
  // `session_` 접두 규칙이 '세션 실패'로 뭉뚱그리기 전에 자기 낱말을 얻는다.
  session_parked: '세션 대기',
  session_ended_unresolved: '세션 종료',
  // 선행 대기 계층 §5.3. 실패 팝오버 경로에는 오지 않는다 — 그 타일은 `failure`
  // 투영을 얻지 않는다 — 그러나 attempt 이력과 로그 줄이 cause를 사람 말로
  // 바꿀 때 이 낱말을 읽는다.
  prerequisite_unmet: '선행 대기',
  // 착지가 실패한 것이 아니라 착지를 증명할 push 기록·영수증이 모자란 것이다
  // (§5). 합성 코드에서는 앞선 `quickfix_landing_failed`가 먼저 잡히므로 이
  // 낱말은 토큰이 단독으로 올 때 쓰인다.
  delivery_unproven: '착지 증거 부족'
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
 * The mapped category word for a failure code, before the public fallback.
 *
 * @param {unknown} code
 * @returns {string|null}
 */
function mappedFailureCategory(code) {
  for (const segment of segmentsOf(code)) {
    // Own-property only: a token like `constructor` or `toString` would
    // otherwise match a prototype member and escape the raw-token fallback.
    if (Object.hasOwn(FAILURE_CATEGORIES, segment)) {
      return FAILURE_CATEGORIES[segment];
    }
    if (segment.startsWith('session_')) {
      return '세션 실패';
    }
  }
  return null;
}

/**
 * The category word for a failure code. A present but unclassified token is
 * still a failure, while absent or malformed input stays quiet.
 *
 * @param {unknown} code
 * @returns {string|null}
 */
export function failureCategory(code) {
  if (segmentsOf(code).length === 0) {
    return null;
  }
  return mappedFailureCategory(code) || '실패';
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
  const category = mappedFailureCategory(code);
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
  return mappedFailureCategory(code) !== null || failureSentence(code) !== null;
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
  const category = mappedFailureCategory(kind) ?? mappedFailureCategory(code);
  const sentence = failureSentence(code) ?? failureSentence(kind);
  if (category && sentence) {
    return `${category} — ${sentence}`;
  }
  if (category || sentence) {
    return /** @type {string} */ (category || sentence);
  }
  return typeof code === 'string' ? code : '';
}

/**
 * Failure codes that stop a repo operation BEFORE its script is invoked — the
 * declaration read, the bounded fetch, the deploy-worktree ownership check, the
 * wait for an unresolved sibling operation.
 *
 * They matter here because the 종료 원인 line describes a PROCESS that ran and
 * died. No process existed for these, so `exit_code`/`signal` carry the wrapper's
 * numbers rather than the script's, and printing them would answer a question
 * nobody asked while implying a script failed. The existing cause sentence
 * already says what stopped, so the line is omitted entirely (UI-s582 §2).
 *
 * @type {Set<string>}
 */
const PRE_SCRIPT_FAILURE_CODES = new Set(['repo_operation_timeout_unresolved']);

/**
 * Whether this failure happened before the script was invoked. The `repo_ops_`
 * PREFIX is deliberate: every declaration/precondition token the coordinator can
 * record shares it, so a token added later is excluded without a client change.
 *
 * @param {unknown} code
 * @returns {boolean}
 */
function isPreScriptFailure(code) {
  for (const segment of segmentsOf(code)) {
    if (
      PRE_SCRIPT_FAILURE_CODES.has(segment) ||
      segment.startsWith('repo_ops_')
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Whether this operation card ended by being interrupted rather than by exiting.
 * Three fields say it and any one of them is enough: the raw `failure.code`, the
 * server's `failure_kind` classification, and the `failure.interrupted` flag the
 * projection always carries.
 *
 * @param {any} operation
 * @param {any} failure
 * @returns {boolean}
 */
function isInterrupted(operation, failure) {
  return (
    failure.code === 'interrupted' ||
    failure.interrupted === true ||
    operation.failure_kind === 'interrupted_without_terminal_exit' ||
    failure.code === 'interrupted_without_terminal_exit'
  );
}

/**
 * The 종료 원인 line: HOW the operation's process ended (UI-s582 §2).
 *
 * The cause sentence above it names the failure category; this names the
 * termination itself, which the category deliberately flattens — a `timeout` and
 * an ordinary nonzero exit both classify as `verify_script_failure`, so without
 * this line a reader cannot tell a script that failed from one that was cut off.
 *
 * Judgement order is timeout → interrupted → signal → exit_code, because the
 * later fields are still populated by the earlier cases and would misdescribe
 * them: a timeout carries `exit 124`, and an interruption carries whatever the
 * wrapper last saw. Nothing usable means no line rather than a guess.
 *
 * `timeout_ms` is the LANE DECLARATION's limit (`repo_ops.<kind>.timeout_ms`),
 * not a field of the card — a caller that does not have the declaration in hand
 * omits it and the line says only that the limit was exceeded.
 *
 * @param {any} operation - One projected `repo_operations[]` card.
 * @param {unknown} [timeout_ms] - The lane declaration's limit, when known.
 * @returns {string}
 */
export function terminationText(operation, timeout_ms) {
  if (!operation || typeof operation !== 'object') {
    return '';
  }
  const failure = operation.failure;
  if (!failure || typeof failure !== 'object') {
    return '';
  }
  if (isPreScriptFailure(failure.code)) {
    return '';
  }
  if (failure.code === 'timeout') {
    const limit = Number(timeout_ms);
    return Number.isFinite(limit) && limit > 0
      ? `타임아웃 ${Math.round(limit / 1000)}초 초과`
      : '타임아웃 초과';
  }
  if (isInterrupted(operation, failure)) {
    return '종료 기록 없음 — 중단됨';
  }
  const elapsed =
    typeof operation.elapsed_ms === 'number' &&
    Number.isFinite(operation.elapsed_ms) &&
    operation.elapsed_ms >= 0
      ? ` · ${formatElapsed(operation.elapsed_ms)}`
      : '';
  if (typeof operation.signal === 'string' && operation.signal.length > 0) {
    return `signal ${operation.signal}${elapsed}`;
  }
  if (Number.isInteger(operation.exit_code)) {
    return `exit ${operation.exit_code}${elapsed}`;
  }
  return '';
}

/**
 * Why `script_retry` could not run at all. Only `schema_unsupported` exists under
 * the pinned schema 3; an unknown reason travels through raw, the same fallback
 * every other token in this module gets.
 *
 * @type {Record<string, string>}
 */
const RETRY_BLOCKED_SENTENCES = {
  schema_unsupported: '핀된 정책 스키마를 지원하지 않습니다.'
};

/**
 * The 재시도 결과 line: what the ONE automatic step (`script_retry`) did
 * (UI-s582 §2).
 *
 * `blocked_reason` is read FIRST and without comparing fingerprints: it means the
 * step never ran, so there is no second failure to compare against and any
 * fingerprint talk would be fiction. `absorbed` is the only outcome that belongs
 * on a SUCCEEDED card — it is the record of a failure the retry erased, which is
 * otherwise invisible.
 *
 * A `consumed` status with no `first_fingerprint` is treated as NO evidence
 * rather than as a differing fingerprint: the server's normalizer reports
 * `consumed` for a failed record that carries no retry object at all (the
 * conservative "assume the one attempt is spent" default), and calling that a
 * second, different failure would invent a run that never happened.
 *
 * @param {any} operation - One projected `repo_operations[]` card.
 * @returns {string}
 */
export function retryOutcomeText(operation) {
  if (!operation || typeof operation !== 'object') {
    return '';
  }
  const retry = operation.retry;
  if (!retry || typeof retry !== 'object') {
    return '';
  }
  if (typeof retry.blocked_reason === 'string' && retry.blocked_reason) {
    const sentence = Object.hasOwn(
      RETRY_BLOCKED_SENTENCES,
      retry.blocked_reason
    )
      ? RETRY_BLOCKED_SENTENCES[retry.blocked_reason]
      : retry.blocked_reason;
    return `자동 재시도 못 함 — ${sentence}`;
  }
  if (retry.status === 'absorbed') {
    const absorbed =
      retry.absorbed && typeof retry.absorbed === 'object'
        ? retry.absorbed
        : null;
    const cause = failureText(absorbed?.first_failure?.code);
    return cause
      ? `자동 재시도로 해소됨 — 첫 실패: ${cause}`
      : '자동 재시도로 해소됨';
  }
  // Everything below describes a failure. On a card that did not fail these
  // statuses are the normalizer's defaults, not observations.
  if (operation.state !== 'failed') {
    return '';
  }
  if (retry.status === 'not_applicable') {
    return '재시도 대상 아님 — 스크립트 실행 전 실패';
  }
  if (retry.status === 'consumed') {
    const first =
      typeof retry.first_fingerprint === 'string' && retry.first_fingerprint
        ? retry.first_fingerprint
        : null;
    if (first === null) {
      return '';
    }
    if (first === operation.failure?.fingerprint) {
      return '자동 재시도 1회 — 같은 실패';
    }
    const cause = failureText(retry.first_failure?.code);
    return cause
      ? `자동 재시도 1회 — 다른 실패: ${cause}`
      : '자동 재시도 1회 — 다른 실패';
  }
  return '';
}
