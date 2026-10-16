/**
 * Spec material cache of the placement judgment (UI-izba §4.2): the goal,
 * decision and boundary sections and the front-matter `scope:` of one spec,
 * read at the workspace's PINNED base.
 *
 * Same shape as `server/worker/scope-cache.js`: a synchronous `peek`, an
 * asynchronous `fill`, and an `onFilled` fanout. Freshness rides the base: the
 * value records the `base_oid` it was read at, a refill after the TTL resolves
 * the base again, and only a moved base re-reads the blob.
 */
import path from 'node:path';
import { debug } from '../logging.js';
import { parseArtifactScope } from '../worker/artifact-scope.js';
import { workerAnalysisContext } from '../worker/attach.js';

const log = debug('placement:spec-sections');

/** @type {number} How long a successful read answers before a refill. */
const POSITIVE_TTL_MS = 5 * 60_000;

/** @type {number} How long a failed read is remembered. */
const NEGATIVE_TTL_MS = 60_000;

/** @type {RegExp} A resolved base tip. */
const OID_RE = /^[0-9a-fA-F]{40}$/;

/**
 * Heading words of the sections the material keeps. The repo's spec headings
 * are numbered (`## 1. 목표`, `## 7. 경계·후속`, `## 8. 결정 (ADR 후보)`), so the
 * number is stripped before the prefix test.
 *
 * @type {RegExp}
 */
const KEPT_HEADING_RE = /^(목표|결정|경계|goal|decision|boundar)/i;

/**
 * @typedef {Object} SpecMaterial
 * @property {string[]} scope
 * @property {Record<string, string>} sections
 */

/**
 * @typedef {{ state: 'hit', value: SpecMaterial }|{ state: 'miss' }|{ state: 'failed' }} SpecPeek
 */

/**
 * @typedef {Object} SpecRecord
 * @property {string} base_oid
 * @property {SpecMaterial|null} value
 * @property {number} at
 */

/**
 * The kept sections of a spec document, heading → body, in document order.
 *
 * @param {string} content
 * @returns {Record<string, string>}
 */
export function specSections(content) {
  /** @type {Record<string, string[]>} */
  const found = {};
  /** @type {string|null} */
  let current = null;
  for (const line of content.split(/\r?\n/)) {
    if (line.startsWith('## ')) {
      const heading = line.slice(3).trim();
      const bare = heading.replace(/^\d+(?:\.\d+)*\.?\s*/, '');
      current = KEPT_HEADING_RE.test(bare) ? heading : null;
      if (current !== null) {
        found[current] = [];
      }
    } else if (current !== null) {
      found[current].push(line);
    }
  }
  return Object.fromEntries(
    Object.entries(found).map(([heading, lines]) => [
      heading,
      lines.join('\n').trim()
    ])
  );
}

/**
 * @typedef {Object} SpecSectionCacheOptions
 * @property {() => number} [now]
 * @property {(workspace_key: string) => ReturnType<typeof workerAnalysisContext>} [contextFor]
 */

/**
 * Create a spec material cache. The process-wide instance is built by the
 * placement service; the factory exists for tests.
 *
 * @param {SpecSectionCacheOptions} [options]
 */
export function createSpecSectionCache(options = {}) {
  const now = options.now || (() => Date.now());
  const contextFor =
    options.contextFor ||
    ((/** @type {string} */ workspace_key) =>
      workerAnalysisContext(workspace_key));

  /** @type {Map<string, SpecRecord>} */
  const records = new Map();
  /** @type {Map<string, Promise<void>>} */
  const in_flight = new Map();
  /** @type {Map<string, number>} */
  const flights_by_workspace = new Map();
  /** @type {Map<string, Promise<unknown>>} */
  const gate_by_workspace = new Map();
  /** @type {Set<(workspace_key: string) => void>} */
  const listeners = new Set();

  /**
   * @param {string} workspace_key
   * @returns {string}
   */
  function keyOf(workspace_key) {
    return path.resolve(String(workspace_key || ''));
  }

  /**
   * @param {string} workspace
   * @param {string} spec_path
   * @returns {string}
   */
  function cacheKeyOf(workspace, spec_path) {
    return `${workspace}\u0000${spec_path}`;
  }

  /**
   * @param {SpecRecord} record
   * @returns {boolean}
   */
  function isExpired(record) {
    const ttl = record.value === null ? NEGATIVE_TTL_MS : POSITIVE_TTL_MS;
    return now() - record.at >= ttl;
  }

  /**
   * @param {string} cache_key
   */
  function rememberFailure(cache_key) {
    records.set(cache_key, { base_oid: '', value: null, at: now() });
  }

  /**
   * @param {string} workspace
   * @param {string} spec_path
   * @param {string} cache_key
   */
  async function readInto(workspace, spec_path, cache_key) {
    /** @type {ReturnType<typeof workerAnalysisContext>} */
    let context = null;
    try {
      context = contextFor(workspace);
    } catch {
      context = null;
    }
    if (!context) {
      rememberFailure(cache_key);
      return;
    }
    /** @type {import('../worker/target-base.js').TargetBaseResult|null} */
    let base = null;
    try {
      base = await context.resolveBase({ force: false });
    } catch {
      base = null;
    }
    if (!base || base.ok !== true || !OID_RE.test(base.base_oid)) {
      rememberFailure(cache_key);
      return;
    }
    const base_oid = base.base_oid;
    const existing = records.get(cache_key);
    if (existing && existing.value !== null && existing.base_oid === base_oid) {
      existing.at = now();
      return;
    }
    const blob = await context.gitRun([
      'cat-file',
      'blob',
      `${base_oid}:${spec_path}`
    ]);
    if (blob.code !== 0) {
      rememberFailure(cache_key);
      return;
    }
    records.set(cache_key, {
      base_oid,
      value: {
        scope: parseArtifactScope(blob.stdout),
        sections: specSections(blob.stdout)
      },
      at: now()
    });
  }

  /**
   * @param {string} workspace
   */
  function announceFilled(workspace) {
    for (const listener of listeners) {
      try {
        listener(workspace);
      } catch (err) {
        log('spec fill callback failed for %s: %o', workspace, err);
      }
    }
  }

  /**
   * Read one spec into the cache. Never rejects, never runs twice for one key
   * at once, and fills of one workspace run one at a time.
   *
   * @param {string} workspace_key
   * @param {string} spec_path
   * @returns {Promise<void>}
   */
  function fill(workspace_key, spec_path) {
    if (typeof spec_path !== 'string' || spec_path.length === 0) {
      return Promise.resolve();
    }
    const workspace = keyOf(workspace_key);
    const cache_key = cacheKeyOf(workspace, spec_path);
    const running = in_flight.get(cache_key);
    if (running) {
      return running;
    }
    const gate = gate_by_workspace.get(workspace);
    /** @type {Promise<void>} */
    let run = Promise.resolve();
    run = (async () => {
      if (gate) {
        await gate;
      }
      try {
        await readInto(workspace, spec_path, cache_key);
      } catch (err) {
        log('spec fill failed for %s: %o', workspace, err);
        rememberFailure(cache_key);
      } finally {
        if (in_flight.get(cache_key) === run) {
          in_flight.delete(cache_key);
        }
        const left = (flights_by_workspace.get(workspace) || 1) - 1;
        if (left > 0) {
          flights_by_workspace.set(workspace, left);
        } else {
          flights_by_workspace.delete(workspace);
          if (gate_by_workspace.get(workspace) === run) {
            gate_by_workspace.delete(workspace);
          }
          announceFilled(workspace);
        }
      }
    })();
    in_flight.set(cache_key, run);
    flights_by_workspace.set(
      workspace,
      (flights_by_workspace.get(workspace) || 0) + 1
    );
    gate_by_workspace.set(workspace, run);
    return run;
  }

  return {
    /**
     * The synchronous read. Stale-while-revalidate like the scope cache: an
     * expired record still answers and schedules its refill; a cold miss
     * answers `miss` and schedules the first read.
     *
     * @param {string} workspace_key
     * @param {string} spec_path
     * @returns {SpecPeek}
     */
    peek(workspace_key, spec_path) {
      if (typeof spec_path !== 'string' || spec_path.length === 0) {
        return { state: 'miss' };
      }
      const record = records.get(cacheKeyOf(keyOf(workspace_key), spec_path));
      if (!record) {
        void fill(workspace_key, spec_path);
        return { state: 'miss' };
      }
      if (isExpired(record)) {
        void fill(workspace_key, spec_path);
      }
      return record.value === null
        ? { state: 'failed' }
        : { state: 'hit', value: record.value };
    },

    fill,

    /**
     * @param {(workspace_key: string) => void} listener
     * @returns {() => void} Unregister.
     */
    onFilled(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    }
  };
}
