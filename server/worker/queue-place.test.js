/**
 * The shared `place` body (UI-1gpj §3.3) — the WS mutation and the HTTP route
 * both run exactly this, so its four outcomes and its fanout obligation are
 * pinned here rather than only through one of the two callers.
 *
 * `ws/worker-handlers.js` is mocked wholesale (no `importOriginal`): the two
 * symbols this module borrows from it are all it needs, and faking them keeps
 * the deliberate import cycle out of the test graph while making every fanout
 * argument observable.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';

const state = vi.hoisted(() => ({
  /** @type {Array<{ workspace_key: string, queue: any }>} */
  fanout_calls: [],
  /** @type {Array<{ lane: unknown, bead_id: string }>} */
  lane_edge_calls: []
}));

vi.mock('../ws/worker-handlers.js', () => ({
  /**
   * @param {string} workspace_key
   * @param {any} queue
   */
  fanout: (workspace_key, queue) => {
    state.fanout_calls.push({ workspace_key, queue });
  },
  /**
   * @param {string} _workspace_key
   * @param {any} _queue
   * @param {unknown} lane
   * @param {string} bead_id
   */
  laneBlocksEdges: (_workspace_key, _queue, lane, bead_id) => {
    state.lane_edge_calls.push({ lane, bead_id });
    return [];
  }
}));

const { __setUnattachedAdmissionCheckForTest } = await import('./attach.js');
const { __resetWorkerRuntimeForTest, getWorkerRuntime } =
  await import('./runtime.js');
const { placeBeadInQueue } = await import('./queue-place.js');

const WS = '/tmp/example/queue-place-repo';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-queue-place-'));
  process.env.XDG_STATE_HOME = tmp_state;
  state.fanout_calls = [];
  state.lane_edge_calls = [];
  __setUnattachedAdmissionCheckForTest(async () => ({ ok: true }));
  __resetWorkerRuntimeForTest();
});

afterEach(() => {
  __resetWorkerRuntimeForTest();
  __setUnattachedAdmissionCheckForTest(async () => ({ ok: true }));
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * @returns {import('./queue-store.js').Queue}
 */
function snapshot() {
  return getWorkerRuntime().queueStore.snapshot(WS);
}

test('records the refusal and leaves every lane untouched on admission refusal', async () => {
  __setUnattachedAdmissionCheckForTest(async () => ({
    ok: false,
    reason: 'worker_ineligible'
  }));

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0
  });

  expect(outcome).toMatchObject({
    applied: false,
    conflict: false,
    admission_reason: 'worker_ineligible'
  });
  expect(snapshot().queue).toEqual([]);
  expect(snapshot().admission['UI-a']).toMatchObject({
    reason: 'worker_ineligible'
  });
});

test('fans the refusal snapshot out exactly once', async () => {
  __setUnattachedAdmissionCheckForTest(async () => ({
    ok: false,
    reason: 'worker_ineligible'
  }));

  await placeBeadInQueue(WS, { bead_id: 'UI-a', expected_revision: 0 });

  expect(state.fanout_calls).toHaveLength(1);
  expect(state.fanout_calls[0].workspace_key).toBe(WS);
  expect(state.fanout_calls[0].queue.revision).toBe(snapshot().revision);
  expect(state.fanout_calls[0].queue.admission['UI-a']).toMatchObject({
    reason: 'worker_ineligible'
  });
});

test('degrades a throwing admission check to a git_error refusal', async () => {
  __setUnattachedAdmissionCheckForTest(async () => {
    throw new Error('git exploded');
  });

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0
  });

  expect(outcome).toMatchObject({
    applied: false,
    admission_reason: 'git_error'
  });
  expect(snapshot().admission['UI-a']).toMatchObject({ reason: 'git_error' });
});

test('places an admitted bead in the named serial lane and reports its seat', async () => {
  getWorkerRuntime().queueStore.setSerialLaneCount(WS, {
    expected_revision: 0,
    count: 2
  });
  state.fanout_calls = [];

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    lane: 's2',
    expected_revision: snapshot().revision
  });

  expect(outcome).toMatchObject({ applied: true, lane: 's2', index: 0 });
  expect(
    snapshot().serial_lanes[1].entries.map((entry) => entry.bead_id)
  ).toEqual(['UI-a']);
  expect(state.lane_edge_calls).toEqual([{ lane: 's2', bead_id: 'UI-a' }]);
});

test('reports the seat an explicit index produced', async () => {
  await placeBeadInQueue(WS, { bead_id: 'UI-a', expected_revision: 0 });

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-b',
    index: 0,
    expected_revision: snapshot().revision
  });

  expect(outcome).toMatchObject({ applied: true, lane: 'parallel', index: 0 });
  expect(snapshot().queue.map((entry) => entry.bead_id)).toEqual([
    'UI-b',
    'UI-a'
  ]);
});

test('clears a prior refusal when the placement is admitted', async () => {
  getWorkerRuntime().queueStore.recordAdmission(WS, {
    bead_id: 'UI-a',
    reason: 'worker_ineligible'
  });
  state.fanout_calls = [];

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: snapshot().revision
  });

  expect(outcome.applied).toBe(true);
  expect(snapshot().admission).toEqual({});
  expect(state.fanout_calls).toHaveLength(1);
  expect(state.fanout_calls[0].queue.revision).toBe(snapshot().revision);
  expect(state.fanout_calls[0].queue.admission).toEqual({});
});

test('replaces the refusal with a non-blocking stale mark when the pass was stale', async () => {
  __setUnattachedAdmissionCheckForTest(async () => ({
    ok: true,
    stale: { receipt_sha: 'a'.repeat(40) }
  }));

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    lane: 's1',
    expected_revision: 0
  });

  expect(outcome).toMatchObject({ applied: true, lane: 's1', index: 0 });
  expect(snapshot().admission['UI-a']).toMatchObject({
    reason: 'spec_review_stale',
    stale: true
  });
  expect(state.fanout_calls).toHaveLength(1);
  expect(state.fanout_calls[0].queue.revision).toBe(snapshot().revision);
  expect(state.fanout_calls[0].queue.admission['UI-a']).toMatchObject({
    reason: 'spec_review_stale',
    stale: true
  });
});

test('reports a conflict and fans nothing out on a stale revision', async () => {
  await placeBeadInQueue(WS, { bead_id: 'UI-a', expected_revision: 0 });
  state.fanout_calls = [];
  const before = snapshot().revision;

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-b',
    expected_revision: 0
  });

  expect(outcome).toMatchObject({ applied: false, conflict: true });
  expect(outcome.reason).toBeUndefined();
  expect(snapshot().revision).toBe(before);
  expect(state.fanout_calls).toEqual([]);
});

test('reports rejected when the store refuses a lane beyond the configured count', async () => {
  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    lane: 's5',
    expected_revision: 0
  });

  expect(outcome).toMatchObject({
    applied: false,
    conflict: false,
    reason: 'rejected'
  });
  expect(state.fanout_calls).toEqual([]);
});
