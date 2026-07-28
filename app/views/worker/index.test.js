import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from '../../data/session-log-store.js';
import { RANK_STEP } from '../../data/sort.js';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
import { createUiOrderStore } from '../../data/ui-order-store.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import {
  activityBadge,
  applyCandidateFilter,
  applyCandidateSort,
  createWorkerView,
  mergeStepView
} from './index.js';

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
    slots: 2,
    queue: [],
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
    /**
     * @param {string} _t - Data type (unused by the stub).
     * @param {string} v - Payload.
     */
    setData: (_t, v) => {
      stored = v;
    },
    effectAllowed: '',
    dropEffect: ''
  };
  const mini = /** @type {HTMLElement} */ (
    mount.querySelector(
      `.worker-mini[data-bead-id="${bead_id}"], .worker-card[data-bead-id="${bead_id}"]`
    )
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
  return Array.from(cand.querySelectorAll('.worker-card')).map(
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
    mount.querySelector(`.worker-card[data-bead-id="${bead_id}"]`)
  );
  const ds = new Event('dragstart', { bubbles: true });
  Object.defineProperty(ds, 'dataTransfer', { value: dt });
  src.dispatchEvent(ds);

  const onto = /** @type {HTMLElement} */ (
    mount.querySelector(
      `#worker-pane-candidate .worker-card[data-bead-id="${onto_bead_id}"]`
    )
  );
  const drop = new Event('drop', { bubbles: true, cancelable: true });
  Object.defineProperty(drop, 'dataTransfer', { value: dt });
  onto.dispatchEvent(drop);
}

/**
 * Preseed the candidate display filter (UI-ki09). blocked rows are hidden by
 * default, so a test about blocked candidates asks for them explicitly.
 *
 * @param {Partial<{ show_blocked: boolean, spec: 'all'|'with'|'without' }>} over
 */
function presetCandidateFilter(over) {
  window.localStorage.setItem(
    'beads-ui.worker.candidate-filter',
    JSON.stringify({ show_blocked: false, spec: 'all', ...over })
  );
}

describe('views/worker', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  test('candidate lane renders Ready/Blocked with spec-missing + blocked reasons', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const cand = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );
    expect(cand.querySelectorAll('.worker-card').length).toBe(3);

    const rd2 = /** @type {HTMLElement} */ (
      cand.querySelector('.worker-card[data-bead-id="RD-2"]')
    );
    expect(rd2.querySelector('.worker-card__reason')?.textContent).toContain(
      'spec 없음'
    );
    expect(rd2.getAttribute('draggable')).toBe('false');

    const bl1 = /** @type {HTMLElement} */ (
      cand.querySelector('.worker-card[data-bead-id="BL-1"]')
    );
    expect(bl1.querySelector('.worker-card__reason')?.textContent).toContain(
      '🔒 DEP-9'
    );

    const rd1 = /** @type {HTMLElement} */ (
      cand.querySelector('.worker-card[data-bead-id="RD-1"]')
    );
    expect(rd1.getAttribute('draggable')).toBe('true');
  });

  test('clicking a card ID copies the bead id and never opens the detail', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const gotoIssue = vi.fn();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn(),
      gotoIssue
    });

    const id_el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="RD-1"] .worker-card__id')
    );
    id_el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(writeText).toHaveBeenCalledWith('RD-1');
    expect(gotoIssue).not.toHaveBeenCalled();

    // The rest of the card keeps the open-detail behavior.
    const title_el = /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-card[data-bead-id="RD-1"] .worker-card__title'
      )
    );
    title_el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(gotoIssue).toHaveBeenCalledWith('RD-1');
  });

  test('dragging a candidate into the queue sends worker-queue-place with the current revision', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi
      .fn()
      .mockResolvedValue(
        reply(queueOf({ queue: [{ bead_id: 'RD-1', added_at: 0 }] }))
      );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    drag(mount, 'RD-1', 'worker-pane-queue');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
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
          queueOf({ revision: 6, queue: [{ bead_id: 'RD-1', added_at: 0 }] })
        )
      );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    drag(mount, 'RD-1', 'worker-pane-queue');
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
        queue: [
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

    // Drop B onto the queue pane (append) — same lane → reorder.
    drag(mount, 'B', 'worker-pane-queue');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-reorder', {
      bead_id: 'B',
      to_index: 2,
      expected_revision: 3
    });
  });

  test('toggling auto-advance sends worker-queue-toggle and flips the button to pause', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ auto_advance: true })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    const play = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-play')
    );
    expect(play.textContent).toContain('▶ 자동 진행');

    play.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-toggle', {
      on: true,
      expected_revision: 0
    });
    const toggled = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-play')
    );
    expect(toggled.classList.contains('is-active')).toBe(true);
    expect(toggled.textContent).toContain('⏸ 일시정지');
  });

  test('clicking the active toggle sends worker-queue-toggle off', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ auto_advance: true, revision: 5 }));
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ auto_advance: false, revision: 6 })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    const pause = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-play')
    );
    pause.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-toggle', {
      on: false,
      expected_revision: 5
    });
  });

  test('admission refusals badge candidate + queued rows (§6)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'SQ-1', added_at: 0 }],
        admission: {
          'RD-1': { reason: 'receipt_unreachable', at: 1 },
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
        '#worker-pane-candidate .worker-card[data-bead-id="RD-1"]'
      )
    );
    expect(rd1.querySelector('.worker-card__reason')?.textContent).toContain(
      '⛔ receipt_unreachable'
    );
    // Queued row badge (tick/dispatch refusal).
    const sq1 = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-queue .worker-mini[data-bead-id="SQ-1"]'
      )
    );
    expect(sq1.querySelector('.worker-mini__reason')?.textContent).toContain(
      '⛔ receipt_missing_or_malformed'
    );
  });

  test('renders the base of a spec_missing_at_base refusal apart from the prefix', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        admission: {
          'RD-1': { reason: 'spec_missing_at_base:ilsun/dev', at: 1 }
        },
        workspace_info: { verify_cmd: null }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const rd1 = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-candidate .worker-card[data-bead-id="RD-1"]'
      )
    );

    expect(rd1.querySelector('.worker-card__reason')?.textContent).toContain(
      '⛔ spec_missing_at_base (ilsun/dev)'
    );
  });

  test('renders an admitted stale receipt as a non-blocking re-review mark (UI-dlim §3.4)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'SQ-1', added_at: 0 }],
        admission: {
          'RD-1': { reason: 'spec_review_stale', at: 1, stale: true },
          'SQ-1': { reason: 'spec_review_stale', at: 2, stale: true }
        },
        workspace_info: { verify_cmd: null }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const rd1 = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-candidate .worker-card[data-bead-id="RD-1"]'
      )
    );
    const rd1_reason = rd1.querySelector('.worker-card__reason')?.textContent;
    expect(rd1_reason).toContain('♻️ stale→재리뷰');
    expect(rd1_reason).not.toContain('⛔');
    // The bead is admitted, so the queued row reads the same way.
    expect(
      mount
        .querySelector('#worker-pane-queue .worker-mini[data-bead-id="SQ-1"]')
        ?.querySelector('.worker-mini__reason')?.textContent
    ).toContain('♻️ stale→재리뷰');
  });

  test('the control bar carries no policy selects or verify_cmd strip (worker-phase2 §2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        workspace_info: {
          verify_cmd: { cmd: ['npm', 'run', 'all'], timeout_ms: 600000 }
        }
      })
    );

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    expect(
      mount.querySelector('select[data-policy-key="merge_policy"]')
    ).toBeNull();
    expect(
      mount.querySelector('select[data-policy-key="drift_policy"]')
    ).toBeNull();
    expect(mount.querySelector('.worker-verifycmd')).toBeNull();
    // The ⚙ exec-defaults button survives.
    expect(mount.querySelector('.worker-exec-defaults-btn')).not.toBeNull();
  });

  test('renders one waiting lane, with no serial or parallel pane (worker-phase2 §3)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(mount.querySelector('#worker-pane-queue')).not.toBeNull();
    expect(mount.querySelector('#worker-pane-serial')).toBeNull();
    expect(mount.querySelector('#worker-pane-parallel')).toBeNull();
  });

  test('the slot editor renders the workspace cap with a lower bound of 1', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ workspace_info: { verify_cmd: null, slots: 4 } }));

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-slots__input')
    );
    expect(input.value).toBe('4');
    expect(input.min).toBe('1');
  });

  test('editing the slot count sends worker-queue-set-slots with the current revision', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const store = createWorkerQueueStore();
    store.set(queueOf({ revision: 3 }));
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ revision: 4, slots: 5 })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: store,
      transport
    });

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-slots__input')
    );
    input.value = '5';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-set-slots', {
      slots: 5,
      expected_revision: 3
    });
  });

  test('clamps a below-bound slot edit to 1 before sending', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const store = createWorkerQueueStore();
    store.set(queueOf({ revision: 2 }));
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ revision: 3, slots: 1 })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: store,
      transport
    });

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-slots__input')
    );
    input.value = '0';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-set-slots', {
      slots: 1,
      expected_revision: 2
    });
  });

  test('a CAS conflict retries the slot edit once against the fresh revision', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const store = createWorkerQueueStore();
    store.set(queueOf({ revision: 1 }));
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: queueOf({ revision: 8 })
      })
      .mockResolvedValueOnce(reply(queueOf({ revision: 9, slots: 3 })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: store,
      transport
    });

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-slots__input')
    );
    input.value = '3';
    input.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledTimes(2);
    expect(transport.mock.calls[0][1].expected_revision).toBe(1);
    expect(transport.mock.calls[1][1].expected_revision).toBe(8);
  });

  test('renders the four lifecycle columns in spec order (worker-phase2 §7)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf());

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const titles = Array.from(
      mount.querySelectorAll('.worker-lanes .worker-pane__title')
    ).map((el) => (el.textContent || '').trim());

    expect(titles).toEqual([
      '후보 · Board 연동',
      '대기',
      '실행 중 · 슬롯 2',
      'PR 대기',
      '완료 · 오늘 0'
    ]);
  });

  test('keeps the candidate feed as a distinct source pane, not a fifth state', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const cand = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );

    expect(cand.classList.contains('worker-pane--src')).toBe(true);
    // Enqueueing has no other entry point, so the source pane must still hand
    // out draggable rows.
    expect(
      cand
        .querySelector('.worker-card[data-bead-id="RD-1"]')
        ?.getAttribute('draggable')
    ).toBe('true');
  });

  test('each column renders only its own members', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'RD-2', added_at: 0 }],
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        done: [{ bead_id: 'BL-1', added_at: 2 }],
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'RD-2',
            status: 'running',
            runner: 'claude',
            started_at: Date.now(),
            session_id: 'sid-1'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    /** @param {string} id */
    const idsIn = (id) =>
      Array.from(
        /** @type {HTMLElement} */ (mount.querySelector(id)).querySelectorAll(
          '.worker-mini, .rtile'
        )
      ).map((el) => /** @type {HTMLElement} */ (el).dataset.beadId);

    // RD-2 has a running attempt: it renders ONLY in 실행 중, never doubled
    // into 대기 even though the queue entry survives until the attempt ends.
    expect(idsIn('#worker-pane-queue')).toEqual([]);
    expect(idsIn('#worker-pane-running')).toEqual(['RD-2']);
    expect(idsIn('#worker-pane-pr-wait')).toEqual(['RD-1']);
    expect(idsIn('#worker-pane-done')).toEqual(['BL-1']);
  });

  test('a pr_wait bead is no longer mixed into the 완료 column', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        done: [{ bead_id: 'RD-2', added_at: 2 }]
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const done_pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-done')
    );
    const row = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-pr-wait .worker-mini[data-bead-id="RD-1"]'
      )
    );

    expect(row.getAttribute('data-lane')).toBe('pr_wait');
    expect(row.getAttribute('draggable')).toBe('false');
    expect(done_pane.querySelectorAll('.worker-mini').length).toBe(1);
    expect(
      done_pane.querySelector('.worker-mini[data-bead-id="RD-1"]')
    ).toBeNull();
  });

  test('the observation columns refuse a drop instead of swallowing the drag', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn();
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    for (const pane_id of [
      'worker-pane-running',
      'worker-pane-pr-wait',
      'worker-pane-done'
    ]) {
      const pane = /** @type {HTMLElement} */ (
        mount.querySelector(`#${pane_id}`)
      );
      const over = new Event('dragover', { bubbles: true, cancelable: true });
      Object.defineProperty(over, 'dataTransfer', {
        value: { dropEffect: '' }
      });
      pane.dispatchEvent(over);

      expect(over.defaultPrevented).toBe(false);
      expect(pane.classList.contains('worker-pane--drag-over')).toBe(false);
    }
    expect(transport).not.toHaveBeenCalled();
  });

  test('running tiles render inside the 실행 중 column, not above the lanes', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'RD-1',
            status: 'running',
            runner: 'claude',
            started_at: Date.now(),
            session_id: 'sid-1'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    expect(
      mount.querySelector('#worker-pane-running .worker-rungrid .rtile')
    ).not.toBeNull();
    expect(mount.querySelector('.worker-ctrl ~ .worker-rungrid')).toBeNull();
    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('#worker-pane-running .worker-pane__count')
      ).textContent
    ).toBe('1');
  });

  test('a pr_wait bead is not offered again as a candidate', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ pr_wait: [{ bead_id: 'RD-1', added_at: 1 }] }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const cand = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );

    expect(cand.querySelector('.worker-card[data-bead-id="RD-1"]')).toBe(null);
  });

  test('a running tile shows no merge_policy or demotion chip (worker-phase2 §2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'RD-1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now(),
            // A legacy attempt record still carries the retired fields.
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

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    expect(tile).not.toBeNull();
    expect(tile.textContent).not.toContain('pr_stop');
    expect(tile.querySelector('.rtile__demoted')).toBeNull();
    expect(tile.querySelector('.rtile__meta--policy')).toBeNull();
  });

  test('running attempts render tiles + a failed attempt raises the failure banner', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: true,
        queue: [
          { bead_id: 'S1', added_at: 0 },
          { bead_id: 'P1', added_at: 0 }
        ],
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
            runner: 'claude',
            model: 'sonnet',
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
    // The lane badge is gone with the serial/parallel split (worker-phase2 §3).
    expect(
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__badge')
    ).toBeNull();

    // The failed attempt itself is the banner source — no breaker object.
    const banner = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--failure')
    );
    expect(banner).not.toBeNull();
    expect(banner.textContent).toContain('/repo');
    expect(mount.querySelector('.worker-banner--breaker')).toBeNull();
  });

  test('paused/stopped attempts raise no banner; only a leaf paused renders a tile (worker-phase1 §1)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: true,
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          paused_leaf: {
            attempt_id: 'paused_leaf',
            bead_id: 'S1',
            status: 'paused',
            repo: '/repo',
            session_id: 'sid-1'
          },
          paused_ancestor: {
            attempt_id: 'paused_ancestor',
            bead_id: 'S2',
            status: 'paused',
            repo: '/repo',
            session_id: 'sid-2'
          },
          child: {
            attempt_id: 'child',
            bead_id: 'S2',
            status: 'done',
            resumed_from: 'paused_ancestor'
          },
          discarded: {
            attempt_id: 'discarded',
            bead_id: 'S3',
            status: 'stopped',
            repo: '/repo'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    // A user pause/discard is not a failure.
    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
    // Only the LEAF paused attempt renders — the resumed ancestor is history.
    const tiles = mount.querySelectorAll('.worker-rungrid .rtile');
    expect(tiles.length).toBe(1);
    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="paused_leaf"]')
    );
    expect(tile.classList.contains('rtile--paused')).toBe(true);
    // A paused tile offers ▶ (resume) + ■ (discard), never ⏸.
    expect(tile.querySelector('.rtile__resume')).not.toBeNull();
    expect(tile.querySelector('.rtile__stop')).not.toBeNull();
    expect(tile.querySelector('.rtile__pause')).toBeNull();
  });

  test('a manual resume past the cap raises the cap badge (§2.3)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    // Two live sessions against a cap of 1: the ⏸-then-resume path the badge
    // exists for (auto-advance itself never exceeds the cap).
    queueStore.set(
      queueOf({
        queue: [
          { bead_id: 'S1', added_at: 0 },
          { bead_id: 'S2', added_at: 1 }
        ],
        workspace_info: { verify_cmd: null, slots: 1 },
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            session_id: 'sid-1',
            started_at: Date.now()
          },
          a2: {
            attempt_id: 'a2',
            bead_id: 'S2',
            status: 'running',
            session_id: 'sid-2',
            started_at: Date.now()
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    expect(mount.querySelector('.worker-overcap')).not.toBeNull();
  });

  test('exactly at the cap no badge is shown (§2.3)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    // 3 live sessions with slots=3 — exactly at the cap, not over it.
    queueStore.set(
      queueOf({
        queue: [
          { bead_id: 'S1', added_at: 0 },
          { bead_id: 'P1', added_at: 1 },
          { bead_id: 'P2', added_at: 2 }
        ],
        workspace_info: { verify_cmd: null, slots: 3 },
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            started_at: Date.now()
          },
          a2: {
            attempt_id: 'a2',
            bead_id: 'P1',
            status: 'running',
            started_at: Date.now()
          },
          a3: {
            attempt_id: 'a3',
            bead_id: 'P2',
            status: 'running',
            started_at: Date.now()
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    expect(mount.querySelector('.worker-overcap')).toBeNull();
  });

  test('a paused attempt does not count toward the cap (§2.3)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    // One running + one PAUSED against a cap of 1: paused holds no slot, so
    // the badge must stay off.
    queueStore.set(
      queueOf({
        queue: [
          { bead_id: 'S1', added_at: 0 },
          { bead_id: 'S2', added_at: 1 }
        ],
        workspace_info: { verify_cmd: null, slots: 1 },
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            started_at: Date.now()
          },
          a2: {
            attempt_id: 'a2',
            bead_id: 'S2',
            status: 'paused',
            session_id: 'sid-2'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    expect(mount.querySelector('.worker-overcap')).toBeNull();
  });

  test('the ⏸ button is disabled until the session id lands (§2.1)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: true,
        queue: [
          { bead_id: 'S1', added_at: 0 },
          { bead_id: 'P1', added_at: 0 }
        ],
        attempts: {
          no_sid: {
            attempt_id: 'no_sid',
            bead_id: 'S1',
            status: 'running',
            started_at: Date.now()
          },
          with_sid: {
            attempt_id: 'with_sid',
            bead_id: 'P1',
            status: 'running',
            session_id: 'sid-1',
            started_at: Date.now()
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const before = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="no_sid"] .rtile__pause')
    );
    expect(before.disabled).toBe(true);
    const after = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="with_sid"] .rtile__pause')
    );
    expect(after.disabled).toBe(false);
  });

  test('tile ⏸ sends worker-attempt-pause and ▶ resumes under the CAS contract', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        revision: 4,
        auto_advance: true,
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          live: {
            attempt_id: 'live',
            bead_id: 'S1',
            status: 'running',
            session_id: 'sid-1',
            started_at: Date.now()
          }
        }
      })
    );
    const transport = vi.fn().mockResolvedValue(reply(queueOf({})));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="live"] .rtile__pause')
    ).click();
    await flush();
    expect(transport).toHaveBeenCalledWith('worker-attempt-pause', {
      attempt_id: 'live'
    });

    // Re-render as paused, then resume from the tile's ▶.
    transport.mockClear();
    queueStore.set(
      queueOf({
        revision: 5,
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          live: {
            attempt_id: 'live',
            bead_id: 'S1',
            status: 'paused',
            session_id: 'sid-1'
          }
        }
      })
    );
    await flush();
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="live"] .rtile__resume')
    ).click();
    await flush();
    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'live',
      expected_revision: 5
    });
  });

  test('clicking a running tile [▤ 세션] opens the transcript drawer for its attempt', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: true,
        queue: [{ bead_id: 'S1', added_at: 0 }],
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

    // No drawer until [▤ 세션] is clicked.
    expect(mount.querySelector('.sv')).toBeNull();

    const session = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="a1"] .rtile__session')
    );
    session.dispatchEvent(new MouseEvent('click', { bubbles: true }));

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

  test('opening a running tile passes the session id into the drawer bar (§2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: true,
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            session_id: 'sid-abcdef12',
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
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      sessionLogStore,
      transport: vi.fn().mockResolvedValue({ ok: true })
    });

    const session = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="a1"] .rtile__session')
    );
    session.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const sid = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__session')
    );
    expect(sid).not.toBeNull();
    expect(sid.textContent).toContain('sid-abcd');
    expect(sid.getAttribute('title')).toBe('sid-abcdef12');
  });

  test('a late session_id snapshot updates the OPEN drawer bar (updateMeta path, §2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const attempt = {
      attempt_id: 'a1',
      bead_id: 'S1',
      status: 'running',
      runner: 'claude',
      model: 'opus',
      started_at: Date.now() - 3000
    };
    queueStore.set(
      queueOf({
        auto_advance: true,
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: { a1: { ...attempt } }
      })
    );
    const sessionLogStore = createSessionLogStore();
    sessionLogStore.set('a1', [
      {
        type: 'assistant',
        message: { content: [{ type: 'text', text: 'go' }] }
      }
    ]);
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      sessionLogStore,
      transport: vi.fn().mockResolvedValue({ ok: true })
    });

    // Drawer opened BEFORE the session id lands.
    const session = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="a1"] .rtile__session')
    );
    session.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mount.querySelector('.sv__session')).toBeNull();

    // A fresh queue snapshot arrives with session_id filled → drawer meta updated.
    queueStore.set(
      queueOf({
        auto_advance: true,
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: { a1: { ...attempt, session_id: 'sid-late99zz' } }
      })
    );

    const sid = /** @type {HTMLElement} */ (
      mount.querySelector('.sv__session')
    );
    expect(sid).not.toBeNull();
    expect(sid.getAttribute('title')).toBe('sid-late99zz');
  });

  test('candidate lane merges Ready+Blocked in effective-rank order (unranked newest-first)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });
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
    presetCandidateFilter({ show_blocked: true });
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
    presetCandidateFilter({ show_blocked: true });
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
    presetCandidateFilter({ show_blocked: true });
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

  test('clicking the tile body opens the detail (gotoIssue), not the transcript drawer', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'S1', added_at: 0 }],
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

    const title = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__title')
    );
    title.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    // The tile default routes to the shared detail panel, like every other
    // lane surface, and never opens the transcript (UI-k59y §3).
    expect(gotoIssue).toHaveBeenCalledWith('S1');
    expect(transport).not.toHaveBeenCalledWith(
      'subscribe-session-log',
      expect.anything()
    );
    expect(mount.querySelector('.sv')).toBeNull();
  });

  test('clicking a running tile ID copies the bead id and never opens the detail', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'S1', added_at: 0 }],
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
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn().mockResolvedValue({ ok: true }),
      gotoIssue
    });

    const id_el = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__id')
    );
    id_el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(writeText).toHaveBeenCalledWith('S1');
    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('clicking [▤ 세션] opens the transcript drawer, not the detail', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'S1', added_at: 0 }],
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

    const session = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__session')
    );
    session.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith('subscribe-session-log', {
      id: 'session-log:a1',
      attempt_id: 'a1'
    });
    expect(mount.querySelector('.sv')).not.toBeNull();
    expect(gotoIssue).not.toHaveBeenCalled();
  });

  /**
   * Mount a worker view with one running attempt and open its transcript
   * drawer by clicking the tile's [▤ 세션] (UI-89q5 modal overlay tests).
   *
   * @param {HTMLElement} mount
   * @returns {{ get: () => any, set: (q: any) => void, clear: () => void, subscribe: (fn: () => void) => () => void }}
   */
  function openRunningTileDrawer(mount) {
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            runner: 'claude',
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
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      sessionLogStore,
      transport: vi.fn().mockResolvedValue({ ok: true }),
      gotoIssue: vi.fn()
    });

    const session = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__session')
    );
    session.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    return queueStore;
  }

  test('reveals the drawer overlay only while a transcript is open', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    openRunningTileDrawer(mount);

    const overlay = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-drawer-overlay')
    );
    expect(overlay.hidden).toBe(false);
  });

  test('closes the transcript drawer on an overlay backdrop click', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    openRunningTileDrawer(mount);

    const backdrop = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-drawer-overlay__backdrop')
    );
    backdrop.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const overlay = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-drawer-overlay')
    );
    expect(overlay.hidden).toBe(true);
    expect(mount.querySelector('.sv')).toBeNull();
  });

  test('closes the drawer overlay when the queue store is cleared (workspace switch)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = openRunningTileDrawer(mount);

    queueStore.clear();

    const overlay = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-drawer-overlay')
    );
    expect(overlay.hidden).toBe(true);
    expect(mount.querySelector('.sv')).toBeNull();
  });

  test('excludes phase-child candidates (parent edge or dotted id); a normal issue stays', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'N-1',
        title: 'normal',
        status: 'open',
        metadata: { spec_id: 'S' }
      },
      {
        id: 'P-1',
        title: 'has parent edge',
        status: 'open',
        parent: 'PAR-1',
        metadata: { spec_id: 'S' }
      }
    ]);
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'X-1.2',
        title: 'dotted child id',
        status: 'open',
        metadata: { spec_id: 'S' }
      }
    ]);
    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const cand = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );
    expect(candidateOrder(mount)).toEqual(['N-1']);
    expect(cand.querySelector('.worker-card[data-bead-id="P-1"]')).toBeNull();
    expect(cand.querySelector('.worker-card[data-bead-id="X-1.2"]')).toBeNull();
  });

  test('candidate card renders the route chip (derived → ? suffix) and a 4-cell spec_backed stepper', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'WF-1',
        title: 'workflow candidate',
        status: 'open',
        metadata: { spec_id: 'S' },
        workflow: {
          route: 'spec_backed',
          route_source: 'derived',
          stages: {
            spec: { state: 'reviewed' },
            impl: { state: 'dim' },
            pr: { state: 'empty' },
            merge: { state: 'empty' }
          }
        }
      }
    ]);
    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-candidate .worker-card[data-bead-id="WF-1"]'
      )
    );
    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.ctl-chip--route')
    );
    expect(chip.classList.contains('is-derived')).toBe(true);
    expect(chip.textContent?.trim()).toBe('spec_backed ?');

    // spec_backed → 4 stepper cells (spec/impl/pr/merge).
    expect(card.querySelectorAll('.stp .seg').length).toBe(4);
    const spec = /** @type {HTMLElement} */ (card.querySelector('.b-spec.on'));
    expect(spec.textContent?.trim()).toBe('✓');
  });

  test('candidate card renders a 5-cell full_plan stepper and passes reviewed/skip/stale states through', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'FP-1',
        title: 'full plan candidate',
        status: 'open',
        metadata: { spec_id: 'S' },
        workflow: {
          route: 'full_plan',
          route_source: 'explicit',
          stages: {
            spec: { state: 'reviewed' },
            plan: { state: 'skip' },
            impl: { state: 'stale' },
            pr: { state: 'empty' },
            merge: { state: 'empty' }
          }
        }
      }
    ]);
    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-candidate .worker-card[data-bead-id="FP-1"]'
      )
    );
    // full_plan → 5 stepper cells (spec/plan/impl/pr/merge).
    expect(card.querySelectorAll('.stp .seg').length).toBe(5);
    // Explicit route → chip with no `?` suffix.
    expect(
      card.querySelector('.ctl-chip--route')?.classList.contains('is-derived')
    ).toBe(false);
    // reviewed → ✓, skip → ⊘, stale → greyed ✓ via `.stale`.
    expect(card.querySelector('.b-spec.on')?.textContent?.trim()).toBe('✓');
    expect(card.querySelector('.b-plan.on')?.textContent?.trim()).toBe('⊘');
    expect(card.querySelector('.b-impl.stale')).not.toBeNull();
  });

  test('a candidate without workflow renders no chip/stepper and does not throw', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'NW-1',
        title: 'no workflow',
        status: 'open',
        metadata: { spec_id: 'S' }
      }
    ]);
    expect(() =>
      createWorkerView(mount, {
        issueStores: stores,
        queueStore: createWorkerQueueStore(),
        transport: vi.fn()
      })
    ).not.toThrow();

    const card = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-candidate .worker-card[data-bead-id="NW-1"]'
      )
    );
    expect(card).not.toBeNull();
    expect(card.querySelector('.ctl-chip--route')).toBeNull();
    expect(card.querySelector('.stp')).toBeNull();
  });

  /**
   * Click the ctrl-bar ⚙ and return the opened exec-defaults dialog element.
   *
   * @param {HTMLElement} mount
   * @returns {HTMLElement}
   */
  function openExecDefaults(mount) {
    const btn = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-exec-defaults-btn')
    );
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return /** @type {HTMLElement} */ (
      mount.querySelector('#worker-exec-defaults-dialog')
    );
  }

  /**
   * @param {HTMLElement} dialog
   * @param {string} key
   * @returns {HTMLSelectElement}
   */
  function execSelect(dialog, key) {
    return /** @type {HTMLSelectElement} */ (
      dialog.querySelector(`select[data-key="${key}"]`)
    );
  }

  test('the ⚙ button carries aria-haspopup and opens the global exec-defaults dialog', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const btn = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-exec-defaults-btn')
    );
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('aria-haspopup')).toBe('dialog');

    // Closed until the ⚙ is clicked.
    const before = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-exec-defaults-dialog')
    );
    expect(before?.hasAttribute('open')).toBe(false);

    const dialog = openExecDefaults(mount);
    expect(dialog.hasAttribute('open')).toBe(true);
    // The 5 exec keys render (workflow_mode is NOT a global default).
    for (const key of [
      'orchestration_model',
      'orchestration_effort',
      'review_model',
      'impl_model'
    ]) {
      expect(execSelect(dialog, key)).not.toBeNull();
    }
    expect(execSelect(dialog, 'workflow_mode')).toBeNull();
  });

  test('changing an exec-default select sends worker-queue-set-exec-default with the current revision', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ revision: 3 }));
    const transport = vi
      .fn()
      .mockResolvedValue(
        reply(
          queueOf({ revision: 4, exec_defaults: { review_model: 'codex' } })
        )
      );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    const dialog = openExecDefaults(mount);
    const sel = execSelect(dialog, 'review_model');
    sel.value = 'codex';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-set-exec-default', {
      key: 'review_model',
      value: 'codex',
      expected_revision: 3
    });
  });

  test('selecting (기본) sends an unset (null value) exec-default', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({ revision: 3, exec_defaults: { review_model: 'codex' } })
    );
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ revision: 4 })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    const dialog = openExecDefaults(mount);
    const sel = execSelect(dialog, 'review_model');
    expect(sel.value).toBe('codex');
    sel.value = '';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-set-exec-default', {
      key: 'review_model',
      value: null,
      expected_revision: 3
    });
  });

  test('a CAS conflict re-reads the returned snapshot and retries the exec-default set once', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ revision: 0 }));
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: queueOf({ revision: 5 })
      })
      .mockResolvedValueOnce(
        reply(
          queueOf({ revision: 6, exec_defaults: { review_model: 'codex' } })
        )
      );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    const dialog = openExecDefaults(mount);
    const sel = execSelect(dialog, 'review_model');
    sel.value = 'codex';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledTimes(2);
    expect(transport.mock.calls[0][1].expected_revision).toBe(0);
    expect(transport.mock.calls[1][1].expected_revision).toBe(5);
  });

  test('the exec-defaults dialog reflects exec_defaults from the queue snapshot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        exec_defaults: {
          orchestration_model: 'sonnet',
          orchestration_effort: 'high',
          review_model: 'opus',
          impl_model: 'sonnet'
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const dialog = openExecDefaults(mount);
    expect(execSelect(dialog, 'orchestration_model').value).toBe('sonnet');
    expect(execSelect(dialog, 'worker_runner')).toBeNull();
    expect(execSelect(dialog, 'orchestration_effort').value).toBe('high');
    expect(execSelect(dialog, 'review_model').value).toBe('opus');
    expect(execSelect(dialog, 'impl_model').value).toBe('sonnet');
  });

  test('the orchestration_model options are the claude catalog', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ exec_defaults: {} }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const dialog = openExecDefaults(mount);
    const opts = Array.from(
      execSelect(dialog, 'orchestration_model').options
    ).map((o) => o.value);
    expect(opts).toContain('opus');
    expect(opts).not.toContain('gpt-5.6');
  });

  test('an incompatible stored model shows as a selected (비호환) option, and (기본) still unsets it', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    // A codex-era model left in the store is outside the claude catalog, so it
    // renders as its own (비호환) option (worker-phase1 §3).
    queueStore.set(
      queueOf({
        revision: 7,
        exec_defaults: { orchestration_model: 'gpt-5.6' }
      })
    );
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ revision: 8 })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    const dialog = openExecDefaults(mount);
    const model = execSelect(dialog, 'orchestration_model');
    // The incompatible stored value is surfaced (not hidden behind '(기본)') and
    // is the selected option, labelled '(비호환)'.
    expect(model.value).toBe('gpt-5.6');
    const selectedOption = model.options[model.selectedIndex];
    expect(selectedOption.value).toBe('gpt-5.6');
    expect(selectedOption.textContent).toContain('비호환');

    // '(기본)' is a live target: selecting it fires a change that unsets (null).
    model.value = '';
    model.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();
    expect(transport).toHaveBeenCalledWith('worker-queue-set-exec-default', {
      key: 'orchestration_model',
      value: null,
      expected_revision: 7
    });
  });

  test('the ⚙ dialog labels the (기본) option with the static fallback (§3.1)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const dialog = openExecDefaults(mount);
    // The global dialog edits the global layer itself, so its unset option is
    // always the static final-fallback label — not a `(… — 전역)` echo.
    const modelUnset = execSelect(dialog, 'orchestration_model').options[0];
    expect(modelUnset.value).toBe('');
    expect(modelUnset.textContent).toContain('기본: opus');
    expect(execSelect(dialog, 'review_model').options[0].textContent).toContain(
      '기본: codex'
    );
    expect(execSelect(dialog, 'impl_model').options[0].textContent).toContain(
      '티어 자동'
    );
  });

  test('the ⚙ dialog no longer renders global policy rows (worker-phase2 §2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf(/** @type {any} */ ({ revision: 3, merge_policy: 'pr_stop' }))
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const dialog = openExecDefaults(mount);

    expect(
      dialog.querySelector('select[data-policy-key="merge_policy"]')
    ).toBeNull();
    expect(
      dialog.querySelector('select[data-policy-key="drift_policy"]')
    ).toBeNull();
    // The 4 exec rows survive.
    expect(dialog.querySelectorAll('.exec-defaults__row').length).toBe(4);
  });

  /**
   * Open the ⚙ dialog over a queue snapshot carrying the given
   * `workspace_info` (worker-deploy-hook §3/§4 read-only decoration).
   *
   * @param {HTMLElement} mount
   * @param {any} workspace_info
   * @returns {HTMLElement}
   */
  function openWithWorkspaceInfo(mount, workspace_info) {
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ revision: 2, workspace_info }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn(),
      getWorkspacePath: () => '/Users/me/GitHub/other-repo'
    });

    return openExecDefaults(mount);
  }

  /**
   * @param {HTMLElement} dialog
   * @param {string} name - `verify` | `deploy` | `last-deploy`
   * @returns {HTMLElement|null}
   */
  function vdGroup(dialog, name) {
    return dialog.querySelector(`.exec-defaults__vd-group[data-vd="${name}"]`);
  }

  test('renders the verify row with its command, config badge and timeout', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: {
        cmd: ['npm', 'run', 'all'],
        timeout_ms: 600000,
        source: 'config'
      },
      deploy_cmd: null,
      last_deploy: null,
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'verify'));
    expect(group.querySelector('.exec-defaults__vd-cmd')?.textContent).toBe(
      'npm run all'
    );
    expect(
      group.querySelector('.exec-defaults__vd-badge--config')?.textContent
    ).toBe('config');
    expect(group.querySelector('.exec-defaults__vd-meta')?.textContent).toBe(
      'timeout 10분'
    );
  });

  test('marks an auto-detected verify command with the 자동감지 badge', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: {
        cmd: ['npm', 'test'],
        timeout_ms: 600000,
        source: 'detected'
      },
      deploy_cmd: null,
      last_deploy: null,
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'verify'));
    expect(
      group.querySelector('.exec-defaults__vd-badge--detected')?.textContent
    ).toBe('자동감지');
    expect(group.querySelector('.exec-defaults__vd-badge--config')).toBeNull();
  });

  test('renders 검증 없음 when no verify command resolves', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: null,
      deploy_cmd: null,
      last_deploy: null,
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'verify'));
    expect(group.querySelector('.exec-defaults__vd-cmd')).toBeNull();
    expect(group.textContent).toContain('검증 없음');
  });

  test('renders the deploy row with a detached badge and the verify-gated note', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: {
        cmd: ['npm', 'run', 'all'],
        timeout_ms: 600000,
        source: 'config'
      },
      deploy_cmd: {
        cmd: ['bdui-shared', 'restart'],
        timeout_ms: 600000,
        detached: true
      },
      last_deploy: null,
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'deploy'));
    expect(group.querySelector('.exec-defaults__vd-cmd')?.textContent).toBe(
      'bdui-shared restart'
    );
    expect(
      group.querySelector('.exec-defaults__vd-badge--config')?.textContent
    ).toBe('config');
    expect(
      group.querySelector('.exec-defaults__vd-badge--detached')?.textContent
    ).toBe('detached');
    expect(group.querySelector('.exec-defaults__vd-meta')?.textContent).toBe(
      'timeout 10분 · verify 통과 시에만 실행'
    );
  });

  test('renders no detached badge for a synchronous deploy command', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: null,
      deploy_cmd: {
        cmd: ['bash', 'scripts/install.sh'],
        timeout_ms: 900000,
        detached: false
      },
      last_deploy: null,
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'deploy'));
    expect(
      group.querySelector('.exec-defaults__vd-badge--detached')
    ).toBeNull();
    expect(group.querySelector('.exec-defaults__vd-meta')?.textContent).toBe(
      'timeout 15분 · verify 통과 시에만 실행'
    );
  });

  test('an unconfigured deploy names the config section for the current workspace', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: {
        cmd: ['npm', 'test'],
        timeout_ms: 600000,
        source: 'detected'
      },
      deploy_cmd: null,
      last_deploy: null,
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'deploy'));
    expect(group.textContent).toContain('배포 없음');
    expect(group.querySelector('.exec-defaults__vd-cmd')?.textContent).toBe(
      '[worker.deploy."/Users/me/GitHub/other-repo"]'
    );
  });

  test('renders the last deploy as a 발사됨 badge with time, bead id and short sha', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: null,
      deploy_cmd: {
        cmd: ['bdui-shared', 'restart'],
        timeout_ms: 600000,
        detached: true
      },
      last_deploy: {
        outcome: 'launched',
        reason: null,
        bead_id: 'UI-89q5',
        base_sha: '5fe1fd3aa11bb22cc33dd44',
        at: Date.UTC(2026, 6, 27, 3, 54)
      },
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'last-deploy'));
    expect(
      group.querySelector('.exec-defaults__vd-badge--launched')?.textContent
    ).toBe('발사됨');
    const meta = /** @type {string} */ (
      group.querySelector('.exec-defaults__vd-meta')?.textContent
    );
    expect(meta).toContain('UI-89q5');
    expect(meta).toContain('5fe1fd3');
    expect(meta).not.toContain('5fe1fd3a');
  });

  test('renders a successful last deploy as a 성공 badge', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: null,
      deploy_cmd: null,
      last_deploy: {
        outcome: 'deployed',
        reason: null,
        bead_id: 'DF-1',
        base_sha: 'a3f0a9812345',
        at: Date.UTC(2026, 6, 26, 9, 2)
      },
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'last-deploy'));
    expect(
      group.querySelector('.exec-defaults__vd-badge--ok')?.textContent
    ).toBe('성공');
  });

  test('renders a failed last deploy with its reason in the badge', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: null,
      deploy_cmd: null,
      last_deploy: {
        outcome: 'failed',
        reason: 'deploy_base_not_synced',
        bead_id: 'UI-3onr',
        base_sha: '9c21b44ffff',
        at: Date.UTC(2026, 6, 27, 4, 10)
      },
      slots: 2
    });

    const group = /** @type {HTMLElement} */ (vdGroup(dialog, 'last-deploy'));
    expect(
      group.querySelector('.exec-defaults__vd-badge--fail')?.textContent
    ).toBe('실패 · deploy_base_not_synced');
  });

  test('omits the last-deploy row entirely when there is no record', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: null,
      deploy_cmd: null,
      last_deploy: null,
      slots: 2
    });

    expect(vdGroup(dialog, 'last-deploy')).toBeNull();
    expect(dialog.textContent).not.toContain('마지막 배포');
  });

  test('renders the verify/deploy section as read-only — no editable control in it', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      verify_cmd: {
        cmd: ['npm', 'run', 'all'],
        timeout_ms: 600000,
        source: 'config'
      },
      deploy_cmd: {
        cmd: ['bdui-shared', 'restart'],
        timeout_ms: 600000,
        detached: true
      },
      last_deploy: {
        outcome: 'deployed',
        reason: null,
        bead_id: 'UI-3onr',
        base_sha: '9c21b44ffff',
        at: Date.UTC(2026, 6, 27, 4, 10)
      },
      slots: 2
    });

    const section = /** @type {HTMLElement} */ (
      dialog.querySelector('.exec-defaults__vd')
    );
    expect(section).not.toBeNull();
    expect(section.textContent).toContain('읽기 전용');
    expect(
      section.querySelectorAll('input, select, textarea, button').length
    ).toBe(0);
  });

  test('renders the section without throwing when the snapshot carries no workspace_info', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ revision: 2 }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const dialog = openExecDefaults(mount);

    expect(dialog.querySelector('.exec-defaults__vd')).not.toBeNull();
    expect(vdGroup(dialog, 'verify')?.textContent).toContain('검증 없음');
    expect(vdGroup(dialog, 'deploy')?.textContent).toContain('배포 없음');
  });

  test('failure banner ↻ resumes the newest eligible failed attempt (§1)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        attempts: {
          f1: {
            attempt_id: 'f1',
            bead_id: 'B1',
            status: 'failed',
            repo: '/repo',
            cause: 'verify_failed:x',
            session_id: 'sid-1'
          }
        }
      })
    );
    const transport = vi.fn().mockResolvedValue({ resumed: true });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    const btn = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--failure .worker-banner__resume')
    );
    expect(btn).not.toBeNull();
    expect(btn.dataset.attemptId).toBe('f1');
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'f1',
      expected_revision: 1
    });
  });

  test('the ↻ targets exactly the latest failure — ineligible renders disabled with the reason, never an older substitute (§1)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        attempts: {
          old_eligible: {
            attempt_id: 'old_eligible',
            bead_id: 'B1',
            status: 'failed',
            repo: '/repo',
            cause: 'verify_failed:x',
            session_id: 'sid-old'
          },
          latest_no_sid: {
            attempt_id: 'latest_no_sid',
            bead_id: 'B1',
            status: 'failed',
            repo: '/repo',
            cause: 'verify_failed:y'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-banner--failure .worker-banner__resume')
    );
    // The banner describes latest_no_sid, so its ↻ must point there — a
    // different (older) session is never silently substituted.
    expect(btn.dataset.attemptId).toBe('latest_no_sid');
    expect(btn.disabled).toBe(true);
    expect(btn.title).toContain('session_id 없는');
  });

  test('a resumed running tile shows the ↻ badge (§1)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'B1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'B1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 2000,
            resumed_from: 'anc'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    const badge = mount.querySelector(
      '.rtile[data-bead-id="B1"] .rtile__resumed'
    );
    expect(badge).not.toBeNull();
  });

  test('the failure banner is sourced from the latest failed attempt, not a breaker', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        attempts: {
          older: {
            attempt_id: 'older',
            bead_id: 'B1',
            status: 'failed',
            repo: '/repo',
            cause: 'session_failed:old',
            session_id: 'sid-old'
          },
          newest: {
            attempt_id: 'newest',
            bead_id: 'B2',
            status: 'orphaned',
            repo: '/repo',
            cause: 'orphan',
            session_id: 'sid-new'
          }
        }
      })
    );

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const banner = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--failure')
    );
    // The banner reports the LATEST terminal failure record verbatim.
    expect(banner.textContent).toContain('orphan');
    expect(
      /** @type {HTMLElement} */ (
        banner.querySelector('.worker-banner__resume')
      ).dataset.attemptId
    ).toBe('newest');
  });

  test('no failed attempt renders no failure banner', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({}));

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });
});

describe('worker view — pr_wait PR link + gate badges (worker-phase2 §4/§5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} gate
   * @param {any} [pr]
   */
  function withObservation(gate, pr) {
    return queueOf({
      pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_observations: {
        'RD-1': {
          pr: pr ?? {
            number: 304,
            url: 'https://github.com/o/r/pull/304',
            state: 'OPEN',
            head_sha: 'a'.repeat(40)
          },
          ci: null,
          verify: null,
          error: null,
          observed_at: 1,
          gate
        }
      }
    });
  }

  /**
   * @param {any} queue
   * @returns {HTMLElement}
   */
  function renderWith(queue) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queue);
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
  }

  test('renders the PR as a link, not a button', () => {
    const row = renderWith(
      withObservation({
        enabled: true,
        tier: 'ci',
        gate_badge: 'CI ✓',
        base_badge: '최신',
        reason: null
      })
    );

    const link = /** @type {HTMLAnchorElement} */ (
      row.querySelector('.worker-mini__pr')
    );
    expect(link.textContent?.replace(/\s+/g, ' ').trim()).toBe('#304 ↗');
    expect(link.getAttribute('href')).toBe('https://github.com/o/r/pull/304');
    // The PR itself is never an action control — a view affordance and an
    // execute affordance at the same weight is how a misclick merges something
    // (worker-phase2 §6).
    expect(link.tagName).toBe('A');
    for (const btn of Array.from(row.querySelectorAll('button'))) {
      expect(btn.getAttribute('href')).toBe(null);
      expect(btn.textContent || '').not.toContain('#304');
    }
  });

  test('renders the gate badge and the base badge', () => {
    const row = renderWith(
      withObservation({
        enabled: true,
        tier: 'ci',
        gate_badge: 'CI ✓',
        base_badge: '최신',
        reason: null
      })
    );

    const badges = Array.from(row.querySelectorAll('.worker-mini__badge')).map(
      (b) => b.textContent
    );
    expect(badges).toEqual(['CI ✓', '최신']);
  });

  test('renders the local-verification badge for a no-CI repo', () => {
    const row = renderWith(
      withObservation({
        enabled: false,
        tier: 'local_verify',
        gate_badge: '로컬검증 대기',
        base_badge: '최신',
        reason: 'verify_missing'
      })
    );

    expect(row.querySelector('.worker-mini__badge')?.textContent).toBe(
      '로컬검증 대기'
    );
  });

  test('flags a closed-unmerged PR as needing a human decision', () => {
    const row = renderWith(
      withObservation(
        {
          enabled: false,
          tier: 'closed_unmerged',
          gate_badge: 'PR closed',
          base_badge: 'PR closed',
          reason: 'pr_closed_unmerged'
        },
        {
          number: 304,
          url: 'https://github.com/o/r/pull/304',
          state: 'CLOSED',
          head_sha: 'a'.repeat(40)
        }
      )
    );

    const badge = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__badge')
    );
    expect(badge.textContent).toBe('PR closed');
    expect(badge.classList.contains('worker-mini__badge--alert')).toBe(true);
  });

  test('flags an observation error as an alert badge, not as a pass', () => {
    const row = renderWith(
      withObservation({
        enabled: false,
        tier: 'undecidable',
        gate_badge: '관측 오류',
        base_badge: '',
        reason: 'gh_failed'
      })
    );

    const badge = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__badge')
    );
    expect(badge.textContent).toBe('관측 오류');
    expect(badge.classList.contains('worker-mini__badge--alert')).toBe(true);
  });

  test('renders no PR link or badge for a bead with no observation yet', () => {
    const row = renderWith(
      queueOf({ pr_wait: [{ bead_id: 'RD-1', added_at: 1 }] })
    );

    expect(row.querySelector('.worker-mini__pr')).toBe(null);
    expect(row.querySelector('.worker-mini__badge')).toBe(null);
    expect(row.querySelector('.worker-mini__reason')?.textContent).toBe(
      'PR 대기'
    );
  });
});

describe('worker view — REVISE 파킹 처분 카드 (UI-hs11 §3.5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {Record<string, any>} [over]
   */
  function parkedQueue(over = {}) {
    return queueOf({
      queue: [{ bead_id: 'RD-1', added_at: 1 }],
      revise_parked: {
        'RD-1': {
          attempt_id: 'p1',
          repo: '/repo',
          target_base: 'main',
          session_id: 'sid',
          receipt: 'codex@' + 'a'.repeat(40),
          notes_tail: 'findings: 스펙 §3 누락',
          at: 1
        }
      },
      ...over
    });
  }

  /**
   * @param {any} queue
   * @param {any} [transport]
   */
  function mountWith(queue, transport = vi.fn(async () => ({ ok: true }))) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queue);
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    return { mount, transport };
  }

  /**
   * @param {HTMLElement} mount
   * @returns {HTMLElement}
   */
  function rowOf(mount) {
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
  }

  test('renders the parking badge and both disposition buttons', () => {
    const { mount } = mountWith(parkedQueue());

    const row = rowOf(mount);
    expect(
      /** @type {HTMLElement} */ (row.querySelector('.worker-mini__badge'))
        .textContent
    ).toBe('⏸ REVISE 파킹');
    expect(row.querySelector('.worker-mini__revise-fix')).not.toBe(null);
    expect(row.querySelector('.worker-mini__revise-approve')).not.toBe(null);
  });

  test('carries the findings summary as the fix button tooltip', () => {
    const { mount } = mountWith(parkedQueue());

    const btn = /** @type {HTMLElement} */ (
      rowOf(mount).querySelector('.worker-mini__revise-fix')
    );
    expect(btn.getAttribute('title')).toContain('스펙 §3 누락');
  });

  test('renders no disposition card for an unparked queued bead', () => {
    const { mount } = mountWith(
      queueOf({ queue: [{ bead_id: 'RD-1', added_at: 1 }] })
    );

    const row = rowOf(mount);
    expect(row.querySelector('.worker-mini__revise-fix')).toBe(null);
    expect(row.querySelector('.worker-mini__badge')).toBe(null);
  });

  test('renders nothing extra when the server sends no observation at all', () => {
    const { mount } = mountWith(
      queueOf({
        queue: [{ bead_id: 'RD-1', added_at: 1 }],
        revise_parked: null
      })
    );

    expect(rowOf(mount).querySelector('.worker-mini__revise-approve')).toBe(
      null
    );
  });

  test('the fix button sends worker-revise-fix with the current revision', async () => {
    const transport = vi.fn(async () => ({ ok: true, attempt_id: 'a2' }));
    const { mount } = mountWith(parkedQueue(), transport);

    /** @type {HTMLElement} */ (
      rowOf(mount).querySelector('.worker-mini__revise-fix')
    ).click();
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('worker-revise-fix', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
  });

  test('the approve button sends worker-revise-approve', async () => {
    const transport = vi.fn(async () => ({ ok: true, sha: 'b'.repeat(40) }));
    const { mount } = mountWith(parkedQueue(), transport);

    /** @type {HTMLElement} */ (
      rowOf(mount).querySelector('.worker-mini__revise-approve')
    ).click();
    await Promise.resolve();

    expect(transport).toHaveBeenCalledWith('worker-revise-approve', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
  });

  test('retries once against the fresh revision on a CAS conflict', async () => {
    const transport = vi.fn(async () => ({
      conflict: true,
      queue: { ...parkedQueue(), revision: 7 }
    }));
    const { mount } = mountWith(parkedQueue(), transport);

    /** @type {HTMLElement} */ (
      rowOf(mount).querySelector('.worker-mini__revise-approve')
    ).click();
    await vi.waitFor(() => expect(transport).toHaveBeenCalledTimes(2));

    expect(transport.mock.calls[1]).toEqual([
      'worker-revise-approve',
      { bead_id: 'RD-1', expected_revision: 7 }
    ]);
  });
});

describe('worker view — pr_wait actions (worker-phase2 §6)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} gate
   * @param {Record<string, any>} [extra]
   */
  function queueWithGate(gate, extra = {}) {
    return queueOf({
      pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_observations: {
        'RD-1': {
          pr: {
            number: 304,
            url: 'https://github.com/o/r/pull/304',
            state: 'OPEN',
            head_sha: 'a'.repeat(40)
          },
          ci: null,
          verify: null,
          error: null,
          observed_at: 1,
          gate
        }
      },
      ...extra
    });
  }

  /**
   * @param {any} queue
   */
  function mountWith(queue) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queue);
    const transport = vi.fn(async () => ({ ok: true, action: 'merged' }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    return { mount, transport };
  }

  const GREEN = {
    enabled: true,
    tier: 'ci',
    gate_badge: 'CI ✓',
    base_badge: '최신',
    reason: null
  };
  const RED = {
    enabled: false,
    tier: 'ci',
    gate_badge: 'CI ✗',
    base_badge: '최신',
    reason: 'ci_failed'
  };

  /**
   * The §5 gate tiers, exactly as `evaluateMergeGate` emits them.
   *
   * @type {Array<{ tier: string, gate_badge: string, enabled: boolean, reason: string|null }>}
   */
  const PASSING_TIERS = [
    { tier: 'ci', gate_badge: 'CI ✓', enabled: true, reason: null },
    {
      tier: 'local_verify',
      gate_badge: '로컬검증 ✓',
      enabled: true,
      reason: null
    },
    { tier: 'none', gate_badge: '검증 신호 없음', enabled: true, reason: null }
  ];

  /** @type {Array<{ tier: string, gate_badge: string, enabled: boolean, reason: string|null }>} */
  const REFUSING_TIERS = [
    { tier: 'ci', gate_badge: 'CI ✗', enabled: false, reason: 'ci_failed' },
    { tier: 'ci', gate_badge: 'CI 대기', enabled: false, reason: 'ci_pending' },
    {
      tier: 'local_verify',
      gate_badge: '로컬검증 ✗',
      enabled: false,
      reason: 'verify_cmd_failed'
    },
    {
      tier: 'undecidable',
      gate_badge: '관측 오류',
      enabled: false,
      reason: 'gh_failed'
    },
    {
      tier: 'unobserved',
      gate_badge: '관측 대기',
      enabled: false,
      reason: 'not_observed'
    },
    {
      tier: 'closed_unmerged',
      gate_badge: 'PR closed',
      enabled: false,
      reason: 'pr_closed_unmerged'
    },
    { tier: 'merged', gate_badge: '머지됨', enabled: false, reason: null }
  ];

  test('enables 머지 in every passing tier and shows what it is based on', () => {
    for (const t of PASSING_TIERS) {
      document.body.innerHTML = '<div id="m"></div>';
      const { mount } = mountWith(queueWithGate({ ...t, base_badge: '최신' }));

      const btn = /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-mini__merge')
      );
      expect(btn.disabled).toBe(false);
      expect(btn.getAttribute('title')).toContain(t.gate_badge);
      expect(
        /** @type {HTMLElement} */ (mount.querySelector('.worker-mini__badge'))
          .textContent
      ).toBe(t.gate_badge);
    }
  });

  test('disables 머지 in every refusing tier and renders that tier badge', () => {
    for (const t of REFUSING_TIERS) {
      document.body.innerHTML = '<div id="m"></div>';
      const { mount } = mountWith(queueWithGate({ ...t, base_badge: '최신' }));

      const btn = /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-mini__merge')
      );
      expect(btn.disabled).toBe(true);
      expect(btn.getAttribute('title')).toContain(t.reason || '정리 진행 중');
      expect(
        /** @type {HTMLElement} */ (mount.querySelector('.worker-mini__badge'))
          .textContent
      ).toBe(t.gate_badge);
    }
  });

  test('offers 머지 and 폐기 on a pr_wait row', () => {
    const { mount } = mountWith(queueWithGate(GREEN));

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.querySelector('.worker-mini__merge')).not.toBe(null);
    const discard = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__discard')
    );
    expect(discard.textContent?.trim()).toBe('폐기');
  });

  test('withholds 폐기 on a merged tile — a landed merge cannot be discarded', () => {
    const { mount } = mountWith(
      queueWithGate({
        enabled: false,
        tier: 'merged',
        gate_badge: '머지됨',
        base_badge: '머지됨',
        reason: null
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.querySelector('.worker-mini__discard')).toBe(null);
    // [머지] stays: on a merged tile it is the cleanup-retry button.
    expect(row.querySelector('.worker-mini__merge')).not.toBe(null);
  });

  test('withholds 폐기 on a merged tile whose cleanup failed', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': { step: 'child_sweep', reason: 'boom', at: 1 }
          }
        }
      )
    );

    expect(mount.querySelector('.worker-mini__discard')).toBe(null);
  });

  test('withholds 폐기 on a cleanup_failed tile even without observations', () => {
    // Right after a restart the observation cache is empty — the durable
    // cleanup_failed record alone must keep [폐기] off a merged tile.
    const { mount } = mountWith(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        pr_observations: {},
        cleanup_failed: {
          'RD-1': { step: 'child_sweep', reason: 'boom', at: 1 }
        }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.querySelector('.worker-mini__discard')).toBe(null);
  });

  test('disables 머지 when the gate refuses, and says why', () => {
    const { mount } = mountWith(queueWithGate(RED));

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('title')).toContain('ci_failed');
  });

  test('keeps 머지 clickable on a conflict so the click can dispatch a resolution', () => {
    const { mount } = mountWith(
      queueWithGate({
        enabled: false,
        tier: 'ci',
        gate_badge: 'CI ✓',
        base_badge: '충돌',
        reason: 'ci_pending'
      })
    );

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(false);
    expect(btn.getAttribute('title')).toContain('머지하지 않음');
  });

  test('sends worker-pr-merge with the current revision on click', () => {
    const { mount, transport } = mountWith(queueWithGate(GREEN));

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    ).click();

    expect(transport).toHaveBeenCalledWith('worker-pr-merge', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
  });

  test('confirms before sending the destructive discard', () => {
    const { mount, transport } = mountWith(queueWithGate(GREEN));
    const confirm = vi.fn(() => false);
    vi.stubGlobal('confirm', confirm);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard')
    ).click();

    expect(confirm).toHaveBeenCalled();
    expect(transport).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

  test('teaches the drag-back re-run path in the discard confirmation', () => {
    const { mount } = mountWith(queueWithGate(GREEN));
    /** @type {string[]} */
    const messages = [];
    vi.stubGlobal(
      'confirm',
      vi.fn((/** @type {string} */ message) => {
        messages.push(message);
        return false;
      })
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard')
    ).click();

    expect(messages[0]).toContain('대기 레인으로 옮기세요');
    vi.unstubAllGlobals();
  });

  test('sends worker-pr-discard once the user confirms', () => {
    const { mount, transport } = mountWith(queueWithGate(GREEN));
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true)
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard')
    ).click();

    expect(transport).toHaveBeenCalledWith('worker-pr-discard', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
    vi.unstubAllGlobals();
  });

  test('announces a completed discard with a success toast', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueWithGate(GREEN));
    const transport = vi.fn(async () => ({ discarded: true, conflict: false }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true)
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard')
    ).click();
    await new Promise((resolve) => setTimeout(resolve, 0));

    const toast = /** @type {HTMLElement|null} */ (
      document.querySelector('.toast')
    );
    expect(toast?.textContent).toContain('폐기 완료');
    vi.unstubAllGlobals();
  });

  test('renders a merged_cleanup_failed banner that asks a human to finish it', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': {
              step: 'child_sweep',
              reason: 'child_close_failed:RD-1.1',
              at: 1
            }
          }
        }
      )
    );

    const banner = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--cleanup')
    );
    const text = (banner.textContent || '').replace(/\s+/g, ' ');
    expect(text).toContain('child_sweep');
    expect(text).toContain('자동 재시도는 하지 않습니다');
    expect(banner.getAttribute('data-bead-id')).toBe('RD-1');
    // The bead stays in the PR-wait row (not Done), and the only retry is the
    // human's own click.
    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(false);
    expect(btn.getAttribute('title')).toContain('남은 정리를');
  });

  test('shows the cleanup failure detail line when the record carries one', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': {
              step: 'post_merge_verify',
              reason: 'verify_worktree_failed',
              at: 1,
              detail: "fatal: could not lock ref 'refs/heads/x'"
            }
          }
        }
      )
    );

    const banner = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--cleanup .worker-banner__detail')
    );

    expect(banner.textContent).toContain("could not lock ref 'refs/heads/x'");
  });

  test('omits the cleanup detail line on a record without one', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': { step: 'child_sweep', reason: 'child_close_failed', at: 1 }
          }
        }
      )
    );

    expect(
      mount.querySelector('.worker-banner--cleanup .worker-banner__detail')
    ).toBeNull();
  });

  test('renders the verify output tail as a collapsed details block (UI-qult §3)', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': {
              step: 'post_merge_verify',
              reason: 'verify_cmd_failed',
              at: 1,
              output_tail: 'FAIL test/x.test.js\nrg: command not found'
            }
          }
        }
      )
    );

    const details = /** @type {HTMLDetailsElement} */ (
      mount.querySelector('.worker-banner--cleanup details.worker-banner__tail')
    );
    const pre = /** @type {HTMLElement} */ (details.querySelector('pre'));

    expect(details.open).toBe(false);
    expect(pre.textContent).toContain('rg: command not found');
  });

  test('omits the tail block on a cleanup record without one', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': { step: 'child_sweep', reason: 'child_close_failed', at: 1 }
          }
        }
      )
    );

    expect(
      mount.querySelector('.worker-banner--cleanup .worker-banner__tail')
    ).toBeNull();
  });

  test('escapes markup in the verify output tail', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': {
              step: 'post_merge_verify',
              reason: 'verify_cmd_failed',
              at: 1,
              output_tail: '<img src=x onerror="boom()">'
            }
          }
        }
      )
    );

    const pre = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner__tail pre')
    );

    expect(pre.querySelector('img')).toBeNull();
    expect(pre.textContent).toContain('<img src=x onerror="boom()">');
  });

  test('renders the full verify log path line (UI-0x54)', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': {
              step: 'post_merge_verify',
              reason: 'verify_cmd_failed',
              at: 1,
              log_path:
                '/state/bdui/ws-abc/verify-logs/verify-RD-1-abc1234-17.log'
            }
          }
        }
      )
    );

    const line = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--cleanup .worker-banner__log-path')
    );

    expect(line.textContent).toContain('전체 로그:');
    expect(line.textContent).toContain(
      '/state/bdui/ws-abc/verify-logs/verify-RD-1-abc1234-17.log'
    );
  });

  test('omits the log path line on a cleanup record without one', () => {
    const { mount } = mountWith(
      queueWithGate(
        {
          enabled: false,
          tier: 'merged',
          gate_badge: '머지됨',
          base_badge: '머지됨',
          reason: null
        },
        {
          cleanup_failed: {
            'RD-1': { step: 'child_sweep', reason: 'child_close_failed', at: 1 }
          }
        }
      )
    );

    expect(
      mount.querySelector('.worker-banner--cleanup .worker-banner__log-path')
    ).toBeNull();
  });
});

describe('worker view — failure banner lifecycle (UI-dcw7)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * Mount the view over a queue snapshot carrying exactly `attempts`.
   *
   * @param {Record<string, any>} attempts
   * @param {(type: string, payload?: unknown) => Promise<any>} [transport]
   * @returns {HTMLElement}
   */
  function mountWithAttempts(attempts, transport = vi.fn()) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ attempts }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    return mount;
  }

  test('shows the guard reason AND the matched command on a blocker failure', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'loud_fail_blocker',
        cause_detail: {
          reason: 'merge_to_base_blocked',
          command: 'gh pr merge 311 --squash'
        }
      }
    });

    const detail = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--failure .worker-banner__detail')
    );
    const text = (detail.textContent || '').replace(/\s+/g, ' ');

    expect(text).toContain('merge_to_base_blocked');
    expect(text).toContain('gh pr merge 311 --squash');
  });

  test('shows only the reason when a blocker names no command', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'loud_fail_blocker',
        cause_detail: {
          reason: 'question tool: AskUserQuestion',
          command: null
        }
      }
    });

    const detail = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--failure .worker-banner__detail')
    );

    expect(detail.textContent).toContain('question tool: AskUserQuestion');
    expect(detail.querySelector('code')).toBeNull();
  });

  test('renders no detail line for a failure without cause_detail', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'verify_failed:pr_missing'
      }
    });

    expect(
      mount.querySelector('.worker-banner--failure .worker-banner__detail')
    ).toBeNull();
  });

  test('renders no banner for a failure a later same-bead attempt superseded', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'verify_failed:x',
        session_id: 'sid-1'
      },
      later: {
        attempt_id: 'later',
        bead_id: 'B1',
        status: 'running',
        started_at: Date.now()
      }
    });

    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });

  test('renders no banner when the later same-bead failure is itself dismissed', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'verify_failed:x'
      },
      f2: {
        attempt_id: 'f2',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'verify_failed:y',
        dismissed_at: 111
      }
    });

    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });

  test('renders no banner for a dismissed failed attempt', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'verify_failed:x',
        dismissed_at: 1720000000000
      }
    });

    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });

  test('renders no banner for a dismissed orphaned attempt', () => {
    const mount = mountWithAttempts({
      o1: {
        attempt_id: 'o1',
        bead_id: 'B1',
        status: 'orphaned',
        repo: '/repo',
        cause: 'orphan',
        dismissed_at: 1720000000000
      }
    });

    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });

  test('drops the ancestor banner as soon as a resume child exists', () => {
    const mount = mountWithAttempts({
      anc: {
        attempt_id: 'anc',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'verify_failed:x',
        session_id: 'sid-1'
      },
      child: {
        attempt_id: 'child',
        bead_id: 'B1',
        status: 'running',
        resumed_from: 'anc',
        started_at: Date.now()
      }
    });

    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });

  test('shows the newest of two unhandled failures, then the older once it is dismissed', () => {
    const attempts = {
      older: {
        attempt_id: 'older',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'session_failed:old',
        session_id: 'sid-old'
      },
      newer: {
        attempt_id: 'newer',
        bead_id: 'B2',
        status: 'failed',
        repo: '/repo',
        cause: 'session_failed:new',
        session_id: 'sid-new'
      }
    };
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ attempts }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    expect(
      /** @type {HTMLElement} */ (mount.querySelector('.worker-banner__resume'))
        .dataset.attemptId
    ).toBe('newer');

    queueStore.set(
      queueOf({
        revision: 2,
        attempts: {
          ...attempts,
          newer: { ...attempts.newer, dismissed_at: 1720000000000 }
        }
      })
    );

    expect(
      /** @type {HTMLElement} */ (mount.querySelector('.worker-banner__resume'))
        .dataset.attemptId
    ).toBe('older');
  });

  test('the banner ✕ dismisses exactly the attempt the banner describes', () => {
    const transport = vi.fn().mockResolvedValue({ dismissed: true });
    const mount = mountWithAttempts(
      {
        f1: {
          attempt_id: 'f1',
          bead_id: 'B1',
          status: 'failed',
          repo: '/repo',
          cause: 'verify_failed:x',
          session_id: 'sid-1'
        }
      },
      transport
    );

    const btn = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--failure .worker-banner__dismiss')
    );
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(btn.dataset.attemptId).toBe('f1');
    expect(transport).toHaveBeenCalledWith('worker-attempt-dismiss', {
      attempt_id: 'f1',
      expected_revision: 1
    });
  });

  test('leaves the ↻ button and its disabled reason untouched', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'verify_failed:x'
      }
    });

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-banner__resume')
    );

    expect(btn.disabled).toBe(true);
    expect(btn.title).toContain('session_id 없는');
  });
});

describe('candidate display filter — projection (UI-ki09)', () => {
  /**
   * @param {string} id
   * @param {boolean} blocked
   * @param {boolean} has_spec
   */
  const row = (id, blocked, has_spec) => ({ id, blocked, has_spec });

  /** All four blocked × spec combinations. */
  const rows = [
    row('RS', false, true),
    row('RN', false, false),
    row('BS', true, true),
    row('BN', true, false)
  ];

  /** @param {any[]} out */
  const ids = (out) => out.map((r) => r.id);

  test('hides blocked rows by default', () => {
    const out = applyCandidateFilter(rows, {
      show_blocked: false,
      spec: 'all'
    });

    expect(ids(out.visible)).toEqual(['RS', 'RN']);
    expect(out.hidden_blocked).toBe(2);
    expect(out.hidden_spec).toBe(0);
  });

  test('shows blocked rows once the toggle is on', () => {
    const out = applyCandidateFilter(rows, { show_blocked: true, spec: 'all' });

    expect(ids(out.visible)).toEqual(['RS', 'RN', 'BS', 'BN']);
    expect(out.hidden_blocked).toBe(0);
  });

  test('keeps only spec-carrying rows under the spec 있음 filter', () => {
    const out = applyCandidateFilter(rows, {
      show_blocked: true,
      spec: 'with'
    });

    expect(ids(out.visible)).toEqual(['RS', 'BS']);
    expect(out.hidden_spec).toBe(2);
  });

  test('keeps only spec-less rows under the spec 없음 filter', () => {
    const out = applyCandidateFilter(rows, {
      show_blocked: true,
      spec: 'without'
    });

    expect(ids(out.visible)).toEqual(['RN', 'BN']);
    expect(out.hidden_spec).toBe(2);
  });

  test('combines the two filters with AND', () => {
    const out = applyCandidateFilter(rows, {
      show_blocked: false,
      spec: 'with'
    });

    expect(ids(out.visible)).toEqual(['RS']);
  });

  test('counts a row refused by both filters in neither control count', () => {
    const out = applyCandidateFilter(rows, {
      show_blocked: false,
      spec: 'with'
    });

    // BN fails BOTH — relaxing either one alone still hides it.
    expect(out.hidden_blocked).toBe(1);
    expect(out.hidden_spec).toBe(1);
    expect(out.visible.length + out.hidden_blocked + out.hidden_spec).toBe(3);
  });

  test('returns every row when nothing is filtered out', () => {
    const out = applyCandidateFilter([row('RS', false, true)], {
      show_blocked: false,
      spec: 'all'
    });

    expect(ids(out.visible)).toEqual(['RS']);
    expect(out.hidden_blocked).toBe(0);
    expect(out.hidden_spec).toBe(0);
  });
});

describe('candidate display filter — view (UI-ki09)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @returns {HTMLElement} A mounted worker view over seedCandidates()
   * (RD-1 ready+spec, RD-2 ready+no-spec, BL-1 blocked+spec).
   */
  function mountCandidates() {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });
    return mount;
  }

  /** @param {HTMLElement} mount */
  const candIds = (mount) =>
    Array.from(
      /** @type {HTMLElement} */ (
        mount.querySelector('#worker-pane-candidate')
      ).querySelectorAll('.worker-card')
    ).map((el) => /** @type {HTMLElement} */ (el).dataset.beadId);

  /** @param {HTMLElement} mount */
  const blockedToggle = (mount) =>
    /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-filter__blocked')
    );

  /**
   * @param {HTMLElement} mount
   * @param {string} value
   */
  const clickSpecChip = (mount, value) => {
    /** @type {HTMLElement} */ (
      mount.querySelector(`.worker-filter__chip[data-spec="${value}"]`)
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  };

  test('renders no blocked candidate on a first visit', () => {
    const mount = mountCandidates();

    expect(candIds(mount)).toEqual(['RD-1', 'RD-2']);
    expect(blockedToggle(mount).checked).toBe(false);
  });

  test('counts only the visible rows in the pane header', () => {
    const mount = mountCandidates();

    const count = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-pane__count')
    );

    expect(count.textContent).toBe('2');
  });

  test('names the hidden blocked count on the toggle label', () => {
    const mount = mountCandidates();

    const label = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-filter__tgl')
    );

    expect(label.textContent).toContain('🔒 blocked 1');
  });

  test('reveals blocked candidates when the toggle is switched on', () => {
    const mount = mountCandidates();

    const tgl = blockedToggle(mount);
    tgl.checked = true;
    tgl.dispatchEvent(new Event('change', { bubbles: true }));

    expect(candIds(mount)).toContain('BL-1');
  });

  test('filters to spec-less candidates when the spec 없음 chip is clicked', () => {
    const mount = mountCandidates();

    clickSpecChip(mount, 'without');

    expect(candIds(mount)).toEqual(['RD-2']);
    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('.worker-filter__chip[data-spec="without"]')
      ).classList.contains('is-active')
    ).toBe(true);
  });

  test('reports the spec-filtered rows apart from the blocked ones', () => {
    const mount = mountCandidates();

    clickSpecChip(mount, 'with');

    // RD-2 is hidden by the spec chip; BL-1 by the blocked toggle. BL-1 passes
    // the spec chip, so it counts on the toggle only.
    expect(
      /** @type {HTMLElement} */ (mount.querySelector('.worker-filter__hidden'))
        .textContent
    ).toContain('숨김 1');
    expect(
      /** @type {HTMLElement} */ (mount.querySelector('.worker-filter__tgl'))
        .textContent
    ).toContain('🔒 blocked 1');
  });

  test('stores the filter state as JSON on every change', () => {
    const mount = mountCandidates();

    clickSpecChip(mount, 'with');
    const tgl = blockedToggle(mount);
    tgl.checked = true;
    tgl.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.worker.candidate-filter') ||
          'null'
      )
    ).toEqual({ show_blocked: true, spec: 'with' });
  });

  test('restores a stored filter when the view is created', () => {
    presetCandidateFilter({ show_blocked: true, spec: 'with' });

    const mount = mountCandidates();

    expect(candIds(mount).slice().sort()).toEqual(['BL-1', 'RD-1']);
    expect(blockedToggle(mount).checked).toBe(true);
  });

  test('falls back to the defaults on a malformed stored value', () => {
    window.localStorage.setItem(
      'beads-ui.worker.candidate-filter',
      '{not json'
    );

    const mount = mountCandidates();

    expect(candIds(mount)).toEqual(['RD-1', 'RD-2']);
    expect(blockedToggle(mount).checked).toBe(false);
  });

  test('falls back to the defaults on an out-of-vocabulary spec value', () => {
    window.localStorage.setItem(
      'beads-ui.worker.candidate-filter',
      JSON.stringify({ show_blocked: 'yes', spec: 'bogus' })
    );

    const mount = mountCandidates();

    expect(candIds(mount)).toEqual(['RD-1', 'RD-2']);
    expect(blockedToggle(mount).checked).toBe(false);
  });

  test('renders the filter strip on the candidate pane only', () => {
    const mount = mountCandidates();

    expect(
      mount.querySelectorAll('#worker-pane-candidate .worker-filter').length
    ).toBe(1);
    expect(mount.querySelectorAll('.worker-filter').length).toBe(1);
  });

  test('keeps drag rank math on the unfiltered lane while blocked rows are hidden', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const uiOrderStore = createUiOrderStore();
    uiOrderStore.set({
      revision: 4,
      order: { A: 0, B: RANK_STEP, C: 2 * RANK_STEP }
    });
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      revision: 5,
      order: {}
    });
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      uiOrderStore,
      transport
    });

    // Blocked B sits between A and C but is hidden; dropping C onto A must
    // still rank against the full merged list, exactly as if B were shown.
    expect(candidateOrder(mount)).toEqual(['A', 'C']);
    dragOnto(mount, 'C', 'A');
    await flush();

    expect(transport).toHaveBeenCalledWith('ui-order-set', {
      expected_revision: 4,
      entries: [{ bead_id: 'C', rank: -RANK_STEP }]
    });
  });
});

describe('worker view — token usage display (UI-raqh §1)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} queue
   * @returns {HTMLElement}
   */
  function renderQueue(queue) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queue);
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  test('shows the live usage on a running tile', () => {
    const mount = renderQueue(
      queueOf({
        queue: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: 1,
            usage: { input_tokens: 8420, output_tokens: 3910 }
          }
        }
      })
    );

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="RD-1"] .worker-usage')
    );
    expect(tile.textContent?.trim()).toBe('τ 12.3k');
  });

  test('puts the breakdown in the running tile tooltip', () => {
    const mount = renderQueue(
      queueOf({
        queue: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'running',
            started_at: 1,
            usage: {
              input_tokens: 8420,
              output_tokens: 3910,
              cache_read_input_tokens: 214300,
              cache_creation_input_tokens: 12800,
              total_cost_usd: 0.42
            }
          }
        }
      })
    );

    const el = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="RD-1"] .worker-usage')
    );
    expect(el.getAttribute('title')).toBe(
      '입력 8,420 · 출력 3,910 · 캐시읽기 214,300 · 캐시생성 12,800 · $0.42'
    );
  });

  test('shows the last attempt usage on a pr_wait row', () => {
    const mount = renderQueue(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'done',
            usage: { input_tokens: 100, output_tokens: 50 }
          },
          a2: {
            attempt_id: 'a2',
            bead_id: 'RD-1',
            status: 'done',
            usage: { input_tokens: 21600, output_tokens: 9340 }
          }
        }
      })
    );

    const el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .worker-usage')
    );
    expect(el.textContent?.trim()).toBe('τ 30.9k');
  });

  test('shows the last attempt usage on a done row', () => {
    const mount = renderQueue(
      queueOf({
        done: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'done',
            usage: { input_tokens: 9700, output_tokens: 4120 }
          }
        }
      })
    );

    const el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .worker-usage')
    );
    expect(el.textContent?.trim()).toBe('τ 13.8k');
  });

  test('renders nothing for an attempt that recorded no usage', () => {
    const mount = renderQueue(
      queueOf({
        done: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'done',
            usage: null
          }
        }
      })
    );

    expect(
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .worker-usage')
    ).toBe(null);
  });

  test('leaves a waiting row without a usage badge', () => {
    const mount = renderQueue(
      queueOf({
        queue: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'failed',
            usage: { input_tokens: 10, output_tokens: 5 }
          }
        }
      })
    );

    expect(
      mount.querySelector(
        '#worker-pane-queue .worker-mini[data-bead-id="RD-1"] .worker-usage'
      )
    ).toBe(null);
  });
});

describe('candidate sort — projection (UI-raqh §2)', () => {
  const ORDER = { A: 10, B: 20, C: 30 };

  /**
   * @param {string} id
   * @param {number} created_at
   * @param {boolean} has_spec
   */
  function issue(id, created_at, has_spec) {
    return {
      id,
      created_at,
      metadata: has_spec ? { spec_id: 'S' } : {}
    };
  }

  test('keeps the effective-rank order in board mode', () => {
    const list = [issue('C', 300, true), issue('A', 100, false)];

    const sorted = applyCandidateSort(list, 'board', ORDER);

    expect(sorted.map((i) => i.id)).toEqual(['A', 'C']);
  });

  test('puts spec-carrying issues first in spec mode', () => {
    const list = [issue('A', 100, false), issue('B', 200, true)];

    const sorted = applyCandidateSort(list, 'spec', ORDER);

    expect(sorted.map((i) => i.id)).toEqual(['B', 'A']);
  });

  test('keeps the effective-rank order inside each spec group', () => {
    const list = [
      issue('C', 300, true),
      issue('B', 200, false),
      issue('A', 100, true)
    ];

    const sorted = applyCandidateSort(list, 'spec', ORDER);

    expect(sorted.map((i) => i.id)).toEqual(['A', 'C', 'B']);
  });

  test('orders by newest created_at in created mode', () => {
    const list = [issue('A', 100, true), issue('C', 300, false)];

    const sorted = applyCandidateSort(list, 'created', ORDER);

    expect(sorted.map((i) => i.id)).toEqual(['C', 'A']);
  });

  test('falls back to spec mode for an unknown mode', () => {
    const list = [issue('A', 100, false), issue('B', 200, true)];

    const sorted = applyCandidateSort(
      list,
      /** @type {any} */ ('nonsense'),
      ORDER
    );

    expect(sorted.map((i) => i.id)).toEqual(['B', 'A']);
  });

  test('leaves the input array untouched', () => {
    const list = [issue('A', 100, false), issue('B', 200, true)];

    applyCandidateSort(list, 'spec', ORDER);

    expect(list.map((i) => i.id)).toEqual(['A', 'B']);
  });
});

describe('candidate sort — view (UI-raqh §2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @returns {HTMLElement}
   */
  function mountMerged() {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf());
    presetCandidateFilter({ show_blocked: true });
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  test('renders the sort select in the candidate pane header', () => {
    const mount = mountMerged();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort')
    );
    expect(Array.from(select.options).map((o) => o.value)).toEqual([
      'spec',
      'board',
      'created'
    ]);
  });

  test('defaults to spec-first when nothing is stored', () => {
    const mount = mountMerged();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort')
    );
    expect(select.value).toBe('spec');
  });

  test('reorders the lane when the mode changes', () => {
    const mount = mountMerged();
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort')
    );

    select.value = 'created';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(candidateOrder(mount)).toEqual(['C', 'B', 'A']);
  });

  test('persists the selected mode', () => {
    const mount = mountMerged();
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort')
    );

    select.value = 'board';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.worker.candidate_sort')).toBe(
      'board'
    );
  });

  test('restores a persisted mode on mount', () => {
    window.localStorage.setItem('bdui.worker.candidate_sort', 'created');

    const mount = mountMerged();

    expect(candidateOrder(mount)).toEqual(['C', 'B', 'A']);
  });

  test('falls back to the default for an unknown stored mode', () => {
    window.localStorage.setItem('bdui.worker.candidate_sort', 'nonsense');

    const mount = mountMerged();

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort')
    );
    expect(select.value).toBe('spec');
  });
});

describe('poller activity badge — projection (UI-raqh §3)', () => {
  test('renames 관측 대기 to 확인중 while an observation runs', () => {
    expect(activityBadge('관측 대기', 'checking')).toEqual({
      label: '확인중',
      live: true
    });
  });

  test('renames 로컬검증 대기 to 로컬검증 실행 중 while the suite runs', () => {
    expect(activityBadge('로컬검증 대기', 'verifying')).toEqual({
      label: '로컬검증 실행 중',
      live: true
    });
  });

  test('leaves 관측 대기 alone when nothing is running', () => {
    expect(activityBadge('관측 대기', null)).toEqual({
      label: '관측 대기',
      live: false
    });
  });

  test('leaves a CI badge alone while the poller works', () => {
    expect(activityBadge('CI ✓', 'checking')).toEqual({
      label: 'CI ✓',
      live: false
    });
  });

  test('does not cross the two substitutions', () => {
    expect(activityBadge('관측 대기', 'verifying')).toEqual({
      label: '관측 대기',
      live: false
    });
  });
});

describe('poller activity badge — view (UI-raqh §3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} gate
   * @param {any} activity
   * @returns {HTMLElement}
   */
  function renderRow(gate, activity) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        pr_observations: {
          'RD-1': {
            pr: {
              number: 304,
              url: 'https://github.com/o/r/pull/304',
              state: 'OPEN',
              head_sha: 'a'.repeat(40)
            },
            ci: null,
            verify: null,
            error: null,
            observed_at: 1,
            gate
          }
        },
        pr_activity: activity
          ? { 'RD-1': { activity, merge_progress: null } }
          : {}
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
  }

  const UNOBSERVED = {
    enabled: false,
    tier: 'unobserved',
    gate_badge: '관측 대기',
    base_badge: '',
    reason: 'not_observed'
  };
  const VERIFY_PENDING = {
    enabled: false,
    tier: 'local_verify',
    gate_badge: '로컬검증 대기',
    base_badge: '최신',
    reason: 'verify_missing'
  };
  const CI_PASS = {
    enabled: true,
    tier: 'ci',
    gate_badge: 'CI ✓',
    base_badge: '최신',
    reason: null
  };

  test('shows 확인중 with a breathing dot while observing', () => {
    const row = renderRow(UNOBSERVED, 'checking');

    const badge = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__badge--activity')
    );
    expect(badge.textContent?.trim()).toBe('확인중');
    expect(badge.querySelector('.act-dot')).not.toBe(null);
  });

  test('shows 로컬검증 실행 중 while the local suite runs', () => {
    const row = renderRow(VERIFY_PENDING, 'verifying');

    expect(
      row.querySelector('.worker-mini__badge--activity')?.textContent?.trim()
    ).toBe('로컬검증 실행 중');
  });

  test('keeps the settled badge when nothing is running', () => {
    const row = renderRow(UNOBSERVED, null);

    expect(row.querySelector('.worker-mini__badge--activity')).toBe(null);
    expect(row.textContent).toContain('관측 대기');
  });

  test('leaves a CI badge untouched while the poller works', () => {
    const row = renderRow(CI_PASS, 'checking');

    expect(row.querySelector('.worker-mini__badge--activity')).toBe(null);
    expect(row.textContent).toContain('CI ✓');
  });

  test('draws the activity badge without the alert colour', () => {
    const row = renderRow(UNOBSERVED, 'checking');

    const badge = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__badge--activity')
    );
    expect(badge.classList.contains('worker-mini__badge--alert')).toBe(false);
  });
});

describe('merge progress — projection (UI-raqh §4)', () => {
  test('labels the first step as 1 of 7', () => {
    expect(mergeStepView('merging')).toEqual({
      label: '머지 중',
      index: 1,
      total: 7,
      percent: 14
    });
  });

  test('labels the last step as 7 of 7', () => {
    expect(mergeStepView('parent_close')).toMatchObject({
      label: '부모 close',
      index: 7,
      total: 7,
      percent: 100
    });
  });

  test('translates every cleanup step to Korean', () => {
    const labels = [
      'base_sync',
      'post_merge_verify',
      'deploy',
      'child_sweep',
      'branch_cleanup'
    ].map((s) => mergeStepView(s)?.label);

    expect(labels).toEqual([
      'base 동기화',
      '머지 후 검증',
      '배포',
      '자식 정리',
      '브랜치 정리'
    ]);
  });

  test('returns null when no merge is running', () => {
    expect(mergeStepView(null)).toBe(null);
  });

  test('still renders an unknown step, without a position', () => {
    expect(mergeStepView('teleport')).toMatchObject({
      label: 'teleport',
      index: 0
    });
  });
});

describe('merge progress — view (UI-raqh §4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  const GATE_OK = {
    enabled: true,
    tier: 'ci',
    gate_badge: 'CI ✓',
    base_badge: '최신',
    reason: null
  };

  /**
   * @param {any} activity
   * @param {any} [transport]
   * @returns {HTMLElement}
   */
  function mountRow(activity, transport) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        pr_observations: {
          'RD-1': {
            pr: {
              number: 304,
              url: 'https://github.com/o/r/pull/304',
              state: 'OPEN',
              head_sha: 'a'.repeat(40)
            },
            ci: null,
            verify: null,
            error: null,
            observed_at: 1,
            gate: GATE_OK
          }
        },
        pr_activity: activity ? { 'RD-1': activity } : {}
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: transport || vi.fn()
    });
    return mount;
  }

  test('shows the step name and its position while merging', () => {
    const mount = mountRow({
      activity: null,
      merge_progress: { step: 'deploy', started_at: 1 }
    });

    const step = /** @type {HTMLElement} */ (
      mount.querySelector('.merge-step')
    );
    expect(step.textContent?.replace(/\s+/g, '')).toBe('배포4/7');
  });

  test('marks the row and its progress width', () => {
    const mount = mountRow({
      activity: null,
      merge_progress: { step: 'deploy', started_at: 1 }
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.classList.contains('worker-mini--merging')).toBe(true);
    expect(row.getAttribute('style')).toContain('--progress: 57%');
  });

  test('disables both actions while merging', () => {
    const mount = mountRow({
      activity: null,
      merge_progress: { step: 'base_sync', started_at: 1 }
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(
      /** @type {HTMLButtonElement} */ (
        row.querySelector('.worker-mini__merge')
      ).disabled
    ).toBe(true);
    expect(
      /** @type {HTMLButtonElement} */ (
        row.querySelector('.worker-mini__discard')
      ).disabled
    ).toBe(true);
  });

  test('leaves the row alone when no merge is running', () => {
    const mount = mountRow(null);

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.classList.contains('worker-mini--merging')).toBe(false);
    expect(row.querySelector('.merge-step')).toBe(null);
  });

  test('covers the click with a local pending step before the snapshot lands', async () => {
    /** @type {(v: any) => void} */
    let release = () => {};
    const transport = vi.fn(
      (/** @type {string} */ type) =>
        new Promise((resolve) => {
          if (type === 'worker-pr-merge') {
            release = resolve;
          } else {
            resolve({ applied: true, conflict: false });
          }
        })
    );
    const mount = mountRow(null, transport);
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    ).click();
    await flush();

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.querySelector('.merge-step')?.textContent).toContain('머지 중');

    release({ ok: true, action: 'merged', conflict: false });
    await flush();
    expect(
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .merge-step')
    ).toBe(null);
  });

  test('lets the server step supersede the local pending one', async () => {
    const mount = mountRow({
      activity: null,
      merge_progress: { step: 'child_sweep', started_at: 1 }
    });

    expect(
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .merge-step')
        ?.textContent
    ).toContain('자식 정리');
  });
});

/**
 * Install a `matchMedia` that reports the mobile breakpoint. jsdom ships none
 * at all, so every other test in this file renders the desktop composition and
 * only these opt in (UI-58y2).
 *
 * @param {boolean} matches
 */
function stubMatchMedia(matches) {
  /** @type {Array<(ev: any) => void>} */
  const listeners = [];
  const mql = {
    matches,
    media: '(max-width: 640px)',
    /**
     * @param {string} _type
     * @param {(ev: any) => void} fn
     */
    addEventListener(_type, fn) {
      listeners.push(fn);
    },
    removeEventListener() {},
    /** @param {boolean} next */
    emit(next) {
      mql.matches = next;
      for (const fn of listeners.slice()) {
        fn({ matches: next });
      }
    }
  };
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: () => mql
  });
  return mql;
}

function clearMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: undefined
  });
}

describe('candidate queue button — [대기로 ↴] (UI-58y2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} transport
   * @returns {HTMLElement} A view over seedCandidates() with blocked shown, so
   * the blocked-with-spec candidate BL-1 is on screen too.
   */
  function mountWithBlocked(transport) {
    window.localStorage.setItem(
      'beads-ui.worker.candidate-filter',
      JSON.stringify({ show_blocked: true, spec: 'all' })
    );
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ queue: [{ bead_id: 'QQ-1', added_at: 1 }] }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} bead_id
   * @returns {HTMLButtonElement}
   */
  const placeBtn = (mount, bead_id) =>
    /** @type {HTMLButtonElement} */ (
      mount.querySelector(
        `.worker-card[data-bead-id="${bead_id}"] .worker-card__place`
      )
    );

  test('places the candidate at the tail of the waiting queue', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountWithBlocked(transport);

    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
      index: 1,
      expected_revision: 1
    });
  });

  test('disables the button on a spec-less candidate', () => {
    const mount = mountWithBlocked(vi.fn());

    expect(placeBtn(mount, 'RD-2').disabled).toBe(true);
  });

  test('keeps the button enabled on a blocked candidate that has a spec', () => {
    const mount = mountWithBlocked(vi.fn());

    expect(placeBtn(mount, 'BL-1').disabled).toBe(false);
  });

  test('sends nothing when a spec-less candidate button is clicked', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountWithBlocked(transport);

    placeBtn(mount, 'RD-2').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    await flush();

    expect(transport).not.toHaveBeenCalled();
  });

  test('does not open the detail panel on a place click', async () => {
    const gotoIssue = vi.fn();
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn().mockResolvedValue({ ok: true }),
      gotoIssue
    });

    /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-card[data-bead-id="RD-1"] .worker-card__place'
      )
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(gotoIssue).not.toHaveBeenCalled();
  });
});

describe('mobile control-first layout (UI-58y2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
    stubMatchMedia(true);
  });

  afterEach(() => {
    clearMatchMedia();
  });

  const RUNNING_ATTEMPT = {
    a1: {
      attempt_id: 'a1',
      bead_id: 'RD-1',
      status: 'running',
      runner: 'claude',
      model: 'opus',
      started_at: 1,
      session_id: 's1'
    }
  };

  /**
   * @param {any} [over] - Queue snapshot overrides.
   * @param {any} [transport]
   * @returns {HTMLElement}
   */
  function mountMobile(over, transport) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf(over || {}));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: transport || vi.fn()
    });
    return mount;
  }

  test('orders the lanes 지금 → 대기 → 후보 → 완료', () => {
    const mount = mountMobile({ attempts: RUNNING_ATTEMPT });

    const ids = Array.from(
      mount.querySelectorAll('.worker-lanes--mobile > section')
    ).map((el) => el.id);

    expect(ids).toEqual([
      'worker-now',
      'worker-pane-queue',
      'worker-pane-candidate',
      'worker-pane-done'
    ]);
  });

  test('renders no 지금 panel when nothing runs and no PR waits', () => {
    const mount = mountMobile();

    expect(mount.querySelector('#worker-now')).toBe(null);
  });

  test('puts the running tile inside the 지금 panel', () => {
    const mount = mountMobile({ attempts: RUNNING_ATTEMPT });

    expect(
      mount.querySelector('#worker-now .rtile[data-bead-id="RD-1"]')
    ).not.toBe(null);
    expect(mount.querySelector('#worker-pane-running')).toBe(null);
  });

  test('puts a pr_wait row inside the 지금 panel', () => {
    const mount = mountMobile({
      pr_wait: [{ bead_id: 'RD-2', added_at: 1 }]
    });

    expect(
      mount.querySelector('#worker-now .worker-mini[data-bead-id="RD-2"]')
    ).not.toBe(null);
  });

  test('collapses 대기 and 완료 to strips on a first visit', () => {
    const mount = mountMobile();

    const queue_pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue')
    );
    expect(queue_pane.classList.contains('worker-pane--collapsed')).toBe(true);
    expect(queue_pane.querySelector('.worker-pane__body')).toBe(null);
    expect(queue_pane.dataset.lane).toBe('queue');
  });

  test('expands a strip when its header is tapped', () => {
    const mount = mountMobile({ queue: [{ bead_id: 'RD-1', added_at: 1 }] });

    /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue .worker-pane__hd--toggle')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const queue_pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue')
    );
    expect(queue_pane.classList.contains('worker-pane--collapsed')).toBe(false);
    expect(
      queue_pane.querySelector('.worker-mini[data-bead-id="RD-1"]')
    ).not.toBe(null);
  });

  test('stores the collapse state on every toggle', () => {
    const mount = mountMobile();

    /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-done .worker-pane__hd--toggle')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.worker.lane-collapsed') || '{}'
      )
    ).toEqual({ queue: true, done: false });
  });

  test('restores a stored collapse state on mount', () => {
    window.localStorage.setItem(
      'beads-ui.worker.lane-collapsed',
      JSON.stringify({ queue: false, done: true })
    );

    const mount = mountMobile();

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('#worker-pane-queue')
      ).classList.contains('worker-pane--collapsed')
    ).toBe(false);
  });

  test('falls back to the defaults on a malformed stored collapse state', () => {
    window.localStorage.setItem('beads-ui.worker.lane-collapsed', '{oops');

    const mount = mountMobile();

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('#worker-pane-done')
      ).classList.contains('worker-pane--collapsed')
    ).toBe(true);
  });

  test('previews the first waiting row on the collapsed strip', () => {
    const mount = mountMobile({ queue: [{ bead_id: 'RD-1', added_at: 1 }] });

    expect(
      mount.querySelector('#worker-pane-queue .worker-pane__preview')
        ?.textContent
    ).toContain('ready with spec');
  });

  test('appends to the queue when a candidate is dropped on a collapsed strip', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountMobile(
      { queue: [{ bead_id: 'QQ-1', added_at: 1 }] },
      transport
    );

    drag(mount, 'RD-1', 'worker-pane-queue');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
      index: 1,
      expected_revision: 1
    });
  });

  test('switches back to the five-pane row when the viewport widens', () => {
    const mql = stubMatchMedia(true);
    const mount = mountMobile({ attempts: RUNNING_ATTEMPT });

    mql.emit(false);

    expect(mount.querySelector('.worker-lanes--mobile')).toBe(null);
    expect(mount.querySelector('#worker-pane-running')).not.toBe(null);
  });
});

describe('worker toolbar KPI chips (UI-58y2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} over
   * @returns {HTMLElement}
   */
  function mountKpi(over) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf(over));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  test('counts 실행 · PR 대기 · 오늘 완료 in the toolbar', () => {
    const mount = mountKpi({
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'running',
          started_at: 1,
          session_id: 's1'
        }
      },
      pr_wait: [{ bead_id: 'RD-2', added_at: 1 }],
      done: [{ bead_id: 'BL-1', added_at: 1 }]
    });

    const chips = Array.from(mount.querySelectorAll('.worker-kpi__chip')).map(
      (el) => (el.textContent || '').replace(/\s+/g, ' ').trim()
    );

    expect(chips).toEqual(['실행 1', 'PR 대기 1', '오늘 완료 1']);
  });

  test('sums the completed sessions token usage into one chip', () => {
    const mount = mountKpi({
      done: [
        { bead_id: 'RD-1', added_at: 1 },
        { bead_id: 'RD-2', added_at: 2 }
      ],
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'succeeded',
          usage: { input_tokens: 1000, output_tokens: 200 }
        },
        a2: {
          attempt_id: 'a2',
          bead_id: 'RD-2',
          status: 'succeeded',
          usage: { input_tokens: 800, output_tokens: 0 }
        }
      }
    });

    expect(mount.querySelector('.worker-kpi__chip--tokens')?.textContent).toBe(
      'τ 2.0k'
    );
  });

  test('renders no token chip when no completed session reported usage', () => {
    const mount = mountKpi({ done: [{ bead_id: 'RD-1', added_at: 1 }] });

    expect(mount.querySelector('.worker-kpi__chip--tokens')).toBe(null);
  });
});

describe('running tile stage accent (UI-58y2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {'running'|'paused'} status
   * @returns {HTMLElement}
   */
  function mountTile(status) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status,
            started_at: 1,
            session_id: 's1'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  test('draws the liveness accent on a running tile', () => {
    const mount = mountTile('running');

    expect(mount.querySelector('.rtile .rtile__accent')).not.toBe(null);
  });

  test('draws no accent on a paused tile', () => {
    const mount = mountTile('paused');

    expect(mount.querySelector('.rtile .rtile__accent')).toBe(null);
  });

  test('gives the running lane header a live dot', () => {
    const mount = mountTile('running');

    const pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-running')
    );
    expect(pane.classList.contains('worker-pane--live')).toBe(true);
    expect(pane.querySelector('.worker-pane__dot--running')).not.toBe(null);
  });

  test('leaves the running lane header still when only a paused tile is there', () => {
    const mount = mountTile('paused');

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('#worker-pane-running')
      ).classList.contains('worker-pane--live')
    ).toBe(false);
  });
});

describe('mobile sticky ribbon (UI-58y2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
    stubMatchMedia(true);
  });

  afterEach(() => {
    clearMatchMedia();
  });

  /**
   * @param {any} [over]
   * @returns {HTMLElement}
   */
  function mountRibbon(over) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf(over || {}));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  test('carries the auto-advance toggle and the three counts', () => {
    const mount = mountRibbon({
      pr_wait: [{ bead_id: 'RD-2', added_at: 1 }],
      done: [{ bead_id: 'BL-1', added_at: 1 }]
    });

    const ribbon = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-ribbon')
    );
    expect(ribbon.querySelector('.worker-play')).not.toBe(null);
    expect(
      Array.from(ribbon.querySelectorAll('.worker-kpi__chip')).map((el) =>
        (el.textContent || '').replace(/\s+/g, ' ').trim()
      )
    ).toEqual(['실행 0', 'PR 대기 1', '오늘 완료 1']);
  });

  test('keeps the slot stepper and settings out of the ribbon', () => {
    const mount = mountRibbon();

    const ribbon = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-ribbon')
    );
    expect(ribbon.querySelector('.worker-slots__input')).toBe(null);
    expect(ribbon.querySelector('.worker-exec-defaults-btn')).toBe(null);
    expect(mount.querySelector('.worker-slots__input')).not.toBe(null);
    expect(mount.querySelector('.worker-exec-defaults-btn')).not.toBe(null);
  });

  test('leaves the failure banner outside the ribbon', () => {
    const mount = mountRibbon({
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'failed',
          repo: 'r',
          cause: 'boom'
        }
      }
    });

    expect(mount.querySelector('.worker-banner--failure')).not.toBe(null);
    expect(mount.querySelector('.worker-ribbon .worker-banner--failure')).toBe(
      null
    );
  });

  test('publishes the measured header height as the ribbon sticky offset', () => {
    document.body.innerHTML =
      '<header class="app-header"></header><div id="m"></div>';
    const header = /** @type {HTMLElement} */ (
      document.querySelector('.app-header')
    );
    header.getBoundingClientRect = () =>
      /** @type {any} */ ({ height: 96, width: 0, top: 0, left: 0 });

    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('.worker-console')
      ).style.getPropertyValue('--worker-ribbon-top')
    ).toBe('96px');
  });
});

describe('token KPI zero handling (UI-58y2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  test('shows an explicit zero rather than hiding the chip', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        done: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'succeeded',
            usage: { input_tokens: 0, output_tokens: 0 }
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    expect(mount.querySelector('.worker-kpi__chip--tokens')?.textContent).toBe(
      'τ 0'
    );
  });
});

describe('충돌 해소 세션 가시화 (UI-dxgz)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /** CI is green but the branch conflicts with base — the UI-2yoq case. */
  const CONFLICTING = {
    enabled: true,
    tier: 'ci',
    gate_badge: 'CI ✓',
    base_badge: '충돌',
    reason: null
  };
  const CLEAN = {
    enabled: true,
    tier: 'ci',
    gate_badge: 'CI ✓',
    base_badge: '최신',
    reason: null
  };
  const UNOBSERVED = {
    enabled: false,
    tier: 'unobserved',
    gate_badge: '관측 대기',
    base_badge: '충돌',
    reason: 'not_observed'
  };

  /**
   * @param {{ gate?: any, attempts?: Record<string, any>, activity?: any }} [over]
   * @returns {HTMLElement}
   */
  function mountBoard(over = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        pr_observations: {
          'RD-1': {
            pr: {
              number: 304,
              url: 'https://github.com/o/r/pull/304',
              state: 'OPEN',
              head_sha: 'a'.repeat(40)
            },
            ci: null,
            verify: null,
            error: null,
            observed_at: 1,
            gate: over.gate || CONFLICTING
          }
        },
        pr_activity: over.activity ? { 'RD-1': over.activity } : {},
        attempts: over.attempts || {}
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  /**
   * @param {Partial<any>} [over]
   * @returns {Record<string, any>}
   */
  function resolutionAttempt(over = {}) {
    return {
      c1: {
        attempt_id: 'c1',
        bead_id: 'RD-1',
        status: 'running',
        runner: 'claude',
        model: 'opus',
        session_id: 'sid-1',
        started_at: Date.now() - 3000,
        conflict_resolution: true,
        ...over
      }
    };
  }

  /**
   * @param {HTMLElement} mount
   * @returns {HTMLElement}
   */
  function card(mount) {
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} selector
   * @returns {HTMLButtonElement}
   */
  function button(mount, selector) {
    return /** @type {HTMLButtonElement} */ (
      card(mount).querySelector(selector)
    );
  }

  test('marks a running resolution tile 충돌 해소', () => {
    const mount = mountBoard({ attempts: resolutionAttempt() });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="c1"]')
    );
    expect(tile.querySelector('.worker-mini__badge')?.textContent).toBe(
      '충돌 해소'
    );
  });

  test('marks a leaf-paused resolution tile 충돌 해소 일시정지', () => {
    const mount = mountBoard({
      attempts: resolutionAttempt({ status: 'paused' })
    });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="c1"]')
    );
    expect(tile.classList.contains('rtile--paused')).toBe(true);
    expect(tile.querySelector('.worker-mini__badge')?.textContent).toBe(
      '충돌 해소 일시정지'
    );
  });

  test('leaves an ordinary running tile unbadged', () => {
    const mount = mountBoard({
      attempts: resolutionAttempt({ conflict_resolution: false })
    });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="c1"]')
    );
    expect(tile.querySelector('.worker-mini__badge')).toBe(null);
  });

  test('shows 충돌 해소 중 as the live badge on the pr_wait card', () => {
    const mount = mountBoard({ attempts: resolutionAttempt() });

    const badge = /** @type {HTMLElement} */ (
      card(mount).querySelector('.worker-mini__badge--activity')
    );
    expect(badge.textContent?.trim()).toBe('충돌 해소 중');
    expect(badge.querySelector('.act-dot')).not.toBe(null);
  });

  test('disables both actions while a resolution session runs', () => {
    const mount = mountBoard({ attempts: resolutionAttempt() });

    expect(button(mount, '.worker-mini__merge').disabled).toBe(true);
    expect(button(mount, '.worker-mini__merge').getAttribute('title')).toBe(
      '충돌 해소 세션 실행 중 — 완료 후 다시 머지하세요'
    );
    expect(button(mount, '.worker-mini__discard').disabled).toBe(true);
    expect(button(mount, '.worker-mini__discard').getAttribute('title')).toBe(
      '충돌 해소 세션 있음 — 폐기하려면 먼저 세션을 정리하세요'
    );
  });

  test('keeps the actions disabled while the session is paused, without a live dot', () => {
    const mount = mountBoard({
      attempts: resolutionAttempt({ status: 'paused' })
    });

    expect(card(mount).textContent).toContain('충돌 해소 일시정지');
    expect(card(mount).querySelector('.worker-mini__badge--activity')).toBe(
      null
    );
    expect(button(mount, '.worker-mini__merge').disabled).toBe(true);
    expect(button(mount, '.worker-mini__merge').getAttribute('title')).toBe(
      '충돌 해소 세션 일시정지 — 재개 후 완료되면 머지하세요'
    );
    expect(button(mount, '.worker-mini__discard').disabled).toBe(true);
  });

  test('suppresses the poller activity badge while a resolution session runs', () => {
    const mount = mountBoard({
      gate: UNOBSERVED,
      activity: { activity: 'checking', merge_progress: null },
      attempts: resolutionAttempt()
    });

    expect(
      card(mount)
        .querySelector('.worker-mini__badge--activity')
        ?.textContent?.trim()
    ).toBe('충돌 해소 중');
    expect(card(mount).textContent).not.toContain('확인중');
    expect(card(mount).textContent).toContain('관측 대기');
  });

  test('reads the action button as 충돌 해소 on a conflicting gate', () => {
    const mount = mountBoard();

    expect(button(mount, '.worker-mini__merge').textContent?.trim()).toBe(
      '충돌 해소'
    );
    expect(button(mount, '.worker-mini__merge').disabled).toBe(false);
  });

  test('keeps 머지 on a clean gate', () => {
    const mount = mountBoard({ gate: CLEAN });

    expect(button(mount, '.worker-mini__merge').textContent?.trim()).toBe(
      '머지'
    );
  });

  test('keeps the merge-in-flight discard tooltip on the merge path', () => {
    const mount = mountBoard({
      gate: CLEAN,
      activity: { activity: null, merge_progress: { step: 'base_sync' } }
    });

    expect(button(mount, '.worker-mini__discard').getAttribute('title')).toBe(
      '머지 진행 중 — 폐기할 수 없습니다'
    );
    expect(button(mount, '.worker-mini__merge').textContent?.trim()).toBe(
      '머지'
    );
  });

  test('keeps the marking on a resumed resolution child, which carries no flag of its own', () => {
    const mount = mountBoard({
      attempts: {
        ...resolutionAttempt({ status: 'paused' }),
        c2: {
          attempt_id: 'c2',
          bead_id: 'RD-1',
          status: 'running',
          runner: 'claude',
          model: 'opus',
          session_id: 'sid-1',
          started_at: Date.now() - 1000,
          resumed_from: 'c1',
          conflict_resolution: false
        }
      }
    });

    // The spent ancestor is history; only the resumed child renders.
    expect(mount.querySelector('.rtile[data-attempt-id="c1"]')).toBe(null);
    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="c2"]')
    );
    expect(tile.querySelector('.worker-mini__badge')?.textContent).toBe(
      '충돌 해소'
    );
    expect(
      card(mount)
        .querySelector('.worker-mini__badge--activity')
        ?.textContent?.trim()
    ).toBe('충돌 해소 중');
    expect(button(mount, '.worker-mini__merge').disabled).toBe(true);
    expect(button(mount, '.worker-mini__discard').disabled).toBe(true);
  });

  test('does not inherit the flag onto an unrelated later attempt', () => {
    const mount = mountBoard({
      attempts: {
        ...resolutionAttempt({ status: 'done' }),
        c3: {
          attempt_id: 'c3',
          bead_id: 'RD-1',
          status: 'running',
          runner: 'claude',
          model: 'opus',
          started_at: Date.now() - 1000,
          conflict_resolution: false
        }
      }
    });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="c3"]')
    );
    expect(tile.querySelector('.worker-mini__badge')).toBe(null);
    expect(button(mount, '.worker-mini__merge').disabled).toBe(false);
  });

  test('restores the card once the resolution session ends', () => {
    const mount = mountBoard({
      attempts: resolutionAttempt({ status: 'done' })
    });

    expect(card(mount).textContent).not.toContain('충돌 해소 중');
    expect(button(mount, '.worker-mini__merge').disabled).toBe(false);
    expect(button(mount, '.worker-mini__discard').disabled).toBe(false);
    expect(button(mount, '.worker-mini__merge').textContent?.trim()).toBe(
      '충돌 해소'
    );
  });
});

describe('worker view — server-decorated bead titles (UI-12k6)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} queue
   * @returns {HTMLElement}
   */
  function render(queue) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queue);
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} bead_id
   * @returns {string}
   */
  function titleOf(mount, bead_id) {
    const el = mount.querySelector(
      `.worker-mini[data-bead-id="${bead_id}"] .worker-mini__title`
    );
    return el?.textContent?.trim() || '';
  }

  test('renders the decorated title on a pr_wait card', () => {
    const mount = render(
      queueOf({
        pr_wait: [{ bead_id: 'PW-9', added_at: 1 }],
        bead_titles: { 'PW-9': 'PR 대기 제목' }
      })
    );

    expect(titleOf(mount, 'PW-9')).toBe('PR 대기 제목');
  });

  test('renders the decorated title on a done card', () => {
    const mount = render(
      queueOf({
        done: [{ bead_id: 'DN-9', added_at: 1 }],
        bead_titles: { 'DN-9': '완료 제목' }
      })
    );

    expect(titleOf(mount, 'DN-9')).toBe('완료 제목');
  });

  test('falls back to the bead id when the server sends no bead_titles', () => {
    const mount = render(
      queueOf({
        pr_wait: [{ bead_id: 'PW-9', added_at: 1 }],
        done: [{ bead_id: 'DN-9', added_at: 2 }]
      })
    );

    expect(titleOf(mount, 'PW-9')).toBe('PW-9');
    expect(titleOf(mount, 'DN-9')).toBe('DN-9');
  });

  test('falls back to the bead id for an entry missing from bead_titles', () => {
    const mount = render(
      queueOf({
        pr_wait: [{ bead_id: 'PW-9', added_at: 1 }],
        done: [{ bead_id: 'DN-9', added_at: 2 }],
        bead_titles: { 'PW-9': 'PR 대기 제목' }
      })
    );

    expect(titleOf(mount, 'PW-9')).toBe('PR 대기 제목');
    expect(titleOf(mount, 'DN-9')).toBe('DN-9');
  });

  test('prefers the live Ready/Blocked title over the decorated one', () => {
    const mount = render(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        done: [{ bead_id: 'BL-1', added_at: 2 }],
        bead_titles: { 'RD-1': '오래된 제목', 'BL-1': '오래된 blocked 제목' }
      })
    );

    expect(titleOf(mount, 'RD-1')).toBe('ready with spec');
    expect(titleOf(mount, 'BL-1')).toBe('blocked with spec');
  });
});

describe('외부 세션 PR 행 (UI-7agi §5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  const OPEN_GREEN = {
    enabled: true,
    tier: 'ci',
    gate_badge: 'CI ✓',
    base_badge: '최신',
    reason: null
  };
  const CONFLICTING = {
    enabled: true,
    tier: 'ci',
    gate_badge: 'CI ✓',
    base_badge: '충돌',
    reason: null
  };
  const MERGED = {
    enabled: false,
    tier: 'merged',
    gate_badge: '머지됨',
    base_badge: '머지됨',
    reason: null
  };
  const CLOSED = {
    enabled: false,
    tier: 'closed_unmerged',
    gate_badge: 'PR closed',
    base_badge: 'PR closed',
    reason: 'pr_closed_unmerged'
  };

  /**
   * @param {any} gate
   * @param {{ external?: boolean }} [over]
   * @returns {HTMLElement}
   */
  function mountRow(gate, over = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        pr_wait: [
          {
            bead_id: 'RD-1',
            added_at: 1,
            ...(over.external === false ? {} : { external: true })
          }
        ],
        pr_observations: {
          'RD-1': {
            pr: {
              number: 777,
              url: 'https://github.com/o/r/pull/777',
              state: 'OPEN',
              head_sha: 'a'.repeat(40)
            },
            ci: null,
            verify: null,
            error: null,
            observed_at: 1,
            gate
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @returns {string[]}
   */
  function badgesOf(mount) {
    return Array.from(mount.querySelectorAll('.worker-mini__badge')).map(
      (b) => b.textContent?.trim() || ''
    );
  }

  test('marks an external row with a 세션 badge', () => {
    const mount = mountRow(OPEN_GREEN);

    expect(badgesOf(mount)).toContain('세션');
  });

  test('leaves a worker row without the 세션 badge', () => {
    const mount = mountRow(OPEN_GREEN, { external: false });

    expect(badgesOf(mount)).not.toContain('세션');
  });

  test('hides 폐기 on an external row', () => {
    const mount = mountRow(OPEN_GREEN);

    expect(mount.querySelector('.worker-mini__discard')).toBe(null);
  });

  test('still merges an external row whose gate passes', () => {
    const mount = mountRow(OPEN_GREEN);

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(false);
  });

  test('offers 정리 on a merged external row — nothing auto-cleans it', () => {
    const mount = mountRow(MERGED);

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.textContent?.trim()).toBe('정리');
    expect(btn.disabled).toBe(false);
  });

  test('keeps a merged WORKER row quiet — its cleanup runs on its own', () => {
    const mount = mountRow(MERGED, { external: false });

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(true);
  });

  test('disables the button on a closed external PR and says 닫힘', () => {
    const mount = mountRow(CLOSED);

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(true);
    expect(badgesOf(mount)).toContain('닫힘');
  });

  test('disables 충돌 해소 on an external row and explains why', () => {
    const mount = mountRow(CONFLICTING);

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(true);
    expect(btn.textContent?.trim()).not.toBe('충돌 해소');
    expect(btn.getAttribute('title')).toContain('세션에서 직접 해소');
  });

  test('keeps 충돌 해소 clickable on a worker row', () => {
    const mount = mountRow(CONFLICTING, { external: false });

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(false);
    expect(btn.textContent?.trim()).toBe('충돌 해소');
  });
});
