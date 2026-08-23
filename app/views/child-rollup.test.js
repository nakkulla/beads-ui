import { html, render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { childRollupTemplate, statusDotClass } from './child-rollup.js';

/**
 * @param {any} [overrides]
 * @returns {any}
 */
function makeRollup(overrides = {}) {
  const children = overrides.children ?? [
    {
      id: 'UI-1',
      title: 'first',
      status: 'closed',
      metadata: { task_order: 1 }
    },
    {
      id: 'UI-2',
      title: 'second',
      status: 'in_progress',
      metadata: { task_order: 2 }
    }
  ];
  return {
    total: children.length,
    count: 1,
    current: null,
    ...overrides,
    children
  };
}

/**
 * @param {any} rollup
 * @param {any} opts
 * @returns {HTMLElement}
 */
function mountRollup(rollup, opts) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(childRollupTemplate(rollup, opts), mount);
  return mount;
}

describe('views/child-rollup statusDotClass', () => {
  test('maps a status to its dot modifier', () => {
    expect(statusDotClass('in_progress')).toBe(
      'board-card__dot board-card__dot--progress'
    );
    expect(statusDotClass('resolved')).toBe(
      'board-card__dot board-card__dot--resolved'
    );
    expect(statusDotClass('closed')).toBe(
      'board-card__dot board-card__dot--closed'
    );
    expect(statusDotClass('blocked')).toBe(
      'board-card__dot board-card__dot--blocked'
    );
  });

  test('falls back to the bare dot for an unknown status', () => {
    const result = statusDotClass('open');

    expect(result).toBe('board-card__dot');
  });
});

describe('views/child-rollup childRollupTemplate', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders the children N/M toggle collapsed by default', () => {
    const m = mountRollup(makeRollup(), { parent_id: 'UI-0' });

    const toggle = m.querySelector('.board-card__roll-toggle');
    expect(toggle?.textContent?.trim()).toBe('children 1/2 ▾');
    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
    expect(m.querySelector('.board-card__roll-list')).toBe(null);
  });

  test('renders the child list when expanded', () => {
    const m = mountRollup(makeRollup(), { parent_id: 'UI-0', expanded: true });

    const rows = m.querySelectorAll('.board-card__roll-child');
    expect(m.querySelector('.board-card__roll-toggle')?.textContent).toContain(
      '▴'
    );
    expect(
      Array.from(rows).map((r) => r.getAttribute('data-child-id'))
    ).toEqual(['UI-1', 'UI-2']);
  });

  test('orders the expanded rows by cmpChildOrder', () => {
    const rollup = makeRollup({
      children: [
        { id: 'UI-2', title: 'second', metadata: { task_order: 2 } },
        { id: 'UI-1', title: 'first', metadata: { task_order: 1 } }
      ]
    });

    const m = mountRollup(rollup, { parent_id: 'UI-0', expanded: true });

    const ords = Array.from(
      m.querySelectorAll('.board-card__roll-child-title')
    ).map((n) => n.textContent);
    expect(ords).toEqual(['first', 'second']);
  });

  test('renders the current child one-liner when there is one', () => {
    const rollup = makeRollup({
      current: { id: 'UI-2', title: 'second' }
    });

    const m = mountRollup(rollup, { parent_id: 'UI-0' });

    expect(m.querySelector('.board-card__cur-child')?.textContent).toContain(
      'second'
    );
  });

  test('omits the current child one-liner when there is none', () => {
    const m = mountRollup(makeRollup(), { parent_id: 'UI-0' });

    expect(m.querySelector('.board-card__roll-current')).toBe(null);
  });

  test('renders the empty label when total is 0 and a label is given', () => {
    const rollup = { total: 0, count: 0, current: null, children: [] };

    const m = mountRollup(rollup, {
      parent_id: 'UI-0',
      empty_label: 'children 없음'
    });

    expect(m.querySelector('.board-card__roll-none')?.textContent).toBe(
      'children 없음'
    );
  });

  test('renders nothing when total is 0 and no empty label is given', () => {
    const rollup = { total: 0, count: 0, current: null, children: [] };

    const result = childRollupTemplate(rollup, { parent_id: 'UI-0' });

    expect(result).toBe('');
  });

  test('renders the trailing slot inside the meta row', () => {
    const m = mountRollup(makeRollup(), {
      parent_id: 'UI-0',
      trailing: html`<span class="tail">t</span>`
    });

    expect(m.querySelector('.board-card__roll-meta .tail')).not.toBe(null);
  });

  test('carries data-roll-parent and data-child-id without handlers', () => {
    const m = mountRollup(makeRollup(), { parent_id: 'UI-0', expanded: true });

    expect(
      m
        .querySelector('.board-card__roll-toggle')
        ?.getAttribute('data-roll-parent')
    ).toBe('UI-0');
    expect(
      m.querySelector('.board-card__roll-child')?.getAttribute('data-child-id')
    ).toBe('UI-1');
  });

  test('calls onToggle when a toggle handler is supplied', () => {
    const onToggle = vi.fn();

    const m = mountRollup(makeRollup(), { parent_id: 'UI-0', onToggle });
    /** @type {HTMLElement} */ (
      m.querySelector('.board-card__roll-toggle')
    ).click();

    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  test('calls onChildClick with the child id when supplied', () => {
    const onChildClick = vi.fn();

    const m = mountRollup(makeRollup(), {
      parent_id: 'UI-0',
      expanded: true,
      onChildClick
    });
    /** @type {HTMLElement} */ (
      m.querySelector('.board-card__roll-child')
    ).click();

    expect(onChildClick).toHaveBeenCalledWith(expect.any(Event), 'UI-1');
  });

  test('renders no click listeners when no handlers are supplied', () => {
    const m = mountRollup(makeRollup(), { parent_id: 'UI-0', expanded: true });

    const toggle_click = /** @type {any} */ (
      m.querySelector('.board-card__roll-toggle')
    ).onclick;
    expect(toggle_click).toBe(null);
    expect(() => {
      /** @type {HTMLElement} */ (
        m.querySelector('.board-card__roll-child')
      ).click();
    }).not.toThrow();
  });

  test('injects per-child chips from childChips', () => {
    const childChips = (/** @type {any} */ child) =>
      html`<span class="chip">${child.id}</span>`;

    const m = mountRollup(makeRollup(), {
      parent_id: 'UI-0',
      expanded: true,
      childChips
    });

    expect(
      Array.from(m.querySelectorAll('.board-card__roll-child .chip'))
    ).toHaveLength(2);
  });

  test('renders no chips when childChips returns null', () => {
    const m = mountRollup(makeRollup(), {
      parent_id: 'UI-0',
      expanded: true,
      childChips: () => null
    });

    expect(m.querySelector('.board-card__roll-child .chip')).toBe(null);
  });
});
