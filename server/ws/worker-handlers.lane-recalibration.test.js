import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test } from 'vitest';
import {
  __resetWorkerRuntimeForTest,
  getWorkerRuntime
} from '../worker/runtime.js';
import {
  laneBlocksEdges,
  onWorkerSnapshotRefresh,
  recalibrateSerialLaneAfterDepAdd
} from './worker-handlers.js';

const WS = '/tmp/example/repo-target';

/** @type {string} */
let tmp_state;

/**
 * @param {string} blockee
 * @param {string} blocker
 */
function issueWithBlocker(blockee, blocker) {
  return {
    id: blockee,
    title: blockee,
    dependencies: [{ id: blocker, title: blocker, dependency_type: 'blocks' }]
  };
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-recalibrate-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetWorkerRuntimeForTest();
});

afterEach(() => {
  __resetWorkerRuntimeForTest();
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

test('reorders a serial lane when a title-cache fill reveals a new blocker', () => {
  const runtime = getWorkerRuntime();
  runtime.titleCache.refreshFromIssue(WS, { id: 'A', title: 'A' });
  runtime.titleCache.refreshFromIssue(WS, { id: 'B', title: 'B' });
  const revision = runtime.queueStore.place(WS, {
    expected_revision: 0,
    bead_id: 'A',
    lane: 's1'
  }).queue.revision;
  const queue = runtime.queueStore.place(WS, {
    expected_revision: revision,
    bead_id: 'B',
    lane: 's1',
    blocks_edges: laneBlocksEdges(
      WS,
      runtime.queueStore.snapshot(WS),
      's1',
      'B'
    )
  }).queue;
  /** @type {string[][]} */
  const published_orders = [];
  const unsubscribe = onWorkerSnapshotRefresh((workspace) => {
    published_orders.push(
      runtime.queueStore
        .snapshot(workspace)
        .serial_lanes[0].entries.map((entry) => entry.bead_id)
    );
  });

  runtime.titleCache.refreshFromIssue(WS, issueWithBlocker('A', 'B'));
  unsubscribe();

  expect(queue.serial_lanes[0].entries.map((entry) => entry.bead_id)).toEqual([
    'A',
    'B'
  ]);
  expect(
    runtime.queueStore
      .snapshot(WS)
      .serial_lanes[0].entries.map((entry) => entry.bead_id)
  ).toEqual(['B', 'A']);
  expect(published_orders).toEqual([['B', 'A']]);
});

test('preserves the queue revision when a title-cache fill keeps the lane order', () => {
  const runtime = getWorkerRuntime();
  runtime.titleCache.refreshFromIssue(WS, { id: 'A', title: 'A' });
  runtime.titleCache.refreshFromIssue(WS, { id: 'B', title: 'B' });
  const revision = runtime.queueStore.place(WS, {
    expected_revision: 0,
    bead_id: 'B',
    lane: 's1'
  }).queue.revision;
  const queue = runtime.queueStore.place(WS, {
    expected_revision: revision,
    bead_id: 'A',
    lane: 's1',
    blocks_edges: laneBlocksEdges(
      WS,
      runtime.queueStore.snapshot(WS),
      's1',
      'A'
    )
  }).queue;

  runtime.titleCache.refreshFromIssue(WS, issueWithBlocker('A', 'B'));

  expect(runtime.queueStore.snapshot(WS).revision).toBe(queue.revision);
  expect(
    runtime.queueStore
      .snapshot(WS)
      .serial_lanes[0].entries.map((entry) => entry.bead_id)
  ).toEqual(['B', 'A']);
});

test('recalibrates and publishes a reverse edge within one lane', () => {
  const runtime = getWorkerRuntime();
  let revision = runtime.queueStore.place(WS, {
    expected_revision: 0,
    bead_id: 'B',
    lane: 's1'
  }).queue.revision;
  runtime.queueStore.place(WS, {
    expected_revision: revision,
    bead_id: 'A',
    lane: 's1'
  });
  const published = /** @type {string[]} */ ([]);
  const unsubscribe = onWorkerSnapshotRefresh((workspace) => {
    published.push(workspace);
  });

  const result = recalibrateSerialLaneAfterDepAdd(
    WS,
    'B',
    'A',
    issueWithBlocker('B', 'A')
  );
  unsubscribe();

  expect(result).toMatchObject({
    matched: true,
    lane: 's1',
    changed: true,
    cycle: false
  });
  expect(
    runtime.queueStore
      .snapshot(WS)
      .serial_lanes[0].entries.map((entry) => entry.bead_id)
  ).toEqual(['A', 'B']);
  expect(published).toEqual([WS]);
});

test('keeps order and exposes a cycle after a cyclic edge is added', () => {
  const runtime = getWorkerRuntime();
  let revision = runtime.queueStore.place(WS, {
    expected_revision: 0,
    bead_id: 'A',
    lane: 's1'
  }).queue.revision;
  revision = runtime.queueStore.place(WS, {
    expected_revision: revision,
    bead_id: 'B',
    lane: 's1'
  }).queue.revision;
  runtime.titleCache.refreshFromIssue(WS, issueWithBlocker('B', 'A'));

  const result = recalibrateSerialLaneAfterDepAdd(
    WS,
    'A',
    'B',
    issueWithBlocker('A', 'B')
  );

  expect(result.cycle).toBe(true);
  expect(result.changed).toBe(false);
  expect(runtime.queueStore.snapshot(WS).revision).toBe(revision);
  expect(
    runtime.queueStore
      .snapshot(WS)
      .serial_lanes[0].entries.map((entry) => entry.bead_id)
  ).toEqual(['A', 'B']);
});

test('skips recalibration when beads occupy different lanes', () => {
  const runtime = getWorkerRuntime();
  let revision = runtime.queueStore.setSerialLaneCount(WS, {
    expected_revision: 0,
    count: 2
  }).queue.revision;
  revision = runtime.queueStore.place(WS, {
    expected_revision: revision,
    bead_id: 'A',
    lane: 's1'
  }).queue.revision;
  runtime.queueStore.place(WS, {
    expected_revision: revision,
    bead_id: 'B',
    lane: 's2'
  });

  const result = recalibrateSerialLaneAfterDepAdd(
    WS,
    'B',
    'A',
    issueWithBlocker('B', 'A')
  );

  expect(result.matched).toBe(false);
});

test('skips recalibration when the blocker belongs to another repository', () => {
  const runtime = getWorkerRuntime();
  runtime.queueStore.place(WS, {
    expected_revision: 0,
    bead_id: 'A',
    lane: 's1'
  });

  const result = recalibrateSerialLaneAfterDepAdd(
    WS,
    'A',
    'EXT-1',
    issueWithBlocker('A', 'EXT-1')
  );

  expect(result.matched).toBe(false);
});
