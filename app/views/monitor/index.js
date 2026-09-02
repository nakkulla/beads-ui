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
import { copyToClipboard } from '../../utils/clipboard.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import { debug } from '../../utils/logging.js';
import { requestResumeInstructions } from '../../utils/resume-instructions-dialog.js';
import { sessionRefDrawerInput } from '../../utils/session-ref.js';
import { showToast } from '../../utils/toast.js';
import { watchMobile } from '../../utils/viewport.js';
import { createChipPopover } from '../chip-popover.js';
import { createLaneCollapse } from '../worker/lane-collapse.js';
import { createLaneDrag } from '../worker/lane-drag.js';
import {
  CANDIDATE_FILTER_DEFAULT,
  CANDIDATE_SORT_OPTIONS,
  SPEC_FILTER_OPTIONS,
  buildLanes
} from '../worker/lane-model.js';
import {
  candidateCard,
  discardAbandonCompletionMessage,
  discardAbandonConfirmationMessage,
  discardCompletionMessage,
  discardConfirmationMessage,
  judgementPopoverOf,
  miniRow,
  nowPanel,
  paneTemplate,
  waitBody
} from '../worker/lanes.js';
import { runningTile } from '../worker/running-grid.js';
import { createTranscriptDrawer } from '../worker/transcript-drawer.js';
import { createRepoDeck } from './deck.js';
import {
  HOLD_CORRECTION,
  describeLaneRemoval,
  laneCorrectionStatus,
  planDrop,
  planLaneConfirm,
  planLaneCorrection,
  planLaneCreate,
  planLaneReapply,
  planLaneRemove
} from './drop-plan.js';

/**
 * @import { CandidateFilter, MonitorChainLane, MonitorChainLaneRow, LaneItem, LaneModel, MonitorOccupant, LaneQueueGroup, MonitorSerialSublane } from '../worker/lane-model.js'
 * @import { DependencyChips } from '../worker/lanes.js'
 * @import { DropDrag, DropModel, DropPlan, DropTarget, LaneOp, Op } from './drop-plan.js'
 */

/** `의존에 맞춰 N건 자동 교정` 배지의 수명 (UI-jaua §6.3). */
const CORRECTION_NOTICE_MS = 10000;

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
      spec: SPEC_FILTER_OPTIONS.some((o) => o.value === parsed.spec)
        ? parsed.spec
        : 'all'
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
        spec: filter.spec
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
 * @property {{ get: () => Array<Record<string, any>>|null, getWorkspacesState?: () => Array<Record<string, any>>, crossLanes?: () => { revision: number, lanes: Array<Record<string, any>> }|null|undefined, subscribe?: (fn: () => void) => () => void }} [pipelineStore]
 * @property {any} [execPresetStore]
 * @property {any} [sessionLogStore] - 실행중 타일의 `▤ 세션` 드로어가 읽는 라인
 * 스토어 (Worker 탭과 같은 것).
 * @property {{ gotoView: (view: 'board'|'worker'|'monitor') => void }} [router] -
 * 레포 배지·섹션 `Worker ↗` 클릭이 Worker 탭으로 넘어가는 경로.
 * @property {(type: string, payload?: unknown) => Promise<any>} [transport]
 * @property {() => string|undefined} [getWorkspacePath]
 * @property {(doc: import('../board/stepper.js').StepperDoc, root_dir?: string) => void} [openDoc] -
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

/** 연결 레인 순번 ①…⑳ (UI-e6hw §4.2). */
const CIRCLED_NUMERALS = '①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳';

/**
 * @param {number} seq
 * @returns {string}
 */
function circledSeq(seq) {
  return seq >= 1 && seq <= CIRCLED_NUMERALS.length
    ? CIRCLED_NUMERALS[seq - 1]
    : `(${seq})`;
}

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
   * 방금 순서를 옮긴 자동 교정의 표시 (UI-jaua §6.3). 사용자가 놓은 자리와 다른
   * 곳에 카드가 앉은 이유를 화면이 말하는 자리이고, **다음 사용자 조작이나 10초
   * 뒤** 사라진다 — 계속 서 있으면 어느 실행의 결과인지 알 수 없게 된다.
   *
   * @type {{ lane_id: string, corrected: number }|null}
   */
  let correction_notice = null;

  /** @type {any} */
  let correction_timer = null;

  /**
   * 이 렌더 한 번 동안만 사는 계획 모델 (§6.3 헤더 표시). 레인마다 다시 만들면
   * 같은 스냅샷을 레인 수만큼 훑게 되므로, 렌더 시작에 비우고 처음 묻는 레인이
   * 만든다.
   *
   * @type {DropModel|null}
   */
  let render_drop_model = null;

  /**
   * The 교정 상태 of ONE stored lane, for the header (UI-jaua §6.3). 계획을
   * 세우지 않고 지금 상태만 묻는다.
   *
   * @param {string} lane_id
   * @returns {import('./drop-plan.js').LaneCorrection|null}
   */
  function correctionOf(lane_id) {
    if (render_drop_model === null) {
      render_drop_model = dropModel();
    }
    return laneCorrectionStatus(lane_id, render_drop_model);
  }

  /**
   * Raise the 교정 배지 and let it withdraw itself 10초 뒤 (§6.3).
   *
   * @param {string} lane_id
   * @param {number} corrected
   */
  function noteCorrection(lane_id, corrected) {
    clearCorrectionNotice();
    if (corrected <= 0) {
      return;
    }
    correction_notice = { lane_id, corrected };
    correction_timer = setTimeout(() => {
      correction_timer = null;
      correction_notice = null;
      doRender();
    }, CORRECTION_NOTICE_MS);
  }

  /** Withdraw the 교정 배지: 다음 사용자 조작이 그것을 걷는다 (§6.3). */
  function clearCorrectionNotice() {
    if (correction_timer !== null) {
      clearTimeout(correction_timer);
      correction_timer = null;
    }
    correction_notice = null;
  }

  /**
   * @returns {string}
   */
  function doneRangeLabel() {
    const opt = DONE_RANGE_OPTIONS.find((o) => o.value === done_range);
    return opt ? opt.label : '';
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

  /**
   * 드롭 식별자·계획 실행 컨트롤러 (UI-4tud §4.5). 두 탭이 같은 모듈을 쓰고,
   * 모니터는 cross-repo 재료(`cross_lanes` 원본과 그 위의 재투영)만 넘긴다.
   */
  const lane_drag = createLaneDrag({
    transport,
    console_el,
    getLanes: () => lanes,
    getWorkspaces: () =>
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null,
    getCrossLanes: currentCrossLanes,
    reproject: (conflict) => ({
      lanes: projectLanes(conflict),
      raw_lanes: conflict
    }),
    onCorrection: noteCorrection,
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
  const { applyDrop, dropModel, runPlanned, sendQueueCas } = lane_drag;

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
   * @param {string} root_dir
   * @param {string} bead_id
   */
  function queuedContinuation(root_dir, bead_id) {
    const adopted = exec_adopted.get(root_dir);
    const workspaces =
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
    const workspace = (Array.isArray(workspaces) ? workspaces : []).find(
      (item) => item?.root_dir === root_dir
    );
    const queue = adopted || workspace;
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
   * Merge the 겹침 파생값 into the dependency chips a card already carries
   * (§5.3) — 칩 마크업은 한 벌이므로 전달 경로도 하나다. `cross_lane_chip`은
   * 접지 않는다: 소속 칩은 슬롯 5 좌표라 다른 좌표 칩과 같이 항목 최상위
   * 필드로 간다 (UI-8x90 §4.2).
   *
   * @param {{ id: string, overlap_chips?: import('../worker/lane-model.js').OverlapChip[], scope_state?: 'declared'|'missing', cross_lane_chip?: import('../worker/lane-model.js').CrossLaneChip, armed_lane_chip?: import('../worker/lane-model.js').ArmedLaneChip, dependency_chips?: DependencyChips|null }} row
   * @returns {DependencyChips|null}
   */
  function chipsWithOverlaps(row) {
    const base = row.dependency_chips || null;
    const overlaps = row.overlap_chips || [];
    const scope_missing = row.scope_state === 'missing';
    const armed_lane = row.armed_lane_chip;
    if (!base && overlaps.length === 0 && !scope_missing && !armed_lane) {
      return null;
    }
    return {
      ...(base || {}),
      ...(overlaps.length > 0 ? { overlaps } : {}),
      ...(scope_missing ? { scope_missing: true } : {}),
      // 발차 칩 (UI-jaua §5.6). 고아 arm은 해제 버튼을 함께 싣는다 — 그 사실이
      // 보이는 것과 그 자리에서 끌 수 있는 것이 §5.3 (2)가 요구하는 안전이다.
      ...(armed_lane ? { armed_lane } : {})
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
   * `[대기로 ↴]`가 제시하는 대상 (UI-j92s §6.4): 병렬 영역 · 연결 레인마다 끝 ·
   * 새 연결 레인 · **자기 레포의** 직렬 레인. 세로 그룹 목록이고 각 항목은
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
    const enabled = lanes.cross_lanes_revision !== null;
    /** @type {import('../worker/lanes.js').PlaceMenuEntry[]} */
    const entries = [
      { id: 'parallel', label: '병렬', count: item.place_index ?? 0 }
    ];
    for (const lane of lanes.chain_lanes) {
      entries.push({
        id: `lane:${lane.lane_id}`,
        label: `연결 ${lane.number} (${lane.draft ? 'draft' : '확정'}) 끝에`,
        count: lane.rows.length,
        group: '연결 레인',
        disabled: !enabled
      });
    }
    entries.push({
      id: 'new-lane',
      label: '+ 새 연결 레인',
      group: '연결 레인',
      disabled: !enabled,
      title: enabled
        ? '이 이슈만 든 draft 레인을 만듭니다'
        : '연결 레인 저장소를 읽을 수 없습니다'
    });
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
        exec_chips_mode: 'pinned_only',
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
   * The 대기 행 조작 묶음 (UI-5ksp §4.6). 행 밖 별도 줄이던 자리를 `miniRow`의
   * `actions` 슬롯 — 행 1번 줄 오른쪽 끝 — 으로 옮겼다. `↑ ↓ ✕`는 드래그의
   * coarse pointer 보완재라 표시 조건은 CSS가 소유한다. 의존성 편집은 여기
   * 있던 ⛓이 아니라 이슈 상세 `의존성` 절이다 (UI-lx45 §5).
   *
   * @param {LaneItem} item
   * @param {boolean} [nudgeable] - true for 병렬 행 only: 직렬 레인의 순서는
   * 의존이 소유하므로 한 칸 위·아래로 미는 버튼이 없다.
   * @returns {import('lit-html').TemplateResult}
   */
  function rowActions(item, nudgeable = false) {
    return html`<span class="worker-mini__rowops">
      ${nudgeable
        ? html`<button
              type="button"
              class="worker-mini__rowops-up"
              data-bead-id=${item.id}
              title="같은 레포 안에서 한 칸 위로"
              aria-label="한 칸 위로"
            >
              ↑
            </button>
            <button
              type="button"
              class="worker-mini__rowops-down"
              data-bead-id=${item.id}
              title="같은 레포 안에서 한 칸 아래로"
              aria-label="한 칸 아래로"
            >
              ↓
            </button>
            <button
              type="button"
              class="worker-mini__rowops-remove"
              data-bead-id=${item.id}
              title="대기에서 빼기"
              aria-label="대기에서 빼기"
            >
              ✕
            </button>`
        : ''}
    </span>`;
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
      ${miniRow(withOverlaps(item), { actions: rowActions(item, true) })}
    </div>`;
  }

  /**
   * One 연결 레인 row (UI-j92s §5.2): 순번 · 레포 배지 · ID · 제목 한 줄 · 위치
   * 칩 · 행 `✕`. route 칩·겹침 칩·`← 선행` 칩은 여기 없다 — 레인 순서가 곧
   * 의존이므로 같은 사실을 두 번 말하지 않는다.
   *
   * 고정 행도 `✕`는 갖는다 (§5.3): 뺄 수는 있고, 그 앞에 넣을 수만 없다.
   *
   * 위치 칩은 "지금 막혀 있나"를 답한다 (UI-jaua §8) — 레포별 큐 순번은 툴팁으로
   * 내려갔다. 레인 순번 `①②` 옆의 `#n`이 전역 실행 순서로 읽혔기 때문이다.
   *
   * @param {MonitorChainLane} lane
   * @param {MonitorChainLaneRow} row
   * @param {number} row_index
   * @param {string[]} mismatched - 자동 교정이 움직일 수 없는데 의존과 어긋난 행
   * (UI-jaua §6.3).
   * @returns {import('lit-html').TemplateResult}
   */
  function chainRow(lane, row, row_index, mismatched) {
    return html`<div
      class="mon2-crow${row.fixed ? ' mon2-crow--fixed' : ''}"
      draggable=${row.draggable ? 'true' : 'false'}
      data-bead-id=${row.id}
      data-drag-kind="chain"
      data-root-dir=${row.root_dir}
      data-lane-id=${lane.lane_id}
      data-row-index=${row_index}
      data-queue-index=${typeof row.queue_index === 'number'
        ? String(row.queue_index)
        : ''}
    >
      <span class="mon2-crow__seq" aria-hidden="true"
        >${circledSeq(row.seq)}</span
      >
      ${row.workspace_name
        ? html`<span class="worker-mini__repo" title=${row.root_dir}
            >${row.workspace_name}</span
          >`
        : ''}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${row.id}</span>
      <span class="mon2-crow__title">${row.title}</span>
      ${row.mismatch
        ? html`<span
            class="mon2-crow__mismatch"
            title="레인 순서가 주장하는 선행이 bd 의존에 없습니다 — 재적용으로 복구합니다"
            >⚠ 의존 없음</span
          >`
        : ''}
      ${mismatched.includes(row.id)
        ? html`<span
            class="mon2-crow__mismatch"
            title="이미 실행된 뒤 의존이 바뀌었습니다 — 이 행은 움직일 수 없어 교정하지 않습니다"
            >⚠ 의존 순서와 다름</span
          >`
        : ''}
      <span class="mon2-crow__where" title=${row.location_title}
        >${row.location_label}</span
      >
      <button
        type="button"
        class="mon2-crow__detach"
        data-bead-id=${row.id}
        title="연결에서 빼고 앞뒤를 이어 붙입니다"
        aria-label="연결에서 빼기"
      >
        ✕
      </button>
    </div>`;
  }

  /**
   * One 연결 레인 pane (UI-j92s §5.1, 발차 축은 UI-jaua §5.5). 헤더 오른쪽이
   * 레인의 생애를 말한다: draft는 `확정`이 dep·큐를 한 번에 내고, confirmed는
   * `✕`가 그 dep를 함께 거둔다.
   *
   * 상태 배지와 조작은 **하나의 파생 상태**에서 나온다 (`lane.state`) — 두 곳에서
   * 판정하면 배지와 버튼이 어긋난다. 미발차 멤버가 남아 있는 한 진행 재개 조작이
   * 사라지지 않는 것이 §9 복구 경로의 성립 조건이다.
   *
   * 교정 표시(§6.3)는 지금 상태를 묻는 순수 함수에서 온다: 보류면 `확정`이
   * 비활성이고 그 이유가 헤더에 서며(fail-visible), 사이클이면 자동 교정이
   * 불가능하다는 사실만 남긴다.
   *
   * @param {MonitorChainLane} lane
   * @returns {import('lit-html').TemplateResult}
   */
  function chainLanePane(lane) {
    const enabled = lanes.cross_lanes_revision !== null;
    const correction = correctionOf(lane.lane_id);
    const held = correction?.held === true;
    const cycle = correction?.cycle === true;
    const mismatched = correction ? correction.mismatched : [];
    const corrected =
      correction_notice && correction_notice.lane_id === lane.lane_id
        ? correction_notice.corrected
        : 0;
    return html`<div class="mon2-clane" data-lane-id=${lane.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${lane.label}</span>
        <span class="mon2-clane__count">${lane.rows.length}</span>
        <span class="mon2-clane__badge mon2-clane__badge--${lane.state}"
          >${lane.badge}</span
        >
        ${corrected > 0
          ? html`<span
              class="mon2-clane__corrected"
              title="기존 blocks 의존이 드롭 순서를 이깁니다 — 그 순서로 다시 놓았습니다"
              >의존에 맞춰 ${corrected}건 자동 교정</span
            >`
          : ''}
        ${cycle
          ? html`<span
              class="mon2-clane__cycle"
              title="멤버들의 blocks 의존이 순환합니다 — 어느 순서도 의존을 만족시키지 못합니다"
              >⛔ 의존 사이클 — 자동 교정 불가</span
            >`
          : ''}
        ${held
          ? html`<span
              class="mon2-clane__hold"
              title="멤버 한 명의 의존 자료가 이 스냅샷에 아직 없습니다 — 다음 스냅샷이 채우면 교정합니다"
              >${HOLD_CORRECTION}</span
            >`
          : ''}
        ${lane.draft
          ? html`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${lane.lane_id}
              ?disabled=${!enabled || !lane.can_confirm || held}
              title=${held
                ? HOLD_CORRECTION
                : lane.can_confirm
                  ? '인접 의존을 걸고 미적재 멤버를 각자 레포 병렬 큐 끝에 올립니다'
                  : '멤버가 2개 이상이어야 확정할 수 있습니다'}
            >
              확정
            </button>`
          : ''}
        ${lane.run_label !== null
          ? html`<button
              type="button"
              class="mon2-clane__run"
              data-lane-id=${lane.lane_id}
              ?disabled=${!enabled}
              title="이 레인 멤버만 발차합니다 — 레포 자동 진행은 켜지 않습니다"
            >
              ${lane.run_label}
            </button>`
          : ''}
        ${lane.state === 'confirmed' && lane.has_mismatch
          ? html`<button
              type="button"
              class="mon2-clane__reapply"
              data-lane-id=${lane.lane_id}
              ?disabled=${!enabled}
              title="빠진 인접 의존을 다시 걸고 미적재 멤버를 다시 올립니다"
            >
              재적용
            </button>`
          : ''}
        ${lane.can_stop
          ? html`<button
              type="button"
              class="mon2-clane__stop"
              data-lane-id=${lane.lane_id}
              ?disabled=${!enabled}
              title="남은 멤버의 발차만 멈춥니다 — 도는 세션과 머지 큐 항목은 끝까지 갑니다"
            >
              ⏸ 정지
            </button>`
          : ''}
        <button
          type="button"
          class="mon2-clane__remove"
          data-lane-id=${lane.lane_id}
          ?disabled=${!enabled}
          title=${lane.draft
            ? '이 draft 레인을 지웁니다'
            : '이 레인과 레인이 만든 의존을 함께 지웁니다'}
          aria-label="연결 레인 삭제"
        >
          ✕
        </button>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${lane.lane_id}
      >
        ${lane.rows.length === 0
          ? html`<div class="mon2-clane__hint">
              여기로 끌어다 놓으면 연결이 시작됩니다
            </div>`
          : lane.rows.map((row, index) =>
              chainRow(lane, row, index, mismatched)
            )}
      </div>
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
      ${miniRow(withOverlaps(item), { actions: rowActions(item) })}
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
   * The 대기 lane body (§4, 공유 본문은 UI-5ksp §4.2): 병렬 영역 하나 + 직렬
   * 영역 하나. 레포 섹션은 없다 — 카드가 자기 레포를 이미 알고 있으므로 레포는
   * 좌표가 아니라 배지다. 구조는 두 탭이 공유하는 `waitBody`가 소유하고, 여기서는
   * cross-repo 재료(연결 레인 pane·`+ 연결 레인`·읽기 실패 안내)만 슬롯으로 넘긴다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function waitBodyTemplate() {
    const enabled = lanes.cross_lanes_revision !== null;
    const has_blank_lane = lanes.chain_lanes.some(
      (lane) => lane.draft && lane.rows.length === 0
    );
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
        extra_panes: lanes.chain_lanes.map((lane) => chainLanePane(lane)),
        header_control: html`<button
          type="button"
          class="mon2-newlane"
          ?disabled=${has_blank_lane || !enabled}
          title=${!enabled
            ? '연결 레인 저장소를 읽을 수 없습니다'
            : has_blank_lane
              ? '빈 연결 레인이 이미 있습니다'
              : '빈 연결 레인을 하나 만듭니다'}
        >
          + 연결 레인
        </button>`,
        ...(lanes.cross_lanes_unreadable
          ? {
              notice: html`<div class="mon2-clane__unreadable">
                연결 레인 저장소를 읽을 수 없음
              </div>`
            }
          : {})
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
                kind: item.kind,
                ...(item.kind === 'session'
                  ? {
                      updated_at: item.updated_at,
                      // 세션 정체·transcript 좌표 (UI-4xzk §6.4).
                      session_refs: item.session_refs || []
                    }
                  : {}),
                workflow: /** @type {any} */ (item.workflow || null),
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
                          ? '선행 대기'
                          : undefined,
                can_pause: item.can_pause !== false,
                exec_chips: item.exec_chips || null,
                usage: item.usage || null,
                chip_popover: popoverOf(item),
                discard: item.discard,
                failure: item.failure
                  ? {
                      ...item.failure,
                      open: open_failure_detail === item.attempt_id
                    }
                  : null
              },
              now,
              selected_attempt,
              {
                monitor: {
                  repo: item.workspace_name,
                  root_dir: item.root_dir,
                  serial_lane_id: item.serial_lane_id,
                  cross_lane_chip: item.cross_lane_chip || null,
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
            ? // 연결 레인 저장소를 읽을 수 없다는 사실은 대기가 비어 있어도
              // 말해야 한다 — 본문을 아예 그리지 않으면 그 안내가 사라진다.
              lanes.queue_groups.length > 0 ||
              lanes.chain_lanes.length > 0 ||
              lanes.parallel_rows.length > 0 ||
              lanes.cross_lanes_unreadable
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
      return paneTemplate({
        id: `monitor-${meta.lane}`,
        lane: meta.pane,
        title: meta.title,
        items,
        // 본문이 행을 소유하는 레인도 헤더 건수는 레인 구성원 수다 (§4.2).
        count: items.length,
        // 후보는 두 탭 모두 SOURCE pane이다 (§4.1): 이슈의 원천이지 생애 단계가
        // 아니라는 말이 Monitor에서도 같은 뜻이다.
        src: meta.lane === 'runnable',
        empty: meta.empty,
        body,
        live: meta.lane === 'running' && items.length > 0,
        collapsible: true,
        collapsed: collapse.isCollapsed(meta.pane),
        controls: meta.lane === 'runnable' ? candidateFilterStrip() : undefined,
        header_control: laneHeaderControl(meta.lane, items.length)
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
        </div>`;
    }
    // 레인 host는 Worker 탭과 같다 (§4.1): 다섯 레인의 최소 폭 합이 창을 넘으면
    // 여기서 가로로 스크롤한다 — 라우트 셸은 `overflow: hidden`이라 host가 없으면
    // 넘친 레인이 잘린다.
    return html`<div class="mon2-deck"></div>
      <div class="worker-lanes-host">
        <div class="worker-lanes mon2-lanes">
          ${MONITOR_LANES.map((meta) => lanePane(meta))}
        </div>
      </div>`;
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
      <div class="worker-filter__spec" role="group" aria-label="spec 필터">
        ${SPEC_FILTER_OPTIONS.map(
          (o) =>
            html`<button
              type="button"
              class="mon-filter__spec worker-filter__chip${candidate_filter.spec ===
              o.value
                ? ' is-active'
                : ''}"
              data-spec=${o.value}
              aria-pressed=${candidate_filter.spec === o.value
                ? 'true'
                : 'false'}
            >
              ${o.label}
            </button>`
        )}
        ${lanes.runnable_hidden.spec > 0
          ? html`<span class="worker-filter__hidden"
              >숨김 ${lanes.runnable_hidden.spec}</span
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
   * `cross_lanes_override`를 주면 그 레인으로 투영한다 — 레인 op 충돌 응답이
   * 실어 온 최신 레인 위에서 계획을 다시 세우는 자리이고, 그때 화면을 다시
   * 그릴 필요는 없다 (§5.5). 키가 없는 구서버 스냅샷은 `cross_lanes` 키를 아예
   * 싣지 않는다: `undefined`를 실으면 투영이 그것을 `null`(저장소 읽기 실패)로
   * 읽어 없는 기능을 고장으로 그린다 (§4.4).
   *
   * @param {{ revision: number, lanes: Array<Record<string, any>> }|null} [cross_lanes_override]
   * @returns {LaneModel}
   */
  function projectLanes(cross_lanes_override) {
    const workspaces =
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
    const workspaces_state =
      pipelineStore && pipelineStore.getWorkspacesState
        ? pipelineStore.getWorkspacesState()
        : [];
    const cross_lanes =
      cross_lanes_override === undefined
        ? pipelineStore && pipelineStore.crossLanes
          ? pipelineStore.crossLanes()
          : undefined
        : cross_lanes_override;
    /** @type {Record<string, any>} */
    const options = {
      done_since: closedRangeSince(done_range, nowFn()),
      running_sort,
      candidate_filter,
      candidate_sort
    };
    if (cross_lanes !== undefined) {
      options.cross_lanes = cross_lanes;
    }
    return buildLanes(workspaces, workspaces_state, options);
  }

  function doRender() {
    const now = nowFn();
    lanes = projectLanes();
    render_drop_model = null;
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
      workspacesState: () =>
        pipelineStore && pipelineStore.getWorkspacesState
          ? pipelineStore.getWorkspacesState()
          : [],
      doneItems: () => lanes.done,
      rangeLabel: doneRangeLabel,
      transport,
      implPresetStore: options.execPresetStore,
      gotoWorkerTab,
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
    // 연결 레인 행은 집계에 없는 노드까지 그리므로 자기 레포를 스스로 싣는다.
    for (const row of Array.from(
      console_el.querySelectorAll('.mon2-crow[data-root-dir]')
    )) {
      row.classList.toggle(
        'is-focus',
        focus_root !== null && row.getAttribute('data-root-dir') === focus_root
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
   * Re-run the §6 자동 교정 when a `dep-add` changed a pair of members of the
   * SAME 연결 레인 (§6.2) — 레포 직렬 레인이 UI-2gi1 §6.5에서 쓰는 재교정
   * 트리거와 같은 성질이다. 방금 만든 엣지는 아직 스냅샷에 없으므로 델타로
   * 얹어 넘긴다. 이제 유일한 호출자는 이슈 상세의 의존성 편집기라서 반환
   * 객체의 public 메서드로 선다 (UI-lx45 §5).
   *
   * @param {'dep-add'|'dep-remove'} type
   * @param {string} a
   * @param {string} b
   */
  async function recorrectSharedLane(type, a, b) {
    if (type !== 'dep-add') {
      return;
    }
    const lane = lanes.chain_lanes.find((entry) =>
      entry.rows.some((row) => row.id === a)
    );
    if (!lane || !lane.rows.some((row) => row.id === b)) {
      return;
    }
    await runPlanned((model) => planLaneCorrection(lane.lane_id, model), '', [
      { type, a, b }
    ]);
  }

  /**
   * The snapshot's raw `cross_lanes`, or `null` (구서버·저장소 읽기 실패).
   *
   * @returns {{ revision: number, lanes: Array<Record<string, any>> }|null}
   */
  function currentCrossLanes() {
    const value =
      pipelineStore && pipelineStore.crossLanes
        ? pipelineStore.crossLanes()
        : null;
    return value ?? null;
  }

  /**
   * The lane pane's buttons (§5.1·§5.2, 발차 축은 UI-jaua §5.5). 계획은 전부
   * `drop-plan`이 소유하고 여기서는 어느 계획인지와 확인 한 번만 고른다. 발차
   * 축만 예외다 — `진행`·`정지`는 레인도 의존도 바꾸지 않고 큐 op만 내므로 계획
   * 값이 없다.
   *
   * @param {'confirm'|'reapply'|'remove'|'create'|'run'|'stop'} kind
   * @param {string} lane_id
   */
  async function runLaneAction(kind, lane_id) {
    if (kind === 'run') {
      await runLane(lane_id);
      return;
    }
    if (kind === 'stop') {
      await stopLane(lane_id);
      return;
    }
    if (kind === 'create') {
      await runPlanned((model) => planLaneCreate(null, model), '');
      return;
    }
    if (kind === 'remove') {
      // 문장은 계획이 소유한다 (UI-jaua §7.3): 어느 의존이 지워지고 어느 것이
      // 남는지를 실제 provenance에서 읽어 그대로 보인다. draft는 만든 dep가
      // 없으므로 `null`이고 확인 없이 즉시 지운다 (§5.1).
      const message = describeLaneRemoval(lane_id, dropModel());
      if (message !== null && !confirmFn(message)) {
        return;
      }
      await runPlanned((model) => planLaneRemove(lane_id, model), '');
      return;
    }
    await runPlanned(
      (model) =>
        kind === 'confirm'
          ? planLaneConfirm(lane_id, model)
          : planLaneReapply(lane_id, model),
      ''
    );
  }

  /**
   * Group this lane's members by repo (UI-jaua §5.5). 좌표는 위치가 우선이고
   * (`owner_of`), 어느 레인에도 없는 멤버는 저장 entry가 실어 온 레포다.
   *
   * @param {MonitorChainLane} lane
   * @returns {Map<string, string[]>}
   */
  function laneMembersByRoot(lane) {
    /** @type {Map<string, string[]>} */
    const by_root = new Map();
    for (const row of lane.rows) {
      const root_dir = lanes.owner_of[row.id] || row.root_dir;
      if (typeof root_dir !== 'string' || root_dir.length === 0) {
        continue;
      }
      by_root.set(root_dir, [...(by_root.get(root_dir) || []), row.id]);
    }
    return by_root;
  }

  /**
   * `▶ 진행` / `▶ 이어서 진행` / `▶ 다시 진행` (UI-jaua §5.5). 레포
   * `auto_advance`는 건드리지 않는다 — 이 레인 멤버만 발차하는 별개의 축이다
   * (§3 사용자 결정 1).
   *
   * **적재가 arm보다 앞선다**: 큐에 없는 엔트리에는 `armed_by_lane`을 쓸 자리가
   * 없다. 적재 index 규칙은 `재적용`과 같다 (`placeUnplacedMembers`, §5.4) —
   * 자기 레포 병렬 큐 끝이고, 같은 레포에 여럿이면 이 실행에서 앞서 잡은 자리만큼
   * 뒤로 민다.
   *
   * 트랜잭션은 없다 (§9): 일부 레포에서 실패하면 거기서 멈추고 토스트로 알리며,
   * 성공한 레포의 arm은 유지된다. 다음 스냅샷에서 레인은 `▶ 진행 중`이지만
   * 미발차 멤버가 남아 있으므로 `▶ 이어서 진행`이 그대로 서 있고, 그 재클릭이
   * 복구 경로다.
   *
   * @param {string} lane_id
   */
  async function runLane(lane_id) {
    const lane = lanes.chain_lanes.find((entry) => entry.lane_id === lane_id);
    if (!lane || lanes.cross_lanes_revision === null) {
      doRender();
      return;
    }
    clearCorrectionNotice();
    /** @type {Map<string, number>} */
    const revisions = new Map();
    /** @type {Map<string, number>} */
    const taken = new Map();
    const members_by_root = laneMembersByRoot(lane);
    for (const row of lane.rows) {
      if (!row.unplaced) {
        continue;
      }
      const root_dir = lanes.owner_of[row.id] || row.root_dir;
      if (typeof root_dir !== 'string' || root_dir.length === 0) {
        showToast(`${row.id}의 레포를 알 수 없어 적재할 수 없습니다`, 'error');
        doRender();
        return;
      }
      const offset = taken.get(root_dir) ?? 0;
      const next = await sendQueueCas(
        'worker-queue-place',
        {
          bead_id: row.id,
          lane: 'parallel',
          index: (lanes.parallel_raw_length[root_dir] ?? 0) + offset
        },
        root_dir,
        revisions,
        { bead_id: row.id }
      );
      if (next === null) {
        doRender();
        return;
      }
      taken.set(root_dir, offset + 1);
    }
    for (const [root_dir, bead_ids] of members_by_root) {
      // 큐에 없는 id는 서버가 조용히 무시한다 (§5.3) — 한 번의 `▶ 진행`이 레인
      // 멤버십 전체를 그 레인이 걸친 레포마다 보내기 때문이다.
      const next = await sendQueueCas(
        'worker-queue-arm',
        { bead_ids, lane_id },
        root_dir,
        revisions,
        { bead_id: bead_ids[0] }
      );
      if (next === null) {
        showToast(
          '일부 레포에서 진행을 켜지 못했습니다 — [▶ 이어서 진행]으로 다시 시도하세요',
          'error'
        );
        doRender();
        return;
      }
    }
    doRender();
  }

  /**
   * `⏸ 정지` (UI-jaua §5.5): 멤버 레포마다 그 레인의 arm을 해제한다. **이미
   * 실행 중인 세션은 끝까지 가고**, 머지 큐에 이미 등록된 항목도 그대로 진행한다
   * — 발급된 권한을 회수하지 않는 현행 계약이며, 이 조작은 후보를 줄일 뿐이다.
   *
   * @param {string} lane_id
   */
  async function stopLane(lane_id) {
    const lane = lanes.chain_lanes.find((entry) => entry.lane_id === lane_id);
    if (!lane || lanes.cross_lanes_revision === null) {
      doRender();
      return;
    }
    clearCorrectionNotice();
    /** @type {Map<string, number>} */
    const revisions = new Map();
    for (const [root_dir, bead_ids] of laneMembersByRoot(lane)) {
      const next = await sendQueueCas(
        'worker-queue-disarm',
        { lane_id },
        root_dir,
        revisions,
        { bead_id: bead_ids[0] }
      );
      if (next === null) {
        break;
      }
    }
    doRender();
  }

  /**
   * Release ONE orphan arm from the row that reveals it (UI-jaua §5.3 (2)).
   * 레인은 사라졌는데 항목이 계속 발차되는 상태를 숨기지 않고 드러낸 다음, 같은
   * 자리에서 끄게 한다.
   *
   * @param {string} bead_id
   * @param {string} lane_id
   */
  async function releaseArm(bead_id, lane_id) {
    const { root_dir, revision } = casOf(bead_id);
    if (root_dir.length === 0) {
      doRender();
      return;
    }
    await sendQueueCas(
      'worker-queue-disarm',
      { bead_ids: [bead_id], lane_id },
      root_dir,
      new Map([[root_dir, revision]]),
      { bead_id }
    );
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
    if (choice === 'new-lane') {
      // `+ 새 연결 레인`은 seed 하나만 든 draft를 만든다 (§5.4) — dep도 큐도
      // 만들지 않으므로 두 번째 멤버가 들어올 때까지 아무 실행 진실도 바뀌지 않는다.
      await runPlanned(
        (model) => planLaneCreate({ bead_id, root_dir: item.root_dir }, model),
        bead_id
      );
      return;
    }
    if (choice.startsWith('lane:')) {
      const lane_id = choice.slice('lane:'.length);
      const lane = lanes.chain_lanes.find((entry) => entry.lane_id === lane_id);
      if (!lane) {
        doRender();
        return;
      }
      // `연결 n 끝에`는 좌표가 아니라 **끝**이라는 뜻이다 (§5.4). 충돌 재계획은
      // 최신 `cross_lanes` 위에서 다시 서므로 끝 인덱스도 그때 다시 센다.
      await runPlanned(
        (model) =>
          planDrop(
            drag,
            {
              kind: 'chain',
              lane_id,
              marker_index: (model.cross_lanes.get(lane_id)?.entries ?? [])
                .length
            },
            model
          ),
        bead_id
      );
      return;
    }
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

  /**
   * A 연결 레인 row's mobile `✕` (§6) = 이어 붙이기(chain → parallel
   * 규칙).
   *
   * @param {string} bead_id
   */
  async function detachChainRow(bead_id) {
    for (const lane of lanes.chain_lanes) {
      const row = lane.rows.find((entry) => entry.id === bead_id);
      if (!row) {
        continue;
      }
      await applyDrop(
        {
          kind: 'chain',
          bead_id,
          root_dir: row.root_dir,
          lane_id: lane.lane_id,
          ...(typeof row.queue_index === 'number'
            ? { queue_index: row.queue_index }
            : {})
        },
        { kind: 'parallel', marker_index: lanes.parallel_rows.length }
      );
      return;
    }
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
    if (cls.contains('mon2-crow__detach')) {
      void detachChainRow(bead_id);
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
    if (cls.contains('mon2-arm__release')) {
      void releaseArm(bead_id, button.getAttribute('data-lane-id') || '');
      return;
    }
    if (cls.contains('mon-lane__chip')) {
      const lane_id = button.getAttribute('data-lane-id') || '';
      const pane = console_el.querySelector(
        `.mon2-clane[data-lane-id="${lane_id}"]`
      );
      pane?.scrollIntoView({ block: 'nearest' });
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
    if (cls.contains('rtile__resume')) {
      void requestResumeInstructions().then((instructions) => {
        if (instructions === null) {
          return;
        }
        return sendContinuationAction(
          'worker-attempt-resume',
          {
            attempt_id,
            ...(instructions !== '' ? { instructions } : {})
          },
          root_dir,
          revision
        );
      });
      return;
    }
    // 파킹 타일의 [재시도] (UI-5ym8 §3.1). CAS를 쓰지 않는 attempt 제어라
    // `send`이고, 서버가 "그 attempt가 아직 마지막인가"로 판정한다. 배선하지
    // 않으면 이 탭에서만 버튼이 이슈 상세를 여는 죽은 버튼이 된다.
    if (cls.contains('rtile__parked-retry')) {
      void send('worker-parked-retry', { bead_id, attempt_id }, root_dir).then(
        (res) => {
          if (res && res.ok === false) {
            showToast(
              `재시도 거부: ${
                res.reason === 'not_latest'
                  ? '이 bead에 더 새로운 시도가 있습니다'
                  : res.reason || ''
              }`,
              'error'
            );
          }
        }
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
    if (target.closest('dialog') || target.closest('.worker-drawer-overlay')) {
      return;
    }
    if (target.closest('a')) {
      return;
    }

    // ID 클릭 = 복사 (§11). 상세는 열리지 않는다.
    const id_el = target.closest(
      '.worker-card__id, .worker-mini__id, .rtile__id'
    );
    if (id_el) {
      ev.preventDefault();
      const owner = /** @type {HTMLElement|null} */ (
        target.closest('.mon2-item, .rtile, .mon2-crow, .worker-mini')
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

    if (target.closest('.mon2-newlane')) {
      ev.preventDefault();
      void runLaneAction('create', '');
      return;
    }

    const lane_button = /** @type {HTMLElement|null} */ (
      target.closest(
        '.mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove, .mon2-clane__run, .mon2-clane__stop'
      )
    );
    if (lane_button) {
      ev.preventDefault();
      const lane_id = lane_button.getAttribute('data-lane-id') || '';
      const cls = lane_button.classList;
      void runLaneAction(
        cls.contains('mon2-clane__confirm')
          ? 'confirm'
          : cls.contains('mon2-clane__reapply')
            ? 'reapply'
            : cls.contains('mon2-clane__run')
              ? 'run'
              : cls.contains('mon2-clane__stop')
                ? 'stop'
                : 'remove',
        lane_id
      );
      return;
    }

    if (target.closest('.mon-merge-all')) {
      ev.preventDefault();
      void mergeQueueAddAll();
      return;
    }

    const spec_chip = /** @type {HTMLElement|null} */ (
      target.closest('.mon-filter__spec')
    );
    if (spec_chip) {
      ev.preventDefault();
      candidate_filter = {
        ...candidate_filter,
        spec: /** @type {any} */ (spec_chip.getAttribute('data-spec') || 'all')
      };
      saveCandidateFilter(candidate_filter);
      doRender();
      return;
    }

    const row = /** @type {HTMLElement|null} */ (
      target.closest(
        '.mon2-item, .rtile, .mon2-crow, .worker-mini, .worker-card'
      )
    );
    if (!row) {
      return;
    }
    const bead_id = row.getAttribute('data-bead-id') || '';
    const button = /** @type {HTMLElement|null} */ (target.closest('button'));
    if (button) {
      ev.preventDefault();
      runRowAction(button, bead_id);
      return;
    }
    if (target.closest('.rtile__failure-pop, .chip-popover')) {
      return;
    }
    if (bead_id && !after_drag) {
      ev.preventDefault();
      // 연결 레인 행은 집계에 없는 노드까지 그리므로 자기 레포를 스스로 싣는다.
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
    if (
      open_failure_detail &&
      !closest('.rtile__failure-pop, .rtile__failure-badge')
    ) {
      open_failure_detail = null;
      doRender();
    }
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocumentKeyDown(ev) {
    if (ev.key !== 'Escape' || open_failure_detail === null) {
      return;
    }
    open_failure_detail = null;
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
    recorrectSharedLane,
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
