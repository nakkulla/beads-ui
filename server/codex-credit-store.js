/**
 * Server-global Codex credit settings and consumption ledger (UI-9y1k §4.3).
 *
 * A Codex account keeps spending paid credits once its usage windows are full,
 * with no setting to stop it; the only lever is whether the automatic switch
 * offers that account at all. This file owns that lever and what it reads:
 *
 * - Settings per account key: `{ allow_credits, daily_cap }`. An account
 *   without an entry reads as `{ false, 1000 }` — credits off.
 * - Ledger per account key: the KST date, the last observed balance and its
 *   observation time, and today's consumption. Consumption is the SUM OF
 *   DECREASES seen today: a purchase only moves the baseline and never cancels
 *   counted consumption, and a new KST date starts from 0.
 * - Only a fresh successful observation counts: `usage.source === 'api'` and an
 *   `updated_at` later than the ledger's last one. A cached or local value, or
 *   a same/older timestamp, is dropped so an old cache cannot pass for a
 *   purchase and one decrease is never counted twice.
 * - Notices: the first positive consumption of an account-day goes to the
 *   `ops` channel, and the first time consumption reaches the cap goes to
 *   `alert` — each at most once per account per day.
 *
 * The cap only stops the NEXT candidate selection (§4.7): a run already on the
 * account keeps spending, so the real total can pass the cap, and the notice
 * states the real total.
 *
 * Reads are fail-quiet: a missing or corrupt file reads as defaults (credits
 * off), so a damaged file never spends money. Settings writes are strict and
 * CAS-guarded by `revision`; ledger writes never move `revision` (the poller
 * would otherwise keep every settings form in conflict) and a failed ledger
 * write stays in memory with one log line.
 *
 * @typedef {{ allow_credits: boolean, daily_cap: number }} CreditSetting
 * @typedef {{ date: string, balance: number, observed_at: number, consumed: number, first_use_notified: boolean, cap_notified: boolean }} LedgerEntry
 * @typedef {{ revision: number, settings: Record<string, CreditSetting>, ledger: Record<string, LedgerEntry> }} CreditState
 * @typedef {{ allow_credits: boolean, daily_cap: number, consumed_today: number }} CreditAccountView
 * @typedef {{ revision: number, date: string, default_daily_cap: number, accounts: Record<string, CreditAccountView> }} CreditSnapshot
 * @typedef {'conflict'|'invalid_value'} CreditSetErrorCode
 * @typedef {{ ok: true, snapshot: CreditSnapshot }
 *   | { ok: false, code: CreditSetErrorCode, key?: string, message: string, snapshot: CreditSnapshot }} CreditSetResult
 * @typedef {{ channel: 'ops'|'alert', message: string }} CreditNotice
 * @typedef {import('./routes/codex-usage.js').CreditObservation} CreditObservation
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { getConfig } from './config.js';
import { createNotifier } from './worker/notify.js';
import { codexCreditFilePath } from './worker/state-paths.js';

/** The daily cap an account without its own setting reads (credits per day). */
export const DEFAULT_DAILY_CAP = 1000;

/** The largest daily cap a setting may store. */
const MAX_DAILY_CAP = 1_000_000_000;

/** KST is UTC+9 with no daylight saving. */
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;

/** How often the server re-reads Codex usage while any account allows credits. */
export const CREDIT_POLL_INTERVAL_MS = 10 * 60 * 1000;

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Whether a string can be an account key: what the queue's allow list accepts.
 *
 * @param {unknown} key
 * @returns {key is string}
 */
function isAccountKey(key) {
  return (
    typeof key === 'string' &&
    key.length > 0 &&
    key.length <= 256 &&
    !/\s/.test(key)
  );
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isCap(value) {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= MAX_DAILY_CAP
  );
}

/**
 * The KST calendar date (`YYYY-MM-DD`) of an epoch-millisecond instant.
 *
 * @param {number} ms
 * @returns {string}
 */
export function kstDate(ms) {
  return new Date(ms + KST_OFFSET_MS).toISOString().slice(0, 10);
}

/**
 * A credit amount as a person reads it: at most two decimals.
 *
 * @param {number} value
 * @returns {string}
 */
function amountText(value) {
  return String(Math.round(value * 100) / 100);
}

/**
 * @returns {CreditState}
 */
function defaultState() {
  return { revision: 0, settings: {}, ledger: {} };
}

/**
 * @param {unknown} raw
 * @returns {CreditSetting|null}
 */
function parseSetting(raw) {
  if (
    !isRecord(raw) ||
    typeof raw.allow_credits !== 'boolean' ||
    !isCap(raw.daily_cap)
  ) {
    return null;
  }
  return { allow_credits: raw.allow_credits, daily_cap: raw.daily_cap };
}

/**
 * @param {unknown} raw
 * @returns {LedgerEntry|null}
 */
function parseLedgerEntry(raw) {
  if (
    !isRecord(raw) ||
    typeof raw.date !== 'string' ||
    !/^\d{4}-\d{2}-\d{2}$/.test(raw.date) ||
    typeof raw.balance !== 'number' ||
    !Number.isFinite(raw.balance) ||
    typeof raw.observed_at !== 'number' ||
    !Number.isFinite(raw.observed_at) ||
    typeof raw.consumed !== 'number' ||
    !Number.isFinite(raw.consumed) ||
    raw.consumed < 0
  ) {
    return null;
  }
  return {
    date: raw.date,
    balance: raw.balance,
    observed_at: raw.observed_at,
    consumed: raw.consumed,
    first_use_notified: raw.first_use_notified === true,
    cap_notified: raw.cap_notified === true
  };
}

/**
 * Parse the persisted shape, or null when the root is not one. A bad entry
 * inside a good root drops alone.
 *
 * @param {unknown} raw
 * @returns {CreditState|null}
 */
function parseState(raw) {
  if (
    !isRecord(raw) ||
    typeof raw.revision !== 'number' ||
    !Number.isInteger(raw.revision) ||
    raw.revision < 0 ||
    !isRecord(raw.settings) ||
    !isRecord(raw.ledger)
  ) {
    return null;
  }
  /** @type {CreditState} */
  const state = { revision: raw.revision, settings: {}, ledger: {} };
  for (const [key, value] of Object.entries(raw.settings)) {
    const setting = isAccountKey(key) ? parseSetting(value) : null;
    if (setting) {
      state.settings[key] = setting;
    }
  }
  for (const [key, value] of Object.entries(raw.ledger)) {
    const entry = isAccountKey(key) ? parseLedgerEntry(value) : null;
    if (entry) {
      state.ledger[key] = entry;
    }
  }
  return state;
}

/**
 * Create the server-wide credit store. One instance is shared by the WS
 * channel, the scheduler and the usage observer so the revision CAS and the
 * once-per-day notices are authoritative in-process.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: typeof import('node:fs'),
 *   warn?: (message: string) => void,
 *   now?: () => number,
 *   notify?: (notice: CreditNotice) => void
 * }} [options]
 */
export function createCodexCreditStore(options = {}) {
  const filePath = options.filePath ?? codexCreditFilePath;
  const fs = options.fs ?? nodeFs;
  const warn = options.warn ?? console.warn;
  const now = options.now ?? (() => Date.now());
  const notify = options.notify ?? (() => {});

  /** @type {CreditState|null} */
  let cache = null;
  /** @type {Set<(snapshot: CreditSnapshot) => void>} */
  const listeners = new Set();

  /**
   * @returns {CreditState}
   */
  function ensureLoaded() {
    if (cache) {
      return cache;
    }
    /** @type {string|null} */
    let text = null;
    try {
      text = fs.readFileSync(filePath(), 'utf8');
    } catch (err) {
      if (/** @type {any} */ (err)?.code !== 'ENOENT') {
        warn(
          `codex-credits: ${filePath()} 읽기 실패(${String(err)}): 기본값(크레딧 꺼짐)으로 읽습니다.`
        );
      }
    }
    if (text === null) {
      cache = defaultState();
      return cache;
    }
    /** @type {CreditState|null} */
    let parsed = null;
    try {
      parsed = parseState(JSON.parse(text));
    } catch {
      parsed = null;
    }
    if (!parsed) {
      warn(
        `codex-credits: ${filePath()} 무시: 형식이 잘못되어 기본값(크레딧 꺼짐)으로 읽습니다.`
      );
      parsed = defaultState();
    }
    cache = parsed;
    return cache;
  }

  /**
   * @param {CreditState} state
   */
  function persist(state) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(state, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * @param {string} key
   * @returns {CreditSetting}
   */
  function settingsOf(key) {
    const setting = ensureLoaded().settings[key];
    return setting
      ? { ...setting }
      : { allow_credits: false, daily_cap: DEFAULT_DAILY_CAP };
  }

  /**
   * @param {string} key
   * @returns {number}
   */
  function consumedToday(key) {
    const entry = ensureLoaded().ledger[key];
    return entry && entry.date === kstDate(now()) ? entry.consumed : 0;
  }

  /**
   * @returns {CreditSnapshot}
   */
  function snapshot() {
    const state = ensureLoaded();
    const today = kstDate(now());
    /** @type {Record<string, CreditAccountView>} */
    const accounts = {};
    const keys = new Set([
      ...Object.keys(state.settings),
      ...Object.keys(state.ledger)
    ]);
    for (const key of [...keys].sort()) {
      const setting = settingsOf(key);
      const entry = state.ledger[key];
      accounts[key] = {
        allow_credits: setting.allow_credits,
        daily_cap: setting.daily_cap,
        consumed_today: entry && entry.date === today ? entry.consumed : 0
      };
    }
    return {
      revision: state.revision,
      date: today,
      default_daily_cap: DEFAULT_DAILY_CAP,
      accounts
    };
  }

  function emit() {
    const current = snapshot();
    for (const listener of Array.from(listeners)) {
      try {
        listener(current);
      } catch {
        // One listener must not stop the others.
      }
    }
  }

  /**
   * @param {CreditNotice} notice
   */
  function sendNotice(notice) {
    try {
      notify(notice);
    } catch (err) {
      warn(`codex-credits: 알림 실패(${String(err)})`);
    }
  }

  /**
   * Fold one fresh observation into its ledger entry and decide the notices.
   *
   * @param {CreditState} state
   * @param {CreditObservation} observation
   * @param {string} today
   * @returns {CreditNotice[]|null} The notices to send, or null when the
   * observation was not admitted.
   */
  function admit(state, observation, today) {
    const balance = observation.credits.balance;
    if (
      observation.source !== 'api' ||
      typeof observation.updated_at !== 'number' ||
      typeof balance !== 'number'
    ) {
      return null;
    }
    const previous = state.ledger[observation.key];
    if (!previous) {
      state.ledger[observation.key] = {
        date: today,
        balance,
        observed_at: observation.updated_at,
        consumed: 0,
        first_use_notified: false,
        cap_notified: false
      };
      return [];
    }
    if (observation.updated_at <= previous.observed_at) {
      return null;
    }
    /** @type {LedgerEntry} */
    const entry =
      previous.date === today
        ? { ...previous }
        : {
            date: today,
            balance: previous.balance,
            observed_at: previous.observed_at,
            consumed: 0,
            first_use_notified: false,
            cap_notified: false
          };
    // A new day starts from the observed balance: consumption between the last
    // read of yesterday and the first of today is not attributed to either.
    const spent = previous.date === today ? entry.balance - balance : 0;
    if (spent > 0) {
      entry.consumed += spent;
    }
    entry.balance = balance;
    entry.observed_at = observation.updated_at;
    state.ledger[observation.key] = entry;
    /** @type {CreditNotice[]} */
    const notices = [];
    const label = `계정 #${observation.number}`;
    const setting = settingsOf(observation.key);
    const unlimited = observation.credits.unlimited === true;
    const cap_text = unlimited
      ? '상한 없음(무제한)'
      : `하루 상한 ${amountText(setting.daily_cap)}`;
    if (entry.consumed > 0 && !entry.first_use_notified) {
      entry.first_use_notified = true;
      notices.push({
        channel: 'ops',
        message: [
          `💳 Codex 크레딧 사용 시작 — ${label}`,
          `오늘 누적 ${amountText(entry.consumed)} 크레딧 · ${cap_text}`
        ].join('\n')
      });
    }
    if (
      !unlimited &&
      entry.consumed > 0 &&
      entry.consumed >= setting.daily_cap &&
      !entry.cap_notified
    ) {
      entry.cap_notified = true;
      notices.push({
        channel: 'alert',
        message: [
          `🚨 Codex 크레딧 하루 상한 도달 — ${label}`,
          `오늘 누적 ${amountText(entry.consumed)} 크레딧 (${cap_text})`,
          '다음 자동 전환 후보에서 빠집니다 · 이미 이 계정으로 실행 중인 작업은 계속 소모할 수 있습니다'
        ].join('\n')
      });
    }
    return notices;
  }

  return {
    snapshot,
    settingsOf,
    consumedToday,

    /**
     * Whether any account allows credits — the poller runs only then.
     *
     * @returns {boolean}
     */
    anyAllowed() {
      return Object.values(ensureLoaded().settings).some(
        (setting) => setting.allow_credits
      );
    },

    /**
     * Fold a batch of usage observations into the ledger. Inadmissible
     * observations change nothing.
     *
     * @param {CreditObservation[]} observations
     * @returns {boolean} Whether the ledger changed.
     */
    observe(observations) {
      const state = ensureLoaded();
      const today = kstDate(now());
      /** @type {CreditNotice[]} */
      const notices = [];
      let changed = false;
      for (const observation of Array.isArray(observations)
        ? observations
        : []) {
        if (!isRecord(observation) || !isAccountKey(observation.key)) {
          continue;
        }
        const admitted = admit(state, observation, today);
        if (admitted) {
          changed = true;
          notices.push(...admitted);
        }
      }
      if (!changed) {
        return false;
      }
      try {
        persist(state);
      } catch (err) {
        warn(
          `codex-credits: ${filePath()} 쓰기 실패(${String(err)}): 메모리에만 반영합니다.`
        );
      }
      for (const notice of notices) {
        sendNotice(notice);
      }
      emit();
      return true;
    },

    /**
     * Patch account settings. CAS-guarded and all-or-nothing: an invalid key
     * or value writes nothing. A persist failure throws and leaves memory
     * unchanged.
     *
     * @param {{ expected_revision: unknown, accounts: unknown }} input
     * @returns {CreditSetResult}
     */
    set(input) {
      const state = ensureLoaded();
      if (input.expected_revision !== state.revision) {
        return {
          ok: false,
          code: 'conflict',
          message: 'codex-credits-set: conflict',
          snapshot: snapshot()
        };
      }
      if (!isRecord(input.accounts)) {
        return {
          ok: false,
          code: 'invalid_value',
          message: 'accounts는 계정별 설정 객체여야 합니다',
          snapshot: snapshot()
        };
      }
      /** @type {Record<string, CreditSetting>} */
      const next = { ...state.settings };
      for (const [key, patch] of Object.entries(input.accounts)) {
        /** @type {string|null} */
        let reason = null;
        if (!isAccountKey(key)) {
          reason = '계정 키가 올바르지 않습니다';
        } else if (!isRecord(patch)) {
          reason = '계정 설정은 객체여야 합니다';
        } else if (
          Object.hasOwn(patch, 'allow_credits') &&
          typeof patch.allow_credits !== 'boolean'
        ) {
          reason = 'allow_credits는 true/false여야 합니다';
        } else if (
          Object.hasOwn(patch, 'daily_cap') &&
          !isCap(patch.daily_cap)
        ) {
          reason = `daily_cap은 0 이상 ${MAX_DAILY_CAP} 이하의 수여야 합니다`;
        }
        if (reason) {
          return {
            ok: false,
            code: 'invalid_value',
            key,
            message: reason,
            snapshot: snapshot()
          };
        }
        const current = settingsOf(key);
        const record = /** @type {Record<string, any>} */ (patch);
        next[key] = {
          allow_credits: Object.hasOwn(record, 'allow_credits')
            ? record.allow_credits
            : current.allow_credits,
          daily_cap: Object.hasOwn(record, 'daily_cap')
            ? record.daily_cap
            : current.daily_cap
        };
      }
      /** @type {CreditState} */
      const updated = {
        revision: state.revision + 1,
        settings: next,
        ledger: state.ledger
      };
      persist(updated);
      cache = updated;
      emit();
      return { ok: true, snapshot: snapshot() };
    },

    /**
     * Hear every settings or ledger change.
     *
     * @param {(snapshot: CreditSnapshot) => void} listener
     * @returns {() => void}
     */
    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },

    /**
     * Drop the in-memory cache (test hook).
     */
    __clearCacheForTest() {
      cache = null;
    }
  };
}

/**
 * Re-read Codex usage every ten minutes while any account allows credits
 * (§4.3): otherwise a session spending credits with no screen open would
 * leave the ledger — and the cap notice — standing still. Nothing polls while
 * every account's credits are off. `sync()` re-evaluates after a change; the
 * first read happens as soon as polling starts, so the ledger has a baseline.
 *
 * @param {{
 *   store: { anyAllowed: () => boolean },
 *   readFresh: () => Promise<unknown>,
 *   interval_ms?: number,
 *   setInterval?: (fn: () => void, ms: number) => any,
 *   clearInterval?: (handle: any) => void,
 *   log?: (message: string, ...args: any[]) => void
 * }} deps
 */
export function createCodexCreditPoller(deps) {
  const interval_ms = deps.interval_ms ?? CREDIT_POLL_INTERVAL_MS;
  const arm = deps.setInterval ?? ((fn, ms) => setInterval(fn, ms));
  const disarm = deps.clearInterval ?? ((handle) => clearInterval(handle));
  const log = deps.log ?? (() => {});
  /** @type {any} */
  let timer = null;
  let reading = false;

  function tick() {
    if (reading) {
      return;
    }
    reading = true;
    Promise.resolve()
      .then(() => deps.readFresh())
      .catch((err) => {
        log('codex credit poll failed: %o', err);
      })
      .finally(() => {
        reading = false;
      });
  }

  return {
    /** Start or stop polling to match the current settings. */
    sync() {
      const wanted = deps.store.anyAllowed();
      if (wanted && timer === null) {
        timer = arm(tick, interval_ms);
        timer?.unref?.();
        tick();
      } else if (!wanted && timer !== null) {
        disarm(timer);
        timer = null;
      }
    },
    /** Stop polling for good. */
    stop() {
      if (timer !== null) {
        disarm(timer);
        timer = null;
      }
    },
    /** @returns {boolean} */
    running() {
      return timer !== null;
    }
  };
}

/** @type {ReturnType<typeof createCodexCreditStore>|null} */
let STORE = null;

/**
 * The process-wide store. Its notices go through the Worker notifier, so the
 * `[worker.notify]` switch and command apply to them as to every other push.
 *
 * @returns {ReturnType<typeof createCodexCreditStore>}
 */
export function codexCreditStore() {
  if (!STORE) {
    const notifier = createNotifier({ getConfig });
    STORE = createCodexCreditStore({
      notify: (notice) => {
        notifier.codexCreditNotice(notice);
      }
    });
  }
  return STORE;
}

/**
 * Test-only: drop the shared store so the next read starts from the file.
 */
export function __resetCodexCreditStoreForTest() {
  STORE = null;
}
