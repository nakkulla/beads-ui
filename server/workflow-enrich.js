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
 * Stale rules (spec §5):
 *  - spec_review stale  iff `git log <sha>..HEAD -- <spec_id path>` is non-empty
 *    (only spec-doc follow-up commits cause stale; unrelated commits don't).
 *  - impl_review stale  iff the Bead's own branch tip moved past the receipt sha
 *    ({@link implFreshness}) — the impl gate is issued on a worktree branch tip
 *    that squash-merge keeps out of base history, so a HEAD comparison is
 *    permanently true and cannot be used.
 * A `skipped@` receipt is NOT exempt from either probe: the contract defines a
 * refresh procedure for skip-origin receipts, so skip can go stale too.
 *
 * Receipt format: `<reviewer>@<40hexsha>` or `skipped@<40hexsha>`.
 */
import { execFileSync } from 'node:child_process';
import { debug } from './logging.js';

const log = debug('workflow-enrich');

/** `<reviewer>@<sha>` — reviewer is a token, sha is 7-40 hex chars. */
const RECEIPT_RE = /^([A-Za-z0-9_.:-]+)@([0-9a-fA-F]{7,40})$/;

/**
 * Strict plan-receipt: reviewer EXACTLY `user`/`triage`/`codex`, sha EXACTLY
 * 40 hex. `user@` is the normal approval; `triage@`/`codex@` are the worker
 * autorun stale-lane refresh tokens (`docs/contracts/workflow.md`).
 */
const PLAN_RECEIPT_RE = /^(user|triage|codex)@([0-9a-fA-F]{40})$/;

/**
 * Reviewer tokens the workflow contract enumerates as review evidence
 * (`docs/contracts/workflow.md:115`). beads-ui consumes that enumeration rather
 * than inferring it: a token outside this set and outside `skipped` earns no
 * glyph at all (fail-quiet), so `user@` and typos never pose as review evidence.
 *
 * @type {Set<string>}
 */
const REVIEW_REVIEWER_TOKENS = new Set([
  'codex',
  'opus',
  'fable',
  'self',
  'triage'
]);

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
 * Strict plan-receipt validation (spec §5.3). The general {@link parseReceipt}
 * accepts any reviewer token and a 7-40 hex sha, so it would let `codex@<short>`
 * earn authorization. A plan approval is valid ONLY when the reviewer is exactly
 * `user`/`triage`/`codex` AND the sha is exactly 40 hex — plan has no skip path,
 * so `skipped@...`, any other reviewer, a short sha, and a parse failure are all
 * invalid.
 *
 * @param {unknown} value
 * @returns {ParsedReceipt | null}
 */
export function parsePlanReceipt(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const m = PLAN_RECEIPT_RE.exec(value.trim());
  return m ? { reviewer: m[1], sha: m[2], is_skip: false } : null;
}

/**
 * Map a parsed receipt to its card glyph (spec §2), following the contract's
 * split exactly: enumerated reviewer tokens are review evidence (`✓`), only
 * `skipped@` is authority without review (`⊘`), and anything else — absent
 * receipt, `user@`, a typo — gets no glyph. Stage-agnostic by construction; the
 * caller decides which receipts are valid enough to classify at all.
 *
 * @param {ParsedReceipt | null | undefined} receipt
 * @returns {'review' | 'skip' | null}
 */
export function classifyGlyph(receipt) {
  if (!receipt || typeof receipt.reviewer !== 'string') {
    return null;
  }
  if (receipt.is_skip) {
    return 'skip';
  }
  return REVIEW_REVIEWER_TOKENS.has(receipt.reviewer) ? 'review' : null;
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
 * Impl-review freshness (spec §5.1) — 3-state, keyed on the Bead's OWN branch.
 * The impl gate is issued at the worktree branch tip, and this repo squash-
 * merges, so that sha can never enter base history: the old `HEAD !== sha`
 * comparison was permanently true. The branch name is fixed by the workflow
 * contract (worktree basename == branch == Bead ID).
 *
 *   branch tip == receipt sha            → `fresh`
 *   receipt sha is an ancestor of tip    → `stale` (post-review commits landed)
 *   no branch / missing input / git error → `unknown`
 *
 * The equality test normalizes case and accepts an abbreviated receipt sha as a
 * prefix of the tip, because `parseReceipt` allows 7-40 hex in either case.
 * Without that, a receipt written at the tip in short or upper-case form would
 * miss equality and then reach `merge-base --is-ancestor`, which is reflexive —
 * the unchanged tip would report `stale`.
 *
 * Deliberately NOT `git branch --points-at`/`--contains`: a global search
 * misjudges both ways — an unrelated branch parked on the receipt sha reads
 * fresh while the real impl branch has advanced, and a surviving descendant
 * branch reads stale after the impl branch is deleted.
 *
 * Deliberately NOT cached: `stale_cache` is HEAD-keyed, and committing in a
 * worktree never moves the shared checkout's HEAD, so a cache could not see a
 * branch tip move (same reason `pathDirty` bypasses it).
 *
 * @param {string | undefined | null} workspace_root
 * @param {string} receipt_sha
 * @param {string | undefined | null} bead_id
 * @returns {'fresh' | 'stale' | 'unknown'}
 */
export function implFreshness(workspace_root, receipt_sha, bead_id) {
  if (!workspace_root || !receipt_sha || !bead_id) {
    return 'unknown';
  }
  const out = runGit(workspace_root, [
    'rev-parse',
    '--verify',
    '--quiet',
    `refs/heads/${bead_id}`
  ]);
  const tip = out ? out.trim().toLowerCase() : '';
  if (!tip) {
    return 'unknown';
  }
  const receipt = receipt_sha.toLowerCase();
  if (tip === receipt || tip.startsWith(receipt)) {
    return 'fresh';
  }
  // Exit 0 = ancestor; exit 1 (and any error) is caught by runGit as null.
  const ancestor = runGit(workspace_root, [
    'merge-base',
    '--is-ancestor',
    receipt_sha,
    tip
  ]);
  return ancestor === null ? 'unknown' : 'stale';
}

/**
 * @param {Record<string, any>} md - issue metadata
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head - precomputed HEAD (avoids re-shelling per issue)
 * @param {string | undefined | null} bead_id - issue id (impl branch name)
 * @returns {{ spec_stale: boolean, impl_stale: boolean, spec_receipt: ParsedReceipt | null, impl_receipt: ParsedReceipt | null }}
 */
function computeStaleWithHead(md, workspace_root, head, bead_id) {
  const spec_receipt = parseReceipt(md.spec_review);
  const impl_receipt = parseReceipt(md.impl_review);
  const spec_stale =
    !!spec_receipt &&
    typeof md.spec_id === 'string' &&
    pathChangedSince(workspace_root, head, spec_receipt.sha, md.spec_id);
  const impl_stale =
    !!impl_receipt &&
    implFreshness(workspace_root, impl_receipt.sha, bead_id) === 'stale';
  return { spec_stale, impl_stale, spec_receipt, impl_receipt };
}

/**
 * Compute `spec_stale` / `impl_stale` for one issue's metadata.
 *
 * @param {Record<string, any> | null | undefined} metadata
 * @param {string | undefined | null} workspace_root
 * @param {string | undefined | null} [bead_id] - issue id (impl branch name)
 * @returns {{ spec_stale: boolean, impl_stale: boolean }}
 */
export function computeStale(metadata, workspace_root, bead_id = null) {
  const md = metadata || {};
  const head = gitHead(workspace_root);
  const { spec_stale, impl_stale } = computeStaleWithHead(
    md,
    workspace_root,
    head,
    bead_id
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
 * Exported for the worker's external PR registry (UI-7agi §1), which resolves a
 * `metadata.pr_url` into the same PR number the board already derives — one
 * parser, so a url the board renders as `#N` can never resolve to a different
 * PR in the merge lane.
 *
 * @param {unknown} pr_url
 * @returns {number | null}
 */
export function parsePrNumber(pr_url) {
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
 * One stepper cell on three independent axes (spec §3): the glyph is the
 * contract's (review evidence vs skip), the fill and freshness are beads-ui's.
 *
 * @typedef {Object} WorkflowStage
 * @property {'none'|'dim'|'full'} fill
 * @property {'review'|'skip'|null} glyph
 * @property {boolean} stale
 * @property {string | null} receipt - Raw receipt string (spec/plan/impl only).
 */

/**
 * Assemble a stage, applying the one cross-axis rule: `stale` downgrades the
 * fill to `dim` (spec §3.1). Holds the invariant every consumer relies on — a
 * `dim` cell either has no glyph or is a downgraded one.
 *
 * @param {'none'|'dim'|'full'} fill
 * @param {'review'|'skip'|null} glyph
 * @param {boolean} stale
 * @param {string | null} receipt
 * @returns {WorkflowStage}
 */
function makeStage(fill, glyph, stale, receipt) {
  return { fill: stale ? 'dim' : fill, glyph, stale, receipt };
}

/**
 * Compute the SPEC stage (spec §4).
 *
 * @param {Record<string, any>} md
 * @param {ParsedReceipt | null} receipt
 * @param {boolean} stale
 * @returns {WorkflowStage}
 */
function specStage(md, receipt, stale) {
  const raw = typeof md.spec_review === 'string' ? md.spec_review : null;
  if (!md.spec_id) {
    return makeStage('none', null, false, raw);
  }
  if (!receipt) {
    return makeStage('dim', null, false, raw);
  }
  return makeStage('full', classifyGlyph(receipt), stale, raw);
}

/**
 * Compute the PLAN stage (full_plan route only, spec §4/§5.3). Symmetric to
 * {@link specStage}, but plan approval has NO skip path: only a strict
 * `user|triage|codex@<40hex>` receipt is an approval, its freshness is 3-state,
 * and — fail-quiet like the rest of this module — only `stale` downgrades
 * (`unknown` stays approved). A present-but-invalid receipt is NOT an approval
 * (shown pending, raw receipt exposed); an absent receipt on a resolved/closed
 * bead is a legacy approval.
 *
 * Only a receipt this stage accepts is handed to {@link classifyGlyph} (spec
 * §3.1). Otherwise `plan_review = skipped@...` would render a `⊘` on a `dim`
 * cell — "in progress, review skipped" — and enter the blink candidacy.
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
    return makeStage('none', null, false, raw);
  }
  if (Object.hasOwn(md, 'plan_review')) {
    // Presence via hasOwn: a present non-string/null value is an INVALID
    // receipt (pending), never key-absence — key-absence is what legitimizes
    // the legacy branch below.
    const receipt = parsePlanReceipt(md.plan_review);
    if (!receipt) {
      return makeStage('dim', null, false, raw);
    }
    const stale =
      planFreshness(workspace_root, head, receipt.sha, md.plan_path) ===
      'stale';
    return makeStage('full', classifyGlyph(receipt), stale, raw);
  }
  if (status === 'resolved' || status === 'closed') {
    return makeStage('full', null, false, null);
  }
  return makeStage('dim', null, false, null);
}

/**
 * Compute the IMPL stage (spec §4/§4.1). A receipt-less `resolved`/`closed`
 * bead fills too: `resolved` is itself the fact that impl finished. It carries
 * no glyph, so it stays distinguishable from a reviewed impl (`✓`).
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
    return makeStage('full', classifyGlyph(receipt), stale, raw);
  }
  if (status === 'resolved' || status === 'closed') {
    return makeStage('full', null, false, raw);
  }
  const started = status === 'in_progress' || !!md.pr_url;
  return makeStage(started ? 'dim' : 'none', null, false, raw);
}

/**
 * Compute the MERGE stage (spec §4).
 *
 * @param {Record<string, any>} md
 * @param {string} status
 * @returns {WorkflowStage}
 */
function mergeStage(md, status) {
  if (status === 'closed') {
    return makeStage('full', null, false, null);
  }
  if (md.pr_url && status === 'resolved') {
    return makeStage('dim', null, false, null);
  }
  return makeStage('none', null, false, null);
}

/**
 * @typedef {Object} WorkflowSummary
 * @property {'spec_backed'|'full_plan'} route
 * @property {'explicit'|'derived'} route_source - Whether the route came from
 * pinned metadata or the deriveRoute fallback (display distinguishes the
 * two — a derived value must not read as a settled pin).
 * @property {{ spec: WorkflowStage, plan?: WorkflowStage, impl: WorkflowStage, pr: WorkflowStage, merge: WorkflowStage }} stages
 * @property {{ route: 'spec_backed'|'full_plan', route_source: 'explicit'|'derived', fast_track: boolean, pr: { number: number | null } | null }} chips
 */

/**
 * Build the compact `workflow` summary for one issue.
 *
 * @param {{ id?: string, status?: string, metadata?: Record<string, any> }} issue
 * @param {string | undefined | null} workspace_root
 * @param {string | null} [head] - Optional precomputed HEAD.
 * @returns {WorkflowSummary}
 */
export function enrichIssueWorkflow(issue, workspace_root, head = undefined) {
  const md = (issue && issue.metadata) || {};
  const status = String((issue && issue.status) || 'open');
  const bead_id = (issue && issue.id) || null;
  const resolved_head = head === undefined ? gitHead(workspace_root) : head;
  const { spec_stale, impl_stale, spec_receipt, impl_receipt } =
    computeStaleWithHead(md, workspace_root, resolved_head, bead_id);

  const route = deriveRoute(md);
  // Explicit only when the metadata pin itself is a valid enum value — any
  // fallback (absence, invalid value, plan_path inference) is 'derived'.
  const route_source =
    md.route === 'spec_backed' || md.route === 'full_plan'
      ? 'explicit'
      : 'derived';

  /** @type {WorkflowSummary['stages']} */
  const stages = {
    spec: specStage(md, spec_receipt, spec_stale),
    impl: implStage(md, status, impl_receipt, impl_stale),
    // pr is a binary fact; the wait-for-merge state lives in merge's `dim`
    // (spec §4.2), so this stage never uses `dim`.
    pr: makeStage(md.pr_url ? 'full' : 'none', null, false, null),
    merge: mergeStage(md, status)
  };
  if (route === 'full_plan') {
    stages.plan = planStage(md, status, workspace_root, resolved_head);
  }

  return {
    route,
    route_source,
    stages,
    chips: {
      route,
      route_source,
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
