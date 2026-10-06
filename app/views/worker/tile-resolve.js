/** The `[워커로 이어가기]` op the server projects for a conversation stop. */
export const CONVERSATION_HANDOFF_OP = 'worker-conversation-handoff';

/**
 * The one `[세션에서 이어가기]` op (UI-18a5 §3.2). The server picks the
 * launcher from the row's state; an 외부 작업 완료 row carries it as a
 * server projection (`wait-judgment`).
 */
export const SESSION_CONTINUE_OP = 'worker-resolve-in-session';

/**
 * Whether a live Worker session conversation of ANY kind — 멈춤, 실패 or
 * 외부 작업 완료 — already answers the card's `[세션에서 이어가기]` question
 * (UI-ri8n §3.4, UI-18a5 §3.2). A closing session does not count.
 *
 * @param {any[]|null|undefined} interactive_sessions
 * @returns {boolean}
 */
export function hasLiveConversation(interactive_sessions) {
  return (Array.isArray(interactive_sessions) ? interactive_sessions : []).some(
    (view) => !!view && view.state === 'live' && !view.closing
  );
}

/**
 * Whether a conversation still carries a decided outcome (UI-nuwy §3.4-§3.5,
 * UI-18a5 §3.4): a handoff reservation or a takeover, of any kind. It holds
 * while the window closes too — until the reconcile pass settles the record,
 * a reopened conversation or a second Worker exit would race that outcome.
 *
 * @param {any[]|null|undefined} interactive_sessions
 * @returns {boolean}
 */
function holdsConversationOutcome(interactive_sessions) {
  return (Array.isArray(interactive_sessions) ? interactive_sessions : []).some(
    (view) =>
      !!view &&
      !!view.conversation &&
      (!!view.conversation.handoff ||
        view.conversation.result?.kind === 'takeover')
  );
}

/**
 * The first action with `op` in an item's server-projected wait reasons,
 * optionally only from reasons of one kind.
 *
 * @param {any} item
 * @param {string} op
 * @param {string} [kind]
 * @returns {any|null}
 */
function projectedAction(item, op, kind) {
  const reasons = Array.isArray(item.wait_reasons) ? item.wait_reasons : [];
  for (const reason of reasons) {
    if (kind !== undefined && reason?.kind !== kind) {
      continue;
    }
    const actions = Array.isArray(reason?.actions) ? reason.actions : [];
    const action = actions.find((/** @type {any} */ entry) => entry?.op === op);
    if (action) {
      return action;
    }
  }
  return null;
}

/**
 * The server-projected `[워커로 이어가기]` action of an item, if any
 * (UI-nuwy §3.6). The server decides when it stands; this only finds it.
 *
 * @param {any} item
 * @returns {{ attempt_id: string|null, title: string|null }|null}
 */
function handoffAction(item) {
  const action = projectedAction(item, CONVERSATION_HANDOFF_OP);
  if (!action) {
    return null;
  }
  return {
    attempt_id:
      typeof action.payload?.attempt_id === 'string'
        ? action.payload.attempt_id
        : null,
    title: typeof action.title === 'string' ? action.title : null
  };
}

/**
 * The row kinds a `[세션에서 이어가기]` stands on (UI-18a5 §3.1), told apart
 * so the tooltip can say what this row's `인계` will do.
 *
 * @typedef {'stop'|'cleanup'|'verify_hold'|'merge_gate'|'discard'|'external'} ContinueRow
 */

/**
 * What the row's `[세션에서 이어가기]` will open, one line per row kind
 * (UI-18a5 §3.5).
 *
 * @type {Readonly<Record<ContinueRow, string>>}
 */
const SESSION_TITLES = Object.freeze({
  stop: '멈춘 세션을 같은 세션 그대로 대화로 다시 엽니다 — 인계하면 Worker가 이어갑니다',
  cleanup:
    '기록된 세션을 대화로 엽니다 — 인계하면 Worker가 실패한 단계를 다시 돌립니다',
  verify_hold:
    '기록된 세션을 대화로 엽니다 — 수정 커밋을 push하거나, 인계하면 Worker가 머지 큐에 다시 넣어 현재 head에서 검증을 다시 돌립니다',
  merge_gate:
    '기록된 세션을 대화로 엽니다 — 머지 게이트 보류는 사람의 [머지]만 풀므로 인계해도 Worker는 실행하지 않습니다',
  discard:
    '기록된 세션을 대화로 엽니다 — 인계하면 Worker가 실패한 폐기를 다시 시도합니다',
  external:
    '보존 세션을 같은 워크트리에서 대화로 다시 엽니다 — 인계하면 Worker가 그 세션에서 attempt를 시작합니다'
});

/**
 * Which failure, if any, makes this item a 실패 row: the PR 대기 row's own
 * material (`failure_material`, UI-f2sy shared projection) or a failed
 * discard on any card. The newest-most-terminal one names the row, in the
 * server's order (`resolveFailureContext`).
 *
 * @param {any} item
 * @returns {ContinueRow|null}
 */
function failureRow(item) {
  const material = item.failure_material || null;
  if (material?.completion_phase === 'holding') {
    return 'verify_hold';
  }
  if (material?.cleanup) {
    return 'cleanup';
  }
  if (material?.completion_phase === 'needs_human') {
    return 'merge_gate';
  }
  if (item.discard?.error) {
    return 'discard';
  }
  return null;
}

/**
 * The one predicate for a card's `[세션에서 이어가기]` · `[워커로 이어가기]`
 * pair (UI-ri8n §3.4, UI-nuwy §3.6, UI-18a5 §3.2). Renderers draw what this
 * returns and never decide it again — the PR 대기 row's former separate
 * predicate is folded in here.
 *
 *   - `resolve_*`: `[세션에서 이어가기]` on a 확인 필요, 실패 or 외부 작업 완료
 *     row, unless any live conversation of the Bead (any kind) already
 *     answers it, or a decided outcome (handoff reservation, takeover) holds
 *     the row.
 *   - `handoff_*`: the 확인 필요 row's `[워커로 이어가기]`, server-projected.
 *     The 실패 rows' and the 외부 작업 완료 row's `[워커로 이어가기]` are
 *     their own buttons (cleanup retry, discard retry, external fork); this
 *     names them only through `pair_anchor`.
 *   - `pair_anchor`: which button is this row's `[워커로 이어가기]` — the
 *     renderer puts `[세션에서 이어가기]` right in front of it.
 *   - `pair_held`: a decided outcome hides both halves of the pair; the row's
 *     other operations stay. The discard and merge fields come back already
 *     masked, so a renderer has nothing to re-judge.
 *
 * @param {any} item - A lane-model item (`id`, `run_state`, `wait`,
 * `wait_reasons`, `discard`, `interactive_sessions`, `conversation_refusal`)
 * or a PR 대기 row (`failure_material`, `merge_action`).
 * @param {boolean} [resolve_pending]
 * @param {boolean} [handoff_pending]
 * @returns {{ resolve_action?: boolean, resolve_enabled?: boolean, resolve_title?: string, handoff_action?: boolean, handoff_enabled?: boolean, handoff_title?: string, handoff_attempt_id?: string|null, pair_anchor?: 'handoff'|'merge'|'discard'|'external'|null, pair_held?: boolean, discard?: any, discard_action?: boolean, merge_action?: boolean }}
 */
export function tileResolveFields(
  item,
  resolve_pending = false,
  handoff_pending = false
) {
  if (!item || !item.id) {
    return {};
  }
  const handoff = handoffAction(item);
  const handoff_fields = handoff
    ? {
        handoff_action: true,
        handoff_enabled: !handoff_pending,
        handoff_title: handoff_pending
          ? '인계 요청 중 — 서버 응답을 기다립니다'
          : handoff.title ||
            '대화 창을 닫고 Worker가 같은 세션을 무인으로 이어갑니다',
        handoff_attempt_id: handoff.attempt_id
      }
    : {};
  const external = projectedAction(item, SESSION_CONTINUE_OP, 'external_job');
  const reasons = Array.isArray(item.wait_reasons) ? item.wait_reasons : [];
  const recovery =
    !!item.wait?.recovery ||
    reasons.some((/** @type {any} */ r) => r && r.kind === 'recovery');
  const failure = failureRow(item);
  // The server's routing order (`handleWorkerResolveInSession`): a recovery
  // wait, then an 외부 작업 완료 row, then a failure — a failed discard ahead
  // of the park it sits on — and last the park.
  /** @type {ContinueRow|null} */
  const row = recovery
    ? 'stop'
    : external
      ? 'external'
      : (failure ?? (item.run_state === 'parked' ? 'stop' : null));
  const stale_backup =
    item.discard?.operation?.kind === 'stale_work_backup_fresh';
  const anchor = handoff
    ? 'handoff'
    : item.failure_material?.cleanup_retry === true
      ? 'merge'
      : item.discard?.error && !stale_backup
        ? 'discard'
        : external
          ? 'external'
          : null;
  const held = holdsConversationOutcome(item.interactive_sessions);
  /** @type {{ pair_anchor?: 'handoff'|'merge'|'discard'|'external'|null, pair_held?: boolean, discard?: any, discard_action?: boolean, merge_action?: boolean }} */
  const pair =
    anchor === null && !held ? {} : { pair_anchor: anchor, pair_held: held };
  if (held && anchor === 'discard') {
    // A PR 대기 row also carries the button as its own `discard_action` copy;
    // both are this row's `[워커로 이어가기]`.
    pair.discard = { ...item.discard, action: false };
    pair.discard_action = false;
  }
  if (held && anchor === 'merge') {
    pair.merge_action = false;
  }
  if (row === null || held || hasLiveConversation(item.interactive_sessions)) {
    return { ...handoff_fields, ...pair };
  }
  const refusal =
    typeof item.conversation_refusal === 'string' &&
    item.conversation_refusal.length > 0
      ? `이어가기 거절: ${item.conversation_refusal} — `
      : '';
  return {
    resolve_action: true,
    resolve_enabled: !resolve_pending,
    resolve_title: resolve_pending
      ? '세션 기동 요청 중 — 서버 응답을 기다립니다'
      : `${refusal}${
          row === 'external' && typeof external?.title === 'string'
            ? external.title
            : SESSION_TITLES[row]
        }`,
    ...handoff_fields,
    ...pair
  };
}

/** What a repo-operation row's `[세션에서 이어가기]` opens (UI-jbl1 §3.3). */
const REPO_OPERATION_SESSION_TITLE =
  '새 세션을 저장소 루트에서 대화로 엽니다 — 원인을 읽기 전용으로 진단하고, 인계하면 Worker가 같은 배포를 한 번 다시 실행합니다';

/**
 * The `[세션에서 이어가기]` decision of one 저장소 작업 drawer row (UI-jbl1
 * §3.3): the failed manual deploy the server marked `resolve.terminal_failure`
 * draws the button unless the row's own conversation is live or holds a
 * decided outcome — the same two judgments a lane card reads above. A live
 * conversation is returned as `conversation` so the row shows where it is
 * instead of the button.
 *
 * @param {any} operation - A projected repo-operation card.
 * @param {boolean} [resolve_pending]
 * @returns {{ resolve_action?: boolean, resolve_enabled?: boolean, resolve_title?: string, conversation?: any }}
 */
export function repoOperationResolveFields(operation, resolve_pending = false) {
  const material = operation?.resolve;
  if (!material || material.terminal_failure !== true) {
    return {};
  }
  const views = Array.isArray(material.interactive_sessions)
    ? material.interactive_sessions
    : [];
  if (hasLiveConversation(views)) {
    return {
      conversation: views.find(
        (/** @type {any} */ view) =>
          !!view && view.state === 'live' && !view.closing
      )
    };
  }
  if (holdsConversationOutcome(views)) {
    return {};
  }
  return {
    resolve_action: true,
    resolve_enabled: !resolve_pending,
    resolve_title: resolve_pending
      ? '세션 기동 요청 중 — 서버 응답을 기다립니다'
      : REPO_OPERATION_SESSION_TITLE
  };
}
