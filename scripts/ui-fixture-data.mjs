/**
 * The UI verification fixture's data (UI-dbn6 Phase 1, split from
 * `ui-fixture-server.mjs` in P1-r2): the 8-repo pipeline snapshot every lane
 * reads, the worker-queue view of one repo, the in-memory queue mutations,
 * and the issue-detail / transcript reads. The jsdom pipeline tests read the
 * same base (`app/screens/pipeline/test-harness.js`); the server adds the
 * restored-surface material on top (`ui-fixture-rich.mjs`).
 */

/**
 * @param {number} index
 * @returns {string}
 */
function letterOf(index) {
  return String.fromCharCode('A'.charCodeAt(0) + index);
}

/**
 * A workflow projection whose band lights `spec` done and `plan` current.
 *
 * @param {'spec'|'plan'|'impl'|'pr'} current
 * @returns {Record<string, any>}
 */
export function workflowAt(current) {
  const order = ['spec', 'plan', 'impl', 'pr', 'merge'];
  const at = order.indexOf(current);
  /** @type {Record<string, any>} */
  const stages = {};
  order.forEach((key, index) => {
    stages[key] = {
      fill: index < at ? 'full' : index === at ? 'dim' : 'none'
    };
  });
  return { route: 'spec_backed', stages };
}

/**
 * The fixture's pipeline: `repos` workspaces with every lane populated.
 *
 * @param {{ now?: number, repos?: number }} [options]
 * @returns {{ workspaces: Array<Record<string, any>>, workspaces_state: Array<Record<string, any>> }}
 */
export function buildPipelineFixture(options = {}) {
  const now = typeof options.now === 'number' ? options.now : Date.now();
  const count = typeof options.repos === 'number' ? options.repos : 8;
  /** @type {Array<Record<string, any>>} */
  const workspaces = [];
  /** @type {Array<Record<string, any>>} */
  const workspaces_state = [];
  for (let index = 0; index < count; index++) {
    const letter = letterOf(index);
    const name = `repo-${letter.toLowerCase()}`;
    const root_dir = `/fixture/${name}`;
    const id = (/** @type {number} */ n) => `${letter}-${n}`;
    /** @type {Record<string, string>} */
    const bead_titles = {};
    /** @type {Record<string, any>} */
    const bead_workflow = {};
    /** @type {Record<string, any>} */
    const bead_overlay = {};
    const title = (/** @type {number} */ n, /** @type {string} */ text) => {
      bead_titles[id(n)] = `${text} (${name})`;
      bead_overlay[id(n)] = {
        route: 'spec_backed',
        metadata: {},
        priority: n % 4,
        issue_type: n % 3 === 0 ? 'bug' : 'task',
        labels: n % 2 === 0 ? ['frontend'] : ['backend']
      };
      return bead_titles[id(n)];
    };
    title(1, '대기 첫 항목 — 헤더 정렬');
    title(2, '대기 둘째 항목 — 외부 작업 대기');
    title(3, '대기 셋째 항목');
    title(4, '실행 중 — 레인 모델 분할');
    title(5, 'PR 대기 — 칩 문법 정리');
    title(6, '완료 — 모바일 레인 바');
    title(7, '직렬 레인 항목');
    bead_workflow[id(1)] = workflowAt('plan');
    bead_workflow[id(2)] = workflowAt('impl');
    bead_workflow[id(3)] = workflowAt('spec');
    bead_workflow[id(4)] = workflowAt('impl');
    bead_workflow[id(5)] = {
      ...workflowAt('pr'),
      chips: {
        pr: { number: 300 + index, url: `https://example.test/pr/${index}` }
      }
    };
    bead_workflow[id(6)] = {
      ...workflowAt('pr'),
      stages: {
        ...workflowAt('pr').stages,
        pr: { fill: 'full' },
        merge: { fill: 'full' }
      }
    };
    const runnable = [10, 11, 12].map((n, k) => ({
      bead_id: id(n),
      title: `후보 ${k + 1} — 설정 탭 목적별 정리 (${name})`,
      route: k === 1 ? 'quick_fix' : 'spec_backed',
      spec_id: k === 1 ? '' : `docs/superpowers/specs/2026-09-2${k}-${name}.md`,
      published: k !== 1,
      blocked: false,
      blocked_by: [],
      labels: k === 0 ? ['frontend', 'complex'] : ['backend'],
      priority: k,
      issue_type: k === 2 ? 'bug' : 'task',
      created_at: now - (k + 1) * 86_400_000,
      updated_at: now - (k + 1) * 3_600_000,
      status: 'open',
      workflow: workflowAt(k === 1 ? 'impl' : 'spec')
    }));
    /** @type {Array<Record<string, any>>} */
    const queue = [
      { bead_id: id(1), added_at: index === 0 ? now - 5_000 : now - 600_000 },
      { bead_id: id(2), added_at: now - 900_000 },
      { bead_id: id(3), added_at: now - 1_200_000 }
    ];
    /** @type {Array<Record<string, any>>} */
    const external_waits = [];
    /** @type {Array<Record<string, any>>} */
    const wait_reasons = [];
    if (index === 1) {
      const wait_id = 'w-0123456789ab';
      external_waits.push({
        wait_id,
        root_dir,
        bead_id: id(2),
        owner_kind: 'worker',
        stage: 'detached',
        budget: { turns_total: 3, turns_used: 1 },
        registered_at: new Date(now - 3_600_000).toISOString(),
        next_observation_at: new Date(now + 120_000).toISOString(),
        error_count: 0,
        last_error: null,
        jobs: [
          {
            adapter: 'slurm',
            ssh_host: 'wallace',
            job_id: '42',
            submitted_at: new Date(now - 3_600_000).toISOString(),
            log_path: '/logs/job.log',
            state: 'RUNNING',
            observed_at: new Date(now - 60_000).toISOString(),
            terminal: null
          }
        ],
        completion: null,
        resume: null
      });
      wait_reasons.push({
        kind: 'external_job',
        subject: { bead_id: id(2), root_dir },
        headline: 'wallace 작업 42 · RUNNING',
        release: '완료되면 같은 세션을 이어간다',
        verdict: 'normal',
        targets: [],
        actions: [
          {
            op: 'external_wait_check',
            label: '[지금 확인]',
            placement: 'card',
            payload: { root_dir, wait_id }
          },
          {
            op: 'external_wait_stop',
            label: '[관찰 중단]',
            placement: 'card',
            confirm: '대기 키를 지웁니다. 계속할까요?',
            payload: { root_dir, wait_id }
          }
        ]
      });
    }
    const attempt_id = `${id(4)}-1700000000-1`;
    const revision = 10 + index;
    workspaces.push({
      root_dir,
      name,
      revision,
      auto_advance: index === 0,
      queue,
      serial_lanes:
        index === 0
          ? [
              {
                id: 's1',
                entries: [{ bead_id: id(7), added_at: now - 60_000 }]
              }
            ]
          : [],
      serial_lane_count: index === 0 ? 1 : 0,
      pr_wait: [{ bead_id: id(5), added_at: now - 7_200_000 }],
      done: [{ bead_id: id(6), added_at: now - 1_800_000 }],
      runnable,
      attempts: {
        [attempt_id]: {
          attempt_id,
          bead_id: id(4),
          status: 'running',
          started_at: now - 1_500_000,
          runner: 'claude',
          model: 'opus',
          effort: 'high'
        }
      },
      admission: {},
      pr_observations: {
        [id(5)]: {
          pr: {
            number: 300 + index,
            url: `https://example.test/pr/${index}`,
            state: 'OPEN',
            head_sha: `abc${index}`
          }
        }
      },
      bead_titles,
      bead_workflow,
      bead_overlay,
      external_waits,
      wait_reasons
    });
    workspaces_state.push({
      root_dir,
      name,
      auto_advance: index === 0,
      auto_merge: false,
      slots: 2,
      revision,
      issue_prefix: letter,
      serial_lane_count: index === 0 ? 1 : 0,
      counts: { running: 1, pr_wait: 1, queue: 3, runnable: 3 },
      orchestration_model: 'sonnet',
      runner_catalog: { runtimes: {} },
      session_defaults: {},
      execution_defaults: {
        supported: true,
        schema_version: 1,
        source_commit: 'fixture',
        digest: 'fixture',
        session: { impl_runtime: 'claude' },
        orchestration: {
          runtime: 'claude',
          model: 'sonnet',
          model_id: 'claude-sonnet',
          effort: null,
          speed: null
        }
      }
    });
  }
  return { workspaces, workspaces_state };
}

/**
 * The worker-queue view of one fixture repo (the reply `queue` of a mutation
 * and the `worker-queue-snapshot` body).
 *
 * @param {Record<string, any>} row
 * @param {Record<string, any>} state
 * @returns {Record<string, any>}
 */
export function queueViewOf(row, state) {
  return {
    revision: row.revision,
    auto_advance: state.auto_advance,
    auto_merge: state.auto_merge,
    slots: state.slots,
    serial_lane_count: state.serial_lane_count,
    queue: row.queue,
    serial_lanes: row.serial_lanes,
    pr_wait: row.pr_wait,
    done: row.done,
    attempts: row.attempts,
    admission: row.admission,
    cleanup_failed: {},
    bead_titles: row.bead_titles,
    workspace_info: { slots: state.slots, base: 'main' }
  };
}

/**
 * Apply one queue mutation to the fixture. Returns whether it applied.
 *
 * @param {Record<string, any>} row
 * @param {string} type
 * @param {Record<string, any>} payload
 * @returns {boolean}
 */
export function applyQueueOp(row, type, payload) {
  const bead_id = String(payload.bead_id || '');
  /** @type {Array<{ entries: Array<Record<string, any>>, lane: string|null }>} */
  const lanes = [
    { entries: row.queue, lane: null },
    ...row.serial_lanes.map((/** @type {any} */ lane) => ({
      entries: lane.entries,
      lane: lane.id
    }))
  ];
  const holder = lanes.find((entry) =>
    entry.entries.some((item) => item.bead_id === bead_id)
  );
  const take = () => {
    if (!holder) {
      return { bead_id, added_at: Date.now() };
    }
    const at = holder.entries.findIndex((item) => item.bead_id === bead_id);
    return holder.entries.splice(at, 1)[0];
  };
  /** @param {string|null|undefined} lane */
  const target = (lane) =>
    lanes.find((entry) => entry.lane === (lane || null)) || null;
  if (type === 'worker-queue-reorder') {
    const dest = target(payload.lane ?? holder?.lane);
    if (!holder || !dest) {
      return false;
    }
    const entry = take();
    const index = Math.max(
      0,
      Math.min(Number(payload.to_index) || 0, dest.entries.length)
    );
    dest.entries.splice(index, 0, entry);
    return true;
  }
  if (type === 'worker-queue-place') {
    const dest = target(payload.lane);
    if (!dest) {
      return false;
    }
    const entry = take();
    row.runnable = row.runnable.filter(
      (/** @type {any} */ item) => item.bead_id !== bead_id
    );
    const index =
      typeof payload.index === 'number'
        ? Math.max(0, Math.min(payload.index, dest.entries.length))
        : dest.entries.length;
    dest.entries.splice(index, 0, entry);
    return true;
  }
  if (type === 'worker-queue-remove' || type === 'worker-queue-start-now') {
    if (!holder) {
      return false;
    }
    take();
    return true;
  }
  return false;
}

/** A 40-hex receipt sha for the fixture's review stamps. */
const RECEIPT_SHA = 'a'.repeat(40);

/**
 * The `issue-detail` record of one fixture bead: its lane title and workflow,
 * a markdown description, a blocking edge to its sibling and review receipts.
 *
 * @param {{ id: string, title: string, workflow?: Record<string, any>, labels?: string[] }} issue
 * @returns {Record<string, any>}
 */
export function detailIssue(issue) {
  const [letter, number] = issue.id.split('-');
  const blocker = `${letter}-${Number(number) === 3 ? 2 : 3}`;
  return {
    id: issue.id,
    title: issue.title,
    status: 'in_progress',
    priority: 2,
    issue_type: 'task',
    description:
      '## 목적\n\n픽스처 이슈의 **설명**입니다.\n\n- 첫째 항목\n- 둘째 항목\n',
    notes: 'spec_review codex 승인 · 구현 착수',
    labels: issue.labels || ['frontend'],
    dependencies: [
      {
        id: blocker,
        dependency_type: 'blocks',
        status: 'open',
        title: `${blocker} 선행`
      }
    ],
    dependents: [],
    comment_count: 2,
    metadata: {
      route: 'spec_backed',
      spec_review: `codex@${RECEIPT_SHA}`,
      impl_runtime: 'claude'
    },
    workflow: issue.workflow || workflowAt('impl'),
    created_at: new Date(Date.now() - 86_400_000).toISOString(),
    updated_at: new Date().toISOString()
  };
}

/**
 * A finished attempt's transcript: narrative, a work bundle, and the result.
 *
 * @returns {Array<Record<string, any>>}
 */
export function transcriptLines() {
  /** @param {string} id */
  const read = (id) => ({
    type: 'assistant',
    message: {
      content: [
        {
          type: 'tool_use',
          id,
          name: 'Read',
          input: { file_path: `/fixture/repo-a/app/${id}.js` }
        }
      ]
    }
  });
  /** @param {string} id */
  const done = (id) => ({
    type: 'user',
    message: {
      content: [{ type: 'tool_result', tool_use_id: id, content: 'ok' }]
    }
  });
  /** @param {string} text */
  const say = (text) => ({
    type: 'assistant',
    message: { content: [{ type: 'text', text }] }
  });
  return [
    say('레인 모델을 **세 모듈**로 나눕니다.'),
    ...['t1', 't2', 't3', 't4'].flatMap((id) => [read(id), done(id)]),
    say('검증을 돌리고 결과를 보고합니다.'),
    {
      type: 'result',
      subtype: 'success',
      is_error: false,
      result: '## 결과\n\n- 테스트 통과\n- PR 준비 완료'
    }
  ];
}
