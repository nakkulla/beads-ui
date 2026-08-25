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
import {
  candidateCard,
  discardCompletionMessage,
  discardConfirmationMessage,
  miniRow,
  paneTemplate
} from '../worker/lanes.js';
import { runningTile } from '../worker/running-grid.js';
import { createTranscriptDrawer } from '../worker/transcript-drawer.js';
import { createRepoDeck } from './deck.js';
import { depCandidates, filterDepCandidates } from './dep-candidates.js';
import {
  planDrop,
  planLaneConfirm,
  planLaneCreate,
  planLaneReapply,
  planLaneRemove
} from './drop-plan.js';
import {
  CANDIDATE_FILTER_DEFAULT,
  CANDIDATE_SORT_OPTIONS,
  SPEC_FILTER_OPTIONS,
  buildLanes
} from './lanes.js';

/**
 * @import { CandidateFilter, MonitorChainLane, MonitorChainLaneRow, MonitorItem, MonitorLanes, MonitorOccupant, MonitorQueueGroup, MonitorSerialSublane } from './lanes.js'
 * @import { DependencyChips, OverlapPopover, OverlapPopoverRow } from '../worker/lanes.js'
 * @import { DropDrag, DropModel, DropPlan, DropTarget, LaneOp, Op } from './drop-plan.js'
 * @import { DepCandidateIssue } from './dep-candidates.js'
 */

/** 겹침 팝오버의 배치 버튼 문구 (UI-qm12 §5.4). */
const OVERLAP_PLACE_LABEL = '같은 직렬 레인으로';

/**
 * A bead's 직렬 레인 (UI-qm12 §5.4): 대기 중이면 그 레인, 실행 중이면 출발한
 * 레인. 병렬 큐·실행가능·병렬에서 출발한 실행 중은 레인이 없다.
 *
 * @param {MonitorItem} item
 * @returns {string|null}
 */
function serialLaneOf(item) {
  if (typeof item.lane === 'string' && /^s[1-5]$/.test(item.lane)) {
    return item.lane;
  }
  if (item.lane === 'running' && item.serial_lane_id) {
    return item.serial_lane_id;
  }
  return null;
}

/**
 * Movable = 대기(병렬/직렬) 또는 실행가능 (UI-qm12 §5.4). 실행 중인 항목은
 * 옮기지 않는다 — 이미 워크트리를 잡고 있다.
 *
 * @param {MonitorItem} item
 */
function isPlaceable(item) {
  return (
    item.lane === 'runnable' ||
    item.lane === 'queue' ||
    (typeof item.lane === 'string' && /^s[1-5]$/.test(item.lane))
  );
}

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
 * The five lanes in DOM order (§3). 생애주기 좌→우 독해 그대로 두고, 모바일의
 * 관제 우선 순서(실행중→대기→실행가능→PR→완료)는 CSS `order`가 소유한다 —
 * DOM을 두 번 재배열하면 탭 이동 순서가 화면 폭마다 달라진다.
 *
 * @type {ReadonlyArray<{ lane: 'runnable'|'queue'|'running'|'pr_wait'|'done', pane: 'candidate'|'queue'|'running'|'pr_wait'|'done', title: string, empty: string }>}
 */
const MONITOR_LANES = [
  {
    lane: 'runnable',
    pane: 'candidate',
    title: '실행가능',
    empty: '실행 자격을 갖춘 이슈 없음'
  },
  { lane: 'queue', pane: 'queue', title: '대기', empty: '표시할 레포 없음' },
  { lane: 'running', pane: 'running', title: '실행중', empty: '실행 중 없음' },
  { lane: 'pr_wait', pane: 'pr_wait', title: 'PR 대기', empty: 'PR 없음' },
  { lane: 'done', pane: 'done', title: '완료', empty: '완료 기록 없음' }
];

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

  /**
   * 지금 열려 있는 겹침 팝오버 (UI-qm12 §5.3). 상대 id만 기억한다 — 버튼 판정은
   * 클릭 시점의 최신 모델로 다시 하므로, 팝오버가 열린 사이 스냅샷이 바뀌어도
   * 낡은 결론을 실행하지 않는다.
   *
   * @type {{ bead_id: string, counterpart_id: string }|null}
   */
  let open_overlap = null;

  /**
   * 지금 열려 있는 의존성 패널 (UI-j92s §6.1). 한 번에 하나이며, 검색어는 패널이
   * 열려 있는 동안만 사는 표시 상태다.
   *
   * @type {{ bead_id: string, query: string }|null}
   */
  let dep_panel = null;

  /**
   * 한 계획을 보내는 동안 이미 적용된 dep op (§5.5). 충돌 뒤 재계획은 아직
   * 도착하지 않은 스냅샷 대신 이 델타를 얹은 그래프 위에서 세워야 이미 보낸
   * `dep-remove`가 "이미 없음"으로 반영된다.
   *
   * @type {Array<{ type: 'dep-add'|'dep-remove', a: string, b: string }>}
   */
  let dep_delta = [];

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

  /** @type {MonitorLanes} */
  let lanes = buildLanes(null, null);
  /** @type {Map<string, MonitorItem>} */
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
   * Collapse state of the 대기 lane's two areas (§4). 레포별 섹션 키와 달리
   * 영역은 전 레포 공통이므로 저장 키도 최상위에 둔다.
   *
   * @param {'parallel'|'serial'} area
   * @returns {boolean}
   */
  function areaCollapsed(area) {
    return sections_state[area] === true;
  }

  /**
   * @param {'parallel'|'serial'} area
   */
  function toggleArea(area) {
    sections_state = {
      ...sections_state,
      [area]: sections_state[area] !== true
    };
    saveSections(sections_state);
    doRender();
  }

  // --- 겹침 칩·팝오버·1클릭 직렬 배치 (UI-qm12 §5.3·§5.4) ---

  /**
   * The repo's first EMPTY 직렬 레인 (§5.4): 서버 배열에 entry가 없고 점유자도
   * 없는 레인. 설정만 있고 비어 있어 투영에서 접힌 레인도 후보다 — 접힘은
   * 표시 사정이지 사실이 아니다.
   *
   * @param {string} root_dir
   * @returns {'s1'|'s2'|'s3'|'s4'|'s5'|null}
   */
  function firstEmptySerialLane(root_dir) {
    const group = lanes.queue_groups.find(
      (entry) => entry.root_dir === root_dir
    );
    if (!group) {
      return null;
    }
    for (let index = 0; index < group.serial_lane_count; index += 1) {
      const id = /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (`s${index + 1}`);
      const lane = group.sublanes.serial.find((entry) => entry.id === id);
      if (!lane) {
        return id;
      }
      if (lane.raw_length === 0 && lane.occupied_by.length === 0) {
        return id;
      }
    }
    return null;
  }

  /**
   * Where a 끝 삽입 lands: 그 레인 서버 배열의 마지막 다음 자리다.
   *
   * @param {string} root_dir
   * @param {'s1'|'s2'|'s3'|'s4'|'s5'} lane_id
   */
  function serialLaneEnd(root_dir, lane_id) {
    const group = lanes.queue_groups.find(
      (entry) => entry.root_dir === root_dir
    );
    const lane = group
      ? group.sublanes.serial.find((entry) => entry.id === lane_id)
      : undefined;
    return lane ? lane.raw_length : 0;
  }

  /**
   * @typedef {{ kind: 'note', text: string }
   *   | { kind: 'disabled', title: string }
   *   | { kind: 'ops', title: string, root_dir: string, ops: Array<{ bead_id: string, lane: 's1'|'s2'|'s3'|'s4'|'s5', index: number }> }} PlacementPlan
   */

  /**
   * The §5.4 decision table, verbatim. 어느 한쪽에 직렬 레인이 있으면 그 레인을
   * 쓰고(1 op), 둘 다 없을 때만 빈 레인에 둘을 차례로 넣는다(2 op). 실행 중인
   * 항목은 옮기지 않으므로 그 자리에는 버튼 대신 문장이 선다.
   *
   * @param {string} me_id - 칩을 눌러 팝오버를 연 카드의 bead.
   * @param {string} counterpart_id - 겹치는 상대로 팝오버 행에 선 bead.
   * @returns {PlacementPlan}
   */
  function placementPlan(me_id, counterpart_id) {
    const me = item_by_bead.get(me_id);
    const other = item_by_bead.get(counterpart_id);
    if (!me || !other) {
      return { kind: 'note', text: '상대의 현재 위치를 알 수 없습니다' };
    }
    const my_lane = serialLaneOf(me);
    const other_lane = serialLaneOf(other);
    if (
      my_lane !== null &&
      my_lane === other_lane &&
      me.root_dir === other.root_dir
    ) {
      return { kind: 'note', text: '이미 같은 직렬 레인 — 순서가 있습니다' };
    }
    const my_move = isPlaceable(me);
    const other_move = isPlaceable(other);
    if (my_move && other_lane !== null) {
      const lane = /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (other_lane);
      return {
        kind: 'ops',
        title: `${lane} 끝에 ${me_id}를 넣습니다`,
        root_dir: other.root_dir,
        ops: [
          {
            bead_id: me_id,
            lane,
            index: serialLaneEnd(other.root_dir, lane)
          }
        ]
      };
    }
    if (my_lane !== null && other_move && other_lane === null) {
      const lane = /** @type {'s1'|'s2'|'s3'|'s4'|'s5'} */ (my_lane);
      return {
        kind: 'ops',
        title: `${lane} 끝에 ${counterpart_id}를 넣습니다`,
        root_dir: me.root_dir,
        ops: [
          {
            bead_id: counterpart_id,
            lane,
            index: serialLaneEnd(me.root_dir, lane)
          }
        ]
      };
    }
    if (my_move && my_lane === null && other_move && other_lane === null) {
      const empty = firstEmptySerialLane(me.root_dir);
      if (empty === null) {
        return {
          kind: 'disabled',
          title: '빈 직렬 레인 없음 — Worker 탭에서 레인 수 조절'
        };
      }
      // 상대가 먼저다 — 겹침 칩은 순서를 주장하지 않지만, 이미 자리를 잡은
      // 쪽을 앞에 두는 것이 사용자가 방금 본 화면과 어긋나지 않는다.
      return {
        kind: 'ops',
        title: `${empty} 레인에 ${counterpart_id} → ${me_id} 순서로 넣습니다`,
        root_dir: me.root_dir,
        ops: [
          { bead_id: counterpart_id, lane: empty, index: 0 },
          { bead_id: me_id, lane: empty, index: 1 }
        ]
      };
    }
    if (!my_move && !other_move) {
      return { kind: 'note', text: '둘 다 실행 중 — 순서를 만들 수 없습니다' };
    }
    if (!my_move) {
      return {
        kind: 'note',
        text: '실행 중 — 순서를 만들려면 상대를 직렬 레인에 두세요'
      };
    }
    return {
      kind: 'note',
      text: '실행 중 — 종료 후 출발하려면 직렬 레인에 두세요'
    };
  }

  /**
   * @param {string} me_id
   * @param {import('./lanes.js').OverlapChip} chip
   * @returns {OverlapPopoverRow}
   */
  function overlapPopoverRow(me_id, chip) {
    const plan = placementPlan(me_id, chip.id);
    return {
      id: chip.id,
      title: chip.title,
      location_label: chip.location_label,
      prefixes: chip.prefixes,
      action:
        plan.kind === 'note'
          ? { kind: 'note', text: plan.text }
          : plan.kind === 'disabled'
            ? {
                kind: 'disabled',
                label: OVERLAP_PLACE_LABEL,
                title: plan.title
              }
            : { kind: 'place', label: OVERLAP_PLACE_LABEL, title: plan.title }
    };
  }

  /**
   * @param {string} bead_id
   * @param {import('./lanes.js').OverlapChip[]} overlaps
   * @returns {OverlapPopover|null}
   */
  function overlapPopoverFor(bead_id, overlaps) {
    if (!open_overlap || open_overlap.bead_id !== bead_id) {
      return null;
    }
    const counterpart_id = open_overlap.counterpart_id;
    const chips = overlaps.filter((chip) => chip.id === counterpart_id);
    if (chips.length === 0) {
      return null;
    }
    return { rows: chips.map((chip) => overlapPopoverRow(bead_id, chip)) };
  }

  /**
   * Merge the 겹침 파생값 into the dependency chips a card already carries
   * (§5.3) — 칩·팝오버 마크업은 한 벌이므로 전달 경로도 하나다.
   *
   * @param {{ id: string, overlap_chips?: import('./lanes.js').OverlapChip[], scope_state?: 'declared'|'missing', cross_lane_chip?: import('./lanes.js').CrossLaneChip, dependency_chips?: DependencyChips|null }} row
   * @returns {DependencyChips|null}
   */
  function chipsWithOverlaps(row) {
    const base = row.dependency_chips || null;
    const overlaps = row.overlap_chips || [];
    const scope_missing = row.scope_state === 'missing';
    const cross_lane = row.cross_lane_chip;
    if (!base && overlaps.length === 0 && !scope_missing && !cross_lane) {
      return null;
    }
    const popover = overlapPopoverFor(row.id, overlaps);
    return {
      ...(base || {}),
      ...(overlaps.length > 0 ? { overlaps } : {}),
      ...(scope_missing ? { scope_missing: true } : {}),
      // 소속 칩 (§5.2a): 숨기지 않는 레인 멤버가 자기 소속을 말하는 자리다.
      ...(cross_lane
        ? {
            cross_lane: {
              lane_id: cross_lane.lane_id,
              label: cross_lane.label
            }
          }
        : {}),
      ...(popover ? { popover } : {})
    };
  }

  /**
   * @param {MonitorItem} item
   * @returns {MonitorItem}
   */
  function withOverlaps(item) {
    const chips = chipsWithOverlaps(item);
    return chips ? { ...item, dependency_chips: chips } : item;
  }

  /**
   * Run the 1클릭 배치 (§5.4). 판정은 지금의 모델로 다시 하고, 두 번째 op는 첫
   * 응답이 실어 온 revision으로 간다. 첫 op가 실패하면 두 번째는 보내지 않는다 —
   * 트랜잭션이 없으므로 다음 스냅샷이 실제 상태를 그린다.
   *
   * @param {string} me_id
   * @param {string} counterpart_id
   */
  async function placeIntoSameSerialLane(me_id, counterpart_id) {
    const plan = placementPlan(me_id, counterpart_id);
    open_overlap = null;
    if (plan.kind !== 'ops') {
      doRender();
      return;
    }
    let revision = revisionOfRoot(plan.root_dir, plan.ops[0].bead_id);
    for (const op of plan.ops) {
      const next = await sendPlaceOp(op, plan.root_dir, revision);
      if (next === null) {
        break;
      }
      revision = next;
    }
    doRender();
  }

  /**
   * @param {{ bead_id: string, lane: 's1'|'s2'|'s3'|'s4'|'s5', index: number }} op
   * @param {string} root_dir
   * @param {number} revision
   * @returns {Promise<number|null>} 이어 쓸 revision, 실패면 null.
   */
  async function sendPlaceOp(op, root_dir, revision) {
    try {
      // 충돌 자동 재시도 없음 (§5.4): 판정은 클릭 시점의 모델로 했으므로,
      // 충돌은 그 판정의 근거가 사라졌다는 뜻이다 — 낡은 계획을 새 큐에
      // 밀어 넣지 않는다.
      const res = await sendCas(
        'worker-queue-place',
        op,
        root_dir,
        revision,
        false
      );
      if (res && res.conflict) {
        showToast('큐가 바뀌었습니다 — 다시 시도해 주세요', 'error');
        return null;
      }
      // 성공은 `applied: true` + 숫자 revision뿐이다. 그 외(전송 불가·적용
      // 거부·revision 없는 응답)는 전부 중단 — 두 번째 op는 첫 응답의
      // revision으로만 간다.
      if (!res || res.applied !== true) {
        showToast(
          res && typeof res.admission_reason === 'string'
            ? `큐 적재 거부: ${res.admission_reason}`
            : '큐 요청이 적용되지 않았습니다',
          'error'
        );
        return null;
      }
      const next_revision = res.queue ? res.queue.revision : undefined;
      if (typeof next_revision !== 'number') {
        showToast('큐 응답에 revision이 없습니다', 'error');
        return null;
      }
      return next_revision;
    } catch (error) {
      showToast(mutationErrorMessage(error), 'error');
      return null;
    }
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
   * @param {MonitorItem} item
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
   * @param {MonitorItem} item
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
   * The 의존성 패널 후보 모집단 (§6.1): 보이는 모든 레포의 실행가능·대기(병렬·
   * 직렬)·실행중·PR 대기. 완료 제외는 `depCandidates`가 소유하므로 여기서
   * 미리 빼지 않는다.
   *
   * @returns {DepCandidateIssue[]}
   */
  function depIssues() {
    /** @type {DepCandidateIssue[]} */
    const issues = [];
    /** @type {Set<string>} */
    const seen = new Set();
    /**
     * @param {MonitorItem[]} items
     * @param {DepCandidateIssue['lane']} lane
     */
    const push = (items, lane) => {
      for (const item of items) {
        if (seen.has(item.id)) {
          continue;
        }
        seen.add(item.id);
        issues.push({
          bead_id: item.id,
          root_dir: item.root_dir,
          workspace_name: item.workspace_name,
          title: item.title,
          lane
        });
      }
    };
    push(lanes.running, 'running');
    push(lanes.pr_wait, 'pr_wait');
    push(lanes.queue, 'queue');
    // 필터 이전 목록이다 (§6.1): `차단됨`·`스펙`·`의존 있음` 토글은 보기를 좁힐
    // 뿐 의존을 걸 수 있는 이슈를 줄이지 않는다.
    push(lanes.runnable_all, 'runnable');
    return issues;
  }

  /**
   * One inline 의존성 패널 (§6.1). 카드/행 아래에 열리고 한 번에 하나다.
   *
   * 패널이 묻는 것은 한 문장뿐이다 — "이 이슈를 무엇이 막는가". 반대 방향은
   * 상대 이슈의 카드에서 같은 문장으로 걸므로, `root_dir`은 언제나 이 행을
   * 소유한 레포다: 서버가 그 root에서 `bd dep add/remove a b`를 돌린다.
   *
   * @param {string} bead_id
   * @returns {import('lit-html').TemplateResult|''}
   */
  function depPanel(bead_id) {
    if (!dep_panel || dep_panel.bead_id !== bead_id) {
      return '';
    }
    const graph = blockedByMap();
    const issues = depIssues();
    /** @type {Map<string, DepCandidateIssue>} */
    const open_by_id = new Map();
    for (const issue of issues) {
      open_by_id.set(issue.bead_id, issue);
    }
    const blockers = (graph.get(bead_id) || []).filter((id) =>
      open_by_id.has(id)
    );
    const candidates = filterDepCandidates(
      depCandidates(bead_id, { issues, blocked_by_map: graph }),
      dep_panel.query
    );
    const own_root = lanes.owner_of[bead_id];
    return html`<div
      class="mon-deppanel"
      data-bead-id=${bead_id}
      role="dialog"
      aria-label="의존성"
    >
      <div class="mon-deppanel__title">이 이슈를 막는 이슈</div>
      <div class="mon-deppanel__now">
        ${blockers.length === 0
          ? html`<span class="mon-deppanel__empty">막는 이슈 없음</span>`
          : ''}
        ${blockers.map(
          (id) =>
            html`<span class="mon-deppanel__chip mon-deppanel__chip--pred"
              ><span class="mon-deppanel__chip-label">⛓ ${id}</span
              ><button
                type="button"
                class="mon-deppanel__unlink"
                data-dep-a=${bead_id}
                data-dep-b=${id}
                aria-label=${`${id} 연결 해제`}
                title="연결 해제"
              >
                ✕
              </button></span
            >`
        )}
      </div>
      <input
        type="search"
        class="mon-deppanel__search"
        placeholder="ID·제목 검색"
        aria-label="의존 후보 검색"
        .value=${dep_panel.query}
      />
      <div class="mon-deppanel__list">
        ${candidates.length === 0
          ? html`<div class="mon-deppanel__empty">후보 없음</div>`
          : candidates.map(
              (candidate) =>
                html`<button
                  type="button"
                  class="mon-deppanel__cand${candidate.disabled
                    ? ' is-disabled'
                    : ''}"
                  data-dep-cand=${candidate.bead_id}
                  ?disabled=${candidate.disabled}
                  title=${candidate.reason || candidate.title}
                >
                  <span class="mon-deppanel__cand-repo"
                    >${candidate.workspace_name}</span
                  ><span class="mon-deppanel__cand-id"
                    >${candidate.bead_id}</span
                  ><span class="mon-deppanel__cand-title"
                    >${candidate.title}</span
                  >${candidate.reason
                    ? html`<span class="mon-deppanel__cand-reason"
                        >${candidate.reason}</span
                      >`
                    : ''}
                </button>`
            )}
      </div>
      ${own_root === undefined
        ? html`<div class="mon-deppanel__warn">
            이 이슈의 레포를 알 수 없어 의존을 바꿀 수 없습니다
          </div>`
        : ''}
    </div>`;
  }

  /**
   * @param {MonitorItem} item
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateRow(item) {
    return itemShell(
      item,
      html`${candidateCard(withOverlaps(item), placeMenuFor(item), {
        exec_chips_mode: 'pinned_only',
        dep_action: true,
        onOpenDoc: openDoc
          ? (/** @type {Event} */ _ev, /** @type {any} */ doc) =>
              openDoc(doc, item.root_dir)
          : undefined
      })}${depPanel(item.id)}`
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
   * One 병렬 영역 row (§4.1). Worker `miniRow` 그대로이고, 드래그 좌표와 모바일
   * 행 조작만 바깥 shell이 싣는다. 순번 `#n`의 `#`는 CSS가 붙인다 — Worker
   * 템플릿은 두 탭이 공유한다.
   *
   * @param {MonitorItem} item
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
      ${miniRow(withOverlaps(item))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${item.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
        <button
          type="button"
          class="mon2-rowops__up"
          data-bead-id=${item.id}
          title="같은 레포 안에서 한 칸 위로"
          aria-label="한 칸 위로"
        >
          ↑
        </button>
        <button
          type="button"
          class="mon2-rowops__down"
          data-bead-id=${item.id}
          title="같은 레포 안에서 한 칸 아래로"
          aria-label="한 칸 아래로"
        >
          ↓
        </button>
        <button
          type="button"
          class="mon2-rowops__remove"
          data-bead-id=${item.id}
          title="대기에서 빼기"
          aria-label="대기에서 빼기"
        >
          ✕
        </button>
      </span>
      ${depPanel(item.id)}
    </div>`;
  }

  /**
   * The 병렬 영역 (§4.1): 모든 visible 레포의 병렬 큐를 한 목록으로. 섹션
   * 헤더가 없으므로 레포 자동/수동 상태는 레포 배지 툴팁이 말한다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function parallelArea() {
    const collapsed = areaCollapsed('parallel');
    return html`<section
      class="mon2-area mon2-parallel${collapsed ? ' is-collapsed' : ''}"
      data-area="parallel"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="parallel"
          aria-expanded=${collapsed ? 'false' : 'true'}
          aria-label=${`병렬 영역 ${collapsed ? '펼치기' : '접기'}`}
        >
          ${collapsed ? '▸' : '▾'}
        </button>
        <span class="mon2-area__name">병렬 영역</span>
        <span class="mon2-area__count">${lanes.parallel_rows.length}</span>
      </header>
      ${collapsed
        ? ''
        : html`<div class="mon2-area__body" data-drop="parallel">
            ${lanes.parallel_rows.length === 0
              ? html`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`
              : lanes.parallel_rows.map((item, index) =>
                  parallelRow(item, index)
                )}
          </div>`}
    </section>`;
  }

  /**
   * One 연결 레인 row (UI-j92s §5.2): 순번 · 레포 배지 · ID · 제목 한 줄 · 위치
   * 칩 · 행 `✕`. route 칩·겹침 칩·`← 선행` 칩은 여기 없다 — 레인 순서가 곧
   * 의존이므로 같은 사실을 두 번 말하지 않는다.
   *
   * 고정 행도 `✕`는 갖는다 (§5.3): 뺄 수는 있고, 그 앞에 넣을 수만 없다.
   *
   * @param {MonitorChainLane} lane
   * @param {MonitorChainLaneRow} row
   * @param {number} row_index
   * @returns {import('lit-html').TemplateResult}
   */
  function chainRow(lane, row, row_index) {
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
      <span class="mon2-crow__where"
        >${row.location_label === '실행중'
          ? `● ${row.location_label}`
          : row.location_label}</span
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
   * One 연결 레인 pane (UI-j92s §5.1). 헤더 오른쪽이 레인의 생애를 말한다:
   * draft는 `확정`이 dep·큐를 한 번에 내고, confirmed는 `✕`가 그 dep를 함께
   * 거둔다. `재적용`은 어긋남이 있을 때만 선다 — 고칠 것이 없는데 고치는 버튼은
   * 사용자를 헷갈리게 한다.
   *
   * @param {MonitorChainLane} lane
   * @returns {import('lit-html').TemplateResult}
   */
  function chainLanePane(lane) {
    const enabled = lanes.cross_lanes_revision !== null;
    return html`<div class="mon2-clane" data-lane-id=${lane.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${lane.label}</span>
        <span class="mon2-clane__count">${lane.rows.length}</span>
        <span
          class="mon2-clane__badge mon2-clane__badge--${lane.draft
            ? 'draft'
            : 'confirmed'}"
          >${lane.draft ? 'draft' : '확정'}</span
        >
        ${lane.all_done
          ? html`<span class="mon2-clane__badge mon2-clane__badge--done"
              >모두 완료</span
            >`
          : ''}
        ${lane.draft
          ? html`<button
              type="button"
              class="mon2-clane__confirm"
              data-lane-id=${lane.lane_id}
              ?disabled=${!enabled || !lane.can_confirm}
              title=${lane.can_confirm
                ? '인접 의존을 걸고 미적재 멤버를 각자 레포 병렬 큐 끝에 올립니다'
                : '멤버가 2개 이상이어야 확정할 수 있습니다'}
            >
              확정
            </button>`
          : lane.has_mismatch
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
          : lane.rows.map((row, index) => chainRow(lane, row, index))}
      </div>
    </div>`;
  }

  /**
   * One 레포 직렬 레인 row (§4.2) — Worker 탭이 소유하는 s1..s5의 투영.
   *
   * @param {MonitorSerialSublane} lane
   * @param {MonitorItem} item
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
      ${miniRow(withOverlaps(item))}
      <span class="mon2-rowops">
        <button
          type="button"
          class="mon-dep__btn"
          data-bead-id=${item.id}
          title="의존성"
          aria-label="의존성"
        >
          ⛓
        </button>
      </span>
      ${depPanel(item.id)}
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
   * One 레포 직렬 레인 pane (§4.2). 비어 있는 레인은 한 줄 힌트로 접히고
   * 드래그 중에만 드롭 타깃으로 펼쳐진다 (표시는 CSS 소유).
   *
   * @param {MonitorQueueGroup} group
   * @param {MonitorSerialSublane} lane
   * @returns {import('lit-html').TemplateResult}
   */
  function serialLanePane(group, lane) {
    return html`<div
      class="mon2-lane${lane.empty ? ' mon2-lane--empty' : ''}"
      data-root-dir=${group.root_dir}
      data-lane-length=${String(lane.raw_length)}
    >
      ${paneTemplate({
        id: '',
        lane: /** @type {any} */ (lane.id),
        title: `${group.name} · 직렬 ${lane.index + 1}`,
        items: lane.items,
        empty: '비어 있음 — 드래그로 배치',
        body: html`<div
          class="mon2-lane__rows"
          data-drop="repo-serial"
          data-root-dir=${group.root_dir}
          data-lane-id=${lane.id}
          data-lane-length=${String(lane.raw_length)}
        >
          ${lane.occupants.map((occupant) => occupantRow(occupant))}
          ${lane.items.length > 0
            ? lane.items.map((item, index) => serialRow(lane, item, index))
            : lane.occupants.length > 0
              ? ''
              : html`<div class="worker-pane__empty">
                  비어 있음 — 드래그로 배치
                </div>`}
        </div>`,
        header_control: html`<span
            class="mon2-lane__badge${lane.occupants.length > 0
              ? ' mon2-lane__badge--held'
              : ''}"
            title=${lane.occupants.length > 0
              ? lane.occupants
                  .map((occupant) => `${occupant.id} — ${occupant.badge}`)
                  .join('\n')
              : ''}
            >${occupancyLabel(lane.occupants)}</span
          ><button
            type="button"
            class="mon2-sec__worker"
            data-root-dir=${group.root_dir}
            title="이 레포의 Worker 탭으로 이동"
          >
            Worker ↗
          </button>`
      })}
      ${lane.empty
        ? html`<div class="mon2-lane__hint">
            ${group.name} 직렬 ${lane.index + 1} 비어 있음
          </div>`
        : ''}
      ${lane.cycle
        ? html`<div class="mon2-lane__cycle">
            ⛔ 의존 사이클 — 자동 교정 불가
          </div>`
        : ''}
      ${(lane.cross_wait_peers || []).map(
        (peer) =>
          html`<div class="mon2-lane__cross-wait">
            ⚠ 상호 정지 — ${peer.workspace_name}·${peer.lane}과 교차 대기
          </div>`
      )}
    </div>`;
  }

  /**
   * The 직렬 영역 (§4.2): 연결 레인(레포 무관)과 레포 직렬 레인을 **이름**
   * 으로 구분해 함께 둔다. 레인 수 조절은 Worker 탭이 소유한다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function serialArea() {
    const collapsed = areaCollapsed('serial');
    const enabled = lanes.cross_lanes_revision !== null;
    const has_blank_lane = lanes.chain_lanes.some(
      (lane) => lane.draft && lane.rows.length === 0
    );
    return html`<section
      class="mon2-area mon2-serial${collapsed ? ' is-collapsed' : ''}"
      data-area="serial"
    >
      <header class="mon2-area__hd">
        <button
          type="button"
          class="mon2-area__toggle"
          data-area="serial"
          aria-expanded=${collapsed ? 'false' : 'true'}
          aria-label=${`직렬 영역 ${collapsed ? '펼치기' : '접기'}`}
        >
          ${collapsed ? '▸' : '▾'}
        </button>
        <span class="mon2-area__name">직렬 영역</span>
        <button
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
        </button>
      </header>
      ${collapsed
        ? ''
        : html`<div class="mon2-area__body">
            ${lanes.cross_lanes_unreadable
              ? html`<div class="mon2-clane__unreadable">
                  연결 레인 저장소를 읽을 수 없음
                </div>`
              : ''}
            ${lanes.chain_lanes.map((lane) => chainLanePane(lane))}
            ${lanes.queue_groups.map((group) =>
              group.sublanes.serial.map((lane) => serialLanePane(group, lane))
            )}
          </div>`}
    </section>`;
  }

  /**
   * The 대기 lane body (§4): 병렬 영역 하나 + 직렬 영역 하나. 레포 섹션은 없다 —
   * 카드가 자기 레포를 이미 알고 있으므로 레포는 좌표가 아니라 배지다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function waitBody() {
    return html`<div class="mon2-wait">${parallelArea()}${serialArea()}</div>`;
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
                status: /** @type {any} */ (item.status),
                status_label: item.run_state === 'failed' ? '실패' : undefined,
                resume_eligible: item.can_resume !== false,
                can_pause: item.can_pause !== false,
                exec_chips: item.exec_chips || null,
                usage: item.usage || null,
                discard: item.discard
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
    /** @type {Record<string, MonitorItem[]>} */
    const by_lane = {
      runnable: lanes.runnable,
      queue: lanes.queue,
      running: lanes.running,
      pr_wait: lanes.pr_wait,
      done: lanes.done
    };
    return html`<div class="mon2-deck"></div>
      <div class="worker-lanes mon2-lanes">
        ${MONITOR_LANES.map((meta) => {
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
                ? lanes.queue_groups.length > 0 ||
                  lanes.chain_lanes.length > 0 ||
                  lanes.parallel_rows.length > 0
                  ? waitBody()
                  : undefined
                : meta.lane === 'running'
                  ? runningBody(now)
                  : items.length > 0
                    ? html`${items.map((item) => miniRow(item))}`
                    : undefined;
          return paneTemplate({
            id: `monitor-${meta.lane}`,
            lane: meta.pane,
            title:
              meta.lane === 'done' ? `완료·${doneRangeLabel()}` : meta.title,
            items,
            empty: meta.empty,
            body,
            live: meta.lane === 'running' && items.length > 0,
            controls:
              meta.lane === 'runnable' ? candidateFilterStrip() : undefined,
            header_control: laneHeaderControl(meta.lane, items.length)
          });
        })}
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
   * @returns {MonitorLanes}
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
      console_el.querySelectorAll('.mon2-parallel .worker-mini__repo')
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
   * @returns {{ item: MonitorItem|null, root_dir: string, revision: number }}
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
   * @param {unknown} error
   * @returns {string}
   */
  function mutationErrorMessage(error) {
    if (typeof error === 'string' && error.length > 0) {
      return error;
    }
    if (error && typeof error === 'object') {
      const value = /** @type {Record<string, any>} */ (error);
      if (typeof value.message === 'string' && value.message.length > 0) {
        return value.message;
      }
      if (typeof value.error === 'string' && value.error.length > 0) {
        return value.error;
      }
      if (
        value.error &&
        typeof value.error === 'object' &&
        typeof value.error.message === 'string'
      ) {
        return value.error.message;
      }
    }
    return '요청에 실패했습니다';
  }

  /**
   * One dependency edit from the 의존성 패널 (§6.1) — 의존을 바꾸는 유일한 길이다.
   * 낙관적 투영은 없다 (UI-2gi1 §6.5·§7): 거부 사유는 서버 문장 그대로 토스트로
   * 보이고, 다음 스냅샷이 실제 그래프를 그린다. `root_dir`은 언제나
   * blockee(`a`)의 레포다 — 서버가 그 root에서 `bd dep add/remove a b`를 돌린다.
   * 패널은 열린 채 남고 다음 스냅샷이 현재 의존 줄을 갱신한다.
   *
   * @param {'dep-add'|'dep-remove'} type
   * @param {string} a - blockee.
   * @param {string} b - blocker.
   */
  async function sendDepOp(type, a, b) {
    const root_dir = lanes.owner_of[a];
    if (typeof root_dir !== 'string' || root_dir.length === 0) {
      showToast(`${a}의 레포를 알 수 없어 의존을 바꿀 수 없습니다`, 'error');
      return;
    }
    try {
      await send(type, { a, b }, root_dir);
    } catch (error) {
      showToast(mutationErrorMessage(error), 'error');
    }
    doRender();
  }

  /**
   * Whether a row that can HOLD the 의존성 패널 is drawn for this bead (§6.1):
   * 실행가능 카드·병렬 대기 행·레포 직렬 행뿐이다. 칩은 실행중·PR 대기 타일에도
   * 서므로, 그 칩의 클릭이 그릴 자리 없는 패널을 여는 일은 없어야 한다.
   *
   * @param {string} bead_id
   * @returns {boolean}
   */
  function hasDepPanelHost(bead_id) {
    if (lanes.runnable.some((item) => item.id === bead_id)) {
      return true;
    }
    if (lanes.parallel_rows.some((item) => item.id === bead_id)) {
      return true;
    }
    return lanes.queue_groups.some((group) =>
      group.sublanes.serial.some((lane) =>
        lane.items.some((item) => item.id === bead_id)
      )
    );
  }

  /**
   * Open (or close) the 의존성 패널 of ONE row (§6.1). 한 번에 하나이므로 다른
   * 행을 열면 이전 것은 닫힌다.
   *
   * @param {string} bead_id
   */
  function toggleDepPanel(bead_id) {
    if (!bead_id || !hasDepPanelHost(bead_id)) {
      return;
    }
    dep_panel =
      dep_panel && dep_panel.bead_id === bead_id
        ? null
        : { bead_id, query: '' };
    doRender();
  }

  // --- 드롭 계획 실행 (§5) ---

  /**
   * Rebuild the live blocks graph from the snapshot itself (§5.1). 연결
   * 레인의 `predecessors`는 레인 안 엣지뿐이라 사이클 검사에 모자라므로,
   * `lanes.js`가 쓰는 것과 같은 두 원천(레포별 `bead_blocked_by`, 실행가능
   * 행의 `blocked_by`)에서 같은 순서로 다시 만든다.
   *
   * @returns {Map<string, string[]>}
   */
  function blockedByMap() {
    /** @type {Map<string, string[]>} */
    const graph = new Map();
    const workspaces =
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
    /**
     * @param {unknown} value
     * @returns {string[]}
     */
    const idsOf = (value) =>
      Array.isArray(value)
        ? value.filter(
            (/** @type {unknown} */ id) =>
              typeof id === 'string' && id.length > 0
          )
        : [];
    for (const workspace of Array.isArray(workspaces) ? workspaces : []) {
      if (!workspace || typeof workspace !== 'object') {
        continue;
      }
      const declared =
        workspace.bead_blocked_by &&
        typeof workspace.bead_blocked_by === 'object'
          ? workspace.bead_blocked_by
          : {};
      for (const [bead_id, blockers] of Object.entries(declared)) {
        if (Array.isArray(blockers)) {
          graph.set(bead_id, idsOf(blockers));
        }
      }
      // 실행가능 행과 세션 진행 행은 자기 blocker를 스스로 들고 온다
      // (UI-yrzu §5) — 연결 레인이 그 버드를 그리면 드롭 계획도 같은 그래프를
      // 봐야 한다.
      for (const entry of [
        ...(Array.isArray(workspace.runnable) ? workspace.runnable : []),
        ...(Array.isArray(workspace.session_active)
          ? workspace.session_active
          : [])
      ]) {
        if (
          entry &&
          typeof entry.bead_id === 'string' &&
          Array.isArray(entry.blocked_by) &&
          entry.blocked_by.length > 0
        ) {
          graph.set(entry.bead_id, idsOf(entry.blocked_by));
        }
      }
    }
    return graph;
  }

  /**
   * The live blocks graph with this run's already-applied dep ops folded in
   * (§5.5). 재계획은 아직 도착하지 않은 스냅샷 대신 이 그래프 위에서 세운다 —
   * 그래야 이미 보낸 `dep-remove`가 "이미 없음"으로 반영되어 같은 op를 두 번
   * 보내지 않는다.
   *
   * @returns {Map<string, string[]>}
   */
  function blockedByMapWithDelta() {
    const graph = blockedByMap();
    for (const op of dep_delta) {
      const blockers = (graph.get(op.a) || []).slice();
      if (op.type === 'dep-remove') {
        graph.set(
          op.a,
          blockers.filter((id) => id !== op.b)
        );
      } else if (!blockers.includes(op.b)) {
        graph.set(op.a, [...blockers, op.b]);
      }
    }
    return graph;
  }

  /**
   * `planDrop`/`planLane*`이 받는 모델 (§5.1·§5.4). 투영이 내보내는 평면 객체를
   * Map으로 바꾸고, 레인 멤버십·고정 행·적재 여부는 저장 레인 투영에서 읽는다.
   *
   * @param {MonitorLanes} [source] - 계획을 세울 투영. 기본은 지금 그려진 화면이고,
   * 충돌 재계획은 최신 `cross_lanes`로 다시 투영한 모델을 넘긴다 (§5.5).
   * @returns {DropModel}
   */
  function dropModel(source = lanes) {
    /** @type {Map<string, import('./drop-plan.js').LaneState>} */
    const cross_lanes = new Map();
    /** @type {Map<string, string>} */
    const owner_lane_of = new Map();
    /** @type {Set<string>} */
    const fixed_members = new Set();
    /** @type {Set<string>} */
    const placed_members = new Set();
    for (const lane of source.chain_lanes) {
      cross_lanes.set(lane.lane_id, {
        status: lane.status,
        entries: lane.rows.map((row) => ({
          bead_id: row.id,
          root_dir: row.root_dir
        }))
      });
      for (const row of lane.rows) {
        owner_lane_of.set(row.id, lane.lane_id);
        if (row.fixed) {
          fixed_members.add(row.id);
        }
        if (!row.unplaced) {
          placed_members.add(row.id);
        }
      }
    }
    /** @type {Map<string, number>} */
    const queue_index_of = new Map();
    for (const row of source.parallel_rows) {
      if (typeof row.queue_index === 'number') {
        queue_index_of.set(row.id, row.queue_index);
      }
    }
    for (const group of source.queue_groups) {
      for (const lane of group.sublanes.serial) {
        for (const item of lane.items) {
          if (typeof item.queue_index === 'number') {
            queue_index_of.set(item.id, item.queue_index);
          }
        }
      }
    }
    return {
      blocked_by_map: blockedByMapWithDelta(),
      owner_of: new Map(Object.entries(source.owner_of)),
      cross_lanes,
      owner_lane_of,
      fixed_members,
      placed_members,
      parallel_rows: source.parallel_rows.map((row) => ({
        bead_id: row.id,
        root_dir: row.root_dir,
        queue_index: row.queue_index ?? 0
      })),
      parallel_raw_length: new Map(Object.entries(source.parallel_raw_length)),
      queue_index_of
    };
  }

  /**
   * The CAS revision a queue op travels with (§5.1): 그 항목을 소유한 레포
   * 큐의 것.
   *
   * @param {string} root_dir
   * @param {string} bead_id
   * @returns {number}
   */
  function revisionOfRoot(root_dir, bead_id) {
    const item = item_by_bead.get(bead_id);
    if (item && item.root_dir === root_dir) {
      return item.expected_revision;
    }
    const group = lanes.queue_groups.find(
      (entry) => entry.root_dir === root_dir
    );
    return group ? group.revision : 0;
  }

  /**
   * Send one planned op. 큐 op만 CAS를 쓴다 (§5.4).
   *
   * @param {Op} op
   * @param {string} bead_id
   * @param {Map<string, number>} revisions - root_dir → 이 계획에서 이어 쓸 CAS
   * revision (§5.5). 같은 레포 큐 op가 한 계획에 여럿이면 앞 응답의 revision이
   * 다음 op의 `expected_revision`이 되어야 순서가 뒤집히지 않는다.
   * @returns {Promise<boolean>} 계획의 남은 단계를 이어도 되면 true.
   */
  async function sendOp(op, bead_id, revisions) {
    try {
      if (
        op.type === 'worker-queue-place' ||
        op.type === 'worker-queue-reorder' ||
        op.type === 'worker-queue-remove'
      ) {
        const res = await sendCas(
          op.type,
          op.payload,
          op.root_dir,
          revisions.get(op.root_dir) ?? revisionOfRoot(op.root_dir, bead_id)
        );
        // 전송 래퍼는 큐 op 오류를 `[]`로 삼키므로 (`app/main.js`), 응답 모양을
        // 직접 본다. 실패를 성공으로 넘기면 뒤 op만 적용된 부분 상태가 남고
        // §5.5의 "실패하면 남은 op를 보내지 않는다"가 무너진다.
        if (!res || typeof res.applied !== 'boolean') {
          showToast('큐 요청이 실패했습니다', 'error');
          return false;
        }
        if (res.queue && typeof res.queue.revision === 'number') {
          revisions.set(op.root_dir, res.queue.revision);
        }
        if (res.conflict) {
          showToast('큐가 바뀌었습니다 — 다시 시도해 주세요', 'error');
          return false;
        }
        // 입장 거부는 CAS 충돌이 아니라 `applied:false`로 온다 (§7) — 조용히
        // 성공으로 넘기면 앞선 의존 op만 남은 상태가 설명 없이 보인다.
        if (res.applied === false) {
          showToast(
            res.admission_reason
              ? `큐 적재 거부: ${res.admission_reason}`
              : '큐 요청이 적용되지 않았습니다',
            'error'
          );
          return false;
        }
        return true;
      }
      if (op.type === 'dep-add' || op.type === 'dep-remove') {
        await send(op.type, { a: op.a, b: op.b }, op.root_dir);
      }
      return true;
    } catch (error) {
      showToast(mutationErrorMessage(error), 'error');
      return false;
    }
  }

  /**
   * Remember a dep op this run already applied (§5.5) — 재계획의 그래프가
   * 서버의 현재 상태를 따라가야 같은 op를 두 번 보내지 않는다.
   *
   * @param {Op} op
   */
  function rememberDep(op) {
    if (op.type === 'dep-add' || op.type === 'dep-remove') {
      dep_delta = [...dep_delta, { type: op.type, a: op.a, b: op.b }];
    }
  }

  /**
   * One 레인 op (§4.3). CAS는 뷰가 소유한다 — 계획은 revision을 모르는 순수 값
   * 이어야 충돌 뒤 최신 레인 위에서 그대로 다시 세울 수 있기 때문이다 (§5.5).
   *
   * @param {LaneOp} op
   * @param {number} expected_revision
   * @returns {Promise<{ ok: true, revision: number }|{ ok: false, conflict?: { revision: number, lanes: Array<Record<string, any>> } }>}
   */
  async function sendLaneOp(op, expected_revision) {
    if (!transport) {
      return { ok: false };
    }
    try {
      const res = await transport(op.type, {
        ...op.payload,
        expected_revision
      });
      if (!res || typeof res.revision !== 'number') {
        showToast('연결 레인 응답에 revision이 없습니다', 'error');
        return { ok: false };
      }
      return { ok: true, revision: res.revision };
    } catch (error) {
      const value = /** @type {any} */ (error);
      const fresh =
        value && value.code === 'conflict' ? value.details?.cross_lanes : null;
      if (
        fresh &&
        typeof fresh.revision === 'number' &&
        Array.isArray(fresh.lanes)
      ) {
        return { ok: false, conflict: fresh };
      }
      showToast(mutationErrorMessage(error), 'error');
      return { ok: false };
    }
  }

  /**
   * Send ONE plan in the §5.5 order: `dep-remove` → 레인 op → `dep-add` → 큐 op.
   * 트랜잭션이 없으므로 하나라도 실패하면 즉시 멈추고 남은 op는 보내지 않는다 —
   * 레인 op 뒤의 실패는 다음 스냅샷의 어긋남 칩으로 드러나고 `재적용`이 복구
   * 경로다.
   *
   * @param {{ lane_ops: LaneOp[], ops: Op[], lane_op_index: number }} plan
   * @param {number|null} revision - 레인 op의 첫 CAS 값. `null`이면 레인 op를
   * 보낼 수 없다 (구서버·저장소 읽기 실패, §7).
   * @param {string} bead_id
   * @returns {Promise<{ done: true }|{ done: false, conflict: { revision: number, lanes: Array<Record<string, any>> } }>}
   */
  async function sendPlan(plan, revision, bead_id) {
    /** @type {Map<string, number>} */
    const revisions = new Map();
    const before_lane = plan.ops.slice(0, plan.lane_op_index);
    const after_lane = plan.ops.slice(plan.lane_op_index);
    for (const op of before_lane) {
      if (!(await sendOp(op, bead_id, revisions))) {
        return { done: true };
      }
      rememberDep(op);
    }
    let next_revision = revision;
    for (const op of plan.lane_ops) {
      if (next_revision === null) {
        showToast('연결 레인 저장소를 읽을 수 없습니다', 'error');
        return { done: true };
      }
      const res = await sendLaneOp(op, next_revision);
      if (!res.ok) {
        return res.conflict
          ? { done: false, conflict: res.conflict }
          : { done: true };
      }
      next_revision = res.revision;
    }
    for (const op of after_lane) {
      if (!(await sendOp(op, bead_id, revisions))) {
        return { done: true };
      }
      rememberDep(op);
    }
    return { done: true };
  }

  /**
   * Plan and send ONE user action (§5.5). 레인 op가 `conflict`면 응답이 실어 온
   * 최신 `cross_lanes`로 **계획 전체를 다시 세우고** — 고정 행·타 레인 소속·사이클
   * 검사와 dep·큐 op까지 재계산 — 1회만 재시도한다. 옛 entries 기준의 계획을 새
   * revision으로 그대로 재전송하는 일은 없다.
   *
   * @param {(model: DropModel) => DropPlan} planner
   * @param {string} bead_id - 큐 op의 CAS revision을 찾는 좌표.
   */
  async function runPlanned(planner, bead_id) {
    dep_delta = [];
    let source = lanes;
    for (let attempt = 0; ; attempt += 1) {
      const plan = planner(dropModel(source));
      if ('refused' in plan) {
        showToast(plan.refused, 'error');
        break;
      }
      const result = await sendPlan(plan, source.cross_lanes_revision, bead_id);
      if (result.done) {
        break;
      }
      if (attempt >= 1) {
        showToast('레인이 다른 곳에서 바뀌었습니다', 'error');
        break;
      }
      source = projectLanes(result.conflict);
    }
    dep_delta = [];
    doRender();
  }

  /**
   * Plan ONE drop and send it (§5.4·§5.5).
   *
   * @param {DropDrag} drag
   * @param {DropTarget} target
   */
  async function applyDrop(drag, target) {
    await runPlanned((model) => planDrop(drag, target, model), drag.bead_id);
  }

  /**
   * The lane pane's four buttons (§5.1·§5.2). 계획은 전부 `drop-plan`이 소유하고
   * 여기서는 어느 계획인지와 확인 한 번만 고른다.
   *
   * @param {'confirm'|'reapply'|'remove'|'create'} kind
   * @param {string} lane_id
   */
  async function runLaneAction(kind, lane_id) {
    if (kind === 'create') {
      await runPlanned((model) => planLaneCreate(null, model), '');
      return;
    }
    if (kind === 'remove') {
      const lane = lanes.chain_lanes.find((entry) => entry.lane_id === lane_id);
      // draft는 만든 dep가 없으므로 되돌릴 것도 없다 — 확인 없이 즉시 (§5.1).
      if (lane && !lane.draft) {
        const removable = lane.rows.filter((row, index) => {
          if (index === 0) {
            return false;
          }
          return !row.mismatch;
        }).length;
        if (!confirmFn(`의존 ${removable}개를 함께 제거합니다`)) {
          return;
        }
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

  // --- 네이티브 HTML5 드래그 (§5). 원천도 대상도 네 종류이고, 좌표는 DOM 속성이
  // 아니라 투영 모델에서 나온다 — 실행중으로 빠졌거나 연결 레인에 숨은 버드는
  // DOM에 없다. 계획은 `planDrop`이 소유하고 여기서는 원천/대상만 읽는다. ---

  /** @type {DropDrag|null} */
  let dragging = null;
  /** 드롭의 마우스업이 그대로 click으로 이어져 카드를 열어 버리는 것을 막는다. */
  let suppress_open_click = false;
  /** @type {any} */
  let suppress_timer = null;

  function expireDragSuppressSoon() {
    if (suppress_timer !== null) {
      clearTimeout(suppress_timer);
    }
    suppress_timer = setTimeout(() => {
      suppress_timer = null;
      suppress_open_click = false;
    }, 0);
  }

  /**
   * Where the drop marker sits: 지금 **보이는** 그 영역/레인 행 기준
   * 0..rows.length.
   *
   * @param {HTMLElement} zone
   * @param {HTMLElement|null} node
   * @returns {number}
   */
  function markerIndexIn(zone, node) {
    const row =
      node && typeof node.closest === 'function'
        ? /** @type {HTMLElement|null} */ (node.closest('[data-row-index]'))
        : null;
    if (row && zone.contains(row)) {
      const index = Number(row.getAttribute('data-row-index'));
      return Number.isFinite(index) ? index : 0;
    }
    return zone.querySelectorAll('[data-row-index]').length;
  }

  /**
   * The zone a drop may actually land on. 레포 직렬 레인만 `root_dir` 일치를
   * 요구한다 (§4.2) — 다른 레포 카드에는 드롭 표시조차 뜨지 않는다.
   *
   * @param {Event} ev
   * @returns {{ zone: HTMLElement, target: DropTarget }|null}
   */
  function dropTarget(ev) {
    const node = /** @type {HTMLElement|null} */ (ev.target);
    const zone =
      typeof node?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (node.closest('[data-drop]'))
        : null;
    if (!zone || !dragging) {
      return null;
    }
    const kind = zone.getAttribute('data-drop');
    if (kind === 'candidate') {
      return { zone, target: { kind: 'candidate' } };
    }
    if (kind === 'parallel') {
      return {
        zone,
        target: { kind: 'parallel', marker_index: markerIndexIn(zone, node) }
      };
    }
    if (kind === 'chain') {
      return {
        zone,
        target: {
          kind: 'chain',
          lane_id: zone.getAttribute('data-lane-id') || '',
          marker_index: markerIndexIn(zone, node)
        }
      };
    }
    if (kind === 'repo-serial') {
      const root_dir = zone.getAttribute('data-root-dir') || '';
      if (root_dir !== dragging.root_dir) {
        return null;
      }
      const row =
        typeof node?.closest === 'function'
          ? /** @type {HTMLElement|null} */ (node.closest('[data-queue-index]'))
          : null;
      const raw =
        row && zone.contains(row)
          ? row.getAttribute('data-queue-index')
          : zone.getAttribute('data-lane-length');
      const index = Number(raw);
      return {
        zone,
        target: {
          kind: 'repo-serial',
          root_dir,
          lane_id: /** @type {any} */ (zone.getAttribute('data-lane-id') || ''),
          index: Number.isFinite(index) ? index : 0
        }
      };
    }
    return null;
  }

  function clearDragOver() {
    for (const el of Array.from(console_el.querySelectorAll('.is-drop-over'))) {
      el.classList.remove('is-drop-over');
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const handle =
      typeof target?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (
            target.closest('[draggable="true"][data-bead-id]')
          )
        : null;
    const holder = handle
      ? /** @type {HTMLElement|null} */ (handle.closest('[data-drag-kind]'))
      : null;
    if (!holder) {
      return;
    }
    const bead_id = holder.getAttribute('data-bead-id') || '';
    const kind = holder.getAttribute('data-drag-kind') || '';
    const root_dir = holder.getAttribute('data-root-dir') || '';
    if (!bead_id || !kind || !root_dir) {
      return;
    }
    const raw_index = holder.getAttribute('data-queue-index') || '';
    const queue_index = Number(raw_index);
    const lane_id = holder.getAttribute('data-lane-id') || '';
    dragging = {
      kind: /** @type {any} */ (kind),
      bead_id,
      root_dir,
      ...(raw_index !== '' && Number.isFinite(queue_index)
        ? { queue_index }
        : {}),
      ...(lane_id ? { lane_id } : {})
    };
    suppress_open_click = true;
    place_menu_bead = null;
    console_el.classList.add('is-dragging');
    try {
      ev.dataTransfer?.setData('text/plain', bead_id);
      if (ev.dataTransfer) {
        ev.dataTransfer.effectAllowed = 'move';
      }
    } catch {
      /* ignore — 드래그 자체는 상태만으로도 성립한다 */
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragOver(ev) {
    const target = dropTarget(ev);
    if (!target) {
      return;
    }
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    target.zone.classList.add('is-drop-over');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragLeave(ev) {
    const node = /** @type {HTMLElement|null} */ (ev.target);
    if (typeof node?.closest === 'function') {
      node.closest('[data-drop]')?.classList.remove('is-drop-over');
    }
  }

  function onDragEnd() {
    dragging = null;
    clearDragOver();
    console_el.classList.remove('is-dragging');
    expireDragSuppressSoon();
  }

  /**
   * @param {DragEvent} ev
   */
  function onDrop(ev) {
    const target = dropTarget(ev);
    const drag = dragging;
    dragging = null;
    clearDragOver();
    console_el.classList.remove('is-dragging');
    if (!target || !drag) {
      return;
    }
    ev.preventDefault();
    void applyDrop(drag, target.target);
  }

  // --- 클릭 위임 ---

  /**
   * @param {MonitorItem} item
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
    if (cls.contains('mon2-rowops__up') || cls.contains('mon2-rowops__down')) {
      void nudgeParallelRow(bead_id, cls.contains('mon2-rowops__up') ? -1 : 1);
      return;
    }
    if (cls.contains('mon2-rowops__remove')) {
      void sendCas('worker-queue-remove', { bead_id }, root_dir, revision);
      return;
    }
    if (cls.contains('mon2-crow__detach')) {
      void detachChainRow(bead_id);
      return;
    }
    if (cls.contains('mon-dep__btn')) {
      toggleDepPanel(bead_id);
      return;
    }
    if (cls.contains('worker-dep__open')) {
      // 칩 클릭 = 그 행의 의존성 패널 (§6.2). 칩에는 해제 버튼이 없다 — 끊는
      // 일은 패널 안에서 확인을 거쳐야 한다.
      toggleDepPanel(bead_id);
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
    if (cls.contains('mon-deppanel__unlink')) {
      // 해제는 되돌리기 수단이 없는 조작이고 칩은 좁다 — 한 번 묻는다.
      const blockee = button.getAttribute('data-dep-a') || '';
      const blocker = button.getAttribute('data-dep-b') || '';
      if (confirmFn(`${blocker}가 ${blockee}를 막는 연결을 끊을까요?`)) {
        void sendDepOp('dep-remove', blockee, blocker);
      }
      return;
    }
    if (cls.contains('mon-deppanel__cand')) {
      const candidate_id = button.getAttribute('data-dep-cand') || '';
      if (dep_panel && candidate_id) {
        // 패널은 한 방향만 건다: 고른 후보가 이 행을 막는다 (§6.1 4번).
        void sendDepOp('dep-add', dep_panel.bead_id, candidate_id);
      }
      return;
    }
    if (cls.contains('mon-overlap__chip')) {
      const counterpart_id = button.getAttribute('data-overlap-id') || '';
      const same =
        !!open_overlap &&
        open_overlap.bead_id === bead_id &&
        open_overlap.counterpart_id === counterpart_id;
      open_overlap = same ? null : { bead_id, counterpart_id };
      doRender();
      return;
    }
    if (cls.contains('mon-overlap__place')) {
      void placeIntoSameSerialLane(
        bead_id,
        button.getAttribute('data-counterpart-id') || ''
      );
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
    if (cls.contains('rtile__dismiss')) {
      void sendCas(
        'worker-attempt-dismiss',
        { attempt_id },
        root_dir,
        revision
      );
      return;
    }
    if (cls.contains('rtile__discard')) {
      if (!confirmFn(discardConfirmationMessage(bead_id, 'unmerged'))) {
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
    const after_drag = suppress_open_click;
    suppress_open_click = false;
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

    const area_toggle = /** @type {HTMLElement|null} */ (
      target.closest('.mon2-area__toggle')
    );
    if (area_toggle) {
      ev.preventDefault();
      toggleArea(
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
        '.mon2-clane__confirm, .mon2-clane__reapply, .mon2-clane__remove'
      )
    );
    if (lane_button) {
      ev.preventDefault();
      const lane_id = lane_button.getAttribute('data-lane-id') || '';
      void runLaneAction(
        lane_button.classList.contains('mon2-clane__confirm')
          ? 'confirm'
          : lane_button.classList.contains('mon2-clane__reapply')
            ? 'reapply'
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
   * An outside click closes the 겹침 팝오버 (§5.3)와 의존성 패널 (§6.1). 각자를
   * 여는 요소는 예외다 — 여는 클릭이 그대로 닫는 클릭이 되면 아무것도 열리지
   * 않는다.
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
    if (open_overlap && !closest('.mon-overlap__popover, .mon-overlap__chip')) {
      open_overlap = null;
      changed = true;
    }
    if (
      dep_panel &&
      !closest('.mon-deppanel, .mon-dep__btn, .worker-dep__open')
    ) {
      dep_panel = null;
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
    if (ev.key !== 'Escape' || (!open_overlap && !dep_panel)) {
      return;
    }
    open_overlap = null;
    dep_panel = null;
    doRender();
  }

  /**
   * The 의존성 패널 검색창 (§6.1 3번). `change`는 blur에서만 오므로 타이핑을
   * 따라가려면 `input`이어야 한다.
   *
   * @param {Event} ev
   */
  function onInput(ev) {
    const target = /** @type {HTMLInputElement|null} */ (ev.target);
    if (
      !target ||
      typeof target.closest !== 'function' ||
      !target.closest('.mon-deppanel__search') ||
      !dep_panel
    ) {
      return;
    }
    dep_panel = { ...dep_panel, query: target.value };
    doRender();
  }

  mount_element.addEventListener('click', onClick);
  mount_element.addEventListener('change', onChange);
  mount_element.addEventListener('input', onInput);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', /** @type {any} */ (onDocumentKeyDown));
  mount_element.addEventListener('dragstart', /** @type {any} */ (onDragStart));
  mount_element.addEventListener('dragover', /** @type {any} */ (onDragOver));
  mount_element.addEventListener('dragleave', /** @type {any} */ (onDragLeave));
  mount_element.addEventListener('drop', /** @type {any} */ (onDrop));
  mount_element.addEventListener('dragend', onDragEnd);

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

  function stopSuppressTimer() {
    if (suppress_timer !== null) {
      clearTimeout(suppress_timer);
      suppress_timer = null;
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
      stopSuppressTimer();
      if (unsubscribe_pipeline) {
        unsubscribe_pipeline();
        unsubscribe_pipeline = null;
      }
      drawer.destroy();
      drawer_overlay_el.hidden = true;
      deck?.destroy();
      deck = null;
      mount_element.removeEventListener('click', onClick);
      mount_element.removeEventListener('change', onChange);
      mount_element.removeEventListener('input', onInput);
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener(
        'keydown',
        /** @type {any} */ (onDocumentKeyDown)
      );
      mount_element.removeEventListener(
        'dragstart',
        /** @type {any} */ (onDragStart)
      );
      mount_element.removeEventListener(
        'dragover',
        /** @type {any} */ (onDragOver)
      );
      mount_element.removeEventListener(
        'dragleave',
        /** @type {any} */ (onDragLeave)
      );
      mount_element.removeEventListener('drop', /** @type {any} */ (onDrop));
      mount_element.removeEventListener('dragend', onDragEnd);
      mount_element.replaceChildren();
    }
  };
}
