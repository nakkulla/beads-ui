import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createWsClient } from './core/ws.js';
import { closedRangeSince } from './data/closed-range.js';
import { bootstrap } from './main.js';

const DAY_MS = 864e5;

// Mock WS client that RECORDS every sent message so we can assert the Closed
// subscription's `since` param and the re-subscription message sequence.
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
      if (type === 'list-workspaces') {
        return {
          workspaces: [{ path: '/repo-a', database: '/repo-a/.beads' }],
          current: { root_dir: '/repo-a', db_path: '/repo-a/.beads' },
          hidden: []
        };
      }
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
    /** Test helper: clear the recorded log between phases. */
    _reset() {
      sent.length = 0;
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
 * @param {string} id
 * @returns {number}
 */
function lastIndexOfSub(sent, type, id) {
  for (let i = sent.length - 1; i >= 0; i--) {
    const [t, p] = sent[i];
    if (t === type && p && p.id === id) {
      return i;
    }
  }
  return -1;
}

async function flush() {
  for (let i = 0; i < 8; i++) {
    await Promise.resolve();
  }
}

describe('closed-issues subscription period lifecycle', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  test('레포 range change re-subscribes its own closed store', async () => {
    const client = /** @type {any} */ (createWsClient());
    // UI-dbn6 §4.2: the closed list belongs to the 레포 scope and opens with
    // the 완료 lane.
    window.localStorage.setItem('beads-ui.scope', '/repo-a');
    window.location.hash = '#/pipeline';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    // 완료 레인은 기본 접힘이다 (UI-5ksp §3-3): 접힌 레인은 목록을 구독하지
    // 않고 기간 선택도 그리지 않는다.
    /** @type {HTMLElement} */ (
      document.querySelector('[data-op="lane-toggle"][data-lane="done"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    const initial_idx = lastIndexOfSub(
      client._sent(),
      'subscribe-list',
      'pipeline:closed'
    );
    expect(initial_idx).toBeGreaterThanOrEqual(0);
    expect(client._sent()[initial_idx][1].params).toEqual({
      since: closedRangeSince('today')
    });

    client._reset();
    const select = /** @type {HTMLSelectElement} */ (
      document.querySelector('select[data-op="done-range"]')
    );
    select.value = '7d';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    const sent = client._sent();
    const unsub_idx = lastIndexOfSub(
      sent,
      'unsubscribe-list',
      'pipeline:closed'
    );
    const resub_idx = lastIndexOfSub(sent, 'subscribe-list', 'pipeline:closed');
    expect(unsub_idx).toBeGreaterThanOrEqual(0);
    expect(resub_idx).toBeGreaterThan(unsub_idx);
    expect(sent[resub_idx][1].params.since).toBeGreaterThanOrEqual(
      Date.now() - 7 * DAY_MS - 50
    );
  });
});
