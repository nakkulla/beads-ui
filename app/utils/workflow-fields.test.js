import { describe, expect, test } from 'vitest';
import {
  buildWorkflowSections,
  deriveTopology,
  routeMutationValues,
  safeWorkflowUrl
} from './workflow-fields.js';

describe('workflow fields', () => {
  test('derives pr topology', () => {
    expect(
      deriveTopology({
        workspace_policy: 'worktree',
        branch_policy: 'feature',
        finish_action: 'pr'
      })
    ).toEqual({ kind: 'valid', value: 'pr' });
  });

  test('derives direct topology', () => {
    expect(
      deriveTopology({
        workspace_policy: 'current',
        branch_policy: 'same',
        finish_action: 'direct'
      })
    ).toEqual({ kind: 'valid', value: 'direct' });
  });

  test('reports invalid topology when route metadata conflicts', () => {
    expect(
      deriveTopology({
        workspace_policy: 'current',
        branch_policy: 'feature',
        finish_action: 'direct'
      })
    ).toEqual({ kind: 'invalid', value: null });
  });

  test('builds configured sections and hides absent values', () => {
    const sections = buildWorkflowSections(
      {
        id: 'UI-1',
        spec_id: 'docs/spec.md',
        labels: ['reviewed:spec'],
        metadata: {
          execution_lane: 'spec_backed',
          workspace_policy: 'worktree',
          branch_policy: 'feature',
          finish_action: 'pr',
          spec_review_verdict: 'APPROVE'
        }
      },
      {
        sections: ['route', 'artifacts', 'freshness'],
        route: { fields: ['execution_lane', 'topology'] },
        artifacts: { fields: ['spec_id', 'plan'] },
        freshness: { fields: ['execution_base_sha'] }
      }
    );

    expect(sections.map((section) => section.id)).toEqual([
      'route',
      'artifacts'
    ]);
    expect(sections[0].rows.map((row) => row.id)).toEqual([
      'execution_lane',
      'topology'
    ]);
    expect(sections[1].rows.map((row) => row.id)).toEqual(['spec_id']);
  });

  test('reports invalid execution lane when configured value is unknown', () => {
    const sections = buildWorkflowSections(
      {
        id: 'UI-invalid-lane',
        metadata: {
          execution_lane: 'mystery_lane'
        }
      },
      {
        sections: ['route'],
        route: { fields: ['execution_lane'] }
      }
    );

    expect(sections[0].rows).toEqual([
      expect.objectContaining({
        id: 'execution_lane',
        value: 'mystery_lane',
        kind: 'invalid'
      })
    ]);
  });

  test('rejects unsafe workflow URLs', () => {
    expect(safeWorkflowUrl('javascript:alert(1)')).toBeNull();
    expect(safeWorkflowUrl('/relative')).toBeNull();
    expect(safeWorkflowUrl('https://example.com/pr/1')?.href).toBe(
      'https://example.com/pr/1'
    );
  });

  test('builds route mutation values from selected lane and topology', () => {
    expect(routeMutationValues('plan', 'direct')).toEqual({
      execution_lane: 'plan',
      topology: 'direct'
    });
  });
});
