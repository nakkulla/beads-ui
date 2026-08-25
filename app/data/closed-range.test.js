import { describe, expect, test } from 'vitest';
import {
  CLOSED_RANGE_OPTIONS,
  DEFAULT_CLOSED_RANGE,
  DONE_RANGE_OPTIONS,
  closedRangeSince,
  isClosedRange,
  normalizeDoneRange
} from './closed-range.js';

const DAY_MS = 864e5;

describe('closedRangeSince', () => {
  test("'today' returns local midnight for a time just after midnight", () => {
    const now = new Date(2026, 6, 17, 0, 0, 5, 0).getTime();
    const midnight = new Date(2026, 6, 17, 0, 0, 0, 0).getTime();
    expect(closedRangeSince('today', now)).toBe(midnight);
  });

  test("'today' returns the same local midnight just before the next day", () => {
    const now = new Date(2026, 6, 17, 23, 59, 59, 999).getTime();
    const midnight = new Date(2026, 6, 17, 0, 0, 0, 0).getTime();
    expect(closedRangeSince('today', now)).toBe(midnight);
  });

  test("'7d' subtracts seven days in ms", () => {
    const now = 1_700_000_000_000;
    expect(closedRangeSince('7d', now)).toBe(now - 7 * DAY_MS);
  });

  test("'30d' subtracts thirty days in ms", () => {
    const now = 1_700_000_000_000;
    expect(closedRangeSince('30d', now)).toBe(now - 30 * DAY_MS);
  });

  test("'all' returns undefined (no since filter)", () => {
    expect(closedRangeSince('all', 1_700_000_000_000)).toBeUndefined();
  });

  test('defaults now to Date.now() and yields a positive today epoch', () => {
    const since = closedRangeSince('today');
    expect(typeof since).toBe('number');
    expect(/** @type {number} */ (since)).toBeGreaterThan(0);
    expect(/** @type {number} */ (since)).toBeLessThanOrEqual(Date.now());
  });
});

describe('isClosedRange and constants', () => {
  test('validates known range tokens only', () => {
    expect(isClosedRange('today')).toBe(true);
    expect(isClosedRange('7d')).toBe(true);
    expect(isClosedRange('30d')).toBe(true);
    expect(isClosedRange('all')).toBe(true);
    expect(isClosedRange('week')).toBe(false);
    expect(isClosedRange('')).toBe(false);
    expect(isClosedRange(null)).toBe(false);
  });

  test('default range is today; options cover the four tokens in order', () => {
    expect(DEFAULT_CLOSED_RANGE).toBe('today');
    expect(CLOSED_RANGE_OPTIONS.map((o) => o.value)).toEqual([
      'today',
      '7d',
      '30d',
      'all'
    ]);
  });
});

describe('normalizeDoneRange', () => {
  test("keeps 'today' as the narrow period", () => {
    expect(normalizeDoneRange('today')).toBe('today');
  });

  test("keeps '7d'", () => {
    expect(normalizeDoneRange('7d')).toBe('7d');
  });

  test("widens a stored '30d' to '7d'", () => {
    expect(normalizeDoneRange('30d')).toBe('7d');
  });

  test("widens a stored 'all' to '7d'", () => {
    expect(normalizeDoneRange('all')).toBe('7d');
  });

  test("reads an unknown or absent value as '7d'", () => {
    expect(normalizeDoneRange('week')).toBe('7d');
    expect(normalizeDoneRange(null)).toBe('7d');
  });

  test('done options offer exactly the two supported periods in order', () => {
    expect(DONE_RANGE_OPTIONS.map((o) => o.value)).toEqual(['today', '7d']);
  });
});
