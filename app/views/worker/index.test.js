import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from '../../data/exec-preset-store.js';
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
  mergeFailureText,
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
 * Start of the current local day, matching `closedRangeSince('today')`.
 *
 * @returns {number}
 */
function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
}

/**
 * The `runner_catalog` decoration every real snapshot carries (UI-jrb3 §7) —
 * the source the exec-defaults dialog renders its model selectors from.
 *
 * @returns {any}
 */
function catalogFixture() {
  return {
    runners: {
      claude: {
        command: 'claude',
        models: {
          opus: { id: 'opus' },
          sonnet: { id: 'sonnet' },
          haiku: { id: 'haiku' },
          fable: { id: 'fable' }
        },
        efforts: ['low', 'medium', 'high', 'xhigh'],
        default_model: 'opus'
      },
      codex: {
        command: 'codex',
        models: {
          sol: { id: 'gpt-5.6-sol', efforts: ['low', 'medium', 'high'] },
          terra: { id: 'gpt-5.6-terra', efforts: ['low', 'medium', 'high'] },
          luna: {
            id: 'gpt-5.6-luna',
            efforts: ['low', 'medium', 'high', 'xhigh', 'max']
          }
        },
        efforts: ['minimal', 'low', 'medium', 'high', 'xhigh']
      }
    },
    model_index: {
      opus: 'claude',
      sonnet: 'claude',
      haiku: 'claude',
      fable: 'claude',
      sol: 'codex',
      terra: 'codex',
      luna: 'codex'
    }
  };
}

/**
 * @param {Partial<any>} [over]
 * @returns {any}
 */
function queueOf(over = {}) {
  /** @type {any} */
  const q = {
    revision: 1,
    auto_advance: false,
    slots: 2,
    queue: [],
    done: [],
    attempts: {},
    runner_catalog: catalogFixture(),
    ...over
  };
  // 완료 레인은 기간 필터를 타고 기본값이 '오늘'이다 (UI-d7pw §3.2). 픽스처의
  // `added_at`은 1/2 같은 순서 표식이라 그대로 두면 1970년으로 읽혀 전부
  // 걸러진다. 오늘 자정을 더해 상대 순서는 그대로 두고 범위 안으로 옮긴다.
  // 판정은 SENTINEL 미만인지로만 한다 — "오늘 자정 이전"으로 잡으면 기간 필터
  // 자체를 검증하려고 실제 epoch 값을 넣은 테스트까지 덮어써 버린다.
  const SENTINEL_MAX = 1e6;
  if (Array.isArray(q.done)) {
    const base = startOfToday();
    /** @type {any[]} */
    const stamped = q.done.map((/** @type {any} */ e) =>
      typeof e.added_at === 'number' && e.added_at < SENTINEL_MAX
        ? { ...e, added_at: base + e.added_at }
        : e
    );
    q.done = stamped;
  }
  return q;
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
  const row = /** @type {HTMLElement} */ (
    mount.querySelector(
      `.worker-mini[data-bead-id="${bead_id}"], .worker-card[data-bead-id="${bead_id}"]`
    )
  );
  row.dispatchEvent(new Event('pointerdown', { bubbles: true }));
  const ds = new Event('dragstart', { bubbles: true });
  Object.defineProperty(ds, 'dataTransfer', { value: dt });
  row.dispatchEvent(ds);

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

  test('excludes worker-ineligible issues from the candidate lane', () => {
    const stores = seedCandidates();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'NO-WORKER',
        title: 'interactive only',
        status: 'open',
        metadata: { spec_id: 'SPEC-X' },
        labels: ['worker-ineligible']
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(
      mount.querySelector('.worker-card[data-bead-id="NO-WORKER"]')
    ).toBeNull();
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

  test('turning automation on sends the integrated toggle and updates its label', async () => {
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
    expect(play.textContent).toContain('▶ 자동화');

    play.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-automation-toggle', {
      on: true,
      expected_revision: 0
    });
    const toggled = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-play')
    );
    expect(toggled.classList.contains('is-active')).toBe(true);
    expect(toggled.textContent).toContain('⏸ 자동화 멈춤');
  });

  test('turning automation off sends the integrated toggle', async () => {
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

    expect(transport).toHaveBeenCalledWith('worker-automation-toggle', {
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

    // Two running tiles plus the unhandled failure tile rendered from attempts.
    const tiles = mount.querySelectorAll('.worker-rungrid .rtile');
    expect(tiles.length).toBe(3);
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

  /**
   * @param {Record<string, any>} over
   * @param {(type: string, payload?: unknown) => Promise<any>} [transport]
   */
  function mountAttemptTiles(over, transport = vi.fn()) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf(over));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    return mount;
  }

  test('projects unhandled failures before active attempts', () => {
    const mount = mountAttemptTiles({
      attempts: {
        eligible: {
          attempt_id: 'eligible',
          bead_id: 'ELIGIBLE',
          status: 'failed',
          session_id: 'sid-eligible'
        },
        orphaned: {
          attempt_id: 'orphaned',
          bead_id: 'ORPHANED',
          status: 'orphaned',
          session_id: 'sid-orphaned'
        },
        active: {
          attempt_id: 'active',
          bead_id: 'ACTIVE',
          status: 'running',
          session_id: 'sid-active',
          started_at: Date.now() - 1000
        }
      }
    });

    const tiles = /** @type {HTMLElement[]} */ (
      Array.from(mount.querySelectorAll('.worker-rungrid .rtile'))
    );
    expect(tiles.map((tile) => tile.dataset.attemptId)).toEqual([
      'eligible',
      'orphaned',
      'active'
    ]);
    expect(
      mount.querySelector('.worker-kpi__chip--running')?.textContent
    ).toContain('실행 1');
  });

  test('excludes a superseded failure tile', () => {
    const mount = mountAttemptTiles({
      attempts: {
        superseded: {
          attempt_id: 'superseded',
          bead_id: 'SUPER',
          status: 'failed'
        },
        child: {
          attempt_id: 'child',
          bead_id: 'SUPER',
          status: 'running'
        }
      }
    });

    expect(
      mount.querySelector('.rtile[data-attempt-id="superseded"]')
    ).toBeNull();
  });

  test('excludes a failure resolved by a done entry', () => {
    const finished_at = Date.now() - 1000;
    const mount = mountAttemptTiles({
      done: [{ bead_id: 'DONE', added_at: finished_at + 500 }],
      attempts: {
        resolved: {
          attempt_id: 'resolved',
          bead_id: 'DONE',
          status: 'failed',
          finished_at
        }
      }
    });

    expect(
      mount.querySelector('.rtile[data-attempt-id="resolved"]')
    ).toBeNull();
  });

  test('excludes a dismissed failure tile', () => {
    const mount = mountAttemptTiles({
      attempts: {
        dismissed: {
          attempt_id: 'dismissed',
          bead_id: 'DISMISSED',
          status: 'failed',
          dismissed_at: Date.now()
        }
      }
    });

    expect(
      mount.querySelector('.rtile[data-attempt-id="dismissed"]')
    ).toBeNull();
  });

  test('sends the failed tile resume payload with the current revision', async () => {
    const transport = vi.fn().mockResolvedValue({});
    const mount = mountAttemptTiles(
      {
        revision: 7,
        attempts: {
          failed: {
            attempt_id: 'failed',
            bead_id: 'FAILED',
            status: 'failed',
            session_id: 'sid-failed'
          }
        }
      },
      transport
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="failed"] .rtile__resume')
    ).click();
    await flush();
    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'failed',
      expected_revision: 7
    });
  });

  test('retries a runner mismatch only after the user selects a continuation', async () => {
    const decision_token = { source_attempt_id: 'failed', digest: 'one' };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        resumed: false,
        conflict: false,
        reason: 'runner_mismatch',
        continuation_mismatch: {
          prior_available: true,
          prior: { runner: 'codex', model: 'sol' },
          current: { runner: 'claude', model: 'opus' },
          decision_token
        }
      })
      .mockResolvedValueOnce({ resumed: true, conflict: false });
    const mount = mountAttemptTiles(
      {
        revision: 7,
        attempts: {
          failed: {
            attempt_id: 'failed',
            bead_id: 'FAILED',
            status: 'failed',
            session_id: 'sid-failed'
          }
        }
      },
      transport
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="failed"] .rtile__resume')
    ).click();
    await flush();
    expect(transport).toHaveBeenCalledTimes(1);

    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('.continuation-dialog button')[1]
    ).click();
    await flush();

    expect(transport).toHaveBeenLastCalledWith('worker-attempt-resume', {
      attempt_id: 'failed',
      expected_revision: 7,
      continuation: 'fresh_current',
      decision_token
    });
  });

  test('sends the failed tile dismiss payload with the current revision', async () => {
    const transport = vi.fn().mockResolvedValue({});
    const mount = mountAttemptTiles(
      {
        revision: 7,
        attempts: {
          failed: {
            attempt_id: 'failed',
            bead_id: 'FAILED',
            status: 'failed',
            session_id: 'sid-failed'
          }
        }
      },
      transport
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="failed"] .rtile__dismiss')
    ).click();
    await flush();
    expect(transport).toHaveBeenCalledWith('worker-attempt-dismiss', {
      attempt_id: 'failed',
      expected_revision: 7
    });
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
    // A paused tile offers ▶ (resume) + [폐기], never ⏸.
    expect(tile.querySelector('.rtile__resume')).not.toBeNull();
    expect(tile.querySelector('.rtile__discard')).not.toBeNull();
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

  test('a queue snapshot turning running→done drops the open drawer heartbeat', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    /**
     * @param {string} status
     */
    const snapshotWith = (status) =>
      queueOf({
        auto_advance: true,
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status,
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 3000
          }
        }
      });
    queueStore.set(snapshotWith('running'));
    const sessionLogStore = createSessionLogStore();
    sessionLogStore.set(
      'a1',
      [
        {
          type: 'assistant',
          message: { content: [{ type: 'text', text: 'go' }] }
        }
      ],
      Date.now()
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      sessionLogStore,
      transport: vi.fn().mockResolvedValue({ ok: true })
    });
    /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="a1"] .rtile__session')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(mount.querySelector('.sv__live-dot')).not.toBeNull();

    // The attempt finishes — the same queue push the view already listens to.
    queueStore.set(snapshotWith('done'));

    expect(mount.querySelector('.sv__live-dot')).toBeNull();
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

  test('running tile shows the current in_progress child title (UI-53es §2)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = seedCandidates();
    const now = Date.now();
    seed(stores, 'tab:worker:in-progress', [
      {
        id: 'S1.1',
        title: 'T1: 스캐폴딩',
        status: 'in_progress',
        parent: 'S1',
        updated_at: now - 60_000
      },
      {
        id: 'S1.2',
        title: 'T2: 서버 배선',
        status: 'in_progress',
        parent: 'S1',
        updated_at: now - 1_000
      }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'S1', added_at: 0 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'S1',
            status: 'running',
            started_at: now - 3000
          }
        }
      })
    );

    createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: vi.fn()
    });

    expect(
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__child')
        ?.textContent
    ).toContain('T2: 서버 배선');
  });

  test('running tile omits the child line when the bead has no in_progress child', () => {
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
            started_at: Date.now() - 3000
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
      mount.querySelector('.rtile[data-bead-id="S1"] .rtile__child')
    ).toBeNull();
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

  test('native top-level spec_id enables a candidate and conflicting dual disables it', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'NATIVE-1',
        title: 'native spec',
        status: 'open',
        spec_id: ' docs/native.md ',
        metadata: {}
      },
      {
        id: 'CONFLICT-1',
        title: 'conflicting spec',
        status: 'open',
        spec_id: 'docs/native.md',
        metadata: { spec_id: 'docs/legacy.md' }
      }
    ]);
    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const native = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="NATIVE-1"]')
    );
    const conflict = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="CONFLICT-1"]')
    );
    expect(native.getAttribute('draggable')).toBe('true');
    expect(conflict.getAttribute('draggable')).toBe('false');
    expect(conflict.textContent).toContain('spec_id_conflict');
  });

  test('candidate card renders a derived route as unset and keeps the 4-cell spec_backed stepper', () => {
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
            spec: { fill: 'full', glyph: 'review', stale: false },
            impl: { fill: 'dim', glyph: null, stale: false },
            pr: { fill: 'none', glyph: null, stale: false },
            merge: { fill: 'none', glyph: null, stale: false }
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
    expect(chip.textContent?.trim()).toBe('unset');
    expect(chip.title).toBe('route 미핀 (metadata unset)');

    // spec_backed → 4 stepper cells (spec/impl/pr/merge).
    expect(card.querySelectorAll('.stp .seg').length).toBe(4);
    const spec = /** @type {HTMLElement} */ (
      card.querySelector('.b-spec.full')
    );
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
            spec: { fill: 'full', glyph: 'review', stale: false },
            plan: { fill: 'full', glyph: 'skip', stale: false },
            impl: { fill: 'dim', glyph: 'review', stale: true },
            pr: { fill: 'none', glyph: null, stale: false },
            merge: { fill: 'none', glyph: null, stale: false }
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
    // review → ✓, skip → ⊘, stale → dim fill + `.stale` underline.
    expect(card.querySelector('.b-spec.full')?.textContent?.trim()).toBe('✓');
    expect(card.querySelector('.b-plan.full')?.textContent?.trim()).toBe('⊘');
    expect(card.querySelector('.b-impl.dim.stale')).not.toBeNull();
  });

  test('quick_fix candidate stays in the with-spec filter but cannot be queued', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'QF-1',
        title: 'quick fix candidate',
        status: 'open',
        metadata: { route: 'quick_fix', spec_id: 'legacy-spec' }
      }
    ]);
    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-candidate .worker-card[data-bead-id="QF-1"]'
      )
    );
    expect(card.querySelector('.worker-card__reason')?.textContent).toContain(
      'quick_fix · 워커 비대상'
    );
    expect(card.getAttribute('draggable')).toBe('false');
    expect(
      card.querySelector('.worker-card__place')?.getAttribute('title')
    ).toBe('quick_fix route는 워커 실행 대상이 아닙니다');

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-filter__chip[data-spec="with"]')
    ).click();

    expect(
      mount.querySelector(
        '#worker-pane-candidate .worker-card[data-bead-id="QF-1"]'
      )
    ).not.toBeNull();
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
    expect(dialog.querySelector('[data-exec-presets]')).not.toBeNull();
    expect(dialog.querySelector('[data-workspace-preset-select]')).toBeNull();
    expect(dialog.querySelectorAll('.exec-defaults__row')).toHaveLength(0);
  });

  test('assigning a workspace default via the preset card sends both current revisions', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ revision: 3 }));
    const execPresetStore = createExecPresetStore();
    execPresetStore.set({
      revision: 7,
      presets: [{ id: 'p1', name: '개발', settings: {} }]
    });
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      queue: queueOf({ revision: 4, default_exec_preset_id: 'p1' }),
      presets: {
        revision: 7,
        presets: [{ id: 'p1', name: '개발', settings: {} }]
      }
    });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      execPresetStore,
      transport
    });

    const dialog = openExecDefaults(mount);
    /** @type {HTMLButtonElement} */ (
      dialog.querySelector('[data-workspace-preset-assign="p1"]')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-default-exec-preset',
      {
        preset_id: 'p1',
        expected_queue_revision: 3,
        expected_preset_revision: 7
      }
    );
  });

  test('adopts both authoritative snapshots after a dual CAS conflict', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ revision: 3 }));
    const execPresetStore = createExecPresetStore();
    execPresetStore.set({
      revision: 7,
      presets: [{ id: 'p1', name: '초안', settings: {} }]
    });
    const transport = vi.fn().mockResolvedValue({
      applied: false,
      conflict: true,
      queue: queueOf({ revision: 4 }),
      presets: {
        revision: 8,
        presets: [{ id: 'p2', name: '최신', settings: {} }]
      }
    });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      execPresetStore,
      transport
    });

    const dialog = openExecDefaults(mount);
    /** @type {HTMLButtonElement} */ (
      dialog.querySelector('[data-workspace-preset-assign="p1"]')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(queueStore.get()?.revision).toBe(4);
    expect(execPresetStore.get()?.revision).toBe(8);
    expect(
      dialog.querySelector('[data-preset-id="p2"]')?.textContent
    ).toContain('최신');
  });

  /**
   * Open the ⚙ dialog over a queue snapshot carrying the given workspace info.
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

  test('renders the repo-ops verify script and timeout', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    const dialog = openWithWorkspaceInfo(mount, {
      repo_ops: {
        status: 'resolved',
        source_path: 'repo-ops/config.toml',
        base_ref: 'main',
        base_sha: 'a'.repeat(40),
        verify: { script: 'repo-ops/script/verify', timeout_ms: 600000 },
        deploy: null,
        error_code: null
      },
      slots: 2
    });

    const lane = /** @type {HTMLElement} */ (
      dialog.querySelector('[data-lane="verify"]')
    );
    expect(lane.querySelector('.exec-defaults__vd-cmd')?.textContent).toBe(
      'repo-ops/script/verify'
    );
    expect(lane.querySelector('.exec-defaults__vd-badge')?.textContent).toBe(
      'timeout 10분'
    );
  });

  test('keeps the repo-ops section read-only', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const dialog = openWithWorkspaceInfo(mount, {
      repo_ops: {
        status: 'resolved',
        source_path: 'repo-ops/config.toml',
        base_ref: 'main',
        base_sha: 'a'.repeat(40),
        verify: null,
        deploy: null,
        error_code: null
      },
      slots: 2
    });

    const section = /** @type {HTMLElement} */ (
      dialog.querySelector('.exec-defaults__vd')
    );
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
    expect(dialog.querySelector('.exec-defaults__vd')?.textContent).toContain(
      '선언 확인 중'
    );
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
    expect(
      mount.querySelector('.worker-banner--failure .worker-banner__discard')
    ).not.toBeNull();
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'f1',
      expected_revision: 1
    });
  });

  test('retries a failed discard from the failure banner with its receipt', () => {
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
        },
        discard_operations: {
          'op-failed': {
            operation_id: 'op-failed',
            bead_id: 'B1',
            attempt_id: 'f1',
            requested_at: 1,
            mode: 'unmerged',
            phase: 'runner_terminated',
            backup: { path: '/state/op-failed' },
            last_error: 'pr_observe_failed'
          }
        }
      })
    );
    const transport = vi.fn(async () => ({
      accepted: true,
      operation_id: 'op-failed',
      phase: 'runner_terminated'
    }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true)
    );

    const banner = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-banner--failure')
    );
    const retry = /** @type {HTMLButtonElement} */ (
      banner.querySelector('.worker-banner__discard')
    );
    expect(retry.textContent?.trim()).toBe('재시도');
    expect(banner.textContent).toContain('작업: op-failed');
    expect(banner.textContent).toContain('/state/op-failed');
    expect(banner.textContent).toContain('PR 정리 중');
    expect(banner.textContent).toContain('폐기 실패: pr_observe_failed');

    retry.click();

    expect(transport).toHaveBeenCalledWith('worker-discard', {
      bead_id: 'B1',
      attempt_id: 'f1',
      operation_id: 'op-failed',
      expected_revision: 1
    });
    vi.unstubAllGlobals();
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

describe('waiting execution mode controls (UI-nrut)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} [over]
   * @param {any} [transport]
   * @param {(id: string) => void} [gotoIssue]
   * @returns {{ mount: HTMLElement, queueStore: ReturnType<typeof createWorkerQueueStore> }}
   */
  function mountExecution(over = {}, transport = vi.fn(), gotoIssue) {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'A',
        title: 'live labels win',
        status: 'open',
        labels: [],
        updated_at: 200,
        metadata: { spec_id: 'S' }
      }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [
          { bead_id: 'B', added_at: 1 },
          { bead_id: 'C', added_at: 2 },
          { bead_id: 'A', added_at: 3 }
        ],
        bead_labels: {
          A: ['worker-serial'],
          B: [],
          C: ['worker-serial']
        },
        bead_times: {
          A: { updated_at: 100 }
        },
        ...over
      })
    );
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport,
      gotoIssue
    });
    return { mount, queueStore };
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} id
   */
  function selectWaitingRow(mount, id) {
    const checkbox = /** @type {HTMLInputElement} */ (
      mount.querySelector(
        `.worker-mini[data-bead-id="${id}"] .worker-mini__select`
      )
    );
    checkbox.checked = true;
    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
  }

  test('uses newer live issue labels over partial server labels and leaves missing labels unknown', () => {
    const { mount } = mountExecution({
      queue: [
        { bead_id: 'A', added_at: 1 },
        { bead_id: 'MISSING', added_at: 2 }
      ],
      bead_labels: { A: ['worker-serial'] }
    });

    expect(
      mount.querySelector('.worker-mini[data-bead-id="A"] .worker-mini__serial')
    ).toBeNull();
    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="MISSING"] .worker-mini__serial'
      )?.textContent
    ).toContain('실행 방식 확인 중');
  });

  test('keeps newer mutation-confirmed labels over stale live issue labels', () => {
    const { mount } = mountExecution({
      queue: [{ bead_id: 'A', added_at: 1 }],
      bead_labels: { A: ['worker-serial'] },
      bead_times: { A: { updated_at: 300 } }
    });

    expect(
      mount.querySelector('.worker-mini[data-bead-id="A"] .worker-mini__serial')
        ?.textContent
    ).toContain('머지까지 단독');
  });

  test('applies known selected changes in queue order and clears the selection', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ id: 'B', labels: ['worker-serial'] })
      .mockResolvedValueOnce({ id: 'A', labels: ['worker-serial'] });
    const { mount } = mountExecution({}, transport);
    selectWaitingRow(mount, 'A');
    selectWaitingRow(mount, 'B');

    const mode = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.worker-bulk__mode')
    );
    mode.value = 'serial';
    mode.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-bulk__apply')
    ).click();
    await flush();

    expect(transport).toHaveBeenNthCalledWith(1, 'label-add', {
      id: 'B',
      label: 'worker-serial'
    });
    expect(transport).toHaveBeenNthCalledWith(2, 'label-add', {
      id: 'A',
      label: 'worker-serial'
    });
    expect(mount.querySelector('.worker-bulk')).toBeNull();
    expect(document.querySelector('.toast')?.textContent).toBe(
      '2개 실행 방식 변경'
    );
  });

  test('retains only failed rows after independent bulk mutation failures', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ id: 'B', labels: ['worker-serial'] })
      .mockResolvedValueOnce([]);
    const { mount } = mountExecution({}, transport);
    selectWaitingRow(mount, 'B');
    selectWaitingRow(mount, 'A');
    const mode = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.worker-bulk__mode')
    );
    mode.value = 'serial';
    mode.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-bulk__apply')
    ).click();
    await flush();

    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector(
          '.worker-mini[data-bead-id="B"] .worker-mini__select'
        )
      ).checked
    ).toBe(false);
    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector(
          '.worker-mini[data-bead-id="A"] .worker-mini__select'
        )
      ).checked
    ).toBe(true);
    expect(document.querySelector('.toast')?.textContent).toContain(
      '2개 중 1개 변경 · 1개 실패 (A)'
    );
  });

  test('retains a row when the label readback contradicts the requested mode', async () => {
    const transport = vi.fn().mockResolvedValue({ id: 'B', labels: [] });
    const { mount } = mountExecution({}, transport);
    selectWaitingRow(mount, 'B');
    const mode = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.worker-bulk__mode')
    );
    mode.value = 'serial';
    mode.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-bulk__apply')
    ).click();
    await flush();

    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector(
          '.worker-mini[data-bead-id="B"] .worker-mini__select'
        )
      ).checked
    ).toBe(true);
    expect(document.querySelector('.toast')?.textContent).toContain(
      '1개 중 0개 변경 · 1개 실패 (B)'
    );
  });

  test('prevents a second bulk apply while the first batch is in flight', async () => {
    /** @type {(value: any) => void} */
    let resolveMutation = () => {};
    const pending = new Promise((resolve) => {
      resolveMutation = resolve;
    });
    const transport = vi.fn().mockReturnValue(pending);
    const { mount } = mountExecution({}, transport);
    selectWaitingRow(mount, 'B');
    const mode = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.worker-bulk__mode')
    );
    mode.value = 'serial';
    mode.dispatchEvent(new Event('change', { bubbles: true }));
    const apply = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-bulk__apply')
    );
    apply.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    apply.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledTimes(1);
    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-bulk__apply')
      ).disabled
    ).toBe(true);
    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('.worker-bulk__mode')
      ).disabled
    ).toBe(true);

    resolveMutation({ id: 'B', labels: ['worker-serial'] });
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
  });

  test('clears a no-op selection without sending a label mutation', async () => {
    const transport = vi.fn();
    const { mount } = mountExecution({}, transport);
    selectWaitingRow(mount, 'C');
    const mode = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.worker-bulk__mode')
    );
    mode.value = 'serial';
    mode.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-bulk__apply')
    ).click();
    await flush();

    expect(transport).not.toHaveBeenCalled();
    expect(mount.querySelector('.worker-bulk')).toBeNull();
    expect(document.querySelector('.toast')?.textContent).toBe(
      '이미 같은 실행 방식입니다'
    );
  });

  test('blocks unknown selected rows instead of treating them as ordinary no-ops', () => {
    const transport = vi.fn();
    const { mount } = mountExecution(
      {
        queue: [{ bead_id: 'UNKNOWN', added_at: 1 }],
        bead_labels: {}
      },
      transport
    );
    selectWaitingRow(mount, 'UNKNOWN');

    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-bulk__apply')
      ).disabled
    ).toBe(true);
    expect(transport).not.toHaveBeenCalled();
  });

  test('prunes selection when a selected bead leaves the queue', () => {
    const { mount, queueStore } = mountExecution();
    selectWaitingRow(mount, 'B');

    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'A', added_at: 1 }],
        bead_labels: { A: [] }
      })
    );

    expect(mount.querySelector('.worker-bulk')).toBeNull();
  });

  test('starts queue reorder from the row body', async () => {
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ revision: 4 })));
    const { mount } = mountExecution(
      {
        revision: 3,
        queue: [
          { bead_id: 'A', added_at: 1 },
          { bead_id: 'B', added_at: 2 }
        ]
      },
      transport
    );
    let stored = '';
    const dataTransfer = {
      getData: () => stored,
      setData: (/** @type {string} */ _type, /** @type {string} */ value) => {
        stored = value;
      },
      effectAllowed: '',
      dropEffect: ''
    };
    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="B"]')
    );
    row.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    const rowDrag = new Event('dragstart', { bubbles: true });
    Object.defineProperty(rowDrag, 'dataTransfer', { value: dataTransfer });
    row.dispatchEvent(rowDrag);
    const pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue')
    );
    const drop = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(drop, 'dataTransfer', { value: dataTransfer });
    pane.dispatchEvent(drop);
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-reorder', {
      bead_id: 'B',
      to_index: 2,
      expected_revision: 3
    });
  });

  test('cancels a drag that starts on an interactive row child', async () => {
    const transport = vi.fn();
    const { mount } = mountExecution(
      {
        revision: 3,
        queue: [
          { bead_id: 'A', added_at: 1 },
          { bead_id: 'B', added_at: 2 }
        ]
      },
      transport
    );
    let stored = '';
    const dataTransfer = {
      getData: () => stored,
      setData: (/** @type {string} */ _type, /** @type {string} */ value) => {
        stored = value;
      },
      effectAllowed: '',
      dropEffect: ''
    };
    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="B"]')
    );
    const checkbox = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__select')
    );
    checkbox.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    const rowDrag = new Event('dragstart', { bubbles: true, cancelable: true });
    Object.defineProperty(rowDrag, 'dataTransfer', { value: dataTransfer });
    row.dispatchEvent(rowDrag);

    expect(rowDrag.defaultPrevented).toBe(true);

    const pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue')
    );
    const drop = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(drop, 'dataTransfer', { value: dataTransfer });
    pane.dispatchEvent(drop);
    await flush();

    expect(transport).not.toHaveBeenCalled();
  });

  test('keeps waiting-row controls out of the detail click boundary', () => {
    const gotoIssue = vi.fn();
    const { mount } = mountExecution(
      {
        queue: [{ bead_id: 'C', added_at: 1 }],
        bead_labels: { C: ['worker-serial'] }
      },
      vi.fn(),
      gotoIssue
    );
    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="C"]')
    );
    /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__select')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__serial')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__grip')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('shows serial wait reason and a serial PR-wait hint without the global hold', () => {
    const { mount } = mountExecution({
      queue: [{ bead_id: 'SERIAL', added_at: 1 }],
      bead_labels: { SERIAL: ['worker-serial'] },
      attempts: {
        active: { attempt_id: 'active', bead_id: 'OTHER', status: 'running' },
        serial: {
          attempt_id: 'serial',
          bead_id: 'PR-1',
          status: 'done',
          worker_serial: true
        }
      },
      pr_wait: [{ bead_id: 'PR-1', added_at: 1 }],
      auto_merge: false,
      pr_wait_holds_slot: false
    });

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="SERIAL"] .worker-mini__reason'
      )?.textContent
    ).toContain('다른 작업 종료 대기 · 머지까지 단독');
    expect(
      mount.querySelector('.worker-pr-wait-hint--serial')?.textContent
    ).toContain('단독 실행 작업의 PR 머지·정리');
  });

  test('does not show serial busy for terminal attempt history', () => {
    const { mount } = mountExecution({
      queue: [{ bead_id: 'SERIAL', added_at: 1 }],
      bead_labels: { SERIAL: ['worker-serial'] },
      attempts: Object.fromEntries(
        ['done', 'failed', 'orphaned', 'stopped', 'discarded'].map((status) => [
          status,
          { attempt_id: status, bead_id: `OLD-${status}`, status }
        ])
      )
    });

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="SERIAL"] .worker-mini__reason'
      )
    ).toBeNull();
  });

  test('shows serial busy for a different active discard operation', () => {
    const { mount } = mountExecution({
      queue: [{ bead_id: 'SERIAL', added_at: 1 }],
      bead_labels: { SERIAL: ['worker-serial'] },
      discard_operations: {
        active: { bead_id: 'OTHER', phase: 'signaled' }
      }
    });

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="SERIAL"] .worker-mini__reason'
      )?.textContent
    ).toContain('다른 작업 종료 대기 · 머지까지 단독');
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
        tier: 'eligible',
        gate_badge: '머지 가능',
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
        tier: 'eligible',
        gate_badge: '머지 가능',
        base_badge: '최신',
        reason: null
      })
    );

    const badges = Array.from(row.querySelectorAll('.worker-mini__badge')).map(
      (b) => b.textContent
    );
    expect(badges).toEqual(['머지 가능', '최신']);
  });

  test('renders the optional verification badge', () => {
    const row = renderWith(
      withObservation({
        enabled: false,
        tier: 'verify',
        gate_badge: '검증 대기',
        base_badge: '최신',
        reason: 'verify_missing'
      })
    );

    expect(row.querySelector('.worker-mini__badge')?.textContent).toBe(
      '검증 대기'
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

  test('renders the parked row as a multi-line card (UI-yp64 §3)', () => {
    const { mount } = mountWith(parkedQueue());

    const row = rowOf(mount);
    expect(row.classList.contains('worker-mini--card')).toBe(true);
    expect(
      row.querySelector('.worker-mini__body .worker-mini__title')
    ).not.toBe(null);
  });

  test('renders both disposition buttons inside the card foot', () => {
    const { mount } = mountWith(parkedQueue());

    const actions = rowOf(mount).querySelector(
      '.worker-mini__foot .worker-mini__actions'
    );
    expect(actions?.querySelector('.worker-mini__revise-fix')).not.toBe(null);
    expect(actions?.querySelector('.worker-mini__revise-approve')).not.toBe(
      null
    );
  });

  test('keeps an unparked queued row on the single-line variant', () => {
    const { mount } = mountWith(
      queueOf({ queue: [{ bead_id: 'RD-1', added_at: 1 }] })
    );

    expect(rowOf(mount).classList.contains('worker-mini--card')).toBe(false);
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
   * @param {any} [transport]
   */
  function mountWith(
    queue,
    transport = vi.fn(async () => ({ ok: true, action: 'merged' }))
  ) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queue);
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    return { mount, queueStore, transport };
  }

  const GREEN = {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
    base_badge: '최신',
    reason: null
  };
  const RED = {
    enabled: false,
    tier: 'verify',
    gate_badge: '검증 실패',
    base_badge: '최신',
    reason: 'verify_cmd_failed'
  };

  /**
   * The §5 gate tiers, exactly as `evaluateMergeGate` emits them.
   *
   * @type {Array<{ tier: string, gate_badge: string, enabled: boolean, reason: string|null }>}
   */
  const PASSING_TIERS = [
    { tier: 'eligible', gate_badge: '머지 가능', enabled: true, reason: null },
    {
      tier: 'eligible',
      gate_badge: '검증 완료',
      enabled: true,
      reason: null
    },
    { tier: 'eligible', gate_badge: '머지 가능', enabled: true, reason: null }
  ];

  /** @type {Array<{ tier: string, gate_badge: string, enabled: boolean, reason: string|null }>} */
  const REFUSING_TIERS = [
    {
      tier: 'review',
      gate_badge: '리뷰 확인 필요',
      enabled: false,
      reason: 'review_receipt_missing'
    },
    {
      tier: 'verify',
      gate_badge: '검증 대기',
      enabled: false,
      reason: 'verify_missing'
    },
    {
      tier: 'verify',
      gate_badge: '검증 실패',
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

  test('offers merged discard as a revert PR operation', () => {
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
    expect(row.querySelector('.worker-mini__discard')).not.toBe(null);
    expect(
      row
        .querySelector('.worker-mini__discard')
        ?.getAttribute('data-discard-mode')
    ).toBe('merged');
    // [머지] stays: on a merged tile it is the cleanup-retry button.
    expect(row.querySelector('.worker-mini__merge')).not.toBe(null);
  });

  test('offers merged discard on a cleanup failure', () => {
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

    expect(mount.querySelector('.worker-mini__discard')).not.toBe(null);
  });

  test('keeps cleanup disabled while a failed discard awaits retry', () => {
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
          },
          discard_operations: {
            op1: {
              operation_id: 'op1',
              bead_id: 'RD-1',
              requested_at: 1,
              mode: 'merged_revert',
              phase: 'revert_pr_created',
              last_error: 'revert_pr_failed'
            }
          }
        }
      )
    );

    const cleanup = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    const discard = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard')
    );
    expect(cleanup.disabled).toBe(true);
    expect(cleanup.title).toContain('폐기 실패: revert_pr_failed');
    expect(discard.disabled).toBe(false);
    expect(discard.textContent?.trim()).toBe('재시도');
  });

  test('offers discard on a cleanup_failed tile even without observations', () => {
    // Right after a restart the durable cleanup_failed record still identifies
    // a worker-owned merged operation, so [폐기] starts its revert path.
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
    expect(row.querySelector('.worker-mini__discard')).not.toBe(null);
  });

  test('disables 머지 when the gate refuses, and says why', () => {
    const { mount } = mountWith(queueWithGate(RED));

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('title')).toContain('verify_cmd_failed');
  });

  test('keeps 머지 clickable on a conflict so the click can dispatch a resolution', () => {
    const { mount } = mountWith(
      queueWithGate({
        enabled: false,
        tier: 'verify',
        gate_badge: '검증 대기',
        base_badge: '충돌',
        reason: 'verify_missing'
      })
    );

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(false);
    expect(btn.getAttribute('title')).toContain('해소 세션');
  });

  test('sends worker-merge-queue-add with the current revision on click', () => {
    const { mount, transport } = mountWith(queueWithGate(GREEN));

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    ).click();

    expect(transport).toHaveBeenCalledWith('worker-merge-queue-add', {
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

  test('describes the unmerged discard outcome in the confirmation', () => {
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

    expect(messages[0]).toContain(
      'runner/PR/branch/worktree를 정리하고 이슈를 후보로 되돌립니다'
    );
    vi.unstubAllGlobals();
  });

  test('sends worker-discard once the user confirms', () => {
    const { mount, transport } = mountWith(queueWithGate(GREEN));
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true)
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard')
    ).click();

    expect(transport).toHaveBeenCalledWith('worker-discard', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
    vi.unstubAllGlobals();
  });

  test('keeps a failed post-runner discard reachable from the queue row', () => {
    const transport = vi.fn(async () => ({
      accepted: true,
      operation_id: 'op-queue',
      phase: 'runner_terminated'
    }));
    const { mount } = mountWith(
      queueOf({
        queue: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'discarded'
          }
        },
        discard_operations: {
          'op-queue': {
            operation_id: 'op-queue',
            bead_id: 'RD-1',
            attempt_id: 'a1',
            requested_at: 1,
            mode: 'unmerged',
            phase: 'runner_terminated',
            backup: { path: '/state/op-queue' },
            last_error: 'pr_observe_failed'
          }
        }
      }),
      transport
    );
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true)
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    const retry = /** @type {HTMLButtonElement} */ (
      row.querySelector('.worker-mini__discard')
    );
    expect(row.getAttribute('draggable')).toBe('false');
    expect(retry.textContent?.trim()).toBe('재시도');
    expect(row.textContent).toContain('/state/op-queue');

    retry.click();

    expect(transport).toHaveBeenCalledWith('worker-discard', {
      bead_id: 'RD-1',
      attempt_id: 'a1',
      operation_id: 'op-queue',
      expected_revision: 1
    });
    vi.unstubAllGlobals();
  });

  test('announces a completed discard with a success toast', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueWithGate(GREEN));
    const transport = vi.fn(async () => ({
      operation_id: 'op-complete',
      discarded: true,
      conflict: false,
      receipt: { archive_path: '/state/op-complete' }
    }));
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
    expect(toast?.textContent).toContain('작업 op-complete');
    expect(toast?.textContent).toContain('백업 /state/op-complete');
    vi.unstubAllGlobals();
  });

  test('announces an accepted discard failure as an error', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueWithGate(GREEN));
    const transport = vi.fn(async () => ({
      accepted: true,
      operation_id: 'op-failed',
      reason: 'archive_failed',
      phase: 'requested'
    }));
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
    await Promise.resolve();
    await Promise.resolve();

    expect(document.querySelector('.toast')?.textContent).toContain(
      '폐기 실패: archive_failed'
    );
    vi.unstubAllGlobals();
  });

  /**
   * Open the 저장소 작업 타임라인 the way a user does — the strip click (§4.1).
   *
   * @param {HTMLElement} mount
   * @returns {HTMLElement}
   */
  function openTimeline(mount) {
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-repo-strip')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-repo-drawer')
    );
  }

  /**
   * @param {Record<string, any>} record
   * @returns {Record<string, any>}
   */
  function mergedWithCleanup(record) {
    return queueWithGate(
      {
        enabled: false,
        tier: 'merged',
        gate_badge: '머지됨',
        base_badge: '머지됨',
        reason: null
      },
      { cleanup_failed: { 'RD-1': record } }
    );
  }

  test('renders a stopped cleanup as a timeline event, not a banner', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'child_sweep',
        reason: 'child_close_failed:RD-1.1',
        at: 1
      })
    );

    const drawer = openTimeline(mount);

    expect(mount.querySelector('.worker-banner--cleanup')).toBeNull();
    expect(
      drawer.querySelector('.worker-ev[data-bead-id="RD-1"]')
    ).not.toBeNull();
  });

  test('marks the stopped step on the cleanup stepper', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'child_sweep', reason: 'x', at: 1 })
    );

    const drawer = openTimeline(mount);

    expect(
      drawer.querySelector('.worker-step--stall')?.textContent?.trim()
    ).toBe('자식 정리');
  });

  test('names the resume point on the resume button', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'repo_operations', reason: 'x', at: 1 })
    );

    const drawer = openTimeline(mount);

    expect(
      drawer.querySelector('.worker-cleanup__resume')?.textContent?.trim()
    ).toBe('정리 재개 — 저장소 작업 단계부터');
  });

  test('mentions retry only when durable cleanup evidence consumed it', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_cmd_failed',
        retry_count: 1,
        at: 1
      })
    );

    const drawer = openTimeline(mount);

    expect(drawer.querySelector('.worker-ev__explain')?.textContent).toContain(
      '1회 자동 재시도 후에도 실패했습니다'
    );
  });

  test('says a known cleanup failure in human words', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_cmd_failed',
        at: 1
      })
    );

    const drawer = openTimeline(mount);

    expect(drawer.querySelector('.worker-ev__cause')?.textContent).toBe(
      '검증 실패 — 머지 후 검증 명령이 실패했습니다.'
    );
  });

  test('keeps the raw cleanup failure code inside the details block', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_cmd_failed',
        at: 1
      })
    );

    const drawer = openTimeline(mount);

    expect(drawer.querySelector('.worker-ev__kv dd')?.textContent).toBe(
      'verify_cmd_failed'
    );
  });

  test('does not expose a cleanup diagnosis button or durable diagnosis result', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_cmd_failed',
        at: 1,
        diagnosis: {
          verdict: 'regression',
          attempt_id: 'diagnosis-1',
          consumed: false,
          evidence: '새 verify가 동일하게 실패합니다',
          fix_bead_id: 'UI-fix'
        }
      })
    );

    const drawer = openTimeline(mount);

    expect(drawer.querySelector('.worker-banner__cleanup-diagnose')).toBeNull();
    expect(drawer.textContent).not.toContain('새 verify가 동일하게 실패합니다');
    expect(drawer.textContent).not.toContain('UI-fix');
  });

  test('does not dispatch cleanup diagnosis on render', async () => {
    const transport = vi.fn();
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_cmd_failed',
        at: 1
      }),
      transport
    );

    openTimeline(mount);

    expect(mount.querySelector('.worker-banner__cleanup-diagnose')).toBeNull();
    expect(transport).not.toHaveBeenCalled();
  });

  test('shows the cleanup failure detail when the record carries one', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_worktree_failed',
        at: 1,
        detail: "fatal: could not lock ref 'refs/heads/x'"
      })
    );

    const drawer = openTimeline(mount);

    expect(drawer.querySelector('.worker-ev__kv')?.textContent).toContain(
      "could not lock ref 'refs/heads/x'"
    );
  });

  test('renders the cleanup evidence as a collapsed details block', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_cmd_failed',
        at: 1,
        output_tail: 'FAIL test/x.test.js\nrg: command not found'
      })
    );

    const drawer = openTimeline(mount);
    const details = /** @type {HTMLDetailsElement} */ (
      drawer.querySelector('.worker-ev__details')
    );

    expect(details.open).toBe(false);
    expect(details.textContent).toContain('rg: command not found');
  });

  test('escapes markup in the cleanup output tail', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_cmd_failed',
        at: 1,
        output_tail: '<img src=x onerror="boom()">'
      })
    );

    const drawer = openTimeline(mount);
    const details = /** @type {HTMLElement} */ (
      drawer.querySelector('.worker-ev__details')
    );

    expect(details.querySelector('img')).toBeNull();
    expect(details.textContent).toContain('<img src=x onerror="boom()">');
  });

  test('renders the full cleanup log path', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'repo_operations',
        reason: 'verify_cmd_failed',
        at: 1,
        log_path: '/state/bdui/ws-abc/verify-logs/verify-RD-1-abc1234-17.log'
      })
    );

    const drawer = openTimeline(mount);

    expect(drawer.querySelector('.worker-ev__kv')?.textContent).toContain(
      '/state/bdui/ws-abc/verify-logs/verify-RD-1-abc1234-17.log'
    );
  });

  test('omits detail rows a cleanup record does not carry', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'child_sweep',
        reason: 'child_close_failed',
        at: 1
      })
    );

    const drawer = openTimeline(mount);

    expect(drawer.querySelectorAll('.worker-ev__kv dt')).toHaveLength(1);
  });

  test('keeps the merged row clickable as a cleanup resume', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'child_sweep', reason: 'x', at: 1 })
    );

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );

    expect([btn.disabled, btn.textContent?.trim()]).toEqual([
      false,
      '정리 재개'
    ]);
  });

  test('sends one cleanup retry with the current revision while pending', () => {
    const transport = vi.fn(() => new Promise(() => {}));
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'child_sweep', reason: 'x', at: 1 }),
      transport
    );
    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );

    btn.click();
    btn.click();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith('worker-cleanup-retry', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
    expect(transport).not.toHaveBeenCalledWith(
      'worker-merge-queue-add',
      expect.anything()
    );
  });

  test('adopts a cleanup conflict without automatically retrying it', async () => {
    const queue = mergedWithCleanup({
      step: 'child_sweep',
      reason: 'x',
      at: 1
    });
    const transport = vi.fn(async () => ({
      retried: false,
      conflict: true,
      queue: { ...queue, revision: 2 }
    }));
    const { mount, queueStore } = mountWith(queue, transport);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    ).click();
    await Promise.resolve();
    await Promise.resolve();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(queueStore.get()?.revision).toBe(2);
  });

  test('sends one timeline cleanup retry with the current revision while pending', () => {
    const transport = vi.fn(() => new Promise(() => {}));
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'repo_operations', reason: 'x', at: 1 }),
      transport
    );
    openTimeline(mount);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-cleanup__resume')
    ).click();
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-cleanup__resume')
    ).click();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith('worker-cleanup-retry', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
    expect(transport).not.toHaveBeenCalledWith(
      'worker-merge-queue-add',
      expect.anything()
    );
  });

  test('offers a timeline link instead of a locked merge action', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'repo_operations', reason: 'x', at: 1 })
    );

    expect([
      mount.querySelector('.worker-mini__merge'),
      mount.querySelector('.worker-mini__timeline')?.textContent?.trim()
    ]).toEqual([null, '저장소 작업 보기']);
  });

  test('opens the timeline from that link', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'repo_operations', reason: 'x', at: 1 })
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini__timeline')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.worker-repo-drawer')).not.toBeNull();
  });

  test('names the stopped step on the pr_wait badge', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'child_sweep', reason: 'x', at: 1 })
    );

    expect(
      Array.from(mount.querySelectorAll('.worker-mini__badge')).map(
        (el) => el.textContent
      )
    ).toContain('정리 멈춤 · 자식 정리');
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

  /**
   * Mount over a snapshot carrying raw `done` entries next to `attempts`.
   * `queueOf` rebases small `added_at` values onto today so fixture done rows
   * survive the period filter; these tests compare `added_at` against
   * `finished_at` directly, so the stamps must reach the view unrewritten.
   *
   * @param {Record<string, any>} attempts
   * @param {any[]} done
   * @returns {HTMLElement}
   */
  function mountWithDone(attempts, done) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const q = queueOf({ attempts });
    q.done = done;
    queueStore.set(q);
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  const FAILED_AT = startOfToday() + 1000;

  test('renders no banner for a failure the bead finished after (UI-a9ys)', () => {
    const mount = mountWithDone(
      {
        f1: {
          attempt_id: 'f1',
          bead_id: 'B1',
          status: 'failed',
          repo: '/repo',
          cause: 'verify_failed:pr_missing',
          finished_at: FAILED_AT
        }
      },
      [{ bead_id: 'B1', added_at: FAILED_AT + 60_000 }]
    );

    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });

  test('renders the banner for a failure whose bead is not in the done lane', () => {
    const mount = mountWithDone(
      {
        f1: {
          attempt_id: 'f1',
          bead_id: 'B1',
          status: 'failed',
          repo: '/repo',
          cause: 'verify_failed:pr_missing',
          finished_at: FAILED_AT
        }
      },
      [{ bead_id: 'B2', added_at: FAILED_AT + 60_000 }]
    );

    expect(mount.querySelector('.worker-banner--failure')).not.toBeNull();
  });

  test('renders the banner when the failure came after the done entry', () => {
    const mount = mountWithDone(
      {
        f1: {
          attempt_id: 'f1',
          bead_id: 'B1',
          status: 'failed',
          repo: '/repo',
          cause: 'session_failed:resumed',
          finished_at: FAILED_AT
        }
      },
      [{ bead_id: 'B1', added_at: FAILED_AT - 60_000 }]
    );

    expect(mount.querySelector('.worker-banner--failure')).not.toBeNull();
  });

  test('falls through to another bead unhandled failure once one is resolved', () => {
    const mount = mountWithDone(
      // The resolved one is LAST in insertion order, so it is what the
      // unfixed verdict would have picked as `latest_failed`.
      {
        open: {
          attempt_id: 'open',
          bead_id: 'B2',
          status: 'failed',
          repo: '/repo',
          cause: 'session_failed:new',
          finished_at: FAILED_AT,
          session_id: 'sid-2'
        },
        resolved: {
          attempt_id: 'resolved',
          bead_id: 'B1',
          status: 'failed',
          repo: '/repo',
          cause: 'verify_failed:pr_missing',
          finished_at: FAILED_AT + 1000,
          session_id: 'sid-1'
        }
      },
      [{ bead_id: 'B1', added_at: FAILED_AT + 60_000 }]
    );

    expect(
      /** @type {HTMLElement} */ (mount.querySelector('.worker-banner__resume'))
        .dataset.attemptId
    ).toBe('open');
  });

  test('keeps the resolution when the done period filter hides the row', () => {
    const old_finished = startOfToday() - 3 * 86_400_000;
    const mount = mountWithDone(
      {
        f1: {
          attempt_id: 'f1',
          bead_id: 'B1',
          status: 'failed',
          repo: '/repo',
          cause: 'verify_failed:pr_missing',
          finished_at: old_finished
        }
      },
      [{ bead_id: 'B1', added_at: old_finished + 60_000 }]
    );

    expect(
      mount.querySelectorAll('#worker-pane-done .worker-mini').length
    ).toBe(0);
    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });

  test('renders the banner for a legacy attempt carrying no finished_at', () => {
    const mount = mountWithDone(
      {
        f1: {
          attempt_id: 'f1',
          bead_id: 'B1',
          status: 'failed',
          repo: '/repo',
          cause: 'verify_failed:pr_missing',
          finished_at: null
        }
      },
      [{ bead_id: 'B1', added_at: FAILED_AT + 60_000 }]
    );

    expect(mount.querySelector('.worker-banner--failure')).not.toBeNull();
  });

  test('renders the banner for a legacy done entry normalized to added_at 0', () => {
    const mount = mountWithDone(
      {
        f1: {
          attempt_id: 'f1',
          bead_id: 'B1',
          status: 'failed',
          repo: '/repo',
          cause: 'verify_failed:pr_missing',
          finished_at: FAILED_AT
        }
      },
      [{ bead_id: 'B1', added_at: 0 }]
    );

    expect(mount.querySelector('.worker-banner--failure')).not.toBeNull();
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
    expect(tile.textContent?.trim()).toBe('Claude τ 12.3k');
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
      'Claude subtotal = 입력 + 출력 + 캐시읽기 + 캐시생성\n총 239,430\n입력 8,420 · 출력 3,910 · 캐시읽기 214,300 · 캐시생성 12,800\n$0.42'
    );
  });

  test('counts the cache fields in a running tile badge (UI-tq13 §1)', () => {
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
              input_tokens: 267,
              output_tokens: 2407,
              cache_read_input_tokens: 13_655_022,
              cache_creation_input_tokens: 446_503
            }
          }
        }
      })
    );

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="RD-1"] .worker-usage')
    );
    expect(tile.textContent?.trim()).toBe('Claude τ 14.1M');
  });

  test('puts the cost beside the tokens on a done row (UI-tq13 §6)', () => {
    const mount = renderQueue(
      queueOf({
        done: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'done',
            usage: {
              input_tokens: 9700,
              output_tokens: 4120,
              total_cost_usd: 12.339
            }
          }
        }
      })
    );

    const el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .worker-usage')
    );
    expect(el.textContent?.trim()).toBe('Claude τ 13.8k · $12.34');
  });

  test('omits the cost from a done row that reported none', () => {
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
    expect(el.textContent?.trim()).toBe('Claude τ 13.8k');
  });

  test('omits the cost when only some summed attempts reported one (UI-tq13 §7)', () => {
    const mount = renderQueue(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'done',
            usage: { input_tokens: 100, output_tokens: 50, total_cost_usd: 1.5 }
          },
          a2: {
            attempt_id: 'a2',
            bead_id: 'RD-1',
            status: 'running',
            started_at: 1,
            usage: { input_tokens: 21600, output_tokens: 9340 }
          }
        }
      })
    );

    const el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .worker-usage')
    );
    expect(el.textContent?.trim()).toBe('Claude τ 31.1k');
  });

  test('sums every attempt usage on a pr_wait row (UI-d7pw §1)', () => {
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
    expect(el.textContent?.trim()).toBe('Claude τ 31.1k');
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
    expect(el.textContent?.trim()).toBe('Claude τ 13.8k');
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

  test('renames 검증 대기 to 검증 중 while the suite runs', () => {
    expect(activityBadge('검증 대기', 'verifying')).toEqual({
      label: '검증 중',
      live: true
    });
  });

  test('leaves 관측 대기 alone when nothing is running', () => {
    expect(activityBadge('관측 대기', null)).toEqual({
      label: '관측 대기',
      live: false
    });
  });

  test('leaves an eligibility badge alone while the poller works', () => {
    expect(activityBadge('머지 가능', 'checking')).toEqual({
      label: '머지 가능',
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
    tier: 'verify',
    gate_badge: '검증 대기',
    base_badge: '최신',
    reason: 'verify_missing'
  };
  const ELIGIBLE = {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
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

  test('shows 검증 중 while the optional verification runs', () => {
    const row = renderRow(VERIFY_PENDING, 'verifying');

    expect(
      row.querySelector('.worker-mini__badge--activity')?.textContent?.trim()
    ).toBe('검증 중');
  });

  test('keeps the settled badge when nothing is running', () => {
    const row = renderRow(UNOBSERVED, null);

    expect(row.querySelector('.worker-mini__badge--activity')).toBe(null);
    expect(row.textContent).toContain('관측 대기');
  });

  test('leaves an eligibility badge untouched while the poller works', () => {
    const row = renderRow(ELIGIBLE, 'checking');

    expect(row.querySelector('.worker-mini__badge--activity')).toBe(null);
    expect(row.textContent).toContain('머지 가능');
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
  test('labels the first step as 1 of 6', () => {
    expect(mergeStepView('merging')).toEqual({
      label: '머지 중',
      index: 1,
      total: 6,
      percent: 17
    });
  });

  test('labels the last step as 6 of 6', () => {
    expect(mergeStepView('parent_close')).toMatchObject({
      label: '부모 close',
      index: 6,
      total: 6,
      percent: 100
    });
  });

  test('translates every cleanup step to Korean', () => {
    const labels = [
      'base_containment',
      'repo_operations',
      'child_sweep',
      'branch_cleanup',
      'parent_close'
    ].map((s) => mergeStepView(s)?.label);

    expect(labels).toEqual([
      'base 포함 확인',
      '저장소 작업',
      '자식 정리',
      '브랜치 정리',
      '부모 close'
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
    tier: 'eligible',
    gate_badge: '머지 가능',
    base_badge: '최신',
    reason: null
  };

  /**
   * @param {any} activity
   * @param {any} [transport]
   * @param {Record<string, any>} [queue_over]
   * @returns {HTMLElement}
   */
  function mountRow(activity, transport, queue_over = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        ...queue_over,
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        pr_observations: {
          'RD-1': {
            pr: {
              number: 304,
              url: 'https://github.com/o/r/pull/304',
              state: 'OPEN',
              head_sha: 'a'.repeat(40)
            },
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
      merge_progress: { step: 'repo_operations', started_at: 1 }
    });

    const step = /** @type {HTMLElement} */ (
      mount.querySelector('.merge-step')
    );
    expect(step.textContent?.replace(/\s+/g, '')).toBe('저장소작업3/6');
  });

  test('marks the row and its progress width', () => {
    const mount = mountRow({
      activity: null,
      merge_progress: { step: 'repo_operations', started_at: 1 }
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.classList.contains('worker-mini--merging')).toBe(true);
    expect(row.getAttribute('style')).toContain('--progress: 50%');
  });

  test('disables both actions while merging', () => {
    const mount = mountRow({
      activity: null,
      merge_progress: { step: 'base_containment', started_at: 1 }
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
          if (type === 'worker-merge-queue-add') {
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

    release({ applied: true, conflict: false, queued: 1 });
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

  test('omits waiting selection controls while the queue strip is collapsed', () => {
    const mount = mountMobile({
      queue: [{ bead_id: 'RD-1', added_at: 1 }],
      bead_labels: { 'RD-1': ['worker-serial'] }
    });

    const queue_pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue')
    );
    expect(queue_pane.querySelector('.worker-mini__select')).toBeNull();
    expect(queue_pane.querySelector('.worker-bulk')).toBeNull();
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

    // base 칩은 UI-j6wa §3에서 상시 표시가 되었다 — 선언을 읽지 못한
    // 픽스처에서는 `base ?`로 선다.
    expect(chips).toEqual(['실행 1', 'PR 대기 1', '오늘 완료 1', 'base ?']);
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

    expect(
      mount.querySelector('.worker-kpi__chip--tokens')?.textContent?.trim()
    ).toBe('오늘 완료 · 누적 Claude τ 2.0k');
  });

  test('renders no token chip when no completed session reported usage', () => {
    const mount = mountKpi({ done: [{ bead_id: 'RD-1', added_at: 1 }] });

    expect(mount.querySelector('.worker-kpi__chip--tokens')).toBe(null);
  });

  test('accumulates the cache fields into the chip too (UI-tq13 §5)', () => {
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
          usage: {
            input_tokens: 1000,
            output_tokens: 200,
            cache_read_input_tokens: 4_000_000,
            cache_creation_input_tokens: 200_000
          }
        },
        a2: {
          attempt_id: 'a2',
          bead_id: 'RD-2',
          status: 'succeeded',
          usage: {
            input_tokens: 800,
            output_tokens: 0,
            cache_read_input_tokens: 1_000_000,
            cache_creation_input_tokens: 100_000
          }
        }
      }
    });

    expect(
      mount.querySelector('.worker-kpi__chip--tokens')?.textContent?.trim()
    ).toBe('오늘 완료 · 누적 Claude τ 5.3M');
    expect(
      mount.querySelector('.worker-kpi__chip--tokens')?.getAttribute('title')
    ).toContain('Claude subtotal = 입력 + 출력 + 캐시읽기 + 캐시생성');
  });

  test('chip matches the row badge for the same issue (UI-tq13 §5)', () => {
    const queue = {
      done: [{ bead_id: 'RD-1', added_at: 1 }],
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'succeeded',
          usage: {
            input_tokens: 267,
            output_tokens: 2407,
            cache_read_input_tokens: 13_655_022,
            cache_creation_input_tokens: 446_503
          }
        }
      }
    };
    const mount = mountKpi(queue);

    const chip = mount
      .querySelector('.worker-kpi__chip--tokens')
      ?.textContent?.trim();
    const badge = mount
      .querySelector('.worker-mini[data-bead-id="RD-1"] .worker-usage')
      ?.textContent?.trim();

    expect(chip).toBe('오늘 완료 · 누적 Claude τ 14.1M');
    expect(badge).toBe('Claude τ 14.1M');
  });

  test('appends the cost when every summed attempt reported one (UI-j6wa §2)', () => {
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
          usage: {
            input_tokens: 1000,
            output_tokens: 200,
            total_cost_usd: 1.5
          }
        },
        a2: {
          attempt_id: 'a2',
          bead_id: 'RD-2',
          status: 'succeeded',
          usage: {
            input_tokens: 800,
            output_tokens: 0,
            total_cost_usd: 2.25
          }
        }
      }
    });

    expect(
      mount.querySelector('.worker-kpi__chip--tokens')?.textContent?.trim()
    ).toBe('오늘 완료 · 누적 Claude τ 2.0k · $3.75');
  });

  test('omits the cost when one summed attempt reported none (UI-j6wa §2)', () => {
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
          usage: {
            input_tokens: 1000,
            output_tokens: 200,
            total_cost_usd: 1.5
          }
        },
        a2: {
          attempt_id: 'a2',
          bead_id: 'RD-2',
          status: 'succeeded',
          usage: { input_tokens: 800, output_tokens: 0 }
        }
      }
    });

    expect(
      mount.querySelector('.worker-kpi__chip--tokens')?.textContent?.trim()
    ).toBe('오늘 완료 · 누적 Claude τ 2.0k');
  });
});

describe('worker toolbar automation controls (UI-jk7z)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {any} over
   * @param {any} [transport]
   */
  function mountAuto(
    over,
    transport = vi.fn().mockResolvedValue(reply(queueOf(over)))
  ) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf(over));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    return { mount, transport };
  }

  test('removes the derived whole-automation button', () => {
    const { mount } = mountAuto({ auto_advance: true, auto_merge: true });

    expect(mount.querySelector('.worker-auto-all')).toBeNull();
  });

  test('keeps one merge toggle beside play while idle', () => {
    const { mount } = mountAuto({
      auto_advance: false,
      auto_merge: false,
      queue: [],
      pr_wait: [],
      attempts: []
    });

    const merge_buttons = mount.querySelectorAll('.worker-merge-all');
    expect(merge_buttons).toHaveLength(1);
    expect(merge_buttons[0].closest('.worker-ctrl__ops')).not.toBeNull();
    expect(mount.querySelector('.worker-play')?.nextElementSibling).toBe(
      merge_buttons[0]
    );
    expect(merge_buttons[0].textContent?.trim()).toBe('▶ 자동 머지');
  });
});

describe('PR 대기 슬롯 점유 토글 (UI-mh3x)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, any>} over
   */
  function mountHold(over) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf(over));
    const transport = vi
      .fn()
      .mockResolvedValue(reply(queueOf({ ...over, pr_wait_holds_slot: true })));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    return { mount, transport };
  }

  test('renders the slot-hold toggle from the queue snapshot', () => {
    const { mount } = mountHold({ pr_wait_holds_slot: true });

    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector('.worker-pr-wait-hold')
      ).checked
    ).toBe(true);
  });

  test('shows merge-serial mode wording', () => {
    const { mount } = mountHold({ pr_wait_holds_slot: true });

    expect(mount.textContent).toContain('머지까지 순차 실행');
  });

  test('shows one disabled effective slot while preserving a larger setting', () => {
    const { mount } = mountHold({ pr_wait_holds_slot: true, slots: 3 });
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-slots__input')
    );

    expect(input.value).toBe('1');
    expect(input.disabled).toBe(true);
  });

  test('restores the configured slot value when merge-serial mode turns off', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({ pr_wait_holds_slot: true, slots: 3, revision: 2 })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    queueStore.set(
      queueOf({ pr_wait_holds_slot: false, slots: 3, revision: 3 })
    );

    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-slots__input')
    );
    expect(input.value).toBe('3');
    expect(input.disabled).toBe(false);
  });

  test('sends the slot-hold mutation when clicked', async () => {
    const { mount, transport } = mountHold({ pr_wait_holds_slot: false });

    /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-pr-wait-hold')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-set-pr-wait-hold', {
      on: true,
      expected_revision: 1
    });
  });

  test('updates the slot-hold toggle from a later queue snapshot', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ pr_wait_holds_slot: false }));
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      queue: queueOf({ revision: 2, pr_wait_holds_slot: true })
    });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-pr-wait-hold')
    ).click();
    await flush();

    queueStore.set(queueOf({ revision: 3, pr_wait_holds_slot: false }));

    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector('.worker-pr-wait-hold')
      ).checked
    ).toBe(false);
  });

  test('retries one slot-hold conflict with the adopted revision', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf({ pr_wait_holds_slot: false }));
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: queueOf({ revision: 2, pr_wait_holds_slot: false })
      })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        queue: queueOf({ revision: 3, pr_wait_holds_slot: true })
      });
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });

    /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-pr-wait-hold')
    ).click();
    await flush();

    expect(transport).toHaveBeenNthCalledWith(
      2,
      'worker-queue-set-pr-wait-hold',
      { on: true, expected_revision: 2 }
    );
    expect(transport).toHaveBeenCalledTimes(2);
  });

  test('shows the hold hint when the waiting queue is slot-blocked', () => {
    const { mount } = mountHold({
      auto_advance: true,
      auto_merge: false,
      pr_wait_holds_slot: true,
      slots: 1,
      queue: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_wait: [{ bead_id: 'RD-2', added_at: 1 }]
    });

    expect(mount.querySelector('.worker-pr-wait-hint')?.textContent).toContain(
      'PR 머지 대기 중'
    );
  });

  test('shows the hold hint with two configured slots', () => {
    const { mount } = mountHold({
      auto_advance: true,
      auto_merge: false,
      pr_wait_holds_slot: true,
      slots: 2,
      queue: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_wait: [{ bead_id: 'RD-2', added_at: 1 }]
    });

    expect(mount.querySelector('.worker-pr-wait-hint')?.textContent).toContain(
      'PR 머지 대기 중'
    );
  });

  test('does not count a failed tile as an occupied live slot', () => {
    const hold = {
      auto_advance: true,
      auto_merge: false,
      pr_wait_holds_slot: true,
      slots: 2,
      queue: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_wait: [{ bead_id: 'RD-2', added_at: 1 }]
    };
    const { mount } = mountHold({
      ...hold,
      attempts: {
        failed: {
          attempt_id: 'failed',
          bead_id: 'FAILED',
          status: 'failed',
          finished_at: 1
        }
      }
    });
    const with_failed =
      mount.querySelector('.worker-pr-wait-hint')?.textContent || '';

    document.body.innerHTML = '<div id="m"></div>';
    const baseline = mountHold(hold).mount;
    const without_failed =
      baseline.querySelector('.worker-pr-wait-hint')?.textContent || '';

    expect(with_failed).toBe(without_failed);
  });

  test('hides the hold hint when automatic progress is off', () => {
    const { mount } = mountHold({
      auto_advance: false,
      auto_merge: false,
      pr_wait_holds_slot: true,
      slots: 1,
      queue: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_wait: [{ bead_id: 'RD-2', added_at: 1 }]
    });

    expect(mount.querySelector('.worker-pr-wait-hint')).toBe(null);
  });

  test('hides the hold hint for external PR rows only', () => {
    const { mount } = mountHold({
      auto_advance: true,
      auto_merge: false,
      pr_wait_holds_slot: true,
      slots: 1,
      queue: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_wait: [{ bead_id: 'RD-2', added_at: 1, external: true }]
    });

    expect(mount.querySelector('.worker-pr-wait-hint')).toBe(null);
  });

  test('hides the hold hint while automatic merge is on', () => {
    const { mount } = mountHold({
      auto_advance: true,
      auto_merge: true,
      pr_wait_holds_slot: true,
      slots: 1,
      queue: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_wait: [{ bead_id: 'RD-2', added_at: 1 }]
    });

    expect(mount.querySelector('.worker-pr-wait-hint')).toBe(null);
  });
});

describe('target base 칩과 예외 배지 (UI-j6wa §3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {any} over
   */
  function mountBase(over) {
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

  test('shows the declared base as a toolbar chip', () => {
    const mount = mountBase({ declared_base: 'ilsun/dev' });

    expect(
      mount.querySelector('.worker-kpi__chip--base')?.textContent?.trim()
    ).toBe('base ilsun/dev');
  });

  test('shows base ? when the declaration could not be read', () => {
    const mount = mountBase({ declared_base: null });

    expect(
      mount.querySelector('.worker-kpi__chip--base')?.textContent?.trim()
    ).toBe('base ?');
  });

  test('badges a running attempt whose base differs from the declared one', () => {
    const mount = mountBase({
      declared_base: 'main',
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'running',
          started_at: 1,
          target_base: 'ilsun/dev'
        }
      }
    });

    expect(mount.querySelector('.rtile .worker-mini__badge')?.textContent).toBe(
      '→ ilsun/dev'
    );
  });

  test('badges no running attempt whose base matches the declared one', () => {
    const mount = mountBase({
      declared_base: 'main',
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'running',
          started_at: 1,
          target_base: 'main'
        }
      }
    });

    expect(mount.querySelector('.rtile .worker-mini__badge')).toBe(null);
  });

  test('badges nothing when the declared base is unknown', () => {
    const mount = mountBase({
      declared_base: null,
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'running',
          started_at: 1,
          target_base: 'ilsun/dev'
        }
      }
    });

    expect(mount.querySelector('.rtile .worker-mini__badge')).toBe(null);
  });

  test('badges nothing for a legacy attempt carrying no target base', () => {
    const mount = mountBase({
      declared_base: 'main',
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'running',
          started_at: 1
        }
      }
    });

    expect(mount.querySelector('.rtile .worker-mini__badge')).toBe(null);
  });

  test('picks the newest non-conflict attempt for a PR 대기 row', () => {
    const mount = mountBase({
      declared_base: 'main',
      pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'RD-1',
          status: 'succeeded',
          started_at: 10,
          target_base: 'stale/base'
        },
        a2: {
          attempt_id: 'a2',
          bead_id: 'RD-1',
          status: 'succeeded',
          started_at: 20,
          target_base: 'ilsun/dev'
        },
        a3: {
          attempt_id: 'a3',
          bead_id: 'RD-1',
          status: 'succeeded',
          started_at: 30,
          conflict_resolution: true,
          target_base: 'conflict/base'
        }
      }
    });

    const badges = Array.from(
      mount.querySelectorAll(
        '.worker-mini[data-bead-id="RD-1"] .worker-mini__badge'
      )
    ).map((el) => (el.textContent || '').trim());

    expect(badges).toContain('→ ilsun/dev');
  });
});

describe('running tile stage accent (UI-58y2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {'running'|'paused'|'failed'} status
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

  test('leaves the running lane header still when only a failed tile is there', () => {
    const mount = mountTile('failed');

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

    expect(
      mount.querySelector('.worker-kpi__chip--tokens')?.textContent?.trim()
    ).toBe('오늘 완료 · 누적 Claude τ 0');
  });
});

describe('충돌 해소 세션 가시화 (UI-dxgz)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /** Reviews are current but the branch conflicts with base. */
  const CONFLICTING = {
    enabled: true,
    tier: 'mergeability',
    gate_badge: '머지 불가',
    base_badge: '충돌',
    reason: null
  };
  const CLEAN = {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
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

  test('reads the action button as 충돌 해소 후 머지 on a conflicting gate', () => {
    const mount = mountBoard();

    expect(button(mount, '.worker-mini__merge').textContent?.trim()).toBe(
      '충돌 해소 후 머지'
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
      activity: {
        activity: null,
        merge_progress: { step: 'base_containment' }
      }
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
      '충돌 해소 후 머지'
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
    tier: 'eligible',
    gate_badge: '머지 가능',
    base_badge: '최신',
    reason: null
  };
  const CONFLICTING = {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
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
   * @param {{ external?: boolean, wt_present?: boolean, attempts?: Record<string, any>, cleanup_failed?: Record<string, any> }} [over]
   * @returns {HTMLElement}
   */
  function mountRow(gate, over = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        attempts: over.attempts || {},
        cleanup_failed: over.cleanup_failed || {},
        pr_wait: [
          {
            bead_id: 'RD-1',
            added_at: 1,
            ...(over.external === false
              ? {}
              : { external: true, wt_present: over.wt_present !== false })
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

  test('hides 정리 on a merged external row before a failure is recorded', () => {
    const mount = mountRow(MERGED);

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(true);
  });

  test('offers 정리 재개 on a merged external row after a failure', () => {
    const mount = mountRow(MERGED, {
      cleanup_failed: {
        'RD-1': { step: 'base_containment', reason: 'base_fetch_failed' }
      }
    });

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.textContent?.trim()).toBe('정리 재개');
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

  test('offers 충돌 해소 on an external row whose worktree is still there', () => {
    const mount = mountRow(CONFLICTING);

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(false);
    expect(btn.textContent?.trim()).toBe('충돌 해소 후 머지');
    // The SAME tooltip a worker row gets — that identity is the point (UI-w0hi
    // §4), so it tracks whatever UI-5v7d's queue wording is rather than pinning
    // a copy of it.
    expect(btn.getAttribute('title')).toBe(
      '충돌 — 큐에 넣으면 해소 세션을 띄우고 완료 후 자동으로 재머지합니다'
    );
  });

  test('disables 충돌 해소 when the external row lost its worktree', () => {
    const mount = mountRow(CONFLICTING, { wt_present: false });

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('title')).toBe(
      '워크트리 없음 — 세션에서 직접 해소하세요'
    );
  });

  test('locks the external row while its resolution session runs', () => {
    const mount = mountRow(CONFLICTING, {
      attempts: {
        c1: {
          attempt_id: 'c1',
          bead_id: 'RD-1',
          status: 'running',
          runner: 'claude',
          model: 'opus',
          session_id: 'sid-1',
          started_at: Date.now() - 3000,
          conflict_resolution: true
        }
      }
    });

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(true);
    expect(btn.getAttribute('title')).toBe(
      '충돌 해소 세션 실행 중 — 완료 후 다시 머지하세요'
    );
  });

  test('keeps 충돌 해소 clickable on a worker row', () => {
    const mount = mountRow(CONFLICTING, { external: false });

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.disabled).toBe(false);
    expect(btn.textContent?.trim()).toBe('충돌 해소 후 머지');
  });

  test('marks an external card with the external modifier class', () => {
    const mount = mountRow(OPEN_GREEN);

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(card.classList.contains('worker-mini--external')).toBe(true);
  });

  test('leaves a worker card without the external modifier class', () => {
    const mount = mountRow(OPEN_GREEN, { external: false });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(card.classList.contains('worker-mini--external')).toBe(false);
  });
});

describe('순차 머지 큐 — PR 대기 레인 (UI-5v7d §4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  const GREEN_GATE = {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
    base_badge: '최신',
    reason: null
  };

  /**
   * @param {string[]} bead_ids
   * @param {Record<string, any>} [over]
   */
  function laneOf(bead_ids, over = {}) {
    /** @type {Record<string, any>} */
    const pr_observations = {};
    for (const bead_id of bead_ids) {
      pr_observations[bead_id] = {
        pr: {
          number: 1,
          url: 'https://github.com/o/r/pull/1',
          state: 'OPEN',
          head_sha: 'a'.repeat(40)
        },
        verify: null,
        error: null,
        observed_at: 1,
        gate: GREEN_GATE
      };
    }
    return queueOf({
      pr_wait: bead_ids.map((bead_id) => ({ bead_id, added_at: 1 })),
      pr_observations,
      ...over
    });
  }

  /**
   * @param {any} queue
   */
  function mountLane(
    queue,
    transport = vi.fn(async () => ({
      applied: true,
      conflict: false,
      queued: 1
    }))
  ) {
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
   * @param {string} bead_id
   */
  function rowOf(mount, bead_id) {
    return /** @type {HTMLElement} */ (
      mount.querySelector(`.worker-mini[data-bead-id="${bead_id}"]`)
    );
  }

  test('shows same-PR automatic repair progress and locks per-row cancellation', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: null, failures: {} },
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'repairing',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            repair_sessions_used: 1,
            repair_session_cap: 2,
            current_repair: null,
            active_attempt_id: 'repair-a1',
            failure_stage: 'merge_gate',
            failure_reason: 'verify_cmd_failed',
            evidence: 'test red',
            log_path: '/state/verify.log',
            terminal_reason: null
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(row.textContent).toContain('자동복구 1/2 · 원 PR 수정 중');
    const cancel = /** @type {HTMLButtonElement} */ (
      row.querySelector('.worker-mini__merge-cancel')
    );
    expect(cancel.disabled).toBe(true);
    expect(cancel.title).toContain('상단 자동 머지 중단');
    const badge = /** @type {HTMLElement} */ (
      Array.from(row.querySelectorAll('.worker-mini__badge')).find((element) =>
        element.textContent?.includes('자동복구 1/2')
      )
    );
    expect(badge.title).toContain('merge_gate · verify_cmd_failed');
    expect(badge.title).toContain('/state/verify.log');
  });

  test('shows root revalidation after a repair result', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'gating',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            repair_sessions_used: 1,
            repair_session_cap: 2,
            current_repair: null,
            active_attempt_id: null,
            terminal_reason: null
          }
        }
      })
    );

    expect(rowOf(mount, 'RD-1').textContent).toContain('root 재검증 중');
  });

  test('keeps a repair PR link on the root card without a child row', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: null, failures: {} },
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'waiting_repair_pr',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            repair_sessions_used: 1,
            repair_session_cap: 2,
            current_repair: {
              bead_id: 'RD-1-repair',
              pr_url: 'https://github.com/o/r/pull/22',
              pr_number: 22
            },
            active_attempt_id: null,
            terminal_reason: null
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(row.textContent).toContain('repair PR #22 대기');
    const link = /** @type {HTMLAnchorElement} */ (
      row.querySelector('.worker-mini__repair-pr')
    );
    expect(link.textContent).toContain('repair #22');
    expect(link.href).toBe('https://github.com/o/r/pull/22');
    expect(rowOf(mount, 'RD-1-repair')).toBe(null);
  });

  test('shows the linked repair PR merge phase on the root card', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'merging',
            subject_role: 'repair',
            subject_bead_id: 'RD-1-repair',
            repair_sessions_used: 1,
            repair_session_cap: 2,
            current_repair: {
              bead_id: 'RD-1-repair',
              pr_url: 'https://github.com/o/r/pull/22',
              pr_number: 22
            },
            active_attempt_id: null,
            terminal_reason: null
          }
        }
      })
    );

    expect(rowOf(mount, 'RD-1').textContent).toContain('repair PR #22 머지 중');
  });

  test('shows cleanup recovery on the root card', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: null, failures: {} },
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'cleaning',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            repair_sessions_used: 1,
            repair_session_cap: 2,
            current_repair: { bead_id: 'RD-1-repair' },
            active_attempt_id: null,
            terminal_reason: null
          }
        }
      })
    );

    expect(rowOf(mount, 'RD-1').textContent).toContain('정리 복구 중');
  });

  test('shows paused recovery while preserving the manual merge path', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'paused',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            repair_sessions_used: 1,
            repair_session_cap: 2,
            current_repair: null,
            active_attempt_id: null,
            terminal_reason: null
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(row.textContent).toContain('자동복구 일시정지');
    expect(
      /** @type {HTMLButtonElement} */ (
        row.querySelector('.worker-mini__merge')
      ).disabled
    ).toBe(false);
  });

  test('renders terminal recovery evidence instead of hiding malformed state', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'needs_human',
            subject_role: null,
            subject_bead_id: 'RD-1',
            repair_sessions_used: 2,
            repair_session_cap: 2,
            current_repair: null,
            active_attempt_id: null,
            evidence: 'journal malformed',
            log_path: '/state/completion.log',
            terminal_reason: 'intent_state_invalid'
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(row.textContent).toContain('사람 확인 필요 · intent_state_invalid');
    const badge = /** @type {HTMLElement} */ (
      Array.from(row.querySelectorAll('.worker-mini__badge')).find((element) =>
        element.textContent?.includes('사람 확인 필요')
      )
    );
    expect(badge.classList.contains('worker-mini__badge--alert')).toBe(true);
    expect(badge.title).toContain('journal malformed');
    expect(badge.title).toContain('/state/completion.log');
  });

  test('omits recovery UI when the optional projection is absent', () => {
    const { mount } = mountLane(laneOf(['RD-1']));

    const row = rowOf(mount, 'RD-1');
    expect(row.textContent).not.toContain('자동복구');
    expect(row.textContent).not.toContain('사람 확인 필요');
    expect(row.querySelector('.worker-mini__repair-pr')).toBe(null);
  });

  test('renders the waiting position badge and swaps 머지 for 취소', () => {
    const { mount } = mountLane(
      laneOf(['RD-1', 'RD-2'], {
        merge_queue: [
          { bead_id: 'RD-1', resolution_rounds: 0 },
          { bead_id: 'RD-2', resolution_rounds: 0 }
        ],
        merge_queue_state: { active: 'RD-1', failures: {} }
      })
    );

    const waiting = rowOf(mount, 'RD-2');
    expect(
      Array.from(waiting.querySelectorAll('.worker-mini__badge')).map(
        (b) => b.textContent
      )
    ).toContain('머지 대기 #2');
    expect(waiting.querySelector('.worker-mini__merge')).toBe(null);
    expect(
      /** @type {HTMLButtonElement} */ (
        waiting.querySelector('.worker-mini__merge-cancel')
      ).disabled
    ).toBe(false);
  });

  test('reopens a background continuation dialog with the authoritative token', async () => {
    const mismatch_one = {
      prior_available: true,
      prior: { runner: 'codex', model: 'sol' },
      current: { runner: 'claude', model: 'opus' },
      decision_token: { source_attempt_id: 'a1', digest: 'one' }
    };
    const mismatch_two = {
      ...mismatch_one,
      current: { runner: 'claude', model: 'opus', effort: 'high' },
      decision_token: { source_attempt_id: 'a1', digest: 'two' }
    };
    const refreshed_queue = laneOf(['RD-1'], {
      revision: 2,
      merge_queue: [
        {
          bead_id: 'RD-1',
          resolution_rounds: 0,
          continuation_action: {
            subject_bead_id: 'RD-1',
            continuation: null,
            decision_token: null,
            mismatch: mismatch_two
          }
        }
      ]
    });
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: refreshed_queue
      })
      .mockResolvedValueOnce({ applied: true, conflict: false });
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        revision: 1,
        merge_queue: [
          {
            bead_id: 'RD-1',
            resolution_rounds: 0,
            continuation_action: {
              subject_bead_id: 'RD-1',
              continuation: null,
              decision_token: null,
              mismatch: mismatch_one
            }
          }
        ]
      }),
      transport
    );

    /** @type {HTMLButtonElement} */ (
      rowOf(mount, 'RD-1').querySelector('.worker-mini__merge')
    ).click();
    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('.continuation-dialog button')[1]
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(
      document.querySelector('.continuation-dialog')?.textContent
    ).toContain('high');

    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('.continuation-dialog button')[1]
    ).click();
    await flush();

    expect(transport).toHaveBeenLastCalledWith('worker-merge-queue-add', {
      bead_id: 'RD-1',
      continuation: 'fresh_current',
      decision_token: mismatch_two.decision_token,
      expected_revision: 2
    });
  });

  test.each([
    ['waiting', '충돌 해소 중', true],
    ['yielded', '충돌 해소 계속 중 · 완료 후 우선 머지', true],
    ['ready', '충돌 해소 완료 · 재검증 대기', false]
  ])(
    'renders the %s resolution badge without a failure alert',
    (state, label, live) => {
      const { mount } = mountLane(
        laneOf(['RD-1'], {
          merge_queue: [
            {
              bead_id: 'RD-1',
              resolution_rounds: 1,
              resolution: {
                attempt_id: 'resolution-1',
                subject_bead_id: 'RD-1',
                deadline_at: 100,
                state,
                yielded_at: state === 'waiting' ? null : 101,
                settled_at: state === 'ready' ? 102 : null
              }
            }
          ],
          merge_queue_state: { active: null, failures: {} }
        })
      );

      const row = rowOf(mount, 'RD-1');
      const badge = /** @type {HTMLElement} */ (
        Array.from(row.querySelectorAll('.worker-mini__badge')).find(
          (element) => element.textContent === label
        )
      );

      expect(badge).toBeDefined();
      expect(badge.classList.contains('worker-mini__badge--alert')).toBe(false);
      expect(badge.classList.contains('worker-mini__badge--activity')).toBe(
        live
      );
      expect(row.textContent).toContain('머지 대기 #1');
    }
  );

  test('omits resolution UI when the optional queue field is absent', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: null, failures: {} }
      })
    );

    const text = rowOf(mount, 'RD-1').textContent || '';

    expect(text).not.toContain('충돌 해소 중');
    expect(text).not.toContain('충돌 해소 계속 중');
    expect(text).not.toContain('충돌 해소 완료');
    expect(text).toContain('머지 대기 #1');
  });

  test('the active item shows no position badge and cannot be cancelled', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: 'RD-1', failures: {} }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(
      Array.from(row.querySelectorAll('.worker-mini__badge')).map(
        (b) => b.textContent
      )
    ).not.toContain('머지 대기 #1');
    const cancel = /** @type {HTMLButtonElement} */ (
      row.querySelector('.worker-mini__merge-cancel')
    );
    expect(cancel.disabled).toBe(true);
    expect(cancel.getAttribute('title')).toContain('취소할 수 없습니다');
  });

  test('a skipped item carries its reason and restores 머지', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [],
        merge_queue_state: {
          active: null,
          failures: { 'RD-1': 'resolution_round_cap' }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(
      Array.from(row.querySelectorAll('.worker-mini__badge')).map(
        (b) => b.textContent
      )
    ).toContain('일괄 머지 실패: 충돌 해소 2회 초과');
    expect(
      /** @type {HTMLButtonElement} */ (
        row.querySelector('.worker-mini__merge')
      ).disabled
    ).toBe(false);
  });

  test('a conflict session outranks the restored 머지 button', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'running',
            conflict_resolution: true,
            started_at: 1
          }
        },
        merge_queue: [],
        merge_queue_state: {
          active: null,
          failures: { 'RD-1': 'resolution_timeout' }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');

    expect(row.textContent).toContain(
      '일괄 머지 실패: 충돌 해소 대기 시간 초과'
    );
    expect(
      /** @type {HTMLButtonElement} */ (
        row.querySelector('.worker-mini__merge')
      ).disabled
    ).toBe(true);
  });

  test('the lane header offers 자동 머지 with the eligible count', () => {
    const { mount, transport } = mountLane(laneOf(['RD-1', 'RD-2']));

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-merge-all')
    );
    expect(btn.textContent?.trim()).toBe('▶ 자동 머지 2');

    btn.click();

    expect(transport).toHaveBeenCalledWith('worker-merge-auto-toggle', {
      on: true,
      expected_revision: 1
    });
  });

  test('keeps the 자동 머지 button with no eligible row, so it can be armed early', () => {
    const { mount } = mountLane(
      queueOf({
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        pr_observations: {}
      })
    );

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-merge-all')
    );
    expect(btn.textContent?.trim()).toBe('▶ 자동 머지');
    expect(btn.disabled).toBe(false);
  });

  test('an armed mode with an empty queue reads as ⏸ 자동 머지', () => {
    const { mount } = mountLane(
      queueOf({
        auto_merge: true,
        pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
        pr_observations: {}
      })
    );

    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-merge-all')
      ).textContent?.trim()
    ).toBe('⏸ 자동 머지');
  });

  test('중단 in auto mode turns the toggle OFF rather than only emptying the queue', async () => {
    const { mount, transport } = mountLane(
      laneOf(['RD-1', 'RD-2'], {
        auto_merge: true,
        merge_queue: [
          { bead_id: 'RD-1', resolution_rounds: 0 },
          { bead_id: 'RD-2', resolution_rounds: 0 }
        ],
        merge_queue_state: { active: 'RD-1', failures: {} }
      })
    );

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-merge-all')
    );
    expect(btn.textContent?.trim()).toBe('⏸ 자동 머지 중단 2');

    btn.click();
    await Promise.resolve();
    await Promise.resolve();

    // Emptying the queue while the toggle stays on is not a stop: the next
    // observation refills it (UI-yk55 §5.2).
    expect(transport).toHaveBeenCalledWith('worker-merge-auto-toggle', {
      on: false,
      expected_revision: 1
    });
  });

  test('marks an auto-excluded row with the reason it is being passed over', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        auto_merge: true,
        auto_merge_skips: {
          'RD-1': {
            head_sha: 'a'.repeat(40),
            reason: 'resolution_round_cap',
            at: 1
          }
        }
      })
    );

    expect(rowOf(mount, 'RD-1').textContent).toContain(
      '자동 제외: 충돌 해소 2회 초과'
    );
  });

  test('leaves an auto-excluded row out of the ▶ 자동 머지 count', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        auto_merge_skips: {
          'RD-1': {
            head_sha: 'a'.repeat(40),
            reason: 'verify_cmd_failed',
            at: 1
          }
        }
      })
    );

    // N은 "켜면 들어갈 수"다 (UI-yk55 §5.1): 같은 head로 제외된 행을 세면 실제
    // 편입은 0건인데 양수를 보이게 된다.
    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-merge-all')
      ).textContent?.trim()
    ).toBe('▶ 자동 머지');
  });

  test('still counts a row whose exclusion was pinned to an older head', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        auto_merge_skips: {
          'RD-1': {
            head_sha: '9'.repeat(40),
            reason: 'verify_cmd_failed',
            at: 1
          }
        }
      })
    );

    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-merge-all')
      ).textContent?.trim()
    ).toBe('▶ 자동 머지 1');
  });

  test('says nothing about an exclusion while auto mode is OFF', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        auto_merge_skips: {
          'RD-1': {
            head_sha: 'a'.repeat(40),
            reason: 'resolution_round_cap',
            at: 1
          }
        }
      })
    );

    expect(rowOf(mount, 'RD-1').textContent).not.toContain('자동 제외');
  });

  test('a running queue turns the header button into 일괄 머지 중단', async () => {
    const { mount, transport } = mountLane(
      laneOf(['RD-1', 'RD-2'], {
        merge_queue: [
          { bead_id: 'RD-1', resolution_rounds: 0 },
          { bead_id: 'RD-2', resolution_rounds: 0 }
        ],
        merge_queue_state: { active: 'RD-1', failures: {} }
      })
    );

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-merge-all')
    );
    expect(btn.textContent?.trim()).toBe('일괄 머지 중단 2');

    btn.click();
    await Promise.resolve();
    await Promise.resolve();

    // ONE bulk request: the server drops every waiting item and keeps the
    // active one, atomically. Per-row removal would race the active item's
    // completion (codex implementation review 2026-07-28 finding 7).
    expect(transport).toHaveBeenCalledTimes(1);
    expect(transport).toHaveBeenCalledWith('worker-merge-queue-remove', {
      all: true,
      expected_revision: 1
    });
  });

  test('[취소] sends the remove message for that row', () => {
    const { mount, transport } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: null, failures: {} }
      })
    );

    /** @type {HTMLButtonElement} */ (
      rowOf(mount, 'RD-1').querySelector('.worker-mini__merge-cancel')
    ).click();

    expect(transport).toHaveBeenCalledWith('worker-merge-queue-remove', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
  });

  test('a queued row cannot be discarded out from under the driver', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: null, failures: {} }
      })
    );

    const discard = /** @type {HTMLButtonElement} */ (
      rowOf(mount, 'RD-1').querySelector('.worker-mini__discard')
    );
    expect(discard.disabled).toBe(true);
    expect(discard.getAttribute('title')).toContain('[취소]');
  });
});

describe('mergeFailureText (UI-5v7d §4)', () => {
  test('translates the driver vocabulary', () => {
    expect(mergeFailureText('resolution_round_cap')).toBe('충돌 해소 2회 초과');
    expect(mergeFailureText('merge_unconfirmed_timeout')).toBe(
      '머지 확인 시간 초과'
    );
  });

  test('passes an unknown reason through instead of blanking the badge', () => {
    expect(mergeFailureText('brand_new_reason')).toBe('brand_new_reason');
  });
});

describe('완료 레인 최신순 + 기간 필터 (UI-d7pw §3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} q
   * @returns {HTMLElement}
   */
  function renderDone(
    q,
    stores = createTestIssueStores(),
    transport = vi.fn()
  ) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(q);
    createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport
    });
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @returns {string[]}
   */
  function doneIds(mount) {
    return Array.from(
      mount.querySelectorAll('#worker-pane-done .worker-mini')
    ).map((el) => el.getAttribute('data-bead-id') || '');
  }

  const DAY = 864e5;

  test('orders the 완료 lane newest first', () => {
    const base = startOfToday();

    const mount = renderDone(
      queueOf({
        done: [
          { bead_id: 'OLD', added_at: base + 1000 },
          { bead_id: 'MID', added_at: base + 2000 },
          { bead_id: 'NEW', added_at: base + 3000 }
        ]
      })
    );

    expect(doneIds(mount)).toEqual(['NEW', 'MID', 'OLD']);
  });

  test('hides an entry completed before today by default', () => {
    const base = startOfToday();

    const mount = renderDone(
      queueOf({
        done: [
          { bead_id: 'YESTERDAY', added_at: base - 1 },
          { bead_id: 'TODAY', added_at: base + 1 }
        ]
      })
    );

    expect(doneIds(mount)).toEqual(['TODAY']);
  });

  test('keeps an entry completed exactly at the day boundary', () => {
    const base = startOfToday();

    const mount = renderDone(
      queueOf({ done: [{ bead_id: 'BOUNDARY', added_at: base }] })
    );

    expect(doneIds(mount)).toEqual(['BOUNDARY']);
  });

  test('shows an older entry once the persisted range widens', () => {
    window.localStorage.setItem('bdui.worker.done-range', '7d');
    const now = Date.now();

    const mount = renderDone(
      queueOf({ done: [{ bead_id: 'THREE-DAYS', added_at: now - 3 * DAY }] })
    );

    expect(doneIds(mount)).toEqual(['THREE-DAYS']);
  });

  test('keeps an entry whose added_at is missing rather than hiding it', () => {
    const mount = renderDone(queueOf({ done: [{ bead_id: 'LEGACY' }] }));

    expect(doneIds(mount)).toEqual(['LEGACY']);
  });

  test('names the selected range in the lane header', () => {
    window.localStorage.setItem('bdui.worker.done-range', '30d');

    const mount = renderDone(queueOf({ done: [] }));

    expect(
      mount.querySelector('#worker-pane-done .worker-pane__title')?.textContent
    ).toContain('최근 30일');
  });

  test('renders the range select inside the pane controls strip', () => {
    const mount = renderDone(queueOf({ done: [] }));

    expect(
      mount.querySelector('#worker-pane-done .worker-done-range')
    ).not.toBe(null);
  });

  test('persists a range change to localStorage', () => {
    const mount = renderDone(queueOf({ done: [] }));
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.worker-done-range')
    );

    select.value = 'all';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.worker.done-range')).toBe('all');
  });

  test('does not treat the range select as the candidate sort', () => {
    const mount = renderDone(queueOf({ done: [] }));
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.worker-done-range')
    );

    select.value = 'all';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.worker.candidate_sort')).toBe(
      null
    );
  });

  test('renders a session report once with its closed completion time', async () => {
    const now = Date.now();
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'SESSION-1',
        title: '대화형 세션 완료',
        status: 'closed',
        created_at: now - 20_000,
        updated_at: now - 1_000,
        closed_at: now - 4_000,
        comment_count: 1
      }
    ]);
    const transport = vi.fn().mockResolvedValue([
      {
        id: 'comment-1',
        text: [
          '## 🤖 작업 보고서',
          '> session · sid session-1 · 2026-08-12T00:00:00Z',
          '',
          '**결론** — 완료'
        ].join('\n')
      }
    ]);

    const mount = renderDone(queueOf(), stores, transport);
    await flush();

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="SESSION-1"]')
    );
    expect(row.textContent).toContain('세션 작업');
    expect(row.querySelector('.worker-mini__done-at')?.textContent).toContain(
      '완료'
    );
    expect(row.querySelector('.worker-usage')).toBe(null);
    expect(transport).toHaveBeenCalledTimes(1);
  });

  test('excludes worker, plain, and malformed closed comments', async () => {
    const now = Date.now();
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'WORKER-REPORT',
        title: 'worker report',
        status: 'closed',
        updated_at: now,
        closed_at: now,
        comment_count: 1
      },
      {
        id: 'PLAIN',
        title: 'plain comment',
        status: 'closed',
        updated_at: now,
        closed_at: now,
        comment_count: 1
      },
      {
        id: 'MALFORMED',
        title: 'malformed report',
        status: 'closed',
        updated_at: now,
        closed_at: now,
        comment_count: 1
      }
    ]);
    const transport = vi.fn((/** @type {string} */ _type, payload) => {
      const id = /** @type {any} */ (payload).id;
      if (id === 'WORKER-REPORT') {
        return Promise.resolve([
          {
            text: [
              '## 🤖 작업 보고서',
              '> worker · attempt attempt-1 · 2026-08-12T00:00:00Z'
            ].join('\n')
          }
        ]);
      }
      if (id === 'MALFORMED') {
        return Promise.resolve([
          {
            text: '## 🤖 작업 보고서\n> session · sid broken timestamp'
          }
        ]);
      }
      return Promise.resolve([{ text: '사람이 남긴 일반 댓글' }]);
    });

    const mount = renderDone(queueOf(), stores, transport);
    await flush();

    expect(doneIds(mount)).toEqual([]);
  });

  test('keeps the worker done row when a session report duplicates its bead', async () => {
    const now = Date.now();
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'DUPLICATE',
        title: 'closed title must not replace worker title',
        status: 'closed',
        updated_at: now,
        closed_at: now,
        comment_count: 1
      }
    ]);
    const transport = vi.fn().mockResolvedValue([
      {
        text: [
          '## 🤖 작업 보고서',
          '> session · sid session-1 · 2026-08-12T00:00:00Z'
        ].join('\n')
      }
    ]);

    const mount = renderDone(
      queueOf({
        done: [{ bead_id: 'DUPLICATE', added_at: now - 1_000 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'DUPLICATE',
            status: 'done',
            usage: { input_tokens: 100, output_tokens: 50 }
          }
        }
      }),
      stores,
      transport
    );
    await flush();

    expect(doneIds(mount)).toEqual(['DUPLICATE']);
    expect(
      mount.querySelector('.worker-mini[data-bead-id="DUPLICATE"]')?.textContent
    ).not.toContain('세션 작업');
    expect(transport).not.toHaveBeenCalled();
    expect(
      mount.querySelector('.worker-kpi__chip--tokens')?.textContent
    ).toContain('150');
  });

  test('retries a failed session comment request after the next closed snapshot', async () => {
    const now = Date.now();
    const stores = createTestIssueStores();
    const issue = {
      id: 'RETRY-SESSION',
      title: '다시 조회하는 세션',
      status: 'closed',
      updated_at: now,
      closed_at: now,
      comment_count: 1
    };
    seed(stores, 'tab:worker:closed', [issue]);
    const transport = vi
      .fn()
      .mockRejectedValueOnce(new Error('temporary bd failure'))
      .mockResolvedValueOnce([
        {
          text: [
            '## 🤖 작업 보고서',
            '> session · sid retry-1 · 2026-08-12T00:00:00Z'
          ].join('\n')
        }
      ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf());
    createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport
    });
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(doneIds(mount)).toEqual([]);

    queueStore.set(queueOf({ revision: 2 }));
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);

    stores.getStore('tab:worker:closed').applyPush({
      type: 'snapshot',
      id: 'tab:worker:closed',
      revision: 2,
      issues: [issue]
    });
    await flush();

    expect(transport).toHaveBeenCalledTimes(2);
    expect(doneIds(mount)).toEqual(['RETRY-SESSION']);
  });

  test('orders worker and session completion rows by their shared completion time', async () => {
    const now = Date.now();
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'SESSION-NEWER',
        title: '더 최근 세션',
        status: 'closed',
        updated_at: now,
        closed_at: now - 1_000,
        comment_count: 1
      }
    ]);
    const transport = vi.fn().mockResolvedValue([
      {
        text: [
          '## 🤖 작업 보고서',
          '> session · sid newer-1 · 2026-08-12T00:00:00Z'
        ].join('\n')
      }
    ]);

    const mount = renderDone(
      queueOf({
        done: [{ bead_id: 'WORKER-OLDER', added_at: now - 5_000 }]
      }),
      stores,
      transport
    );
    await flush();

    expect(doneIds(mount)).toEqual(['SESSION-NEWER', 'WORKER-OLDER']);
  });
});

describe('레인 행 생성·수정 시각 (UI-d7pw §4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} q
   * @param {any} [stores]
   * @returns {HTMLElement}
   */
  function renderTimes(q, stores) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(q);
    createWorkerView(mount, {
      issueStores: stores || createTestIssueStores(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  const HOUR = 36e5;

  test('renders a meta line on a 완료 row from bead_times', () => {
    const now = Date.now();

    const mount = renderTimes(
      queueOf({
        done: [{ bead_id: 'DN-1', added_at: 1 }],
        bead_times: {
          'DN-1': { created_at: now - 48 * HOUR, updated_at: now - 3 * HOUR }
        }
      })
    );

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="DN-1"] .worker-mini__meta'
      )?.textContent
    ).toContain('생성');
  });

  test('renders no meta line when the server sends no bead_times', () => {
    const mount = renderTimes(
      queueOf({ done: [{ bead_id: 'DN-1', added_at: 1 }] })
    );

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="DN-1"] .worker-mini__meta'
      )
    ).toBe(null);
  });

  test('renders no meta line for a bead missing from bead_times', () => {
    const now = Date.now();

    const mount = renderTimes(
      queueOf({
        done: [{ bead_id: 'DN-1', added_at: 1 }],
        bead_times: { OTHER: { created_at: now, updated_at: now } }
      })
    );

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="DN-1"] .worker-mini__meta'
      )
    ).toBe(null);
  });

  test('renders the 수정 half when only updated_at is known', () => {
    const now = Date.now();

    const mount = renderTimes(
      queueOf({
        done: [{ bead_id: 'DN-1', added_at: 1 }],
        bead_times: { 'DN-1': { created_at: null, updated_at: now - HOUR } }
      })
    );

    const meta = mount.querySelector(
      '.worker-mini[data-bead-id="DN-1"] .worker-mini__meta'
    );
    expect(meta?.textContent).toContain('수정');
    expect(meta?.textContent).not.toContain('생성');
  });

  // 완료 행은 UI-rkly §3에서 2줄 계약으로 바뀌었으므로, 한 줄 변형이 남아 있는
  // 대기 행으로 이 구조를 검증한다 (완료 2줄은 `lanes.test.js`가 덮는다).
  test('wraps the single-line row body so the meta line is a sibling', () => {
    const now = Date.now();

    const mount = renderTimes(
      queueOf({
        queue: [{ bead_id: 'QN-1', added_at: 1 }],
        bead_times: { 'QN-1': { created_at: now, updated_at: now } }
      })
    );

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="QN-1"] > .worker-mini__line'
      )
    ).not.toBe(null);
  });

  test('renders a done row as two lines carrying the completion time', () => {
    window.localStorage.setItem('bdui.worker.done-range', 'all');
    const now = Date.now();

    const mount = renderTimes(
      queueOf({
        done: [{ bead_id: 'DN-1', added_at: now - 7_200_000 }],
        bead_times: { 'DN-1': { created_at: now, updated_at: now } }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="DN-1"]')
    );
    expect(row.querySelector('.worker-mini__row1 .worker-usage')).toBe(null);
    expect(
      row.querySelector('.worker-mini__row2 .worker-mini__done-at')?.textContent
    ).toContain('2시간 전');
  });

  test('keeps the drag contract on the row shell', () => {
    const now = Date.now();

    const mount = renderTimes(
      queueOf({
        queue: [{ bead_id: 'QQ-1', added_at: 1 }],
        bead_times: { 'QQ-1': { created_at: now, updated_at: now } }
      })
    );

    const row = mount.querySelector('.worker-mini[data-bead-id="QQ-1"]');
    expect(row?.getAttribute('data-lane')).toBe('queue');
  });

  test('renders a meta line on a PR 대기 card', () => {
    const now = Date.now();

    const mount = renderTimes(
      queueOf({
        pr_wait: [{ bead_id: 'PW-1', added_at: 1 }],
        bead_times: {
          'PW-1': { created_at: now - 72 * HOUR, updated_at: now - 20 * 6e4 }
        }
      })
    );

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="PW-1"] .worker-mini__meta'
      )?.textContent
    ).toContain('수정');
  });

  test('renders a meta line on a running tile', () => {
    const now = Date.now();

    const mount = renderTimes(
      queueOf({
        queue: [{ bead_id: 'RN-1', added_at: 1 }],
        bead_times: {
          'RN-1': { created_at: now - 5 * HOUR, updated_at: now - HOUR }
        },
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RN-1',
            status: 'running',
            started_at: now
          }
        }
      })
    );

    expect(
      mount.querySelector('.rtile .worker-mini__meta')?.textContent
    ).toContain('생성');
  });
});
