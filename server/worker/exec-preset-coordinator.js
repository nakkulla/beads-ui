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
  CHIP_BINDING_KEYS,
  GENERAL_PRESET_KV_KEYS,
  ORCHESTRATION_KEYS,
  QUICK_FIX_LANE_MAP,
  execSettingEnums,
  implPresetEnums,
  normalizeAppliesTo,
  presetKeysFor,
  validateImplPresetSettings
} from './exec-enums.js';
import { resolveExecSettings } from './policy.js';
import { discoverQueueStates } from './queue-state-discovery.js';
import { APPLIED_PRESET_FIELDS } from './queue-store.js';

const RESEED_MIGRATION_VERSION = 1;
const PRESET_PROFILE_MIGRATION_VERSION = 1;
/** @type {Readonly<Record<string, string>>} */
const BEAD_SNAPSHOT_PIN_FIELDS = {
  orchestration_model: 'model',
  orchestration_effort: 'effort'
};
/** @type {Array<{ name: string, settings: Record<string, string> }>} */
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

/**
 * @typedef {{ ok: true, preset_id: null, preset_revision: null, exec_preset: import('./queue-store.js').ExecPresetRecord|null, settings: Readonly<Record<string, string>>, exec: any }|{ ok: false, reason: string }} DispatchResolution
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * A preset is legacy only while it carries a key outside ITS OWN profile's
 * vocabulary. The judgement moved from one merged 25-key list to the profile
 * key set, so a general preset still holding a `quick_fix_` key is legacy
 * until the profile split lifts it (design §3.2).
 *
 * @param {ExecPreset} preset
 * @returns {boolean}
 */
function isLegacyPreset(preset) {
  const profile_keys = presetKeysFor(preset.applies_to);
  return Object.keys(preset.settings).some(
    (key) => !profile_keys.includes(key)
  );
}

/**
 * @param {unknown} state
 * @returns {boolean}
 */
function reseedCompleted(state) {
  return (
    isRecord(state) &&
    isRecord(state.reseed_migration) &&
    Number.isInteger(state.reseed_migration.version) &&
    Number(state.reseed_migration.version) > 0
  );
}

/**
 * Project a legacy preset onto its profile's current vocabulary.
 *
 * @param {Record<string, string>} settings
 * @param {unknown} applies_to
 * @returns {Record<string, string>}
 */
function implSubsetOf(settings, applies_to) {
  /** @type {Record<string, string>} */
  const subset = {};
  for (const key of presetKeysFor(applies_to)) {
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
 *   kvSet?: (workspace: string, key: string, value: Record<string, unknown>) => Promise<{ ok: boolean, error?: string }>,
 *   warn?: (message: string) => void
 * }} options
 */
export function createExecPresetCoordinator(options) {
  const queueStore = options.queueStore;
  const presetStore = options.presetStore;
  const discover = options.discover || (() => discoverQueueStates());
  const workspaceKeyFor = options.workspaceKeyFor || ((workspace) => workspace);
  const kvGet = options.kvGet;
  const kvSet = options.kvSet;
  const warn = options.warn ?? console.warn;

  /**
   * Every applicable preset. A preset with a key outside its own profile's
   * vocabulary stays hidden.
   */
  function snapshot() {
    const state = presetStore.snapshot();
    const visible_presets = state.presets.filter(
      (preset) => !isLegacyPreset(preset)
    );
    // A binding onto a preset this snapshot hides is projected as unbound: the
    // file keeps the id, but a client may not offer a target it cannot see.
    const visible_ids = new Set(visible_presets.map((preset) => preset.id));
    /** @type {Record<string, string|null>} */
    const chip_bindings = {};
    for (const chip of CHIP_BINDING_KEYS) {
      const bound = state.chip_bindings?.[chip] ?? null;
      chip_bindings[chip] = bound && visible_ids.has(bound) ? bound : null;
    }
    return {
      revision: state.revision,
      ...(state.read_failed ? { read_failed: true } : {}),
      chip_bindings,
      presets: visible_presets.map((preset) => {
        const coherence = validateImplPresetSettings(preset.settings, {
          applies_to: preset.applies_to
        });
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
    return {
      ...result,
      revision: current.revision,
      presets: current.presets,
      chip_bindings: current.chip_bindings
    };
  }

  /**
   * Whether one edit falsifies the named profile's applied-preset record. Only
   * that profile's key set is compared, so editing a general row leaves the
   * quick_fix record standing and the reverse holds too (design §4.1).
   *
   * The comparison reads STORAGE names, because `before`/`after` are kv or
   * queue objects; the ownership test reads the canonical name, because that
   * is what a preset's `settings` carries.
   *
   * An unreadable or deleted preset cannot identify which changed keys it owned.
   *
   * @param {import('./queue-store.js').AppliedExecPreset|null} applied
   * @param {Record<string, unknown>} before
   * @param {Record<string, unknown>} after
   * @param {unknown} [applies_to]
   */
  function changesAppliedExecPreset(applied, before, after, applies_to) {
    if (!applied) {
      return false;
    }
    const profile = normalizeAppliesTo(applies_to);
    let preset = null;
    try {
      preset =
        snapshot().presets.find((entry) => entry.id === applied.id) || null;
    } catch {
      // Unknown ownership clears provenance on any changed execution key.
    }
    return presetKeysFor(profile).some((key) => {
      const storage_key =
        profile === 'quick_fix' ? QUICK_FIX_LANE_MAP[key] : key;
      return (
        (before[storage_key] ?? null) !== (after[storage_key] ?? null) &&
        (!preset || Object.hasOwn(preset.settings, key))
      );
    });
  }

  /**
   * Compare a Bead's actual pins against the preset this dispatch carries.
   * Both the record and the key set come from the profile, and the preset's
   * settings are read by canonical name in either one — the prefixed lookup
   * went with the prefixed preset keys (design §5).
   *
   * @param {import('./queue-store.js').AppliedExecPreset|null} applied
   * @param {any} bead_snapshot - Includes `applied_exec_preset`, the issue's
   * own preset identity, which outranks the workspace record.
   * @param {unknown} [applies_to]
   * @returns {import('./queue-store.js').ExecPresetRecord|null}
   */
  function dispatchPreset(applied, bead_snapshot, applies_to) {
    const profile = normalizeAppliesTo(applies_to);
    /** @type {Array<any>|null} */
    let visible = null;
    let visible_revision = 0;
    try {
      const current = snapshot();
      visible = current.presets;
      visible_revision = current.revision;
    } catch {
      // The recorded identity survives loss of the comparison profile.
    }
    // Which preset did THIS issue actually carry? A chip apply writes the id
    // onto the Bead, so the Bead's own answer wins over the workspace record
    // whenever it names a preset of this issue's profile (design §7).
    const bead_preset_id =
      typeof bead_snapshot?.applied_exec_preset === 'string' &&
      bead_snapshot.applied_exec_preset.length > 0
        ? bead_snapshot.applied_exec_preset
        : null;
    const own =
      bead_preset_id && visible
        ? visible.find(
            (entry) =>
              entry.id === bead_preset_id &&
              normalizeAppliesTo(entry.applies_to) === profile
          )
        : undefined;
    const identity = own
      ? { id: own.id, name: own.name, revision: visible_revision }
      : applied
        ? { id: applied.id, name: applied.name, revision: applied.revision }
        : null;
    if (!identity) {
      return null;
    }
    /** @type {string[]} */
    const deviated_keys = [];
    try {
      const preset = visible?.find((entry) => entry.id === identity.id);
      if (preset) {
        for (const key of presetKeysFor(profile)) {
          const bead_key = BEAD_SNAPSHOT_PIN_FIELDS[key] || key;
          const pin = bead_snapshot?.[bead_key];
          if (pin === undefined || pin === null || pin === '') {
            continue;
          }
          if (
            Object.hasOwn(preset.settings, key) &&
            pin !== preset.settings[key]
          ) {
            deviated_keys.push(key);
          }
        }
      }
    } catch {
      // The recorded identity survives loss of the comparison profile.
    }
    return { ...identity, deviated_keys };
  }

  /**
   * Resolve launch settings from queue values and attach observational preset
   * identity independently. The preset never supplies execution defaults here.
   *
   * @param {string} workspace
   * @param {any} bead_snapshot
   * @returns {DispatchResolution}
   */
  function resolveForDispatch(workspace, bead_snapshot) {
    const queue = queueStore.snapshot(workspace);
    const quick_fix = bead_snapshot?.route === 'quick_fix';
    /** @type {Record<string, string>} */
    const settings = {};
    for (const key of ORCHESTRATION_KEYS) {
      const queue_values = /** @type {Record<string, unknown>} */ (queue);
      const value = quick_fix
        ? (queue_values[QUICK_FIX_LANE_MAP[key]] ?? queue_values[key])
        : queue_values[key];
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
    const profile = quick_fix ? 'quick_fix' : 'general';
    return Object.freeze({
      ok: true,
      exec_preset: dispatchPreset(
        /** @type {Record<string, any>} */ (/** @type {unknown} */ (queue))[
          APPLIED_PRESET_FIELDS[profile]
        ],
        bead_snapshot,
        profile
      ),
      // Retired fields remain null for older consumers.
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
    for (const key of GENERAL_PRESET_KV_KEYS) {
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
    if (reseedCompleted(state)) {
      return { ok: true, legacy_ids: [] };
    }
    const legacy = state.presets.filter(isLegacyPreset);
    /** @type {string[]} */
    const legacy_ids = [];
    for (const preset of legacy) {
      legacy_ids.push(preset.id);
      const applies_to = normalizeAppliesTo(preset.applies_to);
      const settings = implSubsetOf(preset.settings, applies_to);
      let created;
      try {
        created = presetStore.createOrReuseImplCopy({
          name: preset.name,
          settings,
          source_preset_id: preset.id,
          applies_to
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
   * Replace the server-global preset state once. Readback verification belongs
   * to the store so persistence remains behind its atomic-write boundary.
   */
  function reseedPresets() {
    const state = presetStore.snapshot();
    if (reseedCompleted(state)) {
      return;
    }
    try {
      const replaced = presetStore.replaceAllForReseed({
        presets: RESEED_PRESETS,
        marker: { version: RESEED_MIGRATION_VERSION }
      });
      // A rejected replacement leaves no marker, so every later start retries
      // it forever; without this line that retry loop is silent.
      if (!replaced.applied) {
        warn(`실행 프리셋 재시드 거부: ${replaced.reason ?? 'unknown'}`);
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      warn(`실행 프리셋 재시드 readback 실패: ${detail}`);
    }
  }

  /**
   * Split the stored presets into the general and quick_fix profiles once
   * (design §8). Strictly AFTER the reseed: `replaceAllForReseed` replaces the
   * whole list, so a split that ran first would have its new quick_fix presets
   * and its own marker thrown away. A reseed that has not completed therefore
   * defers the split to the next start, where the missing marker restarts it.
   */
  function splitPresetProfiles() {
    /** @type {{ reseed_migration?: unknown }} */
    let state;
    try {
      state = presetStore.snapshot();
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      warn(`실행 프리셋 계열 분리 상태 읽기 실패: ${detail}`);
      return;
    }
    if (!reseedCompleted(state)) {
      return;
    }
    try {
      const migrated = presetStore.migratePresetProfiles({
        marker: { version: PRESET_PROFILE_MIGRATION_VERSION }
      });
      // A rejection leaves no marker and would otherwise retry silently on
      // every start, exactly like the reseed above.
      if (!migrated.applied && migrated.reason) {
        warn(`실행 프리셋 계열 분리 거부: ${migrated.reason}`);
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      warn(`실행 프리셋 계열 분리 readback 실패: ${detail}`);
    }
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
    // Same gate as the legacy delete above, for the same reason: a deferred
    // workspace still resolves its §F kv source through
    // `default_exec_preset_id`, so replacing the preset list before that
    // workspace has read it would strand the retry with no source.
    if (all_ok) {
      reseedPresets();
      splitPresetProfiles();
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
    changesAppliedExecPreset,
    /** @param {{ expected_revision: number, name: string, settings: Record<string, string>, applies_to?: 'general'|'quick_fix' }} input */
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
    /** @param {{ expected_revision: number, chip: string, preset_id: string|null }} input */
    bindChip(input) {
      return annotated(presetStore.bindChip(input));
    },
    resolveForDispatch,
    migrateWorkspace,
    migrateWorkspaces,
    /**
     * Enum table the WS layer validates an apply against, for one profile.
     *
     * @param {unknown} [applies_to]
     */
    presetEnums: (applies_to) => implPresetEnums(applies_to)
  };
}
