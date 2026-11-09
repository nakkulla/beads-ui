/**
 * Server-global usage-limit policy and its per-runner apply scope (UI-giog
 * §4.1-§4.3).
 *
 * Each runner (`claude`, `codex`) carries one global policy in the same shape
 * as a repo's `provider_limit_policy[runner]` — `{ mode, accounts,
 * preempt_pct }` — plus `scope: 'repo'|'global'`. `global` makes the global
 * policy the EFFECTIVE policy of every registered repo for that runner and
 * turns on the global active-login switch; `repo` keeps each repo's own
 * policy and never switches the global login. Repo values are never written
 * here: `effectiveLimitPolicy` overlays them at read time.
 *
 * The file is `$XDG_STATE_HOME/bdui/limit-policy-settings.json`
 * (`{ revision, runners: { claude, codex } }`). Reads are fail-quiet (a missing
 * or corrupt file reads as the defaults; one bad runner falls back alone with
 * one log line), so a broken file reads as `repo` and neither overrides a repo
 * nor switches a login. Writes are strict: a revision CAS, and a rejected
 * request writes nothing (`conflict`, `invalid_value`). Consumers read the
 * current value at decision time through the synchronous getters.
 *
 * This module also owns the repo policy's normalizer and strict patch check,
 * so the queue store, the WS handlers and the global store share one rule set.
 *
 * @typedef {'claude'|'codex'} LimitPolicyRunner
 * @typedef {'repo'|'global'} LimitPolicyScope
 * @typedef {Object} ProviderLimitPolicy
 * @property {'wait'|'switch'} mode - What a usage limit does on this runner.
 * @property {string[]} accounts - Catalog keys the user allows a switch TO.
 * @property {number|null} preempt_pct - Preemptive switch threshold, or null.
 * @typedef {ProviderLimitPolicy & { scope: LimitPolicyScope }} GlobalLimitPolicy
 * @typedef {Object} LimitPolicySnapshot
 * @property {number} revision
 * @property {Record<LimitPolicyRunner, GlobalLimitPolicy>} runners
 * @typedef {'conflict'|'invalid_value'} LimitPolicyErrorCode
 * @typedef {{ ok: true, snapshot: LimitPolicySnapshot, changed: LimitPolicyRunner[] }
 *   | { ok: false, code: LimitPolicyErrorCode, runner?: string, message: string, snapshot: LimitPolicySnapshot }} LimitPolicySetResult
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { limitPolicySettingsFilePath } from './worker/state-paths.js';

/** @type {ReadonlyArray<LimitPolicyRunner>} */
export const LIMIT_POLICY_RUNNERS = Object.freeze(['claude', 'codex']);

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
 * Build the per-runner default: switching is on, but the allowed set is empty,
 * so nothing switches until the user picks accounts (UI-13o1 §3.1 decision 1).
 *
 * @returns {ProviderLimitPolicy}
 */
export function defaultProviderLimitPolicy() {
  return { mode: 'switch', accounts: [], preempt_pct: null };
}

/**
 * Normalize one runner's stored policy, dropping values outside the contract.
 *
 * @param {unknown} value
 * @returns {ProviderLimitPolicy}
 */
export function normalizeProviderLimitPolicyEntry(value) {
  if (!isRecord(value)) {
    return defaultProviderLimitPolicy();
  }
  /** @type {string[]} */
  const accounts = [];
  if (Array.isArray(value.accounts)) {
    for (const entry of value.accounts) {
      if (
        typeof entry === 'string' &&
        entry.length > 0 &&
        entry.length <= 256 &&
        !/\s/.test(entry) &&
        !accounts.includes(entry)
      ) {
        accounts.push(entry);
      }
    }
  }
  return {
    mode: value.mode === 'wait' ? 'wait' : 'switch',
    accounts,
    preempt_pct:
      typeof value.preempt_pct === 'number' &&
      Number.isInteger(value.preempt_pct) &&
      value.preempt_pct >= 1 &&
      value.preempt_pct <= 99
        ? value.preempt_pct
        : null
  };
}

/**
 * Strictly check one policy patch: every field present must be legal. The
 * stored set decides which paid account the Worker spends next, so a
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
    if (
      !Array.isArray(patch.accounts) ||
      patch.accounts.some(
        (/** @type {unknown} */ entry) =>
          typeof entry !== 'string' ||
          entry.length === 0 ||
          entry.length > 256 ||
          /\s/.test(entry)
      )
    ) {
      return 'accounts must be an array of account keys';
    }
  }
  if (
    'preempt_pct' in patch &&
    patch.preempt_pct !== null &&
    !(
      typeof patch.preempt_pct === 'number' &&
      Number.isInteger(patch.preempt_pct) &&
      patch.preempt_pct >= 1 &&
      patch.preempt_pct <= 99
    )
  ) {
    return 'preempt_pct must be null or an integer 1-99';
  }
  return null;
}

/**
 * The global entry a missing or broken file reads as: `repo` scope over the
 * repo default policy (UI-giog §4.1 initial value).
 *
 * @returns {GlobalLimitPolicy}
 */
function defaultGlobalEntry() {
  return { scope: 'repo', ...defaultProviderLimitPolicy() };
}

/**
 * @returns {Record<LimitPolicyRunner, GlobalLimitPolicy>}
 */
function defaultRunners() {
  return { claude: defaultGlobalEntry(), codex: defaultGlobalEntry() };
}

/**
 * @param {GlobalLimitPolicy} entry
 * @returns {GlobalLimitPolicy}
 */
function cloneEntry(entry) {
  return { ...entry, accounts: [...entry.accounts] };
}

/**
 * @param {Record<LimitPolicyRunner, GlobalLimitPolicy>} runners
 * @returns {Record<LimitPolicyRunner, GlobalLimitPolicy>}
 */
function cloneRunners(runners) {
  return {
    claude: cloneEntry(runners.claude),
    codex: cloneEntry(runners.codex)
  };
}

/**
 * @param {GlobalLimitPolicy} a
 * @param {GlobalLimitPolicy} b
 * @returns {boolean}
 */
function sameEntry(a, b) {
  return (
    a.scope === b.scope &&
    a.mode === b.mode &&
    a.preempt_pct === b.preempt_pct &&
    a.accounts.length === b.accounts.length &&
    a.accounts.every((key, index) => b.accounts[index] === key)
  );
}

/**
 * Why one persisted runner entry is not usable, or null when it is.
 *
 * @param {unknown} raw
 * @returns {string|null}
 */
function storedEntryError(raw) {
  if (!isRecord(raw)) {
    return '객체가 아닙니다';
  }
  if (raw.scope !== 'repo' && raw.scope !== 'global') {
    return "scope는 'repo' 또는 'global'이어야 합니다";
  }
  return providerLimitPolicyPatchError(raw);
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

  /** @type {{ revision: number, runners: Record<LimitPolicyRunner, GlobalLimitPolicy> } | null} */
  let cache = null;
  /** @type {Set<(snapshot: LimitPolicySnapshot, previous: LimitPolicySnapshot) => void>} */
  const listeners = new Set();

  /**
   * @returns {{ revision: number, runners: Record<LimitPolicyRunner, GlobalLimitPolicy> }}
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
          `limit-policy-settings: ${filePath()} 읽기 실패(${String(err)}): 저장소별로 읽습니다.`
        );
      }
    }
    if (text === null) {
      cache = { revision: 0, runners: defaultRunners() };
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
        `limit-policy-settings: ${filePath()} 무시: 형식이 잘못되어 저장소별로 읽습니다.`
      );
      cache = { revision: 0, runners: defaultRunners() };
      return cache;
    }
    const runners = defaultRunners();
    for (const runner of LIMIT_POLICY_RUNNERS) {
      const entry = raw.runners[runner];
      if (entry === undefined) {
        continue;
      }
      const reason = storedEntryError(entry);
      if (reason) {
        warn(
          `limit-policy-settings: ${runner} 무시(${reason}): 저장소별로 읽습니다.`
        );
        continue;
      }
      const record = /** @type {Record<string, unknown>} */ (entry);
      runners[runner] = {
        scope: /** @type {LimitPolicyScope} */ (record.scope),
        ...normalizeProviderLimitPolicyEntry(record)
      };
    }
    cache = { revision: raw.revision, runners };
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
   * @param {Record<LimitPolicyRunner, GlobalLimitPolicy>} runners
   * @param {number} revision
   */
  function persist(runners, revision) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify({ revision, runners }, null, 2));
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
     * One runner's current global entry (a copy).
     *
     * @param {LimitPolicyRunner} runner
     * @returns {GlobalLimitPolicy}
     */
    runner(runner) {
      return cloneEntry(ensureLoaded().runners[runner]);
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
        const reason =
          providerLimitPolicyPatchError(patch) ??
          ('scope' in /** @type {Record<string, unknown>} */ (patch) &&
          /** @type {any} */ (patch).scope !== 'repo' &&
          /** @type {any} */ (patch).scope !== 'global'
            ? "scope must be 'repo' or 'global'"
            : null);
        if (reason) {
          return {
            ok: false,
            code: 'invalid_value',
            runner,
            message: reason,
            snapshot: snapshot()
          };
        }
        const fields = /** @type {Record<string, any>} */ (patch);
        const current = next[runner];
        next[runner] = {
          scope: fields.scope ?? current.scope,
          ...normalizeProviderLimitPolicyEntry({
            mode: fields.mode ?? current.mode,
            accounts: fields.accounts ?? current.accounts,
            preempt_pct:
              'preempt_pct' in fields ? fields.preempt_pct : current.preempt_pct
          })
        };
      }
      const changed = LIMIT_POLICY_RUNNERS.filter(
        (runner) => !sameEntry(state.runners[runner], next[runner])
      );
      const previous = snapshot();
      const revision = state.revision + 1;
      persist(next, revision);
      cache = { revision, runners: next };
      const result = snapshot();
      emit(result, previous);
      return { ok: true, snapshot: result, changed };
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
     * @param {Partial<Record<LimitPolicyRunner, Partial<GlobalLimitPolicy>>>} runners
     */
    __setRunnersForTest(runners) {
      const state = ensureLoaded();
      const previous = snapshot();
      const next = cloneRunners(state.runners);
      for (const runner of LIMIT_POLICY_RUNNERS) {
        const patch = runners[runner];
        if (patch) {
          next[runner] = {
            scope: patch.scope ?? next[runner].scope,
            ...normalizeProviderLimitPolicyEntry({ ...next[runner], ...patch })
          };
        }
      }
      cache = { revision: state.revision + 1, runners: next };
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
 * One runner's global entry at this moment. Read at decision time; never
 * cache across judgments.
 *
 * @param {LimitPolicyRunner} runner
 * @returns {GlobalLimitPolicy}
 */
export function globalLimitPolicyOf(runner) {
  return limitPolicySettingsStore().runner(runner);
}

/**
 * The policy a decision for `runner` follows: the global policy while that
 * runner's scope is `global`, else the normalized stored repo policy. Every
 * consumer reads through here — none re-judges `scope` itself (UI-giog §4.1).
 *
 * @param {unknown} stored - The repo's `provider_limit_policy[runner]`.
 * @param {string} runner
 * @returns {ProviderLimitPolicy}
 */
export function effectiveLimitPolicy(stored, runner) {
  if (isRunner(runner)) {
    const global = globalLimitPolicyOf(runner);
    if (global.scope === 'global') {
      return {
        mode: global.mode,
        accounts: global.accounts,
        preempt_pct: global.preempt_pct
      };
    }
  }
  return normalizeProviderLimitPolicyEntry(stored);
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

/** @type {Set<() => void>} */
const APPLIED_LISTENERS = new Set();

/**
 * Subscribe to the END of a successful write's propagation: every repo's
 * hold verdicts were re-bound and its switch pass re-run. The server entry
 * hands the active-login passes one judgment here (UI-giog §4.1).
 *
 * @param {() => void} listener
 * @returns {() => void} Unsubscribe.
 */
export function onLimitPolicyApplied(listener) {
  APPLIED_LISTENERS.add(listener);
  return () => {
    APPLIED_LISTENERS.delete(listener);
  };
}

/**
 * Announce that a write finished propagating (the WS write handler calls
 * this last). One failing listener never stops the others.
 */
export function announceLimitPolicyApplied() {
  for (const listener of [...APPLIED_LISTENERS]) {
    try {
      listener();
    } catch (err) {
      console.warn(
        `limit-policy-settings: 적용 알림 처리 실패(${String(err)})`
      );
    }
  }
}

/**
 * Test-only: drop the shared store so the next read starts from the file.
 */
export function __resetLimitPolicySettingsForTest() {
  STORE = null;
  APPLIED_LISTENERS.clear();
}

/**
 * Test-only: pin runner entries of the shared store in memory and notify.
 *
 * @param {Partial<Record<LimitPolicyRunner, Partial<GlobalLimitPolicy>>>} runners
 */
export function __setLimitPolicySettingsForTest(runners) {
  limitPolicySettingsStore().__setRunnersForTest(runners);
}
