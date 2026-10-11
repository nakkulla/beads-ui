/**
 * In-memory registry of EXTERNAL PRs — the PRs a normal session delivered
 * without ever passing through the worker scheduler (UI-7agi §1).
 *
 * A worker-dispatched bead reaches `pr_wait` because an attempt verified into
 * it; a bead the user finished in an ordinary session has no attempt at all, so
 * `queue.json` knows nothing about it. Its PR is nonetheless real and mergeable,
 * and the beads-ui merge click is a documented merge path for it — this registry
 * is what makes those beads visible to the same lane.
 *
 * DELIBERATELY NON-PERSISTENT and NEVER written into `queue.json`: the source of
 * truth is bd itself (`status=resolved` + `metadata.pr_url`), re-scanned on the
 * poller's cadence. Injecting a synthetic attempt into the durable queue would
 * make the worker's own records lie about what it ran.
 *
 * `added_at` is preserved across refreshes so a row keeps its lane position
 * instead of jumping every scan.
 */
import path from 'node:path';
import { foreignTargetFromMetadata } from './foreign-target.js';

/**
 * One external PR row.
 *
 * @typedef {Object} ExternalPrRow
 * @property {string} bead_id - The resolved bead carrying the PR.
 * @property {string} pr_url - `metadata.pr_url` as bd holds it.
 * @property {number|null} pr_number - Parsed PR number, or null when the url is
 * unparseable (the lane then renders the ordinary `pr_ref_unknown` state —
 * fail-quiet, never a guessed number).
 * @property {number} added_at - Epoch ms the row was FIRST seen.
 * @property {string|null} receipt_key - The cache key the scan compares to
 * decide whether the receipt observation below is still the one this bead's
 * metadata implies (UI-17mj §2.2). `null` when the scan carried no metadata.
 * @property {import('./receipt-check.js').ReceiptCheckResult|null}
 * receipt_check - The DISPLAY-ONLY receipt observation the scan made for an
 * external bead, which has no worker attempt to have recorded one. The merge
 * gate never reads it — the click path re-checks live.
 * @property {string|null} repo_slug - `OWNER/REPO` parsed from `pr_url`, or
 * null when the url names no repository.
 * @property {boolean} foreign - Whether `repo_slug` names a repository OTHER
 * than this workspace's origin (UI-lpg1). Every PR read in this workspace goes
 * through `gh --repo <origin>` by NUMBER, so a foreign url would be read as a
 * different PR that happens to share the number — and a MERGED reading of that
 * PR closed a bead whose own PR was still open. A foreign row stays visible
 * but yields no PR reference: nothing observes, merges, or cleans it up here.
 * A row whose Bead carries the enclosed foreign landing pins and whose url
 * names the pinned repository is NOT `foreign`: it has a `foreign_target`
 * instead, and the Worker observes, merges and closes it through that target
 * (UI-k467 §3.1). `foreign` now marks only the pin-less case.
 * @property {import('./foreign-target.js').ForeignPrTarget|null} [foreign_target]
 * - The pinned PR target the scan's pins and `pr_url` prove, or null.
 * @property {string|null} [foreign_error] - The contract token a pinned row's
 * detection failed with (`foreign_pr_repo_mismatch`,
 * `foreign_landing_unpinned:<key>`), or null.
 */

/**
 * The scan's judgment of one Bead's foreign PR target — kept for EVERY scanned
 * Bead, Worker-delivered `pr_wait` rows included, because the registry rows
 * above exclude a Bead the Worker owns while its observation still needs the
 * target (UI-k467 §3.1).
 *
 * @typedef {{ state: 'none' }|{ state: 'invalid', reason: string }|{ state: 'ok', target: import('./foreign-target.js').ForeignPrTarget }} ForeignTargetJudgment
 */

/**
 * `OWNER/REPO` a PR url names, or null. Only the path is read, so any host
 * works; a url without `/pull/<n>` after two path segments is not a PR url.
 *
 * @param {unknown} url
 * @returns {string|null}
 */
export function prRepoSlugFromUrl(url) {
  if (typeof url !== 'string') {
    return null;
  }
  const m = /^[a-z][a-z0-9+.-]*:\/\/[^/]+\/([^/]+)\/([^/]+)\/pull\/\d+/i.exec(
    url.trim()
  );
  return m ? `${m[1]}/${m[2]}` : null;
}

/**
 * Create the external PR registry. One instance is held process-wide by the
 * worker runtime so the scanner (writer) and the ws snapshot decoration +
 * PR poller (readers) share one view.
 *
 * @param {{ now?: () => number }} [options]
 */
export function createExternalPrStore(options = {}) {
  const now = options.now || (() => Date.now());

  /** @type {Map<string, Map<string, ExternalPrRow>>} */
  const by_workspace = new Map();
  /** @type {Map<string, Map<string, ForeignTargetJudgment>>} */
  const targets_by_workspace = new Map();
  /** @type {Map<string, Map<string, string>>} */
  const statuses_by_workspace = new Map();

  /**
   * Workspace keys are RESOLVED, exactly like the queue store's and the
   * observation cache's, so scanner and readers cannot end up on two keys for
   * one workspace.
   *
   * @param {string} workspace
   * @returns {Map<string, ExternalPrRow>}
   */
  function laneFor(workspace) {
    const key = path.resolve(String(workspace || ''));
    let lane = by_workspace.get(key);
    if (!lane) {
      lane = new Map();
      by_workspace.set(key, lane);
    }
    return lane;
  }

  return {
    /**
     * Replace a workspace's registry with the rows a scan just produced. The
     * whole set is replaced (not merged): a bead that left `resolved`, lost its
     * `pr_url`, or was closed must DISAPPEAR, and only a full replace can
     * express that.
     *
     * `added_at`, `receipt_key` and `receipt_check` are the three fields a
     * replace may CARRY OVER instead of overwriting: a caller that passes
     * `undefined` for one is saying "I did not observe this", and the prior
     * value stands (null on a brand-new row). Passing any other value —
     * including null — replaces it.
     *
     * `origin_slug` is this workspace's own `OWNER/REPO`; a row whose url
     * names another repository is marked `foreign`. With no resolvable origin
     * (null) no row is judged foreign — the PR read itself fails closed then,
     * because `gh --repo` cannot be derived either.
     *
     * A row may carry `foreign_pins` — the scan's metadata slice — so the
     * pinned target is judged with the url in the same pass.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, pr_url: string, pr_number: number|null, receipt_key?: string|null, receipt_check?: import('./receipt-check.js').ReceiptCheckResult|null, foreign_pins?: Record<string, unknown>|null }[]} rows
     * @param {{ origin_slug?: string|null }} [options]
     * @returns {ExternalPrRow[]}
     */
    replace(workspace, rows, options = {}) {
      // gh addresses an Enterprise origin as `HOST/OWNER/REPO`; only the
      // trailing `OWNER/REPO` is what a PR url carries.
      const origin_slug =
        typeof options.origin_slug === 'string' &&
        options.origin_slug.length > 0
          ? options.origin_slug.split('/').slice(-2).join('/').toLowerCase()
          : null;
      const lane = laneFor(workspace);
      /** @type {Map<string, ExternalPrRow>} */
      const next = new Map();
      for (const row of Array.isArray(rows) ? rows : []) {
        if (!row || typeof row.bead_id !== 'string' || !row.bead_id) {
          continue;
        }
        const prior = lane.get(row.bead_id);
        const repo_slug = prRepoSlugFromUrl(row.pr_url);
        const judged = foreignTargetFromMetadata(
          row.foreign_pins || null,
          row.pr_url
        );
        next.set(row.bead_id, {
          bead_id: row.bead_id,
          pr_url: typeof row.pr_url === 'string' ? row.pr_url : '',
          repo_slug,
          foreign:
            judged.state !== 'ok' &&
            origin_slug !== null &&
            repo_slug !== null &&
            repo_slug.toLowerCase() !== origin_slug,
          // Present only on a pinned row, so a pin-less row keeps its exact
          // shape (UI-k467 §4-11).
          ...(judged.state === 'ok' ? { foreign_target: judged.target } : {}),
          ...(judged.state === 'invalid'
            ? { foreign_error: judged.reason }
            : {}),
          pr_number:
            typeof row.pr_number === 'number' && Number.isFinite(row.pr_number)
              ? row.pr_number
              : null,
          added_at: prior ? prior.added_at : now(),
          receipt_key:
            row.receipt_key === undefined
              ? prior
                ? prior.receipt_key
                : null
              : row.receipt_key,
          receipt_check:
            row.receipt_check === undefined
              ? prior
                ? prior.receipt_check
                : null
              : row.receipt_check
        });
      }
      by_workspace.set(path.resolve(String(workspace || '')), next);
      return [...next.values()];
    },

    /**
     * A workspace's external rows, oldest first — a plain read, so the snapshot
     * decoration can call it freely.
     *
     * @param {string} workspace
     * @returns {ExternalPrRow[]}
     */
    list(workspace) {
      return [...laneFor(workspace).values()].sort(
        (a, b) => a.added_at - b.added_at
      );
    },

    /**
     * One row, or null.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {ExternalPrRow|null}
     */
    get(workspace, bead_id) {
      return laneFor(workspace).get(bead_id) || null;
    },

    /**
     * Retire ONE row ahead of the next scan (UI-wwby §1).
     *
     * The registry is replaced wholesale every poller tick, so a bead whose
     * cleanup just succeeded is already destined to disappear from it — this
     * only brings that conclusion forward by up to one scan period. The stale
     * window in between is what let a `done` bead come back as an external row.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {boolean} Whether a row was actually removed.
     */
    drop(workspace, bead_id) {
      if (typeof bead_id !== 'string' || bead_id.length === 0) {
        return false;
      }
      return laneFor(workspace).delete(bead_id);
    },

    /**
     * Replace a workspace's foreign target judgments from one whole scan —
     * every `resolved` Bead with a `pr_url`, Worker-owned ones included.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, pr_url: string, metadata?: Record<string, unknown>|null }[]} scan_rows
     */
    replaceTargets(workspace, scan_rows) {
      /** @type {Map<string, ForeignTargetJudgment>} */
      const next = new Map();
      for (const row of Array.isArray(scan_rows) ? scan_rows : []) {
        if (!row || typeof row.bead_id !== 'string' || !row.bead_id) {
          continue;
        }
        next.set(
          row.bead_id,
          foreignTargetFromMetadata(row.metadata || null, row.pr_url)
        );
      }
      targets_by_workspace.set(path.resolve(String(workspace || '')), next);
    },

    /**
     * One Bead's foreign target judgment from the last scan, or null when the
     * scan did not carry it (not `resolved`, no `pr_url`, or never scanned).
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {ForeignTargetJudgment|null}
     */
    targetOf(workspace, bead_id) {
      return (
        targets_by_workspace
          .get(path.resolve(String(workspace || '')))
          ?.get(bead_id) || null
      );
    },

    /**
     * Replace a workspace's bead statuses from one whole scan (UI-0d9i §3.4).
     * The PR 대기 projection hides a row whose Bead reads `deferred` here; the
     * same `bd list` generation the closed sweep reads is the only writer
     * besides {@link noteStatus}, so no second bd call feeds the projection.
     *
     * @param {string} workspace
     * @param {Record<string, string>} statuses - Bead id to bd status.
     */
    replaceStatuses(workspace, statuses) {
      /** @type {Map<string, string>} */
      const next = new Map();
      for (const [bead_id, status] of Object.entries(statuses || {})) {
        if (typeof status === 'string' && status.length > 0) {
          next.set(bead_id, status);
        }
      }
      statuses_by_workspace.set(path.resolve(String(workspace || '')), next);
    },

    /**
     * Record one Bead's status a write's readback just confirmed, so the
     * projection follows a defer or revive before the next scan does.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @param {string} status
     */
    noteStatus(workspace, bead_id, status) {
      if (typeof status !== 'string' || status.length === 0) {
        return;
      }
      const key = path.resolve(String(workspace || ''));
      let lane = statuses_by_workspace.get(key);
      if (!lane) {
        lane = new Map();
        statuses_by_workspace.set(key, lane);
      }
      lane.set(bead_id, status);
    },

    /**
     * Forget one Bead's status when a write landed but its readback could not
     * confirm it, so a reader asks bd again instead of trusting the stale
     * value until the next scan.
     *
     * @param {string} workspace
     * @param {string} bead_id
     */
    forgetStatus(workspace, bead_id) {
      statuses_by_workspace
        .get(path.resolve(String(workspace || '')))
        ?.delete(bead_id);
    },

    /**
     * One Bead's last known status, or null when no scan or readback read it.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {string|null}
     */
    statusOf(workspace, bead_id) {
      return (
        statuses_by_workspace
          .get(path.resolve(String(workspace || '')))
          ?.get(bead_id) || null
      );
    },

    /**
     * Drop everything (server restart semantics; test hook).
     */
    clear() {
      by_workspace.clear();
      targets_by_workspace.clear();
      statuses_by_workspace.clear();
    }
  };
}
