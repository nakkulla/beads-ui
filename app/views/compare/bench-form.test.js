import { describe, expect, test } from 'vitest';
import {
  BENCH_REVIEWER_FALLBACK,
  benchErrorMessage,
  benchFormReady,
  benchSourceEligibility,
  benchSourceOptions,
  clampRepeats,
  reviewerDefaults
} from './bench-form.js';

/**
 * @param {Record<string, any>} metadata
 * @param {string} [id]
 * @returns {Record<string, any>}
 */
function issue(metadata, id = 'UI-1') {
  return { id, title: `제목 ${id}`, metadata };
}

const QUICK_FIX = { route: 'quick_fix', quick_fix_review: 'self@abc123def456' };

describe('benchSourceEligibility', () => {
  test('accepts a quick_fix issue carrying a self-review receipt', () => {
    const judged = benchSourceEligibility(issue(QUICK_FIX));

    expect(judged.eligible).toBe(true);
  });

  test('refuses a non quick_fix route with a reason', () => {
    const judged = benchSourceEligibility(
      issue({ route: 'spec_backed', quick_fix_review: 'self@abc' })
    );

    expect(judged.eligible).toBe(false);
    expect(judged.reason).toContain('quick_fix');
  });

  test('refuses a quick_fix issue without quick_fix_review', () => {
    const judged = benchSourceEligibility(issue({ route: 'quick_fix' }));

    expect(judged.eligible).toBe(false);
    expect(judged.reason).toContain('quick_fix_review');
  });

  test('refuses an issue whose route is only derived', () => {
    const judged = benchSourceEligibility({
      id: 'UI-2',
      metadata: { quick_fix_review: 'self@abc' },
      workflow: { route: 'quick_fix' }
    });

    expect(judged.eligible).toBe(false);
  });
});

describe('benchSourceOptions', () => {
  test('matches on id and on title', () => {
    const issues = [issue(QUICK_FIX, 'UI-aaa'), issue(QUICK_FIX, 'UI-bbb')];

    const matched = benchSourceOptions(issues, 'aaa');

    expect(matched.map((entry) => entry.id)).toEqual(['UI-aaa']);
  });

  test('keeps an ineligible candidate with its reason', () => {
    const issues = [issue({ route: 'full_plan' }, 'UI-ccc')];

    const matched = benchSourceOptions(issues, '');

    expect(matched[0].eligible).toBe(false);
    expect(matched[0].reason.length).toBeGreaterThan(0);
  });

  test('orders eligible candidates first', () => {
    const issues = [
      issue({ route: 'full_plan' }, 'UI-bad'),
      issue(QUICK_FIX, 'UI-good')
    ];

    const matched = benchSourceOptions(issues, '');

    expect(matched[0].id).toBe('UI-good');
  });
});

describe('clampRepeats', () => {
  test('keeps a value inside 1..5', () => {
    expect(clampRepeats(3)).toBe(3);
  });

  test('clamps above the maximum', () => {
    expect(clampRepeats(9)).toBe(5);
  });

  test('clamps below the minimum', () => {
    expect(clampRepeats(0)).toBe(1);
  });

  test('falls back to one on unreadable input', () => {
    expect(clampRepeats('x')).toBe(1);
  });
});

describe('reviewerDefaults', () => {
  test('returns the documented fallback without earlier experiments', () => {
    expect(reviewerDefaults([])).toEqual({ ...BENCH_REVIEWER_FALLBACK });
  });

  test('reuses the newest complete reviewer triple', () => {
    const runs = [
      {
        reviewer: {
          impl_review_model: 'sonnet',
          impl_review_effort: 'high',
          impl_review_speed: 'default'
        }
      }
    ];

    expect(reviewerDefaults(runs).impl_review_model).toBe('sonnet');
  });

  test('skips a run whose reviewer triple is incomplete', () => {
    const runs = [
      { reviewer: { impl_review_model: 'sonnet' } },
      {
        reviewer: {
          impl_review_model: 'fable',
          impl_review_effort: 'high',
          impl_review_speed: 'priority'
        }
      }
    ];

    expect(reviewerDefaults(runs).impl_review_speed).toBe('priority');
  });
});

describe('benchFormReady', () => {
  const base = {
    source_id: 'UI-1',
    source_eligible: true,
    preset_ids: ['p1'],
    repeats: 2,
    reviewer_mode: 'fixed',
    reviewer: { ...BENCH_REVIEWER_FALLBACK }
  };

  test('accepts a complete fixed-reviewer form', () => {
    expect(benchFormReady(base)).toBe(true);
  });

  test('refuses an ineligible source', () => {
    expect(benchFormReady({ ...base, source_eligible: false })).toBe(false);
  });

  test('refuses an empty preset selection', () => {
    expect(benchFormReady({ ...base, preset_ids: [] })).toBe(false);
  });

  test('refuses a repeat count outside the range', () => {
    expect(benchFormReady({ ...base, repeats: 6 })).toBe(false);
  });

  test('refuses a fixed reviewer with a missing key', () => {
    expect(
      benchFormReady({
        ...base,
        reviewer: { impl_review_model: 'fable', impl_review_effort: 'xhigh' }
      })
    ).toBe(false);
  });

  test('accepts preset reviewer mode without a reviewer triple', () => {
    expect(
      benchFormReady({ ...base, reviewer_mode: 'preset', reviewer: {} })
    ).toBe(true);
  });
});

describe('benchErrorMessage', () => {
  test('renders a known code as a sentence', () => {
    const text = benchErrorMessage({ code: 'bench_base_unreadable' });

    expect(text).toContain('base tip');
  });

  test('names the closed clones of an aborted creation', () => {
    const text = benchErrorMessage({
      code: 'bench_run_create_failed',
      message: 'clone_create_failed',
      details: { aborted: ['UI-a', 'UI-b'] }
    });

    expect(text).toContain('UI-a');
    expect(text).toContain('UI-b');
  });

  test('keeps an unknown code visible', () => {
    expect(benchErrorMessage({ code: 'weird_thing' })).toBe('weird_thing');
  });
});
