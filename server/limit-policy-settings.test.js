import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  __resetLimitPolicySettingsForTest,
  __setLimitPolicySettingsForTest,
  createLimitPolicySettingsStore,
  effectiveLimitPolicy
} from './limit-policy-settings.js';

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;
/** @type {string[]} */
let warnings;

/**
 * @returns {ReturnType<typeof createLimitPolicySettingsStore>}
 */
function makeStore() {
  return createLimitPolicySettingsStore({
    filePath: () => file,
    warn: (message) => warnings.push(message)
  });
}

/**
 * @param {unknown} content
 */
function writeFile(content) {
  fs.writeFileSync(
    file,
    typeof content === 'string' ? content : JSON.stringify(content)
  );
}

const DEFAULT_ENTRY = {
  scope: 'repo',
  mode: 'switch',
  accounts: [],
  preempt_pct: null
};

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-limit-policy-'));
  file = path.join(tmp_dir, 'limit-policy-settings.json');
  warnings = [];
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
  __resetLimitPolicySettingsForTest();
});

describe('reading the settings file', () => {
  test('reads repo scope over the repo default for both runners without a file', () => {
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({
      revision: 0,
      runners: { claude: DEFAULT_ENTRY, codex: DEFAULT_ENTRY }
    });
  });

  test('reads a corrupt file as the defaults with one log line', () => {
    writeFile('{not json');
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot.runners).toEqual({
      claude: DEFAULT_ENTRY,
      codex: DEFAULT_ENTRY
    });
    expect(warnings).toHaveLength(1);
  });

  test('falls back only the runner whose entry is invalid', () => {
    writeFile({
      revision: 4,
      runners: {
        claude: {
          scope: 'global',
          mode: 'wait',
          accounts: ['a@example.test'],
          preempt_pct: 80
        },
        codex: { scope: 'everywhere', mode: 'switch', accounts: [] }
      }
    });
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({
      revision: 4,
      runners: {
        claude: {
          scope: 'global',
          mode: 'wait',
          accounts: ['a@example.test'],
          preempt_pct: 80
        },
        codex: DEFAULT_ENTRY
      }
    });
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('codex');
  });
});

describe('writing the settings', () => {
  test('merges a runner patch and persists it with the next revision', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { codex: { scope: 'global', accounts: ['k1', 'k2'] } }
    });

    expect(result.ok).toBe(true);
    expect(JSON.parse(fs.readFileSync(file, 'utf8'))).toEqual({
      revision: 1,
      runners: {
        claude: DEFAULT_ENTRY,
        codex: { ...DEFAULT_ENTRY, scope: 'global', accounts: ['k1', 'k2'] }
      }
    });
  });

  test('names only the runners whose entry changed', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { claude: { mode: 'wait' }, codex: { mode: 'switch' } }
    });

    expect(result.ok && result.changed).toEqual(['claude']);
  });

  test('refuses a stale revision as conflict and writes nothing', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 3,
      runners: { claude: { scope: 'global' } }
    });

    expect(result).toMatchObject({ ok: false, code: 'conflict' });
    expect(fs.existsSync(file)).toBe(false);
  });

  test('refuses an out-of-range preemptive threshold as invalid_value and writes nothing', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { claude: { scope: 'global' }, codex: { preempt_pct: 100 } }
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_value',
      runner: 'codex'
    });
    expect(fs.existsSync(file)).toBe(false);
    expect(store.snapshot().runners.claude.scope).toBe('repo');
  });

  test('refuses an unknown scope as invalid_value', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { claude: { scope: 'all' } }
    });

    expect(result).toMatchObject({ ok: false, code: 'invalid_value' });
  });

  test('refuses an account key with whitespace as invalid_value', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { claude: { accounts: ['a b'] } }
    });

    expect(result).toMatchObject({ ok: false, code: 'invalid_value' });
  });

  test('notifies change listeners with the new snapshot', () => {
    const store = makeStore();
    /** @type {any[]} */
    const seen = [];
    store.onChange((snapshot) => seen.push(snapshot.runners.claude.scope));

    store.set({
      expected_revision: 0,
      runners: { claude: { scope: 'global' } }
    });

    expect(seen).toEqual(['global']);
  });
});

describe('effective limit policy', () => {
  const STORED = { mode: 'wait', accounts: ['repo-acct'], preempt_pct: 70 };

  test('returns the global policy while the runner scope is global', () => {
    __setLimitPolicySettingsForTest({
      claude: {
        scope: 'global',
        mode: 'switch',
        accounts: ['global-acct'],
        preempt_pct: null
      }
    });

    const policy = effectiveLimitPolicy(STORED, 'claude');

    expect(policy).toEqual({
      mode: 'switch',
      accounts: ['global-acct'],
      preempt_pct: null
    });
  });

  test('returns the stored repo policy while the runner scope is repo', () => {
    __setLimitPolicySettingsForTest({
      claude: { scope: 'repo', mode: 'switch', accounts: ['global-acct'] }
    });

    const policy = effectiveLimitPolicy(STORED, 'claude');

    expect(policy).toEqual(STORED);
  });

  test('keeps the other runner on its repo policy', () => {
    __setLimitPolicySettingsForTest({
      claude: { scope: 'global', mode: 'switch', accounts: ['global-acct'] }
    });

    const policy = effectiveLimitPolicy(STORED, 'codex');

    expect(policy).toEqual(STORED);
  });
});
