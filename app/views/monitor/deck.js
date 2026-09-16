/**
 * 레포 데크 — 모니터 탭의 signature 줄 (UI-eey2 §4).
 *
 * 프로젝트 관리에서 고른 visible 레포를 **전부** 같은 타일로 한 줄에 세우고,
 * 각 레포의 "지금 상태"(슬롯 레일·건수)와 "제어"(자동화·머지·실행 설정)를 같은
 * 타일 안에 둔다. 소스는 집계 스냅샷의 `workspaces_state[]` 하나다 — 파이프라인이
 * 빈 레포까지 싣기 때문에 이 데크가 유일하게 모든 레포를 말할 수 있는 자리다.
 * 파이프라인 유무로 레포를 두 갈래(타일/접힌 줄)로 나누던 분류는 폐기했다
 * (UI-thwe): 지금 조용한 레포도 자동화·머지 스위치는 같은 자리에 있어야 한다.
 *
 * 마스터 `전체 자동화` 토글은 없다(스펙 §4.1) — 자동화는 레포별 스위치가 유일한
 * 제어다.
 *
 * 타일은 두 줄이다: 첫 줄이 정체(이름 · 부하 `n/m`+슬롯 레일 · Worker 이동),
 * 둘째 줄이 제어(자동화·머지·⚙ 스위치 · 0이 아닌 건수 · 실행 칩)다. 스위치의
 * 라벨은 버렸다 — 아이콘 셋이 고정이라 위치가 곧 뜻이고, 말은 `title`과
 * `aria-label`이 계속 싣는다. 둘째 줄은 타일 폭 안에서 줄바꿈한다 — 타일이
 * 옆으로 넓어지는 대신 아래로 한 줄 더 쓰는 쪽이, 모든 타일이 같은 독해 폭을
 * 지키는 유일한 방법이다. 전 레포 합계는 타일 옆이 아니라 데크 위 오른쪽
 * 끝 한 줄이다: 합계는 조작이 아니라 배경 사실이므로 타일 strip의 가로 폭을
 * 가져가면 안 된다. Strip 자체는 가로로 흐르지 않고 줄바꿈한다 — 화면 밖으로
 * 나간 타일은 데크가 말하지 못하는 레포다.
 *
 * 새 투영 필드가 없는 구버전 서버에서는 그 줄만 생략한다(스펙 §12): 모델 칩은
 * `execution_defaults`·`runner_catalog`·`session_defaults`가 **모두** 있을 때만
 * 그린다. `기본값 확인 불가` 같은 대체 문구를 만들지 않는다 — 없는 사실을
 * 있는 것처럼 말하는 것보다 침묵이 낫다.
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  formatImplReviewChip,
  formatOrchestrationChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { showToast } from '../../utils/toast.js';
import { modelRunnerOf } from '../detail-panel/exec-settings.js';
import {
  createExecutionPane,
  paneSectionSegmentTemplate
} from '../settings-dialog/execution-pane.js';
import { summaryChipsTemplate, tokenChipTemplate } from '../worker/lanes.js';
import {
  planBulkAccountApply,
  runBulkAccountApply
} from './bulk-account-apply.js';
import {
  defaultSelectedRoots,
  formatBulkResult,
  planBulkApply,
  retryRootsOf,
  runBulkApply
} from './bulk-preset-apply.js';
import { iconGear, iconMerge, iconPause, iconPlay } from './icons.js';
import { crossRepoTokenTotal, tokenTotalTooltip } from './usage.js';

/**
 * @import { LaneItem } from '../worker/lane-model.js'
 */

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
  const count = typeof value === 'number' && Number.isFinite(value) ? value : 0;
  if (
    key === 'queue' &&
    typeof row?.external_wait_count === 'number' &&
    Number.isFinite(row.external_wait_count)
  ) {
    return count + row.external_wait_count;
  }
  return count;
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
 * @returns {{ orchestration: { text: string, title: string }|null, worker: { text: string, title: string }|null, review: { text: string, title: string }|null }|null}
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
  const review = formatImplReviewChip(rows);
  return orchestration === null && worker === null && review === null
    ? null
    : { orchestration, worker, review };
}

/**
 * @typedef {Object} RepoDeckOptions
 * @property {() => Array<Record<string, any>>} workspacesState
 * @property {() => Array<Record<string, any>>} [workspaces] - Server wait judgments for visible repositories.
 * @property {(root_dir: string, bead_id: string) => void} [revealWaitSubject]
 * @property {() => Array<Pick<LaneItem, 'usage'>>} [doneItems] - 기간이 이미
 * 걸린 완료 아이템 (합계 줄의 `<기간> 완료 n`과 토큰).
 * @property {() => string} [rangeLabel]
 * @property {() => string} [rangeShort] - 좁은 폭의 짧은 기간 라벨 (UI-8gem §8).
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
  // 패널 머리의 `[워커|세션|계정]` 세그먼트. 템플릿은 execution-pane이 export하고
  // 이 자리는 lit 호스트로만 쓴다 — 다이얼로그 레일과 두 벌이 되지 않게 한다.
  const panel_seg = document.createElement('span');
  panel_seg.className = 'mon2-deck__panel-seg';
  const panel_close = document.createElement('button');
  panel_close.type = 'button';
  panel_close.className = 'mon2-deck__panel-close';
  panel_close.setAttribute('aria-label', '실행 설정 닫기');
  panel_close.textContent = '✕';
  panel_head.append(panel_title, panel_seg, panel_close);
  // 여러 저장소에 적용 절 (UI-8ncz §3). pane의 DOM 안이 아니라 머리와 몸체
  // 사이에 덱이 직접 그리는 lit 호스트 하나다 — pane은 열린 저장소 한 곳의
  // 편집기이고 이 절은 여러 저장소의 조작이라 소유자가 다르다.
  const panel_bulk = document.createElement('div');
  panel_bulk.className = 'mon2-deck__bulk';
  const panel_body = document.createElement('div');
  panel_body.className = 'mon2-deck__panel-body';
  panel_el.append(panel_head, panel_bulk, panel_body);
  mount_element.appendChild(panel_el);

  /** @type {string|null} */
  let focus_root = null;
  /** @type {string|null} */
  let panel_root = null;
  /** @type {ReturnType<typeof createExecutionPane>|null} */
  let pane = null;
  /** 패널이 지금 그리는 pane 구역 (`worker` start). */
  let panel_section = 'worker';
  /** mutation 응답이 실어 온 권위 있는 queue (레포별). */
  /** @type {Map<string, any>} */
  const adopted = new Map();

  /**
   * 일괄 적용 절이 고른 저장소. 두 절이 공유하고 패널이 열려 있는 동안만
   * 유지한다 — 기억하지 않는다 (§3.1).
   *
   * @type {Set<string>}
   */
  const bulk_selected = new Set();
  /** 절 자체의 프리셋 선택. pane의 프리셋 바와 상태를 공유하지 않는다. */
  let bulk_preset_choice = '';
  /**
   * Last run of each 절, 따로 유지한다 — 세그먼트를 바꿔도 남는다 (§3).
   *
   * @type {{ worker: import('./bulk-preset-apply.js').BulkResult[]|null, account: import('./bulk-preset-apply.js').BulkResult[]|null }}
   */
  let bulk_results = { worker: null, account: null };
  /**
   * 진행 중인 실행. `null`이면 절의 입력이 모두 활성이다.
   *
   * @type {{ done: number, total: number }|null}
   */
  let bulk_running = null;
  /**
   * 실행 취소 토큰. 패널을 닫거나 다른 `⚙`을 열거나 세그먼트를 바꾸면 값을
   * 올려 남은 대상을 보내지 않게 한다 (§4).
   */
  let bulk_token = 0;

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

  /**
   * End a run in flight. 이미 보낸 요청의 응답은 그대로 `adopt`되고 남은
   * 대상은 전송되지 않는다.
   */
  function cancelBulkRun() {
    bulk_token += 1;
    bulk_running = null;
  }

  /**
   * Fresh 절 상태 — 패널을 열 때 세운다. 기본 선택은 `auto_advance`가 켜진
   * 저장소이고 (§3.1) 선택은 패널 밖으로 기억되지 않는다.
   */
  function resetBulkState() {
    cancelBulkRun();
    bulk_selected.clear();
    for (const root_dir of defaultSelectedRoots(rows())) {
      bulk_selected.add(root_dir);
    }
    bulk_preset_choice = '';
    bulk_results = { worker: null, account: null };
  }

  /** @returns {{ revision: number, presets: Array<Record<string, any>> }|null} */
  function presetState() {
    const state = options.implPresetStore?.get();
    return isRecord(state) && Array.isArray(state.presets)
      ? /** @type {any} */ (state)
      : null;
  }

  /**
   * `adopted`를 덮은 최신 행들, 덱 행 순서 그대로. 일괄 계획은 이 목록으로만
   * revision을 읽는다.
   *
   * @returns {Array<Record<string, any>>}
   */
  function mergedRows() {
    return rows().map((row) => queueFor(row.root_dir));
  }

  /** Rows가 사라진 저장소는 선택에서도 뺀다 (§3.1). */
  function reconcileBulkSelection() {
    const visible = new Set(rows().map((row) => row.root_dir));
    for (const root_dir of [...bulk_selected]) {
      if (!visible.has(root_dir)) {
        bulk_selected.delete(root_dir);
      }
    }
  }

  /** @returns {import('./bulk-preset-apply.js').BulkPlan} */
  function presetPlan() {
    return planBulkApply({
      rows: mergedRows(),
      selected_roots: bulk_selected,
      preset_state: presetState(),
      preset_id: bulk_preset_choice,
      running: bulk_running !== null
    });
  }

  /** @returns {import('./bulk-account-apply.js').BulkAccountPlan} */
  function accountPlan() {
    const source = pane?.accountSettings() || null;
    return planBulkAccountApply({
      rows: mergedRows(),
      selected_roots: bulk_selected,
      source_root: panel_root || '',
      source_accounts: source,
      source_policy: panel_root
        ? queueFor(panel_root)?.provider_limit_policy
        : null,
      running: bulk_running !== null
    });
  }

  /**
   * Run one 절. 계획과 실행은 모듈이 소유하고 덱은 전송·채택·렌더만 넘긴다.
   *
   * @param {'worker'|'account'} section
   */
  async function startBulkRun(section) {
    const transport = options.transport;
    const plan = section === 'worker' ? presetPlan() : accountPlan();
    if (!transport || plan.disabled_reason !== null) {
      return;
    }
    cancelBulkRun();
    const token = bulk_token;
    const targets = plan.targets;
    bulk_results = { ...bulk_results, [section]: null };
    bulk_running = { done: 0, total: targets.length };
    doRender();
    const input = {
      targets: /** @type {any} */ (targets),
      send: (/** @type {string} */ type, /** @type {any} */ payload) =>
        transport(/** @type {any} */ (type), payload),
      adopt: (/** @type {string} */ root_dir, /** @type {any} */ queue) => {
        adopted.set(root_dir, queue);
      },
      onProgress: (/** @type {any} */ progress) => {
        if (token !== bulk_token) {
          return;
        }
        bulk_running = { done: progress.done, total: progress.total };
        bulk_results = { ...bulk_results, [section]: [...progress.results] };
        doRender();
      },
      isCancelled: () => token !== bulk_token
    };
    const results =
      section === 'worker'
        ? await runBulkApply(input)
        : await runBulkAccountApply(input);
    if (token !== bulk_token) {
      return;
    }
    bulk_running = null;
    bulk_results = { ...bulk_results, [section]: results };
    doRender();
    // 세션 기본값 baseline은 pane이 들고 있으므로 열린 저장소가 대상이었으면
    // 다시 읽는다. 계정 절의 원본 저장소는 대상이 아니라 부르지 않는다 (§4.2).
    if (
      section === 'worker' &&
      panel_root !== null &&
      targets.some((target) => target.root_dir === panel_root)
    ) {
      void pane?.load();
    }
  }

  /**
   * @param {string} root_dir
   * @param {boolean} checked
   */
  function onBulkRepoToggle(root_dir, checked) {
    if (checked) {
      bulk_selected.add(root_dir);
    } else {
      bulk_selected.delete(root_dir);
    }
    doRender();
  }

  /**
   * @param {'worker'|'account'} section
   */
  function onBulkRetry(section) {
    const results = bulk_results[section];
    if (!results) {
      return;
    }
    const retry_roots = retryRootsOf(results);
    bulk_selected.clear();
    for (const root_dir of retry_roots) {
      bulk_selected.add(root_dir);
    }
    doRender();
  }

  /**
   * Checkbox list of 적용 대상. 계정 절에서는 열린 저장소가 복사 원본이라
   * 체크할 수 없다.
   *
   * @param {string|null} source_root
   * @returns {import('lit-html').TemplateResult}
   */
  function bulkTargetsTemplate(source_root) {
    return html`<fieldset class="mon2-deck__bulk-targets">
      <legend>적용 대상</legend>
      ${rows().map((row) => {
        const is_source = source_root !== null && row.root_dir === source_root;
        return html`<label
          class="mon2-deck__bulk-repo"
          title=${is_source ? '복사 원본 저장소' : row.root_dir}
        >
          <input
            type="checkbox"
            data-bulk-repo=${row.root_dir}
            .checked=${live(bulk_selected.has(row.root_dir) && !is_source)}
            ?disabled=${is_source || bulk_running !== null}
            @change=${(/** @type {Event} */ ev) =>
              onBulkRepoToggle(
                row.root_dir,
                /** @type {HTMLInputElement} */ (ev.target).checked
              )}
          />
          <span>${is_source ? `${row.name}(원본)` : row.name}</span>
        </label>`;
      })}
    </fieldset>`;
  }

  /**
   * Primary 버튼 — 라벨이 대상 수를 말하고 비활성 사유는 `title`이 말한다.
   *
   * @param {'worker'|'account'} section
   * @param {import('./bulk-preset-apply.js').BulkPlan|import('./bulk-account-apply.js').BulkAccountPlan} plan
   * @returns {import('lit-html').TemplateResult}
   */
  function bulkApplyButtonTemplate(section, plan) {
    const running = bulk_running !== null;
    return html`<button
      type="button"
      class="op-btn op-btn--primary mon2-deck__bulk-apply"
      data-bulk-apply=${section}
      title=${plan.disabled_reason || ''}
      ?disabled=${plan.disabled_reason !== null}
      @click=${() => void startBulkRun(section)}
    >
      ${running && bulk_running
        ? `적용 중 ${bulk_running.done}/${bulk_running.total}`
        : `선택 ${plan.targets.length}곳에 적용`}
    </button>`;
  }

  /**
   * One line per 저장소 — 재료(실행 결과)가 없으면 그리지 않는다.
   *
   * @param {'worker'|'account'} section
   * @returns {import('lit-html').TemplateResult|''}
   */
  function bulkResultsTemplate(section) {
    const results = bulk_results[section];
    if (!results || results.length === 0) {
      return '';
    }
    const retryable = retryRootsOf(results).length > 0;
    return html`<div class="mon2-deck__bulk-results" data-bulk-results>
      ${results.map((result) => {
        const line = formatBulkResult(result);
        return html`<span
          class=${`mon2-deck__bulk-result is-${result.state}`}
          data-bulk-result=${result.root_dir}
          >${line.icon} ${line.text}</span
        >`;
      })}
      ${retryable
        ? html`<button
            type="button"
            class="op-btn mon2-deck__bulk-retry"
            data-bulk-retry=${section}
            ?disabled=${bulk_running !== null}
            @click=${() => onBulkRetry(section)}
          >
            실패·부분 적용 저장소만 다시 적용
          </button>`
        : ''}
    </div>`;
  }

  /**
   * Preset 절 (§3.1). 목록은 pane과 같은 `implPresetStore`를 읽되 선택 상태는
   * 공유하지 않는다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function bulkPresetTemplate() {
    const state = presetState();
    const plan = presetPlan();
    return html`<div class="mon2-deck__bulk-hd">
        <span class="mon2-deck__bulk-label">여러 저장소에 적용</span>
        <select
          class="mon2-deck__bulk-preset"
          aria-label="여러 저장소에 적용할 실행 프리셋"
          data-bulk-preset
          ?disabled=${bulk_running !== null}
          @change=${(/** @type {Event} */ ev) => {
            bulk_preset_choice = String(
              /** @type {HTMLSelectElement} */ (ev.target).value
            );
            doRender();
          }}
        >
          <option value="" ?selected=${bulk_preset_choice === ''}>
            실행 프리셋…
          </option>
          ${(state?.presets || []).map(
            (preset) =>
              html`<option
                value=${preset.id}
                ?selected=${preset.id === bulk_preset_choice}
                ?disabled=${preset.compatible === false}
                title=${preset.compatible === false
                  ? preset.incompatibility_reason || ''
                  : ''}
              >
                ${preset.name}
              </option>`
          )}
        </select>
        ${bulkApplyButtonTemplate('worker', plan)}
      </div>
      ${bulkTargetsTemplate(null)} ${bulkResultsTemplate('worker')}`;
  }

  /**
   * One runner의 한도 정책을 원본 요약 줄의 한 조각으로 적는다.
   *
   * @param {string} label
   * @param {any} policy
   * @returns {string}
   */
  function limitSummary(label, policy) {
    const mode = policy?.mode === 'wait' ? 'wait' : 'switch';
    const accounts = Array.isArray(policy?.accounts) ? policy.accounts : [];
    const pct = policy?.preempt_pct;
    const head = mode === 'wait' ? '기다림' : `전환(${accounts.length}계정)`;
    const preempt =
      typeof pct === 'number' && Number.isInteger(pct) && pct >= 1 && pct <= 99
        ? ` · 선제 ${pct}%`
        : '';
    return `${label} ${head}${preempt}`;
  }

  /**
   * Account 절 (§3.2). 복사 원본은 열린 저장소이고 요약 줄이 지금 복사될 값을
   * 말한다.
   *
   * @returns {import('lit-html').TemplateResult}
   */
  function bulkAccountTemplate() {
    const plan = accountPlan();
    const source = pane?.accountSettings() || null;
    const policy = panel_root
      ? queueFor(panel_root)?.provider_limit_policy
      : null;
    /** @type {string[]} */
    const parts = [];
    for (const [key, label] of /** @type {Array<[string, string]>} */ ([
      ['claude_account', 'Claude'],
      ['codex_account', 'Codex']
    ])) {
      // pane의 select와 같은 라벨(카탈로그 `claudeLabel`/`codexLabel`), 카탈로그에
      // 없는 값은 키 그대로 — pane이 계산해 `labels`로 준다 (§3.2).
      const shown = source?.labels?.[key];
      parts.push(
        `${label} ${typeof shown === 'string' && shown.length > 0 ? shown : '기본값'}`
      );
    }
    if (isRecord(policy)) {
      parts.push(
        `한도 ${limitSummary('Claude', policy.claude)}`,
        limitSummary('Codex', policy.codex)
      );
    }
    return html`<div class="mon2-deck__bulk-hd">
        <span class="mon2-deck__bulk-label">여러 저장소에 적용</span>
        <span class="mon2-deck__bulk-copy"
          >${rowOf(panel_root || '')?.name || ''}의 계정 설정을 복사</span
        >
        ${bulkApplyButtonTemplate('account', plan)}
      </div>
      <div class="mon2-deck__bulk-source" data-bulk-source>
        ${parts.join(' · ')}
      </div>
      ${bulkTargetsTemplate(panel_root)} ${bulkResultsTemplate('account')}`;
  }

  /**
   * Which 절을 그릴지는 세그먼트가 정한다 — `세션`에는 재료가 없어 아무것도
   * 그리지 않는다.
   */
  function renderBulkSection() {
    if (panel_root === null || panel_section === 'session') {
      render(html``, panel_bulk);
      panel_bulk.hidden = true;
      return;
    }
    panel_bulk.hidden = false;
    render(
      panel_section === 'worker' ? bulkPresetTemplate() : bulkAccountTemplate(),
      panel_bulk
    );
  }

  /** @param {string} root_dir */
  function openPanel(root_dir) {
    if (panel_root === root_dir) {
      closePanel();
      return;
    }
    // 다른 `⚙`을 여는 것은 진행 중 실행을 끝낸다 (§4) — 새 절 상태를 세우기
    // 전에 남은 대상의 전송을 먼저 막는다.
    cancelBulkRun();
    destroyPane();
    panel_root = root_dir;
    const row = rowOf(root_dir);
    panel_title.textContent = `${row?.name || root_dir} 실행 설정`;
    panel_section = 'worker';
    resetBulkState();
    renderPanelSegment();
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
      },
      // 계정 읽기·편집·저장 확인이 절의 원본 요약과 비활성 상태를 바꾼다
      // (§3.2) — 다음 스냅샷 렌더를 기다리지 않고 바로 다시 그린다.
      onAccountSettingsChange: () => {
        if (panel_root === root_dir) {
          renderBulkSection();
        }
      }
    });
    // 계정 절의 원본은 pane이 서버 확인 뒤 들고 있는 baseline이라, 첫 load가
    // 끝난 뒤 절을 한 번 더 그린다 (§3.2).
    void pane.load().then(() => {
      if (panel_root === root_dir) {
        renderBulkSection();
      }
    });
    doRender();
  }

  function destroyPane() {
    pane?.destroy();
    pane = null;
  }

  /** Draw the panel's section segment against the section now on screen. */
  function renderPanelSegment() {
    render(
      paneSectionSegmentTemplate(panel_section, selectPanelSection),
      panel_seg
    );
  }

  /**
   * @param {string} section - One of the pane's own section ids.
   */
  function selectPanelSection(section) {
    panel_section = section;
    // 세그먼트 전환은 진행 중 실행을 끝낸다 (§4) — 선택 집합과 절별 결과는
    // 그대로 둔다.
    cancelBulkRun();
    renderPanelSegment();
    renderBulkSection();
    pane?.render(section);
  }

  /**
   * @param {boolean} [silent] - `true`면 다시 그리지 않는다 (렌더 안에서 부를 때).
   */
  function closePanel(silent) {
    // 패널을 닫으면 진행 중 실행은 남은 대상을 보내지 않고 끝난다 (§4).
    cancelBulkRun();
    destroyPane();
    panel_root = null;
    panel_el.hidden = true;
    panel_title.textContent = '';
    render(html``, panel_seg);
    render(html``, panel_bulk);
    panel_bulk.hidden = true;
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
      ${chips.review
        ? html`<span class="mon2-deck__chip" title=${chips.review.title}
            >구현 리뷰 ${chips.review.text}</span
          >`
        : ''}
    </div>`;
  }

  /**
   * D6 `head_relation` in the words the header uses.
   *
   * @type {Record<string, string>}
   */
  const HEALTH_RELATION_LABELS = {
    equal: '동기',
    behind: '뒤처짐',
    ahead: '앞섬',
    diverged: '갈라짐'
  };

  /**
   * D6 `error_code` in the words the header uses.
   *
   * @type {Record<string, string>}
   */
  const HEALTH_ERROR_LABELS = {
    missing_checkout: '체크아웃 없음',
    invalid_target: '기준 대상 확인 불가',
    fetch_failed: '원격 갱신 실패',
    judge_failed: '판정 실패',
    invalid_result: '결과 형식 오류'
  };

  /** The dirty classes the header names, in the order it names them. */
  const HEALTH_CLASS_LABELS = [
    ['conflict', '충돌'],
    ['staged', 'staged'],
    ['unmerged', 'unmerged']
  ];

  /**
   * One class count. A truncated record shows `3+` because the collector stopped
   * counting, and the classes are NEVER summed — one path can sit in more than
   * one class, so a total would name a file count that does not exist.
   *
   * @param {number} count
   * @param {boolean} truncated
   * @returns {string}
   */
  function healthCount(count, truncated) {
    return truncated ? `${count}+` : String(count);
  }

  /**
   * The observation age, in the coarsest unit that is still true.
   *
   * @param {string} observed_at
   * @param {number} now
   * @returns {string}
   */
  function healthAge(observed_at, now) {
    const at = Date.parse(observed_at);
    if (Number.isNaN(at)) {
      return '';
    }
    const minutes = Math.max(0, Math.floor((now - at) / 60_000));
    if (minutes < 60) {
      return `${minutes}분 전`;
    }
    const hours = Math.floor(minutes / 60);
    return hours < 24 ? `${hours}시간 전` : `${Math.floor(hours / 24)}일 전`;
  }

  /**
   * The repo header's health group (UI-y9hl U2).
   *
   * dotfiles collects the record every 15 minutes and this only reads it — the
   * deck runs no git command of its own. `unknown` renders an explicit
   * explanation of the missing observation
   * rather than a guess, and an old record keeps its last error instead of
   * reading as currently healthy.
   *
   * @param {any} row
   * @returns {import('lit-html').TemplateResult|''}
   */
  function healthTemplate(row) {
    const health = isRecord(row?.repo_health) ? row.repo_health : null;
    const state = health ? health.state : 'unknown';
    if (!health || state === 'unknown') {
      return html`<span
        class="mon2-deck__health is-unknown"
        title="저장소 건강 점검의 유효한 기록을 아직 확인하지 못했습니다. 기록 부재·조회 중·조회 실패가 포함되며, 실행 설정 오류를 뜻하지 않습니다."
        >건강 점검 정보 없음</span
      >`;
    }
    const age =
      typeof health.observed_at === 'string'
        ? healthAge(health.observed_at, Date.now())
        : '';
    /** @type {string[]} */
    const parts = [];
    if (state === 'error' || state === 'stale') {
      const label = HEALTH_ERROR_LABELS[health.error_code];
      if (label) {
        parts.push(`수집 실패 ${label}`);
      }
    }
    if (typeof health.head_relation === 'string') {
      const relation = HEALTH_RELATION_LABELS[health.head_relation];
      const drift = [
        typeof health.behind === 'number' && health.behind > 0
          ? `-${health.behind}`
          : '',
        typeof health.ahead === 'number' && health.ahead > 0
          ? `+${health.ahead}`
          : ''
      ].filter((part) => part.length > 0);
      parts.push([relation || health.head_relation, ...drift].join(' '));
    }
    const classes = isRecord(health.classes) ? health.classes : null;
    if (classes) {
      for (const [key, label] of HEALTH_CLASS_LABELS) {
        const count = classes[key];
        if (typeof count === 'number' && count > 0) {
          parts.push(
            `${label} ${healthCount(count, health.truncated === true)}`
          );
        }
      }
    }
    if (state === 'stale') {
      parts.push('오래된 관찰값');
    }
    if (age.length > 0) {
      parts.push(age);
    }
    if (parts.length === 0) {
      return '';
    }
    return html`<span
      class=${`mon2-deck__health is-${state}`}
      title=${`저장소 건강 — ${health.truncated === true ? '수치는 잘려 이상값입니다' : '15분마다 dotfiles가 기록합니다'}`}
      >${parts.join(' · ')}</span
    >`;
  }

  /**
   * The tile's count line. 0인 항목은 쓰지 않는다 — `대기 0 · PR 0`은 자리만
   * 차지하고 아무 사실도 더하지 않는다. 전부 0이면 줄 자체가 비고, 부하는
   * 첫 줄의 슬롯 레일이 이미 말한다.
   *
   * @param {any} row
   * @returns {string}
   */
  function tileCounts(row) {
    /** @type {string[]} */
    const parts = [];
    for (const [key, label] of /** @type {Array<[string, string]>} */ ([
      ['queue', '대기'],
      ['pr_wait', 'PR'],
      ['session_active', '세션']
    ])) {
      const value = countOf(row, key);
      if (value > 0) {
        parts.push(`${label} ${value}`);
      }
    }
    return parts.join(' · ');
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
        <span
          class="mon2-deck__load"
          title=${`슬롯 ${slots}개 중 ${running}개 실행 중`}
        >
          <span class="mon2-deck__load-n">${running}/${slots}</span>
          ${slotRail(running, slots)}
        </span>
        <button
          type="button"
          class="mon2-deck__worker"
          data-act="worker"
          aria-label=${`${row.name} Worker 탭으로 이동`}
          title="이 레포의 Worker 탭으로 이동"
        >
          ↗
        </button>
      </div>
      <div class="mon2-deck__tile-ft">
        <div class="mon2-deck__ops">${switchesTemplate(row)}</div>
        <span class="mon2-deck__counts">${tileCounts(row)}</span>
        ${healthTemplate(row)} ${chipsTemplate(row)}
      </div>
    </div>`;
  }

  /**
   * The totals bar (§4.1): 전 레포 합계와 provider별 토큰. 마스터 토글은 없다.
   *
   * 데크 위 오른쪽 끝에 한 줄로 선다 — 합계는 조작이 아니라 배경 사실이라
   * 타일 strip의 가로 폭을 가져가면 안 된다.
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
    const range_short = options.rangeShort ? options.rangeShort() : range_label;
    return html`<div class="mon2-deck__bar">
      <div
        class="mon2-deck__total-counts"
        title=${`visible 레포 ${list.length}곳의 합계입니다 — 실행·PR은 지금, 완료는 ${range_label}`}
      >
        ${summaryChipsTemplate({
          running: sum('running'),
          pr_wait: sum('pr_wait'),
          done: Array.isArray(done_items) ? done_items.length : 0,
          range_label,
          range_short,
          workspaces: list.map((row) => ({
            root_dir: row.root_dir,
            name: row.name,
            wait_reasons: (options.workspaces
              ? options.workspaces()
              : list
            ).find((workspace) => workspace.root_dir === row.root_dir)
              ?.wait_reasons
          })),
          ...(options.revealWaitSubject
            ? { reveal: options.revealWaitSubject }
            : {}),
          session: sum('session_active')
        })}
      </div>
      ${total === null
        ? ''
        : html`<span class="mon2-deck__total-tokens">
            ${typeof total === 'string'
              ? html`<span
                  class="mon2-deck__tok"
                  title=${tokenTotalTooltip(range_label)}
                  >${tokenChipTemplate(total)}</span
                >`
              : total.map(
                  (badge) =>
                    html`<span
                      class="mon2-deck__tok"
                      data-provider=${badge.provider}
                      title=${badge.tooltip}
                      >${tokenChipTemplate(badge.label)}</span
                    >`
                )}
          </span>`}
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
    return html`${totalTemplate(list)}
      <div class="mon2-deck__strip">
        ${list.map((row) => tileTemplate(row))}
      </div>`;
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
    // 행이 사라지면 선택에서도 빠지고 (§3.1) 절은 최신 행·`adopted` revision으로
    // 다시 그린다.
    reconcileBulkSelection();
    renderBulkSection();
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
