import { describe, expect, test } from 'vitest';
import {
  createLimitPolicySettingsStore,
  departuresOf,
  isLimitPolicySnapshot,
  limitPolicyStateOf
} from './limit-policy-settings-store.js';

const ENTRY = {
  auto_switch: false,
  default_account: null,
  accounts: [],
  preempt_pct: null
};

describe('limit-policy settings store (UI-giog §4.2, UI-32oq §4.1)', () => {
  test('holds no snapshot before one arrives', () => {
    const store = createLimitPolicySettingsStore();

    const state = store.get();

    expect(state).toBeNull();
  });

  test('keeps the auto-switch settings a snapshot names', () => {
    const store = createLimitPolicySettingsStore();

    store.set({
      revision: 1,
      runners: {
        claude: { ...ENTRY, auto_switch: true, default_account: 'a@x.test' },
        codex: ENTRY
      }
    });

    expect(store.get()?.runners.claude).toEqual({
      ...ENTRY,
      auto_switch: true,
      default_account: 'a@x.test'
    });
  });

  test('refuses a payload without both runners as a snapshot', () => {
    const payload = { revision: 1, runners: { claude: ENTRY } };

    const accepted = isLimitPolicySnapshot(payload);

    expect(accepted).toBe(false);
  });

  test('notifies subscribers when a snapshot lands', () => {
    const store = createLimitPolicySettingsStore();
    let calls = 0;
    store.subscribe(() => {
      calls += 1;
    });

    store.clear();

    expect(calls).toBe(1);
  });
});

describe('departure records on a snapshot (UI-32oq §4.4)', () => {
  const RECORD = {
    default_account: 'a@x.test',
    to_account: 'b@x.test',
    until: null
  };

  test('keeps a pushed record when the snapshot lands in the store', () => {
    const store = createLimitPolicySettingsStore();
    const payload = {
      type: 'limit-policy-settings-snapshot',
      id: 'limit-policy-settings',
      revision: 2,
      runners: { claude: ENTRY, codex: ENTRY },
      departures: { claude: RECORD, codex: null }
    };

    store.set(limitPolicyStateOf(payload));

    expect(store.get()).toEqual({
      revision: 2,
      runners: { claude: ENTRY, codex: ENTRY },
      departures: { claude: RECORD, codex: null }
    });
  });

  test('reads a snapshot without records as no record', () => {
    const payload = { revision: 2, runners: { claude: ENTRY, codex: ENTRY } };

    const departures = departuresOf(payload);

    expect(departures).toEqual({ claude: null, codex: null });
  });

  test('reads a malformed record as no record', () => {
    const payload = {
      departures: { claude: { default_account: 'a', to_account: 'a' } }
    };

    const departures = departuresOf(payload);

    expect(departures).toEqual({ claude: null, codex: null });
  });

  test('accepts a snapshot from a server that sends no records', () => {
    const payload = { revision: 0, runners: { claude: ENTRY, codex: ENTRY } };

    const accepted = isLimitPolicySnapshot(payload);

    expect(accepted).toBe(true);
  });
});
