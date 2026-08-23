import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
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

    expect(rt.status(WS)).toEqual({
      auto_advance: true,
      running_count: 2,
      auto_merge: false,
      manual_merge_continuation: {
        schema_version: 1,
        head_review_projection: true
      }
    });
  });

  test('omits the retired breaker_tripped field', () => {
    const rt = createWorkerRuntime();

    const status = rt.status(WS);

    expect(status).toEqual({
      auto_advance: false,
      running_count: 0,
      auto_merge: false,
      manual_merge_continuation: {
        schema_version: 1,
        head_review_projection: true
      }
    });
    expect('breaker_tripped' in status).toBe(false);
  });

  test('reads auto_merge from the actual queue store, independent of the capability', () => {
    const rt = createWorkerRuntime();
    rt.queueStore.toggleAutoMerge(WS, {
      expected_revision: rt.queueStore.snapshot(WS).revision,
      on: true
    });

    const status = rt.status(WS);

    expect(status.auto_merge).toBe(true);
    expect(status.manual_merge_continuation).toEqual({
      schema_version: 1,
      head_review_projection: true
    });
  });

  test('exposes no breaker or token registry', () => {
    const rt = createWorkerRuntime();

    expect(/** @type {any} */ (rt).breaker).toBeUndefined();
    expect(/** @type {any} */ (rt).tokens).toBeUndefined();
    expect(/** @type {any} */ (rt).mergeLock).toBeUndefined();
  });
});

describe('worker/runtime session-log → title-cache wiring (UI-eey2 §9.2)', () => {
  test('expires a bead when the session log sees its bd write complete', () => {
    const rt = createWorkerRuntime();
    const expire = vi.spyOn(rt.titleCache, 'expire');

    rt.sessionLog.publish(WS, 'attempt-1', {
      type: 'item.completed',
      item: {
        type: 'command_execution',
        command: 'bd update UI-1 --set-metadata route=full_plan',
        exit_code: 0
      }
    });

    expect(expire).toHaveBeenCalledWith(WS, 'UI-1');
  });

  test('leaves the cache alone for a bd read', () => {
    const rt = createWorkerRuntime();
    const expire = vi.spyOn(rt.titleCache, 'expire');

    rt.sessionLog.publish(WS, 'attempt-1', {
      type: 'item.completed',
      item: { type: 'command_execution', command: 'bd show UI-1 --json' }
    });

    expect(expire).not.toHaveBeenCalled();
  });
});
