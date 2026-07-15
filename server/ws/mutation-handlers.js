/**
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import {
  getGitUserNameInWorkspace,
  log,
  runBdInWorkspace,
  runBdJsonInWorkspace
} from './context.js';
import { triggerMutationRefreshOnce } from './refresh.js';

const UPDATE_STATUS_ALLOWED = new Set([
  'open',
  'in_progress',
  'deferred',
  'resolved',
  'closed'
]);

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleUpdateAssignee(ws, req) {
  const { id, assignee } = /** @type {any} */ (req.payload || {});
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof assignee !== 'string'
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id: string, assignee: string }'
        )
      )
    );
    return;
  }
  // Pass empty string to clear assignee when requested
  const res = await runBdInWorkspace(ws, [
    'update',
    id,
    '--assignee',
    assignee
  ]);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * Runner-specific orchestration model catalogs. `ccx` (claude-code-proxy) uses
 * the same model set as `claude`.
 */
const RUNNER_MODELS = {
  claude: ['opus', 'sonnet', 'haiku', 'fable'],
  codex: ['gpt-5.6', 'gpt-5.4'],
  ccx: ['opus', 'sonnet', 'haiku', 'fable']
};

/** Union of all orchestration models (server enum for orchestration_model). */
const ALL_ORCHESTRATION_MODELS = Array.from(
  new Set([...RUNNER_MODELS.claude, ...RUNNER_MODELS.codex])
);

/**
 * Allowed values per exec-preference key. `orchestration_model` uses the union
 * across runners; the client narrows by chosen runner for UX. An empty value
 * means "unset" (revert to harness default). `workflow_mode`'s only stored
 * value is `fast_track` — `standard`/empty is recorded as key removal.
 */
const EXEC_SETTING_ENUMS = {
  worker_runner: ['claude', 'codex', 'ccx'],
  orchestration_model: ALL_ORCHESTRATION_MODELS,
  orchestration_effort: ['low', 'medium', 'high', 'xhigh'],
  review_model: ['codex', 'opus', 'fable', 'self', 'skip'],
  impl_model: ['opus', 'fable', 'sonnet', 'haiku'],
  workflow_mode: ['fast_track']
};

/**
 * Build the `bd update` argv for a single exec-setting change. A `standard`/
 * empty `workflow_mode`, or any empty value, is translated to `--unset-metadata`
 * (key removal) rather than storing the literal — matching the contract that
 * absence = standard/default.
 *
 * @param {string} id
 * @param {string} key
 * @param {string} value
 * @returns {string[]}
 */
export function buildExecSettingsArgs(id, key, value) {
  const is_unset =
    value === '' || (key === 'workflow_mode' && value === 'standard');
  if (is_unset) {
    return ['update', id, '--unset-metadata', key];
  }
  return ['update', id, '--set-metadata', `${key}=${value}`];
}

/**
 * Validate an exec-setting mutation. Returns null when valid, else an error
 * message. `standard`/empty values are always valid (they map to unset).
 *
 * @param {string} key
 * @param {string} value
 * @returns {string | null}
 */
function validateExecSetting(key, value) {
  if (!Object.prototype.hasOwnProperty.call(EXEC_SETTING_ENUMS, key)) {
    return `unknown exec-setting key: ${key}`;
  }
  if (value === '') {
    return null; // unset — always allowed
  }
  if (key === 'workflow_mode' && value === 'standard') {
    return null; // standard — mapped to unset
  }
  const allowed = /** @type {Record<string, string[]>} */ (EXEC_SETTING_ENUMS)[
    key
  ];
  if (!allowed.includes(value)) {
    return `invalid value for ${key}: ${value}`;
  }
  return null;
}

/**
 * Set or unset one of the 5 exec-preference metadata keys (+ workflow_mode) via
 * `bd update --set-metadata` / `--unset-metadata`. Selecting `standard` (or
 * clearing a value) removes the key rather than storing a literal.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleUpdateExecSettings(ws, req) {
  log('update-exec-settings');
  const { id, key, value } = /** @type {any} */ (req.payload || {});
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof key !== 'string' ||
    typeof value !== 'string'
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id: string, key: string, value: string }'
        )
      )
    );
    return;
  }
  const invalid = validateExecSetting(key, value);
  if (invalid) {
    ws.send(JSON.stringify(makeError(req, 'bad_request', invalid)));
    return;
  }
  const res = await runBdInWorkspace(ws, buildExecSettingsArgs(id, key, value));
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleUpdateStatus(ws, req) {
  log('update-status');
  const { id, status } = /** @type {any} */ (req.payload);
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof status !== 'string' ||
    !UPDATE_STATUS_ALLOWED.has(status)
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          "payload requires { id: string, status: 'open'|'in_progress'|'deferred'|'resolved'|'closed' }"
        )
      )
    );
    return;
  }
  const res = await runBdInWorkspace(ws, ['update', id, '--status', status]);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  // After mutation, refresh active subscriptions once (watcher or timeout)
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleUpdatePriority(ws, req) {
  log('update-priority');
  const { id, priority } = /** @type {any} */ (req.payload);
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof priority !== 'number' ||
    priority < 0 ||
    priority > 4
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id: string, priority: 0..4 }'
        )
      )
    );
    return;
  }
  const res = await runBdInWorkspace(ws, [
    'update',
    id,
    '--priority',
    String(priority)
  ]);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleEditText(ws, req) {
  log('edit-text');
  const { id, field, value } = /** @type {any} */ (req.payload);
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    (field !== 'title' &&
      field !== 'description' &&
      field !== 'acceptance' &&
      field !== 'notes' &&
      field !== 'design') ||
    typeof value !== 'string'
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          "payload requires { id: string, field: 'title'|'description'|'acceptance'|'notes'|'design', value: string }"
        )
      )
    );
    return;
  }
  // Map UI fields to bd CLI flags
  // title       → --title
  // description → --description
  // acceptance  → --acceptance-criteria
  // notes       → --notes
  // design      → --design
  const flag =
    field === 'title'
      ? '--title'
      : field === 'description'
        ? '--description'
        : field === 'acceptance'
          ? '--acceptance-criteria'
          : field === 'notes'
            ? '--notes'
            : '--design';
  const res = await runBdInWorkspace(ws, ['update', id, flag, value]);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleCreateIssue(ws, req) {
  log('create-issue');
  const { title, type, priority, description } = /** @type {any} */ (
    req.payload || {}
  );
  if (typeof title !== 'string' || title.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { title: string, ... }')
      )
    );
    return;
  }
  const args = ['create', title];
  if (
    typeof type === 'string' &&
    (type === 'bug' ||
      type === 'feature' ||
      type === 'task' ||
      type === 'epic' ||
      type === 'chore')
  ) {
    args.push('-t', type);
  }
  if (typeof priority === 'number' && priority >= 0 && priority <= 4) {
    args.push('-p', String(priority));
  }
  if (typeof description === 'string' && description.length > 0) {
    args.push('-d', description);
  }
  const res = await runBdInWorkspace(ws, args);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  // Reply with a minimal ack
  ws.send(JSON.stringify(makeOk(req, { created: true })));
  // Refresh active subscriptions once (watcher or timeout)
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleDepAdd(ws, req) {
  const { a, b, view_id } = /** @type {any} */ (req.payload || {});
  if (
    typeof a !== 'string' ||
    a.length === 0 ||
    typeof b !== 'string' ||
    b.length === 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { a: string, b: string }'
        )
      )
    );
    return;
  }
  const res = await runBdInWorkspace(ws, ['dep', 'add', a, b]);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const id = typeof view_id === 'string' && view_id.length > 0 ? view_id : a;
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleDepRemove(ws, req) {
  const { a, b, view_id } = /** @type {any} */ (req.payload || {});
  if (
    typeof a !== 'string' ||
    a.length === 0 ||
    typeof b !== 'string' ||
    b.length === 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { a: string, b: string }'
        )
      )
    );
    return;
  }
  const res = await runBdInWorkspace(ws, ['dep', 'remove', a, b]);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const id = typeof view_id === 'string' && view_id.length > 0 ? view_id : a;
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleLabelAdd(ws, req) {
  const { id, label } = /** @type {any} */ (req.payload || {});
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof label !== 'string' ||
    label.trim().length === 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id: string, label: non-empty string }'
        )
      )
    );
    return;
  }
  const res = await runBdInWorkspace(ws, ['label', 'add', id, label.trim()]);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleLabelRemove(ws, req) {
  const { id, label } = /** @type {any} */ (req.payload || {});
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof label !== 'string' ||
    label.trim().length === 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id: string, label: non-empty string }'
        )
      )
    );
    return;
  }
  const res = await runBdInWorkspace(ws, ['label', 'remove', id, label.trim()]);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  const shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  if (shown.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', shown.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, shown.stdoutJson)));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleGetComments(ws, req) {
  const { id } = /** @type {any} */ (req.payload || {});
  if (typeof id !== 'string' || id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { id: string }')
      )
    );
    return;
  }
  const res = await runBdJsonInWorkspace(ws, ['comments', id, '--json']);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, res.stdoutJson || [])));
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleAddComment(ws, req) {
  const { id, text } = /** @type {any} */ (req.payload || {});
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof text !== 'string' ||
    text.trim().length === 0
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id: string, text: non-empty string }'
        )
      )
    );
    return;
  }

  // Get git user name for author attribution
  const author = await getGitUserNameInWorkspace(ws);
  const args = ['comment', id, text.trim()];
  if (author) {
    args.push('--actor', author);
  }

  const res = await runBdInWorkspace(ws, args);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }

  // Return updated comments list
  const comments = await runBdJsonInWorkspace(ws, ['comments', id, '--json']);
  if (comments.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', comments.stderr || 'bd failed'))
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, comments.stdoutJson || [])));
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleDeleteIssue(ws, req) {
  const { id } = /** @type {any} */ (req.payload || {});
  if (typeof id !== 'string' || id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { id: string }')
      )
    );
    return;
  }
  const res = await runBdInWorkspace(ws, ['delete', id, '--force']);
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bd_error', res.stderr || 'bd delete failed')
      )
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, { deleted: true, id })));
  try {
    triggerMutationRefreshOnce();
  } catch {
    // ignore
  }
}
