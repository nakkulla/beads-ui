import { describe, expect, test } from 'vitest';
import { formatRelativeTime } from './relative-time.js';

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
