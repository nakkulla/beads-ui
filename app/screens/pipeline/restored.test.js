import { afterEach, describe, expect, test, vi } from 'vitest';
import { formatUsageTotalWithCost } from '../../utils/token-usage.js';
import { NOW, mountPipeline, payloadsOf, settle } from './test-harness.js';

/** @type {Array<{ destroy: () => void }>} */
const mounted = [];

afterEach(() => {
  for (const entry of mounted.splice(0)) {
    entry.destroy();
  }
  vi.useRealTimers();
});

const REPO_A = '/fixture/repo-a';
const A4 = 'A-4-1700000000-1';

/**
 * @param {Parameters<typeof mountPipeline>[0]} [options]
 */
function mount(options = {}) {
  const handle = mountPipeline({ now: NOW, ...options });
  mounted.push(handle);
  return handle;
}

/**
 * @param {ParentNode} root
 * @param {string} selector
 * @returns {HTMLElement}
 */
function el(root, selector) {
  const found = root.querySelector(selector);
  if (!(found instanceof HTMLElement)) {
    throw new Error(`missing ${selector}`);
  }
  return found;
}

/**
 * @param {ParentNode} root
 * @returns {HTMLElement}
 */
function tileA4(root) {
  return el(root, `.pl-tile[data-bead-id="A-4"][data-root-dir="${REPO_A}"]`);
}

/**
 * Park repo-a's running A-4 with a long summary and a five-event history.
 *
 * @param {Record<string, any>} [history]
 * @returns {(fixture: any) => void}
 */
function parkA4(history = {}) {
  return (fixture) => {
    Object.assign(fixture.workspaces[0].attempts[A4], {
      status: 'parked',
      cause: 'awaiting_user',
      finished_at: NOW - 60_000,
      cause_detail: { summary: '가'.repeat(230) }
    });
    fixture.workspaces[0].bead_timelines = {
      'A-4': {
        events: [1, 2, 3, 4, 5].map((n) => ({
          event_id: `e${n}`,
          kind: 'attempt_event',
          summary: `이력 ${n}`,
          at: NOW - (6 - n) * 60_000
        })),
        log_path: '/logs/A-4.log',
        ...history
      }
    };
  };
}

describe('대기 팝업 문의 세션 꼬리 (UI-ri8n §3.3, UI-dbn6 P1-r2)', () => {
  test('appends the inquiry turn tail to the verdict popover line', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        fixture.workspaces[0].wait_reasons = [
          {
            kind: 'awaiting_user',
            subject: { bead_id: 'A-2', root_dir: REPO_A },
            headline: '질문 응답 대기',
            verdict: 'normal',
            targets: [],
            actions: []
          }
        ];
        fixture.workspaces[0].interactive_sessions = {
          'inq-1': {
            bead_id: 'A-2',
            kind: 'inquiry',
            state: 'live',
            tmux_session: 'bdui',
            tmux_window: '3',
            turn_state: 'running',
            turn_state_since: NOW - 120_000,
            launched_at: NOW - 300_000,
            settled_at: null
          }
        };
      }
    });

    const popover = el(
      root,
      `.pl-row[data-bead-id="A-2"][data-root-dir="${REPO_A}"] .pl-verdict .pl-pop`
    );

    expect(popover.textContent).toContain('문의 세션 bdui:3 · 작업 중 2분');
  });
});

describe('보류 타일 본문 (UI-5ym8 §6·§9, UI-dbn6 P1-r2)', () => {
  test('lists the parked tile history in its body', () => {
    const { mount: root } = mount({ edit: parkA4() });

    const rows = tileA4(root).querySelectorAll(':scope > .pl-history li');

    expect(rows).toHaveLength(5);
  });

  test('draws the parked tile log path with its copy button', () => {
    const { mount: root } = mount({ edit: parkA4() });

    const copy = el(tileA4(root), '.pl-held-log [data-op="copy-text"]');

    expect(copy.dataset.copy).toBe('/logs/A-4.log');
  });

  test('says 만료됨 for a parked log the retention removed', () => {
    const { mount: root } = mount({
      edit: parkA4({ log_path: undefined, log_expired: true })
    });

    const log = el(tileA4(root), '.pl-held-log');

    expect(log.textContent?.trim()).toBe('만료됨');
  });

  test('says 읽기 실패 for a parked log that could not be read', () => {
    const { mount: root } = mount({
      edit: parkA4({ log_path: undefined, log_unreadable: true })
    });

    const log = el(tileA4(root), '.pl-held-log');

    expect(log.textContent?.trim()).toBe('읽기 실패');
  });

  test('clamps the parked summary at 200 characters', () => {
    const { mount: root } = mount({ edit: parkA4() });

    const note = el(tileA4(root), '.pl-note');

    expect(note.textContent?.trim()).toBe(`${'가'.repeat(200)}…`);
  });

  test('draws the waiting tile recovery sentence without wait reasons', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        Object.assign(fixture.workspaces[0].attempts[A4], {
          status: 'waiting',
          cause: 'resume_refused',
          finished_at: NOW - 60_000,
          cause_detail: { recovery: { reason: 'credential' } }
        });
      }
    });

    const note = el(tileA4(root), '.pl-note');

    expect(note.textContent?.trim()).toBe(
      '인증 복구를 기다리며, 접근 권한이 확인되면 이어갈 수 있습니다.'
    );
  });
});

describe('위임 사용량 (UI-dbn6 P1-r2)', () => {
  test('falls back to the token total of a Claude delegation', () => {
    const usage = { input_tokens: 1200, output_tokens: 300 };
    const { mount: root } = mount({
      edit: (fixture) => {
        fixture.workspaces[0].attempts[A4].legs = [
          {
            label: 'general-purpose · claude · sonnet',
            state: 'live',
            runtime: 'claude',
            model: 'sonnet',
            usage
          }
        ];
      }
    });

    const leg = el(tileA4(root), '.pl-chip--leg.is-live');

    expect(leg.textContent).toContain(
      /** @type {string} */ (
        formatUsageTotalWithCost({
          input_tokens: 1200,
          output_tokens: 300
        })
      )
    );
  });
});

describe('레인 표시 복원 (UI-dbn6 P1-r2)', () => {
  test('warns about a blocks cycle on a serial lane', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        fixture.workspaces[0].lane_states = { s1: { cycle: true } };
      }
    });

    const note = el(root, '[data-lane-body="queue"] .pl-cycle');

    expect(note.textContent?.trim()).toBe(
      '⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다'
    );
  });

  test('counts search matches on each lane head while searching', () => {
    const { mount: root } = mount({ scope: REPO_A });
    const search = /** @type {HTMLInputElement} */ (
      el(root, '[data-op="search"]')
    );

    search.value = '대기';
    search.dispatchEvent(new Event('input', { bubbles: true }));

    const match = el(
      root,
      '.pl-lane[data-lane="queue"] .pl-lane__match'
    ).textContent?.trim();
    expect(match).toBe('일치 3');
  });

  test('marks a saturated parallel slot count with ⚠', () => {
    const { mount: root } = mount({
      scope: REPO_A,
      edit: (fixture) => {
        fixture.workspaces_state[0].slots = 1;
      }
    });

    const slots = el(root, '[data-lane-body="queue"] .pl-area__sub');

    expect(slots.textContent?.replace(/\s+/g, ' ').trim()).toBe('슬롯 1/1 ⚠');
  });
});

describe('완료 행·저장소 작업 줄 (UI-d7pw §4, UI-q0uy §4.1, UI-dbn6 P1-r2)', () => {
  test('draws the 생성 · 수정 times on a done row', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        fixture.workspaces[0].bead_times = {
          'A-6': {
            created_at: NOW - 86_400_000,
            updated_at: NOW - 3_600_000
          }
        };
      }
    });
    el(root, '[data-op="lane-toggle"][data-lane="done"]').click();

    const times = el(
      root,
      `[data-lane-body="done"] .pl-row[data-bead-id="A-6"] .pl-times`
    );

    expect(times.textContent?.replace(/\s+/g, ' ').trim()).toMatch(
      /^생성 .+ · 수정 .+$/
    );
  });

  test('says ✓ 최신 with the deploy clock on the repo-ops strip', () => {
    const { mount: root } = mount({
      scope: REPO_A,
      edit: (fixture) => {
        fixture.workspaces[0].repo_operations = [
          {
            operation_id: 'deploy-1',
            kind: 'deploy',
            state: 'succeeded',
            target_sha: 'abcdef0123456789',
            finished_at: NOW - 600_000,
            elapsed_ms: 72_000
          }
        ];
      }
    });

    const strip = el(root, '.pl-opsline');

    expect(strip.textContent?.replace(/\s+/g, ' ')).toMatch(
      /배포 abcdef0 ✓ 최신 \d\d:\d\d · 1분 12초/
    );
  });
});

describe('기존 조작 특성 (UI-dbn6 P1-r2 item 10)', () => {
  test('opens the discovered-from origin in the card repo', () => {
    const { mount: root, openIssue } = mount({
      edit: (fixture) => {
        fixture.workspaces[0].bead_overlay['A-5'].from_id = 'A-3';
      }
    });

    el(root, '[data-op="open-issue"][title="출처 A-3 열기"]').click();

    expect(openIssue).toHaveBeenCalledWith('A-3', REPO_A);
  });

  test('opens the creation source in its own repo', () => {
    const { mount: root, openIssue } = mount({
      edit: (fixture) => {
        fixture.workspaces[0].bead_overlay['A-10'] = {
          worker_created_from: 'dotfiles-hwmfv',
          worker_created_from_root_dir: '/fixture/repo-h'
        };
      }
    });

    el(
      root,
      '[data-op="open-issue"][title="생성 원본 dotfiles-hwmfv 열기"]'
    ).click();

    expect(openIssue).toHaveBeenCalledWith('dotfiles-hwmfv', '/fixture/repo-h');
  });

  test('removes a queued row dropped onto the 후보 lane', async () => {
    /** @type {{ current: Element|null }} */
    const hit = { current: null };
    const { mount: root, send } = mount({ hitTest: () => hit.current });
    const source = el(
      root,
      `.pl-row[data-bead-id="A-3"][data-root-dir="${REPO_A}"]`
    );
    const init = {
      bubbles: true,
      pointerId: 7,
      pointerType: 'mouse',
      button: 0
    };
    source.dispatchEvent(
      new PointerEvent('pointerdown', { ...init, clientX: 10, clientY: 10 })
    );
    hit.current = el(root, '[data-drop="candidate"]');

    source.dispatchEvent(
      new PointerEvent('pointermove', { ...init, clientX: 10, clientY: 60 })
    );
    source.dispatchEvent(
      new PointerEvent('pointerup', { ...init, clientX: 10, clientY: 60 })
    );
    await settle();

    expect(payloadsOf(send, 'worker-queue-remove')).toEqual([
      { bead_id: 'A-3', root_dir: REPO_A, expected_revision: 10 }
    ]);
  });

  test('offers the failed attempt id for copying', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        Object.assign(fixture.workspaces[0].attempts[A4], {
          status: 'failed',
          cause: 'session_failed:exit_1',
          finished_at: NOW - 60_000
        });
      }
    });
    el(tileA4(root), '[data-op="failure-detail"]').click();

    const copy = el(tileA4(root), '.pl-pop--failure [data-op="copy-text"]');

    expect(copy.dataset.copy).toBe(A4);
  });

  test('offers a needs_human PR row log path for copying', () => {
    const { mount: root } = mount({
      edit: (fixture) => {
        fixture.workspaces[0].completion_status = {
          'A-5': { phase: 'needs_human', log_path: '/logs/A-5-complete.log' }
        };
      }
    });

    const copy = el(
      root,
      `[data-lane-body="pr_wait"] .pl-row[data-bead-id="A-5"] .pl-fact--path [data-op="copy-text"]`
    );

    expect(copy.dataset.copy).toBe('/logs/A-5-complete.log');
  });
});
