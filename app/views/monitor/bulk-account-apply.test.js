import { describe, expect, test, vi } from 'vitest';
import {
  formatBulkResult,
  planBulkAccountApply,
  runBulkAccountApply
} from './bulk-account-apply.js';

/**
 * @param {Partial<Record<string, any>>} overrides
 * @returns {Record<string, any>}
 */
function row(overrides) {
  return {
    root_dir: '/repo/a',
    name: 'a',
    revision: 1,
    provider_limit_policy: { claude: {}, codex: {} },
    ...overrides
  };
}

const source_accounts = {
  state: 'usable',
  values: { claude_account: 'work-claude' },
  pending: false
};

const source_policy = {
  claude: { mode: 'switch', accounts: ['acct-a'], preempt_pct: 50 },
  codex: { mode: 'wait', accounts: ['acct-b'], preempt_pct: 10 }
};

describe('planBulkAccountApply', () => {
  test('drops the source repo from targets even when selected', () => {
    const rows = [row({ root_dir: '/repo/src' }), row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/src', '/repo/b']),
      source_root: '/repo/src',
      source_accounts,
      source_policy
    });

    expect(plan.targets.map((target) => target.root_dir)).toEqual(['/repo/b']);
  });

  test('carries both value keys with null for a key the source lacks', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b']),
      source_root: '/repo/src',
      source_accounts,
      source_policy
    });

    expect(plan.targets[0].values).toEqual({
      claude_account: 'work-claude',
      codex_account: null
    });
  });

  test('normalizes a mode outside the enum to switch', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b']),
      source_root: '/repo/src',
      source_accounts,
      source_policy: {
        claude: { mode: 'nonsense', accounts: [], preempt_pct: null },
        codex: {}
      }
    });

    expect(plan.targets[0].patches.claude.mode).toBe('switch');
  });

  test('drops non-string and whitespace-containing account entries', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b']),
      source_root: '/repo/src',
      source_accounts,
      source_policy: {
        claude: {
          mode: 'switch',
          accounts: ['ok-acct', 42, 'bad acct', null],
          preempt_pct: null
        },
        codex: {}
      }
    });

    expect(plan.targets[0].patches.claude.accounts).toEqual(['ok-acct']);
  });

  test('normalizes a preempt_pct outside 1-99 integer to null', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b']),
      source_root: '/repo/src',
      source_accounts,
      source_policy: {
        claude: { mode: 'switch', accounts: [], preempt_pct: 150 },
        codex: {}
      }
    });

    expect(plan.targets[0].patches.claude.preempt_pct).toBeNull();
  });

  test('disables when zero targets are selected', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(),
      source_root: '/repo/src',
      source_accounts,
      source_policy
    });

    expect(plan.disabled_reason).toBe('적용할 저장소를 고르세요');
  });

  test('disables when the source account state is unusable', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b']),
      source_root: '/repo/src',
      source_accounts: { state: 'unusable', values: {}, pending: false },
      source_policy
    });

    expect(plan.disabled_reason).toBe(
      '이 저장소의 실행 계정 기본값을 해석할 수 없습니다'
    );
  });

  test('disables when the source policy is missing', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b']),
      source_root: '/repo/src',
      source_accounts,
      source_policy: null
    });

    expect(plan.disabled_reason).toBe('서버가 한도 정책을 싣지 않습니다');
  });

  test('disables while the source accounts draft is pending', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b']),
      source_root: '/repo/src',
      source_accounts: { ...source_accounts, pending: true },
      source_policy
    });

    expect(plan.disabled_reason).toBe('저장 확인을 기다리는 중');
  });

  test('disables while a run is already in progress', () => {
    const rows = [row({ root_dir: '/repo/b' })];

    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b']),
      source_root: '/repo/src',
      source_accounts,
      source_policy,
      running: true
    });

    expect(plan.disabled_reason).toBe('적용 중입니다');
  });
});

/**
 * @param {string} root_dir
 * @param {string} name
 * @returns {import('./bulk-account-apply.js').BulkAccountTarget}
 */
function target(root_dir, name) {
  return {
    root_dir,
    name,
    revision: 1,
    values: { claude_account: 'work-claude', codex_account: null },
    patches: {
      claude: { mode: 'switch', accounts: ['acct-a'], preempt_pct: 50 },
      codex: { mode: 'wait', accounts: ['acct-b'], preempt_pct: 10 }
    }
  };
}

const applied_account_response = { applied: true };
const applied_policy_response = { applied: true, queue: { revision: 2 } };

describe('runBulkAccountApply', () => {
  test('sends set-workspace-accounts then claude policy then codex policy in order', async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ applied: true, queue: { revision: 2 } });
    const targets = [target('/repo/a', 'a')];

    await runBulkAccountApply({ targets, send, adopt: vi.fn() });

    expect(send.mock.calls.map((call) => call[0])).toEqual([
      'set-workspace-accounts',
      'worker-provider-limit-policy-set',
      'worker-provider-limit-policy-set'
    ]);
    expect(send.mock.calls[1][1].runner).toBe('claude');
    expect(send.mock.calls[2][1].runner).toBe('codex');
  });

  test('sends for each repo in order', async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ applied: true, queue: { revision: 2 } });
    const targets = [target('/repo/a', 'a'), target('/repo/b', 'b')];

    await runBulkAccountApply({ targets, send, adopt: vi.fn() });

    const roots = send.mock.calls.map((call) => call[1].root_dir);
    expect(roots).toEqual([
      '/repo/a',
      '/repo/a',
      '/repo/a',
      '/repo/b',
      '/repo/b',
      '/repo/b'
    ]);
  });

  test('marks a repo failed with zero policy requests on an account error response', async () => {
    const send = vi.fn().mockResolvedValueOnce({ error: '거부됨' });
    const targets = [target('/repo/a', 'a')];

    const results = await runBulkAccountApply({
      targets,
      send,
      adopt: vi.fn()
    });

    expect(results[0].state).toBe('failed');
    expect(send).toHaveBeenCalledTimes(1);
  });

  test('marks a repo failed with zero policy requests on a thrown account send', async () => {
    const send = vi.fn().mockRejectedValueOnce(new Error('network down'));
    const targets = [target('/repo/a', 'a')];

    const results = await runBulkAccountApply({
      targets,
      send,
      adopt: vi.fn()
    });

    expect(results[0].state).toBe('failed');
    expect(send).toHaveBeenCalledTimes(1);
  });

  test('marks a repo failed with zero policy requests on state unusable', async () => {
    const send = vi.fn().mockResolvedValueOnce({ state: 'unusable' });
    const targets = [target('/repo/a', 'a')];

    const results = await runBulkAccountApply({
      targets,
      send,
      adopt: vi.fn()
    });

    expect(results[0].state).toBe('failed');
    expect(send).toHaveBeenCalledTimes(1);
  });

  test('retries a conflicting policy response once with the response revision', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(applied_account_response)
      .mockResolvedValueOnce({ conflict: true, queue: { revision: 9 } })
      .mockResolvedValueOnce(applied_policy_response)
      .mockResolvedValueOnce(applied_policy_response);
    const targets = [target('/repo/a', 'a')];

    await runBulkAccountApply({ targets, send, adopt: vi.fn() });

    expect(send).toHaveBeenCalledTimes(4);
    expect(send.mock.calls[2][1].expected_revision).toBe(9);
  });

  test('uses the revision adopted from the claude response for the codex request', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(applied_account_response)
      .mockResolvedValueOnce({ applied: true, queue: { revision: 5 } })
      .mockResolvedValueOnce(applied_policy_response);
    const targets = [target('/repo/a', 'a')];

    await runBulkAccountApply({ targets, send, adopt: vi.fn() });

    expect(send.mock.calls[2][1].expected_revision).toBe(5);
  });

  test('marks partial with the failing runner name when one policy ultimately fails', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(applied_account_response)
      .mockResolvedValueOnce({ applied: false, queue: { revision: 2 } })
      .mockResolvedValueOnce(applied_policy_response);
    const targets = [target('/repo/a', 'a')];

    const results = await runBulkAccountApply({
      targets,
      send,
      adopt: vi.fn()
    });

    expect(results[0].state).toBe('partial');
    expect(results[0].detail).toContain('claude');
  });

  test('marks applied when all three requests succeed', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(applied_account_response)
      .mockResolvedValueOnce(applied_policy_response)
      .mockResolvedValueOnce(applied_policy_response);
    const targets = [target('/repo/a', 'a')];

    const results = await runBulkAccountApply({
      targets,
      send,
      adopt: vi.fn()
    });

    expect(results[0].state).toBe('applied');
  });

  test('continues to the next repo after a failing repo', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce({ error: '거부됨' })
      .mockResolvedValueOnce(applied_account_response)
      .mockResolvedValueOnce(applied_policy_response)
      .mockResolvedValueOnce(applied_policy_response);
    const targets = [target('/repo/a', 'a'), target('/repo/b', 'b')];

    const results = await runBulkAccountApply({
      targets,
      send,
      adopt: vi.fn()
    });

    expect(results.map((result) => result.state)).toEqual([
      'failed',
      'applied'
    ]);
  });

  test('stops sending remaining repos when isCancelled becomes true', async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ applied: true, queue: { revision: 2 } });
    const targets = [target('/repo/a', 'a'), target('/repo/b', 'b')];
    let calls = 0;
    const isCancelled = () => {
      calls += 1;
      return calls > 1;
    };

    await runBulkAccountApply({ targets, send, adopt: vi.fn(), isCancelled });

    expect(
      send.mock.calls.every((call) => call[1].root_dir === '/repo/a')
    ).toBe(true);
  });
});

test('formatBulkResult is re-exported for the account section to reuse phrasing', () => {
  const text = formatBulkResult({
    root_dir: '/repo/a',
    name: 'a',
    state: 'applied',
    detail: ''
  });

  expect(text).toEqual({ icon: '✓', text: 'a 적용됨' });
});
