/**
 * Which workspace a worker mutation actually targets (UI-qrfo §5).
 *
 * Every worker mutation used to be bound to the connection's current workspace,
 * which is why the monitor tab could only ever watch: a cross-repo dashboard has
 * one connection and twenty repos. An OPTIONAL `payload.root_dir` names the repo
 * instead, so no new action names are introduced and a client that sends nothing
 * keeps the previous behaviour exactly.
 *
 * The validation contract is `workspace-handlers.js`'s
 * {@link import('./workspace-handlers.js').handleSetWorkspace} verbatim — same
 * shape checks, same allow-list source — because both answer the same question:
 * may this request point the server at that directory?
 *
 * @import { WebSocket } from 'ws'
 */
import path from 'node:path';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { getConnWorkspace } from './context.js';

/**
 * Resolve the workspace key a mutation should run against.
 *
 * A RELATIVE `root_dir` is rejected rather than resolved against the server's
 * cwd: it is a client bug either way, and the fallback would silently apply the
 * mutation to whatever repo the server happens to be running in.
 *
 * @param {WebSocket} ws - The requesting connection.
 * @param {unknown} payload - The request payload; `root_dir` is optional.
 * @param {{ listWorkspaces?: () => Array<{ path: string }> }} [options] - Test
 * seam for the allow-list source; defaults to the live registry.
 * @returns {string|null} The absolute workspace key, or `null` when the request
 * named a directory it may not touch (the caller answers `bad_request`).
 */
export function targetWorkspaceOf(ws, payload, options = {}) {
  const raw = /** @type {any} */ (payload || {}).root_dir;
  // Absent means "this connection's workspace" — the Worker tab's payload, and
  // the reason this field could be added without a protocol break. `null` is
  // read as absent too: a JSON client that serializes an unset field that way
  // means the same thing.
  if (raw === undefined || raw === null) {
    return getConnWorkspace(ws)?.root_dir || '';
  }
  if (typeof raw !== 'string' || raw.length === 0 || !path.isAbsolute(raw)) {
    return null;
  }
  // Resolved BEFORE the comparison so a `..` segment cannot smuggle a path past
  // an allow list built from resolved entries.
  const resolved = path.resolve(raw);
  const listWorkspaces = options.listWorkspaces || getAvailableWorkspaces;
  /** @type {Set<string>} */
  let allowed;
  try {
    allowed = new Set(
      listWorkspaces().map((workspace) => path.resolve(workspace.path))
    );
  } catch {
    // An unreadable registry cannot vouch for anything, and fail-closed is the
    // only safe direction for a path check.
    return null;
  }
  return allowed.has(resolved) ? resolved : null;
}
