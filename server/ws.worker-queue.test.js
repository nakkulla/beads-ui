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
      'worker-pr-merge',
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
      key: 'review_model',
      value: 'codex',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.conflict).toBe(false);
    expect(reply.payload.queue.revision).toBe(1);
    expect(reply.payload.queue.exec_defaults.review_model).toBe('codex');

    const snaps = queueSnapshots(sock);
    expect(snaps.length).toBe(1);
    expect(snaps.at(-1).exec_defaults.review_model).toBe('codex');
  });

  test('unset (null) deletes the key', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-set-exec-default', {
      key: 'review_model',
      value: 'codex',
      expected_revision: 0
    });
    sock.sent = [];

    await send(sock, 'm2', 'worker-queue-set-exec-default', {
      key: 'review_model',
      value: null,
      expected_revision: 1
    });
    const reply = replyFor(sock, 'm2');
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.queue.revision).toBe(2);
    expect(reply.payload.queue.exec_defaults.review_model).toBeUndefined();
    expect(
      queueSnapshots(sock).at(-1).exec_defaults.review_model
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
      key: 'review_model',
      value: 'not-a-runner',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm1');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(false);
    // Store unchanged: revision still 0, key absent.
    expect(reply.payload.queue.revision).toBe(0);
    expect(reply.payload.queue.exec_defaults.review_model).toBeUndefined();
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
      key: 'review_model',
      value: 'codex',
      expected_revision: 0
    });
    sock.sent = [];

    // A second client still thinks revision is 0.
    await send(sock, 'm2', 'worker-queue-set-exec-default', {
      key: 'review_model',
      value: 'claude',
      expected_revision: 0
    });
    const reply = replyFor(sock, 'm2');
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(false);
    expect(reply.payload.conflict).toBe(true);
    // Current snapshot returned so the client can re-sync + retry.
    expect(reply.payload.queue.revision).toBe(1);
    expect(reply.payload.queue.exec_defaults.review_model).toBe('codex');
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
});

describe('ws worker PR actions (worker-phase2 §6)', () => {
  test('worker-pr-merge reaches the action and reports what it actually did', async () => {
    const merge = vi.fn(async () => ({
      ok: true,
      action: 'merged',
      reason: null
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { merge, discard: vi.fn() }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-pr-merge', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(merge).toHaveBeenCalledWith('UI-1');
    expect(replyFor(sock, 'm1').payload).toMatchObject({
      ok: true,
      conflict: false,
      action: 'merged'
    });
  });

  test('a dispatched conflict resolution is reported as such, not as a merge', async () => {
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: {
          merge: async () => ({
            ok: true,
            action: 'conflict_resolution',
            reason: null,
            attempt_id: 'a2'
          }),
          discard: vi.fn()
        }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-pr-merge', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      action: 'conflict_resolution',
      attempt_id: 'a2'
    });
  });

  test('a stale revision refuses the merge click without acting', async () => {
    const merge = vi.fn();
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { merge, discard: vi.fn() }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-pr-merge', {
      bead_id: 'UI-1',
      expected_revision: 99
    });

    expect(merge).not.toHaveBeenCalled();
    expect(replyFor(sock, 'm1').payload.conflict).toBe(true);
  });

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

  test('both actions are inert without a registered attachment', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-pr-merge', {
      bead_id: 'UI-1',
      expected_revision: 0
    });
    await send(sock, 'r1', 'worker-pr-discard', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').payload.reason).toBe('no_attachment');
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
