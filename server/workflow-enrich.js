/**
 * Workflow enrichment for board/detail issue shaping.
 *
 * Given a bd issue (its `metadata` + `status`) and the workspace root, this
 * module parses the spec/impl review receipts, computes `spec_stale`/`impl_stale`
 * booleans via git, and produces a compact `workflow` object consumed by the
 * board card stepper/chips. All git access is fail-quiet: any error, missing
 * sha, or missing path yields `stale=false` (undetermined — never crash, never
 * mark stale spuriously).
 *
 * Stale rules (spec §4):
 *  - spec_review stale  iff `git log <sha>..HEAD -- <spec_id path>` is non-empty
 *    (only spec-doc follow-up commits cause stale; unrelated commits don't).
 *  - impl_review stale  iff current HEAD != receipt sha.
 *
 * Receipt format: `<reviewer>@<40hexsha>` or `skipped@<40hexsha>`.
 */
import { execFileSync } from 'node:child_process';
import { debug } from './logging.js';

const log = debug('workflow-enrich');

/** `<reviewer>@<sha>` — reviewer is a token, sha is 7-40 hex chars. */
const RECEIPT_RE = /^([A-Za-z0-9_.:-]+)@([0-9a-fA-F]{7,40})$/;

/** Strict plan-receipt: reviewer EXACTLY `user`, sha EXACTLY 40 hex. */
const PLAN_RECEIPT_RE = /^user@([0-9a-fA-F]{40})$/;

/**
 * Cache of `git log` staleness probes keyed by `<head>\0<sha>\0<path>`.
 * Keyed on HEAD so an advancing HEAD naturally invalidates prior results and
 * repeated cards in one render never re-shell for the same (sha, path).
 *
 * @type {Map<string, boolean>}
 */
const stale_cache = new Map();
const STALE_CACHE_CAP = 5000;

/**
 * @typedef {Object} ParsedReceipt
 * @property {string} reviewer - Reviewer token (e.g. `codex`, `opus`, `skipped`).
 * @property {string} sha - Commit sha the receipt was issued against.
 * @property {boolean} is_skip - True when the receipt is a skip (`skipped@...`).
 */

/**
 * Parse a review-receipt string into its parts.
 *
 * @param {unknown} value
 * @returns {ParsedReceipt | null}
 */
export function parseReceipt(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const m = RECEIPT_RE.exec(value.trim());
  if (!m) {
    return null;
  }
  const reviewer = m[1];
  return { reviewer, sha: m[2], is_skip: reviewer === 'skipped' };
}

/**
 * Strict plan-receipt validation (spec §변경 1). The general {@link parseReceipt}
 * accepts any reviewer token and a 7-40 hex sha, so it would let `codex@<short>`
 * earn authorization. A plan approval is valid ONLY when the reviewer is exactly
 * `user` AND the sha is exactly 40 hex — plan has no skip path, so `skipped@...`,
 * any other reviewer, a short sha, and a parse failure are all invalid.
 *
 * @param {unknown} value
 * @returns {{ sha: string } | null}
 */
export function parsePlanReceipt(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const m = PLAN_RECEIPT_RE.exec(value.trim());
  return m ? { sha: m[1] } : null;
}

/**
 * Run a git command fail-quiet. Returns stdout string, or null on any error.
 *
 * @param {string} cwd
 * @param {string[]} args
 * @returns {string | null}
 */
function runGit(cwd, args) {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore']
    });
  } catch (err) {
    log('git %o failed in %s: %o', args, cwd, err);
    return null;
  }
}

/**
 * Current HEAD sha of the workspace, or null (fail-quiet).
 *
 * @param {string | undefined | null} workspace_root
 * @returns {string | null}
 */
export function gitHead(workspace_root) {
  if (!workspace_root) {
    return null;
  }
  const out = runGit(workspace_root, ['rev-parse', 'HEAD']);
  return out ? out.trim() : null;
}

/**
 * Core staleness probe: did `path` change between `sha` and `head`?
 *   - `true`  → changed (git log non-empty)
 *   - `false` → unchanged (git log empty)
 *   - `null`  → git error / missing input (undetermined)
 * Cache-backed on `<head>\0<sha>\0<path>` (HEAD-keyed, so an advancing HEAD
 * invalidates prior results). Only definitive results are cached.
 *
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head
 * @param {string} sha
 * @param {string} path
 * @returns {boolean | null}
 */
function pathChangedSinceOrNull(workspace_root, head, sha, path) {
  if (!workspace_root || !head || !sha || !path) {
    return null;
  }
  const key = `${head}\x00${sha}\x00${path}`;
  const cached = stale_cache.get(key);
  if (cached !== undefined) {
    return cached;
  }
  const out = runGit(workspace_root, ['log', `${sha}..HEAD`, '--', path]);
  if (out === null) {
    return null;
  }
  const changed = out.trim().length > 0;
  if (stale_cache.size >= STALE_CACHE_CAP) {
    stale_cache.clear();
  }
  stale_cache.set(key, changed);
  return changed;
}

/**
 * True when `path` changed between `sha` and `head` (non-empty git log).
 * Fail-quiet: any missing input or git error yields false.
 *
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head
 * @param {string} sha
 * @param {string} path
 * @returns {boolean}
 */
function pathChangedSince(workspace_root, head, sha, path) {
  return pathChangedSinceOrNull(workspace_root, head, sha, path) === true;
}

/**
 * Worktree-dirty probe for `path`: `git status --porcelain -- <path>` non-empty.
 * Deliberately BYPASSES stale_cache — an uncommitted overwrite is invisible to
 * `git log`, so this must re-check every call. Returns null on git error.
 *
 * @param {string | undefined | null} workspace_root
 * @param {string} path
 * @returns {boolean | null}
 */
function pathDirty(workspace_root, path) {
  if (!workspace_root || !path) {
    return null;
  }
  const out = runGit(workspace_root, ['status', '--porcelain', '--', path]);
  if (out === null) {
    return null;
  }
  return out.trim().length > 0;
}

/**
 * Plan-review freshness (spec §변경 1) — 3-state. `fresh` requires BOTH:
 *   1. `git log <sha>..HEAD -- <plan_path>` empty (no post-receipt commit), AND
 *   2. `git status --porcelain -- <plan_path>` empty (worktree clean — catches
 *      an uncommitted overwrite that condition 1 cannot see).
 * Any git error or missing input yields `unknown`. Consumers differ: the runner
 * guard is fail-closed (only `fresh` authorizes), planStage is fail-quiet (only
 * `stale` downgrades; `unknown` stays reviewed).
 *
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head
 * @param {string} sha
 * @param {string} plan_path
 * @returns {'fresh' | 'stale' | 'unknown'}
 */
export function planFreshness(workspace_root, head, sha, plan_path) {
  if (!workspace_root || !head || !sha || !plan_path) {
    return 'unknown';
  }
  const dirty = pathDirty(workspace_root, plan_path);
  if (dirty === null) {
    return 'unknown';
  }
  if (dirty) {
    return 'stale';
  }
  const changed = pathChangedSinceOrNull(workspace_root, head, sha, plan_path);
  if (changed === null) {
    return 'unknown';
  }
  return changed ? 'stale' : 'fresh';
}

/**
 * @param {Record<string, any>} md - issue metadata
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head - precomputed HEAD (avoids re-shelling per issue)
 * @returns {{ spec_stale: boolean, impl_stale: boolean, spec_receipt: ParsedReceipt | null, impl_receipt: ParsedReceipt | null }}
 */
function computeStaleWithHead(md, workspace_root, head) {
  const spec_receipt = parseReceipt(md.spec_review);
  const impl_receipt = parseReceipt(md.impl_review);
  const spec_stale =
    !!spec_receipt &&
    !spec_receipt.is_skip &&
    typeof md.spec_id === 'string' &&
    pathChangedSince(workspace_root, head, spec_receipt.sha, md.spec_id);
  const impl_stale =
    !!impl_receipt &&
    !impl_receipt.is_skip &&
    !!head &&
    head !== impl_receipt.sha;
  return { spec_stale, impl_stale, spec_receipt, impl_receipt };
}

/**
 * Compute `spec_stale` / `impl_stale` for one issue's metadata.
 *
 * @param {Record<string, any> | null | undefined} metadata
 * @param {string | undefined | null} workspace_root
 * @returns {{ spec_stale: boolean, impl_stale: boolean }}
 */
export function computeStale(metadata, workspace_root) {
  const md = metadata || {};
  const head = gitHead(workspace_root);
  const { spec_stale, impl_stale } = computeStaleWithHead(
    md,
    workspace_root,
    head
  );
  return { spec_stale, impl_stale };
}

/**
 * Derive the route ('spec_backed' | 'full_plan') from metadata.
 *
 * @param {Record<string, any>} md
 * @returns {'spec_backed' | 'full_plan'}
 */
function deriveRoute(md) {
  if (md.route === 'full_plan') {
    return 'full_plan';
  }
  if (md.route === 'spec_backed') {
    return 'spec_backed';
  }
  return md.plan_path ? 'full_plan' : 'spec_backed';
}

/**
 * Extract the numeric PR number from a pr_url, or null.
 *
 * @param {unknown} pr_url
 * @returns {number | null}
 */
function parsePrNumber(pr_url) {
  if (typeof pr_url !== 'string') {
    return null;
  }
  const slug = /(?:pull|pulls|merge_requests|issues)\/(\d+)/.exec(pr_url);
  if (slug) {
    return Number(slug[1]);
  }
  const hash = /#(\d+)/.exec(pr_url);
  if (hash) {
    return Number(hash[1]);
  }
  const tail = /(\d+)\/?$/.exec(pr_url.trim());
  return tail ? Number(tail[1]) : null;
}

/**
 * @typedef {Object} WorkflowStage
 * @property {'empty'|'dim'|'on'|'reviewed'|'skip'|'stale'} state
 * @property {string | null} receipt - Raw receipt string (spec/impl only).
 * @property {boolean} stale
 */

/**
 * Compute the SPEC stage state.
 *
 * @param {Record<string, any>} md
 * @param {ParsedReceipt | null} receipt
 * @param {boolean} stale
 * @returns {WorkflowStage}
 */
function specStage(md, receipt, stale) {
  const raw = typeof md.spec_review === 'string' ? md.spec_review : null;
  if (!md.spec_id) {
    return { state: 'empty', receipt: raw, stale: false };
  }
  if (receipt) {
    if (receipt.is_skip) {
      return { state: 'skip', receipt: raw, stale: false };
    }
    return { state: stale ? 'stale' : 'reviewed', receipt: raw, stale };
  }
  return { state: 'dim', receipt: raw, stale: false };
}

/**
 * Compute the PLAN stage state (full_plan route only, spec §변경 4). Symmetric
 * to {@link specStage}, but plan approval has NO skip path: only a strict
 * `user@<40hex>` receipt is an approval, its freshness is 3-state, and — fail-
 * quiet like the rest of this module — only `stale` downgrades (`unknown` stays
 * reviewed). A present-but-invalid receipt is NOT an approval (shown pending,
 * raw receipt exposed); an absent receipt on a resolved/closed bead is a legacy
 * approval.
 *
 * @param {Record<string, any>} md
 * @param {string} status
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head
 * @returns {WorkflowStage}
 */
function planStage(md, status, workspace_root, head) {
  const raw = typeof md.plan_review === 'string' ? md.plan_review : null;
  if (!md.plan_path) {
    return { state: 'empty', receipt: raw, stale: false };
  }
  if (md.plan_review != null) {
    const receipt = parsePlanReceipt(md.plan_review);
    if (!receipt) {
      return { state: 'dim', receipt: raw, stale: false };
    }
    const stale =
      planFreshness(workspace_root, head, receipt.sha, md.plan_path) ===
      'stale';
    return { state: stale ? 'stale' : 'reviewed', receipt: raw, stale };
  }
  if (status === 'resolved' || status === 'closed') {
    return { state: 'on', receipt: null, stale: false };
  }
  return { state: 'dim', receipt: null, stale: false };
}

/**
 * Compute the IMPL stage state.
 *
 * @param {Record<string, any>} md
 * @param {string} status
 * @param {ParsedReceipt | null} receipt
 * @param {boolean} stale
 * @returns {WorkflowStage}
 */
function implStage(md, status, receipt, stale) {
  const raw = typeof md.impl_review === 'string' ? md.impl_review : null;
  if (receipt) {
    if (receipt.is_skip) {
      return { state: 'skip', receipt: raw, stale: false };
    }
    return { state: stale ? 'stale' : 'reviewed', receipt: raw, stale };
  }
  const started =
    status === 'in_progress' ||
    status === 'resolved' ||
    status === 'closed' ||
    !!md.pr_url;
  return { state: started ? 'dim' : 'empty', receipt: raw, stale: false };
}

/**
 * Compute the MERGE stage state.
 *
 * @param {Record<string, any>} md
 * @param {string} status
 * @returns {WorkflowStage}
 */
function mergeStage(md, status) {
  if (status === 'closed') {
    return { state: 'on', receipt: null, stale: false };
  }
  if (md.pr_url && status === 'resolved') {
    return { state: 'dim', receipt: null, stale: false };
  }
  return { state: 'empty', receipt: null, stale: false };
}

/**
 * @typedef {Object} WorkflowSummary
 * @property {'spec_backed'|'full_plan'} route
 * @property {{ spec: WorkflowStage, plan?: WorkflowStage, impl: WorkflowStage, pr: WorkflowStage, merge: WorkflowStage }} stages
 * @property {{ route: 'spec_backed'|'full_plan', fast_track: boolean, pr: { number: number | null } | null }} chips
 */

/**
 * Build the compact `workflow` summary for one issue.
 *
 * @param {{ status?: string, metadata?: Record<string, any> }} issue
 * @param {string | undefined | null} workspace_root
 * @param {string | null} [head] - Optional precomputed HEAD.
 * @returns {WorkflowSummary}
 */
export function enrichIssueWorkflow(issue, workspace_root, head = undefined) {
  const md = (issue && issue.metadata) || {};
  const status = String((issue && issue.status) || 'open');
  const resolved_head = head === undefined ? gitHead(workspace_root) : head;
  const { spec_stale, impl_stale, spec_receipt, impl_receipt } =
    computeStaleWithHead(md, workspace_root, resolved_head);

  const route = deriveRoute(md);

  /** @type {WorkflowSummary['stages']} */
  const stages = {
    spec: specStage(md, spec_receipt, spec_stale),
    impl: implStage(md, status, impl_receipt, impl_stale),
    pr: {
      state: md.pr_url ? 'on' : 'empty',
      receipt: null,
      stale: false
    },
    merge: mergeStage(md, status)
  };
  if (route === 'full_plan') {
    stages.plan = planStage(md, status, workspace_root, resolved_head);
  }

  return {
    route,
    stages,
    chips: {
      route,
      fast_track: md.workflow_mode === 'fast_track',
      pr: md.pr_url ? { number: parsePrNumber(md.pr_url) } : null
    }
  };
}

/**
 * Enrich a list of issues with a compact `workflow` object. HEAD is resolved
 * once per call and shared across issues; failures never break shaping.
 *
 * @param {Array<{ status?: string, metadata?: Record<string, any> } & Record<string, any>>} issues
 * @param {string | undefined | null} workspace_root
 * @returns {any[]}
 */
export function enrichIssuesWorkflow(issues, workspace_root) {
  if (!Array.isArray(issues)) {
    return /** @type {any} */ (issues);
  }
  const head = gitHead(workspace_root);
  return issues.map((it) => {
    try {
      return {
        ...it,
        workflow: enrichIssueWorkflow(it, workspace_root, head)
      };
    } catch (err) {
      log('enrichIssueWorkflow failed for %o: %o', it && it.id, err);
      return it;
    }
  });
}

/**
 * Test-only: clear the module-level staleness cache.
 */
export function _clearStaleCache() {
  stale_cache.clear();
}
