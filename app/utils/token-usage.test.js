import { describe, expect, test } from 'vitest';
import {
  formatUsageTotal,
  formatUsageTotalWithCost,
  sumAttemptUsage,
  usageTooltip
} from './token-usage.js';

describe('views/worker usage formatting (UI-raqh §1)', () => {
  test('sums input and output into a k-abbreviated total', () => {
    const label = formatUsageTotal({ input_tokens: 8420, output_tokens: 3910 });

    expect(label).toBe('τ 12.3k');
  });

  test('leaves a sub-thousand total unabbreviated', () => {
    const label = formatUsageTotal({ input_tokens: 600, output_tokens: 340 });

    expect(label).toBe('τ 940');
  });

  test('abbreviates a million-scale total with M', () => {
    const label = formatUsageTotal({
      input_tokens: 1_200_000,
      output_tokens: 30_000
    });

    expect(label).toBe('τ 1.2M');
  });

  test('includes the cache fields in the headline total (UI-tq13 §1)', () => {
    const label = formatUsageTotal({
      input_tokens: 10,
      output_tokens: 5,
      cache_read_input_tokens: 999_999,
      cache_creation_input_tokens: 999_999
    });

    expect(label).toBe('τ 2.0M');
  });

  test('returns null for a missing usage record', () => {
    expect(formatUsageTotal(null)).toBe(null);
  });

  test('returns null when no token field is present', () => {
    expect(formatUsageTotal({ total_cost_usd: 0.4 })).toBe(null);
  });

  test('draws a badge for a record carrying only cache counts (UI-tq13 §2)', () => {
    const label = formatUsageTotal({
      cache_read_input_tokens: 4000,
      cache_creation_input_tokens: 1000
    });

    expect(label).toBe('τ 5.0k');
  });

  test('appends the cost to the lane badge when one was reported', () => {
    const label = formatUsageTotalWithCost({
      input_tokens: 8420,
      output_tokens: 3910,
      total_cost_usd: 12.339
    });

    expect(label).toBe('τ 12.3k · $12.34');
  });

  test('leaves the lane badge cost-free when none was reported', () => {
    const label = formatUsageTotalWithCost({
      input_tokens: 8420,
      output_tokens: 3910
    });

    expect(label).toBe('τ 12.3k');
  });

  test('returns null from the lane badge when no token field is present', () => {
    expect(formatUsageTotalWithCost({ total_cost_usd: 0.4 })).toBe(null);
  });

  test('spells out every field in the tooltip', () => {
    const title = usageTooltip({
      input_tokens: 8420,
      output_tokens: 3910,
      cache_read_input_tokens: 214300,
      cache_creation_input_tokens: 12800,
      total_cost_usd: 0.42
    });

    expect(title).toBe(
      '총 239,430\n입력 8,420 · 출력 3,910 · 캐시읽기 214,300 · 캐시생성 12,800 · $0.42'
    );
  });

  test('omits the cost from the tooltip when none was reported', () => {
    const title = usageTooltip({ input_tokens: 10, output_tokens: 5 });

    expect(title).toBe('총 15\n입력 10 · 출력 5 · 캐시읽기 0 · 캐시생성 0');
  });

  test('labels a restart-recovered tally as partial (UI-ediw)', () => {
    const title = usageTooltip({
      input_tokens: 10,
      output_tokens: 5,
      replayed: true
    });

    expect(title).toBe(
      '총 15\n입력 10 · 출력 5 · 캐시읽기 0 · 캐시생성 0\n서버 재시작 복구 — 부분 집계'
    );
  });

  test('leaves the badge total unchanged for a replayed tally', () => {
    const label = formatUsageTotal({
      input_tokens: 8420,
      output_tokens: 3910,
      replayed: true
    });

    expect(label).toBe('τ 12.3k');
  });
});

describe('summed attempt usage (UI-d7pw §1)', () => {
  test('sums every attempt recorded for a bead', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, output_tokens: 10 }
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 2, output_tokens: 20 }
      }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')).toMatchObject({
      input_tokens: 3,
      output_tokens: 30
    });
  });

  test('skips an attempt with no usage but keeps the others', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { input_tokens: 1 } },
      a2: { attempt_id: 'a2', bead_id: 'UI-1', usage: null }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')).toMatchObject({
      input_tokens: 1
    });
  });

  test('ignores attempts of other beads', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-2', usage: { input_tokens: 9 } }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')).toBe(null);
  });

  test('returns null for an empty attempts map', () => {
    expect(sumAttemptUsage({}, 'UI-1')).toBe(null);
  });

  test('returns null when every attempt reported no token field', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { total_cost_usd: 0.4 } },
      a2: { attempt_id: 'a2', bead_id: 'UI-1', usage: null }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')).toBe(null);
  });

  test('sums the cost when every summed attempt reported one', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, total_cost_usd: 0.25 }
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 2, total_cost_usd: 0.75 }
      }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')?.total_cost_usd).toBe(1);
  });

  test('omits the cost when only some attempts reported one (UI-tq13 §7)', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, total_cost_usd: 0.25 }
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 2, total_cost_usd: 0.75 }
      },
      a3: { attempt_id: 'a3', bead_id: 'UI-1', usage: { input_tokens: 4 } }
    };

    const total = sumAttemptUsage(attempts, 'UI-1');

    expect(total).not.toHaveProperty('total_cost_usd');
    expect(total?.input_tokens).toBe(7);
  });

  test('counts a usage-less attempt as neither summed nor cost-missing', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, total_cost_usd: 0.5 }
      },
      a2: { attempt_id: 'a2', bead_id: 'UI-1', usage: null }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')?.total_cost_usd).toBe(0.5);
  });

  test('omits the cost when no attempt reported one', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { input_tokens: 1 } }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')).not.toHaveProperty(
      'total_cost_usd'
    );
  });

  test('propagates replayed when any summed attempt carried it', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { input_tokens: 1 } },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 2, replayed: true }
      }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')?.replayed).toBe(true);
  });

  test('sums the cache fields alongside the headline fields', () => {
    const attempts = {
      a1: {
        attempt_id: 'a1',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, cache_read_input_tokens: 100 }
      },
      a2: {
        attempt_id: 'a2',
        bead_id: 'UI-1',
        usage: { input_tokens: 1, cache_read_input_tokens: 200 }
      }
    };

    expect(sumAttemptUsage(attempts, 'UI-1')?.cache_read_input_tokens).toBe(
      300
    );
  });
});
