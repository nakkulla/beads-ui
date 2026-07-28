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
import { sessionLogPath } from './state-paths.js';

/**
 * A live-append notification, emitted for every appended raw event so the ws
 * transcript subscription (Phase 11) can push new lines to a live attempt's
 * drawer without re-reading the whole file.
 *
 * @typedef {{ workspace: string, attempt_id: string, event: unknown }} SessionLogAppend
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
 * @param {{ fs?: typeof import('node:fs'), pathFor?: (workspace: string, attempt_id: string) => string }} [options]
 * @returns {{
 *   pathFor: (workspace: string, attempt_id: string) => string,
 *   stderrPathFor: (workspace: string, attempt_id: string) => string,
 *   publish: (workspace: string, attempt_id: string, event: unknown) => void,
 *   attach: (workspace: string, attempt_id: string, events: import('node:events').EventEmitter) => void,
 *   read: (workspace: string, attempt_id: string) => unknown[],
 *   subscribe: (fn: (a: SessionLogAppend) => void) => (() => void)
 * }}
 */
export function createSessionLog(options = {}) {
  const fs = options.fs || nodeFs;
  const pathFor = options.pathFor || sessionLogPath;
  const emitter = new EventEmitter();
  // A live attempt may have many drawer subscribers; avoid the warning.
  emitter.setMaxListeners(0);

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
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {unknown} event
     */
    publish(workspace, attempt_id, event) {
      emitter.emit('append', { workspace, attempt_id, event });
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
     * Read the persisted stream back as parsed objects (empty when absent).
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @returns {unknown[]}
     */
    read(workspace, attempt_id) {
      const file = pathFor(workspace, attempt_id);
      let raw = '';
      try {
        raw = fs.readFileSync(file, 'utf8');
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
     * Subscribe to live append notifications (every attempt, every workspace —
     * callers filter by `attempt_id`). Returns an unsubscribe function.
     *
     * @param {(a: SessionLogAppend) => void} fn
     * @returns {() => void}
     */
    subscribe(fn) {
      emitter.on('append', fn);
      return () => emitter.off('append', fn);
    }
  };
}
