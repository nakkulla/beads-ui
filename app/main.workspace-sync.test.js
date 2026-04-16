import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

/** @type {any} */
let CLIENT = null;

vi.mock('./ws.js', () => ({
  createWsClient: () => CLIENT
}));

function setupShell() {
  document.body.innerHTML = `
    <header>
      <div id="workspace-picker"></div>
      <nav id="top-nav"></nav>
      <div id="header-loading" hidden></div>
    </header>
    <main id="app"></main>
  `;

  return /** @type {HTMLElement} */ (document.getElementById('app'));
}

function makeWorkspacePayload() {
  return {
    workspaces: [
      {
        path: '/repo-a',
        database: '/repo-a/.beads/ui.db'
      }
    ],
    current: {
      root_dir: '/repo-a',
      db_path: '/repo-a/.beads/ui.db'
    }
  };
}

describe('main workspace sync', () => {
  test('sends sync-workspace and shows success toast', async () => {
    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return makeWorkspacePayload();
        }
        if (type === 'sync-workspace') {
          return {
            workspace: {
              root_dir: '/repo-a',
              db_path: '/repo-a/.beads/ui.db'
            }
          };
        }
        return null;
      }),
      on() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    const root = setupShell();
    bootstrap(root);

    await Promise.resolve();
    await Promise.resolve();

    const syncButton = /** @type {HTMLButtonElement} */ (
      document.querySelector('.workspace-picker__sync-button')
    );

    syncButton.click();
    await Promise.resolve();
    await Promise.resolve();

    expect(CLIENT.send).toHaveBeenCalledWith('sync-workspace', {});

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((toast) => (toast.textContent || '').includes('Synced repo-a'))
    ).toBe(true);
  });

  test('shows error toast when sync-workspace fails', async () => {
    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return makeWorkspacePayload();
        }
        if (type === 'sync-workspace') {
          throw new Error('boom');
        }
        return null;
      }),
      on() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    const root = setupShell();
    bootstrap(root);

    await Promise.resolve();
    await Promise.resolve();

    const syncButton = /** @type {HTMLButtonElement} */ (
      document.querySelector('.workspace-picker__sync-button')
    );

    syncButton.click();
    await Promise.resolve();
    await Promise.resolve();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((toast) => (toast.textContent || '').includes('Sync failed'))
    ).toBe(true);
  });
});
