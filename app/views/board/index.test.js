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
});
