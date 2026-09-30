/**
 * The render observation wrapper (UI-dbn6 §4.1). This is the ONLY module that
 * imports lit-html's `render` (eslint `no-restricted-imports`), so every
 * screen, sheet and mount the shell draws is counted in one place. The count
 * is published as
 * `window.__bdui.render_count` — jsdom tests and `scripts/ui-shots.mjs` read
 * the same value to prove an idle screen does not re-render.
 */
import { render as litRender } from 'lit-html';

let render_count = 0;

/**
 * Draw `value` into `container` through lit-html, counting the call.
 *
 * @param {unknown} value
 * @param {HTMLElement|DocumentFragment} container
 * @param {import('lit-html').RenderOptions} [options]
 */
export function render(value, container, options) {
  render_count += 1;
  litRender(value, container, options);
}

/**
 * @returns {number} How many times {@link render} ran in this page.
 */
export function renderCount() {
  return render_count;
}

if (typeof window !== 'undefined') {
  const host = /** @type {any} */ (window);
  const bdui = host.__bdui || (host.__bdui = {});
  Object.defineProperty(bdui, 'render_count', {
    configurable: true,
    enumerable: true,
    get: () => render_count
  });
}
