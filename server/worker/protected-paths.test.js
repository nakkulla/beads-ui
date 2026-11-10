import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { checkProtectedPaths, collectChangedPaths } from './protected-paths.js';

const OID_A = 'a'.repeat(40);
const OID_B = 'b'.repeat(40);
const OID_C = 'c'.repeat(40);
const OID_ZERO = '0'.repeat(40);

describe('collectChangedPaths', () => {
  /**
   * @param {Record<string, { code?: number, stdout?: string }|Error>} by_range
   * @returns {{ run: (args: string[], options: { cwd?: string }) => Promise<any>, calls: { args: string[], cwd?: string }[] }}
   */
  function makeGit(by_range) {
    /** @type {{ args: string[], cwd?: string }[]} */
    const calls = [];
    return {
      calls,
      run: async (args, options) => {
        calls.push({ args, cwd: options.cwd });
        const reply = by_range[args.slice(-2).join('..')];
        if (reply instanceof Error) {
          throw reply;
        }
        return { code: 0, stdout: '', stderr: '', ...reply };
      }
    };
  }

  test('unions the paths of every base line in first-seen order', async () => {
    const git = makeGit({
      [`${OID_A}..${OID_B}`]: { stdout: 'one.js\0two.js\0' },
      [`${OID_B}..${OID_C}`]: { stdout: 'two.js\0three.js\0' }
    });

    const result = await collectChangedPaths({
      entries: [
        { remote_ref: 'refs/heads/main', remote_oid: OID_A, local_oid: OID_B },
        { remote_ref: 'refs/heads/main', remote_oid: OID_B, local_oid: OID_C }
      ],
      base_ref: 'refs/heads/main',
      gitRun: git.run,
      cwd: '/repo'
    });

    expect(result).toEqual({
      ok: true,
      paths: ['one.js', 'two.js', 'three.js']
    });
  });

  test('ignores push lines that target other refs', async () => {
    const git = makeGit({ [`${OID_A}..${OID_B}`]: { stdout: 'kept.js\0' } });

    const result = await collectChangedPaths({
      entries: [
        {
          remote_ref: 'refs/heads/topic',
          remote_oid: OID_ZERO,
          local_oid: OID_C
        },
        { remote_ref: 'refs/heads/main', remote_oid: OID_A, local_oid: OID_B }
      ],
      base_ref: 'refs/heads/main',
      gitRun: git.run,
      cwd: '/repo'
    });

    expect(result).toEqual({ ok: true, paths: ['kept.js'] });
    expect(git.calls).toHaveLength(1);
  });

  test('reports range_unknown when no line targets the base', async () => {
    const git = makeGit({});

    const result = await collectChangedPaths({
      entries: [
        { remote_ref: 'refs/heads/topic', remote_oid: OID_A, local_oid: OID_B }
      ],
      base_ref: 'refs/heads/main',
      gitRun: git.run,
      cwd: '/repo'
    });

    expect(result).toEqual({ ok: false, reason: 'range_unknown' });
  });

  test('reports range_unknown when a remote_oid is all zeros', async () => {
    const git = makeGit({ [`${OID_A}..${OID_B}`]: { stdout: 'a.js\0' } });

    const result = await collectChangedPaths({
      entries: [
        { remote_ref: 'refs/heads/main', remote_oid: OID_A, local_oid: OID_B },
        {
          remote_ref: 'refs/heads/main',
          remote_oid: OID_ZERO,
          local_oid: OID_C
        }
      ],
      base_ref: 'refs/heads/main',
      gitRun: git.run,
      cwd: '/repo'
    });

    expect(result).toEqual({ ok: false, reason: 'range_unknown' });
  });

  test('reports git_error when git exits non-zero', async () => {
    const git = makeGit({ [`${OID_A}..${OID_B}`]: { code: 128 } });

    const result = await collectChangedPaths({
      entries: [
        { remote_ref: 'refs/heads/main', remote_oid: OID_A, local_oid: OID_B }
      ],
      base_ref: 'refs/heads/main',
      gitRun: git.run,
      cwd: '/repo'
    });

    expect(result).toEqual({ ok: false, reason: 'git_error' });
  });

  test('reports git_error when git throws', async () => {
    const git = makeGit({ [`${OID_A}..${OID_B}`]: new Error('spawn failed') });

    const result = await collectChangedPaths({
      entries: [
        { remote_ref: 'refs/heads/main', remote_oid: OID_A, local_oid: OID_B }
      ],
      base_ref: 'refs/heads/main',
      gitRun: git.run,
      cwd: '/repo'
    });

    expect(result).toEqual({ ok: false, reason: 'git_error' });
  });

  test('splits NUL-separated output so non-ASCII paths stay verbatim', async () => {
    const git = makeGit({
      [`${OID_A}..${OID_B}`]: { stdout: 'docs/한글 문서.md\0src/a b.js\0' }
    });

    const result = await collectChangedPaths({
      entries: [
        { remote_ref: 'refs/heads/main', remote_oid: OID_A, local_oid: OID_B }
      ],
      base_ref: 'refs/heads/main',
      gitRun: git.run,
      cwd: '/repo'
    });

    expect(result).toEqual({
      ok: true,
      paths: ['docs/한글 문서.md', 'src/a b.js']
    });
  });

  test('runs git diff with -z and --no-renames in the given cwd', async () => {
    const git = makeGit({ [`${OID_A}..${OID_B}`]: { stdout: '' } });

    await collectChangedPaths({
      entries: [
        { remote_ref: 'refs/heads/main', remote_oid: OID_A, local_oid: OID_B }
      ],
      base_ref: 'refs/heads/main',
      gitRun: git.run,
      cwd: '/repo'
    });

    expect(git.calls[0]).toEqual({
      args: ['diff', '--name-only', '--no-renames', '-z', OID_A, OID_B],
      cwd: '/repo'
    });
  });
});

describe('checkProtectedPaths', () => {
  /** @type {string} */
  let root;
  /** @type {string} */
  let checker;

  beforeEach(() => {
    root = fs.mkdtempSync(path.join(os.tmpdir(), 'protected-paths-'));
    const dir = path.join(root, 'src/shared/skills/flow/workflow/scripts');
    fs.mkdirSync(dir, { recursive: true });
    checker = path.join(dir, 'check-protected-paths.py');
  });

  afterEach(() => {
    fs.rmSync(root, { recursive: true, force: true });
  });

  /** @param {string} body */
  function writeChecker(body) {
    fs.writeFileSync(checker, body);
  }

  /** @param {Record<string, unknown>} [extra] */
  function run(extra = {}) {
    return checkProtectedPaths({
      paths: ['a.js', 'b/c.md'],
      rig: 'demo-rig',
      cwd: root,
      dotfiles_root: root,
      python: 'python3',
      timeout_ms: 5000,
      ...extra
    });
  }

  test('returns the protected list from exit 0 JSON', async () => {
    writeChecker(
      'import json\nprint(json.dumps({"rig": "x", "protected": ["b/c.md"]}))\n'
    );

    const result = await run();

    expect(result).toEqual({ ok: true, protected: ['b/c.md'] });
  });

  test('returns an empty list when nothing is protected', async () => {
    writeChecker('print(\'{"rig": "x", "protected": []}\')\n');

    const result = await run();

    expect(result).toEqual({ ok: true, protected: [] });
  });

  test('passes --rig and the paths on stdin', async () => {
    writeChecker(
      [
        'import json, sys',
        'rig = sys.argv[sys.argv.index("--rig") + 1]',
        'lines = sys.stdin.read().split("\\n")',
        'json_flag = "--json" in sys.argv',
        'print(json.dumps({"protected": [rig, str(json_flag)] + lines}))',
        ''
      ].join('\n')
    );

    const result = await run();

    expect(result).toEqual({
      ok: true,
      protected: ['demo-rig', 'True', 'a.js', 'b/c.md', '']
    });
  });

  test('reports checker_exit_2 for a non-zero exit', async () => {
    writeChecker('import sys\nsys.exit(2)\n');

    const result = await run();

    expect(result).toEqual({ ok: false, reason: 'checker_exit_2' });
  });

  test('reports bad_json when stdout is not JSON', async () => {
    writeChecker('print("not json")\n');

    const result = await run();

    expect(result).toEqual({ ok: false, reason: 'bad_json' });
  });

  test('reports bad_json when protected is not a string array', async () => {
    writeChecker('print(\'{"protected": [1, 2]}\')\n');

    const result = await run();

    expect(result).toEqual({ ok: false, reason: 'bad_json' });
  });

  test('reports bad_json when the JSON is not an object', async () => {
    writeChecker('print("[]")\n');

    const result = await run();

    expect(result).toEqual({ ok: false, reason: 'bad_json' });
  });

  test('reports timeout when the checker outlives timeout_ms', async () => {
    writeChecker('import time\ntime.sleep(30)\n');

    const result = await run({ timeout_ms: 300 });

    expect(result).toEqual({ ok: false, reason: 'timeout' });
  });

  test('reports checker_missing when the checker file is absent', async () => {
    const result = await run({ dotfiles_root: path.join(root, 'nowhere') });

    expect(result).toEqual({ ok: false, reason: 'checker_missing' });
  });

  test('reports checker_missing when dotfiles_root is null', async () => {
    const result = await run({ dotfiles_root: null });

    expect(result).toEqual({ ok: false, reason: 'checker_missing' });
  });

  test('reports checker_missing when the interpreter cannot spawn', async () => {
    writeChecker('print("{}")\n');

    const result = await run({ python: path.join(root, 'no-such-python') });

    expect(result).toEqual({ ok: false, reason: 'checker_missing' });
  });

  test('survives a checker that exits without reading stdin', async () => {
    writeChecker('import json\nprint(json.dumps({"protected": []}))\n');

    const result = await run({
      paths: Array(200000).fill('some/long/path.md')
    });

    expect(result).toEqual({ ok: true, protected: [] });
  });

  test('skips the spawn when no path changed', async () => {
    writeChecker('import sys\nsys.exit(9)\n');

    const result = await run({ paths: [] });

    expect(result).toEqual({ ok: true, protected: [] });
  });
});
