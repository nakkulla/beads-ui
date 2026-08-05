import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  isSelfRepo,
  peekDeployResolution,
  peekVerifyResolution,
  resetRepoOpsCache,
  resolveDeployAt,
  resolveVerifyAt
} from './repo-ops.js';

const REPO = '/repo';
const SHA = 'a'.repeat(40);

/**
 * A `gitRun` that answers `git show <sha>:<path>` from a sha→content map.
 * Anything else, and any unmapped sha, exits non-zero like git does for a path
 * that is not in that tree.
 *
 * @param {Record<string, string>} blobs
 */
function gitOf(blobs) {
  return vi.fn(async (/** @type {string[]} */ args) => {
    const target = args[1] || '';
    const sha = target.split(':')[0];
    return Object.hasOwn(blobs, sha)
      ? { code: 0, stdout: blobs[sha], stderr: '' }
      : {
          code: 128,
          stdout: '',
          stderr: `fatal: path does not exist in ${sha}`
        };
  });
}

const DECLARED = `
[verify]
cmd = ["npm", "run", "all"]
timeout_ms = 1000

[deploy]
cmd = ["bdui-shared", "restart"]
detached = true
`;

const CONFIG_VERIFY = { [REPO]: { cmd: ['make', 'test'], timeout_ms: 2000 } };
const CONFIG_DEPLOY = {
  [REPO]: { cmd: ['make', 'deploy'], timeout_ms: 2000, detached: false }
};

beforeEach(() => {
  resetRepoOpsCache();
});

describe('worker/repo-ops — the two-rung ladder (UI-kfl4 §4.2)', () => {
  test('prefers the declaration over the config section', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED });

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });

    expect(r).toEqual({
      state: 'resolved',
      source: 'declaration',
      value: { cmd: ['npm', 'run', 'all'], timeout_ms: 1000 }
    });
  });

  test('prefers the deploy declaration over the config section', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED });

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_DEPLOY
    });

    expect(r).toEqual({
      state: 'resolved',
      source: 'declaration',
      value: {
        cmd: ['bdui-shared', 'restart'],
        timeout_ms: 600000,
        detached: true
      }
    });
  });

  test('reads the declaration at the pinned sha', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED });

    await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: null
    });

    expect(gitRun).toHaveBeenCalledWith(
      ['show', `${SHA}:docs/agents/repo-ops.toml`],
      { cwd: REPO }
    );
  });

  test('falls back to config when the repo declares nothing', async () => {
    const gitRun = gitOf({ [SHA]: 'base = "main"\n' });

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });

    expect(r).toEqual({
      state: 'resolved',
      source: 'config',
      value: { cmd: ['make', 'test'], timeout_ms: 2000 }
    });
  });

  test('falls back to config when the blob is missing at that pin', async () => {
    const gitRun = gitOf({});

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });

    expect(r.state).toBe('resolved');
    expect(r).toMatchObject({ source: 'config' });
  });

  test('resolves absent when neither rung declares anything', async () => {
    const gitRun = gitOf({});

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: {}
    });

    expect(r).toEqual({ state: 'absent' });
  });

  test('skips the declaration rung entirely without a pin', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED });

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: null,
      config_map: CONFIG_VERIFY
    });

    expect(gitRun).not.toHaveBeenCalled();
    expect(r).toMatchObject({ state: 'resolved', source: 'config' });
  });

  test('ignores keys the declaration schema added later', async () => {
    const gitRun = gitOf({
      [SHA]: '[verify]\ncmd = ["x"]\nfuture_key = "whatever"\n'
    });

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: null
    });

    expect(r).toMatchObject({
      state: 'resolved',
      value: { cmd: ['x'], timeout_ms: 600000 }
    });
  });
});

describe('worker/repo-ops — invalid never falls through (UI-kfl4 §4.2)', () => {
  test('reports a non-argv cmd as invalid instead of using the config rung', async () => {
    const gitRun = gitOf({ [SHA]: '[verify]\ncmd = "npm run all"\n' });

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });

    expect(r).toEqual({
      state: 'invalid',
      source: 'declaration',
      detail: 'verify:cmd_not_a_nonempty_argv_array'
    });
  });

  test('reports a non-argv deploy cmd as invalid instead of using the config rung', async () => {
    const gitRun = gitOf({ [SHA]: '[deploy]\ncmd = []\n' });

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_DEPLOY
    });

    expect(r).toMatchObject({
      state: 'invalid',
      detail: 'deploy:cmd_not_a_nonempty_argv_array'
    });
  });

  test('reports an unparseable declaration as invalid for both sections', async () => {
    const gitRun = gitOf({ [SHA]: 'this is [not toml' });

    const verify = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });
    const deploy = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_DEPLOY
    });

    expect(verify).toMatchObject({
      state: 'invalid',
      detail: 'toml_parse_failed'
    });
    expect(deploy).toMatchObject({
      state: 'invalid',
      detail: 'toml_parse_failed'
    });
  });

  test('leaves the OTHER section resolvable when only one is broken', async () => {
    const gitRun = gitOf({
      [SHA]: '[verify]\ncmd = 3\n\n[deploy]\ncmd = ["ok"]\n'
    });

    const verify = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: null
    });
    const deploy = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: null
    });

    expect(verify.state).toBe('invalid');
    expect(deploy).toMatchObject({ state: 'resolved', value: { cmd: ['ok'] } });
  });
});

describe('worker/repo-ops — the synchronous projection', () => {
  test('reads the config rung before anything has resolved', () => {
    const r = peekVerifyResolution(REPO, CONFIG_VERIFY);

    expect(r).toMatchObject({ state: 'resolved', source: 'config' });
  });

  test('reads the declaration once the async resolver has seen it', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED });

    await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });

    expect(peekVerifyResolution(REPO, CONFIG_VERIFY)).toMatchObject({
      source: 'declaration',
      value: { cmd: ['npm', 'run', 'all'] }
    });
    expect(peekDeployResolution(REPO, CONFIG_DEPLOY)).toMatchObject({
      source: 'declaration',
      value: { detached: true }
    });
  });

  test('carries an invalid declaration through to the projection', async () => {
    const gitRun = gitOf({ [SHA]: '[verify]\ncmd = 3\n' });

    await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });

    expect(peekVerifyResolution(REPO, CONFIG_VERIFY).state).toBe('invalid');
  });
});

describe('worker/repo-ops — caching', () => {
  test('reads one (repo, sha) blob once', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED });

    await resolveVerifyAt({ gitRun, repo: REPO, sha: SHA, config_map: null });
    await resolveDeployAt({ gitRun, repo: REPO, sha: SHA, config_map: null });

    expect(gitRun).toHaveBeenCalledTimes(1);
  });

  test('reads again when the pin moves', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED, ['b'.repeat(40)]: DECLARED });

    await resolveVerifyAt({ gitRun, repo: REPO, sha: SHA, config_map: null });
    await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: 'b'.repeat(40),
      config_map: null
    });

    expect(gitRun).toHaveBeenCalledTimes(2);
  });
});

describe('worker/repo-ops — isSelfRepo (UI-kfl4 §4.3)', () => {
  test('recognizes the checkout this module lives in', () => {
    expect(isSelfRepo(process.cwd())).toBe(true);
  });

  test('does not claim an unrelated repo', () => {
    expect(isSelfRepo('/definitely/not/this/repo')).toBe(false);
  });
});
