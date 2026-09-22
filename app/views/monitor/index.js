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
import { runResumeFlow } from '../../utils/resume-flow.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { showToast } from '../../utils/toast.js';
import { watchMobile } from '../../utils/viewport.js';
import { createChipPopover } from '../chip-popover.js';
import { createLaneCollapse } from '../worker/lane-collapse.js';
import { createLaneDrag } from '../worker/lane-drag.js';
import {
  CANDIDATE_FILTER_DEFAULT,
  CANDIDATE_SORT_OPTIONS,
  READINESS_FILTER_OPTIONS,
  ROUTE_FILTER_OPTIONS,
  buildLanes,
  normalizeRouteFilter,
  toggleRouteFilter
} from '../worker/lane-model.js';
import {
  candidateCard,
  discardAbandonCompletionMessage,
  discardAbandonConfirmationMessage,
  discardCompletionMessage,
  discardConfirmationMessage,
  expandWaitSubject,
  judgementPopoverOf,
  miniRow,
  nowPanel,
  paneTemplate,
  providerProbeRefusalText,
  queueRowOps,
  setChipPresetContext,
  waitBody
} from '../worker/lanes.js';
import {
  providerResumeDialogTemplate,
  providerResumeDraft,
  providerResumeDraftChange,
  providerResumeOverride,
  showProviderResumeDialog
} from '../worker/provider-resume-dialog.js';
import { runningTile } from '../worker/running-grid.js';
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
      routes: normalizeRouteFilter(parsed.routes)
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
        routes: filter.routes
      })
    );
  } catch {
    /* ignore — storage denial must not break the display toggle */
  }
}

/**
 * @returns {'repo_spec'|'repo_updated'|'updated_flat'}
 */
function loadCandidateSort() {
  try {
    const raw = window.localStorage.getItem(CANDIDATE_SORT_KEY);
    return CANDIDATE_SORT_OPTIONS.some((o) => o.value === raw)
      ? /** @type {any} */ (raw)
      : 'repo_spec';
  } catch {
    return 'repo_spec';
  }
}

/**
 * @param {string} sort
 */
function saveCandidateSort(sort) {
  try {
    window.localStorage.setItem(CANDIDATE_SORT_KEY, sort);
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

/** Client id of the monitor tab's aggregated pipeline subscription. */
export const MONITOR_PIPELINE_KEY = 'tab:monitor:pipeline';

/**
 * Live-metric redraw cadence while the tab is visible. Push alone is not enough:
 * 경과시간·활동 나이는 시계가 지나가는 것만으로 값이 바뀐다.
 */
const TICK_MS = 1_000;

/**
 * @typedef {Object} MonitorViewOptions
 * @property {(id: string) => void} gotoIssue
 * @property {{ get: () => Array<Record<string, any>>|null, getWorkspacesState?: () => Array<Record<string, any>>, subscribe?: (fn: () => void) => () => void }} [pipelineStore]
 * @property {any} [execPresetStore]
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
    const op = button.dataset.externalWaitOp || '';
    const key = `${root_dir}:${wait_id}`;
    if (!transport || !root_dir || !wait_id || external_actions.has(key)) {
      return;
    }
    external_actions.add(key);
    syncExternalChecks();
    try {
      const res = await transport(op, {
        root_dir,
        wait_id,
        ...(button.dataset.mode ? { mode: button.dataset.mode } : {}),
        ...(button.dataset.beadId ? { bead_id: button.dataset.beadId } : {})
      });
      if (res?.queue) {
        exec_adopted.set(root_dir, res.queue);
      }
      showToast(
        res?.ok === false
          ? '외부 작업 요청에 실패했습니다'
          : '외부 작업 상태를 갱신했습니다',
        res?.ok === false ? 'error' : 'success',
        4000
      );
    } catch {
      showToast('외부 작업 요청에 실패했습니다', 'error', 4000);
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
  /** @type {'repo_spec'|'repo_updated'|'updated_flat'} */
  let candidate_sort = loadCandidateSort();
  /** @type {Record<string, any>} */
  let sections_state = loadSections();
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
  drawer_overlay_el.append(drawer_backdrop_el, drawer_el);
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
  /** @type {Set<string>} */
  const resolve_pending = new Set();

  /** @type {null | (() => void)} */
  let unsubscribe_pipeline = null;
  /** @type {any} */
  let tick_timer = null;
  /** @type {ReturnType<typeof createRepoDeck>|null} */
  let deck = null;

  const drawer = createTranscriptDrawer(drawer_el, {
    transport,
    sessionLogStore: options.sessionLogStore,
    onClose: () => {
      selected_attempt = null;
      drawer_overlay_el.hidden = true;
      doRender();
    }
  });

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
    let res = await transport(type, {
      ...payload,
      root_dir,
      expected_revision: revision
    });
    if (res && res.conflict && retry_conflict) {
      if (res.queue) {
        exec_adopted.set(root_dir, res.queue);
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
    if (res && res.queue && root_dir) {
      exec_adopted.set(root_dir, res.queue);
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
   * Launch the interactive session for one terminal or parked tile.
   *
   * @param {string} bead_id
   * @param {string} root_dir
   * @param {number} revision
   */
  async function resolveInSession(bead_id, root_dir, revision) {
    if (resolve_pending.has(bead_id)) {
      return;
    }
    resolve_pending.add(bead_id);
    doRender();
    try {
      const res = await sendCas(
        'worker-resolve-in-session',
        { bead_id },
        root_dir,
        revision,
        false
      );
      if (res?.session === 'already_running') {
        showToast(`이미 열려 있습니다 · ${res.tmux_window || '?'}`, 'error');
      } else if (res?.launched !== true) {
        showToast(`세션 기동 실패: ${res?.reason || 'unknown'}`, 'error');
      } else if (res.mode !== 'fork') {
        showToast(
          `${typeof res.runner === 'string' ? res.runner : 'claude'} 새 세션으로 시작 (${res.fallback_reason || 'unknown'})`,
          'success'
        );
      }
    } finally {
      resolve_pending.delete(bead_id);
      doRender();
    }
  }

  /**
   * The PR 대기 lane header's bulk button. 한 레포씩 순차로 보낸다 — workspace
   * 단위 액션이고 revision도 레포마다 다르다.
   */
  async function mergeQueueAddAll() {
    /** @type {Map<string, number>} */
    const targets = new Map();
    for (const item of lanes.pr_wait) {
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
    return judgementPopoverOf(/** @type {any} */ (item), (chip_key) =>
      chip_popover.isOpen({ bead_id: item.id, chip_key })
    );
  }

  /**
   * @param {LaneItem} item
   * @returns {LaneItem}
   */
  function withOverlaps(item) {
    const chips = chipsWithOverlaps(item);
    const popover = popoverOf(item);
    return chips || popover
      ? {
          ...item,
          ...(chips ? { dependency_chips: chips } : {}),
          ...(popover ? { chip_popover: popover } : {})
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
        class="mon2-sec__toggle"
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
        class="mon2-sec__worker"
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
      html`${candidateCard(withOverlaps(item), placeMenuFor(item), {
        onOpenDoc: openDoc
          ? (/** @type {Event} */ _ev, /** @type {any} */ doc) =>
              openDoc(doc, item.root_dir)
          : undefined
      })}`
    );
  }

  /**
   * The 실행가능 lane body (§5). `updated_flat`만 섹션 없이 평평하다.
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
      ${miniRow(withOverlaps(item), {
        actions: queueRowOps(item, { nudgeable: true })
      })}
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
      ${miniRow(withOverlaps(item), {
        actions: queueRowOps(item)
      })}
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
      title: `${group.name} · 직렬 ${lane.index + 1}`,
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
        class="mon2-sec__worker"
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
    return waitBody({
      parallel: {
        rows: lanes.parallel_rows.map((item, index) =>
          parallelRow(item, index)
        ),
        count: lanes.parallel_rows.length,
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
   * @param {number} now
   * @returns {import('lit-html').TemplateResult}
   */
  function runningBody(now) {
    return html`<div class="worker-rungrid">
      ${lanes.running.length === 0
        ? html`<div class="worker-rungrid__empty">실행 세션 없음</div>`
        : lanes.running.map((item) =>
            runningTile(
              {
                bead_id: item.id,
                root_dir: item.root_dir,
                attempt_id: item.attempt_id || '',
                title: item.title,
                runner: item.runner ?? null,
                model: item.model ?? null,
                effort: item.effort ?? null,
                speed: item.speed ?? null,
                started_at: item.started_at ?? null,
                // 세션 타일 판별자와 route 칩 재료 (UI-yrzu §6·§7.2). Worker
                // 타일은 `kind`를 싣지 않는다. `updated_at`도 세션 타일만
                // 받는다 — Worker 타일에 실으면 없던 시각 메타 줄이 생긴다.
                kind: item.kind === 'session' ? 'session' : undefined,
                external_wait: item.external_wait,
                wait_reasons: item.wait_reasons,
                ...(item.kind === 'session'
                  ? {
                      updated_at: item.updated_at,
                      // 세션 정체·transcript 좌표 (UI-4xzk §6.4).
                      session_refs: item.session_refs || []
                    }
                  : {}),
                workflow: /** @type {any} */ (item.workflow || null),
                worker_created_from: item.worker_created_from,
                worker_created_from_root_dir: item.worker_created_from_root_dir,
                resumed_from: item.resumed_from ?? null,
                continuation_mode: item.continuation_mode ?? null,
                paused: item.run_state === 'paused',
                failed: item.run_state === 'failed',
                // 파킹·backoff 대기·선행 대기 (UI-5ym8 §8, 선행 대기 계층
                // §5.4). 같은 렌더러를 쓰는 두 탭이 같은 사실을 같은 모양으로
                // 그려야 하므로 (ADR 14) Worker 탭의 투영과 같은 키를 여기서도
                // 싣는다 — 빠지면 기다리는 세션이 모니터에서만 돌아가는 시계와
                // ⏸를 얻는다.
                parked: item.run_state === 'parked',
                retry_wait: item.run_state === 'retry_wait',
                waiting: item.run_state === 'waiting',
                wait: item.wait || null,
                // 공급자 보류도 같은 규칙이다 (UI-jr8v §10, ADR 0014): 투영이
                // 이미 실어 온 두 값을 여기서 버리면 보류 attempt가 모니터에서만
                // 실행 중 타일 — 도는 시계와 ⏸ — 로 보인다.
                provider_hold: item.run_state === 'provider_hold',
                hold: item.hold || null,
                retry: item.retry || null,
                status: /** @type {any} */ (item.status),
                status_label:
                  item.run_state === 'failed'
                    ? '실패'
                    : item.run_state === 'parked'
                      ? '세션 대기'
                      : item.run_state === 'retry_wait'
                        ? '재시도 대기'
                        : item.run_state === 'waiting'
                          ? item.wait?.recovery
                            ? item.wait.recovery.label || ''
                            : item.wait?.cause === 'base_moved'
                              ? '반영 대기'
                              : '선행 대기'
                          : item.run_state === 'provider_hold'
                            ? '공급자 보류'
                            : item.status_label,
                can_pause: item.can_pause !== false,
                can_resume: item.can_resume,
                exec_chips: item.exec_chips || null,
                usage: item.usage || null,
                chip_popover: popoverOf(item),
                discard: item.discard,
                failure: item.failure
                  ? {
                      ...item.failure,
                      open: open_failure_detail === item.attempt_id
                    }
                  : null,
                ...tileResolveFields(
                  item.id,
                  {
                    discard: item.discard,
                    parked: item.run_state === 'parked'
                  },
                  resolve_pending.has(item.id)
                )
              },
              now,
              selected_attempt,
              {
                monitor: {
                  repo: item.workspace_name,
                  root_dir: item.root_dir,
                  serial_lane_id: item.serial_lane_id,
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
    /** @type {Record<string, LaneItem[]>} */
    const by_lane = {
      runnable: lanes.runnable,
      queue: lanes.queue,
      running: lanes.running,
      pr_wait: lanes.pr_wait,
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
              ? runningBody(now)
              : items.length > 0
                ? // PR 대기·완료 레인 본문도 겹침 파생을 얹어 그린다 (UI-e9sg):
                  // 투영이 계산한 `⧉ 겹침`·`scope 없음` 칩을 여기서 버리면 같은
                  // 사실이 레인마다 다르게 보인다.
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
        live: meta.lane === 'running' && items.length > 0,
        collapsible: true,
        collapsed: collapse.isCollapsed(meta.pane),
        controls: meta.lane === 'runnable' ? candidateFilterStrip() : undefined,
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
              live: lanes.running.length > 0,
              running_body: lanes.running.length > 0 ? runningBody(now) : '',
              pr_wait_rows: lanes.pr_wait.map((item) =>
                miniRow(withOverlaps(item))
              ),
              count: lanes.running.length + lanes.pr_wait.length
            })}
            ${mobile_metas.map((meta) => lanePane(meta))}
          </div>
        </div>
        ${providerResumeDialogTemplate(
          provider_resume?.draft || null,
          provider_resume ? queueOf(provider_resume.root_dir) : {}
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
        provider_resume ? queueOf(provider_resume.root_dir) : {}
      )}`;
  }

  /**
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateFilterStrip() {
    return html`<div class="worker-filter">
      <label class="worker-filter__tgl" title="blocked 이슈 표시">
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
              class="mon-filter__readiness worker-filter__chip${candidate_filter.readiness ===
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
              class="mon-filter__route worker-filter__chip${candidate_filter.routes.includes(
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
    </div>`;
  }

  /**
   * @param {string} lane
   * @param {number} count
   * @returns {import('lit-html').TemplateResult|''}
   */
  function laneHeaderControl(lane, count) {
    if (lane === 'runnable') {
      return html`<select
        class="mon-candidate-sort worker-sort"
        aria-label="후보 정렬"
        title="후보 정렬"
        .value=${candidate_sort}
      >
        ${CANDIDATE_SORT_OPTIONS.map(
          (o) =>
            html`<option
              value=${o.value}
              ?selected=${candidate_sort === o.value}
            >
              ${o.label}
            </option>`
        )}
      </select>`;
    }
    if (lane === 'running') {
      return html`<select
        class="mon-running-sort worker-sort"
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
        class="mon-lane-op mon-merge-all"
        title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
      >
        일괄 머지
      </button>`;
    }
    if (lane === 'done') {
      return html`<select
        class="mon-done-range worker-sort"
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
    const workspaces =
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
    const workspaces_state =
      pipelineStore && pipelineStore.getWorkspacesState
        ? pipelineStore.getWorkspacesState()
        : [];
    /** @type {Record<string, any>} */
    const options = {
      done_since: closedRangeSince(done_range, nowFn()),
      running_sort,
      candidate_filter,
      candidate_sort
    };
    return buildLanes(workspaces, workspaces_state, options);
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
    item_by_bead = new Map();
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
      rangeLabel: doneRangeLabel,
      rangeShort: doneRangeShort,
      transport,
      implPresetStore: options.execPresetStore,
      gotoWorkerTab,
      openSettings: (root_dir) => options.openRepoSettings?.(root_dir),
      closeSettings: () => options.closeRepoSettings?.(),
      settingsRoot: () => options.repoSettingsRoot?.() ?? null,
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
    if (cls.contains('rtile__session')) {
      if (item && item.kind === 'session') {
        // 세션 타일에는 하이라이트할 attempt가 없으므로 `selected_attempt`도
        // 건드리지 않는다 (UI-4xzk §6.4). 드로어 키는 `session:<provider>:<sid>`다.
        const current = (item.session_refs || []).find(
          (view) => view && view.current === true
        );
        if (current) {
          drawer_overlay_el.hidden = false;
          drawer.open(
            sessionRefDrawerInput(current, bead_id, 'in_progress', root_dir)
          );
          doRender();
        }
        return;
      }
      selected_attempt = attempt_id;
      if (attempt_id && item) {
        drawer_overlay_el.hidden = false;
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
    if (cls.contains('rtile__resume-alternate')) {
      // 공급자 보류의 두 번째 출구 (UI-jr8v §10). 선택기는 Worker 탭과 같은
      // 모듈이 그리므로, 이 탭이 하는 일은 어느 레포의 attempt인지를 실어 두는
      // 것뿐이다.
      const draft = providerResumeDraft(attempt_id, queueOf(root_dir));
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
    if (cls.contains('rtile__resolve')) {
      void resolveInSession(
        bead_id,
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
      const action = queuedContinuation(root_dir, bead_id);
      if (action?.mismatch && action.continuation === null) {
        void decideQueuedContinuation(
          root_dir,
          bead_id,
          revision,
          action.mismatch
        );
      } else {
        void sendCas('worker-merge-queue-add', { bead_id }, root_dir, revision);
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
      void sendContinuationAction(
        'worker-revise-fix',
        { bead_id },
        root_dir,
        revision
      );
      return;
    }
    if (cls.contains('worker-mini__revise-approve')) {
      void sendCas('worker-revise-approve', { bead_id }, root_dir, revision);
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
    if (target.closest('dialog') || target.closest('.worker-drawer-overlay')) {
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
        queueOf(provider_resume.root_dir)
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
    const candidate_select = /** @type {HTMLSelectElement|null} */ (
      target.closest('.mon-candidate-sort')
    );
    if (candidate_select) {
      candidate_sort = /** @type {any} */ (
        CANDIDATE_SORT_OPTIONS.some((o) => o.value === candidate_select.value)
          ? candidate_select.value
          : 'repo_spec'
      );
      saveCandidateSort(candidate_sort);
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

  function stopTick() {
    if (tick_timer !== null) {
      clearInterval(tick_timer);
      tick_timer = null;
    }
  }

  return {
    load() {
      log('load');
      doRender();
      if (tick_timer === null) {
        tick_timer = setInterval(() => {
          try {
            doRender();
          } catch {
            // ignore
          }
        }, TICK_MS);
      }
    },
    pause() {
      stopTick();
    },
    clear() {
      stopTick();
      lane_drag.detach();
      if (unsubscribe_pipeline) {
        unsubscribe_pipeline();
        unsubscribe_pipeline = null;
      }
      if (unsubscribe_viewport) {
        unsubscribe_viewport();
        unsubscribe_viewport = null;
      }
      drawer.destroy();
      drawer_overlay_el.hidden = true;
      deck?.destroy();
      deck = null;
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
