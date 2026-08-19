import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createMergeQueue } from './merge-queue.js';
import { createQueueStore } from './queue-store.js';
import { queueFilePath } from './state-paths.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/merge-queue';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-mq-'));
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

/**
 * A clock whose timers fire on the microtask queue and whose `now` jumps by the
 * scheduled delay — so a deadline is reached deterministically instead of by
 * real waiting.
 */
/**
 * @param {(() => void)|null} [on_tick] - Ran on every scheduled wait, before the
 * clock advances: the seam a test uses to make the world change WHILE the
 * driver waits (a session ending, a lane moving).
 */
function fakeClock(on_tick = null) {
  let t = 0;
  return {
    now: () => t,
    /**
     * @param {() => void} fn
     * @param {number} ms
     */
    setTimer: (fn, ms) => {
      if (on_tick) {
        on_tick();
      }
      t += ms;
      void Promise.resolve().then(fn);
      return 1;
    },
    clearTimer: () => {}
  };
}

/**
 * Seed a workspace with `pr_wait` beads and a merge queue over them.
 *
 * @param {string[]} bead_ids
 */
function seed(bead_ids) {
  const store = createQueueStore();
  for (const bead_id of bead_ids) {
    const rev = store.snapshot(WS).revision;
    store.appendAttempt(WS, {
      expected_revision: rev,
      attempt: {
        attempt_id: `att-${bead_id}`,
        bead_id,
        repo: WS,
        target_base: 'main',
        base_oid: 'b'.repeat(40),
        runner: 'claude'
      }
    });
    store.moveToPrWait(WS, {
      bead_id,
      attempt_id: `att-${bead_id}`,
      patch: { status: 'done', finished_at: 1 }
    });
  }
  store.enqueueMerge(WS, {
    expected_revision: store.snapshot(WS).revision,
    entries: bead_ids.map((bead_id) => ({ bead_id }))
  });
  return store;
}

/**
 * @param {any} queue_store
 * @param {any} deps
 * @param {(() => void)|null} [on_tick]
 */
function driver(queue_store, deps, on_tick = null) {
  const clock = fakeClock(on_tick);
  return createMergeQueue({
    workspace: WS,
    store: queue_store,
    merge: async () => ({ ok: true, action: 'merged', reason: null }),
    observePr: async () => ({ state: 'OPEN', error: null }),
    // Every real driver has an observation cache behind this (UI-yk55 §3.3); a
    // failure disposition with no readable head deliberately does NOT dequeue,
    // so the default here is the OBSERVED case and the halt gets its own tests.
    headSha: () => 'a'.repeat(40),
    now: clock.now,
    setTimer: clock.setTimer,
    setResolutionPollTimer: () => 1,
    clearTimer: clock.clearTimer,
    resolution_wait_ms: 100,
    unconfirmed_poll_ms: 10,
    unconfirmed_wait_ms: 100,
    ...deps
  });
}

/**
 * Move a bead out of `pr_wait` the way a completed cleanup does — which is what
 * drops it from the merge queue too.
 *
 * @param {any} queue_store
 * @param {string} bead_id
 */
function landMerge(queue_store, bead_id) {
  queue_store.moveToDone(WS, { bead_id, attempt_id: `att-${bead_id}` });
}

/**
 * @param {any} queue_store
 * @param {string} operation_id
 */
function startRepoRepair(queue_store, operation_id) {
  queue_store.ensureRepoOperation(WS, {
    operation_id,
    repo_id: WS,
    kind: 'deploy',
    subjects: [{ bead_id: 'UI-repair-owner', merged_sha: 'a'.repeat(40) }],
    effective_base_sha: 'b'.repeat(40),
    target_base: 'main',
    script_mode: '100755',
    script_blob_sha: 'c'.repeat(40)
  });
  const attempt_id =
    queue_store.snapshot(WS).repo_operations[operation_id].attempt_id;
  queue_store.settleRepoOperation(WS, {
    operation_id,
    attempt_id,
    exit_code: 1,
    signal: null
  });
  queue_store.startRepoOperationRepair(WS, {
    operation_id,
    mode: 'auto'
  });
}

/**
 * @param {any} queue_store
 * @param {string} root_bead_id
 * @param {string} [subject_bead_id]
 */
function setMergingCompletion(
  queue_store,
  root_bead_id,
  subject_bead_id = root_bead_id
) {
  queue_store.enqueueCompletionIntent(WS, {
    root_bead_id,
    source_attempt_id: `att-${root_bead_id}`,
    target_base: 'main',
    subject: {
      role: 'root',
      bead_id: root_bead_id,
      pr_url: 'https://github.com/o/r/pull/1',
      head_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    }
  });
  queue_store.setCompletionSubject(WS, {
    root_bead_id,
    phase: 'merging',
    subject: {
      role: subject_bead_id === root_bead_id ? 'root' : 'repair',
      bead_id: subject_bead_id,
      pr_url: 'https://github.com/o/r/pull/2',
      head_sha: 'c'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null
    }
  });
}

describe('worker/merge-queue — sequencing', () => {
  test('merges queued items one at a time, in order', async () => {
    const store = seed(['UI-1', 'UI-2']);
    /** @type {string[]} */
    const order = [];
    let in_flight = 0;
    let overlapped = false;
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        in_flight += 1;
        overlapped = overlapped || in_flight > 1;
        order.push(bead_id);
        await Promise.resolve();
        in_flight -= 1;
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(order).toEqual(['UI-1', 'UI-2']);
    expect(overlapped).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('dequeues a merged item even when its cleanup failed', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async () => ({
        ok: false,
        action: 'merged',
        reason: 'boom',
        cleanup_step: 'child_sweep'
      })
    });

    await mq.kick();

    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(mq.state().failures['UI-1']).toContain('정리 실패');
  });

  test('releases an accepted deployment request from the queue head', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async () => ({
        ok: true,
        action: 'cleanup_pending',
        reason: 'materialize_failed'
      })
    });

    await mq.kick();

    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
    expect(mq.state().failures).toEqual({});
  });

  test('skips a refused item and continues with the next', async () => {
    const store = seed(['UI-1', 'UI-2']);
    /** @type {string[]} */
    const seen = [];
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        seen.push(bead_id);
        if (bead_id === 'UI-1') {
          return { ok: false, action: 'refused', reason: 'verify_cmd_failed' };
        }
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(seen).toEqual(['UI-1', 'UI-2']);
    expect(mq.state().failures['UI-1']).toBe('verify_cmd_failed');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('preserves a verification-blocked merge intent across restart', async () => {
    const store = seed(['UI-1']);
    const blocked = driver(store, {
      merge: async () => ({
        ok: false,
        action: 'verify_blocked',
        reason: 'verify_cmd_failed',
        head_sha: 'a'.repeat(40)
      })
    });

    await blocked.kick();
    blocked.stop();
    const resumed = driver(store, {
      merge: async () => {
        landMerge(store, 'UI-1');
        return { ok: true, action: 'merged', reason: null };
      }
    });
    await resumed.kick();

    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('a merge that throws is a skip, never an unhandled rejection', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async () => {
        throw new Error('boom');
      }
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBe('merge_error');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });
});

describe('worker/merge-queue — repair fence', () => {
  test('holds a queued merge while a repo operation is repairing', async () => {
    const store = seed(['UI-1']);
    startRepoRepair(store, 'deploy-repair');
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
  });

  test('merges a held item once after repair release', async () => {
    const store = seed(['UI-1']);
    startRepoRepair(store, 'deploy-repair');
    /** @type {{ callback: ((workspace: string) => void)|null }} */
    const queue_changed = { callback: null };
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      subscribeQueueChanged: (
        /** @type {(workspace: string) => void} */ fn
      ) => {
        queue_changed.callback = fn;
        return () => {};
      }
    });

    mq.start();
    await vi.waitFor(() => expect(mq.state().active).toBe(null));
    store.releaseRepoOperationRepair(WS, {
      operation_id: 'deploy-repair'
    });
    if (queue_changed.callback) {
      queue_changed.callback(WS);
    }
    await vi.waitFor(() => expect(merge).toHaveBeenCalledTimes(1));

    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('holds cleanup cursor while cleanup repair is active', async () => {
    const store = seed(['UI-cleanup']);
    store.setCleanupCursor(WS, {
      bead_id: 'UI-cleanup',
      cursor: 'base_containment'
    });
    store.recordCleanupFailure(WS, {
      bead_id: 'UI-cleanup',
      step: 'base_containment',
      reason: 'base_fetch_failed'
    });
    store.startCleanupRepair(WS, {
      bead_id: 'UI-cleanup',
      mode: 'auto'
    });
    const merge = vi.fn(async () => {
      store.setCleanupCursor(WS, {
        bead_id: 'UI-cleanup',
        cursor: 'repo_operations'
      });
      return { ok: true, action: 'cleanup_pending', reason: null };
    });
    const mq = driver(store, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).pr_wait[0].cleanup_cursor).toBe(
      'base_containment'
    );
    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
  });

  test('holds a merging completion intent during repair', async () => {
    const store = seed(['UI-root']);
    setMergingCompletion(store, 'UI-root');
    startRepoRepair(store, 'deploy-repair');
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'merged',
      reason: null
    }));
    const onCompletionResult = vi.fn(async () => {
      const subject = store.snapshot(WS).completion_intents['UI-root'].subject;
      store.setCompletionSubject(WS, {
        root_bead_id: 'UI-root',
        phase: 'gating',
        subject
      });
    });
    const mq = driver(store, { merge, onCompletionResult });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(onCompletionResult).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
  });

  test('keeps a queued item when repair starts before merge', async () => {
    const store = seed(['UI-1']);
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'merged',
      reason: null
    }));
    const mq = driver(store, {
      merge,
      probeMergeability: async () => {
        startRepoRepair(store, 'late-repair');
        return {
          ok: true,
          kind: 'clean',
          reason: null,
          head_sha: 'a'.repeat(40),
          base_ref: 'main',
          external: false
        };
      }
    });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
    expect(mq.state().failures).toEqual({});
  });

  test('keeps a completion intent when repair starts before merge', async () => {
    const store = seed(['UI-root']);
    setMergingCompletion(store, 'UI-root');
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'merged',
      reason: null
    }));
    const onCompletionResult = vi.fn();
    const mq = driver(store, {
      merge,
      onCompletionResult,
      probeMergeability: async () => {
        startRepoRepair(store, 'late-completion-repair');
        return {
          ok: true,
          kind: 'clean',
          reason: null,
          head_sha: 'a'.repeat(40),
          base_ref: 'main',
          external: false
        };
      }
    });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(onCompletionResult).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
  });

  test('finishes a merge that was already in flight when repair starts', async () => {
    const store = seed(['UI-1']);
    /** @type {{ resolve: ((result: any) => void)|null }} */
    const merge_state = { resolve: null };
    /** @type {Promise<any>} */
    const merge_result = new Promise((resolve) => {
      merge_state.resolve = resolve;
    });
    const merge = vi.fn(() => merge_result);
    const mq = driver(store, { merge });

    const draining = mq.kick();
    await vi.waitFor(() => expect(merge).toHaveBeenCalledTimes(1));
    startRepoRepair(store, 'in-flight-repair');
    landMerge(store, 'UI-1');
    if (merge_state.resolve) {
      merge_state.resolve({ ok: true, action: 'merged', reason: null });
    }
    await draining;

    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(mq.state().failures).toEqual({});
  });

  test('fails closed when the repair snapshot is unreadable', async () => {
    const store = seed(['UI-1']);
    const originalSnapshot = store.snapshot.bind(store);
    let snapshot_calls = 0;
    const guardedSnapshot = (/** @type {string} */ workspace) => {
      snapshot_calls += 1;
      if (snapshot_calls === 3) {
        throw new Error('snapshot unavailable');
      }
      return originalSnapshot(workspace);
    };
    const guarded_store = { ...store, snapshot: guardedSnapshot };
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'merged',
      reason: null
    }));
    const mq = driver(guarded_store, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(originalSnapshot(WS).merge_queue).toHaveLength(1);
  });
});

describe('worker/merge-queue — completion subject continuity', () => {
  test('holds the root queue head while its repair PR is not ready to merge', async () => {
    const store = seed(['UI-root', 'UI-next']);
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-UI-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'waiting_repair_pr',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    const merge = vi.fn();
    const mq = driver(store, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue[0].bead_id).toBe('UI-root');
  });

  test('preserves a completion kick requested during an active drain', async () => {
    const store = seed(['UI-root']);
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-UI-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: store.snapshot(WS).completion_intents['UI-root'].subject
    });
    let attempts = 0;
    /** @type {any} */
    let mq;
    mq = driver(store, {
      merge: async () => {
        attempts += 1;
        if (attempts === 1) {
          return { ok: false, action: 'refused', reason: 'retry_gate' };
        }
        landMerge(store, 'UI-root');
        return { ok: true, action: 'merged', reason: null };
      },
      onCompletionResult: async () => {
        if (attempts !== 1) {
          return;
        }
        store.setCompletionSubject(WS, {
          root_bead_id: 'UI-root',
          phase: 'merging',
          subject: store.snapshot(WS).completion_intents['UI-root'].subject
        });
        await mq.kick();
      }
    });

    await mq.kick();

    expect(attempts).toBe(2);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('continues to the next item after a latched completion pass', async () => {
    const store = seed(['UI-root', 'UI-next']);
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-UI-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: store.snapshot(WS).completion_intents['UI-root'].subject
    });
    /** @type {string[]} */
    const order = [];
    /** @type {any} */
    let mq;
    mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        order.push(bead_id);
        if (bead_id === 'UI-root' && order.length === 1) {
          return { ok: false, action: 'refused', reason: 'retry_gate' };
        }
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      },
      onCompletionResult: async () => {
        if (order.length !== 1) {
          return;
        }
        store.setCompletionSubject(WS, {
          root_bead_id: 'UI-root',
          phase: 'merging',
          subject: store.snapshot(WS).completion_intents['UI-root'].subject
        });
        await mq.kick();
      }
    });

    await mq.kick();

    expect(order).toEqual(['UI-root', 'UI-root', 'UI-next']);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('merges only the repair subject and returns the held root to gating', async () => {
    const store = seed(['UI-root', 'UI-repair']);
    store.dequeueMerge(WS, 'UI-repair');
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-UI-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    const failure_key = {
      stage: 'base_probe',
      reason: 'verify_cmd_failed',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      result_digest: 'd'.repeat(64)
    };
    store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        op_id: 'create-repair',
        kind: 'create_repair',
        failure_key,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    store.recordCompletionRepairBead(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-repair',
      repair_bead_id: 'UI-repair'
    });
    store.advanceCompletionOp(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-repair',
      status: 'consumed',
      next_phase: 'gating',
      clear: true
    });
    store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: {
        role: 'repair',
        bead_id: 'UI-repair',
        pr_url: 'https://github.com/o/r/pull/2',
        head_sha: 'c'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    const merge = vi.fn(async (bead_id) => {
      store.moveToDone(WS, { bead_id });
      return { ok: true, action: 'merged', reason: null };
    });
    const onCompletionResult = vi.fn(async (root_bead_id) => {
      store.setCompletionSubject(WS, {
        root_bead_id,
        phase: 'gating',
        subject: {
          role: 'root',
          bead_id: root_bead_id,
          pr_url: 'https://github.com/o/r/pull/1',
          head_sha: 'a'.repeat(40),
          base_sha: 'b'.repeat(40),
          merged_sha: null
        }
      });
    });
    const mq = driver(store, { merge, onCompletionResult });

    await mq.kick();

    expect(merge).toHaveBeenCalledTimes(1);
    expect(merge).toHaveBeenCalledWith('UI-repair');
    expect(onCompletionResult).toHaveBeenCalledWith(
      'UI-root',
      'UI-repair',
      expect.objectContaining({ action: 'merged', ok: true })
    );
    expect(store.snapshot(WS).merge_queue[0].bead_id).toBe('UI-root');
    expect(store.snapshot(WS).completion_intents['UI-root']).toMatchObject({
      phase: 'gating',
      subject: { role: 'root', bead_id: 'UI-root' }
    });
  });

  test('counts conflict rounds independently from the shared repair-session budget', async () => {
    const store = seed(['UI-root']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-UI-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    const failure_key = {
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      result_digest: 'd'.repeat(64)
    };
    store.beginRepairOp(WS, {
      root_bead_id: 'UI-root',
      op: {
        op_id: 'resume-1',
        kind: 'resume_root',
        failure_key,
        attempt_id: 'repair-1',
        repair_bead_id: null,
        status: 'prepared'
      },
      attempt: { attempt_id: 'repair-1', bead_id: 'UI-root' }
    });
    store.advanceCompletionOp(WS, {
      root_bead_id: 'UI-root',
      op_id: 'resume-1',
      status: 'consumed',
      next_phase: 'gating',
      clear: true
    });
    store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    let calls = 0;
    /** @type {(() => void)|null} */
    let end_session = null;
    const mq = driver(
      store,
      {
        merge: async (/** @type {string} */ bead_id) => {
          calls += 1;
          if (calls === 1) {
            store.appendAttempt(WS, {
              expected_revision: store.snapshot(WS).revision,
              attempt: {
                attempt_id: 'conflict-1',
                bead_id,
                status: 'running',
                conflict_resolution: true,
                started_at: 0
              }
            });
            end_session = () =>
              store.updateAttempt(WS, {
                attempt_id: 'conflict-1',
                patch: { status: 'done', finished_at: 2 }
              });
            return {
              ok: true,
              action: 'conflict_resolution',
              reason: null,
              attempt_id: 'conflict-1'
            };
          }
          return { ok: false, action: 'refused', reason: 'verify_cmd_failed' };
        },
        onCompletionResult: vi.fn()
      },
      () => {
        if (end_session) {
          end_session();
          end_session = null;
        }
      }
    );

    await mq.kick();

    const queue = store.snapshot(WS);
    expect(queue.attempts['conflict-1']).toMatchObject({ status: 'done' });
    expect(calls).toBe(2);
    expect(queue.merge_queue).toEqual([
      { bead_id: 'UI-root', resolution_rounds: 1, resolution: null }
    ]);
    expect(queue.completion_intents['UI-root'].repair_sessions_used).toBe(1);
  });

  test('adopts a repair child already in done without issuing a duplicate merge', async () => {
    const store = seed(['UI-root', 'UI-repair']);
    store.dequeueMerge(WS, 'UI-repair');
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-UI-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    const failure_key = {
      stage: 'merge_gate',
      reason: 'verify_cmd_failed',
      subject_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      result_digest: 'd'.repeat(64)
    };
    store.prepareCompletionOp(WS, {
      root_bead_id: 'UI-root',
      phase: 'repairing',
      op: {
        op_id: 'create-1',
        kind: 'create_repair',
        failure_key,
        attempt_id: null,
        repair_bead_id: null,
        status: 'prepared'
      }
    });
    store.recordCompletionRepairBead(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-1',
      repair_bead_id: 'UI-repair'
    });
    store.advanceCompletionOp(WS, {
      root_bead_id: 'UI-root',
      op_id: 'create-1',
      status: 'consumed',
      next_phase: 'gating',
      clear: true
    });
    store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: {
        role: 'repair',
        bead_id: 'UI-repair',
        pr_url: 'https://github.com/o/r/pull/2',
        head_sha: 'c'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: 'c'.repeat(40)
      }
    });
    store.moveToDone(WS, { bead_id: 'UI-repair' });
    const merge = vi.fn();
    const onCompletionResult = vi.fn();
    const mq = driver(store, { merge, onCompletionResult });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(onCompletionResult).toHaveBeenCalledWith('UI-root', 'UI-repair', {
      ok: true,
      action: 'already_merged',
      reason: null
    });
  });
});

describe('worker/merge-queue — conflict resolution rounds', () => {
  /**
   * Record a running conflict-resolution attempt for a bead, and return the
   * function that ends it.
   *
   * @param {any} queue_store
   * @param {string} bead_id
   * @param {string} attempt_id
   */
  function dispatchResolution(queue_store, bead_id, attempt_id) {
    queue_store.appendAttempt(WS, {
      expected_revision: queue_store.snapshot(WS).revision,
      attempt: {
        attempt_id,
        bead_id,
        status: 'running',
        conflict_resolution: true,
        started_at: 0
      }
    });
    return () =>
      queue_store.updateAttempt(WS, {
        attempt_id,
        patch: { status: 'done', finished_at: 2 }
      });
  }

  test('waits for the dispatched session, counts the round, then re-merges', async () => {
    const store = seed(['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    let calls = 0;
    /** @type {(() => void)|null} */
    let end_session = null;
    const mq = driver(
      store,
      {
        merge: async (/** @type {string} */ bead_id) => {
          calls += 1;
          if (calls === 1) {
            end_session = dispatchResolution(store, bead_id, 'res-1');
            return {
              ok: true,
              action: 'conflict_resolution',
              reason: null,
              attempt_id: 'res-1'
            };
          }
          landMerge(store, bead_id);
          return { ok: true, action: 'merged', reason: null };
        }
      },
      // The wait polls; ending the session on the first wake is what the
      // scheduler's own transition does in production.
      () => {
        if (end_session) {
          end_session();
          end_session = null;
        }
      }
    );

    await mq.kick();

    expect(calls).toBe(2);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('stops at the round cap before dispatching another session', async () => {
    const store = seed(['UI-1']);
    // Two rounds already consumed — the durable count is what the cap reads.
    store.bumpResolutionRound(WS, 'UI-1');
    store.bumpResolutionRound(WS, 'UI-1');
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const dispatchConflict = vi.fn();
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: true,
        kind: 'dirty',
        reason: null,
        head_sha: 'a'.repeat(40),
        base_ref: 'main',
        external: false
      }),
      dispatchConflict
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBe('resolution_round_cap');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(dispatchConflict).not.toHaveBeenCalled();
    expect(merge).not.toHaveBeenCalled();
  });

  test('yields the item when the session outlives the wait, without stopping it', async () => {
    const store = seed(['UI-1', 'UI-2']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    /** @type {string[]} */
    const merges = [];
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        merges.push(bead_id);
        if (bead_id === 'UI-1') {
          dispatchResolution(store, bead_id, 'res-slow');
          return {
            ok: true,
            action: 'conflict_resolution',
            reason: null,
            attempt_id: 'res-slow'
          };
        }
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBeUndefined();
    // The session is left exactly where it was — the queue gave up its turn,
    // not the resolution work.
    expect(store.snapshot(WS).attempts['res-slow'].status).toBe('running');
    // And the queue moved on rather than stalling on it.
    expect(merges).toEqual(['UI-1', 'UI-2']);
    expect(store.snapshot(WS).merge_queue).toMatchObject([
      {
        bead_id: 'UI-1',
        resolution_rounds: 0,
        resolution: { attempt_id: 'res-slow', state: 'yielded' }
      }
    ]);
  });

  test('the round count is durable, so a restart cannot hand out fresh rounds', () => {
    const store = seed(['UI-1']);

    store.bumpResolutionRound(WS, 'UI-1');
    const reloaded = createQueueStore();

    expect(reloaded.snapshot(WS).merge_queue).toEqual([
      { bead_id: 'UI-1', resolution_rounds: 1, resolution: null }
    ]);
  });

  test.each([
    ['clean', false],
    ['dirty', true]
  ])(
    'charges a completed round only when the latest probe is %s',
    async (kind, consume_round) => {
      const store = seed(['UI-1']);
      store.toggleAutoMerge(WS, {
        expected_revision: store.snapshot(WS).revision,
        on: true
      });
      const finish = dispatchResolution(store, 'UI-1', 'res-charge');
      store.bindResolutionWait(WS, {
        bead_id: 'UI-1',
        subject_bead_id: 'UI-1',
        attempt_id: 'res-charge',
        wait_ms: 100
      });
      finish();
      store.settleResolutionWait(WS, {
        bead_id: 'UI-1',
        subject_bead_id: 'UI-1',
        attempt_id: 'res-charge',
        settled_at: 2,
        active_bead_id: null
      });
      const consume = vi.spyOn(store, 'consumeResolutionWait');
      const mq = driver(store, {
        probeMergeability: async () => ({
          ok: true,
          kind,
          reason: null,
          head_sha: 'a'.repeat(40),
          base_ref: 'main',
          external: false
        }),
        dispatchConflict: async () => ({
          ok: false,
          action: 'conflict_resolution',
          reason: 'worktree_missing'
        })
      });

      await mq.kick();

      expect(consume).toHaveBeenCalledWith(WS, {
        bead_id: 'UI-1',
        attempt_id: 'res-charge',
        consume_round
      });
    }
  );

  test('defers a queue-origin resolver until the worker session fence clears', async () => {
    const store = seed(['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    let blocked = true;
    /** @type {{ current: ((workspace: string) => void)|null }} */
    const changed = { current: null };
    const dispatchConflict = vi.fn(
      async (
        /** @type {string} */ bead_id,
        /** @type {unknown} */ _approved,
        /** @type {{ queue_bead_id: string, wait_ms: number }} */ resolution_wait
      ) => {
        if (blocked) {
          return {
            ok: false,
            action: /** @type {const} */ ('conflict_resolution'),
            reason: 'worker_sessions_busy'
          };
        }
        store.appendResolutionAttempt(WS, {
          expected_revision: store.snapshot(WS).revision,
          queue_bead_id: resolution_wait.queue_bead_id,
          subject_bead_id: bead_id,
          wait_ms: resolution_wait.wait_ms,
          attempt: {
            attempt_id: 'res-serial',
            bead_id,
            status: 'done',
            conflict_resolution: true,
            started_at: 0,
            finished_at: 1
          }
        });
        return {
          ok: true,
          action: /** @type {const} */ ('conflict_resolution'),
          reason: null,
          attempt_id: 'res-serial'
        };
      }
    );
    const mq = driver(store, {
      probeMergeability: async () => ({
        ok: true,
        kind: store.snapshot(WS).attempts['res-serial'] ? 'clean' : 'dirty',
        reason: null,
        head_sha: 'a'.repeat(40),
        base_ref: 'main',
        external: false
      }),
      dispatchConflict,
      conflictDispatchBlocked: () => blocked,
      merge: async (/** @type {string} */ bead_id) => {
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      },
      subscribeQueueChanged: (
        /** @type {(workspace: string) => void} */ fn
      ) => {
        changed.current = fn;
        return () => {};
      }
    });

    mq.start();
    await vi.waitFor(() => expect(dispatchConflict).toHaveBeenCalledTimes(1));
    expect(mq.state().waiting).toEqual({
      bead_id: 'UI-1',
      reason: 'worker_sessions_busy'
    });
    changed.current?.(WS);
    await Promise.resolve();
    expect(dispatchConflict).toHaveBeenCalledTimes(1);

    blocked = false;
    changed.current?.(WS);
    await vi.waitFor(() => expect(store.snapshot(WS).merge_queue).toEqual([]));
    mq.stop();

    expect(dispatchConflict).toHaveBeenCalledTimes(2);
    expect(mq.state().failures['UI-1']).toBeUndefined();
    expect(mq.state().waiting).toBeNull();
  });

  test('survives the scheduler moving the bead back into pr_wait mid-round', async () => {
    // The real completion path for a resolution attempt is `moveToPrWait`,
    // which re-enters the lane the bead never left. Its lane dedupe must not
    // drop the queue entry — that would silently cancel the automatic re-merge
    // (codex implementation review 2026-07-28 finding 1).
    const store = seed(['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    let calls = 0;
    /** @type {(() => void)|null} */
    let finish_session = null;
    const mq = driver(
      store,
      {
        merge: async (/** @type {string} */ bead_id) => {
          calls += 1;
          if (calls === 1) {
            store.appendAttempt(WS, {
              expected_revision: store.snapshot(WS).revision,
              attempt: {
                attempt_id: 'res-1',
                bead_id,
                status: 'running',
                conflict_resolution: true,
                started_at: 0
              }
            });
            finish_session = () =>
              store.moveToPrWait(WS, {
                bead_id,
                attempt_id: 'res-1',
                patch: { status: 'done', finished_at: 2 }
              });
            return {
              ok: true,
              action: 'conflict_resolution',
              reason: null,
              attempt_id: 'res-1'
            };
          }
          landMerge(store, bead_id);
          return { ok: true, action: 'merged', reason: null };
        }
      },
      () => {
        if (finish_session) {
          finish_session();
          finish_session = null;
        }
      }
    );

    await mq.kick();

    expect(calls).toBe(2);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('a PAUSED resolution session yields without a re-dispatch', async () => {
    const store = seed(['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    let calls = 0;
    /** @type {(() => void)|null} */
    let pause_session = null;
    const mq = driver(
      store,
      {
        merge: async (/** @type {string} */ bead_id) => {
          calls += 1;
          dispatchResolution(store, bead_id, `res-${calls}`);
          pause_session = () =>
            store.updateAttempt(WS, {
              attempt_id: `res-${calls}`,
              patch: { status: 'paused' }
            });
          return {
            ok: true,
            action: 'conflict_resolution',
            reason: null,
            attempt_id: `res-${calls}`
          };
        }
      },
      () => {
        if (pause_session) {
          pause_session();
          pause_session = null;
        }
      }
    );

    await mq.kick();

    // merge() ran ONCE: the pause keeps its durable resolver identity and only
    // gives up the queue turn.
    expect(calls).toBe(1);
    expect(mq.state().failures['UI-1']).toBeUndefined();
    expect(store.snapshot(WS).attempts['res-1'].status).toBe('paused');
    expect(store.snapshot(WS).merge_queue[0].resolution).toMatchObject({
      attempt_id: 'res-1',
      state: 'yielded'
    });
  });

  test('a boot restore at the round cap skips instead of granting a third round', async () => {
    const store = seed(['UI-1']);
    store.bumpResolutionRound(WS, 'UI-1');
    store.bumpResolutionRound(WS, 'UI-1');
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    dispatchResolution(store, 'UI-1', 'res-boot');
    const merge = vi.fn();
    const mq = driver(store, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(mq.state().failures['UI-1']).toBe('resolution_round_cap');
    expect(store.snapshot(WS).attempts['res-boot'].status).toBe('running');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('a refused resolution dispatch is a skip', async () => {
    const store = seed(['UI-1', 'UI-2']);
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        if (bead_id === 'UI-1') {
          return {
            ok: false,
            action: 'conflict_resolution',
            reason: 'worktree_missing'
          };
        }
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBe('worktree_missing');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('persists a runner mismatch instead of dequeuing or guessing', async () => {
    const store = seed(['UI-1']);
    const dispatchConflict = vi.fn(async () => ({
      ok: false,
      action: 'conflict_resolution',
      reason: 'runner_mismatch',
      continuation_mismatch: {
        continuation_required: true,
        prior: { runner: 'codex' },
        current: { runner: 'claude' },
        decision_token: {
          source_attempt_id: 'att-UI-1',
          source_attempt_digest: 'source',
          observed_queue_revision: store.snapshot(WS).revision,
          preset_id: 'p1',
          preset_revision: 1,
          effective_exec_digest: 'exec'
        }
      }
    }));
    const mq = driver(store, {
      probeMergeability: async () => ({
        ok: true,
        kind: 'dirty',
        reason: null,
        head_sha: 'a'.repeat(40),
        base_ref: 'main',
        external: false
      }),
      dispatchConflict
    });

    await mq.kick();

    expect(dispatchConflict).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue[0]).toMatchObject({
      bead_id: 'UI-1',
      continuation_action: {
        subject_bead_id: 'UI-1',
        continuation: null,
        mismatch: { continuation_required: true }
      }
    });
  });

  test('a boot resume waits for a running session instead of re-calling merge', async () => {
    const store = seed(['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const end = dispatchResolution(store, 'UI-1', 'res-boot');
    let calls = 0;
    const mq = driver(
      store,
      {
        merge: async (/** @type {string} */ bead_id) => {
          calls += 1;
          landMerge(store, bead_id);
          return { ok: true, action: 'merged', reason: null };
        }
      },
      () => end()
    );

    await mq.kick();

    // merge() ran ONCE, after the wait — calling it during the running attempt
    // would only have been refused with `bead_running`.
    expect(calls).toBe(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    // The restored round is counted like any other.
    expect(store.snapshot(WS).attempts['res-boot'].status).toBe('done');
  });

  test('re-enters a late settlement after the active merge and re-probes it', async () => {
    const store = seed(['UI-1', 'UI-2', 'UI-3']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    /** @type {string[]} */
    const effects = [];
    /** @type {string[]} */
    const probes = [];
    /** @type {{ current: ((workspace: string) => void)|null }} */
    const changed = { current: null };
    const dispatchConflict = vi.fn(
      async (
        /** @type {string} */ bead_id,
        /** @type {unknown} */ _approved,
        /** @type {{ queue_bead_id: string, wait_ms: number }} */ resolution_wait
      ) => {
        effects.push(`dispatch:${bead_id}`);
        store.appendResolutionAttempt(WS, {
          expected_revision: store.snapshot(WS).revision,
          queue_bead_id: resolution_wait.queue_bead_id,
          subject_bead_id: bead_id,
          wait_ms: resolution_wait.wait_ms,
          attempt: {
            attempt_id: 'res-late',
            bead_id,
            status: 'running',
            conflict_resolution: true,
            started_at: 0
          }
        });
        return {
          ok: true,
          action: /** @type {const} */ ('conflict_resolution'),
          reason: null,
          attempt_id: 'res-late'
        };
      }
    );
    const mq = driver(store, {
      probeMergeability: async (/** @type {string} */ bead_id) => {
        probes.push(bead_id);
        const resolution = store.snapshot(WS).attempts['res-late'];
        return {
          ok: true,
          kind:
            bead_id === 'UI-1' && resolution?.status !== 'done'
              ? /** @type {const} */ ('dirty')
              : /** @type {const} */ ('clean'),
          reason: null,
          head_sha: 'a'.repeat(40),
          base_ref: 'main',
          external: false
        };
      },
      dispatchConflict,
      merge: async (/** @type {string} */ bead_id) => {
        effects.push(`merge:${bead_id}`);
        if (bead_id === 'UI-2') {
          store.updateAttempt(WS, {
            attempt_id: 'res-late',
            patch: { status: 'done', finished_at: 101 }
          });
          changed.current?.(WS);
        }
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      },
      subscribeQueueChanged: (
        /** @type {(workspace: string) => void} */ fn
      ) => {
        changed.current = fn;
        return () => {};
      }
    });

    mq.start();
    await vi.waitFor(() => expect(store.snapshot(WS).merge_queue).toEqual([]));
    mq.stop();

    expect(effects).toEqual([
      'dispatch:UI-1',
      'merge:UI-2',
      'merge:UI-1',
      'merge:UI-3'
    ]);
    // Resolver attempts carry no authoritative result SHA, so the observed
    // head is never promoted into a voucher (UI-vkk8 §4).
    expect(probes.filter((bead_id) => bead_id === 'UI-1')).toHaveLength(2);
    expect(dispatchConflict).toHaveBeenCalledTimes(1);
  });

  test('uses the persisted absolute deadline after restart', async () => {
    const store = seed(['UI-1']);
    dispatchResolution(store, 'UI-1', 'res-restart');
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-restart',
      wait_ms: 100
    });
    const reloaded = createQueueStore();
    let time = 90;
    let timers = 0;
    const merge = vi.fn();
    const mq = createMergeQueue({
      workspace: WS,
      store: reloaded,
      merge,
      observePr: async () => ({ state: 'OPEN', error: null }),
      headSha: () => 'a'.repeat(40),
      now: () => time,
      setTimer: (fn, ms) => {
        timers += 1;
        time += ms;
        void Promise.resolve().then(fn);
        return 1;
      },
      setResolutionPollTimer: () => 1,
      clearTimer: () => {},
      resolution_wait_ms: 999
    });

    await mq.kick();

    expect(timers).toBe(1);
    expect(reloaded.snapshot(WS).merge_queue[0].resolution).toMatchObject({
      deadline_at: 100,
      state: 'yielded'
    });
    expect(merge).not.toHaveBeenCalled();
  });

  test('coalesces duplicate terminal events without re-settling or merging', async () => {
    const store = seed(['UI-1']);
    const finish = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100
    });
    store.yieldResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      yielded_at: 100
    });
    finish();
    const settle = vi.spyOn(store, 'settleResolutionWait');
    const merge = vi.fn();
    /** @type {{ current: ((workspace: string) => void)|null }} */
    const changed = { current: null };
    const mq = driver(store, {
      merge,
      subscribeQueueChanged: (
        /** @type {(workspace: string) => void} */ fn
      ) => {
        changed.current = fn;
        return () => {};
      }
    });
    mq.start();
    await vi.waitFor(() =>
      expect(store.snapshot(WS).merge_queue[0].resolution?.state).toBe('ready')
    );

    changed.current?.(WS);
    changed.current?.(WS);
    await Promise.resolve();
    mq.stop();

    expect(settle).toHaveBeenCalledTimes(1);
    expect(merge).not.toHaveBeenCalled();
  });

  test('reconciles a yielded terminal leaf when its event was missed', async () => {
    const store = seed(['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const poll = {
      /** @type {(() => void)|null} */
      current: null
    };
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        if (!store.snapshot(WS).attempts['res-1']) {
          dispatchResolution(store, bead_id, 'res-1');
          return {
            ok: true,
            action: 'conflict_resolution',
            reason: null,
            attempt_id: 'res-1'
          };
        }
        return merge(bead_id);
      },
      setResolutionPollTimer: (/** @type {() => void} */ fn) => {
        poll.current = fn;
        return 1;
      }
    });
    mq.start();
    await vi.waitFor(() =>
      expect(store.snapshot(WS).merge_queue[0].resolution?.state).toBe(
        'yielded'
      )
    );
    store.updateAttempt(WS, {
      attempt_id: 'res-1',
      patch: { status: 'done', finished_at: 101 }
    });

    poll.current?.();
    await vi.waitFor(() => expect(store.snapshot(WS).merge_queue).toEqual([]));
    mq.stop();

    expect(merge).toHaveBeenCalledTimes(1);
  });

  test('does not resurrect a canceled yielded item on a late event', async () => {
    const store = seed(['UI-1']);
    const finish = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100
    });
    store.yieldResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      yielded_at: 100
    });
    const merge = vi.fn();
    /** @type {{ current: ((workspace: string) => void)|null }} */
    const changed = { current: null };
    const mq = driver(store, {
      merge,
      subscribeQueueChanged: (
        /** @type {(workspace: string) => void} */ fn
      ) => {
        changed.current = fn;
        return () => {};
      }
    });
    mq.start();
    store.dequeueMerge(WS, 'UI-1');
    finish();

    changed.current?.(WS);
    await Promise.resolve();
    mq.stop();

    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(merge).not.toHaveBeenCalled();
  });

  test('halts with the queue intact when attempt binding cannot persist', async () => {
    const store = seed(['UI-1']);
    const bind = vi
      .spyOn(store, 'bindResolutionWait')
      .mockImplementation(() => {
        throw new Error('disk full');
      });
    const merge = vi.fn(async () => {
      dispatchResolution(store, 'UI-1', 'res-1');
      return {
        ok: true,
        action: 'conflict_resolution',
        reason: null,
        attempt_id: 'res-1'
      };
    });
    const mq = driver(store, { merge });

    await mq.kick();

    expect(bind).toHaveBeenCalledTimes(1);
    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue[0].resolution).toBe(null);
    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('fails an identityless successful dispatch without calling it again', async () => {
    const store = seed(['UI-1']);
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'conflict_resolution',
      reason: null,
      attempt_id: null
    }));
    const mq = driver(store, { merge });

    await mq.kick();

    expect(merge).toHaveBeenCalledTimes(1);
    expect(mq.state().failures['UI-1']).toBe('resolution_attempt_missing');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('fails a malformed durable wait without calling merge', async () => {
    seed(['UI-1']);
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.merge_queue[0].resolution = {
      state: 'waiting',
      attempt_id: ''
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
    const reloaded = createQueueStore();
    const merge = vi.fn();
    const mq = driver(reloaded, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(mq.state().failures['UI-1']).toBe('resolution_wait_invalid');
    expect(reloaded.snapshot(WS).merge_queue).toEqual([]);
  });

  test('rejects a non-conflict terminal leaf as unrelated evidence', async () => {
    const store = seed(['UI-1']);
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'other-1',
        bead_id: 'UI-1',
        status: 'done',
        conflict_resolution: false,
        started_at: 0,
        finished_at: 1
      }
    });
    const raw = JSON.parse(fs.readFileSync(queueFilePath(WS), 'utf8'));
    raw.merge_queue[0].resolution = {
      attempt_id: 'other-1',
      subject_bead_id: 'UI-1',
      deadline_at: 100,
      state: 'yielded',
      yielded_at: 100,
      settled_at: null
    };
    fs.writeFileSync(queueFilePath(WS), JSON.stringify(raw));
    const reloaded = createQueueStore();
    const merge = vi.fn();
    const mq = driver(reloaded, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(mq.state().failures['UI-1']).toBe('resolution_attempt_not_conflict');
    expect(reloaded.snapshot(WS).merge_queue).toEqual([]);
  });

  test('pauses ready effects while auto merge is off and resumes when enabled', async () => {
    const store = seed(['UI-1']);
    const finish = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100
    });
    store.yieldResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      yielded_at: 100
    });
    finish();
    store.settleResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      settled_at: 101,
      active_bead_id: null
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: false,
      clear_waiting: true
    });
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue[0].resolution?.state).toBe('ready');

    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    await mq.kick();

    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });
});

describe('worker/merge-queue — merge_unconfirmed', () => {
  test('holds the head and re-merges once the PR is observed MERGED', async () => {
    const store = seed(['UI-1', 'UI-2']);
    /** @type {string[]} */
    const merges = [];
    let observations = 0;
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        merges.push(bead_id);
        if (bead_id === 'UI-1' && merges.length === 1) {
          return {
            ok: true,
            action: 'merge_unconfirmed',
            reason: 'merge_pending'
          };
        }
        landMerge(store, bead_id);
        return {
          ok: true,
          action: bead_id === 'UI-1' ? 'already_merged' : 'merged',
          reason: null
        };
      },
      observePr: async () => {
        observations += 1;
        return { state: observations >= 2 ? 'MERGED' : 'OPEN', error: null };
      }
    });

    await mq.kick();

    expect(merges).toEqual(['UI-1', 'UI-1', 'UI-2']);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('a MERGED/unconfirmed flip-flop is bounded by the item clock, not a fresh one', async () => {
    const store = seed(['UI-1']);
    let merges = 0;
    const mq = driver(store, {
      // The PR reads MERGED to the watch but never to the merge's own re-gate,
      // so the item keeps bouncing back into the unconfirmed state.
      merge: async () => {
        merges += 1;
        return {
          ok: true,
          action: 'merge_unconfirmed',
          reason: 'merge_pending'
        };
      },
      observePr: async () => ({ state: 'MERGED', error: null })
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBe('merge_unconfirmed_timeout');
    expect(merges).toBeGreaterThan(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('a CLOSED PR ends the watch as a skip', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async () => ({
        ok: true,
        action: 'merge_unconfirmed',
        reason: 'merge_pending'
      }),
      observePr: async () => ({ state: 'CLOSED', error: null })
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBe('pr_closed_unmerged');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('an unreadable observation never becomes a verdict — it waits out', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async () => ({
        ok: true,
        action: 'merge_unconfirmed',
        reason: 'merge_pending'
      }),
      observePr: async () => ({ state: null, error: 'gh_failed' })
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBe('merge_unconfirmed_timeout');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('a bead that leaves pr_wait mid-watch is done, not failed', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async () => ({
        ok: true,
        action: 'merge_unconfirmed',
        reason: 'merge_pending'
      }),
      observePr: async () => {
        // The poller observed the same MERGED and ran the cleanup.
        landMerge(store, 'UI-1');
        return { state: 'OPEN', error: null };
      }
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBeUndefined();
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });
});

describe('worker/merge-queue — lifecycle', () => {
  test('state() reports the active item while it merges', async () => {
    const store = seed(['UI-1']);
    /** @type {string|null} */
    let active_during = null;
    /** @type {any} */
    let mq;
    mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        active_during = mq.state().active;
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(active_during).toBe('UI-1');
    expect(mq.state().active).toBe(null);
  });

  test('a dequeue that does not persist halts the drain instead of re-merging', async () => {
    const store = seed(['UI-1', 'UI-2']);
    const merge = vi.fn(async () => ({
      ok: false,
      action: 'refused',
      reason: 'verify_cmd_failed'
    }));
    const mq = driver(
      {
        ...store,
        // Simulates an unwritable state dir: the skip record + dequeue is ONE
        // mutation now (UI-yk55 §3.2), so a failed write leaves the item at the
        // head with no exclusion — which must halt, not re-merge.
        recordMergeSkip: () => ({ ok: false, conflict: false, queue: null })
      },
      { merge }
    );

    await mq.kick();

    // ONE attempt, not a hot loop against the same head.
    expect(merge).toHaveBeenCalledTimes(1);
    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1', 'UI-2']);
  });

  test('the resumed queue re-derives external rows before its first item', async () => {
    const store = seed(['UI-1']);
    /** @type {string[]} */
    const order = [];
    const mq = driver(store, {
      prepare: async () => {
        order.push('prepare');
      },
      merge: async (/** @type {string} */ bead_id) => {
        order.push('merge');
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(order).toEqual(['prepare', 'merge']);
  });

  test('an empty queue drains without calling merge', async () => {
    const store = createQueueStore();
    const merge = vi.fn();
    const mq = driver(store, { merge });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
  });

  test('stop() halts the loop and leaves the rest of the queue durable', async () => {
    const store = seed(['UI-1', 'UI-2']);
    /** @type {any} */
    let mq;
    mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        landMerge(store, bead_id);
        mq.stop();
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-2']);
  });
});

describe('worker/merge-queue — 자동 머지 제외 기록 (UI-yk55 §3)', () => {
  const HEAD = 'a'.repeat(40);

  test('records the head SHA with every failure disposition', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async () => ({
        ok: false,
        action: 'refused',
        reason: 'verify_cmd_failed'
      })
    });

    await mq.kick();

    expect(store.snapshot(WS).auto_merge_skips['UI-1']).toMatchObject({
      head_sha: HEAD,
      reason: 'verify_cmd_failed'
    });
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('records one for a merge that landed but whose cleanup stopped', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async () => ({
        ok: false,
        action: 'merged',
        reason: 'deploy_failed',
        cleanup_step: 'deploy'
      })
    });

    await mq.kick();

    // A cleanup-failed row stays eligible, so without the record the enroller
    // would re-queue the same broken cleanup forever.
    expect(store.snapshot(WS).auto_merge_skips['UI-1'].head_sha).toBe(HEAD);
  });

  test('records nothing for a clean merge — the row left the lane', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('holds the item instead of dequeuing when the head SHA is unreadable', async () => {
    const store = seed(['UI-1', 'UI-2']);
    const merge = vi.fn(async () => ({
      ok: false,
      action: 'refused',
      reason: 'verify_cmd_failed'
    }));

    const mq = driver(store, { merge, headSha: () => null });
    await mq.kick();

    // Dequeuing with no exclusion is the ONE path back into the §3.1 loop, so
    // the drain ends and the durable queue waits for an observation.
    expect(merge).toHaveBeenCalledTimes(1);
    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1', 'UI-2']);
    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('an arriving observation resumes a drain halted on an unreadable head', async () => {
    const store = seed(['UI-1']);
    /** @type {Array<(ws: string) => void>} */
    const listeners = [];
    /** @type {string|null} */
    let head = null;
    const merge = vi.fn(async () => ({
      ok: false,
      action: 'refused',
      reason: 'verify_cmd_failed'
    }));
    const mq = driver(store, {
      merge,
      headSha: () => head,
      subscribeQueueChanged: (/** @type {any} */ fn) => {
        listeners.push(fn);
        return () => {};
      }
    });
    mq.start();
    await new Promise((r) => setTimeout(r, 0));

    expect(store.snapshot(WS).merge_queue.length).toBe(1);

    // The observation arrives. `queue-changed` only WAKES a sleeping wait, so
    // without an explicit resume the item would stay halted with a readable
    // head forever.
    head = 'a'.repeat(40);
    for (const fn of listeners) {
      fn(WS);
    }
    await new Promise((r) => setTimeout(r, 0));

    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(store.snapshot(WS).auto_merge_skips['UI-1'].head_sha).toBe(
      'a'.repeat(40)
    );
    mq.stop();
  });

  test('a boot resume drops an excluded head without merging it', async () => {
    const store = seed(['UI-1', 'UI-2']);
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: HEAD,
      reason: 'resolution_round_cap'
    });
    // The crash window §3.2 names: the record landed on disk with the item
    // still in the queue. Written straight to `queue.json` because no API can
    // produce that pair — which is the point of making the two halves atomic.
    const file = queueFilePath(WS);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    raw.merge_queue.unshift({ bead_id: 'UI-1', resolution_rounds: 0 });
    fs.writeFileSync(file, JSON.stringify(raw));
    store.__clearCacheForTest();
    /** @type {string[]} */
    const merged = [];
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        merged.push(bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    // `drain()` takes the durable head straight into processItem, so the filter
    // has to live there too — the enroller alone would be bypassed by a restart.
    expect(merged).not.toContain('UI-1');
    expect(mq.state().failures['UI-1']).toBe('resolution_round_cap');
  });

  test('a moved head lets an excluded item merge on its turn', async () => {
    const store = seed(['UI-1']);
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'b'.repeat(40),
      reason: 'refused'
    });
    store.enqueueMergeAuto(WS, {
      entries: [{ bead_id: 'UI-1', head_sha: HEAD }],
      present_ids: ['UI-1']
    });
    /** @type {string[]} */
    const merged = [];
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        merged.push(bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(merged).toEqual(['UI-1']);
  });

  test('the round cap plus the exclusion bounds the resolution loop', async () => {
    const store = seed(['UI-1']);
    store.bumpResolutionRound(WS, 'UI-1');
    store.bumpResolutionRound(WS, 'UI-1');
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const dispatchConflict = vi.fn();
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: true,
        kind: 'dirty',
        reason: null,
        head_sha: HEAD,
        base_ref: 'main',
        external: false
      }),
      dispatchConflict
    });

    await mq.kick();
    // The enroller judges the same conflicting row eligible again straight
    // away; the exclusion is what makes the second pass a no-op.
    const again = store.enqueueMergeAuto(WS, {
      entries: [{ bead_id: 'UI-1', head_sha: HEAD }],
      present_ids: ['UI-1']
    });
    await mq.kick();

    expect(again.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(store.snapshot(WS).auto_merge_skips['UI-1'].reason).toBe(
      'resolution_round_cap'
    );
    expect(dispatchConflict).not.toHaveBeenCalled();
    expect(merge).not.toHaveBeenCalled();
  });
});

describe('worker/merge-queue — manual continuation authority (UI-58w8)', () => {
  const MANUAL_HEAD = 'a'.repeat(40);
  const MOVED_HEAD = 'b'.repeat(40);

  /**
   * @param {string[]} bead_ids
   */
  function seedManual(bead_ids) {
    const store = createQueueStore();
    for (const bead_id of bead_ids) {
      store.appendAttempt(WS, {
        expected_revision: store.snapshot(WS).revision,
        attempt: {
          attempt_id: `att-${bead_id}`,
          bead_id,
          repo: WS,
          target_base: 'main',
          base_oid: 'b'.repeat(40),
          runner: 'claude'
        }
      });
      store.moveToPrWait(WS, {
        bead_id,
        attempt_id: `att-${bead_id}`,
        patch: { status: 'done', finished_at: 1 }
      });
    }
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: bead_ids.map((bead_id) => ({
        bead_id,
        head_sha: MANUAL_HEAD,
        target_base: 'main'
      }))
    });
    return store;
  }

  /**
   * @param {any} queue_store
   * @param {string} bead_id
   * @param {string} attempt_id
   */
  function dispatchResolution(queue_store, bead_id, attempt_id) {
    queue_store.appendAttempt(WS, {
      expected_revision: queue_store.snapshot(WS).revision,
      attempt: {
        attempt_id,
        bead_id,
        status: 'running',
        conflict_resolution: true,
        started_at: 0
      }
    });
    return () =>
      queue_store.updateAttempt(WS, {
        attempt_id,
        patch: { status: 'done', finished_at: 2 }
      });
  }

  test('merges a ready manual item while auto_merge is off', async () => {
    const store = seedManual(['UI-1']);
    const finish = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100
    });
    finish();
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, { merge });

    await mq.kick();

    expect(store.snapshot(WS).auto_merge).toBe(false);
    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('passes manual authority provenance to conflict dispatch', async () => {
    const store = seedManual(['UI-1']);
    const dispatchConflict = vi.fn(
      async (
        /** @type {string} */ _bead_id,
        /** @type {unknown} */ _approved,
        /** @type {unknown} */ _resolution_wait
      ) => {
        void _bead_id;
        void _approved;
        void _resolution_wait;
        return {
          ok: false,
          action: /** @type {const} */ ('conflict_resolution'),
          reason: 'worktree_missing'
        };
      }
    );
    const mq = driver(store, {
      probeMergeability: async () => ({
        ok: true,
        kind: /** @type {const} */ ('dirty'),
        reason: null,
        head_sha: MANUAL_HEAD,
        base_ref: 'main',
        external: false
      }),
      dispatchConflict
    });

    await mq.kick();

    expect(dispatchConflict.mock.calls[0][2]).toMatchObject({
      queue_bead_id: 'UI-1',
      manual_authority: true
    });
  });

  test('treats missing authority provenance as automatic', async () => {
    const store = seed(['UI-1']);
    const dispatchConflict = vi.fn(
      async (
        /** @type {string} */ _bead_id,
        /** @type {unknown} */ _approved,
        /** @type {unknown} */ _resolution_wait
      ) => {
        void _bead_id;
        void _approved;
        void _resolution_wait;
        return {
          ok: false,
          action: /** @type {const} */ ('conflict_resolution'),
          reason: 'worktree_missing'
        };
      }
    );
    const mq = driver(store, {
      probeMergeability: async () => ({
        ok: true,
        kind: /** @type {const} */ ('dirty'),
        reason: null,
        head_sha: MANUAL_HEAD,
        base_ref: 'main',
        external: false
      }),
      dispatchConflict
    });

    await mq.kick();

    expect(dispatchConflict.mock.calls[0][2]).toMatchObject({
      queue_bead_id: 'UI-1',
      manual_authority: false
    });
  });

  test('routes a manual review-stale refusal through head review and merges after approval', async () => {
    const store = seedManual(['UI-1']);
    /** @type {any[]} */
    const ensure_calls = [];
    let approved = false;
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      probeMergeability: async () =>
        approved
          ? {
              ok: true,
              kind: 'clean',
              reason: null,
              head_sha: MOVED_HEAD,
              base_ref: 'main',
              external: false
            }
          : {
              ok: false,
              kind: 'blocked',
              reason: 'review_receipt_stale',
              head_sha: MOVED_HEAD,
              base_ref: 'main',
              external: false
            },
      headReview: {
        ensureApproved: async (
          /** @type {string} */ queue_bead_id,
          /** @type {string} */ subject_bead_id,
          /** @type {any} */ observed
        ) => {
          ensure_calls.push({ queue_bead_id, subject_bead_id, observed });
          approved = true;
          return { state: 'approved', reason: null };
        }
      }
    });

    await mq.kick();

    // Two bindings, one merge: the stale refusal routes into head review, and
    // the CLEAN gate that follows still binds the approved journal before the
    // merge — a manual item never merges on a bare metadata receipt.
    expect(ensure_calls).toHaveLength(2);
    expect(ensure_calls[0]).toMatchObject({
      queue_bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      observed: { head_sha: MOVED_HEAD, base_ref: 'main' }
    });
    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('never spends a head review on an absent spec_id refusal', async () => {
    const store = seedManual(['UI-1']);
    const ensureApproved = vi.fn();
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: false,
        kind: 'blocked',
        reason: 'spec_id_missing',
        head_sha: MANUAL_HEAD,
        base_ref: 'main',
        external: false
      }),
      headReview: { ensureApproved }
    });

    await mq.kick();

    // A review cannot write Bead metadata, so dispatching one here would burn
    // a reviewer round without ever unblocking the item (UI-yqw9).
    expect(ensureApproved).not.toHaveBeenCalled();
    expect(merge).not.toHaveBeenCalled();
    expect(mq.state().failures['UI-1']).toBe('spec_id_missing');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('binds the head-review journal before merging an already CLEAN manual item', async () => {
    const store = seedManual(['UI-1']);
    /** @type {any[]} */
    const ensure_calls = [];
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: true,
        kind: 'clean',
        reason: null,
        head_sha: MANUAL_HEAD,
        base_ref: 'main',
        head_ref: 'UI-1',
        external: false
      }),
      headReview: {
        ensureApproved: async (
          /** @type {string} */ queue_bead_id,
          /** @type {string} */ subject_bead_id,
          /** @type {any} */ observed
        ) => {
          ensure_calls.push({ queue_bead_id, subject_bead_id, observed });
          return { state: 'approved', reason: null };
        }
      }
    });

    await mq.kick();

    expect(ensure_calls).toHaveLength(1);
    expect(merge).toHaveBeenCalledTimes(1);
  });

  test('does not merge a CLEAN manual item whose journal binding fails', async () => {
    const store = seedManual(['UI-1']);
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: true,
        kind: 'clean',
        reason: null,
        head_sha: MANUAL_HEAD,
        base_ref: 'main',
        external: false
      }),
      headReview: {
        ensureApproved: async () => ({
          state: 'failed',
          reason: 'receipt_readback_mismatch'
        })
      }
    });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
    expect(mq.state().failures['UI-1']).toBe('receipt_readback_mismatch');
  });

  test('updates a BEHIND manual item and reviews the moved head', async () => {
    const store = seedManual(['UI-1']);
    let updated = false;
    /** @type {any[]} */
    const ensure_calls = [];
    const updateBase = vi.fn(async () => {
      updated = true;
      return {
        ok: true,
        reason: null,
        result_head_sha: MOVED_HEAD
      };
    });
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    let reviewed = false;
    const mq = driver(store, {
      merge,
      updateBase,
      probeMergeability: async () => {
        if (!updated) {
          return {
            ok: false,
            kind: 'blocked',
            reason: 'base_behind',
            head_sha: MANUAL_HEAD,
            base_ref: 'main',
            head_ref: 'UI-1',
            external: false
          };
        }
        return reviewed
          ? {
              ok: true,
              kind: 'clean',
              reason: null,
              head_sha: MOVED_HEAD,
              base_ref: 'main',
              head_ref: 'UI-1',
              external: false
            }
          : {
              ok: false,
              kind: 'blocked',
              reason: 'review_receipt_stale',
              head_sha: MOVED_HEAD,
              base_ref: 'main',
              head_ref: 'UI-1',
              external: false
            };
      },
      headReview: {
        ensureApproved: async (
          /** @type {string} */ queue_bead_id,
          /** @type {string} */ subject_bead_id,
          /** @type {any} */ observed
        ) => {
          ensure_calls.push({ queue_bead_id, subject_bead_id, observed });
          reviewed = true;
          return { state: 'approved', reason: null };
        }
      }
    });

    await mq.kick();

    expect(updateBase).toHaveBeenCalledTimes(1);
    // The moved head is reviewed as a queue-owned base update, not guessed at.
    expect(ensure_calls[0].observed).toMatchObject({
      head_sha: MOVED_HEAD,
      mutation: 'base_update',
      mutation_result_sha: MOVED_HEAD
    });
    expect(merge).toHaveBeenCalledTimes(1);
  });

  test('vouches for a resolver push as the queue-owned mutation', async () => {
    const store = seedManual(['UI-1']);
    const finish = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100
    });
    finish();
    /** @type {any[]} */
    const ensure_calls = [];
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: true,
        kind: 'clean',
        reason: null,
        head_sha: MOVED_HEAD,
        base_ref: 'main',
        head_ref: 'UI-1',
        external: false
      }),
      headReview: {
        ensureApproved: async (
          /** @type {string} */ _q,
          /** @type {string} */ _s,
          /** @type {any} */ observed
        ) => {
          ensure_calls.push(observed);
          return { state: 'approved', reason: null };
        }
      }
    });

    await mq.kick();

    expect(ensure_calls[0]).toMatchObject({
      mutation: 'resolver:res-1',
      mutation_result_sha: null
    });
    expect(merge).toHaveBeenCalledTimes(1);
  });

  test('clears the result binding across consecutive resolver rounds', async () => {
    const store = seedManual(['UI-1']);
    const finishFirst = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-1',
      wait_ms: 100
    });
    finishFirst();
    let probes = 0;
    const dispatchConflict = vi.fn(async () => {
      const finishSecond = dispatchResolution(store, 'UI-1', 'res-2');
      finishSecond();
      return {
        ok: true,
        action: /** @type {const} */ ('conflict_resolution'),
        reason: null,
        attempt_id: 'res-2'
      };
    });
    /** @type {any[]} */
    const ensure_calls = [];
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      dispatchConflict,
      probeMergeability: async () => {
        probes += 1;
        return {
          ok: true,
          kind: probes === 1 ? 'dirty' : 'clean',
          reason: null,
          head_sha: probes === 1 ? MOVED_HEAD : 'c'.repeat(40),
          base_ref: 'main',
          head_ref: 'UI-1',
          external: false
        };
      },
      headReview: {
        ensureApproved: async (
          /** @type {string} */ _q,
          /** @type {string} */ _s,
          /** @type {any} */ observed
        ) => {
          ensure_calls.push(observed);
          return { state: 'approved', reason: null };
        }
      }
    });

    await mq.kick();

    expect(dispatchConflict).toHaveBeenCalledTimes(1);
    expect(ensure_calls[0]).toMatchObject({
      head_sha: 'c'.repeat(40),
      mutation: 'resolver:res-2',
      mutation_result_sha: null
    });
    expect(merge).toHaveBeenCalledTimes(1);
  });

  test('leaves a completion root to its own saga even under a manual authority', async () => {
    const store = seedManual(['UI-root']);
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-UI-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: MANUAL_HEAD,
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: MANUAL_HEAD,
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    /** @type {any[]} */
    const ensure_calls = [];
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'merged',
      reason: null
    }));
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: true,
        kind: 'clean',
        reason: null,
        head_sha: MANUAL_HEAD,
        base_ref: 'main',
        external: false
      }),
      headReview: {
        ensureApproved: async (/** @type {any} */ input) => {
          ensure_calls.push(input);
          return { state: 'approved', reason: null };
        }
      },
      onCompletionResult: async () => {}
    });

    await mq.kick();

    // The completion saga owns its own gating and has no disposition for a
    // head-review result — the two machines must not interleave.
    expect(ensure_calls).toEqual([]);
    expect(merge).toHaveBeenCalledTimes(1);
  });

  test('does not update the base of a legacy authority-less BEHIND row', async () => {
    const store = seed(['UI-1']);
    const updateBase = vi.fn(async () => ({ ok: true, reason: null }));
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      updateBase,
      probeMergeability: async () => ({
        ok: false,
        kind: 'blocked',
        reason: 'base_behind',
        head_sha: MANUAL_HEAD,
        base_ref: 'main',
        external: false
      })
    });

    await mq.kick();

    expect(updateBase).not.toHaveBeenCalled();
    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('keeps a manual item queued with its failure when head review fails', async () => {
    const store = seedManual(['UI-1']);
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: false,
        kind: 'blocked',
        reason: 'review_receipt_stale',
        head_sha: MOVED_HEAD,
        base_ref: 'main',
        external: false
      }),
      headReview: {
        ensureApproved: async () => {
          const authority_id =
            store.snapshot(WS).merge_queue[0].authority?.id || '';
          store.beginHeadReview(WS, {
            bead_id: 'UI-1',
            authority_id,
            head_sha: MOVED_HEAD,
            reviewer: 'codex',
            effort: 'xhigh'
          });
          store.setHeadReviewState(WS, {
            bead_id: 'UI-1',
            authority_id,
            head_sha: MOVED_HEAD,
            expected_state: 'pending',
            patch: { state: 'failed', failure_reason: 'transport_unavailable' }
          });
          return { state: 'failed', reason: 'transport_unavailable' };
        }
      }
    });

    await mq.kick();
    // A second pass must not re-drive the failed item — only a fresh click may.
    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
    expect(store.snapshot(WS).merge_queue[0].head_review?.state).toBe('failed');
    expect(mq.state().failures['UI-1']).toBe('transport_unavailable');
  });

  test('does not route a legacy authority-less entry through head review', async () => {
    const store = seed(['UI-1']);
    /** @type {any[]} */
    const ensure_calls = [];
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: false,
        kind: 'blocked',
        reason: 'review_receipt_stale',
        head_sha: MOVED_HEAD,
        base_ref: 'main',
        external: false
      }),
      headReview: {
        ensureApproved: async (/** @type {any} */ input) => {
          ensure_calls.push(input);
          return { state: 'approved', reason: null };
        }
      }
    });

    await mq.kick();

    expect(ensure_calls).toEqual([]);
    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });
});

describe('worker/merge-queue — halt only where an observation can arrive (UI-wwby §3)', () => {
  const HEAD = 'a'.repeat(40);

  /**
   * The exact corruption the incident produced: a bead in `done` that is ALSO
   * the merge queue's head. No API can write that pair — `moveToDone` clears
   * the queue — so it goes straight to `queue.json`, the same way the boot
   * resume test stages its crash window.
   *
   * @param {any} queue_store
   * @param {string} bead_id
   */
  function contaminate(queue_store, bead_id) {
    queue_store.moveToDone(WS, { bead_id, attempt_id: `att-${bead_id}` });
    const file = queueFilePath(WS);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    raw.merge_queue.unshift({ bead_id, resolution_rounds: 0 });
    fs.writeFileSync(file, JSON.stringify(raw));
    queue_store.__clearCacheForTest();
  }

  test('dequeues an unobserved not_in_pr_wait slot and drives the next item', async () => {
    const store = seed(['UI-1', 'UI-2']);
    contaminate(store, 'UI-1');
    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1', 'UI-2']);

    /** @type {string[]} */
    const attempted = [];
    const prepare = vi.fn(async () => {});
    const mq = driver(store, {
      // What `prActions.merge()` really answers for a bead in no lane the
      // driver can vouch for.
      merge: async (/** @type {string} */ bead_id) => {
        attempted.push(bead_id);
        if (bead_id === 'UI-1') {
          return { ok: false, action: 'refused', reason: 'not_in_pr_wait' };
        }
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      },
      // The restart that emptied the observation cache — the trigger that made
      // this permanent rather than transient.
      headSha: () => null,
      prepare
    });

    await mq.kick();

    expect(prepare).toHaveBeenCalledTimes(2);
    expect(attempted).toEqual(['UI-1', 'UI-1', 'UI-2']);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('refreshes the external registry once and succeeds on retry', async () => {
    const store = createQueueStore();
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-ext', external: true }]
    });
    let registered = false;
    const prepare = vi.fn(async () => {
      if (prepare.mock.calls.length === 2) {
        registered = true;
      }
    });
    const merge = vi.fn(async () =>
      registered
        ? { ok: true, action: 'merged', reason: null }
        : { ok: false, action: 'refused', reason: 'not_in_pr_wait' }
    );
    const mq = driver(store, {
      merge,
      prepare,
      isExternalRow: () => registered
    });

    await mq.kick();

    expect(prepare).toHaveBeenCalledTimes(2);
    expect(merge).toHaveBeenCalledTimes(2);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('halts after one failed registry retry and remains re-clickable', async () => {
    const store = createQueueStore();
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-ext', external: true }]
    });
    let registered = false;
    const merge = vi.fn(async () =>
      registered
        ? { ok: true, action: 'merged', reason: null }
        : { ok: false, action: 'refused', reason: 'not_in_pr_wait' }
    );
    const mq = driver(store, {
      merge,
      prepare: async () => {},
      isExternalRow: () => true
    });

    await mq.kick();

    expect(merge).toHaveBeenCalledTimes(2);
    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
    expect(mq.state().failures['UI-ext']).toBe('not_in_pr_wait');

    registered = true;
    await mq.kick();

    expect(merge).toHaveBeenCalledTimes(3);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('resumes a registry-race halt from the poller event alone', async () => {
    const store = createQueueStore();
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-ext', external: true }]
    });
    /** @type {Array<(ws: string) => void>} */
    const listeners = [];
    let registered = false;
    const merge = vi.fn(async () => {
      if (!registered) {
        return {
          ok: false,
          action: /** @type {const} */ ('refused'),
          reason: 'not_in_pr_wait'
        };
      }
      return {
        ok: true,
        action: /** @type {const} */ ('merged'),
        reason: null
      };
    });
    const mq = driver(store, {
      merge,
      prepare: async () => {},
      headSha: () => (registered ? HEAD : null),
      isExternalRow: () => true,
      subscribeQueueChanged: (/** @type {any} */ fn) => {
        listeners.push(fn);
        return () => {};
      }
    });
    mq.start();
    await vi.waitFor(() => expect(merge).toHaveBeenCalledTimes(2));

    registered = true;
    for (const listener of listeners) {
      listener(WS);
    }

    await vi.waitFor(() => expect(store.snapshot(WS).merge_queue).toEqual([]));
    mq.stop();
    expect(merge).toHaveBeenCalledTimes(3);
  });

  test('still halts on a pr_wait head whose SHA is unreadable', async () => {
    const store = seed(['UI-1', 'UI-2']);
    const merge = vi.fn(async () => ({
      ok: false,
      action: 'refused',
      reason: 'verify_cmd_failed'
    }));

    const mq = driver(store, { merge, headSha: () => null });
    await mq.kick();

    // The poller watches `pr_wait`, so the observation this halt waits on is
    // guaranteed to arrive — the halt terminates and must be kept.
    expect(merge).toHaveBeenCalledTimes(1);
    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1', 'UI-2']);
  });

  test('halts on an external registry head and resumes when its SHA arrives', async () => {
    const store = createQueueStore();
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-ext', external: true }]
    });
    /** @type {Array<(ws: string) => void>} */
    const listeners = [];
    /** @type {string|null} */
    let head = null;
    const merge = vi.fn(async () => ({
      ok: false,
      action: 'refused',
      reason: 'verify_cmd_failed'
    }));
    const mq = driver(store, {
      merge,
      headSha: () => head,
      // A live registry row: the poller DOES observe it even though no durable
      // lane holds it, so the halt has an end.
      isExternalRow: () => true,
      subscribeQueueChanged: (/** @type {any} */ fn) => {
        listeners.push(fn);
        return () => {};
      }
    });
    mq.start();
    await new Promise((r) => setTimeout(r, 0));

    expect(store.snapshot(WS).merge_queue.length).toBe(1);

    head = HEAD;
    for (const fn of listeners) {
      fn(WS);
    }
    await new Promise((r) => setTimeout(r, 0));

    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(store.snapshot(WS).auto_merge_skips['UI-ext'].head_sha).toBe(HEAD);
    mq.stop();
  });

  test('resumes when the halted head stops being observed', async () => {
    const store = createQueueStore();
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-ext' }, { bead_id: 'UI-2' }].map((e) => ({
        ...e,
        external: true
      }))
    });
    /** @type {Array<(ws: string) => void>} */
    const listeners = [];
    let registered = true;
    /** @type {string[]} */
    const attempted = [];
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        attempted.push(bead_id);
        return { ok: false, action: 'refused', reason: 'verify_cmd_failed' };
      },
      headSha: () => null,
      isExternalRow: () => registered,
      subscribeQueueChanged: (/** @type {any} */ fn) => {
        listeners.push(fn);
        return () => {};
      }
    });
    mq.start();
    await new Promise((r) => setTimeout(r, 0));

    // Halted on an observed head, with UI-2 stuck behind it.
    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-ext', 'UI-2']);

    // The registry row expires. The head SHA is STILL unreadable, so a resume
    // keyed only on readability would leave the queue stalled forever — the
    // halt's justification is gone, not merely unchanged.
    registered = false;
    for (const fn of listeners) {
      fn(WS);
    }
    await new Promise((r) => setTimeout(r, 0));

    expect(attempted).toEqual(['UI-ext', 'UI-ext', 'UI-2']);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    mq.stop();
  });

  test('dequeues rather than halts when the registry lookup throws', async () => {
    const store = createQueueStore();
    store.enqueueMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-ext', external: true }]
    });
    const mq = driver(store, {
      merge: async () => ({
        ok: false,
        action: 'refused',
        reason: 'verify_cmd_failed'
      }),
      headSha: () => null,
      isExternalRow: () => {
        throw new Error('registry down');
      }
    });

    await mq.kick();

    // Fail toward EMPTYING the queue: a wrong dequeue is undone by the next
    // enrolment pass, a wrong halt waits forever on the observation that was
    // undecidable in the first place.
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('applies the same rule at the exclusion filter halt', async () => {
    const store = seed(['UI-1', 'UI-2']);
    // Staged in this order because both `moveToDone` and `recordMergeSkip`
    // clear what the other writes — the pair only exists on disk.
    store.moveToDone(WS, { bead_id: 'UI-1', attempt_id: 'att-UI-1' });
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: HEAD,
      reason: 'resolution_round_cap'
    });
    const file = queueFilePath(WS);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    raw.merge_queue.unshift({ bead_id: 'UI-1', resolution_rounds: 0 });
    fs.writeFileSync(file, JSON.stringify(raw));
    store.__clearCacheForTest();

    /** @type {string[]} */
    const attempted = [];
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        attempted.push(bead_id);
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      },
      headSha: () => null
    });

    await mq.kick();

    // Excluded AND unobservable: it leaves without being merged, and the two
    // halt sites agree about when halting is allowed.
    expect(attempted).toEqual(['UI-2']);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });
});
