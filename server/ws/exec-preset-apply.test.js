import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { MESSAGE_TYPES } from '../../app/protocol.js';
import { getWorkerRuntime } from '../worker/runtime.js';

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
  handleImplPresetUpdate,
  handleImplPresetDelete,
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

describe('global preset identity recording', () => {
  /** @param {Record<string, string>} [settings] */
  function appliedFixture(
    settings = { impl_runtime: 'codex', orchestration_model: 'sol' }
  ) {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, settings);
    const store = getWorkerRuntime().queueStore;
    const applied_exec_preset = {
      id: preset_id,
      name: '프리셋',
      revision: 1,
      applied_at: 10
    };
    store.setOrchestrationDefaults('/workspace', {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet' },
      applied_exec_preset
    });
    kvGetJsonInWorkspace.mockResolvedValue({
      ok: true,
      value: { schema: 1, impl_runtime: 'codex' }
    });
    kvSetJsonInWorkspace.mockResolvedValue({ ok: true });
    const req = {
      id: 'global',
      type: /** @type {const} */ ('apply-impl-preset-global'),
      payload: {
        preset_id,
        expected_revision: 1,
        expected_queue_revision: 1
      }
    };
    return { ws, sent, store, preset_id, applied_exec_preset, req };
  }

  test('clears identity before kv and commits new identity with queue settings', async () => {
    const { ws, store, preset_id, req } = appliedFixture();
    kvSetJsonInWorkspace.mockImplementation(async () => {
      expect(store.snapshot('/workspace')).toMatchObject({
        revision: 2,
        applied_exec_preset: null,
        orchestration_model: 'sonnet'
      });
      return { ok: true };
    });

    await handleApplyImplPresetGlobal(ws, req);

    expect(store.snapshot('/workspace')).toMatchObject({
      revision: 3,
      orchestration_model: 'sol',
      applied_exec_preset: {
        id: preset_id,
        name: '프리셋',
        revision: 1,
        applied_at: expect.any(Number)
      }
    });
  });

  test.each(['write', 'readback', 'mismatch', 'queue', 'conflict'])(
    'leaves identity null after the %s step fails',
    async (failure) => {
      const { ws, store, req } = appliedFixture();
      if (failure === 'write') {
        kvSetJsonInWorkspace.mockResolvedValue({ ok: false, error: 'failed' });
      } else if (failure === 'readback' || failure === 'mismatch') {
        kvGetJsonInWorkspace
          .mockReset()
          .mockResolvedValueOnce({ ok: true, value: { schema: 1 } })
          .mockResolvedValueOnce(
            failure === 'readback'
              ? { ok: false, error: 'failed' }
              : { ok: true, value: { schema: 1 } }
          );
      } else if (failure === 'queue') {
        vi.spyOn(store, 'setOrchestrationDefaults').mockImplementationOnce(
          () => {
            throw new Error('disk full');
          }
        );
      } else {
        kvSetJsonInWorkspace.mockImplementation(async () => {
          store.setOrchestrationDefaults('/workspace', {
            expected_revision: store.snapshot('/workspace').revision,
            values: { orchestration_effort: 'high' }
          });
          return { ok: true };
        });
      }

      await handleApplyImplPresetGlobal(ws, req);

      expect(store.snapshot('/workspace').applied_exec_preset).toBeNull();
    }
  );

  test('rejects a concurrent apply before kv when both start with null identity', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_runtime: 'codex',
      orchestration_model: 'sol'
    });
    const runtime = getWorkerRuntime();
    const created = runtime.execPresetCoordinator.create({
      expected_revision: 1,
      name: 'Other',
      settings: { impl_runtime: 'claude', orchestration_model: 'sonnet' }
    });
    const other_id = created.presets.find(
      (preset) => preset.id !== preset_id
    )?.id;
    /** @type {Record<string, unknown>} */
    let kv_values = { schema: 1 };
    kvGetJsonInWorkspace.mockImplementation(async () => ({
      ok: true,
      value: kv_values
    }));
    kvSetJsonInWorkspace.mockImplementation(async (_ws, _key, value) => {
      kv_values = value;
      return { ok: true };
    });

    await Promise.all([
      handleApplyImplPresetGlobal(ws, {
        id: 'first',
        type: 'apply-impl-preset-global',
        payload: { preset_id, expected_revision: 2, expected_queue_revision: 0 }
      }),
      handleApplyImplPresetGlobal(ws, {
        id: 'second',
        type: 'apply-impl-preset-global',
        payload: {
          preset_id: other_id,
          expected_revision: 2,
          expected_queue_revision: 0
        }
      })
    ]);

    expect(kvSetJsonInWorkspace).toHaveBeenCalledTimes(1);
    expect(kv_values).toEqual({ schema: 1, impl_runtime: 'codex' });
    expect(sent.find((reply) => reply.id === 'second').payload).toMatchObject({
      applied: false,
      queue_conflict: true
    });
    expect(runtime.queueStore.snapshot('/workspace')).toMatchObject({
      revision: 2,
      orchestration_model: 'sol',
      applied_exec_preset: { id: preset_id }
    });
  });

  test('keeps empty queue revisions when updating an unapplied preset', () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent);
    const store = getWorkerRuntime().queueStore;
    const clearAppliedExecPreset = vi.spyOn(store, 'clearAppliedExecPreset');

    handleImplPresetUpdate(ws, {
      id: 'update',
      type: 'impl-preset-update',
      payload: {
        id: preset_id,
        expected_revision: 1,
        name: 'Renamed',
        settings: {}
      }
    });

    expect(sent.at(-1).payload.applied).toBe(true);
    expect(clearAppliedExecPreset).not.toHaveBeenCalled();
    expect(store.snapshot('/workspace').revision).toBe(0);
    expect(store.snapshot('/other-repo').revision).toBe(0);
  });

  test('preserves identity and kv when the first clear conflicts', async () => {
    const { ws, sent, store, applied_exec_preset, req } = appliedFixture();
    req.payload.expected_queue_revision = 0;

    await handleApplyImplPresetGlobal(ws, req);

    expect(kvSetJsonInWorkspace).not.toHaveBeenCalled();
    expect(sent.at(-1).payload).toMatchObject({
      queue_applied: false,
      queue_conflict: true
    });
    expect(store.snapshot('/workspace').applied_exec_preset).toEqual(
      applied_exec_preset
    );
  });

  test('preserves global identity when applying a preset to one bead', async () => {
    const { ws, sent, store, preset_id, applied_exec_preset } = appliedFixture({
      impl_runtime: 'codex'
    });
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });
    runBdJsonProjectedInWorkspace.mockResolvedValue({
      ok: true,
      data: { id: 'UI-one', metadata: { impl_runtime: 'codex' } }
    });

    await handleApplyImplPreset(ws, {
      id: 'one',
      type: 'apply-impl-preset',
      payload: { id: 'UI-one', preset_id, expected_revision: 1 }
    });

    expect(sent.at(-1).ok).toBe(true);
    expect(store.snapshot('/workspace').applied_exec_preset).toEqual(
      applied_exec_preset
    );
  });

  test.each(['settings', 'name', 'same', 'other', 'delete'])(
    'invalidates only an actual applied preset update: %s',
    (change) => {
      const { ws, store, preset_id, applied_exec_preset } = appliedFixture();
      store.setOrchestrationDefaults('/other-repo', {
        expected_revision: 0,
        values: { orchestration_model: 'sol' },
        applied_exec_preset
      });
      let id = preset_id;
      let revision = 1;
      if (change === 'other') {
        const created = getWorkerRuntime().execPresetCoordinator.create({
          expected_revision: revision,
          name: 'Other',
          settings: {}
        });
        const other = created.presets.find((preset) => preset.id !== preset_id);
        if (!other) {
          throw new Error('Missing test preset');
        }
        id = other.id;
        revision = created.revision;
      }

      if (change === 'delete') {
        handleImplPresetDelete(ws, {
          id: 'delete',
          type: 'impl-preset-delete',
          payload: { id, expected_revision: revision }
        });
      } else {
        handleImplPresetUpdate(ws, {
          id: 'update',
          type: 'impl-preset-update',
          payload: {
            id,
            expected_revision: revision,
            name:
              change === 'name' || change === 'other' ? 'Renamed' : '프리셋',
            settings: {
              impl_runtime: change === 'settings' ? 'claude' : 'codex',
              orchestration_model: 'sol'
            }
          }
        });
      }

      const expected =
        change === 'settings' || change === 'name' ? null : applied_exec_preset;
      expect(store.snapshot('/workspace').applied_exec_preset).toEqual(
        expected
      );
      expect(store.snapshot('/other-repo').applied_exec_preset).toEqual(
        expected
      );
    }
  );
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
  test('writes every pin key in canonical order with one update argv', () => {
    const args = buildApplyImplPresetArgs('UI-1', {
      impl_dispatch: 'delegated',
      impl_effort: 'high',
      orchestration_model: 'sol'
    });

    const named = args
      .slice(2)
      .filter((_, index) => index % 2 === 1)
      .map((value) => value.split('=')[0]);
    expect(named).toEqual([
      'orchestration_model',
      'orchestration_effort',
      'orchestration_speed',
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
    expect(args).toContain('impl_dispatch=delegated');
    expect(args).toContain('impl_effort=high');
    expect(args.slice(2, 8)).toEqual([
      '--set-metadata',
      'orchestration_model=sol',
      '--unset-metadata',
      'orchestration_effort',
      '--unset-metadata',
      'orchestration_speed'
    ]);
  });

  test('unsets exactly the 17 pin keys for an empty preset', () => {
    const args = buildApplyImplPresetArgs('UI-1', {});

    const named = args.slice(2).filter((_, index) => index % 2 === 1);
    expect(named).toHaveLength(17);
    expect(named).not.toContain('workflow_mode');
    expect(named.slice(0, 3)).toEqual([
      'orchestration_model',
      'orchestration_effort',
      'orchestration_speed'
    ]);
    expect(args.slice(2).filter((_, index) => index % 2 === 0)).toEqual(
      Array(17).fill('--unset-metadata')
    );
  });
});

describe('handleApplyImplPreset (Bead metadata path)', () => {
  test.each([undefined, 'spec_backed', 'full_plan'])(
    'replaces general orchestration pins for route %s',
    async (route) => {
      const { ws, sent } = fakeWs();
      const preset_id = seedPreset(ws, sent, {
        orchestration_model: 'astra',
        orchestration_effort: 'ultra',
        quick_fix_orchestration_model: 'opus',
        quick_fix_orchestration_effort: 'high',
        quick_fix_orchestration_speed: 'default'
      });
      runBdJsonProjectedInWorkspace.mockResolvedValue({
        ok: true,
        data: {
          id: 'UI-1',
          metadata: {
            route,
            orchestration_model: 'sol',
            orchestration_speed: 'fast'
          }
        }
      });
      runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });

      await handleApplyImplPreset(ws, {
        id: 'apply',
        type: 'apply-impl-preset',
        payload: { id: 'UI-1', preset_id, expected_revision: 1 }
      });

      const args = runBdInWorkspace.mock.calls[0][1];
      expect(args.slice(2, 8)).toEqual([
        '--set-metadata',
        'orchestration_model=astra',
        '--set-metadata',
        'orchestration_effort=ultra',
        '--unset-metadata',
        'orchestration_speed'
      ]);
      expect(
        args.some((/** @type {string} */ arg) => arg.includes('quick_fix_'))
      ).toBe(false);
    }
  );

  test.each([
    [
      {
        quick_fix_orchestration_model: 'sol',
        quick_fix_orchestration_effort: 'ultra',
        quick_fix_orchestration_speed: 'fast'
      },
      ['sol', 'ultra', 'fast']
    ],
    [
      { quick_fix_orchestration_effort: 'medium' },
      ['astra', 'medium', 'default']
    ]
  ])(
    'projects quick_fix orchestration overrides %j onto canonical pins',
    async (overrides, expected) => {
      const { ws, sent } = fakeWs();
      const preset_id = seedPreset(ws, sent, {
        orchestration_model: 'astra',
        orchestration_effort: 'high',
        orchestration_speed: 'default',
        ...overrides
      });
      runBdJsonProjectedInWorkspace.mockResolvedValue({
        ok: true,
        data: { id: 'UI-1', metadata: { route: 'quick_fix' } }
      });
      runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });

      await handleApplyImplPreset(ws, {
        id: 'apply',
        type: 'apply-impl-preset',
        payload: { id: 'UI-1', preset_id, expected_revision: 1 }
      });

      const args = runBdInWorkspace.mock.calls[0][1];
      expect(args.slice(2, 8)).toEqual([
        '--set-metadata',
        `orchestration_model=${expected[0]}`,
        '--set-metadata',
        `orchestration_effort=${expected[1]}`,
        '--set-metadata',
        `orchestration_speed=${expected[2]}`
      ]);
      expect(
        args.some((/** @type {string} */ arg) => arg.includes('quick_fix_'))
      ).toBe(false);
    }
  );

  test.each([
    [
      'quick_fix',
      { orchestration_model: 'opus', quick_fix_orchestration_effort: 'ultra' },
      'invalid_orchestration_effort'
    ],
    [
      'quick_fix',
      {
        orchestration_model: 'astra',
        orchestration_speed: 'fast',
        quick_fix_orchestration_model: 'opus'
      },
      'invalid_orchestration_speed'
    ],
    [
      'spec_backed',
      { orchestration_model: 'opus', orchestration_effort: 'ultra' },
      'invalid_orchestration_effort'
    ],
    [
      'full_plan',
      { orchestration_model: 'opus', orchestration_speed: 'fast' },
      'invalid_orchestration_speed'
    ]
  ])(
    'rejects incompatible %s orchestration projection %j before writing',
    async (route, settings, reason) => {
      const { ws, sent } = fakeWs();
      const preset_id = seedPreset(ws, sent, settings);
      runBdJsonProjectedInWorkspace.mockResolvedValue({
        ok: true,
        data: { id: 'UI-1', metadata: { route } }
      });

      await handleApplyImplPreset(ws, {
        id: 'apply',
        type: 'apply-impl-preset',
        payload: { id: 'UI-1', preset_id, expected_revision: 1 }
      });

      expect(sent[sent.length - 1].error.code).toBe('impl_preset_incompatible');
      expect(sent[sent.length - 1].error.message).toContain(reason);
      expect(runBdInWorkspace).not.toHaveBeenCalled();
    }
  );

  test('pins the preset onto the bead and replies with the readback issue', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      spec_review_speed: 'fast',
      impl_dispatch: 'delegated',
      impl_runtime: 'auto'
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
        impl_runtime: 'auto'
      })
    );
    const reply = sent[sent.length - 1];
    expect(reply.ok).toBe(true);
    expect(reply.payload.applied).toBe(true);
    expect(reply.payload.issue.id).toBe('UI-1');
    expect(reply.payload).not.toHaveProperty('skipped_orchestration_keys');
    expect(Object.keys(reply.payload).sort()).toEqual([
      'applied',
      'conflict',
      'issue',
      'revision'
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
    runBdJsonProjectedInWorkspace.mockResolvedValue({
      ok: true,
      data: { id: 'UI-1', metadata: {} }
    });
    runBdInWorkspace.mockResolvedValue({ code: 1, stderr: 'bd exploded' });

    await handleApplyImplPreset(ws, {
      id: 'apply',
      type: 'apply-impl-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(sent[sent.length - 1].error.code).toBe('bd_update_failed');
  });

  test('maps quick_fix preset values onto a quick_fix issue pin', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_runtime: 'claude',
      impl_model: 'opus',
      impl_effort: 'high',
      quick_fix_impl_model: 'sol'
    });
    runBdJsonProjectedInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        data: { id: 'UI-1', metadata: { route: 'quick_fix' } }
      })
      .mockResolvedValueOnce({ ok: true, data: { id: 'UI-1' } });
    runBdInWorkspace.mockResolvedValue({ code: 0, stderr: '' });

    await handleApplyImplPreset(ws, {
      id: 'apply',
      type: 'apply-impl-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(runBdInWorkspace).toHaveBeenCalledWith(
      ws,
      buildApplyImplPresetArgs('UI-1', {
        impl_runtime: 'codex',
        impl_model: 'sol',
        impl_effort: 'high'
      })
    );
  });

  test('rejects an incompatible quick_fix issue pin', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_runtime: 'codex',
      impl_model: 'astra',
      impl_effort: 'max',
      quick_fix_impl_model: 'sol'
    });
    runBdJsonProjectedInWorkspace.mockResolvedValue({
      ok: true,
      data: { id: 'UI-1', metadata: { route: 'quick_fix' } }
    });

    await handleApplyImplPreset(ws, {
      id: 'apply',
      type: 'apply-impl-preset',
      payload: { id: 'UI-1', preset_id, expected_revision: 1 }
    });

    expect(sent[sent.length - 1].error.code).toBe('impl_preset_incompatible');
    expect(sent[sent.length - 1].error.message).toContain(
      'illegal_impl_effort'
    );
    expect(runBdInWorkspace).not.toHaveBeenCalled();
  });
});

describe('handleApplyImplPresetGlobal (profile replacement path)', () => {
  test('replaces kv and queue values and publishes the updated queue', async () => {
    const { ws, sent } = fakeWs();
    const preset_id = seedPreset(ws, sent, {
      impl_runtime: 'codex',
      quick_fix_impl_runtime: 'codex',
      quick_fix_impl_model: 'sol',
      orchestration_model: 'sol',
      quick_fix_orchestration_model: 'opus'
    });
    kvGetJsonInWorkspace
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          workflow_mode: 'fast_track',
          spec_review_model: 'claude',
          impl_dispatch: 'delegated',
          quick_fix_impl_model: 'terra'
        }
      })
      .mockResolvedValueOnce({
        ok: true,
        value: {
          schema: 1,
          workflow_mode: 'fast_track',
          impl_runtime: 'codex',
          quick_fix_impl_runtime: 'codex',
          quick_fix_impl_model: 'sol'
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
        impl_runtime: 'codex',
        quick_fix_impl_runtime: 'codex',
        quick_fix_impl_model: 'sol'
      }
    );
    const reply = sent[sent.length - 1];
    expect(reply.payload).toMatchObject({
      applied: true,
      queue_applied: true,
      values: {
        workflow_mode: 'fast_track',
        impl_runtime: 'codex',
        quick_fix_impl_runtime: 'codex',
        quick_fix_impl_model: 'sol'
      },
      queue: {
        revision: 2,
        orchestration_model: 'sol',
        orchestration_effort: null,
        orchestration_speed: null,
        quick_fix_orchestration_model: 'opus',
        quick_fix_orchestration_effort: null,
        quick_fix_orchestration_speed: null
      }
    });
    expect(reply.payload).not.toHaveProperty('lane');
    expect(reply.payload).not.toHaveProperty('skipped_keys');
    expect(fanoutWorkerQueue).toHaveBeenCalledWith(
      '/workspace',
      expect.objectContaining({
        revision: 2,
        orchestration_model: 'sol',
        orchestration_effort: null,
        orchestration_speed: null,
        quick_fix_orchestration_model: 'opus',
        quick_fix_orchestration_effort: null,
        quick_fix_orchestration_speed: null
      })
    );
  });

  test('rejects a lane payload before touching kv', async () => {
    const { ws, sent } = fakeWs();

    await handleApplyImplPresetGlobal(ws, {
      id: 'apply-with-lane',
      type: 'apply-impl-preset-global',
      payload: {
        preset_id: 'preset',
        expected_revision: 1,
        expected_queue_revision: 0,
        lane: 'general'
      }
    });

    expect(sent[sent.length - 1].error.code).toBe('bad_request');
    expect(kvGetJsonInWorkspace).not.toHaveBeenCalled();
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

  test('unsets an absent quick_fix key during workspace apply', async () => {
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

  test('refuses the kv apply when the initial queue revision conflicts', async () => {
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
      applied: false,
      conflict: false,
      queue_applied: false,
      queue_conflict: true,
      values: { impl_runtime: 'codex' },
      queue: { revision: 2, orchestration_model: 'sol' }
    });
    expect(kvSetJsonInWorkspace).toHaveBeenCalledTimes(1);
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
