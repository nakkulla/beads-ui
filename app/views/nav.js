import { html, render } from 'lit-html';
import { debug } from '../utils/logging.js';

/**
 * @import { ViewName } from '../state.js'
 */

/**
 * The views the header can address. Every OTHER state value renders as Board,
 * which is what an unknown hash resolves to.
 *
 * @type {ReadonlyArray<ViewName>}
 */
const NAV_VIEWS = ['board', 'worker', 'monitor', 'compare', 'adr'];

/**
 * Render the header navigation split by scope: the global mount gets the
 * cross-repo Monitor, 비교 and ADR links, the repo mount gets the Board / Worker
 * tabs that belong to the selected workspace. 비교 is global because the
 * presets it compares are a server-global store (preset-compare §3.1).
 *
 * @param {{ global_element: HTMLElement | null, repo_element: HTMLElement | null }} mounts
 * @param {{ getState: () => any, subscribe: (fn: (s: any) => void) => () => void }} store
 * @param {{ gotoView: (v: ViewName) => void }} router
 */
export function createTopNav(mounts, store, router) {
  const log = debug('views:nav');
  const { global_element, repo_element } = mounts;
  /** @type {(() => void) | null} */
  let unsubscribe = null;

  /**
   * Clicking the already-active Monitor tab toggles back to the selected
   * repo's Worker tab, so the global tab doubles as a return path.
   *
   * @param {ViewName} view
   * @returns {(ev: MouseEvent) => void}
   */
  function onClick(view) {
    return (ev) => {
      ev.preventDefault();
      const target =
        view === 'monitor' && activeView() === 'monitor' ? 'worker' : view;
      log('click tab %s', target);
      router.gotoView(target);
    };
  }

  /**
   * @returns {ViewName}
   */
  function activeView() {
    const s = store.getState();
    return NAV_VIEWS.includes(s.view) ? s.view : 'board';
  }

  function globalTemplate() {
    const active = activeView();
    return html`
      <div class="ctl-tabs">
        <a
          href="#/monitor"
          class="ctl-tab ctl-tab--monitor ${active === 'monitor'
            ? 'is-active'
            : ''}"
          @click=${onClick('monitor')}
        >
          <span class="ctl-tab__dots" aria-hidden="true"
            ><i></i><i></i><i></i><i></i
          ></span>
          Monitor
        </a>
        <a
          href="#/compare"
          class="ctl-tab ctl-tab--compare ${active === 'compare'
            ? 'is-active'
            : ''}"
          @click=${onClick('compare')}
          >비교</a
        >
        <a
          href="#/adr"
          class="ctl-tab ctl-tab--adr ${active === 'adr' ? 'is-active' : ''}"
          @click=${onClick('adr')}
          >ADR</a
        >
      </div>
    `;
  }

  function repoTemplate() {
    const active = activeView();
    return html`
      <div class="ctl-tabs">
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
    if (global_element) {
      render(globalTemplate(), global_element);
    }
    if (repo_element) {
      render(repoTemplate(), repo_element);
    }
  }

  doRender();
  unsubscribe = store.subscribe(() => doRender());

  return {
    destroy() {
      if (unsubscribe) {
        unsubscribe();
        unsubscribe = null;
      }
      if (global_element) {
        render(html``, global_element);
      }
      if (repo_element) {
        render(html``, repo_element);
      }
    }
  };
}
