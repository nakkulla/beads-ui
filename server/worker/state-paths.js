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
 * @param {string} workspace_root
 * @returns {string} Absolute directory containing durable discard archives.
 */
export function discardBackupRootDir(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'discard-backups');
}

/**
 * @param {string} workspace_root
 * @param {string} operation_id
 * @returns {string} Absolute directory for one discard operation archive.
 */
export function discardBackupDir(workspace_root, operation_id) {
  const safe = String(operation_id || 'discard').replace(
    /[^A-Za-z0-9._-]/g,
    '_'
  );
  return path.join(discardBackupRootDir(workspace_root), safe);
}

/**
 * @param {string} workspace_root
 * @param {string} operation_id
 * @returns {string} Absolute parent directory for a rollback worktree.
 */
export function discardRevertWorktreeDir(workspace_root, operation_id) {
  const safe = String(operation_id || 'discard').replace(
    /[^A-Za-z0-9._-]/g,
    '_'
  );
  return path.join(workspaceStateDir(workspace_root), 'revert-worktrees', safe);
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
 * Absolute path to a workspace's label/metadata display-policy file. Shares the
 * per-workspace state dir with the queue/ui-order files so the display policy
 * survives `git clean`, branch switches, and worktree churn.
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/display-policy.json`.
 */
export function displayPolicyFilePath(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'display-policy.json');
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
 * Absolute path to the SERVER-GLOBAL worker execution preset file. Presets are
 * shared across workspaces, so this lives directly under the `bdui` state root.
 *
 * @returns {string} `$XDG_STATE_HOME/bdui/exec-presets.json`.
 */
export function execPresetsFilePath() {
  return path.join(stateHome(), 'bdui', 'exec-presets.json');
}

/**
 * Absolute directory that holds a workspace's full verify-run output logs
 * (UI-0x54). Shares the per-workspace state dir with the queue file so a verify
 * failure's evidence outlives the detached worktree the run happened in — that
 * worktree is torn down the moment the run ends, and `queue.json` only keeps a
 * capped tail.
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/verify-logs`.
 */
export function verifyLogDir(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'verify-logs');
}

/**
 * Absolute directory that holds a workspace's full DEPLOY-run output logs
 * (UI-l53x §1). Separate from {@link verifyLogDir} on purpose: the two runs share
 * the per-file cap and the keep count, but rotation is per directory, and a
 * shared budget would let subsequent verify runs — one per PR head — evict the
 * deploy log a human is still diagnosing (a deploy happens once per merge).
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/deploy-logs`.
 */
export function deployLogDir(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'deploy-logs');
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

/**
 * Absolute directory holding a per-attempt `core.hooksPath` tree — the
 * prevention layer's pre-push hook (UI-8mvc §2). Per ATTEMPT rather than per
 * workspace because `(repo, target_base)` is baked into the script as a
 * literal: two concurrent attempts protect two different bases, and a session
 * that could redirect the judgment through an environment variable would not be
 * judged at all.
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @param {string} attempt_id - Stable attempt id.
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/guard-hooks/<attempt_id>`.
 */
export function guardHookDir(workspace_root, attempt_id) {
  const safe = String(attempt_id || 'attempt').replace(/[^A-Za-z0-9._-]/g, '_');
  return path.join(workspaceStateDir(workspace_root), 'guard-hooks', safe);
}

/**
 * Absolute directory used as the private, deterministic receipt inbox for one
 * attempt. The runner receives this path at launch, but consumers always
 * derive it again from the workspace and attempt id rather than trusting an
 * inherited environment value.
 *
 * @param {string} workspace_root - Workspace root (relative or absolute).
 * @param {string} attempt_id - Stable attempt id.
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/usage-receipts/<attempt_id>`.
 */
export function usageReceiptInboxDir(workspace_root, attempt_id) {
  const safe = String(attempt_id || 'attempt').replace(/[^A-Za-z0-9._-]/g, '_');
  return path.resolve(
    workspaceStateDir(workspace_root),
    'usage-receipts',
    safe
  );
}

/**
 * @param {string} workspace_root
 * @returns {string} Absolute directory containing all attempt receipt inboxes.
 */
export function usageReceiptRootDir(workspace_root) {
  return path.resolve(workspaceStateDir(workspace_root), 'usage-receipts');
}

/**
 * Absolute directory used by the Worker-owned bootstrap handoff. CLI callers
 * may create request files here, but only the running Worker consumes them and
 * writes queue state.
 *
 * @param {string} workspace_root
 * @returns {string}
 */
export function repoOpsSpoolDir(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'repo-ops-spool');
}

/**
 * @param {string} workspace_root
 * @returns {string}
 */
export function repoOpsSpoolPendingDir(workspace_root) {
  return path.join(repoOpsSpoolDir(workspace_root), 'pending');
}

/**
 * @param {string} workspace_root
 * @returns {string}
 */
export function repoOpsSpoolProcessedDir(workspace_root) {
  return path.join(repoOpsSpoolDir(workspace_root), 'processed');
}

/**
 * @param {string} workspace_root
 * @returns {string}
 */
export function repoOperationLogDir(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'repo-operation-logs');
}

/**
 * @param {string} workspace_root
 * @returns {string}
 */
export function repoOperationMarkerDir(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'repo-operation-markers');
}

/**
 * @param {string} workspace_root
 * @param {string} operation_id
 * @param {string} attempt_id
 * @returns {string}
 */
export function repoOperationMarkerPath(
  workspace_root,
  operation_id,
  attempt_id
) {
  const safe_operation = String(operation_id || 'operation').replace(
    /[^A-Za-z0-9._-]/g,
    '_'
  );
  const safe_attempt = String(attempt_id || 'attempt').replace(
    /[^A-Za-z0-9._-]/g,
    '_'
  );
  return path.join(
    repoOperationMarkerDir(workspace_root),
    `${safe_operation}__${safe_attempt}.json`
  );
}

/**
 * Launch handshake the runner child writes BEFORE executing the script, so a
 * crash between spawn and the queue record never orphans a live process.
 *
 * @param {string} workspace_root
 * @param {string} operation_id
 * @param {string} attempt_id
 * @returns {string}
 */
export function repoOperationLaunchMarkerPath(
  workspace_root,
  operation_id,
  attempt_id
) {
  return `${repoOperationMarkerPath(workspace_root, operation_id, attempt_id)}.launch`;
}

/**
 * @param {string} workspace_root
 * @returns {string}
 */
export function repoOpsDeployWorktreeJournalPath(workspace_root) {
  return path.join(
    workspaceStateDir(workspace_root),
    'repo-ops-deploy-worktree.json'
  );
}
