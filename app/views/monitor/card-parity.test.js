/** @vitest-environment node */
/* global process */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest';
import { builtinEnvironments } from 'vitest/environments';

vi.mock('../../../server/bd.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return { ...actual, runBdJsonProjected: vi.fn() };
});

// 외부 대기 판정은 attach된 Worker의 waitJudge 캐시가 들고 있고 이 테스트는 Worker를
// attach하지 않는다. 그래서 `workerWaitState`만 바꿔, 고정 레코드를 서버의 진짜
// 판정(`judgeWaitReasons`)에 넣은 결과를 돌려준다 — 카드 재료는 여전히 서버가 만든다.
vi.mock('../../../server/worker/attach.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    workerWaitState: vi.fn(actual.workerWaitState),
    workerAttached: vi.fn(actual.workerAttached)
  };
});

// 서버 모듈은 모듈 수준에서 `new URL(..., import.meta.url)`을 쓰므로, jsdom 환경의
// 웹 변환으로는 읽히지 않는다. 이 파일은 node 환경에서 돌고 DOM은 vitest의 jsdom
// 환경 설치기로 전역에 올린다 — 뷰 모듈은 `document`가 있어야 import되므로 모든
// 모듈은 그 뒤에 동적으로 읽는다. `URL`은 Node 것을 되돌려 서버 모듈이 읽히게 한다.
const node_url = globalThis.URL;
const node_url_search_params = globalThis.URLSearchParams;
const jsdom_environment = await builtinEnvironments.jsdom.setup(globalThis, {
  jsdom: { url: 'http://localhost:3000/' }
});
globalThis.URL = node_url;
globalThis.URLSearchParams = node_url_search_params;

const {
  normalizeBdIssue,
  normalizeBdIssueList,
  normalizeBdReadyExplain,
  normalizeBdVersionCapability
} = await import('../../../server/bd-json.js');
const { runBdJsonProjected } = await import('../../../server/bd.js');
const { fetchListForSubscription } =
  await import('../../../server/list-adapters.js');
const { makeAttempt } = await import('../../../server/worker/queue-store.js');
const { workerAttached, workerWaitState } =
  await import('../../../server/worker/attach.js');
const { judgeWaitReasons } =
  await import('../../../server/worker/wait-judgment.js');
const { getWorkerRuntime, __resetWorkerRuntimeForTest: resetWorkerRuntime } =
  await import('../../../server/worker/runtime.js');
const {
  __resetWorkspaceSnapshotRuntimeForTest: resetWorkspaceSnapshotRuntime
} = await import('../../../server/workspace-snapshot-runtime.js');
const { buildMonitorPipeline, buildMonitorWorkspacesState } =
  await import('../../../server/ws/monitor-handlers.js');
const { decorateQueue } = await import('../../../server/ws/worker-handlers.js');
const { createMonitorPipelineStore } =
  await import('../../data/monitor-pipeline-store.js');
const { createSubscriptionIssueStore } =
  await import('../../data/subscription-issue-store.js');
const { createWorkerQueueStore } =
  await import('../../data/worker-queue-store.js');
const { closedRangeSince } = await import('../../data/closed-range.js');
const { createWorkerView } = await import('../worker/index.js');
const { createMonitorView } = await import('./index.js');

afterAll(() => {
  jsdom_environment.teardown(globalThis);
});

/** 2026-10-02 14:00 local — 고정 시계. */
const NOW = new Date(2026, 9, 2, 14, 0, 0).getTime();
const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/** @type {string} */
let WS = '';
/** @type {string} */
let tmp_root = '';
/** @type {Array<() => void>} */
let teardown = [];

/**
 * @param {number} epoch_ms
 * @returns {string}
 */
function iso(epoch_ms) {
  return new Date(epoch_ms).toISOString();
}

/**
 * One raw `bd list --all` row.
 *
 * @param {string} id
 * @param {Record<string, any>} [patch]
 * @returns {Record<string, any>}
 */
function row(id, patch = {}) {
  return {
    id,
    title: `${id} 제목`,
    description: `${id} 설명`,
    status: 'open',
    priority: 2,
    issue_type: 'task',
    labels: [],
    metadata: { route: 'quick_fix' },
    dependencies: [],
    created_at: iso(NOW - 3 * DAY),
    updated_at: iso(NOW - 2 * HOUR),
    ...patch
  };
}

/**
 * The enclosed foreign landing pins of a Bead whose PR lives in another
 * repository (UI-k467).
 *
 * @param {number} number
 * @returns {Record<string, string>}
 */
function foreignPins(number) {
  return {
    route: 'quick_fix',
    foreign_repo: 'git@github.com:acme/research-repo-template.git',
    foreign_path: '/targets/research-repo-template',
    foreign_base: 'main',
    pr_url: `https://github.com/acme/research-repo-template/pull/${number}`
  };
}

/**
 * The raw repository: every `bd list --all` row. 한 고정 자료가 여러 사례를
 * 함께 덮는다 — 사례 이름은 각 줄 위에 적는다.
 *
 * @returns {Array<Record<string, any>>}
 */
function rawIssues() {
  return [
    // 우선순위·타입·discovered-from이 있는 후보.
    row('C-1', {
      priority: 1,
      issue_type: 'bug',
      labels: ['frontend'],
      dependencies: [
        { issue_id: 'C-1', depends_on_id: 'C-0', type: 'discovered-from' }
      ]
    }),
    row('C-0', {
      status: 'closed',
      closed_at: iso(NOW - 3 * DAY),
      updated_at: iso(NOW - 3 * DAY)
    }),
    // 같은 plan의 두 후보 — plan 묶음.
    row('C-2', {
      metadata: {
        route: 'quick_fix',
        plan_path: 'docs/plans/2026-10-01-example-plan.md',
        plan_task_anchor: 'Phase 1'
      }
    }),
    row('C-3', {
      metadata: {
        route: 'quick_fix',
        plan_path: 'docs/plans/2026-10-01-example-plan.md',
        plan_task_anchor: 'Phase 2'
      }
    }),
    // 대기 큐의 복잡 + 영역 라벨.
    row('Q-1', {
      priority: 0,
      labels: ['complex', 'backend'],
      metadata: {
        route: 'quick_fix',
        complex_reason: 'hard_diagnosis+invariant_reasoning'
      }
    }),
    // 실행중의 복잡 + 영역 라벨.
    row('R-1', {
      status: 'in_progress',
      priority: 1,
      issue_type: 'feature',
      labels: ['complex', 'frontend'],
      metadata: {
        route: 'quick_fix',
        complex_reason: 'verification_by_judgment'
      }
    }),
    // 충돌 해소 중인 실행.
    row('S-1', { status: 'in_progress', issue_type: 'bug' }),
    // 파킹·orphaned 실패·base_moved 대기.
    row('K-1', { status: 'in_progress' }),
    row('O-1', { status: 'in_progress' }),
    row('B-1', { status: 'in_progress' }),
    // PR 대기 — 리뷰 세션이 도는 줄·정리 실패·충돌.
    row('W-1', { status: 'resolved' }),
    row('W-2', { status: 'resolved' }),
    row('W-3', { status: 'resolved' }),
    // PR 대기 — 핀이 있는 외부 PR 대상(UI-k467): 머지 가능 행과 사람 처리 행.
    row('W-4', { status: 'resolved', metadata: foreignPins(41) }),
    row('W-5', { status: 'resolved', metadata: foreignPins(42) }),
    // PR 대기 — 세션이 등록한 핀 있는 외부 PR 행(Worker attempt 없음).
    row('W-6', { status: 'resolved', metadata: foreignPins(43) }),
    // PR 대기 — 보관된 행(UI-0d9i: `⏸ 보류로 전환`)과, 보관된 채 보류된 행.
    row('W-7', {
      status: 'resolved',
      metadata: {
        route: 'quick_fix',
        pr_url: 'https://github.com/example/repo/pull/17'
      }
    }),
    row('W-8', {
      status: 'deferred',
      metadata: {
        route: 'quick_fix',
        pr_url: 'https://github.com/example/repo/pull/18'
      }
    }),
    // Worker 완료 행과, Worker 밖에서 닫힌 이슈.
    row('D-1', { status: 'closed', closed_at: iso(NOW - HOUR) }),
    row('X-1', {
      status: 'closed',
      closed_at: iso(NOW - 2 * HOUR),
      priority: 3
    }),
    // 보류.
    row('F-1', { status: 'deferred' }),
    // 대기 중인 Slurm 잡 하나를 기다리는 외부 대기 — 용량 줄·▶ 바로 실행.
    row('E-1')
  ];
}

/**
 * `bd show <id> --json`의 모양: 같은 행에서 `dependencies`만 `bd show`의 간선
 * 모양(`id`·`dependency_type`)으로 바뀐다.
 *
 * @param {Record<string, any>} raw
 * @returns {Record<string, any>}
 */
function showRow(raw) {
  return {
    ...raw,
    dependencies: raw.dependencies.map((/** @type {any} */ dep) => ({
      id: dep.depends_on_id,
      dependency_type: dep.type,
      status: 'open',
      title: dep.depends_on_id
    }))
  };
}

/**
 * Ready는 열린 후보이고, 나머지 열린 이슈는 막힘이 아니라 이미 레인에 있다.
 * `bd ready --explain`은 열린 행 전부를 ready로 본다.
 *
 * @param {Array<Record<string, any>>} issues
 * @returns {{ ready: Array<{ id: string }>, blocked: any[] }}
 */
function readyExplain(issues) {
  return {
    ready: issues
      .filter((issue) => issue.status === 'open')
      .map((issue) => ({ id: issue.id })),
    blocked: []
  };
}

/**
 * @param {{ ok: boolean, data?: unknown }} result - A `bd-json` projector result.
 * @returns {{ ok: true, protocol: { format: 'bare', schema_version: null }, data: unknown }}
 */
function projected(result) {
  if (!result.ok) {
    throw new Error('fixture is not a valid bd payload');
  }
  return {
    ok: true,
    protocol: { format: 'bare', schema_version: null },
    data: result.data
  };
}

/**
 * Answer every `bd` call the server layers make from the one raw repository.
 */
function stubBd() {
  const issues = rawIssues();
  vi.mocked(runBdJsonProjected).mockImplementation(
    /** @type {any} */ (
      async (/** @type {string} */ _family, /** @type {string[]} */ args) => {
        if (args[0] === 'version') {
          return projected(
            normalizeBdVersionCapability({
              version: '1.2.0-fork.1',
              commit: '6da490c1b54ed410150422380bb91fcf6f910bfa'
            })
          );
        }
        if (args[0] === 'list') {
          return projected(normalizeBdIssueList(issues));
        }
        if (args[0] === 'ready') {
          return projected(normalizeBdReadyExplain(readyExplain(issues)));
        }
        if (args[0] === 'show') {
          const found = issues.find((issue) => issue.id === args[1]);
          if (!found) {
            return {
              ok: false,
              error: { code: 'bd_exit_error', message: 'not found' }
            };
          }
          return projected(
            normalizeBdIssue(showRow(found), { expected_id: args[1] })
          );
        }
        return {
          ok: false,
          error: { code: 'bd_exit_error', message: `unexpected: ${args[0]}` }
        };
      }
    )
  );
}

/**
 * The raw Worker queue record — attempts, lane placement and the merge queue,
 * exactly what `queue.json` holds.
 *
 * @returns {Record<string, any>}
 */
function rawQueue() {
  return {
    revision: 7,
    auto_advance: false,
    auto_merge: false,
    slots: 3,
    serial_lane_count: 1,
    queue: [
      { bead_id: 'Q-1', added_at: NOW - 5 * HOUR },
      { bead_id: 'E-1', added_at: NOW - 4 * HOUR }
    ],
    serial_lanes: [],
    pr_wait: [
      { bead_id: 'W-1', added_at: NOW - 4 * HOUR },
      { bead_id: 'W-2', added_at: NOW - 3 * HOUR },
      { bead_id: 'W-3', added_at: NOW - 2 * HOUR },
      { bead_id: 'W-4', added_at: NOW - 2 * HOUR + 1 },
      { bead_id: 'W-5', added_at: NOW - 2 * HOUR + 2 },
      { bead_id: 'W-7', added_at: NOW - 2 * HOUR + 3 },
      { bead_id: 'W-8', added_at: NOW - 2 * HOUR + 4 }
    ],
    merge_shelved: {
      'W-7': { at: NOW - HOUR },
      'W-8': { at: NOW - HOUR }
    },
    done: [{ bead_id: 'D-1', added_at: NOW - HOUR }],
    merge_queue: [],
    cleanup_failed: {
      'W-2': { step: 'branch_cleanup', reason: 'boom', at: NOW - HOUR }
    },
    attempts: {
      'att-r1': makeAttempt({
        attempt_id: 'att-r1',
        bead_id: 'R-1',
        status: 'running',
        started_at: NOW - HOUR,
        session_id: 'sid-r1'
      }),
      'att-s1': {
        ...makeAttempt({
          attempt_id: 'att-s1',
          bead_id: 'S-1',
          status: 'running',
          started_at: NOW - 30 * 60 * 1000,
          session_id: 'sid-s1'
        }),
        conflict_resolution: true
      },
      'att-k1': makeAttempt({
        attempt_id: 'att-k1',
        bead_id: 'K-1',
        status: 'parked',
        started_at: NOW - 3 * HOUR,
        finished_at: NOW - 2 * HOUR,
        cause: 'session_parked',
        cause_detail: {
          summary: 'REVISE 판정 확인을 사용자에게 요청함',
          awaiting_user: 'spec_review',
          bead_status: 'in_progress'
        }
      }),
      'att-o1': makeAttempt({
        attempt_id: 'att-o1',
        bead_id: 'O-1',
        status: 'orphaned',
        started_at: NOW - 3 * HOUR,
        session_id: 'sid-o1'
      }),
      'att-b1': makeAttempt({
        attempt_id: 'att-b1',
        bead_id: 'B-1',
        status: 'waiting',
        started_at: NOW - 3 * HOUR,
        finished_at: NOW - 2 * HOUR,
        cause: 'base_moved',
        retry: {
          cause: 'base_moved',
          attempts: 1,
          max: 3,
          next_at: NOW + HOUR,
          origin_attempt_id: null
        }
      }),
      'att-w1-review': {
        ...makeAttempt({
          attempt_id: 'att-w1-review',
          bead_id: 'W-1',
          status: 'running',
          started_at: NOW - HOUR
        }),
        kind: 'review_session',
        origin: 'auto'
      }
    }
  };
}

/**
 * The public projection of E-1's external-wait record: one pending Slurm job
 * with capacity material (UI-qbgj §3.1).
 *
 * @returns {Record<string, any>}
 */
function externalWaitRecord() {
  return {
    wait_id: 'w-0123456789ab',
    root_dir: WS,
    bead_id: 'E-1',
    owner_kind: 'worker',
    stage: 'detached',
    budget: { turns_total: 3, turns_used: 0 },
    registered_at: iso(NOW - 4 * HOUR),
    next_observation_at: iso(NOW + 2 * 60 * 1000),
    error_count: 0,
    last_error: null,
    jobs: [
      {
        adapter: 'slurm',
        ssh_host: 'wallace',
        job_id: '249043',
        submitted_at: iso(NOW - 4 * HOUR),
        log_path: '/logs/249043.log',
        state: 'PENDING',
        observed_at: iso(NOW - 60 * 1000),
        capacity: {
          reason: 'Resources',
          est_start: iso(NOW + 2 * DAY),
          partition: 'debug',
          ahead: { jobs: 39, cpus: 624 },
          slurm: {
            cpu_alloc: 112,
            cpu_total: 112,
            mem_alloc_mb: 900 * 1024,
            mem_total_mb: 1000 * 1024
          },
          host: {
            name: 'wallace',
            cpus: 112,
            load1: 61,
            mem_available_mb: 902 * 1024
          },
          observed_at: iso(NOW - 60 * 1000)
        },
        terminal: null
      }
    ],
    completion: null,
    resume: null
  };
}

/**
 * Answer `workerWaitState` with E-1's record and the server's own judgment of
 * it against the raw queue.
 *
 * @param {Record<string, any>} raw_queue
 * @param {import('../../protocol.js').CapacityView['takeover_blocker']} [takeover_blocker]
 */
function seedExternalWait(raw_queue, takeover_blocker) {
  vi.mocked(workerWaitState).mockImplementation((root) => {
    const external_waits = root === WS ? [externalWaitRecord()] : [];
    if (takeover_blocker && external_waits.length > 0) {
      external_waits[0].jobs[0].capacity.takeover_blocker = takeover_blocker;
    }
    const judged = judgeWaitReasons(
      /** @type {any} */ ({
        root_dir: root,
        queue: raw_queue,
        external_waits,
        now: NOW
      })
    );
    return /** @type {any} */ ({
      external_waits,
      // 세션 소유 사람 필요 행(UI-gske §3.3)의 사유도 서버 판정 그대로 싣는다 —
      // 행이 없는 고정 자료에서는 아무것도 더하지 않는다.
      wait_reasons: judged.wait_reasons.filter(
        (/** @type {any} */ reason) =>
          reason.kind === 'external_job' ||
          String(reason.subject.bead_id).startsWith('session-inquiry:')
      )
    });
  });
}

/**
 * Seed what the PR poller observed for the three PR 대기 beads.
 */
function seedPrObservations() {
  const observations = getWorkerRuntime().prObservations;
  /**
   * @param {number} number
   * @param {Record<string, string>} [patch]
   * @returns {any}
   */
  const pr = (number, patch = {}) => ({
    number,
    url: `https://github.com/example/repo/pull/${number}`,
    state: 'OPEN',
    mergeable: 'MERGEABLE',
    merge_state_status: 'CLEAN',
    head_ref: `bead/${number}`,
    head_sha: String(number).repeat(40).slice(0, 40),
    base_ref: 'main',
    ...patch
  });
  observations.record(WS, 'W-1', { pr: pr(11) });
  observations.record(WS, 'W-2', {
    pr: pr(12, { state: 'MERGED', merge_sha: 'c'.repeat(40) })
  });
  observations.record(WS, 'W-3', {
    pr: pr(13, { mergeable: 'CONFLICTING', merge_state_status: 'DIRTY' })
  });
  const foreign = {
    slug: 'acme/research-repo-template',
    repo_name: 'research-repo-template',
    base: 'main',
    path: '/targets/research-repo-template',
    handoff: null,
    base_sha: 'f'.repeat(40),
    verify_declared: false
  };
  observations.record(WS, 'W-4', {
    pr: pr(41, {
      url: 'https://github.com/acme/research-repo-template/pull/41'
    }),
    review_receipt: {
      state: 'current',
      head_sha: String(41).repeat(40).slice(0, 40)
    },
    foreign
  });
  observations.record(WS, 'W-5', {
    error: 'foreign_handoff:foreign_pr_base_mismatch',
    pr: pr(42, {
      url: 'https://github.com/acme/research-repo-template/pull/42',
      base_ref: 'develop'
    }),
    foreign: { ...foreign, handoff: 'foreign_pr_base_mismatch' }
  });
  // The scan's statuses (UI-0d9i §3.4): W-8 reads `deferred`, so the PR 대기
  // projection hides its row on both tabs.
  getWorkerRuntime().externalPrs.replaceStatuses(
    WS,
    Object.fromEntries(rawIssues().map((issue) => [issue.id, issue.status]))
  );
  const w6_url = 'https://github.com/acme/research-repo-template/pull/43';
  getWorkerRuntime().externalPrs.replace(
    WS,
    [
      {
        bead_id: 'W-6',
        pr_url: w6_url,
        pr_number: 43,
        foreign_pins: foreignPins(43)
      }
    ],
    { origin_slug: 'example/repo' }
  );
  observations.record(WS, 'W-6', {
    pr: pr(43, { url: w6_url }),
    review_receipt: {
      state: 'current',
      head_sha: String(43).repeat(40).slice(0, 40)
    },
    foreign
  });
}

/**
 * Let the two async caches fill from the faked `bd`: the candidate scan and the
 * per-bead `bd show` reads. Both are the production fills, just awaited.
 *
 * @returns {Promise<void>}
 */
async function warmServerCaches() {
  const runtime = getWorkerRuntime();
  runtime.runnableCache.setSubscriberCount(() => 1);
  const ids = rawIssues().map((issue) => issue.id);
  runtime.runnableCache.runnableFor(WS, [], { include_unadmitted: true });
  await vi.waitFor(() => {
    expect(
      runtime.runnableCache.runnablePeek(WS, [], { include_unadmitted: true })
        .length
    ).toBeGreaterThan(0);
  });
  runtime.titleCache.titlesFor(WS, ids);
  await vi.waitFor(() => {
    expect(Object.keys(runtime.titleCache.titlesFor(WS, ids))).toHaveLength(
      ids.length
    );
  });
}

/**
 * @param {unknown} value
 * @returns {any}
 */
function overTheWire(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * The one issue store the Worker tab reads for a subscription id.
 *
 * @returns {{ getStore: (id: string) => any, snapshotFor: (id: string) => any[], subscribe: (fn: (id: string) => void) => () => void }}
 */
function createIssueStores() {
  /** @type {Map<string, any>} */
  const stores = new Map();
  /** @type {Set<(client_id: string) => void>} */
  const listeners = new Set();
  /** @param {string} id */
  function getStore(id) {
    let store = stores.get(id);
    if (!store) {
      store = createSubscriptionIssueStore(id);
      stores.set(id, store);
      store.subscribe(() => {
        for (const fn of Array.from(listeners)) {
          fn(id);
        }
      });
    }
    return store;
  }
  return {
    getStore,
    snapshotFor: (id) => getStore(id).snapshot().slice(),
    subscribe: (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    }
  };
}

/**
 * Worker 탭: 서버의 목록 투영(여섯 구독)과 `decorateQueue` 스냅샷을 스토어에
 * 싣고 진짜 뷰를 그린다.
 *
 * @param {HTMLElement} mount
 * @param {Record<string, any>} queue_snapshot
 * @param {any} [execPresetStore]
 */
async function mountWorker(mount, queue_snapshot, execPresetStore) {
  const stores = createIssueStores();
  const subscriptions = [
    ['tab:worker:ready', { type: 'ready-issues' }],
    ['tab:worker:blocked', { type: 'blocked-issues' }],
    ['tab:worker:in-progress', { type: 'in-progress-issues' }],
    ['tab:worker:resolved', { type: 'resolved-issues' }],
    [
      'tab:worker:closed',
      {
        type: 'closed-issues',
        params: { since: closedRangeSince('today', NOW) ?? 0 }
      }
    ],
    ['tab:worker:deferred', { type: 'deferred-issues' }]
  ];
  for (const [key, spec] of subscriptions) {
    const result = await fetchListForSubscription(/** @type {any} */ (spec), {
      cwd: WS,
      workspace_snapshot: true
    });
    if (!result.ok) {
      throw new Error(`list ${key} failed: ${result.error.message}`);
    }
    stores.getStore(/** @type {string} */ (key)).applyPush({
      type: 'snapshot',
      id: key,
      revision: 1,
      issues: overTheWire(result.items)
    });
  }
  const queueStore = createWorkerQueueStore();
  queueStore.set(overTheWire(queue_snapshot));
  const view = createWorkerView(mount, {
    issueStores: stores,
    queueStore,
    transport: vi.fn(async (/** @type {string} */ type) =>
      type === 'get-session-defaults' ? { values: {}, warnings: [] } : null
    ),
    getWorkspacePath: () => WS,
    ...(execPresetStore ? { execPresetStore } : {})
  });
  teardown.push(() => view.destroy());
  view.load();
}

/**
 * Draw the Monitor tab from the two aggregation projections of the server
 * (`buildMonitorPipeline`, `buildMonitorWorkspacesState`) through the real
 * pipeline store and the real view, with no hand-built input.
 *
 * @param {HTMLElement} mount
 * @param {Record<string, any>} raw_queue
 * @param {any} [execPresetStore]
 */
function mountMonitor(mount, raw_queue, execPresetStore) {
  const seams = {
    listWorkspaces: () => [{ path: WS }],
    listHidden: () => [],
    snapshotFor: (/** @type {string} */ key) => decorateQueue(key, raw_queue)
  };
  const workspaces = buildMonitorPipeline(seams);
  const workspaces_state = buildMonitorWorkspacesState({
    ...seams,
    issuePrefixFor: () => 'P',
    sessionDefaultsFor: () => ({ values: {}, warnings: [], state: 'ready' }),
    workspaceAccountsFor: () => null
  });
  const pipelineStore = createMonitorPipelineStore();
  pipelineStore.set(overTheWire(workspaces), overTheWire(workspaces_state));
  const view = createMonitorView(mount, {
    gotoIssue: () => {},
    transport: vi.fn(async () => null),
    router: { gotoView: () => {} },
    pipelineStore,
    getWorkspacePath: () => WS,
    switchWorkspace: () => Promise.resolve(null),
    now: () => NOW,
    ...(execPresetStore ? { execPresetStore } : {})
  });
  teardown.push(() => view.clear());
  view.load();
}

/**
 * Both tabs, drawn from the one raw state.
 *
 * @param {import('../../protocol.js').CapacityView['takeover_blocker']} [takeover_blocker]
 * @param {Record<string, any>} [queue_patch] - Top-level fields laid over the
 * raw queue record.
 * @param {any} [execPresetStore] - The preset snapshot both tabs read their
 * chip bindings from.
 * @returns {Promise<{ worker: HTMLElement, monitor: HTMLElement }>}
 */
async function drawBothTabs(
  takeover_blocker,
  queue_patch = {},
  execPresetStore
) {
  stubBd();
  seedPrObservations();
  await warmServerCaches();
  const raw_queue = { ...rawQueue(), ...queue_patch };
  seedExternalWait(raw_queue, takeover_blocker);
  const queue_snapshot = decorateQueue(WS, raw_queue);
  const worker = document.createElement('div');
  const monitor = document.createElement('div');
  document.body.append(worker, monitor);
  await mountWorker(worker, queue_snapshot, execPresetStore);
  mountMonitor(monitor, raw_queue, execPresetStore);
  return { worker, monitor };
}

/**
 * @param {HTMLElement} mount
 * @returns {Map<string, HTMLElement>}
 */
function cardsByBead(mount) {
  /** @type {Map<string, HTMLElement>} */
  const cards = new Map();
  for (const card of Array.from(
    mount.querySelectorAll(
      '.worker-card[data-bead-id], .worker-mini[data-bead-id], .rtile[data-bead-id]'
    )
  )) {
    cards.set(
      /** @type {string} */ (card.getAttribute('data-bead-id')),
      /** @type {HTMLElement} */ (card)
    );
  }
  return cards;
}

beforeEach(() => {
  tmp_root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-card-parity-'));
  WS = path.join(tmp_root, 'repo-a');
  fs.mkdirSync(WS, { recursive: true });
  process.env.XDG_STATE_HOME = path.join(tmp_root, 'state');
  process.env.BDUI_CONFIG_PATH = path.join(tmp_root, 'absent', 'config.toml');
  window.localStorage.clear();
  for (const key of [
    'beads-ui.worker.lane-collapsed',
    'beads-ui.monitor.lane-collapsed'
  ]) {
    window.localStorage.setItem(
      key,
      JSON.stringify({ lanes: { done: false }, areas: {} })
    );
  }
  resetWorkerRuntime();
  resetWorkspaceSnapshotRuntime();
  vi.useFakeTimers({ toFake: ['Date'] });
  vi.setSystemTime(NOW);
  document.body.innerHTML = '';
});

afterEach(() => {
  while (teardown.length > 0) {
    teardown.pop()?.();
  }
  vi.useRealTimers();
  resetWorkerRuntime();
  resetWorkspaceSnapshotRuntime();
  delete process.env.XDG_STATE_HOME;
  delete process.env.BDUI_CONFIG_PATH;
  fs.rmSync(tmp_root, { recursive: true, force: true });
});

/**
 * The comparison material of one card: every chip, badge, button and link in
 * it as `tag.sorted-classes text`, sorted.
 * Only what spec section 9 names as an intended difference is left out:
 *
 * - repository coordinates: the repo badge (`*__repo`).
 * - done row shape: the Monitor done row is the three-line variant, which
 *   carries no priority badge (`doneThreeLineRow`), so `.worker-pri` is left
 *   out of rows in the done lane only.
 *
 * One more is left out though section 9 does not list it yet: the waiting
 * row's `↑`/`↓` nudge buttons (`worker-mini__rowops-up`·`-down`). The Monitor
 * draws them as the touch stand-in for drag, and the Worker tab deliberately
 * has none (`2026-09-02-worker-operation-surface-unify-design.md`: "Worker 탭에
 * `↑↓` nudge를 추가하지 않는다").
 *
 * Nothing else is normalized: both tabs run on the same frozen clock, so the
 * relative-time text compares as drawn.
 *
 * @param {HTMLElement} card
 * @returns {string[]}
 */
function partsOf(card) {
  const in_done_lane = card.closest('[id$="-done"]') !== null;
  /** @type {string[]} */
  const parts = [];
  for (const el of Array.from(
    card.querySelectorAll(
      'button, a, [class*="chip"], [class*="badge"], .worker-pri'
    )
  )) {
    const classes = Array.from(el.classList);
    if (classes.some((name) => name.endsWith('__repo'))) {
      continue;
    }
    if (in_done_lane && el.classList.contains('worker-pri')) {
      continue;
    }
    if (
      el.classList.contains('worker-mini__rowops-up') ||
      el.classList.contains('worker-mini__rowops-down')
    ) {
      continue;
    }
    const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
    parts.push(
      `${el.tagName.toLowerCase()}.${classes.sort().join('.')} ${text}`
    );
  }
  return parts.sort();
}

/**
 * @param {Map<string, HTMLElement>} cards
 * @param {string[]} ids
 * @returns {Record<string, string[]>}
 */
function partsByBead(cards, ids) {
  return Object.fromEntries(
    ids.map((id) => [id, partsOf(/** @type {HTMLElement} */ (cards.get(id)))])
  );
}

/**
 * 두 탭에 모두 서는 Bead id — 고정 자료의 레인 구성원이다. Worker 탭에만 서는
 * 두 모집단(Worker 밖에서 닫힌 이슈, 보류 이슈)은 §9가 따로 정한다.
 */
const SHARED_BEADS = [
  'B-1',
  'C-1',
  'C-2',
  'C-3',
  'D-1',
  'E-1',
  'K-1',
  'O-1',
  'Q-1',
  'R-1',
  'S-1',
  'W-1',
  'W-2',
  'W-3',
  'W-4',
  'W-5',
  'W-6',
  'W-7'
];

describe('card parity between the Worker and Monitor tabs (UI-f2sy §10)', () => {
  test('offers the same discard on a withdrawn candidate in both tabs', async () => {
    const { worker, monitor } = await drawBothTabs(undefined, {
      attempts: {
        ...rawQueue().attempts,
        withdrawn: makeAttempt({
          attempt_id: 'withdrawn',
          bead_id: 'C-1',
          status: 'paused',
          withdrawn: {
            at: NOW - HOUR,
            from_status: 'running',
            from_cause: null
          }
        })
      }
    });
    const worker_card = /** @type {HTMLElement} */ (
      cardsByBead(worker).get('C-1')
    );
    const monitor_card = /** @type {HTMLElement} */ (
      cardsByBead(monitor).get('C-1')
    );

    expect(partsOf(monitor_card)).toEqual(partsOf(worker_card));
    for (const card of [worker_card, monitor_card]) {
      expect(
        card
          .querySelector('.worker-card__foot .worker-mini__discard')
          ?.getAttribute('data-attempt-id')
      ).toBe('withdrawn');
    }
  });

  test('stands every lane bead of the fixture on both tabs', async () => {
    const { worker, monitor } = await drawBothTabs();

    const worker_ids = [...cardsByBead(worker).keys()];
    const monitor_ids = [...cardsByBead(monitor).keys()];

    expect(monitor_ids.sort()).toEqual(SHARED_BEADS);
    expect(worker_ids.filter((id) => monitor_ids.includes(id)).sort()).toEqual(
      SHARED_BEADS
    );
  });

  test('draws the same chips, badges and buttons for every bead both tabs show', async () => {
    const { worker, monitor } = await drawBothTabs();

    const worker_cards = cardsByBead(worker);
    const monitor_cards = cardsByBead(monitor);

    expect(partsByBead(monitor_cards, SHARED_BEADS)).toEqual(
      partsByBead(worker_cards, SHARED_BEADS)
    );
  });

  test('draws the same bound chip on a quick_fix issue from the quick fix bindings', async () => {
    const preset_store = {
      get: () => ({
        revision: 4,
        presets: [
          {
            id: 'q1',
            name: '빠른 수정',
            applies_to: 'quick_fix',
            settings: { impl_runtime: 'claude' }
          }
        ],
        chip_bindings: { complex: null, frontend: null, backend: null },
        quick_fix_chip_bindings: {
          complex: 'q1',
          frontend: null,
          backend: null
        }
      }),
      set: () => {},
      subscribe: () => () => {}
    };
    const { worker, monitor } = await drawBothTabs(undefined, {}, preset_store);

    const worker_cards = cardsByBead(worker);
    const monitor_cards = cardsByBead(monitor);

    expect(
      monitor_cards.get('Q-1')?.querySelector('.judgement-chip--bound')
    ).toBeInstanceOf(HTMLElement);
    expect(
      worker_cards.get('Q-1')?.querySelector('.judgement-chip--bound')
    ).toBeInstanceOf(HTMLElement);
    expect(partsByBead(monitor_cards, SHARED_BEADS)).toEqual(
      partsByBead(worker_cards, SHARED_BEADS)
    );
  });

  test('labels the pinned foreign PR merge button with the target name on both tabs', async () => {
    const { worker, monitor } = await drawBothTabs();

    const labels = [worker, monitor].map((mount) =>
      (
        cardsByBead(mount).get('W-4')?.querySelector('.worker-mini__merge')
          ?.textContent || ''
      )
        .replace(/\s+/g, ' ')
        .trim()
    );

    expect(labels).toEqual([
      '머지 ↗ research-repo-template',
      '머지 ↗ research-repo-template'
    ]);
  });

  test('names the stopped-cleanup button 정리 재시도 on both tabs', async () => {
    const { worker, monitor } = await drawBothTabs();

    const labels = [worker, monitor].map((mount) =>
      (
        cardsByBead(mount).get('W-2')?.querySelector('.worker-mini__merge')
          ?.textContent || ''
      ).trim()
    );

    expect(labels).toEqual(['정리 재시도', '정리 재시도']);
  });

  test('draws [폐기] on the pinned session-registered external row on both tabs', async () => {
    const { worker, monitor } = await drawBothTabs();

    const labels = [worker, monitor].map((mount) =>
      (
        cardsByBead(mount).get('W-6')?.querySelector('.worker-mini__discard')
          ?.textContent || ''
      ).trim()
    );

    expect(labels).toEqual(['폐기', '폐기']);
  });

  test('draws the foreign handoff badge on both tabs', async () => {
    const { worker, monitor } = await drawBothTabs();

    const texts = [worker, monitor].map(
      (mount) => cardsByBead(mount).get('W-5')?.textContent || ''
    );

    for (const text of texts) {
      expect(text).toContain('외부 PR 사람 처리 필요');
    }
  });

  test('draws the capacity lines and the run-now button on the external wait card', async () => {
    const { worker, monitor } = await drawBothTabs();

    for (const mount of [worker, monitor]) {
      const card = /** @type {HTMLElement} */ (cardsByBead(mount).get('E-1'));
      expect(card.querySelectorAll('.external-job__note')).toHaveLength(2);
      expect(
        card
          .querySelector('[data-external-wait-op="external_wait_takeover"]')
          ?.textContent?.trim()
      ).toBe('▶ 바로 실행');
    }
  });

  test.each(
    /** @type {const} */ ([
      'no_launch_record',
      'workflow_local_profile_missing'
    ])
  )(
    'replaces run-now with the same %s explanation on both tabs',
    async (takeover_blocker) => {
      const { worker, monitor } = await drawBothTabs(takeover_blocker);

      const worker_card = /** @type {HTMLElement} */ (
        cardsByBead(worker).get('E-1')
      );
      const monitor_card = /** @type {HTMLElement} */ (
        cardsByBead(monitor).get('E-1')
      );

      expect(partsOf(monitor_card)).toEqual(partsOf(worker_card));
      for (const card of [worker_card, monitor_card]) {
        const notes = card.querySelectorAll('.external-job__note');
        expect(notes).toHaveLength(3);
        expect(notes[2].textContent).toContain('바로 실행 불가 ·');
        expect(
          card.querySelector('[data-external-wait-op="external_wait_takeover"]')
        ).toBeNull();
      }
    }
  );

  test('draws the same log-view control on a PR 대기 row whose completion failed', async () => {
    const log_path = path.join(tmp_root, 'state', 'deploy.log');
    const { worker, monitor } = await drawBothTabs(undefined, {
      completion_intents: {
        'W-1': {
          target_base: 'main',
          phase: 'needs_human',
          subject: { role: 'root', bead_id: 'W-1' },
          active_op: null,
          terminal_reason: { stage: 'deploy', reason: 'x', log_path },
          auto_resolution: null,
          paused_resolution: null
        }
      }
    });

    const controls = [worker, monitor].map((mount) => {
      const control = /** @type {HTMLElement|null} */ (
        cardsByBead(mount)
          .get('W-1')
          ?.querySelector('[data-seam="log-view-open"]') || null
      );
      return control
        ? {
            text: control.textContent?.trim(),
            data: { ...control.dataset }
          }
        : null;
    });

    expect(controls[0]).toEqual({
      text: '로그 보기',
      data: {
        seam: 'log-view-open',
        workspace: WS,
        logSource: 'completion',
        logId: 'W-1',
        logPath: log_path
      }
    });
    expect(controls[1]).toEqual(controls[0]);
    expect(
      partsOf(/** @type {HTMLElement} */ (cardsByBead(monitor).get('W-1')))
    ).toEqual(
      partsOf(/** @type {HTMLElement} */ (cardsByBead(worker).get('W-1')))
    );
  });

  // UI-3v1h §5.5: 이 저장소에 멤버가 없는 전역 target도 두 탭에 같은 칩을 세운다.
  test('draws the same provider gate from a hold another workspace observed', async () => {
    const { worker, monitor } = await drawBothTabs(undefined, {
      provider_hold: {
        claude: {
          since: NOW - HOUR,
          generation: 3,
          targets: [
            {
              target_id: 't-elsewhere',
              origin: '/elsewhere',
              kind: 'outage',
              model: 'opus',
              account: null,
              detail: 'overloaded_529',
              last_error: 'API Error: 529 Overloaded',
              resets_at: null,
              rearm_count: 0,
              attempt_ids: [],
              next_probe_at: NOW + HOUR
            }
          ]
        }
      }
    });

    const worker_card = /** @type {HTMLElement} */ (
      cardsByBead(worker).get('Q-1')
    );
    const monitor_card = /** @type {HTMLElement} */ (
      cardsByBead(monitor).get('Q-1')
    );
    expect(partsOf(monitor_card)).toEqual(partsOf(worker_card));
    expect(
      worker_card.querySelector('.worker-dep--gate-provider_outage')
    ).not.toBeNull();
  });

  test('stands an issue closed outside the Worker only in the Worker done lane', async () => {
    const { worker, monitor } = await drawBothTabs();

    expect(
      worker.querySelector('#worker-pane-done [data-bead-id="X-1"]')
    ).not.toBeNull();
    expect(monitor.querySelector('[data-bead-id="X-1"]')).toBeNull();
  });

  test('stands a deferred issue only on the Worker deferred shelf', async () => {
    const { worker, monitor } = await drawBothTabs();

    expect(
      worker.querySelector('.worker-deferred [data-bead-id="F-1"]')
    ).not.toBeNull();
    expect(monitor.querySelector('[data-bead-id="F-1"]')).toBeNull();
  });

  test('draws ⏸ 보류로 전환 on the shelved row on both tabs (UI-0d9i §3.1)', async () => {
    const { worker, monitor } = await drawBothTabs();

    const holders = [worker, monitor].map((mount) =>
      Array.from(mount.querySelectorAll('.worker-mini__defer')).map((button) =>
        button.closest('[data-bead-id]')?.getAttribute('data-bead-id')
      )
    );

    expect(holders).toEqual([['W-7'], ['W-7']]);
  });

  test('hides a deferred PR 대기 row on both tabs and shelves it only on Worker (UI-0d9i §3.4)', async () => {
    const { worker, monitor } = await drawBothTabs();

    expect(
      [worker, monitor].map(
        (mount) =>
          mount.querySelectorAll('.worker-mini[data-bead-id="W-8"]').length
      )
    ).toEqual([0, 0]);
    expect(
      worker.querySelector('.worker-deferred [data-bead-id="W-8"]')
    ).not.toBeNull();
  });

  test('draws ↺ 되살리기 only on the Worker deferred shelf, an intended difference (§9)', async () => {
    const { worker, monitor } = await drawBothTabs();

    expect(
      worker.querySelector(
        '.worker-deferred [data-bead-id="F-1"] .worker-card__revive'
      )
    ).not.toBeNull();
    expect(monitor.querySelector('.worker-card__revive')).toBeNull();
  });
});

describe('session-inquiry row parity between the Worker and Monitor tabs (UI-gske §3.4)', () => {
  const ID = 'si-0123456789ab';

  /** @returns {Record<string, any>} */
  function inquiryPatch() {
    return {
      session_inquiries: {
        [ID]: {
          id: ID,
          repo: WS,
          ref: 'refs/set-aside/main/sync-1',
          session_id: '11111111-2222-4333-8444-555555555555',
          runner: 'claude',
          cwd: WS,
          summary: '보관한 묶음을 다시 적용할까요?',
          bundles: [{ title: '설정 변경', paths: ['a.js'], reason: '충돌' }],
          related_beads: ['C-1'],
          state: 'waiting',
          created_at: NOW - HOUR,
          updated_at: NOW - HOUR,
          notified_at: NOW - HOUR,
          auto_resume_consumed: [],
          liveness: { state: 'dead', at: NOW - 60 * 1000, tmux: null },
          closed_reason: null,
          note: null
        }
      }
    };
  }

  /**
   * Open the 저장소 작업 drawer of the fixture repository on both tabs: the
   * Worker strip and the Monitor `⚠ N` badge.
   *
   * @returns {Promise<{ worker: HTMLElement, monitor: HTMLElement }>}
   */
  async function openBothDrawers() {
    vi.mocked(workerAttached).mockReturnValue(true);
    const mounts = await drawBothTabs(undefined, inquiryPatch());
    /** @type {HTMLElement} */ (
      mounts.worker.querySelector('.worker-repo-strip')
    ).click();
    /** @type {HTMLElement} */ (
      mounts.monitor.querySelector('[data-act="repo-ops"]')
    ).click();
    return mounts;
  }

  afterEach(() => {
    vi.mocked(workerAttached).mockImplementation(() => false);
  });

  test('draws the same drawer row on both tabs', async () => {
    const { worker, monitor } = await openBothDrawers();

    const rows = [worker, monitor].map((mount) =>
      mount.querySelector(`li[data-inquiry-id="${ID}"]`)
    );

    expect(rows[0]).not.toBeNull();
    expect(partsOf(/** @type {HTMLElement} */ (rows[1]))).toEqual(
      partsOf(/** @type {HTMLElement} */ (rows[0]))
    );
    expect(
      rows[0]?.querySelector('.worker-session-inquiry__resolve')?.textContent
    ).toContain('세션에서 이어가기');
  });

  test('counts the open row in the same unresolved number on both tabs', async () => {
    vi.mocked(workerAttached).mockReturnValue(true);
    const { worker, monitor } = await drawBothTabs(undefined, inquiryPatch());

    const worker_count = (
      worker.querySelector('.worker-repo-strip__badge')?.textContent || ''
    ).replace(/\D+/g, '');
    const monitor_count = (
      monitor.querySelector('[data-act="repo-ops"]')?.textContent || ''
    ).replace(/\D+/g, '');

    expect(worker_count).toBe('2');
    expect(monitor_count).toBe(worker_count);
  });

  test('opens the drawer at the row from the 막힘 chip entry on both tabs', async () => {
    vi.mocked(workerAttached).mockReturnValue(true);
    const { worker, monitor } = await drawBothTabs(undefined, inquiryPatch());
    HTMLElement.prototype.scrollIntoView = vi.fn();

    for (const mount of [worker, monitor]) {
      const entry = Array.from(
        mount.querySelectorAll('.wait-summary__item')
      ).find((item) => (item.textContent || '').includes('보관 main/sync-1'));
      /** @type {HTMLElement} */ (entry).click();
    }

    for (const mount of [worker, monitor]) {
      expect(
        mount
          .querySelector(`li[data-inquiry-id="${ID}"]`)
          ?.classList.contains('wait-reason--highlight')
      ).toBe(true);
    }
  });

  test('names the 막힘 chip entry by its ref on both tabs', async () => {
    vi.mocked(workerAttached).mockReturnValue(true);
    const { worker, monitor } = await drawBothTabs(undefined, inquiryPatch());

    const entries = [worker, monitor].map((mount) =>
      Array.from(mount.querySelectorAll('.wait-summary__item'))
        .map((item) => (item.textContent || '').replace(/\s+/g, ' ').trim())
        .filter((text) => text.includes('보관 main/sync-1'))
    );

    expect(entries[0]).toHaveLength(1);
    expect(entries[1]).toEqual(entries[0]);
  });
});
