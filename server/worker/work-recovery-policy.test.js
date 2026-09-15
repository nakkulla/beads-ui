import crypto from 'node:crypto';
import fs from 'node:fs';
import { describe, expect, test, vi } from 'vitest';
import {
  WORK_RECOVERY_POLICY_PATH,
  WORK_RECOVERY_POLICY_PROVENANCE_PATH,
  loadWorkRecoveryPolicy,
  recoveryResultLineReasons,
  workRecoveryClassification,
  workRecoveryPolicySupported,
  workRecoveryReadinessEnv
} from './work-recovery-policy.js';

const APPROVED_SOURCE_COMMIT = '5cc243221bcf5af59c0831989ebf646f56878e06';
const APPROVED_BLOB = '184031cd62f5e6cb5223100f684fd9700e90b552';
const APPROVED_DIGEST =
  'fc38e61207ba217e49102626fc4d38c9192337f1c65304bbef4d1d69b1a62dc3';
const APPROVED_BYTES = 4638;

/**
 * @param {Record<string, any>} [artifact_patch]
 * @param {Record<string, any>} [provenance_patch]
 */
function fixture(artifact_patch = {}, provenance_patch = {}) {
  const artifact = {
    ...JSON.parse(fs.readFileSync(WORK_RECOVERY_POLICY_PATH, 'utf8')),
    ...artifact_patch
  };
  const bytes = Buffer.from(JSON.stringify(artifact));
  const provenance = {
    source_repo: 'dotfiles',
    source_path: 'generated/contracts/work-recovery-policy.json',
    source_commit: APPROVED_SOURCE_COMMIT,
    bytes: bytes.length,
    sha256: crypto.createHash('sha256').update(bytes).digest('hex'),
    source_blob_sha: crypto
      .createHash('sha1')
      .update(`blob ${bytes.length}\0`)
      .update(bytes)
      .digest('hex'),
    ...provenance_patch
  };
  return {
    readFileSync: vi.fn((/** @type {string} */ file) =>
      file.endsWith('.provenance.json') ? JSON.stringify(provenance) : bytes
    )
  };
}

describe('pinned work-recovery policy', () => {
  test('proves the approved byte copy and provenance', () => {
    const bytes = fs.readFileSync(WORK_RECOVERY_POLICY_PATH);
    const provenance = JSON.parse(
      fs.readFileSync(WORK_RECOVERY_POLICY_PROVENANCE_PATH, 'utf8')
    );

    const digest = crypto.createHash('sha256').update(bytes).digest('hex');
    const blob = crypto
      .createHash('sha1')
      .update(`blob ${bytes.length}\0`)
      .update(bytes)
      .digest('hex');

    expect({ bytes: bytes.length, digest, blob }).toEqual({
      bytes: APPROVED_BYTES,
      digest: APPROVED_DIGEST,
      blob: APPROVED_BLOB
    });
    expect(provenance).toEqual({
      source_repo: 'dotfiles',
      source_path: 'generated/contracts/work-recovery-policy.json',
      source_commit: APPROVED_SOURCE_COMMIT,
      source_blob_sha: blob,
      sha256: digest,
      bytes: bytes.length
    });
  });

  test('supports the validated schema through an injected filesystem', () => {
    const injected = fixture();

    const loaded = loadWorkRecoveryPolicy({ fs: injected });

    expect(loaded).toMatchObject({
      supported: true,
      schema_version: 1,
      source_commit: APPROVED_SOURCE_COMMIT,
      policy: { readiness_value: '1' }
    });
  });

  test('rejects an unknown schema despite valid provenance', () => {
    const injected = fixture({ schema_version: 9 });

    const loaded = loadWorkRecoveryPolicy({ fs: injected });

    expect(loaded).toMatchObject({
      supported: false,
      schema_version: 9,
      policy: null
    });
  });

  test.each([
    { sha256: 'wrong' },
    { source_blob_sha: '0'.repeat(40) },
    { bytes: 0 }
  ])('rejects mismatched provenance %j', (patch) => {
    const injected = fixture({}, patch);

    const loaded = loadWorkRecoveryPolicy({ fs: injected });

    expect(loaded.supported).toBe(false);
  });

  test.each([
    { classification: [] },
    { classification: { broken: { disposition: 'invented' } } },
    { classification: { broken: { disposition: 'wait' } } },
    { classification: { broken: { disposition: 'reconcile', reason: '' } } },
    { dispositions: [] },
    { wait_reasons: [''] },
    { readiness_env: '' },
    { readiness_value: ' ' },
    { result_line_reasons: 'other' }
  ])('rejects malformed contract structure %j', (patch) => {
    const policy = loadWorkRecoveryPolicy().policy;
    const injected = fixture({ work_recovery: { ...policy, ...patch } });

    const loaded = loadWorkRecoveryPolicy({ fs: injected });

    expect(loaded).toMatchObject({ supported: false, policy: null });
  });

  test('preserves the process cache across injected failures', () => {
    const cached = loadWorkRecoveryPolicy();

    loadWorkRecoveryPolicy({ fs: fixture({ schema_version: 9 }) });

    expect(loadWorkRecoveryPolicy()).toBe(cached);
    expect(workRecoveryPolicySupported()).toBe(true);
  });

  test.each(['read', 'parse'])('fails quiet on a %s failure', (kind) => {
    const injected = {
      readFileSync: () => {
        if (kind === 'read') {
          throw new Error('missing');
        }
        return '{';
      }
    };

    const loaded = loadWorkRecoveryPolicy({ fs: injected });

    expect(loaded).toMatchObject({ supported: false, policy: null });
  });

  test('reads classifications without inventing unknown keys', () => {
    const known = workRecoveryClassification('finished_without_result_line');

    expect(known).toEqual({
      classification: 'finished_without_result_line',
      disposition: 'wait',
      reason: 'unclassified',
      next: null
    });
    expect(workRecoveryClassification('not_a_key')).toBeNull();
    expect(workRecoveryClassification('toString')).toBeNull();
  });

  test('derives readiness and result reasons from the supported contract', () => {
    const policy = loadWorkRecoveryPolicy().policy;

    expect(workRecoveryReadinessEnv()).toEqual({
      [policy?.readiness_env]: policy?.readiness_value
    });
    expect(recoveryResultLineReasons()).toEqual([
      ...(policy?.wait_reasons || []),
      'reconcile'
    ]);
  });
});
