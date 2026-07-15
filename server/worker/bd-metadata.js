/**
 * bd metadata adapter for the scheduler's `bd` dependency (spec §5.2).
 *
 * Encodes the confirmed bd argv (matching server/ws/mutation-handlers.js):
 *   set   → `bd update <id> --set-metadata key=value`
 *   unset → `bd update <id> --unset-metadata key`
 *   read  → `bd show <id> --json` then read `.metadata[key]`
 *
 * This is the live wiring adapter; the scheduler is unit-tested with a fake bd,
 * so this module is proven via an injected runner that captures argv (never a
 * real bd process).
 */
import { runBd, runBdJson } from '../bd.js';

/**
 * @param {{
 *   run?: (args: string[], options?: any) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   runJson?: (args: string[], options?: any) => Promise<{ code: number, stdoutJson?: any, stderr?: string }>,
 *   cwd?: string
 * }} [deps]
 * @returns {{
 *   setMetadata: (bead_id: string, key: string, value: string) => Promise<void>,
 *   unsetMetadata: (bead_id: string, key: string) => Promise<void>,
 *   readMetadata: (bead_id: string, key: string) => Promise<string|null>
 * }}
 */
export function createBdMetadata(deps = {}) {
  const run = deps.run || ((args, options) => runBd(args, options));
  const runJson = deps.runJson || ((args, options) => runBdJson(args, options));
  const cwd = deps.cwd;
  const opts = cwd ? { cwd } : undefined;

  return {
    /**
     * @param {string} bead_id
     * @param {string} key
     * @param {string} value
     */
    async setMetadata(bead_id, key, value) {
      await run(['update', bead_id, '--set-metadata', `${key}=${value}`], opts);
    },

    /**
     * @param {string} bead_id
     * @param {string} key
     */
    async unsetMetadata(bead_id, key) {
      await run(['update', bead_id, '--unset-metadata', key], opts);
    },

    /**
     * @param {string} bead_id
     * @param {string} key
     * @returns {Promise<string|null>}
     */
    async readMetadata(bead_id, key) {
      const r = await runJson(['show', bead_id, '--json'], opts);
      const md = r && r.stdoutJson && r.stdoutJson.metadata;
      const v = md && typeof md === 'object' ? md[key] : undefined;
      return v == null ? null : String(v);
    }
  };
}
