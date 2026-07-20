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

/**
 * @param {{ workspaces: Array<{ path: string }>, current: string, hidden?: string[] }} shape
 */
function makeClient(shape) {
  return {
    send: vi.fn(
      async (/** @type {string} */ type, /** @type {any} */ payload) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: shape.workspaces.map((ws) => ({
              path: ws.path,
              database: `${ws.path}/.beads/ui.db`
            })),
            current: {
              root_dir: shape.current,
              db_path: `${shape.current}/.beads/ui.db`
            },
            hidden: shape.hidden ?? []
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
      }
    ),
    on() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
}

async function settle() {
  await new Promise((resolve) => setTimeout(resolve, 0));
  await new Promise((resolve) => setTimeout(resolve, 0));
}

beforeEach(() => {
  window.localStorage.clear();
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

afterEach(() => {
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

describe('main workspace restore precedence', () => {
  test('restores the saved workspace over the configured default', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-b');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
      workspace_config: { default_workspace: '/repo-a' }
    };

    CLIENT = makeClient({
      workspaces: [{ path: '/repo-a' }, { path: '/repo-b' }],
      current: '/repo-a'
    });

    const root = setupShell();
    bootstrap(root);

    await vi.waitFor(() => {
      expect(CLIENT.send).toHaveBeenCalledWith('set-workspace', {
        path: '/repo-b'
      });
    });
    expect(window.localStorage.getItem('beads-ui.workspace')).toBe('/repo-b');
  });

  test('stays on the configured default when no saved workspace exists', async () => {
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
      workspace_config: { default_workspace: '/repo-a' }
    };

    CLIENT = makeClient({
      workspaces: [{ path: '/repo-a' }, { path: '/repo-b' }],
      current: '/repo-a'
    });

    const root = setupShell();
    bootstrap(root);

    await settle();

    expect(CLIENT.send).not.toHaveBeenCalledWith(
      'set-workspace',
      expect.anything()
    );
    expect(window.localStorage.getItem('beads-ui.workspace')).toBeNull();
  });

  test('removes stale saved workspace hints that are no longer available', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-missing');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
      workspace_config: { default_workspace: null }
    };

    CLIENT = makeClient({
      workspaces: [{ path: '/repo-a' }],
      current: '/repo-a'
    });

    const root = setupShell();
    bootstrap(root);

    await settle();

    expect(window.localStorage.getItem('beads-ui.workspace')).toBeNull();
  });

  test('removes a stale saved value even when it equals the current path', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-gone');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
      workspace_config: { default_workspace: null }
    };

    CLIENT = makeClient({
      workspaces: [{ path: '/repo-a' }],
      current: '/repo-gone'
    });

    const root = setupShell();
    bootstrap(root);

    await settle();

    expect(CLIENT.send).not.toHaveBeenCalledWith(
      'set-workspace',
      expect.anything()
    );
    expect(window.localStorage.getItem('beads-ui.workspace')).toBeNull();
  });

  test('does not restore a saved workspace that is hidden from the picker', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-b');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
      workspace_config: { default_workspace: '/repo-a' }
    };

    CLIENT = makeClient({
      workspaces: [{ path: '/repo-a' }, { path: '/repo-b' }],
      current: '/repo-a',
      hidden: ['/repo-b']
    });

    const root = setupShell();
    bootstrap(root);

    await settle();

    expect(CLIENT.send).not.toHaveBeenCalledWith(
      'set-workspace',
      expect.anything()
    );
    expect(window.localStorage.getItem('beads-ui.workspace')).toBeNull();
  });

  test('removes stale saved workspace hints when a default is configured', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-missing');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
      workspace_config: { default_workspace: '/repo-a' }
    };

    CLIENT = makeClient({
      workspaces: [{ path: '/repo-a' }],
      current: '/repo-a'
    });

    const root = setupShell();
    bootstrap(root);

    await settle();

    expect(CLIENT.send).not.toHaveBeenCalledWith(
      'set-workspace',
      expect.anything()
    );
    expect(window.localStorage.getItem('beads-ui.workspace')).toBeNull();
  });
});
