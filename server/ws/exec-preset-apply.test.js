import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { EXEC_SETTING_KEYS } from '../worker/exec-enums.js';

const runBdInWorkspace = vi.fn();
const runBdJsonInWorkspace = vi.fn();
const triggerMutationRefreshOnce = vi.fn();

vi.mock('./context.js', () => ({
  runBdInWorkspace: (/** @type {any} */ ws, /** @type {string[]} */ args) =>
    runBdInWorkspace(ws, args),
  runBdJsonInWorkspace: (/** @type {any} */ ws, /** @type {string[]} */ args) =>
    runBdJsonInWorkspace(ws, args)
}));

vi.mock('./refresh.js', () => ({
  triggerMutationRefreshOnce: () => triggerMutationRefreshOnce()
}));

const {
  __resetExecPresetsForTest,
  buildApplyExecPresetArgs,
  handleApplyExecPreset,
  handleExecPresetCreate
} = await import('./exec-preset-handlers.js');

/** @type {string} */
let tmp_state;

/** @returns {{ ws: any, sent: any[] }} */
function fakeWs() {
  /** @type {any[]} */
  const sent = [];
  return {
    ws: {
      /** @param {string} message */
      send(message) {
        sent.push(JSON.parse(message));
      }
    },
    sent
  };
}

/**
 * @param {any} ws
 * @param {any[]} sent
 * @param {Record<string, string>} [settings]
 */
function seedPreset(ws, sent, settings = {}) {
  handleExecPresetCreate(ws, {
    id: 'create',
    type: 'exec-preset-create',
    payload: { expected_revision: 0, name: '프리셋', settings }
  });
  return sent[0].payload.presets[0].id;
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-apply-preset-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetExecPresetsForTest();
  runBdInWorkspace.mockReset();
  runBdJsonInWorkspace.mockReset();
  triggerMutationRefreshOnce.mockReset();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetExecPresetsForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('buildApplyExecPresetArgs', () => {
  test('replaces all 10 metadata keys in canonical order with one update argv', () => {
    const args = buildApplyExecPresetArgs('UI-1', {
      orchestration_model: 'sol',
      impl_effort: 'high'
    });

    expect(args).toEqual([
      'update',
      'UI-1',
      '--set-metadata',
      'orchestration_model=sol',
      '--unset-metadata',
      'orchestration_effort',
      '--unset-metadata',
      'spec_review_model',
      '--unset-metadata',
      'spec_review_effort',
      '--unset-metadata',
      'plan_review_model',
      '--unset-metadata',
      'plan_review_effort',
      '--unset-metadata',
      'impl_review_model',
      '--unset-metadata',
      'impl_review_effort',
      '--unset-metadata',
      'impl_model',
      '--set-metadata',
      'impl_effort=high'
    ]);
  });

  test('sets all 10 keys when the preset defines every value', () => {
    const settings = Object.fromEntries(
      EXEC_SETTING_KEYS.map((key) => [key, `${key}-value`])
    );

    const args = buildApplyExecPresetArgs('UI-1', settings);

    expect(args.filter((value) => value === '--set-metadata')).toHaveLength(10);
    expect(args).not.toContain('--unset-metadata');
  });
});

describe('handleApplyExecPreset', () => {
  test('applies one update, normalizes readback, and refreshes once', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent);
    sent.length = 0;
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonInWorkspace.mockResolvedValue({
      code: 0,
      stdoutJson: [{ id: 'UI-1', metadata: {} }]
    });

    await handleApplyExecPreset(ws, {
      id: 'apply',
      type: 'apply-exec-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(runBdInWorkspace).toHaveBeenCalledOnce();
    expect(runBdInWorkspace.mock.calls[0][1]).toEqual(
      buildApplyExecPresetArgs('UI-1', {})
    );
    expect(runBdJsonInWorkspace).toHaveBeenCalledWith(ws, [
      'show',
      'UI-1',
      '--json'
    ]);
    expect(triggerMutationRefreshOnce).toHaveBeenCalledOnce();
    expect(sent.at(-1)).toMatchObject({
      ok: true,
      payload: {
        applied: true,
        conflict: false,
        revision: 1,
        issue: { id: 'UI-1', metadata: {} }
      }
    });
  });

  test('returns a stale-revision conflict without calling bd', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent);
    sent.length = 0;

    await handleApplyExecPreset(ws, {
      id: 'apply',
      type: 'apply-exec-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 0 }
    });

    expect(sent[0].payload).toMatchObject({
      applied: false,
      conflict: true,
      revision: 1
    });
    expect(runBdInWorkspace).not.toHaveBeenCalled();
  });

  test('rejects a missing preset without calling bd', async () => {
    const { ws, sent } = fakeWs();

    await handleApplyExecPreset(ws, {
      id: 'apply',
      type: 'apply-exec-preset',
      payload: { id: 'UI-1', preset_id: 'missing', expected_revision: 0 }
    });

    expect(sent[0].error.code).toBe('exec_preset_missing');
    expect(runBdInWorkspace).not.toHaveBeenCalled();
  });

  test('rejects an incompatible loaded preset without calling bd', async () => {
    const file_path = path.join(tmp_state, 'bdui', 'exec-presets.json');
    fs.mkdirSync(path.dirname(file_path), { recursive: true });
    fs.writeFileSync(
      file_path,
      JSON.stringify({
        revision: 4,
        presets: [
          {
            id: 'legacy',
            name: '과거 모델',
            settings: { orchestration_model: 'removed-model' }
          }
        ]
      })
    );
    __resetExecPresetsForTest();
    const { ws, sent } = fakeWs();

    await handleApplyExecPreset(ws, {
      id: 'apply',
      type: 'apply-exec-preset',
      payload: {
        id: 'UI-1',
        preset_id: 'legacy',
        expected_revision: 4
      }
    });

    expect(sent[0].error.code).toBe('exec_preset_incompatible');
    expect(runBdInWorkspace).not.toHaveBeenCalled();
  });

  test('reports update failure without readback or refresh', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent);
    sent.length = 0;
    runBdInWorkspace.mockResolvedValue({ code: 1, stderr: 'update failed' });

    await handleApplyExecPreset(ws, {
      id: 'apply',
      type: 'apply-exec-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(sent[0].error.code).toBe('bd_update_failed');
    expect(runBdJsonInWorkspace).not.toHaveBeenCalled();
    expect(triggerMutationRefreshOnce).not.toHaveBeenCalled();
  });

  test('reports readback failure and requests one issue refresh', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent);
    sent.length = 0;
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonInWorkspace.mockResolvedValue({
      code: 1,
      stderr: 'readback failed'
    });

    await handleApplyExecPreset(ws, {
      id: 'apply',
      type: 'apply-exec-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(sent[0].error.code).toBe('bd_readback_failed');
    expect(triggerMutationRefreshOnce).toHaveBeenCalledOnce();
  });
});
