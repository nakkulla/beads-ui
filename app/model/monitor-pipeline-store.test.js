import { describe, expect, test, vi } from 'vitest';
import { createMonitorPipelineStore } from './monitor-pipeline-store.js';

describe('data/monitor-pipeline-store', () => {
  test('replaces both halves of a monitor snapshot', () => {
    const store = createMonitorPipelineStore();

    store.set([{ root_dir: '/repo' }], [{ root_dir: '/repo', revision: 2 }]);

    expect(store.get()).toEqual([{ root_dir: '/repo', attempts: {} }]);
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

  test('applies ordered workspace and control changes in one notification', () => {
    const store = createMonitorPipelineStore();
    store.set(
      [{ root_dir: '/repo', slots: 1 }],
      [{ root_dir: '/repo', revision: 1 }],
      4
    );
    const listener = vi.fn();
    store.subscribe(listener);

    const accepted = store.applyPatch({
      seq: 5,
      set: {
        'ws-order': ['/other/repo', '/repo'],
        'ws//other/repo/root_dir': '/other/repo',
        'ws//repo/slots': 2,
        'state//repo': { root_dir: '/repo', revision: 2 }
      },
      unset: []
    });

    expect(accepted).toBe(true);
    expect(store.get()).toEqual([
      { root_dir: '/other/repo', attempts: {} },
      { root_dir: '/repo', slots: 2, attempts: {} }
    ]);
    expect(store.getWorkspacesState()).toEqual([
      { root_dir: '/repo', revision: 2 }
    ]);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('removes attempt and workspace control keys', () => {
    const store = createMonitorPipelineStore();
    store.set(
      [{ root_dir: '/repo', attempts: { 'UI-a-1-1': { status: 'done' } } }],
      [{ root_dir: '/repo' }]
    );

    store.applyPatch({
      seq: 2,
      set: {},
      unset: ['ws//repo/attempts/UI-a-1-1', 'state//repo']
    });

    expect(store.get()).toEqual([{ root_dir: '/repo', attempts: {} }]);
    expect(store.getWorkspacesState()).toEqual([]);
  });

  test.each([2, 3, 5])('clears both arrays on nonconsecutive seq %i', (seq) => {
    const store = createMonitorPipelineStore();
    store.set([{ root_dir: '/repo' }], [{ root_dir: '/repo' }], 3);
    const listener = vi.fn();
    store.subscribe(listener);

    const accepted = store.applyPatch({ seq, set: {}, unset: [] });

    expect(accepted).toBe(false);
    expect(store.get()).toBeNull();
    expect(store.getWorkspacesState()).toEqual([]);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('requires a new snapshot after clearing', () => {
    const store = createMonitorPipelineStore();
    store.set([], [], 4);
    store.clear();

    const accepted = store.applyPatch({ seq: 5, set: {}, unset: [] });

    expect(accepted).toBe(false);
    expect(store.get()).toBeNull();
  });

  test('resets the baseline from a new snapshot even if its content is equal', () => {
    const store = createMonitorPipelineStore();
    store.set([{ root_dir: '/repo' }], [], 4);
    const current = store.get();

    store.set([{ root_dir: '/repo' }]);
    const accepted = store.applyPatch({ seq: 2, set: {}, unset: [] });

    expect(accepted).toBe(true);
    expect(store.get()).toBe(current);
  });

  test('memoizes both arrays and ignores object field order for notifications', () => {
    const store = createMonitorPipelineStore();
    store.set(
      [{ root_dir: '/repo', slots: 2 }],
      [{ root_dir: '/repo', revision: 1 }]
    );
    const current = store.get();
    const current_state = store.getWorkspacesState();
    const listener = vi.fn();
    store.subscribe(listener);

    store.set(
      [{ slots: 2, root_dir: '/repo' }],
      [{ revision: 1, root_dir: '/repo' }]
    );
    store.applyPatch({
      seq: 2,
      set: { 'state//repo': { root_dir: '/repo', revision: 1 } },
      unset: ['missing']
    });

    expect(store.get()).toBe(current);
    expect(store.getWorkspacesState()).toBe(current_state);
    expect(listener).not.toHaveBeenCalled();
  });

  test('keeps the last known title when a patch drops it', () => {
    const store = createMonitorPipelineStore();
    store.set([{ root_dir: '/repo', bead_titles: { 'UI-1': '제목' } }], [], 1);

    store.applyPatch({
      seq: 2,
      set: { 'ws//repo/bead_titles': {} },
      unset: []
    });

    expect(store.get()?.[0].bead_titles).toEqual({ 'UI-1': '제목' });
  });

  test('keeps known titles across clear and a fresh snapshot', () => {
    const store = createMonitorPipelineStore();
    store.set([{ root_dir: '/repo', bead_titles: { 'UI-1': '제목' } }], []);
    store.clear();

    store.set([{ root_dir: '/repo' }], []);

    expect(store.get()?.[0].bead_titles).toEqual({ 'UI-1': '제목' });
  });

  test('preserves the unchanged array when only controls change', () => {
    const store = createMonitorPipelineStore();
    store.set([{ root_dir: '/repo' }], [{ root_dir: '/repo', revision: 1 }]);
    const current = store.get();
    const current_state = store.getWorkspacesState();

    store.applyPatch({
      seq: 2,
      set: { 'state//repo': { root_dir: '/repo', revision: 2 } },
      unset: []
    });

    expect(store.get()).toBe(current);
    expect(store.getWorkspacesState()).not.toBe(current_state);
  });
});
