/**
 * Toast primitive (UI-dbn6 §4.4). One stack for the whole page: the shell and
 * the bridged legacy components (Phase 2–3) must not show two toast systems,
 * so this facade forwards to `utils/toast.js` until Phase 4 folds that module
 * in here.
 */
import { showToast as showLegacyToast } from '../utils/toast.js';

/**
 * @param {string} message
 * @param {'success'|'error'|'info'|'warning'} [kind]
 * @param {number} [ms]
 */
export function showToast(message, kind = 'info', ms = 2400) {
  showLegacyToast(message, kind, ms);
}
