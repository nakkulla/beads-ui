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
    expect(res.code).toBe(0);
    expect(Array.isArray(res.stdoutJson)).toBe(true);
  });

  test('invalid JSON yields stderr message with code 0', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('not-json', '', 0));
    const res = await runBdJson(['list', '--json']);
    expect(res.code).toBe(0);
    expect(res.stderr).toContain('Invalid JSON');
  });

  test('non-zero exit returns code and stderr', async () => {
    mockedSpawn.mockReturnValueOnce(makeFakeProc('', 'oops', 2));
    const res = await runBdJson(['list', '--json']);
    expect(res.code).toBe(2);
    expect(res.stderr).toContain('oops');
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
