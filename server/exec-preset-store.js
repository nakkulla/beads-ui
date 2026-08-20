/**
 * Server-global full-profile execution preset persistence.
 *
 * A preset sparsely carries the 12 session-default keys plus the workspace
 * queue's three orchestration keys.
 *
 * @typedef {Object} ExecPreset
 * @property {string} id
 * @property {string} name
 * @property {Record<string, string>} settings
 * @property {{ kind: 'user' }|{ kind: 'workspace-exec-defaults', workspace_key: string, source_digest: string }|{ kind: 'legacy-preset-copy', source_preset_id: string }} origin
 */
/**
 * @typedef {Object} ExecPresetState
 * @property {number} revision
 * @property {ExecPreset[]} presets
 */
import crypto from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import {
  IMPL_PRESET_KEYS,
  implPresetEnums,
  validateImplPresetSettings
} from './worker/exec-enums.js';
import { execPresetsFilePath } from './worker/state-paths.js';

/**
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/** @returns {ExecPresetState} */
function emptyState() {
  return { revision: 0, presets: [] };
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
  if (!Array.isArray(raw.presets)) {
    return state;
  }
  const known_keys = new Set(IMPL_PRESET_KEYS);
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
        if (known_keys.has(key) && typeof value === 'string') {
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
    state.presets.push({ id, name, settings, origin });
  }
  return state;
}

/**
 * @param {{ filePath?: string, fs?: typeof import('node:fs'), randomUUID?: () => string, settingEnums?: () => Record<string, ReadonlyArray<string>> }} [options]
 */
export function createExecPresetStore(options = {}) {
  const file_path = options.filePath || execPresetsFilePath();
  const fs = options.fs || nodeFs;
  const randomUUID = options.randomUUID || (() => crypto.randomUUID());
  const settingEnums = options.settingEnums || (() => implPresetEnums());
  /** @type {ExecPresetState|null} */
  let cache = null;

  /** @returns {ExecPresetState} */
  function ensureLoaded() {
    if (cache) {
      return cache;
    }
    let parsed;
    try {
      const raw = fs.readFileSync(file_path, 'utf8');
      parsed = JSON.parse(raw);
    } catch {
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
    cache = normalized;
    return cache;
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
      ...(reason ? { reason } : {})
    };
  }

  /**
   * @param {unknown} name
   * @param {unknown} settings
   * @returns {{ name: string, settings: Record<string, string> }|null}
   */
  function normalizeMutation(name, settings) {
    const trimmed_name = typeof name === 'string' ? name.trim() : '';
    if (trimmed_name.length === 0 || !isRecord(settings)) {
      return null;
    }
    const enums = settingEnums();
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
    if (!validateImplPresetSettings(normalized_settings).ok) {
      return null;
    }
    return { name: trimmed_name, settings: normalized_settings };
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
    cache = next;
    return {
      applied: true,
      conflict: false,
      revision: next.revision,
      presets: clone(next.presets)
    };
  }

  return {
    /** @returns {ExecPresetState} */
    snapshot() {
      return clone(ensureLoaded());
    },

    /**
     * @param {{ expected_revision: number, name: string, settings: Record<string, string> }} input
     */
    create(input) {
      const normalized = normalizeMutation(input?.name, input?.settings);
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
          settings: normalized.settings,
          origin: { kind: 'user' }
        });
        return true;
      });
    },

    /**
     * @param {{ expected_revision: number, id: string, name: string, settings: Record<string, string> }} input
     */
    update(input) {
      const id = typeof input?.id === 'string' ? input.id : '';
      const normalized = normalizeMutation(input?.name, input?.settings);
      return applyMutation(input?.expected_revision, (next) => {
        if (id.length === 0 || !normalized) {
          return false;
        }
        const index = next.presets.findIndex((preset) => preset.id === id);
        if (index < 0) {
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
          settings: normalized.settings,
          origin: next.presets[index].origin
        };
        return true;
      });
    },

    /**
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
        return true;
      });
    },

    /**
     * Create or reuse the implementation-key copy of one legacy 12-key preset
     * (spec §F.c). `source_preset_id` is the idempotency key, so re-running a
     * migration that stopped before its completion marker never duplicates the
     * copy, and the copy COEXISTS with its source until cleanup.
     *
     * @param {{ name: string, settings: Record<string, string>, source_preset_id: string }} input
     */
    createOrReuseImplCopy(input) {
      const normalized = normalizeMutation(input?.name, input?.settings);
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
          presets: clone(current.presets)
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
        settings: normalized.settings,
        origin: {
          kind: /** @type {'legacy-preset-copy'} */ ('legacy-preset-copy'),
          source_preset_id
        }
      };
      next.presets.push(preset);
      next.revision = current.revision + 1;
      persist(next);
      cache = next;
      return {
        applied: true,
        reused: false,
        conflict: false,
        revision: next.revision,
        preset: clone(preset),
        presets: clone(next.presets)
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
          presets: clone(current.presets)
        };
      }
      const next = { revision: current.revision + 1, presets: remaining };
      persist(next);
      cache = next;
      return {
        applied: true,
        conflict: false,
        revision: next.revision,
        presets: clone(next.presets)
      };
    }
  };
}
