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
  mergeWorkerPr,
  pauseWorkerAttempt,
  resumeWorkerAttempt,
  stopWorkerAttempt,
  tickWorkerQueue,
  workerSlots
} from '../worker/attach.js';
import { evaluateMergeGate } from '../worker/merge-gate.js';
import { onQueueChanged } from '../worker/queue-events.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { resolveVerifyCmd } from '../worker/verify-cmd.js';
import {
  emitSessionLogAppend,
  emitSessionLogSnapshot,
  emitWorkerQueueSnapshot,
  getConnWorkspace,
  log
} from './context.js';

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
 * @param {WebSocket} ws
 * @returns {string}
 */
function workspaceKeyOf(ws) {
  return getConnWorkspace(ws)?.root_dir || '';
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
 * @param {boolean} verify_cmd_present
 * @returns {Record<string, unknown>}
 */
function prObservationsFor(workspace_key, queue, verify_cmd_present) {
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
      gate: evaluateMergeGate(record, { verify_cmd_present })
    };
  }
  return out;
}

/**
 * Decorate a queue snapshot with computed, non-persisted workspace info:
 *   - the resolved verify_cmd (explicit config > auto-detection > none) with its
 *     `source`, so the ctrl bar can flag a detected command (read-only display —
 *     no UI edit surface; worker-autorun-policy §4/§6, worker-attempt-resume-
 *     verify-autodetect §2),
 *   - `slots` (the live concurrency cap from the attachment), so the tab can
 *     flag live sessions exceeding the cap after a manual resume
 *     (worker-phase1 §2.3, worker-phase2 §3),
 *   - `pr_observations`: what the PR poller has SEEN for each `pr_wait` bead
 *     plus its merge-gate verdict (worker-phase2 §4/§5) — a pure cache read.
 *
 * @param {string} workspace_key
 * @param {Record<string, unknown>} queue
 * @returns {Record<string, unknown>}
 */
function decorateQueue(workspace_key, queue) {
  /** @type {{ cmd: string[], timeout_ms: number, source: 'config'|'detected' } | null} */
  let verify_cmd = null;
  try {
    verify_cmd = resolveVerifyCmd(workspace_key, getConfig().worker_verify);
  } catch {
    verify_cmd = null;
  }
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
  return {
    ...queue,
    workspace_info: { verify_cmd, slots },
    // Observed PR state + merge-gate verdict per `pr_wait` bead. Non-persisted
    // (worker-phase2 §4) — it exists only on the wire and in server memory.
    pr_observations: prObservationsFor(workspace_key, queue, !!verify_cmd)
  };
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
  emitSessionLogSnapshot(ws, client_id, attempt_id, lines);

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
 * Queue entry is admission-gated (worker-autorun-policy §1): with a live
 * attachment the bead must pass the fail-closed validator (route pin + spec
 * existence + fresh spec_review receipt) before placement; a refusal replies
 * `{ applied:false, admission_reason }` without mutating the queue. Without an
 * attachment the check is skipped (nothing can dispatch there anyway).
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
  const key = workspaceKeyOf(ws);
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
    // A successful (admission-passed) placement clears any stale refusal.
    const cleared = queueStore().clearAdmission(key, p.bead_id);
    if (cleared.ok) {
      result = { ...result, queue: cleared.queue };
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
  const key = workspaceKeyOf(ws);
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
  const key = workspaceKeyOf(ws);
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
  const key = workspaceKeyOf(ws);
  const result = queueStore().setSlots(key, {
    expected_revision: revisionOf(p),
    slots: p.slots
  });
  replyMutation(ws, req, key, result);
}

/**
 * Handle `worker-queue-set-exec-default`. Payload:
 * `{ key: <one of the 5 exec keys>, value: string|null, expected_revision }`.
 * Persists the workspace-global exec-setting default (CAS); null/'' unsets. Enum
 * validation (and the runner↔model union check) lives in the queue store's
 * `setExecDefault` (spec §2).
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleWorkerQueueSetExecDefault(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.key !== 'string') {
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'bad_request',
          'payload requires { key: orchestration_model|orchestration_effort|review_model|impl_model }'
        )
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const result = queueStore().setExecDefault(key, {
    expected_revision: revisionOf(p),
    key: p.key,
    value: p.value ?? null
  });
  replyMutation(ws, req, key, result);
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
  const key = workspaceKeyOf(ws);
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
  const key = workspaceKeyOf(ws);
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
  const key = workspaceKeyOf(ws);
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
  const key = workspaceKeyOf(ws);
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
 * Handle `worker-pr-merge`. Payload: `{ bead_id, expected_revision }`.
 *
 * The human merge click (worker-phase2 §6). Under the same CAS discipline as
 * `worker-attempt-resume`: a stale revision replies `conflict:true` WITHOUT
 * acting, because the snapshot the user clicked from may predate the transition
 * that moved this very bead. Everything else about the decision is re-derived
 * server-side at click time — the badges in that snapshot are advisory only.
 *
 * The reply distinguishes what actually happened (`action`), since a click can
 * legitimately merge nothing: a DIRTY PR dispatches a conflict-resolution
 * session instead, and a refused gate merges nothing at all.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleWorkerPrMerge(ws, req) {
  const p = /** @type {any} */ (req.payload || {});
  if (typeof p.bead_id !== 'string' || p.bead_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload requires { bead_id: string }')
      )
    );
    return;
  }
  const key = workspaceKeyOf(ws);
  const current = /** @type {any} */ (queueStore().snapshot(key));
  if (revisionOf(p) !== current.revision) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          bead_id: p.bead_id,
          ok: false,
          conflict: true,
          action: null,
          reason: null,
          queue: decorateQueue(key, current)
        })
      )
    );
    return;
  }
  /** @type {any} */
  let result = { ok: false, action: 'refused', reason: 'no_attachment' };
  try {
    result = await mergeWorkerPr(key, p.bead_id);
  } catch (err) {
    log('worker-pr-merge failed for %s/%s: %o', key, p.bead_id, err);
    result = { ok: false, action: 'refused', reason: 'error' };
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        bead_id: p.bead_id,
        ok: !!result.ok,
        conflict: false,
        action: result.action || null,
        reason: result.reason || null,
        cleanup_step: result.cleanup_step || null,
        attempt_id: result.attempt_id || null
      })
    )
  );
  // Even a refusal re-observed the PR, so the badges moved — always fan out.
  fanout(key, /** @type {any} */ (queueStore().snapshot(key)));
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
  const key = workspaceKeyOf(ws);
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
  const key = workspaceKeyOf(ws);
  const result = queueStore().remove(key, {
    expected_revision: revisionOf(p),
    bead_id: p.bead_id
  });
  replyMutation(ws, req, key, result);
}
