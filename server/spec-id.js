/**
 * Resolve the canonical spec path from a Beads issue. Native `issue.spec_id`
 * is the single key: the transitional `metadata.spec_id` dual-read retired with
 * the 2026-08-24 spec-key sweep (dotfiles-23wd), so a row without the native
 * field has no spec. `conflict` stays in the shape for Worker-side consumers
 * (`spec_id_conflict` projections) and is always `false` now that only one
 * key is read.
 *
 * @param {unknown} issue
 * @returns {{ path: string, source: 'native'|'none', conflict: false }}
 */
export function resolveSpecId(issue) {
  const row =
    issue && typeof issue === 'object'
      ? /** @type {Record<string, unknown>} */ (issue)
      : {};
  const native = normalize(row.spec_id);

  if (native) {
    return { path: native, source: 'native', conflict: false };
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

/**
 * Receipt-format validity for the spec evidence predicate (spec §2). The
 * criterion is deliberately the SAME as `server/worker/admission.js`
 * `ADMISSION_RECEIPT_RE` — `<reviewer>@<full-40-hex>`, `skipped@` included —
 * but restated here because this module is bundled into the frontend and must
 * not pull the server-only admission path into `app/`. Depth validity
 * (reachability, ancestry) stays with admission and the stale probe.
 */
const SPEC_RECEIPT_RE = /^[A-Za-z0-9_.:-]+@[0-9a-fA-F]{40}$/;

/**
 * Resolve the spec evidence class for display. Wraps {@link resolveSpecId}
 * with the single mapping from durable keys to evidence (spec §2's complete
 * partition, published-first): publication is a native `spec_id` AND a
 * format-valid `metadata.spec_review` receipt; a `spec_id` whose receipt is
 * absent or malformed is `draft`; no `spec_id` is `none`. The authoring-time
 * `metadata.spec_path` pointer is no longer read — the sweep retired it with
 * `metadata.spec_id`. Consumers branch on `evidence` instead of enumerating
 * `source` values, so a later key-vocabulary change stays inside this module.
 *
 * @param {unknown} issue
 * @returns {{ path: string, source: 'native'|'none', conflict: false, evidence: 'published'|'draft'|'none', skipped: boolean }}
 */
export function resolveSpecEvidence(issue) {
  const resolved = resolveSpecId(issue);
  const receipt = normalize(readMetadata(issue).spec_review);
  const receipt_valid = SPEC_RECEIPT_RE.test(receipt);
  const skipped =
    receipt_valid && receipt.slice(0, receipt.indexOf('@')) === 'skipped';
  if (resolved.source === 'none') {
    return { ...resolved, evidence: 'none', skipped };
  }
  return {
    ...resolved,
    evidence: receipt_valid ? 'published' : 'draft',
    skipped
  };
}
