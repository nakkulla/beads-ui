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
  test('reports auto_advance and running_count', () => {
    const rt = createWorkerRuntime();

    rt.queueStore.setAutoAdvance(WS, true);
    rt.setRunningCountProvider(() => 2);

    expect(rt.status(WS)).toEqual({ auto_advance: true, running_count: 2 });
  });

  test('omits the retired breaker_tripped field', () => {
    const rt = createWorkerRuntime();

    const status = rt.status(WS);

    expect(status).toEqual({ auto_advance: false, running_count: 0 });
    expect('breaker_tripped' in status).toBe(false);
  });

  test('exposes no breaker or token registry', () => {
    const rt = createWorkerRuntime();

    expect(/** @type {any} */ (rt).breaker).toBeUndefined();
    expect(/** @type {any} */ (rt).tokens).toBeUndefined();
    expect(/** @type {any} */ (rt).mergeLock).toBeUndefined();
  });
});
