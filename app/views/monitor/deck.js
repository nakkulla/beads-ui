/**
 * 레포 데크 — 모니터 탭의 signature 줄 (UI-eey2 §4).
 *
 * 모든 visible 레포를 한 줄에 세우고, 각 레포의 "지금 상태"(슬롯 레일·건수)와
 * "제어"(자동화·머지·실행 설정)를 같은 타일 안에 둔다. 소스는 집계 스냅샷의
 * `workspaces_state[]` 하나다 — 파이프라인이 빈 레포까지 싣기 때문에 이 데크가
 * 유일하게 모든 레포를 말할 수 있는 자리다.
 *
 * 마스터 `전체 자동화` 토글은 없다(스펙 §4.1) — 자동화는 레포별 스위치가 유일한
 * 제어다.
 *
 * 새 투영 필드가 없는 구버전 서버에서는 그 줄만 생략한다(스펙 §12): 모델 칩은
 * `execution_defaults`·`runner_catalog`·`session_defaults`가 **모두** 있을 때만
 * 그린다. `기본값 확인 불가` 같은 대체 문구를 만들지 않는다 — 없는 사실을
 * 있는 것처럼 말하는 것보다 침묵이 낫다.
 */
import { html, render } from 'lit-html';
import {
  formatOrchestrationChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { showToast } from '../../utils/toast.js';
import { modelRunnerOf } from '../detail-panel/exec-settings.js';
import { createExecutionPane } from '../settings-dialog/execution-pane.js';
import {
  iconGear,
  iconMerge,
  iconPause,
  iconPlay,
  iconSlots
} from './icons.js';
import { crossRepoTokenTotal, tokenTotalTooltip } from './usage.js';

/**
 * @import { MonitorItem } from './lanes.js'
 */

/** 조용한 레포 줄의 펼침 상태만 기억한다 (스펙 §4.3). */
export const MONITOR_DECK_KEY = 'beads-ui.monitor.deck';

/**
 * @returns {{ quiet_open: boolean }}
 */
function loadDeckState() {
  try {
    const raw = window.localStorage.getItem(MONITOR_DECK_KEY);
    if (!raw) {
      return { quiet_open: false };
    }
    const parsed = JSON.parse(raw);
    return {
      quiet_open:
        !!parsed && typeof parsed === 'object' && parsed.quiet_open === true
    };
  } catch {
    return { quiet_open: false };
  }
}

/**
 * @param {{ quiet_open: boolean }} state
 */
function saveDeckState(state) {
  try {
    window.localStorage.setItem(MONITOR_DECK_KEY, JSON.stringify(state));
  } catch {
    // 저장 실패는 표시에 영향을 주지 않는다.
  }
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {any} row
 * @param {string} key
 * @returns {number}
 */
function countOf(row, key) {
  const counts = isRecord(row?.counts) ? row.counts : null;
  const value = counts ? counts[key] : null;
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * Whether a repo has any pipeline at all (§4.2). 실행가능 후보만 있어도 활성이다
 * — 후보를 끌어다 놓을 대기 섹션이 그 레포에 있어야 하기 때문이다.
 *
 * @param {any} row
 * @returns {boolean}
 */
function isActive(row) {
  return (
    countOf(row, 'running') > 0 ||
    countOf(row, 'queue') > 0 ||
    countOf(row, 'pr_wait') > 0 ||
    countOf(row, 'runnable') > 0
  );
}

/**
 * The queue the `⚙` panel hands to its pane. mutation 응답이 실어 온 권위 있는
 * queue 스냅샷은 집계 스냅샷보다 앞서므로 위에 덮되, `session_defaults`처럼
 * 집계에만 있는 필드는 행에서 그대로 가져온다.
 *
 * @param {any} row
 * @param {any} adopted
 * @returns {any}
 */
function mergeQueue(row, adopted) {
  if (!isRecord(adopted)) {
    return row;
  }
  const merged = { ...row };
  for (const [key, value] of Object.entries(adopted)) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }
  return merged;
}

/**
 * One repo's 오케/워커 exec chips. 재료(투영 3종)가 하나라도 없으면 `null`이다.
 *
 * @param {any} row
 * @returns {{ orchestration: { text: string, title: string }|null, worker: { text: string, title: string }|null }|null}
 */
export function deckExecChips(row) {
  if (
    !isRecord(row) ||
    !isRecord(row.execution_defaults) ||
    !isRecord(row.runner_catalog) ||
    !isRecord(row.session_defaults)
  ) {
    return null;
  }
  /** @type {Record<string, unknown>} */
  const global_values = { ...row.session_defaults };
  for (const key of [
    'orchestration_model',
    'orchestration_effort',
    'orchestration_speed'
  ]) {
    if (typeof row[key] === 'string' && row[key].length > 0) {
      global_values[key] = row[key];
    }
  }
  const rows = resolveExecutionSettings({
    global: global_values,
    execution_defaults: row.execution_defaults,
    runner_catalog: row.runner_catalog
  });
  const controller_runtime = modelRunnerOf(
    row.runner_catalog,
    rows.orchestration_model.value ?? ''
  );
  const orchestration = formatOrchestrationChip(rows, row.runner_catalog);
  const worker = formatWorkerChip(rows, controller_runtime);
  return orchestration === null && worker === null
    ? null
    : { orchestration, worker };
}

/**
 * @typedef {Object} RepoDeckOptions
 * @property {() => Array<Record<string, any>>} workspacesState
 * @property {() => Array<Pick<MonitorItem, 'usage'>>} [doneItems] - 기간이 이미
 * 걸린 완료 아이템 (합계 칸의 `<기간> 완료 n`과 토큰).
 * @property {() => string} [rangeLabel]
 * @property {(type: any, payload?: unknown) => Promise<any>} [transport]
 * @property {{ get: () => any, subscribe?: (fn: () => void) => () => void }} [implPresetStore]
 * @property {(message: string) => void} [notify]
 * @property {(root_dir: string) => void} [gotoWorkerTab] - 그 레포로
 * `switchWorkspace` 후 Worker 탭으로 넘어가는 경로 (§11).
 * @property {(root_dir: string|null) => void} [onFocusChange] - Focus filter
 * change notice. 흐림 클래스는 모니터 뷰가 소유한다.
 */

/**
 * Mount the repo deck into `mount_element`.
 *
 * @param {HTMLElement} mount_element
 * @param {RepoDeckOptions} options
 */
export function createRepoDeck(mount_element, options) {
  const notify =
    options.notify || ((message) => showToast(message, 'error', 4000));

  // lit이 소유하는 렌더 호스트와, 설정 pane이 사는 패널을 분리한다 — pane의
  // DOM은 데크가 다시 그려질 때마다 날아가면 안 된다.
  const deck_el = document.createElement('div');
  deck_el.className = 'mon2-deck__main';
  mount_element.appendChild(deck_el);

  const panel_el = document.createElement('div');
  panel_el.className = 'mon2-deck__panel';
  panel_el.hidden = true;
  const panel_head = document.createElement('div');
  panel_head.className = 'mon2-deck__panel-hd';
  const panel_title = document.createElement('span');
  panel_title.className = 'mon2-deck__panel-title';
  const panel_close = document.createElement('button');
  panel_close.type = 'button';
  panel_close.className = 'mon2-deck__panel-close';
  panel_close.setAttribute('aria-label', '실행 설정 닫기');
  panel_close.textContent = '✕';
  panel_head.append(panel_title, panel_close);
  const panel_body = document.createElement('div');
  panel_body.className = 'mon2-deck__panel-body';
  panel_el.append(panel_head, panel_body);
  mount_element.appendChild(panel_el);

  let deck_state = loadDeckState();
  /** @type {string|null} */
  let focus_root = null;
  /** @type {string|null} */
  let panel_root = null;
  /** @type {ReturnType<typeof createExecutionPane>|null} */
  let pane = null;
  /** mutation 응답이 실어 온 권위 있는 queue (레포별). */
  /** @type {Map<string, any>} */
  const adopted = new Map();

  /** @returns {Array<Record<string, any>>} */
  function rows() {
    const list = options.workspacesState ? options.workspacesState() : [];
    return Array.isArray(list) ? list.filter((row) => isRecord(row)) : [];
  }

  /**
   * @param {string} root_dir
   * @returns {any}
   */
  function rowOf(root_dir) {
    return rows().find((row) => row.root_dir === root_dir) || null;
  }

  /**
   * @param {string} root_dir
   * @returns {any}
   */
  function queueFor(root_dir) {
    return mergeQueue(rowOf(root_dir), adopted.get(root_dir));
  }

  /**
   * Drop an adopted queue the aggregate snapshot has caught up with — 새
   * 스냅샷이 권위다.
   */
  function pruneAdopted() {
    for (const row of rows()) {
      const held = adopted.get(row.root_dir);
      if (
        held &&
        typeof held.revision === 'number' &&
        typeof row.revision === 'number' &&
        row.revision >= held.revision
      ) {
        adopted.delete(row.root_dir);
      }
    }
  }

  /**
   * One switch op. 그 레포의 revision으로 CAS하고, 충돌하면 응답이 실어 온 최신
   * revision으로 **한 번** 재시도한다 (스펙 §12).
   *
   * @param {string} type
   * @param {string} root_dir
   * @param {Record<string, unknown>} payload
   */
  async function sendSwitch(type, root_dir, payload) {
    const transport = options.transport;
    const queue = queueFor(root_dir);
    if (!transport || !isRecord(queue)) {
      return;
    }
    try {
      let res = await transport(type, {
        ...payload,
        root_dir,
        expected_revision: queue.revision
      });
      if (isRecord(res?.queue)) {
        adopted.set(root_dir, res.queue);
      }
      if (res && res.conflict) {
        const fresh =
          isRecord(res.queue) && typeof res.queue.revision === 'number'
            ? res.queue.revision
            : queueFor(root_dir)?.revision;
        res = await transport(type, {
          ...payload,
          root_dir,
          expected_revision: fresh
        });
        if (isRecord(res?.queue)) {
          adopted.set(root_dir, res.queue);
        }
      }
    } catch (err) {
      notify(
        `설정 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /** @param {string|null} next */
  function setFocus(next) {
    if (focus_root === next) {
      return;
    }
    focus_root = next;
    options.onFocusChange?.(focus_root);
    doRender();
  }

  /** @param {string} root_dir */
  function toggleFocus(root_dir) {
    setFocus(focus_root === root_dir ? null : root_dir);
  }

  /** @param {string} root_dir */
  function openPanel(root_dir) {
    if (panel_root === root_dir) {
      closePanel();
      return;
    }
    destroyPane();
    panel_root = root_dir;
    const row = rowOf(root_dir);
    panel_title.textContent = `${row?.name || root_dir} 실행 설정 · Worker 탭 ⚙ 실행 탭과 같은 저장소`;
    panel_el.hidden = false;
    pane = createExecutionPane(panel_body, {
      root_dir,
      queue: () => queueFor(root_dir),
      transport: /** @type {any} */ (options.transport),
      implPresetStore: options.implPresetStore,
      notify,
      onQueueAdopt: (queue) => {
        adopted.set(root_dir, queue);
        doRender();
      }
    });
    void pane.load();
    doRender();
  }

  function destroyPane() {
    pane?.destroy();
    pane = null;
  }

  /**
   * @param {boolean} [silent] - `true`면 다시 그리지 않는다 (렌더 안에서 부를 때).
   */
  function closePanel(silent) {
    destroyPane();
    panel_root = null;
    panel_el.hidden = true;
    panel_title.textContent = '';
    if (silent !== true) {
      doRender();
    }
  }

  const onPanelClose = () => closePanel();
  panel_close.addEventListener('click', onPanelClose);

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocumentKeydown(ev) {
    if (ev.key === 'Escape' && focus_root !== null) {
      setFocus(null);
    }
  }
  document.addEventListener('keydown', onDocumentKeydown);

  /**
   * The slot rail (§4.2): 한 칸 = 슬롯 1개. 실행 중인 칸은 채우고 빈 칸은
   * 점선이다. 실행 수가 슬롯보다 많으면(직렬 예외·설정 축소 직후) 실제 실행
   * 수만큼 그린다 — 레일이 사실보다 작게 보이면 안 된다.
   *
   * @param {number} running
   * @param {number} slots
   * @returns {import('lit-html').TemplateResult}
   */
  function slotRail(running, slots) {
    const cells = Math.max(slots, running, 1);
    return html`<span
      class="mon2-deck__rail"
      role="img"
      aria-label=${`슬롯 ${slots}개 중 ${running}개 실행 중`}
    >
      ${Array.from({ length: cells }, (_unused, index) =>
        index < running
          ? html`<i class="mon2-deck__slot is-run"></i>`
          : html`<i class="mon2-deck__slot"></i>`
      )}
    </span>`;
  }

  /**
   * @param {any} row
   * @returns {import('lit-html').TemplateResult}
   */
  function switchesTemplate(row) {
    const auto = row.auto_advance === true;
    const merge = row.auto_merge === true;
    return html`<button
        type="button"
        class=${`mon2-deck__op mon2-deck__auto${auto ? ' is-on' : ''}`}
        data-act="auto"
        aria-pressed=${auto ? 'true' : 'false'}
        aria-label=${`${row.name} 자동화`}
        title=${auto
          ? '자동화 켜짐 — 슬롯이 비면 다음 행이 출발합니다'
          : '자동화 꺼짐 — 다음 행은 수동으로만 출발합니다'}
      >
        ${auto ? iconPause() : iconPlay()}
        <span class="mon2-deck__op-label">자동화</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__merge${merge ? ' is-on' : ''}`}
        data-act="merge"
        aria-pressed=${merge ? 'true' : 'false'}
        aria-label=${`${row.name} 자동 머지`}
        title=${merge
          ? '자동 머지 켜짐 — 자격이 생기는 PR을 계속 머지합니다'
          : '자동 머지 꺼짐'}
      >
        ${iconMerge()}
        <span class="mon2-deck__op-label">머지</span>
      </button>
      <button
        type="button"
        class=${`mon2-deck__op mon2-deck__gear${panel_root === row.root_dir ? ' is-on' : ''}`}
        data-act="gear"
        aria-expanded=${panel_root === row.root_dir ? 'true' : 'false'}
        aria-label=${`${row.name} 실행 설정`}
        title="이 레포의 실행 설정"
      >
        ${iconGear()}
      </button>`;
  }

  /**
   * @param {any} row
   * @returns {import('lit-html').TemplateResult|''}
   */
  function chipsTemplate(row) {
    const chips = deckExecChips(row);
    if (!chips) {
      return '';
    }
    return html`<div class="mon2-deck__chips">
      ${chips.orchestration
        ? html`<span class="mon2-deck__chip" title=${chips.orchestration.title}
            >오케 ${chips.orchestration.text}</span
          >`
        : ''}
      ${chips.worker
        ? html`<span class="mon2-deck__chip" title=${chips.worker.title}
            >워커 ${chips.worker.text}</span
          >`
        : ''}
    </div>`;
  }

  /**
   * @param {any} row
   * @returns {import('lit-html').TemplateResult}
   */
  function tileTemplate(row) {
    const running = countOf(row, 'running');
    const slots = typeof row.slots === 'number' ? row.slots : 1;
    return html`<div
      class=${`mon2-deck__tile${focus_root === row.root_dir ? ' is-focus' : ''}`}
      role="button"
      tabindex="0"
      data-root-dir=${row.root_dir}
      aria-pressed=${focus_root === row.root_dir ? 'true' : 'false'}
      title="클릭하면 이 레포만 선명하게 봅니다 (Esc로 해제)"
    >
      <div class="mon2-deck__tile-hd">
        <span class="mon2-deck__name" title=${row.root_dir}>${row.name}</span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          title="이 레포의 Worker 탭으로 이동"
        >
          Worker ↗
        </button>
      </div>
      <div class="mon2-deck__slots">
        ${iconSlots()} ${slotRail(running, slots)}
        <span class="mon2-deck__counts"
          >${running}/${slots} 실행 · 대기 ${countOf(row, 'queue')} · PR
          ${countOf(row, 'pr_wait')}</span
        >
      </div>
      <div class="mon2-deck__ops">${switchesTemplate(row)}</div>
      ${chipsTemplate(row)}
    </div>`;
  }

  /**
   * One quiet repo as a pill (§4.3): 같은 op, 같은 포커스 동작, 빈 레일.
   *
   * @param {any} row
   * @returns {import('lit-html').TemplateResult}
   */
  function pillTemplate(row) {
    const slots = typeof row.slots === 'number' ? row.slots : 1;
    return html`<div
      class=${`mon2-deck__pill${focus_root === row.root_dir ? ' is-focus' : ''}`}
      role="button"
      tabindex="0"
      data-root-dir=${row.root_dir}
      aria-pressed=${focus_root === row.root_dir ? 'true' : 'false'}
    >
      <span class="mon2-deck__name" title=${row.root_dir}>${row.name}</span>
      ${slotRail(0, slots)} ${switchesTemplate(row)}
      <button
        type="button"
        class="mon2-deck__worker"
        data-act="worker"
        title="이 레포의 Worker 탭으로 이동"
      >
        ↗
      </button>
    </div>`;
  }

  /**
   * The totals cell (§4.1): 전 레포 합계와 provider별 토큰. 마스터 토글은 없다.
   *
   * @param {Array<Record<string, any>>} list
   * @returns {import('lit-html').TemplateResult}
   */
  function totalTemplate(list) {
    const done_items = options.doneItems ? options.doneItems() : [];
    const range_label = options.rangeLabel ? options.rangeLabel() : '';
    const total = crossRepoTokenTotal(
      Array.isArray(done_items) ? done_items : []
    );
    const sum = (/** @type {string} */ key) =>
      list.reduce((acc, row) => acc + countOf(row, key), 0);
    return html`<div
      class="mon2-deck__total"
      title=${`visible 레포 ${list.length}곳의 합계입니다 — 실행·대기·PR은 지금, 완료는 ${range_label}`}
    >
      <div class="mon2-deck__total-counts">
        실행 ${sum('running')} · 대기 ${sum('queue')} · PR ${sum('pr_wait')} ·
        ${range_label} 완료 ${Array.isArray(done_items) ? done_items.length : 0}
      </div>
      ${total === null
        ? ''
        : html`<div class="mon2-deck__total-tokens">
            ${typeof total === 'string'
              ? html`<span
                  class="mon2-deck__tok"
                  title=${tokenTotalTooltip(range_label)}
                  >τ ${total}</span
                >`
              : total.map(
                  (badge) =>
                    html`<span
                      class="mon2-deck__tok"
                      data-provider=${badge.provider}
                      title=${badge.tooltip}
                      >τ ${badge.label}</span
                    >`
                )}
          </div>`}
    </div>`;
  }

  /**
   * @returns {import('lit-html').TemplateResult|''}
   */
  function deckTemplate() {
    const list = rows();
    if (list.length === 0) {
      return '';
    }
    const active = list.filter((row) => isActive(row));
    const quiet = list.filter((row) => !isActive(row));
    return html`<div class="mon2-deck__row">
        ${totalTemplate(list)}
        <div class="mon2-deck__strip">
          ${active.map((row) => tileTemplate(row))}
        </div>
      </div>
      ${quiet.length === 0
        ? ''
        : html`<div
            class=${`mon2-deck__quiet${deck_state.quiet_open ? ' is-open' : ''}`}
          >
            <button
              type="button"
              class="mon2-deck__quiet-toggle"
              aria-expanded=${deck_state.quiet_open ? 'true' : 'false'}
            >
              ${deck_state.quiet_open ? '▾' : '▸'} 파이프라인 없음
              ${quiet.length}
            </button>
            ${deck_state.quiet_open
              ? html`<div class="mon2-deck__pills">
                  ${quiet.map((row) => pillTemplate(row))}
                </div>`
              : ''}
          </div>`}`;
  }

  /**
   * Release the focus filter when its repo leaves the visible set (스펙 §12).
   */
  function reconcileFocus() {
    if (focus_root !== null && !rowOf(focus_root)) {
      focus_root = null;
      options.onFocusChange?.(null);
    }
  }

  function doRender() {
    pruneAdopted();
    reconcileFocus();
    if (panel_root !== null && !rowOf(panel_root)) {
      closePanel(true);
    }
    render(deckTemplate(), deck_el);
    pane?.render();
  }

  /**
   * @param {Event} ev
   */
  function onClick(ev) {
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    const quiet_toggle = target.closest('.mon2-deck__quiet-toggle');
    if (quiet_toggle) {
      deck_state = { quiet_open: !deck_state.quiet_open };
      saveDeckState(deck_state);
      doRender();
      return;
    }
    const host = /** @type {HTMLElement|null} */ (
      target.closest('[data-root-dir]')
    );
    if (!host) {
      return;
    }
    const root_dir = host.getAttribute('data-root-dir') || '';
    const action = target.closest('[data-act]')?.getAttribute('data-act');
    if (action === 'worker') {
      options.gotoWorkerTab?.(root_dir);
      return;
    }
    if (action === 'auto') {
      void sendSwitch('worker-automation-toggle', root_dir, {
        on: queueFor(root_dir)?.auto_advance !== true
      });
      return;
    }
    if (action === 'merge') {
      void sendSwitch('worker-merge-auto-toggle', root_dir, {
        on: queueFor(root_dir)?.auto_merge !== true
      });
      return;
    }
    if (action === 'gear') {
      openPanel(root_dir);
      return;
    }
    toggleFocus(root_dir);
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onKeydown(ev) {
    if (ev.key !== 'Enter' && ev.key !== ' ') {
      return;
    }
    const target = /** @type {HTMLElement|null} */ (ev.target);
    if (!target || typeof target.closest !== 'function') {
      return;
    }
    const host = /** @type {HTMLElement|null} */ (
      target.closest('[data-root-dir][role="button"]')
    );
    if (!host || host !== target) {
      return;
    }
    ev.preventDefault();
    toggleFocus(host.getAttribute('data-root-dir') || '');
  }

  deck_el.addEventListener('click', onClick);
  deck_el.addEventListener('keydown', /** @type {any} */ (onKeydown));

  return {
    render: doRender,
    /** @returns {string|null} */
    focusRoot: () => focus_root,
    /** Test seam: which repo's `⚙` panel is open. */
    panelRoot: () => panel_root,
    destroy() {
      document.removeEventListener('keydown', onDocumentKeydown);
      deck_el.removeEventListener('click', onClick);
      deck_el.removeEventListener('keydown', /** @type {any} */ (onKeydown));
      panel_close.removeEventListener('click', onPanelClose);
      destroyPane();
      render(html``, deck_el);
      mount_element.replaceChildren();
    }
  };
}
