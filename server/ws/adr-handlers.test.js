import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';

/** @type {string[]} */
let roots = [];

/** @type {{ root_dir: string, plan: any }[]} */
let compute_calls = [];

/** @type {Map<string, ((value: any) => void)[]>} */
let pending_computes = new Map();

/** @type {any[]} */
let watch_instances = [];

// `bd` proof (spec §8: this tab writes nothing and reads no bd): every process
// entry point is a spy, so a single accidental shell-out anywhere under the
// channel — including through `server/bd.js` — shows up as a call here.
const child_process_spy = vi.fn(() => {
  throw new Error('the ADR channel must not spawn a process');
});

vi.mock('node:child_process', () => ({
  default: {},
  exec: child_process_spy,
  execFile: child_process_spy,
  execSync: child_process_spy,
  execFileSync: child_process_spy,
  spawn: child_process_spy,
  spawnSync: child_process_spy
}));

vi.mock('../worker/foreign-blocker-status.js', () => ({
  visibleWorkspaceRoots: () => roots
}));

vi.mock('../adr/adr-signals.js', () => ({
  createAdrSignals: () => ({
    /**
     * @param {string} root_dir
     * @param {any} plan
     */
    computeWorkspace: (root_dir, plan) => {
      compute_calls.push({ root_dir, plan });
      return new Promise((resolve) => {
        const waiters = pending_computes.get(root_dir) || [];
        waiters.push(resolve);
        pending_computes.set(root_dir, waiters);
      });
    }
  })
}));

vi.mock('../adr/adr-watch.js', () => ({
  /** @param {any} options */
  createAdrWatch: (options) => {
    const instance = {
      root_dir: options.root_dir,
      onChange: options.onChange,
      poll_interval_ms: options.poll_interval_ms,
      retry_pending: /** @type {boolean|null} */ (null),
      closed: false,
      /** @param {boolean} pending */
      setRetryPending: (pending) => {
        instance.retry_pending = pending;
      },
      close: () => {
        instance.closed = true;
      },
      /** @param {any} plan */
      trigger: (plan) => Promise.resolve(options.onChange(plan))
    };
    watch_instances.push(instance);
    return instance;
  }
}));

const {
  __resetAdrForTest,
  adrSubscriberCount,
  detachAdr,
  handleSubscribeAdr,
  handleUnsubscribeAdr,
  notifyAdrVisibilityChanged
} = await import('./adr-handlers.js');

/**
 * A socket that records every frame the channel writes to it.
 */
function fakeWs() {
  /** @type {any[]} */
  const sent = [];
  return {
    sent,
    /** @param {string} raw */
    send: (raw) => {
      sent.push(JSON.parse(raw));
    }
  };
}

/**
 * @param {ReturnType<typeof fakeWs>} ws
 * @returns {any[]}
 */
function snapshots(ws) {
  return ws.sent.filter((msg) => msg.type === 'adr-snapshot');
}

/**
 * @param {ReturnType<typeof fakeWs>} ws
 * @returns {any}
 */
function lastSnapshot(ws) {
  const all = snapshots(ws);
  return all[all.length - 1]?.payload;
}

/**
 * Settle the pending computation of one workspace with a full result.
 *
 * @param {string} root_dir
 * @param {Record<string, unknown>} [overrides]
 */
async function resolveCompute(root_dir, overrides = {}) {
  const waiters = pending_computes.get(root_dir) || [];
  const resolve = waiters.shift();
  pending_computes.set(root_dir, waiters);
  if (!resolve) {
    throw new Error(`no pending compute for ${root_dir}`);
  }
  resolve({
    root_dir,
    computed_at: 1000,
    computing: false,
    env_errors: { index: null, citations: null, candidates: null },
    adr_dir_missing: false,
    current: [],
    history: [],
    frontmatter_errors: [],
    index_drift: { ok: true, detail: null },
    citations_stale: [],
    candidates: [],
    cross_citations: [],
    retry_pending: false,
    ...overrides
  });
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

/**
 * @param {string} type
 * @param {Record<string, unknown>} [payload]
 */
function req(type, payload) {
  return /** @type {any} */ ({ id: 'r-1', type, payload });
}

/**
 * @param {number} id
 * @param {string} status
 */
function adr(id, status) {
  return {
    file: `docs/adr/${String(id).padStart(4, '0')}-x.md`,
    id,
    title: 'X',
    status,
    date: '2026-01-01',
    summary: 's',
    supersedes: [],
    superseded_by: null,
    superseded_by_note: null,
    spec: null,
    bead: null
  };
}

describe('adr channel', () => {
  beforeEach(() => {
    roots = [WS_A, WS_B];
    compute_calls = [];
    pending_computes = new Map();
    watch_instances = [];
    child_process_spy.mockClear();
  });

  afterEach(() => {
    __resetAdrForTest();
  });

  test('pushes computing rows and starts a full compute on first subscribe', () => {
    const ws = fakeWs();

    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));

    const payload = lastSnapshot(ws);
    expect(payload.id).toBe('adr:snapshot');
    expect(
      payload.workspaces.map((/** @type {any} */ w) => w.root_dir)
    ).toEqual([WS_A, WS_B]);
    expect(
      payload.workspaces.every((/** @type {any} */ w) => w.computing)
    ).toBe(true);
    expect(payload.workspaces.map((/** @type {any} */ w) => w.name)).toEqual([
      'repo-a',
      'repo-b'
    ]);
    expect(compute_calls).toEqual([
      { root_dir: WS_A, plan: { full: true } },
      { root_dir: WS_B, plan: { full: true } }
    ]);
  });

  test('replies ok with the addressing id', () => {
    const ws = fakeWs();

    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));

    expect(ws.sent[0]).toMatchObject({ ok: true, payload: {} });
    expect(ws.sent[0].payload.id).toBe('adr:snapshot');
  });

  test('pushes the finished workspace and arms retry_pending', async () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));

    await resolveCompute(WS_A, {
      env_errors: {
        index: 'adr-index.py: boom',
        citations: null,
        candidates: null
      },
      retry_pending: true
    });

    const payload = lastSnapshot(ws);
    expect(payload.workspaces[0].computing).toBe(false);
    expect(payload.workspaces[0].env_errors.index).toBe('adr-index.py: boom');
    expect(payload.workspaces[1].computing).toBe(true);
    expect(watch_instances[0].retry_pending).toBe(true);
  });

  test('drops watches and cache on last unsubscribe', async () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));
    await resolveCompute(WS_A);

    handleUnsubscribeAdr(/** @type {any} */ (ws), req('unsubscribe-adr'));

    expect(adrSubscriberCount()).toBe(0);
    expect(watch_instances.map((/** @type {any} */ w) => w.closed)).toEqual([
      true,
      true
    ]);
  });

  test('keeps watches while another subscriber remains', () => {
    const ws_one = fakeWs();
    const ws_two = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws_one), req('subscribe-adr'));
    handleSubscribeAdr(/** @type {any} */ (ws_two), req('subscribe-adr'));

    handleUnsubscribeAdr(/** @type {any} */ (ws_one), req('unsubscribe-adr'));

    expect(adrSubscriberCount()).toBe(1);
    expect(watch_instances.every((/** @type {any} */ w) => w.closed)).toBe(
      false
    );
  });

  test('detaching the socket tears the channel down', () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));

    detachAdr(/** @type {any} */ (ws));

    expect(adrSubscriberCount()).toBe(0);
    expect(watch_instances.map((/** @type {any} */ w) => w.closed)).toEqual([
      true,
      true
    ]);
  });

  test('visibility change arms a new workspace and drops a hidden one', () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));
    const before = watch_instances.length;

    roots = [WS_A, '/tmp/example/repo-c'];
    notifyAdrVisibilityChanged();

    expect(watch_instances[1].closed).toBe(true);
    expect(watch_instances.length).toBe(before + 1);
    expect(watch_instances[2].root_dir).toBe('/tmp/example/repo-c');
    expect(
      lastSnapshot(ws).workspaces.map((/** @type {any} */ w) => w.root_dir)
    ).toEqual([WS_A, '/tmp/example/repo-c']);
  });

  test('visibility change is inert with no subscribers', () => {
    roots = [WS_A];

    notifyAdrVisibilityChanged();

    expect(watch_instances).toEqual([]);
    expect(compute_calls).toEqual([]);
  });

  test('joins a cross citation to the cited workspace ADR', async () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));

    await resolveCompute(WS_A, {
      cross_citations: [
        { file: 'docs/adr/0001-x.md', line: 3, repo: 'repo-b', adr: 12 }
      ]
    });
    await resolveCompute(WS_B, { current: [adr(12, 'accepted')] });

    expect(lastSnapshot(ws).workspaces[0].cross_citations[0].target).toEqual({
      root_dir: WS_B,
      status: 'accepted'
    });
  });

  test('leaves the target null for an unknown ADR number', async () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));

    await resolveCompute(WS_A, {
      cross_citations: [
        { file: 'docs/adr/0001-x.md', line: 3, repo: 'repo-b', adr: 99 }
      ]
    });
    await resolveCompute(WS_B, { current: [adr(12, 'accepted')] });

    expect(lastSnapshot(ws).workspaces[0].cross_citations[0].target).toBe(null);
  });

  test('leaves the target null for an unknown repository', async () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));

    await resolveCompute(WS_A, {
      cross_citations: [
        { file: 'docs/adr/0001-x.md', line: 3, repo: 'repo-z', adr: 12 }
      ]
    });

    expect(lastSnapshot(ws).workspaces[0].cross_citations[0].target).toBe(null);
  });

  test('re-pushes the citing workspace when the cited one updates', async () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));
    await resolveCompute(WS_A, {
      cross_citations: [
        { file: 'docs/adr/0001-x.md', line: 3, repo: 'repo-b', adr: 12 }
      ]
    });
    const computes_before = compute_calls.length;
    expect(lastSnapshot(ws).workspaces[0].cross_citations[0].target).toBe(null);

    await resolveCompute(WS_B, { history: [adr(12, 'superseded')] });

    expect(lastSnapshot(ws).workspaces[0].cross_citations[0].target).toEqual({
      root_dir: WS_B,
      status: 'superseded'
    });
    expect(compute_calls.length).toBe(computes_before);
  });

  test('flags the later workspace of a duplicate basename', async () => {
    const duplicate = '/tmp/other/repo-b';
    roots = [WS_B, duplicate];
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));

    await resolveCompute(WS_B, { current: [adr(12, 'accepted')] });
    await resolveCompute(duplicate, {
      cross_citations: [
        { file: 'docs/adr/0002-y.md', line: 1, repo: 'repo-b', adr: 12 }
      ]
    });

    const rows = lastSnapshot(ws).workspaces;
    expect(rows.map((/** @type {any} */ w) => w.name_duplicate)).toEqual([
      false,
      true
    ]);
    expect(rows[1].cross_citations[0].target.root_dir).toBe(WS_B);
  });

  test('re-subscribing on a live cache pushes the last snapshot at once', async () => {
    const first = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (first), req('subscribe-adr'));
    await resolveCompute(WS_A, { index_drift: { ok: false, detail: 'drift' } });
    const computes_before = compute_calls.length;

    const second = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (second), req('subscribe-adr'));

    expect(lastSnapshot(second).workspaces[0].index_drift).toEqual({
      ok: false,
      detail: 'drift'
    });
    expect(compute_calls.length).toBe(computes_before);
  });

  test('re-subscribing after teardown recomputes behind computing rows', async () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));
    await resolveCompute(WS_A, { index_drift: { ok: false, detail: 'drift' } });
    handleUnsubscribeAdr(/** @type {any} */ (ws), req('unsubscribe-adr'));

    const again = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (again), req('subscribe-adr'));

    expect(lastSnapshot(again).workspaces[0].computing).toBe(true);
    expect(
      compute_calls.filter((/** @type {any} */ c) => c.root_dir === WS_A).length
    ).toBe(2);

    await resolveCompute(WS_A, { index_drift: { ok: true, detail: null } });

    expect(lastSnapshot(again).workspaces[0].computing).toBe(false);
  });

  test('never spawns a process', async () => {
    const ws = fakeWs();
    handleSubscribeAdr(/** @type {any} */ (ws), req('subscribe-adr'));
    await resolveCompute(WS_A);
    notifyAdrVisibilityChanged();
    handleUnsubscribeAdr(/** @type {any} */ (ws), req('unsubscribe-adr'));

    expect(child_process_spy).not.toHaveBeenCalled();
  });
});
