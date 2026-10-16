import { beforeEach, describe, expect, test, vi } from 'vitest';

const WS = '/tmp/example-workspace/project-a';
const OTHER = '/tmp/example-workspace/project-b';

const bd = vi.hoisted(() => ({
  /** @type {Record<string, Record<string, string>>} */
  metadata: {},
  /** @type {Record<string, string[]>} */
  labels: {},
  /** @type {string[][]} */
  updates: [],
  /** @type {string|null} */
  readback_override: null,
  /** @type {((args: string[]) => Promise<void>)|null} */
  beforeUpdate: null
}));

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS }, { path: OTHER }]
  };
});

vi.mock('./refresh.js', () => ({ triggerMutationRefreshOnce: () => {} }));

vi.mock('./context.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    runBdJsonProjectedInWorkspace: async (
      /** @type {any} */ _ws,
      /** @type {string} */ _family,
      /** @type {string[]} */ args
    ) => {
      const id = args[1];
      const metadata = { ...(bd.metadata[id] || {}) };
      if (bd.readback_override !== null && bd.updates.length > 0) {
        metadata.exec_lane = bd.readback_override;
      }
      return {
        ok: true,
        data: { id, labels: bd.labels[id] || [], metadata }
      };
    },
    runBdInWorkspace: async (
      /** @type {any} */ _ws,
      /** @type {string[]} */ args,
      /** @type {any} */ options
    ) => {
      if (bd.beforeUpdate) {
        await bd.beforeUpdate(args);
      }
      bd.updates.push([options?.cwd ?? '', ...args]);
      const id = args[1];
      const metadata = (bd.metadata[id] ||= {});
      if (args[2] === '--set-metadata') {
        const [key, value] = args[3].split('=');
        metadata[key] = value;
      } else if (args[2] === '--unset-metadata') {
        delete metadata[args[3]];
      }
      return { code: 0, stdout: '', stderr: '' };
    }
  };
});

const { setConnWorkspace } = await import('./context.js');
const { handleChipSessionToggle } = await import('./worker-handlers.js');

/** @returns {any} */
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
 * @returns {any}
 */
function lastReply(socket) {
  return JSON.parse(socket.sent[socket.sent.length - 1]);
}

/**
 * @param {Record<string, unknown>} payload
 * @returns {any}
 */
function toggleReq(payload) {
  return { id: 'toggle', type: 'chip-session-toggle', payload };
}

/** @param {string} id */
function preferred(id) {
  bd.labels[id] = ['session-preferred'];
  bd.metadata[id] = { session_preferred_reason: 'external_roundtrip' };
}

beforeEach(() => {
  bd.metadata = {};
  bd.labels = {};
  bd.updates = [];
  bd.readback_override = null;
  bd.beforeUpdate = null;
});

describe('chip-session-toggle (UI-lbm5 §4.7)', () => {
  test('sets exec_lane=session on an unset issue and answers the readback', async () => {
    preferred('UI-1');
    const socket = fakeSocket();

    await handleChipSessionToggle(socket, toggleReq({ id: 'UI-1' }));

    expect(bd.updates).toEqual([
      [WS, 'update', 'UI-1', '--set-metadata', 'exec_lane=session']
    ]);
    expect(lastReply(socket)).toMatchObject({
      ok: true,
      payload: { id: 'UI-1', exec_lane: 'session' }
    });
  });

  test('unsets exec_lane on an issue already set to the session lane', async () => {
    preferred('UI-1');
    bd.metadata['UI-1'].exec_lane = 'session';
    const socket = fakeSocket();

    await handleChipSessionToggle(socket, toggleReq({ id: 'UI-1' }));

    expect(bd.updates).toEqual([
      [WS, 'update', 'UI-1', '--unset-metadata', 'exec_lane']
    ]);
    expect(lastReply(socket).payload).toMatchObject({ exec_lane: null });
  });

  test('writes in the repo the card names by root_dir', async () => {
    preferred('UI-1');
    const socket = fakeSocket();

    await handleChipSessionToggle(
      socket,
      toggleReq({ id: 'UI-1', root_dir: OTHER })
    );

    expect(bd.updates[0][0]).toBe(OTHER);
  });

  test('applies two clicks on one issue in request order', async () => {
    preferred('UI-1');
    const socket = fakeSocket();
    /** @type {() => void} */
    let release = () => {};
    const gate = new Promise((resolve) => {
      release = () => resolve(undefined);
    });
    bd.beforeUpdate = async () => {
      if (bd.updates.length === 0) {
        await gate;
      }
    };

    const first = handleChipSessionToggle(socket, toggleReq({ id: 'UI-1' }));
    const second = handleChipSessionToggle(socket, toggleReq({ id: 'UI-1' }));
    release();
    await Promise.all([first, second]);

    expect(bd.updates.map((update) => update[3])).toEqual([
      '--set-metadata',
      '--unset-metadata'
    ]);
    expect(bd.metadata['UI-1'].exec_lane).toBeUndefined();
  });

  test('refuses an issue without a valid session-preferred attachment', async () => {
    bd.metadata['UI-1'] = { exec_lane: 'session' };
    const socket = fakeSocket();

    await handleChipSessionToggle(socket, toggleReq({ id: 'UI-1' }));

    expect(bd.updates).toEqual([]);
    expect(lastReply(socket)).toMatchObject({
      ok: false,
      error: { code: 'not_session_preferred' }
    });
  });

  test('answers an error when the readback disagrees with the write', async () => {
    preferred('UI-1');
    bd.readback_override = 'worker';
    const socket = fakeSocket();

    await handleChipSessionToggle(socket, toggleReq({ id: 'UI-1' }));

    expect(lastReply(socket)).toMatchObject({
      ok: false,
      error: { code: 'readback_mismatch' }
    });
  });

  test('refuses a payload without an id', async () => {
    const socket = fakeSocket();

    await handleChipSessionToggle(socket, toggleReq({}));

    expect(lastReply(socket)).toMatchObject({
      ok: false,
      error: { code: 'bad_request' }
    });
  });
});
