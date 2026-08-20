/**
 * Pure normalization for `bd --json` output.
 *
 * bd emits legacy bare JSON by default and a `{schema_version, data}` envelope
 * under `BD_JSON_ENVELOPE=1`. A bare object may carry its own `schema_version`
 * field (`bd version --json` does), so the marker alone cannot identify the
 * envelope; only an own `data` field can. None of the commands this repository
 * consumes returns a bare top-level `data` payload.
 *
 * This module performs no I/O and never mutates its input.
 */

/**
 * @typedef {Object} BdProtocol
 * @property {'bare'|'envelope'} format
 * @property {2|null} schema_version
 */

/**
 * @typedef {Object} BdJsonErrorDetails
 * @property {number} [exit_code]
 * @property {string} [command_family]
 * @property {string} [expected]
 * @property {string} [actual]
 * @property {number} [schema_version]
 * @property {'write'|'readback'} [phase]
 * @property {boolean} [write_applied]
 * @property {boolean} [retry_safe]
 * @property {number} [row_index]
 * @property {boolean} [timed_out]
 */

/**
 * @typedef {Object} BdJsonError
 * @property {string} code
 * @property {string} message
 * @property {BdJsonErrorDetails} [details]
 */

/**
 * @typedef {{ ok: true, data: unknown, protocol: BdProtocol }} BdTransportOk
 */

/**
 * @typedef {{ ok: false, error: BdJsonError }} BdJsonFailure
 */

/**
 * @typedef {{ ok: true, data: any }} BdProjectionOk
 */

export const BD_EXIT_ERROR = 'bd_exit_error';
export const BD_JSON_INVALID = 'bd_json_invalid';
export const BD_JSON_ENVELOPE_INVALID = 'bd_json_envelope_invalid';
export const BD_JSON_SCHEMA_UNSUPPORTED = 'bd_json_schema_unsupported';
export const BD_JSON_SHAPE_INVALID = 'bd_json_shape_invalid';
export const BD_READBACK_FAILED = 'bd_readback_failed';

const SUPPORTED_SCHEMA_VERSION = 2;

/**
 * Consumer-supported transport formats. Static list proven by this module's
 * tests, kept separate from what a producer was actually observed to emit.
 *
 * @type {readonly string[]}
 */
export const CONSUMER_SUPPORTED_FORMATS = Object.freeze([
  'bare',
  'envelope_v2'
]);

/**
 * Build a failure result. Details are bounded structural facts only; raw
 * payloads, descriptions and notes must never reach an error, log or health
 * surface.
 *
 * @param {string} code
 * @param {string} message
 * @param {BdJsonErrorDetails} [details]
 * @returns {BdJsonFailure}
 */
export function bdJsonFailure(code, message, details) {
  /** @type {BdJsonError} */
  const error = { code, message };
  if (details && Object.keys(details).length > 0) {
    error.details = details;
  }
  return { ok: false, error };
}

/**
 * True when a failed result is a bd JSON protocol fault rather than an ordinary
 * CLI failure.
 *
 * The distinction decides policy everywhere downstream: an ordinary failure may
 * be negative-cached or displayed fail-quiet, a protocol fault may not — caching
 * it would hide a compatibility break behind a normal-looking empty result.
 *
 * @param {unknown} result
 * @returns {boolean}
 */
export function isBdProtocolFailure(result) {
  if (!result || typeof result !== 'object') {
    return false;
  }
  const error = /** @type {{ error?: { code?: unknown } }} */ (result).error;
  const code = error && typeof error.code === 'string' ? error.code : '';
  return (
    code === BD_JSON_INVALID ||
    code === BD_JSON_ENVELOPE_INVALID ||
    code === BD_JSON_SCHEMA_UNSUPPORTED ||
    code === BD_JSON_SHAPE_INVALID
  );
}

/**
 * Describe a value's top-level type for bounded diagnostics.
 *
 * @param {unknown} value
 * @returns {string}
 */
export function describeJsonType(value) {
  if (value === null) {
    return 'null';
  }
  if (Array.isArray(value)) {
    return 'array';
  }
  return typeof value;
}

/**
 * True when the value is a non-null, non-array object.
 *
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * True for an own integer property.
 *
 * @param {Record<string, unknown>} record
 * @param {string} key
 */
function hasOwnInteger(record, key) {
  return Object.hasOwn(record, key) && Number.isInteger(record[key]);
}

/**
 * Read an own non-empty string property, or null.
 *
 * @param {Record<string, unknown>} record
 * @param {string} key
 * @returns {string|null}
 */
function ownNonEmptyString(record, key) {
  if (!Object.hasOwn(record, key)) {
    return null;
  }
  const value = record[key];
  return typeof value === 'string' && value.length > 0 ? value : null;
}

/**
 * Strip the transport envelope from an already-parsed `bd --json` payload.
 *
 * Only an own `data` field marks an envelope candidate; a bare object keeps its
 * own `schema_version` because that field belongs to the payload.
 *
 * @param {unknown} value - Parsed JSON, never a raw string.
 * @returns {BdTransportOk|BdJsonFailure}
 */
export function normalizeBdJsonTransport(value) {
  if (!isRecord(value) || !Object.hasOwn(value, 'data')) {
    return {
      ok: true,
      data: value,
      protocol: { format: 'bare', schema_version: null }
    };
  }

  if (!hasOwnInteger(value, 'schema_version')) {
    return bdJsonFailure(
      BD_JSON_ENVELOPE_INVALID,
      'bd JSON envelope is missing an integer schema_version',
      {
        expected: 'integer schema_version',
        actual: describeJsonType(value.schema_version)
      }
    );
  }

  const schema_version = /** @type {number} */ (value.schema_version);
  if (schema_version !== SUPPORTED_SCHEMA_VERSION) {
    return bdJsonFailure(
      BD_JSON_SCHEMA_UNSUPPORTED,
      `bd JSON schema version ${schema_version} is not supported`,
      { schema_version }
    );
  }

  return {
    ok: true,
    data: value.data,
    protocol: { format: 'envelope', schema_version: SUPPORTED_SCHEMA_VERSION }
  };
}

/**
 * Project a single issue payload.
 *
 * Accepts a bare object or the legacy exactly-one-row array. Requires a
 * non-empty string `id`, and an exact match when `expected_id` is given.
 *
 * @param {unknown} value
 * @param {{ expected_id?: string }} [options]
 * @returns {BdProjectionOk|BdJsonFailure}
 */
export function normalizeBdIssue(value, options = {}) {
  /** @type {unknown} */
  let candidate = value;
  if (Array.isArray(value)) {
    if (value.length !== 1) {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd issue payload must hold exactly one row',
        { expected: 'one issue row', actual: `array(${value.length})` }
      );
    }
    candidate = value[0];
  }

  if (!isRecord(candidate)) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd issue payload is not an object',
      { expected: 'object', actual: describeJsonType(candidate) }
    );
  }

  const id = ownNonEmptyString(candidate, 'id');
  if (id === null) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd issue payload has no usable id',
      {
        expected: 'non-empty string id',
        actual: describeJsonType(candidate.id)
      }
    );
  }

  if (options.expected_id !== undefined && id !== options.expected_id) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd issue payload id does not match the requested id',
      { expected: options.expected_id, actual: id }
    );
  }

  return { ok: true, data: candidate };
}

/**
 * Project an issue list payload: an array whose rows are objects with a
 * non-empty string `id`.
 *
 * @param {unknown} value
 * @returns {BdProjectionOk|BdJsonFailure}
 */
export function normalizeBdIssueList(value) {
  if (!Array.isArray(value)) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd issue list payload is not an array',
      { expected: 'array', actual: describeJsonType(value) }
    );
  }

  for (let i = 0; i < value.length; i++) {
    const row = value[i];
    if (!isRecord(row)) {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd issue list row is not an object',
        { expected: 'object', actual: describeJsonType(row), row_index: i }
      );
    }
    if (ownNonEmptyString(row, 'id') === null) {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd issue list row has no usable id',
        {
          expected: 'non-empty string id',
          actual: describeJsonType(row.id),
          row_index: i
        }
      );
    }
  }

  return { ok: true, data: value };
}

/**
 * Project `bd ready --json` rows. Current bd returns an array; historical
 * builds wrapped the rows in `{ready}` or `{issues}`.
 *
 * @param {unknown} value
 * @returns {BdProjectionOk|BdJsonFailure}
 */
export function normalizeBdReadyRows(value) {
  /** @type {unknown} */
  let rows = value;
  if (isRecord(value)) {
    if (Array.isArray(value.ready)) {
      rows = value.ready;
    } else if (Array.isArray(value.issues)) {
      rows = value.issues;
    } else {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd ready payload has no ready or issues array',
        { expected: 'array or {ready|issues: array}', actual: 'object' }
      );
    }
  }
  return normalizeBdIssueList(rows);
}

/**
 * Project `bd ready --explain --json`: an object carrying a `blocked` array.
 * `ready` stays optional because historical builds omitted it when empty.
 *
 * @param {unknown} value
 * @returns {BdProjectionOk|BdJsonFailure}
 */
export function normalizeBdReadyExplain(value) {
  if (!isRecord(value)) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd ready --explain payload is not an object',
      { expected: 'object', actual: describeJsonType(value) }
    );
  }
  if (!Array.isArray(value.blocked)) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd ready --explain payload has no blocked array',
      { expected: 'array blocked', actual: describeJsonType(value.blocked) }
    );
  }
  return { ok: true, data: value };
}

/**
 * Project `bd config list --json`: a flat config map.
 *
 * Keys and values remain intentionally unconstrained so additive bd config
 * fields do not become compatibility failures.
 *
 * @param {unknown} value
 * @returns {BdProjectionOk|BdJsonFailure}
 */
export function normalizeBdConfigMap(value) {
  if (!isRecord(value)) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd config payload is not an object',
      { expected: 'object', actual: describeJsonType(value) }
    );
  }
  return { ok: true, data: value };
}

/**
 * Project `bd dep list --json` rows.
 *
 * Two shapes are valid per row and both are preserved as-is: a multi-id edge
 * row (`issue_id` + `depends_on_id`) and a single-id issue row (`id`, carrying
 * an extra `dependency_type`). Field interpretation stays with the consumer.
 *
 * @param {unknown} value
 * @returns {BdProjectionOk|BdJsonFailure}
 */
export function normalizeBdDependencyRows(value) {
  if (!Array.isArray(value)) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd dependency payload is not an array',
      { expected: 'array', actual: describeJsonType(value) }
    );
  }

  for (let i = 0; i < value.length; i++) {
    const row = value[i];
    if (!isRecord(row)) {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd dependency row is not an object',
        { expected: 'object', actual: describeJsonType(row), row_index: i }
      );
    }

    const is_edge_row =
      ownNonEmptyString(row, 'issue_id') !== null &&
      ownNonEmptyString(row, 'depends_on_id') !== null;
    const is_issue_row = ownNonEmptyString(row, 'id') !== null;

    if (!is_edge_row && !is_issue_row) {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd dependency row is neither an edge row nor an issue row',
        {
          expected: 'issue_id+depends_on_id or id',
          actual: 'no usable identity',
          row_index: i
        }
      );
    }
  }

  return { ok: true, data: value };
}

/**
 * Project `bd comments <id> --json`: an array of rows carrying a non-empty
 * string `id` and a string `text`. When `expected_issue_id` is given, every
 * row's `issue_id` must match it exactly.
 *
 * @param {unknown} value
 * @param {{ expected_issue_id?: string }} [options]
 * @returns {BdProjectionOk|BdJsonFailure}
 */
export function normalizeBdComments(value, options = {}) {
  if (!Array.isArray(value)) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd comments payload is not an array',
      { expected: 'array', actual: describeJsonType(value) }
    );
  }

  for (let i = 0; i < value.length; i++) {
    const row = value[i];
    if (!isRecord(row)) {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd comment row is not an object',
        { expected: 'object', actual: describeJsonType(row), row_index: i }
      );
    }
    if (ownNonEmptyString(row, 'id') === null) {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd comment row has no usable id',
        {
          expected: 'non-empty string id',
          actual: describeJsonType(row.id),
          row_index: i
        }
      );
    }
    if (typeof row.text !== 'string') {
      return bdJsonFailure(
        BD_JSON_SHAPE_INVALID,
        'bd comment row has no text string',
        {
          expected: 'string text',
          actual: describeJsonType(row.text),
          row_index: i
        }
      );
    }
    if (options.expected_issue_id !== undefined) {
      const issue_id = ownNonEmptyString(row, 'issue_id');
      if (issue_id !== options.expected_issue_id) {
        return bdJsonFailure(
          BD_JSON_SHAPE_INVALID,
          'bd comment row belongs to a different issue',
          {
            expected: options.expected_issue_id,
            actual:
              issue_id === null ? describeJsonType(row.issue_id) : issue_id,
            row_index: i
          }
        );
      }
    }
  }

  return { ok: true, data: value };
}

/**
 * Project `bd version --json`: an object carrying a non-empty string `version`.
 *
 * @param {unknown} value
 * @returns {BdProjectionOk|BdJsonFailure}
 */
export function normalizeBdVersionCapability(value) {
  if (!isRecord(value)) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd version payload is not an object',
      { expected: 'object', actual: describeJsonType(value) }
    );
  }
  const version = ownNonEmptyString(value, 'version');
  if (version === null) {
    return bdJsonFailure(
      BD_JSON_SHAPE_INVALID,
      'bd version payload has no version string',
      {
        expected: 'non-empty string version',
        actual: describeJsonType(value.version)
      }
    );
  }
  return { ok: true, data: value };
}
