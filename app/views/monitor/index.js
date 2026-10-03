/**
 * Monitor tab (UI-qrfo, redesigned by UI-eey2) — Worker 콘솔의 **크로스 레포
 * 상위집합**. 모든 visible 레포의 워커 파이프라인을 Worker 탭과 **같은** 세로
 * 5레인·같은 카드로 모으고, 레포를 카드의 부가 정보가 아니라 좌표로 쓴다:
 * 실행가능·대기는 레포 섹션으로 묶고, 나머지 세 레인은 레포 배지를 단다.
 *
 * 데이터 원천은 서버의 `monitor-pipeline` 집계 구독 하나다. 무거운 배열
 * (`workspaces`)은 파이프라인이 있는 레포만 싣고, 제어 상태(`workspaces_state`)는
 * 파이프라인이 빈 레포까지 **모든** visible 레포를 싣는다.
 *
 * mutation은 전부 카드가 속한 workspace의 `root_dir`과 **그 workspace의**
 * revision을 실어 보낸다. `expected_revision`은 레포마다 다르므로, 한 레포의
 * revision을 다른 레포에 쓰면 항상 충돌한다. 충돌은 Worker 탭과 같은 규약으로
 * 1회 재시도한다 (응답이 실어 온 최신 revision으로).
 *
 * `.mon2-deck`은 레포 데크(§4)의 마운트 지점이다. 데크는 자기 DOM을 스스로
 * 소유하고, 이 뷰는 데크가 알려 준 포커스 레포를 **클래스로만** 반영한다 —
 * 필터는 숨김이 아니라 흐림이므로, 다른 레포에서 지금 무엇이 도는지는 흐려도
 * 보여야 한다.
 */
import { html, render } from 'lit-html';
import {
  DONE_RANGE_OPTIONS,
  closedRangeSince,
  normalizeDoneRange
} from '../../data/closed-range.js';
import { formatAttemptTuple } from '../../utils/attempt-display.js';
import { createChipPresetToggle } from '../../utils/chip-preset-binding.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import { debug } from '../../utils/logging.js';
import { disabledModelsOf } from '../../utils/model-visibility.js';
import { runResumeFlow } from '../../utils/resume-flow.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { showToast } from '../../utils/toast.js';
import { watchMobile } from '../../utils/viewport.js';
import { createChipPopover } from '../chip-popover.js';
import { TICK_MS, refreshTimeText } from '../time-text.js';
import {
  CANDIDATE_SORT_DEFAULT,
  chainOf,
  flipChainStepDir,
  normalizeCandidateSort,
  presetIdOf,
  setChainStepKey
} from '../worker/candidate-sort.js';
import {
  candidateSortChainTemplate,
  candidateSortSelectTemplate,
  fieldFiltersTemplate,
  labelOptionsOf
} from '../worker/candidate-tools.js';
import {
  resolveLaunchText,
  runExternalWaitAction,
  sessionResumeToast,
  sessionWindowText
} from '../worker/external-wait-action.js';
import { createIssueSearch } from '../worker/issue-search.js';
import { createLaneCollapse } from '../worker/lane-collapse.js';
import { createLaneDrag } from '../worker/lane-drag.js';
import {
  CANDIDATE_FILTER_DEFAULT,
  READINESS_FILTER_OPTIONS,
  ROUTE_FILTER_OPTIONS,
  buildLanes,
  normalizeLabelFilter,
  normalizePriorityFilter,
  normalizeRouteFilter,
  normalizeTypeFilter,
  toggleLabelFilter,
  togglePriorityFilter,
  toggleRouteFilter
} from '../worker/lane-model.js';
import {
  SERIAL_LANE_LABEL,
  candidateCard,
  discardAbandonCompletionMessage,
  discardAbandonConfirmationMessage,
  discardCompletionMessage,
  discardConfirmationMessage,
  expandWaitSubject,
  graceRemainingMs,
  judgementPopoverOf,
  miniRow,
  nowPanel,
  paneTemplate,
  providerProbeRefusalText,
  queueRowOps,
  setChipPresetContext,
  shelveReplyToast,
  shelvedSectionTemplate,
  waitBody
} from '../worker/lanes.js';
import {
  createPlanSkipMemory,
  placePlanFromPopup,
  planPlaceLanesOf
} from '../worker/plan-place.js';
import { pendingKey, prWaitRowsOf } from '../worker/pr-wait-row.js';
import {
  providerResumeDialogTemplate,
  providerResumeDraft,
  providerResumeDraftChange,
  providerResumeOverride,
  showProviderResumeDialog
} from '../worker/provider-resume-dialog.js';
import { createRepoOpsDrawer } from '../worker/repo-ops-timeline.js';
import {
  drawsRunningTile,
  runningTile,
  runningTileInput
} from '../worker/running-grid.js';
import { tileResolveFields } from '../worker/tile-resolve.js';
import { createTranscriptDrawer } from '../worker/transcript-drawer.js';
import { createRepoDeck } from './deck.js';

/**
 * @import { CandidateFilter, LaneItem, LaneModel, MonitorOccupant, LaneQueueGroup, MonitorSerialSublane } from '../worker/lane-model.js'
 * @import { DependencyChips } from '../worker/lanes.js'
 * @import { ProviderResumeDraft } from '../worker/provider-resume-dialog.js'
 * @import { DropDrag, DropTarget } from '../worker/lane-drag.js'
 */

/**
 * Persisted period range for the 완료 lane (UI-qrfo §7). Its OWN key, separate
 * from the Worker tab's — the two tabs can show different periods at once.
 *
 * @type {string}
 */
const DONE_RANGE_KEY = 'bdui.monitor.done-range';

/** Persisted sort for the 실행중 lane (UI-fmwh §4.1). */
const RUNNING_SORT_KEY = 'bdui.monitor.running_sort';

/** Persisted sort for the 실행가능 lane (UI-eey2 §5). */
export const CANDIDATE_SORT_KEY = 'bdui.monitor.candidate_sort';

/** 모니터가 소유하는 Worker 형태의 표시 필터 (UI-2gi1 §6.2, UI-eey2 §5). */
export const MONITOR_CANDIDATE_FILTER_KEY = 'beads-ui.monitor.candidate-filter';

/**
 * 실행가능 레포 섹션과 대기 레인 두 영역의 접힘 상태 (UI-eey2 §5, UI-e6hw §4.3).
 * 폐기된 대기 레포 섹션 키와 `chains` 키는 남아 있어도 읽지 않는다 (fail-quiet).
 */
export const MONITOR_SECTIONS_KEY = 'beads-ui.monitor.sections';

/**
 * UI-2gi1 §6.2: 모르는 저장 축은 무시한다. 저장값이 있으면 그것을 따르고,
 * 없으면 모니터 기본값(blocked **표시**)으로 간다 (UI-eey2 §5).
 *
 * @returns {CandidateFilter}
 */
function loadCandidateFilter() {
  try {
    const raw = window.localStorage.getItem(MONITOR_CANDIDATE_FILTER_KEY);
    if (!raw) {
      return { ...CANDIDATE_FILTER_DEFAULT };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...CANDIDATE_FILTER_DEFAULT };
    }
    return {
      show_blocked:
        typeof parsed.show_blocked === 'boolean'
          ? parsed.show_blocked
          : CANDIDATE_FILTER_DEFAULT.show_blocked,
      readiness: READINESS_FILTER_OPTIONS.some(
        (o) => o.value === parsed.readiness
      )
        ? parsed.readiness
        : 'all',
      routes: normalizeRouteFilter(parsed.routes),
      priorities: normalizePriorityFilter(parsed.priorities),
      type: normalizeTypeFilter(parsed.type),
      labels: normalizeLabelFilter(parsed.labels)
    };
  } catch {
    return { ...CANDIDATE_FILTER_DEFAULT };
  }
}

/**
 * @param {CandidateFilter} filter
 */
function saveCandidateFilter(filter) {
  try {
    window.localStorage.setItem(
      MONITOR_CANDIDATE_FILTER_KEY,
      JSON.stringify({
        show_blocked: filter.show_blocked,
        readiness: filter.readiness,
        routes: filter.routes,
        priorities: filter.priorities,
        type: filter.type,
        labels: filter.labels
      })
    );
  } catch {
    /* ignore — storage denial must not break the display toggle */
  }
}

/**
 * The monitor's candidate order: the Worker tab's sort chain plus the
 * monitor-only `레포별로 묶기` switch (UI-f2sy §6.2).
 *
 * @typedef {{ sort: import('../worker/candidate-sort.js').CandidateSortState, group_by_repo: boolean }} MonitorCandidateSort
 */

/**
 * The retired three-value sort, read as a chain plus the grouping switch it
 * implied. A value not listed here is unknown and falls to the default.
 *
 * @type {Readonly<Record<string, MonitorCandidateSort>>}
 */
const LEGACY_CANDIDATE_SORT = Object.freeze({
  repo_spec: { sort: { preset: 'spec' }, group_by_repo: true },
  repo_updated: { sort: { preset: 'updated' }, group_by_repo: true },
  updated_flat: { sort: { preset: 'updated' }, group_by_repo: false }
});

/**
 * Narrow a stored candidate-sort value — a legacy string, the current JSON, or
 * anything else — to a usable preference. The default is the `spec` preset with
 * grouping on.
 *
 * @param {unknown} raw
 * @returns {MonitorCandidateSort}
 */
export function parseCandidateSort(raw) {
  if (typeof raw === 'string' && Object.hasOwn(LEGACY_CANDIDATE_SORT, raw)) {
    return { ...LEGACY_CANDIDATE_SORT[raw] };
  }
  /** @type {unknown} */
  let parsed = null;
  try {
    parsed = typeof raw === 'string' ? JSON.parse(raw) : null;
  } catch {
    parsed = null;
  }
  const record =
    parsed && typeof parsed === 'object'
      ? /** @type {Record<string, unknown>} */ (parsed)
      : {};
  return {
    sort: normalizeCandidateSort(
      parsed && typeof parsed === 'object' ? parsed : CANDIDATE_SORT_DEFAULT
    ),
    group_by_repo: record.group_by_repo !== false
  };
}

/**
 * @returns {MonitorCandidateSort}
 */
function loadCandidateSort() {
  try {
    return parseCandidateSort(window.localStorage.getItem(CANDIDATE_SORT_KEY));
  } catch {
    return parseCandidateSort(null);
  }
}

/**
 * @param {MonitorCandidateSort} pref
 */
function saveCandidateSort(pref) {
  try {
    window.localStorage.setItem(
      CANDIDATE_SORT_KEY,
      JSON.stringify({ ...pref.sort, group_by_repo: pref.group_by_repo })
    );
  } catch {
    /* ignore */
  }
}

/**
 * @returns {Record<string, any>}
 */
function loadSections() {
  try {
    const raw = window.localStorage.getItem(MONITOR_SECTIONS_KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

/**
 * @param {Record<string, any>} sections
 */
function saveSections(sections) {
  try {
    window.localStorage.setItem(MONITOR_SECTIONS_KEY, JSON.stringify(sections));
  } catch {
    /* ignore */
  }
}

/**
 * @returns {import('../../data/closed-range.js').DoneRange}
 */
function loadDoneRange() {
  try {
    // An ABSENT key keeps the 오늘 default; only a value someone actually chose
    // is normalized, which is how a stored `30d`/`all` reads as `7d`.
    const raw = window.localStorage.getItem(DONE_RANGE_KEY);
    return raw === null ? 'today' : normalizeDoneRange(raw);
  } catch {
    return 'today';
  }
}

/**
 * @param {import('../../data/closed-range.js').DoneRange} range
 */
function saveDoneRange(range) {
  try {
    window.localStorage.setItem(DONE_RANGE_KEY, range);
  } catch {
    /* ignore */
  }
}

/**
 * @returns {'started'|'repo'}
 */
function loadRunningSort() {
  try {
    return window.localStorage.getItem(RUNNING_SORT_KEY) === 'repo'
      ? 'repo'
      : 'started';
  } catch {
    return 'started';
  }
}

/**
 * @param {'started'|'repo'} running_sort
 */
function saveRunningSort(running_sort) {
  try {
    window.localStorage.setItem(RUNNING_SORT_KEY, running_sort);
  } catch {
    /* ignore */
  }
}

/**
 * PR 대기 레인 아래 `보관 N` 묶음의 열림 상태 (UI-sd12 §3.4). Worker 탭과 다른
 * 자기 키이고, 기본·읽기 실패는 접힘이다.
 */
const SHELVED_OPEN_KEY = 'bdui.monitor.shelved-open';

/**
 * @returns {boolean}
 */
function loadShelvedOpen() {
  try {
    return window.localStorage.getItem(SHELVED_OPEN_KEY) === '1';
  } catch {
    return false;
  }
}

/**
 * @param {boolean} open
 */
function saveShelvedOpen(open) {
  try {
    if (open) {
      window.localStorage.setItem(SHELVED_OPEN_KEY, '1');
    } else {
      window.localStorage.removeItem(SHELVED_OPEN_KEY);
    }
  } catch {
    /* ignore */
  }
}

/** Client id of the monitor tab's aggregated pipeline subscription. */
export const MONITOR_PIPELINE_KEY = 'tab:monitor:pipeline';

/**
 * @typedef {Object} MonitorViewOptions
 * @property {(id: string) => void} gotoIssue
 * @property {{ get: () => Array<Record<string, any>>|null, getWorkspacesState?: () => Array<Record<string, any>>, subscribe?: (fn: () => void) => () => void }} [pipelineStore]
 * @property {any} [execPresetStore]
 * @property {{ get: () => any, subscribe?: (fn: () => void) => () => void }} [modelVisibilityStore] - Server-global
 * model visibility the provider-resume selector filters its models by.
 * @property {{ subscribe?: (fn: () => void) => () => void }} [timingSettingsStore] - Server-global
 * timing settings; a change redraws the queue grace countdown.
 * @property {(root_dir: string) => void} [openRepoSettings] - 레포 카드 `⚙`가
 * 여는 설정 다이얼로그 (UI-e1ta §7).
 * @property {() => void} [closeRepoSettings]
 * @property {() => string|null} [repoSettingsRoot]
 * @property {any} [sessionLogStore] - 실행중 타일의 `▤ 세션` 드로어가 읽는 라인
 * 스토어 (Worker 탭과 같은 것).
 * @property {{ gotoView: (view: 'worker'|'monitor'|'compare'|'adr') => void }} [router] -
 * 레포 배지·섹션 `Worker ↗` 클릭이 Worker 탭으로 넘어가는 경로.
 * @property {(type: string, payload?: unknown) => Promise<any>} [transport]
 * @property {() => string|undefined} [getWorkspacePath]
 * @property {(doc: import('../stepper.js').StepperDoc, root_dir?: string) => void} [openDoc] -
 * 후보 카드 stepper 셀이 여는 md 뷰어. 카드의 `root_dir`를 함께 넘겨 그 레포의
 * 문서를 읽는다 (spec §5).
 * @property {(root_dir: string) => Promise<unknown>} [switchWorkspace]
 * @property {(message: string) => boolean} [confirm]
 * @property {() => number} [now] - Test seam for the live clock.
 */

/**
 * The five lanes in DOM order (§3). 데스크톱은 생애주기 좌→우 독해 그대로이고,
 * 모바일은 `지금` 패널을 앞세운 관제 우선 조립을 **DOM에서** 만든다 (UI-5ksp
 * §4.7) — CSS `order` 재배열은 폐기했다: 실행 중·PR 대기가 `지금`으로 합쳐지는
 * 것은 restyle이 아니라 recombination이라 CSS가 표현할 수 없다.
 *
 * 제목 어휘는 Worker 탭과 같다 (§4.5). 탭 부가정보(완료 범위·정렬·일괄 머지)는
 * 제목이 아니라 `header_control`이 싣는다.
 *
 * @type {ReadonlyArray<{ lane: 'runnable'|'queue'|'running'|'pr_wait'|'done', pane: 'candidate'|'queue'|'running'|'pr_wait'|'done', title: string, empty: string }>}
 */
const MONITOR_LANES = [
  {
    lane: 'runnable',
    pane: 'candidate',
    title: '후보',
    empty: '실행 자격을 갖춘 이슈 없음'
  },
  { lane: 'queue', pane: 'queue', title: '대기', empty: '표시할 레포 없음' },
  { lane: 'running', pane: 'running', title: '실행 중', empty: '실행 중 없음' },
  { lane: 'pr_wait', pane: 'pr_wait', title: 'PR 대기', empty: 'PR 없음' },
  { lane: 'done', pane: 'done', title: '완료', empty: '완료 기록 없음' }
];

/**
 * 모바일 레인 순서 (§4.7): 실행 중·PR 대기는 `지금` 패널이 가져가므로 레인
 * 목록에 남지 않는다.
 *
 * @type {ReadonlyArray<'queue'|'runnable'|'done'>}
 */
const MOBILE_LANE_ORDER = ['queue', 'runnable', 'done'];

/**
 * Mount the monitor tab and keep it in sync with the aggregated pipeline store.
 *
 * @param {HTMLElement} mount_element
 * @param {MonitorViewOptions} options
 */
export function createMonitorView(mount_element, options) {
  const log = debug('views:monitor');
  const gotoIssue = options.gotoIssue;
  const pipelineStore = options.pipelineStore;
  const transport = options.transport;

  /** @type {Set<string>} */
  const external_actions = new Set();

  /** Keep replacement buttons disabled while an operation is pending. */
  function syncExternalChecks() {
    for (const button of Array.from(
      mount_element.querySelectorAll('[data-external-wait-op]')
    )) {
      const element = /** @type {HTMLButtonElement} */ (button);
      element.disabled = external_actions.has(
        `${element.dataset.rootDir}:${element.dataset.waitId}`
      );
    }
  }

  /** @param {HTMLButtonElement} button */
  async function applyExternalWaitAction(button) {
    const root_dir = button.dataset.rootDir || '';
    const wait_id = button.dataset.waitId || '';
    const key = `${root_dir}:${wait_id}`;
    if (!transport || !root_dir || !wait_id || external_actions.has(key)) {
      return;
    }
    external_actions.add(key);
    syncExternalChecks();
    try {
      await runExternalWaitAction(button, {
        transport,
        confirm: confirmFn,
        adopt: (res) => {
          if (res?.queue) {
            exec_adopted.set(root_dir, res.queue);
          }
        }
      });
    } finally {
      external_actions.delete(key);
      syncExternalChecks();
      doRender();
    }
  }
  const getWorkspacePath = options.getWorkspacePath;
  const openDoc = options.openDoc;
  const switchWorkspace = options.switchWorkspace;
  const router = options.router;
  const nowFn = options.now || (() => Date.now());
  const confirmFn =
    options.confirm ||
    ((/** @type {string} */ message) =>
      typeof globalThis.confirm !== 'function' || globalThis.confirm(message));

  /** @type {import('../../data/closed-range.js').DoneRange} */
  let done_range = loadDoneRange();
  /** @type {'started'|'repo'} */
  let running_sort = loadRunningSort();
  /** @type {CandidateFilter} */
  let candidate_filter = loadCandidateFilter();
  const stored_sort = loadCandidateSort();
  /** @type {import('../worker/candidate-sort.js').CandidateSortState} */
  let candidate_sort = stored_sort.sort;
  /** `레포별로 묶기` (UI-f2sy §6.2): 켜면 레포 섹션 안에서 체인 순서. */
  let group_by_repo = stored_sort.group_by_repo;
  /** 체인 편집 줄이 펼쳐졌는지 (UI-f2sy §6.2) — 저장 상태가 아니라 view flag다. */
  let sort_chain_open = presetIdOf(candidate_sort) === null;
  /** 라벨 필터 팝오버의 열림 상태 (UI-f2sy §6.1), 저장하지 않는 view flag다. */
  let label_filter_open = false;
  /** @type {Record<string, any>} */
  let sections_state = loadSections();
  /** `보관 N` 묶음의 열림 상태 (UI-sd12 §3.4). */
  let shelved_open = loadShelvedOpen();
  /**
   * 레인·영역 접힘 (UI-5ksp §4.4). 레포 섹션은 계속 `sections_state`가
   * 소유하지만, 다섯 레인과 대기 본문의 두 영역은 Worker 탭과 같은 스토어를
   * 같은 규칙으로 쓴다 — 저장 키만 탭마다 다르다.
   */
  const collapse = createLaneCollapse('beads-ui.monitor.lane-collapsed');
  /**
   * 관제 우선 모바일 조립이 켜졌는지 (§4.7). `matchMedia`가 없는 런타임은
   * 데스크톱 조립으로 남는다.
   */
  let is_mobile = false;
  /** @type {null | (() => void)} */
  let unsubscribe_viewport = null;
  /** @type {string|null} */
  let selected_attempt = null;
  /**
   * Which candidate's `[대기로 ↴]` lane menu is open (UI-58y2). The button and
   * the menu are the coarse-pointer/narrow-screen path; CSS owns whether they
   * are visible at all, so this state only says WHICH card asked.
   *
   * @type {string|null}
   */
  let place_menu_bead = null;

  /** @type {string|null} */
  let open_failure_detail = null;
  /**
   * 열려 있는 `⋯ 다른 방법으로` 복구 선택기 (UI-jr8v §10). 모니터는 여러 레포를
   * 한 화면에 모으므로 draft만으로는 어느 큐에 보낼지 알 수 없다 — 카드의
   * `root_dir`을 함께 든다.
   *
   * @type {{ root_dir: string, bead_id: string, draft: ProviderResumeDraft }|null}
   */
  let provider_resume = null;
  /**
   * 판정 칩 사유 팝업 (UI-8x90 §4.5·§5). 열림 키가 `bead_id + chip_key`라 카드가
   * 다시 그려져도 같은 칩 아래에 그대로 열려 있다.
   */
  const chip_popover = createChipPopover(() => doRender());
  /**
   * plan 묶음 팝업이 기억하는 마지막 일괄 배치 응답의 `skipped` (UI-ruwu §3).
   * 레포마다 따로 기억한다 — 같은 `plan_path` 문자열이 두 레포에 있을 수 있다.
   */
  const plan_skips = createPlanSkipMemory();

  /**
   * 데크가 소유하는 포커스 필터의 현재 대상 (§4.2). 여기서는 클래스만 반영한다.
   *
   * @type {string|null}
   */
  let focus_root = null;

  /**
   * @returns {string}
   */
  function doneRangeLabel() {
    const opt = DONE_RANGE_OPTIONS.find((o) => o.value === done_range);
    return opt ? opt.label : '';
  }

  /**
   * The narrow-viewport form of the same period (UI-8gem §8) — the long form
   * stays in the chip `title`.
   *
   * @returns {string}
   */
  function doneRangeShort() {
    const opt = DONE_RANGE_OPTIONS.find((o) => o.value === done_range);
    return opt ? opt.short : '';
  }

  // lit-html은 렌더 호스트의 자식을 통째로 소유하므로, 드로어는 렌더 대상
  // 바깥(마운트 직속)에 둔다.
  const console_el = document.createElement('div');
  console_el.className = 'mon';
  mount_element.appendChild(console_el);
  // 전사 드로어는 Worker 탭과 같은 오버레이 모달 계약을 쓴다: 같은 rtile이 여는
  // 같은 뷰어이므로 폭·backdrop·높이 상한이 탭마다 달라질 이유가 없다. 인라인
  // 블록이던 시절에는 `.mon2-drawer`에 규칙이 하나도 없어 화면 전체 폭으로
  // 늘어났다. backdrop을 별도 형제로 두는 것이 핵심이다 — 드로어의 바깥 클릭
  // 닫기는 마운트 요소 바깥을 눌렀는지로 판정하므로, 오버레이 자체를 마운트로
  // 쓰면 backdrop 클릭이 '안쪽'이 되어 닫히지 않는다.
  const drawer_overlay_el = document.createElement('div');
  drawer_overlay_el.className = 'worker-drawer-overlay';
  drawer_overlay_el.hidden = true;
  const drawer_backdrop_el = document.createElement('div');
  drawer_backdrop_el.className = 'worker-drawer-overlay__backdrop';
  const drawer_el = document.createElement('div');
  drawer_el.className = 'worker-drawer-host mon2-drawer';
  // 저장소 작업 타임라인은 같은 오버레이를 쓰되 자기 lit 루트를 따로 갖는다
  // (Worker 탭과 같은 구성, UI-f2sy §7): 둘 중 하나만 동시에 열린다.
  const repo_ops_drawer_el = document.createElement('div');
  repo_ops_drawer_el.className = 'worker-drawer-host mon2-drawer';
  repo_ops_drawer_el.hidden = true;
  drawer_overlay_el.append(drawer_backdrop_el, drawer_el, repo_ops_drawer_el);
  mount_element.appendChild(drawer_overlay_el);

  /** @type {LaneModel} */
  let lanes = buildLanes(null, null);
  /** @type {Map<string, LaneItem>} */
  let item_by_bead = new Map();

  /**
   * mutation 응답이 실어 온 권위 있는 queue.
   *
   * @type {Map<string, any>}
   */
  const exec_adopted = new Map();
  /**
   * This render's PR 대기 rows — the shared projection per repository
   * (UI-f2sy §4).
   *
   * @type {any[]}
   */
  let pr_rows = [];
  // 뷰 로컬 진행 중 집합 (UI-f2sy §4). 여러 저장소를 한 화면에 모으므로 키는
  // `pendingKey(root_dir, bead_id)`다.
  /** @type {Set<string>} */
  const resolve_pending = new Set();
  /** [머지] 클릭이 응답을 기다리는 행. @type {Set<string>} */
  const merge_pending = new Set();
  /** 정리 실패 행의 [워커로 이어가기] 클릭이 응답을 기다리는 행. @type {Set<string>} */
  const cleanup_pending = new Set();
  /** @type {Set<string>} */
  const handoff_pending = new Set();
  /** REVISE 처분 클릭이 응답을 기다리는 bead (UI-hs11 §3.5). @type {Set<string>} */
  const revise_pending = new Set();

  /** @type {null | (() => void)} */
  let unsubscribe_pipeline = null;
  /** @type {(() => void)|null} */
  let unsubscribe_presets = null;
  /** @type {(() => void) | null} */
  let unsubscribe_model_visibility = null;
  /** @type {(() => void) | null} */
  let unsubscribe_timing_settings = null;
  /**
   * The 1s time-text ticker while the tab is loaded (UI-yu2o): it rewrites the
   * `[data-ts]` text only and never renders.
   *
   * @type {any}
   */
  let tick_timer = null;
  /**
   * The one render due at the next time boundary — the earliest grace expiry.
   *
   * @type {any}
   */
  let boundary_timer = null;
  /** @type {ReturnType<typeof createRepoDeck>|null} */
  let deck = null;
  /**
   * 이슈 검색 상자 (UI-f2sy §6.3). 보이는 저장소 전부를 찾고, 결과를 누르면 카드
   * 클릭과 같은 `openRow` 경로로 그 저장소로 전환한 뒤 상세를 연다.
   */
  const issue_search = createIssueSearch({
    scope: 'visible',
    transport,
    openIssue: (id, root_dir) => openRow(id, root_dir)
  });

  const drawer = createTranscriptDrawer(drawer_el, {
    transport,
    sessionLogStore: options.sessionLogStore,
    onClose: () => {
      selected_attempt = null;
      drawer_overlay_el.hidden = true;
      doRender();
    }
  });

  /**
   * 저장소 작업 타임라인 서랍이 지금 말하는 저장소 (UI-f2sy §7). 서랍은 모니터에
   * 하나뿐이고 레포 띠 `⚠ N`과 설정창 `저장소` 탭이 저장소 단위로 연다. 서랍 안
   * 조작은 이 `root_dir`로 간다.
   *
   * @type {string|null}
   */
  let repo_ops_root = null;
  // Session-ephemeral like the Worker tab's (§4.1): a drawer that reopened itself
  // on every reload would be the forced expansion the redesign removed.
  const repo_ops_drawer = createRepoOpsDrawer(repo_ops_drawer_el, {
    onClose: () => {
      repo_ops_root = null;
      repo_ops_drawer_el.hidden = true;
      drawer_overlay_el.hidden = true;
      doRender();
    }
  });

  /**
   * The timeline's material for one repository: the lane model's group, which
   * already reads the pipeline entry with a mutation reply laid over it. A
   * repository without an entry has no group material, so the caller draws
   * nothing for it (fail-quiet).
   *
   * @param {string} root_dir
   * @returns {{ operations: any, cleanup_failures: any }|null}
   */
  function repoOpsMaterial(root_dir) {
    const group = lanes.groups_by_root.get(root_dir);
    return group
      ? {
          operations: group.repo_operations,
          cleanup_failures: group.cleanup_failures
        }
      : null;
  }

  /**
   * @param {string} root_dir
   * @returns {{ operations: any, cleanup_failures: any, repo: string, repo_ops: any }}
   */
  function repoOpsDrawerInput(root_dir) {
    const material = repoOpsMaterial(root_dir);
    const info = queueOf(root_dir).workspace_info;
    const repo_ops =
      info && typeof info === 'object' && info.repo_ops ? info.repo_ops : null;
    return {
      operations: material ? material.operations : [],
      cleanup_failures: material ? material.cleanup_failures : [],
      repo: root_dir,
      repo_ops
    };
  }

  /**
   * Open the 저장소 작업 타임라인 for one repository. The transcript drawer
   * closes first: the two share one overlay and only one is ever the subject.
   *
   * @param {string} root_dir
   */
  function openRepoOpsDrawer(root_dir) {
    if (!root_dir) {
      return;
    }
    if (drawer.isOpen()) {
      drawer.close();
    }
    repo_ops_root = root_dir;
    repo_ops_drawer_el.hidden = false;
    drawer_overlay_el.hidden = false;
    repo_ops_drawer.open(repoOpsDrawerInput(root_dir));
    doRender();
  }

  /** Show the shared overlay for the transcript drawer (never both at once). */
  function showTranscriptOverlay() {
    repo_ops_drawer.close();
    drawer_overlay_el.hidden = false;
  }

  /** 드롭 식별자·계획 실행 컨트롤러 (UI-4tud §4.5). */
  const lane_drag = createLaneDrag({
    transport,
    console_el,
    getLanes: () => lanes,
    getWorkspaces: () =>
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null,
    showToast,
    requestRender: () => doRender(),
    adoptQueue: (root_dir, queue) => {
      exec_adopted.set(root_dir, queue);
    },
    onDragBegin: () => {
      place_menu_bead = null;
    },
    // 접힌 후보 띠에 대기 행을 떨어뜨리면 큐에서 뺀다 — Monitor의 기존 문법이다.
    candidate_drop: true
  });
  const { applyDrop } = lane_drag;

  /**
   * Send one workspace-scoped mutation under the CAS discipline.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} root_dir
   * @param {number} revision
   * @param {boolean} [retry_conflict]
   * @returns {Promise<any>}
   */
  async function sendCas(
    type,
    payload,
    root_dir,
    revision,
    retry_conflict = true
  ) {
    if (!transport || !root_dir) {
      return null;
    }
    let adopted = false;
    let res = await transport(type, {
      ...payload,
      root_dir,
      expected_revision: revision
    });
    if (res && res.conflict && retry_conflict) {
      if (res.queue) {
        exec_adopted.set(root_dir, res.queue);
        adopted = true;
      }
      const fresh =
        res.queue && typeof res.queue.revision === 'number'
          ? res.queue.revision
          : revision;
      res = await transport(type, {
        ...payload,
        root_dir,
        expected_revision: fresh
      });
    }
    if (res && res.queue) {
      exec_adopted.set(root_dir, res.queue);
      adopted = true;
    }
    if (adopted) {
      doRender();
    }
    return res;
  }

  /**
   * The most current queue snapshot for one repo: 채택된 mutation 응답이 있으면
   * 그것, 없으면 집계가 실어 온 워크스페이스. 레포마다 revision이 다르므로 이
   * 좌표 없이 큐를 읽으면 항상 다른 레포의 사실을 본다.
   *
   * @param {string} root_dir
   * @returns {Record<string, any>}
   */
  function queueOf(root_dir) {
    const adopted = exec_adopted.get(root_dir);
    if (adopted) {
      return adopted;
    }
    const workspaces =
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
    return (
      (Array.isArray(workspaces) ? workspaces : []).find(
        (item) => item?.root_dir === root_dir
      ) || {}
    );
  }

  /**
   * @param {string} root_dir
   * @param {string} bead_id
   */
  function queuedContinuation(root_dir, bead_id) {
    const queue = queueOf(root_dir);
    return queue?.merge_queue?.find(
      (/** @type {any} */ entry) => entry.bead_id === bead_id
    )?.continuation_action;
  }

  /**
   * The REVISE-parking disposition clicks (UI-hs11 §3.5), the Worker tab's
   * `reviseDisposition`: the row's buttons stay disabled for the whole round
   * trip so a second click cannot land mid-dispatch.
   *
   * @param {'worker-revise-fix'|'worker-revise-approve'} type
   * @param {string} bead_id
   * @param {string} root_dir
   * @param {number} revision
   */
  async function reviseDisposition(type, bead_id, root_dir, revision) {
    if (!bead_id || revise_pending.has(bead_id)) {
      return;
    }
    revise_pending.add(bead_id);
    doRender();
    try {
      if (type === 'worker-revise-fix') {
        await sendContinuationAction(type, { bead_id }, root_dir, revision);
      } else {
        await sendCas(type, { bead_id }, root_dir, revision);
      }
    } finally {
      revise_pending.delete(bead_id);
      doRender();
    }
  }

  /**
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} root_dir
   * @param {number} revision
   */
  async function sendContinuationAction(type, payload, root_dir, revision) {
    const initial = await sendCas(type, payload, root_dir, revision);
    const current_revision =
      exec_adopted.get(root_dir)?.revision ??
      initial?.queue?.revision ??
      revision;
    return resolveContinuationMismatch(
      initial,
      (continuation, decision_token) =>
        sendCas(
          type,
          { ...payload, continuation, decision_token },
          root_dir,
          current_revision,
          false
        ),
      {
        refresh: (conflict) =>
          sendCas(
            type,
            payload,
            root_dir,
            conflict?.queue?.revision ??
              exec_adopted.get(root_dir)?.revision ??
              current_revision,
            false
          )
      }
    );
  }

  /**
   * @param {string} root_dir
   * @param {string} bead_id
   * @param {number} revision
   * @param {any} mismatch
   */
  async function decideQueuedContinuation(
    root_dir,
    bead_id,
    revision,
    mismatch
  ) {
    const result = await resolveContinuationMismatch(
      { continuation_mismatch: mismatch },
      (continuation, decision_token) =>
        sendCas(
          'worker-merge-queue-add',
          { bead_id, continuation, decision_token },
          root_dir,
          revision,
          false
        )
    );
    const action = result?.queue?.merge_queue?.find(
      (/** @type {any} */ entry) => entry.bead_id === bead_id
    )?.continuation_action;
    if (
      result?.applied !== true &&
      action?.continuation === null &&
      action.mismatch
    ) {
      await decideQueuedContinuation(
        root_dir,
        bead_id,
        result.queue.revision,
        action.mismatch
      );
    }
  }

  /**
   * Run the unified discard request and surface the same immediate result
   * vocabulary as the Worker tab.
   *
   * @param {Record<string, unknown>} payload
   * @param {string} root_dir
   * @param {number} revision
   */
  async function discardBead(payload, root_dir, revision) {
    const res = await sendCas('worker-discard', payload, root_dir, revision);
    if (res && res.discarded === true) {
      showToast(discardCompletionMessage(res), 'success', 5000);
      return;
    }
    if (res && res.reason) {
      showToast(`폐기 실패: ${res.reason}`, 'error');
      return;
    }
    if (res && res.accepted && res.pending === 'merged_revert') {
      showToast('revert PR 대기 상태로 전환했습니다', 'success');
      return;
    }
    if (res && res.accepted) {
      showToast(`폐기 진행: ${res.phase || '백업 중'}`, 'success');
      return;
    }
    if (res && !res.conflict) {
      showToast('폐기 거부: unknown', 'error');
    }
  }

  /**
   * Abandon one failed discard while preserving the workspace CAS boundary.
   *
   * @param {Record<string, unknown>} payload
   * @param {string} root_dir
   * @param {number} revision
   * @param {{ kind?: string, last_error: string }} operation
   */
  async function abandonDiscard(payload, root_dir, revision, operation) {
    const res = await sendCas(
      'worker-discard-abandon',
      payload,
      root_dir,
      revision
    );
    if (res && res.abandoned === true) {
      showToast(discardAbandonCompletionMessage(operation), 'success', 5000);
      return;
    }
    if (res && res.reason) {
      showToast(`폐기 포기 거부: ${res.reason}`, 'error');
      return;
    }
    if (res && !res.conflict) {
      showToast('폐기 포기 거부: unknown', 'error');
    }
  }

  /**
   * Attempt 제어 중 CAS를 쓰지 않는 둘 (Worker 탭과 같다).
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @param {string} root_dir
   * @returns {Promise<any>}
   */
  async function send(type, payload, root_dir) {
    if (!transport || !root_dir) {
      return null;
    }
    return await transport(type, { ...payload, root_dir });
  }

  /**
   * Take one attempt off the Worker — ✕ Worker에서 내리기 (2026-10-01
   * stall-reconcile D7), the Monitor twin of the Worker tab's click: one
   * attempt, no confirmation, no CAS, carrying the tile's own repo. A refusal
   * surfaces its reason.
   *
   * @param {string} attempt_id
   * @param {string} root_dir
   */
  async function withdrawAttempt(attempt_id, root_dir) {
    if (!attempt_id) {
      return;
    }
    const res = /** @type {any} */ (
      await send('worker-attempt-withdraw', { attempt_id }, root_dir)
    );
    if (res && res.withdrawn === false && res.reason) {
      showToast(`내리기 거부: ${res.reason}`, 'error', 2400);
    }
  }

  /**
   * Pull one bead's retry rung in its own repo to now — [지금 재시도]
   * (2026-10-01 stall-reconcile D9), not the retired queue-wide retry (ADR
   * UI-a5l2).
   *
   * @param {string} bead_id
   * @param {string} root_dir
   */
  async function retryBeadNow(bead_id, root_dir) {
    if (!bead_id) {
      return;
    }
    const res = /** @type {any} */ (
      await send('worker-attempt-retry-now', { bead_id }, root_dir)
    );
    if (res && res.retried === false && res.reason) {
      showToast(`지금 재시도 거부: ${res.reason}`, 'error', 2400);
    }
  }

  /**
   * `[세션에서 이어가기]` of one 확인 필요, 실패 or 외부 작업 완료 card, PR
   * 대기 rows included (UI-f2sy §4, UI-18a5 §3.2) — the server picks the
   * launcher.
   *
   * @param {string} bead_id
   * @param {string} root_dir
   * @param {number} revision
   */
  async function resolveInSession(bead_id, root_dir, revision) {
    const key = pendingKey(root_dir, bead_id);
    if (resolve_pending.has(key)) {
      return;
    }
    resolve_pending.add(key);
    doRender();
    try {
      const res = await sendCas(
        'worker-resolve-in-session',
        { bead_id },
        root_dir,
        revision,
        false
      );
      // 성공은 언제나 창 자리를 말한다 (UI-a119 §3.3) — Worker 탭과 같은 문장이다.
      // 외부 작업 완료 응답은 세션 재개 응답과 같이 읽는다 (UI-18a5 §3.2).
      if (res?.row === 'external' && res.conflict !== true) {
        const toast = await sessionResumeToast(res);
        showToast(toast.text, toast.variant, 4000);
      } else if (res?.session === 'already_running') {
        showToast(String(sessionWindowText(res)), 'info');
      } else if (res?.launched !== true) {
        showToast(`세션 기동 실패: ${res?.reason || 'unknown'}`, 'error');
      } else {
        showToast(resolveLaunchText(res), 'success');
      }
    } finally {
      resolve_pending.delete(key);
      doRender();
    }
  }

  /**
   * The [머지] click on a PR 대기 row — the Worker tab's `queueMerge` against the
   * row's own repository. The in-flight window is drawn by the shared row as
   * `큐 등록 중` until the reply lands.
   *
   * @param {string} bead_id
   * @param {string} root_dir
   * @param {number} revision
   */
  async function queueMerge(bead_id, root_dir, revision) {
    const action = queuedContinuation(root_dir, bead_id);
    if (action?.mismatch && action.continuation === null) {
      await decideQueuedContinuation(
        root_dir,
        bead_id,
        revision,
        action.mismatch
      );
      return;
    }
    const key = pendingKey(root_dir, bead_id);
    if (merge_pending.has(key)) {
      return;
    }
    merge_pending.add(key);
    doRender();
    try {
      await sendCas('worker-merge-queue-add', { bead_id }, root_dir, revision);
    } finally {
      merge_pending.delete(key);
      doRender();
    }
  }

  /**
   * Retry the stopped post-merge cleanup of one PR 대기 row — its [워커로 이어가기]
   * (UI-f2sy §4), the Worker tab's `retryCleanup` against the row's own repository. A
   * conflict is adopted but never retried automatically: another explicit
   * click against the fresh snapshot is the authorization boundary.
   *
   * @param {string} bead_id
   * @param {string} root_dir
   * @param {number} revision
   */
  async function retryCleanup(bead_id, root_dir, revision) {
    const key = pendingKey(root_dir, bead_id);
    if (cleanup_pending.has(key)) {
      return;
    }
    cleanup_pending.add(key);
    doRender();
    try {
      const res = await sendCas(
        'worker-cleanup-retry',
        { bead_id },
        root_dir,
        revision,
        false
      );
      if (res && !res.retried && !res.conflict && res.reason) {
        showToast(`워커로 이어가기 거부: ${res.reason}`, 'error', 2400);
      }
    } finally {
      cleanup_pending.delete(key);
      doRender();
    }
  }

  /**
   * One repository's latest queue revision — the coordinate every drawer
   * mutation is CAS-guarded under.
   *
   * @param {string} root_dir
   * @returns {number}
   */
  function revisionOf(root_dir) {
    const revision = queueOf(root_dir)?.revision;
    return typeof revision === 'number' ? revision : 0;
  }

  /**
   * Acknowledge ONE failed repo operation from the timeline drawer — 기록 닫기,
   * the Worker tab's `dismissRepoOperation` against the drawer's own repository.
   * Not a retry and not a state transition: only the 해결 필요 tally lets it go.
   *
   * @param {string} operation_id
   * @param {string} root_dir
   */
  async function dismissRepoOperation(operation_id, root_dir) {
    if (!operation_id) {
      return;
    }
    const res = await sendCas(
      'worker-repo-operation-dismiss',
      { operation_id },
      root_dir,
      revisionOf(root_dir)
    );
    if (res && res.ok === false) {
      showToast(`기록 닫기 거부: ${res.reason || ''}`, 'error', 3000);
    }
    doRender();
  }

  /**
   * The timeline drawer's three controls, each against the repository the drawer
   * is open on (UI-f2sy §7).
   *
   * @param {HTMLElement} target
   */
  function onRepoOpsDrawerClick(target) {
    const root_dir = repo_ops_root;
    if (root_dir === null) {
      return;
    }
    const dismiss = /** @type {HTMLElement|null} */ (
      target.closest('.worker-repo-op__dismiss')
    );
    if (dismiss) {
      void dismissRepoOperation(dismiss.dataset.operationId || '', root_dir);
      return;
    }
    const resume = /** @type {HTMLElement|null} */ (
      target.closest('.worker-cleanup__resume')
    );
    if (resume?.dataset.beadId) {
      void retryCleanup(resume.dataset.beadId, root_dir, revisionOf(root_dir));
      return;
    }
    const resolve = /** @type {HTMLElement|null} */ (
      target.closest('.worker-cleanup__resolve')
    );
    if (resolve?.dataset.beadId) {
      void resolveInSession(
        resolve.dataset.beadId,
        root_dir,
        revisionOf(root_dir)
      );
    }
  }

  /**
   * `[워커로 이어가기]` (UI-nuwy §3.6), the Monitor twin of the Worker tab's
   * click: the server reserves the handoff or continues directly.
   *
   * @param {string} bead_id
   * @param {string} attempt_id
   * @param {string} root_dir
   * @param {number} revision
   */
  async function handoffToWorker(bead_id, attempt_id, root_dir, revision) {
    if (!attempt_id || handoff_pending.has(bead_id)) {
      return;
    }
    handoff_pending.add(bead_id);
    doRender();
    try {
      const res = await sendCas(
        'worker-conversation-handoff',
        { bead_id, attempt_id },
        root_dir,
        revision,
        false
      );
      if (res && !res.conflict && !res.resumed) {
        showToast(`워커로 이어가기 거부: ${res.reason || 'unknown'}`, 'error');
      }
    } finally {
      handoff_pending.delete(bead_id);
      doRender();
    }
  }

  /**
   * Shelve or unshelve one PR 대기 row — [보관]/[보관 해제] (UI-sd12 §3.2).
   * Worker 탭과 같은 op·같은 토스트다.
   *
   * @param {string} bead_id
   * @param {boolean} on
   * @param {string} root_dir
   * @param {number} revision
   */
  async function shelveMerge(bead_id, on, root_dir, revision) {
    const res = await sendCas(
      'worker-merge-shelve',
      { bead_id, on },
      root_dir,
      revision
    );
    const toast = shelveReplyToast(res, bead_id, on);
    if (toast) {
      showToast(toast.text, toast.type, 2800);
    }
  }

  /**
   * The PR 대기 lane header's bulk button. 한 레포씩 순차로 보낸다 — workspace
   * 단위 액션이고 revision도 레포마다 다르다.
   */
  async function mergeQueueAddAll() {
    /** @type {Map<string, number>} */
    const targets = new Map();
    // 보관 행만 남은 레포에는 보낼 것이 없다 (UI-sd12 §3.3).
    for (const item of pr_rows.filter((row) => !row.shelved)) {
      if (!targets.has(item.root_dir)) {
        targets.set(item.root_dir, item.expected_revision);
      }
    }
    for (const [root_dir, revision] of targets) {
      await sendCas('worker-merge-queue-add-all', {}, root_dir, revision);
    }
  }

  /**
   * @param {string} root_dir
   * @returns {boolean}
   */
  function sectionCollapsed(root_dir) {
    const entry = sections_state[root_dir];
    return !!(entry && entry.runnable === true);
  }

  /**
   * @param {string} root_dir
   */
  function toggleSection(root_dir) {
    const entry = { ...(sections_state[root_dir] || {}) };
    entry.runnable = !entry.runnable;
    sections_state = { ...sections_state, [root_dir]: entry };
    saveSections(sections_state);
    doRender();
  }

  /**
   * Adopt a new collapse state for one lane (UI-5ksp §4.4): 스토어가 먼저
   * 저장하고 그 다음에 다시 그리므로, 새로고침은 마지막 클릭이 만든 화면을
   * 그대로 복원한다.
   *
   * @param {import('../worker/lane-collapse.js').LaneId} lane
   */
  function toggleLaneCollapse(lane) {
    collapse.toggle(lane);
    doRender();
  }

  /**
   * One 대기 본문 영역(병렬·직렬)도 같은 저장-후-재렌더 계약을 쓴다.
   *
   * @param {import('../worker/lane-collapse.js').AreaId} area
   */
  function toggleWaitArea(area) {
    collapse.toggleArea(area);
    doRender();
  }

  /**
   * Merge the 겹침 파생값 into the dependency chips a card already carries.
   *
   * @param {{ id: string, overlap_chips?: import('../worker/lane-model.js').OverlapChip[], scope_state?: 'declared'|'missing', dependency_chips?: DependencyChips|null }} row
   * @returns {DependencyChips|null}
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
   * The 판정 칩 사유 팝업 open on this card (UI-8x90 §4.5). Worker 탭과 같은
   * 함수가 문장을 만든다.
   *
   * @param {{ id: string }} item
   * @returns {{ chip_key: string, content: import('../chip-popover.js').ChipPopoverContent }|null}
   */
  function popoverOf(item) {
    return judgementPopoverOf(
      /** @type {any} */ (item),
      (chip_key) => chip_popover.isOpen({ bead_id: item.id, chip_key }),
      planContextOf
    );
  }

  /**
   * Surface material of the plan popup (UI-ruwu §3). 저장소는 그 이슈의
   * `root_dir`이고, 큐는 그 저장소의 것이다 — 레포마다 직렬 레인 수와 revision이
   * 다르다.
   *
   * @param {any} item
   * @returns {import('../worker/plan-place.js').PlanPlaceContext|null}
   */
  function planContextOf(item) {
    const root_dir = typeof item.root_dir === 'string' ? item.root_dir : '';
    if (root_dir.length === 0) {
      return null;
    }
    const plan_path = item.plan_group ? String(item.plan_group.plan_path) : '';
    return {
      root_dir,
      lanes: planPlaceLanesOf(queueOf(root_dir)),
      skipped: plan_skips.get(root_dir, plan_path)
    };
  }

  /**
   * `plan 전체를 레인에 배치` (UI-ruwu §3). revision은 그 레포의 가장 최근 큐가
   * 말한다 — 응답의 큐를 채택하므로 충돌 재시도가 새 값으로 간다.
   *
   * @param {string} plan_path
   * @param {string} root_dir
   * @param {string} lane
   */
  async function placePlan(plan_path, root_dir, lane) {
    await placePlanFromPopup({
      transport,
      showToast,
      memory: plan_skips,
      root_dir,
      plan_path,
      lane,
      revision: () => {
        const revision = queueOf(root_dir).revision;
        return typeof revision === 'number' ? revision : 0;
      },
      adopt: (reply) => {
        if (reply && reply.queue) {
          exec_adopted.set(root_dir, reply.queue);
        }
      }
    });
    doRender();
  }

  /**
   * @param {LaneItem} item
   * @returns {LaneItem}
   */
  function withOverlaps(item) {
    const chips = chipsWithOverlaps(item);
    const popover = popoverOf(item);
    // 처분 세션 요청의 in-flight 창 (UI-hs11 §3.5) — 두 번째 클릭을 막는다.
    const revise_busy =
      item.revise_enabled === true && revise_pending.has(item.id);
    return chips || popover || revise_busy
      ? {
          ...item,
          ...(chips ? { dependency_chips: chips } : {}),
          ...(popover ? { chip_popover: popover } : {}),
          ...(revise_busy ? { revise_enabled: false } : {})
        }
      : item;
  }

  // --- 템플릿 ---

  /**
   * One 실행가능 repo section header (§5): 접기 캐럿 · 레포명 · 건수 ·
   * `Worker ↗`. 자동화 토글은 데크가 소유한다.
   *
   * @param {{ root_dir: string, name: string, count: number }} input
   * @returns {import('lit-html').TemplateResult}
   */
  function sectionHeader(input) {
    const collapsed = sectionCollapsed(input.root_dir);
    return html`<header class="mon2-sec__hd">
      <button
        type="button"
        class="op-btn op-btn--icon mon2-sec__toggle"
        data-root-dir=${input.root_dir}
        data-section="runnable"
        aria-expanded=${collapsed ? 'false' : 'true'}
        aria-label=${`${input.name} 섹션 ${collapsed ? '펼치기' : '접기'}`}
      >
        ${collapsed ? '▸' : '▾'}
      </button>
      <span class="mon2-sec__name" title=${input.root_dir}>${input.name}</span>
      <span class="mon2-sec__count">${input.count}</span>
      <button
        type="button"
        class="op-btn mon2-sec__worker"
        data-root-dir=${input.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>
    </header>`;
  }

  /**
   * One 실행가능 카드 shell. 드래그 원천 종류·레포·좌표를 DOM에 실어 드래그
   * 컨트롤러가 카드 템플릿을 몰라도 되게 한다 (§5).
   *
   * @param {LaneItem} item
   * @param {import('lit-html').TemplateResult} card
   * @returns {import('lit-html').TemplateResult}
   */
  function itemShell(item, card) {
    return html`<div
      class="mon2-item"
      data-bead-id=${item.id}
      data-drag-kind="candidate"
      data-root-dir=${item.root_dir}
    >
      ${card}
    </div>`;
  }

  /**
   * `[대기로 ↴]`가 제시하는 대상: 병렬 영역과 자기 레포의 직렬 레인.
   * §5.4의 candidate → 대상 규칙을 끝 삽입으로 실행한다. 좌표는 배열 인덱스가
   * 아니라 서버가 발급한 `lane_id`다 — 목록은 스냅샷마다 순서가 바뀔 수 있다.
   *
   * @param {LaneItem} item
   * @returns {import('../worker/lanes.js').PlaceMenu|null}
   */
  function placeMenuFor(item) {
    if (place_menu_bead !== item.id) {
      return null;
    }
    const group = lanes.queue_groups.find(
      (entry) => entry.root_dir === item.root_dir
    );
    // 직렬 항목은 **설정된** 레인 수에서 온다 (§6): 비어 있어 pane이 접힌
    // 레인도 모바일에서는 유일한 적재 경로다.
    const serial = item.place_lanes || [];
    /** @type {import('../worker/lanes.js').PlaceMenuEntry[]} */
    const entries = [
      { id: 'parallel', label: '병렬', count: item.place_index ?? 0 }
    ];
    for (const lane of serial) {
      entries.push({
        id: `serial:${lane.id}`,
        label: `직렬 ${Number(lane.id.slice(1))}`,
        count: lane.length,
        group: `${group ? group.name : ''} 직렬`
      });
    }
    return { bead_id: item.id, lanes: entries };
  }

  /**
   * @param {LaneItem} item
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateRow(item) {
    return itemShell(
      item,
      html`${candidateCard(
        {
          ...withOverlaps(item),
          // 외부 작업 완료 카드의 짝 (UI-18a5 §3.2): Worker 탭 후보와 같은
          // 함수가 정한다.
          ...tileResolveFields(
            item,
            resolve_pending.has(pendingKey(item.root_dir, item.id)),
            handoff_pending.has(item.id)
          )
        },
        placeMenuFor(item),
        {
          onOpenDoc: openDoc
            ? (/** @type {Event} */ _ev, /** @type {any} */ doc) =>
                openDoc(doc, item.root_dir)
            : undefined
        }
      )}`
    );
  }

  /**
   * The 실행가능 lane body (§5). `레포별로 묶기`를 끄면 섹션 없이 평평하다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function runnableBody() {
    if (lanes.runnable_flat) {
      return html`<div class="mon2-flat" data-drop="candidate">
        ${lanes.runnable.map((item) => candidateRow(item))}
      </div>`;
    }
    return html`${lanes.runnable_sections.map((section) => {
      const collapsed = sectionCollapsed(section.root_dir);
      return html`<section
        class="mon2-sec${collapsed ? ' is-collapsed' : ''}"
        data-root-dir=${section.root_dir}
        data-section="runnable"
      >
        ${sectionHeader({
          root_dir: section.root_dir,
          name: section.name,
          count: section.items.length
        })}
        ${collapsed
          ? ''
          : html`<div
              class="mon2-sec__body"
              data-lane="candidate"
              data-drop="candidate"
            >
              ${section.items.map((item) => candidateRow(item))}
            </div>`}
      </section>`;
    })}`;
  }

  /**
   * One 병렬 영역 row (§4.1). Worker `miniRow` 그대로이고, 드래그 좌표만 바깥
   * shell이 싣는다.
   *
   * @param {LaneItem} item
   * @param {number} row_index
   * @returns {import('lit-html').TemplateResult}
   */
  function parallelRow(item, row_index) {
    return html`<div
      class="mon2-item"
      data-bead-id=${item.id}
      data-drag-kind="parallel"
      data-root-dir=${item.root_dir}
      data-row-index=${row_index}
      data-queue-index=${String(item.queue_index ?? 0)}
    >
      ${miniRow(
        {
          ...withOverlaps(item),
          ...tileResolveFields(
            item,
            resolve_pending.has(pendingKey(item.root_dir, item.id)),
            handoff_pending.has(item.id)
          )
        },
        { actions: queueRowOps(item, { nudgeable: true }) }
      )}
    </div>`;
  }

  /**
   * One 레포 직렬 레인 row (§4.2) — Worker 탭이 소유하는 s1..s5의 투영.
   *
   * @param {MonitorSerialSublane} lane
   * @param {LaneItem} item
   * @param {number} row_index
   * @returns {import('lit-html').TemplateResult}
   */
  function serialRow(lane, item, row_index) {
    return html`<div
      class="mon2-item"
      data-bead-id=${item.id}
      data-drag-kind="repo-serial"
      data-root-dir=${item.root_dir}
      data-lane-id=${lane.id}
      data-row-index=${row_index}
      data-queue-index=${String(item.queue_index ?? 0)}
    >
      ${miniRow(
        {
          ...withOverlaps(item),
          ...tileResolveFields(
            item,
            resolve_pending.has(pendingKey(item.root_dir, item.id)),
            handoff_pending.has(item.id)
          )
        },
        { actions: queueRowOps(item) }
      )}
    </div>`;
  }

  /**
   * Header occupancy badge text: 첫 점유자 id, 둘 이상이면 `+N`. 누가 잡고 있는지가
   * 보이지 않으면 `점유` 한 단어는 Worker 탭을 열어야만 풀리는 물음표였다.
   *
   * @param {MonitorOccupant[]} occupants
   */
  function occupancyLabel(occupants) {
    if (occupants.length === 0) {
      return '';
    }
    const rest = occupants.length - 1;
    return `${occupants[0].id} 점유${rest > 0 ? ` +${rest}` : ''}`;
  }

  /**
   * Occupant ghost row (Worker 탭 `worker-mini--ghost`와 같은 형태). `data-row-index`
   * 와 `data-queue-index`를 싣지 않으므로 드롭 마커·서버 인덱스 계산 모두에서
   * 투명하다 — 점유자는 서버 레인 entries의 구성원이 아니다.
   *
   * @param {MonitorOccupant} occupant
   * @returns {import('lit-html').TemplateResult}
   */
  function occupantRow(occupant) {
    return html`<div
      class="mon2-item mon2-item--ghost"
      data-bead-id=${occupant.id}
    >
      ${miniRow({
        id: occupant.id,
        title: occupant.title,
        lane: 'running',
        draggable: false,
        ghost: true,
        badges: [occupant.badge]
      })}
    </div>`;
  }

  /**
   * One 레포 직렬 레인의 공유 대기 본문 모델 (UI-5ksp §4.2). 본문 구조는
   * `waitBody`가 소유하므로 여기서는 재료만 만든다 — 행, 점유 배지, 레포
   * `Worker ↗`, 드롭 좌표, 그리고 레포 간 상호 정지 경고(`after`)다. 그 경고는
   * Monitor 전용 cross-repo 사실이라 공유 본문이 아니라 이 슬롯이 소유한다.
   *
   * @param {LaneQueueGroup} group
   * @param {MonitorSerialSublane} lane
   * @returns {import('../worker/lanes.js').WaitSerialLane}
   */
  function serialLaneModel(group, lane) {
    const occupants = lane.occupants;
    const cross_wait = lane.cross_wait_peers || [];
    return {
      id: lane.id,
      // 레포마다 같은 `s1`이 있으므로 pane 요소 id는 붙이지 않는다.
      pane_id: '',
      title: `${group.name} · ${SERIAL_LANE_LABEL} ${lane.index + 1}`,
      rows: [
        ...occupants.map((occupant) => occupantRow(occupant)),
        ...lane.items.map((item, index) => serialRow(lane, item, index))
      ],
      count: lane.items.length,
      empty: lane.empty === true,
      // 점유자가 없으면 배지 자체를 그리지 않는다 (fail-quiet, §4.2) — 툴팁은
      // 배지가 실제로 말할 것이 있을 때만 붙는다.
      ...(occupants.length > 0
        ? {
            badge: html`<span
              class="mon2-lane__occupant"
              title=${occupants
                .map((occupant) => `${occupant.id} — ${occupant.badge}`)
                .join('\n')}
              >${occupancyLabel(occupants)}</span
            >`,
            held: true
          }
        : {}),
      cycle: lane.cycle,
      header_control: html`<button
        type="button"
        class="op-btn mon2-sec__worker"
        data-root-dir=${group.root_dir}
        title="이 레포의 Worker 탭으로 이동"
      >
        Worker ↗
      </button>`,
      ...(cross_wait.length > 0
        ? {
            after: html`${cross_wait.map(
              (peer) =>
                html`<div class="mon2-lane__cross-wait">
                  ⚠ 상호 정지 — ${peer.workspace_name}·${peer.lane}과 교차 대기
                </div>`
            )}`
          }
        : {})
    };
  }

  /**
   * Render 대기 lane body (§4, 공유 본문은 UI-5ksp §4.2): 병렬 영역 하나 + 직렬
   * 영역 하나. 레포 섹션은 없다 — 카드가 자기 레포를 이미 알고 있으므로 레포는
   * 좌표가 아니라 배지다. 구조는 두 탭이 공유하는 `waitBody`가 소유한다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function waitBodyTemplate() {
    const parallel_roots = new Set(
      lanes.parallel_rows.map((item) => item.root_dir)
    );
    return waitBody({
      parallel: {
        rows: lanes.parallel_rows.map((item, index) =>
          parallelRow(item, index)
        ),
        count: lanes.parallel_rows.length,
        slots: lanes.queue_groups
          .filter(
            (group) =>
              parallel_roots.has(group.root_dir) ||
              group.live_count >= 1 ||
              group.over_cap
          )
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((group) => ({
            root_dir: group.root_dir,
            name: group.name,
            live: group.live_count,
            cap: group.slots,
            saturated: group.live_count >= group.slots
          })),
        collapsed: collapse.isAreaCollapsed('parallel'),
        drop: { drop: 'parallel' }
      },
      serial: {
        lanes: lanes.queue_groups.flatMap((group) =>
          group.sublanes.serial.map((lane) => ({
            ...serialLaneModel(group, lane),
            drop: {
              drop: 'repo-serial',
              root_dir: group.root_dir,
              lane_id: lane.id,
              lane_length: String(lane.raw_length)
            }
          }))
        ),
        collapsed: collapse.isAreaCollapsed('serial'),
        extra_panes: []
      }
    });
  }

  /**
   * The 실행 중 lane items that get a tile — Worker 탭과 같은 술어다 (UI-f2sy §5):
   * 비점유 리뷰 세션은 타일도, 레인 개수·실행 수도 갖지 않고 진행은 PR 대기
   * 줄 배지가 말한다.
   *
   * @returns {LaneItem[]}
   */
  function runningItems() {
    return lanes.running.filter((item) => drawsRunningTile(item));
  }

  /**
   * @param {number} now
   * @param {LaneItem[]} running
   * @returns {import('lit-html').TemplateResult}
   */
  function runningBody(now, running) {
    return html`<div class="worker-rungrid">
      ${running.length === 0
        ? html`<div class="worker-rungrid__empty">실행 세션 없음</div>`
        : running.map((item) =>
            runningTile(
              runningTileInput(item, {
                chip_popover: popoverOf(item),
                open_failure_detail,
                resolve_pending: resolve_pending.has(
                  pendingKey(item.root_dir, item.id)
                ),
                handoff_pending: handoff_pending.has(item.id)
              }),
              now,
              selected_attempt,
              {
                monitor: {
                  repo: item.workspace_name,
                  root_dir: item.root_dir,
                  last_activity: item.last_activity || null,
                  legs: /** @type {any} */ (item.legs || []),
                  dependency_chips: chipsWithOverlaps(item)
                }
              }
            )
          )}
    </div>`;
  }

  /**
   * @param {number} now
   * @returns {import('lit-html').TemplateResult}
   */
  function monitorTemplate(now) {
    // 보관 행은 레인 본문과 개수에서 빠져 `보관 N` 묶음에만 선다 (UI-sd12 §3.4).
    // PR 대기 행은 공유 투영이 이미 칩·팝업까지 실었다 (UI-f2sy §4).
    const pr_wait_open = pr_rows.filter((row) => !row.shelved);
    const pr_wait_shelved = shelvedSectionTemplate(
      pr_rows.filter((row) => row.shelved).map((row) => miniRow(row)),
      shelved_open
    );
    const running = runningItems();
    /** @type {Record<string, LaneItem[]>} */
    const by_lane = {
      runnable: lanes.runnable,
      queue: lanes.queue,
      running,
      pr_wait: pr_wait_open,
      done: lanes.done
    };
    /**
     * @param {(typeof MONITOR_LANES)[number]} meta
     * @returns {import('lit-html').TemplateResult}
     */
    const lanePane = (meta) => {
      const items = by_lane[meta.lane];
      const body =
        meta.lane === 'runnable'
          ? lanes.runnable_flat
            ? items.length > 0
              ? runnableBody()
              : undefined
            : lanes.runnable_sections.length > 0
              ? runnableBody()
              : undefined
          : meta.lane === 'queue'
            ? lanes.queue_groups.length > 0 || lanes.parallel_rows.length > 0
              ? waitBodyTemplate()
              : undefined
            : meta.lane === 'running'
              ? runningBody(now, running)
              : meta.lane === 'pr_wait'
                ? items.length > 0
                  ? html`${items.map((row) => miniRow(row))}`
                  : undefined
                : items.length > 0
                  ? // 완료 레인 본문도 겹침 파생을 얹어 그린다 (UI-e9sg):
                    // 투영이 계산한 `⧉ 겹침`·`scope 없음` 칩을 여기서 버리면
                    // 같은 사실이 레인마다 다르게 보인다.
                    html`${items.map((item) => miniRow(withOverlaps(item)))}`
                  : undefined;
      const display_count = meta.lane === 'queue' ? items.length : items.length;
      return paneTemplate({
        id: `monitor-${meta.lane}`,
        lane: meta.pane,
        title: meta.title,
        items,
        // 본문이 행을 소유하는 레인도 헤더 건수는 레인 구성원 수다 (§4.2).
        count: display_count,
        // 후보는 두 탭 모두 SOURCE pane이다 (§4.1): 이슈의 원천이지 생애 단계가
        // 아니라는 말이 Monitor에서도 같은 뜻이다.
        src: meta.lane === 'runnable',
        empty: meta.empty,
        body,
        footer: meta.lane === 'pr_wait' ? pr_wait_shelved : undefined,
        live: meta.lane === 'running' && items.length > 0,
        collapsible: true,
        collapsed: collapse.isCollapsed(meta.pane),
        controls: meta.lane === 'runnable' ? candidateFilterStrip() : undefined,
        header_row:
          meta.lane === 'runnable' && sort_chain_open
            ? candidateSortChainTemplate(candidate_sort)
            : undefined,
        header_control: laneHeaderControl(meta.lane, display_count)
      });
    };
    if (is_mobile) {
      // 관제 우선 배치 (§4.7, Worker 탭과 같은 분기): 지금 → 대기 → 후보 →
      // 완료. 실행 중과 PR 대기는 `지금` 패널이 가져가므로 레인으로 다시 그리지
      // 않는다 — 같은 bead가 두 곳에 보이는 것이 이 화면에서 가장 비싼 오해다.
      const mobile_metas = MOBILE_LANE_ORDER.map((lane) =>
        MONITOR_LANES.find((meta) => meta.lane === lane)
      ).filter((meta) => meta !== undefined);
      return html`<div class="mon2-deck"></div>
        <div class="worker-lanes-host">
          <div class="worker-lanes worker-lanes--mobile mon2-lanes">
            ${nowPanel({
              live: running.length > 0,
              running_body: running.length > 0 ? runningBody(now, running) : '',
              pr_wait_rows: pr_wait_open.map((row) => miniRow(row)),
              pr_wait_footer: pr_wait_shelved,
              count: running.length + pr_wait_open.length
            })}
            ${mobile_metas.map((meta) => lanePane(meta))}
          </div>
        </div>
        ${providerResumeDialogTemplate(
          provider_resume?.draft || null,
          provider_resume ? queueOf(provider_resume.root_dir) : {},
          disabledModelsOf(options.modelVisibilityStore)
        )}`;
    }
    // 레인 host는 Worker 탭과 같다 (§4.1): 다섯 레인의 최소 폭 합이 창을 넘으면
    // 여기서 가로로 스크롤한다 — 라우트 셸은 `overflow: hidden`이라 host가 없으면
    // 넘친 레인이 잘린다.
    return html`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${MONITOR_LANES.map((meta) => lanePane(meta))}
        </div>
      </div>
      ${providerResumeDialogTemplate(
        provider_resume?.draft || null,
        provider_resume ? queueOf(provider_resume.root_dir) : {},
        disabledModelsOf(options.modelVisibilityStore)
      )}`;
  }

  /**
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateFilterStrip() {
    return html`<div class="worker-filter">
      <label class="ui-field worker-filter__tgl" title="blocked 이슈 표시">
        <input
          type="checkbox"
          class="mon-filter__blocked"
          .checked=${candidate_filter.show_blocked}
        />
        🔒
        blocked${lanes.runnable_hidden.blocked > 0
          ? ` ${lanes.runnable_hidden.blocked}`
          : ''}
      </label>
      <div
        class="worker-filter__readiness"
        role="group"
        aria-label="준비도 필터"
      >
        ${READINESS_FILTER_OPTIONS.map(
          (o) =>
            html`<button
              type="button"
              class="ui-chip mon-filter__readiness worker-filter__chip${candidate_filter.readiness ===
              o.value
                ? ' is-active'
                : ''}"
              data-readiness=${o.value}
              aria-pressed=${candidate_filter.readiness === o.value
                ? 'true'
                : 'false'}
            >
              ${o.label}
            </button>`
        )}
        ${lanes.runnable_hidden.readiness > 0
          ? html`<span class="worker-filter__hidden"
              >숨김 ${lanes.runnable_hidden.readiness}</span
            >`
          : ''}
      </div>
      <div class="worker-filter__routes" role="group" aria-label="route 필터">
        ${ROUTE_FILTER_OPTIONS.map(
          (o) =>
            html`<button
              type="button"
              class="ui-chip mon-filter__route worker-filter__chip${candidate_filter.routes.includes(
                o.value
              )
                ? ' is-active'
                : ''}"
              data-route=${o.value}
              aria-pressed=${candidate_filter.routes.includes(o.value)
                ? 'true'
                : 'false'}
            >
              ${o.label}
            </button>`
        )}
        ${lanes.runnable_hidden.route > 0
          ? html`<span class="worker-filter__hidden"
              >숨김 ${lanes.runnable_hidden.route}</span
            >`
          : ''}
      </div>
      ${fieldFiltersTemplate({
        priorities: normalizePriorityFilter(candidate_filter.priorities),
        type: normalizeTypeFilter(candidate_filter.type),
        labels: normalizeLabelFilter(candidate_filter.labels),
        label_options: labelOptionsOf(
          lanes,
          normalizeLabelFilter(candidate_filter.labels)
        ),
        labels_open: label_filter_open,
        hidden: lanes.runnable_hidden
      })}
      <label
        class="ui-field worker-filter__tgl"
        title="후보를 레포 섹션으로 묶어 각 섹션 안에서 정렬합니다"
      >
        <input
          type="checkbox"
          class="mon-filter__group"
          .checked=${group_by_repo}
        />
        레포별로 묶기
      </label>
    </div>`;
  }

  /**
   * @param {string} lane
   * @param {number} count
   * @returns {import('lit-html').TemplateResult|''}
   */
  function laneHeaderControl(lane, count) {
    if (lane === 'runnable') {
      return candidateSortSelectTemplate({
        sort: candidate_sort,
        chain_open: sort_chain_open,
        extra_class: 'mon-candidate-sort'
      });
    }
    if (lane === 'running') {
      return html`<select
        class="ui-select ui-select--bare mon-running-sort worker-sort"
        aria-label="실행중 정렬"
        title="실행중 정렬"
        .value=${running_sort}
      >
        <option value="started" ?selected=${running_sort === 'started'}>
          시작순
        </option>
        <option value="repo" ?selected=${running_sort === 'repo'}>
          레포순
        </option>
      </select>`;
    }
    if (lane === 'pr_wait' && count > 0) {
      return html`<button
        type="button"
        class="op-btn mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`;
    }
    if (lane === 'done') {
      return html`<select
        class="ui-select ui-select--bare mon-done-range worker-sort"
        aria-label="완료 기간"
        title="완료 기간"
        .value=${done_range}
      >
        ${DONE_RANGE_OPTIONS.map(
          (o) =>
            html`<option value=${o.value} ?selected=${done_range === o.value}>
              ${o.label}
            </option>`
        )}
      </select>`;
    }
    return '';
  }

  /**
   * Project ONE snapshot into the monitor model (§4.4).
   *
   * @returns {LaneModel}
   */
  function projectLanes() {
    const workspaces = adoptedWorkspaces();
    const raw_state =
      pipelineStore && pipelineStore.getWorkspacesState
        ? pipelineStore.getWorkspacesState()
        : [];
    const workspaces_state = (Array.isArray(raw_state) ? raw_state : []).map(
      (row) => {
        // 채택한 응답 큐의 revision이 그 저장소의 최신이다 — 행의 다음 조작이
        // 낡은 revision으로 한 번 더 충돌하지 않는다.
        const adopted = row ? exec_adopted.get(row.root_dir) : undefined;
        return adopted && typeof adopted.revision === 'number'
          ? { ...row, revision: adopted.revision }
          : row;
      }
    );
    /** @type {Record<string, any>} */
    const options = {
      done_since: closedRangeSince(done_range, nowFn()),
      running_sort,
      candidate_filter,
      candidate_chain: candidate_sort,
      group_by_repo
    };
    return buildLanes(workspaces, workspaces_state, options);
  }

  /**
   * The pipeline's workspace entries with each mutation reply's queue laid over
   * its own repository (UI-f2sy §4), so a click's effect shows at once instead
   * of at the next push — Worker의 `adopt`와 같은 효과다. 응답 큐는
   * `decorateQueue` 장식이라 파이프라인 전용 키(후보·세션·외부 대기·오버레이·
   * 좌표)만 파이프라인 항목의 것을 지킨다. 다음 푸시가 채택분을 비운다.
   *
   * @returns {Array<Record<string, any>>|null}
   */
  function adoptedWorkspaces() {
    const workspaces =
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
    if (!Array.isArray(workspaces) || exec_adopted.size === 0) {
      return workspaces;
    }
    return workspaces.map((entry) => {
      const adopted = entry ? exec_adopted.get(entry.root_dir) : undefined;
      if (!adopted || typeof adopted !== 'object') {
        return entry;
      }
      return {
        ...entry,
        ...adopted,
        root_dir: entry.root_dir,
        name: entry.name,
        runnable: entry.runnable,
        session_active: entry.session_active,
        external_waits: entry.external_waits,
        bead_overlay: entry.bead_overlay
      };
    });
  }

  /**
   * This render's PR 대기 rows (UI-f2sy §4): the Worker tab's shared projection
   * called once per repository, with only the repository coordinates (레포
   * 배지·`root_dir`·그 저장소 revision) and the view-local popover laid over.
   * 저장소 순서는 파이프라인 항목 순서이고, 열은 Worker 탭처럼 그 저장소 스냅샷의
   * `pr_wait` 전체다 — 충돌 해소 세션이 도는 bead는 실행 중 타일과 PR 대기 행에
   * 함께 선다 (UI-dxgz §1).
   *
   * @param {LaneModel} model
   * @param {Array<Record<string, any>>|null} workspaces
   * @returns {any[]}
   */
  function projectPrWaitRows(model, workspaces) {
    /** @type {any[]} */
    const rows = [];
    for (const queue of Array.isArray(workspaces) ? workspaces : []) {
      if (
        !queue ||
        typeof queue.root_dir !== 'string' ||
        !Array.isArray(queue.pr_wait) ||
        queue.pr_wait.length === 0
      ) {
        continue;
      }
      const root_dir = queue.root_dir;
      const group = model.groups_by_root.get(root_dir) || null;
      const workspace_name =
        typeof queue.name === 'string' && queue.name ? queue.name : root_dir;
      // 그 저장소 revision은 레인 모델이 행마다 판정한 값이다 (채택한 응답이
      // 덮은 상태 행 우선). PR 대기 항목은 PR 대기 레인이나 실행 중 레인에 선다.
      const lane_item = [...model.pr_wait, ...model.running].find(
        (item) => item.root_dir === root_dir
      );
      const expected_revision = lane_item
        ? lane_item.expected_revision
        : typeof queue.revision === 'number'
          ? queue.revision
          : 0;
      for (const row of prWaitRowsOf({
        root_dir,
        queue,
        group,
        model,
        isPending: (kind, row_root, bead_id) =>
          (kind === 'merge'
            ? merge_pending
            : kind === 'cleanup'
              ? cleanup_pending
              : resolve_pending
          ).has(pendingKey(row_root, bead_id)),
        dependencyChipsOf: chipsWithOverlaps
      })) {
        const placed = { ...row, root_dir, workspace_name, expected_revision };
        rows.push({ ...placed, chip_popover: popoverOf(placed) });
      }
    }
    return rows;
  }

  /**
   * 바인딩된 판정 칩의 클릭 (UI-wg68 §5.3). 모니터의 카드는 연결 저장소가 아닐
   * 수 있으므로 `root_dir`을 언제나 싣는다.
   */
  const chip_preset_toggle = createChipPresetToggle({
    transport: (/** @type {any} */ type, /** @type {any} */ payload) =>
      transport ? transport(type, payload) : Promise.resolve(null),
    store: {
      get: () => options.execPresetStore?.get() || null,
      set: (/** @type {any} */ next) => options.execPresetStore?.set(next)
    },
    onChange: () => doRender(),
    toast: (/** @type {string} */ message, /** @type {any} */ kind) =>
      showToast(message, kind, 2600)
  });

  /**
   * The preset context of every chip this tab draws (§5.1). 저장소마다 러너
   * 카탈로그가 다르므로 `catalogOf`가 행의 `root_dir`로 고른다 — 틀린 판정보다
   * 없는 판정이 낫다.
   *
   * @returns {import('../../utils/chip-preset-binding.js').ChipPresetContext|null}
   */
  function chipPresetContext() {
    const state = options.execPresetStore?.get() || null;
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    const states =
      pipelineStore && pipelineStore.getWorkspacesState
        ? pipelineStore.getWorkspacesState()
        : [];
    return {
      bindings: state.chip_bindings,
      presets: Array.isArray(state.presets) ? state.presets : [],
      revision: state.revision,
      catalogOf: (root_dir) =>
        states.find((/** @type {any} */ row) => row.root_dir === root_dir)
          ?.runner_catalog || null,
      isBusy: (bead_id, chip) => chip_preset_toggle.isBusy(bead_id, chip)
    };
  }

  function doRender() {
    if (mount_element.hidden) {
      // 숨긴 탭은 pipeline·viewport·지연 callback 어느 쪽으로 들어와도 DOM을
      // 다시 만들지 않는다 (UI-hhn9 §6). 데이터 처리는 호출 쪽에서 이미 끝났고,
      // 재진입 load()가 최신 상태를 그린다.
      return;
    }
    const now = nowFn();
    setChipPresetContext(chipPresetContext());
    lanes = projectLanes();
    // 열린 타임라인은 새 투영에서 다시 도출한다 — 닫은 기록이나 끝난 정리가
    // 다시 열지 않고도 사라져야 한다 (접힘 상태는 서랍이 지킨다).
    if (repo_ops_root !== null && repo_ops_drawer.isOpen()) {
      repo_ops_drawer.refresh(repoOpsDrawerInput(repo_ops_root));
    }
    item_by_bead = new Map();
    pr_rows = projectPrWaitRows(lanes, adoptedWorkspaces());
    for (const item of [
      ...lanes.runnable,
      ...lanes.queue,
      ...lanes.running,
      ...lanes.pr_wait,
      ...lanes.done
    ]) {
      // 비점유 타일(head review·repair 세션, UI-hk74 §7)은 그 bead의 위치를
      // 주장하지 않는다 — 위치는 PR 대기 행이 답한다.
      if (!item.non_occupying && !item_by_bead.has(item.id)) {
        item_by_bead.set(item.id, item);
      }
    }
    render(monitorTemplate(now), console_el);
    syncExternalChecks();
    showProviderResumeDialog(console_el);
    ensureDeck()?.render();
    applyRepoAutomationTooltips();
    applyFocusClasses();
    scheduleBoundary(now);
  }

  /**
   * Arm the one render due at the next time boundary (UI-yu2o). A grace chip
   * and the `[지금 시작]` it stands up disappear when the clock passes the
   * grace expiry, which no push announces and the text ticker cannot draw. Only
   * a loaded tab arms it; every render re-arms from the lanes it just drew.
   *
   * @param {number} now
   */
  function scheduleBoundary(now) {
    if (boundary_timer !== null) {
      clearTimeout(boundary_timer);
      boundary_timer = null;
    }
    if (tick_timer === null) {
      return;
    }
    /** @type {number|null} */
    let next = null;
    for (const item of lanes.queue) {
      if (item.manual_only === true) {
        continue;
      }
      const left = graceRemainingMs(item.added_at, now);
      if (left > 0 && (next === null || left < next)) {
        next = left;
      }
    }
    if (next === null) {
      return;
    }
    boundary_timer = setTimeout(() => {
      boundary_timer = null;
      try {
        doRender();
      } catch {
        // ignore
      }
    }, next);
  }

  /**
   * Move each repo's 자동/수동 state onto its badge tooltip (§4.1) — 병렬
   * 영역에는 섹션 헤더가 없다. 배지는 두 탭이 공유하는 Worker 템플릿이
   * 그리므로, 그 템플릿을 모니터 전용 사실로 갈라놓는 대신 렌더 뒤에 툴팁만
   * 덧쓴다.
   */
  function applyRepoAutomationTooltips() {
    /** @type {Map<string, boolean>} */
    const auto_by_root = new Map();
    for (const group of lanes.queue_groups) {
      auto_by_root.set(group.root_dir, group.auto_advance);
    }
    for (const badge of Array.from(
      console_el.querySelectorAll(
        '.worker-wait__area--parallel .worker-mini__repo'
      )
    )) {
      const root_dir =
        badge.closest('.mon2-item')?.getAttribute('data-root-dir') || '';
      const auto = auto_by_root.get(root_dir);
      if (typeof auto !== 'boolean') {
        continue;
      }
      badge.setAttribute(
        'title',
        `${badge.textContent || ''} · ${auto ? '자동화 켜짐' : '자동화 꺼짐'}`
      );
    }
  }

  /**
   * Attach the repo deck to the container the lanes template leaves for it. The
   * container holds no bindings, so lit never re-creates it and the deck's own
   * DOM survives every lane re-render.
   *
   * @returns {ReturnType<typeof createRepoDeck>|null}
   */
  function ensureDeck() {
    if (deck) {
      return deck;
    }
    const host = /** @type {HTMLElement|null} */ (
      console_el.querySelector('.mon2-deck')
    );
    if (!host) {
      return null;
    }
    deck = createRepoDeck(host, {
      workspaces: () => pipelineStore?.get() || [],
      revealWaitSubject: (root_dir, bead_id) => {
        expandWaitSubject(lanes, collapse, root_dir, bead_id);
        doRender();
      },
      workspacesState: () =>
        pipelineStore && pipelineStore.getWorkspacesState
          ? pipelineStore.getWorkspacesState()
          : [],
      doneItems: () => lanes.done,
      searchElement: issue_search.element,
      rangeLabel: doneRangeLabel,
      rangeShort: doneRangeShort,
      transport,
      implPresetStore: options.execPresetStore,
      gotoWorkerTab,
      openSettings: (root_dir) => options.openRepoSettings?.(root_dir),
      closeSettings: () => options.closeRepoSettings?.(),
      settingsRoot: () => options.repoSettingsRoot?.() ?? null,
      repoOps: repoOpsMaterial,
      openRepoOps: openRepoOpsDrawer,
      onFocusChange: (root_dir) => {
        focus_root = root_dir;
        applyFocusClasses();
      }
    });
    return deck;
  }

  /**
   * Apply the focus filter (§4.2): 숨기지 않고 흐린다. 흐림 자체는 CSS가
   * 소유하고, 여기서는 루트 `has-focus`와 선명하게 남을 요소의 `is-focus`만
   * 붙인다. 카드는 자기 `root_dir`을 DOM에 싣지 않으므로 bead id로 되짚는다.
   */
  function applyFocusClasses() {
    console_el.classList.toggle('has-focus', focus_root !== null);
    for (const section of Array.from(
      console_el.querySelectorAll('.mon2-sec[data-root-dir]')
    )) {
      section.classList.toggle(
        'is-focus',
        focus_root !== null &&
          section.getAttribute('data-root-dir') === focus_root
      );
    }
    for (const card of Array.from(
      console_el.querySelectorAll(
        '.mon2-item[data-bead-id], .rtile[data-bead-id], .worker-mini[data-bead-id], .worker-card[data-bead-id]'
      )
    )) {
      const item = item_by_bead.get(card.getAttribute('data-bead-id') || '');
      card.classList.toggle(
        'is-focus',
        focus_root !== null && !!item && item.root_dir === focus_root
      );
    }
  }

  /**
   * Open an issue, switching repos through the picker's own path first when the
   * row belongs to another one.
   *
   * @param {string} id
   * @param {string} root_dir
   */
  function openRow(id, root_dir) {
    const current = getWorkspacePath ? getWorkspacePath() : undefined;
    if (!root_dir || !current || root_dir === current || !switchWorkspace) {
      gotoIssue(id);
      return;
    }
    void switchWorkspace(root_dir)
      .then(() => {
        gotoIssue(id);
      })
      .catch((err) => {
        log('workspace switch for %s failed: %o', root_dir, err);
      });
  }

  /**
   * Repo badge / `Worker ↗` click = 그 레포로 전환한 뒤 Worker 탭 (§11).
   * 전환이 실패하면 토스트만 내고 이동하지 않는다.
   *
   * @param {string} root_dir
   */
  function gotoWorkerTab(root_dir) {
    if (!root_dir) {
      return;
    }
    const current = getWorkspacePath ? getWorkspacePath() : undefined;
    const go = () => {
      try {
        router?.gotoView('worker');
      } catch (err) {
        log('gotoView(worker) failed: %o', err);
      }
    };
    if (!switchWorkspace || (current && current === root_dir)) {
      go();
      return;
    }
    void switchWorkspace(root_dir)
      .then(go)
      .catch((err) => {
        log('workspace switch for %s failed: %o', root_dir, err);
        showToast('레포 전환에 실패했습니다', 'error');
      });
  }

  /**
   * @param {string} id
   */
  function copyId(id) {
    void copyToClipboard(id).then((ok) => {
      showToast(ok ? '복사됨' : '복사 실패', ok ? 'success' : 'error', 1400);
    });
  }

  /**
   * @param {string} bead_id
   * @returns {{ item: LaneItem|null, root_dir: string, revision: number }}
   */
  function casOf(bead_id) {
    const item = item_by_bead.get(bead_id) || null;
    return {
      item,
      root_dir: item ? item.root_dir : '',
      revision: item ? item.expected_revision : 0
    };
  }

  /**
   * `↻ 지금 프로브` (UI-o5ll §3.4): 그 러너의 공급자 회복 프로브를 지금
   * 발화시킨다. 재료는 버튼이 실은 것이고 `root_dir`이 어느 저장소의 보류인지를
   * 말한다 — 큐 정지의 `since`와 섞이지 않는다.
   *
   * @param {string} runner
   * @param {number} since
   * @param {string} root_dir
   */
  async function probeProviderNow(runner, since, root_dir) {
    if (
      !transport ||
      runner.length === 0 ||
      !Number.isFinite(since) ||
      root_dir.length === 0
    ) {
      return;
    }
    const res = /** @type {any} */ (
      await transport('worker-provider-probe-now', {
        runner,
        since,
        root_dir
      })
    );
    if (res && res.queue) {
      exec_adopted.set(root_dir, res.queue);
    }
    if (res && res.ok === false) {
      showToast(
        `지금 프로브 거부: ${providerProbeRefusalText(res.reason)}`,
        'error',
        2800
      );
    }
    doRender();
  }

  /**
   * `[지금 시작]` (UI-q1tg §3.3): 이 행 하나의 대기 진입 유예를 걷고 `▶ 진행`과
   * 같은 명시적 실행 경로를 민다. CAS가 없다 — 서버가 `added_at`을 비롯한 큐를
   * 전혀 쓰지 않으므로 되돌릴 durable 변경도, 경합할 revision도 없다.
   *
   * @param {string} bead_id
   * @param {string} root_dir
   */
  async function startNow(bead_id, root_dir) {
    if (!transport || !bead_id || root_dir.length === 0) {
      doRender();
      return;
    }
    const res = /** @type {any} */ (
      await transport('worker-queue-start-now', { bead_id, root_dir })
    );
    if (res && res.queue) {
      exec_adopted.set(root_dir, res.queue);
    }
    if (res && res.ok === false) {
      showToast(
        `지금 시작 거부: ${
          res.reason === 'not_waiting'
            ? '이 이슈는 더 이상 대기 레인에 없습니다'
            : res.reason || ''
        }`,
        'error',
        2800
      );
    }
    doRender();
  }

  /**
   * `[대기로 ↴]` 메뉴 한 항목 (§6): candidate → 대상 규칙을 끝 삽입으로 실행.
   *
   * @param {string} bead_id
   * @param {string} choice
   */
  async function placeCandidateAt(bead_id, choice) {
    const item = item_by_bead.get(bead_id);
    if (!item) {
      doRender();
      return;
    }
    /** @type {DropDrag} */
    const drag = { kind: 'candidate', bead_id, root_dir: item.root_dir };
    if (choice.startsWith('serial:')) {
      const lane_id = choice.slice('serial:'.length);
      const lane = (item.place_lanes || []).find(
        (entry) => entry.id === lane_id
      );
      await applyDrop(drag, {
        kind: 'repo-serial',
        root_dir: item.root_dir,
        lane_id: /** @type {any} */ (lane_id),
        index: lane ? lane.index : 0
      });
      return;
    }
    await applyDrop(drag, {
      kind: 'parallel',
      marker_index: lanes.parallel_rows.length
    });
  }

  /**
   * The 병렬 영역's mobile `↑ ↓` (§6): 같은 레포 행 사이에서만 자리를
   * 바꾼다.
   *
   * @param {string} bead_id
   * @param {-1|1} direction
   */
  async function nudgeParallelRow(bead_id, direction) {
    const rows = lanes.parallel_rows;
    const position = rows.findIndex((row) => row.id === bead_id);
    if (position < 0) {
      return;
    }
    const root_dir = rows[position].root_dir;
    /** @type {number[]} */
    const siblings = [];
    rows.forEach((row, index) => {
      if (row.root_dir === root_dir) {
        siblings.push(index);
      }
    });
    const at = siblings.indexOf(position);
    const neighbour = siblings[at + direction];
    if (typeof neighbour !== 'number') {
      return;
    }
    // 위로는 앞 형제 자리에, 아래로는 뒤 형제의 **다음** 자리에 마커를 둔다.
    const marker_index =
      direction === -1
        ? neighbour
        : (siblings[at + 2] ?? Math.min(rows.length, neighbour + 1));
    await applyDrop(
      {
        kind: 'parallel',
        bead_id,
        root_dir,
        queue_index: rows[position].queue_index ?? 0
      },
      { kind: 'parallel', marker_index }
    );
  }

  // --- 클릭 위임 ---

  /**
   * @param {LaneItem} item
   * @returns {import('../worker/transcript-drawer.js').DrawerMeta}
   */
  function drawerMeta(item) {
    return {
      runner: item.runner || undefined,
      model: item.model || undefined,
      effort: item.effort || undefined,
      status: item.run_state === 'running' ? 'running' : item.run_state,
      worktree: item.root_dir
    };
  }

  /**
   * Resume one attempt — 타일의 `↻ 이어하기` (UI-6g3t §5.1). 흐름 자체 — 지시
   * 다이얼로그, 충돌 1회 재시도, continuation 경계, 거부 토스트 — 는
   * `runResumeFlow`가 소유하고, 이 탭이 넘기는 것은 대상 문맥과 재시도 없는
   * 전송 하나뿐이다. `sendCas`의 재시도를
   * 끄는 이유는 유틸이 이미 충돌 1회 재시도의 소유자라, 켜 두면 한 충돌에 두
   * 소유자가 각자 다시 보내기 때문이다. revision은 전송 시점에 채택된 큐에서
   * 새로 읽는다.
   *
   * `base_payload`는 이 호출 한 번의 `exec_override`·강제 continuation을
   * 싣는다 (UI-jr8v §10): 흐름의 base payload에 얹히므로 첫 전송·충돌 재전송·
   * 불일치 재전송이 모두 같은 값을 유지한다.
   *
   * @param {string} bead_id
   * @param {string} attempt_id
   * @param {string} root_dir
   * @param {'session'|'settlement'} resume_kind
   * @param {Record<string, unknown>} [base_payload]
   */
  function resumeAttempt(
    bead_id,
    attempt_id,
    root_dir,
    resume_kind,
    base_payload = {}
  ) {
    const item = item_by_bead.get(bead_id) || null;
    void runResumeFlow({
      context: {
        bead_id,
        kind: resume_kind,
        tuple: item ? formatAttemptTuple(item) : ''
      },
      transport: (payload) =>
        sendCas(
          'worker-attempt-resume',
          { attempt_id, ...base_payload, ...payload },
          root_dir,
          exec_adopted.get(root_dir)?.revision ?? casOf(bead_id).revision,
          false
        )
      // `adopt`는 넘기지 않는다 — `sendCas`가 응답의 큐를 `exec_adopted`에
      // 이미 채택하고, 위 revision 읽기가 그 값을 본다.
    });
  }

  /** Close the provider recovery selector without resuming. */
  function closeProviderResumeDialog() {
    provider_resume = null;
    doRender();
  }

  /** Send the selected one-attempt override through the existing resume path. */
  function confirmProviderResumeDialog() {
    const open = provider_resume;
    const override = open ? providerResumeOverride(open.draft) : null;
    if (!open || !override) {
      return;
    }
    provider_resume = null;
    doRender();
    resumeAttempt(
      open.bead_id,
      override.attempt_id,
      open.root_dir,
      'session',
      override.payload
    );
  }

  /**
   * @param {HTMLElement} button
   * @param {string} bead_id
   */
  function runRowAction(button, bead_id) {
    const { item, root_dir, revision } = casOf(bead_id);
    const attempt_id = item?.attempt_id || '';
    const cls = button.classList;
    if (
      cls.contains('worker-mini__rowops-up') ||
      cls.contains('worker-mini__rowops-down')
    ) {
      void nudgeParallelRow(
        bead_id,
        cls.contains('worker-mini__rowops-up') ? -1 : 1
      );
      return;
    }
    if (cls.contains('worker-mini__rowops-remove')) {
      void sendCas('worker-queue-remove', { bead_id }, root_dir, revision);
      return;
    }
    if (cls.contains('worker-mini__start-now')) {
      void startNow(bead_id, root_dir);
      return;
    }
    if (cls.contains('worker-mini__provider-probe')) {
      void probeProviderNow(
        button.getAttribute('data-runner') || '',
        Number(button.getAttribute('data-since')),
        root_dir
      );
      return;
    }
    if (cls.contains('chip-popover__plan-place')) {
      // plan 묶음 칩 팝업의 출구 (UI-ruwu §3): 레인은 같은 줄의 select가 말하고
      // 저장소와 plan은 버튼이 실은 값이다.
      const lane_select = /** @type {HTMLSelectElement|null} */ (
        button.parentElement?.querySelector('[data-plan-lane]') || null
      );
      void placePlan(
        button.getAttribute('data-plan-path') || '',
        button.getAttribute('data-root-dir') || root_dir,
        lane_select ? lane_select.value : ''
      );
      return;
    }
    if (cls.contains('worker-dep__open')) {
      // 열리는 칩 네 종 (`⛓`·`→`·`🔓`·`⧉`) 모두 그 이슈로 이동한다 (UI-8x90
      // §4.3, Worker `openBlocker`와 같은 순서). 편집은 도착한 이슈의 상세
      // `의존성` 절이 소유한다 — 칩 자리에서는 끊지 않는다.
      openRow(
        button.getAttribute('data-dep-id') || '',
        button.getAttribute('data-root-dir') || ''
      );
      return;
    }
    if (cls.contains('worker-created-source')) {
      openRow(
        button.getAttribute('data-source-id') || '',
        button.getAttribute('data-root-dir') || ''
      );
      return;
    }
    if (cls.contains('ctl-chip--from')) {
      // `↩ from` 칩 (Worker `onClick`과 같은 의미): 출처 bead는 이 행과 같은
      // 저장소에 있으므로 행의 저장소를 거쳐 연다.
      openRow(button.getAttribute('data-from-id') || '', root_dir || '');
      return;
    }
    if (cls.contains('judgement-chip--bound')) {
      // 바인딩된 칩은 팝업 칩보다 먼저 판정한다 (UI-wg68 §5.3) — 같은 버튼에
      // 두 선택자가 걸리므로 순서가 클릭 의미다.
      const chip_key = button.getAttribute('data-chip-key') || '';
      if (chip_key && button.getAttribute('aria-busy') !== 'true') {
        void chip_preset_toggle.toggle(
          button.getAttribute('data-bead-id') || bead_id,
          chip_key,
          button.getAttribute('data-root-dir') || root_dir || ''
        );
      }
      return;
    }
    if (cls.contains('judgement-chip')) {
      // 판정 칩 클릭 = 사유 팝업 (UI-8x90 §4.5). 카드 클릭(상세 열기)은 이미
      // `onClick`이 버튼을 먼저 잡아 멈춘 뒤다.
      const chip_key = button.getAttribute('data-chip-key') || '';
      if (chip_key) {
        chip_popover.toggle({ bead_id, chip_key });
      }
      return;
    }
    if (cls.contains('rtile__failure-badge')) {
      open_failure_detail =
        open_failure_detail === attempt_id ? null : attempt_id;
      doRender();
      return;
    }
    if (cls.contains('rtile__attempt-copy')) {
      const value = button.getAttribute('data-attempt-id') || '';
      if (value) {
        void copyToClipboard(value).then((ok) => {
          showToast(
            ok ? '복사됨' : '복사 실패',
            ok ? 'success' : 'error',
            1400
          );
        });
      }
      return;
    }
    if (cls.contains('worker-card__place')) {
      // 좁은 화면/coarse pointer 전용 보완재 (§5): 어느 레인에 넣을지부터 묻는다.
      place_menu_bead = place_menu_bead === bead_id ? null : bead_id;
      doRender();
      return;
    }
    if (cls.contains('worker-card__place-cancel')) {
      place_menu_bead = null;
      doRender();
      return;
    }
    if (cls.contains('worker-card__place-lane')) {
      const choice = button.getAttribute('data-lane') || 'parallel';
      place_menu_bead = null;
      void placeCandidateAt(bead_id, choice);
      return;
    }
    if (cls.contains('interactive-session-badge')) {
      const provider = button.getAttribute('data-session-provider');
      const session_id = button.getAttribute('data-session-id');
      if ((provider === 'claude' || provider === 'codex') && session_id) {
        showTranscriptOverlay();
        drawer.open(
          sessionRefDrawerInput(
            {
              provider,
              session_id,
              current: true,
              locality: 'local',
              index: 0,
              host: '',
              last_event_at: null,
              resume_command: null
            },
            bead_id,
            'in_progress',
            root_dir
          )
        );
        doRender();
      }
      return;
    }
    if (cls.contains('rtile__session')) {
      if (item && item.kind === 'session') {
        // 세션 타일에는 하이라이트할 attempt가 없으므로 `selected_attempt`도
        // 건드리지 않는다 (UI-4xzk §6.4). 드로어 키는 `session:<provider>:<sid>`다.
        const current = (item.session_refs || []).find(
          (view) => view && view.current === true
        );
        if (current) {
          showTranscriptOverlay();
          drawer.open(
            sessionRefDrawerInput(current, bead_id, 'in_progress', root_dir)
          );
          doRender();
        }
        return;
      }
      selected_attempt = attempt_id;
      if (attempt_id && item) {
        showTranscriptOverlay();
        drawer.open({
          attempt_id,
          root_dir,
          meta: drawerMeta(item)
        });
      }
      doRender();
      return;
    }
    if (cls.contains('rtile__pause')) {
      void send('worker-attempt-pause', { attempt_id }, root_dir);
      return;
    }
    if (cls.contains('rtile__withdraw')) {
      void withdrawAttempt(attempt_id, root_dir);
      return;
    }
    if (cls.contains('rtile__retry-now')) {
      void retryBeadNow(bead_id, root_dir);
      return;
    }
    if (cls.contains('rtile__resume-alternate')) {
      // 공급자 보류의 두 번째 출구 (UI-jr8v §10). 선택기는 Worker 탭과 같은
      // 모듈이 그리므로, 이 탭이 하는 일은 어느 레포의 attempt인지를 실어 두는
      // 것뿐이다.
      const draft = providerResumeDraft(
        attempt_id,
        queueOf(root_dir),
        disabledModelsOf(options.modelVisibilityStore)
      );
      if (draft) {
        provider_resume = { root_dir, bead_id, draft };
        doRender();
      }
      return;
    }
    if (cls.contains('rtile__resume')) {
      resumeAttempt(
        bead_id,
        attempt_id,
        root_dir,
        button.dataset.resumeKind === 'settlement' ? 'settlement' : 'session'
      );
      return;
    }
    // 대기·PR 대기 줄의 `[세션에서 이어가기]`도 타일과 같은 op다 (UI-f2sy §4).
    if (
      cls.contains('rtile__resolve') ||
      cls.contains('worker-mini__resolve')
    ) {
      void resolveInSession(
        bead_id,
        root_dir,
        exec_adopted.get(root_dir)?.revision ?? casOf(bead_id).revision
      );
      return;
    }
    if (
      cls.contains('rtile__handoff') ||
      cls.contains('worker-mini__handoff')
    ) {
      void handoffToWorker(
        bead_id,
        button.dataset.attemptId || '',
        root_dir,
        exec_adopted.get(root_dir)?.revision ?? casOf(bead_id).revision
      );
      return;
    }
    if (cls.contains('rtile__discard-abandon')) {
      const operation = {
        kind: button.dataset.operationKind || '',
        last_error: button.dataset.lastError || ''
      };
      if (!confirmFn(discardAbandonConfirmationMessage(bead_id, operation))) {
        return;
      }
      void abandonDiscard(
        {
          bead_id,
          operation_id: button.dataset.operationId || ''
        },
        root_dir,
        revision,
        operation
      );
      return;
    }
    if (cls.contains('rtile__discard')) {
      const confirmation =
        button.dataset.confirmation === 'merged' ? 'merged' : 'unmerged';
      if (!confirmFn(discardConfirmationMessage(bead_id, confirmation))) {
        return;
      }
      void discardBead(
        {
          bead_id,
          ...(attempt_id ? { attempt_id } : {}),
          ...(button.dataset.operationId
            ? { operation_id: button.dataset.operationId }
            : {})
        },
        root_dir,
        revision
      );
      return;
    }
    if (cls.contains('worker-mini__merge')) {
      // Worker 탭과 같은 분기 (UI-f2sy §4): 정리가 멈춘 행의 같은 버튼은
      // 그 행의 [워커로 이어가기](정리 재시도)다 — 머지 큐에 넣는 클릭이 아니다.
      if (queueOf(root_dir).cleanup_failed?.[bead_id]) {
        void retryCleanup(bead_id, root_dir, revision);
      } else {
        void queueMerge(bead_id, root_dir, revision);
      }
      return;
    }
    if (cls.contains('worker-mini__merge-cancel')) {
      void sendCas(
        'worker-merge-queue-remove',
        { bead_id },
        root_dir,
        revision
      );
      return;
    }
    if (cls.contains('worker-mini__shelve')) {
      void shelveMerge(
        bead_id,
        button.dataset.shelve === 'on',
        root_dir,
        revision
      );
      return;
    }
    if (cls.contains('worker-mini__discard-abandon')) {
      const operation = {
        kind: button.dataset.operationKind || '',
        last_error: button.dataset.lastError || ''
      };
      if (!confirmFn(discardAbandonConfirmationMessage(bead_id, operation))) {
        return;
      }
      void abandonDiscard(
        {
          bead_id,
          operation_id: button.dataset.operationId || ''
        },
        root_dir,
        revision,
        operation
      );
      return;
    }
    if (cls.contains('worker-mini__discard')) {
      const confirmation =
        button.dataset.discardMode === 'merged' ? 'merged' : 'unmerged';
      if (!confirmFn(discardConfirmationMessage(bead_id, confirmation))) {
        return;
      }
      void discardBead(
        {
          bead_id,
          ...(button.dataset.attemptId
            ? { attempt_id: button.dataset.attemptId }
            : {}),
          ...(button.dataset.operationId
            ? { operation_id: button.dataset.operationId }
            : {})
        },
        root_dir,
        revision
      );
      return;
    }
    if (cls.contains('worker-mini__revise-fix')) {
      void reviseDisposition('worker-revise-fix', bead_id, root_dir, revision);
      return;
    }
    if (cls.contains('worker-mini__revise-approve')) {
      void reviseDisposition(
        'worker-revise-approve',
        bead_id,
        root_dir,
        revision
      );
    }
  }

  /**
   * @param {Event} ev
   */
  function onClick(ev) {
    const after_drag = lane_drag.consumeClickSuppression();
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    // 복구 선택기의 두 조작은 아래 `dialog` 가드보다 먼저 잡는다 — 가드가
    // 먼저 걸리면 다이얼로그 안의 클릭이 전부 무시된다 (Worker `onClick`과 같은
    // 순서).
    if (target.closest('.provider-resume-dialog__cancel')) {
      closeProviderResumeDialog();
      return;
    }
    if (target.closest('.provider-resume-dialog__confirm')) {
      confirmProviderResumeDialog();
      return;
    }
    // 백드롭 클릭은 타임라인 서랍을 닫는다 (전사 서랍은 자기 바깥 mousedown이
    // 닫는다); 서랍 안 나머지 클릭은 서랍 자기 핸들러의 몫이다.
    if (target.closest('.worker-drawer-overlay__backdrop')) {
      repo_ops_drawer.close();
      return;
    }
    if (target.closest('.worker-drawer-overlay')) {
      onRepoOpsDrawerClick(target);
      return;
    }
    if (target.closest('dialog')) {
      return;
    }
    if (target.closest('a')) {
      return;
    }

    const external_check = /** @type {HTMLButtonElement|null} */ (
      target?.closest?.('[data-external-wait-op]')
    );
    if (external_check) {
      ev.preventDefault();
      void applyExternalWaitAction(external_check);
      return;
    }
    const external_open = /** @type {HTMLElement|null} */ (
      target.closest('[data-external-open]')
    );
    if (external_open) {
      ev.preventDefault();
      openRow(
        external_open.getAttribute('data-external-open') || '',
        external_open.getAttribute('data-root-dir') || ''
      );
      return;
    }
    if (target.closest('.external-wait-summary > summary')) {
      return;
    }
    if (target.closest('[data-external-wait-op]')) {
      return;
    }

    // ID 클릭 = 복사 (§11). 상세는 열리지 않는다.
    const id_el = target.closest(
      '.worker-card__id, .worker-mini__id, .rtile__id'
    );
    if (id_el) {
      ev.preventDefault();
      const owner = /** @type {HTMLElement|null} */ (
        target.closest('.mon2-item, .rtile, .worker-mini')
      );
      const id =
        owner?.getAttribute('data-bead-id') || id_el.textContent?.trim() || '';
      if (id) {
        copyId(id);
      }
      return;
    }

    // 레포 배지 · 섹션 `Worker ↗` = 그 레포의 Worker 탭 (§11).
    const repo_el = /** @type {HTMLElement|null} */ (
      target.closest(
        '.worker-mini__repo, .worker-card__repo, .mon2-sec__worker'
      )
    );
    if (repo_el) {
      ev.preventDefault();
      const root_dir =
        repo_el.getAttribute('data-root-dir') ||
        item_by_bead.get(
          /** @type {HTMLElement|null} */ (
            target.closest('.mon2-item, .rtile, .worker-mini')
          )?.getAttribute('data-bead-id') || ''
        )?.root_dir ||
        repo_el.getAttribute('title') ||
        '';
      gotoWorkerTab(root_dir);
      return;
    }

    const section_toggle = /** @type {HTMLElement|null} */ (
      target.closest('.mon2-sec__toggle')
    );
    if (section_toggle) {
      ev.preventDefault();
      toggleSection(section_toggle.getAttribute('data-root-dir') || '');
      return;
    }

    // 레인 접기 (UI-5ksp §4.4). 토글은 헤더 안의 버튼 하나이므로 형제
    // `header_control`(정렬 select·일괄 머지·완료 범위) 조작은 여기 오지 않는다.
    const lane_toggle = /** @type {HTMLElement|null} */ (
      target.closest('.worker-pane__toggle[data-lane]')
    );
    if (lane_toggle) {
      ev.preventDefault();
      const lane = lane_toggle.getAttribute('data-lane') || '';
      if (
        lane === 'candidate' ||
        lane === 'queue' ||
        lane === 'running' ||
        lane === 'pr_wait' ||
        lane === 'done'
      ) {
        toggleLaneCollapse(lane);
      }
      return;
    }

    const area_toggle = /** @type {HTMLElement|null} */ (
      target.closest('.worker-wait__area-toggle[data-area]')
    );
    if (area_toggle) {
      ev.preventDefault();
      toggleWaitArea(
        /** @type {'parallel'|'serial'} */ (
          area_toggle.getAttribute('data-area') || 'parallel'
        )
      );
      return;
    }

    if (target.closest('.mon-merge-all')) {
      ev.preventDefault();
      void mergeQueueAddAll();
      return;
    }

    // `보관 N` 묶음의 열고 닫기 (UI-sd12 §3.4). `<details>`의 기본 동작이 실제로
    // 열고, 여기서는 그 결과를 저장해 다음 렌더가 같은 상태로 선다.
    if (target.closest('.worker-shelved__summary')) {
      shelved_open = !shelved_open;
      saveShelvedOpen(shelved_open);
      return;
    }

    // 공유 후보 도구 (UI-f2sy §6): 같은 마크업이라 Worker 탭과 같은 클래스를 읽는다.
    const priority_chip = /** @type {HTMLElement|null} */ (
      target.closest('.worker-filter__priority')
    );
    if (priority_chip) {
      ev.preventDefault();
      const parsed = Number.parseInt(priority_chip.dataset.priority || '', 10);
      if (Number.isFinite(parsed)) {
        setCandidateFilter({
          ...candidate_filter,
          priorities: togglePriorityFilter(
            normalizePriorityFilter(candidate_filter.priorities),
            parsed
          )
        });
      }
      return;
    }
    if (target.closest('.worker-filter__labels-btn')) {
      ev.preventDefault();
      label_filter_open = !label_filter_open;
      doRender();
      return;
    }
    const dir_btn = /** @type {HTMLElement|null} */ (
      target.closest('.worker-sort-chain__dir')
    );
    if (dir_btn) {
      ev.preventDefault();
      const step_index = Number.parseInt(
        dir_btn.getAttribute('data-step') || '',
        10
      );
      if (Number.isFinite(step_index)) {
        setCandidateSortChain(
          flipChainStepDir(chainOf(candidate_sort), step_index)
        );
      }
      return;
    }

    // route 칩이 준비도 칩보다 먼저다: 두 묶음이 같은 형태 토큰을 공유하므로,
    // 뒤에 두면 route 클릭이 준비도 분기에서 값 없이 삼켜진다.
    const route_chip = /** @type {HTMLElement|null} */ (
      target.closest('.mon-filter__route')
    );
    if (route_chip) {
      ev.preventDefault();
      candidate_filter = {
        ...candidate_filter,
        routes: toggleRouteFilter(
          candidate_filter.routes,
          route_chip.getAttribute('data-route') || ''
        )
      };
      saveCandidateFilter(candidate_filter);
      doRender();
      return;
    }

    const readiness_chip = /** @type {HTMLElement|null} */ (
      target.closest('.mon-filter__readiness')
    );
    if (readiness_chip) {
      ev.preventDefault();
      candidate_filter = {
        ...candidate_filter,
        readiness: /** @type {any} */ (
          readiness_chip.getAttribute('data-readiness') || 'all'
        )
      };
      saveCandidateFilter(candidate_filter);
      doRender();
      return;
    }

    const row = /** @type {HTMLElement|null} */ (
      target.closest('.mon2-item, .rtile, .worker-mini, .worker-card')
    );
    if (!row) {
      return;
    }
    const bead_id = row.getAttribute('data-bead-id') || '';
    // 버튼 분기는 아래 팝업 조기 반환보다 앞이다 (UI-pw2g §3.4): 게이트 칩 팝업
    // 안의 출구 `↻ 지금 프로브`가 그 반환에 먼저 걸리면 아무 일도 하지 않는다.
    const button = /** @type {HTMLElement|null} */ (target.closest('button'));
    if (button) {
      ev.preventDefault();
      runRowAction(button, bead_id);
      return;
    }
    // 팝업 내부의 나머지 클릭은 카드 클릭(상세 열기)으로 흐르지 않는다.
    if (target.closest('.rtile__failure-pop, .chip-popover')) {
      return;
    }
    if (bead_id && !after_drag) {
      ev.preventDefault();
      openRow(
        bead_id,
        row.getAttribute('data-root-dir') || casOf(bead_id).root_dir
      );
    }
  }

  /**
   * Adopt a new candidate filter: persist first, then re-render.
   *
   * @param {CandidateFilter} next
   */
  function setCandidateFilter(next) {
    candidate_filter = next;
    saveCandidateFilter(next);
    doRender();
  }

  function persistCandidateSort() {
    saveCandidateSort({ sort: candidate_sort, group_by_repo });
  }

  /**
   * Adopt an edited chain. The row stays open: only a preset pick folds it.
   *
   * @param {import('../../data/sort.js').SortStep[]} chain
   */
  function setCandidateSortChain(chain) {
    candidate_sort = normalizeCandidateSort({ chain });
    persistCandidateSort();
    doRender();
  }

  /**
   * @param {Event} ev
   */
  function onChange(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    if (provider_resume) {
      const next = providerResumeDraftChange(
        provider_resume.draft,
        target,
        queueOf(provider_resume.root_dir),
        disabledModelsOf(options.modelVisibilityStore)
      );
      if (next) {
        // 같은 참조는 "우리 이벤트지만 바뀐 것이 없다"는 뜻이다: 다시 그리면
        // 낡은 옵션을 고른 select 표시가 draft 값으로 되돌아간다.
        if (next !== provider_resume.draft) {
          provider_resume = { ...provider_resume, draft: next };
          doRender();
        }
        return;
      }
    }
    const blocked_toggle = /** @type {HTMLInputElement|null} */ (
      target.closest('.mon-filter__blocked')
    );
    if (blocked_toggle) {
      candidate_filter = {
        ...candidate_filter,
        show_blocked: blocked_toggle.checked
      };
      saveCandidateFilter(candidate_filter);
      doRender();
      return;
    }
    const group_toggle = /** @type {HTMLInputElement|null} */ (
      target.closest('.mon-filter__group')
    );
    if (group_toggle) {
      group_by_repo = group_toggle.checked;
      persistCandidateSort();
      doRender();
      return;
    }
    // 체인 편집 줄·라벨·타입 select는 `.worker-sort` 톤을 공유하는 정렬 select보다
    // 먼저 읽는다 — 뒤에 두면 한 step 변경이나 타입 변경이 프리셋 전환으로 읽힌다.
    const chain_select = /** @type {HTMLSelectElement|null} */ (
      target.closest('.worker-sort-chain__key')
    );
    if (chain_select) {
      const step_index = Number.parseInt(
        chain_select.getAttribute('data-step') || '',
        10
      );
      if (Number.isFinite(step_index)) {
        setCandidateSortChain(
          setChainStepKey(
            chainOf(candidate_sort),
            step_index,
            chain_select.value
          )
        );
      }
      return;
    }
    const label_check = /** @type {HTMLInputElement|null} */ (
      target.closest('.worker-filter__label-check')
    );
    if (label_check) {
      const value = label_check.dataset.label || '';
      if (value) {
        setCandidateFilter({
          ...candidate_filter,
          labels: toggleLabelFilter(
            normalizeLabelFilter(candidate_filter.labels),
            value
          )
        });
      }
      return;
    }
    const type_select = /** @type {HTMLSelectElement|null} */ (
      target.closest('.worker-filter__type')
    );
    if (type_select) {
      setCandidateFilter({
        ...candidate_filter,
        type: normalizeTypeFilter(type_select.value)
      });
      return;
    }
    const candidate_select = /** @type {HTMLSelectElement|null} */ (
      target.closest('.mon-candidate-sort')
    );
    if (candidate_select) {
      if (candidate_select.value === 'custom') {
        sort_chain_open = true;
      } else {
        candidate_sort = normalizeCandidateSort(candidate_select.value);
        persistCandidateSort();
        sort_chain_open = false;
      }
      doRender();
      return;
    }
    const running_select = /** @type {HTMLSelectElement|null} */ (
      target.closest('.mon-running-sort')
    );
    if (running_select) {
      running_sort = running_select.value === 'repo' ? 'repo' : 'started';
      saveRunningSort(running_sort);
      doRender();
      return;
    }
    const range_select = /** @type {HTMLSelectElement|null} */ (
      target.closest('.mon-done-range')
    );
    if (range_select) {
      done_range = normalizeDoneRange(range_select.value);
      saveDoneRange(done_range);
      doRender();
    }
  }

  /**
   * An outside click closes the 실패 상세 팝오버. 그것을 여는 요소는 예외다 —
   * 여는 클릭이 그대로 닫는 클릭이 되면 아무것도 열리지 않는다. 판정 칩 팝업의
   * 같은 규칙은 `chip_popover`가 소유한다 (UI-8x90 §5).
   *
   * @param {Event} ev
   */
  function onDocumentClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const closest =
      target && typeof target.closest === 'function'
        ? (/** @type {string} */ selector) => target.closest(selector)
        : () => null;
    let changed = false;
    if (!closest('.external-wait-summary')) {
      for (const summary of Array.from(
        console_el.querySelectorAll('details.external-wait-summary[open]')
      )) {
        summary.removeAttribute('open');
      }
    }
    if (
      open_failure_detail &&
      !closest('.rtile__failure-pop, .rtile__failure-badge')
    ) {
      open_failure_detail = null;
      changed = true;
    }
    if (label_filter_open && !closest('.worker-filter__labels')) {
      label_filter_open = false;
      changed = true;
    }
    if (changed) {
      doRender();
    }
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocumentKeyDown(ev) {
    if (ev.key !== 'Escape') {
      return;
    }
    let external_closed = false;
    for (const summary of Array.from(
      console_el.querySelectorAll('details.external-wait-summary[open]')
    )) {
      summary.removeAttribute('open');
      external_closed = true;
    }
    if (
      open_failure_detail === null &&
      provider_resume === null &&
      !external_closed
    ) {
      return;
    }
    open_failure_detail = null;
    provider_resume = null;
    doRender();
  }

  mount_element.addEventListener('click', onClick);
  mount_element.addEventListener('change', onChange);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', /** @type {any} */ (onDocumentKeyDown));
  chip_popover.attach();
  lane_drag.attach(mount_element);

  // 모바일 분기 추적 (§4.7). watcher는 등록 시 현재 값을 동기적으로 한 번
  // 콜백하는데, 그 첫 콜백은 다시 그리면 안 된다 — 콘솔이 아직 조립되기 전이다.
  {
    let first = true;
    unsubscribe_viewport = watchMobile((next) => {
      is_mobile = next;
      if (first) {
        first = false;
        return;
      }
      doRender();
    });
  }

  if (pipelineStore && typeof pipelineStore.subscribe === 'function') {
    unsubscribe_pipeline = pipelineStore.subscribe(() => {
      try {
        // 새 스냅샷이 권위다 — mutation 응답으로 임시 채택했던 queue는 버린다.
        exec_adopted.clear();
        doRender();
      } catch {
        // ignore
      }
    });
  }

  // 같은 이유로 모니터도 프리셋 스냅샷을 구독한다 (UI-wg68 §3.1) — 파이프라인
  // 스냅샷과 다른 채널이므로 이것 없이는 바인딩 변경이 다음 파이프라인 푸시까지
  // 보이지 않는다.
  if (
    options.execPresetStore &&
    typeof options.execPresetStore.subscribe === 'function'
  ) {
    unsubscribe_presets = options.execPresetStore.subscribe(() => {
      try {
        doRender();
      } catch {
        // ignore
      }
    });
  }
  // 유예 남은 초와 경계 타이머는 서버 전역 queue_grace_seconds를 읽으므로 그 값이
  // 바뀌면 다시 그린다 (UI-ny0h §3.5).
  if (typeof options.timingSettingsStore?.subscribe === 'function') {
    unsubscribe_timing_settings = options.timingSettingsStore.subscribe(() => {
      try {
        doRender();
      } catch {
        // ignore
      }
    });
  }
  // 공급자 재개 선택기의 모델 목록은 서버 전역 활성 모델을 읽는다 (UI-ooc0 §4.2).
  if (typeof options.modelVisibilityStore?.subscribe === 'function') {
    unsubscribe_model_visibility = options.modelVisibilityStore.subscribe(
      () => {
        try {
          doRender();
        } catch {
          // ignore
        }
      }
    );
  }

  function stopTick() {
    if (tick_timer !== null) {
      clearInterval(tick_timer);
      tick_timer = null;
    }
    if (boundary_timer !== null) {
      clearTimeout(boundary_timer);
      boundary_timer = null;
    }
  }

  return {
    load() {
      log('load');
      if (tick_timer === null) {
        tick_timer = setInterval(() => {
          refreshTimeText(console_el, nowFn());
        }, TICK_MS);
      }
      doRender();
    },
    pause() {
      stopTick();
    },
    /**
     * Open one repository's 저장소 작업 타임라인 — the settings window's
     * `저장소 작업 기록 열기` reaches the same drawer as the deck's `⚠ N`.
     *
     * @param {string} root_dir
     */
    openRepoOps(root_dir) {
      openRepoOpsDrawer(root_dir);
    },
    clear() {
      stopTick();
      lane_drag.detach();
      if (unsubscribe_pipeline) {
        unsubscribe_pipeline();
        unsubscribe_pipeline = null;
      }
      if (unsubscribe_presets) {
        unsubscribe_presets();
        unsubscribe_presets = null;
      }
      if (unsubscribe_model_visibility) {
        unsubscribe_model_visibility();
        unsubscribe_model_visibility = null;
      }
      if (unsubscribe_timing_settings) {
        unsubscribe_timing_settings();
        unsubscribe_timing_settings = null;
      }
      if (unsubscribe_viewport) {
        unsubscribe_viewport();
        unsubscribe_viewport = null;
      }
      drawer.destroy();
      drawer_overlay_el.hidden = true;
      deck?.destroy();
      deck = null;
      issue_search.destroy();
      mount_element.removeEventListener('click', onClick);
      mount_element.removeEventListener('change', onChange);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener(
        'keydown',
        /** @type {any} */ (onDocumentKeyDown)
      );
      chip_popover.detach();
      mount_element.replaceChildren();
    }
  };
}
