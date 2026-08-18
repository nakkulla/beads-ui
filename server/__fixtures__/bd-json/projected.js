/**
 * Test support for the projected bd JSON runner.
 *
 * Tests describe what bd PRINTS (`{code, stdoutJson}`) and run it through the
 * same projectors production uses, so a fixture cannot drift from the real
 * shape contract. This lives under `__fixtures__` because it is test-only
 * scaffolding and must stay out of the production ownership inventory.
 */
import {
  normalizeBdComments,
  normalizeBdDependencyRows,
  normalizeBdIssue,
  normalizeBdIssueList,
  normalizeBdReadyExplain,
  normalizeBdReadyRows,
  normalizeBdVersionCapability
} from '../../bd-json.js';

/**
 * Project a transport-shaped fixture for one command family.
 *
 * @param {string} command_family
 * @param {unknown} payload
 * @param {{ expected_id?: string, expected_issue_id?: string }} [options]
 * @returns {any}
 */
function project(command_family, payload, options = {}) {
  switch (command_family) {
    case 'show':
      return normalizeBdIssue(payload, { expected_id: options.expected_id });
    case 'ready':
      return normalizeBdReadyRows(payload);
    case 'ready-explain':
      return normalizeBdReadyExplain(payload);
    case 'dep':
      return normalizeBdDependencyRows(payload);
    case 'comments':
      return normalizeBdComments(payload, {
        expected_issue_id: options.expected_issue_id
      });
    case 'version':
      return normalizeBdVersionCapability(payload);
    default:
      return normalizeBdIssueList(payload);
  }
}

/**
 * Infer which command family produced a transport-shaped fixture.
 *
 * @param {any} payload
 * @returns {string}
 */
function inferFamily(payload) {
  if (Array.isArray(payload)) {
    return payload.some(
      (row) => row && typeof row === 'object' && 'issue_id' in row
    )
      ? 'dep'
      : payload.some((row) => row && typeof row === 'object' && 'text' in row)
        ? 'comments'
        : 'list';
  }
  if (payload && typeof payload === 'object') {
    if (Array.isArray(payload.blocked)) {
      return 'ready-explain';
    }
    if (typeof payload.version === 'string') {
      return 'version';
    }
    return 'show';
  }
  return 'list';
}

/**
 * Convert a transport-shaped `bd --json` fixture into a projected result.
 *
 * @param {string|null} command_family - null infers the family from the payload.
 * @param {{ code?: number, stdoutJson?: unknown, stderr?: string } | null | undefined} raw
 * @param {{ expected_id?: string, expected_issue_id?: string }} [options]
 * @returns {any}
 */
export function projectedResponse(command_family, raw, options = {}) {
  if (!raw || raw.code !== 0) {
    return {
      ok: false,
      error: {
        code: 'bd_exit_error',
        message: String((raw && raw.stderr) || 'bd failed'),
        details: { exit_code: raw ? raw.code : null }
      }
    };
  }
  const projected = project(
    command_family || inferFamily(raw.stdoutJson),
    raw.stdoutJson,
    options
  );
  if (!projected.ok) {
    return projected;
  }
  return {
    ok: true,
    protocol: { format: 'bare', schema_version: null },
    data: projected.data
  };
}

/**
 * Wrap a transport-shaped fake so it satisfies the projected runner contract.
 *
 * @param {(args: string[], options?: any) => Promise<any>} fake
 * @returns {any}
 */
export function asProjectedRunner(fake) {
  return async (
    /** @type {string} */ command_family,
    /** @type {string[]} */ args,
    /** @type {any} */ options = {}
  ) => projectedResponse(command_family, await fake(args, options), options);
}
