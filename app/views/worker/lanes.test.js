import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  candidateCard,
  deploymentDisclosureTemplate,
  discardCompletionMessage,
  discardConfirmationMessage,
  discardPhaseLabel,
  discardProjection,
  discardReceiptTemplate,
  miniRow
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

describe('repo deployment disclosure', () => {
  test('renders one collapsed native disclosure with an explicit caret and context actions', () => {
    render(
      deploymentDisclosureTemplate({
        state: '확인 필요',
        repo: 'beads-ui',
        desired_sha: 'aaaaaaaa',
        description: '사용자 확인이 필요합니다',
        included_merge_count: 2,
        timeline: [{ kind: 'confirmation_required' }],
        recovery: { bead_id: 'UI-f17c', attempt_id: 'attempt-1' },
        log: { label: '배포 로그', reference: 'deployment-log' },
        actions: [
          {
            kind: 'view_session',
            label: '세션 보기',
            attempt_id: 'attempt-1'
          },
          {
            kind: 'continue_recovery',
            label: '복구 이어가기',
            attempt_id: 'attempt-1'
          }
        ]
      }),
      mount
    );

    const strip = /** @type {HTMLDetailsElement} */ (
      mount.querySelector('.worker-deployment-strip')
    );

    expect(strip.open).toBe(false);
    expect(strip.querySelector('summary')).not.toBeNull();
    expect(
      strip.querySelector('.worker-deployment-strip__caret')
    ).not.toBeNull();
    expect(strip.textContent).toContain('확인 필요');
    expect(strip.textContent?.replace(/\s+/g, ' ')).toContain('merge 2');
    expect(strip.textContent).toContain('세션 보기');
    expect(strip.textContent).toContain('복구 이어가기');
    expect(strip.textContent).not.toContain('지금 재시도');
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

describe('waiting row execution mode', () => {
  test('renders a selectable serial waiting row with an accessible grip', () => {
    const row = renderRow({
      lane: 'queue',
      done: false,
      draggable: true,
      selectable: true,
      selected: true,
      worker_serial: true
    });

    expect(row.classList.contains('worker-mini--selected')).toBe(true);
    expect(row.querySelector('.worker-mini__select')).not.toBeNull();
    expect(
      row.querySelector('.worker-mini__select')?.getAttribute('aria-label')
    ).toBe('UI-x1 선택');
    expect(row.querySelector('.worker-mini__serial')?.textContent).toContain(
      '머지까지 단독'
    );
    expect(
      row.querySelector('.worker-mini__grip')?.getAttribute('aria-label')
    ).toBe('UI-x1 순서 변경');
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
