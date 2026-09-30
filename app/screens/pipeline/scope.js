/**
 * The scope selector of the header (UI-dbn6 §3.1·§3.2). Scope is a filter,
 * not a screen: `전체` shows every visible workspace, a repo narrows the same
 * pipeline to one. The popover lists the scopes; on a phone it also carries
 * the screen nav and `새 이슈` (the header keeps only brand · scope · usage ·
 * ⚙ there). The connected repo's `git pull` and the visibility check-list
 * (`set-workspace-visibility`) stay reachable from the popover footer.
 */
import { html } from 'lit-html';
import { ALL_SCOPE } from '../../core/state.js';

/**
 * @typedef {{ root_dir: string, name: string, running?: number }} ScopeRepo
 * @typedef {Object} ScopeView
 * @property {string} scope - `*` or a root_dir.
 * @property {ScopeRepo[]} repos - Visible workspaces.
 * @property {Array<{ path: string }>} available - Every registered workspace.
 * @property {string[]} hidden
 * @property {string|null} connected
 * @property {boolean} open
 * @property {boolean} manage_open
 * @property {boolean} narrow
 * @property {string} screen
 * @property {boolean} pulling
 */

/**
 * @param {string} path
 * @returns {string}
 */
export function nameOf(path) {
  const parts = String(path || '')
    .split('/')
    .filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : path;
}

/**
 * The label of the scope trigger.
 *
 * @param {ScopeView} view
 * @returns {string}
 */
export function scopeLabel(view) {
  if (view.scope === ALL_SCOPE) {
    return view.narrow ? '전체' : `전체 ${view.repos.length}개 레포`;
  }
  return (
    view.repos.find((repo) => repo.root_dir === view.scope)?.name ||
    nameOf(view.scope)
  );
}

/** Screens of the nav (desktop in the header, phone inside this popover). */
export const SCREENS = [
  { id: 'pipeline', label: '파이프라인' },
  { id: 'compare', label: '비교' },
  { id: 'adr', label: 'ADR' }
];

/**
 * @param {ScopeView} view
 * @returns {import('lit-html').TemplateResult}
 */
export function scopeSelector(view) {
  return html`<span class="ui-scope">
    <button
      type="button"
      class="ui-scope__trigger"
      data-op="scope-menu"
      aria-haspopup="dialog"
      aria-expanded=${view.open ? 'true' : 'false'}
      title="표시 범위"
    >
      <span
        class="ui-scope__dot${view.scope === ALL_SCOPE ? ' is-all' : ''}"
        aria-hidden="true"
      ></span>
      <span class="ui-scope__label">${scopeLabel(view)}</span>
      <span class="ui-scope__chev" aria-hidden="true">▾</span>
    </button>
    ${view.open ? scopeMenu(view) : ''}
  </span>`;
}

/**
 * @param {ScopeView} view
 * @returns {import('lit-html').TemplateResult}
 */
function scopeMenu(view) {
  return html`<div
    class="ui-popover ui-scope__menu"
    role="dialog"
    aria-label="표시 범위"
  >
    ${view.narrow
      ? html`<div class="ui-scope__nav" role="group" aria-label="화면">
          ${SCREENS.map(
            (screen) =>
              html`<button
                type="button"
                class="ui-chip${view.screen === screen.id ? ' is-on' : ''}"
                data-op="nav"
                data-value=${screen.id}
                aria-pressed=${view.screen === screen.id ? 'true' : 'false'}
              >
                ${screen.label}
              </button>`
          )}
          <button
            type="button"
            class="ui-chip"
            data-op="new-issue"
            title="새 이슈"
          >
            + 새 이슈
          </button>
        </div>`
      : ''}
    <ul class="ui-scope__list">
      <li>
        <button
          type="button"
          class="ui-scope__item${view.scope === ALL_SCOPE ? ' is-on' : ''}"
          data-op="scope-pick"
          data-value=${ALL_SCOPE}
        >
          전체 <span class="ui-scope__sub">${view.repos.length}개 레포</span>
        </button>
      </li>
      ${view.repos.map(
        (repo) =>
          html`<li>
            <button
              type="button"
              class="ui-scope__item${view.scope === repo.root_dir
                ? ' is-on'
                : ''}"
              data-op="scope-pick"
              data-value=${repo.root_dir}
              title=${repo.root_dir}
            >
              ${repo.name}${typeof repo.running === 'number' && repo.running > 0
                ? html`<span class="ui-scope__sub">실행 ${repo.running}</span>`
                : ''}
            </button>
          </li>`
      )}
    </ul>
    <div class="ui-scope__foot">
      ${view.connected
        ? html`<button
            type="button"
            class="ui-btn ui-btn--ghost"
            data-op="git-pull"
            ?disabled=${view.pulling}
            title=${`${nameOf(view.connected)}에서 git pull --rebase (필요하면 stash)`}
          >
            ↻ git pull · ${nameOf(view.connected)}
          </button>`
        : ''}
      <button
        type="button"
        class="ui-btn ui-btn--ghost"
        data-op="scope-manage"
        aria-expanded=${view.manage_open ? 'true' : 'false'}
      >
        표시 관리
      </button>
    </div>
    ${view.manage_open
      ? html`<div
          class="ui-scope__manage"
          role="group"
          aria-label="표시할 레포"
        >
          ${view.available.map(
            (workspace) =>
              html`<label class="pl-check">
                <input
                  type="checkbox"
                  data-op="scope-visibility"
                  data-value=${workspace.path}
                  .checked=${!view.hidden.includes(workspace.path)}
                />
                ${nameOf(workspace.path)}
              </label>`
          )}
        </div>`
      : ''}
  </div>`;
}
