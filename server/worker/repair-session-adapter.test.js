import { describe, expect, test, vi } from 'vitest';
import {
  createRepairSessionAdapter,
  repairEvidenceKey,
  repairSessionPrompt,
  resolveRepairOwner,
  sanitizeOutput,
  testScopeOf
} from './repair-session-adapter.js';

/**
 * @param {Record<string, any>} [patch]
 */
function failedOperation(patch = {}) {
  return {
    kind: 'deploy',
    subjects: [{ bead_id: 'UI-a', merged_sha: 'a'.repeat(40) }],
    effective_base_sha: 'b'.repeat(40),
    target_base: 'main',
    target_sha: 'c'.repeat(40),
    target_tree: 'd'.repeat(40),
    script_object_type: 'blob',
    script_path: 'repo-ops/script/deploy',
    script_mode: '100755',
    script_blob_sha: 'e'.repeat(40),
    state: 'failed',
    attempt_id: 'op-1:1',
    started_at: 10,
    finished_at: 30,
    exit_code: 2,
    signal: null,
    log_path: null,
    log_digest: null,
    failure: {
      code: 'script_failed',
      fingerprint: 'f'.repeat(64),
      detail: 'deploy failed: token=abcdef123456',
      interrupted: false
    },
    repair: {
      chain_id: 'op-1',
      owner_bead: 'UI-a',
      auto_budget: 1,
      auto_used: 1,
      session_id: null,
      attempt_id: null
    },
    ...patch
  };
}

describe('sanitizeOutput', () => {
  test('redacts a github token shape', () => {
    const sanitized = sanitizeOutput('using ghp_0123456789abcdefghij now');

    expect(sanitized).toBe('using [redacted] now');
  });

  test('redacts a bearer header value', () => {
    const sanitized = sanitizeOutput('Authorization: Bearer abcdef0123456789');

    expect(sanitized).toBe('Authorization: [redacted]');
  });

  test('redacts a key-value secret assignment', () => {
    const sanitized = sanitizeOutput('password=hunter2 remains');

    expect(sanitized).toBe('[redacted] remains');
  });

  test('keeps ordinary diagnostic text intact', () => {
    const sanitized = sanitizeOutput('npm run build exited with 2');

    expect(sanitized).toBe('npm run build exited with 2');
  });
});

describe('resolveRepairOwner', () => {
  test('returns the only subject without asking git', async () => {
    const gitRun = vi.fn();

    const owner = await resolveRepairOwner(
      { gitRun, repo: '/repo' },
      {
        subjects: [{ bead_id: 'UI-a', merged_sha: 'a'.repeat(40) }],
        target_sha: null
      }
    );

    expect([owner, gitRun.mock.calls.length]).toEqual(['UI-a', 0]);
  });

  test('picks the newest merged subject contained in the target', async () => {
    /** @param {string[]} args */
    const gitRun = async (args) => {
      if (args[0] === 'merge-base') {
        return { code: 0, stdout: '' };
      }
      return {
        code: 0,
        stdout: args[3].startsWith('a') ? '100\n' : '200\n'
      };
    };

    const owner = await resolveRepairOwner(
      { gitRun, repo: '/repo' },
      {
        subjects: [
          { bead_id: 'UI-a', merged_sha: 'a'.repeat(40) },
          { bead_id: 'UI-b', merged_sha: 'b'.repeat(40) }
        ],
        target_sha: 'c'.repeat(40)
      }
    );

    expect(owner).toBe('UI-b');
  });

  test('breaks a timestamp tie by the first bead id', async () => {
    /** @param {string[]} args */
    const gitRun = async (args) =>
      args[0] === 'merge-base'
        ? { code: 0, stdout: '' }
        : { code: 0, stdout: '100\n' };

    const owner = await resolveRepairOwner(
      { gitRun, repo: '/repo' },
      {
        subjects: [
          { bead_id: 'UI-z', merged_sha: 'a'.repeat(40) },
          { bead_id: 'UI-b', merged_sha: 'b'.repeat(40) }
        ],
        target_sha: 'c'.repeat(40)
      }
    );

    expect(owner).toBe('UI-b');
  });

  test('excludes a subject the bound target does not contain', async () => {
    /** @param {string[]} args */
    const gitRun = async (args) => {
      if (args[0] === 'merge-base') {
        return { code: args[2].startsWith('a') ? 1 : 0, stdout: '' };
      }
      return {
        code: 0,
        stdout: args[3].startsWith('a') ? '900\n' : '100\n'
      };
    };

    const owner = await resolveRepairOwner(
      { gitRun, repo: '/repo' },
      {
        subjects: [
          { bead_id: 'UI-a', merged_sha: 'a'.repeat(40) },
          { bead_id: 'UI-b', merged_sha: 'b'.repeat(40) }
        ],
        target_sha: 'c'.repeat(40)
      }
    );

    expect(owner).toBe('UI-b');
  });
});

describe('repairEvidenceKey', () => {
  test('changes when the pinned script blob changes', () => {
    const before = repairEvidenceKey(failedOperation());

    const after = repairEvidenceKey(
      failedOperation({ script_blob_sha: '9'.repeat(40) })
    );

    expect(before).not.toBe(after);
  });

  test('stays equal for the same tree, script and environment', () => {
    const left = repairEvidenceKey(failedOperation());

    const right = repairEvidenceKey(failedOperation());

    expect(left).toBe(right);
  });
});

describe('dispatch packet', () => {
  /**
   * @param {Record<string, any>} [overrides]
   */
  function adapterFor(overrides = {}) {
    const dispatchSession =
      overrides.dispatchSession ??
      vi.fn(async () => ({ ok: true, attempt_id: 'att-1', session_id: 's-1' }));
    const adapter = createRepairSessionAdapter({
      repo: '/repo',
      store: overrides.store ?? { snapshot: () => ({ repo_operations: {} }) },
      gitRun: async () => ({ code: 0, stdout: '' }),
      dispatchSession,
      beadFacts:
        overrides.beadFacts ??
        (async () => ({
          test_scope: { path: 'docs/plan.md', section: 'Test scope' },
          review: { pr_url: 'https://example.test/pr/1' }
        }))
    });
    return { adapter, dispatchSession };
  }

  test('carries the failure exact input', async () => {
    const { adapter } = adapterFor();

    const packet = await adapter.buildPacket({
      workspace: '/ws',
      operation_id: 'op-1',
      operation: failedOperation(),
      mode: 'auto',
      owner_bead: 'UI-a'
    });

    expect(packet.operation).toMatchObject({
      operation_id: 'op-1',
      kind: 'deploy',
      target_sha: 'c'.repeat(40),
      script_blob_sha: 'e'.repeat(40)
    });
  });

  test('carries the contract classification of the failure', async () => {
    const { adapter } = adapterFor();

    const packet = await adapter.buildPacket({
      workspace: '/ws',
      operation_id: 'op-1',
      operation: failedOperation(),
      mode: 'auto',
      owner_bead: 'UI-a'
    });

    expect(/** @type {any} */ (packet.failure).classification).toBe(
      'deploy_script_failure'
    );
  });

  test('sanitizes the failure detail it forwards', async () => {
    const { adapter } = adapterFor();

    const packet = await adapter.buildPacket({
      workspace: '/ws',
      operation_id: 'op-1',
      operation: failedOperation(),
      mode: 'auto',
      owner_bead: 'UI-a'
    });

    expect(/** @type {any} */ (packet.failure).detail).toBe(
      'deploy failed: [redacted]'
    );
  });

  test('carries the spec/plan Test scope', async () => {
    const { adapter } = adapterFor();

    const packet = await adapter.buildPacket({
      workspace: '/ws',
      operation_id: 'op-1',
      operation: failedOperation(),
      mode: 'auto',
      owner_bead: 'UI-a'
    });

    expect(packet.test_scope).toEqual({
      path: 'docs/plan.md',
      section: 'Test scope'
    });
  });

  test('carries the current review and PR facts', async () => {
    const { adapter } = adapterFor();

    const packet = await adapter.buildPacket({
      workspace: '/ws',
      operation_id: 'op-1',
      operation: failedOperation(),
      mode: 'auto',
      owner_bead: 'UI-a'
    });

    expect(packet.review).toEqual({ pr_url: 'https://example.test/pr/1' });
  });

  test('carries the contract prohibitions', async () => {
    const { adapter } = adapterFor();

    const packet = await adapter.buildPacket({
      workspace: '/ws',
      operation_id: 'op-1',
      operation: failedOperation(),
      mode: 'auto',
      owner_bead: 'UI-a'
    });

    expect(packet.prohibitions).toContain('agent_self_report_as_success');
  });

  test('refuses to dispatch without a resolved owner bead', async () => {
    const { adapter, dispatchSession } = adapterFor();

    const result = await adapter.dispatch({
      workspace: '/ws',
      operation_id: 'op-1',
      operation: failedOperation(),
      mode: 'auto',
      owner_bead: null
    });

    expect([result.reason, dispatchSession.mock.calls.length]).toEqual([
      'repair_owner_unresolved',
      0
    ]);
  });

  test('reports the scheduler refusal reason verbatim', async () => {
    const dispatchSession = vi.fn(async () => ({
      ok: false,
      reason: 'worktree_missing'
    }));
    const { adapter } = adapterFor({ dispatchSession });

    const result = await adapter.dispatch({
      workspace: '/ws',
      operation_id: 'op-1',
      operation: failedOperation(),
      mode: 'auto',
      owner_bead: 'UI-a'
    });

    expect(result).toEqual({ ok: false, reason: 'worktree_missing' });
  });
});

describe('judgement from fresh facts', () => {
  /**
   * @param {Record<string, any>} queue
   */
  function adapterOver(queue) {
    return createRepairSessionAdapter({
      repo: '/repo',
      store: { snapshot: () => queue },
      gitRun: async () => ({ code: 0, stdout: '' }),
      dispatchSession: async () => ({ ok: false })
    });
  }

  test('closes the chain on a terminal success in it', async () => {
    const adapter = adapterOver({
      repo_operations: {
        'op-1': { state: 'repairing', repair: { chain_id: 'op-1' } },
        'op-2': { state: 'succeeded', repair: { chain_id: 'op-1' } }
      },
      attempts: {}
    });

    const judged = await adapter.judge({
      workspace: '/ws',
      operation_id: 'op-1'
    });

    expect(judged).toEqual({ verdict: 'chain_closed', evidence: 'op-2' });
  });

  test('reports a still-running repair session', async () => {
    const adapter = adapterOver({
      repo_operations: {
        'op-1': {
          state: 'repairing',
          repair: { chain_id: 'op-1', attempt_id: 'att-1' }
        }
      },
      attempts: { 'att-1': { status: 'running' } }
    });

    const judged = await adapter.judge({
      workspace: '/ws',
      operation_id: 'op-1'
    });

    expect(judged.verdict).toBe('session_running');
  });

  test('does not treat a finished session as a resolution', async () => {
    const adapter = adapterOver({
      repo_operations: {
        'op-1': {
          state: 'repairing',
          repair: { chain_id: 'op-1', attempt_id: 'att-1' }
        }
      },
      attempts: { 'att-1': { status: 'done' } }
    });

    const judged = await adapter.judge({
      workspace: '/ws',
      operation_id: 'op-1'
    });

    expect(judged.verdict).toBe('unresolved');
  });
});

describe('repairSessionPrompt', () => {
  test('states that the outcome is judged by fresh readback', () => {
    const prompt = repairSessionPrompt({
      operation: { kind: 'deploy', operation_id: 'op-1' },
      failure: { code: 'script_failed' },
      prohibitions: []
    });

    expect(prompt).toContain('fresh git/operation readback');
  });

  test('forbids deleting the declaration to turn a failure into a success', () => {
    const prompt = repairSessionPrompt({
      operation: { kind: 'deploy', operation_id: 'op-1' },
      failure: { code: 'script_failed' },
      prohibitions: ['config_or_script_deletion_to_bypass_gate']
    });

    expect(prompt).toContain('script를 삭제해');
  });

  test('forbids the session re-dispatching itself', () => {
    const prompt = repairSessionPrompt({
      operation: { kind: 'deploy', operation_id: 'op-1' },
      failure: { code: 'script_failed' },
      prohibitions: []
    });

    expect(prompt).toContain('실패한 자신을 다시 dispatch하지 마라');
  });

  test('names the contract enum the prohibitions came from', () => {
    const prompt = repairSessionPrompt({
      operation: { kind: 'deploy', operation_id: 'op-1' },
      failure: { code: 'script_failed' },
      prohibitions: ['credential_entry', 'destructive_action']
    });

    expect(prompt).toContain('credential_entry, destructive_action');
  });
});

describe('testScopeOf', () => {
  test('prefers the plan path over the spec path', () => {
    const scope = testScopeOf({
      plan_path: 'docs/plan.md',
      spec_id: 'docs/spec.md'
    });

    expect(scope).toEqual({ path: 'docs/plan.md', section: 'Test scope' });
  });

  test('falls back to the spec path', () => {
    const scope = testScopeOf({ plan_path: null, spec_id: 'docs/spec.md' });

    expect(scope).toEqual({ path: 'docs/spec.md', section: 'Test scope' });
  });

  test('returns null when neither is recorded', () => {
    const scope = testScopeOf({ plan_path: null, spec_id: null });

    expect(scope).toBeNull();
  });
});
