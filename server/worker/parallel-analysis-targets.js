/**
 * Parallel-analysis target snapshot (UI-04vo §6, seam F).
 *
 * One analysis run pins an immutable snapshot: workspace identity, target base
 * ref/commit SHA, the sorted target Bead ids, each Bead's analysis-relevant
 * fields, each artifact's target-base blob OID/byte length, and the prompt
 * schema version. The snapshot digest is what caches, stale checks, and the
 * submit path compare — lane placement and live labels are an applicability
 * OVERLAY that never enters the digest, because moving a row between lanes
 * must not invalidate an analysis of unchanged artifacts.
 */
import crypto from 'node:crypto';

/**
 * Version of the analyzer prompt/result contract this snapshot feeds
 * (UI-04vo §8: result schema v2).
 *
 * @type {number}
 */
export const PROMPT_SCHEMA_VERSION = 2;

/** @type {RegExp} Receipt shape shared with admission (`<reviewer>@<40hex>`). */
const RECEIPT_RE = /^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;

/**
 * The ONLY plan shape the analyzer will bundle (UI-04vo §7: "safe `docs/**.md`
 * plan"). `plan_path` is Bead metadata, so without this allowlist a Bead could
 * name any tracked file — a config or a source file — and have it materialized
 * into the sanitized bundle as a "plan". A path outside the allowlist is
 * treated as no plan at all; the spec alone still identifies the target.
 *
 * @param {unknown} value
 * @returns {string|null}
 */
function safePlanPath(value) {
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  const safe =
    /^docs\/[A-Za-z0-9._/-]+\.md$/.test(trimmed) &&
    !trimmed.split('/').includes('..');
  return safe ? trimmed : null;
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @typedef {Object} AnalysisTarget
 * @property {string} id
 * @property {string|null} title
 * @property {string} route
 * @property {string} spec_id
 * @property {string|null} plan_path
 * @property {string[]} deps - Direct `blocks` blocker ids.
 * @property {Array<{ path: string, kind: 'spec'|'plan', oid: string, bytes: number }>} artifacts
 */

/**
 * Runnable qualification for the default target set (UI-04vo §6): open
 * top-level Bead, `spec_backed`/`full_plan` route, native-first `spec_id`
 * without a dual-value conflict, a well-formed `spec_review` receipt, and no
 * `worker-ineligible` label. Everything else is excluded with a reason so the
 * dialog can say why a Bead is not analyzable.
 *
 * @param {any[]} issues - `bd list --json` style issue rows (dependencies
 * included).
 * @returns {{ targets: AnalysisTarget[], excluded: Array<{ id: string, reason: string }> }}
 */
export function qualifyTargets(issues) {
  /** @type {AnalysisTarget[]} */
  const targets = [];
  /** @type {Array<{ id: string, reason: string }>} */
  const excluded = [];
  for (const issue of Array.isArray(issues) ? issues : []) {
    if (!isRecord(issue) || typeof issue.id !== 'string') {
      continue;
    }
    const md = isRecord(issue.metadata) ? issue.metadata : {};
    const labels = Array.isArray(issue.labels)
      ? issue.labels.filter((l) => typeof l === 'string')
      : [];
    const deps = Array.isArray(issue.dependencies) ? issue.dependencies : [];
    const reason = (() => {
      if (issue.status !== 'open') {
        return 'closed';
      }
      if (
        deps.some((d) => isRecord(d) && d.dependency_type === 'parent-child') ||
        typeof md.parent === 'string'
      ) {
        return 'phase_child';
      }
      if (md.route !== 'spec_backed' && md.route !== 'full_plan') {
        return 'route';
      }
      // Native-first spec authority: the metadata key is the analyzable input;
      // a legacy-only or conflicting spec reference is not analysis authority.
      const native = typeof md.spec_id === 'string' ? md.spec_id.trim() : '';
      const legacy =
        typeof issue.spec_id === 'string' ? issue.spec_id.trim() : '';
      if (native.length === 0 && legacy.length === 0) {
        return 'spec_missing';
      }
      if (native.length > 0 && legacy.length > 0 && native !== legacy) {
        return 'spec_conflict';
      }
      if (
        typeof md.spec_review !== 'string' ||
        !RECEIPT_RE.test(md.spec_review) ||
        md.spec_review.startsWith('skipped@')
      ) {
        return 'spec_review';
      }
      if (labels.includes('worker-ineligible')) {
        return 'worker_ineligible';
      }
      return null;
    })();
    if (reason !== null) {
      excluded.push({ id: issue.id, reason });
      continue;
    }
    const spec_id =
      typeof md.spec_id === 'string' && md.spec_id.trim().length > 0
        ? md.spec_id.trim()
        : String(issue.spec_id).trim();
    targets.push({
      id: issue.id,
      title: typeof issue.title === 'string' ? issue.title : null,
      route: md.route,
      spec_id,
      plan_path: md.route === 'full_plan' ? safePlanPath(md.plan_path) : null,
      deps: deps
        .filter(
          (d) =>
            isRecord(d) &&
            d.dependency_type === 'blocks' &&
            typeof d.id === 'string'
        )
        .map((d) => d.id)
        .sort(),
      artifacts: []
    });
  }
  return { targets, excluded };
}

/**
 * Active lineage ids for the comparison context (UI-04vo §6): running/paused
 * attempts and durable `pr_wait` completion roots. Included in the ANALYSIS
 * (and its digest — a changed active set changes what "parallel with the
 * currently running work" means) but never in the submit target set.
 *
 * @param {any} queue - Queue snapshot.
 * @returns {string[]} Sorted lineage bead ids.
 */
function activeLineagesOf(queue) {
  /** @type {Set<string>} */
  const out = new Set();
  for (const attempt of Object.values(
    isRecord(queue) && isRecord(queue.attempts) ? queue.attempts : {}
  )) {
    if (
      isRecord(attempt) &&
      (attempt.status === 'running' || attempt.status === 'paused') &&
      typeof attempt.bead_id === 'string'
    ) {
      out.add(
        typeof attempt.completion_root_id === 'string'
          ? attempt.completion_root_id
          : attempt.bead_id
      );
    }
  }
  for (const entry of Array.isArray(queue?.pr_wait) ? queue.pr_wait : []) {
    if (isRecord(entry) && typeof entry.bead_id === 'string') {
      out.add(entry.bead_id);
    }
  }
  return [...out].sort();
}

/**
 * Current lane of each waiting bead — the display-only applicability overlay.
 *
 * @param {any} queue
 * @returns {Record<string, string>}
 */
function laneOverlayOf(queue) {
  /** @type {Record<string, string>} */
  const lanes = {};
  for (const entry of Array.isArray(queue?.queue) ? queue.queue : []) {
    if (isRecord(entry) && typeof entry.bead_id === 'string') {
      lanes[entry.bead_id] = 'parallel';
    }
  }
  for (const lane of Array.isArray(queue?.serial_lanes)
    ? queue.serial_lanes
    : []) {
    if (!isRecord(lane) || typeof lane.id !== 'string') {
      continue;
    }
    for (const entry of Array.isArray(lane.entries) ? lane.entries : []) {
      if (isRecord(entry) && typeof entry.bead_id === 'string') {
        lanes[entry.bead_id] = lane.id;
      }
    }
  }
  return lanes;
}

/**
 * Collect the immutable analysis snapshot (UI-04vo §6). Fail-closed: an
 * unresolved base or an unreadable REQUIRED artifact aborts the whole
 * collection so a stale cache is preserved instead of being replaced by a
 * partial identity.
 *
 * @param {{ workspace: string, issues: any[], queue: any, base: { ref: string, sha: string|null }, gitRun: (args: string[]) => Promise<{ code: number, stdout: string }> }} input
 * @returns {Promise<{ ok: boolean, snapshot?: any, reason?: string }>}
 */
export async function collectAnalysisSnapshot(input) {
  const { workspace, issues, queue, base, gitRun } = input;
  if (
    !isRecord(base) ||
    typeof base.sha !== 'string' ||
    !/^[0-9a-fA-F]{40}$/.test(base.sha)
  ) {
    return { ok: false, reason: 'base_unresolved' };
  }
  const { targets, excluded } = qualifyTargets(issues);
  if (targets.length === 0) {
    return { ok: false, reason: 'no_targets' };
  }
  /**
   * Pinned blob identity of one artifact path, or null when unreadable.
   *
   * @param {string} artifact_path
   */
  async function blobOf(artifact_path) {
    const oid = await gitRun(['rev-parse', `${base.sha}:${artifact_path}`]);
    if (oid.code !== 0) {
      return null;
    }
    const size = await gitRun([
      'cat-file',
      '-s',
      `${base.sha}:${artifact_path}`
    ]);
    if (size.code !== 0) {
      return null;
    }
    const bytes = Number.parseInt(size.stdout.trim(), 10);
    return {
      oid: oid.stdout.trim(),
      bytes: Number.isFinite(bytes) ? bytes : 0
    };
  }
  for (const target of targets) {
    const spec_blob = await blobOf(target.spec_id);
    if (!spec_blob) {
      // The spec is the analysis's REQUIRED input; without it the snapshot's
      // identity would silently describe less than it claims.
      return { ok: false, reason: 'artifact_unreadable' };
    }
    target.artifacts.push({
      path: target.spec_id,
      kind: 'spec',
      ...spec_blob
    });
    if (target.plan_path) {
      const plan_blob = await blobOf(target.plan_path);
      if (plan_blob) {
        target.artifacts.push({
          path: target.plan_path,
          kind: 'plan',
          ...plan_blob
        });
      }
      // A missing plan is a bundle-level omission (UI-04vo §7), not a snapshot
      // failure: the spec alone still identifies the analysis input.
    }
  }
  const sorted = [...targets].sort((a, b) => a.id.localeCompare(b.id));
  /** @type {Record<string, AnalysisTarget>} */
  const by_id = {};
  for (const target of sorted) {
    by_id[target.id] = target;
  }
  const context = { active_lineages: activeLineagesOf(queue) };
  const semantic = {
    workspace: String(workspace || ''),
    base_sha: base.sha,
    prompt_schema_version: PROMPT_SCHEMA_VERSION,
    target_ids: sorted.map((t) => t.id),
    targets: by_id,
    context
  };
  const digest = crypto
    .createHash('sha256')
    .update(JSON.stringify(semantic))
    .digest('hex');
  return {
    ok: true,
    snapshot: {
      ...semantic,
      base_ref: typeof base.ref === 'string' ? base.ref : '',
      excluded,
      overlay: { lanes: laneOverlayOf(queue) },
      digest
    }
  };
}
