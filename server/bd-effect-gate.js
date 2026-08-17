/**
 * The workspace-scoped effect gate for bd writes and Worker effects.
 *
 * `server/bd-capability.js` owns the state and the probe but takes its runner by
 * injection, so it cannot resolve a workspace or reach the real bd itself. This
 * module is the one place that binds the two together, which keeps the gate's
 * answer identical no matter which caller asks.
 *
 * @import { BdJsonError } from './bd-json.js'
 */
import {
  requireBdJsonCapability,
  resolveBdWorkspaceIdentity
} from './bd-capability.js';
import { bdJsonFailure } from './bd-json.js';
import { runBdJson } from './bd.js';

/**
 * Test-only override of the gate decision.
 *
 * @type {((command_family: string, root_dir?: string) => Promise<{ ok: true } | { ok: false, error: BdJsonError }>) | null}
 */
let gate_override = null;

/**
 * Replace the gate decision. Test-only hook.
 *
 * @param {((command_family: string, root_dir?: string) => Promise<any>) | null} fn
 */
export function __setBdEffectGateForTest(fn) {
  gate_override = fn;
}

/**
 * Decide whether an effect may run against a workspace.
 *
 * Identity that cannot be resolved is a refusal, not a pass: without it there
 * is no workspace whose protocol health could have been checked.
 *
 * @param {string} command_family
 * @param {string} [root_dir] - Defaults to the process working directory.
 * @returns {Promise<{ ok: true } | { ok: false, error: BdJsonError }>}
 */
export async function requireBdJsonCapabilityForWorkspace(
  command_family,
  root_dir
) {
  if (gate_override) {
    return gate_override(command_family, root_dir);
  }
  const identity = resolveBdWorkspaceIdentity({
    root_dir: root_dir || process.cwd()
  });
  if (!identity.ok) {
    return identity;
  }
  return requireBdJsonCapability({
    workspace: identity.data,
    command_family,
    run_json: runBdJson,
    cwd: root_dir || process.cwd()
  });
}

/**
 * Refusal payload for a caller that reports errors rather than throwing.
 *
 * @param {{ ok: false, error: BdJsonError }} refusal
 * @param {string} message
 */
export function bdEffectRefusal(refusal, message) {
  return bdJsonFailure(refusal.error.code, message, {
    command_family: refusal.error.details?.command_family
  });
}
