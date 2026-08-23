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
 * @param {HTMLElement} mount
 */
function toggleButton(mount) {
  return /** @type {HTMLButtonElement | null} */ (
    mount.querySelector('.usage-meter__toggle')
  );
}

/**
 * @param {HTMLElement} mount
 */
async function openCard(mount) {
  await vi.waitFor(() => expect(toggleButton(mount)).not.toBeNull());
  /** @type {HTMLButtonElement} */ (toggleButton(mount)).click();
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

    expect(mount.querySelector('.usage-meter__card')).not.toBeNull();
    expect(toggleButton(mount)?.getAttribute('aria-expanded')).toBe('true');
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

    expect(mount.querySelector('.usage-meter__card')).toBeNull();
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

    expect(mount.querySelector('.usage-meter__card')).toBeNull();
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

    expect(mount.querySelector('.usage-meter__card')).not.toBeNull();
    meter.destroy();
  });

  test('prefers the alias as the row label and keeps the email as its title', async () => {
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

    const labels = mount.querySelectorAll('.usage-meter__account-label');
    expect(labels[0].textContent).toBe('work');
    expect(labels[0].getAttribute('title')).toBe('one@example.com');
    expect(labels[1].textContent).toBe('two@example.com');
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

    expect(mount.querySelector('.usage-meter__account-tag')?.textContent).toBe(
      'pro'
    );
    meter.destroy();
  });

  test('replaces the bars with a relogin message on an expired account', async () => {
    const mount = mountMeter();
    stubProviders({
      available: false,
      accounts: [accountRow({ number: 1, status: 'token_expired' })]
    });

    const meter = createUsageMeter(mount);
    await openCard(mount);

    expect(
      mount.querySelector('.usage-meter__account-status')?.textContent?.trim()
    ).toBe('토큰 만료 — cswap 재로그인 필요');
    expect(mount.querySelector('.usage-meter__account-window')).toBeNull();
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
      mount.querySelector('.usage-meter__account-status')?.textContent?.trim()
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
      mount.querySelector('.usage-meter__switch')
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
      mount
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

    expect(mount.querySelector('.usage-meter__note')?.textContent).toBe(
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
   */
  function stubSwitch(switch_payload) {
    const claude_payload = {
      available: false,
      accounts: [accountRow({ number: 1, status: 'token_expired' })]
    };
    const fetchMock = vi.fn((/** @type {string} */ url) => {
      if (url === '/api/claude-account/switch') {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(switch_payload)
        });
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
    return fetchMock;
  }

  test('posts the account number and refetches usage on success', async () => {
    const mount = mountMeter();
    const fetchMock = stubSwitch({ ok: true, switched: true, warnings: [] });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.usage-meter__switch')
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

  test('shows the returned warnings under the switched row', async () => {
    const mount = mountMeter();
    stubSwitch({ ok: true, switched: true, warnings: ['stale keychain'] });

    const meter = createUsageMeter(mount);
    await openCard(mount);
    /** @type {HTMLButtonElement} */ (
      mount.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(
        mount.querySelector('.usage-meter__account-message--warn')
      ).not.toBeNull()
    );

    expect(
      mount
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
      mount.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(
        mount.querySelector('.usage-meter__account-message--error')
      ).not.toBeNull()
    );

    expect(
      mount
        .querySelector('.usage-meter__account-message--error')
        ?.textContent?.trim()
    ).toBe('전환 실패 — not_found');
    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.usage-meter__switch')
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
      mount.querySelector('.usage-meter__switch')
    ).click();
    await vi.waitFor(() =>
      expect(
        mount.querySelector('.usage-meter__account-message--error')
      ).not.toBeNull()
    );

    expect(
      mount
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
        mount.querySelectorAll('.usage-meter__switch')[index]
      );
    }
    switchButton(0).click();
    await vi.waitFor(() => expect(switchButton(0).disabled).toBe(true));
    switchButton(1).click();
    await vi.waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/codex-account/switch',
        expect.objectContaining({ method: 'POST' })
      )
    );

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
      mount.querySelector('.usage-meter__switch')
    ).click();
    await vi.advanceTimersByTimeAsync(1);
    releaseStalePoll(undefined);
    await vi.advanceTimersByTimeAsync(1);

    expect(
      mount.querySelector(
        '.usage-meter__account--active .usage-meter__account-label'
      )?.textContent
    ).toBe('account-3@example.com');
    meter.destroy();
  });
});
