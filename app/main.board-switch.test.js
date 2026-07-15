import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

// Mock the Board view to render a deterministic marker.
vi.mock('./views/board/index.js', () => ({
  /**
   * @param {HTMLElement} mount
   */
  createBoardView: (mount) => ({
    async load() {
      mount.innerHTML = '<div class="board-view board-root"></div>';
    },
    clear() {}
  })
}));

// Mock WS client to avoid network.
vi.mock('./ws.js', () => ({
  createWsClient: () => ({
    /**
     * @param {string} type
     */
    async send(type) {
      void type;
      return null;
    },
    on() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  })
}));

describe('board / worker visibility on view change', () => {
  test('toggles route visibility between Board and Worker', async () => {
    window.location.hash = '#/board';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();
    await Promise.resolve();

    const boardRoot = /** @type {HTMLElement} */ (
      document.getElementById('board-root')
    );
    const workerRoot = /** @type {HTMLElement} */ (
      document.getElementById('worker-root')
    );

    // Board is the default active view.
    expect(boardRoot.hidden).toBe(false);
    expect(workerRoot.hidden).toBe(true);
    expect(boardRoot.querySelector('.board-root')).not.toBeNull();

    // Navigate to Worker.
    window.location.hash = '#/worker';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await Promise.resolve();
    await Promise.resolve();
    expect(boardRoot.hidden).toBe(true);
    expect(workerRoot.hidden).toBe(false);

    // Back to Board.
    window.location.hash = '#/board';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await Promise.resolve();
    await Promise.resolve();
    expect(boardRoot.hidden).toBe(false);
    expect(workerRoot.hidden).toBe(true);
    expect(boardRoot.querySelector('.board-root')).not.toBeNull();
  });
});
