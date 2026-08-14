/**
 * Detached-session monitors (UI-o2yt §3.3).
 *
 * A session spawned detached outlives the server that started it. Before this
 * module the restart cost was total: the drawer's live follow froze, the merge
 * guard and question fail-closed died with the stream, and the usage tally
 * stopped — an orphan session then ran to completion with no safety contract
 * over it.
 *
 * With the runner writing its jsonl straight to the session-log file, the
 * missing half is a READER. A monitor is exactly that: the same tail reader the
 * live engine uses, driven without a child handle. It re-broadcasts lines to the
 * drawer broker, keeps tallying usage, and re-arms the guard — but it never
 * resolves a verdict. Judging the end stays with the reconcile pass's pid probe
 * and the `gh` observation behind it; a monitor only makes sure that judgment
 * has the evidence it would have had without the restart.
 *
 * @import { Attempt } from './queue-store.js'
 */
import nodeFs from 'node:fs';
import { debug } from '../logging.js';
import { claudeSpec } from './runner/claude.js';
import {
  findMergeViolation,
  guardEffect,
  guardWarningMessage
} from './runner/command-guard.js';
import { adapterSpec } from './runner/index.js';
import { createTailReader } from './runner/tail-reader.js';
import { PID_START_TOLERANCE_MS } from './scheduler.js';

const log = debug('worker:session-monitor');

/**
 * Usage-only fanout cadence, mirroring the scheduler's live-session throttle: a
 * usage tick is not a queue transition, so a streaming orphan must not push a
 * snapshot per event.
 *
 * @type {number}
 */
export const MONITOR_USAGE_FANOUT_MS = 3000;

/**
 * @typedef {Object} SessionMonitorDeps
 * @property {any} store - Queue store (queue-store.js).
 * @property {{ pathFor: (workspace: string, attempt_id: string) => string, publish: (workspace: string, attempt_id: string, event: unknown) => void }} sessionLog
 * @property {ReturnType<typeof import('./usage-store.js').createUsageStore>} [usage]
 * @property {(pid: number|null) => { alive: boolean, started_at: number|null }} probePid
 * @property {(pid: number, signal?: NodeJS.Signals|number) => void} [kill_impl]
 * @property {{ probe: (identity: { pid: number, pgid: number, started_at: number }) => { state: 'owned'|'gone'|'recycled'|'unknown', reason?: string }, signal: (identity: { pid: number, pgid: number, started_at: number }, signal: NodeJS.Signals|number) => { ok: boolean, state: 'owned'|'gone'|'recycled'|'unknown', reason?: string } }} [processController]
 * @property {(workspace: string) => void} [notifyChanged]
 * @property {import('./runner/session.js').AdapterSpec} [spec] - A FIXED adapter
 * for every attempt, overriding the per-attempt pick. Test seam only: a real
 * process monitors attempts of more than one runner at once.
 * @property {(runner_name: string|null) => import('./runner/session.js').AdapterSpec} [specFor] -
 * Pick the adapter for one attempt's recorded runner (`runner/index.js`
 * `adapterSpec` by default).
 * @property {typeof import('node:fs')} [fs]
 * @property {number} [poll_ms]
 * @property {() => number} [now]
 */

/**
 * Build the per-process monitor registry.
 *
 * @param {SessionMonitorDeps} deps
 */
export function createSessionMonitors(deps) {
  const fixed_spec = deps.spec || null;
  const specFor = deps.specFor || ((runner_name) => adapterSpec(runner_name));
  const kill_impl =
    deps.kill_impl || ((pid, signal) => process.kill(pid, signal));
  const now = deps.now || (() => Date.now());
  const fs = deps.fs || nodeFs;

  /**
   * @type {Map<string, { workspace: string, attempt_id: string, repo: string|null, target_base: string|null, disposition: boolean, killed: boolean, spec: import('./runner/session.js').AdapterSpec, reader: ReturnType<typeof createTailReader> }>}
   */
  const monitors = new Map();
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  const usage_timers = new Map();

  /**
   * The adapter that WROTE this attempt's log. Reading a codex log through the
   * claude adapter silently yields no usage and no guard subject at all, so the
   * pick has to be per-attempt: one process monitors orphans of both runners.
   *
   * Never throws — a monitor that cannot resolve an adapter still has to read
   * the log, and claude is what every pre-catalog attempt record means.
   *
   * @param {any} attempt
   * @returns {import('./runner/session.js').AdapterSpec}
   */
  function specForAttempt(attempt) {
    if (fixed_spec) {
      return fixed_spec;
    }
    const runner_name =
      typeof attempt.runner === 'string' && attempt.runner.length > 0
        ? attempt.runner
        : null;
    try {
      return specFor(runner_name);
    } catch (err) {
      log('adapter resolve failed for runner %s: %o', runner_name, err);
      return claudeSpec();
    }
  }

  /**
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {string}
   */
  function keyOf(workspace, attempt_id) {
    return `${workspace}\u0000${attempt_id}`;
  }

  /**
   * @param {string} workspace
   */
  function notifyChanged(workspace) {
    if (typeof deps.notifyChanged !== 'function') {
      return;
    }
    try {
      deps.notifyChanged(workspace);
    } catch (err) {
      log('monitor fanout failed for %s: %o', workspace, err);
    }
  }

  /**
   * @param {string} workspace
   */
  function scheduleUsageFanout(workspace) {
    if (usage_timers.has(workspace)) {
      return;
    }
    const timer = setTimeout(() => {
      usage_timers.delete(workspace);
      notifyChanged(workspace);
    }, MONITOR_USAGE_FANOUT_MS);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
    usage_timers.set(workspace, timer);
  }

  /**
   * Read an attempt record back off the store.
   *
   * @param {string} workspace
   * @param {string} attempt_id
   * @returns {any}
   */
  function attemptOf(workspace, attempt_id) {
    try {
      const q = deps.store.snapshot(workspace);
      return (q && q.attempts ? q.attempts[attempt_id] : null) || null;
    } catch {
      return null;
    }
  }

  /**
   * @param {any} attempt
   * @returns {{ pid: number, pgid: number, started_at: number }|null}
   */
  function processIdentityOf(attempt) {
    const identity = attempt?.process_identity;
    if (
      identity &&
      Number.isInteger(identity.pid) &&
      Number.isInteger(identity.pgid) &&
      Number.isFinite(identity.started_at)
    ) {
      return identity;
    }
    if (
      attempt &&
      Number.isInteger(attempt.pid) &&
      Number.isFinite(attempt.started_at)
    ) {
      return {
        pid: attempt.pid,
        pgid: attempt.pid,
        started_at: attempt.started_at
      };
    }
    return null;
  }

  /**
   * Does the recorded pid still belong to THIS attempt? Aliveness alone is not
   * enough: a recycled pid is a different process wearing the same number, and
   * signalling it would kill an innocent bystander. The same judgment the
   * scheduler's reconcile makes, applied before every signal (UI-o2yt §3.3).
   *
   * @param {any} attempt
   * @returns {boolean}
   */
  function pidStillOurs(attempt) {
    if (deps.processController) {
      const identity = processIdentityOf(attempt);
      return (
        identity !== null &&
        deps.processController.probe(identity).state === 'owned'
      );
    }
    if (!attempt || typeof attempt.pid !== 'number') {
      return false;
    }
    const probe = deps.probePid(attempt.pid);
    if (!probe.alive) {
      return false;
    }
    if (attempt.started_at == null || probe.started_at == null) {
      // One side unknown: the probe says alive and nothing contradicts it.
      return true;
    }
    return (
      Math.abs(probe.started_at - attempt.started_at) <= PID_START_TOLERANCE_MS
    );
  }

  /**
   * Record a guard verdict the session SURVIVES onto the attempt (UI-1xcd §1).
   *
   * The live runner reaches the same field through the scheduler's event
   * subscription; a monitor has no handle to subscribe to, so it writes the
   * record itself. Read-modify-write off the store rather than an in-memory
   * accumulator: this path exists precisely because the server restarted, so
   * whatever the previous process accumulated is only on disk.
   *
   * Never throws and never kills — a warning that cannot be persisted is a lost
   * diagnostic, not a reason to end a session that broke no invariant.
   *
   * @param {{ workspace: string, attempt_id: string }} entry
   * @param {{ reason: string, command: string|null }} detail
   */
  function guardWarn(entry, detail) {
    const { workspace, attempt_id } = entry;
    const attempt = attemptOf(workspace, attempt_id);
    const prior = Array.isArray(attempt?.guard_warnings)
      ? attempt.guard_warnings
      : [];
    try {
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          guard_warnings: [
            ...prior,
            { reason: detail.reason, command: detail.command, at: now() }
          ]
        }
      });
    } catch (err) {
      log('guard-warning record failed for %s: %o', attempt_id, err);
    }
  }

  /**
   * Fail-closed stop of an orphan session: record the blocker evidence FIRST,
   * then signal.
   *
   * The order is the contract (UI-o2yt §3.3). A killed session leaves no verdict
   * behind — the reconcile pass judges it by `gh` observation, and an already
   * pushed PR would otherwise read as success for a session that was killed for
   * a guard violation. The durable evidence is what lets `disposeDeadAttempt`
   * fail it anyway, so it must exist before the process can die.
   *
   * @param {{ workspace: string, attempt_id: string, killed: boolean }} entry
   * @param {{ reason: string, command: string|null }} detail
   */
  function guardKill(entry, detail) {
    if (entry.killed) {
      return;
    }
    const { workspace, attempt_id } = entry;
    try {
      deps.store.updateAttempt(workspace, {
        attempt_id,
        patch: {
          guard_kill: {
            reason: detail.reason,
            command: detail.command,
            at: now()
          },
          cause_detail: { reason: detail.reason, command: detail.command }
        }
      });
    } catch (err) {
      log('guard-kill evidence write failed for %s: %o', attempt_id, err);
    }
    const attempt = attemptOf(workspace, attempt_id);
    // Readback, not the write's own word: killing a session whose evidence is
    // not durable is exactly the laundering this path exists to prevent — the
    // reconcile pass would then see a silent death and a pushed PR, and call it
    // success. Unrecorded ⇒ no signal, and the next violating line retries.
    if (!attempt || !attempt.guard_kill) {
      log('guard-kill aborted (evidence not durable) for %s', attempt_id);
      return;
    }
    entry.killed = true;
    if (!pidStillOurs(attempt)) {
      // Dead or recycled: no signal at all — the reconcile pass disposes it,
      // and the evidence written above still drives that disposition.
      log('guard-kill skipped (pid no longer ours) for %s', attempt_id);
      notifyChanged(workspace);
      return;
    }
    const identity = processIdentityOf(attempt);
    if (deps.processController && identity) {
      const result = deps.processController.signal(identity, 'SIGTERM');
      if (!result.ok) {
        log(
          'guard-kill signal refused for %s: %s/%s',
          attempt_id,
          result.state,
          result.reason || 'no_reason'
        );
      }
    } else {
      try {
        kill_impl(-attempt.pid, 'SIGTERM');
      } catch (err) {
        log('guard-kill signal failed for %s: %o', attempt_id, err);
      }
    }
    notifyChanged(workspace);
  }

  /**
   * Feed one tailed line through the drawer broker, the usage tally, and the
   * fail-closed guards — the live engine's `onLine` pipeline minus the verdict.
   *
   * @param {{ workspace: string, attempt_id: string, repo: string|null, target_base: string|null, disposition: boolean, killed: boolean, spec: import('./runner/session.js').AdapterSpec }} entry
   * @param {string} line
   */
  function handleLine(entry, line) {
    const trimmed = line.trim();
    if (trimmed.length === 0) {
      return;
    }
    /** @type {any} */
    let obj;
    try {
      obj = JSON.parse(trimmed);
    } catch {
      return;
    }
    const { workspace, attempt_id } = entry;

    try {
      deps.sessionLog.publish(workspace, attempt_id, obj);
    } catch (err) {
      log('drawer re-broadcast failed for %s: %o', attempt_id, err);
    }

    if (deps.usage) {
      const lifted = entry.spec.liftUsage(obj);
      if (lifted) {
        if (lifted.kind === 'result') {
          deps.usage.recordResult(workspace, attempt_id, lifted.usage);
        } else {
          deps.usage.record(workspace, attempt_id, lifted.usage);
        }
        scheduleUsageFanout(workspace);
      }
    }

    const question_reason = entry.spec.detectQuestion(obj);
    if (question_reason) {
      guardKill(entry, { reason: question_reason, command: null });
      return;
    }
    if (typeof entry.spec.extractShellCommand === 'function') {
      const cmd = entry.spec.extractShellCommand(obj);
      const violation = cmd
        ? findMergeViolation(cmd, {
            disposition: entry.disposition,
            repo: entry.repo,
            target_base: entry.target_base
          })
        : null;
      // guardEffect() is the SAME function the live runner (session.js) judges
      // by, so a restart cannot demote a kill to a warning or the reverse
      // (guard-enforcement-layer-replacement §Phase 2).
      if (violation && guardEffect(violation) === 'warn') {
        // Two consumers, and the DURABLE one is the point (UI-1xcd §1): the
        // broker publish only reaches a drawer that happens to be open, so the
        // attempt record is what makes the warning outlive the session.
        guardWarn(entry, {
          reason: violation.reason,
          command: violation.command
        });
        // Same RunnerEvent shape as session.js's guard_warning (kind='error',
        // matching `reason`) so the two paths carry one semantic contract even
        // though they reach the drawer through different channels; fail-quiet
        // for any renderer that does not recognize it (kind='error' is unused
        // by the adapters' own `type` vocabulary, so nothing mis-renders it as
        // jsonl).
        try {
          deps.sessionLog.publish(entry.workspace, entry.attempt_id, {
            kind: 'error',
            reason: violation.reason,
            message: guardWarningMessage(violation),
            guard_warning: {
              reason: violation.reason,
              command: violation.command
            },
            raw: obj
          });
        } catch (err) {
          log('guard-warning publish failed for %s: %o', attempt_id, err);
        }
      } else if (violation) {
        guardKill(entry, {
          reason: violation.reason,
          command: violation.command
        });
      }
    }
  }

  return {
    /**
     * Start monitoring one persisted `running` attempt. Refuses (returns false)
     * when the attempt is already monitored or its pid is dead/recycled — a
     * session nobody can signal needs no guard, and the reconcile pass owns it.
     *
     * @param {string} workspace
     * @param {any} attempt
     * @param {{ start_offset?: number }} [options] - Byte offset to resume the
     * log at: the line boundary the startup usage replay consumed up to, so
     * the two readers split the file with no gap and no overlap.
     * @returns {boolean}
     */
    start(workspace, attempt, options = {}) {
      if (!attempt || typeof attempt.attempt_id !== 'string') {
        return false;
      }
      const attempt_id = attempt.attempt_id;
      const key = keyOf(workspace, attempt_id);
      if (monitors.has(key)) {
        return false;
      }
      if (!pidStillOurs(attempt)) {
        return false;
      }
      /** @type {{ workspace: string, attempt_id: string, repo: string|null, target_base: string|null, disposition: boolean, killed: boolean, spec: import('./runner/session.js').AdapterSpec, reader: any }} */
      const entry = {
        workspace,
        attempt_id,
        spec: specForAttempt(attempt),
        repo: typeof attempt.repo === 'string' ? attempt.repo : null,
        target_base:
          typeof attempt.target_base === 'string' ? attempt.target_base : null,
        // Same normalization session.js applies to `settings.disposition`: the
        // durable field is a disposition KIND string (`'revise_fix'`, …) or
        // null, never a boolean, but findMergeViolation's own normalization is
        // a strict `=== true` check, so the string→boolean fold has to happen
        // here rather than being reproduced inside command-guard.js.
        disposition:
          typeof attempt.disposition === 'string'
            ? attempt.disposition.length > 0
            : attempt.disposition === true,
        killed: false,
        reader: null
      };
      entry.reader = createTailReader({
        file: deps.sessionLog.pathFor(workspace, attempt_id),
        fs,
        poll_ms: deps.poll_ms,
        // Reattach at the handoff boundary: the past belongs to the drawer
        // snapshot and the usage replay, so the monitor owns only what follows
        // it — including the remainder of a line that was half-written at the
        // moment of reattach, which it reads and completes normally.
        start_offset: options.start_offset,
        onLine: (l) => handleLine(entry, l),
        onError: (err, kind) => {
          log('tail %s error for %s: %o', kind, attempt_id, err);
          if (kind === 'open') {
            monitors.delete(key);
          }
        }
      });
      monitors.set(key, entry);
      entry.reader.start();
      return true;
    },

    /**
     * Stop one monitor, draining the file to EOF first so the lines written
     * between the last poll and the process's death are still processed — that
     * drain is what makes the caller's terminal usage patch complete (§3.3).
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {boolean}
     */
    stop(workspace, attempt_id) {
      const key = keyOf(workspace, attempt_id);
      const entry = monitors.get(key);
      if (!entry) {
        return false;
      }
      monitors.delete(key);
      try {
        entry.reader.drain();
      } catch (err) {
        log('final drain failed for %s: %o', attempt_id, err);
      }
      try {
        entry.reader.stop();
      } catch {
        /* ignore */
      }
      return true;
    },

    /**
     * @param {string} workspace
     * @param {string} attempt_id
     */
    has(workspace, attempt_id) {
      return monitors.has(keyOf(workspace, attempt_id));
    },

    size() {
      return monitors.size;
    },

    /**
     * Stop every monitor (server shutdown / test reset).
     */
    stopAll() {
      for (const { workspace, attempt_id } of [...monitors.values()]) {
        this.stop(workspace, attempt_id);
      }
      for (const timer of usage_timers.values()) {
        clearTimeout(timer);
      }
      usage_timers.clear();
    }
  };
}
