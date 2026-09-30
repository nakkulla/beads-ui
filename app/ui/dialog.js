/**
 * Dialog primitive (UI-dbn6 §4.4). Destructive card ops keep their existing
 * confirmation sentences; `createConfirm` is the one confirm seam every screen
 * goes through, so tests inject a fake and the browser uses its native confirm.
 *
 * The modal dialogs (resume/continue, continuation mismatch, provider resume)
 * are native `<dialog>` elements opened and closed through `showDialog` and
 * `closeDialog`: `showModal` where the platform has it, the `open` attribute
 * where it does not (jsdom), so every caller shares one fallback rule.
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

/**
 * A body-level `<dialog class="op-dialog <class_name>">`, not yet open.
 *
 * @param {Document} doc
 * @param {string} class_name
 * @returns {HTMLDialogElement}
 */
export function createDialog(doc, class_name) {
  const dialog = /** @type {HTMLDialogElement} */ (doc.createElement('dialog'));
  dialog.className = `op-dialog ${class_name}`;
  doc.body.append(dialog);
  return dialog;
}

/**
 * Open a dialog modally. An open dialog is left as it is.
 *
 * @param {HTMLDialogElement} dialog
 */
export function showDialog(dialog) {
  if (dialog.hasAttribute('open')) {
    return;
  }
  if (typeof dialog.showModal === 'function') {
    dialog.showModal();
    return;
  }
  dialog.setAttribute('open', '');
}

/**
 * Close a dialog, detaching it when `remove` is set.
 *
 * @param {HTMLDialogElement} dialog
 * @param {{ remove?: boolean }} [options]
 */
export function closeDialog(dialog, options = {}) {
  if (typeof dialog.close === 'function') {
    dialog.close();
  } else {
    dialog.removeAttribute('open');
  }
  if (options.remove === true) {
    dialog.remove();
  }
}
