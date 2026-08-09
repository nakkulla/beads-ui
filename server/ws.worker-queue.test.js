import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MESSAGE_TYPES } from '../app/protocol.js';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest
} from './worker/attach.js';
import { getWorkerRuntime } from './worker/runtime.js';
import {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} from './ws.js';
import { getConnWorkspace, setConnWorkspace } from './ws/context.js';
import { workerQueueSubscriberCount } from './ws/worker-handlers.js';

/** @type {string} */
let tmp_state;

/**
 * A minimal fake socket that records everything the server sends.
 *
 * @returns {{ sent: string[], readyState: number, OPEN: number, send(msg: string): void }}
 */
function fakeSocket() {
  return {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} msg */
    send(msg) {
      this.sent.push(String(msg));
    }
  };
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @param {string} type
 * @param {Record<string, unknown>} [payload]
 * @returns {Promise<any>}
 */
async function send(sock, id, type, payload) {
  await handleMessage(
    /** @type {any} */ (sock),
    Buffer.from(JSON.stringify({ id, type, payload }))
  );
}

/**
 * @param {{ sent: string[] }} sock
 * @param {string} id
 * @returns {any}
 */
function replyFor(sock, id) {
  for (const raw of sock.sent) {
    const m = JSON.parse(raw);
    if (m.id === id) {
      return m;
    }
  }
  return null;
}

/**
 * @param {{ sent: string[] }} sock
 * @returns {any[]}
 */
function queueSnapshots(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'worker-queue-snapshot')
    .map((m) => m.payload.queue);
}

/**
 * The whole snapshot payload (envelope addressing included), not just `queue`.
 *
 * @param {{ sent: string[] }} sock
 * @returns {any[]}
 */
function queueSnapshotPayloads(sock) {
  return sock.sent
    .map((m) => JSON.parse(m))
    .filter((m) => m.type === 'worker-queue-snapshot')
    .map((m) => m.payload);
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wsq-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  // Seed DEFAULT_WORKSPACE so bare sockets resolve a deterministic workspace.
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('ws worker-queue channel', () => {
  test('subscribe emits an initial queue snapshot', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    expect(replyFor(sock, 's1').ok).toBe(true);
    const snaps = queueSnapshots(sock);
    expect(snaps.length).toBe(1);
    expect(snaps[0]).toMatchObject({ revision: 0, queue: [], slots: 2 });
  });

  test('place bumps revision and pushes a fresh snapshot to subscribers', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.queue.revision).toBe(1);

    const snaps = queueSnapshots(sock);
    expect(snaps.length).toBe(1);
    expect(snaps[0].revision).toBe(1);
    expect(snaps[0].queue.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('stale-revision place returns a conflict + current snapshot, no push', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });
    sock.sent = [];

    // A second client still thinks revision is 0.
    await send(sock, 'm2', 'worker-queue-place', {
      bead_id: 'UI-2',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm2');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(true);
    // Current snapshot returned so the client can re-sync + retry.
    expect(reply.payload.queue.revision).toBe(1);
    expect(
      reply.payload.queue.queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1']);
    // No fanout snapshot on conflict.
    expect(queueSnapshots(sock).length).toBe(0);
  });

  test('remove pushes an updated snapshot', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });
    sock.sent = [];

    await send(sock, 'm2', 'worker-queue-remove', {
      bead_id: 'UI-1',
      expected_revision: 1
    });
    const snaps = queueSnapshots(sock);
    expect(snaps.at(-1).queue).toEqual([]);
    expect(snaps.at(-1).revision).toBe(2);
  });

  test('two subscribers both receive the fanout snapshot', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-worker-queue', { id: 'wq-a' });
    await send(b, 'sb', 'subscribe-worker-queue', { id: 'wq-b' });
    a.sent = [];
    b.sent = [];

    await send(a, 'm1', 'worker-queue-place', {
      bead_id: 'UI-9',
      expected_revision: 0
    });

    const snapA = queueSnapshots(a);
    const snapB = queueSnapshots(b);
    expect(snapA.length).toBe(1);
    expect(snapB.length).toBe(1);
    expect(snapA[0].queue.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-9'
    ]);
    expect(snapB[0].queue.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-9'
    ]);
  });

  test('toggle persists auto_advance and pushes', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-toggle', {
      on: true,
      expected_revision: 0
    });
    const snaps = queueSnapshots(sock);
    expect(snaps.at(-1).auto_advance).toBe(true);
  });

  test('toggle ON kicks the live tick; worker-attempt-stop halts an attempt [F1]', async () => {
    const tick = vi.fn(async () => {});
    const stop = vi.fn(async () => true);
    // A registered (fake) attachment for the connection workspace (process.cwd()).
    __registerWorkerAttachmentForTest(process.cwd(), {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick, stop }
    });

    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-toggle', {
      on: true,
      expected_revision: 0
    });
    // The toggle handler kicked the dispatch loop for this workspace.
    expect(tick).toHaveBeenCalledWith(process.cwd());

    await send(sock, 'm2', 'worker-attempt-stop', { attempt_id: 'att-1' });
    expect(stop).toHaveBeenCalledWith(process.cwd(), 'att-1');
    const reply = replyFor(sock, 'm2');
    expect(reply.ok).toBe(true);
    expect(reply.payload.stopped).toBe(true);
  });

  test('worker-attempt-pause reaches the scheduler and its refusal carries a reason (worker-phase1 §5)', async () => {
    const pause = vi
      .fn()
      .mockResolvedValueOnce({ ok: true })
      .mockResolvedValueOnce({ ok: false, reason: 'no_session_id' });
    __registerWorkerAttachmentForTest(process.cwd(), {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick: vi.fn(), stop: vi.fn(), pause }
    });

    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'p1', 'worker-attempt-pause', { attempt_id: 'att-1' });
    expect(pause).toHaveBeenCalledWith(process.cwd(), 'att-1');
    const ok_reply = replyFor(sock, 'p1');
    expect(ok_reply.ok).toBe(true);
    expect(ok_reply.payload.paused).toBe(true);
    expect(ok_reply.payload.reason).toBe(null);

    await send(sock, 'p2', 'worker-attempt-pause', { attempt_id: 'att-2' });
    const refused = replyFor(sock, 'p2');
    expect(refused.payload.paused).toBe(false);
    expect(refused.payload.reason).toBe('no_session_id');
  });

  test('every worker ws route the server switches on is a client-sendable MESSAGE_TYPE', () => {
    // The client transport drops any type missing from MESSAGE_TYPES before it
    // reaches the socket, so a server-only route is silently dead in the browser.
    for (const type of [
      'worker-attempt-pause',
      'worker-attempt-stop',
      'worker-attempt-resume',
      'worker-queue-toggle',
      'worker-queue-place',
      'worker-queue-reorder',
      'worker-queue-remove',
      'worker-queue-set-exec-default',
      'worker-merge-queue-add',
      'worker-merge-queue-add-all',
      'worker-merge-queue-remove',
      'worker-pr-discard'
    ]) {
      expect(MESSAGE_TYPES).toContain(type);
    }
  });

  test('an admission-refused place records the reason so every client sees the badge (review finding 4)', async () => {
    let refuse = true;
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        admission: {
          check: async () =>
            refuse ? { ok: false, reason: 'spec_missing' } : { ok: true }
        }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-7',
      expected_revision: 0
    });
    const refused = replyFor(sock, 'm1');
    expect(refused.payload.applied).toBe(false);
    expect(refused.payload.admission_reason).toBe('spec_missing');
    // The refusal is PERSISTED on the queue (badge source), not reply-only.
    expect(refused.payload.queue.admission['UI-7'].reason).toBe('spec_missing');
    expect(refused.payload.queue.queue).toEqual([]);

    // A later admission-passing place clears the stale record.
    refuse = false;
    await send(sock, 'm2', 'worker-queue-place', {
      bead_id: 'UI-7',
      expected_revision: refused.payload.queue.revision
    });
    const placed = replyFor(sock, 'm2');
    expect(placed.payload.applied).toBe(true);
    expect(placed.payload.queue.admission['UI-7']).toBeUndefined();
    expect(
      placed.payload.queue.queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-7']);
  });

  test('a stale-but-admitted place enters the lane wearing a non-blocking mark (UI-dlim §3.2)', async () => {
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        admission: {
          check: async () => ({
            ok: true,
            stale: { receipt_sha: 'a'.repeat(40), delta_shas: ['b'.repeat(40)] }
          })
        }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-8',
      expected_revision: 0
    });

    const placed = replyFor(sock, 'm1');
    expect(placed.payload.applied).toBe(true);
    expect(
      placed.payload.queue.queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-8']);
    expect(placed.payload.queue.admission['UI-8']).toEqual({
      reason: 'spec_review_stale',
      at: expect.any(Number),
      stale: true
    });
  });

  test('a successful place kicks the live tick (discard spec §1)', async () => {
    // The drag into 대기 is the ONLY dispatch path a discarded bead has, so the
    // placement itself must ask for a dispatch.
    const tick = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick, stop: vi.fn() },
        admission: { check: async () => ({ ok: true }) }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-7',
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').payload.applied).toBe(true);
    expect(tick).toHaveBeenCalledWith(process.cwd());
  });

  test('a stale-revision place kicks no tick', async () => {
    const tick = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick, stop: vi.fn() },
        admission: { check: async () => ({ ok: true }) }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-7',
      expected_revision: 99
    });

    expect(replyFor(sock, 'm1').payload.conflict).toBe(true);
    expect(tick).not.toHaveBeenCalled();
  });

  test('toggle ON kicks a tick with no breaker reset in between', async () => {
    // The breaker-reset step is gone with the breaker (worker-phase2 §2): ▶ is
    // simply auto_advance ON + a tick.
    const tick = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick, stop: vi.fn() },
        repo: '/repo'
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-toggle', {
      on: true,
      expected_revision: 0
    });

    expect(tick).toHaveBeenCalledWith(process.cwd());
  });

  test('worker-queue-set-policy is no longer a routed message type', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', /** @type {any} */ ('worker-queue-set-policy'), {
      key: 'merge_policy',
      value: 'pr_stop',
      expected_revision: 0
    });

    expect(MESSAGE_TYPES).not.toContain('worker-queue-set-policy');
    expect(replyFor(sock, 'm1')?.payload?.applied).toBe(undefined);
  });

  test('toggle OFF does not kick a tick', async () => {
    const tick = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(process.cwd(), {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick, stop: vi.fn() }
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-toggle', {
      on: false,
      expected_revision: 0
    });
    expect(tick).not.toHaveBeenCalled();
  });
});

describe('ws worker-queue-set-exec-default [Phase 2]', () => {
  test('set reflects the value, bumps revision, and pushes a fresh snapshot', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-set-exec-default', {
      key: 'spec_review_model',
      value: 'codex',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.conflict).toBe(false);
    expect(reply.payload.queue.revision).toBe(1);
    expect(reply.payload.queue.exec_defaults.spec_review_model).toBe('codex');

    const snaps = queueSnapshots(sock);
    expect(snaps.length).toBe(1);
    expect(snaps.at(-1).exec_defaults.spec_review_model).toBe('codex');
  });

  test('unset (null) deletes the key', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-set-exec-default', {
      key: 'spec_review_model',
      value: 'codex',
      expected_revision: 0
    });
    sock.sent = [];

    await send(sock, 'm2', 'worker-queue-set-exec-default', {
      key: 'spec_review_model',
      value: null,
      expected_revision: 1
    });
    const reply = replyFor(sock, 'm2');
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.queue.revision).toBe(2);
    expect(reply.payload.queue.exec_defaults.spec_review_model).toBeUndefined();
    expect(
      queueSnapshots(sock).at(-1).exec_defaults.spec_review_model
    ).toBeUndefined();
  });

  test('unset with an empty string also deletes the key', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-set-exec-default', {
      key: 'impl_model',
      value: 'opus',
      expected_revision: 0
    });

    await send(sock, 'm2', 'worker-queue-set-exec-default', {
      key: 'impl_model',
      value: '',
      expected_revision: 1
    });
    const reply = replyFor(sock, 'm2');
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.queue.exec_defaults.impl_model).toBeUndefined();
  });

  test('a non-enum value is rejected without a write and without a fanout', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-set-exec-default', {
      key: 'spec_review_model',
      value: 'not-a-runner',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(false);
    // Store unchanged: revision still 0, key absent.
    expect(reply.payload.queue.revision).toBe(0);
    expect(reply.payload.queue.exec_defaults.spec_review_model).toBeUndefined();
    // No fanout on a rejected mutation.
    expect(queueSnapshots(sock).length).toBe(0);
  });

  test('an unknown key is rejected without a write', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-set-exec-default', {
      key: 'workflow_mode',
      value: 'yolo',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm1');
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(false);
    expect(reply.payload.queue.revision).toBe(0);
    expect(reply.payload.queue.exec_defaults.workflow_mode).toBeUndefined();
    expect(queueSnapshots(sock).length).toBe(0);
  });

  test('a missing key errors with bad_request', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-set-exec-default', {
      value: 'codex',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
    expect(queueSnapshots(sock).length).toBe(0);
  });

  test('stale-revision set returns a conflict + current snapshot, no push', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-set-exec-default', {
      key: 'spec_review_model',
      value: 'codex',
      expected_revision: 0
    });
    sock.sent = [];

    // A second client still thinks revision is 0.
    await send(sock, 'm2', 'worker-queue-set-exec-default', {
      key: 'spec_review_model',
      value: 'claude',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm2');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(true);
    // Current snapshot returned so the client can re-sync + retry.
    expect(reply.payload.queue.revision).toBe(1);
    expect(reply.payload.queue.exec_defaults.spec_review_model).toBe('codex');
    // No fanout snapshot on conflict.
    expect(queueSnapshots(sock).length).toBe(0);
  });

  test('two subscribers both receive the exec-default fanout snapshot', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    await send(a, 'sa', 'subscribe-worker-queue', { id: 'wq-a' });
    await send(b, 'sb', 'subscribe-worker-queue', { id: 'wq-b' });
    a.sent = [];
    b.sent = [];

    await send(a, 'm1', 'worker-queue-set-exec-default', {
      key: 'orchestration_effort',
      value: 'high',
      expected_revision: 0
    });

    const snapA = queueSnapshots(a);
    const snapB = queueSnapshots(b);
    expect(snapA.length).toBe(1);
    expect(snapB.length).toBe(1);
    expect(snapA.at(-1).exec_defaults.orchestration_effort).toBe('high');
    expect(snapB.at(-1).exec_defaults.orchestration_effort).toBe('high');
  });
});

describe('ws worker-queue-set-slots (worker-phase2 §3)', () => {
  test('is a routed message type', () => {
    expect(MESSAGE_TYPES).toContain('worker-queue-set-slots');
  });

  test('set persists the cap, bumps revision, and pushes a fresh snapshot', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-set-slots', {
      slots: 4,
      expected_revision: 0
    });

    const reply = replyFor(sock, 'm1');
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.queue.slots).toBe(4);
    expect(queueSnapshots(sock).at(-1).slots).toBe(4);
  });

  test('reports the cap in workspace_info so the editor renders it', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-set-slots', {
      slots: 3,
      expected_revision: 0
    });

    expect(queueSnapshots(sock).at(-1).workspace_info.slots).toBe(3);
  });

  test('a stale expected_revision conflicts without writing or fanning out', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-set-slots', {
      slots: 4,
      expected_revision: 0
    });
    sock.sent = [];

    await send(sock, 'm2', 'worker-queue-set-slots', {
      slots: 9,
      expected_revision: 0
    });

    const reply = replyFor(sock, 'm2');
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(true);
    expect(reply.payload.queue.slots).toBe(4);
    expect(queueSnapshots(sock).length).toBe(0);
  });

  test('a below-bound value is rejected without a write and without a fanout', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-set-slots', {
      slots: 0,
      expected_revision: 0
    });

    const reply = replyFor(sock, 'm1');
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(false);
    expect(reply.payload.queue.slots).toBe(2);
    expect(queueSnapshots(sock).length).toBe(0);
  });

  test('a non-numeric payload is a bad_request', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-set-slots', {
      slots: '3',
      expected_revision: 0
    });

    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
  });
});

describe('ws worker-queue pr_wait observations (worker-phase2 §4/§5)', () => {
  const SHA = 'a'.repeat(40);

  /**
   * The workspace key the ws layer files this connection under (the subscriber
   * registry keys on the raw root_dir, not a resolved path).
   *
   * @param {any} sock
   * @returns {string}
   */
  function keyOf(sock) {
    return getConnWorkspace(sock)?.root_dir || '';
  }

  /**
   * Park a bead in `pr_wait` the way the scheduler does (attempt + atomic lane
   * move), so the snapshot decoration has something to describe.
   *
   * @param {string} bead_id
   */
  function parkInPrWait(bead_id) {
    const store = getWorkerRuntime().queueStore;
    const rev = store.snapshot('').revision;
    store.appendAttempt('', {
      expected_revision: rev,
      attempt: { attempt_id: `att-${bead_id}`, bead_id }
    });
    store.moveToPrWait('', {
      bead_id,
      attempt_id: `att-${bead_id}`,
      patch: { status: 'done', finished_at: 1 }
    });
  }

  /**
   * @param {Partial<import('./worker/gh.js').PrDetail>} [pr]
   */
  function observe(pr = {}) {
    getWorkerRuntime().prObservations.record('', 'UI-9', {
      error: null,
      pr: {
        number: 304,
        url: 'https://github.com/o/r/pull/304',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: 'UI-9',
        base_ref: 'main',
        head_sha: SHA,
        ...pr
      },
      ci: {
        state: 'ok',
        head_sha: SHA,
        checks: [{ name: 'build', conclusion: 'pass' }],
        conclusion: 'pass',
        reason: null
      }
    });
  }

  test('counts the live subscribers the PR poller gates on', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(workerQueueSubscriberCount(keyOf(sock))).toBe(1);
  });

  test('reports zero subscribers after an unsubscribe', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    expect(workerQueueSubscriberCount(keyOf(sock))).toBe(1);

    await send(sock, 's2', 'unsubscribe-worker-queue', { id: 'wq' });

    expect(workerQueueSubscriberCount(keyOf(sock))).toBe(0);
  });

  test('the snapshot carries the observed PR and its merge gate', async () => {
    parkInPrWait('UI-9');
    observe();
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    const obs = queueSnapshots(sock).at(-1).pr_observations['UI-9'];
    expect(obs.pr).toMatchObject({ number: 304, head_sha: SHA });
    expect(obs.gate).toMatchObject({ enabled: true, gate_badge: 'CI ✓' });
  });

  test('an unobserved pr_wait bead is gated shut, never enabled', async () => {
    parkInPrWait('UI-9');
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(
      queueSnapshots(sock).at(-1).pr_observations['UI-9'].gate
    ).toMatchObject({ enabled: false, tier: 'unobserved' });
  });

  test('a closed-unmerged PR keeps the bead in pr_wait with a visible state', async () => {
    parkInPrWait('UI-9');
    observe({ state: 'CLOSED' });
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    const snap = queueSnapshots(sock).at(-1);
    expect(snap.pr_wait.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-9'
    ]);
    expect(snap.pr_observations['UI-9'].gate).toMatchObject({
      tier: 'closed_unmerged',
      gate_badge: 'PR closed'
    });
  });

  test('carries no observations when pr_wait is empty', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).pr_observations).toEqual({});
  });

  /**
   * Seed the external registry the way a bd scan would (UI-7agi §1).
   *
   * @param {string} bead_id
   */
  function registerExternal(bead_id) {
    getWorkerRuntime().externalPrs.replace('', [
      {
        bead_id,
        pr_url: 'https://github.com/o/r/pull/777',
        pr_number: 777
      }
    ]);
  }

  test('overlays an external PR row onto pr_wait without touching queue.json', () => {
    registerExternal('UI-ext');

    const persisted = getWorkerRuntime().queueStore.snapshot('');

    expect(persisted.pr_wait).toEqual([]);
  });

  /**
   * Register an attachment whose worktree manager answers a fixed verdict —
   * the only input `wt_present` has (UI-w0hi §3).
   *
   * @param {boolean} exists
   */
  function registerWorktree(exists) {
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { merge: vi.fn(), discard: vi.fn() },
        repo: '/repo',
        worktree: { exists: () => exists }
      })
    );
  }

  test('the snapshot carries the external row flagged as external', async () => {
    registerExternal('UI-ext');
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).pr_wait).toEqual([
      {
        bead_id: 'UI-ext',
        added_at: expect.any(Number),
        external: true,
        wt_present: false
      }
    ]);
  });

  test('reports wt_present true when the delivering worktree is still there', async () => {
    registerExternal('UI-ext');
    registerWorktree(true);
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).pr_wait[0].wt_present).toBe(true);
  });

  test('reports wt_present false when the worktree is gone', async () => {
    registerExternal('UI-ext');
    registerWorktree(false);
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).pr_wait[0].wt_present).toBe(false);
  });

  test('reports wt_present false when no attachment is registered', async () => {
    registerExternal('UI-ext');
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).pr_wait[0].wt_present).toBe(false);
  });

  test('an external row gets the same observation/gate decoration as a worker row', async () => {
    registerExternal('UI-9');
    observe();
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(
      queueSnapshots(sock).at(-1).pr_observations['UI-9'].gate
    ).toMatchObject({ enabled: true, gate_badge: 'CI ✓' });
  });

  test('a bead already in the durable lane is not duplicated by the overlay', async () => {
    parkInPrWait('UI-9');
    registerExternal('UI-9');
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    const lane = queueSnapshots(sock).at(-1).pr_wait;
    expect(lane.map((/** @type {any} */ e) => e.bead_id)).toEqual(['UI-9']);
    expect(lane[0].external).toBe(undefined);
  });
});

describe('ws worker REVISE disposition (UI-hs11 §3.2)', () => {
  /**
   * @param {{ fix?: any, approve?: any }} actions
   */
  function registerDisposition(actions) {
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { merge: vi.fn(), discard: vi.fn() },
        reviseDisposition: {
          fix: actions.fix || vi.fn(),
          approve: actions.approve || vi.fn()
        }
      })
    );
  }

  test('worker-revise-fix reaches the action and reports the dispatched attempt', async () => {
    const fix = vi.fn(async () => ({ ok: true, attempt_id: 'a2' }));
    registerDisposition({ fix });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-revise-fix', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(fix).toHaveBeenCalledWith('UI-1');
    expect(replyFor(sock, 'm1').payload).toMatchObject({
      bead_id: 'UI-1',
      ok: true,
      conflict: false,
      attempt_id: 'a2'
    });
  });

  test('worker-revise-approve reaches the action and reports the new receipt sha', async () => {
    const approve = vi.fn(async () => ({ ok: true, sha: 'f'.repeat(40) }));
    registerDisposition({ approve });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-revise-approve', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(approve).toHaveBeenCalledWith('UI-1');
    expect(replyFor(sock, 'm1').payload).toMatchObject({
      ok: true,
      sha: 'f'.repeat(40)
    });
  });

  test('a stale revision refuses the disposition without acting', async () => {
    const fix = vi.fn();
    registerDisposition({ fix });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-revise-fix', {
      bead_id: 'UI-1',
      expected_revision: 99
    });

    expect(fix).not.toHaveBeenCalled();
    expect(replyFor(sock, 'm1').payload.conflict).toBe(true);
  });

  test('a bead the action does not find parked is refused with its reason', async () => {
    registerDisposition({
      approve: async () => ({ ok: false, reason: 'not_parked' })
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-revise-approve', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      ok: false,
      conflict: false,
      reason: 'not_parked'
    });
  });

  test('an action throw collapses to reason error, never an unhandled rejection', async () => {
    registerDisposition({
      fix: async () => {
        throw new Error('boom');
      }
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-revise-fix', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      ok: false,
      reason: 'error'
    });
  });

  test('is inert without a registered attachment', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-revise-fix', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      ok: false,
      reason: 'no_attachment'
    });
  });

  test('rejects a payload without a bead_id', async () => {
    const sock = fakeSocket();

    await send(sock, 'm1', 'worker-revise-approve', { expected_revision: 0 });

    expect(replyFor(sock, 'm1').ok).toBe(false);
  });

  test('fans a fresh snapshot out even when the disposition was refused', async () => {
    registerDisposition({
      fix: async () => ({ ok: false, reason: 'not_parked' })
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-revise-fix', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(queueSnapshots(sock).length).toBe(1);
  });

  test('a queue with nothing parked carries an empty observation map', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).revise_parked).toEqual({});
  });
});

describe('ws worker merge queue (UI-5v7d §3)', () => {
  /**
   * Park a bead in the durable `pr_wait` lane, which is the membership
   * `worker-merge-queue-add` checks.
   *
   * @param {string} bead_id
   */
  function parkInPrWait(bead_id) {
    const store = getWorkerRuntime().queueStore;
    const rev = store.snapshot('').revision;
    store.appendAttempt('', {
      expected_revision: rev,
      attempt: { attempt_id: `att-${bead_id}`, bead_id }
    });
    store.moveToPrWait('', {
      bead_id,
      attempt_id: `att-${bead_id}`,
      patch: { status: 'done', finished_at: 1 }
    });
  }

  /**
   * @param {string} bead_id
   * @param {Partial<import('./worker/gh.js').PrDetail>} [pr]
   */
  function observeGreen(bead_id, pr = {}) {
    const sha = 'f'.repeat(40);
    getWorkerRuntime().prObservations.record('', bead_id, {
      error: null,
      pr: {
        number: 7,
        url: `https://github.com/o/r/pull/7`,
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: bead_id,
        base_ref: 'main',
        head_sha: sha,
        ...pr
      },
      ci: {
        state: 'ok',
        head_sha: sha,
        checks: [{ name: 'build', conclusion: 'pass' }],
        conclusion: 'pass',
        reason: null
      }
    });
  }

  /**
   * A driver stub whose `kick` never merges: these tests assert the QUEUE
   * contract, and letting the real loop run would reach `gh`.
   *
   * @param {{ active?: string|null }} [state]
   */
  function registerDriver(state = {}) {
    const kick = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { merge: vi.fn(), discard: vi.fn() },
        mergeQueue: {
          kick,
          state: () => ({ active: state.active ?? null, failures: {} })
        }
      })
    );
    return kick;
  }

  test('queues a pr_wait bead and kicks the driver', async () => {
    parkInPrWait('UI-1');
    const kick = registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    const rev = getWorkerRuntime().queueStore.snapshot('').revision;

    await send(sock, 'm1', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: rev
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: true,
      conflict: false,
      queued: 1
    });
    expect(getWorkerRuntime().queueStore.snapshot('').merge_queue).toEqual([
      { bead_id: 'UI-1', resolution_rounds: 0 }
    ]);
    expect(kick).toHaveBeenCalled();
  });

  test('a stale revision refuses the queue placement without acting', async () => {
    parkInPrWait('UI-1');
    const kick = registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: 99
    });

    expect(replyFor(sock, 'm1').payload.conflict).toBe(true);
    expect(getWorkerRuntime().queueStore.snapshot('').merge_queue).toEqual([]);
    expect(kick).not.toHaveBeenCalled();
  });

  test('queuing the same bead twice is a no-op, not a second place in line', async () => {
    parkInPrWait('UI-1');
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    const store = getWorkerRuntime().queueStore;

    await send(sock, 'm1', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision
    });
    await send(sock, 'm2', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision
    });

    expect(replyFor(sock, 'm2').payload.applied).toBe(false);
    expect(store.snapshot('').merge_queue.length).toBe(1);
  });

  test('add-all queues every mergeable row in lane order', async () => {
    parkInPrWait('UI-1');
    parkInPrWait('UI-2');
    parkInPrWait('UI-3');
    observeGreen('UI-1');
    observeGreen('UI-2');
    // UI-3 is unobserved → the gate refuses → add-all leaves it out.
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add-all', {
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: true,
      queued: 2
    });
    expect(
      getWorkerRuntime()
        .queueStore.snapshot('')
        .merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1', 'UI-2']);
  });

  test('the auto-merge toggle persists the flag and enrolls what is eligible', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    const kick = registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-auto-toggle', {
      on: true,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: true,
      conflict: false
    });
    const q = getWorkerRuntime().queueStore.snapshot('');
    expect(q.auto_merge).toBe(true);
    expect(q.merge_queue.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
    expect(kick).toHaveBeenCalled();
  });

  test('turning the toggle OFF also empties the waiting queue', async () => {
    parkInPrWait('UI-1');
    parkInPrWait('UI-2');
    observeGreen('UI-1');
    observeGreen('UI-2');
    registerDriver({ active: 'UI-1' });
    const store = getWorkerRuntime().queueStore;
    store.enqueueMerge('', {
      expected_revision: store.snapshot('').revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }]
    });
    store.toggleAutoMerge('', {
      expected_revision: store.snapshot('').revision,
      on: true
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-auto-toggle', {
      on: false,
      expected_revision: store.snapshot('').revision
    });

    // 켜진 채 큐만 비우면 다음 관측에서 다시 차므로 "중단"이 중단이 아니게 된다
    // (UI-yk55 §5.2). 진행 중인 항목은 이미 GitHub에 도달했으므로 남긴다.
    const q = store.snapshot('');
    expect(q.auto_merge).toBe(false);
    expect(q.merge_queue.map((/** @type {any} */ e) => e.bead_id)).toEqual([
      'UI-1'
    ]);
  });

  test('an OFF click during the ON observation cancels the enrolment', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    /** @type {() => void} */
    let release = () => {};
    const observing = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { merge: vi.fn(), discard: vi.fn() },
        mergeQueue: {
          kick: vi.fn(async () => {}),
          state: () => ({ active: null, failures: {} })
        },
        // The gh round-trip §5.3 runs before enrolling — held open here so the
        // OFF click lands inside it.
        prPoller: { tick: () => observing }
      })
    );
    const store = getWorkerRuntime().queueStore;
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-auto-toggle', {
      on: true,
      expected_revision: store.snapshot('').revision
    });
    await send(sock, 'm2', 'worker-merge-auto-toggle', {
      on: false,
      expected_revision: store.snapshot('').revision
    });
    release();
    await new Promise((r) => setTimeout(r, 0));

    // Enrolling on the flag the first request SAW would merge after a stop.
    expect(store.snapshot('').auto_merge).toBe(false);
    expect(store.snapshot('').merge_queue).toEqual([]);
  });

  test('a stale revision refuses the auto-merge toggle without acting', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-auto-toggle', {
      on: true,
      expected_revision: 99
    });

    expect(replyFor(sock, 'm1').payload.conflict).toBe(true);
    expect(getWorkerRuntime().queueStore.snapshot('').auto_merge).toBe(false);
  });

  test('the toggle refuses a payload without an on flag', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-auto-toggle', {
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').error?.code).toBe('bad_request');
  });

  test('add-all leaves out a row excluded at the same head', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    registerDriver();
    const store = getWorkerRuntime().queueStore;
    store.recordMergeSkip('', {
      bead_id: 'UI-1',
      head_sha: 'f'.repeat(40),
      reason: 'ci_failed'
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add-all', {
      expected_revision: store.snapshot('').revision
    });

    // 두 호출자가 같은 공용 함수를 쓰므로 제외 필터도 같이 걸린다 (§4.2).
    expect(replyFor(sock, 'm1').payload.applied).toBe(false);
    expect(store.snapshot('').merge_queue).toEqual([]);
  });

  test('add-all with nothing mergeable applies nothing', async () => {
    parkInPrWait('UI-1');
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add-all', {
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: false,
      conflict: false,
      queued: 0
    });
  });

  test('a stale revision refuses add-all without acting', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add-all', {
      expected_revision: 99
    });

    expect(replyFor(sock, 'm1').payload.conflict).toBe(true);
    expect(getWorkerRuntime().queueStore.snapshot('').merge_queue).toEqual([]);
  });

  test('removes a waiting item', async () => {
    parkInPrWait('UI-1');
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    const store = getWorkerRuntime().queueStore;
    await send(sock, 'm1', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision
    });

    await send(sock, 'm2', 'worker-merge-queue-remove', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision
    });

    expect(replyFor(sock, 'm2').payload.applied).toBe(true);
    expect(store.snapshot('').merge_queue).toEqual([]);
  });

  test('refuses to remove the item the driver is merging', async () => {
    parkInPrWait('UI-1');
    registerDriver({ active: 'UI-1' });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    const store = getWorkerRuntime().queueStore;
    await send(sock, 'm1', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision
    });

    await send(sock, 'm2', 'worker-merge-queue-remove', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision
    });

    expect(replyFor(sock, 'm2').payload).toMatchObject({
      applied: false,
      reason: 'merge_active'
    });
    expect(store.snapshot('').merge_queue.length).toBe(1);
  });

  test('add-all leaves out an EXTERNAL conflicting row even on a green gate', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1', {
      mergeable: 'CONFLICTING',
      merge_state_status: 'DIRTY'
    });
    getWorkerRuntime().externalPrs.replace('', [
      {
        bead_id: 'UI-EXT',
        pr_url: 'https://github.com/o/r/pull/9',
        pr_number: 9
      }
    ]);
    observeGreen('UI-EXT', {
      mergeable: 'CONFLICTING',
      merge_state_status: 'DIRTY'
    });
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add-all', {
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    // The durable conflicting row IS queued (its click dispatches a resolution);
    // the external one cannot dispatch anything, so it is left out.
    expect(
      getWorkerRuntime()
        .queueStore.snapshot('')
        .merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1']);
  });

  test('add-all ignores a paused resolution attempt that was already resumed', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    const store = getWorkerRuntime().queueStore;
    store.appendAttempt('', {
      expected_revision: store.snapshot('').revision,
      attempt: {
        attempt_id: 'res-1',
        bead_id: 'UI-1',
        status: 'paused',
        conflict_resolution: true
      }
    });
    store.appendAttempt('', {
      expected_revision: store.snapshot('').revision,
      attempt: {
        attempt_id: 'res-2',
        bead_id: 'UI-1',
        status: 'done',
        resumed_from: 'res-1'
      }
    });
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add-all', {
      expected_revision: store.snapshot('').revision
    });

    // The paused ancestor is spent history — its child ended, so the row is
    // mergeable exactly as the lane draws it.
    expect(store.snapshot('').merge_queue.length).toBe(1);
  });

  test('add-all leaves out a row whose LEAF resolution session is paused', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    const store = getWorkerRuntime().queueStore;
    store.appendAttempt('', {
      expected_revision: store.snapshot('').revision,
      attempt: {
        attempt_id: 'res-1',
        bead_id: 'UI-1',
        status: 'paused',
        conflict_resolution: true
      }
    });
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add-all', {
      expected_revision: store.snapshot('').revision
    });

    expect(store.snapshot('').merge_queue).toEqual([]);
  });

  test('bulk remove drops every waiting item and keeps the active one', async () => {
    parkInPrWait('UI-1');
    parkInPrWait('UI-2');
    parkInPrWait('UI-3');
    registerDriver({ active: 'UI-1' });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    const store = getWorkerRuntime().queueStore;
    store.enqueueMerge('', {
      expected_revision: store.snapshot('').revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }, { bead_id: 'UI-3' }]
    });

    await send(sock, 'm1', 'worker-merge-queue-remove', {
      all: true,
      expected_revision: store.snapshot('').revision
    });

    expect(replyFor(sock, 'm1').payload.applied).toBe(true);
    expect(
      store.snapshot('').merge_queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-1']);
  });

  test('rejects a queue-add payload without a bead_id', async () => {
    const sock = fakeSocket();

    await send(sock, 'm1', 'worker-merge-queue-add', { expected_revision: 0 });

    expect(replyFor(sock, 'm1').ok).toBe(false);
  });

  test('the snapshot carries the driver state for the lane badges', async () => {
    parkInPrWait('UI-1');
    registerDriver({ active: 'UI-1' });
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).merge_queue_state).toEqual({
      active: 'UI-1',
      failures: {}
    });
  });

  test('is inert without a registered attachment', async () => {
    parkInPrWait('UI-1');
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    // The placement is durable regardless: it is resumed by whatever driver
    // starts next, exactly like a queue that survived a restart.
    expect(replyFor(sock, 'm1').payload.applied).toBe(true);
    expect(getWorkerRuntime().queueStore.snapshot('').merge_queue.length).toBe(
      1
    );
  });
});

describe('ws worker PR actions (worker-phase2 §6)', () => {
  test('a stale revision refuses the destructive discard without acting', async () => {
    const discard = vi.fn();
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { merge: vi.fn(), discard }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'r1', 'worker-pr-discard', {
      bead_id: 'UI-1',
      expected_revision: 99
    });

    expect(discard).not.toHaveBeenCalled();
    expect(replyFor(sock, 'r1').payload.conflict).toBe(true);
  });

  test('worker-pr-discard reaches the action and reports its refusal reason', async () => {
    const discard = vi.fn(async () => ({
      ok: false,
      reason: 'pr_already_merged'
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { merge: vi.fn(), discard }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'r1', 'worker-pr-discard', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(discard).toHaveBeenCalledWith('UI-1');
    expect(replyFor(sock, 'r1').payload).toMatchObject({
      discarded: false,
      reason: 'pr_already_merged'
    });
  });

  test('discard is inert without a registered attachment', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'r1', 'worker-pr-discard', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'r1').payload.reason).toBe('no_attachment');
  });
});

describe('ws worker-attempt-dismiss (UI-dcw7)', () => {
  /**
   * Seed one terminal attempt the way the scheduler records it, so the dismiss
   * has a real target in the connection's workspace queue.
   *
   * @param {string} status
   */
  function seedAttempt(status) {
    const store = getWorkerRuntime().queueStore;
    store.appendAttempt('', {
      expected_revision: store.snapshot('').revision,
      attempt: {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        status,
        repo: '/repo',
        cause: 'verify_failed:x'
      }
    });
  }

  test('stamps dismissed_at and pushes it in a fresh snapshot', async () => {
    seedAttempt('failed');
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    const rev = queueSnapshots(sock).at(-1).revision;
    sock.sent = [];

    await send(sock, 'd1', 'worker-attempt-dismiss', {
      attempt_id: 'att-1',
      expected_revision: rev
    });

    const reply = replyFor(sock, 'd1');
    expect(reply.payload).toMatchObject({ dismissed: true, conflict: false });
    expect(
      typeof queueSnapshots(sock).at(-1).attempts['att-1'].dismissed_at
    ).toBe('number');
  });

  test('routes through the real dispatch switch, never unknown_type', async () => {
    seedAttempt('failed');
    const sock = fakeSocket();

    await send(sock, 'd1', 'worker-attempt-dismiss', {
      attempt_id: 'att-1',
      expected_revision: 1
    });

    const reply = replyFor(sock, 'd1');
    expect(reply.ok).toBe(true);
    expect(reply.error).toBeUndefined();
  });

  test('rejects a stale revision as a conflict without dismissing', async () => {
    seedAttempt('failed');
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'd1', 'worker-attempt-dismiss', {
      attempt_id: 'att-1',
      expected_revision: 0
    });

    const reply = replyFor(sock, 'd1');
    expect(reply.payload).toMatchObject({ dismissed: false, conflict: true });
    expect(reply.payload.queue.attempts['att-1'].dismissed_at).toBe(null);
    expect(queueSnapshots(sock).length).toBe(0);
  });

  test('rejects a running attempt with a reason', async () => {
    seedAttempt('running');
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    const rev = queueSnapshots(sock).at(-1).revision;

    await send(sock, 'd1', 'worker-attempt-dismiss', {
      attempt_id: 'att-1',
      expected_revision: rev
    });

    expect(replyFor(sock, 'd1').payload).toMatchObject({
      dismissed: false,
      conflict: false,
      reason: 'not_dismissable'
    });
  });

  test('is a client-sendable MESSAGE_TYPE', () => {
    expect(MESSAGE_TYPES).toContain('worker-attempt-dismiss');
  });
});

describe('ws worker-queue workspace_info deploy surface (worker-deploy-hook §3)', () => {
  const WS_D = { root_dir: '/tmp/wq-ws-D', db_path: '/tmp/wq-ws-D/.beads/db' };
  /** @type {string[]} */
  const config_dirs = [];

  /**
   * @param {string} content
   * @returns {string}
   */
  function writeConfig(content) {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-wsq-config-'));
    config_dirs.push(dir);
    const file_path = path.join(dir, 'config.toml');
    fs.writeFileSync(file_path, content);
    return file_path;
  }

  afterEach(() => {
    delete process.env.BDUI_CONFIG_PATH;
    for (const dir of config_dirs.splice(0)) {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  test('exposes the configured deploy command', async () => {
    process.env.BDUI_CONFIG_PATH = writeConfig(`
[worker.deploy."${WS_D.root_dir}"]
cmd = ["bdui-shared", "restart"]
timeout_ms = 120000
detached = true
`);
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_D });

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).workspace_info.deploy_cmd).toEqual({
      cmd: ['bdui-shared', 'restart'],
      timeout_ms: 120000,
      detached: true
    });
  });

  test('reports a null deploy_cmd for a workspace with no section', async () => {
    process.env.BDUI_CONFIG_PATH = writeConfig('workspaces = ["/repo-a"]\n');
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_D });

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).workspace_info.deploy_cmd).toBeNull();
  });

  test('exposes the queue last_deploy record', async () => {
    getWorkerRuntime().queueStore.recordLastDeploy(WS_D.root_dir, {
      outcome: 'launched',
      reason: null,
      bead_id: 'UI-9',
      base_sha: 'base-sha-9'
    });
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_D });

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(
      queueSnapshots(sock).at(-1).workspace_info.last_deploy
    ).toMatchObject({
      outcome: 'launched',
      bead_id: 'UI-9',
      base_sha: 'base-sha-9'
    });
  });

  test('reports a null last_deploy when nothing has been deployed', async () => {
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_D });

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).workspace_info.last_deploy).toBeNull();
  });
});

describe('ws worker-queue subscription addressing', () => {
  const WS_A = { root_dir: '/tmp/wq-ws-A', db_path: '/tmp/wq-ws-A/.beads/db' };
  const WS_B = { root_dir: '/tmp/wq-ws-B', db_path: '/tmp/wq-ws-B/.beads/db' };

  test('unsubscribe after a workspace switch removes the old-workspace subscription', async () => {
    const a = fakeSocket();
    const b = fakeSocket();
    setConnWorkspace(/** @type {any} */ (a), { ...WS_A });
    setConnWorkspace(/** @type {any} */ (b), { ...WS_A });
    await send(a, 's1', 'subscribe-worker-queue', { id: 'wq' });
    // The client unsubscribes AFTER set-workspace already repointed the
    // connection — the entry to remove lives under the PREVIOUS workspace key.
    setConnWorkspace(/** @type {any} */ (a), { ...WS_B });
    await send(a, 'u1', 'unsubscribe-worker-queue', { id: 'wq' });
    expect(replyFor(a, 'u1').payload.unsubscribed).toBe(true);
    a.sent = [];

    await send(b, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(b, 'm1').payload.applied).toBe(true);
    expect(queueSnapshots(a).length).toBe(0);
  });

  test('emits the subscribe snapshot under the fixed payload schema', async () => {
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_A });

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    const payload = queueSnapshotPayloads(sock).at(-1);
    expect(Object.keys(payload)).toEqual(['type', 'id', 'root_dir', 'queue']);
  });

  test('addresses the subscribe snapshot to the connection workspace', async () => {
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_A });

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshotPayloads(sock).at(-1).root_dir).toBe(WS_A.root_dir);
  });

  test('addresses a fanout snapshot to the workspace it describes', async () => {
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_A });
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(queueSnapshotPayloads(sock).at(-1).root_dir).toBe(WS_A.root_dir);
  });
});
