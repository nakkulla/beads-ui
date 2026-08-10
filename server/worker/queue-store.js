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
 * @property {{ pinned?: string, observed?: string, landed?: boolean, via?: string, shas?: string[], pushed?: string[], inherited?: string[], skipped?: string, error?: string }|null} base_drift -
 * The POST-HOC base observation (UI-8mvc §3, rebuilt UI-1xcd §4), written at
 * every termination path: the pinned `base_oid`, the remote tip re-resolved
 * after the session ended, and — from the attempt's OWN pre-push record —
 * whether it pushed at its base and whether that push is on the base now.
 * `pushed` holds the base-destined oids the hook recorded (present as `[]` when
 * the record was readable and held none); `shas` narrows that to the ones
 * reachable from the observed tip, which is a violation's whole evidence.
 * `skipped` records an attempt the invariant does not apply to (a disposition,
 * or an external-conflict dispatch with no pinned base) and `error` the
 * observation step that could not be completed — including `push_log_absent`,
 * the attempt dispatched before the record existed. A failed observation is
 * deliberately NOT a violation. Null on every attempt observed before the field
 * existed and on one whose base never moved: there is nothing to say.
 * `inherited` is retired (the reflog precedence stage it belonged to is gone)
 * and kept in the shape only so a legacy record round-trips.
 * @property {string|null} repo - Target repo root (the reconcile's observation
 * scope: a dead attempt's PR is looked for in THIS repo).
 * @property {string|null} status - Attempt lifecycle: running/done/failed/
 * orphaned/paused/stopped. `paused` (tile ⏸, resumable) and `stopped` (tile ■,
 * terminal) are user actions and carry no `cause` — the state is the meaning.
 * @property {string|null} workflow_mode_prior - workflow_mode value snapshotted before launch (null=was unset).
 * @property {string|null} target_base - Merge target base at dispatch.
 * @property {number|null} finished_at - Epoch ms the attempt terminated.
 * @property {string|null} cause - Failure cause (failure banner reason).
 * @property {{ reason: string, command: string|null }|null} cause_detail -
 * What the fail-closed path actually caught, when the cause alone cannot say
 * it (UI-2o4z §2): the guard `reason` plus the simple command it matched
 * (`command` null for an interactive-question blocker). Only the
 * `loud_fail_blocker` cause carries one; every other failure leaves it null.
 * @property {number|null} dismissed_at - Epoch ms a human closed (✕) this
 * failure's banner, declaring it handled. Null means "still unhandled", which
 * is one of the two ways the UI stops showing a failure banner (the other is
 * being superseded by a later attempt for the same bead).
 * @property {{ input_tokens: number, output_tokens: number, cache_read_input_tokens: number, cache_creation_input_tokens: number, total_cost_usd?: number }|null} usage -
 * Token usage this attempt consumed (UI-raqh §1), persisted when the session
 * ends (success/failure/pause/stop) from the live tally in `usage-store.js`.
 * Null on an attempt whose runner reported none and on every record written
 * before the field existed — the display is fail-quiet, so a null simply
 * renders nothing.
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
 * so a restart's reconcile can revert them; null when nothing was stamped.
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
 * recorded durably: a reconcile pass or a restart must be able to see what kind
 * of attempt this was. Defaults false — a missing value fails closed.
 * @property {boolean} external_conflict - Whether this resolution attempt was
 * dispatched for an EXTERNAL PR row (UI-w0hi §1) — a bead a normal session
 * delivered, which the durable lanes never held. It is what routes the two
 * termination paths away from `moveToPrWait`: a successful external resolution
 * must close its attempt WITHOUT injecting the bead into the durable `pr_wait`
 * lane, whose membership stays the external overlay's. Durable because the
 * restart-recovery path (`disposeDeadAttempt`) has no in-memory record of what
 * kind of attempt it is disposing. Defaults false — a missing value fails
 * closed onto the ordinary completion.
 * @property {{ reason: string, command: string|null, at: number }|null} guard_kill -
 * The fail-closed evidence a DETACHED session monitor recorded before killing an
 * orphan session (UI-o2yt §3.3). A killed session leaves no verdict behind, so
 * the reconcile pass would judge it by `gh` alone and read an already-pushed PR
 * as success; this record is what makes that disposition fail closed instead.
 * Written before the signal, so it survives even when the kill itself does not
 * happen (a pid that turned out to be dead or recycled). Null on every attempt
 * no monitor ever stopped.
 * @property {{ reason: string, command: string|null, at: number }[]|null} guard_warnings -
 * The guard verdicts this attempt drew that did NOT end it (UI-1xcd §1). A
 * `warn` lets the session run on, so the only trace it used to leave was a
 * stream event nothing persisted — and `base_merge` moved onto that path, which
 * makes "the session merged the base into its branch" a fact worth having after
 * the session is gone. Accumulated in dispatch order by the live path and by
 * the restart monitor alike, and BOUNDED at normalize time
 * ({@link GUARD_WARNINGS_CAP} entries, {@link GUARD_WARNING_COMMAND_MAX}
 * characters of command) so a chatty session cannot grow `queue.json` without
 * limit. Null on an attempt that drew none and on every record written before
 * the field existed.
 * @property {boolean} spec_review_stale - Whether this attempt was dispatched
 * with a stale spec_review receipt (UI-dlim §3.2), i.e. the session was asked
 * to run the contract's in-session re-review lane before implementing. Recorded
 * durably so the activity log and the UI can tell a plain attempt from one that
 * spent its opening on a receipt refresh. Defaults false.
 * @property {string|null} disposition - Which REVISE-parking disposition this
 * attempt is (UI-hs11 §3.3), or null for an ordinary implementation attempt.
 * Recorded durably because it is what routes the termination away from the
 * PR-existence verdict — a session that opens no PR must not be judged by one,
 * and a restart has to be able to tell the two kinds apart.
 * @property {string|null} disposition_receipt - The `spec_review` value the
 * disposition is replacing. Durable for the same reason: after a restart the
 * completion verdict has no in-memory record of what the receipt used to be,
 * and "the receipt changed" is the whole judgment.
 * @property {boolean} disposition_resume - Whether this disposition attempt was
 * launched with the `--resume` argv. A resume whose transcript turned out to be
 * gone is retried ONCE as a fresh substitute session, and this flag is what
 * bounds that retry to one.
 * @property {string|null} disposition_prompt - The task prompt this disposition
 * was launched with. Durable so the substitute session can be launched with the
 * identical instruction without re-deriving it — and so a restart can too.
 * @property {string|null} system_prompt - The contract this attempt was sent on
 * the `--append-system-prompt` channel (UI-rxp3 §3), verbatim. Written at spawn
 * from the same `buildArgv` result the argv came from, so it is what the process
 * received rather than a reconstruction. Null on every attempt recorded before
 * the field existed — the reader treats that as "기록 없음", never as empty.
 * @property {string|null} task_prompt - The positional task prompt of the same
 * spawn, on the same terms. Distinct from {@link Attempt.disposition_prompt},
 * which is the disposition lane's own relaunch input and is kept for that.
 * NEITHER field rides the worker-state push: the projection strips both
 * (`worker-handlers.js`), and the UI fetches them on demand.
 */
/**
 * @typedef {Object} Queue
 * @property {number} revision - CAS counter; bumped on every mutation.
 * @property {boolean} auto_advance - Whether the scheduler may start sessions.
 * @property {string|null} default_exec_preset_id - The selected server-global
 * preset reference. Queue state never owns a copy of preset settings.
 * @property {boolean} pr_wait_holds_slot - Whether dispatch runs serially until
 * each durable PR wait leaves through merge cleanup or discard. The legacy key
 * name remains stable; the stored `slots` preference is not overwritten.
 * @property {Record<string, string>} exec_defaults - Workspace-global exec
 * setting defaults (subset of the 5 exec keys; an unset key is absent). Only
 * valid enum values survive normalize. An absent key leaves dispatch on the
 * final fallback: `opus` for orchestration_model, unset for the other 3.
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
 * @property {Record<string, { reason: string, at: number, stale?: true }>} admission -
 * Auto-run admission observations by bead_id (badge display). Cleared only on a
 * successful dispatch or queue removal — never auto-expired. `stale:true` marks
 * the ONE non-blocking record (UI-dlim §3.4): the bead was ADMITTED with a
 * stale spec_review receipt, so the badge must not read as a refusal. Every
 * record without the flag is a refusal, exactly as before.
 * @property {Record<string, { step: string, reason: string, bd_restore: string|null, at: number, detail: string|null, output_tail?: string, log_path?: string }>} cleanup_failed -
 * Beads whose post-merge cleanup stopped part-way (worker-phase2 §6). DURABLE
 * on purpose: the PR is already merged and irreversible, the bead is left
 * `resolved`, and nothing retries by itself — so the record that a human must
 * finish the cleanup has to outlive a server restart. `bd_restore` is null when
 * the stop happened BEFORE the parent close (bd was never touched, so `resolved`
 * still holds by itself), `restored` when the close was undone back to
 * `resolved`, and `restore_failed` when even that did not stick — the one case
 * where the bead's real bd status disagrees with the contract, which must be
 * recorded rather than left silent. `detail` is the failing step's own
 * diagnostic text (e.g. the git stderr behind `verify_worktree_failed`,
 * UI-2o4z §3); null on a record that carries none, including every record
 * written before the field existed. `output_tail` is the failing command's own
 * trailing output (UI-qult §1) — absent, not null, on every record that has
 * none. `log_path` is the absolute path to that command's FULL preserved output
 * (UI-0x54), which the capped `output_tail` cannot hold; absent when the run
 * wrote no complete log file, and overwritten by a cleanup retry's own run.
 * Both live HERE rather than
 * in bd metadata because the bd contract surface is owned by dotfiles
 * (`docs/contracts/workflow.md`) and beads-ui only consumes it; this is
 * server-owned queue state about a lane member, exactly like {@link admission}.
 * @property {MergeQueueEntry[]} merge_queue - The sequential merge queue
 * (UI-5v7d §1), FIFO. DURABLE because a `pr_wait` merge deploys, and a beads-ui
 * deploy restarts this very server: a queue that lived in memory would be lost
 * exactly when it is half-done. `resolution_rounds` is durable for the same
 * reason — the per-item conflict-resolution cap has to hold ACROSS that
 * restart, not just within one process life. Everything else the driver knows
 * (which item is active, why one failed, the waiting clocks) stays in memory
 * like {@link Queue.admission}'s live siblings: after a restart nothing is in
 * flight.
 * @property {boolean} auto_merge - Whether the auto-merge enroller may keep
 * feeding eligible `pr_wait` rows into {@link Queue.merge_queue} (UI-yk55 §2).
 * DURABLE, unlike {@link Queue.auto_advance}: merging beads-ui DEPLOYS beads-ui,
 * which restarts this process, so a flag kept in memory would switch itself off
 * exactly when the queue merged its own repository. The restart-safety argument
 * that forces `auto_advance` to false on load does not apply — nothing here
 * resumes a half-run session, and the enroller's own members are re-judged by
 * the driver at their turn.
 * @property {Record<string, MergeSkip>} auto_merge_skips - Beads the driver gave
 * up on, by bead_id, each pinned to the head SHA it failed at (UI-yk55 §3).
 * DURABLE for the same reason as the flag, and it is what stops the enroller
 * from re-queuing a failed item forever: `enqueueMerge` resets
 * `resolution_rounds` to 0, so an automatic re-entry on the SAME head would hand
 * a conflict item an endless supply of resolution sessions. A record is dropped
 * as soon as the head moves (someone actually changed the branch), when a human
 * clicks [머지] on the row, or when the bead leaves the lane.
 * @property {LastDeploy|null} last_deploy - The workspace's most recent
 * post-merge deployment (worker-deploy-hook §3). ONE record, overwritten each
 * time — the question it answers is "is the running service the merged code?",
 * which only the latest deploy can answer. Null on a workspace that has never
 * deployed (no `[worker.deploy]` section, or none run yet).
 * @property {ShipFailure|null} ship_failure - The workspace's outstanding
 * capability-ship failure (UI-4ii4). WORKSPACE level rather than per-lane-member
 * for one reason: the ship step runs AFTER the parent close, and an external PR
 * row exists only while its bead is `resolved` + `pr_url` (UI-7agi) — so by the
 * time this can fail, that row has already vanished from the next scan and
 * `cleanup_failed` (lane-member state) would be written nowhere. The record
 * outliving the row is what keeps a failed ship from being silent. One record,
 * overwritten; cleared by the next successful ship step.
 */
/**
 * @typedef {Object} ShipFailure
 * @property {string} bead_id - The merged bead whose ship step stopped.
 * @property {string} reason - The failure vocabulary from
 * `ship-capabilities.js` (`ship_failed:<cap>`, `ship_readback_failed:<cap>`,
 * `ship_target_mismatch:<cap>`, `ship_read_failed:<id>`,
 * `export_removal_failed:<id>:<cap>`, `ship_unavailable`).
 * @property {string|null} detail - The remaining work (`pending=… unread=…`);
 * null when the failure carried none.
 * @property {string|null} pr_url - The PR that was merged, so the banner can
 * name what a human is being asked to finish.
 * @property {number} at - Epoch ms of the record.
 */
/**
 * One member of the sequential merge queue (UI-5v7d §1).
 *
 * @typedef {Object} MergeQueueEntry
 * @property {string} bead_id - The `pr_wait` bead awaiting its merge turn.
 * @property {number} resolution_rounds - How many conflict-resolution rounds
 * this item has already consumed. Persisted so the 2-round cap survives the
 * deploy restart a merge can trigger.
 */
/**
 * One auto-merge exclusion record (UI-yk55 §3.2).
 *
 * @typedef {Object} MergeSkip
 * @property {string} head_sha - The head SHA OBSERVED when the driver gave up.
 * The exclusion holds only while the branch still points there; a different head
 * means someone (a resolution session, a human) moved it, and the row becomes a
 * candidate again.
 * @property {string} reason - The driver's own skip vocabulary, so the row can
 * say WHY it is being passed over with the same words the failure badge uses.
 * @property {number} at - Epoch ms of the disposition.
 */
/**
 * @typedef {Object} LastDeploy
 * @property {'deployed'|'launched'|'failed'} outcome - `deployed` = the
 * synchronous command exited 0; `launched` = a DETACHED command was started
 * after the cleanup was durably recorded — an intent, NOT a confirmation (a
 * self-restarting deploy kills the observer, so nothing can confirm it);
 * `failed` = it ran and did not succeed, or never started.
 * @property {string|null} reason - The failure vocabulary
 * (`deploy_failed` / `deploy_timeout` / `deploy_spawn_error` /
 * `deploy_verify_missing` / `deploy_base_not_synced`); null on a success.
 * @property {string} bead_id - The merge whose cleanup ran this deploy.
 * @property {string} base_sha - The base commit that was deployed.
 * @property {number} at - Epoch ms of the record.
 * @property {string} [detail] - The failure's own diagnostic text (UI-l53x §4):
 * the guard behind `deploy_base_not_synced`, or the spawn error behind
 * `deploy_spawn_error`. ABSENT — not null — on a record that has none, the same
 * rule `cleanup_failed.output_tail`/`log_path` follow. The 512-char cap lives on
 * the producer (`errorDetail`), not here.
 * @property {string} [log_path] - Absolute path to the deploy command's FULL
 * preserved output (UI-l53x §1). Present only for a SYNCHRONOUS deploy that
 * reached the runner and whose log file completed; a detached deploy has no
 * observable output at all, and a pre-run refusal never opened a file.
 */
/**
 * @typedef {Object} QueueOpResult
 * @property {boolean} ok - True when the mutation was applied.
 * @property {boolean} conflict - True when rejected by a revision mismatch.
 * @property {Queue} queue - Current snapshot (new on success, unchanged else).
 * @property {string} [reason] - Why a non-conflict rejection happened, for the
 * ops that distinguish causes (only {@link createQueueStore}'s `dismissAttempt`
 * today); absent when there is nothing to distinguish.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { execSettingEnums } from './exec-enums.js';
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
 * The deploy outcomes the record accepts. Anything else is not a vocabulary the
 * UI can render, so it is refused on write and dropped on load.
 *
 * @type {string[]}
 */
const DEPLOY_OUTCOMES = ['deployed', 'launched', 'failed'];

/**
 * @returns {Queue}
 */
function emptyQueue() {
  return {
    revision: 0,
    auto_advance: false,
    pr_wait_holds_slot: false,
    default_exec_preset_id: null,
    exec_defaults: {},
    slots: DEFAULT_SLOTS,
    queue: [],
    pr_wait: [],
    done: [],
    attempts: {},
    admission: {},
    cleanup_failed: {},
    merge_queue: [],
    auto_merge: false,
    auto_merge_skips: {},
    last_deploy: null,
    ship_failure: null
  };
}

/**
 * Normalize the durable auto-merge exclusion map. A record missing the head SHA
 * it is pinned to is DROPPED rather than kept: the whole exclusion is "this head
 * already failed", and a record that cannot name a head would exclude the row
 * forever.
 *
 * @param {unknown} raw
 * @returns {Record<string, MergeSkip>}
 */
function normalizeMergeSkips(raw) {
  /** @type {Record<string, MergeSkip>} */
  const out = {};
  if (!isRecord(raw)) {
    return out;
  }
  for (const [bead_id, value] of Object.entries(raw)) {
    if (
      !isRecord(value) ||
      typeof value.head_sha !== 'string' ||
      value.head_sha.length === 0
    ) {
      continue;
    }
    out[bead_id] = {
      head_sha: value.head_sha,
      reason: typeof value.reason === 'string' ? value.reason : '',
      at:
        typeof value.at === 'number' && Number.isFinite(value.at) ? value.at : 0
    };
  }
  return out;
}

/**
 * Normalize the durable merge queue: entry order is the FIFO order, a bead may
 * appear once, and a missing/unusable `resolution_rounds` reads as 0 (which is
 * what "no round consumed yet" means, and is the safe direction — it can only
 * grant rounds the cap would otherwise have to guess about).
 *
 * @param {unknown} arr
 * @returns {MergeQueueEntry[]}
 */
function normalizeMergeQueue(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }
  /** @type {MergeQueueEntry[]} */
  const out = [];
  const seen = new Set();
  for (const raw of arr) {
    if (!isRecord(raw) || typeof raw.bead_id !== 'string' || !raw.bead_id) {
      continue;
    }
    if (seen.has(raw.bead_id)) {
      continue;
    }
    seen.add(raw.bead_id);
    out.push({
      bead_id: raw.bead_id,
      resolution_rounds:
        typeof raw.resolution_rounds === 'number' &&
        Number.isFinite(raw.resolution_rounds) &&
        raw.resolution_rounds > 0
          ? Math.floor(raw.resolution_rounds)
          : 0
    });
  }
  return out;
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
 * How many surviving guard verdicts one attempt keeps, and how much of the
 * command each keeps (UI-1xcd §1, implementation review 2026-08-04).
 *
 * `queue.json` is durable and rewritten on every attempt update, so an
 * unbounded append is a file that grows for as long as a session keeps warning.
 * The EARLIEST warnings are the ones kept: the first occurrence is what explains
 * how a session got where it did, and a full record stops changing.
 *
 * @type {number}
 */
export const GUARD_WARNINGS_CAP = 50;

/** @type {number} */
export const GUARD_WARNING_COMMAND_MAX = 500;

/**
 * Normalize a guard-warning list onto its bounded shape.
 *
 * @param {unknown[]} raw
 * @returns {{ reason: string, command: string|null, at: number }[]}
 */
function boundGuardWarnings(raw) {
  /** @type {{ reason: string, command: string|null, at: number }[]} */
  const out = [];
  for (const entry of raw) {
    if (out.length >= GUARD_WARNINGS_CAP) {
      break;
    }
    if (!isRecord(entry)) {
      continue;
    }
    const command =
      typeof entry.command === 'string'
        ? entry.command.slice(0, GUARD_WARNING_COMMAND_MAX)
        : null;
    out.push({
      reason: typeof entry.reason === 'string' ? entry.reason : '',
      command,
      at: typeof entry.at === 'number' ? entry.at : 0
    });
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
    base_drift: isRecord(fields.base_drift)
      ? /** @type {Attempt['base_drift']} */ (fields.base_drift)
      : null,
    repo: fields.repo ?? null,
    status: fields.status ?? null,
    workflow_mode_prior: fields.workflow_mode_prior ?? null,
    target_base: fields.target_base ?? null,
    merge_sha: fields.merge_sha ?? null,
    finished_at: fields.finished_at ?? null,
    cause: fields.cause ?? null,
    cause_detail: isRecord(fields.cause_detail)
      ? /** @type {{ reason: string, command: string|null }} */ (
          fields.cause_detail
        )
      : null,
    dismissed_at: fields.dismissed_at ?? null,
    usage: isRecord(fields.usage)
      ? /** @type {Attempt['usage']} */ (fields.usage)
      : null,
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
    conflict_resolution: fields.conflict_resolution === true,
    external_conflict: fields.external_conflict === true,
    guard_kill: isRecord(fields.guard_kill)
      ? /** @type {Attempt['guard_kill']} */ (fields.guard_kill)
      : null,
    guard_warnings: Array.isArray(fields.guard_warnings)
      ? /** @type {Attempt['guard_warnings']} */ (
          boundGuardWarnings(fields.guard_warnings)
        )
      : null,
    spec_review_stale: fields.spec_review_stale === true,
    disposition: fields.disposition ?? null,
    disposition_receipt: fields.disposition_receipt ?? null,
    disposition_resume: fields.disposition_resume === true,
    disposition_prompt: fields.disposition_prompt ?? null,
    system_prompt: fields.system_prompt ?? null,
    task_prompt: fields.task_prompt ?? null
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
  q.pr_wait_holds_slot = raw.pr_wait_holds_slot === true;
  q.default_exec_preset_id =
    typeof raw.default_exec_preset_id === 'string' &&
    raw.default_exec_preset_id.trim().length > 0
      ? raw.default_exec_preset_id.trim()
      : null;
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
  // Retired keys (`worker_runner`, and `review_model` since dotfiles-mqcj) and
  // values outside the current catalog (the old codex `gpt-5.*` orchestration
  // models) have no entry here, so they are dropped on load and the setting
  // falls back to unset (spec §3). A dropped `review_model` is NOT migrated into
  // the per-step keys — the split contract has no dual read.
  if (isRecord(raw.exec_defaults)) {
    // Resolved at CALL time, never at module load: the enum table is catalog-
    // derived and the catalog is a config-file input.
    const enums = execSettingEnums();
    for (const [key, value] of Object.entries(raw.exec_defaults)) {
      const allowed = enums[key];
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
        // Absent on every record written before UI-dlim → reads as a refusal,
        // which is what those records were.
        if (value.stale === true) {
          q.admission[bead_id].stale = true;
        }
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
          at: typeof value.at === 'number' ? value.at : 0,
          detail: typeof value.detail === 'string' ? value.detail : null
        };
        if (typeof value.output_tail === 'string') {
          q.cleanup_failed[bead_id].output_tail = value.output_tail;
        }
        if (typeof value.log_path === 'string') {
          q.cleanup_failed[bead_id].log_path = value.log_path;
        }
      }
    }
  }
  // A queue.json written before UI-5v7d has no key → empty queue, which reads
  // as "nothing is waiting to merge" — the state a restart should resume into.
  q.merge_queue = normalizeMergeQueue(raw.merge_queue);
  // A queue.json written before UI-yk55 has neither key → auto-merge OFF with no
  // exclusions, which is the state every such workspace was actually in. Unlike
  // `auto_advance` the stored value IS honoured on load — see the field doc.
  q.auto_merge = raw.auto_merge === true;
  q.auto_merge_skips = normalizeMergeSkips(raw.auto_merge_skips);
  // A queue.json written before the deploy hook simply has no key → null, which
  // reads as "this workspace has never deployed" (worker-deploy-hook §3). A
  // record carrying an outcome outside the vocabulary is dropped the same way:
  // an unrenderable record and no record mean the same thing to the reader.
  q.last_deploy = normalizeLastDeploy(raw.last_deploy);
  // A queue.json written before UI-4ii4 has no key → null, which reads as "no
  // capability ship is outstanding" — true of every queue from before the step
  // existed.
  q.ship_failure = normalizeShipFailure(raw.ship_failure);
  // auto_advance intentionally left false — see load() restart-safety note.
  return q;
}

/**
 * @param {unknown} value
 * @returns {ShipFailure|null}
 */
function normalizeShipFailure(value) {
  if (
    !isRecord(value) ||
    typeof value.reason !== 'string' ||
    value.reason.length === 0
  ) {
    return null;
  }
  return {
    bead_id: typeof value.bead_id === 'string' ? value.bead_id : '',
    reason: value.reason,
    detail:
      typeof value.detail === 'string' && value.detail.length > 0
        ? value.detail
        : null,
    pr_url:
      typeof value.pr_url === 'string' && value.pr_url.length > 0
        ? value.pr_url
        : null,
    at: typeof value.at === 'number' ? value.at : 0
  };
}

/**
 * @param {unknown} value
 * @returns {LastDeploy|null}
 */
function normalizeLastDeploy(value) {
  if (
    !isRecord(value) ||
    typeof value.outcome !== 'string' ||
    !DEPLOY_OUTCOMES.includes(value.outcome)
  ) {
    return null;
  }
  /** @type {LastDeploy} */
  const record = {
    outcome: /** @type {'deployed'|'launched'|'failed'} */ (value.outcome),
    reason: typeof value.reason === 'string' ? value.reason : null,
    bead_id: typeof value.bead_id === 'string' ? value.bead_id : '',
    base_sha: typeof value.base_sha === 'string' ? value.base_sha : '',
    at: typeof value.at === 'number' ? value.at : 0
  };
  // Carried only when there is something to carry, so an older `queue.json` and
  // a record with no diagnostics both load as an ABSENT key.
  if (typeof value.detail === 'string' && value.detail.length > 0) {
    record.detail = value.detail;
  }
  if (typeof value.log_path === 'string' && value.log_path.length > 0) {
    record.log_path = value.log_path;
  }
  return record;
}

/**
 * Build a {@link LastDeploy} from a caller's input, or null when the input is
 * not a recordable outcome (which the mutations turn into a refused write).
 *
 * @param {unknown} input
 * @param {number} at
 * @returns {LastDeploy|null}
 */
function buildLastDeploy(input, at) {
  if (!isRecord(input)) {
    return null;
  }
  return normalizeLastDeploy({ ...input, at });
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
 * The merge queue goes with them (UI-5v7d §1): a merge turn only means anything
 * while the bead is in `pr_wait`, so a bead that left the lane — merged and
 * cleaned, discarded, dragged back to 대기 — must not keep a place in line. The
 * driver reads the same disappearance and moves on to the next item.
 *
 * @param {Queue} q
 * @param {string} bead_id
 */
function removeFromLanes(q, bead_id) {
  q.queue = q.queue.filter((e) => e.bead_id !== bead_id);
  q.pr_wait = q.pr_wait.filter((e) => e.bead_id !== bead_id);
  q.done = q.done.filter((e) => e.bead_id !== bead_id);
  q.merge_queue = q.merge_queue.filter((e) => e.bead_id !== bead_id);
  // The auto-merge exclusion describes a `pr_wait` member (UI-yk55 §3.2.1): a
  // bead that merged, was discarded, or was dragged back out of the lane carries
  // no exclusion into whatever happens to it next.
  delete q.auto_merge_skips[bead_id];
}

/**
 * Whether a bead may take a place in the merge queue (UI-wwby §2).
 *
 * The EXTERNAL bypass stays — an external row has no durable `pr_wait` entry to
 * be a member of, which is the whole reason it exists (UI-7agi §4) — but it is
 * now subordinate to lane exclusivity: a bead sitting in `queue` or `done` is
 * refused whatever the caller claims about it. That makes the store the final
 * gate rather than the overlay, so the exclusivity `removeFromLanes` just
 * established cannot be undone a moment later by a stale registry row. Both
 * enqueue paths share it deliberately: a manual [머지] click must not be a way
 * around a rule the automatic enroller obeys.
 *
 * @param {Queue} q
 * @param {string} bead_id
 * @param {boolean} external
 */
function enqueueMember(q, bead_id, external) {
  const in_other_lane =
    q.queue.some((e) => e.bead_id === bead_id) ||
    q.done.some((e) => e.bead_id === bead_id);
  if (in_other_lane) {
    return false;
  }
  return external || q.pr_wait.some((e) => e.bead_id === bead_id);
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
     * Toggle merge-serial dispatch through the durable PR-wait lifecycle. The
     * flag is durable because the wait routinely spans server restarts.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean }} input
     * @returns {QueueOpResult}
     */
    setPrWaitHoldsSlot(workspace, input) {
      const { expected_revision, on } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        next.pr_wait_holds_slot = !!on;
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
     * Stamp `dismissed_at` on a `failed`/`orphaned` attempt — the human ✕ that
     * declares a failure handled so its banner stops rendering. A USER-initiated
     * edit, so it runs the CAS path like the other client mutations; a stale
     * `expected_revision` rejects with `conflict:true`.
     *
     * Every other rejection is `conflict:false` + a `reason`, which is why the
     * checks live inside the mutate closure rather than in front of it: the
     * decision must read the same clone the write lands on, in ONE persist.
     * Dismissing an already-dismissed attempt is a REJECTION rather than a no-op
     * success — the first dismiss bumped the revision, so a double click is
     * normally caught by the CAS, and reporting success without a revision bump
     * would be the one inconsistent outcome.
     *
     * @param {string} workspace
     * @param {{ attempt_id: string, expected_revision: number }} input
     * @returns {QueueOpResult}
     */
    dismissAttempt(workspace, input) {
      const { attempt_id, expected_revision } = input;
      /** @type {string|null} */
      let reason = null;
      const result = applyMutation(workspace, expected_revision, (next) => {
        if (!Object.hasOwn(next.attempts, attempt_id)) {
          reason = 'attempt_not_found';
          return false;
        }
        const cur = next.attempts[attempt_id];
        if (cur.status !== 'failed' && cur.status !== 'orphaned') {
          reason = 'not_dismissable';
          return false;
        }
        if (typeof cur.dismissed_at === 'number') {
          reason = 'already_dismissed';
          return false;
        }
        next.attempts[attempt_id] = makeAttempt({
          ...cur,
          dismissed_at: now()
        });
        return true;
      });
      return reason === null ? result : { ...result, reason };
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
        // A bead RE-entering `pr_wait` keeps its place in the merge queue and
        // its consumed rounds (UI-5v7d §2): this transition is exactly what a
        // finished conflict-resolution attempt performs, and the driver is
        // sitting on that item waiting to re-merge it. Letting the lane-dedupe
        // drop the entry here would read to the driver as "the item is gone"
        // and silently cancel the automatic re-merge the whole feature exists
        // for. Every OTHER lane exit still drops it — see `removeFromLanes`.
        const queued_at = next.merge_queue.findIndex(
          (e) => e.bead_id === bead_id
        );
        const queued = queued_at >= 0 ? next.merge_queue[queued_at] : null;
        removeFromLanes(next, bead_id);
        if (queued) {
          // Its ORIGINAL position, not the head: a waiting item whose own
          // session finished must not overtake the queue.
          next.merge_queue.splice(queued_at, 0, queued);
        }
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
     * `attempt_id` + `patch` are OPTIONAL, and carrying them makes this the
     * `moveToPrWait` twin for the already-finished verdict (UI-b8n8 §접근 B): a
     * verify that observed a MERGED PR on a bead bd already holds as `closed`
     * terminates its attempt and lands the bead in `done` in ONE persist, so a
     * crash between the two cannot leave a done attempt on a queued bead.
     * Omitted, the mutation is exactly the lane move the cleanup path performs.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, attempt_id?: string, patch?: Partial<Attempt> }} input
     * @returns {QueueOpResult}
     */
    moveToDone(workspace, input) {
      const { bead_id, attempt_id, patch } = input;
      return applyUnconditional(workspace, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        if (typeof attempt_id === 'string' && attempt_id.length > 0) {
          const cur = next.attempts[attempt_id];
          // An unknown attempt refuses the WHOLE mutation, exactly as
          // `moveToPrWait` does: the caller asked for one transition, and a lane
          // move without its attempt record is not that transition.
          if (!cur) {
            return false;
          }
          next.attempts[attempt_id] = makeAttempt(
            /** @type {Partial<Attempt> & { attempt_id: string, bead_id: string }} */ ({
              ...cur,
              ...(patch || {}),
              attempt_id,
              bead_id: cur.bead_id
            })
          );
        }
        removeFromLanes(next, bead_id);
        delete next.cleanup_failed[bead_id];
        next.done.push({ bead_id, added_at: now() });
        return true;
      });
    },

    /**
     * Record the workspace's most recent post-merge deployment, overwriting the
     * previous one (worker-deploy-hook §3). Scheduler-owned (no CAS). An
     * outcome outside {@link DEPLOY_OUTCOMES} is refused WITHOUT a write, so a
     * caller bug cannot replace a real record with an unrenderable one.
     *
     * @param {string} workspace
     * @param {{ outcome: 'deployed'|'launched'|'failed', reason: string|null, bead_id: string, base_sha: string, detail?: string, log_path?: string }} input
     * @returns {QueueOpResult}
     */
    recordLastDeploy(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const record = buildLastDeploy(input, now());
        if (!record) {
          return false;
        }
        next.last_deploy = record;
        return true;
      });
    },

    /**
     * Record that the post-merge capability ship stopped (UI-4ii4). Scheduler-
     * owned (no CAS), workspace level, ONE record overwritten each time.
     *
     * This exists because the ship step is the first cleanup step that runs
     * AFTER the parent close, and an external PR row's whole existence is
     * `resolved` + `pr_url`: the close makes the row disappear on the next scan,
     * so a lane-member `cleanup_failed` record would have nowhere to live and
     * the failure would be silent. A record without a `reason` is refused
     * without a write, like {@link recordLastDeploy}'s unrenderable outcomes.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, reason: string, detail?: string|null, pr_url?: string|null }} input
     * @returns {QueueOpResult}
     */
    recordShipFailure(workspace, input) {
      return applyUnconditional(workspace, (next) => {
        const record = normalizeShipFailure({ ...input, at: now() });
        if (!record) {
          return false;
        }
        next.ship_failure = record;
        return true;
      });
    },

    /**
     * Clear the workspace's ship-failure record — what a SUCCESSFUL ship step
     * does, including the one inside a `[정리]` retry of the same bead. No-op
     * (no revision bump) when there is nothing recorded.
     *
     * @param {string} workspace
     * @returns {QueueOpResult}
     */
    clearShipFailure(workspace) {
      return applyUnconditional(workspace, (next) => {
        if (!next.ship_failure) {
          return false;
        }
        next.ship_failure = null;
        return true;
      });
    },

    /**
     * The DETACHED deploy's atomic hand-off: finish the cleanup (`moveToDone`)
     * and record the launch intent in ONE persist (worker-deploy-hook §2).
     *
     * Splitting these would be the whole failure mode the terminal-launch
     * exception exists to avoid: a self-restarting deploy kills this server, so
     * anything not durable BEFORE the spawn may never be written at all. One
     * mutation means a restart either sees "cleanup done + deploy launched" or
     * neither — never a bead in `done` whose deploy left no trace.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, deploy: { outcome: 'deployed'|'launched'|'failed', reason: string|null, bead_id: string, base_sha: string, detail?: string, log_path?: string } }} input
     * @returns {QueueOpResult}
     */
    moveToDoneWithDeploy(workspace, input) {
      const { bead_id, deploy } = input;
      return applyUnconditional(workspace, (next) => {
        const record = buildLastDeploy(deploy, now());
        if (typeof bead_id !== 'string' || bead_id.length === 0 || !record) {
          return false;
        }
        removeFromLanes(next, bead_id);
        delete next.cleanup_failed[bead_id];
        next.done.push({ bead_id, added_at: now() });
        next.last_deploy = record;
        return true;
      });
    },

    /**
     * REMOVE a bead from `pr_wait` in ONE persist — the lane half of [폐기]
     * (`2026-07-27-worker-discard-button.md` §1). It lands in no lane at all:
     * the bead is `open` again and the candidate lane is synthesized as
     * ready − queue∪pr_wait∪done, so it reappears there on its own. Re-running
     * it is a deliberate drag back into `queue`, which re-passes admission.
     *
     * The single mutation is the reason the spec calls the transition
     * order-sensitive: the poller classifies PR state only for beads that are IN
     * `pr_wait`, so the discard's own `gh pr close` must stop being visible to it
     * in one step rather than across a window where the bead is half-moved.
     *
     * Any stale admission / cleanup_failed record for the bead is dropped:
     * nothing recorded about the discarded attempt still applies. Scheduler-owned
     * (no CAS).
     *
     * @param {string} workspace
     * @param {{ bead_id: string }} input
     * @returns {QueueOpResult}
     */
    removeFromPrWait(workspace, input) {
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
     * `detail` carries the step's own diagnostic text when it has one (git
     * stderr, a command's message); omit it otherwise.
     *
     * `output_tail` carries the failing command's own trailing output when the
     * step ran one (UI-qult §1); omit it otherwise.
     *
     * `log_path` carries the absolute path to that command's full preserved
     * output (UI-0x54); omit it when the run left no complete log file.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, step: string, reason: string, bd_restore?: string|null, detail?: string|null, output_tail?: string|null, log_path?: string|null }} input
     * @returns {QueueOpResult}
     */
    recordCleanupFailure(workspace, input) {
      const {
        bead_id,
        step,
        reason,
        bd_restore,
        detail,
        output_tail,
        log_path
      } = input;
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
          at: now(),
          detail:
            typeof detail === 'string' && detail.length > 0 ? detail : null
        };
        if (typeof output_tail === 'string' && output_tail.length > 0) {
          next.cleanup_failed[bead_id].output_tail = output_tail;
        }
        if (typeof log_path === 'string' && log_path.length > 0) {
          next.cleanup_failed[bead_id].log_path = log_path;
        }
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
     * Set the workspace's only durable preset authority under its queue CAS.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, preset_id: string|null }} input
     * @returns {QueueOpResult}
     */
    setDefaultExecPresetId(workspace, input) {
      const { expected_revision, preset_id } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (preset_id !== null && typeof preset_id !== 'string') {
          return false;
        }
        if (typeof preset_id === 'string') {
          const normalized_id = preset_id.trim();
          if (normalized_id.length === 0) {
            return false;
          }
          next.default_exec_preset_id = normalized_id;
          return true;
        }
        next.default_exec_preset_id = null;
        return true;
      });
    },

    /**
     * Retained only for in-process legacy callers while the wire protocol is
     * removed. New authority is `setDefaultExecPresetId` through the
     * coordinator; no new handler exposes this method.
     *
     * @deprecated
     * @param {string} workspace
     * @param {{ expected_revision: number, key: string, value: unknown }} input
     * @returns {QueueOpResult}
     */
    setExecDefault(workspace, input) {
      const { expected_revision, key, value } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const allowed = execSettingEnums()[key];
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
     * Clear raw legacy defaults after a preset-reference readback. This is a
     * migration-only operation, not an active per-key editor.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number }} input
     * @returns {QueueOpResult}
     */
    clearLegacyExecDefaults(workspace, input) {
      return applyMutation(workspace, input.expected_revision, (next) => {
        if (Object.keys(next.exec_defaults).length === 0) {
          return false;
        }
        const legacy_queue = /** @type {Partial<Queue>} */ (next);
        delete legacy_queue.exec_defaults;
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
     * `stale:true` records the non-blocking admitted-with-a-stale-receipt
     * observation instead of a refusal (UI-dlim §3.4); it participates in the
     * same-record no-op guard, so a stale flag flipping is a real change.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, reason: string, stale?: boolean }} input
     * @returns {QueueOpResult}
     */
    recordAdmission(workspace, input) {
      const { bead_id, reason } = input;
      const stale = input.stale === true;
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
        if (
          prior &&
          prior.reason === reason &&
          (prior.stale === true) === stale
        ) {
          return false;
        }
        next.admission[bead_id] = stale
          ? { reason, at: now(), stale: true }
          : { reason, at: now() };
        return true;
      });
    },

    /**
     * Drop a bead from the lanes AND its skip badge in ONE persist
     * (scheduler-owned, no CAS) — the terminal-status dequeue: a bead closed
     * outside the worker can never dispatch, so re-badging it every tick is the
     * only thing repeating it would achieve.
     *
     * Reports `ok:false` WITHOUT a revision bump when there was nothing to drop,
     * for the same reason {@link recordAdmission} no-ops an unchanged reason: a
     * repeating tick must not bump the revision forever.
     *
     * @param {string} workspace
     * @param {{ bead_id: string }} input
     * @returns {QueueOpResult}
     */
    dropFromQueue(workspace, input) {
      const { bead_id } = input;
      return applyUnconditional(workspace, (next) => {
        if (typeof bead_id !== 'string' || bead_id.length === 0) {
          return false;
        }
        const in_lane =
          next.queue.some((e) => e.bead_id === bead_id) ||
          next.pr_wait.some((e) => e.bead_id === bead_id) ||
          next.done.some((e) => e.bead_id === bead_id);
        if (!in_lane && !Object.hasOwn(next.admission, bead_id)) {
          return false;
        }
        removeFromLanes(next, bead_id);
        delete next.admission[bead_id];
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
     * execution OFF on a session failure or a reconcile failure, which together with
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
     * Queue one or more `pr_wait` beads for the sequential merge driver
     * (UI-5v7d §1). CAS-guarded: both the single [머지] click and the lane's
     * [일괄 머지] land here, and both start from a snapshot the user saw.
     *
     * Add-all is ONE call with many entries rather than a call per bead,
     * because each write bumps the revision — a per-bead loop would make every
     * bead after the first fail its own CAS.
     *
     * Membership: a bead must be in the durable `pr_wait` lane, OR the caller
     * must declare it an EXTERNAL pr_wait row (`external: true`). External rows
     * are synthesized on the wire from bd (UI-7agi §2) and never live in
     * `queue.json`, so the store cannot see them; the ws layer that owns that
     * overlay is what vouches for them here.
     *
     * Duplicate queuing is a NO-OP for that bead, not a rejection: a whole
     * add-all whose rows are already queued still reports `ok` when it queued
     * at least one, and rejects only when it queued nothing at all.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, entries: Array<{ bead_id: string, external?: boolean }> }} input
     * @returns {QueueOpResult}
     */
    enqueueMerge(workspace, input) {
      const { expected_revision, entries } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        if (!Array.isArray(entries) || entries.length === 0) {
          return false;
        }
        let added = 0;
        let cleared = 0;
        for (const entry of entries) {
          const bead_id = entry && entry.bead_id;
          if (typeof bead_id !== 'string' || bead_id.length === 0) {
            continue;
          }
          if (!enqueueMember(next, bead_id, entry.external === true)) {
            continue;
          }
          // A human clicking [머지] on an auto-excluded row IS the retry the
          // exclusion must not block (UI-yk55 §3.2): the record is dropped even
          // when the row turns out to be queued already, so the driver's entry
          // filter cannot drop the item the click just asked for.
          if (next.auto_merge_skips[bead_id]) {
            delete next.auto_merge_skips[bead_id];
            cleared += 1;
          }
          if (next.merge_queue.some((e) => e.bead_id === bead_id)) {
            continue;
          }
          next.merge_queue.push({ bead_id, resolution_rounds: 0 });
          added += 1;
        }
        return added > 0 || cleared > 0;
      });
    },

    /**
     * Queue every eligible row the AUTO enroller (or the lane's toggle click)
     * judged, applying the exclusion filter and the record prune inside the SAME
     * mutation (UI-yk55 §3.2/§3.2.1).
     *
     * The head comparison lives HERE rather than in the caller because the
     * decision and the write must not straddle a persist: a filter evaluated
     * against a snapshot and applied to a later one is exactly how an excluded
     * item slips back into the queue.
     *
     * `expected_revision` is optional: the ws add-all passes the revision its
     * user saw, the enroller passes none (it is a server-owned mutation, like
     * every other scheduler/driver write).
     *
     * @param {string} workspace
     * @param {{ expected_revision?: number|null, entries: Array<{ bead_id: string, external?: boolean, head_sha: string }>, present_ids?: string[] }} input
     * @returns {QueueOpResult}
     */
    enqueueMergeAuto(workspace, input) {
      const { expected_revision, entries, present_ids } = input;
      /**
       * @param {Queue} next
       * @returns {boolean}
       */
      const mutate = (next) => {
        let changed = 0;
        // Prune first: an external row that vanished leaves NO lane mutation
        // behind (its row is a memory overlay), so this scan is the only place
        // its record can be reclaimed (§3.2.1).
        if (Array.isArray(present_ids)) {
          const present = new Set(present_ids);
          for (const bead_id of Object.keys(next.auto_merge_skips)) {
            if (!present.has(bead_id)) {
              delete next.auto_merge_skips[bead_id];
              changed += 1;
            }
          }
        }
        for (const entry of Array.isArray(entries) ? entries : []) {
          const bead_id = entry && entry.bead_id;
          if (typeof bead_id !== 'string' || bead_id.length === 0) {
            continue;
          }
          if (!enqueueMember(next, bead_id, entry.external === true)) {
            continue;
          }
          const skip = next.auto_merge_skips[bead_id];
          if (skip) {
            if (skip.head_sha === entry.head_sha) {
              // Same head that already failed — the exclusion still holds.
              continue;
            }
            // The branch moved, so whatever failed last time is not what would
            // be merged now.
            delete next.auto_merge_skips[bead_id];
            changed += 1;
          }
          if (next.merge_queue.some((e) => e.bead_id === bead_id)) {
            continue;
          }
          next.merge_queue.push({ bead_id, resolution_rounds: 0 });
          changed += 1;
        }
        return changed > 0;
      };
      return typeof expected_revision === 'number'
        ? applyMutation(workspace, expected_revision, mutate)
        : applyUnconditional(workspace, mutate);
    },

    /**
     * Toggle the durable `auto_merge` flag. CAS-guarded, mirroring
     * {@link toggleAutoAdvance} — the click starts an irreversible chain of
     * merges, so it must not apply against a snapshot the user never saw.
     *
     * `clear_waiting` empties the waiting merge queue in the SAME mutation
     * (UI-yk55 §5.2). It has to be one write: a flag persisted without the
     * queue leaves a process that restarts in between with `auto_merge = false`
     * and a full queue, and the boot-resume driver would merge every item a user
     * had just pressed stop on. `keep` names the item being merged right now,
     * which is never removable — its merge already reached GitHub.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, on: boolean, clear_waiting?: boolean, keep?: string|null }} input
     * @returns {QueueOpResult}
     */
    toggleAutoMerge(workspace, input) {
      const { expected_revision, on, clear_waiting, keep } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        next.auto_merge = !!on;
        if (clear_waiting) {
          next.merge_queue = next.merge_queue.filter(
            (e) => e.bead_id === (keep || null)
          );
        }
        return true;
      });
    },

    /**
     * Record an auto-merge exclusion AND drop the item from the merge queue in
     * ONE mutation (UI-yk55 §3.2). Driver-owned, so no CAS.
     *
     * The atomicity is the whole point. Recording and dequeuing as two writes
     * leaves a crash window in either order: record-then-crash keeps a merged-in
     * head at the queue head for the boot-resume driver to merge again, and
     * dequeue-then-crash leaves the row eligible with no exclusion, which is the
     * §3.1 loop verbatim.
     *
     * @param {string} workspace
     * @param {{ bead_id: string, head_sha: string, reason: string }} input
     * @returns {QueueOpResult}
     */
    recordMergeSkip(workspace, input) {
      const { bead_id, head_sha, reason } = input;
      return applyUnconditional(workspace, (next) => {
        if (
          typeof bead_id !== 'string' ||
          bead_id.length === 0 ||
          typeof head_sha !== 'string' ||
          head_sha.length === 0
        ) {
          return false;
        }
        next.auto_merge_skips[bead_id] = {
          head_sha,
          reason: typeof reason === 'string' ? reason : '',
          at: now()
        };
        next.merge_queue = next.merge_queue.filter(
          (e) => e.bead_id !== bead_id
        );
        return true;
      });
    },

    /**
     * Drop a bead from the merge queue — the DRIVER's own dequeue after it
     * finished (or gave up on) an item. Driver-owned, so no CAS, exactly like
     * the scheduler's lane transitions.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {QueueOpResult}
     */
    dequeueMerge(workspace, bead_id) {
      return applyUnconditional(workspace, (next) => {
        if (!next.merge_queue.some((e) => e.bead_id === bead_id)) {
          return false;
        }
        next.merge_queue = next.merge_queue.filter(
          (e) => e.bead_id !== bead_id
        );
        return true;
      });
    },

    /**
     * Cancel WAITING merge-queue items — one [취소] click, or the lane's
     * [일괄 머지 중단] emptying everything but the item being merged. Both are
     * ONE CAS-guarded write: cancelling item by item would let the active item
     * finish between requests, promote the next waiter to active, and leave
     * that one queued after a click that said "stop all".
     *
     * `keep` names the item the caller must NOT remove (the active one);
     * whether an item is active is the driver's judgment, made before this.
     *
     * @param {string} workspace
     * @param {{ expected_revision: number, bead_id?: string, all?: boolean, keep?: string|null }} input
     * @returns {QueueOpResult}
     */
    cancelMerge(workspace, input) {
      const { expected_revision, bead_id, all, keep } = input;
      return applyMutation(workspace, expected_revision, (next) => {
        const doomed = all
          ? next.merge_queue
              .map((e) => e.bead_id)
              .filter((id) => id !== (keep || null))
          : [bead_id];
        const removed = next.merge_queue.filter((e) =>
          doomed.includes(e.bead_id)
        );
        if (removed.length === 0) {
          return false;
        }
        next.merge_queue = next.merge_queue.filter(
          (e) => !doomed.includes(e.bead_id)
        );
        return true;
      });
    },

    /**
     * Count one consumed conflict-resolution round against a queued item
     * (UI-5v7d §2 step 3). Driver-owned (no CAS) and durable: the cap it feeds
     * has to hold across the restart a deploy causes.
     *
     * @param {string} workspace
     * @param {string} bead_id
     * @returns {QueueOpResult}
     */
    bumpResolutionRound(workspace, bead_id) {
      return applyUnconditional(workspace, (next) => {
        const entry = next.merge_queue.find((e) => e.bead_id === bead_id);
        if (!entry) {
          return false;
        }
        entry.resolution_rounds += 1;
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
