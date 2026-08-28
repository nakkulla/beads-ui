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
 * Absolute path to the SERVER-GLOBAL cross-lane membership file (UI-j92s §4.1).
 * A 연결 레인 spans repositories by definition — no workspace owns it — so it
 * lives directly under the `bdui` state root beside the other server-global
 * files rather than in a `<slug>/` dir.
 *
 * @returns {string} `$XDG_STATE_HOME/bdui/cross-lanes.json`.
 */
export function crossLanesFilePath() {
  return path.join(stateHome(), 'bdui', 'cross-lanes.json');
}

/**
 * Absolute account-isolated Codex HOME for one durable account key.
 *
 * @param {string} key
 * @returns {string} `$XDG_STATE_HOME/bdui/codex-homes/<base64url(key)>`.
 */
export function codexAccountHomeDir(key) {
  const encoded_key = Buffer.from(key, 'utf8').toString('base64url');
  return path.join(stateHome(), 'bdui', 'codex-homes', encoded_key);
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
 * Absolute private directory containing one attempt's delegation monitor
 * streams. Consumers derive this path instead of trusting the producer env.
 *
 * @param {string} workspace_root
 * @param {string} attempt_id
 * @returns {string}
 */
export function delegationMonitorDir(workspace_root, attempt_id) {
  const safe = String(attempt_id || 'attempt').replace(/[^A-Za-z0-9._-]/g, '_');
  return path.resolve(
    workspaceStateDir(workspace_root),
    'delegation-monitors',
    safe
  );
}

/**
 * @param {string} workspace_root
 * @returns {string}
 */
export function delegationMonitorRootDir(workspace_root) {
  return path.resolve(workspaceStateDir(workspace_root), 'delegation-monitors');
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

/**
 * Sanitize one caller-supplied path segment for the bead-scoped record layout
 * (record-timeline-retention §4).
 *
 * Uses the SAME `[^A-Za-z0-9._-]` → `_` mapping as the attempt-scoped helpers
 * above, plus one extra guard the older helpers never needed: a segment that
 * sanitizes to exactly `.` or `..` is replaced by the fallback. Bead and attempt
 * ids reach these helpers from bd metadata and ws payloads, and `..` is the one
 * value the character class alone leaves as a working parent-directory
 * reference.
 *
 * @param {string} value
 * @param {string} fallback - Used when `value` is empty or a dot segment.
 * @returns {string}
 */
function safeSegment(value, fallback) {
  const safe = String(value || '').replace(/[^A-Za-z0-9._-]/g, '_');
  if (safe.length === 0 || safe === '.' || safe === '..') {
    return fallback;
  }
  return safe;
}

/**
 * Absolute root of the per-bead record tree (record-timeline-retention §4).
 *
 * @param {string} workspace_root
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/beads`.
 */
export function beadsRootDir(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'beads');
}

/**
 * Absolute directory holding ONE bead's durable Worker records — timeline,
 * transferred attempt records, session originals, and archives.
 *
 * `bead_id` is explicit at every bead-scoped call site on purpose: an attempt id
 * is not required to embed its bead (`review:authority-…` does not), so the bead
 * can never be recovered from the attempt id.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/beads/<bead_id>`.
 */
export function beadStateDir(workspace_root, bead_id) {
  return path.join(beadsRootDir(workspace_root), safeSegment(bead_id, 'bead'));
}

/**
 * Absolute path to one bead's append-only event timeline — the permanent SoT
 * for that bead's Worker history (§5). Never pruned by retention.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @returns {string} `.../beads/<bead_id>/events.jsonl`.
 */
export function beadTimelinePath(workspace_root, bead_id) {
  return path.join(beadStateDir(workspace_root, bead_id), 'events.jsonl');
}

/**
 * Absolute path to one transferred (processed-terminal) attempt record — the
 * row `queue.json` no longer carries (§7).
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @param {string} attempt_id
 * @returns {string} `.../beads/<bead_id>/attempts/<attempt_id>.json`.
 */
export function attemptRecordPath(workspace_root, bead_id, attempt_id) {
  return path.join(
    beadStateDir(workspace_root, bead_id),
    'attempts',
    `${safeSegment(attempt_id, 'attempt')}.json`
  );
}

/**
 * Absolute path to the bead-scoped session-log jsonl for one attempt — the
 * destination the legacy flat {@link sessionLogPath} file is renamed to (§4).
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @param {string} attempt_id
 * @returns {string} `.../beads/<bead_id>/sessions/<attempt_id>.jsonl`.
 */
export function beadSessionLogPath(workspace_root, bead_id, attempt_id) {
  return path.join(
    beadStateDir(workspace_root, bead_id),
    'sessions',
    `${safeSegment(attempt_id, 'attempt')}.jsonl`
  );
}

/**
 * The stderr sidecar of {@link beadSessionLogPath}: same directory, same
 * attempt, `.stderr.log` — the bead-scoped twin of the flat sidecar
 * `session-log.js` already derives.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @param {string} attempt_id
 * @returns {string} `.../beads/<bead_id>/sessions/<attempt_id>.stderr.log`.
 */
export function beadSessionStderrPath(workspace_root, bead_id, attempt_id) {
  return path.join(
    beadStateDir(workspace_root, bead_id),
    'sessions',
    `${safeSegment(attempt_id, 'attempt')}.stderr.log`
  );
}

/**
 * Absolute path to the gzip archive of one attempt's session log (§8.2). The
 * third and last candidate of the read-resolution order.
 *
 * @param {string} workspace_root
 * @param {string} bead_id
 * @param {string} attempt_id
 * @returns {string} `.../beads/<bead_id>/archive/<attempt_id>.jsonl.gz`.
 */
export function beadArchivePath(workspace_root, bead_id, attempt_id) {
  return path.join(
    beadStateDir(workspace_root, bead_id),
    'archive',
    `${safeSegment(attempt_id, 'attempt')}.jsonl.gz`
  );
}

/**
 * Marker proving the one-time record migration (§8.3) completed. Lives INSIDE
 * `beads/` so it cannot outlive the tree it describes.
 *
 * @param {string} workspace_root
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/beads/.migrated-v1`.
 */
export function recordMigrationMarkerPath(workspace_root) {
  return path.join(beadsRootDir(workspace_root), '.migrated-v1');
}

/**
 * Absolute path to the per-workspace retention policy `{archive_days,
 * delete_days}` (§8.1). A file of its own rather than a `display-policy.json`
 * field, because that store drops unknown fields when it normalizes.
 *
 * @param {string} workspace_root
 * @returns {string} `$XDG_STATE_HOME/bdui/<slug>/retention-policy.json`.
 */
export function retentionPolicyPath(workspace_root) {
  return path.join(workspaceStateDir(workspace_root), 'retention-policy.json');
}
