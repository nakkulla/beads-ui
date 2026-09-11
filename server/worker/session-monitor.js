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
import { observeCodexChildren as defaultObserveCodexChildren } from './codex-children/reader.js';
import { claudeSpec } from './runner/claude.js';
import {
  findMergeViolation,
  guardEffect,
  guardWarningMessage
} from './runner/command-guard.js';
import { resolveGuardPending } from './runner/guard-mirror.js';
import { adapterSpec } from './runner/index.js';
import { createTailReader } from './runner/tail-reader.js';
import { PID_START_TOLERANCE_MS } from './scheduler.js';
import { delegatedLaunchIdOf } from './session-log.js';

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
 * @property {{ pathFor: (workspace: string, attempt_id: string) => string, publish: (workspace: string, attempt_id: string, event: unknown, launch_id?: string) => void }} sessionLog
 * @property {ReturnType<typeof import('./usage-store.js').createUsageStore>} [usage]
 * @property {ReturnType<typeof import('./session-observation.js').createWorkerSessionObservationStore>} [workerSessionObservations]
 * @property {ReturnType<typeof import('./delegation-store.js').createDelegationStore>} [delegation] -
 * Live Claude subagent tally (UI-2mpn §5.4), fed from the SAME lift the live
 * engine uses so a reattached monitor continues the state the dead process was
 * building rather than starting a second one.
 * @property {(pid: number|null) => { alive: boolean, started_at: number|null }} probePid
 * @property {(pid: number, signal?: NodeJS.Signals|number) => void} [kill_impl]
 * @property {{ probe: (identity: { pid: number, pgid: number, started_at: number }) => { state: 'owned'|'gone'|'recycled'|'unknown', reason?: string }, signal: (identity: { pid: number, pgid: number, started_at: number }, signal: NodeJS.Signals|number) => { ok: boolean, state: 'owned'|'gone'|'recycled'|'unknown', reason?: string } }} [processController]
 * @property {(workspace: string) => void} [notifyChanged]
 * @property {(input: { attempt: any, parent_terminated?: boolean }) => import('./codex-children/accumulate.js').CodexChildRow[]} [observeCodexChildren] -
 * Codex NATIVE subagent observation (UI-mn5u §6.3), read from the rollout files
 * Codex itself wrote. The monitor is the live half of that reader: it runs the
 * SAME function the terminal settlement and a post-restart re-read run, on the
 * monitor's own coalesced cadence, so the live rows and the settled rows can
 * never disagree.
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
   * @type {Map<string, { workspace: string, attempt_id: string, repo: string|null, target_base: string|null, disposition: boolean, quickfix_lane: boolean, codex: boolean, killed: boolean, spec: import('./runner/session.js').AdapterSpec, guard_mirror: 'verified'|'absent'|null, guard_pending: import('./runner/guard-mirror.js').GuardPendingEntry[], terminated: boolean, reader: ReturnType<typeof createTailReader> }>}
   */
  const monitors = new Map();
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  const usage_timers = new Map();
  const observeChildren =
    deps.observeCodexChildren || defaultObserveCodexChildren;
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  const child_timers = new Map();
  /** @type {Map<string, string>} */
  const child_identities = new Map();

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
   * The identity of one child observation, so a scan that learned nothing new
   * costs no fanout and no republish.
   *
   * @param {import('./codex-children/accumulate.js').CodexChildRow[]} rows
   * @returns {string}
   */
  function childIdentity(rows) {
    return rows
      .map(
        (row) =>
          `${row.thread_id}:${row.status}:${row.last_event_at || 0}:${
            row.usage ? row.usage.total_tokens || 0 : ''
          }`
      )
      .join('|');
  }

  /**
   * Observe this codex attempt's native children and republish what changed.
   *
   * The rollout files are the only source (fixture notes §1: `codex exec --json`
   * carries no child event at all), so this is a READ of files Codex wrote —
   * no new daemon, no parallel observation store, and no cursor of its own. The
   * republished record is source-tagged and fail-quiet: a drawer that does not
   * know `codex_child` renders nothing rather than mis-reading it as jsonl.
   *
   * @param {{ workspace: string, attempt_id: string, codex: boolean }} entry
   * @param {boolean} parent_terminated
   */
  function scanChildren(entry, parent_terminated) {
    if (!entry.codex) {
      return;
    }
    const { workspace, attempt_id } = entry;
    const attempt = attemptOf(workspace, attempt_id);
    if (!attempt) {
      return;
    }
    let prepared = null;
    try {
      prepared = deps.workerSessionObservations?.observe(workspace, attempt, {
        parent_terminated
      });
    } catch (err) {
      log('root usage observation failed for %s: %o', attempt_id, err);
    }
    /** @type {import('./codex-children/accumulate.js').CodexChildRow[]} */
    /** @type {import('./codex-children/accumulate.js').CodexChildRow[]|null} */
    let rows = Array.isArray(prepared?.codex_children)
      ? prepared.codex_children
      : null;
    if (rows === null) {
      try {
        rows = observeChildren({ attempt, parent_terminated });
      } catch (err) {
        log('native child observation failed for %s: %o', attempt_id, err);
        return;
      }
    }
    const key = keyOf(workspace, attempt_id);
    const prepared_usage = deps.workerSessionObservations?.get(
      workspace,
      attempt_id
    );
    const identity = `${childIdentity(rows)}:${JSON.stringify(
      prepared_usage?.usage_segments || []
    )}`;
    deps.workerSessionObservations?.set(workspace, attempt_id, {
      codex_children: rows
    });
    if (identity === (child_identities.get(key) || '')) {
      return;
    }
    child_identities.set(key, identity);
    for (const row of rows) {
      try {
        deps.sessionLog.publish(workspace, attempt_id, {
          kind: 'codex_child',
          source: 'codex_rollout',
          child: row
        });
      } catch (err) {
        log('native child publish failed for %s: %o', attempt_id, err);
      }
    }
    notifyChanged(workspace);
  }

  /**
   * Observe this codex attempt's children on the monitor's OWN cadence, from
   * the moment it starts until it stops.
   *
   * A parent's log lines are the wrong clock (§6.3): a parent that is waiting
   * on `wait_agent` writes nothing for minutes while its children run, and a
   * fresh launch may write nothing at all before the first child appears. The
   * timer re-arms itself so the observation continues independently of the
   * parent stream, and it is unref'd so it never holds the process open.
   *
   * @param {{ workspace: string, attempt_id: string, codex: boolean }} entry
   */
  function armChildScan(entry) {
    if (!entry.codex) {
      return;
    }
    const key = keyOf(entry.workspace, entry.attempt_id);
    if (child_timers.has(key)) {
      return;
    }
    const timer = setTimeout(() => {
      child_timers.delete(key);
      if (!monitors.has(key)) {
        return;
      }
      scanChildren(entry, false);
      armChildScan(entry);
    }, MONITOR_USAGE_FANOUT_MS);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
    child_timers.set(key, timer);
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
   * The file this attempt's transcript is being written to, and the record's
   * own answer for it (record-timeline-retention §4).
   *
   * The STORED `log_path` wins verbatim. A record that names none — every
   * attempt dispatched before this field was written — resolves to the
   * spawn-side default and the path is then PERSISTED onto the record, so the
   * value a later move has to update exists before anything moves. The write
   * happens BEFORE the reader opens the file: `session-monitor` reconnecting is
   * exactly the moment §4 requires the record to be accurate.
   *
   * Fail-quiet: a store that rejects the patch still gets a monitor, because a
   * bookkeeping write must never cost a running session its guard.
   *
   * @param {string} workspace
   * @param {any} attempt
   * @returns {string}
   */
  function logFileOf(workspace, attempt) {
    const recorded = attempt?.log_path;
    if (typeof recorded === 'string' && recorded.length > 0) {
      return recorded;
    }
    const file = deps.sessionLog.pathFor(workspace, attempt.attempt_id);
    try {
      deps.store.updateAttempt(workspace, {
        attempt_id: attempt.attempt_id,
        patch: { log_path: file }
      });
    } catch (err) {
      log('log_path persist failed for %s: %o', attempt.attempt_id, err);
    }
    return file;
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
   * Record one surviving guard verdict on both consumers: the durable attempt
   * record (UI-1xcd §1) and the drawer broker.
   *
   * The DURABLE one is the point: the broker publish only reaches a drawer that
   * happens to be open, so the attempt record is what makes the warning outlive
   * the session. The published shape matches session.js's `guard_warning` event
   * (kind='error', matching `reason`) so the two paths carry one semantic
   * contract; fail-quiet for any renderer that does not recognize it.
   *
   * @param {{ workspace: string, attempt_id: string }} entry
   * @param {import('./runner/command-guard.js').MergeViolation} violation
   * @param {any} obj - The raw line the verdict came from.
   */
  function recordGuardWarning(entry, violation, obj) {
    guardWarn(entry, {
      reason: violation.reason,
      command: violation.command
    });
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
      log('guard-warning publish failed for %s: %o', entry.attempt_id, err);
    }
  }

  /**
   * Persist the monitor's held verdicts (§3). The in-memory list is the cache;
   * the attempt record is what a restart reads.
   *
   * @param {{ workspace: string, attempt_id: string, guard_pending: import('./runner/guard-mirror.js').GuardPendingEntry[] }} entry
   */
  function persistGuardPending(entry) {
    try {
      deps.store.updateAttempt(entry.workspace, {
        attempt_id: entry.attempt_id,
        patch: {
          guard_pending:
            entry.guard_pending.length > 0 ? [...entry.guard_pending] : null
        }
      });
    } catch (err) {
      log('guard-pending record failed for %s: %o', entry.attempt_id, err);
    }
  }

  /**
   * Hold one arm 3 verdict until its `tool_result` arrives (§3).
   *
   * @param {{ workspace: string, attempt_id: string, guard_pending: import('./runner/guard-mirror.js').GuardPendingEntry[] }} entry
   * @param {import('./runner/guard-mirror.js').GuardPendingEntry} pending
   */
  function addGuardPending(entry, pending) {
    entry.guard_pending = [...entry.guard_pending, pending];
    persistGuardPending(entry);
  }

  /**
   * Release one held verdict, whichever way it was settled (§3).
   *
   * @param {{ workspace: string, attempt_id: string, guard_pending: import('./runner/guard-mirror.js').GuardPendingEntry[] }} entry
   * @param {import('./runner/guard-mirror.js').GuardPendingEntry} pending
   */
  function clearGuardPending(entry, pending) {
    entry.guard_pending = entry.guard_pending.filter(
      (held) => held.tool_use_id !== pending.tool_use_id
    );
    persistGuardPending(entry);
  }

  /**
   * Settle the verdicts a terminated session left held (§4).
   *
   * A session that ENDED with verdicts still held has nothing left to kill.
   * The deferrals become `hook_bypass_unresolved` warnings — diagnostic
   * evidence, not a failure class. A `stop()` without termination (server
   * shutdown) keeps them, and the re-attach picks them up.
   *
   * @param {{ workspace: string, attempt_id: string, guard_pending: import('./runner/guard-mirror.js').GuardPendingEntry[], terminated: boolean }} entry
   */
  function settleGuardPending(entry) {
    if (entry.guard_pending.length === 0) {
      return;
    }
    const attempt = attemptOf(entry.workspace, entry.attempt_id);
    if (!entry.terminated && pidStillOurs(attempt)) {
      return;
    }
    for (const held of entry.guard_pending) {
      guardWarn(entry, {
        reason: 'hook_bypass_unresolved',
        command: held.command
      });
    }
    entry.guard_pending = [];
    persistGuardPending(entry);
  }

  /**
   * Re-pair the verdicts a dead process left held against the log it already
   * wrote (§3 re-attach). Reads only the bytes between the earliest held
   * `log_offset` and the handoff boundary the tail starts at, so the two
   * readers never see the same line twice, and pairs nothing else — the usage
   * and drawer replay own that range.
   *
   * @param {{ workspace: string, attempt_id: string, killed: boolean, guard_pending: import('./runner/guard-mirror.js').GuardPendingEntry[] }} entry
   * @param {any} attempt
   * @param {string} file
   * @param {number} boundary
   */
  function backfillGuardPending(entry, attempt, file, boundary) {
    const offsets = entry.guard_pending.map((held) =>
      typeof held.log_offset === 'number' ? held.log_offset : 0
    );
    const from = Math.max(0, Math.min(...offsets));
    if (!(boundary > from)) {
      return;
    }
    /** @type {string} */
    let text;
    try {
      const fd = fs.openSync(file, 'r');
      try {
        const buf = Buffer.allocUnsafe(boundary - from);
        const read = fs.readSync(fd, buf, 0, boundary - from, from);
        text = buf.subarray(0, Math.max(read, 0)).toString('utf8');
      } finally {
        fs.closeSync(fd);
      }
    } catch (err) {
      // A rotated or deleted range leaves the verdicts held; the tail may still
      // settle them, and §4 ends them as `hook_bypass_unresolved` otherwise.
      log(
        'guard-pending backfill read failed for %s: %o',
        entry.attempt_id,
        err
      );
      return;
    }
    for (const line of text.split('\n')) {
      const trimmed = line.trim();
      if (trimmed.length === 0 || entry.guard_pending.length === 0) {
        continue;
      }
      /** @type {any} */
      let obj;
      try {
        obj = JSON.parse(trimmed);
      } catch {
        continue;
      }
      for (const resolution of resolveGuardPending(obj, entry.guard_pending)) {
        clearGuardPending(entry, resolution.entry);
        if (!resolution.executed) {
          continue;
        }
        // Signal only while the process is still ours; a session that already
        // ended is §4's case, settled at stop().
        if (pidStillOurs(attempt)) {
          guardKill(entry, {
            reason: 'hook_bypass_blocked',
            command: resolution.entry.command,
            confirmed_by: 'tool_result'
          });
          return;
        }
      }
    }
  }

  /**
   * Settle the verdicts a session left held when it died while the Worker was
   * down (§3 re-attach, §4). No monitor is started for a dead process, so this
   * is the only place those holds are ever read again: pair them against the
   * whole log the process wrote, and end whatever stays unpaired as
   * `hook_bypass_unresolved`. Nothing is signalled — there is no process.
   *
   * @param {string} workspace
   * @param {any} attempt
   * @param {{ guard_pending?: import('./runner/guard-mirror.js').GuardPendingEntry[] }} options
   */
  function settleDeadPending(workspace, attempt, options) {
    const held = Array.isArray(options.guard_pending)
      ? options.guard_pending
      : Array.isArray(attempt.guard_pending)
        ? attempt.guard_pending
        : [];
    if (held.length === 0) {
      return;
    }
    const entry = {
      workspace,
      attempt_id: attempt.attempt_id,
      killed: false,
      guard_pending: [...held],
      terminated: true
    };
    const file = logFileOf(workspace, attempt);
    /** @type {number} */
    let size = 0;
    try {
      size = fs.statSync(file).size;
    } catch (err) {
      log('guard-pending settle stat failed for %s: %o', entry.attempt_id, err);
    }
    backfillGuardPending(entry, attempt, file, size);
    settleGuardPending(entry);
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
   * @param {{ reason: string, command: string|null, confirmed_by?: 'tool_result' }} detail
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
            at: now(),
            // Present only for a verdict that waited for execution evidence
            // (guard-hook-bypass-result-judgment §3).
            ...(detail.confirmed_by === 'tool_result'
              ? { confirmed_by: /** @type {const} */ ('tool_result') }
              : {})
          },
          cause_detail: {
            reason: detail.reason,
            command: detail.command,
            ...(detail.confirmed_by === 'tool_result'
              ? { confirmed_by: /** @type {const} */ ('tool_result') }
              : {})
          }
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
   * @param {{ workspace: string, attempt_id: string, repo: string|null, target_base: string|null, disposition: boolean, quickfix_lane: boolean, codex: boolean, killed: boolean, spec: import('./runner/session.js').AdapterSpec, guard_mirror: 'verified'|'absent'|null, guard_pending: import('./runner/guard-mirror.js').GuardPendingEntry[], terminated: boolean }} entry
   * @param {string} line
   * @param {number} [end_offset] - Byte offset just past this line, recorded
   * with a held verdict so a later re-attach can backfill from it (§3).
   */
  function handleLine(entry, line, end_offset) {
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
      // The same line, a second time, under the launch it belongs to
      // (UI-2mpn §6.3): a Claude subagent has no stream file of its own, so
      // this republish is the only live feed a subagent drawer can follow.
      const launch_id = delegatedLaunchIdOf(obj);
      if (launch_id) {
        deps.sessionLog.publish(workspace, attempt_id, obj, launch_id);
      }
    } catch (err) {
      log('drawer re-broadcast failed for %s: %o', attempt_id, err);
    }

    if (deps.delegation && typeof entry.spec.liftDelegation === 'function') {
      try {
        if (
          deps.delegation.apply(
            workspace,
            attempt_id,
            entry.spec.liftDelegation(obj)
          )
        ) {
          scheduleUsageFanout(workspace);
        }
      } catch (err) {
        log('delegation lift failed for %s: %o', attempt_id, err);
      }
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
    // The terminal line of the stream: §4's session termination, and the only
    // thing that turns a still-held verdict into a warning rather than a kill.
    if (obj && obj.type === 'result') {
      entry.terminated = true;
    }

    // A held verdict's evidence line (§3), judged before the extraction below
    // because a `tool_result` line carries no command of its own.
    for (const resolution of resolveGuardPending(obj, entry.guard_pending)) {
      clearGuardPending(entry, resolution.entry);
      if (!resolution.executed) {
        // The mirror refused it — nothing ran, so nothing is recorded.
        continue;
      }
      guardKill(entry, {
        reason: 'hook_bypass_blocked',
        command: resolution.entry.command,
        confirmed_by: 'tool_result'
      });
      return;
    }

    if (typeof entry.spec.extractShellCommand === 'function') {
      const extracted = entry.spec.extractShellCommand(obj);
      const violation = extracted
        ? findMergeViolation(extracted.command, {
            disposition: entry.disposition,
            quickfix_lane: entry.quickfix_lane,
            repo: entry.repo,
            target_base: entry.target_base
          })
        : null;
      // guardEffect() is the SAME function the live runner (session.js) judges
      // by, so a restart cannot demote a kill to a warning or the reverse
      // (guard-enforcement-layer-replacement §Phase 2).
      // A deferred arm 3 may travel with warnings from the same string (§1).
      for (const carried of violation?.warnings || []) {
        recordGuardWarning(entry, carried, obj);
      }
      if (violation && guardEffect(violation) === 'warn') {
        recordGuardWarning(entry, violation, obj);
      } else if (
        violation &&
        violation.deferrable === true &&
        entry.guard_mirror === 'verified' &&
        extracted &&
        typeof extracted.id === 'string'
      ) {
        // Held, not killed (§3): this session provably runs under the
        // PreToolUse mirror, which refuses the shape before it can run.
        addGuardPending(entry, {
          tool_use_id: extracted.id,
          command: violation.command,
          at: now(),
          log_offset: typeof end_offset === 'number' ? end_offset : null
        });
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
     * @param {{ start_offset?: number, guard_pending?: import('./runner/guard-mirror.js').GuardPendingEntry[] }} [options]
     * `start_offset` is the byte offset to resume the log at: the line boundary
     * the startup usage replay consumed up to, so the two readers split the
     * file with no gap and no overlap. `guard_pending` is the attempt's held
     * hook-bypass verdicts (§3), re-paired against the range before that
     * boundary once, then carried by the tail.
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
        settleDeadPending(workspace, attempt, options);
        return false;
      }
      /** @type {{ workspace: string, attempt_id: string, repo: string|null, target_base: string|null, disposition: boolean, quickfix_lane: boolean, codex: boolean, killed: boolean, spec: import('./runner/session.js').AdapterSpec, guard_mirror: 'verified'|'absent'|null, guard_pending: import('./runner/guard-mirror.js').GuardPendingEntry[], terminated: boolean, reader: any }} */
      const entry = {
        workspace,
        attempt_id,
        codex: attempt.runner === 'codex',
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
        // Same durable boolean normalization session.js applies to the
        // quick_fix lane before command-guard judgment.
        quickfix_lane: attempt.quickfix_lane === true,
        // The spawn-time probe's durable value (§2). Never re-probed here: the
        // server's own environment is not the child's.
        guard_mirror:
          attempt.guard_mirror === 'verified' ||
          attempt.guard_mirror === 'absent'
            ? attempt.guard_mirror
            : null,
        // The caller's list is the attach path's explicit hand-off; the record
        // is the same fact, and reading it here keeps any other start path from
        // silently dropping a held verdict.
        guard_pending: Array.isArray(options.guard_pending)
          ? [...options.guard_pending]
          : Array.isArray(attempt.guard_pending)
            ? [...attempt.guard_pending]
            : [],
        terminated: false,
        killed: false,
        reader: null
      };
      const log_file = logFileOf(workspace, attempt);
      if (entry.guard_pending.length > 0) {
        // Before the tail, and over the range the tail will NOT read (§3).
        backfillGuardPending(
          entry,
          attempt,
          log_file,
          typeof options.start_offset === 'number' ? options.start_offset : 0
        );
      }
      entry.reader = createTailReader({
        // Opened ONCE, by name, and then read through that fd — which is why
        // §4 may move a settled log with an atomic `rename` and the tail
        // continues on the same inode.
        file: log_file,
        fs,
        poll_ms: deps.poll_ms,
        // Reattach at the handoff boundary: the past belongs to the drawer
        // snapshot and the usage replay, so the monitor owns only what follows
        // it — including the remainder of a line that was half-written at the
        // moment of reattach, which it reads and completes normally.
        start_offset: options.start_offset,
        onLine: (l, end_offset) => handleLine(entry, l, end_offset),
        onError: (err, kind) => {
          log('tail %s error for %s: %o', kind, attempt_id, err);
          if (kind === 'open') {
            monitors.delete(key);
          }
        }
      });
      monitors.set(key, entry);
      entry.reader.start();
      // Independent of the parent stream, and for a NEW launch as much as a
      // re-attach: the children are observed from files Codex writes itself.
      if (entry.codex) {
        try {
          deps.workerSessionObservations?.observe(workspace, attempt);
        } catch (err) {
          log(
            'initial root usage observation failed for %s: %o',
            attempt_id,
            err
          );
        }
      }
      armChildScan(entry);
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
        deps.workerSessionObservations?.drain(workspace, attempt_id);
        const attempt = attemptOf(workspace, attempt_id);
        if (attempt) {
          deps.workerSessionObservations?.observe(workspace, attempt);
        }
      } catch (err) {
        log('final root usage drain failed for %s: %o', attempt_id, err);
      }
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
      // The same drain contract the tail has: the settlement about to run reads
      // the durable record, so the last native-child observation is taken here,
      // with the parent already ending — a child with no terminal evidence is
      // then `interrupted` rather than left `running` forever.
      const child_timer = child_timers.get(key);
      if (child_timer) {
        clearTimeout(child_timer);
        child_timers.delete(key);
      }
      scanChildren(entry, true);
      child_identities.delete(key);
      settleGuardPending(entry);
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
      for (const timer of child_timers.values()) {
        clearTimeout(timer);
      }
      child_timers.clear();
      child_identities.clear();
    }
  };
}
