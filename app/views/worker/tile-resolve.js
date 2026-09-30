/** The `[워커로 이어가기]` op the server projects for a conversation stop. */
export const CONVERSATION_HANDOFF_OP = 'worker-conversation-handoff';

/**
 * Whether a live inquiry or resolve session already answers the card's
 * [세션에서 해결] question (UI-ri8n §3.4). A closing session or an
 * external_resume session does not count.
 *
 * @param {any[]|null|undefined} interactive_sessions
 * @returns {boolean}
 */
export function hasLiveResolveSession(interactive_sessions) {
  return (Array.isArray(interactive_sessions) ? interactive_sessions : []).some(
    (view) =>
      !!view &&
      view.state === 'live' &&
      !view.closing &&
      (view.kind === 'inquiry' || view.kind === 'resolve')
  );
}

/**
 * The server-projected `[워커로 이어가기]` action of an item, if any
 * (UI-nuwy §3.6). The server decides when it stands; this only finds it.
 *
 * @param {any} item
 * @returns {{ attempt_id: string|null, title: string|null }|null}
 */
function handoffAction(item) {
  const reasons = Array.isArray(item.wait_reasons) ? item.wait_reasons : [];
  for (const reason of reasons) {
    const actions = Array.isArray(reason?.actions) ? reason.actions : [];
    const action = actions.find(
      (/** @type {any} */ entry) => entry?.op === CONVERSATION_HANDOFF_OP
    );
    if (action) {
      return {
        attempt_id:
          typeof action.payload?.attempt_id === 'string'
            ? action.payload.attempt_id
            : null,
        title: typeof action.title === 'string' ? action.title : null
      };
    }
  }
  return null;
}

/**
 * The one predicate for a tile's or row's [세션에서 해결] and
 * [워커로 이어가기] actions (UI-ri8n §3.4, UI-nuwy §3.6). Renderers draw
 * `resolve_action` and `handoff_action` and never decide them again.
 *
 * @param {any} item - A lane-model item (`id`, `run_state`, `wait`,
 * `wait_reasons`, `discard`, `interactive_sessions`).
 * @param {boolean} [resolve_pending]
 * @param {boolean} [handoff_pending]
 * @returns {{ resolve_action?: boolean, resolve_enabled?: boolean, resolve_title?: string, handoff_action?: boolean, handoff_enabled?: boolean, handoff_title?: string, handoff_attempt_id?: string|null }}
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
  const discard_failed = !!item.discard?.error;
  const reasons = Array.isArray(item.wait_reasons) ? item.wait_reasons : [];
  const eligible =
    item.run_state === 'parked' ||
    !!item.wait?.recovery ||
    reasons.some((/** @type {any} */ r) => r && r.kind === 'recovery') ||
    discard_failed;
  if (!eligible || hasLiveResolveSession(item.interactive_sessions)) {
    return handoff_fields;
  }
  return {
    resolve_action: true,
    resolve_enabled: !resolve_pending,
    resolve_title: resolve_pending
      ? '세션 기동 요청 중 — 서버 응답을 기다립니다'
      : discard_failed
        ? '실패한 폐기를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다'
        : '멈춘 세션을 같은 세션 그대로 대화형으로 다시 엽니다 — 사람과 대화한 뒤 인계하면 Worker가 이어갑니다',
    ...handoff_fields
  };
}
