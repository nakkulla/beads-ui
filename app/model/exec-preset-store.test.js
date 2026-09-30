import { describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from './exec-preset-store.js';

describe('client exec-preset store', () => {
  test('starts null and replaces total state with the last snapshot', () => {
    const store = createExecPresetStore();
    const listener = vi.fn();
    store.subscribe(listener);

    expect(store.get()).toBeNull();

    store.set({
      revision: 1,
      presets: [{ id: 'p1', name: '첫째', settings: {} }]
    });
    store.set({
      revision: 2,
      presets: [{ id: 'p2', name: '둘째', settings: {} }]
    });

    expect(store.get()).toEqual({
      revision: 2,
      presets: [{ id: 'p2', name: '둘째', settings: {} }],
      chip_bindings: { complex: null, frontend: null, backend: null }
    });
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('preserves origin compatibility and reference fields verbatim', () => {
    const store = createExecPresetStore();
    const snapshot = {
      revision: 2,
      presets: [
        {
          id: 'p2',
          name: '마이그레이션',
          settings: {},
          origin: /** @type {const} */ ({
            kind: 'workspace-exec-defaults',
            workspace_key: '/repo',
            source_digest: 'abc'
          }),
          compatible: false,
          incompatibility_reason: 'impl_runtime_required',
          reference_count: 2,
          reference_summary: [{ workspace_key: '/repo', display_name: 'repo' }]
        }
      ]
    };

    store.set(snapshot);

    expect(store.get()).toEqual({
      ...snapshot,
      chip_bindings: { complex: null, frontend: null, backend: null }
    });
  });

  test('narrows chip bindings to the chip vocabulary', () => {
    const store = createExecPresetStore();

    store.set({
      revision: 3,
      presets: [],
      chip_bindings: /** @type {any} */ ({
        complex: 'p1',
        frontend: '',
        nonsense: 'p9'
      })
    });

    expect(store.get()?.chip_bindings).toEqual({
      complex: 'p1',
      frontend: null,
      backend: null
    });
  });

  test('keeps the last bindings when a reply omits them', () => {
    const store = createExecPresetStore();
    store.set({
      revision: 3,
      presets: [],
      chip_bindings: { complex: 'p1', frontend: null, backend: null }
    });

    store.set({ revision: 4, presets: [] });

    expect(store.get()?.chip_bindings?.complex).toBe('p1');
  });
});
