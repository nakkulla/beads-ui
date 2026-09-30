import { describe, expect, test } from 'vitest';
import { buildLanes } from './lane-model.js';

const WS = '/w/repo-a';
const MERGE_SHA = 'b'.repeat(40);

/**
 * @param {Record<string, any>} [gate]
 * @returns {Record<string, any>}
 */
function observed(gate = {}) {
  return {
    pr: { number: 7, url: 'https://github.com/o/r/pull/7', head_sha: 'h1' },
    gate: {
      enabled: false,
      tier: 'blocked',
      gate_badge: '관측 대기',
      base_badge: '최신',
      reason: null,
      ...gate
    }
  };
}

/**
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function workspace(patch = {}) {
  return {
    root_dir: WS,
    name: 'repo-a',
    revision: 3,
    queue: [],
    serial_lanes: [],
    pr_wait: [{ bead_id: 'UI-dbn6', added_at: 1 }],
    done: [],
    runnable: [],
    attempts: {},
    pr_observations: { 'UI-dbn6': observed() },
    bead_titles: { 'UI-dbn6': '프런트엔드 재작성' },
    ...patch
  };
}

/**
 * The PR row of one workspace under the Worker-grade projection.
 *
 * @param {Record<string, any>} patch
 * @param {Record<string, any>} [options]
 * @returns {any}
 */
function row(patch, options = {}) {
  return buildLanes(
    [workspace(patch)],
    [{ root_dir: WS, name: 'repo-a', revision: 3, slots: 1 }],
    { pr_wait_detail: true, ...options }
  ).pr_wait[0];
}

describe('PR 대기 행 — Worker 투영 (UI-dbn6 P1-r2)', () => {
  test('labels a base_behind row base 갱신 후 머지 and keeps it clickable', () => {
    const pr = row({
      pr_observations: { 'UI-dbn6': observed({ reason: 'base_behind' }) }
    });

    expect(pr).toMatchObject({
      merge_label: 'base 갱신 후 머지',
      merge_enabled: true,
      merge_title: 'base를 자동 갱신한 뒤 머지합니다',
      badges: ['base 갱신 필요']
    });
  });

  test('labels a missing review receipt 리뷰 후 머지', () => {
    const pr = row({
      pr_observations: {
        'UI-dbn6': observed({
          tier: 'review',
          reason: 'review_receipt_missing'
        })
      }
    });

    expect(pr).toMatchObject({
      merge_label: '리뷰 후 머지',
      merge_enabled: true,
      badges: ['최종 변경 리뷰 필요']
    });
  });

  test('offers 다시 머지 on a queued row without an authority', () => {
    const pr = row({
      pr_observations: { 'UI-dbn6': observed({ enabled: true }) },
      merge_queue: [{ bead_id: 'UI-dbn6' }],
      merge_queue_state: { active: null, failures: {} }
    });

    expect(pr).toMatchObject({ merge_label: '다시 머지', merge_enabled: true });
  });

  test('shows the merge queue place of a waiting row', () => {
    const pr = row({
      merge_queue: [
        { bead_id: 'dotfiles-hwmfv', authority: { source: 'manual' } },
        { bead_id: 'UI-dbn6', authority: { source: 'manual' } }
      ],
      merge_queue_state: { active: 'dotfiles-hwmfv', failures: {} }
    });

    expect(pr.badges).toEqual(['머지 대기 #2']);
  });

  test('reads the driver skip reason from merge_queue_state failures', () => {
    const pr = row({
      merge_queue_state: {
        active: null,
        failures: { 'UI-dbn6': 'resolution_round_cap' }
      }
    });

    expect(pr.badges).toEqual(['머지 실패 — 충돌 해소 2회 초과']);
  });

  test('reads the resolver wait reason of the waiting row', () => {
    const pr = row({
      merge_queue: [{ bead_id: 'UI-dbn6', authority: { source: 'manual' } }],
      merge_queue_state: {
        active: null,
        failures: {},
        waiting: { bead_id: 'UI-dbn6', reason: 'completion_waiting:gating' }
      }
    });

    expect(pr.badges).toEqual(['머지 조건 확인 중']);
  });

  test('draws the retry ladder of an automatic resolution', () => {
    const pr = row({
      completion_status: {
        'UI-dbn6': {
          phase: 'retrying',
          auto_resolution: { attempts: 1, attempt_cap: 3, origin_reason: 'x' }
        }
      }
    });

    expect(pr.badges).toEqual(['재시도 1/3']);
    expect(pr.live_badge).toBe('재시도 1/3');
  });

  test('explains a needs_human completion in the badge tooltip', () => {
    const pr = row({
      completion_status: {
        'UI-dbn6': {
          phase: 'needs_human',
          head_sha: 'abc1234',
          failure_stage: 'verify',
          failure_reason: 'verify_red'
        }
      }
    });

    expect(pr.badges).toEqual(['확인 필요']);
    expect(pr.alert).toBe(true);
    expect(pr.completion_title).toContain('head abc1234');
    expect(pr.completion_phase).toBe('needs_human');
  });

  test('locks the cancel action while the completion merges', () => {
    const pr = row({
      merge_queue: [{ bead_id: 'UI-dbn6', authority: { source: 'manual' } }],
      merge_queue_state: { active: null, failures: {} },
      completion_status: { 'UI-dbn6': { phase: 'merging' } }
    });

    expect(pr).toMatchObject({
      cancel_action: true,
      cancel_enabled: false,
      cancel_title: '머지 중 — 중단하려면 상단 자동 머지 중단을 사용하세요'
    });
  });

  test('passes an automatic skip only while auto-merge is on', () => {
    const pr = row({
      auto_merge: true,
      auto_merge_skips: {
        'UI-dbn6': { reason: 'spec_id_missing', head_sha: 'h1' }
      }
    });

    expect(pr.badges).toEqual(['자동 제외 — 스펙 ID 기록 없음']);
  });

  test('flags a PR whose attempt targets another base', () => {
    const pr = row({
      declared_base: 'main',
      attempts: {
        a1: {
          attempt_id: 'a1',
          bead_id: 'UI-dbn6',
          status: 'done',
          started_at: 5,
          target_base: 'release'
        }
      }
    });

    expect(pr.badges).toEqual(['다른 base 대상']);
    expect(pr.merge_enabled).toBe(false);
  });

  test('says a review session runs on a review hold', () => {
    const pr = row({
      pr_observations: {
        'UI-dbn6': observed({ tier: 'review', reason: 'review_receipt_stale' })
      },
      attempts: {
        r1: {
          attempt_id: 'r1',
          bead_id: 'UI-dbn6',
          kind: 'review_session',
          status: 'running',
          started_at: 9,
          origin: 'auto'
        }
      }
    });

    expect(pr.badges).toEqual(['최종 변경 리뷰 필요 · 자동 리뷰 세션 실행 중']);
    expect(pr.merge_enabled).toBe(false);
  });

  test('keeps a PR row beside its paused conflict-resolution session', () => {
    const lanes = buildLanes(
      [
        workspace({
          pr_observations: { 'UI-dbn6': observed({ base_badge: '충돌' }) },
          attempts: {
            i1: {
              attempt_id: 'i1',
              bead_id: 'UI-dbn6',
              status: 'done',
              started_at: 1
            },
            c1: {
              attempt_id: 'c1',
              bead_id: 'UI-dbn6',
              status: 'paused',
              started_at: 2,
              conflict_resolution: true
            }
          }
        })
      ],
      [{ root_dir: WS, name: 'repo-a', revision: 3, slots: 1 }],
      { pr_wait_detail: true }
    );

    expect(lanes.pr_wait.map((item) => item.badges)).toEqual([
      ['충돌 해소 일시정지']
    ]);
  });

  test('holds the click window of a pending merge request', () => {
    const pr = row(
      { pr_observations: { 'UI-dbn6': observed({ enabled: true }) } },
      { pr_pending: new Map([[`${WS}\u0000UI-dbn6`, 'merge']]) }
    );

    expect(pr.badges).toEqual(['큐 등록 중']);
    expect(pr.merge_enabled).toBe(false);
  });

  test('names the stalled deploy script on the cleanup button', () => {
    const pr = row({
      pr_wait: [{ bead_id: 'UI-dbn6', added_at: 1, merge_sha: MERGE_SHA }],
      pr_observations: {
        'UI-dbn6': observed({ tier: 'merged', gate_badge: '머지됨' })
      },
      cleanup_failed: {
        'UI-dbn6': { step: 'repo_operations', reason: 'deploy failed' }
      },
      repo_operations: [
        {
          operation_id: 'op-1',
          kind: 'deploy',
          state: 'failed',
          subjects: [{ bead_id: 'UI-dbn6', merged_sha: MERGE_SHA }]
        }
      ]
    });

    expect(pr.merge_label).toBe('배포 재시도 후 정리');
    expect(pr.cleanup_failed).toMatchObject({ step: 'repo_operations' });
  });

  test('enables the cleanup click whose label names the stalled script', () => {
    const pr = row({
      pr_wait: [{ bead_id: 'UI-dbn6', added_at: 1, merge_sha: MERGE_SHA }],
      pr_observations: {
        'UI-dbn6': observed({ tier: 'merged', gate_badge: '머지됨' })
      },
      cleanup_failed: {
        'UI-dbn6': { step: 'repo_operations', reason: 'deploy failed' }
      },
      repo_operations: [
        {
          operation_id: 'op-1',
          kind: 'deploy',
          state: 'failed',
          subjects: [{ bead_id: 'UI-dbn6', merged_sha: MERGE_SHA }]
        }
      ]
    });

    expect(pr.merge_enabled).toBe(true);
  });

  test('keeps the click locked while a stalled script operation runs again', () => {
    const pr = row({
      pr_wait: [
        {
          bead_id: 'UI-dbn6',
          added_at: 1,
          merge_sha: MERGE_SHA,
          cleanup_cursor: 'repo_operations'
        }
      ],
      pr_observations: {
        'UI-dbn6': observed({ tier: 'merged', gate_badge: '머지됨' })
      },
      cleanup_failed: {
        'UI-dbn6': { step: 'repo_operations', reason: 'deploy failed' }
      },
      repo_operations: [
        {
          operation_id: 'op-2',
          kind: 'deploy',
          state: 'running',
          subjects: [{ bead_id: 'UI-dbn6', merged_sha: MERGE_SHA }]
        }
      ]
    });

    expect(pr.merge_enabled).toBe(false);
  });

  test('keeps the coarse gate badge without the Worker projection option', () => {
    const lanes = buildLanes(
      [
        workspace({
          merge_queue_state: {
            active: null,
            failures: { 'UI-dbn6': 'resolution_round_cap' }
          }
        })
      ],
      [{ root_dir: WS, name: 'repo-a', revision: 3, slots: 1 }]
    );

    expect(lanes.pr_wait[0].badges).toEqual(['관측 대기']);
  });
});
