import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { envFor, install, readPushLog } from './guard-hook.js';

vi.setConfig({ testTimeout: 30_000, hookTimeout: 30_000 });

const ATTEMPT = 'UI-osgx-foreign-worktree';

/** @typedef {{ repo: string, worktree: string, origin: string, initial: string, head: string }} Repository */

/** @type {string} */
let tmp;
/** @type {Repository} */
let own;
/** @type {Repository} */
let foreign;
/** @type {Record<string, string>} */
let hook_env;

/**
 * @param {string[]} args
 * @param {string} cwd
 * @returns {string}
 */
function git(args, cwd) {
  return execFileSync('git', args, {
    cwd,
    encoding: 'utf8',
    stdio: 'pipe'
  }).trim();
}

/**
 * @param {string} name
 * @returns {Repository}
 */
function createRepository(name) {
  const repo = path.join(tmp, name);
  const origin = path.join(tmp, `${name}.git`);
  const worktree = path.join(tmp, `${name}-worktree`);
  fs.mkdirSync(repo);
  git(['init', '-q', '-b', 'main'], repo);
  git(['config', 'user.email', 'test@example.com'], repo);
  git(['config', 'user.name', 'Test'], repo);
  git(['config', 'commit.gpgsign', 'false'], repo);
  fs.writeFileSync(path.join(repo, 'source.js'), 'export const value = 1;\n');
  git(['add', 'source.js'], repo);
  git(['commit', '-q', '-m', 'initial'], repo);
  const initial = git(['rev-parse', 'HEAD'], repo);
  git(['clone', '-q', '--bare', repo, origin], tmp);
  git(['remote', 'add', 'origin', origin], repo);
  git(['worktree', 'add', '-q', '-b', 'candidate', worktree], repo);
  fs.writeFileSync(
    path.join(worktree, 'source.js'),
    'export const value = 2;\n'
  );
  git(['add', 'source.js'], worktree);
  git(['commit', '-q', '-m', 'candidate'], worktree);
  const head = git(['rev-parse', 'HEAD'], worktree);
  return { repo, worktree, origin, initial, head };
}

/**
 * @param {Repository} fixture
 * @param {boolean} explicit_env
 */
function push(fixture, explicit_env) {
  // Git itself exports an absolute GIT_DIR when pushing from a linked worktree.
  const env = { ...process.env, ...hook_env };
  if (explicit_env) {
    env.GIT_COMMON_DIR = path.join(fixture.repo, '.git');
    env.GIT_WORK_TREE = fixture.worktree;
    env.GIT_INDEX_FILE = git(
      ['rev-parse', '--path-format=absolute', '--git-path', 'index'],
      fixture.worktree
    );
  }
  return spawnSync('git', ['push', 'origin', 'HEAD:refs/heads/main'], {
    cwd: fixture.worktree,
    env,
    encoding: 'utf8'
  });
}

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-foreign-worktree-'));
  vi.stubEnv('XDG_STATE_HOME', path.join(tmp, 'state'));
  vi.stubEnv('GIT_CONFIG_GLOBAL', '/dev/null');
  vi.stubEnv('GIT_CONFIG_SYSTEM', '/dev/null');
  own = createRepository('own');
  foreign = createRepository('foreign');
  const installed = install({
    workspace: own.repo,
    attempt_id: ATTEMPT,
    repo: own.worktree,
    target_base: 'main'
  });
  expect(installed.ok).toBe(true);
  hook_env = envFor({ workspace: own.repo, attempt_id: ATTEMPT });
});

afterEach(() => {
  vi.unstubAllEnvs();
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe.each([false, true])(
  'linked worktree push (explicit env: %s)',
  (explicit_env) => {
    test('passes a foreign base push without recording it as an own push', () => {
      const result = push(foreign, explicit_env);

      expect(result.status, result.stderr).toBe(0);
      expect(git(['rev-parse', 'refs/heads/main'], foreign.origin)).toBe(
        foreign.head
      );
      expect(readPushLog({ workspace: own.repo, attempt_id: ATTEMPT })).toEqual(
        {
          ok: true,
          entries: []
        }
      );
    });

    test('refuses and records an own base push', () => {
      const result = push(own, explicit_env);

      expect(result.status).toBe(1);
      expect(result.stderr).toContain('bdui guard: refusing push');
      expect(git(['rev-parse', 'refs/heads/main'], own.origin)).toBe(
        own.initial
      );
      expect(readPushLog({ workspace: own.repo, attempt_id: ATTEMPT })).toEqual(
        {
          ok: true,
          entries: [
            {
              local_ref: 'HEAD',
              local_oid: own.head,
              remote_ref: 'refs/heads/main',
              remote_oid: own.initial
            }
          ]
        }
      );
    });
  }
);
