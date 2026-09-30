import { describe, expect, test, vi } from 'vitest';
import { createAdoptedQueues } from './adopted-queue.js';
import { createMonitorPipelineStore } from './monitor-pipeline-store.js';

const ROOT = '/tmp/example/repo-a';

describe('adopted mutation responses (UI-dbn6 §4.2)', () => {
  test('discards a response older than the last observed monitor row', () => {
    const adopted = createAdoptedQueues();
    adopted.observe([{ root_dir: ROOT, revision: 5 }]);

    const kept = adopted.adopt(ROOT, { revision: 4, queue: [] });

    expect(kept).toBe(false);
    expect(adopted.get(ROOT)).toBeUndefined();
  });

  test('discards a response older than the last adopted one', () => {
    const adopted = createAdoptedQueues();
    adopted.adopt(ROOT, { revision: 7, queue: ['a'] });

    const kept = adopted.adopt(ROOT, { revision: 6, queue: ['b'] });

    expect(kept).toBe(false);
    expect(adopted.get(ROOT)?.queue).toEqual(['a']);
  });

  test('keeps a response at or above every observed revision', () => {
    const adopted = createAdoptedQueues();
    adopted.observe([{ root_dir: ROOT, revision: 5 }]);

    const kept = adopted.adopt(ROOT, { revision: 6, queue: [] });

    expect(kept).toBe(true);
    expect(adopted.get(ROOT)?.revision).toBe(6);
  });

  test('leaves the monitor store untouched when a response is adopted', () => {
    const store = createMonitorPipelineStore();
    const rows = [{ root_dir: ROOT, revision: 3, queue: [] }];
    store.set(rows, [{ root_dir: ROOT, revision: 3 }], 3);
    const before = store.get();
    const listener = vi.fn();
    store.subscribe(listener);
    const adopted = createAdoptedQueues();

    adopted.adopt(ROOT, { revision: 4, queue: [{ bead_id: 'X-1' }] });

    expect(store.get()).toBe(before);
    expect(listener).not.toHaveBeenCalled();
  });

  test('prunes an adopted queue once the monitor row reaches its revision', () => {
    const adopted = createAdoptedQueues();
    adopted.adopt(ROOT, { revision: 8, queue: [] });

    adopted.observe([{ root_dir: ROOT, revision: 8 }]);

    expect(adopted.get(ROOT)).toBeUndefined();
  });

  test('overlays an adopted queue on its own row only', () => {
    const adopted = createAdoptedQueues();
    adopted.adopt(ROOT, { revision: 9, queue: ['new'] });
    const rows = [
      { root_dir: ROOT, revision: 8, queue: ['old'], runnable: ['r'] },
      { root_dir: '/other', revision: 2, queue: ['keep'] }
    ];

    const out = adopted.overlay(rows);

    expect(out).toEqual([
      { root_dir: ROOT, revision: 9, queue: ['new'], runnable: ['r'] },
      { root_dir: '/other', revision: 2, queue: ['keep'] }
    ]);
  });

  test('names the held revisions in its memo key', () => {
    const adopted = createAdoptedQueues();
    adopted.adopt('/b', { revision: 2 });
    adopted.adopt('/a', { revision: 5 });

    const key = adopted.key();

    expect(key).toBe('/a:5|/b:2');
  });
});
