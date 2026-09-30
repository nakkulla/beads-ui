/**
 * The 전역 tab's `저장소` group (UI-dbn6 §3.7, 부록 A 전역): every registered
 * repository (`list-workspaces`, read again when the tab opens) with its
 * visibility switch (`set-workspace-visibility`) and, on the connected one,
 * `↻ git pull` (`git-pull-workspace` reads the connection, so only that repo
 * can be pulled from here). The list is server-global like the rest of the
 * tab, so the `적용 대상` checks do not narrow it.
 *
 * @import { SettingsWorkspaces } from './index.js'
 */
import { html } from 'lit-html';
import { render } from '../../ui/render.js';

/**
 * @param {string} path
 * @returns {string}
 */
function nameOf(path) {
  const parts = String(path || '')
    .split('/')
    .filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : path;
}

/**
 * @param {HTMLElement} host
 * @param {SettingsWorkspaces} workspaces
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createWorkspaceListSection(host, workspaces) {
  /** Paths whose visibility write is in flight. */
  /** @type {Set<string>} */
  const busy = new Set();
  let pulling = false;
  let destroyed = false;

  /**
   * @param {string} path
   * @param {boolean} visible
   */
  function onVisible(path, visible) {
    if (busy.has(path) || !workspaces.setVisible) {
      return;
    }
    busy.add(path);
    doRender();
    void workspaces.setVisible(path, visible).finally(() => {
      busy.delete(path);
      doRender();
    });
  }

  /** @param {string} path */
  function onPull(path) {
    if (pulling || !workspaces.gitPull) {
      return;
    }
    pulling = true;
    doRender();
    void workspaces.gitPull(path).finally(() => {
      pulling = false;
      doRender();
    });
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    const { available, hidden, connected } = workspaces.list();
    render(
      html`<section class="settings-dialog__group" data-group="workspaces">
        <div class="settings-dialog__group-title">저장소</div>
        <p class="settings-dialog__hint">
          끈 저장소는 파이프라인·범위 목록에서 빠집니다. git pull은 연결된
          저장소에서만 합니다.
        </p>
        <ul class="st-repos">
          ${available.map((workspace) => {
            const visible = !hidden.includes(workspace.path);
            const is_connected = workspace.path === connected;
            return html`<li
              class="st-repos__row"
              data-workspace-row=${workspace.path}
            >
              <span class="st-repos__name">
                <b>${nameOf(workspace.path)}</b>
                ${is_connected
                  ? html`<span class="ui-chip st-repos__tag">연결됨</span>`
                  : ''}
                <span class="st-repos__path" title=${workspace.path}
                  >${workspace.path}</span
                >
              </span>
              <span class="st-repos__ops">
                ${is_connected && workspaces.gitPull
                  ? html`<button
                      type="button"
                      class="ui-btn ui-btn--ghost ui-btn--sm"
                      data-workspace-pull
                      ?disabled=${pulling}
                      title="git pull --rebase (필요하면 stash)"
                      @click=${() => onPull(workspace.path)}
                    >
                      ↻ git pull
                    </button>`
                  : ''}
                <button
                  type="button"
                  class="ui-toggle st-repos__toggle${visible ? ' is-on' : ''}"
                  data-workspace-visible
                  aria-pressed=${visible ? 'true' : 'false'}
                  aria-label=${`${nameOf(workspace.path)} 표시`}
                  ?disabled=${busy.has(workspace.path)}
                  @click=${() => onVisible(workspace.path, !visible)}
                >
                  <span class="ui-toggle__track" aria-hidden="true"></span>표시
                </button>
              </span>
            </li>`;
          })}
        </ul>
      </section>`,
      host
    );
  }

  return {
    render: doRender,
    destroy() {
      destroyed = true;
      render(html``, host);
    }
  };
}
