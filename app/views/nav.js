import { html, render } from 'lit-html';
import { debug } from '../utils/logging.js';

/**
 * Render the two-tab control-tower navigation (Board / Worker).
 *
 * @param {HTMLElement} mount_element
 * @param {{ getState: () => any, subscribe: (fn: (s: any) => void) => () => void }} store
 * @param {{ gotoView: (v: 'board'|'worker') => void }} router
 */
export function createTopNav(mount_element, store, router) {
  const log = debug('views:nav');
  /** @type {(() => void) | null} */
  let unsubscribe = null;

  /**
   * @param {'board'|'worker'} view
   * @returns {(ev: MouseEvent) => void}
   */
  function onClick(view) {
    return (ev) => {
      ev.preventDefault();
      log('click tab %s', view);
      router.gotoView(view);
    };
  }

  function template() {
    const s = store.getState();
    const active = s.view === 'worker' ? 'worker' : 'board';
    return html`
      <div class="ctl-tabs" aria-label="Primary">
        <a
          href="#/board"
          class="ctl-tab ${active === 'board' ? 'is-active' : ''}"
          @click=${onClick('board')}
          >Board</a
        >
        <a
          href="#/worker"
          class="ctl-tab ${active === 'worker' ? 'is-active' : ''}"
          @click=${onClick('worker')}
          >Worker</a
        >
      </div>
    `;
  }

  function doRender() {
    render(template(), mount_element);
  }

  doRender();
  unsubscribe = store.subscribe(() => doRender());

  return {
    destroy() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      render(html``, mount_element);
    }
  };
}
