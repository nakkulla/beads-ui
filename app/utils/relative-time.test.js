import { describe, expect, test } from 'vitest';
import { formatRelativeTime, formatTimestampTitle } from './relative-time.js';

describe('utils/relative-time', () => {
  const NOW = 1712100000000;

  /**
   * @param {number} ms_ago
   */
  function rt(ms_ago) {
    return formatRelativeTime(NOW - ms_ago, NOW);
  }

  test('returns empty string for empty input', () => {
    expect(formatRelativeTime(0)).toBe('');
    expect(formatRelativeTime(null)).toBe('');
    expect(formatRelativeTime(undefined)).toBe('');
  });

  test('parses ISO string timestamps', () => {
    expect(formatRelativeTime('2024-04-02T23:20:00.000Z', NOW)).toBe('방금');
  });

  test('returns empty string for invalid timestamps', () => {
    expect(formatRelativeTime('not-a-date', NOW)).toBe('');
    expect(formatTimestampTitle('not-a-date')).toBe('');
  });

  test('formats valid timestamps for title attributes', () => {
    expect(formatTimestampTitle('2024-04-02T23:20:00.000Z')).toBe(
      '2024-04-02T23:20:00.000Z'
    );
    expect(formatTimestampTitle(NOW)).toBe('2024-04-02T23:20:00.000Z');
  });

  test('future timestamps show 방금', () => {
    expect(formatRelativeTime(NOW + 60_000, NOW)).toBe('방금');
  });

  test('seconds ago show 방금', () => {
    expect(rt(0)).toBe('방금');
    expect(rt(59_000)).toBe('방금');
  });

  test('minutes ago', () => {
    expect(rt(60_000)).toBe('1분 전');
    expect(rt(59 * 60_000)).toBe('59분 전');
  });

  test('hours ago', () => {
    expect(rt(60 * 60_000)).toBe('1시간 전');
    expect(rt(23 * 60 * 60_000)).toBe('23시간 전');
  });

  test('days ago', () => {
    expect(rt(24 * 60 * 60_000)).toBe('1일 전');
    expect(rt(6 * 24 * 60 * 60_000)).toBe('6일 전');
  });

  test('weeks ago', () => {
    expect(rt(7 * 24 * 60 * 60_000)).toBe('1주 전');
    expect(rt(27 * 24 * 60 * 60_000)).toBe('3주 전');
  });

  test('months ago', () => {
    expect(rt(30 * 24 * 60 * 60_000)).toBe('1개월 전');
    expect(rt(335 * 24 * 60 * 60_000)).toBe('11개월 전');
  });

  test('years ago', () => {
    expect(rt(365 * 24 * 60 * 60_000)).toBe('1년 전');
    expect(rt(730 * 24 * 60 * 60_000)).toBe('2년 전');
  });
});

describe('utils/relative-time formatTimestampLocal', () => {
  test('formats epoch ms as local YYYY-MM-DD HH:mm', async () => {
    const { formatTimestampLocal } = await import('./relative-time.js');
    const ms = Date.parse('2026-07-17T03:05:00.000Z');
    const d = new Date(ms);
    const pad = (/** @type {number} */ n) => String(n).padStart(2, '0');
    const expected =
      `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
      ` ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    expect(formatTimestampLocal(ms)).toBe(expected);
    expect(formatTimestampLocal(ms)).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });

  test('accepts ISO strings and returns empty for invalid input', async () => {
    const { formatTimestampLocal } = await import('./relative-time.js');
    const iso = '2026-01-02T09:08:00.000Z';
    expect(formatTimestampLocal(iso)).toMatch(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
    );
    expect(formatTimestampLocal(undefined)).toBe('');
    expect(formatTimestampLocal('not-a-date')).toBe('');
  });
});

describe('formatClockLocal', () => {
  test('draws only the clock inside the same local day', async () => {
    const { formatClockLocal } = await import('./relative-time.js');
    const now = new Date(2026, 8, 16, 23, 30).getTime();

    const text = formatClockLocal(new Date(2026, 8, 16, 9, 5).getTime(), now);

    expect(text).toBe('09:05');
  });

  test('prefixes the month and day on another local day', async () => {
    const { formatClockLocal } = await import('./relative-time.js');
    const now = new Date(2026, 8, 16, 0, 10).getTime();

    const text = formatClockLocal(new Date(2026, 8, 15, 23, 3).getTime(), now);

    expect(text).toBe('9/15 23:03');
  });

  test('returns empty for unparseable input', async () => {
    const { formatClockLocal } = await import('./relative-time.js');

    expect(formatClockLocal('not-a-date', Date.now())).toBe('');
  });
});

describe('formatElapsedSince', () => {
  const NOW = new Date(2026, 8, 17, 12, 0).getTime();

  test.each([
    [59 * 60_000, '59분째'],
    [60 * 60_000, '1시간째'],
    [47 * 3_600_000, '47시간째'],
    [48 * 3_600_000, '2일째']
  ])('writes an age of %i ms as %s', async (age, text) => {
    const { formatElapsedSince } = await import('./relative-time.js');

    expect(formatElapsedSince(NOW - Number(age), NOW)).toBe(text);
  });

  test('returns empty for a future timestamp', async () => {
    const { formatElapsedSince } = await import('./relative-time.js');

    expect(formatElapsedSince(NOW + 60_000, NOW)).toBe('');
  });

  test('returns empty for a missing timestamp', async () => {
    const { formatElapsedSince } = await import('./relative-time.js');

    expect(formatElapsedSince(null, NOW)).toBe('');
  });
});
