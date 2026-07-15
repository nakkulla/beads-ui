import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createWorkerRuntime } from './runtime.js';

const WS = '/tmp/example-workspace/project-a';
/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-rt-'));
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

describe('worker/runtime status', () => {
  test('reports auto_advance, running_count, breaker_tripped', () => {
    const rt = createWorkerRuntime();
    expect(rt.status(WS)).toEqual({
      auto_advance: false,
      running_count: 0,
      breaker_tripped: false
    });

    rt.queueStore.setAutoAdvance(WS, true);
    rt.setRunningCountProvider(() => 2);
    rt.breaker.trip('/repo', { bead_id: 'UI-1', cause: 'verify_failed' });

    expect(rt.status(WS)).toEqual({
      auto_advance: true,
      running_count: 2,
      breaker_tripped: true
    });
  });

  test('merge lock is breaker-aware through the shared breaker', async () => {
    const rt = createWorkerRuntime();
    rt.breaker.trip('/repo', { bead_id: 'UI-1', cause: 'x' });
    await expect(rt.locks.acquireMerge('/repo', 'main')).rejects.toMatchObject({
      code: 'MERGE_BLOCKED'
    });
  });
});
