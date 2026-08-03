import { describe, expect, test } from 'vitest';
import { selectCurrentChild } from './current-child.js';

describe('utils/current-child', () => {
  test('returns null for an empty list', () => {
    const result = selectCurrentChild([]);

    expect(result).toBe(null);
  });

  test('returns null when no child is in_progress', () => {
    const children = [
      { id: 'A-1', status: 'resolved', updated_at: 30 },
      { id: 'A-2', status: 'open', updated_at: 20 }
    ];

    const result = selectCurrentChild(children);

    expect(result).toBe(null);
  });

  test('picks the most recently updated in_progress child', () => {
    const children = [
      { id: 'A-1', status: 'in_progress', updated_at: 10 },
      { id: 'A-2', status: 'in_progress', updated_at: 30 },
      { id: 'A-3', status: 'in_progress', updated_at: 20 }
    ];

    const result = selectCurrentChild(children);

    expect(result?.id).toBe('A-2');
  });

  test('breaks an updated_at tie by ascending id', () => {
    const children = [
      { id: 'A-9', status: 'in_progress', updated_at: 30 },
      { id: 'A-2', status: 'in_progress', updated_at: 30 }
    ];

    const result = selectCurrentChild(children);

    expect(result?.id).toBe('A-2');
  });

  test('ignores children whose status is not in_progress', () => {
    const children = [
      { id: 'A-1', status: 'closed', updated_at: 99 },
      { id: 'A-2', status: 'in_progress', updated_at: 10 }
    ];

    const result = selectCurrentChild(children);

    expect(result?.id).toBe('A-2');
  });

  test('accepts ISO string timestamps', () => {
    const children = [
      {
        id: 'A-1',
        status: 'in_progress',
        updated_at: '2026-08-03T01:00:00Z'
      },
      { id: 'A-2', status: 'in_progress', updated_at: '2026-08-03T02:00:00Z' }
    ];

    const result = selectCurrentChild(children);

    expect(result?.id).toBe('A-2');
  });

  test('treats a missing updated_at as the oldest', () => {
    const children = [
      { id: 'A-1', status: 'in_progress' },
      { id: 'A-2', status: 'in_progress', updated_at: 1 }
    ];

    const result = selectCurrentChild(children);

    expect(result?.id).toBe('A-2');
  });

  test('returns null for a non-array input', () => {
    const result = selectCurrentChild(/** @type {any} */ (null));

    expect(result).toBe(null);
  });
});
