import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  candidateCard,
  discardCompletionMessage,
  discardConfirmationMessage,
  discardPhaseLabel,
  discardProjection,
  discardReceiptTemplate,
  execChipsTemplate,
  formatClock,
  formatElapsed,
  miniRow,
  repoOpsStripModel,
  routeChipTemplate,
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

describe('discovered-from chip', () => {
  test('renders a from chip on a waiting row', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      from_id: 'UI-parent'
    });
    const chip = row.querySelector('.ctl-chip--from');

    expect(chip).not.toBeNull();
    expect(chip?.textContent?.trim()).toContain('↩ from UI-parent');
    expect(chip?.getAttribute('data-from-id')).toBe('UI-parent');
  });

  test('renders a from chip on a done row', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      draggable: false,
      from_id: 'UI-origin'
    });
    const chip = row.querySelector('.ctl-chip--from');

    expect(chip).not.toBeNull();
    expect(chip?.textContent?.trim()).toContain('↩ from UI-origin');
  });

  test('omits the from chip when from_id is absent', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true
    });

    expect(row.querySelector('.ctl-chip--from')).toBeNull();
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

  test('renders a discovered-from chip on a candidate card', () => {
    const card = renderCandidate({ from_id: 'UI-0' });
    const chip = card.querySelector('.ctl-chip--from');

    expect(chip).not.toBeNull();
    expect(chip?.textContent?.trim()).toContain('↩ from UI-0');
    expect(chip?.getAttribute('data-from-id')).toBe('UI-0');
  });

  test('omits the from chip when from_id is absent', () => {
    const card = renderCandidate({});

    expect(card.querySelector('.ctl-chip--from')).toBeNull();
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

describe('execChipsTemplate', () => {
  test('renders nothing when there are no chips', () => {
    render(execChipsTemplate(null), mount);

    expect(mount.querySelectorAll('.exec-chip')).toHaveLength(0);
  });

  test('renders nothing when both chips are null', () => {
    render(execChipsTemplate({ orchestration: null, worker: null }), mount);

    expect(mount.querySelectorAll('.exec-chip')).toHaveLength(0);
  });

  test('renders only the orchestration chip when the worker chip is null', () => {
    const chips = {
      orchestration: { text: 'claude · opus', title: '오케 툴팁' },
      worker: null
    };

    render(execChipsTemplate(chips), mount);

    expect(mount.querySelectorAll('.exec-chip')).toHaveLength(1);
    expect(mount.querySelector('.exec-chip--orch')).not.toBeNull();
    expect(mount.querySelector('.exec-chip--worker')).toBeNull();
  });

  test('renders only the worker chip when the orchestration chip is null', () => {
    const chips = {
      orchestration: null,
      worker: { text: 'codex · 5.6-sol', title: '워커 툴팁' }
    };

    render(execChipsTemplate(chips), mount);

    expect(mount.querySelectorAll('.exec-chip')).toHaveLength(1);
    expect(mount.querySelector('.exec-chip--worker')).not.toBeNull();
    expect(mount.querySelector('.exec-chip--orch')).toBeNull();
  });

  test('renders both chips with their prefix label and value spans', () => {
    const chips = {
      orchestration: { text: 'claude · opus', title: '오케 툴팁' },
      worker: { text: 'codex · 5.6-sol', title: '워커 툴팁' }
    };

    render(execChipsTemplate(chips), mount);

    const rendered = Array.from(
      mount.querySelectorAll('.exec-chip'),
      (chip) => [
        chip.querySelector('.exec-chip__k')?.textContent,
        chip.querySelector('.exec-chip__v')?.textContent
      ]
    );
    expect(rendered).toEqual([
      ['오케', 'claude · opus'],
      ['워커', 'codex · 5.6-sol']
    ]);
  });

  test('carries each chip tooltip on the title attribute', () => {
    const chips = {
      orchestration: { text: 'claude · opus', title: '오케 툴팁' },
      worker: { text: 'codex · 5.6-sol', title: '워커 툴팁' }
    };

    render(execChipsTemplate(chips), mount);

    expect(mount.querySelector('.exec-chip--orch')?.getAttribute('title')).toBe(
      '오케 툴팁'
    );
    expect(
      mount.querySelector('.exec-chip--worker')?.getAttribute('title')
    ).toBe('워커 툴팁');
  });
});

describe('exec chip placement', () => {
  const CHIPS = {
    orchestration: { text: 'claude · opus', title: '오케 툴팁' },
    worker: { text: 'codex · 5.6-sol', title: '워커 툴팁' }
  };

  /**
   * @param {Element} el
   * @returns {string[]} Direct-child class markers, in document order.
   */
  function childMarkers(el) {
    return Array.from(el.children, (child) => child.className);
  }

  test('puts the waiting one-line row exec chips after the line', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      exec_chips: /** @type {any} */ (CHIPS)
    });

    const markers = childMarkers(row);
    expect(markers.indexOf('worker-mini__exec')).toBe(
      markers.indexOf('worker-mini__line') + 1
    );
    expect(row.querySelectorAll('.worker-mini__exec .exec-chip')).toHaveLength(
      2
    );
  });

  test('omits the exec line on a waiting row without chips', () => {
    const row = renderRow({ lane: 'queue', done: false });

    expect(row.querySelector('.worker-mini__exec')).toBeNull();
  });

  test('puts the card-variant exec chips between the body and the foot', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      revise_action: true,
      revise_enabled: true,
      exec_chips: /** @type {any} */ (CHIPS)
    });

    const markers = childMarkers(row);
    expect(markers.indexOf('worker-mini__exec')).toBe(
      markers.indexOf('worker-mini__body') + 1
    );
    expect(markers.indexOf('worker-mini__exec')).toBeLessThan(
      markers.indexOf('worker-mini__foot')
    );
  });

  test('puts the candidate card exec chips before the foot', () => {
    const card = renderCandidate({ exec_chips: /** @type {any} */ (CHIPS) });

    const markers = childMarkers(card);
    expect(markers.indexOf('worker-mini__exec')).toBeGreaterThan(
      markers.indexOf('worker-card__title')
    );
    expect(markers.indexOf('worker-mini__exec')).toBeLessThan(
      markers.findIndex((marker) => marker.startsWith('worker-card__foot'))
    );
  });

  test('renders no exec chips on a done row', () => {
    const row = renderRow({ exec_chips: /** @type {any} */ (CHIPS) });

    expect(row.querySelector('.worker-mini__exec')).toBeNull();
  });

  test('renders no exec chips on a PR-wait row', () => {
    const row = renderRow({
      lane: 'pr_wait',
      done: false,
      exec_chips: /** @type {any} */ (CHIPS)
    });

    expect(row.querySelector('.worker-mini__exec')).toBeNull();
  });
});

/**
 * Serialize a rendered template as tag + sorted attributes + text, dropping
 * lit-html's marker comments (engine bookkeeping, not rendered content).
 *
 * @param {any} tpl
 * @returns {string}
 */
function shape(tpl) {
  const host = document.createElement('div');
  render(tpl, host);
  /**
   * @param {Node} node
   * @returns {string}
   */
  const walk = (node) => {
    if (node.nodeType === 8) {
      return '';
    }
    if (node.nodeType === 3) {
      return (node.textContent || '').replace(/\s+/g, ' ');
    }
    const element = /** @type {Element} */ (node);
    const tag = element.tagName.toLowerCase();
    const attrs = Array.from(element.attributes)
      .map((a) => `${a.name}="${a.value}"`)
      .sort()
      .join(' ');
    const kids = Array.from(element.childNodes).map(walk).join('');
    return `<${tag}${attrs ? ` ${attrs}` : ''}>${kids}</${tag}>`;
  };
  return Array.from(host.childNodes).map(walk).join('');
}

/**
 * UI-eey2 §5·§8: the monitor added three OPTIONAL knobs to these templates.
 * The Worker console passes none of them, so its rows must render exactly what
 * they rendered before — these snapshots are what makes "옵션 없으면 불변"
 * checkable rather than merely asserted.
 */
describe('worker templates are unchanged without the monitor options', () => {
  test('renders a waiting row with no dependency or pin markup', () => {
    const row = shape(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-a1',
          title: '대기 행',
          lane: 'queue',
          draggable: true,
          seq: 2,
          badges: ['b'],
          exec_chips: {
            orchestration: { text: 'o', title: 'ot' },
            worker: { text: 'w', title: 'wt' }
          }
        })
      )
    );

    expect(row).toContain('<div class="worker-mini__line">');
    expect(row).not.toContain('worker-deps');
    expect(row).not.toContain('exec-chip--pin');
    expect(row).toMatchInlineSnapshot(
      `"<div class="worker-mini" data-bead-id="UI-a1" data-lane="queue" draggable="true" style=""> <div class="worker-mini__line"> <span aria-hidden="true" class="worker-mini__grip">⠿</span><span aria-hidden="true" class="worker-mini__seq">2</span><span class="worker-mini__id" title="클릭하면 ID 복사">UI-a1</span><span class="worker-mini__title">대기 행</span><span class="worker-mini__badge" title="">b</span> </div> <div class="worker-mini__exec"> <span class="exec-chip exec-chip--orch" title="ot"><span class="exec-chip__k">오케</span><span class="exec-chip__v">o</span></span><span class="exec-chip exec-chip--worker" title="wt"><span class="exec-chip__k">워커</span><span class="exec-chip__v">w</span></span> </div>  </div>"`
    );
  });

  test('renders the two-line done row when no layout is asked for', () => {
    const row = shape(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-a2',
          title: '완료 행',
          lane: 'done',
          done: true,
          draggable: false,
          done_at: 1_700_000_000_000,
          work_ms: 65_000
        })
      )
    );

    expect(row).toContain('worker-mini__row1');
    expect(row).not.toContain('worker-mini--three-line');
    expect(row).not.toContain('worker-mini__row3');
  });

  test('renders a candidate card with resolved (not pinned) exec chips', () => {
    const card = shape(
      candidateCard(
        /** @type {any} */ ({
          id: 'UI-a3',
          title: '후보 카드',
          lane: 'candidate',
          draggable: true,
          exec_chips: {
            orchestration: { text: 'o', title: 'ot' },
            worker: { text: 'w', title: 'wt' }
          }
        })
      )
    );

    expect(card).toContain('exec-chip--orch');
    expect(card).not.toContain('exec-chip--pin');
    expect(card).not.toContain('worker-deps');
    expect(card).toMatchInlineSnapshot(
      `"<div class="worker-card" data-bead-id="UI-a3" data-lane="candidate" draggable="true"> <div class="worker-card__head"> <span aria-hidden="true" class="worker-card__grip">⠿</span>  <span class="worker-card__id" title="클릭하면 ID 복사">UI-a3</span>   </div> <div class="worker-card__title">후보 카드</div>  <div class="worker-mini__exec"> <span class="exec-chip exec-chip--orch" title="ot"><span class="exec-chip__k">오케</span><span class="exec-chip__v">o</span></span><span class="exec-chip exec-chip--worker" title="wt"><span class="exec-chip__k">워커</span><span class="exec-chip__v">w</span></span> </div> <div class="worker-card__foot worker-card__foot--actions-only">   <button class="worker-card__place" data-bead-id="UI-a3" title="대기 큐 맨 뒤에 추가" type="button"> 대기로 ↴ </button> </div>  </div>"`
    );
  });

  test('renders the same DOM whether the options object is omitted or empty', () => {
    const item = /** @type {any} */ ({
      id: 'UI-a4',
      title: '동일',
      lane: 'candidate',
      draggable: true,
      exec_chips: { orchestration: { text: 'o', title: 'ot' }, worker: null }
    });

    expect(shape(candidateCard(item, null, {}))).toBe(
      shape(candidateCard(item))
    );
  });
});

describe('worker templates with the monitor options (UI-eey2)', () => {
  test('marks exec chips as an issue pin in pinned_only mode', () => {
    const card = shape(
      candidateCard(
        /** @type {any} */ ({
          id: 'UI-b1',
          title: '핀',
          lane: 'candidate',
          draggable: true,
          exec_chips: {
            orchestration: { text: 'codex', title: 'orch' },
            worker: null
          }
        }),
        null,
        { exec_chips_mode: 'pinned_only' }
      )
    );

    expect(card).toContain('exec-chip--pin');
    expect(card).toContain('이슈 핀 — 레포 기본값과 다름');
  });

  test('names the direction of each dependency chip', () => {
    const row = shape(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-b2',
          title: '의존',
          lane: 'queue',
          draggable: true,
          dependency_chips: {
            predecessors: [
              { id: 'UI-p', label: '🔒 선행 UI-p (실행중)', title: 'pred' }
            ],
            successors: [
              {
                id: 'UI-s',
                label: '→ 후속 UI-s (repo · 병렬 #2)',
                title: 'succ'
              }
            ],
            warnings: ['⚠ 선행 UI-z가 어느 레인에도 없음']
          }
        })
      )
    );

    expect(row).toContain('🔒 선행 UI-p (실행중)');
    expect(row).toContain('→ 후속 UI-s (repo · 병렬 #2)');
    expect(row).toContain('⚠ 선행 UI-z가 어느 레인에도 없음');
    // 후속은 역방향 간선이라 해제 ✕가 없다 — 해제는 후속 쪽 카드의 선행 칩이다.
    expect(row.match(/worker-dep__remove/g)).toHaveLength(1);
  });

  test('gives the done row its own title line in three_line layout', () => {
    const row = shape(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-b3',
          title: '완료',
          lane: 'done',
          done: true,
          done_layout: 'three_line',
          workspace_name: 'repo-a',
          root_dir: '/tmp/repo-a',
          done_at: 1_700_000_000_000,
          work_ms: 65_000,
          usage: { input_tokens: 5 }
        })
      )
    );

    expect(row).toContain('worker-mini--three-line');
    expect(row).toContain('worker-mini__row3');
    expect(row).toContain('repo-a');
    expect(row).toMatch(/worker-mini__row2[^]*worker-mini__title/);
  });

  test('draws no dependency block when the chips are all empty', () => {
    const row = shape(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-b4',
          title: '없음',
          lane: 'queue',
          draggable: true,
          dependency_chips: {
            predecessors: [],
            successors: [],
            warnings: []
          }
        })
      )
    );

    expect(row).not.toContain('worker-deps');
  });
});

describe('routeChipTemplate (UI-yrzu §7.1)', () => {
  /**
   * @param {any} workflow
   * @returns {HTMLElement|null}
   */
  function renderChip(workflow) {
    render(routeChipTemplate(workflow), mount);
    return /** @type {HTMLElement|null} */ (
      mount.querySelector('.ctl-chip--route')
    );
  }

  test('draws nothing without a workflow', () => {
    expect(renderChip(null)).toBeNull();
  });

  test('draws nothing when the workflow carries no route', () => {
    expect(renderChip({ chips: {} })).toBeNull();
  });

  test('names a pinned route with the plain route tooltip', () => {
    const chip = renderChip({
      chips: { route: 'spec_backed', route_source: 'explicit' }
    });

    expect(chip?.textContent).toBe('spec_backed');
    expect(chip?.getAttribute('title')).toBe('route');
    expect(chip?.classList.contains('is-derived')).toBe(false);
  });

  test('says unset on a derived route', () => {
    const chip = renderChip({
      chips: { route: 'quick_fix', route_source: 'derived' }
    });

    expect(chip?.textContent).toBe('unset');
    expect(chip?.getAttribute('title')).toBe('route 미핀 (metadata unset)');
    expect(chip?.classList.contains('is-derived')).toBe(true);
  });

  test('reads the route off the workflow when no chips are projected', () => {
    const chip = renderChip({ route: 'full_plan', route_source: 'derived' });

    expect(chip?.textContent).toBe('unset');
    expect(chip?.classList.contains('is-derived')).toBe(true);
  });
});

describe('waiting row route chip (UI-yrzu §7.2)', () => {
  const WORKFLOW = {
    route: 'spec_backed',
    chips: { route: 'spec_backed', route_source: 'explicit' }
  };

  test('draws the chip between the id and the title of a waiting row', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      workflow: /** @type {any} */ (WORKFLOW)
    });
    const line = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__line')
    );
    const order = Array.from(line.children).map((child) => child.className);

    expect(row.querySelector('.ctl-chip--route')?.textContent).toBe(
      'spec_backed'
    );
    expect(order.indexOf('ctl-chip ctl-chip--route')).toBe(
      order.indexOf('worker-mini__id') + 1
    );
    expect(order.indexOf('ctl-chip ctl-chip--route')).toBeLessThan(
      order.indexOf('worker-mini__title')
    );
  });

  test('draws the chip on a PR 대기 card variant', () => {
    const row = renderRow({
      lane: 'pr_wait',
      done: true,
      draggable: false,
      workflow: /** @type {any} */ (WORKFLOW)
    });

    expect(
      row.querySelector('.worker-mini__head .ctl-chip--route')?.textContent
    ).toBe('spec_backed');
  });

  test('draws the chip on a REVISE 파킹 card variant', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      revise_action: true,
      workflow: /** @type {any} */ (WORKFLOW)
    });

    expect(
      row.querySelector('.worker-mini__head .ctl-chip--route')?.textContent
    ).toBe('spec_backed');
  });

  test('draws no chip on a waiting row without a workflow', () => {
    const row = renderRow({ lane: 'queue', done: false, draggable: true });

    expect(row.querySelector('.ctl-chip--route')).toBeNull();
  });

  test('draws no chip on a two-line done row', () => {
    const row = renderRow({ workflow: /** @type {any} */ (WORKFLOW) });

    expect(row.querySelector('.ctl-chip--route')).toBeNull();
  });

  test('draws no chip on a three-line done row', () => {
    const row = renderRow({
      done_layout: 'three_line',
      workflow: /** @type {any} */ (WORKFLOW)
    });

    expect(row.querySelector('.ctl-chip--route')).toBeNull();
  });
});

describe('겹침 칩 (UI-qm12 §5.3)', () => {
  /**
   * @param {number} count
   * @returns {import('./lanes.js').OverlapChip[]}
   */
  function overlaps(count) {
    return Array.from({ length: count }, (_, index) => ({
      id: `UI-o${index + 1}`,
      title: `상대 ${index + 1}`,
      location_label: '#1',
      prefixes: ['server/worker']
    }));
  }

  /**
   * @param {Partial<import('./lanes.js').DependencyChips>} chips
   * @param {string} [lane]
   * @returns {HTMLElement}
   */
  function renderDeps(chips, lane = 'queue') {
    render(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-me',
          title: '겹침',
          lane,
          draggable: false,
          dependency_chips: chips
        })
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.worker-deps'));
  }

  test('orders the chips 선행 → 겹침 → 후속', () => {
    const deps = renderDeps({
      predecessors: [{ id: 'UI-p', label: '🔒 선행 UI-p (실행중)' }],
      overlaps: overlaps(1),
      successors: [{ id: 'UI-s', label: '→ 후속 UI-s (#2)' }]
    });

    expect(
      Array.from(deps.children).map((chip) => chip.className.split(' ')[1])
    ).toEqual(['worker-dep--pred', 'worker-dep--overlap', 'worker-dep--succ']);
  });

  test('names the counterpart and its location on the overlap chip', () => {
    const deps = renderDeps({ overlaps: overlaps(1) });

    expect(
      deps.querySelector('.worker-dep--overlap')?.textContent?.trim()
    ).toBe('⧉ 겹침 UI-o1 (#1)');
  });

  test('lists the overlapping paths in the chip tooltip', () => {
    const deps = renderDeps({
      overlaps: [
        {
          id: 'UI-o1',
          title: '상대',
          location_label: '#1',
          prefixes: ['app/views', 'server/worker']
        }
      ]
    });

    expect(
      deps.querySelector('.worker-dep--overlap')?.getAttribute('title')
    ).toBe('app/views\nserver/worker');
  });

  test('folds a fourth counterpart into a +n chip', () => {
    const deps = renderDeps({ overlaps: overlaps(5) });

    expect(deps.querySelectorAll('.mon-overlap__chip')).toHaveLength(4);
    expect(
      deps.querySelector('.mon-overlap__chip--more')?.textContent?.trim()
    ).toBe('+2');
  });

  test('draws a muted chip when the spec declares no scope', () => {
    const deps = renderDeps({ scope_missing: true });

    expect(
      deps.querySelector('.worker-dep--muted')?.getAttribute('title')
    ).toBe('겹침 판정 불가 — 스펙에 scope 선언 필요');
  });

  test('never draws the muted chip on a running row', () => {
    const deps = renderDeps(
      { overlaps: overlaps(1), scope_missing: true },
      'running'
    );

    expect(deps.querySelector('.worker-dep--muted')).toBeNull();
  });

  test('draws the popover rows the projection hands it', () => {
    const deps = renderDeps({
      overlaps: overlaps(1),
      popover: {
        rows: [
          {
            id: 'UI-o1',
            title: '상대 1',
            location_label: '#1',
            prefixes: ['server/worker'],
            action: {
              kind: 'place',
              label: '같은 직렬 레인으로',
              title: 's1 끝에 넣습니다'
            }
          }
        ]
      }
    });

    const popover = deps.querySelector('.mon-overlap__popover');
    expect(popover?.getAttribute('role')).toBe('dialog');
    expect(
      popover?.querySelector('.mon-overlap__place')?.textContent?.trim()
    ).toBe('같은 직렬 레인으로');
  });

  test('draws a sentence instead of a button when no order can be made', () => {
    const deps = renderDeps({
      overlaps: overlaps(1),
      popover: {
        rows: [
          {
            id: 'UI-o1',
            title: '상대 1',
            location_label: '실행중',
            prefixes: ['server/worker'],
            action: {
              kind: 'note',
              text: '둘 다 실행 중 — 순서를 만들 수 없습니다'
            }
          }
        ]
      }
    });

    expect(deps.querySelector('.mon-overlap__place')).toBeNull();
    expect(deps.querySelector('.mon-overlap__note')?.textContent?.trim()).toBe(
      '둘 다 실행 중 — 순서를 만들 수 없습니다'
    );
  });
});
