/**
 * Which of a repo's attempts are still "실행중" (UI-eey2 §9.4).
 *
 * This lives in `app/utils/` rather than beside the lane builder because BOTH
 * sides need the same answer: the monitor client folds these attempts into its
 * 실행중 레인, and the server's `workspaces_state[].counts` must agree with that
 * lane or the deck's `실행 n` contradicts the lanes it summarizes. Two copies of
 * the predicate is exactly how they would drift, so there is one.
 *
 * The rule is not `status === 'running'`: 실행중 레인은 leaf paused 와 아직
 * 처리되지 않은 실패까지 받는다 — 재개·실패 정리 액션에 도달할 경로가 그
 * 레인뿐이기 때문이다. And it is per BEAD, not per attempt: one bead with two
 * unfinished attempts is one card, so it must be one count.
 */

/**
 * Which live state wins when one bead carries several unfinished attempts.
 *
 * @type {Record<string, number>}
 */
const RUN_STATE_RANK = { running: 3, paused: 2, failed: 1 };

/**
 * Whether an attempt is the bead's own implementation run rather than one of
 * the head-review lane's attempts (UI-hk74 §7).
 *
 * This is an OCCUPANCY test, not a visibility one. `head_review` / `head_repair`
 * attempts belong on every history surface — 완료 레인, 토큰 합계, 세션 타일 —
 * but they run against a bead whose PR is already open, so letting one hold the
 * bead's 실행중 slot would redraw a card the person already sent to PR 대기.
 * Legacy records carry no `kind` and are implementation runs by definition.
 *
 * @param {unknown} attempt
 */
export function isImplementationAttempt(attempt) {
  if (!attempt || typeof attempt !== 'object') {
    return false;
  }
  const kind = /** @type {Record<string, unknown>} */ (attempt).kind;
  return kind === undefined || kind === null || kind === 'implementation';
}

/**
 * @typedef {Object} ActiveAttemptState
 * @property {any} attempt - The raw attempt record that won its bead.
 * @property {'running'|'paused'|'failed'} run_state
 * @property {number|null} started_at
 */

/**
 * Fold one repo's UNFINISHED attempts onto the beads they belong to.
 *
 * @param {Record<string, any>} attempts
 * @param {Map<string, number>} done_at_by_bead - `done` 레인의 `added_at`;
 * 그보다 앞서 끝난 실패는 이미 처리된 것으로 본다.
 * @returns {{ winners: Map<string, ActiveAttemptState>, resumed_from_ids: Set<string> }}
 */
export function activeAttemptStates(attempts, done_at_by_bead) {
  const values = /** @type {any[]} */ (Object.values(attempts || {}));
  /** @type {Set<string>} */
  const resumed_from_ids = new Set();
  /** @type {Map<string, string>} */
  const last_attempt_by_bead = new Map();
  for (const a of values) {
    if (!a || typeof a.bead_id !== 'string') {
      continue;
    }
    if (typeof a.resumed_from === 'string' && a.resumed_from.length > 0) {
      resumed_from_ids.add(a.resumed_from);
    }
    // "이 bead의 마지막 시도"는 구현 시도들 사이에서만 뜻이 있다: head review가
    // 뒤에 끼면 처리되지 않은 구현 실패가 조용히 마지막 자리를 잃는다.
    if (isImplementationAttempt(a)) {
      last_attempt_by_bead.set(a.bead_id, a.attempt_id);
    }
  }

  /** @type {Map<string, ActiveAttemptState>} */
  const winners = new Map();
  for (const a of values) {
    if (!a || typeof a.bead_id !== 'string' || a.bead_id.length === 0) {
      continue;
    }
    if (!isImplementationAttempt(a)) {
      continue;
    }
    /** @type {'running'|'paused'|'failed'|null} */
    let run_state = null;
    if (a.status === 'running') {
      run_state = 'running';
    } else if (a.status === 'paused' && !resumed_from_ids.has(a.attempt_id)) {
      run_state = 'paused';
    } else if (a.status === 'failed' || a.status === 'orphaned') {
      const done_at = done_at_by_bead.get(a.bead_id);
      const resolved_by_done =
        typeof done_at === 'number' &&
        done_at > 0 &&
        typeof a.finished_at === 'number' &&
        done_at >= a.finished_at;
      if (
        last_attempt_by_bead.get(a.bead_id) === a.attempt_id &&
        !resolved_by_done &&
        typeof a.dismissed_at !== 'number'
      ) {
        run_state = 'failed';
      }
    }
    if (!run_state) {
      continue;
    }
    const started_at = typeof a.started_at === 'number' ? a.started_at : null;
    const prior = winners.get(a.bead_id);
    if (prior) {
      const prior_rank = RUN_STATE_RANK[prior.run_state];
      const rank = RUN_STATE_RANK[run_state];
      if (
        prior_rank > rank ||
        (prior_rank === rank && (prior.started_at ?? 0) > (started_at ?? 0))
      ) {
        continue;
      }
    }
    winners.set(a.bead_id, { attempt: a, run_state, started_at });
  }
  return { winners, resumed_from_ids };
}

/**
 * The beads the 실행중 레인 owns, which is what `counts.running` counts.
 *
 * @param {Record<string, any>} attempts
 * @param {Map<string, number>} done_at_by_bead
 * @returns {Set<string>}
 */
export function activeBeadIds(attempts, done_at_by_bead) {
  return new Set(activeAttemptStates(attempts, done_at_by_bead).winners.keys());
}
