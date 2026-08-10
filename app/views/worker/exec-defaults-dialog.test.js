import { beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from '../../data/exec-preset-store.js';
import { createExecDefaultsDialog } from './exec-defaults-dialog.js';

function catalogFixture() {
  return {
    runners: {
      claude: {
        models: { opus: { id: 'opus' } },
        efforts: ['low', 'medium', 'high', 'xhigh']
      },
      codex: {
        models: { terra: { id: 'terra' }, luna: { id: 'luna' } },
        efforts: ['low', 'medium', 'high', 'xhigh', 'max']
      }
    }
  };
}

function createQueueStore() {
  const listeners = new Set();
  let queue = {
    revision: 0,
    exec_defaults: {},
    runner_catalog: catalogFixture()
  };
  return {
    get: () => queue,
    /** @param {any} next_queue */
    set(next_queue) {
      queue = next_queue;
      for (const listener of listeners) {
        listener();
      }
    },
    /** @param {() => void} listener */
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}

/**
 * @param {any} state
 * @param {any} [transport]
 * @param {Record<string, any>} [queue_overrides]
 */
function setup(state, transport = vi.fn(), queue_overrides = {}) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  const presetStore = createExecPresetStore();
  presetStore.set(state);
  const queueStore = createQueueStore();
  queueStore.set({ ...queueStore.get(), ...queue_overrides });
  const dialog = createExecDefaultsDialog(mount, {
    queueStore,
    presetStore,
    transport
  });
  dialog.open();
  return { mount, presetStore, queueStore, transport };
}

/** @param {HTMLElement} element */
function click(element) {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
}

async function flush() {
  await Promise.resolve();
  await Promise.resolve();
}

describe('worker exec preset dialog', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
    vi.restoreAllMocks();
  });

  test('closes on a backdrop click', () => {
    const { mount } = setup({ revision: 0, presets: [] });
    const dialog = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-exec-defaults-dialog')
    );

    click(dialog);

    expect(dialog.hasAttribute('open')).toBe(false);
  });

  test('stays open on a container click', () => {
    const { mount } = setup({ revision: 0, presets: [] });
    const dialog = /** @type {HTMLElement} */ (
      mount.querySelector('#worker-exec-defaults-dialog')
    );
    const container = /** @type {HTMLElement} */ (
      dialog.querySelector('.exec-defaults__container')
    );

    click(container);

    expect(dialog.hasAttribute('open')).toBe(true);
  });

  test('creates a preset from the body editor with the current revision', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      revision: 4,
      presets: [{ id: 'p1', name: '개발', settings: { impl_model: 'terra' } }]
    });
    const { mount } = setup({ revision: 3, presets: [] }, transport);
    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-new]'))
    );
    const name = /** @type {HTMLInputElement} */ (
      mount.querySelector('[data-preset-name]')
    );
    name.value = '개발';
    name.dispatchEvent(new Event('input', { bubbles: true }));
    const runtime = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="impl_runtime"]')
    );
    runtime.value = 'codex';
    runtime.dispatchEvent(new Event('change', { bubbles: true }));
    const model = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="impl_model"]')
    );
    model.value = 'terra';
    model.dispatchEvent(new Event('change', { bubbles: true }));

    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-save]'))
    );
    await flush();

    expect(transport).toHaveBeenCalledWith('exec-preset-create', {
      expected_revision: 3,
      name: '개발',
      settings: { impl_runtime: 'codex', impl_model: 'terra' }
    });
    expect(mount.querySelector('[data-preset-id="p1"]')?.textContent).toContain(
      '1/11 지정'
    );
  });

  test('keeps the draft and does not retry after an update conflict', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: false,
      conflict: true,
      revision: 6,
      presets: [{ id: 'p1', name: '원본', settings: { impl_model: 'luna' } }]
    });
    const { mount } = setup(
      {
        revision: 5,
        presets: [{ id: 'p1', name: '원본', settings: { impl_model: 'terra' } }]
      },
      transport
    );
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-edit="p1"]')
      )
    );
    const name = /** @type {HTMLInputElement} */ (
      mount.querySelector('[data-preset-name]')
    );
    name.value = '내 초안';
    name.dispatchEvent(new Event('input', { bubbles: true }));

    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-save]'))
    );
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(
      /** @type {HTMLInputElement} */ (
        mount.querySelector('[data-preset-name]')
      ).value
    ).toBe('내 초안');
    expect(
      mount.querySelector('[data-preset-conflict]')?.textContent
    ).toContain('다른 곳에서 변경됨');
  });

  test('offers the deleted draft as a new preset after a conflict', async () => {
    const transport = vi
      .fn()
      .mockResolvedValueOnce({
        applied: false,
        conflict: true,
        revision: 8,
        presets: []
      })
      .mockResolvedValueOnce({
        applied: true,
        conflict: false,
        revision: 9,
        presets: [{ id: 'p2', name: '복구', settings: {} }]
      });
    const { mount } = setup(
      { revision: 7, presets: [{ id: 'p1', name: '복구', settings: {} }] },
      transport
    );
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-edit="p1"]')
      )
    );
    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-save]'))
    );
    await flush();

    expect(
      mount.querySelector('[data-preset-save-as-new]')?.textContent
    ).toContain('새 프리셋으로 저장');
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-save-as-new]')
      )
    );
    await flush();

    expect(transport.mock.calls[1]).toEqual([
      'exec-preset-create',
      { expected_revision: 8, name: '복구', settings: {} }
    ]);
  });

  test('confirms deletion without implying applied issues will change', async () => {
    const confirm = vi.spyOn(window, 'confirm').mockReturnValue(true);
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      revision: 2,
      presets: []
    });
    const { mount } = setup(
      { revision: 1, presets: [{ id: 'p1', name: '삭제 대상', settings: {} }] },
      transport
    );

    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-delete="p1"]')
      )
    );
    await flush();

    expect(confirm).toHaveBeenCalledWith(
      expect.stringContaining('이미 적용된 이슈는 변경되지 않습니다')
    );
    expect(transport).toHaveBeenCalledWith('exec-preset-delete', {
      expected_revision: 1,
      id: 'p1'
    });
  });

  test('marks a preset whose stored value is outside the current catalog', () => {
    const { mount } = setup({
      revision: 1,
      presets: [
        { id: 'p1', name: '과거 설정', settings: { impl_model: 'retired' } }
      ]
    });

    expect(
      mount.querySelector('[data-preset-id="p1"] [data-preset-incompatible]')
        ?.textContent
    ).toContain('비호환');
  });

  test('uses the shared semantic labels in the preset editor without per-key workspace rows', () => {
    const { mount } = setup({ revision: 0, presets: [] });

    expect(
      mount.querySelector('.exec-defaults__workspace [data-exec-setting-title]')
    ).toBe(null);
    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-new]'))
    );
    expect(
      mount.querySelector('.exec-preset-editor [data-exec-setting-title]')
        ?.textContent
    ).toBe('워커 실행 모델');
    expect(
      mount.querySelector(
        '.exec-preset-editor [data-exec-setting-help="impl_model"]'
      )?.textContent
    ).toContain('복잡 구현');
  });

  test('resets a preset draft model and effort when runtime switches provider', () => {
    const { mount } = setup({
      revision: 1,
      presets: [
        {
          id: 'p1',
          name: '구현',
          settings: {
            impl_runtime: 'codex',
            impl_model: 'terra',
            impl_effort: 'high'
          }
        }
      ]
    });
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-edit="p1"]')
      )
    );
    const runtime = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="impl_runtime"]')
    );
    runtime.value = 'claude';
    runtime.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-preset-key="impl_model"]')
      ).value
    ).toBe('');
    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-preset-key="impl_effort"]')
      ).value
    ).toBe('');
  });

  test('keeps a compatible exact model when a preset draft inherits a known provider', () => {
    const { mount } = setup({
      revision: 1,
      presets: [
        {
          id: 'p1',
          name: '구현',
          settings: {
            orchestration_model: 'terra',
            impl_runtime: 'codex',
            impl_model: 'terra',
            impl_effort: 'high'
          }
        }
      ]
    });
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-edit="p1"]')
      )
    );
    const runtime = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="impl_runtime"]')
    );
    runtime.value = 'inherit';
    runtime.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-preset-key="impl_model"]')
      ).value
    ).toBe('terra');
    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-preset-key="impl_effort"]')
      ).value
    ).toBe('high');
  });

  test('resets inherited preset target when its orchestration provider is unset', () => {
    const { mount } = setup({
      revision: 1,
      presets: [
        {
          id: 'p1',
          name: '구현',
          settings: {
            impl_runtime: 'inherit',
            impl_model: 'terra',
            impl_effort: 'high'
          }
        }
      ]
    });
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-edit="p1"]')
      )
    );

    const model = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="impl_model"]')
    );
    const effort = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="impl_effort"]')
    );

    expect(model.disabled).toBe(true);
    expect(Array.from(model.options).map((option) => option.value)).toEqual([
      ''
    ]);
    expect(model.value).toBe('');
    expect(effort.value).toBe('');
  });

  test('shows provider models and keeps a matching target when orchestration model is exact', () => {
    const { mount } = setup({
      revision: 1,
      presets: [
        {
          id: 'p1',
          name: '구현',
          settings: {
            orchestration_model: 'terra',
            impl_runtime: 'inherit',
            impl_model: 'terra',
            impl_effort: 'high'
          }
        }
      ]
    });
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-edit="p1"]')
      )
    );
    const orchestration = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="orchestration_model"]')
    );
    orchestration.value = 'luna';
    orchestration.dispatchEvent(new Event('change', { bubbles: true }));

    const model = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="impl_model"]')
    );

    expect(model.disabled).toBe(false);
    expect(Array.from(model.options).map((option) => option.value)).toContain(
      'terra'
    );
    expect(model.value).toBe('terra');
    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-preset-key="impl_effort"]')
      ).value
    ).toBe('high');
  });

  test('resets an auto-model preset draft effort outside the new runtime union', () => {
    const { mount } = setup({
      revision: 1,
      presets: [
        {
          id: 'p1',
          name: '구현',
          settings: {
            impl_runtime: 'codex',
            impl_effort: 'max'
          }
        }
      ]
    });
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-edit="p1"]')
      )
    );
    const runtime = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="impl_runtime"]')
    );
    runtime.value = 'claude';
    runtime.dispatchEvent(new Event('change', { bubbles: true }));

    expect(
      /** @type {HTMLSelectElement} */ (
        mount.querySelector('[data-preset-key="impl_effort"]')
      ).value
    ).toBe('');
  });

  test('shows a missing workspace selection and blocks its dispatch', () => {
    const transport = vi.fn();
    const { mount } = setup(
      { revision: 1, presets: [{ id: 'p1', name: '개발', settings: {} }] },
      transport,
      { default_exec_preset_id: 'gone' }
    );
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-workspace-preset-select]')
    );

    expect(
      mount.querySelector('[data-workspace-preset-missing]')?.textContent
    ).toContain('찾을 수 없습니다');
    expect(
      mount.querySelector('[data-workspace-preset-missing]')?.textContent
    ).toContain('실행이 차단됩니다');
    expect(select.options[select.selectedIndex].textContent).toContain(
      '선택한 프리셋 없음'
    );
    select.value = 'gone';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    expect(transport).not.toHaveBeenCalled();
  });

  test('shows an incompatible workspace selection and blocks its dispatch', () => {
    const transport = vi.fn();
    const { mount } = setup(
      {
        revision: 1,
        presets: [{ id: 'p1', name: '과거', settings: {}, compatible: false }]
      },
      transport,
      { default_exec_preset_id: 'p1' }
    );
    const select = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-workspace-preset-select]')
    );

    expect(
      mount.querySelector('[data-workspace-preset-incompatible]')?.textContent
    ).toContain('실행이 차단됩니다');
    select.value = 'p1';
    select.dispatchEvent(new Event('change', { bubbles: true }));
    expect(transport).not.toHaveBeenCalled();
  });

  test('renders an unknown preset reference count as unverifiable', () => {
    const { mount } = setup({
      revision: 1,
      presets: [{ id: 'p1', name: '개발', settings: {} }]
    });

    expect(
      mount.querySelector('[data-preset-references="p1"]')?.textContent
    ).toContain('확인 불가');
    expect(
      /** @type {HTMLButtonElement} */ (
        mount.querySelector('[data-preset-delete="p1"]')
      ).disabled
    ).toBe(true);
  });
});
