/**
 * Server-global timing settings (UI-ny0h design §3.1-§3.3).
 *
 * One table (`TIMING_FIELDS`) owns every adjustable wait, observation, retry,
 * and refresh duration: key, default, range, ladder rung count, display unit,
 * and the optional off value. All values are stored as integer seconds; the
 * unit only drives display and the minute-multiple rule.
 *
 * The file holds only the keys a person changed (`{ revision, overrides }`), so
 * a code default that moves later still reaches every unchanged key. Reads are
 * fail-quiet (a missing or corrupt file yields the defaults; a bad key falls
 * back alone with one log line); writes are strict and write nothing when
 * rejected. Consumers read the effective value at the moment they compute a time
 * through `getTimingSettings()`; already-recorded schedule times are never
 * rewritten.
 *
 * @typedef {'seconds'|'minutes'} TimingUnit
 * @typedef {Object} TimingField
 * @property {number | number[]} default - Seconds; a ladder default is an array. `list_poll_interval_seconds` reads its default from config.toml.
 * @property {number} min
 * @property {number} max
 * @property {number} [rungs] - Fixed ladder length; absent for a scalar field.
 * @property {TimingUnit} unit
 * @property {number} [off_value] - A value that means off; it skips the range check.
 * @typedef {Record<string, number | number[]>} TimingValues
 * @typedef {Object} TimingSnapshot
 * @property {number} revision
 * @property {TimingValues} values - Effective values (override over default).
 * @property {TimingValues} overrides
 * @property {Record<string, TimingField>} fields
 * @typedef {'conflict'|'invalid_value'} TimingErrorCode
 * @typedef {{ ok: true, snapshot: TimingSnapshot }
 *   | { ok: false, code: TimingErrorCode, key?: string, message: string, snapshot: TimingSnapshot }} TimingSetResult
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { getConfig } from './config.js';
import { OBSERVATION } from './worker/external-wait/contract.js';
import { timingSettingsFilePath } from './worker/state-paths.js';

/** Default of `list_poll_interval_seconds` when config.toml names none. */
const LIST_POLL_FALLBACK_SECONDS = 30;

/** Key whose default comes from config.toml `poll_interval_seconds`. */
const LIST_POLL_KEY = 'list_poll_interval_seconds';

/**
 * The parameter table. The settings view owns group titles and labels.
 *
 * @type {Readonly<Record<string, Readonly<TimingField>>>}
 */
export const TIMING_FIELDS = Object.freeze({
  queue_grace_seconds: { default: 20, min: 0, max: 600, unit: 'seconds' },
  external_wait_slurm_interval_seconds: {
    default: OBSERVATION.slurm_interval_seconds,
    min: 30,
    max: 3600,
    unit: 'seconds'
  },
  external_wait_process_interval_seconds: {
    default: OBSERVATION.process_interval_seconds,
    min: 15,
    max: 3600,
    unit: 'seconds'
  },
  env_retry_delays_seconds: {
    default: [120, 300, 900],
    min: 60,
    max: 21600,
    rungs: 3,
    unit: 'minutes'
  },
  base_moved_retry_seconds: {
    default: 120,
    min: 60,
    max: 3600,
    unit: 'minutes'
  },
  completion_retry_delays_seconds: {
    default: [60, 300, 900],
    min: 60,
    max: 21600,
    rungs: 3,
    unit: 'minutes'
  },
  auto_resume_retry_delays_seconds: {
    default: [300, 900, 1800, 3600],
    min: 60,
    max: 21600,
    rungs: 4,
    unit: 'minutes'
  },
  provider_outage_backoff_seconds: {
    default: [60, 120, 240, 480, 900, 3600],
    min: 60,
    max: 21600,
    rungs: 6,
    unit: 'minutes'
  },
  provider_usage_unknown_reset_seconds: {
    default: 900,
    min: 60,
    max: 21600,
    unit: 'minutes'
  },
  provider_usage_reset_grace_seconds: {
    default: 60,
    min: 0,
    max: 3600,
    unit: 'seconds'
  },
  pr_poll_interval_seconds: {
    default: 45,
    min: 15,
    max: 600,
    unit: 'seconds'
  },
  [LIST_POLL_KEY]: {
    default: LIST_POLL_FALLBACK_SECONDS,
    min: 5,
    max: 600,
    unit: 'seconds',
    off_value: 0
  },
  merge_resolution_wait_seconds: {
    default: 1800,
    min: 300,
    max: 14400,
    unit: 'minutes'
  },
  merge_unconfirmed_poll_seconds: {
    default: 60,
    min: 15,
    max: 600,
    unit: 'seconds'
  },
  merge_unconfirmed_wait_seconds: {
    default: 1800,
    min: 300,
    max: 14400,
    unit: 'minutes'
  }
});

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {number | number[]} value
 * @returns {number | number[]}
 */
function cloneValue(value) {
  return Array.isArray(value) ? [...value] : value;
}

/**
 * @param {TimingField} field
 * @param {number} seconds
 * @returns {string | null} Why one number is not allowed, or null when it is.
 */
function checkNumber(field, seconds) {
  if (!Number.isInteger(seconds)) {
    return '정수 초여야 합니다';
  }
  if (field.off_value !== undefined && seconds === field.off_value) {
    return null;
  }
  if (seconds < field.min || seconds > field.max) {
    return field.unit === 'minutes'
      ? `${field.min / 60}분 이상 ${field.max / 60}분 이하여야 합니다`
      : `${field.min}초 이상 ${field.max}초 이하여야 합니다`;
  }
  if (field.unit === 'minutes' && seconds % 60 !== 0) {
    return '분 단위(60의 배수)여야 합니다';
  }
  return null;
}

/**
 * Validate one value against its field. Strict: the shape, the range, the
 * minute rule, the ladder length, and the non-decreasing ladder all apply.
 *
 * @param {TimingField} field
 * @param {unknown} value
 * @returns {string | null} Why the value is rejected, or null when it is valid.
 */
function checkValue(field, value) {
  if (field.rungs === undefined) {
    if (typeof value !== 'number') {
      return '숫자여야 합니다';
    }
    return checkNumber(field, value);
  }
  if (!Array.isArray(value) || value.length !== field.rungs) {
    return `${field.rungs}칸 배열이어야 합니다`;
  }
  for (let i = 0; i < value.length; i++) {
    if (typeof value[i] !== 'number') {
      return '숫자여야 합니다';
    }
    const reason = checkNumber(field, value[i]);
    if (reason) {
      return reason;
    }
    if (i > 0 && value[i] < value[i - 1]) {
      return '뒤 칸은 앞 칸보다 줄어들 수 없습니다';
    }
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
 * Read config.toml's list refresh cadence, falling back to 30.
 *
 * @returns {number}
 */
function configListPollSeconds() {
  try {
    const seconds = getConfig().poll_interval_seconds;
    return Number.isInteger(seconds) && seconds >= 0
      ? seconds
      : LIST_POLL_FALLBACK_SECONDS;
  } catch {
    return LIST_POLL_FALLBACK_SECONDS;
  }
}

/**
 * Create a timing-settings store. The server shares one instance (see
 * `timingSettingsStore()`) so the revision CAS is authoritative in-process.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: typeof import('node:fs'),
 *   warn?: (message: string) => void,
 *   listPollDefault?: () => number
 * }} [options]
 */
export function createTimingSettingsStore(options = {}) {
  const filePath = options.filePath ?? timingSettingsFilePath;
  const fs = options.fs ?? nodeFs;
  const warn = options.warn ?? console.warn;
  const listPollDefault = options.listPollDefault ?? configListPollSeconds;

  /** @type {{ revision: number, overrides: TimingValues } | null} */
  let cache = null;
  /** @type {number | null} */
  let list_poll_default = null;
  /** @type {Set<(snapshot: TimingSnapshot, previous: TimingValues) => void>} */
  const listeners = new Set();

  /**
   * @param {string} key
   * @returns {number | number[]}
   */
  function defaultOf(key) {
    if (key === LIST_POLL_KEY) {
      if (list_poll_default === null) {
        list_poll_default = listPollDefault();
      }
      return list_poll_default;
    }
    return cloneValue(TIMING_FIELDS[key].default);
  }

  /**
   * @returns {{ revision: number, overrides: TimingValues }}
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
          `timing-settings: ${filePath()} 읽기 실패(${String(err)}): 기본값으로 읽습니다.`
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
        `timing-settings: ${filePath()} 무시: 형식이 잘못되어 기본값으로 읽습니다.`
      );
      cache = { revision: 0, overrides: {} };
      return cache;
    }
    /** @type {TimingValues} */
    const overrides = {};
    for (const [key, value] of Object.entries(parsed.overrides)) {
      const reason = Object.hasOwn(TIMING_FIELDS, key)
        ? checkValue(TIMING_FIELDS[key], value)
        : '알 수 없는 키입니다';
      if (reason) {
        warn(`timing-settings: ${key} 무시(${reason}): 기본값으로 읽습니다.`);
        continue;
      }
      overrides[key] = cloneValue(/** @type {number | number[]} */ (value));
    }
    cache = { revision: parsed.revision, overrides };
    return cache;
  }

  /**
   * @param {TimingValues} overrides
   * @returns {TimingValues}
   */
  function effectiveOf(overrides) {
    /** @type {TimingValues} */
    const values = {};
    for (const key of Object.keys(TIMING_FIELDS)) {
      values[key] = cloneValue(overrides[key] ?? defaultOf(key));
    }
    return values;
  }

  /**
   * @returns {Record<string, TimingField>}
   */
  function fieldsWire() {
    /** @type {Record<string, TimingField>} */
    const fields = {};
    for (const [key, field] of Object.entries(TIMING_FIELDS)) {
      fields[key] = { ...field, default: defaultOf(key) };
    }
    return fields;
  }

  /**
   * @returns {TimingSnapshot}
   */
  function snapshot() {
    const state = ensureLoaded();
    /** @type {TimingValues} */
    const overrides = {};
    for (const [key, value] of Object.entries(state.overrides)) {
      overrides[key] = cloneValue(value);
    }
    return {
      revision: state.revision,
      values: effectiveOf(state.overrides),
      overrides,
      fields: fieldsWire()
    };
  }

  /**
   * @param {TimingValues} overrides
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
     * @returns {TimingValues}
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
     * @returns {TimingSetResult}
     */
    set(input) {
      const state = ensureLoaded();
      if (input.expected_revision !== state.revision) {
        return {
          ok: false,
          code: 'conflict',
          message: 'timing-settings-set: conflict',
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
      /** @type {TimingValues} */
      const next = {};
      for (const [key, value] of Object.entries(state.overrides)) {
        next[key] = cloneValue(value);
      }
      for (const [key, value] of Object.entries(input.values)) {
        const reason = Object.hasOwn(TIMING_FIELDS, key)
          ? value === null
            ? null
            : checkValue(TIMING_FIELDS[key], value)
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
          next[key] = cloneValue(/** @type {number | number[]} */ (value));
        }
      }
      const previous = effectiveOf(state.overrides);
      const revision = state.revision + 1;
      persistOverrides(next, revision);
      cache = { revision, overrides: next };
      const result = snapshot();
      for (const listener of [...listeners]) {
        try {
          listener(result, previous);
        } catch (err) {
          warn(`timing-settings: 변경 알림 처리 실패(${String(err)})`);
        }
      }
      return { ok: true, snapshot: result };
    },

    /**
     * Subscribe to successful writes.
     *
     * @param {(snapshot: TimingSnapshot, previous: TimingValues) => void} listener
     * @returns {() => void} Unsubscribe.
     */
    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Test hook: replace the overrides in memory (no disk) and notify.
     *
     * @param {TimingValues} overrides
     */
    __setOverridesForTest(overrides) {
      const state = ensureLoaded();
      const previous = effectiveOf(state.overrides);
      cache = { revision: state.revision + 1, overrides: { ...overrides } };
      const result = snapshot();
      for (const listener of [...listeners]) {
        listener(result, previous);
      }
    },

    /**
     * Drop the in-memory cache and the cached config default (test hook).
     */
    __clearCacheForTest() {
      cache = null;
      list_poll_default = null;
    }
  };
}

/** @type {ReturnType<typeof createTimingSettingsStore> | null} */
let STORE = null;

/**
 * The process-wide store every consumer and the WS channel share.
 *
 * @returns {ReturnType<typeof createTimingSettingsStore>}
 */
export function timingSettingsStore() {
  if (!STORE) {
    STORE = createTimingSettingsStore();
  }
  return STORE;
}

/**
 * Effective timing values at this moment. Read at the time a duration is
 * computed; never cache across schedule computations.
 *
 * @returns {TimingValues}
 */
export function getTimingSettings() {
  return timingSettingsStore().effective();
}

/**
 * Effective value of one scalar key.
 *
 * @param {string} key
 * @returns {number}
 */
export function timingSeconds(key) {
  return /** @type {number} */ (getTimingSettings()[key]);
}

/**
 * Effective value of one ladder key.
 *
 * @param {string} key
 * @returns {number[]}
 */
export function timingLadder(key) {
  return /** @type {number[]} */ (getTimingSettings()[key]);
}

/**
 * Subscribe to successful timing-settings writes.
 *
 * @param {(snapshot: TimingSnapshot, previous: TimingValues) => void} listener
 * @returns {() => void} Unsubscribe.
 */
export function onTimingSettingsChanged(listener) {
  return timingSettingsStore().onChange(listener);
}

/**
 * Test-only: drop the shared store so the next read starts from the defaults.
 */
export function __resetTimingSettingsForTest() {
  STORE = null;
}

/**
 * Test-only: pin the shared store's overrides in memory and notify listeners.
 *
 * @param {TimingValues} overrides
 */
export function __setTimingOverridesForTest(overrides) {
  timingSettingsStore().__setOverridesForTest(overrides);
}
