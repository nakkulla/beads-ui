import nodeCrypto from 'node:crypto';
import nodeFs from 'node:fs';
import { describe, expect, test } from 'vitest';
import {
  REPO_OPERATION_POLICY_PATH,
  classifyRepoOperationFailure,
  loadRepoOperationPolicy,
  projectRepoOperationPolicy
} from './repo-operation-policy.js';

/**
 * The APPROVED dotfiles artifact this runtime copy is pinned to. Changing the
 * copy without re-pinning here (or re-pinning without the approved artifact)
 * fails the contract, which is the whole point of the pin.
 */
const APPROVED_SOURCE_COMMIT = '5cc243221bcf5af59c0831989ebf646f56878e06';
const APPROVED_BLOB = 'c9fa99fd73437aeb09f1b5dd370ad843de907d51';
const APPROVED_BYTES = 2809;
const APPROVED_DIGEST =
  'eb3b6d9feb6c0bde432da6c251e48e5eadda6d970b894236908759fdb3142aab';

/**
 * @param {number} schema_version
 */
function pinnedAt(schema_version) {
  return {
    readFileSync: (/** @type {any} */ file, /** @type {any} */ encoding) => {
      const value = String(file).endsWith('.provenance.json')
        ? JSON.stringify({
            source_commit: 'a'.repeat(40),
            sha256: '',
            source_path: 'generated/contracts/repo-operation-policy.json'
          })
        : JSON.stringify({ schema_version });
      return encoding ? value : Buffer.from(value);
    }
  };
}

describe('pinned repo-operation policy contract', () => {
  test('matches the approved artifact digest', () => {
    const bytes = nodeFs.readFileSync(REPO_OPERATION_POLICY_PATH);

    const digest = nodeCrypto.createHash('sha256').update(bytes).digest('hex');

    expect(digest).toBe(APPROVED_DIGEST);
  });

  test('records the approved dotfiles source commit', () => {
    const { provenance } = loadRepoOperationPolicy();

    expect(provenance.source_commit).toBe(APPROVED_SOURCE_COMMIT);
  });

  test('records the same digest in the provenance file', () => {
    const { provenance, digest } = loadRepoOperationPolicy();

    expect(provenance.sha256).toBe(digest);
  });

  test('records the pinned artifact byte length', () => {
    const { provenance } = loadRepoOperationPolicy();

    expect(provenance.bytes).toBe(
      nodeFs.readFileSync(REPO_OPERATION_POLICY_PATH).length
    );
    expect(provenance.bytes).toBe(APPROVED_BYTES);
  });

  test('proves the approved Git blob from the copied bytes', () => {
    const bytes = nodeFs.readFileSync(REPO_OPERATION_POLICY_PATH);

    const blob = nodeCrypto
      .createHash('sha1')
      .update(`blob ${bytes.length}\0`)
      .update(bytes)
      .digest('hex');

    expect(blob).toBe(APPROVED_BLOB);
    expect(loadRepoOperationPolicy().provenance.source_blob_sha).toBe(blob);
  });

  test('projects an independent deep copy of after-ladder recovery', () => {
    const projected = projectRepoOperationPolicy();
    const original = structuredClone(
      loadRepoOperationPolicy().policy.after_ladder_recovery
    );

    projected.after_ladder_recovery?.diagnosis.requires.push('changed');

    expect(loadRepoOperationPolicy().policy.after_ladder_recovery).toEqual(
      original
    );
    expect(projectRepoOperationPolicy().after_ladder_recovery).toEqual(
      original
    );
  });

  test('names the dotfiles artifact path it was rendered from', () => {
    const { provenance } = loadRepoOperationPolicy();

    expect(provenance.source_path).toBe(
      'generated/contracts/repo-operation-policy.json'
    );
  });

  test('projects the policy lists from the pinned artifact', () => {
    const projected = projectRepoOperationPolicy();

    expect({
      worker_automatic: projected.worker_automatic.length,
      resolution_ladder: projected.resolution_ladder.map((entry) => entry.id),
      never_automatic: projected.never_automatic.length
    }).toEqual({
      worker_automatic: 7,
      resolution_ladder: ['script_retry'],
      never_automatic: 8
    });
  });

  test('carries no auto-repair surface into the projection', () => {
    const projected = projectRepoOperationPolicy();

    expect(Object.hasOwn(projected, 'auto_repair')).toBe(false);
    expect(Object.hasOwn(projected, 'repair_session_packet')).toBe(false);
    expect(Object.hasOwn(projected, 'completion_chain')).toBe(false);
    expect(projected.after_ladder).toBe(
      'preserve_failed_operation_then_classify_wait_or_workflow_repair_handoff'
    );
  });

  test('keeps repair-session dispatch in the never-automatic enum', () => {
    const projected = projectRepoOperationPolicy();

    expect(projected.never_automatic).toContain('repair_session_dispatch');
    expect(projected.never_automatic).toContain(
      'bounded_single_script_retry_exceeded'
    );
  });

  test('projects the approved source commit and digest', () => {
    const projected = projectRepoOperationPolicy();

    expect([projected.source_commit, projected.digest]).toEqual([
      APPROVED_SOURCE_COMMIT,
      APPROVED_DIGEST
    ]);
  });

  test('classifies a failed verify script as verify_script_failure', () => {
    const classified = classifyRepoOperationFailure({
      kind: 'verify',
      failure: { code: 'script_failed', interrupted: false }
    });

    expect(classified).toBe('verify_script_failure');
  });

  test('classifies a failed deploy script as deploy_script_failure', () => {
    const classified = classifyRepoOperationFailure({
      kind: 'deploy',
      failure: { code: 'script_failed', interrupted: false }
    });

    expect(classified).toBe('deploy_script_failure');
  });

  // UI-i60a: without its own token a post-merge job would classify as
  // `deploy_script_failure` and every client surface would call it 배포 실패.
  test('classifies a failed post-merge job as job_script_failure', () => {
    const classified = classifyRepoOperationFailure({
      kind: 'job',
      failure: { code: 'script_failed', interrupted: false }
    });

    expect(classified).toBe('job_script_failure');
  });

  test('classifies a timed-out post-merge job as job_script_failure', () => {
    const classified = classifyRepoOperationFailure({
      kind: 'job',
      failure: { code: 'timeout', interrupted: false }
    });

    expect(classified).toBe('job_script_failure');
  });

  test('classifies a marker-less operation as interrupted', () => {
    const classified = classifyRepoOperationFailure({
      kind: 'deploy',
      failure: { code: 'interrupted', interrupted: true }
    });

    expect(classified).toBe('interrupted_without_terminal_exit');
  });

  test('marks schema version 4 supported', () => {
    const loaded = loadRepoOperationPolicy({
      fs: /** @type {any} */ (pinnedAt(4))
    });

    expect(loaded.supported).toBe(true);
  });

  test.each([1, 2, 3, 7])(
    'marks schema version %s unsupported',
    (schema_version) => {
      const loaded = loadRepoOperationPolicy({
        fs: /** @type {any} */ (pinnedAt(schema_version))
      });

      expect(loaded.supported).toBe(false);
    }
  );
});
