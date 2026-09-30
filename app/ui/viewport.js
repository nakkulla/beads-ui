/**
 * Viewport branches of the mobile-first layout (UI-dbn6 §3.6·§4.4): `narrow`
 * below 720px (one lane at a time + lane bar), `medium` 720–1099px, `wide`
 * from 1100px (five columns), and the pointer kind — a coarse pointer gets the
 * `⋯` move sheet instead of `✕` and mouse drag.
 */

export const MEDIUM_MIN_PX = 720;
export const WIDE_MIN_PX = 1100;

/**
 * @typedef {{ size: 'narrow'|'medium'|'wide', coarse: boolean }} ViewportState
 * @typedef {(query: string) => { matches: boolean, addEventListener?: (type: string, fn: () => void) => void, removeEventListener?: (type: string, fn: () => void) => void }} MatchMedia
 */

/**
 * @param {MatchMedia|undefined} [matchMedia]
 * @returns {MatchMedia|undefined}
 */
function mediaOf(matchMedia) {
  if (matchMedia) {
    return matchMedia;
  }
  return typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function'
    ? (query) => window.matchMedia(query)
    : undefined;
}

/**
 * The current branch. Without `matchMedia` (non-browser) it reads as wide with
 * a fine pointer, the layout the rest of the code already renders safely.
 *
 * @param {MatchMedia|undefined} [matchMedia]
 * @returns {ViewportState}
 */
export function viewportOf(matchMedia) {
  const media = mediaOf(matchMedia);
  if (!media) {
    return { size: 'wide', coarse: false };
  }
  const wide = media(`(min-width: ${WIDE_MIN_PX}px)`).matches;
  const medium = media(`(min-width: ${MEDIUM_MIN_PX}px)`).matches;
  return {
    size: wide ? 'wide' : medium ? 'medium' : 'narrow',
    coarse: media('(pointer: coarse)').matches
  };
}

/**
 * Call `fn` once with the current branch, then whenever the branch changes
 * (not on every resize).
 *
 * @param {(state: ViewportState) => void} fn
 * @param {MatchMedia|undefined} [matchMedia]
 * @returns {() => void} Detach.
 */
export function watchViewport(fn, matchMedia) {
  const media = mediaOf(matchMedia);
  let last = viewportOf(media);
  fn(last);
  if (!media) {
    return () => {};
  }
  const queries = [
    media(`(min-width: ${WIDE_MIN_PX}px)`),
    media(`(min-width: ${MEDIUM_MIN_PX}px)`),
    media('(pointer: coarse)')
  ];
  const onChange = () => {
    const next = viewportOf(media);
    if (next.size !== last.size || next.coarse !== last.coarse) {
      last = next;
      fn(next);
    }
  };
  for (const query of queries) {
    query.addEventListener?.('change', onChange);
  }
  return () => {
    for (const query of queries) {
      query.removeEventListener?.('change', onChange);
    }
  };
}
