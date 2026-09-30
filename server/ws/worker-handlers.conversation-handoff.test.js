/**
 * `worker-conversation-handoff` (UI-nuwy §3.6): the `[워커로 이어가기]` click.
 *
 * The scheduler judgment is mocked — `server/worker/scheduler.test.js` owns
 * the reservation and the resume. This file owns the ws contract: the payload
 * guard, the revision CAS ahead of every side effect, and the reply that
 * carries the scheduler's refusal reason rather than folding it away.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { beforeEach, describe, expect, test, vi } from 'vitest';

const WS = '/tmp/example/conversation-handoff-ws';
const BEAD = 'UI-nuwy';

const handoff = vi.hoisted(() => ({
  /** @type {import('vitest').Mock} */
  fn: /** @type {any} */ (null)
}));

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS }]
  };
});

vi.mock('../worker/attach.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    conversationHandoffWorker: (/** @type {any[]} */ ...args) =>
      handoff.fn(...args)
  };
});

const { setConnWorkspace } = await import('./context.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const handlers = await import('./worker-handlers.js');

/**
 * @returns {any}
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
 * @param {Record<string, unknown>} payload
 */
async function click(payload) {
  const sock = fakeSocket();
  setConnWorkspace(sock, { root_dir: WS, db_path: '' });
  await handlers.handleWorkerConversationHandoff(sock, {
    id: 'r1',
    type: 'worker-conversation-handoff',
    payload
  });
  return JSON.parse(/** @type {string[]} */ (sock.sent).at(-1) || 'null');
}

/** @returns {number} */
function revision() {
  return getWorkerRuntime().queueStore.snapshot(WS).revision;
}

beforeEach(() => {
  process.env.XDG_STATE_HOME = fs.mkdtempSync(
    path.join(os.tmpdir(), 'bdui-conversation-handoff-')
  );
  handlers.__resetWorkerQueueForTest();
  handoff.fn = vi.fn(async () => ({ ok: true, reason: null, pending: true }));
});

describe('worker-conversation-handoff', () => {
  test('rejects a payload without an attempt id', async () => {
    const reply = await click({ bead_id: BEAD, expected_revision: 0 });

    expect(reply.ok).toBe(false);
    expect(reply.error.code).toBe('bad_request');
    expect(handoff.fn).not.toHaveBeenCalled();
  });

  test('answers a stale revision as a conflict without touching the scheduler', async () => {
    const reply = await click({
      bead_id: BEAD,
      attempt_id: 'a1',
      expected_revision: revision() + 7
    });

    expect(reply.payload).toMatchObject({ resumed: false, conflict: true });
    expect(handoff.fn).not.toHaveBeenCalled();
  });

  test('passes the bead and attempt to the scheduler and reports a reservation', async () => {
    const reply = await click({
      bead_id: BEAD,
      attempt_id: 'a1',
      expected_revision: revision()
    });

    expect(handoff.fn).toHaveBeenCalledWith(WS, {
      bead_id: BEAD,
      attempt_id: 'a1'
    });
    expect(reply.payload).toMatchObject({
      bead_id: BEAD,
      attempt_id: 'a1',
      resumed: true,
      pending: true,
      conflict: false,
      reason: null
    });
  });

  test('carries the scheduler refusal reason in the reply', async () => {
    handoff.fn = vi.fn(async () => ({
      ok: false,
      reason: 'not_awaiting_answer'
    }));

    const reply = await click({
      bead_id: BEAD,
      attempt_id: 'a1',
      expected_revision: revision()
    });

    expect(reply.payload).toMatchObject({
      resumed: false,
      reason: 'not_awaiting_answer'
    });
  });
});
