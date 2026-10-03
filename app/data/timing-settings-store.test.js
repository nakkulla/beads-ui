import { describe, expect, test, vi } from 'vitest';
import {
  createTimingSettingsStore,
  isTimingSnapshot,
  queueGraceSecondsOf
} from './timing-settings-store.js';

const SNAPSHOT = {
  revision: 1,
  values: { queue_grace_seconds: 45 },
  overrides: { queue_grace_seconds: 45 },
  fields: {}
};

describe('timing settings store', () => {
  test('holds the last snapshot and notifies subscribers', () => {
    const store = createTimingSettingsStore();
    const listener = vi.fn();
    store.subscribe(listener);

    store.set(SNAPSHOT);

    expect(store.get()).toEqual(SNAPSHOT);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('forgets the snapshot on clear', () => {
    const store = createTimingSettingsStore();
    store.set(SNAPSHOT);

    store.clear();

    expect(store.get()).toBeNull();
  });

  test('accepts only a complete snapshot payload', () => {
    expect(isTimingSnapshot(SNAPSHOT)).toBe(true);
    expect(isTimingSnapshot({ revision: 1 })).toBe(false);
    expect(isTimingSnapshot(null)).toBe(false);
  });

  test('reads the queue grace seconds the server uses', () => {
    const store = createTimingSettingsStore();
    store.set(SNAPSHOT);

    expect(queueGraceSecondsOf(store)).toBe(45);
  });

  test('reports no queue grace before a snapshot arrives', () => {
    const store = createTimingSettingsStore();

    expect(queueGraceSecondsOf(store)).toBeNull();
  });
});
