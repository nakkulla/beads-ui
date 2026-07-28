/**
 * beads-ui-owned unattended preamble (spec §5.4).
 *
 * The preamble is prepended to every headless session prompt to declare the
 * unattended contract to the session: no interactive question tools, and any
 * hard-stop condition must be surfaced as a `blocker` line followed by an
 * abnormal exit rather than a question. Prompt trust is NOT the enforcement
 * mechanism — the runner adapter independently fails closed on any question /
 * approval event (see claude.js / codex.js). The preamble merely makes the
 * contract explicit so a well-behaved session self-reports instead of hanging.
 */

/**
 * The canonical unattended-mode preamble string.
 *
 * @type {string}
 */
export const UNATTENDED_PREAMBLE =
  '무인 모드 — 질문 도구 금지, hard-stop=blocker 출력 후 비정상 종료';

/**
 * The fast_track directive injected when the dispatch runs in fast_track mode.
 * Mirrors the `workflow_mode=fast_track` bead metadata the Worker records +
 * reads back before launch (spec §5.2) so the mode is double-delivered
 * (metadata + prompt).
 *
 * @type {string}
 */
export const FAST_TRACK_DIRECTIVE =
  'fast_track — 게이트 자동 디스패치(영수증만), 질문 없이 기본값으로 진행';

/**
 * The terminal directive, injected into EVERY session (worker-phase2 §1): the
 * session delivers a PR and records `resolved`, but never merges — the merge is
 * a human click. It is no longer a policy branch; with the merge axis gone
 * there is exactly one terminal shape, so the directive is a fixed constant.
 *
 * @type {string}
 */
export const PR_SUBMIT_DIRECTIVE =
  'PR 제출까지 수행하고 절대 머지하지 말 것 — PR 생성·CI 확인·bead `resolved`(pr_url metadata 포함) 기록까지 마친 뒤 종료하라. 머지는 사람의 클릭이다.';

/**
 * The guard-contract directive, injected into EVERY session regardless of
 * mode. The session engine enforces two fail-closed guards that a session
 * cannot see from its own vantage point, so the prompt must state them
 * explicitly rather than let the session discover them by triggering a kill:
 * (a) the merge guard (`command-guard.js` base-into-branch rule) SIGTERMs the
 * session the instant it runs `git merge` — a session that doesn't know this
 * can lose real work mid-merge instead of just being blocked at admission; a
 * conflict-resolution attempt is the sole named exception, since resolving an
 * in-flight conflict is not the same act as initiating a new merge. (b) the
 * headless process exits as soon as the turn ends, which kills any
 * background task left pending (e.g. an async review bridge) — a session
 * that ends its turn "to wait" for such a task silently loses the result
 * instead of actually waiting for it (worker-phase2 §1, UI-2wa9 attempt
 * `1785076768091-1`).
 *
 * @type {string}
 */
export const GUARD_CONTRACT_DIRECTIVE =
  '가드 계약 고지 — (1) `git merge` 절대 금지: 충돌 해소 attempt를 제외하고 세션 엔진이 `git merge` 실행 즉시 세션을 종료한다. (2) 백그라운드 태스크를 대기 상태로 둔 채 턴을 끝내지 말 것: headless 프로세스가 턴 종료와 동시에 종료되며 대기 중이던 태스크가 함께 kill되어 결과(예: 리뷰 결과)가 유실된다.';

/**
 * The default task prompt for a first dispatch: the bead id plus the instruction
 * to run it through the contract-native flow. It lives here rather than only in
 * the adapter because the scheduler builds ON it when a dispatch carries extra
 * observed facts (the stale-receipt block, UI-dlim §3.2) — one source keeps the
 * two from drifting apart.
 *
 * @param {string} bead_id
 * @returns {string}
 */
export function defaultTaskPrompt(bead_id) {
  return `Bead ${bead_id} 작업을 계약 네이티브 흐름으로 완료하라.`;
}

/**
 * Compose the full prompt sent to a runner: the unattended preamble, an optional
 * fast_track directive, the PR-submit and guard-contract directives, then the
 * caller's base prompt.
 *
 * `pr_submit: false` drops the PR-submit directive — the ONE session shape that
 * must not open a PR is the REVISE-disposition repair (UI-hs11 §3.3), which
 * commits a spec fix on the shared target_base checkout and ends. Leaving the
 * directive in would order it to do exactly what its own task prompt forbids.
 *
 * @param {string} base_prompt - The task prompt for the session.
 * @param {{ fast_track?: boolean, pr_submit?: boolean }} [options]
 * @returns {string} The preamble-wrapped prompt.
 */
export function applyPreamble(base_prompt, options = {}) {
  const parts = [UNATTENDED_PREAMBLE];
  if (options.fast_track) {
    parts.push(FAST_TRACK_DIRECTIVE);
  }
  if (options.pr_submit !== false) {
    parts.push(PR_SUBMIT_DIRECTIVE);
  }
  parts.push(GUARD_CONTRACT_DIRECTIVE);
  parts.push(String(base_prompt ?? ''));
  return parts.join('\n\n');
}
