import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createLimitPolicySettingsStore } from '../../data/limit-policy-settings-store.js';
import { PINNED_EMPTY_WARNING } from './active-login-status.js';
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

/** A general preset that already stands in the queue, so its diff is empty. */
const SAME_VALUE_PRESET = {
  revision: 4,
  presets: [
    {
      id: 'p1',
      name: '같은 값',
      applies_to: 'general',
      settings: { orchestration_model: 'opus' }
    }
  ]
};

/** One preset per profile, so each tab's bar has exactly one to offer. */
const BOTH_PROFILE_PRESETS = {
  revision: 4,
  presets: [
    {
      id: 'p1',
      name: '위임',
      applies_to: 'general',
      settings: { impl_runtime: 'codex', impl_model: 'sol' }
    },
    {
      id: 'q1',
      name: 'quick fix 기본',
      applies_to: 'quick_fix',
      settings: { orchestration_model: 'opus' }
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
 * @param {{ root_dir?: string|null, queue?: any, values?: Record<string, string|boolean>, transport?: any, presets?: any, section?: string, disabled_models?: string[], codexCreditStore?: any, limitPolicySettingsStore?: any, onOpenActiveAccount?: () => void }} [options]
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
    modelVisibilityStore: {
      get: () =>
        options.disabled_models
          ? {
              revision: 1,
              disabled_models: options.disabled_models,
              runners: {}
            }
          : null
    },
    codexCreditStore: options.codexCreditStore,
    limitPolicySettingsStore: options.limitPolicySettingsStore,
    onOpenActiveAccount: options.onOpenActiveAccount,
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

describe('execution sub tabs', () => {
  test('renders execution sub tabs with the worker tab first', async () => {
    const { root, pane } = mount();

    await pane.load();

    expect(
      Array.from(root.querySelectorAll('[data-execution-subtab]'), (button) =>
        button.textContent?.trim()
      )
    ).toEqual(['워커', 'quick fix', '세션 리뷰', 'Hermes 세션']);
    expect(
      el(root, '[data-execution-subtab="worker"]').getAttribute('aria-pressed')
    ).toBe('true');
  });

  test('renders spec and plan review rows only in the session review sub tab', async () => {
    const { root, pane } = mount();
    await pane.load();
    expect(root.querySelector('[data-key="spec_review_model"]')).toBe(null);
    qf(root);
    expect(root.querySelector('[data-key="plan_review_model"]')).toBe(null);

    el(root, '[data-execution-subtab="session_review"]').click();

    expect(root.querySelector('[data-key="spec_review_model"]')).not.toBe(null);
    expect(root.querySelector('[data-key="plan_review_model"]')).not.toBe(null);
    expect(root.querySelector('[data-key="impl_review_model"]')).toBe(null);
    expect(root.querySelector('[data-preset-bar]')).toBe(null);
    expect(root.textContent).toContain(
      'Worker는 이 두 리뷰를 돌리지 않습니다 · 이 저장소에서 여는 세션이 씁니다'
    );
  });

  test('keeps unsent input across a sub tab switch', async () => {
    const { root, pane } = mount();
    await pane.load();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '[aria-label="프리셋 이름"]')
    );
    input.value = '보내지 않은 이름';
    input.dispatchEvent(new Event('input'));

    qf(root);
    el(root, '[data-execution-subtab="session_review"]').click();
    el(root, '[data-execution-subtab="worker"]').click();

    expect(
      /** @type {HTMLInputElement} */ (el(root, '[aria-label="프리셋 이름"]'))
        .value
    ).toBe('보내지 않은 이름');
  });
});

/**
 * @param {HTMLElement} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(root, selector) {
  return /** @type {HTMLElement} */ (root.querySelector(selector));
}

/**
 * The `실행` tab's folded quick fix block.
 *
 * @param {HTMLElement} root
 * @returns {HTMLElement}
 */
function qf(root) {
  el(root, '[data-execution-subtab="quick_fix"]').click();
  return el(root, '[data-exec-block="quick_fix"]');
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

describe('createExecutionPane model visibility (UI-ooc0 §4.2)', () => {
  const TWO_CLAUDE_MODELS = {
    ...CATALOG,
    runners: {
      ...CATALOG.runners,
      claude: {
        models: {
          opus: { id: 'opus', efforts: ['low', 'high'] },
          sonnet: { id: 'sonnet', efforts: ['low', 'high'] }
        }
      }
    },
    model_index: { opus: 'claude', sonnet: 'claude', sol: 'codex' }
  };

  /**
   * @param {HTMLElement} root
   * @param {string} key
   * @returns {HTMLOptionElement[]}
   */
  function optionsOf(root, key) {
    return Array.from(
      /** @type {HTMLSelectElement} */ (el(root, `select[data-key="${key}"]`))
        .options
    );
  }

  test('omits a disabled model from the worker-tab implementation choices', async () => {
    const { root, pane } = mount({
      queue: queueRow({ runner_catalog: TWO_CLAUDE_MODELS }),
      disabled_models: ['sonnet']
    });

    await pane.load();

    const values = optionsOf(root, 'impl_model').map((option) => option.value);
    expect(values).toContain('opus');
    expect(values).not.toContain('sonnet');
  });

  test('keeps a stored disabled model selected with the (비활성) label', async () => {
    const { root, pane } = mount({
      queue: queueRow({ runner_catalog: TWO_CLAUDE_MODELS }),
      values: { impl_runtime: 'claude', impl_model: 'sonnet' },
      disabled_models: ['sonnet']
    });

    await pane.load();

    const stored = optionsOf(root, 'impl_model').find(
      (option) => option.value === 'sonnet'
    );
    expect(stored?.textContent?.trim()).toBe('sonnet (비활성)');
    expect(stored?.selected).toBe(true);
  });

  test('omits codex from a review row when sol is disabled', async () => {
    const execution_defaults = structuredClone(EXECUTION_DEFAULTS);
    execution_defaults.session.review.reviewers.codex.model = 'sol';
    const { root, pane } = mount({
      queue: queueRow({ execution_defaults }),
      disabled_models: ['sol']
    });

    await pane.load();
    el(root, '[data-execution-subtab="session_review"]').click();

    const values = optionsOf(root, 'spec_review_model').map(
      (option) => option.value
    );
    expect(values).toContain('fable');
    expect(values).not.toContain('codex');
  });
});

describe('createExecutionPane quick fix tab (UI-uohc §6.1)', () => {
  test('draws the orchestration rows and the dispatch row on main', async () => {
    const { root, pane } = mount();

    await pane.load();

    const rows = Array.from(qf(root).querySelectorAll('select[data-key]'));

    expect(rows.map((row) => row.getAttribute('data-key'))).toEqual([
      'quick_fix_orchestration_model',
      'quick_fix_orchestration_effort',
      'quick_fix_impl_dispatch',
      'quick_fix_impl_review_model',
      'quick_fix_impl_review_effort'
    ]);
  });

  test('splits its rows into an orchestration and an impl group', async () => {
    const { root, pane } = mount();

    await pane.load();

    expect(
      Array.from(qf(root).querySelectorAll('[data-quick-fix-group]'), (node) =>
        node.getAttribute('data-quick-fix-group')
      )
    ).toEqual(['orchestration', 'impl']);
  });

  test('names the main-session hint instead of the delegation rows', async () => {
    const { root, pane } = mount();

    await pane.load();

    expect(el(qf(root), '[data-quick-fix-main-hint]').textContent).toContain(
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

    const rows = Array.from(qf(root).querySelectorAll('select[data-key]'));

    expect(rows.map((row) => row.getAttribute('data-key'))).toEqual([
      'quick_fix_orchestration_model',
      'quick_fix_orchestration_effort',
      'quick_fix_impl_dispatch',
      'quick_fix_impl_runtime',
      'quick_fix_impl_model',
      'quick_fix_impl_effort',
      'quick_fix_impl_speed',
      'quick_fix_impl_review_model',
      'quick_fix_impl_review_effort'
    ]);
  });

  test('removes the delegation rows from the DOM on a switch back to main', async () => {
    const { root, pane } = mount({
      values: {
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'codex'
      }
    });
    await pane.load();
    const dispatch = /** @type {HTMLSelectElement} */ (
      el(qf(root), 'select[data-key="quick_fix_impl_dispatch"]')
    );

    dispatch.value = 'main';
    dispatch.dispatchEvent(new Event('change'));

    expect(el(qf(root), 'select[data-key="quick_fix_impl_runtime"]')).toBe(
      null
    );
    expect(el(qf(root), 'select[data-key="quick_fix_impl_model"]')).toBe(null);
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
      qf(root).querySelector('select[data-key="quick_fix_impl_speed"]')
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
      el(qf(root), 'select[data-key="quick_fix_impl_runtime"]')
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
      el(qf(root), 'select[data-key="quick_fix_impl_model"]')
    );
    expect(model.options[0].textContent).toContain(
      '기본값 사용 — sol (비호환)'
    );
  });

  test('keeps every quick_fix row out of the worker block', async () => {
    const { root, pane } = mount();

    await pane.load();

    const worker = el(root, '[data-exec-block="worker"]');
    expect(worker.querySelector('[data-quick-fix-group]')).toBe(null);
    expect(
      Array.from(worker.querySelectorAll('select[data-key]')).some((row) =>
        String(row.getAttribute('data-key')).startsWith('quick_fix_')
      )
    ).toBe(false);
  });

  test('renders no quick fix fold', async () => {
    const { root, pane } = mount();

    await pane.load();

    qf(root);

    expect(root.querySelector('details[data-exec-block="quick_fix"]')).toBe(
      null
    );
    expect(root.querySelector('[data-quick-fix-summary]')).toBe(null);
  });

  test('renders one implementation review row in the quick fix sub tab', async () => {
    const { root, pane } = mount({
      queue: queueRow({
        quick_fix_orchestration_model: 'sol',
        quick_fix_orchestration_effort: 'medium'
      })
    });

    await pane.load();

    const block = qf(root);

    expect(
      block.querySelectorAll('[data-key="quick_fix_impl_review_model"]')
    ).toHaveLength(1);
    expect(block.querySelector('[data-key="spec_review_model"]')).toBe(null);
  });

  test('keeps the selected execution sub tab across a re-render', async () => {
    const { root, pane } = mount();
    await pane.load();
    qf(root);

    pane.render();

    expect(
      el(root, '[data-execution-subtab="quick_fix"]').getAttribute(
        'aria-pressed'
      )
    ).toBe('true');
  });

  test('locks its rows when the server takes no quick_fix values', async () => {
    const old_queue = queueRow();
    Reflect.deleteProperty(old_queue, 'quick_fix_orchestration_model');
    const { root, pane } = mount({ queue: old_queue });

    await pane.load();

    const dispatch = /** @type {HTMLSelectElement} */ (
      el(qf(root), 'select[data-key="quick_fix_impl_dispatch"]')
    );
    expect(dispatch.disabled).toBe(true);
    expect(
      el(qf(root), '[data-quick-fix-group="impl"]').getAttribute('title')
    ).toBe('서버가 quick_fix 레인을 지원하지 않습니다');
  });
});

describe('createExecutionPane preset strip', () => {
  test('offers one 적용 button per block and no lane tabs', async () => {
    const { root, pane } = mount({ presets: PRESETS });

    await pane.load();

    expect(
      Array.from(root.querySelectorAll('[data-preset-apply-global]'), (node) =>
        node.closest('[data-exec-block]')?.getAttribute('data-exec-block')
      )
    ).toEqual(['worker']);
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

  test('refuses a quick fix apply against a server that takes no quick_fix values', async () => {
    const old_queue = queueRow();
    Reflect.deleteProperty(old_queue, 'quick_fix_orchestration_model');
    const { root, pane } = mount({
      queue: old_queue,
      presets: BOTH_PROFILE_PRESETS
    });

    await pane.load();

    const apply = /** @type {HTMLButtonElement} */ (
      el(qf(root), '[data-preset-apply-global]')
    );
    expect(apply.disabled).toBe(true);
    expect(apply.title).toBe('서버가 quick_fix 값을 받지 않습니다');
  });

  test('locks the whole quick fix bar on a server that takes no quick_fix values', async () => {
    const old_queue = queueRow();
    Reflect.deleteProperty(old_queue, 'quick_fix_orchestration_model');
    const { root, pane } = mount({
      queue: old_queue,
      presets: BOTH_PROFILE_PRESETS
    });

    await pane.load();

    const locked = [
      el(qf(root), '[aria-label="실행 프리셋"]'),
      el(qf(root), '[aria-label="프리셋 이름"]'),
      el(qf(root), '[data-preset-save]'),
      el(qf(root), '[data-preset-delete]')
    ].map((control) => ({
      disabled: /** @type {HTMLButtonElement} */ (control).disabled,
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

  test('keeps the general bar live on a server that takes no quick_fix values', async () => {
    const old_queue = queueRow();
    Reflect.deleteProperty(old_queue, 'quick_fix_orchestration_model');
    const { root, pane } = mount({ queue: old_queue, presets: PRESETS });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';

    preset.dispatchEvent(new Event('change'));

    expect(
      /** @type {HTMLButtonElement} */ (el(root, '[data-preset-apply-global]'))
        .disabled
    ).toBe(false);
  });

  test('applies a preset whose values already stand when no record names it', async () => {
    const { root, pane } = mount({
      queue: queueRow({ orchestration_model: 'opus' }),
      presets: SAME_VALUE_PRESET
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';

    preset.dispatchEvent(new Event('change'));

    expect(
      /** @type {HTMLButtonElement} */ (el(root, '[data-preset-apply-global]'))
        .disabled
    ).toBe(false);
  });

  test('locks 적용 once the record names the preset its values already match', async () => {
    const { root, pane } = mount({
      queue: queueRow({
        orchestration_model: 'opus',
        applied_exec_preset: { id: 'p1', name: '같은 값', revision: 4 }
      }),
      presets: SAME_VALUE_PRESET
    });
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
    expect(apply.title).toBe(
      '이 프리셋이 이미 적용되어 있고 바뀔 값도 없습니다'
    );
  });

  test('reads the quick fix record rather than the general one on its own tab', async () => {
    const { root, pane } = mount({
      queue: queueRow({
        quick_fix_orchestration_model: 'opus',
        applied_exec_preset: { id: 'q1' }
      }),
      presets: {
        revision: 4,
        presets: [
          {
            id: 'q1',
            name: 'quick fix 기본',
            applies_to: 'quick_fix',
            settings: { orchestration_model: 'opus' }
          }
        ]
      }
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(qf(root), '[aria-label="실행 프리셋"]')
    );
    preset.value = 'q1';

    preset.dispatchEvent(new Event('change'));

    expect(
      /** @type {HTMLButtonElement} */ (
        el(qf(root), '[data-preset-apply-global]')
      ).disabled
    ).toBe(false);
  });

  test('says the preset list is server-wide on the save control', async () => {
    const { root, pane } = mount({ presets: PRESETS });

    await pane.load();

    expect(el(root, '[data-preset-save]').getAttribute('title')).toContain(
      '프리셋 목록은 서버 전역이라 저장·삭제가 모든 저장소의 목록을 바꿉니다'
    );
  });

  test('saves the quick fix tab rows under canonical key names', async () => {
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
      el(qf(root), '[aria-label="프리셋 이름"]')
    );
    name.value = '빠른 수정';
    name.dispatchEvent(new Event('input'));

    el(qf(root), '[data-preset-save]').click();
    await settle();

    expect(payloadsOf(calls, 'impl-preset-create')[0].settings).toEqual({
      orchestration_model: 'opus',
      impl_dispatch: 'delegated',
      impl_runtime: 'codex'
    });
  });

  test('names the quick fix profile on the preset it creates', async () => {
    const { root, pane, calls } = mount({
      queue: queueRow({ quick_fix_orchestration_model: 'opus' }),
      transport: async () => ({ applied: true, presets: [] })
    });
    await pane.load();
    const name = /** @type {HTMLInputElement} */ (
      el(qf(root), '[aria-label="프리셋 이름"]')
    );
    name.value = '빠른 수정';
    name.dispatchEvent(new Event('input'));

    el(qf(root), '[data-preset-save]').click();
    await settle();

    expect(payloadsOf(calls, 'impl-preset-create')[0].applies_to).toBe(
      'quick_fix'
    );
  });

  test('names the general profile on a preset saved from the worker tab', async () => {
    const { root, pane, calls } = mount({
      queue: queueRow({ orchestration_model: 'opus' }),
      transport: async () => ({ applied: true, presets: [] })
    });
    await pane.load();
    const name = /** @type {HTMLInputElement} */ (
      el(root, '[aria-label="프리셋 이름"]')
    );
    name.value = '일반';
    name.dispatchEvent(new Event('input'));

    el(root, '[data-preset-save]').click();
    await settle();

    expect(payloadsOf(calls, 'impl-preset-create')[0].applies_to).toBe(
      'general'
    );
  });

  test('keeps the quick fix rows out of a general preset it saves', async () => {
    const { root, pane, calls } = mount({
      queue: queueRow({
        orchestration_model: 'opus',
        quick_fix_orchestration_model: 'sol'
      }),
      transport: async () => ({ applied: true, presets: [] })
    });
    await pane.load();
    const name = /** @type {HTMLInputElement} */ (
      el(root, '[aria-label="프리셋 이름"]')
    );
    name.value = '일반';
    name.dispatchEvent(new Event('input'));

    el(root, '[data-preset-save]').click();
    await settle();

    expect(payloadsOf(calls, 'impl-preset-create')[0].settings).toEqual({
      orchestration_model: 'opus'
    });
  });

  test('previews a key the preset omits as cleared', async () => {
    const { root, pane } = mount({
      queue: queueRow({ orchestration_model: 'opus' }),
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

  test('lists only the general presets in the worker tab bar', async () => {
    const { root, pane } = mount({ presets: BOTH_PROFILE_PRESETS });

    await pane.load();

    expect(
      Array.from(
        el(root, '[aria-label="실행 프리셋"]').querySelectorAll('option'),
        (node) => node.textContent?.trim()
      )
    ).toEqual(['실행 프리셋…', '위임']);
  });

  test('lists only the quick_fix presets in the quick fix tab bar', async () => {
    const { root, pane } = mount({
      presets: BOTH_PROFILE_PRESETS
    });

    await pane.load();

    expect(
      Array.from(
        el(qf(root), '[aria-label="실행 프리셋"]').querySelectorAll('option'),
        (node) => node.textContent?.trim()
      )
    ).toEqual(['실행 프리셋…', 'quick fix 기본']);
  });

  test('keeps one block selection out of the other block bar', async () => {
    const { root, pane } = mount({ presets: BOTH_PROFILE_PRESETS });
    await pane.load();
    const worker_bar = /** @type {HTMLSelectElement} */ (
      el(root, '[data-exec-block="worker"] [aria-label="실행 프리셋"]')
    );
    worker_bar.value = 'p1';

    worker_bar.dispatchEvent(new Event('change'));

    expect(
      /** @type {HTMLSelectElement} */ (
        el(qf(root), '[aria-label="실행 프리셋"]')
      ).value
    ).toBe('');
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

    const effort = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_review_effort"]')
    );
    effort.value = 'high';
    effort.dispatchEvent(new Event('change'));
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
    el(root, '[data-execution-subtab="session_review"]').click();

    expect(root.querySelector('select[data-key="spec_review_speed"]')).toBe(
      null
    );
  });

  test('draws a review gate speed row for a codex reviewer', async () => {
    const { root, pane } = mount({ values: { spec_review_model: 'codex' } });

    await pane.load();
    el(root, '[data-execution-subtab="session_review"]').click();

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

  test('leaves the mode, address, main sync and accounts off the execution section', async () => {
    const { root, pane } = mount();

    await pane.load();

    expect([
      root.querySelector('[data-mode]'),
      root.querySelector('[data-key="bdui_url"]'),
      root.querySelector('[data-key="base_sync_accept_local_commits"]'),
      root.querySelector('[data-exec-accounts-group]')
    ]).toEqual([null, null, null, null]);
  });

  test('draws the worker block before the quick fix block on the execution section', async () => {
    const { root, pane } = mount();

    await pane.load();

    expect(
      Array.from(root.querySelectorAll('[data-exec-block]'), (node) =>
        node.getAttribute('data-exec-block')
      )
    ).toEqual(['worker']);
  });

  test('ignores a section id the pane does not draw', async () => {
    const { root, pane } = mount();
    await pane.load();

    pane.render('session');

    expect(root.querySelector('[data-exec-block="worker"]')).not.toBe(null);
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

  test.each(['claude', 'codex'])(
    'orders the four %s Worker account rows like the active login tab',
    async (runner) => {
      const { root, pane } = mount({ section: 'account' });

      await pane.load();

      const group = /** @type {HTMLElement} */ (
        root.querySelector(`[data-exec-accounts-group="${runner}"]`)
      );
      expect(
        Array.from(
          group.querySelectorAll('.settings-dialog__row-label'),
          (node) => node.textContent.trim()
        )
      ).toEqual(['자동 전환', 'default 계정', '전환 허용 계정', '옮기는 시점']);
    }
  );

  test('renders both provider selects in their own group', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane } = mount({ section: 'account' });

    await pane.load();

    expect(root.querySelector('[data-exec-accounts-group]')).not.toBe(null);
    expect(labels(accountSelect(root, 'claude_account'))).toEqual([
      '비움 — 활성 계정 따름 (지금 active@example.com)',
      'repo@example.com (team)',
      'active@example.com'
    ]);
    expect(labels(accountSelect(root, 'codex_account'))).toEqual([
      '비움 — 활성 계정 따름 (지금 codex@example.com)',
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
      '비움 — 활성 계정 따름 (지금 확인 불가)',
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
      '1. gone@example.com (목록에 없음)'
    );
  });
});
/** Wait for asynchronous refresh rendering, not a fixed count of microtasks. */
async function finishRefresh() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

/**
 * @param {HTMLElement} root
 * @param {string} key
 * @param {string} value
 */
function pick(root, key, value) {
  const select = /** @type {HTMLSelectElement} */ (
    el(root, `select[data-key="${key}"]`)
  );
  select.value = value;
  select.dispatchEvent(new Event('change'));
}

describe('createExecutionPane session-defaults lifecycle', () => {
  test('adopts a newer readback on focus while no edit is pending', async () => {
    /** @type {Record<string, string>} */
    let values = { impl_speed: 'default' };
    const { pane } = mount({
      transport: async () => ({ values, warnings: [] })
    });
    await pane.load();
    values = { impl_speed: 'fast' };

    window.dispatchEvent(new Event('focus'));
    await finishRefresh();

    expect(pane.sessionDraft()).toEqual({ impl_speed: 'fast' });
  });

  test('drops an older load response after a new generation loads', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    let queries = 0;
    const { pane } = mount({
      transport: async (/** @type {string} */ type) => {
        if (type === 'get-session-defaults' && ++queries === 1) {
          return await new Promise((resolve) => {
            release = resolve;
          });
        }
        return { values: { impl_runtime: 'claude' }, warnings: [] };
      }
    });
    const old_load = pane.load();

    await pane.load();
    release({ values: { impl_runtime: 'codex' }, warnings: [] });
    await old_load;

    expect(pane.sessionDraft()).toEqual({ impl_runtime: 'claude' });
  });

  test('drops another root response after its pane is destroyed', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    const old = mount({
      root_dir: '/old',
      transport: async (/** @type {string} */ type) =>
        type === 'get-session-defaults'
          ? await new Promise((resolve) => {
              release = resolve;
            })
          : {}
    });
    const old_load = old.pane.load();
    old.pane.destroy();

    release({ values: { impl_runtime: 'codex' }, warnings: [] });
    await old_load;

    expect(old.root.textContent).toBe('');
  });

  test('removes the focus refresh listener on destroy', async () => {
    const { pane, calls } = mount();
    await pane.load();
    pane.destroy();

    window.dispatchEvent(new Event('focus'));
    await finishRefresh();

    expect(payloadsOf(calls, 'get-session-defaults')).toHaveLength(1);
  });

  test('keeps the new workspace empty when its initial read fails', async () => {
    let fail = false;
    const { pane } = mount({
      transport: async () => {
        if (fail) {
          throw new Error('read failed');
        }
        return { values: { impl_runtime: 'codex' }, warnings: [] };
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
      values: { impl_runtime: 'codex' },
      transport: async (/** @type {string} */ type) =>
        type === 'set-session-defaults'
          ? await new Promise((resolve) => {
              release = resolve;
            })
          : { values: { impl_runtime: 'codex' }, warnings: [] }
    });
    await pane.load();
    pick(root, 'impl_speed', 'fast');
    await finishRefresh();
    pick(root, 'impl_review_effort', 'high');

    await pane.load();
    release({ values: { impl_speed: 'fast' }, warnings: [] });
    await finishRefresh();

    expect(payloadsOf(calls, 'set-session-defaults')).toHaveLength(1);
    expect(pane.sessionDraft()).toEqual({ impl_runtime: 'codex' });
  });

  test('ignores an obsolete Worker address key in every save', async () => {
    const { root, pane, calls } = mount({
      values: { bdui_url: 'http://exception:3000', impl_runtime: 'codex' }
    });
    await pane.load();

    pick(root, 'impl_speed', 'fast');
    await finishRefresh();

    expect(payloadsOf(calls, 'set-session-defaults')).toEqual([
      { values: { impl_speed: 'fast' } }
    ]);
  });
});

describe('createExecutionPane codex switch order and credits (UI-9y1k §4.5)', () => {
  const CODEX_THREE = {
    accounts: [
      { key: 'c1', number: 1, email: 'one@example.com', status: 'ok' },
      { key: 'c2', number: 2, email: 'two@example.com', status: 'ok' },
      { key: 'c3', number: 3, email: 'three@example.com', status: 'ok' }
    ]
  };
  const CLAUDE_ONE = {
    accounts: [
      {
        key: 'repo@example.com',
        email: 'repo@example.com',
        active: true,
        status: 'ok'
      }
    ]
  };

  /**
   * @param {string[]} codex_accounts
   */
  function orderedQueue(codex_accounts) {
    return queueRow({
      provider_limit_policy: {
        claude: { mode: 'switch', accounts: [], preempt_pct: null },
        codex: { mode: 'switch', accounts: codex_accounts, preempt_pct: null }
      }
    });
  }

  /**
   * A credit store holding one snapshot, writable like the real one.
   *
   * @param {Record<string, any>} [accounts]
   */
  function creditStore(accounts = {}) {
    /** @type {any} */
    let state = {
      revision: 2,
      date: '2026-10-19',
      default_daily_cap: 1000,
      accounts
    };
    /** @type {Set<() => void>} */
    const listeners = new Set();
    return {
      get: () => state,
      /** @param {any} next */
      set: (next) => {
        state = next;
        for (const listener of listeners) {
          listener();
        }
      },
      /** @param {() => void} listener */
      subscribe: (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
      }
    };
  }

  /**
   * A transport that answers policy saves with the saved order and credit
   * saves with the patched snapshot.
   *
   * @param {ReturnType<typeof creditStore>} [store]
   */
  function echoTransport(store) {
    return async (/** @type {string} */ type, /** @type {any} */ payload) => {
      if (type === 'worker-provider-limit-policy-set') {
        return {
          applied: true,
          conflict: false,
          queue: orderedQueue(payload.patch.accounts)
        };
      }
      if (type === 'codex-credits-set' && store) {
        const current = store.get();
        const accounts = { ...current.accounts };
        for (const [key, patch] of Object.entries(payload.accounts)) {
          accounts[key] = {
            allow_credits: false,
            daily_cap: 1000,
            consumed_today: 0,
            ...accounts[key],
            .../** @type {any} */ (patch)
          };
        }
        return {
          ok: true,
          snapshot: { ...current, revision: current.revision + 1, accounts }
        };
      }
      return { values: {}, warnings: [] };
    };
  }

  /**
   * @param {HTMLElement} root
   * @returns {string[]}
   */
  function orderOf(root) {
    return Array.from(root.querySelectorAll('[data-limit-order-item]')).map(
      (node) => String(node.getAttribute('data-limit-order-item'))
    );
  }

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (/** @type {string} */ url) => ({
        ok: true,
        json: async () => (url.includes('claude') ? CLAUDE_ONE : CODEX_THREE)
      }))
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  test('lists the allowed codex accounts in the stored order', async () => {
    const { root, pane } = mount({
      section: 'account',
      queue: orderedQueue(['c3', 'c1'])
    });

    await pane.load();

    expect(orderOf(root)).toEqual(['c3', 'c1']);
  });

  test('saves the whole reordered list when an account moves up', async () => {
    const { root, pane, calls } = mount({
      section: 'account',
      queue: orderedQueue(['c3', 'c1']),
      transport: echoTransport()
    });
    await pane.load();

    el(root, '[data-limit-move="up"][data-limit-move-account="c1"]').click();
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        runner: 'codex',
        patch: { accounts: ['c1', 'c3'] },
        expected_revision: 3
      }
    ]);
  });

  test('reopens on the saved order', async () => {
    const first = mount({
      section: 'account',
      queue: orderedQueue(['c3', 'c1']),
      transport: echoTransport()
    });
    await first.pane.load();
    el(
      first.root,
      '[data-limit-move="down"][data-limit-move-account="c3"]'
    ).click();
    await settle();

    const reopened = mount({ section: 'account', queue: first.queue() });
    await reopened.pane.load();

    expect(orderOf(reopened.root)).toEqual(['c1', 'c3']);
  });

  test('saves the whole reordered claude list when an account moves up', async () => {
    const { root, pane, calls } = mount({
      section: 'account',
      queue: queueRow({
        provider_limit_policy: {
          claude: {
            mode: 'switch',
            accounts: ['repo@example.com', 'next@example.com'],
            preempt_pct: null
          },
          codex: { mode: 'switch', accounts: [], preempt_pct: null }
        }
      }),
      transport: echoTransport()
    });
    await pane.load();

    el(
      root,
      '[data-limit-accounts="claude"] [data-limit-move="up"][data-limit-move-account="next@example.com"]'
    ).click();
    await settle();

    expect(payloadsOf(calls, 'worker-provider-limit-policy-set')).toEqual([
      {
        runner: 'claude',
        patch: { accounts: ['next@example.com', 'repo@example.com'] },
        expected_revision: 3
      }
    ]);
  });

  test('saves the credit switch as a global setting', async () => {
    const store = creditStore();
    const { root, pane, calls } = mount({
      section: 'account',
      codexCreditStore: store,
      transport: echoTransport(store)
    });
    await pane.load();

    const box = /** @type {HTMLInputElement} */ (
      el(root, '[data-codex-credit-allow="c3"]')
    );
    box.checked = true;
    box.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'codex-credits-set')).toEqual([
      { expected_revision: 2, accounts: { c3: { allow_credits: true } } }
    ]);
  });

  test('saves a changed daily cap', async () => {
    const store = creditStore();
    const { root, pane, calls } = mount({
      section: 'account',
      codexCreditStore: store,
      transport: echoTransport(store)
    });
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-codex-credit-cap="c3"]')
    );
    input.value = '250';
    input.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'codex-credits-set')).toEqual([
      { expected_revision: 2, accounts: { c3: { daily_cap: 250 } } }
    ]);
  });

  test('shows the saved credit values when reopened', async () => {
    const store = creditStore();
    const first = mount({
      section: 'account',
      codexCreditStore: store,
      transport: echoTransport(store)
    });
    await first.pane.load();
    const box = /** @type {HTMLInputElement} */ (
      el(first.root, '[data-codex-credit-allow="c3"]')
    );
    box.checked = true;
    box.dispatchEvent(new Event('change'));
    await settle();

    const reopened = mount({ section: 'account', codexCreditStore: store });
    await reopened.pane.load();

    expect(
      /** @type {HTMLInputElement} */ (
        el(reopened.root, '[data-codex-credit-allow="c3"]')
      ).checked
    ).toBe(true);
  });

  test('shows today consumption and the global and cap notes', async () => {
    const { root, pane } = mount({
      section: 'account',
      codexCreditStore: creditStore({
        c3: { allow_credits: true, daily_cap: 1000, consumed_today: 12.5 }
      })
    });

    await pane.load();

    expect(el(root, '[data-codex-credit-consumed="c3"]').textContent).toBe(
      '오늘 소모 12.5'
    );
    expect(el(root, '[data-codex-credits-scope]').textContent).toContain(
      '전역'
    );
    expect(el(root, '[data-codex-credits-cap-note]').textContent).toContain(
      '이 값에 닿으면 새로 고르지 않는다'
    );
  });
});

describe('createExecutionPane repo limit rows (UI-32oq §4.1)', () => {
  test('leaves every repo limit control editable whatever the global auto switch says', async () => {
    const { root, pane } = mount({ section: 'account' });

    await pane.load();

    const controls = Array.from(
      root.querySelectorAll(
        '[data-limit-mode-runner] button, [data-limit-preempt], [data-limit-preempt-pct]'
      )
    );
    expect(controls.length).toBe(8);
    expect(
      controls.every((node) => /** @type {any} */ (node).disabled === false)
    ).toBe(true);
  });

  test('draws no global-lock note', async () => {
    const { root, pane } = mount({ section: 'account' });

    await pane.load();

    expect(root.querySelector('[data-limit-note]')).toBeNull();
  });
});

describe('createExecutionPane active-login lines (UI-32oq §4.4)', () => {
  /**
   * A settings store whose Claude auto switch is `claude_on`.
   *
   * @param {boolean} claude_on
   * @param {any} [departures]
   */
  function settingsStore(claude_on, departures) {
    const store = createLimitPolicySettingsStore();
    const entry = {
      auto_switch: false,
      default_account: null,
      accounts: [],
      preempt_pct: null
    };
    store.set({
      revision: 1,
      runners: {
        claude: { ...entry, auto_switch: claude_on },
        codex: entry
      },
      departures: departures ?? { claude: null, codex: null }
    });
    return store;
  }

  /**
   * @param {'wait'|'switch'} claude_mode
   * @returns {Record<string, any>}
   */
  function queueWith(claude_mode) {
    return queueRow({
      provider_limit_policy: {
        claude: { mode: claude_mode, accounts: [], preempt_pct: null },
        codex: { mode: 'wait', accounts: [], preempt_pct: null }
      }
    });
  }

  /**
   * @param {HTMLElement} root
   * @returns {string[]}
   */
  function warnedRunners(root) {
    return Array.from(root.querySelectorAll('[data-limit-pinned-warning]')).map(
      (node) => node.getAttribute('data-limit-pinned-warning') || ''
    );
  }

  beforeEach(() => {
    vi.unstubAllGlobals();
  });

  test('warns a waiting runner whose pin is empty while its auto switch is on', async () => {
    const { root, pane } = mount({
      section: 'account',
      queue: queueWith('wait'),
      limitPolicySettingsStore: settingsStore(true)
    });

    await pane.load();

    expect(warnedRunners(root)).toEqual(['claude']);
    expect(
      root
        .querySelector('[data-limit-pinned-warning="claude"]')
        ?.textContent?.trim()
    ).toBe(PINNED_EMPTY_WARNING);
  });

  test('draws no warning for a runner that switches accounts', async () => {
    const { root, pane } = mount({
      section: 'account',
      queue: queueWith('switch'),
      limitPolicySettingsStore: settingsStore(true)
    });

    await pane.load();

    expect(warnedRunners(root)).toEqual([]);
  });

  test('draws no warning once the runner has a pinned account', async () => {
    const { root, pane } = mount({
      section: 'account',
      queue: queueWith('wait'),
      values: { claude_account: 'repo@example.com' },
      limitPolicySettingsStore: settingsStore(true)
    });

    await pane.load();

    expect(warnedRunners(root)).toEqual([]);
  });

  test('draws no warning while the runner auto switch is off', async () => {
    const { root, pane } = mount({
      section: 'account',
      queue: queueWith('wait'),
      limitPolicySettingsStore: settingsStore(false)
    });

    await pane.load();

    expect(warnedRunners(root)).toEqual([]);
  });

  test('draws the warning when the auto switch turns on after mounting', async () => {
    const store = settingsStore(false);
    const { root, pane } = mount({
      section: 'account',
      queue: queueWith('wait'),
      limitPolicySettingsStore: store
    });
    await pane.load();

    store.set(settingsStore(true).get());

    expect(warnedRunners(root)).toEqual(['claude']);
  });

  test('draws no warning before the pinned accounts are read', async () => {
    const { root } = mount({
      section: 'account',
      queue: queueWith('wait'),
      limitPolicySettingsStore: settingsStore(true)
    });

    const warned = warnedRunners(root);

    expect(warned).toEqual([]);
  });

  test('draws no warning when the pinned accounts cannot be read', async () => {
    const { root, pane } = mount({
      section: 'account',
      queue: queueWith('wait'),
      limitPolicySettingsStore: settingsStore(true),
      transport: async (/** @type {string} */ type) => {
        if (type === 'get-workspace-accounts') {
          throw new Error('kv down');
        }
        return { values: {}, warnings: [] };
      }
    });

    await pane.load();

    expect(warnedRunners(root)).toEqual([]);
  });

  test('leaves every limit control and pin select editable beside the warning', async () => {
    const { root, pane } = mount({
      section: 'account',
      queue: queueWith('wait'),
      limitPolicySettingsStore: settingsStore(true)
    });

    await pane.load();

    const controls = Array.from(
      root.querySelectorAll(
        'select[data-account-key], [data-limit-mode-runner] button, [data-limit-preempt], [data-limit-preempt-pct]'
      )
    );
    expect(controls.length).toBe(10);
    expect(
      controls.every((node) => /** @type {any} */ (node).disabled === false)
    ).toBe(true);
  });

  test('names each active login and a pending default return on the status line', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async (/** @type {string} */ url) => ({
        ok: true,
        json: async () =>
          url.includes('claude')
            ? {
                accounts: [
                  {
                    key: 'a@example.com',
                    email: 'a@example.com',
                    active: false
                  },
                  { key: 'b@example.com', email: 'b@example.com', active: true }
                ]
              }
            : {
                accounts: [{ key: 'ck', email: 'c@example.com', active: true }]
              }
      }))
    );
    const until = new Date(2026, 10, 10, 14, 5).toISOString();
    const { root, pane } = mount({
      section: 'account',
      limitPolicySettingsStore: settingsStore(true, {
        claude: {
          default_account: 'a@example.com',
          to_account: 'b@example.com',
          until
        },
        codex: null
      })
    });

    await pane.load();

    expect(
      root.querySelector('[data-account-login-text]')?.textContent?.trim()
    ).toBe(
      '활성 로그인: Claude b@example.com (default a@example.com 리셋 14:05 뒤 복귀) · Codex c@example.com'
    );
  });

  test('opens the 활성 계정 tab from the status line link', async () => {
    const open = vi.fn();
    const { root, pane } = mount({
      section: 'account',
      limitPolicySettingsStore: settingsStore(false),
      onOpenActiveAccount: open
    });
    await pane.load();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-open-active-account]')
    ).click();

    expect(open).toHaveBeenCalledTimes(1);
  });
});
