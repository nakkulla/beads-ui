/**
 * Protocol definitions for beads-ui WebSocket communication.
 *
 * Conventions
 * - All messages are JSON objects.
 * - Client → Server uses RequestEnvelope.
 * - Server → Client uses ReplyEnvelope.
 * - Every request is correlated by `id` in replies.
 * - Server can also send unsolicited events (e.g., subscription `snapshot`).
 */

/** @typedef {'update-status'|'edit-text'|'update-priority'|'create-issue'|'update-assignee'|'dep-add'|'dep-remove'|'update-exec-settings'|'update-impl-target'|'update-workflow-meta'|'label-add'|'label-remove'|'subscribe-list'|'unsubscribe-list'|'snapshot'|'upsert'|'delete'|'get-comments'|'add-comment'|'delete-issue'|'list-workspaces'|'set-workspace'|'set-workspace-visibility'|'get-workspace'|'workspace-changed'|'git-pull-workspace'|'subscribe-worker-queue'|'unsubscribe-worker-queue'|'worker-queue-snapshot'|'worker-queue-place'|'worker-queue-reorder'|'worker-queue-toggle'|'worker-queue-set-slots'|'worker-deployment-retry'|'worker-deployment-recovery-continue'|'worker-queue-set-pr-wait-hold'|'worker-queue-set-default-exec-preset'|'worker-queue-remove'|'worker-attempt-pause'|'worker-attempt-stop'|'worker-attempt-resume'|'worker-attempt-dismiss'|'worker-merge-queue-add'|'worker-merge-queue-add-all'|'worker-merge-auto-toggle'|'worker-merge-queue-remove'|'worker-discard'|'worker-pr-discard'|'worker-revise-fix'|'worker-revise-approve'|'subscribe-ui-order'|'unsubscribe-ui-order'|'ui-order-set'|'ui-order-snapshot'|'subscribe-display-policy'|'unsubscribe-display-policy'|'display-policy-set'|'display-policy-snapshot'|'subscribe-session-log'|'unsubscribe-session-log'|'session-log-snapshot'|'session-log-append'|'get-attempt-prompt'|'get-bead-prompt'|'get-worker-system-prompt'|'subscribe-monitor-pipeline'|'unsubscribe-monitor-pipeline'|'monitor-pipeline-snapshot'|'monitor-auto-toggle'|'subscribe-exec-presets'|'unsubscribe-exec-presets'|'exec-presets-snapshot'|'exec-preset-create'|'exec-preset-update'|'exec-preset-delete'|'apply-exec-preset'} MessageType */

/**
 * @typedef {Object} RequestEnvelope
 * @property {string} id - Unique id to correlate request/response.
 * @property {MessageType} type - Message type.
 * @property {unknown} [payload] - Message payload.
 */

/**
 * @typedef {Object} ErrorObject
 * @property {string} code - Stable error code.
 * @property {string} message - Human-readable message.
 * @property {unknown} [details] - Optional extra info for debugging.
 */

/**
 * @typedef {Object} ReplyEnvelope
 * @property {string} id - Correlates to the originating request.
 * @property {boolean} ok - True when request succeeded; false on error.
 * @property {MessageType} type - Echoes request type (or event type).
 * @property {unknown} [payload] - Response payload.
 * @property {ErrorObject} [error] - Present when ok=false.
 */

/** @type {MessageType[]} */
export const MESSAGE_TYPES = /** @type {const} */ ([
  'update-status',
  'edit-text',
  'update-priority',
  'create-issue',
  'dep-add',
  'dep-remove',
  'update-assignee',
  // Execution-preference metadata (12 keys + workflow_mode), plus the linked
  // implementation target's atomic three-key mutation.
  'update-exec-settings',
  'update-impl-target',
  // Workflow metadata enum edits (route)
  'update-workflow-meta',
  'label-add',
  'label-remove',
  'subscribe-list',
  'unsubscribe-list',
  // vNext per-subscription full-issue push events
  'snapshot',
  'upsert',
  'delete',
  // Comments
  'get-comments',
  'add-comment',
  // Delete issue
  'delete-issue',
  // Workspace management
  'list-workspaces',
  'set-workspace',
  'set-workspace-visibility',
  'get-workspace',
  'workspace-changed',
  'git-pull-workspace',
  // Worker queue channel (subscription + CAS-guarded mutations + push snapshot)
  'subscribe-worker-queue',
  'unsubscribe-worker-queue',
  'worker-queue-snapshot',
  'worker-queue-place',
  'worker-queue-reorder',
  'worker-queue-toggle',
  // Concurrency cap edit (integer ≥ 1; CAS-guarded, worker-phase2 §3)
  'worker-queue-set-slots',
  'worker-deployment-retry',
  'worker-deployment-recovery-continue',
  // Durable PR-wait occupancy toggle (CAS-guarded, UI-mh3x)
  'worker-queue-set-pr-wait-hold',
  'worker-queue-set-default-exec-preset',
  'worker-queue-remove',
  // Pause (⏸) a running attempt: resumable, bead stays queued
  'worker-attempt-pause',
  // Retired legacy action; server returns action_retired without mutation.
  'worker-attempt-stop',
  // Manual resume (↻ / paused ▶) in the attempt's existing worktree
  'worker-attempt-resume',
  // Failure-banner ✕: stamp `dismissed_at` so the failure reads as handled
  'worker-attempt-dismiss',
  // Sequential merge queue (UI-5v7d): the [머지] click QUEUES, [일괄 머지]
  // queues every mergeable row at once, and remove cancels a waiting item. The
  // server-side driver is the only thing that merges, one item at a time.
  'worker-merge-queue-add',
  'worker-merge-queue-add-all',
  'worker-merge-auto-toggle',
  'worker-merge-queue-remove',
  // Unified restart-safe discard operation for every worker-owned phase.
  'worker-discard',
  // Retired legacy action; server returns action_retired without mutation.
  'worker-pr-discard',
  // REVISE-parking disposition clicks (UI-hs11): finding acceptance dispatches
  // the repair session, delta approval refreshes the receipt server-side.
  'worker-revise-fix',
  'worker-revise-approve',
  // Manual UI-order channel: subscription + CAS-guarded set + push snapshot (§2)
  'subscribe-ui-order',
  'unsubscribe-ui-order',
  'ui-order-set',
  'ui-order-snapshot',
  // Label/metadata display-policy channel: subscription + CAS-guarded set +
  // push snapshot. Replaces the one-shot `config.toml [labels]` bootstrap.
  'subscribe-display-policy',
  'unsubscribe-display-policy',
  'display-policy-set',
  'display-policy-snapshot',
  // Session-log (transcript) channel: subscribe → snapshot + live appends (§5.6)
  'subscribe-session-log',
  'unsubscribe-session-log',
  'session-log-snapshot',
  'session-log-append',
  // Prompt inspection (UI-rxp3 §5): on-demand reads of what a session was
  // actually sent. Deliberately request/response rather than snapshot fields —
  // the prompts are multi-kilobyte and almost never rendered, so they are
  // stripped from the queue push and fetched only when a reader opens them.
  'get-attempt-prompt',
  'get-bead-prompt',
  'get-worker-system-prompt',
  // Monitor pipeline channel (UI-nprg): ONE server-global subscription that
  // aggregates every visible workspace's worker pipeline into a single
  // snapshot. Unlike `worker-queue`, it is not scoped to the connection's
  // current workspace — the monitor tab is a cross-repo dashboard.
  'subscribe-monitor-pipeline',
  'unsubscribe-monitor-pipeline',
  'monitor-pipeline-snapshot',
  // Server-global worker execution presets. One subscription survives tab and
  // workspace changes; the snapshot is total state with its own CAS revision.
  'subscribe-exec-presets',
  'unsubscribe-exec-presets',
  'exec-presets-snapshot',
  'exec-preset-create',
  'exec-preset-update',
  'exec-preset-delete',
  'apply-exec-preset',
  // Master automation switch (UI-qrfo §6): turns `auto_advance` + `auto_merge`
  // on/off across EVERY visible workspace at once. No `root_dir` — the target
  // is the whole visible set, which is also the button's denominator.
  'monitor-auto-toggle'
]);

/**
 * Generate a lexically sortable request id.
 *
 * @returns {string}
 */
export function nextId() {
  const now = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${now}-${rand}`;
}

/**
 * Create a request envelope.
 *
 * @param {MessageType} type - Message type.
 * @param {unknown} [payload] - Message payload.
 * @param {string} [id] - Optional id; generated if omitted.
 * @returns {RequestEnvelope}
 */
export function makeRequest(type, payload, id = nextId()) {
  return { id, type, payload };
}

/**
 * Create a successful reply envelope for a given request.
 *
 * @param {RequestEnvelope} req - Original request.
 * @param {unknown} [payload] - Reply payload.
 * @returns {ReplyEnvelope}
 */
export function makeOk(req, payload) {
  return { id: req.id, ok: true, type: req.type, payload };
}

/**
 * Create an error reply envelope for a given request.
 *
 * @param {RequestEnvelope} req - Original request.
 * @param {string} code
 * @param {string} message
 * @param {unknown} [details]
 * @returns {ReplyEnvelope}
 */
export function makeError(req, code, message, details) {
  return {
    id: req.id,
    ok: false,
    type: req.type,
    error: { code, message, details }
  };
}

/**
 * Check if a value is a plain object.
 *
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Type guard for MessageType values.
 *
 * @param {unknown} value
 * @returns {value is MessageType}
 */
export function isMessageType(value) {
  return (
    typeof value === 'string' &&
    MESSAGE_TYPES.includes(/** @type {MessageType} */ (value))
  );
}

/**
 * Type guard for RequestEnvelope.
 *
 * @param {unknown} value
 * @returns {value is RequestEnvelope}
 */
export function isRequest(value) {
  if (!isRecord(value)) {
    return false;
  }
  return (
    typeof value.id === 'string' &&
    typeof value.type === 'string' &&
    (value.payload === undefined || 'payload' in value)
  );
}

/**
 * Type guard for ReplyEnvelope.
 *
 * @param {unknown} value
 * @returns {value is ReplyEnvelope}
 */
export function isReply(value) {
  if (!isRecord(value)) {
    return false;
  }
  if (
    typeof value.id !== 'string' ||
    typeof value.ok !== 'boolean' ||
    !isMessageType(value.type)
  ) {
    return false;
  }
  if (value.ok === false) {
    const err = value.error;
    if (
      !isRecord(err) ||
      typeof err.code !== 'string' ||
      typeof err.message !== 'string'
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Normalize and validate an incoming JSON value as a RequestEnvelope.
 * Throws a user-friendly error if invalid.
 *
 * @param {unknown} json
 * @returns {RequestEnvelope}
 */
export function decodeRequest(json) {
  if (!isRequest(json)) {
    throw new Error('Invalid request envelope');
  }
  return json;
}

/**
 * Normalize and validate an incoming JSON value as a ReplyEnvelope.
 *
 * @param {unknown} json
 * @returns {ReplyEnvelope}
 */
export function decodeReply(json) {
  if (!isReply(json)) {
    throw new Error('Invalid reply envelope');
  }
  return json;
}
