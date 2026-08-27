/**
 * Serial-lane end-to-end flow (UI-04vo seam K, parallelism analysis removed by
 * UI-s582 §4).
 *
 * Runs the REAL modules — queue store, scheduler, and the lane submit CAS —
 * inside a DISPOSABLE workspace: a temporary git repo plus a per-test
 * `XDG_STATE_HOME`. One thing is faked, for one reason (a test must never
 * launch a real process): the runner spawn replays a fixture.
 *
 * What it proves end to end:
 *   lane placement → drag correction under blocks → submit → head dispatch →
 *   lane occupancy held through failure → release on discard.
 */
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { makeFixtureSpawn } from '../worker/runner/fixture-spawn.js';
import { createRunner } from '../worker/runner/index.js';
import { createWorkerRuntime } from '../worker/runtime.js';
import { createScheduler } from '../worker/scheduler.js';

// Waits on REAL child processes (git, node, python), so wall time here is
// process startup under the load the parallel suite creates, not product work.
// Assertions are unchanged; only the waiting budget is sized for that load.
vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });

/**
 * Vitest's own default budget, restated because this file raises the file-level
 * budget for the suites that drive real git. The suites below are pure
 * computation and are held to the unchanged default.
 */
const PURE = { timeout: 5_000 };

const execFileAsync = promisify(execFile);
const FIXTURES = path.resolve(process.cwd(), 'server/worker/__fixtures__');

/** @type {string} */
let tmp_state;
/** @type {string} */
let repo_dir;
/** @type {string} */
let WS;
/** @type {string} */
let base_sha;

/**
 * @param {string[]} args
 * @param {{ cwd: string }} options
 */
async function gitRun(args, options) {
  return execFileAsync('git', args, options);
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

beforeEach(async () => {
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

describe('worker lanes e2e — 배치 → 제출 → dispatch (UI-04vo seam K)', () => {
  test('runs the whole lane flow from placement to lane release', async () => {
    const { runtime, scheduler } = buildSystem({
      config: { 'UI-a': {}, 'UI-b': {}, 'UI-c': {} },
      slots: 3
    });
    const store = runtime.queueStore;

    // 1. Ordinary queue placement + reorder.
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

    // 2. Submit the (edited) draft — reversed order, corrected by blocks.
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

    // 3. Dispatch: the parallel entry and the serial HEAD only.
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

    // 4. Lane occupancy survives a failed lineage.
    store.updateAttempt(WS, {
      attempt_id: String(attempt_id),
      patch: { status: 'failed', cause: 'session_failed:abnormal_exit' }
    });
    store.setAutoAdvance(WS, true);
    await scheduler.tick(WS);
    expect(scheduler.isRunning('UI-b')).toBe(false);

    // 5. Discarding the lineage releases the lane and the next head dispatches.
    store.discardAttempt(WS, {
      attempt_id: String(attempt_id),
      bead_id: 'UI-a',
      patch: { status: 'discarded' }
    });
    store.setAutoAdvance(WS, true);
    await scheduler.tick(WS);
    expect(scheduler.isRunning('UI-b')).toBe(true);
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

describe('worker lanes — 은퇴 심볼 부재 (UI-04vo Phase 9)', PURE, () => {
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
