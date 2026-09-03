import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  formatAttemptOrchestrationChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import {
  providerHoldBadgeText,
  runningGridTemplate,
  runningTile
} from './running-grid.js';

describe('worker failed running tile template', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
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
          usage: { input_tokens: 1 },
          rollup: /** @type {any} */ ({ total: 1, done: 0 })
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

  test('renders the child rollup collapsed with its current child line', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-7',
          attempt_id: 'attempt-7',
          title: 'parent work',
          runner: 'claude',
          model: 'opus',
          started_at: null,
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
        }
      ]),
      mount
    );

    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));

    expect(
      tile.querySelector('.board-card__roll-toggle')?.textContent
    ).toContain('children 1/3');
    expect(
      tile.querySelector('.board-card__roll-current')?.textContent
    ).toContain('T2: 서버 배선');
    expect(tile.querySelector('.board-card__roll-list')).toBeNull();
    expect(tile.querySelector('.rtile__child')).toBeNull();
  });

  test('expands the child rollup list when the tile says it is expanded', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-8',
          attempt_id: 'attempt-8',
          title: 'parent work',
          runner: 'claude',
          model: 'opus',
          started_at: null,
          rollup_expanded: true,
          rollup: {
            total: 2,
            count: 0,
            current: null,
            children: [
              { id: 'UI-8.1', title: 'T1', status: 'open' },
              { id: 'UI-8.2', title: 'T2', status: 'open' }
            ]
          }
        }
      ]),
      mount
    );

    const rows = mount.querySelectorAll('.board-card__roll-child');

    expect(rows).toHaveLength(2);
    expect(
      Array.from(
        rows,
        (row) => /** @type {HTMLElement} */ (row).dataset.childId
      )
    ).toEqual(['UI-8.1', 'UI-8.2']);
  });

  test('omits the rollup block when the tile has no rollup', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        {
          bead_id: 'UI-9',
          attempt_id: 'attempt-9',
          title: 'childless work',
          runner: 'claude',
          model: 'opus',
          started_at: null,
          rollup: null
        }
      ]),
      mount
    );

    expect(mount.querySelector('.board-card__roll')).toBeNull();
    expect(mount.querySelector('.rtile__child')).toBeNull();
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
  test('renders no repo badge, stepper, activity or delegation line', () => {
    const tile = shape(runningTile(tileInput(), 5000, null));

    expect(tile).not.toContain('rtile__repo');
    expect(tile).not.toContain('rtile__activity');
    expect(tile).not.toContain('rtile__legs');
    expect(tile).not.toContain('stepper');
    expect(tile).toMatchInlineSnapshot(
      `"<div class="rtile" data-attempt-id="a1" data-bead-id="UI-t1"> <div class="rtile__hd"> <span aria-hidden="true" class="rtile__dot"></span> <span class="rtile__id" title="클릭하면 ID 복사">UI-t1</span>  <div class="rtile__hd-actions"> <span class="rtile__elapsed">4s</span> <button aria-label="라이브 세션 열기" class="rtile__session" title="라이브 세션 열기" type="button"> ▤ 세션 </button> <button aria-label="일시정지" class="rtile__pause" title="일시정지 (같은 세션으로 재개 가능)" type="button"> ⏸ </button>  </div> </div> <div class="rtile__title">실행 중</div>        <div aria-hidden="true" class="rtile__accent"></div>  </div>"`
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
    serial_lane_id: /** @type {const} */ ('s1'),
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

  test('adds the repo badge and serial lane chip to the meta row', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ (monitor)
      }),
      mount
    );
    const tile = /** @type {HTMLElement} */ (mount.querySelector('.rtile'));

    expect(tile.querySelector('.rtile__meta .rtile__repo')?.textContent).toBe(
      'repo-a'
    );
    expect(tile.querySelector('.rtile__meta .rtile__lane')?.textContent).toBe(
      's1'
    );
    expect(tile.querySelector('.rtile__hd .rtile__repo')).toBeNull();
    expect(tile.querySelector('.rtile__hd .rtile__lane')).toBeNull();
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

    expect(badge?.textContent).toBe('세션');
    expect(badge?.getAttribute('title')).toBe(
      'Worker가 아닌 세션이 in_progress로 잡은 이슈'
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

  // 좌표 칩(레포 · 레인)도 슬롯 5다 (UI-251y §3.1): 오버레이가 그것만 실어도
  // 줄은 선다.
  test('keeps the meta row for the monitor coordinate chip alone', () => {
    const tile = renderSession();

    expect(tile.querySelector('.rtile__meta .rtile__repo')?.textContent).toBe(
      'repo-a'
    );
    expect(tile.querySelector('.rtile__hd .rtile__repo')).toBeNull();
  });

  test('renders neither delegation chips nor a token line', () => {
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

    expect(tile.querySelector('.rtile__legs')).toBeNull();
    expect(tile.querySelector('.worker-usage')).toBeNull();
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
  const MONITOR = {
    repo: 'repo-a',
    root_dir: '/tmp/repo-a',
    serial_lane_id: /** @type {const} */ ('s2')
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

  test('orders the meta row repo, lane, route, exec then usage', () => {
    const tile = renderTile(
      {
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
      'worker-card__repo rtile__repo',
      'rtile__lane',
      'ctl-chip ctl-chip--route',
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
    const tile = renderTile({ conflict_resolution: true, paused: true });

    expect(
      tile.querySelector('.rtile__hd .worker-mini__badge')?.textContent
    ).toBe('충돌 해소 일시정지');
  });

  test('draws the base exception badge in the header, not the meta row', () => {
    const tile = renderTile({ base_exception: 'base: release-1' });

    expect(
      tile.querySelector('.rtile__hd .worker-mini__badge')?.textContent
    ).toBe('base: release-1');
    expect(tile.querySelector('.rtile__meta')).toBeNull();
  });

  // 슬롯 3(진행)은 활동·위임 줄 하나가 아니다 — 자식 롤업과 landing 진행도
  // 같은 슬롯이므로 의존 칩은 그 셋 모두의 뒤에 선다 (§2).
  test('draws the dependency chips after every progress line', () => {
    const tile = renderTile(
      {
        rollup: /** @type {any} */ ({
          total: 2,
          count: 1,
          current: { id: 'UI-t1.2', title: 'T2' },
          children: [
            { id: 'UI-t1.1', title: 'T1', status: 'closed' },
            { id: 'UI-t1.2', title: 'T2', status: 'in_progress' }
          ]
        }),
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
    expect(deps).toBeGreaterThan(order.indexOf('board-card__roll'));
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

    expect(head.querySelector('.rtile__repo')).toBeNull();
    expect(head.querySelector('.rtile__lane')).toBeNull();
    expect(head.querySelector('.ctl-chip--route')).toBeNull();
    expect(head.querySelector('.worker-usage')).toBeNull();
  });
});

describe('worker running tile route chip (UI-yrzu §7.2)', () => {
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

  test('places the session button after the clock and before the 세션 badge', () => {
    const tile = renderSession({ session_refs: [view()] });
    const actions = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__hd-actions')
    );
    const order = Array.from(actions.children).map((el) => el.className);

    expect(order).toEqual([
      'rtile__elapsed',
      'rtile__session',
      'rtile__session-badge'
    ]);
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

    expect(tile.querySelector('.ctl-chip--sref')?.textContent).toBe(
      'claude · a1b2c3d4'
    );
    expect(chips.indexOf('ctl-chip ctl-chip--sref')).toBeLessThan(
      chips.indexOf('ctl-chip ctl-chip--exec-receipt')
    );
  });

  test('titles the chip with the full contract coordinate', () => {
    const tile = renderSession({ session_refs: [view()] });

    expect(tile.querySelector('.ctl-chip--sref')?.getAttribute('title')).toBe(
      'claude:a1b2c3d4-5e6f@mac-studio'
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
      'claude:a1b2c3d4-5e6f@mac-studio · 이력 2'
    );
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

describe('복잡 chip on the running tile (UI-sbum §3)', () => {
  /** @type {import('../../utils/rec-settings.js').RecSettings} */
  const REC = {
    reasons: ['verification_by_judgment'],
    rec: { orchestration_model: 'fable' },
    state: 'diverged'
  };

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
    const tile = renderTile({ rec: REC });

    const chip = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__meta .worker-card__rec')
    );

    expect(chip.textContent?.trim()).toBe('복잡');
    expect(chip.title).toBe(
      '복잡한 작업으로 판정됨\n사유: 테스트가 못 잡고 리뷰어의 추론으로만 검증할 수 있다\n상태: 추천과 다름'
    );
    expect(chip.dataset.state).toBe('diverged');
  });

  test('draws the chip in the session tile meta line', () => {
    const tile = renderTile({
      kind: 'session',
      attempt_id: null,
      runner: null,
      model: null,
      rec: REC
    });

    expect(tile.querySelector('.rtile__meta .worker-card__rec')).not.toBeNull();
  });

  test('omits the chip when the bead has no recommendation', () => {
    const tile = renderTile({ rec: null });

    expect(tile.querySelector('.worker-card__rec')).toBeNull();
  });

  test('turns the tile chip into a 판정 button as well (UI-8x90 §4.5)', () => {
    const tile = renderTile({ rec: REC });

    const chip = /** @type {HTMLElement} */ (
      tile.querySelector('.worker-card__rec')
    );

    expect(chip.tagName).toBe('BUTTON');
    expect(chip.dataset.chipKey).toBe('rec');
  });

  test('draws the 사유 popup inside the tile meta line', () => {
    const tile = renderTile({
      rec: REC,
      chip_popover: {
        chip_key: 'rec',
        content: { title: '복잡한 작업으로 판정됨', lines: ['한 줄'] }
      }
    });

    expect(tile.querySelector('.rtile__meta .chip-popover')).not.toBeNull();
    expect(
      tile.querySelector('.worker-card__rec')?.getAttribute('aria-expanded')
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
        resume_reason: '세션 대기 — [세션에서 해결]로 문의를 이어갑니다',
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
      tile.querySelector('.rtile__hd .rtile__held-badge')?.textContent
    ).toBe('⏸ 세션 대기');
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

  test('offers 세션에서 해결 and 폐기 in the parked action foot', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([parkTile()]), mount);

    const foot = /** @type {HTMLElement} */ (
      mount.querySelector('.rtile__foot')
    );
    expect(foot.querySelector('.rtile__resolve')?.textContent?.trim()).toBe(
      '세션에서 해결'
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
    expect(tile.querySelector('.rtile__held-badge')?.textContent).toBe(
      `↻ 재시도 대기 2/3 · ${new Date(next_at).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    );
    expect(tile.classList.contains('rtile--retry-wait')).toBe(true);
    // 투영이 폐기를 주지 않으면 액션 foot 자체가 재료 없는 줄이다.
    expect(tile.querySelector('.rtile__foot')).toBeNull();
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

    expect(mount.querySelector('.rtile__held-badge')?.textContent).toBe(
      '↻ 재시도 대기'
    );
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

  test('formats the outage badge with its next probe', () => {
    const clock = new Date(3000).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const text = providerHoldBadgeText({
      kind: 'outage',
      detail: 'overloaded_529',
      next_probe_at: 3000
    });

    expect(text).toBe(`⚠️ 공급자 장애 · 다음 프로브 ${clock}`);
  });

  test('formats the usage badge with an account alias', () => {
    const clock = new Date(4000).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const text = providerHoldBadgeText({
      kind: 'usage_limit',
      detail: 'usage_limit',
      resets_at: 4000,
      target: { account: 'one@example.com', account_alias: '업무' }
    });

    expect(text).toBe(`⏳ 한도 대기 ${clock} · 업무`);
  });

  test('formats an unknown reset with the manual suffix', () => {
    const text = providerHoldBadgeText({
      kind: 'usage_limit',
      detail: 'usage_limit',
      auto_resume: 'disarmed'
    });

    expect(text).toBe('⏳ 한도 대기 · 리셋 미상 · 수동 조치');
  });

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
      mount.querySelector('.rtile__provider-hold-pop')
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
      mount.querySelector('.rtile__provider-hold-pop')
    );

    expect(popover.textContent).toContain(
      '계정 전환 안 함 · 조건을 만족하는 다른 계정 없음'
    );
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
      mount.querySelector('.rtile__provider-hold-pop')
    );

    expect(popover.textContent).toContain('계정 전환 안 함 · 자동 전환 꺼짐');
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
      tile.querySelector('.rtile__hd .rtile__held-badge')?.textContent
    ).toBe('⛓ 선행 대기');
    expect(tile.classList.contains('rtile--failed')).toBe(false);
  });

  test('labels the status instead of running a clock', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(runningGridTemplate([waitTile()]), mount);

    expect(mount.querySelector('.rtile__elapsed')?.textContent).toBe(
      '선행 대기'
    );
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

    expect(resume.textContent?.trim()).toBe('↻ 정산 재개');
    expect(resume.getAttribute('aria-label')).toBe('정산 재개');
    expect(resume.title).toBe('착지 정산을 다시 실행');
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

    expect(resume.textContent?.trim()).toBe('↻ 정산 재개');
    expect(resume.getAttribute('aria-label')).toBe('정산 재개');
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
    expect(resume.title).toBe('정산 재개 불가');
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

// UI-jw27 §4: 폐기는 실행 중 타일에서도 시작되므로 그 실패 행도 [세션에서 해결]
// 출구를 가져야 한다. 필드는 Worker 어댑터만 켠다 — Monitor는 넘기지 않는다.
describe('worker running tile — [세션에서 해결] (UI-jw27 §4)', () => {
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
      '세션에서 해결'
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

  test('leaves the ⏸ neighbour icon-only', () => {
    const tile = tileEl({});

    const pause = /** @type {HTMLElement} */ (
      tile.querySelector('.rtile__pause')
    );

    expect(pause.textContent?.trim()).toBe('⏸');
    expect(pause.classList.contains('op-btn')).toBe(false);
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

  test('orders 재시도 · 폐기 포기 · 세션에서 해결 on a failed tile', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      runningGridTemplate([
        failedTile({
          discard: failedDiscard(),
          resolve_action: true,
          resolve_enabled: true
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
      'rtile__discard',
      'rtile__discard-abandon',
      'rtile__resolve'
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
    ).toEqual(['백업 정리 재시도', '폐기 포기', '세션에서 해결']);
  });
});
