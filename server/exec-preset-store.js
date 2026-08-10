/**
 * Server-global worker execution preset persistence.
 *
 * @typedef {Object} ExecPreset
 * @property {string} id
 * @property {string} name
 * @property {Record<string, string>} settings
 * @property {{ kind: 'user' }|{ kind: 'workspace-exec-defaults', workspace_key: string, source_digest: string }} origin
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
  EXEC_SETTING_KEYS,
  execSettingEnums,
  validateImplSettings
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
  const known_keys = new Set(EXEC_SETTING_KEYS);
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
    const coherence = validateImplSettings(settings, { active_writer: false });
    if (
      coherence.ok &&
      coherence.inferred &&
      typeof coherence.impl_runtime === 'string'
    ) {
      settings.impl_runtime = coherence.impl_runtime;
    }
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
  const settingEnums = options.settingEnums || (() => execSettingEnums());
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
    if (!validateImplSettings(normalized_settings).ok) {
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
     * Create or reuse a deterministic preset for one legacy workspace state.
     * The migration coordinator serializes this startup-only operation; origin
     * is its idempotency key, so a failed later queue write cannot duplicate it.
     *
     * @param {{ name: string, settings: Record<string, string>, workspace_key: string, source_digest: string }} input
     */
    createOrReuseMigration(input) {
      const normalized = normalizeMutation(input?.name, input?.settings);
      const workspace_key =
        typeof input?.workspace_key === 'string' ? input.workspace_key : '';
      const source_digest =
        typeof input?.source_digest === 'string' ? input.source_digest : '';
      const current = ensureLoaded();
      if (!normalized || !workspace_key || !source_digest) {
        return rejected(current, false, 'invalid');
      }
      const existing = current.presets.find(
        (preset) =>
          preset.origin.kind === 'workspace-exec-defaults' &&
          preset.origin.workspace_key === workspace_key &&
          preset.origin.source_digest === source_digest
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
      const suffix = workspace_key.slice(-8);
      let name = normalized.name;
      if (
        next.presets.some(
          (preset) => preset.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        name = `${normalized.name} · ${suffix}`;
      }
      let ordinal = 2;
      while (
        next.presets.some(
          (preset) => preset.name.toLowerCase() === name.toLowerCase()
        )
      ) {
        name = `${normalized.name} · ${suffix}-${ordinal++}`;
      }
      const preset = {
        id: randomUUID(),
        name,
        settings: normalized.settings,
        origin: {
          kind: /** @type {'workspace-exec-defaults'} */ (
            'workspace-exec-defaults'
          ),
          workspace_key,
          source_digest
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
    }
  };
}
