import { showToast } from '../../utils/toast.js';
import { defaultExternalWaitConfirm } from './external-wait-action.js';

/**
 * Shared click rule for the `[마무리]` button of a direct session tile on the
 * Worker and Monitor tabs (UI-lxxf §3.3): one confirm, one
 * `worker-session-finish` request, one sentence per reply.
 */

/** The request type; the server never receives a session id from the card. */
export const SESSION_FINISH_OP = 'worker-session-finish';

/** Sentence per `delivery` of a `sent: true` reply. */
const DELIVERY_TEXT = {
  resumed: '닫힌 세션을 다시 열어 마감 지시를 보냈습니다',
  typed: '열린 세션에 마감 지시를 보냈습니다',
  queued: '세션이 작업 중입니다 · 지금 턴이 끝나면 마감 지시를 읽습니다'
};

/** Sentence per refusal code that has its own wording. */
const REFUSAL_TEXT = {
  trust_prompt:
    '세션 창을 열었지만 폴더 신뢰 확인에서 멈췄습니다 · 그 창에서 답하면 지시가 이어집니다',
  resume_unconfirmed:
    '지시를 보냈지만 전달을 확인하지 못했습니다 · ▤ 세션에서 확인하세요',
  not_confirmed:
    '지시를 보냈지만 전달을 확인하지 못했습니다 · ▤ 세션에서 확인하세요',
  modal_blocked:
    '세션이 질문·승인 창을 띄운 상태라 보내지 않았습니다 · 그 창에 먼저 답하세요',
  user_typing: '세션 입력란이 비었는지 확인하지 못해 보내지 않았습니다',
  observe_only: '이 세션에는 입력할 수 없습니다 · 그 창에서 직접 마무리하세요',
  busy: '다른 조작이 이 세션을 쓰는 중입니다 · 잠시 뒤 다시 누르세요',
  in_flight: '다른 조작이 이 세션을 쓰는 중입니다 · 잠시 뒤 다시 누르세요',
  not_session_tile: '직접 세션 타일이 아닙니다 · 화면을 새로 고치세요',
  session_mismatch:
    '기록된 세션이 이 저장소의 세션인지 확인하지 못해 보내지 않았습니다'
};

/**
 * The toast text and tone of one `worker-session-finish` reply.
 *
 * @param {{ sent?: boolean, delivery?: string|null, reason?: string|null }|null|undefined} res
 * @returns {{ text: string, variant: 'success'|'warning'|'error' }}
 */
export function sessionFinishToast(res) {
  if (res?.sent === true) {
    const text = Object.hasOwn(DELIVERY_TEXT, String(res.delivery))
      ? DELIVERY_TEXT[/** @type {keyof typeof DELIVERY_TEXT} */ (res.delivery)]
      : '세션에 마감 지시를 보냈습니다';
    return { text, variant: 'success' };
  }
  const reason = typeof res?.reason === 'string' ? res.reason : '';
  if (Object.hasOwn(REFUSAL_TEXT, reason)) {
    return {
      text: REFUSAL_TEXT[/** @type {keyof typeof REFUSAL_TEXT} */ (reason)],
      variant: 'warning'
    };
  }
  return {
    text: `마감 지시를 보내지 못했습니다 · ${reason || 'unknown'}`,
    variant: 'error'
  };
}

/**
 * Confirm once, send `worker-session-finish` with the card's Bead and
 * repository, and toast the reply. The Bead and repository come from the
 * enclosing tile's `data-bead-id` and `data-root-dir`, so the button itself
 * carries no Bead identity. A tile without `data-root-dir` (the one-repo Worker
 * tab) sends `deps.root_dir`, the tab's own repository. A cancelled confirm
 * sends nothing.
 *
 * @param {HTMLElement} button - Sits in a `.rtile` tile.
 * @param {{ transport: (type: string, payload?: unknown) => Promise<any>, confirm?: (message: string) => boolean, root_dir?: string }} deps
 * @returns {Promise<boolean>} Whether a request was sent.
 */
export async function runSessionFinishAction(button, deps) {
  const tile = /** @type {HTMLElement|null} */ (button.closest('.rtile'));
  const bead_id = tile?.dataset.beadId || '';
  if (!bead_id) {
    return false;
  }
  const confirm_fn = deps.confirm || defaultExternalWaitConfirm;
  if (
    !confirm_fn(
      `${bead_id} 마무리 — 세션에 마감 지시를 보냅니다. 세션이 이 Bead의 남은 마감 절차를 끝냅니다(직접 닫는 작업은 닫힘, PR로 전달하는 작업은 PR 전달까지).`
    )
  ) {
    return false;
  }
  try {
    const res = await deps.transport(SESSION_FINISH_OP, {
      bead_id,
      root_dir: tile?.dataset.rootDir || deps.root_dir || ''
    });
    const toast = sessionFinishToast(res);
    showToast(toast.text, toast.variant, 4000);
  } catch {
    showToast('마감 지시 요청에 실패했습니다', 'error', 4000);
  }
  return true;
}
