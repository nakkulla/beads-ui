/**
 * Runner adapter registry + entry guards (spec §5.4).
 *
 * Three runners: `claude` (default), `codex`, `ccx`. ccx reuses the claude
 * implementation and differs only by environment routing. `createRunner`
 * returns a uniform `{ name, spawn(bead, workspace, settings) → RunnerHandle }`.
 *
 * full_plan guard: the plan-save hook is claude-only, so a `full_plan` bead
 * WITHOUT a `plan_path` may run only on claude — codex/ccx are refused at the
 * spawn entry (and, upstream, at queue entry). If a plan already exists
 * (`plan_path` set), every runner is allowed.
 *
 * @import { RunnerHandle, EngineDeps } from './session.js'
 */
import { spawnClaude } from './claude.js';
import { spawnCodex } from './codex.js';

/** @type {ReadonlyArray<'claude'|'codex'|'ccx'>} */
export const RUNNERS = ['claude', 'codex', 'ccx'];

/**
 * @param {any} bead
 * @returns {boolean}
 */
function isFullPlan(bead) {
  return !!(
    bead &&
    (bead.route === 'full_plan' ||
      (bead.metadata && bead.metadata.route === 'full_plan'))
  );
}

/**
 * @param {any} bead
 * @returns {boolean}
 */
function hasPlanPath(bead) {
  const p =
    bead && (bead.plan_path ?? (bead.metadata && bead.metadata.plan_path));
  return typeof p === 'string' && p.length > 0;
}

/**
 * Error thrown when a runner is refused for a bead by an entry guard.
 */
export class RunnerBlockedError extends Error {
  /**
   * @param {string} message
   */
  constructor(message) {
    super(message);
    this.name = 'RunnerBlockedError';
    /** @type {'RUNNER_BLOCKED'} */
    this.code = 'RUNNER_BLOCKED';
  }
}

/**
 * Assert a runner may spawn a bead. Throws {@link RunnerBlockedError} when the
 * full_plan + no-plan_path + codex/ccx combination is refused.
 *
 * @param {any} bead
 * @param {'claude'|'codex'|'ccx'} runner_name
 * @returns {void}
 */
export function assertRunnerAllowed(bead, runner_name) {
  if (
    isFullPlan(bead) &&
    !hasPlanPath(bead) &&
    (runner_name === 'codex' || runner_name === 'ccx')
  ) {
    const id = bead && typeof bead.id === 'string' ? bead.id : 'bead';
    throw new RunnerBlockedError(
      `full_plan bead ${id} without plan_path requires the claude runner ` +
        `(plan-save hook is claude-only); ${runner_name} refused.`
    );
  }
}

/**
 * Resolve the ccx routing env. Ops supplies the claude-code-proxy routing (for
 * example `ANTHROPIC_BASE_URL`) via `deps.ccx_env`; the adapter forwards it
 * unchanged so ccx is claude-with-routing (spec §5.4).
 *
 * @param {{ ccx_env?: Record<string, string|undefined> }} deps
 * @returns {Record<string, string|undefined>}
 */
function ccxEnv(deps) {
  return { ...(deps.ccx_env || {}) };
}

/**
 * Create a runner adapter by name (defaults to claude on an unknown name).
 *
 * @param {string} runner_name
 * @param {EngineDeps & { ccx_env?: Record<string, string|undefined> }} [deps]
 * @returns {{ name: 'claude'|'codex'|'ccx', spawn: (bead: any, workspace: string, settings: any) => RunnerHandle }}
 */
export function createRunner(runner_name, deps = {}) {
  const name = /** @type {'claude'|'codex'|'ccx'} */ (
    RUNNERS.includes(/** @type {any} */ (runner_name)) ? runner_name : 'claude'
  );
  return {
    name,
    /**
     * @param {any} bead
     * @param {string} workspace
     * @param {any} settings
     * @returns {RunnerHandle}
     */
    spawn(bead, workspace, settings) {
      assertRunnerAllowed(bead, name);
      if (name === 'codex') {
        return spawnCodex(bead, workspace, settings, deps);
      }
      const routing_env = name === 'ccx' ? ccxEnv(deps) : {};
      return spawnClaude(bead, workspace, settings, {
        ...deps,
        name,
        routing_env
      });
    }
  };
}
