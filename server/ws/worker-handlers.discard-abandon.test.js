import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const WS = '/tmp/example/discard-abandon-ws';
const BEAD = 'UI-b93d';
const OPERATION = 'discard-abandon';

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS }]
  };
});

const { setConnWorkspace } = await import('./context.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const { __registerWorkerAttachmentForTest, __resetWorkerAttachmentsForTest } =
  await import('../worker/attach.js');
const handlers = await import('./worker-handlers.js');

/** @type {string} */
let tmp_state;
/** @type {any} */
let store;
/** @type {ReturnType<typeof vi.fn>} */
let abandon;

/**
 * @returns {any}
 */
function fakeSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} message */
    send(message) {
      this.sent.push(String(message));
    }
  };
}

/**
 * @param {Record<string, unknown>} payload
 */
async function click(payload) {
  const socket = fakeSocket();
  setConnWorkspace(socket, { root_dir: WS, db_path: '' });
  await handlers.handleWorkerDiscardAbandon(socket, {
    id: 'request-1',
    type: 'worker-discard-abandon',
    payload
  });
  return JSON.parse(socket.sent.at(-1) || 'null');
}

/** Seed one durable failed requested discard. */
function seedFailedOperation() {
  store.createDiscardOperation(WS, {
    expected_revision: store.snapshot(WS).revision,
    operation: {
      operation_id: OPERATION,
      bead_id: BEAD,
      source_snapshot: { repo: '/repo', branch: BEAD }
    }
  });
  store.failDiscardOperation(WS, {
    operation_id: OPERATION,
    expected_phase: 'requested',
    reason: 'archive_failed'
  });
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-discard-abandon-'));
  process.env.XDG_STATE_HOME = tmp_state;
  handlers.__resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  store = getWorkerRuntime().queueStore;
  abandon = vi.fn(async (operation_id) => {
    const written = store.abandonDiscardOperation(WS, {
      operation_id,
      resume: null
    });
    return written.ok
      ? { ok: true, operation_id, phase: 'abandoned', resume: null }
      : { ok: false, reason: written.reason };
  });
  __registerWorkerAttachmentForTest(
    WS,
    /** @type {any} */ ({ discardCoordinator: { abandon } })
  );
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  vi.restoreAllMocks();
  handlers.__resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('worker-discard-abandon', () => {
  test('rejects an incomplete payload', async () => {
    const reply = await click({ bead_id: BEAD, expected_revision: 0 });

    expect(reply).toMatchObject({ ok: false, error: { code: 'bad_request' } });
    expect(abandon).not.toHaveBeenCalled();
  });

  test('returns the current queue on revision conflict', async () => {
    seedFailedOperation();
    const timeline = vi.spyOn(store, 'recordTimelineEvent');

    const reply = await click({
      bead_id: BEAD,
      operation_id: OPERATION,
      expected_revision: 0
    });

    expect(reply.payload).toMatchObject({
      bead_id: BEAD,
      operation_id: OPERATION,
      abandoned: false,
      conflict: true,
      reason: null,
      resume: null
    });
    expect(abandon).not.toHaveBeenCalled();
    expect(timeline).toHaveBeenCalledTimes(1);
  });

  test('returns abandonment and excludes it from public projection', async () => {
    seedFailedOperation();
    const timeline = vi.spyOn(store, 'recordTimelineEvent');
    const expected_revision = store.snapshot(WS).revision;

    const reply = await click({
      bead_id: BEAD,
      operation_id: OPERATION,
      expected_revision
    });

    expect(reply.payload).toMatchObject({
      bead_id: BEAD,
      operation_id: OPERATION,
      abandoned: true,
      conflict: false,
      reason: null,
      resume: null,
      queue: { discard_operations: {} }
    });
    expect(timeline.mock.calls.map((call) => call[1])).toEqual([
      expect.objectContaining({
        kind: 'user_action',
        seq: `discard_abandon:${expected_revision}`,
        summary: '[폐기 포기] 클릭'
      }),
      expect.objectContaining({
        kind: 'user_action',
        seq: `discard_abandoned:${expected_revision + 1}`,
        summary: '폐기 포기 — 폐기 미수행 (원인: archive_failed)'
      })
    ]);
  });

  test('records only the click when abandonment is refused', async () => {
    seedFailedOperation();
    abandon.mockResolvedValueOnce({
      ok: false,
      reason: 'phase_not_abandonable'
    });
    const timeline = vi.spyOn(store, 'recordTimelineEvent');

    const reply = await click({
      bead_id: BEAD,
      operation_id: OPERATION,
      expected_revision: store.snapshot(WS).revision
    });

    expect(reply.payload).toMatchObject({
      abandoned: false,
      conflict: false,
      reason: 'phase_not_abandonable'
    });
    expect(timeline).toHaveBeenCalledTimes(1);
    expect(timeline.mock.calls[0][1]).toMatchObject({
      seq: expect.stringMatching(/^discard_abandon:/),
      summary: '[폐기 포기] 클릭'
    });
  });

  test('hides operation existence when the bead binding differs', async () => {
    seedFailedOperation();

    const reply = await click({
      bead_id: 'UI-other',
      operation_id: OPERATION,
      expected_revision: store.snapshot(WS).revision
    });

    expect(reply.payload).toMatchObject({
      abandoned: false,
      reason: 'operation_not_found'
    });
    expect(abandon).not.toHaveBeenCalled();
  });
});
