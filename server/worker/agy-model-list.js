/**
 * agy model ids and the pre-run quota read (agy-runtime §3.2-§3.3).
 *
 * The server runs `agy models` at start and hourly. Each output line is
 * `<id>\t<display name>`; the ids are the session model names as they are, and
 * the effort is part of the id (`gemini-4-neon-high`). The last successful list
 * is persisted, so a failed read keeps it. With no list ever read the agy
 * runner has no model and no agy run is launched.
 *
 * Neither `agy models` nor `/usage` names the account, so a list is bound to a
 * CREDENTIAL FINGERPRINT instead: the mtime and size of the two credential
 * files, read with `stat` only — their contents are never opened. When the
 * fingerprint moves, the list, the quota cache, and every read still in flight
 * (including a late answer started under the old fingerprint) are dropped,
 * and agy runs stay refused until a new list arrives. A token refresh moves the
 * fingerprint too; that costs one extra read and is accepted. Phase 3 calls
 * {@link AgyModelList.invalidate} directly after a login or switch succeeds.
 *
 * The quota read is `agy -p "/usage" --output-format json` (10s bound, 180s
 * cache). Any `Gemini Models` bucket at `remaining_fraction <= 0` is exhausted
 * until its `reset_time`; a failed read is `unknown` and never blocks a run.
 *
 * Nothing here runs at import time: a caller that never calls
 * `loadPersisted`/`start` sees an empty, not-ready list.
 */
import { execFile as nodeExecFile } from 'node:child_process';
import nodeFs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { agyLauncherPath } from './runner/agy.js';
import { stateHome } from './state-paths.js';

/** Bounds a hung `agy models`. */
export const AGY_MODEL_LIST_TIMEOUT_MS = 60_000;

/** Refresh cadence after the start-up read. */
export const AGY_MODEL_LIST_REFRESH_MS = 60 * 60 * 1000;

/** Bounds the pre-run `/usage` read. */
export const AGY_QUOTA_TIMEOUT_MS = 10_000;

/** How long one `/usage` answer is reused. */
export const AGY_QUOTA_CACHE_MS = 180_000;

/** The `/usage` group whose buckets gate an agy run. */
const QUOTA_GROUP = 'Gemini Models';

/**
 * The account an agy quota hold names. No agy output carries an account
 * name until `agy-auth` lands (Phase 3), so every agy hold is on the one
 * logged-in pool the credential fingerprint follows.
 */
export const AGY_HOLD_ACCOUNT = 'agy:active';

/**
 * Session models shown by default; the rest are enabled in model visibility.
 *
 * @type {ReadonlyArray<string>}
 */
export const AGY_DEFAULT_VISIBLE_MODELS = Object.freeze([
  'gemini-4-neon-high',
  'gemini-4-neon-xhigh',
  'gemini-4-carbon-high',
  'gemini-4-carbon-medium',
  'gemini-4-hydrogen-medium'
]);

/** The default agy session model. */
export const AGY_DEFAULT_MODEL = 'gemini-4-neon-high';

/**
 * Workflow model families (`impl_model` values).
 *
 * @type {ReadonlyArray<string>}
 */
export const AGY_FAMILIES = Object.freeze([
  'neon',
  'carbon',
  'argon',
  'hydrogen'
]);

/**
 * Effort suffixes an agy id may carry.
 *
 * @type {ReadonlyArray<string>}
 */
export const AGY_EFFORTS = Object.freeze(['low', 'medium', 'high', 'xhigh']);

const AGY_ID_RE = /^[a-z0-9][a-z0-9.-]*$/;
const WORKFLOW_ID_RE = /^gemini-4-([a-z]+)-([a-z]+)$/;

/**
 * The agy id for a workflow (family, effort) pair, or null when either is
 * outside the vocabulary.
 *
 * @param {unknown} family
 * @param {unknown} effort
 * @returns {string|null}
 */
export function agyModelId(family, effort) {
  if (
    typeof family !== 'string' ||
    typeof effort !== 'string' ||
    !AGY_FAMILIES.includes(family) ||
    !AGY_EFFORTS.includes(effort)
  ) {
    return null;
  }
  return `gemini-4-${family}-${effort}`;
}

/**
 * The workflow (family, effort) pair an agy id splits into, or null when the
 * id is not a `gemini-4-<family>-<effort>` id of the four families.
 *
 * @param {unknown} model_id
 * @returns {{ family: string, effort: string }|null}
 */
export function agyFamilyEffort(model_id) {
  if (typeof model_id !== 'string') {
    return null;
  }
  const match = WORKFLOW_ID_RE.exec(model_id);
  if (
    !match ||
    !AGY_FAMILIES.includes(match[1]) ||
    !AGY_EFFORTS.includes(match[2])
  ) {
    return null;
  }
  return { family: match[1], effort: match[2] };
}

/**
 * Parse `agy models` output into ids, in output order. Lines that are not
 * `<id>\t<name>` with a well-formed id are skipped.
 *
 * @param {string} stdout
 * @returns {Array<{ id: string, name: string }>}
 */
export function parseAgyModels(stdout) {
  /** @type {Array<{ id: string, name: string }>} */
  const models = [];
  /** @type {Set<string>} */
  const seen = new Set();
  for (const line of String(stdout).split('\n')) {
    const [raw_id, ...rest] = line.split('\t');
    const id = raw_id.trim();
    if (!AGY_ID_RE.test(id) || seen.has(id)) {
      continue;
    }
    seen.add(id);
    models.push({ id, name: rest.join('\t').trim() });
  }
  return models;
}

/**
 * @typedef {{ state: 'ok' }
 *   | { state: 'exhausted', resets_at: number|null, buckets: string[] }
 *   | { state: 'unknown', reason: string }} AgyQuota
 */

/**
 * Judge one `/usage` answer: exhausted when any `Gemini Models` bucket has no
 * remaining fraction, holding until the latest reset of those buckets.
 *
 * @param {unknown} payload
 * @returns {AgyQuota}
 */
export function judgeAgyQuota(payload) {
  const groups = /** @type {any} */ (payload)?.command?.data?.groups;
  if (!Array.isArray(groups)) {
    return { state: 'unknown', reason: 'usage_unreadable' };
  }
  const group = groups.find((entry) => entry?.name === QUOTA_GROUP);
  if (!group || !Array.isArray(group.buckets)) {
    return { state: 'unknown', reason: 'usage_group_missing' };
  }
  /** @type {string[]} */
  const exhausted = [];
  /** @type {number|null} */
  let resets_at = null;
  for (const bucket of group.buckets) {
    const reset = Date.parse(String(bucket?.reset_time ?? ''));
    // `/usage` drops a zero `remaining_fraction` (omitempty; dotfiles
    // `agy-statusline.py` reads the omitted field as 0), so a bucket with no
    // fraction but a scheduled reset is exhausted. An epoch reset is the
    // never-used bucket and stays unread.
    const fraction =
      typeof bucket === 'object' &&
      bucket !== null &&
      !('remaining_fraction' in bucket) &&
      reset > 0
        ? 0
        : bucket?.remaining_fraction;
    if (typeof fraction !== 'number' || !Number.isFinite(fraction)) {
      continue;
    }
    if (fraction > 0) {
      continue;
    }
    exhausted.push(String(bucket.id ?? bucket.name ?? 'bucket'));
    if (Number.isFinite(reset) && (resets_at === null || reset > resets_at)) {
      resets_at = reset;
    }
  }
  if (exhausted.length === 0) {
    return { state: 'ok' };
  }
  return { state: 'exhausted', resets_at, buckets: exhausted };
}

/**
 * @returns {string} `$XDG_STATE_HOME/bdui/agy-models.json`.
 */
export function agyModelListFilePath() {
  return path.join(stateHome(), 'bdui', 'agy-models.json');
}

/**
 * The two credential files whose stat makes the fingerprint.
 *
 * @param {string} [home]
 * @returns {string[]}
 */
export function agyCredentialPaths(home = os.homedir()) {
  return [
    path.join(home, '.gemini', 'antigravity-cli', 'antigravity-oauth-token'),
    path.join(
      home,
      'Library',
      'Application Support',
      'antigravity',
      'credential-user-scope'
    )
  ];
}

/**
 * @typedef {(file: string, args: string[], options: { timeout: number, env: NodeJS.ProcessEnv, maxBuffer: number }) => Promise<{ stdout: string }>} AgyExecFile
 * @typedef {{ read_at: number, fingerprint: string, models: Array<{ id: string, name: string }> }} AgyListRecord
 * @typedef {{ source: 'list'|'none', read_at: number|null }} AgyListStatus
 */

/** @type {AgyExecFile} */
function defaultExecFile(file, args, options) {
  return new Promise((resolve, reject) => {
    nodeExecFile(file, args, options, (err, stdout) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ stdout: String(stdout) });
    });
  });
}

/**
 * @param {unknown} raw
 * @returns {AgyListRecord|null}
 */
function parseRecord(raw) {
  const value = /** @type {any} */ (raw);
  if (
    typeof value !== 'object' ||
    value === null ||
    typeof value.read_at !== 'number' ||
    !Number.isFinite(value.read_at) ||
    typeof value.fingerprint !== 'string' ||
    !Array.isArray(value.models)
  ) {
    return null;
  }
  /** @type {Array<{ id: string, name: string }>} */
  const models = [];
  for (const model of value.models) {
    if (typeof model?.id === 'string' && AGY_ID_RE.test(model.id)) {
      models.push({
        id: model.id,
        name: typeof model.name === 'string' ? model.name : ''
      });
    }
  }
  if (models.length === 0) {
    return null;
  }
  return { read_at: value.read_at, fingerprint: value.fingerprint, models };
}

/**
 * Create one agy model list reader. Every dependency is injectable; the
 * defaults are the real launcher, the real state file and credential paths.
 *
 * @param {{
 *   filePath?: () => string,
 *   credentialPaths?: () => string[],
 *   fs?: typeof import('node:fs'),
 *   execFile?: AgyExecFile,
 *   command?: () => string,
 *   env?: () => NodeJS.ProcessEnv,
 *   now?: () => number,
 *   warn?: (message: string) => void,
 *   setInterval?: (fn: () => void, ms: number) => { unref?: () => void },
 *   clearInterval?: (handle: any) => void
 * }} [options]
 */
export function createAgyModelList(options = {}) {
  const filePath = options.filePath ?? agyModelListFilePath;
  const credentialPaths =
    options.credentialPaths ?? (() => agyCredentialPaths());
  const fs = options.fs ?? nodeFs;
  const execFile = options.execFile ?? defaultExecFile;
  const command = options.command ?? (() => agyLauncherPath());
  const env = options.env ?? (() => ({ ...process.env, AGY_SILENT: '1' }));
  const now = options.now ?? Date.now;
  const warn = options.warn ?? console.warn;
  const arm = options.setInterval ?? setInterval;
  const disarm = options.clearInterval ?? clearInterval;

  /** @type {AgyListRecord|null} */
  let record = null;
  let revision = 0;
  // Bumped by every invalidation: a read started under an older generation
  // never lands, so a pre-switch answer cannot outlive the switch.
  let generation = 0;
  /** The fingerprint the current state was observed under. */
  let observed = /** @type {string|null} */ (null);
  /** @type {any} */
  let timer = null;
  /** @type {Promise<boolean>|null} */
  let in_flight = null;
  /** @type {{ value: AgyQuota, expires_at: number }|null} */
  let quota_cache = null;
  /** @type {Promise<AgyQuota>|null} */
  let quota_in_flight = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();

  /**
   * The credential fingerprint: mtime and size per file, never the contents.
   *
   * @returns {string}
   */
  function fingerprint() {
    return credentialPaths()
      .map((file) => {
        try {
          const stat = fs.statSync(file);
          return `${stat.mtimeMs}:${stat.size}`;
        } catch {
          return 'missing';
        }
      })
      .join('|');
  }

  function emit() {
    for (const listener of listeners) {
      try {
        listener();
      } catch (err) {
        warn(`agy-model-list: change listener failed: ${String(err)}`);
      }
    }
  }

  /**
   * Drop the list, the quota cache and every read in flight.
   *
   * @param {string|null} next_observed
   */
  function drop(next_observed) {
    generation++;
    observed = next_observed;
    quota_cache = null;
    quota_in_flight = null;
    // A list read in flight is left to finish: its generation no longer
    // matches, so it lands nothing and `refreshOnce` reads once more.
    const had_list = record !== null;
    record = null;
    try {
      fs.rmSync(filePath(), { force: true });
    } catch (err) {
      warn(`agy-model-list: ${filePath()} 삭제 실패(${String(err)})`);
    }
    if (had_list) {
      revision++;
      emit();
    }
  }

  /**
   * Whether the credentials moved since the state was observed; a move drops
   * everything.
   *
   * @returns {boolean}
   */
  function credentialsMoved() {
    const current = fingerprint();
    if (observed === null) {
      observed = current;
      return false;
    }
    if (current === observed) {
      return false;
    }
    drop(current);
    return true;
  }

  /**
   * @param {AgyListRecord} next_record
   */
  function persist(next_record) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(next_record, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * One `agy models` read. Resolves to whether a list landed.
   *
   * @returns {Promise<boolean>}
   */
  async function readOnce() {
    const started_generation = generation;
    const started_fingerprint = fingerprint();
    /** @type {Array<{ id: string, name: string }>|null} */
    let models = null;
    try {
      const { stdout } = await execFile(command(), ['models'], {
        timeout: AGY_MODEL_LIST_TIMEOUT_MS,
        env: env(),
        maxBuffer: 4 * 1024 * 1024
      });
      models = parseAgyModels(stdout);
      if (models.length === 0) {
        warn('agy-model-list: agy models 출력에 모델이 없습니다.');
        models = null;
      }
    } catch (err) {
      warn(
        `agy-model-list: agy models 실패(${String(err)}) — 마지막 목록을 계속 씁니다.`
      );
    }
    if (generation !== started_generation) {
      return false;
    }
    const finished_fingerprint = fingerprint();
    if (finished_fingerprint !== started_fingerprint) {
      drop(finished_fingerprint);
      return false;
    }
    if (observed !== null && observed !== finished_fingerprint) {
      drop(finished_fingerprint);
      return false;
    }
    observed = finished_fingerprint;
    if (!models) {
      return false;
    }
    const changed =
      record === null ||
      JSON.stringify(record.models.map((m) => m.id)) !==
        JSON.stringify(models.map((m) => m.id));
    record = { read_at: now(), fingerprint: finished_fingerprint, models };
    try {
      persist(record);
    } catch (err) {
      warn(
        `agy-model-list: ${filePath()} 쓰기 실패(${String(err)}) — 메모리 목록만 갱신합니다.`
      );
    }
    if (changed) {
      revision++;
      emit();
    }
    return true;
  }

  /**
   * Read the list once; a read the fingerprint invalidated is retried once,
   * which is the one extra read a token refresh costs.
   *
   * @returns {Promise<boolean>}
   */
  async function refreshOnce() {
    const before = generation;
    const landed = await readOnce();
    if (landed || generation === before) {
      return landed;
    }
    return readOnce();
  }

  /**
   * @returns {Promise<boolean>}
   */
  function refresh() {
    if (!in_flight) {
      const current = refreshOnce().finally(() => {
        if (in_flight === current) {
          in_flight = null;
        }
      });
      in_flight = current;
    }
    return in_flight;
  }

  /**
   * Whether a cached answer still stands: inside its reuse window, and not an
   * exhausted verdict whose reset time already passed — the hold probe at the
   * reset must read the CLI again.
   *
   * @param {{ value: AgyQuota, expires_at: number }} entry
   * @returns {boolean}
   */
  function quotaCacheFresh(entry) {
    const at = now();
    if (at >= entry.expires_at) {
      return false;
    }
    const value = entry.value;
    return !(
      value.state === 'exhausted' &&
      value.resets_at !== null &&
      value.resets_at <= at
    );
  }

  /**
   * One `/usage` read, judged. A failure is `unknown`.
   *
   * @returns {Promise<AgyQuota>}
   */
  async function readQuotaOnce() {
    const started_generation = generation;
    const started_fingerprint = fingerprint();
    /** @type {AgyQuota} */
    let value;
    try {
      const { stdout } = await execFile(
        command(),
        ['-p', '/usage', '--output-format', 'json'],
        { timeout: AGY_QUOTA_TIMEOUT_MS, env: env(), maxBuffer: 1024 * 1024 }
      );
      value = judgeAgyQuota(JSON.parse(stdout));
    } catch (err) {
      value = { state: 'unknown', reason: String(err) };
    }
    if (generation !== started_generation) {
      return { state: 'unknown', reason: 'credentials_changed' };
    }
    // The credentials moved while `/usage` ran: the answer may belong to
    // either account, so the list is dropped and the launch re-check refuses
    // until a list for the new credentials lands.
    const finished_fingerprint = fingerprint();
    if (
      finished_fingerprint !== started_fingerprint ||
      (observed !== null && observed !== finished_fingerprint)
    ) {
      drop(finished_fingerprint);
      void refresh();
      return { state: 'unknown', reason: 'credentials_changed' };
    }
    if (value.state !== 'unknown') {
      quota_cache = { value, expires_at: now() + AGY_QUOTA_CACHE_MS };
    }
    return value;
  }

  return {
    /**
     * The listed ids, or none while no list is held.
     *
     * @returns {string[]}
     */
    names() {
      return record ? record.models.map((model) => model.id) : [];
    },

    /**
     * Whether a list for the current credentials is held — the agy launch
     * gate.
     *
     * @returns {boolean}
     */
    ready() {
      return record !== null;
    },

    /**
     * Increments whenever the listed ids change, including a drop.
     *
     * @returns {number}
     */
    revision() {
      return revision;
    },

    /**
     * @returns {AgyListStatus}
     */
    status() {
      return {
        source: record ? 'list' : 'none',
        read_at: record ? record.read_at : null
      };
    },

    /**
     * Synchronously adopt the persisted last good list when it was read under
     * the current credentials.
     *
     * @returns {boolean} Whether a list was adopted.
     */
    loadPersisted() {
      /** @type {string|null} */
      let text = null;
      try {
        text = String(fs.readFileSync(filePath(), 'utf8'));
      } catch (err) {
        if (/** @type {any} */ (err)?.code !== 'ENOENT') {
          warn(`agy-model-list: ${filePath()} 읽기 실패(${String(err)})`);
        }
        return false;
      }
      /** @type {AgyListRecord|null} */
      let parsed = null;
      try {
        parsed = parseRecord(JSON.parse(text));
      } catch {
        parsed = null;
      }
      if (!parsed) {
        warn(`agy-model-list: ${filePath()} 무시: 형식이 잘못되었습니다.`);
        return false;
      }
      const current = fingerprint();
      observed = current;
      if (parsed.fingerprint !== current) {
        return false;
      }
      record = parsed;
      revision++;
      emit();
      return true;
    },

    /**
     * Re-stat the credentials; a moved fingerprint drops everything and starts
     * a new read. Resolves nothing: the caller reads {@link ready} after.
     *
     * @returns {boolean} Whether the credentials moved.
     */
    checkCredentials() {
      const moved = credentialsMoved();
      if (moved) {
        void refresh();
      }
      return moved;
    },

    /**
     * Drop the list, the quota cache and every read in flight, then read
     * again (login or account switch success, Phase 3).
     */
    invalidate() {
      drop(fingerprint());
      void refresh();
    },

    /**
     * Read the CLI list once. Concurrent calls share one read; resolves to
     * whether a list landed.
     */
    refresh,

    /**
     * The pre-run quota verdict, cached for {@link AGY_QUOTA_CACHE_MS}.
     * Concurrent calls share one read; a failure is never cached.
     *
     * @returns {Promise<AgyQuota>}
     */
    quota() {
      // A credential move since the last look drops the cache before it is
      // reused, so an answer for the old account never gates the new one.
      if (credentialsMoved()) {
        void refresh();
      }
      if (quota_cache && quotaCacheFresh(quota_cache)) {
        return Promise.resolve(quota_cache.value);
      }
      if (!quota_in_flight) {
        const current = readQuotaOnce().finally(() => {
          if (quota_in_flight === current) {
            quota_in_flight = null;
          }
        });
        quota_in_flight = current;
      }
      return quota_in_flight;
    },

    /**
     * Refresh now and then every {@link AGY_MODEL_LIST_REFRESH_MS}; each tick
     * re-stats the credentials first.
     */
    start() {
      if (timer !== null) {
        return;
      }
      credentialsMoved();
      void refresh();
      timer = arm(() => {
        credentialsMoved();
        void refresh();
      }, AGY_MODEL_LIST_REFRESH_MS);
      timer?.unref?.();
    },

    stop() {
      if (timer !== null) {
        disarm(timer);
        timer = null;
      }
    },

    /**
     * Register a listener called after the listed ids change.
     *
     * @param {() => void} listener
     * @returns {() => void}
     */
    onChange(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };
}

/** @typedef {ReturnType<typeof createAgyModelList>} AgyModelList */

/** @type {AgyModelList|null} */
let shared = null;

/**
 * The process-wide reader. Created lazily and inert until a caller loads or
 * starts it.
 *
 * @returns {AgyModelList}
 */
export function agyModelList() {
  if (!shared) {
    shared = createAgyModelList();
  }
  return shared;
}

/**
 * Drop the process-wide list and every cached or in-flight read (Phase 3's
 * login and switch success path).
 */
export function invalidateAgyModelList() {
  agyModelList().invalidate();
}

/**
 * Replace (or with no argument, drop) the process-wide reader (test hook).
 *
 * @param {AgyModelList|null} [list]
 */
export function __setAgyModelListForTest(list = null) {
  shared?.stop();
  shared = list;
}
