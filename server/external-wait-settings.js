/**
 * Server-global external-wait settings (UI-qbgj §3.6).
 *
 * One table (`EXTERNAL_WAIT_SETTINGS_FIELDS`) owns the adjustable defaults of
 * the external-wait surface. Today that is the `▶ 바로 실행` resource ratio: the
 * confirm dialog pre-fills `floor(real headroom × ratio / 100)`. It is kept out
 * of the timing-settings table on purpose — that table stores only integer
 * seconds.
 *
 * The file holds only the keys a person changed (`{ revision, overrides }`), so
 * a code default that moves later still reaches every unchanged key. Reads are
 * fail-quiet (a missing or corrupt file yields the defaults; a bad key falls
 * back alone with one log line); writes are strict and write nothing when
 * rejected.
 *
 * @typedef {Object} ExternalWaitSettingField
 * @property {number} default
 * @property {number} min
 * @property {number} max
 * @property {'percent'} unit
 * @typedef {Record<string, number>} ExternalWaitSettingValues
 * @typedef {Object} ExternalWaitSettingsSnapshot
 * @property {number} revision
 * @property {ExternalWaitSettingValues} values - Effective values (override over default).
 * @property {ExternalWaitSettingValues} overrides
 * @property {Record<string, ExternalWaitSettingField>} fields
 * @typedef {'conflict'|'invalid_value'} ExternalWaitSettingsErrorCode
 * @typedef {{ ok: true, snapshot: ExternalWaitSettingsSnapshot }
 *   | { ok: false, code: ExternalWaitSettingsErrorCode, key?: string, message: string, snapshot: ExternalWaitSettingsSnapshot }} ExternalWaitSettingsSetResult
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { externalWaitSettingsFilePath } from './worker/state-paths.js';

/**
 * The parameter table. The settings view owns the group title and labels.
 *
 * @type {Readonly<Record<string, Readonly<ExternalWaitSettingField>>>}
 */
export const EXTERNAL_WAIT_SETTINGS_FIELDS = Object.freeze({
  takeover_ratio_percent: { default: 80, min: 10, max: 100, unit: 'percent' }
});

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Validate one value against its field: an integer inside the range.
 *
 * @param {ExternalWaitSettingField} field
 * @param {unknown} value
 * @returns {string | null} Why the value is rejected, or null when it is valid.
 */
function checkValue(field, value) {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return '정수여야 합니다';
  }
  if (value < field.min || value > field.max) {
    return `${field.min} 이상 ${field.max} 이하여야 합니다`;
  }
  return null;
}

/**
 * Parse the persisted shape, or null when it is not one.
 *
 * @param {unknown} raw
 * @returns {{ revision: number, overrides: Record<string, unknown> } | null}
 */
function parseState(raw) {
  if (
    !isRecord(raw) ||
    typeof raw.revision !== 'number' ||
    !Number.isInteger(raw.revision) ||
    raw.revision < 0 ||
    !isRecord(raw.overrides)
  ) {
    return null;
  }
  return { revision: raw.revision, overrides: raw.overrides };
}

/**
 * Create an external-wait settings store. The server shares one instance (see
 * `externalWaitSettingsStore()`) so the revision CAS is authoritative
 * in-process.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: typeof import('node:fs'),
 *   warn?: (message: string) => void
 * }} [options]
 */
export function createExternalWaitSettingsStore(options = {}) {
  const filePath = options.filePath ?? externalWaitSettingsFilePath;
  const fs = options.fs ?? nodeFs;
  const warn = options.warn ?? console.warn;

  /** @type {{ revision: number, overrides: ExternalWaitSettingValues } | null} */
  let cache = null;

  /**
   * @returns {{ revision: number, overrides: ExternalWaitSettingValues }}
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
      if (/** @type {any} */ (err)?.code !== 'ENOENT') {
        warn(
          `external-wait-settings: ${filePath()} 읽기 실패(${String(err)}): 기본값으로 읽습니다.`
        );
      }
    }
    if (text === null) {
      cache = { revision: 0, overrides: {} };
      return cache;
    }
    /** @type {{ revision: number, overrides: Record<string, unknown> } | null} */
    let parsed = null;
    try {
      parsed = parseState(JSON.parse(text));
    } catch {
      parsed = null;
    }
    if (!parsed) {
      warn(
        `external-wait-settings: ${filePath()} 무시: 형식이 잘못되어 기본값으로 읽습니다.`
      );
      cache = { revision: 0, overrides: {} };
      return cache;
    }
    /** @type {ExternalWaitSettingValues} */
    const overrides = {};
    for (const [key, value] of Object.entries(parsed.overrides)) {
      const reason = Object.hasOwn(EXTERNAL_WAIT_SETTINGS_FIELDS, key)
        ? checkValue(EXTERNAL_WAIT_SETTINGS_FIELDS[key], value)
        : '알 수 없는 키입니다';
      if (reason) {
        warn(
          `external-wait-settings: ${key} 무시(${reason}): 기본값으로 읽습니다.`
        );
        continue;
      }
      overrides[key] = /** @type {number} */ (value);
    }
    cache = { revision: parsed.revision, overrides };
    return cache;
  }

  /**
   * @param {ExternalWaitSettingValues} overrides
   * @returns {ExternalWaitSettingValues}
   */
  function effectiveOf(overrides) {
    /** @type {ExternalWaitSettingValues} */
    const values = {};
    for (const [key, field] of Object.entries(EXTERNAL_WAIT_SETTINGS_FIELDS)) {
      values[key] = overrides[key] ?? field.default;
    }
    return values;
  }

  /**
   * @returns {ExternalWaitSettingsSnapshot}
   */
  function snapshot() {
    const state = ensureLoaded();
    /** @type {Record<string, ExternalWaitSettingField>} */
    const fields = {};
    for (const [key, field] of Object.entries(EXTERNAL_WAIT_SETTINGS_FIELDS)) {
      fields[key] = { ...field };
    }
    return {
      revision: state.revision,
      values: effectiveOf(state.overrides),
      overrides: { ...state.overrides },
      fields
    };
  }

  /**
   * @param {ExternalWaitSettingValues} overrides
   * @param {number} revision
   */
  function persistOverrides(overrides, revision) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify({ revision, overrides }, null, 2));
    fs.renameSync(tmp, file);
  }

  return {
    snapshot,

    /**
     * Effective values: each override, else the default.
     *
     * @returns {ExternalWaitSettingValues}
     */
    effective() {
      return effectiveOf(ensureLoaded().overrides);
    },

    /**
     * Apply one request. CAS-guarded and all-or-nothing: any invalid key writes
     * nothing. A `null` value clears that key's override. A persist failure
     * throws and leaves memory unchanged.
     *
     * @param {{ expected_revision: unknown, values: unknown }} input
     * @returns {ExternalWaitSettingsSetResult}
     */
    set(input) {
      const state = ensureLoaded();
      if (input.expected_revision !== state.revision) {
        return {
          ok: false,
          code: 'conflict',
          message: 'external-wait-settings-set: conflict',
          snapshot: snapshot()
        };
      }
      if (!isRecord(input.values)) {
        return {
          ok: false,
          code: 'invalid_value',
          message: 'values는 키별 값 객체여야 합니다',
          snapshot: snapshot()
        };
      }
      /** @type {ExternalWaitSettingValues} */
      const next = { ...state.overrides };
      for (const [key, value] of Object.entries(input.values)) {
        const reason = Object.hasOwn(EXTERNAL_WAIT_SETTINGS_FIELDS, key)
          ? value === null
            ? null
            : checkValue(EXTERNAL_WAIT_SETTINGS_FIELDS[key], value)
          : '알 수 없는 키입니다';
        if (reason) {
          return {
            ok: false,
            code: 'invalid_value',
            key,
            message: reason,
            snapshot: snapshot()
          };
        }
        if (value === null) {
          delete next[key];
        } else {
          next[key] = /** @type {number} */ (value);
        }
      }
      const revision = state.revision + 1;
      persistOverrides(next, revision);
      cache = { revision, overrides: next };
      return { ok: true, snapshot: snapshot() };
    },

    /**
     * Drop the in-memory cache (test hook).
     */
    __clearCacheForTest() {
      cache = null;
    }
  };
}

/** @type {ReturnType<typeof createExternalWaitSettingsStore> | null} */
let STORE = null;

/**
 * The process-wide store the WS channel shares.
 *
 * @returns {ReturnType<typeof createExternalWaitSettingsStore>}
 */
export function externalWaitSettingsStore() {
  if (!STORE) {
    STORE = createExternalWaitSettingsStore();
  }
  return STORE;
}

/**
 * Test-only: drop the shared store so the next read starts from the file.
 */
export function __resetExternalWaitSettingsForTest() {
  STORE = null;
}
