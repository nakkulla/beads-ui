import { execFile } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import { parse } from 'smol-toml';
import { afterEach, describe, expect, test, vi } from 'vitest';
import {
  codexHookHash,
  prepareCodexAccountHome,
  prepareCodexGuardHome
} from './codex-account-home.js';

const execFileAsync = promisify(execFile);

/** @type {string[]} */
const temp_roots = [];

/**
 * @returns {Promise<{ root: string, codex_root: string, home_dir: string, auth_file: string, input: { key: string, auth_file: string, codex_root: string, home_dir: string } }>}
 */
async function fixture() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'bdui-codex-home-'));
  temp_roots.push(root);
  const codex_root = path.join(root, 'codex');
  const home_dir = path.join(root, 'home');
  const auth_file = path.join(codex_root, 'accounts', 'account.auth.json');
  await fs.mkdir(path.dirname(auth_file), { recursive: true });
  await fs.writeFile(auth_file, '{}');
  await fs.writeFile(path.join(codex_root, 'config.toml'), 'model="sol"');
  return {
    root,
    codex_root,
    home_dir,
    auth_file,
    input: { key: 'account', auth_file, codex_root, home_dir }
  };
}

afterEach(async () => {
  vi.restoreAllMocks();
  await Promise.all(
    temp_roots.splice(0).map((root) => fs.rm(root, { recursive: true }))
  );
});

test.each([false, true])(
  'preserves existing hooks and trust in an attempt HOME (account=%s)',
  async (account) => {
    const paths = await fixture();
    const hook_path = path.join(paths.root, 'pre-tool-use');
    const source_hooks = path.join(paths.codex_root, 'hooks.json');
    const source_config = path.join(paths.codex_root, 'config.toml');
    const prior_hooks = {
      hooks: {
        PreToolUse: [
          {
            hooks: [{ type: 'command', command: 'existing-hook', timeout: 10 }]
          }
        ]
      }
    };
    const prior_config = `model="sol"\n[hooks.state.${JSON.stringify(`${source_hooks}:pre_tool_use:0:0`)}]\ntrusted_hash="sha256:existing"\nenabled=false\n`;
    await fs.writeFile(source_hooks, JSON.stringify(prior_hooks));
    await fs.writeFile(source_config, prior_config);
    if (account) {
      expect((await prepareCodexAccountHome(paths.input)).ok).toBe(true);
    }
    const base_home = account ? paths.home_dir : paths.codex_root;

    const result = await prepareCodexGuardHome({
      base_home,
      parent_dir: path.join(paths.root, 'attempt'),
      hook_path
    });

    expect(result.ok).toBe(true);
    if (!result.ok) {
      throw new Error('attempt HOME missing');
    }
    const hooks_path = path.join(result.home_dir, 'hooks.json');
    const hooks = JSON.parse(await fs.readFile(hooks_path, 'utf8'));
    const config = /** @type {any} */ (
      parse(
        await fs.readFile(path.join(result.home_dir, 'config.toml'), 'utf8')
      )
    );
    expect(hooks.hooks.PreToolUse[0]).toEqual(prior_hooks.hooks.PreToolUse[0]);
    expect(hooks.hooks.PreToolUse[1]).toEqual({
      matcher: 'Bash',
      hooks: [{ type: 'command', command: `'${hook_path}' codex`, timeout: 10 }]
    });
    expect(config.hooks.state[`${hooks_path}:pre_tool_use:0:0`]).toEqual({
      trusted_hash: 'sha256:existing',
      enabled: false
    });
    expect(config.hooks.state[`${hooks_path}:pre_tool_use:1:0`]).toEqual({
      trusted_hash: codexHookHash('PreToolUse', hooks.hooks.PreToolUse[1]),
      enabled: true
    });
    expect((await fs.lstat(hooks_path)).isSymbolicLink()).toBe(false);
    expect(
      (
        await fs.lstat(path.join(result.home_dir, 'config.toml'))
      ).isSymbolicLink()
    ).toBe(false);
    expect(await fs.readFile(source_config, 'utf8')).toBe(prior_config);
    expect(JSON.parse(await fs.readFile(source_hooks, 'utf8'))).toEqual(
      prior_hooks
    );
    if (account) {
      expect(await fs.realpath(path.join(result.home_dir, 'auth.json'))).toBe(
        await fs.realpath(paths.auth_file)
      );
    }
  }
);

test('fingerprints normalized handlers and sorted JSON keys', () => {
  const canonical =
    '{"event_name":"PreToolUse","hooks":[{"async":false,"command":"guard","timeout":600,"type":"command"},{"additionalContextLimit":42,"async":true,"command":"second","statusMessage":"checking","timeout":1,"type":"command"}],"matcher":"Bash"}';

  const actual = codexHookHash('PreToolUse', {
    matcher: 'Bash',
    hooks: [
      { command: 'guard', additionalContextLimit: 2500 },
      {
        command: 'second',
        timeout: 0,
        async: true,
        statusMessage: 'checking',
        additionalContextLimit: 42
      }
    ]
  });

  expect(actual).toBe(
    `sha256:${crypto.createHash('sha256').update(canonical).digest('hex')}`
  );
});

test('isolates concurrent attempt settings under different homes', async () => {
  const paths = await fixture();
  const input = {
    base_home: paths.codex_root,
    parent_dir: paths.root,
    hook_path: path.join(paths.root, 'guard')
  };

  const [first, second] = await Promise.all([
    prepareCodexGuardHome(input),
    prepareCodexGuardHome(input)
  ]);

  expect(first.ok && second.ok && first.home_dir !== second.home_dir).toBe(
    true
  );
});

test('reports unavailable trust state without changing the base config', async () => {
  const paths = await fixture();
  await fs.writeFile(path.join(paths.root, 'occupied'), 'keep');

  const result = await prepareCodexGuardHome({
    base_home: paths.codex_root,
    parent_dir: path.join(paths.root, 'occupied'),
    hook_path: '/guard'
  });

  expect(result).toEqual({ ok: false, reason: 'codex_hook_not_loaded' });
  expect(
    await fs.readFile(path.join(paths.codex_root, 'config.toml'), 'utf8')
  ).toBe('model="sol"');
});

describe('worker/codex-account-home', () => {
  test('creates the mirror and auth link with a private home', async () => {
    const paths = await fixture();

    const result = await prepareCodexAccountHome(paths.input);

    expect(result).toEqual({ ok: true, home_dir: paths.home_dir });
    expect(await fs.readlink(path.join(paths.home_dir, 'config.toml'))).toBe(
      path.join(paths.codex_root, 'config.toml')
    );
    expect(await fs.readlink(path.join(paths.home_dir, 'auth.json'))).toBe(
      paths.auth_file
    );
    expect((await fs.stat(paths.home_dir)).mode & 0o777).toBe(0o700);
  });

  test('adds only missing mirrors on an idempotent rerun', async () => {
    const paths = await fixture();
    await prepareCodexAccountHome(paths.input);
    const private_file = path.join(paths.home_dir, 'runtime-private');
    await fs.writeFile(private_file, 'keep');
    await fs.mkdir(path.join(paths.codex_root, 'skills'));

    const result = await prepareCodexAccountHome(paths.input);

    expect(result.ok).toBe(true);
    expect(await fs.readFile(private_file, 'utf8')).toBe('keep');
    expect(await fs.readlink(path.join(paths.home_dir, 'skills'))).toBe(
      path.join(paths.codex_root, 'skills')
    );
  });

  test('accepts an auth link already pointing at the account file', async () => {
    const paths = await fixture();
    await fs.mkdir(paths.home_dir);
    await fs.symlink(paths.auth_file, path.join(paths.home_dir, 'auth.json'));

    const result = await prepareCodexAccountHome(paths.input);

    expect(result).toEqual({ ok: true, home_dir: paths.home_dir });
  });

  test('atomically replaces an auth link pointing elsewhere', async () => {
    const paths = await fixture();
    const old_auth = path.join(paths.root, 'old-auth.json');
    await fs.writeFile(old_auth, '{}');
    await fs.mkdir(paths.home_dir);
    await fs.symlink(old_auth, path.join(paths.home_dir, 'auth.json'));

    const result = await prepareCodexAccountHome(paths.input);

    expect(result.ok).toBe(true);
    expect(await fs.readlink(path.join(paths.home_dir, 'auth.json'))).toBe(
      paths.auth_file
    );
  });

  test('rejects a regular auth.json without changing it', async () => {
    const paths = await fixture();
    const auth_path = path.join(paths.home_dir, 'auth.json');
    await fs.mkdir(paths.home_dir);
    await fs.writeFile(auth_path, 'newest-token');

    const result = await prepareCodexAccountHome(paths.input);

    expect(result).toEqual({
      ok: false,
      reason: 'codex_home_prepare_failed',
      detail: 'auth_json_not_symlink'
    });
    expect(await fs.readFile(auth_path, 'utf8')).toBe('newest-token');
  });

  test('rejects a symlink account file', async () => {
    const paths = await fixture();
    const real_auth = path.join(paths.root, 'real-auth.json');
    await fs.writeFile(real_auth, '{}');
    await fs.unlink(paths.auth_file);
    await fs.symlink(real_auth, paths.auth_file);

    const result = await prepareCodexAccountHome(paths.input);

    expect(result).toEqual({
      ok: false,
      reason: 'codex_home_prepare_failed',
      detail: 'auth_file_not_regular'
    });
  });

  test('rejects a symlink home directory', async () => {
    const paths = await fixture();
    const real_home = path.join(paths.root, 'real-home');
    await fs.mkdir(real_home);
    await fs.symlink(real_home, paths.home_dir);

    const result = await prepareCodexAccountHome(paths.input);

    expect(result).toEqual({
      ok: false,
      reason: 'codex_home_prepare_failed',
      detail: 'home_not_directory'
    });
  });

  test('rejects a mirror link pointing elsewhere', async () => {
    const paths = await fixture();
    await fs.mkdir(paths.home_dir);
    await fs.symlink(paths.root, path.join(paths.home_dir, 'config.toml'));

    const result = await prepareCodexAccountHome(paths.input);

    expect(result).toEqual({
      ok: false,
      reason: 'codex_home_prepare_failed',
      detail: 'mirror_link_mismatch:config.toml'
    });
  });

  test('accepts a private non-symlink mirror entry', async () => {
    const paths = await fixture();
    await fs.mkdir(paths.home_dir);
    await fs.writeFile(path.join(paths.home_dir, 'config.toml'), 'private');

    const result = await prepareCodexAccountHome(paths.input);

    expect(result.ok).toBe(true);
    expect(
      await fs.readFile(path.join(paths.home_dir, 'config.toml'), 'utf8')
    ).toBe('private');
  });

  // The only row here that spawns a REAL process (mkfifo); the rest is
  // filesystem work that keeps the default budget.
  test(
    'rejects a mirror entry that is neither a file nor a directory',
    { timeout: 30_000 },
    async () => {
      const paths = await fixture();
      await fs.mkdir(paths.home_dir);
      await execFileAsync('mkfifo', [path.join(paths.home_dir, 'config.toml')]);

      const result = await prepareCodexAccountHome(paths.input);

      expect(result).toEqual({
        ok: false,
        reason: 'codex_home_prepare_failed',
        detail: 'mirror_link_mismatch:config.toml'
      });
    }
  );

  test('accepts EEXIST from a concurrent mirror creator', async () => {
    const paths = await fixture();
    const real_symlink = fs.symlink.bind(fs);
    vi.spyOn(fs, 'symlink').mockImplementationOnce(
      async (target, link_path, type) => {
        await real_symlink(target, link_path, type);
        throw Object.assign(new Error('exists'), { code: 'EEXIST' });
      }
    );

    const result = await prepareCodexAccountHome(paths.input);

    expect(result.ok).toBe(true);
  });
});
