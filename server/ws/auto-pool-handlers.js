/**
 * Server-global auto-pool WebSocket channel (UI-y7h1 §3.4).
 *
 * `subscribe-auto-pool` answers with the current snapshot at once; a
 * successful `auto-pool-set` replies `ok` and then pushes the new snapshot to
 * every subscriber. A rejected set answers with the error code and the current
 * snapshot (plus the offending runtime, when one) in `error.details`, so the
 * settings section can adopt it and let the person save again.
 *
 * Besides the stored document the snapshot carries each runtime's choices —
 * the model options, the effort list up to `xhigh`, and the projection's
 * shipped defaults when the pin has them — so the section draws from this
 * channel alone.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 * @import { ResolvedCatalog } from '../worker/runner-catalog.js'
 * @import { AutoPoolRuntime, AutoPoolSetResult, AutoPoolState } from '../auto-pool-store.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import {
  AUTO_POOL_RUNTIMES,
  autoPoolClaudeModels,
  autoPoolCodexFamilies,
  autoPoolDefaults,
  autoPoolEfforts,
  autoPoolStore
} from '../auto-pool-store.js';
import { loadExecutionDefaults } from '../worker/execution-defaults.js';
import { isCodexPinnedName } from '../worker/runner-catalog.js';
import { runtimeCatalog } from '../worker/runner/index.js';
import { log } from './context.js';

const DEFAULT_CLIENT_ID = 'auto-pool';

/**
 * @typedef {Object} AutoPoolChoice
 * @property {string[]} models - Model options before the client drops hidden
 * models.
 * @property {string[]} efforts - Effort options, lowest first, up to `xhigh`.
 * @property {AutoPoolRuntime|null} defaults - The projection's shipped
 * defaults, or null while the pin has no `auto_pool_defaults`.
 * @property {string[]|null} catalog_models - Codex: every name of the
 * server's Codex catalog (marks a stored name the account list lacks); null
 * for Claude.
 */

/**
 * @typedef {{
 *   store: () => ReturnType<typeof autoPoolStore>,
 *   implementation: () => Record<string, any>|null,
 *   catalog: () => ResolvedCatalog
 * }} AutoPoolDeps
 */

/** @type {AutoPoolDeps} */
const DEFAULT_DEPS = {
  store: autoPoolStore,
  implementation: () => loadExecutionDefaults().session?.implementation ?? null,
  catalog: runtimeCatalog
};

/** @type {AutoPoolDeps} */
let deps = DEFAULT_DEPS;

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
 * Each runtime's choices from the projection and, for Codex, the catalog's
 * pinned names.
 *
 * @param {Record<string, any>|null} implementation
 * @param {ResolvedCatalog|null} catalog
 * @returns {Record<string, AutoPoolChoice>}
 */
export function autoPoolChoices(implementation, catalog) {
  const families = autoPoolCodexFamilies(implementation);
  const codex_names = Object.keys(catalog?.runners?.codex?.models ?? {});
  const pinned = codex_names.filter(
    (name) => families.length > 0 && isCodexPinnedName(name, families)
  );
  /** @type {Record<string, AutoPoolChoice>} */
  const choices = {};
  for (const runtime of AUTO_POOL_RUNTIMES) {
    choices[runtime] = {
      models:
        runtime === 'claude'
          ? autoPoolClaudeModels(implementation)
          : [...new Set([...families, ...pinned])],
      efforts: autoPoolEfforts(implementation, runtime),
      defaults: autoPoolDefaults(implementation, runtime),
      catalog_models: runtime === 'codex' ? codex_names : null
    };
  }
  return choices;
}

/**
 * The wire payload: the stored document plus each runtime's choices.
 *
 * @param {AutoPoolState} state
 * @returns {{ revision: number, runtimes: Record<string, AutoPoolRuntime>, choices: Record<string, AutoPoolChoice> }}
 */
function wireSnapshot(state) {
  /** @type {ResolvedCatalog|null} */
  let catalog = null;
  try {
    catalog = deps.catalog();
  } catch (err) {
    log('auto-pool catalog read failed: %o', err);
  }
  return {
    revision: state.revision,
    runtimes: state.runtimes,
    choices: autoPoolChoices(deps.implementation(), catalog)
  };
}

/**
 * @param {WebSocket} ws
 * @param {string} client_id
 * @param {ReturnType<typeof wireSnapshot>} snapshot
 */
function emitSnapshot(ws, client_id, snapshot) {
  try {
    ws.send(
      JSON.stringify({
        id: `evt-${Date.now()}`,
        ok: true,
        type: 'auto-pool-snapshot',
        payload: { type: 'auto-pool-snapshot', id: client_id, ...snapshot }
      })
    );
  } catch {
    // One disconnected subscriber must not prevent fanout to the others.
  }
}

/**
 * @param {ReturnType<typeof wireSnapshot>} snapshot
 */
function fanout(snapshot) {
  for (const subscriber of SUBSCRIBERS) {
    emitSnapshot(subscriber.ws, subscriber.client_id, snapshot);
  }
}

/**
 * Catalog-change hook: the Codex choices follow the catalog's pinned names, so
 * a new Codex CLI list pushes a fresh snapshot to every subscriber.
 */
export function notifyAutoPoolCatalogChanged() {
  if (SUBSCRIBERS.size === 0) {
    return;
  }
  fanout(wireSnapshot(deps.store().snapshot()));
}

/**
 * Detach a connection from the subscriber registry (close hook).
 *
 * @param {WebSocket} ws
 */
export function detachAutoPool(ws) {
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
}

/**
 * Test-only: clear subscribers and replace any dependency (omitted ones fall
 * back to the defaults).
 *
 * @param {Partial<AutoPoolDeps>} [overrides]
 */
export function __resetAutoPoolForTest(overrides = {}) {
  SUBSCRIBERS.clear();
  deps = { ...DEFAULT_DEPS, ...overrides };
}

/**
 * Handle `subscribe-auto-pool`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleSubscribeAutoPool(ws, req) {
  const client_id = clientIdOf(req);
  for (const subscriber of SUBSCRIBERS) {
    if (subscriber.ws === ws && subscriber.client_id === client_id) {
      SUBSCRIBERS.delete(subscriber);
    }
  }
  SUBSCRIBERS.add({ ws, client_id });
  ws.send(JSON.stringify(makeOk(req, { id: client_id })));
  emitSnapshot(ws, client_id, wireSnapshot(deps.store().snapshot()));
}

/**
 * Handle `unsubscribe-auto-pool`. Payload: `{ id?: client_id }`.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeAutoPool(ws, req) {
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
 * Handle `auto-pool-set`. Payload: `{ expected_revision, runtimes }`
 * replacing the whole document.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleAutoPoolSet(ws, req) {
  const payload = /** @type {any} */ (req.payload ?? {});
  /** @type {AutoPoolSetResult} */
  let result;
  try {
    result = deps.store().set({
      expected_revision: payload.expected_revision,
      runtimes: payload.runtimes
    });
  } catch (err) {
    log('auto-pool-set failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(req, 'internal_error', 'failed to persist auto pool', {
          snapshot: wireSnapshot(deps.store().snapshot())
        })
      )
    );
    return;
  }
  const snapshot = wireSnapshot(result.snapshot);
  if (!result.ok) {
    ws.send(
      JSON.stringify(
        makeError(req, result.code, `auto-pool-set: ${result.code}`, {
          snapshot,
          runtime: result.runtime
        })
      )
    );
    return;
  }
  ws.send(JSON.stringify(makeOk(req, { snapshot })));
  fanout(snapshot);
}
