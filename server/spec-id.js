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
 * Resolve the spec evidence class for display. Wraps {@link resolveSpecDraft}
 * with the single mapping from durable keys to evidence (spec §2's complete
 * partition, published-first): publication is a resolved `spec_id` path AND a
 * format-valid `metadata.spec_review` receipt, so a `spec_id` whose receipt is
 * absent or malformed is `draft`, as is a transitional `spec_path`-only row —
 * `spec_path` is not a `spec_id`, so no receipt can publish it. Neither path is
 * `none`. Consumers branch on `evidence` instead of enumerating `source`
 * values, so a later key-vocabulary change stays inside this module.
 *
 * @param {unknown} issue
 * @returns {{ path: string, source: 'native'|'metadata'|'draft'|'none', conflict: boolean, evidence: 'published'|'draft'|'none', skipped: boolean }}
 */
export function resolveSpecEvidence(issue) {
  const resolved = resolveSpecDraft(issue);
  const receipt = normalize(readMetadata(issue).spec_review);
  const receipt_valid = SPEC_RECEIPT_RE.test(receipt);
  const skipped =
    receipt_valid && receipt.slice(0, receipt.indexOf('@')) === 'skipped';
  if (resolved.source === 'none') {
    return { ...resolved, evidence: 'none', skipped };
  }
  const published = resolved.source !== 'draft' && receipt_valid;
  return {
    ...resolved,
    evidence: published ? 'published' : 'draft',
    skipped
  };
}
