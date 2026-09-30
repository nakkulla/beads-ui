/**
 * Dialog primitive (UI-dbn6 §4.4). Destructive card ops keep their existing
 * confirmation sentences; this is the one confirm seam every screen goes
 * through, so tests inject a fake and the browser uses its native confirm.
 */

/**
 * @param {((message: string) => boolean)|undefined} [override]
 * @returns {(message: string) => boolean}
 */
export function createConfirm(override) {
  if (override) {
    return override;
  }
  return (message) =>
    typeof globalThis.confirm !== 'function' || globalThis.confirm(message);
}
