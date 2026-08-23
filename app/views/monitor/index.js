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
  paneTemplate
} from '../worker/lanes.js';
import { runningTile } from '../worker/running-grid.js';
import { createTranscriptDrawer } from '../worker/transcript-drawer.js';
import { buildSerialLinkCandidates } from './blockers.js';
import { createRepoDeck } from './deck.js';
import {
  CANDIDATE_FILTER_DEFAULT,
  CANDIDATE_SORT_OPTIONS,
  SPEC_FILTER_OPTIONS,
  buildLanes
} from './lanes.js';

/**
 * @import { CandidateFilter, MonitorItem, MonitorLanes, MonitorQueueGroup, MonitorSerialSublane } from './lanes.js'
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

/** Per-repo section collapse + the chains block's own key (UI-eey2 §5·§6.4). */
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

/**
 * UI-2gi1 §6.5: 실행가능·대기 행이 공유하는 검색형 의존 엣지 선택기. 검색 필터와
 * mutation 소유권은 이 뷰에 남는다.
 *
 * @returns {import('lit-html').TemplateResult}
 */
function serialLinkControl() {
  return html`<span class="mon-link mon-popover-owner">
    <button
      type="button"
      class="mon-link__trigger"
      aria-haspopup="dialog"
      aria-expanded="false"
      title="직렬로 연결"
    >
      🔗
    </button>
    <span class="mon-link__popover mon-card-popover" role="dialog" hidden>
      <input
        type="search"
        class="mon-link__search"
        placeholder="id·제목·위치 검색"
        aria-label="직렬로 연결할 버드 검색"
        autocomplete="off"
      />
      <span class="mon-link__list"></span>
      <button type="button" class="mon-link__direct" hidden></button>
      <span class="mon-link__empty" hidden>검색 결과 없음</span>
      <span class="mon-link__error" role="alert" hidden></span>
    </span>
  </span>`;
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
   * @param {'runnable'|'queue'} section
   * @returns {boolean}
   */
  function sectionCollapsed(root_dir, section) {
    const entry = sections_state[root_dir];
    return !!(entry && entry[section] === true);
  }

  /**
   * @param {string} root_dir
   * @param {'runnable'|'queue'} section
   */
  function toggleSection(root_dir, section) {
    const entry = { ...(sections_state[root_dir] || {}) };
    entry[section] = !entry[section];
    sections_state = { ...sections_state, [root_dir]: entry };
    saveSections(sections_state);
    doRender();
  }

  // --- 템플릿 ---

  /**
   * One repo section header (§5): 접기 캐럿 · 레포명 · 건수 · `Worker ↗`, 그리고
   * 대기 섹션에는 읽기 전용 자동화 상태 점. 토글은 데크(Phase 3)가 소유한다.
   *
   * @param {{ root_dir: string, name: string, count: number, section: 'runnable'|'queue', auto?: boolean }} input
   * @returns {import('lit-html').TemplateResult}
   */
  function sectionHeader(input) {
    const collapsed = sectionCollapsed(input.root_dir, input.section);
    return html`<header class="mon2-sec__hd">
      <button
        type="button"
        class="mon2-sec__toggle"
        data-root-dir=${input.root_dir}
        data-section=${input.section}
        aria-expanded=${collapsed ? 'false' : 'true'}
        aria-label=${`${input.name} 섹션 ${collapsed ? '펼치기' : '접기'}`}
      >
        ${collapsed ? '▸' : '▾'}
      </button>
      <span class="mon2-sec__name" title=${input.root_dir}>${input.name}</span>
      <span class="mon2-sec__count">${input.count}</span>
      ${typeof input.auto === 'boolean'
        ? html`<span
            class="mon2-sec__auto${input.auto ? ' is-on' : ''}"
            title=${input.auto
              ? '자동화 켜짐 — 슬롯이 비면 다음 행이 출발'
              : '자동화 꺼짐 — 다음 행은 수동으로만 출발'}
            >${input.auto ? '● 자동' : '○ 수동'}</span
          >`
        : ''}
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
   * One 실행가능/대기 row — the Worker card plus this tab's own dependency
   * affordance (🔗).
   *
   * @param {MonitorItem} item
   * @param {import('lit-html').TemplateResult} card
   * @returns {import('lit-html').TemplateResult}
   */
  function itemShell(item, card) {
    return html`<div class="mon2-item" data-bead-id=${item.id}>
      ${card}
      <span class="mon2-item__ops">${serialLinkControl()}</span>
    </div>`;
  }

  /**
   * The lane choices `[대기로 ↴]` offers (§5): the repo's parallel queue plus
   * every configured serial lane, each appended at its own tail.
   *
   * @param {MonitorItem} item
   * @returns {{ bead_id: string, lanes: Array<{ id: any, label: string, count: number }> }|null}
   */
  function placeMenuFor(item) {
    if (place_menu_bead !== item.id) {
      return null;
    }
    return {
      bead_id: item.id,
      lanes: [
        { id: 'parallel', label: '병렬', count: item.place_index ?? 0 },
        ...(item.place_lanes || []).map((lane) => ({
          id: lane.id,
          label: lane.id,
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
   * @param {MonitorItem} item
   * @returns {import('lit-html').TemplateResult}
   */
  function waitingRow(item) {
    return itemShell(item, miniRow(item));
  }

  /**
   * The 실행가능 lane body (§5). `updated_flat`만 섹션 없이 평평하다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function runnableBody() {
    if (lanes.runnable_flat) {
      return html`<div class="mon2-flat">
        ${lanes.runnable.map((item) => candidateRow(item))}
      </div>`;
    }
    return html`${lanes.runnable_sections.map((section) => {
      const collapsed = sectionCollapsed(section.root_dir, 'runnable');
      return html`<section
        class="mon2-sec${collapsed ? ' is-collapsed' : ''}"
        data-root-dir=${section.root_dir}
        data-section="runnable"
      >
        ${sectionHeader({
          root_dir: section.root_dir,
          name: section.name,
          count: section.items.length,
          section: 'runnable'
        })}
        ${collapsed
          ? ''
          : html`<div class="mon2-sec__body" data-lane="candidate">
              ${section.items.map((item) => candidateRow(item))}
            </div>`}
      </section>`;
    })}`;
  }

  /**
   * One serial sublane pane inside a repo's 대기 section (§6). 빈 레인도 pane을
   * 그리고 CSS가 한 줄 힌트로 접는다 — 드래그 중에만 드롭 타깃으로 펼쳐진다.
   *
   * @param {MonitorSerialSublane} lane
   * @returns {import('lit-html').TemplateResult}
   */
  function serialLanePane(lane) {
    return html`<div
      class="mon2-lane${lane.empty ? ' mon2-lane--empty' : ''}"
      data-lane-length=${String(lane.raw_length)}
    >
      ${paneTemplate({
        id: '',
        lane: /** @type {any} */ (lane.id),
        title: `직렬 ${lane.index + 1}`,
        items: lane.items,
        empty: '비어 있음 — 드래그로 배치',
        body:
          lane.items.length > 0
            ? html`${lane.items.map((item) => waitingRow(item))}`
            : undefined,
        header_control: html`<span class="mon2-lane__badge"
          >${lane.occupied_by.length > 0 ? '점유' : ''}</span
        >`
      })}
      ${lane.empty
        ? html`<div class="mon2-lane__hint">
            직렬 ${lane.index + 1} 비어 있음
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
   * @param {MonitorQueueGroup} group
   * @returns {import('lit-html').TemplateResult}
   */
  function queueSection(group) {
    const collapsed = sectionCollapsed(group.root_dir, 'queue');
    const count =
      group.sublanes.parallel.length +
      group.sublanes.serial.reduce((sum, lane) => sum + lane.items.length, 0);
    return html`<section
      class="mon2-sec${collapsed ? ' is-collapsed' : ''}"
      data-root-dir=${group.root_dir}
      data-section="queue"
    >
      ${sectionHeader({
        root_dir: group.root_dir,
        name: group.name,
        count,
        section: 'queue',
        auto: group.auto_advance
      })}
      ${collapsed
        ? ''
        : html`<div class="mon2-sec__body worker-wait">
            <div
              class="mon2-lane"
              data-lane-length=${String(group.raw_queue_length)}
            >
              ${paneTemplate({
                id: '',
                lane: 'queue',
                title: '병렬',
                items: group.sublanes.parallel,
                empty: '비어 있음 — 드래그로 배치',
                body:
                  group.sublanes.parallel.length > 0
                    ? html`${group.sublanes.parallel.map((item) =>
                        waitingRow(item)
                      )}`
                    : undefined
              })}
            </div>
            ${group.sublanes.serial.map((lane) => serialLanePane(lane))}
          </div>`}
    </section>`;
  }

  /**
   * The 🔗 연결 체인 block (§6.4) — 표시 전용 투영이지 제어가 아니다.
   *
   * @returns {import('lit-html').TemplateResult|''}
   */
  function chainsBlock() {
    if (lanes.chains.length === 0) {
      return '';
    }
    const collapsed = sections_state.chains === true;
    return html`<section class="mon2-chains${collapsed ? ' is-collapsed' : ''}">
      <header class="mon2-chains__hd">
        <button
          type="button"
          class="mon2-chains__toggle"
          aria-expanded=${collapsed ? 'false' : 'true'}
          title="blocks 의존이 만든 레포 간 순서입니다 — 선행이 close되면 후속이 자기 레포 큐에서 출발합니다"
        >
          ${collapsed ? '▸' : '▾'} 🔗 연결 체인 ${lanes.chains.length} · 레포 간
          순서
        </button>
        <span class="mon2-chains__hint">blocks 의존 · 카드의 🔗로 연결</span>
      </header>
      ${collapsed
        ? ''
        : html`<div class="mon2-chains__body">
            ${lanes.chains.map(
              (chain) =>
                html`<div class="mon2-chain">
                  ${chain.cycle
                    ? html`<div class="mon2-chain__cycle">⛔ 의존 사이클</div>`
                    : ''}
                  ${chain.nodes.map(
                    (node) =>
                      html`<div
                        class="mon2-chain__node"
                        style=${`--indent: ${node.indent}`}
                        data-bead-id=${node.id}
                        data-root-dir=${node.root_dir}
                      >
                        ${node.workspace_name
                          ? html`<span class="mon2-chain__repo"
                              >${node.workspace_name}</span
                            >`
                          : ''}
                        <span class="mon2-chain__id worker-mini__id"
                          >${node.id}</span
                        >
                        <span class="mon2-chain__where"
                          >${node.location_label}</span
                        >
                      </div>`
                  )}
                </div>`
            )}
          </div>`}
    </section>`;
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
                ? lanes.queue_groups.length > 0 || lanes.chains.length > 0
                  ? html`${chainsBlock()}${lanes.queue_groups.map((group) =>
                      queueSection(group)
                    )}`
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
    lanes = buildLanes(workspaces, workspaces_state, {
      done_since: closedRangeSince(done_range, now),
      running_sort,
      candidate_filter,
      candidate_sort
    });
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
    applyFocusClasses();
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
  function dependencyErrorMessage(error) {
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
    return '연결에 실패했습니다';
  }

  /**
   * @param {HTMLElement} shell
   * @param {string} message
   */
  function showDependencyError(shell, message) {
    const trigger = /** @type {HTMLElement|null} */ (
      shell.querySelector('.mon-link__trigger')
    );
    const popover = /** @type {HTMLElement|null} */ (
      shell.querySelector('.mon-link__popover')
    );
    const error = /** @type {HTMLElement|null} */ (
      shell.querySelector('.mon-link__error')
    );
    if (!trigger || !popover || !error) {
      return;
    }
    closePopovers();
    popover.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    error.textContent = message;
    error.hidden = false;
  }

  /**
   * UI-2gi1 §6.5·§7: 의존 mutation은 낙관적 투영을 소유하지 않는다.
   *
   * @param {'dep-add'|'dep-remove'} type
   * @param {HTMLElement} shell
   * @param {string} bead_id
   * @param {string} blocker_id
   */
  async function mutateDependency(type, shell, bead_id, blocker_id) {
    const { root_dir } = casOf(bead_id);
    if (!bead_id || !blocker_id || blocker_id === bead_id) {
      return;
    }
    try {
      await send(type, { a: bead_id, b: blocker_id }, root_dir);
      closePopovers();
    } catch (error) {
      showDependencyError(shell, dependencyErrorMessage(error));
    }
  }

  // --- 팝오버 (🔗 의존 선택기) ---

  /**
   * @param {HTMLElement} popover
   */
  function clearLinkPopover(popover) {
    popover.querySelector('.mon-link__list')?.replaceChildren();
    const input = /** @type {HTMLInputElement|null} */ (
      popover.querySelector('.mon-link__search')
    );
    if (input) {
      input.value = '';
    }
    const direct = /** @type {HTMLElement|null} */ (
      popover.querySelector('.mon-link__direct')
    );
    if (direct) {
      direct.hidden = true;
      direct.dataset.targetId = '';
      direct.textContent = '';
    }
    const empty = /** @type {HTMLElement|null} */ (
      popover.querySelector('.mon-link__empty')
    );
    if (empty) {
      empty.hidden = true;
    }
    const error = /** @type {HTMLElement|null} */ (
      popover.querySelector('.mon-link__error')
    );
    if (error) {
      error.hidden = true;
      error.textContent = '';
    }
  }

  /**
   * @param {HTMLElement} popover
   * @param {string} self_id
   */
  function populateLinkCandidates(popover, self_id) {
    const list = popover.querySelector('.mon-link__list');
    if (!list) {
      return;
    }
    const fragment = document.createDocumentFragment();
    const candidates = buildSerialLinkCandidates(lanes).filter(
      (candidate) => candidate.id !== self_id
    );
    for (const candidate of candidates) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'mon-link__candidate';
      button.dataset.targetId = candidate.id;
      button.dataset.search =
        `${candidate.id} ${candidate.title} ${candidate.location}`.toLocaleLowerCase();
      const id = document.createElement('strong');
      id.textContent = candidate.id;
      const title = document.createElement('span');
      title.textContent = candidate.title;
      const location = document.createElement('small');
      location.textContent = candidate.location;
      button.append(id, title, location);
      fragment.append(button);
    }
    list.replaceChildren(fragment);
  }

  function closePopovers() {
    for (const popover of Array.from(
      console_el.querySelectorAll('.mon-card-popover')
    )) {
      const element = /** @type {HTMLElement} */ (popover);
      element.hidden = true;
      if (element.classList.contains('mon-link__popover')) {
        clearLinkPopover(element);
      }
    }
    for (const trigger of Array.from(
      console_el.querySelectorAll('[aria-haspopup][aria-expanded="true"]')
    )) {
      trigger.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * @param {HTMLElement} button
   */
  function toggleLinkPopover(button) {
    const wrapper = button.closest('.mon-link');
    const popover = /** @type {HTMLElement|null} */ (
      wrapper?.querySelector('.mon-link__popover') || null
    );
    if (!popover) {
      return;
    }
    const opens = popover.hidden;
    closePopovers();
    if (opens) {
      const shell = button.closest('.mon2-item');
      populateLinkCandidates(
        popover,
        shell?.getAttribute('data-bead-id') || ''
      );
      popover.hidden = false;
      button.setAttribute('aria-expanded', 'true');
      const input = /** @type {HTMLInputElement|null} */ (
        popover.querySelector('.mon-link__search')
      );
      if (input) {
        updateLinkSearch(input);
        input.focus();
      }
    }
  }

  /**
   * @param {HTMLInputElement} input
   */
  function updateLinkSearch(input) {
    const popover = input.closest('.mon-link__popover');
    const shell = input.closest('.mon2-item');
    if (!popover || !shell) {
      return;
    }
    const query = input.value.trim();
    const normalized = query.toLocaleLowerCase();
    let visible = 0;
    let exact = false;
    for (const candidate of Array.from(
      popover.querySelectorAll('.mon-link__candidate')
    )) {
      const button = /** @type {HTMLElement} */ (candidate);
      const target_id = button.dataset.targetId || '';
      const matches =
        normalized.length === 0 ||
        (button.dataset.search || '').includes(normalized);
      button.hidden = !matches;
      if (matches) {
        visible += 1;
      }
      if (target_id.toLocaleLowerCase() === normalized) {
        exact = true;
      }
    }
    const direct = /** @type {HTMLElement|null} */ (
      popover.querySelector('.mon-link__direct')
    );
    const self_id = shell.getAttribute('data-bead-id') || '';
    if (direct) {
      const shows_direct =
        query.length > 0 &&
        !exact &&
        normalized !== self_id.toLocaleLowerCase();
      direct.hidden = !shows_direct;
      direct.dataset.targetId = shows_direct ? query : '';
      direct.textContent = shows_direct ? `직접 입력 · ${query}` : '';
      if (shows_direct) {
        visible += 1;
      }
    }
    const empty = /** @type {HTMLElement|null} */ (
      popover.querySelector('.mon-link__empty')
    );
    if (empty) {
      empty.hidden = visible > 0;
    }
    const error = /** @type {HTMLElement|null} */ (
      popover.querySelector('.mon-link__error')
    );
    if (error) {
      error.hidden = true;
      error.textContent = '';
    }
  }

  // --- 네이티브 HTML5 드래그 (§6). Worker 탭과 같은 규약이되 인덱스는 서버 큐의
  // raw 좌표로만 센다 — 실행중으로 빠진 버드는 DOM에 없다. ---

  /**
   * @type {{ bead_id: string, lane: string, root_dir: string, revision: number, queue_index: number, place_index: number }|null}
   */
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
   * @param {Event} ev
   * @returns {HTMLElement|null}
   */
  function paneOfEvent(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    return typeof target?.closest === 'function'
      ? /** @type {HTMLElement|null} */ (
          target.closest('.worker-pane, .mon2-sec__body')
        )
      : null;
  }

  /**
   * The pane a drop may actually land on: **같은 레포**의 대기 서브레인, 또는
   * 같은 레포의 실행가능 섹션(제거). 다른 레포는 서버에 없는 개념이다.
   *
   * @param {Event} ev
   * @returns {{ pane: HTMLElement, lane: string, root_dir: string, lane_length: number }|null}
   */
  function dropTarget(ev) {
    const pane = paneOfEvent(ev);
    if (!pane || !dragging) {
      return null;
    }
    const section = pane.closest('.mon2-sec');
    const root_dir = section?.getAttribute('data-root-dir') || '';
    if (root_dir !== dragging.root_dir) {
      return null;
    }
    const lane = pane.getAttribute('data-lane') || '';
    if (lane !== 'candidate' && lane !== 'queue' && !/^s[1-5]$/.test(lane)) {
      return null;
    }
    const holder = pane.closest('.mon2-lane');
    return {
      pane,
      lane,
      root_dir,
      lane_length: Number(holder?.getAttribute('data-lane-length') || 0) || 0
    };
  }

  function clearDragOver() {
    for (const el of Array.from(
      console_el.querySelectorAll('.worker-pane--drag-over')
    )) {
      el.classList.remove('worker-pane--drag-over');
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const el =
      typeof target?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (
            target.closest(
              '.worker-mini[draggable="true"], .worker-card[draggable="true"]'
            )
          )
        : null;
    if (!el) {
      return;
    }
    const bead_id = el.getAttribute('data-bead-id') || '';
    const { item } = casOf(bead_id);
    if (!item) {
      return;
    }
    dragging = {
      bead_id,
      lane: item.lane,
      root_dir: item.root_dir,
      revision: item.expected_revision,
      queue_index: typeof item.queue_index === 'number' ? item.queue_index : -1,
      place_index: typeof item.place_index === 'number' ? item.place_index : 0
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
    target.pane.classList.add('worker-pane--drag-over');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragLeave(ev) {
    paneOfEvent(ev)?.classList.remove('worker-pane--drag-over');
  }

  function onDragEnd() {
    dragging = null;
    clearDragOver();
    console_el.classList.remove('is-dragging');
    expireDragSuppressSoon();
  }

  /**
   * Drop index math (§6) — 렌더된 행이 가리키는 **서버 큐의 raw 좌표**에서만
   * 유도한다: 행 앞이면 그 행의 `queue_index`, 레인 맨 끝이면 그 레인의 raw
   * 길이. 같은 레인 재정렬은 제거 후 삽입 보정까지 포함해 `s > k ? k : k - 1`.
   *
   * @param {DragEvent} ev
   */
  function onDrop(ev) {
    const target = dropTarget(ev);
    const drag = dragging;
    dragging = null;
    clearDragOver();
    console_el.classList.remove('is-dragging');
    if (!target || !drag || !drag.bead_id) {
      return;
    }
    ev.preventDefault();
    const node = /** @type {HTMLElement|null} */ (ev.target);
    const over =
      typeof node?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (node.closest('.mon2-item'))
        : null;
    const over_id =
      over && target.pane.contains(over)
        ? over.getAttribute('data-bead-id') || ''
        : '';
    const over_item = over_id ? item_by_bead.get(over_id) : undefined;
    const k =
      over_item && typeof over_item.queue_index === 'number'
        ? over_item.queue_index
        : NaN;

    if (target.lane === 'candidate') {
      // 실행가능 섹션으로 끌어 제거 (§6).
      if (drag.lane === 'queue' || /^s[1-5]$/.test(drag.lane)) {
        void sendCas(
          'worker-queue-remove',
          { bead_id: drag.bead_id },
          drag.root_dir,
          drag.revision
        );
      }
      return;
    }
    const target_lane = target.lane === 'queue' ? 'parallel' : target.lane;
    if (drag.lane === 'runnable') {
      const index = Number.isFinite(k) ? k : target.lane_length;
      void sendCas(
        'worker-queue-place',
        {
          bead_id: drag.bead_id,
          ...(target_lane === 'parallel' ? {} : { lane: target_lane }),
          index
        },
        drag.root_dir,
        drag.revision
      );
      return;
    }
    const from_lane = drag.lane === 'queue' ? 'parallel' : drag.lane;
    if (from_lane !== target_lane) {
      // 레인이 다르면 place가 원 레인 제거 + 삽입을 한 번에 한다.
      const index = Number.isFinite(k) ? k : target.lane_length;
      void sendCas(
        'worker-queue-place',
        {
          bead_id: drag.bead_id,
          ...(target_lane === 'parallel' ? {} : { lane: target_lane }),
          index
        },
        drag.root_dir,
        drag.revision
      );
      return;
    }
    if (over_id === drag.bead_id) {
      return;
    }
    const s = drag.queue_index;
    const to_index = Number.isFinite(k)
      ? s > k
        ? k
        : k - 1
      : target.lane_length - 1;
    if (!Number.isFinite(to_index) || to_index < 0 || to_index === s) {
      return;
    }
    void sendCas(
      'worker-queue-reorder',
      {
        bead_id: drag.bead_id,
        ...(target_lane === 'parallel' ? {} : { lane: target_lane }),
        to_index
      },
      drag.root_dir,
      drag.revision
    );
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
    if (cls.contains('mon-link__trigger')) {
      toggleLinkPopover(button);
      return;
    }
    if (
      cls.contains('mon-link__candidate') ||
      cls.contains('mon-link__direct')
    ) {
      const shell = /** @type {HTMLElement|null} */ (
        button.closest('.mon2-item')
      );
      if (shell) {
        void mutateDependency(
          'dep-add',
          shell,
          bead_id,
          button.dataset.targetId || ''
        );
      }
      return;
    }
    if (cls.contains('worker-dep__remove')) {
      const shell = /** @type {HTMLElement|null} */ (
        button.closest('.mon2-item')
      );
      if (shell) {
        void mutateDependency(
          'dep-remove',
          shell,
          bead_id,
          button.dataset.blockerId || ''
        );
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
      const lane = button.getAttribute('data-lane') || 'parallel';
      const index =
        lane === 'parallel'
          ? (item?.place_index ?? 0)
          : ((item?.place_lanes || []).find((entry) => entry.id === lane)
              ?.index ?? 0);
      place_menu_bead = null;
      void sendCas(
        'worker-queue-place',
        { bead_id, ...(lane === 'parallel' ? {} : { lane }), index },
        root_dir,
        revision
      );
      doRender();
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
        target.closest('.mon2-item, .rtile, .mon2-chain__node, .worker-mini')
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
      toggleSection(
        section_toggle.getAttribute('data-root-dir') || '',
        /** @type {'runnable'|'queue'} */ (
          section_toggle.getAttribute('data-section') || 'runnable'
        )
      );
      return;
    }

    if (target.closest('.mon2-chains__toggle')) {
      ev.preventDefault();
      sections_state = {
        ...sections_state,
        chains: sections_state.chains !== true
      };
      saveSections(sections_state);
      doRender();
      return;
    }

    const chain_node = /** @type {HTMLElement|null} */ (
      target.closest('.mon2-chain__node')
    );
    if (chain_node) {
      ev.preventDefault();
      openRow(
        chain_node.getAttribute('data-bead-id') || '',
        chain_node.getAttribute('data-root-dir') || ''
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
      target.closest('.mon2-item, .rtile, .worker-mini, .worker-card')
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
      openRow(bead_id, casOf(bead_id).root_dir);
    }
  }

  /**
   * @param {Event} ev
   */
  function onDocumentClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (
      target &&
      console_el.contains(target) &&
      typeof target.closest === 'function' &&
      target.closest('.mon-popover-owner')
    ) {
      return;
    }
    closePopovers();
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocumentKeydown(ev) {
    if (ev.key !== 'Escape') {
      return;
    }
    const trigger = /** @type {HTMLElement|null} */ (
      console_el.querySelector('[aria-haspopup][aria-expanded="true"]')
    );
    closePopovers();
    trigger?.focus();
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

  /**
   * @param {Event} ev
   */
  function onInput(ev) {
    const input = /** @type {HTMLInputElement|null} */ (ev.target);
    if (input?.classList.contains('mon-link__search')) {
      updateLinkSearch(input);
    }
  }

  mount_element.addEventListener('click', onClick);
  mount_element.addEventListener('change', onChange);
  mount_element.addEventListener('input', onInput);
  mount_element.addEventListener('dragstart', /** @type {any} */ (onDragStart));
  mount_element.addEventListener('dragover', /** @type {any} */ (onDragOver));
  mount_element.addEventListener('dragleave', /** @type {any} */ (onDragLeave));
  mount_element.addEventListener('drop', /** @type {any} */ (onDrop));
  mount_element.addEventListener('dragend', onDragEnd);
  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onDocumentKeydown);

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
            // 팝오버 입력은 사용자가 소유한 임시 상태다 — 열린 동안 시계 렌더를
            // 미룬다.
            if (console_el.querySelector('.mon-card-popover:not([hidden])')) {
              return;
            }
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
      mount_element.removeEventListener('input', onInput);
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
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onDocumentKeydown);
      mount_element.replaceChildren();
    }
  };
}
