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
});
