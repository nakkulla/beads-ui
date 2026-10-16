import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { createCallLog } from './call-log.js';
import { createPairCache } from './pair-cache.js';
import { CACHE_UNUSED_TTL_MS } from './question.js';

/** @type {string} */
let dir;

beforeEach(() => {
  dir = fs.mkdtempSync(path.join(os.tmpdir(), 'bdui-placement-cache-'));
});

afterEach(() => {
  fs.rmSync(dir, { recursive: true, force: true });
});

const ANSWER = /** @type {const} */ ({
  choice: 'conflict',
  confidence: 0.91,
  judged_at: 5
});

describe('pair cache', () => {
  test('answers again after a restart from the saved file', async () => {
    const file = path.join(dir, 'cache.json');
    const first = createPairCache({ file });
    first.load();
    first.set('UI-1', 'UI-2', 'da', 'db', ANSWER);
    await first.flush();

    const second = createPairCache({ file });
    second.load();

    expect(second.get('UI-1', 'UI-2', 'da', 'db')).toMatchObject(ANSWER);
  });

  test('misses when either material digest differs', () => {
    const cache = createPairCache({ file: path.join(dir, 'cache.json') });
    cache.load();
    cache.set('UI-1', 'UI-2', 'da', 'db', ANSWER);

    const hit = cache.get('UI-1', 'UI-2', 'da', 'db-changed');

    expect(hit).toBeNull();
  });

  test('prunes an entry unused for 30 days on load', async () => {
    const file = path.join(dir, 'cache.json');
    let clock = 1_000;
    const first = createPairCache({ file, now: () => clock });
    first.load();
    first.set('UI-1', 'UI-2', 'da', 'db', ANSWER);
    await first.flush();
    clock += CACHE_UNUSED_TTL_MS + 1;

    const second = createPairCache({ file, now: () => clock });
    second.load();

    expect(second.size()).toBe(0);
  });

  test('writes the cache file with mode 0600', async () => {
    const file = path.join(dir, 'nested', 'cache.json');
    const cache = createPairCache({ file });
    cache.load();
    cache.set('UI-1', 'UI-2', 'da', 'db', ANSWER);

    await cache.flush();

    expect(fs.statSync(file).mode & 0o777).toBe(0o600);
  });
});

describe('call log', () => {
  test('writes only the record fields with mode 0600', async () => {
    const file = path.join(dir, 'calls.jsonl');
    const log = createCallLog({ file });

    await log.append(
      /** @type {any} */ ({
        at: '2026-10-16T00:00:00.000Z',
        workspace: '/ws',
        a: 'UI-1',
        b: 'UI-2',
        digest_a: 'da',
        digest_b: 'db',
        choice: 'independent',
        confidence: 0.9,
        ms: 400,
        reason: null,
        state: 'issue body text',
        key: 'secret'
      })
    );

    const line = JSON.parse(fs.readFileSync(file, 'utf8').trim());
    expect(Object.keys(line)).toEqual([
      'at',
      'workspace',
      'a',
      'b',
      'digest_a',
      'digest_b',
      'choice',
      'confidence',
      'ms',
      'reason'
    ]);
    expect(fs.statSync(file).mode & 0o777).toBe(0o600);
  });
});
