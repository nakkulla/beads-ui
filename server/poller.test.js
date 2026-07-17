import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createPoller } from './poller.js';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('server/poller', () => {
  test('does not tick while no clients are connected', () => {
    const onTick = vi.fn();
    const poller = createPoller({
      intervalSeconds: 30,
      getClientCount: () => 0,
      onTick
    });
    poller.start();

    vi.advanceTimersByTime(30_000);
    vi.advanceTimersByTime(30_000);

    expect(onTick).not.toHaveBeenCalled();
    poller.stop();
  });

  test('ticks once per interval while at least one client is connected', () => {
    const onTick = vi.fn();
    const poller = createPoller({
      intervalSeconds: 30,
      getClientCount: () => 2,
      onTick
    });
    poller.start();

    vi.advanceTimersByTime(30_000);
    expect(onTick).toHaveBeenCalledTimes(1);
    vi.advanceTimersByTime(30_000);
    expect(onTick).toHaveBeenCalledTimes(2);

    poller.stop();
  });

  test('gates each tick on the live client count', () => {
    let count = 0;
    const onTick = vi.fn();
    const poller = createPoller({
      intervalSeconds: 10,
      getClientCount: () => count,
      onTick
    });
    poller.start();

    // No clients → interval fires but the tick is skipped.
    vi.advanceTimersByTime(10_000);
    expect(onTick).toHaveBeenCalledTimes(0);

    // A client connects → next interval ticks.
    count = 1;
    vi.advanceTimersByTime(10_000);
    expect(onTick).toHaveBeenCalledTimes(1);

    // Client disconnects → subsequent interval is skipped again.
    count = 0;
    vi.advanceTimersByTime(10_000);
    expect(onTick).toHaveBeenCalledTimes(1);

    poller.stop();
  });

  test('does not arm a timer when intervalSeconds is 0 (off)', () => {
    const onTick = vi.fn();
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');
    const poller = createPoller({
      intervalSeconds: 0,
      getClientCount: () => 5,
      onTick
    });
    poller.start();

    expect(setIntervalSpy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(120_000);
    expect(onTick).not.toHaveBeenCalled();

    setIntervalSpy.mockRestore();
    poller.stop();
  });

  test('treats a negative intervalSeconds as off', () => {
    const onTick = vi.fn();
    const setIntervalSpy = vi.spyOn(globalThis, 'setInterval');
    const poller = createPoller({
      intervalSeconds: -5,
      getClientCount: () => 5,
      onTick
    });
    poller.start();

    expect(setIntervalSpy).not.toHaveBeenCalled();
    vi.advanceTimersByTime(120_000);
    expect(onTick).not.toHaveBeenCalled();

    setIntervalSpy.mockRestore();
    poller.stop();
  });

  test('stop() clears the timer so no further ticks fire', () => {
    const onTick = vi.fn();
    const poller = createPoller({
      intervalSeconds: 30,
      getClientCount: () => 1,
      onTick
    });
    poller.start();

    vi.advanceTimersByTime(30_000);
    expect(onTick).toHaveBeenCalledTimes(1);

    poller.stop();
    vi.advanceTimersByTime(90_000);
    expect(onTick).toHaveBeenCalledTimes(1);
  });
});
