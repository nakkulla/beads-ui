import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  AGY_DEFAULT_MODEL,
  AGY_DEFAULT_VISIBLE_MODELS,
  AGY_QUOTA_CACHE_MS,
  AGY_QUOTA_TIMEOUT_MS,
  agyFamilyEffort,
  agyModelId,
  createAgyModelList,
  judgeAgyQuota,
  parseAgyModels
} from './agy-model-list.js';

const MODELS_TEXT = fs.readFileSync(
  fileURLToPath(new URL('./__fixtures__/agy-models.txt', import.meta.url)),
  'utf8'
);
const USAGE_TEXT = fs.readFileSync(
  fileURLToPath(new URL('./__fixtures__/agy-usage.json', import.meta.url)),
  'utf8'
);

/** @type {string} */
let tmp_dir;
/** @type {string} */
let state_file;
/** @type {string[]} */
let credentials;

beforeEach(() => {
  tmp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'agy-model-list-'));
  state_file = path.join(tmp_dir, 'state', 'agy-models.json');
  credentials = [
    path.join(tmp_dir, 'oauth-token'),
    path.join(tmp_dir, 'credential-user-scope')
  ];
  fs.writeFileSync(credentials[0], 'token-a');
  fs.writeFileSync(credentials[1], 'scope-a');
});

afterEach(() => {
  fs.rmSync(tmp_dir, { recursive: true, force: true });
});

/**
 * Move a credential file's fingerprint (mtime and size).
 *
 * @param {number} index
 * @param {string} content
 */
function moveCredential(index, content) {
  fs.writeFileSync(credentials[index], content);
  const at = new Date(Date.now() + 60_000 * (index + 1) + content.length);
  fs.utimesSync(credentials[index], at, at);
}

/**
 * @returns {{ promise: Promise<{ stdout: string }>, resolve: (value: { stdout: string }) => void, reject: (err: Error) => void }}
 */
function deferred() {
  /** @type {(value: { stdout: string }) => void} */
  let resolve = () => {};
  /** @type {(err: Error) => void} */
  let reject = () => {};
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    promise: /** @type {Promise<{ stdout: string }>} */ (promise),
    resolve,
    reject
  };
}

/**
 * @param {Partial<Parameters<typeof createAgyModelList>[0]>} [overrides]
 */
function makeList(overrides = {}) {
  return createAgyModelList({
    filePath: () => state_file,
    credentialPaths: () => credentials,
    command: () => '/home/test/.local/bin/agy',
    env: () => ({ AGY_SILENT: '1' }),
    warn: () => {},
    setInterval: () => ({ unref() {} }),
    clearInterval: () => {},
    ...overrides
  });
}

/**
 * @param {string} stdout
 */
function execReturning(stdout) {
  return vi.fn(async () => ({ stdout }));
}

describe('worker/agy-model-list parsing', () => {
  test('parses every id of the agy models output in order', () => {
    const models = parseAgyModels(MODELS_TEXT);

    expect(models).toHaveLength(27);
    expect(models[0]).toEqual({
      id: 'gemini-4-neon-high',
      name: 'Gemini 4 Neon (High)'
    });
    expect(models.map((m) => m.id)).toContain('claude-opus-5-5-high');
  });

  test('skips blank, malformed and repeated lines', () => {
    const models = parseAgyModels(
      'gemini-4-neon-high\tA\n\nNot An Id\tB\ngemini-4-neon-high\tC\n'
    );

    expect(models).toEqual([{ id: 'gemini-4-neon-high', name: 'A' }]);
  });

  test('keeps the default visible set inside the measured list', () => {
    const ids = parseAgyModels(MODELS_TEXT).map((m) => m.id);

    expect(AGY_DEFAULT_VISIBLE_MODELS).toEqual([
      'gemini-4-neon-high',
      'gemini-4-neon-xhigh',
      'gemini-4-carbon-high',
      'gemini-4-carbon-medium',
      'gemini-4-hydrogen-medium'
    ]);
    expect(AGY_DEFAULT_MODEL).toBe('gemini-4-neon-high');
    for (const id of AGY_DEFAULT_VISIBLE_MODELS) {
      expect(ids).toContain(id);
    }
  });
});

describe('worker/agy-model-list workflow model conversion', () => {
  test('joins a family and an effort into an agy id', () => {
    expect(agyModelId('carbon', 'medium')).toBe('gemini-4-carbon-medium');
  });

  test('splits an agy id into its family and effort', () => {
    expect(agyFamilyEffort('gemini-4-hydrogen-xhigh')).toEqual({
      family: 'hydrogen',
      effort: 'xhigh'
    });
  });

  test('round-trips every family and effort', () => {
    for (const family of ['neon', 'carbon', 'argon', 'hydrogen']) {
      for (const effort of ['low', 'medium', 'high', 'xhigh']) {
        const id = agyModelId(family, effort);

        expect(agyFamilyEffort(id)).toEqual({ family, effort });
      }
    }
  });

  test.each([
    'gemini-pro-orchestrator-neon',
    'gemini-3.8-flash-high',
    'claude-opus-5-5-high',
    'gemini-4-krypton-high',
    'gemini-4-neon-max',
    42
  ])('refuses to split %s', (id) => {
    expect(agyFamilyEffort(id)).toBeNull();
  });

  test('refuses to join a family outside the four', () => {
    expect(agyModelId('flash', 'high')).toBeNull();
    expect(agyModelId('neon', 'max')).toBeNull();
  });
});

describe('worker/agy-model-list reads and storage', () => {
  test('refuses agy runs before any list is read', () => {
    const list = makeList();

    expect(list.ready()).toBe(false);
    expect(list.names()).toEqual([]);
    expect(list.status()).toEqual({ source: 'none', read_at: null });
  });

  test('reads the list through the launcher', async () => {
    const execFile = execReturning(MODELS_TEXT);
    const list = makeList({ execFile, now: () => 1000 });

    const landed = await list.refresh();

    expect(landed).toBe(true);
    expect(list.ready()).toBe(true);
    expect(list.names()).toHaveLength(27);
    expect(execFile).toHaveBeenCalledWith(
      '/home/test/.local/bin/agy',
      ['models'],
      expect.objectContaining({ env: { AGY_SILENT: '1' } })
    );
    expect(list.status()).toEqual({ source: 'list', read_at: 1000 });
  });

  test('persists the list with the credential fingerprint', async () => {
    const list = makeList({ execFile: execReturning(MODELS_TEXT) });

    await list.refresh();

    const stored = JSON.parse(fs.readFileSync(state_file, 'utf8'));
    expect(stored.models).toHaveLength(27);
    expect(typeof stored.fingerprint).toBe('string');
    expect(stored.fingerprint).not.toContain('token-a');
  });

  test('keeps the last list when a later read fails', async () => {
    const execFile = vi
      .fn()
      .mockResolvedValueOnce({ stdout: MODELS_TEXT })
      .mockRejectedValueOnce(new Error('agy down'));
    const list = makeList({ execFile });
    await list.refresh();

    const landed = await list.refresh();

    expect(landed).toBe(false);
    expect(list.ready()).toBe(true);
    expect(list.names()).toHaveLength(27);
  });

  test('stays not ready when the first read fails', async () => {
    const list = makeList({
      execFile: vi.fn(async () => {
        throw new Error('agy down');
      })
    });

    await list.refresh();

    expect(list.ready()).toBe(false);
    expect(list.names()).toEqual([]);
  });

  test('treats an empty output as a failed read', async () => {
    const list = makeList({ execFile: execReturning('\n') });

    const landed = await list.refresh();

    expect(landed).toBe(false);
    expect(list.ready()).toBe(false);
  });

  test('adopts the stored list under the same credentials', async () => {
    await makeList({ execFile: execReturning(MODELS_TEXT) }).refresh();
    const list = makeList();

    const adopted = list.loadPersisted();

    expect(adopted).toBe(true);
    expect(list.names()).toHaveLength(27);
  });

  test('ignores the stored list after the credentials moved', async () => {
    await makeList({ execFile: execReturning(MODELS_TEXT) }).refresh();
    moveCredential(0, 'token-b');
    const list = makeList();

    const adopted = list.loadPersisted();

    expect(adopted).toBe(false);
    expect(list.ready()).toBe(false);
  });

  test('never reads the credential file contents', async () => {
    /** @type {string[]} */
    const read = [];
    const watched_fs = {
      ...fs,
      /** @type {typeof fs.readFileSync} */
      readFileSync: /** @type {any} */ (
        /**
         * @param {any} file
         * @param {any} [opts]
         */
        (file, opts) => {
          read.push(String(file));
          return fs.readFileSync(file, opts);
        }
      )
    };
    const list = makeList({
      fs: /** @type {any} */ (watched_fs),
      execFile: execReturning(MODELS_TEXT)
    });

    await list.refresh();
    list.loadPersisted();
    moveCredential(1, 'scope-b');
    list.checkCredentials();

    expect(read.some((file) => credentials.includes(file))).toBe(false);
  });

  test('refreshes on an unref timer', () => {
    const unref = vi.fn();
    const arm = vi.fn(() => ({ unref }));
    const list = makeList({
      execFile: execReturning(MODELS_TEXT),
      setInterval: arm
    });

    list.start();
    list.start();

    expect(arm).toHaveBeenCalledTimes(1);
    expect(arm).toHaveBeenCalledWith(expect.any(Function), 60 * 60 * 1000);
    expect(unref).toHaveBeenCalledTimes(1);
  });
});

describe('worker/agy-model-list credential fingerprint', () => {
  test('drops the list when the credentials move', async () => {
    const pending = deferred();
    const execFile = vi
      .fn()
      .mockResolvedValueOnce({ stdout: MODELS_TEXT })
      .mockReturnValueOnce(pending.promise);
    const list = makeList({ execFile });
    await list.refresh();
    const before = list.revision();
    moveCredential(0, 'token-b');

    const moved = list.checkCredentials();

    expect(moved).toBe(true);
    expect(list.ready()).toBe(false);
    expect(list.names()).toEqual([]);
    expect(list.revision()).toBeGreaterThan(before);
    expect(fs.existsSync(state_file)).toBe(false);
  });

  test('refuses runs until the new list arrives', async () => {
    const pending = deferred();
    const execFile = vi
      .fn()
      .mockResolvedValueOnce({ stdout: MODELS_TEXT })
      .mockReturnValueOnce(pending.promise);
    const list = makeList({ execFile });
    await list.refresh();
    moveCredential(0, 'token-b');
    list.checkCredentials();
    const reading = list.refresh();

    expect(list.ready()).toBe(false);
    pending.resolve({ stdout: MODELS_TEXT });
    await reading;

    expect(list.ready()).toBe(true);
  });

  test('discards a late answer started under the old fingerprint', async () => {
    const late = deferred();
    const fresh = deferred();
    const execFile = vi
      .fn()
      .mockReturnValueOnce(late.promise)
      .mockReturnValueOnce(fresh.promise);
    const list = makeList({ execFile });
    const reading = list.refresh();
    moveCredential(1, 'scope-b');
    list.checkCredentials();

    late.resolve({ stdout: MODELS_TEXT });
    await Promise.resolve();
    await Promise.resolve();

    expect(list.ready()).toBe(false);
    fresh.resolve({ stdout: 'gemini-4-neon-high\tGemini 4 Neon (High)\n' });
    await reading;
    expect(list.names()).toEqual(['gemini-4-neon-high']);
  });

  test('reads once more when a token refresh moves the fingerprint mid-read', async () => {
    let calls = 0;
    const execFile = vi.fn(async () => {
      calls++;
      if (calls === 1) {
        moveCredential(0, 'token-refreshed');
      }
      return { stdout: MODELS_TEXT };
    });
    const list = makeList({ execFile });

    const landed = await list.refresh();

    expect(landed).toBe(true);
    expect(execFile).toHaveBeenCalledTimes(2);
    expect(list.ready()).toBe(true);
  });

  test('drops the quota cache when the list is invalidated', async () => {
    const execFile = vi.fn(async (_file, args) => ({
      stdout: args[0] === 'models' ? MODELS_TEXT : USAGE_TEXT
    }));
    const list = makeList({ execFile, now: () => 0 });
    await list.refresh();
    await list.quota();

    list.invalidate();
    await list.quota();

    expect(
      execFile.mock.calls.filter((call) => call[1][1] === '/usage')
    ).toHaveLength(2);
  });

  test('keeps the list while the credentials stay put', async () => {
    const list = makeList({ execFile: execReturning(MODELS_TEXT) });
    await list.refresh();

    const moved = list.checkCredentials();

    expect(moved).toBe(false);
    expect(list.ready()).toBe(true);
  });
});

describe('worker/agy-model-list pre-run quota', () => {
  test('reads /usage through the launcher with a 10 second bound', async () => {
    const execFile = execReturning(USAGE_TEXT);
    const list = makeList({ execFile });

    const quota = await list.quota();

    expect(quota).toEqual({ state: 'ok' });
    expect(execFile).toHaveBeenCalledWith(
      '/home/test/.local/bin/agy',
      ['-p', '/usage', '--output-format', 'json'],
      expect.objectContaining({ timeout: AGY_QUOTA_TIMEOUT_MS })
    );
    expect(AGY_QUOTA_TIMEOUT_MS).toBe(10_000);
  });

  test('reuses one answer for 180 seconds', async () => {
    let clock = 0;
    const execFile = execReturning(USAGE_TEXT);
    const list = makeList({ execFile, now: () => clock });
    await list.quota();

    clock = AGY_QUOTA_CACHE_MS - 1;
    await list.quota();
    clock = AGY_QUOTA_CACHE_MS;
    await list.quota();

    expect(AGY_QUOTA_CACHE_MS).toBe(180_000);
    expect(execFile).toHaveBeenCalledTimes(2);
  });

  test('rereads a cached exhausted answer once its reset time passed', async () => {
    const payload = JSON.parse(USAGE_TEXT);
    payload.command.data.groups[0].buckets[1].remaining_fraction = 0;
    payload.command.data.groups[0].buckets[1].reset_time =
      '1970-01-01T00:00:10Z';
    const execFile = vi
      .fn()
      .mockResolvedValueOnce({ stdout: JSON.stringify(payload) })
      .mockResolvedValueOnce({ stdout: USAGE_TEXT });
    let clock = 0;
    const list = makeList({ execFile, now: () => clock });
    const first = await list.quota();

    clock = 10_000;
    const second = await list.quota();

    expect(first.state).toBe('exhausted');
    expect(second).toEqual({ state: 'ok' });
    expect(execFile).toHaveBeenCalledTimes(2);
  });

  test('reads unknown on a failed read and caches nothing', async () => {
    const execFile = vi
      .fn()
      .mockRejectedValueOnce(new Error('timed out'))
      .mockResolvedValueOnce({ stdout: USAGE_TEXT });
    const list = makeList({ execFile, now: () => 0 });

    const first = await list.quota();
    const second = await list.quota();

    expect(first.state).toBe('unknown');
    expect(second).toEqual({ state: 'ok' });
  });

  test('judges an exhausted Gemini bucket until its reset time', () => {
    const payload = JSON.parse(USAGE_TEXT);
    payload.command.data.groups[0].buckets[1].remaining_fraction = 0;

    const quota = judgeAgyQuota(payload);

    expect(quota).toEqual({
      state: 'exhausted',
      resets_at: Date.parse('2026-11-27T16:52:46Z'),
      buckets: ['gemini-5h']
    });
  });

  test('holds until the latest reset of two exhausted buckets', () => {
    const payload = JSON.parse(USAGE_TEXT);
    for (const bucket of payload.command.data.groups[0].buckets) {
      bucket.remaining_fraction = 0;
    }

    const quota = judgeAgyQuota(payload);

    expect(quota).toMatchObject({
      state: 'exhausted',
      resets_at: Date.parse('2026-12-03T09:42:22Z')
    });
  });

  test('ignores an exhausted bucket outside the Gemini group', () => {
    const payload = JSON.parse(USAGE_TEXT);
    payload.command.data.groups[1].buckets[0].remaining_fraction = 0;

    const quota = judgeAgyQuota(payload);

    expect(quota).toEqual({ state: 'ok' });
  });

  test('reads unknown when the payload has no groups', () => {
    const quota = judgeAgyQuota({ status: 'SUCCESS' });

    expect(quota.state).toBe('unknown');
  });

  test('discards a quota answer started under the old fingerprint', async () => {
    const late = deferred();
    const execFile = vi
      .fn()
      .mockReturnValueOnce(late.promise)
      .mockResolvedValue({ stdout: USAGE_TEXT });
    const list = makeList({ execFile, now: () => 0 });
    list.checkCredentials();
    const reading = list.quota();
    moveCredential(0, 'token-b');
    list.checkCredentials();
    const exhausted = JSON.parse(USAGE_TEXT);
    exhausted.command.data.groups[0].buckets[0].remaining_fraction = 0;

    late.resolve({ stdout: JSON.stringify(exhausted) });
    const answer = await reading;
    const next = await list.quota();

    expect(answer).toEqual({ state: 'unknown', reason: 'credentials_changed' });
    expect(next).toEqual({ state: 'ok' });
  });
});
