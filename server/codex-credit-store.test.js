import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  CREDIT_POLL_INTERVAL_MS,
  DEFAULT_DAILY_CAP,
  createCodexCreditPoller,
  createCodexCreditStore,
  kstDate
} from './codex-credit-store.js';

/** 2026-10-19 12:00 KST, as epoch milliseconds. */
const NOON_KST = Date.parse('2026-10-19T03:00:00Z');
const KEY = 'user-3::ws-b';

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;
/** @type {string[]} */
let warnings;
/** @type {Array<{ channel: string, message: string }>} */
let notices;
/** @type {number} */
let clock;

/**
 * @returns {ReturnType<typeof createCodexCreditStore>}
 */
function makeStore() {
  return createCodexCreditStore({
    filePath: () => file,
    warn: (message) => warnings.push(message),
    now: () => clock,
    notify: (notice) => notices.push(notice)
  });
}

/**
 * One codex-auth credit observation.
 *
 * @param {number} balance
 * @param {number} updated_at - Epoch seconds.
 * @param {Record<string, unknown>} [overrides]
 * @returns {import('./routes/codex-usage.js').CreditObservation}
 */
function observation(balance, updated_at, overrides = {}) {
  return {
    key: KEY,
    number: 3,
    source: 'api',
    updated_at,
    credits: { has_credits: true, unlimited: false, balance },
    ...overrides
  };
}

/**
 * Feed balances as successive fresh observations, one minute apart.
 *
 * @param {ReturnType<typeof createCodexCreditStore>} store
 * @param {number[]} balances
 * @param {number} [start] - Epoch seconds of the first observation.
 */
function observeSeries(store, balances, start = 1_792_400_000) {
  balances.forEach((balance, index) => {
    store.observe([observation(balance, start + index * 60)]);
  });
}

/**
 * Turn credits on for the test account with a cap.
 *
 * @param {{ set: (input: { expected_revision: unknown, accounts: unknown }) => unknown, snapshot: () => { revision: number } }} store
 * @param {number} daily_cap
 */
function allow(store, daily_cap) {
  store.set({
    expected_revision: store.snapshot().revision,
    accounts: { [KEY]: { allow_credits: true, daily_cap } }
  });
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-codex-credits-'));
  file = path.join(tmp_dir, 'codex-credits.json');
  warnings = [];
  notices = [];
  clock = NOON_KST;
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('codex credit settings (UI-9y1k §4.3)', () => {
  test('reads an unknown account as credits off with the default cap', () => {
    const store = makeStore();

    const setting = store.settingsOf(KEY);

    expect(setting).toEqual({
      allow_credits: false,
      daily_cap: DEFAULT_DAILY_CAP
    });
  });

  test('reads a corrupt file as credits off', () => {
    fs.writeFileSync(file, '{not json');
    const store = makeStore();

    const allowed = store.anyAllowed();

    expect(allowed).toBe(false);
    expect(warnings).toHaveLength(1);
  });

  test('persists one account setting and reads it back from the file', () => {
    allow(makeStore(), 500);

    const reread = makeStore().settingsOf(KEY);

    expect(reread).toEqual({ allow_credits: true, daily_cap: 500 });
  });

  test('keeps the other field when a patch names one field', () => {
    const store = makeStore();
    allow(store, 500);

    store.set({
      expected_revision: store.snapshot().revision,
      accounts: { [KEY]: { allow_credits: false } }
    });

    expect(store.settingsOf(KEY)).toEqual({
      allow_credits: false,
      daily_cap: 500
    });
  });

  test('refuses a stale revision and writes nothing', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 7,
      accounts: { [KEY]: { allow_credits: true } }
    });

    expect(result).toMatchObject({ ok: false, code: 'conflict' });
    expect(fs.existsSync(file)).toBe(false);
  });

  test('refuses a negative cap and writes nothing', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      accounts: { [KEY]: { daily_cap: -1 } }
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_value',
      key: KEY
    });
    expect(fs.existsSync(file)).toBe(false);
  });

  test('pushes a snapshot to listeners after a settings write', () => {
    const store = makeStore();
    const listener = vi.fn();
    store.onChange(listener);

    allow(store, 500);

    expect(listener).toHaveBeenCalledWith(
      expect.objectContaining({
        revision: 1,
        accounts: {
          [KEY]: { allow_credits: true, daily_cap: 500, consumed_today: 0 }
        }
      })
    );
  });
});

describe('codex credit ledger (UI-9y1k §4.3)', () => {
  test('counts only decreases so a purchase never cancels consumption', () => {
    const store = makeStore();

    observeSeries(store, [62500, 62499, 62490, 62600, 62590]);

    expect(store.consumedToday(KEY)).toBe(20);
  });

  test('starts again from zero on a new KST date', () => {
    const store = makeStore();
    observeSeries(store, [62500, 62490]);
    clock = NOON_KST + 24 * 60 * 60 * 1000;

    observeSeries(store, [62490], 1_792_500_000);

    expect(store.consumedToday(KEY)).toBe(0);
  });

  test('reads yesterday consumption as zero before any new observation', () => {
    const store = makeStore();
    observeSeries(store, [62500, 62490]);

    clock = NOON_KST + 24 * 60 * 60 * 1000;

    expect(store.consumedToday(KEY)).toBe(0);
  });

  test('ignores an older observation and a cached one', () => {
    const store = makeStore();
    store.observe([observation(100, 1_000)]);
    store.observe([observation(90, 2_000)]);

    store.observe([observation(100, 1_500)]);
    store.observe([observation(100, 3_000, { source: 'cache' })]);
    store.observe([observation(90, 4_000)]);

    expect(store.consumedToday(KEY)).toBe(10);
  });

  test('ignores a repeated observation with the same timestamp', () => {
    const store = makeStore();
    store.observe([observation(100, 1_000)]);
    store.observe([observation(90, 2_000)]);

    const changed = store.observe([observation(80, 2_000)]);

    expect(changed).toBe(false);
    expect(store.consumedToday(KEY)).toBe(10);
  });

  test('keeps the ledger across a restart', () => {
    observeSeries(makeStore(), [62500, 62490]);

    const consumed = makeStore().consumedToday(KEY);

    expect(consumed).toBe(10);
  });
});

describe('codex credit notices (UI-9y1k §4.1)', () => {
  test('sends one ops notice on the first consumption of the day', () => {
    const store = makeStore();

    observeSeries(store, [62500, 62499, 62490]);

    expect(notices).toEqual([
      {
        channel: 'ops',
        message: expect.stringContaining('오늘 누적 1 크레딧')
      }
    ]);
  });

  test('sends one alert stating the real total when the cap is reached', () => {
    const store = makeStore();
    allow(store, 10);

    observeSeries(store, [100, 95, 88, 80]);

    expect(notices.filter((notice) => notice.channel === 'alert')).toEqual([
      {
        channel: 'alert',
        message: expect.stringContaining('오늘 누적 12 크레딧')
      }
    ]);
  });

  test('sends the ops notice again only on the next day', () => {
    const store = makeStore();
    observeSeries(store, [100, 90]);
    clock = NOON_KST + 24 * 60 * 60 * 1000;

    observeSeries(store, [90, 85], 1_792_500_000);

    expect(notices.map((notice) => notice.channel)).toEqual(['ops', 'ops']);
  });

  test('never alerts the cap of an unlimited account', () => {
    const store = makeStore();
    allow(store, 1);
    const unlimited = { has_credits: true, unlimited: true, balance: 100 };

    store.observe([observation(100, 1_000, { credits: unlimited })]);
    store.observe([
      observation(50, 2_000, { credits: { ...unlimited, balance: 50 } })
    ]);

    expect(notices.map((notice) => notice.channel)).toEqual(['ops']);
  });
});

describe('codex credit poller (UI-9y1k §4.3)', () => {
  test('does not poll while every account has credits off', () => {
    const arm = vi.fn();
    const poller = createCodexCreditPoller({
      store: { anyAllowed: () => false },
      readFresh: vi.fn(async () => undefined),
      setInterval: arm,
      clearInterval: vi.fn()
    });

    poller.sync();

    expect(arm).not.toHaveBeenCalled();
  });

  test('arms a ten-minute read while an account allows credits', () => {
    const arm = vi.fn(() => 'timer');
    const poller = createCodexCreditPoller({
      store: { anyAllowed: () => true },
      readFresh: vi.fn(async () => undefined),
      setInterval: arm,
      clearInterval: vi.fn()
    });

    poller.sync();

    expect(arm).toHaveBeenCalledWith(expect.any(Function), 600_000);
    expect(CREDIT_POLL_INTERVAL_MS).toBe(600_000);
  });

  test('reads once as soon as polling starts', async () => {
    const readFresh = vi.fn(async () => undefined);
    const poller = createCodexCreditPoller({
      store: { anyAllowed: () => true },
      readFresh,
      setInterval: vi.fn(() => 'timer'),
      clearInterval: vi.fn()
    });

    poller.sync();
    await Promise.resolve();

    expect(readFresh).toHaveBeenCalledTimes(1);
  });

  test('stops polling once every account turns credits off', () => {
    let allowed = true;
    const disarm = vi.fn();
    const poller = createCodexCreditPoller({
      store: { anyAllowed: () => allowed },
      readFresh: vi.fn(async () => undefined),
      setInterval: vi.fn(() => 'timer'),
      clearInterval: disarm
    });
    poller.sync();
    allowed = false;

    poller.sync();

    expect(disarm).toHaveBeenCalledWith('timer');
    expect(poller.running()).toBe(false);
  });
});

describe('kstDate', () => {
  test('rolls the date at midnight KST, not UTC', () => {
    const just_after_midnight_kst = Date.parse('2026-10-19T15:00:00Z');

    const date = kstDate(just_after_midnight_kst);

    expect(date).toBe('2026-10-20');
  });
});
