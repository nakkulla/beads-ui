import { beforeEach, describe, expect, test, vi } from 'vitest';

const kvGetJsonInWorkspace = vi.fn();
const kvSetJsonInWorkspace = vi.fn();
const kvGetJsonAtRoot = vi.fn();
const kvSetJsonAtRoot = vi.fn();
const invalidateSessionDefaults = vi.fn();

const WS_CONN = '/workspace';
const WS_OTHER = '/other-repo';

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [{ path: WS_CONN }, { path: WS_OTHER }]
  };
});

vi.mock('./context.js', () => ({
  getConnWorkspace: (/** @type {any} */ ws) => ws?.workspace || null,
  readbackFailureDetail: (/** @type {string} */ reason) => ({
    phase: 'readback',
    write_applied: true,
    retry_safe: false,
    reason
  }),
  kvGetJsonInWorkspace: (/** @type {any} */ ws, /** @type {any} */ key) =>
    kvGetJsonInWorkspace(ws, key),
  kvSetJsonInWorkspace: (
    /** @type {any} */ ws,
    /** @type {any} */ key,
    /** @type {any} */ value
  ) => kvSetJsonInWorkspace(ws, key, value),
  kvGetJsonAtRoot: (/** @type {any} */ root, /** @type {any} */ key) =>
    kvGetJsonAtRoot(root, key),
  kvSetJsonAtRoot: (
    /** @type {any} */ root,
    /** @type {any} */ key,
    /** @type {any} */ value
  ) => kvSetJsonAtRoot(root, key, value),
  log: () => {}
}));

vi.mock('./monitor-handlers.js', () => ({
  invalidateSessionDefaults: (/** @type {string} */ root) =>
    invalidateSessionDefaults(root)
}));

const { handleGetSessionDefaults, handleSetSessionDefaults } =
  await import('./session-defaults-handlers.js');

/** @returns {{ ws: any, sent: any[] }} */
function fakeWs() {
  /** @type {any[]} */
  const sent = [];
  return {
    ws: {
      workspace: { root_dir: WS_CONN },
      /** @param {string} message */
      send(message) {
        sent.push(JSON.parse(message));
      }
    },
    sent
  };
}

beforeEach(() => {
  kvGetJsonInWorkspace.mockReset();
  kvSetJsonInWorkspace.mockReset();
  kvGetJsonAtRoot.mockReset();
  kvSetJsonAtRoot.mockReset();
  invalidateSessionDefaults.mockReset();
});

describe('get-session-defaults root_dir (UI-eey2 §9.5)', () => {
  test('reads the named repo kv', async () => {
    kvGetJsonAtRoot.mockResolvedValue({
      ok: true,
      value: { schema: 1, impl_runtime: 'codex' }
    });
    const { ws, sent } = fakeWs();

    await handleGetSessionDefaults(ws, {
      id: 'get',
      type: 'get-session-defaults',
      payload: { root_dir: WS_OTHER }
    });

    expect(kvGetJsonAtRoot).toHaveBeenCalledWith(
      WS_OTHER,
      'workflow_session_defaults'
    );
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].payload.values).toEqual({ impl_runtime: 'codex' });
  });

  test('keeps the connection kv path when no root_dir is named', async () => {
    kvGetJsonInWorkspace.mockResolvedValue({ ok: true, value: { schema: 1 } });
    const { ws, sent } = fakeWs();

    await handleGetSessionDefaults(ws, {
      id: 'get',
      type: 'get-session-defaults',
      payload: {}
    });

    expect(kvGetJsonAtRoot).not.toHaveBeenCalled();
    expect(sent[0].payload.values).toEqual({});
  });

  test('refuses an unregistered root_dir', async () => {
    const { ws, sent } = fakeWs();

    await handleGetSessionDefaults(ws, {
      id: 'get',
      type: 'get-session-defaults',
      payload: { root_dir: '/nope' }
    });

    expect(sent[0].error.code).toBe('bad_request');
    expect(kvGetJsonAtRoot).not.toHaveBeenCalled();
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
  });
});

describe('set-session-defaults root_dir (UI-eey2 §9.5)', () => {
  test('writes and reads back the named repo kv, then invalidates it', async () => {
    kvGetJsonAtRoot
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_runtime: 'codex' }
      });
    kvSetJsonAtRoot.mockResolvedValue({ ok: true });
    const { ws, sent } = fakeWs();

    await handleSetSessionDefaults(ws, {
      id: 'set',
      type: 'set-session-defaults',
      payload: { root_dir: WS_OTHER, values: { impl_runtime: 'codex' } }
    });

    expect(kvSetJsonAtRoot).toHaveBeenCalledWith(
      WS_OTHER,
      'workflow_session_defaults',
      { schema: 1, impl_runtime: 'codex' }
    );
    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].payload.values).toEqual({ impl_runtime: 'codex' });
    expect(invalidateSessionDefaults).toHaveBeenCalledWith(WS_OTHER);
  });

  test('invalidates the connection repo when no root_dir is named', async () => {
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_runtime: 'codex' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });
    const { ws } = fakeWs();

    await handleSetSessionDefaults(ws, {
      id: 'set',
      type: 'set-session-defaults',
      payload: { values: { impl_runtime: 'codex' } }
    });

    expect(kvSetJsonAtRoot).not.toHaveBeenCalled();
    expect(invalidateSessionDefaults).toHaveBeenCalledWith(WS_CONN);
  });

  test('refuses an unregistered root_dir before validating values', async () => {
    const { ws, sent } = fakeWs();

    await handleSetSessionDefaults(ws, {
      id: 'set',
      type: 'set-session-defaults',
      payload: { root_dir: '/nope', values: { impl_runtime: 'codex' } }
    });

    expect(sent[0].error.code).toBe('bad_request');
    expect(kvSetJsonAtRoot).not.toHaveBeenCalled();
    expect(invalidateSessionDefaults).not.toHaveBeenCalled();
  });

  test('does not invalidate when the write fails', async () => {
    kvGetJsonAtRoot.mockResolvedValue({ ok: true, value: { schema: 1 } });
    kvSetJsonAtRoot.mockResolvedValue({ ok: false, error: 'db locked' });
    const { ws, sent } = fakeWs();

    await handleSetSessionDefaults(ws, {
      id: 'set',
      type: 'set-session-defaults',
      payload: { root_dir: WS_OTHER, values: { impl_runtime: 'codex' } }
    });

    expect(sent[0].error.code).toBe('kv_write_failed');
    expect(invalidateSessionDefaults).not.toHaveBeenCalled();
  });
});
