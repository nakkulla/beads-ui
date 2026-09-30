import { describe, expect, test, vi } from 'vitest';
import { createSubscriptionIssueStore } from './subscription-issue-store.js';

/**
 * Build n deterministic rows: newest created_at last so the default comparator
 * has real work to do.
 *
 * @param {number} n
 */
function buildRows(n) {
  const rows = [];
  for (let i = 0; i < n; i += 1) {
    rows.push({
      id: `i${String(i).padStart(4, '0')}`,
      title: `row ${i}`,
      priority: 1,
      created_at: i + 1,
      updated_at: 1000 + i,
      closed_at: null
    });
  }
  return rows;
}

describe('subscription issue store', () => {
  test('applies snapshot and returns sorted snapshot', () => {
    const store = createSubscriptionIssueStore('s1');
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 1,
      issues: [
        {
          id: 'A',
          priority: 1,
          created_at: 20_000,
          updated_at: 20_000,
          closed_at: null
        },
        {
          id: 'B',
          priority: 2,
          created_at: 30_000,
          updated_at: 30_000,
          closed_at: null
        }
      ]
    });
    const snap = /** @type {any[]} */ (store.snapshot());
    expect(Array.isArray(snap)).toBe(true);
    expect(snap.map((it) => it.id)).toEqual(['B', 'A']);
    expect(store.size()).toBe(2);
  });

  test('upsert updates in place and preserves identity', () => {
    const store = createSubscriptionIssueStore('s1');
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 1,
      issues: [
        {
          id: 'X',
          title: 'x',
          created_at: 10_000,
          updated_at: 10_000,
          closed_at: null
        }
      ]
    });
    const before = store.getById('X');
    expect(before?.title).toBe('x');
    store.applyPush({
      type: 'upsert',
      id: 's1',
      revision: 2,
      issue: {
        id: 'X',
        title: 'X!',
        created_at: 10_000,
        updated_at: 10_060,
        closed_at: null
      }
    });
    const after = store.getById('X');
    expect(after?.title).toBe('X!');
    expect(after).toBe(before); // identity preserved
  });

  test('ignores stale upsert by revision and timestamp', () => {
    const store = createSubscriptionIssueStore('s1');
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 5,
      issues: [
        {
          id: 'X',
          title: 'x',
          created_at: 10_000,
          updated_at: 10_600,
          closed_at: null
        }
      ]
    });
    // stale revision
    store.applyPush({
      type: 'upsert',
      id: 's1',
      revision: 4,
      issue: {
        id: 'X',
        title: 'old',
        created_at: 10_000,
        updated_at: 10_540,
        closed_at: null
      }
    });
    expect(store.getById('X')?.title).toBe('x');
    // equal revision is ignored
    store.applyPush({
      type: 'upsert',
      id: 's1',
      revision: 5,
      issue: {
        id: 'X',
        title: 'same',
        created_at: 10_000,
        updated_at: 10_660,
        closed_at: null
      }
    });
    expect(store.getById('X')?.title).toBe('x');
    // higher revision but stale timestamp is ignored
    store.applyPush({
      type: 'upsert',
      id: 's1',
      revision: 6,
      issue: {
        id: 'X',
        title: 'stale',
        created_at: 10_000,
        updated_at: 10_000,
        closed_at: null
      }
    });
    expect(store.getById('X')?.title).toBe('x');
  });

  test('delete removes item', () => {
    const store = createSubscriptionIssueStore('s1');
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 1,
      issues: [
        { id: 'A', created_at: 10_000, updated_at: 10_000, closed_at: null },
        { id: 'B', created_at: 10_000, updated_at: 10_000, closed_at: null }
      ]
    });
    store.applyPush({ type: 'delete', id: 's1', revision: 2, issue_id: 'A' });
    expect(store.size()).toBe(1);
    expect(store.getById('A')).toBeUndefined();
    const ids = /** @type {any[]} */ (store.snapshot()).map((x) => x.id);
    expect(ids).toEqual(['B']);
  });

  test('subscribe emits exactly once per applyPush', () => {
    const store = createSubscriptionIssueStore('s1');
    let count = 0;
    store.subscribe(() => {
      count += 1;
    });
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 1,
      issues: [
        { id: 'A', created_at: 10_000, updated_at: 10_000, closed_at: null }
      ]
    });
    store.applyPush({
      type: 'upsert',
      id: 's1',
      revision: 2,
      issue: {
        id: 'A',
        title: 't',
        created_at: 10_000,
        updated_at: 10_060,
        closed_at: null
      }
    });
    expect(count).toBe(2);
  });

  test('dispose clears listeners and state', () => {
    const store = createSubscriptionIssueStore('s1');
    let hit = 0;
    store.subscribe(() => {
      hit += 1;
    });
    store.dispose();
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 1,
      issues: [
        { id: 'A', created_at: 10_000, updated_at: 10_000, closed_at: null }
      ]
    });
    expect(hit).toBe(0);
    expect(store.size()).toBe(0);
  });
  test('skips sort and notify for a stale-by-timestamp upsert', () => {
    const sort = vi.fn((/** @type {any} */ a, /** @type {any} */ b) =>
      a.id < b.id ? -1 : 1
    );
    const store = createSubscriptionIssueStore('s1', { sort });
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 1,
      issues: buildRows(1000)
    });
    let notified = 0;
    store.subscribe(() => {
      notified += 1;
    });
    sort.mockClear();

    store.applyPush({
      type: 'upsert',
      id: 's1',
      revision: 2,
      issue: { id: 'i0500', title: 'old', created_at: 500, updated_at: 1 }
    });

    expect(sort).toHaveBeenCalledTimes(0);
    expect(notified).toBe(0);
  });

  test('skips sort and notify for a delete of an absent id', () => {
    const sort = vi.fn((/** @type {any} */ a, /** @type {any} */ b) =>
      a.id < b.id ? -1 : 1
    );
    const store = createSubscriptionIssueStore('s1', { sort });
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 1,
      issues: buildRows(1000)
    });
    let notified = 0;
    store.subscribe(() => {
      notified += 1;
    });
    sort.mockClear();

    store.applyPush({
      type: 'delete',
      id: 's1',
      revision: 2,
      issue_id: 'missing'
    });

    expect(sort).toHaveBeenCalledTimes(0);
    expect(notified).toBe(0);
  });

  test('ignores a lower revision after a content-unchanged message', () => {
    const store = createSubscriptionIssueStore('s1');
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 5,
      issues: [{ id: 'A', title: 'first', created_at: 10, updated_at: 100 }]
    });
    store.applyPush({
      type: 'delete',
      id: 's1',
      revision: 9,
      issue_id: 'missing'
    });

    store.applyPush({
      type: 'upsert',
      id: 's1',
      revision: 7,
      issue: { id: 'A', title: 'late', created_at: 10, updated_at: 900 }
    });

    expect(/** @type {any} */ (store.getById('A')).title).toBe('first');
  });

  test('notifies and preserves identity and order on a real change', () => {
    const store = createSubscriptionIssueStore('s1');
    store.applyPush({
      type: 'snapshot',
      id: 's1',
      revision: 1,
      issues: buildRows(3)
    });
    const before = /** @type {any} */ (store.getById('i0001'));
    let notified = 0;
    store.subscribe(() => {
      notified += 1;
    });

    store.applyPush({
      type: 'upsert',
      id: 's1',
      revision: 2,
      issue: { id: 'i0001', title: 'renamed', created_at: 2, updated_at: 9999 }
    });

    expect(notified).toBe(1);
    expect(store.getById('i0001')).toBe(before);
    expect(before.title).toBe('renamed');
    expect(store.snapshot().map((/** @type {any} */ i) => i.id)).toEqual([
      'i0002',
      'i0001',
      'i0000'
    ]);
  });
});
