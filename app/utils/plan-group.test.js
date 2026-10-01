import { describe, expect, test } from 'vitest';
import {
  buildPlanGroupIndex,
  buildPlanGroups,
  parsePlanTaskAnchor,
  planGroupSlug
} from './plan-group.js';

const PLAN = 'docs/superpowers/plans/2026-09-29-plan-issue-group.md';

/**
 * @param {string} id
 * @param {string|undefined} anchor
 * @param {Record<string, unknown>} [extra]
 * @returns {Record<string, unknown>}
 */
function planIssue(id, anchor, extra = {}) {
  return {
    id,
    status: 'open',
    metadata: {
      plan_path: PLAN,
      ...(anchor === undefined ? {} : { plan_task_anchor: anchor })
    },
    ...extra
  };
}

describe('utils/plan-group anchors', () => {
  test('reads a single phase anchor', () => {
    expect(parsePlanTaskAnchor('Phase 3')).toEqual({
      first_phase: 3,
      last_phase: 3
    });
  });

  test('reads a phase range anchor', () => {
    expect(parsePlanTaskAnchor('Phase 2-4')).toEqual({
      first_phase: 2,
      last_phase: 4
    });
  });

  test('rejects a range whose end does not exceed its start', () => {
    expect(parsePlanTaskAnchor('Phase 4-4')).toBeNull();
    expect(parsePlanTaskAnchor('Phase 5-2')).toBeNull();
  });

  test('rejects text outside the contract format', () => {
    expect(parsePlanTaskAnchor('phase 1')).toBeNull();
    expect(parsePlanTaskAnchor('Phase one')).toBeNull();
    expect(parsePlanTaskAnchor('Phase 1-')).toBeNull();
    expect(parsePlanTaskAnchor(7)).toBeNull();
  });
});

describe('utils/plan-group slug', () => {
  test('drops the date prefix and the md suffix', () => {
    expect(planGroupSlug(PLAN)).toBe('plan-issue-group');
  });

  test('keeps a name that carries no date prefix', () => {
    expect(planGroupSlug('plans/rollout.md')).toBe('rollout');
  });
});

describe('utils/plan-group grouping', () => {
  test('groups issues sharing a plan_path in phase order', () => {
    const groups = buildPlanGroups([
      planIssue('UI-b', 'Phase 3'),
      planIssue('UI-a', 'Phase 1-2')
    ]);

    const group = groups.get(PLAN);

    expect(group?.slug).toBe('plan-issue-group');
    expect(group?.members.map((member) => member.id)).toEqual(['UI-a', 'UI-b']);
    expect(group?.members.map((member) => member.first_phase)).toEqual([1, 3]);
  });

  test('numbers each row by its place and the group size', () => {
    const index = buildPlanGroupIndex([
      planIssue('UI-b', 'Phase 2'),
      planIssue('UI-a', 'Phase 1'),
      planIssue('UI-c', 'Phase 3')
    ]);

    expect(index.get('UI-a')).toMatchObject({ index: 1, total: 3 });
    expect(index.get('UI-b')).toMatchObject({ index: 2, total: 3 });
    expect(index.get('UI-c')).toMatchObject({ index: 3, total: 3 });
  });

  test('lists members with id, anchor, status and blockers only', () => {
    const index = buildPlanGroupIndex(
      [planIssue('UI-a', 'Phase 1'), planIssue('UI-b', 'Phase 2')],
      (id) => (id === 'UI-b' ? ['UI-a'] : [])
    );

    expect(index.get('UI-b')?.members).toEqual([
      { id: 'UI-a', anchor: 'Phase 1', status: 'open', blocked_by: [] },
      { id: 'UI-b', anchor: 'Phase 2', status: 'open', blocked_by: ['UI-a'] }
    ]);
  });

  test('keeps index and total when a member closes', () => {
    const index = buildPlanGroupIndex([
      planIssue('UI-a', 'Phase 1', { status: 'closed' }),
      planIssue('UI-b', 'Phase 2'),
      planIssue('UI-c', 'Phase 3', { status: 'deferred' })
    ]);

    expect(index.get('UI-b')).toMatchObject({ index: 2, total: 3 });
    expect(index.get('UI-b')?.members.map((member) => member.status)).toEqual([
      'closed',
      'open',
      'deferred'
    ]);
  });

  test('builds no group from a single issue', () => {
    expect(buildPlanGroups([planIssue('UI-a', 'Phase 1')]).size).toBe(0);
  });

  test('builds no group when a member lacks an anchor', () => {
    const groups = buildPlanGroups([
      planIssue('UI-a', 'Phase 1'),
      planIssue('UI-b', undefined)
    ]);

    expect(groups.size).toBe(0);
  });

  test('builds no group when a member anchor is malformed', () => {
    const groups = buildPlanGroups([
      planIssue('UI-a', 'Phase 1'),
      planIssue('UI-b', 'Phase two')
    ]);

    expect(groups.size).toBe(0);
  });

  test('builds no group when two phase ranges overlap', () => {
    const groups = buildPlanGroups([
      planIssue('UI-a', 'Phase 1-3'),
      planIssue('UI-b', 'Phase 3')
    ]);

    expect(groups.size).toBe(0);
  });

  test('omits the whole plan_path while another plan_path still groups', () => {
    const other = 'docs/superpowers/plans/2026-09-30-other.md';

    const groups = buildPlanGroups([
      planIssue('UI-a', 'Phase 1-3'),
      planIssue('UI-b', 'Phase 2'),
      {
        id: 'UI-x',
        status: 'open',
        metadata: { plan_path: other, plan_task_anchor: 'Phase 1' }
      },
      {
        id: 'UI-y',
        status: 'open',
        metadata: { plan_path: other, plan_task_anchor: 'Phase 2' }
      }
    ]);

    expect([...groups.keys()]).toEqual([other]);
  });

  test('ignores issues without a plan_path', () => {
    const groups = buildPlanGroups([
      { id: 'UI-a', status: 'open', metadata: { plan_task_anchor: 'Phase 1' } },
      { id: 'UI-b', status: 'open' }
    ]);

    expect(groups.size).toBe(0);
  });

  test('reads blockers through the supplied lookup', () => {
    const groups = buildPlanGroups(
      [planIssue('UI-a', 'Phase 1'), planIssue('UI-b', 'Phase 2')],
      (id) => (id === 'UI-a' ? ['UI-z'] : [])
    );

    expect(groups.get(PLAN)?.members[0].blocked_by).toEqual(['UI-z']);
  });
});
