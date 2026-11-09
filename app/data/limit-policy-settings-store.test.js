import { describe, expect, test } from 'vitest';
import {
  createLimitPolicySettingsStore,
  isLimitPolicySnapshot,
  limitScopeOf
} from './limit-policy-settings-store.js';

/** @type {{ mode: 'switch', accounts: string[], preempt_pct: null }} */
const ENTRY = { mode: 'switch', accounts: [], preempt_pct: null };

describe('limit-policy settings store (UI-giog §4.2)', () => {
  test('reads a runner as repo before any snapshot arrives', () => {
    const store = createLimitPolicySettingsStore();

    const scope = limitScopeOf(store, 'claude');

    expect(scope).toBe('repo');
  });

  test('reads the global scope a snapshot names', () => {
    const store = createLimitPolicySettingsStore();
    store.set({
      revision: 1,
      runners: {
        claude: { scope: 'global', ...ENTRY },
        codex: { scope: 'repo', ...ENTRY }
      }
    });

    const scopes = [
      limitScopeOf(store, 'claude'),
      limitScopeOf(store, 'codex')
    ];

    expect(scopes).toEqual(['global', 'repo']);
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
