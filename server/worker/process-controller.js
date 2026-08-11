/**
 * Fail-closed control for detached worker process groups.
 *
 * A persisted PID is never enough to authorize a signal: every action binds
 * the leader PID, process-group id, and process start time, then re-observes
 * all three immediately before signaling the negative PGID.
 */
import { execFileSync } from 'node:child_process';

const DEFAULT_START_TOLERANCE_MS = 2_000;
const DEFAULT_TERM_GRACE_MS = 5_000;
const DEFAULT_KILL_GRACE_MS = 1_000;

/**
 * @typedef {Object} ProcessIdentity
 * @property {number} pid
 * @property {number} pgid
 * @property {number} started_at
 */

/**
 * @param {number} pid
 * @returns {{ ok: boolean, alive?: boolean, pgid?: number|null, started_at?: number|null, reason?: string }}
 */
function inspectProcess(pid) {
  let alive = false;
  try {
    process.kill(pid, 0);
    alive = true;
  } catch (err) {
    const code = err && /** @type {any} */ (err).code;
    if (code === 'EPERM') {
      alive = true;
    } else if (code === 'ESRCH') {
      return { ok: true, alive: false, pgid: null, started_at: null };
    } else {
      return { ok: false, reason: 'pid_probe_failed' };
    }
  }
  if (!alive) {
    return { ok: true, alive: false, pgid: null, started_at: null };
  }
  try {
    const output = execFileSync(
      'ps',
      ['-o', 'pgid=', '-o', 'lstart=', '-p', String(pid)],
      { encoding: 'utf8' }
    ).trim();
    const match = /^(\d+)\s+(.+)$/.exec(output);
    if (!match) {
      return { ok: false, reason: 'ps_parse_failed' };
    }
    const pgid = Number(match[1]);
    const started_at = Date.parse(match[2]);
    if (!Number.isInteger(pgid) || !Number.isFinite(started_at)) {
      return { ok: false, reason: 'ps_parse_failed' };
    }
    return { ok: true, alive: true, pgid, started_at };
  } catch {
    return { ok: false, reason: 'ps_failed' };
  }
}

/**
 * @param {number} pgid
 * @returns {boolean|null}
 */
function processGroupAlive(pgid) {
  try {
    process.kill(-pgid, 0);
    return true;
  } catch (err) {
    const code = err && /** @type {any} */ (err).code;
    if (code === 'EPERM') {
      return true;
    }
    if (code === 'ESRCH') {
      return false;
    }
    return null;
  }
}

/**
 * @param {number} delay_ms
 */
function wait(delay_ms) {
  return new Promise((resolve) => setTimeout(resolve, delay_ms));
}

/**
 * Observe the exact OS start time for a live process without requiring it to
 * lead a process group.
 *
 * @param {number} pid
 * @param {{ inspect?: typeof inspectProcess }} [deps]
 * @returns {{ ok: true, identity: { pid: number, process_started_at: number } }|{ ok: false, reason: string }}
 */
export function observeProcessIdentity(pid, deps = {}) {
  if (!Number.isInteger(pid) || pid <= 0) {
    return { ok: false, reason: 'pid_invalid' };
  }
  const observed = (deps.inspect || inspectProcess)(pid);
  if (!observed.ok) {
    return { ok: false, reason: observed.reason || 'inspect_failed' };
  }
  if (!observed.alive) {
    return { ok: false, reason: 'process_gone' };
  }
  if (
    typeof observed.started_at !== 'number' ||
    !Number.isFinite(observed.started_at)
  ) {
    return { ok: false, reason: 'start_time_unknown' };
  }
  return {
    ok: true,
    identity: { pid, process_started_at: observed.started_at }
  };
}

/**
 * @param {{ inspect?: typeof inspectProcess, groupAlive?: typeof processGroupAlive, signal?: (target: number, signal: NodeJS.Signals|number) => void, wait?: (delay_ms: number) => Promise<void>, start_tolerance_ms?: number, term_grace_ms?: number, kill_grace_ms?: number }} [deps]
 */
export function createProcessController(deps = {}) {
  const inspect = deps.inspect || inspectProcess;
  const groupAlive = deps.groupAlive || processGroupAlive;
  const signal_impl =
    deps.signal ||
    ((target, signal) => {
      process.kill(target, signal);
    });
  const wait_impl = deps.wait || wait;
  const start_tolerance_ms =
    deps.start_tolerance_ms ?? DEFAULT_START_TOLERANCE_MS;
  const term_grace_ms = deps.term_grace_ms ?? DEFAULT_TERM_GRACE_MS;
  const kill_grace_ms = deps.kill_grace_ms ?? DEFAULT_KILL_GRACE_MS;

  /**
   * @param {number} pid
   * @returns {{ ok: true, identity: ProcessIdentity }|{ ok: false, reason: string }}
   */
  function capture(pid) {
    if (!Number.isInteger(pid) || pid <= 0) {
      return { ok: false, reason: 'pid_invalid' };
    }
    const observed = inspect(pid);
    if (!observed.ok) {
      return { ok: false, reason: observed.reason || 'inspect_failed' };
    }
    if (!observed.alive) {
      return { ok: false, reason: 'process_gone' };
    }
    if (observed.pgid !== pid) {
      return { ok: false, reason: 'not_group_leader' };
    }
    if (
      typeof observed.started_at !== 'number' ||
      !Number.isFinite(observed.started_at)
    ) {
      return { ok: false, reason: 'start_time_unknown' };
    }
    return {
      ok: true,
      identity: {
        pid,
        pgid: pid,
        started_at: observed.started_at
      }
    };
  }

  /**
   * @param {ProcessIdentity} identity
   * @returns {{ state: 'owned'|'gone'|'recycled'|'unknown', reason?: string }}
   */
  function probe(identity) {
    if (
      !identity ||
      !Number.isInteger(identity.pid) ||
      !Number.isInteger(identity.pgid) ||
      !Number.isFinite(identity.started_at) ||
      identity.pid <= 0 ||
      identity.pgid <= 0
    ) {
      return { state: 'unknown', reason: 'identity_invalid' };
    }
    const observed = inspect(identity.pid);
    if (!observed.ok) {
      return { state: 'unknown', reason: observed.reason || 'inspect_failed' };
    }
    if (!observed.alive) {
      const group_alive = groupAlive(identity.pgid);
      if (group_alive === false) {
        return { state: 'gone' };
      }
      return {
        state: 'unknown',
        reason:
          group_alive === true
            ? 'leader_gone_group_alive'
            : 'group_probe_failed'
      };
    }
    if (
      observed.pgid !== identity.pgid ||
      typeof observed.started_at !== 'number' ||
      !Number.isFinite(observed.started_at) ||
      Math.abs(observed.started_at - identity.started_at) > start_tolerance_ms
    ) {
      return { state: 'recycled' };
    }
    const group_alive = groupAlive(identity.pgid);
    if (group_alive === true) {
      return { state: 'owned' };
    }
    return {
      state: 'unknown',
      reason:
        group_alive === false
          ? 'leader_alive_group_absent'
          : 'group_probe_failed'
    };
  }

  /**
   * @param {ProcessIdentity} identity
   * @param {NodeJS.Signals|number} signal
   * @returns {{ ok: boolean, state: 'owned'|'gone'|'recycled'|'unknown', reason?: string }}
   */
  function signal(identity, signal) {
    const observed = probe(identity);
    if (observed.state !== 'owned') {
      return { ok: false, ...observed };
    }
    try {
      signal_impl(-identity.pgid, signal);
      return { ok: true, state: 'owned' };
    } catch (err) {
      const code = err && /** @type {any} */ (err).code;
      if (code === 'ESRCH') {
        const after = probe(identity);
        return { ok: after.state === 'gone', ...after };
      }
      return { ok: false, state: 'unknown', reason: 'signal_failed' };
    }
  }

  /**
   * @param {ProcessIdentity} identity
   * @returns {Promise<{ ok: boolean, state: 'owned'|'gone'|'recycled'|'unknown', forced?: boolean, reason?: string }>}
   */
  async function terminate(identity) {
    const terminated = signal(identity, 'SIGTERM');
    if (!terminated.ok) {
      if (terminated.state === 'gone') {
        return { ok: true, state: 'gone', forced: false };
      }
      return terminated;
    }
    await wait_impl(term_grace_ms);
    const after_term = probe(identity);
    if (after_term.state === 'gone') {
      return { ok: true, state: 'gone', forced: false };
    }
    if (after_term.state !== 'owned') {
      return { ok: false, ...after_term };
    }
    const killed = signal(identity, 'SIGKILL');
    if (!killed.ok) {
      if (killed.state === 'gone') {
        return { ok: true, state: 'gone', forced: false };
      }
      return killed;
    }
    await wait_impl(kill_grace_ms);
    const after_kill = probe(identity);
    if (after_kill.state === 'gone') {
      return { ok: true, state: 'gone', forced: true };
    }
    return { ok: false, ...after_kill };
  }

  return { capture, probe, signal, terminate };
}
