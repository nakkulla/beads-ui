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
import { createQueueStore } from './queue-store.js';
import { makeFixtureSpawn } from './runner/fixture-spawn.js';
import { createWorkerRuntime } from './runtime.js';
import { sessionLogPath } from './state-paths.js';

const FIXTURES = path.resolve(process.cwd(), 'server/worker/__fixtures__');
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
      target_base: 'main',
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
      target_base: 'main',
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
      target_base: 'main',
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
      target_base: 'main',
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
      target_base: 'main',
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
      target_base: 'main',
      runJson
    });
    const snap = await bd.snapshotBead('UI-2');
    expect(snap.route).toBe('full_plan');
    expect(snap.blocked).toBe(true);
  });

  test('snapshotBead keeps a bead target_base ahead of the attachment base', async () => {
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
      target_base: 'ilsun/dev',
      runJson
    });

    const snap = await bd.snapshotBead('UI-3');

    expect(snap.target_base).toBe('bead/base');
  });

  test('snapshotBead falls back to the attachment base when the bead pins none', async () => {
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
      target_base: 'ilsun/dev',
      runJson
    });

    const snap = await bd.snapshotBead('UI-4');

    expect(snap.target_base).toBe('ilsun/dev');
  });
});

describe('worker/attach target_base resolution (worker-target-base §1)', () => {
  /**
   * @param {string} content
   */
  function writeConfig(content) {
    const file_path = path.join(tmp_state, 'config.toml');
    fs.writeFileSync(file_path, content);
    process.env.BDUI_CONFIG_PATH = file_path;
  }

  /**
   * @param {Record<string, any>} [options]
   */
  function attach(options = {}) {
    return createWorkerAttachment(WS, {
      runtime: createWorkerRuntime(),
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      ...options
    });
  }

  test('resolves the repo config base when no option pins one', () => {
    writeConfig(`[worker.target_base]\n"${WS}" = "ilsun/dev"\n`);

    expect(attach().target_base).toBe('ilsun/dev');
  });

  test('falls back to main when no config entry matches the workspace', () => {
    writeConfig(`[worker.target_base]\n"/other/repo" = "ilsun/dev"\n`);

    expect(attach().target_base).toBe('main');
  });

  test('falls back to main when the config entry is invalid', () => {
    writeConfig(`[worker.target_base]\n"relative/repo" = "ilsun/dev"\n`);

    expect(attach().target_base).toBe('main');
  });

  test('falls back to main when the config file is missing', () => {
    process.env.BDUI_CONFIG_PATH = path.join(tmp_state, 'absent.toml');

    expect(attach().target_base).toBe('main');
  });

  test('keeps an injected target_base ahead of the repo config', () => {
    writeConfig(`[worker.target_base]\n"${WS}" = "ilsun/dev"\n`);

    expect(attach({ target_base: 'injected/base' }).target_base).toBe(
      'injected/base'
    );
  });

  test('preserves an injected empty target_base instead of substituting a base', () => {
    writeConfig(`[worker.target_base]\n"${WS}" = "ilsun/dev"\n`);

    expect(attach({ target_base: '' }).target_base).toBe('');
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
      target_base: 'main',
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
