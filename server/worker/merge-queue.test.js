import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createCompletionIntentCoordinator } from './completion-intent.js';
import { createMergeQueue } from './merge-queue.js';
import { createQueueStore } from './queue-store.js';
import { queueFilePath } from './state-paths.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/merge-queue';

/** The dispatch head every resolution binding in this file is taken on. */
const RESOLUTION_DISPATCH_HEAD = 'd'.repeat(40);

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

describe('worker/merge-queue — bead timeline (record-timeline-retention §5)', () => {
  /**
   * A timeline that records what it was asked to append, standing in for the
   * one instance `attach.js` injects.
   */
  function recorder() {
    /** @type {any[]} */
    const events = [];
    return { events, append: (/** @type {any} */ input) => events.push(input) };
  }

  test('records the merge disposition on the merged bead', async () => {
    const store = seed(['UI-1']);
    const timeline = recorder();
    const mq = driver(store, {
      timeline,
      merge: async (/** @type {string} */ bead_id) => {
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await mq.kick();

    expect(timeline.events).toEqual([
      {
        bead_id: 'UI-1',
        kind: 'merge_step',
        seq: 'm1',
        summary: '머지 큐 · squash 머지 완료'
      }
    ]);
  });

  test('names a refusal with its failure sentence', async () => {
    const store = seed(['UI-1']);
    const timeline = recorder();
    const mq = driver(store, {
      timeline,
      merge: async () => ({
        ok: false,
        action: 'refused',
        reason: 'merge_error'
      })
    });

    await mq.kick();

    expect(timeline.events[0]).toMatchObject({
      bead_id: 'UI-1',
      kind: 'merge_step',
      seq: 'm1'
    });
    expect(timeline.events[0].summary).toContain('머지 보류');
  });

  test('keeps two attempts of one bead as two lines', async () => {
    const store = seed(['UI-1']);
    const timeline = recorder();
    /** @type {string[]} */
    const reasons = ['snapshot_unreadable', 'merge_error'];
    const mq = driver(store, {
      timeline,
      merge: async () => ({
        ok: false,
        action: 'refused',
        reason: reasons.shift() || 'merge_error'
      })
    });

    await mq.kick();
    await mq.kick();

    expect(timeline.events.map((/** @type {any} */ e) => e.seq)).toEqual([
      'm1',
      'm2'
    ]);
    expect(timeline.events[0].summary).not.toBe(timeline.events[1].summary);
  });

  test('continues the numbering a restart found on the timeline', async () => {
    const store = seed(['UI-1']);
    const timeline = recorder();
    const mq = driver(store, {
      timeline: {
        ...timeline,
        readTimeline: () => [
          { event_id: 'merge_step:UI-1:m1', kind: 'merge_step' }
        ]
      },
      merge: async () => ({
        ok: false,
        action: 'refused',
        reason: 'merge_error'
      })
    });

    await mq.kick();

    expect(timeline.events[0].seq).toBe('m2');
  });

  test('merges when no timeline is injected', async () => {
    const store = seed(['UI-1']);
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, { merge });

    await mq.kick();

    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('merges when the timeline append fails', async () => {
    const store = seed(['UI-1']);
    const mq = driver(store, {
      timeline: {
        append: () => ({ ok: false, reason: 'write_failed', detail: 'nope' })
      },
      merge: async (/** @type {string} */ bead_id) => {
        landMerge(store, bead_id);
        return { ok: true, action: 'merged', reason: null };
      }
    });

    await expect(mq.kick()).resolves.toBeUndefined();

    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });
});

describe('worker/merge-queue — sequencing', () => {
  test('does not collect a quick_fix attempt naturally lacking pr_url and pr_wait', async () => {
    const store = createQueueStore();
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'att-QF-1',
        bead_id: 'QF-1',
        repo: WS,
        target_base: 'main',
        runner: 'codex',
        quickfix_lane: true
      }
    });
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'merged',
      reason: null
    }));
    const mq = driver(store, { merge });

    await mq.kick();

    // No PR URL means no pr_wait row, and therefore no durable merge candidate.
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(merge).not.toHaveBeenCalled();
  });

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

describe('worker/merge-queue — 스냅샷 fail-closed', () => {
  test('fails closed when the queue snapshot is unreadable', async () => {
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
  test('exposes a completion halt until the queued phase can continue', async () => {
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
    /** @type {{ current: ((workspace: string) => void)|null }} */
    const changed = { current: null };
    const merge = vi.fn(async () => {
      store.dequeueMerge(WS, 'UI-root');
      return { ok: true, action: 'merged', reason: null };
    });
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
      expect(mq.state().waiting).toEqual({
        bead_id: 'UI-root',
        reason: 'completion_waiting:gating'
      })
    );
    store.setCompletionSubject(WS, {
      root_bead_id: 'UI-root',
      phase: 'merging',
      subject: store.snapshot(WS).completion_intents['UI-root'].subject
    });
    changed.current?.(WS);
    await vi.waitFor(() => expect(merge).toHaveBeenCalledTimes(1));
    mq.stop();

    expect(mq.state().waiting).toBeNull();
  });

  test('holds the root queue head while the intent is not merging', async () => {
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
      phase: 'cleaning',
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

  test('counts conflict rounds on the root queue entry', async () => {
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
              attempt_id: 'conflict-1',
              head_sha: RESOLUTION_DISPATCH_HEAD,
              base_ref: 'main',
              head_ref: 'feature-branch'
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
      {
        bead_id: 'UI-root',
        resolution_rounds: 1,
        rebase_rounds: 0,
        resolution: null
      }
    ]);
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
              attempt_id: 'res-1',
              head_sha: RESOLUTION_DISPATCH_HEAD,
              base_ref: 'main',
              head_ref: 'feature-branch'
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
            attempt_id: 'res-slow',
            head_sha: RESOLUTION_DISPATCH_HEAD,
            base_ref: 'main',
            head_ref: 'feature-branch'
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
        rebase_rounds: 0,
        resolution: { attempt_id: 'res-slow', state: 'yielded' }
      }
    ]);
  });

  test('the round count is durable, so a restart cannot hand out fresh rounds', () => {
    const store = seed(['UI-1']);

    store.bumpResolutionRound(WS, 'UI-1');
    const reloaded = createQueueStore();

    expect(reloaded.snapshot(WS).merge_queue).toEqual([
      {
        bead_id: 'UI-1',
        resolution_rounds: 1,
        rebase_rounds: 0,
        resolution: null
      }
    ]);
  });

  /** The head the resolution session is pretended to have pushed. */
  const PUSHED_HEAD = 'e'.repeat(40);

  /**
   * Drive ONE settled resolution through the charge judgment (spec §4.2) and
   * hand back the spy on what the store was asked to charge.
   *
   * @param {{ probe: any, blank_identity?: boolean, baseContained?: any, rebase_round_cap?: number }} input
   */
  async function chargeCase(input) {
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
      wait_ms: 100,
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch'
    });
    finish();
    store.settleResolutionWait(WS, {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      attempt_id: 'res-charge',
      settled_at: 2,
      active_bead_id: null
    });
    if (input.blank_identity) {
      // Only a legacy record can carry an unidentified binding — the store
      // refuses to write one — so this is how a pre-deploy wait looks.
      const file = queueFilePath(WS);
      const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
      for (const entry of raw.merge_queue) {
        delete entry.resolution?.dispatch_head_sha;
        delete entry.resolution?.base_ref;
        delete entry.resolution?.head_ref;
      }
      fs.writeFileSync(file, JSON.stringify(raw));
      store.__clearCacheForTest();
    }
    const consume = vi.spyOn(store, 'consumeResolutionWait');
    const mq = driver(store, {
      probeMergeability: async () => input.probe,
      ...(input.baseContained ? { baseContained: input.baseContained } : {}),
      ...(input.rebase_round_cap === undefined
        ? {}
        : { rebase_round_cap: input.rebase_round_cap }),
      dispatchConflict: async () => ({
        ok: false,
        action: 'conflict_resolution',
        reason: 'worktree_missing'
      })
    });

    await mq.kick();

    return { store, mq, consume };
  }

  /**
   * @param {'dirty'|'clean'} kind
   * @param {string} head_sha
   */
  function probeOf(kind, head_sha) {
    return {
      ok: true,
      kind,
      reason: null,
      head_sha,
      base_ref: 'main',
      head_ref: 'feature-branch',
      external: false
    };
  }

  test('charges the session when the re-probe itself could not be read', async () => {
    const { consume } = await chargeCase({
      probe: { ok: false, kind: 'blocked', reason: 'probe_error' }
    });

    expect(consume).toHaveBeenCalledWith(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-charge',
      charge: 'session'
    });
  });

  test('charges nothing when the re-probe is no longer dirty', async () => {
    const { consume } = await chargeCase({
      probe: probeOf('clean', PUSHED_HEAD)
    });

    expect(consume).toHaveBeenCalledWith(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-charge',
      charge: 'none'
    });
  });

  test('charges the session when the binding names no dispatch identity', async () => {
    const { consume } = await chargeCase({
      probe: probeOf('dirty', PUSHED_HEAD),
      blank_identity: true,
      baseContained: async () => 'not_contained'
    });

    expect(consume).toHaveBeenCalledWith(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-charge',
      charge: 'session'
    });
  });

  test('charges the session when the head never moved off the dispatched one', async () => {
    const { consume } = await chargeCase({
      probe: probeOf('dirty', RESOLUTION_DISPATCH_HEAD),
      baseContained: async () => 'not_contained'
    });

    expect(consume).toHaveBeenCalledWith(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-charge',
      charge: 'session'
    });
  });

  test('charges the rebase budget when the pushed head never saw the base', async () => {
    const baseContained = vi.fn(async () => 'not_contained');

    const { consume } = await chargeCase({
      probe: probeOf('dirty', PUSHED_HEAD),
      baseContained
    });

    expect(baseContained).toHaveBeenCalledWith('UI-1', {
      base_ref: 'main',
      head_ref: 'feature-branch',
      head_sha: PUSHED_HEAD
    });
    expect(consume).toHaveBeenCalledWith(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-charge',
      charge: 'rebase'
    });
  });

  test('charges the session when the pushed head already contains the base', async () => {
    const { consume } = await chargeCase({
      probe: probeOf('dirty', PUSHED_HEAD),
      baseContained: async () => 'contained'
    });

    expect(consume).toHaveBeenCalledWith(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-charge',
      charge: 'session'
    });
  });

  test('charges the session when containment cannot be decided', async () => {
    const { consume } = await chargeCase({
      probe: probeOf('dirty', PUSHED_HEAD),
      baseContained: async () => null
    });

    expect(consume).toHaveBeenCalledWith(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-charge',
      charge: 'session'
    });
  });

  test('charges the session when no containment seam is wired at all', async () => {
    const { consume } = await chargeCase({
      probe: probeOf('dirty', PUSHED_HEAD)
    });

    expect(consume).toHaveBeenCalledWith(WS, {
      bead_id: 'UI-1',
      attempt_id: 'res-charge',
      charge: 'session'
    });
  });

  test('skips the item once the rebase budget runs out', async () => {
    const { store, mq } = await chargeCase({
      probe: probeOf('dirty', PUSHED_HEAD),
      baseContained: async () => 'not_contained',
      rebase_round_cap: 1
    });

    expect(mq.state().failures['UI-1']).toBe('resolution_rebase_cap');
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(store.snapshot(WS).auto_merge_skips['UI-1']).toMatchObject({
      reason: 'resolution_rebase_cap'
    });
  });

  test('hands the dispatcher the observed head branch and dispatch identity', async () => {
    const store = seed(['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const dispatchConflict = vi.fn(async () => ({
      ok: false,
      action: /** @type {const} */ ('conflict_resolution'),
      reason: 'worktree_missing'
    }));
    const mq = driver(store, {
      probeMergeability: async () => probeOf('dirty', PUSHED_HEAD),
      dispatchConflict
    });

    await mq.kick();

    expect(dispatchConflict).toHaveBeenCalledWith(
      'UI-1',
      { head_sha: PUSHED_HEAD, base_ref: 'main', head_ref: 'feature-branch' },
      expect.objectContaining({
        queue_bead_id: 'UI-1',
        dispatch_head_sha: PUSHED_HEAD,
        base_ref: 'main',
        head_ref: 'feature-branch'
      }),
      undefined
    );
  });

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
          dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
          base_ref: 'main',
          head_ref: 'feature-branch',

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
          attempt_id: 'res-serial',
          head_sha: RESOLUTION_DISPATCH_HEAD,
          base_ref: 'main',
          head_ref: 'feature-branch'
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
              attempt_id: 'res-1',
              head_sha: RESOLUTION_DISPATCH_HEAD,
              base_ref: 'main',
              head_ref: 'feature-branch'
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
            attempt_id: `res-${calls}`,
            head_sha: RESOLUTION_DISPATCH_HEAD,
            base_ref: 'main',
            head_ref: 'feature-branch'
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
        },
        // Adopting a session the queue did not dispatch reads its identity
        // from the current observation (UI-p49g §3.1).
        probeMergeability: async () => ({
          ok: true,
          kind: 'clean',
          reason: null,
          head_sha: RESOLUTION_DISPATCH_HEAD,
          base_ref: 'main',
          head_ref: 'feature-branch',
          external: false
        })
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
          dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
          base_ref: 'main',
          head_ref: 'feature-branch',

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
          attempt_id: 'res-late',
          head_sha: RESOLUTION_DISPATCH_HEAD,
          base_ref: 'main',
          head_ref: 'feature-branch'
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
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
            attempt_id: 'res-1',
            head_sha: RESOLUTION_DISPATCH_HEAD,
            base_ref: 'main',
            head_ref: 'feature-branch'
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
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
        attempt_id: 'res-1',
        head_sha: RESOLUTION_DISPATCH_HEAD,
        base_ref: 'main',
        head_ref: 'feature-branch'
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
      attempt_id: null,
      head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch'
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
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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

  test('resumes a terminal completion through its gate to conflict dispatch', async () => {
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
        head_sha: MANUAL_HEAD,
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    });
    store.terminalizeCompletionIntent(WS, {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'review_receipt_stale',
        stage: 'merge_gate',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 10
      }
    });
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        {
          bead_id: 'UI-root',
          head_sha: MANUAL_HEAD,
          target_base: 'main'
        }
      ]
    });
    const observe = vi.fn(async () => ({
      state: /** @type {const} */ ('conflict')
    }));
    const completion = createCompletionIntentCoordinator({
      workspace: WS,
      store,
      observe,
      onAction: async (root_bead_id, action, intent) => {
        expect(action).toEqual({ kind: 'merge_subject' });
        store.setCompletionSubject(WS, {
          root_bead_id,
          phase: 'merging',
          subject: intent.subject
        });
      }
    });
    const dispatchConflict = vi.fn(async () => ({
      ok: false,
      action: /** @type {const} */ ('conflict_resolution'),
      reason: 'worktree_missing'
    }));
    const mq = driver(store, {
      probeMergeability: async () => ({
        ok: true,
        kind: /** @type {const} */ ('dirty'),
        reason: null,
        head_sha: MANUAL_HEAD,
        base_ref: 'main',
        external: false
      }),
      dispatchConflict,
      onCompletionResult: vi.fn()
    });

    await completion.reconcile();
    await mq.kick();

    expect(observe).toHaveBeenCalledWith(
      'UI-root',
      expect.objectContaining({
        phase: 'gating',
        resumed_terminal: expect.objectContaining({
          reason: 'review_receipt_stale'
        })
      }),
      expect.any(Object)
    );
    expect(dispatchConflict).toHaveBeenCalledTimes(1);
  });

  test('merges a ready manual item while auto_merge is off', async () => {
    const store = seedManual(['UI-1']);
    const finish = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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

  test('holds a review-stale item and merges when the next kick is eligible', async () => {
    const store = seedManual(['UI-1']);
    let current = false;
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      probeMergeability: async () =>
        current
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
            }
    });

    await mq.kick();

    // Held, not ended (UI-d7fy §3.3): the slot, the authority, and the reason
    // all survive, and nothing merged.
    const held = store.snapshot(WS).merge_queue[0];
    expect(merge).not.toHaveBeenCalled();
    expect(held.authority?.source).toBe('manual');
    expect(held.hold).toMatchObject({
      reason: 'review_receipt_stale',
      head_sha: MOVED_HEAD
    });

    // The receipt arrives; the very next kick re-runs the gate on the held
    // item, clears the hold, and merges.
    current = true;
    await mq.kick();

    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('an observation pass re-judges a held item the queue never mutated', async () => {
    const store = seedManual(['UI-1']);
    /** @type {Array<(ws: string) => void>} */
    const listeners = [];
    let current = false;
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      subscribeQueueChanged: (/** @type {any} */ fn) => {
        listeners.push(fn);
        return () => {};
      },
      probeMergeability: async () =>
        current
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
            }
    });
    mq.start();
    await new Promise((r) => setTimeout(r, 0));

    expect(store.snapshot(WS).merge_queue[0].hold?.reason).toBe(
      'review_receipt_stale'
    );

    // The receipt becomes valid EXTERNALLY — a session writes it to the Bead,
    // and nothing in the queue file changes. The PR observation pass fires
    // `queue-changed`, and that has to be enough (UI-d7fy §3.3): `wake()` alone
    // only nudges a drain already in progress, so without the hold's own drain
    // the row would stay held forever.
    current = true;
    for (const fn of listeners) {
      fn(WS);
    }
    await new Promise((r) => setTimeout(r, 0));

    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    mq.stop();
  });

  test('holds an undetermined review verdict like a stale one', async () => {
    const store = seedManual(['UI-1']);
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: false,
        kind: 'blocked',
        reason: 'review_receipt_undetermined',
        head_sha: MOVED_HEAD,
        base_ref: 'main',
        external: false
      })
    });

    await mq.kick();

    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue[0].hold?.reason).toBe(
      'review_receipt_undetermined'
    );
  });

  test('does not hold on an absent spec_id refusal', async () => {
    const store = seedManual(['UI-1']);
    const merge = vi.fn();
    const mq = driver(store, {
      merge,
      probeMergeability: async () => ({
        ok: false,
        kind: 'blocked',
        reason: 'spec_id_missing',
        head_sha: MOVED_HEAD,
        base_ref: 'main',
        external: false
      })
    });

    await mq.kick();

    // Only the review verdicts hold (UI-d7fy §3.3). `spec_id_missing` is not
    // resolved by a review, so it keeps the pre-existing terminal disposition.
    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('updates a BEHIND manual item once and merges the moved head', async () => {
    const store = seedManual(['UI-1']);
    let updated = false;
    const updateBase = vi.fn(async () => {
      updated = true;
      return { ok: true, reason: null, result_head_sha: MOVED_HEAD };
    });
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      updateBase,
      probeMergeability: async () =>
        updated
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
              reason: 'base_behind',
              head_sha: MANUAL_HEAD,
              base_ref: 'main',
              head_ref: 'UI-1',
              external: false
            }
    });

    await mq.kick();

    // The one-shot alignment is unchanged (UI-d7fy §3.3): ancestry keeps the
    // prior receipt current across the moved head, so nothing else is asked of
    // the item before it merges.
    expect(updateBase).toHaveBeenCalledTimes(1);
    expect(merge).toHaveBeenCalledTimes(1);
  });

  test('sends a ready resolution straight back to re-observation', async () => {
    const store = seedManual(['UI-1']);
    const finish = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
      })
    });

    await mq.kick();

    // A queue-owned resolution asks for no receipt of its own (UI-d7fy §2):
    // the original `impl_review` is an ancestor of the resolved head, so the
    // gate the re-observation runs is the whole judgment.
    expect(merge).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('merges the head a second resolver round produced', async () => {
    const store = seedManual(['UI-1']);
    const finishFirst = dispatchResolution(store, 'UI-1', 'res-1');
    store.bindResolutionWait(WS, {
      dispatch_head_sha: RESOLUTION_DISPATCH_HEAD,
      base_ref: 'main',
      head_ref: 'feature-branch',

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
        attempt_id: 'res-2',
        head_sha: RESOLUTION_DISPATCH_HEAD,
        base_ref: 'main',
        head_ref: 'feature-branch'
      };
    });
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
      }
    });

    await mq.kick();

    expect(dispatchConflict).toHaveBeenCalledTimes(1);
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
      onCompletionResult: async () => {}
    });

    await mq.kick();

    // The completion saga owns its own gating; the queue does not layer a
    // second judgment on top of it.
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

  test('skips a held item and keeps draining the ones behind it', async () => {
    const store = seedManual(['UI-1', 'UI-2']);
    /** @type {string[]} */
    const merged = [];
    const merge = vi.fn(async (/** @type {string} */ bead_id) => {
      landMerge(store, bead_id);
      merged.push(bead_id);
      return { ok: true, action: 'merged', reason: null };
    });
    const mq = driver(store, {
      merge,
      probeMergeability: async (/** @type {string} */ bead_id) =>
        bead_id === 'UI-1'
          ? {
              ok: false,
              kind: 'blocked',
              reason: 'review_receipt_missing',
              head_sha: MOVED_HEAD,
              base_ref: 'main',
              external: false
            }
          : {
              ok: true,
              kind: 'clean',
              reason: null,
              head_sha: MOVED_HEAD,
              base_ref: 'main',
              external: false
            }
    });

    await mq.kick();

    // A hold is not `halted_on_head` (UI-d7fy §3.3): the held item is skipped
    // for the rest of the pass and everything behind it still merges.
    expect(merged).toEqual(['UI-2']);
    expect(store.snapshot(WS).merge_queue.map((e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
    expect(store.snapshot(WS).merge_queue[0].hold?.reason).toBe(
      'review_receipt_missing'
    );
  });

  test('holds a legacy authority-less entry on the same review verdict', async () => {
    const store = seed(['UI-1']);
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
      })
    });

    await mq.kick();

    // The hold is a property of the GATE VERDICT, not of the authority
    // (UI-d7fy §3.3): a legacy row is held with the same reason and the same
    // [취소] exit rather than dropped without one.
    expect(merge).not.toHaveBeenCalled();
    expect(store.snapshot(WS).merge_queue[0].hold?.reason).toBe(
      'review_receipt_stale'
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
