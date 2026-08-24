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
 *  - impl_review stale  iff the receipt sha is NOT an ancestor of the Bead's own
 *    branch tip ({@link implFreshness}) — the impl gate is issued on a worktree
 *    branch tip that squash-merge keeps out of base history, so a HEAD
 *    comparison is permanently true and cannot be used.
 * A `skipped@` receipt is NOT exempt from either probe: the contract defines a
 * refresh procedure for skip-origin receipts, so skip can go stale too.
 *
 * Receipt format: `<reviewer>@<40hexsha>` or `skipped@<40hexsha>`.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import { debug } from './logging.js';
import { resolveRealpathWithinDocs } from './path-safety.js';
import { resolveSpecEvidence, resolveSpecId } from './spec-id.js';

const log = debug('workflow-enrich');

/** `<reviewer>@<sha>` — reviewer is a token, sha is 7-40 hex chars. */
const RECEIPT_RE = /^([A-Za-z0-9_.:-]+)@([0-9a-fA-F]{7,40})$/;

/** Legacy plan approval receipt stored in `plan_review`. */
const PLAN_RECEIPT_RE = /^(user|triage|codex)@([0-9a-fA-F]{40})$/;

/** New plan draft review evidence, bound to exact draft bytes. */
const PLAN_REVIEW_RECEIPT_RE = /^(codex|fable|self|skipped)@([0-9a-fA-F]{12})$/;

/** New native Plan Mode approval, bound to the saved plan commit. */
const PLAN_APPROVAL_RECEIPT_RE = /^(user)@([0-9a-fA-F]{40})$/;
const EXEC_RECEIPT_RE = /^(delegated|main):([^@\n]+)@([0-9a-fA-F]{40})$/;
const IMPL_ENTRY_RE = /^(user)@([0-9a-fA-F]{40})$/;

/**
 * Effort tokens a delegated `exec_receipt` may carry as its last `:` segment
 * (`docs/contracts/workflow.md` exec_receipt format, whose vocabulary is the
 * union of `docs/contracts/harness.yaml` `implementation.effort_catalog` plus
 * the fixed `default` token for a dispatch that pinned no effort). beads-ui
 * consumes that enumeration rather than inferring it: only an exact match is
 * read as effort, so a historical `delegated:<model>@<sha>` receipt and any
 * model token keep their whole prefix as the actor.
 *
 * Exported so the Worker's receipt-check reuses this exact enumeration rather
 * than restating it: a second effort table would be the seam where a valid
 * `delegated:<model>:<effort>@<sha>` receipt starts reading as malformed.
 *
 * @type {Set<string>}
 */
export const DELEGATED_EFFORT_TOKENS = new Set([
  'low',
  'medium',
  'high',
  'xhigh',
  'max',
  'default'
]);

/**
 * Reviewer tokens the workflow contract enumerates as review evidence
 * (`docs/contracts/workflow.md` `## Review gates` Receipts, "Consumer glyph
 * classification"). beads-ui consumes that enumeration rather
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
 * Parse execution provenance for display only. Malformed or absent metadata is
 * omitted and never participates in workflow gating.
 *
 * A delegated receipt splits its resolved effort off the actor when the last
 * `:` segment is an exact effort token; `main:` receipts are left whole because
 * the contract keeps that series free of an effort segment and its reason text
 * is prose.
 *
 * @param {unknown} value
 * @returns {{ kind: string, actor: string, effort: string|null, sha: string }|null}
 */
export function parseExecReceipt(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const match = EXEC_RECEIPT_RE.exec(value.trim());
  if (!match) {
    return null;
  }
  const kind = match[1];
  const prefix = match[2];
  const cut = kind === 'delegated' ? prefix.lastIndexOf(':') : -1;
  const tail = cut === -1 ? '' : prefix.slice(cut + 1);
  const has_effort = cut > 0 && DELEGATED_EFFORT_TOKENS.has(tail);
  return {
    kind,
    actor: has_effort ? prefix.slice(0, cut) : prefix,
    effort: has_effort ? tail : null,
    sha: match[3].toLowerCase()
  };
}

/**
 * @typedef {Object} PlannedExecution
 * @property {'delegated'|'main'} kind
 * @property {string | null} reason
 */

/**
 * @typedef {Object} ExecReceipt
 * @property {string} kind
 * @property {string} actor
 * @property {string | null} effort
 * @property {string} sha
 */

/**
 * Parse approved-plan execution ownership for display only. The two metadata
 * fields form one value, so any invalid combination omits the whole display.
 *
 * @param {unknown} kind_value
 * @param {unknown} reason_value
 * @returns {PlannedExecution | null}
 */
export function parsePlannedExecution(kind_value, reason_value) {
  if (kind_value === 'delegated') {
    return reason_value === undefined
      ? { kind: 'delegated', reason: null }
      : null;
  }
  if (kind_value !== 'main' || typeof reason_value !== 'string') {
    return null;
  }
  if (reason_value.trim().length === 0 || /[\r\n]/.test(reason_value)) {
    return null;
  }
  return { kind: 'main', reason: reason_value };
}

/** @param {unknown} value */
export function parseImplEntry(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const match = IMPL_ENTRY_RE.exec(value.trim());
  return match ? { actor: match[1], sha: match[2].toLowerCase() } : null;
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
 * Parse the new plan draft-review receipt.
 *
 * @param {unknown} value
 * @returns {ParsedReceipt | null}
 */
export function parsePlanReviewReceipt(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const m = PLAN_REVIEW_RECEIPT_RE.exec(value.trim());
  if (!m) {
    return null;
  }
  return { reviewer: m[1], sha: m[2], is_skip: m[1] === 'skipped' };
}

/**
 * Parse the new native plan-approval receipt.
 *
 * @param {unknown} value
 * @returns {ParsedReceipt | null}
 */
export function parsePlanApprovalReceipt(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const m = PLAN_APPROVAL_RECEIPT_RE.exec(value.trim());
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
 * Exit code of a git predicate, or null when git itself could not answer.
 *
 * {@link runGit} collapses "answered no" and "could not answer" into one null,
 * which is fine for probes whose only question is the stdout. An ancestry test
 * needs them apart: exit 1 is a real `non_ancestor` verdict, while 128 (unknown
 * object) or a spawn failure is the undetermined case the display probe fails
 * quiet on (UI-vzyh §4.1).
 *
 * @param {string} cwd
 * @param {string[]} args
 * @returns {number | null}
 */
function runGitStatus(cwd, args) {
  try {
    execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'ignore', 'ignore']
    });
    return 0;
  } catch (err) {
    const status =
      err && typeof err === 'object'
        ? /** @type {{ status?: unknown }} */ (err).status
        : null;
    if (typeof status === 'number') {
      return status;
    }
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
 * Prefer a valid freshness cursor over the receipt SHA. Reachability and
 * ancestry are both required so a descendant or unrelated cursor cannot make
 * `<cursor>..HEAD` falsely empty. Any uncertainty fails quiet to the receipt.
 *
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head
 * @param {unknown} cursor
 * @param {string} receipt_sha
 */
function freshnessAnchor(workspace_root, head, cursor, receipt_sha) {
  const cursor_sha = typeof cursor === 'string' ? cursor.trim() : '';
  if (!workspace_root || !head || !/^[0-9a-fA-F]{40}$/.test(cursor_sha)) {
    return receipt_sha;
  }
  const reachable = runGit(workspace_root, [
    'rev-parse',
    '--verify',
    '--quiet',
    `${cursor_sha}^{commit}`
  ]);
  if (reachable === null) {
    return receipt_sha;
  }
  const ancestor = runGit(workspace_root, [
    'merge-base',
    '--is-ancestor',
    cursor_sha,
    head
  ]);
  return ancestor === null ? receipt_sha : cursor_sha;
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
 * Impl-review freshness (UI-vzyh §4.1) — 3-state, keyed on the Bead's OWN
 * branch. The impl gate is issued at the worktree branch tip, and this repo
 * squash-merges, so that sha can never enter base history: the old
 * `HEAD !== sha` comparison was permanently true. The branch name is fixed by
 * the workflow contract (worktree basename == branch == Bead ID).
 *
 *   branch tip == receipt sha            → `fresh`
 *   receipt sha is an ancestor of tip    → `fresh` (base-sync merges only moved
 *                                          the tip; nothing unreviewed replaced
 *                                          what the receipt covers)
 *   receipt sha is NOT an ancestor       → `stale` (rewritten history, reset)
 *   no branch / missing input / git error → `unknown`
 *
 * This is the DISPLAY side of the same rule the merge gate decides on
 * (`merge-gate.js` `createAncestryProbe`), so the board badge and the gate
 * agree. The asymmetry is deliberate and contract-owned: a git error is
 * `unknown` here (fail-quiet — never mark a card stale on a probe failure) and
 * stale at the gate (fail-closed).
 *
 * The equality test normalizes case and accepts an abbreviated receipt sha as a
 * prefix of the tip, because `parseReceipt` allows 7-40 hex in either case.
 * Without that, a receipt written at the tip in short or upper-case form would
 * reach `merge-base --is-ancestor` — harmless now that ancestry means fresh,
 * but the shortcut still saves the fork.
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
  const code = runGitStatus(workspace_root, [
    'merge-base',
    '--is-ancestor',
    receipt_sha,
    tip
  ]);
  if (code === 0) {
    return 'fresh';
  }
  return code === 1 ? 'stale' : 'unknown';
}

/**
 * Receipt parsing always runs — it is string work the glyphs need. Only the git
 * probes are gated on {@link staleProbesApply}.
 *
 * @param {Record<string, any>} md - issue metadata
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head - precomputed HEAD (avoids re-shelling per issue)
 * @param {string | undefined | null} bead_id - issue id (impl branch name)
 * @param {string | null} status - issue status, or null to always probe
 * @param {string} [published_spec_path] - Canonical native-first published spec
 * path. Only publication evidence takes part in the stale probe; an
 * authoring-time draft path never does.
 * @returns {{ spec_stale: boolean, impl_stale: boolean, spec_receipt: ParsedReceipt | null, impl_receipt: ParsedReceipt | null }}
 */
function computeStaleWithHead(
  md,
  workspace_root,
  head,
  bead_id,
  status,
  published_spec_path = resolveSpecId({ metadata: md }).path
) {
  const spec_receipt = parseReceipt(md.spec_review);
  const impl_receipt = parseReceipt(md.impl_review);
  if (!staleProbesApply(status)) {
    return { spec_stale: false, impl_stale: false, spec_receipt, impl_receipt };
  }
  // Display stays file-only: scope parsing belongs to Worker admission because
  // this enrichment path runs for every rendered issue.
  const spec_stale =
    !!spec_receipt &&
    published_spec_path.length > 0 &&
    pathChangedSince(
      workspace_root,
      head,
      freshnessAnchor(
        workspace_root,
        head,
        md.last_checked_sha,
        spec_receipt.sha
      ),
      published_spec_path
    );
  const impl_stale =
    !!impl_receipt &&
    implFreshness(workspace_root, impl_receipt.sha, bead_id) === 'stale';
  return { spec_stale, impl_stale, spec_receipt, impl_receipt };
}

/**
 * Whether the staleness git probes are worth running for a status.
 *
 * A `closed` bead is merged, so its `spec_stale`/`impl_stale`/plan `stale`
 * become true simply because later commits landed — a marker nobody can act on,
 * recomputed on every 30s poll at roughly 930ms of blocking `execFileSync` per
 * pass. `resolved` is deliberately NOT included: it is pre-merge, where
 * staleness still drives a re-review.
 *
 * @param {string | null} status
 */
function staleProbesApply(status) {
  return status !== 'closed';
}

/**
 * Compute `spec_stale` / `impl_stale` for one issue's metadata.
 *
 * @param {Record<string, any> | null | undefined} metadata
 * @param {string | undefined | null} workspace_root
 * @param {string | undefined | null} [bead_id] - issue id (impl branch name)
 * @param {string | null} [status] - omit to probe regardless of status
 * @returns {{ spec_stale: boolean, impl_stale: boolean }}
 */
export function computeStale(
  metadata,
  workspace_root,
  bead_id = null,
  status = null
) {
  const md = metadata || {};
  const head = gitHead(workspace_root);
  const { spec_stale, impl_stale } = computeStaleWithHead(
    md,
    workspace_root,
    head,
    bead_id,
    status
  );
  return { spec_stale, impl_stale };
}

/**
 * Derive the route ('quick_fix' | 'spec_backed' | 'full_plan') from metadata.
 *
 * @param {Record<string, any>} md
 * @returns {'quick_fix' | 'spec_backed' | 'full_plan'}
 */
function deriveRoute(md) {
  if (md.route === 'quick_fix') {
    return 'quick_fix';
  }
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
 * @property {string | null} [approval_receipt] - Plan approval receipt only.
 * @property {'missing'|'fresh'|'stale'|'unknown'|'legacy'} [approval_state] - Plan approval state only.
 * @property {StageDoc} [doc] - Openable document behind the cell (spec/plan only).
 */

/**
 * The document a spec/plan cell stands for, independent of `fill`: a reserved
 * path travels even when nothing was written yet, because the viewer is what
 * distinguishes "not authored" from "unreadable" (spec §2).
 *
 * @typedef {Object} StageDoc
 * @property {string} path - Workspace-relative document path.
 * @property {'spec_draft'|'plan_pending'|null} missing_state
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
 * Compute the SPEC stage (2026-08-23 spec-draft-stage spec §2).
 *
 * Three display steps driven by the evidence class, never by the `source`
 * value: no document at all is `none`, an authoring-time draft whose document
 * exists (or cannot be checked) is `dim`, and publication evidence is `full` —
 * publication itself is the completed-stage fact, so a published spec without a
 * valid receipt fills without a glyph. A draft cell never carries a glyph and
 * never goes stale; the raw `spec_review` string still rides along on every row.
 *
 * @param {{ path: string, evidence: 'published'|'draft'|'none' }} spec_evidence
 * @param {Record<string, any>} md
 * @param {ParsedReceipt | null} receipt
 * @param {boolean} stale
 * @param {string | undefined | null} workspace_root
 * @returns {WorkflowStage}
 */
function specStage(spec_evidence, md, receipt, stale, workspace_root) {
  const raw = typeof md.spec_review === 'string' ? md.spec_review : null;
  if (spec_evidence.evidence === 'none') {
    return makeStage('none', null, false, raw);
  }
  /** @type {StageDoc} */
  const doc = {
    path: spec_evidence.path,
    missing_state: spec_evidence.evidence === 'draft' ? 'spec_draft' : null
  };
  if (spec_evidence.evidence === 'draft') {
    const exists = docArtifactExists(workspace_root, spec_evidence.path);
    return {
      ...makeStage(exists === false ? 'none' : 'dim', null, false, raw),
      doc
    };
  }
  if (!receipt) {
    return { ...makeStage('full', null, false, raw), doc };
  }
  return { ...makeStage('full', classifyGlyph(receipt), stale, raw), doc };
}

/**
 * Determine whether a reserved document path currently resolves to a readable
 * markdown file inside the workspace docs tree. A missing workspace keeps the
 * older fail-quiet behavior because absence cannot be proven.
 *
 * @param {string | undefined | null} workspace_root
 * @param {string} doc_path
 * @returns {boolean | null}
 */
function docArtifactExists(workspace_root, doc_path) {
  if (!workspace_root) {
    return null;
  }
  const resolved = resolveRealpathWithinDocs(workspace_root, doc_path);
  if (!resolved.ok) {
    return false;
  }
  try {
    return fs.statSync(resolved.path).isFile();
  } catch {
    return null;
  }
}

/**
 * Compute the PLAN stage (full_plan only). The glyph comes from draft review;
 * fill/freshness come from native approval. New keys win without malformed-key
 * fallback. Legacy `plan_check` + `plan_review=user@40sha` maps onto the same
 * two axes without rewriting stored metadata. A deterministic `plan_path`
 * reserved before authoring does not fill the stepper until the document
 * exists. Existing authoring receipts remain visible when their document is
 * broken or missing so that corrupt durable state does not disappear quietly.
 *
 * @param {Record<string, any>} md
 * @param {string} status
 * @param {string | undefined | null} workspace_root
 * @param {string | null} head
 * @returns {WorkflowStage}
 */
function planStage(md, status, workspace_root, head) {
  if (!md.plan_path) {
    return {
      ...makeStage('none', null, false, null),
      approval_receipt: null,
      approval_state: 'missing'
    };
  }

  const has_authoring_history =
    Object.hasOwn(md, 'plan_check') ||
    Object.hasOwn(md, 'plan_review') ||
    Object.hasOwn(md, 'plan_approval');
  // A reserved path is openable before the document exists — the viewer says
  // "계획 작성 전" instead of the cell staying silently inert (spec §2).
  const plan_path = typeof md.plan_path === 'string' ? md.plan_path.trim() : '';
  /** @type {{ doc?: StageDoc }} */
  const doc_part =
    plan_path === ''
      ? {}
      : {
          doc: {
            path: plan_path,
            missing_state: has_authoring_history ? null : 'plan_pending'
          }
        };
  if (
    !has_authoring_history &&
    docArtifactExists(workspace_root, md.plan_path) === false
  ) {
    return {
      ...makeStage('none', null, false, null),
      approval_receipt: null,
      approval_state: 'missing',
      ...doc_part
    };
  }

  const has_new_approval = Object.hasOwn(md, 'plan_approval');
  const legacy_approval = has_new_approval
    ? null
    : parsePlanReceipt(md.plan_review);

  let review_raw = null;
  let review_receipt = null;
  if (legacy_approval) {
    review_raw = typeof md.plan_check === 'string' ? md.plan_check : null;
    review_receipt = parsePlanReviewReceipt(md.plan_check);
  } else if (Object.hasOwn(md, 'plan_review')) {
    review_raw = typeof md.plan_review === 'string' ? md.plan_review : null;
    review_receipt = parsePlanReviewReceipt(md.plan_review);
  } else {
    review_raw = typeof md.plan_check === 'string' ? md.plan_check : null;
    review_receipt = parsePlanReviewReceipt(md.plan_check);
  }

  const approval_raw = has_new_approval
    ? typeof md.plan_approval === 'string'
      ? md.plan_approval
      : null
    : legacy_approval && typeof md.plan_review === 'string'
      ? md.plan_review
      : null;
  const approval_receipt = has_new_approval
    ? parsePlanApprovalReceipt(md.plan_approval)
    : legacy_approval;

  /** @type {'missing'|'fresh'|'stale'|'unknown'|'legacy'} */
  let approval_state = 'missing';
  if (approval_receipt) {
    if (staleProbesApply(status)) {
      // Plan display has the same intentional file-only asymmetry as spec.
      const approval_anchor = freshnessAnchor(
        workspace_root,
        head,
        md.last_checked_sha,
        approval_receipt.sha
      );
      approval_state = planFreshness(
        workspace_root,
        head,
        approval_anchor,
        md.plan_path
      );
    } else {
      approval_state = 'fresh';
    }
  } else if (
    !has_new_approval &&
    !Object.hasOwn(md, 'plan_review') &&
    (status === 'resolved' || status === 'closed')
  ) {
    approval_state = 'legacy';
  }

  const stale = approval_state === 'stale';
  const fill =
    approval_state === 'missing' || stale
      ? 'dim'
      : /** @type {const} */ ('full');
  return {
    ...makeStage(fill, classifyGlyph(review_receipt), stale, review_raw),
    approval_receipt: approval_raw,
    approval_state,
    ...doc_part
  };
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
 * @property {'quick_fix'|'spec_backed'|'full_plan'} route
 * @property {'explicit'|'derived'} route_source - Whether the route came from
 * pinned metadata or the deriveRoute fallback (display distinguishes the
 * two — a derived value must not read as a settled pin).
 * @property {{ spec: WorkflowStage, plan?: WorkflowStage, impl: WorkflowStage, pr: WorkflowStage, merge: WorkflowStage, close?: WorkflowStage }} stages
 * @property {{ route: 'quick_fix'|'spec_backed'|'full_plan', route_source: 'explicit'|'derived', fast_track: boolean, pr: { number: number | null } | null, planned_execution: PlannedExecution|null, exec_receipt: ExecReceipt|null, impl_entry: { actor: string, sha: string }|null }} chips
 * @property {PlannedExecution|null} planned_execution
 * @property {ExecReceipt|null} exec_receipt
 * @property {{ actor: string, sha: string }|null} impl_entry
 */

/**
 * Build the compact `workflow` summary for one issue.
 *
 * @param {{ id?: string, status?: string, spec_id?: unknown, metadata?: Record<string, any> }} issue
 * @param {string | undefined | null} [workspace_root]
 * @param {string | null} [head] - Optional precomputed HEAD.
 * @returns {WorkflowSummary}
 */
export function enrichIssueWorkflow(issue, workspace_root, head = undefined) {
  const md = (issue && issue.metadata) || {};
  const spec = resolveSpecEvidence(issue);
  const published_spec_path = resolveSpecId(issue).path;
  const status = String((issue && issue.status) || 'open');
  const bead_id = (issue && issue.id) || null;
  const resolved_head = head === undefined ? gitHead(workspace_root) : head;
  const { spec_stale, impl_stale, spec_receipt, impl_receipt } =
    computeStaleWithHead(
      md,
      workspace_root,
      resolved_head,
      bead_id,
      status,
      published_spec_path
    );

  const route = deriveRoute(md);
  const planned_execution = parsePlannedExecution(
    md.planned_execution,
    md.planned_execution_reason
  );
  const exec_receipt = parseExecReceipt(md.exec_receipt);
  const impl_entry = parseImplEntry(md.impl_entry);
  // Explicit only when the metadata pin itself is a valid enum value — any
  // fallback (absence, invalid value, plan_path inference) is 'derived'.
  const route_source =
    md.route === 'quick_fix' ||
    md.route === 'spec_backed' ||
    md.route === 'full_plan'
      ? 'explicit'
      : 'derived';

  /** @type {WorkflowSummary['stages']} */
  const stages = {
    spec: specStage(spec, md, spec_receipt, spec_stale, workspace_root),
    impl: implStage(md, status, impl_receipt, impl_stale),
    // pr is a binary fact; the wait-for-merge state lives in merge's `dim`
    // (spec §4.2), so this stage never uses `dim`.
    pr: makeStage(md.pr_url ? 'full' : 'none', null, false, null),
    merge: mergeStage(md, status)
  };
  if (route === 'full_plan') {
    stages.plan = planStage(md, status, workspace_root, resolved_head);
  } else if (route === 'quick_fix') {
    stages.close = makeStage(
      status === 'closed' ? 'full' : status === 'resolved' ? 'dim' : 'none',
      null,
      false,
      null
    );
  }

  return {
    route,
    route_source,
    stages,
    planned_execution,
    exec_receipt,
    impl_entry,
    chips: {
      route,
      route_source,
      fast_track: md.workflow_mode === 'fast_track',
      pr: md.pr_url ? { number: parsePrNumber(md.pr_url) } : null,
      planned_execution,
      exec_receipt,
      impl_entry
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
