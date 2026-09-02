import { describe, expect, test } from 'vitest';
import {
  CLEANUP_STEPS,
  MERGE_STEPS,
  cleanupStalledReason,
  cleanupStepLabel,
  cleanupStepPosition,
  cleanupStepperView,
  mergeStepView
} from './merge-steps.js';

describe('MERGE_STEPS', () => {
  test('keeps the seven card steps at fixed semantic positions', () => {
    expect(
      MERGE_STEPS.map(({ step, label, index }) => ({ step, label, index }))
    ).toEqual([
      { step: 'merge', label: '머지', index: 1 },
      { step: 'base', label: 'base', index: 2 },
      { step: 'verify', label: '검증', index: 3 },
      { step: 'deploy', label: '배포', index: 4 },
      { step: 'child', label: '자식', index: 5 },
      { step: 'branch', label: '브랜치', index: 6 },
      { step: 'close', label: 'close', index: 7 }
    ]);
  });
});

describe('CLEANUP_STEPS', () => {
  test('holds the six post-merge cleanup steps in cursor order', () => {
    expect(CLEANUP_STEPS.map((entry) => entry.step)).toEqual([
      'base_containment',
      'repo_operations',
      'post_merge_jobs',
      'child_sweep',
      'branch_cleanup',
      'parent_close'
    ]);
  });

  test('places post_merge_jobs between repo_operations and child_sweep', () => {
    const steps = CLEANUP_STEPS.map((entry) => entry.step);

    const index = steps.indexOf('post_merge_jobs');

    expect([steps[index - 1], steps[index + 1]]).toEqual([
      'repo_operations',
      'child_sweep'
    ]);
  });
});

describe('mergeStepView', () => {
  test('projects a known step with its position', () => {
    expect(mergeStepView('child_sweep')).toEqual({
      label: '자식 정리 중',
      index: 5,
      total: 7,
      percent: 71
    });
  });

  test('names the post_merge_jobs cursor without claiming a card position', () => {
    expect(mergeStepView('post_merge_jobs')).toEqual({
      label: '머지 후 잡',
      index: 0,
      total: 7,
      percent: 0
    });
  });

  test('renders an unknown step by its raw name', () => {
    expect(mergeStepView('teleport')).toMatchObject({
      label: 'teleport',
      index: 0
    });
  });

  test('returns null for an absent step', () => {
    expect(mergeStepView(null)).toBeNull();
  });
});

describe('cleanupStepperView', () => {
  test('marks the stopped step and everything before it', () => {
    expect(cleanupStepperView('child_sweep').map((pip) => pip.state)).toEqual([
      'done',
      'done',
      'done',
      'stall',
      'todo',
      'todo'
    ]);
  });

  test('stalls on the post_merge_jobs pip', () => {
    expect(
      cleanupStepperView('post_merge_jobs').map((pip) => pip.state)
    ).toEqual(['done', 'done', 'stall', 'todo', 'todo', 'todo']);
  });

  test('leaves every pip unreached for an unknown step', () => {
    expect(
      cleanupStepperView('post_merge_verify').every(
        (pip) => pip.state === 'todo'
      )
    ).toBe(true);
  });
});

describe('cleanupStepLabel', () => {
  test('says a known step in Korean', () => {
    expect(cleanupStepLabel('repo_operations')).toBe('저장소 작업');
  });

  test('names the post_merge_jobs step in Korean', () => {
    expect(cleanupStepLabel('post_merge_jobs')).toBe('머지 후 잡');
  });

  test('falls back to the raw token', () => {
    expect(cleanupStepLabel('post_merge_verify')).toBe('post_merge_verify');
  });
});

describe('cleanupStepPosition', () => {
  test('counts a known step within the sequence', () => {
    expect(cleanupStepPosition('repo_operations')).toEqual({
      index: 2,
      total: 6
    });
  });

  test('counts post_merge_jobs as the third of six steps', () => {
    expect(cleanupStepPosition('post_merge_jobs')).toEqual({
      index: 3,
      total: 6
    });
  });

  test('returns null rather than inventing a position', () => {
    expect(cleanupStepPosition('post_merge_verify')).toBeNull();
  });
});

describe('cleanupStalledReason', () => {
  test('says where a stopped cleanup stopped', () => {
    expect(cleanupStalledReason('repo_operations')).toBe(
      '머지 완료 · 정리 6단계 중 2단계에서 멈춤'
    );
  });

  test('keeps the plain wording for an unknown step', () => {
    expect(cleanupStalledReason('post_merge_verify')).toBe(
      '머지됨 · 정리 미완'
    );
  });
});
