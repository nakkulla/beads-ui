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
    // Same-column reorder is gated on the manual sort mode (UX v3 spec §3).
    window.localStorage.setItem('beads-ui.board.sort', 'manual');
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

describe('views/board: deferred popup + sort dropdown', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  function seedWithDeferred() {
    const stores = seedAll();
    seed(stores, 'tab:board:deferred', [
      {
        id: 'DF-1',
        title: 'deferred one',
        status: 'deferred',
        created_at: 5_000,
        updated_at: 5_000
      },
      {
        id: 'DF-2',
        title: 'deferred two',
        status: 'deferred',
        created_at: 9_000,
        updated_at: 9_000
      }
    ]);
    return stores;
  }

  /**
   * @param {HTMLElement} mount
   */
  function deferredButton(mount) {
    return /** @type {HTMLButtonElement} */ (
      mount.querySelector('.board-filter__deferred')
    );
  }

  /**
   * @param {HTMLElement} mount
   */
  function popupCardIds(mount) {
    return Array.from(
      mount.querySelectorAll('#deferred-popup .board-card')
    ).map((el) => el.getAttribute('data-issue-id'));
  }

  test('button click opens the deferred popup with its cards', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedWithDeferred()
    });
    await view.load();

    expect(mount.querySelector('#deferred-popup')).toBeNull();
    const button = deferredButton(mount);
    expect(button.textContent).toContain('Deferred 2');
    expect(button.getAttribute('aria-expanded')).toBe('false');

    button.click();

    expect(mount.querySelector('#deferred-popup')).not.toBeNull();
    // Default sort = created_desc → DF-2 (9000) above DF-1 (5000).
    expect(popupCardIds(mount)).toEqual(['DF-2', 'DF-1']);
    expect(deferredButton(mount).getAttribute('aria-expanded')).toBe('true');
  });

  test('opening the popup adds no deferred column to the board', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedWithDeferred()
    });
    await view.load();

    deferredButton(mount).click();

    expect(mount.querySelector('#deferred-col')).toBeNull();
    expect(mount.querySelectorAll('.board-root .board-column').length).toBe(5);
    const root = /** @type {HTMLElement} */ (
      mount.querySelector('.board-root')
    );
    expect(root.classList.contains('board-root--deferred')).toBe(false);
  });

  test('applies the board filters to the popup list', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedWithDeferred()
    });
    await view.load();
    deferredButton(mount).click();

    const search = /** @type {HTMLInputElement} */ (
      mount.querySelector('.board-filter__search')
    );
    search.value = 'deferred two';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    expect(popupCardIds(mount)).toEqual(['DF-2']);
  });

  test('closes the popup on the close button', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedWithDeferred()
    });
    await view.load();
    deferredButton(mount).click();

    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.deferred-popup__close')
    ).click();

    expect(mount.querySelector('#deferred-popup')).toBeNull();
    expect(deferredButton(mount).getAttribute('aria-expanded')).toBe('false');
  });

  test('closes the popup on Escape', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedWithDeferred()
    });
    await view.load();
    deferredButton(mount).click();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    expect(mount.querySelector('#deferred-popup')).toBeNull();
  });

  test('closes the popup on a backdrop click', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedWithDeferred()
    });
    await view.load();
    deferredButton(mount).click();

    // A click landing on the <dialog> itself (not its container) is the backdrop.
    /** @type {HTMLElement} */ (
      mount.querySelector('#deferred-popup')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mount.querySelector('#deferred-popup')).toBeNull();
  });

  test('card click opens the detail and closes the popup', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const gotoIssue = vi.fn();
    const view = createBoardView(mount, {
      gotoIssue,
      issueStores: seedWithDeferred()
    });
    await view.load();
    deferredButton(mount).click();

    /** @type {HTMLElement} */ (
      mount.querySelector('#deferred-popup .board-card')
    ).click();

    expect(gotoIssue).toHaveBeenCalledWith('DF-2');
    expect(mount.querySelector('#deferred-popup')).toBeNull();
  });

  test('clear() closes an open popup', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: seedWithDeferred()
    });
    await view.load();
    deferredButton(mount).click();

    view.clear();
    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    );

    expect(mount.querySelector('#deferred-popup')).toBeNull();
  });

  test('sort dropdown persists the mode and re-sorts columns', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const stores = createTestIssueStores();
    seed(stores, 'tab:board:ready', [
      {
        id: 'RD-old',
        title: 'old',
        status: 'open',
        priority: 0,
        created_at: 1_000,
        updated_at: 1_000
      },
      {
        id: 'RD-new',
        title: 'new',
        status: 'open',
        priority: 2,
        created_at: 2_000,
        updated_at: 2_000
      }
    ]);
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores
    });
    await view.load();

    // Default created_desc: newest first.
    let ids = Array.from(mount.querySelectorAll('#ready-col .board-card')).map(
      (el) => el.getAttribute('data-issue-id')
    );
    expect(ids).toEqual(['RD-new', 'RD-old']);

    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('.board-filter__sort')
    );
    select.value = 'created_asc';
    select.dispatchEvent(new Event('change', { bubbles: true }));

    ids = Array.from(mount.querySelectorAll('#ready-col .board-card')).map(
      (el) => el.getAttribute('data-issue-id')
    );
    expect(ids).toEqual(['RD-old', 'RD-new']);
    expect(window.localStorage.getItem('beads-ui.board.sort')).toBe(
      'created_asc'
    );
  });

  test('same-column drop outside manual mode is blocked (no transport call)', async () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const transport = vi.fn().mockResolvedValue({});
    const uiOrderStore = createUiOrderStore();
    const stores = createTestIssueStores();
    seed(stores, 'tab:board:ready', [
      {
        id: 'RD-1',
        title: 'r1',
        status: 'open',
        created_at: 30_000,
        updated_at: 30_000
      },
      {
        id: 'RD-2',
        title: 'r2',
        status: 'open',
        created_at: 20_000,
        updated_at: 20_000
      }
    ]);
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores,
      transport,
      uiOrderStore
    });
    await view.load();

    // Default mode is created_desc (non-manual) — same-column drop must not
    // send ui-order-set or update-status.
    const col = /** @type {HTMLElement} */ (mount.querySelector('#ready-col'));
    const target = /** @type {HTMLElement} */ (
      col.querySelector('.board-card[data-issue-id="RD-1"]')
    );
    const dt = {
      getData: () => 'RD-2',
      setData: () => {},
      effectAllowed: 'move',
      dropEffect: 'move'
    };
    const drop = new Event('drop', { bubbles: true, cancelable: true });
    // @ts-expect-error test shim
    drop.dataTransfer = dt;
    target.dispatchEvent(drop);

    expect(transport).not.toHaveBeenCalled();
  });
});

describe('views/board label filter', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @returns {{ mount: HTMLElement, view: { load: () => Promise<void>, clear: () => void } }}
   */
  function mountBoardWithLabels() {
    const stores = createTestIssueStores();
    const now = Date.now();
    seed(stores, 'tab:board:ready', [
      {
        id: 'RD-1',
        title: 'one',
        status: 'open',
        labels: ['frontend', 'has:spec'],
        updated_at: now
      },
      {
        id: 'RD-2',
        title: 'two',
        status: 'open',
        labels: ['backend'],
        updated_at: now
      },
      { id: 'RD-3', title: 'three', status: 'open', updated_at: now }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const view = createBoardView(mount, {
      gotoIssue: vi.fn(),
      issueStores: stores
    });
    return { mount, view };
  }

  /**
   * @param {HTMLElement} mount
   * @returns {string[]}
   */
  function readyIds(mount) {
    return Array.from(mount.querySelectorAll('#ready-col .board-card')).map(
      (el) => String(el.getAttribute('data-issue-id'))
    );
  }

  /**
   * @param {HTMLElement} mount
   * @param {string} label
   */
  function toggleLabel(mount, label) {
    if (!mount.querySelector('.board-filter__label-menu')) {
      /** @type {HTMLElement} */ (
        mount.querySelector('.board-filter__label-btn')
      ).click();
    }
    const row = Array.from(
      mount.querySelectorAll('.board-filter__label-row')
    ).find((el) => String(el.textContent || '').trim() === label);
    const box = /** @type {HTMLInputElement} */ (
      /** @type {HTMLElement} */ (row).querySelector('input')
    );
    box.checked = !box.checked;
    box.dispatchEvent(new Event('change', { bubbles: true }));
  }

  test('lists every label present in the loaded issues', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();

    /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__label-btn')
    ).click();

    const options = Array.from(
      mount.querySelectorAll('.board-filter__label-row')
    ).map((el) => String(el.textContent || '').trim());
    expect(options).toEqual(['backend', 'frontend', 'has:spec']);
  });

  test('offers a label the display policy hides', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();

    /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__label-btn')
    ).click();

    const options = Array.from(
      mount.querySelectorAll('.board-filter__label-row')
    ).map((el) => String(el.textContent || '').trim());
    expect(options).toContain('has:spec');
  });

  test('narrows the board to issues carrying the selected label', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();

    toggleLabel(mount, 'frontend');

    expect(readyIds(mount)).toEqual(['RD-1']);
  });

  test('matches any selected label (OR) when several are selected', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();

    toggleLabel(mount, 'frontend');
    toggleLabel(mount, 'backend');

    expect(readyIds(mount).sort()).toEqual(['RD-1', 'RD-2']);
  });

  test('restores the full board when the last label is deselected', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();
    toggleLabel(mount, 'frontend');

    toggleLabel(mount, 'frontend');

    expect(readyIds(mount).sort()).toEqual(['RD-1', 'RD-2', 'RD-3']);
  });

  test('clears every selection with the clear button', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();
    toggleLabel(mount, 'frontend');

    /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__label-clear')
    ).click();

    expect(readyIds(mount).sort()).toEqual(['RD-1', 'RD-2', 'RD-3']);
  });

  test('closes the popover on Escape', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();
    /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__label-btn')
    ).click();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(mount.querySelector('.board-filter__label-menu')).toBeNull();
  });

  test('closes the popover on an outside mousedown', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();
    /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__label-btn')
    ).click();

    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(mount.querySelector('.board-filter__label-menu')).toBeNull();
  });

  test('closes the popover when a card elsewhere on the board is clicked', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();
    /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__label-btn')
    ).click();

    /** @type {HTMLElement} */ (
      mount.querySelector('.board-card')
    ).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(mount.querySelector('.board-filter__label-menu')).toBeNull();
  });

  test('keeps the popover open while its own checkboxes are clicked', async () => {
    const { mount, view } = mountBoardWithLabels();
    await view.load();
    /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__label-btn')
    ).click();

    /** @type {HTMLElement} */ (
      mount.querySelector('.board-filter__label-row')
    ).dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(mount.querySelector('.board-filter__label-menu')).not.toBeNull();
  });
});

describe('views/board blocked column composition', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    window.localStorage.clear();
  });

  /**
   * @returns {HTMLElement}
   */
  function mountBlockedBoard() {
    const stores = createTestIssueStores();
    const now = Date.now();
    // The Blocked subscription merges two sources: an OPEN issue held up by
    // dependencies, and an issue stored as `status=blocked` (external wait).
    seed(stores, 'tab:board:blocked', [
      {
        id: 'DEP-1',
        title: 'dependency blocked',
        status: 'open',
        blocked_info: { external: false, reason: null, blockers: ['X-1'] },
        updated_at: now
      },
      {
        id: 'EXT-1',
        title: 'external blocked',
        status: 'blocked',
        blocked_info: { external: true, reason: '릴리스 대기', blockers: [] },
        updated_at: now
      }
    ]);
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    createBoardView(mount, { gotoIssue: vi.fn(), issueStores: stores }).load();
    return mount;
  }

  test('keeps a stored status=blocked issue in the column', () => {
    const mount = mountBlockedBoard();

    const ids = Array.from(
      mount.querySelectorAll('#blocked-col .board-card')
    ).map((el) => String(el.getAttribute('data-issue-id')));
    expect(ids.sort()).toEqual(['DEP-1', 'EXT-1']);
  });

  test('renders the external blocked chip for a stored blocked issue', () => {
    const mount = mountBlockedBoard();

    const chips = Array.from(
      mount.querySelectorAll('#blocked-col .ctl-chip--blocked')
    ).map((el) => String(el.textContent || '').trim());
    expect(chips).toEqual(['⏸ blocked: 릴리스 대기']);
  });

  test('renders the dependency blocked chip for an open blocked issue', () => {
    const mount = mountBlockedBoard();

    const chips = Array.from(
      mount.querySelectorAll('#blocked-col .ctl-chip--blocked-dep')
    ).map((el) => String(el.textContent || '').trim());
    expect(chips).toEqual(['⛓ blocked: X-1']);
  });
});
