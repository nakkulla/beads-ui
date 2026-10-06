import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  createProviderHoldStore,
  effectiveProviderHolds,
  providerTargetScope
} from './provider-holds.js';
import { providerHoldsFilePath } from './state-paths.js';

/** @type {string} */
let tmp_state;

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-provider-holds-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

/**
 * One usage-limit observation of `held@example.com`.
 *
 * @param {Partial<{ kind: 'outage'|'usage_limit', detail: string, resets_at: number|null, rearm_count: number, account: string|null }>} [patch]
 */
function observation(patch = {}) {
  return {
    kind: /** @type {'outage'|'usage_limit'} */ ('usage_limit'),
    model: 'opus',
    account: 'held@example.com',
    detail: 'usage_limit',
    last_error: 'limit',
    resets_at: 5000,
    rearm_count: 0,
    ...patch
  };
}

describe('server-global provider hold store (UI-3v1h §5.1)', () => {
  test('merges a same-key re-entry into the target it already created', () => {
    const store = createProviderHoldStore({ now: () => 100 });
    const first = store.enter({
      runner: 'claude',
      origin: '/repo-a',
      target: observation()
    });

    const second = store.enter({
      runner: 'claude',
      origin: '/repo-b',
      target: observation({ resets_at: 9000, rearm_count: 2 })
    });

    expect(second?.target_id).toBe(first?.target_id);
    expect(store.holds().claude.targets).toEqual([
      expect.objectContaining({
        target_id: first?.target_id,
        origin: '/repo-a',
        resets_at: 9000,
        rearm_count: 2
      })
    ]);
  });

  test('reports entered for the creating call only', () => {
    const store = createProviderHoldStore();

    const first = store.enter({
      runner: 'claude',
      origin: '/repo-a',
      target: observation()
    });
    const second = store.enter({
      runner: 'claude',
      origin: '/repo-b',
      target: observation()
    });

    expect([first?.entered, second?.entered]).toEqual([true, false]);
  });

  test('keeps the target identity through a reclassification', () => {
    const store = createProviderHoldStore();
    const entry = store.enter({
      runner: 'claude',
      origin: '/repo-a',
      target: observation({ kind: 'outage', detail: 'overloaded_529' })
    });
    const target_id = String(entry?.target_id);

    store.update(target_id, { kind: 'usage_limit' });
    store.update(target_id, { kind: 'outage' });

    expect(store.holds().claude.targets).toEqual([
      expect.objectContaining({ target_id, kind: 'outage' })
    ]);
  });

  test('gives a new runner hold the counter plus one', () => {
    const store = createProviderHoldStore();
    store.seedGeneration(7);

    const entry = store.enter({
      runner: 'codex',
      origin: '/repo-a',
      target: observation({ account: 'codex-key' })
    });

    expect(entry?.generation).toBe(8);
  });

  test('refuses an account-unresolved usage limit', () => {
    const store = createProviderHoldStore();

    const entry = store.enter({
      runner: 'claude',
      origin: '/repo-a',
      target: observation({ account: null })
    });

    expect(entry).toBeNull();
    expect(store.holds()).toEqual({});
  });

  test('drops the runner hold with its last target', () => {
    const store = createProviderHoldStore();
    const entry = store.enter({
      runner: 'claude',
      origin: '/repo-a',
      target: observation()
    });

    const removed = store.remove(String(entry?.target_id));

    expect(removed?.hold_removed).toBe(true);
    expect(store.holds()).toEqual({});
  });

  test('reads the persisted holds back on a fresh instance', () => {
    const first = createProviderHoldStore();
    const entry = first.enter({
      runner: 'claude',
      origin: '/repo-a',
      target: observation()
    });

    const restored = createProviderHoldStore().find(String(entry?.target_id));

    expect(restored?.target).toMatchObject({
      account: 'held@example.com',
      origin: '/repo-a'
    });
  });

  test('preserves a malformed file aside and starts empty', () => {
    fs.mkdirSync(path.dirname(providerHoldsFilePath()), { recursive: true });
    fs.writeFileSync(providerHoldsFilePath(), '{ not json');
    const warn = vi.fn();

    const store = createProviderHoldStore({ now: () => 42, warn });

    expect(store.holds()).toEqual({});
    expect(
      fs.readFileSync(`${providerHoldsFilePath()}.corrupt-42`, 'utf8')
    ).toBe('{ not json');
  });

  test('preserves a file with a damaged target aside and starts empty', () => {
    const damaged = JSON.stringify({
      generation: 1,
      holds: {
        claude: {
          since: 1,
          generation: 1,
          targets: [{ kind: 'usage_limit', model: 'opus', account: 'a' }]
        }
      }
    });
    fs.mkdirSync(path.dirname(providerHoldsFilePath()), { recursive: true });
    fs.writeFileSync(providerHoldsFilePath(), damaged);

    const store = createProviderHoldStore({ now: () => 42, warn: vi.fn() });

    expect(store.holds()).toEqual({});
    expect(
      fs.readFileSync(`${providerHoldsFilePath()}.corrupt-42`, 'utf8')
    ).toBe(damaged);
  });

  test('throws a failed write and keeps the prior state in memory', () => {
    const failing = {
      ...fs,
      writeFileSync: () => {
        throw new Error('disk full');
      }
    };
    const store = createProviderHoldStore({
      fs: /** @type {any} */ (failing)
    });

    expect(() =>
      store.enter({
        runner: 'claude',
        origin: '/repo-a',
        target: observation()
      })
    ).toThrow('disk full');
    expect(store.holds()).toEqual({});
  });

  test('tells listeners about a write and stays quiet on a no-op', () => {
    const store = createProviderHoldStore();
    const listener = vi.fn();
    store.onChange(listener);
    const entry = store.enter({
      runner: 'claude',
      origin: '/repo-a',
      target: observation()
    });

    store.update(String(entry?.target_id), { resets_at: 5000 });

    expect(listener).toHaveBeenCalledTimes(1);
  });
});

describe('provider target scope (UI-3v1h §5.1)', () => {
  test.each([
    [{ kind: 'usage_limit', account: 'a' }, 'account'],
    [{ kind: 'usage_limit', account: null }, 'unresolved'],
    [{ kind: 'outage', detail: 'credential', account: 'a' }, 'account'],
    [{ kind: 'outage', detail: 'credential', account: null }, 'runner'],
    [{ kind: 'outage', detail: 'overloaded_529', account: 'a' }, 'runner']
  ])('reads %j as %s', (target, scope) => {
    const result = providerTargetScope(target);

    expect(result).toBe(scope);
  });
});

describe('effective provider holds (UI-3v1h §5.5)', () => {
  /** @type {Record<string, import('./provider-holds.js').GlobalProviderHold>} */
  const GLOBAL = {
    claude: {
      since: 10,
      generation: 3,
      targets: [
        {
          target_id: 't-1',
          origin: '/repo-a',
          kind: 'usage_limit',
          model: 'opus',
          account: 'held@example.com',
          detail: 'usage_limit',
          last_error: 'limit',
          resets_at: 5000,
          rearm_count: 0,
          next_probe_at: 5060
        }
      ]
    }
  };

  test('projects a global target with no member as attempt_ids []', () => {
    const projected = effectiveProviderHolds(GLOBAL, {}, {});

    expect(projected.claude.targets[0]).toMatchObject({
      target_id: 't-1',
      attempt_ids: [],
      auto_switch: null
    });
  });

  test('binds members and their switch state onto the target', () => {
    const projected = effectiveProviderHolds(
      GLOBAL,
      {},
      {
        'att-1': {
          runner: 'claude',
          target_id: 't-1',
          account: 'held@example.com',
          auto_switch: 'none',
          switch_ready_at: 900,
          switch_ready_account: 'new@example.com'
        }
      }
    );

    expect(projected.claude.targets[0]).toMatchObject({
      attempt_ids: ['att-1'],
      auto_switch: 'none',
      switch_ready_at: 900,
      switch_ready_account: 'new@example.com'
    });
  });

  test('appends the workspace own unresolved target under the global since', () => {
    const projected = effectiveProviderHolds(
      GLOBAL,
      {
        claude: {
          since: 99,
          generation: 1,
          targets: [{ kind: 'usage_limit', account: null, attempt_ids: ['u'] }]
        }
      },
      {}
    );

    expect(projected.claude.since).toBe(10);
    expect(projected.claude.targets.map((target) => target.account)).toEqual([
      'held@example.com',
      null
    ]);
  });
});
