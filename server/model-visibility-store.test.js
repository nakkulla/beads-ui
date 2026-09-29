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
