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

  test("initial subscription carries today's since; range change re-subscribes", async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/board';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    const today_since = closedRangeSince('today');

    bootstrap(root);
    await flush();

    // The INITIAL closed subscription already carries the stored range (today).
    const first_idx = lastIndexOfSub(
      client._sent(),
      'subscribe-list',
      'tab:board:closed'
    );
    expect(first_idx).toBeGreaterThanOrEqual(0);
    const first_payload = client._sent()[first_idx][1];
    expect(first_payload.type).toBe('closed-issues');
    expect(first_payload.params).toEqual({ since: today_since });

    // Change the period to '최근 7일' via the header dropdown.
    client._reset();
    const sel = /** @type {HTMLSelectElement} */ (
      document.querySelector('#closed-col select.board-column__closed-range')
    );
    expect(sel).toBeTruthy();
    const before = Date.now();
    sel.value = '7d';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();
    const after = Date.now();

    const sent = client._sent();
    const unsub_idx = lastIndexOfSub(
      sent,
      'unsubscribe-list',
      'tab:board:closed'
    );
    const resub_idx = lastIndexOfSub(
      sent,
      'subscribe-list',
      'tab:board:closed'
    );

    // unsubscribe MUST precede the re-subscribe (server stale-attach guard).
    expect(unsub_idx).toBeGreaterThanOrEqual(0);
    expect(resub_idx).toBeGreaterThanOrEqual(0);
    expect(unsub_idx).toBeLessThan(resub_idx);

    // The new subscription carries the 7-day since bound.
    const resub_payload = sent[resub_idx][1];
    expect(resub_payload.type).toBe('closed-issues');
    expect(typeof resub_payload.params.since).toBe('number');
    expect(resub_payload.params.since).toBeGreaterThanOrEqual(
      before - 7 * DAY_MS - 50
    );
    expect(resub_payload.params.since).toBeLessThanOrEqual(
      after - 7 * DAY_MS + 50
    );
  });

  test("range 'all' drops the since param entirely", async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/board';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    client._reset();
    const sel = /** @type {HTMLSelectElement} */ (
      document.querySelector('#closed-col select.board-column__closed-range')
    );
    sel.value = 'all';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    const sent = client._sent();
    const resub_idx = lastIndexOfSub(
      sent,
      'subscribe-list',
      'tab:board:closed'
    );
    expect(resub_idx).toBeGreaterThanOrEqual(0);
    const payload = sent[resub_idx][1];
    expect(payload.type).toBe('closed-issues');
    // No since filter for 'all'.
    expect(payload.params).toBeUndefined();
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
