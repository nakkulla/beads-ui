import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';
import { createWsClient } from './ws.js';

// Mock WS client (records sends, exposes push triggering) so we can drive the
// Worker view and assert the shared detail overlay opens from it.
vi.mock('./ws.js', () => {
  /** @type {Record<string, (p: any) => void>} */
  const handlers = {};
  /** @type {Array<[string, any]>} */
  const sent = [];
  const singleton = {
    /**
     * @param {import('./protocol.js').MessageType} type
     * @param {any} payload
     */
    async send(type, payload) {
      sent.push([String(type), payload]);
      return null;
    },
    /**
     * @param {import('./protocol.js').MessageType} type
     * @param {(p:any)=>void} handler
     */
    on(type, handler) {
      handlers[type] = handler;
      return () => {
        delete handlers[type];
      };
    },
    /**
     * @param {import('./protocol.js').MessageType} type
     * @param {any} payload
     */
    _trigger(type, payload) {
      if (handlers[type]) {
        handlers[type](payload);
      }
    },
    /** @returns {Array<[string, any]>} */
    _sent() {
      return sent;
    },
    onConnection() {
      return () => {};
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  return { createWsClient: () => singleton };
});

async function flush() {
  for (let i = 0; i < 6; i++) {
    await Promise.resolve();
  }
}

describe('worker → shared detail overlay', () => {
  test('clicking a candidate opens the detail overlay (the Worker route zeroes selected_id, so routing alone cannot)', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/worker';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    // Feed one Ready candidate into the worker subscription store.
    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'tab:worker:ready',
      revision: 1,
      issues: [{ id: 'W1', title: '후보 하나', status: 'open', created_at: 1 }]
    });
    await flush();

    const mini = /** @type {HTMLElement} */ (
      document.querySelector('#worker-root .worker-mini[data-bead-id="W1"]')
    );
    expect(mini).not.toBeNull();

    const detail = /** @type {HTMLElement} */ (
      document.getElementById('detail-panel')
    );
    expect(detail.hidden).toBe(true);

    mini.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    // The overlay must open even though the Worker route maps `?issue=` to a
    // parent selection and zeroes `selected_id`.
    expect(detail.hidden).toBe(false);
    expect(window.location.hash).toBe('#/worker');
  });
});
