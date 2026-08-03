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
import { debug } from '../../utils/logging.js';
import { showToast } from '../../utils/toast.js';
import { createExecDefaultsDialog } from '../worker/exec-defaults-dialog.js';
import { candidateCard, miniRow, paneTemplate } from '../worker/lanes.js';
import {
  MIN_SLOTS,
  buildLanes,
  monitorGroupHeaderTemplate,
  monitorLiveTemplate,
  monitorTopBarTemplate
} from './lanes.js';
import { crossRepoTokenTotal, tokenTotalTooltip } from './usage.js';

/**
 * @import { MonitorItem, MonitorLanes } from './lanes.js'
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
 * The five lanes in display order (§8). `pane` is the Worker pane vocabulary the
 * lane borrows its spine/dot colour and card template from — 실행가능은 후보
 * 레인의 카드(`candidateCard`)를 그대로 쓴다.
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
 * The monitor-only action strip a card carries beside its Worker template —
 * 순서 변경·제거(대기)와 실행 제어(실행중)는 `miniRow`가 모르는 조작이다.
 * 나머지 레인의 버튼(머지·취소·폐기·처분·적재)은 Worker 템플릿이 이미 싣는다.
 *
 * @param {MonitorItem} item
 * @returns {import('lit-html').TemplateResult|''}
 */
function cardOpsTemplate(item) {
  if (item.lane === 'queue') {
    const first = (item.queue_position ?? 1) <= 1;
    const last = (item.queue_index ?? 0) >= (item.queue_length ?? 1) - 1;
    return html`<div class="mon-card__ops">
      <button
        type="button"
        class="mon-op mon-op--up"
        ?disabled=${first}
        title="한 칸 앞으로"
      >
        ↑
      </button>
      <button
        type="button"
        class="mon-op mon-op--down"
        ?disabled=${last}
        title="한 칸 뒤로"
      >
        ↓
      </button>
      <button
        type="button"
        class="mon-op mon-op--remove"
        title="대기 큐에서 제거"
      >
        ✕
      </button>
    </div>`;
  }
  if (item.lane === 'running') {
    return html`<div class="mon-card__ops">
      ${item.run_state === 'running'
        ? html`<button
            type="button"
            class="mon-op mon-op--pause"
            ?disabled=${item.can_pause === false}
            title="일시정지 — 세션을 끊고 이어하기 가능 상태로 둡니다"
          >
            ⏸
          </button>`
        : html`<button
            type="button"
            class="mon-op mon-op--resume"
            ?disabled=${item.can_resume === false}
            title="이어하기"
          >
            ▶
          </button>`}
      <button
        type="button"
        class="mon-op mon-op--stop"
        title="중단 — 세션을 죽이고 대기 큐에서 뺍니다"
      >
        ■
      </button>
      ${item.run_state === 'failed'
        ? html`<button
            type="button"
            class="mon-op mon-op--dismiss"
            title="실패 기록 닫기"
          >
            ✕
          </button>`
        : ''}
    </div>`;
  }
  return '';
}

/**
 * One monitor card: the Worker template plus this tab's own coordinates
 * (`root_dir` · CAS revision · lane) and action strip. 좌표를 카드 껍데기에
 * 두는 이유는 조작 위임이 "이 클릭이 어느 레포의 어느 revision을 향하는가"를
 * 한 자리에서 읽을 수 있어야 하기 때문이다.
 *
 * @param {MonitorItem} item
 * @param {number} now
 * @returns {import('lit-html').TemplateResult}
 */
function cardTemplate(item, now) {
  return html`<div
    class="mon-card mon-card--${item.lane}"
    data-issue-id=${item.id}
    data-root-dir=${item.root_dir}
    data-revision=${String(item.expected_revision)}
    data-lane=${item.lane}
    data-attempt-id=${item.attempt_id || ''}
    data-place-index=${String(item.place_index ?? '')}
    data-queue-index=${String(item.queue_index ?? '')}
  >
    ${item.lane === 'runnable' ? candidateCard(item) : miniRow(item)}
    ${monitorLiveTemplate(item, now)}${cardOpsTemplate(item)}
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
   * 실행 기본값 다이얼로그가 지금 보고 있는 레포. 다이얼로그는 workspace 하나를
   * 전제로 만들어졌으므로, 모니터는 대상만 바꿔 끼우고 어댑터 store가 그 레포의
   * 값을 돌려준다.
   *
   * @type {string|null}
   */
  let exec_target = null;
  /**
   * mutation 응답이 실어 온 권위 있는 queue. 다음 집계 push가 오기 전까지 그
   * 레포의 다이얼로그가 읽는 값이자, CAS 재시도가 쓰는 revision이다.
   *
   * @type {Map<string, any>}
   */
  const exec_adopted = new Map();
  /** @type {Set<() => void>} */
  const exec_listeners = new Set();

  /**
   * @param {string} root_dir
   * @returns {any|null}
   */
  function groupOf(root_dir) {
    return lanes.queue_groups.find((g) => g.root_dir === root_dir) || null;
  }

  const exec_store = {
    get() {
      if (!exec_target) {
        return { revision: 0, exec_defaults: {} };
      }
      const adopted = exec_adopted.get(exec_target);
      if (adopted) {
        return adopted;
      }
      const group = groupOf(exec_target);
      const workspaces =
        pipelineStore && pipelineStore.get ? pipelineStore.get() : null;
      const workspace = (Array.isArray(workspaces) ? workspaces : []).find(
        (w) => w && w.root_dir === exec_target
      );
      return {
        revision: group ? group.revision : 0,
        exec_defaults: group ? group.exec_defaults : {},
        workspace_info: workspace ? workspace.workspace_info : undefined
      };
    },
    /** @param {any} q */
    set(q) {
      if (exec_target) {
        exec_adopted.set(exec_target, q);
      }
      for (const fn of Array.from(exec_listeners)) {
        fn();
      }
    },
    /** @param {() => void} fn */
    subscribe(fn) {
      exec_listeners.add(fn);
      return () => exec_listeners.delete(fn);
    }
  };

  const exec_defaults_dialog = createExecDefaultsDialog(mount_element, {
    queueStore: exec_store,
    // 다이얼로그는 workspace를 모른다 — 대상 레포는 전송 경로가 실어 준다.
    transport: transport
      ? (/** @type {any} */ type, /** @type {any} */ payload) =>
          transport(type, {
            .../** @type {Record<string, unknown>} */ (payload || {}),
            root_dir: exec_target
          })
      : undefined,
    getWorkspacePath: () => exec_target || undefined
  });

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
   * @returns {Promise<any>}
   */
  async function sendCas(type, payload, root_dir, revision) {
    if (!transport || !root_dir) {
      return null;
    }
    let res = await transport(type, {
      ...payload,
      root_dir,
      expected_revision: revision
    });
    if (res && res.conflict) {
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
    return html`${monitorTopBarTemplate({
        automation: lanes.automation,
        counts: {
          running: lanes.running.length,
          queue: lanes.queue.length,
          pr_wait: lanes.pr_wait.length
        },
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
                ? html`${lanes.queue_groups.map(
                    (group) =>
                      html`<div
                        class="mon-group"
                        data-root-dir=${group.root_dir}
                      >
                        ${monitorGroupHeaderTemplate(group)}
                        <div class="mon-group__list">
                          ${group.items.map((item) => cardTemplate(item, now))}
                        </div>
                      </div>`
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
              meta.lane === 'pr_wait' && items.length > 0
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
      done_since: closedRangeSince(done_range, now)
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
   * @param {HTMLElement} card
   * @param {HTMLElement} button
   */
  function runCardAction(card, button) {
    const { root_dir, revision } = casOf(card);
    const bead_id = card.getAttribute('data-issue-id') || '';
    const attempt_id = card.getAttribute('data-attempt-id') || '';
    const cls = button.classList;
    if (cls.contains('worker-card__place')) {
      // 적재만 한다 — 서버가 적재 성공 후 이미 `tickWorkerQueue()`를 부르므로
      // 별도의 "즉시 실행" 경로는 두지 않는다 (§8).
      void sendCas(
        'worker-queue-place',
        {
          bead_id,
          index: Number(card.getAttribute('data-place-index') || 0) || 0
        },
        root_dir,
        revision
      );
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
        { bead_id, to_index },
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
    if (cls.contains('mon-op--stop')) {
      void send('worker-attempt-stop', { attempt_id }, root_dir);
      return;
    }
    if (cls.contains('mon-op--resume')) {
      void sendCas('worker-attempt-resume', { attempt_id }, root_dir, revision);
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
      void sendCas('worker-merge-queue-add', { bead_id }, root_dir, revision);
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
      if (
        !confirmFn(
          `${bead_id}: PR을 닫고 워크트리/브랜치를 폐기합니다. 되돌릴 수 없습니다. 계속할까요?`
        )
      ) {
        return;
      }
      void sendCas('worker-pr-discard', { bead_id }, root_dir, revision);
      return;
    }
    if (cls.contains('worker-mini__revise-fix')) {
      void sendCas('worker-revise-fix', { bead_id }, root_dir, revision);
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
        'worker-queue-toggle',
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
    const exec = /** @type {HTMLElement|null} */ (
      target.closest('.mon-ctl--exec')
    );
    if (exec) {
      ev.preventDefault();
      exec_target = exec.getAttribute('data-root-dir') || null;
      exec_adopted.delete(exec_target || '');
      exec_defaults_dialog.open();
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
    if (id) {
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

  mount_element.addEventListener('click', onClick);
  mount_element.addEventListener('change', onChange);

  if (pipelineStore && typeof pipelineStore.subscribe === 'function') {
    unsubscribe_pipeline = pipelineStore.subscribe(() => {
      try {
        // 새 스냅샷이 권위다 — mutation 응답으로 임시 채택했던 queue는 버린다.
        exec_adopted.clear();
        doRender();
        for (const fn of Array.from(exec_listeners)) {
          fn();
        }
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
    // 데이터 갱신은 push가 끌어온다 (집계 구독이 debounce 후 전체 스냅샷을
    // 밀어준다). 시계만 지나가도 값이 바뀌는 경과·하트비트를 위해 탭이 보이는
    // 동안만 tick을 돈다.
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
    // 탭을 떠나면 화면은 그대로 두되 시계는 멈춘다 — 보이지 않는 뷰를 초당
    // 다시 그릴 이유가 없다.
    pause() {
      stopTick();
    },
    clear() {
      stopTick();
      if (unsubscribe_pipeline) {
        unsubscribe_pipeline();
        unsubscribe_pipeline = null;
      }
      mount_element.removeEventListener('click', onClick);
      mount_element.removeEventListener('change', onChange);
      exec_defaults_dialog.destroy();
      exec_listeners.clear();
      mount_element.replaceChildren();
    }
  };
}
