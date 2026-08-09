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
 * live path uses (the attempt's own adapter `liftUsage` → `usage-store`), which
 * is what keeps the recovered number identical to the one the live stream had.
 * The adapter is picked by the attempt's recorded runner, because a codex log
 * read through the claude lift yields nothing at all rather than a wrong number.
 * Events after the restart are gone for good, so the result is marked
 * `replayed` — a partial tally that says so beats a missing badge.
 *
 * @import { createUsageStore } from './usage-store.js'
 * @import { createSessionLog } from './session-log.js'
 */
import { adapterSpec } from './runner/index.js';

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
 *   attempt_id: string,
 *   end_offset?: number,
 *   runner?: string|null
 * }} input - `end_offset` bounds the replay at the handoff boundary a
 * reattached monitor continues from (UI-o2yt §3.3); omitted, the whole log is
 * replayed, which is what a dead attempt's recovery wants. `runner` names the
 * adapter that wrote the log; absent or unknown, claude reads it, which is what
 * every attempt recorded before the field carried a value needs.
 * @returns {boolean}
 */
export function replayUsage(input) {
  const { session_log, usage_store, workspace, attempt_id, end_offset } = input;
  try {
    const { liftUsage } = adapterSpec(input.runner ?? null);
    let recorded = 0;
    const lines =
      typeof end_offset === 'number'
        ? session_log.read(workspace, attempt_id, { end_offset })
        : session_log.read(workspace, attempt_id);
    for (const raw of lines) {
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
