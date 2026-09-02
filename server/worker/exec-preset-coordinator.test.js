import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createExecPresetStore } from '../exec-preset-store.js';
import { createExecPresetCoordinator } from './exec-preset-coordinator.js';
import { createQueueStore } from './queue-store.js';

/** @type {string} */
let tmp_dir;
const WORKSPACE = '/tmp/coordinator-workspace';
const RESEED_PRESETS = [
  {
    name: '클로드 라인',
    settings: { orchestration_model: 'opus', impl_runtime: 'claude' }
  },
  {
    name: '클로드 오케 + 코덱스 구현',
    settings: { orchestration_model: 'opus', impl_runtime: 'codex' }
  },
  {
    name: '코덱스 라인',
    settings: {
      orchestration_model: 'sol',
      orchestration_effort: 'xhigh',
      impl_runtime: 'codex'
    }
  }
];

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-coordinator-'));
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

/**
 * Build a coordinator over real queue + preset stores plus an in-memory kv.
 *
 * @param {{ queue?: Record<string, unknown>, preset?: Record<string, unknown>, kv?: Record<string, unknown>, kvFailOn?: 'read'|'write'|null, randomUUID?: () => string, warn?: (message: string) => void }} [options]
 */
function createFixture(options = {}) {
  const queue_file = path.join(tmp_dir, 'queue.json');
  const preset_file = path.join(tmp_dir, 'exec-presets.json');
  if (options.queue) {
    fs.writeFileSync(queue_file, JSON.stringify(options.queue));
  }
  if (options.preset) {
    fs.writeFileSync(preset_file, JSON.stringify(options.preset));
  }
  const queueStore = createQueueStore({ filePathFor: () => queue_file });
  let next_id = 0;
  const presetStore = createExecPresetStore({
    filePath: preset_file,
    randomUUID: options.randomUUID || (() => `copy-${++next_id}`)
  });
  const discover = () => ({
    complete: true,
    states: [
      {
        workspace_key: 'workspace-key',
        display_name: '작업 공간',
        status: /** @type {'ok'} */ ('ok'),
        queue_file,
        raw: fs.existsSync(queue_file)
          ? JSON.parse(fs.readFileSync(queue_file, 'utf8'))
          : null
      }
    ]
  });
  /** @type {Record<string, unknown>|undefined} */
  let kv_value = options.kv;
  const kvGet = vi.fn(async () =>
    options.kvFailOn === 'read'
      ? { ok: false, error: 'kv down' }
      : { ok: true, value: kv_value }
  );
  const kvSet = vi.fn(
    async (
      /** @type {any} */ _ws,
      /** @type {any} */ _key,
      /** @type {any} */ value
    ) => {
      if (options.kvFailOn === 'write') {
        return { ok: false, error: 'kv read-only' };
      }
      kv_value = value;
      return { ok: true };
    }
  );
  const coordinator = createExecPresetCoordinator({
    queueStore,
    presetStore,
    discover,
    workspaceKeyFor: () => 'workspace-key',
    kvGet,
    kvSet,
    warn: options.warn
  });
  return {
    coordinator,
    queueStore,
    presetStore,
    queue_file,
    kvGet,
    kvSet,
    kvValue: () => kv_value
  };
}

describe('exec-preset-coordinator implementation presets', () => {
  test('keeps an old partial profile in the applicable snapshot', () => {
    const fixture = createFixture({
      preset: {
        revision: 1,
        presets: [
          {
            id: 'legacy-1',
            name: '옛 프리셋',
            settings: { orchestration_model: 'sol', impl_model: 'sol' },
            origin: { kind: 'user' }
          },
          {
            id: 'impl-1',
            name: '구현 프리셋',
            settings: { impl_dispatch: 'main' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const snapshot = fixture.coordinator.snapshot();

    expect(snapshot.presets.map((preset) => preset.id)).toEqual([
      'legacy-1',
      'impl-1'
    ]);
  });

  test('keeps an 18-key profile and hides a preset with an outside key', () => {
    const presetStore = {
      snapshot: () => ({
        revision: 2,
        presets: [
          {
            id: 'profile-18',
            name: '전체 프로필',
            settings: {
              workflow_mode: 'standard',
              spec_review_model: 'codex',
              spec_review_effort: 'high',
              spec_review_speed: 'fast',
              plan_review_model: 'fable',
              plan_review_effort: 'low',
              plan_review_speed: 'default',
              impl_review_model: 'self',
              impl_review_effort: 'xhigh',
              impl_review_speed: 'fast',
              impl_dispatch: 'main',
              impl_runtime: 'claude',
              impl_model: 'terra',
              impl_effort: 'max',
              impl_speed: 'fast',
              orchestration_model: 'opus',
              orchestration_effort: 'high',
              orchestration_speed: 'default'
            },
            origin: { kind: /** @type {'user'} */ ('user') }
          },
          {
            id: 'outside',
            name: '외부 키',
            settings: { removed_key: 'value' },
            origin: { kind: /** @type {'user'} */ ('user') }
          }
        ]
      })
    };
    const coordinator = createExecPresetCoordinator({
      queueStore: /** @type {any} */ ({}),
      presetStore: /** @type {any} */ (presetStore)
    });

    const snapshot = coordinator.snapshot();

    expect(snapshot.presets.map((preset) => preset.id)).toEqual(['profile-18']);
  });

  test('hides a preset whose outside key survived a real store load', () => {
    const fixture = createFixture({
      preset: {
        revision: 1,
        presets: [
          {
            id: 'retired-key',
            name: '퇴역 키',
            settings: { review_model: 'codex', impl_runtime: 'claude' },
            origin: { kind: 'user' }
          },
          {
            id: 'impl-1',
            name: '구현 프리셋',
            settings: { impl_dispatch: 'main' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const snapshot = fixture.coordinator.snapshot();

    expect(snapshot.presets.map((preset) => preset.id)).toEqual(['impl-1']);
  });

  test('marks an implementation preset whose model left the catalog incompatible', () => {
    const fixture = createFixture({
      preset: {
        revision: 1,
        presets: [
          {
            id: 'impl-1',
            name: '구현 프리셋',
            settings: { impl_runtime: 'claude', impl_model: 'terra' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const snapshot = fixture.coordinator.snapshot();

    expect(snapshot.presets[0].compatible).toBe(false);
    expect(snapshot.presets[0].incompatibility_reason).toBe(
      'provider_model_mismatch'
    );
  });

  test('accepts the auto literal as a compatible implementation preset', () => {
    const fixture = createFixture({
      preset: {
        revision: 1,
        presets: [
          {
            id: 'impl-1',
            name: '자동',
            settings: {
              impl_dispatch: 'delegated',
              impl_runtime: 'inherit',
              impl_model: 'auto',
              impl_effort: 'auto'
            },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    expect(fixture.coordinator.snapshot().presets[0].compatible).toBe(true);
  });
});

describe('exec-preset-coordinator server-global reseed (spec §D)', () => {
  test('replaces every preset with the three seeds and records the marker', async () => {
    const fixture = createFixture({
      preset: {
        revision: 7,
        presets: [
          {
            id: 'old-preset',
            name: '삭제 대상',
            settings: { impl_runtime: 'claude' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const result = await fixture.coordinator.migrateWorkspaces([]);

    expect(result.ok).toBe(true);
    const state = fixture.presetStore.snapshot();
    expect(
      state.presets.map(({ name, settings }) => ({ name, settings }))
    ).toEqual(RESEED_PRESETS);
    expect(state).toHaveProperty('reseed_migration', { version: 1 });
  });

  test('changes nothing when the reseed marker already exists', async () => {
    const preset_file = path.join(tmp_dir, 'exec-presets.json');
    const fixture = createFixture({
      preset: {
        revision: 8,
        presets: [
          {
            id: 'kept',
            name: '이미 완료',
            settings: { impl_runtime: 'codex' },
            origin: { kind: 'user' }
          }
        ],
        reseed_migration: { version: 1 }
      }
    });
    const before = fs.readFileSync(preset_file, 'utf8');

    const result = await fixture.coordinator.migrateWorkspaces([]);

    expect(result.ok).toBe(true);
    expect(fs.readFileSync(preset_file, 'utf8')).toBe(before);
    expect(fixture.presetStore.snapshot().revision).toBe(8);
  });

  test('warns and keeps startup successful when reseed readback fails', async () => {
    const warn = vi.fn();
    const preset_file = path.join(tmp_dir, 'exec-presets.json');
    let reads = 0;
    const presetStore = createExecPresetStore({
      filePath: preset_file,
      fs: /** @type {any} */ ({
        readFileSync(/** @type {any} */ target, /** @type {any} */ options) {
          reads += 1;
          if (target === preset_file && reads === 2) {
            return JSON.stringify({ revision: 0, presets: [] });
          }
          return fs.readFileSync(target, options);
        },
        mkdirSync: fs.mkdirSync,
        writeFileSync: fs.writeFileSync,
        renameSync: fs.renameSync,
        rmSync: fs.rmSync
      })
    });
    const coordinator = createExecPresetCoordinator({
      queueStore: /** @type {any} */ ({}),
      presetStore,
      warn
    });

    const result = await coordinator.migrateWorkspaces([]);

    expect(result.ok).toBe(true);
    expect(warn).toHaveBeenCalledOnce();
  });

  test('blocks legacy copies after the reseed marker exists', async () => {
    const createOrReuseImplCopy = vi.fn();
    const replaceAllForReseed = vi.fn();
    const presetStore = {
      snapshot: () => ({
        revision: 8,
        presets: [
          {
            id: 'deleted-legacy',
            name: '삭제된 구형 프리셋',
            settings: { removed_key: 'value' },
            origin: { kind: /** @type {'user'} */ ('user') }
          }
        ],
        reseed_migration: { version: 1 }
      }),
      createOrReuseImplCopy,
      replaceAllForReseed
    };
    const coordinator = createExecPresetCoordinator({
      queueStore: /** @type {any} */ ({}),
      presetStore: /** @type {any} */ (presetStore)
    });

    const result = await coordinator.migrateWorkspaces([]);

    expect(result.ok).toBe(true);
    expect(createOrReuseImplCopy).not.toHaveBeenCalled();
    expect(replaceAllForReseed).not.toHaveBeenCalled();
  });

  test('reads the workspace legacy source before replacing the presets', async () => {
    const fixture = createFixture({
      queue: { revision: 4, default_exec_preset_id: 'source-preset' },
      preset: {
        revision: 2,
        presets: [
          {
            id: 'source-preset',
            name: '워크스페이스 원본',
            settings: { impl_runtime: 'claude' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const result = await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(result.ok).toBe(true);
    expect(fixture.kvValue()).toMatchObject({ impl_runtime: 'claude' });
    expect(
      fixture.presetStore
        .snapshot()
        .presets.map(({ name, settings }) => ({ name, settings }))
    ).toEqual(RESEED_PRESETS);
  });
});

describe('exec-preset-coordinator resolveForDispatch', () => {
  test('supplies the queue orchestration values as the workspace layer', () => {
    const fixture = createFixture();
    fixture.queueStore.setOrchestrationDefaults(WORKSPACE, {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet', orchestration_effort: 'high' }
    });

    const resolved = /** @type {any} */ (
      fixture.coordinator.resolveForDispatch(WORKSPACE, {})
    );

    expect(resolved.ok).toBe(true);
    expect(resolved.settings).toEqual({
      orchestration_model: 'sonnet',
      orchestration_effort: 'high'
    });
    expect(resolved.exec.orchestration_model).toBe('sonnet');
  });

  test('never produces a stamped key', () => {
    const fixture = createFixture();
    fixture.queueStore.setOrchestrationDefaults(WORKSPACE, {
      expected_revision: 0,
      values: { orchestration_model: 'sonnet' }
    });

    const resolved = /** @type {any} */ (
      fixture.coordinator.resolveForDispatch(WORKSPACE, {})
    );

    expect(resolved.exec.stamped_keys).toEqual([]);
  });
});

describe('exec-preset-coordinator session-defaults migration (spec §F)', () => {
  /**
   * @param {Record<string, unknown>} [extra]
   */
  function legacyQueue(extra = {}) {
    return {
      revision: 4,
      exec_defaults: {
        orchestration_model: 'sonnet',
        orchestration_effort: 'high',
        spec_review_model: 'codex',
        impl_runtime: 'claude'
      },
      ...extra
    };
  }

  test('fills the empty kv session keys from the legacy defaults', async () => {
    const fixture = createFixture({ queue: legacyQueue() });

    const result = await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(result.ok).toBe(true);
    expect(fixture.kvValue()).toMatchObject({
      schema: 1,
      spec_review_model: 'codex',
      impl_runtime: 'claude'
    });
  });

  test('never writes an orchestration key into the kv session layer', async () => {
    const fixture = createFixture({ queue: legacyQueue() });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(fixture.kvValue()).not.toHaveProperty('orchestration_model');
  });

  test('leaves a kv key the user already chose untouched (fill-only-empty)', async () => {
    const fixture = createFixture({
      queue: legacyQueue(),
      kv: { schema: 1, spec_review_model: 'fable' }
    });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(fixture.kvValue()).toMatchObject({ spec_review_model: 'fable' });
  });

  test('fills the empty queue orchestration values from the legacy defaults', async () => {
    const fixture = createFixture({ queue: legacyQueue() });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    const queue = fixture.queueStore.snapshot(WORKSPACE);
    expect(queue.orchestration_model).toBe('sonnet');
    expect(queue.orchestration_effort).toBe('high');
  });

  test('leaves an orchestration value the user already chose untouched', async () => {
    const fixture = createFixture({
      queue: legacyQueue({ orchestration_model: 'opus' })
    });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(fixture.queueStore.snapshot(WORKSPACE).orchestration_model).toBe(
      'opus'
    );
  });

  test('makes no legacy copy for a partial 18-key preset before reseeding', async () => {
    const fixture = createFixture({
      queue: legacyQueue(),
      preset: {
        revision: 1,
        presets: [
          {
            id: 'legacy-1',
            name: '옛 프리셋',
            settings: {
              orchestration_model: 'sonnet',
              impl_runtime: 'claude',
              impl_model: 'haiku'
            },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const create_copy = vi.spyOn(fixture.presetStore, 'createOrReuseImplCopy');

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(create_copy).not.toHaveBeenCalled();
  });

  test('writes the completion marker and clears the legacy fields', async () => {
    const fixture = createFixture({ queue: legacyQueue() });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    const queue = fixture.queueStore.snapshot(WORKSPACE);
    expect(queue.session_defaults_migration).toMatchObject({ version: 1 });
    const persisted = JSON.parse(fs.readFileSync(fixture.queue_file, 'utf8'));
    expect(Object.hasOwn(persisted, 'exec_defaults')).toBe(false);
  });

  test('replaces a partial 18-key preset after every workspace succeeded', async () => {
    const fixture = createFixture({
      queue: legacyQueue(),
      preset: {
        revision: 1,
        presets: [
          {
            id: 'legacy-1',
            name: '옛 프리셋',
            settings: { orchestration_model: 'sonnet', impl_model: 'haiku' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    const state = fixture.presetStore.snapshot();
    expect(state.presets.map((preset) => preset.id)).not.toContain('legacy-1');
    expect(state).toHaveProperty('reseed_migration', { version: 1 });
  });

  test('writes no marker and keeps the source when the kv write fails', async () => {
    const fixture = createFixture({
      queue: legacyQueue(),
      kvFailOn: 'write'
    });

    const result = await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    // The failed workspace is reported as DEFERRED rather than failing the
    // whole pass: the pass's `ok` gates the worker runtime for every
    // workspace, and one unwritable kv may not close all of them.
    expect(result).toMatchObject({ ok: true, deferred: [WORKSPACE] });
    expect(
      fixture.queueStore.snapshot(WORKSPACE).session_defaults_migration
    ).toBe(null);
    const persisted = JSON.parse(fs.readFileSync(fixture.queue_file, 'utf8'));
    expect(Object.hasOwn(persisted, 'exec_defaults')).toBe(true);
  });

  test('keeps the legacy original when a workspace pass is deferred', async () => {
    const fixture = createFixture({
      queue: legacyQueue(),
      kvFailOn: 'write',
      preset: {
        revision: 1,
        presets: [
          {
            id: 'legacy-1',
            name: '옛 프리셋',
            settings: { orchestration_model: 'sonnet', impl_model: 'haiku' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const result = await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(result).toMatchObject({ ok: true, deferred: [WORKSPACE] });
    expect(
      fixture.presetStore.snapshot().presets.map((preset) => preset.id)
    ).toContain('legacy-1');
  });

  test('re-converges on the next start after a partial pass', async () => {
    const failing = createFixture({ queue: legacyQueue(), kvFailOn: 'write' });
    await failing.coordinator.migrateWorkspaces([WORKSPACE]);
    failing.queueStore.__clearCacheForTest();

    const resumed = createFixture();
    const result = await resumed.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(result.ok).toBe(true);
    expect(resumed.kvValue()).toMatchObject({ spec_review_model: 'codex' });
    expect(
      resumed.queueStore.snapshot(WORKSPACE).session_defaults_migration
    ).toMatchObject({ version: 1 });
  });

  test('skips a workspace that already carries the completion marker', async () => {
    const fixture = createFixture({
      queue: legacyQueue({
        session_defaults_migration: { version: 1, at: 1 }
      })
    });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(fixture.kvSet).not.toHaveBeenCalled();
  });

  test('keeps the pass ok when one workspace cannot reach its kv', async () => {
    // A workspace whose bd database refuses to open (a pending-schema clone,
    // for instance) cannot be migrated — but it must not close the worker
    // runtime for every OTHER workspace, which is what an `ok:false` pass does
    // at the startup gate.
    const fixture = createFixture({ queue: legacyQueue(), kvFailOn: 'read' });

    const result = await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(result.ok).toBe(true);
    expect(result.deferred).toEqual([WORKSPACE]);
  });

  test('leaves the unreachable workspace unmigrated for the next start', async () => {
    const fixture = createFixture({ queue: legacyQueue(), kvFailOn: 'read' });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(
      fixture.queueStore.snapshot(WORKSPACE).session_defaults_migration
    ).toBe(null);
  });

  test('re-runs the legacy cleanup when the marker exists but residue remains', async () => {
    // A crash between the marker write and clearLegacyExecFields leaves the
    // marker plus the legacy fields; the next pass must still converge.
    const fixture = createFixture({
      queue: legacyQueue({
        session_defaults_migration: { version: 1, at: 1 }
      })
    });

    const result = await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(result.ok).toBe(true);
    const snapshot = /** @type {Record<string, unknown>} */ (
      /** @type {unknown} */ (fixture.queueStore.snapshot(WORKSPACE))
    );
    expect(Object.hasOwn(snapshot, 'default_exec_preset_id')).toBe(false);
    expect(Object.hasOwn(snapshot, 'exec_defaults')).toBe(false);
    expect(fixture.kvSet).not.toHaveBeenCalled();
  });

  test('does nothing for a workspace with no legacy fields', async () => {
    const fixture = createFixture({ queue: { revision: 2 } });

    const result = await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(result.ok).toBe(true);
    expect(fixture.kvSet).not.toHaveBeenCalled();
    expect(
      fixture.queueStore.snapshot(WORKSPACE).session_defaults_migration
    ).toBe(null);
  });

  test('creates no migration copy for a partial 18-key preset on a re-run', async () => {
    const preset = {
      revision: 1,
      presets: [
        {
          id: 'legacy-1',
          name: '옛 프리셋',
          settings: { orchestration_model: 'sonnet', impl_model: 'haiku' },
          origin: { kind: 'user' }
        }
      ]
    };
    const failing = createFixture({
      queue: legacyQueue(),
      preset,
      kvFailOn: 'write'
    });
    await failing.coordinator.migrateWorkspaces([WORKSPACE]);
    failing.queueStore.__clearCacheForTest();

    const resumed = createFixture();
    await resumed.coordinator.migrateWorkspaces([WORKSPACE]);

    const copies = resumed.presetStore
      .snapshot()
      .presets.filter(
        (entry) =>
          entry.origin.kind === 'legacy-preset-copy' &&
          entry.origin.source_preset_id === 'legacy-1'
      );
    expect(copies).toHaveLength(0);
  });
});
