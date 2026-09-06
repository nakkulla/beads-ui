/**
 * ADR fingerprint watch and recompute selection (spec UI-8uz7 §5.3, §8).
 *
 * `fs.watch` events are debounced, then the watched path set is re-fingerprinted
 * and compared: an unchanged fingerprint produces no work. The changed-file set
 * decides the plan — spec-only edits recompute those specs, anything under
 * `docs/adr/`, `AGENTS.md`, `CLAUDE.md` or `docs/agents/` forces a full pass. A
 * poll safety net re-fingerprints on a timer and never spawns a process
 * (ADR 0026).
 *
 * In-flight ownership lives here: `onChange` is awaited, at most one call is
 * outstanding per repo, and plans arriving during that call are merged (`full`
 * wins) into exactly one rerun afterwards.
 *
 * @import { AdrPlan } from './adr-signals.js'
 */
import { createHash } from 'node:crypto';
import nodeFs from 'node:fs';
import path from 'node:path';
import { debug } from '../logging.js';

const log = debug('adr:watch');

/** Directories watched recursively, relative to the workspace root. */
const WATCHED_DIRS = ['docs/adr', 'docs/agents', 'docs/superpowers/specs'];

/** Individual files watched, relative to the workspace root. */
const WATCHED_FILES = ['AGENTS.md', 'CLAUDE.md'];

/** Spec directory prefix; changes confined to it allow a partial plan. */
const SPEC_PREFIX = 'docs/superpowers/specs/';

/**
 * @typedef {Object} AdrWatch
 * @property {() => Promise<void>} refresh - Re-fingerprint now (test seam).
 * @property {(plan: AdrPlan) => Promise<void>} trigger - Dispatch a plan through the same in-flight merge as a fingerprint change (first computation).
 * @property {(pending: boolean) => void} setRetryPending - Arm/disarm the retry.
 * @property {() => void} close - Drop watchers and timers.
 */

/**
 * @param {string} rel
 */
function isSpecFile(rel) {
  return (
    rel.startsWith(SPEC_PREFIX) &&
    rel.endsWith('.md') &&
    !rel.slice(SPEC_PREFIX.length).includes('/')
  );
}

/**
 * Create the watch for one workspace.
 *
 * @param {Object} options
 * @param {string} options.root_dir - Absolute workspace root.
 * @param {(plan: AdrPlan) => Promise<unknown> | unknown} options.onChange - Recompute callback; awaited.
 * @param {number} options.poll_interval_ms - Safety-net poll period.
 * @param {number} [options.debounce_ms] - Event debounce window (default 500).
 * @param {typeof nodeFs} [options.fs] - Injected `node:fs` implementation.
 * @param {typeof nodeFs.watch} [options.watch] - Injected watcher factory.
 * @param {typeof setTimeout} [options.setTimeout] - Injected timer.
 * @param {typeof clearTimeout} [options.clearTimeout] - Injected timer clear.
 * @param {typeof setInterval} [options.setInterval] - Injected interval.
 * @param {typeof clearInterval} [options.clearInterval] - Injected interval clear.
 * @returns {AdrWatch}
 */
export function createAdrWatch(options) {
  const { root_dir, onChange, poll_interval_ms, debounce_ms = 500 } = options;
  const fs = options.fs || nodeFs;
  const watchFn = options.watch || fs.watch;
  const setTimeoutFn = options.setTimeout || setTimeout;
  const clearTimeoutFn = options.clearTimeout || clearTimeout;
  const setIntervalFn = options.setInterval || setInterval;
  const clearIntervalFn = options.clearInterval || clearInterval;

  /** @type {Map<string, string>} Relative path to `mtimeMs\0size`. */
  let fingerprint = new Map();
  let fingerprint_digest = '';
  /** @type {nodeFs.FSWatcher[]} */
  const watchers = [];
  /** @type {ReturnType<typeof setTimeout> | null} */
  let debounce_timer = null;
  /** @type {ReturnType<typeof setInterval> | null} */
  let poll_timer = null;
  let closed = false;
  let running = false;
  let retry_pending = false;
  /** @type {AdrPlan | null} */
  let queued_plan = null;

  /**
   * @param {string} dir - Absolute directory path.
   * @param {Map<string, string>} into
   */
  function scanDir(dir, into) {
    /** @type {nodeFs.Dirent[]} */
    let entries;
    try {
      entries = /** @type {nodeFs.Dirent[]} */ (
        fs.readdirSync(dir, { withFileTypes: true })
      );
    } catch {
      return;
    }
    for (const entry of entries) {
      const abs = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(abs, into);
        continue;
      }
      if (!entry.isFile()) {
        continue;
      }
      addFile(abs, into);
    }
  }

  /**
   * @param {string} abs - Absolute file path.
   * @param {Map<string, string>} into
   */
  function addFile(abs, into) {
    try {
      const stat = fs.statSync(abs);
      const rel = path.relative(root_dir, abs).split(path.sep).join('/');
      into.set(rel, `${stat.mtimeMs}\0${stat.size}`);
    } catch {
      // Vanished between listing and stat: absence is itself a change.
    }
  }

  /**
   * Build the current fingerprint map for the watched path set.
   */
  function buildFingerprint() {
    /** @type {Map<string, string>} */
    const next = new Map();
    for (const rel of WATCHED_DIRS) {
      scanDir(path.join(root_dir, rel), next);
    }
    for (const rel of WATCHED_FILES) {
      addFile(path.join(root_dir, rel), next);
    }
    return next;
  }

  /**
   * Stable digest of the whole set — `rel\0mtimeMs\0size` entries, sorted.
   *
   * @param {Map<string, string>} map
   */
  function digest(map) {
    const hash = createHash('sha1');
    for (const rel of [...map.keys()].sort()) {
      hash.update(`${rel}\0${map.get(rel)}\n`);
    }
    return hash.digest('hex');
  }

  /**
   * @param {Map<string, string>} before
   * @param {Map<string, string>} after
   * @returns {string[]}
   */
  function changedFiles(before, after) {
    /** @type {Set<string>} */
    const changed = new Set();
    for (const [rel, value] of after) {
      if (before.get(rel) !== value) {
        changed.add(rel);
      }
    }
    for (const rel of before.keys()) {
      if (!after.has(rel)) {
        changed.add(rel);
      }
    }
    return [...changed].sort();
  }

  /**
   * @param {string[]} changed
   * @returns {AdrPlan}
   */
  function planFor(changed) {
    const specs = changed.filter(isSpecFile);
    if (specs.length === changed.length) {
      return { full: false, specs };
    }
    return { full: true };
  }

  /**
   * @param {AdrPlan} a
   * @param {AdrPlan} b
   * @returns {AdrPlan}
   */
  function mergePlans(a, b) {
    if (a.full || b.full) {
      return { full: true };
    }
    return {
      full: false,
      specs: [...new Set([...(a.specs || []), ...(b.specs || [])])].sort()
    };
  }

  /**
   * @param {AdrPlan} plan
   */
  async function dispatch(plan) {
    if (running) {
      queued_plan = queued_plan ? mergePlans(queued_plan, plan) : plan;
      return;
    }
    running = true;
    /** @type {AdrPlan | null} */
    let next = plan;
    try {
      while (next && !closed) {
        const current = next;
        queued_plan = null;
        await onChange(current);
        next = queued_plan;
      }
    } finally {
      queued_plan = null;
      running = false;
    }
  }

  /**
   * Re-fingerprint and dispatch a plan when something actually changed. A
   * repository with a pending environment retry gets one full pass even when the
   * fingerprint is unchanged (§8).
   */
  async function refresh() {
    if (closed) {
      return;
    }
    const next = buildFingerprint();
    const next_digest = digest(next);
    const unchanged = next_digest === fingerprint_digest;
    const changed = unchanged ? [] : changedFiles(fingerprint, next);
    fingerprint = next;
    fingerprint_digest = next_digest;
    if (changed.length === 0) {
      if (retry_pending) {
        retry_pending = false;
        await dispatch({ full: true });
      }
      return;
    }
    await dispatch(planFor(changed));
  }

  /**
   * Debounced reaction to a raw watcher event.
   */
  function onWatchEvent() {
    if (closed) {
      return;
    }
    if (debounce_timer) {
      clearTimeoutFn(debounce_timer);
    }
    debounce_timer = setTimeoutFn(() => {
      debounce_timer = null;
      void refresh();
    }, debounce_ms);
  }

  let watch_failed = false;
  /**
   * @param {string} rel
   * @param {boolean} recursive
   */
  function tryWatch(rel, recursive) {
    const abs = path.join(root_dir, rel);
    try {
      if (!fs.existsSync(abs)) {
        return;
      }
      watchers.push(watchFn(abs, { recursive }, onWatchEvent));
    } catch (err) {
      if (!watch_failed) {
        watch_failed = true;
        // EMFILE/ENOSPC and friends: degrade to poll-only, logged once (§8).
        log(
          'fs.watch unavailable for %s, falling back to poll only: %s',
          root_dir,
          err instanceof Error ? err.message : String(err)
        );
      }
    }
  }

  fingerprint = buildFingerprint();
  fingerprint_digest = digest(fingerprint);
  for (const rel of WATCHED_DIRS) {
    tryWatch(rel, true);
  }
  for (const rel of WATCHED_FILES) {
    tryWatch(rel, false);
  }
  poll_timer = setIntervalFn(() => {
    void refresh();
  }, poll_interval_ms);

  return {
    refresh,
    trigger: dispatch,
    /**
     * @param {boolean} pending - True while the workspace has an env error.
     */
    setRetryPending(pending) {
      retry_pending = Boolean(pending);
    },
    close() {
      closed = true;
      queued_plan = null;
      if (debounce_timer) {
        clearTimeoutFn(debounce_timer);
        debounce_timer = null;
      }
      if (poll_timer) {
        clearIntervalFn(poll_timer);
        poll_timer = null;
      }
      for (const watcher of watchers.splice(0)) {
        try {
          watcher.close();
        } catch {
          // Already closed.
        }
      }
    }
  };
}
