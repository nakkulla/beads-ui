import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest,
  enqueueWorkerManualMerge
} from './attach.js';
import { __resetWorkerRuntimeForTest, getWorkerRuntime } from './runtime.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/manual-merge';
const HEAD = 'a'.repeat(40);

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-manual-merge-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetWorkerRuntimeForTest();
  __resetWorkerAttachmentsForTest();
});

afterEach(() => {
  __resetWorkerAttachmentsForTest();
  __resetWorkerRuntimeForTest();
  delete process.env.XDG_STATE_HOME;
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

function seedLane() {
  const store = getWorkerRuntime().queueStore;
  store.appendAttempt(WS, {
    expected_revision: 0,
    attempt: { attempt_id: 'att-UI-1', bead_id: 'UI-1' }
  });
  store.moveToPrWait(WS, {
    bead_id: 'UI-1',
    attempt_id: 'att-UI-1',
    patch: { status: 'done', finished_at: 1 }
  });
  return store;
}

/**
 * @param {any} probe
 */
function registerAttachment(probe) {
  __registerWorkerAttachmentForTest(WS, {
    prActions: {
      probeMergeability: async () => probe
    }
  });
}

describe('worker/attach — enqueueWorkerManualMerge (UI-58w8 §1)', () => {
  test('records a manual authority from the click-time authoritative probe', async () => {
    const store = seedLane();
    registerAttachment({
      ok: false,
      kind: 'blocked',
      reason: 'review_receipt_stale',
      head_sha: HEAD,
      base_ref: 'main',
      external: false
    });

    const result = await enqueueWorkerManualMerge(WS, {
      bead_id: 'UI-1',
      expected_revision: store.snapshot(WS).revision
    });

    expect(result.ok).toBe(true);
    expect(store.snapshot(WS).merge_queue[0].authority).toMatchObject({
      source: 'manual',
      requested_head_sha: HEAD,
      target_base: 'main'
    });
  });

  test('makes no queue effect when the PR identity is unreadable', async () => {
    const store = seedLane();
    registerAttachment({
      ok: false,
      kind: 'blocked',
      reason: 'pr_ref_unknown',
      head_sha: null,
      base_ref: null,
      external: false
    });

    const result = await enqueueWorkerManualMerge(WS, {
      bead_id: 'UI-1',
      expected_revision: store.snapshot(WS).revision
    });

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });

  test('fails closed without an attachment to observe through', async () => {
    const store = seedLane();

    const result = await enqueueWorkerManualMerge(WS, {
      bead_id: 'UI-1',
      expected_revision: store.snapshot(WS).revision
    });

    expect(result.ok).toBe(false);
    expect(store.snapshot(WS).merge_queue).toEqual([]);
  });
});
