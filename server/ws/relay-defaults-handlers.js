/**
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeOk } from '../../app/protocol.js';
import { relayDefaults } from '../relay-defaults.js';
import { runtimeCatalog } from '../worker/runner/index.js';

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleRelayDefaults(ws, req) {
  const result = await relayDefaults(
    req.type === 'relay-defaults-set'
      ? /** @type {any} */ (req.payload ?? {})
      : null
  );
  ws.send(
    JSON.stringify(
      makeOk(req, {
        ...result,
        codex_models: runtimeCatalog().runners.codex.models
      })
    )
  );
}
