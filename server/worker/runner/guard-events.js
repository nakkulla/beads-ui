import nodeFs from 'node:fs';
import { debug } from '../../logging.js';
import { guardEventLogPath, guardInvokedMarkerPath } from '../guard-hook.js';
import { createTailReader } from './tail-reader.js';

const log = debug('worker:guard-events');

/**
 * The reason a Codex attempt's guard hook was never observed running.
 *
 * @type {string}
 */
const HOOK_NOT_LOADED = 'codex_hook_not_loaded';

/**
 * The warning sentence a judged-unloaded Codex attempt carries.
 *
 * @type {string}
 */
const HOOK_NOT_LOADED_MESSAGE =
  'Codex 세션에서 가드 훅 호출이 확인되지 않았습니다.';

/**
 * Judge once whether a Codex attempt's guard hook ran (UI-zoig §3.4), at the
 * moment a shell command has completed: the hook runs synchronously before the
 * command and creates the invoked marker first, so a missing marker means the
 * hook was never invoked.
 *
 * The judged flag is written BEFORE the warning, and the warning is delivered
 * only by appending to the attempt's guard event log — the line
 * {@link monitorGuardEvents} already turns into the timeline event, the
 * attempt's `guard_warnings`, and the session-log publish, with byte-offset
 * dedupe across restart replays. A crash between the two writes can therefore
 * lose the warning but never duplicate it. Claude, session-lane, and already
 * judged attempts are left alone; a home-preparation warning already recorded
 * counts as the judgment. Never throws.
 *
 * @param {{ workspace: string, attempt_id: string, store: any, fs?: typeof nodeFs, now?: () => number }} input
 */
export function judgeCodexHookLoad(input) {
  const fs = input.fs || nodeFs;
  try {
    const attempt = input.store.snapshot(input.workspace).attempts[
      input.attempt_id
    ];
    if (
      !attempt ||
      attempt.runner !== 'codex' ||
      attempt.exec === 'session' ||
      attempt.guard_hook_judged === true
    ) {
      return;
    }
    input.store.updateAttempt(input.workspace, {
      attempt_id: input.attempt_id,
      patch: { guard_hook_judged: true }
    });
    const prior = Array.isArray(attempt.guard_warnings)
      ? attempt.guard_warnings
      : [];
    if (
      prior.some(
        (/** @type {any} */ warning) => warning?.reason === HOOK_NOT_LOADED
      )
    ) {
      return;
    }
    if (
      fs.existsSync(guardInvokedMarkerPath(input.workspace, input.attempt_id))
    ) {
      return;
    }
    const at = input.now ? input.now() : Date.now();
    fs.appendFileSync(
      guardEventLogPath(input.workspace, input.attempt_id),
      `${JSON.stringify({
        kind: 'guard_warning',
        reason: HOOK_NOT_LOADED,
        command: null,
        runner: 'codex',
        message: HOOK_NOT_LOADED_MESSAGE,
        at
      })}\n`
    );
  } catch (err) {
    log('codex hook-load judgment failed for %s: %o', input.attempt_id, err);
  }
}

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
          !['claude', 'codex', 'agy'].includes(event.runner) ||
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
        const summary =
          event.kind === 'guard_warning' &&
          typeof event.message === 'string' &&
          event.message.length > 0
            ? `가드 경고 — ${event.message}`
            : `${event.kind === 'guard_denied' ? '실행 전 거부' : '가드 경고'} — ${event.runner}: ${event.reason}`;
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
