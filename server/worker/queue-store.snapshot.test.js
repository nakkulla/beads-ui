import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, expect, test, vi } from 'vitest';
import { createQueueStore } from './queue-store.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/queue-shared-snapshot';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-snapshot-'));
  vi.stubEnv('XDG_STATE_HOME', tmp_state);
});

afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

test('shares snapshots with load and rejected mutation results', () => {
  const store = createQueueStore();
  const first = store.load(WS);

  const snapshot = store.snapshot(WS);
  const conflict = store.place(WS, { expected_revision: -1, bead_id: 'Q1' });
  const rejected = store.place(WS, { expected_revision: 0, bead_id: '' });
  const unchanged = store.recalibrateSerialLane(WS, { lane: 's1' });
  const invalid_discard = store.createDiscardOperation(WS, {
    expected_revision: -1,
    operation: { operation_id: 'discard', bead_id: 'Q1', source_snapshot: {} }
  });

  expect(snapshot).toBe(first);
  expect(store.snapshot(WS)).toBe(first);
  expect(conflict.queue).toBe(first);
  expect(rejected.queue).toBe(first);
  expect(unchanged.queue).toBe(first);
  expect(invalid_discard.queue).toBe(first);
});

test('replaces the shared snapshot after CAS and scheduler mutations', () => {
  const store = createQueueStore();
  const first = store.snapshot(WS);
  const before = JSON.stringify(first);

  const placed = store.place(WS, { expected_revision: 0, bead_id: 'Q1' });
  const second = store.snapshot(WS);
  const admitted = store.recordAdmission(WS, {
    bead_id: 'Q1',
    reason: 'blocked'
  });

  expect(placed.queue).toBe(second);
  expect(second).not.toBe(first);
  expect(JSON.stringify(first)).toBe(before);
  expect(second.admission).toEqual({});
  expect(admitted.queue).toBe(store.snapshot(WS));
  expect(admitted.queue).not.toBe(second);
  expect(Object.isFrozen(admitted.queue.admission.Q1)).toBe(true);
});

test('refreshes global holds without changing the queue revision', () => {
  const store = createQueueStore();
  const first = store.snapshot(WS);

  const entry = store.providerHolds.enter({
    runner: 'claude',
    origin: WS,
    target: {
      kind: 'outage',
      model: 'opus',
      account: null,
      detail: 'overloaded',
      last_error: '529',
      resets_at: null,
      rearm_count: 0
    }
  });
  const held = store.snapshot(WS);
  store.providerHolds.update(String(entry?.target_id), { last_error: '503' });
  const updated = store.snapshot(WS);
  store.providerHolds.remove(String(entry?.target_id));
  const released = store.snapshot(WS);

  expect(held.revision).toBe(first.revision);
  expect(held).not.toBe(first);
  expect(held.provider_hold.claude.targets[0].last_error).toBe('529');
  expect(updated.revision).toBe(first.revision);
  expect(updated.provider_hold.claude.targets[0].last_error).toBe('503');
  expect(released.revision).toBe(first.revision);
  expect(released.provider_hold).toEqual({});
  expect(first.provider_hold).toEqual({});
  expect(store.snapshot(WS)).toBe(released);
});

test('rejects writes at every snapshot depth', () => {
  const store = createQueueStore();
  store.place(WS, { expected_revision: 0, bead_id: 'Q1' });
  const snapshot = store.snapshot(WS);

  expect(() => {
    snapshot.revision = 100;
  }).toThrow(TypeError);
  expect(() => {
    snapshot.queue[0].bead_id = 'changed';
  }).toThrow(TypeError);
  expect(() => {
    snapshot.queue.push({ bead_id: 'Q2', added_at: 0 });
  }).toThrow(TypeError);
});

test('returns an isolated writable copy only when requested', () => {
  const store = createQueueStore();
  store.place(WS, { expected_revision: 0, bead_id: 'Q1' });
  const snapshot = store.snapshot(WS);

  const copy = store.snapshot(WS, { copy: true, strict: true });
  copy.queue[0].bead_id = 'changed';
  copy.queue.push({ bead_id: 'Q2', added_at: 0 });

  expect(snapshot.queue.map((entry) => entry.bead_id)).toEqual(['Q1']);
  expect(store.snapshot(WS)).toBe(snapshot);
});
