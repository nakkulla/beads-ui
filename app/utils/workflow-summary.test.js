import { describe, expect, test } from 'vitest';
import {
  formatWorkflowDuration,
  formatWorkflowTimestamp,
  normalizeExecutionLane,
  normalizeSkillWorkflow,
  parseWorkflowTimestamp,
  safeWorkflowUrl,
  workflowSummaryFromIssue
} from './workflow-summary.js';

describe('workflow summary utils', () => {
  test('normalizes plan execution lane', () => {
    expect(normalizeExecutionLane('plan')).toBe('plan');
  });

  test('normalizes quick edit execution lane', () => {
    expect(normalizeExecutionLane('quick_edit')).toBe('quick_edit');
  });

  test('rejects non-canonical execution lane values', () => {
    expect(normalizeExecutionLane('Plan')).toBeNull();
    expect(normalizeExecutionLane('')).toBeNull();
    expect(normalizeExecutionLane(null)).toBeNull();
  });

  test('normalizes canonical skill workflow values', () => {
    expect(normalizeSkillWorkflow('none')).toBe('none');
    expect(normalizeSkillWorkflow('writing_skills')).toBe('writing_skills');
    expect(normalizeSkillWorkflow('skill_creator')).toBe('skill_creator');
  });

  test('rejects non-canonical skill workflow values', () => {
    expect(normalizeSkillWorkflow('skill-related')).toBeNull();
    expect(normalizeSkillWorkflow(' skill_creator ')).toBeNull();
    expect(normalizeSkillWorkflow(undefined)).toBeNull();
  });

  test('parses finite string timestamps', () => {
    expect(parseWorkflowTimestamp('2026-04-30T06:00:00Z')).toBe(
      Date.parse('2026-04-30T06:00:00Z')
    );
  });

  test('rejects invalid timestamp inputs', () => {
    expect(parseWorkflowTimestamp('not a date')).toBeNull();
    expect(parseWorkflowTimestamp(123)).toBeNull();
  });

  test('formats sub-minute duration', () => {
    expect(
      formatWorkflowDuration(
        Date.parse('2026-04-30T00:00:00Z'),
        Date.parse('2026-04-30T00:00:45Z')
      )
    ).toBe('45s');
  });

  test('formats minute duration without zero-padded seconds', () => {
    expect(
      formatWorkflowDuration(
        Date.parse('2026-04-30T00:00:00Z'),
        Date.parse('2026-04-30T00:07:03Z')
      )
    ).toBe('7m 3s');
  });

  test('formats hour duration without seconds', () => {
    expect(
      formatWorkflowDuration(
        Date.parse('2026-04-30T00:00:00Z'),
        Date.parse('2026-04-30T02:14:59Z')
      )
    ).toBe('2h 14m');
  });

  test('formats day duration without minutes', () => {
    expect(
      formatWorkflowDuration(
        Date.parse('2026-04-30T00:00:00Z'),
        Date.parse('2026-05-01T03:59:00Z')
      )
    ).toBe('1d 3h');
  });

  test('formats same-second duration', () => {
    expect(
      formatWorkflowDuration(
        Date.parse('2026-04-30T00:00:00Z'),
        Date.parse('2026-04-30T00:00:00Z')
      )
    ).toBe('0s');
  });

  test('rejects negative duration', () => {
    expect(
      formatWorkflowDuration(
        Date.parse('2026-04-30T00:01:00Z'),
        Date.parse('2026-04-30T00:00:00Z')
      )
    ).toBeNull();
  });

  test('formats timestamps with date and minute precision', () => {
    expect(formatWorkflowTimestamp(Date.parse('2026-04-30T06:05:00Z'))).toMatch(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/
    );
  });

  test('allows safe http and https PR URLs', () => {
    expect(safeWorkflowUrl('https://github.com/nakkulla/beads-ui/pull/92')?.href).toBe(
      'https://github.com/nakkulla/beads-ui/pull/92'
    );
    expect(safeWorkflowUrl('http://example.test/pr/1')?.href).toBe(
      'http://example.test/pr/1'
    );
  });

  test('rejects unsafe or relative PR URLs', () => {
    expect(safeWorkflowUrl('/relative')).toBeNull();
    expect(safeWorkflowUrl('javascript:alert(1)')).toBeNull();
    expect(safeWorkflowUrl('data:text/html,<h1>x</h1>')).toBeNull();
  });

  test('derives detail rows from canonical metadata', () => {
    const summary = workflowSummaryFromIssue({
      metadata: {
        run_started_at: '2026-04-30T06:00:00Z',
        run_finished_at: '2026-04-30T06:46:38Z',
        pr_url: 'https://github.com/nakkulla/beads-ui/pull/92',
        pr_number: 92,
        execution_lane: 'plan',
        skill_workflow: 'skill_creator'
      }
    });

    expect(summary.detail_rows.map((row) => row.label)).toEqual([
      'Duration',
      'Started',
      'Finished',
      'PR',
      'Lane',
      'Skill workflow'
    ]);
  });

  test('derives board chips from canonical metadata', () => {
    const summary = workflowSummaryFromIssue({
      metadata: {
        pr_url: 'https://github.com/nakkulla/beads-ui/pull/92',
        execution_lane: 'plan',
        skill_workflow: 'skill_creator'
      }
    });

    expect(summary.board_chips.map((chip) => chip.label)).toEqual([
      'plan',
      'skill_creator',
      'PR'
    ]);
  });

  test('omits PR display when only pr_number is present', () => {
    const summary = workflowSummaryFromIssue({
      metadata: {
        pr_number: 92,
        execution_lane: 'quick_edit',
        skill_workflow: 'none'
      }
    });

    expect(summary.detail_rows.some((row) => row.label === 'PR')).toBe(false);
    expect(summary.board_chips.map((chip) => chip.label)).toEqual(['quick_edit']);
  });
});
