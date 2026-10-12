/**
 * The session-inquiry branch of `worker-resolve-in-session` and its public
 * projection (UI-gske §3.3, §3.4). The attachment's session-inquiry runtime is
 * faked — `server/worker/session-inquiry/service.test.js` owns the liveness
 * judgment and the `--resume` launch. This file owns the ws contract: the
 * revision CAS, the live-window focus ahead of every launch, the refusal of a
 * closed row, and what the snapshot carries.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const WS = '/tmp/example/session-inquiry-ws';
const SID = '11111111-1111-4111-8111-111111111111';

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS }]
  };
});

const { setConnWorkspace } = await import('./context.js');
const { EXTERNAL_RESUME_PANE_MARKER } =
  await import('../worker/tmux-launcher.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const { __registerWorkerAttachmentForTest, __resetWorkerAttachmentsForTest } =
  await import('../worker/attach.js');
const handlers = await import('./worker-handlers.js');

/** @type {string} */
let tmp_state;
/** @type {any} */
let original_launcher;
/** @type {any[]} */
let focuses;
/** @type {any} */
let focus_outcome;
/** @type {ReturnType<typeof vi.fn>} */
let click_fn;

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
  await handlers.handleWorkerResolveInSession(sock, {
    id: 'r1',
    type: 'worker-resolve-in-session',
    payload
  });
  return JSON.parse(/** @type {string[]} */ (sock.sent).at(-1) || 'null');
}

/** @returns {number} */
function revision() {
  return getWorkerRuntime().queueStore.snapshot(WS).revision;
}

/**
 * @returns {string}
 */
function registerRow() {
  const result = getWorkerRuntime().queueStore.upsertSessionInquiry(
    WS,
    {
      repo: WS,
      ref: 'refs/set-aside/main/sync-1',
      session_id: SID,
      runner: 'claude',
      cwd: WS,
      summary: '질문',
      bundles: [],
      related_beads: []
    },
    { at: 1, makeId: () => 'si-0123456789ab', notify: false }
  );
  return /** @type {any} */ (result.row).id;
}

/**
 * @param {string} id
 */
function recordLiveConversation(id) {
  getWorkerRuntime().queueStore.recordInteractiveSession(WS, {
    bead_id: `session-inquiry:${id}`,
    kind: 'external_resume',
    provider: 'claude',
    session_id: SID,
    pane_id: '%5',
    tmux_session: 'bdui-inquiry',
    tmux_window: 'inquiry-01234567',
    launched_at: 10,
    state: 'live',
    settled_at: null
  });
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-si-ws-'));
  process.env.XDG_STATE_HOME = tmp_state;
  handlers.__resetWorkerQueueForTest();
  const runtime = getWorkerRuntime();
  original_launcher = runtime.interactiveLauncher;
  focuses = [];
  focus_outcome = null;
  runtime.interactiveLauncher = /** @type {any} */ ({
    ...original_launcher,
    readBridgeThreads: () =>
      new Map([[SID, { url: 'https://discord.com/channels/1/2' }]]),
    /** @param {any} input */
    focusRunning: async (input) => {
      focuses.push(input);
      return { ok: true, outcome: focus_outcome };
    }
  });
  click_fn = vi.fn(async () => ({
    launched: false,
    session: 'not_launched',
    reason: 'owner_alive',
    message: '등록 세션이 살아 있습니다 — 그 세션(Discord 스레드)에서 답하세요',
    mode: 'resume',
    session_id: SID,
    runner: 'claude',
    command: `claude --resume ${SID}`,
    placement: null,
    tmux_session: null,
    tmux_window: null,
    bridge_active: false
  }));
  __registerWorkerAttachmentForTest(
    WS,
    /** @type {any} */ ({ sessionInquiry: { click: click_fn } })
  );
});

afterEach(() => {
  getWorkerRuntime().interactiveLauncher = original_launcher;
  __resetWorkerAttachmentsForTest();
  handlers.__resetWorkerQueueForTest();
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('worker-resolve-in-session session-inquiry row (UI-gske §3.3)', () => {
  test('focuses the row conversation window without asking the attachment', async () => {
    const id = registerRow();
    recordLiveConversation(id);
    focus_outcome = {
      session: 'already_running',
      placement: 'user',
      tmux_session: 'bdui-inquiry',
      tmux_window: 'inquiry-01234567'
    };

    const reply = await click({
      inquiry_id: id,
      expected_revision: revision()
    });

    expect(focuses).toEqual([
      expect.objectContaining({
        marker: EXTERNAL_RESUME_PANE_MARKER,
        key: `session-inquiry:${id}`
      })
    ]);
    expect(click_fn).not.toHaveBeenCalled();
    expect(reply.payload).toMatchObject({
      inquiry_id: id,
      session: 'already_running',
      row: 'conversation'
    });
  });

  test('hands a row without a live window to the attachment and relays its sentence', async () => {
    const id = registerRow();

    const reply = await click({
      inquiry_id: id,
      expected_revision: revision()
    });

    expect(click_fn).toHaveBeenCalledWith(id);
    expect(reply.payload).toMatchObject({
      inquiry_id: id,
      row: 'session_inquiry',
      launched: false,
      reason: 'owner_alive',
      message:
        '등록 세션이 살아 있습니다 — 그 세션(Discord 스레드)에서 답하세요'
    });
  });

  test('launches nothing on a stale revision click', async () => {
    const id = registerRow();

    const reply = await click({
      inquiry_id: id,
      expected_revision: revision() - 1
    });

    expect(reply.payload.conflict).toBe(true);
    expect(click_fn).not.toHaveBeenCalled();
  });

  test('refuses a closed row', async () => {
    const id = registerRow();
    getWorkerRuntime().queueStore.transitionSessionInquiry(WS, id, {
      state: 'closed',
      at: 2
    });

    const reply = await click({
      inquiry_id: id,
      expected_revision: revision()
    });

    expect(reply.payload).toMatchObject({
      session: 'not_launched',
      reason: 'inquiry_closed'
    });
    expect(click_fn).not.toHaveBeenCalled();
  });
});

describe('session-inquiry public projection (UI-gske §3.3)', () => {
  test('carries the row with its Discord thread and conversation views', () => {
    const id = registerRow();
    recordLiveConversation(id);

    const queue = /** @type {any} */ (
      handlers.decorateQueue(WS, getWorkerRuntime().queueStore.snapshot(WS))
    );

    expect(queue.session_inquiries[id]).toMatchObject({
      id,
      state: 'waiting',
      discord_url: 'https://discord.com/channels/1/2',
      interactive_sessions: [
        expect.objectContaining({
          key: `session-inquiry:${id}:external_resume`,
          state: 'live'
        })
      ]
    });
    expect(queue.session_inquiries[id]).not.toHaveProperty(
      'auto_resume_consumed'
    );
  });

  test('carries no row for an unattached workspace', () => {
    registerRow();
    __resetWorkerAttachmentsForTest();

    const queue = /** @type {any} */ (
      handlers.decorateQueue(WS, getWorkerRuntime().queueStore.snapshot(WS))
    );

    expect(queue.session_inquiries).toEqual({});
  });
});
