import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecutionPane } from './execution-pane.js';

const REPO_B = '/tmp/example/repo-b';

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: {
      models: {
        sol: {
          id: 'gpt-5.6-sol',
          efforts: ['medium'],
          orchestration_efforts: ['medium', 'ultra']
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
    provider_auto_switch: true,
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
 * @param {{ root_dir?: string|null, queue?: any, values?: Record<string, string|boolean>, transport?: any, presets?: any }} [options]
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
    const { root, pane, calls } = mount();
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
      transport: async (/** @type {string} */ type) =>
        type === 'get-session-defaults'
          ? { values: {}, warnings: [] }
          : { applied: false, conflict: true, queue: { revision: 9 } }
    });
    await pane.load();

    el(root, '[data-automation="auto_advance"]').click();
    await settle();

    expect(payloadsOf(calls, 'worker-automation-toggle')).toHaveLength(1);
  });
});

describe('createExecutionPane quick_fix lane', () => {
  test('renders eight enabled rows after the general implementation group', async () => {
    const { root, pane } = mount();

    await pane.load();

    const group = el(root, '[data-quick-fix-group]');
    const rows = Array.from(group.querySelectorAll('select[data-key]'));
    expect(rows.map((row) => row.getAttribute('data-key'))).toEqual([
      'quick_fix_orchestration_model',
      'quick_fix_orchestration_effort',
      'quick_fix_orchestration_speed',
      'quick_fix_impl_dispatch',
      'quick_fix_impl_runtime',
      'quick_fix_impl_model',
      'quick_fix_impl_effort',
      'quick_fix_impl_speed'
    ]);
    expect(
      rows.every((row) => !(/** @type {HTMLSelectElement} */ (row).disabled))
    ).toBe(true);
    expect(group.textContent).toContain(
      '비어 있는 값은 일반 프로파일로 떨어집니다. 이슈 핀이 있으면 핀이 우선합니다.'
    );
  });

  test('derives the unset quick_fix runtime from its model before general runtime', async () => {
    const { root, pane } = mount({
      values: { impl_runtime: 'claude', quick_fix_impl_model: 'sol' }
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

  test('sends no lane for general apply and quick_fix for lane apply', async () => {
    const { root, pane, calls } = mount({
      presets: PRESETS,
      transport: async (
        /** @type {string} */ type,
        /** @type {any} */ payload
      ) => {
        if (type === 'get-session-defaults') {
          return { values: {}, warnings: [] };
        }
        if (type === 'apply-impl-preset-global') {
          return {
            applied: true,
            lane: payload.lane,
            values: {},
            warnings: [],
            queue_applied: true
          };
        }
        return {};
      }
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';
    preset.dispatchEvent(new Event('change'));

    el(root, '[data-preset-apply-general]').click();
    await settle();
    el(root, '[data-preset-apply-quick-fix]').click();
    await settle();

    expect(payloadsOf(calls, 'apply-impl-preset-global')).toEqual([
      {
        preset_id: 'p1',
        expected_revision: 4,
        expected_queue_revision: 3
      },
      {
        preset_id: 'p1',
        expected_revision: 4,
        expected_queue_revision: 3,
        lane: 'quick_fix'
      }
    ]);
  });

  test('disables quick_fix controls when the snapshot lacks the capability key', async () => {
    const old_queue = queueRow();
    Reflect.deleteProperty(old_queue, 'quick_fix_orchestration_model');
    const { root, pane } = mount({ queue: old_queue, presets: PRESETS });

    await pane.load();

    const apply = /** @type {HTMLButtonElement} */ (
      el(root, '[data-preset-apply-quick-fix]')
    );
    const rows = Array.from(
      el(root, '[data-quick-fix-group]').querySelectorAll('select[data-key]')
    );
    expect(apply.disabled).toBe(true);
    expect(apply.title).toBe('서버가 quick_fix 레인을 지원하지 않습니다');
    expect(
      rows.every((row) => /** @type {HTMLSelectElement} */ (row).disabled)
    ).toBe(true);
  });

  test('keeps drafts and warns when a quick_fix response omits lane', async () => {
    const { root, pane, notify } = mount({
      values: { quick_fix_impl_runtime: 'claude' },
      presets: PRESETS,
      transport: async (/** @type {string} */ type) => {
        if (type === 'get-session-defaults') {
          return {
            values: { quick_fix_impl_runtime: 'claude' },
            warnings: []
          };
        }
        if (type === 'apply-impl-preset-global') {
          return {
            applied: true,
            values: { quick_fix_impl_runtime: 'codex' },
            warnings: [],
            queue_applied: true
          };
        }
        return {};
      }
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';
    preset.dispatchEvent(new Event('change'));

    el(root, '[data-preset-apply-quick-fix]').click();
    await settle();

    expect(pane.sessionDraft()).toEqual({ quick_fix_impl_runtime: 'claude' });
    expect(notify).toHaveBeenCalledWith(
      '서버 응답에 lane이 없습니다 — 큐 스냅샷을 다시 받은 뒤 확인하세요'
    );
  });

  test('previews incompatible and absent quick_fix values as general fallthrough', async () => {
    const { root, pane } = mount({
      queue: queueRow({ quick_fix_orchestration_model: 'opus' }),
      values: {
        quick_fix_impl_runtime: 'codex',
        quick_fix_impl_model: 'sol'
      },
      presets: {
        revision: 4,
        presets: [
          {
            id: 'p1',
            name: '자동',
            settings: { impl_runtime: 'inherit', impl_model: 'auto' }
          }
        ]
      }
    });
    await pane.load();
    const preset = /** @type {HTMLSelectElement} */ (
      el(root, '[aria-label="실행 프리셋"]')
    );
    preset.value = 'p1';
    preset.dispatchEvent(new Event('change'));
    el(root, '[data-preset-lane="quick_fix"]').click();

    expect(el(root, '[data-preset-diff]').textContent).toContain(
      '기본(해제 → 일반 프로파일)'
    );
  });
});

describe('createExecutionPane bdui_url row', () => {
  test('renders the stored origin in a text box, not a select', async () => {
    const { root, pane } = mount({ values: { bdui_url: 'http://host:3000' } });

    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    expect(input.value).toBe('http://host:3000');
    expect(root.querySelector('select[data-key="bdui_url"]')).toBeNull();
  });

  test('saves a well-formed origin through the session-defaults op', async () => {
    const { root, pane, calls } = mount();
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
    const { root, pane, calls } = mount();
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
    const { root, pane, calls } = mount();
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
    const { root, pane, calls } = mount();
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'host:3000';
    input.dispatchEvent(new Event('change'));
    await settle();
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

  test('keeps mid-typed text when an unrelated re-render lands', async () => {
    const { root, pane, calls } = mount();
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
    const { root, pane } = mount();
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
    const { root, pane } = mount();
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
    const { root, pane } = mount();
    await pane.load();

    const input = /** @type {HTMLInputElement} */ (
      el(root, 'input[data-key="bdui_url"]')
    );
    input.value = 'host:3000';
    input.dispatchEvent(new Event('change'));
    await settle();
    const select = /** @type {HTMLSelectElement} */ (
      el(root, 'select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(
      /** @type {HTMLInputElement} */ (el(root, 'input[data-key="bdui_url"]'))
        .value
    ).toBe('host:3000');
  });

  test('sends an emptied box as the null deletion request', async () => {
    const { root, pane, calls } = mount({
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
    const { root, pane, calls } = mount({ root_dir: REPO_B });
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
    el(root, '[data-automation="auto_advance"]').click();
    await settle();
    el(root, '[data-automation="auto_merge"]').click();
    await settle();
    const provider_switch = /** @type {HTMLInputElement} */ (
      el(root, '[data-provider-auto-switch]')
    );
    provider_switch.checked = false;
    provider_switch.dispatchEvent(new Event('change'));
    await settle();
    el(
      root,
      '[data-stepper="slots"] button[aria-label="동시 실행 증가"]'
    ).click();
    await settle();
    el(
      root,
      '[data-stepper="serial-lane-count"] button[aria-label="직렬 레인 증가"]'
    ).click();
    await settle();

    for (const type of [
      'worker-queue-set-orchestration-defaults',
      'worker-automation-toggle',
      'worker-merge-auto-toggle',
      'worker-provider-auto-switch-toggle',
      'worker-queue-set-slots',
      'worker-queue-set-serial-lane-count'
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
      transport: async (/** @type {string} */ type) => {
        if (type !== 'worker-automation-toggle') {
          return { values: {}, warnings: [] };
        }
        seen += 1;
        return seen === 1
          ? { applied: false, conflict: true, queue: { revision: 11 } }
          : { applied: true, queue: { revision: 12 } };
      }
    });
    await pane.load();

    el(root, '[data-automation="auto_advance"]').click();
    await settle();

    expect(payloadsOf(calls, 'worker-automation-toggle')).toEqual([
      { on: true, root_dir: REPO_B, expected_revision: 3 },
      { on: true, root_dir: REPO_B, expected_revision: 11 }
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

describe('createExecutionPane automation section', () => {
  test('renders each switch from the bound queue snapshot', async () => {
    const { root, pane } = mount({
      queue: queueRow({ auto_advance: true })
    });

    await pane.load();

    expect(
      el(root, '[data-automation="auto_advance"]').getAttribute('aria-pressed')
    ).toBe('true');
    expect(
      el(root, '[data-automation="auto_merge"]').getAttribute('aria-pressed')
    ).toBe('false');
  });

  test('renders the concurrency and serial-lane counts of that repo', async () => {
    const { root, pane } = mount({
      queue: queueRow({ slots: 4, serial_lane_count: 3 })
    });

    await pane.load();

    expect(
      el(root, '[data-stepper="slots"] .settings-dialog__stepper-value')
        .textContent
    ).toContain('4');
    expect(
      el(
        root,
        '[data-stepper="serial-lane-count"] .settings-dialog__stepper-value'
      ).textContent
    ).toContain('3');
  });

  test('reads the provider auto-switch checkbox from the queue snapshot', async () => {
    const { root, pane } = mount({
      queue: queueRow({ provider_auto_switch: false })
    });

    await pane.load();

    expect(
      /** @type {HTMLInputElement} */ (el(root, '[data-provider-auto-switch]'))
        .checked
    ).toBe(false);
  });

  test('sends the provider auto-switch change through queue CAS', async () => {
    const { root, pane, calls } = mount({
      queue: queueRow({ provider_auto_switch: false }),
      transport: async (/** @type {string} */ type) =>
        type === 'worker-provider-auto-switch-toggle'
          ? {
              applied: true,
              conflict: false,
              queue: queueRow({ revision: 4, provider_auto_switch: true })
            }
          : { values: {}, warnings: [] }
    });
    await pane.load();
    const input = /** @type {HTMLInputElement} */ (
      el(root, '[data-provider-auto-switch]')
    );

    input.checked = true;
    input.dispatchEvent(new Event('change'));
    await settle();

    expect(payloadsOf(calls, 'worker-provider-auto-switch-toggle')).toEqual([
      { on: true, expected_revision: 3 }
    ]);
    expect(
      /** @type {HTMLInputElement} */ (el(root, '[data-provider-auto-switch]'))
        .checked
    ).toBe(true);
  });

  test('refuses to send a serial lane count past the contract bound', async () => {
    const { root, pane, calls } = mount({
      queue: queueRow({ serial_lane_count: 5 })
    });
    await pane.load();

    el(
      root,
      '[data-stepper="serial-lane-count"] button[aria-label="직렬 레인 증가"]'
    ).click();
    await settle();

    expect(payloadsOf(calls, 'worker-queue-set-serial-lane-count')).toEqual([]);
  });

  test('refuses to send a slots value below the contract bound', async () => {
    const { root, pane, calls } = mount({ queue: queueRow({ slots: 1 }) });
    await pane.load();

    el(
      root,
      '[data-stepper="slots"] button[aria-label="동시 실행 감소"]'
    ).click();
    await settle();

    expect(payloadsOf(calls, 'worker-queue-set-slots')).toEqual([]);
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
      el(root, 'select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(notify).toHaveBeenCalled();
    expect(pane.sessionDraft()).toEqual({ impl_speed: 'fast' });
  });

  test('destroy empties the host and stops rendering into it', async () => {
    const { root, pane } = mount();
    await pane.load();

    pane.destroy();
    pane.render();

    expect(root.children).toHaveLength(0);
  });

  test('destroy leaves no listener that a later click could still reach', async () => {
    const { root, pane, calls } = mount();
    await pane.load();
    const toggle = el(root, '[data-automation="auto_advance"]');

    pane.destroy();
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await settle();

    expect(payloadsOf(calls, 'worker-automation-toggle')).toEqual([]);
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
    const { root, pane } = mount();

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

  test('reads the layer without a root_dir key when unbound', async () => {
    const { pane, calls } = mount();

    await pane.load();

    expect(payloadsOf(calls, 'get-workspace-accounts')).toEqual([{}]);
  });

  test('sends set-workspace-accounts on a change', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, calls } = mount();
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
    const { root, pane, calls } = mount({ root_dir: REPO_B });
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
    const { root, pane } = mount();

    await pane.load();

    expect(root.querySelector('[data-account-warning]')).toBe(null);
  });

  test('keeps the user edit and notifies when a save fails', async () => {
    stubAccountFetch({ claude: CLAUDE_ROWS, codex: CODEX_ROWS });
    const { root, pane, notify } = mount({
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
});
