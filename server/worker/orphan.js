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
 *   bd?: { setMetadata: (bead_id: string, key: string, value: string) => Promise<void>, unsetMetadata: (bead_id: string, key: string) => Promise<void>, setStatus?: (bead_id: string, status: string) => Promise<void>, readStatus?: (bead_id: string) => Promise<string|null> },
 *   onBeadRecovered?: (workspace: string, bead_id: string) => void,
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
   * Revert workflow_mode to the pre-launch value (unset when originally absent).
   * Best-effort: a bd failure resolves rather than rejects so it never blocks
   * the rest of the reap.
   *
   * @param {string} bead_id
   * @param {string|null} prior
   * @returns {Promise<void>}
   */
  function revertWorkflowMode(bead_id, prior) {
    if (!deps.bd) {
      return Promise.resolve();
    }
    const op =
      prior == null
        ? deps.bd.unsetMetadata(bead_id, 'workflow_mode')
        : deps.bd.setMetadata(bead_id, 'workflow_mode', prior);
    return Promise.resolve(op).catch(() => {
      // Best-effort: the orphan is already recorded + the queue already halted.
    });
  }

  /**
   * Unset the exec-setting metadata keys the dead session stamped onto the bead
   * (worker-global-exec-defaults §3), best-effort like the workflow_mode revert.
   *
   * @param {string} bead_id
   * @param {string[]|null|undefined} keys
   * @returns {Promise<void>}
   */
  function revertExecStamps(bead_id, keys) {
    const bd = deps.bd;
    if (!bd || !Array.isArray(keys)) {
      return Promise.resolve();
    }
    return Promise.all(
      keys.map((key) =>
        Promise.resolve(bd.unsetMetadata(bead_id, key)).catch(() => {
          // Best-effort: the orphan is already recorded + the queue halted.
        })
      )
    ).then(() => undefined);
  }

  /**
   * Reopen a bead the dead session left CLAIMED. Only `in_progress` is touched:
   * that is the state a session takes and never gave back, and it hides the
   * bead from `bd ready` so every later tick skips it silently. `resolved` /
   * `closed` are real progress the reap must not rewrite.
   *
   * @param {string} bead_id
   * @returns {Promise<boolean>} True when the reopen was confirmed by readback.
   */
  async function releaseBeadClaim(bead_id) {
    const bd = deps.bd;
    if (
      !bd ||
      typeof bd.readStatus !== 'function' ||
      typeof bd.setStatus !== 'function'
    ) {
      return false;
    }
    if ((await bd.readStatus(bead_id)) !== 'in_progress') {
      return false;
    }
    await bd.setStatus(bead_id, 'open');
    return (await bd.readStatus(bead_id)) === 'open';
  }

  /**
   * The reap's bd tail, run as ONE ordered pipeline so `detect` stays
   * synchronous while the writes still happen in a defined order.
   *
   * Ordering is load-bearing: the reopen is what makes the bead dispatchable
   * again, and `onBeadRecovered` ticks the queue. Racing that against the
   * metadata reverts could dispatch a fresh attempt while the dead session's
   * `fast_track` / exec stamps are still on the bead — the next attempt would
   * then snapshot them as the bead's OWN values and never revert them, which is
   * exactly what the revert exists to prevent (spec §5.2).
   *
   * `onBeadRecovered` fires on a CONFIRMED reopen only.
   *
   * @param {string} workspace
   * @param {any} attempt
   */
  function finalizeReapedBead(workspace, attempt) {
    const bead_id = attempt.bead_id;
    Promise.resolve()
      .then(() =>
        revertWorkflowMode(bead_id, attempt.workflow_mode_prior ?? null)
      )
      .then(() => revertExecStamps(bead_id, attempt.exec_stamped_keys ?? null))
      .then(() => releaseBeadClaim(bead_id))
      .then((recovered) => {
        if (recovered && typeof deps.onBeadRecovered === 'function') {
          deps.onBeadRecovered(workspace, bead_id);
        }
      })
      .catch(() => {
        // Best-effort: the orphan is already recorded + the queue already halted.
      });
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
        // Revert the mode + exec stamps the dead session recorded (spec §5.2 /
        // §3), THEN give back the claim it held — without the reopen the bead
        // stays out of `bd ready` and every later tick skips it without a trace.
        finalizeReapedBead(workspace, a);
        // Worktree is intentionally NOT removed (ownership unclear → banner).
        orphans.push({ attempt_id, bead_id: a.bead_id, repo: a.repo ?? null });
      }
      return orphans;
    }
  };
}
