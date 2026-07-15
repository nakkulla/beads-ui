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
 * On an orphan: mark the attempt Failed/orphaned and trip the repo's breaker
 * with a banner. The worktree is NOT deleted — cleanup ownership is unclear, so
 * we leave it and surface the banner (the stop-on-unclear-ownership principle).
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
 *   breaker: { trip: (repo: string, info: { bead_id: string, cause: string }) => unknown },
 *   probePid: (pid: number|null) => PidProbe,
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
        if (a.repo) {
          deps.breaker.trip(a.repo, { bead_id: a.bead_id, cause: 'orphan' });
        }
        // Worktree is intentionally NOT removed (ownership unclear → banner).
        orphans.push({ attempt_id, bead_id: a.bead_id, repo: a.repo ?? null });
      }
      return orphans;
    }
  };
}
