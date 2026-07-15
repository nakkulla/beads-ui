/**
 * Worker queue store — persistence + revision-CAS concurrency guard.
 *
 * NO EXECUTION lives here (that is Phase 10). This module only owns durable
 * queue placement: which beads sit in the Serial queue / Parallel pool / Done
 * lane, the `auto_advance` flag, and the per-attempt record container
 * (spec §5.2). Ordering mutations are guarded by an integer `revision` CAS so a
 * stale client's drag can never clobber a newer ordering (spec §5.1).
 *
 * Persistence: one `queue.json` per workspace under
 * `$XDG_STATE_HOME/bdui/<slug>/` (see state-paths.js). Writes are atomic
 * (temp file + rename) so a crash mid-write never leaves a partial file.
 *
 * Restart safety: `load()` ALWAYS forces `auto_advance = false` regardless of
 * the persisted value, so beads-ui never auto-resumes execution after a crash
 * (spec §5.3). The reset is in-memory; the corrected value is flushed to disk
 * on the next mutation.
 *
 * @typedef {Object} QueueEntry
 * @property {string} bead_id - The bead placed in this lane.
 * @property {number} added_at - Epoch ms the bead entered this lane.
 */
/**
 * Per-attempt record container (spec §5.2). Phase 9 persists the shape; Phase 10
 * fills the runtime fields at dispatch time. Runtime fields default to null.
 *
 * @typedef {Object} Attempt
 * @property {string} attempt_id - Stable id for this launch attempt.
 * @property {string} bead_id - Bead this attempt runs.
 * @property {string|null} base_oid - Git base OID snapshotted at dispatch.
 * @property {string|null} head_oid - Git head OID at dispatch.
 * @property {number|null} started_at - Epoch ms the session started.
 * @property {number|null} pid - OS process id of the runner.
 * @property {string|null} runner - Runner adapter (claude/codex/ccx).
 * @property {string|null} model - Model snapshot.
 * @property {string|null} effort - Effort snapshot.
 * @property {number|null} exit - Process exit code.
 * @property {unknown} verify_result - Worker independent-verification result.
 * @property {string|null} repo - Target repo root (for breaker scope + orphan reap).
 * @property {string|null} status - Attempt lifecycle: running/done/failed/blocked/orphaned.
 * @property {string|null} workflow_mode_prior - workflow_mode value snapshotted before launch (null=was unset).
 * @property {string|null} target_base - Merge target base at dispatch.
 * @property {string|null} merge_sha - Verified merge SHA (post-session).
 * @property {number|null} finished_at - Epoch ms the attempt terminated.
 * @property {string|null} cause - Failure cause (breaker banner reason).
 */
/**
 * @typedef {Object} Queue
 * @property {number} revision - CAS counter; bumped on every mutation.
 * @property {boolean} auto_advance - Whether the scheduler may start sessions.
 * @property {QueueEntry[]} serial - Serial queue (one runnable head at a time).
 * @property {QueueEntry[]} parallel - Parallel pool (slot-priority order).
 * @property {QueueEntry[]} done - Completed today.
 * @property {Record<string, Attempt>} attempts - Attempt records by attempt_id.
 */
/**
 * @typedef {Object} QueueOpResult
 * @property {boolean} ok - True when the mutation was applied.
 * @property {boolean} conflict - True when rejected by a revision mismatch.
 * @property {Queue} queue - Current snapshot (new on success, unchanged else).
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { queueFilePath } from './state-paths.js';

/** @type {ReadonlyArray<'serial'|'parallel'>} */
const PLACEABLE_LANES = ['serial', 'parallel'];

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @returns {Queue}
 */
function emptyQueue() {
  return {
    revision: 0,
    auto_advance: false,
    serial: [],
    parallel: [],
    done: [],
    attempts: {}
  };
}

/**
 * Deep clone via JSON — queue state is plain data, so this is safe and keeps
 * returned snapshots isolated from the in-memory cache.
 *
 * @template T
 * @param {T} value
 * @returns {T}
 */
function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

/**
 * @param {unknown} entry
 * @returns {QueueEntry|null}
 */
function normalizeEntry(entry) {
  if (!isRecord(entry) || typeof entry.bead_id !== 'string') {
    return null;
  }
  return {
    bead_id: entry.bead_id,
    added_at: typeof entry.added_at === 'number' ? entry.added_at : 0
  };
}

/**
 * @param {unknown} arr
 * @returns {QueueEntry[]}
 */
function normalizeLane(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  /** @type {QueueEntry[]} */
  const out = [];
  const seen = new Set();
  for (const raw of arr) {
    const e = normalizeEntry(raw);
    if (e && !seen.has(e.bead_id)) {
      seen.add(e.bead_id);
      out.push(e);
    }
  }
  return out;
}

/**
 * Fill an attempt container over its default (all-null) shape.
 *
 * @param {Partial<Attempt> & { attempt_id: string, bead_id: string }} fields
 * @returns {Attempt}
 */
export function makeAttempt(fields) {
  return {
    attempt_id: fields.attempt_id,
    bead_id: fields.bead_id,
    base_oid: fields.base_oid ?? null,
    head_oid: fields.head_oid ?? null,
    started_at: fields.started_at ?? null,
    pid: fields.pid ?? null,
    runner: fields.runner ?? null,
    model: fields.model ?? null,
    effort: fields.effort ?? null,
    exit: fields.exit ?? null,
    verify_result: fields.verify_result ?? null,
    repo: fields.repo ?? null,
    status: fields.status ?? null,
    workflow_mode_prior: fields.workflow_mode_prior ?? null,
    target_base: fields.target_base ?? null,
    merge_sha: fields.merge_sha ?? null,
    finished_at: fields.finished_at ?? null,
    cause: fields.cause ?? null
  };
}

/**
 * @param {unknown} raw
 * @returns {Queue}
 */
function normalizeQueue(raw) {
  const q = emptyQueue();
  if (!isRecord(raw)) {
    return q;
  }
  q.revision =
    typeof raw.revision === 'number' && Number.isFinite(raw.revision)
      ? Math.max(0, Math.floor(raw.revision))
      : 0;
  q.serial = normalizeLane(raw.serial);
  q.parallel = normalizeLane(raw.parallel);
  q.done = normalizeLane(raw.done);
  if (isRecord(raw.attempts)) {
    for (const [key, value] of Object.entries(raw.attempts)) {
      if (isRecord(value) && typeof value.bead_id === 'string') {
        q.attempts[key] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...value,
            attempt_id: key,
            bead_id: value.bead_id
          })
        );
      }
    }
  }
  // auto_advance intentionally left false — see load() restart-safety note.
  return q;
}

/**
 * @param {number} index
 * @param {number} length
 * @returns {number}
 */
function clampIndex(index, length) {
  if (typeof index !== 'number' || !Number.isFinite(index) || index < 0) {
    return length;
  }
  return Math.min(Math.floor(index), length);
}

/**
 * Remove a bead from serial/parallel/done (used for two-way moves + dedupe).
 *
 * @param {Queue} q
 * @param {string} bead_id
 */
function removeFromLanes(q, bead_id) {
  q.serial = q.serial.filter((e) => e.bead_id !== bead_id);
  q.parallel = q.parallel.filter((e) => e.bead_id !== bead_id);
  q.done = q.done.filter((e) => e.bead_id !== bead_id);
}

/**
 * Create a Worker queue store. A single instance is shared server-wide so all
 * connections (and thus all clients dragging concurrently) observe one coherent
 * in-memory revision, making the CAS authoritative in-process.
 *
 * @param {{ now?: () => number, filePathFor?: (workspace: string) => string, fs?: typeof import('node:fs') }} [options]
 */
export function createQueueStore(options = {}) {
  const now = options.now || (() => Date.now());
  const filePathFor = options.filePathFor || queueFilePath;
  const fs = options.fs || nodeFs;

  /** @type {Map<string, Queue>} */
  const cache = new Map();

  /**
   * @param {string} workspace
   * @returns {string}
   */
  function keyFor(workspace) {
    return path.resolve(String(workspace || ''));
  }

  /**
   * Cold-load a workspace queue from disk (once per process), forcing
   * `auto_advance = false` for restart safety. Subsequent calls return the
   * cached in-memory queue.
   *
   * @param {string} workspace
   * @returns {Queue}
   */
  function ensureLoaded(workspace) {
    const key = keyFor(workspace);
    const cached = cache.get(key);
    if (cached) {
      return cached;
    }
    let q = emptyQueue();
    try {
      const raw = fs.readFileSync(filePathFor(workspace), 'utf8');
      q = normalizeQueue(JSON.parse(raw));
    } catch {
      q = emptyQueue();
    }
    // Restart safety: never auto-resume execution after a crash.
    q.auto_advance = false;
    cache.set(key, q);
    return q;
  }

  /**
   * Atomically persist a queue for a workspace (temp file + rename).
   *
   * @param {string} workspace
   * @param {Queue} q
   */
  function persist(workspace, q) {
    const file = filePathFor(workspace);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(q, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * Apply a CAS-guarded mutation. Builds the next state on a clone, persists it,
   * and only commits to the cache on a successful write — so a failed write
   * leaves both memory and disk at the prior revision (atomic op).
   *
   * @param {string} workspace
   * @param {number} expected_revision
   * @param {(next: Queue) => boolean} mutate - Returns false to reject.
   * @returns {QueueOpResult}
   */
  function applyMutation(workspace, expected_revision, mutate) {
    const cur = ensureLoaded(workspace);
    if (expected_revision !== cur.revision) {
      return { ok: false, conflict: true, queue: clone(cur) };
    }
    const next = clone(cur);
    if (!mutate(next)) {
      return { ok: false, conflict: false, queue: clone(cur) };
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return { ok: true, conflict: false, queue: clone(next) };
  }

  /**
   * Apply a scheduler-owned mutation WITHOUT a revision CAS. Client drags use
   * the CAS-guarded ops above; the scheduler is the single in-process writer for
   * attempt lifecycle + lane transitions, so its mutations always apply against
   * the current in-memory revision (which it still bumps so subscribers refresh).
   *
   * @param {string} workspace
   * @param {(next: Queue) => boolean} mutate
   * @returns {QueueOpResult}
   */
  function applyUnconditional(workspace, mutate) {
    const cur = ensureLoaded(workspace);
    const next = clone(cur);
    if (!mutate(next)) {
      return { ok: false, conflict: false, queue: clone(cur) };
    }
    next.revision = cur.revision + 1;
    persist(workspace, next);
    cache.set(keyFor(workspace), next);
    return { ok: true, conflict: false, queue: clone(next) };
  }

  return {
    /**
     * Cold-load (and cache) a workspace queue, forcing auto_advance=false.
     *
     * @param {string} workspace
     * @returns {Queue}
     */
    load(workspace) {
      return clone(ensureLoaded(workspace));
    },

    /**
     * Current in-memory snapshot (loads on first access).
     *
     * @param {string} workspace
     * @returns {Queue}
     */
    snapshot(workspace) {
      return clone(ensureLoaded(workspace));
    },

    /**
     * Place a bead into a lane at an index, removing it from any other lane
     * (two-way move + dedupe). CAS-guarded.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, lane: 'serial'|'parallel', index?: number }} input
     * @returns {QueueOpResult}
     */
    place(workspace, input) {
      const { expected_revision, bead_id, lane, index } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          !PLACEABLE_LANES.includes(lane)
        ) {
          return false;
        }
        removeFromLanes(next, bead_id);
        const arr = next[lane];
        arr.splice(clampIndex(index ?? arr.length, arr.length), 0, {
          bead_id,
          added_at: now()
        });
        return true;
      });
    },

    /**
     * Reorder a bead within its lane. CAS-guarded.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, lane: 'serial'|'parallel', to_index: number }} input
     * @returns {QueueOpResult}
     */
    reorder(workspace, input) {
      const { expected_revision, bead_id, lane, to_index } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (!PLACEABLE_LANES.includes(lane)) {
          return false;
        }
        const arr = next[lane];
        const from = arr.findIndex((e) => e.bead_id === bead_id);
        if (from < 0) {
          return false;
        }
        const [entry] = arr.splice(from, 1);
        arr.splice(clampIndex(to_index, arr.length), 0, entry);
        return true;
      });
    },

    /**
     * Toggle the `auto_advance` flag. CAS-guarded. Phase 9 only persists the
     * flag — no execution is dispatched.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean }} input
     * @returns {QueueOpResult}
     */
    toggleAutoAdvance(workspace, input) {
      const { expected_revision, on } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        next.auto_advance = !!on;
        return true;
      });
    },

    /**
     * Remove a bead from all placement lanes. CAS-guarded.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string }} input
     * @returns {QueueOpResult}
     */
    remove(workspace, input) {
      const { expected_revision, bead_id } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        removeFromLanes(next, bead_id);
        return true;
      });
    },

    /**
     * Persist an attempt record (spec §5.2). CAS-guarded. Keyed by attempt_id.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, attempt: Partial<Attempt> & { attempt_id: string, bead_id: string } }} input
     * @returns {QueueOpResult}
     */
    appendAttempt(workspace, input) {
      const { expected_revision, attempt } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (
          !attempt ||
          typeof attempt.attempt_id !== 'string' ||
          typeof attempt.bead_id !== 'string'
        ) {
          return false;
        }
        next.attempts[attempt.attempt_id] = makeAttempt(attempt);
        return true;
      });
    },

    /**
     * Merge a patch into an existing attempt record (scheduler-owned, no CAS).
     * Fills runtime fields at dispatch / termination (spec §5.2).
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, patch: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    updateAttempt(workspace, input) {
      const { attempt_id, patch } = input;
      return applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur) {
          return false;
        }
        next.attempts[attempt_id] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...cur,
            ...patch,
            attempt_id,
            bead_id: patch.bead_id ?? cur.bead_id
          })
        );
        return true;
      });
    },

    /**
     * Move a bead into the Done lane (removing it from serial/parallel).
     * Scheduler-owned (no CAS).
     *
     * @param {string} workspace
     * @param {{ bead_id: string }} input
     * @returns {QueueOpResult}
     */
    moveToDone(workspace, input) {
      const { bead_id } = input;
      return applyUnconditional(workspace, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        removeFromLanes(next, bead_id);
        next.done.push({ bead_id, added_at: now() });
        return true;
      });
    },

    /**
     * Force the auto_advance flag (scheduler-owned, no CAS) — used to turn
     * execution OFF when the circuit breaker trips (spec §5.3).
     *
     * @param {string} workspace
     * @param {boolean} on
     * @returns {QueueOpResult}
     */
    setAutoAdvance(workspace, on) {
      return applyUnconditional(workspace, (next) => {
        next.auto_advance = !!on;
        return true;
      });
    },

    /**
     * Drop cached in-memory state (test hook — forces the next access to
     * cold-load from disk, exercising the restart path).
     */
    __clearCacheForTest() {
      cache.clear();
    }
  };
}
