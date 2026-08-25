import fs from 'node:fs';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MESSAGE_TYPES } from '../app/protocol.js';
import {
  __registerWorkerAttachmentForTest,
  __resetWorkerAttachmentsForTest,
  __setUnattachedAdmissionCheckForTest,
  createWorkerAttachment
} from './worker/attach.js';
import {
  __resetRepoOpsDisplayForTest,
  recordRepoOpsDisplay
} from './worker/repo-ops-display.js';
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

// `subscribe-worker-queue`는 세션 레인 스캔을 트리거한다 (UI-0a2m) — 실제 bd
// 프로세스가 뜨지 않도록 스냅샷 요청을 주입 가능한 응답으로 바꾼다. 기본은
// "읽을 수 없음"이라 스캔이 조용히 negative-cache로 끝난다.
const snapshot_seam = vi.hoisted(() => ({
  /** @type {{ ok: boolean, stale?: boolean, snapshot?: any }} */
  response: { ok: false }
}));
vi.mock('./workspace-snapshot-runtime.js', () => ({
  requestWorkspaceSnapshot: async () => snapshot_seam.response,
  signalWorkspaceSnapshotMutation: () => {},
  __resetWorkspaceSnapshotRuntimeForTest: () => {},
  __setWorkspaceSnapshotCoordinatorFactoryForTest: () => {}
}));

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
  __setUnattachedAdmissionCheckForTest(async () => ({ ok: true }));
  __resetRepoOpsDisplayForTest();
  const absent_repo_ops = {
    status: 'absent',
    source_path: 'repo-ops/config.toml',
    base_ref: 'main',
    base_sha: 'a'.repeat(40),
    verify: null,
    deploy: null,
    error_code: null
  };
  recordRepoOpsDisplay('', /** @type {any} */ (absent_repo_ops));
  recordRepoOpsDisplay(process.cwd(), /** @type {any} */ (absent_repo_ops));
  // Seed DEFAULT_WORKSPACE so bare sockets resolve a deterministic workspace.
  attachWsServer(createServer(), { path: '/ws' });
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetRegistriesForTest();
  __resetWorkerQueueForTest();
  __resetWorkerAttachmentsForTest();
  __resetRepoOpsDisplayForTest();
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
      }
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
      terminal_reason: null,
      auto_resolution: null
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

  test('stores the workspace orchestration defaults under the queue revision', async () => {
    const sock = fakeSocket();

    await send(sock, 'q1', 'worker-queue-set-orchestration-defaults', {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet', orchestration_effort: 'high' }
    });

    expect(replyFor(sock, 'q1').payload).toMatchObject({
      applied: true,
      conflict: false,
      queue: { orchestration_model: 'sonnet', orchestration_effort: 'high' }
    });
  });

  test('rejects a session key on the orchestration-defaults route', async () => {
    const sock = fakeSocket();

    await send(sock, 'q2', 'worker-queue-set-orchestration-defaults', {
      expected_revision: 0,
      values: { spec_review_model: 'codex' }
    });

    expect(replyFor(sock, 'q2').payload.applied).toBe(false);
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

  test('automation toggle turns both axes on in one queue revision', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-automation-toggle', {
      on: true,
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: true,
      conflict: false,
      queue: {
        revision: 1,
        auto_advance: true,
        auto_merge: true
      }
    });
    expect(queueSnapshots(sock).at(-1)).toMatchObject({
      revision: 1,
      auto_advance: true,
      auto_merge: true
    });
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
      decision_token,
      instructions: '  실패 로그부터 확인  '
    });

    expect(resume).toHaveBeenCalledWith(process.cwd(), 'att-1', {
      continuation: 'fresh_current',
      decision_token,
      instructions: '실패 로그부터 확인'
    });
    expect(replyFor(sock, 'r1').payload.new_attempt_id).toBe('att-2');
  });

  test('worker-attempt-resume rejects non-string instructions', async () => {
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-attempt-resume', {
      attempt_id: 'att-1',
      expected_revision: 0,
      instructions: 42
    });

    expect(replyFor(sock, 'r1').error).toMatchObject({
      code: 'bad_request',
      message: 'invalid instructions'
    });
  });

  test('worker-attempt-resume rejects instructions over 4000 characters', async () => {
    const sock = fakeSocket();

    await send(sock, 'r1', 'worker-attempt-resume', {
      attempt_id: 'att-1',
      expected_revision: 0,
      instructions: 'x'.repeat(4001)
    });

    expect(replyFor(sock, 'r1').error).toMatchObject({
      code: 'bad_request',
      message: 'invalid instructions'
    });
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
      'worker-automation-toggle',
      'worker-queue-place',
      'worker-queue-reorder',
      'worker-queue-remove',
      'worker-queue-set-orchestration-defaults',
      'worker-queue-set-serial-lane-count',
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
   * @param {'current'|'missing'|'stale'|'invalid'} [review_state]
   */
  function observe(pr = {}, review_state = 'current') {
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
      review_receipt: { state: review_state, head_sha: SHA }
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
    expect(obs.gate).toMatchObject({ enabled: true, gate_badge: '머지 가능' });
  });

  test('the snapshot carries the recorded receipt warning', async () => {
    parkInPrWait('UI-9');
    getWorkerRuntime().queueStore.updateAttempt('', {
      attempt_id: 'att-UI-9',
      patch: {
        receipt_check: {
          ok: false,
          probe_error: false,
          checked_at: 5,
          violations: [{ code: 'main_receipt_unbacked', detail: 'main:bead' }],
          checks: {}
        }
      }
    });
    observe();
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(
      queueSnapshots(sock).at(-1).pr_observations['UI-9'].receipt_check
    ).toEqual({
      ok: false,
      probe_error: false,
      codes: ['main_receipt_unbacked'],
      blocking_codes: ['main_receipt_unbacked']
    });
  });

  test('omits the receipt warning when no attempt recorded one', async () => {
    parkInPrWait('UI-9');
    observe();
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(
      queueSnapshots(sock).at(-1).pr_observations['UI-9'].receipt_check
    ).toBe(null);
  });

  test('never lets the cached snapshot gate decide a receipt', async () => {
    parkInPrWait('UI-9');
    getWorkerRuntime().queueStore.updateAttempt('', {
      attempt_id: 'att-UI-9',
      patch: {
        receipt_check: {
          ok: false,
          probe_error: false,
          checked_at: 5,
          violations: [{ code: 'dispatch_forged', detail: 'x' }],
          checks: {}
        }
      }
    });
    observe();
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(
      queueSnapshots(sock).at(-1).pr_observations['UI-9'].gate
    ).toMatchObject({ enabled: true, tier: 'eligible' });
  });

  test('the snapshot rejects a verify receipt pinned to an older base', async () => {
    parkInPrWait('UI-9');
    observe();
    getWorkerRuntime().prObservations.recordVerify('', 'UI-9', {
      effective_base_sha: 'a'.repeat(40),
      head_sha: SHA,
      ok: true,
      reason: 'ok',
      at: 1
    });
    const repo_ops = {
      status: 'resolved',
      source_path: 'repo-ops/config.toml',
      base_ref: 'main',
      base_sha: 'b'.repeat(40),
      verify: { script: 'repo-ops/script/verify', timeout_ms: 1000 },
      deploy: null,
      error_code: null
    };
    recordRepoOpsDisplay('', /** @type {any} */ (repo_ops));
    recordRepoOpsDisplay(process.cwd(), /** @type {any} */ (repo_ops));
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(
      queueSnapshots(sock).at(-1).pr_observations['UI-9'].gate
    ).toMatchObject({
      enabled: false,
      tier: 'verify',
      reason: 'verify_missing'
    });
  });

  test('the snapshot refuses a stale implementation review', async () => {
    parkInPrWait('UI-9');
    observe({}, 'stale');
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(
      queueSnapshots(sock).at(-1).pr_observations['UI-9'].gate
    ).toMatchObject({
      enabled: false,
      tier: 'review',
      reason: 'review_receipt_stale'
    });
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
    ).toMatchObject({ enabled: true, gate_badge: '머지 가능' });
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

  // 거부된 처분도 fanout을 타지만, 구독자가 이미 같은 큐를 들고 있으면 프레임은
  // 나가지 않는다(UI-d509 dedup) — 회신의 `queue`가 현재 상태를 전달한다.
  test('does not re-send the unchanged queue when the disposition was refused', async () => {
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

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      ok: false,
      reason: 'not_parked'
    });
    expect(queueSnapshots(sock)).toHaveLength(0);
  });

  test('a queue with nothing parked carries an empty observation map', async () => {
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock).at(-1).revise_parked).toEqual({});
  });
});

describe('ws worker cleanup retry', () => {
  /**
   * @param {any} retryCleanup
   */
  function registerCleanupRetry(retryCleanup) {
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: { retryCleanup }
      })
    );
  }

  test('rejects a stale revision with the current queue before acting', async () => {
    const retryCleanup = vi.fn();
    registerCleanupRetry(retryCleanup);
    const sock = fakeSocket();

    await send(sock, 'c1', 'worker-cleanup-retry', {
      bead_id: 'UI-1',
      expected_revision: 99
    });

    expect(retryCleanup).not.toHaveBeenCalled();
    expect(replyFor(sock, 'c1').payload).toMatchObject({
      bead_id: 'UI-1',
      retried: false,
      conflict: true,
      pending: false,
      cleanup_step: null,
      reason: null,
      queue: { revision: 0 }
    });
  });

  test('calls the attachment once and replies and fans out the latest queue', async () => {
    const store = getWorkerRuntime().queueStore;
    const retryCleanup = vi.fn(async () => {
      store.setAutoAdvance('', true);
      return { ok: true, pending: false, step: null, reason: null };
    });
    registerCleanupRetry(retryCleanup);
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'c1', 'worker-cleanup-retry', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    const current_revision = store.snapshot('').revision;
    expect(retryCleanup).toHaveBeenCalledTimes(1);
    expect(retryCleanup).toHaveBeenCalledWith('UI-1');
    expect(replyFor(sock, 'c1').payload).toMatchObject({
      bead_id: 'UI-1',
      retried: true,
      conflict: false,
      pending: false,
      cleanup_step: null,
      reason: null,
      queue: { revision: current_revision }
    });
    expect(queueSnapshots(sock)).toHaveLength(1);
    expect(queueSnapshots(sock)[0].revision).toBe(current_revision);
  });

  test('fails closed with the current queue when no attachment is registered', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'c1', 'worker-cleanup-retry', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'c1').payload).toMatchObject({
      bead_id: 'UI-1',
      retried: false,
      conflict: false,
      pending: false,
      cleanup_step: null,
      reason: 'no_attachment',
      queue: { revision: 0 }
    });
    // The subscriber already holds revision 0; the fanout is deduplicated.
    expect(queueSnapshots(sock)).toHaveLength(0);
  });

  test('fails closed when the attachment action is unavailable', async () => {
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick: vi.fn(), stop: vi.fn() },
        prActions: {}
      })
    );
    const sock = fakeSocket();

    await send(sock, 'c1', 'worker-cleanup-retry', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'c1').payload).toMatchObject({
      retried: false,
      conflict: false,
      reason: 'no_attachment',
      queue: { revision: 0 }
    });
  });

  test('collapses a thrown action and replies with the latest queue', async () => {
    registerCleanupRetry(async () => {
      throw new Error('boom');
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'c1', 'worker-cleanup-retry', {
      bead_id: 'UI-1',
      expected_revision: 0
    });

    expect(replyFor(sock, 'c1').payload).toMatchObject({
      retried: false,
      conflict: false,
      reason: 'error',
      queue: { revision: 0 }
    });
    expect(queueSnapshots(sock)).toHaveLength(0);
  });

  test('rejects an empty bead id', async () => {
    const sock = fakeSocket();

    await send(sock, 'c1', 'worker-cleanup-retry', {
      bead_id: '',
      expected_revision: 0
    });

    expect(replyFor(sock, 'c1').error.code).toBe('bad_request');
  });

  test('carries a stranded real attachment row through canonical cleanup to Done', async () => {
    const runtime = getWorkerRuntime();
    /** @type {Record<string, string>} */
    const statuses = { 'UI-root': 'resolved' };
    const attachment = createWorkerAttachment(process.cwd(), {
      runtime,
      bd: {
        snapshotBead: async () => ({
          ready: true,
          blocked: false,
          repo: process.cwd(),
          target_base: 'main',
          status: 'resolved',
          deps: []
        }),
        listChildren: async () => [],
        setStatus: async (
          /** @type {string} */ id,
          /** @type {string} */ status
        ) => {
          statuses[id] = status;
        },
        readStatus: async (/** @type {string} */ id) => statuses[id],
        readMetadata: async () => null
      },
      worktree: {
        removeByBranch: async () => ({
          ok: true,
          removed: false,
          reason: null
        }),
        withTopologyLock: async (
          /** @type {string} */ _repo,
          /** @type {any} */ run
        ) => run()
      },
      verify: {
        verifyPrSubmitted: async () => ({
          ok: true,
          reason: 'ok',
          pr_url: 'https://github.com/o/r/pull/1'
        })
      },
      spawn_impl: vi.fn()
    });
    const store = runtime.queueStore;
    store.appendAttempt('', {
      expected_revision: store.snapshot('').revision,
      attempt: {
        attempt_id: 'att-root',
        bead_id: 'UI-root',
        repo: process.cwd(),
        target_base: 'main',
        base_oid: 'b'.repeat(40)
      }
    });
    store.moveToPrWait('', {
      bead_id: 'UI-root',
      attempt_id: 'att-root',
      patch: { status: 'done' }
    });
    store.enqueueCompletionIntent('', {
      root_bead_id: 'UI-root',
      source_attempt_id: 'att-root',
      target_base: 'main',
      subject: {
        role: 'root',
        bead_id: 'UI-root',
        pr_url: 'https://github.com/o/r/pull/1',
        head_sha: 'a'.repeat(40),
        base_sha: 'b'.repeat(40),
        merged_sha: 'c'.repeat(40)
      }
    });
    store.terminalizeCompletionIntent('', {
      root_bead_id: 'UI-root',
      terminal: {
        reason: 'parent_close_failed',
        stage: 'cleanup',
        failure_key: null,
        evidence: null,
        log_path: null,
        at: 1
      }
    });
    store.recordCleanupFailure('', {
      bead_id: 'UI-root',
      step: 'parent_close',
      reason: 'bd_close_failed'
    });
    __registerWorkerAttachmentForTest(process.cwd(), attachment);
    const sock = fakeSocket();

    await send(sock, 'c1', 'worker-cleanup-retry', {
      bead_id: 'UI-root',
      expected_revision: store.snapshot('').revision
    });

    expect(replyFor(sock, 'c1').payload).toMatchObject({
      retried: true,
      conflict: false,
      pending: false,
      queue: {
        cleanup_failed: {},
        done: [{ bead_id: 'UI-root' }],
        completion_status: {
          'UI-root': { phase: 'completed', terminal_reason: null }
        }
      }
    });
    expect(store.snapshot('').pr_wait).toEqual([]);
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
      review_receipt: { state: 'current', head_sha: sha }
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
        prActions: {
          merge: vi.fn(),
          discard: vi.fn(),
          // Whether an irreversible merge EFFECT is running — the only thing
          // that may refuse a [취소] (UI-58w8 §1).
          isInFlight: () => false,
          // The click-time authoritative identity read the manual authority
          // binds (UI-58w8 §1).
          probeMergeability: vi.fn(async () => ({
            ok: true,
            kind: 'clean',
            reason: null,
            head_sha: 'f'.repeat(40),
            base_ref: 'main',
            external: false
          }))
        },
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
      {
        bead_id: 'UI-1',
        resolution_rounds: 0,
        resolution: null,
        authority: {
          id: expect.any(String),
          source: 'manual',
          granted_at: expect.any(Number),
          requested_head_sha: 'f'.repeat(40),
          target_base: 'main'
        },
        head_review: null
      }
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

  test('add-all leaves a green row out when repo-ops policy is invalid', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    const invalid_repo_ops = {
      status: 'error',
      source_path: 'repo-ops/config.toml',
      base_ref: 'main',
      base_sha: 'b'.repeat(40),
      verify: null,
      deploy: null,
      error_code: 'repo_ops_config_invalid'
    };
    recordRepoOpsDisplay('', /** @type {any} */ (invalid_repo_ops));
    recordRepoOpsDisplay(process.cwd(), /** @type {any} */ (invalid_repo_ops));
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-queue-add-all', {
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: false,
      queued: 0
    });
    expect(getWorkerRuntime().queueStore.snapshot('').merge_queue).toEqual([]);
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

  /**
   * A resolved declaration with a `[verify]` lane at the same base the bead
   * observed — the shape that makes the gate demand a receipt.
   */
  function recordDeclaredVerify() {
    const repo_ops = {
      status: 'resolved',
      source_path: 'repo-ops/config.toml',
      base_ref: 'main',
      base_sha: 'e'.repeat(40),
      verify: { script: 'repo-ops/script/verify', timeout_ms: 1000 },
      deploy: null,
      error_code: null
    };
    recordRepoOpsDisplay('', /** @type {any} */ (repo_ops));
    recordRepoOpsDisplay(process.cwd(), /** @type {any} */ (repo_ops));
  }

  test('the auto-merge toggle holds a row whose declared verify has no receipt', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    recordDeclaredVerify();
    registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-auto-toggle', {
      on: true,
      expected_revision: getWorkerRuntime().queueStore.snapshot('').revision
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(getWorkerRuntime().queueStore.snapshot('').merge_queue).toEqual([]);
  });

  test('the auto-merge toggle enrolls a row whose verify lane is opted out', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    recordDeclaredVerify();
    const store = getWorkerRuntime().queueStore;
    store.setRepoOpsOptOut('', {
      expected_revision: store.snapshot('').revision,
      kind: 'verify',
      opted_out: true
    });
    const kick = registerDriver();
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-merge-auto-toggle', {
      on: true,
      expected_revision: store.snapshot('').revision
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(
      store
        .snapshot('')
        .merge_queue.map((/** @type {any} */ entry) => entry.bead_id)
    ).toEqual(['UI-1']);
    expect(kick).toHaveBeenCalled();
  });

  test('automation ON starts dispatch, observes PRs, and enrolls eligible rows', async () => {
    parkInPrWait('UI-1');
    observeGreen('UI-1');
    const tick = vi.fn(async () => {});
    const observe = vi.fn(async () => {});
    const kick = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick, stop: vi.fn() },
        prActions: { merge: vi.fn(), discard: vi.fn() },
        mergeQueue: {
          kick,
          state: () => ({ active: null, failures: {} })
        },
        prPoller: { tick: observe }
      })
    );
    const store = getWorkerRuntime().queueStore;
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-automation-toggle', {
      on: true,
      expected_revision: store.snapshot('').revision
    });
    await Promise.resolve();
    await Promise.resolve();

    expect(tick).toHaveBeenCalledWith(process.cwd());
    expect(observe).toHaveBeenCalledOnce();
    expect(
      store
        .snapshot('')
        .merge_queue.map((/** @type {any} */ entry) => entry.bead_id)
    ).toEqual(['UI-1']);
    expect(kick).toHaveBeenCalled();
  });

  test('independent merge OFF during automation observation prevents enrollment', async () => {
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
        prPoller: { tick: () => observing }
      })
    );
    const store = getWorkerRuntime().queueStore;
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-automation-toggle', {
      on: true,
      expected_revision: store.snapshot('').revision
    });
    await send(sock, 'm2', 'worker-merge-auto-toggle', {
      on: false,
      expected_revision: store.snapshot('').revision
    });
    release();
    await new Promise((resolve) => setTimeout(resolve, 0));

    const queue = store.snapshot('');
    expect(queue.auto_advance).toBe(true);
    expect(queue.auto_merge).toBe(false);
    expect(queue.merge_queue).toEqual([]);
  });

  test('automation OFF clears waiting merges without starting ON effects', async () => {
    parkInPrWait('UI-1');
    parkInPrWait('UI-2');
    const tick = vi.fn(async () => {});
    const observe = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick, stop: vi.fn() },
        prActions: { merge: vi.fn(), discard: vi.fn() },
        mergeQueue: {
          kick: vi.fn(async () => {}),
          state: () => ({ active: 'UI-1', failures: {} })
        },
        prPoller: { tick: observe }
      })
    );
    const store = getWorkerRuntime().queueStore;
    store.enqueueMerge('', {
      expected_revision: store.snapshot('').revision,
      entries: [{ bead_id: 'UI-1' }, { bead_id: 'UI-2' }]
    });
    store.toggleAutomation('', {
      expected_revision: store.snapshot('').revision,
      on: true
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-automation-toggle', {
      on: false,
      expected_revision: store.snapshot('').revision
    });
    await Promise.resolve();

    expect(replyFor(sock, 'm1').payload.queue).toMatchObject({
      auto_advance: false,
      auto_merge: false
    });
    expect(
      store
        .snapshot('')
        .merge_queue.map((/** @type {any} */ entry) => entry.bead_id)
    ).toEqual(['UI-1']);
    expect(tick).not.toHaveBeenCalled();
    expect(observe).not.toHaveBeenCalled();
  });

  test('automation conflict returns the current queue without starting effects', async () => {
    const tick = vi.fn(async () => {});
    const observe = vi.fn(async () => {});
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {any} */ ({
        scheduler: { tick, stop: vi.fn() },
        prActions: { merge: vi.fn(), discard: vi.fn() },
        mergeQueue: {
          kick: vi.fn(async () => {}),
          state: () => ({ active: null, failures: {} })
        },
        prPoller: { tick: observe }
      })
    );
    const sock = fakeSocket();

    await send(sock, 'm1', 'worker-automation-toggle', {
      on: true,
      expected_revision: 99
    });
    await Promise.resolve();

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: false,
      conflict: true,
      queue: { revision: 0, auto_advance: false, auto_merge: false }
    });
    expect(tick).not.toHaveBeenCalled();
    expect(observe).not.toHaveBeenCalled();
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
      reason: 'verify_cmd_failed'
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

  test('cancels an item held by a running head review (UI-58w8 §1)', async () => {
    parkInPrWait('UI-1');
    registerDriver({ active: 'UI-1' });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    const store = getWorkerRuntime().queueStore;
    await send(sock, 'm1', 'worker-merge-queue-add', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision
    });
    const authority_id = store.snapshot('').merge_queue[0].authority?.id || '';
    store.beginHeadReview('', {
      bead_id: 'UI-1',
      authority_id,
      head_sha: 'f'.repeat(40),
      reviewer: 'codex',
      effort: 'xhigh'
    });
    store.setHeadReviewState('', {
      bead_id: 'UI-1',
      authority_id,
      head_sha: 'f'.repeat(40),
      expected_state: 'pending',
      patch: { state: 'reviewing', review_attempt_id: 'review:x' }
    });

    await send(sock, 'm2', 'worker-merge-queue-remove', {
      bead_id: 'UI-1',
      expected_revision: store.snapshot('').revision
    });

    // The driver holds the item while the reviewer is out, but cancelling IS
    // how the authority is discarded — only the merge effect itself locks it.
    expect(replyFor(sock, 'm2').payload.applied).toBe(true);
    expect(store.snapshot('').merge_queue).toEqual([]);
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

    // A manual click IS a continuation authority (UI-58w8 §1), and an
    // authority needs the head/base the click observed — without an
    // attachment there is nothing to observe through, so the click refuses
    // instead of queuing an identity-less entry.
    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: false,
      reason: 'no_attachment'
    });
    expect(getWorkerRuntime().queueStore.snapshot('').merge_queue).toEqual([]);
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

  test.each([
    ['worker-stale-work-continue', 'staleWorkContinue', 'continued'],
    ['worker-stale-work-recheck', 'staleWorkRecheck', 'rechecked']
  ])(
    'routes %s through the scheduler action fence',
    async (type, method, flag) => {
      const action = vi.fn(async () => ({ ok: true, state: 'unique' }));
      __registerWorkerAttachmentForTest(
        process.cwd(),
        /** @type {ReturnType<typeof import('./worker/attach.js').createWorkerAttachment>} */ (
          /** @type {unknown} */ ({ scheduler: { [method]: action } })
        )
      );
      const sock = fakeSocket();

      await send(sock, 'stale-1', type, {
        bead_id: 'UI-1',
        action_id: 'opaque-action',
        expected_revision: 0
      });

      expect(action).toHaveBeenCalledWith(process.cwd(), {
        bead_id: 'UI-1',
        action_id: 'opaque-action',
        expected_revision: 0
      });
      expect(replyFor(sock, 'stale-1').payload).toMatchObject({
        bead_id: 'UI-1',
        [flag]: true,
        conflict: false,
        queue: { revision: 0 }
      });
    }
  );

  test('routes stale-work backup-fresh through the durable coordinator', async () => {
    const backupFresh = vi.fn(async () => ({
      ok: true,
      operation_id: 'stale-work-1'
    }));
    __registerWorkerAttachmentForTest(
      process.cwd(),
      /** @type {ReturnType<typeof import('./worker/attach.js').createWorkerAttachment>} */ (
        /** @type {unknown} */ ({
          scheduler: {},
          discardCoordinator: { backupFresh }
        })
      )
    );
    const sock = fakeSocket();

    await send(sock, 'stale-2', 'worker-stale-work-backup-fresh', {
      bead_id: 'UI-1',
      action_id: 'opaque-action',
      expected_revision: 0
    });

    expect(backupFresh).toHaveBeenCalledWith({
      bead_id: 'UI-1',
      action_id: 'opaque-action',
      expected_revision: 0
    });
    expect(replyFor(sock, 'stale-2').payload).toMatchObject({
      bead_id: 'UI-1',
      accepted: true,
      operation_id: 'stale-work-1',
      conflict: false,
      queue: { revision: 0 }
    });
  });

  test.each([
    'worker-stale-work-continue',
    'worker-stale-work-backup-fresh',
    'worker-stale-work-recheck'
  ])('requires action identity and queue revision for %s', async (type) => {
    const sock = fakeSocket();

    await send(sock, 'stale-bad', type, { bead_id: 'UI-1' });

    expect(replyFor(sock, 'stale-bad').error.code).toBe('bad_request');
  });

  test('registers all stale-work actions as client-sendable messages', () => {
    expect(MESSAGE_TYPES).toEqual(
      expect.arrayContaining([
        'worker-stale-work-continue',
        'worker-stale-work-backup-fresh',
        'worker-stale-work-recheck'
      ])
    );
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

describe('ws worker-queue snapshot decoration', () => {
  const WS_DEPLOY = {
    root_dir: '/tmp/wq-deployment',
    db_path: '/tmp/wq-deployment/.beads/db'
  };

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

  test('projects stale-work admission without server identity details', () => {
    const snapshot = /** @type {any} */ (
      decorateQueue(WS_DEPLOY.root_dir, {
        revision: 1,
        queue: [{ bead_id: 'UI-1', added_at: 1 }],
        pr_wait: [],
        done: [],
        attempts: {},
        admission: {
          'UI-1': {
            reason: 'worktree_stale_work',
            at: 1,
            stale_work: {
              schema: 1,
              state: 'unique',
              cause: 'dirty_unique',
              summary: {
                staged_count: 1,
                unstaged_count: 0,
                untracked_count: 0,
                branch_ahead: 0,
                head_ahead: 0
              },
              identity_digest: 'a'.repeat(64),
              action_id: 'opaque-action',
              can_resume: false,
              can_continue: true,
              can_backup_fresh: true,
              can_recheck: true,
              identity: {
                worktree_realpath: '/private/repo/.worktrees/UI-1',
                branch: 'UI-1',
                head_sha: 'b'.repeat(40),
                base_oid: 'c'.repeat(40),
                status_digest: 'd'.repeat(64),
                stderr: 'secret git failure',
                contents: 'secret contents'
              }
            }
          }
        }
      })
    );

    expect(snapshot.admission['UI-1']).toEqual({
      reason: 'worktree_stale_work',
      at: 1,
      stale_work: {
        schema: 1,
        residue: 'worktree',
        state: 'unique',
        cause: 'dirty_unique',
        summary: {
          staged_count: 1,
          unstaged_count: 0,
          untracked_count: 0,
          branch_ahead: 0,
          head_ahead: 0
        },
        identity_digest: 'a'.repeat(64),
        action_id: 'opaque-action',
        can_resume: false,
        can_continue: true,
        can_backup_fresh: true,
        can_recheck: true
      }
    });
    expect(JSON.stringify(snapshot)).not.toContain('/private/repo');
    expect(JSON.stringify(snapshot)).not.toContain('secret git failure');
    expect(JSON.stringify(snapshot)).not.toContain('secret contents');
  });

  test('keeps legacy admission unchanged without stale-work payload', () => {
    const snapshot = /** @type {any} */ (
      decorateQueue(WS_DEPLOY.root_dir, {
        revision: 1,
        queue: [],
        pr_wait: [],
        done: [],
        attempts: {},
        admission: { 'UI-1': { reason: 'worktree_stale_work', at: 1 } }
      })
    );

    expect(snapshot.admission['UI-1']).toEqual({
      reason: 'worktree_stale_work',
      at: 1
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

describe('ws worker-queue 직렬 레인 (UI-04vo Phase 3)', () => {
  test('routes a lane-aware place into a serial lane', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      lane: 's1',
      expected_revision: 0
    });

    const reply = replyFor(sock, 'm1');
    expect(reply.payload.applied).toBe(true);
    expect(
      reply.payload.queue.serial_lanes[0].entries.map(
        (/** @type {any} */ e) => e.bead_id
      )
    ).toEqual(['UI-1']);
    expect(reply.payload.queue.queue).toEqual([]);
  });

  test('routes a lane-aware reorder within a serial lane', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm0', 'worker-queue-set-serial-lane-count', {
      count: 2,
      expected_revision: 0
    });
    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-1',
      lane: 's2',
      expected_revision: 1
    });
    await send(sock, 'm2', 'worker-queue-place', {
      bead_id: 'UI-2',
      lane: 's2',
      expected_revision: 2
    });

    await send(sock, 'm3', 'worker-queue-reorder', {
      bead_id: 'UI-2',
      lane: 's2',
      to_index: 0,
      expected_revision: 3
    });

    const reply = replyFor(sock, 'm3');
    expect(reply.payload.applied).toBe(true);
    expect(
      reply.payload.queue.serial_lanes[1].entries.map(
        (/** @type {any} */ e) => e.bead_id
      )
    ).toEqual(['UI-2', 'UI-1']);
  });

  test('routes worker-queue-set-serial-lane-count and returns truncated entries to parallel', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm0', 'worker-queue-set-serial-lane-count', {
      count: 2,
      expected_revision: 0
    });
    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-x',
      lane: 's2',
      expected_revision: 1
    });

    await send(sock, 'm2', 'worker-queue-set-serial-lane-count', {
      count: 1,
      expected_revision: 2
    });

    const reply = replyFor(sock, 'm2');
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.queue.serial_lanes).toHaveLength(1);
    expect(
      reply.payload.queue.queue.map((/** @type {any} */ e) => e.bead_id)
    ).toEqual(['UI-x']);
    expect(queueSnapshots(sock).at(-1).serial_lane_count).toBe(1);
  });

  test('rejects a non-integer serial lane count payload', async () => {
    const sock = fakeSocket();

    await send(sock, 'bad', 'worker-queue-set-serial-lane-count', {
      count: 'two',
      expected_revision: 0
    });

    expect(replyFor(sock, 'bad').error.code).toBe('bad_request');
  });

  test('retires the worker-queue-set-pr-wait-hold message type', async () => {
    const sock = fakeSocket();

    await send(sock, 'gone', 'worker-queue-set-pr-wait-hold', {
      on: true,
      expected_revision: 0
    });

    const reply = replyFor(sock, 'gone');
    expect(reply.ok).toBe(false);
  });

  test('snapshot derives per-lane corrections from blocks edges', async () => {
    const cache = getWorkerRuntime().titleCache;
    cache.refreshFromIssue(process.cwd(), {
      id: 'UI-a',
      title: 'blocker',
      labels: [],
      dependencies: []
    });
    cache.refreshFromIssue(process.cwd(), {
      id: 'UI-b',
      title: 'blockee',
      labels: [],
      dependencies: [{ id: 'UI-a', dependency_type: 'blocks' }]
    });
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-queue-place', {
      bead_id: 'UI-b',
      lane: 's1',
      expected_revision: 0
    });

    await send(sock, 'm2', 'worker-queue-place', {
      bead_id: 'UI-a',
      lane: 's1',
      expected_revision: 1
    });

    const snap = queueSnapshots(sock).at(-1);
    expect(snap.bead_blocked_by['UI-b']).toEqual(['UI-a']);
    expect(snap.lane_states.s1.cycle).toBe(false);
    expect(snap.lane_states.s1.corrections).toEqual([
      { bead_id: 'UI-b', after: 'UI-a' }
    ]);
    expect(snap.lane_states.s1.order).toEqual(['UI-a', 'UI-b']);
  });

  test('snapshot exposes serial lane occupancy from durable attempts', async () => {
    const store = getWorkerRuntime().queueStore;
    store.setSerialLaneCount(process.cwd(), {
      expected_revision: store.snapshot(process.cwd()).revision,
      count: 2
    });
    store.appendAttempt(process.cwd(), {
      expected_revision: store.snapshot(process.cwd()).revision,
      attempt: {
        attempt_id: 'att-lane',
        bead_id: 'UI-run',
        status: 'running',
        serial_lane_id: 's1'
      }
    });
    const sock = fakeSocket();

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    const snap = queueSnapshots(sock).at(-1);
    expect(snap.lane_states.s1.occupied_by).toEqual(['UI-run']);
    expect(snap.lane_states.s2.occupied_by).toEqual([]);
  });
});

describe('worker repo-ops opt-out toggle (UI-lsti §3)', () => {
  test('persists an opt-out and pushes it in the fanout snapshot', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    sock.sent = [];

    await send(sock, 'm1', 'worker-repo-ops-opt-out-toggle', {
      kind: 'verify',
      opted_out: true,
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').payload).toMatchObject({
      applied: true,
      conflict: false,
      queue: { revision: 1, repo_ops_opt_out: { verify: true, deploy: false } }
    });
    expect(queueSnapshots(sock).at(-1).repo_ops_opt_out).toEqual({
      verify: true,
      deploy: false
    });
  });

  test('opts a kind back in', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-repo-ops-opt-out-toggle', {
      kind: 'deploy',
      opted_out: true,
      expected_revision: 0
    });
    sock.sent = [];

    await send(sock, 'm2', 'worker-repo-ops-opt-out-toggle', {
      kind: 'deploy',
      opted_out: false,
      expected_revision: 1
    });

    expect(queueSnapshots(sock).at(-1).repo_ops_opt_out).toEqual({
      verify: false,
      deploy: false
    });
  });

  test('answers a stale revision with a conflict and the current queue', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await send(sock, 'm1', 'worker-repo-ops-opt-out-toggle', {
      kind: 'verify',
      opted_out: true,
      expected_revision: 0
    });

    await send(sock, 'm2', 'worker-repo-ops-opt-out-toggle', {
      kind: 'deploy',
      opted_out: true,
      expected_revision: 0
    });

    expect(replyFor(sock, 'm2').payload).toMatchObject({
      applied: false,
      conflict: true,
      queue: { revision: 1, repo_ops_opt_out: { verify: true, deploy: false } }
    });
  });

  test('rejects an unknown kind as a bad request', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-repo-ops-opt-out-toggle', {
      kind: 'publish',
      opted_out: true,
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').error.code).toBe('bad_request');
  });

  test('rejects a non-boolean opted_out as a bad request', async () => {
    const sock = fakeSocket();
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    await send(sock, 'm1', 'worker-repo-ops-opt-out-toggle', {
      kind: 'verify',
      opted_out: 'yes',
      expected_revision: 0
    });

    expect(replyFor(sock, 'm1').error.code).toBe('bad_request');
  });

  test('is a client-sendable MESSAGE_TYPE', () => {
    expect(MESSAGE_TYPES).toContain('worker-repo-ops-opt-out-toggle');
  });
});

describe('ws worker-queue bead_workflow + running overlay (UI-eey2 §9.2/§9.3)', () => {
  const WS_STEP = '/tmp/wq-stepper';

  /**
   * @param {string} bead_id
   * @param {string} route
   */
  function seedWorkflow(bead_id, route) {
    getWorkerRuntime().titleCache.refreshFromIssue(WS_STEP, {
      id: bead_id,
      title: `제목 ${bead_id}`,
      status: 'open',
      metadata: { route }
    });
  }

  test('carries a stepper for queue, serial, pr_wait and running beads only', () => {
    for (const bead_id of ['UI-q', 'UI-s', 'UI-p', 'UI-r', 'UI-d']) {
      seedWorkflow(bead_id, 'quick_fix');
    }

    const snapshot = /** @type {any} */ (
      decorateQueue(WS_STEP, {
        revision: 1,
        queue: [{ bead_id: 'UI-q', added_at: 1 }],
        serial_lanes: [{ id: 'lane-1', entries: [{ bead_id: 'UI-s' }] }],
        pr_wait: [{ bead_id: 'UI-p', added_at: 2 }],
        done: [{ bead_id: 'UI-d', added_at: 3 }],
        attempts: {
          'att-1': {
            attempt_id: 'att-1',
            bead_id: 'UI-r',
            status: 'running',
            started_at: 1
          }
        }
      })
    );

    expect(Object.keys(snapshot.bead_workflow).sort()).toEqual([
      'UI-p',
      'UI-q',
      'UI-r',
      'UI-s'
    ]);
    expect(snapshot.bead_workflow['UI-q'].route).toBe('quick_fix');
  });

  test('omits a bead whose record has not landed', () => {
    seedWorkflow('UI-known', 'spec_backed');

    const snapshot = /** @type {any} */ (
      decorateQueue(WS_STEP, {
        revision: 1,
        queue: [
          { bead_id: 'UI-known', added_at: 1 },
          { bead_id: 'UI-never-cached', added_at: 2 }
        ],
        pr_wait: [],
        done: [],
        attempts: {}
      })
    );

    expect(snapshot.bead_workflow).toHaveProperty('UI-known');
    expect(snapshot.bead_workflow).not.toHaveProperty('UI-never-cached');
  });

  test('overlays last_activity and legs onto a RUNNING attempt only', () => {
    const runtime = getWorkerRuntime();
    runtime.sessionLog.publish(WS_STEP, 'att-run', {
      type: 'assistant',
      message: { content: [{ type: 'text', text: '검증을 돌립니다.' }] }
    });
    /** @param {string} status */
    const withSessions = (status) => ({
      attempt_id: status === 'running' ? 'att-run' : 'att-done',
      bead_id: 'UI-1',
      status,
      started_at: 1,
      delegation_sessions: [
        {
          launch_id: 'launch-1',
          provider: 'codex',
          role: 'implementation',
          model: 'gpt-5.6-sol',
          effort: null,
          session_id: 'thread-1',
          turn_id: 'turn-1',
          status: 'running',
          started_at: 10,
          completed_at: null,
          last_event_at: 11
        },
        {
          launch_id: 'launch-2',
          provider: 'codex',
          role: 'review-consult',
          model: 'gpt-5.6-sol',
          effort: null,
          session_id: 'thread-2',
          turn_id: 'turn-2',
          status: 'done',
          started_at: 20,
          completed_at: '2026-08-18T04:27:02.000Z',
          last_event_at: 21
        }
      ]
    });

    const snapshot = /** @type {any} */ (
      decorateQueue(WS_STEP, {
        revision: 1,
        queue: [],
        pr_wait: [],
        done: [],
        attempts: {
          'att-run': withSessions('running'),
          'att-done': withSessions('done')
        }
      })
    );

    expect(snapshot.attempts['att-run'].last_activity).toMatchObject({
      kind: 'assistant',
      text: '검증을 돌립니다.'
    });
    expect(snapshot.attempts['att-run'].legs).toEqual([
      {
        role: 'implementation',
        runtime: 'codex',
        model: 'gpt-5.6-sol',
        state: 'live',
        ordinal: 1,
        label: '구현 unit 1 · codex'
      },
      {
        role: 'review-consult',
        runtime: 'codex',
        model: 'gpt-5.6-sol',
        state: 'done',
        ordinal: 1,
        label: 'review-consult · codex'
      }
    ]);
    expect(snapshot.attempts['att-done']).not.toHaveProperty('last_activity');
    expect(snapshot.attempts['att-done']).not.toHaveProperty('legs');
  });

  test('derives a done leg from a usage receipt with no observed launch', () => {
    const snapshot = /** @type {any} */ (
      decorateQueue(WS_STEP, {
        revision: 1,
        queue: [],
        pr_wait: [],
        done: [],
        attempts: {
          'att-legs': {
            attempt_id: 'att-legs',
            bead_id: 'UI-1',
            status: 'running',
            started_at: 1,
            usage_legs: [
              {
                receipt_id: 'r1',
                provider: 'codex',
                role: 'implementation',
                session_id: 'thread-9',
                turn_id: 'turn-9',
                model: 'gpt-5.6-sol',
                effort: null,
                usage: {
                  input_tokens: 1,
                  output_tokens: 1,
                  cache_read_input_tokens: 0,
                  cache_creation_input_tokens: 0,
                  reasoning_output_tokens: 0
                },
                completed_at: '2026-08-18T04:27:02.000Z'
              }
            ]
          }
        }
      })
    );

    expect(snapshot.attempts['att-legs'].legs).toEqual([
      {
        role: 'implementation',
        runtime: 'codex',
        model: 'gpt-5.6-sol',
        state: 'done',
        ordinal: 1,
        label: '구현 unit 1 · codex'
      }
    ]);
  });

  test('labels a claude subagent leg with its agent type (UI-2mpn §6.2)', () => {
    const launch = 'toolu_01AgentAAAAAAAAAAAAAAAA';
    const snapshot = /** @type {any} */ (
      decorateQueue(WS_STEP, {
        revision: 1,
        queue: [],
        pr_wait: [],
        done: [],
        attempts: {
          'att-sub': {
            attempt_id: 'att-sub',
            bead_id: 'UI-1',
            status: 'running',
            started_at: 1,
            delegation_sessions: [
              {
                launch_id: launch,
                provider: 'claude',
                role: 'subagent',
                agent_type: 'general-purpose',
                model: 'claude-sonnet-4-5-20250929',
                effort: null,
                session_id: launch,
                turn_id: launch,
                status: 'running',
                started_at: 1000,
                completed_at: null,
                last_event_at: 2000
              }
            ]
          }
        }
      })
    );

    expect(snapshot.attempts['att-sub'].legs).toEqual([
      {
        role: 'subagent',
        runtime: 'claude',
        model: 'claude-sonnet-4-5-20250929',
        agent_type: 'general-purpose',
        state: 'live',
        ordinal: 1,
        label: 'general-purpose · claude'
      }
    ]);
  });

  test('falls back to a subagent label when the call named no type', () => {
    const launch = 'toolu_01AgentBBBBBBBBBBBBBBBB';
    const snapshot = /** @type {any} */ (
      decorateQueue(WS_STEP, {
        revision: 1,
        queue: [],
        pr_wait: [],
        done: [],
        attempts: {
          'att-anon': {
            attempt_id: 'att-anon',
            bead_id: 'UI-1',
            status: 'running',
            started_at: 1,
            delegation_sessions: [
              {
                launch_id: launch,
                provider: 'claude',
                role: 'subagent',
                agent_type: null,
                model: null,
                effort: null,
                session_id: launch,
                turn_id: launch,
                status: 'running',
                started_at: null,
                completed_at: null,
                last_event_at: null
              }
            ]
          }
        }
      })
    );

    expect(snapshot.attempts['att-anon'].legs[0]).toMatchObject({
      label: 'subagent · claude',
      state: 'live'
    });
    expect(snapshot.attempts['att-anon'].legs[0]).not.toHaveProperty(
      'agent_type'
    );
  });
});

describe('worker-queue session_active projection (UI-0a2m)', () => {
  afterEach(() => {
    snapshot_seam.response = { ok: false };
    getWorkerRuntime().runnableCache.clear();
  });

  /**
   * @param {string} name
   * @returns {{ root_dir: string, db_path: string }}
   */
  function wsFor(name) {
    return {
      root_dir: `/tmp/wq-sess-${name}`,
      db_path: `/tmp/wq-sess-${name}/.beads/db`
    };
  }

  /**
   * @param {Array<Record<string, unknown>>} rows
   */
  function seedScan(rows) {
    snapshot_seam.response = {
      ok: true,
      stale: false,
      snapshot: { all: rows }
    };
  }

  const SESSION_ROW = {
    id: 'UI-sess',
    title: '세션 작업',
    status: 'in_progress',
    labels: [],
    metadata: { route: 'quick_fix' },
    updated_at: '2026-08-24T00:00:00Z'
  };

  test('subscribe triggers the session scan and re-pushes the filled snapshot', async () => {
    const ws = wsFor('push');
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...ws });
    seedScan([SESSION_ROW]);

    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });

    expect(queueSnapshots(sock)[0].session_active).toEqual([]);
    await vi.waitFor(() => {
      expect(queueSnapshots(sock).length).toBeGreaterThan(1);
    });
    const last = queueSnapshots(sock).at(-1);
    expect(last.session_active).toHaveLength(1);
    expect(last.session_active[0]).toMatchObject({
      bead_id: 'UI-sess',
      status: 'in_progress',
      title: '세션 작업',
      route: 'quick_fix'
    });
  });

  test('decorateQueue excludes lane members and active attempts from session_active', async () => {
    const ws = wsFor('excl');
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...ws });
    seedScan([
      SESSION_ROW,
      { ...SESSION_ROW, id: 'UI-sess2', title: '세션 작업 2' }
    ]);
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await vi.waitFor(() => {
      expect(
        getWorkerRuntime().runnableCache.sessionActivePeek(ws.root_dir)
      ).toHaveLength(2);
    });

    const snapshot = /** @type {any} */ (
      decorateQueue(ws.root_dir, {
        revision: 1,
        slots: 2,
        queue: [{ bead_id: 'UI-sess', added_at: 0 }],
        pr_wait: [],
        done: [],
        attempts: {
          a1: { attempt_id: 'a1', bead_id: 'UI-sess2', status: 'running' }
        },
        cleanup_failed: {}
      })
    );

    expect(snapshot.session_active).toEqual([]);
  });

  test('done-lane membership keeps a session row visible', async () => {
    const ws = wsFor('done');
    const sock = fakeSocket();
    setConnWorkspace(/** @type {any} */ (sock), { ...ws });
    seedScan([SESSION_ROW]);
    await send(sock, 's1', 'subscribe-worker-queue', { id: 'wq' });
    await vi.waitFor(() => {
      expect(
        getWorkerRuntime().runnableCache.sessionActivePeek(ws.root_dir)
      ).toHaveLength(1);
    });

    const snapshot = /** @type {any} */ (
      decorateQueue(ws.root_dir, {
        revision: 1,
        slots: 2,
        queue: [],
        pr_wait: [],
        done: [{ bead_id: 'UI-sess', added_at: 3 }],
        attempts: {},
        cleanup_failed: {}
      })
    );

    expect(snapshot.session_active).toHaveLength(1);
    expect(snapshot.session_active[0].bead_id).toBe('UI-sess');
  });

  test('cold cache decorates an empty session_active without a scan', () => {
    const snapshot = /** @type {any} */ (
      decorateQueue('/tmp/wq-sess-cold', {
        revision: 1,
        slots: 2,
        queue: [],
        pr_wait: [],
        done: [],
        attempts: {},
        cleanup_failed: {}
      })
    );

    expect(snapshot.session_active).toEqual([]);
  });
});
