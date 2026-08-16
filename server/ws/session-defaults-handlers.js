/**
 * Workspace-global session defaults channel (`bd kv`).
 *
 * Read is fail-quiet by contract — an absent key or a broken value yields an
 * empty layer plus warnings the settings dialog renders as a banner. Write is
 * strict: an out-of-vocabulary edit is refused before bd is touched, and every
 * failure (bd write, readback mismatch) reaches the client as an error so the
 * dialog can keep the user's edit state (spec §F).
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import { makeError, makeOk } from '../../app/protocol.js';
import {
  SESSION_DEFAULTS_KV_KEY,
  mergeSessionDefaults,
  normalizeSessionDefaults,
  validateSessionDefaultsPatch
} from '../session-defaults.js';
import { kvGetJsonInWorkspace, kvSetJsonInWorkspace, log } from './context.js';

/**
 * Read the kv layer and normalize it for one reply.
 *
 * @param {WebSocket} ws
 * @returns {Promise<{ ok: true, values: Record<string, string>, warnings: string[], raw: Record<string, unknown>|undefined }|{ ok: false, error: string }>}
 */
async function readSessionDefaults(ws) {
  const read = await kvGetJsonInWorkspace(ws, SESSION_DEFAULTS_KV_KEY);
  if (!read.ok) {
    return { ok: false, error: read.error || 'bd kv get failed' };
  }
  const normalized = normalizeSessionDefaults(read.value);
  const warnings = read.warning
    ? [read.warning, ...normalized.warnings]
    : normalized.warnings;
  return {
    ok: true,
    values: normalized.values,
    warnings,
    raw: read.value
  };
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleGetSessionDefaults(ws, req) {
  log('get-session-defaults');
  const read = await readSessionDefaults(ws);
  if (!read.ok) {
    ws.send(JSON.stringify(makeError(req, 'kv_read_failed', read.error)));
    return;
  }
  ws.send(
    JSON.stringify(
      makeOk(req, { values: read.values, warnings: read.warnings })
    )
  );
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 */
export async function handleSetSessionDefaults(ws, req) {
  log('set-session-defaults');
  const { values } = /** @type {any} */ (req.payload || {});
  const validated = validateSessionDefaultsPatch(values);
  if (!validated.ok) {
    ws.send(JSON.stringify(makeError(req, 'bad_request', validated.reason)));
    return;
  }

  // Re-read immediately before the write: `bd kv` carries no CAS, so this is
  // what narrows the clobber window to per-key last-write-wins (spec §C.2).
  const before = await readSessionDefaults(ws);
  if (!before.ok) {
    ws.send(JSON.stringify(makeError(req, 'kv_read_failed', before.error)));
    return;
  }
  const next = mergeSessionDefaults(before.raw, validated.patch);

  const written = await kvSetJsonInWorkspace(ws, SESSION_DEFAULTS_KV_KEY, next);
  if (!written.ok) {
    ws.send(
      JSON.stringify(
        makeError(req, 'kv_write_failed', written.error || 'bd kv set failed')
      )
    );
    return;
  }

  const after = await readSessionDefaults(ws);
  if (!after.ok) {
    ws.send(JSON.stringify(makeError(req, 'kv_readback_failed', after.error)));
    return;
  }
  for (const [key, value] of Object.entries(validated.patch)) {
    const observed = Object.hasOwn(after.values, key)
      ? after.values[key]
      : null;
    if (observed !== value) {
      ws.send(
        JSON.stringify(
          makeError(
            req,
            'kv_readback_failed',
            `session default did not persist: ${key}`
          )
        )
      );
      return;
    }
  }
  ws.send(
    JSON.stringify(
      makeOk(req, { values: after.values, warnings: after.warnings })
    )
  );
}
