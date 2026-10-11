/**
 * Codex model names from the Codex CLI model list (UI-gpac §3.1-§3.2).
 *
 * The server runs `codex debug models` asynchronously at start and hourly, and
 * turns the list into alias and pinned names with the same rules as the
 * dotfiles resolver (`workflow/scripts/codex-models.py`), so a new Codex
 * release needs no code edit:
 *
 * - eligible: slug `gpt-<version>-<family>`, `visibility == list`,
 *   `multi_agent_version == v2`;
 * - alias `<family>`: the family's highest eligible version, comparing the
 *   integer sequence with trailing zeros dropped (`6 == 6.0`); two highest
 *   versions or a duplicated slug is `codex_models_ambiguous`;
 * - pinned `<family>-<version>`: every eligible version.
 *
 * The last successful list is persisted, so a failed read keeps it and a
 * transient CLI failure can never shrink the catalog. With no list ever read,
 * the builtin seed table stands. Nothing here runs at import time: tests and
 * any caller that never calls `loadPersisted`/`start` see the seed.
 *
 * @import { CodexListStatus, CodexNameTable } from './runner-catalog.js'
 */
import { execFile as nodeExecFile } from 'node:child_process';
import nodeFs from 'node:fs';
import path from 'node:path';
import { loadExecutionDefaults } from './execution-defaults.js';
import { CODEX_FAMILIES, CODEX_SEED_NAMES } from './runner-catalog.js';
import { stateHome } from './state-paths.js';

/** The account list may refresh from the network; this only bounds a hang. */
export const CODEX_MODEL_LIST_TIMEOUT_MS = 120_000;

/** Refresh cadence after the start-up read. */
export const CODEX_MODEL_LIST_REFRESH_MS = 60 * 60 * 1000;

/**
 * @typedef {{ slug: string, visibility: unknown, multi_agent_version: unknown }} CodexListModel
 * @typedef {{ read_at: number, codex_version: string|null, models: CodexListModel[] }} CodexListRecord
 * @typedef {{ aliases: Record<string, string>, pinned: Record<string, string>, errors: Record<string, string> }} CodexResolvedTable
 * @typedef {(file: string, args: string[], options: { timeout: number, env: NodeJS.ProcessEnv, maxBuffer: number }) => Promise<{ stdout: string }>} CodexExecFile
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {ReadonlyArray<string>} families
 */
function slugPattern(families) {
  return new RegExp(`^gpt-([0-9]+(?:\\.[0-9]+)*)-(${families.join('|')})$`);
}

/**
 * Integer sequence with trailing zeros dropped, so `6 == 6.0` and `6.1 > 6`.
 *
 * @param {string} version
 * @returns {number[]}
 */
export function versionKey(version) {
  const parts = version.split('.').map((part) => Number.parseInt(part, 10));
  while (parts.length > 1 && parts[parts.length - 1] === 0) {
    parts.pop();
  }
  return parts;
}

/**
 * Lexicographic comparison of two version keys (Python tuple order).
 *
 * @param {number[]} left
 * @param {number[]} right
 * @returns {number}
 */
function compareVersionKeys(left, right) {
  const length = Math.min(left.length, right.length);
  for (let index = 0; index < length; index++) {
    if (left[index] !== right[index]) {
      return left[index] < right[index] ? -1 : 1;
    }
  }
  return left.length - right.length;
}

/**
 * Eligible slug -> [family, version], and the slugs listed more than once.
 * `priority`, `upgrade` and `display_name` take no part.
 *
 * @param {ReadonlyArray<unknown>} models
 * @param {ReadonlyArray<string>} families
 */
function eligibleModels(models, families) {
  const pattern = slugPattern(families);
  /** @type {Set<string>} */
  const seen = new Set();
  /** @type {Set<string>} */
  const duplicated = new Set();
  /** @type {Map<string, [string, string]>} */
  const eligible = new Map();
  for (const model of models) {
    if (!isRecord(model) || typeof model.slug !== 'string') {
      continue;
    }
    const slug = model.slug;
    if (seen.has(slug)) {
      duplicated.add(slug);
    }
    seen.add(slug);
    const match = pattern.exec(slug);
    if (
      match &&
      model.visibility === 'list' &&
      model.multi_agent_version === 'v2'
    ) {
      eligible.set(slug, [match[2], match[1]]);
    }
  }
  return { eligible, duplicated };
}

/**
 * Every alias and every pinned name with its id; a failing name goes to
 * `errors` with the resolver's failure token. Mirrors `codex-models.py`
 * `name_table`.
 *
 * @param {ReadonlyArray<unknown>} models
 * @param {ReadonlyArray<string>} [families]
 * @returns {CodexResolvedTable}
 */
export function codexNameTable(models, families = CODEX_FAMILIES) {
  const { eligible, duplicated } = eligibleModels(models, families);
  /** @type {Record<string, string>} */
  const aliases = {};
  /** @type {Record<string, string>} */
  const pinned = {};
  /** @type {Record<string, string>} */
  const errors = {};
  for (const family of families) {
    const candidates = [...eligible.entries()].filter(
      ([, [owner]]) => owner === family
    );
    if (candidates.length === 0) {
      errors[family] = `codex_family_unavailable:${family}`;
      continue;
    }
    let top = versionKey(candidates[0][1][1]);
    for (const [, [, version]] of candidates) {
      const key = versionKey(version);
      if (compareVersionKeys(key, top) > 0) {
        top = key;
      }
    }
    const latest = candidates.filter(
      ([, [, version]]) => compareVersionKeys(versionKey(version), top) === 0
    );
    if (latest.length > 1) {
      errors[family] = `codex_models_ambiguous:${family}`;
      continue;
    }
    const slug = latest[0][0];
    if (duplicated.has(slug)) {
      errors[family] = `codex_models_ambiguous:${slug}`;
      continue;
    }
    aliases[family] = slug;
  }
  const pinned_names = [...eligible.entries()]
    .map(([slug, [family, version]]) => ({
      name: `${family}-${version}`,
      slug
    }))
    .sort((left, right) =>
      left.name < right.name ? -1 : left.name > right.name ? 1 : 0
    );
  for (const { name, slug } of pinned_names) {
    if (duplicated.has(slug)) {
      errors[name] = `codex_models_ambiguous:${slug}`;
      continue;
    }
    pinned[name] = slug;
  }
  return { aliases, pinned, errors };
}

/**
 * The Codex families the pinned execution defaults name, else the builtin
 * template families.
 *
 * @returns {string[]}
 */
export function pinnedCodexFamilies() {
  try {
    const families =
      loadExecutionDefaults().session?.implementation?.model_catalog?.codex
        ?.families;
    if (
      Array.isArray(families) &&
      families.length > 0 &&
      families.every(
        (family) => typeof family === 'string' && /^[a-z]+$/.test(family)
      )
    ) {
      return families.slice();
    }
  } catch {
    // Fall through to the builtin families.
  }
  return CODEX_FAMILIES.slice();
}

/**
 * @returns {string} `$XDG_STATE_HOME/bdui/codex-models.json`.
 */
export function codexModelListFilePath() {
  return path.join(stateHome(), 'bdui', 'codex-models.json');
}

/**
 * Keep only the fields the rules read, so the state file stays small.
 *
 * @param {unknown} models
 * @returns {CodexListModel[]|null}
 */
function trimModels(models) {
  if (!Array.isArray(models)) {
    return null;
  }
  /** @type {CodexListModel[]} */
  const out = [];
  for (const model of models) {
    if (isRecord(model) && typeof model.slug === 'string') {
      out.push({
        slug: model.slug,
        visibility: model.visibility ?? null,
        multi_agent_version: model.multi_agent_version ?? null
      });
    }
  }
  return out;
}

/**
 * @param {unknown} raw
 * @returns {CodexListRecord|null}
 */
function parseRecord(raw) {
  if (
    !isRecord(raw) ||
    typeof raw.read_at !== 'number' ||
    !Number.isFinite(raw.read_at)
  ) {
    return null;
  }
  const models = trimModels(raw.models);
  if (!models) {
    return null;
  }
  return {
    read_at: raw.read_at,
    codex_version:
      typeof raw.codex_version === 'string' ? raw.codex_version : null,
    models
  };
}

/** @type {CodexExecFile} */
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
 * Create one Codex model list reader. Every dependency is injectable; the
 * defaults are the real CLI, the real state file, and the pinned families.
 *
 * @param {{
 *   filePath?: () => string,
 *   fs?: typeof import('node:fs'),
 *   execFile?: CodexExecFile,
 *   command?: string,
 *   env?: () => NodeJS.ProcessEnv,
 *   families?: () => string[],
 *   now?: () => number,
 *   warn?: (message: string) => void,
 *   setInterval?: (fn: () => void, ms: number) => { unref?: () => void },
 *   clearInterval?: (handle: any) => void
 * }} [options]
 */
export function createCodexModelList(options = {}) {
  const filePath = options.filePath ?? codexModelListFilePath;
  const fs = options.fs ?? nodeFs;
  const execFile = options.execFile ?? defaultExecFile;
  const command = options.command ?? 'codex';
  const env = options.env ?? (() => process.env);
  const families = options.families ?? pinnedCodexFamilies;
  const now = options.now ?? Date.now;
  const warn = options.warn ?? console.warn;
  const arm = options.setInterval ?? setInterval;
  const disarm = options.clearInterval ?? clearInterval;

  /** @type {CodexNameTable} */
  let names = {
    aliases: { ...CODEX_SEED_NAMES.aliases },
    pinned: { ...CODEX_SEED_NAMES.pinned }
  };
  /** @type {CodexListRecord|null} */
  let record = null;
  let revision = 0;
  /** @type {any} */
  let timer = null;
  /** @type {Promise<boolean>|null} */
  let in_flight = null;
  /** @type {Set<() => void>} */
  const listeners = new Set();

  /**
   * Apply one list. An alias the list cannot resolve keeps its previous
   * resolution (the seed before any list); a pinned name that fails is only
   * left out.
   *
   * @param {CodexListRecord} next_record
   * @returns {boolean} Whether the name table changed.
   */
  function apply(next_record) {
    const list_families = families();
    const table = codexNameTable(next_record.models, list_families);
    /** @type {Record<string, string>} */
    const aliases = {};
    for (const family of list_families) {
      if (Object.hasOwn(table.aliases, family)) {
        aliases[family] = table.aliases[family];
        continue;
      }
      const previous = Object.hasOwn(names.aliases, family)
        ? names.aliases[family]
        : Object.hasOwn(CODEX_SEED_NAMES.aliases, family)
          ? CODEX_SEED_NAMES.aliases[family]
          : null;
      warn(
        `codex-model-list: ${table.errors[family]} — ${family} 별칭은 ${previous ?? '없음'}으로 유지합니다.`
      );
      if (previous !== null) {
        aliases[family] = previous;
      }
    }
    for (const [name, token] of Object.entries(table.errors)) {
      if (!list_families.includes(name)) {
        warn(`codex-model-list: ${token} — ${name} 이름을 뺍니다.`);
      }
    }
    const next = { aliases, pinned: table.pinned };
    record = next_record;
    if (JSON.stringify(next) === JSON.stringify(names)) {
      return false;
    }
    names = next;
    revision++;
    return true;
  }

  function emit() {
    for (const listener of listeners) {
      try {
        listener();
      } catch (err) {
        warn(`codex-model-list: change listener failed: ${String(err)}`);
      }
    }
  }

  /**
   * @param {CodexListRecord} next_record
   */
  function persist(next_record) {
    const file = filePath();
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(next_record, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * @param {string[]} args
   */
  async function run(args) {
    const { stdout } = await execFile(command, args, {
      timeout: CODEX_MODEL_LIST_TIMEOUT_MS,
      env: env(),
      maxBuffer: 16 * 1024 * 1024
    });
    return stdout;
  }

  async function readVersion() {
    try {
      const version = (await run(['--version'])).trim();
      return version.length > 0 && !version.includes('\n') ? version : null;
    } catch {
      return null;
    }
  }

  async function refreshOnce() {
    /** @type {CodexListModel[]|null} */
    let models = null;
    try {
      const payload = JSON.parse(await run(['debug', 'models']));
      models = isRecord(payload) ? trimModels(payload.models) : null;
      if (!models) {
        warn('codex-model-list: codex debug models에 models 목록이 없습니다.');
      }
    } catch (err) {
      warn(
        `codex-model-list: codex debug models 실패(${String(err)}) — 마지막 목록을 계속 씁니다.`
      );
    }
    if (!models) {
      return false;
    }
    /** @type {CodexListRecord} */
    const next_record = {
      read_at: now(),
      codex_version: await readVersion(),
      models
    };
    try {
      persist(next_record);
    } catch (err) {
      warn(
        `codex-model-list: ${filePath()} 쓰기 실패(${String(err)}) — 메모리 목록만 갱신합니다.`
      );
    }
    const changed = apply(next_record);
    if (changed) {
      emit();
    }
    return changed;
  }

  /**
   * @returns {Promise<boolean>}
   */
  function refresh() {
    if (!in_flight) {
      in_flight = refreshOnce().finally(() => {
        in_flight = null;
      });
    }
    return in_flight;
  }

  return {
    /**
     * The current alias and pinned name table.
     *
     * @returns {CodexNameTable}
     */
    names() {
      return names;
    },

    /**
     * Increments whenever the name table changes.
     *
     * @returns {number}
     */
    revision() {
      return revision;
    },

    /**
     * Where the names come from, for the settings dialog.
     *
     * @returns {CodexListStatus}
     */
    status() {
      return {
        source: record ? 'list' : 'seed',
        read_at: record ? record.read_at : null,
        codex_version: record ? record.codex_version : null,
        families: families()
      };
    },

    /**
     * Version-pinned names of the last successful list (never the seed).
     *
     * @returns {string[]|null}
     */
    listedPinnedNames() {
      return record ? Object.keys(names.pinned) : null;
    },

    /**
     * Synchronously adopt the persisted last good list. A missing or corrupt
     * file leaves the seed in place.
     *
     * @returns {boolean} Whether the name table changed.
     */
    loadPersisted() {
      /** @type {string|null} */
      let text = null;
      try {
        text = String(fs.readFileSync(filePath(), 'utf8'));
      } catch (err) {
        if (/** @type {any} */ (err)?.code !== 'ENOENT') {
          warn(`codex-model-list: ${filePath()} 읽기 실패(${String(err)})`);
        }
        return false;
      }
      /** @type {CodexListRecord|null} */
      let parsed = null;
      try {
        parsed = parseRecord(JSON.parse(text));
      } catch {
        parsed = null;
      }
      if (!parsed) {
        warn(`codex-model-list: ${filePath()} 무시: 형식이 잘못되었습니다.`);
        return false;
      }
      return apply(parsed);
    },

    /**
     * Read the CLI list once. Concurrent calls share one read; resolves to
     * whether the name table changed.
     */
    refresh,

    /**
     * Refresh now and then every {@link CODEX_MODEL_LIST_REFRESH_MS}.
     */
    start() {
      if (timer !== null) {
        return;
      }
      void refresh();
      timer = arm(() => {
        void refresh();
      }, CODEX_MODEL_LIST_REFRESH_MS);
      timer?.unref?.();
    },

    stop() {
      if (timer !== null) {
        disarm(timer);
        timer = null;
      }
    },

    /**
     * Register a listener called after the name table changes on refresh.
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

/** @typedef {ReturnType<typeof createCodexModelList>} CodexModelList */

/** @type {CodexModelList|null} */
let shared = null;

/**
 * The process-wide reader. Created lazily and inert until a caller loads or
 * starts it.
 *
 * @returns {CodexModelList}
 */
export function codexModelList() {
  if (!shared) {
    shared = createCodexModelList();
  }
  return shared;
}

/**
 * Replace (or with no argument, drop) the process-wide reader (test hook).
 *
 * @param {CodexModelList|null} [list]
 */
export function __setCodexModelListForTest(list = null) {
  shared?.stop();
  shared = list;
}
