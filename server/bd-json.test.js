import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';
import {
  CONSUMER_SUPPORTED_FORMATS,
  normalizeBdComments,
  normalizeBdConfigMap,
  normalizeBdDependencyRows,
  normalizeBdIssue,
  normalizeBdIssueList,
  normalizeBdJsonTransport,
  normalizeBdReadyExplain,
  normalizeBdReadyRows,
  normalizeBdVersionCapability
} from './bd-json.js';
import { resolveSpecId } from './spec-id.js';

const FIXTURE_DIR = path.join(import.meta.dirname, '__fixtures__', 'bd-json');

/**
 * Read one golden fixture file.
 *
 * @param {string} name
 * @returns {any}
 */
function fixture(name) {
  return JSON.parse(readFileSync(path.join(FIXTURE_DIR, name), 'utf8'));
}

const ISSUES = fixture('issues.json');
const PAYLOADS = fixture('payloads.json');

/**
 * Wrap a payload the way `BD_JSON_ENVELOPE=1` does.
 *
 * @param {unknown} data
 */
function envelope(data) {
  return { schema_version: 2, data };
}

describe('normalizeBdJsonTransport', () => {
  test('returns a bare array unchanged', () => {
    const payload = [{ id: 'UI-1' }];

    const result = normalizeBdJsonTransport(payload);

    expect(result).toEqual({
      ok: true,
      data: payload,
      protocol: { format: 'bare', schema_version: null }
    });
  });

  test('returns a bare object unchanged', () => {
    const payload = ISSUES.native_spec_id;

    const result = normalizeBdJsonTransport(payload);

    expect(result).toEqual({
      ok: true,
      data: payload,
      protocol: { format: 'bare', schema_version: null }
    });
  });

  test('keeps an embedded schema_version on a bare object as payload data', () => {
    const payload = PAYLOADS.version;

    const result = normalizeBdJsonTransport(payload);

    expect(result).toMatchObject({
      ok: true,
      protocol: { format: 'bare', schema_version: null }
    });
    expect(result.ok && result.data).toEqual(payload);
  });

  test('unwraps a schema v2 envelope to its inner payload', () => {
    const inner = [{ id: 'UI-1' }, { id: 'UI-2' }];

    const result = normalizeBdJsonTransport(envelope(inner));

    expect(result).toEqual({
      ok: true,
      data: inner,
      protocol: { format: 'envelope', schema_version: 2 }
    });
  });

  test('produces deep-equal data for bare and enveloped payloads', () => {
    const inner = PAYLOADS.comments;

    const bare = normalizeBdJsonTransport(inner);
    const wrapped = normalizeBdJsonTransport(envelope(inner));

    expect(wrapped.ok && wrapped.data).toEqual(bare.ok && bare.data);
  });

  test('does not mutate the input payload', () => {
    const inner = { id: 'UI-1' };
    const wrapper = envelope(inner);
    const snapshot = JSON.parse(JSON.stringify(wrapper));

    normalizeBdJsonTransport(wrapper);

    expect(wrapper).toEqual(snapshot);
  });

  test('rejects an envelope candidate without an integer schema_version', () => {
    const result = normalizeBdJsonTransport({ data: [], schema_version: '2' });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_envelope_invalid' }
    });
  });

  test('rejects an envelope candidate missing schema_version entirely', () => {
    const result = normalizeBdJsonTransport({ data: [] });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_envelope_invalid' }
    });
  });

  test('rejects an unsupported envelope schema version', () => {
    const result = normalizeBdJsonTransport({ schema_version: 3, data: [] });

    expect(result).toMatchObject({
      ok: false,
      error: {
        code: 'bd_json_schema_unsupported',
        details: { schema_version: 3 }
      }
    });
  });

  test('passes a scalar through as bare data for the projector to reject', () => {
    const result = normalizeBdJsonTransport(7);

    expect(result).toEqual({
      ok: true,
      data: 7,
      protocol: { format: 'bare', schema_version: null }
    });
  });
});

describe('normalizeBdIssue', () => {
  test('accepts a bare issue object', () => {
    const result = normalizeBdIssue(ISSUES.native_spec_id);

    expect(result).toEqual({ ok: true, data: ISSUES.native_spec_id });
  });

  test('accepts a legacy single-item array', () => {
    const result = normalizeBdIssue([ISSUES.native_spec_id]);

    expect(result).toEqual({ ok: true, data: ISSUES.native_spec_id });
  });

  test('preserves additive unknown fields', () => {
    const result = normalizeBdIssue(ISSUES.additive_unknown_fields);

    expect(result.ok && result.data.future_field).toEqual({
      nested: [1, 2, 3]
    });
  });

  test('rejects a multi-row array', () => {
    const result = normalizeBdIssue([{ id: 'UI-1' }, { id: 'UI-2' }]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects an empty array', () => {
    const result = normalizeBdIssue([]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects null', () => {
    const result = normalizeBdIssue(null);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects a missing id', () => {
    const result = normalizeBdIssue({ title: 'no id' });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects a non-string id', () => {
    const result = normalizeBdIssue({ id: 12 });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects an id that differs from expected_id', () => {
    const result = normalizeBdIssue(
      { id: 'UI-other' },
      { expected_id: 'UI-1' }
    );

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid', details: { expected: 'UI-1' } }
    });
  });

  test('accepts an id that matches expected_id', () => {
    const result = normalizeBdIssue({ id: 'UI-1' }, { expected_id: 'UI-1' });

    expect(result).toEqual({ ok: true, data: { id: 'UI-1' } });
  });
});

describe('normalizeBdIssueList', () => {
  test('accepts an empty array', () => {
    const result = normalizeBdIssueList([]);

    expect(result).toEqual({ ok: true, data: [] });
  });

  test('rejects a non-array container', () => {
    const result = normalizeBdIssueList({ id: 'UI-1' });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid', details: { expected: 'array' } }
    });
  });

  test('rejects a row without an id and reports its index', () => {
    const result = normalizeBdIssueList([{ id: 'UI-1' }, { title: 'broken' }]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid', details: { row_index: 1 } }
    });
  });

  test('rejects a scalar row', () => {
    const result = normalizeBdIssueList(['UI-1']);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });
});

describe('normalizeBdReadyRows', () => {
  test('accepts the current array shape', () => {
    const rows = [{ id: 'UI-ready' }];

    const result = normalizeBdReadyRows(rows);

    expect(result).toEqual({ ok: true, data: rows });
  });

  test('accepts the historical ready wrapper', () => {
    const rows = [{ id: 'UI-ready' }];

    const result = normalizeBdReadyRows({ ready: rows });

    expect(result).toEqual({ ok: true, data: rows });
  });

  test('accepts the historical issues wrapper', () => {
    const rows = [{ id: 'UI-ready' }];

    const result = normalizeBdReadyRows({ issues: rows });

    expect(result).toEqual({ ok: true, data: rows });
  });

  test('rejects an object carrying neither wrapper', () => {
    const result = normalizeBdReadyRows({ total: 0 });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });
});

describe('normalizeBdReadyExplain', () => {
  test('accepts an explain payload with a blocked array', () => {
    const result = normalizeBdReadyExplain(PAYLOADS.ready_explain);

    expect(result).toEqual({ ok: true, data: PAYLOADS.ready_explain });
  });

  test('rejects an array container', () => {
    const result = normalizeBdReadyExplain([]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects a payload without a blocked array', () => {
    const result = normalizeBdReadyExplain({ ready: [] });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });
});

describe('normalizeBdConfigMap', () => {
  test('accepts a config map', () => {
    const payload = { issue_prefix: 'UI', future_key: 42 };

    const result = normalizeBdConfigMap(payload);

    expect(result).toEqual({ ok: true, data: payload });
  });

  test('rejects a non-object payload', () => {
    const result = normalizeBdConfigMap([]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });
});

describe('normalizeBdDependencyRows', () => {
  test('preserves multi-id edge rows', () => {
    const result = normalizeBdDependencyRows(PAYLOADS.dependency_edge_rows);

    expect(result).toEqual({
      ok: true,
      data: PAYLOADS.dependency_edge_rows
    });
  });

  test('preserves single-id issue rows', () => {
    const result = normalizeBdDependencyRows(PAYLOADS.dependency_issue_rows);

    expect(result).toEqual({
      ok: true,
      data: PAYLOADS.dependency_issue_rows
    });
  });

  test('rejects a row with no usable identity', () => {
    const result = normalizeBdDependencyRows([{}]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid', details: { row_index: 0 } }
    });
  });

  test('rejects an edge row missing depends_on_id', () => {
    const result = normalizeBdDependencyRows([{ issue_id: 'UI-child' }]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects a non-array container', () => {
    const result = normalizeBdDependencyRows({ issue_id: 'UI-child' });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });
});

describe('normalizeBdComments', () => {
  test('accepts a comment array', () => {
    const result = normalizeBdComments(PAYLOADS.comments);

    expect(result).toEqual({ ok: true, data: PAYLOADS.comments });
  });

  test('rejects an empty object row', () => {
    const result = normalizeBdComments([{}]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid', details: { row_index: 0 } }
    });
  });

  test('rejects a row without a text string', () => {
    const result = normalizeBdComments([{ id: '1', text: 5 }]);

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects a row belonging to another issue', () => {
    const result = normalizeBdComments(PAYLOADS.comments, {
      expected_issue_id: 'UI-other'
    });

    expect(result).toMatchObject({
      ok: false,
      error: {
        code: 'bd_json_shape_invalid',
        details: { expected: 'UI-other' }
      }
    });
  });

  test('accepts rows whose issue_id matches expected_issue_id', () => {
    const result = normalizeBdComments(PAYLOADS.comments, {
      expected_issue_id: 'UI-1'
    });

    expect(result).toEqual({ ok: true, data: PAYLOADS.comments });
  });

  test('rejects a comments object instead of an array', () => {
    const result = normalizeBdComments({ comments: [] });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });
});

describe('normalizeBdVersionCapability', () => {
  test('accepts a version payload', () => {
    const result = normalizeBdVersionCapability(PAYLOADS.version);

    expect(result).toEqual({ ok: true, data: PAYLOADS.version });
  });

  test('rejects a payload without a version string', () => {
    const result = normalizeBdVersionCapability({ commit: 'abc' });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });

  test('rejects an empty version string', () => {
    const result = normalizeBdVersionCapability({ version: '' });

    expect(result).toMatchObject({
      ok: false,
      error: { code: 'bd_json_shape_invalid' }
    });
  });
});

describe('spec_id semantics through the adapter', () => {
  test('resolves native spec_id identically for bare and enveloped issues', () => {
    const bare = normalizeBdJsonTransport(ISSUES.native_spec_id);
    const wrapped = normalizeBdJsonTransport(envelope(ISSUES.native_spec_id));

    expect(resolveSpecId(wrapped.ok && wrapped.data)).toEqual(
      resolveSpecId(bare.ok && bare.data)
    );
  });

  test('keeps legacy metadata spec_id readable after envelope unwrap', () => {
    const wrapped = normalizeBdJsonTransport(
      envelope(ISSUES.legacy_metadata_spec_id)
    );

    const projected = normalizeBdIssue(wrapped.ok && wrapped.data);

    expect(resolveSpecId(projected.ok && projected.data)).toEqual(
      resolveSpecId(ISSUES.legacy_metadata_spec_id)
    );
  });

  test('keeps equal dual spec_id semantics after envelope unwrap', () => {
    const wrapped = normalizeBdJsonTransport(
      envelope(ISSUES.equal_dual_spec_id)
    );

    expect(resolveSpecId(wrapped.ok && wrapped.data)).toEqual(
      resolveSpecId(ISSUES.equal_dual_spec_id)
    );
  });

  test('keeps conflicting dual spec_id semantics after envelope unwrap', () => {
    const wrapped = normalizeBdJsonTransport(
      envelope(ISSUES.conflicting_dual_spec_id)
    );

    expect(resolveSpecId(wrapped.ok && wrapped.data)).toEqual(
      resolveSpecId(ISSUES.conflicting_dual_spec_id)
    );
  });
});

describe('CONSUMER_SUPPORTED_FORMATS', () => {
  test('lists exactly the two formats this adapter accepts', () => {
    expect([...CONSUMER_SUPPORTED_FORMATS]).toEqual(['bare', 'envelope_v2']);
  });
});
