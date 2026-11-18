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

const {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest,
  __setUnattachedAdmissionCheckForTest
} = await import('./attach.js');
const { __resetWorkerRuntimeForTest, getWorkerRuntime } =
  await import('./runtime.js');
const {
  __resetPlacementApprovalForTest,
  __setPlacementApprovalBdForTest,
  placementApprovalPending
} = await import('./placement-adr-approval.js');
const { placeBeadInQueue } = await import('./queue-place.js');
const { placeBundleInQueue } = await import('./queue-place-bundle.js');
const { createScheduler } = await import('./scheduler.js');
const { __setTimingOverridesForTest } = await import('../timing-settings.js');

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
  vi.restoreAllMocks();
  __resetPlacementApprovalForTest();
  __resetWorkerAttachmentsForTest();
  __setTimingOverridesForTest({});
  vi.useRealTimers();
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

test('admits a bundle with a stale revision after an unrelated write', async () => {
  const store = getWorkerRuntime().queueStore;
  store.load(WS);
  store.setAutoAdvance(WS, true);

  const outcome = await placeBundleInQueue(WS, {
    expected_revision: 0,
    lane: 's1',
    binds: [],
    steps: [{ bead_id: 'UI-a', index: 0 }]
  });

  expect(outcome).toMatchObject({
    applied: true,
    conflict: false,
    queue: { revision: 2 }
  });
});

test('applies a bundle after an unrelated write during admission', async () => {
  const store = getWorkerRuntime().queueStore;
  __setUnattachedAdmissionCheckForTest(async () => {
    await Promise.resolve();
    store.setAutoAdvance(WS, true);
    return { ok: true };
  });

  const outcome = await placeBundleInQueue(WS, {
    expected_revision: 0,
    lane: 's1',
    binds: [],
    steps: [{ bead_id: 'UI-a', index: 0 }]
  });

  expect(outcome).toMatchObject({
    applied: true,
    conflict: false,
    queue: { revision: 2, auto_advance: true }
  });
  expect(
    snapshot().serial_lanes[0].entries.map((entry) => entry.bead_id)
  ).toEqual(['UI-a']);
});

test('rejects a bundle when another row enters its lane during admission', async () => {
  const store = getWorkerRuntime().queueStore;
  __setUnattachedAdmissionCheckForTest(async () => {
    await Promise.resolve();
    store.place(WS, { expected_revision: 0, bead_id: 'UI-b', lane: 's1' });
    return { ok: true };
  });

  const outcome = await placeBundleInQueue(WS, {
    expected_revision: 0,
    lane: 's1',
    binds: [],
    steps: [{ bead_id: 'UI-a', index: 0 }]
  });

  expect(outcome).toMatchObject({
    applied: false,
    conflict: true,
    queue: { revision: 1 }
  });
  expect(
    snapshot().serial_lanes[0].entries.map((entry) => entry.bead_id)
  ).toEqual(['UI-b']);
  expect(state.fanout_calls).toEqual([]);
});

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

test('fans nothing out when the identical refusal is already recorded', async () => {
  __setUnattachedAdmissionCheckForTest(async () => ({
    ok: false,
    reason: 'worker_ineligible'
  }));
  await placeBeadInQueue(WS, { bead_id: 'UI-a', expected_revision: 0 });
  const before = snapshot().revision;
  state.fanout_calls = [];

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0
  });

  expect(outcome.admission_reason).toBe('worker_ineligible');
  expect(snapshot().revision).toBe(before);
  expect(state.fanout_calls).toEqual([]);
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

test('accepts a stale revision when the placement tick records grace without moving the seat', async () => {
  vi.useFakeTimers();
  __setTimingOverridesForTest({ queue_grace_seconds: 20 });
  const store = getWorkerRuntime().queueStore;
  store.setAutoAdvance(WS, true);
  const scheduler = createScheduler(
    /** @type {any} */ ({
      store,
      usageReceipts: {},
      publishActivity: () => {}
    })
  );
  __registerWorkerAttachmentForTest(WS, /** @type {any} */ ({ scheduler }));

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    lane: 's1',
    expected_revision: snapshot().revision
  });
  const latest = snapshot();
  const next = await placeBeadInQueue(WS, {
    bead_id: 'UI-b',
    lane: 's1',
    expected_revision: outcome.queue.revision
  });

  expect(outcome.applied).toBe(true);
  expect(latest.revision).toBeGreaterThan(outcome.queue.revision);
  expect(latest.admission['UI-a']).toMatchObject({ reason: 'grace_period' });
  expect(latest.serial_lanes).toEqual(outcome.queue.serial_lanes);
  expect(next).toMatchObject({ applied: true, lane: 's1', index: 1 });
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

const ADR_SECTION =
  '## 결정 (ADR 후보)\n- 승인 기록은 화면 통로에서만 쓴다 → ADR\n\n## scope\n- server/x.js\n';
const ADR_DIGEST = '283f1b8707c5';

/** @type {{ unsets: Array<{ bead_id: string, key: string }>, metadata: Record<string, Record<string, string>> }} */
let fake_bd = { unsets: [], metadata: {} };

/**
 * A bd stand-in for the approval record. `gate` holds the post-placement read
 * (the pre-placement read runs first and is never gated); `edited` replaces a
 * body right after its pre-placement read; `readback` makes the confirming
 * read throw (`'once'`/`'always'`) or return another writer's value.
 *
 * @param {Record<string, { route?: string, description: string, adr_approval?: string }>} beads
 * @param {{ fail?: boolean, gate?: Promise<void>, edited?: Record<string, string>, readback?: 'once'|'always'|'foreign' }} [options]
 */
function fakeApprovalBd(beads, options = {}) {
  /** @type {Array<{ bead_id: string, key: string, value: string }>} */
  const writes = [];
  /** @type {Array<{ bead_id: string, key: string }>} */
  const unsets = [];
  /** @type {Record<string, Record<string, string>>} */
  const metadata = {};
  /** @type {Record<string, number>} */
  const reads = {};
  let readback_failures = 0;
  for (const [bead_id, bead] of Object.entries(beads)) {
    metadata[bead_id] = {
      route: bead.route ?? 'quick_fix',
      ...(bead.adr_approval ? { adr_approval: bead.adr_approval } : {})
    };
  }
  __setPlacementApprovalBdForTest(() => ({
    /** @param {string} bead_id */
    async readIssue(bead_id) {
      reads[bead_id] = (reads[bead_id] ?? 0) + 1;
      if (options.gate && reads[bead_id] > 1) {
        await options.gate;
      }
      if (options.fail) {
        throw new Error('bd down');
      }
      const issue = {
        id: bead_id,
        description: beads[bead_id].description,
        metadata: { ...metadata[bead_id] }
      };
      if (options.edited?.[bead_id] !== undefined && reads[bead_id] === 1) {
        beads[bead_id].description = options.edited[bead_id];
      }
      return issue;
    },
    /**
     * @param {string} bead_id
     * @param {string} key
     * @param {string} value
     */
    async setMetadata(bead_id, key, value) {
      writes.push({ bead_id, key, value });
      metadata[bead_id][key] = value;
    },
    /**
     * @param {string} bead_id
     * @param {string} key
     */
    async unsetMetadata(bead_id, key) {
      unsets.push({ bead_id, key });
      delete metadata[bead_id][key];
    },
    /**
     * @param {string} bead_id
     * @param {string} key
     */
    async readMetadata(bead_id, key) {
      if (
        options.readback === 'always' ||
        (options.readback === 'once' && readback_failures++ === 0)
      ) {
        throw new Error('bd show failed');
      }
      if (options.readback === 'foreign') {
        metadata[bead_id][key] = `user@${'f'.repeat(12)}`;
      }
      return metadata[bead_id][key] ?? null;
    }
  }));
  fake_bd = { unsets, metadata };
  return writes;
}

/** Let the fire-and-forget approval record settle. */
async function settled() {
  await new Promise((resolve) => setTimeout(resolve, 0));
}

test('records the current section digest for a fresh on-screen placement', async () => {
  const writes = fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } });

  await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0,
    ui_placement: true
  });
  await settled();

  expect(writes).toEqual([
    { bead_id: 'UI-a', key: 'adr_approval', value: `user@${ADR_DIGEST}` }
  ]);
});

test('judges each bead a bundle placement newly adds', async () => {
  const writes = fakeApprovalBd({
    'UI-a': { description: ADR_SECTION },
    'UI-b': { description: '## scope\n- server/y.js\n' },
    'UI-c': {
      description: ADR_SECTION,
      adr_approval: `user@${'0'.repeat(12)}`
    }
  });

  await placeBundleInQueue(WS, {
    expected_revision: 0,
    lane: 's1',
    binds: [],
    steps: [
      { bead_id: 'UI-a', index: 0 },
      { bead_id: 'UI-b', index: 1 },
      { bead_id: 'UI-c', index: 2 }
    ],
    ui_placement: true
  });
  await settled();

  expect(writes.map((write) => [write.bead_id, write.value])).toEqual([
    ['UI-a', `user@${ADR_DIGEST}`],
    ['UI-c', `user@${ADR_DIGEST}`]
  ]);
});

test('writes nothing for a placement without the on-screen mark', async () => {
  const writes = fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } });

  await placeBeadInQueue(WS, { bead_id: 'UI-a', expected_revision: 0 });
  await settled();

  expect(writes).toEqual([]);
});

test('writes nothing when the on-screen placement only moves a waiting bead', async () => {
  const writes = fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } });
  await placeBeadInQueue(WS, { bead_id: 'UI-a', expected_revision: 0 });

  await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    lane: 's1',
    expected_revision: snapshot().revision,
    ui_placement: true
  });
  await settled();

  expect(writes).toEqual([]);
});

test('writes nothing and holds nothing when the store rejects the placement', async () => {
  const writes = fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } });

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    lane: 's5',
    expected_revision: 0,
    ui_placement: true
  });
  await settled();

  expect(outcome.applied).toBe(false);
  expect(writes).toEqual([]);
  expect(placementApprovalPending(WS, 'UI-a')).toBe(false);
});

test.each([
  ['a valid approval', { adr_approval: `user@${ADR_DIGEST}` }],
  ['no section', { description: '## scope\n- server/x.js\n' }],
  [
    'two sections',
    {
      description: ADR_SECTION.replace(
        '## scope',
        '## 두 번째 결정 (ADR 후보)\n- 둘째\n\n## scope'
      )
    }
  ],
  ['a spec_backed route', { route: 'spec_backed' }]
])('writes nothing for a bead with %s', async (_label, overrides) => {
  const writes = fakeApprovalBd({
    'UI-a': { description: ADR_SECTION, ...overrides }
  });

  await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0,
    ui_placement: true
  });
  await settled();

  expect(writes).toEqual([]);
});

test('keeps the placement outcome and releases the hold when bd fails', async () => {
  fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } }, { fail: true });

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0,
    ui_placement: true
  });
  await settled();

  expect(outcome).toMatchObject({ applied: true, conflict: false });
  expect(placementApprovalPending(WS, 'UI-a')).toBe(false);
});

test('holds the placed row from dispatch until the record attempt settles', async () => {
  /** @type {() => void} */
  let open_gate = () => {};
  const gate = new Promise((resolve) => {
    open_gate = () => resolve(undefined);
  });
  fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } }, { gate });

  await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0,
    ui_placement: true
  });
  const pending_before = placementApprovalPending(WS, 'UI-a');
  open_gate();
  await settled();

  expect(pending_before).toBe(true);
  expect(placementApprovalPending(WS, 'UI-a')).toBe(false);
});

test('writes nothing when the section changed after the person placed it', async () => {
  const writes = fakeApprovalBd(
    { 'UI-a': { description: ADR_SECTION } },
    {
      edited: {
        'UI-a': ADR_SECTION.replace('화면 통로에서만', '어느 통로에서나')
      }
    }
  );

  const outcome = await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0,
    ui_placement: true
  });
  await settled();

  expect(outcome.applied).toBe(true);
  expect(writes).toEqual([]);
  expect(placementApprovalPending(WS, 'UI-a')).toBe(false);
});

test('writes nothing for a bundle step whose section changed after the read', async () => {
  const writes = fakeApprovalBd(
    {
      'UI-a': { description: ADR_SECTION },
      'UI-b': { description: ADR_SECTION }
    },
    { edited: { 'UI-b': ADR_SECTION.replace('화면', '모든') } }
  );

  await placeBundleInQueue(WS, {
    expected_revision: 0,
    lane: 's1',
    binds: [],
    steps: [
      { bead_id: 'UI-a', index: 0 },
      { bead_id: 'UI-b', index: 1 }
    ],
    ui_placement: true
  });
  await settled();

  expect(writes.map((write) => write.bead_id)).toEqual(['UI-a']);
});

test.each([
  ['an absent prior', undefined, 'once'],
  ['a stale prior', `user@${'0'.repeat(12)}`, 'always']
])(
  'restores %s when the confirming readback fails',
  async (_label, adr_approval, readback) => {
    fakeApprovalBd(
      { 'UI-a': { description: ADR_SECTION, adr_approval } },
      { readback: /** @type {'once'|'always'} */ (readback) }
    );

    await placeBeadInQueue(WS, {
      bead_id: 'UI-a',
      expected_revision: 0,
      ui_placement: true
    });
    await settled();

    expect(fake_bd.metadata['UI-a'].adr_approval).toBe(adr_approval);
    expect(placementApprovalPending(WS, 'UI-a')).toBe(false);
  }
);

test('leaves another writer value that the readback observes', async () => {
  fakeApprovalBd(
    { 'UI-a': { description: ADR_SECTION } },
    { readback: 'foreign' }
  );

  await placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0,
    ui_placement: true
  });
  await settled();

  expect(fake_bd.unsets).toEqual([]);
  expect(fake_bd.metadata['UI-a'].adr_approval).toBe(`user@${'f'.repeat(12)}`);
});

test('releases the hold when the store write throws', async () => {
  fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } });
  vi.spyOn(getWorkerRuntime().queueStore, 'place').mockImplementation(() => {
    throw new Error('disk full');
  });

  const placing = placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0,
    ui_placement: true
  });

  await expect(placing).rejects.toThrow('disk full');
  expect(placementApprovalPending(WS, 'UI-a')).toBe(false);
});

test('releases the bundle hold when the store write throws', async () => {
  fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } });
  vi.spyOn(getWorkerRuntime().queueStore, 'placeBundle').mockImplementation(
    () => {
      throw new Error('disk full');
    }
  );

  const placing = placeBundleInQueue(WS, {
    expected_revision: 0,
    lane: 's1',
    binds: [],
    steps: [{ bead_id: 'UI-a', index: 0 }],
    ui_placement: true
  });

  await expect(placing).rejects.toThrow('disk full');
  expect(placementApprovalPending(WS, 'UI-a')).toBe(false);
});

test('still records and releases when a step after the queue write throws', async () => {
  const writes = fakeApprovalBd({ 'UI-a': { description: ADR_SECTION } });
  vi.spyOn(getWorkerRuntime().queueStore, 'clearAdmission').mockImplementation(
    () => {
      throw new Error('admission store broke');
    }
  );

  const placing = placeBeadInQueue(WS, {
    bead_id: 'UI-a',
    expected_revision: 0,
    ui_placement: true
  });

  await expect(placing).rejects.toThrow('admission store broke');
  await settled();
  expect(writes).toEqual([
    { bead_id: 'UI-a', key: 'adr_approval', value: `user@${ADR_DIGEST}` }
  ]);
  expect(placementApprovalPending(WS, 'UI-a')).toBe(false);
});
