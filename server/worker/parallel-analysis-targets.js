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
import {
  overlapPrefixes,
  scopeItemsOverlap
} from '../../app/utils/scope-overlap.js';
import { resolveSpecId } from '../spec-id.js';
import { parseArtifactScope } from './artifact-scope.js';

/**
 * The overlap primitives moved to `app/utils/scope-overlap.js` (UI-qm12 §5.1)
 * so the monitor derives its 겹침 칩 from the same definition. Re-exported here
 * because the analysis snapshot's importers already read them from this module.
 */
export { overlapPrefixes, scopeItemsOverlap };

/**
 * Version of the analyzer prompt/result contract this snapshot feeds
 * (UI-a29n §5.3: result schema v3).
 *
 * @type {number}
 */
export const PROMPT_SCHEMA_VERSION = 3;

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
 * Calculate deterministic pairwise overlaps from target scope declarations.
 * Targets without a declaration are unknown and contribute no pair.
 *
 * @param {Record<string, { scope?: string[] }>} targets
 * @returns {Array<{ pair: [string, string], prefixes: string[] }>}
 */
export function calculateScopeOverlaps(targets) {
  const target_ids = Object.keys(targets).sort();
  /** @type {Array<{ pair: [string, string], prefixes: string[] }>} */
  const overlaps = [];
  for (let left_index = 0; left_index < target_ids.length; left_index += 1) {
    const left_id = target_ids[left_index];
    const left_scope = Array.isArray(targets[left_id].scope)
      ? targets[left_id].scope
      : [];
    if (left_scope.length === 0) {
      continue;
    }
    for (
      let right_index = left_index + 1;
      right_index < target_ids.length;
      right_index += 1
    ) {
      const right_id = target_ids[right_index];
      const right_scope = Array.isArray(targets[right_id].scope)
        ? targets[right_id].scope
        : [];
      if (right_scope.length === 0) {
        continue;
      }
      const prefixes = overlapPrefixes(left_scope, right_scope);
      if (prefixes.length > 0) {
        overlaps.push({ pair: [left_id, right_id], prefixes });
      }
    }
  }
  return overlaps;
}

/**
 * The union of the declared `scope:` prefixes of `artifact_paths`, read from the
 * pinned base. Exported since UI-qm12 §4.1: the lane-chip scope cache reads the
 * SAME artifacts at the same base, and a second reader would be a second
 * definition of what "declared scope" means.
 *
 * `fail_on_read_error` makes ONE unreadable artifact collapse the whole result
 * to null — a partial union would silently under-declare.
 *
 * @param {(args: string[]) => Promise<{ code: number, stdout: string }>} gitRun
 * @param {string} base_sha
 * @param {string[]} artifact_paths
 * @param {boolean} [fail_on_read_error]
 * @returns {Promise<string[]|null>}
 */
export async function scopeAtBase(
  gitRun,
  base_sha,
  artifact_paths,
  fail_on_read_error = false
) {
  /** @type {Set<string>} */
  const scope = new Set();
  for (const artifact_path of artifact_paths) {
    const content = await gitRun([
      'cat-file',
      'blob',
      `${base_sha}:${artifact_path}`
    ]);
    if (content.code !== 0) {
      if (fail_on_read_error) {
        return null;
      }
      continue;
    }
    for (const prefix of parseArtifactScope(content.stdout)) {
      scope.add(prefix);
    }
  }
  return [...scope].sort();
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
 * @property {string[]} scope
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
 * @returns {{ targets: AnalysisTarget[], excluded: Array<{ id: string, title: string|null, reason: string }> }}
 */
export function qualifyTargets(issues) {
  /** @type {AnalysisTarget[]} */
  const targets = [];
  /** @type {Array<{ id: string, title: string|null, reason: string }>} */
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
    const spec = resolveSpecId(issue);
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
      // Native-first spec authority (resolveSpecId): top-level issue.spec_id
      // wins; metadata.spec_id is historical dual-read compatibility only.
      if (spec.path.length === 0) {
        return 'spec_missing';
      }
      if (spec.conflict) {
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
      excluded.push({
        id: issue.id,
        title: typeof issue.title === 'string' ? issue.title : null,
        reason
      });
      continue;
    }
    const spec_id = spec.path;
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
      artifacts: [],
      scope: []
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
 * Build the lightweight target-picker payload without pinning git blobs.
 *
 * @param {any[]} issues
 * @param {any} queue
 */
export function describeAnalysisTargets(issues, queue) {
  const { targets, excluded } = qualifyTargets(issues);
  const lanes = laneOverlayOf(queue);
  return {
    qualified: targets.map((target) => ({
      id: target.id,
      title: target.title,
      route: target.route,
      spec_id: target.spec_id,
      plan_path: target.plan_path,
      lane: lanes[target.id] || null
    })),
    excluded: excluded
      .filter((target) => target.reason !== 'closed')
      .map((target) => ({
        ...target,
        lane: lanes[target.id] || null
      }))
  };
}

/**
 * Enrich qualified target-picker rows from the workspace's pinned base.
 * A missing base returns null so the caller can preserve the legacy payload.
 *
 * @param {{ context: { resolveBase: (input: { force: boolean }) => Promise<any>, gitRun: (args: string[]) => Promise<{ code: number, stdout: string }> }, targets: Array<{ id: string, spec_id: string, plan_path: string|null }> }} input
 * @returns {Promise<Record<string, { scope: string[], overlaps: string[] }>|null>}
 */
export async function collectAnalysisTargetScopeSignals(input) {
  const { context, targets } = input;
  let base;
  try {
    base = await context.resolveBase({ force: false });
  } catch {
    return null;
  }
  if (
    !isRecord(base) ||
    base.ok !== true ||
    typeof base.base_oid !== 'string' ||
    !/^[0-9a-fA-F]{40}$/.test(base.base_oid)
  ) {
    return null;
  }
  /** @type {Record<string, { scope: string[] }>} */
  const scoped_targets = {};
  for (const target of [...targets].sort((a, b) => a.id.localeCompare(b.id))) {
    const artifact_paths = [
      target.spec_id,
      ...(typeof target.plan_path === 'string' ? [target.plan_path] : [])
    ];
    const scope = await scopeAtBase(
      context.gitRun,
      base.base_oid,
      artifact_paths,
      true
    );
    if (scope === null) {
      return null;
    }
    scoped_targets[target.id] = { scope };
  }
  /** @type {Record<string, string[]>} */
  const overlap_ids = {};
  for (const target_id of Object.keys(scoped_targets)) {
    overlap_ids[target_id] = [];
  }
  for (const overlap of calculateScopeOverlaps(scoped_targets)) {
    const [left_id, right_id] = overlap.pair;
    overlap_ids[left_id].push(right_id);
    overlap_ids[right_id].push(left_id);
  }
  /** @type {Record<string, { scope: string[], overlaps: string[] }>} */
  const signals = {};
  for (const target_id of Object.keys(scoped_targets).sort()) {
    signals[target_id] = {
      scope: scoped_targets[target_id].scope,
      overlaps: overlap_ids[target_id].sort()
    };
  }
  return signals;
}

/**
 * Collect the immutable analysis snapshot (UI-04vo §6). Fail-closed: an
 * unresolved base or an unreadable REQUIRED artifact aborts the whole
 * collection so a stale cache is preserved instead of being replaced by a
 * partial identity.
 *
 * @param {{ workspace: string, issues: any[], queue: any, base: { ref: string, sha: string|null }, gitRun: (args: string[]) => Promise<{ code: number, stdout: string }>, target_ids?: string[] }} input
 * @returns {Promise<{ ok: boolean, snapshot?: any, reason?: string, detail?: string[] }>}
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
  const qualified = qualifyTargets(issues);
  let targets = qualified.targets;
  const excluded = qualified.excluded;
  if (Array.isArray(input.target_ids)) {
    const qualified_ids = new Set(targets.map((target) => target.id));
    const requested_ids = [...new Set(input.target_ids)];
    const rejected_ids = requested_ids.filter(
      (target_id) => !qualified_ids.has(target_id)
    );
    if (rejected_ids.length > 0) {
      return {
        ok: false,
        reason: 'target_not_qualified',
        detail: rejected_ids
      };
    }
    const requested = new Set(requested_ids);
    targets = targets.filter((target) => requested.has(target.id));
  }
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
    target.scope =
      (await scopeAtBase(
        gitRun,
        base.sha,
        target.artifacts.map((artifact) => artifact.path)
      )) || [];
  }
  const sorted = [...targets].sort((a, b) => a.id.localeCompare(b.id));
  /** @type {Record<string, AnalysisTarget>} */
  const by_id = {};
  for (const target of sorted) {
    by_id[target.id] = target;
  }
  const context = { active_lineages: activeLineagesOf(queue) };
  const scope_overlaps = calculateScopeOverlaps(by_id);
  const semantic = {
    workspace: String(workspace || ''),
    base_sha: base.sha,
    prompt_schema_version: PROMPT_SCHEMA_VERSION,
    target_ids: sorted.map((t) => t.id),
    targets: by_id,
    scope_overlaps,
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
