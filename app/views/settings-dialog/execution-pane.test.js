import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecutionPane } from './execution-pane.js';

const REPO_B = '/tmp/example/repo-b';
/** @type {ReturnType<typeof createExecutionPane>[]} */
const mounted_panes = [];

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

const PRESETS = {
  revision: 4,
  presets: [
    {
      id: 'p1',
      name: '위임',
      settings: { impl_runtime: 'codex', impl_model: 'sol' }
    }
  ]
};

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function queueRow(patch = {}) {
  return {
    revision: 3,
    slots: 2,
    serial_lane_count: 1,
    auto_advance: false,
    auto_merge: false,
    provider_limit_policy: {
      claude: { mode: 'switch', accounts: [], preempt_pct: null },
      codex: { mode: 'switch', accounts: [], preempt_pct: null }
    },
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    orchestration_model: null,
    orchestration_effort: null,
    orchestration_speed: null,
    quick_fix_orchestration_model: null,
    quick_fix_orchestration_effort: null,
    quick_fix_orchestration_speed: null,
    ...patch
  };
}

/**
 * @param {{ root_dir?: string|null, queue?: any, values?: Record<string, string|boolean>, transport?: any, presets?: any, section?: string }} [options]
 */
function mount(options = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  /** @type {Array<[string, any]>} */
  const calls = [];
  const transport = vi.fn(async (/** @type {string} */ type, payload) => {
    calls.push([type, payload]);
    if (options.transport) {
      return await options.transport(type, payload);
    }
    return { values: options.values || {}, warnings: [] };
  });
  let queue_state = options.queue || queueRow();
  const notify = vi.fn();
  const pane = createExecutionPane(root, {
    root_dir: options.root_dir ?? null,
    queue: () => queue_state,
    transport,
    implPresetStore: {
      get: () => options.presets || { revision: 1, presets: [] }
    },
    notify,
    onQueueAdopt: (queue) => {
      queue_state = queue;
    }
  });
  mounted_panes.push(pane);
  if (options.section) {
    pane.render(options.section);
  }
  return {
    root,
    pane,
    transport,
    notify,
    calls,
    queue: () => queue_state
  };
}

/** Let the pane's `load()` settle. */
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

/**
 * @param {HTMLElement} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(root, selector) {
  return /** @type {HTMLElement} */ (root.querySelector(selector));
}

/**
 * @param {Array<[string, any]>} calls
 * @param {string} type
 * @returns {Array<any>}
 */
function payloadsOf(calls, type) {
  return calls.filter(([name]) => name === type).map(([, payload]) => payload);
}

beforeEach(() => {
  document.body.innerHTML = '';
});

afterEach(() => {
  for (const pane of mounted_panes.splice(0)) {
    pane.destroy();
  }
});

describe('createExecutionPane unbound (root_dir null)', () => {
  test('reads the connected workspace defaults without a root_dir key', async () => {
    const { pane, calls } = mount();

    await pane.load();

    expect(payloadsOf(calls, 'get-session-defaults')).toEqual([{}]);
  });

  test('sends a session edit with the same payload the dialog always sent', async () => {
    const { root, pane, calls } = mount({ values: { impl_runtime: 'codex' } });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { impl_speed: 'fast' } }
    ]);
  });

  test('sends the base-sync toggle as the JSON boolean the contract stores', async () => {
    const { root, pane, calls } = mount({ section: 'session' });
    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="base_sync_accept_local_commits"]')
    );
    box.checked = true;
    box.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { base_sync_accept_local_commits: true } }
    ]);
  });

  test('shows a stored true as checked and sends null when it is cleared', async () => {
    const { root, pane, calls } = mount({
      section: 'session',
      values: { base_sync_accept_local_commits: true }
    });
    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="base_sync_accept_local_commits"]')
    );
    expect(box.checked).toBe(true);

    box.checked = false;
    box.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { base_sync_accept_local_commits: null } }
    ]);
  });

  test('stores the last choice when a toggle is flipped back mid-save', async () => {
    /** @type {Array<() => void>} */
    const pending = [];
    const { root, pane, calls } = mount({
      section: 'session',
      transport: (/** @type {string} */ type, /** @type {any} */ payload) => {
        if (type !== 'set-session-defaults') {
          return { values: {}, warnings: [] };
        }
        const merged = { ...payload.values };
        for (const [key, value] of Object.entries(merged)) {
          if (value === null) {
            delete merged[key];
          }
        }
        return new Promise((resolve) =>
          pending.push(() => resolve({ values: merged, warnings: [] }))
        );
      }
    });
    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="base_sync_accept_local_commits"]')
    );
    box.checked = true;
    box.dispatchEvent(new Event('change'));
    await settle();

    // The first write is now in flight; flip back before it answers.
    box.checked = false;
    box.dispatchEvent(new Event('change'));
    await settle();
    pending.shift()?.();
    await settle();
    pending.shift()?.();
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { base_sync_accept_local_commits: true } },
      { values: { base_sync_accept_local_commits: null } }
    ]);
  });

  test('leaves the base-sync toggle unchecked for a stored false', async () => {
    const { root, pane } = mount({
      section: 'session',
      values: { base_sync_accept_local_commits: false }
    });
    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="base_sync_accept_local_commits"]')
    );

    expect(box.checked).toBe(false);
  });

  test('sends an orchestration edit with the queue revision only', async () => {
    const { root, pane, calls } = mount();
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="orchestration_model"]')
    );
    select.value = 'opus';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(
      payloadsOf(calls, 'worker-queue-set-orchestration-defaults')
    ).toEqual([
      { expected_revision: 3, values: { orchestration_model: 'opus' } }
    ]);
  });

  test('does not retry a conflicted queue op for the connected workspace', async () => {
    const { root, pane, calls } = mount({
      section: 'account',
      transport: async (/** @type {string} */ type) =>
        type === 'get-session-defaults'
          ? { values: {}, warnings: [] }
          : { applied: false, conflict: true, queue: { revision: 9 } }
    });
    await pane.load();

    el(
      root,
      '[data-limit-mode-runner="claude"] button[data-limit-mode="wait"]'
    ).click();
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toHaveLength(
      1
    );
  });
});

describe('createExecutionPane quick_fix group', () => {
  test('draws the orchestration rows and the dispatch row on main', async () => {
    const { root, pane } = mount();

    await pane.load();

    const group = el(root, '[data-quick-fix-group]');
    const rows = Array.from(group.querySelectorAll('select[data-key]'));

    expect(rows.map((row) => row.getAttribute('data-key'))).toEqual([
      'quick_fix_orchestration_model',
      'quick_fix_orchestration_effort',
      'quick_fix_impl_dispatch'
    ]);
  });

  test('names the main-session hint instead of the delegation rows', async () => {
    const { root, pane } = mount();

    await pane.load();

    expect(el(root, '[data-quick-fix-main-hint]').textContent).toContain(
      '메인 세션이 직접 구현합니다'
    );
  });

  test('draws the four delegation rows once the dispatch resolves delegated', async () => {
    const { root, pane } = mount({
      values: {
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'codex'
      }
    });

    await pane.load();

    const rows = Array.from(
      el(root, '[data-quick-fix-group]').querySelectorAll('select[data-key]')
    );

    expect(rows.map((row) => row.getAttribute('data-key'))).toEqual([
      'quick_fix_orchestration_model',
      'quick_fix_orchestration_effort',
      'quick_fix_impl_dispatch',
      'quick_fix_impl_runtime',
      'quick_fix_impl_model',
      'quick_fix_impl_effort',
      'quick_fix_impl_speed'
    ]);
  });

  test('hides the quick_fix delegation speed row for a claude runtime', async () => {
    const { root, pane } = mount({
      values: {
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'claude'
      }
    });

    await pane.load();

    expect(
      el(root, '[data-quick-fix-group]').querySelector(
        'select[data-key="quick_fix_impl_speed"]'
      )
    ).toBe(null);
  });

  test('derives the unset quick_fix runtime from its model before general runtime', async () => {
    const { root, pane } = mount({
      values: {
        impl_runtime: 'claude',
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_model: 'sol'
      }
    });

    await pane.load();

    const runtime = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="quick_fix_impl_runtime"]')
    );
    expect(runtime.options[0].textContent).toContain(
      '기본값 사용 — codex (유도)'
    );
  });

  test('marks a general model incompatible with the quick_fix runtime', async () => {
    const { root, pane } = mount({
      values: {
        impl_model: 'sol',
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'claude'
      }
    });

    await pane.load();

    const model = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="quick_fix_impl_model"]')
    );
    expect(model.options[0].textContent).toContain(
      '기본값 사용 — sol (비호환)'
    );
  });
});

describe('createExecutionPane preset strip', () => {
  test('offers one 적용 button and no lane tabs', async () => {
    const { root, pane } = mount({ presets: PRESETS });

    await pane.load();

    expect(root.querySelectorAll('[data-preset-apply-global]')).toHaveLength(1);
    expect(root.querySelector('[data-preset-lane-tabs]')).toBe(null);
    expect(root.querySelector('[data-preset-apply-quick-fix]')).toBe(null);
  });

  test('sends one apply payload without a lane', async () => {
    const { root, pane, calls } = mount({
      presets: PRESETS,
      transport: async (/** @type {string} */ type) => {
        if (type === 'apply-impl-preset-global') {
          return {
            applied: true,
            values: {},
            warnings: [],
            queue_applied: true
          };
        }
        return { values: {}, warnings: [] };
      }
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';
    preset.dispatchEvent(new Event('change'));

    el(root, '[data-preset-apply-global]').click();
    await settle();

    expect(payloadsOf(calls, 'apply-impl-preset-global')).toEqual([
      { preset_id: 'p1', expected_revision: 4, expected_queue_revision: 3 }
    ]);
  });

  test('refuses to apply against a server that takes no quick_fix values', async () => {
    const old_queue = queueRow();
    Reflect.deleteProperty(old_queue, 'quick_fix_orchestration_model');
    const { root, pane } = mount({ queue: old_queue, presets: PRESETS });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';
    preset.dispatchEvent(new Event('change'));

    const apply = /** @type {HTMLButtonElement} */ (
      el(root, '[data-preset-apply-global]')
    );

    expect(apply.disabled).toBe(true);
    expect(apply.title).toBe('서버가 quick_fix 값을 받지 않습니다');
  });

  test('captures the quick_fix rows when the current settings are saved', async () => {
    const { root, pane, calls } = mount({
      queue: queueRow({ quick_fix_orchestration_model: 'opus' }),
      values: {
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'codex'
      },
      transport: async (/** @type {string} */ type) => {
        if (type === 'get-session-defaults') {
          return {
            values: {
              quick_fix_impl_dispatch: 'delegated',
              quick_fix_impl_runtime: 'codex'
            },
            warnings: []
          };
        }
        return { applied: true, presets: [] };
      }
    });
    await pane.load();
    const name = /** @type {HTMLInputElement} */ (
      el(root, '[aria-label="프리셋 이름"]')
    );
    name.value = '빠른 수정';
    name.dispatchEvent(new Event('input'));

    el(root, '[data-preset-save]').click();
    await settle();

    expect(payloadsOf(calls, 'impl-preset-create')[0].settings).toEqual({
      quick_fix_orchestration_model: 'opus',
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_runtime: 'codex'
    });
  });

  test('previews a key the preset omits as cleared', async () => {
    const { root, pane } = mount({
      queue: queueRow({ quick_fix_orchestration_model: 'opus' }),
      presets: {
        revision: 4,
        presets: [{ id: 'p1', name: '자동', settings: { impl_model: 'sol' } }]
      }
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';
    preset.dispatchEvent(new Event('change'));

    expect(el(root, '[data-preset-diff]').textContent).toContain('기본(해제)');
  });

  test('re-derives the runtime selection from an adopted codex preset', async () => {
    const adopted_queue = queueRow({
      revision: 4,
      orchestration_model: 'sol',
      orchestration_speed: 'fast'
    });
    const { root, pane, calls } = mount({
      queue: queueRow({ orchestration_model: 'opus' }),
      presets: PRESETS,
      transport: async (/** @type {string} */ type) => {
        if (type === 'apply-impl-preset-global') {
          return {
            applied: true,
            values: {},
            warnings: [],
            queue: adopted_queue
          };
        }
        return { values: {}, warnings: [] };
      }
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';
    preset.dispatchEvent(new Event('change'));

    el(root, '[data-preset-apply-global]').click();
    await settle();

    expect(
      /** @type {HTMLSelectElement} */ (
        el(root, 'select[data-key="orchestration_runtime"]')
      ).value
    ).toBe('codex');
    expect(
      root.querySelector('select[data-key="orchestration_speed"]')
    ).not.toBe(null);

    pane.render('session');
    el(root, 'button[data-mode="fast_track"]').click();
    await settle();

    expect(
      payloadsOf(calls, 'worker-queue-set-orchestration-defaults').some(
        (payload) => payload.values?.orchestration_speed === null
      )
    ).toBe(false);
  });
});

describe('createExecutionPane 속도 rows', () => {
  test('hides the orchestration speed row while the runtime is claude', async () => {
    const { root, pane } = mount({
      queue: queueRow({ orchestration_model: 'opus' })
    });

    await pane.load();

    expect(root.querySelector('select[data-key="orchestration_speed"]')).toBe(
      null
    );
  });

  test('draws the orchestration speed row while the runtime is codex', async () => {
    const { root, pane } = mount({
      queue: queueRow({ orchestration_model: 'sol' })
    });

    await pane.load();

    expect(
      root.querySelector('select[data-key="orchestration_speed"]')
    ).not.toBe(null);
  });

  test('clears the effort along with the model on a runtime switch that drops it', async () => {
    const { root, pane, calls } = mount({
      queue: queueRow({
        orchestration_model: 'opus',
        orchestration_effort: 'high'
      })
    });
    await pane.load();

    const runtime = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="orchestration_runtime"]')
    );
    runtime.value = 'codex';
    runtime.dispatchEvent(new Event('change'));
    await settle();

    expect(
      payloadsOf(calls, 'worker-queue-set-orchestration-defaults')
    ).toEqual([
      {
        values: { orchestration_model: null, orchestration_effort: null },
        expected_revision: 3
      }
    ]);
  });

  test('offers the orchestration runtime without a 전체 option', async () => {
    const { root, pane } = mount();

    await pane.load();

    const runtime = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="orchestration_runtime"]')
    );

    expect(Array.from(runtime.options).map((option) => option.value)).toEqual([
      'claude',
      'codex'
    ]);
  });

  test('starts the orchestration runtime on the stored model runner', async () => {
    const { root, pane } = mount({
      queue: queueRow({ orchestration_model: 'sol' })
    });

    await pane.load();

    expect(
      /** @type {HTMLSelectElement} */ (
        el(root, 'select[data-key="orchestration_runtime"]')
      ).value
    ).toBe('codex');
  });

  test('clears the stored speed when its row disappears', async () => {
    const { root, pane, calls } = mount({
      values: { impl_runtime: 'codex', impl_speed: 'fast' }
    });
    await pane.load();

    const runtime = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_runtime"]')
    );
    runtime.value = 'claude';
    runtime.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { impl_runtime: 'claude', impl_speed: null } }
    ]);
  });

  test('hides a review gate speed row answered by self', async () => {
    const { root, pane } = mount({ values: { spec_review_model: 'self' } });

    await pane.load();

    expect(root.querySelector('select[data-key="spec_review_speed"]')).toBe(
      null
    );
  });

  test('draws a review gate speed row for a codex reviewer', async () => {
    const { root, pane } = mount({ values: { spec_review_model: 'codex' } });

    await pane.load();

    expect(root.querySelector('select[data-key="spec_review_speed"]')).not.toBe(
      null
    );
  });
});

describe('createExecutionPane sections', () => {
  test('leaves the automation rows out of every section', async () => {
    const { root, pane } = mount();

    await pane.load();

    expect(root.querySelector('[data-automation]')).toBe(null);
    expect(root.querySelector('[data-stepper]')).toBe(null);
  });

  test('leaves the mode, address and accounts off the worker section', async () => {
    const { root, pane } = mount();

    await pane.load();

    expect(root.querySelector('[data-mode]')).toBe(null);
    expect(root.querySelector('input[data-key="bdui_url"]')).toBe(null);
    expect(root.querySelector('[data-exec-accounts-group]')).toBe(null);
  });

  test('draws the mode segment and the advanced group on the session section', async () => {
    const { root, pane } = mount({ section: 'session' });

    await pane.load();

    expect(root.querySelector('[data-session-workflow-group]')).not.toBe(null);
    expect(root.querySelector('input[data-key="bdui_url"]')).not.toBe(null);
    expect(
      root.querySelector('input[data-key="base_sync_accept_local_commits"]')
    ).not.toBe(null);
  });

  test('names the Worker fast_track hint under the mode segment', async () => {
    const { root, pane } = mount({ section: 'session' });

    await pane.load();

    expect(el(root, '[data-workflow-mode-hint]').textContent).toContain(
      'Worker는 항상 fast_track으로 돕니다'
    );
  });

  test('draws the accounts and limit policy on the account section', async () => {
    const { root, pane } = mount({ section: 'account' });

    await pane.load();

    expect(root.querySelector('[data-exec-accounts-group]')).not.toBe(null);
    expect(root.querySelector('[data-limit-mode-runner="claude"]')).not.toBe(
      null
    );
    expect(root.querySelector('[data-quick-fix-group]')).toBe(null);
  });
});

describe('createExecutionPane bdui_url row', () => {
  test('renders the stored origin in a text box, not a select', async () => {
    const { root, pane } = mount({
      section: 'session',
      values: { bdui_url: 'http://host:3000' }
    });

    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    expect(input.value).toBe('http://host:3000');
    expect(root.querySelector('select[data-key="bdui_url"]')).toBeNull();
  });

  test('saves a well-formed origin through the session-defaults op', async () => {
    const { root, pane, calls } = mount({ section: 'session' });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'http://100.64.0.1:3000';
    input.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { bdui_url: 'http://100.64.0.1:3000' } }
    ]);
  });

  test('trims the typed value before judging and saving it', async () => {
    const { root, pane, calls } = mount({ section: 'session' });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = '  http://host:3000  ';
    input.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { bdui_url: 'http://host:3000' } }
    ]);
  });

  test('refuses to save a malformed origin and marks the box invalid', async () => {
    const { root, pane, calls } = mount({ section: 'session' });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'host:3000';
    input.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([]);
    expect(
      el(root, 'input[data-key="bdui_url"]').getAttribute('aria-invalid')
    ).toBe('true');
  });

  test('keeps an unrelated edit saveable while the box holds invalid text', async () => {
    const { root, pane, calls } = mount({ section: 'session' });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'host:3000';
    input.dispatchEvent(new Event('change'));
    await settle();
    const box = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="base_sync_accept_local_commits"]')
    );
    box.checked = true;
    box.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { base_sync_accept_local_commits: true } }
    ]);
  });

  test('keeps mid-typed text when an unrelated re-render lands', async () => {
    const { root, pane, calls } = mount({ section: 'session' });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'http://host:30';
    input.dispatchEvent(new Event('input'));
    pane.render();

    expect(
      /** @type {HTMLInputElement} */ (el(root, 'input[data-key="bdui_url"]'))
        .value
    ).toBe('http://host:30');
    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([]);
  });

  test('leaves the box unmarked while the typed text is still incomplete', async () => {
    const { root, pane } = mount({ section: 'session' });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'http://host:30';
    input.dispatchEvent(new Event('input'));
    pane.render();

    expect(
      el(root, 'input[data-key="bdui_url"]').getAttribute('aria-invalid')
    ).toBe('false');
  });

  test('clears the invalid mark once the user resumes editing', async () => {
    const { root, pane } = mount({ section: 'session' });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'host:3000';
    input.dispatchEvent(new Event('change'));
    await settle();
    const marked = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    marked.value = 'http://host:3000';
    marked.dispatchEvent(new Event('input'));
    pane.render();

    expect(
      el(root, 'input[data-key="bdui_url"]').getAttribute('aria-invalid')
    ).toBe('false');
  });

  test('keeps the invalid text on screen after an unrelated save succeeds', async () => {
    const { root, pane } = mount({ section: 'session' });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'host:3000';
    input.dispatchEvent(new Event('change'));
    await settle();
    const box = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="base_sync_accept_local_commits"]')
    );
    box.checked = true;
    box.dispatchEvent(new Event('change'));
    await settle();

    expect(
      /** @type {HTMLInputElement} */ (el(root, 'input[data-key="bdui_url"]'))
        .value
    ).toBe('host:3000');
  });

  test('sends an emptied box as the null deletion request', async () => {
    const { root, pane, calls } = mount({
      section: 'session',
      values: { bdui_url: 'http://host:3000' }
    });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = '';
    input.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { bdui_url: null } }
    ]);
  });
});

describe('createExecutionPane bound to another repo', () => {
  test('carries root_dir on both session-defaults ops', async () => {
    const { root, pane, calls } = mount({
      root_dir: REPO_B,
      values: { impl_runtime: 'codex' }
    });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'get-session-defaults')).toEqual([
      { root_dir: REPO_B }
    ]);
    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { impl_speed: 'fast' }, root_dir: REPO_B }
    ]);
  });

  test('carries root_dir on every queue-CAS op the pane owns', async () => {
    const { root, pane, calls } = mount({ root_dir: REPO_B });
    await pane.load();

    const model = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="orchestration_model"]')
    );
    model.value = 'opus';
    model.dispatchEvent(new Event('change'));
    await settle();
    pane.render('account');
    el(
      root,
      '[data-limit-mode-runner="claude"] button[data-limit-mode="wait"]'
    ).click();
    await settle();

    for (const type of [
      'worker-queue-set-orchestration-defaults',
      'worker-provider-limit-policy-set'
    ]) {
      const payloads = payloadsOf(calls, type);
      expect(payloads).toHaveLength(1);
      expect(payloads[0]).toMatchObject({
        root_dir: REPO_B,
        expected_revision: 3
      });
    }
  });

  test('carries root_dir on a global preset apply', async () => {
    const { root, pane, calls } = mount({
      root_dir: REPO_B,
      presets: {
        revision: 4,
        presets: [{ id: 'p1', name: 'p', settings: { impl_runtime: 'codex' } }]
      },
      transport: async (/** @type {string} */ type) =>
        type === 'apply-impl-preset-global'
          ? { applied: true, values: {}, warnings: [], queue_applied: true }
          : { values: {}, warnings: [] }
    });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    el(root, '[data-preset-apply-global]').click();
    await settle();

    expect(payloadsOf(calls, 'apply-impl-preset-global')).toEqual([
      {
        preset_id: 'p1',
        expected_revision: 4,
        expected_queue_revision: 3,
        root_dir: REPO_B
      }
    ]);
  });

  test('retries a conflicted switch ONCE with the revision the response carried', async () => {
    let seen = 0;
    const { root, pane, calls } = mount({
      root_dir: REPO_B,
      section: 'account',
      transport: async (/** @type {string} */ type) => {
        if (type !== 'worker-provider-limit-policy-set') {
          return { values: {}, warnings: [] };
        }
        seen += 1;
        return seen === 1
          ? { applied: false, conflict: true, queue: { revision: 11 } }
          : { applied: true, queue: { revision: 12 } };
      }
    });
    await pane.load();

    el(
      root,
      '[data-limit-mode-runner="claude"] button[data-limit-mode="wait"]'
    ).click();
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        runner: 'claude',
        patch: { mode: 'wait' },
        root_dir: REPO_B,
        expected_revision: 3
      },
      {
        runner: 'claude',
        patch: { mode: 'wait' },
        root_dir: REPO_B,
        expected_revision: 11
      }
    ]);
  });

  test('retries a preset apply whose queue half lost the CAS', async () => {
    let seen = 0;
    const { root, pane, calls } = mount({
      root_dir: REPO_B,
      presets: {
        revision: 4,
        presets: [{ id: 'p1', name: 'p', settings: { impl_runtime: 'codex' } }]
      },
      transport: async (/** @type {string} */ type) => {
        if (type !== 'apply-impl-preset-global') {
          return { values: {}, warnings: [] };
        }
        seen += 1;
        return seen === 1
          ? {
              applied: true,
              values: {},
              warnings: [],
              queue_applied: false,
              queue: { revision: 21 }
            }
          : { applied: true, values: {}, warnings: [], queue_applied: true };
      }
    });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    el(root, '[data-preset-apply-global]').click();
    await settle();

    const payloads = payloadsOf(calls, 'apply-impl-preset-global');
    expect(payloads).toHaveLength(2);
    expect(payloads[1].expected_queue_revision).toBe(21);
  });
});

describe('createExecutionPane limit policy section', () => {
  test('reads each runner limit mode from the queue snapshot', async () => {
    const { root, pane } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: { mode: 'wait', accounts: [], preempt_pct: null },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    });

    await pane.load();

    expect(
      el(
        root,
        '[data-limit-mode-runner="claude"] button[data-limit-mode="wait"]'
      ).getAttribute('aria-pressed')
    ).toBe('true');
    expect(
      el(
        root,
        '[data-limit-mode-runner="codex"] button[data-limit-mode="switch"]'
      ).getAttribute('aria-pressed')
    ).toBe('true');
  });

  test('draws the stored policy a monitor row carries on a bound pane (UI-8ncz §5)', async () => {
    const { root, pane } = mount({
      section: 'account',
      root_dir: REPO_B,
      queue: queueRow({
        provider_limit_policy: {
          claude: {
            mode: 'switch',
            accounts: ['repo@example.com'],
            preempt_pct: 70
          },
          codex: { mode: 'wait', accounts: [], preempt_pct: null }
        }
      })
    });

    await pane.load();

    expect(
      el(
        root,
        '[data-limit-mode-runner="claude"] button[data-limit-mode="switch"]'
      ).getAttribute('aria-pressed')
    ).toBe('true');
    expect(
      el(
        root,
        '[data-limit-mode-runner="codex"] button[data-limit-mode="wait"]'
      ).getAttribute('aria-pressed')
    ).toBe('true');
  });

  // RED 22 — 모드 세그먼트는 러너별 patch 하나만 보낸다 (UI-13o1 §3.5).
  test('sends a mode segment click as a per-runner policy patch', async () => {
    const { root, pane, calls } = mount({
      section: 'account',
      transport: async (/** @type {string} */ type) =>
        type === 'worker-provider-limit-policy-set'
          ? { applied: true, conflict: false, queue: queueRow({ revision: 4 }) }
          : { values: {}, warnings: [] }
    });
    await pane.load();

    el(
      root,
      '[data-limit-mode-runner="codex"] button[data-limit-mode="wait"]'
    ).click();
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      { runner: 'codex', patch: { mode: 'wait' }, expected_revision: 3 }
    ]);
  });
});

describe('createExecutionPane lifecycle', () => {
  test('keeps the edit and notifies when a session save fails', async () => {
    const { root, pane, notify } = mount({
      transport: async (/** @type {string} */ type) => {
        if (type === 'get-session-defaults') {
          return { values: {}, warnings: [] };
        }
        throw new Error('kv read-only');
      }
    });
    await pane.load();

    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_runtime"]')
    );
    select.value = 'codex';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(notify).toHaveBeenCalled();
    expect(pane.sessionDraft()).toEqual({ impl_runtime: 'codex' });
  });

  test('destroy empties the host and stops rendering into it', async () => {
    const { root, pane } = mount();
    await pane.load();

    pane.destroy();
    pane.render();

    expect(root.children).toHaveLength(0);
  });

  test('destroy leaves no listener that a later click could still reach', async () => {
    const { root, pane, calls } = mount({ section: 'account' });
    await pane.load();
    const button = el(
      root,
      '[data-limit-mode-runner="claude"] button[data-limit-mode="wait"]'
    );

    pane.destroy();
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([]);
  });
});

describe('createExecutionPane exec accounts (UI-d3cb §6.1)', () => {
  const CLAUDE_ROWS = {
    accounts: [
      {
        key: 'repo@example.com',
        email: 'repo@example.com',
        alias: 'team',
        active: false,
        status: 'ok'
      },
      {
        key: 'active@example.com',
        email: 'active@example.com',
        active: true,
        status: 'ok'
      }
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

  /**
   * Serve both usage endpoints. `null` for an endpoint makes that request fail
   * the way an unreachable list does.
   *
   * @param {{ claude?: any, codex?: any }} providers
   */
  function stubAccountFetch(providers) {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (/** @type {string} */ url) => {
        const body = url.includes('claude')
          ? providers.claude
          : providers.codex;
        if (!body) {
          return { ok: false, json: async () => ({}) };
        }
        return { ok: true, json: async () => body };
      })
    );
  }

  /**
   * @param {HTMLElement} root
   * @param {string} key
   */
  function accountSelect(root, key) {
    return /** @type {HTMLSelectElement} */ (
      root.querySelector(`select[data-account-key="${key}"]`)
    );
  }

  /**
   * @param {HTMLSelectElement} select
   */
  function labels(select) {
    return Array.from(select.options).map(
      (option) => option.textContent?.trim() || ''
    );
  }

  beforeEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  test('renders both provider selects in their own group', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane } = mount({ section: 'account' });

    await pane.load();

    expect(root.querySelector('[data-exec-accounts-group]')).not.toBe(null);
    expect(labels(accountSelect(root, 'claude_account'))).toEqual([
      '기본값 사용 — 현재 로그인(active@example.com)',
      'repo@example.com (team)',
      'active@example.com'
    ]);
    expect(labels(accountSelect(root, 'codex_account'))).toEqual([
      '기본값 사용 — 현재 로그인(codex@example.com · pro)',
      'codex@example.com · pro'
    ]);
  });

  test('names an account the same way in the select and the allow list', async () => {
    const with_windows = {
      accounts: [
        {
          key: 'repo@example.com',
          email: 'repo@example.com',
          active: true,
          status: 'ok',
          windows: [
            { key: '5h', pct: 62 },
            { key: '7d', pct: 41 }
          ]
        }
      ]
    };
    stubAccountFetch({ claude: with_windows, codex: CODEX_ROWS });
    const { root, pane } = mount({ section: 'account' });

    await pane.load();

    const allow_box = /** @type {HTMLElement} */ (
      root.querySelector(
        '[data-limit-runner="claude"][data-limit-account="repo@example.com"]'
      )
    );
    const allow_label = /** @type {HTMLElement} */ (allow_box.parentElement);
    expect(labels(accountSelect(root, 'claude_account'))).toContain(
      'repo@example.com (5h 62% · 7d 41%)'
    );
    expect(allow_label.textContent?.trim()).toBe(
      'repo@example.com (5h 62% · 7d 41%)'
    );
  });

  test('reads the layer without a root_dir key when unbound', async () => {
    const { pane, calls } = mount({ section: 'account' });

    await pane.load();

    expect(payloadsOf(calls, 'get-workspace-accounts')).toEqual([{}]);
  });

  test('sends set-workspace-accounts on a change', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount({ section: 'account' });
    await pane.load();

    const select = accountSelect(root, 'claude_account');
    select.value = 'repo@example.com';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-workspace-accounts')).toEqual([
      { values: { claude_account: 'repo@example.com' } }
    ]);
  });

  test('sends a deletion when the inherit option is chosen', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount({
      section: 'account',
      transport: async (/** @type {string} */ type) =>
        type === 'get-workspace-accounts'
          ? {
              state: 'usable',
              values: { claude_account: 'repo@example.com' },
              warnings: []
            }
          : { state: 'absent', values: {}, warnings: [] }
    });
    await pane.load();

    const select = accountSelect(root, 'claude_account');
    select.value = '';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-workspace-accounts')).toEqual([
      { values: { claude_account: null } }
    ]);
  });

  test('carries root_dir on a bound pane', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount({
      section: 'account',
      root_dir: REPO_B
    });
    await pane.load();

    const select = accountSelect(root, 'codex_account');
    select.value = 'codex-key';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'get-workspace-accounts')).toEqual([
      { root_dir: REPO_B }
    ]);
    expect(payloadsOf(calls, 'set-workspace-accounts')).toEqual([
      { values: { codex_account: 'codex-key' }, root_dir: REPO_B }
    ]);
  });

  test('hints an unreadable list and keeps the stored value selectable', async () => {
    stubAccountFetch({ claude: null, codex: null });
    const { root, pane } = mount({
      section: 'account',
      transport: async () => ({
        state: 'usable',
        values: { claude_account: 'repo@example.com' },
        warnings: []
      })
    });

    await pane.load();

    expect(root.textContent).toContain('계정 목록을 불러올 수 없습니다');
    const select = accountSelect(root, 'claude_account');
    expect(select.value).toBe('repo@example.com');
    expect(labels(select)).toEqual([
      '기본값 사용 — 현재 로그인(확인 불가)',
      'repo@example.com (목록에 없음)'
    ]);
  });

  test('banners an unusable layer as a blocked dispatch', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane } = mount({
      section: 'account',
      transport: async () => ({
        state: 'unusable',
        values: {},
        warnings: ['invalid_value:codex_account']
      })
    });

    await pane.load();

    const banner = el(root, '[data-account-warning]');
    expect(banner.textContent).toContain('디스패치가 거부됩니다');
    expect(banner.textContent).toContain('invalid_value:codex_account');
  });

  test('banners an unknown key without claiming a blocked dispatch', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane } = mount({
      section: 'account',
      transport: async () => ({
        state: 'usable',
        values: {},
        warnings: ['unknown_key:stray']
      })
    });

    await pane.load();

    const banner = el(root, '[data-account-warning]');
    expect(banner.textContent).toContain('unknown_key:stray');
    expect(banner.textContent).not.toContain('디스패치가 거부됩니다');
  });

  test('shows no banner for a clean layer', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane } = mount({ section: 'account' });

    await pane.load();

    expect(root.querySelector('[data-account-warning]')).toBe(null);
  });

  test('keeps the user edit and notifies when a save fails', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, notify } = mount({
      section: 'account',
      transport: async (/** @type {string} */ type) => {
        if (type === 'set-workspace-accounts') {
          throw new Error('kv_write_failed');
        }
        return { state: 'absent', values: {}, warnings: [] };
      }
    });
    await pane.load();

    const select = accountSelect(root, 'claude_account');
    select.value = 'repo@example.com';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(notify).toHaveBeenCalledWith(
      '실행 계정 기본값 저장 실패: kv_write_failed'
    );
    expect(accountSelect(root, 'claude_account').value).toBe(
      'repo@example.com'
    );
  });

  test('sends the second change only after the first write answers', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    /** @type {Array<() => void>} */
    const pending = [];
    const { root, pane, calls } = mount({
      section: 'account',
      transport: async (/** @type {string} */ type) => {
        if (type !== 'set-workspace-accounts') {
          return { state: 'absent', values: {}, warnings: [] };
        }
        await new Promise((resolve) => pending.push(() => resolve(undefined)));
        return {
          state: 'usable',
          values: { claude_account: 'repo@example.com' },
          warnings: []
        };
      }
    });
    await pane.load();

    const claude = accountSelect(root, 'claude_account');
    claude.value = 'repo@example.com';
    claude.dispatchEvent(new Event('change'));
    await settle();
    const codex = accountSelect(root, 'codex_account');
    codex.value = 'codex-key';
    codex.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'set-workspace-accounts')).toEqual([
      { values: { claude_account: 'repo@example.com' } }
    ]);

    pending.shift()?.();
    await settle();
    await settle();

    expect(payloadsOf(calls, 'set-workspace-accounts')).toEqual([
      { values: { claude_account: 'repo@example.com' } },
      { values: { codex_account: 'codex-key' } }
    ]);
  });

  test('keeps an edit made while an earlier write was in flight', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    /** @type {Array<() => void>} */
    const pending = [];
    const { root, pane } = mount({
      section: 'account',
      transport: async (/** @type {string} */ type) => {
        if (type !== 'set-workspace-accounts') {
          return { state: 'absent', values: {}, warnings: [] };
        }
        await new Promise((resolve) => pending.push(() => resolve(undefined)));
        return {
          state: 'usable',
          values: { claude_account: 'repo@example.com' },
          warnings: []
        };
      }
    });
    await pane.load();

    const claude = accountSelect(root, 'claude_account');
    claude.value = 'repo@example.com';
    claude.dispatchEvent(new Event('change'));
    await settle();
    const codex = accountSelect(root, 'codex_account');
    codex.value = 'codex-key';
    codex.dispatchEvent(new Event('change'));
    pending.shift()?.();
    await settle();
    await settle();

    expect(accountSelect(root, 'codex_account').value).toBe('codex-key');
  });

  // RED 23 — 체크는 현재 집합을 읽어 key를 더하거나 뺀 배열을 보낸다 (§3.5).
  test('adds a checked account to the stored allow list', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: {
            mode: 'switch',
            accounts: ['active@example.com'],
            preempt_pct: null
          },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    });
    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(
        root,
        '[data-limit-runner="claude"][data-limit-account="repo@example.com"]'
      )
    );
    box.checked = true;
    box.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        runner: 'claude',
        patch: { accounts: ['active@example.com', 'repo@example.com'] },
        expected_revision: 3
      }
    ]);
  });

  // RED 23 (음성) — 체크 해제는 같은 집합에서 그 key만 뺀다 (§3.5).
  test('drops an unchecked account from the stored allow list', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: {
            mode: 'switch',
            accounts: ['active@example.com', 'repo@example.com'],
            preempt_pct: null
          },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    });
    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(
        root,
        '[data-limit-runner="claude"][data-limit-account="active@example.com"]'
      )
    );
    box.checked = false;
    box.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        runner: 'claude',
        patch: { accounts: ['repo@example.com'] },
        expected_revision: 3
      }
    ]);
  });

  // RED 23 (동시) — 응답 전 두 번째 해제는 첫 결과를 되돌리지 않는다 (§3.5).
  test('serializes two unchecks so the second extends the first', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    /** @type {Array<(value: any) => void>} */
    const deferred = [];
    const { root, pane, calls } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: {
            mode: 'switch',
            accounts: ['active@example.com', 'repo@example.com'],
            preempt_pct: null
          },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      }),
      transport: (/** @type {string} */ type) => {
        if (type !== 'worker-provider-limit-policy-set') {
          return Promise.resolve({ ok: true });
        }
        return new Promise((resolve) => {
          deferred.push(resolve);
        });
      }
    });
    await pane.load();

    const first = /** @type {HTMLInputElement} */ (
      el(
        root,
        '[data-limit-runner="claude"][data-limit-account="active@example.com"]'
      )
    );
    first.checked = false;
    first.dispatchEvent(new Event('change'));
    await settle();
    const second = /** @type {HTMLInputElement} */ (
      el(
        root,
        '[data-limit-runner="claude"][data-limit-account="repo@example.com"]'
      )
    );
    second.checked = false;
    second.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        runner: 'claude',
        patch: { accounts: ['repo@example.com'] },
        expected_revision: 3
      }
    ]);

    deferred[0]({ ok: true });
    await settle();
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        runner: 'claude',
        patch: { accounts: ['repo@example.com'] },
        expected_revision: 3
      },
      { runner: 'claude', patch: { accounts: [] }, expected_revision: 3 }
    ]);
  });

  // RED 24 — 체크 해제는 끔이고, 숫자 입력은 정수 임계다 (§3.5).
  test('turns preemptive switching off with a null threshold', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: { mode: 'switch', accounts: [], preempt_pct: 80 },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    });
    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(root, '[data-limit-preempt="claude"]')
    );
    box.checked = false;
    box.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        runner: 'claude',
        patch: { preempt_pct: null },
        expected_revision: 3
      }
    ]);
  });

  // RED 24 — 입력 변경은 정수 임계를 보낸다 (§3.5).
  test('sends the typed threshold as an integer', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: { mode: 'switch', accounts: [], preempt_pct: 80 },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-limit-preempt-pct="claude"]')
    );
    input.value = '45';
    input.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      { runner: 'claude', patch: { preempt_pct: 45 }, expected_revision: 3 }
    ]);
  });

  // 모니터는 1초마다 pane을 다시 그린다 — 입력 중인 값이 저장값으로 되돌아가면 안 된다.
  test('explains live switching and usage delays beside the preempt threshold', async () => {
    const { root, pane } = mount({ section: 'account' });

    await pane.load();

    expect(el(root, '[data-limit-preempt-row="claude"]').textContent).toContain(
      '실행 중인 세션도 이 값에서 전환합니다'
    );
    expect(el(root, '[data-limit-preempt-row="claude"]').textContent).toContain(
      '사용량 반영은 최대 몇 분 지연될 수 있습니다'
    );
  });

  test('keeps the typed preempt threshold across a re-render', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: { mode: 'switch', accounts: [], preempt_pct: null },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    });
    await pane.load();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-limit-preempt-pct="claude"]')
    );

    input.value = '6';
    input.dispatchEvent(new Event('input'));
    pane.render();

    expect(
      /** @type {HTMLInputElement} */ (
        el(root, '[data-limit-preempt-pct="claude"]')
      ).value
    ).toBe('6');
  });

  test('snaps an out-of-range preempt threshold back to the stored value', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: { mode: 'switch', accounts: [], preempt_pct: 70 },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    });
    await pane.load();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-limit-preempt-pct="claude"]')
    );

    input.value = '150';
    input.dispatchEvent(new Event('input'));
    input.dispatchEvent(new Event('change'));
    await settle();

    expect(input.value).toBe('70');
    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([]);
  });

  // RED 25 — 목록에 없는 저장 key도 선택을 잃지 않는다 (§3.5, §6.1 규칙 재사용).
  test('keeps a stored key the catalog does not carry as a checked item', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: {
            mode: 'switch',
            accounts: ['gone@example.com'],
            preempt_pct: null
          },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      })
    });

    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(
        root,
        '[data-limit-runner="claude"][data-limit-account="gone@example.com"]'
      )
    );
    expect(box.checked).toBe(true);
    expect(box.closest('label')?.textContent?.trim()).toBe(
      'gone@example.com (목록에 없음)'
    );
  });
});
/**
 * @param {string|null} [value]
 * @param {string} [revision]
 * @param {string} [source]
 */
function workerResponse(
  value = 'http://common:3000',
  revision = 'original',
  source = 'common'
) {
  return {
    values: {},
    warnings: [],
    worker_url: {
      status: 'ok',
      effective_url: value,
      source,
      workspace_override: source === 'workspace' ? value : null,
      common: {
        value,
        state: value === null ? 'unset' : 'configured',
        revision
      },
      warnings: []
    }
  };
}

/**
 * @param {HTMLElement} root
 * @param {string} value
 */
function typeCommon(root, value) {
  const input = /** @type {HTMLInputElement} */ (
    el(root, '[data-worker-common-input]')
  );
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

/** Wait for asynchronous refresh rendering, not a fixed count of microtasks. */
async function finishRefresh() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

describe('common Worker address form', () => {
  test('shows inherited origin without storing it in the exception input', async () => {
    const { root, pane } = mount({
      section: 'session',
      transport: async () => workerResponse()
    });

    await pane.load();

    expect(
      /** @type {HTMLInputElement} */ (el(root, '[data-key="bdui_url"]')).value
    ).toBe('');
    expect(el(root, '[data-key-hint="bdui_url"]').textContent).toContain(
      'http://common:3000'
    );
    expect(pane.sessionDraft()).not.toHaveProperty('bdui_url');
  });

  test.each([
    ['common', '공통 기본값'],
    ['workspace', '이 저장소의 예외'],
    ['unset', '미설정']
  ])('renders the %s source label', async (source, label) => {
    const { root, pane } = mount({
      section: 'session',
      transport: async () =>
        workerResponse(
          source === 'unset' ? null : 'http://common:3000',
          'original',
          source
        )
    });

    await pane.load();

    expect(el(root, '[data-worker-url-effective]').textContent).toContain(
      label
    );
  });

  test.each([
    ['helper_unavailable', '도우미 설치/실행 필요'],
    ['workspace_unavailable', '저장소 설정 읽기 오류']
  ])('shows unavailable cause %s distinctly', async (code, label) => {
    const { root, pane } = mount({
      section: 'session',
      transport: async () => ({
        values: {},
        worker_url: { status: 'unavailable', error: { code } }
      })
    });

    await pane.load();

    expect(el(root, '[data-worker-url-effective]').textContent).toContain(
      label
    );
    expect(el(root, '[data-worker-url-effective]').textContent).not.toContain(
      '미설정'
    );
    expect(
      /** @type {HTMLInputElement} */ (el(root, '[data-worker-common-input]'))
        .disabled
    ).toBe(true);
  });

  test('disables common editing against an old server', async () => {
    const { root, pane } = mount({ section: 'session' });

    await pane.load();

    expect(el(root, '[data-worker-url-effective]').textContent).toContain(
      '서버 갱신 필요'
    );
    expect(
      /** @type {HTMLButtonElement} */ (el(root, '[data-worker-common-save]'))
        .disabled
    ).toBe(true);
  });

  test.each(['invalid', 'unavailable'])(
    'disables editing of a %s common document',
    async (state) => {
      const response = workerResponse();
      response.worker_url.common.state = state;
      const { root, pane } = mount({
        section: 'session',
        transport: async () => response
      });

      await pane.load();

      expect(
        /** @type {HTMLInputElement} */ (el(root, '[data-worker-common-input]'))
          .disabled
      ).toBe(true);
      expect(el(root, '[data-worker-url-common]').textContent).toContain(
        state === 'invalid' ? '공통 설정 형식 오류' : '공통 설정 읽기 오류'
      );
    }
  );

  test('saves exception and common values through independent payloads', async () => {
    const { root, pane, calls } = mount({
      root_dir: REPO_B,
      section: 'session',
      transport: async (
        /** @type {string} */ type,
        /** @type {any} */ payload
      ) => {
        if (type === 'set-worker-url-common') {
          const response = workerResponse(payload.value, 'saved');
          return {
            common_saved: true,
            common: response.worker_url.common,
            worker_url: response.worker_url
          };
        }
        return workerResponse();
      }
    });
    await pane.load();
    typeCommon(root, 'http://new:3000');

    el(root, '[data-worker-common-save]').click();
    await finishRefresh();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-key="bdui_url"]')
    );
    input.value = 'http://exception:3000';
    input.dispatchEvent(new Event('change'));
    await finishRefresh();

    expect(payloadsOf(calls, 'set-worker-url-common')).toEqual([
      {
        root_dir: REPO_B,
        value: 'http://new:3000',
        expected_revision: 'original'
      }
    ]);
    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { root_dir: REPO_B, values: { bdui_url: 'http://exception:3000' } }
    ]);
  });

  test('keeps dirty common draft and original revision through focus refresh and conflict', async () => {
    let response = workerResponse();
    const { root, pane, calls, notify } = mount({
      section: 'session',
      transport: async (/** @type {string} */ type) => {
        if (type === 'set-worker-url-common') {
          throw { code: 'revision_conflict' };
        }
        return response;
      }
    });
    await pane.load();
    typeCommon(root, 'http://draft:3000');
    response = workerResponse('http://external:3000', 'external');

    window.dispatchEvent(new Event('focus'));
    await finishRefresh();
    el(root, '[data-worker-common-save]').click();
    await finishRefresh();

    expect(el(root, '[data-worker-common-latest]').textContent).toContain(
      'http://external:3000'
    );
    expect(
      /** @type {HTMLInputElement} */ (el(root, '[data-worker-common-input]'))
        .value
    ).toBe('http://draft:3000');
    expect(payloadsOf(calls, 'set-worker-url-common')).toEqual([
      { value: 'http://draft:3000', expected_revision: 'original' }
    ]);
    expect(notify).toHaveBeenCalledWith(
      '다른 창에서 변경됨 — 새로고침 후 다시 시도'
    );
  });

  test('adopts latest value and revision after explicit cancellation', async () => {
    let response = workerResponse();
    const { root, pane, calls } = mount({
      section: 'session',
      transport: async () => response
    });
    await pane.load();
    typeCommon(root, 'http://draft:3000');
    response = workerResponse('http://external:3000', 'external');
    window.dispatchEvent(new Event('focus'));
    await finishRefresh();

    el(root, '[data-worker-common-cancel]').click();
    el(root, '[data-worker-common-save]').click();
    await finishRefresh();

    expect(payloadsOf(calls, 'set-worker-url-common')[0]).toEqual({
      value: 'http://external:3000',
      expected_revision: 'external'
    });
  });

  test('keeps a dirty session text input during focus refresh', async () => {
    let response = workerResponse();
    const { root, pane } = mount({
      section: 'session',
      transport: async () => response
    });
    await pane.load();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-key="bdui_url"]')
    );
    input.value = 'http://unfinished';
    input.dispatchEvent(new Event('input'));
    response = {
      ...workerResponse('http://external:3000', 'new'),
      values: { bdui_url: 'http://other:3000' }
    };

    window.dispatchEvent(new Event('focus'));
    await finishRefresh();

    expect(input.value).toBe('http://unfinished');
    expect(pane.sessionDraft()).not.toHaveProperty('bdui_url');
    expect(el(root, '[data-worker-url-effective]').textContent).toContain(
      'http://external:3000'
    );
  });

  test('drops an older load response after a new generation loads', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    let queries = 0;
    const { root, pane } = mount({
      section: 'session',
      transport: async (/** @type {string} */ type) => {
        if (type === 'get-session-defaults' && ++queries === 1) {
          return await new Promise((resolve) => {
            release = resolve;
          });
        }
        return workerResponse('http://new:3000');
      }
    });
    const old_load = pane.load();

    await pane.load();
    release(workerResponse('http://stale:3000'));
    await old_load;

    expect(el(root, '[data-worker-url-effective]').textContent).toContain(
      'http://new:3000'
    );
    expect(root.textContent).not.toContain('http://stale:3000');
  });

  test('drops another root response after its pane is destroyed', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    const old = mount({
      root_dir: '/old',
      section: 'session',
      transport: async (/** @type {string} */ type) =>
        type === 'get-session-defaults'
          ? await new Promise((resolve) => {
              release = resolve;
            })
          : {}
    });
    const old_load = old.pane.load();
    old.pane.destroy();
    const current = mount({
      root_dir: REPO_B,
      section: 'session',
      transport: async () => workerResponse('http://current:3000')
    });
    await current.pane.load();

    release(workerResponse('http://old:3000'));
    await old_load;

    expect(old.root.textContent).toBe('');
    expect(current.root.textContent).not.toContain('http://old:3000');
    expect(
      el(current.root, '[data-worker-url-effective]').textContent
    ).toContain('http://current:3000');
  });

  test('removes the focus refresh listener on destroy', async () => {
    const { pane, calls } = mount({ section: 'session' });
    await pane.load();
    pane.destroy();

    window.dispatchEvent(new Event('focus'));
    await finishRefresh();

    expect(payloadsOf(calls, 'get-session-defaults')).toHaveLength(1);
  });

  test('refreshes Worker resolution after preset apply while preserving the exception', async () => {
    const response = {
      ...workerResponse(),
      values: { bdui_url: 'http://exception:3000' }
    };
    const { root, pane, calls } = mount({
      presets: PRESETS,
      transport: async (/** @type {string} */ type) =>
        type === 'apply-impl-preset-global'
          ? { ...response, applied: true, queue: queueRow() }
          : response
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';
    preset.dispatchEvent(new Event('change'));

    el(root, '[data-preset-apply-global]').click();
    await finishRefresh();
    pane.render('session');

    expect(payloadsOf(calls, 'get-session-defaults')).toHaveLength(2);
    expect(pane.sessionDraft().bdui_url).toBe('http://exception:3000');
    expect(payloadsOf(calls, 'set-session-defaults')).toHaveLength(0);
  });

  test.each([false, true])(
    'sends null for empty save or clear button %s',
    async (clear) => {
      const { root, pane, calls } = mount({
        section: 'session',
        transport: async () => workerResponse()
      });
      await pane.load();
      if (!clear) {
        typeCommon(root, '');
      }

      el(
        root,
        clear ? '[data-worker-common-clear]' : '[data-worker-common-save]'
      ).click();
      await finishRefresh();

      expect(payloadsOf(calls, 'set-worker-url-common')).toEqual([
        { value: null, expected_revision: 'original' }
      ]);
    }
  );

  test('refuses an invalid common input before sending', async () => {
    const { root, pane, calls } = mount({
      section: 'session',
      transport: async () => workerResponse()
    });
    await pane.load();
    typeCommon(root, 'http://host/path');

    el(root, '[data-worker-common-save]').click();
    await finishRefresh();

    expect(payloadsOf(calls, 'set-worker-url-common')).toHaveLength(0);
    expect(
      el(root, '[data-worker-common-input]').getAttribute('aria-invalid')
    ).toBe('true');
  });
});
describe('integrated Worker address repairs', () => {
  test('resets a reused connection pane before editing another workspace', async () => {
    let response = workerResponse();
    let reject_save = true;
    const { root, pane, calls } = mount({
      section: 'session',
      transport: async (
        /** @type {string} */ type,
        /** @type {any} */ payload
      ) => {
        if (type === 'set-session-defaults') {
          if (reject_save) {
            throw new Error('write failed');
          }
          return { ...response, values: payload.values };
        }
        return response;
      }
    });
    await pane.load();
    const exception = /** @type {HTMLInputElement} */ (
      el(root, '[data-key="bdui_url"]')
    );
    exception.value = 'http://old-draft:3000';
    exception.dispatchEvent(new Event('change'));
    await finishRefresh();
    typeCommon(root, 'http://old-common-draft:3000');
    response = workerResponse('http://new-common:3000', 'new-revision');
    reject_save = false;

    await pane.load();
    el(root, 'button[data-mode="fast_track"]').click();
    await finishRefresh();
    el(root, '[data-worker-common-save]').click();
    await finishRefresh();

    expect(payloadsOf(calls, 'set-session-defaults')[1]).toEqual({
      values: { workflow_mode: 'fast_track' }
    });
    expect(payloadsOf(calls, 'set-worker-url-common')).toEqual([
      { value: 'http://new-common:3000', expected_revision: 'new-revision' }
    ]);
    expect(pane.sessionDraft()).not.toHaveProperty('bdui_url');
  });

  test('keeps the new workspace empty when its initial read fails', async () => {
    let fail = false;
    const { pane } = mount({
      section: 'session',
      transport: async () => {
        if (fail) {
          throw new Error('read failed');
        }
        return { ...workerResponse(), values: { bdui_url: 'http://old:3000' } };
      }
    });
    await pane.load();
    fail = true;

    await pane.load();

    expect(pane.sessionDraft()).toEqual({});
  });

  test('drops queued saves from the previous load generation', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    const { root, pane, calls } = mount({
      section: 'session',
      transport: async (/** @type {string} */ type) =>
        type === 'set-session-defaults'
          ? await new Promise((resolve) => {
              release = resolve;
            })
          : workerResponse()
    });
    await pane.load();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-key="bdui_url"]')
    );
    input.value = 'http://old:3000';
    input.dispatchEvent(new Event('change'));
    await finishRefresh();
    el(root, 'button[data-mode="fast_track"]').click();

    await pane.load();
    release({ ...workerResponse(), values: { bdui_url: 'http://old:3000' } });
    await finishRefresh();

    expect(payloadsOf(calls, 'set-session-defaults')).toHaveLength(1);
    expect(pane.sessionDraft()).toEqual({});
  });

  test.each([false, true])(
    'retains invalid-value deletion only while save fails: %s',
    async (fail_first) => {
      let writes = 0;
      const { root, pane, calls } = mount({
        section: 'session',
        transport: async (
          /** @type {string} */ type,
          /** @type {any} */ payload
        ) => {
          if (type === 'set-session-defaults') {
            if (++writes === 1 && fail_first) {
              throw new Error('write failed');
            }
            return {
              ...workerResponse(),
              values: payload.values.workflow_mode
                ? { workflow_mode: payload.values.workflow_mode }
                : {}
            };
          }
          return { ...workerResponse(), warnings: ['invalid_value:bdui_url'] };
        }
      });
      await pane.load();

      const input = /** @type {HTMLInputElement} */ (
        el(root, '[data-key="bdui_url"]')
      );
      input.value = '';
      input.dispatchEvent(new Event('change'));
      await finishRefresh();
      el(root, 'button[data-mode="fast_track"]').click();
      await finishRefresh();

      const saves = payloadsOf(calls, 'set-session-defaults');
      expect(saves[0].values).toEqual({ bdui_url: null });
      expect(saves[1].values).toEqual({
        workflow_mode: 'fast_track',
        ...(fail_first ? { bdui_url: null } : {})
      });
    }
  );

  test('replaces an outstanding invalid-value deletion with a valid address edit', async () => {
    const { root, pane, calls } = mount({
      section: 'session',
      transport: async (/** @type {string} */ type) => {
        if (type === 'set-session-defaults') {
          throw new Error('write failed');
        }
        return { ...workerResponse(), warnings: ['invalid_value:bdui_url'] };
      }
    });
    await pane.load();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-key="bdui_url"]')
    );
    input.dispatchEvent(new Event('change'));
    await finishRefresh();

    input.value = 'http://fixed:3000';
    input.dispatchEvent(new Event('change'));
    await finishRefresh();

    expect(payloadsOf(calls, 'set-session-defaults')[1].values).toEqual({
      bdui_url: 'http://fixed:3000'
    });
  });

  test('propagates a common revision conflict through the monitor transport', async () => {
    /** @type {any} */
    let monitor_transport;
    const client = {
      send: vi.fn(async (/** @type {string} */ type) => {
        if (type === 'set-worker-url-common') {
          throw { code: 'revision_conflict' };
        }
        if (type === 'list-workspaces') {
          return { workspaces: [], current: null };
        }
        return workerResponse();
      }),
      on: () => () => {},
      onConnection: () => () => {},
      close: () => {},
      getState: () => 'open'
    };
    vi.doMock('../../ws.js', () => ({ createWsClient: () => client }));
    vi.doMock('../monitor/index.js', async () => {
      const actual = await vi.importActual('../monitor/index.js');
      return {
        ...actual,
        createMonitorView: (
          /** @type {HTMLElement} */ _root,
          /** @type {any} */ options
        ) => {
          monitor_transport = options.transport;
          return { load() {}, pause() {} };
        }
      };
    });
    try {
      const { bootstrap } = await import('../../main.js');
      const shell = document.createElement('main');
      document.body.appendChild(shell);
      bootstrap(shell);
      await finishRefresh();
      expect(monitor_transport).toBeTypeOf('function');
      const { root, pane, notify } = mount({
        root_dir: REPO_B,
        section: 'session',
        transport: monitor_transport
      });
      await pane.load();
      typeCommon(root, 'http://draft:3000');

      el(root, '[data-worker-common-save]').click();
      await finishRefresh();

      expect(notify).toHaveBeenCalledWith(
        '다른 창에서 변경됨 — 새로고침 후 다시 시도'
      );
      expect(
        client.send.mock.calls.filter(
          ([type]) => type === 'set-worker-url-common'
        )
      ).toHaveLength(1);
    } finally {
      vi.doUnmock('../../ws.js');
      vi.doUnmock('../monitor/index.js');
    }
  });
});
