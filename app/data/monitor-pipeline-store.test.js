import { describe, expect, test } from 'vitest';
import { createMonitorPipelineStore } from './monitor-pipeline-store.js';

describe('data/monitor-pipeline-store', () => {
  test('replaces both halves of a monitor snapshot', () => {
    const store = createMonitorPipelineStore();

    store.set([{ root_dir: '/repo' }], [{ root_dir: '/repo', revision: 2 }]);

    expect(store.get()).toEqual([{ root_dir: '/repo' }]);
    expect(store.getWorkspacesState()).toEqual([
      { root_dir: '/repo', revision: 2 }
    ]);
  });

  test('clears received monitor state', () => {
    const store = createMonitorPipelineStore();
    store.set([], []);

    store.clear();

    expect(store.get()).toBeNull();
    expect(store.getWorkspacesState()).toEqual([]);
  });
});
