/**
 * Serial-lane + parallelism-analysis end-to-end flow (UI-04vo seam K).
 *
 * Runs the REAL modules — queue store, scheduler, analysis snapshot/bundle/
 * validator/store, and the lane submit CAS — inside a DISPOSABLE workspace: a
 * temporary git repo plus a per-test `XDG_STATE_HOME`. Only two things are
 * faked, and both for the same reason (a test must never launch a real
 * process): the runner spawn replays a fixture, and the analyzer is a
 * tool-free stub whose call count is itself asserted.
 *
 * What it proves end to end:
 *   lane placement → drag correction under blocks → analysis (fresh, then
 *   cache hit) → draft edit → submit → head dispatch → lane occupancy held
 *   through failure → release on discard, and that the ordinary queue paths
 *   call the analyzer ZERO times.
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { collectAnalysisBundle } from '../worker/parallel-analysis-bundle.js';
import {
  analysisIdentityOf,
  createParallelAnalysisStore
} from '../worker/parallel-analysis-store.js';
import { collectAnalysisSnapshot } from '../worker/parallel-analysis-targets.js';
import { validateAnalysisResult } from '../worker/parallel-analysis-validator.js';
import { makeFixtureSpawn } from '../worker/runner/fixture-spawn.js';
import { createRunner } from '../worker/runner/index.js';
import { createWorkerRuntime } from '../worker/runtime.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { createScheduler } from '../worker/scheduler.js';
import {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} from '../ws.js';
import { __setAnalysisDepsForTest } from '../ws/worker-parallel-analysis-handlers.js';

const execFileAsync = promisify(execFile);
const FIXTURES = path.resolve(process.cwd(), 'server/worker/__fixtures__');
const RECEIPT = `self@${'a'.repeat(40)}`;

/** @type {string} */
let tmp_state;
/** @type {string} */
let repo_dir;
/** @type {string} */
let WS;
/** @type {string} */
let base_sha;
/** @type {number} */
let analyzer_calls;

/**
 * @param {string[]} args
 * @param {{ cwd: string }} options
 */
async function gitRun(args, options) {
  return execFileAsync('git', args, options);
}

/**
 * Real pinned-blob reader against the disposable repo.
 *
 * @param {string[]} args
 */
async function repoGitRun(args) {
  try {
    const { stdout } = await execFileAsync('git', args, { cwd: repo_dir });
    return { code: 0, stdout };
  } catch {
    return { code: 128, stdout: '' };
  }
}

/**
 * @param {Record<string, any>} config
 */
function makeFakeBd(config) {
  return {
    async snapshotBead(/** @type {string} */ bead_id) {
      const c = config[bead_id] || {};
      return {
        ready: c.ready ?? true,
        blocked: c.blocked ?? false,
        repo: repo_dir,
        target_base: 'main',
        runner: 'claude',
        model: 'opus',
        effort: 'high',
        workflow_mode: null,
        route: 'spec_backed',
        status: c.status ?? 'open',
        labels: [],
        deps: c.deps ?? [],
        blocked_by: c.deps ?? []
      };
    },
    async setMetadata() {},
    async unsetMetadata() {},
    async readMetadata(
      /** @type {string} */ _bead_id,
      /** @type {string} */ key
    ) {
      if (key === 'workflow_mode') {
        return 'fast_track';
      }
      // Dispatch stamps and confirms the mode's authority in the same write
      // (UI-bu6d §5), so the fake echoes both keys.
      return key === 'workflow_mode_source' ? 'worker' : null;
    },
    async setStatus() {},
    async readStatus() {
      return 'in_progress';
    }
  };
}

/**
 * @param {string} id
 */
function issueOf(id) {
  return {
    id,
    title: id,
    status: 'open',
    labels: [],
    dependencies: [],
    metadata: {
      route: 'spec_backed',
      spec_id: `docs/${id}.md`,
      spec_review: RECEIPT
    }
  };
}

/**
 * Build the real system over the disposable workspace.
 *
 * @param {{ config?: Record<string, any>, slots?: number }} [opts]
 */
function buildSystem(opts = {}) {
  const runtime = createWorkerRuntime();
  const bd = makeFakeBd(opts.config || {});
  const scheduler = createScheduler({
    store: runtime.queueStore,
    execPresetCoordinator: runtime.execPresetCoordinator,
    makeRunner: (name) =>
      createRunner(name, {
        spawn_impl: makeFixtureSpawn({
          file: path.join(FIXTURES, 'claude-success.jsonl'),
          exit: 0
        })
      }),
    bd,
    worktree: {
      add: async (/** @type {{ bead_id: string }} */ { bead_id }) => ({
        path: path.join(repo_dir, '.wt', bead_id),
        branch: bead_id,
        base_oid: base_sha
      }),
      remove: async () => ({ code: 0 })
    },
    verify: {
      verifyPrSubmitted: async () => ({
        ok: true,
        reason: 'ok',
        pr_url: 'https://github.com/o/r/pull/1'
      })
    },
    sessionLog: runtime.sessionLog
  });
  runtime.queueStore.setSlots(WS, {
    expected_revision: runtime.queueStore.snapshot(WS).revision,
    slots: opts.slots ?? 3
  });
  return { runtime, bd, scheduler };
}

/**
 * One full analysis pass through the REAL snapshot/bundle/validator chain with
 * a tool-free analyzer stub. Returns what the ws handler would cache.
 *
 * @param {{ runtime: any, analysis: any, issues: any[], result: (digest: string) => any, force?: boolean }} input
 */
async function runAnalysisPass(input) {
  const { runtime, analysis, issues } = input;
  const settings = analysis.readSettings();
  const collected = await collectAnalysisSnapshot({
    workspace: WS,
    issues,
    queue: runtime.queueStore.snapshot(WS),
    base: { ref: 'main', sha: base_sha },
    gitRun: repoGitRun
  });
  if (!collected.ok) {
    return { ok: false, reason: collected.reason };
  }
  const identity = analysisIdentityOf({
    snapshot: collected.snapshot,
    runner: settings.runner,
    model: settings.model,
    model_id: settings.model,
    effort: settings.effort
  });
  const cache = analysis.readCache(WS);
  if (!input.force && cache.last_good?.identity === identity) {
    return { ok: true, cached: true, identity, result: cache.last_good.result };
  }
  const bundle = await collectAnalysisBundle({
    snapshot: collected.snapshot,
    gitRun: repoGitRun
  });
  try {
    const job = analysis.startJob(WS, {
      identity,
      start: () => {
        analyzer_calls += 1;
        return {
          done: Promise.resolve({
            ok: true,
            result: input.result(collected.snapshot.digest)
          }),
          cancel: vi.fn()
        };
      }
    });
    const outcome = await job.done;
    const verdict = validateAnalysisResult({
      result: outcome.result,
      snapshot: collected.snapshot,
      manifest: bundle.manifest,
      readBundleFile: (/** @type {string} */ file) => {
        try {
          return fs.readFileSync(path.join(bundle.dir, file), 'utf8');
        } catch {
          return null;
        }
      }
    });
    if (!verdict.ok) {
      return { ok: false, reason: verdict.reason };
    }
    analysis.saveLastGood(WS, { identity, result: verdict.result });
    return { ok: true, cached: false, identity, result: verdict.result };
  } finally {
    bundle.cleanup();
  }
}

beforeEach(async () => {
  analyzer_calls = 0;
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-lanes-state-'));
  process.env.XDG_STATE_HOME = tmp_state;
  WS = path.join(tmp_state, 'workspace');
  repo_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-lanes-repo-'));
  await gitRun(['init', '-q'], { cwd: repo_dir });
  await gitRun(['checkout', '-q', '-b', 'main'], { cwd: repo_dir });
  await gitRun(['config', 'user.email', 'e2e@test'], { cwd: repo_dir });
  await gitRun(['config', 'user.name', 'e2e'], { cwd: repo_dir });
  fs.mkdirSync(path.join(repo_dir, 'docs'), { recursive: true });
  for (const id of ['UI-a', 'UI-b', 'UI-c']) {
    fs.writeFileSync(
      path.join(repo_dir, 'docs', `${id}.md`),
      `# ${id}\n레인 상태는 queue.json 에 있다\n`
    );
  }
  await gitRun(['add', '.'], { cwd: repo_dir });
  await gitRun(['commit', '-q', '-m', 'specs'], { cwd: repo_dir });
  const { stdout } = await execFileAsync('git', ['rev-parse', 'HEAD'], {
    cwd: repo_dir
  });
  base_sha = stdout.trim();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  for (const dir of [tmp_state, repo_dir]) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      /* ignore */
    }
  }
});

describe('worker lanes e2e — 분석 → 편집 → 제출 → dispatch (UI-04vo seam K)', () => {
  test('runs the whole lane + analysis flow and never calls the analyzer on ordinary queue paths', async () => {
    const { runtime, scheduler } = buildSystem({
      config: { 'UI-a': {}, 'UI-b': {}, 'UI-c': {} },
      slots: 3
    });
    const store = runtime.queueStore;
    const analysis = createParallelAnalysisStore();
    analysis.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });

    // 1. Ordinary queue placement + reorder — no analyzer involvement.
    let rev = store.snapshot(WS).revision;
    for (const id of ['UI-a', 'UI-b', 'UI-c']) {
      rev = store.place(WS, { expected_revision: rev, bead_id: id }).queue
        .revision;
    }
    rev = store.reorder(WS, {
      expected_revision: rev,
      bead_id: 'UI-c',
      to_index: 0
    }).queue.revision;
    expect(analyzer_calls).toBe(0);

    // 2. Analysis: a fresh run, then the identical identity as a cache hit.
    const issues = [issueOf('UI-a'), issueOf('UI-b'), issueOf('UI-c')];
    /**
     * @param {string} digest
     */
    const suggested = (digest) => ({
      schema_version: 3,
      snapshot_digest: digest,
      issues: [{ bead_id: 'UI-c', verdict: 'parallel_ok', reason: '독립' }],
      groups: [
        {
          members: ['UI-a', 'UI-b'],
          order: ['UI-a', 'UI-b'],
          confidence: 'high',
          categories: ['schema_or_migration'],
          reason: '같은 마이그레이션',
          evidence: [
            {
              path: 'docs/UI-a.md',
              artifact_kind: 'spec',
              locator: 'queue.json'
            }
          ]
        }
      ]
    });
    const first = await runAnalysisPass({
      runtime,
      analysis,
      issues,
      result: suggested
    });
    expect(first.ok).toBe(true);
    expect(first.cached).toBe(false);
    expect(first.result.groups[0].eligible).toBe(true);
    expect(analyzer_calls).toBe(1);

    const second = await runAnalysisPass({
      runtime,
      analysis,
      issues,
      result: suggested
    });
    expect(second.cached).toBe(true);
    expect(analyzer_calls).toBe(1);

    // 3. Submit the (edited) draft — reversed order, corrected by blocks.
    const submit = store.applySerialGroup(WS, {
      expected_revision: store.snapshot(WS).revision,
      lane: 's1',
      ordered_bead_ids: ['UI-b', 'UI-a'],
      blocks_edges: [{ blocker: 'UI-a', blockee: 'UI-b' }]
    });
    expect(submit.ok).toBe(true);
    expect(
      submit.queue.serial_lanes[0].entries.map(
        (/** @type {any} */ e) => e.bead_id
      )
    ).toEqual(['UI-a', 'UI-b']);
    expect(submit.queue.queue.map((/** @type {any} */ e) => e.bead_id)).toEqual(
      ['UI-c']
    );

    // 4. Dispatch: the parallel entry and the serial HEAD only.
    store.setAutoAdvance(WS, true);
    await scheduler.tick(WS);
    expect(scheduler.isRunning('UI-a')).toBe(true);
    expect(scheduler.isRunning('UI-c')).toBe(true);
    expect(scheduler.isRunning('UI-b')).toBe(false);

    const attempt_id = Object.values(store.snapshot(WS).attempts).find(
      (/** @type {any} */ attempt) => attempt.bead_id === 'UI-a'
    )?.attempt_id;
    expect(store.snapshot(WS).attempts[String(attempt_id)].serial_lane_id).toBe(
      's1'
    );

    // 5. Lane occupancy survives a failed lineage.
    store.updateAttempt(WS, {
      attempt_id: String(attempt_id),
      patch: { status: 'failed', cause: 'session_failed:abnormal_exit' }
    });
    store.setAutoAdvance(WS, true);
    await scheduler.tick(WS);
    expect(scheduler.isRunning('UI-b')).toBe(false);

    // 6. Discarding the lineage releases the lane and the next head dispatches.
    store.discardAttempt(WS, {
      attempt_id: String(attempt_id),
      bead_id: 'UI-a',
      patch: { status: 'discarded' }
    });
    store.setAutoAdvance(WS, true);
    await scheduler.tick(WS);
    expect(scheduler.isRunning('UI-b')).toBe(true);

    // The analyzer was never called by any of the queue/dispatch work above.
    expect(analyzer_calls).toBe(1);
  });

  test('a blocked serial head waits while other lanes keep dispatching', async () => {
    const { runtime, scheduler } = buildSystem({
      config: {
        'UI-a': { ready: false, blocked: true },
        'UI-b': {},
        'UI-c': {}
      },
      slots: 3
    });
    const store = runtime.queueStore;
    let rev = store.snapshot(WS).revision;
    rev = store.setSerialLaneCount(WS, {
      expected_revision: rev,
      count: 2
    }).queue.revision;
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: 'UI-a',
      lane: 's1'
    }).queue.revision;
    rev = store.place(WS, {
      expected_revision: rev,
      bead_id: 'UI-b',
      lane: 's1'
    }).queue.revision;
    store.place(WS, { expected_revision: rev, bead_id: 'UI-c', lane: 's2' });
    store.setAutoAdvance(WS, true);

    await scheduler.tick(WS);

    expect(scheduler.isRunning('UI-a')).toBe(false);
    expect(scheduler.isRunning('UI-b')).toBe(false);
    expect(scheduler.isRunning('UI-c')).toBe(true);
    expect(store.snapshot(WS).admission['UI-a']?.reason).toContain('not_ready');
  });
});

describe('worker lanes e2e — WS 경계 통과 분석·제출 (UI-04vo seam K)', () => {
  test('drives start and submit through the real ws handlers', async () => {
    const runtime = getWorkerRuntime();
    __resetRegistriesForTest();
    __resetWorkerQueueForTest();
    attachWsServer(createServer(), { path: '/ws' });
    const ws_workspace = process.cwd();
    const store = runtime.queueStore;
    let rev = store.snapshot(ws_workspace).revision;
    for (const id of ['UI-a', 'UI-b']) {
      rev = store.place(ws_workspace, {
        expected_revision: rev,
        bead_id: id
      }).queue.revision;
    }
    runtime.parallelAnalysis.updateSettings({
      expected_revision: runtime.parallelAnalysis.readSettings().revision,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });
    __setAnalysisDepsForTest({
      listIssues: async () => [issueOf('UI-a'), issueOf('UI-b')],
      analysisContext: () => ({
        repo: repo_dir,
        resolveBase: async () => ({
          ok: true,
          base: 'main',
          base_oid: base_sha
        }),
        gitRun: repoGitRun
      }),
      runAnalysis: (/** @type {any} */ run_input) => {
        analyzer_calls += 1;
        return {
          done: Promise.resolve({
            ok: true,
            result: {
              schema_version: 3,
              snapshot_digest: run_input.snapshot.digest,
              issues: [],
              groups: [
                {
                  members: ['UI-a', 'UI-b'],
                  order: ['UI-a', 'UI-b'],
                  confidence: 'high',
                  categories: ['schema_or_migration'],
                  reason: '같은 마이그레이션',
                  evidence: [
                    {
                      path: 'docs/UI-a.md',
                      artifact_kind: 'spec',
                      locator: 'queue.json'
                    }
                  ]
                }
              ]
            }
          }),
          cancel: () => {}
        };
      }
    });

    /** @type {string[]} */
    const sent = [];
    const sock = /** @type {any} */ ({
      readyState: 1,
      OPEN: 1,
      /** @param {string} msg */
      send(msg) {
        sent.push(String(msg));
      }
    });
    /**
     * @param {string} id
     * @param {string} type
     * @param {Record<string, unknown>} [payload]
     */
    const send = (id, type, payload) =>
      handleMessage(sock, Buffer.from(JSON.stringify({ id, type, payload })));
    /** @param {string} id */
    const replyFor = (id) =>
      sent.map((raw) => JSON.parse(raw)).find((m) => m.id === id);

    await send('s1', 'subscribe-worker-parallel-analysis', { id: 'pa' });
    await send('r1', 'worker-parallel-analysis-start', {});
    expect(replyFor('r1').payload.applied).toBe(true);
    expect(analyzer_calls).toBe(1);

    const snapshot = sent
      .map((raw) => JSON.parse(raw))
      .filter((m) => m.type === 'worker-parallel-analysis-snapshot')
      .at(-1);
    const digest = snapshot.payload.last_good.identity_digest;
    expect(snapshot.payload.last_good.result.groups[0].eligible).toBe(true);

    await send('sub1', 'worker-parallel-analysis-submit', {
      snapshot_digest: digest,
      group_index: 0,
      lane: 's1',
      ordered_bead_ids: ['UI-b', 'UI-a'],
      expected_revision: store.snapshot(ws_workspace).revision
    });

    expect(replyFor('sub1').payload.applied).toBe(true);
    const after = store.snapshot(ws_workspace);
    expect(after.serial_lanes[0].entries.map((e) => e.bead_id)).toEqual([
      'UI-b',
      'UI-a'
    ]);
    expect(after.queue).toEqual([]);

    __setAnalysisDepsForTest(null);
    __resetRegistriesForTest();
    __resetWorkerQueueForTest();
  });
});

describe('worker lanes — 은퇴 심볼 부재 (UI-04vo Phase 9)', () => {
  /**
   * Active runtime sources only: the legacy-drop entry in `normalizeQueue`'s
   * known-field list and the migration tests that prove the drop are the two
   * places a retired name is still allowed to appear.
   *
   * @returns {string[]}
   */
  function activeRuntimeFiles() {
    /** @type {string[]} */
    const out = [];
    /**
     * @param {string} dir
     */
    function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const abs = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          if (entry.name === 'node_modules' || entry.name === '__fixtures__') {
            continue;
          }
          walk(abs);
          continue;
        }
        if (
          entry.name.endsWith('.js') &&
          !entry.name.endsWith('.test.js') &&
          !entry.name.includes('bundle')
        ) {
          out.push(abs);
        }
      }
    }
    walk(path.resolve(process.cwd(), 'server'));
    walk(path.resolve(process.cwd(), 'app'));
    return out;
  }

  test('no active runtime source consumes a retired worker-serial symbol', () => {
    const retired = [
      'workerSerialLaunchRefusal',
      'preflightWorkerSerialLaunch',
      'acquireWorkerSerialLaunch',
      'activeSerialLineages',
      'rebuildPendingSerial',
      'refreshPendingSerial',
      'convergeWorkerSerialLabel',
      'setPrWaitHoldsSlot',
      'worker-queue-set-pr-wait-hold'
    ];
    /** @type {string[]} */
    const offenders = [];
    for (const file of activeRuntimeFiles()) {
      const source = fs.readFileSync(file, 'utf8');
      for (const symbol of retired) {
        if (source.includes(symbol)) {
          offenders.push(`${path.relative(process.cwd(), file)}: ${symbol}`);
        }
      }
    }

    expect(offenders).toEqual([]);
  });

  test('pr_wait_holds_slot survives only as the legacy-drop key', () => {
    /** @type {string[]} */
    const offenders = [];
    for (const file of activeRuntimeFiles()) {
      const source = fs.readFileSync(file, 'utf8');
      if (!source.includes('pr_wait_holds_slot')) {
        continue;
      }
      if (file.endsWith(path.join('server', 'worker', 'queue-store.js'))) {
        continue;
      }
      offenders.push(path.relative(process.cwd(), file));
    }

    expect(offenders).toEqual([]);
  });
});
