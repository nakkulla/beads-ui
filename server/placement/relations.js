/**
 * Pair relations and candidate states of the placement judgment (UI-izba §4.1,
 * §4.5) — a pure projection of facts the decoration already holds plus the
 * cached jev answers. No I/O, no clock: the caller passes everything in.
 *
 * The one fixed condition is a direct `blocks` edge, which orders the pair; jev
 * is never asked about that pair. Every other pair takes jev's cached answer,
 * and a declared-scope overlap rides along as question material only (UI-i7k9):
 * it never decides a relation.
 *
 * @import { PlacementRelation, PlacementStatus, PlacementJevChoice } from './wire.js'
 */
import { overlapPrefixes } from '../../app/utils/scope-overlap.js';
import { ADOPT_CONFIDENCE } from './question.js';
import { orientPair, placementPairKey } from './wire.js';

/**
 * A cached answer or a remembered failure for one pair, as the caller's lookup
 * returns it. Null means neither.
 *
 * @typedef {{ kind: 'answer', choice: PlacementJevChoice, confidence: number, judged_at: number }|{ kind: 'failed', reason: string }} PairJudgment
 */

/**
 * @typedef {Object} RelationsInput
 * @property {string[]} candidates - Placeable candidate ids, display order.
 * @property {string[]} members - Waiting entries and lane-occupying lineages.
 * @property {Record<string, string[]>} blocked_by - Direct blocker ids by bead.
 * @property {Record<string, string[]>} scopes - Declared scope by bead; a bead
 * whose scope is unknown has no entry.
 * @property {{ blocker: string, blockee: string }[]} lane_edges - `blocks`
 * edges between members of one serial lane.
 * @property {Record<string, string|null>} digests - Material digest by bead;
 * null or absent means the material is not there yet.
 * @property {(a: string, b: string, digest_a: string, digest_b: string) => PairJudgment|null} judgmentFor
 * @property {'unknown'|'present'|'missing'} key_state
 */

/**
 * @typedef {Object} RelationsOutput
 * @property {Record<string, PlacementRelation>} relations
 * @property {Record<string, PlacementStatus>} status
 * @property {Array<{ a: string, b: string, overlap?: string[] }>} jev_pairs -
 * Every pair that needs jev and has both materials, answered or not, in
 * small-id orientation; `overlap` is the declared-scope prefixes the two meet
 * on, present only when they do.
 * @property {import('./wire.js').PlacementProgress} progress - Distinct pairs
 * that need jev, each counted once however many candidates share it.
 */

/**
 * The fixed relation of a pair, or null when no direct `blocks` edge holds.
 *
 * @param {string} a
 * @param {string} b
 * @param {RelationsInput} input
 * @returns {PlacementRelation|null}
 */
function fixedRelation(a, b, input) {
  const a_blocks_b = (input.blocked_by[b] || []).includes(a);
  const b_blocks_a = (input.blocked_by[a] || []).includes(b);
  if (a_blocks_b || b_blocks_a) {
    return {
      a,
      b,
      // A blocks cycle orders neither way, so the two cannot run together.
      relation:
        a_blocks_b && b_blocks_a
          ? 'conflict'
          : a_blocks_b
            ? 'a_first'
            : 'b_first',
      source: 'fixed',
      basis: 'blocks',
      confidence: null,
      jev_choice: null,
      judged_at: null
    };
  }
  return null;
}

/**
 * The declared-scope prefixes two beads meet on, or an empty list when either
 * scope is unknown.
 *
 * @param {string} a
 * @param {string} b
 * @param {RelationsInput} input
 * @returns {string[]}
 */
function scopeOverlap(a, b, input) {
  const scope_a = input.scopes[a];
  const scope_b = input.scopes[b];
  return Array.isArray(scope_a) && Array.isArray(scope_b)
    ? overlapPrefixes(scope_a, scope_b)
    : [];
}

/**
 * Project the pair relations and every candidate's state.
 *
 * @param {RelationsInput} input
 * @returns {RelationsOutput}
 */
export function placementRelations(input) {
  /** @type {Record<string, PlacementRelation>} */
  const relations = {};
  /** @type {Record<string, PlacementStatus>} */
  const status = {};
  /** @type {Map<string, { a: string, b: string, overlap?: string[] }>} */
  const jev_pairs = new Map();
  /** @type {Map<string, boolean>} Pair key → settled (answered or failed). */
  const progress = new Map();
  const candidate_set = new Set(input.candidates);
  const counterparts = [
    ...input.candidates,
    ...input.members.filter((id) => !candidate_set.has(id))
  ];

  for (const candidate of input.candidates) {
    let total = 0;
    let done = 0;
    let compared = 0;
    let material_missing = false;
    let judging = false;
    /** @type {{ key: string, reason: string }|null} */
    let first_failure = null;
    for (const other of counterparts) {
      if (other === candidate) {
        continue;
      }
      compared += 1;
      const [a, b] = orientPair(candidate, other);
      const key = placementPairKey(a, b);
      const fixed = fixedRelation(a, b, input);
      if (fixed) {
        relations[key] = fixed;
        continue;
      }
      total += 1;
      const digest_a = input.digests[a];
      const digest_b = input.digests[b];
      if (typeof digest_a !== 'string' || typeof digest_b !== 'string') {
        material_missing = true;
        progress.set(key, false);
        continue;
      }
      const overlap = scopeOverlap(a, b, input);
      jev_pairs.set(key, overlap.length > 0 ? { a, b, overlap } : { a, b });
      const judgment = input.judgmentFor(a, b, digest_a, digest_b);
      if (judgment && judgment.kind === 'answer') {
        done += 1;
        progress.set(key, true);
        relations[key] = {
          a,
          b,
          relation:
            judgment.confidence >= ADOPT_CONFIDENCE
              ? judgment.choice
              : 'unknown',
          source: 'jev',
          ...(overlap.length > 0 ? { overlap } : {}),
          confidence: judgment.confidence,
          jev_choice: judgment.choice,
          judged_at: judgment.judged_at
        };
        continue;
      }
      const reason =
        judgment && judgment.kind === 'failed'
          ? judgment.reason
          : input.key_state === 'missing'
            ? 'key_missing'
            : null;
      progress.set(key, reason !== null);
      if (reason === null) {
        judging = true;
      } else if (first_failure === null || key < first_failure.key) {
        first_failure = { key, reason };
      }
    }
    if (compared === 0) {
      status[candidate] = { state: 'no_counterpart' };
    } else if (total === 0) {
      status[candidate] = { state: 'fixed_only' };
    } else if (first_failure !== null) {
      status[candidate] = {
        state: 'unavailable',
        reason: first_failure.reason,
        done,
        total
      };
    } else if (material_missing || judging) {
      status[candidate] = {
        state: 'pending',
        reason: material_missing ? 'material_missing' : 'judging',
        done,
        total
      };
    } else {
      status[candidate] = { state: 'ready', done, total };
    }
  }

  for (const edge of input.lane_edges) {
    if (edge.blocker === edge.blockee) {
      continue;
    }
    const [a, b] = orientPair(edge.blocker, edge.blockee);
    const key = placementPairKey(a, b);
    const existing = relations[key];
    const direction = edge.blocker === a ? 'a_first' : 'b_first';
    if (
      existing &&
      existing.source === 'fixed' &&
      existing.basis === 'blocks'
    ) {
      existing.in_lane = true;
      // Edges both ways are a blocks cycle. Keeping only one direction would
      // let the browser's ordering correct a lane the store leaves alone (a
      // cycle disables the correction), so the pair says `conflict`, which the
      // browser reads back as both edges.
      if (existing.relation !== direction) {
        existing.relation = 'conflict';
      }
      continue;
    }
    relations[key] = {
      a,
      b,
      relation: direction,
      source: 'fixed',
      basis: 'blocks',
      in_lane: true,
      confidence: null,
      jev_choice: null,
      judged_at: null
    };
  }

  return {
    relations,
    status,
    jev_pairs: [...jev_pairs.values()],
    progress: {
      done: [...progress.values()].filter(Boolean).length,
      total: progress.size
    }
  };
}
