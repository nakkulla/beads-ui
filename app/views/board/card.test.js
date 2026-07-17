import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { cardTemplate } from './card.js';

/**
 * @param {any} [overrides]
 * @returns {any}
 */
function makeCtx(overrides = {}) {
  return {
    onCardClick: vi.fn(),
    onCopyId: vi.fn(),
    onDragStart: vi.fn(),
    onDragEnd: vi.fn(),
    rollupFor: () => ({ total: 0, count: 0, current: null, children: [] }),
    isExpanded: () => false,
    onRollupToggle: vi.fn(),
    onChildClick: vi.fn(),
    ...overrides
  };
}

/**
 * @param {any} issue
 * @param {any} ctx
 * @returns {HTMLElement}
 */
function mountCard(issue, ctx) {
  const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
  render(cardTemplate(issue, ctx), mount);
  return mount;
}

describe('views/board/card', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders no chips / no stepper when workflow is absent', () => {
    const m = mountCard({ id: 'UI-1', title: 't', priority: 2 }, makeCtx());
    expect(m.querySelector('.board-card__chips')).toBeNull();
    expect(m.querySelector('.stp')).toBeNull();
    expect(m.querySelector('.board-card__roll-none')?.textContent).toContain(
      'children 없음'
    );
  });

  test('route chip always; fast_track + PR chips are conditional', () => {
    const m = mountCard(
      {
        id: 'UI-2',
        title: 'auth',
        status: 'in_progress',
        workflow: {
          route: 'full_plan',
          stages: {
            spec: { state: 'reviewed' },
            plan: { state: 'on' },
            impl: { state: 'dim' },
            pr: { state: 'empty' },
            merge: { state: 'empty' }
          },
          chips: {
            route: 'full_plan',
            fast_track: true,
            pr: { number: 42, ci: null }
          }
        }
      },
      makeCtx()
    );
    const chips = Array.from(
      m.querySelectorAll('.board-card__chips .ctl-chip')
    );
    const texts = chips.map((c) => c.textContent?.trim());
    expect(texts.some((t) => t === 'full_plan')).toBe(true);
    expect(texts.some((t) => t?.includes('fast_track'))).toBe(true);
    expect(texts.some((t) => t?.includes('PR #42'))).toBe(true);
    // Stepper present with 5 segments for full_plan.
    expect(m.querySelectorAll('.stp .seg').length).toBe(5);
  });

  test('PR chip absent when no pr in chips', () => {
    const m = mountCard(
      {
        id: 'UI-3',
        title: 'x',
        status: 'open',
        workflow: {
          route: 'spec_backed',
          stages: {
            spec: { state: 'dim' },
            impl: { state: 'empty' },
            pr: { state: 'empty' },
            merge: { state: 'empty' }
          },
          chips: { route: 'spec_backed', fast_track: false, pr: null }
        }
      },
      makeCtx()
    );
    const texts = Array.from(m.querySelectorAll('.ctl-chip')).map((c) =>
      c.textContent?.trim()
    );
    expect(texts.some((t) => t?.includes('PR'))).toBe(false);
    expect(texts.some((t) => t?.includes('fast_track'))).toBe(false);
    expect(texts).toContain('spec_backed');
  });

  test('rollup shows count + in_progress current child line', () => {
    const rollup = {
      total: 4,
      count: 2,
      current: {
        id: 'UI-c3',
        title: 'Phase 3: 세션 저장소 교체',
        status: 'in_progress'
      },
      children: [
        { id: 'UI-c1', title: 'Phase 1', status: 'closed' },
        { id: 'UI-c2', title: 'Phase 2', status: 'resolved' },
        {
          id: 'UI-c3',
          title: 'Phase 3: 세션 저장소 교체',
          status: 'in_progress'
        },
        { id: 'UI-c4', title: 'Phase 4', status: 'open' }
      ]
    };
    const m = mountCard(
      { id: 'UI-p', title: 'parent', status: 'in_progress' },
      makeCtx({ rollupFor: () => rollup })
    );
    expect(m.querySelector('.board-card__roll-toggle')?.textContent).toContain(
      'children 2/4'
    );
    expect(m.querySelector('.board-card__cur-child')?.textContent).toContain(
      'Phase 3'
    );
    // Collapsed by default: no child list rows.
    expect(m.querySelectorAll('.board-card__roll-child').length).toBe(0);
  });

  test('expanded rollup lists all children and toggle fires handler', () => {
    const rollup = {
      total: 2,
      count: 1,
      current: null,
      children: [
        { id: 'UI-c1', title: 'Phase 1', status: 'closed' },
        { id: 'UI-c2', title: 'Phase 2', status: 'open' }
      ]
    };
    const onRollupToggle = vi.fn();
    const m = mountCard(
      { id: 'UI-p2', title: 'parent', status: 'in_progress' },
      makeCtx({
        rollupFor: () => rollup,
        isExpanded: () => true,
        onRollupToggle
      })
    );
    expect(m.querySelectorAll('.board-card__roll-child').length).toBe(2);
    const toggle = /** @type {HTMLElement} */ (
      m.querySelector('.board-card__roll-toggle')
    );
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onRollupToggle).toHaveBeenCalled();
  });

  test('compact child rows render in cmpChildOrder with ordinals; no stepper/chips', () => {
    const rollup = {
      total: 3,
      count: 1,
      current: null,
      children: [
        {
          id: 'c3',
          title: 'Task 3: three',
          status: 'open',
          metadata: { task_order: '3' }
        },
        {
          id: 'c1',
          title: 'Task 1: one',
          status: 'closed',
          metadata: { task_order: '1' }
        },
        {
          id: 'c2',
          title: 'Task 2: two',
          status: 'in_progress',
          metadata: { task_order: '2' }
        }
      ]
    };
    const m = mountCard(
      { id: 'P', title: 'parent', status: 'in_progress' },
      makeCtx({ rollupFor: () => rollup, isExpanded: () => true })
    );
    const rows = Array.from(m.querySelectorAll('.board-card__roll-child'));
    expect(
      rows.map((r) =>
        r.querySelector('.board-card__roll-child-title')?.textContent?.trim()
      )
    ).toEqual(['Task 1: one', 'Task 2: two', 'Task 3: three']);
    expect(
      rows.map((r) =>
        r.querySelector('.board-card__roll-child-ord')?.textContent?.trim()
      )
    ).toEqual(['1', '2', '3']);
    // Compact rows carry no stepper and no workflow chips.
    expect(m.querySelector('.board-card__roll-child .stp')).toBeNull();
    expect(m.querySelector('.board-card__roll-child .ctl-chip')).toBeNull();
  });

  test('child row click calls onChildClick with the child id', () => {
    const onChildClick = vi.fn();
    const rollup = {
      total: 1,
      count: 0,
      current: null,
      children: [{ id: 'c1', title: 'Task 1: one', status: 'open' }]
    };
    const m = mountCard(
      { id: 'P', title: 'p' },
      makeCtx({ rollupFor: () => rollup, isExpanded: () => true, onChildClick })
    );
    const row = /** @type {HTMLElement} */ (
      m.querySelector('.board-card__roll-child')
    );
    row.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onChildClick).toHaveBeenCalledWith(expect.anything(), 'c1');
  });

  test('child rows are expanded by default (no explicit isExpanded); toggle collapses', () => {
    const rollup = {
      total: 2,
      count: 1,
      current: null,
      children: [
        { id: 'c1', title: 'Task 1', status: 'closed' },
        { id: 'c2', title: 'Task 2', status: 'open' }
      ]
    };
    const onRollupToggle = vi.fn();
    // ctx WITHOUT isExpanded → the card must default to expanded.
    const ctx = {
      onCardClick: vi.fn(),
      onCopyId: vi.fn(),
      onDragStart: vi.fn(),
      onDragEnd: vi.fn(),
      rollupFor: () => rollup,
      onRollupToggle,
      onChildClick: vi.fn()
    };
    const m = mountCard({ id: 'P', title: 'p', status: 'open' }, ctx);
    expect(m.querySelectorAll('.board-card__roll-child').length).toBe(2);
    const toggle = /** @type {HTMLElement} */ (
      m.querySelector('.board-card__roll-toggle')
    );
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    expect(onRollupToggle).toHaveBeenCalled();
  });
});
