import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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
    const det = createOrphanDetector({
      store,
      probePid: () => ({ alive: true, started_at: 1000 }),
      now: () => 2000
    });
    store.setAutoAdvance(WS, true);

    expect(det.detect(WS)).toEqual([]);
    expect(store.snapshot(WS).attempts['att-1'].status).toBe('running');
    // No orphan → the queue keeps running.
    expect(store.snapshot(WS).auto_advance).toBe(true);
  });

  test('dead PID is an orphan → orphaned + auto_advance OFF, worktree left', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, {});
    const det = createOrphanDetector({
      store,
      probePid: () => ({ alive: false, started_at: null }),
      now: () => 2000
    });
    const orphans = det.detect(WS);
    expect(orphans).toEqual([
      { attempt_id: 'att-1', bead_id: 'UI-1', repo: '/repo' }
    ]);
    expect(store.snapshot(WS).attempts['att-1'].status).toBe('orphaned');
  });

  test('an orphan turns auto_advance OFF so the queue stops', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, {});
    store.setAutoAdvance(WS, true);
    const det = createOrphanDetector({
      store,
      probePid: () => ({ alive: false, started_at: null }),
      now: () => 2000
    });

    det.detect(WS);

    expect(store.snapshot(WS).auto_advance).toBe(false);
  });

  test('an orphan without a repo still turns auto_advance OFF', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { repo: null });
    store.setAutoAdvance(WS, true);
    const det = createOrphanDetector({
      store,
      probePid: () => ({ alive: false, started_at: null }),
      now: () => 2000
    });

    det.detect(WS);

    expect(store.snapshot(WS).auto_advance).toBe(false);
  });

  test('recycled PID (alive but start-time mismatch) is an orphan', () => {
    const store = createQueueStore();
    seedRunningAttempt(store, {});
    const det = createOrphanDetector({
      store,
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
      bd,
      probePid: () => ({ alive: false, started_at: null })
    });
    det.detect(WS);
    // Each stamped exec key is unset, plus workflow_mode (prior null → unset).
    expect(bd.unsetMetadata).toHaveBeenCalledWith('UI-1', 'worker_runner');
    expect(bd.unsetMetadata).toHaveBeenCalledWith(
      'UI-1',
      'orchestration_model'
    );
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
    const det = createOrphanDetector({
      store,
      probePid: () => ({ alive: false, started_at: null })
    });
    expect(det.detect(WS)).toEqual([]);
  });
});

describe('worker/orphan claim release (close-less termination)', () => {
  /**
   * @param {string} status - The bead status the dead session left behind.
   */
  function bdAt(status) {
    /** @type {{ status: string }} */
    const record = { status };
    return {
      record,
      setMetadata: vi.fn(async () => {}),
      unsetMetadata: vi.fn(async () => {}),
      setStatus: vi.fn(
        async (/** @type {string} */ _id, /** @type {string} */ next) => {
          record.status = next;
        }
      ),
      readStatus: vi.fn(async () => record.status)
    };
  }

  /**
   * @returns {Promise<void>}
   */
  function flush() {
    return new Promise((r) => setImmediate(r));
  }

  test('reopens a bead the dead session left in_progress', async () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = bdAt('in_progress');
    const det = createOrphanDetector({
      store,
      bd,
      probePid: () => ({ alive: false, started_at: null })
    });

    det.detect(WS);
    await flush();

    expect(bd.setStatus).toHaveBeenCalledWith('UI-1', 'open');
  });

  test('leaves a resolved bead untouched', async () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = bdAt('resolved');
    const det = createOrphanDetector({
      store,
      bd,
      probePid: () => ({ alive: false, started_at: null })
    });

    det.detect(WS);
    await flush();

    expect(bd.setStatus).not.toHaveBeenCalled();
  });

  test('calls onBeadRecovered once the reopen is confirmed', async () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = bdAt('in_progress');
    const onBeadRecovered = vi.fn();
    const det = createOrphanDetector({
      store,
      bd,
      onBeadRecovered,
      probePid: () => ({ alive: false, started_at: null })
    });

    det.detect(WS);
    await flush();

    expect(onBeadRecovered).toHaveBeenCalledWith(WS, 'UI-1');
  });

  test('does not call onBeadRecovered when nothing was reopened', async () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = bdAt('resolved');
    const onBeadRecovered = vi.fn();
    const det = createOrphanDetector({
      store,
      bd,
      onBeadRecovered,
      probePid: () => ({ alive: false, started_at: null })
    });

    det.detect(WS);
    await flush();

    expect(onBeadRecovered).not.toHaveBeenCalled();
  });

  test('does not call onBeadRecovered when the reopen readback disagrees', async () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = bdAt('in_progress');
    // The write is accepted but the status never actually moves.
    bd.setStatus.mockImplementation(async () => {});
    const onBeadRecovered = vi.fn();
    const det = createOrphanDetector({
      store,
      bd,
      onBeadRecovered,
      probePid: () => ({ alive: false, started_at: null })
    });

    det.detect(WS);
    await flush();

    expect(onBeadRecovered).not.toHaveBeenCalled();
  });

  test('reaps the orphan even when the status query fails', async () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = bdAt('in_progress');
    bd.readStatus.mockRejectedValue(new Error('bd down'));
    const onBeadRecovered = vi.fn();
    const det = createOrphanDetector({
      store,
      bd,
      onBeadRecovered,
      probePid: () => ({ alive: false, started_at: null })
    });

    const orphans = det.detect(WS);
    await flush();

    expect(orphans).toHaveLength(1);
    expect(store.snapshot(WS).attempts['att-1'].status).toBe('orphaned');
    expect(onBeadRecovered).not.toHaveBeenCalled();
  });

  test('skips the release when the bd dep offers no status pair', async () => {
    const store = createQueueStore();
    seedRunningAttempt(store, { workflow_mode_prior: null });
    const bd = {
      setMetadata: vi.fn(async () => {}),
      unsetMetadata: vi.fn(async () => {})
    };
    const det = createOrphanDetector({
      store,
      bd,
      probePid: () => ({ alive: false, started_at: null })
    });

    const orphans = det.detect(WS);
    await flush();

    expect(orphans).toHaveLength(1);
  });
});
