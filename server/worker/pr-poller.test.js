import { afterEach, describe, expect, test, vi } from 'vitest';
import { createActivityStore } from './activity-store.js';
import { createPrObservationStore } from './pr-observations.js';
import { createPrPoller, resolvePrRef, rollupConclusion } from './pr-poller.js';
import { __resetQueueEventsForTest } from './queue-events.js';

const SHA = 'a'.repeat(40);
const NEW_SHA = 'c'.repeat(40);
const PR_URL = 'https://github.com/o/r/pull/304';

afterEach(() => {
  __resetQueueEventsForTest();
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
    head_sha: SHA,
    ...pr
  };
}

/**
 * A queue snapshot with one bead in `pr_wait` whose attempt records the PR.
 *
 * @param {{ pr_wait?: string[], pr_number?: number|null, pr_url?: string }} [input]
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
    admission: {}
  };
}

/**
 * @param {{
 *   queue?: any,
 *   detail?: any,
 *   checks?: any,
 *   subscribers?: number,
 *   observations?: any,
 *   activity?: any,
 *   resolveVerify?: any,
 *   runVerify?: any
 * }} [input]
 */
function makePoller(input = {}) {
  const queue = input.queue ?? queueOf();
  const prDetail = vi.fn(async () =>
    typeof input.detail === 'function'
      ? input.detail()
      : (input.detail ?? { state: 'ok', data: detailOf() })
  );
  const prChecks = vi.fn(async () => input.checks ?? { state: 'empty' });
  const observations = input.observations ?? createPrObservationStore();
  const activity = input.activity ?? createActivityStore();
  const notifyChanged = vi.fn();
  const poller = createPrPoller({
    workspace: '/ws',
    repo: '/repo',
    store: { snapshot: () => queue },
    gh: { prDetail, prChecks },
    observations,
    activity,
    getSubscriberCount: () => input.subscribers ?? 1,
    resolveVerify: input.resolveVerify ?? (() => null),
    runVerify: input.runVerify,
    notifyChanged,
    intervalSeconds: 0,
    sleep: async () => {},
    now: () => 5000
  });
  return { poller, prDetail, prChecks, observations, activity, notifyChanged };
}

describe('worker/pr-poller — gating (worker-phase2 §4)', () => {
  test('makes no gh call without subscribers', async () => {
    const { poller, prDetail, prChecks } = makePoller({ subscribers: 0 });

    await poller.tick();

    expect(prDetail).not.toHaveBeenCalled();
    expect(prChecks).not.toHaveBeenCalled();
  });

  test('makes no gh call when pr_wait is empty', async () => {
    const { poller, prDetail, prChecks } = makePoller({
      queue: queueOf({ pr_wait: [] })
    });

    await poller.tick();

    expect(prDetail).not.toHaveBeenCalled();
    expect(prChecks).not.toHaveBeenCalled();
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
    const { poller, observations, prChecks } = makePoller({
      queue: store_snapshot,
      detail: { state: 'ok', data: detailOf({ state: 'MERGED' }) }
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.pr?.state).toBe('MERGED');
    expect(store_snapshot.pr_wait).toEqual([{ bead_id: 'UI-1', added_at: 1 }]);
    expect(store_snapshot.done).toEqual([]);
    expect(prChecks).not.toHaveBeenCalled();
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

  test('records a failed checks query as a CI error bound to the head sha', async () => {
    const { poller, observations } = makePoller({
      checks: { state: 'error', reason: 'gh_bad_json' }
    });

    await poller.tick();

    expect(observations.get('/ws', 'UI-1')?.ci).toMatchObject({
      state: 'error',
      reason: 'gh_bad_json',
      head_sha: SHA
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

describe('worker/pr-poller — local verification binding (§5)', () => {
  const RESOLVED = { cmd: ['npm', 'test'], timeout_ms: 1000, source: 'config' };

  test('runs the verification pinned to the observed head sha', async () => {
    const runVerify = vi.fn(async () => ({
      ok: true,
      reason: 'ok',
      exit: 0
    }));
    const { poller, observations } = makePoller({
      resolveVerify: () => RESOLVED,
      runVerify
    });

    await poller.tick();

    expect(runVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        sha: SHA,
        pr_number: 304,
        cmd: ['npm', 'test']
      })
    );
    expect(observations.get('/ws', 'UI-1')?.verify).toMatchObject({
      head_sha: SHA,
      ok: true
    });
  });

  test('does not run a verification when the repo HAS CI', async () => {
    const runVerify = vi.fn();
    const { poller } = makePoller({
      checks: { state: 'ok', data: [{ name: 'build', conclusion: 'pass' }] },
      resolveVerify: () => RESOLVED,
      runVerify
    });

    await poller.tick();

    expect(runVerify).not.toHaveBeenCalled();
  });

  test('does not run a verification without a resolved verify_cmd', async () => {
    const runVerify = vi.fn();
    const { poller } = makePoller({ resolveVerify: () => null, runVerify });

    await poller.tick();

    expect(runVerify).not.toHaveBeenCalled();
  });

  test('does not re-run when a result for the current head already exists', async () => {
    const observations = createPrObservationStore();
    observations.recordVerify('/ws', 'UI-1', {
      head_sha: SHA,
      ok: true,
      reason: 'ok',
      at: 1
    });
    const runVerify = vi.fn();
    const { poller } = makePoller({
      observations,
      resolveVerify: () => RESOLVED,
      runVerify
    });

    await poller.tick();

    expect(runVerify).not.toHaveBeenCalled();
  });

  test('re-runs when the head sha advanced past the recorded green', async () => {
    const observations = createPrObservationStore();
    observations.recordVerify('/ws', 'UI-1', {
      head_sha: SHA,
      ok: true,
      reason: 'ok',
      at: 1
    });
    const runVerify = vi.fn(async () => ({ ok: true, reason: 'ok', exit: 0 }));
    const { poller } = makePoller({
      observations,
      detail: { state: 'ok', data: detailOf({ head_sha: NEW_SHA }) },
      resolveVerify: () => RESOLVED,
      runVerify
    });

    await poller.tick();

    expect(runVerify).toHaveBeenCalledWith(
      expect.objectContaining({ sha: NEW_SHA })
    );
    expect(observations.get('/ws', 'UI-1')?.verify?.head_sha).toBe(NEW_SHA);
  });

  test('re-runs after a restart cache miss instead of passing', async () => {
    const runVerify = vi.fn(async () => ({ ok: true, reason: 'ok', exit: 0 }));
    const { poller } = makePoller({
      observations: createPrObservationStore(),
      resolveVerify: () => RESOLVED,
      runVerify
    });

    await poller.tick();

    expect(runVerify).toHaveBeenCalledTimes(1);
  });

  test('a fresh observation pass does not erase the recorded verification', async () => {
    const observations = createPrObservationStore();
    const runVerify = vi.fn(async () => ({ ok: true, reason: 'ok', exit: 0 }));
    const { poller } = makePoller({
      observations,
      resolveVerify: () => RESOLVED,
      runVerify
    });

    await poller.tick();
    await poller.tick();

    expect(runVerify).toHaveBeenCalledTimes(1);
    expect(observations.get('/ws', 'UI-1')?.verify?.ok).toBe(true);
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

  test('resolvePrRef returns null for a bead with no PR record', () => {
    expect(resolvePrRef(/** @type {any} */ (queueOf()), 'UI-9')).toBe(null);
  });

  test('rollupConclusion reports fail when any check failed', () => {
    const checks = [
      { name: 'a', conclusion: /** @type {const} */ ('pass') },
      { name: 'b', conclusion: /** @type {const} */ ('fail') },
      { name: 'c', conclusion: /** @type {const} */ ('pending') }
    ];

    expect(rollupConclusion(checks)).toBe('fail');
  });

  test('rollupConclusion reports pending while a check is still running', () => {
    const checks = [
      { name: 'a', conclusion: /** @type {const} */ ('pass') },
      { name: 'b', conclusion: /** @type {const} */ ('pending') }
    ];

    expect(rollupConclusion(checks)).toBe('pending');
  });

  test('rollupConclusion treats skipped checks as passing', () => {
    const checks = [
      { name: 'a', conclusion: /** @type {const} */ ('pass') },
      { name: 'b', conclusion: /** @type {const} */ ('skip') }
    ];

    expect(rollupConclusion(checks)).toBe('pass');
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
    const { poller } = makePoller({
      activity,
      checks: { state: 'empty' },
      resolveVerify: () => ({ cmd: ['npm', 'test'], timeout_ms: 1000 }),
      runVerify: () => gate.then(() => ({ ok: true, reason: 'ok', exit: 0 }))
    });

    const pass = poller.tick();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

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
    const { poller } = makePoller({
      activity,
      checks: { state: 'empty' },
      resolveVerify: () => ({ cmd: ['npm', 'test'], timeout_ms: 1000 }),
      runVerify: () => gate.then(() => ({ ok: true, reason: 'ok', exit: 0 }))
    });
    const first = poller.tick();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();
    await Promise.resolve();

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
