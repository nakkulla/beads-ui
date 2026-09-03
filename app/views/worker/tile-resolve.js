/**
 * Shared Worker/Monitor fields for a running tile's [세션에서 해결] action.
 *
 * @param {string} bead_id
 * @param {{ discard?: any, parked?: boolean }} material
 * @param {boolean} resolve_pending
 * @returns {{ resolve_action?: boolean, resolve_enabled?: boolean, resolve_title?: string }}
 */
export function tileResolveFields(bead_id, material, resolve_pending = false) {
  const discard_failed = !!material.discard?.error;
  if (!bead_id || (!discard_failed && material.parked !== true)) {
    return {};
  }
  return {
    resolve_action: true,
    resolve_enabled: !resolve_pending,
    resolve_title: resolve_pending
      ? '세션 기동 요청 중 — 서버 응답을 기다립니다'
      : discard_failed
        ? '실패한 폐기를 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork하고, 없으면 새 세션에 사유를 싣습니다'
        : '파킹을 사람이 이어받는 대화형 세션을 띄웁니다 — 살아 있는 문의 세션이 있으면 그 창을 가리킵니다'
  };
}
