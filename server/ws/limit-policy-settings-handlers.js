/**
 * Server-global limit-policy settings WebSocket channel (UI-giog §4.2,
 * UI-32oq §4.1).
 *
 * `subscribe-limit-policy-settings` answers with the current snapshot at once;
 * a successful `limit-policy-settings-set` replies `ok` and pushes the new
 * snapshot to every subscriber. The settings decide only the global
 * active-login switch, so a write re-binds no repo's hold verdicts; the
 * server entry hears the store's change and hands both active-login passes
 * one judgment.
 *
 * A refused set still replies on the same envelope: `{ ok: false, code,
 * runner?, message, snapshot }`.
 *
 * The one repo-wide pass left here is `resumeLimitPolicyRebind`, which the
 * server start runs to finish the re-binding the UI-32oq migration recorded
 * in `rebind_pending`.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { LimitPolicyRunner, LimitPolicySnapshot } from '../limit-policy-settings.js'
 */
import path from 'node:path';
import { makeError, makeOk } from '../../app/protocol.js';
import { limitPolicySettingsStore } from '../limit-policy-settings.js';
import { getAvailableWorkspaces } from '../registry-watcher.js';
import { reevaluateWorkerProviderSwitches } from '../worker/attach.js';
import { getWorkerRuntime } from '../worker/runtime.js';
import { log } from './context.js';
import { fanout as fanoutWorkerQueue } from './worker-handlers.js';

const DEFAULT_CLIENT_ID = 'limit-policy-settings';

/** @type {Set<{ ws: WebSocket, client_id: string }>} */
const SUBSCRIBERS = new Set();

/**
 * @param {RequestEnvelope} req
 * @returns {string}
 */
function clientIdOf(req) {
  const raw = /** @type {any} */ (req.payload)?.id;
  return typeof raw === 'string' && raw.length > 0 ? raw : DEFAULT_CLIENT_ID;
}

/**
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {LimitPolicySnapshot} snapshot
 */
function emitSnapshot(ws, client_id, snapshot) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'limit-policy-settings-snapshot',
        payload: {
          type: 'limit-policy-settings-snapshot',
          id: client_id,
          ...snapshot
        }
      })
    );
  } catch {
    // One disconnected subscriber must not prevent fanout to the others.
  }
}

/**
 * @param {LimitPolicySnapshot} snapshot
 */
function fanout(snapshot) {
  for (const subscriber of SUBSCRIBERS) {
    emitSnapshot(subscriber.ws, subscriber.client_id, snapshot);
  }
}

/**
 * Every registered workspace, keyed the way the queue store keys them, or
 * null when the registry cannot be read.
 *
 * @returns {string[]|null}
 */
function registeredWorkspaces() {
  /** @type {Set<string>} */
  const keys = new Set();
  try {
    for (const entry of getAvailableWorkspaces()) {
      keys.add(path.resolve(entry.path));
    }
  } catch (err) {
    log('limit-policy settings: registry read failed: %o', err);
    return null;
  }
  return [...keys];
}

/**
 * Finish the hold-verdict re-binding the UI-32oq migration left pending
 * (§4.1): for each runner in `rebind_pending`, re-bind every registered
 * workspace's standing hold verdicts to that workspace's own stored policy,
 * re-run each workspace's switch pass, and then drop the runner from the list.
 * A workspace whose re-binding fails keeps its runner in the list (one log
 * line) for the next start; an unreadable registry keeps every runner.
 * Re-binding writes no policy value, so a repeat — after a stop between the
 * migration and here, or part way through — lands on the same verdicts.
 *
 * @returns {Promise<{ done: LimitPolicyRunner[], pending: LimitPolicyRunner[] }>}
 */
export async function resumeLimitPolicyRebind() {
  const store = limitPolicySettingsStore();
  const runners = store.rebindPending();
  if (runners.length === 0) {
    return { done: [], pending: [] };
  }
  const workspaces = registeredWorkspaces();
  if (workspaces === null) {
    return { done: [], pending: runners };
  }
  const queue_store = getWorkerRuntime().queueStore;
  /** @type {Set<LimitPolicyRunner>} */
  const failed = new Set();
  for (const runner of runners) {
    for (const workspace of workspaces) {
      try {
        const result = queue_store.rebindProviderSwitchVerdicts(
          workspace,
          runner
        );
        if (result.ok) {
          fanoutWorkerQueue(workspace, /** @type {any} */ (result.queue));
        }
      } catch (err) {
        failed.add(runner);
        log(
          'limit-policy settings: %s verdict rebind failed for %s: %o',
          runner,
          workspace,
          err
        );
      }
    }
  }
  await Promise.all(
    workspaces.map((workspace) =>
      Promise.resolve()
        .then(() => reevaluateWorkerProviderSwitches(workspace))
        .catch((err) => {
          log(
            'provider switch reevaluation after verdict rebind failed for %s: %o',
            workspace,
            err
          );
        })
    )
  );
  /** @type {LimitPolicyRunner[]} */
  const done = [];
  /** @type {LimitPolicyRunner[]} */
  const pending = [];
  for (const runner of runners) {
    if (!failed.has(runner) && store.completeRebind(runner)) {
      done.push(runner);
    } else {
      pending.push(runner);
    }
  }
  return { done, pending };
}

/**
 * Detach a connection from the subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachLimitPolicySettings(ws) {
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
}

/**
 * Test-only: clear the subscriber registry.
 */
export function __resetLimitPolicySettingsChannelForTest() {
  SUBSCRIBERS.clear();
}

/**
 * Handle `subscribe-limit-policy-settings`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeLimitPolicySettings(ws, req) {
  const client_id = clientIdOf(req);
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitSnapshot(ws, client_id, limitPolicySettingsStore().snapshot());
}

/**
 * Handle `unsubscribe-limit-policy-settings`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeLimitPolicySettings(ws, req) {
  const client_id = clientIdOf(req);
  let removed = false;
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
      removed = true;
    }
  }
  ws.send(
    JSON.stringify(makeOk(req, { id: client_id, unsubscribed: removed }))
  );
}

/**
 * Handle `limit-policy-settings-set`. Payload: `{ expected_revision, runners:
 * { claude?: patch, codex?: patch } }` where a patch may carry `auto_switch`,
 * `default_account`, `accounts`, and `preempt_pct` — any other field is
 * refused as `invalid_value`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleLimitPolicySettingsSet(ws, req) {
  const payload = /** @type {any} */ (req.payload ?? {});
  const store = limitPolicySettingsStore();
  /** @type {import('../limit-policy-settings.js').LimitPolicySetResult} */
  let result;
  try {
    result = store.set({
      expected_revision: payload.expected_revision,
      runners: payload.runners
    });
  } catch (err) {
    log('limit-policy-settings-set failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'internal_error',
          'failed to persist limit-policy settings',
          { snapshot: store.snapshot() }
        )
      )
    );
    return;
  }
  if (!result.ok) {
    ws.send(
      JSON.stringify(
        makeOk(req, {
          ok: false,
          code: result.code,
          ...(result.runner === undefined ? {} : { runner: result.runner }),
          message: result.message,
          snapshot: result.snapshot
        })
      )
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, { ok: true, snapshot: result.snapshot })));
  fanout(result.snapshot);
}
