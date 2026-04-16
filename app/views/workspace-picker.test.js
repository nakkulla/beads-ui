import { describe, expect, test, vi } from 'vitest';
import { createWorkspacePicker } from './workspace-picker.js';

/**
 * @param {any} workspace
 */
function makeStore(workspace) {
  return {
    state: { workspace },
    getState() {
      return this.state;
    },
    /** @param {(state: any) => void} fn */
    subscribe(fn) {
      this._listener = fn;
      return () => void 0;
    },
    _listener: /** @type {(state: any) => void} */ (() => {})
  };
}

describe('views/workspace-picker', () => {
  test('renders sync button for a single current workspace and calls sync handler', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
      available: [{ path: '/repo-a', database: '/repo-a/.beads/ui.db' }]
    });
    const onWorkspaceChange = vi.fn();
    const onWorkspaceSync = vi.fn(async () => {});

    createWorkspacePicker(
      mount,
      /** @type {any} */ (store),
      onWorkspaceChange,
      onWorkspaceSync
    );

    const label = mount.querySelector('.workspace-picker__label');
    const syncButton = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__sync-button')
    );

    expect(label?.textContent).toBe('repo-a');
    expect(syncButton).not.toBeNull();

    syncButton.click();
    await Promise.resolve();

    expect(onWorkspaceChange).not.toHaveBeenCalled();
    expect(onWorkspaceSync).toHaveBeenCalledWith('/repo-a');
  });

  test('shows syncing state while sync is in flight for multiple workspaces', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: { path: '/repo-b', database: '/repo-b/.beads/ui.db' },
      available: [
        { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
        { path: '/repo-b', database: '/repo-b/.beads/ui.db' }
      ]
    });
    const onWorkspaceChange = vi.fn();
    /** @type {() => void} */
    let resolveSync = () => {};
    const onWorkspaceSync = vi.fn(
      () =>
        /** @type {Promise<void>} */ (
          new Promise((resolve) => {
            resolveSync = () => resolve();
          })
        )
    );

    createWorkspacePicker(
      mount,
      /** @type {any} */ (store),
      onWorkspaceChange,
      onWorkspaceSync
    );

    const syncButton = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__sync-button')
    );
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.workspace-picker__select')
    );

    syncButton.click();
    await Promise.resolve();

    expect(onWorkspaceSync).toHaveBeenCalledWith('/repo-b');
    expect(onWorkspaceChange).not.toHaveBeenCalled();
    expect(syncButton.disabled).toBe(true);
    expect(syncButton.textContent?.trim()).toBe('Syncing…');
    expect(select.disabled).toBe(true);
    expect(mount.querySelector('.workspace-picker__loading')).not.toBeNull();

    resolveSync();
    await Promise.resolve();
    await Promise.resolve();

    expect(syncButton.disabled).toBe(false);
    expect(syncButton.textContent?.trim()).toBe('Sync');
    expect(select.disabled).toBe(false);
  });
});
