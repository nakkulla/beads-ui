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
 * Whether an attempt is the bead's own implementation run rather than a review
 * session (UI-d7fy §5.5).
 *
 * This is an OCCUPANCY test, not a visibility one. A `review_session` attempt
 * belongs on every history surface — 완료 레인, 토큰 합계, 세션 타일 — but it
 * runs against a bead whose PR is already open, so letting one hold the bead's
 * 실행중 slot would redraw a card the person already sent to PR 대기.
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
 * Whether a person took this attempt off the Worker with ✕ (2026-10-01
 * stall-reconcile D7). Such a `paused` record keeps its work but holds no
 * 실행중 seat, blocks no dispatch, and no automatic continuation reads it.
 *
 * @param {unknown} attempt
 */
export function isWithdrawnAttempt(attempt) {
  if (!attempt || typeof attempt !== 'object') {
    return false;
  }
  const record = /** @type {Record<string, unknown>} */ (attempt);
  return (
    record.status === 'paused' &&
    Boolean(record.withdrawn) &&
    typeof record.withdrawn === 'object'
  );
}

/**
 * Select each bead's latest implementation independently of snapshot key order.
 *
 * @param {Record<string, any>} attempts
 * @returns {Map<string, any>}
 */
export function latestImplementationAttempts(attempts) {
  /** @type {Map<string, any>} */
  const latest = new Map();
  for (const attempt of Object.values(attempts || {})) {
    if (
      !isImplementationAttempt(attempt) ||
      typeof attempt.bead_id !== 'string'
    ) {
      continue;
    }
    const prior = latest.get(attempt.bead_id);
    const at = attempt.started_at ?? attempt.finished_at ?? 0;
    const prior_at = prior
      ? (prior.started_at ?? prior.finished_at ?? 0)
      : -Infinity;
    if (
      at > prior_at ||
      (at === prior_at && String(attempt.attempt_id) > String(prior.attempt_id))
    ) {
      latest.set(attempt.bead_id, attempt);
    }
  }
  return latest;
}

/**
 * @typedef {Object} ReviewSessionAttemptState
 * @property {any} attempt
 * @property {'click'|'auto'|null} origin
 * @property {number|null} started_at
 */
/**
 * The review-session lane's still-running attempts, folded onto their beads
 * (UI-d7fy §5.5).
 *
 * Deliberately SEPARATE from {@link activeAttemptStates}: occupancy is an
 * implementation-attempt question and stays exactly as it was, while these
 * sessions are real running work a person must be able to see. The monitor
 * draws them as NON-OCCUPYING tiles — the bead itself keeps its PR 대기 seat.
 *
 * Only `running` counts. A settled review is history, and the 완료 레인 배지
 * already reports it.
 *
 * @param {Record<string, any>} attempts
 * @returns {Map<string, ReviewSessionAttemptState>}
 */
export function reviewSessionAttemptStates(attempts) {
  const values = /** @type {any[]} */ (Object.values(attempts || {}));
  /** @type {Map<string, ReviewSessionAttemptState>} */
  const winners = new Map();
  for (const a of values) {
    if (
      !a ||
      typeof a.bead_id !== 'string' ||
      a.bead_id.length === 0 ||
      a.kind !== 'review_session' ||
      a.status !== 'running'
    ) {
      continue;
    }
    const started_at = typeof a.started_at === 'number' ? a.started_at : null;
    const prior = winners.get(a.bead_id);
    if (prior && (prior.started_at ?? 0) > (started_at ?? 0)) {
      continue;
    }
    winners.set(a.bead_id, {
      attempt: a,
      origin: a.origin === 'click' || a.origin === 'auto' ? a.origin : null,
      started_at
    });
  }
  return winners;
}

/**
 * @typedef {Object} ActiveAttemptState
 * @property {any} attempt - The raw attempt record that won its bead.
 * @property {'running'|'paused'|'failed'} run_state
 * @property {number|null} started_at
 */

/**
 * The stages of an external wait that is still alive (`hold`·`detached`·
 * `completing`); a finished stage is history, never ownership (UI-68r5 §3.4).
 *
 * @type {ReadonlySet<string>}
 */
const LIVE_WAIT_STAGES = new Set(['hold', 'detached', 'completing']);

/**
 * The attempt statuses a failed seat can be in when a session takes the Bead
 * over (UI-68r5 §3.4): an unhandled failure, and a ladder rung still waiting
 * to redispatch it.
 *
 * @type {ReadonlySet<string>}
 */
const SESSION_GUARDED_STATUSES = new Set(['failed', 'orphaned', 'retry_wait']);

/**
 * One live external wait as the ownership judgment reads it.
 *
 * @typedef {Object} SessionOwnershipWait
 * @property {string|null} owner_kind
 * @property {string|null} owner_session_id
 * @property {string} stage
 * @property {number|null} registered_at - Epoch ms.
 */

/**
 * Everything the session ownership judgment needs about one Bead (UI-68r5
 * §3.4), built by {@link sessionOwnershipMaterial} on the server and carried
 * to the client unchanged, so both sides judge the same facts.
 *
 * @typedef {Object} SessionOwnershipMaterial
 * @property {SessionOwnershipWait[]} waits - The Bead's live external waits.
 * @property {string|null} status - The Bead's status, when a session row or a
 * bd read reported one.
 * @property {{ item: string, session_id: string }|null} current_ref - The
 * last valid `session_ref` entry, as `provider:session_id@host`.
 * @property {string[]} conversation_session_ids - Sessions of the Bead row's
 * own Worker conversation records.
 */

/**
 * The session id of a `provider:session_id@host` item, or of a bare
 * `provider:session_id`; null for anything else.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function sessionIdOfRef(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const match = /^(?:claude|codex):([^:@;\s]+)/.exec(value.trim());
  return match ? match[1] : null;
}

/**
 * Epoch ms of an ISO timestamp or a number, else null.
 *
 * @param {unknown} value
 * @returns {number|null}
 */
function epochOf(value) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === 'string' && value.length > 0) {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

/**
 * The latest implementation attempt of a Bead whose failure a session could
 * take over: failed, orphaned, or a waiting ladder rung, and not dismissed.
 *
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @returns {any|null}
 */
export function sessionGuardedAttempt(attempts, bead_id) {
  return guardedOf(latestImplementationAttempts(attempts).get(bead_id));
}

/**
 * The Beads whose latest implementation attempt a session could take over —
 * the only Beads the ownership material is ever read for.
 *
 * @param {Record<string, any>} attempts
 * @returns {Set<string>}
 */
export function sessionGuardedBeadIds(attempts) {
  /** @type {Set<string>} */
  const ids = new Set();
  for (const [bead_id, latest] of latestImplementationAttempts(attempts)) {
    if (guardedOf(latest)) {
      ids.add(bead_id);
    }
  }
  return ids;
}

/**
 * @param {any} latest - A Bead's latest implementation attempt, if any.
 * @returns {any|null}
 */
function guardedOf(latest) {
  return latest &&
    SESSION_GUARDED_STATUSES.has(latest.status) &&
    typeof latest.dismissed_at !== 'number'
    ? latest
    : null;
}

/**
 * Build the session ownership material of the Beads whose latest failure a
 * session could take over (UI-68r5 §3.4). The inputs are what both channels
 * already read: the external wait records (raw `owner` or projected
 * `owner_kind`), the session rows BEFORE any lane exclusion (`status` and
 * `session_refs` with `current`), and the queue's interactive session
 * records. A Bead with no guarded attempt gets no entry.
 *
 * @param {{ attempts?: Record<string, any>, external_waits?: any[], session_rows?: any[], interactive_sessions?: Record<string, any>|any[]|null }} input
 * @returns {Record<string, SessionOwnershipMaterial>}
 */
export function sessionOwnershipMaterial(input) {
  const latest_by_bead = latestImplementationAttempts(input.attempts || {});
  /** @type {Record<string, SessionOwnershipMaterial>} */
  const out = {};
  /**
   * @param {unknown} bead_id
   * @returns {SessionOwnershipMaterial|null}
   */
  const entryFor = (bead_id) => {
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      return null;
    }
    if (out[bead_id]) {
      return out[bead_id];
    }
    if (!guardedOf(latest_by_bead.get(bead_id))) {
      return null;
    }
    out[bead_id] = {
      waits: [],
      status: null,
      current_ref: null,
      conversation_session_ids: []
    };
    return out[bead_id];
  };
  for (const wait of Array.isArray(input.external_waits)
    ? input.external_waits
    : []) {
    if (!wait || !LIVE_WAIT_STAGES.has(wait.stage)) {
      continue;
    }
    const entry = entryFor(wait.bead_id);
    if (!entry) {
      continue;
    }
    const owner_kind =
      typeof wait.owner_kind === 'string'
        ? wait.owner_kind
        : typeof wait.owner?.kind === 'string'
          ? wait.owner.kind
          : null;
    entry.waits.push({
      owner_kind,
      owner_session_id: sessionIdOfRef(
        wait.owner_session_ref ?? wait.owner?.session_ref
      ),
      stage: wait.stage,
      registered_at: epochOf(wait.registered_at)
    });
  }
  for (const row of Array.isArray(input.session_rows)
    ? input.session_rows
    : []) {
    const entry = entryFor(row?.bead_id);
    if (!entry) {
      continue;
    }
    entry.status = typeof row.status === 'string' ? row.status : null;
    const refs = Array.isArray(row.session_refs) ? row.session_refs : [];
    const current =
      refs.find((/** @type {any} */ ref) => ref && ref.current === true) ||
      refs.at(-1);
    entry.current_ref =
      current &&
      typeof current.provider === 'string' &&
      typeof current.session_id === 'string' &&
      typeof current.host === 'string'
        ? {
            item: `${current.provider}:${current.session_id}@${current.host}`,
            session_id: current.session_id
          }
        : null;
  }
  const records = Array.isArray(input.interactive_sessions)
    ? input.interactive_sessions
    : Object.values(input.interactive_sessions || {});
  for (const record of records) {
    const entry = entryFor(record?.bead_id);
    if (
      entry &&
      typeof record.session_id === 'string' &&
      record.session_id.length > 0
    ) {
      entry.conversation_session_ids.push(record.session_id);
    }
  }
  return out;
}

/**
 * The snapshot's `session_ownership` decoration as the Map the seat judgment
 * takes; absent or malformed reads as no evidence (fail-quiet).
 *
 * @param {unknown} decoration
 * @returns {Map<string, SessionOwnershipMaterial>}
 */
export function sessionOwnershipMap(decoration) {
  /** @type {Map<string, SessionOwnershipMaterial>} */
  const map = new Map();
  if (
    !decoration ||
    typeof decoration !== 'object' ||
    Array.isArray(decoration)
  ) {
    return map;
  }
  for (const [bead_id, material] of Object.entries(decoration)) {
    if (material && typeof material === 'object') {
      map.set(bead_id, /** @type {SessionOwnershipMaterial} */ (material));
    }
  }
  return map;
}

/**
 * Whether a session that is not this Bead row's own Worker conversation took
 * the Bead over after `attempt` failed (UI-68r5 §3.4): a live session-owned
 * external wait registered after the failure finished, or an `in_progress`
 * Bead whose current `session_ref` entry the attempt did not record at
 * dispatch and whose session ran none of the Bead's implementation attempts.
 * An attempt without a recorded `bead_session_ref` cannot prove the second.
 *
 * @param {any} attempt
 * @param {Record<string, any>} attempts
 * @param {SessionOwnershipMaterial|null|undefined} material
 * @returns {boolean}
 */
export function sessionOwnsFailure(attempt, attempts, material) {
  if (!attempt || !material) {
    return false;
  }
  const conversation = new Set(
    Array.isArray(material.conversation_session_ids)
      ? material.conversation_session_ids
      : []
  );
  const finished_at = epochOf(attempt.finished_at);
  if (finished_at !== null) {
    for (const wait of Array.isArray(material.waits) ? material.waits : []) {
      if (
        wait &&
        wait.owner_kind === 'session' &&
        LIVE_WAIT_STAGES.has(wait.stage) &&
        typeof wait.registered_at === 'number' &&
        wait.registered_at > finished_at &&
        !(
          typeof wait.owner_session_id === 'string' &&
          conversation.has(wait.owner_session_id)
        )
      ) {
        return true;
      }
    }
  }
  const recorded = attempt.bead_session_ref;
  const current = material.current_ref;
  if (
    material.status !== 'in_progress' ||
    typeof recorded !== 'string' ||
    !current ||
    typeof current.item !== 'string' ||
    typeof current.session_id !== 'string'
  ) {
    return false;
  }
  const recorded_items = recorded
    .split('; ')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  if (
    recorded_items.includes(current.item) ||
    conversation.has(current.session_id)
  ) {
    return false;
  }
  for (const other of Object.values(attempts || {})) {
    if (
      other &&
      other.bead_id === attempt.bead_id &&
      isImplementationAttempt(other) &&
      other.session_id === current.session_id
    ) {
      return false;
    }
  }
  return true;
}

/**
 * The server-side refusal of a Worker operation on a Bead a session took over
 * (UI-68r5 §3.4·§3.5): `session_owned` while the evidence holds against the
 * Bead's guarded attempt, `session_owner_unobservable` when part of the
 * material could not be read and the readable part proves nothing
 * (fail-closed), null otherwise — including a Bead with no guarded attempt.
 *
 * @param {Record<string, any>} attempts
 * @param {string} bead_id
 * @param {SessionOwnershipMaterial|null|undefined} material
 * @param {boolean} unreadable
 * @returns {'session_owned'|'session_owner_unobservable'|null}
 */
export function sessionOwnerRefusal(attempts, bead_id, material, unreadable) {
  const attempt = sessionGuardedAttempt(attempts, bead_id);
  if (!attempt) {
    return null;
  }
  if (sessionOwnsFailure(attempt, attempts, material)) {
    return 'session_owned';
  }
  return unreadable ? 'session_owner_unobservable' : null;
}

/**
 * Fold one repo's UNFINISHED attempts onto the beads they belong to.
 *
 * A failure a session took over yields its seat (UI-68r5 §3.4): it is left out
 * of the winners and named in `yielded_bead_ids`, which the session exclusion
 * reads to draw that Bead as a session tile instead.
 *
 * @param {Record<string, any>} attempts
 * @param {Map<string, number>} done_at_by_bead - `done` 레인의 `added_at`;
 * 그보다 앞서 끝난 실패는 이미 처리된 것으로 본다.
 * @param {Map<string, SessionOwnershipMaterial>} [session_ownership] - 세션
 * 소유 판정 재료 (`sessionOwnershipMap`); 없으면 증거가 없는 것으로 본다.
 * @returns {{ winners: Map<string, ActiveAttemptState>, resumed_from_ids: Set<string>, yielded_bead_ids: Set<string> }}
 */
export function activeAttemptStates(
  attempts,
  done_at_by_bead,
  session_ownership = new Map()
) {
  const values = /** @type {any[]} */ (Object.values(attempts || {}));
  /** @type {Set<string>} */
  const resumed_from_ids = new Set();
  /** @type {Set<string>} */
  const yielded = new Set();
  const last_attempt_by_bead = latestImplementationAttempts(attempts);
  for (const a of values) {
    if (!a || typeof a.bead_id !== 'string') {
      continue;
    }
    if (typeof a.resumed_from === 'string' && a.resumed_from.length > 0) {
      resumed_from_ids.add(a.resumed_from);
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
    } else if (
      a.status === 'paused' &&
      !resumed_from_ids.has(a.attempt_id) &&
      !isWithdrawnAttempt(a)
    ) {
      run_state = 'paused';
    } else if (a.status === 'failed' || a.status === 'orphaned') {
      const done_at = done_at_by_bead.get(a.bead_id);
      const resolved_by_done =
        typeof done_at === 'number' &&
        done_at > 0 &&
        typeof a.finished_at === 'number' &&
        done_at >= a.finished_at;
      if (
        last_attempt_by_bead.get(a.bead_id) === a &&
        !resolved_by_done &&
        typeof a.dismissed_at !== 'number'
      ) {
        if (sessionOwnsFailure(a, attempts, session_ownership.get(a.bead_id))) {
          yielded.add(a.bead_id);
        } else {
          run_state = 'failed';
        }
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
  /** @type {Set<string>} */
  const yielded_bead_ids = new Set(
    [...yielded].filter((bead_id) => !winners.has(bead_id))
  );
  return { winners, resumed_from_ids, yielded_bead_ids };
}

/**
 * The beads the 실행중 레인 owns, which is what `counts.running` counts.
 *
 * @param {Record<string, any>} attempts
 * @param {Map<string, number>} done_at_by_bead
 * @param {Map<string, SessionOwnershipMaterial>} [session_ownership]
 * @returns {Set<string>}
 */
export function activeBeadIds(attempts, done_at_by_bead, session_ownership) {
  return new Set(
    activeAttemptStates(
      attempts,
      done_at_by_bead,
      session_ownership
    ).winners.keys()
  );
}
