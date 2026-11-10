import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createQueueStore } from './queue-store.js';
import { queueFilePath, workspaceStateDir } from './state-paths.js';

const WS = '/tmp/example-workspace/closed-cleanup';

/** @type {string} */
let tmp_state;
/** @type {string|undefined} */
let prior_state_home;

beforeEach(() => {
  prior_state_home = process.env.XDG_STATE_HOME;
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-closed-cleanup-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  if (prior_state_home === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = prior_state_home;
  }
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * A store holding each bead in `pr_wait` with one finished attempt.
 *
 * @param {string[]} bead_ids
 */
function parkedStore(bead_ids) {
  const store = createQueueStore({ now: () => 500 });
  for (const bead_id of bead_ids) {
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: `att-${bead_id}`,
        bead_id,
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.moveToPrWait(WS, {
      bead_id,
      attempt_id: `att-${bead_id}`,
      patch: { status: 'done', finished_at: 1 }
    });
  }
  return store;
}

/**
 * @param {ReturnType<typeof createQueueStore>} store
 * @param {string} bead_id
 */
function shelve(store, bead_id) {
  return store.setMergeShelved(WS, {
    expected_revision: store.snapshot(WS).revision,
    bead_id,
    on: true
  });
}

describe('worker/queue-store retireClosedPrWait (UI-26du)', () => {
  test('removes the pr_wait row and its shelf without adding a done row', () => {
    const store = parkedStore(['UI-1']);
    shelve(store, 'UI-1');

    const result = store.retireClosedPrWait(WS, 'UI-1');

    expect(result.ok).toBe(true);
    expect(result.queue.pr_wait).toEqual([]);
    expect(result.queue.merge_shelved).toEqual({});
    expect(result.queue.done).toEqual([]);
  });

  test('refuses a row whose post-merge cleanup already started', () => {
    const store = parkedStore(['UI-1']);
    store.setCleanupCursor(WS, {
      bead_id: 'UI-1',
      cursor: 'base_containment',
      merge_sha: 'c'.repeat(40)
    });

    const result = store.retireClosedPrWait(WS, 'UI-1');

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).pr_wait.map((row) => row.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('refuses a row while an attempt of the bead is still running', () => {
    const store = parkedStore(['UI-1']);
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'att-UI-1-review',
        bead_id: 'UI-1',
        status: 'running',
        target_base: 'main'
      }
    });

    const result = store.retireClosedPrWait(WS, 'UI-1');

    expect(result.ok).toBe(false);
  });

  test('passes over a paused attempt a later attempt already resumed', () => {
    const store = parkedStore(['UI-1']);
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'att-UI-1-paused',
        bead_id: 'UI-1',
        status: 'paused',
        target_base: 'main'
      }
    });
    store.appendAttempt(WS, {
      expected_revision: store.snapshot(WS).revision,
      attempt: {
        attempt_id: 'att-UI-1-child',
        bead_id: 'UI-1',
        status: 'done',
        resumed_from: 'att-UI-1-paused',
        target_base: 'main'
      }
    });

    const result = store.retireClosedPrWait(WS, 'UI-1');

    expect(result.ok).toBe(true);
  });

  test('refuses a row holding a merge-queue turn', () => {
    const store = parkedStore(['UI-1']);
    store.enqueueMergeManual(WS, {
      expected_revision: store.snapshot(WS).revision,
      entries: [
        { bead_id: 'UI-1', head_sha: 'a'.repeat(40), target_base: 'main' }
      ]
    });

    const result = store.retireClosedPrWait(WS, 'UI-1');

    expect(store.snapshot(WS).merge_queue.length).toBe(1);
    expect(result.ok).toBe(false);
  });
});

describe('worker/queue-store dropClosedRecords (UI-26du)', () => {
  test('drops admission and legacy reconcile records of closed beads only', () => {
    fs.mkdirSync(workspaceStateDir(WS), { recursive: true });
    fs.writeFileSync(
      queueFilePath(WS),
      JSON.stringify({
        admission: {
          'UI-1': { reason: 'failed_unhandled', at: 1 },
          'UI-2': { reason: 'worker_ineligible', at: 2 }
        },
        reconcile: {
          'UI-1': { bead_id: 'UI-1', stage: 'failed' },
          'UI-3': { bead_id: 'UI-3', stage: 'failed' }
        }
      })
    );
    const store = createQueueStore({ now: () => 500 });

    const result = store.dropClosedRecords(WS, {
      'UI-1': 'closed',
      'UI-2': 'open',
      'UI-3': 'resolved'
    });

    expect(result.ok).toBe(true);
    expect(Object.keys(result.queue.admission)).toEqual(['UI-2']);
    expect(
      Object.keys(/** @type {any} */ (store.snapshot(WS)).reconcile)
    ).toEqual(['UI-3']);
  });

  test('writes nothing when no closed bead holds a record', () => {
    const store = parkedStore(['UI-1']);
    store.recordAdmission(WS, { bead_id: 'UI-2', reason: 'worker_ineligible' });
    const revision = store.snapshot(WS).revision;

    const result = store.dropClosedRecords(WS, { 'UI-2': 'open' });

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).revision).toBe(revision);
  });
});
