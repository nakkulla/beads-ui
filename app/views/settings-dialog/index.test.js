import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createDisplayPolicyStore } from '../../data/display-policy-store.js';
import { SETTINGS_TABS, createSettingsDialog } from './index.js';

/** @returns {import('../../utils/label-policy.js').DisplayPolicy} */
function makePolicy() {
  return {
    revision: 0,
    hidden_labels: [],
    hidden_prefixes: [],
    visible_labels: [],
    chips: {
      route: true,
      fast_track: true,
      pr: true,
      from: true,
      blocked: true,
      stepper: true
    }
  };
}

const CATALOG = {
  runners: {
    claude: { models: { opus: { id: 'opus', efforts: ['low', 'high'] } } },
    codex: {
      models: { sol: { id: 'gpt-5.6-sol', efforts: ['medium'] } }
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
    plan_review: {
      standard_recommended: 'codex',
      fast_track_default: 'fable'
    },
    implementation: {
      default: {
        dispatch: 'delegated',
        runtime: 'codex',
        model: 'sol',
        model_id: 'gpt-5.6-sol',
        effort: 'auto',
        speed: 'default'
      },
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

/**
 * @param {{ values?: Record<string, string>, warnings?: string[], transport?: any, queue?: any, presets?: any }} [options]
 */
function mount(options = {}) {
  const root = document.createElement('div');
  document.body.appendChild(root);
  const policy_store = createDisplayPolicyStore();
  policy_store.set(makePolicy());
  const notify = vi.fn();
  const transport =
    options.transport ||
    vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-session-defaults') {
        return {
          values: options.values || {},
          warnings: options.warnings || []
        };
      }
      return { values: options.values || {}, warnings: [] };
    });
  let queue_state = options.queue || {
    revision: 3,
    slots: 2,
    runner_catalog: CATALOG,
    execution_defaults: EXECUTION_DEFAULTS,
    orchestration_model: null,
    orchestration_effort: null,
    orchestration_speed: null
  };
  const dialog = createSettingsDialog(root, {
    transport,
    policyStore: policy_store,
    queueStore: {
      get: () => queue_state,
      set: (queue) => {
        queue_state = queue;
      }
    },
    implPresetStore: {
      get: () => options.presets || { revision: 1, presets: [] }
    },
    labelOptions: () => ['worker-serial'],
    notify
  });
  return { root, dialog, transport, notify, policy_store };
}

/** Let the dialog's `open()` load finish. */
async function settle() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('createSettingsDialog tabs', () => {
  test('renders the two rail tabs in contract order', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const tabs = Array.from(root.querySelectorAll('[role="tab"]')).map((tab) =>
      tab.getAttribute('data-tab')
    );

    expect(tabs).toEqual(['execution', 'display']);
    expect(SETTINGS_TABS.map((tab) => tab.label)).toEqual(['실행', '표시']);
  });

  test('opens on the 실행 tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const selected = root.querySelector('[role="tab"][aria-selected="true"]');

    expect(selected?.getAttribute('data-tab')).toBe('execution');
  });

  test('switches the active pane on a tab click', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-tab="display"]')
    ).click();

    expect(
      root
        .querySelector('#settings-pane-display')
        ?.classList.contains('settings-dialog__pane--active')
    ).toBe(true);
    expect(
      root
        .querySelector('#settings-pane-execution')
        ?.classList.contains('settings-dialog__pane--active')
    ).toBe(false);
  });

  test('renders the execution groups in the approved order', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const groups = Array.from(
      root.querySelectorAll(
        '#settings-pane-execution > .settings-dialog__preset-bar, #settings-pane-execution > .settings-dialog__group'
      )
    ).map((element) =>
      element.classList.contains('settings-dialog__preset-bar')
        ? '프리셋'
        : element
            .querySelector('.settings-dialog__group-title')
            ?.childNodes[0]?.textContent?.trim()
    );

    expect(groups).toEqual([
      '프리셋',
      '오케스트레이션',
      '워크플로우',
      '리뷰 게이트',
      '구현',
      '동시 실행',
      '워커 시스템 프롬프트'
    ]);
  });
});

describe('createSettingsDialog session tab', () => {
  test('renders actual defaults with source badge and full model id', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="spec_review_model"]')
    );

    expect(select.options[0].textContent).toContain('기본값 사용 — 5.6-sol');
    expect(select.title).toBe('gpt-5.6-sol');
    expect(select.parentElement?.textContent).toContain('기본');
    expect(select.options[1].value).toBe('codex');
    expect(select.options[1].textContent).toContain('5.6-sol');
  });

  test('renders the kv parse-failure warning as a banner', async () => {
    const { root, dialog } = mount({ warnings: ['kv_value_unparsable'] });
    dialog.open();
    await settle();

    const banner = root.querySelector('.settings-dialog__banner');

    expect(banner?.textContent).toContain('kv_value_unparsable');
  });

  test('renders no banner when the layer read cleanly', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    expect(root.querySelector('.settings-dialog__banner')).toBe(null);
  });

  test('sends only the changed key when a session default is edited', async () => {
    const { root, dialog, transport } = mount({
      values: { impl_runtime: 'codex' }
    });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(transport).toHaveBeenCalledWith('set-session-defaults', {
      values: { impl_speed: 'fast' }
    });
  });

  test('writes workflow_mode=standard as a literal rather than a deletion', async () => {
    const { root, dialog, transport } = mount();
    dialog.open();
    await settle();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-mode="standard"]')
    ).click();
    await settle();

    expect(transport).toHaveBeenCalledWith('set-session-defaults', {
      values: { workflow_mode: 'standard' }
    });
  });

  test('offers no 실행 방식 row in the workspace session defaults', async () => {
    const { root, dialog } = mount({ values: { impl_dispatch: 'main' } });
    dialog.open();
    await settle();

    expect(root.querySelector('select[data-key="impl_dispatch"]')).toBe(null);
  });

  test('keeps the delegation rows enabled on the normalized kv layer', async () => {
    const { root, dialog } = mount({ values: { impl_runtime: 'codex' } });
    dialog.open();
    await settle();

    for (const key of [
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed'
    ]) {
      const select = /** @type {HTMLSelectElement} */ (
        root.querySelector(`select[data-key="${key}"]`)
      );
      expect(select.disabled).toBe(false);
    }
  });

  test('narrows the model list to the chosen delegation target', async () => {
    const { root, dialog } = mount({ values: { impl_runtime: 'codex' } });
    dialog.open();
    await settle();

    const options = Array.from(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="impl_model"]')
      ).options
    ).map((option) => option.value);

    expect(options).toEqual(['', 'auto', 'sol']);
  });

  test('preserves the edit and notifies when the save fails', async () => {
    const transport = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      throw new Error('kv read-only');
    });
    const { root, dialog, notify } = mount({ transport });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="impl_speed"]')
    );
    select.value = 'fast';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(notify).toHaveBeenCalled();
    expect(dialog.sessionDraft()).toEqual({ impl_speed: 'fast' });
  });
});

describe('createSettingsDialog execution tab orchestration', () => {
  test('renders Worker launcher defaults from the snapshot projection', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    const model = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_model"]')
    );
    const effort = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_effort"]')
    );

    expect(model.options[0].textContent).toContain('기본값 사용 — opus');
    expect(effort.options[0].textContent).toContain('CLI 기본 (미지정)');
    expect(model.parentElement?.textContent).toContain('기본');
  });

  test('keeps explicit edits and saves when the projection is unavailable', async () => {
    const { root, dialog, transport } = mount({
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: { supported: false },
        orchestration_model: null,
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    dialog.open();
    await settle();
    const warning = root.querySelector(
      '#settings-pane-execution [data-execution-defaults-warning]'
    );
    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_model"]')
    );
    select.value = 'opus';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(warning?.textContent).toContain('기본값 확인 불가');
    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-orchestration-defaults',
      { expected_revision: 3, values: { orchestration_model: 'opus' } }
    );
  });

  test('filters the model list by the UI-only runtime choice', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    const filter = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_runtime_filter"]')
    );
    filter.value = 'codex';
    filter.dispatchEvent(new Event('change'));

    const options = Array.from(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="orchestration_model"]')
      ).options
    ).map((option) => option.value);

    expect(options).toEqual(['', 'sol']);
  });

  test('stores an orchestration edit under the queue revision', async () => {
    const { root, dialog, transport } = mount();
    dialog.open();
    await settle();
    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="orchestration_model"]')
    );
    select.value = 'opus';
    select.dispatchEvent(new Event('change'));
    await settle();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-orchestration-defaults',
      { expected_revision: 3, values: { orchestration_model: 'opus' } }
    );
  });

  test('offers session and orchestration keys on the execution tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    const keys = Array.from(
      root.querySelectorAll('#settings-pane-execution select[data-key]')
    ).map((select) => select.getAttribute('data-key'));

    expect(keys).toContain('orchestration_model');
    expect(keys).toContain('impl_runtime');
    expect(keys).toContain('spec_review_model');
  });
});

describe('createSettingsDialog display tab', () => {
  test('ports the label pills into the 표시 tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-tab="display"]')
    ).click();

    const pill = root.querySelector(
      '#settings-pane-display [data-label="worker-serial"]'
    );

    expect(pill).not.toBe(null);
  });
});

describe('createSettingsDialog implementation presets', () => {
  const PRESETS = {
    revision: 4,
    presets: [
      {
        id: 'p1',
        name: '기본 위임',
        settings: { impl_runtime: 'codex', impl_model: 'sol' }
      }
    ]
  };

  test('creates a preset from the current explicit execution values', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (type, payload) => {
      calls.push([type, payload]);
      if (type === 'get-session-defaults') {
        return { values: { impl_runtime: 'codex' }, warnings: [] };
      }
      if (type === 'impl-preset-create') {
        return {
          applied: true,
          revision: 5,
          presets: [{ id: 'new', name: '새 조합', settings: {} }]
        };
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog } = mount({
      transport,
      presets: PRESETS,
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: 'opus',
        orchestration_effort: null,
        orchestration_speed: 'fast'
      }
    });
    dialog.open('execution');
    await settle();

    const name = /** @type {HTMLInputElement} */ (
      root.querySelector('.settings-dialog__preset-name')
    );
    name.value = '새 조합';
    name.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-save]')
    ).click();
    await settle();

    const create = calls.find(([type]) => type === 'impl-preset-create');
    expect(create[1]).toEqual({
      expected_revision: 4,
      name: '새 조합',
      settings: {
        impl_runtime: 'codex',
        orchestration_model: 'opus',
        orchestration_speed: 'fast'
      }
    });
    dialog.destroy();
  });

  test('creates a preset from an orchestration edit whose queue save failed', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (type, payload) => {
      calls.push([type, payload]);
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'worker-queue-set-orchestration-defaults') {
        return { applied: false, conflict: true };
      }
      if (type === 'impl-preset-create') {
        return { applied: true, revision: 5, presets: [] };
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog } = mount({
      transport,
      presets: PRESETS,
      queue: {
        revision: 3,
        slots: 2,
        runner_catalog: CATALOG,
        execution_defaults: EXECUTION_DEFAULTS,
        orchestration_model: 'opus',
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    dialog.open('execution');
    await settle();

    const model_select = /** @type {HTMLSelectElement} */ (
      root.querySelector(
        '#settings-pane-execution [data-key="orchestration_model"]'
      )
    );
    model_select.value = 'sol';
    model_select.dispatchEvent(new Event('change', { bubbles: true }));
    await settle();
    const name = /** @type {HTMLInputElement} */ (
      root.querySelector('.settings-dialog__preset-name')
    );
    name.value = '실패한 편집';
    name.dispatchEvent(new Event('input', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-save]')
    ).click();
    await settle();

    const create = calls.find(([type]) => type === 'impl-preset-create');
    expect(create[1].settings.orchestration_model).toBe('sol');
    dialog.destroy();
  });

  test('updates the selected preset keeping its name', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (type, payload) => {
      calls.push([type, payload]);
      if (type === 'get-session-defaults') {
        return { values: { impl_runtime: 'codex' }, warnings: [] };
      }
      if (type === 'impl-preset-update') {
        return { applied: true, revision: 5, presets: PRESETS.presets };
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog } = mount({ transport, presets: PRESETS });
    dialog.open('execution');
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-save]')
    ).click();
    await settle();

    const update = calls.find(([type]) => type === 'impl-preset-update');
    expect(update[1]).toEqual({
      expected_revision: 4,
      id: 'p1',
      name: '기본 위임',
      settings: { impl_runtime: 'codex' }
    });
    dialog.destroy();
  });

  test('deletes the selected preset', async () => {
    const calls = /** @type {any[]} */ ([]);
    const transport = vi.fn(async (type, payload) => {
      calls.push([type, payload]);
      if (type === 'impl-preset-delete') {
        return { applied: true, revision: 5, presets: [] };
      }
      return { values: {}, warnings: [] };
    });
    const { root, dialog } = mount({ transport, presets: PRESETS });
    dialog.open('execution');
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-delete]')
    ).click();
    await settle();

    const del = calls.find(([type]) => type === 'impl-preset-delete');
    expect(del[1]).toEqual({ expected_revision: 4, id: 'p1' });
    dialog.destroy();
  });

  test('applies a preset with both revisions and adopts the queue snapshot', async () => {
    const transport = vi.fn(async (type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'apply-impl-preset-global') {
        return {
          applied: true,
          conflict: false,
          revision: 5,
          values: { workflow_mode: 'fast_track' },
          warnings: [],
          queue_applied: true,
          queue_conflict: false,
          queue: {
            revision: 4,
            slots: 2,
            runner_catalog: CATALOG,
            execution_defaults: EXECUTION_DEFAULTS,
            orchestration_model: 'sol',
            orchestration_effort: 'medium',
            orchestration_speed: 'default'
          }
        };
      }
      return {};
    });
    const { root, dialog } = mount({ transport, presets: PRESETS });
    dialog.open('execution');
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-apply-global]')
    ).click();
    await settle();

    expect(transport).toHaveBeenCalledWith('apply-impl-preset-global', {
      preset_id: 'p1',
      expected_revision: 4,
      expected_queue_revision: 3
    });
    expect(
      /** @type {HTMLSelectElement} */ (
        root.querySelector('select[data-key="orchestration_model"]')
      ).value
    ).toBe('sol');
    dialog.destroy();
  });

  test('reports a partial failure when queue values were not applied', async () => {
    const transport = vi.fn(async (type) => {
      if (type === 'get-session-defaults') {
        return { values: {}, warnings: [] };
      }
      if (type === 'apply-impl-preset-global') {
        return {
          applied: true,
          conflict: false,
          revision: 5,
          values: { workflow_mode: 'fast_track' },
          warnings: [],
          queue_applied: false,
          queue_conflict: true,
          queue: {
            revision: 4,
            slots: 2,
            runner_catalog: CATALOG,
            execution_defaults: EXECUTION_DEFAULTS,
            orchestration_model: null,
            orchestration_effort: null,
            orchestration_speed: null
          }
        };
      }
      return {};
    });
    const { root, dialog, notify } = mount({ transport, presets: PRESETS });
    dialog.open('execution');
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('[aria-label="실행 프리셋"]')
    );
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-preset-apply-global]')
    ).click();
    await settle();

    expect(notify).toHaveBeenCalledWith(
      '오케스트레이션 값은 적용되지 않았습니다 — 다시 시도하세요'
    );
    expect(dialog.sessionDraft()).toEqual({ workflow_mode: 'fast_track' });
    dialog.destroy();
  });
});
