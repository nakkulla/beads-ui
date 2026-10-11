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
 * Codex pinned names (`<family>-<version>`) are hidden when they FIRST appear
 * in the Codex CLI list (UI-gpac §3.6): `seen_models` remembers every pinned
 * name already observed, so a name the user turned on is never hidden again.
 *
 * @typedef {Object} ModelVisibilityState
 * @property {number} revision
 * @property {string[]} disabled_models
 * @property {string[]} [seen_models] - Codex pinned names already observed;
 * absent in a file written before UI-gpac.
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
  /** @type {ModelVisibilityState} */
  const state = {
    revision: raw.revision,
    disabled_models: [.../** @type {string[]} */ (raw.disabled_models)]
  };
  if (
    Array.isArray(raw.seen_models) &&
    raw.seen_models.every((name) => typeof name === 'string')
  ) {
    state.seen_models = [.../** @type {string[]} */ (raw.seen_models)];
  }
  return state;
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
  /** Whether {@link cache} came from an existing state file. */
  let from_file = false;

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
    } catch (err) {
      text = null;
      if (/** @type {any} */ (err)?.code !== 'ENOENT') {
        warn(
          `model-visibility: ${filePath()} 읽기 실패(${String(err)}): 기본값으로 읽습니다.`
        );
      }
    }
    if (text === null) {
      from_file = false;
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
    from_file = true;
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
      // A hidden name briefly absent from the catalog is not in the client's
      // list; dropping it here would show it again when it comes back.
      const kept_absent = current.disabled_models.filter(
        (name) =>
          !Object.hasOwn(catalog.model_index, name) &&
          !disabled_models.includes(name)
      );
      /** @type {ModelVisibilityState} */
      const next = {
        revision: current.revision + 1,
        disabled_models: [...disabled_models, ...kept_absent]
      };
      if (current.seen_models) {
        next.seen_models = current.seen_models.slice();
      }
      persist(next);
      from_file = true;
      cache = next;
      return { ok: true, snapshot: project(next, catalog) };
    },

    /**
     * Hide the Codex pinned names that appear for the first time.
     *
     * `pinned_names` are the pinned names of the current CLI list. A name not
     * yet in `seen_models` is added to the disabled list, and every listed name
     * becomes seen. Without a state file every listed name is new; a file
     * written before `seen_models` existed starts from `legacy_names` (the
     * names the catalog had before the CLI list), so a name the user already
     * enabled stays enabled. A persist failure keeps the change in memory.
     *
     * @param {ReadonlyArray<string>} pinned_names
     * @param {ReadonlyArray<string>} legacy_names
     * @returns {boolean} Whether the state changed.
     */
    observeCodexPinnedNames(pinned_names, legacy_names) {
      const current = ensureLoaded();
      /** @type {string[]} */
      const seen = current.seen_models
        ? current.seen_models.slice()
        : from_file
          ? [...legacy_names]
          : [];
      const fresh = pinned_names.filter((name) => !seen.includes(name));
      if (current.seen_models && fresh.length === 0) {
        return false;
      }
      /** @type {ModelVisibilityState} */
      const next = {
        revision: current.revision + 1,
        disabled_models: [...new Set([...current.disabled_models, ...fresh])],
        seen_models: [...new Set([...seen, ...pinned_names])]
      };
      try {
        persist(next);
        from_file = true;
      } catch (err) {
        warn(
          `model-visibility: ${filePath()} 쓰기 실패(${String(err)}): 메모리에만 반영합니다.`
        );
      }
      cache = next;
      return true;
    },

    /**
     * Drop the in-memory cache (test hook).
     */
    __clearCacheForTest() {
      cache = null;
    }
  };
}
