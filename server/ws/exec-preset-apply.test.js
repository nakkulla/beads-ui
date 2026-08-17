import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MESSAGE_TYPES } from '../../app/protocol.js';
import { IMPL_PRESET_KEYS } from '../worker/exec-enums.js';

const runBdInWorkspace = vi.fn();
const runBdJsonProjectedInWorkspace = vi.fn();
const triggerMutationRefreshOnce = vi.fn();
const kvGetJsonInWorkspace = vi.fn();
const kvSetJsonInWorkspace = vi.fn();

vi.mock('./context.js', () => ({
  runBdInWorkspace: (/** @type {any} */ ws, /** @type {string[]} */ args) =>
    runBdInWorkspace(ws, args),
  runBdJsonProjectedInWorkspace: (
    /** @type {any} */ ws,
    /** @type {string} */ command_family,
    /** @type {string[]} */ args,
    /** @type {any} */ options
  ) => runBdJsonProjectedInWorkspace(ws, command_family, args, options),
  kvGetJsonInWorkspace: (/** @type {any} */ ws, /** @type {any} */ key) =>
    kvGetJsonInWorkspace(ws, key),
  kvSetJsonInWorkspace: (
    /** @type {any} */ ws,
    /** @type {any} */ key,
    /** @type {any} */ value
  ) => kvSetJsonInWorkspace(ws, key, value)
}));

vi.mock('./refresh.js', () => ({
  triggerMutationRefreshOnce: () => triggerMutationRefreshOnce()
}));

const {
  __resetImplPresetsForTest,
  buildApplyImplPresetArgs,
  handleApplyImplPreset,
  handleApplyImplPresetGlobal,
  handleImplPresetCreate
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
  handleImplPresetCreate(ws, {
    id: 'create',
    type: 'impl-preset-create',
    payload: { expected_revision: 0, name: '프리셋', settings }
  });
  return sent[0].payload.presets[0].id;
}

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-apply-preset-'));
  process.env.XDG_STATE_HOME = tmp_state;
  __resetImplPresetsForTest();
  runBdInWorkspace.mockReset();
  runBdJsonProjectedInWorkspace.mockReset();
  triggerMutationRefreshOnce.mockReset();
  kvGetJsonInWorkspace.mockReset();
  kvSetJsonInWorkspace.mockReset();
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  __resetImplPresetsForTest();
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('retired 12-key preset protocol', () => {
  test.each([
    'exec-preset-create',
    'exec-preset-update',
    'exec-preset-delete',
    'apply-exec-preset',
    'subscribe-exec-presets',
    'unsubscribe-exec-presets',
    'worker-queue-set-default-exec-preset'
  ])('no longer accepts %s as a message type', (type) => {
    expect(MESSAGE_TYPES).not.toContain(type);
  });

  test('exposes no legacy 12-key handler from the preset channel', async () => {
    const handlers = await import('./exec-preset-handlers.js');

    expect(/** @type {any} */ (handlers).handleApplyExecPreset).toBeUndefined();
    expect(
      /** @type {any} */ (handlers).buildApplyExecPresetArgs
    ).toBeUndefined();
  });
});

describe('buildApplyImplPresetArgs', () => {
  test('writes every implementation key in canonical order with one update argv', () => {
    const args = buildApplyImplPresetArgs('UI-1', {
      impl_dispatch: 'delegated',
      impl_effort: 'high'
    });

    expect(args).toEqual([
      'update',
      'UI-1',
      '--set-metadata',
      'impl_dispatch=delegated',
      '--unset-metadata',
      'impl_runtime',
      '--unset-metadata',
      'impl_model',
      '--set-metadata',
      'impl_effort=high',
      '--unset-metadata',
      'impl_speed'
    ]);
  });

  test('names exactly the five implementation keys and no orchestration key', () => {
    const args = buildApplyImplPresetArgs('UI-1', {});

    const named = args.filter((arg) => arg.startsWith('impl_'));
    expect(named).toEqual([...IMPL_PRESET_KEYS]);
    expect(args.some((arg) => arg.includes('orchestration_'))).toBe(false);
  });
});

describe('handleApplyImplPreset (Bead metadata path)', () => {
  test('pins the preset onto the bead and replies with the readback issue', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_dispatch: 'delegated',
      impl_runtime: 'inherit'
    });
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonProjectedInWorkspace.mockResolvedValue({
      ok: true,
      protocol: { format: 'bare', schema_version: null },
      data: { id: 'UI-1', metadata: { impl_dispatch: 'delegated' } }
    });

    await handleApplyImplPreset(ws, {
      id: 'apply',
      type: 'apply-impl-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(runBdInWorkspace).toHaveBeenCalledWith(
      ws,
      buildApplyImplPresetArgs('UI-1', {
        impl_dispatch: 'delegated',
        impl_runtime: 'inherit'
      })
    );
    const reply = sent[sent.length - 1];
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.issue.id).toBe('UI-1');
  });

  test('reports a conflict without touching bd when the revision is stale', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_dispatch: 'main' });

    await handleApplyImplPreset(ws, {
      id: 'apply',
      type: 'apply-impl-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 0 }
    });

    expect(runBdInWorkspace).not.toHaveBeenCalled();
    expect(sent[sent.length - 1].payload.conflict).toBe(true);
  });

  test('errors when the preset id is unknown', async () => {
    const { ws, sent } = fakeWs();
    seedPreset(ws, sent, { impl_dispatch: 'main' });

    await handleApplyImplPreset(ws, {
      id: 'apply',
      type: 'apply-impl-preset',
      payload: { id: 'UI-1', preset_id: 'nope', expected_revision: 1 }
    });

    expect(sent[sent.length - 1].error.code).toBe('impl_preset_missing');
  });

  test('reports a bd update failure without claiming an apply', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_dispatch: 'main' });
    runBdInWorkspace.mockResolvedValue({ code: 1, stderr: 'bd exploded' });

    await handleApplyImplPreset(ws, {
      id: 'apply',
      type: 'apply-impl-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(sent[sent.length - 1].error.code).toBe('bd_update_failed');
  });
});

describe('handleApplyImplPresetGlobal (bd kv path)', () => {
  test('writes the five implementation keys into the kv session defaults', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_dispatch: 'delegated',
      impl_runtime: 'inherit',
      impl_model: 'auto'
    });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          impl_dispatch: 'delegated',
          impl_runtime: 'inherit',
          impl_model: 'auto'
        }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: { preset_id, expected_revision: 1 }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workflow_session_defaults',
      {
        schema: 1,
        impl_dispatch: 'delegated',
        impl_runtime: 'inherit',
        impl_model: 'auto'
      }
    );
    expect(sent[sent.length - 1].payload.applied).toBe(true);
  });

  test('clears a session key the preset does not carry', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_dispatch: 'main' });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_speed: 'fast' }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_dispatch: 'main' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: { preset_id, expected_revision: 1 }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workflow_session_defaults',
      { schema: 1, impl_dispatch: 'main' }
    );
  });

  test('leaves a non-implementation session key alone', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_dispatch: 'main' });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, workflow_mode: 'fast_track' }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, workflow_mode: 'fast_track', impl_dispatch: 'main' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: { preset_id, expected_revision: 1 }
    });

    expect(kvSetJsonInWorkspace.mock.calls[0][2]).toMatchObject({
      workflow_mode: 'fast_track'
    });
  });

  test('reports a kv write failure so the dialog can keep its edit state', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_dispatch: 'main' });
    kvGetJsonInWorkspace.mockResolvedValue({ ok: true, value: { schema: 1 } });
    kvSetJsonInWorkspace.mockResolvedValue({
      ok: false,
      error: 'read-only db'
    });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: { preset_id, expected_revision: 1 }
    });

    expect(sent[sent.length - 1].error.code).toBe('kv_write_failed');
  });

  test('reports a readback that does not confirm the write', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_dispatch: 'main' });
    kvGetJsonInWorkspace.mockResolvedValue({ ok: true, value: { schema: 1 } });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: { preset_id, expected_revision: 1 }
    });

    expect(sent[sent.length - 1].error.code).toBe('kv_readback_failed');
  });
});
