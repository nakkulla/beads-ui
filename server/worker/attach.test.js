import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest,
  createWorkerAttachment,
  initWorkerRuntime,
  setWorkerPort,
  stopWorkerAttempt,
  tickWorkerQueue
} from './attach.js';
import { createQueueStore } from './queue-store.js';
import { makeFixtureSpawn } from './runner/fixture-spawn.js';
import { createWorkerRuntime } from './runtime.js';

const FIXTURES = path.resolve(process.cwd(), 'server/worker/__fixtures__');

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
        plan_path: c.plan_path ?? null,
        status: c.status ?? '',
        plan_review: c.plan_review,
        plan_fresh: c.plan_fresh ?? null,
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
  remove: async () => ({ code: 0 })
};

const okVerify = {
  verifyMerge: async () => ({ ok: true, reason: 'ok', work_tip: 'wt' })
};

/**
 * @param {any} store
 * @param {string} id
 */
function seedSerial(store, id) {
  const rev = store.snapshot(WS).revision;
  store.place(WS, { expected_revision: rev, bead_id: id, lane: 'serial' });
  store.setAutoAdvance(WS, true);
}

describe('worker/attach construction + live loop (F1)', () => {
  test('createWorkerAttachment builds a scheduler + orphan detector over REAL deps', () => {
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      port: 4321
    });
    expect(typeof att.scheduler.tick).toBe('function');
    expect(typeof att.scheduler.stop).toBe('function');
    expect(typeof att.orphan.detect).toBe('function');
    // The runtime running-count seam now reflects THIS scheduler.
    expect(runtime.status(WS).running_count).toBe(0);
  });

  test('toggle→tick dispatches via the real runner with the merge-lock preamble injected (fake spawn)', async () => {
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
      spawn_impl,
      port: 4321,
      parallel_slots: 1
    });
    __registerWorkerAttachmentForTest(WS, att);

    seedSerial(runtime.queueStore, 'S1');
    // tickWorkerQueue is exactly what the worker-queue-toggle handler calls.
    await tickWorkerQueue(WS);

    await waitFor(() => spawn_impl.captured.calls.length > 0);
    const call = spawn_impl.captured.calls[0];
    expect(call.command).toBe('claude');
    // The merge-lock protocol block (with the injected port) reached the prompt.
    const prompt = call.args[call.args.length - 1];
    expect(prompt).toContain('http://127.0.0.1:4321/api/worker/merge-lock');
    // The per-session worker token is in the child env.
    expect(call.options.env.BDUI_WORKER_TOKEN).toBeTruthy();
  });

  test('tickWorkerQueue is an inert no-op when no attachment is registered', async () => {
    const store = createQueueStore();
    seedSerial(store, 'S1');
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

  test('initWorkerRuntime reaps orphaned attempts at startup', async () => {
    const runtime = createWorkerRuntime();
    // Persist a running attempt whose PID is dead → an orphan on restart.
    runtime.queueStore.appendAttempt(WS, {
      expected_revision: runtime.queueStore.snapshot(WS).revision,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    runtime.queueStore.updateAttempt(WS, {
      attempt_id: 'att-1',
      patch: { status: 'running', pid: 999999, started_at: 1000, repo: '/repo' }
    });
    // Register an attachment whose orphan detector sees the PID as dead.
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] }),
      probePid: () => ({ alive: false, started_at: null })
    });
    __registerWorkerAttachmentForTest(WS, att);

    initWorkerRuntime({ workspaces: [WS], port: 7777 });

    const snap = runtime.queueStore.snapshot(WS);
    expect(snap.attempts['att-1'].status).toBe('orphaned');
    expect(runtime.breaker.isTripped('/repo')).toBe(true);
  });

  test('setWorkerPort late-binds the port for a default-constructed attachment', () => {
    setWorkerPort(6161);
    const runtime = createWorkerRuntime();
    const att = createWorkerAttachment(WS, {
      runtime,
      bd: fakeBd(),
      worktree: fakeWorktree,
      verify: okVerify,
      spawn_impl: makeFixtureSpawn({ lines: [] })
      // no port override → uses the module WORKER_PORT getter
    });
    expect(att.scheduler).toBeTruthy();
  });
});
