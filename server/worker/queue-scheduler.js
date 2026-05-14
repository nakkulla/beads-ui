const SUCCESS_STATUS = 'succeeded';
const TICK_MS = 1000;

/**
 * @typedef {{ issueId?: string, phase: 'goal' | 'pr_finish', prNumber?: number, parallel?: boolean }} SpawnPhaseInput
 */

/**
 * @typedef {{ id: string }} SpawnedPhase
 */

/**
 * @typedef {{ number: number, url: string }} PrLink
 */

/**
 * @typedef {{ jobId: string, issueId: string, prNumber: number, remainingMs: number, totalMs: number, cancelled: boolean, parallel: boolean }} ReviewWait
 */

/**
 * @typedef {{ issueId: string, phase: 'goal' | 'pr_finish', jobId: string, parallel?: boolean }} JobStartInput
 */

/**
 * @typedef {{ issueId: string, phase: 'goal' | 'pr_finish', sessionId: string }} JobSessionInput
 */

/**
 * @typedef {{ issueId: string, phase: 'goal' | 'pr_finish', status: string, jobId: string }} JobExitInput
 */

/**
 * @param {{ queue_state: any, pr_review_wait_ms: number, advance_delay_ms: number, now?: () => string, spawn_phase: (input: SpawnPhaseInput) => Promise<SpawnedPhase>, find_prs: (issue_id: string) => Promise<PrLink[]>, broadcast: (type: string, payload: Record<string, unknown>) => void }} options
 */
export function createQueueScheduler(options) {
  let paused = false;
  /** @type {ReturnType<typeof setInterval> | null} */
  let advance_timer = null;
  /** @type {{ issueId: string, remainingMs: number, totalMs: number, parallel: boolean } | null} */
  let advance_countdown = null;
  /** @type {string | null} */
  let serial_active_issue_id = null;
  /** @type {Set<string>} */
  const active_parallel_issue_ids = new Set();
  /** @type {Map<string, ReviewWait>} */
  const review_waits = new Map();
  /** @type {Map<string, ReturnType<typeof setInterval>>} */
  const review_timers = new Map();

  return {
    getSnapshot,
    setPaused,
    handleJobStart,
    handleJobSession,
    handleJobExit,
    finishNow,
    cancelAutoPrFinish,
    runPrFinish,
    cancelReviewWaitJob,
    skipAdvance,
    cancelAutoStart,
    restoreReviewWaits,
    canStart
  };

  function getSnapshot() {
    return {
      paused,
      countdown: advance_countdown
        ? { issueId: advance_countdown.issueId }
        : null,
      pr_review_waits: Object.fromEntries(review_waits.entries())
    };
  }

  /**
   * @param {boolean} next_paused
   */
  function setPaused(next_paused) {
    paused = next_paused === true;
    options.broadcast('queue.paused', { paused });
    if (paused) {
      clearAdvanceTimer();
      return;
    }
    void scheduleAdvance();
  }

  /**
   * @param {{ parallel?: boolean }} input
   */
  function canStart(input) {
    return input.parallel === true || serial_active_issue_id == null;
  }

  /**
   * @param {JobStartInput} input
   */
  async function handleJobStart(input) {
    if (input.parallel === true) {
      active_parallel_issue_ids.add(input.issueId);
    } else {
      serial_active_issue_id = input.issueId;
    }
    await options.queue_state.moveToProgress(input.issueId);
    await options.queue_state.setLastJob(
      input.issueId,
      input.phase,
      input.jobId
    );
    options.broadcast('job.started', input);
  }

  /**
   * @param {JobSessionInput} input
   */
  async function handleJobSession(input) {
    await options.queue_state.setLastSession(
      input.issueId,
      input.phase,
      input.sessionId
    );
    options.broadcast('job.session_id', input);
  }

  /**
   * @param {JobExitInput} input
   */
  async function handleJobExit(input) {
    options.broadcast('job.exited', input);
    const was_parallel = isParallelActive(input.issueId);
    const succeeded = input.status === SUCCESS_STATUS;

    if (input.phase === 'goal') {
      if (!succeeded) {
        releaseActiveSlot(input.issueId, was_parallel);
        await options.queue_state.clearProgress(input.issueId);
        pauseAfterTerminalFailure(input);
        return;
      }

      const prs = await options.find_prs(input.issueId);
      const pr = prs[0] || null;
      await options.queue_state.cachePrLink(input.issueId, pr);

      if (pr) {
        await startReviewWait(
          input.issueId,
          input.jobId,
          pr.number,
          was_parallel
        );
        return;
      }

      const released_serial = releaseActiveSlot(input.issueId, was_parallel);
      await options.queue_state.clearProgress(input.issueId);
      if (released_serial) {
        void scheduleAdvance();
      }
      return;
    }

    const released_serial = releaseActiveSlot(input.issueId, was_parallel);
    await options.queue_state.clearProgress(input.issueId);
    if (!succeeded) {
      pauseAfterTerminalFailure(input);
      return;
    }
    if (released_serial) {
      void scheduleAdvance();
    }
  }

  /**
   * @param {string} issue_id
   */
  async function finishNow(issue_id) {
    clearReviewTimer(issue_id);
    return runPrFinish(issue_id);
  }

  /**
   * @param {string} issue_id
   */
  async function cancelAutoPrFinish(issue_id) {
    const wait = review_waits.get(issue_id);
    if (wait) {
      wait.cancelled = true;
    }
    clearReviewTimer(issue_id);
    await options.queue_state.cancelReviewWait(issue_id);
    options.broadcast('job.pr_review_wait_cancelled', { issueId: issue_id });
  }

  /**
   * @param {string} issue_id
   */
  async function runPrFinish(issue_id) {
    const wait = review_waits.get(issue_id);
    if (!wait) {
      return null;
    }
    clearReviewTimer(issue_id);
    review_waits.delete(issue_id);
    await options.queue_state.clearReviewWait(issue_id);
    return options.spawn_phase(
      createSpawnInput({
        issueId: issue_id,
        phase: 'pr_finish',
        prNumber: wait.prNumber,
        parallel: wait.parallel
      })
    );
  }

  /**
   * @param {string} issue_id
   */
  async function cancelReviewWaitJob(issue_id) {
    clearReviewTimer(issue_id);
    review_waits.delete(issue_id);
    releaseActiveSlot(issue_id, active_parallel_issue_ids.has(issue_id));
    await options.queue_state.clearReviewWait(issue_id);
    await options.queue_state.clearProgress(issue_id);
    options.broadcast('job.pr_review_wait_cancelled', { issueId: issue_id });
  }

  async function skipAdvance() {
    const countdown = advance_countdown;
    if (!countdown) {
      return null;
    }
    clearAdvanceTimer();
    return options.spawn_phase(
      createSpawnInput({
        issueId: countdown.issueId,
        phase: 'goal',
        parallel: countdown.parallel
      })
    );
  }

  function cancelAutoStart() {
    clearAdvanceTimer();
    options.broadcast('queue.countdown_cancelled', {});
  }

  async function restoreReviewWaits() {
    if (typeof options.queue_state.listIssues !== 'function') {
      return;
    }
    const issues = await options.queue_state.listIssues();
    for (const issue of issues) {
      const metadata = issue?.metadata || {};
      const started_at = metadata.worker_pr_review_wait_started_at;
      if (typeof started_at !== 'string' || started_at.length === 0) {
        continue;
      }
      const cancelled =
        String(metadata.worker_pr_review_wait_cancelled || '') === 'true';
      const pr_number = Number.parseInt(String(metadata.pr_number || ''), 10);
      if (!Number.isFinite(pr_number)) {
        continue;
      }
      const elapsed_ms =
        Date.parse(options.now?.() || new Date().toISOString()) -
        Date.parse(started_at);
      const remaining_ms = Math.max(
        0,
        options.pr_review_wait_ms -
          (Number.isFinite(elapsed_ms) ? elapsed_ms : 0)
      );
      const wait = createReviewWait(
        String(issue.id),
        String(metadata.worker_last_goal_job_id || ''),
        pr_number,
        isParallelIssue(issue),
        remaining_ms,
        options.pr_review_wait_ms,
        cancelled
      );
      review_waits.set(wait.issueId, wait);
      occupyActiveSlot(wait.issueId, wait.parallel);
      if (wait.cancelled) {
        continue;
      }
      if (remaining_ms <= 0) {
        await runPrFinish(wait.issueId);
      } else {
        startReviewTimer(wait.issueId);
      }
    }
  }

  /**
   * @param {string} issue_id
   * @param {string} job_id
   * @param {number} pr_number
   * @param {boolean} parallel
   */
  async function startReviewWait(issue_id, job_id, pr_number, parallel) {
    const wait = createReviewWait(
      issue_id,
      job_id,
      pr_number,
      parallel,
      options.pr_review_wait_ms,
      options.pr_review_wait_ms
    );
    review_waits.set(issue_id, wait);
    await options.queue_state.startReviewWait(
      issue_id,
      options.now?.() || new Date().toISOString()
    );
    options.broadcast('job.pr_review_wait', createReviewWaitPayload(wait));
    startReviewTimer(issue_id);
  }

  async function scheduleAdvance() {
    if (paused) {
      return;
    }
    clearAdvanceTimer();
    const waiting_cards = await options.queue_state.listWaitingCards();
    const head = waiting_cards[0];
    if (!head) {
      return;
    }
    const issue_id = String(head.id || '');
    const parallel = isParallelIssue(head);
    if (!head.spec_id) {
      options.broadcast('queue.blocked', {
        reason: 'Spec required to enter queue',
        issueId: issue_id
      });
      return;
    }
    if (!parallel && serial_active_issue_id) {
      return;
    }

    advance_countdown = {
      issueId: issue_id,
      remainingMs: options.advance_delay_ms,
      totalMs: options.advance_delay_ms,
      parallel
    };
    options.broadcast('queue.countdown', createAdvancePayload());
    advance_timer = setInterval(() => {
      if (!advance_countdown) {
        clearAdvanceTimer();
        return;
      }
      advance_countdown.remainingMs = Math.max(
        0,
        advance_countdown.remainingMs - TICK_MS
      );
      options.broadcast('queue.countdown', createAdvancePayload());
      if (advance_countdown.remainingMs <= 0) {
        const countdown = advance_countdown;
        clearAdvanceTimer();
        void options.spawn_phase(
          createSpawnInput({
            issueId: countdown.issueId,
            phase: 'goal',
            parallel: countdown.parallel
          })
        );
      }
    }, TICK_MS);
  }

  /**
   * @param {JobExitInput} input
   */
  function pauseAfterTerminalFailure(input) {
    paused = true;
    clearAdvanceTimer();
    const reason = `${input.phase} ${input.status}; queue paused`;
    options.broadcast('queue.paused', {
      paused: true,
      reason,
      issueId: input.issueId,
      phase: input.phase,
      status: input.status,
      jobId: input.jobId
    });
    options.broadcast('queue.blocked', {
      reason,
      issueId: input.issueId,
      phase: input.phase,
      status: input.status,
      jobId: input.jobId
    });
  }

  function clearAdvanceTimer() {
    if (advance_timer) {
      clearInterval(advance_timer);
      advance_timer = null;
    }
    advance_countdown = null;
  }

  /**
   * @param {string} issue_id
   */
  function startReviewTimer(issue_id) {
    clearReviewTimer(issue_id);
    const wait = review_waits.get(issue_id);
    if (!wait || wait.cancelled) {
      return;
    }
    review_timers.set(
      issue_id,
      setInterval(() => {
        const current_wait = review_waits.get(issue_id);
        if (!current_wait || current_wait.cancelled) {
          clearReviewTimer(issue_id);
          return;
        }
        current_wait.remainingMs = Math.max(
          0,
          current_wait.remainingMs - TICK_MS
        );
        options.broadcast(
          'job.pr_review_wait',
          createReviewWaitPayload(current_wait)
        );
        if (current_wait.remainingMs <= 0) {
          void runPrFinish(issue_id);
        }
      }, TICK_MS)
    );
  }

  /**
   * @param {string} issue_id
   */
  function clearReviewTimer(issue_id) {
    const timer = review_timers.get(issue_id);
    if (!timer) {
      return;
    }
    clearInterval(timer);
    review_timers.delete(issue_id);
  }

  /**
   * @param {string} issue_id
   */
  function isParallelActive(issue_id) {
    const wait = review_waits.get(issue_id);
    return active_parallel_issue_ids.has(issue_id) || wait?.parallel === true;
  }

  /**
   * @param {string} issue_id
   * @param {boolean} parallel
   */
  function occupyActiveSlot(issue_id, parallel) {
    if (parallel) {
      active_parallel_issue_ids.add(issue_id);
      return;
    }
    serial_active_issue_id = issue_id;
  }

  /**
   * @param {string} issue_id
   * @param {boolean} was_parallel
   */
  function releaseActiveSlot(issue_id, was_parallel) {
    if (was_parallel) {
      active_parallel_issue_ids.delete(issue_id);
      return false;
    }
    if (serial_active_issue_id === issue_id) {
      serial_active_issue_id = null;
      return true;
    }
    return serial_active_issue_id == null;
  }

  function createAdvancePayload() {
    if (!advance_countdown) {
      return {};
    }
    return {
      issueId: advance_countdown.issueId,
      nextIssueId: advance_countdown.issueId,
      remainingMs: advance_countdown.remainingMs,
      totalMs: advance_countdown.totalMs,
      parallel: advance_countdown.parallel
    };
  }
}

/**
 * @param {unknown} issue
 */
function isParallelIssue(issue) {
  const value = /** @type {any} */ (issue);
  return (
    value?.parallel === true ||
    String(value?.metadata?.worker_parallel || '').toLowerCase() === 'true'
  );
}

/**
 * @param {string} issue_id
 * @param {string} job_id
 * @param {number} pr_number
 * @param {boolean} parallel
 * @param {number} remaining_ms
 * @param {number} total_ms
 * @param {boolean} [cancelled]
 * @returns {ReviewWait}
 */
function createReviewWait(
  issue_id,
  job_id,
  pr_number,
  parallel,
  remaining_ms,
  total_ms,
  cancelled = false
) {
  return {
    jobId: job_id,
    issueId: issue_id,
    prNumber: pr_number,
    remainingMs: remaining_ms,
    totalMs: total_ms,
    cancelled,
    parallel
  };
}

/**
 * @param {ReviewWait} wait
 */
function createReviewWaitPayload(wait) {
  return {
    jobId: wait.jobId,
    issueId: wait.issueId,
    prNumber: wait.prNumber,
    remainingMs: wait.remainingMs,
    totalMs: wait.totalMs,
    cancelled: wait.cancelled,
    parallel: wait.parallel
  };
}

/**
 * @param {SpawnPhaseInput} input
 * @returns {SpawnPhaseInput}
 */
function createSpawnInput(input) {
  const output = {
    issueId: input.issueId,
    phase: input.phase,
    ...(input.prNumber == null ? {} : { prNumber: input.prNumber })
  };
  if (input.parallel === true) {
    return { ...output, parallel: true };
  }
  return output;
}
