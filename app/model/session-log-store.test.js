import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createSessionLogStore } from './session-log-store.js';

/**
 * `last_event_at` (UI-rkly §2): the raw event payloads carry no timestamp, so
 * the drawer's "N초 전" needs a client-side source — the server's log-file
 * mtime for a snapshot, the receive time for a live append.
 */
describe('session log store', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-03T00:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test('set keeps the snapshot last_event_at it was given', () => {
    const store = createSessionLogStore();

    store.set('att-1', [{ type: 'system' }], 1234567);

    expect(store.get('att-1')?.last_event_at).toBe(1234567);
  });

  test('set without a time records no last_event_at', () => {
    const store = createSessionLogStore();

    store.set('att-1', [{ type: 'system' }]);

    expect(store.get('att-1')?.last_event_at).toBe(null);
  });

  test('append stamps the receive time over the snapshot time', () => {
    const store = createSessionLogStore();
    store.set('att-1', [{ type: 'system' }], 1);

    vi.advanceTimersByTime(5000);
    store.append('att-1', { type: 'assistant' });

    expect(store.get('att-1')?.last_event_at).toBe(Date.now());
  });

  test('append onto an unknown attempt still stamps the receive time', () => {
    const store = createSessionLogStore();

    store.append('att-2', { type: 'assistant' });

    const rec = store.get('att-2');
    expect(rec?.lines).toEqual([{ type: 'assistant' }]);
    expect(rec?.last_event_at).toBe(Date.now());
  });

  test('set replaces the buffer wholesale', () => {
    const store = createSessionLogStore();
    store.append('att-1', { type: 'a' });

    store.set('att-1', [{ type: 'b' }], 9);

    expect(store.get('att-1')?.lines).toEqual([{ type: 'b' }]);
  });

  test('notifies subscribers on append', () => {
    const store = createSessionLogStore();
    let calls = 0;
    store.subscribe(() => {
      calls += 1;
    });

    store.append('att-1', { type: 'a' });

    expect(calls).toBe(1);
  });

  test('keeps main and delegation buffers isolated by subscription id', () => {
    const store = createSessionLogStore();

    store.set('session-log:att-1', [{ type: 'main' }]);
    store.set('session-log:att-1:launch-1', [{ type: 'delegation' }]);
    store.append('session-log:att-1:launch-1', { type: 'delegation-tail' });

    expect(store.get('session-log:att-1')?.lines).toEqual([{ type: 'main' }]);
    expect(store.get('session-log:att-1:launch-1')?.lines).toEqual([
      { type: 'delegation' },
      { type: 'delegation-tail' }
    ]);
  });
});
