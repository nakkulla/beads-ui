import { render } from 'lit-html';
import { beforeEach, describe, expect, test } from 'vitest';
import {
  formatAttemptOrchestrationChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import {
  bannersTemplate,
  runningGridTemplate,
  runningTile
} from './running-grid.js';

describe('worker failed running tile template', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('renders failed controls and an ineligible resume tooltip', () => {
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
          resume_eligible: false,
          resume_reason: 'session_id 없는 구 attempt — 이어하기 불가',
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
    expect(tile.querySelector('.rtile__elapsed')?.textContent).toBe('실패');
    expect(resume.disabled).toBe(true);
    expect(resume.title).toBe('session_id 없는 구 attempt — 이어하기 불가');
    expect(tile.querySelector('.rtile__dismiss')?.getAttribute('title')).toBe(
      '실패 알림 닫기 — 레인에는 남습니다'
    );
    expect(tile.querySelector('.rtile__session')).toBeNull();
    expect(tile.querySelector('.rtile__pause')).toBeNull();
    expect(tile.querySelector('.rtile__stop')).toBeNull();
    expect(tile.querySelector('.rtile__discard')).not.toBeNull();
    expect(tile.querySelector('.rtile__accent')).toBeNull();
  });

  test('labels orphaned tiles as 중단됨', () => {
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
          resume_eligible: true,
          resume_reason: null
        }
      ]),
      mount
    );

    expect(mount.querySelector('.rtile__elapsed')?.textContent).toBe('중단됨');
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

  test('renders no cleanup banner — the timeline owns stopped cleanups', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(bannersTemplate({}), mount);

    expect(mount.querySelector('.worker-banner--cleanup')).toBeNull();
  });

  test('says a session failure in the shared failure vocabulary', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      bannersTemplate({
        failure: /** @type {any} */ ({
          repo: 'beads-ui',
          bead_id: 'UI-3',
          reason: 'verify_failed:gh_observation_failed',
          discard: { action: false }
        })
      }),
      mount
    );

    expect(
      mount.querySelector('.worker-banner--failure')?.textContent
    ).toContain('검증 실패 — GitHub에서 PR 상태를 읽지 못했습니다.');
  });

  test('keeps the raw failure code inside the banner details block', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      bannersTemplate({
        failure: /** @type {any} */ ({
          repo: 'beads-ui',
          bead_id: 'UI-3',
          reason: 'verify_failed:gh_observation_failed',
          discard: { action: false }
        })
      }),
      mount
    );

    expect(mount.querySelector('.worker-banner__raw dd')?.textContent).toBe(
      'verify_failed:gh_observation_failed'
    );
  });

  test('explains that dismissing a failure banner keeps its lane membership', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(
      bannersTemplate({
        failure: /** @type {any} */ ({
          repo: 'beads-ui',
          bead_id: 'UI-3',
          reason: 'verify_failed:gh_observation_failed',
          resume_attempt_id: 'attempt-3',
          resume_eligible: true,
          discard: { action: false }
        })
      }),
      mount
    );

    expect(
      mount.querySelector('.worker-banner__dismiss')?.getAttribute('title')
    ).toBe('실패 알림 닫기 — 레인에는 남습니다');
  });
});

describe('repo deployment strip template (UI-lb58 Phase 4)', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="m"></div>';
  });

  test('does not render the retired deployment strip in the banners area', () => {
    const mount = /** @type {HTMLElement} */ (document.getElementById('m'));

    render(bannersTemplate({}), mount);

    expect(mount.querySelector('.worker-deployment-strip')).toBeNull();
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

describe('running tile is unchanged without the monitor overlay (UI-eey2 §7)', () => {
  test('renders no repo badge, stepper, activity or delegation line', () => {
    const tile = shape(runningTile(tileInput(), 5000, null));

    expect(tile).not.toContain('rtile__repo');
    expect(tile).not.toContain('rtile__activity');
    expect(tile).not.toContain('rtile__legs');
    expect(tile).not.toContain('stepper');
    expect(tile).toMatchInlineSnapshot(
      `"<div class="rtile" data-attempt-id="a1" data-bead-id="UI-t1"> <div class="rtile__hd"> <span aria-hidden="true" class="rtile__dot"></span> <span class="rtile__id" title="클릭하면 ID 복사">UI-t1</span>  <span class="rtile__elapsed">4s</span> <button aria-label="라이브 세션 열기" class="rtile__session" title="라이브 세션 열기" type="button"> ▤ 세션 </button> <button aria-label="일시정지" class="rtile__pause" title="일시정지 (같은 세션으로 재개 가능)" type="button"> ⏸ </button>  </div> <div class="rtile__title">실행 중</div>       <div aria-hidden="true" class="rtile__accent"></div> </div>"`
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
      successors: [{ id: 'UI-s', label: '→ 후속 UI-s (repo-b · 병렬 #1)' }]
    }
  };

  test('adds the repo badge and serial lane chip to the header', () => {
    const tile = shape(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ (monitor)
      })
    );

    expect(tile).toContain('rtile__repo');
    expect(tile).toContain('repo-a');
    expect(tile).toContain('rtile__lane');
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

  test('adds the reverse successor chip', () => {
    const tile = shape(
      runningTile(tileInput(), 5000, null, {
        monitor: /** @type {any} */ (monitor)
      })
    );

    expect(tile).toContain('→ 후속 UI-s (repo-b · 병렬 #1)');
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

  test('draws the route chip after the id', () => {
    const head = /** @type {HTMLElement} */ (
      renderSession({ workflow: /** @type {any} */ (WORKFLOW) }).querySelector(
        '.rtile__hd'
      )
    );
    const order = Array.from(head.children).map((child) => child.className);

    expect(order.indexOf('ctl-chip ctl-chip--route')).toBe(
      order.indexOf('rtile__id') + 1
    );
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

  test('omits the meta row when the workflow carries no exec_receipt', () => {
    const tile = renderSession({ workflow: /** @type {any} */ (WORKFLOW) });

    expect(tile.querySelector('.rtile__meta')).toBeNull();
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
