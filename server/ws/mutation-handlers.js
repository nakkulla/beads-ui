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
