/**
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import {
  AUTO_LITERAL,
  execSettingEnums,
  sessionDefaultEnums,
  validateImplSettings
} from '../worker/exec-enums.js';
import {
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
 * Allowed values per exec-preference key for the per-bead edit surface: the
 * three orchestration keys PLUS the 12 SESSION keys.
 *
 * The session half comes from {@link sessionDefaultEnums}, which is the same
 * table the `bd kv` layer validates against — a Bead pin and a workspace default
 * must accept exactly the same vocabulary, or a value that is settable globally
 * could not be pinned (and vice versa). That is what brings `impl_dispatch`,
 * `impl_speed`, both `workflow_mode` values, and the `auto` literal on
 * `impl_model`/`impl_effort` into this surface.
 *
 * Built per call, not per module load: both tables are catalog-derived and the
 * catalog is read from `config.toml` at first use.
 *
 * @returns {Record<string, ReadonlyArray<string>>}
 */
function execSettingEnumsForBead() {
  return { ...execSettingEnums(), ...sessionDefaultEnums() };
}

/**
 * Build the `bd update` argv for a single exec-setting change.
 *
 * Every per-bead session-key editor is THREE-STATE (spec §E): an explicit value
 * is written as a literal and only the empty value — the editor's `(기본)`
 * choice — removes the key. `workflow_mode=standard` is therefore a literal
 * write, not a deletion: `Bead metadata > bd kv` requires a bead to be able to
 * override a `fast_track` workspace default, which a deletion cannot express.
 *
 * @param {string} id
 * @param {string} key
 * @param {string} value
 * @returns {string[]}
 */
export function buildExecSettingsArgs(id, key, value) {
  if (value === '') {
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
  const enums = execSettingEnumsForBead();
  if (!Object.prototype.hasOwnProperty.call(enums, key)) {
    return `unknown exec-setting key: ${key}`;
  }
  // An EXACT implementation target is coupled: a model only has meaning with
  // its runtime and a legal effort, so both setting and CLEARING one leg must
  // go through the atomic group write — clearing `impl_runtime` alone would
  // orphan an exact model. `auto` is outside that coupling: it names a selector
  // STATE rather than a catalog model or effort, so it is an ordinary literal.
  if (
    LINKED_IMPL_KEYS.includes(key) &&
    !(value === AUTO_LITERAL && key !== 'impl_runtime')
  ) {
    return 'implementation target must be updated with update-impl-target';
  }
  if (value === '') {
    return null; // `(기본)` — the ONLY per-bead deletion
  }
  const allowed = enums[key];
  if (!allowed.includes(value)) {
    return `invalid value for ${key}: ${value}`;
  }
  return null;
}

/** The three coupled implementation keys, written atomically when exact. */
const LINKED_IMPL_KEYS = ['impl_runtime', 'impl_model', 'impl_effort'];

/**
 * Drop the `auto` literals before a catalog coherence check. `auto` is the
 * selector's model/auto · effort/auto state; feeding it to
 * {@link validateImplSettings} would read as an unknown model.
 *
 * @param {Record<string, string>} target
 * @returns {Record<string, string>}
 */
function exactImplValues(target) {
  /** @type {Record<string, string>} */
  const exact = {};
  for (const [key, value] of Object.entries(target)) {
    if (value && value !== AUTO_LITERAL) {
      exact[key] = value;
    }
  }
  return exact;
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
  // Coherence is judged over the EXACT values only: `auto` names a selector
  // state, not a catalog model or effort, so it neither constrains nor is
  // constrained by the runtime (spec §A `impl_model`/`impl_effort` auto).
  const coherence = validateImplSettings(
    exactImplValues({ impl_runtime, impl_model, impl_effort }),
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
