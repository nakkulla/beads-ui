/**
 * Runner adapter registry (worker-multi-provider-runner §B/§C).
 *
 * The vocabulary is `runner-catalog.js`'s `ACTIVE_RUNNERS`, re-exported rather
 * than restated: the catalog's active list IS the adapter-existence judgement,
 * and two lists could disagree. `createRunner` returns a uniform
 * `{ name, spawn(bead, workspace, settings) → RunnerHandle }` where `name` is the
 * runner actually resolved, so a caller recording it records what ran.
 *
 * The resolved catalog is read once per process (config.toml is a startup-time
 * input, and re-reading it per dispatch would let a mid-flight edit split a
 * queue across two argv shapes). Tests inject `deps.catalog` to bypass both the
 * cache and the machine's config file.
 *
 * A runner name the catalog does not register — an unknown name, a missing
 * name, or `codex` after the config dropped its section — is REFUSED with
 * {@link UNKNOWN_RUNNER} instead of resolving to claude (UI-6o70): a silent
 * fallback would run the work on an account and model nobody chose.
 *
 * `adapterSpec` is the SPAWN-FREE half of the same resolution, for the readers
 * that parse a runner's output without owning a process (startup usage replay,
 * detached-session monitoring, and provider-outage classification). Both judge through
 * `codexEntry`, so a reader can never lift usage with a different adapter than
 * the one that wrote the log. It keeps the claude parser for a name it does not
 * know: it starts nothing, and the only such names are attempt records written
 * before the refusal existed, whose logs were produced by the claude adapter.
 *
 * @import { AdapterSpec, RunnerHandle, EngineDeps } from './session.js'
 * @import { ResolvedCatalog, RunnerCatalogEntry } from '../runner-catalog.js'
 */
import { getConfig } from '../../config.js';
import { codexModelList } from '../codex-model-list.js';
import { ACTIVE_RUNNERS, resolveCatalog } from '../runner-catalog.js';
import { claudeSpec, spawnClaude } from './claude.js';
import { codexSpec, spawnCodex } from './codex.js';

/** @type {ReadonlyArray<string>} */
export const RUNNERS = ACTIVE_RUNNERS;

/** Refusal reason (and thrown error `code`) for an unregistered runner name. */
export const UNKNOWN_RUNNER = 'unknown_runner';

/**
 * Whether `error` is {@link createRunner}'s unregistered-runner refusal.
 *
 * @param {unknown} error
 * @returns {boolean}
 */
export function isUnknownRunnerError(error) {
  return (
    error instanceof Error &&
    /** @type {{ code?: unknown }} */ (error).code === UNKNOWN_RUNNER
  );
}

/** @type {ResolvedCatalog|null} */
let cached_catalog = null;
/** The Codex name-table revision {@link cached_catalog} was built from. */
let cached_codex_revision = -1;

/**
 * The process-wide resolved catalog (builtin defaults + Codex CLI list names +
 * `[runner]` overrides).
 *
 * Exported since UI-jrb3: the exec-setting enums and the WS snapshot decoration
 * need the SAME resolution the dispatch path uses, and a second `resolveCatalog`
 * call would both repeat its warnings and let a mid-flight config edit hand the
 * UI a vocabulary the launcher does not share. The cache is swapped when the
 * Codex model list changes (UI-gpac §3.3), and `codex_list` carries where the
 * Codex names came from.
 *
 * @returns {ResolvedCatalog}
 */
export function runtimeCatalog() {
  const list = codexModelList();
  if (!cached_catalog || cached_codex_revision !== list.revision()) {
    cached_codex_revision = list.revision();
    cached_catalog = resolveCatalog({
      overrides: getConfig().runner_overrides,
      codex_names: list.names()
    });
  }
  cached_catalog.codex_list = list.status();
  return cached_catalog;
}

/**
 * Drop the cached runtime catalog so the next {@link runtimeCatalog} call
 * re-reads the config file. Tests that point `BDUI_CONFIG_PATH` at a fixture
 * config need this on both sides of the override, or the process-wide cache
 * leaks one test's catalog into every later one.
 */
export function __resetRuntimeCatalogForTest() {
  cached_catalog = null;
  cached_codex_revision = -1;
}

/**
 * The catalog's codex entry when `runner_name` asks for codex and the catalog
 * still carries it, else null — the single codex/claude judgement both
 * `createRunner` and `adapterSpec` resolve through. A config that drops the
 * section leaves nothing to build an argv from, so it is not dispatchable.
 *
 * @param {string|null|undefined} runner_name
 * @param {{ catalog?: ResolvedCatalog }} deps
 * @returns {RunnerCatalogEntry|null}
 */
function codexEntry(runner_name, deps) {
  if (runner_name !== 'codex') {
    return null;
  }
  const catalog = deps.catalog || runtimeCatalog();
  return Object.prototype.hasOwnProperty.call(catalog.runners, 'codex')
    ? catalog.runners.codex
    : null;
}

/**
 * The refusal {@link createRunner} throws for an unregistered runner name.
 *
 * @param {string|undefined} runner_name
 * @returns {Error}
 */
function unknownRunnerError(runner_name) {
  return Object.assign(new Error(`${UNKNOWN_RUNNER}: ${String(runner_name)}`), {
    code: UNKNOWN_RUNNER
  });
}

/**
 * The adapter spec for `runner_name`, built without spawning anything.
 *
 * @param {string|null} [runner_name]
 * @param {{ catalog?: ResolvedCatalog }} [deps]
 * @returns {AdapterSpec}
 */
export function adapterSpec(runner_name, deps = {}) {
  const entry = codexEntry(runner_name, deps);
  if (entry) {
    return codexSpec(entry);
  }
  const catalog = deps.catalog || runtimeCatalog();
  const claude_entry = Object.prototype.hasOwnProperty.call(
    catalog.runners,
    'claude'
  )
    ? catalog.runners.claude
    : undefined;
  return claudeSpec({ catalog_entry: claude_entry });
}

/**
 * Create the runner adapter for `runner_name`.
 *
 * Throws an `Error` whose `code` is {@link UNKNOWN_RUNNER} when the name is not
 * a registered runner; nothing is spawned.
 *
 * @param {string} [runner_name]
 * @param {EngineDeps & { catalog?: ResolvedCatalog }} [deps]
 * @returns {{ name: string, spawn: (bead: any, workspace: string, settings: any) => RunnerHandle }}
 */
export function createRunner(runner_name, deps = {}) {
  if (runner_name !== 'claude' && runner_name !== 'codex') {
    throw unknownRunnerError(runner_name);
  }
  const codex_entry = codexEntry(runner_name, deps);
  if (codex_entry) {
    return {
      name: 'codex',
      /**
       * @param {any} bead
       * @param {string} workspace
       * @param {any} settings
       * @returns {RunnerHandle}
       */
      spawn(bead, workspace, settings) {
        return spawnCodex(bead, workspace, settings, {
          ...deps,
          name: 'codex',
          catalog_entry: codex_entry,
          routing_env: {}
        });
      }
    };
  }
  if (runner_name === 'codex') {
    throw unknownRunnerError(runner_name);
  }
  const catalog = deps.catalog || runtimeCatalog();
  if (!Object.prototype.hasOwnProperty.call(catalog.runners, 'claude')) {
    throw unknownRunnerError(runner_name);
  }
  const claude_entry = catalog.runners.claude;
  return {
    name: 'claude',
    /**
     * @param {any} bead
     * @param {string} workspace
     * @param {any} settings
     * @returns {RunnerHandle}
     */
    spawn(bead, workspace, settings) {
      return spawnClaude(bead, workspace, settings, {
        ...deps,
        name: 'claude',
        catalog_entry: claude_entry,
        routing_env: {}
      });
    }
  };
}
