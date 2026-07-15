/**
 * @import { RawData, WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import { fetchListForSubscription } from '../list-adapters.js';
import { keyOf } from '../subscriptions.js';
import { validateSubscribeListPayload } from '../validators.js';
import {
  applyClosedIssuesFilter,
  emitSubscriptionSnapshot,
  ensureSubs,
  getConnWorkspace,
  log,
  registryFor,
  setCachedSnapshot
} from './context.js';
import { scheduleBackgroundRefresh } from './refresh.js';

/**
 * Handle a `subscribe-list` request. Payload: { id: string, type: string, params?: object }.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleSubscribeList(ws, req) {
  const payload_id = /** @type {any} */ (req.payload)?.id || '';
  log('subscribe-list %s', payload_id);
  const validation = validateSubscribeListPayload(
    /** @type {any} */ (req.payload || {})
  );
  if (!validation.ok) {
    ws.send(
      JSON.stringify(makeError(req, validation.code, validation.message))
    );
    return;
  }
  const client_id = validation.id;
  const spec = validation.spec;
  const key = keyOf(spec);
  const root_dir = getConnWorkspace(ws)?.root_dir || '';
  const reg = registryFor(root_dir);
  const { entry: existing_entry } = reg.ensure(spec);

  /**
   * Reply with an error and avoid attaching the subscription when
   * initialization fails.
   *
   * @param {string} code
   * @param {string} message
   * @param {Record<string, unknown>|undefined} details
   */
  const replyWithError = (code, message, details = undefined) => {
    ws.send(JSON.stringify(makeError(req, code, message, details)));
  };

  if (existing_entry.cachedSnapshot !== null) {
    const s = ensureSubs(ws);
    const { key: attached_key } = reg.attach(spec, ws);
    s.list_subs?.set(client_id, { key: attached_key, spec });

    try {
      emitSubscriptionSnapshot(
        ws,
        client_id,
        attached_key,
        existing_entry.cachedSnapshot
      );
    } catch (err) {
      log('cache hit snapshot send failed for %s: %o', attached_key, err);
      s.list_subs?.delete(client_id);
      try {
        reg.detach(spec, ws);
      } catch {
        // ignore detach errors
      }
      replyWithError('bd_error', 'Failed to publish cached snapshot', {
        key
      });
      return;
    }

    ws.send(JSON.stringify(makeOk(req, { id: client_id, key: attached_key })));
    scheduleBackgroundRefresh(root_dir, spec);
    return;
  }

  /** @type {Awaited<ReturnType<typeof fetchListForSubscription>> | null} */
  let initial = null;
  try {
    initial = await fetchListForSubscription(spec, {
      cwd: root_dir || undefined
    });
  } catch (err) {
    log('subscribe-list snapshot error for %s: %o', key, err);
    const message =
      (err && /** @type {any} */ (err).message) || 'Failed to load list';
    replyWithError('bd_error', String(message), { key });
    return;
  }

  if (!initial.ok) {
    log(
      'initial snapshot failed for %s: %s %o',
      key,
      initial.error.message,
      initial.error
    );
    const details = { ...(initial.error.details || {}), key };
    replyWithError(initial.error.code, initial.error.message, details);
    return;
  }

  const s = ensureSubs(ws);
  const { key: attached_key } = reg.attach(spec, ws);
  s.list_subs?.set(client_id, { key: attached_key, spec });

  try {
    await reg.withKeyLock(attached_key, async () => {
      const items = applyClosedIssuesFilter(spec, initial ? initial.items : []);
      void reg.applyItems(attached_key, items);
      setCachedSnapshot(root_dir, attached_key, items);
      emitSubscriptionSnapshot(ws, client_id, attached_key, items);
    });
  } catch (err) {
    log('subscribe-list snapshot error for %s: %o', attached_key, err);
    s.list_subs?.delete(client_id);
    try {
      reg.detach(spec, ws);
    } catch {
      // ignore detach errors
    }
    replyWithError('bd_error', 'Failed to publish snapshot', { key });
    return;
  }

  ws.send(JSON.stringify(makeOk(req, { id: client_id, key: attached_key })));
}

/**
 * Handle an `unsubscribe-list` request. Payload: { id: string }.
 *
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export function handleUnsubscribeList(ws, req) {
  log('unsubscribe-list %s', /** @type {any} */ (req.payload)?.id || '');
  const { id: client_id } = /** @type {any} */ (req.payload || {});
  if (typeof client_id !== 'string' || client_id.length === 0) {
    ws.send(
      JSON.stringify(
        makeError(req, 'bad_request', 'payload.id must be a non-empty string')
      )
    );
    return;
  }
  const s = ensureSubs(ws);
  const sub = s.list_subs?.get(client_id) || null;
  let removed = false;
  if (sub) {
    try {
      removed = registryFor(getConnWorkspace(ws)?.root_dir).detach(
        sub.spec,
        ws
      );
    } catch {
      removed = false;
    }
    s.list_subs?.delete(client_id);
  }
  ws.send(
    JSON.stringify(
      makeOk(req, {
        id: client_id,
        unsubscribed: removed
      })
    )
  );
}
