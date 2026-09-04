import { describe, expect, test } from 'vitest';
import {
  EMPTY_CELL,
  formatCostMedian,
  formatDuration,
  formatOutcome,
  formatPrice,
  formatRate,
  formatReview,
  formatTokens,
  formatVerify,
  sampleNote
} from './format.js';

describe('views/compare/format', () => {
  test('coarsens elapsed time to the unit a preset is compared in', () => {
    expect(formatDuration(45_000)).toBe('45초');
    expect(formatDuration(600_000)).toBe('10분');
    expect(formatDuration(3_960_000)).toBe('1시간 6분');
  });

  test('draws an empty cell for a row with no elapsed time', () => {
    expect(formatDuration(null)).toBe(EMPTY_CELL);
  });

  test('abbreviates the token total', () => {
    expect(formatTokens(940)).toBe('τ 940');
    expect(formatTokens(12_400)).toBe('τ 12.4k');
    expect(formatTokens(2_500_000)).toBe('τ 2.5M');
  });

  test('names the unpriced legs beside a partial price', () => {
    expect(formatPrice({ total_cost_usd: 1.234, unpriced_leg_count: 2 })).toBe(
      '$1.23 (+2 leg 단가 없음)'
    );
  });

  test('draws an empty price cell when nothing could be priced', () => {
    expect(formatPrice(null)).toBe(EMPTY_CELL);
    expect(formatPrice({ total_cost_usd: null })).toBe(EMPTY_CELL);
  });

  test('suffixes a median with its sample only when rows are missing', () => {
    expect(sampleNote({ sample: 3, total: 5 })).toBe('n=3/5');
    expect(sampleNote({ sample: 5, total: 5 })).toBe('');
    expect(sampleNote({ sample: 0, total: 5 })).toBe('');
  });

  test('renders 미상 for an unjudged verification', () => {
    expect(formatVerify('pass')).toBe('통과');
    expect(formatVerify('fail')).toBe('실패');
    expect(formatVerify(null)).toBe('미상');
  });

  test('says nothing in the outcome cell for a plain success', () => {
    expect(formatOutcome({ failed: false, is_retry: false })).toBe(EMPTY_CELL);
    expect(formatOutcome({ failed: true, cause: 'timeout' })).toBe(
      '실패 · timeout'
    );
    expect(formatOutcome({ failed: false, is_retry: true })).toBe('재시도');
  });

  test('renders the review counts and round together', () => {
    expect(formatReview({ blocking: 0, minor: 3, round: 2 })).toBe(
      'b0/m3 · r2'
    );
    expect(formatReview(null)).toBe(EMPTY_CELL);
  });

  test('renders rates and cost medians', () => {
    expect(formatRate(0.666)).toBe('67%');
    expect(formatRate(null)).toBe(EMPTY_CELL);
    expect(formatCostMedian(1.5)).toBe('$1.50');
    expect(formatCostMedian(null)).toBe(EMPTY_CELL);
  });
});
