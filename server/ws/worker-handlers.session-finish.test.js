import { createHash } from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const hoisted = vi.hoisted(() => ({ root: '' }));

vi.mock('../registry-watcher.js', async (importOriginal) => ({
  .../** @type {any} */ (await importOriginal()),
  getAvailableWorkspaces: () => [{ path: hoisted.root }]
}));
vi.mock('../bd.js', async (importOriginal) => ({
  .../** @type {any} */ (await importOriginal()),
  runBdJsonProjected: vi.fn(),
  runShell: vi.fn()
}));

const { runBdJsonProjected, runShell } = await import('../bd.js');
const { getWorkerRuntime } = await import('../worker/runtime.js');
const { setConnWorkspace } = await import('./context.js');
const { __resetWorkerQueueForTest, handleWorkerSessionFinish } =
  await import('./worker-handlers.js');
const {
  SESSION_FINISH_BLOCK,
  createSessionFinish,
  fillSessionFinishBlock,
  mapHubSend
} = await import('./worker-handlers.session-finish.js');

const ROOT = '/repo/main';
const BEAD = 'UI-fin1';
const SID = '0b8e2f7a-1111-4222-8333-444455556666';

// Shapes copied from dotfiles session_hub claude.py / cli.py (send, started_reply, state).
const HUB_TYPED = {
  ok: true,
  delivered: true,
  screen_verified: true,
  transcript_confirmed: true,
  queued: false
};
const HUB_QUEUED = { ...HUB_TYPED, queued: true };
const HUB_RESUMED = {
  ok: true,
  session_id: SID,
  state: 'idle',
  control: 'steerable',
  cwd: `${ROOT}/.worktrees/${BEAD}`,
  pane: '%3',
  tmux_session: 'personal',
  listed: true,
  resumed: true,
  transcript_confirmed: true
};
const HUB_STATE = {
  ok: true,
  session_id: SID,
  state: 'idle',
  dialog: null,
  control: 'steerable',
  cwd: `${ROOT}/.worktrees/${BEAD}`,
  agent: 'claude'
};

/**
 * @param {unknown} body
 * @param {number} [code]
 */
function hubResult(body, code = 0) {
  return {
    code,
    stdout: typeof body === 'string' ? body : JSON.stringify(body),
    stderr: ''
  };
}

/**
 * @param {Record<string, any>} [options]
 */
function setup(options = {}) {
  /** @type {Record<string, any>} */
  const bead = {
    status: 'in_progress',
    metadata: { session_ref: `claude:${SID}@host` },
    ...(options.bead || {})
  };
  /** @type {Record<string, any>} */
  const queue = {
    queue: [],
    attempts: {},
    interactive_sessions: {},
    ...(options.queue || {})
  };
  const send_reply = options.send ?? hubResult(HUB_TYPED);
  const state_reply = options.state ?? hubResult(HUB_STATE);
  const runHub = vi.fn(
    /** @type {(args: string[], opts: any) => Promise<any>} */ (
      async (args) => (args[0] === 'state' ? state_reply : send_reply)
    )
  );
  const finish = createSessionFinish({
    readBead: async () => (options.unreadable ? null : bead),
    snapshot: () => queue,
    ownership: () => {
      if (options.queue_unreadable) {
        throw new Error('queue_unreadable');
      }
      return {
        attempts: [
          ...Object.values(queue.attempts || {}),
          ...(options.transferred || [])
        ],
        interactive_sessions: queue.interactive_sessions || {}
      };
    },
    runHub,
    realpath: (target) => target,
    locate: () => ({
      locality: options.locality ?? 'local',
      file: '/x.jsonl',
      last_event_at: 1
    })
  });
  const sends = () => runHub.mock.calls.filter(([args]) => args[0] === 'send');
  return { finish, runHub, sends, bead, queue };
}

describe('session finish rejections', () => {
  test('rejects a Bead that is not in_progress without calling the hub', async () => {
    const { finish, sends } = setup({ bead: { status: 'open' } });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply).toEqual({
      bead_id: BEAD,
      sent: false,
      delivery: null,
      reason: 'not_session_tile'
    });
    expect(sends()).toHaveLength(0);
  });

  test('rejects a Bead holding the external_wait key without calling the hub', async () => {
    const { finish, sends } = setup({
      bead: {
        metadata: { session_ref: `claude:${SID}@host`, external_wait: 'w1' }
      }
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('not_session_tile');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a Bead holding an empty external_wait key without calling the hub', async () => {
    const { finish, sends } = setup({
      bead: {
        metadata: { session_ref: `claude:${SID}@host`, external_wait: '' }
      }
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('not_session_tile');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a Bead a Worker lane claimed after the tile rendered', async () => {
    const { finish, sends } = setup({ queue: { queue: [{ bead_id: BEAD }] } });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('not_session_tile');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a session id that belongs to a Worker attempt', async () => {
    const { finish, sends } = setup({
      queue: { attempts: { a1: { bead_id: 'UI-other', session_id: SID } } }
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('session_mismatch');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a session id of a transferred Worker attempt the display queue trimmed', async () => {
    const { finish, sends } = setup({
      transferred: [{ bead_id: BEAD, attempt_id: 'old', session_id: SID }]
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('session_mismatch');
    expect(sends()).toHaveLength(0);
  });

  test('rejects when the queue file cannot be read', async () => {
    const { finish, sends } = setup({ queue_unreadable: true });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('session_mismatch');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a session id that belongs to a conversation record', async () => {
    const { finish, sends } = setup({
      queue: {
        interactive_sessions: {
          [`${BEAD}:inquiry`]: { kind: 'inquiry', session_id: SID }
        }
      }
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('session_mismatch');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a session whose cwd lies outside the workspace root', async () => {
    const { finish, sends } = setup({
      state: hubResult({ ...HUB_STATE, cwd: '/repo/main-other' })
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('session_mismatch');
    expect(sends()).toHaveLength(0);
  });

  test('rejects when the hub state cannot be read as JSON', async () => {
    const { finish, sends } = setup({ state: hubResult('not json') });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('session_mismatch');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a non-Claude current session', async () => {
    const { finish, sends } = setup({
      bead: { metadata: { session_ref: `codex:${SID}@host` } }
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('provider_unsupported');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a session without a local transcript', async () => {
    const { finish, sends } = setup({ locality: 'remote' });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('not_local');
    expect(sends()).toHaveLength(0);
  });

  test('rejects a Bead without a session_ref', async () => {
    const { finish, sends } = setup({ bead: { metadata: {} } });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('no_session_ref');
    expect(sends()).toHaveLength(0);
  });

  test('rejects an unsafe session id', async () => {
    const { finish, sends } = setup({
      bead: { metadata: { session_ref: 'claude:../evil@host' } }
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.reason).toBe('unsafe_session_id');
    expect(sends()).toHaveLength(0);
  });

  test('picks the last valid session_ref item', async () => {
    const { finish, runHub } = setup({
      bead: {
        metadata: {
          session_ref: `claude:old-session@host; claude:${SID}@host`
        }
      }
    });

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.sent).toBe(true);
    expect(runHub.mock.calls.at(-1)?.[0]).toEqual(['send', SID]);
  });
});

describe('session finish hub call', () => {
  test('sends once with the session id and the filled block on stdin', async () => {
    const { finish, runHub, sends } = setup();

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply).toEqual({
      bead_id: BEAD,
      sent: true,
      delivery: 'typed',
      reason: null
    });
    expect(sends()).toHaveLength(1);
    expect(sends()[0][0]).toEqual(['send', SID]);
    expect(sends()[0][1].input).toBe(fillSessionFinishBlock(BEAD));
    expect(sends()[0][1].input).toContain(`- 대상 Bead: ${BEAD}`);
    expect(sends()[0][1].input).not.toContain('<Bead ID>');
    expect(runHub.mock.calls[0][0]).toEqual(['state', SID]);
  });

  test('answers in_flight to a second request while the first send runs', async () => {
    /** @type {(value: any) => void} */
    let release = () => {};
    const pending = new Promise((resolve) => {
      release = resolve;
    });
    const runHub = vi.fn(
      /** @type {(args: string[]) => Promise<any>} */ (
        async (args) => (args[0] === 'state' ? hubResult(HUB_STATE) : pending)
      )
    );
    const finish = createSessionFinish({
      readBead: async () => ({
        status: 'in_progress',
        metadata: { session_ref: `claude:${SID}@host` }
      }),
      snapshot: () => ({}),
      ownership: () => ({ attempts: [], interactive_sessions: {} }),
      runHub,
      realpath: (target) => target,
      locate: () => ({ locality: 'local', file: '/x', last_event_at: 1 })
    });

    const first = finish({ root_dir: ROOT, bead_id: BEAD });
    await vi.waitFor(() =>
      expect(runHub.mock.calls.some(([a]) => a[0] === 'send')).toBe(true)
    );
    const second = await finish({ root_dir: ROOT, bead_id: BEAD });
    release(hubResult(HUB_TYPED));
    const first_reply = await first;

    expect(second.reason).toBe('in_flight');
    expect(first_reply.sent).toBe(true);
    expect(runHub.mock.calls.filter(([a]) => a[0] === 'send')).toHaveLength(1);
  });

  test('answers in_flight to a request arriving while the first reads the session state', async () => {
    /** @type {(value: any) => void} */
    let release_state = () => {};
    const state_pending = new Promise((resolve) => {
      release_state = resolve;
    });
    const runHub = vi.fn(
      /** @type {(args: string[]) => Promise<any>} */ (
        async (args) =>
          args[0] === 'state' ? state_pending : hubResult(HUB_TYPED)
      )
    );
    const finish = createSessionFinish({
      readBead: async () => ({
        status: 'in_progress',
        metadata: { session_ref: `claude:${SID}@host` }
      }),
      snapshot: () => ({}),
      ownership: () => ({ attempts: [], interactive_sessions: {} }),
      runHub,
      realpath: (target) => target,
      locate: () => ({ locality: 'local', file: '/x', last_event_at: 1 })
    });

    const first = finish({ root_dir: ROOT, bead_id: BEAD });
    await vi.waitFor(() => expect(runHub).toHaveBeenCalledTimes(1));
    const second = await finish({ root_dir: ROOT, bead_id: BEAD });
    release_state(hubResult(HUB_STATE));
    const first_reply = await first;

    expect(second.reason).toBe('in_flight');
    expect(first_reply.sent).toBe(true);
    expect(runHub.mock.calls.filter(([a]) => a[0] === 'send')).toHaveLength(1);
  });

  test('releases the in-flight mark after a send finishes', async () => {
    const { finish, sends } = setup();

    await finish({ root_dir: ROOT, bead_id: BEAD });
    const again = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(again.sent).toBe(true);
    expect(sends()).toHaveLength(2);
  });

  test('writes nothing to the Bead or the queue after a successful send', async () => {
    const { finish, bead, queue } = setup();
    const bead_before = structuredClone(bead);
    const queue_before = structuredClone(queue);

    const reply = await finish({ root_dir: ROOT, bead_id: BEAD });

    expect(reply.sent).toBe(true);
    expect(bead).toEqual(bead_before);
    expect(queue).toEqual(queue_before);
  });
});

describe('session finish reply mapping', () => {
  test('maps a typed send', () => {
    expect(mapHubSend(BEAD, hubResult(HUB_TYPED))).toEqual({
      bead_id: BEAD,
      sent: true,
      delivery: 'typed',
      reason: null
    });
  });

  test('maps a queued send', () => {
    expect(mapHubSend(BEAD, hubResult(HUB_QUEUED)).delivery).toBe('queued');
  });

  test('maps a confirmed resume', () => {
    expect(mapHubSend(BEAD, hubResult(HUB_RESUMED))).toEqual({
      bead_id: BEAD,
      sent: true,
      delivery: 'resumed',
      reason: null
    });
  });

  test('maps a resume stopped at the trust prompt to sent false', () => {
    const reply = mapHubSend(
      BEAD,
      hubResult({
        ...HUB_RESUMED,
        transcript_confirmed: false,
        trust_prompt: true
      })
    );

    expect(reply).toEqual({
      bead_id: BEAD,
      sent: false,
      delivery: null,
      reason: 'trust_prompt'
    });
  });

  test('maps an unconfirmed resume to resume_unconfirmed', () => {
    const reply = mapHubSend(
      BEAD,
      hubResult({ ...HUB_RESUMED, transcript_confirmed: false })
    );

    expect(reply.sent).toBe(false);
    expect(reply.reason).toBe('resume_unconfirmed');
  });

  test('maps a refusal JSON with a nonzero exit to its code', () => {
    const reply = mapHubSend(
      BEAD,
      hubResult(
        {
          ok: false,
          code: 'modal_blocked',
          reason: 'a dialog is open',
          next: 'answer it'
        },
        2
      )
    );

    expect(reply).toEqual({
      bead_id: BEAD,
      sent: false,
      delivery: null,
      reason: 'modal_blocked'
    });
  });

  test('maps non-JSON output to hub_invalid_response', () => {
    expect(mapHubSend(BEAD, hubResult('Traceback ...', 1)).reason).toBe(
      'hub_invalid_response'
    );
  });

  test('maps a spawn failure to hub_unavailable', () => {
    expect(mapHubSend(BEAD, { code: 127, stdout: '' }).reason).toBe(
      'hub_unavailable'
    );
  });
});

describe('session finish block', () => {
  test('pins the dotfiles block digest', () => {
    const digest = createHash('sha256')
      .update(SESSION_FINISH_BLOCK)
      .digest('hex');

    expect(digest).toBe(
      '010bb2ace90414e99a93d0d0961c056fb3b137d2d2ae00adf5bd823a7d4ef067'
    );
  });

  test('carries no trailing newline', () => {
    const bytes = Buffer.byteLength(SESSION_FINISH_BLOCK, 'utf8');

    expect(bytes).toBe(1251);
    expect(SESSION_FINISH_BLOCK.endsWith('\n')).toBe(false);
  });

  test('fills only the Bead ID slot', () => {
    const filled = fillSessionFinishBlock('UI-x1');

    expect(filled).toBe(SESSION_FINISH_BLOCK.replace('<Bead ID>', 'UI-x1'));
    expect(filled).toContain('- 대상 Bead: UI-x1');
  });
});

describe('worker-session-finish handler wiring', () => {
  /** @type {string} */
  let tmp;

  beforeEach(() => {
    tmp = fs.realpathSync(
      fs.mkdtempSync(path.join(os.tmpdir(), 'session-finish-ws-'))
    );
    hoisted.root = path.join(tmp, 'repo');
    fs.mkdirSync(path.join(hoisted.root, '.worktrees', BEAD), {
      recursive: true
    });
    fs.mkdirSync(path.join(tmp, '.claude', 'projects', 'p'), {
      recursive: true
    });
    fs.writeFileSync(
      path.join(tmp, '.claude', 'projects', 'p', `${SID}.jsonl`),
      ''
    );
    vi.stubEnv('HOME', tmp);
    vi.stubEnv('XDG_STATE_HOME', tmp);
    vi.stubEnv('BDUI_CONFIG_PATH', path.join(tmp, 'absent.toml'));
    __resetWorkerQueueForTest();
    vi.mocked(runBdJsonProjected).mockReset();
    vi.mocked(runBdJsonProjected).mockImplementation(
      /** @type {any} */ (
        async () => ({
          ok: true,
          data: {
            id: BEAD,
            status: 'in_progress',
            metadata: { session_ref: `claude:${SID}@host` }
          }
        })
      )
    );
    vi.mocked(runShell)
      .mockReset()
      .mockImplementation(
        /** @type {any} */ (
          async (/** @type {string} */ _bin, /** @type {string[]} */ args) =>
            args[0] === 'state'
              ? hubResult({
                  ...HUB_STATE,
                  cwd: path.join(hoisted.root, '.worktrees', BEAD)
                })
              : hubResult(HUB_TYPED)
        )
      );
  });

  afterEach(() => {
    __resetWorkerQueueForTest();
    vi.unstubAllEnvs();
    fs.rmSync(tmp, { recursive: true, force: true });
  });

  async function click() {
    /** @type {any} */
    const socket = { send: vi.fn(), readyState: 1, OPEN: 1 };
    setConnWorkspace(socket, { root_dir: hoisted.root, db_path: '' });
    await handleWorkerSessionFinish(socket, {
      id: 'fin',
      type: 'worker-session-finish',
      payload: { bead_id: BEAD, root_dir: hoisted.root }
    });
    return JSON.parse(socket.send.mock.calls.at(-1)[0]).payload;
  }

  test('sends through the home session-hub binary and leaves the queue untouched', async () => {
    const store = getWorkerRuntime().queueStore;
    const before = store.snapshot(hoisted.root);

    const result = await click();

    expect(result).toEqual({
      bead_id: BEAD,
      sent: true,
      delivery: 'typed',
      reason: null
    });
    const sends = vi
      .mocked(runShell)
      .mock.calls.filter(([, args]) => args[0] === 'send');
    expect(sends).toHaveLength(1);
    expect(sends[0][0]).toBe(path.join(tmp, 'bin', 'session-hub'));
    expect(sends[0][1]).toEqual(['send', SID]);
    expect(sends[0][2]?.input).toBe(fillSessionFinishBlock(BEAD));
    expect(store.snapshot(hoisted.root)).toEqual(before);
    expect(
      vi
        .mocked(runBdJsonProjected)
        .mock.calls.every(([, args]) => args[0] === 'show')
    ).toBe(true);
  });

  test('refuses a Bead a Worker lane holds without calling the hub', async () => {
    const store = getWorkerRuntime().queueStore;
    store.place(hoisted.root, {
      bead_id: BEAD,
      expected_revision: store.snapshot(hoisted.root).revision
    });

    const result = await click();

    expect(result).toMatchObject({ sent: false, reason: 'not_session_tile' });
    expect(vi.mocked(runShell)).not.toHaveBeenCalled();
  });
});
