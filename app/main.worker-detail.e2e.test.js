import { describe, expect, test, vi } from 'vitest';
import { createWsClient } from './core/ws.js';
import { bootstrap } from './main.js';

// Mock WS client (records sends, exposes push triggering) so we can drive the
// pipeline screen and assert the shared detail overlay opens from it.
vi.mock('./core/ws.js', () => {
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
      if (type === 'set-workspace') {
        return {
          changed: false,
          workspace: {
            root_dir: payload.path,
            db_path: `${payload.path}/.beads`
          }
        };
      }
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

describe('pipeline → shared detail overlay', () => {
  test('clicking a candidate opens the detail overlay on its repo', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/pipeline';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    // UI-dbn6 §4.2: candidates arrive on the monitor pipeline channel.
    client._trigger('monitor-pipeline-snapshot', {
      type: 'monitor-pipeline-snapshot',
      id: 'tab:monitor:pipeline',
      seq: 1,
      workspaces: [
        {
          root_dir: '/repo-a',
          name: 'repo-a',
          revision: 1,
          queue: [],
          serial_lanes: [],
          pr_wait: [],
          done: [],
          attempts: {},
          runnable: [{ bead_id: 'W1', title: '후보 하나', created_at: 1 }]
        }
      ],
      workspaces_state: [
        { root_dir: '/repo-a', name: 'repo-a', revision: 1, slots: 1 }
      ]
    });
    await flush();

    const mini = /** @type {HTMLElement} */ (
      document.querySelector('#pipeline-root .pl-card[data-bead-id="W1"]')
    );
    expect(mini).not.toBeNull();

    const detail = /** @type {HTMLElement} */ (
      document.getElementById('detail-panel')
    );
    expect(detail.hidden).toBe(true);

    mini.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    // The overlay opens after the connection moves to the card's repo, and
    // the hash keeps that repo (UI-dbn6 §3.1).
    expect(detail.hidden).toBe(false);
    expect(window.location.hash).toBe('#/pipeline?issue=W1&root=%2Frepo-a');
  });
});
