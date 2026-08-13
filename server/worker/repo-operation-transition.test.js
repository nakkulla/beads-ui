import crypto from 'node:crypto';
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

/**
 * @param {Buffer} bytes
 */
function gitBlobSha(bytes) {
  return crypto
    .createHash('sha1')
    .update(`blob ${bytes.length}\0`)
    .update(bytes)
    .digest('hex');
}

describe('RepoOperation transition', () => {
  test('materializes the exact previous-base bytes and reclaims the executable', async () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-transition-')
    );
    roots.push(root);
    const bytes = Buffer.concat([
      Buffer.from('#!/bin/sh\n'),
      Buffer.from([0xff, 0xfe, 0x00, 0x81]),
      Buffer.from('\necho previous\n')
    ]);
    const blob_sha = gitBlobSha(bytes);
    const launcher = createRepoOperationTransitionLauncher({
      stateDir: () => root,
      readBlob: async () => bytes
    });

    const result = await launcher.materialize({
      workspace: '/workspace',
      repo: '/repo',
      operation_id: 'op',
      blob_sha,
      mode: '100755'
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    if (typeof result.path !== 'string') return;
    expect(fs.readFileSync(result.path).equals(bytes)).toBe(true);
    expect(fs.statSync(result.path).mode & 0o111).not.toBe(0);
    launcher.reclaim('/workspace', 'op');
    expect(fs.existsSync(result.path)).toBe(false);
  });

  test('rejects blob bytes that do not match the pinned blob SHA', async () => {
    const root = fs.mkdtempSync(
      path.join(os.tmpdir(), 'repo-operation-transition-')
    );
    roots.push(root);
    const launcher = createRepoOperationTransitionLauncher({
      stateDir: () => root,
      readBlob: async () => Buffer.from('tampered bytes\n')
    });

    const result = await launcher.materialize({
      workspace: '/workspace',
      repo: '/repo',
      operation_id: 'op',
      blob_sha: 'a'.repeat(40),
      mode: '100755'
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'repo_ops_transition_materialize_failed'
    });
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
