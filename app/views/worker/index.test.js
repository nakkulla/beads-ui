import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from '../../data/session-log-store.js';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
import { createWorkerQueueStore } from '../../data/worker-queue-store.js';
import { formatTimestampLocal } from '../../utils/relative-time.js';
import {
  activityBadge,
  autoResolutionBadge,
  createWorkerView,
  mergeFailureText,
  mergeQueueRefusalText,
  mergeStepView,
  mergeWaitingText,
  prStatusBadge,
  receiptWarningCodes
} from './index.js';

/** A format-valid spec review receipt (`<reviewer>@<40-hex>`), which the
 * evidence predicate requires before a spec counts as PUBLISHED (UI-vb7u §2). */
const RECEIPT = 'codex@' + 'a'.repeat(40);

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
      spec_id: 'SPEC-1',
      metadata: { route: 'spec_backed', spec_review: RECEIPT }
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
      spec_id: 'SPEC-2',
      metadata: { route: 'spec_backed', spec_review: RECEIPT },
      // 실제 서버 push의 embedded edge 형태: blocker id는 `depends_on_id`.
      dependencies: [
        { issue_id: 'BL-1', depends_on_id: 'DEP-9', type: 'blocks' }
      ]
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
          'opus-4.8': { id: 'claude-opus-4-8' },
          'opus-4.6': { id: 'claude-opus-4-6' },
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
      'opus-4.8': 'claude',
      'opus-4.6': 'claude',
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
 * Simulate a native drag of a mini row into a target pane. 드롭은 그 pane이
 * 소유한 `[data-drop]` 영역에 떨어진다 (UI-4tud §4.5) — 접힌 pane은 본문을
 * 그리지 않으므로 pane 자신이 타깃이다.
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
  const zone = /** @type {HTMLElement} */ (
    pane.querySelector('[data-drop]') || pane
  );
  const drop = new Event('drop', { bubbles: true, cancelable: true });
  Object.defineProperty(drop, 'dataTransfer', { value: dt });
  zone.dispatchEvent(drop);
}

async function flush() {
  for (let i = 0; i < 5; i++) {
    await Promise.resolve();
  }
}

/**
 * Ready A/C + Blocked B, all spec-eligible, with explicit created_at so the
 * merged candidate lane has a deterministic effective-rank order. `updated_at`
 * is deliberately NOT in created order (A newest, then C, then B) so the
 * `최신 수정순` mode is distinguishable from every other mode.
 */
function seedMerged() {
  const stores = createTestIssueStores();
  seed(stores, 'tab:worker:ready', [
    {
      id: 'A',
      title: 'ready A',
      status: 'open',
      created_at: 100,
      updated_at: 3000,
      spec_id: 'S',
      metadata: { route: 'spec_backed', spec_review: RECEIPT }
    },
    {
      id: 'C',
      title: 'ready C',
      status: 'open',
      created_at: 300,
      updated_at: 2000,
      spec_id: 'S',
      metadata: { route: 'spec_backed', spec_review: RECEIPT }
    }
  ]);
  seed(stores, 'tab:worker:blocked', [
    {
      id: 'B',
      title: 'blocked B',
      status: 'open',
      created_at: 200,
      updated_at: 1000,
      spec_id: 'S',
      metadata: { route: 'spec_backed', spec_review: RECEIPT },
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
 * The `[대기로 ↴]` button of one candidate card — 후보 레인에서 대기로 가는
 * 유일한 경로다 (UI-d13v §6).
 *
 * @param {HTMLElement} mount
 * @param {string} bead_id
 * @returns {HTMLButtonElement}
 */
function placeButton(mount, bead_id) {
  return /** @type {HTMLButtonElement} */ (
    mount.querySelector(
      `.worker-card[data-bead-id="${bead_id}"] .worker-card__place`
    )
  );
}

/**
 * Click the `[대기로 ↴]` button of one candidate card.
 *
 * @param {HTMLElement} mount
 * @param {string} bead_id
 */
function placeToQueue(mount, bead_id) {
  placeButton(mount, bead_id).dispatchEvent(
    new MouseEvent('click', { bubbles: true })
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
 * Expand the 완료 lane before rendering. 완료 is the one lane that starts
 * collapsed (UI-5ksp §3-3) and a collapsed pane renders no body, so every test
 * that reads a done row has to say it wants the lane open.
 */
function expandDoneLane() {
  window.localStorage.setItem(
    'beads-ui.worker.lane-collapsed',
    JSON.stringify({ lanes: { done: false }, areas: {} })
  );
}

/**
 * Preseed the candidate display filter (UI-ki09). blocked rows are hidden by
 * default, so a test about blocked candidates asks for them explicitly.
 *
 * @param {Partial<{ show_blocked: boolean, readiness: 'all'|'ready'|'not_ready' }>} over
 */
function presetCandidateFilter(over) {
  window.localStorage.setItem(
    'beads-ui.worker.candidate-filter',
    JSON.stringify({ show_blocked: false, readiness: 'all', ...over })
  );
}

describe('views/worker', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
    expandDoneLane();
  });

  test('renders a clear label for a completion wait needing attention', () => {
    const label = mergeWaitingText('completion_waiting:needs_human');

    expect(label).toBe('확인 필요');
  });

  test('hides an unknown internal completion phase', () => {
    const label = mergeWaitingText('completion_waiting:future_phase');

    expect(label).toBe(null);
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
    expect(placeButton(cand, 'RD-2').disabled).toBe(true);

    // blocker id가 있으면 칩만 그것을 적는다 (UI-tf6d): 잠금 문장은 같은 id를
    // 두 번째로 적지 않는다.
    const bl1 = /** @type {HTMLElement} */ (
      cand.querySelector('.worker-card[data-bead-id="BL-1"]')
    );
    expect(bl1.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ 외부/DEP-9'
    );
    expect(bl1.querySelector('.worker-card__reason')).toBeNull();

    const rd1 = /** @type {HTMLElement} */ (
      cand.querySelector('.worker-card[data-bead-id="RD-1"]')
    );
    expect(rd1.getAttribute('draggable')).toBe('false');
    expect(placeButton(cand, 'RD-1').disabled).toBe(false);
  });

  // 사유는 두 갈래로 갈린다 (UI-vb7u §3): 경로가 아예 없으면 `spec 없음`,
  // 경로는 있는데 리뷰 영수증이 없거나 형식이 깨졌으면 `spec 미발행(draft)`.
  test('names an unpublished spec path as a draft, not as a missing spec', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'DRAFT-1',
        title: 'spec awaiting review',
        status: 'open',
        spec_id: 'docs/awaiting.md'
      },
      {
        id: 'NONE-1',
        title: 'no spec at all',
        status: 'open',
        metadata: {}
      }
    ]);
    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const draft = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="DRAFT-1"]')
    );
    const none = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="NONE-1"]')
    );
    expect(draft.querySelector('.worker-card__reason')?.textContent).toContain(
      'spec 미발행(draft)'
    );
    expect(none.querySelector('.worker-card__reason')?.textContent).toContain(
      'spec 없음'
    );
  });

  test('leaves a candidate whose spec is unpublished undraggable', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'DRAFT-2',
        title: 'spec awaiting review',
        status: 'open',
        spec_id: 'docs/awaiting.md',
        metadata: { spec_review: 'codex@abc' }
      }
    ]);
    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const draft = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="DRAFT-2"]')
    );
    expect(draft.getAttribute('draggable')).toBe('false');
  });

  test('candidate cards carry the bead priority badge', () => {
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

    expect(
      cand
        .querySelector('.worker-card[data-bead-id="RD-1"] .worker-pri')
        ?.textContent?.trim()
    ).toBe('P1');
    expect(
      cand
        .querySelector('.worker-card[data-bead-id="RD-2"] .worker-pri')
        ?.textContent?.trim()
    ).toBe('P2');
  });

  test('blocked chip prefers server blocked_info blockers over dependency edges', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'BL-2',
        title: 'blocked via blocked_info',
        status: 'open',
        spec_id: 'SPEC-3',
        metadata: { route: 'spec_backed', spec_review: RECEIPT },
        blocked_info: { external: false, reason: null, blockers: ['DEP-7'] },
        // blocked_info가 있으면 edge fallback은 읽지 않는다 (닫힌 blocker 오탐 방지).
        dependencies: [
          { issue_id: 'BL-2', depends_on_id: 'DEP-OLD', type: 'blocks' }
        ]
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });

    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="BL-2"]')
    );
    const chips = Array.from(card.querySelectorAll('.worker-dep--pred'))
      .map((el) => el.textContent || '')
      .join(' ');
    expect(chips).toContain('⛓ 외부/DEP-7');
    expect(chips).not.toContain('DEP-OLD');
  });

  // UI-tf6d: UI-anna §2 결정 4는 "뱃지와 칩이 같은 blocker id를 한 카드에
  // 두 번 적지 않는다"이다. 그 말은 id를 모를 때까지 칩이 대신해 준다는 뜻이
  // 아니다 — 칩은 재료가 없으면 서지 않으므로(§5.1 fail-quiet), 그 경우에만
  // 잠금 문장이 "막혔다"를 말하는 유일한 표시로 남는다.
  test('keeps the id-less lock sentence when no blocker id is known', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'BL-3',
        title: 'blocked without blocker ids',
        status: 'open',
        spec_id: 'SPEC-4',
        metadata: { route: 'spec_backed', spec_review: RECEIPT },
        blocked_info: { external: true, reason: null, blockers: [] }
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });

    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="BL-3"]')
    );
    expect(card.querySelector('.worker-dep--pred')).toBeNull();
    expect(card.querySelector('.worker-card__reason')?.textContent).toContain(
      '🔒 blocked'
    );
  });

  // UI-8881 seam 1: the 08-10 enforcement spec dropped these rows entirely; the
  // candidate lane now SHOWS them as observation-only cards instead. Server
  // admission/dispatch stays the execution boundary.
  test('renders a worker-ineligible issue as an observation-only candidate', () => {
    // One snapshot, not a second `seed()` on the same store: `applyPush`
    // discards a snapshot whose revision is not newer, so layering would leave
    // the bead out of the feed entirely and prove nothing.
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'RD-1',
        title: 'ready with spec',
        status: 'open',
        spec_id: 'SPEC-1',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      },
      {
        id: 'NO-WORKER',
        title: 'interactive only',
        status: 'open',
        spec_id: 'SPEC-X',
        metadata: { route: 'spec_backed', spec_review: RECEIPT },
        labels: ['worker-ineligible']
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="NO-WORKER"]')
    );
    expect(card).not.toBeNull();
    expect(card.classList.contains('worker-card--ineligible')).toBe(true);
    expect(placeButton(mount, 'NO-WORKER').disabled).toBe(true);
    expect(placeButton(mount, 'RD-1').disabled).toBe(false);
  });

  test('refuses placement for an awaiting_user candidate and names the reason', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'RD-1',
        title: 'ready with spec',
        status: 'open',
        spec_id: 'SPEC-1',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      },
      {
        id: 'PARKED-1',
        title: 'awaiting the user',
        status: 'open',
        spec_id: 'SPEC-Y',
        metadata: {
          route: 'spec_backed',
          spec_review: RECEIPT,
          awaiting_user: 'spec_review_stale:revise'
        }
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="PARKED-1"]')
    );
    expect(card).not.toBeNull();
    expect(card.querySelector('.worker-card__reason')?.textContent).toContain(
      '사용자 리뷰 필요: spec_review_stale:revise'
    );
    expect(placeButton(mount, 'PARKED-1').disabled).toBe(true);
    expect(placeButton(mount, 'RD-1').disabled).toBe(false);
  });

  test('leaves a candidate placeable when metadata carries no awaiting_user', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'RD-1',
        title: 'ready with spec',
        status: 'open',
        spec_id: 'SPEC-1',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      },
      {
        id: 'NO-META',
        title: 'no metadata at all',
        status: 'open',
        spec_id: 'SPEC-Z',
        spec_review: RECEIPT,
        metadata: null
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(placeButton(mount, 'RD-1').disabled).toBe(false);
    expect(
      mount.querySelector('.worker-card[data-bead-id="NO-META"]')
    ).not.toBeNull();
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

  test('placing a candidate sends worker-queue-place with the current revision', async () => {
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

    placeToQueue(mount, 'RD-1');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
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

    placeToQueue(mount, 'RD-1');
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

    // Drop A at the parallel tail — same lane → reorder. (마지막 행을 말미에
    // 놓는 것은 제자리라 op가 없다: 움직인 행만 op를 낸다.)
    drag(mount, 'A', 'worker-pane-queue');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-reorder', {
      bead_id: 'A',
      to_index: 1,
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

  test('renders and sends identity-bound stale-work recovery actions', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        revision: 7,
        queue: [{ bead_id: 'SQ-1', added_at: 0 }],
        admission: {
          'SQ-1': {
            reason: 'worktree_stale_work',
            at: 1,
            stale_work: {
              state: 'unique',
              cause: 'dirty_unique',
              summary: {
                staged_count: 1,
                unstaged_count: 2,
                untracked_count: 0,
                branch_ahead: 1,
                head_ahead: 0
              },
              action_id: 'opaque-action',
              can_resume: false,
              can_continue: true,
              can_backup_fresh: true,
              can_recheck: false
            }
          }
        },
        workspace_info: { verify_cmd: null }
      })
    );
    const transport = vi.fn(async () => ({
      continued: true,
      conflict: false,
      queue: queueStore.get()
    }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    const row = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-queue .worker-mini[data-bead-id="SQ-1"]'
      )
    );

    row
      .querySelector('.worker-mini__stale-continue')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(row.textContent).toContain('이전 작업 보존됨');
    expect(row.getAttribute('draggable')).toBe('false');
    expect(transport).toHaveBeenCalledWith('worker-stale-work-continue', {
      bead_id: 'SQ-1',
      action_id: 'opaque-action',
      expected_revision: 7
    });
  });

  test('keeps the legacy stale-work badge when optional projection is absent', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'SQ-1', added_at: 0 }],
        admission: {
          'SQ-1': { reason: 'worktree_stale_work', at: 1 }
        },
        workspace_info: { verify_cmd: null }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    expect(
      mount.querySelector(
        '#worker-pane-queue .worker-mini[data-bead-id="SQ-1"]'
      )?.textContent
    ).toContain('⛔ worktree_stale_work');
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
    // The repo-operation declaration lives in its own inline section.
    expect(mount.querySelector('.worker-repo-ops-settings')).not.toBeNull();
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
      mount.querySelectorAll(
        '.worker-lanes > .worker-pane > .worker-pane__hd .worker-pane__title'
      )
    ).map((el) => (el.textContent || '').trim());

    expect(titles).toEqual(['후보', '대기', '실행 중', 'PR 대기', '완료']);
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
    // 적재 진입점은 이제 `[대기로 ↴]` 하나다 (UI-d13v §6) — 소스 pane은 드래그
    // 핸들이 아니라 그 버튼을 살아 있는 채로 내놓아야 한다.
    expect(placeButton(cand, 'RD-1').disabled).toBe(false);
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

  test('running and failed attempts render tiles without a failure banner', () => {
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

    expect(
      mount.querySelector('.rtile[data-attempt-id="a3"] .rtile__failure-badge')
    ).not.toBeNull();
    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
    expect(mount.querySelector('.worker-banner--breaker')).toBeNull();
  });

  // Worker 어댑터가 Monitor와 같은 키를 실어야 한다 (선행 대기 계층 §5.4,
  // ADR 14): 빠뜨리면 같은 렌더러가 이 타일을 실행 중 타일로 그려 시계와 세션
  // 조작을 준다.
  test('renders a waiting attempt as a held tile with the 선행 대기 badge', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'W1', added_at: 0 }],
        attempts: {
          aw: {
            attempt_id: 'aw',
            bead_id: 'W1',
            status: 'waiting',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 5000,
            finished_at: Date.now() - 1000,
            cause: 'prerequisite_unmet',
            cause_detail: {
              summary: '선행 미충족으로 착수하지 않았습니다',
              blockers: [{ id: 'W9', rig: null, status: 'open' }],
              bead_status: 'open'
            }
          }
        }
      })
    );

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="aw"]')
    );
    expect(tile.querySelector('.rtile__held-badge')?.textContent).toBe(
      '⛓ 선행 대기'
    );
    expect(tile.querySelector('.rtile__elapsed')?.textContent).toBe(
      '선행 대기'
    );
    expect(tile.querySelector('.rtile__held-summary')?.textContent).toBe(
      '선행 미충족으로 착수하지 않았습니다'
    );
    expect(tile.querySelector('.rtile__pause')).toBeNull();
    expect(tile.querySelector('.rtile__failure-badge')).toBeNull();
  });

  // 슬롯 4a 의존 칩은 이 결말이 답하는 유일한 사실 — 무엇을 기다리는가 — 이므로
  // held 본문이 그린다 (선행 대기 계층 §2·§5.1·§6).
  test('draws the blocker chip on a waiting tile', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'W1', added_at: 0 }],
        attempts: {
          aw: {
            attempt_id: 'aw',
            bead_id: 'W1',
            status: 'waiting',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now() - 5000,
            finished_at: Date.now() - 1000,
            cause: 'prerequisite_unmet',
            cause_detail: {
              summary: '선행 미충족으로 착수하지 않았습니다',
              blockers: [{ id: 'W9', rig: null, status: 'open' }],
              bead_status: 'open'
            }
          }
        }
      })
    );

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="aw"]')
    );
    expect(tile.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ W9'
    );
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

  test('renders session_active rows as session tiles after attempt tiles', () => {
    const mount = mountAttemptTiles({
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'W1',
          status: 'running',
          runner: 'claude',
          model: 'opus',
          started_at: Date.now() - 5000
        }
      },
      session_active: [
        {
          bead_id: 'UI-sess',
          title: '세션 작업',
          status: 'in_progress',
          updated_at: Date.now() - 60_000
        }
      ]
    });

    const tiles = mount.querySelectorAll(
      '#worker-pane-running .worker-rungrid .rtile'
    );

    expect(tiles.length).toBe(2);
    const last = /** @type {HTMLElement} */ (tiles[1]);
    expect(last.dataset.beadId).toBe('UI-sess');
    expect(last.classList.contains('rtile--session')).toBe(true);
    expect(last.querySelector('.rtile__session-badge')).not.toBeNull();
  });

  test('draws [▤ 세션] on a session tile that carries a current session_ref', () => {
    const mount = mountAttemptTiles({
      session_active: [
        {
          bead_id: 'UI-sess',
          title: '세션 작업',
          status: 'in_progress',
          session_refs: [
            {
              index: 0,
              provider: 'claude',
              session_id: 'a1b2c3d4-5e6f',
              host: 'mac',
              current: true,
              locality: 'local',
              last_event_at: Date.now() - 30_000,
              resume_command: "claude --resume 'a1b2c3d4-5e6f'"
            }
          ]
        }
      ]
    });

    const button = mount.querySelector(
      '.rtile[data-bead-id="UI-sess"] .rtile__session'
    );

    expect(button).not.toBeNull();
    expect(/** @type {HTMLButtonElement} */ (button).disabled).toBe(false);
  });

  test('opens the session transcript from a session tile like the monitor does', () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountAttemptTiles(
      {
        session_active: [
          {
            bead_id: 'UI-sess',
            title: '세션 작업',
            status: 'in_progress',
            session_refs: [
              {
                index: 0,
                provider: 'claude',
                session_id: 'a1b2c3d4-5e6f',
                host: 'mac',
                current: true,
                locality: 'local',
                last_event_at: Date.now() - 30_000,
                resume_command: "claude --resume 'a1b2c3d4-5e6f'"
              }
            ]
          }
        ]
      },
      transport
    );

    const button = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="UI-sess"] .rtile__session')
    );
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).toHaveBeenCalledWith(
      'subscribe-session-log',
      expect.objectContaining({
        attempt_id: 'session:claude:a1b2c3d4-5e6f',
        session_ref: {
          bead_id: 'UI-sess',
          provider: 'claude',
          session_id: 'a1b2c3d4-5e6f'
        }
      })
    );
    expect(mount.querySelector('.sv__id')?.textContent?.trim()).toBe(
      'claude · a1b2c3d4'
    );
    expect(
      mount
        .querySelector('.rtile[data-bead-id="UI-sess"]')
        ?.classList.contains('rtile--sel')
    ).toBe(false);
  });

  test('skips a session row whose bead an attempt tile already draws', () => {
    const mount = mountAttemptTiles({
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'UI-sess',
          status: 'running',
          runner: 'claude',
          model: 'opus'
        }
      },
      session_active: [
        { bead_id: 'UI-sess', title: '세션 작업', status: 'in_progress' }
      ]
    });

    const tiles = mount.querySelectorAll(
      '#worker-pane-running .worker-rungrid .rtile'
    );

    expect(tiles.length).toBe(1);
    expect(/** @type {HTMLElement} */ (tiles[0]).dataset.attemptId).toBe('a1');
  });

  test('a session tile neither counts into 실행 nor lights the live accent', () => {
    const mount = mountAttemptTiles({
      session_active: [
        { bead_id: 'UI-sess', title: '세션 작업', status: 'in_progress' }
      ]
    });

    const running_chip = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-kpi__chip--running b')
    );
    const pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-running')
    );

    expect(running_chip.textContent).toBe('0');
    expect(pane.className).not.toContain('worker-pane--live');
    expect(pane.querySelectorAll('.rtile').length).toBe(1);
  });

  test('draws the attempt 최근 활동 line on a running tile', () => {
    const mount = mountAttemptTiles({
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'W1',
          status: 'running',
          runner: 'claude',
          model: 'opus',
          started_at: Date.now() - 5000,
          last_activity: {
            at: Date.now() - 12_000,
            kind: 'tool',
            text: 'Unit server: cross-lanes store + ops'
          }
        }
      }
    });

    const activity = mount.querySelector(
      '.rtile[data-bead-id="W1"] .rtile__activity-text'
    );

    expect(activity?.textContent).toContain(
      'Unit server: cross-lanes store + ops'
    );
  });

  test('draws 위임 중 and 위임 완료 chips from the attempt legs', () => {
    const mount = mountAttemptTiles({
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'W1',
          status: 'running',
          runner: 'claude',
          started_at: Date.now() - 5000,
          legs: [
            { label: 'claude', state: 'live' },
            { label: 'codex', state: 'done' }
          ]
        }
      }
    });

    const legs = Array.from(
      mount.querySelectorAll('.rtile[data-bead-id="W1"] .rtile__leg')
    ).map((el) => (el.textContent || '').trim());

    expect(legs).toEqual(['위임 중 · claude', '위임 완료 1']);
  });

  test('omits the 활동 line and 위임 chips when the attempt carries neither', () => {
    const mount = mountAttemptTiles({
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'W1',
          status: 'running',
          runner: 'claude',
          started_at: Date.now() - 5000
        }
      }
    });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="W1"]')
    );

    expect(tile.querySelector('.rtile__activity')).toBeNull();
    expect(tile.querySelector('.rtile__legs')).toBeNull();
  });

  test('falls back to the bead 갱신 time for a session tile 활동 line', () => {
    const mount = mountAttemptTiles({
      session_active: [
        {
          bead_id: 'UI-sess',
          title: '세션 작업',
          status: 'in_progress',
          updated_at: Date.now() - 720_000
        }
      ]
    });

    const activity = mount.querySelector(
      '.rtile[data-bead-id="UI-sess"] .rtile__activity-text'
    );

    expect(activity?.textContent).toContain('갱신');
  });

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

  // 큐 보류/정지 (UI-5ym8 §8). 사용자 ⏸와 다른 사실이므로 다른 자리·다른
  // 메시지이고, 두 종류는 사람이 할 일이 달라 버튼도 다르다.
  test('renders the environment hold with its earliest scheduled retry', () => {
    const next_at = new Date(2026, 7, 28, 9, 40).getTime();
    const mount = mountAttemptTiles({
      hold: {
        kind: 'env',
        cause: 'verify_failed:gh_observation_failed',
        since: 1000,
        bead_ids: ['A-1']
      },
      lineages: [
        { bead_id: 'A-1', origin_attempt_id: 't1', cause: 'x', next_at: null },
        { bead_id: 'A-2', origin_attempt_id: 't2', cause: 'x', next_at },
        {
          bead_id: 'A-3',
          origin_attempt_id: 't3',
          cause: 'x',
          next_at: next_at + 60_000
        }
      ]
    });

    const banner = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-hold--env')
    );
    expect(banner.querySelector('.worker-hold__text')?.textContent).toContain(
      '환경 보류'
    );
    expect(banner.querySelector('.worker-hold__text')?.textContent).toContain(
      `재시도 대기 · 다음 ${new Date(next_at).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    );
    expect(banner.querySelector('.worker-hold__resume')).toBeNull();
  });

  test('sends the hold since when 지금 재시도 is clicked', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountAttemptTiles(
      {
        hold: { kind: 'env', cause: 'verify_cmd_spawn_error', since: 4242 },
        lineages: []
      },
      transport
    );

    mount
      .querySelector('.worker-hold__retry')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-hold-retry-now', {
      since: 4242
    });
  });

  test('names the halted beads on a systemic hold', () => {
    const mount = mountAttemptTiles({
      hold: {
        kind: 'systemic',
        cause: 'base_landing_detected',
        since: 1000,
        bead_ids: ['A-1', 'A-2'],
        halted_by_attempt_id: 't9'
      }
    });

    const banner = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-hold--systemic')
    );
    expect(banner.querySelector('.worker-hold__text')?.textContent).toContain(
      'bead A-1, A-2'
    );
    expect(banner.querySelector('.worker-hold__retry')).toBeNull();
  });

  test('sends the hold since when 재개 is clicked', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountAttemptTiles(
      {
        hold: { kind: 'systemic', cause: 'verify_red', since: 77 },
        lineages: []
      },
      transport
    );

    mount
      .querySelector('.worker-hold__resume')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-hold-resume', {
      since: 77
    });
  });

  test('draws no hold banner when the queue carries none', () => {
    const mount = mountAttemptTiles({});

    expect(mount.querySelector('.worker-hold')).toBeNull();
  });

  test('renders the provider outage dispatch gate in the Worker header', () => {
    const next_probe_at = new Date(2026, 8, 3, 12, 30).getTime();
    const mount = mountAttemptTiles({
      provider_hold: {
        claude: {
          since: 1,
          generation: 1,
          targets: [
            {
              kind: 'outage',
              model: 'opus',
              account: null,
              attempt_ids: ['held'],
              next_probe_at
            }
          ]
        }
      }
    });

    const gate_text = mount
      .querySelector('.worker-provider-gate')
      ?.textContent?.replace(/\s+/g, ' ')
      .trim();

    expect(gate_text).toContain(
      `⚠️ claude 공급자 장애 — 신규 디스패치 보류, 다음 프로브 ${new Date(
        next_probe_at
      ).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}`
    );
  });

  test('renders the account alias on a usage-limit dispatch gate', () => {
    const mount = mountAttemptTiles({
      provider_hold: {
        claude: {
          since: 1,
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus',
              account: 'one@example.com',
              resets_at: 3000,
              attempt_ids: ['held']
            }
          ]
        }
      },
      account_catalog: {
        claude: [
          { email: 'one@example.com', alias: '업무', status: 'ok', windows: [] }
        ]
      }
    });

    const gate_text = mount
      .querySelector('.worker-provider-gate')
      ?.textContent?.replace(/\s+/g, ' ')
      .trim();

    expect(gate_text).toContain('⏳ 업무 사용 한도 — 그 계정 디스패치 보류');
  });

  test('widens the usage-limit gate wording when the account is unresolved', () => {
    const mount = mountAttemptTiles({
      provider_hold: {
        claude: {
          since: 1,
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus',
              account: null,
              attempt_ids: ['held']
            }
          ]
        }
      }
    });

    const gate_text = mount
      .querySelector('.worker-provider-gate')
      ?.textContent?.replace(/\s+/g, ' ')
      .trim();

    expect(gate_text).toContain(
      '⏳ claude 사용 한도 — 계정 미확인이라 러너 전체 디스패치 보류'
    );
  });

  test('names every limited account on the usage-limit dispatch gate', () => {
    const mount = mountAttemptTiles({
      provider_hold: {
        claude: {
          since: 1,
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus',
              account: 'one@example.com',
              attempt_ids: ['held']
            },
            {
              kind: 'usage_limit',
              model: 'sonnet',
              account: 'two@example.com',
              attempt_ids: ['held']
            }
          ]
        }
      },
      account_catalog: {
        claude: [
          { email: 'one@example.com', alias: '업무', status: 'ok', windows: [] }
        ]
      }
    });

    const gate_text = mount
      .querySelector('.worker-provider-gate')
      ?.textContent?.replace(/\s+/g, ' ')
      .trim();

    expect(gate_text).toContain('⏳ 업무, two@example.com 사용 한도');
    expect(gate_text).toContain('그 계정들 디스패치 보류');
  });

  test('omits a missing reset time from the usage-limit dispatch gate', () => {
    const mount = mountAttemptTiles({
      provider_hold: {
        claude: {
          since: 1,
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus',
              account: 'one@example.com',
              attempt_ids: ['held']
            }
          ]
        }
      }
    });

    expect(
      mount.querySelector('.worker-provider-gate')?.textContent
    ).not.toContain('리셋');
  });

  test('opens the non-failure popover from the provider verdict badge', () => {
    const mount = mountAttemptTiles({
      attempts: {
        held: {
          attempt_id: 'held',
          bead_id: 'HELD',
          status: 'paused',
          cause: 'provider_outage:overloaded_529',
          cause_detail: { summary: 'Claude API 과부하', message: '529' },
          runner: 'claude',
          model: 'opus'
        }
      }
    });

    mount
      .querySelector('.rtile__provider-hold-badge')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(
      mount.querySelector('.rtile__provider-hold-pop')?.textContent
    ).toContain('작업 실패 아님');
  });

  test('builds the alternate selector from snapshot catalogs and defaults', () => {
    const mount = mountAttemptTiles({
      attempts: {
        held: {
          attempt_id: 'held',
          bead_id: 'HELD',
          status: 'paused',
          cause: 'provider_outage:usage_limit',
          runner: 'claude',
          model: 'opus-4.8',
          claude_account: 'one@example.com'
        }
      },
      account_catalog: {
        claude: [
          {
            email: 'one@example.com',
            alias: '업무',
            status: 'ok',
            windows: [{ key: '5h', pct: 50 }]
          },
          {
            email: 'full@example.com',
            alias: '가득 참',
            status: 'ok',
            windows: [{ key: '5h', pct: 95 }]
          },
          {
            email: 'unknown-week@example.com',
            alias: '주간 미관측',
            status: 'ok',
            windows: [
              { key: '5h', pct: 40 },
              { key: '7d', pct: null }
            ]
          }
        ]
      }
    });

    mount
      .querySelector('.rtile__resume-alternate')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const dialog = /** @type {HTMLDialogElement} */ (
      mount.querySelector('.provider-resume-dialog')
    );
    const model = /** @type {HTMLSelectElement} */ (
      dialog.querySelector('.provider-resume-dialog__model')
    );
    const account = /** @type {HTMLSelectElement} */ (
      dialog.querySelector('.provider-resume-dialog__account')
    );

    expect(model.value).toBe(JSON.stringify(['claude', 'opus-4.8']));
    expect(model.querySelectorAll('optgroup')).toHaveLength(2);
    expect(account.value).toBe('one@example.com');
    expect(account.options[1].disabled).toBe(true);
    expect(account.options[1].textContent).toContain('5시간 사용량 80% 초과');
    expect(account.options[2].disabled).toBe(true);
    expect(account.options[2].textContent).toContain('7일 사용량 미관측');
  });

  test('blocks confirmation until an unresolved account is chosen', () => {
    const mount = mountAttemptTiles({
      attempts: {
        held: {
          attempt_id: 'held',
          bead_id: 'HELD',
          status: 'paused',
          cause: 'provider_outage:usage_limit',
          runner: 'claude',
          model: 'opus',
          session_id: 'sid-held'
        }
      },
      provider_hold: {
        claude: {
          since: 1,
          generation: 1,
          targets: [
            {
              kind: 'usage_limit',
              model: 'opus',
              account: null,
              attempt_ids: ['held']
            }
          ]
        }
      },
      account_catalog: {
        claude: [
          { email: 'one@example.com', alias: '업무', status: 'ok', windows: [] }
        ]
      }
    });

    mount
      .querySelector('.rtile__resume-alternate')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const account = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.provider-resume-dialog__account')
    );
    const confirm = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.provider-resume-dialog__confirm')
    );

    expect(account.value).toBe('');
    expect(account.options[0].textContent?.trim()).toBe('계정 선택');
    expect(confirm.disabled).toBe(true);
  });

  test('sends a cross-runner override as fresh_current', async () => {
    const transport = vi.fn().mockResolvedValue({ resumed: true });
    const mount = mountAttemptTiles(
      {
        revision: 7,
        attempts: {
          held: {
            attempt_id: 'held',
            bead_id: 'HELD',
            status: 'paused',
            cause: 'provider_outage:overloaded_529',
            runner: 'claude',
            model: 'opus',
            session_id: 'sid-held'
          }
        }
      },
      transport
    );
    mount
      .querySelector('.rtile__resume-alternate')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    const model = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.provider-resume-dialog__model')
    );
    model.value = JSON.stringify(['codex', 'sol']);
    model.dispatchEvent(new Event('change', { bubbles: true }));
    mount
      .querySelector('.provider-resume-dialog__confirm')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'held',
      expected_revision: 7,
      exec_override: { runner: 'codex', model: 'sol' },
      continuation: 'fresh_current',
      decision_token: {}
    });
  });

  test('renders a parked attempt as a waiting tile, not a failure', () => {
    const mount = mountAttemptTiles({
      attempts: {
        parked: {
          attempt_id: 'parked',
          bead_id: 'PARKED',
          status: 'parked',
          started_at: Date.now() - 5000,
          finished_at: Date.now() - 1000,
          cause: 'session_parked',
          cause_detail: {
            summary: 'REVISE 판정 확인을 사용자에게 요청함',
            awaiting_user: 'spec_review',
            bead_status: 'in_progress'
          }
        }
      }
    });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="parked"]')
    );
    expect(tile.querySelector('.rtile__held-badge')?.textContent).toBe(
      '⏸ 세션 대기'
    );
    expect(tile.querySelector('.rtile__held-summary')?.textContent).toContain(
      'REVISE 판정'
    );
    expect(tile.querySelector('.rtile__failure-badge')).toBeNull();
    expect(tile.querySelector('.rtile__foot .rtile__discard')).not.toBeNull();
  });

  test('opens an inquiry session from a parked tile', async () => {
    const transport = vi.fn().mockResolvedValue({
      ok: true,
      launched: true,
      session: 'launched',
      mode: 'fresh',
      fallback_reason: 'attempt_transcript_missing'
    });
    const mount = mountAttemptTiles(
      {
        attempts: {
          parked: {
            attempt_id: 'parked',
            bead_id: 'PARKED',
            status: 'parked',
            cause: 'session_parked',
            cause_detail: { summary: '결정 대기' }
          }
        }
      },
      transport
    );

    mount
      .querySelector('.rtile[data-attempt-id="parked"] .rtile__resolve')
      ?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-resolve-in-session', {
      bead_id: 'PARKED',
      expected_revision: 1
    });
    expect(document.querySelector('.toast')?.textContent).toBe(
      '새 세션으로 시작 (attempt_transcript_missing)'
    );
  });

  test('renders a retry_wait attempt as a countdown badge with no actions', () => {
    const next_at = new Date(2026, 7, 28, 11, 20).getTime();
    const mount = mountAttemptTiles({
      attempts: {
        waiting: {
          attempt_id: 'waiting',
          bead_id: 'WAITING',
          status: 'retry_wait',
          started_at: Date.now() - 5000,
          retry: {
            cause: 'session_failed:is_error',
            attempts: 1,
            max: 3,
            next_at,
            origin_attempt_id: 'waiting'
          }
        }
      }
    });

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-attempt-id="waiting"]')
    );
    expect(tile.querySelector('.rtile__held-badge')?.textContent).toBe(
      `↻ 재시도 대기 1/3 · ${new Date(next_at).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    );
    expect(tile.querySelector('.rtile__resolve')).toBeNull();
    expect(tile.querySelector('.rtile__resume')).toBeNull();
  });

  test('keeps a parked bead out of the 실행 count', () => {
    const mount = mountAttemptTiles({
      attempts: {
        parked: {
          attempt_id: 'parked',
          bead_id: 'PARKED',
          status: 'parked',
          cause: 'session_parked'
        }
      }
    });

    expect(
      mount.querySelector('.worker-kpi__chip--running')?.textContent
    ).toContain('실행 0');
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
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await flush();
    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'failed',
      expected_revision: 7
    });
  });

  test('re-reads the revision for each resume send and never retries twice', async () => {
    const failed_attempt = {
      attempt_id: 'failed',
      bead_id: 'FAILED',
      status: 'failed',
      session_id: 'sid-failed'
    };
    const transport = vi.fn().mockResolvedValue({
      resumed: false,
      conflict: true,
      queue: queueOf({ revision: 9, attempts: { failed: failed_attempt } })
    });
    const mount = mountAttemptTiles(
      { revision: 7, attempts: { failed: failed_attempt } },
      transport
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="failed"] .rtile__resume')
    ).click();
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await flush();

    expect(
      transport.mock.calls.map(([, payload]) => payload.expected_revision)
    ).toEqual([7, 9]);
  });

  test('names the resume target with the attempt bead id and tuple', () => {
    const mount = mountAttemptTiles({
      revision: 7,
      attempts: {
        failed: {
          attempt_id: 'failed',
          bead_id: 'FAILED',
          status: 'failed',
          session_id: 'sid-failed',
          runner: 'codex',
          model: 'sol'
        }
      }
    });

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="failed"] .rtile__resume')
    ).click();

    expect(
      document.querySelector('.resume-instructions-dialog__target')?.textContent
    ).toBe('FAILED · codex · sol');
  });

  test('preserves instructions through initial, conflict, and continuation sends', async () => {
    const decision_token = { source_attempt_id: 'failed', digest: 'one' };
    const failed_attempt = {
      attempt_id: 'failed',
      bead_id: 'FAILED',
      status: 'failed',
      session_id: 'sid-failed'
    };
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        resumed: false,
        conflict: true,
        queue: queueOf({ revision: 9, attempts: { failed: failed_attempt } })
      })
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
        attempts: { failed: failed_attempt }
      },
      transport
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="failed"] .rtile__resume')
    ).click();
    const textarea = /** @type {HTMLTextAreaElement} */ (
      document.querySelector('.resume-instructions-dialog textarea')
    );
    textarea.value = '  로그부터 확인  ';
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await flush();
    expect(transport).toHaveBeenCalledTimes(2);

    /** @type {HTMLButtonElement} */ (
      document.querySelectorAll('.continuation-dialog button')[1]
    ).click();
    await flush();

    expect(transport.mock.calls).toEqual([
      [
        'worker-attempt-resume',
        {
          attempt_id: 'failed',
          expected_revision: 7,
          instructions: '로그부터 확인'
        }
      ],
      [
        'worker-attempt-resume',
        {
          attempt_id: 'failed',
          expected_revision: 9,
          instructions: '로그부터 확인'
        }
      ],
      [
        'worker-attempt-resume',
        {
          attempt_id: 'failed',
          expected_revision: 9,
          instructions: '로그부터 확인',
          continuation: 'fresh_current',
          decision_token
        }
      ]
    ]);
  });

  test('renders no failed-tile dismiss control or dismiss request', async () => {
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

    expect(
      mount.querySelector('.rtile[data-attempt-id="failed"] .rtile__dismiss')
    ).toBeNull();
    await flush();
    expect(transport).not.toHaveBeenCalledWith(
      'worker-attempt-dismiss',
      expect.anything()
    );
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

  test('names the cross lane that dispatches while 자동 진행 is off (UI-jaua §5.6)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: false,
        queue: [
          { bead_id: 'S1', added_at: 0, armed_by_lane: 'cl_1' },
          { bead_id: 'S2', added_at: 1 }
        ]
      })
    );

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    expect(
      mount.querySelector('.worker-kpi__chip--armed')?.textContent?.trim()
    ).toBe('⏸ 자동 진행 꺼짐 · 연결 레인 1건 진행 중');
  });

  test('says nothing about arms while 자동 진행 is on (UI-jaua §5.6)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        auto_advance: true,
        queue: [{ bead_id: 'S1', added_at: 0, armed_by_lane: 'cl_1' }]
      })
    );

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    expect(mount.querySelector('.worker-kpi__chip--armed')).toBeNull();
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
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
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

  test('candidate lane merges Ready+Blocked into one chain order', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    // Default preset `spec 우선` = [spec desc, created asc]: all three carry a
    // published spec, so the oldest goes first — A(100), B(200), C(300). Blocked
    // B takes its chain position like any other row (UI-8ham).
    expect(candidateOrder(mount)).toEqual(['A', 'B', 'C']);
  });

  test('renders every candidate card as a non-drag source', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const cards = Array.from(
      mount.querySelectorAll('#worker-pane-candidate .worker-card')
    );

    expect(cards.length).toBe(3);
    expect(
      cards.map((el) =>
        /** @type {HTMLElement} */ (el).getAttribute('draggable')
      )
    ).toEqual(['false', 'false', 'false']);
  });

  test('sends nothing when a candidate is dropped onto another candidate', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });
    const transport = vi.fn().mockResolvedValue({ applied: true });
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    dragOnto(mount, 'C', 'A');
    await flush();

    expect(transport).not.toHaveBeenCalled();
    expect(candidateOrder(mount)).toEqual(['A', 'B', 'C']);
  });

  test('refuses the candidate pane as a drop target', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });
    const pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );

    const over = new Event('dragover', { bubbles: true, cancelable: true });
    pane.dispatchEvent(over);

    expect(over.defaultPrevented).toBe(false);
    expect(pane.classList.contains('worker-pane--drag-over')).toBe(false);
  });

  test('running tile shows the current in_progress child in its rollup', () => {
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
      mount.querySelector('.rtile[data-bead-id="S1"] .board-card__roll-current')
        ?.textContent
    ).toContain('T2: 서버 배선');
  });

  test('running tile omits the rollup block when the bead has no child', () => {
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
      mount.querySelector('.rtile[data-bead-id="S1"] .board-card__roll')
    ).toBeNull();
    expect(
      mount.querySelector('.rtile[data-bead-id="S1"] .board-card__roll-current')
    ).toBeNull();
  });

  test('projects quick_fix landing on its running tile without adding a PR-wait row', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const head_sha = 'a'.repeat(40);
    queueStore.set(
      queueOf({
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'QF-1',
            status: 'running',
            started_at: Date.now() - 3000,
            quickfix_lane: true,
            quickfix_landing: {
              cursor: 'repo_operations',
              head_sha,
              reason: null
            }
          }
        },
        repo_operations: [
          {
            operation_id: 'deploy-qf',
            kind: 'deploy',
            state: 'running',
            superseded_by: null,
            subjects: [{ bead_id: 'QF-1', merged_sha: head_sha }]
          }
        ]
      })
    );

    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    const running = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="QF-1"]')
    );

    expect(running.querySelector('.rtile__landing')?.textContent).toContain(
      '배포 중'
    );
    expect(
      mount.querySelector('#worker-pane-pr-wait [data-bead-id="QF-1"]')
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
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      },
      {
        id: 'P-1',
        title: 'has parent edge',
        status: 'open',
        parent: 'PAR-1',
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      }
    ]);
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'X-1.2',
        title: 'dotted child id',
        status: 'open',
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
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

  test('native top-level spec_id enables a candidate even when metadata carries a differing legacy value', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'NATIVE-1',
        title: 'native spec',
        status: 'open',
        spec_id: ' docs/native.md ',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      },
      {
        id: 'CONFLICT-1',
        title: 'conflicting spec',
        status: 'open',
        spec_id: 'docs/native.md',
        metadata: {
          route: 'spec_backed',
          spec_id: 'docs/legacy.md',
          spec_review: RECEIPT
        }
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
    expect(placeButton(native, 'NATIVE-1').disabled).toBe(false);
    expect(placeButton(conflict, 'CONFLICT-1').disabled).toBe(false);
    expect(conflict.querySelector('.worker-card__reason')).toBeNull();
    expect(conflict.textContent).not.toContain('spec_id_conflict');
  });

  test('candidate card renders a derived route as unset and keeps the 4-cell spec_backed stepper', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'WF-1',
        title: 'workflow candidate',
        status: 'open',
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT },
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
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT },
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

  test('queues a described quick_fix candidate without requiring a spec', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'QF-1',
        title: 'quick fix candidate',
        status: 'open',
        description: 'Fix the worker lane.',
        metadata: { route: 'quick_fix' }
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
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(card.querySelector('.worker-card__reason')).toBeNull();
    expect(card.getAttribute('draggable')).toBe('false');
    expect(place.disabled).toBe(false);
    expect(place.title).toBe('대기 큐 맨 뒤에 추가');
    expect(card.textContent).not.toContain('워커 비대상');
  });

  test('badges and blocks a quick_fix candidate with a blank description', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'QF-1',
        title: 'blank quick fix candidate',
        status: 'open',
        description: ' \n\t ',
        metadata: { route: 'quick_fix' }
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
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(card.getAttribute('draggable')).toBe('false');
    expect(card.querySelector('.worker-card__reason')?.textContent).toContain(
      'missing_description'
    );
    expect(card.textContent).not.toContain('spec 없음');
    expect(place.disabled).toBe(true);
    expect(place.title).toBe('description이 없어 대기 큐에 넣을 수 없습니다');
  });

  test('leaves quick_fix eligibility to server admission when description is absent from the payload', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'QF-1',
        title: 'legacy quick fix candidate',
        status: 'open',
        metadata: { route: 'quick_fix' }
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

    expect(placeButton(card, 'QF-1').disabled).toBe(false);
    expect(card.querySelector('.worker-card__reason')).toBeNull();
  });

  test('a candidate without workflow renders no chip/stepper and does not throw', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'NW-1',
        title: 'no workflow',
        status: 'open',
        spec_id: 'S',
        // route를 싣지 않는다 — 이 테스트는 workflow 투영이 없는 카드가 route 칩을
        // 그리지 않는 것만 본다 (배치 자격은 보지 않는다).
        metadata: { spec_review: RECEIPT }
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
    // The repo-operation settings are INLINE on the Worker screen now.
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-repo-ops-settings')
    );
  }

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
    expect(lane.querySelector('.worker-repo-ops__vd-cmd')?.textContent).toBe(
      'repo-ops/script/verify'
    );
    expect(lane.querySelector('.worker-repo-ops__vd-badge')?.textContent).toBe(
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
      dialog.querySelector('.worker-repo-ops__vd')
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

    expect(dialog.querySelector('.worker-repo-ops__vd')).not.toBeNull();
    expect(dialog.querySelector('.worker-repo-ops__vd')?.textContent).toContain(
      '선언 확인 중'
    );
  });

  test('failed tile ↻ resumes its eligible attempt', async () => {
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
      mount.querySelector('.rtile[data-attempt-id="f1"] .rtile__resume')
    );
    expect(btn).not.toBeNull();
    expect(btn.closest('.rtile')?.getAttribute('data-attempt-id')).toBe('f1');
    expect(
      mount.querySelector('.rtile[data-attempt-id="f1"] .rtile__discard')
    ).not.toBeNull();
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.resume-instructions-dialog button')
    ).click();
    await flush();
    expect(transport).toHaveBeenCalledWith('worker-attempt-resume', {
      attempt_id: 'f1',
      expected_revision: 1
    });
  });

  test('retries a failed discard from the failed tile', () => {
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

    const retry = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="f1"] .rtile__discard')
    );
    expect(retry.textContent?.trim()).toBe('재시도');
    expect(retry.dataset.operationId).toBe('op-failed');

    retry.click();

    expect(transport).toHaveBeenCalledWith('worker-discard', {
      bead_id: 'B1',
      attempt_id: 'f1',
      operation_id: 'op-failed',
      expected_revision: 1
    });
    vi.unstubAllGlobals();
  });

  test('abandons a failed archive-step discard from the failed tile', () => {
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
          'op-archive': {
            operation_id: 'op-archive',
            bead_id: 'B1',
            attempt_id: 'f1',
            requested_at: 1,
            mode: 'unmerged',
            phase: 'requested',
            last_error: 'orphan_gitlink_content:vendor/child'
          }
        }
      })
    );
    const transport = vi.fn(async () => ({
      abandoned: true,
      conflict: false,
      queue: null
    }));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    const confirm = vi.fn(() => true);
    vi.stubGlobal('confirm', confirm);

    const abandon = /** @type {HTMLButtonElement} */ (
      mount.querySelector(
        '.rtile[data-attempt-id="f1"] .rtile__discard-abandon'
      )
    );
    abandon.click();

    expect(abandon.textContent?.trim()).toBe('폐기 포기');
    expect(confirm).toHaveBeenCalledWith(
      'B1: 실패한 폐기 작업을 포기합니다. 백업과 폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다. 계속할까요?'
    );
    expect(transport).toHaveBeenCalledWith('worker-discard-abandon', {
      bead_id: 'B1',
      operation_id: 'op-archive',
      expected_revision: 1
    });
    vi.unstubAllGlobals();
  });

  test('the failed tile targets the latest same-bead failure', () => {
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
      mount.querySelector(
        '.rtile[data-attempt-id="latest_no_sid"] .rtile__resume'
      )
    );
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

  test('renders every unhandled failure as its own decision tile', () => {
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

    expect(
      mount.querySelector('.rtile[data-attempt-id="older"]')
    ).not.toBeNull();
    expect(
      mount.querySelector('.rtile[data-attempt-id="newest"]')
    ).not.toBeNull();
    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
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

  test('renders one merge-ready badge without the redundant latest badge', () => {
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
    expect(badges).toEqual(['머지 가능']);
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
      '확인 중'
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
    expect(badge.textContent).toBe('닫힘');
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
    expect(badge.textContent).toBe('상태 확인 실패');
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
      ).toBe('머지 가능');
    }
  });

  test('disables or hides 머지 in every refusing tier and renders that tier badge', () => {
    for (const t of REFUSING_TIERS) {
      document.body.innerHTML = '<div id="m"></div>';
      const { mount } = mountWith(queueWithGate({ ...t, base_badge: '최신' }));

      const btn = /** @type {HTMLButtonElement|null} */ (
        mount.querySelector('.worker-mini__merge')
      );
      if (t.tier === 'merged') {
        expect(btn).toBeNull();
      } else {
        expect(btn?.disabled).toBe(true);
        expect(btn?.getAttribute('title')).toContain(t.reason);
      }
      expect(mount.querySelectorAll('.worker-mini__badge')).toHaveLength(1);
    }
  });

  const REVIEW_HOLD_GATE = {
    enabled: false,
    tier: 'review',
    gate_badge: '리뷰 확인 필요',
    base_badge: '최신',
    reason: 'review_receipt_missing'
  };

  // `review_receipt_undetermined`는 더 이상 제외가 아니다 (UI-qksl §4 1번이
  // UI-d7fy §5.1의 그 제외를 supersede한다). 남은 제외는 리뷰로 해소되지 않는
  // `spec_id_missing` 하나다.
  test('offers no [리뷰 후 머지] on spec_id_missing (UI-yqw9)', () => {
    const { mount } = mountWith(
      queueWithGate({
        enabled: false,
        tier: 'review',
        gate_badge: '스펙 ID 누락',
        base_badge: '최신',
        reason: 'spec_id_missing'
      })
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(button.textContent?.trim()).not.toBe('리뷰 후 머지');
  });

  test('keeps [리뷰 후 머지] on the row the click already queued (UI-d7fy §5.1)', () => {
    const { mount } = mountWith(
      queueWithGate(REVIEW_HOLD_GATE, {
        merge_queue: [
          {
            bead_id: 'RD-1',
            authority: { id: 'authority-1', source: 'manual' },
            hold: {
              reason: 'review_receipt_missing',
              head_sha: 'a'.repeat(40),
              since: 5
            }
          }
        ]
      })
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(button.textContent?.trim()).toBe('리뷰 후 머지');
    expect(button.disabled).toBe(false);
  });

  test('locks the button while its review session runs (UI-d7fy §5.2)', () => {
    const { mount } = mountWith(
      queueWithGate(REVIEW_HOLD_GATE, {
        merge_queue: [
          {
            bead_id: 'RD-1',
            authority: { id: 'authority-1', source: 'manual' }
          }
        ],
        attempts: {
          'review:1': {
            attempt_id: 'review:1',
            bead_id: 'RD-1',
            kind: 'review_session',
            status: 'running'
          }
        }
      })
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(button.disabled).toBe(true);
    expect(button.title).toBe(
      '리뷰 세션 실행 중 — 끝나면 영수증을 다시 판정합니다'
    );
    expect(mount.textContent).toContain(
      '최종 변경 리뷰 필요 · 리뷰 세션 실행 중'
    );
  });

  test('re-enables the button and states why the last review ended (UI-d7fy §5.4)', () => {
    const { mount } = mountWith(
      queueWithGate(REVIEW_HOLD_GATE, {
        merge_queue: [
          {
            bead_id: 'RD-1',
            authority: { id: 'authority-1', source: 'manual' }
          }
        ],
        attempts: {
          'review:1': {
            attempt_id: 'review:1',
            bead_id: 'RD-1',
            kind: 'review_session',
            status: 'failed',
            cause: 'receipt_not_current',
            finished_at: 9
          }
        }
      })
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(button.disabled).toBe(false);
    expect(mount.textContent).toContain(
      '최종 변경 리뷰 필요 · 리뷰 후에도 영수증이 최종 head에 유효하지 않음'
    );
  });

  test('names the running review session as the queue’s own (UI-qksl §7)', () => {
    const { mount } = mountWith(
      queueWithGate(REVIEW_HOLD_GATE, {
        merge_queue: [
          {
            bead_id: 'RD-1',
            authority: { id: 'authority-1', source: 'automatic' },
            review_dispatch: {
              head_sha: 'a'.repeat(40),
              attempt_id: 'review:1',
              state: 'active',
              at: 7
            }
          }
        ],
        attempts: {
          'review:1': {
            attempt_id: 'review:1',
            bead_id: 'RD-1',
            kind: 'review_session',
            status: 'running',
            origin: 'auto'
          }
        }
      })
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(button.title).toBe(
      '자동 리뷰 세션 실행 중 — 끝나면 영수증을 다시 판정합니다'
    );
    expect(mount.textContent).toContain(
      '최종 변경 리뷰 필요 · 자동 리뷰 세션 실행 중'
    );
  });

  test('states that the head’s one automatic review is spent (UI-qksl §7)', () => {
    const { mount } = mountWith(
      queueWithGate(REVIEW_HOLD_GATE, {
        merge_queue: [
          {
            bead_id: 'RD-1',
            authority: { id: 'authority-1', source: 'automatic' },
            review_dispatch: {
              head_sha: 'a'.repeat(40),
              attempt_id: 'review:1',
              state: 'exhausted',
              at: 11
            }
          }
        ],
        attempts: {
          'review:1': {
            attempt_id: 'review:1',
            bead_id: 'RD-1',
            kind: 'review_session',
            status: 'failed',
            origin: 'auto',
            cause: 'receipt_not_current',
            finished_at: 9
          }
        }
      })
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(button.disabled).toBe(false);
    expect(mount.textContent).toContain(
      '최종 변경 리뷰 필요 · 자동 리뷰 1회 소진 · 리뷰 후에도 영수증이 최종 head에 유효하지 않음'
    );
  });

  test('keeps the spent prefix off a click session’s failure (UI-qksl §7)', () => {
    const { mount } = mountWith(
      queueWithGate(REVIEW_HOLD_GATE, {
        merge_queue: [
          {
            bead_id: 'RD-1',
            authority: { id: 'authority-1', source: 'manual' },
            review_dispatch: {
              head_sha: 'a'.repeat(40),
              attempt_id: 'review:1',
              state: 'exhausted',
              at: 11
            }
          }
        ],
        attempts: {
          'review:1': {
            attempt_id: 'review:1',
            bead_id: 'RD-1',
            kind: 'review_session',
            status: 'failed',
            origin: 'click',
            cause: 'receipt_not_current',
            finished_at: 9
          }
        }
      })
    );

    expect(mount.textContent).not.toContain('자동 리뷰 1회 소진');
    expect(mount.textContent).toContain(
      '최종 변경 리뷰 필요 · 리뷰 후에도 영수증이 최종 head에 유효하지 않음'
    );
  });

  test('says the automatic dispatch is waiting for a slot (UI-qksl §7)', () => {
    const { mount } = mountWith(
      queueWithGate(REVIEW_HOLD_GATE, {
        merge_queue: [
          {
            bead_id: 'RD-1',
            authority: { id: 'authority-1', source: 'automatic' },
            hold: {
              reason: 'review_receipt_missing',
              head_sha: 'a'.repeat(40),
              since: 5,
              auto_review_wait: 'slot'
            }
          }
        ]
      })
    );

    expect(mount.textContent).toContain(
      '최종 변경 리뷰 필요 · 리뷰 세션 슬롯 대기'
    );
    expect(
      mount
        .querySelector('.worker-mini__badge span[title]')
        ?.getAttribute('title')
    ).toContain(
      '실행 슬롯이 비면 자동으로 리뷰 세션을 띄웁니다. 지금 클릭하면 즉시 띄웁니다'
    );
  });

  test('draws nothing extra for a row with no claim and no wait (UI-qksl §7)', () => {
    const { mount } = mountWith(
      queueWithGate(REVIEW_HOLD_GATE, {
        merge_queue: [
          {
            bead_id: 'RD-1',
            authority: { id: 'authority-1', source: 'manual' }
          }
        ]
      })
    );

    expect(mount.textContent).not.toContain('자동 리뷰');
    expect(mount.textContent).not.toContain('슬롯 대기');
    expect(mount.querySelector('.worker-mini__badge')?.textContent).toBe(
      '최종 변경 리뷰 필요'
    );
  });

  test.each([
    [
      'review_receipt_missing',
      '리뷰 후 머지',
      '리뷰 영수증 없음 — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 리뷰만 수행시키고, 영수증이 최종 head에 유효해지면 큐가 머지합니다'
    ],
    [
      'review_receipt_stale',
      '리뷰 후 머지',
      'head 재작성됨(영수증이 현재 head의 조상이 아님) — 머지 게이트 보류입니다. 클릭하면 기록된 세션을 이어 최종 head를 다시 리뷰시키고, 영수증이 유효해지면 큐가 머지합니다'
    ],
    ['base_behind', 'base 갱신 후 머지', 'base를 자동 갱신한 뒤 머지합니다']
  ])('enables the manual continuation for %s', (reason, label, title) => {
    const { mount } = mountWith(
      queueWithGate({
        enabled: false,
        tier: reason === 'base_behind' ? 'mergeability' : 'review',
        gate_badge: '차단',
        base_badge: reason === 'base_behind' ? 'base 뒤처짐' : '최신',
        reason
      })
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(button.disabled).toBe(false);
    expect(button.textContent?.trim()).toBe(label);
    expect(button.title).toBe(title);
  });

  test.each([
    ['review_receipt_invalid', '리뷰 영수증 기록이 성립하지 않음'],
    ['review_receipt_undetermined', '리뷰 영수증 ancestry probe 미완료']
  ])(
    'offers the same [리뷰 후 머지] on %s (UI-qksl §4 1번)',
    (reason, title_head) => {
      const { mount } = mountWith(
        queueWithGate({
          enabled: false,
          tier: 'review',
          gate_badge: '차단',
          base_badge: '최신',
          reason
        })
      );

      const button = /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-mini__merge')
      );
      expect(button.disabled).toBe(false);
      expect(button.textContent?.trim()).toBe('리뷰 후 머지');
      expect(button.title).toContain(title_head);
      expect(mount.querySelector('.worker-mini__badge')?.textContent).toBe(
        '최종 변경 리뷰 필요'
      );
    }
  );

  test.each([
    ['mergeability_unknown', '상태 확인 실패'],
    ['gh_failed', '상태 확인 실패']
  ])('keeps %s disabled without a server continuation', (reason, label) => {
    const { mount } = mountWith(
      queueWithGate({
        enabled: false,
        tier: 'undecidable',
        gate_badge: '차단',
        base_badge: '',
        reason
      })
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(button.disabled).toBe(true);
    expect(mount.querySelector('.worker-mini__badge')?.textContent).toBe(label);
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
    expect(row.querySelector('.worker-mini__merge')).toBe(null);
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

  test('retries abandon once and restores the pre-discard card', async () => {
    const operation = {
      operation_id: 'op1',
      bead_id: 'RD-1',
      requested_at: 1,
      mode: 'unmerged',
      phase: 'requested',
      last_error: 'archive_failed'
    };
    const fresh_queue = queueWithGate(GREEN, {
      revision: 7,
      discard_operations: { op1: operation }
    });
    const abandoned_queue = queueWithGate(GREEN, {
      revision: 8,
      discard_operations: {
        op1: { ...operation, phase: 'abandoned' }
      }
    });
    const transport = vi
      .fn()
      .mockResolvedValueOnce({ conflict: true, queue: fresh_queue })
      .mockResolvedValueOnce({
        abandoned: true,
        conflict: false,
        queue: abandoned_queue
      });
    const { mount } = mountWith(
      queueWithGate(GREEN, { discard_operations: { op1: operation } }),
      transport
    );
    const confirm = vi.fn(() => true);
    vi.stubGlobal('confirm', confirm);

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard-abandon')
    ).click();
    await vi.waitFor(() => expect(transport).toHaveBeenCalledTimes(2));

    expect(confirm).toHaveBeenCalledWith(
      'RD-1: 실패한 폐기 작업을 포기합니다. 백업과 폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다. 계속할까요?'
    );
    expect(transport.mock.calls).toEqual([
      [
        'worker-discard-abandon',
        { bead_id: 'RD-1', operation_id: 'op1', expected_revision: 1 }
      ],
      [
        'worker-discard-abandon',
        { bead_id: 'RD-1', operation_id: 'op1', expected_revision: 7 }
      ]
    ]);
    expect(document.querySelector('.toast')?.textContent).toContain(
      '폐기 포기됨 · 폐기는 수행되지 않았습니다 (원인: archive_failed)'
    );
    expect(mount.querySelector('.worker-discard-receipt')).toBeNull();
    expect(
      mount.querySelector('.worker-mini__discard')?.textContent?.trim()
    ).toBe('폐기');
    vi.unstubAllGlobals();
  });

  test('announces an abandon refusal', async () => {
    const operation = {
      operation_id: 'op1',
      bead_id: 'RD-1',
      requested_at: 1,
      phase: 'requested',
      last_error: 'archive_failed'
    };
    const transport = vi.fn(async () => ({
      abandoned: false,
      conflict: false,
      reason: 'operation_not_requested'
    }));
    const { mount } = mountWith(
      queueWithGate(GREEN, { discard_operations: { op1: operation } }),
      transport
    );
    vi.stubGlobal(
      'confirm',
      vi.fn(() => true)
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard-abandon')
    ).click();
    await vi.waitFor(() =>
      expect(document.querySelector('.toast')?.textContent).toContain(
        '폐기 포기 거부: operation_not_requested'
      )
    );

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
    ).toBe('정리 재시도 — 저장소 작업 단계부터');
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
      '정리 재시도'
    ]);
  });

  // UI-i60a §4: a cleanup stopped by a post-merge job reuses the SAME resume
  // path. UI-jw27 §3 renamed that button and §4 gave the row its second exit.
  test('offers the cleanup resume for a stop at post_merge_jobs', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'post_merge_jobs',
        reason: 'post_merge_job_failed',
        at: 1
      })
    );

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );

    expect([btn.disabled, btn.textContent?.trim()]).toEqual([
      false,
      '정리 재시도'
    ]);
  });

  test('adds the session-resolution button for a stop at post_merge_jobs', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'post_merge_jobs',
        reason: 'post_merge_job_failed',
        at: 1
      })
    );

    const labels = Array.from(mount.querySelectorAll('button')).map((button) =>
      button.textContent?.trim()
    );

    expect(labels).toContain('세션에서 해결');
  });

  // UI-jw27 §4: terminal 실패 행 3종이 같은 출구를 얻는다. 자리는 슬롯 6 액션
  // foot의 [정리 재시도] 옆이고, 실패가 아닌 행은 재료가 없어 버튼 자체가 없다
  // (fail-quiet).
  test('offers 세션에서 해결 on a stopped cleanup row', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'child_sweep', reason: 'boom', at: 1 })
    );

    const button = mount.querySelector('.worker-mini__resolve');

    expect(button?.textContent?.trim()).toBe('세션에서 해결');
  });

  test('offers 세션에서 해결 on a needs_human completion row', () => {
    const { mount } = mountWith(
      queueWithGate(GREEN, {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'needs_human',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            active_attempt_id: null,
            failure_stage: 'verify',
            failure_reason: 'verify_cmd_failed',
            terminal_reason: 'verify_red'
          }
        }
      })
    );

    expect(mount.querySelector('.worker-mini__resolve')).not.toBeNull();
  });

  test('offers 세션에서 해결 on a failed discard row', () => {
    const { mount } = mountWith(
      queueWithGate(GREEN, {
        discard_operations: {
          op1: {
            operation_id: 'op1',
            bead_id: 'RD-1',
            requested_at: 1,
            mode: 'unmerged',
            phase: 'runner_terminated',
            last_error: 'pr_close_failed'
          }
        }
      })
    );

    expect(mount.querySelector('.worker-mini__resolve')).not.toBeNull();
  });

  test('draws no 세션에서 해결 on a row with no terminal failure', () => {
    const { mount } = mountWith(queueWithGate(GREEN));

    expect(mount.querySelector('.worker-mini__resolve')).toBeNull();
  });

  test('sends worker-resolve-in-session from that button', async () => {
    const transport = vi.fn(async () => ({ ok: true, launched: true }));
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'child_sweep', reason: 'boom', at: 1 }),
      transport
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__resolve')
    ).click();

    expect(transport).toHaveBeenCalledWith('worker-resolve-in-session', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
  });

  test('marks the post_merge_jobs pip on the cleanup stepper', () => {
    const { mount } = mountWith(
      mergedWithCleanup({
        step: 'post_merge_jobs',
        reason: 'post_merge_job_failed',
        at: 1
      })
    );

    const drawer = openTimeline(mount);

    expect(
      drawer.querySelector('.worker-step--stall')?.textContent?.trim()
    ).toBe('머지 후 잡');
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

  test('offers 정리 재시도 on a repo_operations stall (UI-j2f0)', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'repo_operations', reason: 'x', at: 1 })
    );

    expect([
      mount.querySelector('.worker-mini__merge')?.textContent?.trim(),
      mount.querySelector('.worker-mini__timeline')
    ]).toEqual(['정리 재시도', null]);
  });

  test('resumes the cleanup from that button', async () => {
    const transport = vi.fn(async () => ({ ok: true, retried: true }));
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'repo_operations', reason: 'x', at: 1 }),
      transport
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini__merge')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(transport).toHaveBeenCalledWith(
      'worker-cleanup-retry',
      expect.objectContaining({ bead_id: 'RD-1' })
    );
  });

  test('opens the timeline from the repo-ops strip', () => {
    const { mount } = mountWith(
      mergedWithCleanup({ step: 'repo_operations', reason: 'x', at: 1 })
    );

    /** @type {HTMLElement} */ (
      mount.querySelector('.worker-repo-strip')
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

describe('worker view — failed tile decision surface (UI-rj02)', () => {
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

  /**
   * @param {HTMLElement} mount
   * @param {string} [attempt_id]
   * @returns {HTMLElement}
   */
  function openFailure(mount, attempt_id = 'f1') {
    /** @type {HTMLButtonElement} */ (
      mount.querySelector(
        `.rtile[data-attempt-id="${attempt_id}"] .rtile__failure-badge`
      )
    ).click();
    return /** @type {HTMLElement} */ (
      mount.querySelector(
        `.rtile[data-attempt-id="${attempt_id}"] .rtile__failure-pop`
      )
    );
  }

  test('opens failure detail from the badge and closes it on outside click', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        cause: 'runner_exit'
      }
    });

    expect(openFailure(mount)).not.toBeNull();
    document.body.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.rtile__failure-pop')).toBeNull();
  });

  test('closes failure detail on Escape', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        cause: 'runner_exit'
      }
    });
    openFailure(mount);

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(mount.querySelector('.rtile__failure-pop')).toBeNull();
  });

  test('moves failure detail to the next clicked badge', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        cause: 'runner_exit'
      },
      f2: {
        attempt_id: 'f2',
        bead_id: 'B2',
        status: 'failed',
        cause: 'session_failed'
      }
    });
    openFailure(mount, 'f1');

    const second = openFailure(mount, 'f2');

    expect(
      mount.querySelector('.rtile[data-attempt-id="f1"] .rtile__failure-pop')
    ).toBeNull();
    expect(second).not.toBeNull();
  });

  test('uses the failure projection confirmation for discard', () => {
    const transport = vi.fn(async () => ({}));
    const confirm = vi.fn(() => false);
    vi.stubGlobal('confirm', confirm);
    const mount = mountWithAttempts(
      {
        f1: {
          attempt_id: 'f1',
          bead_id: 'B1',
          status: 'failed',
          cause: 'runner_exit',
          merge_sha: 'a'.repeat(40)
        }
      },
      transport
    );

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile[data-attempt-id="f1"] .rtile__discard')
    ).click();

    expect(confirm).toHaveBeenCalledWith(expect.stringContaining('revert PR'));
    expect(transport).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
  });

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

    const detail = openFailure(mount);
    const text = (detail.textContent || '').replace(/\s+/g, ' ');

    expect(text).toContain('merge_to_base_blocked');
    expect(text).toContain('gh pr merge 311 --squash');
  });

  test('labels guard detail as 가드/원인', () => {
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

    const detail = openFailure(mount);

    expect(detail.textContent).toContain('가드/원인');
  });

  test('labels a non-guard failure detail 원인', () => {
    const mount = mountWithAttempts({
      f1: {
        attempt_id: 'f1',
        bead_id: 'B1',
        status: 'failed',
        repo: '/repo',
        cause: 'workflow_mode_record_failed',
        cause_detail: {
          reason: 'bd set-metadata failed for UI-ksp2',
          command: 'bd update --set-metadata workflow_mode=fast_track'
        }
      }
    });

    const detail = openFailure(mount);
    const text = (detail.textContent || '').replace(/\s+/g, ' ').trim();

    expect(text).toContain('가드/원인');
    expect(text).toContain('bd set-metadata failed for UI-ksp2');
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

    const detail = openFailure(mount);

    expect(detail.textContent).toContain('question tool: AskUserQuestion');
    expect(
      Array.from(detail.querySelectorAll('dt'), (node) => node.textContent)
    ).not.toContain('명령');
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

    const detail = openFailure(mount);

    expect(
      Array.from(detail.querySelectorAll('dt'), (node) => node.textContent)
    ).not.toContain('가드/원인');
  });

  test('renders no failure tile after a later same-bead attempt supersedes it', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="f1"]')).toBeNull();
  });

  test('renders no failure tile when the later same-bead failure is dismissed', () => {
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

    expect(mount.querySelector('.rtile--failed')).toBeNull();
  });

  test('renders no tile for a dismissed failed attempt', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="f1"]')).toBeNull();
  });

  test('renders no tile for a dismissed orphaned attempt', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="o1"]')).toBeNull();
  });

  test('drops the ancestor failure tile as soon as a resume child exists', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="anc"]')).toBeNull();
  });

  test('shows every unhandled failure until each one is handled', () => {
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
      mount.querySelector('.rtile[data-attempt-id="older"]')
    ).not.toBeNull();
    expect(
      mount.querySelector('.rtile[data-attempt-id="newer"]')
    ).not.toBeNull();

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
      mount.querySelector('.rtile[data-attempt-id="older"]')
    ).not.toBeNull();
    expect(mount.querySelector('.rtile[data-attempt-id="newer"]')).toBeNull();
  });

  test('offers no dismiss control or dismiss transport', () => {
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

    expect(mount.querySelector('.rtile__dismiss')).toBeNull();
    expect(transport).not.toHaveBeenCalledWith(
      'worker-attempt-dismiss',
      expect.anything()
    );
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
      mount.querySelector('.rtile[data-attempt-id="f1"] .rtile__resume')
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

  test('renders no tile for a failure the bead finished after (UI-a9ys)', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="f1"]')).toBeNull();
  });

  test('renders the tile for a failure whose bead is not in the done lane', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="f1"]')).not.toBeNull();
  });

  test('renders the tile when the failure came after the done entry', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="f1"]')).not.toBeNull();
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
      mount.querySelector('.rtile[data-attempt-id="open"]')
    ).not.toBeNull();
    expect(
      mount.querySelector('.rtile[data-attempt-id="resolved"]')
    ).toBeNull();
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
    expect(mount.querySelector('.rtile[data-attempt-id="f1"]')).toBeNull();
  });

  test('renders the tile for a legacy attempt carrying no finished_at', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="f1"]')).not.toBeNull();
  });

  test('renders the tile for a legacy done entry normalized to added_at 0', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="f1"]')).not.toBeNull();
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
  const clickReadinessChip = (mount, value) => {
    /** @type {HTMLElement} */ (
      mount.querySelector(`.worker-filter__chip[data-readiness="${value}"]`)
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

  test('filters to candidates needing preparation', () => {
    const mount = mountCandidates();

    clickReadinessChip(mount, 'not_ready');

    expect(candIds(mount)).toEqual(['RD-2']);
    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('.worker-filter__chip[data-readiness="not_ready"]')
      ).classList.contains('is-active')
    ).toBe(true);
  });

  test('reports readiness-hidden rows apart from blocked rows', () => {
    const mount = mountCandidates();

    clickReadinessChip(mount, 'ready');

    // RD-2 is hidden by readiness; BL-1 by blocked. BL-1 is ready, so the
    // blocked toggle alone counts it.
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

    clickReadinessChip(mount, 'ready');
    const tgl = blockedToggle(mount);
    tgl.checked = true;
    tgl.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.worker.candidate-filter') ||
          'null'
      )
    ).toEqual({ show_blocked: true, readiness: 'ready', routes: [] });
  });

  test('restores a stored filter when the view is created', () => {
    presetCandidateFilter({ show_blocked: true, readiness: 'ready' });

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

  test('ignores a retired stored spec value and uses default readiness', () => {
    window.localStorage.setItem(
      'beads-ui.worker.candidate-filter',
      JSON.stringify({ show_blocked: true, spec: 'without' })
    );

    const mount = mountCandidates();

    expect(candIds(mount).sort()).toEqual(['BL-1', 'RD-1', 'RD-2']);
    expect(blockedToggle(mount).checked).toBe(true);
  });

  test('renders the filter strip on the candidate pane only', () => {
    const mount = mountCandidates();

    expect(
      mount.querySelectorAll('#worker-pane-candidate .worker-filter').length
    ).toBe(1);
    expect(mount.querySelectorAll('.worker-filter').length).toBe(1);
  });

  test('hides a blocked candidate without disturbing the chain order', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedMerged(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(candidateOrder(mount)).toEqual(['A', 'C']);
  });
});

describe('worker view — token usage display (UI-raqh §1)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
    expandDoneLane();
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
      'Claude subtotal = 입력 + 출력 + 캐시읽기 + 캐시생성\n총 239,430\n입력 8,420 · 출력 3,910 · 캐시읽기 214,300 · 캐시생성 12,800\n$0.42\nAPI 환산 단가 기준'
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

  test('draws the PR link on a done row from bead_workflow', () => {
    const mount = renderQueue(
      queueOf({
        done: [{ bead_id: 'RD-1', added_at: 1 }],
        bead_workflow: {
          'RD-1': {
            route: 'quick_fix',
            chips: {
              route: 'quick_fix',
              pr: { number: 213, url: 'https://github.com/o/r/pull/213' }
            }
          }
        }
      })
    );

    const link = /** @type {HTMLAnchorElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .worker-mini__pr')
    );
    expect(link.getAttribute('href')).toBe('https://github.com/o/r/pull/213');
    expect(link.textContent).toContain('#213');
  });

  test('leaves a done row without a PR link when the bead pinned no PR', () => {
    const mount = renderQueue(
      queueOf({
        done: [{ bead_id: 'RD-1', added_at: 1 }],
        bead_workflow: {
          'RD-1': { route: 'quick_fix', chips: { route: 'quick_fix' } }
        }
      })
    );

    expect(
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .worker-mini__pr')
    ).toBeNull();
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

  test('names the unpriced leg beside a partial cost sum (preset-compare §1.3)', () => {
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
    expect(el.textContent?.trim()).toBe(
      'Claude τ 31.1k · $1.50 (+1 leg 단가 없음)'
    );
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

describe('candidate sort — view (UI-raqh §2, UI-d13v §4.4)', () => {
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

  /**
   * @param {HTMLElement} mount
   * @returns {HTMLSelectElement}
   */
  function sortSelect(mount) {
    return /** @type {HTMLSelectElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort')
    );
  }

  /**
   * @param {HTMLElement} mount
   * @param {number} index
   * @returns {HTMLSelectElement}
   */
  function chainSelect(mount, index) {
    return /** @type {HTMLSelectElement} */ (
      mount.querySelectorAll('#worker-pane-candidate .worker-sort-chain__key')[
        index
      ]
    );
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} value
   */
  function chooseSort(mount, value) {
    const select = sortSelect(mount);
    select.value = value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /**
   * @param {HTMLElement} mount
   * @param {number} index
   * @param {string} value
   */
  function chooseStep(mount, index, value) {
    const select = chainSelect(mount, index);
    select.value = value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  test('renders the four presets and 사용자 지정 in the pane header', () => {
    const mount = mountMerged();

    expect(Array.from(sortSelect(mount).options).map((o) => o.value)).toEqual([
      'spec',
      'bottleneck',
      'created',
      'updated',
      'custom'
    ]);
  });

  test('defaults to spec-first when nothing is stored', () => {
    const mount = mountMerged();

    expect(sortSelect(mount).value).toBe('spec');
  });

  test('places a blocked candidate by the chain in the default preset', () => {
    const mount = mountMerged();

    expect(candidateOrder(mount)).toEqual(['A', 'B', 'C']);
  });

  test('reorders the lane when the preset changes', () => {
    const mount = mountMerged();

    chooseSort(mount, 'created');

    expect(candidateOrder(mount)).toEqual(['C', 'B', 'A']);
  });

  test('reorders the lane by updated_at under the updated preset', () => {
    const mount = mountMerged();

    chooseSort(mount, 'updated');

    expect(candidateOrder(mount)).toEqual(['A', 'C', 'B']);
  });

  test('persists the selected preset as JSON', () => {
    const mount = mountMerged();

    chooseSort(mount, 'bottleneck');

    expect(window.localStorage.getItem('bdui.worker.candidate_sort')).toBe(
      '{"preset":"bottleneck"}'
    );
  });

  test('restores a persisted preset on mount', () => {
    window.localStorage.setItem(
      'bdui.worker.candidate_sort',
      '{"preset":"created"}'
    );

    const mount = mountMerged();

    expect(candidateOrder(mount)).toEqual(['C', 'B', 'A']);
  });

  test('restores a legacy string preset on mount', () => {
    window.localStorage.setItem('bdui.worker.candidate_sort', 'updated');

    const mount = mountMerged();

    expect(candidateOrder(mount)).toEqual(['A', 'C', 'B']);
  });

  test('falls back to the default for an unknown stored value', () => {
    window.localStorage.setItem('bdui.worker.candidate_sort', 'nonsense');

    const mount = mountMerged();

    expect(sortSelect(mount).value).toBe('spec');
  });

  test('folds the chain row away for a preset', () => {
    const mount = mountMerged();

    expect(
      mount.querySelector('#worker-pane-candidate .worker-sort-chain')
    ).toBe(null);
  });

  test('unfolds the chain row when 사용자 지정 is chosen', () => {
    const mount = mountMerged();

    chooseSort(mount, 'custom');

    expect(
      mount.querySelectorAll('#worker-pane-candidate .worker-sort-chain__key')
        .length
    ).toBe(3);
  });

  test('seeds the chain row from the running preset', () => {
    const mount = mountMerged();

    chooseSort(mount, 'custom');

    expect([0, 1, 2].map((i) => chainSelect(mount, i).value)).toEqual([
      'spec',
      'created',
      ''
    ]);
  });

  test('leaves the lane order alone when 사용자 지정 is chosen', () => {
    const mount = mountMerged();

    chooseSort(mount, 'custom');

    expect(candidateOrder(mount)).toEqual(['A', 'B', 'C']);
  });

  test('unfolds the chain row on mount for a persisted chain', () => {
    window.localStorage.setItem(
      'bdui.worker.candidate_sort',
      '{"chain":[{"key":"updated","dir":"asc"}]}'
    );

    const mount = mountMerged();

    expect(sortSelect(mount).value).toBe('custom');
    expect(chainSelect(mount, 0).value).toBe('updated');
  });

  test('offers 없음 on the later steps only', () => {
    const mount = mountMerged();

    chooseSort(mount, 'custom');

    expect(Array.from(chainSelect(mount, 0).options)[0].value).toBe('priority');
    expect(Array.from(chainSelect(mount, 1).options)[0].value).toBe('');
  });

  test('reorders the lane when a chain step key changes', () => {
    const mount = mountMerged();
    chooseSort(mount, 'custom');

    chooseStep(mount, 0, 'updated');

    expect(candidateOrder(mount)).toEqual(['A', 'C', 'B']);
  });

  test('persists an edited chain as JSON', () => {
    const mount = mountMerged();
    chooseSort(mount, 'custom');

    chooseStep(mount, 0, 'updated');

    expect(window.localStorage.getItem('bdui.worker.candidate_sort')).toBe(
      '{"chain":[{"key":"updated","dir":"desc"},{"key":"created","dir":"asc"}]}'
    );
  });

  test('persists a chain no preset matches as a chain', () => {
    const mount = mountMerged();
    chooseSort(mount, 'custom');

    chooseStep(mount, 0, 'released');

    expect(window.localStorage.getItem('bdui.worker.candidate_sort')).toBe(
      '{"chain":[{"key":"released","dir":"desc"},{"key":"created","dir":"asc"}]}'
    );
  });

  test('truncates the chain when a later step is set to 없음', () => {
    const mount = mountMerged();
    chooseSort(mount, 'custom');

    chooseStep(mount, 1, '');

    expect(window.localStorage.getItem('bdui.worker.candidate_sort')).toBe(
      '{"chain":[{"key":"spec","dir":"desc"}]}'
    );
  });

  test('collapses a later step that repeats an earlier key', () => {
    const mount = mountMerged();
    chooseSort(mount, 'custom');

    chooseStep(mount, 1, 'spec');

    expect([0, 1].map((i) => chainSelect(mount, i).value)).toEqual([
      'spec',
      ''
    ]);
  });

  test('flips a step direction from its toggle button', () => {
    const mount = mountMerged();
    chooseSort(mount, 'custom');

    const toggle = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort-chain__dir')
    );
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.worker.candidate_sort')).toBe(
      '{"chain":[{"key":"spec","dir":"asc"},{"key":"created","dir":"asc"}]}'
    );
  });

  test('labels a step toggle with its current direction', () => {
    const mount = mountMerged();

    chooseSort(mount, 'custom');

    const toggle = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort-chain__dir')
    );
    expect(toggle.getAttribute('aria-label')).toBe('내림차순');
    expect(toggle.textContent?.trim()).toBe('↓');
  });

  test('draws no direction toggle for a 없음 step', () => {
    const mount = mountMerged();

    chooseSort(mount, 'custom');

    expect(
      mount.querySelectorAll('#worker-pane-candidate .worker-sort-chain__dir')
        .length
    ).toBe(2);
  });

  test('folds the chain row when a preset is chosen again', () => {
    const mount = mountMerged();
    chooseSort(mount, 'custom');

    chooseSort(mount, 'created');

    expect(
      mount.querySelector('#worker-pane-candidate .worker-sort-chain')
    ).toBe(null);
  });
});

describe('worker-ineligible candidates (UI-8881)', () => {
  /**
   * Ready feed carrying one `worker-ineligible` spec candidate (`INEL`) and one
   * plain spec candidate (`OK`), plus a rank-only third row for sort coverage.
   *
   * @param {Partial<any>} [over] - Overrides merged into the ineligible issue.
   */
  function seedIneligible(over = {}) {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'INEL',
        title: 'ineligible with spec',
        status: 'open',
        created_at: 100,
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT },
        labels: ['worker-ineligible'],
        ...over
      },
      {
        id: 'MID',
        title: 'plain without spec',
        status: 'open',
        created_at: 200,
        metadata: {}
      },
      {
        id: 'OK',
        title: 'plain with spec',
        status: 'open',
        created_at: 300,
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      }
    ]);
    return stores;
  }

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  test('keeps a label-less spec candidate placeable', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: seedIneligible(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const ok = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="OK"]')
    );
    expect(placeButton(mount, 'OK').disabled).toBe(false);
    expect(ok.classList.contains('worker-card--ineligible')).toBe(false);
  });

  test('treats a non-array labels payload as eligible without throwing', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: seedIneligible({ labels: 'worker-ineligible' }),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const inel = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="INEL"]')
    );
    expect(placeButton(mount, 'INEL').disabled).toBe(false);
    expect(inel.classList.contains('worker-card--ineligible')).toBe(false);
  });

  test('ignores non-string label entries without throwing', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: seedIneligible({ labels: [7, null, 'worker-ineligible'] }),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const inel = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="INEL"]')
    );
    expect(inel.classList.contains('worker-card--ineligible')).toBe(true);
    expect(inel.getAttribute('draggable')).toBe('false');
  });

  test('copies the id and opens the detail from an ineligible card', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const gotoIssue = vi.fn();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    createWorkerView(mount, {
      issueStores: seedIneligible(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn(),
      gotoIssue
    });

    const id_el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="INEL"] .worker-card__id')
    );
    id_el.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(writeText).toHaveBeenCalledWith('INEL');
    expect(gotoIssue).not.toHaveBeenCalled();

    const title_el = /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-card[data-bead-id="INEL"] .worker-card__title'
      )
    );
    title_el.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(gotoIssue).toHaveBeenCalledWith('INEL');
  });

  test('hides an ineligible blocked candidate until show_blocked is on', () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', []);
    seed(stores, 'tab:worker:blocked', [
      {
        id: 'INEL-BL',
        title: 'ineligible blocked',
        status: 'open',
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT },
        labels: ['worker-ineligible'],
        dependencies: ['DEP-1']
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(candidateOrder(mount)).toEqual([]);

    document.body.innerHTML = '<div id="m2"></div>';
    const mount2 = /** @type {HTMLElement} */ (document.getElementById('m2'));
    presetCandidateFilter({ show_blocked: true });
    createWorkerView(mount2, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(
      mount2.querySelector('.worker-card[data-bead-id="INEL-BL"]')
    ).not.toBeNull();
  });

  test('puts an ineligible candidate in the preparation segment', () => {
    presetCandidateFilter({ readiness: 'not_ready' });
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    createWorkerView(mount, {
      issueStores: seedIneligible(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(candidateOrder(mount)).toEqual(['INEL', 'MID']);

    document.body.innerHTML = '<div id="m2"></div>';
    const mount2 = /** @type {HTMLElement} */ (document.getElementById('m2'));
    presetCandidateFilter({ readiness: 'ready' });
    createWorkerView(mount2, {
      issueStores: seedIneligible(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    expect(candidateOrder(mount2)).toEqual(['OK']);
  });

  test('sorts an ineligible row with the shared candidate comparators', () => {
    /** @type {Array<[string, string[]]>} */
    const cases = [
      ['spec', ['INEL', 'OK', 'MID']],
      ['created', ['OK', 'MID', 'INEL']],
      ['bottleneck', ['INEL', 'MID', 'OK']]
    ];

    for (const [preset, expected] of cases) {
      document.body.innerHTML = '<div id="ms"></div>';
      window.localStorage.setItem(
        'bdui.worker.candidate_sort',
        JSON.stringify({ preset })
      );
      const mount = /** @type {HTMLElement} */ (document.getElementById('ms'));
      createWorkerView(mount, {
        issueStores: seedIneligible(),
        queueStore: createWorkerQueueStore(),
        transport: vi.fn()
      });

      expect(candidateOrder(mount)).toEqual(expected);
    }
  });

  test('sends no mutation when a drag starts on an ineligible card', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    // 이 레인 순서(INEL, MID, OK)를 만드는 체인.
    window.localStorage.setItem(
      'bdui.worker.candidate_sort',
      '{"chain":[{"key":"created","dir":"asc"}]}'
    );
    const transport = vi.fn().mockResolvedValue({ applied: true });
    createWorkerView(mount, {
      issueStores: seedIneligible(),
      queueStore: createWorkerQueueStore(),
      transport
    });

    dragOnto(mount, 'INEL', 'OK');
    drag(mount, 'INEL', 'worker-pane-queue');
    await flush();

    expect(transport).not.toHaveBeenCalled();
    expect(candidateOrder(mount)).toEqual(['INEL', 'MID', 'OK']);
  });
});

describe('session-preferred candidates (UI-49mc)', () => {
  /**
   * Ready feed carrying one advisory candidate (`PREF`) whose label/metadata
   * pair the case under test overrides, plus a plain spec candidate.
   *
   * @param {Partial<any>} [over] - Overrides merged into the advisory issue.
   */
  function seedPreferred(over = {}) {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'PREF',
        title: 'session preferred with spec',
        status: 'open',
        created_at: 100,
        spec_id: 'S',
        metadata: {
          route: 'spec_backed',
          spec_review: RECEIPT,
          session_preferred_reason: 'external_roundtrip'
        },
        labels: ['session-preferred'],
        ...over
      },
      {
        id: 'OK',
        title: 'plain with spec',
        status: 'open',
        created_at: 300,
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      }
    ]);
    return stores;
  }

  /**
   * @param {Partial<any>} [over]
   * @returns {HTMLElement}
   */
  function renderPreferred(over = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedPreferred(over),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="PREF"]')
    );
  }

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  test('draws the chip for a label paired with an enum reason', () => {
    const card = renderPreferred();

    expect(
      card.querySelector('.worker-card__session-preferred')?.textContent?.trim()
    ).toBe('세션 권장');
  });

  test('omits the chip when the label carries no reason', () => {
    const card = renderPreferred({
      metadata: { route: 'spec_backed', spec_review: RECEIPT }
    });

    expect(card.querySelector('.worker-card__session-preferred')).toBeNull();
  });

  test('omits the chip for a reason outside the contract enum', () => {
    const card = renderPreferred({
      metadata: { session_preferred_reason: 'other' }
    });

    expect(card.querySelector('.worker-card__session-preferred')).toBeNull();
  });

  test('ignores a reason carried without the label', () => {
    const card = renderPreferred({ labels: [] });

    expect(card.querySelector('.worker-card__session-preferred')).toBeNull();
    expect(
      /** @type {HTMLButtonElement} */ (
        card.querySelector('.worker-card__place')
      ).disabled
    ).toBe(false);
  });

  test('draws only the worker-ineligible treatment when both are attached', () => {
    const card = renderPreferred({
      labels: ['worker-ineligible', 'session-preferred']
    });

    expect(card.classList.contains('worker-card--ineligible')).toBe(true);
    expect(card.querySelector('.worker-card__ineligible')).not.toBeNull();
    expect(card.querySelector('.worker-card__session-preferred')).toBeNull();
  });

  test('renders a non-array labels payload without the chip', () => {
    const card = renderPreferred({ labels: 'session-preferred' });

    expect(card.querySelector('.worker-card__session-preferred')).toBeNull();
  });

  test('renders a row without metadata without the chip', () => {
    const card = renderPreferred({ metadata: undefined, spec_id: 'S' });

    expect(card.querySelector('.worker-card__session-preferred')).toBeNull();
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
    expect(badge.textContent?.trim()).toBe('확인 중');
    expect(badge.querySelector('.act-dot')).not.toBe(null);
  });

  test('shows 검증 중 while the optional verification runs', () => {
    const row = renderRow(VERIFY_PENDING, 'verifying');

    expect(
      row.querySelector('.worker-mini__badge--activity')?.textContent?.trim()
    ).toBe('확인 중');
  });

  test('keeps the settled badge when nothing is running', () => {
    const row = renderRow(UNOBSERVED, null);

    expect(row.querySelector('.worker-mini__badge--activity')).toBe(null);
    expect(row.textContent).toContain('확인 중');
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
      label: '부모 close 중',
      index: 7,
      total: 7,
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
      'base 확인 중',
      '저장소 작업',
      '자식 정리 중',
      '브랜치 정리 중',
      '부모 close 중'
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
        pr_wait: [queue_over.pr_wait_entry || { bead_id: 'RD-1', added_at: 1 }],
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
            gate: queue_over.gate || GATE_OK
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
      merge_progress: { step: 'child_sweep', started_at: 1 }
    });

    const step = /** @type {HTMLElement} */ (
      mount.querySelector('.merge-step')
    );
    expect(step.textContent?.replace(/\s+/g, '')).toBe('자식정리중5/7');
  });

  test('marks the row and its progress width', () => {
    const mount = mountRow({
      activity: null,
      merge_progress: { step: 'child_sweep', started_at: 1 }
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.classList.contains('worker-mini--merging')).toBe(true);
    expect(row.getAttribute('style')).toContain('--progress: 71%');
  });

  test('shows exact deploy progress beside the merged badge', () => {
    const merge_sha = 'a'.repeat(40);
    const mount = mountRow(null, undefined, {
      gate: {
        enabled: false,
        tier: 'merged',
        gate_badge: '머지됨',
        base_badge: '머지됨',
        reason: null
      },
      pr_wait_entry: {
        bead_id: 'RD-1',
        added_at: 1,
        merge_sha,
        cleanup_cursor: 'repo_operations'
      },
      repo_operations: [
        {
          operation_id: 'deploy-1',
          kind: 'deploy',
          state: 'running',
          requested_at: 1,
          subjects: [{ bead_id: 'RD-1', merged_sha: merge_sha }],
          superseded_by: null
        }
      ]
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.textContent?.replace(/\s+/g, '')).toContain('머지됨');
    expect(row.textContent?.replace(/\s+/g, '')).toContain('배포중4/7');
    expect(row.querySelector('.worker-mini__merge')).toBeNull();
  });

  test('blocks discard while exact deploy progress is active', () => {
    const merge_sha = 'a'.repeat(40);
    const mount = mountRow(null, undefined, {
      gate: { enabled: false, tier: 'merged', gate_badge: '머지됨' },
      pr_wait_entry: {
        bead_id: 'RD-1',
        added_at: 1,
        merge_sha,
        cleanup_cursor: 'repo_operations'
      },
      repo_operations: [
        {
          operation_id: 'verify-1',
          kind: 'verify',
          state: 'running',
          requested_at: 1,
          subjects: [{ bead_id: 'RD-1', merged_sha: merge_sha }],
          superseded_by: null
        }
      ]
    });

    const discard = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__discard')
    );
    expect(discard.disabled).toBe(true);
    expect(discard.title).toContain('정리 진행 중');
  });

  test('keeps an exact retry ahead of a stale cleanup failure', () => {
    const merge_sha = 'a'.repeat(40);
    const mount = mountRow(null, undefined, {
      gate: { enabled: false, tier: 'merged', gate_badge: '머지됨' },
      pr_wait_entry: {
        bead_id: 'RD-1',
        added_at: 1,
        merge_sha,
        cleanup_cursor: 'repo_operations'
      },
      cleanup_failed: {
        'RD-1': { step: 'repo_operations', reason: 'previous failure' }
      },
      repo_operations: [
        {
          operation_id: 'deploy-2',
          kind: 'deploy',
          state: 'retry_pending',
          requested_at: 2,
          subjects: [{ bead_id: 'RD-1', merged_sha: merge_sha }],
          superseded_by: null
        }
      ]
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.textContent?.replace(/\s+/g, '')).toContain('배포재시도대기4/7');
    expect(row.textContent).not.toContain('정리 5단계 중');
  });

  test('names the failed script on the resume action of an exact verify failure', () => {
    const merge_sha = 'a'.repeat(40);
    const mount = mountRow(null, undefined, {
      gate: { enabled: false, tier: 'merged', gate_badge: '머지됨' },
      pr_wait_entry: {
        bead_id: 'RD-1',
        added_at: 1,
        merge_sha,
        cleanup_cursor: 'repo_operations'
      },
      cleanup_failed: {
        'RD-1': { step: 'repo_operations', reason: 'verify failed' }
      },
      repo_operations: [
        {
          operation_id: 'verify-1',
          kind: 'verify',
          state: 'failed',
          requested_at: 1,
          subjects: [{ bead_id: 'RD-1', merged_sha: merge_sha }],
          superseded_by: null
        }
      ]
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    expect(row.textContent?.replace(/\s+/g, '')).toContain('검증실패3/7');
    expect(row.querySelector('.merge-step--failed')).not.toBeNull();
    expect(row.querySelector('.worker-mini__merge')?.textContent?.trim()).toBe(
      '검증 재시도 후 정리'
    );
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

  test('covers the click with a queueing badge, not a merge step, before the snapshot lands', async () => {
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
    expect(row.querySelector('.merge-step')).toBe(null);
    expect(row.textContent).toContain('큐 등록 중');

    release({ applied: true, conflict: false, queued: 1 });
    await flush();
    expect(
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')?.textContent
    ).not.toContain('큐 등록 중');
  });

  test('keeps the merge button locked while the click is still in flight', async () => {
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

    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('.worker-mini__merge')
      ).disabled
    ).toBe(true);

    release({ applied: true, conflict: false, queued: 1 });
    await flush();
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
   * @param {any} [queue_over]
   * @param {((id: string) => void)|undefined} [gotoIssue]
   * @returns {HTMLElement} A view over seedCandidates() with blocked shown, so
   * the blocked-with-spec candidate BL-1 is on screen too.
   */
  function mountWithBlocked(transport, queue_over = {}, gotoIssue) {
    window.localStorage.setItem(
      'beads-ui.worker.candidate-filter',
      JSON.stringify({ show_blocked: true, readiness: 'all' })
    );
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [{ bead_id: 'QQ-1', added_at: 1 }],
        ...queue_over
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport,
      gotoIssue
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

  /**
   * @param {any} [over]
   * @returns {any}
   */
  function serialQueue(over = {}) {
    return {
      serial_lane_count: 2,
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'S1-1', added_at: 1 }] },
        {
          id: 's2',
          entries: [
            { bead_id: 'S2-1', added_at: 1 },
            { bead_id: 'S2-2', added_at: 2 }
          ]
        }
      ],
      lane_states: {
        s1: {
          occupied_by: ['GHOST-1'],
          order: ['S1-1', 'GHOST-1'],
          corrections: [],
          cycle: false
        },
        s2: {
          occupied_by: [],
          order: ['S2-1', 'S2-2'],
          corrections: [],
          cycle: false
        }
      },
      ...over
    };
  }

  test('places the candidate at the tail of the waiting queue', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountWithBlocked(transport);

    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
  });

  test('opens lane choices with waiting-entry counts without sending', () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountWithBlocked(transport, serialQueue());

    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    const choices = Array.from(
      mount.querySelectorAll(
        '.worker-card[data-bead-id="RD-1"] .worker-card__place-lane'
      )
    );
    expect(
      choices.map((choice) => choice.textContent?.replace(/\s+/g, ' ').trim())
    ).toEqual(['병렬 1', '직렬 1 1', '직렬 2 2']);
    expect(transport).not.toHaveBeenCalled();
  });

  test('places the candidate at the serial lane tail without an index', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountWithBlocked(transport, serialQueue());
    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-card[data-bead-id="RD-1"] .worker-card__place-lane[data-lane="s2"]'
      )
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
      lane: 's2',
      expected_revision: 1
    });
  });

  test('places the candidate at the parallel tail without lane or index', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountWithBlocked(transport, serialQueue());
    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-card[data-bead-id="RD-1"] .worker-card__place-lane[data-lane="parallel"]'
      )
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
  });

  test('retries a tail placement after conflict without an index', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        queue: queueOf({ ...serialQueue(), revision: 5 })
      })
      .mockResolvedValueOnce({ ok: true });
    const mount = mountWithBlocked(transport, serialQueue());
    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-card[data-bead-id="RD-1"] .worker-card__place-lane[data-lane="s2"]'
      )
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport.mock.calls).toEqual([
      [
        'worker-queue-place',
        { bead_id: 'RD-1', lane: 's2', expected_revision: 1 }
      ],
      [
        'worker-queue-place',
        { bead_id: 'RD-1', lane: 's2', expected_revision: 5 }
      ]
    ]);
  });

  test('closes lane choices without sending when cancel is clicked', () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountWithBlocked(transport, serialQueue());
    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-card[data-bead-id="RD-1"] .worker-card__place-cancel'
      )
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(transport).not.toHaveBeenCalled();
    expect(placeBtn(mount, 'RD-1')).not.toBeNull();
    expect(mount.querySelector('.worker-card__place-menu')).toBeNull();
  });

  test('keeps only the latest candidate lane menu open', () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountWithBlocked(transport, serialQueue());
    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    placeBtn(mount, 'BL-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    const menus = mount.querySelectorAll('.worker-card__place-menu');
    expect(menus).toHaveLength(1);
    expect(
      menus[0]
        .querySelector('.worker-card__place-lane')
        ?.getAttribute('data-bead-id')
    ).toBe('BL-1');
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
    expect(mount.querySelector('.worker-card__place-menu')).toBeNull();
  });

  test('does not open the detail panel on a direct place button click', async () => {
    const gotoIssue = vi.fn();
    const mount = mountWithBlocked(
      vi.fn().mockResolvedValue({ ok: true }),
      {},
      gotoIssue
    );

    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    await flush();

    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('does not open the detail panel on a lane choice click', async () => {
    const gotoIssue = vi.fn();
    const mount = mountWithBlocked(
      vi.fn().mockResolvedValue({ ok: true }),
      serialQueue(),
      gotoIssue
    );

    placeBtn(mount, 'RD-1').dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-card[data-bead-id="RD-1"] .worker-card__place-lane[data-lane="s1"]'
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

  /**
   * Fold the 대기 lane before mounting. 대기 starts EXPANDED (UI-5ksp §3-3),
   * so a test about the collapsed strip has to say so.
   */
  function collapseQueueLane() {
    window.localStorage.setItem(
      'beads-ui.worker.lane-collapsed',
      JSON.stringify({ lanes: { queue: true } })
    );
  }

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

  test('collapses only 완료 on a first visit', () => {
    const mount = mountMobile();

    const done_pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-done')
    );
    const queue_pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue')
    );

    expect(done_pane.classList.contains('worker-pane--collapsed')).toBe(true);
    expect(done_pane.querySelector('.worker-pane__body')).toBe(null);
    expect(done_pane.dataset.lane).toBe('done');
    expect(queue_pane.classList.contains('worker-pane--collapsed')).toBe(false);
  });

  test('omits waiting selection controls on the mobile queue lane', () => {
    const mount = mountMobile({
      queue: [{ bead_id: 'RD-1', added_at: 1 }]
    });

    const queue_pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue')
    );
    expect(queue_pane.querySelector('.worker-mini__select')).toBeNull();
    expect(queue_pane.querySelector('.worker-bulk')).toBeNull();
  });

  test('expands a strip when its header is tapped', () => {
    const mount = mountMobile({ done: [{ bead_id: 'RD-1', added_at: 1 }] });

    /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-done .worker-pane__toggle')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const done_pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-done')
    );
    expect(done_pane.classList.contains('worker-pane--collapsed')).toBe(false);
    expect(
      done_pane.querySelector('.worker-mini[data-bead-id="RD-1"]')
    ).not.toBe(null);
  });

  test('stores the collapse state on every toggle', () => {
    const mount = mountMobile();

    /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-done .worker-pane__toggle')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.worker.lane-collapsed') || '{}'
      )
    ).toEqual({ lanes: { done: false }, areas: {} });
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
    collapseQueueLane();
    const mount = mountMobile({ queue: [{ bead_id: 'RD-1', added_at: 1 }] });

    expect(
      mount.querySelector('#worker-pane-queue .worker-pane__preview')
        ?.textContent
    ).toContain('ready with spec');
  });

  test('appends to the queue from the candidate button while the strip is collapsed', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    collapseQueueLane();
    const mount = mountMobile(
      { queue: [{ bead_id: 'QQ-1', added_at: 1 }] },
      transport
    );

    placeToQueue(mount, 'RD-1');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
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
    expandDoneLane();
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

  test('names the unpriced leg on the KPI chip (preset-compare §1.3)', () => {
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
    ).toBe('오늘 완료 · 누적 Claude τ 2.0k · $1.50 (+1 leg 단가 없음)');
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

    expect(badges).toContain('다른 base 대상');
    expect(
      mount
        .querySelector('.worker-mini[data-bead-id="RD-1"] .worker-mini__badge')
        ?.getAttribute('title')
    ).toContain('→ ilsun/dev');
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

describe('mobile ribbon (UI-58y2)', () => {
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
    expect(ribbon.querySelector('.worker-repo-ops-settings')).toBe(null);
    expect(mount.querySelector('.worker-slots__input')).not.toBe(null);
    expect(mount.querySelector('.worker-repo-ops-settings')).not.toBe(null);
  });

  test('renders a failed decision tile without a ribbon banner', () => {
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

    expect(mount.querySelector('.rtile[data-attempt-id="a1"]')).not.toBeNull();
    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
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
    expect(card(mount).textContent).not.toContain('관측 대기');
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

  test('uses the cleanup discard tooltip after merge reaches base containment', () => {
    const mount = mountBoard({
      gate: CLEAN,
      activity: {
        activity: null,
        merge_progress: { step: 'base_containment' }
      }
    });

    expect(button(mount, '.worker-mini__discard').getAttribute('title')).toBe(
      '정리 진행 중 — 폐기할 수 없습니다'
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
    expandDoneLane();
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

  test('marks an external row beside the title instead of as a status badge', () => {
    const mount = mountRow(OPEN_GREEN);

    expect(badgesOf(mount)).toEqual(['머지 가능']);
    expect(mount.querySelector('.worker-mini__title .muted')?.textContent).toBe(
      ' · 세션'
    );
  });

  test('leaves a worker row without the 세션 marker', () => {
    const mount = mountRow(OPEN_GREEN, { external: false });

    expect(badgesOf(mount)).not.toContain('세션');
    expect(mount.querySelector('.worker-mini__title .muted')).toBe(null);
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

    expect(mount.querySelector('.worker-mini__merge')).toBe(null);
  });

  test('offers 정리 재시도 on a merged external row after a failure', () => {
    const mount = mountRow(MERGED, {
      cleanup_failed: {
        'RD-1': { step: 'base_containment', reason: 'base_fetch_failed' }
      }
    });

    const btn = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.worker-mini__merge')
    );
    expect(btn.textContent?.trim()).toBe('정리 재시도');
    expect(btn.disabled).toBe(false);
  });

  test('keeps a merged WORKER row quiet — its cleanup runs on its own', () => {
    const mount = mountRow(MERGED, { external: false });

    expect(mount.querySelector('.worker-mini__merge')).toBe(null);
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

  test('locks per-row cancellation while the merge itself is running', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: null, failures: {} },
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'merging',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            active_attempt_id: 'a1',
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
    expect(row.textContent).toContain('머지 중');
    const cancel = /** @type {HTMLButtonElement} */ (
      row.querySelector('.worker-mini__merge-cancel')
    );
    expect(cancel.disabled).toBe(true);
    expect(cancel.title).toContain('머지 중');
    expect(cancel.title).toContain('상단 자동 머지 중단');
    const badge = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__badge')
    );
    const details = /** @type {HTMLElement} */ (badge.querySelector('[title]'));
    expect(details.title).toContain('merge_gate · verify_cmd_failed');
    expect(details.title).toContain('/state/verify.log');
  });

  test('says why a merge-후 검증 red ended on a person (UI-8w4t §3)', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'needs_human',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            active_attempt_id: null,
            failure_stage: 'verify',
            failure_reason: 'verify_cmd_failed',
            log_path: '/state/verify.log',
            terminal_reason: 'verify_red'
          }
        }
      })
    );

    const badge = /** @type {HTMLElement} */ (
      Array.from(
        rowOf(mount, 'RD-1').querySelectorAll('.worker-mini__badge')
      ).find((element) => element.textContent?.includes('확인 필요'))
    );
    expect(badge.title).toContain('머지 후 검증이 실패했습니다.');
    expect(badge.title).toContain('verify · 머지 후 검증이 실패했습니다.');
  });

  test('offers the failure log path for copying on the needs_human card (UI-8w4t §4)', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'needs_human',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            active_attempt_id: null,
            failure_stage: 'verify',
            failure_reason: 'verify_cmd_failed',
            log_path: '/state/verify.log',
            terminal_reason: 'verify_red'
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(row.querySelector('.worker-ev__path')?.textContent).toBe(
      '/state/verify.log'
    );
    expect(row.querySelector('[data-seam="log-path-copy"]')).not.toBe(null);
  });

  test('does not open the issue detail when the log path is copied', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const gotoIssue = vi.fn();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      laneOf(['RD-1'], {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'needs_human',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            active_attempt_id: null,
            failure_stage: 'verify',
            failure_reason: 'verify_cmd_failed',
            log_path: '/state/verify.log',
            terminal_reason: 'verify_red'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn(),
      gotoIssue
    });

    /** @type {HTMLElement} */ (
      rowOf(mount, 'RD-1').querySelector('[data-seam="log-path-copy"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(writeText).toHaveBeenCalledWith('/state/verify.log');
    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('omits the log control when the failure stopped before a log existed', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'needs_human',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            active_attempt_id: null,
            failure_stage: 'cleanup',
            failure_reason: 'repo_operations_unavailable',
            log_path: null,
            terminal_reason: 'repo_operations_unavailable'
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(row.querySelector('.worker-ev__path')).toBe(null);
    expect(row.querySelector('[data-seam="log-path-copy"]')).toBe(null);
  });

  test('says a retired repair lane handed the failure over (UI-8w4t §3)', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'needs_human',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            active_attempt_id: null,
            failure_stage: 'repairing',
            failure_reason: 'repair_lane_retired',
            terminal_reason: 'repair_lane_retired'
          }
        }
      })
    );

    const badge = /** @type {HTMLElement} */ (
      Array.from(
        rowOf(mount, 'RD-1').querySelectorAll('.worker-mini__badge')
      ).find((element) => element.textContent?.includes('확인 필요'))
    );
    expect(badge.title).toContain(
      '자동 수리 레인이 은퇴해 사람 처리로 넘어왔습니다.'
    );
  });

  test('adds no sentence for an unknown terminal reason', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        completion_status: {
          'RD-1': {
            root_bead_id: 'RD-1',
            phase: 'needs_human',
            subject_role: 'root',
            subject_bead_id: 'RD-1',
            active_attempt_id: null,
            failure_stage: 'cleanup',
            failure_reason: 'future_code',
            terminal_reason: 'future_code'
          }
        }
      })
    );

    const badge = /** @type {HTMLElement} */ (
      Array.from(
        rowOf(mount, 'RD-1').querySelectorAll('.worker-mini__badge')
      ).find((element) => element.textContent?.includes('확인 필요'))
    );
    expect(badge.title).toContain('cleanup · future_code');
    expect(
      badge.title.split('\n').filter((line) => line === 'cleanup')
    ).toEqual([]);
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
            active_attempt_id: null,
            terminal_reason: null
          }
        }
      })
    );

    const badge = rowOf(mount, 'RD-1').querySelector('.worker-mini__badge');
    expect(badge?.textContent).toContain('마무리 중');
    expect(badge?.querySelector('[title]')?.getAttribute('title')).toContain(
      '마무리 중'
    );
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
            active_attempt_id: null,
            terminal_reason: null
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(row.textContent).toContain('자동 진행 일시정지');
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
            active_attempt_id: null,
            evidence: 'journal malformed',
            log_path: '/state/completion.log',
            terminal_reason: 'intent_state_invalid'
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');
    expect(row.textContent).toContain('확인 필요');
    const badge = /** @type {HTMLElement} */ (
      Array.from(row.querySelectorAll('.worker-mini__badge')).find((element) =>
        element.textContent?.includes('확인 필요')
      )
    );
    expect(badge.classList.contains('worker-mini__badge--alert')).toBe(true);
    expect(badge.title).toContain('journal malformed');
    expect(badge.title).toContain('/state/completion.log');
  });

  test('omits recovery UI when the optional projection is absent', () => {
    const { mount } = mountLane(laneOf(['RD-1']));

    const row = rowOf(mount, 'RD-1');
    expect(row.textContent).not.toContain('자동 수정');
    expect(row.textContent).not.toContain('확인 필요');
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
    expect(
      /** @type {HTMLButtonElement} */ (
        waiting.querySelector('.worker-mini__merge-cancel')
      ).disabled
    ).toBe(false);
    // These rows carry no `authority`, i.e. they predate the manual
    // continuation runtime — the driver never continues them on its own, so
    // the re-click that creates one is the way forward (UI-58w8 §1).
    expect(
      /** @type {HTMLButtonElement} */ (
        waiting.querySelector('.worker-mini__merge')
      ).textContent
    ).toContain('다시 머지');
  });

  test('renders an execution-slot wait as a nonterminal resolution badge', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: {
          active: null,
          failures: {},
          waiting: {
            bead_id: 'RD-1',
            reason: 'worker_sessions_busy'
          }
        }
      })
    );

    const row = rowOf(mount, 'RD-1');

    expect(row.textContent).toContain('해소 대기 — 실행 슬롯 대기 중');
    expect(row.classList.contains('worker-mini--alert')).toBe(false);
  });

  test('hides an unknown resolver wait reason', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: {
          active: null,
          failures: {},
          waiting: { bead_id: 'RD-1', reason: 'future_reason' }
        }
      })
    );

    expect(rowOf(mount, 'RD-1').textContent).not.toContain('future_reason');
  });

  test('shows the mapped lane-occupied merge refusal toast', async () => {
    const transport = vi.fn(async () => ({
      applied: false,
      conflict: false,
      reason: 'lane_occupied',
      queued: 0
    }));
    const { mount } = mountLane(laneOf(['RD-1']), transport);

    /** @type {HTMLButtonElement} */ (
      rowOf(mount, 'RD-1').querySelector('.worker-mini__merge')
    ).click();
    await flush();

    expect(document.querySelector('.toast')?.textContent).toContain(
      '실행 레인에 남아 있어 머지 대상이 아닙니다'
    );
  });

  test('surfaces a transport failure of the merge click as a toast', async () => {
    const transport = vi.fn(async () => {
      throw new Error('ws disconnected');
    });
    const { mount } = mountLane(laneOf(['RD-1']), transport);

    /** @type {HTMLButtonElement} */ (
      rowOf(mount, 'RD-1').querySelector('.worker-mini__merge')
    ).click();
    await flush();

    expect(document.querySelector('.toast')?.textContent).toContain(
      '머지 클릭이 서버에 전달되지 않았습니다'
    );
  });

  test('a queued row under a live manual authority still swaps 머지 for 취소', () => {
    const { mount } = mountLane(
      laneOf(['RD-1', 'RD-2'], {
        merge_queue: [
          {
            bead_id: 'RD-1',
            resolution_rounds: 0,
            authority: {
              id: 'authority-1',
              source: 'manual',
              granted_at: 1,
              requested_head_sha: 'a'.repeat(40),
              target_base: 'main'
            }
          },
          {
            bead_id: 'RD-2',
            resolution_rounds: 0,
            authority: {
              id: 'authority-2',
              source: 'manual',
              granted_at: 1,
              requested_head_sha: 'a'.repeat(40),
              target_base: 'main'
            }
          }
        ],
        merge_queue_state: { active: 'RD-1', failures: {} }
      })
    );

    const waiting = rowOf(mount, 'RD-2');

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
      expect(row.textContent).not.toContain('머지 대기 #1');
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

  /**
   * A queued row the merge gate is holding (UI-d7fy §3.3).
   *
   * @param {string} reason
   */
  function heldEntry(reason) {
    return {
      bead_id: 'RD-1',
      resolution_rounds: 0,
      authority: {
        id: 'authority-1',
        source: 'manual',
        granted_at: 1,
        requested_head_sha: 'a'.repeat(40),
        target_base: 'main'
      },
      hold: { reason, head_sha: 'b'.repeat(40), since: 2 }
    };
  }

  test('draws no review journal badge on a held row', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [heldEntry('review_receipt_stale')],
        merge_queue_state: { active: null, failures: {} }
      })
    );

    const text = rowOf(mount, 'RD-1').textContent || '';

    // The gate badge is the whole surface now (UI-d7fy §6); the journal's own
    // labels are gone with the journal.
    expect(text).not.toContain('implementation review');
    expect(text).not.toContain('review 자동 진행 실패');
    expect(text).not.toContain('리뷰 실패');
    expect(text).not.toContain('머지 전 확인 중');
  });

  test('omits review UI on a legacy entry without the optional fields', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: { active: null, failures: {} }
      })
    );

    const text = rowOf(mount, 'RD-1').textContent || '';

    expect(text).not.toContain('implementation review');
    expect(text).not.toContain('review 자동 진행 실패');
  });

  test('keeps 취소 disabled while the merge effect itself runs', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [heldEntry('review_receipt_missing')],
        merge_queue_state: { active: 'RD-1', failures: {} }
      })
    );

    const cancel = /** @type {HTMLButtonElement} */ (
      rowOf(mount, 'RD-1').querySelector('.worker-mini__merge-cancel')
    );

    expect(cancel.disabled).toBe(true);
  });

  test('keeps 취소 enabled on a held row the driver is not on', () => {
    const { mount } = mountLane(
      laneOf(['RD-1'], {
        merge_queue: [heldEntry('review_receipt_missing')],
        merge_queue_state: { active: null, failures: {} }
      })
    );

    const cancel = /** @type {HTMLButtonElement} */ (
      rowOf(mount, 'RD-1').querySelector('.worker-mini__merge-cancel')
    );

    expect(cancel).not.toBe(null);
    expect(cancel.disabled).toBe(false);
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
    ).toContain('머지 실패 — 충돌 해소 2회 초과');
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

    expect(row.textContent).not.toContain('머지 실패 —');
    expect(
      row.querySelector('.worker-mini__badge [title]')?.getAttribute('title')
    ).toContain('resolution_timeout');
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
      '자동 제외 — 충돌 해소 2회 초과'
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
    expect(mergeFailureText('not_in_pr_wait')).toBe('PR 대기 상태 동기화 실패');
    expect(mergeFailureText('merge_unconfirmed_timeout')).toBe(
      '머지 확인 시간 초과'
    );
  });

  test('passes an unknown reason through instead of blanking the badge', () => {
    expect(mergeFailureText('brand_new_reason')).toBe('brand_new_reason');
  });

  test('separates the queue-caused re-conflict budget from the session one', () => {
    expect(mergeFailureText('resolution_rebase_cap')).toBe(
      '큐 재충돌 3회 초과'
    );
  });

  test('names which worktree-restore check refused', () => {
    expect(mergeFailureText('worktree_restore_branch_mismatch')).toBe(
      '워크트리 복원 실패 — 브랜치 이름 불일치'
    );
    expect(mergeFailureText('worktree_restore_path_exists')).toBe(
      '워크트리 복원 실패 — 경로 이미 있음'
    );
    expect(mergeFailureText('worktree_restore_branch_missing')).toBe(
      '워크트리 복원 실패 — origin에 브랜치 없음'
    );
    expect(mergeFailureText('worktree_restore_branch_diverged')).toBe(
      '워크트리 복원 실패 — 로컬 브랜치가 origin과 다름'
    );
    expect(mergeFailureText('worktree_restore_failed')).toBe(
      '워크트리 복원 실패'
    );
  });

  test('points a receipt hold at the manual [머지] click that lifts it', () => {
    const text = mergeFailureText('receipt_unbacked:probe_error');

    expect(text).toContain('probe_error');
    expect(text).toContain('[머지] 클릭으로 수동 진행 가능');
  });

  test('keeps the manual-click hint for every receipt_unbacked code', () => {
    const text = mergeFailureText('receipt_unbacked:main_receipt_unbacked');

    expect(text).toContain('main_receipt_unbacked');
    expect(text).toContain('[머지] 클릭으로 수동 진행 가능');
  });
});

describe('mergeQueueRefusalText (UI-75xw §6)', () => {
  test('maps lane occupancy to Korean', () => {
    expect(mergeQueueRefusalText('lane_occupied')).toBe(
      '실행 레인에 남아 있어 머지 대상이 아닙니다'
    );
  });

  test('appends an unknown server reason', () => {
    expect(mergeQueueRefusalText('future_reason')).toContain('future_reason');
  });
});

describe('receiptWarningCodes (UI-bu6d §7)', () => {
  test('reads the blocking codes off a recorded summary', () => {
    const codes = receiptWarningCodes({
      blocking_codes: ['main_receipt_unbacked']
    });

    expect(codes).toEqual(['main_receipt_unbacked']);
  });

  test('stays quiet without a recorded summary', () => {
    expect(receiptWarningCodes(null)).toEqual([]);
  });

  test('stays quiet on a probe error that named no code', () => {
    expect(
      receiptWarningCodes({ probe_error: true, blocking_codes: [] })
    ).toEqual([]);
  });

  test('stays quiet on a summary whose shape it cannot read', () => {
    expect(receiptWarningCodes({ blocking_codes: 'nope' })).toEqual([]);
  });
});

describe('prStatusBadge priority (UI-vkk8 §3)', () => {
  test('warns about an unbacked execution receipt', () => {
    const result = prStatusBadge({
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['main_receipt_unbacked'],
        blocking_codes: ['main_receipt_unbacked']
      }
    });

    expect(result).toMatchObject({
      label: '영수증 확인 필요 · main_receipt_unbacked',
      alert: true
    });
    expect(result?.title).toContain('main_receipt_unbacked');
  });

  test('keeps the review hold on a queued row instead of 확인 중 (UI-d7fy §5)', () => {
    const result = prStatusBadge({
      auto_pending: true,
      queued: true,
      gate: { reason: 'review_receipt_missing' }
    });

    expect(result).toMatchObject({ label: '최종 변경 리뷰 필요', alert: true });
  });

  test('shows 확인 중 for a queued row whose receipt warning the queue re-checks (UI-kxhf)', () => {
    const result = prStatusBadge({
      auto_pending: true,
      queued: true,
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['unit_plan_mismatch'],
        blocking_codes: ['unit_plan_mismatch']
      }
    });

    expect(result?.label).toBe('확인 중');
  });

  test('keeps the review warning on an unqueued row (UI-kxhf)', () => {
    const result = prStatusBadge({
      auto_pending: false,
      gate: { reason: 'review_receipt_missing' }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
  });

  test('never hides a warning on a queued row the queue gave up on (UI-kxhf)', () => {
    const result = prStatusBadge({
      auto_pending: false,
      queued: true,
      gate: { reason: 'review_receipt_missing' }
    });

    expect(result?.label).not.toBe('확인 중');
  });

  test('carries only the first violation code in the label (UI-17mj §2.4)', () => {
    const result = prStatusBadge({
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['unit_plan_mismatch', 'main_receipt_unbacked'],
        blocking_codes: ['unit_plan_mismatch', 'main_receipt_unbacked']
      }
    });

    expect(result?.label).toBe('영수증 확인 필요 · unit_plan_mismatch');
    expect(result?.title).toContain('unit_plan_mismatch');
    expect(result?.title).toContain('main_receipt_unbacked');
  });

  test('shows no receipt badge for a clean observation', () => {
    const result = prStatusBadge({
      receipt_check: {
        ok: true,
        probe_error: false,
        codes: [],
        blocking_codes: []
      },
      gate: { enabled: true }
    });

    expect(result?.label).toBe('머지 가능');
  });

  test('stays quiet when the receipt observation itself failed', () => {
    const result = prStatusBadge({
      receipt_check: {
        ok: false,
        probe_error: true,
        codes: [],
        blocking_codes: []
      },
      gate: { enabled: true }
    });

    expect(result?.label).toBe('머지 가능');
  });

  test('keeps the review receipt above the execution receipt', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_missing' },
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['dispatch_forged'],
        blocking_codes: ['dispatch_forged']
      }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
  });

  test('keeps a continuation choice above progress and failures', () => {
    const result = prStatusBadge({
      continuation_required: true,
      merge_step: { label: 'squash merge' },
      queue_failure: 'not_in_pr_wait'
    });

    expect(result).toMatchObject({ label: '이어하기 선택 필요', alert: true });
  });

  test('keeps progress above an actionable gate', () => {
    const result = prStatusBadge({
      merge_step: { label: 'squash merge' },
      gate: { reason: 'base_behind' }
    });

    expect(result).toMatchObject({ label: '머지 중', live: true });
  });

  test('keeps an actionable gate above a failure record', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_stale' },
      queue_failure: 'not_in_pr_wait'
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
    expect(result?.title).toContain('not_in_pr_wait');
  });

  test('explains a stale receipt as abnormal history, not a moved head', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_stale' }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
    expect(result?.title).toContain('조상이 아닙니다');
  });

  test('holds an undetermined review verdict with the other three (UI-qksl §4 1번)', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_undetermined' }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
    expect(result?.title).toContain('ancestry probe를 완료하지 못했습니다');
    expect(result?.title).toContain('[리뷰 후 머지]가 이 보류의 출구입니다');
  });

  test('keeps the stale wording to history, not to probe failure', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_stale' }
    });

    expect(result?.title).not.toContain('확인에 실패');
  });

  test('explains a missing receipt without the ancestry wording', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_missing' }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
    expect(result?.title).toContain('리뷰 영수증이 없습니다');
  });

  test('labels an absent spec_id as its own defect, not a review ask', () => {
    const result = prStatusBadge({
      gate: { reason: 'spec_id_missing' }
    });

    expect(result).toMatchObject({ label: '스펙 ID 누락', alert: true });
    expect(result?.title).toContain('bd update --spec-id');
  });

  test('names an absent spec_id in a merge failure record', () => {
    expect(mergeFailureText('spec_id_missing')).toBe('스펙 ID 기록 없음');
  });

  test('keeps a failure record above a waiting position', () => {
    const result = prStatusBadge({
      queue_failure: 'not_in_pr_wait',
      queued: true,
      queue_active: false,
      queue_position: 2
    });

    expect(result).toMatchObject({
      label: '머지 실패 — PR 대기 상태 동기화 실패',
      alert: true
    });
    expect(result?.title).toContain('not_in_pr_wait');
  });

  test('keeps a waiting position above merge eligibility', () => {
    const result = prStatusBadge({
      queued: true,
      queue_active: false,
      queue_position: 3,
      gate: { enabled: true }
    });

    expect(result?.label).toBe('머지 대기 #3');
  });

  test('renders an unmapped failure code verbatim', () => {
    const result = prStatusBadge({ queue_failure: 'brand_new_reason' });

    expect(result?.label).toBe('머지 실패 — brand_new_reason');
    expect(result?.title).toContain('brand_new_reason');
  });
});

describe('완료 레인 최신순 + 기간 필터 (UI-d7pw §3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
    expandDoneLane();
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
   * A transport whose `get-comments` always answers with one session report,
   * so a test can vary the closed issue instead of the comment.
   */
  function sessionReportTransport() {
    return vi.fn().mockResolvedValue([
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

  test('names the selected range in the lane header control', () => {
    window.localStorage.setItem('bdui.worker.done-range', '7d');

    const mount = renderDone(queueOf({ done: [] }));
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector(
        '#worker-pane-done .worker-pane__hd .worker-done-range'
      )
    );

    expect(
      mount.querySelector('#worker-pane-done .worker-pane__title')?.textContent
    ).toBe('완료');
    expect(select.value).toBe('7d');
  });

  test('renders the range select in the pane header control', () => {
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

    select.value = '7d';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(window.localStorage.getItem('bdui.worker.done-range')).toBe('7d');
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

  test('shows the claim-to-close elapsed time on a session row', async () => {
    const now = Date.now();
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'SESSION-TIMED',
        title: '작업시간이 있는 세션 완료',
        status: 'closed',
        created_at: now - 600_000,
        updated_at: now - 1_000,
        started_at: now - 480_000,
        closed_at: now - 60_000,
        comment_count: 1
      }
    ]);

    const mount = renderDone(queueOf(), stores, sessionReportTransport());
    await flush();

    const work = /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="SESSION-TIMED"] .worker-mini__work'
      )
    );
    expect(work.textContent).toContain('작업 7분 0초');
    expect(work.getAttribute('title')).toBe(
      'bead가 in_progress로 잡힌 뒤 닫히기까지의 경과'
    );
  });

  test('omits the work chip when the session row has no started_at', async () => {
    const now = Date.now();
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:closed', [
      {
        id: 'SESSION-UNTIMED',
        title: 'started_at 없는 세션 완료',
        status: 'closed',
        updated_at: now - 1_000,
        closed_at: now - 60_000,
        comment_count: 1
      }
    ]);

    const mount = renderDone(queueOf(), stores, sessionReportTransport());
    await flush();

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="SESSION-UNTIMED"] .worker-mini__work'
      )
    ).toBe(null);
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

  test('renders the summed attempt work time on a done row', () => {
    const mount = renderDone(
      queueOf({
        done: [{ bead_id: 'RD-1', added_at: 1 }],
        attempts: {
          a1: {
            attempt_id: 'a1',
            bead_id: 'RD-1',
            status: 'done',
            started_at: 1_000,
            finished_at: 61_000
          },
          a2: {
            attempt_id: 'a2',
            bead_id: 'RD-1',
            status: 'done',
            started_at: 200_000,
            finished_at: 260_000
          }
        }
      })
    );

    const el = /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="RD-1"] .worker-mini__work'
      )
    );
    expect(el.textContent).toBe('작업 2분 0초');
  });
});

describe('레인 행 생성·수정 시각 (UI-d7pw §4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
    expandDoneLane();
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

describe('worker 직렬 레인 UI (UI-04vo seam E)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {any} over
   */
  function laneQueue(over = {}) {
    return queueOf({
      serial_lane_count: 2,
      serial_lanes: [
        { id: 's1', entries: [] },
        { id: 's2', entries: [] }
      ],
      lane_states: {
        s1: { occupied_by: [], order: [], corrections: [], cycle: false },
        s2: { occupied_by: [], order: [], corrections: [], cycle: false }
      },
      ...over
    });
  }

  /**
   * @param {string} action_id
   * @returns {Record<string, any>}
   */
  function staleAdmission(action_id) {
    return {
      reason: 'worktree_stale_work',
      at: 1,
      stale_work: {
        state: 'unique',
        cause: 'dirty_unique',
        summary: {
          staged_count: 1,
          unstaged_count: 0,
          untracked_count: 0,
          branch_ahead: 0,
          head_ahead: 0
        },
        action_id,
        can_resume: false,
        can_continue: true,
        can_backup_fresh: true,
        can_recheck: true
      }
    };
  }

  /**
   * @param {Record<string, any>} patch
   * @returns {{ mount: HTMLElement, transport: ReturnType<typeof vi.fn> }}
   */
  function mountStaleSerialPath(patch) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const transport = vi.fn(async () => ({
      ok: true,
      conflict: false,
      queue: queueStore.get()
    }));
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport
    });
    queueStore.set(laneQueue({ revision: 17, ...patch }));
    return { mount, transport };
  }

  /**
   * @returns {Record<string, any>}
   */
  function waitingStalePath() {
    return {
      attempts: {
        x1: {
          attempt_id: 'x1',
          bead_id: 'X',
          status: 'waiting',
          serial_lane_id: 's1',
          finished_at: 10,
          cause: 'prerequisite_unmet',
          cause_detail: {
            summary: '선행 미충족으로 착수하지 않았습니다',
            blockers: [{ id: 'A-9', rig: null, status: 'open' }]
          }
        }
      },
      admission: { X: staleAdmission('waiting-action') },
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'X', added_at: 1 }] },
        { id: 's2', entries: [] }
      ],
      lane_states: {
        s1: {
          occupied_by: [],
          order: ['X'],
          corrections: [],
          cycle: false
        },
        s2: { occupied_by: [], order: [], corrections: [], cycle: false }
      }
    };
  }

  /**
   * @returns {Record<string, any>}
   */
  function failedStalePath() {
    return {
      attempts: {
        x1: {
          attempt_id: 'x1',
          bead_id: 'X',
          status: 'failed',
          serial_lane_id: 's1',
          finished_at: 10,
          dismissed_at: 20
        }
      },
      admission: { X: staleAdmission('failed-action') },
      serial_lanes: [
        { id: 's1', entries: [{ bead_id: 'X', added_at: 1 }] },
        { id: 's2', entries: [] }
      ],
      lane_states: {
        s1: {
          occupied_by: ['X'],
          order: ['X'],
          corrections: [],
          cycle: false
        },
        s2: { occupied_by: [], order: [], corrections: [], cycle: false }
      }
    };
  }

  test('renders stale-work actions on a demoted waiting row', () => {
    const { mount } = mountStaleSerialPath(waitingStalePath());

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s1 [data-bead-id="X"]')
    );

    expect(
      Array.from(
        row.querySelectorAll(
          '.worker-mini__stale-continue, .worker-mini__stale-backup, .worker-mini__stale-recheck'
        )
      ).map((button) => button.getAttribute('data-action-id'))
    ).toEqual(['waiting-action', 'waiting-action', 'waiting-action']);
  });

  test('sends the waiting-row continue action with identity and revision', async () => {
    const { mount, transport } = mountStaleSerialPath(waitingStalePath());
    const button = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini__stale-continue')
    );

    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-stale-work-continue', {
      bead_id: 'X',
      action_id: 'waiting-action',
      expected_revision: 17
    });
  });

  test('keeps the demoted waiting row undraggable', () => {
    const { mount } = mountStaleSerialPath(waitingStalePath());

    const row = mount.querySelector(
      '#worker-pane-lane-s1 .worker-mini[data-bead-id="X"]'
    );

    expect(row?.getAttribute('draggable')).toBe('false');
  });

  test('renders stale-work actions instead of a ghost on a demoted failed row', () => {
    const { mount } = mountStaleSerialPath(failedStalePath());

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s1 [data-bead-id="X"]')
    );

    expect(row.classList.contains('worker-mini--ghost')).toBe(false);
    expect(
      Array.from(
        row.querySelectorAll(
          '.worker-mini__stale-continue, .worker-mini__stale-backup, .worker-mini__stale-recheck'
        )
      ).map((button) => button.getAttribute('data-action-id'))
    ).toEqual(['failed-action', 'failed-action', 'failed-action']);
  });

  test('sends the failed-row recheck action with identity and revision', async () => {
    const { mount, transport } = mountStaleSerialPath(failedStalePath());
    const button = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini__stale-recheck')
    );

    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-stale-work-recheck', {
      bead_id: 'X',
      action_id: 'failed-action',
      expected_revision: 17
    });
  });

  test('puts the held occupancy badge first on a demoted failed row', () => {
    const { mount } = mountStaleSerialPath(failedStalePath());

    const first_badge = mount.querySelector(
      '#worker-pane-lane-s1 [data-bead-id="X"] .worker-mini__badge'
    );

    expect(first_badge?.textContent).toBe('실패 · 점유 유지');
  });

  test('renders serial lane cards with rows and an empty drop target', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport: vi.fn()
    });

    queueStore.set(
      laneQueue({
        serial_lanes: [
          { id: 's1', entries: [{ bead_id: 'A', added_at: 1 }] },
          { id: 's2', entries: [] }
        ],
        lane_states: {
          s1: { occupied_by: [], order: ['A'], corrections: [], cycle: false },
          s2: { occupied_by: [], order: [], corrections: [], cycle: false }
        }
      })
    );

    const s1 = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s1')
    );
    expect(s1).not.toBeNull();
    expect(
      s1.querySelector('.worker-mini[data-bead-id="A"][data-lane="s1"]')
    ).not.toBeNull();
    const s2 = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s2')
    );
    expect(s2?.textContent).toContain('비어 있음');
  });

  test('drags a parallel row into a serial lane through worker-queue-place', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const transport = vi.fn(async () => reply(laneQueue()));
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport
    });
    queueStore.set(laneQueue({ queue: [{ bead_id: 'A', added_at: 1 }] }));

    drag(mount, 'A', 'worker-pane-lane-s1');
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-place',
      expect.objectContaining({ bead_id: 'A', lane: 's1' })
    );
  });

  test('reorders within a serial lane through worker-queue-reorder', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const transport = vi.fn(async () => reply(laneQueue()));
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport
    });
    queueStore.set(
      laneQueue({
        serial_lanes: [
          {
            id: 's1',
            entries: [
              { bead_id: 'A', added_at: 1 },
              { bead_id: 'B', added_at: 2 }
            ]
          },
          { id: 's2', entries: [] }
        ],
        lane_states: {
          s1: {
            occupied_by: [],
            order: ['A', 'B'],
            corrections: [],
            cycle: false
          },
          s2: { occupied_by: [], order: [], corrections: [], cycle: false }
        }
      })
    );

    drag(mount, 'A', 'worker-pane-lane-s1');
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-reorder',
      expect.objectContaining({ bead_id: 'A', lane: 's1' })
    );
  });

  test('renders occupancy ghost row and badge for a held lane', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport: vi.fn()
    });

    queueStore.set(
      laneQueue({
        attempts: {
          x1: {
            attempt_id: 'x1',
            bead_id: 'X',
            status: 'failed',
            serial_lane_id: 's1'
          }
        },
        serial_lanes: [
          { id: 's1', entries: [{ bead_id: 'B', added_at: 1 }] },
          { id: 's2', entries: [] }
        ],
        lane_states: {
          s1: {
            occupied_by: ['X'],
            order: ['B'],
            corrections: [],
            cycle: false
          },
          s2: { occupied_by: [], order: [], corrections: [], cycle: false }
        }
      })
    );

    const s1 = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s1')
    );
    expect(s1.textContent).toContain('실패 · 점유 유지');
    expect(
      s1.querySelector('.worker-mini--ghost[data-bead-id="X"]')
    ).not.toBeNull();
  });

  test('draws a held bead once when it is still the lane head', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport: vi.fn()
    });

    queueStore.set(
      laneQueue({
        attempts: {
          x1: {
            attempt_id: 'x1',
            bead_id: 'X',
            status: 'failed',
            serial_lane_id: 's1',
            finished_at: 10,
            // ✕로 닫힌 실패: 실행중 타일에서는 빠지지만 레인 점유는 유지된다.
            dismissed_at: 20
          }
        },
        serial_lanes: [
          {
            id: 's1',
            entries: [
              { bead_id: 'X', added_at: 1 },
              { bead_id: 'B', added_at: 2 }
            ]
          },
          { id: 's2', entries: [] }
        ],
        lane_states: {
          s1: {
            occupied_by: ['X'],
            order: ['X', 'B'],
            corrections: [],
            cycle: false
          },
          s2: { occupied_by: [], order: [], corrections: [], cycle: false }
        }
      })
    );

    const s1 = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s1')
    );

    expect(s1.querySelectorAll('[data-bead-id="X"]').length).toEqual(1);
    expect(
      s1.querySelector('.worker-mini--ghost[data-bead-id="X"]')
    ).not.toBeNull();
    expect(s1.querySelector('[data-bead-id="B"]')).not.toBeNull();
  });

  test('renders the serial lane count dropdown and sends the mutation', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const transport = vi.fn(async () => reply(laneQueue()));
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport
    });
    queueStore.set(laneQueue());

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.worker-serial-lane-count')
    );
    expect(select).not.toBeNull();
    select.value = '3';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-serial-lane-count',
      expect.objectContaining({ count: 3 })
    );
  });

  test('renders correction chip and cycle warning from lane_states', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport: vi.fn()
    });

    queueStore.set(
      laneQueue({
        serial_lanes: [
          {
            id: 's1',
            entries: [
              { bead_id: 'A', added_at: 1 },
              { bead_id: 'B', added_at: 2 }
            ]
          },
          { id: 's2', entries: [{ bead_id: 'C', added_at: 3 }] }
        ],
        lane_states: {
          s1: {
            occupied_by: [],
            order: ['A', 'B'],
            corrections: [{ bead_id: 'B', after: 'A' }],
            cycle: false
          },
          s2: { occupied_by: [], order: ['C'], corrections: [], cycle: true }
        }
      })
    );

    const row_b = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="B"]')
    );
    expect(row_b.textContent).toContain('🔗 A 뒤');
    const s2 = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s2')?.closest('.worker-wait__lane')
    );
    expect(s2.textContent).toContain('순환');
  });

  /**
   * A blocked serial head: the server skipped it as `not_ready` and the
   * snapshot names its blocker.
   *
   * @returns {HTMLElement}
   */
  function mountBlockedSerialHead() {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport: vi.fn()
    });

    queueStore.set(
      laneQueue({
        admission: { A: { reason: 'not_ready:open', at: 1 } },
        bead_blocked_by: { A: ['UI-x'] },
        serial_lanes: [
          { id: 's1', entries: [{ bead_id: 'A', added_at: 1 }] },
          { id: 's2', entries: [] }
        ],
        lane_states: {
          s1: { occupied_by: [], order: ['A'], corrections: [], cycle: false },
          s2: { occupied_by: [], order: [], corrections: [], cycle: false }
        }
      })
    );
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="A"]')
    );
  }

  test('names the blocker of a blocked serial head on a blocked chip', () => {
    const row = mountBlockedSerialHead();

    expect(row.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ UI-x'
    );
  });

  test('retires the 완료 대기 wait badge from the blocked row', () => {
    const row = mountBlockedSerialHead();

    expect(row.textContent).not.toContain('완료 대기');
  });

  test('keeps the not_ready admission reason on the blocked row', () => {
    const row = mountBlockedSerialHead();

    expect(row.textContent).toContain('⛔ not_ready');
  });

  test('retires the bulk selection and pr-wait-hold surfaces', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport: vi.fn()
    });
    queueStore.set(laneQueue({ queue: [{ bead_id: 'A', added_at: 1 }] }));

    expect(mount.querySelector('.worker-mini__select')).toBeNull();
    expect(mount.querySelector('.worker-bulk')).toBeNull();
    expect(mount.querySelector('.worker-pr-wait-hold')).toBeNull();
  });

  test('cancels a drag that starts on an interactive row child', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const transport = vi.fn();
    createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport
    });
    queueStore.set(
      laneQueue({
        queue: [{ bead_id: 'A', added_at: 1 }],
        revise_parked: { A: { notes_tail: 'finding' } }
      })
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
      mount.querySelector('.worker-mini[data-bead-id="A"]')
    );
    const button = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__revise-fix')
    );
    button.dispatchEvent(new Event('pointerdown', { bubbles: true }));
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
});

describe('worker 실행 설정 칩 · child rollup (worker-card-exec-chips)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /** The `execution_defaults` projection every live snapshot carries. */
  const PROJECTION = {
    supported: true,
    schema_version: 1,
    session: {
      workflow_mode_default: 'standard',
      review: {
        default: 'codex',
        reviewers: {
          codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
          fable: { model: 'fable', effort: 'high' }
        }
      },
      implementation: {
        default: {
          dispatch: 'delegated',
          runtime: 'inherit',
          model: 'auto',
          effort: 'auto',
          speed: 'default'
        },
        route_defaults: { quick_fix: { dispatch: 'main' } },
        model_catalog: {
          claude: ['opus', 'fable'],
          codex: { sol: 'gpt-5.6-sol', terra: 'gpt-5.6-terra' }
        }
      }
    },
    orchestration: {
      runtime: 'claude',
      model: 'opus',
      model_id: 'opus',
      effort: null,
      speed: 'default'
    }
  };

  /**
   * @param {Partial<any>} [over]
   * @returns {any}
   */
  function execQueue(over = {}) {
    return queueOf({ execution_defaults: PROJECTION, ...over });
  }

  /**
   * A transport that answers `get-session-defaults` with `values` and records
   * every request type it saw.
   *
   * @param {Record<string, string>} values
   */
  function sessionDefaultsTransport(values) {
    /** @type {string[]} */
    const types = [];
    const send = vi.fn(async (/** @type {string} */ type) => {
      types.push(type);
      return type === 'get-session-defaults' ? { values, warnings: [] } : null;
    });
    return { types, send };
  }

  /**
   * @param {string[]} types
   * @returns {number}
   */
  function defaultsCalls(types) {
    return types.filter((type) => type === 'get-session-defaults').length;
  }

  test('asks for the workspace session defaults once per load', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { types, send } = sessionDefaultsTransport({});

    const view = createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    view.load();
    await flush();

    expect(defaultsCalls(types)).toBe(1);
  });

  test('asks again after refreshSessionDefaults', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { types, send } = sessionDefaultsTransport({});
    const view = createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    await flush();

    view.refreshSessionDefaults();
    await flush();

    expect(defaultsCalls(types)).toBe(2);
  });

  test('asks again when the workspace path changes', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { types, send } = sessionDefaultsTransport({});
    let workspace = '/repo-a';
    const view = createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: send,
      getWorkspacePath: () => workspace
    });
    view.load();
    await flush();

    workspace = '/repo-b';
    view.load();
    await flush();

    expect(defaultsCalls(types)).toBe(2);
  });

  test('discards a late reply from the previous workspace and re-asks', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    /** @type {Array<(value: any) => void>} */
    const resolvers = [];
    /** @type {string[]} */
    const types = [];
    const send = vi.fn((/** @type {string} */ type) => {
      types.push(type);
      if (type !== 'get-session-defaults') {
        return Promise.resolve(null);
      }
      return new Promise((resolve) => resolvers.push(resolve));
    });
    let workspace = '/repo-a';
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'RD-1', title: 'ready', status: 'open', metadata: {} }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(execQueue({ queue: [{ bead_id: 'RD-1', added_at: 1 }] }));
    const view = createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: send,
      getWorkspacePath: () => workspace
    });
    view.load();
    await flush();

    workspace = '/repo-b';
    view.load();
    await flush();
    resolvers[0]({ values: { impl_runtime: 'codex' }, warnings: [] });
    await flush();

    expect(defaultsCalls(types)).toBe(2);
    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="RD-1"] .exec-chip--worker .exec-chip__v'
      )?.textContent
    ).not.toContain('codex');
  });

  test('re-asks when a refresh overlaps an in-flight request', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    /** @type {Array<(value: any) => void>} */
    const resolvers = [];
    /** @type {string[]} */
    const types = [];
    const send = vi.fn((/** @type {string} */ type) => {
      types.push(type);
      if (type !== 'get-session-defaults') {
        return Promise.resolve(null);
      }
      return new Promise((resolve) => resolvers.push(resolve));
    });
    const view = createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    await flush();

    view.refreshSessionDefaults();
    await flush();
    resolvers[0]({ values: { impl_runtime: 'codex' }, warnings: [] });
    await flush();

    expect(defaultsCalls(types)).toBe(2);
  });

  test('renders the chips without a global layer when the request fails', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const send = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-session-defaults') {
        throw new Error('kv unreadable');
      }
      return null;
    });
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'RD-1', title: 'ready', status: 'open', metadata: {} }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(execQueue({ queue: [{ bead_id: 'RD-1', added_at: 1 }] }));

    const view = createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    await flush();

    const chip = /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="RD-1"] .exec-chip--worker'
      )
    );
    expect(chip.querySelector('.exec-chip__v')?.textContent).toBe(
      'inherit→claude · auto · auto'
    );
    expect(chip.getAttribute('title')).toContain(
      '위임 대상: inherit (claude) (기본)'
    );
    expect(chip.getAttribute('title')).not.toContain('(전역)');
  });

  test('drops the global layer on screen when a refresh request fails', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    let fail = false;
    const send = vi.fn(async (/** @type {string} */ type) => {
      if (type !== 'get-session-defaults') {
        return null;
      }
      if (fail) {
        throw new Error('kv unreadable');
      }
      return { values: { impl_runtime: 'codex' }, warnings: [] };
    });
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'RD-1', title: 'ready', status: 'open', metadata: {} }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(execQueue({ queue: [{ bead_id: 'RD-1', added_at: 1 }] }));
    const view = createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    await flush();
    const selector = '.worker-mini[data-bead-id="RD-1"] .exec-chip--worker';
    expect(mount.querySelector(selector)?.getAttribute('title')).toContain(
      '(전역)'
    );

    fail = true;
    view.refreshSessionDefaults();
    await flush();

    expect(mount.querySelector(selector)?.getAttribute('title')).not.toContain(
      '(전역)'
    );
  });

  test('reads a derived quick_fix route as a 메인 worker chip', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { send } = sessionDefaultsTransport({});
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'QF-1',
        title: 'quick fix',
        status: 'open',
        metadata: {},
        workflow: { route: 'quick_fix', route_source: 'derived' }
      }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(execQueue({ queue: [{ bead_id: 'QF-1', added_at: 1 }] }));

    const view = createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    await flush();

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="QF-1"] .exec-chip--worker .exec-chip__v'
      )?.textContent
    ).toBe('메인');
  });

  test('layers the pin over the global kv over the base default', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { send } = sessionDefaultsTransport({
      impl_runtime: 'codex',
      impl_effort: 'high'
    });
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'RD-1',
        title: 'ready',
        status: 'open',
        metadata: { impl_effort: 'low' }
      }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(execQueue({ queue: [{ bead_id: 'RD-1', added_at: 1 }] }));

    const view = createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    await flush();

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="RD-1"] .exec-chip--worker .exec-chip__v'
      )?.textContent
    ).toBe('codex · auto · low');
  });

  test('omits the chips for a bead that is in no subscribed column', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { send } = sessionDefaultsTransport({});
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      execQueue({
        queue: [{ bead_id: 'GONE-1', added_at: 1 }],
        bead_titles: { 'GONE-1': 'unsubscribed bead' }
      })
    );

    const view = createWorkerView(mount, {
      issueStores: createTestIssueStores(),
      queueStore,
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    await flush();

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="GONE-1"]')
    );
    expect(row.querySelector('.worker-chips .exec-chip')).toBeNull();
  });

  test('gives a serial-lane ghost row no exec chips', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const { send } = sessionDefaultsTransport({});
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      { id: 'RD-1', title: 'ready', status: 'open', metadata: {} }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      execQueue({
        serial_lanes: [{ id: 's1', entries: [] }],
        lane_states: { s1: { occupied_by: ['RD-1'], order: [] } }
      })
    );

    const view = createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: send,
      getWorkspacePath: () => '/repo-a'
    });
    view.load();
    await flush();

    const ghost = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini--ghost[data-bead-id="RD-1"]')
    );
    expect(ghost.querySelector('.worker-chips .exec-chip')).toBeNull();
  });

  test('counts resolved children in the running tile rollup', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = seedCandidates();
    seed(stores, 'tab:worker:in-progress', [
      { id: 'S1.2', title: 'T2', status: 'in_progress', parent: 'S1' }
    ]);
    seed(stores, 'tab:worker:resolved', [
      { id: 'S1.1', title: 'T1', status: 'resolved', parent: 'S1' }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      execQueue({
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
      issueStores: stores,
      queueStore,
      transport: vi.fn()
    });

    expect(
      mount.querySelector('.rtile[data-bead-id="S1"] .board-card__roll-toggle')
        ?.textContent
    ).toContain('children 1/2');
  });

  test('toggles the tile rollup instead of opening the parent detail', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = seedCandidates();
    seed(stores, 'tab:worker:in-progress', [
      { id: 'S1.1', title: 'T1', status: 'in_progress', parent: 'S1' }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      execQueue({
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
    const gotoIssue = vi.fn();
    createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: vi.fn(),
      gotoIssue
    });

    /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .board-card__roll-toggle')
    ).click();

    expect(gotoIssue).not.toHaveBeenCalled();
    expect(
      mount.querySelectorAll(
        '.rtile[data-bead-id="S1"] .board-card__roll-child'
      )
    ).toHaveLength(1);
  });

  test('opens the child issue from a tile rollup child row', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = seedCandidates();
    seed(stores, 'tab:worker:in-progress', [
      { id: 'S1.1', title: 'T1', status: 'in_progress', parent: 'S1' }
    ]);
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      execQueue({
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
    const gotoIssue = vi.fn();
    createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: vi.fn(),
      gotoIssue
    });
    /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .board-card__roll-toggle')
    ).click();

    /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="S1"] .board-card__roll-child')
    ).click();

    expect(gotoIssue).toHaveBeenCalledWith('S1.1');
  });
});

describe('worker 탭 scope 겹침 칩 (UI-jbao)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * Two parallel waiting rows plus one s1 row, all three declaring scope.
   *
   * @param {any} [over]
   * @returns {any}
   */
  function overlapQueue(over = {}) {
    return queueOf({
      revision: 3,
      queue: [
        { bead_id: 'W-1', added_at: 1 },
        { bead_id: 'W-2', added_at: 2 }
      ],
      serial_lane_count: 2,
      serial_lanes: [{ id: 's1', entries: [{ bead_id: 'S-1', added_at: 1 }] }],
      lane_states: {
        s1: { occupied_by: [], order: ['S-1'], corrections: [], cycle: false }
      },
      bead_scope: {
        'W-1': { scope: ['app/views/worker'], artifacts: ['w1.md'] },
        'W-2': {
          scope: ['app/views/worker/lanes.js'],
          artifacts: ['w2.md']
        },
        'S-1': { scope: ['server/ws'], artifacts: ['s1.md'] }
      },
      ...over
    });
  }

  /**
   * @param {any} transport
   * @param {any} [queue]
   * @returns {HTMLElement}
   */
  function mountWithOverlaps(transport, queue = overlapQueue()) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport
    });
    queueStore.set(queue);
    return mount;
  }

  test('draws a 겹침 chip on both waiting rows that declare colliding scope', () => {
    const mount = mountWithOverlaps(vi.fn());

    const w1 = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );
    const w2 = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-2"]')
    );

    expect(w1.querySelector('.worker-dep--overlap')?.textContent).toContain(
      'W-2'
    );
    expect(w2.querySelector('.worker-dep--overlap')?.textContent).toContain(
      'W-1'
    );
  });

  test('draws no 겹침 chip on a row whose scope does not collide', () => {
    const mount = mountWithOverlaps(vi.fn());

    const s1 = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="S-1"]')
    );

    expect(s1.querySelector('.worker-dep--overlap')).toBe(null);
  });

  test('draws nothing on an old snapshot without bead_scope', () => {
    const mount = mountWithOverlaps(
      vi.fn(),
      overlapQueue({ bead_scope: undefined })
    );

    expect(mount.querySelector('.worker-dep--overlap')).toBe(null);
  });

  test('marks a declared-empty scope as 판정 불가 rather than 겹침 없음', () => {
    const mount = mountWithOverlaps(
      vi.fn(),
      overlapQueue({
        bead_scope: {
          'W-1': { scope: [], artifacts: ['w1.md'] }
        }
      })
    );

    const w1 = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );
    expect(w1.querySelector('.worker-dep--muted')?.textContent).toContain(
      'scope 없음'
    );
  });

  test('keeps the overlapping paths in the chip tooltip (UI-8x90 §4.2)', () => {
    const mount = mountWithOverlaps(vi.fn());

    const chip = /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="W-1"] .worker-dep--overlap'
      )
    );

    expect(chip.title).toContain('겹침 · ');
    expect(chip.title).toContain('app/views/worker/lanes.js');
  });

  test('opens the counterpart issue on a 겹침 chip click (UI-8x90 §4.3)', () => {
    const gotoIssue = vi.fn();
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn(),
      gotoIssue
    });
    queueStore.set(overlapQueue());

    /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="W-1"] .worker-dep--overlap'
      )
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(gotoIssue).toHaveBeenCalledWith('W-2');
  });

  test('draws the 겹침 chip on a running tile and scope 없음 there too', () => {
    const mount = mountWithOverlaps(
      vi.fn(),
      overlapQueue({
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'W-1',
            status: 'running',
            runner: 'claude',
            started_at: Date.now(),
            session_id: 'sid-1'
          }
        },
        bead_scope: {
          'W-1': { scope: [], artifacts: ['w1.md'] },
          'W-2': { scope: ['app/views/worker/lanes.js'], artifacts: ['w2.md'] },
          'S-1': { scope: ['app/views/worker'], artifacts: ['s1.md'] }
        }
      })
    );

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="W-1"]')
    );
    const s1 = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="S-1"]')
    );

    expect(tile).not.toBe(null);
    // 실행 중 타일도 `scope 없음`을 얻는다 (UI-anna §6): 레인별 억제를 없앴다.
    expect(tile.querySelector('.worker-dep--muted')?.textContent).toContain(
      'scope 없음'
    );
    expect(s1.querySelector('.worker-dep--overlap')?.textContent).toContain(
      'W-2'
    );
  });

  test('a running tile with declared colliding scope gets the 겹침 chip', () => {
    const mount = mountWithOverlaps(
      vi.fn(),
      overlapQueue({
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'W-1',
            status: 'running',
            runner: 'claude',
            started_at: Date.now(),
            session_id: 'sid-1'
          }
        }
      })
    );

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="W-1"]')
    );

    expect(tile.querySelector('.worker-dep--overlap')?.textContent).toContain(
      'W-2'
    );
  });

  test('draws the 겹침 chip on a 후보 card colliding with a waiting row', () => {
    const mount = mountWithOverlaps(
      vi.fn(),
      overlapQueue({
        bead_scope: {
          'W-1': { scope: ['app/views/worker'], artifacts: ['w1.md'] },
          'RD-1': {
            scope: ['app/views/worker/lanes.js'],
            artifacts: ['rd1.md']
          }
        }
      })
    );

    const rd1 = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="RD-1"]')
    );
    const w1 = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );

    expect(rd1.querySelector('.worker-dep--overlap')?.textContent).toContain(
      'W-1'
    );
    expect(
      w1.querySelector('.worker-dep--overlap')?.getAttribute('title')
    ).toContain('후보');
  });

  test('draws no 겹침 chip on a 후보 card the filter hides', () => {
    presetCandidateFilter({ show_blocked: false });
    const mount = mountWithOverlaps(
      vi.fn(),
      overlapQueue({
        bead_scope: {
          'W-1': { scope: ['app/views/worker'], artifacts: ['w1.md'] },
          'BL-1': {
            scope: ['app/views/worker/lanes.js'],
            artifacts: ['bl1.md']
          }
        }
      })
    );

    const w1 = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );

    expect(mount.querySelector('.worker-card[data-bead-id="BL-1"]')).toBe(null);
    expect(w1.querySelector('.worker-dep--overlap')).toBe(null);
  });
});

describe('worker 탭 blocked 칩 (UI-anna §5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} queue
   * @param {any} [stores]
   * @returns {HTMLElement}
   */
  function mountQueue(queue, stores = seedCandidates()) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: vi.fn()
    });
    queueStore.set(queue);
    return mount;
  }

  /**
   * A running attempt tile for `bead_id`.
   *
   * @param {string} bead_id
   * @returns {any}
   */
  function runningAttempt(bead_id) {
    return {
      'att-1': {
        attempt_id: 'att-1',
        bead_id,
        status: 'running',
        runner: 'claude',
        started_at: Date.now(),
        session_id: 'sid-1'
      }
    };
  }

  test('draws a blocked chip on a waiting row from the queue decoration', () => {
    const mount = mountQueue(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['UI-x'] }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );
    expect(row.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ 외부/UI-x'
    );
  });

  test('draws a blocked chip on a 후보 card from its own blocked_info ladder', () => {
    presetCandidateFilter({ show_blocked: true });
    const mount = mountQueue(queueOf({}));

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="BL-1"]')
    );
    expect(card.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ 외부/DEP-9'
    );
  });

  test('draws a blocked chip on a session running tile from session_active', () => {
    const mount = mountQueue(
      queueOf({
        session_active: [
          {
            bead_id: 'SS-1',
            title: '세션이 잡은 이슈',
            status: 'in_progress',
            blocked: true,
            blocked_by: ['UI-x']
          }
        ]
      })
    );

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="SS-1"]')
    );
    expect(tile.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ 외부/UI-x'
    );
  });

  test('lets an empty queue decoration override the 후보 ladder', () => {
    presetCandidateFilter({ show_blocked: true });
    const mount = mountQueue(queueOf({ bead_blocked_by: { 'BL-1': [] } }));

    const card = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="BL-1"]')
    );
    expect(card.querySelector('.worker-dep--pred')).toBe(null);
  });

  test('names a waiting blocker by its lane position in the chip tooltip', () => {
    const mount = mountQueue(
      queueOf({
        queue: [
          { bead_id: 'W-0', added_at: 1 },
          { bead_id: 'W-1', added_at: 2 }
        ],
        bead_blocked_by: { 'W-1': ['W-0'] }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );
    expect(row.querySelector('.worker-dep--pred')?.getAttribute('title')).toBe(
      '⛓ W-0 — 선행 — close될 때까지 출발하지 않는다 (#1)'
    );
  });

  test('keeps a PR 대기 blocker seat while its review session runs', () => {
    const mount = mountQueue(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        pr_wait: [{ bead_id: 'W-0', added_at: 1 }],
        // 비점유 리뷰 세션 타일 (UI-d7fy §5.5): 같은 bead가 PR 대기에도 서 있다.
        attempts: {
          rev: {
            attempt_id: 'rev',
            bead_id: 'W-0',
            kind: 'review_session',
            status: 'running',
            started_at: 1
          }
        },
        bead_blocked_by: { 'W-1': ['W-0'] }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );
    expect(row.querySelector('.worker-dep--pred')?.getAttribute('title')).toBe(
      '⛓ W-0 — 선행 — close될 때까지 출발하지 않는다 (PR 대기)'
    );
  });

  test('folds a blocker this tab cannot see into 미적재', () => {
    const mount = mountQueue(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['W-9'] }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );
    expect(row.querySelector('.worker-dep--pred')?.getAttribute('title')).toBe(
      '⛓ W-9 — 선행 — close될 때까지 출발하지 않는다 (미적재)'
    );
  });

  test('draws a foreign blocker of unknown owner as display-only', () => {
    const mount = mountQueue(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['UI-x'] }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="W-1"]')
    );
    expect(row.querySelector('.worker-dep__open')).toBeNull();
  });

  test('draws a blocked chip on a running attempt tile', () => {
    const mount = mountQueue(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        attempts: runningAttempt('W-1'),
        bead_blocked_by: { 'W-1': ['UI-x'] }
      })
    );

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="W-1"]')
    );
    expect(tile.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ 외부/UI-x'
    );
  });

  test('draws no chip on a running tile the snapshot names no blocker for', () => {
    const mount = mountQueue(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        attempts: runningAttempt('W-1'),
        bead_blocked_by: {}
      })
    );

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="W-1"]')
    );
    expect(tile.querySelector('.worker-dep--pred')).toBeNull();
  });

  test('draws all three chips on a PR 대기 row', () => {
    const mount = mountQueue(
      queueOf({
        pr_wait: [{ bead_id: 'P-1', added_at: 1 }],
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'P-1': ['UI-x'] },
        bead_scope: {
          'P-1': { scope: ['app/views'], artifacts: ['p1.md'] },
          'W-1': { scope: ['app/views/worker/lanes.js'], artifacts: ['w1.md'] }
        }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-pr-wait .worker-mini[data-bead-id="P-1"]'
      )
    );
    expect(row.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ 외부/UI-x'
    );
    expect(row.querySelector('.worker-dep--overlap')?.textContent).toContain(
      'W-1'
    );
  });

  test('draws the scope 없음 chip on a PR 대기 row', () => {
    const mount = mountQueue(
      queueOf({
        pr_wait: [{ bead_id: 'P-1', added_at: 1 }],
        bead_scope: { 'P-1': { scope: [], artifacts: ['p1.md'] } }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-pr-wait .worker-mini[data-bead-id="P-1"]'
      )
    );
    expect(row.querySelector('.worker-dep--muted')?.textContent).toContain(
      'scope 없음'
    );
  });

  test('names a PR 대기 counterpart as PR 대기 on the waiting row 겹침 chip', () => {
    const mount = mountQueue(
      queueOf({
        pr_wait: [{ bead_id: 'P-1', added_at: 1 }],
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_scope: {
          'P-1': { scope: ['app/views'], artifacts: ['p1.md'] },
          'W-1': { scope: ['app/views/worker/lanes.js'], artifacts: ['w1.md'] }
        }
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue .worker-mini[data-bead-id="W-1"]')
    );
    expect(
      row.querySelector('.worker-dep--overlap')?.getAttribute('title')
    ).toContain('PR 대기');
  });

  test('gives a running tile with only a blocker its overlay chip', () => {
    const mount = mountQueue(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        attempts: runningAttempt('W-1'),
        bead_blocked_by: { 'W-1': ['UI-x'] },
        bead_scope: {}
      })
    );

    const tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="W-1"]')
    );
    expect(tile.querySelector('.worker-deps')).not.toBeNull();
  });
});

describe('판정 칩 사유 팝업 (UI-8x90 §4.5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * One candidate carrying the `복잡` judgement.
   *
   * @param {{ gotoIssue?: any }} [handlers]
   * @returns {HTMLElement}
   */
  function mountJudgement(handlers = {}) {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'REC-1',
        title: '복잡 후보',
        status: 'open',
        created_at: 100,
        spec_id: 'S',
        metadata: {
          route: 'spec_backed',
          spec_review: RECEIPT,
          rec_orchestration_model: 'fable',
          rec_reason: 'invariant_reasoning'
        }
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: stores,
      queueStore: createWorkerQueueStore(),
      transport: vi.fn(),
      ...handlers
    });
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @returns {HTMLElement}
   */
  function recChip(mount) {
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="REC-1"] .judgement-chip')
    );
  }

  test('opens the 사유 popup on a judgement chip click', () => {
    const mount = mountJudgement();

    recChip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.chip-popover')?.getAttribute('role')).toBe(
      'dialog'
    );
  });

  test('names the 사유 sentence in the popup body (UI-8x90 §4.6)', () => {
    const mount = mountJudgement();

    recChip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.chip-popover')?.textContent).toContain(
      '정합성이 상태기계·동시성·불변식 추론에 달려 있다'
    );
  });

  test('does not open the issue detail on that click', () => {
    const gotoIssue = vi.fn();
    const mount = mountJudgement({ gotoIssue });

    recChip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('closes the popup on a second click of the same chip', () => {
    const mount = mountJudgement();
    recChip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    recChip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.chip-popover')).toBeNull();
  });

  test('closes the popup on Escape', () => {
    const mount = mountJudgement();
    recChip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(mount.querySelector('.chip-popover')).toBeNull();
  });
});

describe('worker 탭 blocked 칩 열기 (UI-u6zf §5)', () => {
  const CURRENT_WS = '/repos/worker';
  const OTHER_WS = '/repos/beads-ui';

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} queue
   * @param {{ gotoIssue: any, switchWorkspace?: any }} handlers
   * @returns {HTMLElement}
   */
  function mountWithHandlers(queue, handlers) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn(),
      getWorkspacePath: () => CURRENT_WS,
      ...handlers
    });
    queueStore.set(queue);
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} bead_id
   * @returns {HTMLElement|null}
   */
  function chipOf(mount, bead_id) {
    return mount.querySelector(
      `.worker-mini[data-bead-id="${bead_id}"] .worker-dep__open`
    );
  }

  test('opens a 후속 issue from the same button (UI-8x90 §4.3)', () => {
    const gotoIssue = vi.fn();
    const mount = mountWithHandlers(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_dependents: { 'W-1': { ids: ['W-8'] } }
      }),
      { gotoIssue }
    );

    /** @type {HTMLElement|null} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="W-1"] .worker-dep--dependents'
      )
    )?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(gotoIssue.mock.calls).toEqual([['W-8']]);
  });

  test('draws an open button on a same-repo blocker', () => {
    const mount = mountWithHandlers(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['W-9'] }
      }),
      { gotoIssue: vi.fn() }
    );

    expect(chipOf(mount, 'W-1')?.getAttribute('data-dep-id')).toBe('W-9');
  });

  test('opens a same-repo blocker without switching workspace', () => {
    const gotoIssue = vi.fn();
    const switchWorkspace = vi.fn(async () => {});
    const mount = mountWithHandlers(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['W-9'] }
      }),
      { gotoIssue, switchWorkspace }
    );

    chipOf(mount, 'W-1')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(switchWorkspace).not.toHaveBeenCalled();
    expect(gotoIssue.mock.calls).toEqual([['W-9']]);
  });

  test('switches the repo before opening a foreign blocker', async () => {
    const gotoIssue = vi.fn();
    const switchWorkspace = vi.fn(async () => {});
    const mount = mountWithHandlers(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['UI-x'] },
        blocker_workspaces: { 'UI-x': OTHER_WS }
      }),
      { gotoIssue, switchWorkspace }
    );

    chipOf(mount, 'W-1')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    await flush();

    expect(switchWorkspace.mock.calls).toEqual([[OTHER_WS]]);
    expect(gotoIssue.mock.calls).toEqual([['UI-x']]);
  });

  test('does not open the issue when the workspace switch fails', async () => {
    const gotoIssue = vi.fn();
    const switchWorkspace = vi.fn(async () => {
      throw new Error('switch boom');
    });
    const mount = mountWithHandlers(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['UI-x'] },
        blocker_workspaces: { 'UI-x': OTHER_WS }
      }),
      { gotoIssue, switchWorkspace }
    );

    chipOf(mount, 'W-1')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );
    await flush();

    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('draws no button for a foreign blocker whose owner is unknown', () => {
    const mount = mountWithHandlers(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['UI-x'] }
      }),
      { gotoIssue: vi.fn() }
    );

    expect(chipOf(mount, 'W-1')).toBeNull();
    expect(
      mount.querySelector('.worker-mini[data-bead-id="W-1"] .worker-dep--pred')
        ?.textContent
    ).toContain('⛓ 외부/UI-x');
  });

  test('never opens the card own issue on a chip click', () => {
    const gotoIssue = vi.fn();
    const mount = mountWithHandlers(
      queueOf({
        queue: [{ bead_id: 'W-1', added_at: 1 }],
        bead_blocked_by: { 'W-1': ['W-9'] }
      }),
      { gotoIssue }
    );

    chipOf(mount, 'W-1')?.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(gotoIssue).not.toHaveBeenCalledWith('W-1');
  });
});

describe('views/worker candidate stepper doc cells (UI-ajkn §5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  const SPEC_DOC = { path: 'docs/spec.md', missing_state: null };

  /**
   * @returns {any}
   */
  function seedDocCandidate() {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'RD-1',
        title: 'ready with spec',
        status: 'open',
        priority: 1,
        updated_at: Date.now(),
        spec_id: 'SPEC-1',
        metadata: { route: 'spec_backed', spec_review: RECEIPT },
        workflow: {
          route: 'spec_backed',
          stages: {
            spec: { fill: 'full', glyph: null, stale: false, doc: SPEC_DOC },
            impl: { fill: 'none', glyph: null, stale: false },
            pr: { fill: 'none', glyph: null, stale: false },
            merge: { fill: 'none', glyph: null, stale: false }
          }
        }
      }
    ]);
    return stores;
  }

  test('opens a candidate document in the current workspace', () => {
    const openDoc = vi.fn();
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedDocCandidate(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn(),
      openDoc
    });

    /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate .seg--doc')
    ).click();

    expect(openDoc).toHaveBeenCalledWith(SPEC_DOC);
  });

  test('renders static stepper cells when no openDoc is given', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedDocCandidate(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });

    const cand = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );
    expect(cand.querySelector('.stp')).not.toBeNull();
    expect(cand.querySelector('.seg--doc')).toBeNull();
  });
});

describe('worker view — 자동 해소 phase 배지 (UI-hk74 §9)', () => {
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
   * The gate an automatic resolution actually sits behind: closed, and closed
   * for a reason no re-click allow-list names.
   */
  const HELD_GATE = {
    enabled: false,
    tier: 'blocked',
    gate_badge: '영수증',
    base_badge: '최신',
    reason: 'receipt_unbacked:unit_plan_mismatch'
  };

  /**
   * The row an automatic resolution really produces (UI-hk74 §4/§6): enrolled
   * in the merge queue under an AUTOMATIC authority, with a gate that is not
   * open. Both are what made the earlier green-gate, unqueued fixture unable to
   * prove §9's requirement.
   *
   * @param {Record<string, any>} completion_status
   * @returns {any}
   */
  function autoResolutionRow(completion_status) {
    return prWaitQueue({
      pr_observations: {
        'RD-1': {
          pr: {
            number: 1,
            url: 'https://github.com/o/r/pull/1',
            state: 'OPEN',
            head_sha: 'a'.repeat(40)
          },
          verify: null,
          error: null,
          observed_at: 1,
          gate: HELD_GATE
        }
      },
      merge_queue: [
        {
          bead_id: 'RD-1',
          resolution_rounds: 0,
          authority: {
            source: 'automatic',
            requested_head_sha: 'a'.repeat(40)
          }
        }
      ],
      merge_queue_state: { active: null, failures: {} },
      auto_merge: true,
      completion_status
    });
  }

  /**
   * A PR-wait row for `RD-1` with a green gate, over which each test lays the
   * one completion projection it is about.
   *
   * @param {Record<string, any>} over
   * @returns {any}
   */
  function prWaitQueue(over = {}) {
    return queueOf({
      pr_wait: [{ bead_id: 'RD-1', added_at: 1 }],
      pr_observations: {
        'RD-1': {
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
        }
      },
      ...over
    });
  }

  /**
   * @param {string} phase
   * @param {Record<string, any>|null} resolution
   * @param {Record<string, any>} [over]
   */
  function completionOf(phase, resolution, over = {}) {
    return {
      'RD-1': {
        root_bead_id: 'RD-1',
        phase,
        subject_role: 'root',
        subject_bead_id: 'RD-1',
        active_attempt_id: null,
        terminal_reason: null,
        auto_resolution: resolution,
        ...over
      }
    };
  }

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
   * @param {string} text
   * @returns {HTMLElement}
   */
  function badgeWith(mount, text) {
    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
    return /** @type {HTMLElement} */ (
      Array.from(row.querySelectorAll('.worker-mini__badge')).find((element) =>
        element.textContent?.includes(text)
      )
    );
  }

  test('badges a waiting_metadata row 정정 대기 with its original reason', () => {
    const mount = render(
      prWaitQueue({
        completion_status: completionOf('waiting_metadata', {
          class: 'metadata_watch',
          origin_reason: 'receipt_unbacked:unit_plan_mismatch',
          attempts: 0,
          attempt_cap: 3,
          next_at: null,
          last_error: null
        })
      })
    );

    const badge = badgeWith(mount, '정정 대기');

    expect(badge).not.toBeUndefined();
    expect(badge.title).toContain(
      '원 사유: receipt_unbacked:unit_plan_mismatch'
    );
    expect(badge.title).toContain('메타데이터 정정이 관측되면 자동 재개');
  });

  test('badges a retrying row 재시도 n/3 with its next wake and last error', () => {
    const next_at = Date.parse('2026-08-24T10:30:00Z');
    const mount = render(
      prWaitQueue({
        completion_status: completionOf('retrying', {
          class: 'retry',
          origin_reason: 'verify_cmd_failed',
          attempts: 2,
          attempt_cap: 3,
          next_at,
          last_error: 'npm ci exited 1'
        })
      })
    );

    const badge = badgeWith(mount, '재시도 2/3');

    expect(badge).not.toBeUndefined();
    const title = badge.querySelector('[title]')?.getAttribute('title') || '';
    expect(title).toContain('원 사유: verify_cmd_failed');
    expect(title).toContain(`다음 시각 ${formatTimestampLocal(next_at)}`);
    expect(title).toContain('마지막 오류: npm ci exited 1');
  });

  /**
   * @param {HTMLElement} mount
   * @returns {HTMLButtonElement}
   */
  function mergeButton(mount) {
    return /** @type {HTMLButtonElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="RD-1"] .worker-mini__merge'
      )
    );
  }

  test('keeps [머지] active on a queued retrying row behind a closed gate', () => {
    const mount = render(
      autoResolutionRow(
        completionOf('retrying', {
          class: 'retry',
          origin_reason: 'verify_cmd_failed',
          attempts: 1,
          attempt_cap: 3,
          next_at: null,
          last_error: null
        })
      )
    );

    const merge = mergeButton(mount);

    expect(merge).not.toBeNull();
    expect(merge.disabled).toBe(false);
  });

  test('keeps [머지] active on a queued waiting_metadata row', () => {
    const mount = render(
      autoResolutionRow(
        completionOf('waiting_metadata', {
          class: 'metadata_watch',
          origin_reason: 'receipt_unbacked:unit_plan_mismatch',
          attempts: 0,
          attempt_cap: 3,
          next_at: null,
          last_error: null
        })
      )
    );

    const merge = mergeButton(mount);

    expect(merge).not.toBeNull();
    expect(merge.disabled).toBe(false);
  });

  test('keeps [머지] active on a queued automatic review row', () => {
    const mount = render(
      autoResolutionRow(
        completionOf('reviewing', {
          class: 'auto_review',
          origin_reason: 'review_receipt_missing',
          attempts: 1,
          attempt_cap: 3,
          next_at: null,
          last_error: null
        })
      )
    );

    const merge = mergeButton(mount);

    expect(merge).not.toBeNull();
    expect(merge.disabled).toBe(false);
  });

  test('leaves a queued row with no automatic resolution untouched', () => {
    const mount = render(autoResolutionRow(completionOf('gating', null)));

    const merge = mergeButton(mount);

    expect(merge).toBeNull();
  });

  test('prefers 정정 대기 over the receipt merge-failure text on the same row', () => {
    const mount = render(
      prWaitQueue({
        merge_queue: [{ bead_id: 'RD-1', resolution_rounds: 0 }],
        merge_queue_state: {
          active: null,
          failures: { 'RD-1': 'receipt_unbacked:unit_plan_mismatch' }
        },
        completion_status: completionOf('waiting_metadata', {
          class: 'metadata_watch',
          origin_reason: 'receipt_unbacked:unit_plan_mismatch',
          attempts: 0,
          attempt_cap: 3,
          next_at: null,
          last_error: null
        })
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );

    expect(badgeWith(mount, '정정 대기')).not.toBeUndefined();
    expect(row.textContent).not.toContain('머지 실패');
    expect(row.textContent).not.toContain('영수증 확인 필요');
  });

  test('prefers 정정 대기 over the recorded receipt warning', () => {
    const queue = prWaitQueue({
      completion_status: completionOf('waiting_metadata', {
        class: 'metadata_watch',
        origin_reason: 'receipt_unbacked:unit_plan_mismatch',
        attempts: 0,
        attempt_cap: 3,
        next_at: null,
        last_error: null
      })
    });
    queue.pr_observations['RD-1'].receipt_check = {
      blocking_codes: ['unit_plan_mismatch']
    };

    const mount = render(queue);

    expect(badgeWith(mount, '정정 대기')).not.toBeUndefined();
    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
      ).textContent
    ).not.toContain('영수증 확인 필요');
  });

  test('carries the original reason in an exhausted retry tooltip', () => {
    const mount = render(
      prWaitQueue({
        completion_status: completionOf('needs_human', null, {
          terminal_reason: 'retry_exhausted:verify_cmd_failed'
        })
      })
    );

    const badge = badgeWith(mount, '확인 필요');

    expect(badge.title).toContain('원 사유: verify_cmd_failed');
  });

  test('carries the original reason in an exhausted auto-review tooltip', () => {
    const mount = render(
      prWaitQueue({
        completion_status: completionOf('needs_human', null, {
          terminal_reason: 'auto_review_exhausted:review_receipt_missing'
        })
      })
    );

    const badge = badgeWith(mount, '확인 필요');

    expect(badge.title).toContain('원 사유: review_receipt_missing');
  });

  test('draws no automatic badge when the resolution record did not travel', () => {
    const mount = render(
      prWaitQueue({
        completion_status: completionOf('retrying', null)
      })
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );

    expect(row.textContent).not.toContain('재시도');
  });

  test('drops the retry denominator when the server sent no budget', () => {
    const result = autoResolutionBadge(
      /** @type {any} */ ({
        phase: 'retrying',
        auto_resolution: {
          class: 'retry',
          origin_reason: 'verify_cmd_failed',
          attempts: 2,
          next_at: null,
          last_error: null
        }
      })
    );

    expect(result?.label).toBe('재시도 2');
  });
});

describe('worker view — 리뷰 세션 시도 이력 표시 (UI-d7fy §5.5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
    expandDoneLane();
  });

  /**
   * @param {Record<string, any>} attempts
   * @returns {HTMLElement}
   */
  function renderDone(attempts) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({ done: [{ bead_id: 'RD-1', added_at: 1 }], attempts })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  test('marks an automatic review session on the done row', () => {
    const mount = renderDone({
      a1: { attempt_id: 'a1', bead_id: 'RD-1', status: 'done' },
      r1: {
        attempt_id: 'r1',
        bead_id: 'RD-1',
        status: 'done',
        kind: 'review_session',
        origin: 'auto'
      }
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );

    expect(row.textContent).toContain('리뷰 · 자동');
  });

  test('marks a clicked review session without the 자동 marker', () => {
    const mount = renderDone({
      a1: { attempt_id: 'a1', bead_id: 'RD-1', status: 'done' },
      p1: {
        attempt_id: 'p1',
        bead_id: 'RD-1',
        status: 'done',
        kind: 'review_session',
        origin: 'click'
      }
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );

    expect(row.textContent).toContain('리뷰');
    expect(row.textContent).not.toContain('리뷰 · 자동');
  });

  test('leaves a done row of plain implementation attempts unbadged', () => {
    const mount = renderDone({
      a1: { attempt_id: 'a1', bead_id: 'RD-1', status: 'done' }
    });

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );

    expect(row.textContent).not.toContain('리뷰');
  });

  test('sums a review session attempt into the done row token total', () => {
    const mount = renderDone({
      a1: {
        attempt_id: 'a1',
        bead_id: 'RD-1',
        status: 'done',
        usage: { input_tokens: 1000, output_tokens: 0 }
      },
      r1: {
        attempt_id: 'r1',
        bead_id: 'RD-1',
        status: 'done',
        kind: 'review_session',
        origin: 'auto',
        usage: { input_tokens: 1000, output_tokens: 0 }
      }
    });

    const el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"] .worker-usage')
    );

    expect(el.textContent).toContain('2.0k');
  });

  test('keeps a running review session out of the 실행중 tiles', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        attempts: {
          r1: {
            attempt_id: 'r1',
            bead_id: 'RD-1',
            status: 'running',
            kind: 'review_session',
            origin: 'auto'
          }
        }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });

    expect(mount.querySelector('.rtile[data-attempt-id="r1"]')).toBeNull();
  });
});

describe('레인 표면 정합 — 접기·제목·조작 (UI-5ksp)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {any} [over] - Queue snapshot overrides.
   * @param {any} [transport]
   * @returns {HTMLElement}
   */
  function mountDesktop(over, transport) {
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

  const LANE_IDS = [
    'worker-pane-candidate',
    'worker-pane-queue',
    'worker-pane-running',
    'worker-pane-pr-wait',
    'worker-pane-done'
  ];

  test('makes every one of the five lanes collapsible', () => {
    const mount = mountDesktop();

    const toggles = LANE_IDS.map((id) =>
      mount.querySelector(`#${id} > .worker-pane__hd > .worker-pane__toggle`)
    );

    expect(toggles.every((el) => el !== null)).toBe(true);
  });

  test('collapses only the 완료 lane on a first visit', () => {
    const mount = mountDesktop();

    const collapsed = LANE_IDS.filter((id) =>
      /** @type {HTMLElement} */ (
        mount.querySelector(`#${id}`)
      ).classList.contains('worker-pane--collapsed')
    );

    expect(collapsed).toEqual(['worker-pane-done']);
  });

  test('folds one lane when its toggle is clicked', () => {
    const mount = mountDesktop();

    /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-running .worker-pane__toggle')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const pane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-running')
    );
    expect(pane.classList.contains('worker-pane--collapsed')).toBe(true);
    expect(pane.querySelector('.worker-pane__body')).toBe(null);
  });

  test('carries the 슬롯 count as the running lane header control', () => {
    const mount = mountDesktop();

    const meta = mount.querySelector('#worker-pane-running .worker-pane__meta');

    expect(meta?.textContent?.trim()).toBe('슬롯 2');
  });

  test('leaves the lane expanded when its header control changes', () => {
    const mount = mountDesktop();
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('#worker-pane-candidate .worker-sort')
    );

    select.value = 'title';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('#worker-pane-candidate')
      ).classList.contains('worker-pane--collapsed')
    ).toBe(false);
  });

  test('puts the serial lanes inside the 대기 pane', () => {
    const mount = mountDesktop({
      serial_lane_count: 1,
      serial_lanes: [{ id: 's1', entries: [] }],
      lane_states: { s1: { occupied_by: [], order: [], corrections: [] } }
    });

    const lane = mount.querySelector('#worker-pane-lane-s1');

    expect(lane?.closest('#worker-pane-queue')).not.toBe(null);
  });

  test('folds one 대기 본문 영역 when its toggle is clicked', () => {
    const mount = mountDesktop();

    /** @type {HTMLElement} */ (
      mount.querySelector('.worker-wait__area-toggle[data-area="serial"]')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('.worker-wait__area--serial')
      ).classList.contains('is-collapsed')
    ).toBe(true);
    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.worker.lane-collapsed') || '{}'
      ).areas
    ).toEqual({ serial: true });
  });

  test('counts the drop index from the parallel rows alone', async () => {
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountDesktop(
      {
        queue: [
          { bead_id: 'QQ-1', added_at: 1 },
          { bead_id: 'QQ-2', added_at: 2 }
        ],
        serial_lane_count: 1,
        serial_lanes: [
          { id: 's1', entries: [{ bead_id: 'SQ-1', added_at: 3 }] }
        ],
        lane_states: {
          s1: { occupied_by: [], order: ['SQ-1'], corrections: [] }
        }
      },
      transport
    );

    const zone = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-queue [data-drop="parallel"]')
    );
    drag(mount, 'QQ-1', 'worker-pane-queue');
    await flush();

    // 직렬 행(SQ-1)은 자기 레인의 드롭 영역에 산다 — 병렬 영역이 세는 행은
    // 병렬 행 둘뿐이므로 말미는 2가 아니라 1이다.
    expect(zone.querySelectorAll('[data-row-index]').length).toBe(2);
    expect(transport).toHaveBeenCalledWith('worker-queue-reorder', {
      bead_id: 'QQ-1',
      to_index: 1,
      expected_revision: 1
    });
  });

  test('appends to the queue from the candidate button while the strip is collapsed', async () => {
    window.localStorage.setItem(
      'beads-ui.worker.lane-collapsed',
      JSON.stringify({ lanes: { queue: true } })
    );
    const transport = vi.fn().mockResolvedValue({ ok: true });
    const mount = mountDesktop(
      { queue: [{ bead_id: 'QQ-1', added_at: 1 }] },
      transport
    );

    placeToQueue(mount, 'RD-1');
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-place', {
      bead_id: 'RD-1',
      expected_revision: 1
    });
  });

  test('marks the console as dragging while a row is held', () => {
    const mount = mountDesktop({ queue: [{ bead_id: 'QQ-1', added_at: 1 }] });
    const console_el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-console')
    );
    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="QQ-1"]')
    );

    row.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    const start = new Event('dragstart', { bubbles: true });
    Object.defineProperty(start, 'dataTransfer', {
      value: { setData: () => {}, effectAllowed: '' }
    });
    row.dispatchEvent(start);

    expect(console_el.classList.contains('is-dragging')).toBe(true);
  });

  test('clears the dragging mark when the drag ends', () => {
    const mount = mountDesktop({ queue: [{ bead_id: 'QQ-1', added_at: 1 }] });
    const console_el = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-console')
    );
    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="QQ-1"]')
    );
    row.dispatchEvent(new Event('pointerdown', { bubbles: true }));
    const start = new Event('dragstart', { bubbles: true });
    Object.defineProperty(start, 'dataTransfer', {
      value: { setData: () => {}, effectAllowed: '' }
    });
    row.dispatchEvent(start);

    row.dispatchEvent(new Event('dragend', { bubbles: true }));

    expect(console_el.classList.contains('is-dragging')).toBe(false);
  });
});

describe('복잡 chip projection on the worker tab (UI-sbum §3)', () => {
  const REC_META = {
    spec_review: RECEIPT,
    rec_orchestration_model: 'fable',
    rec_impl_runtime: 'claude',
    rec_reason: 'hard_diagnosis'
  };

  /**
   * Ready feed carrying one recommended candidate (`REC`) beside a plain one,
   * so the absence case is asserted against the same render.
   *
   * @param {Partial<any>} [over] - Overrides merged into the recommended issue.
   */
  function seedRec(over = {}) {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'REC',
        title: 'complex work',
        status: 'open',
        created_at: 100,
        spec_id: 'S',
        metadata: REC_META,
        ...over
      },
      {
        id: 'PLAIN',
        title: 'plain work',
        status: 'open',
        created_at: 300,
        spec_id: 'S',
        metadata: { route: 'spec_backed', spec_review: RECEIPT }
      }
    ]);
    return stores;
  }

  /**
   * @param {any} stores
   * @param {any} [queueStore]
   * @returns {HTMLElement}
   */
  function mountRec(stores, queueStore = createWorkerQueueStore()) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: stores,
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  test('draws the chip on the candidate card of a recommended bead', () => {
    const mount = mountRec(seedRec());

    const chip = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-card[data-bead-id="REC"] .worker-card__rec')
    );

    expect(chip.textContent?.trim()).toBe('복잡');
    expect(chip.title).toContain(
      '사유: 원인이 불명확하거나 재현이 불안정해 가설-검증 루프가 필요하다'
    );
    expect(chip.dataset.state).toBe('unapplied');
  });

  test('omits the chip on a candidate with no recommendation', () => {
    const mount = mountRec(seedRec());

    expect(
      mount.querySelector(
        '.worker-card[data-bead-id="PLAIN"] .worker-card__rec'
      )
    ).toBeNull();
  });

  test('reads the applied state from the bead own authority keys', () => {
    const mount = mountRec(
      seedRec({
        metadata: {
          ...REC_META,
          orchestration_model: 'fable',
          impl_runtime: 'claude'
        }
      })
    );

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector(
          '.worker-card[data-bead-id="REC"] .worker-card__rec'
        )
      ).dataset.state
    ).toBe('applied');
  });

  test('draws the chip on the waiting row of the same bead', () => {
    const queueStore = createWorkerQueueStore();
    const mount = mountRec(seedRec(), queueStore);

    queueStore.set(queueOf({ queue: [{ bead_id: 'REC', added_at: 1 }] }));

    expect(
      mount.querySelector(
        '#worker-pane-queue .worker-mini[data-bead-id="REC"] .worker-card__rec'
      )
    ).not.toBeNull();
  });

  test('draws no chip for a queued bead outside the subscribed issue set', () => {
    const queueStore = createWorkerQueueStore();
    const mount = mountRec(seedRec(), queueStore);

    queueStore.set(queueOf({ queue: [{ bead_id: 'UNSEEN', added_at: 1 }] }));

    const row = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-queue .worker-mini[data-bead-id="UNSEEN"]'
      )
    );
    expect(row).not.toBeNull();
    expect(row.querySelector('.worker-card__rec')).toBeNull();
  });

  test('draws the chip on the running attempt tile of the same bead', () => {
    const queueStore = createWorkerQueueStore();
    const mount = mountRec(seedRec(), queueStore);

    queueStore.set(
      queueOf({
        attempts: {
          'attempt-1': {
            attempt_id: 'attempt-1',
            bead_id: 'REC',
            status: 'running',
            runner: 'claude',
            model: 'opus',
            started_at: Date.now()
          }
        }
      })
    );

    expect(
      mount.querySelector('.rtile[data-bead-id="REC"] .worker-card__rec')
    ).not.toBeNull();
  });

  test('renders a recommended bead whose metadata is missing without throwing', () => {
    const mount = mountRec(seedRec({ metadata: undefined, spec_id: 'S' }));

    expect(
      mount.querySelector('.worker-card[data-bead-id="REC"] .worker-card__rec')
    ).toBeNull();
  });
});

describe('PR 대기 뱃지 우선순위·영수증 라벨 (UI-17mj §2.4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /** Reviews current, base clean: nothing above the receipt branch fires. */
  const CLEAN_GATE = {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
    base_badge: '최신',
    reason: null
  };

  /**
   * @param {{ gate?: any, receipt_check?: any, attempts?: Record<string, any>, external?: boolean }} [over]
   * @returns {HTMLElement}
   */
  function renderRow(over = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        pr_wait: [
          {
            bead_id: 'RD-1',
            added_at: 1,
            ...(over.external ? { external: true } : {})
          }
        ],
        pr_observations: {
          'RD-1': {
            pr: {
              number: 7,
              url: 'https://github.com/o/r/pull/7',
              state: 'OPEN',
              head_sha: 'a'.repeat(40)
            },
            verify: null,
            error: null,
            observed_at: 1,
            gate: over.gate || CLEAN_GATE,
            receipt_check: over.receipt_check || null
          }
        },
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
   * @param {'running'|'paused'} status
   * @returns {Record<string, any>}
   */
  function resolutionSession(status) {
    return {
      c1: {
        attempt_id: 'c1',
        bead_id: 'RD-1',
        status,
        runner: 'claude',
        model: 'opus',
        session_id: 'sid-1',
        started_at: Date.now() - 3000,
        conflict_resolution: true
      }
    };
  }

  /**
   * @param {string} reason
   * @returns {any}
   */
  function receiptGate(reason) {
    return {
      enabled: false,
      tier: 'blocked',
      gate_badge: '리뷰 필요',
      base_badge: '최신',
      reason
    };
  }

  const VIOLATION = {
    ok: false,
    probe_error: false,
    codes: ['unit_plan_mismatch'],
    blocking_codes: ['unit_plan_mismatch']
  };

  /**
   * @param {HTMLElement} mount
   * @returns {HTMLElement}
   */
  function row(mount) {
    return /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')
    );
  }

  /**
   * @param {HTMLElement} mount
   * @returns {HTMLElement}
   */
  function badge(mount) {
    return /** @type {HTMLElement} */ (
      row(mount).querySelector('.worker-mini__badge')
    );
  }

  test('names the first violation code in the receipt badge label', () => {
    const mount = renderRow({ receipt_check: VIOLATION });

    expect(badge(mount).textContent?.trim()).toBe(
      '영수증 확인 필요 · unit_plan_mismatch'
    );
  });

  test('keeps the full code list in the receipt badge tooltip', () => {
    const mount = renderRow({
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['unit_plan_mismatch', 'main_receipt_unbacked'],
        blocking_codes: ['unit_plan_mismatch', 'main_receipt_unbacked']
      }
    });

    const title = badge(mount).getAttribute('title') || '';

    expect(title).toContain('unit_plan_mismatch');
    expect(title).toContain('main_receipt_unbacked');
  });

  test.each(['review_receipt_missing', 'review_receipt_stale'])(
    'draws 충돌 해소 중 over a %s gate that also carries a receipt violation',
    (reason) => {
      const mount = renderRow({
        gate: receiptGate(reason),
        receipt_check: VIOLATION,
        attempts: resolutionSession('running')
      });

      expect(
        row(mount)
          .querySelector('.worker-mini__badge--activity')
          ?.textContent?.trim()
      ).toBe('충돌 해소 중');
      expect(row(mount).textContent).not.toContain('최종 변경 리뷰 필요');
      expect(row(mount).textContent).not.toContain('영수증 확인 필요');
    }
  );

  test.each(['review_receipt_missing', 'review_receipt_stale'])(
    'draws 충돌 해소 일시정지 over a %s gate that also carries a receipt violation',
    (reason) => {
      const mount = renderRow({
        gate: receiptGate(reason),
        receipt_check: VIOLATION,
        attempts: resolutionSession('paused')
      });

      expect(badge(mount).textContent?.trim()).toBe('충돌 해소 일시정지');
      expect(row(mount).textContent).not.toContain('최종 변경 리뷰 필요');
      expect(row(mount).textContent).not.toContain('영수증 확인 필요');
    }
  );
});

describe('PR 대기 행 영수증 회계 잔여 칩 (UI-h6t1 §4.2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  const CLEAN_GATE = {
    enabled: true,
    tier: 'eligible',
    gate_badge: '머지 가능',
    base_badge: '최신',
    reason: null
  };

  /**
   * @param {string[]} badge_codes
   * @returns {any}
   */
  function residue(badge_codes) {
    return {
      ok: false,
      probe_error: false,
      codes: badge_codes,
      blocking_codes: [],
      badge_codes
    };
  }

  /**
   * @param {{ receipt_check?: any, external?: boolean }} [over]
   * @returns {HTMLElement}
   */
  function renderRow(over = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        pr_wait: [
          {
            bead_id: 'RD-1',
            added_at: 1,
            ...(over.external ? { external: true } : {})
          }
        ],
        pr_observations: {
          'RD-1': {
            pr: {
              number: 7,
              url: 'https://github.com/o/r/pull/7',
              state: 'OPEN',
              head_sha: 'a'.repeat(40)
            },
            verify: null,
            error: null,
            observed_at: 1,
            gate: CLEAN_GATE,
            receipt_check: over.receipt_check || null
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
   * @returns {HTMLElement}
   */
  function chip(mount) {
    return /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="RD-1"] [data-chip-key="receipt"]'
      )
    );
  }

  test('names the single badge code in the chip label', () => {
    const mount = renderRow({ receipt_check: residue(['effort_unknown']) });

    expect(chip(mount).textContent?.trim()).toBe('영수증 · effort_unknown');
  });

  test('counts the remaining codes when more than one is observed', () => {
    const mount = renderRow({
      receipt_check: residue(['absent', 'main_reason_retired'])
    });

    expect(chip(mount).textContent?.trim()).toBe('영수증 · absent +1');
  });

  test('draws no status badge for a badge-only observation', () => {
    const mount = renderRow({ receipt_check: residue(['absent']) });

    expect(
      mount.querySelector('.worker-mini[data-bead-id="RD-1"]')?.textContent
    ).not.toContain('영수증 확인 필요');
  });

  test('draws the same chip on an external PR row', () => {
    const mount = renderRow({
      receipt_check: residue(['absent']),
      external: true
    });

    expect(chip(mount).textContent?.trim()).toBe('영수증 · absent');
  });

  test('draws no chip when the observation carries no badge codes', () => {
    const mount = renderRow({
      receipt_check: {
        ok: true,
        probe_error: false,
        codes: [],
        blocking_codes: [],
        badge_codes: []
      }
    });

    expect(chip(mount)).toBeNull();
  });

  test('draws no chip when the observation is absent', () => {
    const mount = renderRow();

    expect(chip(mount)).toBeNull();
  });

  test('opens the 사유 popup with one sentence per code', () => {
    const mount = renderRow({
      receipt_check: residue(['effort_unknown', 'takeover_lineage_missing'])
    });

    chip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    const popover = mount.querySelector('.chip-popover');
    expect(popover?.textContent).toContain('effort 토큰이 harness 어휘 밖이다');
    expect(popover?.textContent).toContain(
      'resolved 모델과 일치하는 완료된 위임 세션이 없다'
    );
  });

  test('says the merge is unaffected in the popup', () => {
    const mount = renderRow({ receipt_check: residue(['absent']) });

    chip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.chip-popover')?.textContent).toContain(
      '자동 머지 판정에는 영향이 없다'
    );
  });

  test('reads an unknown code back as the code string itself', () => {
    const mount = renderRow({ receipt_check: residue(['grown_later']) });

    chip(mount).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('.chip-popover')?.textContent).toContain(
      'grown_later'
    );
  });
});

describe('해제·후속 칩과 대기 행 ✕ (UI-d13v §5·§6)', () => {
  const DAY = 24 * 60 * 60 * 1000;

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * One ready candidate carrying whatever decorations the case is about.
   *
   * @param {Record<string, any>} decorations
   * @returns {ReturnType<typeof createTestIssueStores>}
   */
  function seedDecorated(decorations) {
    const stores = createTestIssueStores();
    seed(stores, 'tab:worker:ready', [
      {
        id: 'RD-1',
        title: 'ready with spec',
        status: 'open',
        created_at: 100,
        updated_at: 200,
        metadata: { spec_id: 'SPEC-1', spec_review: RECEIPT },
        ...decorations
      }
    ]);
    return stores;
  }

  /**
   * @param {Record<string, any>} decorations
   * @param {any} [queue_over]
   * @param {any} [transport]
   * @returns {HTMLElement}
   */
  function mountDecorated(decorations, queue_over, transport) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(queueOf(queue_over || {}));
    createWorkerView(mount, {
      issueStores: seedDecorated(decorations),
      queueStore,
      transport: transport || vi.fn()
    });
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @returns {string[]}
   */
  function releasedLabels(mount) {
    return Array.from(mount.querySelectorAll('.worker-dep--released')).map(
      (el) => (el.textContent || '').replace(/\s+/g, ' ').trim()
    );
  }

  test('draws a release chip for a blocker closed inside the seven-day window', () => {
    const closed_at = Date.now() - DAY;

    const mount = mountDecorated({
      release_info: {
        released_by: [{ id: 'RD-9', closed_at }],
        last_released_at: closed_at
      }
    });

    expect(releasedLabels(mount)).toEqual(['🔓 RD-9']);
  });

  test('drops a release chip for a blocker closed before the window', () => {
    const closed_at = Date.now() - 30 * DAY;

    const mount = mountDecorated({
      release_info: {
        released_by: [{ id: 'RD-9', closed_at }],
        last_released_at: closed_at
      }
    });

    expect(releasedLabels(mount)).toEqual([]);
  });

  test('draws every release chip inside the window without folding', () => {
    const now = Date.now();

    const mount = mountDecorated({
      release_info: {
        released_by: [
          { id: 'RD-7', closed_at: now - 3 * DAY },
          { id: 'RD-8', closed_at: now - 2 * DAY },
          { id: 'RD-9', closed_at: now - DAY }
        ],
        last_released_at: now - DAY
      }
    });

    expect(releasedLabels(mount)).toEqual(['🔓 RD-9', '🔓 RD-8', '🔓 RD-7']);
  });

  test('draws one dependents chip per id the server listed', () => {
    const mount = mountDecorated({
      dependents_info: { count: 2, ids: ['RD-3', 'RD-2'] }
    });

    expect(
      Array.from(mount.querySelectorAll('.worker-dep--dependents'), (el) =>
        (el.textContent || '').replace(/\s+/g, ' ').trim()
      )
    ).toEqual(['→ RD-2', '→ RD-3']);
  });

  test('draws neither chip when the server sends no decoration', () => {
    const mount = mountDecorated({});

    expect(mount.querySelector('.worker-dep--released')).toBeNull();
    expect(mount.querySelector('.worker-dep--dependents')).toBeNull();
  });

  test('leaves the release chip off a waiting row', () => {
    const closed_at = Date.now() - DAY;

    const mount = mountDecorated(
      {
        release_info: {
          released_by: [{ id: 'RD-9', closed_at }],
          last_released_at: closed_at
        }
      },
      { queue: [{ bead_id: 'RD-1', added_at: 1 }] }
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-queue .worker-mini[data-bead-id="RD-1"]'
      )
    );

    expect(row.querySelector('.worker-dep--released')).toBeNull();
  });

  test('carries the dependents chip onto a waiting row (UI-8x90 §4.4)', () => {
    const mount = mountDecorated(
      {},
      {
        queue: [{ bead_id: 'RD-1', added_at: 1 }],
        bead_dependents: { 'RD-1': { ids: ['RD-2'] } }
      }
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector(
        '#worker-pane-queue .worker-mini[data-bead-id="RD-1"]'
      )
    );

    expect(
      row.querySelector('.worker-dep--dependents')?.textContent?.trim()
    ).toBe('→ RD-2');
  });

  test('renders the remove button on a waiting row', () => {
    const mount = mountDecorated(
      {},
      { queue: [{ bead_id: 'QQ-1', added_at: 1 }] }
    );

    const button = /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="QQ-1"] [data-action="queue-remove"]'
      )
    );

    expect(button.getAttribute('aria-label')).toBe('대기에서 빼기');
  });

  test('sends worker-queue-remove when the remove button is clicked', async () => {
    const transport = vi.fn().mockResolvedValue({ applied: true });
    const mount = mountDecorated(
      {},
      { revision: 4, queue: [{ bead_id: 'QQ-1', added_at: 1 }] },
      transport
    );

    /** @type {HTMLElement} */ (
      mount.querySelector(
        '.worker-mini[data-bead-id="QQ-1"] [data-action="queue-remove"]'
      )
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await flush();

    expect(transport).toHaveBeenCalledWith('worker-queue-remove', {
      bead_id: 'QQ-1',
      expected_revision: 4
    });
  });

  test('renders the remove button on a serial lane row', () => {
    const mount = mountDecorated(
      {},
      {
        serial_lane_count: 1,
        serial_lanes: [
          { id: 's1', entries: [{ bead_id: 'SQ-1', added_at: 2 }] }
        ],
        lane_states: {
          s1: { occupied_by: [], order: ['SQ-1'], corrections: [] }
        }
      }
    );

    expect(
      mount.querySelector(
        '.worker-mini[data-bead-id="SQ-1"] [data-action="queue-remove"]'
      )
    ).not.toBeNull();
  });

  test('leaves the remove button off a done row', () => {
    expandDoneLane();

    const mount = mountDecorated(
      {},
      { done: [{ bead_id: 'DN-1', added_at: 1 }] }
    );

    const row = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini[data-bead-id="DN-1"]')
    );

    expect(row.querySelector('[data-action="queue-remove"]')).toBeNull();
  });

  test('leaves the remove button off a serial occupancy row', () => {
    const mount = mountDecorated(
      {},
      {
        serial_lane_count: 1,
        serial_lanes: [{ id: 's1', entries: [] }],
        lane_states: {
          s1: { occupied_by: ['OC-1'], order: [], corrections: [] }
        }
      }
    );

    const ghost = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-mini--ghost[data-bead-id="OC-1"]')
    );

    expect(ghost.querySelector('[data-action="queue-remove"]')).toBeNull();
  });
});

describe('워커 탭 이슈 검색 (UI-6g3t §7)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
    expandDoneLane();
  });

  /**
   * Type one query into the toolbar's search input. lit keeps the same DOM node
   * across the re-render, so the returned element stays live.
   *
   * @param {HTMLElement} mount
   * @param {string} value
   * @returns {HTMLInputElement}
   */
  function typeSearch(mount, value) {
    const input = /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-search')
    );
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    return input;
  }

  /**
   * Every fact a search must not move: 대기 행의 순서, `#n` 좌표(드롭 인덱스),
   * 드래그 속성.
   *
   * @param {HTMLElement} mount
   * @returns {Array<Record<string, string>>}
   */
  function queueRowFacts(mount) {
    return Array.from(
      mount.querySelectorAll('#worker-pane-queue [data-drag-kind]')
    ).map((el) => {
      const wrapper = /** @type {HTMLElement} */ (el);
      const row = /** @type {HTMLElement} */ (
        wrapper.querySelector('.worker-mini')
      );
      return {
        id: wrapper.dataset.beadId || '',
        drag_kind: wrapper.dataset.dragKind || '',
        row_index: wrapper.dataset.rowIndex || '',
        queue_index: wrapper.dataset.queueIndex || '',
        draggable: row.getAttribute('draggable') || ''
      };
    });
  }

  /**
   * Mount the Worker console over three candidates and a two-row 병렬 대기.
   *
   * @returns {HTMLElement}
   */
  function mountWithQueue() {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    presetCandidateFilter({ show_blocked: true });
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        queue: [
          { bead_id: 'SQ-1', added_at: 0 },
          { bead_id: 'SQ-2', added_at: 1 }
        ],
        bead_titles: { 'SQ-1': 'queued one', 'SQ-2': 'queued two' }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  test('places the search input last in the toolbar ops group', () => {
    const mount = mountWithQueue();

    const ops = /** @type {HTMLElement} */ (
      mount.querySelector('.worker-ctrl__ops')
    );

    expect(ops.lastElementChild?.className).toBe('worker-search');
  });

  test('dims candidate cards the query does not match', () => {
    const mount = mountWithQueue();

    typeSearch(mount, 'RD-1');

    const cand = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );
    expect([
      cand
        .querySelector('.worker-card[data-bead-id="RD-1"]')
        ?.classList.contains('is-dimmed'),
      cand
        .querySelector('.worker-card[data-bead-id="RD-2"]')
        ?.classList.contains('is-dimmed'),
      cand
        .querySelector('.worker-card[data-bead-id="BL-1"]')
        ?.classList.contains('is-dimmed')
    ]).toEqual([false, true, true]);
  });

  test('appends 일치 n to the pane header while searching', () => {
    const mount = mountWithQueue();

    typeSearch(mount, 'ready');

    const cand = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-candidate')
    );
    expect(cand.querySelector('.worker-pane__match')?.textContent).toBe(
      '일치 2'
    );
  });

  /**
   * Mount the Worker console over one 직렬 레인 holding an occupant ghost row and
   * one waiting row, so the search can be judged on both (UI-6g3t §7).
   *
   * @returns {HTMLElement}
   */
  function mountWithSerialLane() {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    queueStore.set(
      queueOf({
        serial_lane_count: 1,
        serial_lanes: [
          {
            id: 's1',
            entries: [{ bead_id: 'OCC-1' }, { bead_id: 'SL-1' }]
          }
        ],
        lane_states: {
          s1: {
            occupied_by: ['OCC-1'],
            order: ['OCC-1', 'SL-1'],
            corrections: [],
            cycle: false
          }
        },
        attempts: {
          t1: {
            attempt_id: 't1',
            bead_id: 'OCC-1',
            status: 'paused',
            started_at: 10
          }
        },
        bead_titles: { 'OCC-1': 'occupied one', 'SL-1': 'serial one' }
      })
    );
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    return mount;
  }

  test('dims a serial lane occupant ghost row the query does not match', () => {
    const mount = mountWithSerialLane();

    typeSearch(mount, 'SL-1');

    const lane = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-pane-lane-s1')
    );
    expect([
      lane
        .querySelector('.worker-mini[data-bead-id="OCC-1"]')
        ?.classList.contains('is-dimmed'),
      lane
        .querySelector('.worker-mini[data-bead-id="SL-1"]')
        ?.classList.contains('is-dimmed')
    ]).toEqual([true, false]);
  });

  test('appends 일치 n to a serial lane header while searching', () => {
    const mount = mountWithSerialLane();

    typeSearch(mount, 'one');

    expect(
      mount.querySelector('#worker-pane-lane-s1 .worker-pane__match')
        ?.textContent
    ).toBe('일치 2');
  });

  test('leaves the pane count itself untouched by the query', () => {
    const mount = mountWithQueue();
    const before = mount.querySelector(
      '#worker-pane-candidate .worker-pane__count'
    )?.textContent;

    typeSearch(mount, 'RD-1');

    expect(
      mount.querySelector('#worker-pane-candidate .worker-pane__count')
        ?.textContent
    ).toBe(before);
  });

  test('keeps queue row order, drop coordinates and drag attributes', () => {
    const mount = mountWithQueue();
    const before = queueRowFacts(mount);

    typeSearch(mount, 'SQ-2');

    expect(queueRowFacts(mount)).toEqual(before);
  });

  test('dims no card and shows no 일치 count for an empty query', () => {
    const mount = mountWithQueue();

    typeSearch(mount, '');

    expect([
      mount.querySelectorAll('.is-dimmed').length,
      mount.querySelectorAll('.worker-pane__match').length
    ]).toEqual([0, 0]);
  });

  test('clears the query on Escape', () => {
    const mount = mountWithQueue();
    const input = typeSearch(mount, 'RD-1');

    input.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    expect([
      /** @type {HTMLInputElement} */ (mount.querySelector('.worker-search'))
        .value,
      mount.querySelectorAll('.is-dimmed').length
    ]).toEqual(['', 0]);
  });

  test('writes nothing to localStorage while searching', () => {
    const mount = mountWithQueue();
    const before = JSON.stringify({ ...window.localStorage });

    typeSearch(mount, 'RD-1');
    /** @type {HTMLInputElement} */ (
      mount.querySelector('.worker-search')
    ).dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    expect(JSON.stringify({ ...window.localStorage })).toBe(before);
  });
});

describe('유예 행의 1초 타이머 (UI-q1tg §3.3)', () => {
  const NOW = 1_700_000_000_000;

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * @param {number} added_at
   * @returns {{ view: any, intervals: any[] }}
   */
  function mountWithGraceRow(added_at) {
    const set_spy = vi.spyOn(window, 'setInterval');
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const queueStore = createWorkerQueueStore();
    const view = createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore,
      transport: vi.fn()
    });
    queueStore.set(queueOf({ queue: [{ bead_id: 'W-1', added_at }] }));
    return {
      view,
      intervals: set_spy.mock.calls.filter((call) => call[1] === 1000)
    };
  }

  test('starts a one-second timer while a grace row is visible', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);

    const { view, intervals } = mountWithGraceRow(NOW - 5_000);
    view.destroy();

    expect(intervals).toHaveLength(1);
  });

  test('starts no timer when no row is inside its grace', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);

    const { view, intervals } = mountWithGraceRow(NOW - 20_000);
    view.destroy();

    expect(intervals).toHaveLength(0);
  });

  test('clears the timer once the last grace row runs out', () => {
    const now = vi.spyOn(Date, 'now').mockReturnValue(NOW);
    const clear_spy = vi.spyOn(window, 'clearInterval');

    const { view, intervals } = mountWithGraceRow(NOW - 5_000);
    now.mockReturnValue(NOW + 20_000);
    /** @type {() => void} */ (intervals[0][0])();
    view.destroy();

    expect(clear_spy).toHaveBeenCalled();
  });

  test('clears the timer when the view is destroyed', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);
    const clear_spy = vi.spyOn(window, 'clearInterval');

    const { view } = mountWithGraceRow(NOW - 5_000);
    view.destroy();

    expect(clear_spy).toHaveBeenCalled();
  });
});

describe('worker 후보 route 필터 (UI-q1tg §3.2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  function mountCandidatePane() {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createWorkerView(mount, {
      issueStores: seedCandidates(),
      queueStore: createWorkerQueueStore(),
      transport: vi.fn()
    });
    return mount;
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} value
   */
  function clickRouteChip(mount, value) {
    /** @type {HTMLElement} */ (
      mount.querySelector(`.worker-filter__route[data-route="${value}"]`)
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));
  }

  /** @param {HTMLElement} mount */
  const candIds = (mount) =>
    Array.from(
      /** @type {HTMLElement} */ (
        mount.querySelector('#worker-pane-candidate')
      ).querySelectorAll('.worker-card')
    ).map((el) => /** @type {HTMLElement} */ (el).dataset.beadId);

  test('narrows the candidates to the clicked route', () => {
    const mount = mountCandidatePane();

    clickRouteChip(mount, 'spec_backed');

    expect(candIds(mount)).toEqual(['RD-1']);
  });

  test('marks the clicked route chip pressed', () => {
    const mount = mountCandidatePane();

    clickRouteChip(mount, 'spec_backed');

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('.worker-filter__route[data-route="spec_backed"]')
      ).getAttribute('aria-pressed')
    ).toBe('true');
  });

  test('restores every candidate when the last route chip is unclicked', () => {
    const mount = mountCandidatePane();

    clickRouteChip(mount, 'spec_backed');
    clickRouteChip(mount, 'spec_backed');

    expect(candIds(mount)).toEqual(['RD-1', 'RD-2']);
  });

  test('stores the selected routes alongside the other axes', () => {
    const mount = mountCandidatePane();

    clickRouteChip(mount, 'spec_backed');

    expect(
      JSON.parse(
        window.localStorage.getItem('beads-ui.worker.candidate-filter') ||
          'null'
      )
    ).toEqual({
      show_blocked: false,
      readiness: 'all',
      routes: ['spec_backed']
    });
  });

  test('separates the route group from the readiness group', () => {
    const mount = mountCandidatePane();

    expect(
      /** @type {HTMLElement} */ (
        mount.querySelector('.worker-filter__routes')
      ).getAttribute('aria-label')
    ).toBe('route 필터');
  });
});
