import { describe, expect, test } from 'vitest';
import {
  DEFAULT_PROBLEM_CRITERIA,
  isDefaultProblemCriteria,
  normalizeProblemCriteria
} from './compare-problem-criteria.js';

describe('utils/compare-problem-criteria', () => {
  test.each([null, [], 'bad', 1, {}])(
    'defaults non-criteria input %j',
    (raw) => {
      expect(normalizeProblemCriteria(raw)).toEqual(DEFAULT_PROBLEM_CRITERIA);
    }
  );

  test('preserves known partial fields and removes unknown fields', () => {
    const normalized = normalizeProblemCriteria({
      cost: { factor: 4, unknown: true },
      failed: { on: false },
      unknown: { on: false }
    });

    expect(normalized.cost).toEqual({ on: true, factor: 4 });
    expect(normalized.failed.on).toBe(false);
    expect(normalized).not.toHaveProperty('unknown');
  });

  test.each([
    ['failed', 'on'],
    ['retry', 'include_env'],
    ['human', 'include_env_events']
  ])('defaults invalid boolean %s.%s', (key, field) => {
    const normalized = normalizeProblemCriteria({
      [key]: { [field]: 'true' }
    });

    expect(normalized[key][field]).toBe(DEFAULT_PROBLEM_CRITERIA[key][field]);
  });

  test.each(['round_min', 'blocking_min', 'minor_min'])(
    'preserves explicit null for review.%s',
    (field) => {
      const normalized = normalizeProblemCriteria({
        review: { [field]: null }
      });

      expect(normalized.review[field]).toBeNull();
    }
  );

  test.each([
    ['round_min', 0],
    ['round_min', 2.5],
    ['round_min', '2'],
    ['blocking_min', 100],
    ['minor_min', 0]
  ])('defaults invalid review threshold %s=%j', (field, value) => {
    const normalized = normalizeProblemCriteria({ review: { [field]: value } });

    expect(normalized.review[field]).toBe(
      DEFAULT_PROBLEM_CRITERIA.review[field]
    );
  });

  test('turns review off when every threshold is null', () => {
    const normalized = normalizeProblemCriteria({
      review: {
        on: true,
        round_min: null,
        blocking_min: null,
        minor_min: null
      }
    });

    expect(normalized.review.on).toBe(false);
  });

  test.each([
    [1.5, 1.5],
    [10, 10],
    [1.49, 3],
    [10.01, 3],
    [null, 3]
  ])('normalizes factor %j to %j', (value, expected) => {
    expect(
      normalizeProblemCriteria({ cost: { factor: value } }).cost.factor
    ).toBe(expected);
  });

  test('recognizes only the normalized default', () => {
    expect(isDefaultProblemCriteria({})).toBe(true);
    expect(isDefaultProblemCriteria({ failed: { on: false } })).toBe(false);
  });
});
