import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLimitPolicySettingsStore } from '../../data/limit-policy-settings-store.js';
import {
  LIMIT_SCOPE_GUIDE,
  createLimitPolicySection
} from './limit-policy-section.js';

const K1 = 'user-1::ws-a';
const K2 = 'user-2::ws-a';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

/**
 * @param {'repo'|'global'} scope
 * @param {Record<string, unknown>} [extra]
 */
function entry(scope, extra = {}) {
  return { scope, mode: 'switch', accounts: [], preempt_pct: null, ...extra };
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
      claude: options.claude ?? entry('repo'),
      codex: options.codex ?? entry('repo')
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

describe('createLimitPolicySection (UI-giog §4.5)', () => {
  test('draws one group per runner, Claude first', async () => {
    const { host } = await mount();

    const groups = Array.from(host.querySelectorAll('[data-limit-global]')).map(
      (node) => node.getAttribute('data-limit-global')
    );

    expect(groups).toEqual(['claude', 'codex']);
  });

  test('orders the rows scope, guidance, mode, allow list, preemptive switch', async () => {
    const { host } = await mount();

    const order = Array.from(
      el(host, '[data-limit-global="claude"]').children
    ).map((node) =>
      node.matches('[data-limit-scope-row]')
        ? 'scope'
        : node.matches('[data-limit-scope-guide]')
          ? 'guide'
          : node.matches('[data-limit-mode-row]')
            ? 'mode'
            : node.matches('[data-limit-accounts]')
              ? 'accounts'
              : node.matches('[data-limit-preempt-row]')
                ? 'preempt'
                : node.className
    );

    expect(order).toEqual([
      'settings-dialog__group-title',
      'scope',
      'guide',
      'mode',
      'accounts',
      'preempt'
    ]);
  });

  test('labels the scope split and the mode row', async () => {
    const { host } = await mount();

    const scope_texts = Array.from(
      host.querySelectorAll(
        '[data-limit-scope-runner="claude"] button[data-limit-scope]'
      )
    ).map((node) => node.textContent?.trim());

    expect(scope_texts).toEqual(['저장소별', '전역']);
    expect(
      el(
        host,
        '[data-limit-mode-row="claude"] .settings-dialog__row-label'
      ).textContent?.trim()
    ).toBe('대응 방식');
  });

  test('shows the scope guidance under the scope row', async () => {
    const { host } = await mount();

    expect(
      el(host, '[data-limit-scope-guide="codex"]').textContent?.trim()
    ).toBe(LIMIT_SCOPE_GUIDE);
  });

  test('dims the three policy rows while the scope is repo but keeps them editable', async () => {
    const { host } = await mount();

    const rows = [
      el(host, '[data-limit-mode-row="claude"]'),
      el(host, '[data-limit-accounts="claude"]'),
      el(host, '[data-limit-preempt-row="claude"]')
    ];

    expect(
      rows.every((row) => row.classList.contains('settings-dialog__row--off'))
    ).toBe(true);
    expect(
      /** @type {HTMLButtonElement} */ (
        el(host, '[data-limit-mode-runner="claude"] [data-limit-mode="wait"]')
      ).disabled
    ).toBe(false);
  });

  test('undims the mode row once the scope is global', async () => {
    const { host } = await mount({ claude: entry('global') });

    expect(
      el(host, '[data-limit-mode-row="claude"]').classList.contains(
        'settings-dialog__row--off'
      )
    ).toBe(false);
  });

  test('sends the scope click as a per-runner patch against the revision', async () => {
    const { host, calls } = await mount();

    el(
      host,
      '[data-limit-scope-runner="codex"] button[data-limit-scope="global"]'
    ).click();
    await settle();

    expect(
      calls.filter(([type]) => type === 'limit-policy-settings-set')
    ).toEqual([
      [
        'limit-policy-settings-set',
        { expected_revision: 5, runners: { codex: { scope: 'global' } } }
      ]
    ]);
  });

  test('sends a mode click through the same channel', async () => {
    const { host, calls } = await mount();

    el(
      host,
      '[data-limit-mode-runner="claude"] button[data-limit-mode="wait"]'
    ).click();
    await settle();

    expect(
      calls.filter(([type]) => type === 'limit-policy-settings-set')
    ).toEqual([
      [
        'limit-policy-settings-set',
        { expected_revision: 5, runners: { claude: { mode: 'wait' } } }
      ]
    ]);
  });

  test('keeps the Codex allow list in its stored order', async () => {
    const { host } = await mount({
      codex: entry('global', { accounts: [K2, K1] })
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
          runners: { claude: entry('global'), codex: entry('repo') }
        }
      })
    });

    el(
      host,
      '[data-limit-scope-runner="claude"] button[data-limit-scope="global"]'
    ).click();
    await settle();

    expect(store.get()?.runners.claude.scope).toBe('global');
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
                runners: { claude: entry('repo'), codex: entry('repo') }
              }
            }
          : { ok: true };
      }
    });

    el(
      host,
      '[data-limit-scope-runner="claude"] button[data-limit-scope="global"]'
    ).click();
    await settle();

    expect(calls.map(([, payload]) => payload.expected_revision)).toEqual([
      5, 9
    ]);
  });
});
