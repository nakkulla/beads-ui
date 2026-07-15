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
import { assertRunnerAllowed } from './runner/index.js';

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
 * @property {{ issue: (attempt_id: string, meta: { repo: string, bead_id: string }) => string, revoke: (attempt_id: string) => void }} tokens
 * @property {{ verifyMerge: (i: { repo: string, target_base: string, merge_sha: string, bead_id: string }) => Promise<{ ok: boolean, reason: string }> }} verify
 * @property {ReturnType<typeof import('./breaker.js').createBreaker>} breaker
 * @property {{ attach: (workspace: string, attempt_id: string, events: import('node:events').EventEmitter) => void }} sessionLog
 * @property {(repo: string, target_base: string) => Promise<string>} resolveMergeSha
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
 *   runningCount: () => number,
 *   runningBeads: () => string[],
 *   isRunning: (bead_id: string) => boolean
 * }}
 */
export function createScheduler(deps) {
  const now = deps.now || (() => Date.now());
  const parallel_slots =
    typeof deps.parallel_slots === 'number' ? deps.parallel_slots : 2;
  let attempt_seq = 0;
  const makeAttemptId =
    deps.makeAttemptId || ((bead_id) => `${bead_id}-${now()}-${++attempt_seq}`);

  /**
   * Live sessions keyed by attempt_id.
   *
   * @type {Map<string, { bead_id: string, repo: string, lane: 'serial'|'parallel', handle: RunnerHandle }>}
   */
  const running = new Map();
  /** Beads currently claimed (dispatching or running) — prevents double launch. @type {Set<string>} */
  const claimed = new Set();

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
   * Handle a finished session: independent verify → Done, else breaker.
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
      await tick(workspace);
      return;
    }

    // Independent verification — session exit 0 is NOT enough (spec §5.2).
    let merge_sha = '';
    try {
      merge_sha = await deps.resolveMergeSha(snap.repo, snap.target_base);
    } catch {
      merge_sha = '';
    }
    const vr = await deps.verify.verifyMerge({
      repo: snap.repo,
      target_base: snap.target_base,
      merge_sha,
      bead_id
    });
    deps.store.updateAttempt(workspace, {
      attempt_id,
      patch: { verify_result: vr, merge_sha }
    });

    if (vr.ok) {
      deps.store.moveToDone(workspace, { bead_id });
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: { status: 'done', finished_at: now() }
      });
      // Bead closed → workflow_mode intentionally NOT reverted (spec §5.2).
    } else {
      await failAttempt(
        workspace,
        attempt_id,
        bead_id,
        snap,
        prior,
        `verify_failed:${vr.reason}`
      );
    }
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

    // full_plan entry guard (plan-save hook is claude-only).
    try {
      assertRunnerAllowed(
        { id: bead_id, route: snap.route, plan_path: snap.plan_path },
        /** @type {any} */ (runner_name)
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

    // Record + readback workflow_mode=fast_track (double-delivered with prompt).
    await deps.bd.setMetadata(bead_id, 'workflow_mode', 'fast_track');
    await deps.bd.readMetadata(bead_id, 'workflow_mode');

    const token = deps.tokens.issue(attempt_id, { repo: snap.repo, bead_id });
    const runner = deps.makeRunner(runner_name);
    const started_at = now();

    /** @type {RunnerHandle} */
    let handle;
    try {
      handle = runner.spawn(
        {
          id: bead_id,
          route: snap.route,
          plan_path: snap.plan_path
        },
        wt.path,
        {
          model: snap.model,
          effort: snap.effort,
          fast_track: true,
          env: { BDUI_WORKER_TOKEN: token }
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
        target_base: snap.target_base
      }
    });

    deps.sessionLog.attach(workspace, attempt_id, handle.events);
    running.set(attempt_id, { bead_id, repo: snap.repo, lane, handle });

    handle.done.then((verdict) =>
      onSessionDone(workspace, attempt_id, bead_id, snap, prior, verdict)
    );
  }

  /**
   * One dispatch pass. Selects the serial head (skipping blocked) + fills
   * parallel slots, honoring auto_advance and the 1+N cap.
   *
   * @param {string} workspace
   * @returns {Promise<void>}
   */
  async function tick(workspace) {
    const q = deps.store.snapshot(workspace);
    if (!q.auto_advance) {
      return;
    }

    /** @type {Array<{ bead_id: string, lane: 'serial'|'parallel', snap: BeadSnapshot }>} */
    const to_dispatch = [];

    // Serial head: at most one serial session; skip blocked to next runnable.
    if (runningInLane('serial') === 0) {
      for (const entry of q.serial) {
        if (claimed.has(entry.bead_id)) {
          continue;
        }
        let snap;
        try {
          snap = await deps.bd.snapshotBead(entry.bead_id);
        } catch {
          continue;
        }
        if (snap.ready && !snap.blocked) {
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
      if (claimed.has(entry.bead_id)) {
        continue;
      }
      let snap;
      try {
        snap = await deps.bd.snapshotBead(entry.bead_id);
      } catch {
        continue;
      }
      if (snap.ready && !snap.blocked) {
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

  return {
    tick,
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
