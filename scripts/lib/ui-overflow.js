/**
 * Pure judgement of the width-overflow probe (UI-kqta §3.5). The browser side
 * (`scripts/ui-overflow-probe.mjs`) only measures — rects and the few computed
 * styles the rules read — and this module decides what counts as overflow, so
 * the rules can be tested without a browser.
 *
 * Rules (ported from the PR #338 `overflowProbe`): inside every visible
 * container, a descendant box or a run of text whose left or right edge passes
 * the container's by more than the tolerance is a failure, clipped or not.
 * Out of scope are descendants of an absolutely or fixed positioned element
 * (popovers, tooltips), descendants of an intentional horizontal scroller
 * (`overflow-x: auto|scroll` strictly between the item and the container),
 * text an ancestor ellipsizes, and the text inside a `<select>`.
 */

/**
 * @typedef {Object} ProbeRect
 * @property {number} left
 * @property {number} right
 * @property {number} width
 * @property {number} height
 */

/**
 * One element on the path from an item up to (not including) its container.
 *
 * @typedef {Object} ProbeStyle
 * @property {string} tag - Upper-case tag name (`SELECT`).
 * @property {string} position - Computed `position`.
 * @property {string} overflow_x - Computed `overflow-x`.
 * @property {string} text_overflow - Computed `text-overflow`.
 */

/**
 * A descendant box (`kind: 'box'`, `chain[0]` is the element itself) or one
 * text node (`kind: 'text'`, `chain[0]` is its parent element). `rects` holds
 * the box rect, or every line box of the text.
 *
 * @typedef {Object} ProbeItem
 * @property {'box'|'text'} kind
 * @property {string} name
 * @property {string} [text]
 * @property {ProbeRect[]} rects
 * @property {ProbeStyle[]} chain
 */

/**
 * @typedef {Object} ProbeContainer
 * @property {string} name
 * @property {ProbeRect} box
 * @property {boolean} hidden - `visibility: hidden` on the container.
 * @property {ProbeStyle} style - The container's own style (its ellipsis also
 * hides text that runs past it).
 * @property {ProbeItem[]} items
 */

/** Sub-pixel rounding slack, in CSS pixels. */
export const OVERFLOW_TOLERANCE_PX = 0.5;

/** At most this many failure lines are kept; the count stays exact. */
export const MAX_FAILURE_LINES = 12;

/**
 * How far the document scrolls sideways beyond the viewport.
 *
 * @param {{ scroll_width: number, inner_width: number }} metrics
 * @returns {number}
 */
export function documentOverflowPx(metrics) {
  return Math.max(0, metrics.scroll_width - metrics.inner_width);
}

/**
 * Whether the item sits under a positioned overlay or inside a scroller.
 *
 * @param {ProbeItem} item
 * @returns {boolean}
 */
export function outOfScope(item) {
  return item.chain.some((style, index) => {
    if (style.position === 'absolute' || style.position === 'fixed') {
      return true;
    }
    return (
      index > 0 &&
      (style.overflow_x === 'auto' || style.overflow_x === 'scroll')
    );
  });
}

/**
 * Whether an ancestor (or the container) cuts this text with an ellipsis, or
 * the text is a select's option label.
 *
 * @param {ProbeItem} item
 * @param {ProbeStyle} container_style
 * @returns {boolean}
 */
export function ellipsized(item, container_style) {
  return [...item.chain, container_style].some(
    (style) =>
      (style.text_overflow === 'ellipsis' && style.overflow_x !== 'visible') ||
      style.tag === 'SELECT' ||
      style.tag === 'OPTION'
  );
}

/**
 * How far a rect passes the container box sideways (0 when inside).
 *
 * @param {ProbeRect} rect
 * @param {ProbeRect} box
 * @returns {number}
 */
export function overflowPx(rect, box) {
  return Math.max(0, box.left - rect.left, rect.right - box.right);
}

/**
 * Judge every container. One failure per box, at most one per text node.
 *
 * @param {ProbeContainer[]} containers
 * @param {number} [tolerance]
 * @returns {{ containers: number, count: number, failures: string[] }}
 */
export function overflowFailures(
  containers,
  tolerance = OVERFLOW_TOLERANCE_PX
) {
  /** @type {string[]} */
  const failures = [];
  let measured = 0;
  let count = 0;
  for (const container of containers) {
    if (
      container.hidden ||
      container.box.width === 0 ||
      container.box.height === 0
    ) {
      continue;
    }
    measured += 1;
    for (const item of container.items) {
      if (outOfScope(item)) {
        continue;
      }
      if (item.kind === 'text' && ellipsized(item, container.style)) {
        continue;
      }
      const rect = item.rects.find(
        (r) =>
          r.width > 0 &&
          (item.kind === 'text' || r.height > 0) &&
          overflowPx(r, container.box) > tolerance
      );
      if (!rect) {
        continue;
      }
      count += 1;
      if (failures.length < MAX_FAILURE_LINES) {
        const label =
          item.kind === 'text'
            ? `${item.name} "${item.text || ''}"`
            : item.name;
        failures.push(
          `${container.name} > ${label} +${overflowPx(rect, container.box).toFixed(1)}px`
        );
      }
    }
  }
  return { containers: measured, count, failures };
}

/**
 * The distinct rounded heights of a control set, smallest first.
 *
 * @param {Array<{ name: string, height: number }>} controls
 * @returns {number[]}
 */
export function distinctHeights(controls) {
  return [...new Set(controls.map((c) => Math.round(c.height)))].sort(
    (a, b) => a - b
  );
}
