import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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

  test('orphaning reverts workflow_mode: prior=null → unsetMetadata [F6]', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = {
      setMetadata: vi.fn(async () => {}),
      unsetMetadata: vi.fn(async () => {})
    };
    const det = createOrphanDetector({
      store,
      breaker: createBreaker(),
      bd,
      probePid: () => ({ alive: false, started_at: null })
    });
    det.detect(WS);
    expect(bd.unsetMetadata).toHaveBeenCalledWith('UI-1', 'workflow_mode');
    expect(bd.setMetadata).not.toHaveBeenCalled();
  });

  test('orphaning reverts workflow_mode: prior set → setMetadata back [F6]', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: 'x' });
    const bd = {
      setMetadata: vi.fn(async () => {}),
      unsetMetadata: vi.fn(async () => {})
    };
    const det = createOrphanDetector({
      store,
      breaker: createBreaker(),
      bd,
      probePid: () => ({ alive: false, started_at: null })
    });
    det.detect(WS);
    expect(bd.setMetadata).toHaveBeenCalledWith('UI-1', 'workflow_mode', 'x');
    expect(bd.unsetMetadata).not.toHaveBeenCalled();
  });

  test('orphaning reverts exec_stamped_keys via unsetMetadata', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, {
      workflow_mode_prior: null,
      exec_stamped_keys: ['worker_runner', 'orchestration_model']
    });
    const bd = {
      setMetadata: vi.fn(async () => {}),
      unsetMetadata: vi.fn(async () => {})
    };
    const det = createOrphanDetector({
      store,
      breaker: createBreaker(),
      bd,
      probePid: () => ({ alive: false, started_at: null })
    });
    det.detect(WS);
    // Each stamped exec key is unset, plus workflow_mode (prior null → unset).
    expect(bd.unsetMetadata).toHaveBeenCalledWith('UI-1', 'worker_runner');
    expect(bd.unsetMetadata).toHaveBeenCalledWith('UI-1', 'orchestration_model');
    expect(bd.unsetMetadata).toHaveBeenCalledWith('UI-1', 'workflow_mode');
    expect(bd.setMetadata).not.toHaveBeenCalled();
  });

  test('no exec_stamped_keys → no exec unset calls', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = {
      setMetadata: vi.fn(async () => {}),
      unsetMetadata: vi.fn(async () => {})
    };
    const det = createOrphanDetector({
      store,
      breaker: createBreaker(),
      bd,
      probePid: () => ({ alive: false, started_at: null })
    });
    det.detect(WS);
    // Only workflow_mode is unset; no exec keys were stamped.
    expect(bd.unsetMetadata).toHaveBeenCalledTimes(1);
    expect(bd.unsetMetadata).toHaveBeenCalledWith('UI-1', 'workflow_mode');
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
