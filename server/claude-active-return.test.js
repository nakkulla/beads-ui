import { describe, expect, test, vi } from 'vitest';
import { createDepartureStore } from './active-login-return-store.js';
import {
  CLAUDE_ACTIVE_RETURN_INTERVAL_MS,
  createClaudeActiveReturn
} from './claude-active-return.js';

/**
 * @typedef {import('./routes/claude-usage.js').UsageAccount} UsageAccount
 * @typedef {import('./routes/claude-usage.js').UsageWindow} UsageWindow
 * @typedef {import('./limit-policy-settings.js').ActiveSwitchSettings} ActiveSwitchSettings
 * @typedef {import('./active-login-return-store.js').DepartureRecord} DepartureRecord
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
 * The Claude active-switch settings: auto switch on, no default.
 *
 * @param {string[]} accounts
 * @param {Partial<ActiveSwitchSettings>} [extra]
 * @returns {ActiveSwitchSettings}
 */
function settingsOf(accounts, extra = {}) {
  return {
    auto_switch: true,
    default_account: null,
    accounts,
    preempt_pct: null,
    ...extra
  };
}

/**
 * One workspace queue; `provider_limit_policy` is the repo's stored policy,
 * which the pass never reads.
 *
 * @param {Record<string, unknown>} [extra]
 */
function queueOf(extra = {}) {
  return {
    provider_hold: {},
    attempts: {},
    ...extra
  };
}

/**
 * @param {'switch'|'wait'} mode
 * @param {string[]} accounts
 */
function repoPolicyOf(mode, accounts) {
  return {
    claude: { mode, accounts, preempt_pct: null },
    codex: { mode: 'switch', accounts: [], preempt_pct: null }
  };
}

/**
 * @param {Partial<{ accounts: UsageAccount[], fresh: UsageAccount[], settings: ActiveSwitchSettings, workspaces: Array<{ key: string, queue?: any, throws?: boolean }>, locked: boolean, record: DepartureRecord, now: number }>} [overrides]
 */
function makeHarness(overrides = {}) {
  const accounts = overrides.accounts ?? commonAccounts();
  const departures = createDepartureStore({ filePath: null });
  if (overrides.record) {
    departures.set('claude', overrides.record);
  }
  const state = {
    /** @type {any} */
    cached: listOf(accounts),
    /** @type {any} */
    fresh: listOf(overrides.fresh ?? accounts),
    /** @type {ActiveSwitchSettings} */
    settings: overrides.settings ?? settingsOf([A3, A4]),
    workspaces: overrides.workspaces ?? [{ key: BEADS_UI, queue: queueOf() }],
    locked: overrides.locked === true,
    now: overrides.now ?? Date.parse('2026-11-07T01:00:00.000Z')
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
  const settingsOfRunner = vi.fn(() => state.settings);
  const pass = createClaudeActiveReturn({
    listAccounts,
    listAccountsFresh,
    settingsOf: settingsOfRunner,
    departures,
    now: () => state.now,
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
    departures,
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
          queue: queueOf({
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
      settings: settingsOf([A3, A4, A5])
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
      settings: settingsOf([A3, A5, A4])
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });
});

describe('active-switch settings criterion', () => {
  test('makes no switch while the auto switch is off, even when a repo allows both accounts', async () => {
    const harness = makeHarness({
      settings: settingsOf([A3, A4], { auto_switch: false }),
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
            provider_limit_policy: repoPolicyOf('switch', [A3, A4])
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('keeps the always-on timer while the auto switch is off', async () => {
    const harness = makeHarness({
      settings: settingsOf([A3, A4], { auto_switch: false })
    });
    harness.pass.start();

    await harness.tick();

    expect(harness.pass.timerRunning()).toBe(true);
  });

  test('makes no switch while the target list is empty', async () => {
    const harness = makeHarness({ settings: settingsOf([]) });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch when the active account is neither the default nor a target', async () => {
    const harness = makeHarness({ settings: settingsOf([A4]) });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('switches even when a wait repo has no Claude default account', async () => {
    const harness = makeHarness({
      workspaces: [
        {
          key: TRAIN_BOT,
          queue: queueOf({
            provider_limit_policy: repoPolicyOf('wait', [A3, A4])
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('sends no hold notice for a wait repo', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(100, 10), { active: true }),
        account(A4, 4, windowsOf(100, 10))
      ],
      workspaces: [
        {
          key: TRAIN_BOT,
          queue: queueOf({
            provider_limit_policy: repoPolicyOf('wait', [A3, A4])
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify).not.toHaveBeenCalled();
  });
});

describe('trigger', () => {
  test('switches once a judged window reaches the preemptive threshold', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(85, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ],
      settings: settingsOf([A3, A4], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('leaves an active account below the preemptive threshold alone', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(79, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ],
      settings: settingsOf([A3, A4], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('judges when only the seven-day window reaches the threshold', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(20, 85), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ],
      settings: settingsOf([A3, A4], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[4]]);
  });

  test('refuses a candidate whose judged window is at the threshold', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(85, 10), { active: true }),
        account(A4, 4, windowsOf(80, 10))
      ],
      settings: settingsOf([A3, A4], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('names the window at the threshold in the notice', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, windowsOf(85, 10), { active: true }),
        account(A4, 4, windowsOf(0, 10))
      ],
      settings: settingsOf([A3, A4], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '🔁 Claude 활성 계정 자동 전환 — 계정 #3 → 계정 #4\n#3 5h 85% · 실행 중 세션도 곧 새 계정을 씁니다'
      ]
    ]);
  });
});

describe('running attempts', () => {
  test('switches while a Claude attempt runs without an account', async () => {
    const harness = makeHarness({
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
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
          queue: queueOf({ attempts: runningClaude(A4) })
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
          queue: queueOf({ attempts: runningClaude(A4) })
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
      settings: settingsOf([A3, A4, A5]),
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
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

  test('makes no switch when the auto switch turns off before the fresh read returns', async () => {
    const harness = makeHarness();
    harness.listAccountsFresh.mockImplementation(async () => {
      harness.state.settings = settingsOf([A3, A4], { auto_switch: false });
      return harness.state.fresh;
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

describe('one judgment on request', () => {
  test('reads the cached list and switches on evaluateNow', async () => {
    const harness = makeHarness();

    await harness.pass.evaluateNow();

    expect(harness.listAccounts).toHaveBeenCalledTimes(1);
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

/**
 * Settings with A3 as the default and A4, A5 as targets.
 *
 * @param {Partial<ActiveSwitchSettings>} [extra]
 * @returns {ActiveSwitchSettings}
 */
function defaultSettings(extra = {}) {
  return settingsOf([A4, A5], { default_account: A3, ...extra });
}

/** The clock past the 5h reset `windowsOf` carries. */
const AFTER_5H_RESET = Date.parse('2026-11-07T06:00:00.000Z');

/**
 * A4 active below the trigger, the default A3 reset.
 *
 * @param {{ own?: boolean }} [options]
 * @returns {UsageAccount[]}
 */
function onTargetDefaultReset(options = {}) {
  return [
    account(A3, 3, windowsOf(0, 10), { own: options.own }),
    account(A4, 4, windowsOf(30, 10), { active: true }),
    account(A5, 5, windowsOf(0, 10))
  ];
}

/** @type {DepartureRecord} */
const DEPARTED = {
  default_account: A3,
  to_account: A4,
  until: '2026-11-07T05:00:00.000Z'
};

describe('Claude departure and return (UI-32oq §4.2)', () => {
  test('records until null when a default window at the trigger reports no reset', async () => {
    const harness = makeHarness({
      accounts: [
        account(
          A3,
          3,
          [
            { key: '5h', pct: 100, resetsAt: null },
            ...windowsOf(0, 10).slice(1)
          ],
          {
            active: true
          }
        ),
        account(A4, 4, windowsOf(0, 10)),
        account(A5, 5, windowsOf(0, 50))
      ],
      settings: defaultSettings()
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('claude')).toEqual({
      default_account: A3,
      to_account: A4,
      until: null
    });
  });

  test('appends the usage-recovery hint to a move off the default without a reset time', async () => {
    const harness = makeHarness({
      accounts: [
        account(A3, 3, [{ key: '5h', pct: 100, resetsAt: null }], {
          active: true
        }),
        account(A4, 4, windowsOf(0, 10)),
        account(A5, 5, windowsOf(0, 50))
      ],
      settings: defaultSettings()
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '🔁 Claude 활성 계정 자동 전환 — 계정 #3 → 계정 #4\n#3 5h 100% · 실행 중 세션도 곧 새 계정을 씁니다\ndefault 사용량 회복 확인 뒤 복귀'
      ]
    ]);
  });

  test('returns to the default and says running sessions follow', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: DEPARTED,
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[3]]);
    expect(harness.notify.mock.calls).toEqual([
      [
        '↩ Claude default 계정으로 복귀 — 계정 #4 → 계정 #3\n실행 중 세션도 곧 새 계정을 씁니다'
      ]
    ]);
  });

  test('judges the return on the five-hour and seven-day windows only', async () => {
    const rows = onTargetDefaultReset();
    rows[0].windows = [
      ...windowsOf(0, 10),
      { key: 'fable', pct: 100, resetsAt: '2026-11-12T00:00:00.000Z' }
    ];
    const harness = makeHarness({
      accounts: rows,
      settings: defaultSettings(),
      record: DEPARTED,
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[3]]);
  });

  test('returns to an own-login default a running attempt uses', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: DEPARTED,
      now: AFTER_5H_RESET,
      workspaces: [
        { key: BEADS_UI, queue: queueOf({ attempts: runningClaude(A3) }) }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[3]]);
  });

  test('makes no return to a shared-login default a running attempt uses', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset({ own: false }),
      settings: defaultSettings(),
      record: DEPARTED,
      now: AFTER_5H_RESET,
      workspaces: [
        { key: BEADS_UI, queue: queueOf({ attempts: runningClaude(A3) }) }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.departures.get('claude')).toEqual(DEPARTED);
  });

  test('makes no return while the default is held', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: DEPARTED,
      now: AFTER_5H_RESET,
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
            provider_hold: {
              claude: { targets: [{ account: A3, attempt_ids: ['x'] }] }
            }
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });
});
