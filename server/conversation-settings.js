/**
 * Server-global Worker session conversation settings (UI-jbl1 §3.4).
 *
 * One table (`CONVERSATION_SETTINGS_FIELDS`) owns the launch knobs every
 * Worker session conversation reads — 멈춤, 실패 and 외부 작업 완료 alike:
 *
 *   - `auto_launch`: the ONE automatic-launch switch the 멈춤 and 실패
 *     conversations share. Unset, it reads config.toml
 *     `[worker.direction_inquiry] enabled`.
 *   - `fresh_runtime`: which CLI a FRESH conversation runs (`inherit` keeps the
 *     original session's provider). A resume or fork always keeps the
 *     original session's runtime, so this is never read for one.
 *   - `<runner>_model` / `<runner>_effort`: flags appended to every
 *     conversation launch of that runtime; unset means "따름" — no flag.
 *
 * Deliberately NOT a `workflow_session_defaults` key: that table is the
 * contract's registered vocabulary and the dotfiles skills never read these.
 *
 * The file holds only the keys a person changed (`{ revision, overrides }`).
 * Reads are fail-quiet (a missing or corrupt file yields config.toml's switch
 * and "따름"; a bad key falls back alone with one log line); writes are strict
 * and write nothing when rejected.
 *
 * @typedef {'inherit'|'claude'|'codex'} FreshRuntime
 * @typedef {'claude'|'codex'} ConversationRunner
 * @typedef {Object} ConversationSettingValues
 * @property {boolean} auto_launch
 * @property {FreshRuntime} fresh_runtime
 * @property {string|null} claude_model
 * @property {string|null} claude_effort
 * @property {string|null} codex_model
 * @property {string|null} codex_effort
 * @typedef {Object} ConversationSettingFieldWire
 * @property {'boolean'|'choice'|'model'|'effort'} kind
 * @property {boolean|string|null} default
 * @property {string[]} [choices]
 * @property {ConversationRunner} [runner]
 * @typedef {Object} ConversationSettingsSnapshot
 * @property {number} revision
 * @property {ConversationSettingValues} values - Effective values.
 * @property {Partial<ConversationSettingValues>} overrides
 * @property {Record<string, ConversationSettingFieldWire>} fields
 * @typedef {'conflict'|'invalid_value'} ConversationSettingsErrorCode
 * @typedef {{ ok: true, snapshot: ConversationSettingsSnapshot }
 *   | { ok: false, code: ConversationSettingsErrorCode, key?: string, message: string, snapshot: ConversationSettingsSnapshot }} ConversationSettingsSetResult
 * @typedef {{ runners: Record<string, { models: Record<string, { id: string, efforts?: string[] }>, efforts: string[] }> }} CatalogLike
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { getConfig } from './config.js';
import { runtimeCatalog } from './worker/runner/index.js';
import { stateHome } from './worker/state-paths.js';

/** The fresh-runtime vocabulary, in display order. */
export const FRESH_RUNTIMES = /** @type {const} */ ([
  'inherit',
  'claude',
  'codex'
]);

/**
 * The parameter table. `default` of `auto_launch` comes from config.toml; the
 * model and effort choices come from the runner catalog.
 *
 * @type {Readonly<Record<keyof ConversationSettingValues, Readonly<{ kind: ConversationSettingFieldWire['kind'], runner?: ConversationRunner, default?: string|null }>>>}
 */
export const CONVERSATION_SETTINGS_FIELDS = Object.freeze({
  auto_launch: { kind: 'boolean' },
  // 2026-10-06 user decision: claude, because a fresh Codex conversation's
  // Discord thread link is not yet confirmed.
  fresh_runtime: { kind: 'choice', default: 'claude' },
  claude_model: { kind: 'model', runner: 'claude', default: null },
  claude_effort: { kind: 'effort', runner: 'claude', default: null },
  codex_model: { kind: 'model', runner: 'codex', default: null },
  codex_effort: { kind: 'effort', runner: 'codex', default: null }
});

/**
 * Absolute path to the settings file.
 *
 * @returns {string} `$XDG_STATE_HOME/bdui/conversation-settings.json`.
 */
export function conversationSettingsFilePath() {
  return path.join(stateHome(), 'bdui', 'conversation-settings.json');
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The model names a runner's catalog lists, in catalog order.
 *
 * @param {CatalogLike} catalog
 * @param {string} runner
 * @returns {string[]}
 */
function modelChoices(catalog, runner) {
  const entry = catalog?.runners?.[runner];
  return entry && isRecord(entry.models) ? Object.keys(entry.models) : [];
}

/**
 * The efforts the chosen model accepts — its own list when it pins one, else
 * the runner's — or the runner-wide list when the model is left to the CLI
 * default. An effort is only valid as a pair with the model it launches with.
 *
 * @param {CatalogLike} catalog
 * @param {string} runner
 * @param {unknown} model - The stored model of that runner, or null.
 * @returns {string[]}
 */
function effortChoices(catalog, runner, model) {
  const entry = catalog?.runners?.[runner];
  if (!entry) {
    return [];
  }
  const model_entry =
    typeof model === 'string' && isRecord(entry.models)
      ? entry.models[model]
      : undefined;
  const list = Array.isArray(model_entry?.efforts)
    ? model_entry.efforts
    : Array.isArray(entry.efforts)
      ? entry.efforts
      : [];
  return list.filter((effort) => typeof effort === 'string');
}

/**
 * The stored model an effort field pairs with.
 *
 * @param {keyof ConversationSettingValues} key
 * @param {Record<string, unknown>} overrides
 * @returns {unknown}
 */
function pairedModel(key, overrides) {
  const field = CONVERSATION_SETTINGS_FIELDS[key];
  return field.kind === 'effort' ? overrides[`${field.runner}_model`] : null;
}

/**
 * The choices one field accepts; an effort's depend on its runner's model.
 *
 * @param {keyof ConversationSettingValues} key
 * @param {CatalogLike} catalog
 * @param {Record<string, unknown>} overrides - The overrides it pairs with.
 * @returns {string[]|null} Null for the boolean field.
 */
function choicesOf(key, catalog, overrides) {
  const field = CONVERSATION_SETTINGS_FIELDS[key];
  if (field.kind === 'choice') {
    return [...FRESH_RUNTIMES];
  }
  if (field.kind === 'model') {
    return modelChoices(catalog, /** @type {string} */ (field.runner));
  }
  if (field.kind === 'effort') {
    return effortChoices(
      catalog,
      /** @type {string} */ (field.runner),
      pairedModel(key, overrides)
    );
  }
  return null;
}

/**
 * Whether a key names an effort field.
 *
 * @param {string} key
 * @returns {boolean}
 */
function isEffortKey(key) {
  return (
    Object.hasOwn(CONVERSATION_SETTINGS_FIELDS, key) &&
    CONVERSATION_SETTINGS_FIELDS[
      /** @type {keyof ConversationSettingValues} */ (key)
    ].kind === 'effort'
  );
}

/**
 * Validate one non-null value against its field.
 *
 * @param {keyof ConversationSettingValues} key
 * @param {unknown} value
 * @param {CatalogLike} catalog
 * @param {Record<string, unknown>} overrides - The overrides it pairs with.
 * @returns {string|null} Why the value is rejected, or null when it is valid.
 */
function checkValue(key, value, catalog, overrides) {
  const field = CONVERSATION_SETTINGS_FIELDS[key];
  if (field.kind === 'boolean') {
    return typeof value === 'boolean' ? null : '참·거짓이어야 합니다';
  }
  const choices = /** @type {string[]} */ (choicesOf(key, catalog, overrides));
  if (typeof value !== 'string' || !choices.includes(value)) {
    return `다음 중 하나여야 합니다: ${choices.join(', ')}`;
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
 * The automatic-launch declaration in config.toml; a broken config reads false.
 *
 * @returns {boolean}
 */
function configAutoLaunch() {
  try {
    return getConfig().worker_direction_inquiry?.enabled === true;
  } catch {
    return false;
  }
}

/**
 * The CLI flags a conversation launch of `runner` carries for the stored
 * model and effort — the same spelling the headless runners use
 * (`runner/claude.js`, `runner/codex.js`). "따름" (null) adds nothing.
 *
 * @param {string} runner
 * @param {Pick<ConversationSettingValues, 'claude_model'|'claude_effort'|'codex_model'|'codex_effort'>} values
 * @param {CatalogLike|null} [catalog]
 * @returns {string[]}
 */
export function conversationLaunchFlags(runner, values, catalog = null) {
  if (runner !== 'claude' && runner !== 'codex') {
    return [];
  }
  const model = runner === 'claude' ? values.claude_model : values.codex_model;
  const effort =
    runner === 'claude' ? values.claude_effort : values.codex_effort;
  /** @type {string[]} */
  const flags = [];
  if (typeof model === 'string' && model.length > 0) {
    const entry = catalog?.runners?.[runner]?.models?.[model];
    const id = typeof entry?.id === 'string' && entry.id ? entry.id : model;
    flags.push(runner === 'claude' ? '--model' : '-m', id);
  }
  if (typeof effort === 'string' && effort.length > 0) {
    flags.push(
      ...(runner === 'claude'
        ? ['--effort', effort]
        : ['-c', `model_reasoning_effort=${effort}`])
    );
  }
  return flags;
}

/**
 * The runtime a FRESH conversation runs: the setting, or the inherited
 * provider when the setting is `inherit`.
 *
 * @param {Pick<ConversationSettingValues, 'fresh_runtime'>} values
 * @param {ConversationRunner} inherited
 * @returns {ConversationRunner}
 */
export function freshConversationRuntime(values, inherited) {
  return values.fresh_runtime === 'claude' || values.fresh_runtime === 'codex'
    ? values.fresh_runtime
    : inherited;
}

/**
 * Create a conversation-settings store. The server shares one instance (see
 * `conversationSettingsStore()`) so the revision CAS is authoritative
 * in-process.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: typeof import('node:fs'),
 *   warn?: (message: string) => void,
 *   configAutoLaunch?: () => boolean,
 *   catalog?: () => CatalogLike
 * }} [options]
 */
export function createConversationSettingsStore(options = {}) {
  const filePath = options.filePath ?? conversationSettingsFilePath;
  const fs = options.fs ?? nodeFs;
  const warn = options.warn ?? console.warn;
  const readConfigAutoLaunch = options.configAutoLaunch ?? configAutoLaunch;
  const readCatalog =
    options.catalog ?? (() => /** @type {CatalogLike} */ (runtimeCatalog()));

  /** @type {{ revision: number, overrides: Partial<ConversationSettingValues> } | null} */
  let cache = null;

  /** @returns {CatalogLike} */
  function catalog() {
    try {
      return readCatalog();
    } catch {
      return { runners: {} };
    }
  }

  /**
   * @returns {{ revision: number, overrides: Partial<ConversationSettingValues> }}
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
          `conversation-settings: ${filePath()} 읽기 실패(${String(err)}): config.toml 값과 "따름"으로 읽습니다.`
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
        `conversation-settings: ${filePath()} 무시: 형식이 잘못되어 config.toml 값과 "따름"으로 읽습니다.`
      );
      cache = { revision: 0, overrides: {} };
      return cache;
    }
    const current_catalog = catalog();
    /** @type {Record<string, unknown>} */
    const overrides = {};
    // An effort is checked against the model already accepted, so efforts go
    // last whatever the file's key order.
    const entries = Object.entries(parsed.overrides).sort(
      ([a], [b]) => Number(isEffortKey(a)) - Number(isEffortKey(b))
    );
    for (const [key, value] of entries) {
      const reason = Object.hasOwn(CONVERSATION_SETTINGS_FIELDS, key)
        ? checkValue(
            /** @type {keyof ConversationSettingValues} */ (key),
            value,
            current_catalog,
            overrides
          )
        : '알 수 없는 키입니다';
      if (reason) {
        warn(
          `conversation-settings: ${key} 무시(${reason}): 기본값으로 읽습니다.`
        );
        continue;
      }
      overrides[key] = value;
    }
    cache = {
      revision: parsed.revision,
      overrides: /** @type {Partial<ConversationSettingValues>} */ (overrides)
    };
    return cache;
  }

  /**
   * @param {Partial<ConversationSettingValues>} overrides
   * @returns {ConversationSettingValues}
   */
  function effectiveOf(overrides) {
    return {
      auto_launch:
        typeof overrides.auto_launch === 'boolean'
          ? overrides.auto_launch
          : readConfigAutoLaunch(),
      fresh_runtime:
        overrides.fresh_runtime ??
        /** @type {FreshRuntime} */ (
          CONVERSATION_SETTINGS_FIELDS.fresh_runtime.default
        ),
      claude_model: overrides.claude_model ?? null,
      claude_effort: overrides.claude_effort ?? null,
      codex_model: overrides.codex_model ?? null,
      codex_effort: overrides.codex_effort ?? null
    };
  }

  /**
   * @returns {ConversationSettingsSnapshot}
   */
  function snapshot() {
    const state = ensureLoaded();
    const current_catalog = catalog();
    /** @type {Record<string, ConversationSettingFieldWire>} */
    const fields = {};
    for (const [key, field] of Object.entries(CONVERSATION_SETTINGS_FIELDS)) {
      const choices = choicesOf(
        /** @type {keyof ConversationSettingValues} */ (key),
        current_catalog,
        state.overrides
      );
      fields[key] = {
        kind: field.kind,
        default:
          field.kind === 'boolean'
            ? readConfigAutoLaunch()
            : (field.default ?? null),
        ...(choices ? { choices } : {}),
        ...(field.runner ? { runner: field.runner } : {})
      };
    }
    return {
      revision: state.revision,
      values: effectiveOf(state.overrides),
      overrides: { ...state.overrides },
      fields
    };
  }

  /**
   * @param {Partial<ConversationSettingValues>} overrides
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
     * Effective values: each override, else its default.
     *
     * @returns {ConversationSettingValues}
     */
    effective() {
      return effectiveOf(ensureLoaded().overrides);
    },

    /**
     * The stored automatic-launch switch, or null when none is stored and
     * config.toml decides.
     *
     * @returns {boolean|null}
     */
    storedAutoLaunch() {
      const value = ensureLoaded().overrides.auto_launch;
      return typeof value === 'boolean' ? value : null;
    },

    /**
     * The flags a launch of `runner` carries now.
     *
     * @param {string} runner
     * @returns {string[]}
     */
    launchFlags(runner) {
      return conversationLaunchFlags(
        runner,
        effectiveOf(ensureLoaded().overrides),
        catalog()
      );
    },

    /**
     * Apply one request. CAS-guarded and all-or-nothing: any invalid key writes
     * nothing. A `null` value clears that key's override. A persist failure
     * throws and leaves memory unchanged.
     *
     * @param {{ expected_revision: unknown, values: unknown }} input
     * @returns {ConversationSettingsSetResult}
     */
    set(input) {
      const state = ensureLoaded();
      if (input.expected_revision !== state.revision) {
        return {
          ok: false,
          code: 'conflict',
          message: 'conversation-settings-set: conflict',
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
      const current_catalog = catalog();
      /** @type {Record<string, unknown>} */
      const next = { ...state.overrides };
      for (const [key, value] of Object.entries(input.values)) {
        const reason = Object.hasOwn(CONVERSATION_SETTINGS_FIELDS, key)
          ? value === null || isEffortKey(key)
            ? null
            : checkValue(
                /** @type {keyof ConversationSettingValues} */ (key),
                value,
                current_catalog,
                next
              )
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
          next[key] = value;
        }
      }
      // Every stored effort — sent now or kept — must pair with the model it
      // will launch with after this request.
      for (const key of Object.keys(next)) {
        if (!isEffortKey(key)) {
          continue;
        }
        const reason = checkValue(
          /** @type {keyof ConversationSettingValues} */ (key),
          next[key],
          current_catalog,
          next
        );
        if (reason) {
          return {
            ok: false,
            code: 'invalid_value',
            key,
            message: reason,
            snapshot: snapshot()
          };
        }
      }
      const revision = state.revision + 1;
      const overrides = /** @type {Partial<ConversationSettingValues>} */ (
        next
      );
      persistOverrides(overrides, revision);
      cache = { revision, overrides };
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

/** @type {ReturnType<typeof createConversationSettingsStore> | null} */
let STORE = null;

/**
 * The process-wide store the launchers and the WS channel share.
 *
 * @returns {ReturnType<typeof createConversationSettingsStore>}
 */
export function conversationSettingsStore() {
  if (!STORE) {
    STORE = createConversationSettingsStore();
  }
  return STORE;
}

/**
 * Effective conversation settings at this moment. Read per launch; never
 * cached by a caller.
 *
 * @returns {ConversationSettingValues}
 */
export function getConversationSettings() {
  return conversationSettingsStore().effective();
}

/**
 * The shared switch: the stored value, else `config_enabled` — the caller's
 * own reading of config.toml `[worker.direction_inquiry] enabled`.
 *
 * @param {boolean} config_enabled
 * @returns {boolean}
 */
export function conversationAutoLaunchEnabled(config_enabled) {
  /** @type {boolean|null} */
  let stored = null;
  try {
    stored = conversationSettingsStore().storedAutoLaunch();
  } catch {
    stored = null;
  }
  return stored ?? config_enabled === true;
}

/**
 * Test-only: drop the shared store so the next read starts from the file.
 */
export function __resetConversationSettingsForTest() {
  STORE = null;
}
