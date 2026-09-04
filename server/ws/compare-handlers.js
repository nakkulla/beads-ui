/**
 * Preset comparison channel (preset-compare §3.5).
 *
 * One request/response pair, `get-compare` → `compare-snapshot`, and no push at
 * all: the answer is dozens of record files wide and nothing a Worker tick
 * changes needs to redraw a comparison table, so the tab asks on open, on a
 * filter change, and on 새로고침.
 *
 * @import { WebSocket } from 'ws'
 * @import { RequestEnvelope } from '../../app/protocol.js'
 */
import {
  closedRangeSince,
  isClosedRange
} from '../../app/data/closed-range.js';
import { makeError } from '../../app/protocol.js';
import { compareSnapshot } from '../worker/compare-projection.js';
import { log } from './context.js';

/**
 * Resolve the period filter into the epoch-ms lower bound the projection
 * compares `finished_at` against. An unknown value keeps the whole history
 * rather than silently narrowing it.
 *
 * @param {unknown} value
 * @param {number} [now]
 * @returns {number|null}
 */
export function compareRangeSince(value, now = Date.now()) {
  if (!isClosedRange(value)) {
    return null;
  }
  return closedRangeSince(value, now) ?? null;
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {{ snapshot?: typeof compareSnapshot }} [seams]
 */
export function handleGetCompare(ws, req, seams = {}) {
  const payload = /** @type {any} */ (req.payload || {});
  const build = seams.snapshot || compareSnapshot;
  /** @type {any} */
  let model;
  try {
    model = build({
      root_dirs: payload.root_dirs,
      issue_types: payload.issue_types,
      routes: payload.routes,
      include_bench: payload.include_bench,
      since: compareRangeSince(payload.range)
    });
  } catch (err) {
    log('compare snapshot failed: %o', err);
    ws.send(
      JSON.stringify(
        makeError(
          req,
          'compare_projection_failed',
          err instanceof Error ? err.message : String(err)
        )
      )
    );
    return;
  }
  ws.send(
    JSON.stringify({
      id: req.id,
      ok: true,
      type: /** @type {import('../../app/protocol.js').MessageType} */ (
        'compare-snapshot'
      ),
      payload: model
    })
  );
}
