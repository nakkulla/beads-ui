/**
 * Placement computation of the Worker queue recommendation (UI-izba §4.6).
 *
 * Pure and deterministic: the same queue snapshot, pair relations, candidate
 * display order and chosen set always give the same plan. The browser runs it
 * because the display order is a per-browser `localStorage` preference the
 * server cannot see, and because a preview computed from the very snapshot a
 * `[적용]` carries as its `expected_revision` cannot disagree with it.
 *
 * The plan is a SIMULATION of the store: candidates go in one at a time in the
 * apply order, every serial-lane insertion is followed by the store's own
 * `orderLaneByBlocks` correction, and the next candidate is placed on that
 * result. Recomputing on the snapshot a send produced therefore yields the same
 * position for the remaining candidates when nothing else moved.
 *
 * @import { PlacementRelation } from '../../../server/placement/wire.js'
 */
import {
  REFERENCE_CONFIDENCE,
  placementPairKey
} from '../../../server/placement/wire.js';
import { activeBeadIds } from '../active-attempts.js';
import { orderLaneByBlocks } from './lane-order.js';

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
 */

/**
 * Every pair the candidate was compared on, by kind (UI-lsr4 §3.4): `total`
 * counts them all; a constraint with an unplaced candidate counts as
 * `conflict`.
 *
 * @typedef {{ total: number, conflict: number, order: number, independent: number, unknown: number }} PairCounts
 */

/**
 * @typedef {'order_cycle'|'order_unsatisfiable'|'uncovered'|'blocks_reordered'} PlacementWarningCode
 * @typedef {{ code: PlacementWarningCode, other?: string, other_lane?: PlacementLane }} PlacementWarning
 */

/**
 * One candidate's place in the plan.
 *
 * @typedef {Object} PlannedPlacement
 * @property {string} id
 * @property {number} number - 1-based apply order; also the number drawn.
 * @property {number} bundle - 0-based bundle order.
 * @property {PlacementLane} lane
 * @property {number} index - The `worker-queue-place` index: where the store
 * splices the entry BEFORE its blocks correction, so the store reproduces
 * `final_index` exactly.
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
 */

/**
 * @typedef {Object} PlacementPlan
 * @property {number} revision - The snapshot revision the plan was computed on.
 * @property {PlannedPlacement[]} order - Apply order.
 * @property {Record<string, PlannedPlacement>} by_id
 * @property {Partial<Record<PlacementLane, string[]>>} layout - Every lane's
 * waiting entries after the whole plan went in, candidates included.
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
  return {
    other: x,
    relation,
    source: raw.source === 'fixed' ? 'fixed' : 'jev',
    ...(raw.basis ? { basis: raw.basis } : {}),
    ...(Array.isArray(raw.overlap) ? { overlap: raw.overlap } : {}),
    ...(raw.overlap_guard === true ? { overlap_guard: true } : {}),
    confidence: typeof raw.confidence === 'number' ? raw.confidence : null,
    jev_choice: orient(raw.jev_choice, c_is_a),
    judged_at: typeof raw.judged_at === 'number' ? raw.judged_at : null
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
 * Topological order of one bundle under `c_first`/`x_first`, display order
 * breaking ties. A cycle keeps the display order.
 *
 * @param {string[]} members - Display-ordered.
 * @param {(c: string, x: string) => CandidateRelationKind|null} kindOf
 * @returns {{ order: string[], cycle: boolean }}
 */
function bundleOrder(members, kindOf) {
  /** @type {Map<string, Set<string>>} */
  const before = new Map(members.map((id) => [id, new Set()]));
  for (const c of members) {
    for (const x of members) {
      if (c !== x && kindOf(c, x) === 'x_first') {
        /** @type {Set<string>} */ (before.get(c)).add(x);
      }
    }
  }
  /** @type {string[]} */
  const order = [];
  const emitted = new Set();
  while (order.length < members.length) {
    const next = members.find(
      (id) =>
        !emitted.has(id) &&
        [.../** @type {Set<string>} */ (before.get(id))].every((x) =>
          emitted.has(x)
        )
    );
    if (next === undefined) {
      return { order: [...members], cycle: true };
    }
    emitted.add(next);
    order.push(next);
  }
  return { order, cycle: false };
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
  const compare = byDisplay(input.display_order);
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

  /**
   * Where a bead stands now: its lane and its index among that lane's waiting
   * entries; -1 for an occupant that is not a waiting entry.
   *
   * @param {string} id
   * @returns {{ lane: PlacementLane, index: number }|null}
   */
  const locate = (id) => {
    for (const lane of serial) {
      const index = /** @type {string[]} */ (lanes.get(lane.id)).indexOf(id);
      if (index >= 0) {
        return { lane: lane.id, index };
      }
    }
    const parallel_index = /** @type {string[]} */ (
      lanes.get('parallel')
    ).indexOf(id);
    if (parallel_index >= 0) {
      return { lane: 'parallel', index: parallel_index };
    }
    const occupied = occupant_lane.get(id);
    return occupied ? { lane: occupied, index: -1 } : null;
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

  // Bundles: chosen candidates joined by a constraint relation.
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
  for (const c of chosen) {
    for (const line of /** @type {RelationLine[]} */ (
      lines_by_candidate.get(c)
    )) {
      if (line.side === 'chosen' && CONSTRAINTS.has(line.relation)) {
        const ra = find(c);
        const rb = find(line.other);
        if (ra !== rb) {
          parent.set(rb, ra);
        }
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
  // `chosen` is display-ordered, so every member list is too, and bundles
  // ordered by their first member follow the display order of first members.
  const bundles = [...bundle_members.values()].sort((p, q) =>
    compare(p[0], q[0])
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
   * Whether the candidate's in-lane constraints hold in `order`.
   *
   * @param {string} c
   * @param {string[]} order
   * @param {PlacementLane} lane
   * @returns {boolean}
   */
  const constraintsHold = (c, order, lane) => {
    const own = order.indexOf(c);
    for (const x of order) {
      if (x === c) {
        continue;
      }
      const kind = kindOf(c, x);
      const at = order.indexOf(x);
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

  /** @type {PlannedPlacement[]} */
  const order = [];
  bundles.forEach((members, bundle_index) => {
    const sorted = bundleOrder(members, kindOf);
    // K: the waiting and lane-occupying items a member is constrained against.
    /** @type {Array<{ id: string, lane: PlacementLane }>} */
    const k_items = [];
    for (const c of members) {
      for (const line of /** @type {RelationLine[]} */ (
        lines_by_candidate.get(c)
      )) {
        if (
          line.side === 'member' &&
          CONSTRAINTS.has(line.relation) &&
          line.other_lane &&
          !k_items.some((item) => item.id === line.other)
        ) {
          k_items.push({ id: line.other, lane: line.other_lane });
        }
      }
    }
    /** @type {PlacementLane} */
    let lane;
    if (k_items.length === 0) {
      lane = members.length === 1 ? 'parallel' : emptiestSerial();
    } else {
      const k_lanes = new Set(k_items.map((item) => item.lane));
      const [only] = [...k_lanes];
      if (k_lanes.size === 1 && only !== 'parallel') {
        lane = only;
      } else {
        /** @type {PlacementLane|null} */
        let best = null;
        let best_cover = 0;
        for (const serial_lane of serial) {
          const cover = k_items.filter(
            (item) => item.lane === serial_lane.id
          ).length;
          if (cover > best_cover) {
            best = serial_lane.id;
            best_cover = cover;
          }
        }
        lane = best ?? (members.length === 1 ? 'parallel' : emptiestSerial());
      }
    }

    for (const c of sorted.order) {
      const entries = /** @type {string[]} */ (lanes.get(lane) || []);
      /** @type {PlacementWarning[]} */
      const warnings = sorted.cycle ? [{ code: 'order_cycle' }] : [];
      const lines = /** @type {RelationLine[]} */ (lines_by_candidate.get(c));
      let index = entries.length;
      if (lane !== 'parallel') {
        let lower = 0;
        let upper = entries.length;
        let has_upper = false;
        /**
         * @param {string} x
         * @returns {number|null}
         */
        const positionIn = (x) => {
          const at = entries.indexOf(x);
          if (at >= 0) {
            return at;
          }
          return occupant_lane.get(x) === lane ? -1 : null;
        };
        for (const line of lines) {
          // A cyclic bundle goes in display order (§4.6), so its members'
          // relations to each other set no bound.
          if (
            line.side === 'outside' ||
            (sorted.cycle && line.side === 'chosen') ||
            !CONSTRAINTS.has(line.relation)
          ) {
            continue;
          }
          const at = positionIn(line.other);
          if (at === null) {
            continue;
          }
          if (line.relation === 'c_first') {
            upper = has_upper ? Math.min(upper, at) : at;
            has_upper = true;
          } else {
            lower = Math.max(lower, at + 1);
          }
        }
        // The LATEST index the bounds allow: right before the first `c_first`
        // item, else the lane tail. Never jumping ahead of unrelated waiting
        // entries is what keeps an empty-K bundle appended in bundle order
        // (§4.6) and what lets `[전체 적용]` recompute the remaining candidates
        // on each reply and land on the table's places.
        if (has_upper && lower > upper) {
          warnings.push({ code: 'order_unsatisfiable' });
          index = entries.length;
        } else if (has_upper) {
          index = upper;
        }
      }
      const spliced = [...entries];
      spliced.splice(index, 0, c);
      let final_order = spliced;
      if (lane !== 'parallel') {
        const topo = orderLaneByBlocks(spliced, edgesAmong(spliced));
        if (!topo.cycle) {
          final_order = topo.order;
        }
        if (
          !warnings.some((w) => w.code === 'order_unsatisfiable') &&
          constraintsHold(c, spliced, lane) &&
          !constraintsHold(c, final_order, lane)
        ) {
          warnings.push({ code: 'blocks_reordered' });
        }
      }
      lanes.set(lane, final_order);
      for (const line of lines) {
        if (
          line.side === 'member' &&
          CONSTRAINTS.has(line.relation) &&
          line.other_lane &&
          (lane === 'parallel' || line.other_lane !== lane)
        ) {
          warnings.push({
            code: 'uncovered',
            other: line.other,
            other_lane: line.other_lane
          });
        }
      }
      const final_index = final_order.indexOf(c);
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
        number: order.length + 1,
        bundle: bundle_index,
        lane,
        index,
        final_index,
        before: final_index > 0 ? final_order[final_index - 1] : null,
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
        judged_at: judged.length > 0 ? Math.max(...judged) : null
      });
    }
  });

  return {
    revision: typeof queue.revision === 'number' ? queue.revision : 0,
    order,
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
