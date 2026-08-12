/**
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { workerLabels } from '../../app/utils/worker-eligibility.js';
import { WORKER_SERIAL_LABEL } from '../../app/utils/worker-serial.js';
import { tickWorkerQueue } from '../worker/attach.js';
import {
  execSettingEnums,
  validateImplSettings
} from '../worker/exec-enums.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import {
  getConnWorkspace,
  getGitUserNameInWorkspace,
  log,
  runBdInWorkspace,
  runBdJsonInWorkspace
} from './context.js';
import { triggerMutationRefreshOnce } from './refresh.js';
import { pruneUiOrderForClose } from './ui-order-handlers.js';

const UPDATE_STATUS_ALLOWED = new Set([
  'open',
  'in_progress',
  'deferred',
  'resolved',
  'closed'
]);

/**
 * Converge the cache and scheduler only after an exact `worker-serial` label
 * mutation has a successful readback proving the requested truth. The generic
 * label reply and subscription refresh stay unchanged for every other case.
 *
 * @param {WebSocket} ws
 * @param {string} requested_bead_id
 * @param {string} label
 * @param {boolean} expected_present
 * @param {unknown} shown
 */
function convergeWorkerSerialLabel(
  ws,
  requested_bead_id,
  label,
  expected_present,
  shown
) {
  if (label !== WORKER_SERIAL_LABEL) {
    return;
  }
  const raw_issue = Array.isArray(shown) ? shown[0] : shown;
  if (!raw_issue || typeof raw_issue !== 'object' || Array.isArray(raw_issue)) {
    return;
  }
  const issue = /** @type {any} */ (raw_issue);
  if (issue.id !== requested_bead_id || !Array.isArray(issue.labels)) {
    return;
  }
  const present = workerLabels(issue.labels).includes(WORKER_SERIAL_LABEL);
  if (present !== expected_present) {
    return;
  }
  const workspace = getConnWorkspace(ws)?.root_dir || '';
  if (workspace.length === 0) {
    return;
  }
  try {
    getWorkerRuntime().titleCache.refreshFromIssue(workspace, issue);
  } catch {
    // Queue enforcement remains authoritative even if UI projection refreshes
    // fail, so the scheduler tick must still run below.
  }
  void Promise.resolve(tickWorkerQueue(workspace)).catch(() => {});
}

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
    triggerMutationRefreshOnce(ws);
  } catch {
    // ignore
  }
}

/**
 * Allowed values per exec-preference key for the per-bead detail-panel edit
 * surface: the 12 workspace-global keys from the shared exec-enums single source
 * PLUS `workflow_mode` (per-bead only — its only stored value is `fast_track`;
 * `standard`/empty is recorded as key removal). The 12-key table stays canonical
 * in exec-enums.js; only the extra per-bead `workflow_mode` is synthesized here
 * so this edit surface's behavior is unchanged. `orchestration_model` uses the
 * catalog union across runners; the client narrows by chosen runner for UX.
 *
 * Built per call, not per module load: the base table is catalog-derived and the
 * catalog is read from `config.toml` at first use.
 *
 * @returns {Record<string, ReadonlyArray<string>>}
 */
function execSettingEnumsForBead() {
  return { ...execSettingEnums(), workflow_mode: ['fast_track'] };
}

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
 * Build one atomic implementation-target update. The three coupled metadata
 * values must never be written as independent mutations: an exact model only
 * has meaning with its runtime and legal effort.
 *
 * @param {string} id
 * @param {{ impl_runtime: string, impl_model: string, impl_effort: string }} target
 * @returns {string[]}
 */
export function buildImplTargetArgs(id, target) {
  /** @type {string[]} */
  const args = ['update', id];
  for (const key of /** @type {const} */ ([
    'impl_runtime',
    'impl_model',
    'impl_effort'
  ])) {
    const value = target[key];
    if (value) {
      args.push('--set-metadata', `${key}=${value}`);
    } else {
      args.push('--unset-metadata', key);
    }
  }
  return args;
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
  if (['impl_runtime', 'impl_model', 'impl_effort'].includes(key)) {
    return 'implementation target must be updated with update-impl-target';
  }
  const enums = execSettingEnumsForBead();
  if (!Object.prototype.hasOwnProperty.call(enums, key)) {
    return `unknown exec-setting key: ${key}`;
  }
  if (value === '') {
    return null; // unset — always allowed
  }
  if (key === 'workflow_mode' && value === 'standard') {
    return null; // standard — mapped to unset
  }
  const allowed = enums[key];
  if (!allowed.includes(value)) {
    return `invalid value for ${key}: ${value}`;
  }
  if (key === 'impl_model' || key === 'impl_runtime' || key === 'impl_effort') {
    const coherence = validateImplSettings({ [key]: value });
    if (!coherence.ok) {
      return coherence.reason;
    }
  }
  return null;
}

/**
 * Set or unset one of the 12 exec-preference metadata keys (+ workflow_mode) via
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
    triggerMutationRefreshOnce(ws);
  } catch {
    // ignore
  }
}

/**
 * Atomically set/unset the linked implementation runtime/model/effort target
 * and return exactly one authoritative `bd show --json` readback.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleUpdateImplTarget(ws, req) {
  log('update-impl-target');
  const { id, impl_runtime, impl_model, impl_effort, orchestration_runtime } =
    /** @type {any} */ (req.payload || {});
  if (
    typeof id !== 'string' ||
    id.length === 0 ||
    typeof impl_runtime !== 'string' ||
    typeof impl_model !== 'string' ||
    typeof impl_effort !== 'string'
  ) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id, impl_runtime, impl_model, impl_effort }'
        )
      )
    );
    return;
  }
  const coherence = validateImplSettings(
    {
      ...(impl_runtime ? { impl_runtime } : {}),
      ...(impl_model ? { impl_model } : {}),
      ...(impl_effort ? { impl_effort } : {})
    },
    {
      ...(typeof orchestration_runtime === 'string'
        ? { controller_runtime: orchestration_runtime }
        : {})
    }
  );
  if (!coherence.ok) {
    ws.send(JSON.stringify(makeError(req, 'bad_request', coherence.reason)));
    return;
  }
  const res = await runBdInWorkspace(
    ws,
    buildImplTargetArgs(id, { impl_runtime, impl_model, impl_effort })
  );
  if (res.code !== 0) {
    ws.send(
      JSON.stringify(makeError(req, 'bd_error', res.stderr || 'bd failed'))
    );
    return;
  }
  let shown;
  try {
    shown = await runBdJsonInWorkspace(ws, ['show', id, '--json']);
  } catch (err) {
    triggerMutationRefreshOnce(ws);
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bd_readback_failed',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
    return;
  }
  const raw_issue = Array.isArray(shown.stdoutJson)
    ? shown.stdoutJson[0]
    : shown.stdoutJson;
  if (
    shown.code !== 0 ||
    !raw_issue ||
    typeof raw_issue !== 'object' ||
    Array.isArray(raw_issue) ||
    typeof (/** @type {any} */ (raw_issue).id) !== 'string'
  ) {
    triggerMutationRefreshOnce(ws);
    ws.send(
      JSON.stringify(
        makeError(req, 'bd_readback_failed', shown.stderr || 'bd show failed')
      )
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, raw_issue)));
  triggerMutationRefreshOnce(ws);
}

/**
 * Workflow metadata enum keys editable from the detail panel
 * (worker-autorun-policy §6). Same unset convention as exec settings: an
 * empty value removes the key (absence = derived/default at read time).
 */
const WORKFLOW_META_ENUMS = {
  route: ['quick_fix', 'spec_backed', 'full_plan']
};

/**
 * Set or unset one of the workflow metadata enum keys (route) via
 * `bd update --set-metadata` / `--unset-metadata`, replying with the fresh
 * `bd show` readback (worker-autorun-policy §6).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleUpdateWorkflowMeta(ws, req) {
  log('update-workflow-meta');
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
  const allowed = /** @type {Record<string, string[]>} */ (WORKFLOW_META_ENUMS)[
    key
  ];
  if (!allowed) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', `unknown workflow-meta key: ${key}`)
      )
    );
    return;
  }
  if (value !== '' && !allowed.includes(value)) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', `invalid value for ${key}: ${value}`)
      )
    );
    return;
  }
  const args =
    value === ''
      ? ['update', id, '--unset-metadata', key]
      : ['update', id, '--set-metadata', `${key}=${value}`];
  const res = await runBdInWorkspace(ws, args);
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
    triggerMutationRefreshOnce(ws);
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
  // A WS-originated close drops the bead's manual rank so it never lingers in
  // the order map (spec §2; scope: WS closes only). No-op when it had no rank.
  if (status === 'closed') {
    try {
      pruneUiOrderForClose(ws, [id]);
    } catch {
      // ignore
    }
  }
  // After mutation, refresh active subscriptions once (watcher or timeout)
  try {
    triggerMutationRefreshOnce(ws);
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
    triggerMutationRefreshOnce(ws);
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
    triggerMutationRefreshOnce(ws);
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
    triggerMutationRefreshOnce(ws);
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
    triggerMutationRefreshOnce(ws);
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
    triggerMutationRefreshOnce(ws);
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
  convergeWorkerSerialLabel(ws, id, label.trim(), true, shown.stdoutJson);
  try {
    triggerMutationRefreshOnce(ws);
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
  convergeWorkerSerialLabel(ws, id, label.trim(), false, shown.stdoutJson);
  try {
    triggerMutationRefreshOnce(ws);
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
    triggerMutationRefreshOnce(ws);
  } catch {
    // ignore
  }
}
