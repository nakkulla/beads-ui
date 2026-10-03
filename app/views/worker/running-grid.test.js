import { render } from 'lit-html';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  formatAttemptOrchestrationChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import { formatClockLocal } from '../../utils/relative-time.js';
import {
  runningGridTemplate,
  runningTile,
  runningTileInput
} from './running-grid.js';

describe('worker failed running tile template', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test.each([false, true])(
    'places interactive sessions in the identity slot of held=%s tiles',
    (held) => {
      const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
      const tile = {
        bead_id: 'UI-1',
        attempt_id: 'attempt-1',
        title: 'work',
        runner: 'claude',
        model: 'opus',
        started_at: 1,
        parked: held,
        interactive_sessions: [
          {
            key: 'UI-1:resolve',
            kind: 'resolve',
            provider: 'claude',
            session_id: 'sid',
            mode: 'fork',
            source: 'attempt',
            attempt_id: 'attempt-1',
            fallback_reason: null,
            tmux_session: 'bdui-inquiry',
            tmux_window: 'resolve-UI-1',
            state: 'exiting',
            settled_at: 2,
            launched_at: 1,
            discord_url: null,
            closing: true
          }
        ]
      };

      render(
        runningTile(
          /** @type {import('./running-grid.js').RunningTile} */ (tile),
          1000
        ),
        mount
      );

      expect(
        mount
          .querySelector('.rtile__hd > .interactive-session-badge')
          ?.textContent?.trim()
      ).toBe('▤ 대화 세션 · bdui-inquiry:resolve-UI-1');
      expect(
        mount.querySelector('.rtile__hd-actions .interactive-session-closing')
          ?.textContent
      ).toBe('세션 닫는 중');
    }
  );

  test('labels an external resume interactive session as 대화 세션', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const tile = {
      bead_id: 'UI-1',
      attempt_id: 'attempt-1',
      title: 'work',
      runner: 'claude',
      model: 'opus',
      started_at: 1,
      interactive_sessions: [
        {
          key: 'UI-1:external_resume',
          kind: 'external_resume',
          provider: 'claude',
          session_id: 'sid',
          mode: 'resume',
          source: 'session_ref',
          attempt_id: null,
          fallback_reason: null,
          tmux_session: 'dev',
          tmux_window: 'UI-1',
          state: 'live',
          settled_at: null,
          launched_at: 1,
          discord_url: null,
          closing: false
        }
      ]
    };

    render(
      runningTile(
        /** @type {import('./running-grid.js').RunningTile} */ (tile),
        1000
      ),
      mount
    );

    expect(
      mount
        .querySelector('.rtile__hd > .interactive-session-badge')
        ?.textContent?.trim()
    ).toBe('▤ 대화 세션 · dev:UI-1');
  });

  test('renders the categorized cause badge without dismiss', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-1',
          attempt_id: 'attempt-1',
          title: 'failed work',
          runner: 'claude',
          model: 'opus',
          started_at: null,
          failed: true,
          status: 'failed',
          status_label: '실패',
          failure: {
            cause: 'quickfix_landing_failed:head_mismatch',
            cause_detail: null,
            finished_at: 4000,
            runner: 'claude',
            model: 'opus',
            effort: 'high',
            observed_effort: null,
            speed: 'default',
            attempt_id: 'attempt-1',
            usage: null,
            halted_auto_advance: false,
            quickfix_lane: true,
            quickfix_landing: { cursor: null },
            resume_eligible: false,
            resume_reason: 'session_id 없는 구 attempt — 이어하기 불가',
            landed: false,
            confirmation: 'unmerged'
          },
          discard: {
            action: true,
            enabled: true,
            label: '폐기',
            title: '복구 archive 생성 후 폐기',
            operation: null
          }
        }
      ]),
      mount
    );

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    const resume = /** @type {HTMLButtonElement} */ (
      tile.querySelector('.rtile__resume')
    );

    expect(tile.classList.contains('rtile--failed')).toBe(true);
    expect(tile.classList.contains('rtile--compact')).toBe(true);
    expect(tile.querySelector('.rtile__elapsed')?.textContent).toBe('실패');
    expect(tile.querySelector('.rtile__failure-badge')?.textContent).toContain(
      '⛔ 착지 실패'
    );
    expect(resume.disabled).toBe(true);
    expect(resume.title).toBe('session_id 없는 구 attempt — 이어하기 불가');
    expect(tile.querySelector('.rtile__dismiss')).toBeNull();
    expect(tile.querySelector('.rtile__session')).toBeNull();
    expect(tile.querySelector('.rtile__pause')).toBeNull();
    expect(tile.querySelector('.rtile__stop')).toBeNull();
    expect(tile.querySelector('.rtile__discard')).not.toBeNull();
    expect(tile.querySelector('.rtile__accent')).toBeNull();
  });

  test('renders auto-advance-off only when the attempt halted it', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-2',
          attempt_id: 'attempt-2',
          title: 'orphaned work',
          runner: null,
          model: null,
          started_at: null,
          failed: true,
          status: 'orphaned',
          status_label: '중단됨',
          failure: {
            cause: 'runner_exit',
            cause_detail: null,
            finished_at: null,
            runner: null,
            model: null,
            effort: null,
            observed_effort: null,
            speed: null,
            attempt_id: 'attempt-2',
            usage: null,
            halted_auto_advance: true,
            quickfix_lane: false,
            quickfix_landing: null,
            resume_eligible: true,
            resume_reason: null,
            landed: false,
            confirmation: 'unmerged'
          }
        }
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__elapsed')?.textContent).toBe('중단됨');
    expect(mount.querySelector('.rtile__auto-halted')?.textContent).toContain(
      '자동 진행 꺼짐'
    );
  });

  test('omits auto-advance-off when the attempt did not halt it', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        tileInput({
          failed: true,
          status: 'failed',
          failure: failureInput({ halted_auto_advance: false })
        })
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__auto-halted')).toBeNull();
  });

  test.each(['repo_operations', 'branch_cleanup', 'parent_close'])(
    'hides discard after the landed cursor %s',
    (cursor) => {
      const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

      render(
        runningTile(
          tileInput({
            failed: true,
            failure: failureInput({
              landed: true,
              quickfix_lane: true,
              quickfix_landing: { cursor }
            }),
            discard: discardInput()
          }),
          5000
        ),
        mount
      );

      expect(mount.querySelector('.rtile__discard')).toBeNull();
    }
  );

  test.each([null, 'base_containment'])(
    'keeps discard before landing at cursor %s',
    (cursor) => {
      const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

      render(
        runningTile(
          tileInput({
            failed: true,
            failure: failureInput({
              landed: false,
              quickfix_lane: true,
              quickfix_landing: { cursor }
            }),
            discard: discardInput()
          }),
          5000
        ),
        mount
      );

      expect(mount.querySelector('.rtile__discard')).not.toBeNull();
    }
  );

  test('carries the projected discard confirmation on the button', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({
          failed: true,
          failure: failureInput({ confirmation: 'merged' }),
          discard: discardInput()
        }),
        5000
      ),
      mount
    );

    expect(
      mount.querySelector('.rtile__discard')?.getAttribute('data-confirmation')
    ).toBe('merged');
  });

  test('keeps compact failures to identity and title rows', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({
          failed: true,
          failure: failureInput(),
          usage: { input_tokens: 1 }
        }),
        5000,
        null,
        {
          monitor: /** @type {any} */ ({
            last_activity: { at: 1, text: 'running' },
            dependency_chips: { scope_missing: true }
          })
        }
      ),
      mount
    );

    expect(mount.querySelector('.rtile__meta')).toBeNull();
    expect(mount.querySelector('.worker-deps')).toBeNull();
    expect(mount.querySelector('.rtile__activity')).toBeNull();
  });

  test('renders the open failure popover as a direct tile child', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({
          failed: true,
          failure: failureInput({ open: true })
        }),
        5000
      ),
      mount
    );

    const popover = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__failure-pop')
    );
    expect(popover.parentElement?.classList.contains('rtile')).toBe(true);
  });

  /**
   * Render one failure popover and return its text.
   *
   * @param {Partial<import('./running-grid.js').FailureTile>} patch
   * @returns {string}
   */
  function failurePopoverText(patch) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({
          failed: true,
          failure: failureInput({ open: true, ...patch })
        }),
        5000
      ),
      mount
    );

    return mount.querySelector('.rtile__failure-pop')?.textContent || '';
  }

  test('points a resumable settlement failure at the cleanup retry button', () => {
    const text = failurePopoverText({
      cause: 'verify_script_failure',
      quickfix_lane: true,
      quickfix_landing: { reason: 'containment_unobservable' }
    });

    expect(text).toContain('실패한 명령과 그 출력을 확인하고');
    expect(text).toContain('아래 [정리 재시도]를 눌러');
  });

  test('points a resumable session failure at the continuation button', () => {
    const text = failurePopoverText({
      cause: 'base_fetch_failed',
      quickfix_lane: true,
      quickfix_landing: { reason: 'head_mismatch' }
    });

    expect(text).toContain('원격 연결과 관측 상태를 확인하는 것이 먼저입니다.');
    expect(text).toContain('아래 [이어하기]로 같은 세션에서');
  });

  test('replaces continuation guidance with the route refusal sentence', () => {
    const sentence =
      '승인된 작업 방식이 quick_fix에서 spec_backed로 바뀌어 이전 세션을 이어갈 수 없습니다. [폐기] 뒤 후보에서 대기열에 다시 배치하면 현재 방식으로 새로 시작됩니다.';

    const text = failurePopoverText({
      cause: 'base_fetch_failed',
      resume_refused_sentence: sentence
    });

    expect(text).toContain(sentence);
    expect(text).not.toContain('아래 [이어하기]로 같은 세션에서');
    expect(
      document.querySelector('.rtile__resume')?.hasAttribute('disabled')
    ).toBe(false);
  });

  test('sends a refused resume to the session record instead of a button', () => {
    const text = failurePopoverText({
      cause: 'cleanup_failed',
      resume_eligible: false,
      resume_reason: '워크트리 없음'
    });

    expect(text).toContain('워크트리 없음');
    expect(text).toContain('세션 기록을 열어 원인을 확인하세요.');
    expect(text).not.toContain('[정리 재시도]');
  });

  test('names no button when neither resume nor a session record exists', () => {
    const text = failurePopoverText({
      cause: 'cleanup_failed',
      attempt_id: undefined,
      resume_eligible: false,
      resume_reason: '기록 없음'
    });

    expect(text).toContain('기록 없음');
    expect(text).not.toContain('세션 기록을 열어');
    expect(text).not.toContain('[이어하기]');
  });

  test('omits the next row for an unmapped failure code', () => {
    const text = failurePopoverText({ cause: 'surprise_new_token' });

    expect(text).not.toContain('다음');
  });

  test('says the resume row and the landed line with the button name', () => {
    const text = failurePopoverText({
      cause: 'verify_red',
      landed: true,
      quickfix_lane: true,
      quickfix_landing: { reason: 'containment_unobservable' }
    });

    expect(text).toContain('정리 재시도 가능');
    expect(text).toContain(
      '이미 base에 착지됨 — 정리 재시도로 배포·정리를 재개'
    );
  });

  test('keeps a running tile on its execution expression without a route tint', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({
          workflow: /** @type {any} */ ({
            chips: { route: 'spec_backed', route_source: 'explicit' }
          })
        }),
        5000
      ),
      mount
    );

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    expect(tile.getAttribute('data-route')).toBe('spec_backed');
    expect(tile.classList.contains('rtile--route-bg')).toBe(false);
  });

  test('leaves a failed tile on its own state expression', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({
          failed: true,
          failure: failureInput(),
          workflow: /** @type {any} */ ({
            chips: { route: 'quick_fix', route_source: 'explicit' }
          })
        }),
        5000
      ),
      mount
    );

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    expect(tile.classList.contains('rtile--failed')).toBe(true);
    expect(tile.classList.contains('rtile--route-bg')).toBe(false);
  });

  test('draws no route attribute on a tile with no workflow', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningTile(tileInput({}), 5000), mount);

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    expect(tile.hasAttribute('data-route')).toBe(false);
  });

  test('renders the recorded attempt tuple as the orchestration chip', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const attempt = {
      runner: 'codex',
      model: 'sol',
      effort: 'ultra',
      speed: 'fast'
    };

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-3',
          attempt_id: 'attempt-3',
          title: 'continued work',
          runner: 'codex',
          model: 'sol',
          effort: 'ultra',
          speed: 'fast',
          started_at: null,
          resumed_from: 'attempt-2',
          continuation_mode: 'fresh',
          exec_chips: {
            orchestration: formatAttemptOrchestrationChip(attempt),
            worker: null
          }
        }
      ]),
      mount
    );

    expect(
      mount.querySelector('.exec-chip--orch .exec-chip__v')?.textContent
    ).toBe('codex · sol · ultra · Fast');
    expect(mount.querySelector('.rtile__runner')).toBeNull();
    expect(mount.querySelector('.rtile__resumed')?.getAttribute('title')).toBe(
      '새 session으로 이어받음 (from attempt-2)'
    );
  });

  test('renders the worker chip next to the orchestration chip', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const rows = {
      impl_dispatch: {
        value: 'session',
        source: 'base',
        display: 'session',
        full_value: 'session',
        resolution: 'default'
      },
      impl_runtime: {
        value: 'inherit',
        source: 'base',
        display: 'inherit',
        full_value: 'inherit',
        resolution: 'default'
      },
      impl_model: {
        value: 'auto',
        source: 'base',
        display: 'auto (실행 시 결정)',
        full_value: null,
        resolution: 'dynamic'
      },
      impl_effort: {
        value: 'auto',
        source: 'base',
        display: 'auto (실행 시 결정)',
        full_value: null,
        resolution: 'dynamic'
      },
      impl_speed: {
        value: 'default',
        source: 'base',
        display: 'default',
        full_value: 'default',
        resolution: 'default'
      }
    };

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-4',
          attempt_id: 'attempt-4',
          title: 'delegating work',
          runner: 'claude',
          model: 'opus',
          started_at: null,
          exec_chips: {
            orchestration: formatAttemptOrchestrationChip({
              runner: 'claude',
              model: 'opus'
            }),
            worker: formatWorkerChip(/** @type {any} */ (rows), 'claude')
          }
        }
      ]),
      mount
    );

    expect(
      mount.querySelector('.exec-chip--worker .exec-chip__v')?.textContent
    ).toBe('inherit→claude · auto · auto');
  });

  test('omits the meta row when the tile carries no chips at all', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-5',
          attempt_id: 'attempt-5',
          title: 'bare work',
          runner: null,
          model: null,
          started_at: null,
          exec_chips: null
        }
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__meta')).toBeNull();
    expect(mount.querySelectorAll('.exec-chip')).toHaveLength(0);
  });

  test('draws the meta row for a worker-only chip', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-6',
          attempt_id: 'attempt-6',
          title: 'legacy attempt',
          runner: null,
          model: null,
          started_at: null,
          exec_chips: {
            orchestration: null,
            worker: { text: '메인', title: '워커 툴팁' }
          }
        }
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__meta')).not.toBeNull();
    expect(mount.querySelector('.exec-chip--orch')).toBeNull();
    expect(
      mount.querySelector('.exec-chip--worker .exec-chip__v')?.textContent
    ).toBe('메인');
  });

  test('draws no child rollup for a tile that still carries one', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        /** @type {any} */ ({
          bead_id: 'UI-7',
          attempt_id: 'attempt-7',
          title: 'parent work',
          runner: 'claude',
          model: 'opus',
          started_at: null,
          rollup_expanded: true,
          rollup: {
            total: 3,
            count: 1,
            current: { id: 'UI-7.2', title: 'T2: 서버 배선' },
            children: [
              { id: 'UI-7.1', title: 'T1', status: 'closed' },
              { id: 'UI-7.2', title: 'T2: 서버 배선', status: 'in_progress' },
              { id: 'UI-7.3', title: 'T3', status: 'open' }
            ]
          }
        })
      ]),
      mount
    );

    expect(mount.querySelector('.worker-card__roll')).toBeNull();
  });

  test('renders a landing progress line only on the tile carrying its projection', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'QF-1',
          attempt_id: 'attempt-qf',
          title: 'landing quick fix',
          runner: 'codex',
          model: 'sol',
          started_at: null,
          landing: {
            step: 'deploy',
            label: '배포 중',
            index: 4,
            total: 7,
            percent: 57,
            active: true,
            failed: false
          }
        },
        {
          bead_id: 'UI-plain',
          attempt_id: 'attempt-plain',
          title: 'ordinary work',
          runner: 'codex',
          model: 'sol',
          started_at: null
        }
      ]),
      mount
    );

    const landing_tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="QF-1"]')
    );
    const plain_tile = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile[data-bead-id="UI-plain"]')
    );

    expect(
      landing_tile.querySelector('.rtile__landing')?.textContent
    ).toContain('배포 중');
    expect(landing_tile.querySelector('.merge-step__n')?.textContent).toBe(
      '4/7'
    );
    expect(plain_tile.querySelector('.rtile__landing')).toBeNull();
  });

  test('renders no failure banner template', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        tileInput({ failed: true, failure: failureInput() })
      ]),
      mount
    );

    expect(mount.querySelector('.worker-banner--failure')).toBeNull();
  });
});

/**
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
 * @param {Partial<import('./running-grid.js').RunningTile>} [patch]
 * @returns {any}
 */
function tileInput(patch = {}) {
  return {
    bead_id: 'UI-t1',
    attempt_id: 'a1',
    title: '실행 중',
    runner: 'claude',
    model: 'opus',
    started_at: 1000,
    can_pause: true,
    ...patch
  };
}

/**
 * @param {Partial<import('./running-grid.js').FailureTile>} [patch]
 * @returns {import('./running-grid.js').FailureTile}
 */
function failureInput(patch = {}) {
  return {
    cause: 'quickfix_landing_failed:head_mismatch',
    cause_detail: null,
    finished_at: 4000,
    runner: 'claude',
    model: 'opus',
    effort: 'high',
    observed_effort: null,
    speed: 'default',
    attempt_id: 'a1',
    usage: null,
    halted_auto_advance: false,
    quickfix_lane: false,
    quickfix_landing: null,
    resume_eligible: true,
    resume_reason: null,
    landed: false,
    confirmation: 'unmerged',
    ...patch
  };
}

/**
 * @returns {Record<string, any>}
 */
function discardInput() {
  return {
    action: true,
    enabled: true,
    label: '폐기',
    title: '복구 archive 생성 후 폐기',
    operation: null
  };
}

describe('running tile is unchanged without the monitor overlay (UI-eey2 §7)', () => {
  /**
   * @param {Record<string, any>} [patch]
   * @returns {any}
   */
  function externalWait(patch = {}) {
    return {
      wait_id: 'w-0123456789ab',
      root_dir: '/repo',
      bead_id: 'A-1',
      owner_kind: 'worker',
      stage: 'detached',
      budget: { turns_total: 3, turns_used: 3 },
      registered_at: '2026-09-21T00:00:00Z',
      next_observation_at: '2026-09-21T03:14:00Z',
      error_count: 0,
      last_error: null,
      jobs: [
        {
          adapter: 'slurm',
          ssh_host: 'wallace',
          job_id: '42',
          submitted_at: '2026-09-21T00:00:00Z',
          log_path: '/logs/job.log',
          state: 'RUNNING',
          observed_at: '2026-09-21T03:12:00Z',
          terminal: null
        }
      ],
      completion: null,
      resume: null,
      ...patch
    };
  }

  test('renders external wait identity and coordinates on a running consumer', () => {
    const tile = shape(
      runningTile(
        tileInput({
          external_wait: externalWait(),
          wait_reasons: /** @type {any} */ ([
            {
              kind: 'external_job',
              headline: 'wallace 작업 42 · RUNNING',
              release: '완료되면 같은 세션을 이어간다',
              verdict: 'normal',
              actions: [],
              targets: []
            }
          ])
        }),
        Date.parse('2026-09-21T03:12:00Z'),
        null
      )
    );

    expect(tile).toContain('⏳ 외부 작업');
    expect(tile).not.toContain('ssh wallace');
    expect(tile).toContain('3h12m');
    expect(tile).not.toContain('wait-reason__release');
  });

  test('renders no repo badge, stepper, activity or delegation line', () => {
    const tile = shape(runningTile(tileInput(), 5000, null));

    expect(tile).not.toContain('rtile__repo');
    expect(tile).not.toContain('rtile__activity');
    expect(tile).not.toContain('rtile__legs');
    expect(tile).not.toContain('stepper');
    expect(tile).toMatchInlineSnapshot(
      `"<div class="rtile" data-attempt-id="a1" data-bead-id="UI-t1"> <div class="rtile__hd"> <span aria-hidden="true" class="rtile__dot"></span>  <span class="rtile__id" title="클릭하면 ID 복사">UI-t1</span>  <div class="rtile__hd-actions">  <span class="rtile__elapsed" data-ts-fmt="clock" data-ts="1000">4s</span> <button aria-label="라이브 세션 열기" class="op-btn rtile__session" title="라이브 세션 열기" type="button"> ▤ 세션 </button> <button aria-label="일시정지" class="op-btn rtile__pause" title="일시정지 (같은 세션으로 재개 가능)" type="button"> ⏸ </button> <button aria-label="Worker에서 내리기 — 작업은 보존" class="op-btn op-btn--icon op-btn--ghost rtile__withdraw" title="Worker에서 내리기 — 작업은 보존" type="button"> ✕ </button> </div> </div> <div class="rtile__title">실행 중</div>        <div aria-hidden="true" class="rtile__accent"></div>  </div>"`
    );
  });

  test('renders the same DOM whether the options object is omitted or empty', () => {
    expect(shape(runningTile(tileInput(), 5000, null, {}))).toBe(
      shape(runningTile(tileInput(), 5000, null))
    );
  });

  test('renders the same DOM through the grid as through the tile', () => {
    expect(shape(runningGridTemplate([tileInput()], 5000, null))).toContain(
      shape(runningTile(tileInput(), 5000, null))
    );
  });
});

describe('running tile with the monitor overlay (UI-eey2 §7)', () => {
  const monitor = {
    repo: 'repo-a',
    root_dir: '/tmp/repo-a',
    workflow: {
      route: /** @type {const} */ ('spec_backed'),
      stages: {
        spec: { fill: /** @type {const} */ ('full') },
        impl: {},
        pr: {},
        merge: {}
      }
    },
    last_activity: { at: 4000, kind: 'tool', text: '⚡ npm test — 통과 41' },
    legs: [
      { label: '구현 unit 3 · codex', state: /** @type {const} */ ('live') },
      { label: 'review-consult · codex', state: /** @type {const} */ ('done') }
    ],
    dependency_chips: {
      overlaps: [
        {
          id: 'UI-o1',
          title: '겹침 상대',
          location_label: 'repo-b · 병렬 #1',
          prefixes: ['app/']
        }
      ]
    }
  };

  test('puts repo identity in the header and dispatch origin in coordinates', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({ lane_origin: { kind: 'serial', index: 1 } }),
        5000,
        null,
        {
          monitor: /** @type {any} */ (monitor)
        }
      ),
      mount
    );
    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));

    expect(tile.querySelector('.rtile__hd .rtile__repo')?.textContent).toBe(
      'repo-a'
    );
    expect(
      tile.querySelector('.worker-chips--coords .ctl-chip--lane')?.textContent
    ).toBe('직렬 1');
    expect(tile.querySelector('.rtile__meta .rtile__repo')).toBeNull();
    expect(tile.querySelector('.rtile__hd .ctl-chip--lane')).toBeNull();
  });

  test('draws blocked, 겹침 and scope 없음 chips on the tile (UI-anna §5.3)', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ ({
          ...monitor,
          dependency_chips: {
            ...monitor.dependency_chips,
            predecessors: [{ id: 'UI-p1', label: '⛓ UI-p1' }],
            scope_missing: true
          }
        })
      }),
      mount
    );
    const deps = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));

    expect(deps.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ UI-p1'
    );
    expect(deps.querySelector('.worker-dep--overlap')?.textContent).toContain(
      'UI-o1'
    );
    expect(deps.querySelector('.worker-dep--muted')?.textContent).toContain(
      'scope 없음'
    );
  });

  test('draws a display-only blocked chip when the chip is not openable', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ ({
          ...monitor,
          dependency_chips: {
            predecessors: [{ id: 'UI-p1', label: '⛓ UI-p1' }]
          }
        })
      }),
      mount
    );

    expect(mount.querySelector('.rtile .worker-dep__open')).toBeNull();
  });

  test('draws an open button on an openable blocked chip', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ ({
          ...monitor,
          dependency_chips: {
            predecessors: [{ id: 'UI-p1', label: '⛓ UI-p1', openable: true }]
          }
        })
      }),
      mount
    );

    expect(
      mount
        .querySelector('.rtile .worker-dep__open')
        ?.getAttribute('data-dep-id')
    ).toBe('UI-p1');
  });

  test('adds the last activity and its age without a stepper', () => {
    const tile = shape(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ (monitor)
      })
    );

    expect(tile).toContain('⚡ npm test — 통과 41');
    expect(tile).toContain('rtile__activity-age');
    expect(tile).not.toContain('class="stp"');
  });

  test('spells out live delegations and folds finished ones into one chip', () => {
    const tile = shape(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ (monitor)
      })
    );

    expect(tile).toContain('위임 중 · 구현 unit 3 · codex');
    expect(tile).toContain('위임 완료 1');
    expect(tile).toContain('완료된 위임: review-consult · codex');
  });

  test('hides the codex-runner forwarder leg behind its codex session', () => {
    const tile = shape(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ ({
          ...monitor,
          legs: [
            {
              label: 'codex-runner · claude',
              agent_type: 'codex-runner',
              state: 'live'
            },
            { label: 'review-consult · codex', state: 'live' },
            {
              label: 'codex-runner · claude',
              agent_type: 'codex-runner',
              state: 'done'
            },
            { label: 'review-consult · codex', state: 'done' }
          ]
        })
      })
    );

    expect(tile).not.toContain('codex-runner');
    expect(tile).toContain('위임 중 · review-consult · codex');
    expect(tile).toContain('위임 완료 1');
  });

  test('adds the overlap chip', () => {
    const tile = shape(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ (monitor)
      })
    );

    expect(tile).toContain('⧉ UI-o1');
  });

  test('omits every line the overlay has no material for', () => {
    const tile = shape(
      runningTile(tileInput(), 5000, null, { monitor: { repo: 'repo-a' } })
    );

    expect(tile).toContain('rtile__repo');
    expect(tile).not.toContain('rtile__activity');
    expect(tile).not.toContain('rtile__legs');
    expect(tile).not.toContain('worker-deps');
  });

  test('greys the activity dot on a paused attempt', () => {
    const tile = shape(
      runningTile(tileInput({ paused: true }), 5000, null, {
        monitor: /** @type {any} */ (monitor)
      })
    );

    expect(tile).toContain('rtile__activity is-paused');
  });
});

describe('session tile (UI-yrzu §6)', () => {
  const WORKFLOW = {
    route: /** @type {const} */ ('spec_backed'),
    chips: { route: 'spec_backed', route_source: 'explicit' },
    stages: {
      spec: { fill: /** @type {const} */ ('full') },
      impl: {},
      pr: {},
      merge: {}
    }
  };

  /**
   * @param {Partial<import('./running-grid.js').RunningTile>} [patch]
   * @param {any} [monitor]
   * @returns {HTMLElement}
   */
  function renderSession(patch = {}, monitor = { repo: 'repo-a' }) {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        tileInput({
          kind: 'session',
          attempt_id: '',
          started_at: 1000,
          updated_at: 3000,
          ...patch
        }),
        5000,
        null,
        { monitor }
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  test('marks the tile and its dot as session-owned', () => {
    const tile = renderSession();

    expect(tile.classList.contains('rtile--session')).toBe(true);
    expect(
      tile
        .querySelector('.rtile__dot')
        ?.classList.contains('rtile__dot--session')
    ).toBe(true);
  });

  test('names the tile a session with the ownership tooltip', () => {
    const badge = renderSession().querySelector('.rtile__session-badge');

    expect(badge?.textContent).toBe('직접 세션');
    expect(badge?.getAttribute('title')).toBe(
      'Worker가 아닌 세션이 in_progress로 잡은 이슈'
    );
  });

  test('tells an unclaimed open session tile that no claim exists yet', () => {
    const tile = renderSession({ status: 'open' });

    const badge = tile.querySelector('.rtile__session-badge');

    expect(badge?.textContent).toBe('직접 세션');
    expect(badge?.getAttribute('title')).toBe(
      'Worker가 아닌 세션이 맡은 이슈 · 아직 in_progress 클레임 전'
    );
  });

  test('renders no worker operation control and no session drawer', () => {
    const tile = renderSession();

    expect(tile.querySelector('.rtile__session')).toBeNull();
    expect(tile.querySelector('.rtile__pause')).toBeNull();
    expect(tile.querySelector('.rtile__resume')).toBeNull();
    expect(tile.querySelector('.rtile__discard')).toBeNull();
    expect(tile.querySelector('.rtile__dismiss')).toBeNull();
  });

  test('draws the route chip in the meta row, not the header', () => {
    const tile = renderSession({ workflow: /** @type {any} */ (WORKFLOW) });

    expect(tile.querySelector('.rtile__hd .ctl-chip--route')).toBeNull();
    expect(
      tile.querySelector('.rtile__meta .ctl-chip--route')?.textContent
    ).toBe('spec_backed');
  });

  test('keeps the elapsed clock while a start time is known', () => {
    const tile = renderSession();

    expect(tile.querySelector('.rtile__elapsed')?.textContent).toBe('4s');
  });

  test('omits the elapsed clock when no start time survived parsing', () => {
    const tile = renderSession({ started_at: null });

    expect(tile.querySelector('.rtile__elapsed')).toBeNull();
  });

  test('reports the last bead update as the activity line', () => {
    const tile = renderSession({ updated_at: 5000 - 120_000 });

    expect(tile.querySelector('.rtile__activity-text')?.textContent).toBe(
      '갱신 2분 전'
    );
    expect(
      tile
        .querySelector('.rtile__activity')
        ?.classList.contains('rtile__activity--session')
    ).toBe(true);
  });

  test('omits the activity line when no update time survived parsing', () => {
    const tile = renderSession({ updated_at: undefined });

    expect(tile.querySelector('.rtile__activity')).toBeNull();
  });

  // 스펙 §6은 세션 타일의 stepper 줄을 "Worker 타일과 동일"로 정의한다. 그
  // 뒤 실행중 타일에서 stepper가 통째로 빠졌으므로(모니터 실행중 타일 stepper
  // 제거), 세션 타일도 그리지 않는 것이 그 "동일"이다.
  test('draws no stepper, matching the worker tile it mirrors', () => {
    const tile = renderSession({ workflow: /** @type {any} */ (WORKFLOW) });

    expect(tile.querySelector('.stp')).toBeNull();
  });

  test('draws the exec_receipt chip without its sha and keeps the full value in the tooltip', () => {
    const tile = renderSession({
      workflow: /** @type {any} */ ({
        ...WORKFLOW,
        chips: {
          ...WORKFLOW.chips,
          exec_receipt: {
            kind: 'delegated',
            actor: 'opus',
            effort: 'high',
            sha: 'a'.repeat(40)
          }
        }
      })
    });
    const chip = tile.querySelector('.rtile__meta .ctl-chip--exec-receipt');

    expect(chip?.textContent).toBe('delegated:opus:high');
    expect(chip?.getAttribute('title')).toBe(
      `exec_receipt delegated:opus:high@${'a'.repeat(40)}`
    );
  });

  test('keeps the meta row for the route chip alone', () => {
    const tile = renderSession({ workflow: /** @type {any} */ (WORKFLOW) });

    expect(
      tile.querySelector('.rtile__meta .ctl-chip--exec-receipt')
    ).toBeNull();
    expect(tile.querySelector('.rtile__meta .ctl-chip--route')).not.toBeNull();
  });

  test('omits the meta row when the tile carries no slot 5 material', () => {
    const tile = renderSession({}, null);

    expect(tile.querySelector('.rtile__meta')).toBeNull();
  });

  test('keeps a repo-only session header without an empty coordinate row', () => {
    const tile = renderSession();

    expect(tile.querySelector('.rtile__hd .rtile__repo')?.textContent).toBe(
      'repo-a'
    );
    expect(tile.querySelector('.worker-chips--coords')).toBeNull();
  });

  test('renders observed delegation and token facts for a session', () => {
    const tile = renderSession(
      {
        usage: /** @type {any} */ ({
          input_tokens: 10,
          output_tokens: 5,
          total_tokens: 15
        })
      },
      {
        repo: 'repo-a',
        legs: [
          { label: '구현 unit · codex', state: /** @type {const} */ ('live') }
        ]
      }
    );

    expect(tile.querySelector('.rtile__legs')?.textContent).toContain(
      '위임 중 · 구현 unit · codex'
    );
    expect(tile.querySelector('.worker-usage')?.textContent).toContain('τ 15');
    const tooltip = tile.querySelector('.worker-usage')?.getAttribute('title');
    expect(tooltip).toContain('집계: 현재 대화 기준 · 워크스페이스 합계 제외');
    expect(tooltip).toContain(
      '환산: USD · Standard · short context · 5분 cache write 기준'
    );
    expect(tile.querySelectorAll('.rtile__usage-scope')).toHaveLength(0);
    expect(tile.textContent).not.toContain('현재 대화 기준');
  });

  test('keeps the bead id and the detail click contract of every other tile', () => {
    const tile = renderSession();

    expect(tile.getAttribute('data-bead-id')).toBe('UI-t1');
    expect(tile.querySelector('.rtile__id')?.getAttribute('title')).toBe(
      '클릭하면 ID 복사'
    );
  });
});

describe('worker running tile header actions', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('keeps the clock and every control inside one header action group', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([tileInput({ can_pause: true })]), mount);

    const actions = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__hd-actions')
    );
    expect(actions.querySelector('.rtile__elapsed')).not.toBeNull();
    expect(actions.querySelector('.rtile__session')).not.toBeNull();
    expect(actions.querySelector('.rtile__pause')).not.toBeNull();
  });
});

/**
 * 실행중 타일 배치 문법 (UI-251y §3.1): 정체성 줄은 ID·상태 뱃지·조작만
 * 상대하고, 좌표 칩·route·exec·usage는 제목 아래 `.rtile__meta` 하나에 모인다.
 */
describe('실행중 타일 배치 문법 (UI-251y §3.1)', () => {
  test.each([true, false])(
    'moves native usage scope into the provider tooltip with inclusion=%s',
    (included) => {
      const tile = renderTile({
        legs: /** @type {any} */ ([
          {
            native: true,
            usage: { input_tokens: 10 },
            usage_included: included
          }
        ]),
        usage: {
          providers: {
            codex: {
              subtotal: 10,
              breakdown: { input_tokens: 10 },
              total_cost_usd: 6.1
            }
          },
          roles: {}
        }
      });

      const tooltip =
        tile.querySelector('.worker-usage')?.getAttribute('title') || '';

      expect(tile.querySelectorAll('.rtile__usage-scope')).toHaveLength(0);
      expect(tooltip).toContain(
        included ? '집계: 부모·자식 합계' : '집계: 자식 사용량 · 부모 합계 제외'
      );
      expect(tooltip).toContain(
        '환산: USD · Standard · short context · 5분 cache write 기준'
      );
      expect(tooltip.indexOf('집계:')).toBeLessThan(tooltip.indexOf('환산:'));
    }
  );
  const MONITOR = {
    repo: 'repo-a',
    root_dir: '/tmp/repo-a'
  };

  /**
   * @param {Partial<import('./running-grid.js').RunningTile>} [patch]
   * @param {any} [monitor]
   * @returns {HTMLElement}
   */
  function renderTile(patch = {}, monitor = null) {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(runningTile(tileInput(patch), 5000, null, { monitor }), mount);
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  test('splits lane and route from execution and usage', () => {
    const tile = renderTile(
      {
        lane_origin: { kind: 'serial', index: 2 },
        workflow: /** @type {any} */ ({
          chips: { route: 'spec_backed', route_source: 'explicit' }
        }),
        exec_chips: /** @type {any} */ ({
          orchestration: { text: 'o', title: 'ot' },
          worker: { text: 'w', title: 'wt' }
        }),
        usage: /** @type {any} */ ({
          input_tokens: 1000,
          output_tokens: 500,
          total_tokens: 1500,
          cost_usd: 0.42
        })
      },
      MONITOR
    );
    const meta = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__meta')
    );

    expect(Array.from(meta.children, (child) => child.className)).toEqual([
      'worker-chips worker-chips--coords',
      'worker-chips worker-chips--run'
    ]);
    expect(
      Array.from(
        meta.querySelectorAll(
          '.worker-chips--coords > *, .worker-chips--run > *'
        ),
        (child) => child.className
      )
    ).toEqual([
      'ui-chip ctl-chip ctl-chip--lane',
      'ui-chip ctl-chip ctl-chip--route',
      'exec-chip exec-chip--orch',
      'exec-chip exec-chip--worker',
      'worker-usage'
    ]);
  });

  // 빈 줄 판정은 좌표·exec만 세지 않는다 (§3.5): usage만 있는 타일에서 지금
  // 보이는 정보가 사라지면 안 된다.
  test('keeps the meta row for usage alone', () => {
    const tile = renderTile({
      usage: /** @type {any} */ ({
        input_tokens: 1000,
        output_tokens: 500,
        total_tokens: 1500,
        cost_usd: 0.42
      })
    });

    expect(tile.querySelector('.rtile__meta')).not.toBeNull();
    expect(tile.querySelector('.rtile__meta .worker-usage')).not.toBeNull();
  });

  test('draws the 충돌 해소 badge in the header, not the meta row', () => {
    const tile = renderTile(
      { conflict_resolution: true, exec_chips: null },
      MONITOR
    );

    expect(
      tile.querySelector('.rtile__hd .worker-mini__badge')?.textContent
    ).toBe('충돌 해소');
    expect(tile.querySelector('.rtile__meta .worker-mini__badge')).toBeNull();
  });

  test('draws the paused resolution badge in the header too', () => {
    const tile = renderTile({
      conflict_resolution: true,
      paused: true,
      status_label: '복구 중'
    });

    expect(
      tile.querySelector('.rtile__hd .worker-mini__badge')?.textContent
    ).toBe('충돌 해소 일시정지');
    expect(tile.querySelector('.rtile__elapsed')?.textContent).toBe('일시정지');
  });

  test('draws the base exception badge in the header, not the meta row', () => {
    const tile = renderTile({ base_exception: 'base: release-1' });

    expect(
      tile.querySelector('.rtile__hd .worker-mini__badge')?.textContent
    ).toBe('base: release-1');
    expect(tile.querySelector('.rtile__meta')).toBeNull();
  });

  // 슬롯 3(진행)은 활동·위임 줄 하나가 아니다 — landing 진행도도 같은
  // 슬롯이므로 의존 칩은 그 둘 모두의 뒤에 선다 (§2).
  test('draws the dependency chips after every progress line', () => {
    const tile = renderTile(
      {
        lane_origin: { kind: 'parallel' },
        landing: /** @type {any} */ ({
          step: 'deploy',
          label: '배포 중',
          index: 4,
          total: 7,
          percent: 57,
          active: true,
          failed: false
        })
      },
      {
        ...MONITOR,
        last_activity: { text: '파일 편집 중', at: 4000 },
        dependency_chips: {
          predecessors: [],
          overlaps: [
            {
              id: 'UI-t9',
              location_label: '대기',
              prefixes: ['app/views/worker/']
            }
          ]
        }
      }
    );
    const order = Array.from(tile.children, (child) => child.className);

    const deps = order.indexOf('worker-deps worker-deps--secondary');
    expect(deps).toBeGreaterThan(order.indexOf('rtile__activity'));
    expect(deps).toBeGreaterThan(order.indexOf('rtile__landing'));
    expect(deps).toBeLessThan(order.indexOf('rtile__meta'));
  });

  // 폐기 영수증은 슬롯 6(액션 foot)이고 생성·수정 시각은 슬롯 7이다 (§5.1).
  test('draws the discard receipt before the times meta line', () => {
    const tile = renderTile({
      created_at: 1000,
      updated_at: 4000,
      discard: /** @type {any} */ ({
        progress: '폐기 진행 중',
        error: null,
        operation: {
          kind: 'discard',
          operation_id: 'op-1',
          backup: null,
          original_pr: null,
          revert_pr: null
        }
      })
    });
    const order = Array.from(tile.children, (child) => child.className);

    expect(order.indexOf('worker-discard-receipt')).toBeGreaterThan(-1);
    expect(order.indexOf('worker-discard-receipt')).toBeLessThan(
      order.indexOf('worker-mini__meta')
    );
  });

  test('keeps every coordinate chip out of the header', () => {
    const tile = renderTile(
      {
        workflow: /** @type {any} */ ({
          chips: { route: 'spec_backed', route_source: 'explicit' }
        })
      },
      MONITOR
    );
    const head = /** @type {HTMLElement} */ (tile.querySelector('.rtile__hd'));

    expect(
      head.querySelector('.rtile__repo')?.nextElementSibling?.className
    ).toBe('rtile__id');
    expect(head.querySelector('.ctl-chip--lane')).toBeNull();
    expect(head.querySelector('.ctl-chip--route')).toBeNull();
    expect(head.querySelector('.worker-usage')).toBeNull();
  });
});

describe('worker running tile route chip (UI-yrzu §7.2)', () => {
  test.each([
    { paused: true },
    { failed: true },
    { parked: true },
    { waiting: true },
    { provider_hold: true }
  ])('keeps origin visible on a retained tile %j', (patch) => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({ ...patch, lane_origin: { kind: 'serial', index: 5 } }),
        5000
      ),
      mount
    );

    expect(
      mount.querySelector('.worker-chips--coords .ctl-chip--lane')?.textContent
    ).toBe('직렬 5');
  });

  test.each([null, { repo: 'repo-a', root_dir: '/repo' }])(
    'renders tile-owned parallel origin with overlay %j',
    (monitor) => {
      const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

      render(
        runningTile(
          tileInput({ lane_origin: { kind: 'parallel' } }),
          5000,
          null,
          { monitor }
        ),
        mount
      );

      expect(
        mount.querySelector('.worker-chips--coords .ctl-chip--lane')
          ?.textContent
      ).toBe('병렬');
      expect(mount.querySelector('.worker-chips--run')).toBeNull();
    }
  );

  test('omits lane origin on a direct session even with supplied origin', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({ kind: 'session', lane_origin: { kind: 'parallel' } }),
        5000
      ),
      mount
    );

    expect(mount.querySelector('.ctl-chip--lane')).toBeNull();
  });

  test('draws confirmed Worker creation provenance in the meta row', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        tileInput({
          worker_created_from: 'UI-source',
          worker_created_from_root_dir: '/repo/source'
        }),
        5000
      ),
      mount
    );

    expect(mount.querySelector('.rtile__meta')?.textContent).toContain(
      '워커 생성'
    );
    expect(
      mount
        .querySelector('.worker-created-source')
        ?.getAttribute('data-root-dir')
    ).toBe('/repo/source');
    expect(mount.querySelector('.rtile__hd .worker-created-source')).toBeNull();
  });

  test('marks an estimated native child amount on the card row', () => {
    const rendered = shape(
      runningGridTemplate(
        [
          tileInput({
            usage: { input_tokens: 100, output_tokens: 10 },
            legs: [
              {
                label: 'native child',
                state: 'done',
                native: true,
                usage_included: true,
                usage: { total_tokens: 1_000_000 },
                price_usd: 2,
                price_basis: 'estimated'
              }
            ]
          })
        ],
        5000,
        null
      )
    );

    expect(rendered).toContain('$2 추정');
    expect(rendered).toContain('부모·자식 합계');
    expect(rendered).not.toContain('부모 합계 제외');
  });

  test('draws the route chip when the tile carries a workflow', () => {
    const tile = shape(
      runningTile(
        tileInput({
          workflow: /** @type {any} */ ({
            chips: { route: 'quick_fix', route_source: 'explicit' }
          })
        }),
        5000,
        null
      )
    );

    expect(tile).toContain('ctl-chip--route');
    expect(tile).toContain('quick_fix');
  });

  test('draws no route chip on a tile without a workflow', () => {
    expect(shape(runningTile(tileInput(), 5000, null))).not.toContain(
      'ctl-chip--route'
    );
  });
});

describe('세션 타일의 session_ref (UI-4xzk §6.4)', () => {
  /**
   * @param {Partial<import('../../../server/worker/session-ref.js').SessionRefView>} [patch]
   * @returns {import('../../../server/worker/session-ref.js').SessionRefView}
   */
  function view(patch = {}) {
    return {
      index: 0,
      provider: 'claude',
      session_id: 'a1b2c3d4-5e6f',
      host: 'mac-studio',
      current: true,
      locality: 'local',
      last_event_at: null,
      resume_command: "claude --resume 'a1b2c3d4-5e6f'",
      ...patch
    };
  }

  /**
   * @param {Partial<import('./running-grid.js').RunningTile>} [patch]
   * @param {any} [monitor]
   * @returns {HTMLElement}
   */
  function renderSession(patch = {}, monitor = { repo: 'repo-a' }) {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        tileInput({
          kind: 'session',
          attempt_id: '',
          started_at: 1000,
          updated_at: 5000 - 120_000,
          ...patch
        }),
        5000,
        null,
        { monitor }
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  test('opens the drawer from the header once a current session is known', () => {
    const tile = renderSession({ session_refs: [view()] });
    const button = /** @type {HTMLButtonElement} */ (
      tile.querySelector('.rtile__session')
    );

    expect(button.textContent?.trim()).toBe('▤ 세션');
    expect(button.disabled).toBe(false);
    expect(button.getAttribute('title')).toBe('라이브 세션 열기');
  });

  test('keeps the direct-session identity outside the session action group', () => {
    const tile = renderSession({ session_refs: [view()] });
    const actions = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__hd-actions')
    );
    const order = Array.from(actions.children).map((el) => el.className);

    expect(order).toEqual(['rtile__elapsed', 'op-btn rtile__session']);
    expect(
      tile.querySelectorAll('.rtile__hd > .rtile__session-badge')
    ).toHaveLength(1);
    expect(tile.querySelector('.rtile__session-badge')?.textContent).toBe(
      '직접 세션'
    );
    expect(
      tile.querySelectorAll('.rtile__hd-actions > .rtile__session')
    ).toHaveLength(1);
  });

  test('disables the button for a session of another machine', () => {
    const tile = renderSession({
      session_refs: [view({ locality: 'remote' })]
    });
    const button = /** @type {HTMLButtonElement} */ (
      tile.querySelector('.rtile__session')
    );

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('title')).toBe(
      '다른 머신 세션 — 이 서버에 transcript 없음'
    );
  });

  test('disables the button when the transcript file is gone', () => {
    const tile = renderSession({
      session_refs: [view({ locality: 'missing' })]
    });
    const button = /** @type {HTMLButtonElement} */ (
      tile.querySelector('.rtile__session')
    );

    expect(button.disabled).toBe(true);
    expect(button.getAttribute('title')).toBe('transcript 파일 없음');
  });

  test('draws the session chip before the exec_receipt chip', () => {
    const tile = renderSession({
      session_refs: [view()],
      workflow: /** @type {any} */ ({
        route: 'spec_backed',
        chips: {
          route: 'spec_backed',
          route_source: 'explicit',
          exec_receipt: { kind: 'main', actor: 'bead', sha: 'a'.repeat(40) }
        },
        stages: { spec: {}, impl: {}, pr: {}, merge: {} }
      })
    });
    const chips = Array.from(
      tile.querySelectorAll('.rtile__meta .ctl-chip')
    ).map((el) => el.className);

    expect(tile.querySelector('.ctl-chip--sref')?.textContent?.trim()).toBe(
      'claude · a1b2c3d4'
    );
    expect(chips.indexOf('ui-chip ctl-chip ctl-chip--sref')).toBeLessThan(
      chips.indexOf('ui-chip ctl-chip ctl-chip--exec-receipt')
    );
  });

  test('titles the chip with the full contract coordinate', () => {
    const tile = renderSession({ session_refs: [view()] });

    expect(tile.querySelector('.ctl-chip--sref')?.getAttribute('title')).toBe(
      'claude:a1b2c3d4-5e6f@mac-studio · 클릭하면 세션 ID 복사'
    );
  });

  test('appends the history count to the chip title from two items on', () => {
    const tile = renderSession({
      session_refs: [
        view({ index: 0, current: false, session_id: 'older-000' }),
        view({ index: 1 })
      ]
    });

    expect(tile.querySelector('.ctl-chip--sref')?.getAttribute('title')).toBe(
      'claude:a1b2c3d4-5e6f@mac-studio · 이력 2 · 클릭하면 세션 ID 복사'
    );
  });

  test('draws the session identity chip as a button', () => {
    const tile = renderSession({ session_refs: [view()] });

    expect(tile.querySelector('.ctl-chip--sref')?.tagName).toBe('BUTTON');
  });

  test('copies the full session ID from the session identity chip', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true
    });
    const tile = renderSession({ session_refs: [view()] });

    /** @type {HTMLButtonElement} */ (
      tile.querySelector('.ctl-chip--sref')
    ).click();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('a1b2c3d4-5e6f');
  });

  /**
   * @param {Record<string, any>} [record_patch]
   * @param {any[]} [actions]
   * @param {Record<string, any>} [tile_patch]
   * @returns {HTMLElement}
   */
  function renderExternalSession(
    record_patch = {},
    actions = [],
    tile_patch = {}
  ) {
    const record = {
      wait_id: 'w-0123456789ab',
      root_dir: '/repo',
      bead_id: 'UI-t1',
      owner_kind: 'session',
      stage: 'detached',
      budget: { turns_total: 3, turns_used: 0 },
      registered_at: '2026-09-21T00:00:00Z',
      next_observation_at: '2026-09-21T03:14:00Z',
      error_count: 0,
      last_error: null,
      jobs: [
        {
          adapter: 'slurm',
          ssh_host: 'wallace',
          job_id: '42',
          submitted_at: '2026-09-21T00:00:00Z',
          log_path: '/logs/job.log',
          state: 'RUNNING',
          observed_at: '2026-09-21T03:12:00Z',
          terminal: null
        }
      ],
      completion: null,
      resume: null,
      ...record_patch
    };
    return renderSession({
      started_at: undefined,
      updated_at: undefined,
      session_refs: [view()],
      external_wait: /** @type {any} */ (record),
      wait_reasons: /** @type {any} */ ([
        {
          kind: 'external_job',
          subject: { root_dir: '/repo', bead_id: 'UI-t1' },
          headline: 'wallace 작업 42 · RUNNING',
          release: '완료되면 같은 세션을 이어간다',
          verdict: 'normal',
          targets: [],
          actions
        }
      ]),
      ...tile_patch
    });
  }

  const EXTERNAL_PAYLOAD = { root_dir: '/repo', wait_id: 'w-0123456789ab' };
  const CHECK_ACTIONS = [
    {
      op: 'external_wait_check',
      label: '[지금 확인]',
      title: '관찰을 지금 한 번 더 한다',
      payload: EXTERNAL_PAYLOAD
    },
    {
      op: 'external_wait_stop',
      label: '[관찰 중단]',
      title: '잡은 그대로',
      payload: EXTERNAL_PAYLOAD
    }
  ];
  const FORK_ACTIONS = [
    {
      op: 'external_wait_resume',
      label: '[워커로 이어가기]',
      title: 'fork',
      payload: { ...EXTERNAL_PAYLOAD, mode: 'fork' }
    }
  ];

  test('marks a session tile with an external wait as held (UI-l48z §4.1)', () => {
    const tile = renderExternalSession();

    expect(Array.from(tile.classList)).toEqual(
      expect.arrayContaining([
        'rtile--session',
        'rtile--held',
        'rtile--compact',
        'rtile--external-wait'
      ])
    );
  });

  test('replaces the direct-session badge with the external wait badge', () => {
    const tile = renderExternalSession();

    expect(tile.querySelector('.rtile__session-badge')).toBeNull();
    expect(
      tile
        .querySelector('.rtile__hd .wait-verdict summary')
        ?.textContent?.trim()
    ).toBe('⏳ 외부 작업');
  });

  test('draws no elapsed label or activity line on an external wait tile', () => {
    const tile = renderExternalSession();

    expect(tile.querySelector('.rtile__elapsed')).toBeNull();
    expect(tile.querySelector('.rtile__activity')).toBeNull();
  });

  test('keeps the session button on an external wait tile', () => {
    const tile = renderExternalSession();

    expect(
      tile.querySelector('.rtile__hd-actions .rtile__session')
    ).not.toBeNull();
  });

  test('draws the job lines and times on an external wait tile', () => {
    const tile = renderExternalSession();

    expect(
      Array.from(tile.querySelectorAll('.external-job span')).map((cell) =>
        (cell.textContent || '').trim()
      )
    ).toEqual(['◐', 'wallace', '42', '실행 중', expect.any(String)]);
    expect(tile.querySelector('.wait-reason__times')?.textContent).toContain(
      '마지막 확인'
    );
  });

  test('draws no release line on an external wait tile', () => {
    const tile = renderExternalSession();

    const body = tile.querySelector('.rtile__title + .wait-reason__lines');

    expect(tile.querySelector('.wait-reason__release')).toBeNull();
    expect(body?.textContent).not.toContain('완료되면 같은 세션');
  });

  test('tails the external wait badge with the ended job count', () => {
    const tile = renderExternalSession({
      jobs: [
        {
          adapter: 'slurm',
          ssh_host: 'wallace',
          job_id: '42',
          submitted_at: '2026-09-21T00:00:00Z',
          log_path: '/logs/job.log',
          state: 'RUNNING',
          observed_at: '2026-09-21T03:12:00Z',
          terminal: null
        },
        {
          adapter: 'process',
          pid: 777,
          submitted_at: '2026-09-21T00:00:00Z',
          log_path: '/logs/p.log',
          state: 'COMPLETED',
          observed_at: '2026-09-21T00:30:00Z',
          terminal: {
            exit_code: 0,
            evidence: 'rc=0',
            recovery_needed: false,
            expected_results: []
          }
        }
      ]
    });

    expect(
      tile
        .querySelector('.rtile__hd .wait-verdict summary')
        ?.textContent?.trim()
    ).toBe('⏳ 외부 작업 · 1/2 완료');
    expect(
      tile
        .querySelectorAll('.external-job')[1]
        ?.querySelector('.external-job__host')?.textContent
    ).toBe('로컬');
  });

  test('draws the sub-job summary on an external wait tile and keeps the badge (UI-q15q)', () => {
    const tile = renderExternalSession({
      jobs: [
        {
          adapter: 'slurm',
          ssh_host: 'wallace',
          job_id: '42',
          submitted_at: '2026-09-21T00:00:00Z',
          log_path: '/logs/job.log',
          state: 'RUNNING',
          observed_at: '2026-09-21T03:12:00Z',
          terminal: null,
          spawned: {
            total: 2,
            counts: {
              running: 1,
              pending: 1,
              completed: 0,
              failed: 0,
              unknown: 0
            },
            rows: [
              {
                job_id: '201',
                name: 'align',
                rule: '',
                state: 'RUNNING',
                submitted_at: '2026-09-21T01:00:00',
                started_at: '2026-09-21T01:01:00'
              }
            ],
            omitted: 0
          }
        }
      ]
    });

    const lines = Array.from(tile.querySelectorAll('.external-spawned')).map(
      (line) => (line.textContent || '').replace(/\s+/g, ' ').trim()
    );

    expect(lines).toEqual(['하위 잡 2개 · 실행 1 · 대기 1', '◐ align']);
    expect(
      tile
        .querySelector('.rtile__hd .wait-verdict summary')
        ?.textContent?.trim()
    ).toBe('⏳ 외부 작업');
  });

  test('keeps the session identity chip on an external wait tile', () => {
    const tile = renderExternalSession();

    expect(tile.querySelector('.ctl-chip--sref')).not.toBeNull();
  });

  test('draws the external operations in the foot, not the header', () => {
    const tile = renderExternalSession({}, CHECK_ACTIONS);

    expect(
      tile.querySelectorAll('.rtile__foot [data-external-wait-op]')
    ).toHaveLength(2);
    expect(
      tile.querySelector('.rtile__hd-actions [data-external-wait-op]')
    ).toBeNull();
  });

  test('draws no coordinate chips on an external wait tile', () => {
    const tile = renderExternalSession();

    expect(tile.textContent).not.toContain('ssh wallace');
    expect(tile.textContent).not.toContain('/logs/job.log');
  });

  test('holds a record-less wait_record_missing tile with its stop exit', () => {
    const tile = renderSession({
      started_at: undefined,
      updated_at: undefined,
      session_refs: [view()],
      wait_reasons: /** @type {any} */ ([
        {
          kind: 'external_job',
          subject: { root_dir: '/repo', bead_id: 'UI-t1' },
          headline: '',
          release: '',
          verdict: 'action_required',
          verdict_reason: {
            code: 'wait_record_missing',
            message: '대기 레코드 없음'
          },
          targets: [],
          actions: [
            {
              op: 'external_wait_stop',
              label: '[관찰 중단]',
              title: '레코드가 없는 대기 키를 지운다',
              payload: EXTERNAL_PAYLOAD
            }
          ]
        }
      ])
    });

    expect(
      tile.querySelector('.rtile__hd .wait-verdict summary')?.textContent
    ).toContain('⛔ 조치 필요');
    expect(
      tile
        .querySelector('.rtile__foot [data-external-wait-op]')
        ?.textContent?.trim()
    ).toBe('관찰 중단');
  });

  test('makes the worker fork exit primary without session-preferred', () => {
    const tile = renderExternalSession({ stage: 'completing' }, FORK_ACTIONS, {
      labels: []
    });

    expect(
      tile
        .querySelector('[data-external-wait-op="external_wait_resume"]')
        ?.classList.contains('op-btn--primary')
    ).toBe(true);
  });

  test('keeps the worker fork exit plain on a session-preferred bead', () => {
    const tile = renderExternalSession({ stage: 'completing' }, FORK_ACTIONS, {
      labels: ['session-preferred']
    });

    expect(
      tile
        .querySelector('[data-external-wait-op="external_wait_resume"]')
        ?.classList.contains('op-btn--primary')
    ).toBe(false);
  });

  const SESSION_COMPLETE_ACTIONS = [
    {
      op: 'external_wait_resume',
      label: '[세션에서 이어가기]',
      placement: 'card',
      payload: { ...EXTERNAL_PAYLOAD, mode: 'session' }
    },
    {
      op: 'external_wait_resume',
      label: '[워커로 이어가기]',
      placement: 'card',
      payload: { ...EXTERNAL_PAYLOAD, mode: 'fork' }
    },
    {
      op: 'external_wait_stop',
      label: '[대기 해제]',
      placement: 'detail',
      confirm: '이어가지 않고 대기 키를 지웁니다. 계속할까요?',
      payload: EXTERNAL_PAYLOAD
    }
  ];

  test('draws the two resume exits in order and drops the detail release (UI-r6xq §4.1)', () => {
    const tile = renderExternalSession(
      { stage: 'completing', owner_kind: 'session' },
      SESSION_COMPLETE_ACTIONS
    );

    expect(
      Array.from(
        tile.querySelectorAll('.rtile__foot [data-external-wait-op]')
      ).map((button) => button.textContent?.trim())
    ).toEqual(['세션에서 이어가기', '워커로 이어가기']);
  });

  test('makes the session exit primary on a session-preferred bead', () => {
    const tile = renderExternalSession(
      { stage: 'completing', owner_kind: 'session' },
      SESSION_COMPLETE_ACTIONS,
      { labels: ['session-preferred'] }
    );

    expect(
      Array.from(tile.querySelectorAll('.rtile__foot .op-btn--primary')).map(
        (button) => button.getAttribute('data-mode')
      )
    ).toEqual(['session']);
  });

  test('reports the transcript mtime as the activity line', () => {
    const tile = renderSession({
      session_refs: [view({ last_event_at: 5000 - 60_000 })]
    });

    expect(tile.querySelector('.rtile__activity-text')?.textContent).toBe(
      '최근 활동 1분 전'
    );
  });

  test('falls back to the bead update time without a transcript mtime', () => {
    const tile = renderSession({ session_refs: [view()] });

    expect(tile.querySelector('.rtile__activity-text')?.textContent).toBe(
      '갱신 2분 전'
    );
  });

  test('falls back to the bead update time for a remote session', () => {
    const tile = renderSession({
      session_refs: [view({ locality: 'remote', last_event_at: 5000 - 60_000 })]
    });

    expect(tile.querySelector('.rtile__activity-text')?.textContent).toBe(
      '갱신 2분 전'
    );
  });

  test('omits the activity line when neither time exists', () => {
    const tile = renderSession({
      session_refs: [view()],
      updated_at: undefined
    });

    expect(tile.querySelector('.rtile__activity')).toBeNull();
  });

  test('renders the UI-yrzu tile untouched when no current item survived', () => {
    const with_refs = renderSession({ session_refs: [] }).outerHTML;
    const without_refs = renderSession().outerHTML;

    expect(with_refs).toBe(without_refs);
    expect(
      renderSession({ session_refs: [] }).querySelector('.rtile__session')
    ).toBeNull();
  });

  test('leaves the worker tile without a session chip', () => {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(tileInput({ session_refs: [view()] }), 5000, null, {
        monitor: { repo: 'repo-a' }
      }),
      mount
    );

    expect(mount.querySelector('.ctl-chip--sref')).toBeNull();
    expect(mount.querySelector('.rtile__session')?.getAttribute('title')).toBe(
      '라이브 세션 열기'
    );
  });
});

describe('복잡 chip on the running tile (UI-7nhi §3)', () => {
  const REASON = 'verification_by_judgment';

  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, any>} tile
   * @returns {HTMLElement}
   */
  function renderTile(tile) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        /** @type {any} */ ({
          bead_id: 'UI-1',
          attempt_id: 'attempt-1',
          title: 'running work',
          runner: 'claude',
          model: 'opus',
          started_at: 1000,
          ...tile
        }),
        2000
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  test('draws the chip in the attempt tile meta line', () => {
    const tile = renderTile({ complex_reason: REASON });

    const chip = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__meta .worker-card__complex')
    );

    expect(chip.textContent?.trim()).toBe('복잡');
    expect(chip.title).toBe(
      '복잡한 작업으로 판정됨\n사유: 테스트가 못 잡고 리뷰어의 추론으로만 검증할 수 있다'
    );
    expect(chip.dataset.state).toBeUndefined();
  });

  test('draws the chip in the session tile meta line', () => {
    const tile = renderTile({
      kind: 'session',
      attempt_id: null,
      runner: null,
      model: null,
      complex_reason: REASON
    });

    expect(
      tile.querySelector('.rtile__meta .worker-card__complex')
    ).not.toBeNull();
  });

  test('omits the chip when the bead carries no 복잡 판정', () => {
    const tile = renderTile({});

    expect(tile.querySelector('.worker-card__complex')).toBeNull();
  });

  test('omits the chip when the reason string is empty', () => {
    const tile = renderTile({ complex_reason: '' });

    expect(tile.querySelector('.worker-card__complex')).toBeNull();
  });

  test('turns the tile chip into a 판정 button as well (UI-8x90 §4.5)', () => {
    const tile = renderTile({ complex_reason: REASON });

    const chip = /** @type {HTMLElement} */ (
      tile.querySelector('.worker-card__complex')
    );

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.dataset.chipKey).toBe('complex');
  });

  test('draws the 사유 popup inside the tile meta line', () => {
    const tile = renderTile({
      complex_reason: REASON,
      chip_popover: {
        chip_key: 'complex',
        content: { title: '복잡한 작업으로 판정됨', lines: ['한 줄'] }
      }
    });

    expect(tile.querySelector('.rtile__meta .chip-popover')).not.toBeNull();
    expect(
      tile.querySelector('.worker-card__complex')?.getAttribute('aria-expanded')
    ).toBe('true');
  });
});

describe('running grid reads the overlay material off the tile (UI-4tud §4.3)', () => {
  test('draws the activity line from the tile last_activity', () => {
    const grid = shape(
      runningGridTemplate(
        [
          tileInput({
            last_activity: { at: 4000, kind: 'assistant', text: '패치 적용' }
          })
        ],
        5000,
        null
      )
    );

    expect(grid).toContain('패치 적용');
  });

  test('draws the delegation chips from the tile legs', () => {
    const grid = shape(
      runningGridTemplate(
        [tileInput({ legs: [{ label: 'codex', state: 'live' }] })],
        5000,
        null
      )
    );

    expect(grid).toContain('위임 중 · codex');
  });

  test('separates successful, failed and interrupted delegation details', () => {
    const grid = shape(
      runningGridTemplate(
        [
          tileInput({
            legs: [
              { label: 'ok', state: 'done' },
              { label: 'bad', state: 'failed' },
              { label: 'stopped', state: 'interrupted' }
            ]
          })
        ],
        5000,
        null
      )
    );

    expect(grid).toContain('위임 완료 1');
    expect(grid).toContain('위임 실패 1');
    expect(grid).toContain('위임 중단 1');
    expect(grid).toContain('<details');
  });

  test('draws the dependency chips from the tile', () => {
    const grid = shape(
      runningGridTemplate(
        [
          tileInput({
            dependency_chips: {
              predecessors: [{ id: 'UI-9', label: '⛓ UI-9', title: '선행' }]
            }
          })
        ],
        5000,
        null
      )
    );

    expect(grid).toContain('⛓ UI-9');
  });

  test('draws no overlay lines for a tile carrying no overlay material', () => {
    const grid = shape(runningGridTemplate([tileInput()], 5000, null));

    expect(grid).not.toContain('rtile__activity');
  });

  test('draws the session activity line for a session tile with no material', () => {
    const grid = shape(
      runningGridTemplate(
        [
          {
            bead_id: 'UI-s1',
            attempt_id: '',
            kind: 'session',
            title: '세션 작업',
            runner: null,
            model: null,
            started_at: 1000,
            updated_at: 2000
          }
        ],
        5000,
        null
      )
    );

    expect(grid).toContain('rtile__activity--session');
  });
});

describe('worker 대기 타일 (UI-5ym8 §8)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * A `parked` attempt's tile input. It carries the SAME failure projection a
   * failed tile does — the two answer the same question — so this fixture is
   * deliberately the failed one plus `parked`.
   *
   * @param {Partial<any>} [over]
   * @returns {any}
   */
  function parkTile(over = {}) {
    return {
      bead_id: 'UI-p1',
      attempt_id: 'attempt-p1',
      title: 'REVISE 대기 중',
      runner: 'claude',
      model: 'opus',
      started_at: 1000,
      parked: true,
      resolve_action: true,
      resolve_enabled: true,
      resolve_title: '파킹 문의 세션 열기',
      status: 'parked',
      status_label: '세션 대기',
      failure: {
        cause: 'session_parked',
        cause_detail: {
          summary: 'spec 리뷰 REVISE 7건을 사용자에게 확인 요청함',
          awaiting_user: 'spec_review',
          bead_status: 'in_progress'
        },
        summary: 'spec 리뷰 REVISE 7건을 사용자에게 확인 요청함',
        bead_id: 'UI-p1',
        retry: null,
        finished_at: 4000,
        runner: 'claude',
        model: 'opus',
        effort: null,
        observed_effort: null,
        speed: null,
        attempt_id: 'attempt-p1',
        usage: null,
        halted_auto_advance: false,
        quickfix_lane: false,
        quickfix_landing: null,
        resume_eligible: false,
        resume_reason:
          '확인 필요 — [세션에서 이어가기]로 같은 세션과 대화합니다',
        landed: false,
        confirmation: 'unmerged'
      },
      discard: {
        action: true,
        enabled: true,
        label: '폐기',
        title: '백업 후 정리',
        operation: null
      },
      ...over
    };
  }

  test('badges a parked attempt in the 판정 칩 slot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([parkTile()]), mount);

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    expect(
      tile
        .querySelector('.rtile__hd .wait-verdict summary')
        ?.textContent?.trim()
    ).toBe('⏸ 확인 필요');
    expect(tile.classList.contains('rtile--parked')).toBe(true);
    expect(tile.classList.contains('rtile--failed')).toBe(false);
  });

  test('renders the session summary on a parked tile', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([parkTile()]), mount);

    expect(mount.querySelector('.rtile__held-summary')?.textContent).toContain(
      'REVISE 7건'
    );
  });

  test('truncates a parked summary longer than 200 characters', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const tile = parkTile();
    tile.failure.summary = 'x'.repeat(240);

    render(runningGridTemplate([tile]), mount);

    expect(mount.querySelector('.rtile__held-summary')?.textContent).toBe(
      `${'x'.repeat(200)}…`
    );
  });

  test('renders the timeline lines and the log path on a parked tile', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const tile = parkTile();
    tile.failure.timeline = [
      {
        event_id: 'e2',
        kind: 'session_ended',
        summary: '파킹 · spec_review',
        at: 2000
      },
      {
        event_id: 'e1',
        kind: 'dispatched',
        summary: 'claude opus 디스패치',
        at: 1000
      }
    ];
    tile.failure.log_path = '/w/beads/UI-p1/sessions/attempt-p1.jsonl';

    render(runningGridTemplate([tile]), mount);

    const rows = Array.from(
      mount.querySelectorAll('[data-seam="tile-timeline"] li')
    );
    expect(rows).toHaveLength(2);
    expect(rows[0].textContent).toContain('파킹 · spec_review');
    expect(
      mount.querySelector('[data-seam="tile-log-path"]')?.textContent
    ).toContain('/w/beads/UI-p1/sessions/attempt-p1.jsonl');
  });

  test('draws no history block on a parked tile with no timeline', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([parkTile()]), mount);

    expect(mount.querySelector('[data-seam="tile-timeline"]')).toBeNull();
    expect(mount.querySelector('[data-seam="tile-log-path"]')).toBeNull();
  });

  test('offers 세션에서 이어가기 and 폐기 in the parked action foot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([parkTile()]), mount);

    const foot = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__foot')
    );
    expect(foot.querySelector('.rtile__resolve')?.textContent?.trim()).toBe(
      '세션에서 이어가기'
    );
    expect(foot.querySelector('.rtile__discard')?.textContent?.trim()).toBe(
      '폐기'
    );
    expect(mount.querySelector('.rtile__resume')).toBeNull();
    expect(mount.querySelector('.rtile__pause')).toBeNull();
  });

  test('badges a retry_wait attempt with its count and next time', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const next_at = new Date(2026, 7, 28, 14, 5).getTime();

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-r1',
          attempt_id: 'attempt-r1',
          title: '환경 장애 재시도 대기',
          runner: 'codex',
          model: 'sol',
          started_at: 1000,
          retry_wait: true,
          status: 'retry_wait',
          status_label: '재시도 대기',
          retry: {
            cause: 'session_failed:is_error',
            attempts: 2,
            max: 3,
            next_at
          }
        }
      ]),
      mount
    );

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    expect(
      tile.querySelector('.wait-verdict summary')?.textContent?.trim()
    ).toBe(
      `↻ 재시도 대기 2/3 · ${new Date(next_at).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    );
    expect(tile.classList.contains('rtile--retry-wait')).toBe(true);
    // 투영이 폐기를 주지 않아도 foot은 Bead 단위 [지금 재시도]를 싣는다
    // (2026-10-01 stall-reconcile D9).
    expect(
      Array.from(tile.querySelectorAll('.rtile__foot button'), (button) =>
        button.textContent?.trim()
      )
    ).toEqual(['지금 재시도']);
  });

  test('offers 폐기 alone in the retry_wait action foot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const next_at = new Date(2026, 7, 28, 14, 5).getTime();

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-r1',
          attempt_id: 'attempt-r1',
          title: '환경 장애 재시도 대기',
          runner: 'codex',
          model: 'sol',
          started_at: 1000,
          retry_wait: true,
          status: 'retry_wait',
          status_label: '재시도 대기',
          retry: {
            cause: 'session_failed:is_error',
            attempts: 2,
            max: 3,
            next_at
          },
          discard: {
            action: true,
            enabled: true,
            label: '폐기',
            title: '백업 후 정리',
            operation: null
          }
        }
      ]),
      mount
    );

    const foot = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__foot')
    );
    expect(foot.querySelectorAll('.rtile__discard')).toHaveLength(1);
    expect(foot.querySelector('.rtile__resolve')).toBeNull();
  });

  test('omits the retry_wait counts a record does not carry', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-r2',
          attempt_id: 'attempt-r2',
          title: '옛 기록',
          runner: null,
          model: null,
          started_at: 1000,
          retry_wait: true,
          status: 'retry_wait',
          retry: null
        }
      ]),
      mount
    );

    expect(
      mount.querySelector('.wait-verdict summary')?.textContent?.trim()
    ).toBe('↻ 재시도 대기');
  });
});

describe('worker 공급자 보류 타일', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, any>} [patch]
   * @returns {any}
   */
  function heldTile(patch = {}) {
    return {
      bead_id: 'UI-provider',
      attempt_id: 'attempt-provider',
      title: 'provider-held work',
      runner: 'claude',
      model: 'opus-4.8',
      started_at: 1000,
      provider_hold: true,
      status: 'provider_hold',
      status_label: '공급자 보류',
      hold: {
        kind: 'outage',
        detail: 'overloaded_529',
        next_probe_at: 3000
      },
      discard: {
        action: true,
        enabled: true,
        label: '폐기',
        title: '폐기',
        operation: null
      },
      ...patch
    };
  }

  test('renders the provider hold actions in the action foot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningTile(heldTile(), 5000), mount);

    expect(
      Array.from(mount.querySelectorAll('.rtile__foot button')).map((button) =>
        button.textContent?.trim()
      )
    ).toEqual(['↻ 이어하기', '⋯ 다른 방법으로', '폐기']);
  });

  test('renders hold detail with the non-failure heading and available rows', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        heldTile({
          hold: {
            kind: 'usage_limit',
            detail: 'usage_limit',
            summary: '사용 한도 도달',
            message: 'API Error: limit reached',
            target: { model: 'opus-4.8', account: 'one@example.com' },
            resets_at: 4000,
            auto_resume: 'refused:worktree_missing',
            log_path: '/tmp/provider.log',
            open: true
          }
        }),
        5000
      ),
      mount
    );

    const popover = /** @type {HTMLElement} */ (
      mount.querySelector('.wait-verdict .chip-popover')
    );

    expect(popover.textContent).toContain('작업 실패 아님');
    expect(popover.textContent).toContain('사용 한도 도달');
    expect(popover.textContent).toContain('API Error: limit reached');
    expect(popover.textContent).toContain('opus-4.8 · one@example.com');
    expect(popover.textContent).toContain('자동 재개 거부 · worktree_missing');
    expect(popover.textContent).toContain('/tmp/provider.log');
  });

  test('names why a limit hold stayed on its own account', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        heldTile({
          hold: {
            kind: 'usage_limit',
            detail: 'usage_limit',
            auto_switch: 'none',
            open: true
          }
        }),
        5000
      ),
      mount
    );

    const popover = /** @type {HTMLElement} */ (
      mount.querySelector('.wait-verdict .chip-popover')
    );

    expect(popover.textContent).toContain('허용 계정 중 사용 가능한 계정 없음');
  });

  test('names a disabled automatic account switch in the popover', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        heldTile({
          hold: {
            kind: 'usage_limit',
            detail: 'usage_limit',
            auto_switch: 'disabled',
            open: true
          }
        }),
        5000
      ),
      mount
    );

    const popover = /** @type {HTMLElement} */ (
      mount.querySelector('.wait-verdict .chip-popover')
    );

    expect(popover.textContent).toContain('계정 전환 안 함 · 기다림 모드');
  });

  test('omits unavailable hold rows from the popover', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        heldTile({
          hold: { kind: 'outage', detail: 'overloaded_529', open: true }
        }),
        5000
      ),
      mount
    );

    const terms = Array.from(mount.querySelectorAll('dt')).map(
      (term) => term.textContent
    );

    expect(terms).toEqual([]);
  });
});

describe('worker 선행 대기 타일 (선행 대기 계층 §5.2)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * A `waiting` attempt's tile input. It carries `wait`, never `failure`: the
   * ending has no failure code, no landing step and no resume to describe.
   *
   * @param {Partial<any>} [over]
   * @returns {any}
   */
  function waitTile(over = {}) {
    return {
      bead_id: 'UI-w1',
      attempt_id: 'attempt-w1',
      title: '선행 미충족으로 착수 거부',
      runner: 'claude',
      model: 'opus',
      started_at: 1000,
      waiting: true,
      status: 'waiting',
      status_label: '선행 대기',
      wait: {
        summary: '선행 Analysis-2zly 미충족으로 착수하지 않았습니다',
        blockers: [{ id: 'Analysis-2zly', rig: 'Analysis', status: 'open' }],
        since: 4000
      },
      discard: {
        action: true,
        enabled: true,
        label: '폐기',
        title: '백업 후 정리',
        operation: null
      },
      ...over
    };
  }

  test('badges a waiting attempt in the 판정 칩 slot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    expect(
      tile
        .querySelector('.rtile__hd .wait-verdict summary')
        ?.textContent?.trim()
    ).toBe('⛓ 선행 대기');
    expect(tile.classList.contains('rtile--failed')).toBe(false);
  });

  test.each([
    ['authority', '확인 필요'],
    ['unclassified', '확인 필요']
  ])(
    'renders recovery %s with one session resolution and discard control',
    (reason, label) => {
      const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
      const sentence = '조건이 해제되면 이어갈 수 있습니다.';

      render(
        runningGridTemplate([
          waitTile({
            status_label: undefined,
            can_resume: true,
            resolve_action: true,
            wait: {
              summary: '원래 summary',
              blockers: [],
              since: 4000,
              cause: 'session_ended_unresolved',
              recovery: { reason, label, sentence, no_progress: null }
            }
          })
        ]),
        mount
      );

      expect(
        mount.querySelector('.wait-verdict summary')?.textContent?.trim()
      ).toBe(`⏸ ${label}`);
      expect(mount.querySelector('.rtile__elapsed')).toBeNull();
      expect(
        mount.querySelector('.rtile__held-summary')?.textContent
      ).toContain(sentence);
      expect(mount.querySelector('.rtile__resume')).toBeNull();
      expect(mount.querySelectorAll('.op-btn.rtile__resolve')).toHaveLength(1);

      expect(
        mount.querySelector('.rtile__foot .rtile__discard')
      ).not.toBeNull();
      expect(mount.querySelector('.rtile__failure-badge')).toBeNull();
      expect(mount.querySelector('.rtile__pause')).toBeNull();
    }
  );

  test('draws the handoff button right after the resolve action', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        waitTile({
          status_label: undefined,
          resolve_action: true,
          handoff_action: true,
          handoff_attempt_id: 'a1',
          wait: {
            summary: 'summary',
            blockers: [],
            since: 4000,
            cause: 'session_ended_unresolved',
            recovery: {
              reason: 'authority',
              label: '확인 필요',
              sentence: '범위 밖',
              no_progress: null
            }
          }
        })
      ]),
      mount
    );

    const button = /** @type {HTMLElement|null} */ (
      mount.querySelector('.rtile__foot .rtile__resolve + .rtile__handoff')
    );
    expect(button?.textContent?.trim()).toBe('워커로 이어가기');
    expect(button?.dataset.attemptId).toBe('a1');
  });

  test('draws no resolve button on a recovery tile without resolve_action', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        waitTile({
          wait: {
            summary: null,
            blockers: [],
            recovery: { reason: 'verification', label: 'x', sentence: 's' }
          }
        })
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__resolve')).toBeNull();
  });

  test('draws the inquiry progress line after the headline of a held tile', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const now = 1_000_000;

    render(
      runningGridTemplate(
        [
          waitTile({
            wait: {
              summary: null,
              blockers: [],
              recovery: { reason: 'verification', label: 'x', sentence: 's' }
            },
            interactive_sessions: [
              {
                key: 'UI-w1:inquiry',
                kind: 'inquiry',
                state: 'live',
                closing: false,
                mode: 'fork',
                source: 'attempt',
                tmux_session: 'bdui-inquiry',
                tmux_window: 'UI-w1',
                launched_at: now - 7 * 60_000,
                turn_state: 'running',
                turn_state_since: now - 8 * 60_000,
                last_message: { text: '테스트 재실행', at: now - 120_000 }
              }
            ],
            wait_reasons: [
              {
                kind: 'recovery',
                subject: { bead_id: 'UI-w1', root_dir: '/repo' },
                headline: '막힘 문장',
                verdict: 'normal',
                since: now - 20 * 60_000,
                targets: [],
                actions: [],
                notify_plan: { on_complete: 'none', on_overdue: 'none' }
              }
            ]
          })
        ],
        now
      ),
      mount
    );

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
    const line = tile.querySelector('.rtile__activity--session');
    expect(line?.textContent).toContain('▤ 테스트 재실행');
    expect(line?.previousElementSibling?.className).toContain(
      'wait-reason__lines'
    );
    expect(
      tile.querySelector('.interactive-session-badge')?.textContent?.trim()
    ).toBe('▤ 대화 세션 · bdui-inquiry:UI-w1 · 작업 중 8분');
    expect(tile.querySelector('.wait-reason__times')?.textContent?.trim()).toBe(
      '대화 세션 7분째'
    );
  });

  test('omits the recovery resume control when the projection refuses it', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        waitTile({
          status_label: undefined,
          can_resume: false,
          resolve_action: true,
          wait: {
            summary: null,
            blockers: [],
            recovery: { reason: 'future', label: 'future', sentence: null }
          }
        })
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__resume')).toBeNull();
    expect(mount.querySelector('.rtile__resolve')).not.toBeNull();
    expect(mount.textContent).not.toContain('선행 대기');
  });

  test.each([
    [1000, '복구 중 · 13m 20s'],
    [undefined, '복구 중 · —']
  ])('renders live recovery with started_at=%s', (started_at, expected) => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate(
        [
          waitTile({
            waiting: false,
            status: 'running',
            status_label: '복구 중',
            started_at,
            wait: null
          })
        ],
        801000
      ),
      mount
    );

    expect(mount.querySelector('.rtile__elapsed')?.textContent).toBe(expected);
    expect(mount.querySelector('.rtile__held-badge')).toBeNull();
  });

  test('badges a waiting attempt of unknown cause as 선행 대기', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    const badge = mount.querySelector('.wait-verdict summary');
    expect(badge?.textContent?.trim()).toBe('⛓ 선행 대기');
  });

  test('draws the kind alone when the server judged nothing', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    const badge = mount.querySelector('.wait-verdict summary');
    expect(mount.querySelectorAll('.wait-verdict')).toHaveLength(1);
    expect(badge?.textContent?.trim()).toBe('⛓ 선행 대기');
    expect(badge?.hasAttribute('data-verdict')).toBe(false);
    expect(
      mount.querySelector('.wait-verdict .chip-popover')?.textContent
    ).toContain('선행이 닫히면 자동 복귀');
    expect(mount.textContent).not.toContain('정상 대기');
  });

  test('keeps one badge when the server judged the same prerequisite', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        waitTile({
          wait_reasons: [
            {
              kind: 'prerequisite',
              subject: { bead_id: 'UI-w1', root_dir: '/repo' },
              headline: 'Analysis-2zly 완료를 기다림',
              release: '선행 해제 후 자동 복귀',
              verdict: 'overdue',
              since: 4000,
              targets: [{ id: 'Analysis-2zly', kind: 'issue' }],
              actions: [],
              verdict_reason: { code: 'check_overdue', message: '확인 지연' }
            }
          ]
        })
      ]),
      mount
    );

    const badge = mount.querySelector('.wait-verdict summary');
    expect(mount.querySelectorAll('.wait-verdict')).toHaveLength(1);
    expect(badge?.getAttribute('data-verdict')).toBe('overdue');
    expect(mount.querySelector('.wait-reason__release')).toBeNull();
  });

  test('drops the elapsed label a held tile no longer needs', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    expect(mount.querySelector('.rtile__elapsed')).toBeNull();
  });

  test('omits base-moved resume when no session is available', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        waitTile({
          status_label: '반영 대기',
          wait: { summary: null, blockers: [], cause: 'base_moved' },
          can_resume: false
        })
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__resume')).toBeNull();
  });

  test('renders the session summary line', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    expect(mount.querySelector('.rtile__held-summary')?.textContent).toContain(
      'Analysis-2zly'
    );
  });

  test('draws no summary line when the record carries none', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    const tile = waitTile();
    tile.wait.summary = null;

    render(runningGridTemplate([tile]), mount);

    expect(mount.querySelector('.rtile__held-summary')).toBeNull();
  });

  test('offers 폐기 alone in the action foot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    const foot = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__foot')
    );
    expect(foot.querySelector('.rtile__discard')?.textContent?.trim()).toBe(
      '폐기'
    );
    expect(foot.querySelector('.rtile__resolve')).toBeNull();
  });

  test('draws no resume button and no failure popover', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    expect(mount.querySelector('.rtile__resume')).toBeNull();
    expect(mount.querySelector('.rtile__failure-badge')).toBeNull();
    expect(mount.querySelector('.rtile__pause')).toBeNull();
  });

  test('draws the slot 4a blocker chip in the held body', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(
        waitTile({
          dependency_chips: {
            predecessors: [{ id: 'Analysis-2zly', label: '⛓ Analysis-2zly' }]
          }
        }),
        5000,
        null,
        {
          monitor: /** @type {any} */ ({
            dependency_chips: {
              predecessors: [{ id: 'Analysis-2zly', label: '⛓ Analysis-2zly' }]
            }
          })
        }
      ),
      mount
    );

    expect(mount.querySelector('.worker-dep--pred')?.textContent).toContain(
      '⛓ Analysis-2zly'
    );
  });

  test('draws the slot 4b released chip in the held body', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate(
        [
          waitTile({
            dependency_chips: {
              released: [{ id: 'Analysis-2zly', label: '🔓 Analysis-2zly' }]
            }
          })
        ],
        5000
      ),
      mount
    );

    expect(mount.querySelector('.worker-dep--released')?.textContent).toContain(
      '🔓 Analysis-2zly'
    );
  });

  test('orders the blocker chip between the summary and the 폐기 foot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(waitTile(), 5000, null, {
        monitor: /** @type {any} */ ({
          dependency_chips: {
            predecessors: [{ id: 'Analysis-2zly', label: '⛓ Analysis-2zly' }]
          }
        })
      }),
      mount
    );

    const order = Array.from(
      /** @type {HTMLElement} */ (
        mount.querySelector('.rtile')
      ).querySelectorAll('.rtile__held-summary, .worker-deps, .rtile__foot')
    ).map((node) => node.className.split(' ')[0]);
    expect(order).toEqual([
      'rtile__held-summary',
      'worker-deps',
      'rtile__foot'
    ]);
  });

  test('draws no dependency row when the tile carries no chips', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    expect(mount.querySelector('.worker-deps')).toBeNull();
  });
});

describe('worker 실패 팝오버의 §6 재료 (UI-5ym8 §8)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Partial<any>} over - The failure fields under test.
   * @returns {HTMLElement}
   */
  function mountOpenPopover(over) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningGridTemplate([
        {
          bead_id: 'UI-f1',
          attempt_id: 'attempt-f1',
          title: '실패한 작업',
          runner: 'claude',
          model: 'opus',
          started_at: null,
          failed: true,
          status: 'failed',
          status_label: '실패',
          failure: {
            cause: 'session_failed:is_error',
            cause_detail: null,
            finished_at: 4000,
            runner: 'claude',
            model: 'opus',
            effort: null,
            observed_effort: null,
            speed: null,
            attempt_id: 'attempt-f1',
            usage: null,
            halted_auto_advance: false,
            quickfix_lane: false,
            quickfix_landing: null,
            resume_eligible: false,
            resume_reason: null,
            landed: false,
            confirmation: 'unmerged',
            open: true,
            ...over
          }
        }
      ]),
      mount
    );
    return mount;
  }

  test('leads the popover with the session summary', () => {
    const mount = mountOpenPopover({ summary: 'API Error: 529 Overloaded' });

    const rows = Array.from(
      mount.querySelectorAll('.rtile__failure-kv > div')
    ).map((row) => row.textContent || '');

    expect(rows[0]).toContain('보고');
    expect(rows[0]).toContain('API Error: 529 Overloaded');
  });

  test('reports how many automatic retries preceded the failure', () => {
    const mount = mountOpenPopover({
      retry: {
        cause: 'session_failed:is_error',
        attempts: 3,
        max: 3,
        next_at: null
      }
    });

    expect(mount.querySelector('.rtile__failure-pop')?.textContent).toContain(
      '자동 재시도 3회 — 같은 오류'
    );
  });

  test('renders the five most recent timeline lines newest first', () => {
    const mount = mountOpenPopover({
      timeline: [
        {
          event_id: 'e5',
          kind: 'attempt_failed',
          summary: '세션 실패 — 529',
          at: 5000
        },
        {
          event_id: 'e4',
          kind: 'merge_step',
          summary: '머지 큐 진입',
          at: 4000
        },
        {
          event_id: 'e3',
          kind: 'guard_warning',
          summary: 'base 동기화 머지',
          at: 3000
        },
        {
          event_id: 'e2',
          kind: 'session_ended',
          summary: '성공 · PR #231',
          at: 2000
        },
        {
          event_id: 'e1',
          kind: 'dispatched',
          summary: 'claude opus 디스패치',
          at: 1000
        }
      ],
      log_path: '/w/beads/UI-f1/sessions/attempt-f1.jsonl'
    });

    const rows = Array.from(
      mount.querySelectorAll('[data-seam="tile-timeline"] li')
    );

    expect(rows).toHaveLength(5);
    expect(rows[0].textContent).toContain('세션 실패 — 529');
    expect(rows[4].textContent).toContain('claude opus 디스패치');
  });

  test('puts the log path after the timeline lines', () => {
    const mount = mountOpenPopover({
      timeline: [
        { event_id: 'e1', kind: 'dispatched', summary: '디스패치', at: 1000 }
      ],
      log_path: '/w/beads/UI-f1/sessions/attempt-f1.jsonl'
    });

    const list = /** @type {HTMLElement} */ (
      mount.querySelector('[data-seam="tile-timeline"]')
    );
    const log = /** @type {HTMLElement} */ (
      mount.querySelector('[data-seam="tile-log-path"]')
    );

    expect(log.textContent).toContain(
      '/w/beads/UI-f1/sessions/attempt-f1.jsonl'
    );
    expect(
      list.compareDocumentPosition(log) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  test('renders 만료됨 for a log the retention policy deleted', () => {
    const mount = mountOpenPopover({
      timeline: [
        {
          event_id: 'e1',
          kind: 'attempt_failed',
          summary: '세션 실패',
          at: 1000
        }
      ],
      log_expired: true
    });

    expect(
      mount.querySelector('[data-seam="tile-log-path"]')?.textContent?.trim()
    ).toBe('만료됨');
  });

  test('renders 읽기 실패 for a log the ladder could not read', () => {
    const mount = mountOpenPopover({
      timeline: [
        {
          event_id: 'e1',
          kind: 'attempt_failed',
          summary: '세션 실패',
          at: 1000
        }
      ],
      log_unreadable: true
    });

    expect(
      mount.querySelector('[data-seam="tile-log-path"]')?.textContent?.trim()
    ).toBe('읽기 실패');
  });

  test('draws no history rows for a failure with no timeline', () => {
    const mount = mountOpenPopover({});

    expect(mount.querySelector('[data-seam="tile-timeline"]')).toBeNull();
    expect(mount.querySelector('[data-seam="tile-log-path"]')).toBeNull();
    expect(
      mount.querySelector('.rtile__failure-pop')?.textContent
    ).not.toContain('이력');
  });

  test('omits the retry history row for a failure with no lineage', () => {
    const mount = mountOpenPopover({});

    expect(
      mount.querySelector('.rtile__failure-pop')?.textContent
    ).not.toContain('자동 재시도');
  });
});

describe('worker failed tile resume button (UI-8h1x §3.3a)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * Render one failed quick_fix tile and hand back its resume button.
   *
   * @param {{ reason: string|null, resume_eligible?: boolean, resume_reason?: string|null }} landing
   * @returns {HTMLButtonElement}
   */
  function renderResumeButton(landing) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningGridTemplate([
        {
          bead_id: 'UI-8h1x',
          attempt_id: 'attempt-1',
          title: 'landing failed',
          runner: 'claude',
          model: 'opus',
          started_at: null,
          failed: true,
          status: 'failed',
          status_label: '실패',
          failure: {
            cause: `quickfix_landing_failed:${landing.reason}`,
            cause_detail: null,
            finished_at: 4000,
            runner: 'claude',
            model: 'opus',
            effort: 'high',
            observed_effort: null,
            speed: 'default',
            attempt_id: 'attempt-1',
            usage: null,
            halted_auto_advance: false,
            quickfix_lane: true,
            quickfix_landing: {
              cursor: 'base_containment',
              reason: landing.reason
            },
            resume_eligible: landing.resume_eligible !== false,
            resume_reason: landing.resume_reason ?? null,
            landed: false,
            confirmation: 'unmerged'
          }
        }
      ]),
      mount
    );

    return /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile__resume')
    );
  }

  test('labels a settlement-natured failure as a settlement re-run', () => {
    const resume = renderResumeButton({ reason: 'containment_unobservable' });

    expect(resume.textContent?.trim()).toBe('↻ 정리 재시도');
    expect(resume.getAttribute('aria-label')).toBe('정리 재시도');
    expect(resume.title).toBe(
      '착지 후 정리 절차를 다시 실행 (세션을 열지 않습니다)'
    );
  });

  test('labels a session-natured failure as a session continuation', () => {
    const resume = renderResumeButton({ reason: 'push_not_contained' });

    expect(resume.textContent?.trim()).toBe('↻ 이어하기');
    expect(resume.getAttribute('aria-label')).toBe('이어하기');
    expect(resume.title).toBe('같은 세션으로 이어서 진행');
  });

  test('labels a coordinator code the reason union does not name as settlement', () => {
    const resume = renderResumeButton({
      reason: 'remote_history_not_monotonic'
    });

    expect(resume.textContent?.trim()).toBe('↻ 정리 재시도');
    expect(resume.getAttribute('aria-label')).toBe('정리 재시도');
  });

  test('carries the resume kind for the click delegation to read', () => {
    const settlement = renderResumeButton({
      reason: 'containment_unobservable'
    });

    expect(settlement.dataset.resumeKind).toBe('settlement');

    const session = renderResumeButton({ reason: 'head_mismatch' });

    expect(session.dataset.resumeKind).toBe('session');
  });

  test('follows the label in the disabled fallback title', () => {
    const resume = renderResumeButton({
      reason: 'containment_unobservable',
      resume_eligible: false,
      resume_reason: null
    });

    expect(resume.disabled).toBe(true);
    expect(resume.title).toBe('정리 재시도 불가');
  });

  test('keeps a recorded refusal reason as the disabled title', () => {
    const resume = renderResumeButton({
      reason: 'containment_unobservable',
      resume_eligible: false,
      resume_reason:
        '이미 이어받은 attempt (child attempt 존재) — 이어하기 불가'
    });

    expect(resume.title).toBe(
      '이미 이어받은 attempt (child attempt 존재) — 이어하기 불가'
    );
  });

  // 두 종류가 갈라 놓는 것은 문구·title·aria뿐이다. 셀렉터와 슬롯은 같아야 하고,
  // UI-6g3t §3.2가 그 셀렉터에 형태 토큰 `.op-btn`을 덧붙였다.
  test('keeps the class and the tile position unchanged across both kinds', () => {
    const settlement = renderResumeButton({
      reason: 'containment_unobservable'
    });
    const session = renderResumeButton({ reason: 'push_not_contained' });

    expect(settlement.className).toBe('op-btn rtile__resume');
    expect(session.className).toBe(settlement.className);
    expect(settlement.closest('.rtile__hd-actions')).not.toBeNull();
    expect(session.closest('.rtile__hd-actions')).not.toBeNull();
  });
});

// UI-jw27 §4: 폐기는 실행 중 타일에서도 시작되므로 그 실패 행도
// [세션에서 이어가기] 출구를 가져야 한다 (UI-18a5 §3.2).
describe('worker running tile — [세션에서 이어가기] (UI-jw27 §4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, any>} [extra]
   */
  function tileWith(extra = {}) {
    return {
      bead_id: 'UI-9',
      attempt_id: 'attempt-9',
      title: 'held work',
      runner: 'claude',
      model: 'opus',
      started_at: 1,
      parked: true,
      status: /** @type {const} */ ('parked'),
      status_label: '세션 대기',
      ...extra
    };
  }

  test('draws the resolve button on a tile carrying a failed discard', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        tileWith({
          resolve_action: true,
          resolve_enabled: true,
          resolve_title: '세션을 띄웁니다'
        })
      ]),
      mount
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile__resolve')
    );

    expect([button.disabled, button.textContent?.trim()]).toEqual([
      false,
      '세션에서 이어가기'
    ]);
  });

  test('draws no resolve button when the adapter passes no field', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([tileWith()]), mount);

    expect(mount.querySelector('.rtile__resolve')).toBeNull();
  });

  test('locks the resolve button while its own click is in flight', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        tileWith({ resolve_action: true, resolve_enabled: false })
      ]),
      mount
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile__resolve')
    );

    expect(button.disabled).toBe(true);
  });
});

describe('실행 타일 조작 형태 (UI-6g3t §3.2·§3.3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, unknown>} [patch]
   * @returns {HTMLElement}
   */
  function tileEl(patch = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        /** @type {any} */ (tileInput(patch)),
        5000,
        null,
        /** @type {any} */ ({ monitor: null })
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  // 홀로 선 `▶`는 옆의 `▤`·`⏸`과 뜻이 갈리므로 라벨을 얻는다 (§3.3).
  test('labels the paused tile resume button', () => {
    const tile = tileEl({ paused: true });

    const resume = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__resume')
    );

    expect(resume.textContent?.replace(/\s+/g, ' ').trim()).toBe('▶ 재개');
  });

  test('gives the paused tile resume button the op token', () => {
    const tile = tileEl({ paused: true });

    const resume = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__resume')
    );

    expect(resume.classList.contains('op-btn')).toBe(true);
  });

  // 이웃 조작도 이제 같은 부품이다 (UI-kqta §3.3): 높이만 맞추던 예외가 사라졌다.
  test('draws the ⏸ neighbour as an icon-only operation part', () => {
    const tile = tileEl({});

    const pause = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__pause')
    );

    expect(pause.textContent?.trim()).toBe('⏸');
    expect(pause.classList.contains('op-btn')).toBe(true);
  });
});
describe('지시 재시작 조작 (UI-qce9 §3.1)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, unknown>} [patch]
   * @returns {HTMLElement}
   */
  function tileEl(patch = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(/** @type {any} */ (tileInput(patch)), 5000, null),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  test('renders no restart button even with the old server verdict', () => {
    const tile = tileEl({
      instructions_restart: { eligible: true, reason: null }
    });

    expect(tile.querySelector('.rtile__restart-instructions')).toBeNull();
  });

  test('renders no resume-instructions button on a paused tile', () => {
    const tile = tileEl({
      paused: true,
      instructions_restart: { eligible: true, reason: null }
    });

    expect(tile.querySelector('.rtile__resume-instructions')).toBeNull();
  });

  test('keeps ▶ 재개 alone on a paused tile with the two-branch tooltip', () => {
    const tile = tileEl({ paused: true });

    const resume = /** @type {HTMLButtonElement} */ (
      tile.querySelector('.rtile__resume')
    );

    expect(resume.title).toBe(
      '같은 세션으로 이어서 재개 — 바로 재개하거나 지시를 입력할 수 있음'
    );
  });

  test('keeps ⏸ and ▤ 세션 in the slot-1 action group of a running tile', () => {
    const tile = tileEl({});

    const actions = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__hd-actions')
    );

    expect(actions.querySelector('.rtile__pause')).not.toBeNull();
    expect(actions.querySelector('.rtile__session')).not.toBeNull();
  });

  test('says no fresh session was started for a prior_attempt resume failure', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        /** @type {any} */ (
          tileInput({
            failed: true,
            failure: failureInput({
              cause: 'resume_failed:transcript_missing',
              continuation_choice: 'prior_attempt',
              open: true
            })
          })
        ),
        5000,
        null
      ),
      mount
    );

    const popover = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__failure-pop')
    );

    expect(popover.textContent).toContain(
      '이어갈 세션 기록이 없습니다. 새 세션을 자동으로 시작하지 않았습니다.'
    );
  });

  test('says no fresh session was started for a prior_attempt session failure', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        /** @type {any} */ (
          tileInput({
            failed: true,
            failure: failureInput({
              cause: 'session_failed:turn_failed',
              continuation_choice: 'prior_attempt',
              open: true
            })
          })
        ),
        5000,
        null
      ),
      mount
    );

    const popover = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__failure-pop')
    );

    expect(popover.textContent).toContain(
      '새 세션을 자동으로 시작하지 않았습니다.'
    );
    expect(popover.textContent).not.toContain('이어갈 세션 기록이 없습니다.');
  });
});

// discard-abandon §3.1: 폐기 실패는 실행 중·실패·파킹 타일 어디서나 나므로,
// 그 출구도 대기 행뿐 아니라 타일에 있어야 한다. 없으면 실행 중이던 bead는
// 어느 화면에서도 포기할 수 없다.
describe('worker running tile — [폐기 포기] (discard-abandon §3.1)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * One failed discard projection whose abandon slot is open.
   *
   * @param {Record<string, any>} [extra]
   */
  function failedDiscard(extra = {}) {
    return {
      action: true,
      enabled: true,
      label: '재시도',
      title: '폐기 실패: dirty_submodule — 정리 후 재시도하세요',
      error: 'dirty_submodule',
      operation: {
        operation_id: 'op-1',
        phase: 'requested',
        kind: 'discard'
      },
      abandon: {
        action: true,
        label: '폐기 포기',
        title: '실패한 폐기 작업을 포기합니다'
      },
      ...extra
    };
  }

  /**
   * @param {Record<string, any>} [extra]
   */
  function failedTile(extra = {}) {
    return {
      bead_id: 'UI-7',
      attempt_id: 'attempt-7',
      title: 'failed work',
      runner: 'claude',
      model: 'opus',
      started_at: 1,
      failed: true,
      status: /** @type {const} */ ('failed'),
      status_label: '실패',
      ...extra
    };
  }

  test('orders 세션에서 이어가기 · 워커로 이어가기 · 폐기 포기 on a failed tile', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        failedTile({
          discard: failedDiscard(),
          resolve_action: true,
          resolve_enabled: true,
          pair_anchor: 'discard'
        })
      ]),
      mount
    );

    const order = Array.from(
      mount.querySelectorAll(
        '.rtile__discard, .rtile__discard-abandon, .rtile__resolve'
      )
    ).map((el) => el.className);

    expect(order).toEqual([
      'op-btn rtile__resolve',
      'op-btn op-btn--danger rtile__discard',
      'op-btn rtile__discard-abandon'
    ]);
  });

  test('carries the operation identity the abandon request needs', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([failedTile({ discard: failedDiscard() })]),
      mount
    );

    const button = /** @type {HTMLButtonElement} */ (
      mount.querySelector('.rtile__discard-abandon')
    );

    expect([
      button.dataset.operationId,
      button.dataset.operationKind,
      button.dataset.lastError,
      button.textContent?.trim()
    ]).toEqual(['op-1', 'discard', 'dirty_submodule', '폐기 포기']);
  });

  test('draws no abandon button while the discard is still running', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        failedTile({
          discard: failedDiscard({
            label: '폐기',
            error: null,
            operation: { operation_id: 'op-1', phase: 'requested' },
            abandon: { action: false, label: '폐기 포기', title: '' }
          })
        })
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__discard-abandon')).toBeNull();
    expect(mount.querySelector('.rtile__discard')).not.toBeNull();
  });

  test('offers the abandon button in the parked action foot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-8',
          attempt_id: 'attempt-8',
          title: 'parked work',
          runner: 'claude',
          model: 'opus',
          started_at: 1,
          parked: true,
          resolve_action: true,
          resolve_enabled: true,
          status: /** @type {const} */ ('parked'),
          status_label: '세션 대기',
          discard: failedDiscard({ label: '백업 정리 재시도' })
        }
      ]),
      mount
    );

    const foot = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__foot')
    );

    expect(
      Array.from(foot.querySelectorAll('button')).map((el) =>
        el.textContent?.trim()
      )
    ).toEqual(['백업 정리 재시도', '폐기 포기', '세션에서 이어가기']);
  });
});

// `↻ 지금 재시도`는 큐 헤더가 없어진 뒤 예약된 재시도를 앞당기는 유일한 자리다
// (UI-01wh §3.3). 재료는 서 있는 환경 보류의 `hold_since` 하나다.
describe('retry_wait tile hold retry (UI-01wh §3.3)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, any>} [patch]
   * @returns {HTMLElement}
   */
  function renderRetryTile(patch = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningGridTemplate([
        /** @type {any} */ ({
          bead_id: 'UI-r1',
          attempt_id: 'attempt-r1',
          title: '환경 장애 재시도 대기',
          runner: 'codex',
          model: 'sol',
          started_at: 1000,
          retry_wait: true,
          status: 'retry_wait',
          status_label: '재시도 대기',
          retry: { cause: 'x', attempts: 2, max: 3, next_at: 5000 },
          ...patch
        })
      ]),
      mount
    );
    return mount;
  }

  test('omits the retired queue retry even with an old hold clock', () => {
    const mount = renderRetryTile({ hold_since: 4242 });

    expect(mount.querySelector('.rtile__hold-retry')).toBeNull();
  });

  test('draws no retry button when no hold stands', () => {
    const mount = renderRetryTile({});

    expect(mount.querySelector('.rtile__hold-retry')).toBeNull();
  });

  // 큐 전체 재시도는 은퇴한 채로 남고, 그 자리에는 Bead 단위 [지금 재시도]가
  // [폐기] 앞에 선다 (2026-10-01 stall-reconcile D9).
  test('keeps discard after the bead retry without the retired queue retry', () => {
    const mount = renderRetryTile({
      hold_since: 4242,
      discard: {
        action: true,
        enabled: true,
        label: '폐기',
        title: '백업 후 정리',
        operation: null
      }
    });

    const labels = Array.from(
      /** @type {HTMLElement} */ (
        mount.querySelector('.rtile__foot')
      ).querySelectorAll('button')
    ).map((button) => button.textContent?.trim());

    expect(labels).toEqual(['지금 재시도', '폐기']);
  });
});

// ✕ Worker에서 내리기 (2026-10-01 stall-reconcile D7): 실행 중 칸의 구현 attempt
// 타일 중 정해진 종류에만, 슬롯 1 조작의 오른쪽 끝에 선다.
describe('실행 중 칸의 ✕ 내리기 (stall-reconcile D7)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  const EXTERNAL_REASON = {
    kind: 'external_job',
    subject: { root_dir: '/repo', bead_id: 'UI-t1' },
    headline: 'wallace 작업 42 · RUNNING',
    release: '완료되면 같은 세션을 이어간다',
    verdict: 'normal',
    targets: [],
    actions: []
  };

  /** @type {Record<string, Record<string, any>>} */
  const WITHDRAWABLE = {
    running: { status: 'running' },
    paused: { status: 'paused', paused: true },
    provider_hold: {
      status: 'paused',
      provider_hold: true,
      hold: { kind: 'outage', detail: 'overloaded_529' }
    },
    retry_wait: {
      status: 'retry_wait',
      retry_wait: true,
      retry: { cause: 'env', attempts: 1, max: 3, next_at: 9000 }
    },
    failed: { status: 'failed', failed: true, failure: failureInput() },
    orphaned: { status: 'orphaned', failed: true, failure: failureInput() },
    external_job: {
      status: 'waiting',
      waiting: true,
      wait: { summary: null, blockers: [], since: null },
      wait_reasons: [EXTERNAL_REASON]
    }
  };

  /** @type {Record<string, Record<string, any>>} */
  const KEPT = {
    parked: { status: 'parked', parked: true, failure: failureInput() },
    recovery_wait: {
      status: 'waiting',
      waiting: true,
      wait: {
        summary: null,
        blockers: [],
        since: null,
        cause: 'recovery_wait',
        recovery: {
          classification: 'retryable',
          disposition: 'session',
          reason: 'stalled',
          no_progress: null,
          label: '세션 대기',
          sentence: '세션 확인 필요'
        }
      }
    },
    conversation: {
      status: 'failed',
      failed: true,
      failure: failureInput(),
      interactive_sessions: [
        {
          key: 'UI-t1:resolve',
          kind: 'resolve',
          provider: 'claude',
          session_id: 'sid',
          mode: 'fork',
          source: 'attempt',
          fallback_reason: null,
          attempt_id: 'a1',
          tmux_session: 'bdui',
          tmux_window: 'resolve-UI-t1',
          state: 'live',
          settled_at: null,
          launched_at: 1,
          closing: false
        }
      ]
    },
    session: { kind: 'session', attempt_id: '', status: 'in_progress' },
    conflict_resolution: { status: 'running', conflict_resolution: true }
  };

  /**
   * @param {Record<string, any>} patch
   * @returns {HTMLElement}
   */
  function renderTile(patch) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(runningTile(/** @type {any} */ (tileInput(patch)), 5000), mount);
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  test.each(Object.keys(WITHDRAWABLE))(
    'puts ✕ at the right end of slot 1 on a %s tile',
    (kind) => {
      const tile = renderTile(WITHDRAWABLE[kind]);

      const actions = /** @type {HTMLElement} */ (
        tile.querySelector('.rtile__hd-actions')
      );
      expect(
        actions.lastElementChild?.classList.contains('rtile__withdraw')
      ).toBe(true);
    }
  );

  test.each(Object.keys(KEPT))('draws no ✕ on a %s tile', (kind) => {
    const tile = renderTile(KEPT[kind]);

    expect(tile.querySelector('.rtile__withdraw')).toBeNull();
  });

  test('names the withdrawal in the tooltip and the accessible label', () => {
    const tile = renderTile(WITHDRAWABLE.running);

    const button = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__withdraw')
    );
    expect([
      button.getAttribute('title'),
      button.getAttribute('aria-label'),
      button.textContent?.trim()
    ]).toEqual([
      'Worker에서 내리기 — 작업은 보존',
      'Worker에서 내리기 — 작업은 보존',
      '✕'
    ]);
  });

  test('uses the waiting-row ✕ button part', () => {
    const tile = renderTile(WITHDRAWABLE.running);

    const button = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__withdraw')
    );
    expect(
      ['op-btn', 'op-btn--icon', 'op-btn--ghost'].every((name) =>
        button.classList.contains(name)
      )
    ).toBe(true);
  });

  test('keeps ✕ off a tile whose discard is under way', () => {
    const tile = renderTile({
      ...WITHDRAWABLE.failed,
      discard: {
        ...discardInput(),
        enabled: false,
        operation: { operation_id: 'op-1', phase: 'requested' }
      }
    });

    expect(tile.querySelector('.rtile__withdraw')).toBeNull();
  });

  test('keeps ✕ on a running tile whose session id is not recorded yet', () => {
    const tile = renderTile({ status: 'running', can_pause: false });

    expect(tile.querySelector('.rtile__withdraw')).not.toBeNull();
  });
});

// [지금 재시도] (2026-10-01 stall-reconcile D9): `retry_wait` 타일 슬롯 6 foot의
// [폐기] 앞이다.
describe('retry_wait 타일의 [지금 재시도] (stall-reconcile D9)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, any>} [patch]
   * @returns {HTMLElement}
   */
  function renderRetry(patch = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        /** @type {any} */ (
          tileInput({
            status: 'retry_wait',
            retry_wait: true,
            retry: { cause: 'env', attempts: 1, max: 3, next_at: 9000 },
            ...patch
          })
        ),
        5000
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  test('puts [지금 재시도] before [폐기] in the action foot', () => {
    const tile = renderRetry({ discard: discardInput() });

    expect(
      Array.from(tile.querySelectorAll('.rtile__foot button'), (button) =>
        button.textContent?.trim()
      )
    ).toEqual(['지금 재시도', '폐기']);
  });

  test('draws [지금 재시도] without a discard button', () => {
    const tile = renderRetry();

    expect(
      Array.from(tile.querySelectorAll('.rtile__foot button'), (button) =>
        button.textContent?.trim()
      )
    ).toEqual(['지금 재시도']);
  });

  test('uses the operation token on [지금 재시도]', () => {
    const tile = renderRetry();

    const button = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__retry-now')
    );
    expect(button.classList.contains('op-btn')).toBe(true);
  });

  test('keeps [지금 재시도] off a tile whose discard is under way', () => {
    const tile = renderRetry({
      discard: {
        ...discardInput(),
        enabled: false,
        operation: { operation_id: 'op-1', phase: 'requested' }
      }
    });

    expect(tile.querySelector('.rtile__retry-now')).toBeNull();
  });

  test('draws no [지금 재시도] on a running tile', () => {
    const tile = renderRetry({ status: 'running', retry_wait: false });

    expect(tile.querySelector('.rtile__retry-now')).toBeNull();
  });
});

// 보류 기록이 없는 공급자 보류 타일 (2026-10-01 stall-reconcile D5): 슬롯 1의 같은
// 배타 배지 자리에서 문구만 바뀌고, 재시도 중이면 슬롯 7에 다음 시각이 선다.
describe('공급자 보류 타일의 자동 재개 거절 배지 (stall-reconcile D5)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  /**
   * @param {Record<string, any>} [hold_patch]
   * @returns {HTMLElement}
   */
  function renderHeld(hold_patch = {}) {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        /** @type {any} */ (
          tileInput({
            status: 'paused',
            provider_hold: true,
            hold: { kind: 'outage', detail: 'overloaded_529', ...hold_patch }
          })
        ),
        5000
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  const RETRY = {
    auto_resume: 'refused:bd_snapshot_failed',
    auto_resume_refusal: {
      kind: 'transient',
      next_at: 9000,
      reason: 'bd_snapshot_failed'
    }
  };

  test('draws the automatic retry badge in slot 1', () => {
    const tile = renderHeld(RETRY);

    expect(
      tile
        .querySelector('.rtile__hd .wait-verdict summary')
        ?.textContent?.trim()
    ).toBe('⏳ 자동 재개 재시도');
  });

  test('puts the next retry time on the slot 7 line', () => {
    const tile = renderHeld(RETRY);

    expect(tile.querySelector('.wait-reason__times')?.textContent?.trim()).toBe(
      `다음 ${formatClockLocal(9000, 5000)}`
    );
  });

  test('draws the action badge for a permanent refusal', () => {
    const tile = renderHeld({
      auto_resume: 'refused:worktree_missing',
      auto_resume_refusal: {
        kind: 'permanent',
        next_at: null,
        reason: 'worktree_missing'
      }
    });

    const summary = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__hd .wait-verdict summary')
    );
    expect([
      summary.textContent?.trim(),
      summary.getAttribute('data-verdict')
    ]).toEqual([
      '⛔ 조치 필요 · 자동 재개 거부 worktree_missing',
      'action_required'
    ]);
  });

  test('draws no slot 7 time for a permanent refusal', () => {
    const tile = renderHeld({
      auto_resume_refusal: {
        kind: 'permanent',
        next_at: null,
        reason: 'worktree_missing'
      }
    });

    expect(tile.querySelector('.wait-reason__times')).toBeNull();
  });

  test('keeps the hold badge when no refusal is projected', () => {
    const tile = renderHeld({ auto_resume: 'refused:bd_snapshot_failed' });

    expect(
      tile
        .querySelector('.rtile__hd .wait-verdict summary')
        ?.textContent?.trim()
    ).toBe('⏳ 공급자 보류');
  });
});

describe('plan 묶음 칩 on the running tile (UI-ruwu §2)', () => {
  const PLAN_GROUP = {
    plan_path: 'docs/superpowers/plans/2026-09-29-plan-landing.md',
    slug: 'plan-landing',
    index: 2,
    total: 3,
    members: [
      { id: 'UI-p1', anchor: 'Phase 1', status: 'closed', blocked_by: [] },
      {
        id: 'UI-p2',
        anchor: 'Phase 2-3',
        status: 'in_progress',
        blocked_by: []
      },
      { id: 'UI-p3', anchor: 'Phase 4', status: 'open', blocked_by: ['UI-p2'] }
    ]
  };

  /**
   * @param {Record<string, any>} [patch]
   * @param {any} [monitor]
   * @returns {HTMLElement}
   */
  function renderPlanTile(patch = {}, monitor = null) {
    document.body.innerHTML = '<div id="m"></div>';
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));
    render(
      runningTile(
        /** @type {any} */ (tileInput({ bead_id: 'UI-p2', ...patch })),
        5000,
        null,
        { monitor }
      ),
      mount
    );
    return /** @type {HTMLElement} */ (mount.querySelector('.rtile'));
  }

  test('draws the 5a chip text on the coordinate line', () => {
    const tile = renderPlanTile({ plan_group: PLAN_GROUP });

    expect(
      tile
        .querySelector(
          '.rtile__meta .worker-chips--coords [data-chip-key="plan"]'
        )
        ?.textContent?.trim()
    ).toBe('plan plan-landing 2/3');
  });

  test('draws the chip alone on the meta row of an otherwise bare tile', () => {
    const tile = renderPlanTile({ plan_group: PLAN_GROUP });

    expect(tile.querySelector('.rtile__meta')).not.toBeNull();
  });

  test('stands after the lane origin chip and before the route chip', () => {
    const tile = renderPlanTile({
      plan_group: PLAN_GROUP,
      lane_origin: { kind: 'serial', index: 2 },
      workflow: /** @type {any} */ ({
        chips: { route: 'spec_backed', route_source: 'explicit' }
      })
    });

    expect(
      Array.from(tile.querySelectorAll('.worker-chips--coords > *'), (chip) =>
        chip.classList.contains('ctl-chip--lane')
          ? 'lane'
          : chip.classList.contains('worker-card__plan')
            ? 'plan'
            : chip.classList.contains('ctl-chip--route')
              ? 'route'
              : 'other'
      )
    ).toEqual(['lane', 'plan', 'route']);
  });

  test('draws the chip on a Monitor tile too', () => {
    const tile = renderPlanTile(
      { plan_group: PLAN_GROUP },
      { repo: 'repo-a', root_dir: '/tmp/repo-a' }
    );

    expect(tile.querySelector('[data-chip-key="plan"]')).not.toBeNull();
  });

  test('draws no chip without a plan group', () => {
    const tile = renderPlanTile({});

    expect(tile.querySelector('[data-chip-key="plan"]')).toBeNull();
  });

  test('keeps the bare tile free of an empty meta row', () => {
    const tile = renderPlanTile({});

    expect(tile.querySelector('.rtile__meta')).toBeNull();
  });

  test('opens the popup in the meta block when the plan chip is open', () => {
    const tile = renderPlanTile({
      plan_group: PLAN_GROUP,
      chip_popover: {
        chip_key: 'plan',
        content: { title: 'plan plan-landing', lines: ['UI-p2'] }
      }
    });

    expect(tile.querySelector('.rtile__meta .chip-popover')).not.toBeNull();
    expect(
      tile
        .querySelector('[data-chip-key="plan"]')
        ?.getAttribute('aria-expanded')
    ).toBe('true');
  });
});

describe('shared running tile input (UI-yvhx)', () => {
  test.each([
    [{ run_state: 'failed', status: 'failed' }, '실패'],
    [{ run_state: 'failed', status: 'orphaned' }, '중단됨'],
    [{ run_state: 'parked' }, '확인 필요'],
    [{ run_state: 'retry_wait' }, '재시도 대기'],
    [{ run_state: 'waiting', wait: { cause: 'base_moved' } }, '반영 대기'],
    [{ run_state: 'waiting', wait: { cause: 'blocked' } }, '선행 대기'],
    [
      {
        run_state: 'waiting',
        wait: { cause: 'base_moved', recovery: { label: '복구 대기' } }
      },
      '복구 대기'
    ],
    [{ run_state: 'provider_hold' }, '공급자 보류'],
    [{ run_state: 'running', status_label: '실행 중' }, '실행 중']
  ])('words the status of %j as %s', (item, label) => {
    const tile = runningTileInput({ id: 'A-1', attempt_id: 'att', ...item });

    expect(tile.status_label).toBe(label);
  });

  test('keeps the lane item fields a hand-picked list would drop', () => {
    const tile = runningTileInput({
      id: 'A-1',
      run_state: 'running',
      priority: 1,
      created_at: 5,
      base_exception: '→ release',
      landing: { step: 'push', label: '푸시', index: 1, total: 3 }
    });

    expect([
      tile.priority,
      tile.created_at,
      tile.base_exception,
      tile.landing?.step
    ]).toEqual([1, 5, '→ release', 'push']);
  });

  test('marks the run-state flags and the view-local failure detail', () => {
    const tile = runningTileInput(
      {
        id: 'A-1',
        attempt_id: 'att-1',
        run_state: 'failed',
        failure: { cause: 'x' }
      },
      { open_failure_detail: 'att-1' }
    );

    expect([tile.failed, tile.parked, tile.failure?.open]).toEqual([
      true,
      false,
      true
    ]);
  });
});
