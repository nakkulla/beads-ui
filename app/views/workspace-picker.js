import { html, render } from 'lit-html';
import { debug } from '../utils/logging.js';

/**
 * @typedef {import('../state.js').WorkspaceInfo} WorkspaceInfo
 */

/**
 * Extract the project name from a workspace path. Returns just the directory
 * name (e.g., 'myproject' from '/home/user/code/myproject').
 *
 * @param {string} workspace_path
 * @returns {string}
 */
function getProjectName(workspace_path) {
  if (!workspace_path) return 'Unknown';
  const parts = workspace_path.split('/').filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : 'Unknown';
}

/**
 * Create the workspace picker dropdown component.
 *
 * @param {HTMLElement} mount_element
 * @param {{ getState: () => any, subscribe: (fn: (s: any) => void) => () => void }} store
 * @param {(workspace_path: string) => Promise<void>} onWorkspaceChange
 * @param {(workspace_path: string) => Promise<void>} [onWorkspaceGitPull]
 * @param {(workspace_path: string, visible: boolean) => Promise<void>} [onWorkspaceVisibilityChange]
 */
export function createWorkspacePicker(
  mount_element,
  store,
  onWorkspaceChange,
  onWorkspaceGitPull = async () => {},
  onWorkspaceVisibilityChange = async () => {}
) {
  const log = debug('views:workspace-picker');
  /** @type {(() => void) | null} */
  let unsubscribe = null;
  /** @type {boolean} */
  let is_switching = false;
  /** @type {boolean} */
  let is_git_pulling = false;
  /** @type {boolean} */
  let is_managing = false;

  /**
   * Handle workspace selection change.
   *
   * @param {Event} ev
   */
  async function onChange(ev) {
    const select = /** @type {HTMLSelectElement} */ (ev.target);
    const new_path = select.value;
    const s = store.getState();
    const current_path = s.workspace?.current?.path || '';

    if (new_path && new_path !== current_path) {
      log('switching workspace to %s', new_path);
      is_switching = true;
      doRender();
      try {
        await onWorkspaceChange(new_path);
      } catch (err) {
        log('workspace switch failed: %o', err);
      } finally {
        is_switching = false;
        doRender();
      }
    }
  }

  async function onGitPullClick() {
    const s = store.getState();
    const current_path =
      s.workspace?.current?.path || s.workspace?.available?.[0]?.path || '';
    if (!current_path || is_git_pulling) {
      return;
    }

    log('git-pulling workspace %s', current_path);
    is_git_pulling = true;
    doRender();
    try {
      await onWorkspaceGitPull(current_path);
    } catch (err) {
      log('workspace git pull failed: %o', err);
    } finally {
      is_git_pulling = false;
      doRender();
    }
  }

  /**
   * Close on an outside mousedown. Any click inside the picker (the manage
   * button, the popover, its checkboxes) keeps the popover open.
   *
   * @param {MouseEvent} ev
   */
  function onDocMousedown(ev) {
    const target = /** @type {Node | null} */ (ev.target);
    if (target && mount_element.contains(target)) {
      return;
    }
    closeManage();
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocKeydown(ev) {
    if (ev.key === 'Escape') {
      closeManage();
    }
  }

  function openManage() {
    if (is_managing) {
      return;
    }
    is_managing = true;
    document.addEventListener('mousedown', onDocMousedown);
    document.addEventListener('keydown', onDocKeydown);
    doRender();
  }

  function closeManage() {
    if (!is_managing) {
      return;
    }
    is_managing = false;
    document.removeEventListener('mousedown', onDocMousedown);
    document.removeEventListener('keydown', onDocKeydown);
    doRender();
  }

  function onManageClick() {
    if (is_managing) {
      closeManage();
    } else {
      openManage();
    }
  }

  /**
   * Toggle a workspace's visibility from the popover. `checked` = visible.
   *
   * @param {Event} ev
   */
  async function onVisibilityToggle(ev) {
    const cb = /** @type {HTMLInputElement} */ (ev.target);
    const workspace_path = cb.value;
    const visible = cb.checked;
    log('toggling visibility %s → %s', workspace_path, String(visible));
    try {
      await onWorkspaceVisibilityChange(workspace_path, visible);
    } catch (err) {
      log('workspace visibility toggle failed: %o', err);
    }
  }

  /**
   * Git Pull is a compact icon button (spec §7). The label is carried by
   * `aria-label`/`title`; the in-flight state is shown by the shared loading
   * spinner plus the disabled attribute rather than a text swap.
   *
   * @param {string} current_path
   */
  function renderGitPullButton(current_path) {
    if (!current_path) {
      return html``;
    }

    return html`
      <button
        type="button"
        class="workspace-picker__git-pull-button"
        @click=${onGitPullClick}
        ?disabled=${is_switching || is_git_pulling}
        aria-label="Git Pull"
        title="Git Pull"
      >
        <span aria-hidden="true">⬇</span>
      </button>
    `;
  }

  /**
   * Manage button + (when open) a popover listing every available workspace with
   * a visibility checkbox (checked = visible).
   *
   * @param {WorkspaceInfo[]} available
   * @param {Set<string>} hidden_set
   */
  function renderManage(available, hidden_set) {
    return html`
      <div class="workspace-picker__manage">
        <button
          type="button"
          class="workspace-picker__manage-button"
          @click=${onManageClick}
          aria-haspopup="true"
          aria-expanded=${is_managing ? 'true' : 'false'}
          aria-label="프로젝트 관리"
        >
          프로젝트 관리
        </button>
        ${is_managing
          ? html`
              <div
                class="workspace-picker__manage-popover"
                role="menu"
                aria-label="프로젝트 표시 선택"
              >
                ${available.map(
                  (/** @type {WorkspaceInfo} */ ws) => html`
                    <label
                      class="workspace-picker__manage-row"
                      title="${ws.path}"
                    >
                      <input
                        type="checkbox"
                        class="workspace-picker__manage-checkbox"
                        value="${ws.path}"
                        .checked=${!hidden_set.has(ws.path)}
                        @change=${onVisibilityToggle}
                      />
                      <span class="workspace-picker__manage-name"
                        >${getProjectName(ws.path)}</span
                      >
                    </label>
                  `
                )}
              </div>
            `
          : ''}
      </div>
    `;
  }

  function template() {
    const s = store.getState();
    const current = s.workspace?.current;
    const available = s.workspace?.available || [];
    const hidden_set = new Set(s.workspace?.hidden || []);
    const current_path = current?.path || available[0]?.path || '';

    // Don't render if no workspaces available
    if (available.length === 0) {
      return html``;
    }

    // Dropdown excludes hidden workspaces, but the current one always shows so a
    // hidden-current workspace stays selectable until the next switch (spec §6).
    const visible_list = available.filter(
      (/** @type {WorkspaceInfo} */ ws) =>
        !hidden_set.has(ws.path) || ws.path === current_path
    );

    // Single visible workspace: show it as a simple label.
    if (visible_list.length <= 1) {
      const only = visible_list[0] || available[0];
      const name = getProjectName(only.path);
      return html`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${only.path}"
            >${name}</span
          >
          ${renderManage(available, hidden_set)}
          ${renderGitPullButton(current_path)}
          ${is_git_pulling
            ? html`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`
            : ''}
        </div>
      `;
    }

    // Multiple visible workspaces: show dropdown
    return html`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${onChange}
          ?disabled=${is_switching || is_git_pulling}
          aria-label="Select project workspace"
        >
          ${visible_list.map(
            (/** @type {WorkspaceInfo} */ ws) => html`
              <option
                value="${ws.path}"
                ?selected=${ws.path === current_path}
                title="${ws.path}"
              >
                ${getProjectName(ws.path)}
              </option>
            `
          )}
        </select>
        ${renderManage(available, hidden_set)}
        ${renderGitPullButton(current_path)}
        ${is_switching || is_git_pulling
          ? html`<span
              class="workspace-picker__loading"
              aria-hidden="true"
            ></span>`
          : ''}
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
      document.removeEventListener('mousedown', onDocMousedown);
      document.removeEventListener('keydown', onDocKeydown);
      render(html``, mount_element);
    }
  };
}
