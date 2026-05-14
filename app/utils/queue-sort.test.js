import { describe, expect, test } from 'vitest';
import {
  nextTailSortKey,
  parseSortKey,
  rebalanceSortKeys,
  sortKeyBetween
} from './queue-sort.js';

describe('queue-sort', () => {
  test('parses invalid sort keys as zero', () => {
    expect(parseSortKey('1000')).toBe(1000);
    expect(parseSortKey('abc')).toBe(0);
    expect(parseSortKey(undefined)).toBe(0);
  });

  test('returns tail sort key in 1000 increments', () => {
    expect(nextTailSortKey([])).toBe(1000);
    expect(nextTailSortKey(['1000', '3000'])).toBe(4000);
  });

  test('returns middle sort key between neighbors', () => {
    expect(sortKeyBetween(1000, 3000)).toEqual({
      sort_key: 2000,
      rebalance: false
    });
  });

  test('requests rebalance when neighboring keys have no integer gap', () => {
    expect(sortKeyBetween(1000, 1001)).toEqual({
      sort_key: 0,
      rebalance: true
    });
  });

  test('rebalances cards into 1000-spaced keys', () => {
    expect(rebalanceSortKeys(['UI-A', 'UI-B', 'UI-C'])).toEqual([
      { id: 'UI-A', sort_key: 1000 },
      { id: 'UI-B', sort_key: 2000 },
      { id: 'UI-C', sort_key: 3000 }
    ]);
  });
});
