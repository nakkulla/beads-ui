import { afterEach, describe, expect, test, vi } from 'vitest';
import { createActivityStore } from './activity-store.js';
import { evaluateMergeGate, observedReviewReceiptState } from './merge-gate.js';
import { createPrObservationStore } from './pr-observations.js';
import { createPrPoller, resolvePrRef } from './pr-poller.js';
import { __resetQueueEventsForTest } from './queue-events.js';
import {
  __resetRepoOpsDisplayForTest,
  recordRepoOpsDisplay,
  refreshRepoOpsDisplay,
  repoOpsDisplayFor,
  repoOpsVerifyPolicy,
  repoOpsVerifyReceiptState
} from './repo-ops-display.js';

const SHA = 'a'.repeat(40);
const NEW_SHA = 'c'.repeat(40);
const BASE_SHA = 'b'.repeat(40);
const PR_URL = 'https://github.com/o/r/pull/304';

afterEach(() => {
  __resetQueueEventsForTest();
  __resetRepoOpsDisplayForTest();
});

/**
 * @param {Partial<import('./gh.js').PrDetail>} [pr]
 * @returns {import('./gh.js').PrDetail}
 */
function detailOf(pr = {}) {
  return {
    number: 304,
    url: PR_URL,
    state: 'OPEN',
    mergeable: 'MERGEABLE',
    merge_state_status: 'CLEAN',
    head_ref: 'UI-1',
    base_ref: 'main',
    head_sha: SHA,
    ...pr
  };
}

/**
 * A queue snapshot with one bead in `pr_wait` whose attempt records the PR.
 *
 * @param {{ pr_wait?: string[], pr_number?: number|null, pr_url?: string, discard_operations?: Record<string, any> }} [input]
 */
function queueOf(input = {}) {
  const ids = input.pr_wait ?? ['UI-1'];
  /** @type {Record<string, any>} */
  const attempts = {};
  for (const id of ids) {
    attempts[`att-${id}`] = {
      attempt_id: `att-${id}`,
      bead_id: id,
      status: 'done',
      finished_at: 100,
      verify_result: {
        ok: true,
        reason: 'ok',
        pr_url: input.pr_url ?? PR_URL,
        pr_number: input.pr_number === undefined ? 304 : input.pr_number
      }
    };
  }
  return {
    revision: 1,
    auto_advance: false,
    exec_defaults: {},
    slots: 2,
    queue: [],
    pr_wait: ids.map((bead_id) => ({ bead_id, added_at: 1 })),
    done: [],
    attempts,
    admission: {},
    discard_operations: input.discard_operations ?? {},
    cleanup_failed: {}
  };
}

/**
 * @param {{ verify_script_path?: string|null, receipt?: any }} [input]
 */
function repoOperations(input = {}) {
  const receipt = {
    state: 'succeeded',
    head_sha: SHA,
    ok: true,
    reason: 'ok',
    effective_base_sha: BASE_SHA,
    candidate_tree_sha: 'd'.repeat(40),
    script_object_type: 'blob',
    script_mode: '100755',
    script_blob_sha: 'e'.repeat(40)
  };
  return {
    hasConfig: vi.fn(async () => ({
      ok: true,
      present: true,
      verify_script_path:
        input.verify_script_path === undefined
          ? 'repo-ops/script/verify'
          : input.verify_script_path
    })),
    ensureVerify: vi.fn(async (/** @type {any} */ input) => {
      void input;
      return {
        ok: true,
        operation_id: 'verify-op',
        timeout_ms: 1000
      };
    }),
    waitForTerminal: vi.fn(async () => input.receipt ?? receipt),
    verifyReceipt: vi.fn(() => input.receipt ?? receipt)
  };
}

/**
 * @param {{
 *   queue?: any,
 *   detail?: any,
 *   subscribers?: number,
 *   observations?: any,
 *   activity?: any,
 *   readIssue?: any,
 *   gitRun?: (args: string[], options: { cwd?: string }) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   resolveBase?: any,
 *   repoOperations?: any,
 *   onMerged?: any,
 *   onDeployment?: any,
 *   onDiscardObservation?: any,
 *   external?: any
 * }} [input]
 */
function makePoller(input = {}) {
  const queue = input.queue ?? queueOf();
  const prDetail = vi.fn(async () =>
    typeof input.detail === 'function'
      ? input.detail()
      : (input.detail ?? { state: 'ok', data: detailOf() })
  );
  const observations = input.observations ?? createPrObservationStore();
  const activity = input.activity ?? createActivityStore();
  const notifyChanged = vi.fn();
  const store = {
    snapshot: () => queue,
    reconcileExternalPrWait: vi.fn(() => ({ ok: true })),
    promoteMergedExternal: vi.fn((_workspace, values) => {
      if (
        queue.pr_wait.some(
          (/** @type {any} */ entry) => entry.bead_id === values.bead_id
        )
      ) {
        return { ok: false };
      }
      queue.pr_wait.push({
        bead_id: values.bead_id,
        added_at: 1,
        merge_sha: values.merge_sha,
        head_ref: values.head_ref,
        pr_url: values.pr_url
      });
      return { ok: true };
    }),
    recordCleanupFailure: vi.fn((_workspace, values) => {
      queue.cleanup_failed[values.bead_id] = values;
      return { ok: true };
    })
  };
  const gitRun = input.gitRun ?? null;
  const poller = createPrPoller({
    workspace: '/ws',
    repo: '/repo',
    store,
    gh: { prDetail },
    observations,
    readIssue:
      input.readIssue ?? (async () => ({ metadata: { route: 'quick_fix' } })),
    ...(gitRun ? { gitRun } : {}),
    activity,
    getSubscriberCount: () => input.subscribers ?? 1,
    resolveBase:
      input.resolveBase ??
      (async () => ({ ok: true, base: 'main', base_oid: BASE_SHA })),
    repoOperations: input.repoOperations,
    onMerged: input.onMerged,
    onDiscardObservation: input.onDiscardObservation,
    external: input.external,
    notifyChanged,
    intervalSeconds: 0,
    sleep: async () => {},
    now: () => 5000
  });
  return { poller, prDetail, observations, activity, notifyChanged, store };
}

/**
 * An external registry stub: the rows a bd scan would have produced.
 *
 * @param {Array<{ bead_id: string, pr_url?: string, pr_number?: number|null }>} rows
 */
function externalOf(rows) {
  const refresh = vi.fn(async () => {});
  return {
    refresh,
    list: () =>
      rows.map((r, i) => ({
        bead_id: r.bead_id,
        pr_url: r.pr_url ?? PR_URL,
        pr_number: r.pr_number === undefined ? 304 : r.pr_number,
        added_at: i + 1
      }))
  };
}

/**
 * Yield until `read` reports something, bounded so a real regression still
 * fails instead of hanging. Counting individual microtasks would re-break
 * every time an awaited step is added to the observation path.
 *
 * @param {() => unknown} read
 */
async function settle(read) {
  for (let i = 0; i < 50 && !read(); i += 1) {
    await Promise.resolve();
  }
  return read();
}

describe('worker/pr-poller — gating (worker-phase2 §4)', () => {
  test('makes no gh call without subscribers', async () => {
    const { poller, prDetail } = makePoller({ subscribers: 0 });

    await poller.tick();

    expect(prDetail).not.toHaveBeenCalled();
  });

  test('observes with no subscriber at all while auto_merge is ON', async () => {
    const { poller, prDetail } = makePoller({
      subscribers: 0,
      queue: { ...queueOf(), auto_merge: true }
    });

    await poller.tick();

    // 자동 머지는 브라우저 탭에 묶여서는 안 된다 (UI-yk55 §4.4): 탭이 닫히면
    // 관측이 멎고, 편입할 것이 영원히 생기지 않는다.
    expect(prDetail).toHaveBeenCalled();
  });

  /**
   * A spec-backed issue whose `impl_review` sits on some other sha, so the
   * poller must consult the ancestry probe to classify it (UI-vzyh §2).
   */
  const movedReceiptIssue = async () => ({
    spec_id: 'docs/spec.md',
    metadata: {
      route: 'spec_backed',
      spec_review: `codex@${SHA}`,
      impl_review: `self@${NEW_SHA}`
    }
  });

  test('records a non-ancestor implementation review as stale', async () => {
    const { poller, observations } = makePoller({
      readIssue: movedReceiptIssue,
      gitRun: async (/** @type {string[]} */ args) => ({
        code: args[0] === 'merge-base' ? 1 : 0,
        stdout: '',
        stderr: ''
      })
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.review_receipt).toEqual({
      state: 'stale',
      head_sha: SHA
    });
  });

  test('records a receipt the observed head descends from as current', async () => {
    const { poller, observations } = makePoller({
      readIssue: movedReceiptIssue,
      gitRun: async () => ({ code: 0, stdout: '', stderr: '' })
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.review_receipt).toEqual({
      state: 'current',
      head_sha: SHA
    });
  });

  test('records a receipt as stale when no git runner is wired', async () => {
    const { poller, observations } = makePoller({
      readIssue: movedReceiptIssue
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.review_receipt).toEqual({
      state: 'stale',
      head_sha: SHA
    });
  });

  test('records an unreadable review source as invalid', async () => {
    const { poller, observations } = makePoller({
      readIssue: async () => {
        throw new Error('bd unavailable');
      }
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.review_receipt?.state).toBe(
      'invalid'
    );
  });

  test('keeps the old silence when the toggle is OFF and nobody is watching', async () => {
    const { poller, prDetail } = makePoller({
      subscribers: 0,
      queue: { ...queueOf(), auto_merge: false }
    });

    await poller.tick();

    expect(prDetail).not.toHaveBeenCalled();
  });

  test('observes for a WAITING merge queue with the toggle off (UI-wwby §3)', async () => {
    const { poller, prDetail } = makePoller({
      subscribers: 0,
      queue: {
        ...queueOf({ pr_wait: ['UI-9'] }),
        auto_merge: false,
        merge_queue: [{ bead_id: 'UI-9', resolution_rounds: 0 }]
      }
    });

    await poller.tick();

    // A manual [머지] click fills the queue with the toggle OFF, and the driver
    // halts on an unreadable head until an observation arrives. Gating on the
    // toggle alone leaves that halt waiting on a poller that never runs — the
    // permanent stall this Bead exists to remove.
    expect(prDetail).toHaveBeenCalled();
  });

  test('observes a human-merged revert without a browser subscriber', async () => {
    const onDiscardObservation = vi.fn(async () => {});
    const queue = queueOf({
      pr_wait: [],
      discard_operations: {
        'discard-1': {
          operation_id: 'discard-1',
          bead_id: 'UI-1',
          phase: 'revert_pr_wait',
          requested_at: 1,
          revert_pr: { number: 404, url: 'https://github.com/o/r/pull/404' }
        }
      }
    });
    const { poller, prDetail } = makePoller({
      subscribers: 0,
      queue,
      detail: { state: 'ok', data: detailOf({ number: 404, state: 'MERGED' }) },
      onDiscardObservation
    });

    await poller.tick();

    expect(prDetail).toHaveBeenCalledWith('/repo', 404);
    expect(onDiscardObservation).toHaveBeenCalledWith('UI-1');
  });

  test('keeps a merge-queue member observed after its row leaves the lane', async () => {
    const observations = createPrObservationStore();
    observations.record('/ws', 'UI-9', { error: null, pr: detailOf() });
    const { poller } = makePoller({
      observations,
      queue: {
        ...queueOf(),
        merge_queue: [{ bead_id: 'UI-9', resolution_rounds: 0 }]
      }
    });

    await poller.tick();

    // The driver disposes of a queued item by reading its head SHA from here
    // (UI-yk55 §3.2). Pruning it would leave the driver unable to record an
    // exclusion, so it would hold the item and halt the whole queue.
    expect(observations.get('/ws', 'UI-9')).not.toBe(null);
  });

  test('still prunes a bead that is in neither the lane nor the merge queue', async () => {
    const observations = createPrObservationStore();
    observations.record('/ws', 'GONE-1', { error: null, pr: detailOf() });
    const { poller } = makePoller({ observations });

    await poller.tick();

    expect(observations.get('/ws', 'GONE-1')).toBe(null);
  });

  test('makes no gh call when pr_wait is empty', async () => {
    const { poller, prDetail } = makePoller({
      queue: queueOf({ pr_wait: [] })
    });

    await poller.tick();

    expect(prDetail).not.toHaveBeenCalled();
  });

  test('does not observe a quick_fix attempt naturally lacking pr_url and pr_wait', async () => {
    const queue = queueOf({ pr_wait: [] });
    queue.attempts['att-QF-1'] = {
      attempt_id: 'att-QF-1',
      bead_id: 'QF-1',
      status: 'running',
      quickfix_lane: true
    };
    const { poller, prDetail, observations } = makePoller({ queue });

    await poller.tick();

    // Poll subjects come only from pr_wait/external PR rows; the bare attempt
    // has no PR URL and never becomes an observation target.
    expect(prDetail).not.toHaveBeenCalled();
    expect(observations.get('/ws', 'QF-1')).toBeNull();
  });

  test('observes the pr_wait PR when a subscriber is watching', async () => {
    const { poller, prDetail, observations } = makePoller();

    await poller.tick();

    expect(prDetail).toHaveBeenCalledWith('/repo', 304);
    expect(observations.get('/ws', 'UI-1')?.pr?.head_sha).toBe(SHA);
  });

  test('pushes the change through the queue-changed fanout', async () => {
    const { poller, notifyChanged } = makePoller();

    await poller.tick();

    expect(notifyChanged).toHaveBeenCalledWith('/ws');
  });

  test('drops observations for beads that left pr_wait', async () => {
    const observations = createPrObservationStore();
    observations.record('/ws', 'GONE-1', { error: null });
    const { poller } = makePoller({ observations });

    await poller.tick();

    expect(observations.get('/ws', 'GONE-1')).toBe(null);
  });
});

describe('worker/pr-poller — mergeable UNKNOWN re-query (§4)', () => {
  test('re-queries an UNKNOWN mergeable and reports the resolved value', async () => {
    const results = [
      { state: 'ok', data: detailOf({ mergeable: 'UNKNOWN' }) },
      { state: 'ok', data: detailOf({ mergeable: 'MERGEABLE' }) }
    ];
    let i = 0;
    const { poller, prDetail, observations } = makePoller({
      detail: () => results[i++]
    });

    await poller.tick();

    expect(prDetail).toHaveBeenCalledTimes(2);
    expect(observations.get('/ws', 'UI-1')?.pr?.mergeable).toBe('MERGEABLE');
  });

  test('does not re-query a mergeability that came back decided', async () => {
    const { poller, prDetail } = makePoller();

    await poller.tick();

    expect(prDetail).toHaveBeenCalledTimes(1);
  });

  test('reports a still-UNKNOWN mergeable after the re-query', async () => {
    const { poller, observations } = makePoller({
      detail: { state: 'ok', data: detailOf({ mergeable: 'UNKNOWN' }) }
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.pr?.mergeable).toBe('UNKNOWN');
  });
});

describe('worker/pr-poller — external PR state classification (§4)', () => {
  test('records a MERGED PR without any cleanup', async () => {
    const store_snapshot = queueOf();
    const { poller, observations } = makePoller({
      queue: store_snapshot,
      detail: { state: 'ok', data: detailOf({ state: 'MERGED' }) }
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.pr?.state).toBe('MERGED');
    expect(store_snapshot.pr_wait).toEqual([{ bead_id: 'UI-1', added_at: 1 }]);
    expect(store_snapshot.done).toEqual([]);
  });

  test('keeps a CLOSED-unmerged bead in pr_wait with its state recorded', async () => {
    const store_snapshot = queueOf();
    const { poller, observations } = makePoller({
      queue: store_snapshot,
      detail: { state: 'ok', data: detailOf({ state: 'CLOSED' }) }
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.pr?.state).toBe('CLOSED');
    expect(store_snapshot.pr_wait).toEqual([{ bead_id: 'UI-1', added_at: 1 }]);
    expect(store_snapshot.queue).toEqual([]);
  });

  test('hands a discard-fenced CLOSED observation to the discard coordinator', async () => {
    const onMerged = vi.fn(async () => {});
    const onDiscardObservation = vi.fn(async () => {});
    const queue = queueOf({
      discard_operations: {
        'discard-1': {
          operation_id: 'discard-1',
          bead_id: 'UI-1',
          phase: 'runner_terminated'
        }
      }
    });
    const { poller } = makePoller({
      queue,
      detail: { state: 'ok', data: detailOf({ state: 'CLOSED' }) },
      onMerged,
      onDiscardObservation
    });

    await poller.tick();

    expect(onDiscardObservation).toHaveBeenCalledWith('UI-1');
    expect(onMerged).not.toHaveBeenCalled();
  });

  test('routes a discard-fenced MERGED observation away from ordinary cleanup', async () => {
    const onMerged = vi.fn(async () => {});
    const onDiscardObservation = vi.fn(async () => {});
    const queue = queueOf({
      discard_operations: {
        'discard-1': {
          operation_id: 'discard-1',
          bead_id: 'UI-1',
          phase: 'runner_terminated'
        }
      }
    });
    const { poller } = makePoller({
      queue,
      detail: { state: 'ok', data: detailOf({ state: 'MERGED' }) },
      onMerged,
      onDiscardObservation
    });

    await poller.tick();

    expect(onDiscardObservation).toHaveBeenCalledWith('UI-1');
    expect(onMerged).not.toHaveBeenCalled();
  });
});

describe('worker/pr-poller — observation errors fail closed', () => {
  test('records a failed detail query as an error, not as an empty state', async () => {
    const { poller, observations } = makePoller({
      detail: { state: 'error', reason: 'gh_failed' }
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')).toMatchObject({
      error: 'gh_failed',
      pr: null
    });
  });

  test('records an unresolvable PR reference as an error', async () => {
    const { poller, observations, prDetail } = makePoller({
      queue: queueOf({ pr_number: null, pr_url: '' })
    });

    await poller.tick();

    expect(prDetail).not.toHaveBeenCalled();
    expect(observations.get('/ws', 'UI-1')?.error).toBe('pr_ref_unknown');
  });
});

describe('worker/pr-poller — optional verification binding (§5)', () => {
  test.each([
    [
      'throws',
      async () => {
        throw new Error('fetch failed');
      },
      'base_unresolved:git_error'
    ],
    [
      'fails',
      async () => ({ ok: false, step: 'declaration_missing' }),
      'base_unresolved:declaration_missing'
    ],
    [
      'omits its SHA',
      async () => ({ ok: true, base: 'main' }),
      'base_unresolved:base_sha_unobserved'
    ]
  ])(
    'invalidates cached advisory authority when base resolution %s',
    async (_case, resolveBase, expected_error) => {
      const observations = createPrObservationStore();
      observations.record('/ws', 'UI-1', {
        pr: detailOf(),
        review_receipt: { state: 'current', head_sha: SHA }
      });
      observations.recordVerify('/ws', 'UI-1', {
        head_sha: SHA,
        effective_base_sha: BASE_SHA,
        ok: true,
        reason: 'ok',
        at: 1
      });
      recordRepoOpsDisplay('/ws', {
        status: 'absent',
        source_path: 'repo-ops/config.toml',
        base_ref: 'main',
        base_sha: BASE_SHA,
        verify: null,
        deploy: null,
        error_code: null
      });
      const operations = /** @type {any} */ (repoOperations());
      operations.refreshDisplay = vi.fn((input) =>
        refreshRepoOpsDisplay({
          workspace: '/ws',
          repo: '/repo',
          base: input.base,
          sha: input.sha,
          gitRun: vi.fn()
        })
      );
      const { poller } = makePoller({
        observations,
        repoOperations: operations,
        resolveBase
      });

      await poller.tick();

      const entry = observations.get('/ws', 'UI-1');
      const policy = repoOpsVerifyPolicy(repoOpsDisplayFor('/ws'));
      expect(policy.declaration_state).toBe('invalid');
      expect(entry?.error).toBe(expected_error);
      expect(
        evaluateMergeGate(entry, {
          review_receipt_state: observedReviewReceiptState(entry),
          verify_receipt_state: repoOpsVerifyReceiptState(policy, entry?.verify)
        })
      ).toMatchObject({ enabled: false, tier: 'undecidable' });
      expect(operations.ensureVerify).not.toHaveBeenCalled();
      expect(operations.waitForTerminal).not.toHaveBeenCalled();
    }
  );

  test('starts the durable verification pinned to base and head', async () => {
    const operations = repoOperations();
    const { poller, observations } = makePoller({
      repoOperations: operations
    });

    await poller.tick();

    expect(operations.ensureVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        base_sha: BASE_SHA,
        head_sha: SHA,
        pr_number: 304,
        script_path: 'repo-ops/script/verify'
      })
    );
    expect(operations.waitForTerminal).toHaveBeenCalledWith('verify-op', {
      head_sha: SHA,
      timeout_ms: 1000
    });
    expect(observations.get('/ws', 'UI-1')?.verify).toMatchObject({
      head_sha: SHA,
      ok: true
    });
  });

  test('resolves pinned repo policy for every open PR', async () => {
    const operations = repoOperations();
    const { poller } = makePoller({ repoOperations: operations });

    await poller.tick();

    expect(operations.hasConfig).toHaveBeenCalledWith(BASE_SHA, {
      current_target_base: true
    });
  });

  test('does not create an operation without a verify declaration', async () => {
    const operations = repoOperations({ verify_script_path: null });
    const { poller, observations } = makePoller({
      repoOperations: operations
    });

    await poller.tick();

    expect(operations.ensureVerify).not.toHaveBeenCalled();
    expect(observations.get('/ws', 'UI-1')?.verify).toBeNull();
    expect(observations.get('/ws', 'UI-1')?.error).toBeNull();
  });

  test('adopts the same deterministic operation on a repeated observation', async () => {
    const operations = repoOperations();
    const { poller } = makePoller({ repoOperations: operations });

    await poller.tick();
    await poller.tick();

    expect(operations.ensureVerify).toHaveBeenCalledTimes(2);
    expect(operations.ensureVerify.mock.calls[0][0]).toEqual(
      operations.ensureVerify.mock.calls[1][0]
    );
  });

  test('uses a new candidate when the head advances', async () => {
    const operations = repoOperations({
      receipt: {
        state: 'succeeded',
        head_sha: NEW_SHA,
        ok: true,
        reason: 'ok'
      }
    });
    const { poller } = makePoller({
      detail: { state: 'ok', data: detailOf({ head_sha: NEW_SHA }) },
      repoOperations: operations
    });

    await poller.tick();

    expect(operations.ensureVerify).toHaveBeenCalledWith(
      expect.objectContaining({ head_sha: NEW_SHA })
    );
  });
});

describe('worker/pr-poller — pure helpers', () => {
  test('resolvePrRef reads the PR number the verifier recorded', () => {
    expect(resolvePrRef(/** @type {any} */ (queueOf()), 'UI-1')).toEqual({
      number: 304,
      url: PR_URL
    });
  });

  test('resolvePrRef falls back to parsing the PR url', () => {
    const q = queueOf({ pr_number: null });

    expect(resolvePrRef(/** @type {any} */ (q), 'UI-1')?.number).toBe(304);
  });

  test('resolvePrRef reads the durable pr_wait url without an attempt', () => {
    const q = /** @type {any} */ (queueOf());
    q.attempts = {};
    q.pr_wait[0].pr_url = 'https://github.com/o/r/pull/777';

    expect(resolvePrRef(q, 'UI-1')).toEqual({
      number: 777,
      url: 'https://github.com/o/r/pull/777'
    });
  });

  test('resolvePrRef prefers the attempt over the durable pr_wait url', () => {
    const q = /** @type {any} */ (queueOf());
    q.pr_wait[0].pr_url = 'https://github.com/o/r/pull/777';

    expect(resolvePrRef(q, 'UI-1')?.number).toBe(304);
  });

  test('resolvePrRef returns null for a bead with no PR record', () => {
    expect(resolvePrRef(/** @type {any} */ (queueOf()), 'UI-9')).toBe(null);
  });
});

describe('worker/pr-poller — activity reporting (UI-raqh §3)', () => {
  test('reports checking while the gh round-trip is in flight', async () => {
    /** @type {(v: any) => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    const activity = createActivityStore();
    const { poller } = makePoller({
      activity,
      detail: () => gate.then(() => ({ state: 'ok', data: detailOf() }))
    });

    const pass = poller.tick();
    await Promise.resolve();

    expect(activity.get('/ws', 'UI-1')?.activity).toBe('checking');
    release({});
    await pass;
  });

  test('clears checking once the pass ends', async () => {
    const activity = createActivityStore();
    const { poller } = makePoller({ activity });

    await poller.tick();

    expect(activity.get('/ws', 'UI-1')).toBe(null);
  });

  test('clears checking even when the observation throws', async () => {
    const activity = createActivityStore();
    const { poller } = makePoller({
      activity,
      detail: () => {
        throw new Error('boom');
      }
    });

    await poller.tick();

    expect(activity.get('/ws', 'UI-1')).toBe(null);
  });

  test('reports verifying while the local suite runs', async () => {
    /** @type {(v: any) => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    const activity = createActivityStore();
    const operations = {
      ...repoOperations(),
      waitForTerminal: () => gate
    };
    const { poller } = makePoller({
      activity,
      repoOperations: operations
    });

    const pass = poller.tick();
    await settle(() => activity.get('/ws', 'UI-1')?.activity === 'verifying');

    expect(activity.get('/ws', 'UI-1')?.activity).toBe('verifying');
    release({});
    await pass;
    expect(activity.get('/ws', 'UI-1')).toBe(null);
  });

  test('keeps a long verification visible across a later observation pass', async () => {
    /** @type {(v: any) => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = resolve;
    });
    const activity = createActivityStore();
    const operations = {
      ...repoOperations(),
      waitForTerminal: () => gate
    };
    const { poller } = makePoller({
      activity,
      repoOperations: operations
    });
    const first = poller.tick();
    await settle(() => activity.get('/ws', 'UI-1')?.activity === 'verifying');

    await poller.tick();

    expect(activity.get('/ws', 'UI-1')?.activity).toBe('verifying');
    release({});
    await first;
  });

  test('prunes the activity of a bead that left the lane', async () => {
    const activity = createActivityStore();
    activity.beginChecking('/ws', 'UI-GONE');
    const { poller } = makePoller({ activity });

    await poller.tick();

    expect(activity.get('/ws', 'UI-GONE')).toBe(null);
  });
});

describe('worker/pr-poller — external PR rows (UI-7agi §1)', () => {
  test('reconciles an external row immediately after an OPEN observation', async () => {
    const { poller, store } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: {
        state: 'ok',
        data: detailOf({
          url: 'https://github.com/o/r/pull/75',
          head_ref: 'UI-ext'
        })
      }
    });

    await poller.tick();

    expect(store.reconcileExternalPrWait).toHaveBeenCalledWith('/ws', {
      bead_id: 'UI-ext',
      pr_url: 'https://github.com/o/r/pull/75',
      head_ref: 'UI-ext'
    });
  });

  test('does not reconcile an external CLOSED observation', async () => {
    const { poller, store } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: { state: 'ok', data: detailOf({ state: 'CLOSED' }) }
    });

    await poller.tick();

    expect(store.reconcileExternalPrWait).not.toHaveBeenCalled();
  });

  test('does not reconcile an external MERGED observation', async () => {
    const { poller, store } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      }
    });

    await poller.tick();

    expect(store.reconcileExternalPrWait).not.toHaveBeenCalled();
  });

  test('does not reconcile an external observation error', async () => {
    const { poller, store } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: { state: 'error', reason: 'gh_failed' }
    });

    await poller.tick();

    expect(store.reconcileExternalPrWait).not.toHaveBeenCalled();
  });

  test('resolvePrRef falls back to the registry row when no attempt exists', () => {
    const queue = /** @type {any} */ (queueOf({ pr_wait: [] }));

    const ref = resolvePrRef(queue, 'UI-ext', {
      pr_url: 'https://github.com/o/r/pull/777',
      pr_number: 777
    });

    expect(ref).toEqual({
      number: 777,
      url: 'https://github.com/o/r/pull/777'
    });
  });

  test('resolvePrRef parses the number out of the url when the row carries none', () => {
    const ref = resolvePrRef(
      /** @type {any} */ (queueOf({ pr_wait: [] })),
      'UI-ext',
      {
        pr_url: 'https://github.com/o/r/pull/777',
        pr_number: null
      }
    );

    expect(ref?.number).toBe(777);
  });

  test('resolvePrRef prefers the attempt over the registry row', () => {
    const ref = resolvePrRef(/** @type {any} */ (queueOf()), 'UI-1', {
      pr_url: 'https://github.com/o/r/pull/777',
      pr_number: 777
    });

    expect(ref?.number).toBe(304);
  });

  test('observes an external row the durable pr_wait never held', async () => {
    const { poller, prDetail, observations } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext', pr_number: 777 }])
    });

    await poller.tick();

    expect(prDetail).toHaveBeenCalledWith('/repo', 777);
    expect(observations.get('/ws', 'UI-ext')?.error).toBe(null);
  });

  test('re-scans the registry before every pass', async () => {
    const external = externalOf([{ bead_id: 'UI-ext' }]);
    const { poller } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external
    });

    await poller.tick();

    expect(external.refresh).toHaveBeenCalledTimes(1);
  });

  test('makes no gh call when neither the lane nor the registry has a row', async () => {
    const { poller, prDetail } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([])
    });

    await poller.tick();

    expect(prDetail).not.toHaveBeenCalled();
  });

  test('lets the worker row win when both sources name the same bead', async () => {
    const { poller, prDetail } = makePoller({
      external: externalOf([{ bead_id: 'UI-1', pr_number: 777 }])
    });

    await poller.tick();

    expect(prDetail).toHaveBeenCalledTimes(1);
    expect(prDetail).toHaveBeenCalledWith('/repo', 304);
  });

  test('hands an external MERGED observation to the shared cleanup', async () => {
    const onMerged = vi.fn(async () => {});
    const { poller, observations } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      },
      onMerged
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-ext')?.pr?.state).toBe('MERGED');
    expect(onMerged).toHaveBeenCalledWith(
      'UI-ext',
      NEW_SHA,
      expect.objectContaining({ head_ref: 'UI-1', pr_url: PR_URL })
    );
  });

  test('durably promotes an external row before shared cleanup starts', async () => {
    const onMerged = vi.fn(async () => ({ ok: true }));
    const { poller, store } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      },
      onMerged
    });

    await poller.tick();

    expect(store.promoteMergedExternal).toHaveBeenCalledOnce();
    expect(
      store.promoteMergedExternal.mock.invocationCallOrder[0]
    ).toBeLessThan(onMerged.mock.invocationCallOrder[0]);
  });

  test('records promotion failure without entering shared cleanup', async () => {
    const onMerged = vi.fn();
    const { poller, store } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      },
      onMerged
    });
    store.promoteMergedExternal.mockImplementation(() => ({ ok: false }));

    await poller.tick();

    expect(onMerged).not.toHaveBeenCalled();
    expect(store.recordCleanupFailure).toHaveBeenCalledWith('/ws', {
      bead_id: 'UI-ext',
      step: 'repo_operations',
      reason: 'external_deployment_promote_failed'
    });
  });

  test('does not auto-run a merged cleanup after a durable failure', async () => {
    const queue = queueOf({ pr_wait: [] });
    const onMerged = vi.fn(async () => {
      /** @type {Record<string, any>} */ (queue.cleanup_failed)['UI-ext'] = {
        step: 'base_containment',
        reason: 'fetch_failed'
      };
    });
    const { poller } = makePoller({
      queue,
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      },
      onMerged
    });

    await poller.tick();
    await poller.tick();

    expect(onMerged).toHaveBeenCalledTimes(1);
  });

  test('deduplicates a merged cleanup while the first handoff is in flight', async () => {
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    const onMerged = vi.fn(() => gate);
    const { poller } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([{ bead_id: 'UI-ext' }]),
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      },
      onMerged
    });

    const first = poller.tick();
    await vi.waitFor(() => expect(onMerged).toHaveBeenCalledOnce());
    await poller.tick();
    release();
    await first;

    expect(onMerged).toHaveBeenCalledOnce();
  });

  test('still hands a WORKER row MERGED to the cleanup', async () => {
    const onMerged = vi.fn(async () => {});
    const { poller } = makePoller({
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      },
      onMerged
    });

    await poller.tick();

    expect(onMerged).toHaveBeenCalledWith(
      'UI-1',
      NEW_SHA,
      expect.objectContaining({ head_ref: 'UI-1', pr_url: PR_URL })
    );
  });

  test('coalesces action_in_flight without recording cleanup failure', async () => {
    const onMerged = vi.fn(async () => ({
      ok: false,
      reason: 'action_in_flight'
    }));
    const { poller, store } = makePoller({
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      },
      onMerged
    });

    await poller.tick();

    expect(onMerged).toHaveBeenCalledOnce();
    expect(store.recordCleanupFailure).not.toHaveBeenCalled();
  });

  test('records other false cleanup outcomes as durable failures', async () => {
    const onMerged = vi.fn(async () => ({
      ok: false,
      reason: 'discard_in_progress'
    }));
    const { poller, store } = makePoller({
      detail: {
        state: 'ok',
        data: detailOf({ state: 'MERGED', merge_sha: NEW_SHA })
      },
      onMerged
    });

    await poller.tick();

    expect(store.recordCleanupFailure).toHaveBeenCalledWith('/ws', {
      bead_id: 'UI-1',
      step: 'repo_operations',
      reason: 'discard_in_progress'
    });
  });

  test('keeps the previous rows when the scan throws', async () => {
    const external = externalOf([{ bead_id: 'UI-ext' }]);
    external.refresh = vi.fn(async () => {
      throw new Error('bd down');
    });
    const { poller, prDetail } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external
    });

    await poller.tick();

    expect(prDetail).toHaveBeenCalledTimes(1);
  });

  test('fans out once when the last external row disappears', async () => {
    /** @type {any[]} */
    let rows = [{ bead_id: 'UI-ext' }];
    const observations = createPrObservationStore();
    const { poller, notifyChanged } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      observations,
      external: {
        refresh: vi.fn(async () => {}),
        list: () =>
          rows.map((r) => ({
            bead_id: r.bead_id,
            pr_url: PR_URL,
            pr_number: 304,
            added_at: 1
          }))
      }
    });
    await poller.tick();
    notifyChanged.mockClear();

    rows = [];
    await poller.tick();

    expect(notifyChanged).toHaveBeenCalledTimes(1);
    expect(observations.get('/ws', 'UI-ext')).toBe(null);

    notifyChanged.mockClear();
    await poller.tick();

    expect(notifyChanged).not.toHaveBeenCalled();
  });

  test('records pr_ref_unknown for an external row whose url is unparseable', async () => {
    const { poller, observations, prDetail } = makePoller({
      queue: queueOf({ pr_wait: [] }),
      external: externalOf([
        { bead_id: 'UI-ext', pr_url: 'nope', pr_number: null }
      ])
    });

    await poller.tick();

    expect(prDetail).not.toHaveBeenCalled();
    expect(observations.get('/ws', 'UI-ext')?.error).toBe('pr_ref_unknown');
  });
});
