import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  __resetLimitPolicySettingsForTest,
  createLimitPolicySettingsStore
} from './limit-policy-settings.js';

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;
/** @type {string[]} */
let warnings;

/**
 * @param {{ fs?: typeof import('node:fs') }} [options]
 * @returns {ReturnType<typeof createLimitPolicySettingsStore>}
 */
function makeStore(options = {}) {
  return createLimitPolicySettingsStore({
    filePath: () => file,
    warn: (message) => warnings.push(message),
    ...(options.fs ? { fs: options.fs } : {})
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

/**
 * @returns {any}
 */
function readFile() {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

/**
 * The node `fs` with `renameSync` failing, so every write fails.
 *
 * @returns {typeof import('node:fs')}
 */
function failingWriteFs() {
  return /** @type {typeof import('node:fs')} */ ({
    ...fs,
    renameSync: () => {
      throw new Error('disk full');
    }
  });
}

const DEFAULT_ENTRY = {
  auto_switch: false,
  default_account: null,
  accounts: [],
  preempt_pct: null
};

/** The UI-giog file measured on 2026-11-10 (spec §2). */
const LEGACY_FILE = {
  revision: 7,
  runners: {
    claude: { scope: 'repo', mode: 'wait', accounts: [], preempt_pct: null },
    codex: {
      scope: 'global',
      mode: 'switch',
      accounts: ['k1', 'k2', 'k3'],
      preempt_pct: 90
    }
  }
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
  test('reads both runners as auto switch off without a file', () => {
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({
      revision: 0,
      runners: { claude: DEFAULT_ENTRY, codex: DEFAULT_ENTRY }
    });
  });

  test('reads a corrupt file as auto switch off with one log line', () => {
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
          auto_switch: true,
          default_account: 'a@example.test',
          accounts: ['b@example.test'],
          preempt_pct: 80
        },
        codex: { auto_switch: 'yes', default_account: null, accounts: [] }
      }
    });
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({
      revision: 4,
      runners: {
        claude: {
          auto_switch: true,
          default_account: 'a@example.test',
          accounts: ['b@example.test'],
          preempt_pct: 80
        },
        codex: DEFAULT_ENTRY
      }
    });
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('codex');
  });

  test('falls back a stored entry that lacks a field to auto switch off', () => {
    writeFile({
      revision: 2,
      runners: {
        claude: { auto_switch: true, accounts: ['a'], preempt_pct: null }
      }
    });
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot.runners.claude).toEqual(DEFAULT_ENTRY);
  });

  test('leaves an old-shape file untouched on a read', () => {
    writeFile(LEGACY_FILE);
    const store = makeStore();

    store.snapshot();

    expect(readFile()).toEqual(LEGACY_FILE);
  });
});

describe('migrating the UI-giog shape (UI-32oq §4.1)', () => {
  test('maps scope global, mode switch and a non-empty list to auto switch on', () => {
    writeFile(LEGACY_FILE);
    const store = makeStore();

    store.migrate();

    expect(readFile().runners).toEqual({
      claude: DEFAULT_ENTRY,
      codex: {
        auto_switch: true,
        default_account: null,
        accounts: ['k1', 'k2', 'k3'],
        preempt_pct: 90
      }
    });
  });

  test('lists only the runners whose scope was global in rebind_pending', () => {
    writeFile(LEGACY_FILE);
    const store = makeStore();

    store.migrate();

    expect(readFile().rebind_pending).toEqual(['codex']);
  });

  test('writes an empty rebind_pending when no runner was global', () => {
    writeFile({
      revision: 1,
      runners: {
        claude: {
          scope: 'repo',
          mode: 'switch',
          accounts: ['a'],
          preempt_pct: null
        },
        codex: { scope: 'repo', mode: 'wait', accounts: [], preempt_pct: null }
      }
    });
    const store = makeStore();

    store.migrate();

    expect(readFile().rebind_pending).toEqual([]);
  });

  test('keeps auto switch off for a global runner that waited', () => {
    writeFile({
      revision: 1,
      runners: {
        claude: {
          scope: 'global',
          mode: 'wait',
          accounts: ['a'],
          preempt_pct: null
        }
      }
    });
    const store = makeStore();

    store.migrate();

    expect(readFile()).toMatchObject({
      runners: { claude: { auto_switch: false, accounts: ['a'] } },
      rebind_pending: ['claude']
    });
  });

  test('keeps auto switch off for a global runner with an empty list', () => {
    writeFile({
      revision: 1,
      runners: {
        claude: {
          scope: 'global',
          mode: 'switch',
          accounts: [],
          preempt_pct: null
        }
      }
    });
    const store = makeStore();

    store.migrate();

    expect(readFile().runners.claude.auto_switch).toBe(false);
  });

  test('writes the converted shape once with the next revision', () => {
    writeFile(LEGACY_FILE);
    const store = makeStore();

    const first = store.migrate();
    const second = store.migrate();

    expect([first.migrated, second.migrated]).toEqual([true, false]);
    expect(readFile().revision).toBe(8);
  });

  test('serves the converted shape from memory when the write fails', () => {
    writeFile(LEGACY_FILE);
    const store = makeStore({ fs: failingWriteFs() });

    const result = store.migrate();

    expect(result).toEqual({ migrated: false, rebind_pending: ['codex'] });
    expect(store.runner('codex').auto_switch).toBe(true);
    expect(readFile()).toEqual(LEGACY_FILE);
  });

  test('converts again on the next start after a failed write', () => {
    writeFile(LEGACY_FILE);
    makeStore({ fs: failingWriteFs() }).migrate();
    const restarted = makeStore();

    const result = restarted.migrate();

    expect(result).toEqual({ migrated: true, rebind_pending: ['codex'] });
    expect(readFile().rebind_pending).toEqual(['codex']);
  });

  test('reads rebind_pending back after the migration write', () => {
    writeFile(LEGACY_FILE);
    makeStore().migrate();
    const restarted = makeStore();

    const pending = restarted.rebindPending();

    expect(pending).toEqual(['codex']);
  });
});

describe('finishing a pending rebind', () => {
  test('drops the runner from rebind_pending on disk', () => {
    writeFile(LEGACY_FILE);
    const store = makeStore();
    store.migrate();

    const ok = store.completeRebind('codex');

    expect(ok).toBe(true);
    expect(readFile().rebind_pending).toEqual([]);
  });

  test('keeps the revision when dropping a runner', () => {
    writeFile(LEGACY_FILE);
    const store = makeStore();
    store.migrate();

    store.completeRebind('codex');

    expect(store.snapshot().revision).toBe(8);
  });

  test('keeps the runner pending when the write fails', () => {
    writeFile({
      revision: 8,
      runners: {
        claude: DEFAULT_ENTRY,
        codex: { ...DEFAULT_ENTRY, auto_switch: true, accounts: ['k1'] }
      },
      rebind_pending: ['codex']
    });
    const store = makeStore({ fs: failingWriteFs() });

    const ok = store.completeRebind('codex');

    expect(ok).toBe(false);
    expect(store.rebindPending()).toEqual(['codex']);
  });

  test('carries rebind_pending through a user write', () => {
    writeFile(LEGACY_FILE);
    const store = makeStore();
    store.migrate();

    store.set({
      expected_revision: 8,
      runners: { claude: { auto_switch: true } }
    });

    expect(readFile().rebind_pending).toEqual(['codex']);
  });
});

describe('writing the settings', () => {
  test('merges a runner patch and persists it with the next revision', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: {
        codex: { auto_switch: true, default_account: 'k0', accounts: ['k1'] }
      }
    });

    expect(result.ok).toBe(true);
    expect(readFile()).toEqual({
      revision: 1,
      runners: {
        claude: DEFAULT_ENTRY,
        codex: {
          ...DEFAULT_ENTRY,
          auto_switch: true,
          default_account: 'k0',
          accounts: ['k1']
        }
      },
      rebind_pending: []
    });
  });

  test('clears the default with null', () => {
    const store = makeStore();
    store.set({
      expected_revision: 0,
      runners: { claude: { default_account: 'a@example.test' } }
    });

    store.set({
      expected_revision: 1,
      runners: { claude: { default_account: null } }
    });

    expect(store.runner('claude').default_account).toBeNull();
  });

  test('refuses a stale revision as conflict and writes nothing', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 3,
      runners: { claude: { auto_switch: true } }
    });

    expect(result).toMatchObject({ ok: false, code: 'conflict' });
    expect(fs.existsSync(file)).toBe(false);
  });

  test('refuses an out-of-range trigger as invalid_value and writes nothing', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { claude: { auto_switch: true }, codex: { preempt_pct: 100 } }
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_value',
      runner: 'codex'
    });
    expect(fs.existsSync(file)).toBe(false);
    expect(store.runner('claude').auto_switch).toBe(false);
  });

  test('refuses an old-shape scope field as invalid_value', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { claude: { scope: 'global' } }
    });

    expect(result).toMatchObject({ ok: false, code: 'invalid_value' });
  });

  test('refuses a non-boolean auto switch as invalid_value', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { claude: { auto_switch: 'on' } }
    });

    expect(result).toMatchObject({ ok: false, code: 'invalid_value' });
  });

  test('refuses a default account with whitespace as invalid_value', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runners: { claude: { default_account: 'a b' } }
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

  test('notifies change listeners with the new and the previous snapshot', () => {
    const store = makeStore();
    /** @type {any[]} */
    const seen = [];
    store.onChange((snapshot, previous) =>
      seen.push([
        previous.runners.claude.auto_switch,
        snapshot.runners.claude.auto_switch
      ])
    );

    store.set({
      expected_revision: 0,
      runners: { claude: { auto_switch: true } }
    });

    expect(seen).toEqual([[false, true]]);
  });
});
