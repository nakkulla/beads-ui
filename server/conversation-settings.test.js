import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  conflictLaunchSettings,
  conversationLaunchFlags,
  createConversationSettingsStore,
  freshConversationRuntime
} from './conversation-settings.js';

/** A catalog slice with one model and effort list per runner. */
const CATALOG = {
  runners: {
    claude: {
      models: { opus: { id: 'opus' }, 'opus-4.8': { id: 'claude-opus-4-8' } },
      efforts: ['low', 'high']
    },
    codex: {
      models: { sol: { id: 'gpt-6-sol', efforts: ['low', 'xhigh'] } },
      efforts: ['minimal', 'low']
    }
  }
};

/** @type {string} */
let dir = '';

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-conv-settings-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

/**
 * @param {{ config?: boolean, warn?: (message: string) => void, catalog?: any }} [over]
 */
function makeStore(over = {}) {
  return createConversationSettingsStore({
    filePath: () => path.join(dir, 'conversation-settings.json'),
    warn: over.warn ?? (() => {}),
    configAutoLaunch: () => over.config === true,
    catalog: () => over.catalog ?? CATALOG
  });
}

/**
 * The fixture catalog plus an agy runner listing `ids`.
 *
 * @param {string[]} ids
 */
function agyCatalog(ids) {
  return {
    runners: {
      ...CATALOG.runners,
      agy: {
        models: Object.fromEntries(ids.map((id) => [id, { id }])),
        efforts: []
      }
    }
  };
}

/**
 * @param {unknown} body
 */
function writeFile(body) {
  fs.writeFileSync(
    path.join(dir, 'conversation-settings.json'),
    typeof body === 'string' ? body : JSON.stringify(body)
  );
}

describe('conversation settings store (UI-jbl1 §3.4)', () => {
  test('persists conflict overrides independently of conversation models', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: {
        codex_model: 'sol',
        codex_effort: 'low',
        conflict_codex_model: 'sol',
        conflict_codex_effort: 'xhigh'
      }
    });

    expect(result.ok).toBe(true);
    expect(makeStore().effective()).toMatchObject({
      codex_effort: 'low',
      conflict_codex_model: 'sol',
      conflict_codex_effort: 'xhigh'
    });
    expect(result.snapshot.fields.conflict_codex_effort.choices).toEqual([
      'low',
      'xhigh'
    ]);
  });

  test('rejects an effort outside the conflict model capabilities', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: {
        conflict_codex_model: 'sol',
        conflict_codex_effort: 'high'
      }
    });

    expect(result).toMatchObject({ ok: false, key: 'conflict_codex_effort' });
    expect(store.snapshot().revision).toBe(0);
  });

  test('skips an effort-only override incompatible with the launch model', () => {
    const values = {
      ...makeStore().effective(),
      conflict_codex_effort: 'minimal'
    };
    const base = { model: 'sol', effort: 'low', speed: 'default' };

    const result = conflictLaunchSettings(
      'codex',
      base,
      values,
      /** @type {any} */ (CATALOG)
    );

    expect(result).toEqual(base);
  });

  test('clears an inherited effort incompatible with a changed conflict model', () => {
    const values = { ...makeStore().effective(), conflict_codex_model: 'sol' };

    const result = conflictLaunchSettings(
      'codex',
      { model: null, effort: 'minimal', speed: 'default' },
      values,
      /** @type {any} */ (CATALOG)
    );

    expect(result).toEqual({ model: 'sol', effort: null, speed: 'default' });
  });

  test.each(['sol', 'gpt-6-sol'])(
    'validates an effort-only override against the actual %s model',
    (model) => {
      const values = {
        ...makeStore().effective(),
        conflict_codex_effort: 'xhigh'
      };

      const result = conflictLaunchSettings(
        'codex',
        { model, effort: 'low', speed: 'default' },
        values,
        /** @type {any} */ (CATALOG)
      );

      expect(result).toEqual({ model, effort: 'xhigh', speed: 'default' });
    }
  );

  test('reads config.toml, claude and "따름" without a file', () => {
    const store = makeStore({ config: true });

    const values = store.effective();

    expect(values).toEqual({
      auto_launch: true,
      fresh_runtime: 'claude',
      claude_model: null,
      claude_effort: null,
      codex_model: null,
      codex_effort: null,
      agy_model: null,
      conflict_claude_model: null,
      conflict_claude_effort: null,
      conflict_codex_model: null,
      conflict_codex_effort: null
    });
  });

  test('prefers the stored switch over config.toml', () => {
    writeFile({ revision: 2, overrides: { auto_launch: false } });
    const store = makeStore({ config: true });

    expect(store.effective().auto_launch).toBe(false);
    expect(store.storedAutoLaunch()).toBe(false);
  });

  test('falls back to config.toml and "따름" with a warning on a corrupt file', () => {
    writeFile('{ not json');
    const warn = vi.fn();
    const store = makeStore({ config: true, warn });

    const values = store.effective();

    expect(values.auto_launch).toBe(true);
    expect(values.claude_model).toBeNull();
    expect(warn).toHaveBeenCalledTimes(1);
  });

  test('drops a stored model the catalog no longer lists', () => {
    writeFile({ revision: 1, overrides: { claude_model: 'gone' } });
    const warn = vi.fn();
    const store = makeStore({ warn });

    expect(store.effective().claude_model).toBeNull();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('claude_model'));
  });

  test('saves a change and reloads it from the file', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: { fresh_runtime: 'codex', codex_model: 'sol' }
    });

    expect(result.ok).toBe(true);
    const reloaded = makeStore().effective();
    expect([reloaded.fresh_runtime, reloaded.codex_model]).toEqual([
      'codex',
      'sol'
    ]);
  });

  test('clears an override with null', () => {
    writeFile({ revision: 1, overrides: { codex_effort: 'xhigh' } });
    const store = makeStore();

    store.set({ expected_revision: 1, values: { codex_effort: null } });

    expect(store.effective().codex_effort).toBeNull();
  });

  test('refuses a stale revision without writing', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 5,
      values: { auto_launch: true }
    });

    expect(result).toMatchObject({ ok: false, code: 'conflict' });
    expect(fs.existsSync(path.join(dir, 'conversation-settings.json'))).toBe(
      false
    );
  });

  test('refuses an effort the runner does not accept', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: { claude_effort: 'max' }
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_value',
      key: 'claude_effort'
    });
  });

  test('lists each runner models and the runner efforts without a model', () => {
    const store = makeStore();

    const fields = store.snapshot().fields;

    expect(fields.claude_model.choices).toEqual(['opus', 'opus-4.8']);
    expect(fields.codex_effort.choices).toEqual(['minimal', 'low']);
    expect(fields.fresh_runtime).toMatchObject({
      choices: ['inherit', 'claude', 'codex', 'agy'],
      default: 'claude'
    });
  });

  test('lists the stored model own efforts', () => {
    writeFile({ revision: 1, overrides: { codex_model: 'sol' } });
    const store = makeStore();

    const fields = store.snapshot().fields;

    expect(fields.codex_effort.choices).toEqual(['low', 'xhigh']);
  });

  test('refuses an effort the chosen model does not accept', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: { codex_model: 'sol', codex_effort: 'minimal' }
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_value',
      key: 'codex_effort'
    });
    expect(store.effective().codex_model).toBeNull();
  });

  test('refuses a model change that strands the stored effort', () => {
    writeFile({ revision: 1, overrides: { codex_effort: 'minimal' } });
    const store = makeStore();

    const result = store.set({
      expected_revision: 1,
      values: { codex_model: 'sol' }
    });

    expect(result).toMatchObject({ ok: false, key: 'codex_effort' });
  });

  test('drops a stored effort its stored model does not accept on load', () => {
    writeFile({
      revision: 1,
      overrides: { codex_effort: 'minimal', codex_model: 'sol' }
    });
    const store = makeStore();

    const values = store.effective();

    expect(values).toMatchObject({ codex_model: 'sol', codex_effort: null });
  });

  test('builds the launch flags through the catalog model id', () => {
    writeFile({
      revision: 1,
      overrides: { claude_model: 'opus-4.8', claude_effort: 'high' }
    });
    const store = makeStore();

    expect(store.launchFlags('claude')).toEqual([
      '--model',
      'claude-opus-4-8',
      '--effort',
      'high'
    ]);
  });
});

describe('conversation launch flags', () => {
  test('spells the codex flags as the headless codex runner does', () => {
    const flags = conversationLaunchFlags(
      'codex',
      {
        claude_model: null,
        claude_effort: null,
        codex_model: 'sol',
        codex_effort: 'xhigh'
      },
      CATALOG
    );

    expect(flags).toEqual([
      '-m',
      'gpt-6-sol',
      '-c',
      'model_reasoning_effort=xhigh'
    ]);
  });

  test('adds no flag when every value follows the CLI', () => {
    const flags = conversationLaunchFlags('claude', {
      claude_model: null,
      claude_effort: null,
      codex_model: null,
      codex_effort: null
    });

    expect(flags).toEqual([]);
  });

  test('keeps the inherited runtime only for inherit', () => {
    expect(
      freshConversationRuntime({ fresh_runtime: 'inherit' }, 'codex')
    ).toBe('codex');
    expect(freshConversationRuntime({ fresh_runtime: 'claude' }, 'codex')).toBe(
      'claude'
    );
  });
});

describe('agy conversations (UI-ufgo Phase 4)', () => {
  test('saves agy as the fresh runtime with a listed agy model', () => {
    const catalog = agyCatalog(['gemini-4-neon-high']);
    const store = makeStore({ catalog });

    const result = store.set({
      expected_revision: 0,
      values: { fresh_runtime: 'agy', agy_model: 'gemini-4-neon-high' }
    });

    expect(result.ok).toBe(true);
    expect(makeStore({ catalog }).effective()).toMatchObject({
      fresh_runtime: 'agy',
      agy_model: 'gemini-4-neon-high'
    });
  });

  test('lists the agy model ids as the agy_model choices', () => {
    const store = makeStore({
      catalog: agyCatalog(['gemini-4-neon-high', 'gemini-4-carbon-medium'])
    });

    const fields = store.snapshot().fields;

    expect(fields.agy_model).toMatchObject({
      kind: 'model',
      runner: 'agy',
      default: null,
      choices: ['gemini-4-neon-high', 'gemini-4-carbon-medium']
    });
  });

  test('refuses an agy model the agy list does not carry', () => {
    const store = makeStore({ catalog: agyCatalog(['gemini-4-neon-high']) });

    const result = store.set({
      expected_revision: 0,
      values: { agy_model: 'gemini-4-zinc-high' }
    });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_value',
      key: 'agy_model'
    });
  });

  test('keeps a stored agy model while the agy list is still empty', () => {
    writeFile({
      revision: 1,
      overrides: { agy_model: 'gemini-4-neon-xhigh' }
    });
    const store = makeStore({ catalog: agyCatalog([]) });

    store.set({ expected_revision: 1, values: { auto_launch: true } });

    expect(store.launchFlags('agy')).toEqual([
      '--model',
      'gemini-4-neon-xhigh'
    ]);
    const saved = JSON.parse(
      fs.readFileSync(path.join(dir, 'conversation-settings.json'), 'utf8')
    );
    expect(saved.overrides.agy_model).toBe('gemini-4-neon-xhigh');
  });

  test('spells the agy model flag as the headless agy runner does', () => {
    const flags = conversationLaunchFlags(
      'agy',
      {
        claude_model: 'opus',
        claude_effort: 'high',
        codex_model: null,
        codex_effort: null,
        agy_model: 'gemini-4-carbon-high'
      },
      agyCatalog(['gemini-4-carbon-high'])
    );

    expect(flags).toEqual(['--model', 'gemini-4-carbon-high']);
  });

  test('adds no agy flag when the agy model follows the CLI', () => {
    const flags = conversationLaunchFlags('agy', {
      claude_model: null,
      claude_effort: null,
      codex_model: null,
      codex_effort: null,
      agy_model: null
    });

    expect(flags).toEqual([]);
  });

  test('runs a fresh conversation on agy when the setting names agy', () => {
    const runtime = freshConversationRuntime({ fresh_runtime: 'agy' }, 'codex');

    expect(runtime).toBe('agy');
  });

  test('keeps the base launch settings for agy despite codex conflict overrides', () => {
    const base = {
      model: 'gemini-4-neon-high',
      effort: null,
      speed: 'default'
    };
    const values = /** @type {any} */ ({
      conflict_codex_model: 'sol',
      conflict_codex_effort: 'xhigh'
    });

    const result = conflictLaunchSettings(
      'agy',
      base,
      values,
      /** @type {any} */ (agyCatalog(['gemini-4-neon-high']))
    );

    expect(result).toBe(base);
  });
});
