import { beforeEach, describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';
import { createWsClient } from './ws.js';

/**
 * 모니터 탭·Worker 탭 단독 진입 배선 (UI-53es §2).
 *
 * 두 탭 모두 in_progress 이슈 스토어를 필요로 하는데, 그 구독은 원래 Board만
 * 들고 있었다 — Board를 한 번도 거치지 않고 `#/monitor`·`#/worker`로 바로
 * 들어오면 화면이 그릴 데이터 자체가 없다. 여기서 검증하는 것은 "구독이
 * 나갔는가"가 아니라 "그 구독으로 들어온 데이터가 실제로 렌더되는가"다.
 */
vi.mock('./ws.js', () => {
  /** @type {Record<string, (p: any) => void>} */
  const handlers = {};
  /** @type {Set<(s: 'connecting'|'open'|'closed'|'reconnecting') => void>} */
  const conn_handlers = new Set();
  /** @type {Array<{ type: string, payload: any }>} */
  const sent = [];
  const singleton = {
    /**
     * @param {string} type
     * @param {any} payload
     */
    async send(type, payload) {
      sent.push({ type, payload });
      if (type === 'list-workspaces') {
        return { workspaces: [], current: null, hidden: [] };
      }
      return null;
    },
    /**
     * @param {string} type
     * @param {(p: any) => void} handler
     */
    on(type, handler) {
      handlers[type] = handler;
      return () => {
        delete handlers[type];
      };
    },
    /**
     * @param {string} type
     * @param {any} payload
     */
    _trigger(type, payload) {
      if (handlers[type]) {
        handlers[type](payload);
      }
    },
    _sent() {
      return sent;
    },
    _reset() {
      sent.length = 0;
      conn_handlers.clear();
      for (const key of Object.keys(handlers)) {
        delete handlers[key];
      }
    },
    _clearSent() {
      sent.length = 0;
    },
    /**
     * @param {(s: 'connecting'|'open'|'closed'|'reconnecting') => void} fn
     */
    onConnection(fn) {
      conn_handlers.add(fn);
      return () => conn_handlers.delete(fn);
    },
    /**
     * @param {'connecting'|'open'|'closed'|'reconnecting'} state
     */
    _emitConn(state) {
      for (const fn of Array.from(conn_handlers)) {
        fn(state);
      }
    },
    close() {},
    getState() {
      return 'open';
    }
  };
  return { createWsClient: () => singleton };
});

const NOW = 1_700_000_000_000;

/**
 * Let every queued microtask (and the macrotask boundary behind it) settle —
 * `subscribeList` resolves through several of them before its `finally` clears
 * the pending guard, so a fixed number of `Promise.resolve()` hops is not a
 * reliable "subscriptions are settled" point.
 *
 * @returns {Promise<void>}
 */
function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * The `subscribe-list` client ids the app asked for.
 *
 * @param {any} client
 * @returns {string[]}
 */
function subscribedListIds(client) {
  return client
    ._sent()
    .filter((/** @type {any} */ m) => m.type === 'subscribe-list')
    .map((/** @type {any} */ m) => m.payload && m.payload.id);
}

beforeEach(() => {
  const client = /** @type {any} */ (createWsClient());
  client._reset();
  window.localStorage.clear();
});

describe('monitor tab direct entry (UI-53es)', () => {
  test('subscribes in_progress issues and renders a row for a bead with no attempt', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    expect(subscribedListIds(client)).toContain('tab:monitor:in-progress');

    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );
    expect(monitor_root.hidden).toBe(false);

    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'tab:monitor:in-progress',
      revision: 1,
      issues: [
        {
          id: 'UI-alone',
          title: '대화형 세션 진행중',
          status: 'in_progress',
          updated_at: NOW - 600_000
        }
      ]
    });
    await Promise.resolve();

    const row = monitor_root.querySelector('[data-issue-id="UI-alone"]');
    expect(row).not.toBe(null);
    // 워커 attempt가 없는 행은 '마지막 갱신 후 경과'만 싣는다.
    expect(row?.querySelector('.mon-row__since')).not.toBe(null);
    expect(row?.querySelector('.mon-row__elapsed')).toBe(null);
  });

  test('joins the running attempt heartbeat onto the row', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    expect(
      client
        ._sent()
        .some((/** @type {any} */ m) => m.type === 'subscribe-worker-queue')
    ).toBe(true);

    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'tab:monitor:in-progress',
      revision: 1,
      issues: [
        {
          id: 'UI-run',
          title: '워커 실행중',
          status: 'in_progress',
          updated_at: Date.now()
        }
      ]
    });
    client._trigger('worker-queue-snapshot', {
      type: 'worker-queue-snapshot',
      id: 'worker:queue',
      root_dir: '/tmp/ws',
      queue: {
        revision: 1,
        queue: [],
        done: [],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'UI-run',
            status: 'running',
            started_at: Date.now() - 30_000,
            last_event_at: Date.now() - 2_000
          }
        }
      }
    });
    await Promise.resolve();

    const row = document.querySelector(
      '#monitor-root [data-issue-id="UI-run"]'
    );
    expect(row?.querySelector('.mon-row__elapsed')).not.toBe(null);
    expect(
      row
        ?.querySelector('.mon-row__beat')
        ?.classList.contains('mon-row__beat--live')
    ).toBe(true);
  });
});

describe('subscription lifecycle after a reconnect', () => {
  // 재접속하면 이전 socket의 unsub 클로저는 죽는다. 그 map을 그대로 두면
  // `ensure*Subscriptions`가 "이미 구독됨"으로 읽고 건너뛰어, 활성 탭이 데이터
  // 없이 얼어붙는다.
  test('re-sends the active tab list subscription on the new socket', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    expect(subscribedListIds(client)).toContain('tab:monitor:in-progress');

    // 재접속 이후에 나간 메시지만 센다.
    client._clearSent();
    client._emitConn('reconnecting');
    client._emitConn('open');
    await flush();

    expect(subscribedListIds(client)).toContain('tab:monitor:in-progress');
  });

  test('re-sends the Board column subscriptions too', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/board';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    expect(subscribedListIds(client)).toContain('tab:board:in-progress');

    client._clearSent();
    client._emitConn('reconnecting');
    client._emitConn('open');
    await flush();

    expect(subscribedListIds(client)).toContain('tab:board:in-progress');
  });

  // 구독 요청이 도는 중에 탭을 떠나면 그 결과는 이미 주인이 없다. 저장해 버리면
  // 재진입이 "구독 있음"으로 착각해 영구히 건너뛴다.
  test('re-subscribes after leaving and re-entering a tab mid-request', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    // 구독 요청은 나갔지만 아직 resolve되지 않은 시점에 탭을 떠난다.
    window.location.hash = '#/board';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await Promise.resolve();
    await Promise.resolve();

    window.location.hash = '#/monitor';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await flush();

    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'tab:monitor:in-progress',
      revision: 1,
      issues: [
        {
          id: 'UI-back',
          title: '재진입',
          status: 'in_progress',
          updated_at: Date.now()
        }
      ]
    });
    await Promise.resolve();

    expect(
      document.querySelector('#monitor-root [data-issue-id="UI-back"]')
    ).not.toBe(null);
  });
});

describe('worker tab direct entry (UI-53es §2)', () => {
  test('subscribes in_progress issues and renders the running tile child line', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/worker';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    expect(subscribedListIds(client)).toContain('tab:worker:in-progress');

    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'tab:worker:in-progress',
      revision: 1,
      issues: [
        {
          id: 'UI-run.2',
          title: 'T2: 서버 배선',
          status: 'in_progress',
          parent: 'UI-run',
          updated_at: Date.now()
        }
      ]
    });
    client._trigger('worker-queue-snapshot', {
      type: 'worker-queue-snapshot',
      id: 'worker:queue',
      root_dir: '/tmp/ws',
      queue: {
        revision: 1,
        queue: [{ bead_id: 'UI-run', added_at: 0 }],
        done: [],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'UI-run',
            status: 'running',
            started_at: Date.now() - 30_000
          }
        }
      }
    });
    await Promise.resolve();

    const tile = document.querySelector(
      '#worker-root .rtile[data-bead-id="UI-run"]'
    );
    expect(tile?.querySelector('.rtile__child')?.textContent).toContain(
      'T2: 서버 배선'
    );
  });
});
