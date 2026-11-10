/**
 * Server-global active-login auto-switch settings, per runner (UI-32oq §4.1).
 *
 * Each runner (`claude`, `codex`) carries `{ auto_switch, default_account,
 * accounts, preempt_pct }`: whether bdui moves that runner's global active
 * login on its own, the default account it leaves from and returns to (it
 * need not be in `accounts`), the accounts it may move TO (for Codex the
 * order is the switch order), and the trigger (null means the provider's
 * exhausted level). Nothing here reaches a repo's Worker: every repo decision
 * reads that repo's own stored `provider_limit_policy` through
 * `normalizeProviderLimitPolicyEntry` — there is no global override.
 *
 * The file is `$XDG_STATE_HOME/bdui/limit-policy-settings.json`
 * (`{ revision, runners: { claude, codex }, rebind_pending }`). Reads are
 * fail-quiet and read-only: a missing or corrupt file reads as both runners
 * off, one bad runner falls back alone with one log line, and a file still in
 * the UI-giog shape (an entry with `scope`) reads converted in memory. Only
 * `migrate()` — which the server entry calls once at start — writes the
 * converted shape back, with one revision CAS, together with
 * `rebind_pending`: the runners whose scope was `global`, whose standing hold
 * verdicts were bound to the global policy and must be re-bound to each
 * repo's own. User writes are strict: a revision CAS, and a rejected request
 * writes nothing (`conflict`, `invalid_value`). Consumers read the current
 * value at decision time through the synchronous getters.
 *
 * This module also owns the repo policy's normalizer and strict patch check,
 * so the queue store, the scheduler, the candidate route and the WS handlers
 * share one rule set.
 *
 * @typedef {'claude'|'codex'} LimitPolicyRunner
 * @typedef {Object} ProviderLimitPolicy
 * @property {'wait'|'switch'} mode - What a usage limit does on this runner.
 * @property {string[]} accounts - Catalog keys the user allows a switch TO.
 * @property {number|null} preempt_pct - Preemptive switch threshold, or null.
 * @typedef {Object} ActiveSwitchSettings
 * @property {boolean} auto_switch - Whether the global active login moves on
 * its own.
 * @property {string|null} default_account - The account a departure starts
 * from and a return goes back to, or null while unset.
 * @property {string[]} accounts - Catalog keys the active login may move TO.
 * @property {number|null} preempt_pct - The trigger, or null for exhausted.
 * @typedef {Object} LimitPolicySnapshot
 * @property {number} revision
 * @property {Record<LimitPolicyRunner, ActiveSwitchSettings>} runners
 * @typedef {'conflict'|'invalid_value'} LimitPolicyErrorCode
 * @typedef {{ ok: true, snapshot: LimitPolicySnapshot }
 *   | { ok: false, code: LimitPolicyErrorCode, runner?: string, message: string, snapshot: LimitPolicySnapshot }} LimitPolicySetResult
 * @typedef {{ revision: number, runners: Record<LimitPolicyRunner, ActiveSwitchSettings>, rebind_pending: LimitPolicyRunner[], legacy: boolean }} LimitPolicyState
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { limitPolicySettingsFilePath } from './worker/state-paths.js';

/** @type {ReadonlyArray<LimitPolicyRunner>} */
export const LIMIT_POLICY_RUNNERS = Object.freeze(['claude', 'codex']);

/** The only fields a stored entry or a write patch may carry. */
const SWITCH_SETTINGS_FIELDS = Object.freeze([
  'auto_switch',
  'default_account',
  'accounts',
  'preempt_pct'
]);

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {unknown} runner
 * @returns {runner is LimitPolicyRunner}
 */
function isRunner(runner) {
  return runner === 'claude' || runner === 'codex';
}

/**
 * Whether a value can name a catalog account: a non-empty key of at most 256
 * characters without whitespace.
 *
 * @param {unknown} value
 * @returns {value is string}
 */
function isAccountKey(value) {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value.length <= 256 &&
    !/\s/.test(value)
  );
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isPreemptPct(value) {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 99
  );
}

/**
 * Account keys in their given order, without duplicates or illegal entries.
 *
 * @param {unknown} value
 * @returns {string[]}
 */
function normalizeAccountKeys(value) {
  /** @type {string[]} */
  const accounts = [];
  if (Array.isArray(value)) {
    for (const entry of value) {
      if (isAccountKey(entry) && !accounts.includes(entry)) {
        accounts.push(entry);
      }
    }
  }
  return accounts;
}

/**
 * Build the per-runner default: switching is on, but the allowed set is empty,
 * so nothing switches until the user picks accounts (UI-13o1 §3.1 decision 1).
 *
 * @returns {ProviderLimitPolicy}
 */
export function defaultProviderLimitPolicy() {
  return { mode: 'switch', accounts: [], preempt_pct: null };
}

/**
 * Normalize one runner's stored repo policy, dropping values outside the
 * contract. Every repo decision reads its policy through here.
 *
 * @param {unknown} value
 * @returns {ProviderLimitPolicy}
 */
export function normalizeProviderLimitPolicyEntry(value) {
  if (!isRecord(value)) {
    return defaultProviderLimitPolicy();
  }
  return {
    mode: value.mode === 'wait' ? 'wait' : 'switch',
    accounts: normalizeAccountKeys(value.accounts),
    preempt_pct: isPreemptPct(value.preempt_pct) ? value.preempt_pct : null
  };
}

/**
 * Strictly check one repo policy patch: every field present must be legal.
 * The stored set decides which paid account the Worker spends next, so a
 * malformed patch is refused rather than silently normalized.
 *
 * @param {unknown} patch
 * @returns {string|null} Why the patch is refused, or null when it is legal.
 */
export function providerLimitPolicyPatchError(patch) {
  if (!isRecord(patch)) {
    return 'payload requires { patch: object }';
  }
  if ('mode' in patch && patch.mode !== 'wait' && patch.mode !== 'switch') {
    return "mode must be 'wait' or 'switch'";
  }
  if ('accounts' in patch) {
    if (!Array.isArray(patch.accounts) || !patch.accounts.every(isAccountKey)) {
      return 'accounts must be an array of account keys';
    }
  }
  if (
    'preempt_pct' in patch &&
    patch.preempt_pct !== null &&
    !isPreemptPct(patch.preempt_pct)
  ) {
    return 'preempt_pct must be null or an integer 1-99';
  }
  return null;
}

/**
 * Strictly check one active-switch settings patch: only the four known
 * fields, each legal. An unknown field (an old client's `scope`/`mode`) is
 * refused so the writer learns the shape changed.
 *
 * @param {unknown} patch
 * @returns {string|null} Why the patch is refused, or null when it is legal.
 */
function switchSettingsPatchError(patch) {
  if (!isRecord(patch)) {
    return 'runner patch must be an object';
  }
  for (const field of Object.keys(patch)) {
    if (!SWITCH_SETTINGS_FIELDS.includes(field)) {
      return `unknown field: ${field}`;
    }
  }
  if ('auto_switch' in patch && typeof patch.auto_switch !== 'boolean') {
    return 'auto_switch must be a boolean';
  }
  if (
    'default_account' in patch &&
    patch.default_account !== null &&
    !isAccountKey(patch.default_account)
  ) {
    return 'default_account must be null or an account key';
  }
  return providerLimitPolicyPatchError({
    ...('accounts' in patch ? { accounts: patch.accounts } : {}),
    ...('preempt_pct' in patch ? { preempt_pct: patch.preempt_pct } : {})
  });
}

/**
 * The settings a missing or broken entry reads as: auto switch off, no
 * default, no target accounts (UI-32oq §4.7).
 *
 * @returns {ActiveSwitchSettings}
 */
export function defaultActiveSwitchSettings() {
  return {
    auto_switch: false,
    default_account: null,
    accounts: [],
    preempt_pct: null
  };
}

/**
 * @returns {Record<LimitPolicyRunner, ActiveSwitchSettings>}
 */
function defaultRunners() {
  return {
    claude: defaultActiveSwitchSettings(),
    codex: defaultActiveSwitchSettings()
  };
}

/**
 * @param {ActiveSwitchSettings} entry
 * @returns {ActiveSwitchSettings}
 */
function cloneEntry(entry) {
  return { ...entry, accounts: [...entry.accounts] };
}

/**
 * @param {Record<LimitPolicyRunner, ActiveSwitchSettings>} runners
 * @returns {Record<LimitPolicyRunner, ActiveSwitchSettings>}
 */
function cloneRunners(runners) {
  return {
    claude: cloneEntry(runners.claude),
    codex: cloneEntry(runners.codex)
  };
}

/**
 * Normalize one legal settings record (stored entry or merged patch).
 *
 * @param {Record<string, unknown>} value
 * @returns {ActiveSwitchSettings}
 */
function normalizeSwitchSettings(value) {
  return {
    auto_switch: value.auto_switch === true,
    default_account: isAccountKey(value.default_account)
      ? value.default_account
      : null,
    accounts: normalizeAccountKeys(value.accounts),
    preempt_pct: isPreemptPct(value.preempt_pct) ? value.preempt_pct : null
  };
}

/**
 * Why one persisted entry in the current shape is not usable, or null.
 *
 * @param {unknown} raw
 * @returns {string|null}
 */
function storedEntryError(raw) {
  if (!isRecord(raw)) {
    return '객체가 아닙니다';
  }
  // A persisted entry is a whole value, not a patch: a missing field must not
  // fall back to a default and silently turn a switch on or off.
  for (const field of SWITCH_SETTINGS_FIELDS) {
    if (!(field in raw)) {
      return `${field} 필드가 없습니다`;
    }
  }
  return switchSettingsPatchError(raw);
}

/**
 * Convert one UI-giog entry (`{ scope, mode, accounts, preempt_pct }`) to the
 * current shape (§4.1 migration): the auto switch is on only where the old
 * entry switched the global login — scope `global`, mode `switch`, a
 * non-empty allow list — and the default is left for the user to pick. An
 * entry the old reader would have refused read as `repo` there, so it
 * converts to the default and was never `global`.
 *
 * @param {Record<string, unknown>} raw
 * @returns {{ entry: ActiveSwitchSettings, global: boolean, error: string|null }}
 */
function convertLegacyEntry(raw) {
  /** @type {string|null} */
  let error = null;
  if (raw.scope !== 'repo' && raw.scope !== 'global') {
    error = "scope는 'repo' 또는 'global'이어야 합니다";
  } else {
    for (const field of ['mode', 'accounts', 'preempt_pct']) {
      if (!(field in raw)) {
        error = `${field} 필드가 없습니다`;
        break;
      }
    }
  }
  error = error ?? providerLimitPolicyPatchError(raw);
  if (error !== null) {
    return { entry: defaultActiveSwitchSettings(), global: false, error };
  }
  const policy = normalizeProviderLimitPolicyEntry(raw);
  const global = raw.scope === 'global';
  return {
    entry: {
      auto_switch:
        global && policy.mode === 'switch' && policy.accounts.length > 0,
      default_account: null,
      accounts: policy.accounts,
      preempt_pct: policy.preempt_pct
    },
    global,
    error: null
  };
}

/**
 * Runner names of a stored `rebind_pending`, unknown or repeated ones dropped.
 *
 * @param {unknown} value
 * @returns {LimitPolicyRunner[]}
 */
function normalizeRebindPending(value) {
  /** @type {LimitPolicyRunner[]} */
  const pending = [];
  if (Array.isArray(value)) {
    for (const entry of value) {
      if (isRunner(entry) && !pending.includes(entry)) {
        pending.push(entry);
      }
    }
  }
  return pending;
}

/**
 * Create a limit-policy settings store. The server shares one instance (see
 * `limitPolicySettingsStore()`) so the revision CAS is authoritative
 * in-process.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: typeof import('node:fs'),
 *   warn?: (message: string) => void
 * }} [options]
 */
export function createLimitPolicySettingsStore(options = {}) {
  const filePath = options.filePath ?? limitPolicySettingsFilePath;
  const fs = options.fs ?? nodeFs;
  const warn = options.warn ?? console.warn;

  /** @type {LimitPolicyState | null} */
  let cache = null;
  /** @type {Set<(snapshot: LimitPolicySnapshot, previous: LimitPolicySnapshot) => void>} */
  const listeners = new Set();

  /**
   * @returns {LimitPolicyState}
   */
  function defaultState() {
    return {
      revision: 0,
      runners: defaultRunners(),
      rebind_pending: [],
      legacy: false
    };
  }

  /**
   * Read the file once. Never writes: an old-shape file is converted in
   * memory and stays old on disk until `migrate()`.
   *
   * @returns {LimitPolicyState}
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
          `limit-policy-settings: ${filePath()} 읽기 실패(${String(err)}): 자동 전환 끔으로 읽습니다.`
        );
      }
    }
    if (text === null) {
      cache = defaultState();
      return cache;
    }
    /** @type {unknown} */
    let raw = null;
    try {
      raw = JSON.parse(text);
    } catch {
      raw = null;
    }
    if (
      !isRecord(raw) ||
      typeof raw.revision !== 'number' ||
      !Number.isInteger(raw.revision) ||
      raw.revision < 0 ||
      !isRecord(raw.runners)
    ) {
      warn(
        `limit-policy-settings: ${filePath()} 무시: 형식이 잘못되어 자동 전환 끔으로 읽습니다.`
      );
      cache = defaultState();
      return cache;
    }
    const runners = defaultRunners();
    let legacy = false;
    /** @type {LimitPolicyRunner[]} */
    const legacy_global = [];
    for (const runner of LIMIT_POLICY_RUNNERS) {
      const entry = raw.runners[runner];
      if (entry === undefined) {
        continue;
      }
      if (isRecord(entry) && 'scope' in entry) {
        legacy = true;
        const converted = convertLegacyEntry(entry);
        if (converted.error !== null) {
          warn(
            `limit-policy-settings: ${runner} 옛 값 무시(${converted.error}): 자동 전환 끔으로 읽습니다.`
          );
        }
        runners[runner] = converted.entry;
        if (converted.global) {
          legacy_global.push(runner);
        }
        continue;
      }
      const reason = storedEntryError(entry);
      if (reason) {
        warn(
          `limit-policy-settings: ${runner} 무시(${reason}): 자동 전환 끔으로 읽습니다.`
        );
        continue;
      }
      runners[runner] = normalizeSwitchSettings(
        /** @type {Record<string, unknown>} */ (entry)
      );
    }
    cache = {
      revision: raw.revision,
      runners,
      rebind_pending: legacy
        ? legacy_global
        : normalizeRebindPending(raw.rebind_pending),
      legacy
    };
    return cache;
  }

  /**
   * @returns {LimitPolicySnapshot}
   */
  function snapshot() {
    const state = ensureLoaded();
    return { revision: state.revision, runners: cloneRunners(state.runners) };
  }

  /**
   * Write the whole file atomically. Every write carries `rebind_pending`, so
   * a user write never drops a re-binding the migration left pending.
   *
   * @param {Omit<LimitPolicyState, 'legacy'>} state
   */
  function persist(state) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(
      tmp,
      JSON.stringify(
        {
          revision: state.revision,
          runners: state.runners,
          rebind_pending: state.rebind_pending
        },
        null,
        2
      )
    );
    fs.renameSync(tmp, file);
  }

  /**
   * @param {LimitPolicySnapshot} result
   * @param {LimitPolicySnapshot} previous
   */
  function emit(result, previous) {
    for (const listener of [...listeners]) {
      try {
        listener(result, previous);
      } catch (err) {
        warn(`limit-policy-settings: 변경 알림 처리 실패(${String(err)})`);
      }
    }
  }

  return {
    snapshot,

    /**
     * One runner's current settings (a copy).
     *
     * @param {LimitPolicyRunner} runner
     * @returns {ActiveSwitchSettings}
     */
    runner(runner) {
      return cloneEntry(ensureLoaded().runners[runner]);
    },

    /**
     * Rewrite a UI-giog-shape file in the current shape, once, with the
     * converted `rebind_pending` (§4.1). A file already current is left
     * alone. A failed write is logged and the converted value keeps serving
     * from memory; the next start reads the old file and tries again.
     *
     * @returns {{ migrated: boolean, rebind_pending: LimitPolicyRunner[] }}
     */
    migrate() {
      const state = ensureLoaded();
      if (!state.legacy) {
        return { migrated: false, rebind_pending: [...state.rebind_pending] };
      }
      const revision = state.revision + 1;
      try {
        persist({ ...state, revision });
      } catch (err) {
        warn(
          `limit-policy-settings: 새 모양 이전 쓰기 실패(${String(err)}): 다음 시작에 다시 합니다.`
        );
        return { migrated: false, rebind_pending: [...state.rebind_pending] };
      }
      cache = { ...state, revision, legacy: false };
      return { migrated: true, rebind_pending: [...state.rebind_pending] };
    },

    /**
     * The runners whose hold verdicts still wait to be re-bound (a copy).
     *
     * @returns {LimitPolicyRunner[]}
     */
    rebindPending() {
      return [...ensureLoaded().rebind_pending];
    },

    /**
     * Drop one runner from `rebind_pending` once every repo re-bound it. The
     * read-modify-write runs synchronously on the one in-process state, so a
     * concurrent user write can neither lose this removal nor be lost to it.
     * The revision does not move: `rebind_pending` is not part of the
     * snapshot a client compares against. False when the write failed (the
     * runner stays pending, in memory and on disk, for the next start).
     *
     * @param {LimitPolicyRunner} runner
     * @returns {boolean}
     */
    completeRebind(runner) {
      const state = ensureLoaded();
      if (!state.rebind_pending.includes(runner)) {
        return true;
      }
      const rebind_pending = state.rebind_pending.filter(
        (entry) => entry !== runner
      );
      try {
        persist({ ...state, rebind_pending });
      } catch (err) {
        warn(
          `limit-policy-settings: ${runner} 재결속 완료 쓰기 실패(${String(err)}): 다음 시작에 다시 합니다.`
        );
        return false;
      }
      cache = { ...state, rebind_pending, legacy: false };
      return true;
    },

    /**
     * Apply one request: per-runner patches merged over the current entries.
     * CAS-guarded and all-or-nothing: any invalid runner or field writes
     * nothing. A persist failure throws and leaves memory unchanged.
     *
     * @param {{ expected_revision: unknown, runners: unknown }} input
     * @returns {LimitPolicySetResult}
     */
    set(input) {
      const state = ensureLoaded();
      if (input.expected_revision !== state.revision) {
        return {
          ok: false,
          code: 'conflict',
          message: 'limit-policy-settings-set: conflict',
          snapshot: snapshot()
        };
      }
      if (!isRecord(input.runners)) {
        return {
          ok: false,
          code: 'invalid_value',
          message: 'runners는 러너별 patch 객체여야 합니다',
          snapshot: snapshot()
        };
      }
      const next = cloneRunners(state.runners);
      for (const [runner, patch] of Object.entries(input.runners)) {
        if (!isRunner(runner)) {
          return {
            ok: false,
            code: 'invalid_value',
            runner,
            message: '알 수 없는 러너입니다',
            snapshot: snapshot()
          };
        }
        const reason = switchSettingsPatchError(patch);
        if (reason) {
          return {
            ok: false,
            code: 'invalid_value',
            runner,
            message: reason,
            snapshot: snapshot()
          };
        }
        next[runner] = normalizeSwitchSettings({
          ...next[runner],
          .../** @type {Record<string, unknown>} */ (patch)
        });
      }
      const previous = snapshot();
      const revision = state.revision + 1;
      persist({
        revision,
        runners: next,
        rebind_pending: state.rebind_pending
      });
      cache = {
        revision,
        runners: next,
        rebind_pending: state.rebind_pending,
        legacy: false
      };
      const result = snapshot();
      emit(result, previous);
      return { ok: true, snapshot: result };
    },

    /**
     * Subscribe to successful writes.
     *
     * @param {(snapshot: LimitPolicySnapshot, previous: LimitPolicySnapshot) => void} listener
     * @returns {() => void} Unsubscribe.
     */
    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Test hook: replace runner entries in memory (no disk) and notify.
     *
     * @param {Partial<Record<LimitPolicyRunner, Partial<ActiveSwitchSettings>>>} runners
     */
    __setRunnersForTest(runners) {
      const state = ensureLoaded();
      const previous = snapshot();
      const next = cloneRunners(state.runners);
      for (const runner of LIMIT_POLICY_RUNNERS) {
        const patch = runners[runner];
        if (patch) {
          next[runner] = normalizeSwitchSettings({ ...next[runner], ...patch });
        }
      }
      cache = { ...state, revision: state.revision + 1, runners: next };
      emit(snapshot(), previous);
    },

    /** Drop the in-memory cache (test hook). */
    __clearCacheForTest() {
      cache = null;
    }
  };
}

/** @type {ReturnType<typeof createLimitPolicySettingsStore> | null} */
let STORE = null;

/**
 * The process-wide store every consumer and the WS channel share.
 *
 * @returns {ReturnType<typeof createLimitPolicySettingsStore>}
 */
export function limitPolicySettingsStore() {
  if (!STORE) {
    STORE = createLimitPolicySettingsStore();
  }
  return STORE;
}

/**
 * One runner's active-switch settings at this moment. Read at decision time;
 * never cache across judgments.
 *
 * @param {LimitPolicyRunner} runner
 * @returns {ActiveSwitchSettings}
 */
export function activeSwitchSettingsOf(runner) {
  return limitPolicySettingsStore().runner(runner);
}

/**
 * Subscribe to successful limit-policy settings writes.
 *
 * @param {(snapshot: LimitPolicySnapshot, previous: LimitPolicySnapshot) => void} listener
 * @returns {() => void} Unsubscribe.
 */
export function onLimitPolicySettingsChanged(listener) {
  return limitPolicySettingsStore().onChange(listener);
}

/**
 * Test-only: drop the shared store so the next read starts from the file.
 */
export function __resetLimitPolicySettingsForTest() {
  STORE = null;
}

/**
 * Test-only: pin runner entries of the shared store in memory and notify.
 *
 * @param {Partial<Record<LimitPolicyRunner, Partial<ActiveSwitchSettings>>>} runners
 */
export function __setLimitPolicySettingsForTest(runners) {
  limitPolicySettingsStore().__setRunnersForTest(runners);
}
