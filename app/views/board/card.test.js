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
            spec: { fill: 'full', glyph: 'review', stale: false },
            plan: { fill: 'full', glyph: null, stale: false },
            impl: { fill: 'dim', glyph: null, stale: false },
            pr: { fill: 'none', glyph: null, stale: false },
            merge: { fill: 'none', glyph: null, stale: false }
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

  test('derived route chip renders dimmed as unset; explicit stays plain', () => {
    const derived = mountCard(
      {
        id: 'UI-9',
        title: 'd',
        status: 'open',
        workflow: {
          route: 'spec_backed',
          stages: {
            spec: { fill: 'dim', glyph: null, stale: false },
            impl: { fill: 'none', glyph: null, stale: false },
            pr: { fill: 'none', glyph: null, stale: false },
            merge: { fill: 'none', glyph: null, stale: false }
          },
          chips: {
            route: 'spec_backed',
            route_source: 'derived',
            fast_track: false,
            pr: null
          }
        }
      },
      makeCtx()
    );
    const chip = /** @type {HTMLElement} */ (
      derived.querySelector('.ctl-chip--route')
    );
    expect(chip.classList.contains('is-derived')).toBe(true);
    expect(chip.textContent?.trim()).toBe('unset');
    expect(chip.title).toBe('route 미핀 (metadata unset)');

    document.body.innerHTML = '<div id="m"></div>';
    const explicit = mountCard(
      {
        id: 'UI-10',
        title: 'e',
        status: 'open',
        workflow: {
          route: 'spec_backed',
          stages: {
            spec: { fill: 'dim', glyph: null, stale: false },
            impl: { fill: 'none', glyph: null, stale: false },
            pr: { fill: 'none', glyph: null, stale: false },
            merge: { fill: 'none', glyph: null, stale: false }
          },
          chips: {
            route: 'spec_backed',
            route_source: 'explicit',
            fast_track: false,
            pr: null
          }
        }
      },
      makeCtx()
    );
    const chip2 = /** @type {HTMLElement} */ (
      explicit.querySelector('.ctl-chip--route')
    );
    expect(chip2.classList.contains('is-derived')).toBe(false);
    expect(chip2.textContent?.trim()).toBe('spec_backed');
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
            spec: { fill: 'dim', glyph: null, stale: false },
            impl: { fill: 'none', glyph: null, stale: false },
            pr: { fill: 'none', glyph: null, stale: false },
            merge: { fill: 'none', glyph: null, stale: false }
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

describe('views/board/card created/updated meta (UX v3 spec §1)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders both relative times with local absolute tooltips', async () => {
    const { formatTimestampLocal } =
      await import('../../utils/relative-time.js');
    const now = Date.now();
    const created = now - 3 * 86_400_000;
    const updated = now - 2 * 3_600_000;
    const m = mountCard(
      { id: 'UI-1', title: 't', created_at: created, updated_at: updated },
      makeCtx()
    );
    const times = /** @type {HTMLElement[]} */ (
      Array.from(m.querySelectorAll('.board-card__time'))
    );
    expect(times).toHaveLength(2);
    expect(times[0].textContent).toContain('생성');
    expect(times[0].textContent).toContain('3일 전');
    expect(times[0].getAttribute('title')).toBe(
      `생성 ${formatTimestampLocal(created)}`
    );
    expect(times[1].textContent).toContain('수정');
    expect(times[1].textContent).toContain('2시간 전');
    expect(times[1].getAttribute('title')).toBe(
      `수정 ${formatTimestampLocal(updated)}`
    );
    expect(times[1].getAttribute('title')).toMatch(
      /^수정 \d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
    );
  });

  test('omits the meta entirely when both timestamps are absent', () => {
    const m = mountCard({ id: 'UI-2', title: 't' }, makeCtx());
    expect(m.querySelector('.board-card__times')).toBeNull();
    expect(m.querySelectorAll('.board-card__time')).toHaveLength(0);
  });

  test('renders a single time without a separator when only created_at exists', () => {
    const m = mountCard(
      { id: 'UI-3', title: 't', created_at: Date.now() - 60_000 },
      makeCtx()
    );
    expect(m.querySelectorAll('.board-card__time')).toHaveLength(1);
    expect(m.querySelector('.board-card__time-sep')).toBeNull();
  });
});

describe('views/board/card display policy', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Partial<Omit<import('../../utils/label-policy.js').DisplayPolicy, 'chips'>> & { chips?: Partial<import('../../utils/label-policy.js').DisplayPolicyChips> }} [overrides]
   * @returns {any}
   */
  function makePolicy(overrides = {}) {
    const { chips: chip_overrides, ...rest } = overrides;
    return {
      revision: 1,
      hidden_labels: [],
      hidden_prefixes: [],
      visible_labels: [],
      ...rest,
      chips: {
        route: true,
        fast_track: true,
        pr: true,
        from: true,
        blocked: true,
        stepper: true,
        ...chip_overrides
      }
    };
  }

  /**
   * @param {HTMLElement} m
   * @param {string} selector
   * @returns {string[]}
   */
  function chipTexts(m, selector) {
    return Array.from(m.querySelectorAll(selector)).map((el) =>
      String(el.textContent || '').trim()
    );
  }

  test('renders every bead label when the policy hides nothing', () => {
    const m = mountCard(
      { id: 'UI-1', labels: ['frontend', 'backend'] },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--label')).toEqual(['frontend', 'backend']);
  });

  test('omits labels the policy hides by exact match', () => {
    const m = mountCard(
      { id: 'UI-1', labels: ['frontend', 'pr'] },
      makeCtx({ policy: makePolicy({ hidden_labels: ['pr'] }) })
    );

    expect(chipTexts(m, '.ctl-chip--label')).toEqual(['frontend']);
  });

  test('omits labels the policy hides by prefix', () => {
    const m = mountCard(
      { id: 'UI-1', labels: ['reviewed:spec', 'frontend'] },
      makeCtx({ policy: makePolicy({ hidden_prefixes: ['reviewed:'] }) })
    );

    expect(chipTexts(m, '.ctl-chip--label')).toEqual(['frontend']);
  });

  test('restores a prefix-hidden label listed in visible_labels', () => {
    const m = mountCard(
      { id: 'UI-1', labels: ['reviewed:spec', 'reviewed:impl'] },
      makeCtx({
        policy: makePolicy({
          hidden_prefixes: ['reviewed:'],
          visible_labels: ['reviewed:impl']
        })
      })
    );

    expect(chipTexts(m, '.ctl-chip--label')).toEqual(['reviewed:impl']);
  });

  test('renders every label when no policy has arrived yet', () => {
    const m = mountCard(
      { id: 'UI-1', labels: ['has:spec'] },
      makeCtx({ policy: null })
    );

    expect(chipTexts(m, '.ctl-chip--label')).toEqual(['has:spec']);
  });

  test('renders a provenance chip for a discovered-from origin', () => {
    const m = mountCard(
      { id: 'UI-1', from_id: 'UI-0' },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--from')).toEqual(['↩ from UI-0']);
  });

  test('navigates to the origin bead when the provenance chip is clicked', () => {
    const onFromChipClick = vi.fn();
    const m = mountCard(
      { id: 'UI-1', from_id: 'UI-0' },
      makeCtx({ policy: makePolicy(), onFromChipClick })
    );

    /** @type {HTMLElement} */ (
      m.querySelector('.ctl-chip--from')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onFromChipClick).toHaveBeenCalledWith(expect.anything(), 'UI-0');
  });

  test('does not open the card itself when the provenance chip is clicked', () => {
    const onCardClick = vi.fn();
    const m = mountCard(
      { id: 'UI-1', from_id: 'UI-0' },
      makeCtx({ policy: makePolicy(), onCardClick, onFromChipClick: vi.fn() })
    );

    /** @type {HTMLElement} */ (
      m.querySelector('.ctl-chip--from')
    ).dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(onCardClick).not.toHaveBeenCalled();
  });

  test('renders an external blocked chip with its reason', () => {
    const m = mountCard(
      {
        id: 'UI-1',
        blocked_info: { external: true, reason: '릴리스 대기', blockers: [] }
      },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--blocked')).toEqual([
      '⏸ blocked: 릴리스 대기'
    ]);
  });

  test('renders a bare external blocked chip when no reason is set', () => {
    const m = mountCard(
      {
        id: 'UI-1',
        blocked_info: { external: true, reason: null, blockers: [] }
      },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--blocked')).toEqual(['⏸ blocked']);
  });

  test('renders a dependency blocked chip listing the blockers', () => {
    const m = mountCard(
      {
        id: 'UI-1',
        blocked_info: { external: false, reason: null, blockers: ['A', 'B'] }
      },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--blocked-dep')).toEqual(['⛓ blocked: A, B']);
  });

  test('collapses blockers past the first two into a +n suffix', () => {
    const m = mountCard(
      {
        id: 'UI-1',
        blocked_info: {
          external: false,
          reason: null,
          blockers: ['A', 'B', 'C', 'D']
        }
      },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--blocked-dep')).toEqual([
      '⛓ blocked: A, B +2'
    ]);
  });

  test('renders both blocked chips when an issue is blocked in both ways', () => {
    const m = mountCard(
      {
        id: 'UI-1',
        blocked_info: { external: true, reason: '검토 대기', blockers: ['A'] }
      },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--blocked').length).toBe(1);
    expect(chipTexts(m, '.ctl-chip--blocked-dep').length).toBe(1);
  });

  test('renders the PR chip with the number only', () => {
    const m = mountCard(
      { id: 'UI-1', workflow: { chips: { pr: { number: 42 } } } },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--pr')).toEqual(['PR #42']);
  });

  test('renders execution and implementation entry chips', () => {
    const m = mountCard(
      {
        id: 'UI-1',
        workflow: {
          chips: {
            exec_receipt: {
              kind: 'delegated',
              actor: 'gpt-5.6-sol',
              sha: 'a'.repeat(40)
            },
            impl_entry: { actor: 'user', sha: 'b'.repeat(40) }
          }
        }
      },
      makeCtx({ policy: makePolicy() })
    );

    expect(chipTexts(m, '.ctl-chip--exec-receipt')).toEqual([
      'exec gpt-5.6-sol · aaaaaaa'
    ]);
    expect(chipTexts(m, '.ctl-chip--impl-entry')).toEqual([
      'impl user · bbbbbbb'
    ]);
  });

  test('omits absent execution metadata chips', () => {
    const m = mountCard(
      { id: 'UI-1', workflow: { chips: {} } },
      makeCtx({ policy: makePolicy() })
    );

    expect(m.querySelector('.ctl-chip--exec-receipt')).toBeNull();
    expect(m.querySelector('.ctl-chip--impl-entry')).toBeNull();
  });

  test('omits the provenance chip when its toggle is off', () => {
    const m = mountCard(
      { id: 'UI-1', from_id: 'UI-0' },
      makeCtx({ policy: makePolicy({ chips: { from: false } }) })
    );

    expect(m.querySelector('.ctl-chip--from')).toBeNull();
  });

  test('omits the blocked chips when their toggle is off', () => {
    const m = mountCard(
      {
        id: 'UI-1',
        blocked_info: { external: true, reason: null, blockers: ['A'] }
      },
      makeCtx({ policy: makePolicy({ chips: { blocked: false } }) })
    );

    expect(m.querySelector('.ctl-chip--blocked')).toBeNull();
    expect(m.querySelector('.ctl-chip--blocked-dep')).toBeNull();
  });

  test('renders cleanup failure evidence without AI diagnosis controls', () => {
    const m = mountCard(
      { id: 'UI-1', title: 'cleanup failed' },
      makeCtx({
        policy: makePolicy(),
        cleanupFailureFor: () => ({
          step: 'post_merge_verify',
          reason: 'verify_cmd_failed',
          diagnosis: {
            verdict: 'regression',
            evidence: 'historical diagnosis must remain passive'
          }
        })
      })
    );

    const chip = /** @type {HTMLElement} */ (
      m.querySelector('.ctl-chip--cleanup')
    );

    expect(chip.textContent).toContain('정리 멈춤');
    expect(m.querySelector('.board-card__cleanup-diagnose')).toBeNull();
    expect(m.querySelector('.board-card__cleanup-diagnosis')).toBeNull();
  });

  test('does not expose durable cleanup diagnosis details on the card', () => {
    const m = mountCard(
      { id: 'UI-1', title: 'cleanup failed' },
      makeCtx({
        policy: makePolicy(),
        cleanupFailureFor: () => ({
          step: 'post_merge_verify',
          reason: 'verify_cmd_failed',
          diagnosis: {
            verdict: 'regression',
            evidence: 'same assertion fails on the merge head',
            fix_bead_id: 'UI-fix'
          }
        })
      })
    );

    expect(m.querySelector('.board-card__cleanup-diagnosis')).toBeNull();
    expect(m.textContent).not.toContain('same assertion fails');
    expect(m.textContent).not.toContain('UI-fix');
  });

  test('does not expose malformed cleanup diagnosis on the card', () => {
    const m = mountCard(
      { id: 'UI-1', title: 'cleanup failed' },
      makeCtx({
        policy: makePolicy(),
        cleanupFailureFor: () => ({
          step: 'post_merge_verify',
          reason: 'verify_cmd_failed',
          diagnosis: {
            verdict: 'malformed',
            evidence: 'diagnosis result is absent',
            malformed: true
          }
        })
      })
    );

    expect(m.querySelector('.board-card__cleanup-diagnosis')).toBeNull();
    expect(m.textContent).not.toContain('판정 불가');
  });

  test('omits cleanup controls without a failure or when blocked chips are disabled', () => {
    const missing = mountCard(
      { id: 'UI-1', title: 'quiet' },
      makeCtx({ cleanupFailureFor: () => null })
    );

    expect(missing.querySelector('.ctl-chip--cleanup')).toBeNull();
    expect(missing.querySelector('.board-card__cleanup-diagnose')).toBeNull();

    document.body.innerHTML = '<div id="m"></div>';
    const hidden = mountCard(
      { id: 'UI-1', title: 'hidden' },
      makeCtx({
        policy: makePolicy({ chips: { blocked: false } }),
        cleanupFailureFor: () => ({
          step: 'post_merge_verify',
          reason: 'verify_cmd_failed'
        })
      })
    );

    expect(hidden.querySelector('.ctl-chip--cleanup')).toBeNull();
    expect(hidden.querySelector('.board-card__cleanup-diagnose')).toBeNull();
  });

  test('omits the route chip when its toggle is off', () => {
    const m = mountCard(
      { id: 'UI-1', workflow: { chips: { route: 'full_plan' } } },
      makeCtx({ policy: makePolicy({ chips: { route: false } }) })
    );

    expect(m.querySelector('.ctl-chip--route')).toBeNull();
  });

  test('omits the stepper when its toggle is off', () => {
    const m = mountCard(
      { id: 'UI-1', workflow: { route: 'spec_backed', stages: {}, chips: {} } },
      makeCtx({ policy: makePolicy({ chips: { stepper: false } }) })
    );

    expect(m.querySelector('.stepper')).toBeNull();
  });
});
