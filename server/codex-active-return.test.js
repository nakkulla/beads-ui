import { describe, expect, test, vi } from 'vitest';
import {
  ACTIVE_RETURN_INTERVAL_MS,
  createCodexActiveReturn
} from './codex-active-return.js';
import { selectCodexSwitchCandidate } from './worker/codex-switch-candidate.js';
import { activeAccountOf } from './worker/instructions-restart.js';

/**
 * @typedef {import('./routes/codex-usage.js').UsageAccount} UsageAccount
 */

const K1 = 'user-1::ws-a';
const K2 = 'user-2::ws-a';
const K3 = 'user-3::ws-b';

const BEADS_UI = '/repos/beads-ui';
const TRAIN_BOT = '/repos/train_bot';

/**
 * @param {string} key
 * @param {number} number
 * @param {number} pct_5h
 * @param {{ active?: boolean, balance?: number, windows?: any[] }} [options]
 * @returns {UsageAccount}
 */
function account(key, number, pct_5h, options = {}) {
  return {
    key,
    number,
    email: `user-${number}@example.test`,
    alias: null,
    plan: 'plus',
    active: options.active === true,
    status: 'ok',
    windows: options.windows ?? [
      { key: '5h', pct: pct_5h, resetsAt: '2026-10-21T00:00:00.000Z' },
      { key: '7d', pct: 10, resetsAt: '2026-10-25T00:00:00.000Z' }
    ],
    fetchedAt: '2026-10-21T00:00:00.000Z',
    ageSeconds: 0,
    credits:
      typeof options.balance === 'number'
        ? { has_credits: true, unlimited: false, balance: options.balance }
        : { has_credits: false, unlimited: false, balance: null }
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

/** Common setup: 03 active at 5h 100% with credits, 01 at 0%. */
function commonAccounts() {
  return [
    account(K1, 1, 0),
    account(K3, 3, 100, { active: true, balance: 50 })
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
      codex: { mode, accounts, preempt_pct: null },
      claude: { mode: 'switch', accounts: [], preempt_pct: null }
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
      { key: BEADS_UI, queue: queueOf('switch', [K1, K3]) }
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
  const pass = createCodexActiveReturn({
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
    activeAccountOf,
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
    selectCandidate: selectCodexSwitchCandidate,
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

describe('switching the exhausted active account', () => {
  test('switches the exhausted active account to the allowed headroom account', async () => {
    const harness = makeHarness();

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('sends one ops notice naming both accounts and the full window', async () => {
    const harness = makeHarness();

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '🔁 Codex 활성 계정 자동 전환 — 계정 #3 → 계정 #1\n#3 5h 100% · 새로 시작하는 호출부터 적용'
      ]
    ]);
  });

  test('releases the switch lock after the switch', async () => {
    const harness = makeHarness();

    await harness.pass.observe(harness.state.cached);

    expect(harness.state.locked).toBe(false);
  });

  test('leaves a 99% active account alone', async () => {
    const accounts = [
      account(K1, 1, 0),
      account(K3, 3, 99, { active: true, balance: 50 })
    ];
    const harness = makeHarness({ accounts });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.arm).not.toHaveBeenCalled();
  });

  test('stops the exhaustion timer once the active account reads below 100%', async () => {
    const harness = makeHarness({ locked: true });
    await harness.pass.observe(harness.state.cached);

    await harness.pass.observe(
      listOf([account(K1, 1, 0), account(K3, 3, 99, { active: true })])
    );

    expect(harness.disarm).toHaveBeenCalledTimes(1);
    expect(harness.pass.timerRunning()).toBe(false);
  });

  test('refuses an account that only has credits', async () => {
    const accounts = [
      account(K1, 1, 100),
      account(K2, 2, 100, { balance: 80 }),
      account(K3, 3, 100, { active: true, balance: 50 })
    ];
    const harness = makeHarness({
      accounts,
      workspaces: [{ key: BEADS_UI, queue: queueOf('switch', [K1, K2, K3]) }]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('treats an active row without window info as not exhausted', async () => {
    const accounts = [
      account(K1, 1, 0),
      account(K3, 3, 0, { active: true, windows: [] })
    ];
    const harness = makeHarness({ accounts });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.arm).not.toHaveBeenCalled();
  });
});

describe('policy criterion', () => {
  test('makes no switch when the only repo allowing the active account waits', async () => {
    const harness = makeHarness({
      workspaces: [{ key: TRAIN_BOT, queue: queueOf('wait', [K1, K3]) }],
      layers: {
        [TRAIN_BOT]: {
          state: 'usable',
          values: { codex_account: K3 },
          warnings: []
        }
      }
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch when no switch repo allows the active account', async () => {
    const harness = makeHarness({
      workspaces: [{ key: BEADS_UI, queue: queueOf('switch', [K1]) }]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch when no single repo allows both accounts', async () => {
    const harness = makeHarness({
      workspaces: [
        { key: '/repos/a', queue: queueOf('switch', [K3]) },
        { key: '/repos/b', queue: queueOf('switch', [K1]) }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('takes the first candidate in workspace key order', async () => {
    const accounts = [
      account(K1, 1, 0),
      account(K2, 2, 0),
      account(K3, 3, 100, { active: true })
    ];
    const harness = makeHarness({
      accounts,
      workspaces: [
        { key: '/repos/b', queue: queueOf('switch', [K3, K1]) },
        { key: '/repos/a', queue: queueOf('switch', [K3, K2]) }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[2]]);
  });

  test('drops a repo whose queue cannot be read from the criterion', async () => {
    const harness = makeHarness({
      workspaces: [
        { key: '/repos/a', throws: true },
        { key: BEADS_UI, queue: queueOf('switch', [K1, K3]) }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });
});

describe('wait protection', () => {
  const WAIT_WORKSPACES = [
    { key: BEADS_UI, queue: queueOf('switch', [K1, K3]) },
    { key: TRAIN_BOT, queue: queueOf('wait', [K1, K3]) }
  ];

  test('makes no switch while a wait repo has no Codex default account', async () => {
    const harness = makeHarness({ workspaces: WAIT_WORKSPACES });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('sends one hold notice naming the wait repo', async () => {
    const harness = makeHarness({ workspaces: WAIT_WORKSPACES });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '⏸ Codex 활성 계정 자동 전환 보류 — 기다림 저장소 train_bot이 활성 로그인을 씀\n그 저장소에 Codex 기본 계정을 정하면 다음 판정부터 전환합니다'
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
      listOf([account(K1, 1, 0), account(K3, 3, 50, { active: true })])
    );

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify).toHaveBeenCalledTimes(2);
  });

  test('switches when the wait repo has a Codex default account', async () => {
    const harness = makeHarness({
      workspaces: WAIT_WORKSPACES,
      layers: {
        [TRAIN_BOT]: {
          state: 'usable',
          values: { codex_account: K3 },
          warnings: []
        }
      }
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('blocks when the wait repo account layer is unusable', async () => {
    const harness = makeHarness({
      workspaces: WAIT_WORKSPACES,
      layers: {
        [TRAIN_BOT]: {
          state: 'unusable',
          values: {},
          warnings: ['kv_read_failed']
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

  test('blocks for a wait repo whose only content is a pending wait_release receipt', async () => {
    const harness = makeHarness({
      workspaces: [
        { key: BEADS_UI, queue: queueOf('switch', [K1, K3]) },
        {
          key: TRAIN_BOT,
          queue: queueOf('wait', [K3], {
            attempts: {
              'att-1': {
                attempt_id: 'att-1',
                bead_id: 'TB-1',
                runner: 'codex',
                status: 'provider_hold',
                codex_account: K3
              }
            },
            auto_resume_pending: [
              {
                attempt_id: 'att-1',
                generation: 1,
                account: null,
                kind: 'provider_outage',
                origin: 'wait_release',
                held_account: K3
              }
            ]
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('sends no hold notice when no candidate exists', async () => {
    const harness = makeHarness({
      accounts: [account(K1, 1, 100), account(K3, 3, 100, { active: true })],
      workspaces: WAIT_WORKSPACES
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify).not.toHaveBeenCalled();
  });
});

describe('running attempt guards', () => {
  test('makes no switch while a Codex attempt runs without an account', async () => {
    const harness = makeHarness({
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [K1, K3], {
            attempts: {
              'att-1': {
                attempt_id: 'att-1',
                bead_id: 'UI-1',
                runner: 'codex',
                status: 'running',
                codex_account: null
              }
            }
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('skips a candidate a running attempt uses', async () => {
    const accounts = [
      account(K1, 1, 0),
      account(K2, 2, 0),
      account(K3, 3, 100, { active: true, balance: 50 })
    ];
    const harness = makeHarness({
      accounts,
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [K1, K2, K3], {
            attempts: {
              'att-1': {
                attempt_id: 'att-1',
                bead_id: 'UI-1',
                runner: 'codex',
                status: 'running',
                codex_account: K1
              }
            }
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[2]]);
  });

  test('skips a candidate a running Claude attempt uses as its Codex account', async () => {
    const accounts = [
      account(K1, 1, 0),
      account(K2, 2, 0),
      account(K3, 3, 100, { active: true, balance: 50 })
    ];
    const harness = makeHarness({
      accounts,
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [K1, K2, K3], {
            attempts: {
              'att-1': {
                attempt_id: 'att-1',
                bead_id: 'UI-1',
                runner: 'claude',
                status: 'running',
                claude_account: 'claude-user@example.test',
                codex_account: K1
              }
            }
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[2]]);
  });

  test('skips a held account', async () => {
    const accounts = [
      account(K1, 1, 0),
      account(K2, 2, 0),
      account(K3, 3, 100, { active: true })
    ];
    const harness = makeHarness({
      accounts,
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf('switch', [K1, K2, K3], {
            provider_hold: {
              codex: { generation: 1, targets: [{ account: K1 }] }
            }
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[2]]);
  });
});

describe('confirm stage', () => {
  test('makes no switch when the fresh read shows the active account reset', async () => {
    const harness = makeHarness({
      fresh: [account(K1, 1, 0), account(K3, 3, 40, { active: true })]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.pass.timerRunning()).toBe(false);
  });

  test('makes no switch when the fresh read shows another active account', async () => {
    const harness = makeHarness({
      fresh: [account(K1, 1, 0, { active: true }), account(K3, 3, 100)]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('re-reads the inputs after the fresh read', async () => {
    const harness = makeHarness();
    harness.listAccountsFresh.mockImplementation(async () => {
      harness.state.workspaces[0].queue.attempts['att-1'] = {
        attempt_id: 'att-1',
        bead_id: 'UI-1',
        runner: 'codex',
        status: 'running',
        codex_account: null
      };
      return harness.state.fresh;
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch when a repo turns into a wait repo without a default during the kv read', async () => {
    const harness = makeHarness({
      workspaces: [
        { key: BEADS_UI, queue: queueOf('switch', [K1, K3]) },
        { key: TRAIN_BOT, queue: queueOf('wait', [K3]) },
        { key: '/repos/zeta', queue: queueOf('switch', []) }
      ],
      layers: {
        [TRAIN_BOT]: {
          state: 'usable',
          values: { codex_account: K3 },
          warnings: []
        }
      }
    });
    const default_layer = harness.state.layers[TRAIN_BOT];
    let reads = 0;
    harness.readWorkspaceAccounts.mockImplementation(async () => {
      reads += 1;
      if (reads === 2) {
        harness.state.workspaces[2].queue = queueOf('wait', [K3]);
      }
      return default_layer;
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.listAccountsFresh).toHaveBeenCalledTimes(1);
    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch when an accountless Codex run starts during the kv read', async () => {
    const harness = makeHarness({
      workspaces: [
        { key: BEADS_UI, queue: queueOf('switch', [K1, K3]) },
        { key: TRAIN_BOT, queue: queueOf('wait', [K3]) }
      ],
      layers: {
        [TRAIN_BOT]: {
          state: 'usable',
          values: { codex_account: K3 },
          warnings: []
        }
      }
    });
    const default_layer = harness.state.layers[TRAIN_BOT];
    let reads = 0;
    harness.readWorkspaceAccounts.mockImplementation(async () => {
      reads += 1;
      if (reads === 2) {
        harness.state.workspaces[0].queue.attempts['att-1'] = {
          attempt_id: 'att-1',
          bead_id: 'UI-1',
          runner: 'codex',
          status: 'running',
          codex_account: null
        };
      }
      return default_layer;
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.listAccountsFresh).toHaveBeenCalledTimes(1);
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

  test('retries on the next cycle after a failed switch', async () => {
    const harness = makeHarness();
    harness.switchAccount.mockResolvedValueOnce({
      ok: false,
      error: 'timeout'
    });
    await harness.pass.observe(harness.state.cached);

    await harness.tick();

    expect(harness.switchAccount.mock.calls).toEqual([[1], [1]]);
  });

  test('skips an observation that arrives while a pass runs', async () => {
    const harness = makeHarness();
    /** @type {(value: any) => void} */
    let release_fresh = () => {};
    harness.listAccountsFresh.mockImplementation(
      () => new Promise((resolve) => (release_fresh = resolve))
    );
    const first = harness.pass.observe(harness.state.cached);
    await new Promise((resolve) => setTimeout(resolve, 0));

    await harness.pass.observe(harness.state.cached);
    release_fresh(harness.state.fresh);
    await first;

    expect(harness.listAccountsFresh).toHaveBeenCalledTimes(1);
    expect(harness.switchAccount).toHaveBeenCalledTimes(1);
  });
});

describe('exhaustion timer', () => {
  test('arms a 60-second timer on observing exhaustion', async () => {
    const harness = makeHarness({ locked: true });

    await harness.pass.observe(harness.state.cached);

    expect(harness.arm).toHaveBeenCalledTimes(1);
    expect(harness.arm.mock.calls[0][1]).toBe(ACTIVE_RETURN_INTERVAL_MS);
  });

  test('keeps a single timer across repeated exhausted observations', async () => {
    const harness = makeHarness({ locked: true });
    await harness.pass.observe(harness.state.cached);

    await harness.pass.observe(harness.state.cached);

    expect(harness.arm).toHaveBeenCalledTimes(1);
  });

  test('re-reads the cached list on each tick', async () => {
    const harness = makeHarness({ locked: true });
    await harness.pass.observe(harness.state.cached);

    await harness.tick();

    expect(harness.listAccounts).toHaveBeenCalledTimes(1);
  });

  test('stops when a tick observes the active account no longer exhausted', async () => {
    const harness = makeHarness({ locked: true });
    await harness.pass.observe(harness.state.cached);
    harness.state.cached = listOf([
      account(K1, 1, 0),
      account(K3, 3, 20, { active: true })
    ]);

    await harness.tick();

    expect(harness.disarm).toHaveBeenCalledTimes(1);
    expect(harness.pass.timerRunning()).toBe(false);
  });

  test('leaves the timer running when a tick list read fails', async () => {
    const harness = makeHarness({ locked: true });
    await harness.pass.observe(harness.state.cached);
    harness.state.cached = {
      ok: false,
      error: 'codex_account_list_unavailable'
    };

    await harness.tick();

    expect(harness.disarm).not.toHaveBeenCalled();
    expect(harness.pass.timerRunning()).toBe(true);
  });
});
