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
 * Compose the full prompt sent to a runner: the unattended preamble, an optional
 * fast_track directive, the always-on PR-submit directive, then the caller's
 * base prompt.
 *
 * @param {string} base_prompt - The task prompt for the session.
 * @param {{ fast_track?: boolean }} [options]
 * @returns {string} The preamble-wrapped prompt.
 */
export function applyPreamble(base_prompt, options = {}) {
  const parts = [UNATTENDED_PREAMBLE];
  if (options.fast_track) {
    parts.push(FAST_TRACK_DIRECTIVE);
  }
  parts.push(PR_SUBMIT_DIRECTIVE);
  parts.push(String(base_prompt ?? ''));
  return parts.join('\n\n');
}
