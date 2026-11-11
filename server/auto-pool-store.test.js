import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createAutoPoolStore } from './auto-pool-store.js';
import { loadExecutionDefaults } from './worker/execution-defaults.js';

/** The pinned projection's `implementation` block (the validation source). */
const IMPLEMENTATION = loadExecutionDefaults().session?.implementation ?? null;

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;

/**
 * @param {Record<string, any>|null} [implementation]
 * @returns {ReturnType<typeof createAutoPoolStore>}
 */
function makeStore(implementation = IMPLEMENTATION) {
  return createAutoPoolStore({
    filePath: () => file,
    warn: () => {},
    implementation: () => implementation
  });
}

/**
 * @param {string[]} models
 * @param {string} [min]
 * @param {string} [max]
 */
function entry(models, min = 'high', max = 'xhigh') {
  return { models, effort: { min, max } };
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-auto-pool-'));
  file = path.join(tmp_dir, 'auto-pool.json');
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('auto pool store reads', () => {
  test('reads revision 0 and empty runtimes when the file is absent', () => {
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({ revision: 0, runtimes: {} });
  });

  test('reads a corrupt file as revision 0 and empty runtimes', () => {
    fs.writeFileSync(file, '{ not json');
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({ revision: 0, runtimes: {} });
  });

  test('reads a wrongly shaped runtime entry as an unset file', () => {
    fs.writeFileSync(
      file,
      JSON.stringify({ revision: 4, runtimes: { codex: { models: 'sol' } } })
    );
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toEqual({ revision: 0, runtimes: {} });
  });

  test('keeps stored names the projection would reject', () => {
    const stored = {
      revision: 7,
      runtimes: { claude: entry(['opus-4.8', 'fable'], 'minimal', 'max') }
    };
    fs.writeFileSync(file, JSON.stringify(stored));
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toEqual(stored);
  });
});

describe('auto pool store writes', () => {
  test('stores a Codex pool and bumps the revision', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runtimes: { codex: entry(['terra-6.1', 'sol-6.1']) }
    });

    expect(result).toEqual({
      ok: true,
      snapshot: {
        revision: 1,
        runtimes: { codex: entry(['terra-6.1', 'sol-6.1']) }
      }
    });
  });

  test('reads the stored document back from a fresh store', () => {
    makeStore().set({
      expected_revision: 0,
      runtimes: { codex: entry(['terra-6.1', 'sol-6.1']) }
    });

    const snapshot = makeStore().snapshot();

    expect(snapshot).toEqual({
      revision: 1,
      runtimes: { codex: entry(['terra-6.1', 'sol-6.1']) }
    });
  });

  test('accepts an empty models list', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runtimes: { claude: entry([], 'low', 'high') }
    });

    expect(result.ok).toBe(true);
  });

  test('accepts a grammatical Codex pinned name no catalog lists', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runtimes: { codex: entry(['luna-9.7']) }
    });

    expect(result.ok).toBe(true);
  });

  test('accepts a Codex family alias', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runtimes: { codex: entry(['astra']) }
    });

    expect(result.ok).toBe(true);
  });

  test('drops a runtime the new document omits', () => {
    const store = makeStore();
    store.set({
      expected_revision: 0,
      runtimes: { claude: entry(['opus']), codex: entry(['sol']) }
    });

    const result = store.set({
      expected_revision: 1,
      runtimes: { codex: entry(['sol']) }
    });

    expect(result.snapshot.runtimes).toEqual({ codex: entry(['sol']) });
  });
});

describe('auto pool store rejections', () => {
  test.each([
    ['a stale revision', 3, { codex: entry(['sol']) }, 'conflict'],
    ['an unknown runtime', 0, { gemini: entry(['pro']) }, 'invalid_auto_pool'],
    [
      'three models',
      0,
      { claude: entry(['opus', 'sonnet', 'haiku']) },
      'invalid_auto_pool'
    ],
    [
      'a repeated model',
      0,
      { claude: entry(['opus', 'opus']) },
      'invalid_auto_pool'
    ],
    [
      'an extra entry key',
      0,
      { claude: { ...entry(['opus']), speed: 'fast' } },
      'invalid_auto_pool'
    ],
    ['a non-object document', 0, ['claude'], 'invalid_auto_pool'],
    ['fable', 0, { claude: entry(['fable']) }, 'unknown_model'],
    ['opus-4.8', 0, { claude: entry(['opus-4.8']) }, 'unknown_model'],
    [
      'a Codex name outside the families',
      0,
      { codex: entry(['gpt-6.1-sol']) },
      'unknown_model'
    ],
    [
      'effort minimal',
      0,
      { codex: entry(['sol'], 'minimal', 'high') },
      'invalid_effort_range'
    ],
    [
      'Codex effort max',
      0,
      { codex: entry(['sol'], 'high', 'max') },
      'invalid_effort_range'
    ],
    [
      'min above max',
      0,
      { claude: entry(['opus'], 'xhigh', 'low') },
      'invalid_effort_range'
    ]
  ])('rejects %s', (_name, expected_revision, runtimes, code) => {
    const store = makeStore();

    const result = store.set({ expected_revision, runtimes });

    expect(result).toMatchObject({ ok: false, code });
  });

  test('names the runtime whose entry failed', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      runtimes: { claude: entry(['opus']), codex: entry(['sol'], 'low', 'max') }
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_effort_range',
      runtime: 'codex'
    });
  });

  test('leaves the file and the revision unchanged after a rejection', () => {
    const store = makeStore();
    store.set({ expected_revision: 0, runtimes: { codex: entry(['sol']) } });
    const before = fs.readFileSync(file, 'utf8');

    const result = store.set({
      expected_revision: 1,
      runtimes: { claude: entry(['fable']) }
    });

    expect(fs.readFileSync(file, 'utf8')).toBe(before);
    expect(result.snapshot).toEqual({
      revision: 1,
      runtimes: { codex: entry(['sol']) }
    });
    expect(store.snapshot().revision).toBe(1);
  });

  test('creates no file when the first write is rejected', () => {
    const store = makeStore();

    store.set({ expected_revision: 0, runtimes: { claude: entry(['fable']) } });

    expect(fs.existsSync(file)).toBe(false);
  });

  test('rejects every model name when the projection is unavailable', () => {
    const store = makeStore(null);

    const result = store.set({
      expected_revision: 0,
      runtimes: { claude: entry(['opus']) }
    });

    expect(result).toMatchObject({ ok: false, code: 'unknown_model' });
  });
});
