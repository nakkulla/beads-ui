import { beforeEach, describe, expect, test, vi } from 'vitest';
import { bootstrap } from './main.js';
import { createWsClient } from './ws.js';

/**
 * 모니터 탭·Worker 탭 단독 진입 배선 (UI-53es §2, UI-nprg).
 *
 * 모니터는 이제 서버 전역 `monitor-pipeline` 집계 구독 하나로 산다. Board를 한
 * 번도 거치지 않고 `#/monitor`로 바로 들어와도 화면이 그려져야 하고, 탭을 떠나면
 * 구독이 해제되어야 한다. 여기서 검증하는 것은 "구독이 나갔는가"만이 아니라 "그
 * 구독으로 들어온 데이터가 실제로 렌더되는가"다.
 */
vi.mock('./ws.js', () => {
  /** @type {Record<string, (p: any) => void>} */
  const handlers = {};
  /** @type {Set<(s: 'connecting'|'open'|'closed'|'reconnecting') => void>} */
  const conn_handlers = new Set();
  /** @type {Array<{ type: string, payload: any }>} */
  const sent = [];
  /** @type {Map<string, any>} */
  const fail_once = new Map();
  const singleton = {
    /**
     * @param {string} type
     * @param {any} payload
     */
    async send(type, payload) {
      sent.push({ type, payload });
      if (fail_once.has(type)) {
        const error = fail_once.get(type);
        fail_once.delete(type);
        throw error;
      }
      if (type === 'list-workspaces') {
        return { workspaces: [], current: null, hidden: [] };
      }
      // 레인 op의 성공 응답은 언제나 새 revision을 싣는다 (UI-j92s §4.3) —
      // 뷰는 그 값을 다음 레인 op의 `expected_revision`으로 이어 쓴다.
      if (type.startsWith('monitor-lane-')) {
        return { revision: 8 };
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
      fail_once.clear();
      conn_handlers.clear();
      for (const key of Object.keys(handlers)) {
        delete handlers[key];
      }
    },
    _clearSent() {
      sent.length = 0;
    },
    /**
     * @param {string} type
     * @param {any} error
     */
    _failOnce(type, error) {
      fail_once.set(type, error);
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

/**
 * The REAL pipeline store, with a handle on the instance `bootstrap` built.
 * `main.js` keeps it private, so this is the only way to assert what the push
 * handler actually forwarded — mocking the store's behaviour instead would test
 * the mock, not the wiring (UI-qrfo §4 전송 경로).
 */
vi.mock('./data/monitor-pipeline-store.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  /** @type {any} */
  let instance = null;
  return {
    createMonitorPipelineStore: () => {
      instance = actual.createMonitorPipelineStore();
      return instance;
    },
    __currentMonitorPipelineStore: () => instance
  };
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

/**
 * The message types the app sent.
 *
 * @param {any} client
 * @returns {string[]}
 */
function sentTypes(client) {
  return client._sent().map((/** @type {any} */ m) => m.type);
}

describe('monitor tab direct entry (UI-nprg)', () => {
  test('subscribes the aggregated pipeline instead of the issue list', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    expect(sentTypes(client)).toContain('subscribe-monitor-pipeline');
    expect(subscribedListIds(client)).not.toContain('tab:monitor:in-progress');
    // 모니터는 자신의 집계로 살아간다 — 연결 workspace의 worker 큐 구독은 Worker
    // 탭만의 것이다.
    expect(sentTypes(client)).not.toContain('subscribe-worker-queue');
  });

  test('renders a lane pane per stage from the pushed snapshot', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );
    expect(monitor_root.hidden).toBe(false);

    client._trigger('monitor-pipeline-snapshot', {
      type: 'monitor-pipeline-snapshot',
      id: 'tab:monitor:pipeline',
      workspaces: [
        {
          root_dir: '/tmp/ws-a',
          name: 'ws-a',
          queue: [{ bead_id: 'UI-wait', added_at: NOW }],
          pr_wait: [],
          done: [],
          attempts: {
            a1: {
              attempt_id: 'a1',
              bead_id: 'UI-run',
              status: 'running',
              started_at: Date.now() - 30_000,
              last_event_at: Date.now() - 2_000
            }
          },
          bead_titles: { 'UI-run': '워커 실행중' },
          pr_observations: {}
        }
      ]
    });
    await Promise.resolve();

    // 모니터는 Worker 템플릿을 그대로 쓴다 (UI-eey2 §3) — 실행중은 `.rtile`,
    // 대기는 `.worker-mini`이고 좌표는 `data-bead-id`다.
    const running = monitor_root.querySelector(
      '#monitor-running .rtile[data-bead-id="UI-run"]'
    );
    expect(running?.querySelector('.rtile__repo')?.textContent).toContain(
      'ws-a'
    );
    expect(running?.querySelector('.rtile__elapsed')).not.toBe(null);
    expect(
      monitor_root.querySelector(
        '#monitor-queue .worker-mini[data-bead-id="UI-wait"]'
      )
    ).not.toBe(null);
    // 폐기된 모니터 전용 카드 템플릿의 잔재가 없어야 한다.
    expect(monitor_root.querySelector('.mon-card')).toBe(null);
    // 마스터 자동화 토글은 UI에서 사라졌다 (서버 op는 그대로).
    expect(monitor_root.querySelector('.mon-auto-all')).toBe(null);
  });

  // 서버가 만든 workspaces_state가 store까지 도달하지 않으면 파이프라인이 빈
  // 레포의 그룹 헤더는 revision도 exec_defaults도 없이 렌더된다.
  test('keeps the pushed workspaces_state in the pipeline store', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await Promise.resolve();

    client._trigger('monitor-pipeline-snapshot', {
      type: 'monitor-pipeline-snapshot',
      id: 'tab:monitor:pipeline',
      workspaces: [],
      workspaces_state: [
        {
          root_dir: '/tmp/ws-idle',
          name: 'ws-idle',
          auto_advance: false,
          auto_merge: false,
          slots: 2,
          revision: 7,
          exec_defaults: { orchestration_model: 'opus' }
        }
      ]
    });
    await Promise.resolve();

    const store = /** @type {any} */ (
      await import('./data/monitor-pipeline-store.js')
    ).__currentMonitorPipelineStore();
    expect(store.getWorkspacesState()).toEqual([
      {
        root_dir: '/tmp/ws-idle',
        name: 'ws-idle',
        auto_advance: false,
        auto_merge: false,
        slots: 2,
        revision: 7,
        exec_defaults: { orchestration_model: 'opus' }
      }
    ]);
  });

  test('leaves the workspaces_state empty when the server omits it', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await Promise.resolve();

    client._trigger('monitor-pipeline-snapshot', {
      type: 'monitor-pipeline-snapshot',
      id: 'tab:monitor:pipeline',
      workspaces: []
    });
    await Promise.resolve();

    const store = /** @type {any} */ (
      await import('./data/monitor-pipeline-store.js')
    ).__currentMonitorPipelineStore();
    expect(store.getWorkspacesState()).toEqual([]);
  });

  test('unsubscribes the pipeline when the tab is left', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();
    client._clearSent();

    window.location.hash = '#/board';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await flush();

    expect(sentTypes(client)).toContain('unsubscribe-monitor-pipeline');
  });
});

describe('monitor 실행가능 → 연결 레인 드롭 (UI-j92s §5.5)', () => {
  // 드롭 하나가 여러 op가 되면 순서가 계약이다: 레인 멤버십을 먼저 저장하고,
  // 의존을 걸고, 그 다음 자기 레포 병렬 큐에 적재한다. 순서가 뒤집히면 적재된
  // 행이 잠깐 선행 없이 출발할 수 있다.
  test('sends the lane update, then dep-add, then worker-queue-place', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    client._trigger('monitor-pipeline-snapshot', {
      type: 'monitor-pipeline-snapshot',
      id: 'tab:monitor:pipeline',
      workspaces: [
        {
          root_dir: '/tmp/ws-a',
          name: 'ws-a',
          revision: 3,
          queue: [{ bead_id: 'UI-wait', added_at: NOW }],
          serial_lanes: [],
          pr_wait: [],
          done: [],
          runnable: [
            { bead_id: 'UI-cand', title: '후보', spec_id: 'docs/a.md' }
          ],
          attempts: {},
          bead_titles: { 'UI-wait': '대기' },
          bead_blocked_by: {},
          pr_observations: {}
        },
        {
          root_dir: '/tmp/ws-b',
          name: 'ws-b',
          revision: 1,
          queue: [{ bead_id: 'B-tail', added_at: NOW }],
          serial_lanes: [],
          pr_wait: [],
          done: [],
          runnable: [],
          attempts: {},
          bead_titles: { 'B-tail': '후속' },
          bead_blocked_by: { 'B-tail': ['UI-wait'] },
          pr_observations: {}
        }
      ],
      workspaces_state: [
        { root_dir: '/tmp/ws-a', name: 'ws-a', revision: 3, slots: 1 },
        { root_dir: '/tmp/ws-b', name: 'ws-b', revision: 1, slots: 1 }
      ],
      cross_lanes: {
        revision: 5,
        lanes: [
          {
            id: 'cl_1',
            status: 'confirmed',
            created_at: '2026-08-25T00:00:00.000Z',
            entries: [{ bead_id: 'B-tail', root_dir: '/tmp/ws-b' }]
          }
        ]
      }
    });
    await flush();

    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );
    const card = /** @type {HTMLElement} */ (
      monitor_root.querySelector(
        '#monitor-runnable .worker-card[data-bead-id="UI-cand"]'
      )
    );
    const lane = /** @type {HTMLElement} */ (
      monitor_root.querySelector('[data-drop="chain"]')
    );
    client._clearSent();
    card.dispatchEvent(
      new Event('dragstart', { bubbles: true, cancelable: true })
    );
    lane.dispatchEvent(new Event('drop', { bubbles: true, cancelable: true }));
    await flush();

    expect(
      client
        ._sent()
        .map((/** @type {any} */ m) => m.type)
        .filter((/** @type {string} */ t) => t !== 'subscribe-monitor-pipeline')
    ).toEqual(['monitor-lane-update', 'dep-add', 'worker-queue-place']);
    expect(client._sent()[0].payload).toEqual({
      lane_id: 'cl_1',
      entries: [
        { bead_id: 'B-tail', root_dir: '/tmp/ws-b' },
        { bead_id: 'UI-cand', root_dir: '/tmp/ws-a' }
      ],
      expected_revision: 5
    });
    expect(client._sent()[1].payload).toEqual({
      a: 'UI-cand',
      b: 'B-tail',
      root_dir: '/tmp/ws-a'
    });
  });

  // 레인 op의 `conflict`는 실제 전송 래퍼를 통과해야 뷰에 닿는다 (§5.5). 그
  // 오류가 `[]`로 삼켜지면 재계획 경로가 통째로 죽고, 옛 entries가 그대로 다시
  // 나가거나 아무 일도 일어나지 않는다. 재계획은 사용자가 고른 드롭 좌표는
  // 그대로 두고 그 위의 최신 멤버만 다시 읽는다 — 좌표는 §5.5가 재계산하라고
  // 열거한 것(고정 행·타 레인 소속·사이클·dep·큐)에 들어 있지 않다.
  test('re-plans on the conflict reply cross_lanes and retries once', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    client._trigger('monitor-pipeline-snapshot', {
      type: 'monitor-pipeline-snapshot',
      id: 'tab:monitor:pipeline',
      workspaces: [
        {
          root_dir: '/tmp/ws-a',
          name: 'ws-a',
          revision: 3,
          queue: [],
          serial_lanes: [],
          pr_wait: [],
          done: [],
          runnable: [
            { bead_id: 'UI-cand', title: '후보', spec_id: 'docs/a.md' }
          ],
          attempts: {},
          bead_titles: {},
          bead_blocked_by: {},
          pr_observations: {}
        },
        {
          root_dir: '/tmp/ws-b',
          name: 'ws-b',
          revision: 1,
          queue: [{ bead_id: 'B-tail', added_at: NOW }],
          serial_lanes: [],
          pr_wait: [],
          done: [],
          runnable: [],
          attempts: {},
          bead_titles: { 'B-tail': '후속' },
          bead_blocked_by: {},
          pr_observations: {}
        }
      ],
      workspaces_state: [
        { root_dir: '/tmp/ws-a', name: 'ws-a', revision: 3, slots: 1 },
        { root_dir: '/tmp/ws-b', name: 'ws-b', revision: 1, slots: 1 }
      ],
      cross_lanes: {
        revision: 5,
        lanes: [
          {
            id: 'cl_1',
            status: 'draft',
            created_at: '2026-08-25T00:00:00.000Z',
            entries: [{ bead_id: 'B-tail', root_dir: '/tmp/ws-b' }]
          }
        ]
      }
    });
    await flush();

    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );
    const card = /** @type {HTMLElement} */ (
      monitor_root.querySelector(
        '#monitor-runnable .worker-card[data-bead-id="UI-cand"]'
      )
    );
    const lane = /** @type {HTMLElement} */ (
      monitor_root.querySelector('[data-drop="chain"]')
    );
    client._clearSent();
    client._failOnce('monitor-lane-update', {
      code: 'conflict',
      message: '레인이 다른 곳에서 바뀌었습니다',
      details: {
        cross_lanes: {
          revision: 9,
          lanes: [
            {
              id: 'cl_1',
              status: 'draft',
              created_at: '2026-08-25T00:00:00.000Z',
              entries: [
                { bead_id: 'B-tail', root_dir: '/tmp/ws-b' },
                { bead_id: 'B-late', root_dir: '/tmp/ws-b' }
              ]
            }
          ]
        }
      }
    });
    card.dispatchEvent(
      new Event('dragstart', { bubbles: true, cancelable: true })
    );
    lane.dispatchEvent(new Event('drop', { bubbles: true, cancelable: true }));
    await flush();

    const lane_ops = client
      ._sent()
      .filter((/** @type {any} */ m) => m.type === 'monitor-lane-update');

    expect(lane_ops).toHaveLength(2);
    expect(lane_ops[0].payload.expected_revision).toEqual(5);
    expect(lane_ops[1].payload).toEqual({
      lane_id: 'cl_1',
      entries: [
        { bead_id: 'B-tail', root_dir: '/tmp/ws-b' },
        { bead_id: 'UI-cand', root_dir: '/tmp/ws-a' },
        { bead_id: 'B-late', root_dir: '/tmp/ws-b' }
      ],
      expected_revision: 9
    });
  });

  // 키가 없는 구서버 스냅샷은 "없는 기능"이지 "고장 난 저장소"가 아니다 (§4.4).
  test('leaves lane ops disabled when the snapshot carries no cross_lanes key', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    client._trigger('monitor-pipeline-snapshot', {
      type: 'monitor-pipeline-snapshot',
      id: 'tab:monitor:pipeline',
      workspaces: [
        {
          root_dir: '/tmp/ws-a',
          name: 'ws-a',
          revision: 3,
          queue: [{ bead_id: 'UI-wait', added_at: NOW }],
          serial_lanes: [],
          pr_wait: [],
          done: [],
          runnable: [],
          attempts: {},
          bead_titles: { 'UI-wait': '대기' },
          bead_blocked_by: {},
          pr_observations: {}
        }
      ],
      workspaces_state: [
        { root_dir: '/tmp/ws-a', name: 'ws-a', revision: 3, slots: 1 }
      ]
    });
    await flush();

    const store = /** @type {any} */ (
      await import('./data/monitor-pipeline-store.js')
    ).__currentMonitorPipelineStore();
    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );

    expect(store.crossLanes()).toBe(undefined);
    expect(monitor_root.querySelector('.mon2-clane')).toBe(null);
    expect(monitor_root.querySelector('.mon2-clane__unreadable')).toBe(null);
    expect(
      /** @type {HTMLButtonElement} */ (
        monitor_root.querySelector('.mon2-newlane')
      ).disabled
    ).toBe(true);
  });

  // envelope → store → 렌더까지 한 줄로 이어지는지 (§4.4 전달 경로).
  test('renders a stored lane the snapshot envelope carried', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    client._trigger('monitor-pipeline-snapshot', {
      type: 'monitor-pipeline-snapshot',
      id: 'tab:monitor:pipeline',
      workspaces: [
        {
          root_dir: '/tmp/ws-a',
          name: 'ws-a',
          revision: 3,
          queue: [{ bead_id: 'UI-wait', added_at: NOW }],
          serial_lanes: [],
          pr_wait: [],
          done: [],
          runnable: [],
          attempts: {},
          bead_titles: { 'UI-wait': '대기' },
          bead_blocked_by: {},
          pr_observations: {}
        }
      ],
      workspaces_state: [
        { root_dir: '/tmp/ws-a', name: 'ws-a', revision: 3, slots: 1 }
      ],
      cross_lanes: {
        revision: 5,
        lanes: [
          {
            id: 'cl_1',
            status: 'draft',
            created_at: '2026-08-25T00:00:00.000Z',
            entries: [{ bead_id: 'UI-wait', root_dir: '/tmp/ws-a' }]
          }
        ]
      }
    });
    await flush();

    const store = /** @type {any} */ (
      await import('./data/monitor-pipeline-store.js')
    ).__currentMonitorPipelineStore();
    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );

    expect(store.crossLanes()?.revision).toBe(5);
    expect(
      monitor_root
        .querySelector('.mon2-clane[data-lane-id="cl_1"] .mon2-crow')
        ?.getAttribute('data-bead-id')
    ).toBe('UI-wait');
    expect(
      /** @type {HTMLButtonElement} */ (
        monitor_root.querySelector('.mon2-newlane')
      ).disabled
    ).toBe(false);
  });
});

describe('monitor 완료 기간 select (UI-qrfo §7)', () => {
  test("persists a period change to the monitor's own localStorage key", async () => {
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await Promise.resolve();

    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );
    const select = /** @type {HTMLSelectElement} */ (
      monitor_root.querySelector('.mon-done-range')
    );

    select.value = '7d';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.monitor.done-range')).toBe('7d');
    // Worker 탭의 기간 키와는 분리되어 있다 — 이 변경이 그쪽 값을 건드리면 안
    // 된다 (§7).
    expect(window.localStorage.getItem('bdui.worker.done-range')).toBe(null);
  });

  test('restores the persisted period on a fresh mount', async () => {
    window.localStorage.setItem('bdui.monitor.done-range', '7d');
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await Promise.resolve();

    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );
    const select = /** @type {HTMLSelectElement} */ (
      monitor_root.querySelector('.mon-done-range')
    );

    expect(select.value).toBe('7d');
  });

  test('names the selected period in the 완료 lane title', async () => {
    window.localStorage.setItem('bdui.monitor.done-range', '7d');
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));
    bootstrap(root);
    await Promise.resolve();

    const monitor_root = /** @type {HTMLElement} */ (
      document.getElementById('monitor-root')
    );

    expect(
      monitor_root
        .querySelector('#monitor-done .worker-pane__title')
        ?.textContent?.trim()
    ).toContain('완료·최근 7일');
  });
});

describe('subscription lifecycle after a reconnect', () => {
  // 재접속하면 이전 socket의 unsub 클로저는 죽는다. 그 map을 그대로 두면
  // `ensure*Subscriptions`가 "이미 구독됨"으로 읽고 건너뛰어, 활성 탭이 데이터
  // 없이 얼어붙는다.
  test('re-sends the monitor pipeline subscription on the new socket', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/monitor';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    expect(sentTypes(client)).toContain('subscribe-monitor-pipeline');

    // 재접속 이후에 나간 메시지만 센다.
    client._clearSent();
    client._emitConn('reconnecting');
    client._emitConn('open');
    await flush();

    expect(sentTypes(client)).toContain('subscribe-monitor-pipeline');
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

  test('restores the Worker closed subscription after reconnect', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/worker';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    expect(subscribedListIds(client)).toContain('tab:worker:closed');

    client._clearSent();
    client._emitConn('reconnecting');
    client._emitConn('open');
    await flush();

    expect(subscribedListIds(client)).toContain('tab:worker:closed');
  });

  test('restores the Worker closed subscription after a workspace event', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/worker';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await flush();

    client._clearSent();
    client._trigger('workspace-changed', {
      root_dir: '/tmp/worker-next',
      db_path: '/tmp/worker-next/.beads/ui.db'
    });
    await flush();

    expect(subscribedListIds(client)).toContain('tab:worker:closed');
  });

  // 구독 요청이 도는 중에 탭을 떠나면 그 결과는 이미 주인이 없다. 저장해 버리면
  // 재진입이 "구독 있음"으로 착각해 영구히 건너뛴다.
  test('re-subscribes after leaving and re-entering a tab mid-request', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/board';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    // 구독 요청은 나갔지만 아직 resolve되지 않은 시점에 탭을 떠난다.
    window.location.hash = '#/worker';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await Promise.resolve();
    await Promise.resolve();

    window.location.hash = '#/board';
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    await flush();

    client._trigger('snapshot', {
      type: 'snapshot',
      id: 'tab:board:in-progress',
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
    await flush();

    expect(subscribedListIds(client)).toContain('tab:board:in-progress');
    expect(
      document.querySelector('#board-root [data-issue-id="UI-back"]')
    ).not.toBe(null);
  });
});

describe('worker tab direct entry (UI-53es §2)', () => {
  test('subscribes the child columns and renders the running tile rollup', async () => {
    const client = /** @type {any} */ (createWsClient());
    window.location.hash = '#/worker';
    document.body.innerHTML = '<main id="app"></main>';
    const root = /** @type {HTMLElement} */ (document.getElementById('app'));

    bootstrap(root);
    await Promise.resolve();

    expect(subscribedListIds(client)).toContain('tab:worker:in-progress');
    expect(subscribedListIds(client)).toContain('tab:worker:resolved');
    expect(subscribedListIds(client)).toContain('tab:worker:closed');

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
    expect(
      tile?.querySelector('.board-card__roll-current')?.textContent
    ).toContain('T2: 서버 배선');
    expect(tile?.querySelector('.rtile__child')).toBe(null);
  });
});
