/**
 * XDG-based state path derivation for the Worker queue.
 *
 * The queue lives OUTSIDE the repo checkout on a stable path so it survives
 * `git clean`, branch switches, and worktree churn (spec §5.1). One queue file
 * per workspace, keyed by a stable directory name derived from the workspace
 * absolute path.
 *
 * Directory-naming choice: `<sanitized-basename>-<sha256(abs)[:12]>`. The
 * sanitized basename keeps the path human-recognizable when browsing
 * `$XDG_STATE_HOME/bdui/`; the 12-hex SHA-256 suffix of the ABSOLUTE path
 * guarantees stability and collision-resistance across two different workspaces
 * that happen to share a basename.
 */
import crypto from 'node:crypto';
import os from 'node:os';
import path from 'node:path';

/**
 * Resolve the XDG state home directory. Uses `$XDG_STATE_HOME` when set to a
 * non-empty value; otherwise falls back to `~/.local/state` per the XDG Base
 * Directory Specification.
 *
 * @returns {string} Absolute path to the state home root.
 */
export function stateHome() {
  const xdg = process.env.XDG_STATE_HOME;
  if (typeof xdg === 'string' && xdg.trim().length > 0) {
    return xdg;
  }
  return path.join(os.homedir(), '.local', 'state');
}

/**
 * Derive a stable, filesystem-safe directory name for a workspace.
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @returns {string} A stable slug of the form `<basename>-<hash12>`.
 */
export function workspaceSlug(workspace_root) {
  const abs = path.resolve(String(workspace_root || ''));
  const raw_base = path.basename(abs) || 'ws';
  const base = raw_base.replace(/[^A-Za-z0-9._-]/g, '_').slice(0, 40) || 'ws';
  const hash = crypto
    .createHash('sha256')
    .update(abs)
    .digest('hex')
    .slice(0, 12);
  return `${base}-${hash}`;
}

/**
 * Absolute directory that holds a workspace's Worker state.
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>`.
 */
export function workspaceStateDir(workspace_root) {
  return path.join(stateHome(), 'bdui', workspaceSlug(workspace_root));
}

/**
 * Absolute path to a workspace's queue persistence file.
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/queue.json`.
 */
export function queueFilePath(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'queue.json');
}

/**
 * Absolute path to a workspace's manual UI-order persistence file. Lives in the
 * SAME state dir as the queue file so both survive `git clean`, branch switches,
 * and worktree churn (spec §2 / §5.1).
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/ui-order.json`.
 */
export function uiOrderFilePath(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'ui-order.json');
}

/**
 * Absolute path to the SERVER-GLOBAL visible-workspaces state file. Unlike the
 * per-workspace queue/ui-order files this is a single file for the whole server
 * (spec §6): the hidden-workspace set is global, not scoped to one workspace, so
 * it lives directly under the `bdui` state root rather than in a `<slug>/` dir.
 *
 * @returns {string} `$XDG_STATE_HOME/bdui/visible-workspaces.json`.
 */
export function visibleWorkspacesFilePath() {
  return path.join(stateHome(), 'bdui', 'visible-workspaces.json');
}

/**
 * Absolute path to a per-attempt session-log jsonl file (spec §5.2 / §5.6).
 * The raw runner event stream is persisted here for the transcript viewer.
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @param {string} attempt_id - Stable attempt id.
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/sessions/<attempt_id>.jsonl`.
 */
export function sessionLogPath(workspace_root, attempt_id) {
  const safe = String(attempt_id || 'attempt').replace(/[^A-Za-z0-9._-]/g, '_');
  return path.join(
    workspaceStateDir(workspace_root),
    'sessions',
    `${safe}.jsonl`
  );
}
