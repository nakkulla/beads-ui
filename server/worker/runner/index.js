/**
 * Runner adapter registry + entry guards (spec §5.4).
 *
 * Three runners: `claude` (default), `codex`, `ccx`. ccx reuses the claude
 * implementation and differs only by environment routing. `createRunner`
 * returns a uniform `{ name, spawn(bead, workspace, settings) → RunnerHandle }`.
 *
 * full_plan guard (spec §변경 2): the plan-save hook is claude-only, so a
 * `full_plan` bead runs on codex/ccx ONLY with a FRESH `user@<40hex>`
 * plan_review receipt — or a legacy approved plan (no plan_review key AND
 * `plan_path` set AND status resolved/closed). Every other case (no receipt,
 * invalid/skip/other-reviewer/short-sha receipt, stale, undeterminable
 * freshness) is fail-closed; claude is always allowed. See
 * {@link assertRunnerAllowed}.
 *
 * @import { RunnerHandle, EngineDeps } from './session.js'
 */
import {
  gitHead,
  parsePlanReceipt,
  planFreshness
} from '../../workflow-enrich.js';
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
 * @returns {string}
 */
function planPathOf(bead) {
  const p =
    bead && (bead.plan_path ?? (bead.metadata && bead.metadata.plan_path));
  return typeof p === 'string' ? p : '';
}

/**
 * @param {any} bead
 * @returns {boolean}
 */
function hasPlanPath(bead) {
  return planPathOf(bead).length > 0;
}

/**
 * @param {any} bead
 * @returns {string | null}
 */
function planReviewOf(bead) {
  const v =
    bead && (bead.plan_review ?? (bead.metadata && bead.metadata.plan_review));
  return typeof v === 'string' ? v : null;
}

/**
 * @param {any} bead
 * @returns {string}
 */
function statusOf(bead) {
  const s = bead && (bead.status ?? (bead.metadata && bead.metadata.status));
  return typeof s === 'string' ? s : '';
}

/**
 * Resolve plan-review freshness for the guard in priority order (spec §변경 2):
 * precomputed boolean (`ctx.plan_fresh`, else `bead.plan_fresh`) → direct
 * compute from `ctx.workspace` → `unknown` (undeterminable → fail-closed at the
 * call site). A precomputed boolean carries only fresh/not-fresh, so `false` is
 * reported as `stale`.
 *
 * @param {any} bead
 * @param {{ workspace?: string, plan_fresh?: boolean }} ctx
 * @param {string} sha
 * @returns {'fresh' | 'stale' | 'unknown'}
 */
function resolvePlanFresh(bead, ctx, sha) {
  if (typeof ctx.plan_fresh === 'boolean') {
    return ctx.plan_fresh ? 'fresh' : 'stale';
  }
  if (bead && typeof bead.plan_fresh === 'boolean') {
    return bead.plan_fresh ? 'fresh' : 'stale';
  }
  if (ctx.workspace) {
    return planFreshness(
      ctx.workspace,
      gitHead(ctx.workspace),
      sha,
      planPathOf(bead)
    );
  }
  return 'unknown';
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
 * Assert a runner may spawn a bead (spec §변경 2). For a `full_plan` bead on
 * codex/ccx, authorization requires EITHER a fresh `user@<40hex>` plan_review
 * receipt OR — only when no plan_review key exists — a legacy approved plan
 * (`plan_path` set + status resolved/closed). Every other case fails closed: no
 * receipt, an invalid/skip/other-reviewer/short-sha receipt (which also blocks
 * the legacy fallback), a stale plan, or an undeterminable freshness. claude is
 * always allowed. Throws {@link RunnerBlockedError} when refused.
 *
 * @param {any} bead
 * @param {'claude'|'codex'|'ccx'} runner_name
 * @param {{ workspace?: string, plan_fresh?: boolean }} [ctx]
 * @returns {void}
 */
export function assertRunnerAllowed(bead, runner_name, ctx = {}) {
  if (!isFullPlan(bead) || (runner_name !== 'codex' && runner_name !== 'ccx')) {
    return;
  }
  const id = bead && typeof bead.id === 'string' ? bead.id : 'bead';
  const raw_receipt = planReviewOf(bead);

  if (raw_receipt !== null) {
    const receipt = parsePlanReceipt(raw_receipt);
    if (!receipt) {
      // Present-but-invalid receipt: NOT an approval, and it blocks the legacy
      // fallback too (fail-closed — plan has no skip path).
      throw new RunnerBlockedError(
        `full_plan bead ${id} plan_review "${raw_receipt}" is not a valid ` +
          `user approval (requires user@<40hex>, no skip path); ` +
          `${runner_name} refused.`
      );
    }
    const freshness = resolvePlanFresh(bead, ctx, receipt.sha);
    if (freshness === 'fresh') {
      return;
    }
    throw new RunnerBlockedError(
      freshness === 'stale'
        ? `full_plan bead ${id} plan_review is stale (plan changed since ` +
            `approval); ${runner_name} refused.`
        : `full_plan bead ${id} plan_review freshness is undetermined; ` +
            `${runner_name} refused (fail-closed).`
    );
  }

  // Legacy fallback: no plan_review key + plan_path + resolved/closed.
  if (hasPlanPath(bead)) {
    const status = statusOf(bead);
    if (status === 'resolved' || status === 'closed') {
      return;
    }
  }
  throw new RunnerBlockedError(
    `full_plan bead ${id} has no fresh plan_review receipt and is not an ` +
      `approved legacy plan; requires the claude runner (plan-save hook is ` +
      `claude-only); ${runner_name} refused.`
  );
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
      assertRunnerAllowed(bead, name, { workspace });
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
