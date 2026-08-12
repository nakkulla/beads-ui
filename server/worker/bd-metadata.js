/**
 * bd metadata adapter for the scheduler's `bd` dependency (spec §5.2).
 *
 * Encodes the confirmed bd argv (matching server/ws/mutation-handlers.js):
 *   set    → `bd update <id> --set-metadata key=value`
 *   unset  → `bd update <id> --unset-metadata key`
 *   read   → `bd show <id> --json` then read `.metadata[key]`
 *   status → `bd update <id> --status <status>` / `bd show <id> --json .status`
 *   children → `bd list --json --all --metadata-field parent=<id>`
 *   scan   → `bd list --json --all --limit 0` → external PR rows + status map
 *   combined → `bd update <id> [--set-metadata k=v ...] [--unset-metadata k ...]
 *              [--status <s>] [--append-notes <text>]` (one atomic write)
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
 *   cwd?: string,
 *   requestSnapshot?: (workspace: string, cause: string) => Promise<{ ok: boolean, stale?: boolean, fresh?: boolean, snapshot?: { generation?: number, all?: unknown[] } }>
 * }} [deps]
 * @returns {{
 *   setMetadata: (bead_id: string, key: string, value: string) => Promise<void>,
 *   unsetMetadata: (bead_id: string, key: string) => Promise<void>,
 *   readMetadata: (bead_id: string, key: string) => Promise<string|null>,
 *   setStatus: (bead_id: string, status: string) => Promise<void>,
 *   readStatus: (bead_id: string) => Promise<string|null>,
 *   readIssue: (bead_id: string) => Promise<Record<string, any>>,
 *   findIssue: (bead_id: string) => Promise<Record<string, any>|null>,
 *   deleteIssues: (bead_ids: string[]) => Promise<void>,
 *   createIssue: (input: { id: string, title: string, description: string, type: string, priority: number, dependency: string }) => Promise<void>,
 *   updateFields: (bead_id: string, input: { set?: Record<string, string>, unset?: string[], status?: string, append_notes?: string }) => Promise<void>,
 *   listChildren: (bead_id: string) => Promise<{ id: string, status: string }[]>,
 *   scanBeads: () => Promise<{ pr_rows: { bead_id: string, pr_url: string }[], statuses: Record<string, string>, generation?: number, fresh?: boolean }>
 * }}
 */
export function createBdMetadata(deps = {}) {
  const run = deps.run || ((args, options) => runBd(args, options));
  const runJson = deps.runJson || ((args, options) => runBdJson(args, options));
  const cwd = deps.cwd;
  const opts = cwd ? { cwd } : undefined;
  const requestSnapshot =
    typeof deps.requestSnapshot === 'function' ? deps.requestSnapshot : null;

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
     * Read one metadata key, FAIL-CLOSED (implementation review 2026-07-26).
     *
     * `null` means exactly one thing: the query succeeded and the key is absent.
     * A failed `bd show` (non-zero exit) or a payload that is not a readable
     * issue object THROWS. The distinction is load-bearing for every caller that
     * uses this as a confirming readback — [폐기]'s `pr_url` removal readback
     * passed while bd was DOWN when a failure could return `null`, which is the
     * same shape as "the key really is gone".
     *
     * @param {string} bead_id
     * @param {string} key
     * @returns {Promise<string|null>}
     */
    async readMetadata(bead_id, key) {
      const r = await runJson(['show', bead_id, '--json'], opts);
      if (r && typeof r.code === 'number' && r.code !== 0) {
        throw new Error(
          `bd show ${bead_id} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
      const issue = unwrapShowJson(r && r.stdoutJson);
      if (!issue || typeof issue !== 'object') {
        throw new Error(`bd show ${bead_id} returned an unreadable payload`);
      }
      const md = issue.metadata;
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
     * Read the issue status, FAIL-CLOSED on the same rule as
     * {@link readMetadata}: `null` means the query succeeded and the issue
     * carries no status, while a failed `bd show` or an unreadable payload
     * THROWS. Every caller uses this as a confirming readback or as a claim
     * probe, and a bd outage collapsed to `null` is indistinguishable from
     * "the status really is not what we are looking for".
     *
     * @param {string} bead_id
     * @returns {Promise<string|null>}
     */
    async readStatus(bead_id) {
      const r = await runJson(['show', bead_id, '--json'], opts);
      if (r && typeof r.code === 'number' && r.code !== 0) {
        throw new Error(
          `bd show ${bead_id} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
      const issue = unwrapShowJson(r && r.stdoutJson);
      if (!issue || typeof issue !== 'object') {
        throw new Error(`bd show ${bead_id} returned an unreadable payload`);
      }
      const status = issue.status;
      return typeof status === 'string' ? status : null;
    },

    /**
     * The whole issue object, FAIL-CLOSED on the same rule as
     * {@link readStatus}: a failed `bd show` or an unreadable payload THROWS.
     * The REVISE-parking observation needs `status` AND `metadata` AND `notes`
     * from ONE query — reading them through three separate calls would spawn
     * three `bd` processes per candidate and could observe three different
     * moments of a bead the disposition click is about to mutate.
     *
     * @param {string} bead_id
     * @returns {Promise<Record<string, any>>}
     */
    async readIssue(bead_id) {
      const r = await runJson(['show', bead_id, '--json'], opts);
      if (r && typeof r.code === 'number' && r.code !== 0) {
        throw new Error(
          `bd show ${bead_id} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
      const issue = unwrapShowJson(r && r.stdoutJson);
      if (!issue || typeof issue !== 'object') {
        throw new Error(`bd show ${bead_id} returned an unreadable payload`);
      }
      return /** @type {Record<string, any>} */ (issue);
    },

    /**
     * Exact-id lookup whose successful empty array means genuinely absent.
     * Unlike `bd show`, this can distinguish absence from an operational
     * failure without parsing stderr, which is required for idempotent repair
     * Bead creation.
     *
     * @param {string} bead_id
     * @returns {Promise<Record<string, any>|null>}
     */
    async findIssue(bead_id) {
      const r = await runJson(
        ['list', '--json', '--all', '--limit', '0', '--id', bead_id],
        opts
      );
      if (r && typeof r.code === 'number' && r.code !== 0) {
        throw new Error(
          `bd list --id ${bead_id} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
      if (!Array.isArray(r.stdoutJson)) {
        throw new Error(
          `bd list --id ${bead_id} returned an unreadable payload`
        );
      }
      if (r.stdoutJson.length === 0) {
        return null;
      }
      if (
        r.stdoutJson.length !== 1 ||
        !r.stdoutJson[0] ||
        typeof r.stdoutJson[0] !== 'object' ||
        r.stdoutJson[0].id !== bead_id
      ) {
        throw new Error(
          `bd list --id ${bead_id} returned an ambiguous payload`
        );
      }
      return /** @type {Record<string, any>} */ (r.stdoutJson[0]);
    },

    /**
     * Permanently delete only caller-validated exact issue IDs. The Worker
     * never cascades phase children because an unexpected descendant is a
     * fail-closed ownership conflict, not disposable residue.
     *
     * @param {string[]} bead_ids
     */
    async deleteIssues(bead_ids) {
      if (!Array.isArray(bead_ids) || bead_ids.length === 0) {
        throw new Error('bd delete requires non-empty issue IDs');
      }
      if (
        bead_ids.some(
          (bead_id) =>
            typeof bead_id !== 'string' ||
            bead_id.length === 0 ||
            bead_id.startsWith('-') ||
            /\s/.test(bead_id)
        )
      ) {
        throw new Error('bd delete requires explicit issue IDs');
      }
      if (new Set(bead_ids).size !== bead_ids.length) {
        throw new Error('bd delete rejects duplicate issue IDs');
      }
      const r = await run(['delete', ...bead_ids, '--force'], opts);
      if (r.code !== 0) {
        throw new Error(
          `bd delete ${bead_ids.join(' ')} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
    },

    /**
     * Create one preallocated repair issue. The caller always follows this
     * with {@link findIssue}; a collision therefore becomes an adoptable
     * readback instead of a second identity.
     *
     * @param {{ id: string, title: string, description: string, type: string, priority: number, dependency: string }} input
     */
    async createIssue(input) {
      const r = await run(
        [
          'create',
          '--id',
          input.id,
          '--title',
          input.title,
          '--description',
          input.description,
          '--type',
          input.type,
          '--priority',
          String(input.priority),
          '--deps',
          input.dependency,
          '--json'
        ],
        opts
      );
      if (r.code !== 0) {
        throw new Error(
          `bd create ${input.id} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
    },

    /**
     * ONE `bd update` carrying every field of a single logical transition
     * (metadata set/unset + status + notes lineage). The REVISE disposition
     * contract (dotfiles `docs/contracts/workflow.md`) requires the receipt
     * refresh, the notes lineage, the status return and the `blocked_reason`
     * clear to land in the SAME write: a split write can leave a bead
     * unblocked with a stale receipt, which the admission gate would then
     * admit as if the disposition had never happened.
     *
     * A non-zero exit throws, like every other mutator here.
     *
     * @param {string} bead_id
     * @param {{ set?: Record<string, string>, unset?: string[], status?: string, append_notes?: string }} input
     */
    async updateFields(bead_id, input) {
      /** @type {string[]} */
      const args = ['update', bead_id];
      for (const [key, value] of Object.entries(input.set || {})) {
        args.push('--set-metadata', `${key}=${value}`);
      }
      for (const key of input.unset || []) {
        args.push('--unset-metadata', key);
      }
      if (typeof input.status === 'string' && input.status.length > 0) {
        args.push('--status', input.status);
      }
      if (
        typeof input.append_notes === 'string' &&
        input.append_notes.length > 0
      ) {
        args.push('--append-notes', input.append_notes);
      }
      if (args.length === 2) {
        return;
      }
      const r = await run(args, opts);
      if (r.code !== 0) {
        throw new Error(
          `bd update ${bead_id} failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
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
     * A MALFORMED payload on a zero exit throws for the same reason
     * (implementation review 2026-07-26): skipping a selector whose rows are not
     * an array silently reduced the sweep to nothing and closed the parent over
     * its open leaves. The exit code and the payload shape are BOTH checked; an
     * empty array is the only thing that may mean "no children".
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
          throw new Error(
            `bd list ${selector.join(' ')} returned a non-array payload`
          );
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
    },

    /**
     * ONE whole-list scan serving both consumers of it:
     *   - `pr_rows` — every bead a normal session already delivered a PR for:
     *     `resolved` with a `metadata.pr_url` (UI-7agi §1). The source of the
     *     external PR registry.
     *   - `statuses` — every row's `id → status`, unfiltered. The queue sweep
     *     (UI-m6bg) needs an authoritative status per queued bead, and riding
     *     the response this call already makes is what satisfies its "no extra
     *     `bd` process per bead" requirement; a per-bead `bd show` would spawn
     *     one process for each waiting row on every poller pass.
     *
     * `--limit 0` is REQUIRED: bd's default listing stops at 50 rows, and a
     * silently truncated scan would make an external PR invisible in the lane
     * for no reason a reader could see. `--all` is required for the same class
     * of reason — the filter is done here, not by bd's default status view, and
     * the sweep's `closed` rows are exactly what the default view hides.
     *
     * Fail-closed like {@link listChildren}: a non-zero exit or a non-array
     * payload THROWS rather than reading as "no external PRs", which would
     * silently empty the lane every time bd is unavailable. The sweep depends on
     * the same throw — an unread status must move nothing.
     *
     * @returns {Promise<{ pr_rows: { bead_id: string, pr_url: string }[], statuses: Record<string, string>, generation?: number, fresh?: boolean }>}
     */
    async scanBeads() {
      if (requestSnapshot) {
        const snapshot_result = await requestSnapshot(
          cwd || '',
          'worker-external'
        );
        if (!snapshot_result || !snapshot_result.ok || snapshot_result.stale) {
          throw new Error('workspace snapshot is unavailable');
        }
        const snapshot = snapshot_result.snapshot;
        if (!snapshot || !Array.isArray(snapshot.all)) {
          throw new Error('workspace snapshot returned a non-array payload');
        }
        return {
          ...scanRows(snapshot.all),
          generation:
            typeof snapshot.generation === 'number' ? snapshot.generation : 0,
          fresh: snapshot_result.fresh !== false
        };
      }
      const r = await runJson(
        ['list', '--json', '--all', '--limit', '0'],
        opts
      );
      if (r && typeof r.code === 'number' && r.code !== 0) {
        throw new Error(
          `bd list --all failed (${r.code}): ${(r.stderr || '').trim()}`
        );
      }
      const rows = r && r.stdoutJson;
      if (!Array.isArray(rows)) {
        throw new Error('bd list --all returned a non-array payload');
      }
      return scanRows(rows);
    }
  };
}

/**
 * Project external PR rows and the closed-sweep status map from one successful
 * whole-workspace generation.
 *
 * @param {unknown[]} rows
 * @returns {{ pr_rows: { bead_id: string, pr_url: string }[], statuses: Record<string, string> }}
 */
function scanRows(rows) {
  /** @type {{ bead_id: string, pr_url: string }[]} */
  const pr_rows = [];
  /** @type {Record<string, string>} */
  const statuses = {};
  for (const raw of rows) {
    if (!raw || typeof raw !== 'object') {
      continue;
    }
    const row = /** @type {Record<string, unknown>} */ (raw);
    if (typeof row.id !== 'string' || row.id.length === 0) {
      continue;
    }
    if (typeof row.status === 'string' && row.status.length > 0) {
      statuses[row.id] = row.status;
    }
    if (row.status !== 'resolved') {
      continue;
    }
    const md = row.metadata;
    const pr_url =
      md && typeof md === 'object'
        ? /** @type {Record<string, unknown>} */ (md).pr_url
        : undefined;
    if (typeof pr_url !== 'string' || pr_url.length === 0) {
      continue;
    }
    pr_rows.push({ bead_id: row.id, pr_url });
  }
  return { pr_rows, statuses };
}
