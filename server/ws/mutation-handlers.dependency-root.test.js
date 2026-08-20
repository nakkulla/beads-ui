import { beforeEach, describe, expect, test, vi } from 'vitest';

const CONN_WS = '/tmp/example/repo-conn';
const TARGET_WS = '/tmp/example/repo-target';

const state = vi.hoisted(() => ({
  hidden: /** @type {string[]} */ ([]),
  runBd: vi.fn(),
  readback: vi.fn(),
  refreshConnection: vi.fn(),
  recalibrate: vi.fn(),
  invalidateRunnable: vi.fn(),
  refreshRunnable: vi.fn(),
  refreshFromIssue: vi.fn(),
  emitQueueChanged: vi.fn()
}));

vi.mock('./context.js', () => ({
  getGitUserNameInWorkspace: vi.fn(),
  log: vi.fn(),
  readbackFailureDetail: (/** @type {string} */ reason) => ({ reason }),
  runBdInWorkspace: state.runBd,
  runBdJsonProjectedInWorkspace: state.readback
}));

vi.mock('./refresh.js', () => ({
  triggerMutationRefreshOnce: state.refreshConnection
}));

vi.mock('./ui-order-handlers.js', () => ({
  pruneUiOrderForClose: vi.fn()
}));

vi.mock('./worker-handlers.js', () => ({
  recalibrateSerialLaneAfterDepAdd: state.recalibrate
}));

vi.mock('./workspace-target.js', () => ({
  targetWorkspaceOf: (
    /** @type {any} */ _ws,
    /** @type {Record<string, unknown>} */ payload
  ) => {
    if (!Object.hasOwn(payload, 'root_dir')) {
      return CONN_WS;
    }
    return payload.root_dir === TARGET_WS ? TARGET_WS : null;
  }
}));

vi.mock('../visible-workspaces-store.js', () => ({
  sharedVisibleWorkspacesStore: () => ({
    listHidden: () => state.hidden
  })
}));

vi.mock('../worker/runtime.js', () => ({
  getWorkerRuntime: () => ({
    runnableCache: {
      invalidate: state.invalidateRunnable,
      refresh: state.refreshRunnable
    },
    titleCache: {
      refreshFromIssue: state.refreshFromIssue
    }
  })
}));

vi.mock('../worker/queue-events.js', () => ({
  emitQueueChanged: state.emitQueueChanged
}));

const { handleDepAdd, handleDepRemove } =
  await import('./mutation-handlers.js');

/**
 * @returns {any}
 */
function fakeSocket() {
  return {
    sent: /** @type {any[]} */ ([]),
    send(/** @type {string} */ raw) {
      this.sent.push(JSON.parse(raw));
    }
  };
}

/**
 * @param {'dep-add'|'dep-remove'} type
 * @param {Record<string, unknown>} payload
 */
function request(type, payload) {
  return { id: 'req-1', type, payload };
}

beforeEach(() => {
  state.hidden = [];
  state.runBd.mockReset();
  state.readback.mockReset();
  state.refreshConnection.mockReset();
  state.recalibrate.mockReset();
  state.invalidateRunnable.mockReset();
  state.refreshRunnable.mockReset();
  state.refreshFromIssue.mockReset();
  state.emitQueueChanged.mockReset();
  state.runBd.mockResolvedValue({ code: 0, stdout: '', stderr: '' });
  state.readback.mockResolvedValue({
    ok: true,
    data: { id: 'A-1', title: 'A' },
    protocol: { format: 'bare', schema_version: null }
  });
});

describe('dependency mutation root targeting (UI-2gi1 §6.6)', () => {
  test('runs add and readback in an explicit visible workspace', async () => {
    const ws = fakeSocket();

    await handleDepAdd(
      ws,
      request('dep-add', { a: 'A-1', b: 'B-1', root_dir: TARGET_WS })
    );

    expect(state.runBd).toHaveBeenCalledWith(ws, ['dep', 'add', 'A-1', 'B-1'], {
      cwd: TARGET_WS
    });
    expect(state.readback).toHaveBeenCalledWith(
      ws,
      'show',
      ['show', 'A-1', '--json'],
      { expected_id: 'A-1', cwd: TARGET_WS }
    );
  });

  test('refreshes every target projection after explicit add succeeds', async () => {
    const ws = fakeSocket();

    await handleDepAdd(
      ws,
      request('dep-add', { a: 'A-1', b: 'B-1', root_dir: TARGET_WS })
    );

    expect(state.recalibrate).toHaveBeenCalledWith(TARGET_WS, 'A-1', 'B-1', {
      id: 'A-1',
      title: 'A'
    });
    expect(state.refreshConnection).toHaveBeenCalledWith(ws);
    expect(state.invalidateRunnable).toHaveBeenCalledWith(TARGET_WS);
    expect(state.refreshRunnable).toHaveBeenCalledWith(TARGET_WS);
    expect(state.emitQueueChanged).toHaveBeenCalledWith(TARGET_WS);
  });

  test('reads the blockee for recalibration when view_id names another issue', async () => {
    state.readback
      .mockResolvedValueOnce({ ok: true, data: { id: 'B-1', title: 'B' } })
      .mockResolvedValueOnce({ ok: true, data: { id: 'A-1', title: 'A' } });
    const ws = fakeSocket();

    await handleDepAdd(
      ws,
      request('dep-add', {
        a: 'A-1',
        b: 'B-1',
        view_id: 'B-1',
        root_dir: TARGET_WS
      })
    );

    expect(state.readback).toHaveBeenNthCalledWith(
      2,
      ws,
      'show',
      ['show', 'A-1', '--json'],
      { expected_id: 'A-1', cwd: TARGET_WS }
    );
    expect(state.recalibrate).toHaveBeenCalledWith(TARGET_WS, 'A-1', 'B-1', {
      id: 'A-1',
      title: 'A'
    });
  });

  test('refreshes the explicit target after remove without recalibrating', async () => {
    const ws = fakeSocket();

    await handleDepRemove(
      ws,
      request('dep-remove', { a: 'A-1', b: 'B-1', root_dir: TARGET_WS })
    );

    expect(state.runBd).toHaveBeenCalledWith(
      ws,
      ['dep', 'remove', 'A-1', 'B-1'],
      { cwd: TARGET_WS }
    );
    expect(state.recalibrate).not.toHaveBeenCalled();
    expect(state.emitQueueChanged).toHaveBeenCalledWith(TARGET_WS);
  });

  test('preserves connection-workspace calls when root_dir is absent', async () => {
    const ws = fakeSocket();

    await handleDepAdd(ws, request('dep-add', { a: 'A-1', b: 'B-1' }));

    expect(state.runBd).toHaveBeenCalledWith(ws, ['dep', 'add', 'A-1', 'B-1']);
    expect(state.readback).toHaveBeenCalledWith(
      ws,
      'show',
      ['show', 'A-1', '--json'],
      { expected_id: 'A-1' }
    );
    expect(state.invalidateRunnable).not.toHaveBeenCalled();
    expect(state.emitQueueChanged).not.toHaveBeenCalled();
  });

  test('rejects an unregistered explicit root', async () => {
    const ws = fakeSocket();

    await handleDepAdd(
      ws,
      request('dep-add', {
        a: 'A-1',
        b: 'B-1',
        root_dir: '/tmp/example/unregistered'
      })
    );

    expect(ws.sent[0].error.code).toBe('bad_request');
    expect(state.runBd).not.toHaveBeenCalled();
  });

  test('rejects a hidden explicit root', async () => {
    state.hidden = [TARGET_WS];
    const ws = fakeSocket();

    await handleDepAdd(
      ws,
      request('dep-add', { a: 'A-1', b: 'B-1', root_dir: TARGET_WS })
    );

    expect(ws.sent[0].error.code).toBe('bad_request');
    expect(state.runBd).not.toHaveBeenCalled();
  });

  test('recalibrates and refreshes even when the add readback fails', async () => {
    state.readback.mockResolvedValue({
      ok: false,
      error: { code: 'bd_json_invalid', message: 'unreadable' }
    });
    const ws = fakeSocket();

    await handleDepAdd(
      ws,
      request('dep-add', { a: 'A-1', b: 'B-1', root_dir: TARGET_WS })
    );

    expect(ws.sent[0].error.code).toBe('bd_readback_failed');
    expect(state.recalibrate).toHaveBeenCalledWith(
      TARGET_WS,
      'A-1',
      'B-1',
      null
    );
    expect(state.emitQueueChanged).toHaveBeenCalledWith(TARGET_WS);
  });

  test('refreshes the decoration cache from the removed edge readback', async () => {
    const ws = fakeSocket();

    await handleDepRemove(
      ws,
      request('dep-remove', { a: 'A-1', b: 'B-1', root_dir: TARGET_WS })
    );

    expect(state.refreshFromIssue).toHaveBeenCalledWith(TARGET_WS, {
      id: 'A-1',
      title: 'A'
    });
  });

  test('refreshes the target even when the remove readback fails', async () => {
    state.readback.mockResolvedValue({
      ok: false,
      error: { code: 'bd_json_invalid', message: 'unreadable' }
    });
    const ws = fakeSocket();

    await handleDepRemove(
      ws,
      request('dep-remove', { a: 'A-1', b: 'B-1', root_dir: TARGET_WS })
    );

    expect(ws.sent[0].error.code).toBe('bd_readback_failed');
    expect(state.refreshFromIssue).not.toHaveBeenCalled();
    expect(state.emitQueueChanged).toHaveBeenCalledWith(TARGET_WS);
  });

  test('runs no readback or refresh when bd rejects add', async () => {
    state.runBd.mockResolvedValue({ code: 1, stdout: '', stderr: 'bd denied' });
    const ws = fakeSocket();

    await handleDepAdd(
      ws,
      request('dep-add', { a: 'A-1', b: 'B-1', root_dir: TARGET_WS })
    );

    expect(ws.sent[0].error).toMatchObject({
      code: 'bd_error',
      message: 'bd denied'
    });
    expect(state.readback).not.toHaveBeenCalled();
    expect(state.recalibrate).not.toHaveBeenCalled();
    expect(state.refreshConnection).not.toHaveBeenCalled();
    expect(state.invalidateRunnable).not.toHaveBeenCalled();
    expect(state.emitQueueChanged).not.toHaveBeenCalled();
  });
});
