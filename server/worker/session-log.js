/**
 * Per-attempt session log (spec §5.2, feeds the Phase 11 transcript viewer).
 *
 * The raw runner event stream (untransformed jsonl lines) is appended to a
 * per-attempt file under the XDG state dir so a session's transcript survives
 * worktree churn and a beads-ui restart. This module only PERSISTS + reads the
 * stream; rendering is Phase 11.
 */
import nodeFs from 'node:fs';
import path from 'node:path';
import { sessionLogPath } from './state-paths.js';

/**
 * Create a session-log writer/reader.
 *
 * @param {{ fs?: typeof import('node:fs'), pathFor?: (workspace: string, attempt_id: string) => string }} [options]
 * @returns {{
 *   pathFor: (workspace: string, attempt_id: string) => string,
 *   append: (workspace: string, attempt_id: string, event: unknown) => void,
 *   attach: (workspace: string, attempt_id: string, events: import('node:events').EventEmitter) => void,
 *   read: (workspace: string, attempt_id: string) => unknown[]
 * }}
 */
export function createSessionLog(options = {}) {
  const fs = options.fs || nodeFs;
  const pathFor = options.pathFor || sessionLogPath;

  return {
    pathFor,

    /**
     * Append one raw event as a jsonl line (creates the dir on first write).
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {unknown} event
     */
    append(workspace, attempt_id, event) {
      const file = pathFor(workspace, attempt_id);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.appendFileSync(file, `${JSON.stringify(event)}\n`);
    },

    /**
     * Subscribe to a runner handle's raw stream, persisting each event.
     *
     * @param {string} workspace
     * @param {string} attempt_id
     * @param {import('node:events').EventEmitter} events
     */
    attach(workspace, attempt_id, events) {
      events.on('raw', (obj) => {
        try {
          this.append(workspace, attempt_id, obj);
        } catch {
          // A log-append failure must never crash the session.
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
    }
  };
}
