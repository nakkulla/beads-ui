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
      attempt: { attempt_id: `att-${bead_id}`, bead_id }
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

  test('skips a refused item and continues with the next', async () => {
    const store = seed(['UI-1', 'UI-2']);
    /** @type {string[]} */
    const seen = [];
    const mq = driver(store, {
      merge: async (/** @type {string} */ bead_id) => {
        seen.push(bead_id);
        if (bead_id === 'UI-1') {
          return { ok: false, action: 'refused', reason: 'ci_failed' };
        }
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(seen).toEqual(['UI-1', 'UI-2']);
    expect(mq.state().failures['UI-1']).toBe('ci_failed');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
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

describe('worker/merge-queue — completion subject continuity', () => {
  test('holds the root queue head while its repair PR is not ready to merge', async () => {
    const store = seed(['UI-root', 'UI-next']);
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
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

  test('merges only the repair subject and returns the held root to gating', async () => {
    const store = seed(['UI-root', 'UI-repair']);
    store.dequeueMerge(WS, 'UI-repair');
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
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
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
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
                conflict_resolution: true
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
          return { ok: false, action: 'refused', reason: 'ci_failed' };
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
      { bead_id: 'UI-root', resolution_rounds: 1 }
    ]);
    expect(queue.completion_intents['UI-root'].repair_sessions_used).toBe(1);
  });

  test('adopts a repair child already in done without issuing a duplicate merge', async () => {
    const store = seed(['UI-root', 'UI-repair']);
    store.dequeueMerge(WS, 'UI-repair');
    store.enqueueCompletionIntent(WS, {
      root_bead_id: 'UI-root',
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
        conflict_resolution: true
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

  test('stops at the round cap and leaves the dispatched session running', async () => {
    const store = seed(['UI-1']);
    // Two rounds already consumed — the durable count is what the cap reads.
    store.bumpResolutionRound(WS, 'UI-1');
    store.bumpResolutionRound(WS, 'UI-1');
    const stop = vi.fn();
    const mq = driver(store, {
      merge: async () => ({
        ok: true,
        action: 'conflict_resolution',
        reason: null,
        attempt_id: 'res-3'
      })
    });

    await mq.kick();

    expect(mq.state().failures['UI-1']).toBe('resolution_round_cap');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(stop).not.toHaveBeenCalled();
  });

  test('skips the item when the session outlives the wait, without stopping it', async () => {
    const store = seed(['UI-1', 'UI-2']);
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

    expect(mq.state().failures['UI-1']).toBe('resolution_timeout');
    // The session is left exactly where it was — the queue gave up its turn,
    // not the resolution work.
    expect(store.snapshot(WS).attempts['res-slow'].status).toBe('running');
    // And the queue moved on rather than stalling on it.
    expect(merges).toEqual(['UI-1', 'UI-2']);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('the round count is durable, so a restart cannot hand out fresh rounds', () => {
    const store = seed(['UI-1']);

    store.bumpResolutionRound(WS, 'UI-1');
    const reloaded = createQueueStore();

    expect(reloaded.snapshot(WS).merge_queue).toEqual([
      { bead_id: 'UI-1', resolution_rounds: 1 }
    ]);
  });

  test('survives the scheduler moving the bead back into pr_wait mid-round', async () => {
    // The real completion path for a resolution attempt is `moveToPrWait`,
    // which re-enters the lane the bead never left. Its lane dedupe must not
    // drop the queue entry — that would silently cancel the automatic re-merge
    // (codex implementation review 2026-07-28 finding 1).
    const store = seed(['UI-1']);
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
                conflict_resolution: true
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

  test('a PAUSED resolution session is still in flight, never a re-dispatch', async () => {
    const store = seed(['UI-1']);
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

    // merge() ran ONCE: the pause is waited out and times out, rather than
    // restarting the session the user stopped.
    expect(calls).toBe(1);
    expect(mq.state().failures['UI-1']).toBe('resolution_timeout');
    expect(store.snapshot(WS).attempts['res-1'].status).toBe('paused');
  });

  test('a boot restore at the round cap skips instead of granting a third round', async () => {
    const store = seed(['UI-1']);
    store.bumpResolutionRound(WS, 'UI-1');
    store.bumpResolutionRound(WS, 'UI-1');
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

  test('a boot resume waits for a running session instead of re-calling merge', async () => {
    const store = seed(['UI-1']);
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
      reason: 'ci_failed'
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
      merge: async () => ({ ok: false, action: 'refused', reason: 'ci_failed' })
    });

    await mq.kick();

    expect(store.snapshot(WS).auto_merge_skips['UI-1']).toMatchObject({
      head_sha: HEAD,
      reason: 'ci_failed'
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
      reason: 'ci_failed'
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
      reason: 'ci_failed'
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
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'conflict_resolution',
      attempt_id: null,
      reason: null
    }));
    const mq = driver(store, { merge });

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

  test('dequeues a done+merge_queue head and drives the next item', async () => {
    const store = seed(['UI-1', 'UI-2']);
    contaminate(store, 'UI-1');
    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1', 'UI-2']);

    /** @type {string[]} */
    const attempted = [];
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
      headSha: () => null
    });

    await mq.kick();

    expect(attempted).toEqual(['UI-1', 'UI-2']);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    // Nowhere to pin an exclusion for a bead that left every lane, and nothing
    // to protect against: the store now refuses to re-enrol it.
    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('still halts on a pr_wait head whose SHA is unreadable', async () => {
    const store = seed(['UI-1', 'UI-2']);
    const merge = vi.fn(async () => ({
      ok: false,
      action: 'refused',
      reason: 'ci_failed'
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
      reason: 'ci_failed'
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
        return { ok: false, action: 'refused', reason: 'ci_failed' };
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
        reason: 'ci_failed'
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
