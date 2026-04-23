import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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

beforeEach(() => {
  window.localStorage.clear();
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

afterEach(() => {
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

describe('main default workspace precedence', () => {
  test('does not restore a saved workspace over configured default', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-b');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
      workspace_config: { default_workspace: '/repo-a' }
    };

    CLIENT = {
      send: vi.fn(async (type, payload) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              { path: '/repo-a', database: '/repo-a/.beads/ui.db' },
              { path: '/repo-b', database: '/repo-b/.beads/ui.db' }
            ],
            current: {
              root_dir: '/repo-a',
              db_path: '/repo-a/.beads/ui.db'
            }
          };
        }
        if (type === 'set-workspace') {
          return {
            changed: true,
            workspace: {
              root_dir: payload.path,
              db_path: `${payload.path}/.beads/ui.db`
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

    expect(CLIENT.send).not.toHaveBeenCalledWith('set-workspace', {
      path: '/repo-b'
    });
    expect(window.localStorage.getItem('beads-ui.workspace')).toBe('/repo-a');
  });

  test('removes stale saved workspace hints that are no longer available', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-missing');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
      workspace_config: { default_workspace: null }
    };

    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [{ path: '/repo-a', database: '/repo-a/.beads/ui.db' }],
            current: {
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

    expect(window.localStorage.getItem('beads-ui.workspace')).toBeNull();
  });
});
