import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MESSAGE_TYPES } from '../../app/protocol.js';

const runBdInWorkspace = vi.fn();
const runBdJsonProjectedInWorkspace = vi.fn();
const triggerMutationRefreshOnce = vi.fn();
const kvGetJsonInWorkspace = vi.fn();
const kvSetJsonInWorkspace = vi.fn();
const fanoutWorkerQueue = vi.fn();

// The workspace effect gate has its own tests; these state an open gate rather
// than probing the live bd binary.
vi.mock('../bd-effect-gate.js', async (importOriginal) => {
  /** @type {any} */
  const actual = await importOriginal();
  return {
    ...actual,
    requireBdJsonCapabilityForWorkspace: async () => ({ ok: true })
  };
});

vi.mock('./context.js', () => ({
  getConnWorkspace: (/** @type {any} */ ws) => ws.workspace || null,
  readbackFailureDetail: (/** @type {string} */ reason) => ({
    phase: 'readback',
    write_applied: true,
    retry_safe: false,
    reason
  }),
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

vi.mock('./worker-handlers.js', () => ({
  decorateQueue: (
    /** @type {string} */ _workspace_key,
    /** @type {any} */ queue
  ) => queue,
  fanout: (/** @type {string} */ workspace_key, /** @type {any} */ queue) =>
    fanoutWorkerQueue(workspace_key, queue)
}));

const {
  __resetImplPresetsForTest,
  broadcastImplPresets,
  buildApplyImplPresetArgs,
  handleApplyImplPreset,
  handleApplyImplPresetGlobal,
  handleImplPresetCreate,
  handleSubscribeImplPresets
} = await import('./exec-preset-handlers.js');

/** @type {string} */
let tmp_state;

/** @returns {{ ws: any, sent: any[] }} */
function fakeWs() {
  /** @type {any[]} */
  const sent = [];
  return {
    ws: {
      workspace: { root_dir: '/workspace' },
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
  fanoutWorkerQueue.mockReset();
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

describe('broadcastImplPresets', () => {
  test('pushes the current snapshot to a subscriber with no client mutation', () => {
    const { ws, sent } = fakeWs();
    seedPreset(ws, sent, { impl_runtime: 'codex' });
    handleSubscribeImplPresets(ws, {
      id: 'sub',
      type: 'subscribe-impl-presets',
      payload: { id: 'client-1' }
    });
    const before = sent.length;

    broadcastImplPresets();

    const pushed = sent[sent.length - 1];
    expect(sent.length).toBe(before + 1);
    expect(pushed.payload.type).toBe('impl-presets-snapshot');
    expect(
      pushed.payload.presets.map((/** @type {any} */ p) => p.name)
    ).toEqual(['프리셋']);
  });
});

describe('buildApplyImplPresetArgs', () => {
  test('writes every session key in canonical order with one update argv', () => {
    const args = buildApplyImplPresetArgs('UI-1', {
      workflow_mode: 'fast_track',
      impl_dispatch: 'delegated',
      impl_effort: 'high',
      orchestration_model: 'sol'
    });

    const named = args
      .slice(2)
      .filter((_, index) => index % 2 === 1)
      .map((value) => value.split('=')[0]);
    expect(named).toEqual([
      'workflow_mode',
      'spec_review_model',
      'spec_review_effort',
      'plan_review_model',
      'plan_review_effort',
      'impl_review_model',
      'impl_review_effort',
      'impl_dispatch',
      'impl_runtime',
      'impl_model',
      'impl_effort',
      'impl_speed'
    ]);
    expect(args).toContain('workflow_mode=fast_track');
    expect(args).toContain('impl_dispatch=delegated');
    expect(args).toContain('impl_effort=high');
    expect(args.some((arg) => arg.includes('orchestration_'))).toBe(false);
  });

  test('names exactly the twelve session keys and no orchestration key', () => {
    const args = buildApplyImplPresetArgs('UI-1', {});

    const named = args.slice(2).filter((_, index) => index % 2 === 1);
    expect(named).toHaveLength(12);
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
    expect(reply.payload.skipped_orchestration_keys).toEqual([
      'orchestration_model',
      'orchestration_effort',
      'orchestration_speed'
    ]);
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

describe('handleApplyImplPresetGlobal (profile replacement path)', () => {
  test('replaces kv and queue values and publishes the updated queue', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      workflow_mode: 'fast_track',
      impl_runtime: 'codex',
      orchestration_model: 'sol'
    });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          spec_review_model: 'claude',
          impl_dispatch: 'delegated'
        }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          workflow_mode: 'fast_track',
          impl_runtime: 'codex'
        }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0
      }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workflow_session_defaults',
      {
        schema: 1,
        workflow_mode: 'fast_track',
        impl_runtime: 'codex'
      }
    );
    const reply = sent[sent.length - 1];
    expect(reply.payload).toMatchObject({
      applied: true,
      queue_applied: true,
      values: {
        workflow_mode: 'fast_track',
        impl_runtime: 'codex'
      },
      queue: {
        revision: 1,
        orchestration_model: 'sol',
        orchestration_effort: null,
        orchestration_speed: null
      }
    });
    expect(fanoutWorkerQueue).toHaveBeenCalledWith(
      '/workspace',
      expect.objectContaining({
        revision: 1,
        orchestration_model: 'sol',
        orchestration_effort: null,
        orchestration_speed: null
      })
    );
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
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0
      }
    });

    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workflow_session_defaults',
      { schema: 1, impl_dispatch: 'main' }
    );
  });

  test('clears a review session key the preset does not carry', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_dispatch: 'main' });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, spec_review_model: 'claude' }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_dispatch: 'main' }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0
      }
    });

    expect(kvSetJsonInWorkspace.mock.calls[0][2]).toEqual({
      schema: 1,
      impl_dispatch: 'main'
    });
  });

  test('keeps the kv apply when the queue revision conflicts', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_runtime: 'codex',
      orchestration_model: 'sol'
    });
    kvGetJsonInWorkspace.mockResolvedValue({
      ok: true,
      value: { schema: 1, impl_runtime: 'codex' }
    });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global-first',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0
      }
    });
    fanoutWorkerQueue.mockClear();

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global-conflict',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0
      }
    });

    const reply = sent[sent.length - 1];
    expect(reply.ok).toBe(true);
    expect(reply.payload).toMatchObject({
      applied: true,
      conflict: false,
      queue_applied: false,
      queue_conflict: true,
      values: { impl_runtime: 'codex' },
      queue: { revision: 1, orchestration_model: 'sol' }
    });
    expect(kvSetJsonInWorkspace).toHaveBeenCalledTimes(2);
    expect(fanoutWorkerQueue).not.toHaveBeenCalled();
  });

  test.each([
    [{ preset_id: 'preset', expected_queue_revision: 0 }],
    [{ preset_id: 'preset', expected_revision: 1 }],
    [
      {
        preset_id: 'preset',
        expected_revision: '1',
        expected_queue_revision: 0
      }
    ],
    [
      {
        preset_id: 'preset',
        expected_revision: 1,
        expected_queue_revision: '0'
      }
    ]
  ])('rejects missing or non-integer revisions: %j', async (payload) => {
    const { ws, sent } = fakeWs();

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload
    });

    expect(sent[sent.length - 1].error.code).toBe('bad_request');
    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
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
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0
      }
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
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0
      }
    });

    expect(sent[sent.length - 1].error.code).toBe('bd_readback_failed');
    expect(sent[sent.length - 1].error.details).toMatchObject({
      phase: 'readback',
      write_applied: true,
      retry_safe: false
    });
  });
});
