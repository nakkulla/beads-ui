/**
 * Live time text (UI-yu2o). Relative times, running clocks and countdowns are
 * drawn as `[data-ts]` elements; a one-second ticker rewrites ONLY their text
 * and never re-renders the view. A time that changes what is VISIBLE (a grace
 * chip disappearing) is not the ticker's business — the view re-renders once
 * at that boundary.
 *
 * Markup contract: `data-ts` = epoch ms, `data-ts-fmt` = one of the formats of
 * {@link formatTs}, optional `data-ts-pre` / `data-ts-post` wrap a non-empty
 * value. The first paint is computed with the same formatter, so the text is
 * right before the ticker's first beat and both paths read identically.
 */
import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import {
  coerceTimestampMs,
  formatElapsedSince,
  formatRelativeTime
} from '../utils/relative-time.js';
import { externalJobElapsed } from './worker/wait-vocabulary.js';

/** How often the ticker rewrites the time text. */
export const TICK_MS = 1_000;

/**
 * Format an elapsed duration (ms) as `MmSSs` / `SSs` — the running tile's
 * clock. Both tabs draw a running attempt's elapsed through this one function
 * (UI-53es §1): the same fact must not read differently on two tabs.
 *
 * @param {number} ms
 * @returns {string}
 */
export function formatElapsed(ms) {
  if (!Number.isFinite(ms) || ms < 0) {
    return '0s';
  }
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
}

/**
 * Format one timestamp. Unknown formats fall back to `rel`.
 *
 * - `rel` — `3분 전` ({@link formatRelativeTime}).
 * - `since` — `3분째` ({@link formatElapsedSince}).
 * - `dur` — `3분`, `since` without its running suffix.
 * - `clock` — `2m 05s`, the running tile's elapsed ({@link formatElapsed}).
 * - `countdown` — `5초` left, empty once it passes.
 * - `until-min` — `5분` left, empty once it passes.
 * - `min` — whole minutes since, `12분`.
 * - `hm` — `1h02m` since, never negative.
 * - `job` — an unfinished external job's elapsed (`<1m`·`12m`·`1h02m`).
 *
 * @param {string} fmt
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
    case 'dur':
      return formatElapsedSince(ts, now).replace(/째$/, '');
    case 'clock':
      return formatElapsed(now - ts);
    case 'countdown': {
      const left = ts - now;
      return left > 0 ? `${Math.ceil(left / 1000)}초` : '';
    }
    case 'until-min': {
      const left = ts - now;
      return left > 0 ? `${Math.ceil(left / 60_000)}분` : '';
    }
    case 'min':
      return `${Math.floor((now - ts) / 60_000)}분`;
    case 'hm': {
      const minutes = Math.max(0, Math.floor((now - ts) / 60_000));
      return `${Math.floor(minutes / 60)}h${String(minutes % 60).padStart(2, '0')}m`;
    }
    case 'job':
      return externalJobElapsed(ts, now);
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
 * A `[data-ts]` span. The text is a `.textContent` property binding, not a
 * child part: the ticker rewrites `textContent`, which would eject a child
 * part's marker nodes and break the next render. An unparseable timestamp
 * draws nothing (fail-quiet).
 *
 * @param {number|string|null|undefined} timestamp
 * @param {string} fmt
 * @param {number} now
 * @param {{ pre?: string, post?: string, cls?: string, title?: string }} [options]
 * @returns {import('lit-html').TemplateResult|''}
 */
export function timeSpan(timestamp, fmt, now, options = {}) {
  const ts = coerceTimestampMs(timestamp);
  if (ts === null) {
    return '';
  }
  const value = formatTs(fmt, ts, now);
  return html`<span
    class=${ifDefined(options.cls)}
    title=${ifDefined(options.title)}
    data-ts=${String(ts)}
    data-ts-fmt=${fmt}
    data-ts-pre=${ifDefined(options.pre)}
    data-ts-post=${ifDefined(options.post)}
    .textContent=${value
      ? `${options.pre || ''}${value}${options.post || ''}`
      : ''}
  ></span>`;
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
