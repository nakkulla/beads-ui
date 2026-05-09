import { describe, expect, test } from 'vitest';
import {
  BRANCH_POLICIES,
  EXECUTION_LANES,
  FINISH_ACTIONS,
  REVIEW_PROFILES,
  REVIEW_RUNTIMES,
  ROUTE_TUPLES,
  WORKSPACE_POLICIES,
  buildWorkflowSections,
  deriveReviewProfile,
  deriveReviewRuntime,
  deriveRouteTuple,
  safeWorkflowUrl,
  workflowSettingsMutationValues
} from './workflow-fields.js';

describe('workflow fields', () => {
  test('exports workflow settings enums', () => {
    expect(EXECUTION_LANES).toEqual(['quick_edit', 'spec_backed', 'plan']);
    expect(WORKSPACE_POLICIES).toEqual(['current', 'worktree']);
    expect(BRANCH_POLICIES).toEqual(['same', 'feature']);
    expect(FINISH_ACTIONS).toEqual(['direct', 'pr']);
    expect(REVIEW_PROFILES).toEqual(['light', 'standard', 'deep']);
    expect(REVIEW_RUNTIMES).toEqual(['codex', 'claude']);
  });

  test('derives all valid route tuples', () => {
    for (const tuple of ROUTE_TUPLES) {
      expect(
        deriveRouteTuple({
          workspace_policy: tuple.workspace_policy,
          branch_policy: tuple.branch_policy,
          finish_action: tuple.finish_action
        })
      ).toEqual({ kind: 'valid', id: tuple.id, label: tuple.label });
    }
  });

  test('rejects invalid route tuples', () => {
    const invalid_tuples = [
      ['current', 'same', 'pr'],
      ['worktree', 'same', 'direct'],
      ['worktree', 'same', 'pr']
    ];

    for (const [
      workspace_policy,
      branch_policy,
      finish_action
    ] of invalid_tuples) {
      expect(
        deriveRouteTuple({ workspace_policy, branch_policy, finish_action })
      ).toEqual({ kind: 'invalid', value: null });
    }
  });

  test('derives review profile display states', () => {
    expect(deriveReviewProfile({})).toEqual({
      kind: 'default',
      value: null,
      label: 'Default (standard)'
    });
    expect(deriveReviewProfile({ review_profile: 'deep' })).toEqual({
      kind: 'valid',
      value: 'deep',
      label: 'deep'
    });
    expect(deriveReviewProfile({ review_profile: 'unknown' })).toEqual({
      kind: 'invalid',
      value: 'unknown',
      label: 'Invalid review profile'
    });
  });

  test('builds workflow settings rows without topology', () => {
    const sections = buildWorkflowSections(
      {
        id: 'UI-1',
        metadata: {
          execution_lane: 'plan',
          workspace_policy: 'worktree',
          branch_policy: 'feature',
          finish_action: 'pr'
        }
      },
      {
        sections: ['workflow_settings'],
        workflow_settings: {
          fields: [
            'execution_lane',
            'workspace_policy',
            'branch_policy',
            'finish_action',
            'review_profile',
            'topology'
          ],
          editable_fields: [
            'execution_lane',
            'workspace_policy',
            'branch_policy',
            'finish_action',
            'review_profile'
          ]
        }
      }
    );

    expect(sections[0].id).toBe('workflow_settings');
    expect(sections[0].label).toBe('Workflow settings');
    expect(sections[0].rows.map((row) => row.id)).toEqual([
      'execution_lane',
      'workspace_policy',
      'branch_policy',
      'finish_action',
      'review_profile'
    ]);
    expect(sections[0].rows.map((row) => row.value)).toContain(
      'Default (standard)'
    );
  });

  test('marks invalid workflow settings rows', () => {
    const sections = buildWorkflowSections(
      {
        id: 'UI-invalid',
        metadata: {
          execution_lane: 'mystery_lane',
          workspace_policy: 'current',
          branch_policy: 'same',
          finish_action: 'pr',
          review_profile: 'unknown'
        }
      },
      {
        sections: ['workflow_settings'],
        workflow_settings: {
          fields: [
            'execution_lane',
            'workspace_policy',
            'branch_policy',
            'finish_action',
            'review_profile'
          ]
        }
      }
    );

    expect(sections[0].rows).toEqual([
      expect.objectContaining({ id: 'execution_lane', kind: 'invalid' }),
      expect.objectContaining({ id: 'workspace_policy', kind: 'invalid' }),
      expect.objectContaining({ id: 'branch_policy', kind: 'invalid' }),
      expect.objectContaining({ id: 'finish_action', kind: 'invalid' }),
      expect.objectContaining({ id: 'review_profile', kind: 'invalid' })
    ]);
  });

  test('builds workflow settings mutation values', () => {
    expect(
      workflowSettingsMutationValues('plan', 'worktree', 'feature', 'pr', '')
    ).toEqual({
      execution_lane: 'plan',
      workspace_policy: 'worktree',
      branch_policy: 'feature',
      finish_action: 'pr',
      review_profile: null
    });

    expect(
      workflowSettingsMutationValues('plan', 'current', 'same', 'pr', 'deep')
    ).toBeNull();
  });

  test('rejects unsafe workflow URLs', () => {
    expect(safeWorkflowUrl('javascript:alert(1)')).toBeNull();
    expect(safeWorkflowUrl('/relative')).toBeNull();
    expect(safeWorkflowUrl('https://example.com/pr/1')?.href).toBe(
      'https://example.com/pr/1'
    );
  });
});
