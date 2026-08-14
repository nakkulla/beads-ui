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
        models: {
          terra: {
            id: 'terra',
            orchestration_efforts: [
              'low',
              'medium',
              'high',
              'xhigh',
              'max',
              'ultra'
            ],
            speed_tiers: ['default', 'fast']
          },
          luna: {
            id: 'luna',
            orchestration_efforts: ['low', 'medium', 'high', 'xhigh', 'max'],
            speed_tiers: ['default', 'fast']
          }
        },
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

/**
 * @param {HTMLElement} mount
 * @param {string} key
 * @param {string} value
 */
function changePresetValue(mount, key, value) {
  const select = /** @type {HTMLSelectElement} */ (
    mount.querySelector(`[data-preset-key="${key}"]`)
  );
  select.value = value;
  select.dispatchEvent(new Event('change', { bubbles: true }));
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
      '1/12 지정'
    );
  });

  test('renders the shared speed row with Codex Standard and Fast choices', () => {
    const { mount } = setup({ revision: 0, presets: [] }, vi.fn(), {
      exec_defaults: { orchestration_model: 'terra' }
    });
    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-new]'))
    );

    const model = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="orchestration_model"]')
    );
    model.value = 'terra';
    model.dispatchEvent(new Event('change', { bubbles: true }));

    const speed = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="orchestration_speed"]')
    );
    expect(
      Array.from(speed.options).map((option) => option.textContent?.trim())
    ).toEqual(['(기본: Standard)', 'Standard', 'Fast']);
  });

  test('keeps Claude fast speed as Fast (비호환)', () => {
    const { mount } = setup({
      revision: 0,
      presets: [
        {
          id: 'p1',
          name: 'Claude 설정',
          settings: {
            orchestration_model: 'opus',
            orchestration_speed: 'fast'
          }
        }
      ]
    });
    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-preset-edit="p1"]')
      )
    );

    const speed = /** @type {HTMLSelectElement} */ (
      mount.querySelector('[data-preset-key="orchestration_speed"]')
    );
    expect(speed.value).toBe('fast');
    expect(speed.options[speed.selectedIndex].textContent?.trim()).toBe(
      'Fast (비호환)'
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
    ).toBe('구현 runtime');
    expect(
      mount.querySelector(
        '.exec-preset-editor [data-exec-setting-help="impl_model"]'
      )?.textContent
    ).toContain('복잡 구현');
  });

  test('groups two core preset keys above ten advanced keys', () => {
    const { mount } = setup({ revision: 0, presets: [] });
    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-new]'))
    );

    expect(
      Array.from(
        mount.querySelectorAll('[data-preset-core] [data-preset-key]')
      ).map((select) => select.getAttribute('data-preset-key'))
    ).toEqual(['impl_runtime', 'orchestration_model']);
    expect(
      Array.from(
        mount.querySelectorAll(
          '[data-preset-group="worker-detail"] [data-preset-key]'
        )
      ).map((select) => select.getAttribute('data-preset-key'))
    ).toEqual(['orchestration_effort', 'orchestration_speed']);
    expect(
      Array.from(
        mount.querySelectorAll(
          '[data-preset-group="implementation-detail"] [data-preset-key]'
        )
      ).map((select) => select.getAttribute('data-preset-key'))
    ).toEqual(['impl_model', 'impl_effort']);
    expect(
      mount.querySelectorAll('[data-preset-advanced] [data-preset-key]')
    ).toHaveLength(10);
    expect(mount.querySelectorAll('[data-preset-key]')).toHaveLength(12);
    expect(mount.querySelector('[data-preset-key="workflow_mode"]')).toBe(null);
  });

  test('keeps change mutations for all twelve preset selectors', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      revision: 6,
      presets: []
    });
    const { mount } = setup({ revision: 5, presets: [] }, transport);
    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-new]'))
    );

    for (const [key, value] of [
      ['orchestration_model', 'terra'],
      ['orchestration_effort', 'high'],
      ['orchestration_speed', 'fast'],
      ['impl_runtime', 'codex'],
      ['impl_model', 'terra'],
      ['impl_effort', 'high'],
      ['spec_review_model', 'codex'],
      ['spec_review_effort', 'high'],
      ['plan_review_model', 'codex'],
      ['plan_review_effort', 'high'],
      ['impl_review_model', 'codex'],
      ['impl_review_effort', 'high']
    ]) {
      changePresetValue(mount, key, value);
    }
    click(
      /** @type {HTMLElement} */ (mount.querySelector('[data-preset-save]'))
    );
    await flush();

    expect(transport).toHaveBeenCalledWith('exec-preset-create', {
      expected_revision: 5,
      name: '',
      settings: {
        orchestration_model: 'terra',
        orchestration_effort: 'high',
        orchestration_speed: 'fast',
        impl_runtime: 'codex',
        impl_model: 'terra',
        impl_effort: 'high',
        spec_review_model: 'codex',
        spec_review_effort: 'high',
        plan_review_model: 'codex',
        plan_review_effort: 'high',
        impl_review_model: 'codex',
        impl_review_effort: 'high'
      }
    });
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

  test('renders workspace default controls on preset cards without a separate select', () => {
    const { mount } = setup(
      {
        revision: 1,
        presets: [
          { id: 'p1', name: '기본 개발', settings: {} },
          { id: 'p2', name: '검증 강화', settings: {} }
        ]
      },
      vi.fn(),
      { default_exec_preset_id: 'p1' }
    );

    expect(
      mount.querySelector(
        '[data-preset-id="p1"] [data-workspace-default-badge]'
      )?.textContent
    ).toContain('워크스페이스 기본');
    expect(
      mount.querySelector(
        '[data-preset-id="p1"] [data-workspace-preset-release]'
      )?.textContent
    ).toContain('기본 해제');
    expect(
      mount.querySelector(
        '[data-preset-id="p2"] [data-workspace-preset-assign]'
      )?.textContent
    ).toContain('기본으로');
    expect(mount.querySelector('[data-workspace-preset-select]')).toBe(null);
    expect(mount.querySelector('.exec-defaults__workspace')).toBe(null);
  });

  test('adopts conflict snapshots and toasts when card assignment conflicts', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: false,
      conflict: true,
      queue: {
        revision: 8,
        exec_defaults: {},
        default_exec_preset_id: 'p2',
        runner_catalog: catalogFixture()
      },
      presets: {
        revision: 4,
        presets: [{ id: 'p2', name: '원격 기본', settings: {} }]
      }
    });
    const { mount, presetStore, queueStore } = setup(
      {
        revision: 3,
        presets: [{ id: 'p1', name: '내 선택', settings: {} }]
      },
      transport,
      { revision: 7 }
    );

    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-workspace-preset-assign="p1"]')
      )
    );
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-default-exec-preset',
      {
        preset_id: 'p1',
        expected_queue_revision: 7,
        expected_preset_revision: 3
      }
    );
    expect(queueStore.get().revision).toBe(8);
    expect(presetStore.get()?.revision).toBe(4);
    expect(document.querySelector('.toast')?.textContent).toContain(
      '기본 프리셋이 변경됐습니다'
    );
  });

  test('releases a missing workspace default through a synthetic card', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      queue: {
        revision: 8,
        exec_defaults: {},
        default_exec_preset_id: null,
        runner_catalog: catalogFixture()
      },
      presets: {
        revision: 2,
        presets: [{ id: 'p1', name: '개발', settings: {} }]
      }
    });
    const { mount } = setup(
      { revision: 1, presets: [{ id: 'p1', name: '개발', settings: {} }] },
      transport,
      { revision: 7, default_exec_preset_id: 'gone' }
    );
    const release = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-workspace-preset-release="gone"]')
    );

    expect(
      mount.querySelector('[data-workspace-preset-missing]')?.textContent
    ).toContain('찾을 수 없습니다');
    expect(
      mount.querySelector('[data-workspace-preset-missing]')?.textContent
    ).toContain('gone');
    expect(release.disabled).toBe(false);

    click(release);
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-default-exec-preset',
      {
        preset_id: null,
        expected_queue_revision: 7,
        expected_preset_revision: 1
      }
    );
  });

  test('blocks assigning an incompatible preset with a reason tooltip', () => {
    const transport = vi.fn();
    const { mount } = setup(
      {
        revision: 1,
        presets: [{ id: 'p1', name: '과거', settings: {}, compatible: false }]
      },
      transport
    );
    const assign = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-workspace-preset-assign="p1"]')
    );

    expect(assign.disabled).toBe(true);
    expect(assign.title).toContain('비호환');
    assign.click();
    expect(transport).not.toHaveBeenCalled();
  });

  test('always releases an incompatible current default', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: true,
      conflict: false,
      queue: {
        revision: 3,
        exec_defaults: {},
        default_exec_preset_id: null,
        runner_catalog: catalogFixture()
      },
      presets: {
        revision: 2,
        presets: [{ id: 'p1', name: '과거', settings: {}, compatible: false }]
      }
    });
    const { mount } = setup(
      {
        revision: 1,
        presets: [{ id: 'p1', name: '과거', settings: {}, compatible: false }]
      },
      transport,
      { revision: 2, default_exec_preset_id: 'p1' }
    );
    const release = /** @type {HTMLButtonElement} */ (
      mount.querySelector('[data-workspace-preset-release="p1"]')
    );

    expect(release.disabled).toBe(false);

    click(release);
    await flush();

    expect(transport).toHaveBeenCalledWith(
      'worker-queue-set-default-exec-preset',
      {
        preset_id: null,
        expected_queue_revision: 2,
        expected_preset_revision: 1
      }
    );
  });

  test('restores the release control after a failed release', async () => {
    const transport = vi.fn().mockRejectedValue(new Error('down'));
    const { mount } = setup(
      {
        revision: 1,
        presets: [{ id: 'p1', name: '개발', settings: {} }]
      },
      transport,
      { revision: 2, default_exec_preset_id: 'p1' }
    );

    click(
      /** @type {HTMLElement} */ (
        mount.querySelector('[data-workspace-preset-release="p1"]')
      )
    );
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(
      mount.querySelector('[data-workspace-preset-release="p1"]')
    ).not.toBeNull();
    expect(
      mount.querySelector('[data-workspace-default-badge]')
    ).not.toBeNull();
  });

  test('restores the missing-default card after a conflicted release', async () => {
    const transport = vi.fn().mockResolvedValue({
      applied: false,
      conflict: true,
      queue: {
        revision: 5,
        exec_defaults: {},
        default_exec_preset_id: 'gone',
        runner_catalog: catalogFixture()
      },
      presets: {
        revision: 4,
        presets: [{ id: 'p1', name: '개발', settings: {} }]
      }
    });
    const { mount } = setup(
      {
        revision: 1,
        presets: [{ id: 'p1', name: '개발', settings: {} }]
      },
      transport,
      { revision: 2, default_exec_preset_id: 'gone' }
    );

    click(
      /** @type {HTMLElement} */ (
        mount.querySelector(
          '[data-workspace-preset-missing] [data-workspace-preset-release]'
        )
      )
    );
    await flush();

    expect(transport).toHaveBeenCalledTimes(1);
    expect(
      mount.querySelector(
        '[data-workspace-preset-missing] [data-workspace-preset-release]'
      )
    ).not.toBeNull();
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
