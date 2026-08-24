import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/** @type {string[]} */
let workspaces = [];
/** @type {string[]} */
let hidden = [];
/** @type {Record<string, any>} */
let snapshots = {};
let worker_sub_count = 0;
/** @type {((workspace_key: string) => void)|null} */
let refresh_listener = null;
/** @type {string[]} */
let external_refreshes = [];
/** @type {string[]} */
let invalidations = [];
/** @type {string[]} */
let kv_reads = [];
/** @type {(root: string) => Promise<any>} */
let kv_answer = async () => ({ ok: true, value: {} });

// The channel is isolated from the worker runtime: what is under test is the
// aggregation's own subscriber/push/demand behaviour, not the decoration it
// delegates. `decorateQueue` is stubbed with a MARKER so the push assertions can
// prove the payload came through the shared builder rather than a second
// assembly path.
vi.mock('./worker-handlers.js', () => ({
  /**
   * @param {string} key
   * @param {Record<string, unknown>} queue
   */
  decorateQueue: (key, queue) => ({ ...queue, via_shared_builder: true }),
  /** @param {(workspace_key: string) => void} fn */
  onWorkerSnapshotRefresh: (fn) => {
    refresh_listener = fn;
    return () => {
      refresh_listener = null;
    };
  },
  workerQueueSubscriberCount: () => worker_sub_count,
  // 스캔 게이트의 워커 채널 몫 (UI-0a2m) — 이 파일은 모니터 채널 단독 동작을
  // 검증하므로 워커 구독자는 없다.
  workerQueueSubscriberTotal: () => 0,
  workerQueueSubscribedWorkspaces: () => [],
  fanout: () => {}
}));

vi.mock('../registry-watcher.js', () => ({
  getAvailableWorkspaces: () => workspaces.map((path) => ({ path }))
}));

// The per-repo session-defaults cache (UI-eey2 §9.4) reads `bd kv` through this
// module; stubbing it keeps the channel tests free of a real bd process per push
// and makes the async fill observable.
vi.mock('./context.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    /**
     * @param {string} root
     */
    kvGetJsonAtRoot: (root) => {
      kv_reads.push(root);
      return kv_answer(root);
    }
  };
});

vi.mock('../visible-workspaces-store.js', () => ({
  sharedVisibleWorkspacesStore: () => ({ listHidden: () => hidden })
}));

vi.mock('../worker/attach.js', () => ({
  /** @param {string} root_dir */
  refreshWorkerExternalPrs: async (root_dir) => {
    external_refreshes.push(root_dir);
    return false;
  }
}));

vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    queueStore: {
      /** @param {string} key */
      snapshot: (key) => snapshots[key] || { queue: [], pr_wait: [], done: [] }
    },
    // Inert runnable cache (UI-qrfo §4): this file is about the channel's
    // subscriber/push/demand behaviour, and a real cache would put a `bd list`
    // per repo behind every subscribe.
    runnableCache: {
      runnableFor: () => [],
      refresh: () => {},
      /** @param {string} workspace */
      invalidate: (workspace) => {
        invalidations.push(workspace);
      },
      setOnFilled: () => {},
      setSubscriberCount: () => {}
    }
  })
}));

const {
  __resetMonitorPipelineForTest,
  detachMonitorPipeline,
  handleSubscribeMonitorPipeline,
  handleUnsubscribeMonitorPipeline,
  invalidateSessionDefaults,
  monitorPipelineSubscriberCount,
  pollDemandFor
} = await import('./monitor-handlers.js');
const { emitQueueChanged } = await import('../worker/queue-events.js');

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

beforeEach(() => {
  vi.useFakeTimers();
  workspaces = [WS_A];
  hidden = [];
  snapshots = {
    [WS_A]: { queue: [{ bead_id: 'A-1', added_at: 1 }], pr_wait: [], done: [] }
  };
  worker_sub_count = 0;
  refresh_listener = null;
  external_refreshes = [];
  invalidations = [];
  kv_reads = [];
  kv_answer = async () => ({ ok: true, value: {} });
  __resetMonitorPipelineForTest();
});

afterEach(() => {
  __resetMonitorPipelineForTest();
  vi.useRealTimers();
});

describe('monitor-pipeline subscription (UI-nprg)', () => {
  test('pushes an initial aggregated snapshot on subscribe', () => {
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    const pushed = ws.snapshots();
    expect(pushed).toHaveLength(1);
    expect(
      pushed[0].payload.workspaces.map((/** @type {any} */ w) => w.root_dir)
    ).toEqual([WS_A]);
  });

  test('builds the payload with the shared worker snapshot builder', () => {
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    expect(ws.snapshots()[0].payload.workspaces[0].via_shared_builder).toBe(
      true
    );
  });

  test('pushes again after a queue refresh clears the debounce', () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    refresh_listener?.(WS_A);
    refresh_listener?.(WS_A);
    vi.advanceTimersByTime(250);

    // Two events inside one window coalesce into a single extra push.
    expect(ws.snapshots()).toHaveLength(2);
  });

  // ws mutation 핸들러들은 `emitQueueChanged()`를 부르지 않고 `fanout()`만 하므로
  // (그 이벤트는 스케줄러 전용이다), 모니터에서 적재한 버드가 실행가능 캐시에
  // TTL 내내 남지 않으려면 이 경로가 무효화를 걸어야 한다.
  test('invalidates the runnable cache when a snapshot refresh moved the revision', () => {
    const ws = fakeWs();
    snapshots[WS_A] = { queue: [], pr_wait: [], done: [], revision: 3 };
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    refresh_listener?.(WS_A);
    invalidations = [];

    snapshots[WS_A] = { queue: [], pr_wait: [], done: [], revision: 4 };
    refresh_listener?.(WS_A);

    expect(invalidations).toEqual([WS_A]);
  });

  // 제목·REVISE 파킹 fill도 같은 리스너로 re-push한다 — 큐를 바꾸지 않은 그
  // 재발화까지 무효화하면 fill 한 번마다 레포별 `bd list`가 다시 돈다.
  test('leaves the runnable cache alone when the revision did not move', () => {
    const ws = fakeWs();
    snapshots[WS_A] = { queue: [], pr_wait: [], done: [], revision: 3 };
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    refresh_listener?.(WS_A);
    invalidations = [];

    refresh_listener?.(WS_A);

    expect(invalidations).toEqual([]);
  });

  test('invalidates the runnable cache when a queue event moved the revision', () => {
    const ws = fakeWs();
    snapshots[WS_A] = { queue: [], pr_wait: [], done: [], revision: 3 };
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    emitQueueChanged(WS_A);
    invalidations = [];

    snapshots[WS_A] = { queue: [], pr_wait: [], done: [], revision: 4 };
    emitQueueChanged(WS_A);

    expect(invalidations).toEqual([WS_A]);
  });

  // 세션 로그 하트비트(last_event_at fanout)도 `emitQueueChanged`로 온다 —
  // revision이 안 움직였으면 캐시는 그대로 두고 push만 나간다. 안 그러면
  // 라이브 세션이 있는 동안 몇 초마다 레포별 `bd list`가 다시 돌고 실행가능
  // 레인이 깜빡인다.
  test('skips invalidation on a heartbeat queue event but still pushes', () => {
    const ws = fakeWs();
    snapshots[WS_A] = { queue: [], pr_wait: [], done: [], revision: 3 };
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    emitQueueChanged(WS_A);
    vi.advanceTimersByTime(250);
    invalidations = [];
    const pushed_before = ws.snapshots().length;

    emitQueueChanged(WS_A);
    vi.advanceTimersByTime(250);

    expect(invalidations).toEqual([]);
    expect(ws.snapshots().length).toBe(pushed_before + 1);
  });

  test('stops pushing after unsubscribe', () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    handleUnsubscribeMonitorPipeline(/** @type {any} */ (ws), {
      id: 'req-2',
      type: 'unsubscribe-monitor-pipeline',
      payload: { id: 'm1' }
    });
    refresh_listener?.(WS_A);
    vi.advanceTimersByTime(250);

    expect(ws.snapshots()).toHaveLength(1);
    expect(monitorPipelineSubscriberCount()).toBe(0);
  });

  test('drops the subscription when the connection closes', () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    detachMonitorPipeline(/** @type {any} */ (ws));

    expect(monitorPipelineSubscriberCount()).toBe(0);
  });

  // 프로토콜상 구독 요청은 payload가 없다 — 서버 전역 구독이라 실어 보낼
  // workspace 자체가 없다.
  test('accepts a payload-less subscribe', () => {
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), {
      id: 'req-1',
      type: 'subscribe-monitor-pipeline'
    });

    expect(monitorPipelineSubscriberCount()).toBe(1);
    expect(ws.snapshots()).toHaveLength(1);
  });

  test('unsubscribes a payload-less subscription', () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), {
      id: 'req-1',
      type: 'subscribe-monitor-pipeline'
    });

    handleUnsubscribeMonitorPipeline(/** @type {any} */ (ws), {
      id: 'req-2',
      type: 'unsubscribe-monitor-pipeline'
    });

    expect(monitorPipelineSubscriberCount()).toBe(0);
  });
});

describe('monitor external PR seeding (UI-nprg)', () => {
  // 아직 아무도 스캔하지 않은 external PR만 가진 레포는 집계 자체가 비어 있다 —
  // 집계 결과로 스캔 대상을 정하면 정확히 그 레포가 영구히 스캔되지 않는다.
  test('scans a visible workspace whose pipeline is still empty', () => {
    workspaces = [WS_A, WS_B];
    snapshots = {
      [WS_A]: {
        queue: [{ bead_id: 'A-1', added_at: 1 }],
        pr_wait: [],
        done: []
      }
    };
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    expect(external_refreshes).toEqual([WS_A, WS_B]);
  });

  test('leaves a hidden workspace unscanned', () => {
    workspaces = [WS_A, WS_B];
    hidden = [WS_B];
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    expect(external_refreshes).toEqual([WS_A]);
  });
});

describe('monitor-driven PR poll demand (UI-nprg)', () => {
  test('reports no demand for a workspace nobody watches', () => {
    expect(pollDemandFor(WS_A)).toBe(0);
  });

  test('arms every visible workspace while a monitor-only client watches', () => {
    workspaces = [WS_A, WS_B];
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    expect(pollDemandFor(WS_A)).toBe(1);
    expect(pollDemandFor(WS_B)).toBe(1);
  });

  test('leaves a hidden workspace unarmed', () => {
    workspaces = [WS_A, WS_B];
    hidden = [WS_B];
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    expect(pollDemandFor(WS_B)).toBe(0);
  });

  test('sums the monitor demand onto the worker-queue subscriber count', () => {
    worker_sub_count = 2;
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));

    expect(pollDemandFor(WS_A)).toBe(3);
  });
});

describe('monitor session_defaults cache (UI-eey2 §9.4)', () => {
  test('ships an empty layer first, then pushes the filled one', async () => {
    kv_answer = async () => ({
      ok: true,
      value: { schema: 1, impl_runtime: 'codex' }
    });
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    const first = ws.snapshots()[0].payload.workspaces_state[0];
    await vi.advanceTimersByTimeAsync(250);

    expect(first.session_defaults).toEqual({});
    expect(kv_reads).toEqual([WS_A]);
    const pushed = ws.snapshots();
    expect(pushed.length).toBeGreaterThan(1);
    expect(
      pushed[pushed.length - 1].payload.workspaces_state[0].session_defaults
    ).toEqual({ impl_runtime: 'codex' });
  });

  test('does not re-read a fresh entry on the next push', async () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    await vi.advanceTimersByTimeAsync(250);
    kv_reads = [];

    refresh_listener?.(WS_A);
    await vi.advanceTimersByTimeAsync(250);

    expect(kv_reads).toEqual([]);
  });

  test('carries a warning and keeps an empty layer when the read fails', async () => {
    kv_answer = async () => ({ ok: false, error: 'db locked' });
    const ws = fakeWs();

    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    await vi.advanceTimersByTimeAsync(250);

    const pushed = ws.snapshots();
    const state = pushed[pushed.length - 1].payload.workspaces_state[0];
    expect(state.session_defaults).toEqual({});
    expect(state.session_defaults_warnings).toEqual(['db locked']);
  });

  test('ships an empty layer again once the entry expires', async () => {
    kv_answer = async () => ({
      ok: true,
      value: { schema: 1, impl_runtime: 'codex' }
    });
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    await vi.advanceTimersByTimeAsync(250);
    const filled = ws.snapshots();
    expect(
      filled[filled.length - 1].payload.workspaces_state[0].session_defaults
    ).toEqual({ impl_runtime: 'codex' });
    kv_reads = [];
    // Hang every later read so the entry cannot silently refresh itself while
    // the clock advances; the refill stays in flight and the TTL runs out.
    kv_answer = () => new Promise(() => {});

    // Past the 5-minute success TTL: the stale value must not ride along while
    // the refill is in flight (spec §9.4 cold/expired ships `{}`).
    await vi.advanceTimersByTimeAsync(5 * 60_000 + 1000);
    refresh_listener?.(WS_A);
    await vi.advanceTimersByTimeAsync(250);

    const pushed = ws.snapshots();
    expect(
      pushed[pushed.length - 1].payload.workspaces_state[0].session_defaults
    ).toEqual({});
    expect(kv_reads).toEqual([WS_A]);
  });

  test('re-reads the repo an invalidation named', async () => {
    const ws = fakeWs();
    handleSubscribeMonitorPipeline(/** @type {any} */ (ws), subscribeReq('m1'));
    await vi.advanceTimersByTimeAsync(250);
    kv_reads = [];

    invalidateSessionDefaults(WS_A);
    await vi.advanceTimersByTimeAsync(250);

    expect(kv_reads).toEqual([WS_A]);
  });
});
