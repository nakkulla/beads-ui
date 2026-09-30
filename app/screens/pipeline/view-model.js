/**
 * The pipeline screen's pure view derivations (UI-dbn6 §4.2): the `buildLanes`
 * inputs of each scope, the stored candidate filter, per-item decoration
 * (overlap chips, the open chip popover, `tileResolveFields`) and the ordered,
 * optionally trimmed model the templates draw.
 */
import { ALL_SCOPE } from '../../core/state.js';
import { closedRangeSince } from '../../data/closed-range.js';
import { mergeQueue } from '../../model/adopted-queue.js';
import { orderCandidates, orderRunning } from '../../model/candidate-order.js';
import { foreignLocations } from '../../model/foreign-locations.js';
import { judgementPopoverLines } from '../../model/judgement-popover.js';
import { isHiddenLabel } from '../../model/label-policy.js';
import {
  CANDIDATE_FILTER_DEFAULT,
  READINESS_FILTER_OPTIONS,
  normalizeLabelFilter,
  normalizePriorityFilter,
  normalizeRouteFilter,
  normalizeTypeFilter
} from '../../model/lane-model.js';
import { deferredRows } from '../../model/repo-rows.js';
import { tileResolveFields } from '../../model/tile-resolve.js';
import { opButton } from './chips.js';
import { isQueueRow } from './mini-row.js';

/**
 * @import { LaneModel } from '../../model/lane-model.js'
 * @import { LaneView } from './lanes.js'
 */

/**
 * @typedef {Object} LaneInputEnv
 * @property {string} scope - `*` or a root_dir.
 * @property {Array<Record<string, any>>} rows - monitor-pipeline rows.
 * @property {Array<Record<string, any>>} states - workspaces_state rows.
 * @property {{ overlay: (rows: Array<Record<string, any>>) => Array<Record<string, any>> }} adopted
 * @property {any} queue - The worker-queue snapshot of the repo in view, or null.
 * @property {{ closed: () => any[], deferred: () => any[] }|undefined} lists
 * @property {{ rows: (queue: any, closed: any[], root_dir: string, done_since: number|undefined) => any[] }} closed_rows
 * @property {boolean} shelf_open
 * @property {boolean} done_collapsed
 * @property {LaneView['filter']} filter
 * @property {string} search
 * @property {number|undefined} done_since - The 레포 완료 period lower bound.
 * @property {number} now
 * @property {Map<string, 'merge'|'cleanup'>} [pr_pending] - PR rows whose
 * merge / cleanup click awaits its reply.
 */

/**
 * @typedef {Object} ViewOptions
 * @property {boolean} only_shown
 * @property {string} candidate_sort
 * @property {'started'|'elapsed'} running_sort
 * @property {Map<string, any>} raw_runnable
 * @property {(item: any) => any} decorate
 */

/**
 * @param {unknown} value
 * @returns {Record<string, any>}
 */
export function objectOf(value) {
  return value && typeof value === 'object'
    ? /** @type {Record<string, any>} */ (value)
    : {};
}

/**
 * @param {string} root_dir
 * @returns {string}
 */
function basenameOf(root_dir) {
  const trimmed = root_dir.replace(/\/+$/, '');
  return trimmed.slice(trimmed.lastIndexOf('/') + 1) || trimmed;
}

/**
 * @param {string} root_dir
 * @param {string} bead_id
 * @returns {string}
 */
export function itemKey(root_dir, bead_id) {
  return `${root_dir}\u0000${bead_id}`;
}

/**
 * Merge the overlap facts into a row's dependency chips (UI-e9sg).
 *
 * @param {any} row
 * @returns {any}
 */
function chipsWithOverlaps(row) {
  const base = row.dependency_chips || null;
  const overlaps = row.overlap_chips || [];
  const scope_missing = row.scope_state === 'missing';
  if (!base && overlaps.length === 0 && !scope_missing) {
    return null;
  }
  return {
    ...(base || {}),
    ...(overlaps.length > 0 ? { overlaps } : {}),
    ...(scope_missing ? { scope_missing: true } : {})
  };
}

/**
 * The stored candidate filter, normalized (unknown axes ignored).
 *
 * @param {any} raw
 * @returns {LaneView['filter']}
 */
export function normalizeFilter(raw) {
  const value = objectOf(raw);
  return {
    show_blocked:
      typeof value.show_blocked === 'boolean'
        ? value.show_blocked
        : CANDIDATE_FILTER_DEFAULT.show_blocked,
    readiness: READINESS_FILTER_OPTIONS.some((o) => o.value === value.readiness)
      ? value.readiness
      : 'all',
    routes: normalizeRouteFilter(value.routes),
    priorities: normalizePriorityFilter(value.priorities),
    type: normalizeTypeFilter(value.type),
    labels: normalizeLabelFilter(value.labels)
  };
}

/**
 * The `buildLanes` inputs of a scope. Both scopes read monitor-pipeline rows;
 * the 레포 scope merges its worker-queue snapshot when it is at least as new
 * and adds the open 보류 shelf and session-closed rows.
 *
 * @param {LaneInputEnv} env
 * @returns {{ rows: Array<Record<string, any>>, states: Array<Record<string, any>>, options: Record<string, any> }}
 */
export function laneInputsOf(env) {
  const base_options = {
    running_sort: 'started',
    candidate_filter: env.filter,
    candidate_sort: 'as_given',
    // The Worker-grade PR rows in both scopes: the monitor rows carry the same
    // decorated queue fields, and a missing one fails quiet (UI-dbn6 P1-r2).
    pr_wait_detail: true,
    pr_pending: env.pr_pending || new Map()
  };
  if (env.scope === ALL_SCOPE) {
    return {
      rows: env.adopted.overlay(env.rows),
      states: env.states,
      options: {
        ...base_options,
        done_since: closedRangeSince('today', env.now),
        groups: 'nonempty'
      }
    };
  }
  const scope = env.scope;
  const monitor_row = env.rows.find((row) => row.root_dir === scope);
  const queue = env.queue;
  /** @type {Record<string, any>|null} */
  let row =
    monitor_row ||
    (queue ? { root_dir: scope, name: basenameOf(scope) } : null);
  if (
    row &&
    queue &&
    (typeof monitor_row?.revision !== 'number' ||
      queue.revision >= monitor_row.revision)
  ) {
    row = mergeQueue(row, queue);
  }
  const done_since = env.done_since;
  if (row && env.lists) {
    row = {
      ...row,
      ...(env.shelf_open
        ? { deferred: deferredRows(env.lists.deferred()) }
        : {}),
      ...(!env.done_collapsed
        ? {
            session_done: env.closed_rows.rows(
              row,
              env.lists.closed(),
              scope,
              done_since
            )
          }
        : {})
    };
  }
  const state_row = env.states.find((entry) => entry.root_dir === scope) || {
    root_dir: scope,
    name: basenameOf(scope),
    revision: row?.revision,
    auto_advance: queue?.auto_advance,
    auto_merge: queue?.auto_merge,
    slots:
      typeof queue?.workspace_info?.slots === 'number'
        ? queue.workspace_info.slots
        : queue?.slots,
    runner_catalog: queue?.runner_catalog,
    serial_lane_count: queue?.serial_lane_count
  };
  return {
    rows: row ? [row] : [],
    states: [state_row],
    options: {
      ...base_options,
      done_since,
      groups: 'all',
      search: env.search,
      extra_locations: foreignLocations(env.rows, env.states, scope)
    }
  };
}

/**
 * The raw runnable entries of the lane input rows, keyed by repo and bead —
 * the candidate order presets read their dates and spec facts.
 *
 * @param {Array<Record<string, any>>} rows
 * @returns {Map<string, any>}
 */
export function rawRunnableOf(rows) {
  /** @type {Map<string, any>} */
  const out = new Map();
  for (const row of rows) {
    for (const entry of Array.isArray(row.runnable) ? row.runnable : []) {
      out.set(itemKey(row.root_dir, entry.bead_id), entry);
    }
  }
  return out;
}

/**
 * The `↻ 지금 프로브` exit of a provider hold popover; it only advances the
 * probe verdict (it never clears the target).
 *
 * @param {any} item
 * @returns {any}
 */
function probeExit(item) {
  const gate = item.gate;
  if (
    !gate ||
    (gate.kind !== 'provider_outage' && gate.kind !== 'provider_usage') ||
    typeof gate.since !== 'number' ||
    typeof gate.runner !== 'string' ||
    gate.probe_ready !== true
  ) {
    return '';
  }
  return opButton({
    op: 'probe',
    label: '↻ 지금 프로브',
    title:
      '공급자 회복 프로브를 지금 실행합니다 (러너 전체) — 통과하면 보류가 풀립니다',
    data: { runner: gate.runner, since: gate.since, root_dir: item.root_dir }
  });
}

/**
 * The open chip popover of an item, or null.
 *
 * @param {any} item
 * @param {{ bead_id: string, root_dir: string, chip_key: string }|null} open
 * @returns {any}
 */
export function popoverOf(item, open) {
  if (!open || open.bead_id !== item.id || open.root_dir !== item.root_dir) {
    return null;
  }
  if (open.chip_key === 'gate') {
    return item.gate
      ? {
          chip_key: 'gate',
          content: {
            title: '자동 디스패치가 막혀 있다',
            lines: item.gate.lines || [],
            exit: probeExit(item)
          }
        }
      : null;
  }
  const content = judgementPopoverLines(item, open.chip_key);
  return content
    ? {
        chip_key: open.chip_key,
        content: { title: content.title, lines: content.lines }
      }
    : null;
}

/**
 * Decorate one lane item: overlap chips, the open popover, and the
 * `tileResolveFields` verdict (renderers never re-judge it).
 *
 * @param {any} item
 * @param {{ popover: { bead_id: string, root_dir: string, chip_key: string }|null, resolvePending: (id: string) => boolean, handoffPending: (id: string) => boolean, revisePending: (id: string) => boolean }} env
 * @returns {any}
 */
export function decorateItem(item, env) {
  const chips = chipsWithOverlaps(item);
  const popover = popoverOf(item, env.popover);
  const resolve =
    isQueueRow(item) || item.lane === 'running' || item.lane === 'pr_wait'
      ? tileResolveFields(
          item,
          env.resolvePending(item.id),
          env.handoffPending(item.id)
        )
      : {};
  return {
    ...item,
    ...(chips ? { dependency_chips: chips } : {}),
    ...(popover ? { chip_popover: popover } : {}),
    ...resolve,
    ...(item.revise_action && env.revisePending(item.id)
      ? { revise_enabled: false }
      : {})
  };
}

/**
 * The model the templates draw: decorated, ordered, optionally trimmed to the
 * filter/search matches, plus the index of drawn items by repo and bead.
 *
 * @param {LaneModel} model
 * @param {ViewOptions} options
 * @returns {{ vm: LaneModel, items: Map<string, any> }}
 */
export function viewModelOf(model, options) {
  /** @param {any} item */
  const shown = (item) =>
    !options.only_shown ||
    (item.filter_match !== false && item.search_match !== false);
  /** @param {any[]} list */
  const map = (list) => list.filter(shown).map(options.decorate);
  const vm = /** @type {LaneModel} */ ({
    ...model,
    runnable: orderCandidates(
      map(model.runnable),
      options.candidate_sort,
      (item) => options.raw_runnable.get(itemKey(item.root_dir, item.id))
    ),
    deferred: map(model.deferred),
    queue: map(model.queue),
    running: orderRunning(map(model.running), options.running_sort),
    pr_wait: map(model.pr_wait),
    done: map(model.done),
    queue_groups: model.queue_groups.map((group) => ({
      ...group,
      sublanes: {
        parallel: map(group.sublanes.parallel),
        serial: group.sublanes.serial.map((lane) => ({
          ...lane,
          items: map(lane.items)
        }))
      }
    }))
  });
  /** @type {Map<string, any>} */
  const items = new Map();
  for (const item of [
    ...vm.runnable,
    ...vm.deferred,
    ...vm.queue,
    ...vm.running,
    ...vm.pr_wait,
    ...vm.done
  ]) {
    const key = itemKey(item.root_dir, item.id);
    if (!item.non_occupying || !items.has(key)) {
      items.set(key, item);
    }
  }
  return { vm, items };
}

/**
 * The label filter's options: every shown label in the model plus the
 * selected ones, hidden labels excluded.
 *
 * @param {LaneModel} model
 * @param {string[]} selected
 * @returns {string[]}
 */
export function labelOptionsOf(model, selected) {
  /** @type {Set<string>} */
  const labels = new Set(selected);
  for (const item of [
    ...model.runnable_all,
    ...model.queue,
    ...model.running,
    ...model.pr_wait,
    ...model.done
  ]) {
    for (const label of Array.isArray(item.labels) ? item.labels : []) {
      if (typeof label === 'string' && label && !isHiddenLabel(label)) {
        labels.add(label);
      }
    }
  }
  return [...labels].sort((a, b) => a.localeCompare(b));
}
