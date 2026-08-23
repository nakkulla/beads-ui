/**
 * Restoration driven by the deploy script's restart marker, which is the only
 * evidence a session-owned quick_fix deploy leaves behind.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createAutoAdvanceRestoreController } from './auto-advance-restore.js';
import { createLockManager } from './locks.js';
import { createQueueStore } from './queue-store.js';

const SOURCE_SHA = 'a'.repeat(40);
const OTHER_SHA = '1'.repeat(40);
const ROOT_SHA = 'b'.repeat(40);
const INSTANCE_ID = '11111111-2222-4333-8444-555555555555';
const OTHER_INSTANCE_ID = '99999999-8888-4777-8666-555555555555';
const PROCESS_STARTED_AT = 1700000000000;

/** @type {string} */
let tmp_root;

beforeEach(() => {
  tmp_root = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-session-marker-'));
});

afterEach(() => {
  fs.rmSync(tmp_root, { recursive: true, force: true });
});

/**
 * @param {string} body
 */
function placeMarker(body) {
  const marker_dir = path.join(tmp_root, '.worktrees');
  fs.mkdirSync(marker_dir, { recursive: true });
  fs.writeFileSync(
    path.join(marker_dir, '.repo-ops-deploy.restart.json'),
    body,
    'utf8'
  );
}

/**
 * @param {Record<string, unknown>} [overrides] - Undefined values drop the key.
 */
function markerBody(overrides = {}) {
  return JSON.stringify({
    schema: 1,
    target_sha: SOURCE_SHA,
    target_base: 'main',
    started_at: PROCESS_STARTED_AT,
    result: 'ok',
    instance_id: INSTANCE_ID,
    finished_at: PROCESS_STARTED_AT + 2000,
    ...overrides
  });
}

/**
 * @param {{ persisted_auto_advance?: boolean, instance_id?: string }} [options]
 */
function createHarness(options = {}) {
  const workspace = path.join(tmp_root, 'workspace');
  const source_repo = path.join(tmp_root, 'release');
  /** @type {() => number} */
  const now = () => 100;
  const file_path = path.join(workspace, 'queue.json');
  const previous_store = createQueueStore({
    now,
    filePathFor: () => file_path
  });
  if (options.persisted_auto_advance === false) {
    previous_store.toggleAutoMerge(workspace, {
      expected_revision: previous_store.snapshot(workspace).revision,
      on: true
    });
  } else {
    previous_store.toggleAutoAdvance(workspace, {
      expected_revision: previous_store.snapshot(workspace).revision,
      on: true
    });
  }
  const store = createQueueStore({ now, filePathFor: () => file_path });
  const notifyChanged = vi.fn(() => {});
  const tick = vi.fn(async () => {});
  const gitRun = vi.fn(async (args) => {
    if (args[0] === 'rev-parse') {
      return {
        code: 0,
        stdout: `${path.join(tmp_root, '.git')}\n`,
        stderr: ''
      };
    }
    return { code: 0, stdout: `${ROOT_SHA}\n`, stderr: '' };
  });
  const controller = createAutoAdvanceRestoreController({
    runtime_identity: {
      source_repo,
      source_sha: SOURCE_SHA,
      process_started_at: PROCESS_STARTED_AT,
      instance_id: options.instance_id ?? INSTANCE_ID
    }
  });
  controller.register({
    workspace,
    repo: workspace,
    store,
    locks: createLockManager(),
    gitRun,
    repairSession: {
      judge: async () => ({ verdict: 'unresolved', evidence: null })
    },
    notifyChanged,
    tick
  });
  return { controller, notifyChanged, store, tick, workspace };
}

/**
 * @param {ReturnType<typeof createHarness>} harness
 */
async function runPass(harness) {
  harness.controller.beforeReconcile(harness.workspace);
  const restore_ready = await harness.controller.afterReconcileLocked(
    harness.workspace
  );
  if (restore_ready) {
    await harness.controller.restoreAll();
  }
}

describe('worker/auto-advance-restore session marker success', () => {
  test('restores after a marker certifies this runtime instance', async () => {
    const harness = createHarness();
    placeMarker(markerBody());

    await runPass(harness);

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
    expect(harness.notifyChanged).toHaveBeenCalledTimes(1);
    expect(harness.tick).toHaveBeenCalledTimes(1);
  });

  test('restores when the marker started in the same second the process did', async () => {
    const harness = createHarness();
    placeMarker(
      markerBody({
        started_at: PROCESS_STARTED_AT,
        finished_at: PROCESS_STARTED_AT
      })
    );

    await runPass(harness);

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });

  test('holds judgment while the end marker is missing and restores once it lands', async () => {
    const harness = createHarness();
    placeMarker(markerBody({ result: undefined, instance_id: undefined }));

    await runPass(harness);
    const while_polling = harness.store.snapshot(
      harness.workspace
    ).auto_advance;
    placeMarker(markerBody());
    await runPass(harness);

    expect(while_polling).toBe(false);
    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(true);
  });
});

describe('worker/auto-advance-restore session marker rejection', () => {
  test('does not restore a marker whose deploy failed', async () => {
    const harness = createHarness();
    placeMarker(markerBody({ result: 'failed', instance_id: undefined }));

    await runPass(harness);

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
    expect(harness.notifyChanged).not.toHaveBeenCalled();
  });

  test('does not restore a marker naming another runtime instance', async () => {
    const harness = createHarness();
    placeMarker(markerBody({ instance_id: OTHER_INSTANCE_ID }));

    await runPass(harness);

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
  });

  test('does not restore a marker that names no runtime instance', async () => {
    const harness = createHarness();
    placeMarker(markerBody({ instance_id: undefined }));

    await runPass(harness);

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
  });

  test('does not restore a marker for another target SHA', async () => {
    const harness = createHarness();
    placeMarker(markerBody({ target_sha: OTHER_SHA }));

    await runPass(harness);

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
  });

  test('does not restore an unreadable marker and does not throw', async () => {
    const harness = createHarness();
    placeMarker('{"schema": 1, "result": "ok"');

    await expect(runPass(harness)).resolves.toBeUndefined();

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
  });

  test('does not restore when no marker exists', async () => {
    const harness = createHarness();

    await runPass(harness);

    expect(harness.store.snapshot(harness.workspace).auto_advance).toBe(false);
  });
});

describe('worker/auto-advance-restore session marker preconditions', () => {
  test('does not restore automation the user had already paused', async () => {
    const harness = createHarness({ persisted_auto_advance: false });
    placeMarker(markerBody());

    await runPass(harness);

    const queue = harness.store.snapshot(harness.workspace);
    expect(queue.auto_advance).toBe(false);
    expect(queue.auto_merge).toBe(true);
  });
});
