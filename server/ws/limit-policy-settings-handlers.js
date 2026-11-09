/**
 * Server-global limit-policy settings WebSocket channel (UI-giog §4.2).
 *
 * `subscribe-limit-policy-settings` answers with the current snapshot at once;
 * a successful `limit-policy-settings-set` replies `ok`, pushes the new
 * snapshot to every subscriber, and then propagates the change (§4.1): for
 * every registered workspace it re-binds the changed runners' standing hold
 * verdicts to the new effective policy (the repo policy itself is never
 * written), then re-runs that workspace's provider switch pass, and finally
 * announces the end so the active-login passes judge once. One workspace's
 * failure is logged and the others continue.
 *
 * A refused set still replies on the same envelope: `{ ok: false, code,
 * runner?, message, snapshot }`.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { LimitPolicyRunner, LimitPolicySnapshot } from '../limit-policy-settings.js'
 */
import path from 'node:path';
import { makeError, makeOk } from '../../app/protocol.js';
import {
  announceLimitPolicyApplied,
  limitPolicySettingsStore
} from '../limit-policy-settings.js';
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
 * Every registered workspace, keyed the way the queue store keys them.
 *
 * @returns {string[]}
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
  }
  return [...keys];
}

/**
 * Carry a successful write to every registered workspace (§4.1, §4.6):
 * re-bind, then the switch pass, then one active-login judgment.
 *
 * @param {LimitPolicyRunner[]} runners - The runners whose entry changed.
 * @returns {Promise<void>}
 */
export async function propagateLimitPolicyChange(runners) {
  const workspaces = registeredWorkspaces();
  const queue_store = getWorkerRuntime().queueStore;
  for (const workspace of workspaces) {
    for (const runner of runners) {
      try {
        const result = queue_store.rebindProviderSwitchVerdicts(
          workspace,
          runner
        );
        if (result.ok) {
          fanoutWorkerQueue(workspace, /** @type {any} */ (result.queue));
        }
      } catch (err) {
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
            'provider switch reevaluation after limit-policy settings failed for %s: %o',
            workspace,
            err
          );
        })
    )
  );
  announceLimitPolicyApplied();
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
 * { claude?: patch, codex?: patch } }` where a patch may carry `scope`
 * (`'repo'|'global'`), `mode`, `accounts`, and `preempt_pct`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @returns {Promise<void>} Settles once the change has propagated.
 */
export async function handleLimitPolicySettingsSet(ws, req) {
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
  if (result.changed.length > 0) {
    await propagateLimitPolicyChange(result.changed);
  }
}
