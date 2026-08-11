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
const REPAIRABLE_RED_CASES = [
  ['local verify', 'empty', null, 'verify_cmd_failed'],
  ['CI', 'ok', 'fail', null]
];

describe('worker/merge-candidates — completion repair intake', () => {
  test.each(REPAIRABLE_RED_CASES)(
    'includes a worker-owned repairable %s red',
    (_name, ci_state, conclusion, verify_reason) => {
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
        ci: {
          state: ci_state,
          head_sha: 'a'.repeat(40),
          checks:
            ci_state === 'ok' ? [{ name: 'Build', conclusion: 'fail' }] : [],
          conclusion,
          reason: null
        }
      });
      if (verify_reason) {
        runtime.prObservations.recordVerify(WS, 'UI-1', {
          head_sha: 'a'.repeat(40),
          ok: false,
          reason: verify_reason,
          at: 1
        });
      }

      const result = mergeQueueCandidates(
        WS,
        {
          pr_wait: [{ bead_id: 'UI-1' }],
          attempts: {},
          cleanup_failed: {}
        },
        'resolved'
      );

      expect(result).toEqual([
        { bead_id: 'UI-1', external: false, repairable: true }
      ]);
    }
  );

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
      ci: {
        state: 'ok',
        head_sha: 'b'.repeat(40),
        checks: [{ name: 'Build', conclusion: 'fail' }],
        conclusion: 'fail',
        reason: null
      }
    });

    expect(
      mergeQueueCandidates(
        WS,
        {
          pr_wait: [{ bead_id: 'EXT-1', external: true }],
          attempts: {},
          cleanup_failed: {}
        },
        'resolved'
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
      },
      ci: null
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
      'resolved'
    );

    expect(result).toEqual([
      { bead_id: 'UI-1', external: false, repairable: true }
    ]);
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
      },
      ci: null
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
      'resolved'
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
  ])('does not mark %s as repair-owned cleanup evidence', (reason) => {
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
      },
      ci: null
    });

    const result = mergeQueueCandidates(
      WS,
      {
        pr_wait: [{ bead_id: 'UI-1' }],
        attempts: {},
        cleanup_failed: { 'UI-1': { step: 'deploy', reason } }
      },
      'resolved'
    );

    expect(result).toEqual([{ bead_id: 'UI-1', external: false }]);
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
      },
      ci: null
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
      },
      ci: null
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
