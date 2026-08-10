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
      presets: [{ id: 'p2', name: '둘째', settings: {} }]
    });
    expect(listener).toHaveBeenCalledTimes(2);
  });
});
