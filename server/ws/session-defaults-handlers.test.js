import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from '../exec-preset-store.js';
import { createExecPresetCoordinator } from '../worker/exec-preset-coordinator.js';
import {
  __resetWorkerRuntimeForTest,
  getWorkerRuntime
} from '../worker/runtime.js';

const kvGetJsonInWorkspace = vi.fn();
const kvSetJsonInWorkspace = vi.fn();
const kvGetJsonAtRoot = vi.fn();
const kvSetJsonAtRoot = vi.fn();
const invalidateSessionDefaults = vi.fn();

const WS_CONN = '/workspace';
const WS_OTHER = '/other-repo';
/** @type {string|undefined} */
let original_state_home;
/** @type {string} */
let tmp_state;

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

const {
  handleGetSessionDefaults,
  handleGetWorkspaceAccounts,
  handleSetSessionDefaults,
  handleSetWorkspaceAccounts
} = await import('./session-defaults-handlers.js');

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
  original_state_home = process.env.XDG_STATE_HOME;
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-session-preset-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetWorkerRuntimeForTest();
  kvGetJsonInWorkspace.mockReset();
  kvSetJsonInWorkspace.mockReset();
  kvGetJsonAtRoot.mockReset();
  kvSetJsonAtRoot.mockReset();
  invalidateSessionDefaults.mockReset();
});

afterEach(() => {
  __resetWorkerRuntimeForTest();
  if (original_state_home === undefined) {
    delete process.env.XDG_STATE_HOME;
  } else {
    process.env.XDG_STATE_HOME = original_state_home;
  }
  fs.rmSync(tmp_state, { recursive: true, force: true });
  vi.restoreAllMocks();
});

describe('session defaults preset identity', () => {
  function changedDefaultsFixture() {
    const store = getWorkerRuntime().queueStore;
    const applied_exec_preset = {
      id: 'missing',
      name: 'Profile',
      revision: 1,
      applied_at: 10
    };
    store.setOrchestrationDefaults(WS_OTHER, {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet' },
      applied_exec_preset
    });
    kvGetJsonAtRoot
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_runtime: 'codex' }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_runtime: 'claude' }
      });
    kvSetJsonAtRoot.mockResolvedValue({ ok: true });
    const req = {
      id: 'set',
      type: /** @type {const} */ ('set-session-defaults'),
      payload: { root_dir: WS_OTHER, values: { impl_runtime: 'claude' } }
    };
    return { ...fakeWs(), store, req, applied_exec_preset };
  }

  test('clears identity using the latest revision after the first CAS conflicts', async () => {
    const { ws, sent, store, req } = changedDefaultsFixture();
    const clear = store.clearAppliedExecPreset.bind(store);
    const clearAppliedExecPreset = vi
      .spyOn(store, 'clearAppliedExecPreset')
      .mockImplementationOnce((workspace, input) => {
        store.setOrchestrationDefaults(workspace, {
          expected_revision: store.snapshot(workspace).revision,
          values: { orchestration_effort: 'high' }
        });
        return clear(workspace, input);
      });

    await handleSetSessionDefaults(ws, req);

    expect(clearAppliedExecPreset.mock.calls).toEqual([
      [WS_OTHER, { expected_revision: 1 }],
      [WS_OTHER, { expected_revision: 2 }]
    ]);
    expect(store.snapshot(WS_OTHER).applied_exec_preset).toBeNull();
    expect(sent.at(-1)).toMatchObject({
      ok: true,
      payload: { values: { impl_runtime: 'claude' } }
    });
  });

  test.each(['conflict', 'exception'])(
    'preserves the successful settings response when the retry fails with %s',
    async (failure) => {
      const { ws, sent, store, req, applied_exec_preset } =
        changedDefaultsFixture();
      const clear = store.clearAppliedExecPreset.bind(store);
      let calls = 0;
      const clearAppliedExecPreset = vi
        .spyOn(store, 'clearAppliedExecPreset')
        .mockImplementation((workspace, input) => {
          calls++;
          if (calls === 2 && failure === 'exception') {
            throw new Error('queue unavailable');
          }
          store.setOrchestrationDefaults(workspace, {
            expected_revision: store.snapshot(workspace).revision,
            values: { orchestration_effort: 'high' }
          });
          return clear(workspace, input);
        });

      await handleSetSessionDefaults(ws, req);

      expect(clearAppliedExecPreset).toHaveBeenCalledTimes(2);
      expect(kvSetJsonAtRoot).toHaveBeenCalledExactlyOnceWith(
        WS_OTHER,
        'workflow_session_defaults',
        { schema: 1, impl_runtime: 'claude' }
      );
      expect(sent).toHaveLength(1);
      expect(sent[0]).toMatchObject({
        ok: true,
        payload: { values: { impl_runtime: 'claude' } }
      });
      expect(store.snapshot(WS_OTHER).applied_exec_preset).toEqual(
        applied_exec_preset
      );
    }
  );

  test('skips the retry when another writer has already cleared identity', async () => {
    const { ws, sent, store, req } = changedDefaultsFixture();
    const clear = store.clearAppliedExecPreset.bind(store);
    const clearAppliedExecPreset = vi
      .spyOn(store, 'clearAppliedExecPreset')
      .mockImplementationOnce((workspace, input) => {
        clear(workspace, input);
        return clear(workspace, input);
      });

    await handleSetSessionDefaults(ws, req);

    expect(clearAppliedExecPreset).toHaveBeenCalledTimes(1);
    expect(store.snapshot(WS_OTHER).applied_exec_preset).toBeNull();
    expect(sent.at(-1).ok).toBe(true);
  });

  test.each([
    ['declared', { impl_runtime: 'claude' }, true],
    ['same', { impl_runtime: 'codex' }, false],
    ['undeclared', { impl_effort: 'high' }, false],
    ['cleared', { impl_runtime: null }, true],
    ['missing', { impl_effort: 'high' }, true],
    ['unreadable', { impl_effort: 'high' }, true],
    ['missing-same', { impl_runtime: 'codex' }, false],
    ['write-failed', { impl_runtime: 'claude' }, false],
    ['readback-same', { impl_runtime: 'claude' }, false],
    ['readback-failed', { impl_runtime: 'claude' }, true]
  ])(
    'updates identity only for changed owned keys: %s',
    async (kind, values, clears) => {
      const runtime = getWorkerRuntime();
      const created = runtime.execPresetCoordinator.create({
        expected_revision: 0,
        name: 'Profile',
        settings: { impl_runtime: 'codex' }
      });
      const applied_exec_preset = {
        id: created.presets[0].id,
        name: 'Profile',
        revision: 1,
        applied_at: 10
      };
      runtime.queueStore.setOrchestrationDefaults(WS_OTHER, {
        expected_revision: 0,
        values: { orchestration_model: 'sonnet' },
        applied_exec_preset
      });
      if (kind === 'missing' || kind === 'missing-same') {
        runtime.execPresetCoordinator.delete({
          expected_revision: 1,
          id: applied_exec_preset.id
        });
      } else if (kind === 'unreadable') {
        const presetStore = createExecPresetStore();
        vi.spyOn(presetStore, 'snapshot').mockImplementation(() => {
          throw new Error('unreadable');
        });
        const coordinator = createExecPresetCoordinator({
          queueStore: runtime.queueStore,
          presetStore
        });
        vi.spyOn(
          runtime.execPresetCoordinator,
          'changesAppliedExecPreset'
        ).mockImplementation(coordinator.changesAppliedExecPreset);
      }
      const before = { schema: 1, impl_runtime: 'codex' };
      const after =
        kind === 'readback-same' ? before : { ...before, ...values };
      kvGetJsonAtRoot
        .mockResolvedValueOnce({ ok: true, value: before })
        .mockResolvedValueOnce(
          kind === 'readback-failed'
            ? { ok: false, error: 'unreadable' }
            : { ok: true, value: after }
        );
      kvSetJsonAtRoot.mockResolvedValue(
        kind === 'write-failed'
          ? { ok: false, error: 'write failed' }
          : { ok: true }
      );
      const { ws, sent } = fakeWs();

      await handleSetSessionDefaults(ws, {
        id: 'set',
        type: 'set-session-defaults',
        payload: { root_dir: WS_OTHER, values }
      });

      expect(sent.at(-1).ok).toBe(
        !['write-failed', 'readback-same', 'readback-failed'].includes(kind)
      );
      expect(runtime.queueStore.snapshot(WS_OTHER).applied_exec_preset).toEqual(
        clears ? null : applied_exec_preset
      );
    }
  );
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

describe('get-workspace-accounts (UI-d3cb §4)', () => {
  test('returns the three-state layer with its values', async () => {
    kvGetJsonInWorkspace.mockResolvedValue({
      ok: true,
      value: { schema: 1, claude_account: 'a@example.com' }
    });
    const { ws, sent } = fakeWs();

    await handleGetWorkspaceAccounts(ws, {
      id: 'get',
      type: 'get-workspace-accounts',
      payload: {}
    });

    expect(kvGetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workspace_exec_accounts'
    );
    expect(sent[0].payload).toEqual({
      state: 'usable',
      values: { claude_account: 'a@example.com' },
      warnings: []
    });
  });

  test('returns an absent layer as a success', async () => {
    kvGetJsonInWorkspace.mockResolvedValue({ ok: true, value: undefined });
    const { ws, sent } = fakeWs();

    await handleGetWorkspaceAccounts(ws, {
      id: 'get',
      type: 'get-workspace-accounts',
      payload: {}
    });

    expect(sent[0].payload.state).toBe('absent');
  });

  test('returns an unusable layer with its warnings rather than an error', async () => {
    kvGetJsonInWorkspace.mockResolvedValue({
      ok: true,
      value: undefined,
      warning: 'kv_value_unparsable'
    });
    const { ws, sent } = fakeWs();

    await handleGetWorkspaceAccounts(ws, {
      id: 'get',
      type: 'get-workspace-accounts',
      payload: {}
    });

    expect(sent[0].error).toBeUndefined();
    expect(sent[0].payload).toEqual({
      state: 'unusable',
      values: {},
      warnings: ['kv_value_unparsable']
    });
  });

  test('fails a bd read failure as kv_read_failed', async () => {
    kvGetJsonInWorkspace.mockResolvedValue({ ok: false, error: 'db locked' });
    const { ws, sent } = fakeWs();

    await handleGetWorkspaceAccounts(ws, {
      id: 'get',
      type: 'get-workspace-accounts',
      payload: {}
    });

    expect(sent[0].error.code).toBe('kv_read_failed');
  });

  test('reads the named repo kv', async () => {
    kvGetJsonAtRoot.mockResolvedValue({ ok: true, value: undefined });
    const { ws } = fakeWs();

    await handleGetWorkspaceAccounts(ws, {
      id: 'get',
      type: 'get-workspace-accounts',
      payload: { root_dir: WS_OTHER }
    });

    expect(kvGetJsonAtRoot).toHaveBeenCalledWith(
      WS_OTHER,
      'workspace_exec_accounts'
    );
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
  });

  test('refuses an unregistered root_dir', async () => {
    const { ws, sent } = fakeWs();

    await handleGetWorkspaceAccounts(ws, {
      id: 'get',
      type: 'get-workspace-accounts',
      payload: { root_dir: '/nope' }
    });

    expect(sent[0].error.code).toBe('bad_request');
    expect(kvGetJsonAtRoot).not.toHaveBeenCalled();
  });
});

describe('set-workspace-accounts (UI-d3cb §4)', () => {
  test('writes the merged object and replies with the readback', async () => {
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: undefined })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, claude_account: 'a@example.com' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });
    const { ws, sent } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { values: { claude_account: 'a@example.com' } }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workspace_exec_accounts',
      { schema: 1, claude_account: 'a@example.com' }
    );
    expect(sent[0].payload).toEqual({
      state: 'usable',
      values: { claude_account: 'a@example.com' },
      warnings: []
    });
  });

  test('never touches the session defaults key', async () => {
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: undefined })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, codex_account: 'k' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });
    const { ws } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { values: { codex_account: 'k' } }
    });

    const keys_touched = [
      ...kvGetJsonInWorkspace.mock.calls,
      ...kvSetJsonInWorkspace.mock.calls
    ].map((call) => call[1]);
    expect(keys_touched).not.toContain('workflow_session_defaults');
    expect(invalidateSessionDefaults).not.toHaveBeenCalled();
  });

  test('refuses an out-of-vocabulary key before touching bd', async () => {
    const { ws, sent } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { values: { impl_runtime: 'codex' } }
    });

    expect(sent[0].error.code).toBe('bad_request');
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
  });

  test('refuses a value containing whitespace', async () => {
    const { ws, sent } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { values: { claude_account: 'a b@example.com' } }
    });

    expect(sent[0].error.code).toBe('bad_request');
    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
  });

  test('fails a pre-write read failure as kv_read_failed', async () => {
    kvGetJsonInWorkspace.mockResolvedValue({ ok: false, error: 'db locked' });
    const { ws, sent } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { values: { claude_account: 'a@example.com' } }
    });

    expect(sent[0].error.code).toBe('kv_read_failed');
    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
  });

  test('fails a write failure as kv_write_failed', async () => {
    kvGetJsonInWorkspace.mockResolvedValue({ ok: true, value: undefined });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: false, error: 'db locked' });
    const { ws, sent } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { values: { claude_account: 'a@example.com' } }
    });

    expect(sent[0].error.code).toBe('kv_write_failed');
  });

  test('fails a readback that lost the requested value', async () => {
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: undefined })
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });
    const { ws, sent } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { values: { claude_account: 'a@example.com' } }
    });

    expect(sent[0].error.code).toBe('bd_readback_failed');
  });

  test('deletes a key an empty value names', async () => {
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, claude_account: 'a@example.com' }
      })
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });
    const { ws, sent } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { values: { claude_account: '' } }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workspace_exec_accounts',
      { schema: 1 }
    );
    expect(sent[0].payload.values).toEqual({});
  });

  test('writes the named repo kv', async () => {
    kvGetJsonAtRoot
      .mockResolvedValueOnce({ ok: true, value: undefined })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, codex_account: 'k' }
      });
    kvSetJsonAtRoot.mockResolvedValue({ ok: true });
    const { ws } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { root_dir: WS_OTHER, values: { codex_account: 'k' } }
    });

    expect(kvSetJsonAtRoot).toHaveBeenCalledWith(
      WS_OTHER,
      'workspace_exec_accounts',
      { schema: 1, codex_account: 'k' }
    );
    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
  });

  test('refuses an unregistered root_dir before validating values', async () => {
    const { ws, sent } = fakeWs();

    await handleSetWorkspaceAccounts(ws, {
      id: 'set',
      type: 'set-workspace-accounts',
      payload: { root_dir: '/nope', values: { codex_account: 'k' } }
    });

    expect(sent[0].error.code).toBe('bad_request');
    expect(kvSetJsonAtRoot).not.toHaveBeenCalled();
  });
});
