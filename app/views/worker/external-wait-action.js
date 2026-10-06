import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../utils/toast.js';
import {
  openTakeoverDialog,
  takeoverMaterialOf
} from './external-wait-takeover-dialog.js';

/**
 * Shared click rule for `data-external-wait-op` buttons on the Worker tab,
 * the Monitor tab, and the detail panel (UI-r6xq §4.4).
 */

/**
 * Default confirm: environments without `globalThis.confirm` proceed.
 *
 * @param {string} message
 * @returns {boolean}
 */
export function defaultExternalWaitConfirm(message) {
  return (
    typeof globalThis.confirm !== 'function' || globalThis.confirm(message)
  );
}

/**
 * Where a click-started session window is (UI-a119 §3.3), in the one sentence
 * the three session clicks share: `dev:7에 열었습니다 · 활성 창`, the inquiry
 * fallback `bdui-inquiry:3에 열었습니다 · 사용자 tmux 세션을 찾지 못함`, and
 * `이미 열려 있습니다 · dev:7`. Any other reply is not a window and answers null.
 *
 * @param {Record<string, any>} res - A launch reply carrying `session`,
 * `placement`, `tmux_session` and `tmux_window`.
 * @returns {string|null}
 */
export function sessionWindowText(res) {
  const place = [res.tmux_session, res.tmux_window]
    .filter((part) => typeof part === 'string' && part.length > 0)
    .join(':');
  if (res.session === 'already_running') {
    return place ? `이미 열려 있습니다 · ${place}` : '이미 열려 있습니다';
  }
  if (res.session !== 'launched') {
    return null;
  }
  const opened = place ? `${place}에 열었습니다` : '세션을 열었습니다';
  if (res.placement === 'user') {
    return `${opened} · 활성 창`;
  }
  if (res.placement === 'inquiry') {
    return `${opened} · 사용자 tmux 세션을 찾지 못함`;
  }
  return opened;
}

/**
 * The success sentence of a `[세션에서 이어가기]` launch, shared by the Worker
 * and Monitor tabs: the window sentence, then the fresh-session caveat when the
 * recorded session was not reopened. The caveat stays on purpose — a fresh
 * session and a fork look the same from outside. The runner is the RESULT's,
 * never the current global setting (codex-orchestration-parity §4.2).
 *
 * @param {Record<string, any>} res - A `launched` reply.
 * @returns {string}
 */
export function resolveLaunchText(res) {
  const opened = sessionWindowText(res) ?? '세션을 열었습니다';
  // A fork, a same-session conversation (`resume`, UI-nuwy §3.2) or an
  // 외부 작업 완료 session resume (`session`) reopened exactly the session
  // the card names, so it needs no caveat.
  if (res.mode === 'fork' || res.mode === 'resume' || res.mode === 'session') {
    return opened;
  }
  const runner = typeof res.runner === 'string' ? res.runner : 'claude';
  return `${opened} · ${runner} 새 세션으로 시작 (${res.fallback_reason || 'unknown'})`;
}

/**
 * Toast text for a `mode: 'session'` resume response — the detail panel's
 * external op and an 외부 작업 완료 row's `[세션에서 이어가기]` reply alike
 * (UI-18a5 §3.2). The `not_launched` owner cases copy the resume command
 * first.
 *
 * @param {Record<string, any>} res
 * @returns {Promise<{ text: string, variant: 'success'|'error' }>}
 */
export async function sessionResumeToast(res) {
  if (res.session === 'launched') {
    return {
      text: `${sessionWindowText(res)}${res.bridge_active ? ' · Discord 브리지 활성' : ''}`,
      variant: 'success'
    };
  }
  if (res.session === 'already_running') {
    return { text: String(sessionWindowText(res)), variant: 'success' };
  }
  if (res.reason === 'owner_alive' || res.reason === 'owner_unverified') {
    const copied =
      typeof res.command === 'string' && res.command.length > 0
        ? await copyToClipboard(res.command)
        : false;
    const copy_text = copied
      ? '재개 명령을 복사했습니다'
      : '재개 명령을 복사하지 못했습니다';
    if (res.reason === 'owner_alive') {
      return {
        text: `원래 세션이 살아 있어 열지 않았습니다 · ${copy_text}${res.owner_tmux ? ` · tmux ${res.owner_tmux}` : ''}`,
        variant: 'success'
      };
    }
    return {
      text: `원래 세션이 살아 있는지 확인하지 못해 열지 않았습니다 · ${copy_text}`,
      variant: 'success'
    };
  }
  return {
    text: `세션을 열지 못했습니다 · ${res.reason || 'unknown'}`,
    variant: 'error'
  };
}

/**
 * Confirm (when the button carries `data-confirm`), send the op, hand the
 * response to `adopt`, and show the result toast. A cancelled confirm sends
 * nothing and returns false. `▶ 바로 실행` opens its own resource dialog
 * instead, which sends the request itself.
 *
 * @param {HTMLElement} button
 * @param {{ transport: (type: string, payload?: unknown) => Promise<any>, confirm?: (message: string) => boolean, adopt?: (res: any) => void }} deps
 * @returns {Promise<boolean>} Whether the op was sent.
 */
export async function runExternalWaitAction(button, deps) {
  const op = button.dataset.externalWaitOp || '';
  // `▶ 바로 실행` asks for its resources in its own dialog, which sends the
  // request and shows the server's refusal itself (UI-qbgj §3.4).
  if (op === 'external_wait_takeover') {
    const material = takeoverMaterialOf(button);
    if (!material) {
      showToast('바로 실행 재료가 없습니다', 'error', 4000);
      return false;
    }
    const outcome = await openTakeoverDialog(material, {
      transport: deps.transport,
      ...(deps.adopt ? { adopt: deps.adopt } : {})
    });
    if (outcome.ok) {
      showToast('바로 실행으로 전환했습니다', 'success', 4000);
    }
    return outcome.sent;
  }
  const confirm_fn = deps.confirm || defaultExternalWaitConfirm;
  const message = button.dataset.confirm || '';
  if (message && !confirm_fn(message)) {
    return false;
  }
  try {
    const res = await deps.transport(op, {
      root_dir: button.dataset.rootDir || '',
      wait_id: button.dataset.waitId || '',
      ...(button.dataset.mode ? { mode: button.dataset.mode } : {}),
      ...(button.dataset.beadId ? { bead_id: button.dataset.beadId } : {})
    });
    if (deps.adopt) {
      deps.adopt(res);
    }
    if (res?.ok !== false && res?.mode === 'session') {
      const toast = await sessionResumeToast(res);
      showToast(toast.text, toast.variant, 4000);
      return true;
    }
    showToast(
      res?.ok === false
        ? '외부 작업 요청에 실패했습니다'
        : '외부 작업 상태를 갱신했습니다',
      res?.ok === false ? 'error' : 'success',
      4000
    );
  } catch {
    showToast('외부 작업 요청에 실패했습니다', 'error', 4000);
  }
  return true;
}
