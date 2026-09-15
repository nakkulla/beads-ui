/**
 * One response-identity ledger shared by root and native-child collectors.
 * Claims remain source-tagged so replacing one rollout can remove exactly its
 * evidence and recompute conflicts from the files that still exist.
 */

/** @param {unknown} value */
function objectOf(value) {
  return value && typeof value === 'object' && !Array.isArray(value)
    ? /** @type {Record<string, any>} */ (value)
    : null;
}

/** @param {unknown} raw */
function canonicalUsage(raw) {
  const usage = objectOf(raw);
  if (!usage) {
    return null;
  }
  /** @type {Record<string, number>} */
  const out = {};
  for (const [target, aliases] of Object.entries({
    input_tokens: ['input_tokens'],
    cache_read_input_tokens: ['cache_read_input_tokens', 'cached_input_tokens'],
    cache_creation_input_tokens: [
      'cache_creation_input_tokens',
      'cache_write_input_tokens'
    ],
    output_tokens: ['output_tokens'],
    reasoning_output_tokens: ['reasoning_output_tokens'],
    total_tokens: ['total_tokens']
  })) {
    const value = aliases
      .map((key) => usage[key])
      .find((candidate) => Number.isFinite(candidate));
    if (Number.isFinite(value)) {
      out[target] = Number(value);
    }
  }
  return Object.keys(out).length > 0 ? out : null;
}

export function createCodexResponseLedger() {
  /** @type {Map<string, Map<string, Set<string>>>} */
  const claims = new Map();

  /**
   * @param {string} response_id
   * @param {string} source_thread_id
   * @param {string} claimed_thread_id
   * @param {Record<string, any>} usage
   */
  function register(response_id, source_thread_id, claimed_thread_id, usage) {
    const canonical = canonicalUsage(usage);
    if (!canonical) {
      return;
    }
    let by_source = claims.get(response_id);
    if (!by_source) {
      by_source = new Map();
      claims.set(response_id, by_source);
    }
    let signatures = by_source.get(source_thread_id);
    if (!signatures) {
      signatures = new Set();
      by_source.set(source_thread_id, signatures);
    }
    signatures.add(`${claimed_thread_id}\0${JSON.stringify(canonical)}`);
  }

  /** @param {string} response_id */
  function isValid(response_id) {
    const by_source = claims.get(response_id);
    if (!by_source || by_source.size === 0) {
      return true;
    }
    const canonical_claims = new Set();
    for (const [source, signatures] of by_source) {
      for (const signature of signatures) {
        const separator = signature.indexOf('\0');
        if (signature.slice(0, separator) !== source) {
          return false;
        }
        canonical_claims.add(signature);
      }
    }
    return canonical_claims.size === 1;
  }

  /** @param {string} thread_id */
  function resetThread(thread_id) {
    for (const [response_id, by_source] of claims) {
      by_source.delete(thread_id);
      if (by_source.size === 0) {
        claims.delete(response_id);
      }
    }
  }

  /** @param {string} thread_id */
  function hasConflictFor(thread_id) {
    for (const [response_id, by_source] of claims) {
      if (by_source.has(thread_id) && !isValid(response_id)) {
        return true;
      }
    }
    return false;
  }

  /** @returns {Set<string>} */
  function conflictingIds() {
    return new Set(
      [...claims.keys()].filter((response_id) => !isValid(response_id))
    );
  }

  return { register, isValid, resetThread, hasConflictFor, conflictingIds };
}

/**
 * Register one raw rollout claim and return its response id when present.
 *
 * @param {ReturnType<typeof createCodexResponseLedger>} ledger
 * @param {string} source_thread_id
 * @param {unknown} record
 */
export function registerCodexResponseRecord(ledger, source_thread_id, record) {
  const row = objectOf(record);
  const payload = objectOf(row?.payload);
  if (
    row?.type !== 'token_usage_record' ||
    typeof payload?.response_id !== 'string' ||
    payload.response_id.length === 0
  ) {
    return null;
  }
  const usage = canonicalUsage(payload.usage);
  if (!usage) {
    return null;
  }
  ledger.register(
    payload.response_id,
    source_thread_id,
    typeof payload.thread_id === 'string'
      ? payload.thread_id
      : source_thread_id,
    usage
  );
  return payload.response_id;
}
