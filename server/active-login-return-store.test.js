import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createDepartureStore } from './active-login-return-store.js';

/** @type {string} */
let tmp_dir;
/** @type {string} */
let file;
/** @type {string[]} */
let warnings;

const RECORD = {
  default_account: 'a@example.test',
  to_account: 'b@example.test',
  until: '2026-11-07T05:00:00.000Z'
};

/**
 * @param {{ fs?: typeof import('node:fs') }} [options]
 */
function makeStore(options = {}) {
  return createDepartureStore({
    filePath: () => file,
    warn: (message) => warnings.push(message),
    ...(options.fs ? { fs: options.fs } : {})
  });
}

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-departure-store-'));
  file = path.join(tmp_dir, 'bdui', 'active-login-return.json');
  warnings = [];
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

describe('departure record store (UI-32oq §4.2)', () => {
  test('reads no record without a file', () => {
    const store = makeStore();

    const record = store.get('claude');

    expect(record).toBeNull();
    expect(warnings).toEqual([]);
  });

  test('keeps a record across a restart', () => {
    makeStore().set('codex', RECORD);
    const restarted = makeStore();

    const record = restarted.get('codex');

    expect(record).toEqual(RECORD);
  });

  test('ends a record across a restart', () => {
    const store = makeStore();
    store.set('codex', RECORD);
    store.clear('codex');
    const restarted = makeStore();

    const record = restarted.get('codex');

    expect(record).toBeNull();
  });

  test('keeps one runner record when the other ends', () => {
    const store = makeStore();
    store.set('claude', RECORD);
    store.set('codex', RECORD);

    store.clear('codex');

    expect(makeStore().get('claude')).toEqual(RECORD);
  });

  test('reads a corrupt file as no record with one log line', () => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, '{not json');
    const store = makeStore();

    const record = store.get('codex');

    expect(record).toBeNull();
    expect(warnings).toHaveLength(1);
  });

  test('drops a malformed entry and keeps the other runner', () => {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(
      file,
      JSON.stringify({
        runners: {
          claude: { default_account: 'a', to_account: 'b', until: 'soon' },
          codex: RECORD
        }
      })
    );
    const store = makeStore();

    const records = [store.get('claude'), store.get('codex')];

    expect(records).toEqual([null, RECORD]);
  });

  test('keeps a record in memory when the write fails', () => {
    const failing = /** @type {typeof import('node:fs')} */ ({
      ...fs,
      renameSync: () => {
        throw new Error('disk full');
      }
    });
    const store = makeStore({ fs: failing });

    store.set('codex', RECORD);

    expect(store.get('codex')).toEqual(RECORD);
    expect(warnings).toHaveLength(1);
  });

  test('touches no file in memory-only mode', () => {
    const store = createDepartureStore({ filePath: null });

    store.set('codex', RECORD);

    expect(store.get('codex')).toEqual(RECORD);
    expect(fs.existsSync(path.dirname(file))).toBe(false);
  });
});
