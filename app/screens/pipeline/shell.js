/**
 * The one-line header of the shell (UI-dbn6 §3.1): brand · scope selector ·
 * screen nav · (right) request activity · usage meter · theme (sun/moon) ·
 * ⚙ · 새 이슈.
 * On a phone only brand · scope · usage · ⚙ remain; the nav and 새 이슈 move
 * into the scope popover.
 *
 * The activity indicator and the usage meter are static containers the shell
 * never re-renders: `utils/activity-indicator.js` toggles its own element and
 * the legacy usage meter (bridged until Phase 3) owns its own lit root.
 */
import { html } from 'lit-html';
import { gearIcon, moonIcon, sunIcon } from '../../ui/icons.js';
import { watchOutside } from '../../ui/popover.js';
import { render } from '../../ui/render.js';
import { SCREENS, scopeSelector } from './scope.js';

/**
 * @typedef {import('./scope.js').ScopeView} ScopeView
 * @typedef {Object} ShellDeps
 * @property {() => Omit<ScopeView, 'open'|'manage_open'|'narrow'|'pulling'>} scopeView
 * @property {() => boolean} narrow
 * @property {(scope: string) => void} onScope
 * @property {(screen: string) => void} onScreen
 * @property {() => void} onTheme
 * @property {() => void} onSettings
 * @property {() => void} onNewIssue
 * @property {(root_dir: string) => Promise<void>} onGitPull
 * @property {(path: string, visible: boolean) => void} onVisibility
 */

/**
 * @param {HTMLElement} mount
 * @param {ShellDeps} deps
 */
export function createShell(mount, deps) {
  let open = false;
  let manage_open = false;
  let pulling = false;

  function view() {
    return {
      ...deps.scopeView(),
      open,
      manage_open,
      narrow: deps.narrow(),
      pulling
    };
  }

  function doRender() {
    const current = view();
    render(
      html`<div class="ui-header__row">
        <span class="ui-brand">Beads</span>
        ${scopeSelector(current)}
        ${current.narrow
          ? ''
          : html`<nav class="ui-nav" aria-label="화면">
              ${SCREENS.map(
                (screen) =>
                  html`<a
                    href=${`#/${screen.id}`}
                    class="ui-nav__link${current.screen === screen.id
                      ? ' is-on'
                      : ''}"
                    data-op="nav"
                    data-value=${screen.id}
                    aria-current=${current.screen === screen.id
                      ? 'page'
                      : 'false'}
                    >${screen.label}</a
                  >`
              )}
            </nav>`}
        <span class="ui-header__spacer"></span>
        <div
          id="header-loading"
          class="header-loading"
          role="status"
          aria-live="polite"
          aria-label="Loading"
          hidden
        >
          <span class="header-loading__spinner" aria-hidden="true"></span>
        </div>
        <div id="usage-meter" class="ui-usage"></div>
        ${current.narrow
          ? ''
          : html`<button
              type="button"
              class="ui-btn ui-btn--icon ui-theme-toggle"
              data-op="theme"
              aria-label="테마 전환"
              title="테마 전환"
            >
              <span class="ui-theme-toggle__sun">${sunIcon()}</span
              ><span class="ui-theme-toggle__moon">${moonIcon()}</span>
            </button>`}
        <button
          type="button"
          class="ui-btn ui-btn--icon"
          data-op="settings"
          aria-haspopup="dialog"
          aria-label="설정"
          title="설정"
        >
          ${gearIcon()}
        </button>
        ${current.narrow
          ? ''
          : html`<button
              type="button"
              class="ui-btn ui-btn--primary"
              data-op="new-issue"
              aria-haspopup="dialog"
              title="새 이슈 (Ctrl/Cmd+N)"
            >
              새 이슈
            </button>`}
      </div>`,
      mount
    );
  }

  /**
   * @param {MouseEvent} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const button = /** @type {HTMLElement|null} */ (
      target?.closest?.('[data-op]') || null
    );
    if (!button || button.tagName === 'INPUT') {
      return;
    }
    const op = button.dataset.op;
    const value = button.dataset.value || '';
    if (op === 'nav') {
      ev.preventDefault();
      open = false;
      deps.onScreen(value);
      doRender();
      return;
    }
    if (op === 'scope-menu') {
      open = !open;
      manage_open = false;
      doRender();
      return;
    }
    if (op === 'scope-pick') {
      open = false;
      deps.onScope(value);
      doRender();
      return;
    }
    if (op === 'scope-manage') {
      manage_open = !manage_open;
      doRender();
      return;
    }
    if (op === 'git-pull') {
      const connected = deps.scopeView().connected;
      if (connected && !pulling) {
        pulling = true;
        doRender();
        void deps.onGitPull(connected).finally(() => {
          pulling = false;
          doRender();
        });
      }
      return;
    }
    if (op === 'theme') {
      deps.onTheme();
      return;
    }
    if (op === 'settings') {
      deps.onSettings();
      return;
    }
    if (op === 'new-issue') {
      open = false;
      doRender();
      deps.onNewIssue();
    }
  }

  /**
   * @param {Event} ev
   */
  function onChange(ev) {
    const target = /** @type {HTMLInputElement|null} */ (ev.target);
    if (target?.dataset?.op === 'scope-visibility') {
      deps.onVisibility(target.dataset.value || '', target.checked);
    }
  }

  mount.addEventListener('click', onClick);
  mount.addEventListener('change', onChange);
  const detach_outside = watchOutside(
    document,
    '.ui-scope',
    () => open,
    () => {
      open = false;
      manage_open = false;
      doRender();
    }
  );
  doRender();

  return {
    render: doRender,
    /** @returns {HTMLElement|null} */
    loadingElement: () => mount.querySelector('#header-loading'),
    /** @returns {HTMLElement|null} */
    usageElement: () => mount.querySelector('#usage-meter'),
    destroy() {
      detach_outside();
      mount.removeEventListener('click', onClick);
      mount.removeEventListener('change', onChange);
    }
  };
}
