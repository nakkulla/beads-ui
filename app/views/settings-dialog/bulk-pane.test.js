import { readFileSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createBulkPane } from './bulk-pane.js';

const WS_A = '/tmp/example/repo-a';
const WS_B = '/tmp/example/repo-b';
const WS_C = '/tmp/example/repo-c';

const PRESETS = {
  revision: 9,
  presets: [{ id: 'p1', name: '위임', compatible: true }]
};

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: {
      models: {
        sol: {
          id: 'gpt-5.6-sol',
          efforts: ['medium'],
          orchestration_efforts: ['medium', 'ultra'],
          speed_tiers: ['default', 'fast']
        }
      }
    }
  },
  model_index: { opus: 'claude', sol: 'codex' }
};

const EXECUTION_DEFAULTS = {
  supported: true,
  schema_version: 1,
  session: {
    workflow_mode_default: 'standard',
    review: {
      default: 'codex',
      reviewers: {
        codex: { model: 'gpt-5.6-sol', effort: 'xhigh' },
        fable: { model: 'fable', effort: 'high' }
      }
    },
    plan_review: { standard_recommended: 'codex', fast_track_default: 'fable' },
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'codex',
        model: 'sol',
        model_id: 'gpt-5.6-sol',
        effort: 'auto',
        speed: 'default'
      },
      route_defaults: { quick_fix: { dispatch: 'main' } },
      model_catalog: { codex: { sol: 'gpt-5.6-sol' } },
      effort_by_transport: {}
    }
  },
  orchestration: {
    runtime: 'claude',
    model: 'opus',
    model_id: 'opus',
    effort: null,
    speed: 'default'
  }
};

const CLAUDE_ROWS = {
  accounts: [
    {
      key: 'a@example.com',
      email: 'a@example.com',
      alias: 'team',
      active: true,
      status: 'ok'
    },
    { key: 'b@example.com', email: 'b@example.com', status: 'ok' }
  ]
};

const CODEX_ROWS = {
  accounts: [
    {
      key: 'codex-key',
      email: 'codex@example.com',
      plan: 'pro',
      active: true,
      status: 'ok'
    }
  ]
};

/** A response every op here accepts as a clean success. */
const OK = {
  applied: true,
  conflict: false,
  queue_applied: true,
  state: 'usable',
  values: {},
  warnings: [],
  queue: { revision: 11 }
};

/**
 * A monitor row the bulk plans accept.
 *
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function row(patch = {}) {
  return {
    root_dir: WS_A,
    name: 'repo-a',
    revision: 1,
    auto_advance: true,
    quick_fix_orchestration_model: null,
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    provider_limit_policy: {
      claude: { mode: 'switch', accounts: [], preempt_pct: null },
      codex: { mode: 'switch', accounts: [], preempt_pct: null }
    },
    ...patch
  };
}

/** @type {Array<ReturnType<typeof createBulkPane>>} */
const mounted = [];

/**
 * @param {{ rows?: any[], presets?: any, transport?: (type: string, payload: any) => any, onBulkApplied?: (root_dirs: string[]) => void }} [input]
 */
function setup(input = {}) {
  const host = document.createElement('div');
  document.body.appendChild(host);
  let rows = input.rows || [
    row(),
    row({ root_dir: WS_B, name: 'repo-b', revision: 5 })
  ];
  /** @type {Set<() => void>} */
  const listeners = new Set();
  /** @type {Array<[string, any]>} */
  const calls = [];
  const transport = vi.fn(
    async (/** @type {string} */ type, /** @type {any} */ payload) => {
      calls.push([type, payload]);
      return input.transport ? await input.transport(type, payload) : OK;
    }
  );
  const pane = createBulkPane(host, {
    transport,
    rows: () => rows,
    subscribeRows: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    implPresetStore: { get: () => input.presets || PRESETS },
    onBulkApplied: input.onBulkApplied
  });
  mounted.push(pane);
  return {
    host,
    pane,
    calls,
    /** @param {any[]} next */
    pushRows(next) {
      rows = next;
      for (const fn of listeners) {
        fn();
      }
    }
  };
}

/** Let queued sends, responses and renders settle. */
async function settle() {
  for (let index = 0; index < 12; index += 1) {
    await Promise.resolve();
  }
}

/**
 * @param {HTMLElement} host
 * @param {string} selector
 * @returns {any}
 */
function el(host, selector) {
  return /** @type {any} */ (host.querySelector(selector));
}

/**
 * @param {HTMLElement} host
 * @param {string} selector
 * @param {string} value
 */
function choose(host, selector, value) {
  const select = /** @type {HTMLSelectElement} */ (el(host, selector));
  select.value = value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * @param {HTMLElement} host
 * @param {string} selector
 */
function click(host, selector) {
  el(host, selector).dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

/**
 * @param {HTMLElement} host
 * @param {string} selector
 * @param {boolean} checked
 */
function tick(host, selector, checked) {
  const box = /** @type {HTMLInputElement} */ (el(host, selector));
  box.checked = checked;
  box.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * @param {HTMLElement} host
 * @param {string} runner
 * @param {string} text
 */
function typePct(host, runner, text) {
  const input = /** @type {HTMLInputElement} */ (
    el(host, `[data-bulk-preempt-pct="${runner}"]`)
  );
  input.value = text;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

/**
 * @param {Array<[string, any]>} calls
 * @param {string} type
 * @returns {any[]}
 */
function payloadsOf(calls, type) {
  return calls.filter(([name]) => name === type).map(([, payload]) => payload);
}

/**
 * @param {HTMLElement} host
 * @returns {HTMLButtonElement}
 */
function accountButton(host) {
  return el(host, '[data-bulk-apply="account"]');
}

beforeEach(() => {
  document.body.innerHTML = '';
  vi.stubGlobal(
    'fetch',
    vi.fn(async (/** @type {string} */ url) => ({
      ok: true,
      json: async () => (url.includes('claude') ? CLAUDE_ROWS : CODEX_ROWS)
    }))
  );
});

afterEach(() => {
  for (const pane of mounted.splice(0)) {
    pane.destroy();
  }
  vi.unstubAllGlobals();
});

describe('createBulkPane targets (UI-nu43 §3.2)', () => {
  test('selects the repositories whose automation is on', () => {
    const { host, pane } = setup({
      rows: [
        row(),
        row({ root_dir: WS_B, name: 'repo-b', auto_advance: false })
      ]
    });

    pane.render('worker');

    expect(el(host, `[data-bulk-repo="${WS_A}"]`).checked).toBe(true);
    expect(el(host, `[data-bulk-repo="${WS_B}"]`).checked).toBe(false);
  });

  test('restores the default selection on a fresh mount', () => {
    const first = setup();
    first.pane.render('worker');
    tick(first.host, `[data-bulk-repo="${WS_A}"]`, false);
    first.pane.destroy();

    const second = setup();
    second.pane.render('worker');

    expect(el(second.host, `[data-bulk-repo="${WS_A}"]`).checked).toBe(true);
  });

  test('names the repositories inside a labelled fieldset in row order', () => {
    const { host, pane } = setup();

    pane.render('worker');

    const fieldset = el(host, 'fieldset.settings-dialog__bulk-targets');
    expect(fieldset.querySelector('legend')?.textContent).toBe('적용 대상');
    expect(
      Array.from(fieldset.querySelectorAll('[data-bulk-repo]'), (node) =>
        /** @type {Element} */ (node).getAttribute('data-bulk-repo')
      )
    ).toEqual([WS_A, WS_B]);
  });

  test('keeps the selection across a tab switch', () => {
    const { host, pane } = setup();
    pane.render('worker');
    tick(host, `[data-bulk-repo="${WS_B}"]`, false);

    pane.render('account');
    pane.render('worker');

    expect(el(host, `[data-bulk-repo="${WS_B}"]`).checked).toBe(false);
  });

  test('drops a repository that leaves the rows from the selection', () => {
    const { host, pane, pushRows } = setup();
    pane.render('worker');

    pushRows([row()]);
    pushRows([row(), row({ root_dir: WS_B, name: 'repo-b', revision: 5 })]);

    expect(el(host, `[data-bulk-repo="${WS_B}"]`).checked).toBe(false);
  });

  test('shows the loading copy and a disabled button while no rows exist', () => {
    const { host, pane } = setup({ rows: [] });

    pane.render('account');

    expect(el(host, '[data-bulk-loading]').textContent.trim()).toBe(
      '저장소 목록을 불러오는 중입니다'
    );
    expect(host.querySelector('fieldset')).toBe(null);
    expect(accountButton(host).disabled).toBe(true);
  });

  test('seeds the default selection once the rows arrive', () => {
    const { host, pane, pushRows } = setup({ rows: [] });
    pane.render('worker');

    pushRows([row()]);

    expect(el(host, `[data-bulk-repo="${WS_A}"]`).checked).toBe(true);
  });

  test('warns on both tabs that the visible values are the ones written', () => {
    const { host, pane } = setup();
    pane.render('worker');
    const worker_banner = el(host, '[data-bulk-banner]').textContent.trim();

    pane.render('account');

    expect(worker_banner).toBe(
      '화면에 보이는 값이 그대로 쓰입니다 — 손대지 않은 행도 함께 적용됩니다.'
    );
    expect(el(host, '[data-bulk-banner]').textContent.trim()).toBe(
      worker_banner
    );
  });

  test('disables the apply button once no repository is ticked', () => {
    const { host, pane } = setup({ rows: [row()] });
    pane.render('worker');

    tick(host, `[data-bulk-repo="${WS_A}"]`, false);

    const button = el(host, '[data-bulk-apply="worker"]');
    expect(button.disabled).toBe(true);
    expect(button.title).toBe('적용할 저장소를 고르세요');
  });
});

describe('createBulkPane worker tab (UI-628r §3.2)', () => {
  test('draws the four execution profile groups', () => {
    const { host, pane } = setup();

    pane.render('worker');

    expect(
      Array.from(host.querySelectorAll('[data-bulk-group]'), (node) =>
        node.getAttribute('data-bulk-group')
      )
    ).toEqual(['orchestration', 'impl', 'review', 'quick_fix']);
  });

  test('counts the targets and the editable keys in the footer', () => {
    const { host, pane } = setup();

    pane.render('worker');

    expect(el(host, '[data-bulk-count]').textContent.replace(/\s+/g, ' ')).toBe(
      '저장소 2곳에 24개 항목'
    );
  });

  test('sends one preset request per selected repository in order', async () => {
    const { host, pane, calls } = setup();
    pane.render('worker');

    choose(host, '[data-bulk-preset]', 'p1');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    expect(payloadsOf(calls, 'apply-impl-preset-global')).toEqual([
      {
        preset_id: 'p1',
        expected_revision: 9,
        expected_queue_revision: 1,
        root_dir: WS_A
      },
      {
        preset_id: 'p1',
        expected_revision: 9,
        expected_queue_revision: 5,
        root_dir: WS_B
      }
    ]);
  });

  test('sends the kv write then the queue write once a row is edited', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('worker');

    choose(host, '[data-bulk-key="impl_review_model"]', 'fable');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    expect(calls.map(([type]) => type)).toEqual([
      'set-session-defaults',
      'worker-queue-set-orchestration-defaults'
    ]);
    expect(payloadsOf(calls, 'set-session-defaults')[0].values).toMatchObject({
      impl_review_model: 'fable',
      impl_model: null
    });
  });

  test('fills the form rows from the chosen preset', () => {
    const { host, pane } = setup({
      presets: {
        revision: 9,
        presets: [
          {
            id: 'p1',
            name: '위임',
            compatible: true,
            settings: { impl_runtime: 'codex', impl_model: 'sol' }
          }
        ]
      }
    });
    pane.render('worker');

    choose(host, '[data-bulk-preset]', 'p1');

    expect(el(host, '[data-bulk-key="impl_model"]').value).toBe('sol');
  });

  test('draws one result line per repository', async () => {
    const { host, pane } = setup({
      transport: async (type, payload) =>
        type === 'apply-impl-preset-global' && payload.root_dir === WS_B
          ? { ...OK, queue_applied: false }
          : OK
    });
    pane.render('worker');

    choose(host, '[data-bulk-preset]', 'p1');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    expect(
      Array.from(host.querySelectorAll('[data-bulk-result]'), (node) =>
        node.textContent?.trim()
      )
    ).toEqual([
      '✓ repo-a 적용됨',
      '⚠ repo-b 부분 적용 — 오케스트레이션 값 미적용'
    ]);
  });

  test('narrows the selection to the failed and partial repositories', async () => {
    const { host, pane } = setup({
      transport: async (type, payload) =>
        type === 'apply-impl-preset-global' && payload.root_dir === WS_B
          ? { ...OK, applied: false, queue_applied: false }
          : OK
    });
    pane.render('worker');
    choose(host, '[data-bulk-preset]', 'p1');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    click(host, '[data-bulk-retry="worker"]');

    expect(el(host, `[data-bulk-repo="${WS_A}"]`).checked).toBe(false);
    expect(el(host, `[data-bulk-repo="${WS_B}"]`).checked).toBe(true);
  });

  test('counts the progress on the button and disables inputs while running', async () => {
    /** @type {Array<() => void>} */
    const gates = [];
    const { host, pane } = setup({
      transport: async () => {
        await new Promise((resolve) => gates.push(() => resolve(undefined)));
        return OK;
      }
    });
    pane.render('worker');
    choose(host, '[data-bulk-preset]', 'p1');

    click(host, '[data-bulk-apply="worker"]');
    await settle();

    const button = el(host, '[data-bulk-apply="worker"]');
    expect(button.textContent.trim()).toBe('적용 중 0/2');
    expect(button.disabled).toBe(true);
    expect(el(host, '[data-bulk-preset]').disabled).toBe(true);
    expect(el(host, `[data-bulk-repo="${WS_A}"]`).disabled).toBe(true);
    expect(el(host, '[data-bulk-key="impl_model"]').disabled).toBe(true);
    for (const open of gates.splice(0)) {
      open();
    }
    await settle();
  });

  test('stops the remaining requests when the tab switches', async () => {
    /** @type {Array<() => void>} */
    const gates = [];
    const { host, pane, calls } = setup({
      transport: async () => {
        await new Promise((resolve) => gates.push(() => resolve(undefined)));
        return OK;
      }
    });
    pane.render('worker');
    choose(host, '[data-bulk-preset]', 'p1');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    pane.render('account');
    gates.shift()?.();
    await settle();

    expect(payloadsOf(calls, 'apply-impl-preset-global')).toHaveLength(1);
  });

  test('stops the remaining requests when the pane is destroyed', async () => {
    /** @type {Array<() => void>} */
    const gates = [];
    const { host, pane, calls } = setup({
      transport: async () => {
        await new Promise((resolve) => gates.push(() => resolve(undefined)));
        return OK;
      }
    });
    pane.render('worker');
    choose(host, '[data-bulk-preset]', 'p1');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    pane.destroy();
    gates.shift()?.();
    await settle();

    expect(payloadsOf(calls, 'apply-impl-preset-global')).toHaveLength(1);
  });

  test('keeps each tab result separately', async () => {
    const { host, pane } = setup();
    pane.render('worker');
    choose(host, '[data-bulk-preset]', 'p1');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    pane.render('account');
    const account_results = host.querySelectorAll('[data-bulk-result]').length;
    pane.render('worker');

    expect(account_results).toBe(0);
    expect(host.querySelectorAll('[data-bulk-result]')).toHaveLength(2);
  });

  test('keeps the form values across a tab switch', async () => {
    const { host, pane } = setup();
    pane.render('worker');
    choose(host, '[data-bulk-key="impl_review_model"]', 'fable');

    pane.render('account');
    pane.render('worker');

    expect(el(host, '[data-bulk-key="impl_review_model"]').value).toBe('fable');
  });

  test('reports only the applied and partial repositories once a run ends', async () => {
    const onBulkApplied = vi.fn();
    const { host, pane } = setup({
      rows: [
        row(),
        row({ root_dir: WS_B, name: 'repo-b' }),
        row({ root_dir: WS_C, name: 'repo-c' })
      ],
      onBulkApplied,
      transport: async (type, payload) => {
        if (payload.root_dir === WS_B) {
          return { ...OK, queue_applied: false };
        }
        if (payload.root_dir === WS_C) {
          return { error: 'bad' };
        }
        return OK;
      }
    });
    pane.render('worker');

    choose(host, '[data-bulk-preset]', 'p1');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    expect(onBulkApplied).toHaveBeenCalledTimes(1);
    expect(onBulkApplied).toHaveBeenCalledWith([WS_A, WS_B]);
  });

  test('reports a repository written right before the pane is destroyed', async () => {
    const onBulkApplied = vi.fn();
    /** @type {(value: any) => void} */
    let resolve_first = () => {};
    const { host, pane } = setup({
      onBulkApplied,
      transport: (type, payload) =>
        payload.root_dir === WS_A
          ? new Promise((resolve) => {
              resolve_first = resolve;
            })
          : OK
    });
    pane.render('worker');
    choose(host, '[data-bulk-preset]', 'p1');
    click(host, '[data-bulk-apply="worker"]');
    await settle();

    pane.destroy();
    resolve_first(OK);
    await settle();

    expect(onBulkApplied).toHaveBeenCalledWith([WS_A]);
  });
});

describe('createBulkPane account tab (UI-628r §3.3)', () => {
  test('offers no 변경 안 함 anywhere on the tab', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(host.textContent).not.toContain('변경 안 함');
    expect(host.textContent).not.toContain('바꾸기');
  });

  test('starts the account selects on the default option', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(el(host, '[data-bulk-account="claude_account"]').value).toBe(
      '__bulk_use_default__'
    );
  });

  test('enables the apply button on an untouched form', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(accountButton(host).disabled).toBe(false);
  });

  test('sizes the footer by the target count rather than the edits', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(el(host, '[data-bulk-count]').textContent.replace(/\s+/g, ' ')).toBe(
      '저장소 2곳에 계정 2개 · 한도 정책 2벌'
    );
  });

  test('names catalog accounts with the pane labels', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(
      Array.from(
        el(host, '[data-bulk-account="claude_account"]').options,
        (/** @type {HTMLOptionElement} */ option) => option.textContent?.trim()
      )
    ).toEqual([
      '기본값 사용 — 현재 로그인(a@example.com)',
      'a@example.com (team)',
      'b@example.com'
    ]);
  });

  test('blocks the apply with a reason line when the catalog is unreadable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, json: async () => ({}) }))
    );
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(accountButton(host).disabled).toBe(true);
    expect(accountButton(host).title).toBe(
      '계정 목록을 읽지 못해 적용할 수 없습니다'
    );
    expect(el(host, '[data-bulk-reason]').textContent.trim()).toBe(
      '계정 목록을 읽지 못해 적용할 수 없습니다'
    );
  });

  test('sends nothing while the catalog is unreadable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, json: async () => ({}) }))
    );
    const { host, pane, calls } = setup();
    pane.render('account');
    await settle();

    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(calls).toEqual([]);
  });

  test('writes the account and both limit policies for each repository', async () => {
    const { host, pane, calls } = setup();
    pane.render('account');
    await settle();

    choose(host, '[data-bulk-account="claude_account"]', 'b@example.com');
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(calls.map(([type]) => type)).toEqual([
      'set-workspace-accounts',
      'worker-provider-limit-policy-set',
      'worker-provider-limit-policy-set',
      'set-workspace-accounts',
      'worker-provider-limit-policy-set',
      'worker-provider-limit-policy-set'
    ]);
  });

  test('sends the default option as null for both runners', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(payloadsOf(calls, 'set-workspace-accounts')).toEqual([
      {
        root_dir: WS_A,
        values: { claude_account: null, codex_account: null }
      }
    ]);
  });

  test('sends the empty allow list the boxes show', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')[1]).toEqual({
      root_dir: WS_A,
      runner: 'codex',
      patch: { mode: 'switch', accounts: [], preempt_pct: null },
      expected_revision: 11
    });
  });

  test('sends the mode the segment shows', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    click(
      host,
      '[data-bulk-limit-mode-runner="claude"] [data-bulk-limit-mode="wait"]'
    );
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(
      payloadsOf(calls, 'worker-provider-limit-policy-set')[0].patch
    ).toEqual({ mode: 'wait', accounts: [], preempt_pct: null });
  });

  test('sends the ticked allow accounts', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    tick(
      host,
      '[data-runner="claude"][data-bulk-limit-account="b@example.com"]',
      true
    );
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(
      payloadsOf(calls, 'worker-provider-limit-policy-set')[0].patch.accounts
    ).toEqual(['b@example.com']);
  });

  test('keeps the allow account boxes editable', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(
      el(
        host,
        '[data-runner="claude"][data-bulk-limit-account="a@example.com"]'
      ).disabled
    ).toBe(false);
  });

  test('disables the button for a threshold of 0, 100 or a fraction', async () => {
    const { host, pane } = setup();
    pane.render('account');
    await settle();
    choose(host, '[data-bulk-preempt="claude"]', 'pct');

    /** @type {Array<{ disabled: boolean, title: string }>} */
    const seen = [];
    for (const text of ['0', '100', '50.5']) {
      typePct(host, 'claude', text);
      seen.push({
        disabled: accountButton(host).disabled,
        title: accountButton(host).title
      });
    }

    const invalid = {
      disabled: true,
      title: '선제 전환 기준은 1–99 정수입니다'
    };
    expect(seen).toEqual([invalid, invalid, invalid]);
  });

  test('sends the typed threshold when it is a 1-99 integer', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    choose(host, '[data-bulk-preempt="codex"]', 'pct');
    typePct(host, 'codex', '65');
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(
      payloadsOf(calls, 'worker-provider-limit-policy-set')[1].patch.preempt_pct
    ).toBe(65);
  });

  test('keeps a typed threshold across a row subscription redraw', async () => {
    const { host, pane, pushRows } = setup();
    pane.render('account');
    await settle();
    choose(host, '[data-bulk-preempt="claude"]', 'pct');

    typePct(host, 'claude', '4');
    pushRows([row({ revision: 2 }), row({ root_dir: WS_B, name: 'repo-b' })]);

    expect(el(host, '[data-bulk-preempt-pct="claude"]').value).toBe('4');
  });

  test('keeps the form values after a run', async () => {
    const { host, pane } = setup();
    pane.render('account');
    await settle();

    choose(host, '[data-bulk-account="claude_account"]', 'b@example.com');
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(el(host, '[data-bulk-account="claude_account"]').value).toBe(
      'b@example.com'
    );
  });
});

describe('bulk pane narrow width (UI-nu43 §3.2)', () => {
  test('stacks the head and wraps the checkboxes at 640px or below', () => {
    const css = readFileSync(
      path.resolve(process.cwd(), 'app/styles.css'),
      'utf8'
    );
    const targets_rule = css.slice(
      css.indexOf('.settings-dialog__bulk-targets {')
    );
    const narrow_head = css.slice(
      css.lastIndexOf('.settings-dialog__bulk-hd {'),
      css.lastIndexOf('.settings-dialog__bulk-field {')
    );

    expect(targets_rule.slice(0, targets_rule.indexOf('}'))).toContain(
      'flex-wrap: wrap'
    );
    expect(narrow_head).toContain('flex-direction: column');
    expect(narrow_head).toContain('width: 100%');
    expect(css).not.toContain('.mon2-deck__bulk');
  });
});
