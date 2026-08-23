import { html, render } from 'lit-html';
import { debug } from '../utils/logging.js';

/**
 * Render the header navigation split by scope: the global mount gets the
 * cross-repo Monitor link, the repo mount gets the Board / Worker tabs that
 * belong to the selected workspace.
 *
 * @param {{ global_element: HTMLElement | null, repo_element: HTMLElement | null }} mounts
 * @param {{ getState: () => any, subscribe: (fn: (s: any) => void) => () => void }} store
 * @param {{ gotoView: (v: 'board'|'worker'|'monitor') => void }} router
 */
export function createTopNav(mounts, store, router) {
  const log = debug('views:nav');
  const { global_element, repo_element } = mounts;
  /** @type {(() => void) | null} */
  let unsubscribe = null;

  /**
   * @param {'board'|'worker'|'monitor'} view
   * @returns {(ev: MouseEvent) => void}
   */
  function onClick(view) {
    return (ev) => {
      ev.preventDefault();
      log('click tab %s', view);
      router.gotoView(view);
    };
  }

  /**
   * @returns {'board'|'worker'|'monitor'}
   */
  function activeView() {
    const s = store.getState();
    return s.view === 'worker' || s.view === 'monitor' ? s.view : 'board';
  }

  function globalTemplate() {
    const active = activeView();
    return html`
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
