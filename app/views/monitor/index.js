/**
 * Monitor tab (UI-qrfo) — Worker 콘솔의 **크로스 레포 상위집합**. 모든 visible
 * 레포의 워커 파이프라인을 한 화면의 다섯 레인으로 모으고, Worker 탭이 한 레포에
 * 대해 하는 조작을 여기서 레포를 바꾸지 않고 전부 한다.
 *
 * 데이터 원천은 서버의 `monitor-pipeline` 집계 구독 하나다. 무거운 배열
 * (`workspaces`)은 파이프라인이 있는 레포만 싣고, 제어 상태(`workspaces_state`)는
 * 파이프라인이 빈 레포까지 **모든** visible 레포를 싣는다 — 마스터 토글의 분모와
 * 빈 큐 레포 그룹 헤더의 CAS 제어가 그것을 요구한다 (§4).
 *
 * mutation은 전부 카드/그룹이 속한 workspace의 `root_dir`과 **그 workspace의**
 * revision을 실어 보낸다. `expected_revision`은 레포마다 다르므로, 한 레포의
 * revision을 다른 레포에 쓰면 항상 충돌한다. 충돌은 Worker 탭과 같은 규약으로
 * 1회 재시도한다 (응답이 실어 온 최신 revision으로).
 */
import { html, render } from 'lit-html';
import {
  CLOSED_RANGE_OPTIONS,
  DEFAULT_CLOSED_RANGE,
  closedRangeSince,
  isClosedRange
} from '../../data/closed-range.js';
import { resolveContinuationMismatch } from '../../utils/continuation-dialog.js';
import { debug } from '../../utils/logging.js';
import { requestResumeInstructions } from '../../utils/resume-instructions-dialog.js';
import { showToast } from '../../utils/toast.js';
import {
  discardCompletionMessage,
  discardConfirmationMessage,
  paneTemplate
} from '../worker/lanes.js';
import { buildSerialLinkCandidates } from './blockers.js';
import {
  MIN_SLOTS,
  buildLanes,
  monitorCardBody,
  monitorGroupHeaderTemplate,
  monitorTopBarTemplate
} from './lanes.js';
import { crossRepoTokenTotal, tokenTotalTooltip } from './usage.js';

/**
 * @import { MonitorItem, MonitorLanes, MonitorQueueGroup } from './lanes.js'
 */

/**
 * Persisted period range for the 완료 lane (UI-qrfo §7). Deliberately its OWN
 * localStorage key, separate from the Worker tab's `bdui.worker.done-range` —
 * the two tabs can show different periods at once. The vocabulary itself
 * (`CLOSED_RANGE_OPTIONS`/`closedRangeSince()`) is reused as-is; only the
 * persisted value is per-tab.
 *
 * @type {string}
 */
const DONE_RANGE_KEY = 'bdui.monitor.done-range';

/** Persisted sort for the 실행중 lane (UI-fmwh §4.1). */
const RUNNING_SORT_KEY = 'bdui.monitor.running_sort';

/** 모니터가 소유하는 Worker 형태의 표시 필터 (UI-2gi1 §6.2). */
export const MONITOR_CANDIDATE_FILTER_KEY = 'beads-ui.monitor.candidate-filter';

/** @typedef {{ show_blocked: boolean }} MonitorCandidateFilter */

/** @type {MonitorCandidateFilter} */
const MONITOR_CANDIDATE_FILTER_DEFAULT = { show_blocked: false };

/**
 * UI-2gi1 §6.2: 모르는 저장 축은 무시한다. 모니터는 blocked만 소유하고 Worker의
 * `spec` 필터는 읽지 않는다.
 *
 * @returns {MonitorCandidateFilter}
 */
function loadMonitorCandidateFilter() {
  try {
    const raw = window.localStorage.getItem(MONITOR_CANDIDATE_FILTER_KEY);
    if (!raw) {
      return { ...MONITOR_CANDIDATE_FILTER_DEFAULT };
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...MONITOR_CANDIDATE_FILTER_DEFAULT };
    }
    return { show_blocked: parsed.show_blocked === true };
  } catch {
    return { ...MONITOR_CANDIDATE_FILTER_DEFAULT };
  }
}

/**
 * @param {MonitorCandidateFilter} filter
 */
function saveMonitorCandidateFilter(filter) {
  try {
    window.localStorage.setItem(
      MONITOR_CANDIDATE_FILTER_KEY,
      JSON.stringify({ show_blocked: filter.show_blocked })
    );
  } catch {
    /* ignore — storage denial must not break the display toggle */
  }
}

/**
 * @template {{ blocked?: boolean }} T
 * @param {T[]} rows
 * @param {MonitorCandidateFilter} filter
 * @returns {{ visible: T[], hidden_blocked: number }}
 */
export function applyMonitorCandidateFilter(rows, filter) {
  if (filter.show_blocked) {
    return { visible: rows, hidden_blocked: 0 };
  }
  const visible = rows.filter((row) => row.blocked !== true);
  return { visible, hidden_blocked: rows.length - visible.length };
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
    /* ignore — a private-mode storage denial must not break the select */
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
    /* ignore — storage denial must not break an in-memory sort change */
  }
}

/** Client id of the monitor tab's aggregated pipeline subscription. */
export const MONITOR_PIPELINE_KEY = 'tab:monitor:pipeline';

/**
 * Live-metric redraw cadence while the tab is visible.
 *
 * Push alone is not enough here: 경과시간과 하트비트는 시계가 지나가는 것만으로
 * 값이 바뀌는데, 세션이 조용해지면 fanout도 같이 멈춘다 — 그러면 마지막
 * 이벤트가 10분 전이어도 점이 계속 "활성"으로 남아, 죽은 세션을 살아 있다고
 * 말하게 된다. 초 단위로 표시하므로 주기도 1초다.
 */
const TICK_MS = 1_000;

/**
 * @typedef {Object} MonitorViewOptions
 * @property {(id: string) => void} gotoIssue
 * @property {{ get: () => Array<Record<string, any>>|null, getWorkspacesState?: () => Array<Record<string, any>>, subscribe?: (fn: () => void) => () => void }} [pipelineStore]
 * @property {any} [execPresetStore]
 * @property {(type: string, payload?: unknown) => Promise<any>} [transport] -
 * 워커 mutation 전송 경로 (Worker 뷰와 같은 시그니처).
 * @property {() => string|undefined} [getWorkspacePath] - 이 연결이 지금 보고 있는 repo의 root.
 * @property {(root_dir: string) => Promise<unknown>} [switchWorkspace] -
 * workspace picker와 동일한 `set-workspace` 전환 경로.
 * @property {(message: string) => boolean} [confirm] - 되돌리기 어려운 명령의
 * 확인 경로 (주입 가능 — 테스트가 실제 `window.confirm`을 필요로 하지 않는다).
 * @property {() => number} [now] - Test seam for the live clock.
 */

/**
 * The five lanes in DOM order (§8). `pane` is the Worker pane vocabulary the
 * lane borrows its spine/dot colour from; 카드는 모니터 전용 템플릿이다
 * (UI-gwkl §2.2).
 *
 * DOM 순서는 생애주기 좌→우 독해 그대로 두고, 데스크톱 관제 삼단 배치
 * (좌 실행가능·대기 / 중앙 실행중 / 우 PR 대기·완료)와 모바일 스와이프 순서
 * (실행중 우선)는 CSS grid/order가 소유한다 (§2.1·§2.5) — DOM을 두 번 재배열하면
 * 탭 이동 순서가 화면마다 달라진다.
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
 * One monitor card: the monitor's own card body plus this tab's coordinates
 * (`root_dir` · CAS revision · lane · raw 큐 좌표). 좌표를 카드 껍데기에 두는
 * 이유는 조작 위임과 드래그 산식이 "이 클릭/드롭이 어느 레포의 어느 revision을
 * 향하는가"를 한 자리에서 읽을 수 있어야 하기 때문이다.
 *
 * 인덱스 두 개는 **서버 큐의 raw 좌표**다 (§2.4): 대기 레인 DOM은 실행중으로
 * 빠진 버드를 숨기지만 서버의 `queue` 배열에는 남아 있으므로, DOM 서수로 세면
 * 숨은 항목을 넘어 오배치된다.
 *
 * @param {MonitorItem} item
 * @param {number} now
 * @returns {import('lit-html').TemplateResult}
 */
function cardTemplate(item, now) {
  const draggable =
    (item.lane === 'runnable' || item.lane === 'queue') &&
    item.draggable !== false;
  return html`<div
    class="mon-card mon-card--${item.lane}${item.alert
      ? ' mon-card--alert'
      : ''}${item.blocked ? ' mon-card--blocked' : ''}"
    draggable=${draggable ? 'true' : 'false'}
    data-issue-id=${item.id}
    data-root-dir=${item.root_dir}
    data-revision=${String(item.expected_revision)}
    data-lane=${item.lane}
    data-attempt-id=${item.attempt_id || ''}
    data-place-index=${String(item.place_index ?? '')}
    data-queue-index=${String(item.queue_index ?? '')}
    data-queue-length=${String(item.queue_length ?? '')}
  >
    ${monitorCardBody(item, now)}
  </div>`;
}

/**
 * Render one waiting repo group. 직렬 레인이 설정된 새 스냅샷만 서브레인 헤더를
 * 더하고, 두 필드가 없는 구버전 스냅샷은 기존 DOM을 그대로 유지한다
 * (UI-2gi1 §5).
 *
 * @param {MonitorQueueGroup} group
 * @param {number} now
 * @returns {import('lit-html').TemplateResult}
 */
function queueGroupTemplate(group, now) {
  const uses_sublanes =
    group.serial_lane_count > 0 || group.sublanes.serial.length > 0;
  const parallel = uses_sublanes
    ? html`<section class="mon-sublane mon-sublane--parallel">
        <header class="mon-sublane__hd">
          <span class="mon-sublane__name">병렬</span>
          <span class="mon-sublane__count"
            >대기 ${group.sublanes.parallel.length}</span
          >
        </header>
        <div class="mon-group__list">
          ${group.sublanes.parallel.map((item) => cardTemplate(item, now))}
        </div>
      </section>`
    : html`<div class="mon-group__list">
        ${group.items.map((item) => cardTemplate(item, now))}
      </div>`;
  return html`<div class="mon-group" data-root-dir=${group.root_dir}>
    ${monitorGroupHeaderTemplate(group)} ${parallel}
    ${uses_sublanes
      ? group.sublanes.serial.map(
          (lane) =>
            html`<section
              class="mon-sublane mon-sublane--serial"
              data-serial-lane=${lane.id}
            >
              <header class="mon-sublane__hd">
                <span class="mon-sublane__name">${lane.id}</span>
                <span class="mon-sublane__count"
                  >대기 ${lane.items.length}</span
                >
                ${lane.occupied_by.length > 0
                  ? html`<span class="mon-sublane__held"
                      >${`● 점유 중 · ${lane.occupied_by.join(
                        ', '
                      )} (머지까지 유지)`}</span
                    >`
                  : ''}
                ${lane.corrections > 0
                  ? html`<span class="mon-sublane__corrections"
                      >순서 자동 교정 ${lane.corrections}건</span
                    >`
                  : ''}
                ${lane.cross_wait_peers?.map(
                  (peer) =>
                    html`<span class="mon-sublane__cross-wait"
                      >⚠ 상호 정지 — ${peer.workspace_name}·${peer.lane}과 교차
                      대기</span
                    >`
                )}
              </header>
              ${lane.cycle
                ? html`<div class="mon-sublane__cycle">
                    ⛔ 의존 사이클 — 자동 교정 불가
                  </div>`
                : ''}
              <div class="mon-group__list">
                ${lane.items.map((item) => cardTemplate(item, now))}
              </div>
            </section>`
        )
      : ''}
  </div>`;
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
  const nowFn = options.now || (() => Date.now());
  const confirmFn =
    options.confirm ||
    ((/** @type {string} */ message) =>
      typeof globalThis.confirm !== 'function' || globalThis.confirm(message));

  /**
   * 완료 레인 + 토큰 KPI를 함께 지배하는 기간 (§7). `bdui.monitor.done-range`에
   * 지속되며, 생성 시점에 한 번 읽는다 — Worker 탭과 같은 규약.
   *
   * @type {import('../../data/closed-range.js').ClosedRange}
   */
  let done_range = loadDoneRange();

  /** @type {'started'|'repo'} */
  let running_sort = loadRunningSort();

  /** @type {MonitorCandidateFilter} */
  let candidate_filter = loadMonitorCandidateFilter();

  /**
   * @returns {string}
   */
  function doneRangeLabel() {
    const opt = CLOSED_RANGE_OPTIONS.find((o) => o.value === done_range);
    return opt ? opt.label : '';
  }

  // lit-html은 렌더 호스트의 자식을 통째로 소유하므로, 실행 기본값 다이얼로그는
  // 렌더 대상 바깥(마운트 직속)에 둔다.
  const console_el = document.createElement('div');
  console_el.className = 'mon';
  mount_element.appendChild(console_el);

  /** @type {MonitorLanes} */
  let lanes = buildLanes(null, null);

  /**
   * mutation 응답이 실어 온 권위 있는 queue. 다음 집계 push가 오기 전까지 그
   * 레포의 화면이 읽는 값이자, CAS 재시도가 쓰는 revision이다.
   *
   * @type {Map<string, any>}
   */
  const exec_adopted = new Map();

  /** @type {null | (() => void)} */
  let unsubscribe_pipeline = null;
  /** @type {any} */
  let tick_timer = null;

  /**
   * Send one workspace-scoped mutation under the CAS discipline: 그 레포의
   * `root_dir`과 revision을 싣고, 충돌하면 응답이 실어 온 최신 revision으로
   * **1회** 재시도한다 (Worker 탭과 같은 규약).
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
   * vocabulary as the Worker tab. Durable later failures remain visible in the
   * shared operation projection and its [재시도] receipt.
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
   * Attempt 제어 중 CAS를 쓰지 않는 둘 (Worker 탭과 같다 — 서버가 attempt를
   * 직접 찾아 죽이므로 큐 revision을 전제하지 않는다).
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
   * Flip every visible repo's automation at once (`monitor-auto-toggle`, §6).
   *
   * 끄기는 확인을 받는다: `auto_merge` OFF가 그 레포의 머지 대기열을 비우므로,
   * 마스터 OFF는 그 부작용을 전 레포에 한 번에 적용한다. 켜기는 확인 없이 간다.
   *
   * @param {boolean} on
   */
  async function toggleMasterAuto(on) {
    if (!transport) {
      return;
    }
    if (
      !on &&
      !confirmFn(
        '전 레포의 자동 진행·자동 머지를 끕니다. 각 레포의 머지 대기열도 함께 비워집니다. 계속할까요?'
      )
    ) {
      return;
    }
    const res = await transport('monitor-auto-toggle', { on });
    const failed = res && Array.isArray(res.failed) ? res.failed : [];
    if (failed.length > 0) {
      showToast(
        `자동화 ${on ? '켜기' : '끄기'} 일부 실패: ${failed
          .map((/** @type {any} */ f) => f.root_dir)
          .join(', ')}`,
        'error',
        3200
      );
    }
  }

  /**
   * The PR 대기 lane header's bulk button. 한 레포씩 순차로 보낸다 —
   * `worker-merge-queue-add-all`은 workspace 단위 액션이고, revision도 레포마다
   * 다르다.
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

  // --- 네이티브 HTML5 드래그 (§2.4). 라이브러리 없음 — Worker 탭과 같은 규약. ---

  /**
   * 지금 끌고 있는 카드가 실어 온 좌표. 드롭 인덱스는 전부 여기서 나오는 raw 큐
   * 좌표로만 계산한다 (DOM 서수 금지).
   *
   * @type {{ bead_id: string, lane: string, root_dir: string, revision: number, queue_index: number, queue_length: number, place_index: number }|null}
   */
  let dragging = null;
  /**
   * 드롭의 마우스업이 그대로 click으로 이어져 카드를 열어 버리는 것을 막는 1회용
   * 플래그. 뒤따르는 click 하나가 소비하고, 그 다음 클릭부터는 정상 동작한다.
   */
  let suppress_open_click = false;
  /**
   * 플래그 만료 타이머. 브라우저 대부분은 드래그 뒤에 click을 **아예 발행하지
   * 않으므로**, 소비만 기다리면 플래그가 그대로 남아 한참 뒤의 정상 클릭을
   * 삼킨다. 드롭 직후의 click은 같은 태스크에서 오므로 다음 매크로태스크에
   * 만료시키면 둘 다 만족한다.
   *
   * @type {any}
   */
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
  function groupOfEvent(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    return typeof target?.closest === 'function'
      ? /** @type {HTMLElement|null} */ (target.closest('.mon-group'))
      : null;
  }

  /**
   * The waiting group a drop may actually land on. **다른 레포 그룹은 드롭 불가** —
   * 크로스레포 적재는 서버에 없는 개념이라 허용하면 거부로만 돌아온다.
   *
   * @param {Event} ev
   * @returns {HTMLElement|null}
   */
  function dropTargetGroup(ev) {
    const group = groupOfEvent(ev);
    if (!group || !dragging) {
      return null;
    }
    return (group.getAttribute('data-root-dir') || '') === dragging.root_dir
      ? group
      : null;
  }

  function clearDragOver() {
    for (const el of Array.from(
      console_el.querySelectorAll('.mon-group--drag-over')
    )) {
      el.classList.remove('mon-group--drag-over');
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragStart(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const card =
      typeof target?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (
            target.closest('.mon-card[draggable="true"]')
          )
        : null;
    if (!card) {
      return;
    }
    dragging = {
      bead_id: card.getAttribute('data-issue-id') || '',
      lane: card.getAttribute('data-lane') || '',
      root_dir: card.getAttribute('data-root-dir') || '',
      revision: Number(card.getAttribute('data-revision') || 0) || 0,
      queue_index: Number(card.getAttribute('data-queue-index')),
      queue_length: Number(card.getAttribute('data-queue-length')),
      place_index: Number(card.getAttribute('data-place-index'))
    };
    suppress_open_click = true;
    try {
      ev.dataTransfer?.setData('text/plain', dragging.bead_id);
      if (ev.dataTransfer) {
        ev.dataTransfer.effectAllowed = 'move';
      }
    } catch {
      /* ignore — 드래그 자체는 플래그만으로도 성립한다 */
    }
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragOver(ev) {
    const group = dropTargetGroup(ev);
    if (!group) {
      return;
    }
    ev.preventDefault();
    if (ev.dataTransfer) {
      ev.dataTransfer.dropEffect = 'move';
    }
    group.classList.add('mon-group--drag-over');
  }

  /**
   * @param {DragEvent} ev
   */
  function onDragLeave(ev) {
    groupOfEvent(ev)?.classList.remove('mon-group--drag-over');
  }

  function onDragEnd() {
    dragging = null;
    clearDragOver();
    expireDragSuppressSoon();
  }

  /**
   * Drop index math (§2.4) — 렌더된 행이 실어 온 raw 좌표에서만 유도한다:
   * 적재는 행 앞이면 그 행의 `queue_index`, 그룹 맨 끝이면 끌고 온 카드의
   * `place_index`(= 그 레포 raw `queue_length`). 재정렬은 제거 후 삽입 보정까지
   * 포함해 `s > k ? k : k - 1`.
   *
   * @param {DragEvent} ev
   */
  function onDrop(ev) {
    const group = dropTargetGroup(ev);
    const drag = dragging;
    dragging = null;
    clearDragOver();
    if (!group || !drag || !drag.bead_id) {
      return;
    }
    ev.preventDefault();
    const target = /** @type {HTMLElement|null} */ (ev.target);
    const over =
      typeof target?.closest === 'function'
        ? /** @type {HTMLElement|null} */ (
            target.closest('.mon-card[data-lane="queue"]')
          )
        : null;
    const k =
      over && group.contains(over)
        ? Number(over.getAttribute('data-queue-index'))
        : NaN;

    if (drag.lane === 'runnable') {
      const index = Number.isFinite(k) ? k : drag.place_index;
      if (!Number.isFinite(index)) {
        return;
      }
      void sendCas(
        'worker-queue-place',
        { bead_id: drag.bead_id, index },
        drag.root_dir,
        drag.revision
      );
      return;
    }
    if (drag.lane !== 'queue') {
      return;
    }
    if (over && over.getAttribute('data-issue-id') === drag.bead_id) {
      return;
    }
    const s = drag.queue_index;
    const to_index = Number.isFinite(k)
      ? s > k
        ? k
        : k - 1
      : drag.queue_length - 1;
    if (!Number.isFinite(to_index) || to_index < 0 || to_index === s) {
      return;
    }
    void sendCas(
      'worker-queue-reorder',
      { bead_id: drag.bead_id, to_index },
      drag.root_dir,
      drag.revision
    );
  }

  /**
   * @param {number} now
   * @returns {import('lit-html').TemplateResult}
   */
  function monitorTemplate(now) {
    const runnable_filter = applyMonitorCandidateFilter(
      lanes.runnable,
      candidate_filter
    );
    /** @type {Record<string, MonitorItem[]>} */
    const by_lane = {
      runnable: runnable_filter.visible,
      queue: lanes.queue,
      running: lanes.running,
      pr_wait: lanes.pr_wait,
      done: lanes.done
    };
    return html`${monitorTopBarTemplate({
        automation: lanes.automation,
        counts: {
          running: lanes.running.length,
          queue: lanes.queue.length,
          pr_wait: lanes.pr_wait.length
        },
        running_sort,
        done_range,
        token_total: crossRepoTokenTotal(lanes.done),
        token_tooltip: tokenTotalTooltip(doneRangeLabel())
      })}
      <div class="worker-lanes mon-lanes">
        ${MONITOR_LANES.map((meta) => {
          const items = by_lane[meta.lane];
          // 대기 레인만 레포별 그룹이다 (§8): 대기 큐·슬롯·자동화가 레포마다
          // 독립이고, 순번도 그 레포 큐 안에서만 뜻이 있다.
          const body =
            meta.lane === 'queue'
              ? lanes.queue_groups.length > 0
                ? html`${lanes.queue_groups.map((group) =>
                    queueGroupTemplate(group, now)
                  )}`
                : undefined
              : items.length > 0
                ? html`${items.map((item) => cardTemplate(item, now))}`
                : undefined;
          return paneTemplate({
            id: `monitor-${meta.lane}`,
            lane: meta.pane,
            // 완료 레인 제목은 그 레인을 지배하는 기간을 말한다 (§7·§8):
            // `완료·오늘` / `완료·최근 7일` / `완료·최근 30일` / `완료·전체`.
            title:
              meta.lane === 'done' ? `완료·${doneRangeLabel()}` : meta.title,
            items,
            empty: meta.empty,
            body,
            live: meta.lane === 'running' && items.length > 0,
            header_control:
              meta.lane === 'runnable'
                ? html`<span class="mon-candidate-filter">
                    <label
                      class="worker-filter__tgl"
                      title="blocked 이슈 표시 (기본 숨김)"
                    >
                      <input
                        type="checkbox"
                        class="mon-filter__blocked"
                        .checked=${candidate_filter.show_blocked}
                      />
                      🔒 blocked
                    </label>
                    ${runnable_filter.hidden_blocked > 0
                      ? html`<span class="worker-filter__hidden"
                          >숨김 ${runnable_filter.hidden_blocked}건</span
                        >`
                      : ''}
                  </span>`
                : meta.lane === 'pr_wait' && items.length > 0
                  ? html`<button
                      type="button"
                      class="mon-lane-op mon-merge-all"
                      title="자격이 생기는 PR을 각 레포의 머지 큐에 한 번에 넣습니다"
                    >
                      일괄 머지
                    </button>`
                  : ''
          });
        })}
      </div>`;
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
      running_sort
    });
    render(monitorTemplate(now), console_el);
  }

  /**
   * Open an issue, switching repos through the picker's own path first when the
   * row belongs to another one — 전환 없이 열면 지금 붙어 있는 DB에서 없는 id를
   * 찾게 된다. 전환이 실패하면 이동하지 않고 조용히 멈춘다.
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
   * @param {HTMLElement} el
   * @returns {{ root_dir: string, revision: number }}
   */
  function casOf(el) {
    return {
      root_dir: el.getAttribute('data-root-dir') || '',
      revision: Number(el.getAttribute('data-revision') || 0) || 0
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
   * @param {HTMLElement} card
   * @param {string} message
   */
  function showDependencyError(card, message) {
    const trigger = /** @type {HTMLElement|null} */ (
      card.querySelector('.mon-link__trigger')
    );
    const popover = /** @type {HTMLElement|null} */ (
      card.querySelector('.mon-link__popover')
    );
    const error = /** @type {HTMLElement|null} */ (
      card.querySelector('.mon-link__error')
    );
    if (!trigger || !popover || !error) {
      return;
    }
    closePlacePopovers();
    popover.hidden = false;
    trigger.setAttribute('aria-expanded', 'true');
    error.textContent = message;
    error.hidden = false;
  }

  /**
   * UI-2gi1 §6.5·§7: 의존 mutation은 낙관적 투영을 소유하지 않는다. 성공하면 선택기만 닫고 u3의
   * 집계 refresh를 기다린다. 거부되면 카드를 그대로 두고 bd 문구를 그대로
   * 표시한다 (UI-2gi1 §6.5·§7).
   *
   * @param {'dep-add'|'dep-remove'} type
   * @param {HTMLElement} card
   * @param {string} blocker_id
   */
  async function mutateDependency(type, card, blocker_id) {
    const root_dir = card.getAttribute('data-root-dir') || '';
    const bead_id = card.getAttribute('data-issue-id') || '';
    if (!bead_id || !blocker_id || blocker_id === bead_id) {
      return;
    }
    try {
      await send(type, { a: bead_id, b: blocker_id }, root_dir);
      closePlacePopovers();
    } catch (error) {
      showDependencyError(card, dependencyErrorMessage(error));
    }
  }

  /**
   * @param {HTMLElement} card
   * @param {HTMLElement} button
   */
  function runCardAction(card, button) {
    const { root_dir, revision } = casOf(card);
    const bead_id = card.getAttribute('data-issue-id') || '';
    const attempt_id =
      button.dataset.attemptId || card.getAttribute('data-attempt-id') || '';
    const cls = button.classList;
    if (cls.contains('mon-link__trigger')) {
      toggleLinkPopover(button);
      return;
    }
    if (
      cls.contains('mon-link__candidate') ||
      cls.contains('mon-link__direct')
    ) {
      const blocker_id = button.dataset.targetId || '';
      void mutateDependency('dep-add', card, blocker_id);
      return;
    }
    if (cls.contains('mon-blocker__remove')) {
      const blocker_id = button.dataset.blockerId || '';
      void mutateDependency('dep-remove', card, blocker_id);
      return;
    }
    if (cls.contains('mon-place__choice')) {
      const lane = button.dataset.lane || 'parallel';
      const index = Number(button.dataset.placeIndex || 0) || 0;
      closePlacePopovers();
      void sendCas(
        'worker-queue-place',
        {
          bead_id,
          ...(lane === 'parallel' ? {} : { lane }),
          index
        },
        root_dir,
        revision
      );
      return;
    }
    if (cls.contains('worker-card__place')) {
      togglePlacePopover(button);
      return;
    }
    if (cls.contains('mon-op--up') || cls.contains('mon-op--down')) {
      const index = Number(card.getAttribute('data-queue-index') || 0) || 0;
      const to_index = cls.contains('mon-op--up') ? index - 1 : index + 1;
      if (to_index < 0) {
        return;
      }
      void sendCas(
        'worker-queue-reorder',
        {
          bead_id,
          ...(/^s[1-5]$/.test(card.dataset.lane || '')
            ? { lane: card.dataset.lane }
            : {}),
          to_index
        },
        root_dir,
        revision
      );
      return;
    }
    if (cls.contains('mon-op--remove')) {
      void sendCas('worker-queue-remove', { bead_id }, root_dir, revision);
      return;
    }
    if (cls.contains('mon-op--pause')) {
      void send('worker-attempt-pause', { attempt_id }, root_dir);
      return;
    }
    if (cls.contains('mon-op--discard')) {
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
    if (cls.contains('mon-op--resume')) {
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
    if (cls.contains('mon-op--dismiss')) {
      void sendCas(
        'worker-attempt-dismiss',
        { attempt_id },
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
   * UI-2gi1 §6.5: 닫힌 카드마다 전 레포 후보 DOM을 보유하지 않도록 목록을
   * 비운다. 오류 팝오버도 같은 껍데기를 다시 사용한다.
   *
   * @param {HTMLElement} popover
   */
  function clearLinkPopover(popover) {
    const list = popover.querySelector('.mon-link__list');
    list?.replaceChildren();
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
   * UI-2gi1 §6.5: 현재 팝오버 하나에만 전 레포 후보를 지연 생성한다.
   *
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

  /** UI-2gi1 §6.5: 레인·의존 선택기는 동시에 하나만 노출한다. */
  function closePlacePopovers() {
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
      console_el.querySelectorAll('[aria-expanded="true"]')
    )) {
      trigger.setAttribute('aria-expanded', 'false');
    }
  }

  /**
   * @param {HTMLElement} button
   */
  function togglePlacePopover(button) {
    const wrapper = button.closest('.mon-place');
    const popover = /** @type {HTMLElement|null} */ (
      wrapper?.querySelector('.mon-place__popover') || null
    );
    if (!popover) {
      return;
    }
    const opens = popover.hidden;
    closePlacePopovers();
    if (opens) {
      popover.hidden = false;
      button.setAttribute('aria-expanded', 'true');
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
    closePlacePopovers();
    if (opens) {
      const card = button.closest('.mon-card');
      populateLinkCandidates(
        popover,
        card?.getAttribute('data-issue-id') || ''
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
    const card = input.closest('.mon-card');
    if (!popover || !card) {
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
    const self_id = card.getAttribute('data-issue-id') || '';
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
    closePlacePopovers();
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocumentKeydown(ev) {
    if (ev.key !== 'Escape') {
      return;
    }
    const trigger = /** @type {HTMLElement|null} */ (
      console_el.querySelector('[aria-expanded="true"]')
    );
    closePlacePopovers();
    trigger?.focus();
  }

  /**
   * @param {Event} ev
   */
  function onClick(ev) {
    // 드롭 직후의 첫 click은 카드 열기로 새지 않는다 (§2.4). 플래그는 클릭 종류를
    // 가리지 않고 여기서 소비되므로, 그 다음 클릭부터는 언제나 정상 동작한다.
    const after_drag = suppress_open_click;
    suppress_open_click = false;
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    // 실행 기본값 다이얼로그는 자기 핸들러가 소유한다.
    if (target.closest('dialog')) {
      return;
    }
    // PR 링크는 그대로 열려야 한다 — 행 열기로 가로채지 않는다.
    if (target.closest('a')) {
      return;
    }

    const running_sort_button = /** @type {HTMLElement|null} */ (
      target.closest('.mon-running-sort')
    );
    if (running_sort_button) {
      ev.preventDefault();
      running_sort =
        running_sort_button.getAttribute('data-sort') === 'repo'
          ? 'repo'
          : 'started';
      saveRunningSort(running_sort);
      doRender();
      return;
    }

    const auto_all = /** @type {HTMLElement|null} */ (
      target.closest('.mon-auto-all')
    );
    if (auto_all) {
      ev.preventDefault();
      void toggleMasterAuto(auto_all.getAttribute('data-on') === 'true');
      return;
    }
    const merge_all = target.closest('.mon-merge-all');
    if (merge_all) {
      ev.preventDefault();
      void mergeQueueAddAll();
      return;
    }
    const advance = /** @type {HTMLElement|null} */ (
      target.closest('.mon-ctl--advance')
    );
    if (advance) {
      ev.preventDefault();
      const { root_dir, revision } = casOf(advance);
      void sendCas(
        'worker-automation-toggle',
        { on: advance.getAttribute('data-on') === 'true' },
        root_dir,
        revision
      );
      return;
    }
    const merge_auto = /** @type {HTMLElement|null} */ (
      target.closest('.mon-ctl--merge-auto')
    );
    if (merge_auto) {
      ev.preventDefault();
      const { root_dir, revision } = casOf(merge_auto);
      void sendCas(
        'worker-merge-auto-toggle',
        { on: merge_auto.getAttribute('data-on') === 'true' },
        root_dir,
        revision
      );
      return;
    }
    const card = /** @type {HTMLElement|null} */ (target.closest('.mon-card'));
    if (!card) {
      return;
    }
    const button = /** @type {HTMLElement|null} */ (target.closest('button'));
    if (button) {
      ev.preventDefault();
      runCardAction(card, button);
      return;
    }
    const id = card.getAttribute('data-issue-id');
    if (id && !after_drag) {
      ev.preventDefault();
      openRow(id, card.getAttribute('data-root-dir') || '');
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
      candidate_filter = { show_blocked: blocked_toggle.checked };
      saveMonitorCandidateFilter(candidate_filter);
      doRender();
      return;
    }
    const range_select = /** @type {HTMLSelectElement|null} */ (
      target.closest('.mon-done-range')
    );
    if (range_select) {
      // 완료 레인과 토큰 KPI를 함께 지배하는 기간이므로, 바뀌면 둘 다 한 번의
      // 재렌더로 같이 움직인다 (§7).
      done_range = isClosedRange(range_select.value)
        ? range_select.value
        : DEFAULT_CLOSED_RANGE;
      saveDoneRange(done_range);
      doRender();
      return;
    }
    const input = /** @type {HTMLInputElement|null} */ (
      target.closest('.mon-slots__input')
    );
    if (!input) {
      return;
    }
    const { root_dir, revision } = casOf(input);
    const raw = Number(input.value);
    if (!Number.isFinite(raw)) {
      return;
    }
    // 서버는 하한 밖 값을 clamp하지 않고 거부하므로 보내기 전에 맞춘다.
    const slots = Math.max(MIN_SLOTS, Math.floor(raw));
    void sendCas('worker-queue-set-slots', { slots }, root_dir, revision);
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
    // 데이터 갱신은 push가 끌어온다 (집계 구독이 debounce 후 전체 스냅샷을
    // 밀어준다). 시계만 지나가도 값이 바뀌는 경과·하트비트를 위해 탭이 보이는
    // 동안만 tick을 돈다.
    load() {
      log('load');
      doRender();
      if (tick_timer === null) {
        tick_timer = setInterval(() => {
          try {
            // 팝오버 입력·오류는 사용자가 소유한 임시 상태다. 시계 tick이 DOM을
            // 교체하면 1초 안에 사라지므로 열린 동안 시계 렌더만 미룬다.
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
    // 탭을 떠나면 화면은 그대로 두되 시계는 멈춘다 — 보이지 않는 뷰를 초당
    // 다시 그릴 이유가 없다.
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
