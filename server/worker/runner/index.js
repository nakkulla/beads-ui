/**
 * Runner adapter registry (spec §5.4, narrowed by worker-phase1 §4).
 *
 * ONE runner: `claude`. The codex/ccx adapters and the full_plan entry guard
 * they required are retired — that guard existed only because the plan-save
 * hook is claude-only, so with claude as the single runner every path it
 * protected is unreachable. `createRunner` returns a uniform
 * `{ name, spawn(bead, workspace, settings) → RunnerHandle }`.
 *
 * @import { RunnerHandle, EngineDeps } from './session.js'
 */
import { spawnClaude } from './claude.js';

/** @type {ReadonlyArray<'claude'>} */
export const RUNNERS = ['claude'];

/**
 * Create the runner adapter. `runner_name` is accepted for call-site
 * compatibility; every value resolves to claude.
 *
 * @param {string} [runner_name]
 * @param {EngineDeps} [deps]
 * @returns {{ name: 'claude', spawn: (bead: any, workspace: string, settings: any) => RunnerHandle }}
 */
export function createRunner(runner_name, deps = {}) {
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
