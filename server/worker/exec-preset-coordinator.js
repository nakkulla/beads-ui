/**
 * Authority boundary for global execution presets and workspace references.
 *
 * The preset store remains a persistence primitive and queue-store remains a
 * queue persistence primitive. This coordinator is the only place allowed to
 * couple their revisions, inspect durable references, or run legacy migration.
 */
import crypto from 'node:crypto';
import {
  EXEC_SETTING_KEYS,
  execSettingEnums,
  validateImplSettings
} from './exec-enums.js';
import { discoverQueueStates } from './queue-state-discovery.js';

/**
 * @param {Record<string, string>} settings
 */
function sourceDigest(settings) {
  const ordered = Object.keys(settings)
    .sort()
    .map((key) => [key, settings[key]]);
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(ordered))
    .digest('hex');
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} raw
 * @returns {Record<string, string>|null}
 */
function normalizeLegacySettings(raw) {
  if (!isRecord(raw)) {
    return null;
  }
  const enums = execSettingEnums();
  /** @type {Record<string, string>} */
  const settings = {};
  for (const [key, value] of Object.entries(raw)) {
    if (!EXEC_SETTING_KEYS.includes(key) || typeof value !== 'string') {
      return null;
    }
    const allowed = enums[key];
    if (!Array.isArray(allowed) || !allowed.includes(value)) {
      return null;
    }
    settings[key] = value;
  }
  const coherence = validateImplSettings(settings, { active_writer: false });
  if (!coherence.ok) {
    return null;
  }
  if (coherence.inferred && typeof coherence.impl_runtime === 'string') {
    settings.impl_runtime = coherence.impl_runtime;
  }
  return settings;
}

/**
 * @param {ReturnType<typeof discoverQueueStates>} discovered
 * @param {string} preset_id
 */
function referencesFor(discovered, preset_id) {
  if (!discovered.complete) {
    return { complete: false, references: [] };
  }
  const references = discovered.states.filter(
    (state) =>
      state.status === 'ok' && state.raw?.default_exec_preset_id === preset_id
  );
  return { complete: true, references };
}

/**
 * @param {Record<string, string>} first
 * @param {Record<string, string>} second
 */
function sameSettings(first, second) {
  const first_keys = Object.keys(first).sort();
  const second_keys = Object.keys(second).sort();
  return (
    first_keys.length === second_keys.length &&
    first_keys.every(
      (key, index) => key === second_keys[index] && first[key] === second[key]
    )
  );
}

/**
 * @param {ReturnType<typeof discoverQueueStates>} discovered
 * @param {import('../exec-preset-store.js').ExecPreset} preset
 */
function migrationIsComplete(discovered, preset) {
  if (preset.origin.kind !== 'workspace-exec-defaults') {
    return true;
  }
  const origin = preset.origin;
  const state = discovered.states.find(
    (entry) => entry.workspace_key === origin.workspace_key
  );
  return (
    state?.status === 'ok' &&
    state.raw?.default_exec_preset_id === preset.id &&
    !Object.hasOwn(state.raw, 'exec_defaults')
  );
}

/**
 * @param {{ queueStore: ReturnType<typeof import('./queue-store.js').createQueueStore>, presetStore: ReturnType<typeof import('../exec-preset-store.js').createExecPresetStore>, discover?: () => ReturnType<typeof discoverQueueStates>, workspaceKeyFor?: (workspace: string) => string, workspaceNameFor?: (workspace: string) => string }} options
 */
export function createExecPresetCoordinator(options) {
  const queueStore = options.queueStore;
  const presetStore = options.presetStore;
  const discover = options.discover || (() => discoverQueueStates());
  const workspaceKeyFor = options.workspaceKeyFor || ((workspace) => workspace);
  const workspaceNameFor =
    options.workspaceNameFor || ((workspace) => workspace);

  /**
   * @param {string} preset_id
   */
  function referenceInfo(preset_id) {
    return referencesFor(discover(), preset_id);
  }

  /**
   * Return the preset snapshot annotated with reference and migration-pending
   * information. Pending presets exist durably but cannot be edited/deleted or
   * selected until their queue reference is read back.
   */
  function snapshot() {
    const state = presetStore.snapshot();
    const discovered = discover();
    return {
      revision: state.revision,
      presets: state.presets
        .map((preset) => {
          const references = referencesFor(discovered, preset.id);
          const pending = !migrationIsComplete(discovered, preset);
          const coherence = validateImplSettings(preset.settings, {
            active_writer: false
          });
          return {
            ...preset,
            compatible: coherence.ok,
            incompatibility_reason: coherence.ok ? null : coherence.reason,
            migration_pending: pending,
            reference_scan_complete: references.complete,
            reference_count: references.complete
              ? references.references.length
              : null,
            reference_summary: references.references.map((entry) => ({
              workspace_key: entry.workspace_key,
              display_name: entry.display_name
            }))
          };
        })
        .filter((preset) => !preset.migration_pending)
    };
  }

  /**
   * @param {{ applied: boolean, conflict: boolean, revision: number, presets: import('../exec-preset-store.js').ExecPreset[] }} result
   */
  function annotated(result) {
    const current = snapshot();
    return { ...result, revision: current.revision, presets: current.presets };
  }

  /**
   * @param {string} workspace
   * @param {{ preset_id: string|null, expected_queue_revision: number, expected_preset_revision: number }} input
   */
  function setDefaultExecPreset(workspace, input) {
    const queue = queueStore.snapshot(workspace);
    const presets = snapshot();
    if (
      input?.expected_queue_revision !== queue.revision ||
      input?.expected_preset_revision !== presets.revision
    ) {
      return { applied: false, conflict: true, queue, presets };
    }
    if (input.preset_id !== null && typeof input.preset_id !== 'string') {
      return {
        applied: false,
        conflict: false,
        reason: 'invalid',
        queue,
        presets
      };
    }
    if (typeof input.preset_id === 'string') {
      const selected = presets.presets.find(
        (preset) => preset.id === input.preset_id
      );
      if (!selected) {
        return {
          applied: false,
          conflict: false,
          reason: 'default_exec_preset_missing',
          queue,
          presets
        };
      }
      if (selected.migration_pending) {
        return {
          applied: false,
          conflict: false,
          reason: 'default_exec_preset_pending',
          queue,
          presets
        };
      }
      const coherence = validateImplSettings(selected.settings, {
        active_writer: false
      });
      if (!coherence.ok) {
        return {
          applied: false,
          conflict: false,
          reason: 'default_exec_preset_incompatible',
          queue,
          presets
        };
      }
    }
    const result = queueStore.setDefaultExecPresetId(workspace, {
      expected_revision: queue.revision,
      preset_id: input.preset_id
    });
    return {
      applied: result.ok,
      conflict: result.conflict,
      queue: result.queue,
      presets: snapshot(),
      ...(result.ok ? {} : { reason: 'queue_write_failed' })
    };
  }

  /**
   * @param {{ expected_revision: number, id: string }} input
   */
  function deletePreset(input) {
    const current = snapshot();
    const internal = presetStore.snapshot();
    const preset = current.presets.find((entry) => entry.id === input?.id);
    if (!preset) {
      if (internal.presets.some((entry) => entry.id === input?.id)) {
        return {
          applied: false,
          conflict: false,
          reason: 'migration_pending',
          ...current
        };
      }
      return { applied: false, conflict: false, reason: 'invalid', ...current };
    }
    const info = referenceInfo(preset.id);
    if (!info.complete) {
      return {
        applied: false,
        conflict: false,
        reason: 'reference_scan_incomplete',
        ...current
      };
    }
    if (info.references.length > 0) {
      return {
        applied: false,
        conflict: false,
        reason: 'preset_referenced',
        references: info.references.map((entry) => ({
          workspace_key: entry.workspace_key,
          display_name: entry.display_name
        })),
        ...current
      };
    }
    if (preset.migration_pending) {
      return {
        applied: false,
        conflict: false,
        reason: 'migration_pending',
        ...current
      };
    }
    return annotated(presetStore.delete(input));
  }

  /**
   * Perform the ordered, restart-idempotent migration for one workspace.
   *
   * @param {string} workspace
   */
  function migrateWorkspace(workspace) {
    const initial = queueStore.snapshot(workspace);
    const legacy_defaults = isRecord(initial.exec_defaults)
      ? /** @type {Record<string, string>} */ (initial.exec_defaults)
      : {};
    const settings = normalizeLegacySettings(legacy_defaults);
    if (initial.default_exec_preset_id !== null) {
      if (Object.keys(legacy_defaults).length === 0) {
        return { ok: true, migrated: false };
      }
      if (!settings) {
        return { ok: false, step: 'legacy_incompatible' };
      }
      const expected_origin = {
        workspace_key: workspaceKeyFor(workspace),
        source_digest: sourceDigest(settings)
      };
      const referenced = presetStore
        .snapshot()
        .presets.find((preset) => preset.id === initial.default_exec_preset_id);
      if (
        !referenced ||
        referenced.origin.kind !== 'workspace-exec-defaults' ||
        referenced.origin.workspace_key !== expected_origin.workspace_key ||
        referenced.origin.source_digest !== expected_origin.source_digest ||
        !sameSettings(referenced.settings, settings)
      ) {
        return { ok: false, step: 'legacy_reference_mismatch' };
      }
      let clear;
      try {
        clear = queueStore.clearLegacyExecDefaults(workspace, {
          expected_revision: initial.revision
        });
      } catch {
        return { ok: false, step: 'legacy_clear' };
      }
      return clear.ok
        ? { ok: true, migrated: true }
        : { ok: false, step: 'legacy_clear' };
    }
    if (Object.keys(legacy_defaults).length === 0) {
      return { ok: true, migrated: false };
    }
    if (!settings) {
      return { ok: false, step: 'legacy_incompatible' };
    }
    const workspace_key = workspaceKeyFor(workspace);
    let created;
    try {
      created = presetStore.createOrReuseMigration({
        name: `이전 기본값 · ${workspaceNameFor(workspace)}`,
        settings,
        workspace_key,
        source_digest: sourceDigest(settings)
      });
    } catch {
      return { ok: false, step: 'preset_persist' };
    }
    if (!('preset' in created)) {
      return { ok: false, step: 'preset_persist' };
    }
    let readback;
    try {
      readback = presetStore
        .snapshot()
        .presets.find((preset) => preset.id === created.preset.id);
    } catch {
      return { ok: false, step: 'preset_readback' };
    }
    if (!readback) {
      return { ok: false, step: 'preset_readback' };
    }
    let referenced;
    try {
      referenced = queueStore.setDefaultExecPresetId(workspace, {
        expected_revision: initial.revision,
        preset_id: readback.id
      });
    } catch {
      return { ok: false, step: 'queue_reference_persist' };
    }
    if (!referenced.ok) {
      return { ok: false, step: 'queue_reference_persist' };
    }
    let reference_readback;
    try {
      reference_readback = queueStore.snapshot(workspace);
    } catch {
      return { ok: false, step: 'queue_reference_readback' };
    }
    if (reference_readback.default_exec_preset_id !== readback.id) {
      return { ok: false, step: 'queue_reference_readback' };
    }
    let cleared;
    try {
      cleared = queueStore.clearLegacyExecDefaults(workspace, {
        expected_revision: reference_readback.revision
      });
    } catch {
      return { ok: false, step: 'legacy_clear' };
    }
    if (!cleared.ok) {
      return { ok: false, step: 'legacy_clear' };
    }
    let final;
    try {
      final = queueStore.snapshot(workspace);
    } catch {
      return { ok: false, step: 'queue_clear_readback' };
    }
    if (
      final.default_exec_preset_id !== readback.id ||
      (Object.hasOwn(final, 'exec_defaults') &&
        Object.keys(final.exec_defaults).length !== 0)
    ) {
      return { ok: false, step: 'queue_clear_readback' };
    }
    return { ok: true, migrated: true, preset_id: readback.id };
  }

  /**
   * Startup barrier: complete every registered workspace migration before a
   * scheduler is attached. One failure remains explicit so callers can keep
   * dispatch closed rather than silently falling back through unsafe legacy
   * state.
   *
   * @param {string[]} workspaces
   */
  function migrateWorkspaces(workspaces) {
    /** @type {Array<{ workspace: string, result: ReturnType<typeof migrateWorkspace> }>} */
    const outcomes = [];
    try {
      presetStore.snapshot();
    } catch {
      return { ok: false, step: 'preset_store_normalization', outcomes };
    }
    for (const workspace of workspaces) {
      outcomes.push({ workspace, result: migrateWorkspace(workspace) });
    }
    return { ok: outcomes.every((outcome) => outcome.result.ok), outcomes };
  }

  return {
    snapshot,
    /** @param {{ expected_revision: number, name: string, settings: Record<string, string> }} input */
    create(input) {
      return annotated(presetStore.create(input));
    },
    /** @param {{ expected_revision: number, id: string, name: string, settings: Record<string, string> }} input */
    update(input) {
      const visible = snapshot().presets.some(
        (preset) => preset.id === input.id
      );
      if (!visible) {
        return {
          applied: false,
          conflict: false,
          reason: presetStore
            .snapshot()
            .presets.some((preset) => preset.id === input.id)
            ? 'migration_pending'
            : 'invalid',
          ...snapshot()
        };
      }
      return annotated(presetStore.update(input));
    },
    delete: deletePreset,
    setDefaultExecPreset,
    migrateWorkspace,
    migrateWorkspaces,
    referenceInfo
  };
}
