import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createExecPresetStore } from '../exec-preset-store.js';
import { createExecPresetCoordinator } from './exec-preset-coordinator.js';
import { createQueueStore } from './queue-store.js';

/** @type {string} */
let tmp_dir;
const WORKSPACE = '/tmp/coordinator-workspace';

function migrationDigest() {
  return crypto
    .createHash('sha256')
    .update(JSON.stringify([['orchestration_model', 'sol']]))
    .digest('hex');
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-coordinator-'));
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

/**
 * @param {{ queue?: Record<string, unknown>, preset?: Record<string, unknown> }} [options]
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
  const presetStore = createExecPresetStore({
    filePath: preset_file,
    randomUUID: () => 'migration-preset',
    settingEnums: () => ({ orchestration_model: ['sol'] })
  });
  const discover = () => ({
    complete: true,
    states: [
      {
        workspace_key: 'workspace-key',
        display_name: '작업 공간',
        status: /** @type {'ok'} */ ('ok'),
        queue_file,
        raw: JSON.parse(fs.readFileSync(queue_file, 'utf8'))
      }
    ]
  });
  return {
    queueStore,
    presetStore,
    coordinator: createExecPresetCoordinator({
      queueStore,
      presetStore,
      discover,
      workspaceKeyFor: () => 'workspace-key',
      workspaceNameFor: () => '작업 공간'
    })
  };
}

/**
 * @param {Partial<import('./scheduler.js').BeadSnapshot>} [over]
 */
function beadSnapshot(over = {}) {
  return {
    ready: true,
    blocked: false,
    repo: '/repo',
    target_base: 'main',
    ...over
  };
}

describe('exec-preset coordinator legacy migration', () => {
  test('resolves one frozen preset snapshot with bead precedence and preset stamps', () => {
    const fixture = createFixture({
      queue: { revision: 2, default_exec_preset_id: 'preset-1' },
      preset: {
        revision: 7,
        presets: [
          {
            id: 'preset-1',
            name: '기본',
            settings: {
              orchestration_model: 'sol',
              spec_review_model: 'codex'
            },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const resolved = fixture.coordinator.resolveForDispatch(
      WORKSPACE,
      beadSnapshot({
        model: 'opus'
      })
    );

    if (!resolved.ok) {
      throw new Error(resolved.reason);
    }

    expect(resolved).toMatchObject({
      ok: true,
      preset_id: 'preset-1',
      preset_revision: 7,
      settings: {
        orchestration_model: 'sol',
        spec_review_model: 'codex'
      },
      exec: {
        orchestration_model: 'opus',
        spec_review_model: 'codex',
        stamped_keys: ['spec_review_model']
      }
    });
    expect(Object.isFrozen(resolved.settings)).toBe(true);
    expect(Object.isFrozen(resolved.exec)).toBe(true);
  });

  test('rejects a missing selected preset before dispatch', () => {
    const fixture = createFixture({
      queue: { revision: 2, default_exec_preset_id: 'gone' },
      preset: { revision: 7, presets: [] }
    });

    expect(
      fixture.coordinator.resolveForDispatch(WORKSPACE, beadSnapshot())
    ).toEqual({
      ok: false,
      reason: 'default_exec_preset_missing'
    });
  });

  test('keeps a resolved snapshot pinned while the next resolution reads an updated preset', () => {
    const fixture = createFixture({
      queue: { revision: 2, default_exec_preset_id: 'preset-1' },
      preset: {
        revision: 7,
        presets: [
          {
            id: 'preset-1',
            name: '기본',
            settings: {},
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const first = fixture.coordinator.resolveForDispatch(
      WORKSPACE,
      beadSnapshot()
    );
    fixture.coordinator.update({
      expected_revision: 7,
      id: 'preset-1',
      name: '갱신됨',
      settings: { orchestration_model: 'sol' }
    });
    const next = fixture.coordinator.resolveForDispatch(
      WORKSPACE,
      beadSnapshot()
    );

    expect(first).toMatchObject({
      ok: true,
      preset_revision: 7,
      exec: { orchestration_model: 'opus' }
    });
    expect(next).toMatchObject({
      ok: true,
      preset_revision: 8,
      exec: { orchestration_model: 'sol' }
    });
  });

  test('rejects an incompatible selected preset before dispatch', () => {
    const fixture = createFixture({
      queue: { revision: 2, default_exec_preset_id: 'preset-1' },
      preset: {
        revision: 7,
        presets: [
          {
            id: 'preset-1',
            name: '기본',
            settings: { impl_runtime: 'claude', impl_model: 'terra' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    expect(
      fixture.coordinator.resolveForDispatch(WORKSPACE, beadSnapshot())
    ).toEqual({
      ok: false,
      reason: 'default_exec_preset_incompatible'
    });
  });

  test('migrates legacy defaults in ordered durable steps and is restart-idempotent', () => {
    const first = createFixture({
      queue: { revision: 4, exec_defaults: { orchestration_model: 'sol' } }
    });

    const migrated = first.coordinator.migrateWorkspace(WORKSPACE);

    expect(migrated).toMatchObject({ ok: true, migrated: true });
    expect(first.queueStore.snapshot(WORKSPACE)).toMatchObject({
      default_exec_preset_id: 'migration-preset'
    });
    const durable = first.presetStore.snapshot();
    expect(durable.presets[0]).toMatchObject({
      id: 'migration-preset',
      origin: {
        kind: 'workspace-exec-defaults',
        workspace_key: 'workspace-key'
      }
    });

    const restarted = createFixture();
    expect(restarted.coordinator.migrateWorkspace(WORKSPACE)).toMatchObject({
      ok: true,
      migrated: false
    });
    expect(restarted.presetStore.snapshot().presets).toHaveLength(1);
  });

  test('blocks delete when any durable queue is unreadable', () => {
    const fixture = createFixture({
      queue: { revision: 0 },
      preset: {
        revision: 1,
        presets: [
          {
            id: 'preset-1',
            name: '기본',
            settings: {},
            origin: { kind: 'user' }
          }
        ]
      }
    });
    const unreadable = () => ({ complete: false, states: [] });
    const coordinator = createExecPresetCoordinator({
      queueStore: fixture.queueStore,
      presetStore: fixture.presetStore,
      discover: unreadable
    });

    const result = coordinator.delete({ expected_revision: 1, id: 'preset-1' });

    expect(result).toMatchObject({
      applied: false,
      conflict: false,
      reason: 'reference_scan_incomplete'
    });
    expect(fixture.presetStore.snapshot().presets).toHaveLength(1);
  });

  test('reports incomplete reference scans without a false reference count', () => {
    const fixture = createFixture({
      queue: { revision: 0 },
      preset: {
        revision: 1,
        presets: [
          {
            id: 'preset-1',
            name: '기본',
            settings: { impl_model: 'unknown-model' },
            origin: { kind: 'user' }
          }
        ]
      }
    });
    const coordinator = createExecPresetCoordinator({
      queueStore: fixture.queueStore,
      presetStore: fixture.presetStore,
      discover: () => ({ complete: false, states: [] })
    });

    expect(coordinator.snapshot()).toMatchObject({
      revision: 1,
      presets: [
        {
          id: 'preset-1',
          compatible: false,
          incompatibility_reason: 'unknown_impl_model',
          reference_scan_complete: false,
          reference_count: null,
          reference_summary: []
        }
      ]
    });
  });

  test('marks linked runtime and model mismatches incompatible in snapshots', () => {
    const fixture = createFixture({
      queue: { revision: 0 },
      preset: {
        revision: 1,
        presets: [
          {
            id: 'preset-1',
            name: '기본',
            settings: { impl_runtime: 'claude', impl_model: 'terra' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    expect(fixture.coordinator.snapshot().presets[0]).toMatchObject({
      compatible: false,
      incompatibility_reason: 'provider_model_mismatch'
    });
  });

  test('closes the startup barrier when preset normalization cannot load without legacy defaults', () => {
    const fixture = createFixture({ queue: { revision: 0 } });
    let snapshots = 0;
    const presetStore = {
      ...fixture.presetStore,
      snapshot() {
        snapshots += 1;
        throw new Error('normalization readback failed');
      }
    };
    const coordinator = createExecPresetCoordinator({
      queueStore: fixture.queueStore,
      presetStore,
      discover: () => ({ complete: true, states: [] })
    });

    expect(coordinator.migrateWorkspaces([WORKSPACE])).toEqual({
      ok: false,
      step: 'preset_store_normalization',
      outcomes: []
    });
    expect(snapshots).toBe(1);
  });

  test('returns authoritative queue and preset snapshots for a stale dual CAS', () => {
    const fixture = createFixture({
      queue: { revision: 2 },
      preset: {
        revision: 3,
        presets: [
          {
            id: 'preset-1',
            name: '기본',
            settings: {},
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const result = fixture.coordinator.setDefaultExecPreset(WORKSPACE, {
      preset_id: 'preset-1',
      expected_queue_revision: 1,
      expected_preset_revision: 2
    });

    expect(result).toMatchObject({
      applied: false,
      conflict: true,
      queue: { revision: 2 },
      presets: { revision: 3 }
    });
  });

  test('preserves legacy defaults when a partial reference does not match its migration origin', () => {
    const fixture = createFixture({
      queue: {
        revision: 2,
        default_exec_preset_id: 'wrong-preset',
        exec_defaults: { orchestration_model: 'sol' }
      },
      preset: {
        revision: 1,
        presets: [
          {
            id: 'wrong-preset',
            name: '사용자 기본',
            settings: { orchestration_model: 'sol' },
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const result = fixture.coordinator.migrateWorkspace(WORKSPACE);

    expect(result).toEqual({ ok: false, step: 'legacy_reference_mismatch' });
    expect(fixture.queueStore.snapshot(WORKSPACE)).toMatchObject({
      default_exec_preset_id: 'wrong-preset',
      exec_defaults: { orchestration_model: 'sol' }
    });
  });

  test('hides a pending migration preset until legacy clear has read back', () => {
    const fixture = createFixture({
      queue: {
        revision: 2,
        default_exec_preset_id: 'migration-preset',
        exec_defaults: { orchestration_model: 'sol' }
      },
      preset: {
        revision: 1,
        presets: [
          {
            id: 'migration-preset',
            name: '이전 기본값',
            settings: { orchestration_model: 'sol' },
            origin: {
              kind: 'workspace-exec-defaults',
              workspace_key: 'workspace-key',
              source_digest: migrationDigest()
            }
          }
        ]
      }
    });

    expect(fixture.coordinator.snapshot().presets).toEqual([]);
  });

  test('returns annotated snapshot after creating a preset', () => {
    const fixture = createFixture({ queue: { revision: 0 } });

    const result = fixture.coordinator.create({
      expected_revision: 0,
      name: '기본',
      settings: {}
    });

    expect(result).toMatchObject({
      applied: true,
      presets: [
        {
          id: 'migration-preset',
          reference_count: 0,
          reference_summary: []
        }
      ]
    });
  });

  test('keeps referenced workspace impact in an annotated update response', () => {
    const fixture = createFixture({
      queue: { revision: 2, default_exec_preset_id: 'preset-1' },
      preset: {
        revision: 1,
        presets: [
          {
            id: 'preset-1',
            name: '기본',
            settings: {},
            origin: { kind: 'user' }
          }
        ]
      }
    });

    const result = fixture.coordinator.update({
      expected_revision: 1,
      id: 'preset-1',
      name: '수정됨',
      settings: {}
    });

    expect(result).toMatchObject({
      applied: true,
      presets: [
        {
          id: 'preset-1',
          reference_count: 1,
          reference_summary: [
            { workspace_key: 'workspace-key', display_name: '작업 공간' }
          ]
        }
      ]
    });
  });

  test('removes the legacy key from the durable queue after migration', () => {
    const fixture = createFixture({
      queue: { revision: 0, exec_defaults: { orchestration_model: 'sol' } }
    });

    fixture.coordinator.migrateWorkspace(WORKSPACE);

    expect(
      JSON.parse(fs.readFileSync(path.join(tmp_dir, 'queue.json'), 'utf8'))
    ).not.toHaveProperty('exec_defaults');
  });

  test('preserves migratable values across every ordered failure boundary and converges on restart', () => {
    const steps = [
      'preset_persist',
      'preset_readback',
      'queue_reference_persist',
      'queue_reference_readback',
      'legacy_clear',
      'queue_clear_readback'
    ];
    for (const step of steps) {
      fs.rmSync(tmp_dir, { recursive: true, force: true });
      fs.mkdirSync(tmp_dir, { recursive: true });
      const fixture = createFixture({
        queue: { revision: 0, exec_defaults: { orchestration_model: 'sol' } }
      });
      let snapshots = 0;
      const presetStore = {
        ...fixture.presetStore,
        /** @param {{ name: string, settings: Record<string, string>, workspace_key: string, source_digest: string }} input */
        createOrReuseMigration(input) {
          if (step === 'preset_persist') {
            throw new Error('disk full');
          }
          return fixture.presetStore.createOrReuseMigration(input);
        },
        snapshot() {
          if (step === 'preset_readback') {
            return { revision: 0, presets: [] };
          }
          return fixture.presetStore.snapshot();
        }
      };
      const queueStore = {
        ...fixture.queueStore,
        /**
         * @param {string} workspace - Workspace key.
         * @param {{ expected_revision: number, preset_id: string|null }} input - CAS input.
         */
        setDefaultExecPresetId(workspace, input) {
          if (step === 'queue_reference_persist') {
            return {
              ok: false,
              conflict: false,
              queue: fixture.queueStore.snapshot(workspace)
            };
          }
          return fixture.queueStore.setDefaultExecPresetId(workspace, input);
        },
        /** @param {string} workspace */
        snapshot(workspace) {
          snapshots += 1;
          if (step === 'queue_reference_readback' && snapshots === 2) {
            throw new Error('readback unavailable');
          }
          if (step === 'queue_clear_readback' && snapshots === 3) {
            throw new Error('readback unavailable');
          }
          return fixture.queueStore.snapshot(workspace);
        },
        /**
         * @param {string} workspace - Workspace key.
         * @param {{ expected_revision: number }} input - CAS input.
         */
        clearLegacyExecDefaults(workspace, input) {
          if (step === 'legacy_clear') {
            return {
              ok: false,
              conflict: false,
              queue: fixture.queueStore.snapshot(workspace)
            };
          }
          return fixture.queueStore.clearLegacyExecDefaults(workspace, input);
        }
      };
      const coordinator = createExecPresetCoordinator({
        queueStore,
        presetStore,
        discover: () => ({ complete: true, states: [] }),
        workspaceKeyFor: () => 'workspace-key',
        workspaceNameFor: () => '작업 공간'
      });

      expect(coordinator.migrateWorkspace(WORKSPACE)).toMatchObject({
        ok: false,
        step
      });
      const failed_queue = fixture.queueStore.snapshot(WORKSPACE);
      const legacy_defaults = Object.hasOwn(failed_queue, 'exec_defaults')
        ? failed_queue.exec_defaults
        : {};
      expect(
        fixture.presetStore.snapshot().presets.length > 0 ||
          legacy_defaults.orchestration_model === 'sol'
      ).toBe(true);

      expect(fixture.coordinator.migrateWorkspace(WORKSPACE)).toMatchObject({
        ok: true
      });
      expect(
        fixture.queueStore.snapshot(WORKSPACE).default_exec_preset_id
      ).toBe('migration-preset');
    }
  });
});
