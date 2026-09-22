/**
 * Server-global execution preset persistence.
 *
 * A preset belongs to one profile (`applies_to`) and sparsely carries that
 * profile's canonical keys: 17 for `general`, 8 for `quick_fix`. No stored
 * preset carries a `quick_fix_` prefixed key any more (design §3).
 *
 * @typedef {Object} ExecPreset
 * @property {string} id
 * @property {string} name
 * @property {'general'|'quick_fix'} applies_to
 * @property {Record<string, string>} settings
 * @property {{ kind: 'user' }|{ kind: 'workspace-exec-defaults', workspace_key: string, source_digest: string }|{ kind: 'legacy-preset-copy', source_preset_id: string }} origin
 */
/**
 * @typedef {Object} ExecPresetState
 * @property {number} revision
 * @property {ExecPreset[]} presets
 * @property {Record<string, string|null>} chip_bindings - Which preset each
 * judgement chip applies, under the SAME revision CAS as the list it points
 * into, so deleting a preset and unbinding it is one mutation (design §3.1).
 * @property {{ version: number }} [reseed_migration]
 * @property {{ version: number }} [preset_profile_migration]
 */
import crypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import {
  CHIP_BINDING_KEYS,
  QUICK_FIX_LANE_MAP,
  implPresetEnums,
  normalizeAppliesTo,
  validateImplPresetSettings
} from './worker/exec-enums.js';
import { execPresetsFilePath } from './worker/state-paths.js';

/**
 * Name of every quick_fix preset the profile migration creates. Fixed by
 * design §8.3: a name derived from the values would be arbitrary, and the
 * existing collision rule appends ` 2` when a second combination exists.
 */
const MIGRATED_QUICK_FIX_NAME = 'quick fix 기본';

/**
 * The quick_fix storage key of each canonical key, reversed once for the
 * migration's lift of legacy `quick_fix_*` settings.
 *
 * @type {Record<string, string>}
 */
const CANONICAL_BY_QUICK_FIX_KEY = Object.fromEntries(
  Object.entries(QUICK_FIX_LANE_MAP).map(([canonical_key, storage_key]) => [
    storage_key,
    canonical_key
  ])
);

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/** @returns {Record<string, string|null>} */
function emptyChipBindings() {
  /** @type {Record<string, string|null>} */
  const bindings = {};
  for (const chip of CHIP_BINDING_KEYS) {
    bindings[chip] = null;
  }
  return bindings;
}

/** @returns {ExecPresetState} */
function emptyState() {
  return { revision: 0, presets: [], chip_bindings: emptyChipBindings() };
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Normalize durable state without validating values against the current model
 * catalog. Known string values survive catalog changes so the UI can show them
 * as incompatible instead of silently deleting them.
 *
 * @param {unknown} raw
 * @returns {ExecPresetState}
 */
function normalizeState(raw) {
  const state = emptyState();
  if (!isRecord(raw)) {
    return state;
  }
  if (Number.isInteger(raw.revision) && Number(raw.revision) >= 0) {
    state.revision = Number(raw.revision);
  }
  if (
    isRecord(raw.reseed_migration) &&
    Number.isInteger(raw.reseed_migration.version) &&
    Number(raw.reseed_migration.version) > 0
  ) {
    state.reseed_migration = {
      version: Number(raw.reseed_migration.version)
    };
  }
  if (
    isRecord(raw.preset_profile_migration) &&
    Number.isInteger(raw.preset_profile_migration.version) &&
    Number(raw.preset_profile_migration.version) > 0
  ) {
    state.preset_profile_migration = {
      version: Number(raw.preset_profile_migration.version)
    };
  }
  // A key outside the chip vocabulary is dropped and an absent field reads as
  // three unbound chips, so a file written before this design loads clean.
  if (isRecord(raw.chip_bindings)) {
    for (const chip of CHIP_BINDING_KEYS) {
      const value = raw.chip_bindings[chip];
      state.chip_bindings[chip] =
        typeof value === 'string' && value.trim().length > 0
          ? value.trim()
          : null;
    }
  }
  if (!Array.isArray(raw.presets)) {
    return state;
  }
  // Load keeps every string setting except the retired preset-only
  // `workflow_mode`, including one outside the current
  // vocabulary: the write path is what enforces the profile's key set, and the
  // coordinator needs an unknown key to survive to classify its preset as
  // legacy and hide it. Stripping here would delete the only evidence and
  // re-expose the preset with truncated settings.
  for (const entry of raw.presets) {
    if (!isRecord(entry)) {
      continue;
    }
    const id = typeof entry.id === 'string' ? entry.id.trim() : '';
    const name = typeof entry.name === 'string' ? entry.name.trim() : '';
    if (id.length === 0 || name.length === 0) {
      continue;
    }
    /** @type {Record<string, string>} */
    const settings = {};
    if (isRecord(entry.settings)) {
      for (const [key, value] of Object.entries(entry.settings)) {
        if (key !== 'workflow_mode' && typeof value === 'string') {
          settings[key] = value;
        }
      }
    }
    const origin =
      isRecord(entry.origin) &&
      entry.origin.kind === 'legacy-preset-copy' &&
      typeof entry.origin.source_preset_id === 'string' &&
      entry.origin.source_preset_id.length > 0
        ? {
            kind: /** @type {'legacy-preset-copy'} */ ('legacy-preset-copy'),
            source_preset_id: entry.origin.source_preset_id
          }
        : isRecord(entry.origin) &&
            entry.origin.kind === 'workspace-exec-defaults' &&
            typeof entry.origin.workspace_key === 'string' &&
            entry.origin.workspace_key.length > 0 &&
            typeof entry.origin.source_digest === 'string' &&
            entry.origin.source_digest.length > 0
          ? {
              kind: /** @type {'workspace-exec-defaults'} */ (
                'workspace-exec-defaults'
              ),
              workspace_key: entry.origin.workspace_key,
              source_digest: entry.origin.source_digest
            }
          : { kind: /** @type {'user'} */ ('user') };
    state.presets.push({
      id,
      name,
      applies_to: normalizeAppliesTo(entry.applies_to),
      settings,
      origin
    });
  }
  return state;
}

/**
 * @param {{ filePath?: string, fs?: typeof import('node:fs'), randomUUID?: () => string, settingEnums?: (applies_to: 'general'|'quick_fix') => Record<string, ReadonlyArray<string>> }} [options]
 */
export function createExecPresetStore(options = {}) {
  const file_path = options.filePath || execPresetsFilePath();
  const fs = options.fs || nodeFs;
  const randomUUID = options.randomUUID || (() => crypto.randomUUID());
  const settingEnums =
    options.settingEnums ||
    ((/** @type {'general'|'quick_fix'} */ applies_to) =>
      implPresetEnums(applies_to));
  /** @type {ExecPresetState|null} */
  let cache = null;
  // Observation only: never persist the cached read failure with preset data.
  let read_failed = false;

  /**
   * Adopt state that was read or written successfully, so a later create after
   * an unreadable file stops reporting read_failed for bytes now known good.
   *
   * @param {ExecPresetState} next
   * @returns {ExecPresetState}
   */
  function commitCache(next) {
    cache = next;
    read_failed = false;
    return cache;
  }

  /** @returns {ExecPresetState} */
  function ensureLoaded() {
    if (cache) {
      return cache;
    }
    let parsed;
    try {
      const raw = fs.readFileSync(file_path, 'utf8');
      parsed = JSON.parse(raw);
    } catch (err) {
      read_failed =
        /** @type {NodeJS.ErrnoException} */ (err).code !== 'ENOENT';
      cache = emptyState();
      return cache;
    }
    const normalized = normalizeState(parsed);
    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      persist(normalized);
      const readback = JSON.parse(fs.readFileSync(file_path, 'utf8'));
      if (JSON.stringify(readback) !== JSON.stringify(normalized)) {
        throw new Error(
          'Normalized exec preset state failed readback verification'
        );
      }
    }
    return commitCache(normalized);
  }

  /**
   * @param {ExecPresetState} state
   */
  function persist(state) {
    fs.mkdirSync(path.dirname(file_path), { recursive: true });
    const tmp_path = `${file_path}.tmp`;
    try {
      fs.writeFileSync(tmp_path, JSON.stringify(state, null, 2));
      fs.renameSync(tmp_path, file_path);
    } catch (err) {
      try {
        fs.rmSync?.(tmp_path, { force: true });
      } catch {
        // Preserve the original persistence error.
      }
      throw err;
    }
  }

  /**
   * @param {ExecPresetState} state
   * @param {boolean} conflict
   * @param {string} [reason]
   */
  function rejected(state, conflict, reason) {
    return {
      applied: false,
      conflict,
      revision: state.revision,
      presets: clone(state.presets),
      chip_bindings: clone(state.chip_bindings ?? emptyChipBindings()),
      ...(reason ? { reason } : {})
    };
  }

  /**
   * Judge one write against the profile it is written for. An absent or
   * unknown `applies_to` reads as `general`, the same rule the load path uses,
   * so the two layers cannot disagree about which key set applies.
   *
   * @param {unknown} name
   * @param {unknown} settings
   * @param {unknown} applies_to
   * @returns {{ name: string, applies_to: 'general'|'quick_fix', settings: Record<string, string> }|null}
   */
  function normalizeMutation(name, settings, applies_to) {
    const trimmed_name = typeof name === 'string' ? name.trim() : '';
    if (trimmed_name.length === 0 || !isRecord(settings)) {
      return null;
    }
    const profile = normalizeAppliesTo(applies_to);
    const enums = settingEnums(profile);
    /** @type {Record<string, string>} */
    const normalized_settings = {};
    for (const [key, value] of Object.entries(settings)) {
      const allowed = enums[key];
      if (
        !Array.isArray(allowed) ||
        typeof value !== 'string' ||
        !allowed.includes(value)
      ) {
        return null;
      }
      normalized_settings[key] = value;
    }
    if (
      !validateImplPresetSettings(normalized_settings, {
        applies_to: profile
      }).ok
    ) {
      return null;
    }
    return {
      name: trimmed_name,
      applies_to: profile,
      settings: normalized_settings
    };
  }

  /**
   * @param {number} expected_revision
   * @param {(next: ExecPresetState) => boolean} mutate
   */
  function applyMutation(expected_revision, mutate) {
    const current = ensureLoaded();
    if (!Number.isInteger(expected_revision) || expected_revision < 0) {
      return rejected(current, false, 'invalid');
    }
    if (expected_revision !== current.revision) {
      return rejected(current, true);
    }
    const next = clone(current);
    if (!mutate(next)) {
      return rejected(current, false, 'invalid');
    }
    next.revision = current.revision + 1;
    persist(next);
    commitCache(next);
    return {
      applied: true,
      conflict: false,
      revision: next.revision,
      presets: clone(next.presets),
      chip_bindings: clone(next.chip_bindings)
    };
  }

  return {
    /** @returns {ExecPresetState & { read_failed?: boolean }} */
    snapshot() {
      const state = clone(ensureLoaded());
      return { ...state, ...(read_failed ? { read_failed: true } : {}) };
    },

    /**
     * Create one preset in the requested profile. Name collisions are judged
     * ACROSS profiles: the file is one list, and two presets sharing a name
     * would make the compare tab's name display ambiguous (design §3.1).
     *
     * @param {{ expected_revision: number, name: string, settings: Record<string, string>, applies_to?: 'general'|'quick_fix' }} input
     */
    create(input) {
      const normalized = normalizeMutation(
        input?.name,
        input?.settings,
        input?.applies_to
      );
      return applyMutation(input?.expected_revision, (next) => {
        if (!normalized) {
          return false;
        }
        const folded_name = normalized.name.toLowerCase();
        if (
          next.presets.some(
            (preset) => preset.name.toLowerCase() === folded_name
          )
        ) {
          return false;
        }
        next.presets.push({
          id: randomUUID(),
          name: normalized.name,
          applies_to: normalized.applies_to,
          settings: normalized.settings,
          origin: { kind: 'user' }
        });
        return true;
      });
    },

    /**
     * Rewrite one preset's name and settings within ITS OWN profile. Changing
     * a preset's profile is not part of this design, so the stored value wins
     * over anything a caller might pass.
     *
     * @param {{ expected_revision: number, id: string, name: string, settings: Record<string, string> }} input
     */
    update(input) {
      const id = typeof input?.id === 'string' ? input.id : '';
      return applyMutation(input?.expected_revision, (next) => {
        if (id.length === 0) {
          return false;
        }
        const index = next.presets.findIndex((preset) => preset.id === id);
        if (index < 0) {
          return false;
        }
        const applies_to = normalizeAppliesTo(next.presets[index].applies_to);
        const normalized = normalizeMutation(
          input?.name,
          input?.settings,
          applies_to
        );
        if (!normalized) {
          return false;
        }
        const folded_name = normalized.name.toLowerCase();
        if (
          next.presets.some(
            (preset, preset_index) =>
              preset_index !== index &&
              preset.name.toLowerCase() === folded_name
          )
        ) {
          return false;
        }
        next.presets[index] = {
          id,
          name: normalized.name,
          applies_to,
          settings: normalized.settings,
          origin: next.presets[index].origin
        };
        return true;
      });
    },

    /**
     * Delete one preset and, in the SAME mutation, drop every chip binding
     * that pointed at it — a binding onto a deleted id could never be applied
     * and would outlive the id forever (design §3.2).
     *
     * @param {{ expected_revision: number, id: string }} input
     */
    delete(input) {
      const id = typeof input?.id === 'string' ? input.id : '';
      return applyMutation(input?.expected_revision, (next) => {
        const index = next.presets.findIndex((preset) => preset.id === id);
        if (index < 0) {
          return false;
        }
        next.presets.splice(index, 1);
        for (const chip of CHIP_BINDING_KEYS) {
          if (next.chip_bindings[chip] === id) {
            next.chip_bindings[chip] = null;
          }
        }
        return true;
      });
    },

    /**
     * Hang one judgement chip on one `general` preset, or unbind it with
     * `preset_id: null`. A `quick_fix` preset is refused because a chip click
     * never runs on a `route=quick_fix` issue, so such a binding would be
     * unreachable (design §3.2).
     *
     * @param {{ expected_revision: number, chip: string, preset_id: string|null }} input
     * @returns {ReturnType<typeof applyMutation>}
     */
    bindChip(input) {
      const chip = typeof input?.chip === 'string' ? input.chip : '';
      const preset_id =
        typeof input?.preset_id === 'string' ? input.preset_id : null;
      return applyMutation(input?.expected_revision, (next) => {
        if (!CHIP_BINDING_KEYS.includes(chip)) {
          return false;
        }
        if (preset_id !== null) {
          const preset = next.presets.find((entry) => entry.id === preset_id);
          if (!preset || normalizeAppliesTo(preset.applies_to) !== 'general') {
            return false;
          }
        }
        next.chip_bindings[chip] = preset_id;
        return true;
      });
    },

    /**
     * Create or reuse the implementation-key copy of one legacy 12-key preset
     * (spec §F.c). `source_preset_id` is the idempotency key, so re-running a
     * migration that stopped before its completion marker never duplicates the
     * copy, and the copy COEXISTS with its source until cleanup.
     *
     * @param {{ name: string, settings: Record<string, string>, source_preset_id: string, applies_to?: 'general'|'quick_fix' }} input
     */
    createOrReuseImplCopy(input) {
      const normalized = normalizeMutation(
        input?.name,
        input?.settings,
        input?.applies_to
      );
      const source_preset_id =
        typeof input?.source_preset_id === 'string'
          ? input.source_preset_id
          : '';
      const current = ensureLoaded();
      if (!normalized || !source_preset_id) {
        return rejected(current, false, 'invalid');
      }
      const existing = current.presets.find(
        (preset) =>
          preset.origin.kind === 'legacy-preset-copy' &&
          preset.origin.source_preset_id === source_preset_id
      );
      if (existing) {
        return {
          applied: false,
          reused: true,
          conflict: false,
          revision: current.revision,
          preset: clone(existing),
          presets: clone(current.presets),
          chip_bindings: clone(current.chip_bindings ?? emptyChipBindings())
        };
      }
      const next = clone(current);
      let name = normalized.name;
      let ordinal = 2;
      while (
        next.presets.some(
          (preset) => preset.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        name = `${normalized.name} ${ordinal++}`;
      }
      const preset = {
        id: randomUUID(),
        name,
        applies_to: normalized.applies_to,
        settings: normalized.settings,
        origin: {
          kind: /** @type {'legacy-preset-copy'} */ ('legacy-preset-copy'),
          source_preset_id
        }
      };
      next.presets.push(preset);
      next.revision = current.revision + 1;
      persist(next);
      commitCache(next);
      return {
        applied: true,
        reused: false,
        conflict: false,
        revision: next.revision,
        preset: clone(preset),
        presets: clone(next.presets),
        chip_bindings: clone(next.chip_bindings ?? emptyChipBindings())
      };
    },

    /**
     * Delete presets by id without a CAS guard. Migration-only cleanup of the
     * retired 12-key originals, run after the completion marker.
     *
     * @param {string[]} ids
     */
    deletePresets(ids) {
      const current = ensureLoaded();
      const removing = new Set(Array.isArray(ids) ? ids : []);
      const remaining = current.presets.filter(
        (preset) => !removing.has(preset.id)
      );
      if (remaining.length === current.presets.length) {
        return {
          applied: false,
          conflict: false,
          revision: current.revision,
          presets: clone(current.presets),
          chip_bindings: clone(current.chip_bindings ?? emptyChipBindings())
        };
      }
      const next = {
        ...current,
        revision: current.revision + 1,
        presets: remaining
      };
      persist(next);
      commitCache(next);
      return {
        applied: true,
        conflict: false,
        revision: next.revision,
        presets: clone(next.presets),
        chip_bindings: clone(next.chip_bindings ?? emptyChipBindings())
      };
    },

    /**
     * Atomically replace every preset and record the server-global reseed
     * marker in the same state-file rename.
     *
     * @param {{ presets: Array<{ name: string, settings: Record<string, string>, applies_to?: 'general'|'quick_fix' }>, marker: { version: number } }} input
     */
    replaceAllForReseed(input) {
      const current = ensureLoaded();
      if (current.reseed_migration) {
        return {
          applied: false,
          conflict: false,
          revision: current.revision,
          presets: clone(current.presets),
          chip_bindings: clone(current.chip_bindings ?? emptyChipBindings())
        };
      }
      if (
        !Array.isArray(input?.presets) ||
        !isRecord(input?.marker) ||
        !Number.isInteger(input.marker.version) ||
        input.marker.version <= 0
      ) {
        return rejected(current, false, 'invalid');
      }
      /** @type {ExecPreset[]} */
      const presets = [];
      const names = new Set();
      for (const seed of input.presets) {
        const normalized = normalizeMutation(
          seed?.name,
          seed?.settings,
          seed?.applies_to
        );
        if (!normalized) {
          return rejected(current, false, 'invalid');
        }
        const folded_name = normalized.name.toLowerCase();
        if (names.has(folded_name)) {
          return rejected(current, false, 'invalid');
        }
        names.add(folded_name);
        presets.push({
          id: randomUUID(),
          name: normalized.name,
          applies_to: normalized.applies_to,
          settings: normalized.settings,
          origin: { kind: 'user' }
        });
      }
      // Every id in the list is replaced, so no binding can survive the reseed.
      const next = {
        revision: current.revision + 1,
        presets,
        chip_bindings: emptyChipBindings(),
        reseed_migration: { version: input.marker.version }
      };
      persist(next);
      let readback;
      try {
        readback = JSON.parse(fs.readFileSync(file_path, 'utf8'));
      } catch (err) {
        throw new Error('Exec preset reseed failed readback verification', {
          cause: err
        });
      }
      if (JSON.stringify(readback) !== JSON.stringify(next)) {
        throw new Error('Exec preset reseed failed readback verification');
      }
      commitCache(next);
      return {
        applied: true,
        conflict: false,
        revision: next.revision,
        presets: clone(next.presets),
        chip_bindings: clone(next.chip_bindings ?? emptyChipBindings())
      };
    },

    /**
     * Split every stored preset into the two profiles in ONE state-file
     * rename, and record the completion marker in that same write (design §8).
     *
     * Each existing entry keeps its id, name, origin, list position, and every
     * non-quick_fix setting, and becomes a `general` preset. The lifted
     * `quick_fix_*` values return to their canonical names and are grouped by
     * VALUE: one `quick_fix` preset per distinct non-empty combination, named
     * after the design's fixed name rather than after any model token.
     *
     * Values are carried over WITHOUT revalidation, exactly as the load path
     * preserves them: this is a format transform of settings a user already
     * stored, and a token the catalog has since dropped must keep showing as
     * incompatible instead of failing every boot.
     *
     * The marker makes the whole thing idempotent, so an interrupted run
     * simply repeats from the step whose marker is missing.
     *
     * @param {{ marker: { version: number } }} input
     */
    migratePresetProfiles(input) {
      const current = ensureLoaded();
      if (current.preset_profile_migration) {
        return {
          applied: false,
          conflict: false,
          revision: current.revision,
          presets: clone(current.presets),
          chip_bindings: clone(current.chip_bindings ?? emptyChipBindings())
        };
      }
      if (
        !isRecord(input?.marker) ||
        !Number.isInteger(input.marker.version) ||
        input.marker.version <= 0
      ) {
        return rejected(current, false, 'invalid');
      }
      /** @type {ExecPreset[]} */
      const presets = [];
      /** @type {Map<string, { settings: Record<string, string>, source_preset_id: string }>} */
      const quick_fix_groups = new Map();
      for (const preset of current.presets) {
        // A preset that already declares the quick_fix profile carries no
        // prefixed key and is not a legacy entry: re-running the split after a
        // lost marker must leave it alone rather than demote it to general.
        if (normalizeAppliesTo(preset.applies_to) === 'quick_fix') {
          presets.push(clone(preset));
          continue;
        }
        /** @type {Record<string, string>} */
        const general_settings = {};
        for (const [key, value] of Object.entries(preset.settings)) {
          if (!CANONICAL_BY_QUICK_FIX_KEY[key]) {
            general_settings[key] = value;
          }
        }
        presets.push({
          id: preset.id,
          name: preset.name,
          applies_to: 'general',
          settings: general_settings,
          origin: clone(preset.origin)
        });
        // Build the lifted object in one fixed key order so two presets that
        // stored the same values in a different order group together.
        /** @type {Record<string, string>} */
        const quick_fix_settings = {};
        for (const [canonical_key, storage_key] of Object.entries(
          QUICK_FIX_LANE_MAP
        )) {
          const value = preset.settings[storage_key];
          if (typeof value === 'string') {
            quick_fix_settings[canonical_key] = value;
          }
        }
        if (Object.keys(quick_fix_settings).length === 0) {
          continue;
        }
        const group_key = JSON.stringify(quick_fix_settings);
        if (!quick_fix_groups.has(group_key)) {
          quick_fix_groups.set(group_key, {
            settings: quick_fix_settings,
            source_preset_id: preset.id
          });
        }
      }
      for (const group of quick_fix_groups.values()) {
        let name = MIGRATED_QUICK_FIX_NAME;
        let ordinal = 2;
        while (
          presets.some(
            (preset) => preset.name.toLowerCase() === name.toLowerCase()
          )
        ) {
          name = `${MIGRATED_QUICK_FIX_NAME} ${ordinal++}`;
        }
        presets.push({
          id: randomUUID(),
          name,
          applies_to: 'quick_fix',
          settings: group.settings,
          origin: {
            kind: 'legacy-preset-copy',
            source_preset_id: group.source_preset_id
          }
        });
      }
      const next = {
        ...current,
        revision: current.revision + 1,
        presets,
        preset_profile_migration: { version: input.marker.version }
      };
      persist(next);
      let readback;
      try {
        readback = JSON.parse(fs.readFileSync(file_path, 'utf8'));
      } catch (err) {
        throw new Error(
          'Exec preset profile split failed readback verification',
          { cause: err }
        );
      }
      if (JSON.stringify(readback) !== JSON.stringify(next)) {
        throw new Error(
          'Exec preset profile split failed readback verification'
        );
      }
      commitCache(next);
      return {
        applied: true,
        conflict: false,
        revision: next.revision,
        presets: clone(next.presets),
        chip_bindings: clone(next.chip_bindings ?? emptyChipBindings())
      };
    }
  };
}
