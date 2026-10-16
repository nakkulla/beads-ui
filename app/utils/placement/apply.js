/**
 * The `[적용]` and `[전체 적용]` sends of the placement preview (UI-izba §4.7).
 *
 * The drag controller's `sendCas` resends once on ANY conflict. A recommended
 * place may not do that: the place was computed on one snapshot, and after a
 * conflict it is only still the recommendation if the recomputed final place —
 * the lane and the entry right before it — is unchanged. So these sends own
 * their CAS rule, and take everything else (transport, the snapshot source,
 * the recompute and the adopt step) from the caller.
 *
 * @import { PlacementPlan, PlannedPlacement } from './compute.js'
 */
import { samePlace } from './compute.js';

/**
 * @typedef {(type: string, payload?: unknown) => Promise<any>} PlacementTransport
 */

/**
 * The outcome of one recommended send.
 *
 * - `applied`: the store took it.
 * - `moved`: the recomputed place differs, or a second conflict came back;
 *   nothing more was sent. `placement` is the newest computed place (null when
 *   the candidate is no longer placeable on the new snapshot).
 * - `refused`: the store or admission refused it; `reason` is the admission
 *   reason when there is one.
 * - `error`: the transport threw.
 *
 * @typedef {{ status: 'applied', queue: any }|{ status: 'moved', placement: PlannedPlacement|null, queue: any }|{ status: 'refused', reason: string|null }|{ status: 'error', message: string }} PlacementSendResult
 */

/**
 * @param {unknown} error
 * @returns {string}
 */
function errorMessage(error) {
  if (typeof error === 'string' && error.length > 0) {
    return error;
  }
  if (error && typeof error === 'object') {
    const value = /** @type {Record<string, any>} */ (error);
    if (typeof value.message === 'string' && value.message.length > 0) {
      return value.message;
    }
  }
  return '요청에 실패했습니다';
}

/**
 * The `worker-queue-place` payload of one computed place.
 *
 * @param {PlannedPlacement} placement
 * @param {number} revision
 * @param {string} root_dir
 * @returns {Record<string, unknown>}
 */
export function placePayload(placement, revision, root_dir) {
  return {
    bead_id: placement.id,
    lane: placement.lane,
    index: placement.index,
    ...(root_dir ? { root_dir } : {}),
    expected_revision: revision
  };
}

/**
 * The toast a refused or failed send becomes; the same sentences the
 * `[↴ 대기로]` path shows.
 *
 * @param {PlacementSendResult} result
 * @returns {string|null}
 */
export function placementSendNotice(result) {
  if (result.status === 'refused') {
    return result.reason
      ? `큐 적재 거부: ${result.reason}`
      : '큐 요청이 적용되지 않았습니다';
  }
  if (result.status === 'error') {
    return result.message;
  }
  return null;
}

/**
 * Send one computed place with the §4.7 CAS rule: on a conflict, recompute on
 * the reply's snapshot and resend once with its revision only when the final
 * place is unchanged; otherwise, or on a second conflict, send nothing more.
 *
 * @param {Object} input
 * @param {PlacementTransport} input.transport
 * @param {string} input.root_dir
 * @param {PlannedPlacement} input.placement - The place shown.
 * @param {number} input.revision - The revision it was computed on.
 * @param {(queue: any) => PlacementPlan} input.recompute
 * @param {(queue: any) => void} input.adopt
 * @returns {Promise<PlacementSendResult>}
 */
export async function sendPlacement(input) {
  const { transport, root_dir, recompute, adopt } = input;
  let placement = input.placement;
  let revision = input.revision;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    /** @type {any} */
    let response;
    try {
      response = await transport(
        'worker-queue-place',
        placePayload(placement, revision, root_dir)
      );
    } catch (error) {
      return { status: 'error', message: errorMessage(error) };
    }
    if (response && response.queue) {
      adopt(response.queue);
    }
    if (response && response.applied === true && !response.conflict) {
      return { status: 'applied', queue: response.queue };
    }
    if (!response || response.conflict !== true) {
      return {
        status: 'refused',
        reason:
          response && typeof response.admission_reason === 'string'
            ? response.admission_reason
            : null
      };
    }
    const next_queue = response.queue;
    const next = next_queue
      ? recompute(next_queue).by_id[placement.id] || null
      : null;
    if (attempt === 1 || !next || !samePlace(placement, next)) {
      return { status: 'moved', placement: next, queue: next_queue };
    }
    placement = next;
    revision =
      typeof next_queue.revision === 'number' ? next_queue.revision : revision;
  }
  return { status: 'moved', placement, queue: null };
}

/**
 * The outcome of `[전체 적용 (n)]`.
 *
 * @typedef {{ placed: string[], stopped: null|{ id: string, cause: 'moved'|'refused'|'error', result: PlacementSendResult } }} PlacementBatchResult
 */

/**
 * Send the checked places one at a time in apply order (§4.7). Before each
 * send the remaining candidates are recomputed on the latest snapshot — the
 * previous reply's — and the send goes out only when the candidate's place
 * equals the one the table shows, with that snapshot's revision. A different
 * place, a refusal or a second conflict stops the batch.
 *
 * @param {Object} input
 * @param {PlacementTransport} input.transport
 * @param {string} input.root_dir
 * @param {PlannedPlacement[]} input.shown - The checked rows, apply order.
 * @param {any} input.queue - The snapshot to start from.
 * @param {(queue: any, chosen: string[]) => PlacementPlan} input.recompute
 * @param {(queue: any) => void} input.adopt
 * @param {() => any} input.snapshot - The latest snapshot, read when a reply
 * carries no queue.
 * @returns {Promise<PlacementBatchResult>}
 */
export async function sendPlacementBatch(input) {
  const { transport, root_dir, shown, recompute, adopt } = input;
  /** @type {string[]} */
  const placed = [];
  let queue = input.queue;
  for (let at = 0; at < shown.length; at += 1) {
    const row = shown[at];
    const remaining = shown.slice(at).map((item) => item.id);
    const now = recompute(queue, remaining).by_id[row.id] || null;
    if (!now || !samePlace(row, now)) {
      return {
        placed,
        stopped: {
          id: row.id,
          cause: 'moved',
          result: { status: 'moved', placement: now, queue }
        }
      };
    }
    const result = await sendPlacement({
      transport,
      root_dir,
      placement: now,
      revision: typeof queue?.revision === 'number' ? queue.revision : 0,
      recompute: (next_queue) => recompute(next_queue, remaining),
      adopt
    });
    if (result.status !== 'applied') {
      return {
        placed,
        stopped: {
          id: row.id,
          cause: result.status,
          result
        }
      };
    }
    placed.push(row.id);
    queue = result.queue || input.snapshot();
  }
  return { placed, stopped: null };
}
