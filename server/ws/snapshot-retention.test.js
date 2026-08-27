import { describe, expect, test } from 'vitest';
import {
  activeAttemptStates,
  activeBeadIds
} from '../../app/utils/active-attempts.js';
import { doneAtByBead } from './lane-membership.js';
import {
  REPO_OPERATIONS_RECENT,
  retainedBeadIds,
  trimQueueProjection
} from './snapshot-retention.js';

const DAY_MS = 86_400_000;

/** 2026-08-25 12:00 local — every fixture age is measured from here. */
const NOW = new Date(2026, 7, 25, 12, 0, 0).getTime();

/**
 * @param {string} attempt_id
 * @param {string} bead_id
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function attempt(attempt_id, bead_id, patch = {}) {
  return {
    attempt_id,
    bead_id,
    status: 'done',
    started_at: NOW - 40 * DAY_MS,
    finished_at: NOW - 30 * DAY_MS,
    ...patch
  };
}

/**
 * @param {Partial<Record<string, any>>} [patch]
 * @returns {Record<string, any>}
 */
function operation(patch = {}) {
  return {
    state: 'succeeded',
    requested_at: NOW - 100 * DAY_MS,
    subjects: [],
    failure: null,
    superseded_by: null,
    dismissed: null,
    repair: { attempt_id: null },
    ...patch
  };
}

/**
 * `REPO_OPERATIONS_RECENT` freshly requested operations, which fill the recent
 * window so the older fixtures below can only be retained by a reference rule.
 *
 * @returns {Record<string, any>}
 */
function recentFillerOperations() {
  /** @type {Record<string, any>} */
  const out = {};
  for (let i = 0; i < REPO_OPERATIONS_RECENT; i += 1) {
    out[`filler-${i}`] = operation({ requested_at: NOW - i * 1000 });
  }
  return out;
}

describe('trimQueueProjection done retention', () => {
  test('drops done rows older than seven days and keeps the exact boundary', () => {
    const raw = {
      done: [
        { bead_id: 'UI-old', added_at: NOW - 8 * DAY_MS },
        { bead_id: 'UI-edge', added_at: NOW - 7 * DAY_MS },
        { bead_id: 'UI-fresh', added_at: NOW - 1 * DAY_MS }
      ]
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed.done.map((entry) => entry.bead_id)).toEqual([
      'UI-edge',
      'UI-fresh'
    ]);
  });

  test('drops a done row whose added_at is not a number', () => {
    const raw = { done: [{ bead_id: 'UI-broken', added_at: null }] };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed.done).toEqual([]);
  });

  test('drops an added_at-less done row even when its bead is retained', () => {
    const raw = {
      queue: [{ bead_id: 'UI-in', added_at: NOW }],
      done: [{ bead_id: 'UI-in', added_at: null }]
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed.done).toEqual([]);
  });
});

describe('trimQueueProjection attempt retention', () => {
  test('keeps every attempt of a lane bead and none of an unlaned bead', () => {
    const raw = {
      queue: [{ bead_id: 'UI-in', added_at: NOW }],
      attempts: {
        a1: attempt('a1', 'UI-in'),
        a2: attempt('a2', 'UI-in', { finished_at: NOW - 40 * DAY_MS }),
        b1: attempt('b1', 'UI-out')
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(Object.keys(trimmed.attempts).sort()).toEqual(['a1', 'a2']);
  });

  test('keeps a bead whose serial lane still holds it', () => {
    const raw = {
      serial_lanes: [{ id: 's1', entries: [{ bead_id: 'UI-serial' }] }],
      attempts: { a1: attempt('a1', 'UI-serial') }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(Object.keys(trimmed.attempts)).toEqual(['a1']);
  });

  test('drops a failure an old done row already resolved and keeps an unhandled one', () => {
    const raw = {
      done: [{ bead_id: 'UI-resolved', added_at: NOW - 30 * DAY_MS }],
      attempts: {
        r1: attempt('r1', 'UI-resolved', {
          status: 'failed',
          finished_at: NOW - 31 * DAY_MS
        }),
        u1: attempt('u1', 'UI-unhandled', {
          status: 'failed',
          finished_at: NOW - 31 * DAY_MS
        })
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(Object.keys(trimmed.attempts)).toEqual(['u1']);
    expect(trimmed.done).toEqual([]);
  });

  test('keeps the old done evidence of a re-queued bead so its failure is not resurrected', () => {
    const raw = {
      queue: [{ bead_id: 'UI-again', added_at: NOW }],
      done: [{ bead_id: 'UI-again', added_at: NOW - 30 * DAY_MS }],
      attempts: {
        f1: attempt('f1', 'UI-again', {
          status: 'failed',
          finished_at: NOW - 31 * DAY_MS
        })
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);
    const winners = activeAttemptStates(
      trimmed.attempts,
      doneAtByBead(trimmed)
    ).winners;

    expect(trimmed.done.map((entry) => entry.bead_id)).toEqual(['UI-again']);
    expect(winners.has('UI-again')).toBe(false);
    expect([...winners.keys()]).toEqual([
      ...activeBeadIds(raw.attempts, doneAtByBead(raw))
    ]);
  });

  test('keeps a resumed chain whole while the bead is running', () => {
    const raw = {
      attempts: {
        p1: attempt('p1', 'UI-chain', { status: 'paused' }),
        r1: attempt('r1', 'UI-chain', {
          status: 'running',
          finished_at: null,
          resumed_from: 'p1'
        })
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(Object.keys(trimmed.attempts).sort()).toEqual(['p1', 'r1']);
  });

  test('drops a resumed chain whole once the bead left every lane', () => {
    const raw = {
      attempts: {
        p1: attempt('p1', 'UI-chain', { status: 'paused' }),
        d1: attempt('d1', 'UI-chain', { resumed_from: 'p1' })
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed.attempts).toEqual({});
  });

  test('lets a resumed paused record follow its successor out of the wire', () => {
    const raw = {
      attempts: {
        p1: attempt('p1', 'UI-chain', {
          status: 'paused',
          finished_at: NOW - 5 * DAY_MS
        }),
        // The successor is what decides the bead's fate: discarded, with no
        // timestamp of its own, so nothing keeps the chain.
        x1: attempt('x1', 'UI-chain', {
          status: 'discarded',
          finished_at: null,
          resumed_from: 'p1'
        })
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed.attempts).toEqual({});
  });

  test('keeps a discarded attempt inside the seven-day window', () => {
    const raw = {
      attempts: {
        d1: attempt('d1', 'UI-discarded', {
          status: 'discarded',
          finished_at: NOW - 2 * DAY_MS
        })
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(Object.keys(trimmed.attempts)).toEqual(['d1']);
  });
});

describe('trimQueueProjection field slimming', () => {
  const INTERNAL = {
    verify_result: { ok: true },
    verify_cmd_result: { ok: true },
    receipt_check: { checked_at: 1 },
    receipt_baseline: { route: null },
    base_drift: { pinned: 'a' },
    process_identity: { pid: 1, pgid: 1, started_at: 1 },
    guard_warnings: ['w'],
    exec_stamped_keys: ['route'],
    exec_restore_values: { route: null },
    continuation_action: { mismatch: {}, continuation: null }
  };
  const KEPT = {
    usage_legs: [{ receipt_id: 'r1' }],
    delegation_sessions: [{ launch_id: 'l1' }],
    exec_values: { route: 'spec_backed' },
    cause_detail: { reason: 'loud_fail_blocker', command: null }
  };

  test('removes the internal-only fields from a terminal attempt', () => {
    const raw = {
      queue: [{ bead_id: 'UI-1', added_at: NOW }],
      attempts: { a1: attempt('a1', 'UI-1', { ...INTERNAL, ...KEPT }) }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    for (const field of Object.keys(INTERNAL)) {
      expect(trimmed.attempts.a1).not.toHaveProperty(field);
    }
  });

  test('keeps the usage and cause detail of a terminal attempt', () => {
    const raw = {
      queue: [{ bead_id: 'UI-1', added_at: NOW }],
      attempts: { a1: attempt('a1', 'UI-1', { ...INTERNAL, ...KEPT }) }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed.attempts.a1).toMatchObject(KEPT);
  });

  test('leaves a running attempt untouched', () => {
    const source = attempt('a1', 'UI-1', {
      status: 'running',
      finished_at: null,
      ...INTERNAL,
      ...KEPT
    });
    const raw = { attempts: { a1: source } };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed.attempts.a1).toEqual(source);
  });
});

describe('trimQueueProjection repo operations', () => {
  test('keeps the recent window, the unresolved rows, and the referenced ones', () => {
    const raw = {
      queue: [{ bead_id: 'UI-lane', added_at: NOW }],
      attempts: {},
      repo_operations: {
        ...recentFillerOperations(),
        'op-succeeded': operation(),
        'op-failed': operation({
          state: 'failed',
          failure: { code: 'verify_nonzero' }
        }),
        'op-dismissed': operation({
          state: 'failed',
          failure: { code: 'verify_nonzero' },
          dismissed: { at: NOW, by: 'human' }
        }),
        'op-subject': operation({
          subjects: [{ bead_id: 'UI-lane', merged_sha: 'a' }],
          superseded_by: 'op-successor'
        }),
        'op-successor': operation()
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(Object.keys(trimmed.repo_operations).sort()).toEqual(
      [
        ...Object.keys(recentFillerOperations()),
        'op-failed',
        'op-subject',
        'op-successor'
      ].sort()
    );
  });

  test('keeps a failed operation log path on the wire until it is dismissed', () => {
    const log_path = '/state/repo-operation-logs/op-red.log';
    const failed = {
      'op-red': operation({
        state: 'failed',
        failure: { code: 'verify_nonzero' },
        log_path
      })
    };
    const raw = {
      attempts: {},
      repo_operations: { ...recentFillerOperations(), ...failed }
    };
    const dismissed_raw = {
      attempts: {},
      repo_operations: {
        ...recentFillerOperations(),
        'op-red': { ...failed['op-red'], dismissed: { at: NOW, by: 'human' } }
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);
    const after_dismiss = trimQueueProjection(
      dismissed_raw,
      dismissed_raw,
      NOW
    );

    // The hand-off the completion terminal points a human at is this path, and
    // nothing rewrites or prunes the file itself — dropping the record from the
    // wire is the ONLY retention effect, and it waits for the dismissal.
    expect(trimmed.repo_operations['op-red'].log_path).toBe(log_path);
    expect(after_dismiss.repo_operations).not.toHaveProperty('op-red');
  });

  test('keeps an operation a cleanup_failed bead is the subject of', () => {
    const raw = {
      cleanup_failed: { 'UI-stuck': { step: 'branch_cleanup' } },
      repo_operations: {
        ...recentFillerOperations(),
        'op-cleanup': operation({
          subjects: [{ bead_id: 'UI-stuck', merged_sha: 'a' }]
        })
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed.repo_operations).toHaveProperty('op-cleanup');
  });

  test('follows the reference chain to its fixed point across two rounds', () => {
    const raw = {
      queue: [{ bead_id: 'UI-lane', added_at: NOW }],
      attempts: {
        a1: attempt('a1', 'UI-lane'),
        a2: attempt('a2', 'UI-second'),
        a3: attempt('a3', 'UI-third')
      },
      repo_operations: {
        ...recentFillerOperations(),
        // Retained because UI-lane is already in R; its repair attempt is what
        // pulls the second bead in.
        'op-1': operation({
          subjects: [
            { bead_id: 'UI-lane', merged_sha: 'a' },
            { bead_id: 'UI-second', merged_sha: 'b' }
          ],
          repair: { attempt_id: 'a2' }
        }),
        // Only reachable once UI-second is retained, through that bead being a
        // subject; its own repair attempt then adds the third bead.
        'op-2': operation({
          subjects: [{ bead_id: 'UI-second', merged_sha: 'b' }],
          repair: { attempt_id: 'a3' }
        })
      }
    };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(Object.keys(trimmed.attempts).sort()).toEqual(['a1', 'a2', 'a3']);
    expect(Object.keys(trimmed.repo_operations)).toEqual(
      expect.arrayContaining(['op-1', 'op-2'])
    );
  });
});

describe('retainedBeadIds', () => {
  test('retains the bead of a completion coordinator active attempt', () => {
    const raw = {
      attempts: { a1: attempt('a1', 'UI-completing') },
      completion_intents: {
        'UI-root': {
          phase: 'running',
          active_op: { attempt_id: 'a1' }
        }
      }
    };

    expect(retainedBeadIds(raw, NOW).has('UI-completing')).toBe(true);
  });

  test('retains the bead named by the projected completion status', () => {
    const raw = {
      attempts: { a1: attempt('a1', 'UI-completing') },
      completion_status: { 'UI-root': { active_attempt_id: 'a1' } }
    };

    expect(retainedBeadIds(raw, NOW).has('UI-completing')).toBe(true);
  });

  test('retains the beads of the pr_wait and merge_queue lanes', () => {
    const raw = {
      pr_wait: [{ bead_id: 'UI-pr', added_at: NOW }],
      merge_queue: [{ bead_id: 'UI-merge', resolution_rounds: 0 }]
    };

    const ids = retainedBeadIds(raw, NOW);

    expect([...ids].sort()).toEqual(['UI-merge', 'UI-pr']);
  });
});

describe('trimQueueProjection boundaries', () => {
  test('returns empty collections for a snapshot with no keys', () => {
    const trimmed = trimQueueProjection({}, {}, NOW);

    expect(trimmed).toEqual({ done: [], attempts: {}, repo_operations: {} });
  });

  test('treats non-object collections as empty', () => {
    const raw = { done: 'nope', attempts: null, repo_operations: 7 };

    const trimmed = trimQueueProjection(raw, raw, NOW);

    expect(trimmed).toEqual({ done: [], attempts: {}, repo_operations: {} });
  });

  test('leaves the input snapshot untouched', () => {
    const raw = {
      revision: 4,
      queue: [{ bead_id: 'UI-1', added_at: NOW }],
      done: [{ bead_id: 'UI-old', added_at: NOW - 30 * DAY_MS }],
      attempts: { a1: attempt('a1', 'UI-1', { verify_result: { ok: true } }) },
      completion_status: { 'UI-1': { active_attempt_id: null } },
      cleanup_failed: { 'UI-1': { step: 'branch_cleanup' } },
      repo_operations: { 'op-1': operation() }
    };
    const before = structuredClone(raw);

    trimQueueProjection(raw, raw, NOW);

    expect(raw).toEqual(before);
  });
});
