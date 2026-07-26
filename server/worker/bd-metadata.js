/**
 * bd metadata adapter for the scheduler's `bd` dependency (spec §5.2).
 *
 * Encodes the confirmed bd argv (matching server/ws/mutation-handlers.js):
 *   set    → `bd update <id> --set-metadata key=value`
 *   unset  → `bd update <id> --unset-metadata key`
 *   read   → `bd show <id> --json` then read `.metadata[key]`
 *   status → `bd update <id> --status <status>` / `bd show <id> --json .status`
 *   children → `bd list --json --all --metadata-field parent=<id>`
 *
 * The status pair exists for the worker's `resolved` back-fill on the PR
 * observation verdict (worker-phase2 §1) — the same contract vocabulary the
 * session writes, written by the server when the session omitted it.
 *
 * This is the live wiring adapter; the scheduler is unit-tested with a fake bd,
 * so this module is proven via an injected runner that captures argv (never a
 * real bd process).
 */
import { runBd, runBdJson, unwrapShowJson } from '../bd.js';

/**
 * @param {{
 *   run?: (args: string[], options?: any) => Promise<{ code: number, stdout: string, stderr: string }>,
 *   runJson?: (args: string[], options?: any) => Promise<{ code: number, stdoutJson?: any, stderr?: string }>,
 *   cwd?: string
 * }} [deps]
 * @returns {{
 *   setMetadata: (bead_id: string, key: string, value: string) => Promise<void>,
 *   unsetMetadata: (bead_id: string, key: string) => Promise<void>,
 *   readMetadata: (bead_id: string, key: string) => Promise<string|null>,
 *   setStatus: (bead_id: string, status: string) => Promise<void>,
 *   readStatus: (bead_id: string) => Promise<string|null>,
 *   listChildren: (bead_id: string) => Promise<{ id: string, status: string }[]>
 * }}
 */
export function createBdMetadata(deps = {}) {
  const run = deps.run || ((args, options) => runBd(args, options));
  const runJson = deps.runJson || ((args, options) => runBdJson(args, options));
  const cwd = deps.cwd;
  const opts = cwd ? { cwd } : undefined;

  return {
    /**
     * A non-zero bd exit MUST surface as a throw — callers (workflow_mode
     * stamp/revert) are fail-closed and a swallowed failure would let a stray
     * fast_track survive as if reverted (implementation review 2026-07-22).
     *
     * @param {string} bead_id
     * @param {string} key
     * @param {string} value
     */
    async setMetadata(bead_id, key, value) {
      const r = await run(
        ['update', bead_id, '--set-metadata', `${key}=${value}`],
        opts
      );
      if (r.code !== 0) {
        throw new Error(
          `bd set-metadata ${key} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
    },

    /**
     * @param {string} bead_id
     * @param {string} key
     */
    async unsetMetadata(bead_id, key) {
      const r = await run(['update', bead_id, '--unset-metadata', key], opts);
      if (r.code !== 0) {
        throw new Error(
          `bd unset-metadata ${key} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
    },

    /**
     * @param {string} bead_id
     * @param {string} key
     * @returns {Promise<string|null>}
     */
    async readMetadata(bead_id, key) {
      const r = await runJson(['show', bead_id, '--json'], opts);
      const issue = unwrapShowJson(r && r.stdoutJson);
      const md = issue && issue.metadata;
      const v =
        md && typeof md === 'object'
          ? /** @type {Record<string, unknown>} */ (md)[key]
          : undefined;
      return v == null ? null : String(v);
    },

    /**
     * A non-zero bd exit throws, mirroring {@link setMetadata}: the PR
     * observation verdict treats a failed back-fill as a fail-closed refusal,
     * which only works if the failure surfaces.
     *
     * @param {string} bead_id
     * @param {string} status
     */
    async setStatus(bead_id, status) {
      const r = await run(['update', bead_id, '--status', status], opts);
      if (r.code !== 0) {
        throw new Error(
          `bd update --status ${status} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
    },

    /**
     * @param {string} bead_id
     * @returns {Promise<string|null>}
     */
    async readStatus(bead_id) {
      const r = await runJson(['show', bead_id, '--json'], opts);
      const issue = unwrapShowJson(r && r.stdoutJson);
      const status = issue && issue.status;
      return typeof status === 'string' ? status : null;
    },

    /**
     * Direct children of a bead, for the post-merge linked-Beads sweep
     * (worker-phase2 §6 / pr-finish contract order).
     *
     * TWO relations are queried and unioned, because they are genuinely
     * different things and either one alone under-reports:
     *   - `--parent <id>` — the canonical `parent-child` DEPENDENCY that
     *     `bd create --parent` records (AGENTS.md's documented relation),
     *   - `--metadata-field parent=<id>` — the phase-child metadata convention
     *     written separately by the workflow skill.
     * A child carrying only one of them is still a child, and a sweep that
     * missed it would close the parent over an open leaf.
     *
     * `--all` is required: a sweep must SEE already-closed children so it can
     * skip them, and the default listing hides closed issues. A non-zero bd exit
     * THROWS, mirroring the other mutators — the sweep is fail-closed, and an
     * unreadable child list must stop the cleanup rather than read as "this
     * bead has no children, go ahead and close the parent".
     *
     * @param {string} bead_id
     * @returns {Promise<{ id: string, status: string }[]>}
     */
    async listChildren(bead_id) {
      /** @type {Map<string, { id: string, status: string }>} */
      const merged = new Map();
      /** @type {string[][]} */
      const selectors = [
        ['--parent', bead_id],
        ['--metadata-field', `parent=${bead_id}`]
      ];
      for (const selector of selectors) {
        const r = await runJson(
          ['list', '--json', '--all', '--limit', '0', ...selector],
          opts
        );
        if (r && typeof r.code === 'number' && r.code !== 0) {
          throw new Error(
            `bd list ${selector.join(' ')} failed (${r.code}): ${(
              r.stderr || ''
            ).trim()}`
          );
        }
        const rows = r && r.stdoutJson;
        if (!Array.isArray(rows)) {
          continue;
        }
        for (const raw of rows) {
          if (!raw || typeof raw !== 'object') {
            continue;
          }
          const row = /** @type {Record<string, unknown>} */ (raw);
          if (
            typeof row.id === 'string' &&
            row.id.length > 0 &&
            row.id !== bead_id &&
            !merged.has(row.id)
          ) {
            merged.set(row.id, {
              id: row.id,
              status: typeof row.status === 'string' ? row.status : ''
            });
          }
        }
      }
      return [...merged.values()];
    }
  };
}
