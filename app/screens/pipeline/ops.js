/**
 * The pipeline screen's `data-op` dispatch (UI-dbn6 §5): one table from a
 * clicked or changed control to its screen-state change or Worker action.
 * Every Worker op goes through `actions.js` (root_dir, CAS, confirm), so this
 * module only reads the control's dataset and routes it.
 */
import { normalizeDoneRange } from '../../data/closed-range.js';
import {
  normalizeTypeFilter,
  toggleLabelFilter,
  togglePriorityFilter,
  toggleRouteFilter
} from '../../model/lane-model.js';
import { disabledModelsOf } from '../../model/model-visibility.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import {
  providerResumeDraft,
  providerResumeDraftChange
} from '../dialogs/provider-resume-dialog.js';
import { queueRequestOf } from './move-sheet.js';

/**
 * @import { LaneModel } from '../../model/lane-model.js'
 * @import { LaneId, LaneView } from './lanes.js'
 * @import { createPipelineActions } from './actions.js'
 */

/**
 * @typedef {Object} ScreenUi
 * @property {boolean} filters_open
 * @property {boolean} label_menu_open
 * @property {boolean} shelf_open
 * @property {{ kind: 'move'|'place'|'ops', bead_id: string, root_dir: string }|null} sheet
 * @property {{ bead_id: string, root_dir: string, chip_key: string }|null} popover
 * @property {string|null} open_failure
 * @property {string|null} selected_attempt
 * @property {{ root_dir: string, bead_id: string, draft: any }|null} provider_resume
 */

/**
 * @typedef {Object} ViewState
 * @property {LaneView['filter']} filter
 * @property {string} candidate_sort
 * @property {'started'|'elapsed'} running_sort
 * @property {import('../../data/closed-range.js').ClosedRange} done_range
 * @property {boolean} only_shown
 * @property {string} search
 * @property {LaneId} mobile_lane
 */

/**
 * @typedef {Object} OpEnv
 * @property {ScreenUi} ui
 * @property {ViewState} vs
 * @property {ReturnType<typeof createPipelineActions>} actions
 * @property {{ toggle: (bead_id: string, chip: string, root_dir: string) => Promise<unknown> }} chip_toggle
 * @property {any} prefs - `createPipelinePrefs` result.
 * @property {(message: string, kind?: any, ms?: number) => void} toast
 * @property {(scope: string) => void} setScope
 * @property {() => string} getScope
 * @property {(id: string, root_dir: string) => void} openIssue
 * @property {((options: { scope: 'repo'|'monitor', root_dir?: string }) => void)|undefined} openSettings
 * @property {any} modelVisibilityStore
 * @property {(bead_id: string, root_dir: string) => any} itemOf
 * @property {() => LaneModel} model
 * @property {(root_dir: string) => any} queueOf
 * @property {() => Array<Record<string, any>>} states
 * @property {(root_dir: string) => any} adoptedOf
 * @property {() => 'all'|'repo'} scopeKind
 * @property {() => void} render
 * @property {(item: any, attempt_id: string) => void} openSession
 * @property {(provider: 'claude'|'codex', session_id: string, bead_id: string, root_dir: string) => void} openSessionLog
 * @property {() => void} openRepoDrawer
 */

/** @type {ReadonlyArray<LaneId>} */
export const LANE_IDS = ['candidate', 'queue', 'running', 'pr_wait', 'done'];

/**
 * @param {OpEnv} env
 * @param {LaneView['filter']} next
 */
function setFilter(env, next) {
  env.vs.filter = next;
  env.prefs.setCandidateFilter(next);
  env.render();
}

/**
 * @param {OpEnv} env
 * @param {string} text
 */
function copyText(env, text) {
  void copyToClipboard(text).then((ok) =>
    env.toast(ok ? '복사됨' : '복사 실패', ok ? 'success' : 'error', 1400)
  );
}

/**
 * Screen-local ops: scope, sheets, popovers, lane/bundle/area folding and the
 * candidate filter. Returns false when the op is not one of them.
 *
 * @param {OpEnv} env
 * @param {string} op
 * @param {DOMStringMap} data
 * @returns {boolean}
 */
function runScreenOp(env, op, data) {
  const { ui, vs, prefs } = env;
  const bead_id = data.beadId || '';
  const root_dir = data.rootDir || '';
  switch (op) {
    case 'copy-id':
      copyText(env, bead_id);
      return true;
    case 'copy-text':
      copyText(env, data.copy || '');
      return true;
    case 'scope-repo':
      if (root_dir) {
        env.setScope(root_dir);
      }
      return true;
    case 'open-issue':
      if (bead_id) {
        env.openIssue(bead_id, root_dir);
      }
      return true;
    case 'chip-popover': {
      const chip_key = data.chipKey || '';
      const same =
        ui.popover &&
        ui.popover.bead_id === bead_id &&
        ui.popover.root_dir === root_dir &&
        ui.popover.chip_key === chip_key;
      ui.popover = same ? null : { bead_id, root_dir, chip_key };
      env.render();
      return true;
    }
    case 'failure-detail': {
      const attempt_id = data.attemptId || '';
      ui.open_failure = ui.open_failure === attempt_id ? null : attempt_id;
      env.render();
      return true;
    }
    case 'place-sheet':
    case 'move-sheet':
    case 'ops-sheet':
      ui.sheet = {
        kind:
          op === 'place-sheet' ? 'place' : op === 'move-sheet' ? 'move' : 'ops',
        bead_id,
        root_dir
      };
      env.render();
      return true;
    case 'sheet-close':
      ui.sheet = null;
      env.render();
      return true;
    case 'lane-toggle': {
      const lane = /** @type {LaneId} */ (data.lane || '');
      const kind = env.scopeKind();
      prefs.setLaneCollapsed(kind, lane, !prefs.laneCollapsed(kind, lane));
      env.render();
      return true;
    }
    case 'bundle-toggle': {
      const lane = data.lane || '';
      prefs.setBundleCollapsed(
        root_dir,
        lane,
        !prefs.bundleCollapsed(root_dir, lane)
      );
      env.render();
      return true;
    }
    case 'area-toggle': {
      const area = data.value === 'serial' ? 'serial' : 'parallel';
      const kind = env.scopeKind();
      prefs.setAreaCollapsed(kind, area, !prefs.areaCollapsed(kind, area));
      env.render();
      return true;
    }
    case 'filters-toggle':
      ui.filters_open = !ui.filters_open;
      env.render();
      return true;
    case 'label-menu':
      ui.label_menu_open = !ui.label_menu_open;
      env.render();
      return true;
    case 'mobile-lane':
      vs.mobile_lane = /** @type {LaneId} */ (
        LANE_IDS.includes(/** @type {LaneId} */ (data.value))
          ? data.value
          : 'running'
      );
      prefs.setMobileLane(vs.mobile_lane);
      env.render();
      return true;
    case 'filter-route':
      setFilter(env, {
        ...vs.filter,
        routes: toggleRouteFilter(vs.filter.routes, data.value || '')
      });
      return true;
    case 'filter-readiness':
      setFilter(env, { ...vs.filter, readiness: data.value || 'all' });
      return true;
    case 'filter-priority':
      setFilter(env, {
        ...vs.filter,
        priorities: togglePriorityFilter(
          vs.filter.priorities,
          Number(data.value)
        )
      });
      return true;
    case 'repo-settings':
      env.openSettings?.({ scope: 'repo', root_dir });
      return true;
    case 'repo-ops-timeline':
      env.openRepoDrawer();
      return true;
    default:
      return false;
  }
}

/**
 * Worker ops of a card, row, tile, sheet or toolbar control.
 *
 * @param {OpEnv} env
 * @param {HTMLElement} button
 */
function runWorkerOp(env, button) {
  const { ui, actions } = env;
  const data = button.dataset;
  const op = data.op || '';
  const bead_id = data.beadId || '';
  const root_dir = data.rootDir || '';
  const item = bead_id ? env.itemOf(bead_id, root_dir) : null;
  ui.sheet = null;
  switch (op) {
    case 'chip-preset':
      if (button.getAttribute('aria-busy') !== 'true') {
        void env.chip_toggle.toggle(bead_id, data.chipKey || '', root_dir);
      }
      return;
    case 'queue-op': {
      if (data.queueOp === 'start-now') {
        void actions.startNow(bead_id, root_dir);
        return;
      }
      const request = queueRequestOf(data);
      if (request) {
        void actions.queueOp(request);
      } else {
        env.render();
      }
      return;
    }
    case 'queue-remove':
      void actions.queueOp({
        type: 'worker-queue-remove',
        payload: { bead_id },
        root_dir
      });
      return;
    case 'start-now':
      void actions.startNow(bead_id, root_dir);
      return;
    case 'probe':
      ui.popover = null;
      void actions.probe(data.runner || '', Number(data.since), root_dir);
      return;
    case 'merge':
      void actions.merge(bead_id, root_dir);
      return;
    case 'merge-cancel':
      void actions.mergeCancel(bead_id, root_dir);
      return;
    case 'merge-all':
      void actions.mergeAll([
        ...new Set(env.model().pr_wait.map((row) => row.root_dir))
      ]);
      return;
    case 'merge-stop-all':
      void actions.mergeStopAll(
        env
          .model()
          .queue_groups.filter((group) => group.merge.running)
          .map((group) => group.root_dir)
      );
      return;
    case 'resolve':
      void actions.resolve(bead_id, root_dir);
      return;
    case 'handoff':
      void actions.handoff(bead_id, data.attemptId || '', root_dir);
      return;
    case 'discard':
      void actions.discard({
        bead_id,
        root_dir,
        attempt_id: data.attemptId || '',
        operation_id: data.operationId || '',
        confirmation: data.confirmation || 'unmerged'
      });
      return;
    case 'discard-abandon':
      void actions.abandonDiscard({
        bead_id,
        root_dir,
        operation_id: data.operationId || '',
        operation_kind: data.operationKind || '',
        last_error: data.lastError || ''
      });
      return;
    case 'revise-fix':
    case 'revise-approve':
      void actions.revise(
        op === 'revise-fix' ? 'worker-revise-fix' : 'worker-revise-approve',
        bead_id,
        root_dir
      );
      return;
    case 'external-wait':
      void actions.externalWait(button);
      return;
    case 'pause':
      void actions.pause(data.attemptId || '', root_dir);
      return;
    case 'resume':
      void actions.resume({
        bead_id,
        attempt_id: data.attemptId || '',
        root_dir,
        kind: data.resumeKind === 'settlement' ? 'settlement' : 'session',
        item
      });
      return;
    case 'resume-alternate': {
      const draft = providerResumeDraft(
        data.attemptId || '',
        env.queueOf(root_dir),
        disabledModelsOf(env.modelVisibilityStore)
      );
      if (draft) {
        ui.provider_resume = { root_dir, bead_id, draft };
      }
      env.render();
      return;
    }
    case 'session-open':
      env.openSession(item, data.attemptId || item?.attempt_id || '');
      return;
    case 'session-log': {
      const provider = data.sessionProvider;
      const session_id = data.sessionId;
      if ((provider === 'claude' || provider === 'codex') && session_id) {
        env.openSessionLog(provider, session_id, bead_id, root_dir);
      }
      return;
    }
    case 'repo-automation': {
      const target = root_dir || env.getScope();
      const adopted = env.adoptedOf(target);
      const current =
        env.scopeKind() === 'all' && typeof adopted?.auto_advance === 'boolean'
          ? adopted.auto_advance
          : (env.queueOf(target)?.auto_advance ??
            env.states().find((row) => row.root_dir === target)?.auto_advance);
      void actions.automation(target, current !== true);
      return;
    }
    case 'auto-merge': {
      const target = root_dir || env.getScope();
      const current =
        env.queueOf(target)?.auto_merge ??
        env.states().find((row) => row.root_dir === target)?.auto_merge;
      void actions.autoMerge(target, current !== true);
      return;
    }
    default:
  }
}

/**
 * Run the op a clicked `[data-op]` control names.
 *
 * @param {OpEnv} env
 * @param {HTMLElement} button
 */
export function runOp(env, button) {
  const data = button.dataset;
  if (runScreenOp(env, data.op || '', data)) {
    return;
  }
  runWorkerOp(env, button);
}

/**
 * Apply a changed `<input>`/`<select>` (filters, sorts, done range, slots,
 * serial lanes, the provider resume draft).
 *
 * @param {OpEnv} env
 * @param {HTMLInputElement|HTMLSelectElement} target
 */
export function changeOp(env, target) {
  const { ui, vs, prefs } = env;
  if (ui.provider_resume) {
    const next = providerResumeDraftChange(
      ui.provider_resume.draft,
      target,
      env.queueOf(ui.provider_resume.root_dir),
      disabledModelsOf(env.modelVisibilityStore)
    );
    if (next) {
      if (next !== ui.provider_resume.draft) {
        ui.provider_resume = { ...ui.provider_resume, draft: next };
        env.render();
      }
      return;
    }
  }
  const op = target.dataset.op || '';
  const root_dir = target.dataset.rootDir || env.getScope();
  const checked = /** @type {HTMLInputElement} */ (target).checked === true;
  switch (op) {
    case 'filter-type':
      setFilter(env, { ...vs.filter, type: normalizeTypeFilter(target.value) });
      return;
    case 'filter-label':
      setFilter(env, {
        ...vs.filter,
        labels: toggleLabelFilter(vs.filter.labels, target.dataset.value || '')
      });
      return;
    case 'filter-blocked':
      setFilter(env, { ...vs.filter, show_blocked: checked });
      return;
    case 'filter-only-shown':
      vs.only_shown = checked;
      prefs.setOnlyShown(checked);
      env.render();
      return;
    case 'candidate-sort':
      vs.candidate_sort = target.value;
      prefs.setCandidateSort(target.value);
      env.render();
      return;
    case 'running-sort':
      vs.running_sort = target.value === 'elapsed' ? 'elapsed' : 'started';
      prefs.setRunningSort(vs.running_sort);
      env.render();
      return;
    case 'done-range':
      vs.done_range = normalizeDoneRange(target.value);
      prefs.setDoneRange(vs.done_range);
      env.render();
      return;
    case 'slots':
      void env.actions.setSlots(root_dir, Number(target.value));
      return;
    case 'serial-lanes':
      void env.actions.setSerialLanes(root_dir, Number(target.value));
      return;
    default:
  }
}
