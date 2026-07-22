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
import { resolvePolicies } from './policy.js';
import { assertRunnerAllowed } from './runner/index.js';

const log = debug('worker:scheduler');

/**
 * @typedef {Object} BeadSnapshot
 * @property {boolean} ready - Runnable now.
 * @property {boolean} blocked - Blocked by unmet dependencies.
 * @property {string} repo - Target repo root.
 * @property {string} target_base - Merge target base (branch/ref).
 * @property {string} [runner] - worker_runner (claude/codex/ccx).
 * @property {string} [model] - orchestration_model.
 * @property {string} [effort] - orchestration_effort.
 * @property {string|null} [workflow_mode] - Current workflow_mode metadata.
 * @property {string|null} [route] - Workflow route (e.g. full_plan).
 * @property {string|null} [plan_path] - Plan path when present.
 * @property {string} [status] - Issue status (open/in_progress/resolved/closed).
 * @property {unknown} [plan_review] - Raw plan_review metadata value. Key
 * absence ⇒ `undefined`; any present value (non-string/null included) must
 * reach the guard so an invalid receipt blocks instead of reading as absent.
 * @property {boolean|null} [plan_fresh] - Precomputed plan freshness (true/false
 * when a full_plan bead has a valid receipt; null otherwise/undetermined).
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
 * @property {{ add: (i: { repo: string, bead_id: string, base: string }) => Promise<{ path: string, branch: string, base_oid: string }>, remove: (i: { repo: string, bead_id: string }) => Promise<any> }} worktree
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
    await revertWorkflowMode(bead_id, prior);
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
    if (!vc || !merge_sha) {
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
      if (
        merge_policy === 'auto_merge' &&
        typeof deps.runVerifyCmd === 'function' &&
        typeof (/** @type {any} */ (deps.worktree).addDetached) === 'function'
      ) {
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
        // stray fast_track must not switch that session to unattended.
        try {
          await revertWorkflowMode(bead_id, prior);
        } catch {
          // Best-effort: bd may be down; the done record still lands.
        }
      }
      // auto_merge: bead closed → workflow_mode intentionally NOT reverted.
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
    const runner_name = snap.runner || 'claude';

    // full_plan entry guard (plan-save hook is claude-only). Freshness is
    // precomputed in snapshotBead against the canonical workspace root, so pass
    // it through — a worktree here would lack the plan-doc ancestry.
    try {
      assertRunnerAllowed(
        {
          id: bead_id,
          route: snap.route,
          plan_path: snap.plan_path,
          plan_review: snap.plan_review,
          status: snap.status
        },
        /** @type {any} */ (runner_name),
        { plan_fresh: snap.plan_fresh ?? undefined }
      );
    } catch {
      claimed.delete(bead_id);
      return;
    }
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

    const token = deps.tokens.issue(attempt_id, {
      repo: snap.repo,
      bead_id,
      target_base: snap.target_base
    });
    const runner = deps.makeRunner(runner_name);
    const started_at = now();

    /** @type {RunnerHandle} */
    let handle;
    try {
      handle = runner.spawn(
        {
          id: bead_id,
          route: snap.route,
          plan_path: snap.plan_path,
          plan_review: snap.plan_review,
          status: snap.status,
          plan_fresh: snap.plan_fresh
        },
        wt.path,
        {
          model: snap.model,
          effort: snap.effort,
          fast_track: true,
          merge_policy,
          drift_policy,
          env: { BDUI_WORKER_TOKEN: token },
          // Inject the concrete merge-lock endpoint params so the session's
          // preamble acquires the (repo, target_base) lock before merging (F3).
          // The preamble omits the block under pr_stop (no merge → no lock).
          merge_lock: {
            port: resolvePort(),
            repo: snap.repo,
            target_base: snap.target_base
          }
        }
      );
    } catch {
      deps.tokens.revoke(attempt_id);
      claimed.delete(bead_id);
      return;
    }

    // Persist the attempt record + runtime snapshot (spec §5.2).
    deps.store.appendAttempt(workspace, {
      expected_revision: deps.store.snapshot(workspace).revision,
      attempt: { attempt_id, bead_id }
    });
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: {
        base_oid: wt.base_oid,
        head_oid: wt.base_oid,
        started_at,
        pid: handle.pid,
        runner: runner_name,
        model: snap.model ?? null,
        effort: snap.effort ?? null,
        repo: snap.repo,
        status: 'running',
        workflow_mode_prior: prior,
        target_base: snap.target_base,
        merge_policy,
        drift_policy,
        demoted_reason
      }
    });

    deps.store.clearAdmission(workspace, bead_id);
    deps.sessionLog.attach(workspace, attempt_id, handle.events);
    running.set(attempt_id, { bead_id, repo: snap.repo, lane, handle, prior });
    notifyChanged(workspace);

    handle.done.then((verdict) =>
      onSessionDone(workspace, attempt_id, bead_id, snap, prior, verdict)
    );
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

    /** @type {Array<{ bead_id: string, lane: 'serial'|'parallel', snap: BeadSnapshot }>} */
    const to_dispatch = [];

    // Serial head: at most one serial session; skip blocked to next runnable.
    if (runningInLane('serial') === 0) {
      for (const entry of q.serial) {
        if (claimed.has(entry.bead_id) || dispatch_refused.has(entry.bead_id)) {
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
      if (claimed.has(entry.bead_id) || dispatch_refused.has(entry.bead_id)) {
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
   * Explicitly stop a running attempt (tile ■). Group-kills the session tree,
   * marks the attempt failed, revokes its token (which releases any held merge
   * lock via the token-revoke wiring, F4), and reverts workflow_mode to the
   * pre-launch value. The breaker is NOT tripped and auto_advance is untouched —
   * this is a user halt of ONE attempt, not a repo failure (spec §5.2).
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {Promise<boolean>} True when a live attempt was stopped.
   */
  async function stop(workspace, attempt_id) {
    const entry = running.get(attempt_id);
    if (!entry) {
      return false;
    }
    stopped.add(attempt_id);
    try {
      entry.handle.kill('SIGTERM');
    } catch {
      // Best-effort; the process may already be gone.
    }
    running.delete(attempt_id);
    claimed.delete(entry.bead_id);
    deps.tokens.revoke(attempt_id);
    // A lock already handed over to the worker survives token revocation by
    // design — free it here so a stopped attempt cannot leak the merge lock.
    takeHandover(attempt_id)();
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { status: 'failed', cause: 'stopped', finished_at: now() }
    });
    try {
      await revertWorkflowMode(entry.bead_id, entry.prior);
    } catch {
      // Best-effort: bd may be down; the failed record already reflects it.
    }
    return true;
  }

  return {
    tick,
    stop,
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
