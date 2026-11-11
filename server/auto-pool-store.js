/**
 * Server-global auto-pool persistence (UI-y7h1 §3.1-§3.2).
 *
 * Per runtime (`claude`, `codex`) the file holds the candidate models — lowest
 * slot first, 0 to 2 — and the effort range the dotfiles `bind` judgment uses
 * for an implementation unit whose model and effort are `auto`. A runtime
 * absent from `runtimes` follows the dotfiles shipped defaults.
 *
 * Reads are fail-quiet: a missing or corrupt file reads as revision 0 with an
 * empty `runtimes`, and stored names are never filtered or rewritten. Writes
 * replace the whole document, are CAS-guarded on `expected_revision`, and write
 * nothing when rejected.
 *
 * The allowed names and efforts come from the pinned execution-defaults
 * projection (ADR UI-jlov), NOT the runtime catalog: dotfiles judges with the
 * same lists, so a value the runtime catalog accepts (`opus-4.8`, `minimal`)
 * would be stored here and then discarded there.
 *
 * @typedef {{ min: string, max: string }} AutoPoolEffort
 * @typedef {{ models: string[], effort: AutoPoolEffort }} AutoPoolRuntime
 * @typedef {Object} AutoPoolState
 * @property {number} revision
 * @property {Record<string, AutoPoolRuntime>} runtimes
 */
/**
 * @typedef {'conflict'|'invalid_auto_pool'|'unknown_model'|'invalid_effort_range'} AutoPoolErrorCode
 */
/**
 * @typedef {{ ok: true, snapshot: AutoPoolState }
 *   | { ok: false, code: AutoPoolErrorCode, runtime: string|null, snapshot: AutoPoolState }} AutoPoolSetResult
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { loadExecutionDefaults } from './worker/execution-defaults.js';
import { codexNameFamily } from './worker/runner-catalog.js';
import { autoPoolFilePath } from './worker/state-paths.js';

/** The runtimes a document may name, in display order. */
export const AUTO_POOL_RUNTIMES = /** @type {const} */ (['claude', 'codex']);

/** Most candidate models one runtime may hold. */
export const AUTO_POOL_MAX_MODELS = 2;

/** The highest effort an auto-pool range may reach. */
const EFFORT_CAP = 'xhigh';

/** Claude models the projection lists that an auto pool may not name. */
const EXCLUDED_CLAUDE_MODELS = ['fable'];

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} value
 * @returns {value is string[]}
 */
function isStringList(value) {
  return (
    Array.isArray(value) && value.every((entry) => typeof entry === 'string')
  );
}

/**
 * @returns {AutoPoolState}
 */
function emptyState() {
  return { revision: 0, runtimes: {} };
}

/**
 * The Claude names an auto pool may hold: the projection's
 * `model_catalog.claude` without `fable`.
 *
 * @param {Record<string, any>|null|undefined} implementation
 * @returns {string[]}
 */
export function autoPoolClaudeModels(implementation) {
  const raw = implementation?.model_catalog?.claude;
  /** @type {string[]} */
  const names = isStringList(raw)
    ? raw.slice()
    : isRecord(raw)
      ? Object.keys(raw)
      : [];
  return names.filter((name) => !EXCLUDED_CLAUDE_MODELS.includes(name));
}

/**
 * The Codex families the projection's `model_catalog.codex.families` names.
 *
 * @param {Record<string, any>|null|undefined} implementation
 * @returns {string[]}
 */
export function autoPoolCodexFamilies(implementation) {
  const raw = implementation?.model_catalog?.codex?.families;
  return isStringList(raw) ? raw.slice() : [];
}

/**
 * The effort choices of one runtime: the projection's
 * `effort_catalog.<runtime>` up to and including `xhigh`.
 *
 * @param {Record<string, any>|null|undefined} implementation
 * @param {string} runtime
 * @returns {string[]}
 */
export function autoPoolEfforts(implementation, runtime) {
  const raw = implementation?.effort_catalog?.[runtime];
  if (!isStringList(raw)) {
    return [];
  }
  const cap = raw.indexOf(EFFORT_CAP);
  return cap === -1 ? raw.slice() : raw.slice(0, cap + 1);
}

/**
 * Whether one model name is allowed for `runtime`. A Codex name is a family
 * alias or a `<family>-<version>` pinned name of a projection family; whether
 * the account's Codex list has it is not checked (resolution decides at run).
 *
 * @param {string} runtime
 * @param {string} name
 * @param {Record<string, any>|null|undefined} implementation
 * @returns {boolean}
 */
function isAllowedModel(runtime, name, implementation) {
  if (runtime === 'claude') {
    return autoPoolClaudeModels(implementation).includes(name);
  }
  const families = autoPoolCodexFamilies(implementation);
  return families.length > 0 && codexNameFamily(name, families) !== null;
}

/**
 * Parse one stored runtime entry for a READ: the shape only, names untouched.
 *
 * @param {unknown} raw
 * @returns {AutoPoolRuntime|null}
 */
function parseStoredEntry(raw) {
  if (
    !isRecord(raw) ||
    !isStringList(raw.models) ||
    !isRecord(raw.effort) ||
    typeof raw.effort.min !== 'string' ||
    typeof raw.effort.max !== 'string'
  ) {
    return null;
  }
  return {
    models: raw.models.slice(),
    effort: { min: raw.effort.min, max: raw.effort.max }
  };
}

/**
 * The projection's shipped defaults for one runtime
 * (`implementation.auto_pool_defaults.<runtime>`, the API `runtimes` shape),
 * or null while the pinned projection carries no such key.
 *
 * @param {Record<string, any>|null|undefined} implementation
 * @param {string} runtime
 * @returns {AutoPoolRuntime|null}
 */
export function autoPoolDefaults(implementation, runtime) {
  const table = implementation?.auto_pool_defaults;
  return isRecord(table) ? parseStoredEntry(table[runtime]) : null;
}

/**
 * Parse the persisted document, or null when it is not one.
 *
 * @param {unknown} raw
 * @returns {AutoPoolState|null}
 */
function parseState(raw) {
  if (
    !isRecord(raw) ||
    typeof raw.revision !== 'number' ||
    !Number.isInteger(raw.revision) ||
    raw.revision < 0 ||
    !isRecord(raw.runtimes)
  ) {
    return null;
  }
  /** @type {Record<string, AutoPoolRuntime>} */
  const runtimes = {};
  for (const [runtime, entry] of Object.entries(raw.runtimes)) {
    const parsed = parseStoredEntry(entry);
    if (!parsed) {
      return null;
    }
    runtimes[runtime] = parsed;
  }
  return { revision: raw.revision, runtimes };
}

/**
 * Parse one runtime entry of a WRITE, or null when its shape is wrong: exactly
 * `models` (0 to 2 distinct non-empty names) and `effort` (`min`, `max`).
 *
 * @param {unknown} raw
 * @returns {AutoPoolRuntime|null}
 */
function parseWriteEntry(raw) {
  if (!isRecord(raw)) {
    return null;
  }
  const keys = Object.keys(raw);
  if (
    keys.length !== 2 ||
    !keys.includes('models') ||
    !keys.includes('effort')
  ) {
    return null;
  }
  const { models, effort } = raw;
  if (
    !isStringList(models) ||
    models.length > AUTO_POOL_MAX_MODELS ||
    models.some((name) => name.length === 0) ||
    new Set(models).size !== models.length
  ) {
    return null;
  }
  if (
    !isRecord(effort) ||
    Object.keys(effort).length !== 2 ||
    typeof effort.min !== 'string' ||
    typeof effort.max !== 'string'
  ) {
    return null;
  }
  return {
    models: models.slice(),
    effort: { min: effort.min, max: effort.max }
  };
}

/**
 * Validate a whole `runtimes` document against the projection, in the order of
 * the rejection table: shape, then model names, then effort ranges.
 *
 * @param {unknown} raw
 * @param {Record<string, any>|null|undefined} implementation
 * @returns {{ ok: true, runtimes: Record<string, AutoPoolRuntime> }
 *   | { ok: false, code: Exclude<AutoPoolErrorCode, 'conflict'>, runtime: string|null }}
 */
export function validateAutoPoolRuntimes(raw, implementation) {
  if (!isRecord(raw)) {
    return { ok: false, code: 'invalid_auto_pool', runtime: null };
  }
  /** @type {Record<string, AutoPoolRuntime>} */
  const runtimes = {};
  for (const [runtime, entry] of Object.entries(raw)) {
    if (
      !/** @type {ReadonlyArray<string>} */ (AUTO_POOL_RUNTIMES).includes(
        runtime
      )
    ) {
      return { ok: false, code: 'invalid_auto_pool', runtime: null };
    }
    const parsed = parseWriteEntry(entry);
    if (!parsed) {
      return { ok: false, code: 'invalid_auto_pool', runtime };
    }
    runtimes[runtime] = parsed;
  }
  for (const [runtime, entry] of Object.entries(runtimes)) {
    if (
      entry.models.some(
        (name) => !isAllowedModel(runtime, name, implementation)
      )
    ) {
      return { ok: false, code: 'unknown_model', runtime };
    }
  }
  for (const [runtime, entry] of Object.entries(runtimes)) {
    const efforts = autoPoolEfforts(implementation, runtime);
    const min = efforts.indexOf(entry.effort.min);
    const max = efforts.indexOf(entry.effort.max);
    if (min === -1 || max === -1 || min > max) {
      return { ok: false, code: 'invalid_effort_range', runtime };
    }
  }
  return { ok: true, runtimes };
}

/**
 * Create one auto-pool store.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: typeof import('node:fs'),
 *   warn?: (message: string) => void,
 *   implementation?: () => Record<string, any>|null
 * }} [options]
 */
export function createAutoPoolStore(options = {}) {
  const filePath = options.filePath ?? autoPoolFilePath;
  const fs = options.fs ?? nodeFs;
  const warn = options.warn ?? console.warn;
  const implementation =
    options.implementation ??
    (() => loadExecutionDefaults().session?.implementation ?? null);

  /** @type {AutoPoolState | null} */
  let cache = null;

  /**
   * @returns {AutoPoolState}
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
          `auto-pool: ${filePath()} 읽기 실패(${String(err)}): 미설정으로 읽습니다.`
        );
      }
    }
    if (text === null) {
      cache = emptyState();
      return cache;
    }
    /** @type {AutoPoolState | null} */
    let parsed = null;
    try {
      parsed = parseState(JSON.parse(text));
    } catch {
      parsed = null;
    }
    if (!parsed) {
      warn(
        `auto-pool: ${filePath()} 무시: 형식이 잘못되어 미설정으로 읽습니다.`
      );
      parsed = emptyState();
    }
    cache = parsed;
    return cache;
  }

  /**
   * @param {AutoPoolState} state
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
     * The stored document as read, as a copy.
     *
     * @returns {AutoPoolState}
     */
    snapshot() {
      return structuredClone(ensureLoaded());
    },

    /**
     * Replace the whole document. A rejected write leaves memory and disk
     * unchanged; a persist failure throws and also leaves both unchanged.
     *
     * @param {{ expected_revision: unknown, runtimes: unknown }} input
     * @returns {AutoPoolSetResult}
     */
    set(input) {
      const current = ensureLoaded();
      if (input.expected_revision !== current.revision) {
        return {
          ok: false,
          code: 'conflict',
          runtime: null,
          snapshot: structuredClone(current)
        };
      }
      const checked = validateAutoPoolRuntimes(
        input.runtimes,
        implementation()
      );
      if (!checked.ok) {
        return {
          ok: false,
          code: checked.code,
          runtime: checked.runtime,
          snapshot: structuredClone(current)
        };
      }
      /** @type {AutoPoolState} */
      const next = {
        revision: current.revision + 1,
        runtimes: checked.runtimes
      };
      persist(next);
      cache = next;
      return { ok: true, snapshot: structuredClone(next) };
    }
  };
}

/** @type {ReturnType<typeof createAutoPoolStore> | null} */
let SHARED = null;

/**
 * The one store the WebSocket channel and `GET /api/auto-pool` share, so a
 * write through either surface is what the other reads next.
 *
 * @returns {ReturnType<typeof createAutoPoolStore>}
 */
export function autoPoolStore() {
  if (!SHARED) {
    SHARED = createAutoPoolStore();
  }
  return SHARED;
}

/**
 * Test-only: replace the shared store (`null` recreates it on next use).
 *
 * @param {ReturnType<typeof createAutoPoolStore> | null} store
 */
export function __setAutoPoolStoreForTest(store) {
  SHARED = store;
}
