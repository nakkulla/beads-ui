/**
 * The jev client of the placement judgment (UI-izba §4.2): one choice question
 * per request, the workflow judge's request shape and its response checks.
 *
 * The key is `TYPESAFE_API_KEY`, else the installed dotfiles checkout's
 * `src/shell/bin/secrets-get typesafe/api-key` (ADR dotfiles-hkski). It lives
 * in this module's memory only: it is never returned, logged, or put on any
 * wire — a failure carries a reason code and nothing else.
 */
import { execFile } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { runShell } from '../bd.js';
import { debug } from '../logging.js';
import { resolveDotfilesRoot } from '../worker/attempt-facts.js';
import {
  JEV_ENDPOINT,
  JEV_MODEL,
  JEV_TIMEOUT_MS,
  JEV_USER_AGENT,
  KEY_RECHECK_MS,
  PLACEMENT_CHOICES,
  PLACEMENT_QUESTION,
  PLACEMENT_QUESTIONS
} from './question.js';

const log = debug('placement:jev');

/**
 * @typedef {import('./wire.js').PlacementJevChoice} PlacementJevChoice
 */

/**
 * @typedef {{ ok: true, choice: PlacementJevChoice, confidence: number, probabilities: Record<string, number> }|{ ok: false, reason: string }} JevResult
 */

/**
 * @typedef {(url: string, init: { method: string, headers: Record<string, string>, body: string, signal: AbortSignal }) => Promise<{ ok: boolean, status: number, json: () => Promise<unknown> }>} JevFetch
 */

/**
 * @typedef {(file: string, args: string[]) => Promise<{ code: number, stdout: string }>} SecretsRunner
 */

/**
 * @typedef {Object} KeySourceOptions
 * @property {Record<string, string|undefined>} [env]
 * @property {() => Promise<string|null>} [resolveDotfilesRoot]
 * @property {SecretsRunner} [runSecretsGet]
 * @property {() => number} [now]
 */

/**
 * Run `secrets-get` with no stdin and no stderr capture, stopped at the jev
 * time limit like the workflow judge's lookup.
 *
 * @type {SecretsRunner}
 */
function defaultRunSecretsGet(file, args) {
  return new Promise((resolve) => {
    const child = execFile(
      file,
      args,
      { timeout: JEV_TIMEOUT_MS, encoding: 'utf8', maxBuffer: 64 * 1024 },
      (err, stdout) => {
        if (err) {
          const code =
            typeof (/** @type {any} */ (err).code) === 'number'
              ? /** @type {any} */ (err).code
              : 1;
          resolve({ code, stdout: '' });
          return;
        }
        resolve({ code: 0, stdout: String(stdout) });
      }
    );
    child.stdin?.end();
  });
}

/**
 * The key lookup: environment first, then `secrets-get`. A found key is kept
 * for the process lifetime; a missing one is looked up again only after
 * {@link KEY_RECHECK_MS} (§4.8).
 *
 * @param {KeySourceOptions} [options]
 */
export function createJevKeySource(options = {}) {
  const env = options.env || process.env;
  const now = options.now || (() => Date.now());
  const resolveRoot =
    options.resolveDotfilesRoot ||
    (() =>
      resolveDotfilesRoot({
        run: (args, opts) => runShell('git', args, opts),
        homeDir: os.homedir()
      }));
  const runSecretsGet = options.runSecretsGet || defaultRunSecretsGet;

  /** @type {string|null} */
  let cached = null;
  /** @type {number|null} */
  let missing_at = null;
  /** @type {Promise<string|null>|null} */
  let in_flight = null;

  /**
   * @returns {Promise<string|null>}
   */
  async function lookup() {
    const from_env = env.TYPESAFE_API_KEY;
    if (typeof from_env === 'string' && from_env.length > 0) {
      return from_env;
    }
    /** @type {string|null} */
    let root = null;
    try {
      root = await resolveRoot();
    } catch {
      root = null;
    }
    if (!root) {
      return null;
    }
    try {
      const result = await runSecretsGet(
        path.join(root, 'src', 'shell', 'bin', 'secrets-get'),
        ['typesafe/api-key']
      );
      if (result.code !== 0) {
        return null;
      }
      const key = result.stdout.replace(/[\r\n]+$/, '');
      return key.trim().length > 0 ? key : null;
    } catch {
      return null;
    }
  }

  return {
    /**
     * The key, or null while it is missing. Never throws.
     *
     * @returns {Promise<string|null>}
     */
    async get() {
      if (cached !== null) {
        return cached;
      }
      if (missing_at !== null && now() - missing_at < KEY_RECHECK_MS) {
        return null;
      }
      if (!in_flight) {
        in_flight = lookup().finally(() => {
          in_flight = null;
        });
      }
      const key = await in_flight;
      if (key === null) {
        missing_at = now();
        log('jev key missing');
      } else {
        cached = key;
        missing_at = null;
      }
      return key;
    },

    /**
     * `present` once a key was found, `missing` inside the recheck window after
     * a failed lookup, `unknown` before the first lookup or once that window
     * has passed.
     *
     * @returns {'unknown'|'present'|'missing'}
     */
    state() {
      if (cached !== null) {
        return 'present';
      }
      if (missing_at !== null && now() - missing_at < KEY_RECHECK_MS) {
        return 'missing';
      }
      return 'unknown';
    },

    /**
     * Forget a key the endpoint refused, so the next call looks it up again.
     */
    invalidate() {
      cached = null;
    },

    /**
     * Epoch ms at which a missing key may be looked up again, or null.
     *
     * @returns {number|null}
     */
    recheckAt() {
      return cached === null && missing_at !== null
        ? missing_at + KEY_RECHECK_MS
        : null;
    }
  };
}

/**
 * @param {unknown} value
 * @returns {value is number}
 */
function isProbability(value) {
  return (
    typeof value === 'number' &&
    Number.isFinite(value) &&
    value >= 0 &&
    value <= 1
  );
}

/**
 * The workflow judge's response checks for one choice question: the model
 * matches, the answer set is exactly this question, the choice is one of the
 * four, `probabilities` covers exactly the four with values in [0, 1] summing
 * to 1 ± 0.001, the chosen choice holds the maximum, and `confidence` is a
 * probability. Any miss is `schema_mismatch` for the pair.
 *
 * @param {unknown} raw
 * @returns {JevResult}
 */
export function validateJevResponse(raw) {
  const mismatch = /** @type {JevResult} */ ({
    ok: false,
    reason: 'schema_mismatch'
  });
  if (!raw || typeof raw !== 'object') {
    return mismatch;
  }
  const body = /** @type {Record<string, any>} */ (raw);
  if (body.model !== JEV_MODEL) {
    return mismatch;
  }
  const answers = body.answers;
  if (
    !answers ||
    typeof answers !== 'object' ||
    Object.keys(answers).length !== 1 ||
    !Object.hasOwn(answers, PLACEMENT_QUESTION)
  ) {
    return mismatch;
  }
  const value = answers[PLACEMENT_QUESTION];
  const options = /** @type {readonly string[]} */ (PLACEMENT_CHOICES);
  if (!value || typeof value !== 'object' || !options.includes(value.choice)) {
    return mismatch;
  }
  const probabilities = value.probabilities;
  if (
    !probabilities ||
    typeof probabilities !== 'object' ||
    Object.keys(probabilities).length !== options.length ||
    !options.every((option) => isProbability(probabilities[option]))
  ) {
    return mismatch;
  }
  const values = options.map((option) => Number(probabilities[option]));
  const sum = values.reduce((acc, n) => acc + n, 0);
  if (Math.abs(sum - 1) > 0.001) {
    return mismatch;
  }
  if (probabilities[value.choice] !== Math.max(...values)) {
    return mismatch;
  }
  if (!isProbability(value.confidence)) {
    return mismatch;
  }
  return {
    ok: true,
    choice: value.choice,
    confidence: value.confidence,
    probabilities: Object.fromEntries(
      options.map((option) => [option, Number(probabilities[option])])
    )
  };
}

/**
 * The request body: model, text state, and the one question (workflow judge
 * `request_payload` shape).
 *
 * @param {string} state
 */
export function jevRequestBody(state) {
  return { model: JEV_MODEL, state, questions: PLACEMENT_QUESTIONS };
}

/**
 * @typedef {Object} JevClientOptions
 * @property {JevFetch} [fetch]
 * @property {ReturnType<typeof createJevKeySource>} [keys]
 */

/**
 * Create the jev client. One instance per service; `fetch` and the key source
 * are injectable so tests never reach the network or a real key.
 *
 * @param {JevClientOptions} [options]
 */
export function createJevClient(options = {}) {
  const fetchImpl =
    options.fetch || /** @type {JevFetch} */ (/** @type {unknown} */ (fetch));
  const keys = options.keys || createJevKeySource();

  return {
    keys,

    /**
     * Ask the placement question about one pair state. Never throws and never
     * reports the key or the state back.
     *
     * @param {string} state
     * @returns {Promise<JevResult>}
     */
    async judge(state) {
      const key = await keys.get();
      if (key === null) {
        return { ok: false, reason: 'key_missing' };
      }
      /** @type {Awaited<ReturnType<JevFetch>>} */
      let response;
      try {
        response = await fetchImpl(JEV_ENDPOINT, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${key}`,
            'Content-Type': 'application/json',
            'User-Agent': JEV_USER_AGENT
          },
          body: JSON.stringify(jevRequestBody(state)),
          signal: AbortSignal.timeout(JEV_TIMEOUT_MS)
        });
      } catch (err) {
        const name =
          err && typeof err === 'object'
            ? String(/** @type {any} */ (err).name)
            : '';
        return {
          ok: false,
          reason:
            name === 'TimeoutError' || name === 'AbortError'
              ? 'timeout'
              : 'connection_failed'
        };
      }
      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          keys.invalidate();
        }
        return { ok: false, reason: `http_${response.status}` };
      }
      /** @type {unknown} */
      let raw;
      try {
        raw = await response.json();
      } catch {
        return { ok: false, reason: 'schema_mismatch' };
      }
      return validateJevResponse(raw);
    }
  };
}
