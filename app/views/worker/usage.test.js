import { describe, expect, test } from 'vitest';
import { formatUsageTotal, lastAttemptUsage, usageTooltip } from './usage.js';

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

  test('excludes the cache fields from the headline total', () => {
    const label = formatUsageTotal({
      input_tokens: 10,
      output_tokens: 5,
      cache_read_input_tokens: 999_999,
      cache_creation_input_tokens: 999_999
    });

    expect(label).toBe('τ 15');
  });

  test('returns null for a missing usage record', () => {
    expect(formatUsageTotal(null)).toBe(null);
  });

  test('returns null when no token field is present', () => {
    expect(formatUsageTotal({ total_cost_usd: 0.4 })).toBe(null);
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
      '입력 8,420 · 출력 3,910 · 캐시읽기 214,300 · 캐시생성 12,800 · $0.42'
    );
  });

  test('omits the cost from the tooltip when none was reported', () => {
    const title = usageTooltip({ input_tokens: 10, output_tokens: 5 });

    expect(title).toBe('입력 10 · 출력 5 · 캐시읽기 0 · 캐시생성 0');
  });
});

describe('views/worker last-attempt usage (UI-raqh §1)', () => {
  test('reads the usage of the LAST attempt recorded for a bead', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { input_tokens: 1 } },
      a2: { attempt_id: 'a2', bead_id: 'UI-1', usage: { input_tokens: 2 } }
    };

    expect(lastAttemptUsage(attempts, 'UI-1')).toMatchObject({
      input_tokens: 2
    });
  });

  test('does not fall back to an older attempt when the last one has none', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-1', usage: { input_tokens: 1 } },
      a2: { attempt_id: 'a2', bead_id: 'UI-1', usage: null }
    };

    expect(lastAttemptUsage(attempts, 'UI-1')).toBe(null);
  });

  test('ignores attempts of other beads', () => {
    const attempts = {
      a1: { attempt_id: 'a1', bead_id: 'UI-2', usage: { input_tokens: 9 } }
    };

    expect(lastAttemptUsage(attempts, 'UI-1')).toBe(null);
  });

  test('returns null for an empty attempts map', () => {
    expect(lastAttemptUsage({}, 'UI-1')).toBe(null);
  });
});
