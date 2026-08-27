import { describe, expect, test, vi } from 'vitest';
import {
  SubscriptionRegistry,
  computeDelta,
  keyOf,
  toItemsMap
} from './subscriptions.js';

describe('subscriptions registry', () => {
  test('keyOf sorts params for stable keys', () => {
    const a = keyOf({ type: 'list', params: { status: 'open', limit: 50 } });
    const b = keyOf({ type: 'list', params: { limit: 50, status: 'open' } });
    expect(a).toBe('list?limit=50&status=open');
    expect(b).toBe('list?limit=50&status=open');
  });

  test('computeDelta returns added/updated/removed', () => {
    const prev = toItemsMap([
      { id: 'UI-1', updated_at: 1 },
      { id: 'UI-2', updated_at: 2 }
    ]);
    const next = toItemsMap([
      { id: 'UI-2', updated_at: 3 },
      { id: 'UI-3', updated_at: 1 }
    ]);
    const d = computeDelta(prev, next);
    expect(d.added).toEqual(['UI-3']);
    expect(d.updated).toEqual(['UI-2']);
    expect(d.removed).toEqual(['UI-1']);
  });

  test('computeDelta returns no changes for unchanged maps', () => {
    const prev = toItemsMap([
      { id: 'A', updated_at: 10, closed_at: null },
      { id: 'B', updated_at: 20, closed_at: null }
    ]);
    const next = toItemsMap([
      { id: 'A', updated_at: 10, closed_at: null },
      { id: 'B', updated_at: 20, closed_at: null }
    ]);
    const d = computeDelta(prev, next);
    expect(d.added).toEqual([]);
    expect(d.updated).toEqual([]);
    expect(d.removed).toEqual([]);
  });

  test('computeDelta handles empty sets', () => {
    const empty = toItemsMap([]);
    const some = toItemsMap([
      { id: 'X', updated_at: 1, closed_at: null },
      { id: 'Y', updated_at: 2, closed_at: null }
    ]);

    const d1 = computeDelta(empty, some);
    expect(d1.added.sort()).toEqual(['X', 'Y']);
    expect(d1.updated).toEqual([]);
    expect(d1.removed).toEqual([]);

    const d2 = computeDelta(some, empty);
    expect(d2.added).toEqual([]);
    expect(d2.updated).toEqual([]);
    expect(d2.removed.sort()).toEqual(['X', 'Y']);
  });

  test('computeDelta returns only updates when ids unchanged', () => {
    const prev = toItemsMap([
      { id: 'A', updated_at: 1, closed_at: null },
      { id: 'B', updated_at: 2, closed_at: null }
    ]);
    const next = toItemsMap([
      { id: 'A', updated_at: 3, closed_at: null },
      { id: 'B', updated_at: 5, closed_at: null }
    ]);
    const d = computeDelta(prev, next);
    expect(d.added).toEqual([]);
    expect(d.removed).toEqual([]);
    expect(d.updated.sort()).toEqual(['A', 'B']);
  });

  test('attach/detach and disconnect preserves empty entry for caching', () => {
    const reg = new SubscriptionRegistry();
    /** @type {any} */
    const ws_a = { OPEN: 1, readyState: 1, send: vi.fn() };
    /** @type {any} */
    const ws_b = { OPEN: 1, readyState: 1, send: vi.fn() };

    const spec = { type: 'list', params: { status: 'open' } };
    const { key } = reg.attach(spec, ws_a);
    reg.attach(spec, ws_b);

    const entry1 = reg.get(key);
    expect(entry1 && entry1.subscribers.size).toBe(2);

    const removed_a = reg.detach(spec, ws_a);
    expect(removed_a).toBe(true);
    const entry2 = reg.get(key);
    expect(entry2 && entry2.subscribers.size).toBe(1);

    // Disconnecting B should sweep it but preserve entry for caching
    reg.onDisconnect(ws_b);
    const entry3 = reg.get(key);
    expect(entry3).not.toBeNull();
    expect(entry3?.subscribers.size).toBe(0);
  });

  test('applyItems stores map and returns correct delta', () => {
    const reg = new SubscriptionRegistry();
    /** @type {any} */
    const ws = { OPEN: 1, readyState: 1, send: vi.fn() };
    const spec = { type: 'list', params: { ready: true } };
    const { key } = reg.attach(spec, ws);

    const d1 = reg.applyItems(key, [
      { id: 'A', updated_at: 1 },
      { id: 'B', updated_at: 1 }
    ]);
    expect(d1.added.sort()).toEqual(['A', 'B']);
    expect(d1.updated).toEqual([]);
    expect(d1.removed).toEqual([]);

    const d2 = reg.applyItems(key, [
      { id: 'B', updated_at: 2 },
      { id: 'C', updated_at: 1 }
    ]);
    expect(d2.added).toEqual(['C']);
    expect(d2.updated).toEqual(['B']);
    expect(d2.removed).toEqual(['A']);
  });

  test('onDisconnect removes subscriber but preserves entry for caching', () => {
    const reg = new SubscriptionRegistry();
    /** @type {any} */
    const ws = { OPEN: 1, readyState: 1, send: vi.fn() };
    const spec = { type: 'cache-test' };
    const { key } = reg.attach(spec, ws);

    expect(reg.get(key)?.subscribers.size).toBe(1);

    reg.onDisconnect(ws);

    const entry = reg.get(key);
    expect(entry).not.toBeNull();
    expect(entry?.subscribers.size).toBe(0);
  });

  test('generation counter starts at 0 and increments on clear', () => {
    const reg = new SubscriptionRegistry();
    expect(reg.generation).toBe(0);

    reg.clear();
    expect(reg.generation).toBe(1);

    reg.clear();
    expect(reg.generation).toBe(2);
  });

  test('clear removes all entries and increments generation', () => {
    const reg = new SubscriptionRegistry();
    /** @type {any} */
    const ws = { OPEN: 1, readyState: 1, send: vi.fn() };
    const { key } = reg.attach({ type: 'gen-test' }, ws);
    expect(reg.get(key)).not.toBeNull();

    const gen_before = reg.generation;
    reg.clear();
    expect(reg.get(key)).toBeNull();
    expect(reg.generation).toBe(gen_before + 1);
  });

  test('createEntry includes cachedSnapshot initialized to null', () => {
    const reg = new SubscriptionRegistry();
    const spec = { type: 'test-cache' };

    const { entry } = reg.ensure(spec);

    expect(entry.cachedSnapshot).toBeNull();
  });
});

describe('subscription delta deps_signature', () => {
  const DETAIL_KEY = keyOf({ type: 'issue-detail', params: { id: 'UI-1' } });

  test('computeDelta reports an update when a dependents id changes', () => {
    const prev = toItemsMap(
      [
        {
          id: 'UI-1',
          updated_at: 10,
          closed_at: null,
          dependents: [
            {
              id: 'UI-2',
              dependency_type: 'blocks',
              status: 'open',
              title: '후행 A'
            }
          ]
        }
      ],
      DETAIL_KEY
    );
    const next = toItemsMap(
      [
        {
          id: 'UI-1',
          updated_at: 10,
          closed_at: null,
          dependents: [
            {
              id: 'UI-3',
              dependency_type: 'blocks',
              status: 'open',
              title: '후행 A'
            }
          ]
        }
      ],
      DETAIL_KEY
    );

    const d = computeDelta(prev, next);

    expect(d.updated).toEqual(['UI-1']);
  });

  test('computeDelta reports an update when a dependents status or title changes', () => {
    const prev = toItemsMap(
      [
        {
          id: 'UI-1',
          updated_at: 10,
          closed_at: null,
          dependents: [
            {
              id: 'UI-2',
              dependency_type: 'blocks',
              status: 'open',
              title: '후행 A'
            }
          ]
        }
      ],
      DETAIL_KEY
    );
    const next = toItemsMap(
      [
        {
          id: 'UI-1',
          updated_at: 10,
          closed_at: null,
          dependents: [
            {
              id: 'UI-2',
              dependency_type: 'blocks',
              status: 'closed',
              title: '후행 B'
            }
          ]
        }
      ],
      DETAIL_KEY
    );

    const d = computeDelta(prev, next);

    expect(d.updated).toEqual(['UI-1']);
  });

  test('computeDelta reports an update when a dependencies edge type changes', () => {
    const prev = toItemsMap(
      [
        {
          id: 'UI-1',
          updated_at: 10,
          closed_at: null,
          dependencies: [
            {
              id: 'UI-9',
              dependency_type: 'blocks',
              status: 'open',
              title: '선행'
            }
          ]
        }
      ],
      DETAIL_KEY
    );
    const next = toItemsMap(
      [
        {
          id: 'UI-1',
          updated_at: 10,
          closed_at: null,
          dependencies: [
            {
              id: 'UI-9',
              dependency_type: 'related',
              status: 'open',
              title: '선행'
            }
          ]
        }
      ],
      DETAIL_KEY
    );

    const d = computeDelta(prev, next);

    expect(d.updated).toEqual(['UI-1']);
  });

  test('computeDelta reports no update when dependency edges are unchanged', () => {
    const edges = [
      { id: 'UI-2', dependency_type: 'blocks', status: 'open', title: '후행 A' }
    ];
    const prev = toItemsMap(
      [{ id: 'UI-1', updated_at: 10, closed_at: null, dependents: edges }],
      DETAIL_KEY
    );
    const next = toItemsMap(
      [{ id: 'UI-1', updated_at: 10, closed_at: null, dependents: edges }],
      DETAIL_KEY
    );

    const d = computeDelta(prev, next);

    expect(d.updated).toEqual([]);
  });

  test('computeDelta keeps timestamp comparison for items without dependency fields', () => {
    const prev = toItemsMap(
      [
        { id: 'A', updated_at: 1, closed_at: null },
        { id: 'B', updated_at: 2, closed_at: null }
      ],
      DETAIL_KEY
    );
    const next = toItemsMap(
      [
        { id: 'A', updated_at: 1, closed_at: null },
        { id: 'B', updated_at: 5, closed_at: null }
      ],
      DETAIL_KEY
    );

    const d = computeDelta(prev, next);

    expect(d.updated).toEqual(['B']);
  });

  test('toItemsMap treats a malformed dependents value as no signature', () => {
    const map = toItemsMap(
      [
        {
          id: 'UI-1',
          updated_at: 10,
          closed_at: null,
          dependents: /** @type {any} */ ('nope')
        }
      ],
      DETAIL_KEY
    );

    const meta = map.get('UI-1');

    expect(meta && meta.deps_signature).toBe('');
  });

  test('applyItems ignores dependency edges on a non-detail subscription key', () => {
    const reg = new SubscriptionRegistry();
    const { key } = reg.ensure({ type: 'all-issues' });
    reg.applyItems(key, [
      {
        id: 'UI-1',
        updated_at: 10,
        closed_at: null,
        dependencies: [
          {
            id: 'UI-9',
            dependency_type: 'blocks',
            status: 'open',
            title: '선행'
          }
        ]
      }
    ]);

    const d = reg.applyItems(key, [
      {
        id: 'UI-1',
        updated_at: 10,
        closed_at: null,
        dependencies: [
          {
            id: 'UI-8',
            dependency_type: 'related',
            status: 'closed',
            title: '다른 선행'
          }
        ]
      }
    ]);

    expect(d.updated).toEqual([]);
  });

  test('applyItems reports an update on an issue-detail key when edges change', () => {
    const reg = new SubscriptionRegistry();
    const { key } = reg.ensure({
      type: 'issue-detail',
      params: { id: 'UI-1' }
    });
    reg.applyItems(key, [
      {
        id: 'UI-1',
        updated_at: 10,
        closed_at: null,
        dependents: [
          {
            id: 'UI-2',
            dependency_type: 'blocks',
            status: 'open',
            title: '후행'
          }
        ]
      }
    ]);

    const d = reg.applyItems(key, [
      {
        id: 'UI-1',
        updated_at: 10,
        closed_at: null,
        dependents: [
          {
            id: 'UI-3',
            dependency_type: 'blocks',
            status: 'open',
            title: '후행'
          }
        ]
      }
    ]);

    expect(d.updated).toEqual(['UI-1']);
  });
});
