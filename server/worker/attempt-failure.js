/**
 * Build the failure predicate shared by the Worker projection and repair
 * reconciliation.
 *
 * SCOPE (2026-08-28 worker-failure-tiers spec §4): "unhandled failure" means a
 * failure that HALTED the queue, and only the retired regime's failures ever
 * did — they are exactly the records carrying `halted_auto_advance:true`. The
 * new tiers stop the queue through `queue.hold` instead and never write the
 * flag, so an `individual` failure sitting on the board must not hold a past
 * halt's dismiss, nor the deploy-restart `auto_advance` restore, closed.
 *
 * @param {{ attempts?: Record<string, any>, done?: any[] }} queue
 * @returns {(attempt: any) => boolean}
 */
export function createUnhandledFailurePredicate(queue) {
  const attempts = queue.attempts ? Object.values(queue.attempts) : [];
  /** @type {Map<string, string>} */
  const last_attempt_by_bead = new Map();
  for (const attempt of attempts) {
    // Head review / repair records share the history but not this judgment
    // (UI-hk74 §7): "the bead's last attempt" means its last IMPLEMENTATION
    // attempt, and a failed review must not read as an unhandled implementation
    // failure that holds the whole workspace's auto-advance restore closed.
    if (attempt && (attempt.kind ?? 'implementation') === 'implementation') {
      last_attempt_by_bead.set(attempt.bead_id, attempt.attempt_id);
    }
  }
  /** @type {Map<string, number>} */
  const done_at_by_bead = new Map();
  // Raw durable done entries, rather than a UI-filtered range, prove that work
  // finished after an attempt settled even when its row is no longer visible.
  for (const entry of queue.done || []) {
    if (
      entry &&
      typeof entry.bead_id === 'string' &&
      typeof entry.added_at === 'number'
    ) {
      done_at_by_bead.set(entry.bead_id, entry.added_at);
    }
  }

  /**
   * @param {any} attempt
   */
  return (attempt) => {
    const superseded =
      last_attempt_by_bead.get(attempt.bead_id) !== attempt.attempt_id;
    const done_at = done_at_by_bead.get(attempt.bead_id);
    const resolved_by_done =
      typeof done_at === 'number' &&
      done_at > 0 &&
      typeof attempt.finished_at === 'number' &&
      done_at >= attempt.finished_at;
    return (
      attempt.halted_auto_advance === true &&
      !superseded &&
      !resolved_by_done &&
      typeof attempt.dismissed_at !== 'number'
    );
  };
}
