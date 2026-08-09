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
 * An unknown runner name resolves to claude — the pre-existing behaviour, kept
 * because a bead carrying a stale or misspelled runner must still dispatch.
 *
 * `adapterSpec` is the SPAWN-FREE half of the same resolution, for the readers
 * that parse a runner's output without owning a process (the startup usage
 * replay and the detached-session monitor). Both halves judge through
 * `codexEntry`, so a reader can never lift usage with a different adapter than
 * the one that wrote the log.
 *
 * @import { AdapterSpec, RunnerHandle, EngineDeps } from './session.js'
 * @import { ResolvedCatalog, RunnerCatalogEntry } from '../runner-catalog.js'
 */
import { getConfig } from '../../config.js';
import { ACTIVE_RUNNERS, resolveCatalog } from '../runner-catalog.js';
import { claudeSpec, spawnClaude } from './claude.js';
import { codexSpec, spawnCodex } from './codex.js';

/** @type {ReadonlyArray<string>} */
export const RUNNERS = ACTIVE_RUNNERS;

/** @type {ResolvedCatalog|null} */
let cached_catalog = null;

/**
 * The process-wide resolved catalog (builtin defaults + `[runner]` overrides).
 *
 * @returns {ResolvedCatalog}
 */
function activeCatalog() {
  if (!cached_catalog) {
    cached_catalog = resolveCatalog({
      overrides: getConfig().runner_overrides
    });
  }
  return cached_catalog;
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
  const catalog = deps.catalog || activeCatalog();
  return Object.prototype.hasOwnProperty.call(catalog.runners, 'codex')
    ? catalog.runners.codex
    : null;
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
  return entry ? codexSpec(entry) : claudeSpec();
}

/**
 * Create the runner adapter for `runner_name`.
 *
 * @param {string} [runner_name]
 * @param {EngineDeps & { catalog?: ResolvedCatalog }} [deps]
 * @returns {{ name: string, spawn: (bead: any, workspace: string, settings: any) => RunnerHandle }}
 */
export function createRunner(runner_name, deps = {}) {
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
        routing_env: {}
      });
    }
  };
}
