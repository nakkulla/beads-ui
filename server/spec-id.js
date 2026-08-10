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
