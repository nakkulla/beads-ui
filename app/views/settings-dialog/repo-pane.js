/**
 * The `저장소` tab of the per-repository settings window (UI-f2sy §7).
 *
 * The monitor's repo deck keeps only one `⚠ N` badge per tile; everything else a
 * repository owns beyond its execution profile lives here: the concurrency cap
 * and serial-lane count (editable), the declared base branch (read only), the
 * repo-operation declaration block the Worker tab draws inline, and the button
 * that opens the same timeline drawer the badge opens.
 *
 * The material is that repository's monitor pipeline entry. A repository whose
 * entry is absent still has its `workspaces_state` row, so only the two
 * concurrency controls are drawn for it (fail-quiet): the declaration, the base
 * and the timeline need the entry's `workspace_info`, `declared_base` and
 * `repo_operations`.
 *
 * Every mutation carries this repository's `root_dir` and its own revision, and a
 * CAS conflict is retried once on the revision the server answered with.
 */
import { html, render } from 'lit-html';
import { errorText } from '../../utils/error-text.js';
import { showToast } from '../../utils/toast.js';
import { createRepoOpsSettings } from '../worker/repo-ops-settings.js';

/** Lower bound of the concurrency cap, mirroring the server's `MIN_SLOTS`. */
const MIN_SLOTS = 1;

/** Upper bound of the fixed serial-lane set, mirroring the server's 1..5. */
const SERIAL_LANE_MAX = 5;

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @param {any} queue
 * @returns {number}
 */
function revisionOf(queue) {
  return isRecord(queue) && typeof queue.revision === 'number'
    ? queue.revision
    : 0;
}

/**
 * Mount the tab into `host`.
 *
 * @param {HTMLElement} host
 * @param {{
 *   root_dir: string,
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   stateRow: () => any,
 *   pipelineItem: () => any,
 *   adopted: () => any,
 *   onQueueAdopt: (queue: any) => void,
 *   onOpenRepoOps: () => void,
 *   notify?: (message: string) => void
 * }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createRepoPane(host, options) {
  const root_dir = options.root_dir;
  const notify =
    options.notify || ((message) => showToast(message, 'error', 4000));

  /**
   * The newest queue facts for the two concurrency controls. A mutation reply
   * wins only while it is not older than what the monitor pushed since.
   *
   * @returns {any}
   */
  function freshestQueue() {
    /** @type {any} */
    let best = null;
    for (const candidate of [
      options.adopted(),
      options.pipelineItem(),
      options.stateRow()
    ]) {
      if (
        isRecord(candidate) &&
        (best === null || revisionOf(candidate) > revisionOf(best))
      ) {
        best = candidate;
      }
    }
    return best;
  }

  /**
   * The decorated queue the declaration block reads: the pipeline entry, with
   * a mutation reply laid over it while the reply is not older. `null` when the
   * repository has no entry.
   *
   * @returns {any}
   */
  function entryQueue() {
    const item = options.pipelineItem();
    if (!isRecord(item)) {
      return null;
    }
    const adopted = options.adopted();
    return isRecord(adopted) && revisionOf(adopted) >= revisionOf(item)
      ? adopted
      : item;
  }

  /**
   * @param {unknown} res
   */
  function adopt(res) {
    const queue = isRecord(res) ? res.queue : null;
    if (isRecord(queue)) {
      options.onQueueAdopt(queue);
    }
  }

  /**
   * One repo-scoped CAS mutation. A conflict is retried ONCE on the revision the
   * reply carried, the way every other repo mutation on the monitor does.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @returns {Promise<any>}
   */
  async function sendCas(type, payload) {
    const attempt = () =>
      options.transport(type, {
        ...payload,
        root_dir,
        expected_revision: revisionOf(freshestQueue())
      });
    try {
      let res = await attempt();
      adopt(res);
      if (res && res.conflict) {
        res = await attempt();
        adopt(res);
      }
      return res;
    } catch (err) {
      notify(`저장소 설정 저장 실패: ${errorText(err)}`);
      return null;
    }
  }

  /**
   * @param {Event} ev
   */
  async function onSlotsChange(ev) {
    const input = /** @type {HTMLInputElement} */ (ev.target);
    const parsed = Number.parseInt(input.value, 10);
    if (Number.isFinite(parsed)) {
      await sendCas('worker-queue-set-slots', {
        slots: Math.max(MIN_SLOTS, parsed)
      });
    }
    doRender();
  }

  /**
   * A shrink that returns waiting entries to the parallel lane is announced, so
   * the move is never silent.
   *
   * @param {Event} ev
   */
  async function onSerialLanesChange(ev) {
    const select = /** @type {HTMLSelectElement} */ (ev.target);
    const count = Number.parseInt(select.value, 10);
    if (!Number.isInteger(count) || count < 1 || count > SERIAL_LANE_MAX) {
      doRender();
      return;
    }
    const lanes = freshestQueue()?.serial_lanes;
    const truncated = (Array.isArray(lanes) ? lanes : [])
      .slice(count)
      .reduce(
        (/** @type {number} */ sum, /** @type {any} */ lane) =>
          sum + (Array.isArray(lane?.entries) ? lane.entries.length : 0),
        0
      );
    const res = await sendCas('worker-queue-set-serial-lane-count', { count });
    if (res && res.applied && truncated > 0) {
      showToast(`직렬 레인 축소 — ${truncated}개 항목이 병렬 대기로 이동`);
    }
    doRender();
  }

  const repo_ops_settings = createRepoOpsSettings({
    queueStore: {
      get: () => entryQueue() || {},
      set: (queue) => options.onQueueAdopt(queue)
    },
    // The declaration block sends its own ops without a repository; this window
    // is bound to one, so the wrapper names it on every request.
    transport: (type, payload) =>
      options.transport(type, {
        .../** @type {Record<string, unknown>} */ (payload),
        root_dir
      }),
    // No `onOpenScript`: the script popup mounts on `document.body`, beneath a
    // modal dialog's top layer, so this window leaves that viewer to the
    // repository's Worker tab.
    onChanged: () => doRender()
  });

  /**
   * @param {any} queue
   * @returns {import('lit-html').TemplateResult|string}
   */
  function concurrencyRows(queue) {
    const slots = typeof queue.slots === 'number' ? queue.slots : null;
    const lane_count =
      typeof queue.serial_lane_count === 'number'
        ? queue.serial_lane_count
        : null;
    return html`${slots === null
      ? ''
      : html`<div class="settings-dialog__row">
          <span class="settings-dialog__row-label">동시 실행 수</span>
          <div class="settings-dialog__controls">
            <input
              type="number"
              class="ui-input"
              data-seam="repo-slots"
              aria-label="동시 실행 수"
              min=${MIN_SLOTS}
              step="1"
              title="동시에 실행할 세션 수 (최소 1 = 순차 실행)"
              .value=${String(slots)}
              @change=${onSlotsChange}
            />
          </div>
        </div>`}
    ${lane_count === null
      ? ''
      : html`<div class="settings-dialog__row">
          <span class="settings-dialog__row-label">직렬 레인 수</span>
          <div class="settings-dialog__controls">
            <select
              class="ui-select ui-select--bare"
              data-seam="repo-serial-lanes"
              aria-label="직렬 레인 수"
              title="고정 직렬 레인 수 (1~5). 축소 시 잘린 레인의 대기 항목은 병렬 대기로 돌아갑니다"
              @change=${onSerialLanesChange}
            >
              ${Array.from({ length: SERIAL_LANE_MAX }, (_, i) => i + 1).map(
                (n) =>
                  html`<option value=${String(n)} ?selected=${lane_count === n}>
                    ${n}
                  </option>`
              )}
            </select>
          </div>
        </div>`}`;
  }

  /**
   * @param {any} entry
   * @returns {import('lit-html').TemplateResult}
   */
  function baseRow(entry) {
    const base =
      typeof entry.declared_base === 'string' && entry.declared_base
        ? entry.declared_base
        : null;
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">base 브랜치</span>
      <div class="settings-dialog__controls">
        <span
          class="ui-chip"
          data-seam="repo-base"
          title=${base
            ? '이 저장소가 선언한 target base (읽기 전용)'
            : '선언 파일을 읽지 못했습니다 — target base 확인 불가'}
          >${base ?? '?'}</span
        >
      </div>
    </div>`;
  }

  /**
   * @returns {import('lit-html').TemplateResult}
   */
  function template() {
    const queue = freshestQueue();
    if (queue === null) {
      return html`<div class="settings-dialog__empty">
        저장소 상태를 불러오는 중…
      </div>`;
    }
    const entry = entryQueue();
    return html`<section class="settings-dialog__group" data-seam="repo-tab">
        <div class="settings-dialog__group-title">동시 실행</div>
        ${concurrencyRows(queue)} ${entry ? baseRow(entry) : ''}
      </section>
      ${entry
        ? html`<section
            class="settings-dialog__group"
            data-seam="repo-ops-group"
          >
            <div class="settings-dialog__group-title">저장소 작업</div>
            ${repo_ops_settings.template()}
            <div class="settings-dialog__controls">
              <button
                type="button"
                class="op-btn"
                data-seam="repo-ops-open"
                @click=${() => options.onOpenRepoOps()}
              >
                저장소 작업 기록 열기
              </button>
            </div>
          </section>`
        : ''}`;
  }

  function doRender() {
    render(template(), host);
  }

  return {
    render: doRender,
    destroy() {
      render(html``, host);
    }
  };
}
