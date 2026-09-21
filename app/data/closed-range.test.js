import { describe, expect, test } from 'vitest';
import {
  CLOSED_RANGE_OPTIONS,
  COMPARE_RANGE_OPTIONS,
  DEFAULT_CLOSED_RANGE,
  DONE_RANGE_OPTIONS,
  closedRangeSince,
  compareRangeSince,
  isClosedRange,
  localDayStartMs,
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

describe('comparison ranges', () => {
  test('lists the seven comparison options in display order', () => {
    expect(COMPARE_RANGE_OPTIONS.map((option) => option.value)).toEqual([
      'today',
      '2d',
      '3d',
      '7d',
      '30d',
      'all',
      'custom'
    ]);
  });

  test('keeps short and custom ranges out of the Board vocabulary', () => {
    const values = CLOSED_RANGE_OPTIONS.map((option) => option.value);

    expect(values).not.toContain('2d');
    expect(values).not.toContain('3d');
    expect(values).not.toContain('custom');
  });

  test.each([
    ['2d', 2],
    ['3d', 3]
  ])('subtracts %s from the comparison lower bound', (range, days) => {
    const now = 1_700_000_000_000;

    expect(compareRangeSince(range, now)).toBe(now - days * DAY_MS);
  });

  test.each(['all', 'custom', 'unknown'])(
    'leaves %s without a comparison lower bound',
    (range) => {
      expect(compareRangeSince(range, 1_700_000_000_000)).toBeNull();
    }
  );

  test('converts a date string to local midnight', () => {
    const expected = new Date(2026, 8, 17, 0, 0, 0, 0).getTime();

    expect(localDayStartMs('2026-09-17')).toBe(expected);
  });

  test.each(['', '2026/09/17', '2026-02-30'])(
    'rejects invalid date value %s',
    (value) => {
      expect(localDayStartMs(value)).toBeNull();
    }
  );
});

describe('normalizeDoneRange', () => {
  test("keeps 'today' as the narrow period", () => {
    expect(normalizeDoneRange('today')).toBe('today');
  });

  test("keeps '7d'", () => {
    expect(normalizeDoneRange('7d')).toBe('7d');
  });

  test("keeps a stored '30d' (UI-p7s2 §5)", () => {
    expect(normalizeDoneRange('30d')).toBe('30d');
  });

  test("keeps a stored 'all' (UI-p7s2 §5)", () => {
    expect(normalizeDoneRange('all')).toBe('all');
  });

  test("reads an unknown or absent value as '7d'", () => {
    expect(normalizeDoneRange('week')).toBe('7d');
    expect(normalizeDoneRange(null)).toBe('7d');
  });

  test('done options offer the four closed-range periods in order', () => {
    expect(DONE_RANGE_OPTIONS.map((o) => o.value)).toEqual([
      'today',
      '7d',
      '30d',
      'all'
    ]);
  });
});

describe('DONE_RANGE_OPTIONS short labels', () => {
  test('carries the narrow-viewport label for every range', () => {
    const shorts = DONE_RANGE_OPTIONS.map((option) => [
      option.value,
      option.short
    ]);

    expect(shorts).toEqual([
      ['today', '오늘'],
      ['7d', '7일'],
      ['30d', '30일'],
      ['all', '전체']
    ]);
  });
});
