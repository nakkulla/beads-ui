/**
 * Outside-press and Escape dismissal of the pipeline screen's transient
 * surfaces (UI-dbn6 §4.4): chip popovers, the failure popover, the label
 * menu, and on Escape also the sheets and the provider resume dialog.
 */

/**
 * @import { ScreenUi } from './ops.js'
 */

/**
 * @param {ScreenUi} ui
 * @param {() => void} render
 * @returns {{ onPointer: (ev: PointerEvent) => void, onKey: (ev: KeyboardEvent) => void }}
 */
export function createDismissers(ui, render) {
  return {
    onPointer(ev) {
      const target = /** @type {Element|null} */ (ev.target);
      if (!target || typeof target.closest !== 'function') {
        return;
      }
      let changed = false;
      if (ui.popover && !target.closest('.pl-pop, [data-op="chip-popover"]')) {
        ui.popover = null;
        changed = true;
      }
      if (
        ui.open_failure &&
        !target.closest('.pl-pop--failure, [data-op="failure-detail"]')
      ) {
        ui.open_failure = null;
        changed = true;
      }
      if (ui.label_menu_open && !target.closest('.pl-filter__labels')) {
        ui.label_menu_open = false;
        changed = true;
      }
      if (changed) {
        render();
      }
    },
    onKey(ev) {
      if (ev.key !== 'Escape') {
        return;
      }
      if (
        ui.sheet ||
        ui.popover ||
        ui.open_failure ||
        ui.provider_resume ||
        ui.label_menu_open
      ) {
        ui.sheet = null;
        ui.popover = null;
        ui.open_failure = null;
        ui.provider_resume = null;
        ui.label_menu_open = false;
        render();
      }
    }
  };
}
