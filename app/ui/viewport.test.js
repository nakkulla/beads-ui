import { describe, expect, test, vi } from 'vitest';
import { viewportOf, watchViewport } from './viewport.js';

/**
 * A `matchMedia` stub answering a fixed width and pointer kind, with change
 * listeners the test can fire.
 *
 * @param {{ width: number, coarse: boolean }} initial
 */
function fakeMedia(initial) {
  let state = { ...initial };
  /** @type {Set<() => void>} */
  const listeners = new Set();
  /** @param {string} query */
  const matchMedia = (query) => ({
    get matches() {
      const min = /min-width:\s*(\d+)px/.exec(query);
      if (min) {
        return state.width >= Number(min[1]);
      }
      return /pointer:\s*coarse/.test(query) ? state.coarse : false;
    },
    media: query,
    /**
     * @param {string} _type
     * @param {() => void} fn
     */
    addEventListener(_type, fn) {
      listeners.add(fn);
    },
    /**
     * @param {string} _type
     * @param {() => void} fn
     */
    removeEventListener(_type, fn) {
      listeners.delete(fn);
    }
  });
  return {
    matchMedia,
    /** @param {{ width: number, coarse: boolean }} next */
    change(next) {
      state = { ...next };
      for (const fn of Array.from(listeners)) {
        fn();
      }
    }
  };
}

describe('viewport branches (UI-dbn6 §3.6)', () => {
  test('reads a phone width as narrow', () => {
    const media = fakeMedia({ width: 390, coarse: true });

    const out = viewportOf(media.matchMedia);

    expect(out).toEqual({ size: 'narrow', coarse: true });
  });

  test('reads 720 up to 1099 as medium', () => {
    const media = fakeMedia({ width: 900, coarse: false });

    const out = viewportOf(media.matchMedia);

    expect(out).toEqual({ size: 'medium', coarse: false });
  });

  test('reads 1100 and wider as wide', () => {
    const media = fakeMedia({ width: 1280, coarse: false });

    const out = viewportOf(media.matchMedia);

    expect(out).toEqual({ size: 'wide', coarse: false });
  });

  test('falls back to wide fine pointer without matchMedia', () => {
    const out = viewportOf(undefined);

    expect(out).toEqual({ size: 'wide', coarse: false });
  });

  test('notifies a watcher only when a branch changes', () => {
    const media = fakeMedia({ width: 1280, coarse: false });
    const seen = vi.fn();
    watchViewport(seen, media.matchMedia);

    media.change({ width: 1300, coarse: false });
    media.change({ width: 390, coarse: true });

    expect(seen.mock.calls.map((call) => call[0])).toEqual([
      { size: 'wide', coarse: false },
      { size: 'narrow', coarse: true }
    ]);
  });
});
