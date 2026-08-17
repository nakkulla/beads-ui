import { spawn as spawnMock } from 'node:child_process';
import { EventEmitter } from 'node:events';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PassThrough } from 'node:stream';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  getBdBin,
  getGitUserName,
  kvGetJson,
  kvSetJson,
  runBd,
  runBdJson,
  runShell,
  stderrTail
} from './bd.js';

// Mock child_process.spawn before importing the module under test
vi.mock('node:child_process', () => ({ spawn: vi.fn() }));

/**
 * @param {string} stdoutText
 * @param {string} stderrText
 * @param {number} code
 */
function makeFakeProc(stdoutText, stderrText, code) {
  const cp = /** @type {any} */ (new EventEmitter());
  const out = new PassThrough();
  const err = new PassThrough();
  cp.stdout = out;
  cp.stderr = err;
  // Simulate async emission
  setTimeout(() => {
    if (stdoutText) {
      out.write(stdoutText);
    }
    out.end();
    if (stderrText) {
      err.write(stderrText);
    }
    err.end();
    cp.emit('close', code);
  }, 0);
  return cp;
}

const mockedSpawn = /** @type {import('vitest').Mock} */ (spawnMock);
/** @type {string[]} */
const temp_dirs = [];

function make_temp_dir() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-bd-'));
  temp_dirs.push(dir);
  return dir;
}

beforeEach(() => {
  mockedSpawn.mockReset();
});

afterEach(() => {
  for (const dir of temp_dirs.splice(0)) {
    try {
      fs.rmSync(dir, { recursive: true, force: true });
    } catch {
      // ignore cleanup errors
    }
  }
});

describe('getBdBin', () => {
  test('returns env BD_BIN when set', () => {
    const prev = process.env.BD_BIN;
    process.env.BD_BIN = '/custom/bd';
    expect(getBdBin()).toBe('/custom/bd');
    if (prev) {
      process.env.BD_BIN = prev;
    } else {
      delete process.env.BD_BIN;
    }
  });
});

describe('runBd', () => {
  test('prepends --sandbox by default', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));
    await runBd(['list', '--json']);

    const args = mockedSpawn.mock.calls[0][1];
    expect(args[0]).toBe('--sandbox');
    expect(args.slice(1)).toEqual(['list', '--json']);
  });

  test('does not duplicate --sandbox when caller already provides it', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));
    await runBd(['--sandbox', 'list', '--json']);

    const args = mockedSpawn.mock.calls[0][1];
    expect(args).toEqual(['--sandbox', 'list', '--json']);
  });

  test('allows disabling default sandbox via BDUI_BD_SANDBOX', async () => {
    const prev = process.env.BDUI_BD_SANDBOX;
    process.env.BDUI_BD_SANDBOX = '0';
    mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));

    await runBd(['list', '--json']);

    const args = mockedSpawn.mock.calls[0][1];
    expect(args).toEqual(['list', '--json']);

    if (prev === undefined) {
      delete process.env.BDUI_BD_SANDBOX;
    } else {
      process.env.BDUI_BD_SANDBOX = prev;
    }
  });

  test('allows disabling sandbox per call', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));

    await runBd(['dolt', 'pull'], { sandbox: false });

    const args = mockedSpawn.mock.calls[0][1];
    expect(args).toEqual(['dolt', 'pull']);
  });

  test('returns stdout/stderr and exit code', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));
    const res = await runBd(['--version']);
    expect(res.code).toBe(0);
    expect(res.stdout).toContain('ok');
  });

  test('non-zero exit propagates code and stderr', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', 'boom', 1));
    const res = await runBd(['list']);
    expect(res.code).toBe(1);
    expect(res.stderr).toContain('boom');
  });

  test('sets BEADS_DB for workspace-local SQLite db', async () => {
    const root = make_temp_dir();
    const beads_dir = path.join(root, '.beads');
    fs.mkdirSync(beads_dir, { recursive: true });
    const workspace_db = path.join(beads_dir, 'ui.db');
    fs.writeFileSync(workspace_db, '');

    mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));
    await runBd(['list'], { cwd: root, env: {} });

    const options = mockedSpawn.mock.calls[0][2];
    expect(options.env.BEADS_DB).toBe(workspace_db);
  });

  test('does not force BEADS_DB when workspace has no local SQLite db', async () => {
    const root = make_temp_dir();

    mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));
    await runBd(['list'], { cwd: root, env: {} });

    const options = mockedSpawn.mock.calls[0][2];
    expect(options.env.BEADS_DB).toBeUndefined();
  });

  test('preserves explicit BEADS_DB from caller env', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('ok', '', 0));
    await runBd(['list'], { env: { BEADS_DB: '/custom/workspace.db' } });

    const options = mockedSpawn.mock.calls[0][2];
    expect(options.env.BEADS_DB).toBe('/custom/workspace.db');
  });
});

describe('runBdJson', () => {
  test('parses valid JSON output', async () => {
    const json = JSON.stringify([{ id: 'UI-1' }]);
    mockedSpawn.mockReturnValueOnce(makeFakeProc(json, '', 0));

    const res = await runBdJson(['list', '--json']);

    expect(res).toEqual({
      ok: true,
      data: [{ id: 'UI-1' }],
      protocol: { format: 'bare', schema_version: null }
    });
  });

  test('unwraps schema v2 envelope output', async () => {
    const issue_rows = [{ id: 'UI-1' }];
    const json = JSON.stringify({ schema_version: 2, data: issue_rows });
    mockedSpawn.mockReturnValueOnce(makeFakeProc(json, '', 0));

    const res = await runBdJson(['list', '--json']);

    expect(res).toEqual({
      ok: true,
      data: issue_rows,
      protocol: { format: 'envelope', schema_version: 2 }
    });
  });

  test('rejects invalid JSON at exit zero', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('not-json', '', 0));

    const res = await runBdJson(['list', '--json']);

    expect(res).toMatchObject({
      ok: false,
      error: { code: 'bd_json_invalid' }
    });
    expect('data' in res).toBe(false);
  });

  test('non-zero exit fails with the exit code in its details', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', 'oops', 2));

    const res = await runBdJson(['list', '--json']);

    expect(res).toMatchObject({
      ok: false,
      error: { code: 'bd_exit_error', details: { exit_code: 2 } }
    });
    expect(res.ok === false && res.error.message).toContain('oops');
  });
});

describe('kvGetJson', () => {
  test('returns the parsed object for a stored JSON value', async () => {
    const payload = JSON.stringify({
      found: true,
      key: 'workflow_session_defaults',
      value: JSON.stringify({ schema: 1, workflow_mode: 'fast_track' })
    });
    mockedSpawn.mockReturnValueOnce(makeFakeProc(payload, '', 0));

    const res = await kvGetJson('workflow_session_defaults');

    expect(res.ok).toBe(true);
    expect(res.value).toEqual({ schema: 1, workflow_mode: 'fast_track' });
  });

  test('returns a stored JSON value from a schema v2 envelope', async () => {
    const stored_value = { schema: 1, workflow_mode: 'fast_track' };
    const payload = JSON.stringify({
      schema_version: 2,
      data: {
        found: true,
        key: 'workflow_session_defaults',
        value: JSON.stringify(stored_value)
      }
    });
    mockedSpawn.mockReturnValueOnce(makeFakeProc(payload, '', 0));

    const res = await kvGetJson('workflow_session_defaults');

    expect(res).toEqual({ ok: true, value: stored_value });
  });

  test('calls bd kv get with the json flag', async () => {
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(JSON.stringify({ found: false, value: '' }), '', 0)
    );

    await kvGetJson('workflow_session_defaults');

    const args = mockedSpawn.mock.calls[0][1];
    expect(args.slice(-4)).toEqual([
      'kv',
      'get',
      'workflow_session_defaults',
      '--json'
    ]);
  });

  test('returns undefined value when the key is absent', async () => {
    // Real bd prints the `{found: false}` envelope AND exits 1 for a missing
    // key — the envelope is authoritative over the exit code.
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(JSON.stringify({ found: false, value: '' }), '', 1)
    );

    const res = await kvGetJson('workflow_session_defaults');

    expect(res.ok).toBe(true);
    expect(res.value).toBeUndefined();
    expect(res.warning).toBeUndefined();
  });

  test('returns undefined value when the key is absent with exit 0', async () => {
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(JSON.stringify({ found: false, value: '' }), '', 0)
    );

    const res = await kvGetJson('workflow_session_defaults');

    expect(res.ok).toBe(true);
    expect(res.value).toBeUndefined();
    expect(res.warning).toBeUndefined();
  });

  test('returns undefined value plus a warning when the value is unparsable', async () => {
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(JSON.stringify({ found: true, value: 'not-json{' }), '', 0)
    );

    const res = await kvGetJson('workflow_session_defaults');

    expect(res.ok).toBe(true);
    expect(res.value).toBeUndefined();
    expect(res.warning).toBe('kv_value_unparsable');
  });

  test('returns undefined value plus a warning when the value is not an object', async () => {
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(JSON.stringify({ found: true, value: '[1,2]' }), '', 0)
    );

    const res = await kvGetJson('workflow_session_defaults');

    expect(res.value).toBeUndefined();
    expect(res.warning).toBe('kv_value_unparsable');
  });

  test('fails closed on invalid JSON at exit zero instead of reading absent', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('not-json', '', 0));

    const res = await kvGetJson('workflow_session_defaults');

    expect(res).toEqual({ ok: false, error: 'bd_json_invalid' });
  });

  test('fails closed on a payload without a boolean found flag', async () => {
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(JSON.stringify({ key: 'k', value: '{}' }), '', 0)
    );

    const res = await kvGetJson('workflow_session_defaults');

    expect(res).toEqual({ ok: false, error: 'bd_json_shape_invalid' });
  });

  test('fails closed on an unsupported envelope schema', async () => {
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(JSON.stringify({ schema_version: 3, data: {} }), '', 0)
    );

    const res = await kvGetJson('workflow_session_defaults');

    expect(res).toEqual({ ok: false, error: 'bd_json_schema_unsupported' });
  });

  test('keeps the exit-1 absent record a successful empty read', async () => {
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(JSON.stringify({ found: false }), '', 1)
    );

    const res = await kvGetJson('workflow_session_defaults');

    expect(res).toEqual({ ok: true, value: undefined });
  });

  test('propagates a bd failure to the caller', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', 'db locked', 3));

    const res = await kvGetJson('workflow_session_defaults');

    expect(res.ok).toBe(false);
    expect(res.error).toContain('db locked');
  });
});

describe('kvSetJson', () => {
  test('writes the value as a JSON string argument', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', '', 0));

    const res = await kvSetJson('workflow_session_defaults', {
      schema: 1,
      workflow_mode: 'standard'
    });

    expect(res.ok).toBe(true);
    expect(mockedSpawn.mock.calls[0][1].slice(-3)).toEqual([
      'set',
      'workflow_session_defaults',
      JSON.stringify({ schema: 1, workflow_mode: 'standard' })
    ]);
  });

  test('round-trips a written value through kvGetJson', async () => {
    const written = { schema: 1, impl_dispatch: 'main' };
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', '', 0));
    mockedSpawn.mockReturnValueOnce(
      makeFakeProc(
        JSON.stringify({ found: true, value: JSON.stringify(written) }),
        '',
        0
      )
    );

    await kvSetJson('workflow_session_defaults', written);
    const res = await kvGetJson('workflow_session_defaults');

    expect(res.value).toEqual(written);
  });

  test('propagates a bd write failure to the caller', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', 'read-only db', 1));

    const res = await kvSetJson('workflow_session_defaults', { schema: 1 });

    expect(res.ok).toBe(false);
    expect(res.error).toContain('read-only db');
  });
});

describe('runShell', () => {
  test('runs given binary with args without sandbox prepend', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('out', '', 0));
    const res = await runShell('git', ['pull', '--rebase', '--autostash'], {
      cwd: '/repo-a'
    });
    expect(res.code).toBe(0);
    expect(res.stdout).toBe('out');

    const callArgs = mockedSpawn.mock.calls[0];
    expect(callArgs[0]).toBe('git');
    expect(callArgs[1]).toEqual(['pull', '--rebase', '--autostash']);
    expect(callArgs[2].cwd).toBe('/repo-a');
    expect(callArgs[2].shell).toBe(false);
  });

  test('returns stderr and non-zero code on failure', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', 'CONFLICT (content)', 1));
    const res = await runShell('git', ['pull'], { cwd: '/repo-a' });
    expect(res.code).toBe(1);
    expect(res.stderr).toContain('CONFLICT');
  });

  test('normalizes ENOENT to non-zero code', async () => {
    const cp = /** @type {any} */ (new EventEmitter());
    cp.stdout = new PassThrough();
    cp.stderr = new PassThrough();
    setTimeout(() => {
      cp.stdout.end();
      cp.stderr.end();
      cp.emit(
        'error',
        Object.assign(new Error('not found'), { code: 'ENOENT' })
      );
    }, 0);
    mockedSpawn.mockReturnValueOnce(cp);

    const res = await runShell('git-missing', ['pull'], { cwd: '/repo-a' });
    expect(res.code).not.toBe(0);
  });

  test('does not use bd run queue (parallel git ops)', async () => {
    let active = 0;
    let max_active = 0;
    mockedSpawn.mockImplementation(() => {
      active += 1;
      if (active > max_active) max_active = active;
      const cp = /** @type {any} */ (new EventEmitter());
      cp.stdout = new PassThrough();
      cp.stderr = new PassThrough();
      setTimeout(() => {
        cp.stdout.end();
        cp.stderr.end();
        active -= 1;
        cp.emit('close', 0);
      }, 5);
      return cp;
    });

    await Promise.all([
      runShell('git', ['status'], { cwd: '/r1' }),
      runShell('git', ['status'], { cwd: '/r2' })
    ]);

    expect(max_active).toBe(2);
  });

  test('times out a command by terminating its process group before resolving', async () => {
    const cp = /** @type {any} */ (new EventEmitter());
    cp.pid = 12345;
    cp.stdout = new PassThrough();
    cp.stderr = new PassThrough();
    cp.kill = vi.fn(() => {
      cp.emit('close', null);
    });
    const kill = vi.spyOn(process, 'kill').mockImplementation(() => {
      throw new Error('group already exited');
    });
    mockedSpawn.mockReturnValueOnce(cp);

    try {
      const result = await runShell('git', ['fetch'], {
        cwd: '/repo-a',
        timeout_ms: 1
      });

      expect(result.code).toBe(124);
      if (process.platform !== 'win32') {
        expect(kill).toHaveBeenCalledWith(-12345, 'SIGKILL');
      }
      expect(cp.kill).toHaveBeenCalledWith('SIGKILL');
    } finally {
      kill.mockRestore();
    }
  });
});

describe('stderrTail', () => {
  test('returns empty string for empty input', () => {
    expect(stderrTail('')).toBe('');
    expect(stderrTail(null)).toBe('');
    expect(stderrTail(undefined)).toBe('');
  });

  test('returns last non-empty line', () => {
    expect(stderrTail('first\nsecond\n\n')).toBe('second');
  });

  test('truncates very long line to 200 chars', () => {
    const long = 'x'.repeat(500);
    const out = stderrTail(long);
    expect(out.length).toBe(200);
    expect(out.startsWith('xxx')).toBe(true);
  });

  test('handles single-line input without trailing newline', () => {
    expect(stderrTail('only line')).toBe('only line');
  });
});

describe('getGitUserName', () => {
  test('returns git user name on success', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('Alice Smith\n', '', 0));
    const name = await getGitUserName();
    expect(name).toBe('Alice Smith');
  });

  test('returns empty string on failure', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', 'error', 1));
    const name = await getGitUserName();
    expect(name).toBe('');
  });
});
