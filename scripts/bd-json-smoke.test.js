import { existsSync, readFileSync, rmSync } from 'node:fs';
import { mkdtempSync } from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import {
  INHERITED_OVERRIDES,
  SHARED_DOLT_PORT,
  buildEnv,
  canonicalJson,
  reserveLoopbackPort,
  resolveExecutable,
  withoutSchemaMarker
} from './bd-json-smoke.js';

const SMOKE_SOURCE = readFileSync(
  path.join(import.meta.dirname, 'bd-json-smoke.js'),
  'utf8'
);

/** @type {string[]} */
let temp_roots = [];

afterEach(() => {
  for (const root of temp_roots) {
    rmSync(root, { recursive: true, force: true });
  }
  temp_roots = [];
});

/**
 * Create a disposable root for env-building tests.
 *
 * @returns {string}
 */
function makeTempRoot() {
  const root = mkdtempSync(path.join(os.tmpdir(), 'bd-json-smoke-test-'));
  temp_roots.push(root);
  return root;
}

describe('canonicalJson', () => {
  test('treats key order as irrelevant', () => {
    const first = canonicalJson({ a: 1, b: { c: 2, d: 3 } });
    const second = canonicalJson({ b: { d: 3, c: 2 }, a: 1 });

    expect(first).toEqual(second);
  });

  test('matches a bare payload against its enveloped inner payload', () => {
    const bare = { id: 'UI-1', title: 'x', schema_version: 2 };
    const inner = { title: 'x', id: 'UI-1' };

    expect(canonicalJson(bare)).toEqual(canonicalJson(inner));
  });

  test('still reports a real data difference', () => {
    const first = canonicalJson({ id: 'UI-1', status: 'open' });
    const second = canonicalJson({ id: 'UI-1', status: 'closed' });

    expect(first).not.toEqual(second);
  });

  test('keeps array order significant', () => {
    const first = canonicalJson([{ id: 'a' }, { id: 'b' }]);
    const second = canonicalJson([{ id: 'b' }, { id: 'a' }]);

    expect(first).not.toEqual(second);
  });
});

describe('withoutSchemaMarker', () => {
  test('drops a top-level schema_version field', () => {
    const result = withoutSchemaMarker({ id: 'UI-1', schema_version: 2 });

    expect(result).toEqual({ id: 'UI-1' });
  });

  test('leaves a nested schema_version alone', () => {
    const result = withoutSchemaMarker({
      id: 'UI-1',
      meta: { schema_version: 2 }
    });

    expect(result).toEqual({ id: 'UI-1', meta: { schema_version: 2 } });
  });

  test('returns arrays unchanged', () => {
    const rows = [{ id: 'UI-1' }];

    expect(withoutSchemaMarker(rows)).toBe(rows);
  });
});

describe('buildEnv', () => {
  test('strips every inherited bd override', () => {
    const root = makeTempRoot();
    const previous = process.env.BEADS_DB;
    process.env.BEADS_DB = '/live/beads.db';

    const env = buildEnv(root);

    process.env.BEADS_DB = previous;
    for (const key of INHERITED_OVERRIDES) {
      expect(Object.hasOwn(env, key)).toBe(false);
    }
  });

  test('points HOME and the XDG directories inside the temp root', () => {
    const root = makeTempRoot();

    const env = buildEnv(root);

    for (const key of [
      'HOME',
      'XDG_CONFIG_HOME',
      'XDG_DATA_HOME',
      'XDG_STATE_HOME',
      'XDG_RUNTIME_DIR',
      'TMPDIR'
    ]) {
      expect(env[key].startsWith(root + path.sep)).toBe(true);
    }
  });

  test('creates the directories it advertises', () => {
    const root = makeTempRoot();

    const env = buildEnv(root);

    expect(existsSync(env.HOME)).toBe(true);
    expect(existsSync(env.TMPDIR)).toBe(true);
  });
});

describe('resolveExecutable', () => {
  test('resolves a binary on PATH to an absolute path', () => {
    const resolved = resolveExecutable('node');

    expect(path.isAbsolute(resolved)).toBe(true);
  });

  test('throws instead of skipping when the binary is missing', () => {
    expect(() => resolveExecutable('definitely-not-a-real-binary-xyz')).toThrow(
      /refuses to run/
    );
  });

  test('throws for an explicit path that does not exist', () => {
    expect(() => resolveExecutable('/nonexistent/bin/dolt')).toThrow(
      /does not exist/
    );
  });
});

describe('reserveLoopbackPort', () => {
  test('returns a port that is free to bind', async () => {
    const port = await reserveLoopbackPort();

    await new Promise((resolve, reject) => {
      const server = net.createServer();
      server.once('error', reject);
      server.listen(port, '127.0.0.1', () => server.close(resolve));
    });
  });

  test('never returns the shared bd Dolt port', async () => {
    const port = await reserveLoopbackPort();

    expect(port).not.toBe(SHARED_DOLT_PORT);
  });
});

describe('smoke isolation guards', () => {
  test('refuses to bind the shared Dolt port', () => {
    expect(SHARED_DOLT_PORT).toBe(13307);
    expect(SMOKE_SOURCE).toContain('reserved the shared Dolt port');
  });

  test('removes only its own temp root', () => {
    expect(SMOKE_SOURCE).toContain(
      'rmSync(temp_root, { recursive: true, force: true })'
    );
    expect(SMOKE_SOURCE).not.toContain("rmSync('/");
  });

  test('verifies the repository checkout is unchanged before reporting success', () => {
    expect(SMOKE_SOURCE).toContain('smoke changed this repository checkout');
  });

  test('terminates its own Dolt child rather than a matched process name', () => {
    expect(SMOKE_SOURCE).toContain("server.kill('SIGTERM')");
    expect(SMOKE_SOURCE).toContain("server.kill('SIGKILL')");
    expect(SMOKE_SOURCE).not.toContain('pkill');
  });

  test('never falls back to live state when a preflight fails', () => {
    expect(SMOKE_SOURCE).toContain('smoke preflight failed');
    expect(SMOKE_SOURCE).not.toContain('BEADS_DB =');
  });
});
