/**
 * Resolve the canonical spec path from a Beads issue during native-field
 * migration. Native `issue.spec_id` wins; metadata is read-only compatibility.
 *
 * @param {unknown} issue
 * @returns {{ path: string, source: 'native'|'metadata'|'none', conflict: boolean }}
 */
export function resolveSpecId(issue) {
  const row =
    issue && typeof issue === 'object'
      ? /** @type {Record<string, unknown>} */ (issue)
      : {};
  const metadata =
    row.metadata && typeof row.metadata === 'object'
      ? /** @type {Record<string, unknown>} */ (row.metadata)
      : {};
  const native = normalize(row.spec_id);
  const legacy = normalize(metadata.spec_id);

  if (native) {
    return {
      path: native,
      source: 'native',
      conflict: legacy.length > 0 && legacy !== native
    };
  }
  if (legacy) {
    return { path: legacy, source: 'metadata', conflict: false };
  }
  return { path: '', source: 'none', conflict: false };
}

/**
 * @param {unknown} value
 */
function normalize(value) {
  return typeof value === 'string' ? value.trim() : '';
}

/**
 * Resolve the spec path for display, opting in to the authoring-time draft
 * pointer. Publication evidence still wins: metadata `spec_path` answers only
 * when `resolveSpecId` finds nothing, and then as `source: 'draft'`. Gate logic
 * keeps calling `resolveSpecId` so a draft never reads as a published spec.
 *
 * @param {unknown} issue
 * @returns {{ path: string, source: 'native'|'metadata'|'draft'|'none', conflict: boolean }}
 */
export function resolveSpecDraft(issue) {
  const published = resolveSpecId(issue);
  if (published.path) {
    return published;
  }
  const draft = normalize(readMetadata(issue).spec_path);
  if (draft) {
    return { path: draft, source: 'draft', conflict: false };
  }
  return published;
}

/**
 * @param {unknown} issue
 * @returns {Record<string, unknown>}
 */
function readMetadata(issue) {
  const row =
    issue && typeof issue === 'object'
      ? /** @type {Record<string, unknown>} */ (issue)
      : {};
  return row.metadata && typeof row.metadata === 'object'
    ? /** @type {Record<string, unknown>} */ (row.metadata)
    : {};
}
