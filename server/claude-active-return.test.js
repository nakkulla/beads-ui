import { describe, expect, test, vi } from 'vitest';
import {
  CLAUDE_ACTIVE_RETURN_INTERVAL_MS,
  createClaudeActiveReturn
} from './claude-active-return.js';

/**
 * @typedef {import('./routes/claude-usage.js').UsageAccount} UsageAccount
 * @typedef {import('./routes/claude-usage.js').UsageWindow} UsageWindow
 */

const A3 = 'three@hanmail.example';
const A4 = 'four@unist.example';
const A5 = 'five@example.test';

const BEADS_UI = '/repos/beads-ui';
const TRAIN_BOT = '/repos/train_bot';

/**
 * @param {number} pct_5h
 * @param {number} pct_7d
 * @returns {UsageWindow[]}
 */
function windowsOf(pct_5h, pct_7d) {
  return [
    { key: '5h', pct: pct_5h, resetsAt: '2026-11-07T05:00:00.000Z' },
    { key: '7d', pct: pct_7d, resetsAt: '2026-11-12T00:00:00.000Z' }
  ];
}

/**
 * @param {string} email
 * @param {number} number
 * @param {UsageWindow[]} windows
 * @param {{ active?: boolean, own?: boolean, status?: string }} [options]
 * @returns {UsageAccount}
 */
function account(email, number, windows, options = {}) {
  return {
    key: email,
    number,
    email,
    alias: null,
    plan: null,
    active: options.active === true,
    sessionLoginOwn: options.own !== false,
    status: options.status ?? 'ok',
    windows,
    fetchedAt: '2026-11-07T00:00:00.000Z',
    ageSeconds: 0
  };
}

/**
 * @param {UsageAccount[]} accounts
 */
function listOf(accounts) {
  const active = accounts.find((row) => row.active);
  return {
    ok: /** @type {const} */ (true),
    accounts,
    active_key: active?.key ?? null
  };
}

/** Common setup (§5): 3 active at 5h 100% / 7d 10%, 4 at 5h 0% / 7d 10%. */
function commonAccounts() {
  return [
    account(A3, 3, windowsOf(100, 10), { active: true }),
    account(A4, 4, windowsOf(0, 10))
  ];
}

/**
 * @param {'switch'|'wait'} mode
 * @param {string[]} accounts
 * @param {Record<string, unknown>} [extra]
 */
function queueOf(mode, accounts, extra = {}) {
  return {
    provider_limit_policy: {
      claude: { mode, accounts, preempt_pct: null },
      codex: { mode: 'switch', accounts: [], preempt_pct: null }
    },
    provider_hold: {},
    attempts: {},
    ...extra
  };
}

/**
 * @param {Partial<{ accounts: UsageAccount[], fresh: UsageAccount[], workspaces: Array<{ key: string, queue?: any, throws?: boolean }>, layers: Record<string, any>, locked: boolean }>} [overrides]
 */
function makeHarness(overrides = {}) {
  const accounts = overrides.accounts ?? commonAccounts();
  const state = {
    /** @type {any} */
    cached: listOf(accounts),
    /** @type {any} */
    fresh: listOf(overrides.fresh ?? accounts),
    workspaces: overrides.workspaces ?? [
      { key: BEADS_UI, queue: queueOf('switch', [A3, A4]) }
    ],
    /** @type {Record<string, any>} */
    layers: overrides.layers ?? {},
    locked: overrides.locked === true
  };
  /** @type {Array<() => void>} */
  const ticks = [];
  /** @type {import('vitest').Mock<(account_number: number) => Promise<{ ok: boolean, error?: string }>>} */
  const switchAccount = vi.fn(async () => ({ ok: true }));
  const notify = vi.fn();
  /** @type {import('vitest').Mock<(fn: () => void, ms: number) => any>} */
  const arm = vi.fn((fn) => {
    ticks.push(fn);
    return { id: ticks.length };
  });
  const disarm = vi.fn();
  const listAccounts = vi.fn(async () => state.cached);
  const listAccountsFresh = vi.fn(async () => state.fresh);
  const readWorkspaceAccounts = vi.fn(
    async (/** @type {string} */ workspace) =>
      state.layers[workspace] ?? { state: 'absent', values: {}, warnings: [] }
  );
  const pass = createClaudeActiveReturn({
    listAccounts,
    listAccountsFresh,
    listWorkspaces: () =>
      state.workspaces.map((workspace) => ({
        key: workspace.key,
        name: workspace.key.split('/').pop() ?? workspace.key
      })),
    queueSnapshot: (workspace) => {
      const found = state.workspaces.find((entry) => entry.key === workspace);
      if (!found || found.throws) {
        throw new Error('queue unreadable');
      }
      return found.queue;
    },
    readWorkspaceAccounts,
    acquireLock: () => {
      if (state.locked) {
        return false;
      }
      state.locked = true;
      return true;
    },
    releaseLock: () => {
      state.locked = false;
    },
    isLocked: () => state.locked,
    switchAccount,
    notify,
    setInterval: arm,
    clearInterval: disarm
  });
  return {
    state,
    pass,
    ticks,
    switchAccount,
    notify,
    arm,
    disarm,
    listAccounts,
    listAccountsFresh,
    readWorkspaceAccounts,
    /** Run the most recently armed timer callback and let it settle. */
    async tick() {
      ticks[ticks.length - 1]();
      await new Promise((resolve) => setTimeout(resolve, 0));
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  };
}

/**
 * A running Claude attempt, optionally pinned to an account.
 *
 * @param {string|null} claude_account
 */
function runningClaude(claude_account) {
  return {
    a1: {
      attempt_id: 'a1',
      bead_id: 'UI-1',
      runner: 'claude',
      status: 'running',
      ...(claude_account === null ? {} : { claude_account })
    }
  };
}

describe('switching the exhausted active Claude account', () => {
  test('switches the exhausted active account to the allowed headroom account', async () => {
    const harness = makeHarness();

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('sends one ops notice naming both accounts and the full window', async () => {
    const harness = makeHarness();

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '🔁 Claude 활성 계정 자동 전환 — 계정 #3 → 계정 #4\n#3 5h 100% · 실행 중 세션도 곧 새 계정을 씁니다'
      ]
    ]);
  });

  test('releases the switch lock after the switch', async () => {
    const harness = makeHarness();

    await harness.pass.observe(harness.state.cached);

    expect(harness.state.locked).toBe(false);
  });

  test('switches when only the seven-day window is full', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(10, 100), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('leaves a 99% active account alone', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(99, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('ignores a full model window on the active account', async () => {
    const harness = makeHarness({
      accounts: [
        account(
          A3,
          3,
          [
            ...windowsOf(50, 50),
            { key: 'fable', pct: 100, resetsAt: '2026-11-12T00:00:00.000Z' }
          ],
          { active: true }
        ),
        account(A4, 4, windowsOf(0, 10))
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('treats an active row without window info as not exhausted', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, [], { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('decides nothing when the list read failed', async () => {
    const harness = makeHarness();

    await harness.pass.observe({ ok: false, error: 'unavailable' });

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.listAccountsFresh).not.toHaveBeenCalled();
  });
});

describe('candidate rule', () => {
  test('takes a candidate at 99% five-hour use', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, windowsOf(99, 10))
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('refuses a candidate with a full five-hour window and sends no notice', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, windowsOf(100, 10))
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.notify).not.toHaveBeenCalled();
  });

  test('ignores a full model window on the candidate', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, [
          ...windowsOf(0, 10),
          { key: 'fable', pct: 100, resetsAt: '2026-11-12T00:00:00.000Z' }
        ])
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('refuses a candidate that reports no five-hour or seven-day window', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, [
          { key: 'fable', pct: 0, resetsAt: '2026-11-12T00:00:00.000Z' }
        ])
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('refuses a candidate whose usage status is not ok', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10), { status: 'rate_limited' })
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('refuses a candidate a provider hold targets', async () => {
    const harness = makeHarness({
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [A3, A4], {
            provider_hold: {
              claude: { targets: [{ account: A4, attempt_ids: ['x'] }] }
            }
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('picks the candidate with the lowest seven-day use first', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, windowsOf(0, 60)),
        account(A5, 5, windowsOf(80, 20))
      ],
      workspaces: [{ key: BEADS_UI, queue: queueOf('switch', [A3, A4, A5]) }]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[5]]);
  });

  test('breaks an equal seven-day use by account number', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A5, 5, windowsOf(0, 20)),
        account(A4, 4, windowsOf(50, 20))
      ],
      workspaces: [{ key: BEADS_UI, queue: queueOf('switch', [A3, A5, A4]) }]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });
});

describe('policy criterion', () => {
  test('makes no switch when the only repo allowing the active account waits', async () => {
    const harness = makeHarness({
      workspaces: [{ key: TRAIN_BOT, queue: queueOf('wait', [A3, A4]) }],
      layers: {
        [TRAIN_BOT]: {
          state: 'usable',
          values: { claude_account: A4 },
          warnings: []
        }
      }
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch when no switch repo allows the active account', async () => {
    const harness = makeHarness({
      workspaces: [{ key: BEADS_UI, queue: queueOf('switch', [A4]) }]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch when no single repo allows both accounts', async () => {
    const harness = makeHarness({
      workspaces: [
        { key: '/repos/a', queue: queueOf('switch', [A3]) },
        { key: '/repos/b', queue: queueOf('switch', [A4]) }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('takes the first candidate in workspace key order', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10)),
        account(A5, 5, windowsOf(0, 50))
      ],
      workspaces: [
        { key: '/repos/b', queue: queueOf('switch', [A3, A4]) },
        { key: '/repos/a', queue: queueOf('switch', [A3, A5]) }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[5]]);
  });
});

describe('wait protection', () => {
  const WAIT_WORKSPACES = [
    { key: BEADS_UI, queue: queueOf('switch', [A3, A4]) },
    { key: TRAIN_BOT, queue: queueOf('wait', []) }
  ];

  test('makes no switch while a wait repo has no Claude default account', async () => {
    const harness = makeHarness({ workspaces: WAIT_WORKSPACES });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('sends one hold notice naming the wait repo', async () => {
    const harness = makeHarness({ workspaces: WAIT_WORKSPACES });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '⏸ Claude 활성 계정 자동 전환 보류 — 기다림 저장소 train_bot이 활성 로그인을 씀\n그 저장소에 Claude 기본 계정을 정하면 다음 판정부터 전환합니다'
      ]
    ]);
  });

  test('sends no second hold notice within the same exhaustion interval', async () => {
    const harness = makeHarness({ workspaces: WAIT_WORKSPACES });
    await harness.pass.observe(harness.state.cached);

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify).toHaveBeenCalledTimes(1);
  });

  test('sends the hold notice again in a later exhaustion interval', async () => {
    const harness = makeHarness({ workspaces: WAIT_WORKSPACES });
    await harness.pass.observe(harness.state.cached);
    await harness.pass.observe(
      listOf([
        account(A3, 3, windowsOf(50, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ])
    );

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify).toHaveBeenCalledTimes(2);
  });

  test('switches when the wait repo has a Claude default account', async () => {
    const harness = makeHarness({
      workspaces: WAIT_WORKSPACES,
      layers: {
        [TRAIN_BOT]: {
          state: 'usable',
          values: { claude_account: A4 },
          warnings: []
        }
      }
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('blocks when the wait repo only has a Codex default account', async () => {
    const harness = makeHarness({
      workspaces: WAIT_WORKSPACES,
      layers: {
        [TRAIN_BOT]: {
          state: 'usable',
          values: { codex_account: 'user-1::ws-a' },
          warnings: []
        }
      }
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('blocks when reading the wait repo default throws', async () => {
    const harness = makeHarness({ workspaces: WAIT_WORKSPACES });
    harness.readWorkspaceAccounts.mockRejectedValue(new Error('kv down'));

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });
});

describe('running attempts', () => {
  test('switches while a Claude attempt runs without an account', async () => {
    const harness = makeHarness({
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [A3, A4], {
            attempts: runningClaude(null)
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('keeps an own-login candidate a running attempt uses', async () => {
    const harness = makeHarness({
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [A3, A4], { attempts: runningClaude(A4) })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('drops a shared-login candidate a running attempt uses', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10), { own: false })
      ],
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [A3, A4], { attempts: runningClaude(A4) })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('moves to the next candidate when a shared-login one is in use', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10), { own: false }),
        account(A5, 5, windowsOf(0, 50))
      ],
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [A3, A4, A5], {
            attempts: runningClaude(A4)
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[5]]);
  });
});

describe('confirm stage', () => {
  test('makes no switch when the fresh read shows the active account below 100%', async () => {
    const harness = makeHarness({
      fresh: [
        account(A3, 3, windowsOf(99, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.notify).not.toHaveBeenCalled();
  });

  test('makes no switch when the fresh read shows the active account moved', async () => {
    const harness = makeHarness({
      fresh: [
        account(A3, 3, windowsOf(100, 10)),
        account(A4, 4, windowsOf(0, 10), { active: true })
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch while a manual switch holds the lock', async () => {
    const harness = makeHarness({ locked: true });

    await harness.pass.observe(harness.state.cached);

    expect(harness.listAccountsFresh).not.toHaveBeenCalled();
    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('sends no notice after a failed switch', async () => {
    const harness = makeHarness();
    harness.switchAccount.mockResolvedValue({
      ok: false,
      error: 'switch_failed'
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify).not.toHaveBeenCalled();
    expect(harness.state.locked).toBe(false);
  });

  test('judges again on the next tick after a failed switch', async () => {
    const harness = makeHarness();
    harness.switchAccount.mockResolvedValueOnce({
      ok: false,
      error: 'timeout'
    });
    harness.pass.start();
    await harness.pass.observe(harness.state.cached);

    await harness.tick();

    expect(harness.switchAccount.mock.calls).toEqual([[4], [4]]);
  });

  test('skips an observation that arrives while a pass runs', async () => {
    const harness = makeHarness();
    /** @type {(value: any) => void} */
    let release = () => {};
    harness.listAccountsFresh.mockImplementationOnce(
      () => new Promise((resolve) => (release = resolve))
    );

    const first = harness.pass.observe(harness.state.cached);
    await vi.waitFor(() =>
      expect(harness.listAccountsFresh).toHaveBeenCalled()
    );
    await harness.pass.observe(harness.state.cached);
    release(harness.state.fresh);
    await first;

    expect(harness.listAccountsFresh).toHaveBeenCalledTimes(1);
    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });
});

describe('always-on observation', () => {
  test('arms a sixty-second timer on start', () => {
    const harness = makeHarness();

    harness.pass.start();

    expect(harness.arm).toHaveBeenCalledTimes(1);
    expect(harness.arm.mock.calls[0][1]).toBe(CLAUDE_ACTIVE_RETURN_INTERVAL_MS);
    expect(CLAUDE_ACTIVE_RETURN_INTERVAL_MS).toBe(60_000);
  });

  test('reads the cached list on a tick while nothing is exhausted', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(10, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ]
    });
    harness.pass.start();

    await harness.tick();

    expect(harness.listAccounts).toHaveBeenCalledTimes(1);
    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('keeps the timer while nothing is exhausted', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(10, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ]
    });
    harness.pass.start();

    await harness.tick();

    expect(harness.disarm).not.toHaveBeenCalled();
    expect(harness.pass.timerRunning()).toBe(true);
  });

  test('keeps the timer and decides nothing when the list read fails', async () => {
    const harness = makeHarness();
    harness.listAccounts.mockResolvedValue({ ok: false, error: 'missing' });
    harness.pass.start();

    await harness.tick();

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.pass.timerRunning()).toBe(true);
  });

  test('keeps the timer when the list read rejects', async () => {
    const harness = makeHarness();
    harness.listAccounts.mockRejectedValue(new Error('cswap missing'));
    harness.pass.start();

    await harness.tick();

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.pass.timerRunning()).toBe(true);
  });

  test('switches on a tick once the cached list shows exhaustion', async () => {
    const harness = makeHarness();
    harness.pass.start();

    await harness.tick();

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('stops the timer for good on stop', () => {
    const harness = makeHarness();
    harness.pass.start();

    harness.pass.stop();

    expect(harness.disarm).toHaveBeenCalledTimes(1);
    expect(harness.pass.timerRunning()).toBe(false);
  });
});

describe('no back-and-forth', () => {
  test('makes no switch back while both accounts are full', async () => {
    const after_switch = [
      account(A3, 3, windowsOf(100, 10)),
      account(A4, 4, windowsOf(100, 20), { active: true })
    ];
    const harness = makeHarness({ accounts: after_switch });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('switches back only after the previous account reset', async () => {
    const after_reset = [
      account(A3, 3, windowsOf(0, 10)),
      account(A4, 4, windowsOf(100, 20), { active: true })
    ];
    const harness = makeHarness({ accounts: after_reset });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[3]]);
  });
});
