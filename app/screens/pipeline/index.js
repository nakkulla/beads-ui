/**
 * The pipeline screen (UI-dbn6 §3.1–§3.4, §4.2, §5): one screen for both
 * scopes. Lanes are ALWAYS assembled from monitor-pipeline rows; the 레포 scope
 * adds its worker-queue snapshot (repo-ops material, reply adoption) and, while
 * open, the closed/deferred lists.
 *
 * Rendering: `buildLanes` is memoized on its inputs (monitor generation,
 * adopted revisions, worker-queue generation, list generation, scope, search,
 * filter, done period, time boundary). The frame and each lane body are
 * separate render roots through `ui/render.js`; relative times tick in place
 * (`ui/ticker.js`) and the one time that changes what is VISIBLE — the grace
 * expiry — re-renders only the 대기 lane, once, at `next_boundary_at`.
 */
import { html } from 'lit-html';
import { ALL_SCOPE, createPipelinePrefs } from '../../core/state.js';
import {
  closedRangeSince,
  normalizeDoneRange
} from '../../data/closed-range.js';
import { createAdoptedQueues, mergeQueue } from '../../model/adopted-queue.js';
import { createChipPresetToggle } from '../../model/chip-preset-binding.js';
import { buildLanes as defaultBuildLanes } from '../../model/lane-model.js';
import { disabledModelsOf } from '../../model/model-visibility.js';
import { createClosedRows } from '../../model/repo-rows.js';
import { createConfirm } from '../../ui/dialog.js';
import { render } from '../../ui/render.js';
import { createTicker } from '../../ui/ticker.js';
import { showToast } from '../../ui/toast.js';
import { watchViewport } from '../../ui/viewport.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import {
  providerResumeDialogTemplate,
  providerResumeOverride,
  showProviderResumeDialog
} from '../../views/worker/provider-resume-dialog.js';
import { createPipelineActions } from './actions.js';
import { cardOps } from './card.js';
import { createPointerDrag, dropRequest } from './drag.js';
import { createDrawers } from './drawers.js';
import { laneBar } from './lane-bar.js';
import { laneBody, lanesFrame } from './lanes.js';
import { miniRowOps } from './mini-row.js';
import {
  moveSheetModel,
  opsSheetModel,
  placeSheetModel,
  sheetView
} from './move-sheet.js';
import { LANE_IDS, changeOp, runOp } from './ops.js';
import { runningTileOps } from './running-tile.js';
import { allToolbar, repoToolbar } from './toolbar.js';
import {
  decorateItem,
  itemKey,
  labelOptionsOf,
  laneInputsOf,
  normalizeFilter,
  objectOf,
  rawRunnableOf,
  viewModelOf
} from './view-model.js';

/**
 * @import { LaneModel } from '../../model/lane-model.js'
 * @import { LaneId, LaneView } from './lanes.js'
 * @import { OpEnv, ScreenUi, ViewState } from './ops.js'
 * @typedef {{ get: () => any, getWorkspacesState: () => Array<Record<string, any>>, subscribe: (fn: () => void) => () => void }} MonitorStoreLike
 * @typedef {{ get: () => any, set: (queue: any) => void, subscribe: (fn: () => void) => () => void }} QueueStoreLike
 */

/**
 * @typedef {Object} PipelineDeps
 * @property {MonitorStoreLike} monitorStore
 * @property {QueueStoreLike} queueStore - The CONNECTED workspace's queue.
 * @property {{ get: () => any, set: (state: any) => void, subscribe?: (fn: () => void) => () => void }} [presetStore]
 * @property {{ get: () => any, subscribe?: (fn: () => void) => () => void }} [modelVisibilityStore]
 * @property {any} [sessionLogStore]
 * @property {{ closed: () => any[], deferred: () => any[], subscribe: (fn: () => void) => () => void }} [lists]
 * @property {() => string} getScope - `*` or a root_dir.
 * @property {(scope: string) => void} setScope
 * @property {() => string|null} getConnected
 * @property {(type: string, payload?: unknown) => Promise<any>} send
 * @property {(id: string, root_dir: string) => void} openIssue
 * @property {(options: { scope: 'repo'|'monitor', root_dir?: string }) => void} [openSettings]
 * @property {(wants: { closed_since: number|null|undefined, closed: boolean, deferred: boolean }) => void} [setListWants]
 * @property {(message: string) => boolean} [confirm]
 * @property {(message: string, kind?: any, ms?: number) => void} [toast]
 * @property {() => number} [now]
 * @property {any} [matchMedia]
 * @property {any} [storage]
 * @property {typeof defaultBuildLanes} [buildLanes]
 * @property {(x: number, y: number) => Element|null} [hitTest]
 */

/**
 * @param {HTMLElement} mount
 * @param {PipelineDeps} deps
 */
export function createPipelineScreen(mount, deps) {
  const now = deps.now || (() => Date.now());
  /** @type {(message: string, kind?: any, ms?: number) => void} */
  const toast =
    deps.toast || ((message, kind, ms) => showToast(message, kind, ms));
  const confirm = createConfirm(deps.confirm);
  const buildLanes = deps.buildLanes || defaultBuildLanes;
  const storage =
    deps.storage ||
    (typeof window !== 'undefined' ? window.localStorage : undefined);
  const prefs = createPipelinePrefs(storage);

  const stored_lane = /** @type {LaneId} */ (prefs.mobileLane());
  /** @type {ViewState} */
  const vs = {
    filter: normalizeFilter(prefs.candidateFilter()),
    candidate_sort: prefs.candidateSort() || 'spec',
    running_sort: prefs.runningSort(),
    done_range: normalizeDoneRange(prefs.doneRange() || 'today'),
    only_shown: prefs.onlyShown(),
    search: '',
    mobile_lane: LANE_IDS.includes(stored_lane) ? stored_lane : 'running'
  };
  let viewport = {
    size: /** @type {'narrow'|'medium'|'wide'} */ ('wide'),
    coarse: false
  };
  /** @type {ScreenUi} */
  const ui = {
    filters_open: false,
    label_menu_open: false,
    shelf_open: false,
    sheet: null,
    popover: null,
    open_failure: null,
    selected_attempt: null,
    provider_resume: null
  };

  const adopted = createAdoptedQueues();
  const closed_rows = createClosedRows({
    send: deps.send,
    onChange: () => {
      list_gen += 1;
      renderAll();
    }
  });

  let monitor_gen = 0;
  let queue_gen = 0;
  let list_gen = 0;
  let boundary_epoch = 0;
  let memo_key = '';
  /** @type {LaneModel|null} */
  let memo_model = null;
  /** @type {ReturnType<typeof setTimeout>|null} */
  let boundary_timer = null;
  /** @type {number|null} */
  let boundary_at = null;
  /** @type {Map<string, any>} */
  let item_by_key = new Map();
  /** @type {Map<string, any>} */
  let raw_runnable = new Map();
  let destroyed = false;

  /** @returns {'all'|'repo'} */
  function scopeKind() {
    return deps.getScope() === ALL_SCOPE ? 'all' : 'repo';
  }

  /** @returns {Array<Record<string, any>>} */
  function monitorRows() {
    const rows = deps.monitorStore.get();
    return Array.isArray(rows) ? rows : [];
  }

  /** @returns {Array<Record<string, any>>} */
  function monitorStates() {
    const rows = deps.monitorStore.getWorkspacesState();
    return Array.isArray(rows) ? rows : [];
  }

  /**
   * The worker-queue snapshot when it belongs to the repo in view.
   *
   * @param {string} root_dir
   * @returns {any}
   */
  function connectedQueue(root_dir) {
    return deps.getConnected() === root_dir ? deps.queueStore.get() : null;
  }

  /**
   * The freshest queue view of one repo.
   *
   * @param {string} root_dir
   * @returns {any}
   */
  function queueOf(root_dir) {
    const row =
      monitorRows().find((entry) => entry.root_dir === root_dir) || {};
    if (scopeKind() === 'repo') {
      const queue = connectedQueue(root_dir);
      if (
        queue &&
        (typeof row.revision !== 'number' || queue.revision >= row.revision)
      ) {
        return mergeQueue(row, queue);
      }
    }
    return mergeQueue(row, adopted.get(root_dir));
  }

  /**
   * @param {string} root_dir
   * @returns {number}
   */
  function revisionOf(root_dir) {
    const candidates = [
      queueOf(root_dir)?.revision,
      monitorStates().find((row) => row.root_dir === root_dir)?.revision
    ].filter((value) => typeof value === 'number');
    return candidates.length > 0 ? Math.max(...candidates) : 0;
  }

  const actions = createPipelineActions({
    send: deps.send,
    adopt: (root_dir, queue) => {
      if (scopeKind() === 'repo' && deps.getConnected() === root_dir) {
        deps.queueStore.set(queue);
      } else {
        adopted.adopt(root_dir, queue);
      }
      renderAll();
    },
    revisionOf,
    queueOf,
    confirm,
    toast,
    onChange: () => renderAll()
  });

  const chip_toggle = createChipPresetToggle({
    transport: (type, payload) => deps.send(type, payload),
    store: {
      get: () => deps.presetStore?.get() || null,
      set: (next) => deps.presetStore?.set(next)
    },
    onChange: () => renderAll(),
    toast: (message, kind) => toast(message, /** @type {any} */ (kind), 2600)
  });

  // --- lane model memo --------------------------------------------------------

  /** @type {{ range: string, since: number|undefined }} */
  let since_memo = { range: '', since: undefined };

  /**
   * The 레포 완료 period's lower bound. `오늘` follows the local day; a
   * rolling `7d`/`30d` bound is fixed when the period is chosen — recomputing
   * it per render would move the closed-list subscription on every frame.
   *
   * @returns {number|undefined}
   */
  function doneSince() {
    if (vs.done_range === 'today') {
      return closedRangeSince('today', now());
    }
    if (since_memo.range !== vs.done_range) {
      since_memo = {
        range: vs.done_range,
        since: closedRangeSince(vs.done_range, now())
      };
    }
    return since_memo.since;
  }

  /** @returns {boolean} */
  function doneCollapsed() {
    return prefs.laneCollapsed(scopeKind(), 'done');
  }

  /** @returns {LaneModel} */
  function computeModel() {
    const scope = deps.getScope();
    const all = scope === ALL_SCOPE;
    const key = [
      monitor_gen,
      adopted.key(),
      queue_gen,
      list_gen,
      scope,
      deps.getConnected() || '',
      all ? '' : vs.search,
      JSON.stringify(vs.filter),
      all ? 'today' : vs.done_range,
      ui.shelf_open ? 1 : 0,
      doneCollapsed() ? 1 : 0,
      boundary_epoch
    ].join('\u0001');
    if (key === memo_key && memo_model) {
      return memo_model;
    }
    const inputs = laneInputsOf({
      scope,
      rows: monitorRows(),
      states: monitorStates(),
      adopted,
      queue: all ? null : connectedQueue(scope),
      lists: deps.lists,
      closed_rows,
      shelf_open: ui.shelf_open,
      done_collapsed: doneCollapsed(),
      filter: vs.filter,
      search: vs.search,
      done_since: doneSince(),
      now: now()
    });
    memo_key = key;
    memo_model = buildLanes(
      inputs.rows,
      inputs.states,
      /** @type {any} */ (inputs.options)
    );
    raw_runnable = rawRunnableOf(inputs.rows);
    scheduleBoundary(memo_model.next_boundary_at ?? null);
    return memo_model;
  }

  /**
   * @param {number|null} at
   */
  function scheduleBoundary(at) {
    if (at === boundary_at) {
      return;
    }
    if (boundary_timer !== null) {
      clearTimeout(boundary_timer);
      boundary_timer = null;
    }
    boundary_at = at;
    if (at === null || destroyed) {
      return;
    }
    boundary_timer = setTimeout(
      () => {
        boundary_timer = null;
        boundary_at = null;
        boundary_epoch += 1;
        renderLanes(['queue']);
      },
      Math.max(0, at - now()) + 20
    );
  }

  /**
   * @param {LaneModel} model
   * @returns {LaneModel}
   */
  function viewModel(model) {
    const { vm, items } = viewModelOf(model, {
      only_shown: vs.only_shown,
      candidate_sort: vs.candidate_sort,
      running_sort: vs.running_sort,
      raw_runnable,
      decorate: (item) =>
        decorateItem(item, {
          popover: ui.popover,
          resolvePending: (id) => actions.isResolvePending(id),
          handoffPending: (id) => actions.isHandoffPending(id),
          revisePending: (id) => actions.isRevisePending(id)
        })
    });
    item_by_key = items;
    return vm;
  }

  /**
   * @param {LaneModel} model
   * @returns {LaneView}
   */
  function laneView(model) {
    const kind = scopeKind();
    return {
      scope_kind: kind,
      size: viewport.size,
      mobile_lane: vs.mobile_lane,
      collapsed: (lane) => prefs.laneCollapsed(kind, lane),
      bundleCollapsed: (root_dir, lane) =>
        prefs.bundleCollapsed(root_dir, lane),
      filter: vs.filter,
      filters_open: ui.filters_open,
      label_menu_open: ui.label_menu_open,
      label_options: ui.label_menu_open
        ? labelOptionsOf(model, vs.filter.labels)
        : [],
      only_shown: vs.only_shown,
      candidate_sort: vs.candidate_sort,
      running_sort: vs.running_sort,
      done_range: vs.done_range,
      shelf_open: ui.shelf_open,
      parallel_collapsed: prefs.areaCollapsed(kind, 'parallel'),
      serial_collapsed: prefs.areaCollapsed(kind, 'serial')
    };
  }

  /** @returns {any} */
  function chipContext() {
    const state = deps.presetStore?.get() || null;
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    const states = monitorStates();
    return {
      bindings: state.chip_bindings,
      presets: Array.isArray(state.presets) ? state.presets : [],
      revision: state.revision,
      catalogOf: (/** @type {string} */ root_dir) =>
        states.find((row) => row.root_dir === root_dir)?.runner_catalog || null,
      isBusy: (/** @type {string} */ bead_id, /** @type {string} */ chip) =>
        chip_toggle.isBusy(bead_id, chip)
    };
  }

  /** @returns {any} */
  function cardContext() {
    return {
      now: now(),
      chips: chipContext(),
      show_repo: scopeKind() === 'all',
      coarse: viewport.coarse,
      selected_attempt: ui.selected_attempt,
      open_failure: ui.open_failure
    };
  }

  // --- templates --------------------------------------------------------------

  /**
   * @param {any} item
   * @returns {import('./chips.js').OpDef[]}
   */
  function opsOf(item) {
    if (item.lane === 'runnable' || item.deferred === true) {
      return cardOps(item, now());
    }
    if (item.lane === 'running') {
      return runningTileOps(item, now());
    }
    return miniRowOps(item, now());
  }

  /**
   * @param {LaneModel} vm
   * @returns {any}
   */
  function sheetTemplate(vm) {
    const sheet = ui.sheet;
    const item = sheet
      ? item_by_key.get(itemKey(sheet.root_dir, sheet.bead_id))
      : null;
    if (!sheet || !item) {
      return '';
    }
    const group =
      vm.queue_groups.find((entry) => entry.root_dir === item.root_dir) || null;
    if (sheet.kind === 'move') {
      return sheetView(moveSheetModel(item, group, now()));
    }
    if (sheet.kind === 'place') {
      return sheetView(placeSheetModel(item, group));
    }
    return sheetView(opsSheetModel(item, opsOf(item)));
  }

  /**
   * @param {LaneModel} vm
   * @returns {any}
   */
  function toolbarTemplate(vm) {
    if (scopeKind() === 'all') {
      return allToolbar(vm, monitorStates(), (root_dir) =>
        adopted.get(root_dir)
      );
    }
    const root_dir = deps.getScope();
    return repoToolbar({
      group:
        vm.queue_groups.find((group) => group.root_dir === root_dir) || null,
      queue: queueOf(root_dir),
      search: vs.search,
      repo_ops_settings:
        deps.getConnected() === root_dir ? drawers.settingsTemplate() : ''
    });
  }

  /**
   * @param {LaneModel} vm
   * @returns {any}
   */
  function frameTemplate(vm) {
    const provider = ui.provider_resume;
    return html`<div
      class="pl-screen"
      data-size=${viewport.size}
      data-coarse=${viewport.coarse ? 'true' : 'false'}
    >
      ${toolbarTemplate(vm)} ${lanesFrame(vm, laneView(vm))}
      ${viewport.size === 'narrow' ? laneBar(vm, vs.mobile_lane) : ''}
      <div class="pl-sheet-host">${sheetTemplate(vm)}</div>
      ${providerResumeDialogTemplate(
        provider?.draft || null,
        provider ? queueOf(provider.root_dir) : {},
        disabledModelsOf(/** @type {any} */ (deps.modelVisibilityStore))
      )}
    </div>`;
  }

  // --- rendering --------------------------------------------------------------

  const frame_host = document.createElement('div');
  frame_host.className = 'pl-host';
  mount.appendChild(frame_host);

  const drawers = createDrawers(mount, {
    send: deps.send,
    sessionLogStore: deps.sessionLogStore,
    queueStore: deps.queueStore,
    getConnected: () => deps.getConnected(),
    getScope: () => deps.getScope(),
    repoInput: () => repoDrawerInput(),
    onTranscriptClose: () => {
      ui.selected_attempt = null;
      renderAll();
    },
    onChanged: () => renderAll(),
    actions
  });

  /** @returns {ReadonlyArray<LaneId>} */
  function visibleLanes() {
    return viewport.size === 'narrow' ? [vs.mobile_lane] : LANE_IDS;
  }

  /**
   * @param {LaneId} lane
   * @param {LaneModel} vm
   * @param {any} ctx
   */
  function renderLaneBody(lane, vm, ctx) {
    const el = frame_host.querySelector(`[data-lane-body="${lane}"]`);
    if (el instanceof HTMLElement) {
      render(
        laneBody(
          lane,
          vm,
          laneView(vm),
          ctx,
          monitorStates().map((row) => row.root_dir)
        ),
        el
      );
    }
  }

  function renderAll() {
    if (destroyed) {
      return;
    }
    const vm = viewModel(computeModel());
    render(frameTemplate(vm), frame_host);
    const ctx = cardContext();
    for (const lane of visibleLanes()) {
      renderLaneBody(lane, vm, ctx);
    }
    if (ui.provider_resume) {
      showProviderResumeDialog(frame_host);
    }
    drawers.refreshRepo();
    syncListWants();
  }

  /**
   * Re-render only the given lane bodies (the time boundary).
   *
   * @param {LaneId[]} lanes
   */
  function renderLanes(lanes) {
    if (destroyed) {
      return;
    }
    const vm = viewModel(computeModel());
    const ctx = cardContext();
    for (const lane of lanes) {
      if (visibleLanes().includes(lane)) {
        renderLaneBody(lane, vm, ctx);
      }
    }
  }

  let last_wants = '';
  function syncListWants() {
    if (!deps.setListWants) {
      return;
    }
    const repo = scopeKind() === 'repo';
    const closed = repo && !prefs.laneCollapsed('repo', 'done');
    const wants = {
      closed,
      closed_since: closed ? doneSince() : null,
      deferred: repo && ui.shelf_open
    };
    const key = JSON.stringify(wants);
    if (key !== last_wants) {
      last_wants = key;
      deps.setListWants(wants);
    }
  }

  /** @returns {any} */
  function repoDrawerInput() {
    const root_dir = deps.getScope();
    const group = computeModel().queue_groups.find(
      (entry) => entry.root_dir === root_dir
    );
    return {
      operations: group ? group.repo_operations : [],
      cleanup_failures: group ? group.cleanup_failures : [],
      repo: root_dir,
      repo_ops: objectOf(queueOf(root_dir)?.workspace_info).repo_ops || null
    };
  }

  // --- interaction ------------------------------------------------------------

  /**
   * @param {any} item
   * @param {string} attempt_id
   */
  function openSession(item, attempt_id) {
    if (item && item.kind === 'session') {
      const current = (item.session_refs || []).find(
        (/** @type {any} */ view) => view && view.current === true
      );
      if (current) {
        drawers.openTranscript(
          sessionRefDrawerInput(current, item.id, 'in_progress', item.root_dir)
        );
      }
      return;
    }
    if (!attempt_id || !item) {
      return;
    }
    ui.selected_attempt = attempt_id;
    drawers.openTranscript({
      attempt_id,
      root_dir: item.root_dir,
      meta: {
        runner: item.runner || undefined,
        model: item.model || undefined,
        effort: item.effort || undefined,
        status: item.run_state,
        worktree: item.root_dir
      }
    });
    renderAll();
  }

  /** @type {OpEnv} */
  const env = {
    ui,
    vs,
    actions,
    chip_toggle,
    prefs,
    toast,
    setScope: (scope) => deps.setScope(scope),
    getScope: () => deps.getScope(),
    openIssue: (id, root_dir) => deps.openIssue(id, root_dir),
    openSettings: deps.openSettings,
    modelVisibilityStore: deps.modelVisibilityStore,
    itemOf: (bead_id, root_dir) =>
      item_by_key.get(itemKey(root_dir, bead_id)) || null,
    model: () => computeModel(),
    queueOf,
    states: monitorStates,
    adoptedOf: (root_dir) => adopted.get(root_dir),
    scopeKind,
    render: () => renderAll(),
    openSession,
    openSessionLog: (provider, session_id, bead_id, root_dir) =>
      drawers.openSessionLog(provider, session_id, bead_id, root_dir),
    openRepoDrawer: () => drawers.openRepo()
  };

  /**
   * @param {MouseEvent} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    if (target.closest('.provider-resume-dialog__cancel')) {
      ui.provider_resume = null;
      renderAll();
      return;
    }
    if (target.closest('.provider-resume-dialog__confirm')) {
      const open = ui.provider_resume;
      const override = open ? providerResumeOverride(open.draft) : null;
      if (open && override) {
        ui.provider_resume = null;
        void actions.resume({
          bead_id: open.bead_id,
          attempt_id: override.attempt_id,
          root_dir: open.root_dir,
          kind: 'session',
          base_payload: override.payload
        });
      }
      return;
    }
    if (target.closest('dialog')) {
      return;
    }
    const suppressed = drag.consumeClick();
    const button = /** @type {HTMLElement|null} */ (
      target.closest('[data-op]')
    );
    if (button && button.tagName !== 'INPUT' && button.tagName !== 'SELECT') {
      ev.preventDefault();
      if (button.dataset.op === 'shelf-toggle') {
        const details = /** @type {HTMLDetailsElement|null} */ (
          button.closest('details')
        );
        ui.shelf_open = !(details && details.open);
        renderAll();
        return;
      }
      runOp(env, button);
      return;
    }
    if (
      target.closest(
        'a, summary, .pl-pop, details.pl-verdict, input, select, label'
      )
    ) {
      return;
    }
    const card = /** @type {HTMLElement|null} */ (
      target.closest(
        '.pl-card[data-bead-id], .pl-row[data-bead-id], .pl-tile[data-bead-id]'
      )
    );
    if (card && !suppressed) {
      deps.openIssue(card.dataset.beadId || '', card.dataset.rootDir || '');
    }
  }

  /**
   * @param {Event} ev
   */
  function onChange(ev) {
    const target = /** @type {HTMLInputElement|HTMLSelectElement|null} */ (
      ev.target
    );
    if (target && typeof target.closest === 'function') {
      changeOp(env, target);
    }
  }

  /**
   * @param {Event} ev
   */
  function onInput(ev) {
    const target = /** @type {HTMLInputElement|null} */ (ev.target);
    if (target && target.dataset && target.dataset.op === 'search') {
      vs.search = target.value;
      renderAll();
    }
  }

  /**
   * Close an open popover, failure popover or label menu on an outside press.
   *
   * @param {PointerEvent} ev
   */
  function onDocumentPointer(ev) {
    const target = /** @type {Element|null} */ (ev.target);
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    let changed = false;
    if (ui.popover && !target.closest('.pl-pop, [data-op="chip-popover"]')) {
      ui.popover = null;
      changed = true;
    }
    if (
      ui.open_failure &&
      !target.closest('.pl-pop--failure, [data-op="failure-detail"]')
    ) {
      ui.open_failure = null;
      changed = true;
    }
    if (ui.label_menu_open && !target.closest('.pl-filter__labels')) {
      ui.label_menu_open = false;
      changed = true;
    }
    if (changed) {
      renderAll();
    }
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocumentKey(ev) {
    if (ev.key !== 'Escape') {
      return;
    }
    if (
      ui.sheet ||
      ui.popover ||
      ui.open_failure ||
      ui.provider_resume ||
      ui.label_menu_open
    ) {
      ui.sheet = null;
      ui.popover = null;
      ui.open_failure = null;
      ui.provider_resume = null;
      ui.label_menu_open = false;
      renderAll();
    }
  }

  const drag = createPointerDrag({
    root: mount,
    hitTest: deps.hitTest,
    onDrop: (source, target) => {
      const request = dropRequest(source, target);
      if (!request) {
        return;
      }
      if ('refused' in request) {
        toast(request.refused, 'error');
        return;
      }
      void actions.queueOp(request);
    }
  });

  mount.addEventListener('click', onClick);
  mount.addEventListener('change', onChange);
  mount.addEventListener('input', onInput);
  document.addEventListener('pointerdown', onDocumentPointer);
  document.addEventListener('keydown', onDocumentKey);
  drag.attach();

  const ticker = createTicker({ root: () => mount, now });

  /** @type {Array<() => void>} */
  const unsubscribers = [];
  unsubscribers.push(
    deps.monitorStore.subscribe(() => {
      monitor_gen += 1;
      adopted.observe(monitorRows());
      renderAll();
    })
  );
  unsubscribers.push(
    deps.queueStore.subscribe(() => {
      queue_gen += 1;
      if (scopeKind() === 'repo') {
        renderAll();
      }
    })
  );
  if (deps.lists) {
    unsubscribers.push(
      deps.lists.subscribe(() => {
        list_gen += 1;
        if (scopeKind() === 'repo') {
          renderAll();
        }
      })
    );
  }
  if (deps.presetStore?.subscribe) {
    unsubscribers.push(deps.presetStore.subscribe(() => renderAll()));
  }
  if (deps.modelVisibilityStore?.subscribe) {
    unsubscribers.push(
      deps.modelVisibilityStore.subscribe(() => {
        if (ui.provider_resume) {
          renderAll();
        }
      })
    );
  }
  let first_viewport = true;
  unsubscribers.push(
    watchViewport((next) => {
      viewport = next;
      if (first_viewport) {
        first_viewport = false;
        return;
      }
      renderAll();
    }, deps.matchMedia)
  );

  adopted.observe(monitorRows());
  renderAll();
  ticker.start();

  return {
    /** Re-render after a scope or connection change. */
    refresh() {
      ui.sheet = null;
      ui.popover = null;
      renderAll();
    },
    /** @returns {LaneModel} */
    model: () => computeModel(),
    /**
     * Test and bridge seam: the kind of the open sheet, if any.
     *
     * @returns {string|null}
     */
    openSheet: () => (ui.sheet ? ui.sheet.kind : null),
    destroy() {
      destroyed = true;
      ticker.stop();
      drag.detach();
      if (boundary_timer !== null) {
        clearTimeout(boundary_timer);
      }
      for (const off of unsubscribers) {
        off();
      }
      mount.removeEventListener('click', onClick);
      mount.removeEventListener('change', onChange);
      mount.removeEventListener('input', onInput);
      document.removeEventListener('pointerdown', onDocumentPointer);
      document.removeEventListener('keydown', onDocumentKey);
      drawers.destroy();
      mount.replaceChildren();
    }
  };
}
