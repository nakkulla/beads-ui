/**
 * Cross-lane merge registration (UI-jaua §5.4).
 *
 * The lane's `▶ 진행` has to roll a member THROUGH merge in a repo whose
 * `auto_merge` is off, and it does that by registering the armed `pr_wait` row
 * as ordinary manual authority — the item-level authority the merge queue has
 * always honoured. These tests pin the registration and its provenance; the
 * merge gate itself is untouched and keeps its own suites.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createAutoMerge } from './auto-merge.js';
import { createMergeQueue } from './merge-queue.js';
import { createQueueStore } from './queue-store.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/lane-merge';
const HEAD = 'a'.repeat(40);
const LANE = 'cl_lane1';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-lane-merge-'));
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
 * Park a bead in the durable `pr_wait` lane the way the scheduler does, with
 * the dispatch-time cross-lane arm on its attempt so the transition plants it
 * on the row (§5.1).
 *
 * @param {any} store
 * @param {string} bead_id
 * @param {string|null} [armed_by_lane]
 */
function park(store, bead_id, armed_by_lane = LANE) {
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: {
      attempt_id: `att-${bead_id}`,
      bead_id,
      repo: WS,
      target_base: 'main',
      base_oid: 'b'.repeat(40),
      ...(armed_by_lane === null ? {} : { armed_by_lane })
    }
  });
  store.moveToPrWait(WS, {
    bead_id,
    attempt_id: `att-${bead_id}`,
    patch: { status: 'done', finished_at: 1 }
  });
  return store;
}

/**
 * The observing pass with its automatic half made inert, so a test reads the
 * armed registration rather than ordinary enrolment.
 *
 * @param {any} store
 * @param {{ heads?: Record<string, string|null>, notifyChanged?: any }} [input]
 */
function pass(store, input = {}) {
  const notifyChanged = input.notifyChanged || vi.fn();
  const kick = vi.fn(async () => {});
  /** @type {Array<(ws: string) => void>} */
  const listeners = [];
  const auto = createAutoMerge({
    workspace: WS,
    store,
    verifyState: () => ({
      declaration_state: /** @type {const} */ ('present'),
      base_sha: 'b'.repeat(40)
    }),
    headSha: (bead_id) =>
      input.heads && bead_id in input.heads ? input.heads[bead_id] : HEAD,
    baseRef: () => 'main',
    lane: () => [],
    candidates: () => [],
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
    kick,
    notifyChanged,
    emit: () => {
      for (const fn of [...listeners]) {
        fn(WS);
      }
    }
  };
}

/**
 * A merge-queue driver over the same store, wired only far enough to report
 * which authority it believes the item carries.
 *
 * @param {any} store
 * @param {any} deps
 */
function driver(store, deps) {
  return createMergeQueue({
    workspace: WS,
    store,
    merge: async () => ({ ok: true, action: 'merged', reason: null }),
    observePr: async () => ({ state: 'OPEN', error: null }),
    headSha: () => HEAD,
    now: () => 0,
    setTimer: () => 1,
    setResolutionPollTimer: () => 1,
    clearTimer: () => {},
    resolution_wait_ms: 100,
    unconfirmed_poll_ms: 10,
    unconfirmed_wait_ms: 100,
    ...deps
  });
}

describe('worker/auto-merge — 레인 머지 등록 (UI-jaua §5.4)', () => {
  test('registers an armed pr_wait row as manual authority with lane provenance', () => {
    const store = park(createQueueStore(), 'UI-1');
    const { auto } = pass(store);

    auto.scan();

    const queue = store.snapshot(WS);
    expect(queue.auto_merge).toBe(false);
    expect(queue.merge_queue).toHaveLength(1);
    expect(queue.merge_queue[0]).toMatchObject({
      bead_id: 'UI-1',
      authority: {
        source: 'manual',
        via: 'lane',
        requested_head_sha: HEAD,
        target_base: 'main'
      }
    });
  });

  test('wakes the sequential driver on a lane registration', () => {
    const store = park(createQueueStore(), 'UI-1');
    const { auto, kick, notifyChanged } = pass(store);

    auto.scan();

    expect(notifyChanged).toHaveBeenCalledWith(WS);
    expect(kick).toHaveBeenCalledTimes(1);
  });

  test('carries the registered authority into the driver while auto_merge is off', async () => {
    const store = park(createQueueStore(), 'UI-1');
    pass(store).auto.scan();
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
        head_sha: HEAD,
        base_ref: 'main',
        external: false
      }),
      dispatchConflict
    });

    await mq.kick();

    expect(store.snapshot(WS).auto_merge).toBe(false);
    expect(dispatchConflict.mock.calls[0][2]).toMatchObject({
      queue_bead_id: 'UI-1',
      manual_authority: true
    });
  });

  test('leaves an unarmed pr_wait row unregistered', () => {
    const store = park(createQueueStore(), 'UI-1', null);
    const { auto } = pass(store);

    auto.scan();

    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('registers nothing when the head cannot be read', () => {
    const store = park(createQueueStore(), 'UI-1');
    const { auto, kick } = pass(store, { heads: { 'UI-1': null } });

    auto.scan();

    const queue = store.snapshot(WS);
    expect(queue.merge_queue).toEqual([]);
    expect(kick).not.toHaveBeenCalled();
    // The row keeps its arm, so the next observation is the retry.
    expect(queue.pr_wait[0].armed_by_lane).toBe(LANE);
  });

  test('registers on the next observation once the head becomes readable', () => {
    const store = park(createQueueStore(), 'UI-1');
    /** @type {Record<string, string|null>} */
    const heads = { 'UI-1': null };
    const { auto } = pass(store, { heads });
    auto.scan();

    heads['UI-1'] = HEAD;
    auto.scan();

    expect(store.snapshot(WS).merge_queue[0]).toMatchObject({
      bead_id: 'UI-1',
      authority: { source: 'manual', via: 'lane' }
    });
  });

  test('promotes an automatic enrolment in place instead of adding a second entry', () => {
    const store = park(createQueueStore(), 'UI-1');
    store.enqueueMergeAuto(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha: HEAD, target_base: 'main' }],
      present_ids: ['UI-1']
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const automatic = store.snapshot(WS).merge_queue[0].authority;
    const { auto } = pass(store);

    auto.scan();

    const merge_queue = store.snapshot(WS).merge_queue;
    expect(merge_queue).toHaveLength(1);
    expect(merge_queue[0].authority).toMatchObject({
      source: 'manual',
      via: 'lane'
    });
    expect(merge_queue[0].authority.id).not.toEqual(automatic.id);
  });

  test('reuses an authority a click already granted', () => {
    const store = park(createQueueStore(), 'UI-1');
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [{ bead_id: 'UI-1', head_sha: HEAD, target_base: 'main' }]
    });
    const clicked = store.snapshot(WS).merge_queue[0].authority;
    const { auto } = pass(store);

    auto.scan();

    const merge_queue = store.snapshot(WS).merge_queue;
    expect(merge_queue).toHaveLength(1);
    expect(merge_queue[0].authority.id).toBe(clicked.id);
    expect(merge_queue[0].authority).not.toHaveProperty('via');
  });

  test('settles after its own fanout re-enters the scan', () => {
    const store = park(createQueueStore(), 'UI-1');
    /** @type {{ emit: () => void }} */
    const box = { emit: () => {} };
    const wired = pass(store, { notifyChanged: () => box.emit() });
    box.emit = wired.emit;
    wired.auto.start();

    wired.auto.scan();

    expect(store.snapshot(WS).merge_queue).toHaveLength(1);
    expect(wired.kick).toHaveBeenCalledTimes(1);
  });

  test('keeps a registered authority after a restart', () => {
    const store = park(createQueueStore(), 'UI-1');
    pass(store).auto.scan();

    const restarted = createQueueStore();
    pass(restarted).auto.scan();

    const merge_queue = restarted.snapshot(WS).merge_queue;
    expect(merge_queue).toHaveLength(1);
    expect(merge_queue[0].authority).toMatchObject({
      source: 'manual',
      via: 'lane'
    });
  });

  test('registers nothing for an armed row a restart disarmed', () => {
    park(createQueueStore(), 'UI-1');

    const restarted = createQueueStore();
    pass(restarted).auto.scan();

    const queue = restarted.snapshot(WS);
    expect(queue.merge_queue).toEqual([]);
    expect(queue.pr_wait[0]).not.toHaveProperty('armed_by_lane');
    expect(queue.disarmed_on_load).toEqual([LANE]);
  });
});
