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
    claude: { models: { opus: { efforts: ['low', 'high'] } } },
    codex: { models: { sol: { efforts: ['medium'] } } }
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
  const dialog = createSettingsDialog(root, {
    transport,
    policyStore: policy_store,
    queueStore: {
      get: () =>
        options.queue || {
          revision: 3,
          slots: 2,
          runner_catalog: CATALOG,
          orchestration_model: null,
          orchestration_effort: null,
          orchestration_speed: null
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
  test('renders the three rail tabs in contract order', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const tabs = Array.from(root.querySelectorAll('[role="tab"]')).map((tab) =>
      tab.getAttribute('data-tab')
    );

    expect(tabs).toEqual(['session', 'worker', 'display']);
    expect(SETTINGS_TABS.map((tab) => tab.label)).toEqual([
      '세션',
      'Worker',
      '표시'
    ]);
  });

  test('opens on the 세션 tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    const selected = root.querySelector('[role="tab"][aria-selected="true"]');

    expect(selected?.getAttribute('data-tab')).toBe('session');
  });

  test('switches the active pane on a tab click', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();

    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-tab="worker"]')
    ).click();

    expect(
      root
        .querySelector('#settings-pane-worker')
        ?.classList.contains('settings-dialog__pane--active')
    ).toBe(true);
    expect(
      root
        .querySelector('#settings-pane-session')
        ?.classList.contains('settings-dialog__pane--active')
    ).toBe(false);
  });
});

describe('createSettingsDialog session tab', () => {
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
      values: { impl_dispatch: 'delegated' }
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

  test('disables the delegation rows when 실행 방식 is 메인', async () => {
    const { root, dialog } = mount({ values: { impl_dispatch: 'main' } });
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
      expect(select.disabled).toBe(true);
    }
  });

  test('keeps the delegation rows enabled for 위임', async () => {
    const { root, dialog } = mount({ values: { impl_dispatch: 'delegated' } });
    dialog.open();
    await settle();

    const select = /** @type {HTMLSelectElement} */ (
      root.querySelector('select[data-key="impl_runtime"]')
    );

    expect(select.disabled).toBe(false);
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

describe('createSettingsDialog worker tab', () => {
  test('filters the model list by the UI-only runtime choice', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-tab="worker"]')
    ).click();

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
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-tab="worker"]')
    ).click();

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

  test('offers no session key on the Worker tab', async () => {
    const { root, dialog } = mount();
    dialog.open();
    await settle();
    /** @type {HTMLButtonElement} */ (
      root.querySelector('[data-tab="worker"]')
    ).click();

    const keys = Array.from(
      root.querySelectorAll('#settings-pane-worker select[data-key]')
    ).map((select) => select.getAttribute('data-key'));

    expect(keys.some((key) => key?.startsWith('impl_'))).toBe(false);
    expect(keys.some((key) => key?.endsWith('_review_model'))).toBe(false);
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
