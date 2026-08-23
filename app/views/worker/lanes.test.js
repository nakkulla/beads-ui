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
  formatElapsed,
  miniRow,
  repoOpsStripModel,
  staleWorkProjection,
  sumAttemptWorkMs
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
 * @param {{ bead_id: string, lanes: Array<{ id: 'parallel'|'s1'|'s2'|'s3'|'s4'|'s5', label: string, count: number }> }|null} [place_menu]
 * @returns {HTMLElement}
 */
function renderCandidate(item, place_menu = null) {
  render(
    candidateCard(
      /** @type {any} */ ({
        id: 'UI-qf',
        title: 'quick fix',
        draggable: true,
        lane: 'candidate',
        reason: '',
        workflow: {
          route: 'quick_fix',
          route_source: 'explicit',
          stages: {
            impl: { fill: 'none', glyph: null, stale: false },
            close: { fill: 'none', glyph: null, stale: false }
          }
        },
        ...item
      }),
      place_menu
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

  test('renders the summed attempt work time on the second line', () => {
    const row = renderRow({ work_ms: 754_000 });

    const work_el = row.querySelector('.worker-mini__work');

    expect(work_el?.textContent).toBe('작업 12분 34초');
  });

  test('omits the work time when the entry carries none', () => {
    const row = renderRow({ usage: USAGE });

    expect(row.querySelector('.worker-mini__work')).toBeNull();
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

  test('renders branch residue with commit count and allowed actions', () => {
    const stale_work = staleWorkProjection({
      reason: 'worktree_stale_work',
      stale_work: {
        residue: 'branch',
        state: 'unique',
        cause: 'ahead_not_contained',
        summary: {
          staged_count: 4,
          unstaged_count: 3,
          untracked_count: 2,
          branch_ahead: 5,
          head_ahead: 0
        },
        action_id: 'opaque-action',
        can_resume: false,
        can_continue: false,
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

    expect(row.textContent).toContain('이전 브랜치 보존됨');
    expect(row.textContent).toContain('고유 commit 5');
    expect(row.textContent).not.toContain('staged 4');
    expect(row.textContent).not.toContain('unstaged 3');
    expect(row.textContent).not.toContain('untracked 2');
    expect(row.textContent).toContain(
      '로컬 branch의 고유 commit이 최신 base에 포함됐음을 증명하지 못했습니다'
    );
    expect(row.querySelector('.worker-mini__stale-continue')).toBeNull();
    expect(row.querySelector('.worker-mini__stale-backup')).not.toBeNull();
    expect(row.querySelector('.worker-mini__stale-recheck')).not.toBeNull();
  });
});

describe('candidate card', () => {
  test('keeps a described quick_fix candidate draggable with an active queue button', () => {
    const card = renderCandidate({});
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(card.getAttribute('draggable')).toBe('true');
    expect(place.disabled).toBe(false);
    expect(place.title).toBe('대기 큐 맨 뒤에 추가');
    expect(card.textContent).not.toContain('워커 비대상');
  });

  test('disables a description-less quick_fix candidate with its honest reason', () => {
    const card = renderCandidate({
      draggable: false,
      reason: 'missing_description'
    });
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(card.getAttribute('draggable')).toBe('false');
    expect(card.querySelector('.worker-card__reason')?.textContent).toBe(
      'missing_description'
    );
    expect(place.disabled).toBe(true);
    expect(place.title).toBe('description이 없어 대기 큐에 넣을 수 없습니다');
    expect(card.textContent).not.toContain('워커 비대상');
  });

  test('renders lane choices only for the matching candidate menu', () => {
    const card = renderCandidate(
      { reason: '🔒 UI-blocker' },
      {
        bead_id: 'UI-qf',
        lanes: [
          { id: 'parallel', label: '병렬', count: 3 },
          { id: 's1', label: '직렬 1', count: 0 }
        ]
      }
    );

    const choices = Array.from(
      card.querySelectorAll('.worker-card__place-lane')
    );
    expect(
      choices.map((choice) => choice.textContent?.replace(/\s+/g, ' ').trim())
    ).toEqual(['병렬 3', '직렬 1 0']);
    expect(card.querySelector('.worker-card__place')).toBeNull();
    expect(card.querySelector('.worker-card__reason')).toBeNull();
    expect(card.querySelector('.worker-card__place-cancel')).not.toBeNull();
  });

  test('keeps the closed card when the menu belongs to another candidate', () => {
    const card = renderCandidate(
      { reason: '🔒 UI-blocker' },
      {
        bead_id: 'UI-other',
        lanes: [{ id: 'parallel', label: '병렬', count: 3 }]
      }
    );

    expect(card.querySelector('.worker-card__place')).not.toBeNull();
    expect(card.querySelector('.worker-card__reason')?.textContent).toBe(
      '🔒 UI-blocker'
    );
    expect(card.querySelector('.worker-card__place-menu')).toBeNull();
  });

  test('keeps lane choices closed when the candidate loses eligibility', () => {
    const card = renderCandidate(
      { draggable: false, reason: 'spec 없음' },
      {
        bead_id: 'UI-qf',
        lanes: [{ id: 'parallel', label: '병렬', count: 3 }]
      }
    );
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(place.disabled).toBe(true);
    expect(card.querySelector('.worker-card__place-menu')).toBeNull();
  });
});

describe('worker-ineligible candidate card (UI-8881)', () => {
  const INELIGIBLE_TITLE =
    'worker-ineligible label로 워커에서 실행할 수 없습니다';

  test('marks the card with the ineligible modifier and chip', () => {
    const card = renderCandidate({ draggable: false, worker_ineligible: true });

    expect(card.classList.contains('worker-card--ineligible')).toBe(true);
    expect(
      card.querySelector('.worker-card__ineligible')?.textContent?.trim()
    ).toBe('⛔ worker-ineligible');
  });

  test('places the chip after the id and before the route chip', () => {
    const card = renderCandidate({ draggable: false, worker_ineligible: true });
    const head = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__head')
    );

    const kids = Array.from(head.children);
    const id_index = kids.findIndex((el) =>
      el.classList.contains('worker-card__id')
    );
    const chip_index = kids.findIndex((el) =>
      el.classList.contains('worker-card__ineligible')
    );
    const route_index = kids.findIndex((el) =>
      el.classList.contains('ctl-chip--route')
    );

    expect(id_index).toBeGreaterThanOrEqual(0);
    expect(chip_index).toBeGreaterThan(id_index);
    expect(route_index).toBeGreaterThan(chip_index);
  });

  test('suppresses the grip and refuses the drag affordance', () => {
    const card = renderCandidate({ worker_ineligible: true });

    expect(card.getAttribute('draggable')).toBe('false');
    expect(card.querySelector('.worker-card__grip')).toBeNull();
  });

  test('disables the queue button with the worker-ineligible tooltip', () => {
    const card = renderCandidate({ draggable: false, worker_ineligible: true });
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(place.disabled).toBe(true);
    expect(place.title).toBe(INELIGIBLE_TITLE);
  });

  test('prefers the worker-ineligible tooltip over missing_description', () => {
    const card = renderCandidate({
      draggable: false,
      worker_ineligible: true,
      reason: 'missing_description'
    });
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(place.title).toBe(INELIGIBLE_TITLE);
    expect(card.querySelector('.worker-card__reason')?.textContent).toBe(
      'missing_description'
    );
  });

  test('prefers the worker-ineligible tooltip over the spec-missing branch', () => {
    const card = renderCandidate({
      draggable: false,
      worker_ineligible: true,
      reason: 'spec 없음'
    });
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(place.title).toBe(INELIGIBLE_TITLE);
    expect(card.querySelector('.worker-card__reason')?.textContent).toBe(
      'spec 없음'
    );
  });

  test('keeps the lane menu closed for an ineligible candidate', () => {
    const card = renderCandidate(
      { worker_ineligible: true },
      {
        bead_id: 'UI-qf',
        lanes: [{ id: 'parallel', label: '병렬', count: 3 }]
      }
    );

    expect(card.querySelector('.worker-card__place-menu')).toBeNull();
    expect(card.querySelector('.worker-card__place')).not.toBeNull();
  });

  test('keeps the id and title elements a click can still reach', () => {
    const card = renderCandidate({
      worker_ineligible: true,
      title: '관측 전용 후보'
    });

    expect(card.querySelector('.worker-card__id')?.textContent).toBe('UI-qf');
    expect(card.querySelector('.worker-card__title')?.textContent).toBe(
      '관측 전용 후보'
    );
  });

  test('leaves an eligible candidate free of the ineligible markers', () => {
    const card = renderCandidate({});

    expect(card.classList.contains('worker-card--ineligible')).toBe(false);
    expect(card.querySelector('.worker-card__ineligible')).toBeNull();
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

describe('formatElapsed hour tier', () => {
  test('renders hours and minutes past the 60-minute boundary', () => {
    const elapsed_ms = (2 * 60 + 5) * 60 * 1000;

    expect(formatElapsed(elapsed_ms)).toBe('2시간 5분');
  });
});

describe('sumAttemptWorkMs', () => {
  test('sums finished minus started across multiple attempts of the bead', () => {
    const attempts = {
      a1: { bead_id: 'UI-x1', started_at: 1000, finished_at: 4000 },
      a2: { bead_id: 'UI-x1', started_at: 5000, finished_at: 9000 }
    };

    const total = sumAttemptWorkMs(attempts, 'UI-x1');

    expect(total).toBe(7000);
  });

  test('skips attempts with null or missing timestamps', () => {
    const attempts = {
      a1: { bead_id: 'UI-x1', started_at: 1000, finished_at: 4000 },
      a2: { bead_id: 'UI-x1', started_at: null, finished_at: 9000 },
      a3: { bead_id: 'UI-x1', started_at: 1000 }
    };

    const total = sumAttemptWorkMs(attempts, 'UI-x1');

    expect(total).toBe(3000);
  });

  test("skips other beads' attempts", () => {
    const attempts = {
      a1: { bead_id: 'UI-x1', started_at: 1000, finished_at: 4000 },
      a2: { bead_id: 'UI-other', started_at: 0, finished_at: 100_000 }
    };

    const total = sumAttemptWorkMs(attempts, 'UI-x1');

    expect(total).toBe(3000);
  });

  test('returns null when nothing qualifies', () => {
    const attempts = {
      a1: { bead_id: 'UI-x1', started_at: null, finished_at: null },
      a2: { bead_id: 'UI-other', started_at: 0, finished_at: 100_000 }
    };

    const total = sumAttemptWorkMs(attempts, 'UI-x1');

    expect(total).toBeNull();
  });

  test('returns null for a missing or malformed attempts map', () => {
    expect(sumAttemptWorkMs(null, 'UI-x1')).toBeNull();
    expect(sumAttemptWorkMs(undefined, 'UI-x1')).toBeNull();
  });
});
