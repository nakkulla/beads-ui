import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, expect, test, vi } from 'vitest';
import { createDepartureStore } from './active-login-return-store.js';
import {
  ACTIVE_RETURN_INTERVAL_MS,
  createCodexActiveReturn,
  returnHintOf
} from './codex-active-return.js';
import { selectCodexSwitchCandidate } from './worker/codex-switch-candidate.js';
import { activeAccountOf } from './worker/instructions-restart.js';

/**
 * @typedef {import('./routes/codex-usage.js').UsageAccount} UsageAccount
 * @typedef {import('./limit-policy-settings.js').ActiveSwitchSettings} ActiveSwitchSettings
 * @typedef {import('./active-login-return-store.js').DepartureRecord} DepartureRecord
 * @typedef {import('./active-login-return-store.js').DepartureStore} DepartureStore
 */

const K1 = 'user-1::ws-a';
const K2 = 'user-2::ws-a';
const K3 = 'user-3::ws-b';

/** The five-hour reset every fixture window carries: local 05:00. */
const RESET_5H = new Date(2026, 9, 21, 5, 0).toISOString();
/** The seven-day reset every fixture window carries: local 23:30. */
const RESET_7D = new Date(2026, 9, 25, 23, 30).toISOString();
/** The harness clock: before both resets. */
const BEFORE_RESET = new Date(2026, 9, 21, 1, 0).getTime();
/** A clock past the five-hour reset, before the seven-day one. */
const AFTER_5H_RESET = new Date(2026, 9, 21, 6, 0).getTime();

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
      { key: '5h', pct: pct_5h, resetsAt: RESET_5H },
      { key: '7d', pct: 10, resetsAt: RESET_7D }
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
 * @param {number} pct_5h
 * @param {number} pct_7d
 * @returns {any[]}
 */
function windowsOf(pct_5h, pct_7d) {
  return [
    { key: '5h', pct: pct_5h, resetsAt: RESET_5H },
    { key: '7d', pct: pct_7d, resetsAt: RESET_7D }
  ];
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
 * The Codex active-switch settings: auto switch on, no default.
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
    codex: { mode, accounts, preempt_pct: null },
    claude: { mode: 'switch', accounts: [], preempt_pct: null }
  };
}

/**
 * @param {Partial<{ accounts: UsageAccount[], fresh: UsageAccount[], settings: ActiveSwitchSettings, workspaces: Array<{ key: string, queue?: any, throws?: boolean }>, locked: boolean, record: DepartureRecord, departures: DepartureStore, now: number }>} [overrides]
 */
function makeHarness(overrides = {}) {
  const accounts = overrides.accounts ?? commonAccounts();
  const departures =
    overrides.departures ?? createDepartureStore({ filePath: null });
  if (overrides.record) {
    departures.set('codex', overrides.record);
  }
  const state = {
    /** @type {any} */
    cached: listOf(accounts),
    /** @type {any} */
    fresh: listOf(overrides.fresh ?? accounts),
    /** @type {ActiveSwitchSettings} */
    settings: overrides.settings ?? settingsOf([K1, K3]),
    workspaces: overrides.workspaces ?? [{ key: BEADS_UI, queue: queueOf() }],
    locked: overrides.locked === true,
    now: overrides.now ?? BEFORE_RESET
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
  const pass = createCodexActiveReturn({
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
    departures,
    /**
     * Make both the cached and the fresh read show these rows.
     *
     * @param {UsageAccount[]} rows
     */
    show(rows) {
      state.cached = listOf(rows);
      state.fresh = listOf(rows);
    },
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

  test('sends one ops notice naming the active login, both accounts and the full window', async () => {
    const harness = makeHarness();

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '🔁 Codex 활성 계정 자동 전환 — user-3@example.test → user-1@example.test\n5h 100% · 새로 시작하는 호출부터 적용'
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
      settings: settingsOf([K1, K2, K3])
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

describe('active-switch settings criterion', () => {
  test('makes no switch while the auto switch is off, even when a repo allows both accounts', async () => {
    const harness = makeHarness({
      settings: settingsOf([K1, K3], { auto_switch: false }),
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
            provider_limit_policy: repoPolicyOf('switch', [K1, K3])
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('arms no timer while the auto switch is off', async () => {
    const harness = makeHarness({
      settings: settingsOf([K1, K3], { auto_switch: false })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.arm).not.toHaveBeenCalled();
  });

  test('makes no switch while the target list is empty', async () => {
    const harness = makeHarness({ settings: settingsOf([]) });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no switch when the active account is neither the default nor a target', async () => {
    const harness = makeHarness({ settings: settingsOf([K1]) });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('switches even when a wait repo has no Codex default account', async () => {
    const harness = makeHarness({
      workspaces: [
        {
          key: TRAIN_BOT,
          queue: queueOf({
            provider_limit_policy: repoPolicyOf('wait', [K1, K3])
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('sends no hold notice for a wait repo', async () => {
    const harness = makeHarness({
      accounts: [account(K1, 1, 100), account(K3, 3, 100, { active: true })],
      workspaces: [
        {
          key: TRAIN_BOT,
          queue: queueOf({
            provider_limit_policy: repoPolicyOf('wait', [K1, K3])
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify).not.toHaveBeenCalled();
  });

  test('takes the first window-headroom account in the target list order', async () => {
    const accounts = [
      account(K1, 1, 0),
      account(K2, 2, 0),
      account(K3, 3, 100, { active: true })
    ];
    const harness = makeHarness({
      accounts,
      settings: settingsOf([K3, K2, K1])
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[2]]);
  });

  test('ignores a queue that cannot be read', async () => {
    const harness = makeHarness({
      workspaces: [
        { key: '/repos/a', throws: true },
        { key: BEADS_UI, queue: queueOf() }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });
});

describe('trigger', () => {
  test('switches once the active window reaches the preemptive threshold', async () => {
    const harness = makeHarness({
      accounts: [account(K1, 1, 0), account(K3, 3, 85, { active: true })],
      settings: settingsOf([K1, K3], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('names the window at the threshold in the notice', async () => {
    const harness = makeHarness({
      accounts: [account(K1, 1, 0), account(K3, 3, 85, { active: true })],
      settings: settingsOf([K1, K3], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls[0][0]).toContain(
      '5h 85% · 새로 시작하는 호출부터 적용'
    );
  });

  test('leaves an active account below the preemptive threshold alone', async () => {
    const harness = makeHarness({
      accounts: [account(K1, 1, 0), account(K3, 3, 79, { active: true })],
      settings: settingsOf([K1, K3], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('judges when only one of the two windows reaches the threshold', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 0),
        account(K3, 3, 0, { active: true, windows: windowsOf(20, 85) })
      ],
      settings: settingsOf([K1, K3], { preempt_pct: 80 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('refuses a candidate whose window is at the threshold', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 0, { windows: windowsOf(10, 60) }),
        account(K3, 3, 85, { active: true })
      ],
      settings: settingsOf([K1, K3], { preempt_pct: 60 })
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });
});

describe('running attempt guards', () => {
  test('makes no switch while a Codex attempt runs without an account', async () => {
    const harness = makeHarness({
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
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
      settings: settingsOf([K1, K2, K3]),
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
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
      settings: settingsOf([K1, K2, K3]),
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
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
      settings: settingsOf([K1, K2, K3]),
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
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

  test('makes no switch when the auto switch turns off before the fresh read returns', async () => {
    const harness = makeHarness();
    harness.listAccountsFresh.mockImplementation(async () => {
      harness.state.settings = settingsOf([K1, K3], { auto_switch: false });
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

describe('one judgment on request', () => {
  test('reads the cached list and switches on evaluateNow', async () => {
    const harness = makeHarness();

    await harness.pass.evaluateNow();

    expect(harness.listAccounts).toHaveBeenCalledTimes(1);
    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
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

  test('stops when a tick finds the auto switch turned off', async () => {
    const harness = makeHarness({ locked: true });
    await harness.pass.observe(harness.state.cached);
    harness.state.settings = settingsOf([K1, K3], { auto_switch: false });

    await harness.tick();

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

/**
 * Settings with K1 as the default and K2, K3 as targets, in that order.
 *
 * @param {Partial<ActiveSwitchSettings>} [extra]
 * @returns {ActiveSwitchSettings}
 */
function defaultSettings(extra = {}) {
  return settingsOf([K2, K3], { default_account: K1, ...extra });
}

/**
 * The record a move K1 -> `to` left at the five-hour reset.
 *
 * @param {string} [to]
 * @param {string|null} [until]
 * @returns {DepartureRecord}
 */
function departedTo(to = K2, until = RESET_5H) {
  return { default_account: K1, to_account: to, until };
}

/**
 * K2 active below the trigger, the default K1 reset, K3 free.
 *
 * @returns {UsageAccount[]}
 */
function onTargetDefaultReset() {
  return [
    account(K1, 1, 0),
    account(K2, 2, 30, { active: true }),
    account(K3, 3, 0)
  ];
}

describe('departure record (UI-32oq §4.2)', () => {
  test('records the default, the target and the five-hour reset when the default leaves', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100, { active: true }),
        account(K2, 2, 0),
        account(K3, 3, 0)
      ],
      settings: defaultSettings()
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[2]]);
    expect(harness.departures.get('codex')).toEqual({
      default_account: K1,
      to_account: K2,
      until: RESET_5H
    });
  });

  test('records the latest reset among the default windows at the trigger', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 0, { active: true, windows: windowsOf(100, 100) }),
        account(K2, 2, 0),
        account(K3, 3, 0)
      ],
      settings: defaultSettings()
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')?.until).toBe(RESET_7D);
  });

  test('records until null when a default window at the trigger reports no reset', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 0, {
          active: true,
          windows: [
            { key: '5h', pct: 100 },
            { key: '7d', pct: 10, resetsAt: RESET_7D }
          ]
        }),
        account(K2, 2, 0),
        account(K3, 3, 0)
      ],
      settings: defaultSettings()
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')?.until).toBeNull();
  });

  test('writes no record when a non-default account leaves', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 0),
        account(K2, 2, 100, { active: true }),
        account(K3, 3, 0)
      ],
      settings: defaultSettings()
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[3]]);
    expect(harness.departures.get('codex')).toBeNull();
  });

  test('moves to_account when the account the switch moved to reaches the trigger', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100),
        account(K2, 2, 100, { active: true }),
        account(K3, 3, 0)
      ],
      settings: defaultSettings(),
      record: departedTo(K2)
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[3]]);
    expect(harness.departures.get('codex')).toEqual(departedTo(K3));
  });

  test('keeps the record when the account the switch moved on to is observed active', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100),
        account(K2, 2, 100, { active: true }),
        account(K3, 3, 0)
      ],
      settings: defaultSettings(),
      record: departedTo(K2)
    });
    await harness.pass.observe(harness.state.cached);
    harness.show([
      account(K1, 1, 100),
      account(K2, 2, 100),
      account(K3, 3, 10, { active: true })
    ]);

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toEqual(departedTo(K3));
  });

  test('leaves the record unchanged when the switch fails', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100),
        account(K2, 2, 100, { active: true }),
        account(K3, 3, 0)
      ],
      settings: defaultSettings(),
      record: departedTo(K2)
    });
    harness.switchAccount.mockResolvedValue({ ok: false, error: 'timeout' });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('writes no record when a move off the default fails', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100, { active: true }),
        account(K2, 2, 0),
        account(K3, 3, 0)
      ],
      settings: defaultSettings()
    });
    harness.switchAccount.mockResolvedValue({ ok: false, error: 'timeout' });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toBeNull();
  });
});

describe('return to the default (UI-32oq §4.2)', () => {
  test('returns to a default outside the target list while the active account is below the trigger', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('ends the record after the return', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toBeNull();
  });

  test('sends the return notice', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '↩ Codex default 계정으로 복귀 — user-2@example.test → user-1@example.test\n새로 시작하는 호출부터 적용'
      ]
    ]);
  });

  test('makes no return before until', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: BEFORE_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('returns on usage alone when until is null', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2, null),
      now: BEFORE_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('makes no return while a default window is at the trigger', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 0, { windows: windowsOf(0, 100) }),
        account(K2, 2, 30, { active: true }),
        account(K3, 3, 0)
      ],
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('makes no return and keeps the record while the default row is not ok', async () => {
    const rows = onTargetDefaultReset();
    rows[0].status = 'token_expired';
    const harness = makeHarness({
      accounts: rows,
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('makes no return and keeps the record while the default reports no window', async () => {
    const rows = onTargetDefaultReset();
    rows[0].windows = [];
    const harness = makeHarness({
      accounts: rows,
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('makes no return and keeps the record while the list has no default row', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset().slice(1),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('takes the default first when the active account reaches the trigger after the reset', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 0),
        account(K2, 2, 100, { active: true }),
        account(K3, 3, 0)
      ],
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('reads the default fresh when its cached window already passed its reset', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100),
        account(K2, 2, 30, { active: true }),
        account(K3, 3, 0)
      ],
      fresh: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[1]]);
  });

  test('makes no return when the fresh read still shows the default at the trigger', async () => {
    const stale = [
      account(K1, 1, 100),
      account(K2, 2, 30, { active: true }),
      account(K3, 3, 0)
    ];
    const harness = makeHarness({
      accounts: stale,
      fresh: stale,
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('carries a default through A to B to C and back to A', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100, { active: true }),
        account(K2, 2, 0),
        account(K3, 3, 0)
      ],
      settings: defaultSettings()
    });
    await harness.pass.observe(harness.state.cached);
    harness.show([
      account(K1, 1, 100),
      account(K2, 2, 100, { active: true }),
      account(K3, 3, 0)
    ]);
    await harness.pass.observe(harness.state.cached);
    harness.show([
      account(K1, 1, 0),
      account(K2, 2, 100),
      account(K3, 3, 20, { active: true })
    ]);
    harness.state.now = AFTER_5H_RESET;

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount.mock.calls).toEqual([[2], [3], [1]]);
    expect(harness.departures.get('codex')).toBeNull();
  });
});

describe('ending a departure record (UI-32oq §4.2 rule 5)', () => {
  test('ends the record when the default is observed active', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 10, { active: true }),
        account(K2, 2, 30),
        account(K3, 3, 0)
      ],
      settings: defaultSettings(),
      record: departedTo(K2)
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toBeNull();
    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('ends the record when a third account is observed active', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100),
        account(K2, 2, 30),
        account(K3, 3, 10, { active: true })
      ],
      settings: defaultSettings(),
      record: departedTo(K2)
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toBeNull();
  });

  test('keeps the record when only a stale list shows another active account', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100, { active: true }),
        account(K2, 2, 0),
        account(K3, 3, 0)
      ],
      fresh: [
        account(K1, 1, 100),
        account(K2, 2, 10, { active: true }),
        account(K3, 3, 0)
      ],
      settings: defaultSettings(),
      record: departedTo(K2)
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('ends the record when the default changes', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings({ default_account: K3, accounts: [K2] }),
      record: departedTo(K2)
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toBeNull();
  });

  test('ends the record when the auto switch turns off', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings({ auto_switch: false }),
      record: departedTo(K2)
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.departures.get('codex')).toBeNull();
  });

  test('ends a record the settings no longer back even when the list read fails', async () => {
    const harness = makeHarness({
      settings: defaultSettings({ default_account: K3, accounts: [K2] }),
      record: departedTo(K2)
    });

    await harness.pass.observe({ ok: false, error: 'unavailable' });

    expect(harness.departures.get('codex')).toBeNull();
  });
});

describe('return guards (UI-32oq §4.2)', () => {
  test('makes no return while the default is held', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET,
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
            provider_hold: {
              codex: { generation: 1, targets: [{ account: K1 }] }
            }
          })
        }
      ]
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.switchAccount).not.toHaveBeenCalled();
    expect(harness.departures.get('codex')).toEqual(departedTo(K2));
  });

  test('makes no return while a running attempt uses the default', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET,
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
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

    expect(harness.switchAccount).not.toHaveBeenCalled();
  });

  test('makes no return while a Codex attempt runs without an account', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: AFTER_5H_RESET,
      workspaces: [
        {
          key: BEADS_UI,
          queue: queueOf({
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
});

describe('Codex timer while a departure record stands', () => {
  test('keeps the timer armed while the active account is below the trigger', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: BEFORE_RESET
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.pass.timerRunning()).toBe(true);
  });

  test('stops the timer once the record ends', async () => {
    const harness = makeHarness({
      accounts: onTargetDefaultReset(),
      settings: defaultSettings(),
      record: departedTo(K2),
      now: BEFORE_RESET
    });
    await harness.pass.observe(harness.state.cached);
    harness.show([
      account(K1, 1, 10, { active: true }),
      account(K2, 2, 30),
      account(K3, 3, 0)
    ]);

    await harness.tick();

    expect(harness.departures.get('codex')).toBeNull();
    expect(harness.pass.timerRunning()).toBe(false);
  });

  test('arms the timer on start while a record stands', () => {
    const harness = makeHarness({
      settings: defaultSettings(),
      record: departedTo(K2)
    });

    harness.pass.start();

    expect(harness.pass.timerRunning()).toBe(true);
  });

  test('arms no timer on start without a record', () => {
    const harness = makeHarness({ settings: defaultSettings() });

    harness.pass.start();

    expect(harness.arm).not.toHaveBeenCalled();
  });
});

describe('departure notices (UI-32oq §4.2)', () => {
  test('appends the default reset time to a move off the default', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100, { active: true }),
        account(K2, 2, 0),
        account(K3, 3, 0)
      ],
      settings: defaultSettings()
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls).toEqual([
      [
        '🔁 Codex 활성 계정 자동 전환 — user-1@example.test → user-2@example.test\n5h 100% · 새로 시작하는 호출부터 적용\ndefault 리셋 05:00 뒤 복귀'
      ]
    ]);
  });

  test('appends the usage-recovery hint when until is null', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 0, {
          active: true,
          windows: [{ key: '5h', pct: 100 }]
        }),
        account(K2, 2, 0),
        account(K3, 3, 0)
      ],
      settings: defaultSettings()
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls[0][0].split('\n').at(-1)).toBe(
      'default 사용량 회복 확인 뒤 복귀'
    );
  });

  test('keeps the first reset time on a move that follows the record', async () => {
    const harness = makeHarness({
      accounts: [
        account(K1, 1, 100),
        account(K2, 2, 100, { active: true }),
        account(K3, 3, 0)
      ],
      settings: defaultSettings(),
      record: departedTo(K2)
    });

    await harness.pass.observe(harness.state.cached);

    expect(harness.notify.mock.calls[0][0].split('\n').at(-1)).toBe(
      'default 리셋 05:00 뒤 복귀'
    );
  });

  test('words a pending return with its reset time', () => {
    const hint = returnHintOf(departedTo(K2));

    expect(hint).toBe('default 리셋 05:00 뒤 복귀');
  });

  test('words a pending return without a reset time', () => {
    const hint = returnHintOf(departedTo(K2, null));

    expect(hint).toBe('default 사용량 회복 확인 뒤 복귀');
  });
});

describe('departure record across a restart', () => {
  test('returns after a restart from the record on disk', async () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-departure-'));
    const file = path.join(dir, 'active-login-return.json');
    try {
      const before = makeHarness({
        accounts: [
          account(K1, 1, 100, { active: true }),
          account(K2, 2, 0),
          account(K3, 3, 0)
        ],
        settings: defaultSettings(),
        departures: createDepartureStore({ filePath: () => file })
      });
      await before.pass.observe(before.state.cached);
      const after = makeHarness({
        accounts: onTargetDefaultReset(),
        settings: defaultSettings(),
        departures: createDepartureStore({ filePath: () => file }),
        now: AFTER_5H_RESET
      });

      await after.pass.observe(after.state.cached);

      expect(after.switchAccount.mock.calls).toEqual([[1]]);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
