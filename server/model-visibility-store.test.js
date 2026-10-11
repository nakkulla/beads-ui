import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createModelVisibilityStore } from './model-visibility-store.js';
import { resolveCatalog } from './worker/runner-catalog.js';

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;

const CATALOG = resolveCatalog({ warn: () => {} });

/**
 * @returns {ReturnType<typeof createModelVisibilityStore>}
 */
function makeStore() {
  return createModelVisibilityStore({ filePath: () => file, warn: () => {} });
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-mv-'));
  file = path.join(tmp_dir, 'model-visibility.json');
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('model visibility store', () => {
  test('reads the default disabled list when the file is absent', () => {
    const store = makeStore();

    const snapshot = store.snapshot(CATALOG);

    expect(snapshot).toEqual({
      revision: 0,
      disabled_models: ['opus-4.8', 'opus-4.6', 'sol-5.6', 'terra', 'luna-5.6']
    });
  });

  test('warns on a read error other than a missing file and keeps the defaults', () => {
    /** @type {string[]} */
    const warnings = [];
    fs.mkdirSync(file);
    const store = createModelVisibilityStore({
      filePath: () => file,
      warn: (message) => warnings.push(message)
    });

    const snapshot = store.snapshot(CATALOG);

    expect(snapshot.revision).toBe(0);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('읽기 실패');
  });

  test('stays silent when the file is merely absent', () => {
    /** @type {string[]} */
    const warnings = [];
    const store = createModelVisibilityStore({
      filePath: () => file,
      warn: (message) => warnings.push(message)
    });

    store.snapshot(CATALOG);

    expect(warnings).toEqual([]);
  });

  test('rejects a stale revision with conflict and the current snapshot', () => {
    const store = makeStore();

    const result = store.set(
      { expected_revision: 3, disabled_models: ['terra'] },
      CATALOG
    );

    expect(result).toMatchObject({
      ok: false,
      code: 'conflict',
      snapshot: { revision: 0 }
    });
    expect(fs.existsSync(file)).toBe(false);
  });

  test('rejects a name outside the catalog with unknown_model', () => {
    const store = makeStore();

    const result = store.set(
      { expected_revision: 0, disabled_models: ['gpt-9'] },
      CATALOG
    );

    expect(result).toMatchObject({ ok: false, code: 'unknown_model' });
    expect(fs.existsSync(file)).toBe(false);
  });

  test('rejects disabling every model of one runner with runner_all_disabled', () => {
    const store = makeStore();
    const all_codex = Object.keys(CATALOG.runners.codex.models);

    const result = store.set(
      { expected_revision: 0, disabled_models: all_codex },
      CATALOG
    );

    expect(result).toMatchObject({ ok: false, code: 'runner_all_disabled' });
    expect(fs.existsSync(file)).toBe(false);
  });

  test('ignores names outside the catalog when reading the file', () => {
    fs.writeFileSync(
      file,
      JSON.stringify({ revision: 4, disabled_models: ['terra', 'gone-model'] })
    );
    const store = makeStore();

    const snapshot = store.snapshot(CATALOG);

    expect(snapshot).toEqual({ revision: 4, disabled_models: ['terra'] });
  });
});

describe('model visibility store codex pinned names (UI-gpac §3.6)', () => {
  const LISTED = {
    aliases: {
      astra: 'gpt-6-astra',
      sol: 'gpt-6.1-sol',
      terra: 'gpt-5.6-terra',
      luna: 'gpt-6-luna'
    },
    pinned: {
      'astra-6': 'gpt-6-astra',
      'luna-6': 'gpt-6-luna',
      'sol-5.6': 'gpt-5.6-sol',
      'sol-6': 'gpt-6-sol',
      'sol-6.1': 'gpt-6.1-sol',
      'terra-5.6': 'gpt-5.6-terra'
    }
  };
  const LISTED_CATALOG = resolveCatalog({
    codex_names: LISTED,
    warn: () => {}
  });
  const PINNED = Object.keys(LISTED.pinned);
  /** Names of the catalog before the CLI list: the seed table. */
  const LEGACY = Object.keys(CATALOG.model_index);

  test('hides every listed pinned name when no state file exists', () => {
    const store = makeStore();

    store.observeCodexPinnedNames(PINNED, LEGACY);

    expect(store.snapshot(LISTED_CATALOG).disabled_models.sort()).toEqual(
      [
        'opus-4.8',
        'opus-4.6',
        'terra',
        'astra-6',
        'luna-6',
        'sol-5.6',
        'sol-6',
        'sol-6.1',
        'terra-5.6'
      ].sort()
    );
  });

  test('keeps a pinned name the user enabled across list refreshes', () => {
    const store = makeStore();
    store.observeCodexPinnedNames(PINNED, LEGACY);
    const current = store.snapshot(LISTED_CATALOG);
    store.set(
      {
        expected_revision: current.revision,
        disabled_models: current.disabled_models.filter(
          (name) => name !== 'sol-6.1'
        )
      },
      LISTED_CATALOG
    );

    store.observeCodexPinnedNames([...PINNED, 'sol-6.2'], LEGACY);

    const disabled = store.snapshot(
      resolveCatalog({
        codex_names: {
          aliases: LISTED.aliases,
          pinned: { ...LISTED.pinned, 'sol-6.2': 'gpt-6.2-sol' }
        },
        warn: () => {}
      })
    ).disabled_models;
    expect(disabled).not.toContain('sol-6.1');
    expect(disabled).toContain('sol-6.2');
  });

  test('migrates an older state file so already-enabled names stay enabled', () => {
    fs.writeFileSync(
      file,
      JSON.stringify({ revision: 3, disabled_models: ['terra'] })
    );
    const store = makeStore();

    store.observeCodexPinnedNames(PINNED, LEGACY);

    expect(store.snapshot(LISTED_CATALOG)).toEqual({
      revision: 4,
      disabled_models: [
        'terra',
        'astra-6',
        'luna-6',
        'sol-6',
        'sol-6.1',
        'terra-5.6'
      ]
    });
  });

  test('changes nothing when the list shows no new pinned name', () => {
    const store = makeStore();
    store.observeCodexPinnedNames(PINNED, LEGACY);

    const changed = store.observeCodexPinnedNames(PINNED, LEGACY);

    expect(changed).toBe(false);
  });

  test('keeps the seen names through a write', () => {
    const store = makeStore();
    store.observeCodexPinnedNames(PINNED, LEGACY);
    const current = store.snapshot(LISTED_CATALOG);

    store.set(
      {
        expected_revision: current.revision,
        disabled_models: current.disabled_models
      },
      LISTED_CATALOG
    );

    const saved = JSON.parse(fs.readFileSync(file, 'utf8'));
    expect(saved.seen_models).toEqual(expect.arrayContaining(PINNED));
  });
});
