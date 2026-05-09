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
    workspaces: [{ path: '/repo-a', database: '/repo-a/.beads/ui.db' }],
    current: { root_dir: '/repo-a', db_path: '/repo-a/.beads/ui.db' }
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

async function setupAndClickGitPull() {
  const root = setupShell();
  bootstrap(root);
  await Promise.resolve();
  await Promise.resolve();
  const btn = /** @type {HTMLButtonElement} */ (
    document.querySelector('.workspace-picker__git-pull-button')
  );
  if (!btn) {
    throw new Error('git-pull button not rendered');
  }
  btn.click();
  await Promise.resolve();
  await Promise.resolve();
}

describe('main workspace git pull', () => {
  test('sends git-pull-workspace and shows success toast on updated', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'git-pull-workspace') {
        return {
          workspace: { root_dir: '/repo-a', db_path: '/repo-a/.beads/ui.db' },
          status: 'updated'
        };
      }
      return null;
    });

    await setupAndClickGitPull();

    expect(CLIENT.send).toHaveBeenCalledWith('git-pull-workspace', {});

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((t) => (t.textContent || '').includes('Git pulled repo-a'))
    ).toBe(true);
  });

  test('shows "Already up to date" on up_to_date status', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'git-pull-workspace') {
        return {
          workspace: { root_dir: '/repo-a' },
          status: 'up_to_date'
        };
      }
      return null;
    });

    await setupAndClickGitPull();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((t) => (t.textContent || '').includes('Already up to date'))
    ).toBe(true);
  });

  test('shows warning on stash_pop_conflict status', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'git-pull-workspace') {
        return { workspace: {}, status: 'stash_pop_conflict' };
      }
      return null;
    });

    await setupAndClickGitPull();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    const warn = toasts.find((t) =>
      (t.textContent || '').includes('stash pop conflicted')
    );
    expect(warn).toBeTruthy();
    expect(/** @type {HTMLElement} */ (warn).style.background).toBe(
      'rgb(163, 106, 0)'
    );
  });

  test('shows error on rebase_conflict reject', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'git-pull-workspace') {
        const err = /** @type {any} */ (new Error('rebase'));
        err.code = 'rebase_conflict';
        err.message = 'CONFLICT in foo';
        throw err;
      }
      return null;
    });

    await setupAndClickGitPull();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((t) =>
        (t.textContent || '').includes('Git pull conflicts — reverted')
      )
    ).toBe(true);
  });

  test('shows distinct error on rebase_conflict_abort_failed reject', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'git-pull-workspace') {
        const err = /** @type {any} */ (new Error('abort failed'));
        err.code = 'rebase_conflict_abort_failed';
        err.message = 'fatal: No rebase';
        throw err;
      }
      return null;
    });

    await setupAndClickGitPull();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((t) => (t.textContent || '').includes('mid-rebase'))
    ).toBe(true);
  });

  test('shows error on git_error reject', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'git-pull-workspace') {
        const err = /** @type {any} */ (new Error('git'));
        err.code = 'git_error';
        err.message = 'fatal: not a repo';
        throw err;
      }
      return null;
    });

    await setupAndClickGitPull();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((t) => (t.textContent || '').includes('Git pull failed'))
    ).toBe(true);
  });

  test('shows warning on busy reject', async () => {
    CLIENT = makeClient(async (type) => {
      if (type === 'list-workspaces') return makeWorkspacePayload();
      if (type === 'git-pull-workspace') {
        const err = /** @type {any} */ (new Error('busy'));
        err.code = 'busy';
        err.message = 'sync in progress';
        throw err;
      }
      return null;
    });

    await setupAndClickGitPull();

    const toasts = Array.from(document.querySelectorAll('.toast'));
    expect(
      toasts.some((t) => (t.textContent || '').includes('Git pull skipped'))
    ).toBe(true);
  });
});
