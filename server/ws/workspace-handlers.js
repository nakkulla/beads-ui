/**
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import path from 'node:path';
import { makeError, makeOk } from '../../app/protocol.js';
import { runShell, stderrTail } from '../bd.js';
import { resolveWorkspaceDatabase } from '../db.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { sharedVisibleWorkspacesStore } from '../visible-workspaces-store.js';
import {
  ensureSubs,
  getConnWorkspace,
  log,
  registryFor,
  setConnWorkspace
} from './context.js';
import { notifyMonitorVisibilityChanged } from './monitor-handlers.js';

/**
 * Server-wide single visible-workspaces store (spec §6). The hidden set is
 * global, so one instance backs every connection's picker — and, since UI-nprg,
 * the monitor aggregation reads the SAME instance.
 *
 * @returns {ReturnType<typeof import('../visible-workspaces-store.js').createVisibleWorkspacesStore>}
 */
function visibleWorkspacesStore() {
  return sharedVisibleWorkspacesStore();
}

/**
 * Test-only: drop the store's in-memory cache so the next access cold-loads from
 * disk (mirrors the ui-order channel reset hook).
 */
export function __resetVisibleWorkspacesForTest() {
  visibleWorkspacesStore().__clearCacheForTest();
}

/**
 * In-flight workspace operations keyed by workspace `root_dir`. Prevents the
 * same workspace from running `git-pull-workspace` concurrently across multiple
 * clients or raw requests.
 *
 * @type {Map<string, { kind: 'git-pull' }>}
 */
const ACTIVE_WORKSPACE_OPS = new Map();

/**
 * Classify the result of a successful `git pull --rebase --autostash` run.
 * Stash pop conflict requires an explicit failure marker; absence of
 * "Applied autostash" is not enough since no-op / no-stash cases also lack it.
 *
 * @param {string} combined - stdout and stderr concatenated.
 * @returns {'updated' | 'up_to_date' | 'stash_pop_conflict'}
 */
function detectGitPullStatus(combined) {
  const stash_failed_markers = [
    'cannot apply stash',
    'could not restore stash',
    'Applied autostash failed'
  ];
  if (stash_failed_markers.some((m) => combined.includes(m))) {
    return 'stash_pop_conflict';
  }
  if (
    combined.includes('Already up to date') ||
    combined.includes('Already up-to-date')
  ) {
    return 'up_to_date';
  }
  return 'updated';
}

/**
 * Try to acquire a per-workspace operation lock.
 *
 * @param {string} root - Absolute workspace root directory.
 * @param {'git-pull'} kind
 * @returns {{ ok: true } | { ok: false, existing_kind: 'git-pull' }}
 */
function acquireWorkspaceLock(root, kind) {
  const existing = ACTIVE_WORKSPACE_OPS.get(root);
  if (existing) {
    return { ok: false, existing_kind: existing.kind };
  }
  ACTIVE_WORKSPACE_OPS.set(root, { kind });
  return { ok: true };
}

/**
 * Release a per-workspace operation lock.
 *
 * @param {string} root
 */
function releaseWorkspaceLock(root) {
  ACTIVE_WORKSPACE_OPS.delete(root);
}

/**
 * Handle a `list-workspaces` request: returns all registered workspaces plus
 * this connection's current workspace.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleListWorkspaces(ws, req) {
  log('list-workspaces');
  const workspaces = getAvailableWorkspaces();
  ws.send(
    JSON.stringify(
      makeOk(req, {
        workspaces,
        current: getConnWorkspace(ws),
        hidden: visibleWorkspacesStore().listHidden()
      })
    )
  );
}

/**
 * Handle a `set-workspace-visibility` request. Payload: { path: string, visible:
 * boolean } — toggles whether a workspace appears in the picker for EVERY client
 * (the hidden set is server-global, spec §6). Mirrors `handleSetWorkspace`
 * validation: the path must be absolute and present in the available-workspace
 * allowlist. Replies `{ changed, hidden }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSetWorkspaceVisibility(ws, req) {
  log('set-workspace-visibility');
  const { path: workspace_path, visible } = /** @type {any} */ (
    req.payload || {}
  );
  if (
    typeof workspace_path !== 'string' ||
    workspace_path.length === 0 ||
    !path.isAbsolute(workspace_path) ||
    typeof visible !== 'boolean'
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { path: string (absolute), visible: boolean }'
        )
      )
    );
    return;
  }

  const resolved = path.resolve(workspace_path);
  const allowed = new Set(
    getAvailableWorkspaces().map((workspace) => path.resolve(workspace.path))
  );
  if (!allowed.has(resolved)) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'Workspace must be in the available workspace list'
        )
      )
    );
    return;
  }

  const result = visibleWorkspacesStore().setVisibility(resolved, visible);
  ws.send(
    JSON.stringify(
      makeOk(req, { changed: result.changed, hidden: result.hidden })
    )
  );
  // The monitor aggregates the VISIBLE set (UI-nprg §서버 설계), so a toggle
  // changes which repos it must show — and, for a newly visible one, whether
  // its external PRs are being polled at all.
  if (result.changed) {
    notifyMonitorVisibilityChanged();
  }
}

/**
 * Handle a `get-workspace` request: returns this connection's workspace.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleGetWorkspace(ws, req) {
  log('get-workspace');
  ws.send(JSON.stringify(makeOk(req, getConnWorkspace(ws))));
}

/**
 * Handle a `set-workspace` request. Payload: { path: string } — switches THIS
 * connection only.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSetWorkspace(ws, req) {
  log('set-workspace');
  const { path: workspace_path } = /** @type {any} */ (req.payload || {});
  if (
    typeof workspace_path !== 'string' ||
    workspace_path.length === 0 ||
    !path.isAbsolute(workspace_path)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { path: string } (absolute workspace path)'
        )
      )
    );
    return;
  }

  // Resolve and validate the path against the available workspace allowlist.
  const resolved = path.resolve(workspace_path);
  const allowed = new Set(
    getAvailableWorkspaces().map((workspace) => path.resolve(workspace.path))
  );
  if (!allowed.has(resolved)) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'Workspace must be in the available workspace list'
        )
      )
    );
    return;
  }

  const old = getConnWorkspace(ws);
  const new_db = resolveWorkspaceDatabase({ cwd: resolved });

  // Detach this connection from its OLD workspace registry and drop its
  // subscription bookkeeping so it only ever holds subscriptions in its
  // current workspace registry.
  const s = ensureSubs(ws);
  const old_reg = registryFor(old?.root_dir);
  if (s.list_subs) {
    for (const { spec } of s.list_subs.values()) {
      try {
        old_reg.detach(spec, ws);
      } catch {
        // ignore detach errors
      }
    }
    s.list_subs.clear();
  }
  if (s.list_revisions) {
    s.list_revisions.clear();
  }

  setConnWorkspace(ws, { root_dir: resolved, db_path: new_db.path });

  const changed = new_db.path !== (old?.db_path || '');

  if (changed) {
    log(
      'connection workspace changed via set-workspace: %s → %s',
      old?.db_path || '',
      new_db.path
    );
  }

  ws.send(
    JSON.stringify(
      makeOk(req, {
        changed,
        workspace: getConnWorkspace(ws)
      })
    )
  );
}

/**
 * Handle a `git-pull-workspace` request: `git pull --rebase --autostash` under
 * a per-workspace lock, classifying conflict markers and aborting rebase on
 * conflict.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleGitPullWorkspace(ws, req) {
  log('git-pull-workspace');

  const conn_ws = getConnWorkspace(ws);
  const root_snapshot = conn_ws?.root_dir;
  if (!root_snapshot) {
    ws.send(
      JSON.stringify(makeError(req, 'server_error', 'No active workspace'))
    );
    return;
  }

  const lock = acquireWorkspaceLock(root_snapshot, 'git-pull');
  if (!lock.ok) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'busy',
          `${lock.existing_kind} in progress for workspace`
        )
      )
    );
    return;
  }

  const workspace_snapshot = { ...conn_ws };

  try {
    const res = await runShell('git', ['pull', '--rebase', '--autostash'], {
      cwd: root_snapshot
    });

    const combined = `${res.stdout}\n${res.stderr}`;
    const conflict_markers = [
      'CONFLICT',
      'could not apply',
      'Resolve all conflicts manually',
      'rebase --abort',
      'Failed to merge in the changes'
    ];
    const is_rebase_conflict = conflict_markers.some((m) =>
      combined.includes(m)
    );

    if (res.code === 0 && !is_rebase_conflict) {
      const status = detectGitPullStatus(combined);
      ws.send(
        JSON.stringify(
          makeOk(req, {
            workspace: workspace_snapshot,
            status,
            stdout_tail: stderrTail(res.stdout),
            stderr_tail: stderrTail(res.stderr)
          })
        )
      );
      return;
    }

    if (is_rebase_conflict) {
      const abort_res = await runShell('git', ['rebase', '--abort'], {
        cwd: root_snapshot
      });
      if (abort_res.code === 0) {
        ws.send(
          JSON.stringify(
            makeError(
              req,
              'rebase_conflict',
              stderrTail(res.stderr) ||
                stderrTail(res.stdout) ||
                'rebase conflict'
            )
          )
        );
        return;
      }
      log(
        'git rebase --abort failed (code=%d, stderr=%s)',
        abort_res.code,
        abort_res.stderr
      );
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'rebase_conflict_abort_failed',
            stderrTail(abort_res.stderr) ||
              stderrTail(res.stderr) ||
              'rebase abort failed'
          )
        )
      );
      return;
    }

    ws.send(
      JSON.stringify(
        makeError(
          req,
          'git_error',
          stderrTail(res.stderr) || stderrTail(res.stdout) || 'git failed'
        )
      )
    );
  } finally {
    releaseWorkspaceLock(root_snapshot);
  }
}
