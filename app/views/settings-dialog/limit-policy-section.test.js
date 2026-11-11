import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLimitPolicySettingsStore } from '../../data/limit-policy-settings-store.js';
import {
  ACTIVE_SWITCH_GUIDE,
  createLimitPolicySection
} from './limit-policy-section.js';

const K1 = 'user-1::ws-a';
const K2 = 'user-2::ws-a';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

/**
 * @param {boolean} auto_switch
 * @param {Record<string, unknown>} [extra]
 */
function entry(auto_switch, extra = {}) {
  return {
    auto_switch,
    default_account: null,
    accounts: [],
    preempt_pct: null,
    ...extra
  };
}

/**
 * @param {{ claude?: any, codex?: any, transport?: (type: string, payload: any) => Promise<any> }} [options]
 */
async function mount(options = {}) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  const store = createLimitPolicySettingsStore();
  store.set({
    revision: 5,
    runners: {
      claude: options.claude ?? entry(false),
      codex: options.codex ?? entry(false)
    }
  });
  /** @type {Array<[string, any]>} */
  const calls = [];
  const transport = vi.fn(async (/** @type {string} */ type, payload) => {
    calls.push([type, payload]);
    return options.transport ? await options.transport(type, payload) : {};
  });
  const toast = vi.fn();
  const section = createLimitPolicySection(host, {
    transport,
    limitPolicySettingsStore: store,
    loadCatalog: async () => ({
      claude: { accounts: [] },
      codex: {
        accounts: [
          { key: K1, number: 1, email: 'one@example.test' },
          { key: K2, number: 2, email: 'two@example.test' }
        ]
      }
    }),
    toast
  });
  mounted.push(section);
  section.render();
  await settle();
  return { host, store, calls, toast };
}

async function settle() {
  for (let i = 0; i < 6; i += 1) {
    await Promise.resolve();
  }
}

/**
 * @param {HTMLElement} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(root, selector) {
  return /** @type {HTMLElement} */ (root.querySelector(selector));
}

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  for (const section of mounted.splice(0)) {
    section.destroy();
  }
});

describe('createLimitPolicySection (UI-giog §4.5, UI-32oq §4.1)', () => {
  test.each(['claude', 'codex'])(
    'orders the four %s active login rows like the Worker account tab',
    async (runner) => {
      const { host } = await mount();

      const group = el(host, `[data-limit-global="${runner}"]`);

      expect(
        Array.from(
          group.querySelectorAll('.settings-dialog__row-label'),
          (node) => node.textContent.trim()
        )
      ).toEqual(['자동 전환', 'default 계정', '전환 허용 계정', '옮기는 시점']);
    }
  );

  test('draws one group per runner, Claude first', async () => {
    const { host } = await mount();

    const groups = Array.from(host.querySelectorAll('[data-limit-global]')).map(
      (node) => node.getAttribute('data-limit-global')
    );

    expect(groups).toEqual(['claude', 'codex']);
  });

  test('orders the rows auto switch, guidance, default, targets, trigger', async () => {
    const { host } = await mount();

    const order = Array.from(
      el(host, '[data-limit-global="claude"]').children
    ).map((node) =>
      node.matches('[data-limit-auto-row]')
        ? 'auto'
        : node.matches('[data-limit-auto-guide]')
          ? 'guide'
          : node.matches('[data-limit-default-row]')
            ? 'default'
            : node.matches('[data-limit-accounts]')
              ? 'accounts'
              : node.matches('[data-limit-preempt-row]')
                ? 'preempt'
                : node.className
    );

    expect(order).toEqual([
      'settings-dialog__group-title',
      'auto',
      'guide',
      'default',
      'accounts',
      'preempt'
    ]);
  });

  test('draws no wait/switch mode row', async () => {
    const { host } = await mount();

    expect(host.querySelector('[data-limit-mode-row]')).toBeNull();
  });

  test('labels the auto switch split', async () => {
    const { host } = await mount();

    const texts = Array.from(
      host.querySelectorAll(
        '[data-limit-auto-runner="claude"] button[data-limit-auto]'
      )
    ).map((node) => node.textContent?.trim());

    expect(texts).toEqual(['켬', '끔']);
  });

  test('shows the guidance under the auto switch row', async () => {
    const { host } = await mount();

    expect(
      el(host, '[data-limit-auto-guide="codex"]').textContent?.trim()
    ).toBe(ACTIVE_SWITCH_GUIDE);
  });

  test('dims the target and trigger rows while the auto switch is off but keeps them editable', async () => {
    const { host } = await mount();

    const rows = [
      el(host, '[data-limit-accounts="claude"]'),
      el(host, '[data-limit-preempt-row="claude"]')
    ];

    expect(
      rows.every((row) => row.classList.contains('settings-dialog__row--off'))
    ).toBe(true);
    expect(
      /** @type {HTMLInputElement} */ (
        el(host, '[data-limit-preempt="claude"]')
      ).disabled
    ).toBe(false);
  });

  test('undims the target rows once the auto switch is on', async () => {
    const { host } = await mount({ claude: entry(true) });

    expect(
      el(host, '[data-limit-accounts="claude"]').classList.contains(
        'settings-dialog__row--off'
      )
    ).toBe(false);
  });

  test('sends the auto switch click as a per-runner patch against the revision', async () => {
    const { host, calls } = await mount();

    el(
      host,
      '[data-limit-auto-runner="codex"] button[data-limit-auto="on"]'
    ).click();
    await settle();

    expect(
      calls.filter(([type]) => type === 'limit-policy-settings-set')
    ).toEqual([
      [
        'limit-policy-settings-set',
        { expected_revision: 5, runners: { codex: { auto_switch: true } } }
      ]
    ]);
  });

  test('offers an unset default and every catalog account', async () => {
    const { host } = await mount();

    const values = Array.from(
      host.querySelectorAll('[data-limit-default="codex"] option')
    ).map((node) => /** @type {HTMLOptionElement} */ (node).value);

    expect(values).toEqual(['', K1, K2]);
  });

  test('sends a picked default through the same channel', async () => {
    const { host, calls } = await mount();
    const select = /** @type {HTMLSelectElement} */ (
      el(host, '[data-limit-default="codex"]')
    );

    select.value = K2;
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(
      calls.filter(([type]) => type === 'limit-policy-settings-set')
    ).toEqual([
      [
        'limit-policy-settings-set',
        { expected_revision: 5, runners: { codex: { default_account: K2 } } }
      ]
    ]);
  });

  test('sends an unset default as null', async () => {
    const { host, calls } = await mount({
      codex: entry(true, { default_account: K1 })
    });
    const select = /** @type {HTMLSelectElement} */ (
      el(host, '[data-limit-default="codex"]')
    );

    select.value = '';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(
      calls.filter(([type]) => type === 'limit-policy-settings-set')
    ).toEqual([
      [
        'limit-policy-settings-set',
        { expected_revision: 5, runners: { codex: { default_account: null } } }
      ]
    ]);
  });

  test('keeps the Codex target list in its stored order', async () => {
    const { host } = await mount({
      codex: entry(true, { accounts: [K2, K1] })
    });

    const order = Array.from(
      host.querySelectorAll(
        '[data-limit-global="codex"] [data-limit-order-item]'
      )
    ).map((node) => node.getAttribute('data-limit-order-item'));

    expect(order).toEqual([K2, K1]);
  });

  test('adopts the snapshot a write answers with', async () => {
    const { host, store } = await mount({
      transport: async () => ({
        ok: true,
        snapshot: {
          revision: 6,
          runners: { claude: entry(true), codex: entry(false) }
        }
      })
    });

    el(
      host,
      '[data-limit-auto-runner="claude"] button[data-limit-auto="on"]'
    ).click();
    await settle();

    expect(store.get()?.runners.claude.auto_switch).toBe(true);
  });

  test('re-sends a conflicted patch once against the adopted revision', async () => {
    let answered = 0;
    const { host, calls } = await mount({
      transport: async () => {
        answered += 1;
        return answered === 1
          ? {
              ok: false,
              code: 'conflict',
              snapshot: {
                revision: 9,
                runners: { claude: entry(false), codex: entry(false) }
              }
            }
          : { ok: true };
      }
    });

    el(
      host,
      '[data-limit-auto-runner="claude"] button[data-limit-auto="on"]'
    ).click();
    await settle();

    expect(calls.map(([, payload]) => payload.expected_revision)).toEqual([
      5, 9
    ]);
  });
});
