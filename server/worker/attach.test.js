import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  RECONCILE_INTERVAL_SECONDS,
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest,
  createLiveBd,
  createWorkerAttachment,
  initWorkerRuntime,
  stopWorkerAttempt,
  tickWorkerQueue
} from './attach.js';
import {
  pushLogPath as guardPushLogPath,
  install as installGuardHook
} from './guard-hook.js';
import { createQueueStore } from './queue-store.js';
import { makeFixtureSpawn } from './runner/fixture-spawn.js';
import { createWorkerRuntime } from './runtime.js';
import { sessionLogPath } from './state-paths.js';

const FIXTURES = path.resolve(process.cwd(), 'server/worker/__fixtures__');

/**
 * A resolved-base stub for `createLiveBd` (worker-base-scope-alignment §1): the
 * resolver is the ONLY source of a snapshot's base now, so every snapshot test
 * injects one instead of pinning a plain string.
 *
 * @param {string} base
 * @param {string} [base_oid]
 */
function okBase(base, base_oid = 'a'.repeat(40)) {
  return async () => ({
    ok: /** @type {const} */ (true),
    base,
    declared: base !== 'main',
    remote: 'origin',
    remote_ref: `refs/remotes/origin/${base}`,
    base_oid,
    local_only: false
  });
}

/**
 * An UNRESOLVED base stub: a declaration whose step failed.
 *
 * @param {'declaration'|'format'|'remote_prefix'|'remote'|'fetch'|'ref'|'git_error'} step
 */
function failBase(step) {
  return async () => ({
    ok: /** @type {const} */ (false),
    step,
    base: 'ilsun/dv',
    detail: 'test'
  });
}
/**
 * Write a raw line the way the RUNNER now does — straight to the session-log
 * file through its own fd (UI-o2yt §3.1), with no server-side writer.
 *
 * @param {string} attempt_id
 * @param {unknown} event
 */
function writeRunnerLine(attempt_id, event) {
  const file = sessionLogPath(WS, attempt_id);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.appendFileSync(file, `${JSON.stringify(event)}\n`);
}

/** @type {string} */
let tmp_state;
/** @type {string} */
let WS;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-attach-'));
  process.env.XDG_STATE_HOME = tmp_state;
  WS = path.join(tmp_state, 'workspace');
  __resetWorkerAttachmentsForTest();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  delete process.env.BDUI_CONFIG_PATH;
  __resetWorkerAttachmentsForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @param {() => boolean} pred
 * @param {number} [timeout_ms]
 */
async function waitFor(pred, timeout_ms = 1000) {
  const start = Date.now();
  while (Date.now() - start < timeout_ms) {
    if (pred()) {
      return;
    }
    await new Promise((r) => setTimeout(r, 5));
  }
  if (!pred()) {
    throw new Error('waitFor timed out');
  }
}

/**
 * @param {Record<string, any>} config
 */
function fakeBd(config = {}) {
  /** @type {any[]} */
  const calls = [];
  return {
    calls,
    async snapshotBead(/** @type {string} */ bead_id) {
      const c = config[bead_id] || {};
      return {
        ready: c.ready ?? true,
        blocked: c.blocked ?? false,
        repo: c.repo ?? '/repo',
        target_base: c.target_base ?? 'main',
        runner: c.runner ?? 'claude',
        model: c.model ?? 'opus',
        effort: c.effort ?? 'high',
        workflow_mode: null,
        route: c.route ?? null,
        status: c.status ?? '',
        deps: []
      };
    },
    async setMetadata(
      /** @type {string} */ id,
      /** @type {string} */ k,
      /** @type {string} */ v
    ) {
      calls.push(['set', id, k, v]);
    },
    async unsetMetadata(/** @type {string} */ id, /** @type {string} */ k) {
      calls.push(['unset', id, k]);
    },
    async readMetadata(/** @type {string} */ _id, /** @type {string} */ k) {
      return k === 'workflow_mode' ? 'fast_track' : null;
    }
  };
}

const fakeWorktree = {
  add: async (/** @type {{ bead_id: string }} */ { bead_id }) => ({
    path: `/wt/${bead_id}`,
    branch: bead_id,
    base_oid: 'oid'
  }),
  remove: async () => ({ code: 0 }),
  removeByBranch: async () => ({ ok: true, removed: false, reason: null }),
  // The manager owns the repo topology lock and hands it to the modules that
  // run their own ref-mutating git commands, so the fake must offer it too.
  withTopologyLock: async (
    /** @type {string} */ _repo,
    /** @type {any} */ fn
  ) => fn()
};

const okVerify = {
  verifyPrSubmitted: async () => ({
    ok: true,
    reason: 'ok',
    pr_url: 'https://github.com/o/r/pull/1'
  })
};

/**
 * Persist a `running` attempt the way a PRIOR process left it: the durable
 * record survives, the in-memory session handle does not.
 *
 * @param {any} store
 * @param {string} attempt_id
 * @param {string} bead_id
 */
function seedDetachedAttempt(store, attempt_id, bead_id) {
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id, bead_id }
  });
  store.updateAttempt(WS, {
    attempt_id,
    patch: { status: 'running', pid: 999999, started_at: 1000, repo: '/repo' }
  });
}

/**
 * @param {any} store
 * @param {string} id
 */
function seedQueue(store, id) {
  const rev = store.snapshot(WS).revision;
  store.place(WS, { expected_revision: rev, bead_id: id });
  store.setAutoAdvance(WS, true);
}

describe('worker/attach construction + live loop (F1)', () => {
  test('createWorkerAttachment builds a scheduler + reconcile timer over REAL deps', () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    expect(typeof att.scheduler.tick).toBe('function');
    expect(typeof att.scheduler.stop).toBe('function');
    expect(typeof att.scheduler.reconcile).toBe('function');
    expect(typeof att.reconciler.start).toBe('function');
    // The runtime running-count seam now reflects THIS scheduler.
    expect(runtime.status(WS).running_count).toBe(0);
  });

  test('builds a PR poller that stays silent without a subscriber provider', async () => {
    const runtime = createWorkerRuntime();
    const gh = {
      prDetail: vi.fn(),
      prChecks: vi.fn(),
      openPrForBranch: vi.fn(),
      checkAvailability: vi.fn(async () => ({ state: 'ok', data: true }))
    };
    const att = createWorkerAttachment(WS, {
      runtime,
      gh,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });

    await att.prPoller.tick();

    expect(gh.prDetail).not.toHaveBeenCalled();
    expect(gh.prChecks).not.toHaveBeenCalled();
  });

  test('toggle→tick dispatches via the real runner with the PR-submit preamble injected (fake spawn)', async () => {
    const runtime = createWorkerRuntime();
    const spawn_impl = makeFixtureSpawn({
      file: path.join(FIXTURES, 'claude-success.jsonl')
    });
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd({ S1: { runner: 'claude' } }),
      worktree: fakeWorktree,
      verify: okVerify,
      // This test probes the spawn/preamble wiring, not the admission gate.
      admission: { validate: async () => ({ ok: true }) },
      // …nor the base declaration: the temp workspace is not a git repo, so the
      // real resolver would refuse the dispatch before it reaches spawn.
      resolveBase: okBase('main'),
      spawn_impl
    });
    __registerWorkerAttachmentForTest(WS, att);

    seedQueue(runtime.queueStore, 'S1');
    // tickWorkerQueue is exactly what the worker-queue-toggle handler calls.
    await tickWorkerQueue(WS);

    await waitFor(() => spawn_impl.captured.calls.length > 0);
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('claude');
    // The always-on PR-submit directive reached the prompt …
    const prompt = call.args[call.args.length - 1];
    expect(prompt).toContain('PR 제출까지 수행하고 절대 머지하지 말 것');
    // … and the retired merge-lock protocol did not.
    expect(prompt).not.toContain('/api/worker/merge-lock');
    // No per-session worker token is issued any more.
    expect(call.options.env.BDUI_WORKER_TOKEN).toBe(undefined);
  });

  test('tickWorkerQueue is an inert no-op when no attachment is registered', async () => {
    const store = createQueueStore();
    seedQueue(store, 'S1');
    // No registration → no dispatch, no throw (keeps ws-only tests hermetic).
    await expect(tickWorkerQueue(WS)).resolves.toBeUndefined();
  });

  test('stopWorkerAttempt delegates to the registered scheduler.stop', async () => {
    const stop = vi.fn(async () => true);
    __registerWorkerAttachmentForTest(WS, {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick: vi.fn(), stop }
    });
    const result = await stopWorkerAttempt(WS, 'att-9');
    expect(result).toBe(true);
    expect(stop).toHaveBeenCalledWith(path.resolve(WS), 'att-9');
  });

  test('stopWorkerAttempt returns false when no attachment is registered', async () => {
    expect(await stopWorkerAttempt(WS, 'att-9')).toBe(false);
  });

  test('initWorkerRuntime reconciles the attempts a prior run left running', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    // Register an attachment whose PID probe sees the recorded PID as dead.
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: false, started_at: null })
    });
    __registerWorkerAttachmentForTest(WS, att);

    runtime.queueStore.setAutoAdvance(WS, true);

    initWorkerRuntime({ workspaces: [WS] });
    await waitFor(
      () => runtime.queueStore.snapshot(WS).attempts['att-1'].status === 'done'
    );

    const snap = runtime.queueStore.snapshot(WS);
    // The server died with the session, but the PR was already open — the
    // startup pass recovers it instead of failing it.
    expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['UI-1']);
    expect(snap.auto_advance).toBe(true);
  });

  test('initWorkerRuntime replays the session log of a running attempt into the usage store (UI-ediw)', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    // The raw stream the PRIOR server persisted before it died.
    writeRunnerLine('att-1', {
      type: 'assistant',
      message: {
        id: 'm1',
        content: [{ type: 'text', text: 'hi' }],
        usage: { input_tokens: 10, output_tokens: 4 }
      }
    });
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      // Alive orphan: reconcile leaves it running, so only the replay writes.
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });

    expect(runtime.usageStore.get(WS, 'att-1')).toMatchObject({
      input_tokens: 10,
      output_tokens: 4,
      replayed: true
    });
    expect(runtime.queueStore.snapshot(WS).attempts['att-1'].status).toBe(
      'running'
    );
  });

  test('initWorkerRuntime reattaches a monitor that continues where the replay stopped (UI-o2yt §3.3)', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    writeRunnerLine('att-1', {
      type: 'assistant',
      message: {
        id: 'm1',
        content: [{ type: 'text', text: 'before' }],
        usage: { input_tokens: 10, output_tokens: 4 }
      }
    });
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });
    // The orphan keeps writing to the file the previous process could not read.
    /** @type {any[]} */
    const pushed = [];
    runtime.sessionLog.subscribe((a) => pushed.push(a));
    writeRunnerLine('att-1', {
      type: 'assistant',
      message: {
        id: 'm2',
        content: [{ type: 'text', text: 'after' }],
        usage: { input_tokens: 5, output_tokens: 1 }
      }
    });
    att.sessionMonitors.stop(WS, 'att-1');

    // The replay owns the past, the monitor the rest: counted once each.
    expect(runtime.usageStore.get(WS, 'att-1')).toMatchObject({
      input_tokens: 15,
      output_tokens: 5
    });
    expect(pushed).toHaveLength(1);
    expect(pushed[0].event.message.content[0].text).toBe('after');
  });

  test('initWorkerRuntime does not monitor an attempt the scheduler is running', async () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({
        file: path.join(FIXTURES, 'claude-success.jsonl')
      }),
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    __registerWorkerAttachmentForTest(WS, att);
    runtime.queueStore.place(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      bead_id: 'UI-1'
    });
    runtime.queueStore.setAutoAdvance(WS, true);
    await tickWorkerQueue(WS);

    initWorkerRuntime({ workspaces: [WS] });

    // Its own engine already reads that log; a monitor would double-broadcast.
    expect(att.sessionMonitors.size()).toBe(0);
  });

  test('initWorkerRuntime leaves a live tally alone instead of replaying over it', async () => {
    const runtime = createWorkerRuntime();
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    writeRunnerLine('att-1', {
      type: 'assistant',
      message: {
        id: 'm1',
        content: [{ type: 'text', text: 'hi' }],
        usage: { input_tokens: 10, output_tokens: 4 }
      }
    });
    // A tally already in the store belongs to a session THIS process streams.
    runtime.usageStore.record(WS, 'att-1', {
      message_id: 'm1',
      input_tokens: 99,
      output_tokens: 1
    });
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: true, started_at: 1000 })
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS] });

    expect(runtime.usageStore.get(WS, 'att-1')).toMatchObject({
      input_tokens: 99
    });
    expect(runtime.usageStore.get(WS, 'att-1')?.replayed).toBe(undefined);
  });

  test('the periodic reconcile disposes a dead attempt with no subscribers and auto_advance off', async () => {
    vi.useFakeTimers();
    try {
      const runtime = createWorkerRuntime();
      const att = createWorkerAttachment(WS, {
        runtime,
        bd: fakeBd(),
        worktree: fakeWorktree,
        verify: okVerify,
        spawn_impl: makeFixtureSpawn({ lines: [] }),
        probePid: () => ({ alive: false, started_at: null }),
        getSubscriberCount: () => 0
      });
      __registerWorkerAttachmentForTest(WS, att);

      initWorkerRuntime({ workspaces: [WS], getSubscriberCount: () => 0 });
      await vi.advanceTimersByTimeAsync(0);

      // A detached session that outlived the startup pass and died afterwards:
      // nothing in this process holds its handle, so only the timer sees it.
      seedDetachedAttempt(runtime.queueStore, 'att-late', 'UI-late');
      runtime.queueStore.setAutoAdvance(WS, false);

      await vi.advanceTimersByTimeAsync(RECONCILE_INTERVAL_SECONDS * 1000);

      const snap = runtime.queueStore.snapshot(WS);
      expect(snap.attempts['att-late'].status).toBe('done');
      expect(snap.pr_wait.map((e) => e.bead_id)).toEqual(['UI-late']);
    } finally {
      vi.useRealTimers();
    }
  });

  test('wires the detection layer with the attachment git runner and push record (UI-8mvc §3, UI-1xcd §4)', async () => {
    const PINNED = 'a'.repeat(40);
    const MOVED = 'b'.repeat(40);
    const LANDED = 'c'.repeat(40);
    const runtime = createWorkerRuntime();
    // The two leaves the observation spends now: the attachment's own git
    // runner (the reachability query) and the attempt's own push record. If
    // `createWorkerAttachment` stops handing the runner to the scheduler,
    // nothing below is reached and no `base_drift` is written.
    const gitRun = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'merge-base') {
        // The recorded push IS reachable from the tip the base moved to.
        return { code: args[2] === LANDED ? 0 : 1, stdout: '', stderr: '' };
      }
      return { code: 128, stdout: '', stderr: 'unexpected' };
    });
    // The real prevention-layer artefacts: the hook the attempt installed, and
    // the base-destined push its own pre-push script recorded.
    installGuardHook({
      workspace: path.resolve(WS),
      attempt_id: 'att-1',
      repo: '/repo',
      target_base: 'main'
    });
    fs.appendFileSync(
      guardPushLogPath(path.resolve(WS), 'att-1'),
      `${JSON.stringify({
        local_ref: 'HEAD',
        local_oid: LANDED,
        remote_ref: 'refs/heads/main',
        remote_oid: PINNED
      })}\n`
    );
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: false, started_at: null }),
      resolveBase: okBase('main', MOVED),
      gitRun
    });
    seedDetachedAttempt(runtime.queueStore, 'att-1', 'UI-1');
    runtime.queueStore.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { base_oid: PINNED }
    });

    await att.scheduler.reconcile(path.resolve(WS));

    const attempt = runtime.queueStore.snapshot(WS).attempts['att-1'];
    expect(gitRun).toHaveBeenCalledWith(
      ['merge-base', '--is-ancestor', LANDED, MOVED],
      { cwd: '/repo' }
    );
    expect(attempt.base_drift).toEqual({
      pinned: PINNED,
      observed: MOVED,
      landed: true,
      via: 'direct_push',
      pushed: [LANDED],
      shas: [LANDED]
    });
    expect(attempt.cause).toBe('base_landing_detected');
  });
});

describe('worker/attach createLiveBd bd show parsing', () => {
  test('snapshotBead unwraps the single-item-array show shape (live bd) — metadata must not be lost', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-1',
              status: 'open',
              metadata: {
                route: 'spec_backed',
                spec_id: 'docs/spec.md',
                spec_review: 'codex@' + 'a'.repeat(40)
              }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson
    });
    const snap = await bd.snapshotBead('UI-1');
    expect(snap.route).toBe('spec_backed');
    expect(snap.spec_id).toBe('docs/spec.md');
    expect(snap.spec_review).toBe('codex@' + 'a'.repeat(40));
    expect(snap.ready).toBe(true);
  });

  test('snapshotBead carries the issue title for the start notification', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            { id: 'UI-1', status: 'open', title: '워커 알림', metadata: {} }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.title).toBe('워커 알림');
  });

  test('snapshotBead leaves the title null when the payload carries none', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-1', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson
    });

    const snap = await bd.snapshotBead('UI-1');

    expect(snap.title).toBe(null);
  });

  test('snapshotBead extracts review_model and impl_model metadata', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-1',
              status: 'open',
              metadata: { review_model: 'opus', impl_model: 'haiku' }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [{ id: 'UI-1' }] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson
    });
    const snap = await bd.snapshotBead('UI-1');
    expect(snap.review_model).toBe('opus');
    expect(snap.impl_model).toBe('haiku');
  });

  test('snapshotBead leaves review_model/impl_model undefined when absent', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-3', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson
    });
    const snap = await bd.snapshotBead('UI-3');
    expect(snap.review_model).toBeUndefined();
    expect(snap.impl_model).toBeUndefined();
  });

  test('snapshotBead keeps reading the bare-object show shape', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: {
            id: 'UI-2',
            status: 'open',
            metadata: { route: 'full_plan' }
          }
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson
    });
    const snap = await bd.snapshotBead('UI-2');
    expect(snap.route).toBe('full_plan');
    expect(snap.blocked).toBe(true);
  });

  test('snapshotBead ignores a bead target_base and uses the repo declaration', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [
            {
              id: 'UI-3',
              status: 'open',
              metadata: { target_base: 'bead/base' }
            }
          ]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('ilsun/dev'),
      runJson
    });

    const snap = await bd.snapshotBead('UI-3');

    expect(snap.target_base).toBe('ilsun/dev');
  });

  test('snapshotBead carries the resolved base_oid for the cut and the pin', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-4', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('ilsun/dev', 'c'.repeat(40)),
      runJson
    });

    const snap = await bd.snapshotBead('UI-4');

    expect(snap.base_oid).toBe('c'.repeat(40));
    expect(snap.base_unresolved).toBe(null);
  });

  test('snapshotBead reports an unresolved base instead of throwing', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-5', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: failBase('ref'),
      runJson
    });

    const snap = await bd.snapshotBead('UI-5');

    expect(snap.target_base).toBe('');
    expect(snap.base_unresolved).toBe('base_unresolved:ref');
  });

  test('snapshotBead re-reads the declaration on every snapshot', async () => {
    const runJson = vi.fn(async (/** @type {string[]} */ args) => {
      if (args[0] === 'show') {
        return {
          code: 0,
          stdoutJson: [{ id: 'UI-6', status: 'open', metadata: {} }]
        };
      }
      return { code: 0, stdoutJson: [] };
    });
    let calls = 0;
    const bd = createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: async () => {
        calls += 1;
        return {
          ok: /** @type {const} */ (true),
          base: calls === 1 ? 'main' : 'ilsun/dev',
          declared: calls !== 1,
          remote: 'origin',
          remote_ref: 'refs/remotes/origin/x',
          base_oid: 'd'.repeat(40),
          local_only: false
        };
      },
      runJson
    });

    const first = await bd.snapshotBead('UI-6');
    const second = await bd.snapshotBead('UI-6');

    expect([first.target_base, second.target_base]).toEqual([
      'main',
      'ilsun/dev'
    ]);
  });
});

describe('worker/attach target base resolution wiring (worker-base-scope-alignment §1)', () => {
  /**
   * @param {Record<string, any>} [options]
   */
  function attach(options = {}) {
    return createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      ...options
    });
  }

  test('reads the target repo declaration rather than the global config', async () => {
    const declaration = path.join(WS, 'docs', 'agents', 'repo-ops.toml');
    fs.mkdirSync(path.dirname(declaration), { recursive: true });
    fs.writeFileSync(declaration, 'base = "ilsun/dev"\n');
    const file_path = path.join(tmp_state, 'config.toml');
    fs.writeFileSync(file_path, '[worker.target_base]\n"/other" = "nope"\n');
    process.env.BDUI_CONFIG_PATH = file_path;
    const att = attach({
      bd: fakeBd(),
      gitRun: async (/** @type {string[]} */ args) => {
        if (args[0] === 'remote') {
          return { code: 0, stdout: 'origin\n', stderr: '' };
        }
        if (args[0] === 'config') {
          return { code: 1, stdout: '', stderr: '' };
        }
        if (args[0] === 'rev-parse') {
          return { code: 0, stdout: 'e'.repeat(40), stderr: '' };
        }
        return { code: 0, stdout: '', stderr: '' };
      }
    });

    const resolved = await att.resolveBase();

    expect(resolved).toMatchObject({ ok: true, base: 'ilsun/dev' });
  });

  test('memoizes the scan resolution but re-resolves on force', async () => {
    let calls = 0;
    const att = attach({
      bd: fakeBd(),
      gitRun: async (/** @type {string[]} */ args) => {
        if (args[0] === 'fetch') {
          calls += 1;
        }
        if (args[0] === 'remote') {
          return { code: 0, stdout: 'origin\n', stearr: '', stderr: '' };
        }
        if (args[0] === 'config') {
          return { code: 1, stdout: '', stderr: '' };
        }
        if (args[0] === 'rev-parse') {
          return { code: 0, stdout: 'f'.repeat(40), stderr: '' };
        }
        return { code: 0, stdout: '', stderr: '' };
      }
    });

    await att.resolveBase();
    await att.resolveBase();
    await att.resolveBase({ force: true });

    expect(calls).toBe(2);
  });

  test('refuses admission with the failing step when the base is unresolved', async () => {
    const att = attach({
      bd: fakeBd(),
      gh: { checkAvailability: async () => ({ state: 'ok' }) }
    });

    const result = await att.admission.validate(
      /** @type {any} */ ({
        repo: '/repo',
        target_base: '',
        base_oid: null,
        base_unresolved: 'base_unresolved:format',
        route: 'full_plan',
        spec_id: 'docs/spec.md',
        spec_review: `codex@${'a'.repeat(40)}`
      })
    );

    expect(result).toEqual({ ok: false, reason: 'base_unresolved:format' });
  });

  test('asks git about the fetched remote tip, not the branch name', async () => {
    /** @type {string[][]} */
    const git_calls = [];
    const att = attach({
      bd: fakeBd(),
      gh: { checkAvailability: async () => ({ state: 'ok' }) },
      gitRun: async (/** @type {string[]} */ args) => {
        git_calls.push(args);
        return { code: 0, stdout: '', stderr: '' };
      }
    });

    await att.admission.validate(
      /** @type {any} */ ({
        repo: '/repo',
        target_base: 'ilsun/dev',
        base_oid: 'a'.repeat(40),
        base_unresolved: null,
        route: 'full_plan',
        spec_id: 'docs/spec.md',
        spec_review: `codex@${'b'.repeat(40)}`
      })
    );

    expect(git_calls[0]).toEqual([
      'rev-parse',
      '--verify',
      '--quiet',
      `${'a'.repeat(40)}^{commit}`
    ]);
  });
});

describe('worker/attach createLiveBd fail-visible snapshots', () => {
  /**
   * @param {Record<string, any>} by_command - Keyed by the bd subcommand.
   */
  function runnerFor(by_command) {
    return vi.fn(async (/** @type {string[]} */ args) => by_command[args[0]]);
  }

  /**
   * @param {(args: string[], options?: any) => Promise<any>} runJson
   */
  function bdWith(runJson) {
    return createLiveBd({
      cwd: '/ws',
      repo: '/repo',
      resolveBase: okBase('main'),
      runJson
    });
  }

  test('throws when bd show exits non-zero', async () => {
    const runJson = runnerFor({
      show: { code: 1, stderr: 'bd down' },
      ready: { code: 0, stdoutJson: [] }
    });

    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd show UI-1 failed \(1\)/
    );
  });

  test('throws when bd show returns an unreadable payload', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: 'nonsense' },
      ready: { code: 0, stdoutJson: [] }
    });

    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /unreadable payload/
    );
  });

  test('throws when bd ready exits non-zero instead of reading as not-ready', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: [{ id: 'UI-1', status: 'open' }] },
      ready: { code: 1, stderr: 'bd down' }
    });

    // A bd outage must reach the scheduler as `bd_snapshot_failed`, never as a
    // bead that merely is not in the ready list.
    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd ready failed \(1\)/
    );
  });

  test('throws when bd ready returns an unreadable payload', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: [{ id: 'UI-1', status: 'open' }] },
      ready: { code: 0, stderr: 'Invalid JSON from bd' }
    });

    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd ready returned an unreadable payload/
    );
  });

  test('throws when bd ready returns an object with no row list', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: [{ id: 'UI-1', status: 'open' }] },
      ready: { code: 0, stdoutJson: { ready: 'not-an-array' } }
    });

    // An unknown shape read as an empty ready set would report a bd fault as a
    // queue full of not-ready beads.
    await expect(bdWith(runJson).snapshotBead('UI-1')).rejects.toThrow(
      /bd ready returned an unreadable payload/
    );
  });

  test('reads an empty ready array as nothing runnable', async () => {
    const runJson = runnerFor({
      show: { code: 0, stdoutJson: [{ id: 'UI-1', status: 'open' }] },
      ready: { code: 0, stdoutJson: [] }
    });

    const snap = await bdWith(runJson).snapshotBead('UI-1');

    expect(snap.ready).toBe(false);
  });
});

describe('worker/attach external scan excludes worker-owned beads (UI-b8n8)', () => {
  const PR_URL = 'https://github.com/o/r/pull/9';

  /**
   * @param {any} runtime
   * @param {string[]} bead_ids
   */
  function attachScanning(runtime, bead_ids) {
    return createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({
          pr_rows: bead_ids.map((bead_id) => ({ bead_id, pr_url: PR_URL })),
          statuses: Object.fromEntries(bead_ids.map((id) => [id, 'resolved']))
        })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
  }

  /**
   * Record a live (non-terminal) attempt — the durable shape a session in PR
   * Delivery leaves behind while it is still running.
   *
   * @param {any} store
   * @param {string} bead_id
   * @param {string} status
   */
  function seedAttempt(store, bead_id, status) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: `att-${bead_id}`, bead_id }
    });
    store.updateAttempt(WS, {
      attempt_id: `att-${bead_id}`,
      patch: { status, repo: '/repo' }
    });
  }

  test('skips a bead whose attempt is still live', async () => {
    const runtime = createWorkerRuntime();
    const att = attachScanning(runtime, ['S1']);
    seedAttempt(runtime.queueStore, 'S1', 'running');

    await att.refreshExternalPrs();

    expect(runtime.externalPrs.list(WS)).toEqual([]);
  });

  test('registers the bead once its attempt is terminal', async () => {
    const runtime = createWorkerRuntime();
    const att = attachScanning(runtime, ['S1']);
    seedAttempt(runtime.queueStore, 'S1', 'done');

    await att.refreshExternalPrs();

    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['S1']);
  });

  test('keeps registering the beads the worker does not own', async () => {
    const runtime = createWorkerRuntime();
    const att = attachScanning(runtime, ['S1', 'X1']);
    seedAttempt(runtime.queueStore, 'S1', 'running');

    await att.refreshExternalPrs();

    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);
  });

  test('keeps the previous rows when the protection set cannot be read', async () => {
    const runtime = createWorkerRuntime();
    const att = attachScanning(runtime, ['X1']);
    await att.refreshExternalPrs();
    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);
    vi.spyOn(att.scheduler, 'externalProtectedBeadIds').mockImplementation(
      () => {
        throw new Error('snapshot unreadable');
      }
    );

    await att.refreshExternalPrs();

    // Fail-closed: registering the whole scan is the unsafe side, so the stale
    // rows stay for one pass rather than being replaced blind.
    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);
  });

  test('still sweeps the closed queue when the protection set is unreadable', async () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({ pr_rows: [], statuses: { S1: 'closed' } })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    seedQueue(runtime.queueStore, 'S1');
    vi.spyOn(att.scheduler, 'externalProtectedBeadIds').mockImplementation(
      () => {
        throw new Error('snapshot unreadable');
      }
    );

    await att.refreshExternalPrs();

    // The sweep reads the caller's own `statuses`; it does not depend on the
    // registry the exclusion guards.
    expect(runtime.queueStore.snapshot(WS).done.map((e) => e.bead_id)).toEqual([
      'S1'
    ]);
  });
});

describe('worker/attach closed-queue sweep trigger (UI-m6bg)', () => {
  /**
   * An attachment whose only bd surface is the whole-list scan the poller pass
   * already makes — the seam the sweep rides.
   *
   * @param {any} runtime
   * @param {() => Promise<any>} scanBeads
   */
  function attachWithScan(runtime, scanBeads) {
    return createWorkerAttachment(WS, {
      runtime,
      bd: { ...fakeBd(), scanBeads },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
  }

  test('one scan moves a closed queue row into the done lane', async () => {
    const runtime = createWorkerRuntime();
    const scanBeads = vi.fn(async () => ({
      pr_rows: [],
      statuses: { S1: 'closed' }
    }));
    const att = attachWithScan(runtime, scanBeads);
    seedQueue(runtime.queueStore, 'S1');

    await att.refreshExternalPrs();

    const snap = runtime.queueStore.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual([]);
    expect(snap.done.map((e) => e.bead_id)).toEqual(['S1']);
    expect(scanBeads).toHaveBeenCalledTimes(1);
  });

  test('cleans up with auto_advance off, where no tick pass ever runs', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithScan(runtime, async () => ({
      pr_rows: [],
      statuses: { S1: 'closed' }
    }));
    seedQueue(runtime.queueStore, 'S1');
    runtime.queueStore.setAutoAdvance(WS, false);
    await tickWorkerQueue(WS);
    expect(runtime.queueStore.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(
      ['S1']
    );

    await att.refreshExternalPrs();

    expect(runtime.queueStore.snapshot(WS).done.map((e) => e.bead_id)).toEqual([
      'S1'
    ]);
  });

  test('spends no bd process per queued bead — the scan IS the read', async () => {
    const runtime = createWorkerRuntime();
    const scanBeads = vi.fn(async () => ({
      pr_rows: [],
      statuses: { S1: 'closed', S2: 'closed', S3: 'closed' }
    }));
    const att = attachWithScan(runtime, scanBeads);
    for (const id of ['S1', 'S2', 'S3']) {
      seedQueue(runtime.queueStore, id);
    }

    await att.refreshExternalPrs();

    expect(scanBeads).toHaveBeenCalledTimes(1);
    expect(runtime.queueStore.snapshot(WS).done.map((e) => e.bead_id)).toEqual([
      'S1',
      'S2',
      'S3'
    ]);
  });

  test('a failed scan mutates nothing', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithScan(runtime, async () => {
      throw new Error('bd down');
    });
    seedQueue(runtime.queueStore, 'S1');
    const revision = runtime.queueStore.snapshot(WS).revision;

    await expect(att.refreshExternalPrs()).rejects.toThrow(/bd down/);

    expect(runtime.queueStore.snapshot(WS).revision).toBe(revision);
    expect(runtime.queueStore.snapshot(WS).queue.map((e) => e.bead_id)).toEqual(
      ['S1']
    );
  });

  test('registers an external row for a bead the worker never ran', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithScan(runtime, async () => ({
      pr_rows: [{ bead_id: 'X1', pr_url: 'https://github.com/o/r/pull/9' }],
      statuses: { X1: 'resolved' }
    }));

    await att.refreshExternalPrs();

    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);
  });

  test('an older scan settling last never applies its stale status', async () => {
    const runtime = createWorkerRuntime();
    /** @type {((value: any) => void)[]} */
    const gate = [];
    const att = attachWithScan(
      runtime,
      () =>
        new Promise((resolve) => {
          gate.push(resolve);
        })
    );
    seedQueue(runtime.queueStore, 'S1');

    const stale = att.refreshExternalPrs();
    const fresh = att.refreshExternalPrs();
    await waitFor(() => gate.length === 2);
    // Newest first: the reopened reading wins and the older `closed` one, which
    // settles after it, must not move the row.
    gate[1]({ pr_rows: [], statuses: { S1: 'open' } });
    await fresh;
    gate[0]({ pr_rows: [], statuses: { S1: 'closed' } });
    await stale;

    const snap = runtime.queueStore.snapshot(WS);
    expect(snap.queue.map((e) => e.bead_id)).toEqual(['S1']);
    expect(snap.done).toEqual([]);
  });
});

describe('worker/attach external registry wiring (UI-wwby)', () => {
  const PR_URL = 'https://github.com/o/r/pull/9';

  /**
   * A real attachment whose bd scan registers ONE external row — so the driver
   * and the cleanup both see the registry `attach.js` actually wired, not a
   * stub the test handed them.
   *
   * @param {any} runtime
   * @param {string} bead_id
   */
  function attachWithExternalRow(runtime, bead_id) {
    return createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({
          pr_rows: [{ bead_id, pr_url: PR_URL }],
          statuses: { [bead_id]: 'resolved' }
        })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      gh: /** @type {any} */ ({
        checkAvailability: async () => ({ state: 'ok', data: true })
      })
    });
  }

  test('gives the merge driver a registry-backed isExternalRow', async () => {
    const runtime = createWorkerRuntime();
    const att = attachWithExternalRow(runtime, 'X1');
    runtime.queueStore.enqueueMerge(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      entries: [{ bead_id: 'X1', external: true }]
    });

    // The merge refuses (no real PR behind the fakes) and no observation exists,
    // so the head SHA is unreadable — the branch `isExternalRow` decides.
    await att.mergeQueue.kick();

    // HALTED, not dequeued: the poller does observe a live registry row, so the
    // halt has an end. Drop the dep in `attach.js` and this becomes a dequeue.
    expect(
      runtime.queueStore
        .snapshot(WS)
        .merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['X1']);
  });

  test('dequeues instead once the registry row is gone', async () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({ pr_rows: [], statuses: {} })
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      gh: /** @type {any} */ ({
        checkAvailability: async () => ({ state: 'ok', data: true })
      })
    });
    runtime.queueStore.enqueueMerge(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      entries: [{ bead_id: 'X1', external: true }]
    });

    await att.mergeQueue.kick();

    // Nothing observes it, so halting would be permanent — the head leaves.
    expect(runtime.queueStore.snapshot(WS).merge_queue).toEqual([]);
  });

  test('gives the PR actions a registry-backed drop', async () => {
    const runtime = createWorkerRuntime();
    /** @type {Record<string, string>} */
    const bd_status = { X1: 'resolved' };
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: {
        ...fakeBd(),
        scanBeads: async () => ({
          pr_rows: [{ bead_id: 'X1', pr_url: PR_URL }],
          statuses: { X1: 'resolved' }
        }),
        listChildren: async () => [],
        setStatus: async (
          /** @type {string} */ id,
          /** @type {string} */ status
        ) => {
          bd_status[id] = status;
        },
        readStatus: async (/** @type {string} */ id) => bd_status[id],
        readIssue: async (/** @type {string} */ id) => ({
          id,
          labels: [],
          metadata: { pr_url: PR_URL }
        }),
        ship: async () => ({ status: 'ok', issue_id: null }),
        removeLabel: async () => {}
      },
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      gitRun: async (/** @type {string[]} */ args) => ({
        code: 0,
        stdout: args[0] === 'rev-parse' ? `${'b'.repeat(40)}\n` : '',
        stderr: ''
      }),
      resolveBase: okBase('main'),
      gh: /** @type {any} */ ({
        checkAvailability: async () => ({ state: 'ok', data: true })
      })
    });
    // The incident's own state: a bead the worker really owns in `pr_wait`,
    // whose registry row the last scan also produced.
    runtime.queueStore.appendAttempt(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      attempt: { attempt_id: 'att-X1', bead_id: 'X1' }
    });
    runtime.queueStore.moveToPrWait(WS, {
      bead_id: 'X1',
      attempt_id: 'att-X1',
      patch: { status: 'done', finished_at: 1, repo: '/repo' }
    });
    await att.refreshExternalPrs();
    expect(runtime.externalPrs.list(WS).map((r) => r.bead_id)).toEqual(['X1']);

    // The whole cleanup, through the attachment's own `prActions` — nothing
    // about the registry is stubbed, so a missing `drop` in `attach.js` leaves
    // the row behind for the next enroller pass to trip over.
    const r = await att.prActions.cleanupObservedMerge('X1');

    expect(r.ok).toBe(true);
    expect(runtime.externalPrs.list(WS)).toEqual([]);
  });
});
