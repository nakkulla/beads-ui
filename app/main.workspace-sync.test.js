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

/**
 * @param {(type: string, payload?: unknown) => any} sendImpl
 */
function makeClient(sendImpl) {
  return {
    send: vi.fn(sendImpl),
    on() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
}

async function setupAndClickSync() {
  const root = setupShell();
  bootstrap(root);
  await Promise.resolve();
  await Promise.resolve();
  const btn = /** @type {HTMLButtonElement} */ (
    document.querySelector('.workspace-picker__sync-button')
  );
  btn.click();
  await Promise.resolve();
  await Promise.resolve();
}

describe('main workspace sync', () => {
  test('shows success toast on full pull+push success', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'sync-workspace') {
        return {
          workspace: { root_dir: '/repo-a', db_path: '/repo-a/.beads/ui.db' },
          pulled: true,
          pushed: true
        };
      }
      return null;
    });

    await setupAndClickSync();

    expect(CLIENT.send).toHaveBeenCalledWith('sync-workspace', {});

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((t) => (t.textContent || '').includes('Synced repo-a'))
    ).toBe(true);
  });

  test('shows warning toast on partial success (pull ok, push fail)', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'sync-workspace') {
        return {
          workspace: { root_dir: '/repo-a', db_path: '/repo-a/.beads/ui.db' },
          pulled: true,
          pushed: false,
          push_error: 'remote rejected'
        };
      }
      return null;
    });

    await setupAndClickSync();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    const warning = toasts.find((t) =>
      (t.textContent || '').includes('Pulled, but push failed')
    );
    expect(warning).toBeTruthy();
    expect(warning?.textContent).toContain('remote rejected');
    expect(/** @type {HTMLElement} */ (warning).style.background).toBe(
      'rgb(163, 106, 0)'
    );
  });

  test('shows warning toast on busy reject', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'sync-workspace') {
        // client.send rejects with the error object envelope
        const err = /** @type {any} */ (new Error('busy'));
        err.code = 'busy';
        err.message = 'git-pull in progress for workspace';
        throw err;
      }
      return null;
    });

    await setupAndClickSync();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    const warn = toasts.find((t) =>
      (t.textContent || '').includes('Sync skipped')
    );
    expect(warn).toBeTruthy();
    expect(/** @type {HTMLElement} */ (warn).style.background).toBe(
      'rgb(163, 106, 0)'
    );
  });

  test('shows error toast on bd_error reject', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'sync-workspace') {
        const err = /** @type {any} */ (new Error('bd_error'));
        err.code = 'bd_error';
        err.message = 'connection refused';
        throw err;
      }
      return null;
    });

    await setupAndClickSync();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((t) => (t.textContent || '').includes('Sync failed'))
    ).toBe(true);
  });
});
