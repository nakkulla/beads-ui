import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from '../../data/session-log-store.js';
import { RANK_STEP } from '../../data/sort.js';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
import { createUiOrderStore } from '../../data/ui-order-store.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { createWorkerView } from './index.js';

function createTestIssueStores() {
  /** @type {Map<string, any>} */
  const stores = new Map();
  /** @type {Set<() => void>} */
  const listeners = new Set();
  /** @param {string} id */
  function getStore(id) {
    let s = stores.get(id);
    if (!s) {
      s = createSubscriptionIssueStore(id);
      stores.set(id, s);
      s.subscribe(() => {
        for (const fn of Array.from(listeners)) {
          try {
            fn();
          } catch {
            /* ignore */
          }
        }
      });
    }
    return s;
  }
  return {
    getStore,
    /** @param {string} id */
    snapshotFor(id) {
      return getStore(id).snapshot().slice();
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

/**
 * @param {any} stores
 * @param {string} key
 * @param {any[]} issues
 */
function seed(stores, key, issues) {
  stores
    .getStore(key)
    .applyPush({ type: 'snapshot', id: key, revision: 1, issues });
}

function seedCandidates() {
  const stores = createTestIssueStores();
  const now = Date.now();
  seed(stores, 'tab:worker:ready', [
    {
      id: 'RD-1',
      title: 'ready with spec',
      status: 'open',
      priority: 1,
      updated_at: now,
      metadata: { spec_id: 'SPEC-1' }
    },
    {
      id: 'RD-2',
      title: 'ready no spec',
      status: 'open',
      priority: 2,
      updated_at: now,
      metadata: {}
    }
  ]);
  seed(stores, 'tab:worker:blocked', [
    {
      id: 'BL-1',
      title: 'blocked with spec',
      status: 'open',
      priority: 1,
      updated_at: now,
      metadata: { spec_id: 'SPEC-2' },
      dependencies: ['DEP-9']
    }
  ]);
  return stores;
}

/**
 * @param {any} q
 * @returns {any}
 */
function reply(q) {
  return { applied: true, conflict: false, queue: q };
}

/**
 * @param {Partial<any>} [over]
 * @returns {any}
 */
function queueOf(over = {}) {
  return {
    revision: 1,
    auto_advance: false,
    serial: [],
    parallel: [],
    done: [],
    attempts: {},
    ...over
  };
}

/**
 * Simulate a native drag of a mini row into a target pane.
 *
 * @param {HTMLElement} mount
 * @param {string} bead_id
 * @param {string} pane_id
 */
function drag(mount, bead_id, pane_id) {
  let stored = '';
  const dt = {
    getData: () => stored,
    /** @param {string} _t @param {string} v */
    setData: (_t, v) => {
      stored = v;
    },
    effectAllowed: '',
    dropEffect: ''
  };
  const mini = /** @type {HTMLElement} */ (
    mount.querySelector(`.worker-mini[data-bead-id="${bead_id}"]`)
  );
  const ds = new Event('dragstart', { bubbles: true });
  Object.defineProperty(ds, 'dataTransfer', { value: dt });
  mini.dispatchEvent(ds);

  const pane = /** @type {HTMLElement} */ (mount.querySelector(`#${pane_id}`));
  const drop = new Event('drop', { bubbles: true, cancelable: true });
  Object.defineProperty(drop, 'dataTransfer', { value: dt });
  pane.dispatchEvent(drop);
}

async function flush() {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
  }
}

/**
 * Ready A/C + Blocked B, all spec-eligible, with explicit created_at so the
 * merged candidate lane has a deterministic effective-rank order.
 */
function seedMerged() {
  const stores = createTestIssueStores();
  seed(stores, 'tab:worker:ready', [
    {
      id: 'A',
      title: 'ready A',
      status: 'open',
      created_at: 100,
      metadata: { spec_id: 'S' }
    },
    {
      id: 'C',
      title: 'ready C',
      status: 'open',
      created_at: 300,
      metadata: { spec_id: 'S' }
    }
  ]);
  seed(stores, 'tab:worker:blocked', [
    {
      id: 'B',
      title: 'blocked B',
      status: 'open',
      created_at: 200,
      metadata: { spec_id: 'S' },
      dependencies: ['DEP-1']
    }
  ]);
  return stores;
}

/**
 * @param {HTMLElement} mount
 * @returns {string[]} Candidate lane bead ids in rendered order.
 */
function candidateOrder(mount) {
  const cand = /** @type {HTMLElement} */ (
    mount.querySelector('#worker-pane-candidate')
  );
  return Array.from(cand.querySelectorAll('.worker-mini')).map(
    (el) => /** @type {HTMLElement} */ (el).dataset.beadId || ''
  );
}

/**
 * Simulate dragging a candidate mini and dropping it ONTO another candidate
 * mini (so the drop's over-target is that row, not the pane).
 *
 * @param {HTMLElement} mount
 * @param {string} bead_id
 * @param {string} onto_bead_id
 */
function dragOnto(mount, bead_id, onto_bead_id) {
  let stored = '';
  const dt = {
    getData: () => stored,
    /**
     * @param {string} _t
     * @param {string} v
     */
    setData: (_t, v) => {
      stored = v;
    },
    effectAllowed: '',
    dropEffect: ''
  };
  const src = /** @type {HTMLElement} */ (
    mount.querySelector(`.worker-mini[data-bead-id="${bead_id}"]`)
  );
  const ds = new Event('dragstart', { bubbles: true });
  Object.defineProperty(ds, 'dataTransfer', { value: dt });
  src.dispatchEvent(ds);

  const onto = /** @type {HTMLElement} */ (
    mount.querySelector(
      `#worker-pane-candidate .worker-mini[data-bead-id="${onto_bead_id}"]`
    )
  );
  const drop = new Event('drop', { bubbles: true, cancelable: true });
  Object.defineProperty(drop, 'dataTransfer', { value: dt });
  onto.dispatchEvent(drop);
}

describe('views/worker', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  test('candidate lane renders Ready/Blocked with spec-missing + blocked reasons', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const cand = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );
    expect(cand.querySelectorAll('.worker-mini').length).toBe(3);

    const rd2 = /** @type {HTMLElement} */ (
      cand.querySelector('.worker-mini[data-bead-id="RD-2"]')
    );
    expect(rd2.querySelector('.worker-mini__reason')?.textContent).toContain(
      'spec 없음'
    );
    expect(rd2.getAttribute('draggable')).toBe('false');

    const bl1 = /** @type {HTMLElement} */ (
      cand.querySelector('.worker-mini[data-bead-id="BL-1"]')
    );
    expect(bl1.querySelector('.worker-mini__reason')?.textContent).toContain(
      '🔒 DEP-9'
    );

    const rd1 = /** @type {HTMLElement} */ (
      cand.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(rd1.getAttribute('draggable')).toBe('true');
  });

  test('dragging a candidate into Serial sends worker-queue-place with the current revision', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi
      .fn()
      .mockResolvedValue(
        reply(queueOf({ serial: [{ bead_id: 'RD-1', added_at: 0 }] }))
      );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    drag(mount, 'RD-1', 'worker-pane-serial');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
      lane: 'serial',
      index: 0,
      expected_revision: 0
    });
  });

  test('CAS conflict re-reads the returned snapshot and retries the place once', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: queueOf({ revision: 5 })
      })
      .mockResolvedValueOnce(
        reply(
          queueOf({ revision: 6, serial: [{ bead_id: 'RD-1', added_at: 0 }] })
        )
      );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    drag(mount, 'RD-1', 'worker-pane-serial');
    await flush();

    expect(transport).toHaveBeenCalledTimes(2);
    // First attempt at the stale revision 0, retry at the server's revision 5.
    expect(transport.mock.calls[0][1].expected_revision).toBe(0);
    expect(transport.mock.calls[1][1].expected_revision).toBe(5);
  });

  test('reorder within a lane sends worker-queue-reorder', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const store = createWorkerQueueStore();
    store.set(
      queueOf({
        revision: 3,
        serial: [
          { bead_id: 'A', added_at: 0 },
          { bead_id: 'B', added_at: 0 }
        ]
      })
    );
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ revision: 4 })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: store,
      transport
    });

    // Drop B onto the serial pane (append) — same lane → reorder.
    drag(mount, 'B', 'worker-pane-serial');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-reorder', {
      bead_id: 'B',
      lane: 'serial',
      to_index: 2,
      expected_revision: 3
    });
  });

  test('toggling auto-advance sends worker-queue-toggle and shows the on banner', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ auto_advance: true })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    // OFF banner shows initially.
    expect(mount.querySelector('.worker-banner--off')).not.toBeNull();

    const play = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-play')
    );
    play.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-toggle', {
      on: true,
      expected_revision: 0
    });
    expect(mount.querySelector('.worker-banner--on')).not.toBeNull();
  });

  test('admission refusals badge candidate + queued rows; verify_cmd + policy selects render (§2/§6)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        serial: [{ bead_id: 'SQ-1', added_at: 0 }],
        merge_policy: 'pr_stop',
        admission: {
          'RD-1': { reason: 'spec_review_stale', at: 1 },
          'SQ-1': { reason: 'receipt_missing_or_malformed', at: 2 }
        },
        workspace_info: { verify_cmd: null }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    // Candidate badge (queue-entry refusal).
    const rd1 = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-candidate .worker-mini[data-bead-id="RD-1"]'
      )
    );
    expect(rd1.querySelector('.worker-mini__reason')?.textContent).toContain(
      '⛔ spec_review_stale'
    );
    // Queued (serial) badge (tick/dispatch refusal).
    const sq1 = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-serial .worker-mini[data-bead-id="SQ-1"]'
      )
    );
    expect(sq1.querySelector('.worker-mini__reason')?.textContent).toContain(
      '⛔ receipt_missing_or_malformed'
    );

    // Global policy selects reflect the queue values.
    const mergeSel = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-policy-key="merge_policy"]')
    );
    expect(mergeSel.value).toBe('pr_stop');
    const driftSel = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-policy-key="drift_policy"]')
    );
    expect(driftSel.value).toBe('');

    // verify_cmd read-only display — unset shows the demotion warning.
    const vc = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-verifycmd')
    );
    expect(vc.classList.contains('worker-verifycmd--unset')).toBe(true);
    expect(vc.textContent).toContain('미설정');
  });

  test('changing a policy select sends worker-queue-set-policy with the current revision', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ revision: 3 }));
    const transport = vi
      .fn()
      .mockResolvedValue(
        reply(queueOf({ revision: 4, merge_policy: 'pr_stop' }))
      );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    const sel = /** @type {HTMLSelectElement} */ (
      mount.querySelector('select[data-policy-key="merge_policy"]')
    );
    sel.value = 'pr_stop';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-set-policy', {
      key: 'merge_policy',
      value: 'pr_stop',
      expected_revision: 3
    });
  });

  test('a configured verify_cmd renders read-only argv; a demoted running tile shows the reason', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        workspace_info: {
          verify_cmd: { cmd: ['npm', 'run', 'all'], timeout_ms: 600000 }
        },
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'RD-1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now(),
            merge_policy: 'pr_stop',
            demoted_reason: 'verify_cmd_unset'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const vc = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-verifycmd')
    );
    expect(vc.classList.contains('worker-verifycmd--unset')).toBe(false);
    expect(vc.textContent).toContain('npm run all');

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    expect(tile.textContent).toContain('pr_stop');
    expect(tile.querySelector('.rtile__demoted')?.textContent).toContain(
      'verify_cmd_unset'
    );
  });

  test('running attempts render tiles + a failed attempt raises the breaker banner', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: true,
        serial: [{ bead_id: 'S1', added_at: 0 }],
        parallel: [{ bead_id: 'P1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 5000
          },
          a2: {
            attempt_id: 'a2',
            bead_id: 'P1',
            status: 'running',
            runner: 'codex',
            model: 'gpt-5.6',
            started_at: Date.now() - 1000
          },
          a3: {
            attempt_id: 'a3',
            bead_id: 'X9',
            status: 'failed',
            repo: '/repo',
            cause: 'verify_failed:base_not_ancestor'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    // Two running tiles rendered from attempts.
    const tiles = mount.querySelectorAll('.worker-rungrid .rtile');
    expect(tiles.length).toBe(2);
    expect(mount.querySelector('.rtile[data-bead-id="S1"]')).not.toBeNull();
    // Serial vs parallel badge derived from lane membership.
    const s1badge = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__badge')
    );
    expect(s1badge.textContent?.trim()).toBe('serial');

    // Failed attempt surfaces the breaker banner.
    const breaker = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--breaker')
    );
    expect(breaker).not.toBeNull();
    expect(breaker.textContent).toContain('/repo');
  });

  test('clicking a running tile opens the transcript drawer for its attempt', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: true,
        serial: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 3000
          }
        }
      })
    );
    const sessionLogStore = createSessionLogStore();
    // A snapshot already arrived (as it would after subscribe).
    sessionLogStore.set('a1', [
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'go' }] }
      }
    ]);
    const transport = vi.fn().mockResolvedValue({ ok: true });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      sessionLogStore,
      transport
    });

    // No drawer until a tile is clicked.
    expect(mount.querySelector('.sv')).toBeNull();

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="a1"]')
    );
    tile.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // Drawer subscribes to the session log and renders.
    expect(transport).toHaveBeenCalledWith('subscribe-session-log', {
      id: 'session-log:a1',
      attempt_id: 'a1'
    });
    expect(mount.querySelector('.sv')).not.toBeNull();
    expect(mount.querySelector('.sv__id')?.textContent).toContain('a1');
    // The selected tile gets its ring.
    expect(
      mount
        .querySelector('.rtile[data-attempt-id="a1"]')
        ?.classList.contains('rtile--sel')
    ).toBe(true);
  });

  test('candidate lane merges Ready+Blocked in effective-rank order (unranked newest-first)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      uiOrderStore: createUiOrderStore(),
      transport: vi.fn()
    });

    // No manual rank yet: merged Ready(A,C)+Blocked(B) sort by -created_at, so
    // newest first — C(300), B(200), A(100). Blocked B interleaves with Ready.
    expect(candidateOrder(mount)).toEqual(['C', 'B', 'A']);
  });

  test('an explicit rank lifts a candidate above unranked ones (ranked beats unranked)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const uiOrderStore = createUiOrderStore();
    // A gets a very-negative rank → sorts to the very top; C,B stay newest-first.
    uiOrderStore.set({ revision: 1, order: { A: -1e15 } });
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      uiOrderStore,
      transport: vi.fn()
    });

    expect(candidateOrder(mount)).toEqual(['A', 'C', 'B']);
  });

  test('dragging a candidate onto another sends ui-order-set + applies optimistically', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const uiOrderStore = createUiOrderStore();
    // Deterministic starting order A(0) < B(STEP) < C(2*STEP) → A, B, C.
    uiOrderStore.set({
      revision: 4,
      order: { A: 0, B: RANK_STEP, C: 2 * RANK_STEP }
    });
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      revision: 5,
      order: { A: 0, B: RANK_STEP, C: -RANK_STEP }
    });
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      uiOrderStore,
      transport
    });

    expect(candidateOrder(mount)).toEqual(['A', 'B', 'C']);

    // Drop C onto A (move C to the top). New rank = below(A=0) - STEP.
    // The optimistic store apply is synchronous (before the awaited transport),
    // so the lane reorders before any server round-trip.
    dragOnto(mount, 'C', 'A');
    expect(uiOrderStore.get()?.order.C).toBe(-RANK_STEP);
    expect(candidateOrder(mount)).toEqual(['C', 'A', 'B']);

    await flush();
    expect(transport).toHaveBeenCalledWith('ui-order-set', {
      expected_revision: 4,
      entries: [{ bead_id: 'C', rank: -RANK_STEP }]
    });
  });

  test('an order-only push re-renders the candidate lane', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const uiOrderStore = createUiOrderStore();
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      uiOrderStore,
      transport: vi.fn()
    });

    expect(candidateOrder(mount)).toEqual(['C', 'B', 'A']);

    // A server order snapshot arrives (no issue-store push): A pinned to top.
    uiOrderStore.set({ revision: 2, order: { A: -1e15 } });

    expect(candidateOrder(mount)).toEqual(['A', 'C', 'B']);
  });

  test('clicking the ⓘ opens the detail (gotoIssue), not the transcript drawer', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        serial: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 3000
          }
        }
      })
    );
    const gotoIssue = vi.fn();
    const transport = vi.fn().mockResolvedValue({ ok: true });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport,
      gotoIssue
    });

    const info = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__info')
    );
    info.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // ⓘ routes to the shared detail panel and never opens the transcript.
    expect(gotoIssue).toHaveBeenCalledWith('S1');
    expect(transport).not.toHaveBeenCalledWith(
      'subscribe-session-log',
      expect.anything()
    );
    expect(mount.querySelector('.sv')).toBeNull();
  });

  test('clicking the tile body (not the ⓘ) still opens the transcript drawer', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        serial: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 3000
          }
        }
      })
    );
    const sessionLogStore = createSessionLogStore();
    sessionLogStore.set('a1', [
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'go' }] }
      }
    ]);
    const gotoIssue = vi.fn();
    const transport = vi.fn().mockResolvedValue({ ok: true });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      sessionLogStore,
      transport,
      gotoIssue
    });

    const title = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__title')
    );
    title.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('subscribe-session-log', {
      id: 'session-log:a1',
      attempt_id: 'a1'
    });
    expect(mount.querySelector('.sv')).not.toBeNull();
    expect(gotoIssue).not.toHaveBeenCalled();
  });
});
