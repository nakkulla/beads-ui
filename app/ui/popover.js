/**
 * Anchored popover primitive (UI-dbn6 §4.4): drawn right below its trigger,
 * inside the trigger's positioned wrapper. The owner holds the open state and
 * closes it on an outside click or Escape via {@link watchOutside}.
 */
import { html } from 'lit-html';

/**
 * @param {{ body: unknown, label: string, cls?: string }} input
 * @returns {import('lit-html').TemplateResult}
 */
export function popoverTemplate(input) {
  return html`<div
    class="ui-popover${input.cls ? ` ${input.cls}` : ''}"
    role="dialog"
    aria-label=${input.label}
  >
    ${input.body}
  </div>`;
}

/**
 * Call `onClose` for a pointer press outside `selector` or for Escape.
 *
 * @param {Document} doc
 * @param {string} selector - The popover wrapper (trigger + popover).
 * @param {() => boolean} isOpen
 * @param {() => void} onClose
 * @returns {() => void} Detach.
 */
export function watchOutside(doc, selector, isOpen, onClose) {
  /** @param {Event} ev */
  const onPointer = (ev) => {
    const target = /** @type {Element|null} */ (ev.target);
    if (isOpen() && !(target && target.closest && target.closest(selector))) {
      onClose();
    }
  };
  /** @param {KeyboardEvent} ev */
  const onKey = (ev) => {
    if (ev.key === 'Escape' && isOpen()) {
      onClose();
    }
  };
  doc.addEventListener('pointerdown', onPointer);
  doc.addEventListener('keydown', onKey);
  return () => {
    doc.removeEventListener('pointerdown', onPointer);
    doc.removeEventListener('keydown', onKey);
  };
}
