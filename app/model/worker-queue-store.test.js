import { describe, expect, test, vi } from 'vitest';
import { createWorkerQueueStore } from './worker-queue-store.js';

/** @param {Record<string, any>} [fields] */
function queue(fields = {}) {
  return /** @type {import('./worker-queue-store.js').WorkerQueueSnapshot} */ ({
    revision: 1,
    attempts: {},
    ...fields
  });
}

describe('data/worker-queue-store', () => {
  test('replaces all keys and sequencing with a subscription snapshot', () => {
    const store = createWorkerQueueStore();
    store.setSnapshot({
      root_dir: '/repo',
      queue: queue({ slots: 2 }),
      seq: 7
    });

    store.setSnapshot({ root_dir: '/repo', queue: queue(), seq: 1 });
    const accepted = store.applyPatch({
      seq: 2,
      set: { 'queue/revision': 2 },
      unset: []
    });

    expect(accepted).toBe(true);
    expect(store.get()).toEqual(queue({ revision: 2 }));
  });

  test('treats a snapshot without seq as the first frame', () => {
    const store = createWorkerQueueStore();
    store.setSnapshot({ root_dir: '/repo', queue: queue() });

    const accepted = store.applyPatch({
      seq: 2,
      set: { 'queue/slots': 3 },
      unset: []
    });

    expect(accepted).toBe(true);
    expect(store.get()?.slots).toBe(3);
  });

  test('overlays response keys without replacing omitted baseline keys or seq', () => {
    const store = createWorkerQueueStore();
    store.setSnapshot({
      root_dir: '/repo',
      seq: 8,
      queue: queue({
        attempts: { 'UI-a-1-1': { status: 'running' } },
        slots: 2
      })
    });

    store.set(queue({ revision: 2, attempts: {} }));
    const overlaid = store.get();
    const accepted = store.applyPatch({
      seq: 9,
      set: {},
      unset: ['attempts/UI-a-1-1']
    });

    expect(overlaid).toEqual(
      queue({
        revision: 2,
        attempts: { 'UI-a-1-1': { status: 'running' } },
        slots: 2
      })
    );
    expect(accepted).toBe(true);
    expect(store.get()?.attempts).toEqual({});
  });

  test('converges when response and matching patch arrive in either order', () => {
    const response_first = createWorkerQueueStore();
    const patch_first = createWorkerQueueStore();
    const response = queue({ revision: 2, slots: 3 });
    const patch = {
      seq: 2,
      set: { 'queue/revision': 2, 'queue/slots': 3 },
      unset: []
    };
    for (const store of [response_first, patch_first]) {
      store.setSnapshot({ root_dir: '/repo', queue: queue({ slots: 2 }) });
    }

    response_first.set(response);
    response_first.applyPatch(patch);
    patch_first.applyPatch(patch);
    patch_first.set(response);

    expect(response_first.get()).toEqual(response);
    expect(patch_first.get()).toEqual(response_first.get());
  });

  test('discards a stale response without changing state or sequencing', () => {
    const store = createWorkerQueueStore();
    store.setSnapshot({
      root_dir: '/repo',
      seq: 5,
      queue: queue({ revision: 3, slots: 3 })
    });
    const current = store.get();
    const listener = vi.fn();
    store.subscribe(listener);

    store.set(queue({ revision: 2, slots: 2 }));
    const accepted = store.applyPatch({ seq: 6, set: {}, unset: [] });

    expect(store.get()).toBe(current);
    expect(listener).not.toHaveBeenCalled();
    expect(accepted).toBe(true);
  });

  test.each([2, 3, 5])('clears state on nonconsecutive seq %i', (seq) => {
    const store = createWorkerQueueStore();
    store.setSnapshot({ root_dir: '/repo', seq: 3, queue: queue() });
    const listener = vi.fn();
    store.subscribe(listener);

    const accepted = store.applyPatch({
      seq,
      set: { 'queue/slots': 9 },
      unset: []
    });

    expect(accepted).toBe(false);
    expect(store.get()).toBeNull();
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('requires a snapshot before accepting patches after an overlay', () => {
    const store = createWorkerQueueStore();
    store.set(queue());

    const accepted = store.applyPatch({ seq: 1, set: {}, unset: [] });

    expect(accepted).toBe(false);
    expect(store.get()).toBeNull();
  });

  test('keeps the memo and stays silent for equal content across all paths', () => {
    const store = createWorkerQueueStore();
    store.setSnapshot({ root_dir: '/repo', queue: queue({ slots: 2 }) });
    const current = store.get();
    const listener = vi.fn();
    store.subscribe(listener);

    store.setSnapshot({
      root_dir: '/repo',
      seq: 4,
      queue: queue({ slots: 2 })
    });
    store.set(queue({ slots: 2 }));
    const accepted = store.applyPatch({
      seq: 5,
      set: { 'queue/slots': 2 },
      unset: ['missing']
    });

    expect(store.get()).toBe(current);
    expect(store.get()).toBe(store.get());
    expect(listener).not.toHaveBeenCalled();
    expect(accepted).toBe(true);
  });

  test('notifies once for each content change across all paths', () => {
    const store = createWorkerQueueStore();
    const listener = vi.fn();
    store.subscribe(listener);

    store.setSnapshot({ root_dir: '/repo', queue: queue() });
    store.set(queue({ revision: 2, slots: 2 }));
    store.applyPatch({
      seq: 2,
      set: { 'queue/revision': 3, 'queue/slots': 3 },
      unset: []
    });

    expect(listener).toHaveBeenCalledTimes(3);
  });

  test('retains unchanged attempt objects when a different key changes', () => {
    const store = createWorkerQueueStore();
    const attempt = { status: 'running' };
    store.setSnapshot({
      root_dir: '/repo',
      queue: queue({ attempts: { 'UI-a-1-1': attempt } })
    });

    store.applyPatch({ seq: 2, set: { 'queue/slots': 3 }, unset: [] });

    expect(store.get()?.attempts['UI-a-1-1']).toBe(attempt);
  });

  test('keeps the last known title when a patch drops it', () => {
    const store = createWorkerQueueStore();
    store.setSnapshot({
      root_dir: '/repo',
      queue: queue({ bead_titles: { 'UI-1': '제목' } })
    });

    store.applyPatch({
      seq: 2,
      set: { 'queue/bead_titles': {} },
      unset: []
    });

    expect(/** @type {any} */ (store.get())?.bead_titles).toEqual({
      'UI-1': '제목'
    });
  });

  test('keeps known titles across clear and a fresh snapshot', () => {
    const store = createWorkerQueueStore();
    store.setSnapshot({
      root_dir: '/repo',
      queue: queue({ bead_titles: { 'UI-1': '제목' } })
    });
    store.clear();

    store.setSnapshot({ root_dir: '/repo', queue: queue() });

    expect(/** @type {any} */ (store.get())?.bead_titles).toEqual({
      'UI-1': '제목'
    });
  });

  test('clears sequencing and notifies only when received state is removed', () => {
    const store = createWorkerQueueStore();
    store.setSnapshot({ root_dir: '/repo', queue: queue() });
    const listener = vi.fn();
    store.subscribe(listener);

    store.clear();
    store.clear();
    const accepted = store.applyPatch({ seq: 2, set: {}, unset: [] });

    expect(accepted).toBe(false);
    expect(store.get()).toBeNull();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
