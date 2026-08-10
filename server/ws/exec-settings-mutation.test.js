import { beforeEach, describe, expect, test, vi } from 'vitest';

// Capture the argv passed to the bd runner.
const runBdInWorkspace = vi.fn();
const runBdJsonInWorkspace = vi.fn();

vi.mock('./context.js', () => ({
  runBdInWorkspace: (/** @type {any} */ ws, /** @type {any} */ args) =>
    runBdInWorkspace(ws, args),
  runBdJsonInWorkspace: (/** @type {any} */ ws, /** @type {any} */ args) =>
    runBdJsonInWorkspace(ws, args),
  getGitUserNameInWorkspace: () => Promise.resolve(''),
  log: () => {}
}));

vi.mock('./refresh.js', () => ({
  triggerMutationRefreshOnce: () => {}
}));

const { buildExecSettingsArgs, handleUpdateExecSettings } =
  await import('./mutation-handlers.js');

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

  test('workflow_mode=standard produces --unset-metadata (never stores literal)', () => {
    expect(buildExecSettingsArgs('UI-1', 'workflow_mode', 'standard')).toEqual([
      'update',
      'UI-1',
      '--unset-metadata',
      'workflow_mode'
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
    runBdJsonInWorkspace.mockReset();
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonInWorkspace.mockResolvedValue({
      code: 0,
      stdoutJson: { id: 'UI-1', metadata: {} }
    });
  });

  test('standard workflow_mode calls bd with --unset-metadata (argv capture)', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r1',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'workflow_mode', value: 'standard' }
    });
    expect(runBdInWorkspace).toHaveBeenCalledWith(ws, [
      'update',
      'UI-1',
      '--unset-metadata',
      'workflow_mode'
    ]);
    expect(sent[0].ok).toBe(true);
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

  test('rejects a model-only implementation write before calling bd', async () => {
    const { ws, sent } = fakeWs();
    await handleUpdateExecSettings(ws, {
      id: 'r3d',
      type: 'update-exec-settings',
      payload: { id: 'UI-1', key: 'impl_model', value: 'terra' }
    });

    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[0].error.message).toContain('impl_runtime_required');
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
