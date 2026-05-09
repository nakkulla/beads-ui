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
    window.location.hash = '#/issues?issue=researchvault-w4a';
    window.localStorage.setItem('beads-ui.workspace', '/repo-b');
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
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
    window.location.hash = '#/issues?issue=UI-1';
    /** @type {any} */ (window).__BDUI_BOOTSTRAP__ = {
      label_display_policy: { visible_prefixes: ['has:', 'reviewed:'] },
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
    const select = /** @type {HTMLSelectElement} */ (
      document.querySelector('.workspace-picker__select')
    );

    select.value = '/repo-b';
    select.dispatchEvent(new Event('change'));
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
});
