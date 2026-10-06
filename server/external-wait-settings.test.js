import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import {
  EXTERNAL_WAIT_SETTINGS_FIELDS,
  createExternalWaitSettingsStore
} from './external-wait-settings.js';

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;
/** @type {string[]} */
let warnings;

/**
 * @returns {ReturnType<typeof createExternalWaitSettingsStore>}
 */
function makeStore() {
  return createExternalWaitSettingsStore({
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

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-ext-wait-settings-'));
  file = path.join(tmp_dir, 'external-wait-settings.json');
  warnings = [];
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('external-wait settings reads (UI-qbgj §3.6)', () => {
  test('defines the takeover ratio as an integer percent from 10 to 100', () => {
    const field = EXTERNAL_WAIT_SETTINGS_FIELDS.takeover_ratio_percent;

    expect(field).toEqual({ default: 80, min: 10, max: 100, unit: 'percent' });
  });

  test('reads the default when the file is absent', () => {
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot).toMatchObject({
      revision: 0,
      values: { takeover_ratio_percent: 80 },
      overrides: {}
    });
    expect(warnings).toEqual([]);
  });

  test('falls back to the default from a corrupt file', () => {
    writeFile('{not json');
    const store = makeStore();

    const values = store.effective();

    expect(values.takeover_ratio_percent).toBe(80);
    expect(warnings).toHaveLength(1);
  });

  test('drops an out-of-range stored value alone', () => {
    writeFile({ revision: 4, overrides: { takeover_ratio_percent: 5 } });
    const store = makeStore();

    const snapshot = store.snapshot();

    expect(snapshot.revision).toBe(4);
    expect(snapshot.values.takeover_ratio_percent).toBe(80);
    expect(warnings[0]).toContain('takeover_ratio_percent');
  });

  test('reads a valid stored override', () => {
    writeFile({ revision: 2, overrides: { takeover_ratio_percent: 60 } });
    const store = makeStore();

    const values = store.effective();

    expect(values.takeover_ratio_percent).toBe(60);
  });
});

describe('external-wait settings writes (UI-qbgj §3.6)', () => {
  test('persists a valid value and bumps the revision', () => {
    const store = makeStore();

    const result = store.set({
      expected_revision: 0,
      values: { takeover_ratio_percent: 50 }
    });

    expect(result.ok).toBe(true);
    expect(JSON.parse(fs.readFileSync(file, 'utf8'))).toEqual({
      revision: 1,
      overrides: { takeover_ratio_percent: 50 }
    });
  });

  test.each([[9], [101], [50.5], ['80']])(
    'refuses %s and writes nothing',
    (value) => {
      const store = makeStore();

      const result = store.set({
        expected_revision: 0,
        values: { takeover_ratio_percent: value }
      });

      expect(result).toMatchObject({
        ok: false,
        code: 'invalid_value',
        key: 'takeover_ratio_percent'
      });
      expect(fs.existsSync(file)).toBe(false);
    }
  );

  test('refuses an unknown key', () => {
    const store = makeStore();

    const result = store.set({ expected_revision: 0, values: { other: 50 } });

    expect(result).toMatchObject({
      ok: false,
      code: 'invalid_value',
      key: 'other'
    });
  });

  test('refuses a stale revision as a conflict', () => {
    const store = makeStore();
    store.set({ expected_revision: 0, values: { takeover_ratio_percent: 50 } });

    const result = store.set({
      expected_revision: 0,
      values: { takeover_ratio_percent: 70 }
    });

    expect(result).toMatchObject({ ok: false, code: 'conflict' });
    expect(store.effective().takeover_ratio_percent).toBe(50);
  });

  test('clears an override with null', () => {
    const store = makeStore();
    store.set({ expected_revision: 0, values: { takeover_ratio_percent: 50 } });

    const result = store.set({
      expected_revision: 1,
      values: { takeover_ratio_percent: null }
    });

    expect(result.ok && result.snapshot.overrides).toEqual({});
    expect(store.effective().takeover_ratio_percent).toBe(80);
  });
});
