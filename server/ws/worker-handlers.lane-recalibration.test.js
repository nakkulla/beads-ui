import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test } from 'vitest';
import {
  __resetWorkerRuntimeForTest,
  getWorkerRuntime
} from '../worker/runtime.js';
import {
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
