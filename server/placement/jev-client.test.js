import { describe, expect, test, vi } from 'vitest';
import {
  createJevClient,
  createJevKeySource,
  validateJevResponse
} from './jev-client.js';
import {
  JEV_ENDPOINT,
  JEV_MODEL,
  KEY_RECHECK_MS,
  PLACEMENT_QUESTION,
  PLACEMENT_QUESTIONS
} from './question.js';

const KEY = 'fixture-key-not-real';

/**
 * A well-formed jev answer for the placement question.
 *
 * @param {Record<string, unknown>} [overrides]
 * @returns {Record<string, any>}
 */
function answer(overrides = {}) {
  return {
    model: JEV_MODEL,
    answers: {
      [PLACEMENT_QUESTION]: {
        choice: 'a_first',
        confidence: 0.86,
        probabilities: {
          independent: 0.08,
          a_first: 0.86,
          b_first: 0.04,
          conflict: 0.02
        },
        ...overrides
      }
    }
  };
}

/**
 * A fetch fixture answering `body` with `status`.
 *
 * @param {unknown} body
 * @param {number} [status]
 */
function fixtureFetch(body, status = 200) {
  return vi.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body
  }));
}

/**
 * A key source that always has the fixture key.
 */
function envKeys() {
  return createJevKeySource({
    env: { TYPESAFE_API_KEY: KEY },
    resolveDotfilesRoot: async () => null
  });
}

describe('jev request', () => {
  test('posts the model, the text state and the one placement question', async () => {
    const fetch = fixtureFetch(answer());
    const client = createJevClient({ fetch, keys: envKeys() });

    await client.judge('A (UI-1):\n{}\n\nB (UI-2):\n{}');

    const [url, init] = /** @type {any} */ (fetch.mock.calls[0]);
    expect(url).toBe(JEV_ENDPOINT);
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body)).toEqual({
      model: JEV_MODEL,
      state: 'A (UI-1):\n{}\n\nB (UI-2):\n{}',
      questions: JSON.parse(JSON.stringify(PLACEMENT_QUESTIONS))
    });
  });

  test('sends the key as a bearer token with its own user agent', async () => {
    const fetch = fixtureFetch(answer());
    const client = createJevClient({ fetch, keys: envKeys() });

    await client.judge('state');

    const init = /** @type {any} */ (fetch.mock.calls[0])[1];
    expect(init.headers.Authorization).toBe(`Bearer ${KEY}`);
    expect(init.headers['Content-Type']).toBe('application/json');
    expect(init.headers['User-Agent']).toMatch(/^beads-ui-placement\//);
  });

  test('defines the four choices in id order', () => {
    const question = PLACEMENT_QUESTIONS[PLACEMENT_QUESTION];

    const choices = Object.keys(question.criteria);

    expect(question.type).toBe('choice');
    expect(choices).toEqual(['independent', 'a_first', 'b_first', 'conflict']);
  });

  test('returns the choice, confidence and probabilities of a valid answer', async () => {
    const client = createJevClient({
      fetch: fixtureFetch(answer()),
      keys: envKeys()
    });

    const result = await client.judge('state');

    expect(result).toEqual({
      ok: true,
      choice: 'a_first',
      confidence: 0.86,
      probabilities: {
        independent: 0.08,
        a_first: 0.86,
        b_first: 0.04,
        conflict: 0.02
      }
    });
  });

  test('reports an HTTP error by status', async () => {
    const client = createJevClient({
      fetch: fixtureFetch({}, 502),
      keys: envKeys()
    });

    const result = await client.judge('state');

    expect(result).toEqual({ ok: false, reason: 'http_502' });
  });

  test('reports a timed-out request as timeout', async () => {
    const fetch = vi.fn(async () => {
      const err = new Error('timed out');
      err.name = 'TimeoutError';
      throw err;
    });
    const client = createJevClient({ fetch, keys: envKeys() });

    const result = await client.judge('state');

    expect(result).toEqual({ ok: false, reason: 'timeout' });
  });
});

describe('jev response checks', () => {
  test('rejects another model', () => {
    const raw = { ...answer(), model: 'jev-0.0.1' };

    const result = validateJevResponse(raw);

    expect(result).toEqual({ ok: false, reason: 'schema_mismatch' });
  });

  test('rejects a choice outside the four', () => {
    const raw = answer({ choice: 'maybe' });

    const result = validateJevResponse(raw);

    expect(result).toEqual({ ok: false, reason: 'schema_mismatch' });
  });

  test('rejects probabilities that do not sum to one', () => {
    const raw = answer({
      probabilities: {
        independent: 0.1,
        a_first: 0.86,
        b_first: 0.04,
        conflict: 0.02
      }
    });

    const result = validateJevResponse(raw);

    expect(result).toEqual({ ok: false, reason: 'schema_mismatch' });
  });

  test('rejects a choice that is not the most probable', () => {
    const raw = answer({ choice: 'independent' });

    const result = validateJevResponse(raw);

    expect(result).toEqual({ ok: false, reason: 'schema_mismatch' });
  });

  test('accepts probabilities within the 0.001 tolerance', () => {
    const raw = answer({
      probabilities: {
        independent: 0.08,
        a_first: 0.8605,
        b_first: 0.04,
        conflict: 0.02
      }
    });

    const result = validateJevResponse(raw);

    expect(result.ok).toBe(true);
  });
});

describe('jev key lookup', () => {
  test('uses TYPESAFE_API_KEY without running secrets-get', async () => {
    const runSecretsGet = vi.fn(async () => ({ code: 0, stdout: 'other\n' }));
    const keys = createJevKeySource({
      env: { TYPESAFE_API_KEY: KEY },
      resolveDotfilesRoot: async () => '/dotfiles',
      runSecretsGet
    });

    const key = await keys.get();

    expect(key).toBe(KEY);
    expect(runSecretsGet).not.toHaveBeenCalled();
  });

  test('falls back to the dotfiles secrets-get for typesafe/api-key', async () => {
    const runSecretsGet = vi.fn(async () => ({
      code: 0,
      stdout: `${KEY}\n`
    }));
    const keys = createJevKeySource({
      env: {},
      resolveDotfilesRoot: async () => '/dotfiles',
      runSecretsGet
    });

    const key = await keys.get();

    expect(key).toBe(KEY);
    expect(runSecretsGet).toHaveBeenCalledWith(
      '/dotfiles/src/shell/bin/secrets-get',
      ['typesafe/api-key']
    );
  });

  test('looks a missing key up again only after the recheck window', async () => {
    let clock = 1_000;
    const runSecretsGet = vi.fn(async () => ({ code: 1, stdout: '' }));
    const keys = createJevKeySource({
      env: {},
      resolveDotfilesRoot: async () => '/dotfiles',
      runSecretsGet,
      now: () => clock
    });
    await keys.get();
    clock += KEY_RECHECK_MS - 1;
    await keys.get();

    clock += 1;
    await keys.get();

    expect(runSecretsGet).toHaveBeenCalledTimes(2);
  });

  test('answers key_missing without calling jev when no key is found', async () => {
    const fetch = fixtureFetch(answer());
    const keys = createJevKeySource({
      env: {},
      resolveDotfilesRoot: async () => null
    });
    const client = createJevClient({ fetch, keys });

    const result = await client.judge('state');

    expect(result).toEqual({ ok: false, reason: 'key_missing' });
    expect(fetch).not.toHaveBeenCalled();
  });
});
