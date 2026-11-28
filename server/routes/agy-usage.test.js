import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  __resetCacheForTest,
  agyConversationOpen,
  createAgyUsageHandler,
  invalidateCache,
  parseAgyAuthList,
  runAgyCredentialChange
} from './agy-usage.js';

const NOW = Date.parse('2026-11-28T03:00:00Z');
const READ_AT = Date.parse('2026-11-28T02:59:30Z');

// `/usage` groups in the shape `agy -p /usage --output-format json` prints
// (dotfiles agy fixtures); the numbers are invented.
const GROUPS = [
  {
    name: 'Gemini Models',
    buckets: [
      {
        id: 'gemini-5h',
        window: '5h',
        remaining_fraction: 0.75,
        reset_time: '2026-11-28T05:00:00Z'
      },
      {
        id: 'gemini-weekly',
        window: 'weekly',
        remaining_fraction: 0.4,
        reset_time: '2026-12-02T00:00:00Z'
      }
    ]
  },
  {
    name: 'Claude and GPT models',
    buckets: [
      { id: 'cg-5h', window: '5h', reset_time: '2026-11-28T04:00:00Z' },
      {
        id: 'cg-weekly',
        window: 'weekly',
        remaining_fraction: 1,
        reset_time: '1970-01-01T00:00:00Z'
      }
    ]
  }
];

const LIVE_WINDOWS = [
  { key: '5h', pct: 25, resetsAt: '2026-11-28T05:00:00.000Z' },
  { key: '7d', pct: 60, resetsAt: '2026-12-02T00:00:00.000Z' },
  { key: 'Claude·GPT 5h', pct: 100, resetsAt: '2026-11-28T04:00:00.000Z' },
  { key: 'Claude·GPT 7d', pct: 0, resetsAt: null }
];

/**
 * An `agy-auth list --json` answer.
 *
 * @param {Record<string, unknown>} [overrides]
 */
function authList(overrides = {}) {
  return {
    ok: true,
    capabilities: { save: true, switch: true, remove: true },
    active: 'main',
    slots: [
      {
        name: 'main',
        account: 'main@gmail.test',
        active: true,
        saved_at: '2026-11-27T00:00:00Z',
        usage: null,
        usage_at: null
      },
      {
        name: 'spare',
        account: 'spare@gmail.test',
        active: false,
        saved_at: '2026-11-27T00:00:00Z',
        usage: [
          {
            group: 'Gemini Models',
            id: 'gemini-5h',
            window: '5h',
            remaining_fraction: 0.9,
            reset_time: '2026-11-28T06:00:00Z'
          },
          {
            group: 'Gemini Models',
            id: 'gemini-weekly',
            window: 'weekly',
            remaining_fraction: 0.5,
            reset_time: '2026-12-03T00:00:00Z'
          }
        ],
        usage_at: '2026-11-28T02:00:00Z'
      }
    ],
    ...overrides
  };
}

/**
 * @returns {any}
 */
function fakeResponse() {
  const res = {
    statusCode: 0,
    /** @type {any} */
    body: undefined,
    /** @type {Record<string, string>} */
    headers: {},
    /**
     * @param {string} name
     * @param {string} value
     */
    set(name, value) {
      res.headers[name] = value;
      return res;
    },
    type() {
      return res;
    },
    /**
     * @param {number} code
     */
    status(code) {
      res.statusCode = code;
      return res;
    },
    /**
     * @param {unknown} payload
     */
    send(payload) {
      res.body = payload;
      return res;
    }
  };
  return res;
}

/**
 * @param {{ usage?: any, list?: any, now?: () => number }} [options]
 */
function usageHarness(options = {}) {
  const readUsage = vi.fn(async () =>
    options.usage === undefined
      ? { quota: { state: 'ok' }, groups: GROUPS, read_at: READ_AT }
      : options.usage
  );
  const listAccounts = vi.fn(async () =>
    options.list === undefined
      ? parseAgyAuthList(JSON.stringify(authList()))
      : options.list
  );
  const handler = createAgyUsageHandler({
    readUsage,
    listAccounts,
    now: options.now || (() => NOW)
  });
  async function get() {
    const res = fakeResponse();
    await handler(/** @type {any} */ ({}), res, () => {});
    return res;
  }
  return { get, readUsage, listAccounts };
}

beforeEach(() => {
  __resetCacheForTest();
});

afterEach(() => {
  __resetCacheForTest();
});

describe('GET /api/agy-usage', () => {
  test('answers the shared usage frame without HTTP caching', async () => {
    const h = usageHarness();

    const res = await h.get();

    expect(res.statusCode).toBe(200);
    expect(res.headers['Cache-Control']).toBe('no-store');
    expect(res.body).toMatchObject({
      available: true,
      provider: 'agy',
      windows: LIVE_WINDOWS,
      fetchedAt: '2026-11-28T02:59:30.000Z',
      ageSeconds: 30,
      capabilities: { save: true, switch: true, remove: true }
    });
    expect(Array.isArray(res.body.accounts)).toBe(true);
  });

  test('reads 5h and 7d windows for each bucket with Gemini first', async () => {
    const h = usageHarness();

    const res = await h.get();

    expect(res.body.windows.map((/** @type {any} */ w) => w.key)).toEqual([
      '5h',
      '7d',
      'Claude·GPT 5h',
      'Claude·GPT 7d'
    ]);
  });

  test('gives the active slot the live read and other slots their stored observation', async () => {
    const h = usageHarness();

    const res = await h.get();

    expect(res.body.accounts).toEqual([
      {
        key: 'main',
        number: 1,
        email: 'main@gmail.test',
        alias: 'main',
        plan: null,
        active: true,
        status: 'ok',
        windows: LIVE_WINDOWS,
        fetchedAt: '2026-11-28T02:59:30.000Z',
        ageSeconds: 30
      },
      {
        key: 'spare',
        number: 2,
        email: 'spare@gmail.test',
        alias: 'spare',
        plan: null,
        active: false,
        status: 'ok',
        windows: [
          { key: '5h', pct: 10, resetsAt: '2026-11-28T06:00:00.000Z' },
          { key: '7d', pct: 50, resetsAt: '2026-12-03T00:00:00.000Z' }
        ],
        fetchedAt: '2026-11-28T02:00:00Z',
        ageSeconds: 3600
      }
    ]);
  });

  test('marks a slot without a stored observation as no_usage', async () => {
    const list = authList();
    list.slots[1].usage = null;
    list.slots[1].usage_at = null;
    const h = usageHarness({
      list: parseAgyAuthList(JSON.stringify(list))
    });

    const res = await h.get();

    expect(res.body.accounts[1]).toMatchObject({
      key: 'spare',
      status: 'no_usage',
      windows: [],
      fetchedAt: null,
      ageSeconds: null
    });
  });

  test('adds the signed-in account as the active row when no slot is active', async () => {
    const h = usageHarness({
      list: parseAgyAuthList(
        JSON.stringify(
          authList({
            capabilities: { save: false, switch: false, remove: false },
            active: null,
            slots: []
          })
        )
      )
    });

    const res = await h.get();

    expect(res.body.capabilities).toEqual({
      save: false,
      switch: false,
      remove: false
    });
    expect(res.body.accounts).toEqual([
      expect.objectContaining({
        key: 'active',
        number: 1,
        active: true,
        status: 'ok',
        windows: LIVE_WINDOWS
      })
    ]);
  });

  test('turns every capability off when agy-auth list fails', async () => {
    const h = usageHarness({ list: { ok: false } });

    const res = await h.get();

    expect(res.body.available).toBe(true);
    expect(res.body.capabilities).toEqual({
      save: false,
      switch: false,
      remove: false
    });
  });

  test('answers available false when the usage and list reads both fail', async () => {
    const h = usageHarness({ usage: null, list: { ok: false } });

    const res = await h.get();

    expect(res.body).toEqual({ available: false });
  });

  test('answers available false when the usage read throws', async () => {
    const h = usageHarness({ list: { ok: false } });
    h.readUsage.mockRejectedValue(new Error('private detail'));

    const res = await h.get();

    expect(res.body).toEqual({ available: false });
  });

  test('keeps the slot rows without windows when only the usage read fails', async () => {
    const h = usageHarness({ usage: null });

    const res = await h.get();

    expect(res.body.available).toBe(false);
    expect(res.body.windows).toBeUndefined();
    expect(res.body.accounts[0]).toMatchObject({
      key: 'main',
      active: true,
      status: 'unavailable',
      windows: []
    });
  });

  test('reuses one read for 180 seconds', async () => {
    let clock = NOW;
    const h = usageHarness({ now: () => clock });

    await h.get();
    clock += 179_999;
    await h.get();
    clock += 1;
    await h.get();

    expect(h.readUsage).toHaveBeenCalledTimes(2);
  });

  test('keeps a failed read for 180 seconds', async () => {
    let clock = NOW;
    const h = usageHarness({ usage: null, now: () => clock });

    await h.get();
    clock += 179_999;
    await h.get();
    clock += 1;
    await h.get();

    expect(h.readUsage).toHaveBeenCalledTimes(2);
  });

  test('reads again after the cache is invalidated', async () => {
    const h = usageHarness();
    await h.get();

    invalidateCache();
    await h.get();

    expect(h.readUsage).toHaveBeenCalledTimes(2);
  });

  test('recalculates the age while reusing the cache', async () => {
    let clock = NOW;
    const h = usageHarness({ now: () => clock });
    await h.get();
    clock += 60_000;

    const res = await h.get();

    expect(res.body.ageSeconds).toBe(90);
  });
});

describe('agy-auth list parsing', () => {
  test('reads capabilities, the active slot and the slots', () => {
    const parsed = parseAgyAuthList(JSON.stringify(authList()));

    expect(parsed).toMatchObject({
      ok: true,
      capabilities: { save: true, switch: true, remove: true },
      active: 'main'
    });
    expect(parsed.ok && parsed.slots.map((slot) => slot.name)).toEqual([
      'main',
      'spare'
    ]);
  });

  test('reads a missing capability as false', () => {
    const parsed = parseAgyAuthList(
      JSON.stringify(authList({ capabilities: { save: true } }))
    );

    expect(parsed.ok && parsed.capabilities).toEqual({
      save: true,
      switch: false,
      remove: false
    });
  });

  test('refuses output that is not a list answer', () => {
    expect(parseAgyAuthList('not json')).toEqual({ ok: false });
    expect(parseAgyAuthList('{"ok": false, "error": "busy"}')).toEqual({
      ok: false
    });
  });
});

describe('agy credential change coordination', () => {
  /**
   * @param {{ held?: boolean, busy?: boolean }} [options]
   */
  function coordination(options = {}) {
    /** @type {string[]} */
    const order = [];
    let active = options.held === true;
    const deps = {
      begin: vi.fn(() => {
        if (active) {
          return false;
        }
        active = true;
        order.push('begin');
        return true;
      }),
      end: vi.fn(() => {
        active = false;
        order.push('end');
      }),
      busy: vi.fn(async () => options.busy === true),
      settle: vi.fn(async () => {
        order.push('settle');
      }),
      invalidateModels: vi.fn(() => order.push('invalidate models')),
      invalidateUsage: vi.fn(() => order.push('invalidate usage'))
    };
    return { deps, order, isActive: () => active };
  }

  test('answers busy without running the action while an agy run or window is live', async () => {
    const c = coordination({ busy: true });
    const action = vi.fn(async () => ({ ok: true }));

    const result = await runAgyCredentialChange(action, c.deps);

    expect(result).toEqual({ ok: false, error: 'busy' });
    expect(action).not.toHaveBeenCalled();
    expect(c.isActive()).toBe(false);
  });

  test('answers busy while another credential change runs', async () => {
    const c = coordination({ held: true });
    const action = vi.fn(async () => ({ ok: true }));

    const result = await runAgyCredentialChange(action, c.deps);

    expect(result).toEqual({ ok: false, error: 'busy' });
    expect(action).not.toHaveBeenCalled();
    expect(c.deps.busy).not.toHaveBeenCalled();
  });

  test('settles reads first and invalidates both caches after a success', async () => {
    const c = coordination();
    const action = vi.fn(async () => {
      c.order.push('action');
      return { ok: true };
    });

    await runAgyCredentialChange(action, c.deps);

    expect(c.order).toEqual([
      'begin',
      'settle',
      'action',
      'end',
      'invalidate models',
      'invalidate usage'
    ]);
  });

  test('ends the change without invalidating after a failure', async () => {
    const c = coordination();

    const result = await runAgyCredentialChange(
      async () => ({ ok: false, error: 'switch_failed' }),
      c.deps
    );

    expect(result).toEqual({ ok: false, error: 'switch_failed' });
    expect(c.deps.invalidateModels).not.toHaveBeenCalled();
    expect(c.isActive()).toBe(false);
  });

  test('ends the change when the action throws', async () => {
    const c = coordination();

    await expect(
      runAgyCredentialChange(async () => {
        throw new Error('boom');
      }, c.deps)
    ).rejects.toThrow('boom');

    expect(c.isActive()).toBe(false);
  });
});

describe('agy conversation window detection', () => {
  test('finds a live pane recorded as an agy runtime', async () => {
    const runTmux = vi.fn(async () => ({
      code: 0,
      stdout: '0 claude\n0 agy\n',
      stderr: ''
    }));

    const open = await agyConversationOpen({ runTmux });

    expect(open).toBe(true);
    expect(runTmux).toHaveBeenCalledWith([
      'list-panes',
      '-a',
      '-F',
      '#{pane_dead} #{@agent_runtime}'
    ]);
  });

  test('ignores a dead agy pane', async () => {
    const runTmux = vi.fn(async () => ({
      code: 0,
      stdout: '1 agy\n0 codex\n',
      stderr: ''
    }));

    const open = await agyConversationOpen({ runTmux });

    expect(open).toBe(false);
  });

  test('reads no tmux server as no window', async () => {
    const runTmux = vi.fn(async () => ({
      code: 1,
      stdout: '',
      stderr: 'no server running on /tmp/tmux-501/default'
    }));

    const open = await agyConversationOpen({ runTmux });

    expect(open).toBe(false);
  });
});
