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

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-coordinator-'));
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

/**
 * Build a coordinator over real queue + preset stores plus an in-memory kv.
 *
 * @param {{ queue?: Record<string, unknown>, preset?: Record<string, unknown>, kv?: Record<string, unknown>, kvFailOn?: 'read'|'write'|null, randomUUID?: () => string }} [options]
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
    kvSet
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
  test('hides a legacy 12-key preset from the applicable snapshot', () => {
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

  test('creates the implementation copy of a legacy 12-key preset', async () => {
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

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    const presets = fixture.coordinator.snapshot().presets;
    expect(presets).toHaveLength(1);
    expect(presets[0].settings).toEqual({
      impl_runtime: 'claude',
      impl_model: 'haiku'
    });
    expect(presets[0].origin).toEqual({
      kind: 'legacy-preset-copy',
      source_preset_id: 'legacy-1'
    });
  });

  test('writes the completion marker and clears the legacy fields', async () => {
    const fixture = createFixture({ queue: legacyQueue() });

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    const queue = fixture.queueStore.snapshot(WORKSPACE);
    expect(queue.session_defaults_migration).toMatchObject({ version: 1 });
    const persisted = JSON.parse(fs.readFileSync(fixture.queue_file, 'utf8'));
    expect(Object.hasOwn(persisted, 'exec_defaults')).toBe(false);
  });

  test('deletes the legacy 12-key original only after every workspace succeeded', async () => {
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

    expect(
      fixture.presetStore.snapshot().presets.map((preset) => preset.id)
    ).not.toContain('legacy-1');
  });

  test('writes no marker and keeps the source when the kv write fails', async () => {
    const fixture = createFixture({
      queue: legacyQueue(),
      kvFailOn: 'write'
    });

    const result = await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

    expect(result.ok).toBe(false);
    expect(
      fixture.queueStore.snapshot(WORKSPACE).session_defaults_migration
    ).toBe(null);
    const persisted = JSON.parse(fs.readFileSync(fixture.queue_file, 'utf8'));
    expect(Object.hasOwn(persisted, 'exec_defaults')).toBe(true);
  });

  test('keeps the legacy original when a workspace pass failed', async () => {
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

    await fixture.coordinator.migrateWorkspaces([WORKSPACE]);

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

  test('reuses the implementation copy rather than duplicating it on a re-run', async () => {
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
    expect(copies).toHaveLength(1);
  });
});
