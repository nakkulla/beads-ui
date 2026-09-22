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
    session_defaults: {},
    session_defaults_state: 'ready',
    workspace_accounts: { state: 'absent', values: {}, warnings: [] },
    applied_exec_preset: null,
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
      '화면에 값이 선 행은 손대지 않아도 그대로 쓰입니다 — 갈림·미확인으로 남은 행만 저장소별 현재 값을 유지합니다.'
    );
    expect(el(host, '[data-bulk-banner]').textContent.trim()).toBe(
      worker_banner
    );
  });

  test('takes every visible repository from the 전체 box', () => {
    const { host, pane } = setup({
      rows: [
        row(),
        row({ root_dir: WS_B, name: 'repo-b', auto_advance: false })
      ]
    });
    pane.render('worker');

    tick(host, '[data-bulk-all]', true);

    expect(el(host, `[data-bulk-repo="${WS_A}"]`).checked).toBe(true);
    expect(el(host, `[data-bulk-repo="${WS_B}"]`).checked).toBe(true);
  });

  test('drops every repository when 전체 is unticked', () => {
    const { host, pane } = setup();
    pane.render('worker');

    tick(host, '[data-bulk-all]', false);

    expect(el(host, `[data-bulk-repo="${WS_A}"]`).checked).toBe(false);
    expect(el(host, `[data-bulk-repo="${WS_B}"]`).checked).toBe(false);
  });

  test('checks 전체 while every repository stands selected', () => {
    const { host, pane } = setup();

    pane.render('worker');

    expect(el(host, '[data-bulk-all]').checked).toBe(true);
    expect(el(host, '[data-bulk-all]').indeterminate).toBe(false);
  });

  test('marks 전체 indeterminate while only some repositories are selected', () => {
    const { host, pane } = setup();
    pane.render('worker');

    tick(host, `[data-bulk-repo="${WS_B}"]`, false);

    expect(el(host, '[data-bulk-all]').checked).toBe(false);
    expect(el(host, '[data-bulk-all]').indeterminate).toBe(true);
  });

  test('leaves 전체 unchecked while no repository is selected', () => {
    const { host, pane } = setup({
      rows: [row({ auto_advance: false })]
    });

    pane.render('worker');

    expect(el(host, '[data-bulk-all]').checked).toBe(false);
    expect(el(host, '[data-bulk-all]').indeterminate).toBe(false);
  });

  test('draws 전체 ahead of the repositories inside the fieldset', () => {
    const { host, pane } = setup();

    pane.render('worker');

    const boxes = el(
      host,
      'fieldset.settings-dialog__bulk-targets'
    ).querySelectorAll('input[type="checkbox"]');
    expect(boxes[0].hasAttribute('data-bulk-all')).toBe(true);
    expect(boxes.length).toBe(3);
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
  test('draws the three general execution profile groups', () => {
    const { host, pane } = setup();

    pane.render('worker');

    expect(
      Array.from(host.querySelectorAll('[data-bulk-group]'), (node) =>
        node.getAttribute('data-bulk-group')
      )
    ).toEqual(['orchestration', 'impl', 'review']);
  });

  test('counts the rows this round writes in the footer', () => {
    const { host, pane } = setup();

    pane.render('worker');

    expect(el(host, '[data-bulk-count]').textContent.replace(/\s+/g, ' ')).toBe(
      '16행을 저장소 2곳에 씁니다'
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
    expect(el(host, '[data-bulk-all]').disabled).toBe(true);
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

  test('counts the account rows this round writes in the footer', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(el(host, '[data-bulk-count]').textContent.replace(/\s+/g, ' ')).toBe(
      '8행을 저장소 2곳에 씁니다'
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

describe('createBulkPane 관측 (UI-e1ta §3)', () => {
  test('stands each row on the value the ticked repositories hold', () => {
    const { host, pane } = setup({
      rows: [
        row({ session_defaults: { impl_effort: 'high' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          session_defaults: { impl_effort: 'high' }
        })
      ]
    });

    pane.render('worker');

    expect(el(host, '[data-bulk-key="impl_effort"]').value).toBe('high');
    expect(
      el(host, '[data-bulk-badge="impl_effort"]').getAttribute(
        'data-bulk-observation'
      )
    ).toBe('same');
  });

  test('keeps a split row out of the apply payload', async () => {
    const { host, pane, calls } = setup({
      rows: [
        row({ session_defaults: { impl_effort: 'high' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          session_defaults: { impl_effort: 'low' }
        })
      ]
    });
    pane.render('worker');

    click(host, '[data-bulk-apply="worker"]');
    await settle();

    const kv = payloadsOf(calls, 'set-session-defaults')[0].values;
    expect(Object.hasOwn(kv, 'impl_effort')).toBe(false);
    expect(Object.hasOwn(kv, 'impl_model')).toBe(true);
  });

  test('keeps an unread layer out of the apply payload', async () => {
    const { host, pane, calls } = setup({
      rows: [
        row({ session_defaults: { impl_effort: 'high' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          session_defaults: {},
          session_defaults_state: 'pending'
        })
      ]
    });
    pane.render('worker');

    click(host, '[data-bulk-apply="worker"]');
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')[0].values).toEqual({});
  });

  test('keeps an edited row while recomputing the untouched ones', () => {
    const { host, pane } = setup({
      rows: [
        row({ session_defaults: { impl_effort: 'high' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          session_defaults: { impl_effort: 'high', impl_review_model: 'fable' }
        })
      ]
    });
    pane.render('worker');
    choose(host, '[data-bulk-key="impl_effort"]', 'low');

    tick(host, `[data-bulk-repo="${WS_B}"]`, false);

    expect(el(host, '[data-bulk-key="impl_effort"]').value).toBe('low');
    expect(el(host, '[data-bulk-key="impl_review_model"]').value).toBe('');
  });

  test('puts a row back on its observation when the hold option is rechosen', () => {
    const { host, pane } = setup({
      rows: [
        row({ session_defaults: { impl_effort: 'high' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          session_defaults: { impl_effort: 'low' }
        })
      ]
    });
    pane.render('worker');
    choose(host, '[data-bulk-key="impl_effort"]', 'low');

    choose(host, '[data-bulk-key="impl_effort"]', '__bulk_hold__');

    expect(
      el(host, '[data-bulk-badge="impl_effort"]').getAttribute(
        'data-bulk-observation'
      )
    ).toBe('mixed');
  });

  test('locks only the preset save while a row stands on nothing', () => {
    const { host, pane } = setup({
      rows: [
        row({ session_defaults: { impl_effort: 'high' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          session_defaults: { impl_effort: 'low' }
        })
      ]
    });

    pane.render('worker');

    expect(el(host, '[data-bulk-preset-save]').disabled).toBe(true);
    expect(el(host, '[data-bulk-preset-save]').title).toBe(
      '값이 서지 않은 1행을 먼저 정하세요'
    );
    expect(el(host, '[data-bulk-apply="worker"]').disabled).toBe(false);
  });
});

describe('createBulkPane 세션 탭 (UI-e1ta §5)', () => {
  test('stands the three rows on what the repositories hold', () => {
    const { host, pane } = setup({
      rows: [
        row({ session_defaults: { workflow_mode: 'fast_track' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          session_defaults: { workflow_mode: 'fast_track' }
        })
      ]
    });

    pane.render('session');

    expect(el(host, '[data-bulk-session="workflow_mode"]').value).toBe(
      'fast_track'
    );
    expect(el(host, '[data-bulk-session="bdui_url"]')).not.toBe(null);
    expect(
      el(host, '[data-bulk-session="base_sync_accept_local_commits"]')
    ).not.toBe(null);
  });

  test('writes the session rows once per repository', async () => {
    const { host, pane, calls } = setup();
    pane.render('session');

    choose(host, '[data-bulk-session="workflow_mode"]', 'standard');
    click(host, '[data-bulk-apply="session"]');
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      {
        root_dir: WS_A,
        values: {
          workflow_mode: 'standard',
          bdui_url: null,
          base_sync_accept_local_commits: null
        }
      },
      {
        root_dir: WS_B,
        values: {
          workflow_mode: 'standard',
          bdui_url: null,
          base_sync_accept_local_commits: null
        }
      }
    ]);
  });
});

describe('createBulkPane 계정 탭 관측 (UI-e1ta §6)', () => {
  /** @returns {any[]} */
  function splitAllowRows() {
    return [
      row({
        provider_limit_policy: {
          claude: {
            mode: 'switch',
            accounts: ['a@example.com'],
            preempt_pct: null
          },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      }),
      row({
        root_dir: WS_B,
        name: 'repo-b',
        provider_limit_policy: {
          claude: { mode: 'switch', accounts: [], preempt_pct: null },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    ];
  }

  test('empties a split allow list and badges it', async () => {
    const { host, pane } = setup({ rows: splitAllowRows() });

    pane.render('account');
    await settle();

    expect(
      el(
        host,
        '[data-bulk-limit-account="a@example.com"][data-runner="claude"]'
      ).checked
    ).toBe(false);
    expect(
      el(host, '[data-bulk-badge="claude.accounts"]').getAttribute(
        'data-bulk-observation'
      )
    ).toBe('mixed');
  });

  test('returns a touched allow list to its observation', async () => {
    const { host, pane } = setup({ rows: splitAllowRows() });
    pane.render('account');
    await settle();
    tick(
      host,
      '[data-bulk-limit-account="b@example.com"][data-runner="claude"]',
      true
    );

    click(host, '[data-bulk-limit-accounts-release="claude"]');

    expect(
      el(host, '[data-bulk-badge="claude.accounts"]').getAttribute(
        'data-bulk-observation'
      )
    ).toBe('mixed');
  });
});

describe('createBulkPane 적용된 프리셋 (UI-e1ta §4.1)', () => {
  test('names the record by its id from the current preset list', () => {
    const applied = { id: 'p1', name: '옛 이름', revision: 1, applied_at: 9 };
    const { host, pane } = setup({
      rows: [
        row({ applied_exec_preset: applied }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          applied_exec_preset: { ...applied, applied_at: 11 }
        })
      ]
    });

    pane.render('worker');

    expect(
      el(host, '[data-bulk-applied-preset-value]').textContent.trim()
    ).toBe('위임');
  });

  test('says 삭제된 프리셋 for an id the list no longer names', () => {
    const { host, pane } = setup({
      rows: [
        row({ applied_exec_preset: { id: 'gone' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          applied_exec_preset: { id: 'gone' }
        })
      ]
    });

    pane.render('worker');

    expect(
      el(host, '[data-bulk-applied-preset-value]').textContent.trim()
    ).toBe('삭제된 프리셋');
  });

  test('draws no line at all when the projection omits the record', () => {
    const plain = row();
    delete plain.applied_exec_preset;
    const { host, pane } = setup({ rows: [plain] });

    pane.render('worker');

    expect(el(host, '[data-bulk-applied-preset]')).toBe(null);
  });
});

describe('createBulkPane quick fix tab (UI-uohc §6.2)', () => {
  /** One preset per profile, so each bar has exactly one entry to offer. */
  const BOTH_PRESETS = {
    revision: 9,
    presets: [
      {
        id: 'p1',
        name: '위임',
        compatible: true,
        applies_to: 'general',
        settings: { impl_model: 'sol' }
      },
      {
        id: 'q1',
        name: 'quick fix 기본',
        compatible: true,
        applies_to: 'quick_fix',
        settings: { orchestration_model: 'opus', impl_model: 'sol' }
      }
    ]
  };

  test('draws its own two groups and none of the worker tab rows', () => {
    const { host, pane } = setup();

    pane.render('quick_fix');

    expect(
      Array.from(host.querySelectorAll('[data-bulk-group]'), (node) =>
        node.getAttribute('data-bulk-group')
      )
    ).toEqual(['quick_fix_orchestration', 'quick_fix_impl']);
    expect(el(host, '[data-bulk-key="impl_review_model"]')).toBe(null);
  });

  test('counts its eight rows in the footer', () => {
    const { host, pane } = setup();

    pane.render('quick_fix');

    expect(el(host, '[data-bulk-count]').textContent.replace(/\s+/g, ' ')).toBe(
      '8행을 저장소 2곳에 씁니다'
    );
  });

  test('offers only the quick_fix presets in its bar', () => {
    const { host, pane } = setup({ presets: BOTH_PRESETS });

    pane.render('quick_fix');

    expect(
      Array.from(host.querySelectorAll('[data-bulk-preset] option'), (node) =>
        node.textContent?.trim()
      )
    ).toEqual(['실행 프리셋…', 'quick fix 기본']);
  });

  test('offers only the general presets in the worker bar', () => {
    const { host, pane } = setup({ presets: BOTH_PRESETS });

    pane.render('worker');

    expect(
      Array.from(host.querySelectorAll('[data-bulk-preset] option'), (node) =>
        node.textContent?.trim()
      )
    ).toEqual(['실행 프리셋…', '위임']);
  });

  test('marks only its own rows 편집됨 when a preset is chosen', () => {
    const { host, pane } = setup({ presets: BOTH_PRESETS });
    pane.render('quick_fix');

    choose(host, '[data-bulk-preset]', 'q1');

    expect(
      el(host, '[data-bulk-badge="quick_fix_impl_model"]').textContent.trim()
    ).toBe('편집됨');
    pane.render('worker');
    expect(
      el(host, '[data-bulk-badge="impl_model"]')?.textContent.trim()
    ).not.toBe('편집됨');
  });

  test('sends one preset request per repository from its own bar', async () => {
    const { host, pane, calls } = setup({ presets: BOTH_PRESETS });
    pane.render('quick_fix');

    choose(host, '[data-bulk-preset]', 'q1');
    click(host, '[data-bulk-apply="quick_fix"]');
    await settle();

    expect(payloadsOf(calls, 'apply-impl-preset-global')).toEqual([
      {
        preset_id: 'q1',
        expected_revision: 9,
        expected_queue_revision: 1,
        root_dir: WS_A
      },
      {
        preset_id: 'q1',
        expected_revision: 9,
        expected_queue_revision: 5,
        root_dir: WS_B
      }
    ]);
  });

  test('writes only the quick_fix kv keys once a row is edited', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('quick_fix');

    choose(host, '[data-bulk-key="quick_fix_impl_dispatch"]', 'delegated');
    click(host, '[data-bulk-apply="quick_fix"]');
    await settle();

    const values = payloadsOf(calls, 'set-session-defaults')[0].values;
    expect(values.quick_fix_impl_dispatch).toBe('delegated');
    expect(
      Object.keys(values).every((key) => key.startsWith('quick_fix_impl_'))
    ).toBe(true);
  });

  test('leaves a 갈림 row out of its kv payload', async () => {
    const { host, pane, calls } = setup({
      rows: [
        row({ session_defaults: { quick_fix_impl_model: 'sol' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          revision: 5,
          session_defaults: { quick_fix_impl_model: 'opus' }
        })
      ]
    });
    pane.render('quick_fix');

    choose(host, '[data-bulk-key="quick_fix_impl_dispatch"]', 'delegated');
    click(host, '[data-bulk-apply="quick_fix"]');
    await settle();

    const values = payloadsOf(calls, 'set-session-defaults')[0].values;
    expect(Object.hasOwn(values, 'quick_fix_impl_model')).toBe(false);
  });

  test('narrows the selection to its failed repositories on retry', async () => {
    const { host, pane } = setup({
      presets: BOTH_PRESETS,
      transport: async (type, payload) =>
        type === 'apply-impl-preset-global' && payload.root_dir === WS_B
          ? { ...OK, applied: false, queue_applied: false }
          : OK
    });
    pane.render('quick_fix');
    choose(host, '[data-bulk-preset]', 'q1');
    click(host, '[data-bulk-apply="quick_fix"]');
    await settle();

    click(host, '[data-bulk-retry="quick_fix"]');

    expect(el(host, `[data-bulk-repo="${WS_A}"]`).checked).toBe(false);
    expect(el(host, `[data-bulk-repo="${WS_B}"]`).checked).toBe(true);
  });

  test('names its own apply record rather than the general one', () => {
    const rows = [
      row({
        applied_exec_preset: { id: 'p1' },
        applied_quick_fix_preset: { id: 'q1' }
      }),
      row({
        root_dir: WS_B,
        name: 'repo-b',
        applied_exec_preset: { id: 'p1' },
        applied_quick_fix_preset: { id: 'q1' }
      })
    ];
    const { host, pane } = setup({ rows, presets: BOTH_PRESETS });

    pane.render('quick_fix');

    expect(
      el(host, '[data-bulk-applied-preset-value]').textContent.trim()
    ).toBe('quick fix 기본');
  });

  test('draws no apply record line while the projection omits the field', () => {
    const { host, pane } = setup();

    pane.render('quick_fix');

    expect(el(host, '[data-bulk-applied-preset]')).toBe(null);
  });

  test('locks its whole preset bar on a server with no quick_fix lane', () => {
    const legacy = row();
    delete legacy.quick_fix_orchestration_model;
    const { host, pane } = setup({ rows: [legacy], presets: BOTH_PRESETS });

    pane.render('quick_fix');

    const locked = [
      el(host, '[data-bulk-preset]'),
      el(host, '[data-bulk-preset-name]'),
      el(host, '[data-bulk-preset-save]'),
      el(host, '[data-bulk-preset-delete]')
    ].map((control) => ({
      disabled: control.disabled,
      title: control.getAttribute('title')
    }));
    const unsupported = {
      disabled: true,
      title: '서버가 quick_fix 레인을 지원하지 않습니다'
    };
    expect(locked).toEqual([
      unsupported,
      unsupported,
      unsupported,
      unsupported
    ]);
  });

  test('leaves the worker preset bar live on that same server', () => {
    const legacy = row();
    delete legacy.quick_fix_orchestration_model;
    const { host, pane } = setup({ rows: [legacy], presets: BOTH_PRESETS });

    pane.render('worker');

    expect(el(host, '[data-bulk-preset]').disabled).toBe(false);
  });

  test('says the preset list is server-wide on both tabs 저장', () => {
    const { host, pane } = setup({ presets: BOTH_PRESETS });

    pane.render('quick_fix');
    const quick_fix_title = el(host, '[data-bulk-preset-save]').title;
    pane.render('worker');

    expect([
      quick_fix_title,
      el(host, '[data-bulk-preset-save]').title
    ]).toEqual([
      expect.stringContaining(
        '프리셋 목록은 서버 전역이라 저장·삭제가 모든 저장소의 목록을 바꿉니다'
      ),
      expect.stringContaining(
        '프리셋 목록은 서버 전역이라 저장·삭제가 모든 저장소의 목록을 바꿉니다'
      )
    ]);
  });
});

describe('createBulkPane gate-r1 (UI-e1ta §3.1, §6, §9)', () => {
  test('keeps a half-typed Worker 주소 across a snapshot push', () => {
    const { host, pane, pushRows } = setup();
    pane.render('session');
    const input = el(host, '[data-bulk-session="bdui_url"]');
    input.value = 'http://host:3000';
    input.dispatchEvent(new Event('input', { bubbles: true }));

    pushRows([row(), row({ root_dir: WS_B, name: 'repo-b', revision: 6 })]);

    expect(el(host, '[data-bulk-session="bdui_url"]').value).toBe(
      'http://host:3000'
    );
  });

  test('disables the 주소 관측 되돌리기 button while a run is in flight', async () => {
    const { host, pane } = setup({
      rows: [
        row({ session_defaults: { bdui_url: 'http://a:3000' } }),
        row({
          root_dir: WS_B,
          name: 'repo-b',
          session_defaults: { bdui_url: 'http://b:3000' }
        })
      ],
      transport: () => new Promise(() => {})
    });
    pane.render('session');

    click(host, '[data-bulk-apply="session"]');
    await settle();

    expect(el(host, '[data-bulk-session-release="bdui_url"]').disabled).toBe(
      true
    );
  });

  test('offers a stored account the catalog does not carry', async () => {
    const { host, pane } = setup({
      rows: [
        row({
          workspace_accounts: {
            state: 'usable',
            values: { claude_account: 'gone@example.com' },
            warnings: []
          }
        })
      ]
    });

    pane.render('account');
    await settle();

    const option = el(
      host,
      '[data-bulk-account="claude_account"] option[value="gone@example.com"]'
    );
    expect(option.textContent?.trim()).toBe('gone@example.com (목록에 없음)');
  });

  test('checks an allow-set member the catalog does not carry', async () => {
    const { host, pane } = setup({
      rows: [
        row({
          provider_limit_policy: {
            claude: {
              mode: 'switch',
              accounts: ['gone@example.com'],
              preempt_pct: null
            },
            codex: { mode: 'switch', accounts: [], preempt_pct: null }
          }
        })
      ]
    });

    pane.render('account');
    await settle();

    expect(
      el(
        host,
        '[data-bulk-limit-account="gone@example.com"][data-runner="claude"]'
      ).checked
    ).toBe(true);
  });

  test('starts the account rows at 기본값 사용 on a legacy server', async () => {
    const legacy = row();
    delete legacy.session_defaults_state;
    delete legacy.workspace_accounts;
    const other = row({ root_dir: WS_B, name: 'repo-b' });
    delete other.session_defaults_state;
    delete other.workspace_accounts;
    const { host, pane } = setup({ rows: [legacy, other] });

    pane.render('account');
    await settle();

    expect(el(host, '[data-bulk-badge="claude_account"]')).toBe(null);
  });
});
