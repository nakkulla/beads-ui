/**
 * The `세션 권장` chip click (UI-lbm5 §4.7), shared by the Worker tab and the
 * monitor so both send the same op and say the same toasts. The server
 * toggles the issue's `exec_lane` between `session` and unset and reads it
 * back; a failure is only toasted — the chip is not reverted locally, the next
 * snapshot is the truth (§5).
 */
import { errorText } from '../../utils/error-text.js';

/**
 * @param {{
 *   transport: (type: string, payload: any) => Promise<any>,
 *   toast?: (message: string, kind?: string) => void,
 *   onChange?: () => void
 * }} options
 */
export function createSessionToggle(options) {
  /** @type {Set<string>} */
  const in_flight = new Set();

  /**
   * @param {string} bead_id
   * @param {string} root_dir
   */
  function keyOf(bead_id, root_dir) {
    return `${root_dir}\u0000${bead_id}`;
  }

  return {
    /**
     * Whether a click for this card is still in flight.
     *
     * @param {string} bead_id
     * @param {string} [root_dir]
     * @returns {boolean}
     */
    isBusy(bead_id, root_dir = '') {
      return in_flight.has(keyOf(bead_id, root_dir));
    },

    /**
     * Send one `chip-session-toggle`; a second click on the same card waits
     * for the first answer instead of racing it.
     *
     * @param {string} bead_id
     * @param {string} [root_dir]
     * @returns {Promise<void>}
     */
    async toggle(bead_id, root_dir = '') {
      if (!bead_id) {
        return;
      }
      const key = keyOf(bead_id, root_dir);
      if (in_flight.has(key)) {
        return;
      }
      in_flight.add(key);
      options.onChange?.();
      try {
        const res = await options.transport('chip-session-toggle', {
          id: bead_id,
          ...(root_dir ? { root_dir } : {})
        });
        if (res && res.exec_lane === 'session') {
          options.toast?.(`${bead_id} → 세션 레인으로 실행`, 'success');
        } else if (res) {
          options.toast?.(`${bead_id} → Worker로 실행`, 'success');
        }
      } catch (err) {
        options.toast?.(`세션 레인 전환 실패: ${errorText(err)}`, 'error');
      } finally {
        in_flight.delete(key);
        options.onChange?.();
      }
    }
  };
}
