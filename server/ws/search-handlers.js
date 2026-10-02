/**
 * Issue search channel (UI-f2sy §6.3).
 *
 * One request/response pair, `search-issues` → `{ results, partial }`. The scan
 * reads only each repository's LAST workspace snapshot — peeked, never
 * requested — so a keystroke can neither start a `bd` process nor drive a
 * repository's refresh cadence. A repository with no snapshot yet contributes
 * nothing and turns `partial` on: an empty `results` then means "nothing among
 * what has been read", not "nothing".
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import path from 'node:path';
import { makeError, makeOk } from '../../app/protocol.js';
import { visibleWorkspaceRoots } from '../worker/foreign-blocker-status.js';
import { peekWorkspaceSnapshot } from '../workspace-snapshot-runtime.js';
import { getConnWorkspace } from './context.js';

/** Most rows one search answers with. */
export const SEARCH_RESULT_LIMIT = 20;

/**
 * @typedef {Object} SearchResultRow
 * @property {string} id
 * @property {string} status
 * @property {string} title
 * @property {string} root_dir
 * @property {string} workspace_name
 */

/**
 * Collect the matching issues of the given repositories, in display order.
 *
 * Match is a case-insensitive substring of the id or the title, whatever the
 * status (closed issues included — the snapshot is `bd list --all`). Order: the
 * exact id, then ids that start with the query, then the rest; each group runs
 * newest `updated_at` first, ties by id so the order is stable.
 *
 * @param {string} query
 * @param {string[]} roots
 * @param {(root_dir: string) => import('../workspace-snapshot-coordinator.js').WorkspaceSnapshot|null} peek
 * @returns {{ results: SearchResultRow[], partial: boolean }}
 */
export function searchSnapshots(query, roots, peek) {
  const needle = query.trim().toLowerCase();
  let partial = false;
  /** @type {Array<{ rank: number, updated_at: number, row: SearchResultRow }>} */
  const hits = [];
  if (needle.length === 0) {
    return { results: [], partial };
  }
  for (const root_dir of roots) {
    const snapshot = peek(root_dir);
    if (!snapshot) {
      partial = true;
      continue;
    }
    const workspace_name = path.basename(root_dir);
    for (const issue of snapshot.all) {
      const id = issue.id.toLowerCase();
      const title =
        typeof issue.title === 'string' ? issue.title.toLowerCase() : '';
      if (!id.includes(needle) && !title.includes(needle)) {
        continue;
      }
      hits.push({
        rank: id === needle ? 0 : id.startsWith(needle) ? 1 : 2,
        updated_at: issue.updated_at,
        row: {
          id: issue.id,
          status: typeof issue.status === 'string' ? issue.status : '',
          title: typeof issue.title === 'string' ? issue.title : '',
          root_dir,
          workspace_name
        }
      });
    }
  }
  hits.sort(
    (a, b) =>
      a.rank - b.rank ||
      b.updated_at - a.updated_at ||
      (a.row.id < b.row.id ? -1 : a.row.id > b.row.id ? 1 : 0)
  );
  return {
    results: hits.slice(0, SEARCH_RESULT_LIMIT).map((hit) => hit.row),
    partial
  };
}

/**
 * Handle `search-issues`. Payload: `{ query: string, scope: 'workspace'|'visible' }`.
 * `workspace` is this connection's repository, `visible` every repository the
 * monitor shows.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {{ peek?: typeof peekWorkspaceSnapshot, visibleRoots?: () => string[] }} [seams]
 */
export function handleSearchIssues(ws, req, seams = {}) {
  const payload = /** @type {any} */ (req.payload || {});
  if (
    typeof payload.query !== 'string' ||
    (payload.scope !== 'workspace' && payload.scope !== 'visible')
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          "payload requires { query: string, scope: 'workspace'|'visible' }"
        )
      )
    );
    return;
  }
  const peek = seams.peek || peekWorkspaceSnapshot;
  const visibleRoots = seams.visibleRoots || (() => visibleWorkspaceRoots());
  const roots =
    payload.scope === 'workspace'
      ? [getConnWorkspace(ws)?.root_dir || '']
      : visibleRoots();
  ws.send(
    JSON.stringify(makeOk(req, searchSnapshots(payload.query, roots, peek)))
  );
}
