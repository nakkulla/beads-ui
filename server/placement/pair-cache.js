/**
 * Persisted pair answer cache of the placement judgment (UI-izba §4.3).
 *
 * Keyed by (sorted ids, the two material digests, question version, model):
 * a change to either issue's material is a different key, so only that pair is
 * asked again, and a queue change — which moves no material — asks nothing.
 * The file lives in the server state directory and survives a restart; an
 * entry unused for {@link CACHE_UNUSED_TTL_MS} is pruned on load and on save.
 *
 * The file holds ids, digests and answers only — never issue text or the key.
 */
import fs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';
import {
  CACHE_UNUSED_TTL_MS,
  JEV_MODEL,
  PLACEMENT_CHOICES,
  PLACEMENT_QUESTION_VERSION
} from './question.js';

const log = debug('placement:pair-cache');

/** @type {number} A read refreshes the stored `used_at` at most this often. */
const TOUCH_PERSIST_MS = 24 * 60 * 60_000;

/** @type {number} Writes after a change are gathered for this long. */
const SAVE_DELAY_MS = 1_000;

/**
 * @typedef {Object} PairEntry
 * @property {string} a
 * @property {string} b
 * @property {string} digest_a
 * @property {string} digest_b
 * @property {string} question_version
 * @property {string} model
 * @property {import('./wire.js').PlacementJevChoice} choice
 * @property {number} confidence
 * @property {number} judged_at
 * @property {number} used_at
 * @property {number} [persisted_used_at] - In memory only.
 */

/**
 * @param {string} a
 * @param {string} b
 * @param {string} digest_a
 * @param {string} digest_b
 * @returns {string}
 */
export function pairCacheKey(a, b, digest_a, digest_b) {
  return [a, b, digest_a, digest_b, PLACEMENT_QUESTION_VERSION, JEV_MODEL].join(
    '|'
  );
}

/**
 * @param {unknown} value
 * @returns {PairEntry|null}
 */
function entryOf(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }
  const raw = /** @type {Record<string, unknown>} */ (value);
  const strings = [
    'a',
    'b',
    'digest_a',
    'digest_b',
    'question_version',
    'model'
  ];
  for (const field of strings) {
    if (typeof raw[field] !== 'string') {
      return null;
    }
  }
  const choices = /** @type {readonly string[]} */ (PLACEMENT_CHOICES);
  if (
    typeof raw.choice !== 'string' ||
    !choices.includes(raw.choice) ||
    typeof raw.confidence !== 'number' ||
    typeof raw.judged_at !== 'number' ||
    typeof raw.used_at !== 'number'
  ) {
    return null;
  }
  return {
    a: /** @type {string} */ (raw.a),
    b: /** @type {string} */ (raw.b),
    digest_a: /** @type {string} */ (raw.digest_a),
    digest_b: /** @type {string} */ (raw.digest_b),
    question_version: /** @type {string} */ (raw.question_version),
    model: /** @type {string} */ (raw.model),
    choice: /** @type {import('./wire.js').PlacementJevChoice} */ (raw.choice),
    confidence: raw.confidence,
    judged_at: raw.judged_at,
    used_at: raw.used_at,
    persisted_used_at: raw.used_at
  };
}

/**
 * @typedef {Object} PairCacheOptions
 * @property {string} file - Absolute path of the cache file.
 * @property {() => number} [now]
 */

/**
 * Create the pair cache over one file. Call `load()` once before use.
 *
 * @param {PairCacheOptions} options
 */
export function createPairCache(options) {
  const file = options.file;
  const now = options.now || (() => Date.now());
  /** @type {Map<string, PairEntry>} */
  const entries = new Map();
  /** @type {ReturnType<typeof setTimeout>|null} */
  let save_timer = null;
  /** @type {Promise<void>} */
  let writing = Promise.resolve();

  function prune() {
    const cutoff = now() - CACHE_UNUSED_TTL_MS;
    for (const [key, entry] of entries) {
      if (entry.used_at < cutoff) {
        entries.delete(key);
      }
    }
  }

  async function write() {
    prune();
    const body = JSON.stringify({
      version: 1,
      entries: [...entries.values()].map((entry) => {
        const stored = { ...entry };
        delete stored.persisted_used_at;
        return stored;
      })
    });
    const tmp = `${file}.${process.pid}.tmp`;
    await fs.promises.mkdir(path.dirname(file), { recursive: true });
    await fs.promises.writeFile(tmp, body, { mode: 0o600 });
    await fs.promises.rename(tmp, file);
    for (const entry of entries.values()) {
      entry.persisted_used_at = entry.used_at;
    }
  }

  function scheduleSave() {
    if (save_timer !== null) {
      return;
    }
    save_timer = setTimeout(() => {
      save_timer = null;
      writing = writing
        .then(write)
        .catch((err) => log('pair cache save failed: %o', err));
    }, SAVE_DELAY_MS);
    save_timer.unref?.();
  }

  return {
    /**
     * Read the file (absent or unreadable is an empty cache) and prune.
     */
    load() {
      entries.clear();
      /** @type {unknown} */
      let parsed = null;
      try {
        parsed = JSON.parse(fs.readFileSync(file, 'utf8'));
      } catch {
        parsed = null;
      }
      const list =
        parsed && typeof parsed === 'object'
          ? /** @type {any} */ (parsed).entries
          : null;
      for (const raw of Array.isArray(list) ? list : []) {
        const entry = entryOf(raw);
        if (entry) {
          entries.set(
            pairCacheKey(entry.a, entry.b, entry.digest_a, entry.digest_b),
            entry
          );
        }
      }
      // Entries of another question version or model are unreachable keys.
      for (const [key, entry] of entries) {
        if (
          entry.question_version !== PLACEMENT_QUESTION_VERSION ||
          entry.model !== JEV_MODEL
        ) {
          entries.delete(key);
        }
      }
      prune();
    },

    /**
     * The cached answer of a pair, refreshing its `used_at`.
     *
     * @param {string} a
     * @param {string} b
     * @param {string} digest_a
     * @param {string} digest_b
     * @returns {PairEntry|null}
     */
    get(a, b, digest_a, digest_b) {
      const entry = entries.get(pairCacheKey(a, b, digest_a, digest_b));
      if (!entry) {
        return null;
      }
      entry.used_at = now();
      if (entry.used_at - (entry.persisted_used_at ?? 0) >= TOUCH_PERSIST_MS) {
        scheduleSave();
      }
      return entry;
    },

    /**
     * @param {string} a
     * @param {string} b
     * @param {string} digest_a
     * @param {string} digest_b
     * @param {{ choice: import('./wire.js').PlacementJevChoice, confidence: number, judged_at: number }} answer
     */
    set(a, b, digest_a, digest_b, answer) {
      entries.set(pairCacheKey(a, b, digest_a, digest_b), {
        a,
        b,
        digest_a,
        digest_b,
        question_version: PLACEMENT_QUESTION_VERSION,
        model: JEV_MODEL,
        choice: answer.choice,
        confidence: answer.confidence,
        judged_at: answer.judged_at,
        used_at: now()
      });
      scheduleSave();
    },

    /**
     * Drop every entry naming one of `ids` (any digest).
     *
     * @param {Set<string>} ids
     * @returns {number} How many entries were dropped.
     */
    deleteInvolving(ids) {
      let dropped = 0;
      for (const [key, entry] of entries) {
        if (ids.has(entry.a) || ids.has(entry.b)) {
          entries.delete(key);
          dropped += 1;
        }
      }
      if (dropped > 0) {
        scheduleSave();
      }
      return dropped;
    },

    /**
     * Write any pending change now (tests, shutdown).
     *
     * @returns {Promise<void>}
     */
    async flush() {
      if (save_timer !== null) {
        clearTimeout(save_timer);
        save_timer = null;
        writing = writing.then(write);
      }
      await writing;
    },

    /** @returns {number} */
    size() {
      return entries.size;
    }
  };
}
