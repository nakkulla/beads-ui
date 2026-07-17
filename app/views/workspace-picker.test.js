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
  test('renders Git Pull icon button for a single current workspace and calls git-pull handler', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
      available: [{ path: '/repo-a', database: '/repo-a/.beads/ui.db' }]
    });
    const onWorkspaceChange = vi.fn();
    const onWorkspaceGitPull = vi.fn(async () => {});

    createWorkspacePicker(
      mount,
      /** @type {any} */ (store),
      onWorkspaceChange,
      onWorkspaceGitPull
    );

    const label = mount.querySelector('.workspace-picker__label');
    const gitPullButton = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__git-pull-button')
    );

    // Sync is gone entirely.
    expect(mount.querySelector('.workspace-picker__sync-button')).toBeNull();
    expect(label?.textContent).toBe('repo-a');
    expect(gitPullButton).not.toBeNull();
    // Icon-only: the accessible name lives on aria-label, not the text.
    expect(gitPullButton.getAttribute('aria-label')).toBe('Git Pull');
    expect(gitPullButton.textContent?.trim()).toBe('⬇');

    gitPullButton.click();
    await Promise.resolve();

    expect(onWorkspaceChange).not.toHaveBeenCalled();
    expect(onWorkspaceGitPull).toHaveBeenCalledWith('/repo-a');
  });

  test('shows in-flight state while git pull is running for multiple workspaces', async () => {
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
    let resolvePull = () => {};
    const onWorkspaceGitPull = vi.fn(
      () =>
        /** @type {Promise<void>} */ (
          new Promise((resolve) => {
            resolvePull = () => resolve();
          })
        )
    );

    createWorkspacePicker(
      mount,
      /** @type {any} */ (store),
      onWorkspaceChange,
      onWorkspaceGitPull
    );

    const gitPullButton = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__git-pull-button')
    );
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.workspace-picker__select')
    );

    gitPullButton.click();
    await Promise.resolve();

    expect(onWorkspaceGitPull).toHaveBeenCalledWith('/repo-b');
    expect(onWorkspaceChange).not.toHaveBeenCalled();
    expect(gitPullButton.disabled).toBe(true);
    expect(select.disabled).toBe(true);
    expect(mount.querySelector('.workspace-picker__loading')).not.toBeNull();

    resolvePull();
    await Promise.resolve();
    await Promise.resolve();

    expect(gitPullButton.disabled).toBe(false);
    expect(select.disabled).toBe(false);
    expect(mount.querySelector('.workspace-picker__loading')).toBeNull();
  });

  test('falls back to first available workspace when current workspace is absent', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: null,
      available: [{ path: '/repo-a', database: '/repo-a/.beads/ui.db' }]
    });
    const onWorkspaceChange = vi.fn();
    const onWorkspaceGitPull = vi.fn(async () => {});

    createWorkspacePicker(
      mount,
      /** @type {any} */ (store),
      onWorkspaceChange,
      onWorkspaceGitPull
    );

    const gitPullButton = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__git-pull-button')
    );

    gitPullButton.click();
    await Promise.resolve();

    expect(onWorkspaceChange).not.toHaveBeenCalled();
    expect(onWorkspaceGitPull).toHaveBeenCalledWith('/repo-a');
  });
});

describe('views/workspace-picker project management (hidden workspaces)', () => {
  test('dropdown excludes hidden workspaces but always shows the current one', () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: { path: '/repo-b', database: '/repo-b/.beads/ui.db' },
      available: [
        { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
        { path: '/repo-b', database: '/repo-b/.beads/ui.db' },
        { path: '/repo-c', database: '/repo-c/.beads/ui.db' }
      ],
      // /repo-b is hidden AND current → must still appear; /repo-a hidden → gone.
      hidden: ['/repo-a', '/repo-b']
    });

    createWorkspacePicker(mount, /** @type {any} */ (store), vi.fn());

    const options = Array.from(
      mount.querySelectorAll('.workspace-picker__select option')
    ).map((o) => o.getAttribute('value'));
    expect(options).toEqual(['/repo-b', '/repo-c']);
  });

  test('프로젝트 관리 popover lists every available workspace with checkbox state', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: { path: '/repo-b', database: '/repo-b/.beads/ui.db' },
      available: [
        { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
        { path: '/repo-b', database: '/repo-b/.beads/ui.db' }
      ],
      hidden: ['/repo-a']
    });

    createWorkspacePicker(mount, /** @type {any} */ (store), vi.fn());

    // Popover is closed until the manage button is clicked.
    expect(mount.querySelector('.workspace-picker__manage-popover')).toBeNull();

    const manageButton = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__manage-button')
    );
    expect(manageButton).not.toBeNull();
    manageButton.click();
    await Promise.resolve();

    const checkboxes = Array.from(
      mount.querySelectorAll(
        '.workspace-picker__manage-popover input[type="checkbox"]'
      )
    ).map((el) => /** @type {HTMLInputElement} */ (el));
    expect(checkboxes.length).toBe(2);
    // Checked = visible. /repo-a hidden → unchecked; /repo-b visible → checked.
    const byPath = new Map(checkboxes.map((c) => [c.value, c.checked]));
    expect(byPath.get('/repo-a')).toBe(false);
    expect(byPath.get('/repo-b')).toBe(true);
  });

  test('toggling a checkbox calls onWorkspaceVisibilityChange with the new visibility', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: { path: '/repo-b', database: '/repo-b/.beads/ui.db' },
      available: [
        { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
        { path: '/repo-b', database: '/repo-b/.beads/ui.db' }
      ],
      hidden: []
    });
    const onVisibility = vi.fn(async () => {});

    createWorkspacePicker(
      mount,
      /** @type {any} */ (store),
      vi.fn(),
      undefined,
      onVisibility
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__manage-button')
    ).click();
    await Promise.resolve();

    const repoBCheckbox = /** @type {HTMLInputElement} */ (
      mount.querySelector(
        '.workspace-picker__manage-popover input[value="/repo-b"]'
      )
    );
    // Unchecking a currently-visible workspace hides it → visible=false.
    repoBCheckbox.checked = false;
    repoBCheckbox.dispatchEvent(new Event('change', { bubbles: true }));
    await Promise.resolve();

    expect(onVisibility).toHaveBeenCalledWith('/repo-b', false);
  });

  test('popover closes on Escape', async () => {
    document.body.innerHTML = '<div id="mount"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
      available: [
        { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
        { path: '/repo-b', database: '/repo-b/.beads/ui.db' }
      ],
      hidden: []
    });

    createWorkspacePicker(mount, /** @type {any} */ (store), vi.fn());

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__manage-button')
    ).click();
    await Promise.resolve();
    expect(
      mount.querySelector('.workspace-picker__manage-popover')
    ).not.toBeNull();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await Promise.resolve();
    expect(mount.querySelector('.workspace-picker__manage-popover')).toBeNull();
  });

  test('popover closes on outside click', async () => {
    document.body.innerHTML =
      '<div id="mount"></div><button id="outside">out</button>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('mount'));
    const store = makeStore({
      current: { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
      available: [
        { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
        { path: '/repo-b', database: '/repo-b/.beads/ui.db' }
      ],
      hidden: []
    });

    createWorkspacePicker(mount, /** @type {any} */ (store), vi.fn());

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.workspace-picker__manage-button')
    ).click();
    await Promise.resolve();
    expect(
      mount.querySelector('.workspace-picker__manage-popover')
    ).not.toBeNull();

    const outside = /** @type {HTMLElement} */ (
      document.getElementById('outside')
    );
    outside.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
    await Promise.resolve();
    expect(mount.querySelector('.workspace-picker__manage-popover')).toBeNull();
  });
});
