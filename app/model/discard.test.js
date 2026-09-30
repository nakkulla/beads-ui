import { describe, expect, test } from 'vitest';
import {
  discardAbandonCompletionMessage,
  discardAbandonConfirmationMessage,
  discardCompletionMessage,
  discardConfirmationMessage,
  discardFailureGuidance,
  discardPhaseLabel,
  discardProjection
} from './discard.js';

// Moved from the retired `views/worker/lanes.test.js` (UI-dbn6 Phase 4); the
// receipt-rendering halves of those cases went with the old template.

describe('discard receipts', () => {
  test.each([
    [
      {},
      'UI-x1: 실패한 폐기 작업을 포기합니다. 백업과 폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다. 계속할까요?',
      '폐기 포기됨 · 폐기는 수행되지 않았습니다 (원인: archive_failed)'
    ],
    [
      { kind: 'stale_work_backup_fresh' },
      'UI-x1: 실패한 백업 작업을 포기합니다. 백업은 만들어지지 않았고 기존 작업은 그대로 남습니다. 계속할까요?',
      '백업 포기됨 · 기존 작업은 그대로 남습니다 (원인: archive_failed)'
    ]
  ])(
    'shares exact abandon confirmation and completion wording',
    (operation, confirmation, completion) => {
      const input = { ...operation, last_error: 'archive_failed' };

      const confirmation_message = discardAbandonConfirmationMessage(
        'UI-x1',
        input
      );
      const completion_message = discardAbandonCompletionMessage(input);

      expect(confirmation_message).toBe(confirmation);
      expect(completion_message).toBe(completion);
    }
  );

  test('uses the shared state-specific confirmation wording', () => {
    expect(discardConfirmationMessage('UI-x1', 'unmerged')).toContain(
      'runner/PR/branch/worktree를 정리하고 이슈를 후보로 되돌립니다'
    );
    expect(discardConfirmationMessage('UI-x1', 'merged')).toContain(
      '실제 원복은 사람이 그 PR을 merge한 뒤 완료됩니다'
    );
  });

  test('keeps the operation and recovery archive in the terminal message', () => {
    expect(
      discardCompletionMessage({
        operation_id: 'op-1',
        receipt: {
          archive_path: '/state/op-1',
          original_pr: { url: 'https://github.com/o/r/pull/1' }
        }
      })
    ).toContain(
      '폐기 완료 · 작업 op-1 · 백업 /state/op-1 · 원본 PR https://github.com/o/r/pull/1'
    );
  });

  test.each([
    [
      'orphan_gitlink_content:vendor/local',
      '매핑 없는 gitlink 경로 vendor/local에 내용이 있습니다 — 저장소에서 그 경로를 정리한 뒤 재시도하거나 포기하세요'
    ],
    [
      'dirty_submodule',
      '서브모듈에 미커밋 변경이나 미초기화 항목이 있습니다 — 정리 후 재시도하세요'
    ],
    [
      'submodule_observation_failed',
      '서브모듈 상태를 읽지 못했습니다 (git 오류) — 워크트리에서 git 명령을 직접 확인하세요'
    ],
    ['archive_failed', null]
  ])('%s의 닫힌 실패 안내를 반환한다', (error, expected) => {
    const guidance = discardFailureGuidance(error);

    expect(guidance).toBe(expected);
  });

  test('maps durable phases to the five user-facing progress labels', () => {
    expect(discardPhaseLabel('requested')).toBe('백업 중');
    expect(discardPhaseLabel('signaled')).toBe('runner 종료 중');
    expect(discardPhaseLabel('runner_terminated')).toBe('PR 정리 중');
    expect(discardPhaseLabel('revert_local_prepared')).toBe('revert PR 대기');
    expect(discardPhaseLabel('rollback_verified')).toBe('원복 배포 중');
  });

  test('labels abandon variants and excludes abandoned operations', () => {
    const regular = discardProjection(
      {
        op1: {
          operation_id: 'op1',
          bead_id: 'UI-x1',
          phase: 'requested',
          last_error: 'archive_failed'
        }
      },
      'UI-x1'
    );
    const stale = discardProjection(
      {
        op1: {
          operation_id: 'op1',
          bead_id: 'UI-x1',
          kind: 'stale_work_backup_fresh',
          phase: 'requested',
          last_error: 'archive_failed'
        }
      },
      'UI-x1'
    );
    const abandoned = discardProjection(
      {
        op1: {
          operation_id: 'op1',
          bead_id: 'UI-x1',
          phase: 'abandoned',
          last_error: 'archive_failed'
        }
      },
      'UI-x1'
    );

    expect(regular.abandon.label).toBe('폐기 포기');
    expect(regular.abandon.title).toBe(
      '실패한 폐기 작업을 포기합니다 — 백업·폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다'
    );
    expect(stale.abandon.label).toBe('백업 포기');
    expect(stale.abandon.title).toBe(
      '실패한 백업 작업을 포기합니다 — 원본은 그대로 남고 새로 시작하지 않습니다'
    );
    expect(abandoned.operation).toBeNull();
    expect(discardPhaseLabel('abandoned')).toBe('폐기 포기됨');
  });

  test.each([
    ['활성 작업 없음', {}, false],
    [
      '진행 중',
      {
        op1: {
          operation_id: 'op1',
          bead_id: 'UI-x1',
          phase: 'requested'
        }
      },
      false
    ],
    [
      'requested 실패',
      {
        op1: {
          operation_id: 'op1',
          bead_id: 'UI-x1',
          phase: 'requested',
          last_error: 'archive_failed'
        }
      },
      true
    ],
    [
      'requested 밖 phase 실패',
      {
        op1: {
          operation_id: 'op1',
          bead_id: 'UI-x1',
          phase: 'backup_verified',
          last_error: 'worktree_remove_failed'
        }
      },
      false
    ]
  ])('%s에서만 포기 action을 노출한다', (_label, operations, expected) => {
    const discard = discardProjection(operations, 'UI-x1');

    const action = discard.abandon.action;

    expect(action).toBe(expected);
  });

  test.each([
    [
      'orphan_gitlink_content:vendor/local',
      '매핑 없는 gitlink 경로 vendor/local에 내용이 있습니다 — 저장소에서 그 경로를 정리한 뒤 재시도하거나 포기하세요'
    ],
    [
      'dirty_submodule',
      '서브모듈에 미커밋 변경이나 미초기화 항목이 있습니다 — 정리 후 재시도하세요'
    ],
    [
      'submodule_observation_failed',
      '서브모듈 상태를 읽지 못했습니다 (git 오류) — 워크트리에서 git 명령을 직접 확인하세요'
    ]
  ])('attaches %s guidance to the retry title', (error, guidance) => {
    const discard = discardProjection(
      {
        'discard-1': {
          operation_id: 'discard-1',
          bead_id: 'UI-x1',
          phase: 'requested',
          last_error: error
        }
      },
      'UI-x1'
    );

    expect(discard.title).toBe(`폐기 실패: ${error} — ${guidance}`);
  });

  test('keeps a stale-work retry disabled while cleanup is still running', () => {
    const discard = discardProjection(
      {
        'stale-work-1': {
          operation_id: 'stale-work-1',
          kind: 'stale_work_backup_fresh',
          bead_id: 'UI-x1',
          phase: 'backup_verified',
          last_error: null,
          backup: { path: '/state/stale-work-1' }
        }
      },
      'UI-x1'
    );

    expect(discard.enabled).toBe(false);
  });

  test('offers the stale-work retry only after cleanup failure', () => {
    const discard = discardProjection(
      {
        'stale-work-1': {
          operation_id: 'stale-work-1',
          kind: 'stale_work_backup_fresh',
          bead_id: 'UI-x1',
          phase: 'backup_verified',
          last_error: 'worktree_remove_failed',
          backup: { path: '/state/stale-work-1' }
        }
      },
      'UI-x1'
    );

    expect(discard.label).toBe('백업 정리 재시도');
    expect(discard.enabled).toBe(true);
  });

  test('selects the newest active operation for the bead', () => {
    const discard = discardProjection(
      {
        newer: {
          operation_id: 'newer',
          bead_id: 'UI-x1',
          requested_at: 20,
          phase: 'pr_closed',
          last_error: 'close_failed'
        },
        older: {
          operation_id: 'older',
          bead_id: 'UI-x1',
          requested_at: 10,
          phase: 'requested',
          last_error: 'archive_failed'
        }
      },
      'UI-x1'
    );

    expect(discard.operation?.operation_id).toBe('newer');
    expect(discard.label).toBe('재시도');
  });
});
