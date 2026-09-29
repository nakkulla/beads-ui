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
 * The one predicate for a tile's or row's [세션에서 해결] action (UI-ri8n
 * §3.4). Renderers draw `resolve_action` and never decide it again.
 *
 * @param {any} item - A lane-model item (`id`, `run_state`, `wait`,
 * `wait_reasons`, `discard`, `interactive_sessions`).
 * @param {boolean} [resolve_pending]
 * @returns {{ resolve_action?: boolean, resolve_enabled?: boolean, resolve_title?: string }}
 */
export function tileResolveFields(item, resolve_pending = false) {
  if (!item || !item.id) {
    return {};
  }
  const discard_failed = !!item.discard?.error;
  const reasons = Array.isArray(item.wait_reasons) ? item.wait_reasons : [];
  const eligible =
    item.run_state === 'parked' ||
    !!item.wait?.recovery ||
    reasons.some((/** @type {any} */ r) => r && r.kind === 'recovery') ||
    discard_failed;
  if (!eligible || hasLiveResolveSession(item.interactive_sessions)) {
    return {};
  }
  return {
    resolve_action: true,
    resolve_enabled: !resolve_pending,
    resolve_title: resolve_pending
      ? '세션 기동 요청 중 — 서버 응답을 기다립니다'
      : discard_failed
        ? '실패한 폐기를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다'
        : '멈춘 세션을 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork'
  };
}
