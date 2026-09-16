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
import { compareRangeSince } from '../../app/data/closed-range.js';
import { makeError } from '../../app/protocol.js';
import { prepareCompareSnapshot } from '../worker/compare-projection.js';
import { log } from './context.js';

export { compareRangeSince };

/**
 * @param {unknown} value
 * @returns {number|null}
 */
function num(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

/**
 * Resolve inclusive `since` and exclusive `until` comparison bounds.
 *
 * @param {Record<string, any>} payload
 * @param {number} [now]
 * @returns {{ since: number|null, until: number|null }}
 */
export function compareRangeBounds(payload, now = Date.now()) {
  const range = payload.range ?? '30d';
  if (range === 'custom') {
    return { since: num(payload.since), until: num(payload.until) };
  }
  return { since: compareRangeSince(range, now), until: null };
}

/**
 * @param {WebSocket} ws
 * @param {RequestEnvelope} req
 * @param {{ snapshot?: typeof prepareCompareSnapshot }} [seams]
 */
export async function handleGetCompare(ws, req, seams = {}) {
  const payload = /** @type {any} */ (req.payload || {});
  const build = seams.snapshot || prepareCompareSnapshot;
  const bounds = compareRangeBounds(payload);
  /** @type {any} */
  let model;
  try {
    model = await build({
      root_dirs: payload.root_dirs,
      group_by:
        payload.group_by === 'orchestration' ||
        payload.group_by === 'impl_actor'
          ? payload.group_by
          : 'preset',
      routes: payload.routes,
      include_bench: payload.include_bench,
      problem_criteria: payload.problem_criteria,
      since: bounds.since,
      until: bounds.until
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
