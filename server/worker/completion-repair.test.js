import { describe, expect, test, vi } from 'vitest';
import {
  createCompletionRepairService,
  repairBeadIdentity,
  repoRecoveryIdentity
} from './completion-repair.js';

const ROOT = 'UI-root';
const REPO = '/repo';
const HEAD_SHA = 'a'.repeat(40);
const BASE_SHA = 'b'.repeat(40);
const DIGEST = 'c'.repeat(64);

/**
 * @param {Partial<{ stage: string, reason: string, subject_sha: string, base_sha: string, result_digest: string }>} [overrides]
 */
function failureKey(overrides = {}) {
  return {
    stage: 'merge_gate',
    reason: 'verify_cmd_failed',
    subject_sha: HEAD_SHA,
    base_sha: BASE_SHA,
    result_digest: DIGEST,
    ...overrides
  };
}

describe('worker/completion-repair deterministic Bead lineage', () => {
  test('creates and readbacks one source-less repo recovery Bead', async () => {
    const issues = new Map();
    const failure_key = {
      repo: REPO,
      target_base: 'main',
      target_sha: HEAD_SHA,
      generation: 7,
      error_code: 'deploy_failed',
      log_digest: DIGEST
    };
    const identity = repoRecoveryIdentity(REPO, 7, failure_key);
    const bd = {
      findIssue: vi.fn(async (id) => issues.get(id) || null),
      createIssue: vi.fn(async (input) => {
        issues.set(input.id, {
          id: input.id,
          title: input.title,
          issue_type: input.type,
          priority: input.priority,
          description: input.description
        });
      })
    };
    const service = createCompletionRepairService({ bd, repo: REPO });

    const first = await service.ensureRepoRecoveryBead({
      repo: REPO,
      generation: 7,
      failure_key
    });
    const second = await service.ensureRepoRecoveryBead({
      repo: REPO,
      generation: 7,
      failure_key
    });

    expect(first).toEqual({ ...identity, created: true });
    expect(second).toEqual({ ...identity, created: false });
    expect(bd.createIssue).toHaveBeenCalledOnce();
    expect(bd.createIssue).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'bug', priority: 1 })
    );
  });

  test('derives the bounded Bead id and branch from the operation id', () => {
    expect(repairBeadIdentity(ROOT, 'create-child')).toEqual({
      bead_id: 'UI-root-rdcfdab23',
      branch: 'UI-root-rdcfdab23'
    });
    expect(repairBeadIdentity(ROOT, 'another-op')).toEqual({
      bead_id: 'UI-root-r84bac56c',
      branch: 'UI-root-r84bac56c'
    });
  });

  test('adopts an existing matching issue without creating another', async () => {
    const identity = repairBeadIdentity(ROOT, 'create-child');
    const bd = {
      findIssue: vi.fn(async () => ({
        id: identity.bead_id,
        title: `${ROOT} 자동머지 실패 복구`,
        issue_type: 'bug',
        priority: 1,
        description: `출처: ${ROOT}\ncompletion_op=create-child\ncompletion_failure=merge_gate/verify_cmd_failed/${DIGEST}`,
        dependencies: [{ depends_on_id: ROOT, type: 'discovered-from' }]
      })),
      createIssue: vi.fn()
    };
    const service = createCompletionRepairService({ bd, repo: REPO });

    const result = await service.ensureLinkedBead({
      root_bead_id: ROOT,
      op_id: 'create-child',
      failure_key: failureKey()
    });

    expect(result).toEqual({ ...identity, created: false });
    expect(bd.createIssue).not.toHaveBeenCalled();
  });

  test('creates one deterministic discovered-from child and confirms readback', async () => {
    const issues = new Map();
    const bd = {
      findIssue: vi.fn(
        async (/** @type {string} */ id) => issues.get(id) || null
      ),
      createIssue: vi.fn(async (/** @type {any} */ input) => {
        issues.set(input.id, {
          id: input.id,
          title: input.title,
          issue_type: input.type,
          priority: input.priority,
          description: input.description,
          dependencies: [{ depends_on_id: ROOT, type: 'discovered-from' }]
        });
      })
    };
    const service = createCompletionRepairService({ bd, repo: REPO });

    const result = await service.ensureLinkedBead({
      root_bead_id: ROOT,
      op_id: 'create-child',
      failure_key: failureKey()
    });

    expect(result).toEqual({
      bead_id: 'UI-root-rdcfdab23',
      branch: 'UI-root-rdcfdab23',
      created: true
    });
    expect(bd.createIssue).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'UI-root-rdcfdab23',
        type: 'bug',
        priority: 1,
        dependency: `discovered-from:${ROOT}`
      })
    );
  });

  test('rejects an existing id whose dependency belongs to another operation', async () => {
    const identity = repairBeadIdentity(ROOT, 'create-child');
    const bd = {
      findIssue: vi.fn(async () => ({
        id: identity.bead_id,
        title: `${ROOT} 자동머지 실패 복구`,
        issue_type: 'bug',
        priority: 1,
        description: `출처: ${ROOT}\ncompletion_op=create-child\ncompletion_failure=merge_gate/verify_cmd_failed/${DIGEST}`,
        dependencies: [{ depends_on_id: 'UI-other', type: 'discovered-from' }]
      })),
      createIssue: vi.fn()
    };
    const service = createCompletionRepairService({ bd, repo: REPO });

    await expect(
      service.ensureLinkedBead({
        root_bead_id: ROOT,
        op_id: 'create-child',
        failure_key: failureKey()
      })
    ).rejects.toThrow('repair_bead_identity_conflict');
  });
});

describe('worker/completion-repair pinned ownership probe', () => {
  test('classifies a green pinned base as PR-owned', async () => {
    const runVerify = vi.fn(async () => ({ ok: true, reason: 'ok', exit: 0 }));
    const service = createCompletionRepairService({
      bd: /** @type {any} */ ({}),
      repo: REPO,
      resolveVerify: async () => ({
        state: 'resolved',
        value: { cmd: ['npm', 'test'], timeout_ms: 1000 }
      }),
      runVerify
    });

    const result = await service.probeOwnership({
      root_bead_id: ROOT,
      source: 'verify',
      failure_key: failureKey()
    });

    expect(result).toMatchObject({ state: 'pr_owned' });
    expect(runVerify).toHaveBeenCalledWith(
      expect.objectContaining({
        repo: REPO,
        bead_id: ROOT,
        sha: BASE_SHA,
        retry_flaky: false
      })
    );
  });

  test('classifies the same local failure on the pinned base as base-owned', async () => {
    const service = createCompletionRepairService({
      bd: /** @type {any} */ ({}),
      repo: REPO,
      resolveVerify: async () => ({
        state: 'resolved',
        value: { cmd: ['npm', 'test'], timeout_ms: 1000 }
      }),
      runVerify: async () => ({
        ok: false,
        reason: 'verify_cmd_failed',
        exit: 1,
        output_tail: 'same regression',
        log_path: '/state/base-verify.log'
      })
    });

    const result = await service.probeOwnership({
      root_bead_id: ROOT,
      source: 'verify',
      failure_key: failureKey()
    });

    expect(result).toMatchObject({
      state: 'base_owned',
      evidence: {
        output_tail: 'same regression',
        log_path: '/state/base-verify.log'
      }
    });
  });

  test('leaves timeout ownership undecidable', async () => {
    const service = createCompletionRepairService({
      bd: /** @type {any} */ ({}),
      repo: REPO,
      resolveVerify: async () => ({
        state: 'resolved',
        value: { cmd: ['npm', 'test'], timeout_ms: 1000 }
      }),
      runVerify: async () => ({
        ok: false,
        reason: 'verify_cmd_timeout',
        exit: null
      })
    });

    const result = await service.probeOwnership({
      root_bead_id: ROOT,
      source: 'verify',
      failure_key: failureKey()
    });

    expect(result).toEqual({
      state: 'undecidable',
      reason: 'verify_cmd_timeout'
    });
  });
});
