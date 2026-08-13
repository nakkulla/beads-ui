import { describe, expect, it } from 'vitest';
import {
  resolveEffectiveRepoOps,
  resolveRepoOps
} from './repo-ops-resolver.js';

const PREVIOUS = 'a'.repeat(40);
const TARGET = 'b'.repeat(40);

/**
 * @param {Record<string, string>} files
 */
function gitFor(files) {
  /** @param {string[]} args - Git arguments. */
  return async (args) => {
    const key = `${args[0]}:${args.at(-1)}`;
    const value = files[key];
    return value === undefined
      ? { code: 1, stdout: '', stderr: 'missing' }
      : { code: 0, stdout: value, stderr: '' };
  };
}

describe('resolveRepoOps', () => {
  it('returns an inert declaration when config is absent', async () => {
    const result = await resolveRepoOps({
      repo: '/repo',
      sha: 'a'.repeat(40),
      gitRun: async (args) =>
        args[0] === 'ls-tree'
          ? { code: 0, stdout: '', stderr: '' }
          : { code: 128, stdout: '', stderr: 'missing' }
    });

    expect(result).toEqual({
      base: 'main',
      verify: null,
      deploy: null,
      config_blob_sha: null
    });
  });

  it('fails closed when the absence probe itself fails', async () => {
    const result = await resolveRepoOps({
      repo: '/repo',
      sha: 'a'.repeat(40),
      gitRun: async () => ({ code: 128, stdout: '', stderr: 'bad object' })
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_config_invalid'
    });
  });

  it.each([
    ['bad TOML', '[deploy'],
    ['unknown key', 'unknown = true'],
    ['bad path', '[deploy]\nscript = "nope"'],
    ['bad timeout', '[deploy]\nscript = "repo-ops/script/run"\ntimeout_ms = 0'],
    ['bad mode', '[deploy]\nscript = "repo-ops/script/run"\nmode = "100644"']
  ])('fails closed for %s', async (_name, text) => {
    const result = await resolveRepoOps({
      repo: '/repo',
      sha: PREVIOUS,
      gitRun: gitFor({
        [`show:${PREVIOUS}:repo-ops/config.toml`]: text,
        [`ls-tree:repo-ops/config.toml`]: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`
      })
    });
    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_config_invalid'
    });
  });

  it('fails closed when a declared script is not executable', async () => {
    const gitRun = gitFor({
      [`show:${PREVIOUS}:repo-ops/config.toml`]:
        '[deploy]\nscript = "repo-ops/script/run"',
      [`ls-tree:repo-ops/config.toml`]: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
      [`ls-tree:repo-ops/script/run`]: `100644 blob ${'d'.repeat(40)}\trepo-ops/script/run`
    });
    await expect(
      resolveRepoOps({ repo: '/repo', sha: PREVIOUS, gitRun })
    ).resolves.toMatchObject({ ok: false, code: 'repo_ops_config_invalid' });
  });

  it('classifies no previous policy as bootstrap without reading a previous checkout', async () => {
    const gitRun = gitFor({
      [`show:${TARGET}:repo-ops/config.toml`]:
        '[deploy]\nscript = "repo-ops/script/run"',
      [`ls-tree:repo-ops/config.toml`]: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
      [`ls-tree:repo-ops/script/run`]: `100755 blob ${'d'.repeat(40)}\trepo-ops/script/run`
    });
    const result = await resolveEffectiveRepoOps({
      repo: '/repo',
      previous_sha: null,
      target_sha: TARGET,
      gitRun
    });
    expect(result).toMatchObject({ classification: 'bootstrap' });
  });
});

describe('resolveEffectiveRepoOps', () => {
  /**
   * Fake git keyed per SHA so the previous and target trees can differ.
   *
   * @param {Record<string, { config?: string, config_blob?: string, script_entry?: string }>} trees
   */
  function gitForTrees(trees) {
    /** @param {string[]} args - Git arguments. */
    return async (args) => {
      if (args[0] === 'show') {
        const sha = String(args[1]).split(':')[0];
        const config = trees[sha]?.config;
        return config === undefined
          ? { code: 128, stdout: '', stderr: 'missing' }
          : { code: 0, stdout: config, stderr: '' };
      }
      if (args[0] === 'ls-tree') {
        const tree = trees[String(args[1])];
        const entry =
          args.at(-1) === 'repo-ops/config.toml'
            ? tree?.config_blob
            : tree?.script_entry;
        return entry === undefined
          ? { code: 0, stdout: '', stderr: '' }
          : { code: 0, stdout: entry, stderr: '' };
      }
      return { code: 1, stdout: '', stderr: 'unexpected' };
    };
  }

  const CONFIG = '[deploy]\nscript = "repo-ops/script/deploy"';
  const SCRIPT_755 = `100755 blob ${'d'.repeat(40)}\trepo-ops/script/deploy`;

  it('classifies identical config and script identity as normal', async () => {
    const gitRun = gitForTrees({
      [PREVIOUS]: {
        config: CONFIG,
        config_blob: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
        script_entry: SCRIPT_755
      },
      [TARGET]: {
        config: CONFIG,
        config_blob: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
        script_entry: SCRIPT_755
      }
    });

    const result = await resolveEffectiveRepoOps({
      repo: '/repo',
      previous_sha: PREVIOUS,
      target_sha: TARGET,
      gitRun
    });

    expect(result).toMatchObject({ classification: 'normal' });
  });

  it('classifies a config-only change as transition and pins the previous policy', async () => {
    const gitRun = gitForTrees({
      [PREVIOUS]: {
        config: `${CONFIG}\ntimeout_ms = 1000`,
        config_blob: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
        script_entry: SCRIPT_755
      },
      [TARGET]: {
        config: `${CONFIG}\ntimeout_ms = 2000`,
        config_blob: `100644 blob ${'e'.repeat(40)}\trepo-ops/config.toml`,
        script_entry: SCRIPT_755
      }
    });

    const result = await resolveEffectiveRepoOps({
      repo: '/repo',
      previous_sha: PREVIOUS,
      target_sha: TARGET,
      gitRun
    });

    expect(result).toMatchObject({ classification: 'transition' });
    if (!('policy' in result) || !('deploy' in result.policy)) return;
    expect(result.policy.deploy?.timeout_ms).toBe(1000);
  });

  it('classifies changed script bytes as transition while the PR bytes never become policy', async () => {
    const gitRun = gitForTrees({
      [PREVIOUS]: {
        config: CONFIG,
        config_blob: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
        script_entry: SCRIPT_755
      },
      [TARGET]: {
        config: CONFIG,
        config_blob: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
        script_entry: `100755 blob ${'f'.repeat(40)}\trepo-ops/script/deploy`
      }
    });

    const result = await resolveEffectiveRepoOps({
      repo: '/repo',
      previous_sha: PREVIOUS,
      target_sha: TARGET,
      gitRun
    });

    expect(result).toMatchObject({ classification: 'transition' });
    if (!('policy' in result) || !('deploy' in result.policy)) return;
    expect(result.policy.deploy?.blob_sha).toBe('d'.repeat(40));
  });

  it('classifies a mode-only change as transition, never normal', async () => {
    // Same blob SHA, different executable bit: a blob-SHA-only identity would
    // have judged this 'normal'; the pinned previous policy keeps executing.
    const gitRun = gitForTrees({
      [PREVIOUS]: {
        config: CONFIG,
        config_blob: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
        script_entry: SCRIPT_755
      },
      [TARGET]: {
        config: CONFIG,
        config_blob: `100644 blob ${'c'.repeat(40)}\trepo-ops/config.toml`,
        script_entry: `100644 blob ${'d'.repeat(40)}\trepo-ops/script/deploy`
      }
    });

    const result = await resolveEffectiveRepoOps({
      repo: '/repo',
      previous_sha: PREVIOUS,
      target_sha: TARGET,
      gitRun
    });

    expect(result).toMatchObject({ classification: 'transition' });
    if (!('policy' in result) || !('deploy' in result.policy)) return;
    expect(result.policy.deploy?.mode).toBe('100755');
  });
});
