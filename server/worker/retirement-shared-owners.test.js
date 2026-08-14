/**
 * Over-deletion guard for the v1 repository deployment provider retirement.
 *
 * The retirement removed the provider client, its recovery saga, and the pinned
 * declaration reader. Everything asserted here is SHARED machinery those pieces
 * merely used — the scheduler launcher, the detached session monitor, the queue
 * store's CAS, and the post-merge cleanup coordinator — so a future sweep that
 * mistakes "touched deployment" for "owned by deployment" fails here.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { CLEANUP_STEPS, createPrActions } from './pr-actions.js';
import { createQueueStore } from './queue-store.js';
import { createScheduler } from './scheduler.js';
import { createSessionMonitors } from './session-monitor.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/retirement-guard';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-retire-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('v1 deployment provider retirement — shared owners survive', () => {
  test('keeps the scheduler launcher and its dispatch surface', () => {
    expect(typeof createScheduler).toBe('function');
  });

  test('keeps the detached session monitor factory', () => {
    expect(typeof createSessionMonitors).toBe('function');
  });

  test('keeps the queue store CAS on a stale expected revision', () => {
    const store = createQueueStore();
    const first = store.place(WS, { expected_revision: 0, bead_id: 'UI-1' });

    const stale = store.place(WS, { expected_revision: 0, bead_id: 'UI-2' });

    expect(first.ok).toBe(true);
    expect(stale).toMatchObject({ ok: false, conflict: true });
  });

  test('keeps the queue store lane and cleanup-cursor writers', () => {
    const store = createQueueStore();

    const missing = [
      'place',
      'appendAttempt',
      'moveToPrWait',
      'moveToDone',
      'setCleanupCursor',
      'recordCleanupFailure',
      'clearCleanupFailure',
      'promoteMergedExternal',
      'ensureRepoOperation',
      'settleRepoOperation'
    ].filter(
      (name) => typeof (/** @type {any} */ (store)[name]) !== 'function'
    );

    expect(missing).toEqual([]);
  });

  test('keeps the cleanup coordinator entry points', () => {
    const actions = createPrActions(
      /** @type {any} */ ({
        workspace: WS,
        repo: '/repo',
        store: createQueueStore(),
        gh: {},
        observations: { get: () => null, record: () => {} },
        bd: {},
        worktree: {},
        gitRun: async () => ({ code: 0, stdout: '', stderr: '' }),
        scheduler: { tick: async () => {} }
      })
    );

    const missing = [
      'merge',
      'cleanupObservedMerge',
      'retryCleanup',
      'resumeRepoOperations',
      'resumeCompletionCleanup',
      'resumeMigratedClosure',
      'cleanupFacts',
      'completionGate'
    ].filter(
      (name) => typeof (/** @type {any} */ (actions)[name]) !== 'function'
    );

    expect(missing).toEqual([]);
  });

  test('keeps the v2 cleanup cursor in contract order', () => {
    expect(CLEANUP_STEPS).toEqual([
      'base_containment',
      'repo_operations',
      'child_sweep',
      'branch_cleanup',
      'parent_close'
    ]);
  });
});
