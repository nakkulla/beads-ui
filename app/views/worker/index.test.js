import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
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
});
