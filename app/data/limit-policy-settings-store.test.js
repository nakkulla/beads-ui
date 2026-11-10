import { describe, expect, test } from 'vitest';
import {
  createLimitPolicySettingsStore,
  isLimitPolicySnapshot
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
