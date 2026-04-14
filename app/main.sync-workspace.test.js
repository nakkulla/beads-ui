import { afterEach, describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

/** @type {any} */
let CLIENT = null;

vi.mock('./ws.js', () => ({
  createWsClient: () => CLIENT
}));

afterEach(() => {
  window.localStorage.clear();
  vi.useRealTimers();
});

function renderShell() {
  document.body.innerHTML =
    '<header id="top-nav"></header><div id="workspace-picker"></div><div id="header-loading"></div><main id="app"></main>';
  bootstrap(/** @type {HTMLElement} */ (document.getElementById('app')));
}

describe('main sync-workspace integration', () => {
  test('clicking Sync now sends sync-workspace for current workspace', async () => {
    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              {
                path: '/tmp/demo',
                database: '/tmp/demo/.beads',
                backend: 'dolt',
                can_sync: true
              }
            ],
            current: {
              root_dir: '/tmp/demo',
              db_path: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            }
          };
        }
        if (type === 'sync-workspace') {
          return {
            workspace: {
              root_dir: '/tmp/demo',
              db_path: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            },
            pulled: true
          };
        }
        return null;
      }),
      on() {
        return () => {};
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    renderShell();
    await Promise.resolve();
    await Promise.resolve();

    document.getElementById('sync-now-btn')?.click();
    await Promise.resolve();

    expect(CLIENT.send).toHaveBeenCalledWith('sync-workspace', {
      reason: 'manual',
      path: '/tmp/demo'
    });
  });

  test('workspace switch triggers one best-effort sync', async () => {
    CLIENT = {
      send: vi.fn(async (type, payload) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              {
                path: '/tmp/a',
                database: '/tmp/a/.beads',
                backend: 'dolt',
                can_sync: true
              },
              {
                path: '/tmp/b',
                database: '/tmp/b/.beads',
                backend: 'dolt',
                can_sync: true
              }
            ],
            current: {
              root_dir: '/tmp/a',
              db_path: '/tmp/a/.beads',
              backend: 'dolt',
              can_sync: true
            }
          };
        }
        if (type === 'set-workspace') {
          return {
            changed: true,
            workspace: {
              root_dir: payload.path,
              db_path: `${payload.path}/.beads`,
              backend: 'dolt',
              can_sync: true
            }
          };
        }
        if (type === 'sync-workspace') {
          return {
            workspace: {
              root_dir: payload.path || '/tmp/b',
              db_path: '/tmp/b/.beads',
              backend: 'dolt',
              can_sync: true
            },
            pulled: true
          };
        }
        return null;
      }),
      on() {
        return () => {};
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    renderShell();
    await Promise.resolve();
    await Promise.resolve();

    const picker = /** @type {HTMLSelectElement} */ (
      document.querySelector('.workspace-picker__select')
    );
    picker.value = '/tmp/b';
    picker.dispatchEvent(new Event('change'));
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

    const sync_calls = CLIENT.send.mock.calls.filter(
      ([type, payload]) =>
        type === 'sync-workspace' && payload?.reason === 'workspace-switch'
    );
    expect(sync_calls).toHaveLength(1);
    expect(sync_calls[0][1]).toEqual({
      reason: 'workspace-switch',
      path: '/tmp/b'
    });
  });

  test('auto sync interval sends sync-workspace repeatedly for current workspace', async () => {
    vi.useFakeTimers();
    window.localStorage.setItem('beads-ui.auto-sync', '30s');
    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              {
                path: '/tmp/demo',
                database: '/tmp/demo/.beads',
                backend: 'dolt',
                can_sync: true
              }
            ],
            current: {
              root_dir: '/tmp/demo',
              db_path: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            }
          };
        }
        if (type === 'sync-workspace') {
          return {
            workspace: {
              root_dir: '/tmp/demo',
              db_path: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            },
            pulled: true
          };
        }
        return null;
      }),
      on() {
        return () => {};
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    renderShell();
    await Promise.resolve();
    await Promise.resolve();

    await vi.advanceTimersByTimeAsync(30000);
    expect(CLIENT.send).toHaveBeenCalledWith('sync-workspace', {
      reason: 'auto',
      path: '/tmp/demo'
    });
  });

  test('disables Sync now while sync is in progress', async () => {
    /** @type {() => void} */
    let resolve_sync = () => {};
    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              {
                path: '/tmp/demo',
                database: '/tmp/demo/.beads',
                backend: 'dolt',
                can_sync: true
              }
            ],
            current: {
              root_dir: '/tmp/demo',
              db_path: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            }
          };
        }
        if (type === 'sync-workspace') {
          return await new Promise((resolve) => {
            resolve_sync = () =>
              resolve({
                workspace: {
                  root_dir: '/tmp/demo',
                  db_path: '/tmp/demo/.beads',
                  backend: 'dolt',
                  can_sync: true
                },
                pulled: true
              });
          });
        }
        return null;
      }),
      on() {
        return () => {};
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    renderShell();
    await Promise.resolve();
    await Promise.resolve();

    document.getElementById('sync-now-btn')?.click();
    await Promise.resolve();

    expect(
      /** @type {HTMLButtonElement} */ (document.getElementById('sync-now-btn'))
        .disabled
    ).toBe(true);

    resolve_sync();
    await Promise.resolve();
  });

  test('persists auto sync selection in localStorage', async () => {
    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              {
                path: '/tmp/demo',
                database: '/tmp/demo/.beads',
                backend: 'dolt',
                can_sync: true
              }
            ],
            current: {
              root_dir: '/tmp/demo',
              db_path: '/tmp/demo/.beads',
              backend: 'dolt',
              can_sync: true
            }
          };
        }
        return null;
      }),
      on() {
        return () => {};
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    renderShell();
    await Promise.resolve();
    await Promise.resolve();

    const select = /** @type {HTMLSelectElement} */ (
      document.getElementById('auto-sync-select')
    );
    select.value = '60s';
    select.dispatchEvent(new Event('change'));

    expect(window.localStorage.getItem('beads-ui.auto-sync')).toBe('60s');
  });

  test('disables Sync now and skips auto sync for a workspace with can_sync false', async () => {
    vi.useFakeTimers();
    window.localStorage.setItem('beads-ui.auto-sync', '30s');
    CLIENT = {
      send: vi.fn(async (type) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              {
                path: '/tmp/sqlite-only',
                database: '/tmp/sqlite-only/.beads/default.db',
                backend: 'sqlite',
                can_sync: false
              }
            ],
            current: {
              root_dir: '/tmp/sqlite-only',
              db_path: '/tmp/sqlite-only/.beads/default.db',
              backend: 'sqlite',
              can_sync: false
            }
          };
        }
        return null;
      }),
      on() {
        return () => {};
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    renderShell();
    await Promise.resolve();
    await Promise.resolve();

    expect(
      /** @type {HTMLButtonElement} */ (document.getElementById('sync-now-btn'))
        .disabled
    ).toBe(true);

    await vi.advanceTimersByTimeAsync(30000);

    const sync_calls = CLIENT.send.mock.calls.filter(
      ([type]) => type === 'sync-workspace'
    );
    expect(sync_calls).toHaveLength(0);
  });

  test('ignores sync completion for a workspace that is no longer current', async () => {
    /** @type {() => void} */
    let resolve_sync = () => {};
    CLIENT = {
      send: vi.fn(async (type, payload) => {
        if (type === 'list-workspaces') {
          return {
            workspaces: [
              {
                path: '/tmp/a',
                database: '/tmp/a/.beads',
                backend: 'dolt',
                can_sync: true
              },
              {
                path: '/tmp/b',
                database: '/tmp/b/.beads',
                backend: 'dolt',
                can_sync: true
              }
            ],
            current: {
              root_dir: '/tmp/a',
              db_path: '/tmp/a/.beads',
              backend: 'dolt',
              can_sync: true
            }
          };
        }
        if (type === 'sync-workspace') {
          return await new Promise((resolve) => {
            resolve_sync = () =>
              resolve({
                workspace: {
                  root_dir: payload.path,
                  db_path: `${payload.path}/.beads`,
                  backend: 'dolt',
                  can_sync: true
                },
                pulled: true
              });
          });
        }
        if (type === 'set-workspace') {
          return {
            changed: true,
            workspace: {
              root_dir: payload.path,
              db_path: `${payload.path}/.beads`,
              backend: 'dolt',
              can_sync: true
            }
          };
        }
        return null;
      }),
      on() {
        return () => {};
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };

    renderShell();
    await Promise.resolve();
    await Promise.resolve();

    document.getElementById('sync-now-btn')?.click();
    await Promise.resolve();

    const picker = /** @type {HTMLSelectElement} */ (
      document.querySelector('.workspace-picker__select')
    );
    picker.value = '/tmp/b';
    picker.dispatchEvent(new Event('change'));
    await Promise.resolve();
    await Promise.resolve();

    resolve_sync();
    await Promise.resolve();
    await Promise.resolve();

    const toast_texts = Array.from(document.querySelectorAll('.toast')).map(
      (node) => node.textContent || ''
    );
    expect(toast_texts.some((text) => text.includes('Synced a'))).toBe(false);
  });
});
