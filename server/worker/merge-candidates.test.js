/**
 * The overlay the merge lane is judged from (UI-7agi §2) — and specifically
 * what it must NOT resurrect (UI-wwby §2).
 */
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  completionIntentSeed,
  mergeQueueCandidates,
  overlaidPrWait
} from './merge-candidates.js';
import { getWorkerRuntime } from './runtime.js';

const WS = '/tmp/example-workspace/merge-candidates';

/**
 * @param {'present'|'absent'|'invalid'} declaration_state
 */
function verifyPolicy(declaration_state) {
  return { declaration_state, base_sha: 'b'.repeat(40) };
}

/**
 * @param {{ pr_wait?: any[], queue?: any[], done?: any[] }} lanes
 */
function queueOf(lanes) {
  return {
    pr_wait: lanes.pr_wait || [],
    queue: lanes.queue || [],
    done: lanes.done || []
  };
}

/**
 * @param {string[]} bead_ids
 */
function registry(bead_ids) {
  getWorkerRuntime().externalPrs.replace(
    WS,
    bead_ids.map((bead_id, i) => ({
      bead_id,
      pr_url: `https://github.com/o/r/pull/${i + 1}`,
      pr_number: i + 1
    }))
  );
}

beforeEach(() => {
  getWorkerRuntime().externalPrs.clear();
});

afterEach(() => {
  getWorkerRuntime().externalPrs.clear();
});

describe('worker/merge-candidates — overlaidPrWait', () => {
  test('lays an external row over an empty lane', () => {
    registry(['UI-9']);

    expect(overlaidPrWait(WS, queueOf({}))).toEqual([
      { bead_id: 'UI-9', external: true }
    ]);
  });

  test('yields to the durable pr_wait entry for the same bead', () => {
    registry(['UI-1']);

    expect(
      overlaidPrWait(WS, queueOf({ pr_wait: [{ bead_id: 'UI-1' }] }))
    ).toEqual([{ bead_id: 'UI-1', external: false }]);
  });

  // UI-wwby §2 — the registry is replaced whole every poller tick, so it stays
  // stale for up to one period after a bead merges out of `pr_wait`. Without
  // this the stale row put a `done` bead back in front of the merge queue.
  test('yields to a bead already in done', () => {
    registry(['UI-1']);

    expect(
      overlaidPrWait(WS, queueOf({ done: [{ bead_id: 'UI-1' }] }))
    ).toEqual([]);
  });

  test('yields to a bead already in the waiting queue', () => {
    registry(['UI-1']);

    expect(
      overlaidPrWait(WS, queueOf({ queue: [{ bead_id: 'UI-1' }] }))
    ).toEqual([]);
  });

  test('keeps external rows that belong to no lane at all', () => {
    registry(['UI-1', 'UI-9']);

    expect(
      overlaidPrWait(WS, queueOf({ done: [{ bead_id: 'UI-1' }] }))
    ).toEqual([{ bead_id: 'UI-9', external: true }]);
  });

  test('emits a pr_wait entry even when another lane also holds it', () => {
    // A corrupted snapshot must still render its lane: the overlay widened its
    // YIELD set, not the rule for what `pr_wait` itself contributes.
    expect(
      overlaidPrWait(
        WS,
        queueOf({ pr_wait: [{ bead_id: 'UI-1' }], done: [{ bead_id: 'UI-1' }] })
      )
    ).toEqual([{ bead_id: 'UI-1', external: false }]);
  });
});

/** @type {Array<[string, 'empty'|'ok', null|'fail', string|null]>} */
describe('worker/merge-candidates — completion repair intake', () => {
  test('excludes a merged external row until cleanup has failed', () => {
    getWorkerRuntime().prObservations.record(WS, 'EXT-1', {
      pr: {
        number: 2,
        url: 'https://github.com/o/r/pull/2',
        state: 'MERGED',
        mergeable: 'UNKNOWN',
        merge_state_status: 'UNKNOWN',
        head_ref: 'EXT-1',
        head_sha: 'b'.repeat(40),
        base_ref: 'main',
        merged_sha: 'c'.repeat(40)
      }
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'EXT-1', external: true }],
        attempts: {},
        cleanup_failed: {}
      },
      verifyPolicy('absent')
    );

    expect(result).toEqual([]);
  });

  test('includes a merged external row after cleanup has failed', () => {
    getWorkerRuntime().prObservations.record(WS, 'EXT-1', {
      pr: {
        number: 2,
        url: 'https://github.com/o/r/pull/2',
        state: 'MERGED',
        mergeable: 'UNKNOWN',
        merge_state_status: 'UNKNOWN',
        head_ref: 'EXT-1',
        head_sha: 'b'.repeat(40),
        base_ref: 'main',
        merged_sha: 'c'.repeat(40)
      }
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'EXT-1', external: true }],
        attempts: {},
        cleanup_failed: {
          'EXT-1': { step: 'base_containment', reason: 'base_fetch_failed' }
        }
      },
      verifyPolicy('absent')
    );

    expect(result).toEqual([{ bead_id: 'EXT-1', external: true }]);
  });

  test('includes a worker-owned repairable verify failure', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main'
      },
      review_receipt: { state: 'current', head_sha: 'a'.repeat(40) }
    });
    runtime.prObservations.recordVerify(WS, 'UI-1', {
      effective_base_sha: 'b'.repeat(40),
      head_sha: 'a'.repeat(40),
      ok: false,
      reason: 'verify_cmd_failed',
      at: 1
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'UI-1' }],
        attempts: {},
        cleanup_failed: {}
      },
      verifyPolicy('present')
    );

    expect(result).toEqual([
      { bead_id: 'UI-1', external: false, repairable: true }
    ]);
  });

  test('does not auto-repair an external red row', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'EXT-1', {
      pr: {
        number: 2,
        url: 'https://github.com/o/r/pull/2',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'EXT-1',
        head_sha: 'b'.repeat(40),
        base_ref: 'main'
      },
      review_receipt: { state: 'current', head_sha: 'b'.repeat(40) }
    });
    runtime.prObservations.recordVerify(WS, 'EXT-1', {
      head_sha: 'b'.repeat(40),
      ok: false,
      reason: 'verify_cmd_failed',
      at: 1
    });

    expect(
      mergeQueueCandidates(
        WS,
        {
          pr_wait: [{ bead_id: 'EXT-1', external: true }],
          attempts: {},
          cleanup_failed: {}
        },
        verifyPolicy('present')
      )
    ).toEqual([]);
  });

  test('includes a worker-owned repairable post-merge verify failure', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'MERGED',
        mergeable: 'UNKNOWN',
        merge_state_status: 'UNKNOWN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main',
        merged_sha: 'c'.repeat(40)
      }
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'UI-1' }],
        attempts: {},
        cleanup_failed: {
          'UI-1': {
            step: 'post_merge_verify',
            reason: 'verify_cmd_failed'
          }
        }
      },
      verifyPolicy('present')
    );

    expect(result).toEqual([
      { bead_id: 'UI-1', external: false, repairable: true }
    ]);
  });

  test('excludes a clean row whose implementation review is stale', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main'
      },
      review_receipt: { state: 'stale', head_sha: 'a'.repeat(40) }
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'UI-1' }],
        attempts: {},
        cleanup_failed: {}
      },
      verifyPolicy('absent')
    );

    expect(result).toEqual([]);
  });

  test('excludes an old-base verify receipt after the repo-ops base advances', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main'
      },
      review_receipt: { state: 'current', head_sha: 'a'.repeat(40) }
    });
    runtime.prObservations.recordVerify(WS, 'UI-1', {
      effective_base_sha: 'b'.repeat(40),
      head_sha: 'a'.repeat(40),
      ok: true,
      reason: 'ok',
      at: 1
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'UI-1' }],
        attempts: {},
        cleanup_failed: {}
      },
      {
        declaration_state: 'present',
        base_sha: 'c'.repeat(40)
      }
    );

    expect(result).toEqual([]);
  });

  test('excludes a clean row when repo-ops policy is invalid', () => {
    getWorkerRuntime().prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main'
      },
      review_receipt: { state: 'current', head_sha: 'a'.repeat(40) }
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'UI-1' }],
        attempts: {},
        cleanup_failed: {}
      },
      verifyPolicy('invalid')
    );

    expect(result).toEqual([]);
  });

  test('includes a worker-owned verified Adapter regression', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'MERGED',
        mergeable: 'UNKNOWN',
        merge_state_status: 'UNKNOWN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main',
        merged_sha: 'c'.repeat(40)
      }
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'UI-1' }],
        attempts: {},
        cleanup_failed: {
          'UI-1': {
            step: 'deploy',
            reason: 'deploy_failed',
            failure_code: 'adapter_regression',
            retryable: false
          }
        }
      },
      verifyPolicy('present')
    );

    expect(result).toEqual([
      { bead_id: 'UI-1', external: false, repairable: true }
    ]);
  });

  test.each([
    'deploy_config_invalid',
    'deploy_missing_for_self',
    'deploy_not_detached_for_self',
    'deploy_verify_missing',
    'deploy_failed',
    'managed_pointer_escape'
  ])('marks %s as unified cleanup resolution evidence', (reason) => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'MERGED',
        mergeable: 'UNKNOWN',
        merge_state_status: 'UNKNOWN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main',
        merged_sha: 'c'.repeat(40)
      }
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'UI-1' }],
        attempts: {},
        cleanup_failed: { 'UI-1': { step: 'deploy', reason } }
      },
      verifyPolicy('present')
    );

    expect(result).toEqual([
      { bead_id: 'UI-1', external: false, repairable: true }
    ]);
  });

  test('seeds an already-merged root with its observed landed SHA', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'MERGED',
        mergeable: 'UNKNOWN',
        merge_state_status: 'UNKNOWN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main',
        merged_sha: 'c'.repeat(40)
      }
    });

    const result = completionIntentSeed(
      WS,
      {
        attempts: {
          att: {
            bead_id: 'UI-1',
            target_base: 'main',
            base_oid: 'b'.repeat(40)
          }
        }
      },
      'UI-1'
    );

    expect(result?.subject).toMatchObject({
      head_sha: 'a'.repeat(40),
      merged_sha: 'c'.repeat(40)
    });
  });

  test('returns the exact source attempt used for the pinned base', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main'
      }
    });

    const result = completionIntentSeed(
      WS,
      {
        attempts: {
          'attempt-older': {
            attempt_id: 'attempt-older',
            bead_id: 'UI-1',
            target_base: 'main',
            base_oid: 'b'.repeat(40)
          },
          'attempt-source': {
            attempt_id: 'attempt-source',
            bead_id: 'UI-1',
            target_base: 'release',
            base_oid: 'c'.repeat(40)
          }
        }
      },
      'UI-1'
    );

    expect(result).toMatchObject({
      source_attempt_id: 'attempt-source',
      target_base: 'release',
      subject: { base_sha: 'c'.repeat(40) }
    });
  });

  test('refuses to seed a merged root without an authoritative merge SHA', () => {
    const runtime = getWorkerRuntime();
    runtime.prObservations.record(WS, 'UI-1', {
      pr: {
        number: 1,
        url: 'https://github.com/o/r/pull/1',
        state: 'MERGED',
        mergeable: 'UNKNOWN',
        merge_state_status: 'UNKNOWN',
        head_ref: 'UI-1',
        head_sha: 'a'.repeat(40),
        base_ref: 'main',
        merged_sha: null
      }
    });

    const result = completionIntentSeed(
      WS,
      {
        attempts: {
          att: {
            bead_id: 'UI-1',
            target_base: 'main',
            base_oid: 'b'.repeat(40)
          }
        }
      },
      'UI-1'
    );

    expect(result).toBe(null);
  });
});
