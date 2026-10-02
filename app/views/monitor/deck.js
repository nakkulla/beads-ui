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
import { errorText } from '../../utils/error-text.js';
import {
  formatImplReviewChip,
  formatOrchestrationChip,
  formatQuickFixChip,
  formatWorkerChip
} from '../../utils/exec-settings-chip.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { showToast } from '../../utils/toast.js';
import { modelRunnerOf } from '../detail-panel/exec-settings.js';
import {
  repoOpsStripModel,
  summaryChipsTemplate,
  tokenChipTemplate
} from '../worker/lanes.js';
import { pruneAdopted as dropCaughtUp, mergeQueue } from './adopted-queue.js';
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

/** Queue-level orchestration keys a row carries on top of the kv layer. */
const QUEUE_ORCHESTRATION_KEYS = [
  'orchestration_model',
  'orchestration_effort',
  'orchestration_speed',
  'quick_fix_orchestration_model',
  'quick_fix_orchestration_effort',
  'quick_fix_orchestration_speed'
];

/**
 * One repo's 오케/워커/구현 리뷰/qf exec chips. 재료(투영 3종)가 하나라도 없으면
 * `null`이다.
 *
 * @param {any} row
 * @returns {{ orchestration: { text: string, title: string }|null, worker: { text: string, title: string }|null, review: { text: string, title: string }|null, quick_fix: { text: string, title: string }|null }|null}
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
  for (const key of QUEUE_ORCHESTRATION_KEYS) {
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
  const quick_fix = formatQuickFixChip(
    resolveExecutionSettings({
      global: global_values,
      execution_defaults: row.execution_defaults,
      runner_catalog: row.runner_catalog,
      route: 'quick_fix'
    }),
    row.runner_catalog,
    {
      impl_model_set:
        typeof global_values.quick_fix_impl_model === 'string' &&
        global_values.quick_fix_impl_model.length > 0
    }
  );
  return orchestration === null &&
    worker === null &&
    review === null &&
    quick_fix === null
    ? null
    : { orchestration, worker, review, quick_fix };
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
 * @property {HTMLElement} [searchElement] - 합계 줄 오른쪽에 끼우는 이슈 검색
 * 상자 (UI-f2sy §6.3). 영속 노드라 합계가 다시 그려져도 입력 포커스가 남는다.
 * @property {(root_dir: string) => void} [gotoWorkerTab] - 그 레포로
 * `switchWorkspace` 후 Worker 탭으로 넘어가는 경로 (§11).
 * @property {(root_dir: string|null) => void} [onFocusChange] - Focus filter
 * change notice. 흐림 클래스는 모니터 뷰가 소유한다.
 * @property {(root_dir: string) => void} [openSettings] - 그 저장소로 설정
 * 다이얼로그를 여는 경로 (UI-e1ta §7).
 * @property {() => void} [closeSettings] - 열려 있는 창을 닫는 경로; toggle과
 * 행 소멸이 함께 쓴다.
 * @property {() => string|null} [settingsRoot] - 지금 창이 묶인 root_dir, 또는
 * null.
 * @property {(root_dir: string) => { operations: any, cleanup_failures: any }|null} [repoOps] -
 * 그 저장소 파이프라인 항목의 저장소 작업 재료. 항목이 없으면 null이고 그 타일은
 * `⚠ N`을 그리지 않는다 (UI-f2sy §7).
 * @property {(root_dir: string) => void} [openRepoOps] - 그 저장소의 타임라인
 * drawer를 여는 경로 (`⚠ N` 클릭).
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

  // lit이 소유하는 렌더 호스트. 레포 `⚙`는 헤더 `⚙`와 같은 설정 다이얼로그를
  // 그 저장소 단일 모드로 열므로 (UI-e1ta §7) 덱 안에는 패널 껍데기가 없다.
  const deck_el = document.createElement('div');
  deck_el.className = 'mon2-deck__main';
  mount_element.appendChild(deck_el);

  /** @type {string|null} */
  let focus_root = null;
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
    dropCaughtUp(adopted, rows());
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
      notify(`설정 저장 실패: ${errorText(err)}`);
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
   * Which repo the settings dialog is showing right now — the dialog owns that
   * fact, the deck only reads it to mark its own `⚙` (UI-e1ta §7).
   *
   * @returns {string|null}
   */
  function openRoot() {
    const root = options.settingsRoot ? options.settingsRoot() : null;
    return typeof root === 'string' && root.length > 0 ? root : null;
  }

  /**
   * Open the settings dialog on this repo, or close it when it is already
   * showing this repo (§7).
   *
   * @param {string} root_dir
   */
  function toggleSettings(root_dir) {
    if (openRoot() === root_dir) {
      options.closeSettings?.();
    } else {
      options.openSettings?.(root_dir);
    }
    doRender();
  }

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
        class=${`op-btn op-btn--icon mon2-deck__op mon2-deck__auto${auto ? ' is-on' : ''}`}
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
        class=${`op-btn op-btn--icon mon2-deck__op mon2-deck__merge${merge ? ' is-on' : ''}`}
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
        class=${`op-btn op-btn--icon mon2-deck__op mon2-deck__gear${openRoot() === row.root_dir ? ' is-on' : ''}`}
        data-act="gear"
        aria-haspopup="dialog"
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
        ? html`<span
            class="ui-chip mon2-deck__chip"
            title=${chips.orchestration.title}
            >오케 ${chips.orchestration.text}</span
          >`
        : ''}
      ${chips.worker
        ? html`<span class="ui-chip mon2-deck__chip" title=${chips.worker.title}
            >워커 ${chips.worker.text}</span
          >`
        : ''}
      ${chips.review
        ? html`<span class="ui-chip mon2-deck__chip" title=${chips.review.title}
            >구현 리뷰 ${chips.review.text}</span
          >`
        : ''}
      ${chips.quick_fix
        ? html`<span
            class="ui-chip mon2-deck__chip"
            title=${chips.quick_fix.title}
            >qf ${chips.quick_fix.text}</span
          >`
        : ''}
    </div>`;
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
   * The `⚠ N` badge (UI-f2sy §7): 해결 필요 저장소 작업 수. N은 Worker 탭 저장소
   * 작업 띠가 세는 그 판정(`repoOpsStripModel`)이고, 재료가 없거나 0이면 그리지
   * 않는다. 누르면 그 저장소의 타임라인 서랍이 열린다.
   *
   * @param {any} row
   * @returns {import('lit-html').TemplateResult|''}
   */
  function repoOpsBadge(row) {
    const material = options.repoOps ? options.repoOps(row.root_dir) : null;
    if (!material) {
      return '';
    }
    const model = repoOpsStripModel(
      material.operations,
      material.cleanup_failures
    );
    if (!model || model.unresolved <= 0) {
      return '';
    }
    return html`<button
      type="button"
      class="op-btn op-btn--warn mon2-deck__repo-ops"
      data-act="repo-ops"
      aria-label=${`${row.name} 해결 필요 저장소 작업 ${model.unresolved}건`}
      title="해결 필요 저장소 작업 — 눌러서 이 저장소의 작업 기록을 엽니다"
    >
      ⚠ ${model.unresolved}
    </button>`;
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
          class="op-btn op-btn--icon mon2-deck__worker"
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
        ${repoOpsBadge(row)} ${chipsTemplate(row)}
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
      ${options.searchElement ? options.searchElement : ''}
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
    // 열린 저장소 행이 목록에서 사라지면 그 창은 말할 대상이 없다 (§7).
    const open_root = openRoot();
    if (open_root !== null && !rowOf(open_root)) {
      options.closeSettings?.();
    }
    render(deckTemplate(), deck_el);
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
      toggleSettings(root_dir);
      return;
    }
    if (action === 'repo-ops') {
      options.openRepoOps?.(root_dir);
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
    destroy() {
      document.removeEventListener('keydown', onDocumentKeydown);
      deck_el.removeEventListener('click', onClick);
      deck_el.removeEventListener('keydown', /** @type {any} */ (onKeydown));
      render(html``, deck_el);
      mount_element.replaceChildren();
    }
  };
}
