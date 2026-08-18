import { describe, expect, test } from 'vitest';
import { isPrWaitCleanupActive, prWaitProgress } from './pr-wait-progress.js';

const MERGE_SHA = 'a'.repeat(40);

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function operation(patch = {}) {
  return {
    operation_id: 'op-1',
    kind: 'deploy',
    state: 'running',
    requested_at: 10,
    subjects: [{ bead_id: 'UI-1', merged_sha: MERGE_SHA }],
    superseded_by: null,
    ...patch
  };
}

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function progressInput(patch = {}) {
  return {
    bead_id: 'UI-1',
    merge_sha: MERGE_SHA,
    cleanup_cursor: 'repo_operations',
    merge_progress: null,
    cleanup_failed: null,
    repo_operations: [],
    ...patch
  };
}

describe('prWaitProgress', () => {
  test('binds a running deploy to the exact bead and merge SHA', () => {
    const result = prWaitProgress(
      progressInput({
        repo_operations: [operation()]
      })
    );

    expect(result).toEqual({
      step: 'deploy',
      label: '배포 중',
      index: 4,
      total: 7,
      percent: 57,
      active: true,
      failed: false
    });
  });

  test.each([
    ['verify', 'queued', '검증 대기', 3, true, false],
    ['verify', 'running', '검증 중', 3, true, false],
    ['verify', 'retry_pending', '검증 재시도 대기', 3, true, false],
    ['verify', 'repairing', '검증 자동 해결 중', 3, true, false],
    ['verify', 'failed', '검증 실패', 3, false, true],
    ['verify', 'succeeded', '검증 완료 · 정리 재개 대기', 3, false, false],
    ['deploy', 'queued', '배포 대기', 4, true, false],
    ['deploy', 'running', '배포 중', 4, true, false],
    ['deploy', 'retry_pending', '배포 재시도 대기', 4, true, false],
    ['deploy', 'repairing', '배포 자동 해결 중', 4, true, false],
    ['deploy', 'failed', '배포 실패', 4, false, true],
    ['deploy', 'succeeded', '배포 완료 · 정리 재개 대기', 4, false, false]
  ])(
    'projects %s %s with its fixed card wording',
    (kind, state, label, index, active, failed) => {
      const result = prWaitProgress(
        progressInput({ repo_operations: [operation({ kind, state })] })
      );

      expect(result).toMatchObject({
        step: kind,
        label,
        index,
        total: 7,
        active,
        failed
      });
    }
  );

  test.each([
    [
      'another bead',
      operation({
        subjects: [{ bead_id: 'UI-2', merged_sha: MERGE_SHA }]
      })
    ],
    [
      'an older merge SHA',
      operation({
        subjects: [{ bead_id: 'UI-1', merged_sha: 'b'.repeat(40) }]
      })
    ],
    ['a superseded operation', operation({ superseded_by: 'op-2' })]
  ])('ignores %s', (_reason, candidate) => {
    const result = prWaitProgress(
      progressInput({ repo_operations: [candidate] })
    );

    expect(result).toBeNull();
  });

  test('ignores operations when the merge SHA is incomplete', () => {
    const result = prWaitProgress(
      progressInput({ merge_sha: 'abc', repo_operations: [operation()] })
    );

    expect(result).toBeNull();
  });

  test('prefers an active operation over a durable cleanup failure', () => {
    const result = prWaitProgress(
      progressInput({
        cleanup_failed: { step: 'repo_operations', reason: 'old failure' },
        repo_operations: [operation({ state: 'retry_pending' })]
      })
    );

    expect(result?.label).toBe('배포 재시도 대기');
  });

  test('keeps a durable failure ahead of work the current stage disowns', () => {
    const result = prWaitProgress(
      progressInput({
        cleanup_cursor: 'base_containment',
        cleanup_failed: { step: 'repo_operations', reason: 'old failure' },
        repo_operations: [operation({ state: 'running' })]
      })
    );

    expect(result).toMatchObject({ label: '배포 실패', failed: true });
  });

  test('returns to failure after a rerun fails again', () => {
    const result = prWaitProgress(
      progressInput({
        cleanup_failed: { step: 'repo_operations', reason: 'failed again' },
        repo_operations: [operation({ state: 'failed' })]
      })
    );

    expect(result).toMatchObject({ label: '배포 실패', failed: true });
  });

  test('uses an exact terminal operation to name a repo-operations failure', () => {
    const result = prWaitProgress(
      progressInput({
        cleanup_failed: { step: 'repo_operations', reason: 'script failed' },
        repo_operations: [operation({ kind: 'verify', state: 'succeeded' })]
      })
    );

    expect(result).toMatchObject({ label: '검증 실패', failed: true });
  });

  test('falls back when a repo-operations failure has no exact operation', () => {
    const result = prWaitProgress(
      progressInput({
        cleanup_failed: { step: 'repo_operations', reason: 'unknown' }
      })
    );

    expect(result).toBeNull();
  });

  test('prefers deploy when verify and deploy are both current candidates', () => {
    const result = prWaitProgress(
      progressInput({
        repo_operations: [
          operation({ operation_id: 'verify', kind: 'verify' }),
          operation({ operation_id: 'deploy', kind: 'deploy' })
        ]
      })
    );

    expect(result?.step).toBe('deploy');
  });

  test('prefers an active state over a completed state of the same kind', () => {
    const result = prWaitProgress(
      progressInput({
        repo_operations: [
          operation({
            operation_id: 'done',
            state: 'succeeded',
            requested_at: 20
          }),
          operation({
            operation_id: 'active',
            state: 'queued',
            requested_at: 10
          })
        ]
      })
    );

    expect(result?.label).toBe('배포 대기');
  });

  test('uses requested time to choose between same-kind active operations', () => {
    const result = prWaitProgress(
      progressInput({
        repo_operations: [
          operation({
            operation_id: 'older',
            state: 'queued',
            requested_at: 10
          }),
          operation({
            operation_id: 'newer',
            state: 'running',
            requested_at: 20
          })
        ]
      })
    );

    expect(result?.label).toBe('배포 중');
  });

  test('uses operation id order after requested-time ties', () => {
    const result = prWaitProgress(
      progressInput({
        repo_operations: [
          operation({ operation_id: 'b-op', state: 'running' }),
          operation({ operation_id: 'a-op', state: 'queued' })
        ]
      })
    );

    expect(result?.label).toBe('배포 대기');
  });

  test('binds operations during transient repo-operations activity', () => {
    const result = prWaitProgress(
      progressInput({
        cleanup_cursor: null,
        merge_progress: { step: 'repo_operations' },
        repo_operations: [operation({ kind: 'verify' })]
      })
    );

    expect(result).toMatchObject({ step: 'verify', index: 3 });
  });

  test('does not show succeeded work without a repo-operations cursor wait', () => {
    const result = prWaitProgress(
      progressInput({
        cleanup_cursor: null,
        merge_progress: { step: 'repo_operations' },
        repo_operations: [operation({ state: 'succeeded' })]
      })
    );

    expect(result).toBeNull();
  });

  test.each([
    ['base_containment', 'base', 'base 확인 중', 2, 29],
    ['child_sweep', 'child', '자식 정리 중', 5, 71],
    ['branch_cleanup', 'branch', '브랜치 정리 중', 6, 86],
    ['parent_close', 'close', '부모 close 중', 7, 100]
  ])(
    'restores %s from the durable cleanup cursor',
    (cleanup_cursor, step, label, index, percent) => {
      const result = prWaitProgress(
        progressInput({ cleanup_cursor, repo_operations: [] })
      );

      expect(result).toMatchObject({
        step,
        label,
        index,
        total: 7,
        percent,
        active: true,
        failed: false
      });
    }
  );

  test('keeps a later cursor ahead of an older succeeded operation', () => {
    const result = prWaitProgress(
      progressInput({
        cleanup_cursor: 'child_sweep',
        repo_operations: [operation({ state: 'succeeded' })]
      })
    );

    expect(result).toMatchObject({ step: 'child', index: 5 });
  });

  test('projects transient merging at the first fixed position', () => {
    const result = prWaitProgress(
      progressInput({
        merge_sha: null,
        cleanup_cursor: null,
        merge_progress: { step: 'merging' }
      })
    );

    expect(result).toMatchObject({
      step: 'merge',
      label: '머지 중',
      index: 1,
      total: 7,
      percent: 14
    });
  });

  test.each([
    ['unknown cursor', { cleanup_cursor: 'teleport' }],
    [
      'unknown operation state',
      { repo_operations: [operation({ state: 'new' })] }
    ],
    ['non-array operation input', { repo_operations: {} }]
  ])('returns null for %s', (_reason, patch) => {
    const result = prWaitProgress(progressInput(patch));

    expect(result).toBeNull();
  });

  test.each([
    ['merge work', { step: 'merge', active: true, failed: false }, false],
    ['active cleanup', { step: 'deploy', active: true, failed: false }, true],
    ['cleanup wait', { step: 'verify', active: false, failed: false }, true],
    ['failed cleanup', { step: 'deploy', active: false, failed: true }, false]
  ])('reports cleanup ownership for %s', (_reason, progress, expected) => {
    const result = isPrWaitCleanupActive(
      /** @type {ReturnType<typeof prWaitProgress>} */ (progress)
    );

    expect(result).toBe(expected);
  });
});
