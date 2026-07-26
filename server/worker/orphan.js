/**
 * Orphan-session detection on beads-ui restart (spec §5.3).
 *
 * On restart auto_advance defaults OFF (Phase 9). A persisted attempt still
 * marked `running` may be an orphan — its process died with the old server, or
 * its PID was recycled by an unrelated process. Detection is NOT mere PID
 * existence: an attempt is an orphan unless a live process with the recorded PID
 * AND a matching start time exists (attempt_id + PID + start-time). A recycled
 * PID (same number, different start time) is an orphan.
 *
 * On an orphan: mark the attempt `orphaned`, turn `auto_advance` OFF, AND revert
 * the bead's `workflow_mode` to the value snapshotted before the dead session
 * launched (unset when it was originally absent) — otherwise a stray
 * `fast_track` left by the crashed session would silently switch a later manual
 * session to unattended (spec §5.2). The worktree is NOT deleted — cleanup
 * ownership is unclear, so we leave it and surface the banner (the
 * stop-on-unclear-ownership principle).
 *
 * The `auto_advance` OFF is what stops the queue now that the circuit breaker is
 * gone (worker-phase2 §2): it mirrors the scheduler's `failAttempt` exactly, so
 * an orphan and a session failure halt the queue by the same one mechanism, and
 * the banner renders off the terminal attempt record.
 */

/**
 * @typedef {Object} PidProbe
 * @property {boolean} alive - A process with this PID currently exists.
 * @property {number|null} started_at - That process's start time (epoch ms), if known.
 */

/**
 * Build a detector that scans persisted `running` attempts and reaps orphans.
 *
 * @param {{
 *   store: any,
 *   probePid: (pid: number|null) => PidProbe,
 *   bd?: { setMetadata: (bead_id: string, key: string, value: string) => Promise<void>, unsetMetadata: (bead_id: string, key: string) => Promise<void> },
 *   now?: () => number,
 *   tolerance_ms?: number
 * }} deps
 * @returns {{ detect: (workspace: string) => { attempt_id: string, bead_id: string, repo: string|null }[] }}
 */
export function createOrphanDetector(deps) {
  const now = deps.now || (() => Date.now());
  const tolerance =
    typeof deps.tolerance_ms === 'number' ? deps.tolerance_ms : 2000;

  /**
   * Revert workflow_mode to the pre-launch value (unset when originally absent),
   * fire-and-forget so a bd failure never blocks orphan reaping.
   *
   * @param {string} bead_id
   * @param {string|null} prior
   */
  function revertWorkflowMode(bead_id, prior) {
    if (!deps.bd) {
      return;
    }
    const op =
      prior == null
        ? deps.bd.unsetMetadata(bead_id, 'workflow_mode')
        : deps.bd.setMetadata(bead_id, 'workflow_mode', prior);
    Promise.resolve(op).catch(() => {
      // Best-effort: the orphan is already recorded + the queue already halted.
    });
  }

  /**
   * Unset the exec-setting metadata keys the dead session stamped onto the bead
   * (worker-global-exec-defaults §3), fire-and-forget like the workflow_mode
   * revert so a bd failure never blocks orphan reaping.
   *
   * @param {string} bead_id
   * @param {string[]|null|undefined} keys
   */
  function revertExecStamps(bead_id, keys) {
    if (!deps.bd || !Array.isArray(keys)) {
      return;
    }
    for (const key of keys) {
      Promise.resolve(deps.bd.unsetMetadata(bead_id, key)).catch(() => {
        // Best-effort: the orphan is already recorded + the queue already halted.
      });
    }
  }

  /**
   * @param {any} attempt
   * @returns {boolean}
   */
  function isOrphan(attempt) {
    if (attempt.pid == null) {
      return true;
    }
    const probe = deps.probePid(attempt.pid);
    if (!probe.alive) {
      return true;
    }
    // A live PID with a mismatched start time is a recycled PID → orphan.
    if (
      attempt.started_at != null &&
      probe.started_at != null &&
      Math.abs(probe.started_at - attempt.started_at) > tolerance
    ) {
      return true;
    }
    return false;
  }

  return {
    /**
     * @param {string} workspace
     * @returns {{ attempt_id: string, bead_id: string, repo: string|null }[]}
     */
    detect(workspace) {
      const q = deps.store.snapshot(workspace);
      /** @type {{ attempt_id: string, bead_id: string, repo: string|null }[]} */
      const orphans = [];
      for (const [attempt_id, attempt] of Object.entries(q.attempts)) {
        const a = /** @type {any} */ (attempt);
        if (a.status !== 'running') {
          continue;
        }
        if (!isOrphan(a)) {
          continue;
        }
        deps.store.updateAttempt(workspace, {
          attempt_id,
          patch: { status: 'orphaned', finished_at: now(), cause: 'orphan' }
        });
        // Halt the queue: an orphan means the prior run died mid-flight, so the
        // next tick must not launch on top of an unexplained failure.
        deps.store.setAutoAdvance(workspace, false);
        // Revert the mode the dead session recorded (spec §5.2).
        revertWorkflowMode(a.bead_id, a.workflow_mode_prior ?? null);
        // Revert the exec-setting stamps the dead session wrote (§3).
        revertExecStamps(a.bead_id, a.exec_stamped_keys ?? null);
        // Worktree is intentionally NOT removed (ownership unclear → banner).
        orphans.push({ attempt_id, bead_id: a.bead_id, repo: a.repo ?? null });
      }
      return orphans;
    }
  };
}
