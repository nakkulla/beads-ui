import { html, render } from 'lit-html';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  JUDGEMENT_CHIP_KEYS,
  candidateCard,
  discardAbandonCompletionMessage,
  discardAbandonConfirmationMessage,
  discardCompletionMessage,
  discardConfirmationMessage,
  discardFailureGuidance,
  discardPhaseLabel,
  discardProjection,
  discardReceiptTemplate,
  execChipsTemplate,
  formatClock,
  formatElapsed,
  judgementPopoverContent,
  judgementPopoverOf,
  miniRow,
  nowPanel,
  paneTemplate,
  queueRowOps,
  quickFixReviewChipTemplate,
  repoOpsStripModel,
  reviewSessionRowState,
  routeChipTemplate,
  staleWorkProjection,
  sumAttemptWorkMs,
  waitBody
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
 * @param {import('./lanes.js').PlaceMenu|null} [place_menu]
 * @returns {HTMLElement}
 */
function renderCandidate(item, place_menu = null) {
  render(
    candidateCard(
      /** @type {any} */ ({
        id: 'UI-qf',
        title: 'quick fix',
        draggable: true,
        queue_placeable: true,
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

  test('omits the from chip on a done row', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      draggable: false,
      from_id: 'UI-origin'
    });

    expect(row.querySelector('.ctl-chip--from')).toBeNull();
    expect(row.querySelector('.worker-mini__title')).not.toBeNull();
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

describe('priority badge', () => {
  test('renders the priority badge on a waiting row', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      priority: 1
    });
    const badge = row.querySelector('.worker-pri');

    expect(badge?.textContent?.trim()).toBe('P1');
    expect(badge?.getAttribute('title')).toBe('우선순위 P1');
  });

  test('renders the priority badge on a done row', () => {
    const row = renderRow({ lane: 'done', done: true, priority: 3 });

    expect(row.querySelector('.worker-pri')?.textContent?.trim()).toBe('P3');
  });

  test('renders the priority badge on a candidate card', () => {
    const card = renderCandidate({ priority: 0 });

    expect(card.querySelector('.worker-pri')?.textContent?.trim()).toBe('P0');
  });

  test('clamps an out-of-range priority into P0..P4', () => {
    const row = renderRow({ lane: 'queue', done: false, priority: 9 });

    expect(row.querySelector('.worker-pri')?.textContent?.trim()).toBe('P4');
  });

  test('omits the badge when priority is absent', () => {
    const row = renderRow({ lane: 'queue', done: false });

    expect(row.querySelector('.worker-pri')).toBeNull();
  });

  test('omits the badge when priority is not a number', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      priority: /** @type {any} */ ('2')
    });

    expect(row.querySelector('.worker-pri')).toBeNull();
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
      queue_placeable: false,
      // 판정은 구조화 필드가 나른다 — `reason`은 표시 문자열일 뿐이다 (§4).
      missing_description: true,
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

  test('ignores the display reason string when judging placement', () => {
    const card = renderCandidate({
      draggable: false,
      queue_placeable: false,
      route_ok: true,
      awaiting_user: false,
      missing_description: false,
      placement_spec: 'draft',
      // 어댑터 문구를 그대로 들고 있어도 판정은 구조화 필드만 읽는다 (§4).
      reason: 'missing_description'
    });
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(place.title).toBe('spec이 발행되지 않아 대기 큐에 넣을 수 없습니다');
    expect(
      card.querySelector('.worker-card__readiness')?.textContent?.trim()
    ).toBe('스펙 미발행');
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

  test('groups the lane choices under their group headers', () => {
    const card = renderCandidate(
      { reason: '🔒 UI-blocker' },
      {
        bead_id: 'UI-qf',
        lanes: [
          { id: 'parallel', label: '병렬', count: 3 },
          {
            id: 'lane:cl_1',
            label: '연결 1 (확정) 끝에',
            count: 3,
            group: '연결 레인'
          },
          { id: 'new-lane', label: '+ 새 연결 레인', group: '연결 레인' },
          { id: 'serial:s1', label: '직렬 1', count: 2, group: 'beads-ui 직렬' }
        ]
      }
    );

    expect(
      Array.from(card.querySelectorAll('.worker-card__place-group')).map(
        (group) => group.textContent?.trim()
      )
    ).toEqual(['연결 레인', 'beads-ui 직렬']);
  });

  test('renders no group header for a menu without the 연결 레인 group', () => {
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

    expect(card.querySelectorAll('.worker-card__place-group')).toHaveLength(0);
    expect(card.querySelectorAll('.worker-card__place-lane')).toHaveLength(2);
  });

  test('omits the count of an entry that has nothing to count', () => {
    const card = renderCandidate(
      { reason: '🔒 UI-blocker' },
      {
        bead_id: 'UI-qf',
        lanes: [{ id: 'new-lane', label: '+ 새 연결 레인', group: '연결 레인' }]
      }
    );

    expect(card.querySelector('.worker-card__place-count')).toBeNull();
  });

  test('disables a lane entry the store cannot serve', () => {
    const card = renderCandidate(
      { reason: '🔒 UI-blocker' },
      {
        bead_id: 'UI-qf',
        lanes: [
          {
            id: 'lane:cl_1',
            label: '연결 1 (확정) 끝에',
            count: 1,
            group: '연결 레인',
            disabled: true
          }
        ]
      }
    );

    expect(
      /** @type {HTMLButtonElement} */ (
        card.querySelector('.worker-card__place-lane')
      ).disabled
    ).toBe(true);
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
      { draggable: false, queue_placeable: false, reason: 'spec 없음' },
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

  // 출처 칩은 좌표다 (UI-251y §5.1 슬롯 5): 정체성 줄이 아니라 좌표 칩 줄에
  // 서고, 그 줄 안에서는 route 칩 바로 다음이다.
  test('places the from chip after the route chip in the coordinate row', () => {
    const card = renderCandidate({ from_id: 'UI-0' });
    const chips = /** @type {HTMLElement} */ (
      card.querySelector('.worker-chips')
    );

    const kids = Array.from(chips.children).map((el) => el.className);

    expect(card.querySelector('.worker-card__head .ctl-chip--from')).toBeNull();
    expect(kids.findIndex((c) => c.includes('ctl-chip--from'))).toBe(
      kids.findIndex((c) => c.includes('ctl-chip--route')) + 1
    );
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
    ).toBe('worker-ineligible');
  });

  test('draws the chip with the Board label chip class', () => {
    const card = renderCandidate({ draggable: false, worker_ineligible: true });

    const chip = card.querySelector('.worker-card__ineligible');

    expect(chip?.classList.contains('ctl-chip--label')).toBe(true);
  });

  test('places the chip at the end of the left group, after the id', () => {
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

    expect(id_index).toBeGreaterThanOrEqual(0);
    expect(chip_index).toBeGreaterThan(id_index);
    expect(head.querySelector('.ctl-chip--route')).toBeNull();
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

describe('session-preferred candidate card (UI-49mc)', () => {
  const EXTERNAL_ROUNDTRIP_TITLE =
    '하네스 밖 상대와 예측 불가 왕복 반복 — 다른 rig 세션·사람·외부 시스템';

  test('draws the 세션 권장 chip with the contract tooltip', () => {
    const card = renderCandidate({
      session_preferred: true,
      session_preferred_reason: 'external_roundtrip'
    });

    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__session-preferred')
    );

    expect(chip.textContent?.trim()).toBe('세션 권장');
    expect(chip.title).toBe(EXTERNAL_ROUNDTRIP_TITLE);
  });

  test('draws the contract tooltip for each added enum reason', () => {
    const reasons = [
      [
        'user_feedback_loop',
        '진행 중 사용자 피드백 없이는 품질이 낮음 — 문안·설계 세부·방향 선택'
      ]
    ];

    const titles = reasons.map(([reason]) => {
      const card = renderCandidate({
        session_preferred: true,
        session_preferred_reason: reason
      });
      return /** @type {HTMLElement} */ (
        card.querySelector('.worker-card__session-preferred')
      ).title;
    });

    expect(titles).toEqual(reasons.map(([, title]) => title));
  });

  test('omits the chip for a candidate without a valid attachment', () => {
    const card = renderCandidate({ session_preferred: false });

    expect(card.querySelector('.worker-card__session-preferred')).toBeNull();
  });

  test('yields the head slot to worker-ineligible when both are attached', () => {
    const card = renderCandidate({
      draggable: false,
      worker_ineligible: true,
      session_preferred: true,
      session_preferred_reason: 'external_roundtrip'
    });

    expect(card.querySelector('.worker-card__ineligible')).not.toBeNull();
    expect(card.querySelector('.worker-card__session-preferred')).toBeNull();
  });

  test('keeps the card draggable and unshaded', () => {
    const card = renderCandidate({
      session_preferred: true,
      session_preferred_reason: 'external_roundtrip'
    });

    expect(card.getAttribute('draggable')).toBe('true');
    expect(card.classList.contains('worker-card--ineligible')).toBe(false);
  });

  test('renders the lane menu for its own place_menu', () => {
    const card = renderCandidate(
      {
        session_preferred: true,
        session_preferred_reason: 'external_roundtrip'
      },
      {
        bead_id: 'UI-qf',
        lanes: [{ id: 'parallel', label: '병렬', count: 3 }]
      }
    );

    expect(card.querySelector('.worker-card__place-menu')).not.toBeNull();
    expect(card.querySelector('.worker-card__place-lane')).not.toBeNull();
  });

  test('leaves the queue button enabled with the unchanged tooltip', () => {
    const card = renderCandidate({
      session_preferred: true,
      session_preferred_reason: 'external_roundtrip'
    });
    const place = /** @type {HTMLButtonElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(place.disabled).toBe(false);
    expect(place.title).toBe('대기 큐 맨 뒤에 추가');
  });
});

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
  ])('attaches %s guidance to retry title and receipt', (error, guidance) => {
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

    render(discardReceiptTemplate({ discard }), mount);

    expect(discard.title).toBe(`폐기 실패: ${error} — ${guidance}`);
    expect(mount.textContent).toContain(`폐기 실패: ${error} — ${guidance}`);
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

  test('orders failed abandon exits and preserves the normal action order', () => {
    const failed = discardProjection(
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
    const failed_row = renderRow({
      lane: 'queue',
      done: false,
      discard: failed,
      resolve_action: true
    });
    const failed_labels = Array.from(
      failed_row.querySelectorAll('.worker-mini__foot button')
    ).map((button) => button.textContent?.trim());
    const abandon_button = /** @type {HTMLButtonElement} */ (
      failed_row.querySelector('.worker-mini__discard-abandon')
    );
    const abandon_bead_id = abandon_button.dataset.beadId;
    const abandon_operation_id = abandon_button.dataset.operationId;
    const abandon_title = abandon_button.title;
    const normal = discardProjection({}, 'UI-x1');
    const normal_row = renderRow({
      lane: 'pr_wait',
      done: false,
      discard: normal,
      resolve_action: true
    });
    const normal_labels = Array.from(
      normal_row.querySelectorAll('.worker-mini__foot button')
    ).map((button) => button.textContent?.trim());

    expect(failed_labels).toEqual(['재시도', '폐기 포기', '세션에서 해결']);
    expect(abandon_bead_id).toBe('UI-x1');
    expect(abandon_operation_id).toBe('op1');
    expect(abandon_title).toBe(
      '실패한 폐기 작업을 포기합니다 — 백업·폐기는 수행되지 않았고 bead는 폐기 이전 상태로 돌아갑니다'
    );
    expect(normal_labels).toEqual(['세션에서 해결', '폐기']);
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

  test('ignores a post-merge job when naming the current deployment', () => {
    const model = repoOpsStripModel(
      [
        card({
          kind: 'job',
          script_path: 'repo-ops/post-merge.d/010-reindex'
        })
      ],
      []
    );

    expect(model?.deploy).toBeNull();
  });

  test('counts a failed post-merge job into 해결 필요', () => {
    const model = repoOpsStripModel(
      [
        card({
          kind: 'job',
          state: 'failed',
          script_path: 'repo-ops/post-merge.d/010-reindex'
        })
      ],
      []
    );

    expect(model?.badge).toEqual({ tone: 'act', label: '해결 필요 1' });
  });

  test('opens the strip for a cleanup stopped at post_merge_jobs', () => {
    expect(
      repoOpsStripModel([], [{ bead_id: 'UI-a', step: 'post_merge_jobs' }])
    ).not.toBeNull();
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

describe('reviewSessionRowState', () => {
  test('reports the running attempt’s origin (UI-qksl §7)', () => {
    const attempts = {
      r1: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'running',
        origin: 'auto'
      }
    };

    const state = reviewSessionRowState(attempts, 'UI-x1');

    expect(state).toEqual({ active: true, failure: null, origin: 'auto' });
  });

  test('reports the last failed attempt’s origin when none is running', () => {
    const attempts = {
      r1: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'failed',
        origin: 'auto',
        cause: 'launch_failed:bead_running',
        finished_at: 5
      },
      r2: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'failed',
        origin: 'click',
        cause: 'receipt_not_current',
        finished_at: 9
      }
    };

    const state = reviewSessionRowState(attempts, 'UI-x1');

    expect(state).toEqual({
      active: false,
      failure: 'receipt_not_current',
      origin: 'click'
    });
  });

  test('prefers the running attempt over an earlier failure', () => {
    const attempts = {
      r1: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'failed',
        origin: 'click',
        cause: 'receipt_not_current',
        finished_at: 9
      },
      r2: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'pending',
        origin: 'auto'
      }
    };

    const state = reviewSessionRowState(attempts, 'UI-x1');

    expect(state).toEqual({ active: true, failure: null, origin: 'auto' });
  });

  test('reads an origin outside the enum as none', () => {
    const attempts = {
      r1: {
        bead_id: 'UI-x1',
        kind: 'review_session',
        status: 'running',
        origin: 'queue'
      }
    };

    const state = reviewSessionRowState(attempts, 'UI-x1');

    expect(state).toEqual({ active: true, failure: null, origin: null });
  });

  test('returns no origin for a missing or malformed attempts map', () => {
    expect(reviewSessionRowState(null, 'UI-x1')).toEqual({
      active: false,
      failure: null,
      origin: null
    });
    expect(reviewSessionRowState({ r1: null }, 'UI-x1')).toEqual({
      active: false,
      failure: null,
      origin: null
    });
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
    expect(markers.indexOf('worker-chips')).toBe(
      markers.indexOf('worker-mini__line') + 1
    );
    expect(row.querySelectorAll('.worker-chips .exec-chip')).toHaveLength(2);
  });

  test('omits the chip line on a waiting row with no slot 5 material', () => {
    const row = renderRow({ lane: 'queue', done: false });

    expect(row.querySelector('.worker-chips')).toBeNull();
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
    expect(markers.indexOf('worker-chips')).toBe(
      markers.indexOf('worker-mini__body') + 1
    );
    expect(markers.indexOf('worker-chips')).toBeLessThan(
      markers.indexOf('worker-mini__foot')
    );
  });

  test('puts the candidate card exec chips before the foot', () => {
    const card = renderCandidate({ exec_chips: /** @type {any} */ (CHIPS) });

    const markers = childMarkers(card);
    expect(markers.indexOf('worker-chips')).toBeGreaterThan(
      markers.indexOf('worker-card__title')
    );
    expect(markers.indexOf('worker-chips')).toBeLessThan(
      markers.findIndex((marker) => marker.startsWith('worker-card__foot'))
    );
  });

  test('renders the exec chips on a two-line done row', () => {
    const row = renderRow({ exec_chips: /** @type {any} */ (CHIPS) });

    expect(row.querySelectorAll('.worker-mini__row2 .exec-chip')).toHaveLength(
      2
    );
  });

  test('renders the exec chips on a three-line done row', () => {
    const row = renderRow({
      done_layout: 'three_line',
      exec_chips: /** @type {any} */ (CHIPS)
    });

    expect(row.querySelectorAll('.worker-mini__row3 .exec-chip')).toHaveLength(
      2
    );
  });

  test('renders no exec chips on a done row with no attempt record', () => {
    const row = renderRow({ done_layout: 'three_line' });

    expect(row.querySelector('.exec-chip')).toBeNull();
  });

  test('renders no exec chips on a PR-wait row', () => {
    const row = renderRow({
      lane: 'pr_wait',
      done: false,
      exec_chips: /** @type {any} */ (CHIPS)
    });

    expect(row.querySelector('.exec-chip')).toBeNull();
  });
});

/**
 * 카드 배치 문법 (UI-251y §2): 세 렌더러가 공유하는 줄 순서다. 정체성 줄은
 * 조작 버튼만 상대하고, 좌표·실행 사실 칩과 usage는 `.worker-deps` 다음의
 * 슬롯 5 줄 하나에 모인다.
 */
describe('카드 배치 문법 (UI-251y §2)', () => {
  const COORD = {
    workspace_name: 'repo-a',
    root_dir: '/tmp/repo-a',
    from_id: 'UI-0',
    workflow: /** @type {any} */ ({
      route: 'spec_backed',
      chips: { route: 'spec_backed', route_source: 'explicit' }
    }),
    exec_chips: {
      orchestration: { text: 'o', title: 'ot' },
      worker: { text: 'w', title: 'wt' }
    },
    usage: USAGE
  };

  /**
   * @param {Element} el
   * @returns {string[]} Direct-child class markers, in document order.
   */
  function markersOf(el) {
    return Array.from(el.children, (child) => child.className);
  }

  test('keeps every coordinate chip out of the one-line identity row', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      ...COORD
    });
    const line = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__line')
    );

    expect(line.querySelector('.worker-mini__repo')).toBeNull();
    expect(line.querySelector('.ctl-chip--route')).toBeNull();
    expect(line.querySelector('.ctl-chip--from')).toBeNull();
    expect(line.querySelector('.worker-usage')).toBeNull();
  });

  test('keeps every coordinate chip out of the card-variant identity row', () => {
    const row = renderRow({
      lane: 'pr_wait',
      done: false,
      draggable: false,
      ...COORD
    });
    const head = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__head')
    );

    expect(head.querySelector('.worker-mini__repo')).toBeNull();
    expect(head.querySelector('.ctl-chip--route')).toBeNull();
    expect(head.querySelector('.ctl-chip--from')).toBeNull();
    expect(head.querySelector('.worker-usage')).toBeNull();
  });

  test('orders the one-line coordinate row repo, route, from, exec then usage', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      ...COORD
    });
    const chips = /** @type {HTMLElement} */ (
      row.querySelector('.worker-chips')
    );

    expect(markersOf(chips)).toEqual([
      'worker-mini__repo',
      'ctl-chip ctl-chip--route',
      'ctl-chip ctl-chip--from',
      'exec-chip exec-chip--orch',
      'exec-chip exec-chip--worker',
      'worker-usage'
    ]);
  });

  test('moves the card-variant usage out of the foot into the coordinate row', () => {
    const row = renderRow({
      lane: 'pr_wait',
      done: false,
      draggable: false,
      merge_action: true,
      ...COORD
    });

    expect(row.querySelector('.worker-chips .worker-usage')).not.toBeNull();
    expect(row.querySelector('.worker-mini__foot .worker-usage')).toBeNull();
    expect(
      row.querySelector('.worker-mini__foot .worker-mini__merge')
    ).not.toBeNull();
  });

  test('draws no foot on a card row whose only foot material was usage', () => {
    const row = renderRow({
      lane: 'pr_wait',
      done: false,
      draggable: false,
      usage: USAGE
    });

    expect(row.querySelector('.worker-mini__foot')).toBeNull();
    expect(row.querySelector('.worker-chips .worker-usage')).not.toBeNull();
  });

  test('draws the dependency chips before the coordinate row', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      dependency_chips: {
        predecessors: [{ id: 'UI-b', label: '⛓ UI-b' }]
      },
      ...COORD
    });

    const markers = markersOf(row);

    expect(
      markers.indexOf('worker-deps worker-deps--primary')
    ).toBeGreaterThanOrEqual(0);
    expect(markers.indexOf('worker-deps worker-deps--primary')).toBeLessThan(
      markers.indexOf('worker-chips')
    );
  });

  test('keeps every coordinate chip out of the candidate card head', () => {
    const card = renderCandidate({
      workspace_name: 'repo-a',
      root_dir: '/tmp/repo-a',
      from_id: 'UI-0'
    });
    const head = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__head')
    );

    expect(head.querySelector('.worker-card__repo')).toBeNull();
    expect(head.querySelector('.ctl-chip--route')).toBeNull();
    expect(head.querySelector('.ctl-chip--from')).toBeNull();
  });

  test('orders the candidate coordinate row repo, route, from then exec', () => {
    const card = renderCandidate({
      workspace_name: 'repo-a',
      root_dir: '/tmp/repo-a',
      from_id: 'UI-0',
      exec_chips: /** @type {any} */ ({
        orchestration: { text: 'o', title: 'ot' },
        worker: { text: 'w', title: 'wt' }
      })
    });
    const chips = /** @type {HTMLElement} */ (
      card.querySelector('.worker-chips')
    );

    expect(markersOf(chips)).toEqual([
      'worker-card__repo',
      'ctl-chip ctl-chip--route',
      'ctl-chip ctl-chip--from',
      'exec-chip exec-chip--orch',
      'exec-chip exec-chip--worker'
    ]);
  });

  test('draws no coordinate row on a candidate card without slot 5 material', () => {
    const card = renderCandidate({ workflow: /** @type {any} */ (null) });

    expect(card.querySelector('.worker-chips')).toBeNull();
  });

  test('draws the dependency chips before the candidate coordinate row', () => {
    const card = renderCandidate({
      dependency_chips: /** @type {any} */ ({
        predecessors: [{ id: 'UI-b', label: '⛓ UI-b' }]
      })
    });

    const markers = markersOf(card);

    expect(markers.indexOf('worker-deps worker-deps--primary')).toBeLessThan(
      markers.indexOf('worker-chips')
    );
  });

  test('leaves the two-line done row carrying its repo and usage as before', () => {
    const row = renderRow({ ...COORD, lane: 'done', done: true });

    expect(
      row.querySelector('.worker-mini__row1 .worker-mini__repo')
    ).not.toBeNull();
    expect(
      row.querySelector('.worker-mini__row2 .worker-usage')
    ).not.toBeNull();
    expect(row.querySelector('.worker-chips')).toBeNull();
  });

  test('draws the PR link on the two-line done row', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      pr_number: 213,
      pr_url: 'https://github.com/o/r/pull/213'
    });

    const link = /** @type {HTMLAnchorElement} */ (
      row.querySelector('.worker-mini__row1 .worker-mini__pr')
    );
    expect(link.getAttribute('href')).toBe('https://github.com/o/r/pull/213');
    expect(link.textContent).toContain('#213');
  });

  test('draws the PR link on the three-line done row', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      done_layout: 'three_line',
      pr_number: 213,
      pr_url: 'https://github.com/o/r/pull/213'
    });

    const link = /** @type {HTMLAnchorElement} */ (
      row.querySelector('.worker-mini__row1 .worker-mini__pr')
    );
    expect(link.getAttribute('href')).toBe('https://github.com/o/r/pull/213');
    expect(link.textContent).toContain('#213');
  });

  test('omits the done row PR link when only the number is known', () => {
    const row = renderRow({ lane: 'done', done: true, pr_number: 213 });

    expect(row.querySelector('.worker-mini__pr')).toBeNull();
  });

  test('leaves the three-line done row carrying its repo and usage as before', () => {
    const row = renderRow({
      ...COORD,
      lane: 'done',
      done: true,
      done_layout: 'three_line'
    });

    expect(
      row.querySelector('.worker-mini__row1 .worker-mini__repo')
    ).not.toBeNull();
    expect(
      row.querySelector('.worker-mini__row3 .worker-usage')
    ).not.toBeNull();
    expect(row.querySelector('.worker-chips')).toBeNull();
  });
});

describe('worker lanes 이월 칩 (UI-btj6 §3)', () => {
  test('renders one chip per carryover successor on the two-line done row', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      carried_to: ['UI-s2', 'UI-s1']
    });

    const chips = row.querySelectorAll('.worker-deps--secondary .worker-dep');

    expect(Array.from(chips, (chip) => chip.textContent?.trim())).toEqual([
      '이월 → UI-s1',
      '이월 → UI-s2'
    ]);
  });

  test('renders the chip on the three-line done row too', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      done_layout: 'three_line',
      carried_to: ['UI-s1']
    });

    const chip = row.querySelector('.worker-deps--secondary .worker-dep');

    expect(chip?.textContent?.trim()).toBe('이월 → UI-s1');
  });

  test('makes the chip an opening one carrying the successor id', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      carried_to: ['UI-s1']
    });

    const chip = /** @type {HTMLElement} */ (
      row.querySelector('.worker-deps--secondary .worker-dep__open')
    );

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.dataset.depId).toBe('UI-s1');
  });

  test('carries the done row own root_dir onto the chip', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      root_dir: '/repos/other',
      carried_to: ['UI-s1']
    });

    const chip = /** @type {HTMLElement} */ (
      row.querySelector('.worker-deps--secondary .worker-dep__open')
    );

    expect(chip.dataset.rootDir).toBe('/repos/other');
  });

  test('omits the line when the done row carries no successor', () => {
    const row = renderRow({ lane: 'done', done: true });

    expect(row.querySelector('.worker-deps--secondary')).toBeNull();
  });

  test('omits the line when the successor list is empty', () => {
    const row = renderRow({ lane: 'done', done: true, carried_to: [] });

    expect(row.querySelector('.worker-deps')).toBeNull();
  });

  test('draws the chips below the title and above the coordinate line', () => {
    const row = renderRow({
      lane: 'done',
      done: true,
      carried_to: ['UI-s1']
    });

    const classes = Array.from(row.children, (el) => el.className);

    expect(classes).toEqual([
      'worker-mini__row1',
      'worker-deps worker-deps--secondary',
      'worker-mini__row2'
    ]);
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
      `"<div class="worker-mini" data-bead-id="UI-a1" data-lane="queue" draggable="true" style=""> <div class="worker-mini__line"> <span aria-hidden="true" class="worker-mini__grip">⠿</span><span aria-hidden="true" class="worker-mini__seq">2</span><span class="worker-mini__id" title="클릭하면 ID 복사">UI-a1</span><span class="worker-mini__title">대기 행</span><span class="worker-mini__badge" title="">b</span> </div> <div class="worker-chips"> <span class="exec-chip exec-chip--orch" title="ot"><span class="exec-chip__k">오케</span><span class="exec-chip__v">o</span></span><span class="exec-chip exec-chip--worker" title="wt"><span class="exec-chip__k">워커</span><span class="exec-chip__v">w</span></span> </div>  </div>"`
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
          queue_placeable: true,
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
      `"<div class="worker-card" data-bead-id="UI-a3" data-lane="candidate" draggable="true"> <div class="worker-card__head"> <span aria-hidden="true" class="worker-card__grip">⠿</span> <span class="worker-card__id" title="클릭하면 ID 복사">UI-a3</span>   </div> <div class="worker-card__title">후보 카드</div>  <div class="worker-chips"> <span class="exec-chip exec-chip--orch" title="ot"><span class="exec-chip__k">오케</span><span class="exec-chip__v">o</span></span><span class="exec-chip exec-chip--worker" title="wt"><span class="exec-chip__k">워커</span><span class="exec-chip__v">w</span></span> </div> <div class="worker-card__foot worker-card__foot--actions-only">   <button class="op-btn op-btn--primary worker-card__place" data-bead-id="UI-a3" title="대기 큐 맨 뒤에 추가" type="button"> ↴ 대기로 </button> </div>  </div>"`
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
  /**
   * @param {Record<string, any>} [options]
   */
  function depCard(options = {}) {
    return shape(
      candidateCard(
        /** @type {any} */ ({
          id: 'UI-b0',
          title: '의존',
          lane: 'candidate',
          draggable: true
        }),
        null,
        options
      )
    );
  }

  test('draws no dependency button and no head action slot (UI-lx45 §5)', () => {
    const card = depCard();

    expect(card).not.toContain('worker-card__dep');
    expect(card).not.toContain('worker-card__head-actions');
  });

  test('folds the foot of a card that carries no reason', () => {
    const card = depCard();

    expect(card).toContain('worker-card__foot--actions-only');
  });

  test('unfolds the foot of a card that carries a reason', () => {
    const card = shape(
      candidateCard(
        /** @type {any} */ ({
          id: 'UI-b0r',
          title: '사유',
          lane: 'candidate',
          draggable: true,
          reason: 'spec 없음'
        }),
        null,
        {}
      )
    );

    expect(card).not.toContain('worker-card__foot--actions-only');
  });

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

  test('draws the blocked chip', () => {
    const row = shape(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-b2',
          title: '의존',
          lane: 'queue',
          draggable: true,
          dependency_chips: {
            predecessors: [
              { id: 'UI-p', label: '⛓ blocked: UI-p', title: 'pred' }
            ]
          }
        })
      )
    );

    expect(row).toContain('⛓ blocked: UI-p');
    // 칩에는 해제 ✕가 없다 — 끊는 일은 의존성 패널이 확인을 받고 처리한다.
    expect(row).not.toContain('worker-dep__remove');
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
            predecessors: []
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

describe('quick_fix self-review 칩 (UI-r7or §5.1)', () => {
  const STAGES = {
    impl: { fill: 'none', glyph: null, stale: false },
    close: { fill: 'none', glyph: null, stale: false }
  };

  /**
   * @param {any} quick_fix_review
   * @returns {HTMLElement}
   */
  function renderReviewCard(quick_fix_review) {
    return renderCandidate({
      workflow: /** @type {any} */ ({
        route: 'quick_fix',
        route_source: 'explicit',
        stages: STAGES,
        ...(quick_fix_review === undefined ? {} : { quick_fix_review })
      })
    });
  }

  test('draws the reviewed chip when the receipt matches the body', () => {
    const card = renderReviewCard({
      state: 'reviewed',
      missing: [],
      digest: '3f9a21c4b0e7'
    });
    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__qfr')
    );

    expect(chip.textContent?.trim()).toBe('리뷰 ✓');
    expect(chip.classList.contains('worker-card__qfr--reviewed')).toBe(true);
  });

  test('draws the stale chip when the body moved past the receipt', () => {
    const card = renderReviewCard({
      state: 'stale',
      missing: [],
      digest: '8c1d40ffab52'
    });
    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__qfr')
    );

    expect(chip.textContent?.trim()).toBe('리뷰 stale');
    expect(chip.classList.contains('worker-card__qfr--stale')).toBe(true);
  });

  test('draws the chip on the shared ctl-chip base', () => {
    const card = renderReviewCard({
      state: 'stale',
      missing: [],
      digest: null
    });

    expect(
      card.querySelector('.worker-card__qfr')?.classList.contains('ctl-chip')
    ).toBe(true);
  });

  test('draws no chip when no receipt was observed', () => {
    const card = renderReviewCard({
      state: 'unreviewed',
      missing: [],
      digest: null
    });

    expect(card.querySelector('.worker-card__qfr')).toBeNull();
  });

  test('draws no chip when the projection cannot judge', () => {
    const card = renderReviewCard({
      state: 'unknown',
      missing: [],
      digest: null
    });

    expect(card.querySelector('.worker-card__qfr')).toBeNull();
  });

  test('draws no chip when the workflow carries no judgement at all', () => {
    const card = renderReviewCard(undefined);

    expect(card.querySelector('.worker-card__qfr')).toBeNull();
  });

  test('leads the reviewed tooltip with the matching-body sentence', () => {
    const card = renderReviewCard({
      state: 'reviewed',
      missing: [],
      digest: '3f9a21c4b0e7'
    });

    expect(card.querySelector('.worker-card__qfr')?.getAttribute('title')).toBe(
      'quick_fix self-review 영수증이 지금 본문과 일치합니다'
    );
  });

  test('appends the missing list under the state sentence', () => {
    const card = renderReviewCard({
      state: 'stale',
      missing: ['section:출처/배경', 'scope:undeclared'],
      digest: '8c1d40ffab52'
    });

    expect(card.querySelector('.worker-card__qfr')?.getAttribute('title')).toBe(
      [
        'quick_fix self-review 영수증이 지금 본문과 다릅니다',
        'section:출처/배경',
        'scope:undeclared'
      ].join('\n')
    );
  });

  test('keeps the receipt string out of the tooltip', () => {
    const card = renderReviewCard({
      state: 'stale',
      missing: [],
      digest: '8c1d40ffab52'
    });

    expect(
      card.querySelector('.worker-card__qfr')?.getAttribute('title')
    ).not.toContain('8c1d40ffab52');
  });

  test('says the same thing on the monitor runnable lane as on the worker lane', () => {
    const review = {
      state: 'stale',
      missing: ['baseline_red'],
      digest: '8c1d40ffab52'
    };
    const workflow = /** @type {any} */ ({
      route: 'quick_fix',
      route_source: 'explicit',
      stages: STAGES,
      quick_fix_review: review
    });

    const worker_card = renderCandidate({ lane: 'candidate', workflow });
    const worker_chip = /** @type {HTMLElement} */ (
      worker_card.querySelector('.worker-card__qfr')
    );
    const worker_title = worker_chip.getAttribute('title');
    const worker_text = worker_chip.textContent?.trim();
    const monitor_card = renderCandidate({
      lane: 'runnable',
      workspace_name: 'beads-ui',
      root_dir: '/repo',
      workflow
    });
    const monitor_chip = /** @type {HTMLElement} */ (
      monitor_card.querySelector('.worker-card__qfr')
    );

    expect(monitor_chip.getAttribute('title')).toBe(worker_title);
    expect(monitor_chip.textContent?.trim()).toBe(worker_text);
  });
});

describe('quick_fix self-review 칩 자리 (UI-251y §3.2)', () => {
  /**
   * @param {'reviewed'|'stale'} state
   * @returns {any}
   */
  function reviewWorkflow(state) {
    return {
      route: 'quick_fix',
      route_source: 'explicit',
      stages: {
        impl: { fill: 'none', glyph: null, stale: false },
        close: { fill: 'none', glyph: null, stale: false }
      },
      quick_fix_review: { state, missing: [], digest: 'a1b2c3d4e5f6' }
    };
  }

  test('draws no chip cluster wrapper in the head', () => {
    const card = renderCandidate({});

    expect(card.querySelector('.worker-card__wfchips')).toBeNull();
  });

  test('keeps the review chip in the head and the route chip out of it', () => {
    const card = renderCandidate({
      workflow: /** @type {any} */ (reviewWorkflow('reviewed'))
    });
    const head = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__head')
    );

    expect(head.querySelector('.worker-card__qfr')?.textContent?.trim()).toBe(
      '리뷰 ✓'
    );
    expect(head.querySelector('.ctl-chip--route')).toBeNull();
    expect(card.querySelector('.worker-chips .ctl-chip--route')).not.toBeNull();
  });

  test('places the review chip at the end of the left group', () => {
    const card = renderCandidate({
      draggable: false,
      worker_ineligible: true,
      workflow: /** @type {any} */ (reviewWorkflow('stale'))
    });
    const head = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__head')
    );

    const kids = Array.from(head.children).map((el) => el.className);

    expect(kids.findIndex((c) => c.includes('worker-card__qfr'))).toBe(
      kids.findIndex((c) => c.includes('worker-card__ineligible')) + 1
    );
    expect(kids.at(-1)).toContain('worker-card__qfr');
  });

  test('keeps every judgement out of the drag and queue eligibility', () => {
    const states = ['reviewed', 'stale', 'unreviewed', 'unknown'];

    const verdicts = states.map((state) => {
      const card = renderCandidate({
        workflow: /** @type {any} */ ({
          route: 'quick_fix',
          route_source: 'explicit',
          stages: {
            impl: { fill: 'none', glyph: null, stale: false },
            close: { fill: 'none', glyph: null, stale: false }
          },
          quick_fix_review: { state, missing: [], digest: null }
        })
      });
      const place = /** @type {HTMLButtonElement} */ (
        card.querySelector('.worker-card__place')
      );
      return [card.getAttribute('draggable'), place.disabled];
    });

    expect(verdicts).toEqual([
      ['true', false],
      ['true', false],
      ['true', false],
      ['true', false]
    ]);
  });
});

describe('quickFixReviewChipTemplate (UI-r7or §5.1)', () => {
  test('draws nothing without a workflow', () => {
    render(quickFixReviewChipTemplate(null), mount);

    expect(mount.querySelector('.worker-card__qfr')).toBeNull();
  });

  test('draws nothing when the workflow carries no judgement', () => {
    render(
      quickFixReviewChipTemplate(/** @type {any} */ ({ route: 'quick_fix' })),
      mount
    );

    expect(mount.querySelector('.worker-card__qfr')).toBeNull();
  });

  test('decides the chip from the judgement alone', () => {
    const review = {
      state: 'stale',
      missing: ['scope:undeclared'],
      digest: 'ff00ff00ff00'
    };
    /**
     * @param {any} workflow
     * @returns {string}
     */
    function chipShape(workflow) {
      render(quickFixReviewChipTemplate(workflow), mount);
      const chip = /** @type {HTMLElement} */ (
        mount.querySelector('.worker-card__qfr')
      );
      return `${chip.className}|${chip.getAttribute('title')}|${chip.textContent?.trim()}`;
    }

    const pinned = chipShape({
      route: 'quick_fix',
      route_source: 'explicit',
      stages: {},
      quick_fix_review: review
    });
    const derived = chipShape({
      chips: { route: 'quick_fix', route_source: 'derived' },
      quick_fix_review: review
    });

    expect(pinned).toContain('worker-card__qfr--stale');
    expect(derived).toBe(pinned);
  });
});

describe('waiting row route chip (UI-yrzu §7.2)', () => {
  const WORKFLOW = {
    route: 'spec_backed',
    chips: { route: 'spec_backed', route_source: 'explicit' }
  };

  // 좌표 칩은 정체성 줄을 떠나 슬롯 5 줄로 갔다 (UI-251y §3.3).
  test('draws the chip in the coordinate row of a waiting row, not the line', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      workflow: /** @type {any} */ (WORKFLOW)
    });

    expect(
      row.querySelector('.worker-chips .ctl-chip--route')?.textContent
    ).toBe('spec_backed');
    expect(row.querySelector('.worker-mini__line .ctl-chip--route')).toBeNull();
  });

  test('draws the chip on a PR 대기 card variant', () => {
    const row = renderRow({
      lane: 'pr_wait',
      done: true,
      draggable: false,
      workflow: /** @type {any} */ (WORKFLOW)
    });

    expect(
      row.querySelector('.worker-chips .ctl-chip--route')?.textContent
    ).toBe('spec_backed');
    expect(row.querySelector('.worker-mini__head .ctl-chip--route')).toBeNull();
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
      row.querySelector('.worker-chips .ctl-chip--route')?.textContent
    ).toBe('spec_backed');
    expect(row.querySelector('.worker-mini__head .ctl-chip--route')).toBeNull();
  });

  test('draws no chip on a waiting row without a workflow', () => {
    const row = renderRow({ lane: 'queue', done: false, draggable: true });

    expect(row.querySelector('.ctl-chip--route')).toBeNull();
  });

  test('draws the chip on the slot 5 line of a two-line done row', () => {
    const row = renderRow({ workflow: /** @type {any} */ (WORKFLOW) });

    expect(
      row.querySelector('.worker-mini__row2 .ctl-chip--route')?.textContent
    ).toBe('spec_backed');
  });

  test('draws the chip on the slot 5 line of a three-line done row', () => {
    const row = renderRow({
      done_layout: 'three_line',
      workflow: /** @type {any} */ (WORKFLOW)
    });

    expect(
      row.querySelector('.worker-mini__row3 .ctl-chip--route')?.textContent
    ).toBe('spec_backed');
  });

  test('draws no chip on a done row whose workflow is missing', () => {
    const row = renderRow({ done_layout: 'three_line' });

    expect(row.querySelector('.ctl-chip--route')).toBeNull();
  });
});

describe('candidate card stepper doc cells (UI-ajkn §5)', () => {
  const CANDIDATE = /** @type {any} */ ({
    id: 'UI-d1',
    title: '문서 셀',
    lane: 'candidate',
    draggable: true,
    workflow: {
      route: 'spec_backed',
      stages: {
        spec: {
          fill: 'full',
          glyph: null,
          stale: false,
          doc: { path: 'docs/spec.md', missing_state: null }
        },
        impl: { fill: 'none', glyph: null, stale: false },
        pr: { fill: 'none', glyph: null, stale: false },
        merge: { fill: 'none', glyph: null, stale: false }
      }
    }
  });

  test('renders a static stepper without an onOpenDoc option', () => {
    render(candidateCard(CANDIDATE), mount);

    expect(mount.querySelector('.seg--doc')).toBeNull();
  });

  test('passes onOpenDoc through to the stepper cell', () => {
    const onOpenDoc = vi.fn();

    render(candidateCard(CANDIDATE, null, { onOpenDoc }), mount);
    /** @type {HTMLElement} */ (mount.querySelector('.seg--doc')).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(onOpenDoc).toHaveBeenCalledTimes(1);
    expect(onOpenDoc.mock.calls[0][1]).toEqual({
      path: 'docs/spec.md',
      missing_state: null
    });
  });

  test('keeps the click from reaching the delegated card handler', () => {
    const delegated = vi.fn();
    render(candidateCard(CANDIDATE, null, { onOpenDoc: vi.fn() }), mount);
    mount.addEventListener('click', delegated);

    /** @type {HTMLElement} */ (mount.querySelector('.seg--doc')).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(delegated).not.toHaveBeenCalled();
  });

  test('paneTemplate forwards its onOpenDoc to candidate cards', () => {
    const onOpenDoc = vi.fn();

    render(
      paneTemplate({
        id: 'p',
        lane: 'candidate',
        title: '후보',
        items: [CANDIDATE],
        onOpenDoc
      }),
      mount
    );
    /** @type {HTMLElement} */ (mount.querySelector('.seg--doc')).dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    );

    expect(onOpenDoc).toHaveBeenCalledTimes(1);
  });
});

describe('collapsible pane header (UI-5ksp §4.4)', () => {
  /**
   * @param {Record<string, any>} [extra]
   * @returns {HTMLElement}
   */
  function renderPane(extra = {}) {
    render(
      paneTemplate(
        /** @type {any} */ ({
          id: 'worker-pane-done',
          lane: 'done',
          title: '완료',
          items: [],
          collapsible: true,
          ...extra
        })
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.worker-pane'));
  }

  test('renders header_row as the pane child right after the header', () => {
    const pane = renderPane({
      header_row: html`<div class="probe-row"></div>`
    });

    const children = Array.from(pane.children).filter(
      (el) => el.nodeType === 1
    );

    expect(children[0].classList.contains('worker-pane__hd')).toBe(true);
    expect(children[1].classList.contains('probe-row')).toBe(true);
  });

  test('drops header_row on a collapsed pane', () => {
    const pane = renderPane({
      collapsed: true,
      header_row: html`<div class="probe-row"></div>`
    });

    expect(pane.querySelector('.probe-row')).toBe(null);
  });

  test('renders the toggle as a button inside the header, not as the header', () => {
    const pane = renderPane();

    const toggle = pane.querySelector(
      '.worker-pane__hd > .worker-pane__toggle'
    );

    expect(toggle?.tagName).toBe('BUTTON');
    expect(toggle?.getAttribute('data-lane')).toBe('done');
  });

  test('reports the expanded state on the toggle', () => {
    const pane = renderPane();

    expect(
      pane.querySelector('.worker-pane__toggle')?.getAttribute('aria-expanded')
    ).toBe('true');
  });

  test('reports the collapsed state on the toggle', () => {
    const pane = renderPane({ collapsed: true });

    expect(
      pane.querySelector('.worker-pane__toggle')?.getAttribute('aria-expanded')
    ).toBe('false');
  });

  test('stands the header control beside the toggle rather than inside it', () => {
    const pane = renderPane({
      header_control: html`<select class="worker-done-range"></select>`
    });

    const control = pane.querySelector('.worker-done-range');

    expect(control?.parentElement?.classList.contains('worker-pane__hd')).toBe(
      true
    );
    expect(control?.closest('.worker-pane__toggle')).toBeNull();
  });

  test('drops the header control while the pane is collapsed', () => {
    const pane = renderPane({
      collapsed: true,
      header_control: html`<select class="worker-done-range"></select>`
    });

    expect(pane.querySelector('.worker-done-range')).toBeNull();
  });

  test('draws neither controls nor body while the pane is collapsed', () => {
    const pane = renderPane({
      collapsed: true,
      controls: html`<div class="worker-filter"></div>`,
      body: html`<div class="worker-rungrid"></div>`
    });

    expect(pane.querySelector('.worker-filter')).toBeNull();
    expect(pane.querySelector('.worker-pane__body')).toBeNull();
  });

  test('previews the first row only while collapsed', () => {
    const pane = renderPane({ collapsed: true, preview: '첫 행' });

    expect(pane.querySelector('.worker-pane__preview')?.textContent).toBe(
      '첫 행'
    );
  });

  test('counts the items when no count is handed in', () => {
    const pane = renderPane({
      items: [{ id: 'UI-c1', title: 'a', lane: 'done', done: true }]
    });

    expect(pane.querySelector('.worker-pane__count')?.textContent).toBe('1');
  });

  test('prefers the explicit count over the item length', () => {
    const pane = renderPane({ items: [], count: 4 });

    expect(pane.querySelector('.worker-pane__count')?.textContent).toBe('4');
  });
});

describe('waitBody (UI-5ksp §4.2)', () => {
  /**
   * @param {Record<string, any>} [model]
   * @returns {HTMLElement}
   */
  function renderWait(model = {}) {
    render(
      waitBody(
        /** @type {any} */ ({
          parallel: { rows: [], count: 0, collapsed: false },
          serial: { lanes: [], collapsed: false },
          ...model
        })
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.worker-wait'));
  }

  /**
   * @param {Record<string, any>} [lane]
   */
  function serialLane(lane = {}) {
    return {
      id: 's1',
      title: '직렬 1',
      rows: [],
      count: 0,
      empty: true,
      ...lane
    };
  }

  test('draws one parallel area and one serial area', () => {
    const wait = renderWait();

    expect(
      wait
        .querySelector('.worker-wait__area--parallel')
        ?.getAttribute('data-area')
    ).toBe('parallel');
    expect(
      wait
        .querySelector('.worker-wait__area--serial')
        ?.getAttribute('data-area')
    ).toBe('serial');
  });

  test('marks a collapsed area and drops its body', () => {
    const wait = renderWait({
      parallel: { rows: [], count: 2, collapsed: true }
    });

    const area = /** @type {HTMLElement} */ (
      wait.querySelector('.worker-wait__area--parallel')
    );

    expect(area.classList.contains('is-collapsed')).toBe(true);
    expect(area.querySelector('.worker-wait__area-body')).toBeNull();
  });

  test('carries the area toggle state on its button', () => {
    const wait = renderWait({
      serial: { lanes: [], collapsed: true }
    });

    const toggle = wait.querySelector(
      '.worker-wait__area--serial .worker-wait__area-hd button[data-area]'
    );

    expect(toggle?.getAttribute('aria-expanded')).toBe('false');
  });

  test('counts the parallel rows in the area header', () => {
    const wait = renderWait({
      parallel: {
        rows: [html`<div class="row"></div>`],
        count: 7,
        collapsed: false
      }
    });

    expect(wait.querySelector('.worker-wait__area-count')?.textContent).toBe(
      '7'
    );
  });

  test('says the parallel area is empty when it has no rows', () => {
    const wait = renderWait();

    expect(
      wait.querySelector('.worker-wait__area-body .worker-pane__empty')
        ?.textContent
    ).toContain('비어 있음 — 드래그로 배치');
  });

  test('omits the parallel drop attributes when no coordinates are handed in', () => {
    const wait = renderWait();

    const body = /** @type {HTMLElement} */ (
      wait.querySelector('.worker-wait__area-body')
    );

    expect(body.hasAttribute('data-drop')).toBe(false);
    expect(body.hasAttribute('data-root-dir')).toBe(false);
  });

  test('writes the parallel drop attributes the caller hands in', () => {
    const wait = renderWait({
      parallel: {
        rows: [],
        count: 0,
        collapsed: false,
        drop: { drop: 'parallel' }
      }
    });

    expect(
      wait.querySelector('.worker-wait__area-body')?.getAttribute('data-drop')
    ).toBe('parallel');
  });

  test('renders each serial lane as a pane inside a lane wrapper', () => {
    const wait = renderWait({
      serial: {
        lanes: [serialLane({ empty: false, count: 2 })],
        collapsed: false
      }
    });

    const pane = wait.querySelector('.worker-wait__lane > .worker-pane');

    expect(pane?.id).toBe('worker-pane-lane-s1');
    expect(pane?.getAttribute('data-lane')).toBe('s1');
    expect(pane?.querySelector('.worker-pane__count')?.textContent).toBe('2');
  });

  test('marks an empty serial lane and gives it a one-line hint', () => {
    const wait = renderWait({
      serial: { lanes: [serialLane()], collapsed: false }
    });

    const lane = /** @type {HTMLElement} */ (
      wait.querySelector('.worker-wait__lane')
    );

    expect(lane.classList.contains('worker-wait__lane--empty')).toBe(true);
    expect(lane.querySelector('.worker-wait__hint')?.textContent).toBe(
      '직렬 1 · 비어 있음'
    );
  });

  test('draws no hint for a serial lane that has rows', () => {
    const wait = renderWait({
      serial: {
        lanes: [
          serialLane({
            empty: false,
            count: 1,
            rows: [html`<div class="r"></div>`]
          })
        ],
        collapsed: false
      }
    });

    expect(wait.querySelector('.worker-wait__hint')).toBeNull();
  });

  test('says an empty serial pane takes dragged rows', () => {
    const wait = renderWait({
      serial: { lanes: [serialLane()], collapsed: false }
    });

    expect(
      wait.querySelector('.worker-wait__rows .worker-pane__empty')?.textContent
    ).toContain('비어 있음 — 행을 여기로 드래그');
  });

  test('writes the serial row drop attributes the caller hands in', () => {
    const wait = renderWait({
      serial: {
        lanes: [
          serialLane({
            drop: {
              drop: 'repo-serial',
              root_dir: '/r',
              lane_id: 'l1',
              lane_length: '3'
            }
          })
        ],
        collapsed: false
      }
    });

    const rows = /** @type {HTMLElement} */ (
      wait.querySelector('.worker-wait__rows')
    );

    expect(rows.getAttribute('data-drop')).toBe('repo-serial');
    expect(rows.getAttribute('data-root-dir')).toBe('/r');
    expect(rows.getAttribute('data-lane-id')).toBe('l1');
    expect(rows.getAttribute('data-lane-length')).toBe('3');
  });

  test('omits the serial row drop attributes when the caller hands in none', () => {
    const wait = renderWait({
      serial: { lanes: [serialLane()], collapsed: false }
    });

    const rows = /** @type {HTMLElement} */ (
      wait.querySelector('.worker-wait__rows')
    );

    expect(rows.hasAttribute('data-lane-id')).toBe(false);
    expect(rows.hasAttribute('data-lane-length')).toBe(false);
  });

  test('draws the occupancy badge in the pane header', () => {
    const wait = renderWait({
      serial: {
        lanes: [serialLane({ badge: 'UI-a1', held: true })],
        collapsed: false
      }
    });

    const badge = wait.querySelector('.worker-lane__badge');

    expect(badge?.textContent).toBe('UI-a1');
    expect(badge?.classList.contains('worker-lane__badge--held')).toBe(true);
  });

  test('draws no badge for a lane that has none', () => {
    const wait = renderWait({
      serial: { lanes: [serialLane()], collapsed: false }
    });

    expect(wait.querySelector('.worker-lane__badge')).toBeNull();
  });

  test('stands the lane header control beside the badge', () => {
    const wait = renderWait({
      serial: {
        lanes: [
          serialLane({
            badge: 'UI-a1',
            header_control: html`<button class="mon2-sec__worker"></button>`
          })
        ],
        collapsed: false
      }
    });

    expect(
      wait.querySelector('.worker-pane__hd .mon2-sec__worker')
    ).not.toBeNull();
  });

  test('warns about a dependency cycle under the lane pane', () => {
    const wait = renderWait({
      serial: { lanes: [serialLane({ cycle: true })], collapsed: false }
    });

    expect(wait.querySelector('.worker-lane__cycle')?.textContent).toContain(
      'blocks 순환 감지'
    );
  });

  test('renders the after slot last inside the lane wrapper', () => {
    const wait = renderWait({
      serial: {
        lanes: [
          serialLane({ after: html`<div class="cross-wait">상호 정지</div>` })
        ],
        collapsed: false
      }
    });

    const lane = /** @type {HTMLElement} */ (
      wait.querySelector('.worker-wait__lane')
    );

    expect(lane.querySelector('.cross-wait')).not.toBeNull();
    expect(lane.lastElementChild?.className).toBe('cross-wait');
  });

  test('puts the extra panes before the serial lanes', () => {
    const wait = renderWait({
      serial: {
        lanes: [serialLane()],
        collapsed: false,
        extra_panes: [html`<div class="chain-lane"></div>`]
      }
    });

    const body = /** @type {HTMLElement} */ (
      wait.querySelector('.worker-wait__area--serial .worker-wait__area-body')
    );
    const marks = Array.from(body.children).map((el) => el.className);

    expect(marks.indexOf('chain-lane')).toBeLessThan(
      marks.findIndex((c) => c.startsWith('worker-wait__lane'))
    );
  });

  test('draws the serial notice above everything in the area body', () => {
    const wait = renderWait({
      serial: {
        lanes: [],
        collapsed: false,
        notice: html`<div class="unreadable">읽을 수 없음</div>`
      }
    });

    const body = /** @type {HTMLElement} */ (
      wait.querySelector('.worker-wait__area--serial .worker-wait__area-body')
    );

    expect(body.firstElementChild?.className).toBe('unreadable');
  });

  test('draws the serial header control in the area header', () => {
    const wait = renderWait({
      serial: {
        lanes: [],
        collapsed: false,
        header_control: html`<button class="mon2-newlane"></button>`
      }
    });

    expect(
      wait.querySelector(
        '.worker-wait__area--serial .worker-wait__area-hd .mon2-newlane'
      )
    ).not.toBeNull();
  });
});

describe('슬롯 4 두 줄 (UI-8x90 §4.1)', () => {
  /**
   * @param {Partial<import('./lanes.js').DependencyChips>} chips
   * @returns {HTMLElement}
   */
  function renderChips(chips) {
    render(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-me',
          title: '칩',
          lane: 'queue',
          draggable: false,
          dependency_chips: chips
        })
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.worker-mini'));
  }

  /**
   * @param {HTMLElement} row
   * @param {'primary'|'secondary'} which
   * @returns {HTMLElement}
   */
  function lineOf(row, which) {
    return /** @type {HTMLElement} */ (
      row.querySelector(`.worker-deps--${which}`)
    );
  }

  /**
   * @param {HTMLElement} line
   * @returns {string[]}
   */
  function kindsOf(line) {
    return Array.from(line.children, (chip) => chip.className.split(' ')[1]);
  }

  test('splits the slot into an 의존 line and an 정보 line', () => {
    const row = renderChips({
      predecessors: [{ id: 'UI-p', label: '⛓ UI-p' }],
      released: [{ id: 'UI-r', label: '🔓 UI-r' }]
    });

    expect(kindsOf(lineOf(row, 'primary'))).toEqual(['worker-dep--pred']);
    expect(kindsOf(lineOf(row, 'secondary'))).toEqual(['worker-dep--released']);
  });

  test('orders the 의존 line 발차 → 선행 → 후속', () => {
    const row = renderChips({
      dependents: [{ id: 'UI-s', label: '→ UI-s' }],
      predecessors: [{ id: 'UI-p', label: '⛓ UI-p' }],
      armed_lane: { lane_id: 'cl_1', label: '▶ 연결 1', orphan: false }
    });

    expect(kindsOf(lineOf(row, 'primary'))).toEqual([
      'worker-dep--armed',
      'worker-dep--pred',
      'worker-dep--dependents'
    ]);
  });

  test('sorts each 묶음 by id', () => {
    const row = renderChips({
      predecessors: [
        { id: 'UI-p2', label: '⛓ UI-p2' },
        { id: 'UI-p1', label: '⛓ UI-p1' }
      ],
      dependents: [
        { id: 'UI-s2', label: '→ UI-s2' },
        { id: 'UI-s1', label: '→ UI-s1' }
      ]
    });

    expect(
      Array.from(lineOf(row, 'primary').children, (chip) => chip.textContent)
    ).toEqual(['⛓ UI-p1', '⛓ UI-p2', '→ UI-s1', '→ UI-s2']);
  });

  test('keeps the 해제 칩 in the closed_at order the projection gave', () => {
    const row = renderChips({
      released: [
        { id: 'UI-r2', label: '🔓 UI-r2' },
        { id: 'UI-r1', label: '🔓 UI-r1' }
      ]
    });

    expect(
      Array.from(lineOf(row, 'secondary').children, (chip) => chip.textContent)
    ).toEqual(['🔓 UI-r2', '🔓 UI-r1']);
  });

  test('orders the 정보 line 해제 → 겹침 → scope 없음', () => {
    const row = renderChips({
      scope_missing: true,
      overlaps: [
        {
          id: 'UI-o',
          title: '상대',
          location_label: '#1',
          prefixes: ['server/worker']
        }
      ],
      released: [{ id: 'UI-r', label: '🔓 UI-r' }]
    });

    expect(kindsOf(lineOf(row, 'secondary'))).toEqual([
      'worker-dep--released',
      'worker-dep--overlap',
      'worker-dep--muted'
    ]);
  });

  test('draws the 의존 line alone when only it has material', () => {
    const row = renderChips({
      predecessors: [{ id: 'UI-p', label: '⛓ UI-p' }]
    });

    expect(lineOf(row, 'secondary')).toBeNull();
  });

  test('draws the 정보 line alone when only it has material', () => {
    const row = renderChips({ scope_missing: true });

    expect(lineOf(row, 'primary')).toBeNull();
  });

  test('draws neither line without material', () => {
    const row = renderChips({});

    expect(row.querySelector('.worker-deps')).toBeNull();
  });

  test('offers the release inside an orphan 발차 칩 (UI-jaua §5.3)', () => {
    const row = renderChips({
      armed_lane: {
        lane_id: 'cl_gone',
        label: '▶ 진행 중 · 레인 없음',
        orphan: true
      }
    });

    const chip = row.querySelector('.worker-dep--armed-orphan');
    expect([
      chip?.textContent?.includes('▶ 진행 중 · 레인 없음'),
      chip?.querySelector('.mon2-arm__release')?.getAttribute('data-lane-id')
    ]).toEqual([true, 'cl_gone']);
  });
});

describe('열리는 칩 네 종 (UI-8x90 §4.2·§4.3)', () => {
  /**
   * @param {Partial<import('./lanes.js').DependencyChips>} chips
   * @param {string} [lane]
   * @returns {HTMLElement}
   */
  function renderChips(chips, lane = 'queue') {
    render(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-me',
          title: '칩',
          lane,
          draggable: false,
          dependency_chips: chips
        })
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.worker-mini'));
  }

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

  test('draws one 후속 chip per id with the glyph label', () => {
    const row = renderChips({
      dependents: [
        { id: 'UI-s1', label: '→ UI-s1', openable: true },
        { id: 'UI-s2', label: '→ UI-s2', openable: true }
      ]
    });

    expect(
      Array.from(row.querySelectorAll('.worker-dep--dependents'), (chip) =>
        chip.textContent?.trim()
      )
    ).toEqual(['→ UI-s1', '→ UI-s2']);
  });

  test('makes an openable 후속 chip the same button as a 선행 one', () => {
    const row = renderChips({
      dependents: [
        {
          id: 'UI-s1',
          label: '→ UI-s1',
          openable: true,
          root_dir: '/repo/b'
        }
      ]
    });

    const button = /** @type {HTMLElement} */ (
      row.querySelector('.worker-dep--dependents.worker-dep__open')
    );

    expect(button.tagName).toBe('BUTTON');
    expect(button.dataset.depId).toBe('UI-s1');
    expect(button.dataset.rootDir).toBe('/repo/b');
  });

  test('leaves an unopenable 후속 chip a span', () => {
    const row = renderChips({
      dependents: [{ id: 'B-9', label: '→ B-9', foreign: true }]
    });

    const chip = /** @type {HTMLElement} */ (
      row.querySelector('.worker-dep--dependents')
    );

    expect(chip.tagName).toBe('SPAN');
    expect(row.querySelector('.worker-dep__open')).toBeNull();
  });

  test('makes the 겹침 chip an openable button', () => {
    const row = renderChips({ overlaps: overlaps(1) });

    const chip = /** @type {HTMLElement} */ (
      row.querySelector('.worker-dep--overlap')
    );

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.classList.contains('worker-dep__open')).toBe(true);
    expect(chip.dataset.depId).toBe('UI-o1');
    expect(chip.textContent?.trim()).toBe('⧉ UI-o1');
  });

  test('carries the counterpart repo on the 겹침 chip', () => {
    const row = renderChips({
      overlaps: [
        {
          id: 'UI-o1',
          title: '상대',
          location_label: '#1',
          prefixes: ['server/worker'],
          root_dir: '/repo/b'
        }
      ]
    });

    expect(
      /** @type {HTMLElement} */ (row.querySelector('.worker-dep--overlap'))
        .dataset.rootDir
    ).toBe('/repo/b');
  });

  test('lists the overlapping paths under the 위치 line in the tooltip', () => {
    const row = renderChips({
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
      row.querySelector('.worker-dep--overlap')?.getAttribute('title')
    ).toBe('겹침 · #1\napp/views\nserver/worker');
  });

  test('draws every counterpart chip without folding', () => {
    const row = renderChips({ overlaps: overlaps(5) });

    expect(
      Array.from(row.querySelectorAll('.worker-dep--overlap'), (chip) =>
        chip.textContent?.trim()
      )
    ).toEqual(['⧉ UI-o1', '⧉ UI-o2', '⧉ UI-o3', '⧉ UI-o4', '⧉ UI-o5']);
  });

  test('makes an openable 해제 chip a button carrying its owner', () => {
    const row = renderChips({
      released: [
        {
          id: 'B-9',
          label: '🔓 B-9',
          foreign: true,
          openable: true,
          root_dir: '/repo/b'
        }
      ]
    });

    const button = /** @type {HTMLElement} */ (
      row.querySelector('.worker-dep--released.worker-dep__open')
    );

    expect(button.dataset.depId).toBe('B-9');
    expect(button.dataset.rootDir).toBe('/repo/b');
  });

  test('colours a foreign release with the foreign class as well', () => {
    const row = renderChips({
      released: [{ id: 'B-9', label: '🔓 B-9', title: '풀렸다', foreign: true }]
    });

    expect(row.querySelector('.worker-dep--released')?.className).toContain(
      'worker-dep--foreign'
    );
  });

  test('leaves an unopenable release chip a span', () => {
    const row = renderChips({
      released: [{ id: 'B-9', label: '🔓 B-9', foreign: true }]
    });

    expect(row.querySelector('.worker-dep--released')?.tagName).toBe('SPAN');
  });

  test('draws an openable blocked chip as a button', () => {
    const row = renderChips({
      predecessors: [{ id: 'UI-p', label: '⛓ UI-p', openable: true }]
    });

    expect(
      row.querySelector('.worker-dep__open')?.getAttribute('data-dep-id')
    ).toBe('UI-p');
  });

  test('splits openability chip by chip inside one card', () => {
    const row = renderChips({
      predecessors: [
        { id: 'UI-p', label: '⛓ UI-p', openable: true },
        { id: 'x-p', label: '⛓ x-p' }
      ]
    });

    expect(row.querySelectorAll('.worker-dep--pred').length).toBe(2);
    expect(row.querySelectorAll('.worker-dep__open').length).toBe(1);
  });

  test('keeps label, tooltip and colour on a display-only blocked chip', () => {
    const row = renderChips({
      predecessors: [
        {
          id: 'UI-p',
          label: '⛓ UI-p',
          title: '선행 — close될 때까지 출발하지 않는다 (#1)'
        }
      ]
    });

    const chip = /** @type {HTMLElement} */ (
      row.querySelector('.worker-dep--pred')
    );
    expect(chip.textContent?.trim()).toBe('⛓ UI-p');
    expect(chip.getAttribute('title')).toBe(
      '선행 — close될 때까지 출발하지 않는다 (#1)'
    );
  });

  test('adds the foreign class to a blocked chip from another repo', () => {
    const row = renderChips({
      predecessors: [
        { id: 'dotfiles-j8e6', label: '⛓ dotfiles-j8e6', foreign: true }
      ]
    });

    expect(row.querySelector('.worker-dep--pred')?.className).toContain(
      'worker-dep--foreign'
    );
  });

  test('draws the muted chip on a running row too', () => {
    const row = renderChips(
      { overlaps: overlaps(1), scope_missing: true },
      'running'
    );

    expect(row.querySelector('.worker-dep--muted')?.textContent).toContain(
      'scope 없음'
    );
  });

  test('names the declaration hint on the muted chip', () => {
    const row = renderChips({ scope_missing: true });

    expect(row.querySelector('.worker-dep--muted')?.getAttribute('title')).toBe(
      '겹침 판정 불가 — 아티팩트가 있으면 스펙/플랜 front-matter, 없으면 description `## scope`에 선언 필요'
    );
  });

  test('keeps no 겹침 팝오버 markup anywhere (UI-8x90 §4.3)', () => {
    const row = renderChips({ overlaps: overlaps(2) });

    expect(row.querySelector('.mon-overlap__popover')).toBeNull();
    expect(row.querySelector('.mon-overlap__chip')).toBeNull();
    expect(row.querySelector('.mon-overlap__place')).toBeNull();
  });
});

describe('후보 카드 배치 자격 (UI-d13v §6)', () => {
  test('renders a placeable candidate that is not a drag source', () => {
    const card = renderCandidate({ draggable: false, queue_placeable: true });

    expect(card.getAttribute('draggable')).toBe('false');
    expect(
      /** @type {HTMLButtonElement} */ (
        card.querySelector('.worker-card__place')
      ).disabled
    ).toBe(false);
  });

  test('opens the lane menu of a placeable candidate that cannot be dragged', () => {
    const card = renderCandidate(
      { draggable: false, queue_placeable: true },
      { bead_id: 'UI-qf', lanes: [{ id: 'parallel', label: '병렬', count: 3 }] }
    );

    expect(card.querySelector('.worker-card__place-menu')).not.toBeNull();
  });

  test('refuses both the button and the menu for an ineligible candidate', () => {
    const card = renderCandidate(
      {
        draggable: false,
        queue_placeable: true,
        worker_ineligible: true
      },
      { bead_id: 'UI-qf', lanes: [{ id: 'parallel', label: '병렬', count: 3 }] }
    );

    expect(card.querySelector('.worker-card__place-menu')).toBeNull();
    expect(
      /** @type {HTMLButtonElement} */ (
        card.querySelector('.worker-card__place')
      ).disabled
    ).toBe(true);
  });

  test('refuses the button when the projection withholds queue_placeable', () => {
    const card = renderCandidate({ draggable: true, queue_placeable: false });

    expect(
      /** @type {HTMLButtonElement} */ (
        card.querySelector('.worker-card__place')
      ).disabled
    ).toBe(true);
  });
});

describe('miniRow row actions (UI-5ksp §4.6)', () => {
  /**
   * @param {Record<string, any>} item
   * @param {Record<string, any>} [options]
   * @returns {HTMLElement}
   */
  function renderWithActions(item, options = {}) {
    render(
      miniRow(/** @type {any} */ (item), /** @type {any} */ (options)),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.worker-mini'));
  }

  test('appends the actions to the end of a one-line row', () => {
    const row = renderWithActions(
      { id: 'UI-r1', title: '대기 행', lane: 'queue', draggable: true },
      { actions: html`<span class="worker-mini__rowops">⛓</span>` }
    );

    const line = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__line')
    );

    expect(line.lastElementChild?.className).toBe('worker-mini__rowops');
  });

  test('appends the actions to the head of a card row', () => {
    const row = renderWithActions(
      { id: 'UI-r2', title: 'PR 대기 행', lane: 'pr_wait', draggable: true },
      { actions: html`<span class="worker-mini__rowops">⛓</span>` }
    );

    const head = /** @type {HTMLElement} */ (
      row.querySelector('.worker-mini__head')
    );

    expect(head.lastElementChild?.className).toBe('worker-mini__rowops');
  });

  test('renders the same DOM whether the options object is omitted or empty', () => {
    const item = /** @type {any} */ ({
      id: 'UI-r3',
      title: '동일',
      lane: 'queue',
      draggable: true
    });

    expect(shape(miniRow(item, {}))).toBe(shape(miniRow(item)));
  });
});

describe('nowPanel (UI-5ksp §4.7)', () => {
  test('renders nothing when nothing is running or waiting', () => {
    render(nowPanel({ count: 0 }), mount);

    expect(mount.querySelector('.worker-now')).toBeNull();
  });

  test('draws the running body and the PR 대기 rows together', () => {
    render(
      nowPanel({
        count: 3,
        running_body: html`<div class="worker-rungrid"></div>`,
        pr_wait_rows: [html`<div class="pr-row"></div>`]
      }),
      mount
    );

    const now = /** @type {HTMLElement} */ (mount.querySelector('#worker-now'));

    expect(now.querySelector('.worker-rungrid')).not.toBeNull();
    expect(now.querySelector('.pr-row')).not.toBeNull();
    expect(now.querySelector('.worker-now__count')?.textContent).toBe('3');
  });

  test('marks the panel live when work is actually running', () => {
    render(nowPanel({ count: 1, live: true }), mount);

    expect(
      mount
        .querySelector('.worker-now')
        ?.classList.contains('worker-pane--live')
    ).toBe(true);
  });
});

describe('복잡 chip on the worker lane surfaces (UI-sbum §3)', () => {
  /** @type {import('../../utils/rec-settings.js').RecSettings} */
  const REC = {
    reasons: ['hard_diagnosis', 'claude_bound'],
    rec: { orchestration_model: 'fable', impl_runtime: 'claude' },
    state: 'unapplied'
  };
  const REC_TITLE =
    '복잡한 작업으로 판정됨\n사유: 원인이 불명확하거나 재현이 불안정해 가설-검증 루프가 필요하다 · Claude 세션 자산·의미론에 강하게 묶여 있다\n상태: 미적용';

  test('draws the chip on a waiting row with the shared tooltip', () => {
    const row = renderRow({ lane: 'queue', done: false, rec: REC });

    const chip = /** @type {HTMLElement} */ (
      row.querySelector('.worker-card__rec')
    );

    expect(chip.textContent?.trim()).toBe('복잡');
    expect(chip.title).toBe(REC_TITLE);
  });

  test('draws the chip on a candidate card with the same tooltip', () => {
    const card = renderCandidate({ rec: REC });

    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__rec')
    );

    expect(chip.textContent?.trim()).toBe('복잡');
    expect(chip.title).toBe(REC_TITLE);
  });

  test('carries the recommendation state as a data attribute', () => {
    const states = ['unapplied', 'applied', 'diverged'].map((state) => {
      const card = renderCandidate({
        rec: { ...REC, state: /** @type {any} */ (state) }
      });
      return /** @type {HTMLElement} */ (
        card.querySelector('.worker-card__rec')
      ).dataset.state;
    });

    expect(states).toEqual(['unapplied', 'applied', 'diverged']);
  });

  test('omits the chip when the bead has no recommendation', () => {
    const row = renderRow({ lane: 'queue', done: false, rec: null });
    const card = renderCandidate({ rec: null });

    expect(row.querySelector('.worker-card__rec')).toBeNull();
    expect(card.querySelector('.worker-card__rec')).toBeNull();
  });

  test('draws the chip line for a row whose only chip is the recommendation', () => {
    const row = renderRow({ lane: 'queue', done: false, rec: REC });

    expect(row.querySelector('.worker-chips')).not.toBeNull();
  });

  test('turns the chip into a 판정 button that opens a 사유 popup', () => {
    const card = renderCandidate({ rec: REC });
    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__rec')
    );

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.classList.contains('judgement-chip')).toBe(true);
    expect(chip.dataset.chipKey).toBe('rec');
    expect(chip.getAttribute('aria-expanded')).toBe('false');
  });

  test('keeps the 세션 권장 chip beside it on the same candidate', () => {
    const card = renderCandidate({
      rec: REC,
      session_preferred: true,
      session_preferred_reason: 'external_roundtrip'
    });

    expect(
      card.querySelector('.worker-card__session-preferred')
    ).not.toBeNull();
    expect(card.querySelector('.worker-card__rec')).not.toBeNull();
  });
});

describe('판정 칩과 사유 팝업 (UI-8x90 §4.5)', () => {
  /** @type {import('../../utils/rec-settings.js').RecSettings} */
  const REC = {
    reasons: ['verification_by_judgment'],
    rec: { orchestration_model: 'fable' },
    state: 'diverged'
  };

  const QFR = /** @type {any} */ ({
    route: 'quick_fix',
    quick_fix_review: { state: 'stale', missing: ['테스트'], digest: null }
  });

  test('makes the worker-ineligible chip a judgement button', () => {
    const card = renderCandidate({ worker_ineligible: true });
    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__ineligible')
    );

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.dataset.chipKey).toBe('ineligible');
  });

  test('makes the 세션 권장 chip a judgement button', () => {
    const card = renderCandidate({
      session_preferred: true,
      session_preferred_reason: 'external_roundtrip'
    });
    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__session-preferred')
    );

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.dataset.chipKey).toBe('session_preferred');
  });

  test('makes the 리뷰 chip a judgement button', () => {
    const card = renderCandidate({ workflow: QFR });
    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__qfr')
    );

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.dataset.chipKey).toBe('qfr');
  });

  test('keeps the tooltip on a judgement chip', () => {
    const card = renderCandidate({
      session_preferred: true,
      session_preferred_reason: 'user_feedback_loop'
    });

    expect(
      card
        .querySelector('.worker-card__session-preferred')
        ?.getAttribute('title')
    ).toBe(
      '진행 중 사용자 피드백 없이는 품질이 낮음 — 문안·설계 세부·방향 선택'
    );
  });

  test('draws the popup under the identity line of a candidate card', () => {
    const card = renderCandidate({
      rec: REC,
      chip_popover: {
        chip_key: 'rec',
        content: { title: '복잡한 작업으로 판정됨', lines: ['한 줄'] }
      }
    });
    const popover = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__head .chip-popover')
    );

    expect(popover.getAttribute('role')).toBe('dialog');
    expect(
      card.querySelector('.worker-card__rec')?.getAttribute('aria-expanded')
    ).toBe('true');
  });

  test('draws the popup under the coordinate line of a waiting row', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      rec: REC,
      chip_popover: {
        chip_key: 'rec',
        content: { title: '복잡한 작업으로 판정됨', lines: ['한 줄'] }
      }
    });

    expect(row.querySelector('.worker-chips .chip-popover')).not.toBeNull();
  });
});

describe('judgementPopoverContent (UI-8x90 §4.5)', () => {
  test('names the 복잡 사유 sentences and the state', () => {
    const content = judgementPopoverContent(
      /** @type {any} */ ({
        id: 'UI-a',
        rec: {
          reasons: ['verification_by_judgment'],
          rec: { orchestration_model: 'fable' },
          state: 'diverged'
        }
      }),
      'rec'
    );

    expect(content).toEqual({
      title: '복잡한 작업으로 판정됨',
      lines: [
        '테스트가 못 잡고 리뷰어의 추론으로만 검증할 수 있다',
        '상태: 추천과 다름',
        '적용은 이슈 상세의 실행 설정 편집기에서'
      ]
    });
  });

  test('names the 세션 권장 reason in one line', () => {
    const content = judgementPopoverContent(
      /** @type {any} */ ({
        id: 'UI-a',
        session_preferred: true,
        session_preferred_reason: 'external_roundtrip'
      }),
      'session_preferred'
    );

    expect(content).toEqual({
      title: '워커로 돌릴 수 있지만 세션이 낫다',
      lines: [
        '하네스 밖 상대와 예측 불가 왕복 반복 — 다른 rig 세션·사람·외부 시스템'
      ]
    });
  });

  test('says where the worker-ineligible label is removed', () => {
    const content = judgementPopoverContent(
      /** @type {any} */ ({ id: 'UI-a', worker_ineligible: true }),
      'ineligible'
    );

    expect(content).toEqual({
      title: '워커 실행 대상이 아니다',
      lines: [
        'worker-ineligible 라벨이 붙어 있다 — 라벨은 이슈 상세의 라벨 절에서 뗀다'
      ]
    });
  });

  test('lists the missing review items', () => {
    const content = judgementPopoverContent(
      /** @type {any} */ ({
        id: 'UI-a',
        workflow: {
          quick_fix_review: { state: 'stale', missing: ['테스트', '문서'] }
        }
      }),
      'qfr'
    );

    expect(content).toEqual({
      title: 'quick_fix self-review 영수증이 지금 본문과 다릅니다',
      lines: ['테스트', '문서']
    });
  });

  test('says so when no review item is missing', () => {
    const content = judgementPopoverContent(
      /** @type {any} */ ({
        id: 'UI-a',
        workflow: { quick_fix_review: { state: 'reviewed', missing: [] } }
      }),
      'qfr'
    );

    expect(content?.lines).toEqual(['빠진 항목 없음']);
  });

  test('names the blockers the spec is waiting on', () => {
    const content = judgementPopoverContent(
      /** @type {any} */ ({
        id: 'UI-a',
        spec_after_blocker: true,
        blocked_by: ['UI-b', 'UI-c']
      }),
      'spec_after_blocker'
    );

    expect(content).toEqual({
      title: '선행 결과가 설계 전제 — 스펙도 선행 뒤에',
      lines: [
        '선행: UI-b · UI-c',
        '선행이 닫히면 이 표시는 저절로 사라진다 — 라벨은 이슈 상세의 라벨 절에서 뗀다'
      ]
    });
  });

  test('answers null when the 스펙 대기 judgement is absent', () => {
    expect(
      judgementPopoverContent(
        /** @type {any} */ ({ id: 'UI-a', blocked_by: ['UI-b'] }),
        'spec_after_blocker'
      )
    ).toBeNull();
  });

  test('answers null when the chip has no material', () => {
    expect(
      judgementPopoverContent(/** @type {any} */ ({ id: 'UI-a' }), 'rec')
    ).toBeNull();
  });

  test('names one sentence per receipt badge code', () => {
    const content = judgementPopoverContent(
      /** @type {any} */ ({
        id: 'UI-a',
        receipt_badge: { codes: ['absent'] }
      }),
      'receipt'
    );

    expect(content).toEqual({
      title: '실행 영수증 회계 잔여 — 머지는 진행',
      lines: [
        '실행 영수증이 기록되지 않았다 — 과거 Bead·외부 경로 PR은 원래 없다',
        '자동 머지 판정에는 영향이 없다 — 정정은 bd update --set-metadata exec_receipt=… 로'
      ]
    });
  });

  test('answers null when the receipt chip has no material', () => {
    expect(
      judgementPopoverContent(/** @type {any} */ ({ id: 'UI-a' }), 'receipt')
    ).toBeNull();
  });
});

describe('JUDGEMENT_CHIP_KEYS (UI-h6t1 §4.3)', () => {
  test('carries the receipt chip key', () => {
    expect(JUDGEMENT_CHIP_KEYS).toContain('receipt');
  });
});

describe('영수증 회계 잔여 칩 (UI-h6t1 §4.3)', () => {
  /**
   * @param {string[]|undefined} codes
   * @returns {HTMLElement|null}
   */
  function renderReceiptRow(codes) {
    render(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-a',
          title: 'PR 대기',
          lane: 'pr_wait',
          draggable: false,
          ...(codes ? { receipt_badge: { codes } } : {})
        })
      ),
      mount
    );
    return mount.querySelector('[data-chip-key="receipt"]');
  }

  test('draws the chip on the 슬롯 5 chip line', () => {
    renderReceiptRow(['absent']);

    expect(
      mount.querySelector('.worker-chips [data-chip-key="receipt"]')
    ).not.toBeNull();
  });

  test('stands right after the 복잡 chip slot and before usage', () => {
    renderReceiptRow(['absent']);

    const chip = /** @type {HTMLElement} */ (
      mount.querySelector('[data-chip-key="receipt"]')
    );
    expect(chip.classList.contains('worker-card__receipt')).toBe(true);
    expect(chip.classList.contains('ctl-chip--label')).toBe(true);
  });

  test('keeps every code in the chip tooltip', () => {
    renderReceiptRow(['absent', 'effort_unknown']);

    expect(
      mount.querySelector('[data-chip-key="receipt"]')?.getAttribute('title')
    ).toBe('absent, effort_unknown');
  });

  test('draws no chip without codes', () => {
    expect(renderReceiptRow(undefined)).toBeNull();
  });

  test('draws no chip for an empty code list', () => {
    expect(renderReceiptRow([])).toBeNull();
  });
});

describe('스펙 대기 칩 (UI-svh6 §4.3)', () => {
  test('draws the chip right after the ⛓ chip on the dependency line', () => {
    const card = renderCandidate({
      spec_after_blocker: true,
      blocked_by: ['UI-b'],
      dependency_chips: /** @type {any} */ ({
        predecessors: [{ id: 'UI-b', label: '⛓ UI-b' }],
        dependents: [{ id: 'UI-c', label: '→ UI-c' }]
      })
    });
    const primary = /** @type {HTMLElement} */ (
      card.querySelector('.worker-deps--primary')
    );

    expect(
      Array.from(primary.children, (child) => child.textContent?.trim())
    ).toEqual(['⛓ UI-b', '스펙 대기', '→ UI-c']);
  });

  test('turns the chip into a 판정 button that opens a 사유 popup', () => {
    const card = renderCandidate({
      spec_after_blocker: true,
      blocked_by: ['UI-b'],
      dependency_chips: /** @type {any} */ ({
        predecessors: [{ id: 'UI-b', label: '⛓ UI-b' }]
      })
    });
    const chip = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__spec-after-blocker')
    );

    expect([
      chip.tagName,
      chip.classList.contains('judgement-chip'),
      chip.dataset.chipKey,
      chip.getAttribute('aria-expanded')
    ]).toEqual(['BUTTON', true, 'spec_after_blocker', 'false']);
  });

  test('keeps the 세션 권장 chip on the head line beside it', () => {
    const card = renderCandidate({
      spec_after_blocker: true,
      blocked_by: ['UI-b'],
      session_preferred: true,
      session_preferred_reason: 'external_roundtrip',
      dependency_chips: /** @type {any} */ ({
        predecessors: [{ id: 'UI-b', label: '⛓ UI-b' }]
      })
    });

    expect([
      !!card.querySelector(
        '.worker-card__head .worker-card__session-preferred'
      ),
      !!card.querySelector(
        '.worker-deps--primary .worker-card__spec-after-blocker'
      )
    ]).toEqual([true, true]);
  });

  test('omits the chip on a candidate without the judgement', () => {
    const card = renderCandidate({
      dependency_chips: /** @type {any} */ ({
        predecessors: [{ id: 'UI-b', label: '⛓ UI-b' }]
      })
    });

    expect(card.querySelector('.worker-card__spec-after-blocker')).toBeNull();
  });

  test('opens the 사유 popup on the dependency line, not the head line', () => {
    const card = renderCandidate({
      spec_after_blocker: true,
      blocked_by: ['UI-b'],
      chip_popover: /** @type {any} */ ({
        chip_key: 'spec_after_blocker',
        content: {
          title: '선행 결과가 설계 전제 — 스펙도 선행 뒤에',
          lines: []
        }
      }),
      dependency_chips: /** @type {any} */ ({
        predecessors: [{ id: 'UI-b', label: '⛓ UI-b' }]
      })
    });

    expect([
      !!card.querySelector('.worker-deps--primary .chip-popover'),
      !!card.querySelector('.worker-card__head .chip-popover')
    ]).toEqual([true, false]);
  });
});

describe('준비 필요 판정 칩과 흐림 (UI-ff10 §6)', () => {
  const BASE = {
    queue_placeable: false,
    route_ok: true,
    awaiting_user: false,
    missing_description: false,
    placement_spec: /** @type {const} */ ('published')
  };

  /** @type {Array<[string, Partial<import('./lanes.js').MiniItem>, string]>} */
  const CASES = [
    [
      '라우팅 필요',
      { route_ok: false },
      'route가 정해지지 않아 대기 큐에 넣을 수 없습니다'
    ],
    [
      '본문 필요',
      { missing_description: true, placement_spec: 'n/a' },
      'description이 없어 대기 큐에 넣을 수 없습니다'
    ],
    [
      '스펙 충돌',
      { placement_spec: 'conflict' },
      'spec 경로가 충돌해 대기 큐에 넣을 수 없습니다'
    ],
    [
      '스펙 미발행',
      { placement_spec: 'draft' },
      'spec이 발행되지 않아 대기 큐에 넣을 수 없습니다'
    ]
  ];

  test.each(CASES)(
    'draws one %s chip with the placement title',
    (label, over, title) => {
      const card = renderCandidate({ ...BASE, ...over });
      const chips = card.querySelectorAll('.worker-card__readiness');

      expect(chips).toHaveLength(1);
      expect(chips[0].textContent?.trim()).toBe(label);
      expect(chips[0].getAttribute('title')).toBe(title);
    }
  );

  test('uses the first matching readiness reason', () => {
    const card = renderCandidate({
      ...BASE,
      route_ok: false,
      worker_ineligible: true,
      awaiting_user: true,
      missing_description: true,
      placement_spec: 'conflict'
    });

    expect(card.querySelectorAll('.worker-card__readiness')).toHaveLength(1);
    expect(
      card.querySelector('.worker-card__readiness')?.textContent?.trim()
    ).toBe('라우팅 필요');
  });

  test.each([
    ['worker-ineligible', { worker_ineligible: true }],
    ['awaiting-user', { awaiting_user: true }]
  ])('omits a new chip for %s', (_name, over) => {
    const card = renderCandidate({ ...BASE, ...over });

    expect(card.querySelector('.worker-card__readiness')).toBeNull();
  });

  test('keeps 스펙 대기 before the readiness chip in slot 4a', () => {
    const card = renderCandidate({
      ...BASE,
      placement_spec: 'draft',
      spec_after_blocker: true,
      blocked_by: ['UI-b']
    });
    const primary = /** @type {HTMLElement} */ (
      card.querySelector('.worker-deps--primary')
    );

    expect(
      Array.from(primary.children, (child) => child.textContent?.trim())
    ).toEqual(['스펙 대기', '스펙 미발행']);
  });

  test('opens the readiness reason popup under slot 4a', () => {
    const item = /** @type {any} */ ({
      ...BASE,
      id: 'UI-qf',
      placement_spec: 'conflict'
    });
    const chip_popover = judgementPopoverOf(
      item,
      (/** @type {string} */ chip_key) => chip_key === 'readiness'
    );

    const card = renderCandidate({ ...item, chip_popover });

    expect(
      card
        .querySelector('.worker-card__readiness')
        ?.getAttribute('aria-expanded')
    ).toBe('true');
    expect(
      card.querySelector('.worker-deps--primary .chip-popover__title')
        ?.textContent
    ).toBe('spec 경로가 충돌해 대기 큐에 넣을 수 없습니다');
  });

  test('uses one dimming class when blocked and not ready overlap', () => {
    const card = renderCandidate({ ...BASE, blocked: true });

    expect(card.classList.contains('worker-card--blocked')).toBe(true);
    expect(
      Array.from(card.classList).filter(
        (name) => name === 'worker-card--blocked'
      )
    ).toHaveLength(1);
  });

  test('leaves the root undimmed for a worker-ineligible card', () => {
    const card = renderCandidate({
      ...BASE,
      queue_placeable: false,
      worker_ineligible: true
    });

    expect(card.classList.contains('worker-card--ineligible')).toBe(true);
    expect(card.classList.contains('worker-card--blocked')).toBe(false);
  });

  test('leaves a ready unblocked card undimmed', () => {
    const card = renderCandidate({ ...BASE, queue_placeable: true });

    expect(card.classList.contains('worker-card--blocked')).toBe(false);
  });
});

describe('연결 n 소속 칩의 자리 (UI-8x90 §4.1)', () => {
  test('draws it on the coordinate line after the repo badge', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      workspace_name: 'repo-a',
      cross_lane_chip: { lane_id: 'cl_1', label: '연결 1' }
    });
    const chips = /** @type {HTMLElement} */ (
      row.querySelector('.worker-chips')
    );

    expect(
      Array.from(chips.children, (chip) => chip.className.split(' ')[0])
    ).toEqual(['worker-mini__repo', 'worker-dep']);
    expect(chips.querySelector('.mon-lane__chip')?.textContent?.trim()).toBe(
      '연결 1'
    );
  });

  test('keeps it out of the 의존 slot', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      cross_lane_chip: { lane_id: 'cl_1', label: '연결 1' }
    });

    expect(row.querySelector('.worker-deps')).toBeNull();
  });

  test('draws it on a candidate coordinate line too', () => {
    const card = renderCandidate({
      cross_lane_chip: { lane_id: 'cl_2', label: '연결 2 (draft)' }
    });

    expect(
      card
        .querySelector('.worker-chips .mon-lane__chip')
        ?.getAttribute('data-lane-id')
    ).toBe('cl_2');
  });
});

describe('완료 실패 로그 경로 (UI-8w4t §4)', () => {
  test('renders the log path and its copy control on slot 5', () => {
    const row = renderRow({
      lane: 'pr_wait',
      done: false,
      log_path: '/state/bdui/repo/logs/op-1.log'
    });

    expect(
      row.querySelector('.worker-chips .worker-ev__path')?.textContent
    ).toBe('/state/bdui/repo/logs/op-1.log');
    expect(
      row.querySelector('.worker-chips [data-seam="log-path-copy"]')
    ).not.toBeNull();
  });

  test('draws nothing when the failure left no log behind', () => {
    const row = renderRow({ lane: 'pr_wait', done: false });

    expect(row.querySelector('.worker-ev__path')).toBeNull();
    expect(row.querySelector('[data-seam="log-path-copy"]')).toBeNull();
  });

  test('puts the absolute path on the clipboard when the control is clicked', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal('navigator', { clipboard: { writeText } });
    const row = renderRow({
      lane: 'pr_wait',
      done: false,
      log_path: '/state/bdui/repo/logs/op-1.log'
    });

    /** @type {HTMLButtonElement} */ (
      row.querySelector('.worker-ev__copy')
    ).click();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('/state/bdui/repo/logs/op-1.log');
    vi.unstubAllGlobals();
  });
});

describe('조작 형태 토큰 `.op-btn` (UI-6g3t §3.2·§3.3)', () => {
  test('leads the candidate foot button with its icon', () => {
    const card = renderCandidate({});

    const place = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(place.textContent?.trim()).toBe('↴ 대기로');
  });

  test('gives the candidate foot button the primary token', () => {
    const card = renderCandidate({});

    const place = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__place')
    );

    expect(place.classList.contains('op-btn')).toBe(true);
    expect(place.classList.contains('op-btn--primary')).toBe(true);
  });

  test('gives the lane menu cancel the icon token', () => {
    const card = renderCandidate(
      {},
      { bead_id: 'UI-qf', lanes: [{ id: 'parallel', label: '병렬', count: 3 }] }
    );

    const cancel = /** @type {HTMLElement} */ (
      card.querySelector('.worker-card__place-cancel')
    );

    expect(cancel.classList.contains('op-btn')).toBe(true);
    expect(cancel.classList.contains('op-btn--icon')).toBe(true);
  });
});

describe('queueRowOps (UI-6g3t §4)', () => {
  /**
   * @param {Partial<import('./lanes.js').MiniItem>} item
   * @param {{ nudgeable?: boolean }} [options]
   * @returns {HTMLElement|null}
   */
  function renderOps(item, options) {
    render(
      html`<div>
        ${queueRowOps(
          /** @type {any} */ ({ id: 'UI-q1', draggable: true, ...item }),
          options
        )}
      </div>`,
      mount
    );
    return mount.querySelector('.worker-mini__rowops');
  }

  test('renders only ✕ without nudgeable', () => {
    const ops = renderOps({});

    const glyphs = Array.from(
      /** @type {HTMLElement} */ (ops).querySelectorAll('button')
    ).map((button) => button.textContent?.trim());

    expect(glyphs).toEqual(['✕']);
  });

  test('renders ↑ ↓ ✕ in that order when nudgeable', () => {
    const ops = renderOps({}, { nudgeable: true });

    const glyphs = Array.from(
      /** @type {HTMLElement} */ (ops).querySelectorAll('button')
    ).map((button) => button.textContent?.trim());

    expect(glyphs).toEqual(['↑', '↓', '✕']);
  });

  test('keeps ✕ last so its place does not move with the width', () => {
    const ops = renderOps({}, { nudgeable: true });

    const last = /** @type {HTMLElement} */ (ops).lastElementChild;

    expect(last?.className).toContain('worker-mini__rowops-remove');
  });

  test('carries the queue-remove action and the icon token on ✕', () => {
    const ops = renderOps({}, { nudgeable: true });

    const remove = /** @type {HTMLElement} */ (
      /** @type {HTMLElement} */ (ops).querySelector(
        '.worker-mini__rowops-remove'
      )
    );

    expect(remove.getAttribute('data-action')).toBe('queue-remove');
    expect(remove.classList.contains('op-btn')).toBe(true);
    expect(remove.classList.contains('op-btn--icon')).toBe(true);
  });

  test('names every icon-only button for assistive tech', () => {
    const ops = renderOps({}, { nudgeable: true });

    const named = Array.from(
      /** @type {HTMLElement} */ (ops).querySelectorAll('button')
    ).every(
      (button) =>
        button.title !== '' && button.getAttribute('aria-label') !== null
    );

    expect(named).toBe(true);
  });

  test('renders nothing for a departed row', () => {
    const ops = renderOps({ done: true });

    expect(ops).toBeNull();
  });

  test('renders nothing for a row that cannot be dragged', () => {
    const ops = renderOps({ draggable: false });

    expect(ops).toBeNull();
  });
});

describe('대기 진입 유예 (UI-q1tg §3.3)', () => {
  const NOW = 1_700_000_000_000;

  afterEach(() => {
    vi.restoreAllMocks();
  });

  /**
   * @param {Partial<import('./lanes.js').MiniItem>} item
   * @returns {HTMLElement}
   */
  function renderWaitingRow(item) {
    render(
      miniRow(
        /** @type {any} */ ({
          id: 'UI-g1',
          title: '대기 행',
          lane: 'queue',
          done: false,
          draggable: true,
          ...item
        }),
        {
          actions: queueRowOps(
            /** @type {any} */ ({
              id: 'UI-g1',
              draggable: true,
              ...item
            })
          )
        }
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.worker-mini'));
  }

  test('draws the grace chip in the slot 4a line', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);

    const row = renderWaitingRow({ added_at: NOW - 5_000 });

    expect(
      row.querySelector('.worker-deps--primary .worker-dep--grace')?.textContent
    ).toContain('⏳ 15초');
  });

  test('draws the start-now button in the slot 1 조작 group', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);

    const row = renderWaitingRow({ added_at: NOW - 5_000 });

    expect(
      row.querySelector('.worker-mini__line .worker-mini__rowops .op-btn')
        ?.textContent
    ).toContain('지금 시작');
  });

  test('keeps ✕ at the end of the 조작 group', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);

    const row = renderWaitingRow({ added_at: NOW - 5_000 });

    const glyphs = Array.from(
      row.querySelectorAll('.worker-mini__rowops button')
    ).map((button) => button.textContent?.trim());
    expect(glyphs).toEqual(['지금 시작', '✕']);
  });

  test('draws neither chip nor button once the grace has run out', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);

    const row = renderWaitingRow({ added_at: NOW - 20_000 });

    expect([
      row.querySelector('.worker-dep--grace'),
      row.querySelector('.worker-mini__start-now')
    ]).toEqual([null, null]);
  });

  test('draws neither chip nor button on a row with no added_at', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);

    const row = renderWaitingRow({});

    expect([
      row.querySelector('.worker-dep--grace'),
      row.querySelector('.worker-mini__start-now')
    ]).toEqual([null, null]);
  });

  test('sends the bead id with the start-now click target', () => {
    vi.spyOn(Date, 'now').mockReturnValue(NOW);

    const row = renderWaitingRow({ added_at: NOW - 1_000 });

    expect(
      row
        .querySelector('[data-action="queue-start-now"]')
        ?.getAttribute('data-bead-id')
    ).toBe('UI-g1');
  });
});
