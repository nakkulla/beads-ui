import { beforeEach, describe, expect, test, vi } from 'vitest';
import { RANK_STEP } from '../../data/sort.js';
import { createSubscriptionIssueStore } from '../../data/subscription-issue-store.js';
import { createUiOrderStore } from '../../data/ui-order-store.js';
import { createBoardView } from './index.js';

function createTestIssueStores() {
  /** @type {Map<string, any>} */
  const stores = new Map();
  /** @type {Set<() => void>} */
  const listeners = new Set();
  /**
   * @param {string} id
   * @returns {any}
   */
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

function seedAll() {
  const stores = createTestIssueStores();
  const now = Date.now();
  seed(stores, 'tab:board:blocked', [
    {
      id: 'BL-1',
      title: 'blocked one',
      status: 'open',
      priority: 1,
      updated_at: now
    }
  ]);
  seed(stores, 'tab:board:ready', [
    {
      id: 'RD-1',
      title: 'ready one',
      status: 'open',
      priority: 0,
      updated_at: now
    },
    {
      id: 'RD-2',
      title: 'ready two',
      status: 'open',
      priority: 2,
      updated_at: now
    }
  ]);
  seed(stores, 'tab:board:in-progress', [
    { id: 'IP-1', title: 'prog one', status: 'in_progress', updated_at: now }
  ]);
  seed(stores, 'tab:board:resolved', [
    { id: 'RS-1', title: 'resolved one', status: 'resolved', updated_at: now }
  ]);
  seed(stores, 'tab:board:closed', [
    {
      id: 'CL-1',
      title: 'closed one',
      status: 'closed',
      closed_at: now,
      updated_at: now
    }
  ]);
  return stores;
}

describe('views/board', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  test('renders five columns and partitions issues by status', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedAll()
    });
    await view.load();

    expect(mount.querySelectorAll('.board-column').length).toBe(5);
    expect(mount.querySelectorAll('#blocked-col .board-card').length).toBe(1);
    expect(mount.querySelectorAll('#ready-col .board-card').length).toBe(2);
    expect(mount.querySelectorAll('#in-progress-col .board-card').length).toBe(
      1
    );
    expect(mount.querySelectorAll('#resolved-col .board-card').length).toBe(1);

    // Closed renders its items directly (no collapse) with a period select.
    const closed = /** @type {HTMLElement} */ (
      mount.querySelector('#closed-col')
    );
    expect(closed.classList.contains('is-collapsed')).toBe(false);
    expect(mount.querySelectorAll('#closed-col .board-card').length).toBe(1);
    const rangeSel = /** @type {HTMLSelectElement | null} */ (
      closed.querySelector('select.board-column__closed-range')
    );
    expect(rangeSel).toBeTruthy();
    expect(rangeSel?.value).toBe('today');
  });

  test('closed column renders at most 200 cards (render cap)', async () => {
    const stores = createTestIssueStores();
    const now = Date.now();
    /** @type {any[]} */
    const many = [];
    for (let i = 0; i < 250; i++) {
      many.push({
        id: `CL-${i}`,
        title: `closed ${i}`,
        status: 'closed',
        closed_at: now - i,
        updated_at: now - i
      });
    }
    seed(stores, 'tab:board:closed', many);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores
    });
    await view.load();
    expect(mount.querySelectorAll('#closed-col .board-card').length).toBe(200);
  });

  test('closed period select reflects the current range and reports changes', async () => {
    const onClosedRangeChange = vi.fn();
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedAll(),
      closedRange: 'today',
      onClosedRangeChange
    });
    await view.load();
    const sel = /** @type {HTMLSelectElement} */ (
      mount.querySelector('#closed-col select.board-column__closed-range')
    );
    expect(sel.value).toBe('today');
    sel.value = '7d';
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    expect(onClosedRangeChange).toHaveBeenCalledWith('7d');
    // The select keeps reflecting the new range after re-render.
    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('#closed-col select.board-column__closed-range')
      ).value
    ).toBe('7d');
  });

  test('clicking the id chip copies the id and shows a toast', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedAll()
    });
    await view.load();

    const idBtn = /** @type {HTMLElement} */ (
      mount.querySelector('#ready-col .board-card .board-card__id')
    );
    idBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(writeText).toHaveBeenCalledWith('RD-1');
    await Promise.resolve();
    await Promise.resolve();
    const toast = document.body.querySelector('.toast');
    expect(toast?.textContent).toContain('복사됨');
  });

  test('id click does not navigate (stops propagation)', async () => {
    const gotoIssue = vi.fn();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
      configurable: true
    });
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, { gotoIssue, issueStores: seedAll() });
    await view.load();
    const idBtn = /** @type {HTMLElement} */ (
      mount.querySelector('#ready-col .board-card .board-card__id')
    );
    idBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(gotoIssue).not.toHaveBeenCalled();
  });

  test('clicking a card navigates to the issue', async () => {
    const gotoIssue = vi.fn();
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, { gotoIssue, issueStores: seedAll() });
    await view.load();
    const card = /** @type {HTMLElement} */ (
      mount.querySelector('#ready-col .board-card')
    );
    card.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(gotoIssue).toHaveBeenCalledWith('RD-1');
  });

  test('allowed drag sends update-status; disallowed (Blocked) is ignored', async () => {
    const transport = vi.fn().mockResolvedValue({});
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedAll(),
      transport
    });
    await view.load();

    /**
     * @param {string} columnId
     * @param {string} issueId
     */
    function drop(columnId, issueId) {
      const col = /** @type {HTMLElement} */ (
        mount.querySelector('#' + columnId)
      );
      const ev = new Event('drop', { bubbles: true, cancelable: true });
      Object.defineProperty(ev, 'dataTransfer', {
        value: { getData: () => issueId }
      });
      col.dispatchEvent(ev);
    }

    // Allowed: Ready (open) → In progress (in_progress).
    drop('in-progress-col', 'RD-1');
    expect(transport).toHaveBeenCalledWith('update-status', {
      id: 'RD-1',
      status: 'in_progress'
    });

    transport.mockClear();
    // Disallowed: Blocked column is not a status target.
    drop('blocked-col', 'RD-2');
    expect(transport).not.toHaveBeenCalled();

    transport.mockClear();
    // No-op: dropping onto the same status column (Ready→open).
    drop('ready-col', 'RD-2');
    expect(transport).not.toHaveBeenCalled();
  });

  test('search filter narrows visible cards', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedAll()
    });
    await view.load();
    expect(mount.querySelectorAll('#ready-col .board-card').length).toBe(2);

    const search = /** @type {HTMLInputElement} */ (
      mount.querySelector('.board-filter__search')
    );
    search.value = 'ready two';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    expect(mount.querySelectorAll('#ready-col .board-card').length).toBe(1);
    expect(mount.querySelectorAll('#blocked-col .board-card').length).toBe(0);
  });

  test('new issue button invokes the onNewIssue callback', async () => {
    const onNewIssue = vi.fn();
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedAll(),
      onNewIssue
    });
    await view.load();
    const btn = /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__new')
    );
    btn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onNewIssue).toHaveBeenCalled();
  });
});

describe('views/board same-column reorder', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * Seed a Ready column with three unranked issues (newest-first initial order
   * RD-1, RD-2, RD-3 by descending created_at).
   */
  function seedReady() {
    const stores = createTestIssueStores();
    seed(stores, 'tab:board:ready', [
      { id: 'RD-1', title: 'r1', status: 'open', created_at: 30_000 },
      { id: 'RD-2', title: 'r2', status: 'open', created_at: 20_000 },
      { id: 'RD-3', title: 'r3', status: 'open', created_at: 10_000 }
    ]);
    return stores;
  }

  /**
   * Dispatch a drop event whose target is a specific card so the handler can
   * derive the drop index from the card under the cursor.
   *
   * @param {HTMLElement} cardEl
   * @param {string} issueId
   */
  function dropOnCard(cardEl, issueId) {
    const ev = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(ev, 'dataTransfer', {
      value: { getData: () => issueId }
    });
    cardEl.dispatchEvent(ev);
  }

  /**
   * @param {HTMLElement} mount
   * @returns {string[]}
   */
  function readyOrder(mount) {
    return Array.from(mount.querySelectorAll('#ready-col .board-card')).map(
      (c) => c.getAttribute('data-issue-id') || ''
    );
  }

  test('same-column drop emits ui-order-set and applies the order optimistically', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      revision: 1,
      order: {}
    });
    const uiOrderStore = createUiOrderStore();
    uiOrderStore.set({ revision: 0, order: {} });
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedReady(),
      transport,
      uiOrderStore
    });
    await view.load();
    expect(readyOrder(mount)).toEqual(['RD-1', 'RD-2', 'RD-3']);

    // Drag RD-3 to the top (drop onto RD-1's card, the current first slot).
    const target = /** @type {HTMLElement} */ (
      mount.querySelector('#ready-col .board-card[data-issue-id="RD-1"]')
    );
    dropOnCard(target, 'RD-3');

    // RD-3 lands just above RD-1: rank = effRank(RD-1) - STEP = -30000 - STEP.
    const expected_rank = -30_000 - RANK_STEP;
    expect(transport).toHaveBeenCalledWith('ui-order-set', {
      expected_revision: 0,
      entries: [{ bead_id: 'RD-3', rank: expected_rank }]
    });
    // Optimistic local apply landed in the store BEFORE the server reply...
    expect(uiOrderStore.get()?.order['RD-3']).toBe(expected_rank);
    // ...and the DOM already reflects the new order.
    expect(readyOrder(mount)).toEqual(['RD-3', 'RD-1', 'RD-2']);
  });

  test('conflict reply adopts the server snapshot and retries once', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        revision: 5,
        order: { 'RD-3': 999 }
      })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        revision: 6,
        order: { 'RD-3': -1_078_576 }
      });
    const uiOrderStore = createUiOrderStore();
    uiOrderStore.set({ revision: 0, order: {} });
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedReady(),
      transport,
      uiOrderStore
    });
    await view.load();

    const target = /** @type {HTMLElement} */ (
      mount.querySelector('#ready-col .board-card[data-issue-id="RD-1"]')
    );
    dropOnCard(target, 'RD-3');

    await vi.waitFor(() => expect(transport).toHaveBeenCalledTimes(2));
    // Retry carries the adopted revision (5).
    const second = transport.mock.calls[1];
    expect(second[0]).toBe('ui-order-set');
    expect(second[1].expected_revision).toBe(5);
    // Store ends on the applied server revision.
    expect(uiOrderStore.get()?.revision).toBe(6);
  });

  test('reorder under an active filter ranks against the full column list', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      revision: 1,
      order: {}
    });
    const uiOrderStore = createUiOrderStore();
    uiOrderStore.set({ revision: 0, order: {} });
    const stores = createTestIssueStores();
    seed(stores, 'tab:board:ready', [
      { id: 'RD-1', title: 'aaa one', status: 'open', created_at: 30_000 },
      { id: 'RD-2', title: 'bbb two', status: 'open', created_at: 20_000 },
      { id: 'RD-3', title: 'aaa three', status: 'open', created_at: 10_000 }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores,
      transport,
      uiOrderStore
    });
    await view.load();

    // Filter hides RD-2; only RD-1 and RD-3 are visible.
    const search = /** @type {HTMLInputElement} */ (
      mount.querySelector('.board-filter__search')
    );
    search.value = 'aaa';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    expect(readyOrder(mount)).toEqual(['RD-1', 'RD-3']);

    // Dropping RD-1 onto RD-3 must rank against the FULL list — the midpoint of
    // the hidden neighbour RD-2 (-20000) and RD-3 (-10000), NOT a top-of-
    // filtered-list rank that would scramble RD-1 relative to RD-2.
    const target = /** @type {HTMLElement} */ (
      mount.querySelector('#ready-col .board-card[data-issue-id="RD-3"]')
    );
    dropOnCard(target, 'RD-1');
    expect(transport).toHaveBeenCalledWith('ui-order-set', {
      expected_revision: 0,
      entries: [{ bead_id: 'RD-1', rank: -15_000 }]
    });
    view.clear();
  });
});

describe('views/board child integration (Phase 5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @param {HTMLElement} mount
   * @param {string} colId
   * @returns {string[]}
   */
  function cardIds(mount, colId) {
    return Array.from(mount.querySelectorAll(`#${colId} .board-card`)).map(
      (c) => c.getAttribute('data-issue-id') || ''
    );
  }

  test('a child whose parent is rendered is folded into the parent card, not a separate card', async () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:board:ready', [
      { id: 'PA', title: 'parent alpha', status: 'open', created_at: 100 },
      {
        id: 'CH1',
        title: 'Task 1: child one',
        status: 'open',
        parent: 'PA',
        created_at: 90
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores
    });
    await view.load();

    // The child is not a top-level card; only the parent renders as a card.
    expect(cardIds(mount, 'ready-col')).toEqual(['PA']);
    // The child appears as a compact row inside the parent card (default open).
    const rows = mount.querySelectorAll(
      '#ready-col .board-card[data-issue-id="PA"] .board-card__roll-child'
    );
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Task 1: child one');
  });

  test('a child whose parent is not rendered falls back to a normal card', async () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:board:ready', [
      {
        id: 'CH2',
        title: 'Task 1: orphan child',
        status: 'open',
        parent: 'GHOST',
        created_at: 90
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores
    });
    await view.load();

    // GHOST is not rendered anywhere → the child stays as its own card.
    expect(cardIds(mount, 'ready-col')).toEqual(['CH2']);
  });

  test('a parent beyond the closed render cap is not rendered so its child falls back', async () => {
    const stores = createTestIssueStores();
    const now = Date.now();
    /** @type {any[]} */
    const closed = [];
    for (let i = 0; i < 200; i++) {
      closed.push({
        id: `F-${i}`,
        title: `f${i}`,
        status: 'closed',
        closed_at: now - i
      });
    }
    // Oldest closed → sorts last (closed_at desc) → cut by the 200 cap.
    closed.push({
      id: 'PBEYOND',
      title: 'beyond parent',
      status: 'closed',
      closed_at: now - 10_000_000
    });
    seed(stores, 'tab:board:closed', closed);
    seed(stores, 'tab:board:ready', [
      {
        id: 'CHB',
        title: 'Task 1: child of beyond',
        status: 'open',
        parent: 'PBEYOND',
        created_at: 90
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores
    });
    await view.load();

    // Closed renders exactly the cap; PBEYOND is cut.
    expect(mount.querySelectorAll('#closed-col .board-card').length).toBe(200);
    expect(cardIds(mount, 'closed-col')).not.toContain('PBEYOND');
    // Parent not rendered → child does not vanish; it is a normal card.
    expect(cardIds(mount, 'ready-col')).toContain('CHB');
  });

  test('an active search filter suspends folding so a matching child renders as a card', async () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:board:ready', [
      { id: 'PA', title: 'parent alpha', status: 'open', created_at: 100 },
      {
        id: 'CH1',
        title: 'Task 1: child one',
        status: 'open',
        parent: 'PA',
        created_at: 90
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores
    });
    await view.load();
    // Folded by default: only the parent card.
    expect(cardIds(mount, 'ready-col')).toEqual(['PA']);

    // A search that hides the parent must not make the child vanish.
    const search = /** @type {HTMLInputElement} */ (
      mount.querySelector('.board-filter__search')
    );
    search.value = 'child one';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    expect(cardIds(mount, 'ready-col')).toEqual(['CH1']);
  });

  test('an active priority filter also suspends folding', async () => {
    const stores = createTestIssueStores();
    seed(stores, 'tab:board:ready', [
      {
        id: 'PA',
        title: 'parent alpha',
        status: 'open',
        priority: 2,
        created_at: 100
      },
      {
        id: 'CH1',
        title: 'Task 1: child one',
        status: 'open',
        priority: 0,
        parent: 'PA',
        created_at: 90
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores
    });
    await view.load();
    expect(cardIds(mount, 'ready-col')).toEqual(['PA']);

    const pri = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.board-filter select[aria-label="우선순위 필터"]')
    );
    pri.value = '0';
    pri.dispatchEvent(new Event('change', { bubbles: true }));

    // Parent (P2) filtered out; the child (P0) survives as a card.
    expect(cardIds(mount, 'ready-col')).toEqual(['CH1']);
  });
});
