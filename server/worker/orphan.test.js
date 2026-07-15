import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createBreaker } from './breaker.js';
import { createOrphanDetector } from './orphan.js';
import { createQueueStore } from './queue-store.js';

const WS = '/tmp/example-workspace/project-a';
/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-orphan-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

/**
 * @param {any} store
 * @param {Partial<import('./queue-store.js').Attempt>} patch
 * @returns {any}
 */
function seedRunningAttempt(store, patch) {
  store.appendAttempt(WS, {
    expected_revision: store.snapshot(WS).revision,
    attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
  });
  store.updateAttempt(WS, {
    attempt_id: 'att-1',
    patch: {
      status: 'running',
      pid: 4242,
      started_at: 1000,
      repo: '/repo',
      ...patch
    }
  });
  return store;
}

describe('worker/orphan detection (attempt_id + PID + start-time)', () => {
  test('live PID with matching start time is NOT an orphan', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, {});
    const breaker = createBreaker();
    const det = createOrphanDetector({
      store,
      breaker,
      probePid: () => ({ alive: true, started_at: 1000 }),
      now: () => 2000
    });
    expect(det.detect(WS)).toEqual([]);
    expect(store.snapshot(WS).attempts['att-1'].status).toBe('running');
    expect(breaker.anyTripped()).toBe(false);
  });

  test('dead PID is an orphan → failed + breaker tripped, worktree left', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, {});
    const breaker = createBreaker();
    const det = createOrphanDetector({
      store,
      breaker,
      probePid: () => ({ alive: false, started_at: null }),
      now: () => 2000
    });
    const orphans = det.detect(WS);
    expect(orphans).toEqual([
      { attempt_id: 'att-1', bead_id: 'UI-1', repo: '/repo' }
    ]);
    expect(store.snapshot(WS).attempts['att-1'].status).toBe('orphaned');
    expect(breaker.isTripped('/repo')).toBe(true);
  });

  test('recycled PID (alive but start-time mismatch) is an orphan', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, {});
    const breaker = createBreaker();
    const det = createOrphanDetector({
      store,
      breaker,
      // Same PID, but the process started much later → recycled.
      probePid: () => ({ alive: true, started_at: 999999 }),
      now: () => 2000,
      tolerance_ms: 2000
    });
    expect(det.detect(WS)).toHaveLength(1);
    expect(store.snapshot(WS).attempts['att-1'].status).toBe('orphaned');
  });

  test('non-running attempts are ignored', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { status: 'done' });
    const breaker = createBreaker();
    const det = createOrphanDetector({
      store,
      breaker,
      probePid: () => ({ alive: false, started_at: null })
    });
    expect(det.detect(WS)).toEqual([]);
  });
});
