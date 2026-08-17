import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createAutoMerge } from './auto-merge.js';
import { createQueueStore } from './queue-store.js';
import { getWorkerRuntime } from './runtime.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/auto-merge';
const HEAD = 'a'.repeat(40);

/**
 * @param {'present'|'absent'|'invalid'} declaration_state
 */
function verifyPolicy(declaration_state) {
  return { declaration_state, base_sha: 'b'.repeat(40) };
}

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
      attempt: {
        attempt_id: `att-${bead_id}`,
        bead_id,
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
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
 * @param {{ eligible?: string[], lane?: string[], heads?: Record<string, string|null>, bases?: Record<string, string|null>, subscribe?: any }} [input]
 */
function enroller(store, input = {}) {
  const notifyChanged = vi.fn();
  const kick = vi.fn(async () => {});
  /** @type {Array<(ws: string) => void>} */
  const listeners = [];
  const auto = createAutoMerge({
    workspace: WS,
    store,
    verifyState: () => verifyPolicy('present'),
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
    baseRef: (bead_id) =>
      input.bases && bead_id in input.bases ? input.bases[bead_id] : 'main',
    completionSeed: (_workspace, _queue, bead_id) => ({
      source_attempt_id: `att-${bead_id}`,
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id,
        pr_url: `https://github.com/o/r/pull/${bead_id}`,
        head_sha: HEAD,
        base_sha: 'b'.repeat(40),
        merged_sha: null
      }
    }),
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

  test('records an automatic authority from the observed head and base', () => {
    const store = park(createQueueStore(), ['UI-1']);
    const { auto } = enroller(store);

    auto.enroll();

    // `source=automatic` is a durable contract (UI-58w8 §1), so the enroller
    // must supply the observed base alongside the head — an entry missing
    // either identity is enrolled with no authority at all.
    expect(store.snapshot(WS).merge_queue[0].authority).toMatchObject({
      source: 'automatic',
      requested_head_sha: HEAD,
      target_base: 'main'
    });
  });

  test('enrolls without an authority when the observed base is unreadable', () => {
    const store = park(createQueueStore(), ['UI-1']);
    const { auto } = enroller(store, { bases: { 'UI-1': null } });

    auto.enroll();

    expect(store.snapshot(WS).merge_queue[0].authority).toBeUndefined();
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

  test('passes an unreadable verify declaration as invalid', () => {
    const store = park(createQueueStore(), ['UI-1']);
    /** @type {{ declaration_state: string, base_sha: string|null }|null} */
    let observed_state = null;
    const auto = createAutoMerge({
      workspace: WS,
      store,
      verifyState: () => {
        throw new Error('unreadable');
      },
      headSha: () => HEAD,
      lane: () => [{ bead_id: 'UI-1', external: false }],
      candidates: (_workspace, _queue, verify_state) => {
        observed_state = verify_state;
        return [];
      },
      notifyChanged: vi.fn(),
      kick: vi.fn(async () => {})
    });

    const result = auto.enroll();

    expect(result.queued).toBe(0);
    expect(observed_state).toEqual({
      declaration_state: 'invalid',
      base_sha: null
    });
  });

  test('does not enroll an old-base verify receipt', () => {
    const store = park(createQueueStore(), ['UI-1']);
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-1',
        head_sha: HEAD,
        base_ref: 'main'
      },
      review_receipt: { state: 'current', head_sha: HEAD }
    });
    runtime.prObservations.recordVerify(WS, 'UI-1', {
      effective_base_sha: 'b'.repeat(40),
      head_sha: HEAD,
      ok: true,
      reason: 'ok',
      at: 1
    });
    const auto = createAutoMerge({
      workspace: WS,
      store,
      verifyState: () => ({
        declaration_state: 'present',
        base_sha: 'c'.repeat(40)
      }),
      headSha: () => HEAD,
      notifyChanged: vi.fn(),
      kick: vi.fn(async () => {})
    });

    const result = auto.enroll();

    expect(result.queued).toBe(0);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('does not enroll a clean row when repo-ops policy is invalid', () => {
    const store = park(createQueueStore(), ['UI-1']);
    getWorkerRuntime().prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-1',
        head_sha: HEAD,
        base_ref: 'main'
      },
      review_receipt: { state: 'current', head_sha: HEAD }
    });
    const auto = createAutoMerge({
      workspace: WS,
      store,
      verifyState: () => verifyPolicy('invalid'),
      headSha: () => HEAD,
      notifyChanged: vi.fn(),
      kick: vi.fn(async () => {})
    });

    const result = auto.enroll();

    expect(result.queued).toBe(0);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('atomically creates a root completion intent for repairable red', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.updateAttempt(WS, {
      attempt_id: 'att-UI-1',
      patch: {
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const auto = createAutoMerge({
      workspace: WS,
      store,
      verifyState: () => verifyPolicy('present'),
      headSha: () => HEAD,
      lane: () => [{ bead_id: 'UI-1', external: false }],
      candidates: () => [
        { bead_id: 'UI-1', external: false, repairable: true }
      ],
      completionSeed: () => ({
        source_attempt_id: 'att-UI-1',
        target_base: 'main',
        subject: {
          role: 'root',
          bead_id: 'UI-1',
          pr_url: 'https://github.com/o/r/pull/1',
          head_sha: HEAD,
          base_sha: 'b'.repeat(40),
          merged_sha: null
        }
      })
    });
    const before = store.snapshot(WS).revision;

    const result = auto.enroll();

    const queue = store.snapshot(WS);
    expect(result.applied).toBe(true);
    expect(queue.revision).toBe(before + 1);
    expect(queue.merge_queue).toEqual([
      {
        bead_id: 'UI-1',
        resolution_rounds: 0,
        resolution: null,
        authority: {
          id: expect.any(String),
          source: 'automatic',
          granted_at: expect.any(Number),
          requested_head_sha: HEAD,
          target_base: 'main'
        },
        head_review: null
      }
    ]);
    expect(queue.completion_intents['UI-1']).toMatchObject({
      target_base: 'main',
      phase: 'gating',
      subject: { role: 'root', bead_id: 'UI-1', head_sha: HEAD }
    });
  });

  test('anchors auto completion intake to the exact source attempt', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.updateAttempt(WS, {
      attempt_id: 'att-UI-1',
      patch: {
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const auto = createAutoMerge({
      workspace: WS,
      store,
      verifyState: () => verifyPolicy('present'),
      headSha: () => HEAD,
      lane: () => [{ bead_id: 'UI-1', external: false }],
      candidates: () => [
        { bead_id: 'UI-1', external: false, repairable: true }
      ],
      completionSeed: () => ({
        source_attempt_id: 'att-UI-1',
        target_base: 'main',
        subject: {
          role: 'root',
          bead_id: 'UI-1',
          pr_url: 'https://github.com/o/r/pull/1',
          head_sha: HEAD,
          base_sha: 'b'.repeat(40),
          merged_sha: null
        }
      })
    });

    const result = auto.enroll();

    expect(result.applied).toBe(true);
    expect(store.snapshot(WS).attempts['att-UI-1']).toMatchObject({
      completion_root_id: 'UI-1',
      completion_op_id: null
    });
    expect(store.snapshot(WS).completion_intents['UI-1']).not.toHaveProperty(
      'source_attempt_id'
    );
  });

  test('rejects auto completion intake when its source attempt belongs elsewhere', () => {
    const store = park(createQueueStore(), ['UI-1']);
    store.updateAttempt(WS, {
      attempt_id: 'att-UI-1',
      patch: {
        repo: '/repo',
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.toggleAutoMerge(WS, {
      expected_revision: store.snapshot(WS).revision,
      on: true
    });
    const auto = createAutoMerge({
      workspace: WS,
      store,
      verifyState: () => verifyPolicy('present'),
      headSha: () => HEAD,
      lane: () => [{ bead_id: 'UI-1', external: false }],
      candidates: () => [
        { bead_id: 'UI-1', external: false, repairable: true }
      ],
      completionSeed: () => ({
        source_attempt_id: 'foreign-attempt',
        target_base: 'main',
        subject: {
          role: 'root',
          bead_id: 'UI-1',
          pr_url: 'https://github.com/o/r/pull/1',
          head_sha: HEAD,
          base_sha: 'b'.repeat(40),
          merged_sha: null
        }
      })
    });

    const result = auto.enroll();
    const queue = store.snapshot(WS);

    expect(result.applied).toBe(false);
    expect(queue.completion_intents).toEqual({});
    expect(queue.merge_queue).toEqual([]);
    expect(queue.attempts['att-UI-1'].completion_root_id).toBe(null);
  });

  test.each(['green', 'conflict'])(
    'atomically creates a root completion intent for worker-owned %s',
    (kind) => {
      const store = park(createQueueStore(), ['UI-1']);
      store.toggleAutoMerge(WS, {
        expected_revision: store.snapshot(WS).revision,
        on: true
      });
      const auto = createAutoMerge({
        workspace: WS,
        store,
        verifyState: () => verifyPolicy('present'),
        headSha: () => HEAD,
        lane: () => [{ bead_id: 'UI-1', external: false }],
        candidates: () => [{ bead_id: 'UI-1', external: false, kind }],
        completionSeed: () => ({
          source_attempt_id: 'att-UI-1',
          target_base: 'main',
          subject: {
            role: 'root',
            bead_id: 'UI-1',
            pr_url: 'https://github.com/o/r/pull/1',
            head_sha: HEAD,
            base_sha: 'b'.repeat(40),
            merged_sha: null
          }
        })
      });

      const result = auto.enroll();

      expect(result.applied).toBe(true);
      expect(store.snapshot(WS).completion_intents['UI-1']).toMatchObject({
        phase: 'gating',
        subject: { bead_id: 'UI-1', head_sha: HEAD }
      });
    }
  );
});

describe('worker/auto-merge — 워커 소유 Bead 비후보 (UI-b8n8 §접근 A)', () => {
  /**
   * The enroller wired to the REAL lane + candidate judgment, which reads the
   * process-wide external registry — the surface the exclusion acts on.
   *
   * @param {any} store
   */
  function realEnroller(store) {
    return createAutoMerge({
      workspace: WS,
      store,
      verifyState: () => verifyPolicy('absent'),
      headSha: () => HEAD,
      notifyChanged: vi.fn(),
      kick: vi.fn(async () => {})
    });
  }

  test('takes no candidate for a bead the external scan excluded', () => {
    const runtime = getWorkerRuntime();
    runtime.externalPrs.clear();
    // What §접근 A produces: a running bead is simply absent from the registry,
    // and the merge lane has no other way to learn about it.
    runtime.externalPrs.replace(WS, []);
    const store = createQueueStore();

    const r = realEnroller(store).enroll();

    expect(r.queued).toBe(0);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('skips a merged external row without a cleanup failure record (UI-exua)', () => {
    const runtime = getWorkerRuntime();
    runtime.externalPrs.clear();
    runtime.externalPrs.replace(WS, [
      { bead_id: 'X1', pr_url: 'https://github.com/o/r/pull/9', pr_number: 9 }
    ]);
    runtime.prObservations.record(WS, 'X1', {
      pr: {
        number: 9,
        url: 'https://github.com/o/r/pull/9',
        state: 'MERGED',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'X1',
        base_ref: 'main',
        head_sha: HEAD
      }
    });
    const store = createQueueStore();

    const r = realEnroller(store).enroll();

    // UI-exua: merged external rows without cleanup_failed converge through the
    // automatic cleanup path, so bulk enrollment no longer takes them.
    expect(store.snapshot(WS).merge_queue).toEqual([]);
    expect(r.queued).toBe(0);
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
      verifyState: () => verifyPolicy('present'),
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
      completionSeed: (_workspace, _queue, bead_id) => ({
        source_attempt_id: `att-${bead_id}`,
        target_base: 'main',
        subject: {
          role: 'root',
          bead_id,
          pr_url: `https://github.com/o/r/pull/${bead_id}`,
          head_sha: HEAD,
          base_sha: 'b'.repeat(40),
          merged_sha: null
        }
      }),
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
      verifyState: () => verifyPolicy('present'),
      headSha: () => HEAD,
      lane: () => {
        throw new Error('boom');
      },
      subscribeQueueChanged: () => () => {}
    });

    expect(() => auto.scan()).not.toThrow();
  });
});
