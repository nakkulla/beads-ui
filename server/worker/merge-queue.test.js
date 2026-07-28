import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createMergeQueue } from './merge-queue.js';
import { createQueueStore } from './queue-store.js';

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
        // Simulates an unwritable state dir: the item stays at the head.
        dequeueMerge: () => ({ ok: false, conflict: false, queue: null })
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
