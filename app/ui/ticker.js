/**
 * One-second time text ticker (UI-dbn6 §3.4). Relative times, elapsed clocks
 * and countdowns are drawn as `[data-ts]` elements; this ticker rewrites ONLY
 * their text once a second and never calls `render.js`. A time that changes
 * what is VISIBLE (a grace chip disappearing) is not the ticker's business —
 * the lane model reports that boundary and the screen re-renders then.
 *
 * Markup contract: `data-ts` = epoch ms, `data-ts-fmt` = one of the formats
 * below (default `rel`), optional `data-ts-pre` / `data-ts-post` wrap a
 * non-empty value.
 */
import {
  formatElapsedSince,
  formatRelativeTime
} from '../model/relative-time.js';

export const TICK_MS = 1_000;

/**
 * `MmSSs` / `Ss` running clock — the running tile's elapsed label.
 *
 * @param {number} ms
 * @returns {string}
 */
function clockText(ms) {
  if (!Number.isFinite(ms) || ms < 0) {
    return '0s';
  }
  const total = Math.floor(ms / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${String(minutes % 60).padStart(2, '0')}m`;
  }
  return minutes > 0
    ? `${minutes}m ${String(seconds).padStart(2, '0')}s`
    : `${seconds}s`;
}

/**
 * Format one timestamp for the ticker. Unknown formats fall back to `rel`.
 *
 * @param {string} fmt - `rel` · `since` · `elapsed` · `countdown` · `min` ·
 * `until-min`.
 * @param {number} ts
 * @param {number} now
 * @returns {string}
 */
export function formatTs(fmt, ts, now) {
  if (!Number.isFinite(ts)) {
    return '';
  }
  switch (fmt) {
    case 'since':
      return formatElapsedSince(ts, now);
    case 'elapsed':
      return clockText(now - ts);
    case 'countdown': {
      const left = ts - now;
      return left > 0 ? `${Math.ceil(left / 1000)}초` : '';
    }
    case 'min':
      return `${Math.max(0, Math.floor((now - ts) / 60_000))}분`;
    case 'until-min': {
      const left = ts - now;
      return left > 0 ? `${Math.ceil(left / 60_000)}분` : '';
    }
    default:
      return formatRelativeTime(ts, now);
  }
}

/**
 * The text one `[data-ts]` element should show now.
 *
 * @param {HTMLElement} el
 * @param {number} now
 * @returns {string}
 */
export function timeTextOf(el, now) {
  const value = formatTs(el.dataset.tsFmt || 'rel', Number(el.dataset.ts), now);
  return value
    ? `${el.dataset.tsPre || ''}${value}${el.dataset.tsPost || ''}`
    : '';
}

/**
 * Rewrite the text of every `[data-ts]` element under `root`.
 *
 * @param {ParentNode|null|undefined} root
 * @param {number} now
 * @returns {number} How many elements changed.
 */
export function refreshTimeText(root, now) {
  if (!root || typeof root.querySelectorAll !== 'function') {
    return 0;
  }
  let changed = 0;
  for (const node of Array.from(root.querySelectorAll('[data-ts]'))) {
    const el = /** @type {HTMLElement} */ (node);
    const next = timeTextOf(el, now);
    if (el.textContent !== next) {
      el.textContent = next;
      changed += 1;
    }
  }
  return changed;
}

/**
 * @param {{ root: () => ParentNode|null|undefined, now?: () => number, interval?: number }} options
 */
export function createTicker(options) {
  const now = options.now || (() => Date.now());
  const interval = options.interval || TICK_MS;
  /** @type {ReturnType<typeof setInterval>|null} */
  let timer = null;

  function tick() {
    refreshTimeText(options.root(), now());
  }

  return {
    tick,
    start() {
      if (timer !== null) {
        return;
      }
      timer = setInterval(tick, interval);
    },
    stop() {
      if (timer !== null) {
        clearInterval(timer);
        timer = null;
      }
    }
  };
}
