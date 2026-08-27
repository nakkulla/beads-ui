import { afterEach, describe, expect, test, vi } from 'vitest';
import { MOBILE_QUERY, watchMobile } from './viewport.js';

/**
 * @param {boolean} matches
 * @param {{ legacy?: boolean }} [options]
 */
function stubMatchMedia(matches, options = {}) {
  /** @type {Array<(ev: any) => void>} */
  const listeners = [];
  const mql = {
    matches,
    media: MOBILE_QUERY,
    removed: 0,
    /**
     * @param {string} _type
     * @param {(ev: any) => void} fn
     */
    addEventListener(_type, fn) {
      listeners.push(fn);
    },
    /**
     * @param {string} _type
     * @param {(ev: any) => void} fn
     */
    removeEventListener(_type, fn) {
      mql.removed += 1;
      listeners.splice(listeners.indexOf(fn), 1);
    },
    /** @param {(ev: any) => void} fn */
    addListener(fn) {
      listeners.push(fn);
    },
    /** @param {(ev: any) => void} fn */
    removeListener(fn) {
      mql.removed += 1;
      listeners.splice(listeners.indexOf(fn), 1);
    },
    /** @param {boolean} next */
    emit(next) {
      mql.matches = next;
      for (const fn of listeners.slice()) {
        fn({ matches: next });
      }
    }
  };
  if (options.legacy) {
    // @ts-expect-error — legacy-only shim, exactly what Safari < 14 exposes.
    delete mql.addEventListener;
    // @ts-expect-error — see above.
    delete mql.removeEventListener;
  }
  const matchMedia = vi.fn(() => mql);
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: matchMedia
  });
  return { mql, matchMedia };
}

afterEach(() => {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: undefined
  });
});

describe('watchMobile', () => {
  test('queries the shared mobile breakpoint', () => {
    const { matchMedia } = stubMatchMedia(false);

    watchMobile(() => {});

    expect(matchMedia).toHaveBeenCalledWith('(max-width: 640px)');
    expect(MOBILE_QUERY).toBe('(max-width: 640px)');
  });

  test('calls back synchronously with the current match', () => {
    stubMatchMedia(true);
    /** @type {boolean[]} */
    const seen = [];

    watchMobile((is_mobile) => seen.push(is_mobile));

    expect(seen).toEqual([true]);
  });

  test('calls back with false when the runtime has no matchMedia', () => {
    /** @type {boolean[]} */
    const seen = [];

    watchMobile((is_mobile) => seen.push(is_mobile));

    expect(seen).toEqual([false]);
  });

  test('returns a no-op unsubscribe when the runtime has no matchMedia', () => {
    const stop = watchMobile(() => {});

    expect(() => stop()).not.toThrow();
  });

  test('forwards a later breakpoint change', () => {
    const { mql } = stubMatchMedia(false);
    /** @type {boolean[]} */
    const seen = [];
    watchMobile((is_mobile) => seen.push(is_mobile));

    mql.emit(true);

    expect(seen).toEqual([false, true]);
  });

  test('ignores a change event that repeats the current value', () => {
    const { mql } = stubMatchMedia(false);
    /** @type {boolean[]} */
    const seen = [];
    watchMobile((is_mobile) => seen.push(is_mobile));

    mql.emit(false);

    expect(seen).toEqual([false]);
  });

  test('stops forwarding after the unsubscribe', () => {
    const { mql } = stubMatchMedia(false);
    /** @type {boolean[]} */
    const seen = [];
    const stop = watchMobile((is_mobile) => seen.push(is_mobile));

    stop();
    mql.emit(true);

    expect(mql.removed).toBe(1);
    expect(seen).toEqual([false]);
  });

  test('subscribes through the legacy listener API when that is all there is', () => {
    const { mql } = stubMatchMedia(false, { legacy: true });
    /** @type {boolean[]} */
    const seen = [];
    const stop = watchMobile((is_mobile) => seen.push(is_mobile));

    mql.emit(true);
    stop();

    expect(seen).toEqual([false, true]);
    expect(mql.removed).toBe(1);
  });
});
