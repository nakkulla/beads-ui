/**
 * Authority boundary for global execution presets and the workspace
 * session-defaults migration (spec §C.6, §F).
 *
 * The preset store remains a persistence primitive and queue-store remains a
 * queue persistence primitive. This coordinator is the only place allowed to
 * couple their revisions or run the migration.
 *
 * @import { ExecPreset } from '../exec-preset-store.js'
 */
import {
  SESSION_DEFAULTS_KV_KEY,
  normalizeSessionDefaults
} from '../session-defaults.js';
import {
  IMPL_PRESET_KEYS,
  ORCHESTRATION_KEYS,
  SESSION_DEFAULT_KEYS,
  execSettingEnums,
  implPresetEnums,
  validateImplPresetSettings
} from './exec-enums.js';
import { resolveExecSettings } from './policy.js';
import { discoverQueueStates } from './queue-state-discovery.js';

/**
 * @typedef {{ ok: true, preset_id: null, preset_revision: null, settings: Readonly<Record<string, string>>, exec: any }|{ ok: false, reason: string }} DispatchResolution
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * A preset is legacy only while it carries a key outside the 15-key
 * full-profile vocabulary.
 *
 * @param {ExecPreset} preset
 * @returns {boolean}
 */
function isLegacyPreset(preset) {
  return Object.keys(preset.settings).some(
    (key) => !IMPL_PRESET_KEYS.includes(key)
  );
}

/**
 * Project a legacy preset onto the current 15-key vocabulary.
 *
 * @param {Record<string, string>} settings
 * @returns {Record<string, string>}
 */
function implSubsetOf(settings) {
  /** @type {Record<string, string>} */
  const subset = {};
  for (const key of IMPL_PRESET_KEYS) {
    if (typeof settings[key] === 'string') {
      subset[key] = settings[key];
    }
  }
  return subset;
}

/**
 * @param {{
 *   queueStore: ReturnType<typeof import('./queue-store.js').createQueueStore>,
 *   presetStore: ReturnType<typeof import('../exec-preset-store.js').createExecPresetStore>,
 *   discover?: () => ReturnType<typeof discoverQueueStates>,
 *   workspaceKeyFor?: (workspace: string) => string,
 *   kvGet?: (workspace: string, key: string) => Promise<{ ok: boolean, value?: Record<string, unknown>, warning?: string, error?: string }>,
 *   kvSet?: (workspace: string, key: string, value: Record<string, unknown>) => Promise<{ ok: boolean, error?: string }>
 * }} options
 */
export function createExecPresetCoordinator(options) {
  const queueStore = options.queueStore;
  const presetStore = options.presetStore;
  const discover = options.discover || (() => discoverQueueStates());
  const workspaceKeyFor = options.workspaceKeyFor || ((workspace) => workspace);
  const kvGet = options.kvGet;
  const kvSet = options.kvSet;

  /**
   * Every applicable preset. A preset with a key outside the current 15-key
   * vocabulary stays hidden.
   */
  function snapshot() {
    const state = presetStore.snapshot();
    return {
      revision: state.revision,
      presets: state.presets
        .filter((preset) => !isLegacyPreset(preset))
        .map((preset) => {
          const coherence = validateImplPresetSettings(preset.settings);
          return {
            ...preset,
            compatible: coherence.ok,
            incompatibility_reason: coherence.ok ? null : coherence.reason
          };
        })
    };
  }

  /**
   * @param {{ applied: boolean, conflict: boolean, revision: number, presets: ExecPreset[] }} result
   */
  function annotated(result) {
    const current = snapshot();
    return { ...result, revision: current.revision, presets: current.presets };
  }

  /**
   * Resolve the workspace launch settings for one dispatch. The workspace layer
   * is now the queue's own three orchestration values (spec §C.5) — there is no
   * preset reference to read, and no session key is supplied here at all.
   *
   * @param {string} workspace
   * @param {any} bead_snapshot
   * @returns {DispatchResolution}
   */
  function resolveForDispatch(workspace, bead_snapshot) {
    const queue = queueStore.snapshot(workspace);
    /** @type {Record<string, string>} */
    const settings = {};
    for (const key of ORCHESTRATION_KEYS) {
      const value = /** @type {Record<string, unknown>} */ (queue)[key];
      if (typeof value === 'string') {
        settings[key] = value;
      }
    }
    const raw_exec = resolveExecSettings({
      bead: bead_snapshot,
      defaults: settings
    });
    const exec = Object.freeze({
      ...raw_exec,
      stamped_keys: Object.freeze([...raw_exec.stamped_keys])
    });
    return Object.freeze({
      ok: true,
      // No preset is referenced any more; the provenance fields stay so an
      // attempt record written before this change keeps the same shape.
      preset_id: null,
      preset_revision: null,
      settings: Object.freeze(settings),
      exec
    });
  }

  /**
   * @param {{ expected_revision: number, id: string }} input
   */
  function deletePreset(input) {
    const current = snapshot();
    const preset = current.presets.find((entry) => entry.id === input?.id);
    if (!preset) {
      return { applied: false, conflict: false, reason: 'invalid', ...current };
    }
    return annotated(presetStore.delete(input));
  }

  /**
   * Fill the kv session layer's EMPTY fields from one legacy settings map.
   * Fill-only-empty is what makes a re-run harmless: a value the user has since
   * chosen is never overwritten.
   *
   * @param {string} workspace
   * @param {Record<string, string>} legacy_settings
   * @returns {Promise<{ ok: boolean, step?: string }>}
   */
  async function fillKvSessionDefaults(workspace, legacy_settings) {
    if (!kvGet || !kvSet) {
      return { ok: false, step: 'kv_unavailable' };
    }
    const enums = execSettingEnums();
    /** @type {Record<string, string>} */
    const candidates = {};
    for (const key of SESSION_DEFAULT_KEYS) {
      const value = legacy_settings[key];
      const allowed = enums[key];
      if (
        typeof value === 'string' &&
        Array.isArray(allowed) &&
        allowed.includes(value)
      ) {
        candidates[key] = value;
      }
    }
    const read = await kvGet(workspace, SESSION_DEFAULTS_KV_KEY);
    if (!read.ok) {
      return { ok: false, step: 'kv_read' };
    }
    const current = normalizeSessionDefaults(read.value).values;
    /** @type {Record<string, unknown>} */
    const next = isRecord(read.value) ? { ...read.value } : {};
    next.schema = 1;
    let changed = false;
    for (const [key, value] of Object.entries(candidates)) {
      if (!Object.hasOwn(current, key)) {
        next[key] = value;
        changed = true;
      }
    }
    if (!changed) {
      return { ok: true };
    }
    const written = await kvSet(workspace, SESSION_DEFAULTS_KV_KEY, next);
    if (!written.ok) {
      return { ok: false, step: 'kv_write' };
    }
    const readback = await kvGet(workspace, SESSION_DEFAULTS_KV_KEY);
    if (!readback.ok) {
      return { ok: false, step: 'kv_readback' };
    }
    const confirmed = normalizeSessionDefaults(readback.value).values;
    for (const key of Object.keys(candidates)) {
      if (!Object.hasOwn(confirmed, key)) {
        return { ok: false, step: 'kv_readback' };
      }
    }
    return { ok: true };
  }

  /**
   * Fill the queue's EMPTY orchestration values from one legacy settings map.
   *
   * @param {string} workspace
   * @param {Record<string, string>} legacy_settings
   * @returns {{ ok: boolean, step?: string }}
   */
  function fillQueueOrchestration(workspace, legacy_settings) {
    const queue = queueStore.snapshot(workspace);
    /** @type {Record<string, string|null>} */
    const patch = {};
    for (const key of ORCHESTRATION_KEYS) {
      const value = legacy_settings[key];
      const current = /** @type {Record<string, unknown>} */ (queue)[key];
      if (typeof value === 'string' && current === null) {
        patch[key] = value;
      }
    }
    if (Object.keys(patch).length === 0) {
      return { ok: true };
    }
    let result;
    try {
      result = queueStore.setOrchestrationDefaults(workspace, {
        expected_revision: queue.revision,
        values: patch
      });
    } catch {
      return { ok: false, step: 'queue_orchestration_write' };
    }
    if (!result.ok) {
      return { ok: false, step: 'queue_orchestration_write' };
    }
    const readback = queueStore.snapshot(workspace);
    for (const [key, value] of Object.entries(patch)) {
      if (/** @type {Record<string, unknown>} */ (readback)[key] !== value) {
        return { ok: false, step: 'queue_orchestration_readback' };
      }
    }
    return { ok: true };
  }

  /**
   * Create the implementation-key copy of every legacy preset and read each one
   * back. Server-global, so it runs once per migration pass rather than per
   * workspace.
   *
   * @returns {{ ok: boolean, step?: string, legacy_ids: string[] }}
   */
  function copyLegacyPresets() {
    const state = presetStore.snapshot();
    const legacy = state.presets.filter(isLegacyPreset);
    /** @type {string[]} */
    const legacy_ids = [];
    for (const preset of legacy) {
      legacy_ids.push(preset.id);
      const settings = implSubsetOf(preset.settings);
      let created;
      try {
        created = presetStore.createOrReuseImplCopy({
          name: preset.name,
          settings,
          source_preset_id: preset.id
        });
      } catch {
        return { ok: false, step: 'preset_copy_persist', legacy_ids };
      }
      if (!('preset' in created)) {
        return { ok: false, step: 'preset_copy_persist', legacy_ids };
      }
      const readback = presetStore
        .snapshot()
        .presets.find((entry) => entry.id === created.preset.id);
      if (!readback) {
        return { ok: false, step: 'preset_copy_readback', legacy_ids };
      }
    }
    return { ok: true, legacy_ids };
  }

  /**
   * Read the legacy source for one workspace: the settings its retired preset
   * reference (or raw `exec_defaults` map) supplied. Read from the RAW queue
   * file, because `queue-store` no longer normalizes either field.
   *
   * @param {string} workspace
   * @returns {{ ok: boolean, step?: string, settings?: Record<string, string>, present?: boolean }}
   */
  function legacySourceFor(workspace) {
    const workspace_key = workspaceKeyFor(workspace);
    const discovered = discover();
    if (!discovered.complete) {
      return { ok: false, step: 'legacy_discovery_incomplete' };
    }
    const state = discovered.states.find(
      (entry) => entry.workspace_key === workspace_key
    );
    if (!state || state.status === 'absent') {
      return { ok: true, present: false };
    }
    if (state.status !== 'ok' || !state.raw) {
      return { ok: false, step: 'legacy_discovery_incomplete' };
    }
    const raw = state.raw;
    /** @type {Record<string, string>} */
    const settings = {};
    if (isRecord(raw.exec_defaults)) {
      for (const [key, value] of Object.entries(raw.exec_defaults)) {
        if (typeof value === 'string') {
          settings[key] = value;
        }
      }
    }
    if (typeof raw.default_exec_preset_id === 'string') {
      const referenced = presetStore
        .snapshot()
        .presets.find((entry) => entry.id === raw.default_exec_preset_id);
      if (referenced) {
        // The referenced preset is the more specific source: it is what dispatch
        // actually used, so it overlays the raw map rather than the reverse.
        Object.assign(settings, referenced.settings);
      }
    }
    const present =
      Object.hasOwn(raw, 'exec_defaults') ||
      Object.hasOwn(raw, 'default_exec_preset_id');
    return { ok: true, present, settings };
  }

  /**
   * Run the spec §F migration for one workspace: fill the kv session layer, the
   * queue's orchestration values, and the implementation-preset copies, each
   * fill-only-empty. The completion marker and the source cleanup happen ONLY
   * after all three destinations read back; a partial pass leaves no marker and
   * re-converges on the next start.
   *
   * @param {string} workspace
   * @param {{ legacy_ids?: string[] }} [shared] - Legacy preset ids already
   * copied in this pass, so the per-workspace cleanup can drop them.
   */
  /**
   * Remove the legacy queue fields and CONFIRM their absence by readback.
   * Idempotent: a queue with no legacy fields left succeeds immediately.
   *
   * @param {string} workspace
   * @param {{ legacy_ids?: string[] }} shared
   * @returns {{ ok: boolean, step?: string }}
   */
  function finalizeLegacyCleanup(workspace, shared) {
    const snapshot = /** @type {Record<string, unknown>} */ (
      /** @type {unknown} */ (queueStore.snapshot(workspace))
    );
    const has_legacy =
      Object.hasOwn(snapshot, 'default_exec_preset_id') ||
      Object.hasOwn(snapshot, 'exec_defaults');
    if (has_legacy) {
      try {
        queueStore.clearLegacyExecFields(workspace, {
          expected_revision: /** @type {any} */ (snapshot).revision
        });
      } catch {
        return { ok: false, step: 'legacy_cleanup_write' };
      }
      const readback = /** @type {Record<string, unknown>} */ (
        /** @type {unknown} */ (queueStore.snapshot(workspace))
      );
      if (
        Object.hasOwn(readback, 'default_exec_preset_id') ||
        Object.hasOwn(readback, 'exec_defaults')
      ) {
        return { ok: false, step: 'legacy_cleanup_readback' };
      }
    }
    if (Array.isArray(shared.legacy_ids) && shared.legacy_ids.length > 0) {
      presetStore.deletePresets(shared.legacy_ids);
    }
    return { ok: true };
  }

  /**
   * @param {string} workspace
   * @param {{ legacy_ids?: string[] }} [shared]
   */
  async function migrateWorkspace(workspace, shared = {}) {
    const queue = queueStore.snapshot(workspace);
    if (queue.session_defaults_migration) {
      // The marker proves the FILLS completed, not the cleanup: a crash
      // between the marker write and the legacy-field removal must not leave
      // the residue behind forever, so cleanup re-runs until readback-clean.
      const cleaned = finalizeLegacyCleanup(workspace, shared);
      if (!cleaned.ok) {
        return { ok: false, step: cleaned.step };
      }
      return { ok: true, migrated: false };
    }
    const source = legacySourceFor(workspace);
    if (!source.ok) {
      return { ok: false, step: source.step };
    }
    if (!source.present) {
      return { ok: true, migrated: false };
    }
    const settings = source.settings || {};

    const kv_filled = await fillKvSessionDefaults(workspace, settings);
    if (!kv_filled.ok) {
      return { ok: false, step: kv_filled.step };
    }
    const queue_filled = fillQueueOrchestration(workspace, settings);
    if (!queue_filled.ok) {
      return { ok: false, step: queue_filled.step };
    }

    const marked = queueStore.markSessionDefaultsMigrated(workspace, {
      expected_revision: queueStore.snapshot(workspace).revision
    });
    if (!marked.ok) {
      return { ok: false, step: 'marker_write' };
    }
    if (!queueStore.snapshot(workspace).session_defaults_migration) {
      return { ok: false, step: 'marker_readback' };
    }

    // Source cleanup is strictly after the marker, so a crash between them
    // simply re-runs the fills; the cleanup itself is readback-confirmed and,
    // when interrupted, re-runs on the next start through the marker branch.
    const cleaned = finalizeLegacyCleanup(workspace, shared);
    if (!cleaned.ok) {
      return { ok: false, step: cleaned.step };
    }
    return { ok: true, migrated: true };
  }

  /**
   * Startup barrier: migrate every registered workspace. The preset copies are
   * server-global, so they are created ONCE up front and only deleted after
   * every workspace's marker is written.
   *
   * @param {string[]} workspaces
   */
  async function migrateWorkspaces(workspaces) {
    /** @type {Array<{ workspace: string, result: any }>} */
    const outcomes = [];
    try {
      presetStore.snapshot();
    } catch {
      return { ok: false, step: 'preset_store_normalization', outcomes };
    }
    const copied = copyLegacyPresets();
    if (!copied.ok) {
      return { ok: false, step: copied.step, outcomes };
    }
    for (const workspace of workspaces) {
      outcomes.push({
        workspace,
        result: await migrateWorkspace(workspace, {})
      });
    }
    const all_ok = outcomes.every((outcome) => outcome.result.ok);
    if (all_ok && copied.legacy_ids.length > 0) {
      presetStore.deletePresets(copied.legacy_ids);
    }
    // A workspace that could not be migrated is DEFERRED, not fatal: its own
    // durable state is untouched (fill-only-empty, marker unwritten), so the
    // next start retries it. Failing the whole pass would be read as "nothing
    // may run" by the startup gate and would close the worker runtime for every
    // OTHER workspace — a per-workspace bd database that refuses to open must
    // not have that reach.
    const deferred = outcomes
      .filter((outcome) => !outcome.result.ok)
      .map((outcome) => outcome.workspace);
    return { ok: true, deferred, outcomes };
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
          reason: 'invalid',
          ...snapshot()
        };
      }
      return annotated(presetStore.update(input));
    },
    delete: deletePreset,
    resolveForDispatch,
    migrateWorkspace,
    migrateWorkspaces,
    /** Enum table the WS layer validates an apply against. */
    presetEnums: () => implPresetEnums()
  };
}
