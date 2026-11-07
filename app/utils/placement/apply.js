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
 * The unit of a send is the bundle (UI-blx2 §3.3): a lone candidate goes as
 * `worker-queue-place`, any bundle with a bind, a move or a second candidate
 * as ONE `worker-queue-place-bundle`, so no partner or candidate can start
 * between its steps. "Unchanged" means the same bundle — lane and every step's
 * kind, id and entry right before (`sameBundle`).
 *
 * @import { PlacementPlan, PlannedPlacement } from './compute.js'
 */
import { isLonePlace, sameBundle, serialLaneNumber } from './compute.js';

const MAX_CONFLICT_RETRIES = 5;

/**
 * @typedef {(type: string, payload?: unknown) => Promise<any>} PlacementTransport
 */

/**
 * The outcome of one recommended send.
 *
 * - `applied`: the store took it.
 * - `moved`: the recomputed place differs;
 *   nothing more was sent. `placement` is the newest computed place (null when
 *   the candidate is no longer placeable on the new snapshot).
 * - `contended`: the place stayed unchanged but the conflict retry limit was
 *   exhausted; the queue is the last conflict snapshot.
 * - `refused`: the store or admission refused it; `reason` is the admission
 *   reason when there is one.
 * - `grow_refused`: the place needs more serial lanes and the store refused
 *   to add them (UI-lsr4 §3.3); nothing was placed.
 * - `unsupported`: the server does not know `worker-queue-place-bundle`
 *   (`unknown_type`, UI-blx2 §3.9); nothing was placed.
 * - `error`: the transport threw.
 *
 * @typedef {{ status: 'applied', queue: any }|{ status: 'moved', placement: PlannedPlacement|null, queue: any }|{ status: 'contended', queue: any }|{ status: 'refused', reason: string|null }|{ status: 'grow_refused' }|{ status: 'unsupported' }|{ status: 'error', message: string }} PlacementSendResult
 */

/**
 * Whether a rejected request is the server's `unknown_type` reply.
 *
 * @param {unknown} error
 * @returns {boolean}
 */
function isUnknownType(error) {
  return (
    !!error &&
    typeof error === 'object' &&
    /** @type {Record<string, unknown>} */ (error).code === 'unknown_type'
  );
}

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
 * The `worker-queue-place-bundle` payload of the bundle a computed place
 * belongs to (UI-blx2 §3.4): the bind, then every move and place with the
 * index the store splices it at.
 *
 * @param {PlannedPlacement} placement
 * @param {number} revision
 * @param {string} root_dir
 * @returns {Record<string, unknown>}
 */
export function bundlePayload(placement, revision, root_dir) {
  const steps = placement.bundle_steps;
  return {
    lane: placement.lane,
    binds: steps.filter((step) => step.kind === 'bind').map((step) => step.id),
    steps: steps
      .filter((step) => step.kind !== 'bind')
      .map((step) => ({ bead_id: step.id, index: step.index })),
    ...(root_dir ? { root_dir } : {}),
    expected_revision: revision
  };
}

/**
 * Why the store or admission refused a send: the admission reason, naming
 * the bundle step it refused, else the store's own reason.
 *
 * @param {any} response
 * @returns {string|null}
 */
function refusalReason(response) {
  if (response && typeof response.admission_reason === 'string') {
    return typeof response.bead_id === 'string'
      ? `${response.admission_reason} (${response.bead_id})`
      : response.admission_reason;
  }
  return response && typeof response.reason === 'string'
    ? response.reason
    : null;
}

/**
 * The toast a refused or failed send becomes; the same sentences the
 * `[↴ 대기로]` path shows.
 *
 * @param {PlacementSendResult} result
 * @returns {string|null}
 */
export function placementSendNotice(result) {
  if (result.status === 'contended') {
    return '큐가 계속 바뀌어 멈췄습니다';
  }
  if (result.status === 'refused') {
    return result.reason
      ? `큐 적재 거부: ${result.reason}`
      : '큐 요청이 적용되지 않았습니다';
  }
  if (result.status === 'grow_refused') {
    return '직렬 레인을 늘리지 못했습니다';
  }
  if (result.status === 'unsupported') {
    return '서버가 묶음 배치를 지원하지 않음';
  }
  if (result.status === 'error') {
    return result.message;
  }
  return null;
}

/**
 * Grow the serial lane count to the plan's `lane_count` before a bundle beyond
 * the configured lanes (UI-lsr4 §3.3). A conflict recomputes on the reply's
 * snapshot and retries up to five times only when the same count is still
 * needed and the shown bundle is unchanged. After the store grew, the bundle
 * is recomputed on the reply's snapshot and goes on only when it is still the
 * shown bundle.
 *
 * @param {Object} input
 * @param {PlacementTransport} input.transport
 * @param {string} input.root_dir
 * @param {PlannedPlacement} input.placement - The place shown.
 * @param {number} input.revision
 * @param {number} input.lane_count
 * @param {(queue: any) => PlacementPlan} input.recompute
 * @param {(queue: any) => void} input.adopt
 * @returns {Promise<{ status: 'grown', placement: PlannedPlacement, revision: number }|PlacementSendResult>}
 */
async function growSerialLanes(input) {
  const { transport, root_dir, placement, recompute, adopt, lane_count } =
    input;
  let revision = input.revision;
  for (let retries = 0; retries <= MAX_CONFLICT_RETRIES; retries += 1) {
    /** @type {any} */
    let response;
    try {
      response = await transport('worker-queue-set-serial-lane-count', {
        count: lane_count,
        ...(root_dir ? { root_dir } : {}),
        expected_revision: revision
      });
    } catch (error) {
      return { status: 'error', message: errorMessage(error) };
    }
    if (response && response.queue) {
      adopt(response.queue);
    }
    const next_queue = response && response.queue ? response.queue : null;
    const next_plan = next_queue ? recompute(next_queue) : null;
    const next = next_plan ? next_plan.by_id[placement.id] || null : null;
    if (response && response.applied === true && !response.conflict) {
      if (!next || !sameBundle(placement, next)) {
        return { status: 'moved', placement: next, queue: next_queue };
      }
      return {
        status: 'grown',
        placement: next,
        revision:
          typeof next_queue.revision === 'number'
            ? next_queue.revision
            : revision
      };
    }
    if (!response || response.conflict !== true) {
      return { status: 'grow_refused' };
    }
    if (
      !next_plan ||
      !next ||
      !sameBundle(placement, next) ||
      next_plan.lane_count !== lane_count
    ) {
      return { status: 'moved', placement: next, queue: next_queue };
    }
    if (retries === MAX_CONFLICT_RETRIES) {
      return { status: 'contended', queue: next_queue };
    }
    revision =
      typeof next_queue.revision === 'number' ? next_queue.revision : revision;
  }
  return { status: 'contended', queue: null };
}

/**
 * Send the bundle of one computed place with the §4.7 CAS rule: on a
 * conflict, recompute on the reply's snapshot and retry up to five times with
 * its revision only when the bundle is unchanged; otherwise, or at the retry
 * limit, stop. A lone candidate goes as `worker-queue-place`, any other bundle
 * as one `worker-queue-place-bundle` (UI-blx2 §3.3). A bundle beyond
 * `configured_lane_count` first grows the serial lanes to `lane_count`
 * (UI-lsr4 §3.3); without the two counts no growth is checked.
 *
 * @param {Object} input
 * @param {PlacementTransport} input.transport
 * @param {string} input.root_dir
 * @param {PlannedPlacement} input.placement - The place shown; its bundle is
 * what goes out.
 * @param {number} input.revision - The revision it was computed on.
 * @param {number} [input.configured_lane_count] - The plan's
 * `configured_lane_count`.
 * @param {number} [input.lane_count] - The plan's `lane_count`.
 * @param {(queue: any) => PlacementPlan} input.recompute
 * @param {(queue: any) => void} input.adopt
 * @returns {Promise<PlacementSendResult>}
 */
export async function sendPlacement(input) {
  const { transport, root_dir, recompute, adopt } = input;
  let placement = input.placement;
  let revision = input.revision;
  if (
    typeof input.configured_lane_count === 'number' &&
    typeof input.lane_count === 'number' &&
    serialLaneNumber(placement.lane) > input.configured_lane_count
  ) {
    const grown = await growSerialLanes({
      transport,
      root_dir,
      placement,
      revision,
      lane_count: input.lane_count,
      recompute,
      adopt
    });
    if (grown.status !== 'grown') {
      return grown;
    }
    placement = grown.placement;
    revision = grown.revision;
  }
  for (let retries = 0; retries <= MAX_CONFLICT_RETRIES; retries += 1) {
    const lone = isLonePlace(placement);
    /** @type {any} */
    let response;
    try {
      response = lone
        ? await transport(
            'worker-queue-place',
            placePayload(placement, revision, root_dir)
          )
        : await transport(
            'worker-queue-place-bundle',
            bundlePayload(placement, revision, root_dir)
          );
    } catch (error) {
      if (!lone && isUnknownType(error)) {
        return { status: 'unsupported' };
      }
      return { status: 'error', message: errorMessage(error) };
    }
    if (response && response.queue) {
      adopt(response.queue);
    }
    if (response && response.applied === true && !response.conflict) {
      return { status: 'applied', queue: response.queue };
    }
    if (!response || response.conflict !== true) {
      return { status: 'refused', reason: refusalReason(response) };
    }
    const next_queue = response.queue;
    const next = next_queue
      ? recompute(next_queue).by_id[placement.id] || null
      : null;
    if (!next || !sameBundle(placement, next)) {
      return { status: 'moved', placement: next, queue: next_queue };
    }
    if (retries === MAX_CONFLICT_RETRIES) {
      return { status: 'contended', queue: next_queue };
    }
    placement = next;
    revision =
      typeof next_queue.revision === 'number' ? next_queue.revision : revision;
  }
  return { status: 'contended', queue: null };
}

/**
 * The outcome of `[적용]` and `[전체 적용 (n)]`: the candidates whose bundles
 * went in, and where it stopped — `id` is the first candidate of that bundle.
 *
 * @typedef {{ placed: string[], stopped: null|{ id: string, cause: 'moved'|'contended'|'refused'|'grow_refused'|'unsupported'|'error', result: PlacementSendResult } }} PlacementBatchResult
 */

/**
 * Send the checked bundles one at a time in apply order (§4.7, UI-blx2 §3.7);
 * `[적용]` is the same call with one candidate. Before each send the remaining
 * candidates are recomputed on the latest snapshot — the previous reply's —
 * and the bundle goes out only when it equals the one shown (lane, and every
 * step's kind, id and entry right before), with that snapshot's revision. A
 * bundle beyond the configured serial lanes first grows them to the
 * recomputed plan's `lane_count`. A different bundle, a refusal, the conflict
 * retry limit or an error stops the batch; bundles already in stay.
 *
 * @param {Object} input
 * @param {PlacementTransport} input.transport
 * @param {string} input.root_dir
 * @param {PlannedPlacement[]} input.shown - The checked rows, apply order;
 * the rows of one bundle stand together.
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
  let at = 0;
  while (at < shown.length) {
    const row = shown[at];
    let end = at + 1;
    while (end < shown.length && shown[end].bundle === row.bundle) {
      end += 1;
    }
    const remaining = shown.slice(at).map((item) => item.id);
    const now_plan = recompute(queue, remaining);
    const now = now_plan.by_id[row.id] || null;
    if (!now || !sameBundle(row, now)) {
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
      configured_lane_count: now_plan.configured_lane_count,
      lane_count: now_plan.lane_count,
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
    placed.push(...shown.slice(at, end).map((item) => item.id));
    queue = result.queue || input.snapshot();
    at = end;
  }
  return { placed, stopped: null };
}
