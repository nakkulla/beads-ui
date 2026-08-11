import os from 'node:os';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  peekDeployResolution,
  peekVerifyResolution,
  resetRepoOpsCache,
  resolveDeployAt,
  resolveVerifyAt,
  selfRepoState
} from './repo-ops.js';

const REPO = '/repo';
const SHA = 'a'.repeat(40);

/**
 * A `gitRun` answering the resolver's two probes: `rev-parse` resolves any sha
 * in `commits` (defaulting to the blob map's keys), and `git show <sha>:<path>`
 * returns that sha's declaration or exits non-zero the way git does for a path
 * that is not in the tree.
 *
 * @param {Record<string, string>} blobs
 * @param {{ commits?: string[] }} [options]
 */
function gitOf(blobs, options = {}) {
  const commits = new Set(options.commits ?? Object.keys(blobs));
  return vi.fn(async (/** @type {string[]} */ args) => {
    if (args[0] === 'rev-parse') {
      const sha = String(args[3] || '').replace('^{commit}', '');
      return commits.has(sha)
        ? { code: 0, stdout: `${sha}\n`, stderr: '' }
        : { code: 1, stdout: '', stderr: '' };
    }
    const sha = String(args[1] || '').split(':')[0];
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
        detached: true,
        adapter: 'workspace'
      }
    });
  });

  test('resolves a managed deploy declaration with a candidate-relative command', async () => {
    const gitRun = gitOf({
      [SHA]:
        '[deploy]\nadapter = "managed"\ncmd = ["./scripts/deploy.sh", "--apply"]\n'
    });

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
        cmd: ['./scripts/deploy.sh', '--apply'],
        timeout_ms: 600000,
        detached: false,
        adapter: 'managed'
      }
    });
  });

  test('treats the legacy config rung as a workspace adapter', async () => {
    const gitRun = gitOf({ [SHA]: 'base = "main"\n' });

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_DEPLOY
    });

    expect(r).toMatchObject({
      state: 'resolved',
      source: 'config',
      value: { adapter: 'workspace' }
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
    const gitRun = gitOf({}, { commits: [SHA] });

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
    const gitRun = gitOf({}, { commits: [SHA] });

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: {}
    });

    expect(r).toEqual({ state: 'absent' });
  });

  test('fails closed when the caller has no pin to read rung 1 from', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED });

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: null,
      config_map: CONFIG_VERIFY
    });

    // An unresolvable base leaves nothing to read the declaration from, and
    // answering from the legacy rung alone is the fail-open side.
    expect(gitRun).not.toHaveBeenCalled();
    expect(r).toMatchObject({ state: 'invalid', detail: 'pin_unavailable' });
  });

  test('fails closed when the pin itself does not resolve', async () => {
    const gitRun = gitOf({}, { commits: [] });

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_DEPLOY
    });

    expect(r).toMatchObject({ state: 'invalid', detail: 'pin_unresolvable' });
  });

  test('fails closed when the git adapter throws', async () => {
    const gitRun = vi.fn(async () => {
      throw new Error('git is gone');
    });

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });

    expect(r).toMatchObject({ state: 'invalid', detail: 'git_error' });
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

  test('reports a present but non-positive timeout_ms as invalid', async () => {
    const gitRun = gitOf({ [SHA]: '[verify]\ncmd = ["x"]\ntimeout_ms = 0\n' });

    const r = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_VERIFY
    });

    // An OMITTED timeout takes the default; a stated one we cannot honour is a
    // typo, and coercing it to the default would hide it.
    expect(r).toMatchObject({
      state: 'invalid',
      detail: 'verify:timeout_ms_not_a_positive_number'
    });
  });

  test('reports a non-boolean detached as invalid', async () => {
    const gitRun = gitOf({
      [SHA]: '[deploy]\ncmd = ["x"]\ndetached = "yes"\n'
    });

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_DEPLOY
    });

    // Reading it as `false` would arm a synchronous self-killing deploy.
    expect(r).toMatchObject({
      state: 'invalid',
      detail: 'deploy:detached_not_a_boolean'
    });
  });

  test.each([
    [
      'absolute executable',
      '/usr/local/bin/deploy',
      'managed_cmd_not_relative'
    ],
    ['release escape', '../scripts/deploy.sh', 'managed_cmd_escapes_release']
  ])('rejects a managed %s', async (_label, executable, detail) => {
    const gitRun = gitOf({
      [SHA]: `[deploy]\nadapter = "managed"\ncmd = ["${executable}"]\n`
    });

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_DEPLOY
    });

    expect(r).toMatchObject({
      state: 'invalid',
      detail: `deploy:${detail}`
    });
  });

  test('rejects a detached managed adapter', async () => {
    const gitRun = gitOf({
      [SHA]:
        '[deploy]\nadapter = "managed"\ncmd = ["./deploy.sh"]\ndetached = true\n'
    });

    const r = await resolveDeployAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: CONFIG_DEPLOY
    });

    expect(r).toMatchObject({
      state: 'invalid',
      detail: 'deploy:managed_detached_forbidden'
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
  test('reads one (repo, sha) declaration once for both sections', async () => {
    const gitRun = gitOf({ [SHA]: DECLARED });

    await resolveVerifyAt({ gitRun, repo: REPO, sha: SHA, config_map: null });
    await resolveDeployAt({ gitRun, repo: REPO, sha: SHA, config_map: null });

    // The pin probe plus the blob read, once — the second resolution is served
    // from the memo.
    expect(gitRun).toHaveBeenCalledTimes(2);
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

    expect(gitRun).toHaveBeenCalledTimes(4);
  });
});

describe('worker/repo-ops — selfRepoState (UI-kfl4 §4.3)', () => {
  test('recognizes the checkout this module lives in', () => {
    expect(selfRepoState(process.cwd())).toBe('self');
  });

  test('reports an unrelated existing repo as other', () => {
    expect(selfRepoState(os.tmpdir())).toBe('other');
  });

  test('reads a path with nothing at it as other, not unknown', () => {
    // This process runs FROM its own checkout, so a path that does not exist
    // cannot be that checkout — an answer, not a guess.
    expect(selfRepoState('/definitely/not/this/repo')).toBe('other');
  });

  test('reports a comparison it cannot make as unknown, never as other', () => {
    // `other` would silently disarm both self-repo deploy defences.
    expect(
      selfRepoState(process.cwd(), { self_root: '/definitely/not/a/checkout' })
    ).toBe('unknown');
  });
});
