import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from 'vitest';

const REPO_ROOT = path.join(import.meta.dirname, '..');
const SCANNED_DIRS = ['server', 'scripts'];

/**
 * Production files allowed to name the temporary Phase 1 compatibility fields
 * or the retired show unwrapper.
 *
 * The list is empty on purpose: once every consumer reads the discriminated
 * result, no production file may reach for a raw bd JSON payload again. A new
 * bd JSON caller that skips the typed adapter therefore fails this test until
 * it is migrated and added to the compatibility matrix.
 *
 * @type {string[]}
 */
const RAW_PAYLOAD_ALLOWLIST = [];

/**
 * Production files allowed to parse bd stdout. Only the transport boundary does.
 *
 * @type {string[]}
 */
const BD_STDOUT_PARSE_ALLOWLIST = ['server/bd.js'];

/**
 * Production files allowed to call a `normalizeBd*` projector directly.
 *
 * Consumers must go through `runBdJsonProjected`, the single owner of protocol
 * observation; calling a projector directly records no observation and would
 * leave a shape failure invisible to `/healthz` and the effect preflight.
 *
 * @type {string[]}
 */
const RAW_RUNNER_ALLOWLIST = [
  // The capability probe and the effect gate need the un-projected runner: the
  // probe IS what decides which shapes this build understands, so it cannot ask
  // the projected path for permission first.
  'scripts/bd-json-smoke.js',
  'server/bd-effect-gate.js',
  'server/bd.js',
  'server/health.js'
];

/**
 * Production files allowed to call a `normalizeBd*` projector directly.
 *
 * Consumers must go through `runBdJsonProjected`, the single owner of protocol
 * observation; calling a projector directly records no observation and would
 * leave a shape failure invisible to `/healthz` and the effect preflight.
 *
 * @type {string[]}
 */
const DIRECT_PROJECTOR_ALLOWLIST = [
  // The disposable smoke is the one caller that MUST project by hand: it runs
  // real bd in both producer modes and compares the two raw payloads, which is
  // the parity claim itself. Routing it through the shared runner would compare
  // the boundary with itself.
  'scripts/bd-json-smoke.js',
  'server/bd-capability.js',
  'server/bd-json.js',
  'server/bd.js'
];

/**
 * List repo-relative production `.js` files under the scanned directories.
 *
 * The inventory is built in Node rather than by shelling out to a grep tool:
 * `server/worker/revise-parked.js` contains NUL bytes, which makes some tools
 * treat it as binary and silently drop it from the scan.
 *
 * @returns {string[]}
 */
function productionFiles() {
  /** @type {string[]} */
  const files = [];

  /**
   * @param {string} dir - Repo-relative directory.
   */
  const walk = (dir) => {
    const entries = readdirSync(path.join(REPO_ROOT, dir), {
      withFileTypes: true
    });
    for (const entry of entries) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) {
        if (entry.name === '__fixtures__' || entry.name === 'node_modules') {
          continue;
        }
        walk(rel);
        continue;
      }
      if (!entry.name.endsWith('.js') || entry.name.endsWith('.test.js')) {
        continue;
      }
      files.push(rel);
    }
  };

  for (const dir of SCANNED_DIRS) {
    walk(dir);
  }
  return files.sort();
}

/**
 * Repo-relative production files whose text matches the pattern.
 *
 * @param {RegExp} pattern
 * @returns {string[]}
 */
function filesMatching(pattern) {
  return productionFiles().filter((file) =>
    pattern.test(readFileSync(path.join(REPO_ROOT, file), 'utf8'))
  );
}

/**
 * Production files that reach the bd CLI: the bd module itself plus everything
 * importing from it.
 *
 * Scoping the guards to this set keeps them from flagging code that parses a
 * different tool's stdout — `server/routes/*-usage.js` read `codex`/`claude`
 * output and have nothing to do with the bd JSON protocol.
 *
 * @returns {string[]}
 */
function bdConsumerFiles() {
  return filesMatching(/from '(\.{1,2}\/)+bd\.js'/)
    .concat('server/bd.js')
    .sort();
}

/**
 * Repo-relative bd consumer files whose text matches the pattern.
 *
 * @param {RegExp} pattern
 * @returns {string[]}
 */
function bdConsumersMatching(pattern) {
  return bdConsumerFiles().filter((file) =>
    pattern.test(readFileSync(path.join(REPO_ROOT, file), 'utf8'))
  );
}

describe('bd JSON ownership', () => {
  test('includes the NUL-containing worker file in the inventory', () => {
    expect(productionFiles()).toContain('server/worker/revise-parked.js');
  });

  test('no production file reads a raw bd JSON payload', () => {
    const files = filesMatching(/\bstdoutJson\b|\bunwrapShowJson\b/);

    expect(files).toEqual(RAW_PAYLOAD_ALLOWLIST);
  });

  test('only the transport boundary parses bd stdout', () => {
    const files = bdConsumersMatching(/JSON\.parse\(\s*result\.stdout/);

    expect(files).toEqual(BD_STDOUT_PARSE_ALLOWLIST);
  });

  test('consumers do not bypass the observation owner to call a projector', () => {
    const files = filesMatching(/\bnormalizeBd[A-Za-z]*\(/);

    expect(files).toEqual(DIRECT_PROJECTOR_ALLOWLIST);
  });

  test('only the boundary and its probes use the un-projected runner', () => {
    const files = filesMatching(/\brunBdJson\b(?!Projected)/);

    expect(files).toEqual(RAW_RUNNER_ALLOWLIST);
  });

  test('the retired show unwrapper is gone from the bd module', () => {
    const bd_source = readFileSync(
      path.join(REPO_ROOT, 'server/bd.js'),
      'utf8'
    );

    expect(bd_source).not.toContain('export function unwrapShowJson');
  });

  test('every bd JSON consumer appears in the compatibility matrix document', () => {
    const matrix = readFileSync(
      path.join(REPO_ROOT, 'docs/bd-json-compatibility.md'),
      'utf8'
    );
    const consumers = filesMatching(
      /\brunBdJsonProjected\b|\bkvGetJson\b|\bkvSetJson\b/
    ).filter((file) => file !== 'server/bd.js');

    const undocumented = consumers.filter((file) => !matrix.includes(file));

    expect(undocumented).toEqual([]);
  });
});
