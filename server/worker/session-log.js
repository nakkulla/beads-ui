/**
 * Per-attempt session log (spec §5.2, feeds the Phase 11 transcript viewer).
 *
 * The raw runner event stream (untransformed jsonl lines) lives in a
 * per-attempt file under the XDG state dir so a session's transcript survives
 * worktree churn and a beads-ui restart.
 *
 * WRITER RETIREMENT (UI-o2yt §3.2): the runner itself now writes that file
 * through an fd it inherited at spawn, so this module no longer persists
 * anything — a server-side write would only duplicate what the kernel already
 * appended. What remains is the READ side (snapshot) plus the in-process append
 * BROKER: the engine's tail reader (and, after a restart, the detached session
 * monitor) re-broadcast each parsed line here, which is what keeps the ws
 * drawer's live follow working unchanged.
 */
import { EventEmitter } from 'node:events';
import nodeFs from 'node:fs';
import { readAttemptDelegationStreams } from './delegation-monitor.js';
import { emitQueueChanged } from './queue-events.js';
import { sessionLogPath } from './state-paths.js';

/**
 * Coalescing window for the `last_event_at` queue fanout (UI-53es §1). A log
 * line is not a queue transition, so it rides the same throttle shape the usage
 * ticks use: the first event in a window arms the timer and the rest of the
 * burst rides it.
 */
export const LAST_EVENT_FANOUT_MS = 3_000;

/**
 * A live-append notification, emitted for every appended raw event so the ws
 * transcript subscription (Phase 11) can push new lines to a live attempt's
 * drawer without re-reading the whole file.
 *
 * @typedef {{ workspace: string, attempt_id: string, event: unknown, launch_id?: string }} SessionLogAppend
 */

/**
 * The stderr sidecar of a session log: same directory, same attempt, `.stderr.log`
 * instead of `.jsonl` (UI-o2yt §3.1). Spawn/CLI faults land there instead of
 * polluting the jsonl — and instead of filling an unread pipe.
 *
 * @param {string} log_path
 * @returns {string}
 */
export function stderrPathOf(log_path) {
  return `${String(log_path).replace(/\.jsonl$/, '')}.stderr.log`;
}

/**
 * Create a session-log reader with an in-process append pub/sub.
 *
 * One shared instance lives on the Worker runtime, so the line readers'
 * `publish` and the ws subscription's `subscribe` flow through the same broker.
 *
 * @param {{ fs?: typeof import('node:fs'), pathFor?: (workspace: string, attempt_id: string) => string, now?: () => number, emitChanged?: (workspace: string) => void, fanoutMs?: number }} [options]
 * @returns {{
 *   pathFor: (workspace: string, attempt_id: string) => string,
 *   stderrPathFor: (workspace: string, attempt_id: string) => string,
 *   publish: (workspace: string, attempt_id: string, event: unknown, launch_id?: string) => void,
 *   attach: (workspace: string, attempt_id: string, events: import('node:events').EventEmitter) => void,
 *   read: (workspace: string, attempt_id: string, options?: { end_offset?: number }) => unknown[],
 *   readDelegation: (workspace: string, attempt_id: string, launch_id: string) => { lines: unknown[], last_event_at: number|null },
 *   lastEventAtOf: (workspace: string, attempt_id: string) => number|null,
 *   lineBoundaryOf: (workspace: string, attempt_id: string) => number|null,
 *   lastEventAt: (workspace: string, attempt_id: string, launch_id?: string) => number|null,
 *   subscribe: (fn: (a: SessionLogAppend) => void, launch_id?: string) => (() => void)
 * }}
 */
export function createSessionLog(options = {}) {
  const fs = options.fs || nodeFs;
  const pathFor = options.pathFor || sessionLogPath;
  const now = options.now || Date.now;
  const emitChanged = options.emitChanged || emitQueueChanged;
  const fanout_ms =
    typeof options.fanoutMs === 'number'
      ? options.fanoutMs
      : LAST_EVENT_FANOUT_MS;
  const emitter = new EventEmitter();
  // A live attempt may have many drawer subscribers; avoid the warning.
  emitter.setMaxListeners(0);

  /**
   * Last observed session-log event time per attempt (UI-53es §1). Live-only,
   * like the usage tally: a restart loses it and the monitor row simply omits
   * the heartbeat dot until the next line arrives.
   *
   * @type {Map<string, number>}
   */
  const last_event_at = new Map();
  /** @type {Map<string, ReturnType<typeof setTimeout>>} */
  const fanout_timers = new Map();

  /**
   * Arm the coalesced queue fanout for a workspace. The value is already
   * recorded; this is only what tells the clients to come look at it.
   *
   * @param {string} workspace
   */
  function scheduleFanout(workspace) {
    if (fanout_timers.has(workspace)) {
      return;
    }
    const timer = setTimeout(() => {
      fanout_timers.delete(workspace);
      try {
        emitChanged(workspace);
      } catch {
        // A broken fanout must never break the session.
      }
    }, fanout_ms);
    if (typeof timer.unref === 'function') {
      timer.unref();
    }
    fanout_timers.set(workspace, timer);
  }

  /**
   * @param {string} workspace
   * @param {string} attempt_id
   * @param {string} [launch_id]
   * @returns {string}
   */
  function keyOf(workspace, attempt_id, launch_id) {
    return `${workspace}\u0000${attempt_id}\u0000${launch_id || ''}`;
  }

  return {
    pathFor,

    /**
     * @param {string} workspace
     * @param {string} attempt_id
     */
    stderrPathFor(workspace, attempt_id) {
      return stderrPathOf(pathFor(workspace, attempt_id));
    },

    /**
     * Broadcast one raw event to the live subscribers. The event is ALREADY on
     * disk (the runner wrote it); this is the in-process notification only.
     *
     * Every publish — live tail AND post-restart re-attach — also stamps
     * `last_event_at` and arms the coalesced queue fanout (UI-53es §1). Without
     * the fanout the stamp would never reach a client: the queue snapshot only
     * goes out on a queue change or a usage tick, and a log line that carries no
     * usage is neither.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {unknown} event
     * @param {string} [launch_id]
     */
    publish(workspace, attempt_id, event, launch_id) {
      const delegation_id =
        typeof launch_id === 'string' && launch_id.length > 0
          ? launch_id
          : undefined;
      last_event_at.set(keyOf(workspace, attempt_id, delegation_id), now());
      scheduleFanout(workspace);
      emitter.emit('append', {
        workspace,
        attempt_id,
        event,
        ...(delegation_id ? { launch_id: delegation_id } : {})
      });
    },

    /**
     * Re-broadcast a runner handle's raw stream to the live subscribers.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {import('node:events').EventEmitter} events
     */
    attach(workspace, attempt_id, events) {
      events.on('raw', (obj) => {
        try {
          this.publish(workspace, attempt_id, obj);
        } catch {
          // A broken subscriber must never crash the session.
        }
      });
    },

    /**
     * When the attempt's log file was last written, in epoch ms (UI-rkly §2).
     *
     * The raw event payloads carry no timestamp of their own, so a snapshot
     * has no other way to say how long ago the session last moved. The file's
     * mtime is that answer for everything already on disk; the live appends
     * after it are stamped client-side on receipt.
     *
     * Null when the file cannot be stat'd at all (absent yet, or unreadable) —
     * same fail-quiet contract as `read`.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {number|null}
     */
    lastEventAtOf(workspace, attempt_id) {
      try {
        return fs.statSync(pathFor(workspace, attempt_id)).mtimeMs;
      } catch {
        return null;
      }
    },

    /**
     * The byte offset just past the LAST newline in an attempt's log — the
     * line boundary a reader can hand off at (UI-o2yt §3.3).
     *
     * Startup recovery splits one log between two consumers: the usage replay
     * owns `[0, boundary)` and the reattached monitor owns `[boundary, ∞)`.
     * Deriving both from ONE observation is what makes the split exact — a
     * boundary each side computed for itself would leave the lines appended
     * in between either counted twice or, worse, by nobody.
     *
     * Null when the file cannot be read at all (absent yet, or unreadable):
     * there is no boundary to hand off, so the caller starts from zero.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {number|null}
     */
    lineBoundaryOf(workspace, attempt_id) {
      try {
        const raw = fs.readFileSync(pathFor(workspace, attempt_id));
        return raw.lastIndexOf(0x0a) + 1;
      } catch {
        return null;
      }
    },

    /**
     * When this attempt last produced a session-log event, or null when none
     * has been observed in this process (UI-53es §1). The monitor row's live
     * heartbeat reads it; absence renders no dot rather than a stale one.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {number|null}
     */
    lastEventAt(workspace, attempt_id, launch_id) {
      const at = last_event_at.get(keyOf(workspace, attempt_id, launch_id));
      return typeof at === 'number' ? at : null;
    },

    /**
     * Read the persisted stream back as parsed objects (empty when absent).
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {{ end_offset?: number }} [options] - Stop at this byte offset
     * (the handoff boundary above); the rest belongs to another reader.
     * @returns {unknown[]}
     */
    read(workspace, attempt_id, options = {}) {
      const file = pathFor(workspace, attempt_id);
      let raw = '';
      try {
        const bytes = fs.readFileSync(file);
        raw =
          typeof options.end_offset === 'number'
            ? bytes.subarray(0, options.end_offset).toString('utf8')
            : bytes.toString('utf8');
      } catch {
        return [];
      }
      /** @type {unknown[]} */
      const out = [];
      for (const line of raw.split(/\r?\n/)) {
        const t = line.trim();
        if (t.length === 0) {
          continue;
        }
        try {
          out.push(JSON.parse(t));
        } catch {
          /* skip malformed */
        }
      }
      return out;
    },

    /**
     * Read one authorized delegation stream through the validated monitor
     * reader. Callers must authorize the launch before invoking this method.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {string} launch_id
     * @returns {{ lines: unknown[], last_event_at: number|null }}
     */
    readDelegation(workspace, attempt_id, launch_id) {
      const scanned = readAttemptDelegationStreams(workspace, attempt_id);
      const stream = scanned.streams.find(
        (candidate) => candidate.launch_id === launch_id
      );
      const session = scanned.sessions.find(
        (candidate) => candidate.launch_id === launch_id
      );
      if (!stream || !session) {
        return { lines: [], last_event_at: null };
      }
      return { lines: stream.events, last_event_at: session.last_event_at };
    },

    /**
     * Subscribe to live append notifications (every attempt, every workspace —
     * callers filter by `attempt_id`). Returns an unsubscribe function.
     *
     * @param {(a: SessionLogAppend) => void} fn
     * @param {string} [launch_id]
     * @returns {() => void}
     */
    subscribe(fn, launch_id) {
      const delegation_id =
        typeof launch_id === 'string' && launch_id.length > 0
          ? launch_id
          : null;
      /** @param {SessionLogAppend} append */
      const listener = (append) => {
        const append_id = append.launch_id || null;
        if (append_id === delegation_id) {
          fn(append);
        }
      };
      emitter.on('append', listener);
      return () => emitter.off('append', listener);
    }
  };
}
