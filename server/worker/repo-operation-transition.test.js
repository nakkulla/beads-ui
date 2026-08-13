import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, test } from 'vitest';
import { latestSuccessfulDeploySha } from './repo-operation-coordinator.js';
import { createRepoOperationTransitionLauncher } from './repo-operation-transition.js';

/** @type {string[]} */
const roots = [];

afterEach(() => {
  for (const root of roots.splice(0))
    fs.rmSync(root, { recursive: true, force: true });
});

describe('RepoOperation transition', () => {
  test('materializes only the previous-base bytes and reclaims the executable', async () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-transition-')
    );
    roots.push(root);
    const launcher = createRepoOperationTransitionLauncher({
      stateDir: () => root
    });
    /** @param {string[]} args - Git arguments. */
    const gitRun = async (args) => ({
      code: 0,
      stdout: `#!/bin/sh\necho ${args[1]}\n`,
      stderr: ''
    });
    const result = await launcher.materialize({
      workspace: '/workspace',
      repo: '/repo',
      operation_id: 'op',
      base_sha: 'a'.repeat(40),
      script: 'repo-ops/script/deploy',
      mode: '100755',
      gitRun
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    if (typeof result.path !== 'string') return;
    expect(fs.readFileSync(result.path, 'utf8')).toContain(
      `${'a'.repeat(40)}:repo-ops/script/deploy`
    );
    expect(fs.statSync(result.path).mode & 0o111).not.toBe(0);
    launcher.reclaim('/workspace', 'op');
    expect(fs.existsSync(result.path)).toBe(false);
  });

  test('selects the latest successful target SHA for durable policy and monotonic guard', () => {
    const sha = latestSuccessfulDeploySha(
      {
        repo_operations: {
          old: {
            repo_id: '/repo',
            kind: 'deploy',
            target_base: 'main',
            state: 'succeeded',
            target_sha: 'a'.repeat(40),
            finished_at: 1
          },
          latest: {
            repo_id: '/repo',
            kind: 'deploy',
            target_base: 'main',
            state: 'succeeded',
            target_sha: 'b'.repeat(40),
            finished_at: 2
          }
        }
      },
      '/repo',
      'main'
    );
    expect(sha).toBe('b'.repeat(40));
  });
});
