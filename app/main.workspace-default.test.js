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
      <button id="display-settings-btn" type="button">Settings</button>
      <div id="header-loading" hidden></div>
    </header>
    <main id="app"></main>
  `;

  return /** @type {HTMLElement} */ (document.getElementById('app'));
}

/**
 * @param {{ workspaces: Array<{ path: string }>, current: string, hidden?: string[], list_ready?: Promise<void>, restore_ready?: Promise<void> }} shape
 */
function makeClient(shape) {
  return {
    send: vi.fn(
      async (/** @type {string} */ type, /** @type {any} */ payload) => {
        if (type === 'list-workspaces') {
          if (shape.list_ready) {
            await shape.list_ready;
          }
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
          if (shape.restore_ready) {
            await shape.restore_ready;
          }
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
  window.location.hash = '';
  window.localStorage.clear();
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

afterEach(() => {
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

describe('main workspace restore precedence', () => {
  test.each([
    [
      'worker',
      ['ready', 'blocked', 'in-progress', 'resolved', 'closed', 'deferred'],
      false
    ],
    [
      'worker',
      ['ready', 'blocked', 'in-progress', 'resolved', 'closed', 'deferred'],
      true
    ],
    ['monitor', [], true]
  ])(
    'subscribes %s once after restore (lanes=%j, settings=%s)',
    async (view, lanes, open_settings) => {
      window.location.hash = `#/${view}`;
      window.localStorage.setItem('beads-ui.workspace', '/repo-b');
      /** @type {() => void} */
      let release_list = () => {};
      /** @type {() => void} */
      let release_restore = () => {};
      const list_ready = new Promise((resolve) => {
        release_list = () => resolve(undefined);
      });
      const restore_ready = new Promise((resolve) => {
        release_restore = () => resolve(undefined);
      });
      CLIENT = makeClient({
        workspaces: [{ path: '/repo-a' }, { path: '/repo-b' }],
        current: '/repo-a',
        list_ready,
        restore_ready
      });
      const root = setupShell();

      bootstrap(root);
      await settle();
      if (open_settings) {
        document.getElementById('display-settings-btn')?.click();
        await settle();
        expect(
          document.getElementById('settings-dialog')?.hasAttribute('open')
        ).toBe(true);
      }

      expect(CLIENT.send).toHaveBeenCalledWith('list-workspaces', {});
      expect(document.getElementById(`${view}-root`)?.hidden).toBe(false);
      expect(CLIENT.send).not.toHaveBeenCalledWith(
        'subscribe-list',
        expect.anything()
      );
      expect(CLIENT.send).not.toHaveBeenCalledWith(
        'subscribe-worker-queue',
        expect.anything()
      );

      release_list();
      await vi.waitFor(() => {
        expect(CLIENT.send).toHaveBeenCalledWith('set-workspace', {
          path: '/repo-b'
        });
      });

      expect(CLIENT.send).not.toHaveBeenCalledWith(
        'subscribe-list',
        expect.anything()
      );
      expect(CLIENT.send).not.toHaveBeenCalledWith(
        'subscribe-worker-queue',
        expect.anything()
      );

      release_restore();
      await settle();

      const list_calls = CLIENT.send.mock.calls.filter(
        (/** @type {[string, any]} */ [type]) => type === 'subscribe-list'
      );
      expect(
        list_calls.map((/** @type {[string, any]} */ [, payload]) => payload.id)
      ).toEqual(lanes.map((lane) => `tab:${view}:${lane}`));
      // 구독 종류도 같은 순서로 선다 — 보류 선반의 `deferred-issues`가 워커 탭
      // 구독에 실제로 들어 있는지는 id가 아니라 이 줄이 말한다 (UI-p7s2 §3.1).
      expect(
        list_calls.map(
          (/** @type {[string, any]} */ [, payload]) => payload.type
        )
      ).toEqual(lanes.map((lane) => `${lane}-issues`));
      expect(
        CLIENT.send.mock.calls.filter(
          (/** @type {[string, any]} */ [type]) =>
            type === 'subscribe-worker-queue'
        )
      ).toHaveLength(1);
      // Board가 퇴역했으므로 어떤 진입에서도 `tab:board:*` 구독이 서지 않는다
      // (UI-p7s2 §7.1·§8).
      expect(
        list_calls.filter((/** @type {[string, any]} */ [, payload]) =>
          String(payload.id).startsWith('tab:board:')
        )
      ).toEqual([]);
    }
  );

  test('restores the saved workspace over the configured default', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-b');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
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

  test.each([null, '/repo-a'])(
    'subscribes the configured default once with saved workspace %s',
    async (saved_workspace) => {
      if (saved_workspace) {
        window.localStorage.setItem('beads-ui.workspace', saved_workspace);
      }
      /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
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
      expect(window.localStorage.getItem('beads-ui.workspace')).toBe(
        saved_workspace
      );
      expect(
        CLIENT.send.mock.calls.filter(
          (/** @type {[string, any]} */ [type]) => type === 'subscribe-list'
        )
      ).toHaveLength(6);
    }
  );

  test('removes stale saved workspace hints that are no longer available', async () => {
    window.localStorage.setItem('beads-ui.workspace', '/repo-missing');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
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
