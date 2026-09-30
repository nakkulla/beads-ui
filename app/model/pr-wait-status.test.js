import { describe, expect, test } from 'vitest';
import {
  activityBadge,
  autoResolutionBadge,
  mergeFailureText,
  mergeQueueRefusalText,
  mergeWaitingText,
  prStatusBadge,
  receiptWarningCodes
} from './pr-wait-status.js';

// `mergeWaitingText` and `autoResolutionBadge` cases moved from the retired
// `views/worker/index.test.js` (UI-dbn6 Phase 4).

describe('mergeWaitingText completion waits', () => {
  test('renders a clear label for a completion wait needing attention', () => {
    const label = mergeWaitingText('completion_waiting:needs_human');

    expect(label).toBe('확인 필요');
  });

  test('hides an unknown internal completion phase', () => {
    const label = mergeWaitingText('completion_waiting:future_phase');

    expect(label).toBe(null);
  });

  test('names a holding completion wait', () => {
    const label = mergeWaitingText('completion_waiting:holding');

    expect(label).toBe('검증 실패 — 수정 push 대기');
  });
});

describe('autoResolutionBadge', () => {
  test('returns the receipt wait label with two details and no live pulse', () => {
    const result = autoResolutionBadge(
      /** @type {any} */ ({
        phase: 'waiting_metadata',
        auto_resolution: {
          class: 'metadata_watch',
          origin_reason: 'receipt_unbacked:approval_forged',
          attempts: 0,
          next_at: null,
          last_error: null
        }
      })
    );

    expect(result).toEqual({
      label: '영수증 대기 — approval_forged',
      details: [
        '원 사유: receipt_unbacked:approval_forged',
        '새 커밋·새 영수증·재관측이 오면 자동 재개'
      ],
      live: false
    });
  });

  test('keeps 정정 대기 for a non-receipt origin reason', () => {
    const result = autoResolutionBadge(
      /** @type {any} */ ({
        phase: 'waiting_metadata',
        auto_resolution: {
          class: 'metadata_watch',
          origin_reason: 'review_receipt_missing',
          attempts: 0,
          next_at: null,
          last_error: null
        }
      })
    );

    expect(result?.label).toBe('정정 대기');
  });

  test('returns null when the resolution record is absent', () => {
    const result = autoResolutionBadge(
      /** @type {any} */ ({ phase: 'waiting_metadata', auto_resolution: null })
    );

    expect(result).toBeNull();
  });

  test('drops the retry denominator when the server sent no budget', () => {
    const result = autoResolutionBadge(
      /** @type {any} */ ({
        phase: 'retrying',
        auto_resolution: {
          class: 'retry',
          origin_reason: 'verify_cmd_failed',
          attempts: 2,
          next_at: null,
          last_error: null
        }
      })
    );

    expect(result?.label).toBe('재시도 2');
  });
});

describe('poller activity badge — projection (UI-raqh §3)', () => {
  test('renames 관측 대기 to 확인중 while an observation runs', () => {
    expect(activityBadge('관측 대기', 'checking')).toEqual({
      label: '확인중',
      live: true
    });
  });

  test('renames 검증 대기 to 검증 중 while the suite runs', () => {
    expect(activityBadge('검증 대기', 'verifying')).toEqual({
      label: '검증 중',
      live: true
    });
  });

  test('leaves 관측 대기 alone when nothing is running', () => {
    expect(activityBadge('관측 대기', null)).toEqual({
      label: '관측 대기',
      live: false
    });
  });

  test('leaves an eligibility badge alone while the poller works', () => {
    expect(activityBadge('머지 가능', 'checking')).toEqual({
      label: '머지 가능',
      live: false
    });
  });

  test('does not cross the two substitutions', () => {
    expect(activityBadge('관측 대기', 'verifying')).toEqual({
      label: '관측 대기',
      live: false
    });
  });
});

describe('mergeFailureText (UI-5v7d §4)', () => {
  test('translates the driver vocabulary', () => {
    expect(mergeFailureText('resolution_round_cap')).toBe('충돌 해소 2회 초과');
    expect(mergeFailureText('not_in_pr_wait')).toBe('PR 대기 상태 동기화 실패');
    expect(mergeFailureText('merge_unconfirmed_timeout')).toBe(
      '머지 확인 시간 초과'
    );
  });

  test('passes an unknown reason through instead of blanking the badge', () => {
    expect(mergeFailureText('brand_new_reason')).toBe('brand_new_reason');
  });

  test('separates the queue-caused re-conflict budget from the session one', () => {
    expect(mergeFailureText('resolution_rebase_cap')).toBe(
      '큐 재충돌 3회 초과'
    );
  });

  test('names which worktree-restore check refused', () => {
    expect(mergeFailureText('worktree_restore_branch_mismatch')).toBe(
      '워크트리 복원 실패 — 브랜치 이름 불일치'
    );
    expect(mergeFailureText('worktree_restore_path_exists')).toBe(
      '워크트리 복원 실패 — 경로 이미 있음'
    );
    expect(mergeFailureText('worktree_restore_branch_missing')).toBe(
      '워크트리 복원 실패 — origin에 브랜치 없음'
    );
    expect(mergeFailureText('worktree_restore_branch_diverged')).toBe(
      '워크트리 복원 실패 — 로컬 브랜치가 origin과 다름'
    );
    expect(mergeFailureText('worktree_restore_failed')).toBe(
      '워크트리 복원 실패'
    );
  });

  test('points a receipt hold at the manual [머지] click that lifts it', () => {
    const text = mergeFailureText('receipt_unbacked:probe_error');

    expect(text).toContain('probe_error');
    expect(text).toContain('[머지] 클릭으로 수동 진행 가능');
  });

  test('keeps the manual-click hint for every receipt_unbacked code', () => {
    const text = mergeFailureText('receipt_unbacked:main_receipt_unbacked');

    expect(text).toContain('main_receipt_unbacked');
    expect(text).toContain('[머지] 클릭으로 수동 진행 가능');
  });
});

describe('mergeQueueRefusalText (UI-75xw §6)', () => {
  test('maps lane occupancy to Korean', () => {
    expect(mergeQueueRefusalText('lane_occupied')).toBe(
      '실행 레인에 남아 있어 머지 대상이 아닙니다'
    );
  });

  test('appends an unknown server reason', () => {
    expect(mergeQueueRefusalText('future_reason')).toContain('future_reason');
  });
});

describe('receiptWarningCodes (UI-bu6d §7)', () => {
  test('reads the blocking codes off a recorded summary', () => {
    const codes = receiptWarningCodes({
      blocking_codes: ['main_receipt_unbacked']
    });

    expect(codes).toEqual(['main_receipt_unbacked']);
  });

  test('stays quiet without a recorded summary', () => {
    expect(receiptWarningCodes(null)).toEqual([]);
  });

  test('stays quiet on a probe error that named no code', () => {
    expect(
      receiptWarningCodes({ probe_error: true, blocking_codes: [] })
    ).toEqual([]);
  });

  test('stays quiet on a summary whose shape it cannot read', () => {
    expect(receiptWarningCodes({ blocking_codes: 'nope' })).toEqual([]);
  });
});

describe('prStatusBadge priority (UI-vkk8 §3)', () => {
  test('warns about an unbacked execution receipt', () => {
    const result = prStatusBadge({
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['main_receipt_unbacked'],
        blocking_codes: ['main_receipt_unbacked']
      }
    });

    expect(result).toMatchObject({
      label: '영수증 확인 필요 · main_receipt_unbacked',
      alert: true
    });
    expect(result?.title).toContain('main_receipt_unbacked');
  });

  test('keeps the review hold on a queued row instead of 확인 중 (UI-d7fy §5)', () => {
    const result = prStatusBadge({
      auto_pending: true,
      queued: true,
      gate: { reason: 'review_receipt_missing' }
    });

    expect(result).toMatchObject({ label: '최종 변경 리뷰 필요', alert: true });
  });

  test('shows 확인 중 for a queued row whose receipt warning the queue re-checks (UI-kxhf)', () => {
    const result = prStatusBadge({
      auto_pending: true,
      queued: true,
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['unit_plan_mismatch'],
        blocking_codes: ['unit_plan_mismatch']
      }
    });

    expect(result?.label).toBe('확인 중');
  });

  test('keeps the review warning on an unqueued row (UI-kxhf)', () => {
    const result = prStatusBadge({
      auto_pending: false,
      gate: { reason: 'review_receipt_missing' }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
  });

  test('never hides a warning on a queued row the queue gave up on (UI-kxhf)', () => {
    const result = prStatusBadge({
      auto_pending: false,
      queued: true,
      gate: { reason: 'review_receipt_missing' }
    });

    expect(result?.label).not.toBe('확인 중');
  });

  test('carries only the first violation code in the label (UI-17mj §2.4)', () => {
    const result = prStatusBadge({
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['unit_plan_mismatch', 'main_receipt_unbacked'],
        blocking_codes: ['unit_plan_mismatch', 'main_receipt_unbacked']
      }
    });

    expect(result?.label).toBe('영수증 확인 필요 · unit_plan_mismatch');
    expect(result?.title).toContain('unit_plan_mismatch');
    expect(result?.title).toContain('main_receipt_unbacked');
  });

  test('shows no receipt badge for a clean observation', () => {
    const result = prStatusBadge({
      receipt_check: {
        ok: true,
        probe_error: false,
        codes: [],
        blocking_codes: []
      },
      gate: { enabled: true }
    });

    expect(result?.label).toBe('머지 가능');
  });

  test('stays quiet when the receipt observation itself failed', () => {
    const result = prStatusBadge({
      receipt_check: {
        ok: false,
        probe_error: true,
        codes: [],
        blocking_codes: []
      },
      gate: { enabled: true }
    });

    expect(result?.label).toBe('머지 가능');
  });

  test('keeps the review receipt above the execution receipt', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_missing' },
      receipt_check: {
        ok: false,
        probe_error: false,
        codes: ['dispatch_forged'],
        blocking_codes: ['dispatch_forged']
      }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
  });

  test('keeps a continuation choice above progress and failures', () => {
    const result = prStatusBadge({
      continuation_required: true,
      merge_step: { label: 'squash merge' },
      queue_failure: 'not_in_pr_wait'
    });

    expect(result).toMatchObject({ label: '이어하기 선택 필요', alert: true });
  });

  test('keeps progress above an actionable gate', () => {
    const result = prStatusBadge({
      merge_step: { label: 'squash merge' },
      gate: { reason: 'base_behind' }
    });

    expect(result).toMatchObject({ label: '머지 중', live: true });
  });

  test('keeps an actionable gate above a failure record', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_stale' },
      queue_failure: 'not_in_pr_wait'
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
    expect(result?.title).toContain('not_in_pr_wait');
  });

  test('explains a stale receipt as abnormal history, not a moved head', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_stale' }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
    expect(result?.title).toContain('조상이 아닙니다');
  });

  test('holds an undetermined review verdict with the other three (UI-qksl §4 1번)', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_undetermined' }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
    expect(result?.title).toContain('ancestry probe를 완료하지 못했습니다');
    expect(result?.title).toContain('[리뷰 후 머지]가 이 보류의 출구입니다');
  });

  test('keeps the stale wording to history, not to probe failure', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_stale' }
    });

    expect(result?.title).not.toContain('확인에 실패');
  });

  test('explains a missing receipt without the ancestry wording', () => {
    const result = prStatusBadge({
      gate: { reason: 'review_receipt_missing' }
    });

    expect(result?.label).toBe('최종 변경 리뷰 필요');
    expect(result?.title).toContain('리뷰 영수증이 없습니다');
  });

  test('labels an absent spec_id as its own defect, not a review ask', () => {
    const result = prStatusBadge({
      gate: { reason: 'spec_id_missing' }
    });

    expect(result).toMatchObject({ label: '스펙 ID 누락', alert: true });
    expect(result?.title).toContain('bd update --spec-id');
  });

  test('names an absent spec_id in a merge failure record', () => {
    expect(mergeFailureText('spec_id_missing')).toBe('스펙 ID 기록 없음');
  });

  test('keeps a failure record above a waiting position', () => {
    const result = prStatusBadge({
      queue_failure: 'not_in_pr_wait',
      queued: true,
      queue_active: false,
      queue_position: 2
    });

    expect(result).toMatchObject({
      label: '머지 실패 — PR 대기 상태 동기화 실패',
      alert: true
    });
    expect(result?.title).toContain('not_in_pr_wait');
  });

  test('keeps a waiting position above merge eligibility', () => {
    const result = prStatusBadge({
      queued: true,
      queue_active: false,
      queue_position: 3,
      gate: { enabled: true }
    });

    expect(result?.label).toBe('머지 대기 #3');
  });

  test('renders an unmapped failure code verbatim', () => {
    const result = prStatusBadge({ queue_failure: 'brand_new_reason' });

    expect(result?.label).toBe('머지 실패 — brand_new_reason');
    expect(result?.title).toContain('brand_new_reason');
  });
});
