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
 * The pr_stop terminal directive (worker-autorun-policy §2/§3): the session
 * delivers a PR and records `resolved`, but never merges — the merge is a
 * human decision (`pr-finish`). The merge-lock protocol block is NOT injected
 * alongside this directive (no merge → no lock).
 *
 * @type {string}
 */
export const PR_STOP_DIRECTIVE =
  'merge_policy=pr_stop — PR 생성·CI 확인·bead `resolved`(pr_url metadata 포함) 기록까지 수행하고, 머지하지 말고 종료하라';

/**
 * The drift halt directive (worker-autorun-policy §2): on a material spec
 * drift verdict the session stops instead of self-rereviewing. auto_rereview
 * is the contract default and needs no directive.
 *
 * @type {string}
 */
export const DRIFT_HALT_DIRECTIVE =
  'drift_policy=halt — material spec drift 판정 시 작업을 중단하고 실패로 종료하라';

/**
 * @typedef {Object} MergeLockParams
 * @property {number} port - The beads-ui server port serving the merge-lock endpoint.
 * @property {string} repo - The target repo root (must match the session token's repo).
 * @property {string} target_base - The base branch the session merges into.
 */

/**
 * Build the merge-lock protocol block, with the concrete server port + repo +
 * target_base injected at dispatch. The session MUST hold the (repo,
 * target_base) merge lock before ANY merge into the base, and release it after
 * the merge + sweep. The adapter ALSO fails closed on an unlocked merge attempt
 * (see session.js) — this block makes the required protocol explicit so a
 * well-behaved session acquires the lock itself instead of being killed.
 *
 * @param {MergeLockParams} params
 * @returns {string}
 */
export function mergeLockProtocol(params) {
  const { port, repo, target_base } = params;
  const url = `http://127.0.0.1:${port}/api/worker/merge-lock`;
  const acquire = `curl -s -X POST ${url} -H "Authorization: Bearer $BDUI_WORKER_TOKEN" -H "Content-Type: application/json" -d '{"repo":"${repo}","target_base":"${target_base}"}'`;
  const release = `curl -s -X POST ${url} -H "Authorization: Bearer $BDUI_WORKER_TOKEN" -H "Content-Type: application/json" -d '{"repo":"${repo}","target_base":"${target_base}","action":"release"}'`;
  return [
    '머지 락 프로토콜 — target base로 머지하기 전 반드시 아래 순서를 지켜라:',
    `1) 획득: \`${acquire}\` 를 실행해 {"ok":true} 를 받을 때까지 대기.`,
    '2) 머지 + 스윕 수행.',
    `3) 해제: \`${release}\`.`,
    '락 획득 호출이 실패하면(비-2xx 또는 ok!=true) 머지를 중단(abort)하라. 락 없이 머지를 시도하면 세션이 즉시 종료된다.'
  ].join('\n');
}

/**
 * Compose the full prompt sent to a runner: the unattended preamble, an optional
 * fast_track directive, the policy directives (pr_stop / drift halt), an
 * optional merge-lock protocol block (with the injected server
 * port/repo/target_base — OMITTED under pr_stop, no merge means no lock), then
 * the caller's base prompt.
 *
 * @param {string} base_prompt - The task prompt for the session.
 * @param {{ fast_track?: boolean, merge_lock?: MergeLockParams, merge_policy?: string, drift_policy?: string }} [options]
 * @returns {string} The preamble-wrapped prompt.
 */
export function applyPreamble(base_prompt, options = {}) {
  const parts = [UNATTENDED_PREAMBLE];
  if (options.fast_track) {
    parts.push(FAST_TRACK_DIRECTIVE);
  }
  const pr_stop = options.merge_policy === 'pr_stop';
  if (pr_stop) {
    parts.push(PR_STOP_DIRECTIVE);
  }
  if (options.drift_policy === 'halt') {
    parts.push(DRIFT_HALT_DIRECTIVE);
  }
  if (
    !pr_stop &&
    options.merge_lock &&
    typeof options.merge_lock.repo === 'string' &&
    typeof options.merge_lock.target_base === 'string'
  ) {
    parts.push(mergeLockProtocol(options.merge_lock));
  }
  parts.push(String(base_prompt ?? ''));
  return parts.join('\n\n');
}
