/**
 * Placement computation of the Worker queue recommendation (UI-izba §4.6).
 *
 * Pure and deterministic: the same queue snapshot, pair relations, candidate
 * display order and priorities, and chosen set always give the same plan. The
 * browser runs it because the display order is a per-browser `localStorage`
 * preference the server cannot see, and because a preview computed from the
 * very snapshot a `[적용]` carries as its `expected_revision` cannot disagree
 * with it.
 *
 * The plan is a SIMULATION of the store: bundles go in one at a time in the
 * apply order, each the way the store writes it — a lone candidate as `place`
 * (one insertion, then `orderLaneByBlocks`), a larger bundle as `place-bundle`
 * (the bind, every move and place inserted in order, ONE `orderLaneByBlocks`,
 * then the bound bead's waiting row at the lane head) — and the next bundle is
 * placed on that result. Recomputing on the snapshot a send produced therefore
 * yields the same bundles for the rest when nothing else moved.
 *
 * A bundle pulls the waiting and lane-less occupying partners its candidates
 * conflict with into its serial lane (UI-blx2 §3): `uncovered` stays only on a
 * partner that cannot be moved or bound, and says why.
 *
 * What mandatory order (a direct `blocks` edge, an adopted jev order, a
 * conflict) leaves open — the order of a bundle's steps and the apply order of
 * bundles — goes to an adopted jev preference, then the BASE order: priority
 * ascending (a non-number after 4), then the display order, then the id
 * (UI-unf5 §3.1). A preference only orders: it never bundles, lanes, warns or
 * moves an insert index (§3.7).
 *
 * @import { PlacementRelation } from '../../../server/placement/wire.js'
 */
import {
  REFERENCE_CONFIDENCE,
  placementPairKey
} from '../../../server/placement/wire.js';
import { activeBeadIds } from '../active-attempts.js';
import { orderLaneByBlocks } from './lane-order.js';
import { occupancyReader } from './occupancy.js';

/**
 * @typedef {'parallel'|'s1'|'s2'|'s3'|'s4'|'s5'} PlacementLane
 */

/**
 * A relation read from the candidate's side: `c_first` means the candidate
 * must land before the other item, `x_first` the other way round.
 *
 * @typedef {'independent'|'c_first'|'x_first'|'conflict'|'unknown'} CandidateRelationKind
 */

/**
 * One relation of a candidate, oriented to it.
 *
 * @typedef {Object} RelationLine
 * @property {string} other - The other bead id.
 * @property {'member'|'chosen'|'outside'} side - `member`: a waiting or
 * lane-occupying item; `chosen`: another candidate of this plan; `outside`: a
 * candidate this plan does not place.
 * @property {PlacementLane|null} other_lane - Where a member stands.
 * @property {CandidateRelationKind} relation
 * @property {'fixed'|'jev'} source
 * @property {'blocks'|'file'} [basis]
 * @property {string[]} [overlap]
 * @property {true} [overlap_guard] - A conflict an overlapping pair's
 * short jev answer decided (UI-lsr4 §3.2).
 * @property {number|null} confidence
 * @property {CandidateRelationKind|null} jev_choice - jev's first choice,
 * candidate-oriented.
 * @property {number|null} judged_at
 * @property {string} [prefer_first] - The bead an adopted jev preference
 * would land first (UI-unf5 §3.3); absent without one.
 * @property {number} [prefer_confidence]
 */

/**
 * Every pair the candidate was compared on, by kind (UI-lsr4 §3.4): `total`
 * counts them all; a constraint with an unplaced candidate counts as
 * `conflict`.
 *
 * @typedef {{ total: number, conflict: number, order: number, independent: number, unknown: number }} PairCounts
 */

/**
 * Why an `uncovered` partner stays where it is (UI-blx2 §3.8):
 * `occupied_other_lane` — it holds another serial lane; `predecessor` — it
 * directly blocks other work; `waits_in_lane` — binding it would make it wait
 * on an item waiting in the lane; `lane_occupied` — the lane already has (or
 * gets) another occupant; `discard_active` — a lane-less occupant whose
 * discard is in flight; `not_holdable` — a lane-less occupant with no
 * unshelved PR wait and no lane-holding implementation attempt (a waiting bead
 * whose review session runs, a session's external PR wait); `no_serial_lane` — the snapshot has no serial
 * lane to move or bind it into.
 *
 * @typedef {'occupied_other_lane'|'predecessor'|'waits_in_lane'|'lane_occupied'|'discard_active'|'not_holdable'|'no_serial_lane'} UncoveredReason
 * @typedef {'order_cycle'|'order_unsatisfiable'|'uncovered'|'blocks_reordered'|'predecessor_parallel'} PlacementWarningCode
 * @typedef {{ code: PlacementWarningCode, other?: string, other_lane?: PlacementLane, reason?: UncoveredReason }} PlacementWarning
 */

/**
 * One step of a bundle (UI-blx2 §3.3): `bind` seats a lane-less occupant as the
 * lane's occupant, `move` takes a waiting partner out of another lane, `place`
 * puts a candidate in.
 *
 * @typedef {Object} BundleStep
 * @property {'bind'|'move'|'place'} kind
 * @property {string} id
 * @property {PlacementLane|null} from_lane - `move`: the lane it waits in.
 * @property {number|null} from_index - `move`: its index there.
 * @property {string|null} from_state - `bind`: what it is doing now
 * (`running`·`paused`·`failed`·`pr_wait`·…).
 * @property {number|null} index - `move`·`place`: the index the store splices
 * it at, counted among the lane's waiting entries at that moment without the
 * bound bead's row; null for `bind`.
 * @property {number|null} final_index - `move`·`place`: its position among the
 * lane's waiting entries after the bundle; null for `bind`.
 * @property {string|null} before - `move`·`place`: the waiting entry right
 * before it then, null at the lane head and for `bind`.
 * @property {number|null} number - `move`·`place`: 1-based apply number, the
 * number drawn; null for `bind`.
 */

/**
 * One bundle of the plan, the unit one send carries.
 *
 * @typedef {Object} PlannedBundle
 * @property {number} bundle - 0-based bundle order.
 * @property {PlacementLane} lane
 * @property {string[]} members - Its candidates, apply order.
 * @property {BundleStep[]} steps - The bind first, then the moves and places
 * in insertion order.
 */

/**
 * One candidate's place in the plan.
 *
 * @typedef {Object} PlannedPlacement
 * @property {string} id
 * @property {number} number - 1-based apply order among every `move` and
 * `place` step; also the number drawn.
 * @property {number} bundle - 0-based bundle order.
 * @property {PlacementLane} lane
 * @property {number} index - The `worker-queue-place` (or `place-bundle` step)
 * index: where the store splices the entry BEFORE its blocks correction, so
 * the store reproduces `final_index` exactly.
 * @property {number} final_index - Position after the blocks correction, in
 * the lane's waiting entries.
 * @property {string|null} before - The waiting entry right before the
 * candidate after the correction; null at the lane head.
 * @property {RelationLine[]} reasons - Constraint relations that decided the
 * place, plus at most one representative adopted `independent`.
 * @property {RelationLine[]} references - 참고 lines: unadopted jev answers
 * whose first choice is not `independent`, at {@link REFERENCE_CONFIDENCE} or
 * above. Never used for placement.
 * @property {RelationLine[]} outside - Constraint relations with candidates
 * this plan does not place (the "함께 넣으려면 전체 배치안" line).
 * @property {PairCounts} pair_counts
 * @property {PlacementWarning[]} warnings
 * @property {boolean} only_unknown - Every relation of the candidate is a jev
 * answer below the adoption confidence.
 * @property {number|null} judged_at - Latest jev answer time among its
 * relations.
 * @property {BundleStep[]} bundle_steps - Every step of its bundle, the same
 * list on each member: what `[적용]` sends and compares (UI-blx2 §3.7).
 * @property {BundleStep[]} pulled - The `move`·`bind` steps of partners this
 * candidate pulled in, drawn under its row; a partner two members share is
 * drawn under the first in apply order.
 */

/**
 * @typedef {Object} PlacementPlan
 * @property {number} revision - The snapshot revision the plan was computed on.
 * @property {PlannedPlacement[]} order - Apply order.
 * @property {PlannedBundle[]} bundles - Apply order.
 * @property {Record<string, PlannedPlacement>} by_id
 * @property {Partial<Record<PlacementLane, string[]>>} layout - Every lane's
 * waiting entries after the whole plan went in, candidates and moved partners
 * included.
 * @property {number} configured_lane_count - The serial lanes the snapshot
 * has.
 * @property {number} lane_count - The serial lanes the plan needs: its highest
 * lane number or the configured count, whichever is larger (UI-lsr4 §3.3).
 */

/**
 * @typedef {Object} PlacementInput
 * @property {any} queue - `worker-queue` snapshot (revision, queue,
 * serial_lanes, serial_lane_count, lane_states, pr_wait, merge_shelved,
 * attempts).
 * @property {Record<string, PlacementRelation>|null|undefined} relations -
 * `placement_relations`.
 * @property {string[]} display_order - Candidate ids in the lane's sort order.
 * @property {Record<string, number>} [priority] - Candidate priority (0..4) by
 * id, the base order's first key; an id without a number sorts after 4.
 * @property {Iterable<string>} chosen - Candidates to place.
 * @property {Iterable<string>} [candidates] - Every placeable candidate; the
 * ones not chosen become `outside` lines. Defaults to the keys of
 * `queue.placement_status`.
 */

/** @type {ReadonlySet<CandidateRelationKind>} */
const CONSTRAINTS = new Set(['c_first', 'x_first', 'conflict']);

/** @type {ReadonlyArray<'s1'|'s2'|'s3'|'s4'|'s5'>} */
const SERIAL_IDS = ['s1', 's2', 's3', 's4', 's5'];

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * @param {unknown} entries
 * @returns {string[]}
 */
function idsOf(entries) {
  return (Array.isArray(entries) ? entries : [])
    .map((/** @type {any} */ entry) => entry && entry.bead_id)
    .filter(
      (/** @type {unknown} */ id) => typeof id === 'string' && id.length > 0
    );
}

/**
 * Orient a small-id relation kind to the candidate `c`.
 *
 * @param {string|null} kind
 * @param {boolean} c_is_a
 * @returns {CandidateRelationKind|null}
 */
function orient(kind, c_is_a) {
  if (kind === 'a_first') {
    return c_is_a ? 'c_first' : 'x_first';
  }
  if (kind === 'b_first') {
    return c_is_a ? 'x_first' : 'c_first';
  }
  if (kind === 'independent' || kind === 'conflict' || kind === 'unknown') {
    return kind;
  }
  return null;
}

/**
 * The bead an adopted preference of a wire relation lands first, or null
 * without one. The server adopts (UI-unf5 §3.3); `prefer` names `a` or `b`.
 *
 * @param {PlacementRelation|undefined} raw
 * @returns {string|null}
 */
function preferredOf(raw) {
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  if (raw.prefer === 'a') {
    return raw.a;
  }
  if (raw.prefer === 'b') {
    return raw.b;
  }
  return null;
}

/**
 * Whether an adopted preference lands `x` before `y`.
 *
 * @param {Record<string, PlacementRelation>} relations
 * @param {string} x
 * @param {string} y
 * @returns {boolean}
 */
function prefersFirst(relations, x, y) {
  return x !== y && preferredOf(relations[placementPairKey(x, y)]) === x;
}

/**
 * The relation between the candidate and another bead, oriented to the
 * candidate, or null when the wire carries none.
 *
 * @param {Record<string, PlacementRelation>} relations
 * @param {string} c
 * @param {string} x
 * @returns {Omit<RelationLine, 'side'|'other_lane'>|null}
 */
function relationBetween(relations, c, x) {
  const raw = relations[placementPairKey(c, x)];
  if (!raw || typeof raw !== 'object') {
    return null;
  }
  const c_is_a = raw.a === c;
  const relation = orient(raw.relation, c_is_a);
  if (relation === null) {
    return null;
  }
  const prefer_first = preferredOf(raw);
  return {
    other: x,
    relation,
    source: raw.source === 'fixed' ? 'fixed' : 'jev',
    ...(raw.basis ? { basis: raw.basis } : {}),
    ...(Array.isArray(raw.overlap) ? { overlap: raw.overlap } : {}),
    ...(raw.overlap_guard === true ? { overlap_guard: true } : {}),
    confidence: typeof raw.confidence === 'number' ? raw.confidence : null,
    jev_choice: orient(raw.jev_choice, c_is_a),
    judged_at: typeof raw.judged_at === 'number' ? raw.judged_at : null,
    ...(prefer_first !== null && typeof raw.prefer_confidence === 'number'
      ? { prefer_first, prefer_confidence: raw.prefer_confidence }
      : {})
  };
}

/**
 * The configured serial lanes, in number order (the `[↴ 대기로]` menu's rule:
 * `serial_lane_count` bounds `serial_lanes`).
 *
 * @param {Record<string, any>} queue
 * @returns {Array<{ id: 's1'|'s2'|'s3'|'s4'|'s5', entries: string[] }>}
 */
function serialLanesOf(queue) {
  const count =
    typeof queue.serial_lane_count === 'number' &&
    Number.isInteger(queue.serial_lane_count) &&
    queue.serial_lane_count > 0
      ? Math.min(queue.serial_lane_count, 5)
      : 0;
  /** @type {Array<{ id: 's1'|'s2'|'s3'|'s4'|'s5', entries: string[] }>} */
  const lanes = [];
  for (const lane of Array.isArray(queue.serial_lanes)
    ? queue.serial_lanes
    : []) {
    if (lanes.length >= count) {
      break;
    }
    if (
      lane &&
      typeof lane.id === 'string' &&
      SERIAL_IDS.includes(/** @type {any} */ (lane.id)) &&
      Array.isArray(lane.entries)
    ) {
      lanes.push({
        id: /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (lane.id),
        entries: idsOf(lane.entries)
      });
    }
  }
  return lanes;
}

/**
 * The number of a serial lane id, 0 for the parallel lane.
 *
 * @param {PlacementLane} lane
 * @returns {number}
 */
export function serialLaneNumber(lane) {
  return lane === 'parallel' ? 0 : Number(lane.slice(1));
}

/**
 * Count every compared pair of a candidate by kind.
 *
 * @param {RelationLine[]} lines
 * @returns {PairCounts}
 */
function pairCountsOf(lines) {
  /** @type {PairCounts} */
  const counts = {
    total: lines.length,
    conflict: 0,
    order: 0,
    independent: 0,
    unknown: 0
  };
  for (const line of lines) {
    if (
      line.relation === 'conflict' ||
      (line.side === 'outside' && CONSTRAINTS.has(line.relation))
    ) {
      counts.conflict += 1;
    } else if (line.relation === 'c_first' || line.relation === 'x_first') {
      counts.order += 1;
    } else if (line.relation === 'independent') {
      counts.independent += 1;
    } else {
      counts.unknown += 1;
    }
  }
  return counts;
}

/**
 * Display rank of a candidate: its place in the sort order, ids the order does
 * not name after it in id order.
 *
 * @param {string[]} display_order
 * @returns {(a: string, b: string) => number}
 */
function byDisplay(display_order) {
  const rank = new Map(display_order.map((id, index) => [id, index]));
  return (a, b) => {
    const ra = rank.has(a) ? Number(rank.get(a)) : Number.MAX_SAFE_INTEGER;
    const rb = rank.has(b) ? Number(rank.get(b)) : Number.MAX_SAFE_INTEGER;
    if (ra !== rb) {
      return ra - rb;
    }
    return a < b ? -1 : a > b ? 1 : 0;
  };
}

/**
 * Base rank of a candidate (UI-unf5 §3.1): priority ascending — an id without
 * a 0..4 priority after 4 — then the display rank, then the id.
 *
 * @param {string[]} display_order
 * @param {Record<string, number>} priority
 * @returns {(a: string, b: string) => number}
 */
function byBase(display_order, priority) {
  const display = byDisplay(display_order);
  /**
   * @param {string} id
   * @returns {number}
   */
  const level = (id) => {
    const value = Object.hasOwn(priority, id) ? priority[id] : null;
    return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= 4
      ? Number(value)
      : 5;
  };
  return (a, b) => level(a) - level(b) || display(a, b);
}

/**
 * The units `start` reaches over both edge kinds, inside `live` only.
 *
 * @param {number} start
 * @param {number[]} live
 * @param {boolean[][]} must
 * @param {boolean[][]} prefer
 * @returns {Set<number>}
 */
function reachableFrom(start, live, must, prefer) {
  const seen = new Set([start]);
  const stack = [start];
  while (stack.length > 0) {
    const from = /** @type {number} */ (stack.pop());
    for (const to of live) {
      if (!seen.has(to) && (must[from][to] || prefer[from][to])) {
        seen.add(to);
        stack.push(to);
      }
    }
  }
  return seen;
}

/**
 * Greedy topological order under mandatory and preferred edges (UI-unf5
 * §3.5). Every step looks only at the units still left (R) and the edges
 * inside R: of the units with no mandatory predecessor in R, the first by tie
 * key with no preferred predecessor in R goes next. When every such unit has
 * one, the preferences run in a cycle; then a unit qualifies when each of its
 * preferred predecessors in R shares its strongly connected component (both
 * edge kinds, inside R), so only the preferences inside the cycle are dropped
 * and one coming in from outside it still holds. Without a mandatory cycle in
 * R such a unit always exists — a mandatory source of a component nothing
 * else in R reaches. A mandatory cycle in R breaks the same way, one unit at
 * a time: the first by tie key with no mandatory predecessor in R, else the
 * first of R by tie key, and `cycle` reports it. Keeping the units already
 * chosen, rather than starting over in tie-key order, is what keeps the
 * prefix property below on a cycle too.
 *
 * Each choice depends on R and the edges inside it only, so dropping a prefix
 * of the order and sorting the rest again gives the rest of the order —
 * `[전체 적용]` recomputes on each reply and relies on it (§3.8).
 *
 * A preference between two units a mandatory edge already relates is dropped:
 * mandatory order decides that pair, and a contradicting preference must not
 * pull an unrelated unit into a cycle with it.
 *
 * @template T
 * @param {T[]} units - In tie-key order.
 * @param {(u: T, v: T) => boolean} mustBefore - `u` must land before `v`.
 * @param {(u: T, v: T) => boolean} preferBefore - `u` is better landed before
 * `v`.
 * @returns {{ order: T[], cycle: boolean }}
 */
function softOrder(units, mustBefore, preferBefore) {
  /** @type {boolean[][]} */
  const must = units.map((u, i) =>
    units.map((v, j) => i !== j && mustBefore(u, v))
  );
  /** @type {boolean[][]} */
  const prefer = units.map((u, i) =>
    units.map(
      (v, j) => i !== j && !must[i][j] && !must[j][i] && preferBefore(u, v)
    )
  );
  /** @type {number[]} */
  let rest = units.map((_, i) => i);
  /** @type {T[]} */
  const order = [];
  let cycle = false;
  while (rest.length > 0) {
    const live = rest;
    const possible = live.filter((j) => !live.some((i) => must[i][j]));
    let next = possible.find((j) => !live.some((i) => prefer[i][j]));
    if (next === undefined) {
      next = possible.find((j) => {
        const back = reachableFrom(j, live, must, prefer);
        return live.every((i) => !prefer[i][j] || back.has(i));
      });
    }
    if (next === undefined) {
      cycle = true;
      next = possible.length > 0 ? possible[0] : live[0];
    }
    const chosen = next;
    order.push(units[chosen]);
    rest = live.filter((i) => i !== chosen);
  }
  return { order, cycle };
}

/**
 * Compute the placement plan.
 *
 * @param {PlacementInput} input
 * @returns {PlacementPlan}
 */
export function computePlacement(input) {
  const queue = objectOf(input.queue);
  const relations = /** @type {Record<string, PlacementRelation>} */ (
    objectOf(input.relations)
  );
  const compare = byBase(input.display_order, objectOf(input.priority));
  const chosen = [...new Set(input.chosen)].sort(compare);
  const chosen_set = new Set(chosen);
  const candidates = new Set(
    input.candidates
      ? [...input.candidates]
      : Object.keys(objectOf(queue.placement_status))
  );

  // The simulated waiting lanes and the lane occupants (which stand before
  // every waiting entry of their lane: they already run or wait on a PR).
  /** @type {Map<PlacementLane, string[]>} */
  const lanes = new Map([['parallel', idsOf(queue.queue)]]);
  /** @type {Map<string, PlacementLane>} */
  const occupant_lane = new Map();
  const serial = serialLanesOf(queue);
  const lane_states = objectOf(queue.lane_states);
  for (const lane of serial) {
    lanes.set(lane.id, [...lane.entries]);
    const occupied = objectOf(lane_states[lane.id]).occupied_by;
    for (const id of Array.isArray(occupied) ? occupied : []) {
      if (typeof id === 'string') {
        occupant_lane.set(id, lane.id);
      }
    }
  }
  // Occupants of lanes beyond the configured count (`hidden` lane states) weigh
  // only on which new lane opens; everything else reads them where it reads
  // any other running bead.
  /** @type {Map<PlacementLane, number>} */
  const hidden_load = new Map();
  for (const id of SERIAL_IDS) {
    const state = objectOf(lane_states[id]);
    if (state.hidden !== true || serial.some((lane) => lane.id === id)) {
      continue;
    }
    const occupied = Array.isArray(state.occupied_by) ? state.occupied_by : [];
    hidden_load.set(
      id,
      occupied.filter((/** @type {unknown} */ x) => typeof x === 'string')
        .length
    );
  }
  /** @type {Map<string, number>} */
  const done_at_by_bead = new Map();
  for (const entry of Array.isArray(queue.done) ? queue.done : []) {
    if (
      entry &&
      typeof entry.bead_id === 'string' &&
      typeof entry.added_at === 'number'
    ) {
      done_at_by_bead.set(entry.bead_id, entry.added_at);
    }
  }
  // The server's comparison set (`placementFor`): the 실행중 winners of
  // `activeAttemptStates` and the `pr_wait` entries not shelved — a shelved
  // entry (`merge_shelved`) holds no lane, so it constrains nothing. One
  // without a serial lane occupancy stands in the parallel lane.
  const shelved = objectOf(queue.merge_shelved);
  for (const id of [
    ...idsOf(queue.pr_wait).filter((id) => !Object.hasOwn(shelved, id)),
    ...activeBeadIds(objectOf(queue.attempts), done_at_by_bead)
  ]) {
    if (!occupant_lane.has(id)) {
      occupant_lane.set(id, 'parallel');
    }
  }
  // What the store's `place-bundle` would take each bead as (UI-blx2 §3.1):
  // a bead it refuses as a step — running, paused, a latest failure, `parked`,
  // `retry_wait`, PR 대기 — is an occupant even when a waiting row of it stays.
  const occupancy = occupancyReader(queue, done_at_by_bead);

  /**
   * Whether a bead occupies a lane now: the store's step refusal, or a bind
   * an earlier bundle of this plan made.
   *
   * @param {string} id
   * @returns {boolean}
   */
  const isOccupant = (id) => occupant_lane.has(id) || occupancy(id).occupant;

  /**
   * The serial lane an occupant holds now, or null for a lane-less one.
   *
   * @param {string} id
   * @returns {PlacementLane|null}
   */
  const heldLaneOf = (id) => {
    const at = occupant_lane.get(id);
    if (at && at !== 'parallel') {
      return at;
    }
    return /** @type {PlacementLane|null} */ (occupancy(id).held_lane);
  };

  /**
   * Where a bead stands now: its lane and its index among that lane's waiting
   * entries; -1 for an occupant. The members are the server's comparison set
   * — waiting rows and `occupant_lane` — and occupancy is read before the
   * waiting arrays (UI-blx2 §3.1): a Worker-started run, a latest failure or a
   * `retry_wait` keeps its waiting row and is still an occupant.
   *
   * @param {string} id
   * @returns {{ lane: PlacementLane, index: number }|null}
   */
  const locate = (id) => {
    /** @type {{ lane: PlacementLane, index: number }|null} */
    let waiting = null;
    for (const [lane, entries] of lanes) {
      const index = entries.indexOf(id);
      if (index >= 0) {
        waiting = { lane, index };
        break;
      }
    }
    if (occupant_lane.has(id) || (waiting !== null && isOccupant(id))) {
      return { lane: heldLaneOf(id) || 'parallel', index: -1 };
    }
    return waiting;
  };

  /** @type {Map<string, RelationLine[]>} */
  const lines_by_candidate = new Map();
  for (const c of chosen) {
    /** @type {RelationLine[]} */
    const lines = [];
    for (const key of Object.keys(relations)) {
      const raw = relations[key];
      if (!raw || (raw.a !== c && raw.b !== c)) {
        continue;
      }
      const x = raw.a === c ? raw.b : raw.a;
      const line = relationBetween(relations, c, x);
      if (!line) {
        continue;
      }
      if (chosen_set.has(x)) {
        lines.push({ ...line, side: 'chosen', other_lane: null });
      } else if (candidates.has(x)) {
        lines.push({ ...line, side: 'outside', other_lane: null });
      } else {
        const at = locate(x);
        if (at) {
          lines.push({ ...line, side: 'member', other_lane: at.lane });
        }
      }
    }
    lines.sort((p, q) => (p.other < q.other ? -1 : p.other > q.other ? 1 : 0));
    lines_by_candidate.set(c, lines);
  }

  /**
   * @param {string} c
   * @param {string} x
   * @returns {CandidateRelationKind|null}
   */
  const kindOf = (c, x) => relationBetween(relations, c, x)?.relation ?? null;

  // A candidate that blocks a waiting or lane-occupying item goes to the parallel
  // lane alone (UI-ey6v §3.4): in that item's serial lane its occupancy could
  // keep the candidate from ever starting, and the `blocks` edge already keeps
  // the order. Only such a member relation counts: a chosen or outside partner
  // holds no lane, so a full_plan group keeps its in-lane order.
  /** @type {Set<string>} */
  const predecessors = new Set(
    chosen.filter((c) =>
      /** @type {RelationLine[]} */ (lines_by_candidate.get(c)).some(
        (line) =>
          line.side === 'member' &&
          line.basis === 'blocks' &&
          line.relation === 'c_first'
      )
    )
  );

  /**
   * A candidate's partners (UI-blx2 §3.1): the waiting and lane-occupying
   * items it is constrained against other than by `blocks` alone — the edge
   * already keeps a `blocks` pair apart.
   *
   * @param {string} c
   * @returns {RelationLine[]}
   */
  const partnerLines = (c) =>
    /** @type {RelationLine[]} */ (lines_by_candidate.get(c)).filter(
      (line) =>
        line.side === 'member' &&
        CONSTRAINTS.has(line.relation) &&
        line.basis !== 'blocks'
    );

  /**
   * Whether `x` directly blocks other work: another waiting or lane-occupying
   * item, or a chosen candidate. Pulled into a lane, such a prerequisite could
   * wait behind an occupant that waits on it (UI-ey6v). Chosen candidates
   * count too so the answer is the same before and after earlier bundles of
   * `[전체 적용]` turn them into waiting items.
   *
   * @param {string} x
   * @returns {boolean}
   */
  const blocksOtherWork = (x) => {
    for (const raw of Object.values(relations)) {
      if (!raw || raw.source !== 'fixed' || raw.basis !== 'blocks') {
        continue;
      }
      /** @type {string|null} */
      let blockee = null;
      if (
        raw.a === x &&
        (raw.relation === 'a_first' || raw.relation === 'conflict')
      ) {
        blockee = raw.b;
      } else if (
        raw.b === x &&
        (raw.relation === 'b_first' || raw.relation === 'conflict')
      ) {
        blockee = raw.a;
      }
      if (
        blockee !== null &&
        blockee !== x &&
        (chosen_set.has(blockee) ||
          (!candidates.has(blockee) && locate(blockee) !== null))
      ) {
        return true;
      }
    }
    return false;
  };

  /**
   * The class of a partner (UI-blx2 §3.1), fixed for the whole plan: `move` —
   * waiting and not an occupant; `bind` — a lane-less occupant the store would
   * bind; `fixed` — holds a serial lane; `excluded` — blocks other work;
   * `stuck` — an occupant the store would neither move nor bind.
   *
   * @type {Map<string, 'move'|'bind'|'fixed'|'excluded'|'stuck'>}
   */
  const partner_class = new Map();
  /**
   * @param {string} x
   * @returns {'move'|'bind'|'fixed'|'excluded'|'stuck'}
   */
  const classOf = (x) => {
    const known = partner_class.get(x);
    if (known) {
      return known;
    }
    /** @type {'move'|'bind'|'fixed'|'excluded'|'stuck'} */
    let kind = 'stuck';
    if (blocksOtherWork(x)) {
      kind = 'excluded';
    } else if (!isOccupant(x)) {
      kind = 'move';
    } else if (heldLaneOf(x) !== null) {
      kind = 'fixed';
    } else if (occupancy(x).bindable) {
      kind = 'bind';
    }
    partner_class.set(x, kind);
    return kind;
  };

  // Bundles: chosen candidates joined by a constraint relation, and those
  // that pull the same partner (UI-blx2 §3.2). A predecessor pulls nothing.
  /** @type {Map<string, string>} */
  const parent = new Map(chosen.map((id) => [id, id]));
  /**
   * @param {string} id
   * @returns {string}
   */
  const find = (id) => {
    let root = id;
    while (parent.get(root) !== root) {
      root = /** @type {string} */ (parent.get(root));
    }
    return root;
  };
  /**
   * @param {string} a
   * @param {string} b
   */
  const join = (a, b) => {
    const ra = find(a);
    const rb = find(b);
    if (ra !== rb) {
      parent.set(rb, ra);
    }
  };
  /** @type {Map<string, string>} */
  const first_puller = new Map();
  for (const c of chosen) {
    if (predecessors.has(c)) {
      continue;
    }
    for (const line of /** @type {RelationLine[]} */ (
      lines_by_candidate.get(c)
    )) {
      if (
        line.side === 'chosen' &&
        CONSTRAINTS.has(line.relation) &&
        !predecessors.has(line.other)
      ) {
        join(c, line.other);
      }
    }
    for (const line of partnerLines(c)) {
      const kind = classOf(line.other);
      if (kind !== 'move' && kind !== 'bind') {
        continue;
      }
      const first = first_puller.get(line.other);
      if (first === undefined) {
        first_puller.set(line.other, c);
      } else {
        join(first, c);
      }
    }
  }
  /** @type {Map<string, string[]>} */
  const bundle_members = new Map();
  for (const c of chosen) {
    const root = find(c);
    const list = bundle_members.get(root) || [];
    list.push(c);
    bundle_members.set(root, list);
  }
  // `chosen` is in base order, so every member list is too, and a bundle's
  // tie key is its first member's base rank. Predecessors apply last: once
  // queued, one is a member to the candidates still waiting, and a chosen
  // blocker of it would turn predecessor mid-batch and stop `[전체 적용]` with
  // `moved`. Applied after them it never reads as one. Each group is sorted on
  // its own (UI-unf5 §3.6): a member's `c_first` toward another bundle's
  // member is a mandatory edge — between predecessors, which are never
  // joined — and an adopted preference between members a preferred one. A
  // mandatory cycle is broken by the base order, without a warning.
  const bundles = [false, true].flatMap(
    (trailing) =>
      softOrder(
        [...bundle_members.values()]
          .filter((members) => predecessors.has(members[0]) === trailing)
          .sort((p, q) => compare(p[0], q[0])),
        (p, q) => p.some((c) => q.some((x) => kindOf(c, x) === 'c_first')),
        (p, q) => p.some((c) => q.some((x) => prefersFirst(relations, c, x)))
      ).order
  );

  /**
   * Waiting entries plus occupants of one serial lane.
   *
   * @param {PlacementLane} lane
   * @returns {number}
   */
  const loadOf = (lane) => {
    const ids = new Set(lanes.get(lane) || []);
    for (const [id, at] of occupant_lane) {
      if (at === lane) {
        ids.add(id);
      }
    }
    return ids.size;
  };

  /**
   * The least loaded of all five serial lanes, lowest number first on a tie
   * (UI-lsr4 §3.3): an empty configured lane before a new one, a new one
   * before a busy configured one. A lane beyond the configured count has no
   * waiting entries of its own, only hidden occupants and this plan's own
   * candidates. A snapshot without serial lanes keeps the parallel lane.
   *
   * @returns {PlacementLane}
   */
  const emptiestSerial = () => {
    if (serial.length === 0) {
      return 'parallel';
    }
    /** @type {PlacementLane} */
    let best = 'parallel';
    let best_load = Number.POSITIVE_INFINITY;
    for (const id of SERIAL_IDS) {
      const load = loadOf(id) + (hidden_load.get(id) || 0);
      if (load < best_load) {
        best = id;
        best_load = load;
      }
    }
    return best;
  };

  /**
   * Blocks edges among one lane's ids: every fixed `blocks` relation whose two
   * ends are both in the lane — the in-lane member edges and the candidate's
   * own edges, which is what the store's `place` reads for the incoming bead.
   *
   * @param {string[]} ids
   * @returns {{ blocker: string, blockee: string }[]}
   */
  const edgesAmong = (ids) => {
    const in_lane = new Set(ids);
    /** @type {{ blocker: string, blockee: string }[]} */
    const edges = [];
    for (const raw of Object.values(relations)) {
      if (
        !raw ||
        raw.source !== 'fixed' ||
        raw.basis !== 'blocks' ||
        !in_lane.has(raw.a) ||
        !in_lane.has(raw.b)
      ) {
        continue;
      }
      if (raw.relation === 'a_first' || raw.relation === 'conflict') {
        edges.push({ blocker: raw.a, blockee: raw.b });
      }
      if (raw.relation === 'b_first' || raw.relation === 'conflict') {
        edges.push({ blocker: raw.b, blockee: raw.a });
      }
    }
    return edges;
  };

  /**
   * Whether the candidate's in-lane constraints hold in `order`. A conflict
   * with another step of its own bundle (`steps`) orders nothing: the serial
   * lane already keeps the two apart, whichever goes first.
   *
   * @param {string} c
   * @param {string[]} order
   * @param {PlacementLane} lane
   * @param {Set<string>} steps
   * @returns {boolean}
   */
  const constraintsHold = (c, order, lane, steps) => {
    const own = order.indexOf(c);
    for (const x of order) {
      if (x === c) {
        continue;
      }
      const kind = kindOf(c, x);
      const at = order.indexOf(x);
      if (kind === 'conflict' && steps.has(x)) {
        continue;
      }
      if ((kind === 'x_first' || kind === 'conflict') && at > own) {
        return false;
      }
      if (kind === 'c_first' && at < own) {
        return false;
      }
    }
    for (const [x, at] of occupant_lane) {
      if (at === lane && !order.includes(x) && kindOf(c, x) === 'c_first') {
        return false;
      }
    }
    return true;
  };

  /**
   * The occupants of one lane, this plan's binds included.
   *
   * @param {PlacementLane} lane
   * @returns {string[]}
   */
  const occupantsOf = (lane) =>
    [...occupant_lane].filter(([, at]) => at === lane).map(([id]) => id);

  /**
   * Whether `x` is directly blocked by an item waiting in `lane`: bound
   * there, it would hold the lane its own prerequisite needs (§3.1 제외).
   *
   * @param {string} x
   * @param {PlacementLane} lane
   * @returns {boolean}
   */
  const waitsInLane = (x, lane) =>
    (lanes.get(lane) || []).some((w) => {
      const line = w === x ? null : relationBetween(relations, x, w);
      return (
        !!line &&
        line.basis === 'blocks' &&
        (line.relation === 'x_first' || line.relation === 'conflict')
      );
    });

  /**
   * The lane holding the most K items by `count`, lowest number on a tie.
   *
   * @param {Iterable<PlacementLane>} choices
   * @param {(lane: PlacementLane) => number} count
   * @returns {PlacementLane}
   */
  const busiest = (choices, count) =>
    [...choices].sort(
      (p, q) => count(q) - count(p) || serialLaneNumber(p) - serialLaneNumber(q)
    )[0];

  /**
   * Queue order of a waiting item: the parallel lane first, then serial lanes
   * by number, each by index (§3.3 tie rule for moves).
   *
   * @param {string} id
   * @returns {number}
   */
  const queueRank = (id) => {
    const at = locate(id);
    return at ? serialLaneNumber(at.lane) * 10_000 + at.index : 0;
  };

  /** @type {PlannedPlacement[]} */
  const order = [];
  /** @type {PlannedBundle[]} */
  const planned_bundles = [];
  let step_number = 0;
  bundles.forEach((members, bundle_index) => {
    const predecessor_bundle = predecessors.has(members[0]);
    // K: the waiting and lane-occupying items a member is constrained against,
    // `blocks` lines included — those choose a lane but are never pulled.
    /** @type {string[]} */
    const k_ids = [];
    /** @type {string[]} */
    const pulls = [];
    for (const c of members) {
      for (const line of /** @type {RelationLine[]} */ (
        lines_by_candidate.get(c)
      )) {
        if (
          line.side === 'member' &&
          CONSTRAINTS.has(line.relation) &&
          !k_ids.includes(line.other)
        ) {
          k_ids.push(line.other);
        }
      }
      if (predecessor_bundle) {
        continue;
      }
      for (const line of partnerLines(c)) {
        const kind = classOf(line.other);
        if (
          (kind === 'move' || kind === 'bind') &&
          !pulls.includes(line.other)
        ) {
          pulls.push(line.other);
        }
      }
    }

    /** @type {PlacementLane} */
    let lane = 'parallel';
    if (!predecessor_bundle) {
      const k_at = k_ids
        .map((id) => ({ id, at: locate(id) }))
        .filter((item) => item.at !== null)
        .map((item) => ({
          id: item.id,
          at: /** @type {{ lane: PlacementLane, index: number }} */ (item.at)
        }));
      // §3.2 step 1: the serial lanes of K items that will not move — the
      // occupants and the excluded items waiting there.
      /** @type {Set<PlacementLane>} */
      const anchors = new Set();
      /** @type {Set<PlacementLane>} */
      const waiting_lanes = new Set();
      for (const item of k_at) {
        if (item.at.lane === 'parallel') {
          continue;
        }
        if (item.at.index < 0 || classOf(item.id) === 'excluded') {
          anchors.add(item.at.lane);
        } else {
          waiting_lanes.add(item.at.lane);
        }
      }
      if (anchors.size > 0) {
        lane = busiest(
          anchors,
          (choice) => k_at.filter((item) => item.at.lane === choice).length
        );
      } else if (waiting_lanes.size > 0) {
        // Step 2: the lane where most of K already waits — the fewest moves.
        lane = busiest(
          waiting_lanes,
          (choice) =>
            k_at.filter((item) => item.at.lane === choice && item.at.index >= 0)
              .length
        );
      } else {
        // Step 3: a lone member with nothing to pull and no constraint with a
        // candidate this plan leaves out stays parallel. Otherwise — that
        // partner, recommended later, follows it through K — the emptiest
        // serial lane, which also has no occupant to bind against.
        const needs_serial =
          members.length > 1 ||
          pulls.length > 0 ||
          members.some((c) =>
            /** @type {RelationLine[]} */ (lines_by_candidate.get(c)).some(
              (line) =>
                line.side === 'outside' && CONSTRAINTS.has(line.relation)
            )
          );
        lane = needs_serial ? emptiestSerial() : 'parallel';
      }
    }

    // Binds (§3.1): one per lane, only into a lane nothing occupies, and not
    // for a partner waiting on an item waiting in that lane.
    /** @type {string|null} */
    let bound = null;
    /** @type {Map<string, UncoveredReason>} */
    const held_back = new Map();
    if (lane !== 'parallel') {
      for (const x of pulls) {
        if (classOf(x) !== 'bind') {
          continue;
        }
        if (waitsInLane(x, lane)) {
          held_back.set(x, 'waits_in_lane');
        } else if (
          bound !== null ||
          occupantsOf(lane).length > 0 ||
          (hidden_load.get(lane) || 0) > 0
        ) {
          held_back.set(x, 'lane_occupied');
        } else {
          bound = x;
        }
      }
    }
    const lane_now = new Set(lanes.get(lane) || []);
    const moves =
      lane === 'parallel'
        ? []
        : pulls
            .filter((x) => classOf(x) === 'move' && !lane_now.has(x))
            .sort((p, q) => queueRank(p) - queueRank(q));
    /** @type {Map<string, { lane: PlacementLane, index: number }>} */
    const move_from = new Map(
      moves.map((x) => [
        x,
        /** @type {{ lane: PlacementLane, index: number }} */ (locate(x))
      ])
    );
    // §3.3, UI-unf5 §3.5: mandatory order, then adopted preferences, then the
    // tie key — moves first in queue order, then the candidates in base order.
    const sorted = softOrder(
      [...moves, ...members],
      (u, v) => kindOf(u, v) === 'c_first',
      (u, v) => prefersFirst(relations, u, v)
    );
    const step_ids = new Set(sorted.order);

    // The store's write order: the bound bead's waiting row leaves every
    // lane first, every step is spliced in turn, one blocks correction runs,
    // and the bound row goes back at the lane head.
    let bound_row = false;
    if (bound !== null) {
      const bound_id = bound;
      for (const [at_lane, row_ids] of lanes) {
        if (row_ids.includes(bound_id)) {
          bound_row = true;
          lanes.set(
            at_lane,
            row_ids.filter((id) => id !== bound_id)
          );
        }
      }
      occupant_lane.set(bound_id, lane);
    }
    for (const x of moves) {
      const from = /** @type {{ lane: PlacementLane, index: number }} */ (
        move_from.get(x)
      );
      lanes.set(
        from.lane,
        /** @type {string[]} */ (lanes.get(from.lane)).filter((id) => id !== x)
      );
    }
    /** @type {string[]} */
    const entries = [...(lanes.get(lane) || [])];
    /** @type {Map<string, number>} */
    const splice_index = new Map();
    /** @type {Map<string, Set<string>>} */
    const present_at = new Map();
    /** @type {Map<string, PlacementWarning[]>} */
    const warnings_of = new Map();
    for (const y of sorted.order) {
      /** @type {PlacementWarning[]} */
      const warnings = sorted.cycle ? [{ code: 'order_cycle' }] : [];
      let index = entries.length;
      if (lane !== 'parallel') {
        let lower = 0;
        let upper = entries.length;
        let has_upper = false;
        for (const x of new Set([...entries, ...occupantsOf(lane)])) {
          // A cyclic bundle's cycle is broken by tie key (§4.6), so its
          // steps' relations to each other set no bound.
          if (x === y || (sorted.cycle && step_ids.has(x))) {
            continue;
          }
          const kind = kindOf(y, x);
          // A conflict between two steps of this bundle orders nothing: the
          // serial lane keeps them apart either way. As a bound it would let
          // the step order — a preference included — push a step with an
          // upper bound behind a waiting item (UI-unf5 §3.7).
          if (
            kind === null ||
            !CONSTRAINTS.has(kind) ||
            (kind === 'conflict' && step_ids.has(x))
          ) {
            continue;
          }
          const at = entries.indexOf(x);
          if (kind === 'c_first') {
            upper = has_upper ? Math.min(upper, at) : at;
            has_upper = true;
          } else {
            lower = Math.max(lower, at + 1);
          }
        }
        // The LATEST index the bounds allow: right before the first `c_first`
        // item, else the lane tail. Never jumping ahead of unrelated waiting
        // entries is what keeps an empty-K bundle appended in bundle order
        // (§4.6) and what lets `[전체 적용]` recompute the remaining bundles
        // on each reply and land on the table's places.
        if (has_upper && lower > upper) {
          warnings.push({ code: 'order_unsatisfiable' });
          index = entries.length;
        } else if (has_upper) {
          index = upper;
        }
      }
      entries.splice(index, 0, y);
      splice_index.set(y, index);
      present_at.set(y, new Set(entries));
      warnings_of.set(y, warnings);
    }
    let final_order = entries;
    if (lane !== 'parallel') {
      const topo = orderLaneByBlocks(entries, edgesAmong(entries));
      if (!topo.cycle) {
        final_order = topo.order;
      }
      for (const c of members) {
        const warnings = /** @type {PlacementWarning[]} */ (warnings_of.get(c));
        const present = /** @type {Set<string>} */ (present_at.get(c));
        const spliced = entries.filter((id) => present.has(id));
        if (
          !warnings.some((w) => w.code === 'order_unsatisfiable') &&
          constraintsHold(c, spliced, lane, step_ids) &&
          !constraintsHold(
            c,
            final_order.filter((id) => present.has(id)),
            lane,
            step_ids
          )
        ) {
          warnings.push({ code: 'blocks_reordered' });
        }
      }
      if (bound_row && bound !== null) {
        final_order = [bound, ...final_order];
      }
    }
    lanes.set(lane, final_order);

    /** @type {BundleStep[]} */
    const steps = [];
    if (bound !== null) {
      steps.push({
        kind: 'bind',
        id: bound,
        from_lane: null,
        from_index: null,
        from_state: occupancy(bound).state,
        index: null,
        final_index: null,
        before: null,
        number: null
      });
    }
    for (const y of sorted.order) {
      const final_index = final_order.indexOf(y);
      const from = move_from.get(y);
      step_number += 1;
      steps.push({
        kind: from ? 'move' : 'place',
        id: y,
        from_lane: from ? from.lane : null,
        from_index: from ? from.index : null,
        from_state: null,
        index: /** @type {number} */ (splice_index.get(y)),
        final_index,
        before: final_index > 0 ? final_order[final_index - 1] : null,
        number: step_number
      });
    }
    const placed_members = sorted.order.filter((id) => !move_from.has(id));
    planned_bundles.push({
      bundle: bundle_index,
      lane,
      members: placed_members,
      steps
    });
    /** @type {Map<string, BundleStep[]>} */
    const pulled_by = new Map();
    for (const step of steps) {
      if (step.kind === 'place') {
        continue;
      }
      const owner = placed_members.find((c) =>
        partnerLines(c).some((line) => line.other === step.id)
      );
      if (owner !== undefined) {
        pulled_by.set(owner, [...(pulled_by.get(owner) || []), step]);
      }
    }

    for (const c of placed_members) {
      const step = /** @type {BundleStep} */ (
        steps.find((item) => item.id === c)
      );
      const warnings = /** @type {PlacementWarning[]} */ (warnings_of.get(c));
      const lines = /** @type {RelationLine[]} */ (lines_by_candidate.get(c));
      for (const line of lines) {
        // A `blocks` line never runs concurrently: the edge keeps the order.
        if (line.basis === 'blocks' || !CONSTRAINTS.has(line.relation)) {
          continue;
        }
        if (predecessor_bundle) {
          if (line.side !== 'outside') {
            warnings.push({
              code: 'predecessor_parallel',
              other: line.other,
              ...(line.other_lane ? { other_lane: line.other_lane } : {})
            });
          }
          continue;
        }
        if (line.side !== 'member' || line.other === bound) {
          continue;
        }
        const at = locate(line.other);
        const there = at ? at.lane : line.other_lane || 'parallel';
        if (lane !== 'parallel' && there === lane) {
          continue;
        }
        const kind = classOf(line.other);
        /** @type {UncoveredReason|null} */
        let reason = held_back.get(line.other) ?? null;
        if (reason === null) {
          if (kind === 'fixed') {
            reason = 'occupied_other_lane';
          } else if (kind === 'excluded') {
            reason = 'predecessor';
          } else if (kind === 'stuck') {
            // An external PR-wait row is no store record the store could bind.
            reason = occupancy(line.other).bind_refusal ?? 'not_holdable';
          } else if (lane === 'parallel') {
            // A move or bind partner stays out only when the bundle kept the
            // parallel lane: a snapshot without serial lanes.
            reason = 'no_serial_lane';
          }
        }
        warnings.push({
          code: 'uncovered',
          other: line.other,
          other_lane: there,
          ...(reason ? { reason } : {})
        });
      }
      const constraint_lines = lines.filter(
        (line) => line.side !== 'outside' && CONSTRAINTS.has(line.relation)
      );
      const independent = lines
        .filter(
          (line) =>
            line.side !== 'outside' &&
            line.relation === 'independent' &&
            line.source === 'jev'
        )
        .sort((p, q) => Number(q.confidence) - Number(p.confidence))[0];
      const judged = lines
        .map((line) => line.judged_at)
        .filter((at) => typeof at === 'number');
      order.push({
        id: c,
        number: /** @type {number} */ (step.number),
        bundle: bundle_index,
        lane,
        index: /** @type {number} */ (step.index),
        final_index: /** @type {number} */ (step.final_index),
        before: step.before,
        reasons: independent
          ? [...constraint_lines, independent]
          : constraint_lines,
        references: lines.filter(
          (line) =>
            line.relation === 'unknown' &&
            line.jev_choice !== null &&
            line.jev_choice !== 'independent' &&
            typeof line.confidence === 'number' &&
            line.confidence >= REFERENCE_CONFIDENCE
        ),
        outside: lines.filter(
          (line) => line.side === 'outside' && CONSTRAINTS.has(line.relation)
        ),
        pair_counts: pairCountsOf(lines),
        warnings,
        only_unknown:
          lines.length > 0 &&
          lines.every((line) => line.relation === 'unknown'),
        judged_at: judged.length > 0 ? Math.max(...judged) : null,
        bundle_steps: steps,
        pulled: pulled_by.get(c) || []
      });
    }
  });

  return {
    revision: typeof queue.revision === 'number' ? queue.revision : 0,
    order,
    bundles: planned_bundles,
    by_id: Object.fromEntries(order.map((item) => [item.id, item])),
    layout: Object.fromEntries(lanes),
    configured_lane_count: serial.length,
    lane_count: Math.max(
      serial.length,
      ...order.map((item) => serialLaneNumber(item.lane))
    )
  };
}

/**
 * Whether two computed places are the same final place: the lane and the
 * waiting entry right before the candidate (§4.7 — the CAS resend rule).
 *
 * @param {Pick<PlannedPlacement, 'lane'|'before'>|null|undefined} a
 * @param {Pick<PlannedPlacement, 'lane'|'before'>|null|undefined} b
 * @returns {boolean}
 */
export function samePlace(a, b) {
  return !!a && !!b && a.lane === b.lane && a.before === b.before;
}

/**
 * Whether two computed bundles are the same send (UI-blx2 §3.7): the same
 * lane and every step the same kind, id and entry right before. For a lone
 * candidate it is {@link samePlace}.
 *
 * @param {Pick<PlannedPlacement, 'lane'|'bundle_steps'>|null|undefined} a
 * @param {Pick<PlannedPlacement, 'lane'|'bundle_steps'>|null|undefined} b
 * @returns {boolean}
 */
export function sameBundle(a, b) {
  if (
    !a ||
    !b ||
    a.lane !== b.lane ||
    !Array.isArray(a.bundle_steps) ||
    !Array.isArray(b.bundle_steps) ||
    a.bundle_steps.length !== b.bundle_steps.length
  ) {
    return false;
  }
  const other = b.bundle_steps;
  return a.bundle_steps.every(
    (step, at) =>
      step.kind === other[at].kind &&
      step.id === other[at].id &&
      step.before === other[at].before
  );
}

/**
 * Whether a computed bundle is one candidate and nothing else — the bundle
 * `worker-queue-place` carries; every other goes as one `place-bundle`.
 *
 * @param {Pick<PlannedPlacement, 'bundle_steps'>} placement
 * @returns {boolean}
 */
export function isLonePlace(placement) {
  const steps = placement.bundle_steps;
  return steps.length === 1 && steps[0].kind === 'place';
}
