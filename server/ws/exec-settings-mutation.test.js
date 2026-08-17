import { beforeEach, describe, expect, test, vi } from 'vitest';
import { projectedResponse } from '../__fixtures__/bd-json/projected.js';

// Capture the argv passed to the bd runner.
const runBdInWorkspace = vi.fn();
const runBdJsonProjectedInWorkspace = vi.fn();
const triggerMutationRefreshOnce = vi.fn();
const kvGetJsonInWorkspace = vi.fn();
const kvSetJsonInWorkspace = vi.fn();

vi.mock('./context.js', () => ({
  runBdInWorkspace: (/** @type {any} */ ws, /** @type {any} */ args) =>
    runBdInWorkspace(ws, args),
  runBdJsonProjectedInWorkspace: (
    /** @type {any} */ ws,
    /** @type {any} */ command_family,
    /** @type {any} */ args,
    /** @type {any} */ options
  ) => runBdJsonProjectedInWorkspace(ws, command_family, args, options),
  kvGetJsonInWorkspace: (/** @type {any} */ ws, /** @type {any} */ key) =>
    kvGetJsonInWorkspace(ws, key),
  kvSetJsonInWorkspace: (
    /** @type {any} */ ws,
    /** @type {any} */ key,
    /** @type {any} */ value
  ) => kvSetJsonInWorkspace(ws, key, value),
  getGitUserNameInWorkspace: () => Promise.resolve(''),
  log: () => {}
}));

vi.mock('./refresh.js', () => ({
  triggerMutationRefreshOnce: () => triggerMutationRefreshOnce()
}));

const {
  buildExecSettingsArgs,
  buildImplTargetArgs,
  handleUpdateExecSettings,
  handleUpdateImplTarget
} = await import('./mutation-handlers.js');

const { handleGetSessionDefaults, handleSetSessionDefaults } =
  await import('./session-defaults-handlers.js');

/**
 * @returns {{ ws: any, sent: any[] }}
 */
function fakeWs() {
  /** @type {any[]} */
  const sent = [];
  return {
    ws: {
      send: (/** @type {string} */ s) => sent.push(JSON.parse(s))
    },
    sent
  };
}

describe('buildExecSettingsArgs', () => {
  test('set produces --set-metadata key=value', () => {
    expect(buildExecSettingsArgs('UI-1', 'spec_review_model', 'codex')).toEqual(
      ['update', 'UI-1', '--set-metadata', 'spec_review_model=codex']
    );
  });

  test('workflow_mode=standard produces --set-metadata so a bead overrides the kv default', () => {
    expect(buildExecSettingsArgs('UI-1', 'workflow_mode', 'standard')).toEqual([
      'update',
      'UI-1',
      '--set-metadata',
      'workflow_mode=standard'
    ]);
  });

  test('empty value produces --unset-metadata for any key', () => {
    expect(buildExecSettingsArgs('UI-1', 'impl_model', '')).toEqual([
      'update',
      'UI-1',
      '--unset-metadata',
      'impl_model'
    ]);
  });
});

describe('handleUpdateExecSettings', () => {
  beforeEach(() => {
    runBdInWorkspace.mockReset();
    runBdJsonProjectedInWorkspace.mockReset();
    triggerMutationRefreshOnce.mockReset();
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonProjectedInWorkspace.mockResolvedValue(
      projectedResponse(null, {
        code: 0,
        stdoutJson: { id: 'UI-1', metadata: {} }
      })
    );
  });

  test('standard workflow_mode calls bd with --set-metadata (argv capture)', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r1',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'workflow_mode', value: 'standard' }
    });
    expect(runBdInWorkspace).toHaveBeenCalledWith(ws, [
      'update',
      'UI-1',
      '--set-metadata',
      'workflow_mode=standard'
    ]);
    expect(sent[0].ok).toBe(true);
  });

  test('an empty value is the only per-bead deletion (3-state editor)', async () => {
    const { ws } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r1b',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'workflow_mode', value: '' }
    });
    expect(runBdInWorkspace).toHaveBeenCalledWith(ws, [
      'update',
      'UI-1',
      '--unset-metadata',
      'workflow_mode'
    ]);
  });

  test('fast_track workflow_mode calls bd with --set-metadata', async () => {
    const { ws } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r2',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'workflow_mode', value: 'fast_track' }
    });
    expect(runBdInWorkspace).toHaveBeenCalledWith(ws, [
      'update',
      'UI-1',
      '--set-metadata',
      'workflow_mode=fast_track'
    ]);
  });

  test('invalid enum value is rejected without shelling bd', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r3',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'spec_review_model', value: 'bogus' }
    });
    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].ok).toBe(false);
    expect(sent[0].error.code).toBe('bad_request');
  });

  test('the retired review_model key is rejected as unknown (dotfiles-mqcj)', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r3b',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'review_model', value: 'codex' }
    });
    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].ok).toBe(false);
    expect(sent[0].error.message).toContain('unknown exec-setting key');
  });

  test('a per-step review key reaches bd with its own metadata name', async () => {
    const { ws } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r3c',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'plan_review_model', value: 'fable' }
    });
    expect(runBdInWorkspace).toHaveBeenCalledWith(expect.anything(), [
      'update',
      'UI-1',
      '--set-metadata',
      'plan_review_model=fable'
    ]);
  });

  test.each([
    ['impl_runtime', 'codex'],
    ['impl_model', 'terra'],
    ['impl_effort', 'high'],
    ['impl_runtime', '']
  ])(
    'routes an EXACT %s to the atomic implementation-target mutation',
    async (key, value) => {
      const { ws, sent } = fakeWs();
      await handleUpdateExecSettings(ws, {
        id: 'r3d',
        type: 'update-exec-settings',
        payload: { id: 'UI-1', key, value }
      });

      expect(runBdInWorkspace).not.toHaveBeenCalled();
      expect(sent[0].error.message).toContain('update-impl-target');
    }
  );

  test.each([
    ['impl_dispatch', 'delegated'],
    ['impl_dispatch', 'main'],
    ['impl_speed', 'default'],
    ['impl_speed', 'fast']
  ])('writes the session key %s=%s as a literal', async (key, value) => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r3e',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key, value }
    });

    expect(runBdInWorkspace).toHaveBeenCalledWith(ws, [
      'update',
      'UI-1',
      '--set-metadata',
      `${key}=${value}`
    ]);
    expect(sent[0].ok).toBe(true);
  });

  test.each([
    ['impl_model', 'auto'],
    ['impl_effort', 'auto']
  ])(
    'preserves the %s auto literal instead of routing or dropping it',
    async (key) => {
      const { ws, sent } = fakeWs();
      await handleUpdateExecSettings(ws, {
        id: 'r3f',
        type: 'update-exec-settings',
        payload: { id: 'UI-1', key, value: 'auto' }
      });

      expect(runBdInWorkspace).toHaveBeenCalledWith(ws, [
        'update',
        'UI-1',
        '--set-metadata',
        `${key}=auto`
      ]);
      expect(sent[0].ok).toBe(true);
    }
  );

  test('rejects an out-of-enum impl_dispatch without shelling bd', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r3g',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'impl_dispatch', value: 'sideways' }
    });

    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].error.code).toBe('bad_request');
  });

  test('the auto literal is not accepted for impl_runtime', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r3h',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'impl_runtime', value: 'auto' }
    });

    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].ok).toBe(false);
  });

  test('unknown key is rejected', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r4',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'nope', value: 'x' }
    });
    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].ok).toBe(false);
  });
});

describe('handleUpdateImplTarget', () => {
  beforeEach(() => {
    runBdInWorkspace.mockReset();
    runBdJsonProjectedInWorkspace.mockReset();
    triggerMutationRefreshOnce.mockReset();
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonProjectedInWorkspace.mockResolvedValue(
      projectedResponse(null, {
        code: 0,
        stdoutJson: { id: 'UI-1', metadata: {} }
      })
    );
  });

  test('writes runtime model effort in one update and reads back once', async () => {
    const { ws, sent } = fakeWs();

    await handleUpdateImplTarget(ws, {
      id: 'target',
      type: 'update-impl-target',
      payload: {
        id: 'UI-1',
        impl_runtime: 'codex',
        impl_model: 'terra',
        impl_effort: 'high'
      }
    });

    expect(runBdInWorkspace).toHaveBeenCalledOnce();
    expect(runBdInWorkspace).toHaveBeenCalledWith(
      ws,
      buildImplTargetArgs('UI-1', {
        impl_runtime: 'codex',
        impl_model: 'terra',
        impl_effort: 'high'
      })
    );
    expect(runBdJsonProjectedInWorkspace).toHaveBeenCalledTimes(1);
    expect(sent[0].ok).toBe(true);
  });

  test.each([
    [{ impl_runtime: 'codex', impl_model: 'auto', impl_effort: 'auto' }],
    [{ impl_runtime: 'inherit', impl_model: 'auto', impl_effort: 'high' }]
  ])('accepts an auto implementation target %o', async (payload) => {
    const { ws, sent } = fakeWs();

    await handleUpdateImplTarget(ws, {
      id: 'target-auto',
      type: 'update-impl-target',
      payload: { id: 'UI-1', ...payload }
    });

    expect(runBdInWorkspace).toHaveBeenCalledOnce();
    expect(runBdInWorkspace).toHaveBeenCalledWith(
      ws,
      buildImplTargetArgs('UI-1', payload)
    );
    expect(sent[0].ok).toBe(true);
  });

  test('rejects a mismatched runtime and model without calling bd', async () => {
    const { ws, sent } = fakeWs();

    await handleUpdateImplTarget(ws, {
      id: 'target',
      type: 'update-impl-target',
      payload: {
        id: 'UI-1',
        impl_runtime: 'claude',
        impl_model: 'terra',
        impl_effort: 'high'
      }
    });

    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].error.code).toBe('bad_request');
  });

  test('allows an inherited exact model when the supplied orchestration provider matches', async () => {
    const { ws, sent } = fakeWs();

    await handleUpdateImplTarget(ws, {
      id: 'target-inherit',
      type: 'update-impl-target',
      payload: {
        id: 'UI-1',
        impl_runtime: 'inherit',
        impl_model: 'terra',
        impl_effort: 'high',
        orchestration_runtime: 'codex'
      }
    });

    expect(runBdInWorkspace).toHaveBeenCalledOnce();
    expect(sent[0].ok).toBe(true);
  });

  test('rejects an inherited exact model when the supplied orchestration provider differs', async () => {
    const { ws, sent } = fakeWs();

    await handleUpdateImplTarget(ws, {
      id: 'target-inherit-mismatch',
      type: 'update-impl-target',
      payload: {
        id: 'UI-1',
        impl_runtime: 'inherit',
        impl_model: 'terra',
        impl_effort: 'high',
        orchestration_runtime: 'claude'
      }
    });

    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].error.message).toContain('provider_model_mismatch');
  });

  test.each([
    ['throws', () => Promise.reject(new Error('readback exploded'))],
    [
      'returns nonzero',
      () =>
        Promise.resolve(projectedResponse(null, { code: 1, stderr: 'nope' }))
    ],
    [
      'returns malformed payload',
      () =>
        Promise.resolve(projectedResponse('show', { code: 0, stdoutJson: [] }))
    ]
  ])(
    'refreshes and reports readback failure when bd show %s',
    async (_, readback) => {
      const { ws, sent } = fakeWs();
      runBdJsonProjectedInWorkspace.mockImplementation(readback);

      await handleUpdateImplTarget(ws, {
        id: 'target-readback',
        type: 'update-impl-target',
        payload: {
          id: 'UI-1',
          impl_runtime: 'codex',
          impl_model: 'terra',
          impl_effort: 'high'
        }
      });

      expect(runBdInWorkspace).toHaveBeenCalledOnce();
      expect(triggerMutationRefreshOnce).toHaveBeenCalledOnce();
      expect(sent[0].error.code).toBe('bd_readback_failed');
    }
  );
});

describe('handleGetSessionDefaults', () => {
  beforeEach(() => {
    kvGetJsonInWorkspace.mockReset();
    kvSetJsonInWorkspace.mockReset();
  });

  test('returns the stored session-default values', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace.mockResolvedValue({
      ok: true,
      value: { schema: 1, workflow_mode: 'fast_track', impl_dispatch: 'main' }
    });

    await handleGetSessionDefaults(ws, {
      id: 'g1',
      type: 'get-session-defaults',
      payload: {}
    });

    expect(sent[0].ok).toBe(true);
    expect(sent[0].payload.values).toEqual({
      workflow_mode: 'fast_track',
      impl_dispatch: 'main'
    });
  });

  test('reports an absent kv key as an empty layer without warning', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace.mockResolvedValue({ ok: true, value: undefined });

    await handleGetSessionDefaults(ws, {
      id: 'g2',
      type: 'get-session-defaults',
      payload: {}
    });

    expect(sent[0].payload.values).toEqual({});
    expect(sent[0].payload.warnings).toEqual([]);
  });

  test('surfaces a kv parse failure as a warning the banner can render', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace.mockResolvedValue({
      ok: true,
      value: undefined,
      warning: 'kv_value_unparsable'
    });

    await handleGetSessionDefaults(ws, {
      id: 'g3',
      type: 'get-session-defaults',
      payload: {}
    });

    expect(sent[0].ok).toBe(true);
    expect(sent[0].payload.warnings).toContain('kv_value_unparsable');
  });

  test('drops an out-of-enum key and warns instead of failing the layer', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace.mockResolvedValue({
      ok: true,
      value: { schema: 1, workflow_mode: 'bogus', impl_dispatch: 'delegated' }
    });

    await handleGetSessionDefaults(ws, {
      id: 'g4',
      type: 'get-session-defaults',
      payload: {}
    });

    expect(sent[0].payload.values).toEqual({ impl_dispatch: 'delegated' });
    expect(sent[0].payload.warnings).toContain('invalid_value:workflow_mode');
  });

  test('propagates a bd read failure as an error reply', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace.mockResolvedValue({ ok: false, error: 'db locked' });

    await handleGetSessionDefaults(ws, {
      id: 'g5',
      type: 'get-session-defaults',
      payload: {}
    });

    expect(sent[0].ok).toBe(false);
    expect(sent[0].error.code).toBe('kv_read_failed');
  });
});

describe('handleSetSessionDefaults', () => {
  beforeEach(() => {
    kvGetJsonInWorkspace.mockReset();
    kvSetJsonInWorkspace.mockReset();
  });

  test('writes a valid patch and replies with the readback values', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, workflow_mode: 'fast_track' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleSetSessionDefaults(ws, {
      id: 's1',
      type: 'set-session-defaults',
      payload: { values: { workflow_mode: 'fast_track' } }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workflow_session_defaults',
      { schema: 1, workflow_mode: 'fast_track' }
    );
    expect(sent[0].ok).toBe(true);
    expect(sent[0].payload.values).toEqual({ workflow_mode: 'fast_track' });
  });

  test('re-reads before writing so a concurrent key survives last-write-wins', async () => {
    const { ws } = fakeWs();
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_dispatch: 'main' }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_dispatch: 'main', workflow_mode: 'standard' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleSetSessionDefaults(ws, {
      id: 's2',
      type: 'set-session-defaults',
      payload: { values: { workflow_mode: 'standard' } }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workflow_session_defaults',
      { schema: 1, impl_dispatch: 'main', workflow_mode: 'standard' }
    );
  });

  test('removes a key when its requested value is null', async () => {
    const { ws } = fakeWs();
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, workflow_mode: 'fast_track' }
      })
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleSetSessionDefaults(ws, {
      id: 's3',
      type: 'set-session-defaults',
      payload: { values: { workflow_mode: null } }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workflow_session_defaults',
      { schema: 1 }
    );
  });

  test('rejects an out-of-enum value without writing', async () => {
    const { ws, sent } = fakeWs();

    await handleSetSessionDefaults(ws, {
      id: 's4',
      type: 'set-session-defaults',
      payload: { values: { impl_dispatch: 'sideways' } }
    });

    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].ok).toBe(false);
    expect(sent[0].error.code).toBe('bad_request');
  });

  test('rejects a key outside the 12 contract keys without writing', async () => {
    const { ws, sent } = fakeWs();

    await handleSetSessionDefaults(ws, {
      id: 's5',
      type: 'set-session-defaults',
      payload: { values: { orchestration_model: 'opus' } }
    });

    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].error.code).toBe('bad_request');
  });

  test('accepts the auto literal for impl_model and impl_effort', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_model: 'auto', impl_effort: 'auto' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleSetSessionDefaults(ws, {
      id: 's6',
      type: 'set-session-defaults',
      payload: { values: { impl_model: 'auto', impl_effort: 'auto' } }
    });

    expect(sent[0].ok).toBe(true);
    expect(sent[0].payload.values).toEqual({
      impl_model: 'auto',
      impl_effort: 'auto'
    });
  });

  test('replies with an error when the kv write fails', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace.mockResolvedValue({ ok: true, value: { schema: 1 } });
    kvSetJsonInWorkspace.mockResolvedValue({
      ok: false,
      error: 'read-only db'
    });

    await handleSetSessionDefaults(ws, {
      id: 's7',
      type: 'set-session-defaults',
      payload: { values: { workflow_mode: 'standard' } }
    });

    expect(sent[0].ok).toBe(false);
    expect(sent[0].error.code).toBe('kv_write_failed');
  });

  test('replies with an error when the readback does not confirm the write', async () => {
    const { ws, sent } = fakeWs();
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleSetSessionDefaults(ws, {
      id: 's8',
      type: 'set-session-defaults',
      payload: { values: { workflow_mode: 'fast_track' } }
    });

    expect(sent[0].ok).toBe(false);
    expect(sent[0].error.code).toBe('kv_readback_failed');
  });
});
