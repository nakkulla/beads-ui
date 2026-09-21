import nodeFs from 'node:fs';
import { guardEventLogPath } from '../guard-hook.js';
import { createTailReader } from './tail-reader.js';

/**
 * Consume hook evidence through the workspace's registered timeline writer.
 * Stable byte offsets deduplicate a replay after a Worker restart.
 *
 * @param {{ workspace: string, attempt_id: string, store: any, sessionLog: any, timeline?: ReturnType<typeof import('../bead-timeline.js').createBeadTimeline>, fs?: typeof nodeFs, poll_ms?: number }} input
 */
export function monitorGuardEvents(input) {
  const fs = input.fs || nodeFs;
  const file = guardEventLogPath(input.workspace, input.attempt_id);
  const reader = createTailReader({
    file,
    fs,
    poll_ms: input.poll_ms,
    onLine(line, offset) {
      try {
        const event = JSON.parse(line);
        if (
          !['guard_denied', 'guard_warning'].includes(event.kind) ||
          !['claude', 'codex'].includes(event.runner) ||
          typeof event.reason !== 'string'
        ) {
          return;
        }
        const attempt = input.store.snapshot(input.workspace).attempts[
          input.attempt_id
        ];
        if (!attempt) {
          return;
        }
        const command =
          typeof event.command === 'string' ? event.command : null;
        const at =
          typeof event.at === 'number' ? event.at : attempt.started_at || 0;
        const summary = `${event.kind === 'guard_denied' ? '실행 전 거부' : '가드 경고'} — ${event.runner}: ${event.reason}`;
        const record = {
          bead_id: attempt.bead_id,
          attempt_id: input.attempt_id,
          kind: event.kind,
          seq: `hook-${offset}`,
          summary,
          at,
          runner: event.runner,
          reason: event.reason,
          command,
          ...(command === null ? {} : { detail: command })
        };
        if (input.timeline) {
          input.timeline.append(record);
        } else {
          input.store.recordTimelineEvent(input.workspace, record);
        }
        if (event.kind === 'guard_warning') {
          const prior = Array.isArray(attempt.guard_warnings)
            ? attempt.guard_warnings
            : [];
          if (
            !prior.some(
              (/** @type {any} */ warning) =>
                warning.at === at &&
                warning.reason === event.reason &&
                warning.command === command
            )
          ) {
            input.store.updateAttempt(input.workspace, {
              attempt_id: input.attempt_id,
              patch: {
                guard_warnings: [
                  ...prior,
                  { reason: event.reason, command, at }
                ]
              }
            });
          }
        }
        input.sessionLog.publish(input.workspace, input.attempt_id, {
          kind: event.kind,
          message: summary,
          runner: event.runner,
          reason: event.reason,
          command
        });
      } catch {
        // One malformed line cannot discard later hook evidence.
      }
    }
  });
  reader.start();
  return {
    stop() {
      reader.drain();
      reader.stop();
    }
  };
}
