/**
 * Worker scheduler — the auto-advance state machine (spec §5.1–§5.3).
 *
 * Drives the Phase 9 queue: when `auto_advance` is on, it runs the Serial head
 * (at most 1) plus up to N Parallel slots concurrently (total ≤ 1+N). A blocked
 * Serial head is skipped to the next runnable serial bead. ⏸ (auto_advance off)
 * lets running sessions finish but starts no new ones.
 *
 * Dispatch is fail-closed and contract-native:
 *   - RE-READ ready/blocked/deps/exec-settings from bd just before dispatch and
 *     snapshot them into the attempt (base/head OID, started_at, pid, runner,
 *     model, effort — spec §5.1/§5.2).
 *   - Record + readback `workflow_mode=fast_track` on the bead, snapshotting the
 *     PRIOR value into the attempt. On any termination WITHOUT a bead close
 *     (fail/stop/orphan) the prior value is reverted (unset when originally
 *     absent) so a stray fast_track never switches a later manual session to
 *     unattended (spec §5.2).
 *   - On success, INDEPENDENT verification (git ancestry + bd readback) gates
 *     the Done move; on any failure the circuit breaker trips (spec §5.3).
 *
 * Fully injectable (fake clock / runner / bd / worktree / verify) so no real
 * subprocess is spawned in tests.
 *
 * @import { RunnerHandle, RunnerVerdict } from './runner/session.js'
 */
import { debug } from '../logging.js';
import { resolveExecSettings, resolvePolicies } from './policy.js';

const log = debug('worker:scheduler');

/**
 * @typedef {Object} BeadSnapshot
 * @property {boolean} ready - Runnable now.
 * @property {boolean} blocked - Blocked by unmet dependencies.
 * @property {string} repo - Target repo root.
 * @property {string} target_base - Merge target base (branch/ref).
 * @property {string} [model] - orchestration_model.
 * @property {string} [effort] - orchestration_effort.
 * @property {string} [review_model] - review_model (per-bead exec setting).
 * @property {string} [impl_model] - impl_model (per-bead exec setting).
 * @property {string|null} [workflow_mode] - Current workflow_mode metadata.
 * @property {string|null} [route] - Workflow route (e.g. full_plan).
 * @property {string} [status] - Issue status (open/in_progress/resolved/closed).
 * @property {string|null} [spec_id] - Spec doc path metadata (admission input).
 * @property {unknown} [spec_review] - Raw spec_review metadata value. Key
 * absence ⇒ `undefined`; any present value must reach the admission
 * validator so a malformed receipt rejects instead of reading as absent.
 * @property {string|null} [merge_policy] - Bead-pinned merge policy metadata.
 * @property {string|null} [drift_policy] - Bead-pinned drift policy metadata.
 * @property {string[]} [deps] - Dependency ids.
 */

/**
 * @typedef {Object} SchedulerDeps
 * @property {any} store - Queue store (queue-store.js).
 * @property {(runner_name: string) => { name: string, spawn: (bead: any, workspace: string, settings: any) => RunnerHandle }} makeRunner
 * @property {{
 *   snapshotBead: (bead_id: string) => Promise<BeadSnapshot>,
 *   setMetadata: (bead_id: string, key: string, value: string) => Promise<void>,
 *   unsetMetadata: (bead_id: string, key: string) => Promise<void>,
 *   readMetadata: (bead_id: string, key: string) => Promise<string|null>
 * }} bd
 * @property {{ add: (i: { repo: string, bead_id: string, base: string }) => Promise<{ path: string, branch: string, base_oid: string }>, remove: (i: { repo: string, bead_id: string }) => Promise<any>, addDetached?: (i: { repo: string, name: string, sha: string }) => Promise<{ path: string }>, removeDetached?: (i: { repo: string, name: string }) => Promise<any>, pathFor?: (repo: string, bead_id: string) => string, exists?: (repo: string, bead_id: string) => boolean }} worktree
 * @property {{ issue: (attempt_id: string, meta: { repo: string, bead_id: string, target_base?: string }) => string, revoke: (attempt_id: string) => void }} tokens
 * @property {{ verifyMerge: (i: { repo: string, target_base: string, bead_id: string, merge_policy: 'auto_merge'|'pr_stop', merge_sha: string|null }) => Promise<{ ok: boolean, reason: string }> }} verify
 * @property {{ takeHandover: (attempt_id: string) => (() => void) | null }} [mergeLock]
 * Merge-lock handover accessor (worker-autorun-policy §5): a verified release
 * transfers lock ownership to the worker; the scheduler takes it here and
 * frees it only after post-merge verification (failure order: trip → release).
 * @property {ReturnType<typeof import('./breaker.js').createBreaker>} breaker
 * @property {{ validate: (snap: BeadSnapshot, base?: string) => Promise<{ ok: boolean, reason?: string }> }} [admission]
 * Auto-run admission validator (worker-autorun-policy §1). When present, the
 * tick candidate scan AND the dispatch re-check (against the pinned worktree
 * base_oid) both gate on it; refusals are recorded in `Queue.admission`.
 * @property {(repo: string) => { cmd: string[], timeout_ms: number } | null} [verifyCmd]
 * Workspace verify_cmd config lookup (worker-autorun-policy §4). A null (or
 * absent dep) means no independent post-merge verification is available, so a
 * resolved auto_merge demotes to pr_stop at dispatch (`verify_cmd_unset`).
 * @property {(input: { cwd: string, cmd: string[], timeout_ms: number }) => Promise<{ ok: boolean, reason: string, exit: number|null }>} [runVerifyCmd]
 * Post-merge verify_cmd executor (verify-cmd.js). Runs on the auto_merge
 * success path inside a detached worktree pinned to the observed merge_sha,
 * while the handed-over merge lock is still held.
 * @property {{ attach: (workspace: string, attempt_id: string, events: import('node:events').EventEmitter) => void }} sessionLog
 * @property {(workspace: string) => void} [notifyQueueChanged]
 * Fired after autonomous queue transitions (dispatch records, admission
 * refusals, session done/fail) so ws subscribers get a fresh snapshot without
 * waiting for their next own mutation (worker-autorun-policy §6).
 * @property {number | (() => number)} [port] - Server port for the merge-lock endpoint injected into the preamble.
 * @property {() => number} [now]
 * @property {number} [parallel_slots]
 * @property {(bead_id: string) => string} [makeAttemptId]
 */

/**
 * Build the auto-advance state machine over the queue store.
 *
 * @param {SchedulerDeps} deps
 * @returns {{
 *   tick: (workspace: string) => Promise<void>,
 *   stop: (workspace: string, attempt_id: string) => Promise<boolean>,
 *   pause: (workspace: string, attempt_id: string) => Promise<{ ok: boolean, reason?: string }>,
 *   resume: (workspace: string, attempt_id: string) => Promise<{ ok: boolean, reason?: string, attempt_id?: string }>,
 *   runningCount: () => number,
 *   runningBeads: () => string[],
 *   isRunning: (bead_id: string) => boolean
 * }}
 */
export function createScheduler(deps) {
  const now = deps.now || (() => Date.now());
  const parallel_slots =
    typeof deps.parallel_slots === 'number' ? deps.parallel_slots : 2;
  /**
   * Resolve the live server port for the merge-lock endpoint injected into each
   * session's preamble. Accepts a number or a late-bound getter (the port is
   * only known after the server begins listening).
   *
   * @returns {number}
   */
  const resolvePort =
    typeof deps.port === 'function'
      ? deps.port
      : () => (typeof deps.port === 'number' ? deps.port : 0);
  let attempt_seq = 0;
  const makeAttemptId =
    deps.makeAttemptId || ((bead_id) => `${bead_id}-${now()}-${++attempt_seq}`);

  /**
   * Live sessions keyed by attempt_id.
   *
   * @type {Map<string, { bead_id: string, repo: string, lane: 'serial'|'parallel', handle: RunnerHandle, prior: string|null }>}
   */
  const running = new Map();
  /** Beads currently claimed (dispatching or running) — prevents double launch. @type {Set<string>} */
  const claimed = new Set();
  /**
   * Attempts terminated by an explicit stop (■). Their `done` promise still
   * resolves later; `onSessionDone` must NOT re-run the failure path for them
   * (no breaker trip, no double revert) — the stop already finalized them.
   *
   * @type {Set<string>}
   */
  const stopped = new Set();
  /**
   * Beads refused by the dispatch-time admission RE-check within the current
   * tick cascade. The refill pass skips them so a scan-pass/dispatch-fail
   * disagreement (moving base) can never livelock dispatch↔tick; the set is
   * cleared at every externally-initiated tick, so the next real tick retries.
   *
   * @type {Set<string>}
   */
  const dispatch_refused = new Set();

  /**
   * Notify ws subscribers of an autonomous queue transition (best-effort).
   *
   * @param {string} workspace
   */
  function notifyChanged(workspace) {
    if (typeof deps.notifyQueueChanged === 'function') {
      try {
        deps.notifyQueueChanged(workspace);
      } catch {
        // A broken fanout must never break the scheduler.
      }
    }
  }

  /**
   * Run the admission validator fail-closed: absent dep passes (legacy wiring),
   * a validator throw is a git_error refusal, never an escape out of tick.
   *
   * @param {BeadSnapshot} snap
   * @param {string} [base]
   * @returns {Promise<{ ok: boolean, reason?: string }>}
   */
  async function checkAdmission(snap, base) {
    if (!deps.admission) {
      return { ok: true };
    }
    try {
      return await deps.admission.validate(snap, base);
    } catch {
      return { ok: false, reason: 'git_error' };
    }
  }

  /**
   * @param {'serial'|'parallel'} lane
   * @returns {number}
   */
  function runningInLane(lane) {
    let n = 0;
    for (const r of running.values()) {
      if (r.lane === lane) {
        n += 1;
      }
    }
    return n;
  }

  /**
   * Revert workflow_mode to the pre-launch value (unset when originally absent).
   *
   * @param {string} bead_id
   * @param {string|null} prior
   */
  async function revertWorkflowMode(bead_id, prior) {
    if (prior == null) {
      await deps.bd.unsetMetadata(bead_id, 'workflow_mode');
    } else {
      await deps.bd.setMetadata(bead_id, 'workflow_mode', prior);
    }
  }

  /**
   * Unset the exec-setting metadata keys stamped onto a bead at dispatch
   * (worker-global-exec-defaults §3). Best-effort per key — a bd failure is
   * logged, never thrown — so it mirrors the workflow_mode revert's fail-open
   * posture on the termination paths and never blocks a done/fail/stop move.
   *
   * @param {string} bead_id
   * @param {string[]|null|undefined} keys
   */
  async function revertExecStamps(bead_id, keys) {
    if (!Array.isArray(keys)) {
      return;
    }
    for (const key of keys) {
      try {
        await deps.bd.unsetMetadata(bead_id, key);
      } catch (err) {
        log('exec stamp revert failed for %s %s: %o', bead_id, key, err);
      }
    }
  }

  /**
   * Read the durable exec_stamped_keys recorded on an attempt at dispatch.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {string[]|null}
   */
  function execStampedKeysOf(workspace, attempt_id) {
    const a = deps.store.snapshot(workspace).attempts[attempt_id];
    return a && Array.isArray(a.exec_stamped_keys) ? a.exec_stamped_keys : null;
  }

  /**
   * Beads holding a LEAF paused attempt (worker-phase1 §1.1). Resume mints a
   * child attempt and leaves the ancestor `paused` forever, so "is this bead
   * paused?" must ask about the leaf — an attempt nothing was resumed from.
   * Treating a resumed ancestor as active would block dispatch for a bead that
   * is running again.
   *
   * @param {{ attempts?: Record<string, any> }} q - Queue snapshot.
   * @returns {Set<string>}
   */
  function leafPausedBeads(q) {
    const attempts = Object.values(q.attempts || {});
    const resumed_from = new Set(
      attempts.map((a) => a && a.resumed_from).filter(Boolean)
    );
    const out = new Set();
    for (const a of attempts) {
      if (a && a.status === 'paused' && !resumed_from.has(a.attempt_id)) {
        out.add(a.bead_id);
      }
    }
    return out;
  }

  /**
   * Trip the breaker for a failed attempt: mark Failed, revert workflow_mode,
   * turn auto_advance OFF, block the repo's new launch + merge entry (spec §5.3).
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {BeadSnapshot} snap
   * @param {string|null} prior
   * @param {string} cause
   */
  async function failAttempt(
    workspace,
    attempt_id,
    bead_id,
    snap,
    prior,
    cause
  ) {
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { status: 'failed', cause, finished_at: now() }
    });
    try {
      await revertWorkflowMode(bead_id, prior);
    } catch (err) {
      // Best-effort on the failure path: the trip below already blocks the
      // repo, so a bd-down revert failure must not escape onSessionDone.
      log('workflow_mode revert failed for %s: %o', bead_id, err);
    }
    // Revert any exec-setting stamps this attempt wrote (best-effort).
    await revertExecStamps(bead_id, execStampedKeysOf(workspace, attempt_id));
    deps.breaker.trip(snap.repo, { bead_id, cause });
    deps.store.setAutoAdvance(workspace, false);
  }

  /**
   * Take the handed-over merge lock for an attempt, if any (worker-autorun-
   * policy §5). Returns a release thunk that is safe to call exactly once.
   *
   * @param {string} attempt_id
   * @returns {() => void}
   */
  function takeHandover(attempt_id) {
    /** @type {(() => void) | null} */
    let release = null;
    try {
      release = deps.mergeLock ? deps.mergeLock.takeHandover(attempt_id) : null;
    } catch {
      release = null;
    }
    return () => {
      if (release) {
        try {
          release();
        } catch {
          // Best-effort; the lock chain still advances on the next acquire.
        }
        release = null;
      }
    };
  }

  /**
   * Run the post-merge verify_cmd in a detached worktree pinned to the
   * observed merge_sha; the worktree is cleaned up in every branch. Any
   * infrastructure failure (unset cmd, missing sha, worktree error) is a
   * spawn-error refusal — never a silent pass. The result lands on the
   * attempt record (`verify_cmd_result`).
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {BeadSnapshot} snap
   * @param {string} merge_sha
   * @returns {Promise<{ ok: boolean, reason: string, exit: number|null }>}
   */
  async function runPostMergeVerify(
    workspace,
    attempt_id,
    bead_id,
    snap,
    merge_sha
  ) {
    /** @type {{ cmd: string[], timeout_ms: number } | null} */
    let vc = null;
    try {
      vc = deps.verifyCmd ? deps.verifyCmd(snap.repo) : null;
    } catch {
      vc = null;
    }
    /** @type {{ ok: boolean, reason: string, exit: number|null }} */
    let vres;
    const capable =
      typeof deps.runVerifyCmd === 'function' &&
      typeof (/** @type {any} */ (deps.worktree).addDetached) === 'function' &&
      typeof (/** @type {any} */ (deps.worktree).removeDetached) === 'function';
    if (!vc || !merge_sha || !capable) {
      // Fail-closed: an auto_merge without a runnable independent
      // verification (unset cmd, no observed sha, missing runner/worktree
      // capability) must never pass silently (implementation review
      // 2026-07-22 — unattended merge without verification is forbidden).
      vres = { ok: false, reason: 'verify_cmd_spawn_error', exit: null };
    } else {
      const name = `verify-${bead_id}`;
      /** @type {{ path: string } | null} */
      let wt = null;
      try {
        wt = await /** @type {any} */ (deps.worktree).addDetached({
          repo: snap.repo,
          sha: merge_sha,
          name
        });
        vres = await /** @type {NonNullable<typeof deps.runVerifyCmd>} */ (
          deps.runVerifyCmd
        )({
          cwd: /** @type {{ path: string }} */ (wt).path,
          cmd: vc.cmd,
          timeout_ms: vc.timeout_ms
        });
      } catch (err) {
        log('post-merge verify infra failed for %s: %o', bead_id, err);
        vres = { ok: false, reason: 'verify_cmd_spawn_error', exit: null };
      } finally {
        if (wt) {
          try {
            await /** @type {any} */ (deps.worktree).removeDetached({
              repo: snap.repo,
              name
            });
          } catch {
            // Best-effort cleanup; the verdict already stands.
          }
        }
      }
    }
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { verify_cmd_result: vres }
    });
    return vres;
  }

  /**
   * Handle a finished session: policy-aware independent verify → Done, else
   * breaker. The handed-over merge lock (verified release) is freed here in
   * EVERY branch — on failure only AFTER the breaker trips, so a waiter can
   * never merge into the failed base.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} bead_id
   * @param {BeadSnapshot} snap
   * @param {string|null} prior
   * @param {RunnerVerdict} verdict
   */
  async function onSessionDone(
    workspace,
    attempt_id,
    bead_id,
    snap,
    prior,
    verdict
  ) {
    running.delete(attempt_id);
    claimed.delete(bead_id);
    deps.tokens.revoke(attempt_id);
    const releaseHandover = takeHandover(attempt_id);

    // An explicit stop already finalized this attempt (failed + mode reverted);
    // the late `done` resolution must not re-run the failure path.
    if (stopped.has(attempt_id)) {
      stopped.delete(attempt_id);
      releaseHandover();
      return;
    }

    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { exit: verdict.exit }
    });

    if (!verdict.success) {
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        snap,
        prior,
        verdict.blocked
          ? 'loud_fail_blocker'
          : `session_failed:${verdict.reason}`
      );
      releaseHandover();
      notifyChanged(workspace);
      await tick(workspace);
      return;
    }

    // Independent verification — session exit 0 is NOT enough (spec §5.2).
    // Policy-aware (worker-autorun-policy §3/§5): auto_merge requires the
    // SERVER-observed merge_sha (recorded by the merge-lock route at release)
    // + bd `closed`; pr_stop requires bd `resolved` + pr_url metadata.
    const attempt =
      deps.store.snapshot(workspace).attempts[attempt_id] ||
      /** @type {any} */ ({});
    const merge_policy =
      attempt.merge_policy === 'pr_stop' ? 'pr_stop' : 'auto_merge';
    const vr = await deps.verify.verifyMerge({
      repo: snap.repo,
      target_base: snap.target_base,
      bead_id,
      merge_policy,
      merge_sha:
        typeof attempt.merge_sha === 'string' ? attempt.merge_sha : null
    });
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { verify_result: vr }
    });

    if (vr.ok) {
      // Post-merge verify_cmd (worker-autorun-policy §4): auto_merge only,
      // run by the WORKER in a detached worktree pinned to the observed
      // merge_sha, while the handed-over merge lock is STILL held — no other
      // attempt can merge into a base that is being verified. On failure the
      // breaker trips FIRST, then the lock is released.
      if (merge_policy === 'auto_merge') {
        const vres = await runPostMergeVerify(
          workspace,
          attempt_id,
          bead_id,
          snap,
          typeof attempt.merge_sha === 'string' ? attempt.merge_sha : ''
        );
        if (!vres.ok) {
          await failAttempt(
            workspace,
            attempt_id,
            bead_id,
            snap,
            prior,
            vres.reason
          );
          releaseHandover();
          notifyChanged(workspace);
          await tick(workspace);
          return;
        }
      }
      releaseHandover();
      if (merge_policy === 'pr_stop') {
        // pr_stop leaves the bead OPEN for a later human merge session — a
        // stray fast_track must not switch that session to unattended, so a
        // failed revert BLOCKS the Done move (fail-closed, implementation
        // review 2026-07-22).
        try {
          await revertWorkflowMode(bead_id, prior);
        } catch (err) {
          log('pr_stop workflow_mode revert failed for %s: %o', bead_id, err);
          await failAttempt(
            workspace,
            attempt_id,
            bead_id,
            snap,
            prior,
            'workflow_mode_revert_failed'
          );
          notifyChanged(workspace);
          await tick(workspace);
          return;
        }
      }
      // auto_merge: bead closed → workflow_mode intentionally NOT reverted.
      // Exec-setting stamps ARE reverted regardless of merge_policy (auto_merge
      // done included): whether the bead was closed (auto_merge) or left open
      // (pr_stop), the auto-run's global-default fill must not persist as the
      // bead's own metadata (worker-global-exec-defaults §3; best-effort, never
      // blocks the Done move).
      await revertExecStamps(bead_id, execStampedKeysOf(workspace, attempt_id));
      deps.store.moveToDone(workspace, { bead_id });
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { status: 'done', finished_at: now(), done_kind: merge_policy }
      });
    } else {
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        snap,
        prior,
        `verify_failed:${vr.reason}`
      );
      releaseHandover();
    }
    notifyChanged(workspace);
    await tick(workspace);
  }

  /**
   * Dispatch one bead: re-read bd, guard, worktree, workflow_mode, attempt
   * snapshot, spawn. Releases the claim on any pre-spawn abort.
   *
   * @param {string} workspace
   * @param {string} bead_id
   * @param {'serial'|'parallel'} lane
   */
  async function dispatch(workspace, bead_id, lane) {
    // RE-READ authoritative ready/blocked/deps/exec-settings at dispatch.
    let snap;
    try {
      snap = await deps.bd.snapshotBead(bead_id);
    } catch {
      claimed.delete(bead_id);
      return;
    }
    if (!snap.ready || snap.blocked) {
      claimed.delete(bead_id);
      return;
    }

    // Resolve the 4 exec settings (bead metadata > workspace-global default >
    // unset). `stamped_keys` names the bead-absent keys filled from the global
    // default that this dispatch must stamp (and later revert) —
    // worker-global-exec-defaults §3.
    const exec = resolveExecSettings({
      bead: snap,
      defaults: deps.store.snapshot(workspace).exec_defaults
    });
    const runner_name = 'claude';

    // Breaker: refuse a new launch into a blocked repo.
    if (deps.breaker.isTripped(snap.repo)) {
      claimed.delete(bead_id);
      return;
    }

    const attempt_id = makeAttemptId(bead_id);
    const prior = snap.workflow_mode ?? null;

    let wt;
    try {
      wt = await deps.worktree.add({
        repo: snap.repo,
        bead_id,
        base: snap.target_base
      });
    } catch {
      claimed.delete(bead_id);
      return;
    }

    // Admission re-check against the PINNED base_oid — the tick scan validated
    // against a moving base tip, so a base advance between scan and worktree
    // creation (TOCTOU) is caught here, fail-closed.
    const adm = await checkAdmission(snap, wt.base_oid);
    if (!adm.ok) {
      deps.store.recordAdmission(workspace, {
        bead_id,
        reason: adm.reason || 'git_error'
      });
      try {
        await deps.worktree.remove({ repo: snap.repo, bead_id });
      } catch {
        // Best-effort cleanup; the refusal is already recorded.
      }
      claimed.delete(bead_id);
      dispatch_refused.add(bead_id);
      notifyChanged(workspace);
      await tickPass(workspace);
      return;
    }

    // Resolve the policy settings (bead > workspace global > default) and
    // apply the verify_cmd-unset demotion (§2/§4): an unattended merge without
    // independent post-merge verification is structurally forbidden, so a
    // resolved auto_merge demotes to pr_stop when no verify_cmd is configured.
    const resolved = resolvePolicies({
      bead: snap,
      queue: deps.store.snapshot(workspace)
    });
    let merge_policy = resolved.merge_policy;
    const drift_policy = resolved.drift_policy;
    /** @type {string|null} */
    let demoted_reason = null;
    if (merge_policy === 'auto_merge') {
      /** @type {{ cmd: string[], timeout_ms: number } | null} */
      let vcmd = null;
      try {
        vcmd = deps.verifyCmd ? deps.verifyCmd(snap.repo) : null;
      } catch {
        vcmd = null;
      }
      if (!vcmd || !Array.isArray(vcmd.cmd) || vcmd.cmd.length === 0) {
        merge_policy = 'pr_stop';
        demoted_reason = 'verify_cmd_unset';
      }
    }

    // Record + readback workflow_mode=fast_track (double-delivered with prompt).
    // The set AND its confirming readback are contained: a bd failure or a
    // readback that does not echo `fast_track` fails THIS dispatch only (records
    // a failed attempt, reverts the mode, releases the claim) — it never rejects
    // out of tick's Promise.all, and never trips the breaker or pauses siblings
    // (spec §5.2).
    let fast_track_ok = false;
    try {
      await deps.bd.setMetadata(bead_id, 'workflow_mode', 'fast_track');
      const readback = await deps.bd.readMetadata(bead_id, 'workflow_mode');
      fast_track_ok = readback === 'fast_track';
      if (!fast_track_ok) {
        log(
          'workflow_mode readback mismatch for %s: expected fast_track, got %o',
          bead_id,
          readback
        );
      }
    } catch (err) {
      log('workflow_mode set/readback failed for %s: %o', bead_id, err);
      fast_track_ok = false;
    }
    if (!fast_track_ok) {
      deps.store.appendAttempt(workspace, {
        expected_revision: deps.store.snapshot(workspace).revision,
        attempt: { attempt_id, bead_id }
      });
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          repo: snap.repo,
          target_base: snap.target_base,
          base_oid: wt.base_oid,
          workflow_mode_prior: prior,
          status: 'failed',
          cause: 'workflow_mode_record_failed',
          finished_at: now()
        }
      });
      try {
        await revertWorkflowMode(bead_id, prior);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return;
    }

    // DURABLE pre-record: persist the attempt (status 'running', pid null)
    // BEFORE the first exec-setting metadata write, recording the exact keys
    // this dispatch will stamp. If a crash lands between here and spawn, a
    // restart's orphan reap can revert the stamps from this record — an
    // in-memory-only registry could not (worker-global-exec-defaults §3).
    const stamped_keys = exec.stamped_keys;
    // Persist the resolved values of the stamped keys too (spec §1): a later
    // manual resume re-stamps from the PRIOR snapshot rather than re-resolving
    // the current global defaults, so the values must travel on the attempt.
    /** @type {Record<string, string>} */
    const exec_values = {};
    for (const key of stamped_keys) {
      const value = /** @type {Record<string, string>} */ (
        /** @type {any} */ (exec)
      )[key];
      if (typeof value === 'string') {
        exec_values[key] = value;
      }
    }
    deps.store.appendAttempt(workspace, {
      expected_revision: deps.store.snapshot(workspace).revision,
      attempt: { attempt_id, bead_id }
    });
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        repo: snap.repo,
        target_base: snap.target_base,
        base_oid: wt.base_oid,
        workflow_mode_prior: prior,
        exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
        exec_values: stamped_keys.length > 0 ? exec_values : null,
        merge_policy,
        drift_policy,
        demoted_reason,
        status: 'running',
        pid: null
      }
    });

    // Stamp each bead-absent, global-filled exec key onto the bead metadata
    // (set + confirming readback, mirroring the workflow_mode stamp). A bd
    // failure or a readback mismatch on ANY key fails THIS dispatch only: the
    // durably-recorded stamped_keys are unset (idempotent for keys not yet
    // written — a set that succeeded but whose readback threw/mismatched is
    // still cleaned up), the attempt is recorded failed, the mode is reverted,
    // the claim released — no breaker trip, no sibling pause.
    let exec_stamp_ok = true;
    for (const key of stamped_keys) {
      const value = /** @type {Record<string, string>} */ (
        /** @type {any} */ (exec)
      )[key];
      try {
        await deps.bd.setMetadata(bead_id, key, value);
        const rb = await deps.bd.readMetadata(bead_id, key);
        if (rb !== value) {
          log(
            'exec stamp readback mismatch for %s %s: expected %o, got %o',
            bead_id,
            key,
            value,
            rb
          );
          exec_stamp_ok = false;
          break;
        }
      } catch (err) {
        log('exec stamp set/readback failed for %s %s: %o', bead_id, key, err);
        exec_stamp_ok = false;
        break;
      }
    }
    if (!exec_stamp_ok) {
      await revertExecStamps(bead_id, stamped_keys);
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          status: 'failed',
          cause: 'exec_stamp_failed',
          finished_at: now()
        }
      });
      try {
        await revertWorkflowMode(bead_id, prior);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return;
    }

    await launchSession({
      workspace,
      attempt_id,
      bead_id,
      lane,
      repo: snap.repo,
      target_base: snap.target_base,
      base_oid: wt.base_oid,
      runner_name,
      model: exec.orchestration_model ?? null,
      effort: exec.orchestration_effort ?? null,
      merge_policy,
      drift_policy,
      prior_wf: prior,
      stamped_keys,
      wt_path: wt.path,
      // The adapter reads only `id`/`prompt`; the plan-receipt fields the
      // retired runner guard needed are no longer carried (worker-phase1 §4).
      spawnBead: { id: bead_id }
    });
  }

  /**
   * Shared launch tail for a first dispatch AND a manual resume: issue the
   * session token, spawn the runner, fill the spawn-time snapshot, attach the
   * session log, wire session_id capture + the done handler. On a spawn throw it
   * cleans up exactly like the exec-stamp partial failure (revoke token, revert
   * stamps + workflow_mode, record `spawn_failed`, release the claim) so no
   * stamped metadata or leaked `running` record outlives the aborted launch.
   *
   * @param {{
   *   workspace: string,
   *   attempt_id: string,
   *   bead_id: string,
   *   lane: 'serial'|'parallel',
   *   repo: string,
   *   target_base: string,
   *   base_oid: string|null,
   *   runner_name: string,
   *   model: string|null,
   *   effort: string|null,
   *   merge_policy: 'auto_merge'|'pr_stop',
   *   drift_policy: string|null,
   *   prior_wf: string|null,
   *   stamped_keys: string[],
   *   wt_path: string,
   *   spawnBead: any,
   *   resume_session_id?: string|null
   * }} input
   */
  async function launchSession(input) {
    const {
      workspace,
      attempt_id,
      bead_id,
      lane,
      repo,
      target_base,
      base_oid,
      runner_name,
      model,
      effort,
      merge_policy,
      drift_policy,
      prior_wf,
      stamped_keys,
      wt_path,
      spawnBead,
      resume_session_id
    } = input;

    const token = deps.tokens.issue(attempt_id, { repo, bead_id, target_base });
    const runner = deps.makeRunner(runner_name);
    const started_at = now();

    /** @type {any} */
    const settings = {
      model: model ?? undefined,
      effort: effort ?? undefined,
      fast_track: true,
      merge_policy,
      drift_policy,
      env: { BDUI_WORKER_TOKEN: token },
      // Inject the concrete merge-lock endpoint params so the session's
      // preamble acquires the (repo, target_base) lock before merging (F3).
      // The preamble omits the block under pr_stop (no merge → no lock).
      merge_lock: { port: resolvePort(), repo, target_base }
    };
    // Resume argv branch (spec §1.4): the adapter reads this to continue the
    // prior claude session id / codex thread id.
    if (resume_session_id) {
      settings.resume_session_id = resume_session_id;
    }

    /** @type {RunnerHandle} */
    let handle;
    try {
      handle = runner.spawn(spawnBead, wt_path, settings);
    } catch {
      deps.tokens.revoke(attempt_id);
      await revertExecStamps(bead_id, stamped_keys);
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { status: 'failed', cause: 'spawn_failed', finished_at: now() }
      });
      try {
        await revertWorkflowMode(bead_id, prior_wf);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return;
    }

    // Fill the runtime snapshot now that the process exists (spec §5.2). The
    // durable fields (repo/base_oid/exec_stamped_keys/policies) were pre-
    // recorded above; here we add the spawn-time facts + resolved exec values.
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        head_oid: base_oid,
        started_at,
        pid: handle.pid,
        runner: runner_name,
        model: model ?? null,
        effort: effort ?? null
      }
    });

    deps.store.clearAdmission(workspace, bead_id);
    deps.sessionLog.attach(workspace, attempt_id, handle.events);
    // Persist the runner session id when it arrives (stream first event). The
    // updateAttempt store-only write does NOT fan out on its own, so notify ws
    // subscribers explicitly to propagate it to a live drawer (spec §2).
    handle.events.on('session_id', (session_id) => {
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          session_id: typeof session_id === 'string' ? session_id : null
        }
      });
      notifyChanged(workspace);
    });
    running.set(attempt_id, { bead_id, repo, lane, handle, prior: prior_wf });
    notifyChanged(workspace);

    // onSessionDone reads only repo + target_base off the snap, so a synthetic
    // snapshot carries everything the termination path needs (breaker scope +
    // independent verify target) for both first dispatch and resume.
    const doneSnap = /** @type {BeadSnapshot} */ (
      /** @type {any} */ ({ repo, target_base })
    );
    handle.done.then((verdict) =>
      onSessionDone(workspace, attempt_id, bead_id, doneSnap, prior_wf, verdict)
    );
  }

  /**
   * The manual-resume task prompt (spec §1.4, branched by worker-phase1 §1.4):
   * announce how the prior attempt ended, instruct a self-check of worktree/
   * bead/PR state, and require finishing ONLY the remaining contract steps. The
   * unattended/policy preamble is layered on by the adapter's `applyPreamble`,
   * exactly as for a first launch.
   *
   * A `paused` ancestor was halted by the user on purpose, so it must NOT be
   * announced as a failure — telling the session it failed is exactly the
   * dishonesty this phase removes from the UI.
   *
   * @param {string} bead_id
   * @param {string|null} prior_status
   * @returns {string}
   */
  function resumePrompt(bead_id, prior_status) {
    const opening =
      prior_status === 'paused'
        ? `이전 무인 세션이 사용자 요청으로 일시정지되었다(bead ${bead_id}).`
        : `이전 무인 세션이 완료 전에 중단되어 attempt가 실패로 남았다(bead ${bead_id}).`;
    return [
      opening,
      '같은 워크트리에서 세션을 이어 진행한다. 먼저 워크트리·bead 상태·PR/머지 현황을 직접 점검해 어디까지 진행됐는지 확인하라.',
      '이미 끝난 단계는 반복하지 말고, 남은 계약 단계만 마무리한 뒤 종료하라.'
    ].join(' ');
  }

  /**
   * Manually resume a paused/failed/orphaned attempt in its EXISTING worktree
   * (spec §1, extended by worker-phase1 §1.2). Fail-closed with five refusal
   * reasons (admission-badge convention): `not_failed` · `no_session_id` ·
   * `worktree_missing` · `bead_running` · `already_resumed`
   * (`runner_unavailable` is retired with the runner axis — claude is the only
   * runner). A NEW attempt is minted carrying `resumed_from`, the PRIOR snapshot
   * is inherited verbatim (no re-resolution of globals/policies), workflow_mode
   * + exec are re-stamped from the prior values, and the shared launch tail
   * spawns the adapter's resume argv.
   *
   * Breaker (worker-phase1 §1.3): only a `failed|orphaned` resume resets it — ↻
   * on a real failure is a human ▶-grade intervention, and without the reset a
   * resumed auto_merge would deadlock at the merge-lock gate. A `paused` resume
   * does NOT reset: pausing is not a failure, so it must not clear a block a
   * sibling's genuine failure raised.
   *
   * @param {string} workspace
   * @param {string} attempt_id - The prior (paused/failed/orphaned) attempt.
   * @returns {Promise<{ ok: boolean, reason?: string, attempt_id?: string }>}
   */
  async function resume(workspace, attempt_id) {
    const q = deps.store.snapshot(workspace);
    const prior = q.attempts ? q.attempts[attempt_id] : null;

    // not_failed: no such attempt, or not in a resumable state.
    if (
      !prior ||
      (prior.status !== 'failed' &&
        prior.status !== 'orphaned' &&
        prior.status !== 'paused')
    ) {
      return { ok: false, reason: 'not_failed' };
    }
    // no_session_id: a pre-UI-azj6 attempt without a captured session id.
    if (typeof prior.session_id !== 'string' || prior.session_id.length === 0) {
      return { ok: false, reason: 'no_session_id' };
    }
    const bead_id = prior.bead_id;
    const repo = typeof prior.repo === 'string' ? prior.repo : '';
    // worktree_missing: the bead worktree is gone (resume never recreates it).
    const wt_present =
      typeof deps.worktree.exists === 'function'
        ? deps.worktree.exists(repo, bead_id)
        : true;
    if (!wt_present) {
      return { ok: false, reason: 'worktree_missing' };
    }
    // bead_running: a live (or store-recorded running) attempt for the same bead.
    if (claimed.has(bead_id)) {
      return { ok: false, reason: 'bead_running' };
    }
    for (const a of Object.values(q.attempts || {})) {
      if (a && a.bead_id === bead_id && a.status === 'running') {
        return { ok: false, reason: 'bead_running' };
      }
    }
    // already_resumed: a child attempt already carries this as `resumed_from`
    // (scan-derived so it survives cold reload — the ancestor is permanently
    // spent regardless of the child's success/failure).
    for (const a of Object.values(q.attempts || {})) {
      if (a && a.resumed_from === attempt_id) {
        return { ok: false, reason: 'already_resumed' };
      }
    }
    const runner_name = 'claude';

    // Admitted. Breaker reset is scoped to real failures (§1.3): a paused
    // resume leaves any tripped breaker exactly as it found it.
    if (prior.status !== 'paused') {
      deps.breaker.reset(repo);
    }
    claimed.add(bead_id);

    const new_attempt_id = makeAttemptId(bead_id);
    const target_base =
      typeof prior.target_base === 'string' ? prior.target_base : 'main';
    const merge_policy =
      prior.merge_policy === 'pr_stop' ? 'pr_stop' : 'auto_merge';
    const prior_wf =
      typeof prior.workflow_mode_prior === 'string'
        ? prior.workflow_mode_prior
        : null;
    const stamped_keys = Array.isArray(prior.exec_stamped_keys)
      ? prior.exec_stamped_keys
      : [];
    const exec_values =
      prior.exec_values && typeof prior.exec_values === 'object'
        ? /** @type {Record<string, string>} */ (prior.exec_values)
        : {};
    const lane = (q.serial || []).some(
      (/** @type {any} */ e) => e.bead_id === bead_id
    )
      ? 'serial'
      : 'parallel';

    // Mint the new attempt inheriting the PRIOR snapshot verbatim (§1.3): repo/
    // target_base/base_oid/runner/model/effort/policies/demoted_reason AND the
    // observed merge_sha — never re-resolved from current globals.
    deps.store.appendAttempt(workspace, {
      expected_revision: deps.store.snapshot(workspace).revision,
      attempt: { attempt_id: new_attempt_id, bead_id }
    });
    deps.store.updateAttempt(workspace, {
      attempt_id: new_attempt_id,
      patch: {
        repo,
        target_base,
        base_oid: prior.base_oid ?? null,
        runner: runner_name,
        model: prior.model ?? null,
        effort: prior.effort ?? null,
        merge_policy,
        drift_policy: prior.drift_policy ?? null,
        demoted_reason: prior.demoted_reason ?? null,
        merge_sha: typeof prior.merge_sha === 'string' ? prior.merge_sha : null,
        workflow_mode_prior: prior_wf,
        exec_stamped_keys: stamped_keys.length > 0 ? stamped_keys : null,
        exec_values: stamped_keys.length > 0 ? exec_values : null,
        resumed_from: attempt_id,
        status: 'running',
        pid: null
      }
    });

    // Re-stamp workflow_mode=fast_track from the PRIOR snapshot (set + readback).
    let mode_ok = false;
    try {
      await deps.bd.setMetadata(bead_id, 'workflow_mode', 'fast_track');
      const rb = await deps.bd.readMetadata(bead_id, 'workflow_mode');
      mode_ok = rb === 'fast_track';
    } catch (err) {
      log('resume workflow_mode set/readback failed for %s: %o', bead_id, err);
      mode_ok = false;
    }
    if (!mode_ok) {
      deps.store.updateAttempt(workspace, {
        attempt_id: new_attempt_id,
        patch: {
          status: 'failed',
          cause: 'workflow_mode_record_failed',
          finished_at: now()
        }
      });
      try {
        await revertWorkflowMode(bead_id, prior_wf);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return { ok: false, reason: 'workflow_mode_record_failed' };
    }

    // Re-stamp the exec keys with the PRIOR values (set + confirming readback).
    let exec_ok = true;
    for (const key of stamped_keys) {
      const value = exec_values[key];
      if (typeof value !== 'string') {
        continue;
      }
      try {
        await deps.bd.setMetadata(bead_id, key, value);
        const rb = await deps.bd.readMetadata(bead_id, key);
        if (rb !== value) {
          exec_ok = false;
          break;
        }
      } catch (err) {
        log('resume exec stamp failed for %s %s: %o', bead_id, key, err);
        exec_ok = false;
        break;
      }
    }
    if (!exec_ok) {
      await revertExecStamps(bead_id, stamped_keys);
      deps.store.updateAttempt(workspace, {
        attempt_id: new_attempt_id,
        patch: {
          status: 'failed',
          cause: 'exec_stamp_failed',
          finished_at: now()
        }
      });
      try {
        await revertWorkflowMode(bead_id, prior_wf);
      } catch {
        // Best-effort: bd may be down; the failed record already reflects it.
      }
      claimed.delete(bead_id);
      notifyChanged(workspace);
      return { ok: false, reason: 'exec_stamp_failed' };
    }

    // Reuse the existing worktree — no worktree.add / admission re-check (§1.3).
    const wt_path =
      typeof deps.worktree.pathFor === 'function'
        ? deps.worktree.pathFor(repo, bead_id)
        : '';
    await launchSession({
      workspace,
      attempt_id: new_attempt_id,
      bead_id,
      lane,
      repo,
      target_base,
      base_oid: prior.base_oid ?? null,
      runner_name,
      model: prior.model ?? null,
      effort: prior.effort ?? null,
      merge_policy,
      drift_policy: prior.drift_policy ?? null,
      prior_wf,
      stamped_keys,
      wt_path,
      spawnBead: {
        id: bead_id,
        prompt: resumePrompt(bead_id, prior.status ?? null)
      },
      resume_session_id: prior.session_id
    });

    return { ok: true, attempt_id: new_attempt_id };
  }

  /**
   * Externally-initiated tick: reopens dispatch-refused beads for a fresh
   * attempt, then runs one dispatch pass.
   *
   * @param {string} workspace
   * @returns {Promise<void>}
   */
  async function tick(workspace) {
    dispatch_refused.clear();
    await tickPass(workspace);
  }

  /**
   * One dispatch pass. Selects the serial head (skipping blocked) + fills
   * parallel slots, honoring auto_advance and the 1+N cap.
   *
   * @param {string} workspace
   * @returns {Promise<void>}
   */
  async function tickPass(workspace) {
    const q = deps.store.snapshot(workspace);
    if (!q.auto_advance) {
      return;
    }
    const paused_beads = leafPausedBeads(q);

    /** @type {Array<{ bead_id: string, lane: 'serial'|'parallel', snap: BeadSnapshot }>} */
    const to_dispatch = [];

    // Serial head: at most one serial session; skip blocked to next runnable.
    if (runningInLane('serial') === 0) {
      for (const entry of q.serial) {
        if (
          claimed.has(entry.bead_id) ||
          dispatch_refused.has(entry.bead_id) ||
          paused_beads.has(entry.bead_id)
        ) {
          continue;
        }
        let snap;
        try {
          snap = await deps.bd.snapshotBead(entry.bead_id);
        } catch {
          continue;
        }
        if (snap.ready && !snap.blocked) {
          const adm = await checkAdmission(snap);
          if (!adm.ok) {
            // Same skip semantics as a blocked head: record the refusal and
            // keep scanning so an inadmissible head never starves the lane.
            deps.store.recordAdmission(workspace, {
              bead_id: entry.bead_id,
              reason: adm.reason || 'git_error'
            });
            notifyChanged(workspace);
            continue;
          }
          to_dispatch.push({ bead_id: entry.bead_id, lane: 'serial', snap });
          break;
        }
        // blocked/not-ready serial head → skip to next runnable.
      }
    }

    // Parallel pool: fill remaining slots in slot-priority order.
    let free = parallel_slots - runningInLane('parallel');
    for (const entry of q.parallel) {
      if (free <= 0) {
        break;
      }
      if (
        claimed.has(entry.bead_id) ||
        dispatch_refused.has(entry.bead_id) ||
        paused_beads.has(entry.bead_id)
      ) {
        continue;
      }
      let snap;
      try {
        snap = await deps.bd.snapshotBead(entry.bead_id);
      } catch {
        continue;
      }
      if (snap.ready && !snap.blocked) {
        const adm = await checkAdmission(snap);
        if (!adm.ok) {
          deps.store.recordAdmission(workspace, {
            bead_id: entry.bead_id,
            reason: adm.reason || 'git_error'
          });
          notifyChanged(workspace);
          continue;
        }
        to_dispatch.push({ bead_id: entry.bead_id, lane: 'parallel', snap });
        free -= 1;
      }
    }

    // Claim synchronously, then dispatch (dispatch re-reads authoritatively).
    for (const d of to_dispatch) {
      claimed.add(d.bead_id);
    }
    await Promise.all(
      to_dispatch.map((d) => dispatch(workspace, d.bead_id, d.lane))
    );
  }

  /**
   * Tear down a live session for a user-initiated halt (⏸ and ■ share this).
   * Group-kills the tree, drops the claim, revokes the token, and frees a merge
   * lock already handed over to the worker (token revocation alone would not).
   * The breaker is NOT tripped and auto_advance is untouched — a user halt of
   * ONE attempt is not a repo failure (spec §5.2).
   *
   * @param {string} attempt_id
   * @param {{ bead_id: string, handle: RunnerHandle }} entry
   */
  function teardownLiveSession(attempt_id, entry) {
    stopped.add(attempt_id);
    try {
      entry.handle.kill('SIGTERM');
    } catch {
      // Best-effort; the process may already be gone.
    }
    running.delete(attempt_id);
    claimed.delete(entry.bead_id);
    deps.tokens.revoke(attempt_id);
    takeHandover(attempt_id)();
  }

  /**
   * Revert the bead metadata a halted attempt stamped: workflow_mode back to
   * its pre-launch value, plus any exec-setting stamps. Both are best-effort —
   * the terminal attempt record already reflects the halt.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {{ bead_id: string, prior: string|null }} entry
   */
  async function revertStamps(workspace, attempt_id, entry) {
    try {
      await revertWorkflowMode(entry.bead_id, entry.prior);
    } catch {
      // Best-effort: bd may be down; the terminal record already reflects it.
    }
    await revertExecStamps(
      entry.bead_id,
      execStampedKeysOf(workspace, attempt_id)
    );
  }

  /**
   * Pause a running attempt (tile ⏸, worker-phase1 §2.1). Same teardown as ■,
   * but the attempt lands in `paused` — resumable, never a failure — and the
   * bead STAYS in its lane. The worktree and session log are preserved so
   * `claude --resume <session_id>` can continue in place.
   *
   * Fail-closed on a missing session id: without it the attempt could never be
   * resumed, so pausing would silently become a discard.
   *
   * Ends with a `tick()` so the freed slot advances the queue (§2.1/§2.3) —
   * pausing one session must not stall the whole lane.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<{ ok: boolean, reason?: string }>}
   */
  async function pause(workspace, attempt_id) {
    const entry = running.get(attempt_id);
    if (!entry) {
      return { ok: false, reason: 'not_running' };
    }
    const rec = deps.store.snapshot(workspace).attempts[attempt_id];
    const sid = rec && rec.session_id;
    if (typeof sid !== 'string' || sid.length === 0) {
      return { ok: false, reason: 'no_session_id' };
    }
    teardownLiveSession(attempt_id, entry);
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { status: 'paused', cause: null, finished_at: now() }
    });
    await revertStamps(workspace, attempt_id, entry);
    notifyChanged(workspace);
    await tick(workspace);
    return { ok: true };
  }

  /**
   * Discard an attempt (tile ■, worker-phase1 §2.2). Terminal: the attempt
   * lands in `stopped` and the bead leaves every lane, so the tick that follows
   * cannot re-dispatch the work the user just abandoned. Re-running means
   * re-queueing the bead from the candidate list.
   *
   * The state write and the lane removal go through ONE store mutation — split
   * across two writes, a crash in between would leave a stopped attempt whose
   * bead is still queued.
   *
   * Also accepts a leaf `paused` attempt (its process is already gone): that
   * path only transitions the record and clears the lane.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<boolean>} True when an attempt was discarded.
   */
  async function stop(workspace, attempt_id) {
    const entry = running.get(attempt_id);
    if (entry) {
      teardownLiveSession(attempt_id, entry);
      deps.store.discardAttempt(workspace, {
        attempt_id,
        bead_id: entry.bead_id,
        patch: { status: 'stopped', cause: null, finished_at: now() }
      });
      await revertStamps(workspace, attempt_id, entry);
      notifyChanged(workspace);
      await tick(workspace);
      return true;
    }
    // No live process: a paused attempt discarded from its tile. Stamps were
    // already reverted at pause time.
    const snap = deps.store.snapshot(workspace);
    const rec = snap.attempts[attempt_id];
    if (!rec || rec.status !== 'paused') {
      return false;
    }
    // Leaf guard (§1.1): a resumed ancestor stays `paused` forever, and a
    // client rendering a stale tile could otherwise ■ it — pulling the bead of
    // the RUNNING child out of the lane. Server-side because resume fans out
    // only after its bd writes and spawn complete, leaving a real window.
    for (const a of Object.values(snap.attempts || {})) {
      if (a && a.resumed_from === attempt_id) {
        return false;
      }
    }
    deps.store.discardAttempt(workspace, {
      attempt_id,
      bead_id: rec.bead_id,
      patch: { status: 'stopped', cause: null, finished_at: now() }
    });
    notifyChanged(workspace);
    await tick(workspace);
    return true;
  }

  return {
    tick,
    stop,
    pause,
    resume,
    runningCount() {
      return running.size;
    },
    runningBeads() {
      return Array.from(running.values()).map((r) => r.bead_id);
    },
    /**
     * @param {string} bead_id
     * @returns {boolean}
     */
    isRunning(bead_id) {
      return claimed.has(bead_id);
    }
  };
}
