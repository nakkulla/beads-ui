import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

/**
 * The monitor's periodic runnable refresh driver (UI-qrfo §4 갱신 driver).
 *
 * TTL alone cannot keep the 실행가능 lane current: the aggregation pushes only on
 * a queue/snapshot refresh event, so while every queue is quiet there is no push
 * → no cache read → no fill, and a `spec_review` pinned by another session never
 * surfaces. These tests drive the clock with NO queue event at all, which is
 * exactly the state that fails without the driver.
 *
 * The channel is isolated from the real registry, worker runtime and config the
 * same way `server/ws/monitor-handlers.channel.test.js` isolates it.
 */

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/** @type {string[]} */
let workspaces = [];
/** @type {string[]} */
let hidden = [];
/** @type {string[]} */
let runnable_refreshes = [];
/** @type {number} */
let poll_interval_seconds = 30;

vi.mock('../ws/worker-handlers.js', () => ({
  /**
   * @param {string} key
   * @param {Record<string, unknown>} queue
   */
  decorateQueue: (key, queue) => ({ ...queue }),
  onWorkerSnapshotRefresh: () => () => {},
  workerQueueSubscriberCount: () => 0,
  // 스캔 게이트의 워커 채널 몫 (UI-0a2m) — 이 driver 테스트들은 모니터 구독만
  // 오가므로 워커 구독자는 없다.
  workerQueueSubscriberTotal: () => 0,
  workerQueueSubscribedWorkspaces: () => [],
  fanout: () => {}
}));

vi.mock('../registry-watcher.js', () => ({
  getAvailableWorkspaces: () => workspaces.map((path) => ({ path }))
}));

vi.mock('../visible-workspaces-store.js', () => ({
  sharedVisibleWorkspacesStore: () => ({ listHidden: () => hidden })
}));

vi.mock('./attach.js', () => ({
  refreshWorkerExternalPrs: async () => false
}));

vi.mock('../config.js', () => ({
  getConfig: () => ({ poll_interval_seconds })
}));

vi.mock('./runtime.js', () => ({
  getWorkerRuntime: () => ({
    queueStore: {
      snapshot: () => ({ queue: [], pr_wait: [], done: [], revision: 1 })
    },
    runnableCache: {
      /** @param {string} key */
      refresh: (key) => {
        runnable_refreshes.push(key);
      },
      runnableFor: () => [],
      invalidate: () => {},
      setOnFilled: () => {},
      setSubscriberCount: () => {}
    }
  })
}));

const {
  __resetMonitorPipelineForTest,
  createRunnableRefreshDriver,
  handleSubscribeMonitorPipeline,
  handleUnsubscribeMonitorPipeline
} = await import('../ws/monitor-handlers.js');

/**
 * A fake socket recording every frame it was sent.
 */
function fakeWs() {
  /** @type {any[]} */
  const frames = [];
  return {
    /** @param {string} raw */
    send(raw) {
      frames.push(JSON.parse(raw));
    },
    snapshots() {
      return frames.filter((f) => f.type === 'monitor-pipeline-snapshot');
    }
  };
}

/**
 * @param {string} id
 * @returns {any}
 */
function subscribeReq(id) {
  return { id: 'req-1', type: 'subscribe-monitor-pipeline', payload: { id } };
}

/**
 * @param {string} id
 * @returns {any}
 */
function unsubscribeReq(id) {
  return { id: 'req-2', type: 'unsubscribe-monitor-pipeline', payload: { id } };
}

beforeEach(() => {
  vi.useFakeTimers();
  workspaces = [WS_A, WS_B];
  hidden = [];
  runnable_refreshes = [];
  poll_interval_seconds = 30;
  __resetMonitorPipelineForTest();
});

afterEach(() => {
  __resetMonitorPipelineForTest();
  vi.useRealTimers();
});

describe('monitor runnable refresh driver (UI-qrfo §4)', () => {
  test('refills every visible workspace one poll interval after subscribe', () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    runnable_refreshes = [];

    vi.advanceTimersByTime(30_000);

    expect(runnable_refreshes).toEqual([WS_A, WS_B]);
  });

  test('pushes a snapshot on the tick with no queue event at all', () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    const before = ws.snapshots().length;

    vi.advanceTimersByTime(30_000);
    vi.advanceTimersByTime(250);

    expect(ws.snapshots().length).toBe(before + 1);
  });

  test('refills every visible workspace immediately on subscribe', () => {
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    expect(runnable_refreshes).toEqual([WS_A, WS_B]);
  });

  test('leaves a hidden workspace out of the refill', () => {
    hidden = [WS_B];
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    expect(runnable_refreshes).toEqual([WS_A]);
  });

  test('clears the timer when the last subscriber leaves', () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    vi.advanceTimersByTime(250);

    handleUnsubscribeMonitorPipeline(
      /** @type {any} */ (ws),
      unsubscribeReq('m1')
    );

    expect(vi.getTimerCount()).toBe(0);
  });

  test('stops refilling after the last subscriber leaves', () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    handleUnsubscribeMonitorPipeline(
      /** @type {any} */ (ws),
      unsubscribeReq('m1')
    );
    runnable_refreshes = [];

    vi.advanceTimersByTime(120_000);

    expect(runnable_refreshes).toEqual([]);
  });

  test('keeps ticking while a second subscriber remains', () => {
    const ws_one = fakeWs();
    const ws_two = fakeWs();
    handleSubscribeMonitorPipeline(
      /** @type {any} */ (ws_one),
      subscribeReq('m1')
    );
    handleSubscribeMonitorPipeline(
      /** @type {any} */ (ws_two),
      subscribeReq('m2')
    );
    handleUnsubscribeMonitorPipeline(
      /** @type {any} */ (ws_one),
      unsubscribeReq('m1')
    );
    runnable_refreshes = [];

    vi.advanceTimersByTime(30_000);

    expect(runnable_refreshes).toEqual([WS_A, WS_B]);
  });
});

describe('monitor runnable refresh driver gating (UI-qrfo §4)', () => {
  test('never ticks while nobody is subscribed', () => {
    /** @type {string[]} */
    const refreshed = [];
    const driver = createRunnableRefreshDriver({
      intervalSeconds: 30,
      subscriberCount: () => 0,
      listRoots: () => [WS_A],
      refresh: (root_dir) => refreshed.push(root_dir),
      onRefreshed: () => {}
    });
    driver.start();

    vi.advanceTimersByTime(120_000);

    expect(refreshed).toEqual([]);
    driver.stop();
  });

  test('arms no timer when the configured poll interval is zero', () => {
    poll_interval_seconds = 0;
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    vi.advanceTimersByTime(250);

    expect(vi.getTimerCount()).toBe(0);
  });

  test('keeps refilling on every later tick', () => {
    /** @type {string[]} */
    const refreshed = [];
    const driver = createRunnableRefreshDriver({
      intervalSeconds: 30,
      subscriberCount: () => 1,
      listRoots: () => [WS_A],
      refresh: (root_dir) => refreshed.push(root_dir),
      onRefreshed: () => {}
    });
    driver.start();

    vi.advanceTimersByTime(90_000);

    expect(refreshed).toEqual([WS_A, WS_A, WS_A]);
    driver.stop();
  });

  test('survives a workspace whose refresh throws', () => {
    /** @type {string[]} */
    const refreshed = [];
    const driver = createRunnableRefreshDriver({
      intervalSeconds: 30,
      subscriberCount: () => 1,
      listRoots: () => [WS_A, WS_B],
      refresh: (root_dir) => {
        if (root_dir === WS_A) {
          throw new Error('refresh boom');
        }
        refreshed.push(root_dir);
      },
      onRefreshed: () => {}
    });
    driver.start();

    vi.advanceTimersByTime(30_000);

    expect(refreshed).toEqual([WS_B]);
    driver.stop();
  });
});
