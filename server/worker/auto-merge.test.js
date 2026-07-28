import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createAutoMerge } from './auto-merge.js';
import { createQueueStore } from './queue-store.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/auto-merge';
const HEAD = 'a'.repeat(40);

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-am-'));
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
 * Park beads in the durable `pr_wait` lane.
 *
 * @param {any} store
 * @param {string[]} bead_ids
 */
function park(store, bead_ids) {
  for (const bead_id of bead_ids) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: { attempt_id: `att-${bead_id}`, bead_id }
    });
    store.moveToPrWait(WS, {
      bead_id,
      attempt_id: `att-${bead_id}`,
      patch: { status: 'done' }
    });
  }
  return store;
}

/**
 * An enroller whose lane and eligibility judgment are injected, so the tests
 * exercise the enrolment step itself rather than the merge gate (which has its
 * own suite).
 *
 * @param {any} store
 * @param {{ eligible?: string[], lane?: string[], heads?: Record<string, string|null>, subscribe?: any }} [input]
 */
function enroller(store, input = {}) {
  const notifyChanged = vi.fn();
  const kick = vi.fn(async () => {});
  /** @type {Array<(ws: string) => void>} */
  const listeners = [];
  const auto = createAutoMerge({
    workspace: WS,
    store,
    verifyCmdPresent: () => true,
    headSha: (bead_id) =>
      input.heads && bead_id in input.heads ? input.heads[bead_id] : HEAD,
    lane: () =>
      (input.lane ?? input.eligible ?? ['UI-1']).map((bead_id) => ({
        bead_id,
        external: false
      })),
    candidates: () =>
      (input.eligible ?? ['UI-1']).map((bead_id) => ({
        bead_id,
        external: false
      })),
    notifyChanged,
    kick,
    subscribeQueueChanged: (fn) => {
      listeners.push(fn);
      return () => {
        const i = listeners.indexOf(fn);
        if (i >= 0) {
          listeners.splice(i, 1);
        }
      };
    }
  });
  return {
    auto,
    notifyChanged,
    kick,
    emit: () => {
      for (const fn of [...listeners]) {
        fn(WS);
      }
    },
    listeners
  };
}

describe('worker/auto-merge — 편입 (UI-yk55 §4.2)', () => {
  test('queues the eligible rows and wakes the driver', () => {
    const store = park(createQueueStore(), ['UI-1']);
    const { auto, notifyChanged, kick } = enroller(store);

    const r = auto.enroll();

    expect(r).toMatchObject({ applied: true, queued: 1 });
    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1']);
    // Persist alone leaves the item in a queue nobody drains — the regression
    // this shape exists to prevent.
    expect(notifyChanged).toHaveBeenCalledWith(WS);
    expect(kick).toHaveBeenCalled();
  });

  test('does not queue a row whose head SHA cannot be read', () => {
    const store = park(createQueueStore(), ['UI-1']);
    const { auto, kick } = enroller(store, { heads: { 'UI-1': null } });

    const r = auto.enroll();

    expect(r.applied).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(kick).not.toHaveBeenCalled();
  });

  test('passes over a row excluded at the same head', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: HEAD,
      reason: 'refused'
    });
    const { auto } = enroller(store);

    const r = auto.enroll();

    expect(r.applied).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('re-queues once the head moves, dropping the record', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.recordMergeSkip(WS, {
      bead_id: 'UI-1',
      head_sha: 'b'.repeat(40),
      reason: 'refused'
    });
    const { auto } = enroller(store);

    const r = auto.enroll();

    expect(r.applied).toBe(true);
    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('prunes the record of a row that left the lane entirely', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.recordMergeSkip(WS, {
      bead_id: 'GONE-1',
      head_sha: HEAD,
      reason: 'refused'
    });
    const { auto } = enroller(store, { eligible: [], lane: ['UI-1'] });

    const r = auto.enroll();

    expect(r.applied).toBe(true);
    expect(store.snapshot(WS).auto_merge_skips).toEqual({});
  });

  test('emits nothing when there is nothing to enroll or prune', () => {
    const store = park(createQueueStore(), ['UI-1']);
    const { auto, notifyChanged, kick } = enroller(store, { eligible: [] });

    const r = auto.enroll();

    expect(r.applied).toBe(false);
    expect(notifyChanged).not.toHaveBeenCalled();
    expect(kick).not.toHaveBeenCalled();
  });
});

describe('worker/auto-merge — 구독 (UI-yk55 §4.1/§4.3)', () => {
  test('does nothing at all while the toggle is off', () => {
    const store = park(createQueueStore(), ['UI-1']);
    const { auto, emit, kick } = enroller(store);
    auto.start();

    emit();

    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(kick).not.toHaveBeenCalled();
  });

  test('enrolls on a queue-changed while the toggle is on', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const { auto, emit } = enroller(store);
    auto.start();

    emit();

    expect(
      store.snapshot(WS).merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1']);
  });

  test('a re-entrant event coalesces instead of recursing', () => {
    const store = park(createQueueStore(), ['UI-1', 'UI-2']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    /** @type {Array<(ws: string) => void>} */
    const listeners = [];
    let enrolments = 0;
    const auto = createAutoMerge({
      workspace: WS,
      store,
      verifyCmdPresent: () => true,
      headSha: () => HEAD,
      lane: () => [
        { bead_id: 'UI-1', external: false },
        { bead_id: 'UI-2', external: false }
      ],
      candidates: () => {
        enrolments += 1;
        return [
          { bead_id: 'UI-1', external: false },
          { bead_id: 'UI-2', external: false }
        ];
      },
      // The REAL wiring: enrolment emits the very event it subscribes to.
      notifyChanged: (ws_key) => {
        for (const fn of [...listeners]) {
          fn(ws_key);
        }
      },
      subscribeQueueChanged: (fn) => {
        listeners.push(fn);
        return () => {};
      }
    });
    auto.start();

    listeners[0](WS);

    // Two passes, not a stack: the re-entrant event coalesces into one re-run,
    // and that re-run finds nothing new — which is what terminates the loop
    // (§4.3).
    expect(enrolments).toBe(2);
    expect(store.snapshot(WS).merge_queue.length).toBe(2);
  });

  test('stop() releases the subscription', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const { auto, emit, listeners } = enroller(store);
    auto.start();

    auto.stop();
    emit();

    expect(listeners.length).toBe(0);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('a throwing scan is swallowed so the manual path survives', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const auto = createAutoMerge({
      workspace: WS,
      store,
      verifyCmdPresent: () => true,
      headSha: () => HEAD,
      lane: () => {
        throw new Error('boom');
      },
      subscribeQueueChanged: () => () => {}
    });

    expect(() => auto.scan()).not.toThrow();
  });
});
