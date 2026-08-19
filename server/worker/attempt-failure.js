/**
 * Build the failure predicate shared by the Worker projection and repair
 * reconciliation.
 *
 * @param {{ attempts?: Record<string, any>, done?: any[] }} queue
 * @returns {(attempt: any) => boolean}
 */
export function createUnhandledFailurePredicate(queue) {
  const attempts = queue.attempts ? Object.values(queue.attempts) : [];
  /** @type {Map<string, string>} */
  const last_attempt_by_bead = new Map();
  for (const attempt of attempts) {
    if (attempt) {
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
      !superseded &&
      !resolved_by_done &&
      typeof attempt.dismissed_at !== 'number'
    );
  };
}
