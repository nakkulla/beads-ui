import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  peekDeployResolution,
  peekVerifyResolution,
  resetRepoOpsCache,
  resolveDeployAt,
  resolveVerifyAt
} from './repo-ops.js';

const REPO = '/repo';
const SHA = 'a'.repeat(40);
const OTHER_SHA = 'b'.repeat(40);

/**
 * @param {string} blob
 */
function gitOf(blob) {
  return vi.fn(async (args) => {
    if (args[0] === 'rev-parse') {
      return { code: 0, stdout: `${SHA}\n`, stderr: '' };
    }
    return { code: 0, stdout: blob, stderr: '' };
  });
}

beforeEach(() => {
  resetRepoOpsCache();
});

describe('worker/repo-ops', () => {
  test('reads a deploy declaration from the pinned blob', async () => {
    const result = await resolveDeployAt({
      gitRun: gitOf(
        '[deploy]\ncmd = ["scripts/deploy-self.js"]\ntimeout_ms = 600000\n'
      ),
      repo: REPO,
      sha: SHA
    });

    expect(result).toEqual({
      state: 'resolved',
      source: 'declaration',
      value: { cmd: ['scripts/deploy-self.js'], timeout_ms: 600000 }
    });
  });

  test('falls back to configured verify when the declaration is absent', async () => {
    const result = await resolveVerifyAt({
      gitRun: gitOf('base = "main"\n'),
      repo: REPO,
      sha: SHA,
      config_map: { [REPO]: { cmd: ['npm', 'test'], timeout_ms: 1000 } }
    });

    expect(result).toMatchObject({ state: 'resolved', source: 'config' });
  });

  test('fails closed for an invalid declaration', async () => {
    const result = await resolveDeployAt({
      gitRun: gitOf('[deploy]\ncmd = []\n'),
      repo: REPO,
      sha: SHA
    });

    expect(result).toMatchObject({
      state: 'invalid',
      detail: 'deploy:cmd_not_a_nonempty_argv_array'
    });
  });

  test('fails closed when no pinned commit is available', async () => {
    const result = await resolveDeployAt({
      gitRun: gitOf(''),
      repo: REPO,
      sha: null
    });

    expect(result).toEqual({
      state: 'invalid',
      source: 'declaration',
      detail: 'pin_unavailable'
    });
  });

  test('fails closed when the pinned commit does not resolve', async () => {
    const gitRun = vi.fn(async () => ({ code: 1, stdout: '', stderr: '' }));

    const result = await resolveDeployAt({ gitRun, repo: REPO, sha: SHA });

    expect(result).toMatchObject({
      state: 'invalid',
      detail: 'pin_unresolvable'
    });
  });

  test('falls back to configured verify when the pinned blob is absent', async () => {
    const gitRun = vi.fn(async (args) =>
      args[0] === 'rev-parse'
        ? { code: 0, stdout: `${SHA}\n`, stderr: '' }
        : { code: 1, stdout: '', stderr: 'missing' }
    );

    const result = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: { [REPO]: { cmd: ['npm', 'test'], timeout_ms: 1000 } }
    });

    expect(result).toMatchObject({ state: 'resolved', source: 'config' });
  });

  test('fails both sections closed when the declaration cannot be parsed', async () => {
    const gitRun = gitOf('[verify\n');

    const verify = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: null
    });
    const deploy = await resolveDeployAt({ gitRun, repo: REPO, sha: SHA });

    expect(verify).toMatchObject({ state: 'invalid', detail: 'git_error' });
    expect(deploy).toMatchObject({ state: 'invalid', detail: 'git_error' });
  });

  test('keeps deploy resolvable when verify alone is invalid', async () => {
    const gitRun = gitOf(
      '[verify]\ncmd = []\n[deploy]\ncmd = ["scripts/deploy-self.js"]\n'
    );

    const verify = await resolveVerifyAt({
      gitRun,
      repo: REPO,
      sha: SHA,
      config_map: null
    });
    const deploy = await resolveDeployAt({ gitRun, repo: REPO, sha: SHA });

    expect(verify).toMatchObject({ state: 'invalid' });
    expect(deploy).toMatchObject({ state: 'resolved' });
  });

  test('ignores retired deploy keys instead of projecting them', async () => {
    const result = await resolveDeployAt({
      gitRun: gitOf(
        '[deploy]\ncmd = ["scripts/deploy-self.js"]\nadapter = "managed"\ndetached = true\n'
      ),
      repo: REPO,
      sha: SHA
    });

    expect(result).toEqual({
      state: 'resolved',
      source: 'declaration',
      value: { cmd: ['scripts/deploy-self.js'], timeout_ms: 600000 }
    });
  });

  test('rejects a non-positive timeout', async () => {
    const result = await resolveDeployAt({
      gitRun: gitOf('[deploy]\ncmd = ["true"]\ntimeout_ms = 0\n'),
      repo: REPO,
      sha: SHA
    });

    expect(result).toMatchObject({
      state: 'invalid',
      detail: 'deploy:timeout_ms_not_a_positive_number'
    });
  });

  test('projects the last pinned declaration without config fallback', async () => {
    const gitRun = gitOf('[deploy]\ncmd = ["scripts/deploy-self.js"]\n');

    await resolveDeployAt({ gitRun, repo: REPO, sha: SHA });

    expect(peekDeployResolution(REPO)).toMatchObject({ state: 'resolved' });
    expect(peekVerifyResolution(REPO, null)).toEqual({ state: 'absent' });
  });

  test('projects configured verify before a pinned declaration is read', () => {
    const result = peekVerifyResolution(REPO, {
      [REPO]: { cmd: ['npm', 'test'], timeout_ms: 1000 }
    });

    expect(result).toMatchObject({ state: 'resolved', source: 'config' });
  });

  test('reads one pinned declaration once for both sections', async () => {
    const gitRun = gitOf(
      '[verify]\ncmd = ["npm", "test"]\n[deploy]\ncmd = ["scripts/deploy-self.js"]\n'
    );

    await resolveVerifyAt({ gitRun, repo: REPO, sha: SHA, config_map: null });
    await resolveDeployAt({ gitRun, repo: REPO, sha: SHA });

    expect(gitRun).toHaveBeenCalledTimes(2);
  });

  test('reads again when the pinned commit changes', async () => {
    const gitRun = gitOf('[deploy]\ncmd = ["scripts/deploy-self.js"]\n');

    await resolveDeployAt({ gitRun, repo: REPO, sha: SHA });
    await resolveDeployAt({ gitRun, repo: REPO, sha: OTHER_SHA });

    expect(gitRun).toHaveBeenCalledTimes(4);
  });
});
