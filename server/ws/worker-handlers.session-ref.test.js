import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  test,
  vi
} from 'vitest';

const WS = '/tmp/example-workspace/project-a';
const HOST = os.hostname();
const SESSION_ID = 'ff11a2b3-4c5d-6e7f-8091-a2b3c4d5e6f7';
const ATTEMPT_SLOT = `session:claude:${SESSION_ID}`;
const MTIME_SEC = 1700000000;

const original_home = process.env.HOME;
const home_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'session-ref-home-'));
process.env.HOME = home_dir;

const bd = vi.hoisted(() => ({
  runBdJsonProjectedInWorkspace: vi.fn()
}));

const tail = vi.hoisted(() => ({
  /** @type {any[]} */
  inputs: [],
  /** @type {any[]} */
  readers: []
}));

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS }]
  };
});

vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    queueStore: { snapshot: () => ({ attempts: {} }) },
    usageStore: { get: () => null },
    sessionLog: {
      read: () => [],
      readDelegation: () => ({ lines: [], last_event_at: null, offset: 0 }),
      lastEventAt: () => null,
      lastEventAtOf: () => null,
      subscribe: () => () => {}
    }
  })
}));

vi.mock('../worker/runner/tail-reader.js', () => ({
  TAIL_POLL_MS: 500,
  /** @param {any} input */
  createTailReader: vi.fn((input) => {
    const reader = {
      start: vi.fn(),
      stop: vi.fn(),
      pump: vi.fn(),
      drain: vi.fn(),
      offset: () => 0
    };
    tail.inputs.push(input);
    tail.readers.push(reader);
    return reader;
  })
}));

vi.mock('./context.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    runBdJsonProjectedInWorkspace: bd.runBdJsonProjectedInWorkspace
  };
});

const { setConnWorkspace } = await import('./context.js');
const {
  detachSessionLog,
  handleGetSessionRefs,
  handleSubscribeSessionLog,
  handleUnsubscribeSessionLog
} = await import('./worker-handlers.js');

/**
 * @returns {any}
 */
function fakeSocket() {
  const socket = {
    sent: /** @type {string[]} */ ([]),
    readyState: 1,
    OPEN: 1,
    /** @param {string} message */
    send(message) {
      this.sent.push(String(message));
    }
  };
  setConnWorkspace(/** @type {any} */ (socket), { root_dir: WS, db_path: '' });
  return socket;
}

/**
 * @param {any} socket
 * @returns {any[]}
 */
function messages(socket) {
  return socket.sent.map((/** @type {string} */ raw) => JSON.parse(raw));
}

/**
 * @param {any} socket
 * @param {string} type
 * @returns {any}
 */
function pushOf(socket, type) {
  return messages(socket).find((message) => message.type === type);
}

/**
 * Answer `bd show` with one bead's metadata bag.
 *
 * @param {Record<string, unknown>|null} metadata
 */
function bdShows(metadata) {
  bd.runBdJsonProjectedInWorkspace.mockResolvedValue({
    ok: true,
    protocol: { format: 'bare', schema_version: null },
    data: { id: 'UI-1', ...(metadata ? { metadata } : {}) }
  });
}

/**
 * Write a claude project JSONL the resolver can find, and return its path.
 *
 * @param {string} contents
 */
function writeClaudeSessionFile(contents) {
  const dir = path.join(home_dir, '.claude', 'projects', '-repo-worktree');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `${SESSION_ID}.jsonl`);
  fs.writeFileSync(file, contents);
  fs.utimesSync(file, MTIME_SEC, MTIME_SEC);
  return file;
}

/**
 * @param {Record<string, unknown>} payload
 * @returns {any}
 */
function subscribeRequest(payload) {
  return { id: 'req-1', type: 'subscribe-session-log', payload };
}

beforeEach(() => {
  bd.runBdJsonProjectedInWorkspace.mockReset();
  tail.inputs.length = 0;
  tail.readers.length = 0;
});

afterEach(() => {
  vi.restoreAllMocks();
  fs.rmSync(path.join(home_dir, '.claude'), { recursive: true, force: true });
});

afterAll(() => {
  fs.rmSync(home_dir, { recursive: true, force: true });
  if (original_home === undefined) {
    delete process.env.HOME;
  } else {
    process.env.HOME = original_home;
  }
});

describe('subscribe-session-log session_ref validation', () => {
  test('refuses an attempt_id that is not the session slot', async () => {
    const socket = fakeSocket();

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: 'att-1',
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );

    expect(messages(socket)[0].error.code).toBe('bad_request');
    expect(bd.runBdJsonProjectedInWorkspace).not.toHaveBeenCalled();
  });

  test('refuses a launch_id alongside a session_ref', async () => {
    const socket = fakeSocket();

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: ATTEMPT_SLOT,
        launch_id: 'launch-1',
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );

    expect(messages(socket)[0].error.code).toBe('bad_request');
  });

  test('refuses an unknown provider', async () => {
    const socket = fakeSocket();

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: `session:gemini:${SESSION_ID}`,
        session_ref: {
          bead_id: 'UI-1',
          provider: 'gemini',
          session_id: SESSION_ID
        }
      })
    );

    expect(messages(socket)[0].error.code).toBe('bad_request');
  });

  test('refuses a session id outside the narrow grammar', async () => {
    const socket = fakeSocket();

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: 'session:claude:../../etc/passwd',
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: '../../etc/passwd'
        }
      })
    );

    expect(messages(socket)[0].error.code).toBe('bad_request');
  });

  test('refuses an unregistered root_dir', async () => {
    const socket = fakeSocket();

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: ATTEMPT_SLOT,
        root_dir: '/tmp/not-registered',
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );

    expect(messages(socket)[0].error.code).toBe('bad_request');
  });
});

describe('subscribe-session-log session_ref authorization', () => {
  test('reads the bead through the projected bd JSON owner', async () => {
    const socket = fakeSocket();
    bdShows({ session_ref: `claude:${SESSION_ID}@${HOST}` });

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: ATTEMPT_SLOT,
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );

    expect(bd.runBdJsonProjectedInWorkspace).toHaveBeenCalledWith(
      socket,
      'show',
      ['show', 'UI-1', '--json'],
      { cwd: WS, expected_id: 'UI-1' }
    );
  });

  test('answers an empty snapshot and opens no file for an unrecorded session', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile('{"type":"assistant"}\n');
    bdShows({ session_ref: `claude:some-other-session@${HOST}` });
    const readFileSync = vi.spyOn(fs, 'readFileSync');
    const readdirSync = vi.spyOn(fs, 'readdirSync');

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: ATTEMPT_SLOT,
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );

    expect(pushOf(socket, 'session-log-snapshot').payload).toMatchObject({
      lines: [],
      last_event_at: null
    });
    expect(readFileSync).not.toHaveBeenCalled();
    expect(readdirSync).not.toHaveBeenCalled();
    expect(tail.readers).toHaveLength(0);
  });

  test('answers an empty snapshot when the bd read fails', async () => {
    const socket = fakeSocket();
    bd.runBdJsonProjectedInWorkspace.mockResolvedValue({
      ok: false,
      error: { code: 'bd_exit_error', message: 'no such issue' }
    });

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: ATTEMPT_SLOT,
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );

    expect(pushOf(socket, 'session-log-snapshot').payload.lines).toEqual([]);
    expect(tail.readers).toHaveLength(0);
  });

  test('answers an empty snapshot for a session on another host', async () => {
    const socket = fakeSocket();
    bdShows({ session_ref: `claude:${SESSION_ID}@far-away-box` });

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: ATTEMPT_SLOT,
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );

    expect(pushOf(socket, 'session-log-snapshot').payload.lines).toEqual([]);
    expect(tail.readers).toHaveLength(0);
  });

  // The recorded host label drifts with the kernel hostname (UI-82jx): a
  // transcript present in this home is served whatever label it carries.
  test('serves the transcript when the host label differs but the file is here', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile('{"type":"assistant"}\n');
    bdShows({ session_ref: `claude:${SESSION_ID}@far-away-box` });

    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: ATTEMPT_SLOT,
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );

    expect(pushOf(socket, 'session-log-snapshot').payload.lines).toEqual([
      { type: 'assistant' }
    ]);
  });
});

describe('subscribe-session-log session_ref snapshot and follow', () => {
  const complete_a = JSON.stringify({
    type: 'assistant',
    message: { content: [{ type: 'text', text: 'one' }] }
  });
  const complete_b = JSON.stringify({
    type: 'user',
    message: { content: 'two' }
  });
  const partial = JSON.stringify({
    type: 'assistant',
    message: { content: [{ type: 'text', text: 'three' }] }
  });

  /**
   * @param {any} socket
   */
  async function subscribe(socket) {
    bdShows({ session_ref: `claude:${SESSION_ID}@${HOST}` });
    await handleSubscribeSessionLog(
      socket,
      subscribeRequest({
        id: 'c1',
        attempt_id: ATTEMPT_SLOT,
        session_ref: {
          bead_id: 'UI-1',
          provider: 'claude',
          session_id: SESSION_ID
        }
      })
    );
  }

  test('snapshots the complete records with the file mtime', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile(`${complete_a}\n${complete_b}\n`);

    await subscribe(socket);

    const snapshot = pushOf(socket, 'session-log-snapshot').payload;
    expect(snapshot.lines).toEqual([
      JSON.parse(complete_a),
      JSON.parse(complete_b)
    ]);
    expect(snapshot.last_event_at).toBe(MTIME_SEC * 1000);
    expect(tail.readers[0].start).toHaveBeenCalledTimes(1);
  });

  test('excludes a trailing partial record and starts the tail at its offset', async () => {
    const socket = fakeSocket();
    const contents = `${complete_a}\n${partial}`;
    writeClaudeSessionFile(contents);

    await subscribe(socket);

    expect(pushOf(socket, 'session-log-snapshot').payload.lines).toEqual([
      JSON.parse(complete_a)
    ]);
    expect(tail.inputs[0].start_offset).toBe(
      Buffer.byteLength(`${complete_a}\n`)
    );
  });

  test('delivers the completed partial record exactly once as an append', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile(`${complete_a}\n${partial}`);
    await subscribe(socket);

    tail.inputs[0].onLine(partial);

    const appends = messages(socket).filter(
      (message) => message.type === 'session-log-append'
    );
    expect(appends).toHaveLength(1);
    expect(appends[0].payload).toMatchObject({
      id: 'c1',
      attempt_id: ATTEMPT_SLOT,
      event: JSON.parse(partial)
    });
  });

  test('drops a filtered append without emitting an event', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile(`${complete_a}\n`);
    await subscribe(socket);

    tail.inputs[0].onLine(JSON.stringify({ type: 'user', isMeta: true }));

    expect(pushOf(socket, 'session-log-append')).toBe(undefined);
  });

  test('stops the reader on unsubscribe', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile(`${complete_a}\n`);
    await subscribe(socket);

    handleUnsubscribeSessionLog(
      socket,
      /** @type {any} */ ({
        id: 'req-2',
        type: 'unsubscribe-session-log',
        payload: { id: 'c1' }
      })
    );

    expect(tail.readers[0].stop).toHaveBeenCalledTimes(1);
  });

  test('stops the reader when the connection detaches', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile(`${complete_a}\n`);
    await subscribe(socket);

    detachSessionLog(socket);

    expect(tail.readers[0].stop).toHaveBeenCalledTimes(1);
  });
});

describe('subscribe-session-log session_ref cancellation while resolving', () => {
  const record = JSON.stringify({
    type: 'assistant',
    message: { content: [{ type: 'text', text: 'one' }] }
  });

  /**
   * A `bd show` that stays pending until the returned release is called, so a
   * cancel can land inside the authorization await.
   *
   * @param {Record<string, unknown>} metadata
   * @returns {() => void}
   */
  function deferredBdShow(metadata) {
    /** @type {(value: unknown) => void} */
    let release = () => {};
    bd.runBdJsonProjectedInWorkspace.mockReturnValueOnce(
      new Promise((resolve) => {
        release = resolve;
      })
    );
    return () =>
      release({
        ok: true,
        protocol: { format: 'bare', schema_version: null },
        data: { id: 'UI-1', metadata }
      });
  }

  /**
   * @param {string} client_id
   */
  function openFor(client_id) {
    return subscribeRequest({
      id: client_id,
      attempt_id: ATTEMPT_SLOT,
      session_ref: {
        bead_id: 'UI-1',
        provider: 'claude',
        session_id: SESSION_ID
      }
    });
  }

  /**
   * @param {any} socket
   */
  function unsubscribe(socket) {
    handleUnsubscribeSessionLog(
      socket,
      /** @type {any} */ ({
        id: 'req-2',
        type: 'unsubscribe-session-log',
        payload: { id: 'c1' }
      })
    );
  }

  test('unsubscribing during the bd read leaves no tail reader', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile(`${record}\n`);
    const release = deferredBdShow({
      session_ref: `claude:${SESSION_ID}@${HOST}`
    });
    const pending = handleSubscribeSessionLog(socket, openFor('c1'));

    unsubscribe(socket);
    release();
    await pending;

    expect(tail.readers).toHaveLength(0);
    expect(pushOf(socket, 'session-log-snapshot')).toBeUndefined();
  });

  test('closing the connection during the bd read leaves no tail reader', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile(`${record}\n`);
    const release = deferredBdShow({
      session_ref: `claude:${SESSION_ID}@${HOST}`
    });
    const pending = handleSubscribeSessionLog(socket, openFor('c1'));

    detachSessionLog(socket);
    release();
    await pending;

    expect(tail.readers).toHaveLength(0);
  });

  test('re-subscribing during the bd read leaves exactly one tail reader', async () => {
    const socket = fakeSocket();
    writeClaudeSessionFile(`${record}\n`);
    const release = deferredBdShow({
      session_ref: `claude:${SESSION_ID}@${HOST}`
    });
    const first = handleSubscribeSessionLog(socket, openFor('c1'));

    bdShows({ session_ref: `claude:${SESSION_ID}@${HOST}` });
    await handleSubscribeSessionLog(socket, openFor('c1'));
    release();
    await first;

    expect(tail.readers).toHaveLength(1);
    expect(tail.readers[0].start).toHaveBeenCalledTimes(1);
  });

  test('registers nothing when the bead does not name the session', async () => {
    const socket = fakeSocket();
    bdShows({ session_ref: `claude:someone-else@${HOST}` });

    await handleSubscribeSessionLog(socket, openFor('c1'));
    unsubscribe(socket);

    expect(messages(socket).at(-1).payload.unsubscribed).toBe(false);
  });
});

describe('get-session-refs', () => {
  /**
   * @param {Record<string, unknown>} payload
   * @returns {any}
   */
  function request(payload) {
    return { id: 'req-9', type: 'get-session-refs', payload };
  }

  test('returns the projected views for the bead', async () => {
    const socket = fakeSocket();
    bdShows({
      session_ref: `claude:sid-old@far-away-box; codex:sid-new@far-away-box`
    });

    await handleGetSessionRefs(socket, request({ bead_id: 'UI-1' }));

    const reply = messages(socket)[0];
    expect(reply.payload.bead_id).toBe('UI-1');
    expect(
      reply.payload.sessions.map((/** @type {any} */ view) => [
        view.session_id,
        view.current,
        view.locality
      ])
    ).toEqual([
      ['sid-old', false, 'remote'],
      ['sid-new', true, 'remote']
    ]);
  });

  test('returns an empty list when bd fails', async () => {
    const socket = fakeSocket();
    bd.runBdJsonProjectedInWorkspace.mockResolvedValue({
      ok: false,
      error: { code: 'bd_exit_error', message: 'boom' }
    });

    await handleGetSessionRefs(socket, request({ bead_id: 'UI-1' }));

    expect(messages(socket)[0].payload).toEqual({
      bead_id: 'UI-1',
      sessions: []
    });
  });

  test('returns an empty list when the metadata key is absent', async () => {
    const socket = fakeSocket();
    bdShows({ route: 'quick_fix' });

    await handleGetSessionRefs(socket, request({ bead_id: 'UI-1' }));

    expect(messages(socket)[0].payload.sessions).toEqual([]);
  });

  test('refuses a missing bead_id', async () => {
    const socket = fakeSocket();

    await handleGetSessionRefs(socket, request({}));

    expect(messages(socket)[0].error.code).toBe('bad_request');
    expect(bd.runBdJsonProjectedInWorkspace).not.toHaveBeenCalled();
  });

  test('refuses an unregistered root_dir', async () => {
    const socket = fakeSocket();

    await handleGetSessionRefs(
      socket,
      request({ bead_id: 'UI-1', root_dir: '/tmp/not-registered' })
    );

    expect(messages(socket)[0].error.code).toBe('bad_request');
    expect(bd.runBdJsonProjectedInWorkspace).not.toHaveBeenCalled();
  });
});
