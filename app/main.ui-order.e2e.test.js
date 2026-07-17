import { describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';
import { createWsClient } from './ws.js';

// Mock WS client that RECORDS every sent message so we can assert the
// subscription lifecycle of the tab-independent ui-order singleton.
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

/**
 * @param {Array<[string, any]>} sent
 * @param {string} type
 * @returns {Array<[string, any]>}
 */
function ofType(sent, type) {
  return sent.filter(([t]) => t === type);
}

async function flush() {
  for (let i = 0; i < 6; i++) {
    await Promise.resolve();
  }
}

describe('ui-order subscription singleton lifecycle', () => {
  test('subscribes once at bootstrap, survives tab switches, resubscribes on workspace switch', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/board';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    // Subscribed exactly once at startup with the shared client id.
    const initial_subs = ofType(client._sent(), 'subscribe-ui-order');
    expect(initial_subs.length).toBe(1);
    expect(initial_subs[0][1]).toEqual({ id: 'ui:order' });

    // Switch Board → Worker: the tab-scoped subscription churn must NOT touch
    // the ui-order channel.
    window.location.hash = '#/worker';
    window.dispatchEvent(new Event('hashchange'));
    await flush();
    // Switch back Worker → Board.
    window.location.hash = '#/board';
    window.dispatchEvent(new Event('hashchange'));
    await flush();

    expect(ofType(client._sent(), 'unsubscribe-ui-order').length).toBe(0);
    expect(ofType(client._sent(), 'subscribe-ui-order').length).toBe(1);

    // Workspace switch: the order map is per-workspace, so the singleton must
    // tear down and re-establish.
    client._trigger('workspace-changed', {
      root_dir: '/some/other/workspace',
      db_path: '/some/other/workspace/.beads/db'
    });
    await flush();

    expect(ofType(client._sent(), 'unsubscribe-ui-order').length).toBe(1);
    expect(ofType(client._sent(), 'subscribe-ui-order').length).toBe(2);
  });
});
