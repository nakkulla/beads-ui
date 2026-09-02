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

/** @typedef {'update-status'|'edit-text'|'update-priority'|'create-issue'|'update-assignee'|'dep-add'|'dep-remove'|'update-exec-settings'|'update-impl-target'|'get-session-defaults'|'set-session-defaults'|'get-workspace-accounts'|'set-workspace-accounts'|'update-workflow-meta'|'label-add'|'label-remove'|'subscribe-list'|'unsubscribe-list'|'snapshot'|'upsert'|'delete'|'get-comments'|'add-comment'|'delete-issue'|'list-workspaces'|'set-workspace'|'set-workspace-visibility'|'get-workspace'|'workspace-changed'|'git-pull-workspace'|'subscribe-worker-queue'|'unsubscribe-worker-queue'|'worker-queue-snapshot'|'worker-queue-place'|'worker-queue-reorder'|'worker-queue-toggle'|'worker-automation-toggle'|'worker-repo-ops-opt-out-toggle'|'worker-repo-operation-dismiss'|'worker-repo-operation-deploy-run'|'worker-queue-set-slots'|'worker-queue-set-serial-lane-count'|'worker-queue-set-orchestration-defaults'|'worker-queue-remove'|'worker-attempt-pause'|'worker-attempt-stop'|'worker-attempt-resume'|'worker-cleanup-retry'|'worker-resolve-in-session'|'worker-parked-retry'|'worker-queue-hold-resume'|'worker-queue-hold-retry-now'|'worker-merge-queue-add'|'worker-merge-queue-add-all'|'worker-merge-auto-toggle'|'worker-merge-queue-remove'|'worker-discard'|'worker-discard-abandon'|'worker-stale-work-continue'|'worker-stale-work-backup-fresh'|'worker-stale-work-recheck'|'worker-pr-discard'|'worker-revise-fix'|'worker-revise-approve'|'subscribe-ui-order'|'unsubscribe-ui-order'|'ui-order-set'|'ui-order-snapshot'|'subscribe-display-policy'|'unsubscribe-display-policy'|'display-policy-set'|'display-policy-snapshot'|'subscribe-session-log'|'unsubscribe-session-log'|'session-log-snapshot'|'session-log-append'|'get-attempt-prompt'|'get-bead-prompt'|'get-bead-timeline'|'get-session-refs'|'get-worker-system-prompt'|'subscribe-monitor-pipeline'|'unsubscribe-monitor-pipeline'|'monitor-pipeline-snapshot'|'monitor-auto-toggle'|'monitor-lane-create'|'monitor-lane-update'|'monitor-lane-confirm'|'monitor-lane-remove'|'subscribe-impl-presets'|'unsubscribe-impl-presets'|'impl-presets-snapshot'|'impl-preset-create'|'impl-preset-update'|'impl-preset-delete'|'apply-impl-preset'|'apply-impl-preset-global'} MessageType */

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
  // Workspace-global SESSION defaults (`bd kv workflow_session_defaults`). One
  // request/response pair, not a subscription: the layer changes only when a
  // human edits the settings dialog, and every consumer re-reads on open.
  'get-session-defaults',
  'set-session-defaults',
  'get-workspace-accounts',
  'set-workspace-accounts',
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
  'worker-automation-toggle',
  // Per-kind workspace opt-out from the repository's DECLARED verify/deploy
  // operations (UI-lsti §3). Not a config edit: the declaration and every other
  // workspace are untouched, and only NEW operations in THIS workspace stop.
  'worker-repo-ops-opt-out-toggle',
  // 「기록 닫기」 for one FAILED RepoOperation row (UI-q0uy §4.6-2). Marks it
  // acknowledged; the row stays failed and auditable, and only the 해결 필요
  // tally and its action buttons drop it.
  'worker-repo-operation-dismiss',
  // 「배포 실행」 for the declared deploy lane (UI-s582 §3). Payload
  // `{ repo_id }`; the target SHA is NOT an input — the server pins the fetched
  // remote tip through the workspace's own base resolver and reads the declared
  // script from THAT tip.
  'worker-repo-operation-deploy-run',
  // Concurrency cap edit (integer ≥ 1; CAS-guarded, worker-phase2 §3)
  'worker-queue-set-slots',
  // Fixed serial-lane count (1..5; CAS-guarded, UI-04vo §1). Replaces the
  // retired merge-serial slot-hold toggle — serial lanes carry that meaning now.
  'worker-queue-set-serial-lane-count',
  // Workspace orchestration defaults stored as VALUES (spec §C.5). Replaces
  // the retired `worker-queue-set-default-exec-preset` preset reference.
  'worker-queue-set-orchestration-defaults',
  'worker-queue-remove',
  // Pause (⏸) a running attempt: resumable, bead stays queued
  'worker-attempt-pause',
  // Retired legacy action; server returns action_retired without mutation.
  'worker-attempt-stop',
  // Manual resume (↻ / paused ▶) in the attempt's existing worktree; payload:
  // { attempt_id, expected_revision, continuation?, decision_token?, instructions? }
  'worker-attempt-resume',
  // Human-authorized retry of the canonical post-merge cleanup action.
  'worker-cleanup-retry',
  // [세션에서 해결] (UI-jw27 §4): the human-authorized launch of an INTERACTIVE
  // session on a terminal failure row, forked off the bead's recorded session
  // when one is forkable. The click is the only trigger; nothing dispatches it.
  'worker-resolve-in-session',
  // 큐 보류/정지와 세션 파킹의 사람 출구 (UI-5ym8 §4). 셋 다 CAS다: hold 둘은
  // `{since}`가 현재 hold와 같을 때만 적용되고, 파킹 재시도는 그 attempt가
  // 아직 그 bead의 마지막 attempt일 때만 새 attempt를 띄운다. 응답 뒤에는
  // `worker-queue-snapshot` fanout이 따른다.
  'worker-parked-retry',
  'worker-queue-hold-resume',
  'worker-queue-hold-retry-now',
  // Sequential merge queue (UI-5v7d): the [머지] click QUEUES, [일괄 머지]
  // queues every mergeable row at once, and remove cancels a waiting item. The
  // server-side driver is the only thing that merges, one item at a time.
  'worker-merge-queue-add',
  'worker-merge-queue-add-all',
  'worker-merge-auto-toggle',
  'worker-merge-queue-remove',
  // Unified restart-safe discard operation for every worker-owned phase.
  'worker-discard',
  // Give up one failed requested discard without performing destructive work.
  'worker-discard-abandon',
  'worker-stale-work-continue',
  'worker-stale-work-backup-fresh',
  'worker-stale-work-recheck',
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
  // 이 bead의 Worker 이력 전체 (record-timeline-retention §9), 최근순.
  'get-bead-timeline',
  'get-worker-system-prompt',
  // Session-ref inspection (UI-4xzk §4.2): the `session_ref` items of one bead,
  // resolved against THIS server's filesystem. Request/response for the same
  // reason as the prompts — the issue detail panel asks only when it is open.
  'get-session-refs',
  // Monitor pipeline channel (UI-nprg): ONE server-global subscription that
  // aggregates every visible workspace's worker pipeline into a single
  // snapshot. Unlike `worker-queue`, it is not scoped to the connection's
  // current workspace — the monitor tab is a cross-repo dashboard.
  'subscribe-monitor-pipeline',
  'unsubscribe-monitor-pipeline',
  'monitor-pipeline-snapshot',
  // Server-global IMPLEMENTATION presets (spec §C.6). One subscription survives
  // tab and workspace changes; the snapshot is total state with its own CAS
  // revision. Two apply paths: one Bead's metadata, or the workspace kv layer.
  'subscribe-impl-presets',
  'unsubscribe-impl-presets',
  'impl-presets-snapshot',
  'impl-preset-create',
  'impl-preset-update',
  'impl-preset-delete',
  'apply-impl-preset',
  'apply-impl-preset-global',
  // Master automation switch (UI-qrfo §6): turns `auto_advance` + `auto_merge`
  // on/off across EVERY visible workspace at once. No `root_dir` — the target
  // is the whole visible set, which is also the button's denominator.
  'monitor-auto-toggle',
  // Stored cross-lane membership (UI-j92s §4.3). Server-global like the channel
  // that carries them: a 연결 레인 spans repos, so no `root_dir` addresses it.
  // Every op is CAS-guarded by the snapshot's `cross_lanes.revision`.
  'monitor-lane-create',
  'monitor-lane-update',
  'monitor-lane-confirm',
  'monitor-lane-remove'
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
