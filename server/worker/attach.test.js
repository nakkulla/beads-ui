import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
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
  remove: async () => ({ code: 0 })
};

const okVerify = {
  verifyPrSubmitted: async () => ({
    ok: true,
    reason: 'ok',
    pr_url: 'https://github.com/o/r/pull/1'
  })
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
      spawn_impl: makeFixtureSpawn({ lines: [] })
    });
    expect(typeof att.scheduler.tick).toBe('function');
    expect(typeof att.scheduler.stop).toBe('function');
    expect(typeof att.orphan.detect).toBe('function');
    // The runtime running-count seam now reflects THIS scheduler.
    expect(runtime.status(WS).running_count).toBe(0);
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
      spawn_impl,
      parallel_slots: 1
    });
    __registerWorkerAttachmentForTest(WS, att);

    seedSerial(runtime.queueStore, 'S1');
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

    runtime.queueStore.setAutoAdvance(WS, true);

    initWorkerRuntime({ workspaces: [WS] });

    const snap = runtime.queueStore.snapshot(WS);
    expect(snap.attempts['att-1'].status).toBe('orphaned');
    // The orphan reap halts the queue — the breaker used to do this.
    expect(snap.auto_advance).toBe(false);
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
});
