import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

/** @type {any} */
let CLIENT = null;

vi.mock('./core/ws.js', () => ({
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
  window.location.hash = '';
  window.localStorage.clear();
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

afterEach(() => {
  window.location.hash = '';
  window.localStorage.clear();
  delete (/** @type {any} */ (window).__BDUI_BOOTSTRAP__);
});

/**
 * @param {{ type: string, payload: any }[]} calls
 */
function findIssueDetailSubscribeIndex(calls) {
  return calls.findIndex(
    (call) =>
      call.type === 'subscribe-list' && call.payload?.type === 'issue-detail'
  );
}

/**
 * Flush queued promise continuations.
 *
 * @param {number} count
 */
async function flushPromises(count = 20) {
  for (let index = 0; index < count; index += 1) {
    await Promise.resolve();
  }
}

describe('main workspace detail race', () => {
  test('waits for saved workspace before subscribing initial detail', async () => {
    window.location.hash = '#/monitor?issue=researchvault-w4a';
    window.localStorage.setItem('beads-ui.workspace', '/repo-b');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      workspace_config: { default_workspace: null }
    };
    const calls = /** @type {{ type: string, payload: any }[]} */ ([]);
    /** @type {() => void} */
    let resolve_set_workspace = () => {};

    CLIENT = {
      send: vi.fn(async (type, payload) => {
        calls.push({ type, payload });
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
          return await new Promise((resolve) => {
            resolve_set_workspace = () => {
              resolve({
                changed: true,
                workspace: {
                  root_dir: payload.path,
                  db_path: `${payload.path}/.beads/ui.db`
                }
              });
            };
          });
        }
        if (type === 'subscribe-list') {
          return { id: payload.id, key: payload.type };
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
    await flushPromises();

    expect(findIssueDetailSubscribeIndex(calls)).toBe(-1);

    resolve_set_workspace();
    await flushPromises();

    const set_index = calls.findIndex((call) => call.type === 'set-workspace');
    const detail_index = findIssueDetailSubscribeIndex(calls);
    expect(detail_index).toBeGreaterThan(set_index);
  });

  test('keeps detail subscribed after manual workspace switch', async () => {
    window.location.hash = '#/monitor?issue=UI-1';
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      workspace_config: { default_workspace: null }
    };
    const calls = /** @type {{ type: string, payload: any }[]} */ ([]);

    CLIENT = {
      send: vi.fn(async (type, payload) => {
        calls.push({ type, payload });
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
        if (type === 'subscribe-list') {
          return { id: payload.id, key: payload.type };
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
    await flushPromises();
    // UI-dbn6 §3.2: the scope selector replaces the workspace picker.
    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-menu"]')
    ).click();
    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="scope-pick"][data-value="/repo-b"]')
    ).click();
    await flushPromises();

    const set_index = calls.findIndex((call) => call.type === 'set-workspace');
    const detail_ops = calls
      .slice(set_index + 1)
      .filter(
        (call) =>
          (call.type === 'subscribe-list' &&
            call.payload?.type === 'issue-detail') ||
          (call.type === 'unsubscribe-list' &&
            call.payload?.id === 'detail:UI-1')
      );
    expect(detail_ops.at(-1)?.type).toBe('subscribe-list');
  });

  test('reconnects to the detail root before subscribing a history-restored detail', async () => {
    window.location.hash = '#/pipeline?issue=A-1&root=%2Frepo-a';
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      workspace_config: { default_workspace: null }
    };
    const calls = /** @type {{ type: string, payload: any }[]} */ ([]);
    CLIENT = {
      send: vi.fn(async (type, payload) => {
        calls.push({ type, payload });
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
        if (type === 'subscribe-list') {
          return { id: payload.id, key: payload.type };
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
    await flushPromises();
    const before = calls.length;

    window.location.hash = '#/pipeline?issue=B-1&root=%2Frepo-b';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await flushPromises();

    const after = calls.slice(before);
    const set_index = after.findIndex(
      (call) =>
        call.type === 'set-workspace' && call.payload?.path === '/repo-b'
    );
    const detail_index = after.findIndex(
      (call) =>
        call.type === 'subscribe-list' &&
        call.payload?.type === 'issue-detail' &&
        call.payload?.params?.id === 'B-1'
    );
    expect(set_index).toBeGreaterThanOrEqual(0);
    expect(detail_index).toBeGreaterThan(set_index);
  });
});
