/**
 * Worker queue store — persistence + revision-CAS concurrency guard.
 *
 * NO EXECUTION lives here (that is Phase 10). This module only owns durable
 * queue placement: which beads sit in the waiting `queue` / PR-wait lane / Done
 * lane, the `auto_advance` flag, the concurrency cap `slots`, and the
 * per-attempt record container (spec §5.2). Ordering mutations are guarded by an
 * integer `revision` CAS so a stale client's drag can never clobber a newer
 * ordering (spec §5.1).
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
 * @property {string|null} session_id - Runner session identifier (claude
 * `session_id` / codex `thread_id`) captured from the stream's first event for
 * `--resume`/transcript tracking; null until the runner emits it (spec §2).
 * @property {string|null} model - Model snapshot.
 * @property {string|null} effort - Effort snapshot.
 * @property {number|null} exit - Process exit code.
 * @property {unknown} verify_result - Worker independent-verification result.
 * @property {string|null} repo - Target repo root (for the orphan reap scope).
 * @property {string|null} status - Attempt lifecycle: running/done/failed/
 * orphaned/paused/stopped. `paused` (tile ⏸, resumable) and `stopped` (tile ■,
 * terminal) are user actions and carry no `cause` — the state is the meaning.
 * @property {string|null} workflow_mode_prior - workflow_mode value snapshotted before launch (null=was unset).
 * @property {string|null} target_base - Merge target base at dispatch.
 * @property {number|null} finished_at - Epoch ms the attempt terminated.
 * @property {string|null} cause - Failure cause (failure banner reason).
 *
 * RETIRED merge-axis fields (worker-phase2 §2). New attempts never write them,
 * but attempt history is immutable (§9), so the shape is preserved so a legacy
 * `queue.json` round-trips through {@link makeAttempt} without losing a record
 * of what the old regime did:
 * @property {string|null} merge_sha - SERVER-observed merge SHA.
 * @property {string|null} merge_policy - Resolved merge policy at dispatch.
 * @property {string|null} drift_policy - Resolved drift policy at dispatch.
 * @property {string|null} demoted_reason - Why the merge policy was demoted.
 * @property {string|null} release_rejected - Last rejected merge-lock release.
 * @property {string|null} done_kind - How the attempt completed.
 * @property {unknown} verify_cmd_result - Post-merge verify_cmd result.
 * @property {string[]|null} exec_stamped_keys - Exec-setting metadata keys
 * stamped onto the bead at dispatch (bead-absent keys filled from the
 * workspace-global default). Recorded durably BEFORE the first metadata write
 * so a restart/orphan reap can revert them; null when nothing was stamped.
 * @property {Record<string, string>|null} exec_values - Resolved values of the
 * exec keys stamped at dispatch, kept so a manual session resume re-stamps with
 * the PRIOR snapshot values instead of re-resolving the current global defaults
 * (spec §1); null when nothing was stamped.
 * @property {string|null} resumed_from - Prior attempt_id this attempt resumes
 * (manual session resume, spec §1); null for a first-launch attempt. The
 * `already_resumed` guard scans attempts for a child carrying this so a failed
 * attempt is resumed at most once — a scan-derived judgment that survives cold
 * reload.
 * @property {boolean} conflict_resolution - Whether this attempt was dispatched
 * to RESOLVE a PR conflict (worker-phase2 §6). It is the single input that
 * relaxes the session-side base-into-branch `git merge` guard, so it is
 * recorded durably: an orphan reap or a restart must be able to see what kind
 * of attempt this was. Defaults false — a missing value fails closed.
 */
/**
 * @typedef {Object} Queue
 * @property {number} revision - CAS counter; bumped on every mutation.
 * @property {boolean} auto_advance - Whether the scheduler may start sessions.
 * @property {Record<string, string>} exec_defaults - Workspace-global exec
 * setting defaults (subset of the 5 exec keys; an unset key is absent). Only
 * valid enum values survive normalize.
 * @property {number} slots - Concurrency cap: how many sessions the scheduler
 * may run at once (worker-phase2 §3). Integer ≥ 1, default 2. `slots = 1` IS
 * the retired serial lane's semantics.
 * @property {QueueEntry[]} queue - The ONE waiting lane, in dispatch order
 * (worker-phase2 §3). Ordering/dependency safety is carried by the admission
 * validator + bd deps, not by a lane split.
 * @property {QueueEntry[]} pr_wait - Beads whose PR the server OBSERVED open,
 * waiting for a human merge click (worker-phase2 §4).
 * @property {QueueEntry[]} done - Completed today.
 * @property {Record<string, Attempt>} attempts - Attempt records by attempt_id.
 * @property {Record<string, { reason: string, at: number }>} admission -
 * Auto-run admission refusals by bead_id (badge display). Cleared only on a
 * successful dispatch or queue removal — never auto-expired.
 * @property {Record<string, { step: string, reason: string, bd_restore: string|null, at: number }>} cleanup_failed -
 * Beads whose post-merge cleanup stopped part-way (worker-phase2 §6). DURABLE
 * on purpose: the PR is already merged and irreversible, the bead is left
 * `resolved`, and nothing retries by itself — so the record that a human must
 * finish the cleanup has to outlive a server restart. `bd_restore` is null when
 * the stop happened BEFORE the parent close (bd was never touched, so `resolved`
 * still holds by itself), `restored` when the close was undone back to
 * `resolved`, and `restore_failed` when even that did not stick — the one case
 * where the bead's real bd status disagrees with the contract, which must be
 * recorded rather than left silent. It lives HERE rather than
 * in bd metadata because the bd contract surface is owned by dotfiles
 * (`docs/contracts/workflow.md`) and beads-ui only consumes it; this is
 * server-owned queue state about a lane member, exactly like {@link admission}.
 */
/**
 * @typedef {Object} QueueOpResult
 * @property {boolean} ok - True when the mutation was applied.
 * @property {boolean} conflict - True when rejected by a revision mismatch.
 * @property {Queue} queue - Current snapshot (new on success, unchanged else).
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { EXEC_SETTING_ENUMS } from './exec-enums.js';
import { queueFilePath } from './state-paths.js';

/**
 * Default concurrency cap when a queue carries no (or an unusable) `slots`
 * value — worker-phase2 §3/§9.
 *
 * @type {number}
 */
export const DEFAULT_SLOTS = 2;

/**
 * Lower bound on the concurrency cap. 1 is the retired serial lane: exactly one
 * session at a time.
 *
 * @type {number}
 */
export const MIN_SLOTS = 1;

/**
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Coerce a candidate `slots` value to a usable cap, or null when it is not one.
 * A non-number, a non-integer, and anything below {@link MIN_SLOTS} are all
 * unusable — `setSlots` REJECTS those without a write (the stored value is never
 * corrupted, and the client learns its input was refused), while `normalize`
 * falls back to {@link DEFAULT_SLOTS} (a queue.json must always load).
 *
 * @param {unknown} value
 * @returns {number|null}
 */
function normalizeSlots(value) {
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return null;
  }
  return value >= MIN_SLOTS ? value : null;
}

/**
 * @returns {Queue}
 */
function emptyQueue() {
  return {
    revision: 0,
    auto_advance: false,
    exec_defaults: {},
    slots: DEFAULT_SLOTS,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    admission: {},
    cleanup_failed: {}
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
    session_id: fields.session_id ?? null,
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
    cause: fields.cause ?? null,
    merge_policy: fields.merge_policy ?? null,
    drift_policy: fields.drift_policy ?? null,
    demoted_reason: fields.demoted_reason ?? null,
    release_rejected: fields.release_rejected ?? null,
    done_kind: fields.done_kind ?? null,
    verify_cmd_result: fields.verify_cmd_result ?? null,
    exec_stamped_keys: Array.isArray(fields.exec_stamped_keys)
      ? fields.exec_stamped_keys
      : null,
    exec_values:
      fields.exec_values &&
      typeof fields.exec_values === 'object' &&
      !Array.isArray(fields.exec_values)
        ? fields.exec_values
        : null,
    resumed_from: fields.resumed_from ?? null,
    conflict_resolution: fields.conflict_resolution === true
  };
}

/**
 * Migrate a pre-worker-phase1 attempt record on load (spec §3). A user ■ used
 * to be recorded as `failed` + `cause:'stopped'`, which the UI renders as a
 * failure banner; the honest state is now `stopped` with no cause.
 *
 * Lane placement is deliberately NOT touched: retroactively pulling a bead out
 * of a lane would rewrite a queue the user built. §2.2's lane removal applies
 * only to ■ operations performed under this spec.
 *
 * @param {Record<string, unknown>} value
 * @returns {Record<string, unknown>}
 */
function migrateLegacyStopped(value) {
  if (value.status === 'failed' && value.cause === 'stopped') {
    return { ...value, status: 'stopped', cause: null };
  }
  return value;
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
  q.slots = normalizeSlots(raw.slots) ?? DEFAULT_SLOTS;
  // LEGACY MERGE (worker-phase2 §9): a queue.json from the serial/parallel
  // regime has no `queue` key, so its two lanes fold into the single lane —
  // ALL of `serial` first (it was the priority lane), then `parallel`, each
  // lane's internal order untouched. `normalizeLane`'s first-wins dedupe now
  // also spans the concatenation, so a bead recorded in both lanes keeps its
  // (earlier) serial position instead of appearing twice.
  q.queue = normalizeLane(
    [raw.queue, raw.serial, raw.parallel].filter(Array.isArray).flat()
  );
  // A queue.json written before the pr_wait lane existed simply has no key →
  // empty lane. Past `done` entries STAY in `done`: a pr_stop completion from
  // the old regime is not retroactively re-filed as "awaiting a merge click"
  // (worker-phase2 §9 — never rewrite a queue the user built).
  q.pr_wait = normalizeLane(raw.pr_wait);
  q.done = normalizeLane(raw.done);
  if (isRecord(raw.attempts)) {
    for (const [key, value] of Object.entries(raw.attempts)) {
      if (isRecord(value) && typeof value.bead_id === 'string') {
        q.attempts[key] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...migrateLegacyStopped(value),
            attempt_id: key,
            bead_id: value.bead_id
          })
        );
      }
    }
  }
  // A legacy queue.json carrying the retired workspace-global `merge_policy` /
  // `drift_policy` simply has no destination field here, so the keys are DROPPED
  // on load without error (worker-phase2 §9).
  // Retired keys (`worker_runner`) and values outside the current catalog (the
  // old codex `gpt-5.*` orchestration models) have no entry here, so they are
  // dropped on load and the setting falls back to unset (spec §3).
  if (isRecord(raw.exec_defaults)) {
    for (const [key, value] of Object.entries(raw.exec_defaults)) {
      const allowed = EXEC_SETTING_ENUMS[key];
      if (allowed && typeof value === 'string' && allowed.includes(value)) {
        q.exec_defaults[key] = value;
      }
    }
  }
  if (isRecord(raw.admission)) {
    for (const [bead_id, value] of Object.entries(raw.admission)) {
      if (isRecord(value) && typeof value.reason === 'string') {
        q.admission[bead_id] = {
          reason: value.reason,
          at: typeof value.at === 'number' ? value.at : 0
        };
      }
    }
  }
  // A queue.json written before Phase 5 simply has no key → empty map, which
  // reads as "no bead is awaiting a cleanup fix" (worker-phase2 §6).
  if (isRecord(raw.cleanup_failed)) {
    for (const [bead_id, value] of Object.entries(raw.cleanup_failed)) {
      if (isRecord(value) && typeof value.reason === 'string') {
        q.cleanup_failed[bead_id] = {
          step: typeof value.step === 'string' ? value.step : '',
          reason: value.reason,
          bd_restore:
            typeof value.bd_restore === 'string' ? value.bd_restore : null,
          at: typeof value.at === 'number' ? value.at : 0
        };
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
 * Remove a bead from every lane (used for two-way moves + dedupe).
 *
 * @param {Queue} q
 * @param {string} bead_id
 */
function removeFromLanes(q, bead_id) {
  q.queue = q.queue.filter((e) => e.bead_id !== bead_id);
  q.pr_wait = q.pr_wait.filter((e) => e.bead_id !== bead_id);
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
     * Place a bead into the waiting `queue` at an index, removing it from every
     * other lane (dedupe). CAS-guarded.
     *
     * There is no `lane` input any more: with the serial/parallel split gone
     * (worker-phase2 §3) the only placeable lane is `queue`, so an argument
     * with one legal value would be pure ceremony — and a stale client that
     * still sends `lane:'serial'` now simply lands in the one queue instead of
     * being rejected.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, index?: number }} input
     * @returns {QueueOpResult}
     */
    place(workspace, input) {
      const { expected_revision, bead_id, index } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        removeFromLanes(next, bead_id);
        const arr = next.queue;
        arr.splice(clampIndex(index ?? arr.length, arr.length), 0, {
          bead_id,
          added_at: now()
        });
        return true;
      });
    },

    /**
     * Reorder a bead within the waiting `queue`. CAS-guarded.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id: string, to_index: number }} input
     * @returns {QueueOpResult}
     */
    reorder(workspace, input) {
      const { expected_revision, bead_id, to_index } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const arr = next.queue;
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
     * Set the concurrency cap (worker-phase2 §3). CAS-guarded, mirroring
     * {@link toggleAutoAdvance}. A value that is not an integer ≥ 1 is REJECTED
     * (`ok:false, conflict:false`) without a write, so a malformed client input
     * can never corrupt the stored cap.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, slots: unknown }} input
     * @returns {QueueOpResult}
     */
    setSlots(workspace, input) {
      const { expected_revision, slots } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const value = normalizeSlots(slots);
        if (value === null) {
          return false;
        }
        next.slots = value;
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
        delete next.admission[bead_id];
        // A bead the user pulled out of every lane carries no pending cleanup
        // banner either — the record describes a lane member (§6).
        delete next.cleanup_failed[bead_id];
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
     * Discard an attempt: write its terminal patch AND drop the bead from every
     * lane + its admission badge in ONE persist (worker-phase1 §2.2).
     *
     * Splitting this into `updateAttempt` + `remove` would leave a window where
     * a CAS conflict or a restart between the two writes yields "attempt
     * stopped but bead still queued", which breaks the discard guarantee (the
     * next tick would re-dispatch the bead the user just discarded).
     * Scheduler-owned (no CAS), like the other lifecycle transitions.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, bead_id: string, patch: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    discardAttempt(workspace, input) {
      const { attempt_id, bead_id, patch } = input;
      return applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur || typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        next.attempts[attempt_id] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...cur,
            ...patch,
            attempt_id,
            bead_id: cur.bead_id
          })
        );
        removeFromLanes(next, bead_id);
        delete next.admission[bead_id];
        return true;
      });
    },

    /**
     * Move a bead into the PR-wait lane: write the attempt's terminal patch AND
     * place the bead in `pr_wait` in ONE persist (worker-phase2 §4).
     *
     * Same rationale as {@link discardAttempt}: splitting this into
     * `updateAttempt` + a lane move leaves a window where a restart between the
     * two writes yields "attempt done but bead still queued", and the next tick
     * would re-dispatch a bead whose PR is already open. Scheduler-owned (no
     * CAS), like the other lifecycle transitions.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id: string, patch: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    moveToPrWait(workspace, input) {
      const { bead_id, attempt_id, patch } = input;
      return applyUnconditional(workspace, (next) => {
        const cur = next.attempts[attempt_id];
        if (!cur || typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        next.attempts[attempt_id] = makeAttempt(
          /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
            ...cur,
            ...patch,
            attempt_id,
            bead_id: cur.bead_id
          })
        );
        removeFromLanes(next, bead_id);
        next.pr_wait.push({ bead_id, added_at: now() });
        return true;
      });
    },

    /**
     * Move a bead into the Done lane (removing it from every other lane).
     * Scheduler-owned (no CAS). Wired by Phase 5's post-merge cleanup as its
     * LAST step: a bead reaches `done` only after the whole pr-finish order ran
     * through (worker-phase2 §6).
     *
     * Any `cleanup_failed` record is dropped in the SAME mutation — a bead that
     * completed cleanup cannot simultaneously be one awaiting a human fix, and
     * splitting that into a second write would leave the banner up after a
     * successful retry.
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
        delete next.cleanup_failed[bead_id];
        next.done.push({ bead_id, added_at: now() });
        return true;
      });
    },

    /**
     * Move a bead OUT of `pr_wait` and back onto the tail of the waiting
     * `queue` in ONE persist — the lane half of [재실행] (worker-phase2 §6).
     *
     * Atomicity is the point, twice over. A split write could leave the bead in
     * neither lane (a crash between remove and place loses queued work), and —
     * the reason the spec calls the transition order-sensitive — the poller
     * classifies PR state only for beads that are IN `pr_wait`, so the rerun's
     * own `gh pr close` must stop being visible to it in a single step rather
     * than across a window where the bead is half-moved.
     *
     * Any stale admission / cleanup_failed record for the bead is dropped: this
     * is a fresh run from a fresh base, so nothing recorded about the discarded
     * attempt still applies. Scheduler-owned (no CAS).
     *
     * @param {string} workspace
     * @param {{ bead_id: string }} input
     * @returns {QueueOpResult}
     */
    requeueFromPrWait(workspace, input) {
      const { bead_id } = input;
      return applyUnconditional(workspace, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        if (!next.pr_wait.some((e) => e.bead_id === bead_id)) {
          return false;
        }
        removeFromLanes(next, bead_id);
        delete next.admission[bead_id];
        delete next.cleanup_failed[bead_id];
        next.queue.push({ bead_id, added_at: now() });
        return true;
      });
    },

    /**
     * Record that a post-merge cleanup stopped at `step` (worker-phase2 §6).
     * DURABLE + terminal: nothing clears this on a timer and nothing retries —
     * the bead stays where it is, bd stays `resolved`, and the banner returns
     * the situation to a human. Scheduler-owned (no CAS).
     *
     * `bd_restore` carries what happened to the bead's status when the stop came
     * at or after the parent close; omit it for the earlier steps, which never
     * touched bd.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, step: string, reason: string, bd_restore?: string|null }} input
     * @returns {QueueOpResult}
     */
    recordCleanupFailure(workspace, input) {
      const { bead_id, step, reason, bd_restore } = input;
      return applyUnconditional(workspace, (next) => {
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof reason !== 'string' ||
          reason.length === 0
        ) {
          return false;
        }
        next.cleanup_failed[bead_id] = {
          step: typeof step === 'string' ? step : '',
          reason,
          bd_restore: typeof bd_restore === 'string' ? bd_restore : null,
          at: now()
        };
        return true;
      });
    },

    /**
     * Clear a bead's cleanup-failure record (scheduler-owned, no CAS). No-op
     * (no revision bump) when absent.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {QueueOpResult}
     */
    clearCleanupFailure(workspace, bead_id) {
      return applyUnconditional(workspace, (next) => {
        if (!Object.hasOwn(next.cleanup_failed, bead_id)) {
          return false;
        }
        delete next.cleanup_failed[bead_id];
        return true;
      });
    },

    /**
     * Set (or unset with null/'') a workspace-global exec-setting default. CAS-
     * guarded: unknown keys and non-enum values are
     * rejected without a write. `orchestration_model` is validated against the
     * runner UNION here (runner↔model cross-compatibility is a dispatch-resolve
     * / UI-filter concern, not a set-time one — spec §2).
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, key: string, value: unknown }} input
     * @returns {QueueOpResult}
     */
    setExecDefault(workspace, input) {
      const { expected_revision, key, value } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const allowed = EXEC_SETTING_ENUMS[key];
        if (!allowed) {
          return false;
        }
        if (value === null || value === '') {
          delete next.exec_defaults[key];
          return true;
        }
        if (typeof value !== 'string' || !allowed.includes(value)) {
          return false;
        }
        next.exec_defaults[key] = value;
        return true;
      });
    },

    /**
     * Record why a bead was refused or skipped (scheduler-owned, no CAS). A
     * DIFFERENT reason overwrites the prior record; the SAME reason is an
     * atomic no-op (`ok:false`, no revision bump). The guard lives here rather
     * than in the caller because `tick()` is not serialized — concurrent passes
     * reading the same stale "nothing recorded" snapshot would each write and
     * fan out, and a permanently not-ready bead would bump the revision on
     * every tick. `ok` therefore reports whether the record was APPLIED, which
     * is what the scheduler gates its fanout on.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, reason: string }} input
     * @returns {QueueOpResult}
     */
    recordAdmission(workspace, input) {
      const { bead_id, reason } = input;
      return applyUnconditional(workspace, (next) => {
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof reason !== 'string' ||
          reason.length === 0
        ) {
          return false;
        }
        const prior = next.admission[bead_id];
        if (prior && prior.reason === reason) {
          return false;
        }
        next.admission[bead_id] = { reason, at: now() };
        return true;
      });
    },

    /**
     * Clear a bead's admission record (scheduler-owned, no CAS). No-op (no
     * revision bump) when absent.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {QueueOpResult}
     */
    clearAdmission(workspace, bead_id) {
      return applyUnconditional(workspace, (next) => {
        if (!Object.hasOwn(next.admission, bead_id)) {
          return false;
        }
        delete next.admission[bead_id];
        return true;
      });
    },

    /**
     * Force the auto_advance flag (scheduler-owned, no CAS) — used to turn
     * execution OFF on a session failure or an orphan reap, which together with
     * the failure banner IS the halt behaviour (worker-phase2 §2).
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
