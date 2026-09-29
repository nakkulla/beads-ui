/**
 * Server-global model-visibility persistence (design §3.1).
 *
 * The file names the catalog models the selectors hide. It never edits the
 * catalog, stored settings, dispatch validation, or pricing: a disabled model
 * only drops out of the choices a person picks from.
 *
 * Reads are fail-quiet (a missing or corrupt file yields the defaults, and a
 * name the current catalog does not know is ignored); writes are strict and
 * write nothing when rejected (ADR UI-u6ud-11).
 *
 * @typedef {Object} ModelVisibilityState
 * @property {number} revision
 * @property {string[]} disabled_models
 */
/**
 * @typedef {'conflict'|'invalid_disabled_models'|'unknown_model'|'runner_all_disabled'} ModelVisibilityErrorCode
 */
/**
 * @typedef {{ ok: true, snapshot: ModelVisibilityState }
 *   | { ok: false, code: ModelVisibilityErrorCode, snapshot: ModelVisibilityState }} ModelVisibilitySetResult
 */
/**
 * @import { ResolvedCatalog } from './worker/runner-catalog.js'
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { modelVisibilityFilePath } from './worker/state-paths.js';

/**
 * Models hidden before anyone edits the list (user decision 2026-09-29).
 *
 * @type {ReadonlyArray<string>}
 */
export const DEFAULT_DISABLED_MODELS = [
  'opus-4.8',
  'opus-4.6',
  'sol-5.6',
  'terra',
  'luna-5.6'
];

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @returns {ModelVisibilityState}
 */
function defaultState() {
  return { revision: 0, disabled_models: [...DEFAULT_DISABLED_MODELS] };
}

/**
 * Parse the persisted shape, or null when it is not one.
 *
 * @param {unknown} raw
 * @returns {ModelVisibilityState | null}
 */
function parseState(raw) {
  if (
    !isRecord(raw) ||
    typeof raw.revision !== 'number' ||
    !Number.isInteger(raw.revision) ||
    raw.revision < 0 ||
    !Array.isArray(raw.disabled_models) ||
    raw.disabled_models.some((name) => typeof name !== 'string')
  ) {
    return null;
  }
  return {
    revision: raw.revision,
    disabled_models: [.../** @type {string[]} */ (raw.disabled_models)]
  };
}

/**
 * Keep only names the catalog knows, so the snapshot never carries a name a
 * later write would reject as `unknown_model`.
 *
 * @param {ModelVisibilityState} state
 * @param {ResolvedCatalog} catalog
 * @returns {ModelVisibilityState}
 */
function project(state, catalog) {
  return {
    revision: state.revision,
    disabled_models: state.disabled_models.filter((name) =>
      Object.hasOwn(catalog.model_index, name)
    )
  };
}

/**
 * Create the server-wide model-visibility store. One instance is shared by
 * every connection so the revision CAS is authoritative in-process.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: typeof import('node:fs'),
 *   warn?: (message: string) => void
 * }} [options]
 */
export function createModelVisibilityStore(options = {}) {
  const filePath = options.filePath ?? modelVisibilityFilePath;
  const fs = options.fs ?? nodeFs;
  const warn = options.warn ?? console.warn;

  /** @type {ModelVisibilityState | null} */
  let cache = null;

  /**
   * @returns {ModelVisibilityState}
   */
  function ensureLoaded() {
    if (cache) {
      return cache;
    }
    /** @type {string | null} */
    let text = null;
    try {
      text = fs.readFileSync(filePath(), 'utf8');
    } catch {
      text = null;
    }
    if (text === null) {
      cache = defaultState();
      return cache;
    }
    /** @type {ModelVisibilityState | null} */
    let parsed = null;
    try {
      parsed = parseState(JSON.parse(text));
    } catch {
      parsed = null;
    }
    if (!parsed) {
      warn(
        `model-visibility: ${filePath()} 무시: 형식이 잘못되어 기본값으로 읽습니다.`
      );
      parsed = defaultState();
    }
    cache = parsed;
    return cache;
  }

  /**
   * @param {ModelVisibilityState} state
   */
  function persist(state) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
    fs.renameSync(tmp, file);
  }

  return {
    /**
     * Current state restricted to the catalog's model names.
     *
     * @param {ResolvedCatalog} catalog
     * @returns {ModelVisibilityState}
     */
    snapshot(catalog) {
      return project(ensureLoaded(), catalog);
    },

    /**
     * Replace the whole disabled list. CAS-guarded; a rejected write leaves
     * memory and disk unchanged. A persist failure throws.
     *
     * @param {{ expected_revision: unknown, disabled_models: unknown }} input
     * @param {ResolvedCatalog} catalog
     * @returns {ModelVisibilitySetResult}
     */
    set(input, catalog) {
      const current = ensureLoaded();
      const snapshot = project(current, catalog);
      if (input.expected_revision !== current.revision) {
        return { ok: false, code: 'conflict', snapshot };
      }
      const list = input.disabled_models;
      if (
        !Array.isArray(list) ||
        list.some((name) => typeof name !== 'string' || name.length === 0)
      ) {
        return { ok: false, code: 'invalid_disabled_models', snapshot };
      }
      /** @type {string[]} */
      const disabled_models = [...new Set(/** @type {string[]} */ (list))];
      if (
        disabled_models.some(
          (name) => !Object.hasOwn(catalog.model_index, name)
        )
      ) {
        return { ok: false, code: 'unknown_model', snapshot };
      }
      for (const entry of Object.values(catalog.runners)) {
        const names = Object.keys(entry.models);
        if (
          names.length > 0 &&
          names.every((name) => disabled_models.includes(name))
        ) {
          return { ok: false, code: 'runner_all_disabled', snapshot };
        }
      }
      /** @type {ModelVisibilityState} */
      const next = { revision: current.revision + 1, disabled_models };
      persist(next);
      cache = next;
      return { ok: true, snapshot: project(next, catalog) };
    },

    /**
     * Drop the in-memory cache (test hook).
     */
    __clearCacheForTest() {
      cache = null;
    }
  };
}
