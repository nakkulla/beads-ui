import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  candidateCard,
  discardCompletionMessage,
  discardConfirmationMessage,
  discardPhaseLabel,
  discardProjection,
  discardReceiptTemplate,
  formatClock,
  miniRow,
  repoOpsStripModel,
  staleWorkProjection
} from './lanes.js';

/** @type {HTMLElement} */
let mount;

/**
 * @param {Partial<import('./lanes.js').MiniItem>} item
 * @returns {HTMLElement}
 */
function renderRow(item) {
  render(
    miniRow(
      /** @type {any} */ ({
        id: 'UI-x1',
        title: '완료된 아주 긴 제목이 한 줄을 다 써도 잘리지 않아야 한다',
        draggable: false,
        lane: 'done',
        done: true,
        ...item
      })
    ),
    mount
  );
  return /** @type {HTMLElement} */ (mount.querySelector('.worker-mini'));
}

/**
 * @param {Partial<import('./lanes.js').MiniItem>} item
 * @returns {HTMLElement}
 */
function renderCandidate(item) {
  render(
    candidateCard(
      /** @type {any} */ ({
        id: 'UI-qf',
        title: 'quick fix',
        draggable: false,
        lane: 'candidate',
        reason: 'quick_fix · 워커 비대상',
        workflow: {
          route: 'quick_fix',
          route_source: 'explicit',
          stages: {
            impl: { fill: 'none', glyph: null, stale: false },
            close: { fill: 'none', glyph: null, stale: false }
          }
        },
        ...item
      })
    ),
    mount
  );
  return /** @type {HTMLElement} */ (mount.querySelector('.worker-card'));
}

const USAGE = {
  input_tokens: 1000,
  output_tokens: 500,
  total_tokens: 1500,
  cost_usd: 0.42
};

beforeEach(() => {
  document.body.innerHTML = '<div id="lane"></div>';
  mount = /** @type {HTMLElement} */ (document.getElementById('lane'));
});

describe('merge progress row', () => {
  test('renders the shared fixed position and progress rail', () => {
    const row = renderRow({
      lane: 'pr_wait',
      merge_step: {
        step: 'deploy',
        label: '배포 중',
        index: 4,
        total: 7,
        percent: 57,
        active: true,
        failed: false
      }
    });

    expect(row.classList.contains('worker-mini--merging')).toBe(true);
    expect(row.getAttribute('style')).toContain('--progress: 57%');
    expect(row.textContent?.replace(/\s+/g, '')).toContain('배포중4/7');
  });

  test('marks a failed operation with the existing warning token modifier', () => {
    const row = renderRow({
      lane: 'pr_wait',
      merge_step: {
        step: 'verify',
        label: '검증 실패',
        index: 3,
        total: 7,
        percent: 43,
        active: false,
        failed: true
      }
    });

    expect(row.classList.contains('worker-mini--merge-failed')).toBe(true);
    expect(row.querySelector('.merge-step--failed')).not.toBeNull();
  });
});

describe('done lane row', () => {
  test('renders separate Claude and Codex usage badges without a grand total', () => {
    const row = renderRow({
      usage: {
        providers: {
          claude: {
            subtotal: 15,
            breakdown: { input_tokens: 10, output_tokens: 5 }
          },
          codex: {
            subtotal: 8,
            breakdown: {
              input_tokens: 5,
              output_tokens: 3,
              cache_read_input_tokens: 100,
              reasoning_output_tokens: 2
            }
          }
        },
        roles: {}
      }
    });

    const badges = Array.from(row.querySelectorAll('.worker-usage')).map((el) =>
      el.textContent?.trim()
    );

    expect(badges).toEqual(['Claude τ 15', 'Codex τ 8']);
    expect(row.textContent).not.toContain('τ 23');
    expect(
      Array.from(row.querySelectorAll('.worker-usage'))
        .at(-1)
        ?.getAttribute('title')
    ).toContain('subset');
  });

  test('gives the first line the id and title with no usage badge', () => {
    const row = renderRow({ usage: USAGE });

    const first = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__row1')
    );
    expect(first.querySelector('.worker-mini__id')?.textContent).toContain(
      'UI-x1'
    );
    expect(first.querySelector('.worker-mini__title')?.textContent).toContain(
      '잘리지 않아야'
    );
    expect(first.querySelector('.worker-usage')).toBeNull();
  });

  test('puts usage and the completion time on the second line', () => {
    const row = renderRow({ usage: USAGE, done_at: Date.now() - 3_600_000 });

    const second = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__row2')
    );
    expect(second.querySelector('.worker-usage')).not.toBeNull();
    expect(
      second.querySelector('.worker-mini__done-at')?.textContent
    ).toContain('1시간 전');
  });

  test('omits the completion time when the entry carries none', () => {
    const row = renderRow({ usage: USAGE });

    expect(row.querySelector('.worker-mini__done-at')).toBeNull();
  });

  test('keeps the drag contract attributes on the row shell', () => {
    const row = renderRow({});

    expect(row.getAttribute('data-bead-id')).toBe('UI-x1');
    expect(row.getAttribute('data-lane')).toBe('done');
    expect(row.classList.contains('worker-mini--done')).toBe(true);
  });

  test('leaves a queue row as a single line', () => {
    const row = renderRow({ lane: 'queue', done: false, draggable: true });

    expect(row.querySelector('.worker-mini__row1')).toBeNull();
    expect(row.querySelector('.worker-mini__line')).not.toBeNull();
  });
});

describe('waiting row (UI-04vo 직렬 레인)', () => {
  test('renders no bulk checkbox and keeps the decorative grip', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true
    });

    expect(row.querySelector('.worker-mini__select')).toBeNull();
    // 드래그는 행 전체에서 시작하므로 grip은 장식 핸들이다.
    expect(row.getAttribute('draggable')).toBe('true');
    expect(
      row.querySelector('.worker-mini__grip')?.getAttribute('aria-hidden')
    ).toBe('true');
  });

  test('renders a legacy worker-serial chip as display-only residue', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      worker_serial: true
    });

    const chip = row.querySelector('.worker-mini__serial');
    expect(chip?.classList.contains('worker-mini__serial--legacy')).toBe(true);
    expect(chip?.textContent).toContain('worker-serial');
  });

  test('renders a serial-lane row with its sequence number', () => {
    const row = renderRow({
      lane: 's1',
      done: false,
      draggable: true,
      seq: 2
    });

    expect(row.getAttribute('data-lane')).toBe('s1');
    expect(row.querySelector('.worker-mini__seq')?.textContent).toBe('2');
  });

  test('renders a ghost occupancy row dimmed and undraggable', () => {
    const row = renderRow({
      lane: 's1',
      done: false,
      draggable: false,
      ghost: true,
      badges: ['실패 · 점유 유지']
    });

    expect(row.classList.contains('worker-mini--ghost')).toBe(true);
    expect(row.getAttribute('draggable')).toBe('false');
    expect(row.textContent).toContain('실패 · 점유 유지');
  });

  test('renders stale-work summary and only allowed recovery actions', () => {
    const stale_work = staleWorkProjection({
      reason: 'worktree_stale_work',
      stale_work: {
        state: 'unique',
        cause: 'untracked_present',
        summary: {
          staged_count: 1,
          unstaged_count: 2,
          untracked_count: 3,
          branch_ahead: 1,
          head_ahead: 0
        },
        action_id: 'opaque-action',
        can_resume: false,
        can_continue: true,
        can_backup_fresh: true,
        can_recheck: true
      }
    });

    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: false,
      stale_work
    });

    expect(row.textContent).toContain('이전 작업 보존됨');
    expect(row.textContent).toContain('staged 1 · unstaged 2 · untracked 3');
    expect(row.textContent).toContain('추적되지 않은 파일이 남아 있습니다');
    expect(row.querySelector('.worker-mini__stale-continue')).not.toBeNull();
    expect(row.querySelector('.worker-mini__stale-backup')).not.toBeNull();
    expect(row.querySelector('.worker-mini__stale-recheck')).not.toBeNull();
    expect(row.textContent?.replace(/\s+/g, ' ')).toContain(
      'Git-ignored dependency/build output은 archive에 포함되지 않습니다'
    );
    expect(row.textContent).not.toContain('worktree_stale_work');
    expect(row.getAttribute('draggable')).toBe('false');
  });

  test('renders unknown stale work with recheck only', () => {
    const stale_work = staleWorkProjection({
      reason: 'worktree_stale_work',
      stale_work: {
        state: 'unknown',
        cause: 'observe_failed',
        summary: {
          staged_count: 0,
          unstaged_count: 0,
          untracked_count: 0,
          branch_ahead: 0,
          head_ahead: 0
        },
        action_id: 'opaque-action',
        can_resume: false,
        can_continue: false,
        can_backup_fresh: false,
        can_recheck: true
      }
    });

    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: false,
      stale_work
    });

    expect(row.textContent).toContain('이전 작업 상태 확인 실패');
    expect(row.querySelector('.worker-mini__stale-continue')).toBeNull();
    expect(row.querySelector('.worker-mini__stale-backup')).toBeNull();
    expect(row.querySelector('.worker-mini__stale-recheck')).not.toBeNull();
  });
});

describe('candidate card', () => {
  test('explains why a quick_fix route cannot enter the worker queue', () => {
    const card = renderCandidate({});

    expect(
      card.querySelector('.worker-card__place')?.getAttribute('title')
    ).toBe('quick_fix route는 워커 실행 대상이 아닙니다');
  });
});

describe('discard receipts', () => {
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

  test('maps durable phases to the five user-facing progress labels', () => {
    expect(discardPhaseLabel('requested')).toBe('백업 중');
    expect(discardPhaseLabel('signaled')).toBe('runner 종료 중');
    expect(discardPhaseLabel('runner_terminated')).toBe('PR 정리 중');
    expect(discardPhaseLabel('revert_local_prepared')).toBe('revert PR 대기');
    expect(discardPhaseLabel('rollback_verified')).toBe('원복 배포 중');
  });

  test('shows no deletion before a failed backup has a receipt', () => {
    const discard = discardProjection(
      {
        'discard-1': {
          operation_id: 'discard-1',
          bead_id: 'UI-x1',
          phase: 'requested',
          last_error: 'archive_failed'
        }
      },
      'UI-x1'
    );

    render(discardReceiptTemplate({ discard }), mount);

    expect(mount.textContent).toContain('아직 아무것도 삭제하지 않음');
    expect(mount.textContent).toContain('작업: discard-1');
    expect(mount.textContent).toContain('백업 중');
    expect(mount.textContent).toContain('폐기 실패: archive_failed');
  });

  test('keeps the archive path after a failed later phase', () => {
    const discard = discardProjection(
      {
        'discard-1': {
          operation_id: 'discard-1',
          bead_id: 'UI-x1',
          phase: 'runner_terminated',
          last_error: 'pr_close_failed',
          backup: { path: '/state/discard-1' }
        }
      },
      'UI-x1'
    );

    render(discardReceiptTemplate({ discard }), mount);

    expect(mount.textContent).toContain('/state/discard-1');
  });

  test('hides a stale-work archive path while cleanup is still running', () => {
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

    render(discardReceiptTemplate({ discard }), mount);

    expect(mount.textContent).not.toContain('/state/stale-work-1');
    expect(discard.enabled).toBe(false);
  });

  test('shows stale-work archive and retry only after cleanup failure', () => {
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

    render(discardReceiptTemplate({ discard }), mount);

    expect(mount.textContent).toContain('/state/stale-work-1');
    expect(discard.label).toBe('백업 정리 재시도');
    expect(discard.enabled).toBe(true);
  });

  test('shows the current revert PR state after a later failure', () => {
    const discard = discardProjection(
      {
        'discard-1': {
          operation_id: 'discard-1',
          bead_id: 'UI-x1',
          phase: 'revert_pr_wait',
          last_error: 'revert_observe_failed',
          revert_pr: {
            number: 2,
            url: 'https://github.com/o/r/pull/2',
            state: 'OPEN'
          }
        }
      },
      'UI-x1'
    );

    render(discardReceiptTemplate({ discard }), mount);

    expect(mount.textContent?.replace(/\s+/g, ' ')).toContain(
      'revert PR #2 · OPEN'
    );
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

describe('repoOpsStripModel (UI-q0uy §4.1)', () => {
  /**
   * @param {Record<string, any>} [patch]
   */
  function card(patch = {}) {
    return {
      operation_id: 'op-1',
      kind: 'deploy',
      state: 'succeeded',
      target_sha: 'c'.repeat(40),
      finished_at: 1000,
      elapsed_ms: 64_000,
      ...patch
    };
  }

  test('renders nothing for a workspace with no repo work at all', () => {
    expect(repoOpsStripModel([], [])).toBeNull();
  });

  test('renders for a workspace whose only state is a stopped cleanup', () => {
    expect(
      repoOpsStripModel([], [{ bead_id: 'UI-a', step: 'child_sweep' }])
    ).not.toBeNull();
  });

  test('takes the newest successful deploy as the current one', () => {
    const model = repoOpsStripModel(
      [
        card({
          operation_id: 'old',
          target_sha: 'a'.repeat(40),
          finished_at: 1
        }),
        card()
      ],
      []
    );

    expect(model?.deploy?.sha).toBe('c'.repeat(7));
  });

  test('ignores a failed deploy when naming the current one', () => {
    const model = repoOpsStripModel(
      [card({ state: 'failed', finished_at: 9999 })],
      []
    );

    expect(model?.deploy).toBeNull();
  });

  test('ignores a verify operation when naming the current deployment', () => {
    const model = repoOpsStripModel([card({ kind: 'verify' })], []);

    expect(model?.deploy).toBeNull();
  });

  test('counts an unresolved failure and a stopped cleanup together', () => {
    const model = repoOpsStripModel(
      [card({ state: 'failed' })],
      [{ bead_id: 'UI-a', step: 'child_sweep' }]
    );

    expect(model?.unresolved).toBe(2);
  });

  test('drops an acknowledged failure from the tally', () => {
    const model = repoOpsStripModel(
      [card({ state: 'failed', dismissed: { at: 1, by: 'user' } })],
      []
    );

    expect(model?.badge).toEqual({ tone: 'quiet', label: '모두 정상' });
  });

  test('drops a superseded failure from the tally', () => {
    const model = repoOpsStripModel(
      [card({ state: 'failed', superseded_by: 'op-2' })],
      []
    );

    expect(model?.badge).toEqual({ tone: 'quiet', label: '모두 정상' });
  });

  test('reports a running repair session', () => {
    const model = repoOpsStripModel([card({ state: 'repairing' })], []);

    expect(model?.badge).toEqual({ tone: 'live', label: '자동 해결 중' });
  });

  test('lets 해결 필요 outrank a running repair session', () => {
    const model = repoOpsStripModel(
      [
        card({ state: 'repairing' }),
        card({ operation_id: 'op-2', state: 'failed' })
      ],
      []
    );

    expect(model?.badge.label).toBe('해결 필요 1');
  });
});

describe('formatClock', () => {
  test('renders a timestamp as local HH:MM', () => {
    const at = new Date(2026, 7, 14, 16, 29).getTime();

    expect(formatClock(at)).toBe('16:29');
  });

  test('renders nothing for an absent timestamp', () => {
    expect(formatClock(null)).toBe('');
  });
});
