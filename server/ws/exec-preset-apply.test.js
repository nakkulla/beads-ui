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
const kvGetJsonAtRoot = vi.fn();
const kvSetJsonAtRoot = vi.fn();
const fanoutWorkerQueue = vi.fn();
const invalidateSessionDefaults = vi.fn();

vi.mock('../registry-watcher.js', async (importOriginal) => {
  const actual = /** @type {any} */ (await importOriginal());
  return {
    ...actual,
    getAvailableWorkspaces: () => [
      { path: '/workspace' },
      { path: '/other-repo' }
    ]
  };
});

vi.mock('./monitor-handlers.js', () => ({
  invalidateSessionDefaults: (/** @type {string} */ root) =>
    invalidateSessionDefaults(root)
}));

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
  ) => kvSetJsonInWorkspace(ws, key, value),
  kvGetJsonAtRoot: (/** @type {any} */ root, /** @type {any} */ key) =>
    kvGetJsonAtRoot(root, key),
  kvSetJsonAtRoot: (
    /** @type {any} */ root,
    /** @type {any} */ key,
    /** @type {any} */ value
  ) => kvSetJsonAtRoot(root, key, value)
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
  kvGetJsonAtRoot.mockReset();
  kvSetJsonAtRoot.mockReset();
  invalidateSessionDefaults.mockReset();
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
      'spec_review_speed',
      'plan_review_model',
      'plan_review_effort',
      'plan_review_speed',
      'impl_review_model',
      'impl_review_effort',
      'impl_review_speed',
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

  test('names exactly the fifteen session keys and no orchestration key', () => {
    const args = buildApplyImplPresetArgs('UI-1', {});

    const named = args.slice(2).filter((_, index) => index % 2 === 1);
    expect(named).toHaveLength(15);
    expect(args.some((arg) => arg.includes('orchestration_'))).toBe(false);
  });
});

describe('handleApplyImplPreset (Bead metadata path)', () => {
  test('pins the preset onto the bead and replies with the readback issue', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      spec_review_speed: 'fast',
      impl_dispatch: 'delegated',
      impl_runtime: 'inherit'
    });
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonProjectedInWorkspace.mockResolvedValue({
      ok: true,
      protocol: { format: 'bare', schema_version: null },
      data: {
        id: 'UI-1',
        metadata: {
          spec_review_speed: 'fast',
          impl_dispatch: 'delegated'
        }
      }
    });

    await handleApplyImplPreset(ws, {
      id: 'apply',
      type: 'apply-impl-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(runBdInWorkspace).toHaveBeenCalledWith(
      ws,
      buildApplyImplPresetArgs('UI-1', {
        spec_review_speed: 'fast',
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

    // `impl_dispatch` is not a kv key (UI-bu6d §6), so the writer neither
    // stores nor clears one a previous version left behind — and the readback
    // below drops it rather than reporting it as a workspace default.
    expect(kvSetJsonInWorkspace).toHaveBeenCalledWith(
      ws,
      'workflow_session_defaults',
      {
        schema: 1,
        impl_dispatch: 'delegated',
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
    expect(reply.payload).not.toHaveProperty('lane');
    expect(reply.payload).not.toHaveProperty('skipped_keys');
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

  test('keeps an omitted lane byte-identical to explicit general', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_runtime: 'codex',
      orchestration_model: 'sol'
    });
    const kv_value = { schema: 1, impl_runtime: 'codex' };
    kvGetJsonInWorkspace.mockResolvedValue({ ok: true, value: kv_value });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });
    kvGetJsonAtRoot.mockResolvedValue({ ok: true, value: kv_value });
    kvSetJsonAtRoot.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-absent-lane',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0
      }
    });
    const absent_payload = sent[sent.length - 1].payload;

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-general-lane',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0,
        lane: 'general',
        root_dir: '/other-repo'
      }
    });
    const general_payload = sent[sent.length - 1].payload;

    expect(JSON.stringify(absent_payload)).toBe(
      JSON.stringify(general_payload)
    );
    expect(absent_payload).not.toHaveProperty('lane');
  });

  test('clears a session key the preset does not carry', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_runtime: 'codex' });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_speed: 'fast' }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_runtime: 'codex' }
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
      { schema: 1, impl_runtime: 'codex' }
    );
  });

  test('never writes impl_dispatch into the workspace kv layer', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_dispatch: 'main',
      impl_runtime: 'codex'
    });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_runtime: 'codex' }
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
      impl_runtime: 'codex'
    });
  });

  test('preserves the kv-only quick_fix_impl_model across a workspace apply', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_runtime: 'codex' });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, quick_fix_impl_model: 'terra' }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          quick_fix_impl_model: 'terra',
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

    expect(kvSetJsonInWorkspace.mock.calls[0][2]).toEqual({
      schema: 1,
      quick_fix_impl_model: 'terra',
      impl_runtime: 'codex'
    });
  });

  test('clears a review session key the preset does not carry', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_speed: 'fast' });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, spec_review_model: 'claude' }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_speed: 'fast' }
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
      impl_speed: 'fast'
    });
  });

  test('maps a quick_fix lane onto its disjoint kv and queue profiles', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      workflow_mode: 'fast_track',
      spec_review_model: 'codex',
      impl_dispatch: 'delegated',
      impl_runtime: 'codex',
      impl_model: 'sol',
      impl_effort: 'auto',
      impl_speed: 'fast',
      orchestration_model: 'opus',
      orchestration_effort: 'high',
      orchestration_speed: 'default'
    });
    const readback = {
      schema: 1,
      impl_runtime: 'claude',
      bdui_url: 'http://host:3000',
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_runtime: 'codex',
      quick_fix_impl_model: 'sol',
      quick_fix_impl_effort: 'auto',
      quick_fix_impl_speed: 'fast'
    };
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          impl_runtime: 'claude',
          bdui_url: 'http://host:3000',
          quick_fix_impl_dispatch: 'main',
          quick_fix_impl_model: 'terra'
        }
      })
      .mockResolvedValueOnce({ ok: true, value: readback });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-quick-fix',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0,
        lane: 'quick_fix'
      }
    });

    expect(kvSetJsonInWorkspace.mock.calls[0][2]).toEqual(readback);
    const reply = sent[sent.length - 1];
    expect(reply.payload).toMatchObject({
      lane: 'quick_fix',
      skipped_keys: ['workflow_mode', 'spec_review_model'],
      warnings: [],
      queue_applied: true,
      values: {
        impl_runtime: 'claude',
        quick_fix_impl_dispatch: 'delegated',
        quick_fix_impl_runtime: 'codex',
        quick_fix_impl_model: 'sol',
        quick_fix_impl_effort: 'auto',
        quick_fix_impl_speed: 'fast'
      },
      queue: {
        revision: 1,
        quick_fix_orchestration_model: 'opus',
        quick_fix_orchestration_effort: 'high',
        quick_fix_orchestration_speed: 'default'
      }
    });
  });

  test('unsets lane-incompatible and absent quick_fix values with warnings', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_dispatch: 'delegated',
      impl_runtime: 'inherit',
      impl_model: 'auto',
      impl_effort: 'auto'
    });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          quick_fix_impl_runtime: 'claude',
          quick_fix_impl_model: 'opus',
          quick_fix_impl_speed: 'fast'
        }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          quick_fix_impl_dispatch: 'delegated',
          quick_fix_impl_effort: 'auto'
        }
      });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-incompatible',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0,
        lane: 'quick_fix'
      }
    });

    expect(kvSetJsonInWorkspace.mock.calls[0][2]).toEqual({
      schema: 1,
      quick_fix_impl_dispatch: 'delegated',
      quick_fix_impl_effort: 'auto'
    });
    expect(sent[sent.length - 1].payload).toMatchObject({
      lane: 'quick_fix',
      warnings: [
        'lane_incompatible:quick_fix_impl_runtime',
        'lane_incompatible:quick_fix_impl_model'
      ],
      skipped_keys: [],
      queue_applied: true,
      queue: {
        quick_fix_orchestration_model: null,
        quick_fix_orchestration_effort: null,
        quick_fix_orchestration_speed: null
      }
    });
  });

  test('keeps a quick_fix kv apply when the queue revision conflicts', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_model: 'sol',
      orchestration_model: 'sol'
    });
    kvGetJsonInWorkspace.mockResolvedValue({
      ok: true,
      value: { schema: 1, quick_fix_impl_model: 'sol' }
    });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });
    const payload = {
      preset_id,
      expected_revision: 1,
      expected_queue_revision: 0,
      lane: 'quick_fix'
    };
    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-quick-first',
      type: 'apply-impl-preset-global',
      payload
    });
    fanoutWorkerQueue.mockClear();

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-quick-conflict',
      type: 'apply-impl-preset-global',
      payload
    });

    expect(sent[sent.length - 1].payload).toMatchObject({
      lane: 'quick_fix',
      queue_applied: false,
      queue_conflict: true,
      values: { quick_fix_impl_model: 'sol' },
      queue: { revision: 1, quick_fix_orchestration_model: 'sol' }
    });
    expect(kvSetJsonInWorkspace).toHaveBeenCalledTimes(2);
    expect(fanoutWorkerQueue).not.toHaveBeenCalled();
  });

  test('rejects an unknown lane before touching kv', async () => {
    const { ws, sent } = fakeWs();

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-unknown-lane',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id: 'preset',
        expected_revision: 1,
        expected_queue_revision: 0,
        lane: 'review'
      }
    });

    expect(sent[sent.length - 1].error.code).toBe('bad_request');
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
  });

  test('returns the quick_fix lane on a preset revision conflict', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_model: 'sol' });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-quick-conflict',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 0,
        expected_queue_revision: 0,
        lane: 'quick_fix'
      }
    });

    expect(sent[sent.length - 1].payload).toMatchObject({
      applied: false,
      conflict: true,
      revision: 1,
      lane: 'quick_fix'
    });
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
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
    const preset_id = seedPreset(ws, sent, { impl_speed: 'fast' });
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

describe('handleApplyImplPresetGlobal root_dir kv scope (UI-eey2 §9.5)', () => {
  test('reads, writes and reads back the kv of the NAMED repo only', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_runtime: 'codex' });
    kvGetJsonAtRoot
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_runtime: 'codex' }
      });
    kvSetJsonAtRoot.mockResolvedValue({ ok: true });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0,
        root_dir: '/other-repo'
      }
    });

    expect(kvGetJsonAtRoot.mock.calls.map((c) => c[0])).toEqual([
      '/other-repo',
      '/other-repo'
    ]);
    expect(kvSetJsonAtRoot).toHaveBeenCalledWith(
      '/other-repo',
      'workflow_session_defaults',
      { schema: 1, impl_runtime: 'codex' }
    );
    // The CONNECTED repo's kv is never touched.
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
    expect(fanoutWorkerQueue).toHaveBeenCalledWith(
      '/other-repo',
      expect.anything()
    );
    expect(invalidateSessionDefaults).toHaveBeenCalledWith('/other-repo');
  });

  test('keeps the connection-addressed kv path when no root_dir is named', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_runtime: 'codex' });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
      .mockResolvedValueOnce({
        ok: true,
        value: { schema: 1, impl_runtime: 'codex' }
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

    expect(kvGetJsonAtRoot).not.toHaveBeenCalled();
    expect(kvSetJsonAtRoot).not.toHaveBeenCalled();
    expect(kvSetJsonInWorkspace).toHaveBeenCalled();
    expect(invalidateSessionDefaults).toHaveBeenCalledWith('/workspace');
  });

  test('refuses an unregistered root_dir before touching any kv', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, { impl_runtime: 'codex' });

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-global',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 0,
        root_dir: '/not-registered'
      }
    });

    expect(sent[sent.length - 1].error.code).toBe('bad_request');
    expect(kvGetJsonAtRoot).not.toHaveBeenCalled();
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
  });
});
