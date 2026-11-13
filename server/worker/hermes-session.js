/** Read-only Hermes display history; never a resume or usage source. */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

export const HERMES_POLL_MS = 2000;

/**
 * Compression is the only edge that continues this conversation. UNION also
 * bounds a corrupt cycle; delegates and reset conversations are excluded.
 * Fork markers name the immediate parent; inherited markers survive compression.
 */
const LINEAGE_SQL = `WITH RECURSIVE lineage(id) AS (
  SELECT id FROM sessions WHERE id = ? AND source != 'subagent'
  UNION
  SELECT child.id FROM sessions child
  JOIN sessions parent ON child.parent_session_id = parent.id
  JOIN lineage ON parent.id = lineage.id
  WHERE parent.end_reason = 'compression' AND child.source != 'subagent'
    AND COALESCE(child.source, '') != 'tool'
    AND COALESCE(json_extract(CASE WHEN json_valid(child.model_config)
      THEN child.model_config ELSE '{}' END, '$._branched_from'), '') != parent.id
    AND COALESCE(json_extract(CASE WHEN json_valid(child.model_config)
      THEN child.model_config ELSE '{}' END, '$._delegate_from'), '') != parent.id
    AND COALESCE(json_extract(CASE WHEN json_valid(child.model_config)
      THEN child.model_config ELSE '{}' END, '$._reset_from'), '') != parent.id
)`;

/**
 * @param {string} file
 * @param {string} session_id
 * @param {number} [after_id]
 * @returns {{ rows: Record<string, unknown>[], cursor: number, last_event_at: number|null, ended: boolean }|null}
 */
export function readHermesSession(file, session_id, after_id = 0) {
  /** @type {DatabaseSync|undefined} */
  let db;
  try {
    db = new DatabaseSync(file, { readOnly: true });
    // One consistent snapshot across session publication and message reads.
    db.exec('BEGIN');
    const sessions = db
      .prepare(
        `${LINEAGE_SQL} SELECT sessions.id, parent_session_id, ended_at, end_reason
         FROM sessions JOIN lineage USING(id)`
      )
      .all(session_id);
    if (sessions.length === 0) {
      return null;
    }
    const rows = db
      .prepare(
        `${LINEAGE_SQL}
      SELECT messages.* FROM messages JOIN lineage ON session_id = lineage.id
      WHERE messages.id > ? AND (active = 1 OR compacted = 1)
      ORDER BY timestamp, messages.id`
      )
      .all(session_id, after_id);
    const latest = db
      .prepare(
        `${LINEAGE_SQL}
      SELECT MAX(messages.id) AS cursor, MAX(timestamp) AS last_event_at
      FROM messages JOIN lineage ON session_id = lineage.id
      WHERE active = 1 OR compacted = 1`
      )
      .get(session_id);
    const leaves = sessions.filter(
      (session) =>
        !sessions.some((child) => child.parent_session_id === session.id)
    );
    return {
      rows,
      cursor: Number(latest?.cursor || after_id),
      last_event_at:
        typeof latest?.last_event_at === 'number'
          ? latest.last_event_at * 1000
          : null,
      // A compressed parent may be observed before its child is published.
      ended:
        leaves.length > 0 &&
        leaves.every(
          (session) =>
            session.ended_at !== null && session.end_reason !== 'compression'
        )
    };
  } catch {
    // DB/schema/lock failures reveal no conversation content in server logs.
    return null;
  } finally {
    db?.close();
  }
}

/**
 * @param {string} session_id
 * @param {{ home_dir?: string, hermes_home?: string }} [options]
 * @returns {{ file: string, last_event_at: number|null }|null}
 */
export function locateHermesSession(session_id, options = {}) {
  const root =
    options.hermes_home ||
    process.env.HERMES_HOME ||
    path.join(options.home_dir || os.homedir(), '.hermes');
  const files = [path.join(root, 'state.db')];
  try {
    for (const name of fs.readdirSync(path.join(root, 'profiles'))) {
      files.push(path.join(root, 'profiles', name, 'state.db'));
    }
  } catch (err) {
    if (/** @type {NodeJS.ErrnoException} */ (err).code !== 'ENOENT') {
      return null;
    }
  }
  /** @type {Array<{ file: string, last_event_at: number|null }>} */
  const matches = [];
  for (const file of files) {
    if (!fs.existsSync(file)) {
      continue;
    }
    /** @type {DatabaseSync|undefined} */
    let db;
    try {
      db = new DatabaseSync(file, { readOnly: true });
      const found = db
        .prepare(
          "SELECT id FROM sessions WHERE id = ? AND source != 'subagent'"
        )
        .get(session_id);
      if (!found) {
        continue;
      }
      const snapshot = readHermesSession(
        file,
        session_id,
        Number.MAX_SAFE_INTEGER
      );
      if (snapshot === null) {
        return null;
      }
      matches.push({ file, last_event_at: snapshot.last_event_at });
    } catch {
      // An unreadable candidate cannot establish uniqueness.
      return null;
    } finally {
      db?.close();
    }
  }
  return matches.length === 1 ? matches[0] : null;
}
