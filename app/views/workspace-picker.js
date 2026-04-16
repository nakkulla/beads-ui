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
 * @param {(workspace_path: string) => Promise<void>} [onWorkspaceSync]
 */
export function createWorkspacePicker(
  mount_element,
  store,
  onWorkspaceChange,
  onWorkspaceSync = async () => {}
) {
  const log = debug('views:workspace-picker');
  /** @type {(() => void) | null} */
  let unsubscribe = null;
  /** @type {boolean} */
  let is_switching = false;
  /** @type {boolean} */
  let is_syncing = false;

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

  async function onSyncClick() {
    const s = store.getState();
    const current_path =
      s.workspace?.current?.path || s.workspace?.available?.[0]?.path || '';
    if (!current_path || is_syncing) {
      return;
    }

    log('syncing workspace %s', current_path);
    is_syncing = true;
    doRender();
    try {
      await onWorkspaceSync(current_path);
    } catch (err) {
      log('workspace sync failed: %o', err);
    } finally {
      is_syncing = false;
      doRender();
    }
  }

  /**
   * @param {string} current_path
   */
  function renderSyncButton(current_path) {
    if (!current_path) {
      return html``;
    }

    return html`
      <button
        type="button"
        class="workspace-picker__sync-button"
        @click=${onSyncClick}
        ?disabled=${is_switching || is_syncing}
        aria-label="Sync current workspace"
      >
        ${is_syncing ? 'Syncing…' : 'Sync'}
      </button>
    `;
  }

  function template() {
    const s = store.getState();
    const current = s.workspace?.current;
    const available = s.workspace?.available || [];
    const current_path = current?.path || available[0]?.path || '';

    // Don't render if no workspaces available
    if (available.length === 0) {
      return html``;
    }

    // If only one workspace, show it as a simple label
    if (available.length === 1) {
      const name = getProjectName(available[0].path);
      return html`
        <div class="workspace-picker workspace-picker--single">
          <span class="workspace-picker__label" title="${available[0].path}"
            >${name}</span
          >
          ${renderSyncButton(current_path)}
          ${is_syncing
            ? html`<span
                class="workspace-picker__loading"
                aria-hidden="true"
              ></span>`
            : ''}
        </div>
      `;
    }

    // Multiple workspaces: show dropdown
    return html`
      <div class="workspace-picker">
        <select
          class="workspace-picker__select"
          @change=${onChange}
          ?disabled=${is_switching || is_syncing}
          aria-label="Select project workspace"
        >
          ${available.map(
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
        ${renderSyncButton(current_path)}
        ${is_switching || is_syncing
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
      render(html``, mount_element);
    }
  };
}
