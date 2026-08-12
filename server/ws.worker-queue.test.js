import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MESSAGE_TYPES } from '../app/protocol.js';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest,
  __setUnattachedAdmissionCheckForTest
} from './worker/attach.js';
import { resetRepoOpsCache, resolveDeployAt } from './worker/repo-ops.js';
import { getWorkerRuntime } from './worker/runtime.js';
import {
  __resetRegistriesForTest,
  __resetWorkerQueueForTest,
  attachWsServer,
  handleMessage
} from './ws.js';
import { getConnWorkspace, setConnWorkspace } from './ws/context.js';
import {
  decorateQueue,
  workerQueueSubscriberCount
} from './ws/worker-handlers.js';

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
  resetRepoOpsCache();
  __setUnattachedAdmissionCheckForTest(async () => ({ ok: true }));
  // Seed DEFAULT_WORKSPACE so bare sockets resolve a deterministic workspace.
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  resetRepoOpsCache();
  __resetWorkerAttachmentsForTest();
  try {
    fs.rmSync(tmp_state, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});

describe('ws worker-queue channel', () => {
  test('projects one bounded root completion status and hides its repair child rows', () => {
    const root_bead_id = 'UI-root';
    const repair_bead_id = 'UI-repair';
    getWorkerRuntime().prObservations.record('', repair_bead_id, {
      pr: {
        number: 22,
        url: 'https://github.com/o/r/pull/22',
        state: 'OPEN',
        mergeable: 'MERGEABLE',
        merge_state_status: 'CLEAN',
        head_ref: repair_bead_id,
        head_sha: 'c'.repeat(40),
        base_ref: 'main'
      },
      ci: null
    });
    const snapshot = /** @type {any} */ (
      decorateQueue('', {
        revision: 1,
        slots: 2,
        queue: [{ bead_id: repair_bead_id, added_at: 0 }],
        attempts: {},
        pr_wait: [
          { bead_id: root_bead_id, added_at: 1 },
          { bead_id: repair_bead_id, added_at: 2 }
        ],
        done: [{ bead_id: repair_bead_id, added_at: 3 }],
        cleanup_failed: {},
        completion_intents: {
          [root_bead_id]: {
            target_base: 'main',
            phase: 'waiting_repair_pr',
            subject: {
              role: 'root',
              bead_id: root_bead_id,
              pr_url: 'https://github.com/o/r/pull/1',
              head_sha: 'a'.repeat(40),
              base_sha: 'b'.repeat(40),
              merged_sha: null
            },
            repair_sessions_used: 1,
            repair_bead_ids: [repair_bead_id],
            active_op: null,
            terminal_reason: null
          }
        }
      })
    );

    expect(snapshot).not.toHaveProperty('completion_intents');
    expect(snapshot.queue).toEqual([]);
    expect(
      snapshot.pr_wait.map((/** @type {any} */ entry) => entry.bead_id)
    ).toEqual([root_bead_id]);
    expect(snapshot.done).toEqual([]);
    expect(snapshot.completion_status[root_bead_id]).toEqual({
      root_bead_id,
      phase: 'waiting_repair_pr',
      subject_role: 'root',
      subject_bead_id: root_bead_id,
      head_sha: 'a'.repeat(40),
      base_sha: 'b'.repeat(40),
      merged_sha: null,
      repair_sessions_used: 1,
      repair_session_cap: 2,
      current_repair: {
        bead_id: repair_bead_id,
        pr_url: 'https://github.com/o/r/pull/22',
        pr_number: 22
      },
      active_attempt_id: null,
      failure_stage: null,
      failure_reason: null,
      evidence: null,
      log_path: null,
      terminal_reason: null
    });
  });

  test('projects malformed completion state as an explicit terminal status', () => {
    const snapshot = /** @type {any} */ (
      decorateQueue('', {
        revision: 1,
        slots: 2,
        queue: [],
        attempts: {},
        pr_wait: [{ bead_id: 'UI-root', added_at: 1 }],
        done: [],
        cleanup_failed: {},
        completion_intents: {
          'UI-root': { phase: 'mystery', repair_sessions_used: 9 }
        }
      })
    );

    expect(snapshot.completion_status['UI-root']).toMatchObject({
      phase: 'needs_human',
      repair_sessions_used: 2,
      repair_session_cap: 2,
      terminal_reason: 'intent_state_invalid'
    });
    expect(snapshot.completion_status['UI-root']).toMatchObject({
      failure_stage: 'state',
      failure_reason: 'intent_state_invalid',
      evidence: 'completion_intent_malformed'
    });
  });

  test('projects only UI-safe fields from active discard operations', () => {
    const snapshot = /** @type {any} */ (
      decorateQueue('', {
        revision: 1,
        queue: [],
        attempts: {},
        pr_wait: [],
        done: [],
        discard_operations: {
          active: {
            operation_id: 'active',
            bead_id: 'UI-1',
            attempt_id: 'att-1',
            requested_at: 10,
            mode: 'unmerged',
            phase: 'archived',
            process_identity: { pid: 1, pgid: 1, started_at: 1 },
            source_snapshot: {
              repo: '/secret/repo',
              worktree: '/secret/repo/.worktrees/UI-1',
              session_id: 'secret-session',
              bead_status: 'resolved'
            },
            backup: {
              path: '/local/archive/UI-1',
              manifest_sha256: 'a'.repeat(64),
              verified_at: 20
            },
            original_pr: {
              number: 1,
              url: 'https://github.com/o/r/pull/1',
              state: 'OPEN',
              raw_secret: 'hidden'
            },
            revert_pr: null,
            receipts: { internal: { path: '/secret/receipt' } },
            last_error: null
          },
          completed: {
            operation_id: 'completed',
            bead_id: 'UI-2',
            requested_at: 5,
            mode: 'unmerged',
            phase: 'done',
            source_snapshot: { repo: '/secret/repo' }
          }
        }
      })
    );

    expect(snapshot.discard_operations).toEqual({
      active: {
        operation_id: 'active',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        requested_at: 10,
        mode: 'unmerged',
        phase: 'archived',
        backup: {
          path: '/local/archive/UI-1',
          manifest_sha256: 'a'.repeat(64),
          verified_at: 20
        },
        original_pr: {
          number: 1,
          url: 'https://github.com/o/r/pull/1',
          state: 'OPEN',
          head_ref: null,
          head_sha: null,
          base_ref: null,
          merged_sha: null
        },
        revert_pr: null,
        last_error: null
      }
    });
    expect(JSON.stringify(snapshot.discard_operations)).not.toContain('secret');
  });

  test('projects the optional durable resolution wait record', () => {
    const resolution = {
      attempt_id: 'resolution-1',
      subject_bead_id: 'UI-1',
      deadline_at: 100,
      state: 'yielded',
      yielded_at: 101,
      settled_at: null
    };
    const snapshot = /** @type {any} */ (
      decorateQueue('', {
        revision: 1,
        slots: 2,
        queue: [],
        attempts: {},
        pr_wait: [{ bead_id: 'UI-1', added_at: 1 }],
        done: [],
        cleanup_failed: {},
        merge_queue: [{ bead_id: 'UI-1', resolution_rounds: 1, resolution }],
        completion_intents: {}
      })
    );

    expect(snapshot.merge_queue).toEqual([
      { bead_id: 'UI-1', resolution_rounds: 1, resolution }
    ]);
  });

  test('sets a workspace preset reference with both queue and preset revisions', async () => {
    const sock = fakeSocket();
    await send(sock, 'p1', 'exec-preset-create', {
      expected_revision: 0,
      name: '기본',
      settings: {}
    });
    const preset = replyFor(sock, 'p1').payload.presets[0];

    await send(sock, 'q1', 'worker-queue-set-default-exec-preset', {
      preset_id: preset.id,
      expected_queue_revision: 0,
      expected_preset_revision: 1
    });

    expect(replyFor(sock, 'q1').payload).toMatchObject({
      applied: true,
      conflict: false,
      queue: { default_exec_preset_id: preset.id },
      presets: { revision: 1 }
    });
  });

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

  test('toggle ON kicks the live tick; retired stop never mutates', async () => {
    const tick = vi.fn(async () => {});
    const discard = vi.fn(async () => ({
      ok: true,
      operation_id: 'discard-1',
      phase: 'done'
    }));
    // A registered (fake) attachment for the connection workspace (process.cwd()).
    __registerWorkerAttachmentForTest(process.cwd(), {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick },
      discardCoordinator: { discard }
    });

    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-toggle', {
      on: true,
      expected_revision: 0
    });
    // The toggle handler kicked the dispatch loop for this workspace.
    expect(tick).toHaveBeenCalledWith(process.cwd());

    const store = getWorkerRuntime().queueStore;
    store.appendAttempt(process.cwd(), {
      expected_revision: store.snapshot(process.cwd()).revision,
      attempt: { attempt_id: 'att-1', bead_id: 'UI-1' }
    });
    await send(sock, 'm2', 'worker-attempt-stop', { attempt_id: 'att-1' });
    expect(discard).not.toHaveBeenCalled();
    const reply = replyFor(sock, 'm2');
    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('action_retired');
  });

  test('routes the PR-wait slot toggle, persists it, ticks, and broadcasts', async () => {
    const tick = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(process.cwd(), {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick }
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'hold-1', 'worker-queue-set-pr-wait-hold', {
      on: true,
      expected_revision: 0
    });

    const reply = replyFor(sock, 'hold-1');
    expect(reply.payload.queue.pr_wait_holds_slot).toBe(true);
    expect(queueSnapshots(sock).at(-1).pr_wait_holds_slot).toBe(true);
    expect(tick).toHaveBeenCalledWith(process.cwd());
  });

  test('rejects a non-boolean PR-wait slot toggle payload', async () => {
    const sock = fakeSocket();

    await send(sock, 'hold-bad', 'worker-queue-set-pr-wait-hold', {
      on: 'yes',
      expected_revision: 0
    });

    expect(replyFor(sock, 'hold-bad').error.code).toBe('bad_request');
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
    expect(ok_reply.payload.phase).toBe('done');
    expect(ok_reply.payload.reason).toBe(null);

    await send(sock, 'p2', 'worker-attempt-pause', { attempt_id: 'att-2' });
    const refused = replyFor(sock, 'p2');
    expect(refused.payload.paused).toBe(false);
    expect(refused.payload.phase).toBe(null);
    expect(refused.payload.reason).toBe('no_session_id');
  });

  test('worker-attempt-resume preserves a structured runner mismatch', async () => {
    const continuation_mismatch = {
      prior_available: true,
      prior: { runner: 'codex' },
      current: { runner: 'claude' },
      decision_token: { source_attempt_id: 'att-1' }
    };
    const resume = vi.fn(async () => ({
      ok: false,
      reason: 'runner_mismatch',
      continuation_mismatch
    }));
    __registerWorkerAttachmentForTest(process.cwd(), {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick: vi.fn(), stop: vi.fn(), resume }
    });
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-attempt-resume', {
      attempt_id: 'att-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'r1').payload).toMatchObject({
      resumed: false,
      reason: 'runner_mismatch',
      continuation_mismatch
    });
  });

  test('worker-attempt-resume forwards a token-bound continuation decision', async () => {
    const decision_token = { source_attempt_id: 'att-1' };
    const resume = vi.fn(async () => ({ ok: true, attempt_id: 'att-2' }));
    __registerWorkerAttachmentForTest(process.cwd(), {
      // @ts-expect-error minimal fake attachment
      scheduler: { tick: vi.fn(), stop: vi.fn(), resume }
    });
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-attempt-resume', {
      attempt_id: 'att-1',
      expected_revision: 0,
      continuation: 'fresh_current',
      decision_token
    });

    expect(resume).toHaveBeenCalledWith(process.cwd(), 'att-1', {
      continuation: 'fresh_current',
      decision_token
    });
    expect(replyFor(sock, 'r1').payload.new_attempt_id).toBe('att-2');
  });

  test('worker-attempt-resume rejects a decision without its token', async () => {
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-attempt-resume', {
      attempt_id: 'att-1',
      expected_revision: 0,
      continuation: 'fresh_current'
    });

    expect(replyFor(sock, 'r1').error.code).toBe('bad_request');
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
      'worker-queue-set-default-exec-preset',
      'worker-queue-set-pr-wait-hold',
      'worker-merge-queue-add',
      'worker-merge-queue-add-all',
      'worker-merge-queue-remove',
      'worker-discard',
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

  test('worker-ineligible placement preserves the queue and records the refusal', async () => {
    __setUnattachedAdmissionCheckForTest(async () => ({
      ok: false,
      reason: 'worker_ineligible'
    }));
    const sock = fakeSocket();

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-NO',
      expected_revision: 0
    });

    const refused = replyFor(sock, 'm1').payload;
    expect(refused).toMatchObject({
      applied: false,
      conflict: false,
      admission_reason: 'worker_ineligible'
    });
    expect(refused.queue.queue).toEqual([]);
    expect(refused.queue.admission['UI-NO'].reason).toBe('worker_ineligible');
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

  test('worker-revise-fix preserves and forwards a continuation decision', async () => {
    const decision_token = { source_attempt_id: 'a1' };
    const continuation_mismatch = {
      prior_available: true,
      prior: { runner: 'codex' },
      current: { runner: 'claude' },
      decision_token
    };
    const fix = vi
      .fn()
      .mockResolvedValueOnce({
        ok: false,
        reason: 'runner_mismatch',
        continuation_mismatch
      })
      .mockResolvedValueOnce({ ok: true, attempt_id: 'a2' });
    registerDisposition({ fix });
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-revise-fix', {
      bead_id: 'UI-1',
      expected_revision: 0
    });
    await send(sock, 'r2', 'worker-revise-fix', {
      bead_id: 'UI-1',
      expected_revision: 0,
      continuation: 'fresh_current',
      decision_token
    });

    expect(replyFor(sock, 'r1').payload.continuation_mismatch).toEqual(
      continuation_mismatch
    );
    expect(fix).toHaveBeenLastCalledWith('UI-1', {
      continuation: 'fresh_current',
      decision_token
    });
    expect(replyFor(sock, 'r2').payload.attempt_id).toBe('a2');
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
      patch: {
        status: 'done',
        finished_at: 1,
        target_base: 'main',
        base_oid: 'e'.repeat(40)
      }
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
      { bead_id: 'UI-1', resolution_rounds: 0, resolution: null }
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

  test('persists a token-bound background continuation decision', async () => {
    parkInPrWait('UI-1');
    const kick = registerDriver();
    const store = getWorkerRuntime().queueStore;
    store.enqueueMerge('', {
      expected_revision: store.snapshot('').revision,
      entries: [{ bead_id: 'UI-1' }]
    });
    const token = {
      source_attempt_id: 'att-UI-1',
      source_attempt_digest: 'source',
      observed_queue_revision: store.snapshot('').revision,
      preset_id: 'p1',
      preset_revision: 1,
      effective_exec_digest: 'exec'
    };
    store.requireMergeContinuation('', {
      bead_id: 'UI-1',
      subject_bead_id: 'UI-1',
      mismatch: {
        continuation_required: true,
        prior_available: true,
        prior: { runner: 'codex' },
        current: { runner: 'claude' },
        decision_token: token
      }
    });
    const action = /** @type {any} */ (
      store.snapshot('').merge_queue[0].continuation_action
    );
    const sock = fakeSocket();

    await send(sock, 'm1', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision,
      continuation: 'fresh_current',
      decision_token: action.mismatch.decision_token
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: true,
      conflict: false,
      continuation_decided: true
    });
    expect(store.snapshot('').merge_queue[0].continuation_action).toMatchObject(
      {
        continuation: 'fresh_current',
        decision_token: {
          observed_queue_revision: store.snapshot('').revision
        }
      }
    );
    expect(kick).toHaveBeenCalled();
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
  test('worker-discard forwards CAS and attempt identity to the durable coordinator', async () => {
    const discard = vi.fn(async () => ({
      ok: true,
      operation_id: 'discard-1',
      pending: 'merged_revert'
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        discardCoordinator: { discard }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'd1', 'worker-discard', {
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: 0
    });

    expect(discard).toHaveBeenCalledWith({
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      expected_revision: 0
    });
    expect(replyFor(sock, 'd1').payload).toMatchObject({
      bead_id: 'UI-1',
      operation_id: 'discard-1',
      accepted: true,
      pending: 'merged_revert'
    });
  });

  test('worker-discard returns the coordinator CAS conflict with a fresh queue', async () => {
    const discard = vi.fn(async () => ({
      ok: false,
      conflict: true,
      reason: 'revision_conflict'
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        discardCoordinator: { discard }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'd1', 'worker-discard', {
      bead_id: 'UI-1',
      expected_revision: 99
    });

    expect(replyFor(sock, 'd1').payload).toMatchObject({
      accepted: false,
      conflict: true,
      reason: 'revision_conflict',
      queue: { revision: 0 }
    });
  });

  test('worker-discard does not report a reused active operation as completed', async () => {
    const discard = vi.fn(async () => ({
      ok: true,
      reused: true,
      operation_id: 'discard-1',
      phase: 'runner_terminated'
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        discardCoordinator: { discard }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'd1', 'worker-discard', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'd1').payload).toMatchObject({
      accepted: true,
      discarded: false,
      reused: true,
      phase: 'runner_terminated'
    });
  });

  test('worker-discard retries the exact failed operation id', async () => {
    const store = getWorkerRuntime().queueStore;
    const created = store.createDiscardOperation(process.cwd(), {
      expected_revision: 0,
      operation: {
        operation_id: 'discard-retry',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: {}
      }
    });
    store.failDiscardOperation(process.cwd(), {
      operation_id: 'discard-retry',
      expected_phase: 'requested',
      reason: 'archive_failed'
    });
    const discard = vi.fn();
    const retry = vi.fn(async () => ({
      ok: true,
      operation_id: 'discard-retry',
      phase: 'requested'
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        discardCoordinator: { discard, retry }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'd1', 'worker-discard', {
      bead_id: 'UI-1',
      attempt_id: 'att-1',
      operation_id: 'discard-retry',
      expected_revision: created.queue.revision + 1
    });

    expect(retry).toHaveBeenCalledWith('discard-retry');
    expect(discard).not.toHaveBeenCalled();
    expect(replyFor(sock, 'd1').payload).toMatchObject({
      operation_id: 'discard-retry',
      accepted: true,
      discarded: false,
      phase: 'requested'
    });
  });

  test('worker-discard returns the terminal recovery receipt after lane removal', async () => {
    const store = getWorkerRuntime().queueStore;
    const created = store.createDiscardOperation(process.cwd(), {
      expected_revision: 0,
      operation: {
        operation_id: 'discard-complete',
        bead_id: 'UI-1',
        attempt_id: 'att-1',
        source_snapshot: {}
      }
    });
    store.advanceDiscardOperation(process.cwd(), {
      operation_id: 'discard-complete',
      expected_phase: 'requested',
      next_phase: 'bead_pr_url_cleared',
      patch: {
        backup: {
          path: '/state/discard-complete',
          manifest_sha256: 'a'.repeat(64),
          verified_at: 10
        },
        original_pr: {
          number: 1,
          url: 'https://github.com/o/r/pull/1',
          state: 'CLOSED'
        }
      }
    });
    store.completeDiscardOperation(process.cwd(), {
      operation_id: 'discard-complete',
      expected_phase: 'bead_pr_url_cleared'
    });
    const discard = vi.fn(async () => ({
      ok: true,
      operation_id: 'discard-complete'
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        discardCoordinator: { discard }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'd1', 'worker-discard', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot(process.cwd()).revision
    });

    expect(created.ok).toBe(true);
    expect(replyFor(sock, 'd1').payload).toMatchObject({
      operation_id: 'discard-complete',
      accepted: true,
      discarded: true,
      phase: 'done',
      receipt: {
        archive_path: '/state/discard-complete',
        original_pr: {
          number: 1,
          url: 'https://github.com/o/r/pull/1',
          state: 'CLOSED'
        },
        revert_pr: null
      }
    });
  });

  test('retired PR discard never acts even with a stale revision', async () => {
    const discard = vi.fn();
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        discardCoordinator: { discard }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'r1', 'worker-pr-discard', {
      bead_id: 'UI-1',
      expected_revision: 99
    });

    expect(discard).not.toHaveBeenCalled();
    expect(replyFor(sock, 'r1').error.code).toBe('action_retired');
  });

  test('retired PR discard returns action_retired without coordinator work', async () => {
    const discard = vi.fn(async () => ({
      ok: false,
      reason: 'pr_already_merged'
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        discardCoordinator: { discard }
      })
    );
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'r1', 'worker-pr-discard', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(discard).not.toHaveBeenCalled();
    expect(replyFor(sock, 'r1').error.code).toBe('action_retired');
  });

  test('retired PR discard returns action_retired without an attachment', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'r1', 'worker-pr-discard', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'r1').error.code).toBe('action_retired');
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

describe('ws repo deployment projection and retry (UI-lb58 Phase 4)', () => {
  const WS_DEPLOY = {
    root_dir: '/tmp/wq-deployment',
    db_path: '/tmp/wq-deployment/.beads/db'
  };
  const TARGET_SHA = 'a'.repeat(40);

  test('keeps retired deployment state off the public snapshot', () => {
    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {},
      last_deploy: { outcome: 'launched' },
      reconcile: { 'UI-old': { stage: 'complete' } }
    });

    expect(snapshot).not.toHaveProperty('last_deploy');
    expect(snapshot).not.toHaveProperty('reconcile');
  });

  test('projects the pinned external deploy declaration without adapter fields', async () => {
    await resolveDeployAt({
      repo: WS_DEPLOY.root_dir,
      sha: TARGET_SHA,
      gitRun: vi.fn(async (args) =>
        args[0] === 'rev-parse'
          ? { code: 0, stdout: `${TARGET_SHA}\n`, stderr: '' }
          : {
              code: 0,
              stdout:
                '[deploy]\ncmd = ["scripts/deploy-self.js"]\ntimeout_ms = 600000\n',
              stderr: ''
            }
      )
    });

    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {}
    });

    expect(/** @type {any} */ (snapshot.workspace_info).deploy_cmd).toEqual({
      cmd: ['scripts/deploy-self.js'],
      timeout_ms: 600000
    });
  });

  test('projects only a valid repo deployment and its merged PR coverage', async () => {
    const store = getWorkerRuntime().queueStore;
    const revision = store.snapshot(WS_DEPLOY.root_dir).revision;
    store.appendAttempt(WS_DEPLOY.root_dir, {
      expected_revision: revision,
      attempt: { attempt_id: 'att-UI-1', bead_id: 'UI-1' }
    });
    store.moveToPrWait(WS_DEPLOY.root_dir, {
      bead_id: 'UI-1',
      attempt_id: 'att-UI-1',
      patch: { status: 'done', finished_at: 1 }
    });
    store.bindDeploymentRequest(WS_DEPLOY.root_dir, {
      bead_id: 'UI-1',
      merge_sha: 'b'.repeat(40),
      verified_target_sha: TARGET_SHA,
      deployment_generation: 4,
      pr_url: 'https://github.com/o/r/pull/41'
    });
    store.recordDeploymentObservation(WS_DEPLOY.root_dir, {
      state: 'failed',
      target_base: 'main',
      target_sha: TARGET_SHA,
      deployed_sha: null,
      generation: 4,
      error_code: 'healthcheck_failed',
      log_path: '/tmp/deploy.log'
    });
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_DEPLOY });

    await send(sock, 'deployment-snapshot', 'subscribe-worker-queue', {
      id: 'wq'
    });

    const snapshot = queueSnapshots(sock).at(-1);
    expect(snapshot.deployment).toMatchObject({
      state: '확인 필요',
      repo: 'wq-deployment',
      desired_sha: 'aaaaaaaa',
      included_merge_count: 1,
      log: { label: '배포 로그' },
      actions: [{ kind: 'retry', label: '지금 재시도' }]
    });
    expect(snapshot.deployment).not.toHaveProperty('target_base');
    expect(snapshot.deployment).not.toHaveProperty('target_sha');
    expect(snapshot.deployment).not.toHaveProperty('log_path');
    expect(snapshot.deployment_coverage).toEqual({ 'UI-1': 'failed' });

    const malformed = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {},
      deployment: {
        state: 'failed',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: null,
        generation: 4,
        error_code: 'healthcheck_failed',
        log_path: null
      }
    });
    expect(malformed.deployment).toBeNull();
    expect(malformed.deployment_coverage).toEqual({});
  });

  test('projects recovery continuation without exposing unsafe provider retry', () => {
    const identity = 'd'.repeat(64);
    const failure_key = {
      repo: WS_DEPLOY.root_dir,
      target_base: 'main',
      target_sha: TARGET_SHA,
      generation: 4,
      error_code: 'healthcheck_failed',
      log_digest: 'e'.repeat(64)
    };
    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 7,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {
        'recovery-attempt': {
          attempt_id: 'recovery-attempt',
          status: 'failed',
          session_id: 'session-1'
        }
      },
      deployment: {
        state: 'failed',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: null,
        generation: 4,
        error_code: 'healthcheck_failed',
        log_path: '/tmp/deploy.log',
        recovery: {
          identity,
          failure_key,
          phase: 'unrecoverable',
          prepared_at: 1,
          bead_id: 'UI-recovery',
          attempt_id: 'recovery-attempt'
        }
      }
    });

    expect(/** @type {any} */ (snapshot.deployment).actions).toEqual([
      {
        kind: 'view_session',
        label: '세션 보기',
        attempt_id: 'recovery-attempt'
      },
      {
        kind: 'continue_recovery',
        label: '복구 이어가기',
        attempt_id: 'recovery-attempt'
      }
    ]);
  });

  test('projects settled automatic retry history without a live operation', () => {
    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 7,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {},
      deployment: {
        state: 'running',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: null,
        generation: 4,
        error_code: null,
        log_path: '/tmp/deploy.log',
        automatic_retry_count: 1,
        retry_operation: null
      }
    });

    expect(/** @type {any} */ (snapshot.deployment).timeline).toEqual([
      { kind: 'automatic_retry', at: null },
      { kind: 'provider_attempt', at: null }
    ]);
  });

  test('projects only bounded durable deployment notification keys', () => {
    const identity = 'c'.repeat(64);
    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [],
      attempts: {},
      deployment: {
        state: 'failed',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: null,
        generation: 4,
        error_code: 'healthcheck_failed',
        log_path: '/tmp/deploy.log',
        notifications: [
          {
            kind: 'recovery_prepared',
            identity,
            revision: 7,
            key: `recovery_prepared:${identity}:7`
          },
          {
            kind: 'awaiting_confirmation',
            identity,
            revision: 8,
            key: `awaiting_confirmation:${identity}:7`
          },
          { kind: 'deployment_succeeded', key: 'provider-owned-output' }
        ]
      }
    });

    expect(/** @type {any} */ (snapshot.deployment).notifications).toEqual([
      {
        key: `recovery_prepared:${identity}:7`,
        text: '배포 복구를 준비했습니다',
        variant: 'warning'
      }
    ]);
  });

  test('continues the current recovery attempt under queue revision CAS', async () => {
    const workspace = '/tmp/wq-deployment-recovery-continue';
    const identity = 'f'.repeat(64);
    const failure_key = {
      repo: workspace,
      target_base: 'main',
      target_sha: TARGET_SHA,
      generation: 3,
      error_code: 'healthcheck_failed',
      log_digest: '1'.repeat(64)
    };
    const store = getWorkerRuntime().queueStore;
    /**
     * @param {number} generation
     * @param {'pending'|'failed'} state
     */
    const observation = (generation, state) => ({
      state,
      target_base: 'main',
      target_sha: TARGET_SHA,
      deployed_sha: null,
      generation,
      error_code: state === 'failed' ? 'healthcheck_failed' : null,
      log_path: state === 'failed' ? '/tmp/deploy.log' : null
    });
    store.recordDeploymentObservation(workspace, observation(1, 'failed'));
    for (let generation = 1; generation < 3; generation += 1) {
      const key = { ...failure_key, generation };
      store.scheduleDeploymentRetry(workspace, key, 0);
      store.prerecordDeploymentRetry(workspace, key, 0);
      store.recordDeploymentRetryReturned(workspace, key, {
        target_base: 'main',
        target_sha: TARGET_SHA,
        generation: generation + 1
      });
      store.settleDeploymentRetry(
        workspace,
        key,
        observation(generation + 1, 'pending')
      );
      store.recordDeploymentObservation(
        workspace,
        observation(generation + 1, 'failed')
      );
    }
    store.scheduleDeploymentRetry(workspace, failure_key, 0);
    store.prerecordDeploymentRecovery(workspace, failure_key, {
      identity,
      prepared_at: 1
    });
    store.bindDeploymentRecoveryBead(workspace, {
      identity,
      bead_id: 'UI-recovery'
    });
    const appended = store.appendAttempt(workspace, {
      expected_revision: store.snapshot(workspace).revision,
      attempt: {
        attempt_id: 'recovery-attempt',
        bead_id: 'UI-recovery',
        status: 'failed',
        deployment_recovery_identity: identity,
        deployment_recovery_root: true,
        deployment_recovery_failure_key: failure_key
      }
    });
    expect(appended.ok).toBe(true);
    store.bindDeploymentRecoveryAttempt(workspace, {
      identity,
      attempt_id: 'recovery-attempt'
    });
    const continueRepoRecovery = vi.fn(async () => ({
      ok: true,
      attempt_id: 'recovery-attempt-2'
    }));
    const retryDeployment = vi.fn();
    __registerWorkerAttachmentForTest(
      workspace,
      /** @type {any} */ ({
        runtime: getWorkerRuntime(),
        scheduler: { continueRepoRecovery },
        deploymentJob: { retryDeployment }
      })
    );
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), {
      root_dir: workspace,
      db_path: `${workspace}/.beads/db`
    });
    const expected_revision = store.snapshot(workspace).revision;

    await send(
      sock,
      'deployment-recovery-continue',
      'worker-deployment-recovery-continue',
      {
        attempt_id: 'recovery-attempt',
        expected_revision
      }
    );

    expect(continueRepoRecovery).toHaveBeenCalledWith(workspace, {
      identity,
      attempt_id: 'recovery-attempt',
      continuation: undefined,
      decision_token: undefined
    });
    expect(
      replyFor(sock, 'deployment-recovery-continue').payload
    ).toMatchObject({
      resumed: true,
      conflict: false,
      new_attempt_id: 'recovery-attempt-2'
    });

    await send(sock, 'deployment-retry-hidden', 'worker-deployment-retry');

    expect(retryDeployment).not.toHaveBeenCalled();
    expect(replyFor(sock, 'deployment-retry-hidden').payload).toMatchObject({
      applied: false,
      reason: 'deployment_recovery_active'
    });
  });

  test('withholds a lower-generation row that failed its ancestry check from succeeded coverage', () => {
    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 1,
      queue: [],
      pr_wait: [
        {
          bead_id: 'UI-not-covered',
          merge_sha: 'b'.repeat(40),
          verified_target_sha: 'c'.repeat(40),
          deployment_generation: 3,
          cleanup_cursor: 'deployment_observe',
          pr_url: 'https://github.com/o/r/pull/42'
        }
      ],
      done: [],
      attempts: {},
      cleanup_failed: {
        'UI-not-covered': {
          step: 'deployment_request',
          reason: 'deployment_not_covering_merge'
        }
      },
      deployment: {
        state: 'succeeded',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: TARGET_SHA,
        generation: 4,
        error_code: null,
        log_path: '/tmp/deploy.log'
      }
    });

    expect(/** @type {any} */ (snapshot.deployment).included_merge_count).toBe(
      0
    );
    expect(snapshot.deployment_coverage).toEqual({});
  });

  test('projects an exact same-generation binding as succeeded coverage', () => {
    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 1,
      queue: [],
      pr_wait: [
        {
          bead_id: 'UI-exact',
          merge_sha: 'b'.repeat(40),
          verified_target_sha: TARGET_SHA,
          deployment_generation: 4,
          cleanup_cursor: 'deployment_observe',
          pr_url: 'https://github.com/o/r/pull/43'
        }
      ],
      done: [],
      attempts: {},
      deployment: {
        state: 'succeeded',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: TARGET_SHA,
        generation: 4,
        error_code: null,
        log_path: '/tmp/deploy.log'
      }
    });

    expect(/** @type {any} */ (snapshot.deployment).included_merge_count).toBe(
      1
    );
    expect(snapshot.deployment_coverage).toEqual({ 'UI-exact': 'succeeded' });
  });

  test('projects a lower-generation row after durable post-ancestry cleanup begins', () => {
    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 1,
      queue: [],
      pr_wait: [
        {
          bead_id: 'UI-covered',
          merge_sha: 'b'.repeat(40),
          verified_target_sha: 'c'.repeat(40),
          deployment_generation: 3,
          cleanup_cursor: 'deployment_observe',
          pr_url: 'https://github.com/o/r/pull/44'
        }
      ],
      done: [],
      attempts: {},
      cleanup_failed: {
        'UI-covered': {
          step: 'child_sweep',
          reason: 'child_close_failed'
        }
      },
      deployment: {
        state: 'succeeded',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: TARGET_SHA,
        generation: 4,
        error_code: null,
        log_path: '/tmp/deploy.log'
      }
    });

    expect(/** @type {any} */ (snapshot.deployment).included_merge_count).toBe(
      1
    );
    expect(snapshot.deployment_coverage).toEqual({
      'UI-covered': 'succeeded'
    });
  });

  test('keeps a covered PR number after closure moves its binding to done', () => {
    const snapshot = decorateQueue(WS_DEPLOY.root_dir, {
      revision: 1,
      queue: [],
      pr_wait: [],
      done: [
        {
          bead_id: 'UI-closed',
          merge_sha: 'b'.repeat(40),
          verified_target_sha: 'c'.repeat(40),
          deployment_generation: 3,
          cleanup_cursor: 'deployment_observe',
          pr_url: 'https://github.com/o/r/pull/45'
        }
      ],
      attempts: {},
      deployment: {
        state: 'succeeded',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: TARGET_SHA,
        generation: 4,
        error_code: null,
        log_path: '/tmp/deploy.log'
      }
    });

    expect(/** @type {any} */ (snapshot.deployment).included_merge_count).toBe(
      1
    );
    expect(snapshot.deployment_coverage).toEqual({});
  });

  test('retries only the current failed desired binding and persists pending', async () => {
    const store = getWorkerRuntime().queueStore;
    store.recordDeploymentObservation(WS_DEPLOY.root_dir, {
      state: 'failed',
      target_base: 'main',
      target_sha: TARGET_SHA,
      deployed_sha: null,
      generation: 4,
      error_code: 'healthcheck_failed',
      log_path: '/tmp/deploy.log'
    });
    const retryDeployment = vi.fn(async () => ({
      accepted: true,
      noop: false,
      target_base: 'main',
      target_sha: TARGET_SHA,
      generation: 5,
      error_code: null
    }));
    __registerWorkerAttachmentForTest(
      WS_DEPLOY.root_dir,
      /** @type {any} */ ({
        runtime: getWorkerRuntime(),
        repo: WS_DEPLOY.root_dir,
        deploymentJob: { retryDeployment }
      })
    );
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...WS_DEPLOY });

    await send(sock, 'deployment-retry', 'worker-deployment-retry');

    expect(retryDeployment).toHaveBeenCalledWith({
      repo: WS_DEPLOY.root_dir,
      current_binding: {
        target_base: 'main',
        target_sha: TARGET_SHA,
        generation: 4
      }
    });
    expect(replyFor(sock, 'deployment-retry').payload).toMatchObject({
      applied: true
    });
    expect(store.snapshot(WS_DEPLOY.root_dir).deployment).toMatchObject({
      state: 'pending',
      target_sha: TARGET_SHA,
      generation: 5
    });
  });

  test('does not call the provider for a non-failed deployment state', async () => {
    const workspace = '/tmp/wq-deployment-pending';
    const store = getWorkerRuntime().queueStore;
    store.recordDeploymentObservation(workspace, {
      state: 'pending',
      target_base: 'main',
      target_sha: TARGET_SHA,
      deployed_sha: null,
      generation: 1,
      error_code: null,
      log_path: null
    });
    const retryDeployment = vi.fn();
    __registerWorkerAttachmentForTest(
      workspace,
      /** @type {any} */ ({
        runtime: getWorkerRuntime(),
        repo: workspace,
        deploymentJob: { retryDeployment }
      })
    );
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), {
      root_dir: workspace,
      db_path: `${workspace}/.beads/db`
    });

    await send(sock, 'deployment-not-failed', 'worker-deployment-retry');

    expect(retryDeployment).not.toHaveBeenCalled();
    expect(replyFor(sock, 'deployment-not-failed').payload).toMatchObject({
      applied: false,
      reason: 'deployment_not_retryable'
    });
  });

  test('does not persist a retry after the durable binding changes', async () => {
    const workspace = '/tmp/wq-deployment-stale';
    const store = getWorkerRuntime().queueStore;
    store.recordDeploymentObservation(workspace, {
      state: 'failed',
      target_base: 'main',
      target_sha: TARGET_SHA,
      deployed_sha: null,
      generation: 4,
      error_code: 'healthcheck_failed',
      log_path: '/tmp/deploy.log'
    });
    const retryDeployment = vi.fn(async () => {
      store.recordDeploymentObservation(workspace, {
        state: 'failed',
        target_base: 'main',
        target_sha: TARGET_SHA,
        deployed_sha: null,
        generation: 5,
        error_code: 'healthcheck_failed',
        log_path: '/tmp/deploy-new.log'
      });
      return {
        accepted: true,
        noop: false,
        target_base: 'main',
        target_sha: TARGET_SHA,
        generation: 5,
        error_code: null
      };
    });
    __registerWorkerAttachmentForTest(
      workspace,
      /** @type {any} */ ({
        runtime: getWorkerRuntime(),
        repo: workspace,
        deploymentJob: { retryDeployment }
      })
    );
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), {
      root_dir: workspace,
      db_path: `${workspace}/.beads/db`
    });

    await send(sock, 'deployment-stale', 'worker-deployment-retry');

    expect(replyFor(sock, 'deployment-stale').payload).toMatchObject({
      applied: false,
      reason: 'deployment_retry_stale'
    });
    expect(store.snapshot(workspace).deployment).toMatchObject({
      state: 'failed',
      generation: 5,
      log_path: '/tmp/deploy-new.log'
    });
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
