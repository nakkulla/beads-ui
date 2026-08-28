/**
 * The shared 사유 팝업 behind a judgement chip (UI-8x90 §5).
 *
 * Worker and Monitor used to carry two copies of the same 겹침 팝오버 state —
 * an open key, a document click listener and an Esc branch each. Removing that
 * popover (§4.3) left the judgement chips needing exactly those three things,
 * so they live here once and both tabs plus the issue detail header call them.
 *
 * The open key is `bead_id + chip_key` rather than a DOM node, so a re-render
 * (which replaces every card element) keeps the popup open on the same chip.
 */
import { html } from 'lit-html';

/**
 * @typedef {{ bead_id: string, chip_key: string }} ChipPopoverKey
 */

/**
 * One popup's content. The VIEW composes it — this module owns only when a
 * popup is open and how it is framed.
 *
 * @typedef {{ title: string, lines: string[] }} ChipPopoverContent
 */

/**
 * Elements whose clicks must NOT close the popup: the popup itself, and the
 * chip that opens it (an opening click that also closes never opens anything).
 */
const KEEP_OPEN_SELECTOR = '.chip-popover, .judgement-chip';

/**
 * One open-popup state machine (§5).
 *
 * @param {() => void} onChange - Called after the open key changes; the view
 * re-renders from it.
 * @returns {{ toggle: (key: ChipPopoverKey) => void, close: () => void, isOpen: (key: ChipPopoverKey) => boolean, attach: () => void, detach: () => void }}
 */
export function createChipPopover(onChange) {
  /** @type {ChipPopoverKey|null} */
  let open_key = null;
  let attached = false;

  /**
   * @param {ChipPopoverKey} key
   */
  function isOpen(key) {
    return (
      open_key !== null &&
      open_key.bead_id === key.bead_id &&
      open_key.chip_key === key.chip_key
    );
  }

  /**
   * @param {ChipPopoverKey} key
   */
  function toggle(key) {
    open_key = isOpen(key) ? null : { ...key };
    onChange();
  }

  function close() {
    if (open_key === null) {
      return;
    }
    open_key = null;
    onChange();
  }

  /**
   * @param {Event} ev
   */
  function onDocumentClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (open_key === null) {
      return;
    }
    if (
      target &&
      typeof target.closest === 'function' &&
      target.closest(KEEP_OPEN_SELECTOR)
    ) {
      return;
    }
    close();
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocumentKeyDown(ev) {
    if (ev.key === 'Escape') {
      close();
    }
  }

  function attach() {
    if (attached) {
      return;
    }
    attached = true;
    document.addEventListener('click', onDocumentClick);
    document.addEventListener(
      'keydown',
      /** @type {any} */ (onDocumentKeyDown)
    );
  }

  function detach() {
    if (!attached) {
      return;
    }
    attached = false;
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener(
      'keydown',
      /** @type {any} */ (onDocumentKeyDown)
    );
  }

  return { toggle, close, isOpen, attach, detach };
}

/**
 * The popup body (§5): one title line and a list. Absolutely positioned inside
 * the card by `.chip-popover`, so the caller renders it directly under the line
 * its chip stands in.
 *
 * @param {ChipPopoverContent} content
 * @returns {import('lit-html').TemplateResult}
 */
export function chipPopoverTemplate(content) {
  return html`<div
    class="chip-popover"
    role="dialog"
    aria-label=${content.title}
  >
    <div class="chip-popover__title">${content.title}</div>
    <ul class="chip-popover__lines">
      ${content.lines.map((line) => html`<li>${line}</li>`)}
    </ul>
  </div>`;
}
