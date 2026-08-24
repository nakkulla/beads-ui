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
  CLOSED_RANGE_OPTIONS,
  DEFAULT_CLOSED_RANGE,
  closedRangeSince,
  isClosedRange
} from '../../data/closed-range.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import { debug } from '../../utils/logging.js';
import { requestResumeInstructions } from '../../utils/resume-instructions-dialog.js';
import { showToast } from '../../utils/toast.js';
import {
  candidateCard,
  discardCompletionMessage,
  discardConfirmationMessage,
  miniRow,
  paneTemplate,
  routeChipTemplate
} from '../worker/lanes.js';
import { runningTile } from '../worker/running-grid.js';
import { createTranscriptDrawer } from '../worker/transcript-drawer.js';
import { createRepoDeck } from './deck.js';
import { planDrop } from './drop-plan.js';
import {
  CANDIDATE_FILTER_DEFAULT,
  CANDIDATE_SORT_OPTIONS,
  SPEC_FILTER_OPTIONS,
  buildLanes
} from './lanes.js';

/**
 * @import { CandidateFilter, MonitorChainLane, MonitorChainLaneRow, MonitorItem, MonitorLanes, MonitorQueueGroup, MonitorSerialSublane } from './lanes.js'
 * @import { DropDrag, DropModel, DropTarget, Op } from './drop-plan.js'
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
      JSON.stringify({ show_blocked: filter.show_blocked, spec: filter.spec })
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
 * @returns {import('../../data/closed-range.js').ClosedRange}
 */
function loadDoneRange() {
  try {
    const raw = window.localStorage.getItem(DONE_RANGE_KEY);
    return isClosedRange(raw) ? raw : DEFAULT_CLOSED_RANGE;
  } catch {
    return DEFAULT_CLOSED_RANGE;
  }
}

/**
 * @param {import('../../data/closed-range.js').ClosedRange} range
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
 * @property {any} [sessionLogStore] - 실행중 타일의 `▤ 세션` 드로어가 읽는 라인
 * 스토어 (Worker 탭과 같은 것).
 * @property {{ gotoView: (view: 'board'|'worker'|'monitor') => void }} [router] -
 * 레포 배지·섹션 `Worker ↗` 클릭이 Worker 탭으로 넘어가는 경로.
 * @property {(type: string, payload?: unknown) => Promise<any>} [transport]
 * @property {() => string|undefined} [getWorkspacePath]
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
  const switchWorkspace = options.switchWorkspace;
  const router = options.router;
  const nowFn = options.now || (() => Date.now());
  const confirmFn =
    options.confirm ||
    ((/** @type {string} */ message) =>
      typeof globalThis.confirm !== 'function' || globalThis.confirm(message));

  /** @type {import('../../data/closed-range.js').ClosedRange} */
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
   * `+ 연결 레인`이 만든 빈 연결 레인 (§4.2). 세션 메모리다 — 빈 레인은 드롭
   * 타깃일 뿐 사실이 아니므로 localStorage에 쓰지 않는다.
   *
   * @type {Array<{ seed: string|null }>}
   */
  let pending_lanes = [];

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
    const opt = CLOSED_RANGE_OPTIONS.find((o) => o.value === done_range);
    return opt ? opt.label : '';
  }

  // lit-html은 렌더 호스트의 자식을 통째로 소유하므로, 드로어는 렌더 대상
  // 바깥(마운트 직속)에 둔다.
  const console_el = document.createElement('div');
  console_el.className = 'mon';
  mount_element.appendChild(console_el);
  const drawer_el = document.createElement('div');
  drawer_el.className = 'mon2-drawer';
  mount_element.appendChild(drawer_el);

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
   * `[대기로 ↴]`가 제시하는 대상 (§6): 병렬 영역 · 연결 레인마다 끝 · 새 연결
   * 레인 · **자기 레포의** 직렬 레인. 각 항목은 §5.2의 candidate → 대상 규칙을
   * 끝 삽입으로 실행한다.
   *
   * @param {MonitorItem} item
   * @returns {{ bead_id: string, lanes: Array<{ id: any, label: string, count: number }> }|null}
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
    return {
      bead_id: item.id,
      lanes: [
        { id: 'parallel', label: '병렬', count: item.place_index ?? 0 },
        ...lanes.chain_lanes.map((lane, index) => ({
          id: `lane:${index}`,
          label: `연결 ${index + 1} 끝에`,
          count: lane.rows.length
        })),
        { id: 'new-lane', label: '새 연결 레인', count: 0 },
        ...serial.map((lane) => ({
          id: `serial:${lane.id}`,
          label: `${group ? group.name : ''} 직렬 ${Number(lane.id.slice(1))}`,
          count: lane.length
        }))
      ]
    };
  }

  /**
   * @param {MonitorItem} item
   * @returns {import('lit-html').TemplateResult}
   */
  function candidateRow(item) {
    return itemShell(
      item,
      candidateCard(item, placeMenuFor(item), {
        exec_chips_mode: 'pinned_only'
      })
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
      ${miniRow(item)}
      <span class="mon2-rowops">
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
   * One 연결 레인 row (§4.2). 병렬 큐 멤버만 끌 수 있고, 그 밖의 노드는 자기
   * 위치를 말하는 투영이다. 사이클 레인은 순서를 주장하지 않으므로 순번을
   * 그리지 않고, 투영이 그 행을 끌 수 없게 만든다.
   *
   * @param {MonitorChainLane} lane
   * @param {MonitorChainLaneRow} row
   * @param {number} row_index
   * @returns {import('lit-html').TemplateResult}
   */
  function chainRow(lane, row, row_index) {
    return html`<div
      class="mon2-crow"
      style=${`--indent: ${row.indent}`}
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
      ${lane.cycle
        ? ''
        : html`<span class="mon2-crow__seq" aria-hidden="true"
            >${circledSeq(row.seq)}</span
          >`}
      ${row.workspace_name
        ? html`<span class="worker-mini__repo" title=${row.root_dir}
            >${row.workspace_name}</span
          >`
        : ''}
      <span class="worker-mini__id" title="클릭하면 ID 복사">${row.id}</span>
      ${routeChipTemplate(row.workflow)}
      <span class="mon2-crow__title">${row.title}</span>
      ${row.predecessors.map(
        (blocker_id) =>
          html`<span class="worker-dep worker-dep--pred"
            ><span class="worker-dep__label">← ${blocker_id}</span></span
          >`
      )}
      <span class="mon2-crow__where"
        >${row.location_label === '실행중'
          ? `● ${row.location_label}`
          : row.location_label}</span
      >
      ${row.draggable
        ? html`<button
            type="button"
            class="mon2-crow__detach"
            data-bead-id=${row.id}
            title="연결에서 빼고 앞뒤를 이어 붙입니다"
            aria-label="연결에서 빼기"
          >
            ✕
          </button>`
        : ''}
    </div>`;
  }

  /**
   * One 연결 레인 pane (§4.2). 사이클 레인은 순서를 주장하지 않는다 — 경고 한
   * 줄과 정렬 없는 노드 목록만 그린다.
   *
   * @param {MonitorChainLane} lane
   * @returns {import('lit-html').TemplateResult}
   */
  function chainLanePane(lane) {
    return html`<div class="mon2-clane" data-lane-id=${lane.lane_id}>
      <header class="mon2-clane__hd">
        <span class="mon2-clane__name">${lane.label}</span>
        <span class="mon2-clane__count">${lane.rows.length}</span>
      </header>
      <div
        class="mon2-clane__body"
        data-drop="chain"
        data-lane-id=${lane.lane_id}
      >
        ${lane.cycle
          ? html`<div class="mon2-lane__cycle">
              ⛔ 의존 사이클 — 자동 교정 불가
            </div>`
          : ''}
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
      ${miniRow(item)}
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
          ${lane.items.length > 0
            ? lane.items.map((item, index) => serialRow(lane, item, index))
            : html`<div class="worker-pane__empty">
                비어 있음 — 드래그로 배치
              </div>`}
        </div>`,
        header_control: html`<span class="mon2-lane__badge"
            >${lane.occupied_by.length > 0 ? '점유' : ''}</span
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
    const has_blank_lane = lanes.chain_lanes.some(
      (lane) => lane.pending && lane.rows.length === 0
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
          ?disabled=${has_blank_lane}
          title=${has_blank_lane
            ? '빈 연결 레인이 이미 있습니다'
            : '빈 연결 레인을 하나 만듭니다 — 새로고침하면 사라집니다'}
        >
          + 연결 레인
        </button>
      </header>
      ${collapsed
        ? ''
        : html`<div class="mon2-area__body">
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
                // 타일은 `kind`를 싣지 않고, `monitor.workflow` overlay는
                // stepper 전용으로 남는다. `updated_at`도 세션 타일만 받는다 —
                // Worker 타일에 실으면 없던 시각 메타 줄이 생긴다.
                kind: item.kind,
                ...(item.kind === 'session'
                  ? { updated_at: item.updated_at }
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
                  workflow: /** @type {any} */ (item.workflow || null),
                  last_activity: item.last_activity || null,
                  legs: /** @type {any} */ (item.legs || []),
                  dependency_chips: item.dependency_chips || null
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
        ${CLOSED_RANGE_OPTIONS.map(
          (o) =>
            html`<option value=${o.value} ?selected=${done_range === o.value}>
              ${o.label}
            </option>`
        )}
      </select>`;
    }
    return '';
  }

  function doRender() {
    const workspaces =
      pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
    const workspaces_state =
      pipelineStore && pipelineStore.getWorkspacesState
        ? pipelineStore.getWorkspacesState()
        : [];
    const now = nowFn();
    /**
     * @returns {MonitorLanes}
     */
    const project = () =>
      buildLanes(workspaces, workspaces_state, {
        done_since: closedRangeSince(done_range, now),
        running_sort,
        candidate_filter,
        candidate_sort,
        pending_lanes
      });
    lanes = project();
    // 파생 체인이 흡수한 pending 레인은 버린다 (§4.2). 가지치기가 `pending:<i>`
    // 좌표를 바꾸므로 그 자리에서 한 번 더 투영해 DOM과 배열을 맞춘다.
    if (lanes.pending_lanes_kept.length !== pending_lanes.length) {
      pending_lanes = lanes.pending_lanes_kept.map(
        (index) => pending_lanes[index]
      );
      lanes = project();
    }
    item_by_bead = new Map();
    for (const item of [
      ...lanes.runnable,
      ...lanes.queue,
      ...lanes.running,
      ...lanes.pr_wait,
      ...lanes.done
    ]) {
      if (!item_by_bead.has(item.id)) {
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
   * UI-2gi1 §6.5·§7: 의존 mutation은 낙관적 투영을 소유하지 않는다. 거부 사유는
   * 서버 문장 그대로 토스트로 보이고, 다음 스냅샷이 실제 그래프를 그린다.
   *
   * @param {'dep-add'|'dep-remove'} type
   * @param {string} bead_id
   * @param {string} blocker_id
   */
  async function mutateDependency(type, bead_id, blocker_id) {
    const { root_dir } = casOf(bead_id);
    if (!bead_id || !blocker_id || blocker_id === bead_id) {
      return;
    }
    try {
      await send(type, { a: bead_id, b: blocker_id }, root_dir);
    } catch (error) {
      showToast(mutationErrorMessage(error), 'error');
    }
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
   * `planDrop`이 받는 모델 (§5.1). 투영이 내보내는 평면 객체를 Map으로 바꾸고,
   * 레인 순서와 큐 좌표는 지금 화면에 그려진 행에서 만든다.
   *
   * @returns {DropModel}
   */
  function dropModel() {
    /** @type {Map<string, string[]>} */
    const lane_order = new Map();
    for (const lane of lanes.chain_lanes) {
      lane_order.set(
        lane.lane_id,
        lane.rows.map((row) => row.id)
      );
    }
    /** @type {Map<string, number>} */
    const queue_index_of = new Map();
    for (const row of lanes.parallel_rows) {
      if (typeof row.queue_index === 'number') {
        queue_index_of.set(row.id, row.queue_index);
      }
    }
    for (const group of lanes.queue_groups) {
      for (const lane of group.sublanes.serial) {
        for (const item of lane.items) {
          if (typeof item.queue_index === 'number') {
            queue_index_of.set(item.id, item.queue_index);
          }
        }
      }
    }
    return {
      blocked_by_map: blockedByMap(),
      owner_of: new Map(Object.entries(lanes.owner_of)),
      lane_order,
      parallel_rows: lanes.parallel_rows.map((row) => ({
        bead_id: row.id,
        root_dir: row.root_dir,
        queue_index: row.queue_index ?? 0
      })),
      parallel_raw_length: new Map(Object.entries(lanes.parallel_raw_length)),
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
   * @returns {Promise<boolean>} 계획의 남은 단계를 이어도 되면 true.
   */
  async function sendOp(op, bead_id) {
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
          revisionOfRoot(op.root_dir, bead_id)
        );
        if (res && res.conflict) {
          showToast('큐가 바뀌었습니다 — 다시 시도해 주세요', 'error');
          return false;
        }
        // 입장 거부는 CAS 충돌이 아니라 `applied:false`로 온다 (§7) — 조용히
        // 성공으로 넘기면 앞선 의존 op만 남은 상태가 설명 없이 보인다.
        if (res && res.applied === false) {
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
   * Plan ONE drop and send the resulting ops in order (§5.4·§7). 트랜잭션이
   * 없으므로 하나라도 실패하면 즉시 멈추고 남은 op는 보내지 않는다 — 다음
   * 스냅샷이 실제 상태를 그린다.
   *
   * @param {DropDrag} drag
   * @param {DropTarget} target
   */
  async function applyDrop(drag, target) {
    const plan = planDrop(drag, target, dropModel());
    if ('refused' in plan) {
      showToast(plan.refused, 'error');
      return;
    }
    // 빈 pending 레인의 첫 드롭은 의존 op를 내지 않는다 (§4.2) — 그 항목을
    // seed로 잡는 것은 뷰의 몫이다.
    if (target.kind === 'chain') {
      const lane = lanes.chain_lanes.find(
        (entry) => entry.lane_id === target.lane_id
      );
      const index =
        lane && lane.pending && lane.rows.length === 0
          ? Number(lane.lane_id.slice('pending:'.length))
          : -1;
      if (index >= 0 && pending_lanes[index]) {
        pending_lanes = pending_lanes.map((entry, i) =>
          i === index ? { seed: drag.bead_id } : entry
        );
      }
    }
    for (const op of plan.ops) {
      const ok = await sendOp(op, drag.bead_id);
      if (!ok) {
        break;
      }
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
    if (choice === 'new-lane') {
      if (!pending_lanes.some((entry) => entry.seed === null)) {
        pending_lanes = [...pending_lanes, { seed: null }];
      }
      // 렌더가 흡수된 pending 레인을 가지치면 `pending:<i>` 좌표가 움직인다 —
      // 빈 레인의 lane_id는 렌더 뒤의 투영에서만 읽는다.
      doRender();
      const blank = lanes.chain_lanes.find(
        (lane) => lane.pending && lane.rows.length === 0
      );
      if (!blank) {
        return;
      }
      await applyDrop(drag, {
        kind: 'chain',
        lane_id: blank.lane_id,
        marker_index: 0
      });
      return;
    }
    if (choice.startsWith('lane:')) {
      const lane = lanes.chain_lanes[Number(choice.slice('lane:'.length))];
      if (!lane) {
        doRender();
        return;
      }
      await applyDrop(drag, {
        kind: 'chain',
        lane_id: lane.lane_id,
        marker_index: lane.rows.length
      });
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
      if (!row || !row.draggable) {
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
    if (cls.contains('worker-dep__remove')) {
      void mutateDependency(
        'dep-remove',
        bead_id,
        button.dataset.blockerId || ''
      );
      return;
    }
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
      selected_attempt = attempt_id;
      if (attempt_id && item) {
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
    if (target.closest('dialog') || target.closest('.mon2-drawer')) {
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
      pending_lanes = [...pending_lanes, { seed: null }];
      doRender();
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
      done_range = isClosedRange(range_select.value)
        ? range_select.value
        : DEFAULT_CLOSED_RANGE;
      saveDoneRange(done_range);
      doRender();
    }
  }

  mount_element.addEventListener('click', onClick);
  mount_element.addEventListener('change', onChange);
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
      deck?.destroy();
      deck = null;
      mount_element.removeEventListener('click', onClick);
      mount_element.removeEventListener('change', onChange);
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
