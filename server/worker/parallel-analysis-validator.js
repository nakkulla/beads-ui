/**
 * Parallel-analysis result validator — schema v2 (UI-04vo §8, seam I).
 *
 * The model's stdout is untrusted data. Before it becomes a UI result or a
 * queue-mutation source, EVERY invariant here must hold; one violation rejects
 * the whole result, and a weak verdict is never promoted. Group submit
 * eligibility is judged by ONE function ({@link isGroupEligible}) so the
 * server submit path and the dialog's overlay/submit button bind to the same
 * judgment.
 */

/**
 * Strong conflict categories (UI-04vo §8): the only evidence classes that make
 * a group `serial 권장`. Same repo / same area / partial file overlap are NOT
 * strong.
 *
 * @type {string[]}
 */
export const STRONG_CATEGORIES = [
  'shared_mutable_state',
  'schema_or_migration',
  'canonical_contract',
  'shared_deploy_surface',
  'exclusive_external_resource'
];

/** @type {Set<string>} */
const CONFIDENCE_VALUES = new Set(['high', 'medium', 'low']);
/** @type {Set<string>} */
const ARTIFACT_KINDS = new Set(['spec', 'plan', 'source']);

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The single submit-eligibility judgment (UI-04vo §5 Phase 5): `high`
 * confidence AND at least one strong category.
 *
 * @param {{ confidence?: unknown, categories?: unknown }} group
 * @returns {boolean}
 */
export function isGroupEligible(group) {
  return (
    isRecord(group) &&
    group.confidence === 'high' &&
    Array.isArray(group.categories) &&
    group.categories.some((c) => STRONG_CATEGORIES.includes(String(c)))
  );
}

/**
 * Validate one analyzer result against its pinned snapshot and bundle.
 *
 * @param {{ result: unknown, snapshot: { digest: string, target_ids: string[] }, manifest: { files: Array<{ path: string }> }, readBundleFile: (p: string) => string|null }} input
 * @returns {{ ok: true, result: any } | { ok: false, reason: string, detail?: string }}
 */
export function validateAnalysisResult(input) {
  const { result, snapshot, manifest, readBundleFile } = input;
  if (!isRecord(result)) {
    return { ok: false, reason: 'shape' };
  }
  if (result.schema_version !== 2) {
    return { ok: false, reason: 'schema_version' };
  }
  if (result.snapshot_digest !== snapshot.digest) {
    return { ok: false, reason: 'digest_mismatch' };
  }
  if (!Array.isArray(result.issues) || !Array.isArray(result.groups)) {
    return { ok: false, reason: 'shape' };
  }
  const targets = new Set(snapshot.target_ids);
  /** @type {Set<string>} */
  const seen = new Set();
  /**
   * Claim one target id for the exact partition; false on dup/unknown.
   *
   * @param {unknown} id
   */
  function claim(id) {
    if (typeof id !== 'string' || !targets.has(id) || seen.has(id)) {
      return false;
    }
    seen.add(id);
    return true;
  }
  for (const issue of result.issues) {
    if (
      !isRecord(issue) ||
      (issue.verdict !== 'parallel_ok' && issue.verdict !== 'uncertain') ||
      typeof issue.reason !== 'string'
    ) {
      return { ok: false, reason: 'shape' };
    }
    if (!claim(issue.bead_id)) {
      return { ok: false, reason: 'partition', detail: String(issue.bead_id) };
    }
  }
  /** @type {any[]} */
  const groups = [];
  for (const group of result.groups) {
    if (
      !isRecord(group) ||
      !Array.isArray(group.members) ||
      !Array.isArray(group.order) ||
      typeof group.reason !== 'string' ||
      !Array.isArray(group.evidence)
    ) {
      return { ok: false, reason: 'shape' };
    }
    if (!CONFIDENCE_VALUES.has(String(group.confidence))) {
      return { ok: false, reason: 'shape' };
    }
    if (
      !Array.isArray(group.categories) ||
      group.categories.some((c) => !STRONG_CATEGORIES.includes(String(c)))
    ) {
      return { ok: false, reason: 'category' };
    }
    if (group.members.length < 2) {
      return { ok: false, reason: 'group_size' };
    }
    for (const member of group.members) {
      if (!claim(member)) {
        // A member already claimed by another group or an issue row is either
        // a non-disjoint group or a broken partition — name the sharper one.
        const overlap =
          typeof member === 'string' &&
          targets.has(member) &&
          seen.has(member) &&
          groups.some((g) => g.members.includes(member));
        return {
          ok: false,
          reason: overlap ? 'groups_overlap' : 'partition',
          detail: String(member)
        };
      }
    }
    const members_sorted = [...group.members].sort();
    const order_sorted = [...group.order].sort();
    if (
      group.order.length !== group.members.length ||
      members_sorted.some((id, index) => id !== order_sorted[index])
    ) {
      return { ok: false, reason: 'order' };
    }
    if (group.evidence.length === 0) {
      return { ok: false, reason: 'evidence', detail: 'empty' };
    }
    for (const evidence of group.evidence) {
      if (
        !isRecord(evidence) ||
        typeof evidence.path !== 'string' ||
        !ARTIFACT_KINDS.has(String(evidence.artifact_kind)) ||
        typeof evidence.locator !== 'string' ||
        evidence.locator.length === 0
      ) {
        return { ok: false, reason: 'shape' };
      }
      if (!manifest.files.some((file) => file.path === evidence.path)) {
        return { ok: false, reason: 'evidence', detail: evidence.path };
      }
      const content = readBundleFile(evidence.path);
      if (typeof content !== 'string' || !content.includes(evidence.locator)) {
        return { ok: false, reason: 'evidence', detail: evidence.locator };
      }
    }
    groups.push({ ...group, eligible: isGroupEligible(group) });
  }
  if (seen.size !== targets.size) {
    return { ok: false, reason: 'partition', detail: 'missing_targets' };
  }
  return {
    ok: true,
    result: {
      schema_version: 2,
      snapshot_digest: result.snapshot_digest,
      issues: result.issues,
      groups
    }
  };
}
