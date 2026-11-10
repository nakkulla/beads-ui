import { render } from 'lit-html';
import fs from 'node:fs';
import { afterEach, describe, expect, test, vi } from 'vitest';
import { createLimitPolicySettingsStore } from '../data/limit-policy-settings-store.js';
import {
  createUsageMeter,
  formatResetClock,
  formatResetTime,
  loginFailureText,
  removeConfirmText
} from './usage-meter.js';

// A pass-through spy: the idle tests count how often the header goes through
// lit (UI-yu2o); every other test renders exactly as before.
vi.mock('lit-html', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return { ...actual, render: vi.fn(actual.render) };
});

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
      /@media \(max-width: 900px\)[\s\S]*?\.usage-meter-mount\s*{[^}]*display: none;/
    );
    expect(styles).toMatch(
      /@media \(max-width: 900px\)[\s\S]*?\.usage-meter__track\s*{[\s\S]*?display: none;/
    );
  });
});

/**
 * Build one `accounts[]` row on top of the shared contract defaults.
 *
 * @param {Partial<{ number: number, email: string, alias: string | null, plan: string | null, active: boolean, status: string, windows: Array<{ key: string, pct: number, resetsAt: string }>, fetchedAt: string | null, ageSeconds: number | null }>} overrides
 */
function accountRow(overrides) {
  return {
    number: 1,
    email: 'one@example.com',
    alias: null,
    plan: null,
    active: false,
    status: 'ok',
    windows: [],
    fetchedAt: null,
    ageSeconds: null,
    ...overrides
  };
}

/** Mount a fresh usage meter host element. */
function mountMeter() {
  document.body.innerHTML = '<div id="usage-meter"></div>';
  return /** @type {HTMLElement} */ (document.getElementById('usage-meter'));
}

/**
 * Serve one payload per provider endpoint.
 *
 * @param {unknown} claude_payload
 * @param {unknown} [codex_payload]
 */
function stubProviders(claude_payload, codex_payload = { available: false }) {
  const fetchMock = vi.fn((/** @type {string} */ url) =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(
          url === '/api/codex-usage' ? codex_payload : claude_payload
        )
    })
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

/**
 * The first provider toggle in source order, or the toggle of one provider.
 *
 * @param {HTMLElement} mount
 * @param {string} [label]
 */
function toggleButton(mount, label) {
  const selector =
    label === undefined
      ? '.usage-meter__toggle'
      : `.usage-meter__toggle[aria-label="${label} usage"]`;
  return /** @type {HTMLButtonElement | null} */ (
    mount.querySelector(selector)
  );
}

/**
 * @param {HTMLElement} mount
 * @param {string} [label]
 */
async function openCard(mount, label) {
  await vi.waitFor(() => expect(toggleButton(mount, label)).not.toBeNull());
  /** @type {HTMLButtonElement} */ (toggleButton(mount, label)).click();
}

describe('usage meter account badge', () => {
  test('counts every non-active managed account', async () => {
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubProviders({
      ...usageResponse([{ key: '5h', pct: 10, resetsAt: reset_at }]),
      accounts: [
        accountRow({ number: 2, active: true }),
        accountRow({ number: 1, status: 'token_expired' }),
        accountRow({ number: 3, status: 'token_expired' })
      ]
    });

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelector('.usage-meter__badge')).not.toBeNull()
    );

    expect(mount.querySelector('.usage-meter__badge')?.textContent).toBe('+2');
    meter.destroy();
  });

  test('omits the badge when every managed account is active', async () => {
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubProviders({
      ...usageResponse([{ key: '5h', pct: 10, resetsAt: reset_at }]),
      accounts: [accountRow({ number: 2, active: true })]
    });

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelector('.usage-meter')).not.toBeNull()
    );

    expect(mount.querySelector('.usage-meter__badge')).toBeNull();
    meter.destroy();
  });

  test('renders the static meter without a toggle when accounts are absent', async () => {
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubProviders(usageResponse([{ key: '5h', pct: 10, resetsAt: reset_at }]));

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelector('.usage-meter')).not.toBeNull()
    );

    expect(toggleButton(mount)).toBeNull();
    expect(mount.querySelector('.usage-meter__badge')).toBeNull();
    meter.destroy();
  });

  test('keeps the group with a badge when the active account is unavailable', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [
        accountRow({ number: 1, status: 'token_expired' }),
        accountRow({ number: 2, email: 'two@example.com', status: 'api_key' })
      ]
    });

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelector('.usage-meter__empty')).not.toBeNull()
    );

    expect(mount.querySelector('.usage-meter__provider')?.textContent).toBe(
      'Claude'
    );
    expect(mount.querySelector('.usage-meter__badge')?.textContent).toBe('+2');
    meter.destroy();
  });
});

describe('usage meter account card', () => {
  test('opens the card when the meter toggle is clicked', async () => {
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubProviders({
      ...usageResponse([{ key: '5h', pct: 10, resetsAt: reset_at }]),
      accounts: [
        accountRow({ number: 2, active: true }),
        accountRow({ number: 1 })
      ]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    expect(document.querySelector('.usage-meter__card')).not.toBeNull();
    expect(toggleButton(mount)?.getAttribute('aria-expanded')).toBe('true');
    meter.destroy();
  });

  test('spells out each window reset in the card', async () => {
    const mount = mountMeter();
    const now_ms = new Date(2026, 7, 6, 11, 16).getTime();
    vi.useFakeTimers({ now: now_ms, toFake: ['Date'] });
    const reset_at = new Date(2026, 7, 6, 13, 40).toISOString();
    stubProviders({
      ...usageResponse([{ key: '5h', pct: 10, resetsAt: reset_at }]),
      accounts: [
        accountRow({
          number: 1,
          active: true,
          windows: [
            { key: '5h', pct: 10, resetsAt: reset_at },
            { key: '7d', pct: 40, resetsAt: reset_at }
          ]
        })
      ]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    const resets = Array.from(
      document.querySelectorAll('.usage-meter__account-reset'),
      (node) => node.textContent?.trim()
    );
    expect(resets).toEqual(['↻ 2h 24m · 13:40', '↻ 2h 24m · 13:40']);
    meter.destroy();
  });

  test('renders the card and scrim in a body-level layer outside the mount', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1 })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    const layer = document.getElementById('usage-meter-layer');
    expect(layer?.parentElement).toBe(document.body);
    expect(layer?.querySelector('.usage-meter__card')).not.toBeNull();
    expect(layer?.querySelector('.usage-meter__scrim')).not.toBeNull();
    expect(mount.querySelector('.usage-meter__card')).toBeNull();
    meter.destroy();
  });

  test('keeps the card open on a mousedown inside the card', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1 })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    document
      .querySelector('.usage-meter__card')
      ?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(document.querySelector('.usage-meter__card')).not.toBeNull();
    meter.destroy();
  });

  test('removes the layer when the card closes', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1 })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(document.getElementById('usage-meter-layer')).toBeNull();
    meter.destroy();
  });

  test('closes the card on an outside mousedown', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1 })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));

    expect(document.querySelector('.usage-meter__card')).toBeNull();
    meter.destroy();
  });

  test('closes the card on Escape', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1 })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(document.querySelector('.usage-meter__card')).toBeNull();
    meter.destroy();
  });

  test('keeps the card open across a polling refresh', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1 })]
    });

    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    /** @type {HTMLButtonElement} */ (toggleButton(mount)).click();
    await vi.advanceTimersByTimeAsync(60_000);

    expect(document.querySelector('.usage-meter__card')).not.toBeNull();
    meter.destroy();
  });

  test('shows only the clicked provider section in the card', async () => {
    const mount = mountMeter();
    stubProviders(
      { available: false, accounts: [accountRow({ number: 1 })] },
      { available: false, accounts: [accountRow({ number: 1 })] }
    );

    const meter = createUsageMeter(mount);
    await openCard(mount, 'Codex');

    const titles = document.querySelectorAll('.usage-meter__section-title');
    expect(titles.length).toBe(1);
    expect(titles[0].textContent).toContain('Codex');
    expect(
      document.querySelector('.usage-meter__card')?.getAttribute('aria-label')
    ).toBe('Codex 계정 사용량');
    expect(toggleButton(mount, 'Codex')?.getAttribute('aria-expanded')).toBe(
      'true'
    );
    expect(toggleButton(mount, 'Claude')?.getAttribute('aria-expanded')).toBe(
      'false'
    );
    meter.destroy();
  });

  test('switches the card to the other provider without closing it', async () => {
    const mount = mountMeter();
    stubProviders(
      { available: false, accounts: [accountRow({ number: 1 })] },
      { available: false, accounts: [accountRow({ number: 1 })] }
    );

    const meter = createUsageMeter(mount);
    await openCard(mount, 'Claude');
    /** @type {HTMLButtonElement} */ (toggleButton(mount, 'Codex')).click();

    const titles = document.querySelectorAll('.usage-meter__section-title');
    expect(titles.length).toBe(1);
    expect(titles[0].textContent).toContain('Codex');
    meter.destroy();
  });

  test('closes the card when its own provider toggle is clicked again', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1 })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount, 'Claude');
    /** @type {HTMLButtonElement} */ (toggleButton(mount, 'Claude')).click();

    expect(document.querySelector('.usage-meter__card')).toBeNull();
    expect(toggleButton(mount, 'Claude')?.getAttribute('aria-expanded')).toBe(
      'false'
    );
    meter.destroy();
  });

  test('leaves a provider without accounts as a static group', async () => {
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubProviders(
      { available: false, accounts: [accountRow({ number: 1 })] },
      usageResponse([{ key: '5h', pct: 10, resetsAt: reset_at }])
    );

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(toggleButton(mount, 'Claude')).not.toBeNull()
    );

    expect(toggleButton(mount, 'Codex')).toBeNull();
    expect(
      mount.querySelector('.usage-meter__group[aria-label="Codex usage"]')
    ).not.toBeNull();
    meter.destroy();
  });

  test('closes the card when a poll drops the open provider accounts', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    let claude_accounts = [accountRow({ number: 1 })];
    const fetchMock = vi.fn((/** @type {string} */ url) =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            url === '/api/codex-usage'
              ? { available: false, accounts: [accountRow({ number: 1 })] }
              : { available: false, accounts: claude_accounts }
          )
      })
    );
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    /** @type {HTMLButtonElement} */ (toggleButton(mount, 'Claude')).click();
    claude_accounts = [];
    await vi.advanceTimersByTimeAsync(60_000);

    expect(document.querySelector('.usage-meter__card')).toBeNull();
    expect(toggleButton(mount, 'Codex')?.getAttribute('aria-expanded')).toBe(
      'false'
    );
    meter.destroy();
  });

  test('shows the email with its alias as the row label and keeps the email as its title', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [
        accountRow({ number: 1, email: 'one@example.com', alias: 'work' }),
        accountRow({ number: 2, email: 'two@example.com' })
      ]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    const labels = document.querySelectorAll('.usage-meter__account-label');
    expect(labels[0].textContent).toBe('one@example.com (work)');
    expect(labels[0].getAttribute('title')).toBe('one@example.com');
    expect(labels[1].textContent).toBe('two@example.com');
    meter.destroy();
  });

  test('widens a repeated Codex email by its plan in the row label', async () => {
    const mount = mountMeter();
    stubProviders(
      { available: false },
      {
        available: false,
        accounts: [
          {
            ...accountRow({ number: 1, email: 'a@x.com', plan: 'plus' }),
            key: 'u1::w1'
          },
          {
            ...accountRow({ number: 2, email: 'a@x.com', plan: 'team' }),
            key: 'u1::w2'
          }
        ]
      }
    );

    const meter = createUsageMeter(mount);
    await openCard(mount);

    const labels = Array.from(
      document.querySelectorAll('.usage-meter__account-label')
    ).map((label) => label.textContent);
    expect(labels).toEqual(['a@x.com · plus', 'a@x.com · team']);
    meter.destroy();
  });

  test('renders the Codex plan tag on an account row', async () => {
    const mount = mountMeter();
    stubProviders(
      { available: false },
      {
        available: false,
        accounts: [accountRow({ number: 1, plan: 'pro' })]
      }
    );

    const meter = createUsageMeter(mount);
    await openCard(mount);

    expect(
      document.querySelector('.usage-meter__account-tag')?.textContent
    ).toBe('pro');
    meter.destroy();
  });

  test('draws one bar for a row that reports a single window', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [
        accountRow({
          number: 1,
          status: 'ok',
          windows: [{ key: '5h', pct: 31, resetsAt: '' }]
        })
      ]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    const bars = document.querySelectorAll('.usage-meter__account-window');
    expect(bars).toHaveLength(1);
    expect(
      bars[0].querySelector('.usage-meter__account-key')?.textContent
    ).toBe('5h');
    meter.destroy();
  });

  test('replaces the bars with a short expiry status on an expired account', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1, status: 'token_expired' })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    expect(
      document
        .querySelector('.usage-meter__account-status')
        ?.textContent?.trim()
    ).toBe('토큰 만료');
    expect(document.querySelector('.usage-meter__account-window')).toBeNull();
    meter.destroy();
  });

  test('shows a plain empty message for other non-ok statuses', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1, status: 'api_key' })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    expect(
      document
        .querySelector('.usage-meter__account-status')
        ?.textContent?.trim()
    ).toBe('사용량 없음');
    meter.destroy();
  });

  test('enables the switch button on a row whose status is not ok', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1, status: 'token_expired' })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    const button = /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    );
    expect(button.disabled).toBe(false);
    meter.destroy();
  });

  test('counts zero active accounts in the section heading', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [
        accountRow({ number: 1 }),
        accountRow({ number: 2, email: 'two@example.com' })
      ]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    expect(
      document
        .querySelector('.usage-meter__section-title')
        ?.textContent?.replace(/\s+/g, ' ')
        .trim()
    ).toBe('Claude · 활성 0 / 전체 2');
    expect(mount.querySelector('.usage-meter__badge')?.textContent).toBe('+2');
    meter.destroy();
  });

  test('renders the persistent card note', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1 })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    expect(document.querySelector('.usage-meter__note')?.textContent).toBe(
      '전환은 새로 시작하는 세션부터 적용됩니다.'
    );
    meter.destroy();
  });

  test('declares the mobile bottom sheet and scrim rules', () => {
    const styles = fs.readFileSync('app/styles.css', 'utf8');

    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.usage-meter__scrim\s*{[\s\S]*?display: block;/
    );
    expect(styles).toMatch(
      /@media \(max-width: 640px\)[\s\S]*?\.usage-meter__card\s*{[\s\S]*?position: fixed;/
    );
  });
});

describe('usage meter account switch', () => {
  /**
   * @param {unknown} switch_payload
   * @param {string} [provider]
   */
  function stubSwitch(switch_payload, provider = 'claude') {
    const usage_payload = {
      available: false,
      accounts: [accountRow({ number: 1, status: 'token_expired' })]
    };
    const fetchMock = vi.fn((/** @type {string} */ url) => {
      if (url === `/api/${provider}-account/switch`) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(switch_payload)
        });
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            url === `/api/${provider}-usage`
              ? usage_payload
              : { available: false }
          )
      });
    });
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
  }

  test('posts the account number and refetches usage on success', async () => {
    const mount = mountMeter();
    const fetchMock = stubSwitch({ ok: true, switched: true, warnings: [] });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(
        fetchMock.mock.calls.filter((call) => call[0] === '/api/claude-usage')
      ).toHaveLength(2)
    );

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/claude-account/switch',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ number: 1 })
      })
    );
    meter.destroy();
  });

  test('keeps the Claude switch pending until usage refresh settles', async () => {
    const mount = mountMeter();
    const fetchMock = stubSwitch({ ok: true, switched: true, warnings: [] });
    const meter = createUsageMeter(mount);
    await openCard(mount);
    /** @type {(value: unknown) => void} */
    let release = () => {};
    const pending_usage = new Promise((resolve) => {
      release = resolve;
    });
    fetchMock.mockImplementation((url) => {
      if (url === '/api/claude-usage') {
        return pending_usage.then((payload) => ({
          ok: true,
          json: () => Promise.resolve(payload)
        }));
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ok: true, switched: true, warnings: [] })
      });
    });

    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(
        fetchMock.mock.calls.filter((call) => call[0] === '/api/claude-usage')
      ).toHaveLength(2)
    );

    const button = /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    );
    expect(button.disabled).toBe(true);
    expect(button.textContent).toContain('전환 중');
    button.click();
    expect(
      fetchMock.mock.calls.filter(
        (call) => call[0] === '/api/claude-account/switch'
      )
    ).toHaveLength(1);
    release({
      available: false,
      accounts: [accountRow({ number: 1, status: 'token_expired' })]
    });
    await vi.waitFor(() => expect(button.disabled).toBe(false));
    meter.destroy();
  });

  test.each(['claude', 'codex'])(
    'shows %s worker usage and login risk on the account row',
    async (provider) => {
      const mount = mountMeter();
      const fetchMock = stubSwitch(
        { ok: false, error: 'account_in_use', in_use: ['UI-one', 'UI-two'] },
        provider
      );

      const meter = createUsageMeter(mount);
      await openCard(mount);
      /** @type {HTMLButtonElement} */ (
        document.querySelector('.usage-meter__switch')
      ).click();
      await vi.waitFor(() =>
        expect(document.querySelector('.usage-meter__confirm')).not.toBeNull()
      );

      const row = document.querySelector('.usage-meter__account');
      expect(row?.textContent).toContain('UI-one, UI-two');
      expect(row?.textContent).toContain('토큰 갱신 충돌');
      expect(row?.textContent).toContain('그래도 전환');
      expect(row?.textContent).toContain('취소');
      expect(
        fetchMock.mock.calls.filter(
          (call) => call[0] === `/api/${provider}-usage`
        )
      ).toHaveLength(1);
      meter.destroy();
    }
  );

  test.each(['claude', 'codex'])(
    'retries %s with confirm true and refreshes after success',
    async (provider) => {
      const mount = mountMeter();
      const fetchMock = stubSwitch(
        { ok: false, error: 'account_in_use', in_use: ['UI-one'] },
        provider
      );

      const meter = createUsageMeter(mount);
      await openCard(mount);
      /** @type {HTMLButtonElement} */ (
        document.querySelector('.usage-meter__switch')
      ).click();
      await vi.waitFor(() =>
        expect(document.querySelector('.usage-meter__confirm')).not.toBeNull()
      );
      fetchMock.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ ok: true, switched: true, warnings: [] })
      });
      /** @type {HTMLButtonElement} */ (
        document.querySelector('.usage-meter__confirm')
      ).click();
      await vi.waitFor(() =>
        expect(
          fetchMock.mock.calls.filter(
            (call) => call[0] === `/api/${provider}-usage`
          )
        ).toHaveLength(2)
      );

      expect(fetchMock).toHaveBeenCalledWith(
        `/api/${provider}-account/switch`,
        expect.objectContaining({
          body: JSON.stringify({ number: 1, confirm: true })
        })
      );
      expect(document.querySelector('.usage-meter__confirm')).toBeNull();
      meter.destroy();
    }
  );

  test('cancels confirmation without another request', async () => {
    const mount = mountMeter();
    const fetchMock = stubSwitch({
      ok: false,
      error: 'account_in_use',
      in_use: ['UI-one']
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(document.querySelector('.usage-meter__cancel')).not.toBeNull()
    );
    const calls_before_cancel = fetchMock.mock.calls.length;
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__cancel')
    ).click();

    expect(fetchMock).toHaveBeenCalledTimes(calls_before_cancel);
    expect(document.querySelector('.usage-meter__account-message')).toBeNull();
    expect(
      document.querySelector('.usage-meter__switch')?.textContent?.trim()
    ).toBe('전환');
    meter.destroy();
  });

  test('shows the returned warnings under the switched row', async () => {
    const mount = mountMeter();
    stubSwitch({ ok: true, switched: true, warnings: ['stale keychain'] });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(
        document.querySelector('.usage-meter__account-message--warn')
      ).not.toBeNull()
    );

    expect(
      document
        .querySelector('.usage-meter__account-message--warn')
        ?.textContent?.trim()
    ).toBe('stale keychain');
    meter.destroy();
  });

  test('shows the raw error under the row and restores the button on failure', async () => {
    const mount = mountMeter();
    stubSwitch({ ok: false, error: 'not_found' });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(
        document.querySelector('.usage-meter__account-message--error')
      ).not.toBeNull()
    );

    expect(
      document
        .querySelector('.usage-meter__account-message--error')
        ?.textContent?.trim()
    ).toBe('전환 실패 — not_found');
    const button = /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    );
    expect(button.disabled).toBe(false);
    meter.destroy();
  });

  test('reports a network failure as a row-level error', async () => {
    const mount = mountMeter();
    const claude_payload = {
      available: false,
      accounts: [accountRow({ number: 1 })]
    };
    const fetchMock = vi.fn((/** @type {string} */ url) => {
      if (url === '/api/claude-account/switch') {
        return Promise.reject(new Error('offline'));
      }
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve(
            url === '/api/codex-usage' ? { available: false } : claude_payload
          )
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await openCard(mount);
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(
        document.querySelector('.usage-meter__account-message--error')
      ).not.toBeNull()
    );

    expect(
      document
        .querySelector('.usage-meter__account-message--error')
        ?.textContent?.trim()
    ).toBe('전환 실패 — network_error');
    meter.destroy();
  });
  test('switches one provider while the other provider switch is in flight', async () => {
    const mount = mountMeter();
    /** @type {(value: unknown) => void} */
    let releaseClaudeSwitch = () => {};
    const claude_switch = new Promise((resolve) => {
      releaseClaudeSwitch = resolve;
    });
    const accounts_payload = {
      available: false,
      accounts: [accountRow({ number: 1, status: 'token_expired' })]
    };
    const fetchMock = vi.fn((/** @type {string} */ url) => {
      if (url === '/api/claude-account/switch') {
        return claude_switch.then(() => ({
          ok: true,
          json: () => Promise.resolve({ ok: true, switched: true })
        }));
      }
      if (url === '/api/codex-account/switch') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ok: true, switched: true })
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(accounts_payload)
      });
    });
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await openCard(mount);
    /**
     * @param {number} index
     */
    function switchButton(index) {
      return /** @type {HTMLButtonElement} */ (
        document.querySelectorAll('.usage-meter__switch')[index]
      );
    }
    switchButton(0).click();
    await vi.waitFor(() => expect(switchButton(0).disabled).toBe(true));
    await openCard(mount, 'Codex');
    switchButton(0).click();
    await vi.waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/codex-account/switch',
        expect.objectContaining({ method: 'POST' })
      )
    );

    await openCard(mount, 'Claude');
    expect(switchButton(0).disabled).toBe(true);
    releaseClaudeSwitch(undefined);
    meter.destroy();
  });
  test('drops a poll that settles after a newer refresh', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    /**
     * @param {number} active_number
     */
    function claudePayload(active_number) {
      return {
        available: false,
        accounts: [
          accountRow({
            number: active_number,
            email: `account-${active_number}@example.com`,
            active: true
          }),
          accountRow({
            number: active_number === 1 ? 2 : 1,
            email: `account-${active_number === 1 ? 2 : 1}@example.com`
          })
        ]
      };
    }
    /** @type {(value: unknown) => void} */
    let releaseStalePoll = () => {};
    const stale_poll = new Promise((resolve) => {
      releaseStalePoll = resolve;
    });
    let claude_calls = 0;
    const fetchMock = vi.fn((/** @type {string} */ url) => {
      if (url === '/api/claude-account/switch') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ ok: true, switched: true })
        });
      }
      if (url !== '/api/claude-usage') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ available: false })
        });
      }
      claude_calls += 1;
      const stale = claude_calls === 2;
      const response = {
        ok: true,
        json: () => Promise.resolve(claudePayload(stale ? 1 : claude_calls))
      };
      return stale
        ? stale_poll.then(() => response)
        : Promise.resolve(response);
    });
    vi.stubGlobal('fetch', fetchMock);

    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    await vi.advanceTimersByTimeAsync(60_000);
    /** @type {HTMLButtonElement} */ (toggleButton(mount)).click();
    /** @type {HTMLButtonElement} */ (
      document.querySelector('.usage-meter__switch')
    ).click();
    await vi.advanceTimersByTimeAsync(1);
    releaseStalePoll(undefined);
    await vi.advanceTimersByTimeAsync(1);

    expect(
      document.querySelector(
        '.usage-meter__account--active .usage-meter__account-label'
      )?.textContent
    ).toBe('account-3@example.com');
    meter.destroy();
  });
});

describe('usage meter snapshot hold', () => {
  test('keeps the last good group when a later poll fails', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubOnceThenFail(
      usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }])
    );

    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    await vi.advanceTimersByTimeAsync(60_000);

    expect(mount.querySelectorAll('.usage-meter__window')).toHaveLength(1);
    expect(mount.querySelector('.usage-meter__group')?.classList).toContain(
      'usage-meter__group--stale'
    );
    meter.destroy();
  });

  test('ages the tooltip of a held group while the failures continue', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubOnceThenFail(
      usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }], 30)
    );

    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    await vi.advanceTimersByTimeAsync(5 * 60_000);

    expect(
      mount.querySelector('.usage-meter__window')?.getAttribute('title')
    ).toContain('5분 전 측정');
    meter.destroy();
  });

  test('degrades a held group to the empty state past the stale bound', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    stubOnceThenFail(
      usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }], 30)
    );

    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    await vi.advanceTimersByTimeAsync(10 * 60_000);

    expect(mount.querySelector('.usage-meter__provider')?.textContent).toBe(
      'Claude'
    );
    expect(mount.querySelector('.usage-meter__empty')).not.toBeNull();
    expect(mount.querySelector('.usage-meter__window')).toBeNull();
    meter.destroy();
  });

  test('drops the group when the provider reports no managed account', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    let served = false;
    vi.stubGlobal(
      'fetch',
      vi.fn((/** @type {string} */ url) => {
        if (url !== '/api/claude-usage') {
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve({ available: false })
          });
        }
        const payload = served
          ? { available: false, accounts: [] }
          : usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }]);
        served = true;
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(payload)
        });
      })
    );

    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    await vi.advanceTimersByTimeAsync(60_000);

    expect(mount.hidden).toBe(true);
    expect(mount.querySelector('.usage-meter')).toBeNull();
    meter.destroy();
  });
});

/**
 * Serve one good Claude payload, then fail every later lookup — the shape of a
 * usage tool that times out or exits non-zero on a later poll.
 *
 * @param {unknown} claude_payload
 */
function stubOnceThenFail(claude_payload) {
  let served = false;
  const fetchMock = vi.fn((/** @type {string} */ url) => {
    if (url === '/api/claude-usage' && !served) {
      served = true;
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve(claude_payload)
      });
    }
    return Promise.reject(new Error('offline'));
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

describe('usage meter polling while idle (UI-yu2o)', () => {
  /**
   * Make the page read as shown or hidden.
   *
   * @param {'visible'|'hidden'} value
   */
  function setVisibility(value) {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => value
    });
  }

  afterEach(() => {
    // @ts-expect-error -- drop the instance override, back to the prototype getter.
    delete document.visibilityState;
  });

  /** @returns {HTMLElement} */
  function mountMeter() {
    document.body.innerHTML = '<div id="usage-meter"></div>';
    return /** @type {HTMLElement} */ (document.getElementById('usage-meter'));
  }

  test('skips a poll that comes due while the page is hidden', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    const { fetchMock } = stubFetch(
      usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }])
    );
    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    setVisibility('hidden');

    await vi.advanceTimersByTimeAsync(60_000);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    meter.destroy();
  });

  test('reads once when the page shows again after a missed poll', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    const { fetchMock } = stubFetch(
      usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }])
    );
    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    setVisibility('hidden');
    await vi.advanceTimersByTimeAsync(60_000);

    setVisibility('visible');
    document.dispatchEvent(new Event('visibilitychange'));
    document.dispatchEvent(new Event('visibilitychange'));
    await vi.advanceTimersByTimeAsync(1);

    expect(fetchMock).toHaveBeenCalledTimes(4);
    meter.destroy();
  });

  test('leaves the header untouched when a poll reads the same usage', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 3 * 60 * 60_000).toISOString();
    stubFetch(usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }]));
    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    const renders = () =>
      vi.mocked(render).mock.calls.filter((call) => call[1] === mount).length;
    const before = renders();

    await vi.advanceTimersByTimeAsync(60_000);

    expect(renders()).toBe(before);
    meter.destroy();
  });

  test('defers the first read of a meter created in a hidden page', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 60 * 60_000).toISOString();
    const { fetchMock } = stubFetch(
      usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }])
    );
    setVisibility('hidden');
    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    const hidden_calls = fetchMock.mock.calls.length;

    setVisibility('visible');
    document.dispatchEvent(new Event('visibilitychange'));
    await vi.advanceTimersByTimeAsync(1);

    expect([hidden_calls, fetchMock.mock.calls.length]).toEqual([0, 2]);
    meter.destroy();
  });

  test('leaves an already empty meter untouched when a poll reads nothing', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ available: false })
        })
      )
    );
    const meter = createUsageMeter(mount);
    await vi.advanceTimersByTimeAsync(1);
    const renders = () =>
      vi.mocked(render).mock.calls.filter((call) => call[1] === mount).length;
    const before = renders();

    await vi.advanceTimersByTimeAsync(60_000);

    expect([renders() - before, mount.hidden]).toEqual([0, true]);
    meter.destroy();
  });

  test('names only the reset clock in the header tooltip', async () => {
    const mount = mountMeter();
    const reset_at = new Date(Date.now() + 3 * 60 * 60_000).toISOString();
    stubFetch(usageResponse([{ key: '5h', pct: 26, resetsAt: reset_at }]));

    const meter = createUsageMeter(mount);
    await vi.waitFor(() =>
      expect(mount.querySelector('.usage-meter__window')).not.toBeNull()
    );

    expect(
      mount.querySelector('.usage-meter__window')?.getAttribute('title')
    ).toBe(`resets ${formatResetClock(reset_at)}`);
    meter.destroy();
  });
});

describe('usage meter default account (UI-32oq §4.4)', () => {
  const ENTRY = {
    auto_switch: true,
    default_account: null,
    accounts: [],
    preempt_pct: null
  };

  /**
   * A settings store whose Claude entry is laid over by `claude`.
   *
   * @param {Record<string, unknown>} [claude]
   * @param {any} [departures]
   */
  function settingsStore(claude = {}, departures) {
    const store = createLimitPolicySettingsStore();
    store.set({
      revision: 5,
      runners: { claude: { ...ENTRY, ...claude }, codex: ENTRY },
      departures: departures ?? { claude: null, codex: null }
    });
    return store;
  }

  function serveTwoClaudeAccounts() {
    stubProviders({
      available: false,
      accounts: [
        accountRow({ number: 1, email: 'one@example.com', active: true }),
        accountRow({ number: 2, email: 'two@example.com' })
      ]
    });
  }

  /**
   * @param {string} key
   * @returns {HTMLButtonElement}
   */
  function star(key) {
    return /** @type {HTMLButtonElement} */ (
      document.querySelector(`[data-default-account="${key}"]`)
    );
  }

  test('draws no star without a settings snapshot', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const meter = createUsageMeter(mount, {
      limitPolicy: {
        store: createLimitPolicySettingsStore(),
        transport: vi.fn()
      }
    });

    await openCard(mount);

    expect(document.querySelector('.usage-meter__default')).toBeNull();
    meter.destroy();
  });

  test('draws no head line without a settings snapshot', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const meter = createUsageMeter(mount, {
      limitPolicy: {
        store: createLimitPolicySettingsStore(),
        transport: vi.fn()
      }
    });

    await openCard(mount);

    expect(document.querySelector('.usage-meter__policy')).toBeNull();
    meter.destroy();
  });

  test('marks the current default row active', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const meter = createUsageMeter(mount, {
      limitPolicy: {
        store: settingsStore({ default_account: 'two@example.com' }),
        transport: vi.fn()
      }
    });

    await openCard(mount);

    expect(star('two@example.com').classList).toContain('is-active');
    expect(star('one@example.com').classList).not.toContain('is-active');
    meter.destroy();
  });

  test('makes a clicked row the runner default with the current revision', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const transport = vi.fn(async () => ({ ok: true }));
    const meter = createUsageMeter(mount, {
      limitPolicy: { store: settingsStore(), transport }
    });
    await openCard(mount);

    star('two@example.com').click();

    await vi.waitFor(() =>
      expect(transport).toHaveBeenCalledWith('limit-policy-settings-set', {
        expected_revision: 5,
        runners: { claude: { default_account: 'two@example.com' } }
      })
    );
    meter.destroy();
  });

  test('clears the default when its own row is clicked again', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const transport = vi.fn(async () => ({ ok: true }));
    const meter = createUsageMeter(mount, {
      limitPolicy: {
        store: settingsStore({ default_account: 'two@example.com' }),
        transport
      }
    });
    await openCard(mount);

    star('two@example.com').click();

    await vi.waitFor(() =>
      expect(transport).toHaveBeenCalledWith('limit-policy-settings-set', {
        expected_revision: 5,
        runners: { claude: { default_account: null } }
      })
    );
    meter.destroy();
  });

  test('raises an error toast on a conflict', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const toast = vi.fn();
    const transport = vi.fn(async () => ({
      ok: false,
      code: 'conflict',
      message: 'stale',
      snapshot: null
    }));
    const meter = createUsageMeter(mount, {
      limitPolicy: { store: settingsStore(), transport, toast }
    });
    await openCard(mount);

    star('two@example.com').click();

    await vi.waitFor(() => expect(toast).toHaveBeenCalledTimes(1));
    expect(toast.mock.calls[0][1]).toBe('error');
    meter.destroy();
  });

  test('sends a conflicted click only once', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const toast = vi.fn();
    const transport = vi.fn(async () => ({
      ok: false,
      code: 'conflict',
      message: 'stale',
      snapshot: null
    }));
    const meter = createUsageMeter(mount, {
      limitPolicy: { store: settingsStore(), transport, toast }
    });
    await openCard(mount);

    star('two@example.com').click();

    await vi.waitFor(() => expect(toast).toHaveBeenCalled());
    expect(transport).toHaveBeenCalledTimes(1);
    meter.destroy();
  });

  test('redraws the stars from the snapshot a conflict carries', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const store = settingsStore();
    const transport = vi.fn(async () => ({
      ok: false,
      code: 'conflict',
      message: 'stale',
      snapshot: {
        revision: 6,
        runners: {
          claude: { ...ENTRY, default_account: 'one@example.com' },
          codex: ENTRY
        },
        departures: { claude: null, codex: null }
      }
    }));
    const meter = createUsageMeter(mount, {
      limitPolicy: { store, transport, toast: vi.fn() }
    });
    await openCard(mount);

    star('two@example.com').click();

    await vi.waitFor(() =>
      expect(star('one@example.com').classList).toContain('is-active')
    );
    expect(store.get()?.revision).toBe(6);
    meter.destroy();
  });

  test('says the auto switch state and the default on the head line', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const meter = createUsageMeter(mount, {
      limitPolicy: {
        store: settingsStore({ default_account: 'two@example.com' }),
        transport: vi.fn()
      }
    });

    await openCard(mount);

    expect(
      document.querySelector('[data-limit-policy-line="claude"]')?.textContent
    ).toContain('자동 전환 켬 · default two@example.com');
    meter.destroy();
  });

  test('says an empty default when the entry carries no default account', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const meter = createUsageMeter(mount, {
      limitPolicy: {
        store: settingsStore({ default_account: undefined }),
        transport: vi.fn()
      }
    });

    await openCard(mount);

    expect(
      document
        .querySelector('[data-limit-policy-line="claude"]')
        ?.textContent?.trim()
    ).toBe('자동 전환 켬 · default 비움');
    meter.destroy();
  });

  test('adds the return time to the head line while a departure stands', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const until = new Date(2026, 10, 10, 9, 30).toISOString();
    const meter = createUsageMeter(mount, {
      limitPolicy: {
        store: settingsStore(
          { default_account: 'two@example.com' },
          {
            claude: {
              default_account: 'two@example.com',
              to_account: 'one@example.com',
              until
            },
            codex: null
          }
        ),
        transport: vi.fn()
      }
    });

    await openCard(mount);

    expect(
      document
        .querySelector('[data-limit-policy-line="claude"]')
        ?.textContent?.trim()
    ).toBe('자동 전환 켬 · default two@example.com · 리셋 09:30 뒤 복귀');
    meter.destroy();
  });

  test('re-reads the account lists when a departure record appears', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const store = settingsStore();
    const meter = createUsageMeter(mount, {
      limitPolicy: { store, transport: vi.fn() }
    });
    await openCard(mount);
    const fetchMock = /** @type {any} */ (globalThis.fetch);
    const before = fetchMock.mock.calls.length;

    store.set(
      settingsStore(
        {},
        {
          claude: {
            default_account: 'two@example.com',
            to_account: 'one@example.com',
            until: null
          },
          codex: null
        }
      ).get()
    );

    expect(fetchMock.mock.calls.length).toBe(before + 2);
    meter.destroy();
  });

  test('redraws the open card when the settings store changes', async () => {
    const mount = mountMeter();
    serveTwoClaudeAccounts();
    const store = settingsStore();
    const meter = createUsageMeter(mount, {
      limitPolicy: { store, transport: vi.fn() }
    });
    await openCard(mount);
    await vi.waitFor(() => expect(star('two@example.com')).not.toBeNull());

    store.set(settingsStore({ default_account: 'two@example.com' }).get());

    expect(star('two@example.com').classList).toContain('is-active');
    meter.destroy();
  });
});

describe('usage meter account login and removal (UI-xm29 §4.5)', () => {
  const CODEX = {
    key: 'codex',
    label: 'Codex',
    endpoint: '/api/codex-usage',
    switch_endpoint: '/api/codex-account/switch',
    remove_endpoint: '/api/codex-account/remove',
    login_tools: 'codex·codex-auth'
  };

  /**
   * Serve the usage lists plus scripted account answers. A route key is
   * `<METHOD> <url>`; its queue answers in order and repeats its last entry.
   * A usage payload may be a function, read on every poll.
   *
   * @param {{ claude?: unknown, codex?: unknown, routes?: Record<string, unknown[]> }} options
   */
  function stubAccountApi({
    claude = { available: false },
    codex = { available: false },
    routes = {}
  }) {
    /** @type {Record<string, unknown[]>} */
    const queues = {};
    for (const [route, answers] of Object.entries(routes)) {
      queues[route] = [...answers];
    }
    const fetchMock = vi.fn(
      (/** @type {string} */ url, /** @type {RequestInit} */ init) => {
        const method = init?.method ?? 'GET';
        /** @type {unknown} */
        let payload = { ok: false, error: 'unrouted' };
        if (url === '/api/claude-usage') {
          payload = typeof claude === 'function' ? claude() : claude;
        } else if (url === '/api/codex-usage') {
          payload = typeof codex === 'function' ? codex() : codex;
        } else {
          const queue = queues[`${method} ${url}`];
          if (queue !== undefined) {
            payload = queue.length > 1 ? queue.shift() : queue[0];
          }
        }
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(payload)
        });
      }
    );
    vi.stubGlobal('fetch', fetchMock);
    return fetchMock;
  }

  /**
   * @param {ReturnType<typeof vi.fn>} fetchMock
   * @param {string} method
   * @param {string} url
   */
  function callsTo(fetchMock, method, url) {
    return fetchMock.mock.calls.filter(
      (call) => call[0] === url && (call[1]?.method ?? 'GET') === method
    );
  }

  /**
   * @param {ReturnType<typeof vi.fn>} fetchMock
   * @param {string} url
   */
  function postedBody(fetchMock, url) {
    const calls = callsTo(fetchMock, 'POST', url);
    return JSON.parse(String(calls[calls.length - 1]?.[1]?.body));
  }

  /** Let pending fetch answers and timers due now land. */
  async function flush() {
    await vi.advanceTimersByTimeAsync(1);
  }

  /**
   * Open the card of one provider under fake timers.
   *
   * @param {HTMLElement} mount
   * @param {string} [label]
   */
  async function openFakeCard(mount, label) {
    await flush();
    /** @type {HTMLButtonElement} */ (toggleButton(mount, label)).click();
    await flush();
  }

  /**
   * @param {string} selector
   * @returns {HTMLElement}
   */
  function el(selector) {
    return /** @type {HTMLElement} */ (document.querySelector(selector));
  }

  /**
   * @param {string} selector
   */
  function text(selector) {
    return document
      .querySelector(selector)
      ?.textContent?.replace(/\s+/g, ' ')
      .trim();
  }

  const TWO_CLAUDE = {
    available: false,
    accounts: [
      accountRow({ number: 1, active: true }),
      accountRow({ number: 2, email: 'two@example.com' })
    ]
  };

  const EXPIRED_CLAUDE = {
    available: false,
    accounts: [
      accountRow({ number: 1, active: true }),
      accountRow({
        number: 2,
        email: 'two@example.com',
        status: 'token_expired'
      })
    ]
  };

  const CODEX_AWAITING = {
    ok: true,
    login_id: 'L1',
    provider: 'codex',
    mode: 'add',
    number: null,
    state: 'awaiting_user',
    url: 'https://auth.openai.com/codex/device',
    user_code: 'ABCD-12345',
    needs_code: false
  };

  const CLAUDE_AWAITING = {
    ok: true,
    login_id: 'L1',
    provider: 'claude',
    mode: 'relogin',
    number: 2,
    state: 'awaiting_user',
    url: 'https://claude.ai/oauth/authorize?x=1',
    user_code: null,
    needs_code: true
  };

  test('offers 재로그인 only on an expired row', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({ claude: EXPIRED_CLAUDE });
    const meter = createUsageMeter(mount);

    await openFakeCard(mount);

    const buttons = document.querySelectorAll('.usage-meter__relogin');
    expect(buttons).toHaveLength(1);
    expect(buttons[0].closest('.usage-meter__account')?.textContent).toContain(
      'two@example.com'
    );
    expect(buttons[0].className).toBe(
      'op-btn op-btn--primary usage-meter__relogin'
    );
    meter.destroy();
  });

  test('draws 계정 추가 and 관리 on the section title row', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({ claude: TWO_CLAUDE });
    const meter = createUsageMeter(mount);

    await openFakeCard(mount);

    const head = el('.usage-meter__section-head');
    expect(
      Array.from(head.querySelectorAll('button'), (button) =>
        button.textContent?.trim()
      )
    ).toEqual(['+ 계정 추가', '관리']);
    expect(el('.usage-meter__manage').getAttribute('aria-pressed')).toBe(
      'false'
    );
    meter.destroy();
  });

  test('shows 삭제 on the inactive rows while 관리 is on', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({ claude: TWO_CLAUDE });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);

    el('.usage-meter__manage').click();

    const removes = document.querySelectorAll('.usage-meter__remove');
    expect(removes).toHaveLength(1);
    expect(removes[0].className).toBe(
      'op-btn op-btn--danger usage-meter__remove'
    );
    expect(el('.usage-meter__manage').getAttribute('aria-pressed')).toBe(
      'true'
    );
    expect(el('.usage-meter__manage').classList).toContain('is-active');
    meter.destroy();
  });

  test('hides 삭제 again when 관리 turns off', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({ claude: TWO_CLAUDE });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__manage').click();

    el('.usage-meter__manage').click();

    expect(document.querySelector('.usage-meter__remove')).toBeNull();
    expect(document.querySelector('.usage-meter__remove-note')).toBeNull();
    meter.destroy();
  });

  test('shows a muted note instead of 삭제 on the active row', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({ claude: TWO_CLAUDE });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);

    el('.usage-meter__manage').click();

    const active_row = el('.usage-meter__account--active');
    expect(active_row.querySelector('.usage-meter__remove')).toBeNull();
    expect(
      active_row.querySelector('.usage-meter__remove-note')?.textContent?.trim()
    ).toBe('활성 계정은 지울 수 없음');
    meter.destroy();
  });

  test('asks the server without confirm on the first 삭제', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      claude: TWO_CLAUDE,
      routes: {
        'POST /api/claude-account/remove': [
          { ok: false, error: 'confirm_required', refs: [], unchecked_repos: 0 }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__manage').click();

    el('.usage-meter__remove').click();
    await flush();

    expect(postedBody(fetchMock, '/api/claude-account/remove')).toEqual({
      number: 2,
      key: 'two@example.com'
    });
    meter.destroy();
  });

  test('shows 삭제할까요? on the confirm line when nothing names the account', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({
      claude: TWO_CLAUDE,
      routes: {
        'POST /api/claude-account/remove': [
          { ok: false, error: 'confirm_required', refs: [], unchecked_repos: 0 }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__manage').click();

    el('.usage-meter__remove').click();
    await flush();

    const line = el('.usage-meter__account-message');
    expect(text('.usage-meter__message-text')).toBe('삭제할까요?');
    expect(
      Array.from(line.querySelectorAll('button'), (button) =>
        button.textContent?.trim()
      )
    ).toEqual(['삭제', '취소']);
    expect(document.querySelector('.usage-meter__remove')).toBeNull();
    meter.destroy();
  });

  test('lists the settings that name the account on the confirm line', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({
      claude: TWO_CLAUDE,
      routes: {
        'POST /api/claude-account/remove': [
          {
            ok: false,
            error: 'confirm_required',
            refs: [
              { kind: 'default_account' },
              { kind: 'workspace_pin', workspace: 'a', path: '/a' },
              { kind: 'workspace_pin', workspace: 'b', path: '/b' },
              { kind: 'active_allow_list' }
            ],
            unchecked_repos: 1
          }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__manage').click();

    el('.usage-meter__remove').click();
    await flush();

    expect(text('.usage-meter__message-text')).toBe(
      '평소 계정 · 저장소 2곳 고정 · 허용 목록 · 저장소 1곳 확인 못 함 — 그래도 삭제할까요? 평소 계정이 사라지면 자동 복귀가 멈춥니다.'
    );
    meter.destroy();
  });

  test('shows only the reason when the removal is blocked', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({
      claude: TWO_CLAUDE,
      routes: {
        'POST /api/claude-account/remove': [
          { ok: false, error: 'account_in_use', in_use: ['UI-one', 'UI-two'] }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__manage').click();

    el('.usage-meter__remove').click();
    await flush();

    expect(text('.usage-meter__account-message--error')).toBe(
      '실행 중인 워커가 이 계정을 사용 중이라 지울 수 없음 (UI-one, UI-two)'
    );
    expect(document.querySelector('.usage-meter__remove-confirm')).toBeNull();
    meter.destroy();
  });

  test('sends confirm only from the confirm line', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      claude: TWO_CLAUDE,
      routes: {
        'POST /api/claude-account/remove': [
          {
            ok: false,
            error: 'confirm_required',
            refs: [],
            unchecked_repos: 0
          },
          { ok: true, removed: { number: 2, email: 'two@example.com' } }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__manage').click();
    el('.usage-meter__remove').click();
    await flush();

    el('.usage-meter__remove-confirm').click();
    await flush();

    expect(postedBody(fetchMock, '/api/claude-account/remove')).toEqual({
      number: 2,
      key: 'two@example.com',
      confirm: true
    });
    meter.destroy();
  });

  test('reports the removal on the section and re-reads usage', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      claude: TWO_CLAUDE,
      routes: {
        'POST /api/claude-account/remove': [
          {
            ok: false,
            error: 'confirm_required',
            refs: [],
            unchecked_repos: 0
          },
          { ok: true, removed: { number: 2, email: 'two@example.com' } }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__manage').click();
    el('.usage-meter__remove').click();
    await flush();
    const usage_reads = callsTo(fetchMock, 'GET', '/api/claude-usage').length;

    el('.usage-meter__remove-confirm').click();
    await flush();

    expect(text('.usage-meter__section-message')).toBe(
      '삭제됨 — two@example.com'
    );
    expect(callsTo(fetchMock, 'GET', '/api/claude-usage').length).toBe(
      usage_reads + 1
    );
    meter.destroy();
  });

  test('re-reads the list when the account changed under the click', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      claude: TWO_CLAUDE,
      routes: {
        'POST /api/claude-account/remove': [
          { ok: false, error: 'account_changed' }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__manage').click();
    const usage_reads = callsTo(fetchMock, 'GET', '/api/claude-usage').length;

    el('.usage-meter__remove').click();
    await flush();

    expect(callsTo(fetchMock, 'GET', '/api/claude-usage').length).toBe(
      usage_reads + 1
    );
    expect(text('.usage-meter__section-message')).toBe(
      '계정 목록이 바뀌어 지우지 않음 — 목록을 다시 읽었습니다'
    );
    meter.destroy();
  });

  test('starts an add login for the section provider', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CODEX_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');

    el('.usage-meter__add').click();
    await flush();

    expect(postedBody(fetchMock, '/api/account-login')).toEqual({
      provider: 'codex',
      mode: 'add'
    });
    meter.destroy();
  });

  test('shows the Codex link, device code and waiting line', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CODEX_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');

    el('.usage-meter__add').click();
    await flush();

    const link = /** @type {HTMLAnchorElement} */ (
      el('.usage-meter__login-link')
    );
    expect([
      text('.usage-meter__login-hint'),
      link.getAttribute('href'),
      link.getAttribute('target'),
      link.getAttribute('rel'),
      text('.usage-meter__login-code'),
      text('.usage-meter__login-copy'),
      text('.usage-meter__login-wait'),
      text('.usage-meter__login-cancel')
    ]).toEqual([
      '이 링크를 열어 로그인하고 코드를 입력하세요',
      'https://auth.openai.com/codex/device',
      '_blank',
      'noopener',
      'ABCD-12345',
      '복사',
      '기다리는 중…',
      '취소'
    ]);
    meter.destroy();
  });

  test('copies the Codex device code', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText }
    });
    stubAccountApi({
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CODEX_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');
    el('.usage-meter__add').click();
    await flush();

    el('.usage-meter__login-copy').click();
    await flush();

    expect(writeText).toHaveBeenCalledWith('ABCD-12345');
    expect(text('.usage-meter__login-copy')).toBe('복사됨');
    meter.destroy();
    // @ts-expect-error -- drop the instance override.
    delete navigator.clipboard;
  });

  test('shows the Claude link and a code field for a relogin', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      claude: EXPIRED_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CLAUDE_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);

    el('.usage-meter__relogin').click();
    await flush();

    expect(postedBody(fetchMock, '/api/account-login')).toEqual({
      provider: 'claude',
      mode: 'relogin',
      number: 2
    });
    expect([
      text('.usage-meter__login-title'),
      text('.usage-meter__login-hint'),
      el('.usage-meter__login-link').getAttribute('href'),
      el('.usage-meter__login-input').className,
      text('.usage-meter__login-submit')
    ]).toEqual([
      '재로그인 — two@example.com',
      '이 링크를 열어 로그인한 뒤 받은 코드를 붙여 넣으세요',
      'https://claude.ai/oauth/authorize?x=1',
      'ui-input usage-meter__login-input',
      '확인'
    ]);
    meter.destroy();
  });

  test('keeps the typed code across the usage poll re-render', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({
      claude: EXPIRED_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CLAUDE_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__relogin').click();
    await flush();
    const input = /** @type {HTMLInputElement} */ (
      el('.usage-meter__login-input')
    );
    input.value = 'pasted-code';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    await vi.advanceTimersByTimeAsync(60_000);

    expect(
      /** @type {HTMLInputElement} */ (el('.usage-meter__login-input')).value
    ).toBe('pasted-code');
    meter.destroy();
  });

  test('submits the pasted code once and waits for verification', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      claude: EXPIRED_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [
          CLAUDE_AWAITING,
          { ...CLAUDE_AWAITING, state: 'verifying', needs_code: false }
        ],
        'POST /api/account-login/L1/code': [{ ok: true, state: 'verifying' }]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);
    el('.usage-meter__relogin').click();
    await flush();
    const input = /** @type {HTMLInputElement} */ (
      el('.usage-meter__login-input')
    );
    input.value = ' pasted-code ';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    el('.usage-meter__login-submit').click();
    await flush();

    expect(postedBody(fetchMock, '/api/account-login/L1/code')).toEqual({
      code: 'pasted-code'
    });
    expect(document.querySelector('.usage-meter__login-input')).toBeNull();
    expect(text('.usage-meter__login-wait')).toBe('확인하는 중…');
    meter.destroy();
  });

  test('cancels the session and closes the panel', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CODEX_AWAITING],
        'POST /api/account-login/L1/cancel': [
          { ok: true, state: 'cancelled', error: null }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');
    el('.usage-meter__add').click();
    await flush();

    el('.usage-meter__login-cancel').click();
    await flush();

    expect(
      callsTo(fetchMock, 'POST', '/api/account-login/L1/cancel')
    ).toHaveLength(1);
    expect(document.querySelector('.usage-meter__login')).toBeNull();
    expect(text('.usage-meter__section-message')).toBe('로그인 취소됨');
    meter.destroy();
  });

  test('opens the running session panel on login_in_flight', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      claude: EXPIRED_CLAUDE,
      routes: {
        'POST /api/account-login': [
          { ok: false, error: 'login_in_flight', login_id: 'L9' }
        ],
        'GET /api/account-login/L9': [
          { ...CLAUDE_AWAITING, login_id: 'L9', mode: 'add', number: null }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);

    el('.usage-meter__relogin').click();
    await flush();

    expect(callsTo(fetchMock, 'GET', '/api/account-login/L9')).toHaveLength(1);
    expect(text('.usage-meter__login-title')).toBe('Claude 계정 추가');
    expect(document.querySelector('.usage-meter__login-input')).not.toBeNull();
    meter.destroy();
  });

  test('reports a jumped-to add on the section, not on the clicked row', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({
      claude: EXPIRED_CLAUDE,
      routes: {
        'POST /api/account-login': [
          { ok: false, error: 'login_in_flight', login_id: 'L9' }
        ],
        'GET /api/account-login/L9': [
          {
            ...CLAUDE_AWAITING,
            login_id: 'L9',
            mode: 'add',
            number: null,
            state: 'done',
            url: null,
            needs_code: false,
            result: {
              outcome: 'added',
              key: 'three@example.com',
              email: 'three@example.com',
              number: null
            }
          }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);

    el('.usage-meter__relogin').click();
    await flush();

    expect([
      text('.usage-meter__section-message'),
      document.querySelector(
        '.usage-meter__account .usage-meter__account-message'
      )
    ]).toEqual(['추가됨 — three@example.com', null]);
    meter.destroy();
  });

  test('reads the session status every 2 seconds while the panel is open', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CODEX_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');
    el('.usage-meter__add').click();
    await flush();

    await vi.advanceTimersByTimeAsync(4_000);

    expect(callsTo(fetchMock, 'GET', '/api/account-login/L1')).toHaveLength(3);
    meter.destroy();
  });

  test('stops reading the status once the session ends', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [
          CODEX_AWAITING,
          {
            ...CODEX_AWAITING,
            state: 'failed',
            url: null,
            user_code: null,
            error: 'login_failed',
            message: 'denied'
          }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');
    el('.usage-meter__add').click();
    await flush();
    await vi.advanceTimersByTimeAsync(2_000);
    const reads = callsTo(fetchMock, 'GET', '/api/account-login/L1').length;

    await vi.advanceTimersByTimeAsync(10_000);

    expect([
      reads,
      callsTo(fetchMock, 'GET', '/api/account-login/L1').length,
      document.querySelector('.usage-meter__login')
    ]).toEqual([2, 2, null]);
    meter.destroy();
  });

  test('stops reading the status when the card closes', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CODEX_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');
    el('.usage-meter__add').click();
    await flush();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    const reads = callsTo(fetchMock, 'GET', '/api/account-login/L1').length;

    await vi.advanceTimersByTimeAsync(10_000);

    expect(callsTo(fetchMock, 'GET', '/api/account-login/L1').length).toBe(
      reads
    );
    meter.destroy();
  });

  test('resumes the open panel when the card opens on its provider again', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      claude: TWO_CLAUDE,
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CODEX_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');
    el('.usage-meter__add').click();
    await flush();
    /** @type {HTMLButtonElement} */ (toggleButton(mount, 'Claude')).click();
    await vi.advanceTimersByTimeAsync(10_000);
    const reads = callsTo(fetchMock, 'GET', '/api/account-login/L1').length;

    /** @type {HTMLButtonElement} */ (toggleButton(mount, 'Codex')).click();
    await flush();

    expect([
      callsTo(fetchMock, 'GET', '/api/account-login/L1').length - reads,
      text('.usage-meter__login-code')
    ]).toEqual([1, 'ABCD-12345']);
    meter.destroy();
  });

  test('stops reading the status on destroy', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    const fetchMock = stubAccountApi({
      codex: TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [CODEX_AWAITING]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');
    el('.usage-meter__add').click();
    await flush();
    const reads = callsTo(fetchMock, 'GET', '/api/account-login/L1').length;

    meter.destroy();
    await vi.advanceTimersByTimeAsync(10_000);

    expect(callsTo(fetchMock, 'GET', '/api/account-login/L1').length).toBe(
      reads
    );
  });

  test('reports a finished relogin as 로그인됨 on its row', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({
      claude: EXPIRED_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [
          {
            ...CLAUDE_AWAITING,
            state: 'done',
            url: null,
            needs_code: false,
            result: {
              outcome: 'updated',
              key: 'two@example.com',
              email: 'two@example.com',
              number: 2
            }
          }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);

    el('.usage-meter__relogin').click();
    await flush();

    const rows = document.querySelectorAll('.usage-meter__account');
    expect(
      rows[1]
        .querySelector('.usage-meter__account-message--ok')
        ?.textContent?.trim()
    ).toBe('로그인됨 — two@example.com');
    expect(document.querySelector('.usage-meter__login')).toBeNull();
    meter.destroy();
  });

  test('reports an added account on its new row after re-reading usage', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    let added = false;
    stubAccountApi({
      codex: () =>
        added
          ? {
              available: false,
              accounts: [
                ...TWO_CLAUDE.accounts,
                accountRow({ number: 3, email: 'three@example.com' })
              ]
            }
          : TWO_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [
          {
            ...CODEX_AWAITING,
            state: 'done',
            url: null,
            user_code: null,
            result: {
              outcome: 'added',
              key: 'three@example.com',
              email: 'three@example.com',
              number: 3
            }
          }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount, 'Codex');
    added = true;

    el('.usage-meter__add').click();
    await flush();

    const rows = document.querySelectorAll('.usage-meter__account');
    expect(rows).toHaveLength(3);
    expect(
      rows[2]
        .querySelector('.usage-meter__account-message--ok')
        ?.textContent?.trim()
    ).toBe('추가됨 — three@example.com');
    meter.destroy();
  });

  test('shows the signed-in email when a relogin reaches another account', async () => {
    vi.useFakeTimers();
    const mount = mountMeter();
    stubAccountApi({
      claude: EXPIRED_CLAUDE,
      routes: {
        'POST /api/account-login': [{ ok: true, login_id: 'L1' }],
        'GET /api/account-login/L1': [
          {
            ...CLAUDE_AWAITING,
            state: 'failed',
            url: null,
            needs_code: false,
            error: 'identity_mismatch',
            logged_in_email: 'other@example.com'
          }
        ]
      }
    });
    const meter = createUsageMeter(mount);
    await openFakeCard(mount);

    el('.usage-meter__relogin').click();
    await flush();

    expect(text('.usage-meter__account-message--error')).toBe(
      'other@example.com로 로그인됨 — 다른 계정'
    );
    meter.destroy();
  });

  test('adds the terminal hint to a failed Codex login', () => {
    const body = { error: 'login_failed', message: 'device auth disabled' };

    const sentence = loginFailureText(CODEX, body);

    expect(sentence).toBe(
      '로그인 실패 — device auth disabled · Mac 터미널에서 codex-auth login으로 로그인하세요'
    );
  });

  test('shows an unknown failure code as it is', () => {
    const body = { error: 'brand_new_code' };

    const sentence = loginFailureText(CODEX, body);

    expect(sentence).toBe('로그인 실패 — brand_new_code');
  });

  test('names the provider tools when a login tool is missing', () => {
    const body = { error: 'not_found' };

    const sentence = loginFailureText(CODEX, body);

    expect(sentence).toBe('로그인 실패 — 도구를 찾지 못함 (codex·codex-auth)');
  });

  test('counts the repo policies and leaves out the default note without a usual account', () => {
    const refs = [
      { kind: 'workspace_policy', workspace: 'a' },
      { kind: 'workspace_policy', workspace: 'b' }
    ];

    const sentence = removeConfirmText(refs, 0);

    expect(sentence).toBe('저장소 2곳 한도 정책 — 그래도 삭제할까요?');
  });
});
