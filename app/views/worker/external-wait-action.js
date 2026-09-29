import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../utils/toast.js';

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
 * Toast text for a `mode: 'session'` resume response. The `not_launched`
 * owner cases copy the resume command first.
 *
 * @param {Record<string, any>} res
 * @returns {Promise<{ text: string, variant: 'success'|'error' }>}
 */
async function sessionResumeToast(res) {
  const tmux = `tmux ${res.tmux_session}:${res.tmux_window}`;
  if (res.session === 'launched') {
    return {
      text: `세션을 열었습니다 · ${tmux}${res.bridge_active ? ' · Discord 브리지 활성' : ''}`,
      variant: 'success'
    };
  }
  if (res.session === 'already_running') {
    return { text: `이미 열려 있습니다 · ${tmux}`, variant: 'success' };
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
 * nothing and returns false.
 *
 * @param {HTMLElement} button
 * @param {{ transport: (type: string, payload?: unknown) => Promise<any>, confirm?: (message: string) => boolean, adopt?: (res: any) => void }} deps
 * @returns {Promise<boolean>} Whether the op was sent.
 */
export async function runExternalWaitAction(button, deps) {
  const confirm_fn = deps.confirm || defaultExternalWaitConfirm;
  const message = button.dataset.confirm || '';
  if (message && !confirm_fn(message)) {
    return false;
  }
  const op = button.dataset.externalWaitOp || '';
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
