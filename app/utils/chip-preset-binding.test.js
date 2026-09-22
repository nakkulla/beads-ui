import { describe, expect, test, vi } from 'vitest';
import {
  chipDisplayName,
  chipPresetBinding,
  createChipPresetToggle
} from './chip-preset-binding.js';

/** One general preset whose only setting is an explicit runtime (no catalog needed). */
const PRESET = {
  id: 'p1',
  name: '오퍼스 → 클로드',
  applies_to: 'general',
  settings: { impl_runtime: 'claude' }
};

/**
 * @param {Record<string, any>} [overrides]
 * @returns {import('./chip-preset-binding.js').ChipPresetContext}
 */
function ctx(overrides = {}) {
  return {
    bindings: { complex: 'p1', frontend: null, backend: null },
    presets: [PRESET],
    revision: 7,
    ...overrides
  };
}

describe('chipPresetBinding (UI-wg68 §5.1)', () => {
  test('reads a chip whose preset stands on the issue as applied', () => {
    const metadata = {
      chip_preset_source: 'complex',
      applied_exec_preset: 'p1',
      impl_runtime: 'claude'
    };

    const binding = chipPresetBinding(
      'complex',
      metadata,
      'spec_backed',
      ctx()
    );

    expect(binding?.state).toBe('applied');
  });

  test('reads an edited pin as diverged', () => {
    const metadata = {
      chip_preset_source: 'complex',
      applied_exec_preset: 'p1',
      impl_runtime: 'codex'
    };

    const binding = chipPresetBinding(
      'complex',
      metadata,
      'spec_backed',
      ctx()
    );

    expect(binding?.state).toBe('diverged');
  });

  test('reads another preset on the issue as unapplied', () => {
    const metadata = { applied_exec_preset: 'other' };

    const binding = chipPresetBinding(
      'complex',
      metadata,
      'spec_backed',
      ctx()
    );

    expect(binding?.state).toBe('unapplied');
  });

  test('offers a restore click once the preset stands', () => {
    const metadata = {
      chip_preset_source: 'complex',
      applied_exec_preset: 'p1',
      impl_runtime: 'claude'
    };

    const binding = chipPresetBinding(
      'complex',
      metadata,
      'spec_backed',
      ctx()
    );

    expect(binding?.title_suffix).toBe(' · 클릭: 클릭 전 설정으로 복원');
  });

  test('names the preset in the apply click hint', () => {
    const binding = chipPresetBinding('complex', {}, 'spec_backed', ctx());

    expect(binding?.title_suffix).toBe(' · 클릭: 오퍼스 → 클로드 적용');
  });

  test('refuses a binding on a quick fix issue', () => {
    const binding = chipPresetBinding('complex', {}, 'quick_fix', ctx());

    expect(binding).toBeNull();
  });

  test('refuses an unbound chip', () => {
    const binding = chipPresetBinding('frontend', {}, 'spec_backed', ctx());

    expect(binding).toBeNull();
  });

  test('refuses every chip while the snapshot has not arrived', () => {
    const binding = chipPresetBinding('complex', {}, 'spec_backed', null);

    expect(binding).toBeNull();
  });

  test('draws no state when the issue metadata is unknown', () => {
    const binding = chipPresetBinding(
      'complex',
      undefined,
      'spec_backed',
      ctx()
    );

    expect(binding?.state).toBe('');
  });

  test('refuses a binding whose preset left the snapshot', () => {
    const binding = chipPresetBinding(
      'complex',
      {},
      'spec_backed',
      ctx({ presets: [] })
    );

    expect(binding).toBeNull();
  });
});

describe('chipDisplayName (UI-wg68 §5.4)', () => {
  test('reads the area chips as their own label', () => {
    expect(chipDisplayName('frontend')).toBe('frontend');
  });

  test('reads the complex chip as its Korean chip text', () => {
    expect(chipDisplayName('complex')).toBe('복잡');
  });
});

describe('createChipPresetToggle (UI-wg68 §5.3)', () => {
  /**
   * @param {any} response
   * @returns {{ toggler: any, transport: any, toast: any, store: any }}
   */
  function harness(response) {
    let state = {
      revision: 7,
      presets: [PRESET],
      chip_bindings: { complex: 'p1', frontend: null, backend: null }
    };
    const store = {
      get: () => state,
      set: (/** @type {any} */ next) => {
        state = next;
      }
    };
    const transport = vi.fn().mockResolvedValue(response);
    const toast = vi.fn();
    return {
      toggler: createChipPresetToggle({ transport, store, toast }),
      transport,
      toast,
      store
    };
  }

  test('sends the snapshot revision and the row repo', async () => {
    const { toggler, transport } = harness({ applied: 'applied' });

    await toggler.toggle('UI-1', 'complex', '/repo');

    expect(transport).toHaveBeenCalledWith('chip-preset-toggle', {
      id: 'UI-1',
      chip: 'complex',
      expected_revision: 7,
      root_dir: '/repo'
    });
  });

  test('names the applied preset in the toast', async () => {
    const { toggler, toast } = harness({ applied: 'applied' });

    await toggler.toggle('UI-1', 'complex');

    expect(toast).toHaveBeenCalledWith(
      '복잡 → 오퍼스 → 클로드 적용',
      'success'
    );
  });

  test('says the restore happened without naming a preset', async () => {
    const { toggler, toast } = harness({ applied: 'restored' });

    await toggler.toggle('UI-1', 'complex');

    expect(toast).toHaveBeenCalledWith('클릭 전 설정으로 복원', 'success');
  });

  test('adopts the answered snapshot on a conflict', async () => {
    const { toggler, store } = harness({
      applied: false,
      conflict: true,
      revision: 9,
      presets: [],
      chip_bindings: { complex: null, frontend: null, backend: null }
    });

    await toggler.toggle('UI-1', 'complex');

    expect(store.get().revision).toBe(9);
  });

  test('asks for a second click after a conflict', async () => {
    const { toggler, toast } = harness({
      applied: false,
      conflict: true,
      revision: 9,
      presets: [],
      chip_bindings: {}
    });

    await toggler.toggle('UI-1', 'complex');

    expect(toast).toHaveBeenCalledWith(
      '프리셋 목록이 바뀌었습니다 — 다시 누르세요',
      'error'
    );
  });

  test('reports a busy chip while its request is in flight', async () => {
    const { toggler } = harness({ applied: 'applied' });

    const pending = toggler.toggle('UI-1', 'complex');
    const busy = toggler.isBusy('UI-1', 'complex');
    await pending;

    expect(busy).toBe(true);
  });
});
