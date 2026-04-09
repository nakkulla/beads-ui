import { beforeEach, describe, expect, test, vi } from 'vitest';

const handlers = new Map();
const send = vi.fn(async (type) => {
  if (type === 'list-workspaces') {
    return {
      workspaces: [{ path: '/repos/new', database: '/repos/new/.beads' }],
      current: { root_dir: '/repos/new', db_path: '/repos/new/.beads' }
    };
  }
  return {};
});

vi.mock('./ws.js', () => ({
  createWsClient() {
    return {
      send,
      /**
       * @param {string} type
       * @param {(payload: unknown) => void} handler
       */
      on(type, handler) {
        handlers.set(type, handler);
        return () => handlers.delete(type);
      },
      onConnection() {
        return () => {};
      },
      close() {},
      getState() {
        return 'open';
      }
    };
  }
}));

describe('main hot discovery', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="top-nav"></div>
      <div id="header-loading"></div>
      <div id="workspace-picker"></div>
      <div id="app"></div>
    `;
    handlers.clear();
    send.mockClear();
  });

  test('reloads workspaces after workspaces-updated event', async () => {
    const { bootstrap } = await import('./main.js');
    bootstrap(/** @type {HTMLElement} */ (document.getElementById('app')));

    await Promise.resolve();
    await Promise.resolve();

    send.mockClear();
    handlers.get('workspaces-updated')?.({ count: 1 });
    await Promise.resolve();

    expect(send).toHaveBeenCalledWith('list-workspaces', {});
  });
});
