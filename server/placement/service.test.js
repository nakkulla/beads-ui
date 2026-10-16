import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { createJevClient, createJevKeySource } from './jev-client.js';
import { createPairCache } from './pair-cache.js';
import {
  BATCH_DELAY_MS,
  FAILURE_BACKOFF_MS,
  JEV_MODEL,
  KEY_RECHECK_MS,
  PLACEMENT_QUESTION
} from './question.js';
import { createPlacementService, isPlaceableCandidate } from './service.js';

const WS = '/tmp/example-workspace/placement-service';
const KEY = 'fixture-key-not-real';

/** @type {string} */
let dir;

beforeEach(() => {
  vi.useFakeTimers();
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-placement-service-'));
});

afterEach(() => {
  vi.useRealTimers();
  fs.rmSync(dir, { recursive: true, force: true });
});

/**
 * @returns {Record<string, any>}
 */
function validAnswer() {
  return {
    model: JEV_MODEL,
    answers: {
      [PLACEMENT_QUESTION]: {
        choice: 'independent',
        confidence: 0.9,
        probabilities: {
          independent: 0.9,
          a_first: 0.05,
          b_first: 0.03,
          conflict: 0.02
        }
      }
    }
  };
}

/**
 * A fetch fixture answering every call with a valid answer.
 */
function answeringFetch() {
  return vi.fn(async () => ({
    ok: true,
    status: 200,
    json: async () => validAnswer()
  }));
}

/**
 * @param {string} id
 * @param {string} [description]
 */
function row(id, description = `${id} 본문`) {
  return {
    id,
    title: `${id} 제목`,
    issue_type: 'task',
    description,
    metadata: { route: 'quick_fix' },
    updated_at: 1,
    closed_at: null
  };
}

/**
 * @param {Record<string, any>} rows
 */
function rowMap(rows) {
  return new Map(Object.entries(rows));
}

/**
 * @param {{ fetch?: any, keys?: any, file?: string }} [options]
 */
function serviceWith(options = {}) {
  const pairCache = createPairCache({
    file: options.file || path.join(dir, 'cache.json')
  });
  pairCache.load();
  const callLog = { append: vi.fn(async () => {}) };
  const keys =
    options.keys ||
    createJevKeySource({
      env: { TYPESAFE_API_KEY: KEY },
      resolveDotfilesRoot: async () => null
    });
  const fetch = options.fetch || answeringFetch();
  const service = createPlacementService({
    client: createJevClient({ fetch, keys }),
    pairCache,
    specSections: /** @type {any} */ ({
      peek: () => ({ state: 'miss' }),
      fill: async () => {},
      onFilled: () => () => {}
    }),
    callLog: /** @type {any} */ (callLog)
  });
  return { service, fetch, pairCache, callLog };
}

/**
 * @param {string[]} candidates
 * @param {string[]} members
 * @param {Map<string, any>} rows
 * @param {Partial<import('./service.js').ProjectInput>} [overrides]
 * @returns {import('./service.js').ProjectInput}
 */
function input(candidates, members, rows, overrides = {}) {
  return {
    candidates,
    members,
    blocked_by: {},
    scopes: {},
    lane_edges: [],
    rows,
    ...overrides
  };
}

const OBSERVE = { observe: true };

describe('placement schedule', () => {
  test('gathers changes for 3 seconds before one computation', async () => {
    const { service, fetch } = serviceWith();
    const rows = rowMap({
      'UI-1': row('UI-1'),
      'UI-2': row('UI-2'),
      'UI-3': row('UI-3')
    });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS - 1);
    service.project(WS, input(['UI-1'], ['UI-2', 'UI-3'], rows), OBSERVE);

    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS - 1);
    const before = fetch.mock.calls.length;
    await vi.advanceTimersByTimeAsync(1);
    await service.idle();

    expect(before).toBe(0);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('runs at most two calls at once', async () => {
    /** @type {Array<() => void>} */
    const release = [];
    const fetch = vi.fn(
      () =>
        new Promise((resolve) => {
          release.push(() =>
            resolve({ ok: true, status: 200, json: async () => validAnswer() })
          );
        })
    );
    const { service } = serviceWith({ fetch });
    const rows = rowMap({
      'UI-1': row('UI-1'),
      'UI-2': row('UI-2'),
      'UI-3': row('UI-3'),
      'UI-4': row('UI-4')
    });
    service.project(
      WS,
      input(['UI-1'], ['UI-2', 'UI-3', 'UI-4'], rows),
      OBSERVE
    );
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    const at_first = fetch.mock.calls.length;

    release[0]();
    await vi.advanceTimersByTimeAsync(0);

    expect(at_first).toBe(2);
    expect(fetch).toHaveBeenCalledTimes(3);
  });

  test('never asks about a pair a fixed condition decides', async () => {
    const { service, fetch } = serviceWith();
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    service.project(
      WS,
      input(['UI-1'], ['UI-2'], rows, { blocked_by: { 'UI-1': ['UI-2'] } }),
      OBSERVE
    );

    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);

    expect(fetch).not.toHaveBeenCalled();
  });

  test('holds a pair whose material is missing as pending without a call', async () => {
    const { service, fetch } = serviceWith();
    const rows = rowMap({ 'UI-1': row('UI-1') });
    const wire = service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);

    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);

    expect(wire.placement_status['UI-1']).toMatchObject({
      state: 'pending',
      reason: 'material_missing'
    });
    expect(fetch).not.toHaveBeenCalled();
  });

  test('asks again only about the pair whose material changed', async () => {
    const { service, fetch } = serviceWith();
    const rows = {
      'UI-1': row('UI-1'),
      'UI-2': row('UI-2'),
      'UI-3': row('UI-3')
    };
    service.project(
      WS,
      input(['UI-1'], ['UI-2', 'UI-3'], rowMap(rows)),
      OBSERVE
    );
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    await service.idle();
    fetch.mockClear();

    service.project(
      WS,
      input(
        ['UI-1'],
        ['UI-2', 'UI-3'],
        rowMap({ ...rows, 'UI-3': row('UI-3', '새 본문') })
      ),
      OBSERVE
    );
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    await service.idle();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(String(/** @type {any} */ (fetch.mock.calls[0])[1].body)).toContain(
      'UI-3'
    );
  });

  test('asks nothing when the queue changes but the material does not', async () => {
    const { service, fetch } = serviceWith();
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    await service.idle();
    fetch.mockClear();

    service.project(WS, input(['UI-1', 'UI-2'], [], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);

    expect(fetch).not.toHaveBeenCalled();
  });

  test('waits 10 minutes before asking a failed pair again', async () => {
    const fetch = vi.fn(async () => ({
      ok: false,
      status: 502,
      json: async () => ({})
    }));
    const { service } = serviceWith({ fetch });
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    await service.idle();

    await vi.advanceTimersByTimeAsync(FAILURE_BACKOFF_MS - 1);
    const within = fetch.mock.calls.length;
    await vi.advanceTimersByTimeAsync(1);
    await service.idle();

    expect(within).toBe(1);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  test('reports a failed pair as unavailable with its reason', async () => {
    const fetch = vi.fn(async () => ({
      ok: false,
      status: 503,
      json: async () => ({})
    }));
    const { service } = serviceWith({ fetch });
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    await service.idle();

    const wire = service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);

    expect(wire.placement_status['UI-1']).toMatchObject({
      state: 'unavailable',
      reason: 'http_503'
    });
  });

  test('reuses the saved answers after a restart', async () => {
    const file = path.join(dir, 'restart.json');
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    const first = serviceWith({ file });
    first.service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    await first.service.idle();
    await first.pairCache.flush();

    const second = serviceWith({ file });
    const wire = second.service.project(
      WS,
      input(['UI-1'], ['UI-2'], rows),
      OBSERVE
    );
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);

    expect(wire.placement_status['UI-1']).toEqual({
      state: 'ready',
      done: 1,
      total: 1
    });
    expect(second.fetch).not.toHaveBeenCalled();
  });

  test('re-judges the current candidates at once on 다시 판정', async () => {
    const { service, fetch } = serviceWith();
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    await service.idle();
    fetch.mockClear();

    const outcome = await service.rejudge(WS);
    await service.idle();

    expect(outcome).toEqual({ cleared: 1 });
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('announces the workspace once its calls are answered', async () => {
    /** @type {Array<() => void>} */
    const release = [];
    const fetch = vi.fn(
      () =>
        new Promise((resolve) => {
          release.push(() =>
            resolve({ ok: true, status: 200, json: async () => validAnswer() })
          );
        })
    );
    const { service } = serviceWith({ fetch });
    const listener = vi.fn();
    service.onFilled(listener);
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    listener.mockClear();

    release[0]();
    await service.idle();

    expect(listener).toHaveBeenCalledWith(WS);
  });

  test('schedules nothing for a projection that does not observe', async () => {
    const { service, fetch } = serviceWith();
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), { observe: false });

    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);

    expect(fetch).not.toHaveBeenCalled();
  });
});

describe('missing jev key', () => {
  /**
   * @param {ReturnType<typeof vi.fn>} runSecretsGet
   */
  function missingKeys(runSecretsGet) {
    return createJevKeySource({
      env: {},
      resolveDotfilesRoot: async () => '/dotfiles',
      runSecretsGet: /** @type {any} */ (runSecretsGet)
    });
  }

  test('looks the key up once per 10 minutes and queues nothing meanwhile', async () => {
    const runSecretsGet = vi.fn(async () => ({ code: 1, stdout: '' }));
    const { service, fetch } = serviceWith({
      keys: missingKeys(runSecretsGet)
    });
    const rows = rowMap({
      'UI-1': row('UI-1'),
      'UI-2': row('UI-2'),
      'UI-3': row('UI-3')
    });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    service.project(WS, input(['UI-1'], ['UI-2', 'UI-3'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);
    const within = runSecretsGet.mock.calls.length;

    await vi.advanceTimersByTimeAsync(KEY_RECHECK_MS);

    expect(within).toBe(1);
    expect(runSecretsGet).toHaveBeenCalledTimes(2);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('reports the candidate as unavailable with key_missing', async () => {
    const runSecretsGet = vi.fn(async () => ({ code: 1, stdout: '' }));
    const { service } = serviceWith({ keys: missingKeys(runSecretsGet) });
    const rows = rowMap({ 'UI-1': row('UI-1'), 'UI-2': row('UI-2') });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);

    const wire = service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);

    expect(wire.placement_status['UI-1']).toMatchObject({
      state: 'unavailable',
      reason: 'key_missing'
    });
  });
});

describe('call record', () => {
  test('carries neither the key nor the issue text', async () => {
    const { service, callLog } = serviceWith();
    const rows = rowMap({
      'UI-1': row('UI-1', '비밀스러운 본문 하나'),
      'UI-2': row('UI-2', '비밀스러운 본문 둘')
    });
    service.project(WS, input(['UI-1'], ['UI-2'], rows), OBSERVE);
    await vi.advanceTimersByTimeAsync(BATCH_DELAY_MS);

    await service.idle();

    const written = JSON.stringify(callLog.append.mock.calls);
    expect(callLog.append).toHaveBeenCalledOnce();
    expect(written).not.toContain(KEY);
    expect(written).not.toContain('비밀스러운');
  });
});

describe('placeable candidate', () => {
  test('requires a description for a quick_fix row', () => {
    const facts = {
      route: 'quick_fix',
      spec_state: 'none',
      has_description: false,
      awaiting_user: false,
      worker_ineligible: false
    };

    const placeable = isPlaceableCandidate(facts);

    expect(placeable).toBe(false);
  });

  test('requires a published spec for a spec_backed row', () => {
    const facts = {
      route: 'spec_backed',
      spec_state: 'published',
      has_description: true,
      awaiting_user: false,
      worker_ineligible: false
    };

    const placeable = isPlaceableCandidate(facts);

    expect(placeable).toBe(true);
  });
});
