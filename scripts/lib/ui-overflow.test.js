import { describe, expect, test } from 'vitest';
import {
  distinctHeights,
  documentOverflowPx,
  ellipsized,
  outOfScope,
  overflowFailures
} from './ui-overflow.js';

/**
 * @param {number} left
 * @param {number} right
 * @param {number} [height]
 * @returns {import('./ui-overflow.js').ProbeRect}
 */
function rect(left, right, height = 10) {
  return { left, right, width: right - left, height };
}

/**
 * @param {Partial<import('./ui-overflow.js').ProbeStyle>} [patch]
 * @returns {import('./ui-overflow.js').ProbeStyle}
 */
function style(patch = {}) {
  return {
    tag: 'DIV',
    position: 'static',
    overflow_x: 'visible',
    text_overflow: 'clip',
    ...patch
  };
}

/**
 * @param {import('./ui-overflow.js').ProbeItem[]} items
 * @param {Partial<import('./ui-overflow.js').ProbeContainer>} [patch]
 * @returns {import('./ui-overflow.js').ProbeContainer}
 */
function container(items, patch = {}) {
  return {
    name: 'div.worker-card',
    box: rect(0, 100, 50),
    hidden: false,
    style: style(),
    items,
    ...patch
  };
}

/**
 * @param {import('./ui-overflow.js').ProbeRect} r
 * @param {import('./ui-overflow.js').ProbeStyle[]} [chain]
 * @returns {import('./ui-overflow.js').ProbeItem}
 */
function box(r, chain = [style()]) {
  return { kind: 'box', name: 'span.ctl-chip', rects: [r], chain };
}

/**
 * @param {import('./ui-overflow.js').ProbeRect[]} rects
 * @param {import('./ui-overflow.js').ProbeStyle[]} [chain]
 * @returns {import('./ui-overflow.js').ProbeItem}
 */
function text(rects, chain = [style()]) {
  return { kind: 'text', name: 'span.title', text: 'long', rects, chain };
}

describe('documentOverflowPx', () => {
  test('reports the sideways scroll beyond the viewport', () => {
    const over = documentOverflowPx({ scroll_width: 402, inner_width: 390 });

    expect(over).toBe(12);
  });

  test('reports zero when the document fits', () => {
    const over = documentOverflowPx({ scroll_width: 390, inner_width: 390 });

    expect(over).toBe(0);
  });
});

describe('overflowFailures', () => {
  test('flags a box that passes the container edge', () => {
    const probe = [container([box(rect(90, 112))])];

    const result = overflowFailures(probe);

    expect(result.count).toBe(1);
    expect(result.failures).toEqual([
      'div.worker-card > span.ctl-chip +12.0px'
    ]);
  });

  test('ignores a sub-pixel overhang within the tolerance', () => {
    const probe = [container([box(rect(0, 100.4))])];

    const result = overflowFailures(probe);

    expect(result.count).toBe(0);
  });

  test('flags a box that starts left of the container', () => {
    const probe = [container([box(rect(-3, 40))])];

    const result = overflowFailures(probe);

    expect(result.failures).toEqual(['div.worker-card > span.ctl-chip +3.0px']);
  });

  test('skips a box under an absolutely positioned ancestor', () => {
    const chain = [style(), style({ position: 'absolute' })];
    const probe = [container([box(rect(90, 300), chain)])];

    const result = overflowFailures(probe);

    expect(result.count).toBe(0);
  });

  test('skips a box inside an intentional horizontal scroller', () => {
    const chain = [style(), style({ overflow_x: 'auto' })];
    const probe = [container([box(rect(90, 300), chain)])];

    const result = overflowFailures(probe);

    expect(result.count).toBe(0);
  });

  test('flags the scroller itself when it passes the container', () => {
    const chain = [style({ overflow_x: 'auto' })];
    const probe = [container([box(rect(90, 300), chain)])];

    const result = overflowFailures(probe);

    expect(result.count).toBe(1);
  });

  test('flags a run of text on any of its line boxes', () => {
    const probe = [container([text([rect(0, 80), rect(0, 130)])])];

    const result = overflowFailures(probe);

    expect(result.failures).toEqual([
      'div.worker-card > span.title "long" +30.0px'
    ]);
  });

  test('skips text an ancestor ellipsizes', () => {
    const chain = [style({ text_overflow: 'ellipsis', overflow_x: 'hidden' })];
    const probe = [container([text([rect(0, 130)], chain)])];

    const result = overflowFailures(probe);

    expect(result.count).toBe(0);
  });

  test('skips the option text of a select', () => {
    const chain = [style({ tag: 'OPTION' }), style({ tag: 'SELECT' })];
    const probe = [container([text([rect(0, 130)], chain)])];

    const result = overflowFailures(probe);

    expect(result.count).toBe(0);
  });

  test('skips hidden and zero-size containers', () => {
    const probe = [
      container([box(rect(0, 300))], { hidden: true }),
      container([box(rect(0, 300))], { box: rect(0, 0, 0) })
    ];

    const result = overflowFailures(probe);

    expect(result).toEqual({ containers: 0, count: 0, failures: [] });
  });

  test('keeps counting beyond the reported failure lines', () => {
    const items = Array.from({ length: 20 }, () => box(rect(0, 120)));

    const result = overflowFailures([container(items)]);

    expect(result.count).toBe(20);
    expect(result.failures).toHaveLength(12);
  });
});

describe('scope helpers', () => {
  test('treats an element that is itself fixed as out of scope', () => {
    const item = box(rect(0, 10), [style({ position: 'fixed' })]);

    expect(outOfScope(item)).toBe(true);
  });

  test('reads the container ellipsis for its own text', () => {
    const item = text([rect(0, 10)]);

    const cut = ellipsized(
      item,
      style({ text_overflow: 'ellipsis', overflow_x: 'hidden' })
    );

    expect(cut).toBe(true);
  });
});

describe('distinctHeights', () => {
  test('rounds and deduplicates control heights', () => {
    const heights = distinctHeights([
      { name: 'a', height: 24 },
      { name: 'b', height: 23.8 },
      { name: 'c', height: 32 }
    ]);

    expect(heights).toEqual([24, 32]);
  });
});
