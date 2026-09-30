/**
 * The five lanes of the pipeline screen (UI-dbn6 §3.3): 후보 · 대기 (병렬
 * 영역 + 직렬 레인) · 실행 중 · PR 대기 · 완료. The same lanes serve both
 * scopes; the 전체 scope draws each lane as per-repo bundles (collapsible,
 * stored in the `beads-ui.monitor.sections` shape), the 레포 scope draws them
 * flat and adds the 보류 shelf and the 완료 period.
 *
 * The frame (lane heads, filter strip) and each lane BODY are separate render
 * roots: a lane body is a static container here and the screen renders into
 * it on its own, so a time boundary re-renders only the lane it concerns.
 */
import { html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat.js';
import { DONE_RANGE_OPTIONS } from '../../data/closed-range.js';
import {
  PRIORITY_FILTER_OPTIONS,
  READINESS_FILTER_OPTIONS,
  ROUTE_FILTER_OPTIONS,
  TYPE_FILTER_OPTIONS
} from '../../model/lane-model.js';
import { candidateCard } from './card.js';
import { miniRow } from './mini-row.js';
import { runningTile } from './running-tile.js';

/**
 * @import { LaneModel, LaneItem, LaneQueueGroup } from '../../model/lane-model.js'
 * @import { TileContext } from './running-tile.js'
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {'candidate'|'queue'|'running'|'pr_wait'|'done'} LaneId
 */

/** @type {ReadonlyArray<{ id: LaneId, title: string, short: string, stage: string, empty: string }>} */
export const LANES = [
  {
    id: 'candidate',
    title: '후보',
    short: '후보',
    stage: 'spec',
    empty: '실행 자격을 갖춘 이슈 없음'
  },
  {
    id: 'queue',
    title: '대기',
    short: '대기',
    stage: 'plan',
    empty: '대기 항목 없음'
  },
  {
    id: 'running',
    title: '실행 중',
    short: '실행 중',
    stage: 'impl',
    empty: '실행 세션 없음'
  },
  {
    id: 'pr_wait',
    title: 'PR 대기',
    short: 'PR',
    stage: 'pr',
    empty: 'PR 없음'
  },
  {
    id: 'done',
    title: '완료',
    short: '완료',
    stage: 'merge',
    empty: '완료 기록 없음'
  }
];

/** The four candidate sort presets (the Worker presets, UI-d13v §4.2). */
export const CANDIDATE_SORT_PRESETS = [
  { value: 'spec', label: 'spec 우선' },
  { value: 'bottleneck', label: '병목 우선' },
  { value: 'created', label: '최신 생성' },
  { value: 'updated', label: '최신 수정' }
];

/**
 * @typedef {Object} LaneView
 * @property {'all'|'repo'} scope_kind
 * @property {'narrow'|'medium'|'wide'} size
 * @property {LaneId} mobile_lane
 * @property {(lane: LaneId) => boolean} collapsed
 * @property {(root_dir: string, lane: string) => boolean} bundleCollapsed
 * @property {{ show_blocked: boolean, readiness: string, routes: string[], priorities: number[], type: string, labels: string[] }} filter
 * @property {boolean} filters_open
 * @property {boolean} label_menu_open
 * @property {string[]} label_options
 * @property {boolean} only_shown
 * @property {string} candidate_sort
 * @property {'started'|'elapsed'} running_sort
 * @property {string} done_range
 * @property {boolean} shelf_open
 * @property {boolean} parallel_collapsed
 * @property {boolean} serial_collapsed
 * @property {boolean} [searching] - A 레포 search is active: lane heads count
 * the matches (UI-6g3t §7).
 */

/**
 * The count a lane head and the mobile lane bar show.
 *
 * @param {LaneModel} model
 * @param {LaneId} lane
 * @returns {number}
 */
export function laneCount(model, lane) {
  switch (lane) {
    case 'candidate':
      return model.runnable.length;
    case 'queue':
      return model.queue.length;
    case 'running':
      return model.running.filter((item) => !item.non_occupying).length;
    case 'pr_wait':
      return model.pr_wait.length;
    default:
      return model.done.length;
  }
}

/**
 * The search matches of one lane (`일치 N`, UI-6g3t §7).
 *
 * @param {LaneModel} model
 * @param {LaneId} lane
 * @returns {number}
 */
export function laneMatchCount(model, lane) {
  const items =
    lane === 'candidate'
      ? model.runnable
      : lane === 'queue'
        ? model.queue
        : lane === 'running'
          ? model.running.filter((item) => !item.non_occupying)
          : lane === 'pr_wait'
            ? model.pr_wait
            : model.done;
  return items.filter((item) => item.search_match === true).length;
}

/**
 * The parallel-slot load (`슬롯 live/cap`), marked `⚠` once saturated: the
 * repo's parallel rows wait until a slot frees up.
 *
 * @param {{ live_count: number, slots: number }} group
 * @param {string} cls
 * @returns {TemplateResult}
 */
function slotLoad(group, cls) {
  const saturated = group.live_count >= group.slots;
  return html`<span
    class=${cls}
    title=${`실행 중 ${group.live_count} / 슬롯 ${group.slots} — 슬롯이 빌 때까지 이 레포의 병렬 항목은 나가지 않는다`}
    >슬롯 ${group.live_count}/${group.slots}${saturated ? ' ⚠' : ''}</span
  >`;
}

/**
 * The candidate filter strip (route · readiness · priority · type · label ·
 * blocked · 표시된 것만).
 *
 * @param {LaneModel} model
 * @param {LaneView} view
 * @returns {TemplateResult}
 */
function filterStrip(model, view) {
  const hidden = model.runnable_hidden;
  const filter = view.filter;
  /** @param {number} count */
  const hiddenNote = (count) =>
    count > 0 ? html`<span class="pl-filter__hidden">숨김 ${count}</span>` : '';
  return html`<div class="pl-filter" role="group" aria-label="후보 필터">
    <div class="pl-filter__group" role="group" aria-label="route 필터">
      ${ROUTE_FILTER_OPTIONS.map(
        (o) =>
          html`<button
            type="button"
            class="ui-chip${filter.routes.includes(o.value) ? ' is-on' : ''}"
            data-op="filter-route"
            data-value=${o.value}
            aria-pressed=${filter.routes.includes(o.value) ? 'true' : 'false'}
          >
            ${o.label}
          </button>`
      )}${hiddenNote(hidden.route)}
    </div>
    <div class="pl-filter__group" role="group" aria-label="준비도 필터">
      ${READINESS_FILTER_OPTIONS.map(
        (o) =>
          html`<button
            type="button"
            class="ui-chip${filter.readiness === o.value ? ' is-on' : ''}"
            data-op="filter-readiness"
            data-value=${o.value}
            aria-pressed=${filter.readiness === o.value ? 'true' : 'false'}
          >
            ${o.label}
          </button>`
      )}${hiddenNote(hidden.readiness)}
    </div>
    <div class="pl-filter__group" role="group" aria-label="우선순위 필터">
      ${PRIORITY_FILTER_OPTIONS.map(
        (o) =>
          html`<button
            type="button"
            class="ui-chip${filter.priorities.includes(o.value)
              ? ' is-on'
              : ''}"
            data-op="filter-priority"
            data-value=${String(o.value)}
            aria-pressed=${filter.priorities.includes(o.value)
              ? 'true'
              : 'false'}
          >
            ${o.label}
          </button>`
      )}${hiddenNote(hidden.priority)}
    </div>
    <div class="pl-filter__group">
      <select class="ui-select" data-op="filter-type" aria-label="타입 필터">
        ${TYPE_FILTER_OPTIONS.map(
          (o) =>
            html`<option value=${o.value} ?selected=${filter.type === o.value}>
              ${o.label}
            </option>`
        )}
      </select>
      ${hiddenNote(hidden.type)}
      <span class="pl-filter__labels">
        <button
          type="button"
          class="ui-chip${filter.labels.length > 0 ? ' is-on' : ''}"
          data-op="label-menu"
          aria-expanded=${view.label_menu_open ? 'true' : 'false'}
        >
          라벨${filter.labels.length > 0 ? ` ${filter.labels.length}` : ''} ▾
        </button>
        ${view.label_menu_open
          ? html`<div
              class="ui-popover pl-filter__label-pop"
              role="dialog"
              aria-label="라벨 필터"
            >
              ${view.label_options.length === 0
                ? html`<div class="pl-note">라벨 없음</div>`
                : view.label_options.map(
                    (label) =>
                      html`<label class="pl-check">
                        <input
                          type="checkbox"
                          data-op="filter-label"
                          data-value=${label}
                          .checked=${filter.labels.includes(label)}
                        />
                        ${label}
                      </label>`
                  )}
            </div>`
          : ''}
      </span>
      ${hiddenNote(hidden.label)}
    </div>
    <div class="pl-filter__group">
      <label class="pl-check">
        <input
          type="checkbox"
          data-op="filter-blocked"
          .checked=${filter.show_blocked}
        />
        blocked 표시${hidden.blocked > 0 ? ` (${hidden.blocked})` : ''}
      </label>
      <label
        class="pl-check"
        title="우선순위·타입·라벨 필터에 맞지 않는 카드를 흐리지 않고 숨깁니다"
      >
        <input
          type="checkbox"
          data-op="filter-only-shown"
          .checked=${view.only_shown}
        />
        표시된 것만
      </label>
    </div>
  </div>`;
}

/**
 * The controls a lane head carries (right end).
 *
 * @param {LaneId} lane
 * @param {LaneModel} model
 * @param {LaneView} view
 * @returns {TemplateResult|''}
 */
function headControls(lane, model, view) {
  if (lane === 'candidate') {
    return html`<select
        class="ui-select"
        data-op="candidate-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
      >
        ${CANDIDATE_SORT_PRESETS.map(
          (o) =>
            html`<option
              value=${o.value}
              ?selected=${view.candidate_sort === o.value}
            >
              ${o.label}
            </option>`
        )}
      </select>
      <button
        type="button"
        class="ui-btn ui-btn--ghost pl-lane__filters"
        data-op="filters-toggle"
        aria-expanded=${view.filters_open ? 'true' : 'false'}
      >
        필터 ▾
      </button>`;
  }
  if (lane === 'running') {
    return html`<select
      class="ui-select"
      data-op="running-sort"
      aria-label="실행 중 정렬"
      title="실행 중 정렬"
    >
      <option value="started" ?selected=${view.running_sort === 'started'}>
        시작순
      </option>
      <option value="elapsed" ?selected=${view.running_sort === 'elapsed'}>
        경과순
      </option>
    </select>`;
  }
  if (lane === 'pr_wait') {
    const stopping = model.queue_groups.some((group) => group.merge.running);
    return html`${model.pr_wait.length > 0
      ? html`<button
          type="button"
          class="ui-btn ui-btn--ghost"
          data-op="merge-all"
          title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
        >
          일괄 머지
        </button>`
      : ''}${stopping
      ? html`<button
          type="button"
          class="ui-btn ui-btn--ghost"
          data-op="merge-stop-all"
          title="대기 중인 머지를 모두 내려놓습니다 — 진행 중인 머지는 끝까지 갑니다"
        >
          일괄 머지 중단
        </button>`
      : ''}`;
  }
  if (lane === 'done') {
    return view.scope_kind === 'repo'
      ? html`<select
          class="ui-select"
          data-op="done-range"
          aria-label="완료 기간"
          title="완료 기간"
        >
          ${DONE_RANGE_OPTIONS.map(
            (o) =>
              html`<option
                value=${o.value}
                ?selected=${view.done_range === o.value}
              >
                ${o.label}
              </option>`
          )}
        </select>`
      : html`<span class="pl-lane__sub">오늘</span>`;
  }
  if (lane === 'queue' && view.scope_kind === 'repo') {
    const group = model.queue_groups[0];
    return group ? slotLoad(group, 'pl-lane__sub') : '';
  }
  return '';
}

/**
 * The lane frame. Bodies are empty `[data-lane-body]` containers the screen
 * renders into separately.
 *
 * @param {LaneModel} model
 * @param {LaneView} view
 * @returns {TemplateResult}
 */
export function lanesFrame(model, view) {
  const lanes =
    view.size === 'narrow'
      ? LANES.filter((lane) => lane.id === view.mobile_lane)
      : LANES;
  // Catalog §07: an open lane is `minmax(312px, 420px)` on the wide board
  // (the board, not the page, scrolls when they do not fit); a folded lane
  // is a 44px strip.
  /** @param {LaneId} lane */
  const column = (lane) =>
    view.collapsed(lane)
      ? 'var(--lane-folded)'
      : 'minmax(var(--lane-min), var(--lane-max))';
  const columns =
    view.size === 'wide'
      ? `grid-template-columns: ${LANES.map((lane) => column(lane.id)).join(' ')}`
      : view.size === 'medium'
        ? `grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) ${
            view.collapsed('done') ? 'var(--lane-folded)' : 'minmax(0, 1fr)'
          }`
        : '';
  return html`<div
    class="pl-lanes pl-lanes--${view.size}"
    data-scope=${view.scope_kind}
    style=${columns}
  >
    ${lanes.map((lane) => {
      const collapsed = view.size !== 'narrow' && view.collapsed(lane.id);
      const count = laneCount(model, lane.id);
      return html`<section
        class="pl-lane pl-lane--${lane.id}${collapsed ? ' is-collapsed' : ''}"
        data-lane=${lane.id}
        data-stage=${lane.stage}
      >
        <header class="pl-lane__head">
          <button
            type="button"
            class="pl-lane__toggle"
            data-op="lane-toggle"
            data-lane=${lane.id}
            aria-expanded=${collapsed ? 'false' : 'true'}
            title=${collapsed ? `${lane.title} 펼치기` : `${lane.title} 접기`}
          >
            <span class="pl-lane__spine" aria-hidden="true"></span>
            <span class="pl-lane__title">${lane.title}</span>
            <span class="pl-lane__count">${count}</span>
          </button>
          ${view.searching && !collapsed
            ? html`<span class="pl-lane__match"
                >일치 ${laneMatchCount(model, lane.id)}</span
              >`
            : ''}
          ${collapsed
            ? ''
            : html`<span class="pl-lane__ctl"
                >${headControls(lane.id, model, view)}</span
              >`}
        </header>
        ${!collapsed &&
        lane.id === 'candidate' &&
        (view.filters_open || view.size === 'wide')
          ? filterStrip(model, view)
          : ''}
        ${collapsed
          ? ''
          : html`<div class="pl-lane__body" data-lane-body=${lane.id}></div>`}
      </section>`;
    })}
  </div>`;
}

/**
 * Group lane items per repository, in the `workspaces_state` order.
 *
 * @param {LaneItem[]} items
 * @param {string[]} order
 * @returns {Array<{ root_dir: string, name: string, items: LaneItem[] }>}
 */
export function bundlesOf(items, order) {
  /** @type {Map<string, { root_dir: string, name: string, items: LaneItem[] }>} */
  const by_root = new Map();
  for (const item of items) {
    const entry = by_root.get(item.root_dir) || {
      root_dir: item.root_dir,
      name: item.workspace_name || item.root_dir,
      items: []
    };
    entry.items.push(item);
    by_root.set(item.root_dir, entry);
  }
  const rank = (/** @type {string} */ root) => {
    const index = order.indexOf(root);
    return index < 0 ? Number.MAX_SAFE_INTEGER : index;
  };
  return [...by_root.values()].sort(
    (a, b) =>
      rank(a.root_dir) - rank(b.root_dir) || a.name.localeCompare(b.name)
  );
}

/**
 * One repo bundle header (전체 scope).
 *
 * @param {LaneId|'runnable'} lane
 * @param {{ root_dir: string, name: string }} bundle
 * @param {number} count
 * @param {boolean} collapsed
 * @param {TemplateResult|''} [extra]
 * @returns {TemplateResult}
 */
function bundleHead(lane, bundle, count, collapsed, extra = '') {
  return html`<header class="pl-bundle__head">
    <button
      type="button"
      class="pl-bundle__toggle"
      data-op="bundle-toggle"
      data-lane=${lane}
      data-root-dir=${bundle.root_dir}
      aria-expanded=${collapsed ? 'false' : 'true'}
    >
      <span aria-hidden="true">${collapsed ? '▸' : '▾'}</span>
      <span class="pl-bundle__name" title=${bundle.root_dir}
        >${bundle.name}</span
      >
      <span class="pl-bundle__count">${count}</span>
    </button>
    ${extra}
  </header>`;
}

/**
 * @param {any} item
 * @returns {string}
 */
function keyOf(item) {
  return `${item.root_dir}\u0000${item.id}\u0000${item.attempt_id || ''}`;
}

/**
 * The waiting-lane body of one repo group: 병렬 zone then its 직렬 lanes.
 *
 * @param {LaneQueueGroup} group
 * @param {LaneView} view
 * @param {TileContext} ctx
 * @returns {TemplateResult}
 */
function queueGroupBody(group, view, ctx) {
  const parallel = group.sublanes.parallel;
  return html`<div class="pl-area">
      <div class="pl-area__head">
        <button
          type="button"
          class="pl-area__toggle"
          data-op="area-toggle"
          data-value="parallel"
          aria-expanded=${view.parallel_collapsed ? 'false' : 'true'}
        >
          병렬 <b>${parallel.length}</b>
        </button>
        ${slotLoad(group, 'pl-area__sub')}
      </div>
      ${view.parallel_collapsed
        ? ''
        : html`<div
            class="pl-zone"
            data-drop="parallel"
            data-root-dir=${group.root_dir}
            data-lane-length=${String(group.raw_queue_length)}
          >
            ${parallel.length === 0
              ? html`<div class="pl-empty">비어 있음 — 카드를 끌어다 놓기</div>`
              : repeat(parallel, keyOf, (item, index) =>
                  miniRow(item, ctx, {
                    drag: { kind: 'parallel', row_index: index }
                  })
                )}
          </div>`}
    </div>
    ${group.sublanes.serial.map(
      (lane) =>
        html`<div class="pl-area pl-area--serial">
          <div class="pl-area__head">
            <button
              type="button"
              class="pl-area__toggle"
              data-op="area-toggle"
              data-value="serial"
              aria-expanded=${view.serial_collapsed ? 'false' : 'true'}
            >
              직렬 ${lane.index + 1} <b>${lane.items.length}</b>
            </button>
            ${lane.occupants.length > 0
              ? html`<span
                  class="pl-area__sub"
                  title=${lane.occupants
                    .map((occupant) => `${occupant.id} — ${occupant.badge}`)
                    .join('\n')}
                  >점유
                  ${lane.occupants[0].id}${lane.occupants.length > 1
                    ? ` +${lane.occupants.length - 1}`
                    : ''}</span
                >`
              : ''}
            ${(lane.cross_wait_peers || []).map(
              (peer) =>
                html`<span class="ui-chip pl-badge pl-badge--alert"
                  >⚠ 상호 정지 — ${peer.workspace_name}·${peer.lane}</span
                >`
            )}
          </div>
          ${view.serial_collapsed
            ? ''
            : html`<div
                class="pl-zone"
                data-drop="repo-serial"
                data-root-dir=${group.root_dir}
                data-lane-id=${lane.id}
                data-lane-length=${String(lane.raw_length)}
              >
                ${lane.occupants.map((occupant) =>
                  miniRow(
                    /** @type {any} */ ({
                      id: occupant.id,
                      title: occupant.title,
                      lane: 'running',
                      root_dir: group.root_dir,
                      draggable: false,
                      ghost: true,
                      badges: [occupant.badge]
                    }),
                    ctx
                  )
                )}${lane.items.length === 0 && lane.occupants.length === 0
                  ? html`<div class="pl-empty">비어 있음</div>`
                  : repeat(lane.items, keyOf, (item, index) =>
                      miniRow(item, ctx, {
                        drag: {
                          kind: 'repo-serial',
                          lane_id: lane.id,
                          row_index: index
                        }
                      })
                    )}
              </div>`}
          ${lane.cycle
            ? html`<div class="pl-cycle" role="note">
                ⚠ blocks 순환 감지 — 자동 정렬을 생략했습니다
              </div>`
            : ''}
        </div>`
    )}`;
}

/**
 * The body of one lane.
 *
 * @param {LaneId} lane
 * @param {LaneModel} model
 * @param {LaneView} view
 * @param {TileContext} ctx
 * @param {string[]} order - Repo order (`workspaces_state`).
 * @returns {TemplateResult}
 */
export function laneBody(lane, model, view, ctx, order) {
  const all = view.scope_kind === 'all';
  const meta = LANES.find((entry) => entry.id === lane);
  const empty = html`<div class="pl-empty">${meta ? meta.empty : ''}</div>`;
  /**
   * @param {LaneItem[]} items
   * @param {string} bundle_key
   * @param {(item: any) => TemplateResult} one
   */
  const bundled = (items, bundle_key, one) => {
    if (items.length === 0) {
      return empty;
    }
    if (!all) {
      return html`${repeat(items, keyOf, one)}`;
    }
    return html`${bundlesOf(items, order).map((bundle) => {
      const collapsed = view.bundleCollapsed(bundle.root_dir, bundle_key);
      return html`<section class="pl-bundle${collapsed ? ' is-collapsed' : ''}">
        ${bundleHead(
          bundle_key === 'runnable' ? 'runnable' : lane,
          bundle,
          bundle.items.length,
          collapsed
        )}
        ${collapsed ? '' : html`${repeat(bundle.items, keyOf, one)}`}
      </section>`;
    })}`;
  };
  if (lane === 'candidate') {
    return html`<div class="pl-zone pl-zone--candidate" data-drop="candidate">
        ${bundled(model.runnable, 'runnable', (item) =>
          candidateCard(item, ctx)
        )}
      </div>
      ${view.scope_kind === 'repo'
        ? html`<details class="pl-shelf" ?open=${view.shelf_open}>
            <summary data-op="shelf-toggle">
              보류${view.shelf_open ? ` ${model.deferred.length}` : ''}
            </summary>
            ${view.shelf_open
              ? model.deferred.length === 0
                ? html`<div class="pl-empty">보류 없음</div>`
                : repeat(model.deferred, keyOf, (item) =>
                    candidateCard(item, ctx, { variant: 'deferred' })
                  )
              : ''}
          </details>`
        : ''}`;
  }
  if (lane === 'queue') {
    if (model.queue_groups.length === 0) {
      return empty;
    }
    if (!all) {
      return queueGroupBody(model.queue_groups[0], view, ctx);
    }
    return html`${model.queue_groups.map((group) => {
      const collapsed = view.bundleCollapsed(group.root_dir, 'queue');
      return html`<section class="pl-bundle${collapsed ? ' is-collapsed' : ''}">
        ${bundleHead(
          'queue',
          group,
          group.items.length,
          collapsed,
          html`<span class="pl-bundle__sub"
            >${group.auto_advance ? '자동' : '수동'} ·
            ${slotLoad(group, 'pl-bundle__load')}</span
          >`
        )}
        ${collapsed ? '' : queueGroupBody(group, view, ctx)}
      </section>`;
    })}`;
  }
  if (lane === 'running') {
    return bundled(model.running, 'running', (item) => runningTile(item, ctx));
  }
  if (lane === 'pr_wait') {
    return bundled(model.pr_wait, 'pr_wait', (item) => miniRow(item, ctx));
  }
  return bundled(model.done, 'done', (item) => miniRow(item, ctx));
}
