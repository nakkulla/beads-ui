import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import {
  analysisIdentityOf,
  createParallelAnalysisStore
} from './parallel-analysis-store.js';
import {
  parallelAnalysisCachePath,
  parallelAnalysisSettingsPath
} from './state-paths.js';

/** @type {string} */
let tmp_state;
const WS = '/tmp/example-workspace/project-a';

beforeEach(() => {
  tmp_state = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-pastore-'));
  process.env.XDG_STATE_HOME = tmp_state;
});

afterEach(() => {
  delete process.env.XDG_STATE_HOME;
  fs.rmSync(tmp_state, { recursive: true, force: true });
});

describe('parallel-analysis settings (UI-04vo seam G)', () => {
  test('reads unset defaults at revision 0', () => {
    const store = createParallelAnalysisStore();

    const settings = store.readSettings();

    expect(settings).toEqual({
      revision: 0,
      runner: null,
      model: null,
      effort: null
    });
  });

  test('updates settings under CAS and persists them', () => {
    const store = createParallelAnalysisStore();

    const result = store.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });

    expect(result.ok).toBe(true);
    expect(createParallelAnalysisStore().readSettings()).toEqual({
      revision: 1,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });
    expect(fs.existsSync(parallelAnalysisSettingsPath())).toBe(true);
  });

  test('rejects a stale revision without writing', () => {
    const store = createParallelAnalysisStore();
    store.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'opus',
      effort: 'high'
    });

    const result = store.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'sonnet',
      effort: 'high'
    });

    expect(result.ok).toBe(false);
    expect(result.conflict).toBe(true);
    expect(store.readSettings().model).toBe('opus');
  });

  test('stores only selections that pass the catalog+probe validation', () => {
    const store = createParallelAnalysisStore({
      validateSelection: (sel) => sel.model === 'opus'
    });

    const rejected = store.updateSettings({
      expected_revision: 0,
      runner: 'claude',
      model: 'made-up',
      effort: 'high'
    });

    expect(rejected.ok).toBe(false);
    expect(rejected.reason).toBe('selection_invalid');
    expect(store.readSettings().model).toBeNull();
  });
});

describe('parallel-analysis identity + cache (UI-04vo seam G)', () => {
  const IDENTITY_INPUT = {
    snapshot: { digest: 'd'.repeat(64) },
    runner: 'claude',
    model: 'opus',
    effort: 'high'
  };

  test('identity changes with digest, model, and effort', () => {
    const base = analysisIdentityOf(IDENTITY_INPUT);

    expect(base).toHaveLength(64);
    expect(analysisIdentityOf({ ...IDENTITY_INPUT, model: 'sonnet' })).not.toBe(
      base
    );
    expect(analysisIdentityOf({ ...IDENTITY_INPUT, effort: 'low' })).not.toBe(
      base
    );
    expect(
      analysisIdentityOf({
        ...IDENTITY_INPUT,
        snapshot: { digest: 'e'.repeat(64) }
      })
    ).not.toBe(base);
  });

  test('saves and reloads the last-good result per workspace', () => {
    const store = createParallelAnalysisStore();
    const identity = analysisIdentityOf(IDENTITY_INPUT);

    store.saveLastGood(WS, {
      identity,
      result: { schema_version: 2, groups: [] }
    });

    const cache = createParallelAnalysisStore().readCache(WS);
    expect(cache.last_good?.identity).toBe(identity);
    expect(cache.last_good?.result.schema_version).toBe(2);
    expect(fs.existsSync(parallelAnalysisCachePath(WS))).toBe(true);
  });

  test('normalizes an orphaned running marker to idle on load', () => {
    const store = createParallelAnalysisStore();
    store.saveLastGood(WS, { identity: 'x'.repeat(64), result: { ok: 1 } });
    const file = parallelAnalysisCachePath(WS);
    const raw = JSON.parse(fs.readFileSync(file, 'utf8'));
    raw.job = { job_id: 'orphan', started_at: 1 };
    fs.writeFileSync(file, JSON.stringify(raw));

    const cache = createParallelAnalysisStore().readCache(WS);

    expect(cache.job).toBeNull();
    expect(cache.last_good?.identity).toBe('x'.repeat(64));
  });
});

describe('parallel-analysis job lifecycle (UI-04vo seam G)', () => {
  test('runs one single-flight job per workspace and joins a duplicate start', async () => {
    const store = createParallelAnalysisStore();
    /** @type {(v: any) => void} */
    let resolveDone = () => {};
    const start = vi.fn(() => ({
      done: new Promise((res) => {
        resolveDone = res;
      }),
      cancel: vi.fn()
    }));

    const first = store.startJob(WS, { identity: 'i1', start });
    const second = store.startJob(WS, { identity: 'i1', start });

    expect(start).toHaveBeenCalledTimes(1);
    expect(second.joined).toBe(true);
    expect(second.job_id).toBe(first.job_id);

    resolveDone({ ok: true, result: {} });
    await first.done;

    const third = store.startJob(WS, { identity: 'i2', start });
    expect(start).toHaveBeenCalledTimes(2);
    expect(third.joined).toBeUndefined();
  });

  test('refuses a concurrent start for a different identity', () => {
    const store = createParallelAnalysisStore();
    const start = vi.fn(() => ({
      done: new Promise(() => {}),
      cancel: vi.fn()
    }));
    store.startJob(WS, { identity: 'i1', start });

    const other = /** @type {any} */ (
      store.startJob(WS, { identity: 'i2', start })
    );

    expect(other.ok).toBe(false);
    expect(other.reason).toBe('job_active');
    expect(start).toHaveBeenCalledTimes(1);
  });

  test('cancel kills the active job and preserves the last-good cache', async () => {
    const store = createParallelAnalysisStore();
    store.saveLastGood(WS, {
      identity: 'old'.padEnd(64, '0'),
      result: { v: 1 }
    });
    const cancel = vi.fn();
    /** @type {(v: any) => void} */
    let resolveDone = () => {};
    const job = store.startJob(WS, {
      identity: 'i1',
      start: () => ({
        done: new Promise((res) => {
          resolveDone = res;
        }),
        cancel
      })
    });

    const cancelled = store.cancelJob(WS, job.job_id);
    resolveDone({ ok: false, reason: 'cancelled' });
    await job.done;

    expect(cancelled).toBe(true);
    expect(cancel).toHaveBeenCalled();
    expect(store.readCache(WS).last_good?.result).toEqual({ v: 1 });
    expect(store.activeJob(WS)).toBeNull();
  });

  test('a failed run settles the job to idle without touching the cache', async () => {
    const store = createParallelAnalysisStore();
    store.saveLastGood(WS, {
      identity: 'old'.padEnd(64, '0'),
      result: { v: 1 }
    });

    const job = store.startJob(WS, {
      identity: 'i1',
      start: () => ({
        done: Promise.resolve({ ok: false, reason: 'invalid_output' }),
        cancel: vi.fn()
      })
    });
    await job.done;

    expect(store.activeJob(WS)).toBeNull();
    expect(store.readCache(WS).last_good?.result).toEqual({ v: 1 });
  });
});
