/**
 * Candidate and running-lane ordering of the pipeline screen (UI-dbn6 §3.3).
 *
 * The candidate lane offers the four Worker presets (UI-d13v §4.2) without the
 * chain editor: `spec 우선`·`병목 우선`·`최신 생성`·`최신 수정`. The chain decides
 * the seats and one dependency-adjacency pass pulls a dependent right behind a
 * blocker present in the same list (UI-q1y7 §3). The running lane offers
 * `시작순` (earliest start first, the lane model's order) and `경과순` (latest
 * start first); session tiles stay after worker tiles either way.
 */
import { coerceTimestampMs } from './relative-time.js';

/**
 * @typedef {'spec'|'bottleneck'|'created'|'updated'} CandidatePreset
 * @typedef {'priority'|'dependents'|'released'|'spec'|'created'|'updated'} OrderKey
 */

/** @type {Readonly<Record<CandidatePreset, Array<[OrderKey, 'asc'|'desc']>>>} */
const CHAINS = Object.freeze({
  spec: [
    ['spec', 'desc'],
    ['created', 'asc']
  ],
  bottleneck: [
    ['priority', 'asc'],
    ['dependents', 'desc'],
    ['released', 'desc']
  ],
  created: [
    ['created', 'desc'],
    ['priority', 'asc']
  ],
  updated: [['updated', 'desc']]
});

/**
 * @param {unknown} value
 * @returns {value is CandidatePreset}
 */
export function isCandidatePreset(value) {
  return (
    typeof value === 'string' &&
    Object.prototype.hasOwnProperty.call(CHAINS, value)
  );
}

/**
 * @param {any} item
 * @param {OrderKey} key
 * @param {(item: any) => any} rawOf - The server row behind a lane item
 * (`release_info` lives there).
 * @returns {number|null}
 */
function valueOf(item, key, rawOf) {
  switch (key) {
    case 'priority':
      return typeof item.priority === 'number' && Number.isFinite(item.priority)
        ? item.priority
        : null;
    case 'dependents': {
      const count = item.dependents_info ? item.dependents_info.count : null;
      return typeof count === 'number' && Number.isFinite(count) ? count : null;
    }
    case 'released': {
      const at = rawOf(item)?.release_info?.last_released_at;
      return typeof at === 'number' && Number.isFinite(at) ? at : null;
    }
    case 'spec':
      return item.published === true ? 1 : 0;
    case 'created':
      return coerceTimestampMs(item.created_at);
    default:
      return coerceTimestampMs(item.updated_at);
  }
}

/**
 * Pull each dependent right behind its blocker when both are in the list.
 *
 * @param {any[]} base
 * @returns {any[]}
 */
function groupByDependency(base) {
  const in_lane = new Set(base.map((item) => item.id));
  /** @type {Map<string, string[]>} */
  const preds_of = new Map();
  /** @type {Map<string, any[]>} */
  const dependents_of = new Map();
  for (const item of base) {
    const preds = (
      Array.isArray(item.blocked_by) ? item.blocked_by : []
    ).filter((/** @type {string} */ id) => in_lane.has(id));
    preds_of.set(item.id, preds);
    for (const id of preds) {
      const list = dependents_of.get(id) || [];
      list.push(item);
      dependents_of.set(id, list);
    }
  }
  /** @type {Set<string>} */
  const placed = new Set();
  /** @type {any[]} */
  const out = [];
  /** @param {any} item */
  const place = (item) => {
    placed.add(item.id);
    out.push(item);
    for (const next of dependents_of.get(item.id) ?? []) {
      if (
        !placed.has(next.id) &&
        (preds_of.get(next.id) ?? []).every((id) => placed.has(id))
      ) {
        place(next);
      }
    }
  };
  while (out.length < base.length) {
    const ready = base.find(
      (item) =>
        !placed.has(item.id) &&
        (preds_of.get(item.id) ?? []).every((id) => placed.has(id))
    );
    place(ready ?? base.find((item) => !placed.has(item.id)));
  }
  return out;
}

/**
 * Order candidates by a preset; missing values sort last. Returns a new array.
 *
 * @param {any[]} items
 * @param {string} preset
 * @param {(item: any) => any} [rawOf]
 * @returns {any[]}
 */
export function orderCandidates(items, preset, rawOf = () => null) {
  const chain = CHAINS[isCandidatePreset(preset) ? preset : 'spec'];
  const base = items.slice();
  base.sort((a, b) => {
    for (const [key, dir] of chain) {
      const left = valueOf(a, key, rawOf);
      const right = valueOf(b, key, rawOf);
      if (left === right) {
        continue;
      }
      if (left === null) {
        return 1;
      }
      if (right === null) {
        return -1;
      }
      return dir === 'asc' ? left - right : right - left;
    }
    return String(a.id).localeCompare(String(b.id));
  });
  return groupByDependency(base);
}

/**
 * Order the running lane. `started` keeps the lane model's order; `elapsed`
 * puts the latest start first. Session tiles stay after worker tiles.
 *
 * @param {any[]} items
 * @param {'started'|'elapsed'} mode
 * @returns {any[]}
 */
export function orderRunning(items, mode) {
  if (mode !== 'elapsed') {
    return items;
  }
  const workers = items.filter((item) => item.kind !== 'session');
  const sessions = items.filter((item) => item.kind === 'session');
  return [...workers.slice().reverse(), ...sessions];
}
