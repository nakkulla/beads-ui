import fs from 'node:fs';
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
  const codex_json = vi.fn().mockResolvedValue({ available: false });
  const fetchMock = vi.fn((url) =>
    Promise.resolve({
      ok: true,
      json: url === '/api/codex-usage' ? codex_json : json
    })
  );
  vi.stubGlobal('fetch', fetchMock);
  return { fetchMock, json, codex_json };
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
    await vi.waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));

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

    expect(mount.querySelector('.usage-meter__group')?.classList).toContain(
      'usage-meter__group--stale'
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

  test('renders Claude and Codex groups when both providers succeed', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    const fetchMock = vi.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            usageResponse([
              {
                key: url === '/api/codex-usage' ? '7d' : '5h',
                pct: 26,
                resetsAt: reset_at
              }
            ])
          )
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelectorAll('.usage-meter__group')).toHaveLength(2)
    );

    expect(
      Array.from(
        mount.querySelectorAll('.usage-meter__provider'),
        (label) => label.textContent
      )
    ).toEqual(['Claude', 'Codex']);
    expect(fetchMock).toHaveBeenCalledWith('/api/claude-usage');
    expect(fetchMock).toHaveBeenCalledWith('/api/codex-usage');
    meter.destroy();
  });

  test('renders Codex when Claude is unavailable', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    const fetchMock = vi.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            url === '/api/codex-usage'
              ? usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }])
              : { available: false }
          )
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelector('.usage-meter__provider')?.textContent).toBe(
        'Codex'
      )
    );

    expect(mount.hidden).toBe(false);
    meter.destroy();
  });

  test('keeps one provider visible when the other fetch fails', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    const fetchMock = vi.fn((url) => {
      if (url === '/api/codex-usage') {
        return Promise.reject(new Error('offline'));
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }])
          )
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelector('.usage-meter__provider')?.textContent).toBe(
        'Claude'
      )
    );

    expect(mount.hidden).toBe(false);
    meter.destroy();
  });

  test('applies stale state only to the provider that is stale', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    const fetchMock = vi.fn((url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            usageResponse(
              [{ key: '5h', pct: 26, resetsAt: reset_at }],
              url === '/api/codex-usage' ? 601 : 30
            )
          )
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelectorAll('.usage-meter__group')).toHaveLength(2)
    );

    const groups = mount.querySelectorAll('.usage-meter__group');
    expect(groups[0].classList).not.toContain('usage-meter__group--stale');
    expect(groups[1].classList).toContain('usage-meter__group--stale');
    meter.destroy();
  });

  test('clamps displayed percentages to the progress range', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubFetch(
      usageResponse([
        { key: '5h', pct: -5, resetsAt: reset_at },
        { key: '7d', pct: 120, resetsAt: reset_at }
      ])
    );

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelectorAll('.usage-meter__pct')).toHaveLength(2)
    );

    expect(
      Array.from(
        mount.querySelectorAll('.usage-meter__pct'),
        (value) => value.textContent
      )
    ).toEqual(['0%', '100%']);
    meter.destroy();
  });

  test('discards responses that finish after destroy', async () => {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    const mount = /** @type {HTMLElement} */ (
      document.getElementById('usage-meter')
    );
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    /** @type {(value: unknown) => void} */
    let release = () => {};
    const payload = new Promise((resolve) => {
      release = resolve;
    });
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: true, json: () => payload })
    );
    const clearIntervalMock = vi.spyOn(globalThis, 'clearInterval');

    const meter = createUsageMeter(mount);
    meter.destroy();
    release(usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }]));
    await Promise.resolve();
    await Promise.resolve();

    expect(clearIntervalMock).toHaveBeenCalledTimes(1);
    expect(mount.hidden).toBe(true);
    expect(mount.querySelector('.usage-meter')).toBeNull();
  });

  test('keeps provider layout and compacts the meter on narrow screens', () => {
    const styles = fs.readFileSync('app/styles.css', 'utf8');

    expect(styles).toMatch(/\.usage-meter__group\s*{/);
    expect(styles).toMatch(/\.usage-meter__provider\s*{/);
    expect(styles).not.toMatch(
      /@media \(max-width: 900px\)[\s\S]*?\.usage-meter-mount\s*{[\s\S]*?display: none;/
    );
    expect(styles).toMatch(
      /@media \(max-width: 900px\)[\s\S]*?\.usage-meter__track\s*{[\s\S]*?display: none;/
    );
  });
});
