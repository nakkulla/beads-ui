import { afterEach, describe, expect, test, vi } from 'vitest';
import { createLimitPolicySettingsStore } from '../../data/limit-policy-settings-store.js';
import {
  WORKER_LOGIN_NOTE,
  accountTabStatusText,
  createActiveLoginStatus,
  runnerStatusText,
  warnsPinnedEmpty
} from './active-login-status.js';

const UNTIL = new Date(2026, 10, 10, 14, 5).toISOString();

const CLAUDE = {
  accounts: [
    { key: 'a@example.com', email: 'a@example.com', alias: 'main' },
    { key: 'b@example.com', email: 'b@example.com' }
  ],
  active: { key: 'b@example.com', email: 'b@example.com' }
};

const ENTRY = {
  auto_switch: true,
  default_account: 'a@example.com',
  accounts: [],
  preempt_pct: null
};

/**
 * @param {any} departures
 */
function storeWith(departures) {
  const store = createLimitPolicySettingsStore();
  store.set({
    revision: 1,
    runners: { claude: ENTRY, codex: { ...ENTRY, auto_switch: false } },
    departures
  });
  return store;
}

afterEach(() => {
  document.body.innerHTML = '';
});

describe('active-login status wording (UI-32oq §4.4)', () => {
  test('names the active login alone without a departure record', () => {
    const text = runnerStatusText('Claude', CLAUDE, null);

    expect(text).toBe('Claude 활성 로그인 b@example.com');
  });

  test('adds the default and its reset clock while a record stands', () => {
    const record = {
      default_account: 'a@example.com',
      to_account: 'b@example.com',
      until: UNTIL
    };

    const text = runnerStatusText('Claude', CLAUDE, record);

    expect(text).toBe(
      'Claude 활성 로그인 b@example.com · default a@example.com (main) 리셋 14:05 뒤 복귀'
    );
  });

  test('says the usage recovery when the record has no until', () => {
    const record = {
      default_account: 'a@example.com',
      to_account: 'b@example.com',
      until: null
    };

    const text = runnerStatusText('Claude', CLAUDE, record);

    expect(text).toBe(
      'Claude 활성 로그인 b@example.com · default a@example.com (main) 사용량 회복 확인 뒤 복귀'
    );
  });

  test('says the login is unknown when the list cannot be read', () => {
    const text = runnerStatusText('Codex', null, null);

    expect(text).toBe('Codex 활성 로그인 확인 불가');
  });

  test('keeps a default key the list does not hold', () => {
    const record = { default_account: 'gone', to_account: 'b', until: null };

    const text = runnerStatusText('Codex', null, record);

    expect(text).toBe(
      'Codex 활성 로그인 확인 불가 · default gone 사용량 회복 확인 뒤 복귀'
    );
  });

  test('joins both runners on the account tab line', () => {
    const text = accountTabStatusText(
      { claude: CLAUDE, codex: null },
      { claude: null, codex: null }
    );

    expect(text).toBe('활성 로그인: Claude b@example.com · Codex 확인 불가');
  });
});

describe('pinned-empty warning condition (UI-32oq §4.4)', () => {
  test('warns a waiting runner with an empty pin and the auto switch on', () => {
    const warns = warnsPinnedEmpty({
      mode: 'wait',
      pinned: '',
      auto_switch: true
    });

    expect(warns).toBe(true);
  });

  test('stays quiet for a runner that switches accounts', () => {
    const warns = warnsPinnedEmpty({
      mode: 'switch',
      pinned: '',
      auto_switch: true
    });

    expect(warns).toBe(false);
  });

  test('stays quiet once the runner has a pinned account', () => {
    const warns = warnsPinnedEmpty({
      mode: 'wait',
      pinned: 'a@example.com',
      auto_switch: true
    });

    expect(warns).toBe(false);
  });

  test('stays quiet while the auto switch is off', () => {
    const warns = warnsPinnedEmpty({
      mode: 'wait',
      pinned: '',
      auto_switch: false
    });

    expect(warns).toBe(false);
  });
});

describe('active-login status lines on 활성 계정 (UI-32oq §4.4)', () => {
  /**
   * @param {any} store
   * @param {any} [catalog]
   */
  async function mountStatus(store, catalog = { claude: CLAUDE, codex: null }) {
    const host = document.createElement('div');
    document.body.appendChild(host);
    const loadCatalog = vi.fn(async () => catalog);
    const status = createActiveLoginStatus(host, {
      limitPolicySettingsStore: store,
      loadCatalog
    });
    await vi.waitFor(() => expect(loadCatalog).toHaveBeenCalled());
    await Promise.resolve();
    return { host, status, loadCatalog };
  }

  /**
   * @param {HTMLElement} host
   * @param {string} runner
   */
  function lineOf(host, runner) {
    return host
      .querySelector(`[data-active-login-line="${runner}"]`)
      ?.textContent?.trim();
  }

  test('draws one line per runner with the pending return', async () => {
    const store = storeWith({
      claude: {
        default_account: 'a@example.com',
        to_account: 'b@example.com',
        until: UNTIL
      },
      codex: null
    });

    const { host, status } = await mountStatus(store);

    expect(lineOf(host, 'claude')).toBe(
      'Claude 활성 로그인 b@example.com · default a@example.com (main) 리셋 14:05 뒤 복귀'
    );
    expect(lineOf(host, 'codex')).toBe('Codex 활성 로그인 확인 불가');
    status.destroy();
  });

  test('says repos without a pinned account run their Workers on this login', async () => {
    const store = storeWith({ claude: null, codex: null });

    const { host, status } = await mountStatus(store);

    expect(
      host.querySelector('[data-active-login-note]')?.textContent?.trim()
    ).toBe(WORKER_LOGIN_NOTE);
    status.destroy();
  });

  test('reads the account list again when a departure record changes', async () => {
    const store = storeWith({ claude: null, codex: null });
    const { loadCatalog, status } = await mountStatus(store);

    store.set({
      .../** @type {any} */ (store.get()),
      departures: {
        claude: {
          default_account: 'a@example.com',
          to_account: 'b@example.com',
          until: null
        },
        codex: null
      }
    });

    expect(loadCatalog).toHaveBeenCalledTimes(2);
    status.destroy();
  });

  test('keeps the account list when only the settings change', async () => {
    const store = storeWith({ claude: null, codex: null });
    const { loadCatalog, status } = await mountStatus(store);

    store.set({ .../** @type {any} */ (store.get()), revision: 2 });

    expect(loadCatalog).toHaveBeenCalledTimes(1);
    status.destroy();
  });
});
