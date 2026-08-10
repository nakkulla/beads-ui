/**
 * WebSocket handlers for the Worker queue channel (spec §5.1).
 *
 * A `worker-queue` subscription is per-workspace: on subscribe the client
 * receives a snapshot of the queue; on any queue mutation the whole queue is
 * pushed as a fresh snapshot to every subscriber of that workspace. This reuses
 * the same server-push envelope machinery as issue lists ({@link emitWorkerQueueSnapshot})
 * so Worker data and issue data flow through one unified push protocol.
 *
 * Concurrency: every mutation carries an `expected_revision`; the queue store
 * runs a revision CAS so a stale client's drag cannot clobber a newer ordering.
 * On conflict the handler replies with the current snapshot so the client
 * re-syncs and retries.
 *
 * Execution: `worker-queue-toggle` persists the `auto_advance` flag (CAS) and,
 * on turn-ON, kicks the live dispatch loop via a fire-and-forget `tick` against
 * the registered worker attachment; `worker-attempt-stop` halts one running
 * attempt. Both are inert no-ops when no attachment is registered for the
 * workspace (spec §5.1–§5.2, F1).
 *
 * Auth: these handlers only run for already-authenticated sockets — the
 * connection layer's first-frame auth gate fronts `handleMessage`, and these
 * are reached through the same post-auth dispatch switch as every other
 * mutation (no auth special-casing).
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { getConfig } from '../config.js';
import {
  checkWorkerQueueAdmission,
  discardWorkerPr,
  enrollWorkerMergeCandidates,
  kickWorkerMergeQueue,
  observeWorkerPrs,
  pauseWorkerAttempt,
  refreshWorkerExternalPrs,
  resumeWorkerAttempt,
  reviseApproveWorkerBead,
  reviseFixWorkerBead,
  stopWorkerAttempt,
  tickWorkerQueue,
  workerMergeQueueState,
  workerSlots,
  workerWorktreeExists
} from '../worker/attach.js';
import { evaluateMergeGate } from '../worker/merge-gate.js';
import { onQueueChanged } from '../worker/queue-events.js';
import {
  peekDeployResolution,
  peekVerifyResolution
} from '../worker/repo-ops.js';
import { runtimeCatalog } from '../worker/runner/index.js';
import { applyPreamble, defaultTaskPrompt } from '../worker/runner/preamble.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { readDeclaredBase } from '../worker/target-base.js';
import {
  emitSessionLogAppend,
  emitSessionLogSnapshot,
  emitWorkerQueueSnapshot,
  getConnWorkspace,
  log
} from './context.js';
import { targetWorkspaceOf } from './workspace-target.js';

/**
 * Server-wide single queue store (from the shared Worker runtime) so all
 * connections share one in-memory revision — making the CAS authoritative
 * in-process across concurrent clients — AND so `/healthz` reports the same
 * auto_advance the ws toggle mutates.
 *
 * @returns {ReturnType<typeof import('../worker/queue-store.js').createQueueStore>}
 */
function queueStore() {
  return getWorkerRuntime().queueStore;
}

/**
 * Per-workspace subscriber registry. Keyed by workspace root_dir; each value is
 * the set of `{ ws, client_id }` pairs currently subscribed to that workspace's
 * queue.
 *
 * @type {Map<string, Set<{ ws: WebSocket, client_id: string }>>}
 */
const SUBSCRIBERS = new Map();

/**
 * The connection's own workspace. Still the answer for the SUBSCRIPTION
 * handlers: a `worker-queue` / `session-log` subscription is connection-scoped
 * by design (UI-qrfo §5 「구독 채널은 건드리지 않는다」), and the monitor reads a
 * separate server-global aggregation rather than opening one per repo.
 *
 * @param {WebSocket} ws
 * @returns {string}
 */
function workspaceKeyOf(ws) {
  return getConnWorkspace(ws)?.root_dir || '';
}

/**
 * The workspace a MUTATION targets (UI-qrfo §5): the optional `payload.root_dir`
 * when the request names one, this connection's workspace otherwise.
 *
 * Replies `bad_request` and returns `null` when the named directory is not in
 * the registry allow list — path injection must not be able to reach a repo
 * nobody registered (§10).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @returns {string|null}
 */
function mutationWorkspaceOf(ws, req) {
  const key = targetWorkspaceOf(ws, req.payload);
  if (key === null) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload.root_dir must be an absolute path in the available workspace list'
        )
      )
    );
  }
  return key;
}

/**
 * @param {string} key
 * @returns {Set<{ ws: WebSocket, client_id: string }>}
 */
function subscribersFor(key) {
  let set = SUBSCRIBERS.get(key);
  if (!set) {
    set = new Set();
    SUBSCRIBERS.set(key, set);
  }
  return set;
}

/**
 * How many clients are currently subscribed to a workspace's worker queue. The
 * PR poller gates every `gh` query on this (worker-phase2 §4): nobody watching
 * ⇒ nothing to refresh ⇒ no queries.
 *
 * @param {string} workspace_key
 * @returns {number}
 */
export function workerQueueSubscriberCount(workspace_key) {
  const set = SUBSCRIBERS.get(workspace_key);
  return set ? set.size : 0;
}

/**
 * Overlay the EXTERNAL PR rows onto a queue snapshot's `pr_wait` (UI-7agi §2).
 *
 * A bead a normal session delivered a PR for is `resolved` with a
 * `metadata.pr_url` and no attempt at all, so the durable lane never held it.
 * Synthesizing the row HERE — on the wire, never in `queue.json` — is what lets
 * the existing observation/activity/title decorations and the whole client-side
 * lane render it with no second code path. A synthetic attempt in the durable
 * queue would have been the alternative, and it would have made the worker's own
 * records claim it ran something it never ran.
 *
 * A bead the worker itself put in `pr_wait` is left alone: the durable attempt
 * is the more specific record, so the overlay yields to it. A bead the durable
 * `done` lane holds is excluded for the same reason (UI-m6bg §overlay): the
 * registry is only as fresh as the last scan, and in that window a bead just
 * moved to done would otherwise be drawn in the PR-wait lane at the same time.
 *
 * Each overlay row also carries `wt_present` (UI-w0hi §3): whether the
 * delivering session's worktree is still there, which decides whether the
 * conflict-resolution click has anywhere to run. Durable rows carry nothing new
 * — their own attempt already answers it.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, unknown>}
 */
export function withExternalPrWait(workspace_key, queue) {
  /** @type {import('../worker/external-pr.js').ExternalPrRow[]} */
  let rows = [];
  try {
    rows = getWorkerRuntime().externalPrs.list(workspace_key);
  } catch {
    rows = [];
  }
  if (rows.length === 0) {
    return queue;
  }
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  const done_lane = Array.isArray(queue.done)
    ? /** @type {any[]} */ (queue.done)
    : [];
  const durable = new Set([...lane, ...done_lane].map((e) => e && e.bead_id));
  const overlay = rows
    .filter((row) => !durable.has(row.bead_id))
    .map((row) => {
      let wt_present = false;
      try {
        wt_present = workerWorktreeExists(workspace_key, row.bead_id);
      } catch {
        // Fail-quiet, like every other decoration here: an unreadable repo
        // renders a disabled button with a reason, never a guessed `true`.
        wt_present = false;
      }
      return {
        bead_id: row.bead_id,
        added_at: row.added_at,
        external: true,
        wt_present
      };
    });
  if (overlay.length === 0) {
    return queue;
  }
  return { ...queue, pr_wait: [...lane, ...overlay] };
}

/**
 * Project the PR observation cache onto the beads currently in `pr_wait`, each
 * with its evaluated merge gate (worker-phase2 §4/§5).
 *
 * A PURE READ — it queries nothing and mutates nothing. The poller is the only
 * writer; this is what puts its findings on the wire, riding the existing
 * `worker-queue-snapshot` push rather than a new message type. A bead the
 * poller has not reached yet simply has no entry, and the gate reports that as
 * "관측 대기" (disabled), never as a passing signal.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @param {'resolved'|'absent'|'invalid'} verify_cmd_state
 * @returns {Record<string, unknown>}
 */
function prObservationsFor(workspace_key, queue, verify_cmd_state) {
  /** @type {Record<string, unknown>} */
  const out = {};
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  if (lane.length === 0) {
    return out;
  }
  /** @type {Record<string, any>} */
  let observed = {};
  try {
    observed = getWorkerRuntime().prObservations.snapshot(workspace_key);
  } catch {
    observed = {};
  }
  for (const entry of lane) {
    const bead_id = entry && entry.bead_id;
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      continue;
    }
    const record = observed[bead_id] || null;
    out[bead_id] = {
      pr: record ? record.pr : null,
      ci: record ? record.ci : null,
      verify: record ? record.verify : null,
      error: record ? record.error : null,
      observed_at: record ? record.observed_at : null,
      gate: evaluateMergeGate(record, { verify_cmd_state })
    };
  }
  return out;
}

/**
 * Project what the server is DOING to each `pr_wait` bead right now
 * (UI-raqh §3/§4): the poller's collapsed activity and the merge's current
 * step. A PURE read of the shared activity cache — the poller and the PR
 * actions are the only writers — riding the existing snapshot push exactly
 * like {@link prObservationsFor}.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, unknown>}
 */
function prActivityFor(workspace_key, queue) {
  /** @type {Record<string, unknown>} */
  const out = {};
  const lane = Array.isArray(queue.pr_wait)
    ? /** @type {any[]} */ (queue.pr_wait)
    : [];
  if (lane.length === 0) {
    return out;
  }
  /** @type {Record<string, any>} */
  let active = {};
  try {
    active = getWorkerRuntime().activityStore.snapshot(workspace_key);
  } catch {
    active = {};
  }
  for (const entry of lane) {
    const bead_id = entry && entry.bead_id;
    if (typeof bead_id !== 'string' || bead_id.length === 0) {
      continue;
    }
    const record = active[bead_id];
    if (record) {
      out[bead_id] = record;
    }
  }
  return out;
}

/**
 * Runtimes whose REVISE-parking store already has its fill callback wired.
 * Same lazily-built-singleton problem the title cache has: wiring at module
 * load would bind to an instance a test later throws away.
 *
 * @type {WeakSet<object>}
 */
const REVISE_FILL_WIRED = new WeakSet();

/**
 * Project which waiting-lane beads are parked at
 * `blocked_reason=spec_review_stale:revise` (UI-hs11 §3.1), so the row can
 * offer the two disposition buttons.
 *
 * ADVISORY, and PARTIAL like {@link beadTitlesFor}: the third condition of the
 * judgment is a `bd show`, which cannot run inside this synchronous
 * decoration, so only cached observations travel and a miss is delivered by
 * the fanout the fill callback triggers. Every click re-runs the WHOLE
 * judgment server-side before acting.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, unknown>}
 */
function reviseParkedFor(workspace_key, queue) {
  /** @type {ReturnType<typeof import('../worker/revise-parked.js').createReviseParkedStore>|null} */
  let store = null;
  try {
    store = getWorkerRuntime().reviseParked;
  } catch {
    store = null;
  }
  if (!store) {
    return {};
  }
  if (!REVISE_FILL_WIRED.has(store)) {
    REVISE_FILL_WIRED.add(store);
    store.setOnFilled((workspace) => {
      try {
        fanout(workspace, queueStore().snapshot(workspace));
      } catch (err) {
        log('revise-parked fill fanout failed for %s: %o', workspace, err);
      }
    });
  }
  try {
    return store.observeFor(workspace_key, queue);
  } catch (err) {
    log('revise-parked observation failed for %s: %o', workspace_key, err);
    return {};
  }
}

/**
 * Worker runtimes whose title cache already has its fill callback wired. The
 * runtime is a lazily-built singleton that tests reset, so the wiring cannot
 * happen at module load — it would bind to an instance that is later thrown
 * away, and the refill fanout would silently stop happening.
 *
 * @type {WeakSet<object>}
 */
const TITLE_FILL_WIRED = new WeakSet();

/**
 * Titles for every bead the lanes render (UI-12k6). Ready/Blocked beads reach
 * the client through their own live subscription; `queue`/`pr_wait`/`done`
 * beads do not, so without this decoration the client has no title for them
 * and prints the bead id.
 *
 * PARTIAL BY DESIGN: only cache hits travel. The decoration is synchronous, so
 * a miss is omitted here, queued for an async `bd show`, and delivered by the
 * fanout the fill callback triggers — never by blocking this snapshot.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, string>}
 */
function beadTitlesFor(workspace_key, queue) {
  return beadDecorationFor(workspace_key, queue, 'titlesFor');
}

/**
 * The 생성·수정 시각 of every bead the lanes render (UI-d7pw §4.3). Rides the SAME
 * cache and the same `bd show` as {@link beadTitlesFor} — no extra process per
 * bead — and carries the same partiality: a cache miss is omitted here and
 * arrives on the snapshot the fill callback triggers.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, { created_at: number|string|null, updated_at: number|string|null }>}
 */
function beadTimesFor(workspace_key, queue) {
  return beadDecorationFor(workspace_key, queue, 'timesFor');
}

/**
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @param {'titlesFor'|'timesFor'} method
 * @returns {any}
 */
function beadDecorationFor(workspace_key, queue, method) {
  /** @type {ReturnType<typeof import('../worker/title-cache.js').createTitleCache>|null} */
  let cache = null;
  try {
    cache = getWorkerRuntime().titleCache;
  } catch {
    cache = null;
  }
  if (!cache) {
    return {};
  }
  if (!TITLE_FILL_WIRED.has(cache)) {
    TITLE_FILL_WIRED.add(cache);
    cache.setOnFilled((workspace) => {
      try {
        fanout(workspace, queueStore().snapshot(workspace));
      } catch (err) {
        log('title fill fanout failed for %s: %o', workspace, err);
      }
    });
  }
  /** @type {string[]} */
  const ids = [];
  for (const lane of ['queue', 'pr_wait', 'done']) {
    const entries = Array.isArray(queue[lane])
      ? /** @type {any[]} */ (queue[lane])
      : [];
    for (const entry of entries) {
      const bead_id = entry && entry.bead_id;
      if (typeof bead_id === 'string' && bead_id.length > 0) {
        ids.push(bead_id);
      }
    }
  }
  if (ids.length === 0) {
    return {};
  }
  try {
    return cache[method](workspace_key, ids);
  } catch (err) {
    log('bead %s lookup failed for %s: %o', method, workspace_key, err);
    return {};
  }
}

/**
 * The attempt fields that are recorded durably but must NOT ride the
 * worker-state push (UI-rxp3 §3): the full system + task prompts, plus the
 * disposition lane's own task prompt, which is a prompt body by the same
 * measure and has no client reader. A queue
 * snapshot carries every attempt of every lane and is pushed on every
 * transition — through this one projection, which the Monitor channel's
 * cross-workspace aggregation reuses — so shipping multi-kilobyte prompt bodies
 * per attempt would bloat the channel for a value almost no render reads. The
 * UI fetches them on demand instead (`get-attempt-prompt` / `get-bead-prompt`).
 * The scheduler's own `disposition_prompt` reader goes through the store, not
 * this projection, so dropping it here changes no server behaviour.
 *
 * @type {string[]}
 */
const PROMPT_FIELDS = ['system_prompt', 'task_prompt', 'disposition_prompt'];

/**
 * Drop {@link PROMPT_FIELDS} from one attempt. A record that carries neither is
 * returned untouched so the common case allocates nothing.
 *
 * @param {any} attempt
 * @returns {any}
 */
function stripPrompts(attempt) {
  if (!attempt || typeof attempt !== 'object') {
    return attempt;
  }
  if (!PROMPT_FIELDS.some((field) => field in attempt)) {
    return attempt;
  }
  const out = { ...attempt };
  for (const field of PROMPT_FIELDS) {
    delete out[field];
  }
  return out;
}

/**
 * Project the attempts map with the LIVE, non-persisted per-attempt values
 * folded in: the token tally (UI-raqh §1) and `last_event_at`, the time of the
 * attempt's last session-log line (UI-53es §1), which the monitor row turns
 * into its heartbeat. Both apply to RUNNING attempts only — a terminated one
 * keeps whatever was persisted onto its record. A pure read of the shared
 * stores; the scheduler and the session-log broker are the only writers.
 *
 * @param {Record<string, unknown>} queue
 * @param {string} workspace_key
 * @returns {Record<string, unknown>}
 */
export function attemptsWithUsage(queue, workspace_key) {
  const attempts = /** @type {Record<string, any>} */ (queue.attempts || {});
  /** @type {ReturnType<typeof import('../worker/usage-store.js').createUsageStore>|null} */
  let store = null;
  /** @type {ReturnType<typeof import('../worker/session-log.js').createSessionLog>|null} */
  let session_log = null;
  try {
    const runtime = getWorkerRuntime();
    store = runtime.usageStore;
    session_log = runtime.sessionLog;
  } catch {
    store = null;
    session_log = null;
  }
  /** @type {Record<string, unknown>} */
  const out = {};
  for (const [attempt_id, attempt] of Object.entries(attempts)) {
    const running = Boolean(attempt) && attempt.status === 'running';
    const live = running && store ? store.get(workspace_key, attempt_id) : null;
    const last_event_at =
      running && session_log && typeof session_log.lastEventAt === 'function'
        ? session_log.lastEventAt(workspace_key, attempt_id)
        : null;
    /** @type {any} */
    let projected = stripPrompts(attempt);
    if (live) {
      projected = { ...projected, usage: live };
    }
    if (typeof last_event_at === 'number') {
      projected = { ...projected, last_event_at };
    }
    out[attempt_id] = projected;
  }
  return out;
}

/**
 * Decorate a queue snapshot with computed, non-persisted workspace info:
 *   - the resolved verify_cmd, which comes from an explicit `[worker.verify]`
 *     config section or not at all (UI-uk6d) — read-only display, no UI edit
 *     surface (worker-autorun-policy §4/§6),
 *   - `slots` (the live concurrency cap from the attachment), so the tab can
 *     flag live sessions exceeding the cap after a manual resume
 *     (worker-phase1 §2.3, worker-phase2 §3),
 *   - the EXTERNAL PR rows overlaid onto `pr_wait` (UI-7agi §2) — beads a normal
 *     session delivered a PR for, which no attempt ever placed in the lane,
 *   - `pr_observations`: what the PR poller has SEEN for each `pr_wait` bead
 *     plus its merge-gate verdict (worker-phase2 §4/§5) — a pure cache read,
 *   - `bead_times`: 생성·수정 시각 for those same beads (UI-d7pw §4.3), on the
 *     same partiality contract as `bead_titles`.
 *   - `declared_base`: the workspace's DECLARED target base (UI-j6wa §3), read
 *     from the declaration only — never the fetching five-step resolve, which
 *     belongs to the dispatch path. Null when the declaration exists but cannot
 *     be read as one, so the chip can say `base ?` instead of claiming `main`,
 *   - `bead_titles`: display titles for the queue/pr_wait/done beads (UI-12k6),
 *     which are in no subscribed issue column and would otherwise render as
 *     bare ids,
 *   - `runner_catalog`: the resolved runner/model catalog (UI-jrb3 §7) the
 *     exec-setting selectors render from, so the client never keeps its own copy
 *     of a table `config.toml` can extend,
 *   - the configured `deploy_cmd` and the workspace's `last_deploy` record
 *     (worker-deploy-hook §3), so the ⚙ dialog can show what the merge click
 *     will run and what the last one did. Read-only on the wire: the commands
 *     are defined in `config.toml` only, which is the security boundary.
 *
 * Exported since UI-nprg: the monitor's cross-workspace aggregation builds its
 * per-workspace payload with THIS function rather than a second assembly path,
 * so both channels ship the same decorated contract.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} raw_queue
 * @returns {Record<string, unknown>}
 */
export function decorateQueue(workspace_key, raw_queue) {
  // Overlaid FIRST so every decoration below — observations, activity, titles —
  // sees the external rows without knowing they exist (UI-7agi §2).
  const queue = withExternalPrWait(workspace_key, raw_queue);
  // Both commands come off the SAME two-rung ladder the worker executes
  // (UI-kfl4), read through its synchronous projection because this decoration
  // runs on every snapshot push and cannot await a git spawn. Display only —
  // no merge, verification or deploy is decided here.
  /** @type {import('../worker/repo-ops.js').VerifyResolution} */
  let verify_resolution = { state: 'absent' };
  try {
    verify_resolution = peekVerifyResolution(
      workspace_key,
      getConfig().worker_verify
    );
  } catch {
    verify_resolution = { state: 'absent' };
  }
  const verify_cmd =
    verify_resolution.state === 'resolved' ? verify_resolution.value : null;
  /** @type {{ cmd: string[], timeout_ms: number, detached: boolean } | null} */
  let deploy_cmd = null;
  try {
    const deploy_resolution = peekDeployResolution(
      workspace_key,
      getConfig().worker_deploy
    );
    deploy_cmd =
      deploy_resolution.state === 'resolved' ? deploy_resolution.value : null;
  } catch {
    deploy_cmd = null;
  }
  // Absent on a legacy queue.json — the contract-consumer rule is fail-quiet,
  // so it travels as null and the renderer omits the row.
  const last_deploy = queue.last_deploy || null;
  /** @type {number|null} */
  let slots = null;
  try {
    slots = workerSlots(workspace_key);
  } catch {
    slots = null;
  }
  // Without a registered attachment the decoration falls back to the queue's
  // own persisted cap so the editor still renders the value it will mutate.
  if (slots === null && typeof queue.slots === 'number') {
    slots = queue.slots;
  }
  /** @type {string|null} */
  let declared_base = null;
  try {
    declared_base = readDeclaredBase(String(workspace_key || ''));
  } catch {
    declared_base = null;
  }
  // The resolved runner/model catalog (UI-jrb3 §7) — the source the exec-setting
  // selectors render their grouped model options and per-model effort lists
  // from. Non-persisted like every other decoration here, and fail-quiet: a
  // catalog that cannot be resolved travels as null and the client falls back to
  // showing the stored value alone rather than an empty selector.
  /** @type {import('../worker/runner-catalog.js').ResolvedCatalog|null} */
  let runner_catalog = null;
  try {
    runner_catalog = runtimeCatalog();
  } catch {
    runner_catalog = null;
  }
  return {
    ...queue,
    runner_catalog,
    // The workspace's declared base (UI-j6wa §3), non-persisted like every
    // other decoration here. Display only — nothing dispatches on it.
    declared_base,
    // Attempts carry the LIVE usage tally while they run (UI-raqh §1); the
    // persisted `Attempt.usage` stands on its own once they end.
    attempts: attemptsWithUsage(queue, workspace_key),
    workspace_info: { verify_cmd, deploy_cmd, last_deploy, slots },
    // Observed PR state + merge-gate verdict per `pr_wait` bead. Non-persisted
    // (worker-phase2 §4) — it exists only on the wire and in server memory.
    pr_observations: prObservationsFor(
      workspace_key,
      queue,
      verify_resolution.state
    ),
    // What is RUNNING against each `pr_wait` bead right now (UI-raqh §3/§4) —
    // observation/verification activity and merge progress. Also non-persisted.
    pr_activity: prActivityFor(workspace_key, queue),
    // Titles for the queue/pr_wait/done beads (UI-12k6) — non-persisted and
    // partial (cache hits only); the client falls back to the id without it.
    bead_titles: beadTitlesFor(workspace_key, queue),
    // 생성·수정 시각 for the same beads (UI-d7pw §4.3), from the same cache and
    // the same `bd show`. Kept as its own key rather than folded into
    // `bead_titles` so the existing title contract is untouched.
    bead_times: beadTimesFor(workspace_key, queue),
    // Which waiting beads are parked awaiting a REVISE disposition (UI-hs11
    // §3.1). Non-persisted, partial and advisory — see the projection.
    revise_parked: reviseParkedFor(workspace_key, queue),
    // The merge driver's live view (UI-5v7d §3): which queued item it is on and
    // why each skipped one failed. The ORDER and membership travel in the
    // durable `merge_queue` spread above; only this half is non-persisted, so a
    // restart shows the resumed queue with no stale failure text.
    merge_queue_state: workerMergeQueueState(workspace_key) || {
      active: null,
      failures: {}
    }
  };
}

/**
 * Observers notified whenever a workspace's snapshot is re-pushed. The monitor
 * aggregation (UI-nprg) rides this instead of `onQueueChanged` alone: the
 * asynchronous title / REVISE-parking fills re-push through {@link fanout}
 * WITHOUT emitting a queue-change event, so a monitor-only viewer would
 * otherwise stay on bare bead ids until something mutated a queue.
 *
 * @type {Set<(workspace_key: string) => void>}
 */
const SNAPSHOT_REFRESH_LISTENERS = new Set();

/**
 * Register a snapshot-refresh observer.
 *
 * @param {(workspace_key: string) => void} listener
 * @returns {() => void} Unregister.
 */
export function onWorkerSnapshotRefresh(listener) {
  SNAPSHOT_REFRESH_LISTENERS.add(listener);
  return () => SNAPSHOT_REFRESH_LISTENERS.delete(listener);
}

/**
 * Push the current queue snapshot to every subscriber of a workspace.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 */
function fanout(workspace_key, queue) {
  const decorated = decorateQueue(workspace_key, queue);
  for (const sub of subscribersFor(workspace_key)) {
    emitWorkerQueueSnapshot(sub.ws, sub.client_id, workspace_key, decorated);
  }
  for (const listener of SNAPSHOT_REFRESH_LISTENERS) {
    try {
      listener(workspace_key);
    } catch (err) {
      log('snapshot refresh listener failed for %s: %o', workspace_key, err);
    }
  }
}

// Autonomous scheduler transitions (dispatch, admission refusal, done/fail)
// emit queue-events; fan the fresh snapshot out so clients see them without
// waiting for their next own mutation (worker-autorun-policy §6).
onQueueChanged((workspace) => {
  try {
    fanout(workspace, queueStore().snapshot(workspace));
  } catch (err) {
    log('queue-changed fanout failed for %s: %o', workspace, err);
  }
});

/**
 * Detach a connection from the worker-queue subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachWorkerQueue(ws) {
  for (const set of SUBSCRIBERS.values()) {
    for (const sub of set) {
      if (sub.ws === ws) {
        set.delete(sub);
      }
    }
  }
  detachSessionLog(ws);
}

/**
 * Live session-log (transcript) subscriptions (spec §5.6). Each entry pushes
 * snapshot-then-appends for one attempt to one client id. `off` unsubscribes
 * the per-entry runtime session-log listener.
 *
 * @type {Set<{ ws: WebSocket, client_id: string, attempt_id: string, off: () => void }>}
 */
const SESSION_LOG_SUBS = new Set();

/**
 * Remove and unsubscribe every session-log subscription for a connection.
 *
 * @param {WebSocket} ws
 */
export function detachSessionLog(ws) {
  for (const sub of SESSION_LOG_SUBS) {
    if (sub.ws === ws) {
      try {
        sub.off();
      } catch {
        /* ignore */
      }
      SESSION_LOG_SUBS.delete(sub);
    }
  }
}

/**
 * Handle `subscribe-session-log`. Payload: `{ id: client_id, attempt_id }`.
 *
 * Emits a SNAPSHOT of the persisted raw stream, then registers a live-append
 * listener on the shared runtime session-log. A Done/Failed attempt simply
 * never fires an append (the session is over), so the same path yields
 * snapshot-only for historical logs and live-follow for a running attempt.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeSessionLog(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const client_id = typeof p.id === 'string' ? p.id : '';
  const attempt_id = typeof p.attempt_id === 'string' ? p.attempt_id : '';
  if (client_id.length === 0 || attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { id: string, attempt_id: string }'
        )
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const runtime = getWorkerRuntime();

  // Drop any prior subscription for the same (ws, client_id) so re-open is idempotent.
  for (const sub of SESSION_LOG_SUBS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      try {
        sub.off();
      } catch {
        /* ignore */
      }
      SESSION_LOG_SUBS.delete(sub);
    }
  }

  ws.send(JSON.stringify(makeOk(req, { id: client_id, attempt_id })));

  const lines = runtime.sessionLog.read(key, attempt_id);
  emitSessionLogSnapshot(
    ws,
    client_id,
    attempt_id,
    lines,
    runtime.sessionLog.lastEventAtOf(key, attempt_id)
  );

  const off = runtime.sessionLog.subscribe((a) => {
    if (a.workspace === key && a.attempt_id === attempt_id) {
      emitSessionLogAppend(ws, client_id, attempt_id, a.event);
    }
  });
  SESSION_LOG_SUBS.add({ ws, client_id, attempt_id, off });
  log('subscribe-session-log %s attempt=%s ws=%s', client_id, attempt_id, key);
}

/**
 * Handle `unsubscribe-session-log`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeSessionLog(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  let removed = false;
  for (const sub of SESSION_LOG_SUBS) {
    if (sub.ws === ws && sub.client_id === client_id) {
      try {
        sub.off();
      } catch {
        /* ignore */
      }
      SESSION_LOG_SUBS.delete(sub);
      removed = true;
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * The base placeholder the system-prompt preview is assembled with. The preview
 * is workspace-independent on purpose — it shows the CONTRACT, and pinning a
 * real branch name into it would make the same text read differently per
 * workspace for no gain.
 *
 * @type {string}
 */
const PREVIEW_TARGET_BASE = '<target_base>';

/**
 * One attempt's recorded send, or the missing shape. A record written before
 * UI-rxp3 carries neither field, which is a fact about the record rather than
 * an error — the reader shows "기록 없음" (fail-quiet contract consumption).
 *
 * @param {any} attempt
 * @returns {{ attempt_id: string, system_prompt: string|null, task_prompt: string|null, recorded_at: number|null }|{ missing: true }}
 */
function promptRecordOf(attempt) {
  if (!attempt || typeof attempt !== 'object') {
    return { missing: true };
  }
  const system_prompt =
    typeof attempt.system_prompt === 'string' ? attempt.system_prompt : null;
  const task_prompt =
    typeof attempt.task_prompt === 'string' ? attempt.task_prompt : null;
  if (system_prompt === null && task_prompt === null) {
    return { missing: true };
  }
  return {
    attempt_id: String(attempt.attempt_id || ''),
    system_prompt,
    task_prompt,
    recorded_at:
      typeof attempt.started_at === 'number' ? attempt.started_at : null
  };
}

/**
 * Handle `get-attempt-prompt`. Payload: `{ attempt_id }`.
 *
 * Workspace scope follows `subscribe-session-log`: the connection's own
 * verified workspace, and nothing else. An attempt of another workspace is
 * simply not found here — the reader switches workspace to see it, exactly as
 * for its transcript.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleGetAttemptPrompt(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const attempt_id = typeof p.attempt_id === 'string' ? p.attempt_id : '';
  if (attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { attempt_id: string }')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const attempt = queueStore().snapshot(key).attempts[attempt_id];
  ws.send(JSON.stringify(makeOk(req, promptRecordOf(attempt))));
}

/**
 * Handle `get-bead-prompt`. Payload: `{ bead_id }`.
 *
 * Keyed by BEAD rather than attempt (UI-rxp3 §5): the issue detail panel knows
 * which bead it is showing and nothing about attempts, so resolving the newest
 * recorded attempt is the server's job. A bead with no recorded attempt gets
 * the missing shape plus the default task prompt the next dispatch WOULD send,
 * so the panel can preview it without holding a copy of the text.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleGetBeadPrompt(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const bead_id = typeof p.bead_id === 'string' ? p.bead_id : '';
  if (bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const attempts = Object.values(queueStore().snapshot(key).attempts).filter(
    (/** @type {any} */ a) => a && a.bead_id === bead_id
  );
  // Newest first by start time; an attempt that never started (a refusal
  // recorded before the spawn) sorts last and carries no prompt anyway.
  attempts.sort(
    (/** @type {any} */ a, /** @type {any} */ b) =>
      (typeof b.started_at === 'number' ? b.started_at : 0) -
      (typeof a.started_at === 'number' ? a.started_at : 0)
  );
  for (const attempt of attempts) {
    const record = promptRecordOf(attempt);
    if (!(/** @type {any} */ (record).missing)) {
      ws.send(JSON.stringify(makeOk(req, record)));
      return;
    }
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        missing: true,
        default_task_prompt: defaultTaskPrompt(bead_id)
      })
    )
  );
}

/**
 * Handle `get-worker-system-prompt`. Payload: `{}`.
 *
 * Assembles the contract through `preamble.js` — the single owner of the text —
 * rather than shipping a client-side copy that would drift the first time the
 * contract changes. The default variant is the one the scheduler actually
 * dispatches with (`fast_track: true`, PR-submitting), because that is what
 * every queued bead gets; the conditional variants ride along with the
 * condition that selects them.
 *
 * The reply is a constant of the contract, not of the request: there is no
 * payload field to read, so there is none to validate either.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleGetWorkerSystemPrompt(ws, req) {
  const dispatch = applyPreamble('', {
    fast_track: true,
    target_base: PREVIEW_TARGET_BASE
  });
  const disposition = applyPreamble('', {
    fast_track: true,
    pr_submit: false
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        target_base_placeholder: PREVIEW_TARGET_BASE,
        system_prompt: dispatch.system_prompt,
        variants: [
          {
            key: 'dispatch',
            label: '워커 디스패치 (기본)',
            condition:
              'fast_track · PR 제출 · target_base 해석됨 — 큐 디스패치·재개·충돌 해결',
            system_prompt: dispatch.system_prompt
          },
          {
            key: 'disposition',
            label: 'REVISE 처분 세션',
            condition:
              'disposition — PR 미제출, base push·hook 판정 면제 (가드 계약 처분 변형)',
            system_prompt: disposition.system_prompt
          }
        ]
      })
    )
  );
}

/**
 * Test-only: clear subscribers and the queue store's in-memory cache.
 */
export function __resetWorkerQueueForTest() {
  SUBSCRIBERS.clear();
  for (const sub of SESSION_LOG_SUBS) {
    try {
      sub.off();
    } catch {
      /* ignore */
    }
  }
  SESSION_LOG_SUBS.clear();
  queueStore().__clearCacheForTest();
  // The PR observation cache is server memory too — a leftover observation
  // would decorate the next test's snapshot (worker-phase2 §4).
  getWorkerRuntime().prObservations.clear();
  // Same for cached bead titles (UI-12k6).
  getWorkerRuntime().titleCache.clear();
  // ...and for cached REVISE-parking observations (UI-hs11).
  getWorkerRuntime().reviseParked.clear();
}

/**
 * Handle `subscribe-worker-queue`. Payload: `{ id: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeWorkerQueue(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  if (typeof client_id !== 'string' || client_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload.id must be a non-empty string')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  subscribersFor(key).add({ ws, client_id });
  log('subscribe-worker-queue %s ws=%s', client_id, key);
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitWorkerQueueSnapshot(
    ws,
    client_id,
    key,
    decorateQueue(key, queueStore().snapshot(key))
  );
  // The snapshot above is sent SYNCHRONOUSLY with whatever the registry already
  // holds; the scan is the "on subscribe" refresh trigger (UI-7agi §1) and its
  // result reaches the client through the ordinary fanout. Deliberately not
  // awaited — a slow `bd list` must not delay the first paint.
  void refreshWorkerExternalPrs(key)
    .then((scanned) => {
      if (scanned) {
        fanout(key, queueStore().snapshot(key));
      }
    })
    .catch((err) => {
      log('external PR refresh failed for %s: %o', key, err);
    });
}

/**
 * Handle `unsubscribe-worker-queue`. Payload: `{ id: client_id }`.
 *
 * Sweeps the WHOLE registry the way {@link detachWorkerQueue} does, not just the
 * connection's current workspace bucket: the client unsubscribes AFTER
 * `set-workspace` has already repointed the connection, so the entry to remove
 * lives under the PREVIOUS workspace key.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeWorkerQueue(ws, req) {
  const client_id = /** @type {any} */ (req.payload)?.id;
  let removed = false;
  for (const set of SUBSCRIBERS.values()) {
    for (const sub of set) {
      if (sub.ws === ws && sub.client_id === client_id) {
        set.delete(sub);
        removed = true;
      }
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * Reply with the mutation result and fan out a fresh snapshot on success.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {string} workspace_key
 * @param {import('../worker/queue-store.js').QueueOpResult} result
 */
function replyMutation(ws, req, workspace_key, result) {
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: result.ok,
        conflict: result.conflict,
        queue: decorateQueue(workspace_key, /** @type {any} */ (result.queue))
      })
    )
  );
  if (result.ok) {
    fanout(workspace_key, /** @type {any} */ (result.queue));
  }
}

/**
 * @param {any} payload
 * @returns {number}
 */
function revisionOf(payload) {
  const rev = payload?.expected_revision;
  return typeof rev === 'number' && Number.isFinite(rev) ? rev : -1;
}

/**
 * Handle `worker-queue-place`. Payload: `{ bead_id, index?, expected_revision }`.
 *
 * There is ONE waiting lane now (worker-phase2 §3), so the payload carries no
 * `lane`; a stale client that still sends one is simply placed in `queue`.
 *
 * Queue entry is admission-gated (worker-autorun-policy §1): a live attachment
 * applies the full validator, while an inactive workspace still performs an
 * authoritative worker-ineligible label read. A refusal replies
 * `{ applied:false, admission_reason }` without mutating the queue.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerQueuePlace(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {import('../worker/admission.js').AdmissionResult | null} */
  let admission = null;
  try {
    admission = await checkWorkerQueueAdmission(key, p.bead_id);
  } catch (err) {
    log('admission check failed for %s/%s: %o', key, p.bead_id, err);
    admission = { ok: false, reason: 'git_error' };
  }
  if (admission && !admission.ok) {
    const reason = admission.reason || 'git_error';
    // Persist the refusal so the candidate badge renders it for EVERY client
    // (the reply-only admission_reason was droppable — implementation review
    // 2026-07-22 finding 4).
    try {
      queueStore().recordAdmission(key, { bead_id: p.bead_id, reason });
    } catch (err) {
      log('admission record failed for %s/%s: %o', key, p.bead_id, err);
    }
    const snap = queueStore().snapshot(key);
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          conflict: false,
          admission_reason: reason,
          queue: decorateQueue(key, snap)
        })
      )
    );
    fanout(key, snap);
    return;
  }
  let result = queueStore().place(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id,
    index: typeof p.index === 'number' ? p.index : undefined
  });
  if (result.ok) {
    // A successful (admission-passed) placement clears any prior refusal —
    // unless the pass itself observed a stale receipt (UI-dlim §3.2), in which
    // case the placement REPLACES the refusal with the non-blocking stale mark
    // so the queued row announces the in-session re-review from the moment it
    // enters the lane.
    const applied =
      admission && admission.stale
        ? queueStore().recordAdmission(key, {
            bead_id: p.bead_id,
            reason: 'spec_review_stale',
            stale: true
          })
        : queueStore().clearAdmission(key, p.bead_id);
    if (applied.ok) {
      result = { ...result, queue: applied.queue };
    }
  }
  replyMutation(ws, req, key, result);
  if (result.ok) {
    // A placement is the OTHER thing that can fill a free slot, and it is the
    // only dispatch path a discarded bead has (discard spec §1): without this
    // kick an auto_advance-ON queue would sit idle until the next attempt
    // finished. Same fire-and-forget pattern as the toggle-ON tick.
    Promise.resolve(tickWorkerQueue(key)).catch((err) => {
      log('worker tick after place failed for %s: %o', key, err);
    });
  }
}

/**
 * Handle `worker-queue-reorder`. Payload:
 * `{ bead_id, to_index, expected_revision }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueReorder(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || typeof p.to_index !== 'number') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id, to_index }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().reorder(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id,
    to_index: p.to_index
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-queue-toggle`. Payload: `{ on: boolean, expected_revision }`.
 * Persists the `auto_advance` flag (CAS) and, on a successful turn-ON, kicks the
 * live dispatch loop with a fire-and-forget `tick` (error-captured). The tick is
 * a no-op unless a worker attachment is registered for this workspace, so ws
 * tests without a live attachment stay hermetic (spec §5.1, F1).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueToggle(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.on !== 'boolean') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { on: boolean }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().toggleAutoAdvance(key, {
    expected_revision: revisionOf(p),
    on: p.on
  });
  replyMutation(ws, req, key, result);
  if (result.ok && p.on === true) {
    Promise.resolve(tickWorkerQueue(key)).catch((err) => {
      log('worker tick after toggle failed for %s: %o', key, err);
    });
  }
}

/**
 * Handle `worker-queue-set-slots`. Payload: `{ slots: number, expected_revision }`.
 * Persists the workspace concurrency cap (CAS, worker-phase2 §3) — the value the
 * scheduler's single scan fills up to. Bound + integer validation lives in the
 * queue store's `setSlots`, which REJECTS an unusable value (`applied:false`)
 * rather than clamping it, so the stored cap is never silently rewritten.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueSetSlots(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.slots !== 'number') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { slots: number }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().setSlots(key, {
    expected_revision: revisionOf(p),
    slots: p.slots
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle the merge-serial `worker-queue-set-pr-wait-hold` toggle.
 * Payload: `{ on: boolean, expected_revision }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueSetPrWaitHold(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.on !== 'boolean') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { on: boolean }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().setPrWaitHoldsSlot(key, {
    expected_revision: revisionOf(p),
    on: p.on
  });
  replyMutation(ws, req, key, result);
  if (result.ok) {
    Promise.resolve(tickWorkerQueue(key)).catch((err) => {
      log('worker tick after pr_wait hold toggle failed for %s: %o', key, err);
    });
  }
}

/**
 * Set or unset the workspace's global preset reference. Both the queue and
 * preset revision must match the client snapshot; a stale pair returns both
 * authoritative snapshots and never retries on the server.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueSetDefaultExecPreset(ws, req) {
  const payload = /** @type {any} */ (req.payload || {});
  const workspace_key = mutationWorkspaceOf(ws, req);
  if (workspace_key === null) {
    return;
  }
  const result = getWorkerRuntime().execPresetCoordinator.setDefaultExecPreset(
    workspace_key,
    {
      preset_id: payload.preset_id ?? null,
      expected_queue_revision: payload.expected_queue_revision,
      expected_preset_revision: payload.expected_preset_revision
    }
  );
  ws.send(JSON.stringify(makeOk(req, result)));
  if (result.applied) {
    fanout(workspace_key, /** @type {any} */ (result.queue));
  }
}

/**
 * Handle `worker-attempt-pause`. Payload: `{ attempt_id: string }`. Pauses (⏸)
 * a running attempt: group-kill + attempt `paused` + workflow_mode/exec revert,
 * bead stays queued, and the freed slot advances the queue
 * (worker-phase1 §2.1). Refusals carry a `reason` (`not_running` /
 * `no_session_id` / `no_attachment`).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerAttemptPause(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.attempt_id !== 'string' || p.attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { attempt_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  /** @type {{ ok: boolean, reason?: string }} */
  let result = { ok: false, reason: 'no_attachment' };
  try {
    result = await pauseWorkerAttempt(key, p.attempt_id);
  } catch (err) {
    log('worker-attempt-pause failed for %s/%s: %o', key, p.attempt_id, err);
    result = { ok: false, reason: 'error' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        attempt_id: p.attempt_id,
        paused: !!result.ok,
        reason: result.ok ? null : result.reason || null
      })
    )
  );
  if (result.ok) {
    fanout(key, /** @type {any} */ (queueStore().snapshot(key)));
  }
}

/**
 * Handle `worker-attempt-stop`. Payload: `{ attempt_id: string }`. Discards (■)
 * an attempt: group-kill + attempt `stopped` + workflow_mode revert, and the
 * bead leaves every lane in the same store mutation so the following tick
 * cannot re-dispatch it (worker-phase1 §2.2). Also accepts a leaf `paused`
 * attempt. Inert (`stopped:false`) when no live attachment or no such attempt.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerAttemptStop(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.attempt_id !== 'string' || p.attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { attempt_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  let stopped = false;
  try {
    stopped = await stopWorkerAttempt(key, p.attempt_id);
  } catch (err) {
    log('worker-attempt-stop failed for %s/%s: %o', key, p.attempt_id, err);
  }
  ws.send(JSON.stringify(makeOk(req, { attempt_id: p.attempt_id, stopped })));
  if (stopped) {
    // Push a fresh snapshot so the tile clears from the running grid.
    fanout(key, /** @type {any} */ (queueStore().snapshot(key)));
  }
}

/**
 * Handle `worker-attempt-resume`. Payload: `{ attempt_id, expected_revision }`.
 * Manually resumes (↻ / paused tile ▶) a paused, failed, or orphaned attempt in
 * its existing worktree (spec §1) under the SAME CAS revision contract as the
 * queue mutations: a stale `expected_revision` replies `conflict:true` with the
 * authoritative queue and does NOT resume — the client retries once against the
 * fresh revision. On refusal the reply carries the admission-badge `reason` (one
 * of the five §1.2 causes) with `resumed:false`; on success it carries the new
 * attempt id and fans a fresh snapshot. Inert (`resumed:false`) when no live
 * attachment is registered.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerAttemptResume(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.attempt_id !== 'string' || p.attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { attempt_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const current = /** @type {any} */ (queueStore().snapshot(key));
  if (revisionOf(p) !== current.revision) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          attempt_id: p.attempt_id,
          resumed: false,
          conflict: true,
          new_attempt_id: null,
          reason: null,
          queue: decorateQueue(key, current)
        })
      )
    );
    return;
  }
  /** @type {{ ok: boolean, reason?: string, attempt_id?: string }} */
  let result = { ok: false, reason: 'no_attachment' };
  try {
    result = await resumeWorkerAttempt(key, p.attempt_id);
  } catch (err) {
    log('worker-attempt-resume failed for %s/%s: %o', key, p.attempt_id, err);
    result = { ok: false, reason: 'error' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        attempt_id: p.attempt_id,
        resumed: !!result.ok,
        conflict: false,
        new_attempt_id: result.attempt_id || null,
        reason: result.ok ? null : result.reason || null
      })
    )
  );
  if (result.ok) {
    // Push a fresh snapshot so the new running tile appears immediately.
    fanout(key, /** @type {any} */ (queueStore().snapshot(key)));
  }
}

/**
 * Handle `worker-attempt-dismiss`. Payload: `{ attempt_id, expected_revision }`.
 *
 * The failure banner's ✕ — a pure store edit (no scheduler, no session): it
 * stamps `dismissed_at` on a `failed`/`orphaned` attempt so the UI stops
 * counting that failure as unhandled. CAS-guarded like the queue mutations; a
 * non-conflict rejection carries the store's `reason` (`attempt_not_found` /
 * `not_dismissable` / `already_dismissed`).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerAttemptDismiss(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.attempt_id !== 'string' || p.attempt_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { attempt_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().dismissAttempt(key, {
    attempt_id: p.attempt_id,
    expected_revision: revisionOf(p)
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        attempt_id: p.attempt_id,
        dismissed: result.ok,
        conflict: result.conflict,
        reason: result.reason || null,
        queue: decorateQueue(key, /** @type {any} */ (result.queue))
      })
    )
  );
  if (result.ok) {
    // Push a fresh snapshot so the banner clears on every client at once.
    fanout(key, /** @type {any} */ (result.queue));
  }
}

/**
 * Reply to a merge-queue mutation and, on success, start the driver.
 *
 * The kick is fire-and-forget and its promise settles only when the WHOLE queue
 * drains, so awaiting it here would hold the reply for every merge in line. The
 * driver fans its own progress out through queue-changed.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {string} workspace_key
 * @param {import('../worker/queue-store.js').QueueOpResult} result
 * @param {Record<string, unknown>} [extra] - Extra reply fields (queued count).
 */
function replyMergeQueue(ws, req, workspace_key, result, extra = {}) {
  ws.send(
    JSON.stringify(
      makeOk(req, {
        ...extra,
        applied: result.ok,
        conflict: result.conflict,
        queue: decorateQueue(workspace_key, /** @type {any} */ (result.queue))
      })
    )
  );
  if (!result.ok) {
    return;
  }
  fanout(workspace_key, /** @type {any} */ (result.queue));
  Promise.resolve(kickWorkerMergeQueue(workspace_key)).catch((err) => {
    log('merge queue kick failed for %s: %o', workspace_key, err);
  });
}

/**
 * Handle `worker-merge-queue-add`. Payload: `{ bead_id, expected_revision }`.
 *
 * The [머지] click, which no longer merges (UI-5v7d §3): it puts the bead in the
 * sequential queue and the driver merges when its turn comes. Everything the old
 * direct click derived server-side — the re-gate, the BEHIND update, the DIRTY
 * arm — still happens, just inside the driver's `merge()` call, so the badges in
 * the clicked snapshot stay advisory exactly as before.
 *
 * Same CAS discipline as every other mutation: a stale revision replies
 * `conflict:true` without queuing, because that snapshot may predate the
 * transition that moved this very bead out of the lane.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerMergeQueueAdd(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || p.bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  // An EXTERNAL row is a wire-only synthesis (UI-7agi §2), so the store cannot
  // check its lane membership — the overlay that created it vouches for it here.
  const overlaid = withExternalPrWait(
    key,
    /** @type {any} */ (queueStore().snapshot(key))
  );
  const lane = Array.isArray(overlaid.pr_wait)
    ? /** @type {any[]} */ (overlaid.pr_wait)
    : [];
  const row = lane.find((e) => e && e.bead_id === p.bead_id) || null;
  const before = Array.isArray(overlaid.merge_queue)
    ? /** @type {any[]} */ (overlaid.merge_queue).length
    : 0;
  const result = queueStore().enqueueMerge(key, {
    expected_revision: revisionOf(p),
    entries: [{ bead_id: p.bead_id, external: !!row && row.external === true }]
  });
  // The write also APPLIES when it only dropped an auto-merge exclusion for an
  // already-queued row (UI-yk55 §3.2), so the count comes from the queue itself
  // rather than from `ok` — a click that queued nothing must not report a place
  // in line it did not take.
  const after =
    result.ok && Array.isArray(result.queue.merge_queue)
      ? result.queue.merge_queue.length
      : before;
  replyMergeQueue(ws, req, key, result, {
    bead_id: p.bead_id,
    queued: Math.max(0, after - before)
  });
}

/**
 * Handle `worker-merge-queue-add-all`. Payload: `{ expected_revision }`.
 *
 * Bulk enrolment (UI-5v7d §3, shared with the auto enroller by UI-yk55 §4.2):
 * queue every currently mergeable `pr_wait` row in lane order, in ONE write — a
 * write per row would make every row after the first fail its own revision
 * check.
 *
 * The eligibility judgment is the server's own, not a client-supplied list: a
 * list would let a stale tab queue rows whose gate has since closed, and the
 * queue's whole value is that its members are the ones worth merging right now.
 * It runs through the SAME shared step the automatic enroller uses, so the two
 * callers cannot drift into two different notions of "mergeable" — which
 * includes the auto-merge exclusion filter.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerMergeQueueAddAll(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = enrollWorkerMergeCandidates(key, {
    expected_revision: revisionOf(p)
  });
  const queue = /** @type {any} */ (result.queue || queueStore().snapshot(key));
  if (!result.applied) {
    // Nothing enrolled: a stale revision (conflict), or no eligible row at all.
    // The enroller already fanned out and kicked when it DID apply, so only this
    // arm has to answer by itself.
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          conflict: result.conflict,
          queued: 0,
          queue: decorateQueue(key, queue)
        })
      )
    );
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: true,
        conflict: false,
        queued: result.queued,
        queue: decorateQueue(key, queue)
      })
    )
  );
}

/**
 * Handle `worker-merge-auto-toggle`. Payload: `{ on: boolean, expected_revision }`.
 *
 * The PR 대기 lane's durable auto-merge switch (UI-yk55 §5). Symmetric with
 * `worker-queue-toggle` down to the CAS, and deliberately NOT the same switch:
 * starting a session is reversible, landing a merge is not, so one control must
 * never turn both on.
 *
 * Turning it ON does three things in order — persist, observe once, enroll once
 * — because the enrolment judges against the observation cache, and after a
 * restart (or on a workspace nobody has been watching) that cache is empty, so
 * enrolling first would find every candidate `unobserved` and queue nothing.
 *
 * Turning it OFF also empties the WAITING queue (§5.2): leaving the queue full
 * while the switch says off is not a stop, and the next observation would refill
 * it anyway. The item being merged runs to completion — it already reached
 * GitHub.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerMergeAutoToggle(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.on !== 'boolean') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { on: boolean }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const state = p.on === false ? workerMergeQueueState(key) : null;
  const result = queueStore().toggleAutoMerge(key, {
    expected_revision: revisionOf(p),
    on: p.on,
    // OFF flips the flag and empties the waiting queue in ONE write: a restart
    // between two writes would leave "stopped" with a full queue for the
    // boot-resume driver to merge (§5.2).
    clear_waiting: p.on === false,
    keep: state ? state.active : null
  });
  if (!result.ok) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: false,
          conflict: result.conflict,
          queued: 0,
          queue: decorateQueue(key, /** @type {any} */ (result.queue))
        })
      )
    );
    return;
  }
  if (p.on === false) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          applied: true,
          conflict: false,
          queued: 0,
          queue: decorateQueue(key, /** @type {any} */ (result.queue))
        })
      )
    );
    fanout(key, /** @type {any} */ (result.queue));
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        applied: true,
        conflict: false,
        queued: 0,
        queue: decorateQueue(key, /** @type {any} */ (result.queue))
      })
    )
  );
  fanout(key, /** @type {any} */ (result.queue));
  // Fire-and-forget: the observation is a `gh` round-trip per open PR, and the
  // reply above already carries the persisted flag.
  Promise.resolve(observeWorkerPrs(key))
    .catch((err) => {
      log('auto-merge toggle observation failed for %s: %o', key, err);
    })
    .then(() => {
      // The observation is a `gh` round-trip, and the user can turn the mode
      // back OFF while it is in flight. Enrolling on the strength of the flag
      // this request SAW would merge after a stop click — so the flag is read
      // again, now.
      if (queueStore().snapshot(key).auto_merge !== true) {
        return;
      }
      enrollWorkerMergeCandidates(key);
    })
    .catch((err) => {
      log('auto-merge toggle enrolment failed for %s: %o', key, err);
    });
}

/**
 * Handle `worker-merge-queue-remove`. Payload:
 * `{ bead_id, expected_revision }`, or `{ all: true, expected_revision }`.
 *
 * [취소] on a WAITING item, and — with `all` — the lane header's
 * [일괄 머지 중단]. The bulk form is ONE server-side write on purpose: removing
 * item by item lets the active one finish between requests, which promotes the
 * next waiter to active and makes its own removal refuse, leaving an item
 * queued after a click that said "stop everything".
 *
 * The ACTIVE item is never removable: its merge is already running against
 * GitHub, and dropping the record would only hide it (UI-5v7d §3).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerMergeQueueRemove(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  const bulk = p.all === true;
  if (!bulk && (typeof p.bead_id !== 'string' || p.bead_id.length === 0)) {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { bead_id: string } or { all: true }'
        )
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const state = workerMergeQueueState(key);
  if (bulk) {
    const result = queueStore().cancelMerge(key, {
      expected_revision: revisionOf(p),
      all: true,
      keep: state ? state.active : null
    });
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: null,
          applied: result.ok,
          conflict: result.conflict,
          reason: null,
          queue: decorateQueue(key, /** @type {any} */ (result.queue))
        })
      )
    );
    if (result.ok) {
      fanout(key, /** @type {any} */ (result.queue));
    }
    return;
  }
  if (state && state.active === p.bead_id) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: p.bead_id,
          applied: false,
          conflict: false,
          reason: 'merge_active',
          queue: decorateQueue(
            key,
            /** @type {any} */ (queueStore().snapshot(key))
          )
        })
      )
    );
    return;
  }
  const result = queueStore().cancelMerge(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id
  });
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        applied: result.ok,
        conflict: result.conflict,
        reason: null,
        queue: decorateQueue(key, /** @type {any} */ (result.queue))
      })
    )
  );
  if (result.ok) {
    fanout(key, /** @type {any} */ (result.queue));
  }
}

/**
 * Handle `worker-pr-discard`. Payload: `{ bead_id, expected_revision }`.
 *
 * [폐기] (discard spec §1): close the PR, put bd back to `open` without a
 * `pr_url`, discard the worktree/branch, and REMOVE the bead from `pr_wait` — it
 * is not re-queued, so re-running it is the deliberate 후보 → 대기 drag.
 * DESTRUCTIVE — the CAS guard matters more here than anywhere else, so a stale
 * revision refuses without touching a thing.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerPrDiscard(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || p.bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const current = /** @type {any} */ (queueStore().snapshot(key));
  if (revisionOf(p) !== current.revision) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: p.bead_id,
          discarded: false,
          conflict: true,
          reason: null,
          queue: decorateQueue(key, current)
        })
      )
    );
    return;
  }
  /** @type {{ ok: boolean, reason?: string|null }} */
  let result = { ok: false, reason: 'no_attachment' };
  try {
    result = await discardWorkerPr(key, p.bead_id);
  } catch (err) {
    log('worker-pr-discard failed for %s/%s: %o', key, p.bead_id, err);
    result = { ok: false, reason: 'error' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        discarded: !!result.ok,
        conflict: false,
        reason: result.ok ? null : result.reason || null
      })
    )
  );
  if (result.ok) {
    fanout(key, /** @type {any} */ (queueStore().snapshot(key)));
  }
}

/**
 * Shared body of the two REVISE-disposition clicks (UI-hs11 §3.2). Both follow
 * the merge click's discipline exactly: validate the payload, refuse a stale
 * CAS revision WITHOUT acting (the snapshot the user clicked from may predate
 * the transition that unparked this very bead), run the action, collapse any
 * throw into `reason:'error'`, and fan out regardless of the outcome — a
 * refusal still re-observed bd, so the badge may have moved either way.
 *
 * The parked badge in that snapshot is advisory: the action itself re-runs the
 * whole parking judgment server-side before it touches anything.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {(workspace_key: string, bead_id: string) => Promise<{ ok: boolean, reason?: string, attempt_id?: string, sha?: string }>} run
 */
async function handleReviseDisposition(ws, req, run) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || p.bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const current = /** @type {any} */ (queueStore().snapshot(key));
  if (revisionOf(p) !== current.revision) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: p.bead_id,
          ok: false,
          conflict: true,
          reason: null,
          attempt_id: null,
          queue: decorateQueue(key, current)
        })
      )
    );
    return;
  }
  /** @type {{ ok: boolean, reason?: string, attempt_id?: string, sha?: string }} */
  let result = { ok: false, reason: 'no_attachment' };
  try {
    result = await run(key, p.bead_id);
  } catch (err) {
    log('revise disposition failed for %s/%s: %o', key, p.bead_id, err);
    result = { ok: false, reason: 'error' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        ok: !!result.ok,
        conflict: false,
        reason: result.ok ? null : result.reason || null,
        attempt_id: result.attempt_id || null,
        sha: result.sha || null
      })
    )
  );
  fanout(key, /** @type {any} */ (queueStore().snapshot(key)));
}

/**
 * Handle `worker-revise-fix`. Payload: `{ bead_id, expected_revision }`.
 *
 * [finding 수용·수정] (UI-hs11 §3.3): dispatch the disposition session that
 * applies the parked findings to the spec, publishes on the resolved
 * `target_base` checkout, refreshes the receipt and unblocks the bead. The
 * click IS explicit user approval for that spec edit — the authority semantics
 * belong to the workflow contract, this handler only carries the trigger.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerReviseFix(ws, req) {
  await handleReviseDisposition(ws, req, reviseFixWorkerBead);
}

/**
 * Handle `worker-revise-approve`. Payload: `{ bead_id, expected_revision }`.
 *
 * [승인하고 진행] (UI-hs11 §3.4): no session at all — the server refreshes the
 * receipt to `skipped@<target_base tip>` with the notes lineage and the unblock
 * in one bd write, read back.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerReviseApprove(ws, req) {
  await handleReviseDisposition(ws, req, reviseApproveWorkerBead);
}

/**
 * Handle `worker-queue-remove`. Payload: `{ bead_id, expected_revision }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueRemove(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string') {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = mutationWorkspaceOf(ws, req);
  if (key === null) {
    return;
  }
  const result = queueStore().remove(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id
  });
  replyMutation(ws, req, key, result);
}
