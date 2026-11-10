/**
 * Active-login departure records (UI-32oq §4.2).
 *
 * When the automatic switch moves a runner's global active login OFF its
 * default account, it records `{ default_account, to_account, until }` here:
 * the default it left, the account it moved to (a later automatic move from
 * that account updates it), and the latest reset time of the default's
 * windows that reached the trigger (null when one of them reported none).
 * The return to the default reads only this record, so it survives restarts:
 * every merge redeploys the server.
 *
 * The file is `$XDG_STATE_HOME/bdui/active-login-return.json`
 * (`{ runners: { claude?: record, codex?: record } }`). Reads are fail-quiet:
 * a missing or corrupt file, or a malformed entry, reads as no record — and
 * no record means no return. A write goes through tmp + rename; when it
 * fails the change still holds in memory for this process (one log line), so
 * a return already earned is not lost to a full disk.
 *
 * Every effective `set` and `clear` tells the `onChange` listeners, which is
 * how the limit-policy settings channel pushes a record to the clients
 * (UI-32oq §4.4 status lines). A throwing listener is ignored.
 *
 * @typedef {'claude'|'codex'} ReturnRunner
 * @typedef {import('../app/utils/active-login-return.js').DepartureRecord} DepartureRecord
 * @typedef {{ get: (runner: ReturnRunner) => DepartureRecord|null, set: (runner: ReturnRunner, record: DepartureRecord) => void, clear: (runner: ReturnRunner) => void, onChange: (listener: () => void) => () => void }} DepartureStore
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { parseDepartureRecord } from '../app/utils/active-login-return.js';
import { activeLoginReturnFilePath } from './worker/state-paths.js';

/** @type {ReadonlyArray<ReturnRunner>} */
const RUNNERS = Object.freeze(['claude', 'codex']);

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Create a departure record store. `filePath: null` keeps the records in
 * memory only — what a pass built without the file-backed store uses.
 *
 * @param {{
 *   filePath?: (() => string)|null,
 *   fs?: typeof import('node:fs'),
 *   warn?: (message: string) => void
 * }} [options]
 * @returns {DepartureStore}
 */
export function createDepartureStore(options = {}) {
  const filePath =
    options.filePath === undefined
      ? activeLoginReturnFilePath
      : options.filePath;
  const fs = options.fs ?? nodeFs;
  const warn = options.warn ?? console.warn;

  /** @type {Partial<Record<ReturnRunner, DepartureRecord>> | null} */
  let cache = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();

  function emit() {
    for (const listener of Array.from(listeners)) {
      try {
        listener();
      } catch {
        // One failing listener must not stop the others or the pass.
      }
    }
  }

  /**
   * @returns {Partial<Record<ReturnRunner, DepartureRecord>>}
   */
  function ensureLoaded() {
    if (cache) {
      return cache;
    }
    cache = {};
    if (filePath === null) {
      return cache;
    }
    /** @type {unknown} */
    let raw = null;
    try {
      raw = JSON.parse(fs.readFileSync(filePath(), 'utf8'));
    } catch (err) {
      if (/** @type {any} */ (err)?.code !== 'ENOENT') {
        warn(
          `active-login-return: ${filePath()} 읽기 실패(${String(err)}): 떠남 기록 없음으로 읽습니다.`
        );
      }
      return cache;
    }
    if (!isRecord(raw) || !isRecord(raw.runners)) {
      warn(
        `active-login-return: ${filePath()} 무시: 형식이 잘못되어 떠남 기록 없음으로 읽습니다.`
      );
      return cache;
    }
    for (const runner of RUNNERS) {
      const entry = raw.runners[runner];
      if (entry === undefined) {
        continue;
      }
      const record = parseDepartureRecord(entry);
      if (record === null) {
        warn(
          `active-login-return: ${runner} 무시: 형식이 잘못되어 떠남 기록 없음으로 읽습니다.`
        );
        continue;
      }
      cache[runner] = record;
    }
    return cache;
  }

  /**
   * @param {Partial<Record<ReturnRunner, DepartureRecord>>} runners
   */
  function persist(runners) {
    if (filePath === null) {
      return;
    }
    try {
      const file = filePath();
      fs.mkdirSync(path.dirname(file), { recursive: true });
      const tmp = `${file}.tmp`;
      fs.writeFileSync(tmp, JSON.stringify({ runners }, null, 2));
      fs.renameSync(tmp, file);
    } catch (err) {
      warn(
        `active-login-return: 떠남 기록 쓰기 실패(${String(err)}): 이 프로세스 안에서만 유지합니다.`
      );
    }
  }

  return {
    get(runner) {
      const record = ensureLoaded()[runner];
      return record ? { ...record } : null;
    },
    set(runner, record) {
      const next = { ...ensureLoaded(), [runner]: { ...record } };
      cache = next;
      persist(next);
      emit();
    },
    clear(runner) {
      const current = ensureLoaded();
      if (!current[runner]) {
        return;
      }
      const next = { ...current };
      delete next[runner];
      cache = next;
      persist(next);
      emit();
    },
    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };
}

/** @type {DepartureStore | null} */
let STORE = null;

/**
 * The process-wide file-backed store the server entry hands both passes.
 *
 * @returns {DepartureStore}
 */
export function activeLoginReturnStore() {
  if (!STORE) {
    STORE = createDepartureStore();
  }
  return STORE;
}

/**
 * Test-only: drop the process-wide store (and its listeners), so the next
 * `activeLoginReturnStore()` reads the file again.
 */
export function __resetActiveLoginReturnStoreForTest() {
  STORE = null;
}
