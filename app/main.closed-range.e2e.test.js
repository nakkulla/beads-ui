import { beforeEach, describe, expect, test, vi } from 'vitest';
import { closedRangeSince } from './data/closed-range.js';
import { bootstrap } from './main.js';
import { createWsClient } from './ws.js';

const DAY_MS = 864e5;

// Mock WS client that RECORDS every sent message so we can assert the Closed
// subscription's `since` param and the re-subscription message sequence.
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

  test('Worker range change re-subscribes its own closed store', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/worker';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    const initial_idx = lastIndexOfSub(
      client._sent(),
      'subscribe-list',
      'tab:worker:closed'
    );
    expect(initial_idx).toBeGreaterThanOrEqual(0);
    expect(client._sent()[initial_idx][1].params).toEqual({
      since: closedRangeSince('today')
    });

    // 완료 레인은 기본 접힘이다 (UI-5ksp §3-3): 접힌 pane은 `header_control`을
    // 그리지 않으므로 범위 선택은 레인을 펼친 뒤에야 DOM에 있다.
    /** @type {HTMLElement} */ (
      document.querySelector('#worker-pane-done .worker-pane__toggle')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    client._reset();
    const select = /** @type {HTMLSelectElement} */ (
      document.querySelector('#worker-pane-done .worker-done-range')
    );
    select.value = '7d';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    const sent = client._sent();
    const unsub_idx = lastIndexOfSub(
      sent,
      'unsubscribe-list',
      'tab:worker:closed'
    );
    const resub_idx = lastIndexOfSub(
      sent,
      'subscribe-list',
      'tab:worker:closed'
    );
    expect(unsub_idx).toBeGreaterThanOrEqual(0);
    expect(resub_idx).toBeGreaterThan(unsub_idx);
    expect(sent[resub_idx][1].params.since).toBeGreaterThanOrEqual(
      Date.now() - 7 * DAY_MS - 50
    );
  });
});
