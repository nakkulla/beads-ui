import { afterEach, describe, expect, test, vi } from 'vitest';
import { createUsageMeter, formatResetTime } from './usage-meter.js';

/**
 * @param {Array<{ key: string, pct: number, resetsAt: string }>} windows
 * @param {number} [age_seconds]
 */
function usageResponse(windows, age_seconds = 30) {
  return {
    available: true,
    email: 'user@example.com',
    windows,
    fetchedAt: '2026-08-06T02:16:46Z',
    ageSeconds: age_seconds
  };
}

/**
 * @param {unknown} payload
 */
function stubFetch(payload) {
  const json = vi.fn().mockResolvedValue(payload);
  const fetchMock = vi.fn().mockResolvedValue({
    ok: true,
    json
  });
  vi.stubGlobal('fetch', fetchMock);
  return { fetchMock, json };
}

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
  document.body.innerHTML = '';
});

describe('usage meter reset time', () => {
  test('formats a same-day reset as countdown and local clock time', () => {
    const now_ms = new Date(2026, 7, 6, 11, 16).getTime();
    const reset_at = new Date(2026, 7, 6, 12, 9).toISOString();

    const formatted = formatResetTime(reset_at, now_ms);

    expect(formatted).toBe('53m · 12:09');
  });

  test('formats a later-date reset with an abbreviated month and day', () => {
    const now_ms = new Date(2026, 7, 6, 11, 16).getTime();
    const reset_at = new Date(2026, 7, 10, 1, 0).toISOString();

    const formatted = formatResetTime(reset_at, now_ms);

    expect(formatted).toBe('3d 13h · Aug 10 01:00');
  });
});

describe('usage meter rendering', () => {
  test('assigns success, warning and danger colors at the thresholds', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubFetch(
      usageResponse([
        { key: '5h', pct: 59, resetsAt: reset_at },
        { key: '7d', pct: 60, resetsAt: reset_at },
        { key: 'Fable', pct: 85, resetsAt: reset_at }
      ])
    );

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelectorAll('.usage-meter__window')).toHaveLength(3)
    );

    const windows = mount.querySelectorAll('.usage-meter__window');
    expect(windows[0].classList).toContain('usage-meter__window--success');
    expect(windows[1].classList).toContain('usage-meter__window--warn');
    expect(windows[2].classList).toContain('usage-meter__window--danger');
    meter.destroy();
  });

  test('hides the mount when usage is unavailable', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const { json } = stubFetch({ available: false });

    const meter = createUsageMeter(mount);
    await vi.waitFor(() => expect(json).toHaveBeenCalledTimes(1));

    expect(mount.hidden).toBe(true);
    expect(mount.querySelector('.usage-meter')).toBeNull();
    meter.destroy();
  });

  test('hides the mount when fetching usage fails', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const fetchMock = vi.fn().mockRejectedValue(new Error('offline'));
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));

    expect(mount.hidden).toBe(true);
    expect(mount.querySelector('.usage-meter')).toBeNull();
    meter.destroy();
  });

  test('marks stale data and adds its measurement age to tooltips', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubFetch(usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }], 601));

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelector('.usage-meter')).not.toBeNull()
    );

    expect(mount.querySelector('.usage-meter')?.classList).toContain(
      'usage-meter--stale'
    );
    expect(
      mount.querySelector('.usage-meter__window')?.getAttribute('title')
    ).toContain('10분 전 측정');
    meter.destroy();
  });

  test('renders every base and scoped usage window in source order', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubFetch(
      usageResponse([
        { key: '5h', pct: 26, resetsAt: reset_at },
        { key: '7d', pct: 74, resetsAt: reset_at },
        { key: 'Fable', pct: 46, resetsAt: reset_at },
        { key: 'Sonnet', pct: 32, resetsAt: reset_at }
      ])
    );

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelectorAll('.usage-meter__window')).toHaveLength(4)
    );

    const labels = Array.from(
      mount.querySelectorAll('.usage-meter__label'),
      (label) => label.textContent
    );
    expect(labels).toEqual(['5h', '7d', 'Fable', 'Sonnet']);
    meter.destroy();
  });
});
