import { describe, expect, test } from 'vitest';
import { buildChildrenIndex, parentIdOf, rollupFor } from './child-rollup.js';

describe('utils/child-rollup parentIdOf', () => {
  test('reads a string parent edge', () => {
    const issue = { id: 'UI-1', parent: 'UI-0' };

    const result = parentIdOf(issue);

    expect(result).toBe('UI-0');
  });

  test('reads the id off an object parent edge', () => {
    const issue = { id: 'UI-1', parent: { id: 'UI-0' } };

    const result = parentIdOf(issue);

    expect(result).toBe('UI-0');
  });

  test('returns an empty string for a top-level issue', () => {
    const issue = { id: 'UI-1' };

    const result = parentIdOf(issue);

    expect(result).toBe('');
  });
});

describe('utils/child-rollup buildChildrenIndex', () => {
  test('groups children under their parent id', () => {
    const issues = [
      { id: 'UI-1', parent: 'UI-0' },
      { id: 'UI-2', parent: { id: 'UI-0' } },
      { id: 'UI-3', parent: 'UI-9' }
    ];

    const index = buildChildrenIndex(issues);

    expect(index.get('UI-0')?.map((c) => c.id)).toEqual(['UI-1', 'UI-2']);
    expect(index.get('UI-9')?.map((c) => c.id)).toEqual(['UI-3']);
  });

  test('omits top-level issues from the index', () => {
    const issues = [{ id: 'UI-0' }, { id: 'UI-1', parent: 'UI-0' }];

    const index = buildChildrenIndex(issues);

    expect(index.has('')).toBe(false);
    expect([...index.keys()]).toEqual(['UI-0']);
  });

  test('keeps the first row when the same id appears twice', () => {
    const issues = [
      { id: 'UI-1', parent: 'UI-0', title: 'first' },
      { id: 'UI-1', parent: 'UI-0', title: 'second' }
    ];

    const index = buildChildrenIndex(issues);

    expect(index.get('UI-0')).toHaveLength(1);
    expect(index.get('UI-0')?.[0].title).toBe('first');
  });

  test('preserves the fields the rollup renders and orders on', () => {
    const issues = [
      {
        id: 'UI-1',
        parent: 'UI-0',
        title: 't',
        status: 'in_progress',
        metadata: { task_order: 2 },
        workflow: { chips: { route: 'quick_fix' } },
        created_at: 10,
        updated_at: 20,
        priority: 1
      }
    ];

    const index = buildChildrenIndex(issues);

    expect(index.get('UI-0')?.[0]).toEqual({
      id: 'UI-1',
      title: 't',
      status: 'in_progress',
      metadata: { task_order: 2 },
      workflow: { chips: { route: 'quick_fix' } },
      created_at: 10,
      updated_at: 20
    });
  });
});

describe('utils/child-rollup rollupFor', () => {
  test('counts resolved and closed children as done', () => {
    const index = buildChildrenIndex([
      { id: 'UI-1', parent: 'UI-0', status: 'resolved' },
      { id: 'UI-2', parent: 'UI-0', status: 'closed' },
      { id: 'UI-3', parent: 'UI-0', status: 'open' }
    ]);

    const rollup = rollupFor(index, 'UI-0');

    expect(rollup.total).toBe(3);
    expect(rollup.count).toBe(2);
  });

  test('picks the current child with the shared selection contract', () => {
    const index = buildChildrenIndex([
      { id: 'UI-1', parent: 'UI-0', status: 'in_progress', updated_at: 10 },
      { id: 'UI-2', parent: 'UI-0', status: 'in_progress', updated_at: 30 }
    ]);

    const rollup = rollupFor(index, 'UI-0');

    expect(rollup.current?.id).toBe('UI-2');
  });

  test('returns a null current child when none is in_progress', () => {
    const index = buildChildrenIndex([
      { id: 'UI-1', parent: 'UI-0', status: 'closed' }
    ]);

    const rollup = rollupFor(index, 'UI-0');

    expect(rollup.current).toBe(null);
  });

  test('returns an empty rollup for a parent with no children', () => {
    const index = buildChildrenIndex([]);

    const rollup = rollupFor(index, 'UI-0');

    expect(rollup).toEqual({
      total: 0,
      count: 0,
      current: null,
      children: []
    });
  });
});
