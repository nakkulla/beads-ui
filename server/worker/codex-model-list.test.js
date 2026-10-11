import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  __setCodexModelListForTest,
  codexNameTable,
  createCodexModelList,
  versionKey
} from './codex-model-list.js';
import { CODEX_SEED_NAMES, resolveCatalog } from './runner-catalog.js';
import {
  __resetRuntimeCatalogForTest,
  runtimeCatalog
} from './runner/index.js';

/**
 * @typedef {{ name: string, models: any[], expect: { aliases: Record<string, string>, pinned: Record<string, string>, errors: Record<string, string> } }} ListCase
 */

/** @type {ListCase[]} */
const CASES = JSON.parse(
  fs.readFileSync(
    path.join(
      path.dirname(fileURLToPath(import.meta.url)),
      '__fixtures__',
      'codex-model-list-cases.json'
    ),
    'utf8'
  )
);

const FAMILIES = ['astra', 'sol', 'terra', 'luna'];

/**
 * @param {string} name
 * @returns {ListCase}
 */
function listCase(name) {
  const found = CASES.find((entry) => entry.name.startsWith(name));
  if (!found) {
    throw new Error(`missing fixture case ${name}`);
  }
  return found;
}

/**
 * @param {string} slug
 * @param {string} [visibility]
 * @param {string} [multi_agent_version]
 */
function model(slug, visibility = 'list', multi_agent_version = 'v2') {
  return { slug, visibility, multi_agent_version };
}

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-codex-list-'));
  file = path.join(tmp_dir, 'codex-models.json');
});

afterEach(() => {
  __setCodexModelListForTest(null);
  __resetRuntimeCatalogForTest();
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

/**
 * A reader whose CLI answers come from `responses` in order; an Error entry
 * makes that `debug models` call fail.
 *
 * @param {Array<any[]|Error>} responses
 * @param {{ warnings?: string[], now?: () => number }} [extra]
 */
function makeList(responses, extra = {}) {
  const queue = [...responses];
  return createCodexModelList({
    filePath: () => file,
    families: () => FAMILIES.slice(),
    now: extra.now ?? (() => 1_700_000_000_000),
    warn: (message) => extra.warnings?.push(message),
    execFile: async (_file, args) => {
      if (args[0] === '--version') {
        return { stdout: 'codex-cli 0.162.0\n' };
      }
      const next = queue.shift();
      if (!next || next instanceof Error) {
        throw next ?? new Error('no response');
      }
      return { stdout: JSON.stringify({ models: next }) };
    }
  });
}

describe('codex model list resolution rules', () => {
  test.each(CASES.map((entry) => [entry.name, entry]))(
    'resolves the %s fixture to its expected name table',
    (_name, entry) => {
      const table = codexNameTable(entry.models, FAMILIES);

      expect(table).toEqual(entry.expect);
    }
  );

  test('drops trailing zeros when comparing versions', () => {
    const six = versionKey('6.0');

    expect(six).toEqual([6]);
  });

  test('keeps a leading zero component significant', () => {
    const key = versionKey('6.0.1');

    expect(key).toEqual([6, 0, 1]);
  });

  test('ignores a family the configured family list does not name', () => {
    const table = codexNameTable([model('gpt-6-sol')], ['sol']);

    expect(table).toEqual({
      aliases: { sol: 'gpt-6-sol' },
      pinned: { 'sol-6': 'gpt-6-sol' },
      errors: {}
    });
  });
});

describe('codex model list reader', () => {
  test('starts from the seed table with no list read', () => {
    const list = makeList([]);

    const names = list.names();

    expect(names).toEqual({
      aliases: { ...CODEX_SEED_NAMES.aliases },
      pinned: { ...CODEX_SEED_NAMES.pinned }
    });
    expect(list.status()).toEqual({
      source: 'seed',
      read_at: null,
      codex_version: null,
      families: FAMILIES
    });
    expect(list.listedPinnedNames()).toBeNull();
  });

  test('adopts the measured CLI list with sol at gpt-6.1-sol', async () => {
    const list = makeList([listCase('measured').models]);

    const changed = await list.refresh();

    expect(changed).toBe(true);
    expect(list.names().aliases.sol).toBe('gpt-6.1-sol');
    expect(Object.keys(list.names().pinned).sort()).toEqual([
      'astra-6',
      'luna-6',
      'sol-5.6',
      'sol-6',
      'sol-6.1',
      'terra-5.6'
    ]);
    expect(list.status()).toMatchObject({
      source: 'list',
      read_at: 1_700_000_000_000,
      codex_version: 'codex-cli 0.162.0'
    });
  });

  test('keeps the last good list when a later read fails', async () => {
    /** @type {string[]} */
    const warnings = [];
    const list = makeList([listCase('measured').models, new Error('boom')], {
      warnings
    });
    await list.refresh();
    const before = list.names();

    const changed = await list.refresh();

    expect(changed).toBe(false);
    expect(list.names()).toBe(before);
    expect(list.status().source).toBe('list');
    expect(warnings.some((line) => line.includes('boom'))).toBe(true);
  });

  test('keeps the seed when the first read fails', async () => {
    const list = makeList([new Error('codex missing')]);

    await list.refresh();

    expect(list.names().aliases).toEqual(CODEX_SEED_NAMES.aliases);
    expect(list.status().source).toBe('seed');
  });

  test('round-trips the last good list through the state file', async () => {
    const writer = makeList([listCase('measured').models]);
    await writer.refresh();
    const reader = makeList([]);

    const changed = reader.loadPersisted();

    expect(changed).toBe(true);
    expect(reader.names()).toEqual(writer.names());
    expect(reader.status()).toEqual(writer.status());
  });

  test('keeps the seed when the state file is corrupt', () => {
    fs.writeFileSync(file, '{broken');
    const list = makeList([]);

    const changed = list.loadPersisted();

    expect(changed).toBe(false);
    expect(list.status().source).toBe('seed');
  });

  test('keeps the previous alias resolution when the list ties a family', async () => {
    /** @type {string[]} */
    const warnings = [];
    const list = makeList(
      [listCase('measured').models, listCase('tie').models],
      { warnings }
    );
    await list.refresh();

    await list.refresh();

    expect(list.names().aliases.sol).toBe('gpt-6.1-sol');
    expect(list.names().pinned['sol-6.0']).toBe('gpt-6.0-sol');
    expect(
      warnings.some((line) => line.includes('codex_models_ambiguous:sol'))
    ).toBe(true);
  });

  test('falls back to the seed alias for a family the first list lacks', async () => {
    const list = makeList([listCase('missing family').models]);

    await list.refresh();

    expect(list.names().aliases.astra).toBe(CODEX_SEED_NAMES.aliases.astra);
    expect(list.names().aliases.terra).toBe(CODEX_SEED_NAMES.aliases.terra);
  });

  test('drops only the failing pinned name of a duplicated slug', async () => {
    const list = makeList([listCase('duplicated slug').models]);

    await list.refresh();

    expect(list.names().pinned).not.toHaveProperty('sol-6');
    expect(list.names().pinned['sol-5.6']).toBe('gpt-5.6-sol');
  });

  test('notifies listeners only when the name table changes', async () => {
    const measured = listCase('measured').models;
    const list = makeList([measured, measured]);
    let calls = 0;
    list.onChange(() => {
      calls++;
    });

    await list.refresh();
    await list.refresh();

    expect(calls).toBe(1);
  });

  test('refreshes at start and on every interval tick', async () => {
    /** @type {Array<() => void>} */
    const ticks = [];
    /** @type {number[]} */
    const intervals = [];
    let reads = 0;
    const list = createCodexModelList({
      filePath: () => file,
      families: () => FAMILIES.slice(),
      warn: () => {},
      execFile: async (_file, args) => {
        if (args[0] === 'debug') {
          reads++;
        }
        return { stdout: JSON.stringify({ models: [] }) };
      },
      setInterval: (fn, ms) => {
        ticks.push(fn);
        intervals.push(ms);
        return {};
      },
      clearInterval: () => {}
    });

    list.start();
    await list.refresh();
    ticks[0]();
    await list.refresh();

    expect(intervals).toEqual([60 * 60 * 1000]);
    expect(reads).toBe(2);
  });
});

describe('codex model list in the runtime catalog', () => {
  test('carries every listed codex name in the resolved catalog', async () => {
    const list = makeList([listCase('measured').models]);
    await list.refresh();

    const catalog = resolveCatalog({
      codex_names: list.names(),
      warn: () => {}
    });

    expect(catalog.runners.codex.models.sol.id).toBe('gpt-6.1-sol');
    for (const name of [
      'sol-6.1',
      'sol-6',
      'sol-5.6',
      'astra-6',
      'luna-6',
      'terra-5.6'
    ]) {
      expect(catalog.model_index[name], name).toBe('codex');
    }
  });

  test('swaps the runtime catalog when the list changes', async () => {
    const list = makeList([listCase('measured').models]);
    __setCodexModelListForTest(list);
    __resetRuntimeCatalogForTest();
    const before = runtimeCatalog();

    await list.refresh();
    const after = runtimeCatalog();

    expect(before.model_index['sol-6.1']).toBeUndefined();
    expect(after).not.toBe(before);
    expect(after.model_index['sol-6.1']).toBe('codex');
    expect(after.codex_list?.source).toBe('list');
  });
});
