import { describe, expect, test, vi } from 'vitest';
import {
  countEditFields,
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

const rows = [row({ root_dir: '/repo/a' }), row({ root_dir: '/repo/b' })];

/**
 * @param {Partial<import('./bulk-account-apply.js').BulkAccountEdit>} [patch]
 * @returns {import('./bulk-account-apply.js').BulkAccountEdit}
 */
function edit(patch = {}) {
  return { values: {}, patches: {}, ...patch };
}

describe('planBulkAccountApply', () => {
  test('targets every selected row in row order', () => {
    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(['/repo/b', '/repo/a']),
      edit: edit({ values: { claude_account: 'work' } })
    });

    expect(plan.targets.map((target) => target.root_dir)).toEqual([
      '/repo/a',
      '/repo/b'
    ]);
  });

  test('carries only the changed account keys', () => {
    const plan = planBulkAccountApply({
      rows,
      selected_roots: ['/repo/a'],
      edit: edit({ values: { claude_account: null } })
    });

    expect(plan.targets[0].values).toEqual({ claude_account: null });
    expect(plan.targets[0].patches).toEqual({});
  });

  test('carries only the changed fields of a runner patch', () => {
    const plan = planBulkAccountApply({
      rows,
      selected_roots: ['/repo/a'],
      edit: edit({ patches: { codex: { accounts: [] } } })
    });

    expect(plan.targets[0].patches).toEqual({ codex: { accounts: [] } });
  });

  test('drops non-string and whitespace-containing account entries', () => {
    const plan = planBulkAccountApply({
      rows,
      selected_roots: ['/repo/a'],
      edit: edit({
        patches: {
          claude: {
            accounts: /** @type {any} */ (['ok', 'has space', 3, ''])
          }
        }
      })
    });

    expect(plan.targets[0].patches.claude?.accounts).toEqual(['ok']);
  });

  test('counts runner fields separately', () => {
    const count = countEditFields(
      edit({
        values: { codex_account: 'k' },
        patches: {
          claude: { mode: 'wait', preempt_pct: null },
          codex: { mode: 'wait' }
        }
      })
    );

    expect(count).toBe(4);
  });

  test('disables when zero targets are selected', () => {
    const plan = planBulkAccountApply({
      rows,
      selected_roots: new Set(),
      edit: edit({ values: { claude_account: 'work' } })
    });

    expect(plan.disabled_reason).toBe('적용할 저장소를 고르세요');
  });

  test('disables when the edit changes nothing', () => {
    const plan = planBulkAccountApply({
      rows,
      selected_roots: ['/repo/a'],
      edit: edit()
    });

    expect(plan.disabled_reason).toBe('바꿀 항목을 고르세요');
  });

  test('disables when the preemptive threshold is outside 1-99 integer', () => {
    const reasons = [0, 100, 50.5].map(
      (preempt_pct) =>
        planBulkAccountApply({
          rows,
          selected_roots: ['/repo/a'],
          edit: edit({ patches: { claude: { preempt_pct } } })
        }).disabled_reason
    );

    expect(reasons).toEqual([
      '선제 전환 기준은 1–99 정수입니다',
      '선제 전환 기준은 1–99 정수입니다',
      '선제 전환 기준은 1–99 정수입니다'
    ]);
  });

  test('disables a policy change when no selected row carries the policy key', () => {
    const old_rows = [{ root_dir: '/repo/a', name: 'a', revision: 1 }];

    const plan = planBulkAccountApply({
      rows: old_rows,
      selected_roots: ['/repo/a'],
      edit: edit({ patches: { claude: { mode: 'wait' } } })
    });

    expect(plan.disabled_reason).toBe('서버가 한도 정책을 싣지 않습니다');
  });

  test('allows an account-only change on a server without the policy key', () => {
    const old_rows = [{ root_dir: '/repo/a', name: 'a', revision: 1 }];

    const plan = planBulkAccountApply({
      rows: old_rows,
      selected_roots: ['/repo/a'],
      edit: edit({ values: { claude_account: 'work' } })
    });

    expect(plan.disabled_reason).toBe(null);
  });

  test('disables while a run is already in progress', () => {
    const plan = planBulkAccountApply({
      rows,
      selected_roots: ['/repo/a'],
      edit: edit({ values: { claude_account: 'work' } }),
      running: true
    });

    expect(plan.disabled_reason).toBe('적용 중입니다');
  });
});

/**
 * @param {string} root_dir
 * @param {string} name
 * @param {Partial<import('./bulk-account-apply.js').BulkAccountTarget>} [patch]
 * @returns {import('./bulk-account-apply.js').BulkAccountTarget}
 */
function target(root_dir, name, patch = {}) {
  return {
    root_dir,
    name,
    revision: 1,
    values: { claude_account: 'work-claude' },
    patches: {
      claude: { mode: 'switch', accounts: ['acct-a'], preempt_pct: 50 },
      codex: { mode: 'wait' }
    },
    ...patch
  };
}

const applied_account_response = { state: 'usable', values: {} };
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
    expect(results[0].detail).toBe('claude 한도 정책 미적용');
  });

  test('joins every failing part of a partial result with a middle dot', async () => {
    const send = vi
      .fn()
      .mockResolvedValueOnce(applied_account_response)
      .mockResolvedValueOnce({ error: 'bad' })
      .mockRejectedValueOnce(new Error('down'));

    const results = await runBulkAccountApply({
      targets: [target('/repo/a', 'a')],
      send,
      adopt: vi.fn()
    });

    expect(formatBulkResult(results[0]).text).toBe(
      'a 부분 적용 — claude 한도 정책·codex 한도 정책 미적용'
    );
  });

  test('skips the account request when the edit carries no account value', async () => {
    const send = vi.fn().mockResolvedValue(applied_policy_response);

    await runBulkAccountApply({
      targets: [target('/repo/a', 'a', { values: {} })],
      send,
      adopt: vi.fn()
    });

    expect(send.mock.calls.map((call) => call[0])).toEqual([
      'worker-provider-limit-policy-set',
      'worker-provider-limit-policy-set'
    ]);
  });

  test('skips the policy request of a runner without a patch', async () => {
    const send = vi.fn().mockResolvedValue(applied_account_response);

    const results = await runBulkAccountApply({
      targets: [target('/repo/a', 'a', { patches: {} })],
      send,
      adopt: vi.fn()
    });

    expect(send.mock.calls).toEqual([
      [
        'set-workspace-accounts',
        { root_dir: '/repo/a', values: { claude_account: 'work-claude' } }
      ]
    ]);
    expect(results[0].state).toBe('applied');
  });

  test('sends only the codex policy with the row revision when claude has no patch', async () => {
    const send = vi.fn().mockResolvedValue(applied_policy_response);

    await runBulkAccountApply({
      targets: [
        target('/repo/a', 'a', {
          values: {},
          revision: 7,
          patches: { codex: { accounts: [] } }
        })
      ],
      send,
      adopt: vi.fn()
    });

    expect(send.mock.calls).toEqual([
      [
        'worker-provider-limit-policy-set',
        {
          root_dir: '/repo/a',
          runner: 'codex',
          patch: { accounts: [] },
          expected_revision: 7
        }
      ]
    ]);
  });

  test('marks failed when no sent policy request succeeds', async () => {
    const send = vi.fn().mockResolvedValue({ applied: false });

    const results = await runBulkAccountApply({
      targets: [target('/repo/a', 'a', { values: {} })],
      send,
      adopt: vi.fn()
    });

    expect(results[0]).toEqual({
      root_dir: '/repo/a',
      name: 'a',
      state: 'failed',
      detail: 'claude 한도 정책·codex 한도 정책 미적용'
    });
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

  test('stops the policy requests of the current repo once cancelled after the account write', async () => {
    const send = vi
      .fn()
      .mockResolvedValue({ applied: true, state: 'usable', values: {} });
    const targets = [target('/repo/a', 'a')];
    let cancelled = false;
    send.mockImplementation(async () => {
      cancelled = true;
      return { applied: true, state: 'usable', values: {} };
    });

    await runBulkAccountApply({
      targets,
      send,
      adopt: vi.fn(),
      isCancelled: () => cancelled
    });

    expect(send).toHaveBeenCalledTimes(1);
  });

  test('keeps the verdict of a repo whose account write landed before cancelling', async () => {
    let cancelled = false;
    const send = vi.fn(async () => {
      cancelled = true;
      return applied_account_response;
    });

    const results = await runBulkAccountApply({
      targets: [target('/repo/a', 'a')],
      send,
      adopt: vi.fn(),
      isCancelled: () => cancelled
    });

    expect(results).toEqual([
      {
        root_dir: '/repo/a',
        name: 'a',
        state: 'partial',
        detail: 'claude 한도 정책·codex 한도 정책 미적용'
      }
    ]);
  });

  test('adopts the queue of a policy response received right before cancelling', async () => {
    const adopt = vi.fn();
    let cancelled = false;
    const send = vi.fn(async (/** @type {string} */ type) => {
      if (type === 'worker-provider-limit-policy-set') {
        cancelled = true;
        return { applied: false, conflict: true, queue: { revision: 9 } };
      }
      return { state: 'usable', values: {} };
    });

    await runBulkAccountApply({
      targets: [target('/repo/a', 'a')],
      send,
      adopt,
      isCancelled: () => cancelled
    });

    expect(adopt).toHaveBeenCalledWith('/repo/a', { revision: 9 });
    expect(send).toHaveBeenCalledTimes(2);
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
