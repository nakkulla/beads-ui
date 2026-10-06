import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
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
 * @param {{ config?: boolean, warn?: (message: string) => void }} [over]
 */
function makeStore(over = {}) {
  return createConversationSettingsStore({
    filePath: () => path.join(dir, 'conversation-settings.json'),
    warn: over.warn ?? (() => {}),
    configAutoLaunch: () => over.config === true,
    catalog: () => CATALOG
  });
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
  test('reads config.toml, claude and "따름" without a file', () => {
    const store = makeStore({ config: true });

    const values = store.effective();

    expect(values).toEqual({
      auto_launch: true,
      fresh_runtime: 'claude',
      claude_model: null,
      claude_effort: null,
      codex_model: null,
      codex_effort: null
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
      choices: ['inherit', 'claude', 'codex'],
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
