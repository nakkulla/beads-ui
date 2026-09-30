import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';

// Mock WS client before importing the app
vi.mock('./core/ws.js', () => ({
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

describe('initial view sync on reload', () => {
  test('shows the pipeline view when the legacy hash is #/worker', async () => {
    window.location.hash = '#/worker';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    const pipeline_root = /** @type {HTMLElement} */ (
      document.getElementById('pipeline-root')
    );

    // UI-dbn6 §3.1: the Worker tab is the pipeline in the 레포 scope.
    expect(document.getElementById('worker-root')).toBeNull();
    expect(pipeline_root.hidden).toBe(false);
    expect(window.location.hash).toBe('#/pipeline');
  });
});
