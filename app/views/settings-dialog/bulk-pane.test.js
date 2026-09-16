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
 * @param {{ rows?: any[], transport?: (type: string, payload: any) => any, onBulkApplied?: (root_dirs: string[]) => void }} [input]
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
    implPresetStore: { get: () => PRESETS },
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
});

describe('createBulkPane worker tab (UI-nu43 §3.3)', () => {
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

describe('createBulkPane account tab (UI-nu43 §3.4)', () => {
  test('disables the button with zero changes on an untouched form', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(el(host, '[data-bulk-count]').textContent.trim()).toBe(
      '바꿀 항목 0개'
    );
    expect(accountButton(host).disabled).toBe(true);
    expect(accountButton(host).title).toBe('바꿀 항목을 고르세요');
    expect(el(host, '[data-bulk-account="claude_account"]').value).toBe('');
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
      '변경 안 함',
      '기본값 사용 — 현재 로그인(a@example.com)',
      'a@example.com (team)',
      'b@example.com'
    ]);
  });

  test('offers only the first two options when the catalog is unreadable', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, json: async () => ({}) }))
    );
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(
      Array.from(
        el(host, '[data-bulk-account="codex_account"]').options,
        (/** @type {HTMLOptionElement} */ option) => option.textContent?.trim()
      )
    ).toEqual(['변경 안 함', '기본값 사용 — 현재 로그인(확인 불가)']);
  });

  test('writes only the changed Claude account with no policy request', async () => {
    const { host, pane, calls } = setup();
    pane.render('account');
    await settle();

    choose(host, '[data-bulk-account="claude_account"]', 'b@example.com');
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(calls.map(([type]) => type)).toEqual([
      'set-workspace-accounts',
      'set-workspace-accounts'
    ]);
    expect(payloadsOf(calls, 'set-workspace-accounts')).toEqual([
      { root_dir: WS_A, values: { claude_account: 'b@example.com' } },
      { root_dir: WS_B, values: { claude_account: 'b@example.com' } }
    ]);
  });

  test('sends the default option as null', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    choose(host, '[data-bulk-account="codex_account"]', '__bulk_use_default__');
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(payloadsOf(calls, 'set-workspace-accounts')).toEqual([
      { root_dir: WS_A, values: { codex_account: null } }
    ]);
  });

  test('sends an empty allow list when 바꾸기 is on with nothing chosen', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    tick(host, '[data-bulk-limit-accounts-toggle="codex"]', true);
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        root_dir: WS_A,
        runner: 'codex',
        patch: { accounts: [] },
        expected_revision: 1
      }
    ]);
  });

  test('omits the accounts key while 바꾸기 stays off', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    click(
      host,
      '[data-bulk-limit-mode-runner="claude"] [data-bulk-limit-mode="wait"]'
    );
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        root_dir: WS_A,
        runner: 'claude',
        patch: { mode: 'wait' },
        expected_revision: 1
      }
    ]);
  });

  test('sends the chosen allow accounts once 바꾸기 is on', async () => {
    const { host, pane, calls } = setup({ rows: [row()] });
    pane.render('account');
    await settle();

    tick(host, '[data-bulk-limit-accounts-toggle="claude"]', true);
    tick(
      host,
      '[data-runner="claude"][data-bulk-limit-account="b@example.com"]',
      true
    );
    click(host, '[data-bulk-apply="account"]');
    await settle();

    expect(
      payloadsOf(calls, 'worker-provider-limit-policy-set')[0].patch
    ).toEqual({ accounts: ['b@example.com'] });
  });

  test('keeps the allow account boxes disabled while 바꾸기 is off', async () => {
    const { host, pane } = setup();

    pane.render('account');
    await settle();

    expect(
      el(
        host,
        '[data-runner="claude"][data-bulk-limit-account="a@example.com"]'
      ).disabled
    ).toBe(true);
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
      payloadsOf(calls, 'worker-provider-limit-policy-set')[0].patch
    ).toEqual({ preempt_pct: 65 });
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

  test('counts runner fields separately in the change count', async () => {
    const { host, pane } = setup();
    pane.render('account');
    await settle();

    click(
      host,
      '[data-bulk-limit-mode-runner="claude"] [data-bulk-limit-mode="switch"]'
    );
    click(
      host,
      '[data-bulk-limit-mode-runner="codex"] [data-bulk-limit-mode="wait"]'
    );
    choose(host, '[data-bulk-preempt="codex"]', 'off');

    expect(el(host, '[data-bulk-count]').textContent.trim()).toBe(
      '바꿀 항목 3개'
    );
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
    expect(el(host, '[data-bulk-count]').textContent.trim()).toBe(
      '바꿀 항목 1개'
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
