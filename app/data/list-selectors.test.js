import { describe, expect, test } from 'vitest';
import { createListSelectors } from './list-selectors.js';
import { createSubscriptionIssueStore } from './subscription-issue-store.js';
import { createUiOrderStore } from './ui-order-store.js';

/**
 * Minimal per-subscription stores facade for tests.
 */
function createTestIssueStores() {
  /** @type {Map<string, ReturnType<typeof createSubscriptionIssueStore>>} */
  const stores = new Map();
  /** @type {Set<() => void>} */
  const listeners = new Set();

  /**
   * @param {string} id
   */
  function getStore(id) {
    let s = stores.get(id);
    if (!s) {
      s = createSubscriptionIssueStore(id);
      stores.set(id, s);
      // Fan out store-level events to global listeners
      s.subscribe(() => {
        for (const fn of Array.from(listeners)) {
          try {
            fn();
          } catch {
            // ignore
          }
        }
      });
    }
    return s;
  }

  return {
    getStore,
    /**
     * @param {string} id
     */
    snapshotFor(id) {
      return getStore(id).snapshot();
    },
    /**
     * @param {() => void} fn
     */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

/**
 * Helper to build stores and selectors bound together.
 */
function setup() {
  const issueStores = createTestIssueStores();
  const selectors = createListSelectors(/** @type {any} */ (issueStores));
  return { issueStores, selectors };
}

describe('list-selectors', () => {
  test('returns empty arrays for empty stores', async () => {
    const { selectors } = setup();
    expect(selectors.selectBoardColumn('tab:board:ready', 'ready')).toEqual([]);
  });

  test('selectBoardColumn sorts open columns by created_at desc and closed by closed_at desc', async () => {
    const { issueStores, selectors } = setup();
    // Ready
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: [
        {
          id: 'R1',
          priority: 2,
          created_at: 10_000,
          updated_at: 10_000,
          closed_at: null
        },
        {
          id: 'R2',
          priority: 1,
          created_at: 9_000,
          updated_at: 9_000,
          closed_at: null
        },
        {
          id: 'R3',
          priority: 1,
          created_at: 11_000,
          updated_at: 11_000,
          closed_at: null
        }
      ]
    });
    // In progress
    issueStores.getStore('tab:board:in-progress').applyPush({
      type: 'snapshot',
      id: 'tab:board:in-progress',
      revision: 1,
      issues: [
        { id: 'P1', created_at: 8_000, updated_at: 8_000, closed_at: null },
        { id: 'P2', created_at: 9_000, updated_at: 9_000, closed_at: null },
        { id: 'P3', created_at: 7_000, updated_at: 7_000, closed_at: null }
      ]
    });
    // Closed
    issueStores.getStore('tab:board:closed').applyPush({
      type: 'snapshot',
      id: 'tab:board:closed',
      revision: 1,
      issues: [
        { id: 'C1', created_at: 1_000, closed_at: 5_000, updated_at: 20_000 },
        { id: 'C2', created_at: 1_100, closed_at: 6_000, updated_at: 20_000 },
        { id: 'C3', created_at: 900, closed_at: 4_000, updated_at: 7_300 }
      ]
    });

    const ready = selectors
      .selectBoardColumn('tab:board:ready', 'ready')
      .map((x) => x.id);
    expect(ready).toEqual(['R3', 'R1', 'R2']);

    const inprog = selectors
      .selectBoardColumn('tab:board:in-progress', 'in_progress')
      .map((x) => x.id);
    expect(inprog).toEqual(['P2', 'P1', 'P3']);

    const closed = selectors
      .selectBoardColumn('tab:board:closed', 'closed')
      .map((x) => x.id);
    // closed_at desc: C2, C1, C3
    expect(closed).toEqual(['C2', 'C1', 'C3']);
  });

  test('subscribe triggers once per issues envelope', async () => {
    const { issueStores, selectors } = setup();
    let calls = 0;
    const off = selectors.subscribe(() => {
      calls += 1;
    });
    const st = issueStores.getStore('tab:board:ready');
    st.applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues: []
    });
    expect(calls).toBe(1);
    off();
  });
});

describe('list-selectors with a ui-order store', () => {
  /**
   * @param {any[]} issues
   */
  function setupWithOrder(issues) {
    const issueStores = createTestIssueStores();
    const uiOrderStore = createUiOrderStore();
    const selectors = createListSelectors(
      /** @type {any} */ (issueStores),
      /** @type {any} */ (uiOrderStore)
    );
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues
    });
    return { issueStores, uiOrderStore, selectors };
  }

  test('non-closed columns sort by effective rank, overriding the priority key', () => {
    const { uiOrderStore, selectors } = setupWithOrder([
      { id: 'R1', priority: 0, created_at: 10_000, updated_at: 10_000 },
      { id: 'R2', priority: 1, created_at: 9_000, updated_at: 9_000 },
      { id: 'R3', priority: 2, created_at: 11_000, updated_at: 11_000 }
    ]);
    // Hand-place R2 first and R1 last; R3 stays unranked (-created_at → -11000).
    uiOrderStore.set({ revision: 3, order: { R2: -1_000_000, R1: 1_000_000 } });
    const ready = selectors
      .selectBoardColumn('tab:board:ready', 'ready')
      .map((x) => x.id);
    // effRanks: R2 -1e6, R3 -11000, R1 1e6 → ascending R2, R3, R1
    // (priority would have put R1(p0) first — manual order wins).
    expect(ready).toEqual(['R2', 'R3', 'R1']);
  });

  test('unranked issues keep newest-first when the order map is empty', () => {
    const { selectors } = setupWithOrder([
      { id: 'R1', priority: 0, created_at: 10_000, updated_at: 10_000 },
      { id: 'R2', priority: 1, created_at: 9_000, updated_at: 9_000 },
      { id: 'R3', priority: 2, created_at: 11_000, updated_at: 11_000 }
    ]);
    const ready = selectors
      .selectBoardColumn('tab:board:ready', 'ready')
      .map((x) => x.id);
    // No order set → all -created_at → newest first: R3, R1, R2.
    expect(ready).toEqual(['R3', 'R1', 'R2']);
  });

  test('subscribe also fires on ui-order store changes', () => {
    const { uiOrderStore, selectors } = setupWithOrder([]);
    let calls = 0;
    const off = selectors.subscribe(() => {
      calls += 1;
    });
    uiOrderStore.set({ revision: 1, order: { A: 5 } });
    expect(calls).toBe(1);
    off();
    uiOrderStore.set({ revision: 2, order: { A: 6 } });
    expect(calls).toBe(1);
  });
});

describe('list-selectors sort_mode (UX v3 spec §3)', () => {
  /**
   * @param {any[]} issues
   */
  function setupWithOrderAndIssues(issues) {
    const issueStores = createTestIssueStores();
    const uiOrderStore = createUiOrderStore();
    const selectors = createListSelectors(
      /** @type {any} */ (issueStores),
      /** @type {any} */ (uiOrderStore)
    );
    issueStores.getStore('tab:board:ready').applyPush({
      type: 'snapshot',
      id: 'tab:board:ready',
      revision: 1,
      issues
    });
    return { uiOrderStore, selectors };
  }

  const ISSUES = [
    {
      id: 'A',
      priority: 2,
      created_at: 30_000,
      updated_at: 10_000,
      closed_at: null
    },
    {
      id: 'B',
      priority: 0,
      created_at: 20_000,
      updated_at: 40_000,
      closed_at: null
    },
    {
      id: 'C',
      priority: 1,
      created_at: 10_000,
      updated_at: 20_000,
      closed_at: null
    }
  ];

  test('created_desc ignores the rank map (newest created first)', () => {
    const { uiOrderStore, selectors } = setupWithOrderAndIssues(ISSUES);
    uiOrderStore.set({ revision: 1, order: { C: -1e15 } });
    const ids = selectors
      .selectBoardColumn('tab:board:ready', 'ready', 'created_desc')
      .map((x) => x.id);
    expect(ids).toEqual(['A', 'B', 'C']);
  });

  test('created_asc orders oldest created first', () => {
    const { selectors } = setupWithOrderAndIssues(ISSUES);
    const ids = selectors
      .selectBoardColumn('tab:board:ready', 'ready', 'created_asc')
      .map((x) => x.id);
    expect(ids).toEqual(['C', 'B', 'A']);
  });

  test('updated_desc orders most recently updated first', () => {
    const { selectors } = setupWithOrderAndIssues(ISSUES);
    const ids = selectors
      .selectBoardColumn('tab:board:ready', 'ready', 'updated_desc')
      .map((x) => x.id);
    expect(ids).toEqual(['B', 'C', 'A']);
  });

  test('priority orders P0 first', () => {
    const { selectors } = setupWithOrderAndIssues(ISSUES);
    const ids = selectors
      .selectBoardColumn('tab:board:ready', 'ready', 'priority')
      .map((x) => x.id);
    expect(ids).toEqual(['B', 'C', 'A']);
  });

  test('manual uses the shared rank map', () => {
    const { uiOrderStore, selectors } = setupWithOrderAndIssues(ISSUES);
    uiOrderStore.set({ revision: 1, order: { C: -1e15 } });
    const ids = selectors
      .selectBoardColumn('tab:board:ready', 'ready', 'manual')
      .map((x) => x.id);
    expect(ids).toEqual(['C', 'A', 'B']);
  });

  test('omitted sort_mode keeps the legacy manual-rank behaviour (Worker seam)', () => {
    const { uiOrderStore, selectors } = setupWithOrderAndIssues(ISSUES);
    uiOrderStore.set({ revision: 1, order: { C: -1e15 } });
    const ids = selectors
      .selectBoardColumn('tab:board:ready', 'ready')
      .map((x) => x.id);
    expect(ids).toEqual(['C', 'A', 'B']);
  });

  test('closed keeps closed_at desc even with a sort_mode', () => {
    const issueStores = createTestIssueStores();
    const uiOrderStore = createUiOrderStore();
    const selectors = createListSelectors(
      /** @type {any} */ (issueStores),
      /** @type {any} */ (uiOrderStore)
    );
    issueStores.getStore('tab:board:closed').applyPush({
      type: 'snapshot',
      id: 'tab:board:closed',
      revision: 1,
      issues: [
        { id: 'C1', created_at: 1_000, closed_at: 5_000, updated_at: 1 },
        { id: 'C2', created_at: 2_000, closed_at: 9_000, updated_at: 2 }
      ]
    });
    const ids = selectors
      .selectBoardColumn('tab:board:closed', 'closed', 'created_asc')
      .map((x) => x.id);
    expect(ids).toEqual(['C2', 'C1']);
  });
});
