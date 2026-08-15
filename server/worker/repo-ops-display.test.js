import { beforeEach, describe, expect, test } from 'vitest';
import { __resetQueueEventsForTest, onQueueChanged } from './queue-events.js';
import {
  __resetRepoOpsDisplayForTest,
  projectRepoOpsDisplay,
  recordRepoOpsResolution,
  refreshRepoOpsDisplay,
  repoOpsDisplayFor,
  repoOpsVerifyState
} from './repo-ops-display.js';

const SHA = 'a'.repeat(40);

/**
 * A fake `gitRun` over a tiny fixture: `show` returns the config text, and
 * `ls-tree` returns one blob line per known path.
 *
 * @param {{ config?: string|null, blobs?: Record<string, string> }} fixture
 */
function fakeGit(fixture) {
  const blobs = fixture.blobs || {};
  return async (/** @type {string[]} */ args) => {
    if (args[0] === 'show') {
      return fixture.config
        ? { code: 0, stdout: fixture.config, stderr: '' }
        : { code: 1, stdout: '', stderr: 'not found' };
    }
    if (args[0] === 'ls-tree') {
      const path = args[args.length - 1];
      const blob = blobs[path];
      return blob
        ? { code: 0, stdout: `100755 blob ${blob}\t${path}\n`, stderr: '' }
        : { code: 0, stdout: '', stderr: '' };
    }
    return { code: 1, stdout: '', stderr: 'unexpected' };
  };
}

beforeEach(() => {
  __resetRepoOpsDisplayForTest();
  __resetQueueEventsForTest();
});

describe('repoOpsDisplayFor', () => {
  test('reports an unfilled workspace as pending', () => {
    expect(repoOpsDisplayFor('/repo').status).toBe('pending');
  });

  test('claims no declaration while pending', () => {
    const display = repoOpsDisplayFor('/repo');

    expect([display.verify, display.deploy]).toEqual([null, null]);
  });
});

describe('repoOpsVerifyState', () => {
  test.each([
    [
      { status: 'resolved', verify: { script: 'repo-ops/script/verify' } },
      'present'
    ],
    [{ status: 'resolved', verify: null }, 'absent'],
    [{ status: 'absent', verify: null }, 'absent'],
    [{ status: 'pending', verify: null }, 'invalid'],
    [{ status: 'error', verify: null }, 'invalid']
  ])('maps repo-ops display to verify gate state', (display, expected) => {
    expect(repoOpsVerifyState(/** @type {any} */ (display))).toBe(expected);
  });
});

describe('projectRepoOpsDisplay', () => {
  test('projects a resolved declaration', () => {
    const display = projectRepoOpsDisplay(
      {
        base: 'main',
        verify: null,
        deploy: { script: 'repo-ops/script/deploy', timeout_ms: 600_000 },
        config_blob_sha: 'b'.repeat(40)
      },
      SHA
    );

    expect([display.status, display.deploy, display.base_sha]).toEqual([
      'resolved',
      { script: 'repo-ops/script/deploy', timeout_ms: 600_000 },
      SHA
    ]);
  });

  test('projects a proven absence as absent', () => {
    const display = projectRepoOpsDisplay(
      { base: 'main', verify: null, deploy: null, config_blob_sha: null },
      SHA
    );

    expect(display.status).toBe('absent');
  });

  test('projects a resolver failure as error with its code', () => {
    const display = projectRepoOpsDisplay(
      { ok: false, code: 'repo_ops_config_invalid', detail: 'toml' },
      SHA
    );

    expect([display.status, display.error_code]).toEqual([
      'error',
      'repo_ops_config_invalid'
    ]);
  });

  test('never claims an absence on a failed probe', () => {
    const display = projectRepoOpsDisplay(
      {
        ok: false,
        code: 'repo_ops_config_invalid',
        detail: 'config_probe_failed'
      },
      SHA
    );

    expect(display.status).not.toBe('absent');
  });
});

describe('refreshRepoOpsDisplay', () => {
  test('caches a resolved declaration for the workspace', async () => {
    await refreshRepoOpsDisplay({
      workspace: '/repo',
      repo: '/repo',
      base: 'main',
      sha: SHA,
      gitRun: fakeGit({
        config: '[deploy]\nscript = "repo-ops/script/deploy"\n',
        blobs: {
          'repo-ops/config.toml': 'c'.repeat(40),
          'repo-ops/script/deploy': 'd'.repeat(40)
        }
      })
    });

    expect(repoOpsDisplayFor('/repo').deploy).toEqual({
      script: 'repo-ops/script/deploy',
      timeout_ms: 600_000
    });
  });

  test('records an unresolvable base as an error rather than an absence', async () => {
    await refreshRepoOpsDisplay({
      workspace: '/repo',
      repo: '/repo',
      base: 'main',
      sha: null,
      gitRun: fakeGit({})
    });

    expect([
      repoOpsDisplayFor('/repo').status,
      repoOpsDisplayFor('/repo').error_code
    ]).toEqual(['error', 'repo_ops_base_unresolved']);
  });

  test('records a config-less tree as absent', async () => {
    await refreshRepoOpsDisplay({
      workspace: '/repo',
      repo: '/repo',
      base: 'main',
      sha: SHA,
      gitRun: fakeGit({})
    });

    expect(repoOpsDisplayFor('/repo').status).toBe('absent');
  });

  test('broadcasts a queue change when the cache changes', async () => {
    /** @type {string[]} */
    const seen = [];
    onQueueChanged((workspace) => seen.push(workspace));

    await refreshRepoOpsDisplay({
      workspace: '/repo',
      repo: '/repo',
      base: 'main',
      sha: SHA,
      gitRun: fakeGit({})
    });

    expect(seen).toEqual(['/repo']);
  });

  test('stays silent when a re-resolve changes nothing', async () => {
    /** @type {string[]} */
    const seen = [];
    const input = {
      workspace: '/repo',
      repo: '/repo',
      base: 'main',
      sha: SHA,
      gitRun: fakeGit({})
    };
    await refreshRepoOpsDisplay(input);
    onQueueChanged((workspace) => seen.push(workspace));

    await refreshRepoOpsDisplay(input);

    expect(seen).toEqual([]);
  });
});

describe('recordRepoOpsResolution', () => {
  test('stores a resolution the caller already performed', () => {
    recordRepoOpsResolution({
      workspace: '/repo',
      resolution: {
        base: 'main',
        verify: { script: 'repo-ops/script/verify', timeout_ms: 300_000 },
        deploy: null,
        config_blob_sha: 'c'.repeat(40)
      },
      base_sha: SHA
    });

    expect(repoOpsDisplayFor('/repo').verify).toEqual({
      script: 'repo-ops/script/verify',
      timeout_ms: 300_000
    });
  });
});
