/**
 * Rebuild a running attempt's token tally from its session log (UI-ediw).
 *
 * The usage store is in-memory by design, so a beads-ui restart loses the live
 * tally of every attempt still running — and since the detached session's
 * stdout pipe died with the old process, no later event can refill it. What
 * survives is the session log: `session-log.js` already persisted the raw
 * stream per attempt, so every usage event UP TO the restart is on disk.
 *
 * Replay feeds those raw events back through the SAME lift + record pair the
 * live path uses (`runner/claude.js` `liftUsage` → `usage-store`), which is
 * what keeps the recovered number identical to the one the live stream had.
 * Events after the restart are gone for good, so the result is marked
 * `replayed` — a partial tally that says so beats a missing badge.
 *
 * @import { createUsageStore } from './usage-store.js'
 * @import { createSessionLog } from './session-log.js'
 */
import { liftUsage } from './runner/claude.js';

/**
 * Replay one attempt's persisted stream into the usage store.
 *
 * Returns false when there was nothing to recover (no log, no usage events) —
 * and also when the replay throws: a startup recovery that cannot read a log
 * must degrade to "no badge", never hold up the reconcile pass behind it.
 *
 * @param {{
 *   session_log: ReturnType<typeof createSessionLog>,
 *   usage_store: ReturnType<typeof createUsageStore>,
 *   workspace: string,
 *   attempt_id: string
 * }} input
 * @returns {boolean}
 */
export function replayUsage(input) {
  const { session_log, usage_store, workspace, attempt_id } = input;
  try {
    let recorded = 0;
    for (const raw of session_log.read(workspace, attempt_id)) {
      const lifted = liftUsage(raw);
      if (!lifted) {
        continue;
      }
      if (lifted.kind === 'result') {
        usage_store.recordResult(workspace, attempt_id, lifted.usage);
      } else {
        usage_store.record(workspace, attempt_id, lifted.usage);
      }
      recorded += 1;
    }
    if (recorded === 0) {
      return false;
    }
    usage_store.markReplayed(workspace, attempt_id);
    return true;
  } catch {
    return false;
  }
}
