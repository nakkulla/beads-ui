/**
 * Worker-tab "병렬성 분석" dialog (UI-04vo §9).
 *
 * The analyzer is a button, never a background pass: opening this dialog shows
 * the last-good result, and only an explicit 분석/재분석 click starts a run.
 * Each recommended group renders as an EDITABLE draft — reorder, exclude a
 * member, restore the suggestion — but the draft is only ever an input to the
 * server: submit sends the pinned digest, the group index, the target lane, and
 * the drafted order, and the server re-validates all of it before one queue
 * CAS. Submit eligibility is the server's stamped `eligible` flag, never a
 * judgment recomputed here, so the button and the gate cannot disagree.
 *
 * @typedef {{ get: () => any, set: (q: any) => void, subscribe?: (fn: () => void) => () => void }} QueueStore
 * @typedef {{ get: () => any, set: (s: any) => void, subscribe?: (fn: () => void) => () => void }} AnalysisStore
 * @typedef {Object} ParallelAnalysisOptions
 * @property {QueueStore} queueStore
 * @property {AnalysisStore} analysisStore
 * @property {(type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>} [transport]
 */
import { html, render } from 'lit-html';
import { showToast } from '../../utils/toast.js';

/** @type {Set<string>} Attempt statuses that no longer own their bead. */
const TERMINAL_ATTEMPT_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped',
  'discarded'
]);

/**
 * Create the parallelism-analysis dialog (native `<dialog>`), mirroring the
 * exec-defaults dialog's shell: mount-once, showModal with a jsdom fallback,
 * store subscription while open, and an explicit destroy.
 *
 * @param {HTMLElement} mount_element
 * @param {ParallelAnalysisOptions} options
 * @returns {{ open: () => void, close: () => void, destroy: () => void }}
 */
export function createParallelAnalysisDialog(mount_element, options) {
  const { queueStore, analysisStore, transport } = options;

  const dialog = /** @type {HTMLDialogElement} */ (
    document.createElement('dialog')
  );
  dialog.id = 'worker-parallel-analysis-dialog';
  dialog.className = 'pa';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  mount_element.appendChild(dialog);

  /**
   * Per-group browser-local draft: the edited member order. Absent means "the
   * analyzer's suggestion, unedited" — restoring is deleting the entry rather
   * than copying the suggestion back, so a later result never resurrects an
   * edit made against an older one.
   *
   * @type {Map<number, string[]>}
   */
  const drafts = new Map();
  /** @type {Map<number, string>} Per-group target lane selection. */
  const lane_choice = new Map();
  /** @type {boolean} Whether a start/submit request is in flight. */
  let pending = false;

  /**
   * @returns {any}
   */
  function currentQueue() {
    return (
      (queueStore && queueStore.get()) || {
        revision: 0,
        queue: [],
        serial_lanes: [],
        serial_lane_count: 0,
        attempts: {},
        pr_wait: []
      }
    );
  }

  /**
   * @returns {any}
   */
  function currentAnalysis() {
    return (
      (analysisStore && analysisStore.get()) || {
        settings: { revision: 0, runner: null, model: null, effort: null },
        job: null,
        last_good: null
      }
    );
  }

  /**
   * Beads a submit could not move: anything with a live attempt, a durable PR
   * wait, or an in-flight discard. Read from the queue snapshot the view
   * already has — the server re-checks the same thing at submit time.
   *
   * @returns {Set<string>}
   */
  function activeBeadIds() {
    const q = currentQueue();
    /** @type {Set<string>} */
    const out = new Set();
    for (const attempt of Object.values(q.attempts || {})) {
      const a = /** @type {any} */ (attempt);
      if (
        a &&
        typeof a.bead_id === 'string' &&
        !TERMINAL_ATTEMPT_STATUSES.has(a.status)
      ) {
        out.add(a.bead_id);
      }
    }
    for (const entry of Array.isArray(q.pr_wait) ? q.pr_wait : []) {
      if (entry && typeof entry.bead_id === 'string') {
        out.add(entry.bead_id);
      }
    }
    for (const operation of Object.values(q.discard_operations || {})) {
      const d = /** @type {any} */ (operation);
      if (d && d.phase !== 'done' && typeof d.bead_id === 'string') {
        out.add(d.bead_id);
      }
    }
    return out;
  }

  /**
   * The lane a bead currently waits in, or null.
   *
   * @param {string} bead_id
   * @returns {string|null}
   */
  function laneOf(bead_id) {
    const q = currentQueue();
    for (const lane of Array.isArray(q.serial_lanes) ? q.serial_lanes : []) {
      if (
        Array.isArray(lane?.entries) &&
        lane.entries.some((/** @type {any} */ e) => e.bead_id === bead_id)
      ) {
        return lane.id;
      }
    }
    return (Array.isArray(q.queue) ? q.queue : []).some(
      (/** @type {any} */ e) => e.bead_id === bead_id
    )
      ? 'parallel'
      : null;
  }

  /**
   * The draft member order for one group.
   *
   * @param {number} index
   * @param {any} group
   * @returns {string[]}
   */
  function draftOf(index, group) {
    const drafted = drafts.get(index);
    return drafted ? drafted : [...group.order];
  }

  /**
   * Whether the lanes already hold exactly this group, in this order.
   *
   * @param {string[]} order
   * @returns {boolean}
   */
  function alreadyApplied(order) {
    if (order.length < 2) {
      return false;
    }
    const lane = laneOf(order[0]);
    if (!lane || lane === 'parallel') {
      return false;
    }
    const q = currentQueue();
    const entries = (Array.isArray(q.serial_lanes) ? q.serial_lanes : [])
      .find((/** @type {any} */ l) => l.id === lane)
      ?.entries.map((/** @type {any} */ e) => e.bead_id);
    if (!Array.isArray(entries)) {
      return false;
    }
    const positions = order.map((id) => entries.indexOf(id));
    return (
      positions.every((at) => at >= 0) &&
      positions.every((at, i) => i === 0 || at > positions[i - 1])
    );
  }

  /**
   * The first serial lane with no waiting entries — the submit default.
   *
   * @returns {string}
   */
  function firstEmptyLane() {
    const q = currentQueue();
    const lanes = Array.isArray(q.serial_lanes) ? q.serial_lanes : [];
    const empty = lanes.find(
      (/** @type {any} */ lane) =>
        Array.isArray(lane.entries) && lane.entries.length === 0
    );
    return empty ? empty.id : lanes[0]?.id || 's1';
  }

  /**
   * @param {string} bead_id
   * @returns {string}
   */
  function titleOf(bead_id) {
    const titles = currentQueue().bead_titles || {};
    return typeof titles[bead_id] === 'string' ? titles[bead_id] : bead_id;
  }

  /**
   * @param {import('../../protocol.js').MessageType} type
   * @param {Record<string, unknown>} payload
   */
  async function sendAnalysis(type, payload) {
    if (!transport || pending) {
      return null;
    }
    pending = true;
    doRender();
    try {
      return await transport(type, payload);
    } finally {
      pending = false;
      doRender();
    }
  }

  /**
   * @param {boolean} force
   */
  async function startAnalysis(force) {
    const result = /** @type {any} */ (
      await sendAnalysis('worker-parallel-analysis-start', { force })
    );
    if (result && result.applied === false && result.reason) {
      showToast(`분석 실패: ${result.reason}`, 'error', 2800);
    }
  }

  async function cancelAnalysis() {
    const job = currentAnalysis().job;
    if (!job) {
      return;
    }
    await sendAnalysis('worker-parallel-analysis-cancel', {
      job_id: job.job_id
    });
  }

  /**
   * @param {string} model
   */
  async function updateSettings(model) {
    const settings = currentAnalysis().settings;
    await sendAnalysis('worker-parallel-analysis-settings-update', {
      expected_revision: settings.revision,
      runner: settings.runner || 'claude',
      model,
      effort: settings.effort || 'high'
    });
  }

  /**
   * Submit one group draft. CAS discipline mirrors every other queue mutation:
   * adopt the authoritative queue a conflict reply carries and retry ONCE.
   *
   * @param {number} index
   * @param {any} group
   */
  async function submitGroup(index, group) {
    if (!transport || pending) {
      return;
    }
    const order = draftOf(index, group);
    const analysis = currentAnalysis();
    if (order.length < 2 || !analysis.last_good) {
      showToast('제출하려면 2개 이상이어야 합니다', 'warning');
      return;
    }
    const lane = lane_choice.get(index) || firstEmptyLane();
    /**
     * @returns {Record<string, unknown>}
     */
    const payload = () => ({
      snapshot_digest: analysis.last_good.identity_digest,
      group_index: index,
      lane,
      ordered_bead_ids: order,
      expected_revision: currentQueue().revision
    });
    pending = true;
    doRender();
    try {
      let result = /** @type {any} */ (
        await transport('worker-parallel-analysis-submit', payload())
      );
      if (result && result.queue && queueStore) {
        queueStore.set(result.queue);
      }
      if (result && result.applied !== true && result.conflict === true) {
        result = /** @type {any} */ (
          await transport('worker-parallel-analysis-submit', payload())
        );
        if (result && result.queue && queueStore) {
          queueStore.set(result.queue);
        }
      }
      if (result && result.applied === true) {
        drafts.delete(index);
        showToast(`직렬 레인 ${lane}에 ${order.length}개 배치`, 'success');
      } else {
        showToast(
          `제출 거부: ${result?.reason || 'conflict'} (큐 무변경)`,
          'error',
          2800
        );
      }
    } finally {
      pending = false;
      doRender();
    }
  }

  /**
   * @param {number} index
   * @param {any} group
   * @param {string} bead_id
   */
  function excludeMember(index, group, bead_id) {
    drafts.set(
      index,
      draftOf(index, group).filter((id) => id !== bead_id)
    );
    doRender();
  }

  /**
   * @param {number} index
   */
  function restoreGroup(index) {
    drafts.delete(index);
    doRender();
  }

  /**
   * @param {number} index
   * @param {any} group
   * @param {string} bead_id
   * @param {number} delta
   */
  function moveMember(index, group, bead_id, delta) {
    const order = [...draftOf(index, group)];
    const at = order.indexOf(bead_id);
    const to = at + delta;
    if (at < 0 || to < 0 || to >= order.length) {
      return;
    }
    order.splice(to, 0, ...order.splice(at, 1));
    drafts.set(index, order);
    doRender();
  }

  /**
   * @returns {import('lit-html').TemplateResult}
   */
  function settingsTemplate() {
    const settings = currentAnalysis().settings;
    const catalog = currentQueue().runner_catalog;
    const models = Object.keys(
      catalog?.runners?.[settings.runner || 'claude']?.models || {}
    );
    const configured = !!(settings.runner && settings.model && settings.effort);
    return html`<div class="pa-settings">
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${(/** @type {Event} */ ev) =>
            void updateSettings(
              /** @type {HTMLSelectElement} */ (ev.target).value
            )}
        >
          ${models.map(
            (model) =>
              html`<option value=${model} ?selected=${settings.model === model}>
                ${model}
              </option>`
          )}
        </select>
      </label>
      ${configured
        ? html`<span class="pa-settings__effort"
            >effort ${settings.effort}</span
          >`
        : html`<span class="pa-settings__unset">분석 모델 설정 필요</span>`}
    </div>`;
  }

  /**
   * @param {any} analysis
   * @returns {import('lit-html').TemplateResult}
   */
  function metaTemplate(analysis) {
    const q = currentQueue();
    const target_count =
      (Array.isArray(q.queue) ? q.queue.length : 0) +
      (Array.isArray(q.serial_lanes) ? q.serial_lanes : []).reduce(
        (/** @type {number} */ sum, /** @type {any} */ lane) =>
          sum + (Array.isArray(lane.entries) ? lane.entries.length : 0),
        0
      );
    const running = !!analysis.job;
    const configured = !!(
      analysis.settings.runner &&
      analysis.settings.model &&
      analysis.settings.effort
    );
    return html`<div class="pa-meta">
      <span class="pa-meta__targets">대상 ${target_count}</span>
      ${analysis.last_good
        ? html`<span class="pa-meta__at"
            >분석 ${new Date(analysis.last_good.at || 0).toLocaleString()}</span
          >`
        : html`<span class="pa-meta__at">분석 결과 없음</span>`}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!configured || running || pending}
        @click=${() => void startAnalysis(false)}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!configured || running || pending}
        @click=${() => void startAnalysis(true)}
      >
        재분석
      </button>
      <button
        type="button"
        class="pa-cancel"
        ?disabled=${!running}
        @click=${() => void cancelAnalysis()}
      >
        취소
      </button>
    </div>`;
  }

  /**
   * @param {number} index
   * @param {any} group
   * @returns {import('lit-html').TemplateResult}
   */
  function groupTemplate(index, group) {
    const order = draftOf(index, group);
    const active = activeBeadIds();
    const blocked_members = order.filter((id) => active.has(id));
    const applied = alreadyApplied(order);
    const lanes = Array.isArray(currentQueue().serial_lanes)
      ? currentQueue().serial_lanes
      : [];
    const selected_lane = lane_choice.get(index) || firstEmptyLane();
    const submit_blocked =
      group.eligible !== true ||
      order.length < 2 ||
      blocked_members.length > 0 ||
      applied ||
      pending;
    return html`<section class="pa-group" data-group-index=${String(index)}>
      <header class="pa-group__head">
        <span class="pa-group__confidence">${group.confidence}</span>
        ${group.categories.map(
          (/** @type {string} */ category) =>
            html`<span class="pa-group__category">${category}</span>`
        )}
        ${applied
          ? html`<span class="pa-group__applied">✓ 이미 반영됨</span>`
          : ''}
        ${group.eligible === true
          ? ''
          : html`<span class="pa-group__weak">근거 부족 — 제출 불가</span>`}
      </header>
      <p class="pa-group__reason">${group.reason}</p>
      <ol class="pa-group__members">
        ${order.map(
          (bead_id, position) =>
            html`<li class="pa-member" data-bead-id=${bead_id}>
              <span class="pa-member__seq">${position + 1}</span>
              <span class="pa-member__title">${titleOf(bead_id)}</span>
              ${active.has(bead_id)
                ? html`<span class="pa-member__active">실행 중</span>`
                : ''}
              <button
                type="button"
                class="pa-member__up"
                data-bead-id=${bead_id}
                ?disabled=${position === 0}
                aria-label=${`${bead_id} 위로`}
                @click=${() => moveMember(index, group, bead_id, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                class="pa-member__down"
                data-bead-id=${bead_id}
                ?disabled=${position === order.length - 1}
                aria-label=${`${bead_id} 아래로`}
                @click=${() => moveMember(index, group, bead_id, 1)}
              >
                ↓
              </button>
              <button
                type="button"
                class="pa-member__exclude"
                data-bead-id=${bead_id}
                aria-label=${`${bead_id} 제외`}
                @click=${() => excludeMember(index, group, bead_id)}
              >
                ✕
              </button>
            </li>`
        )}
      </ol>
      <ul class="pa-group__evidence">
        ${group.evidence.map(
          (/** @type {any} */ evidence) =>
            html`<li class="pa-evidence">
              <code>${evidence.path}</code>
              <span class="pa-evidence__locator">${evidence.locator}</span>
            </li>`
        )}
      </ul>
      <footer class="pa-group__foot">
        <button
          type="button"
          class="pa-group__restore"
          @click=${() => restoreGroup(index)}
        >
          제안으로 되돌리기
        </button>
        <label class="pa-group__lane-field"
          >제출
          <select
            class="pa-group__lane"
            aria-label="제출 대상 레인"
            @change=${(/** @type {Event} */ ev) => {
              lane_choice.set(
                index,
                /** @type {HTMLSelectElement} */ (ev.target).value
              );
              doRender();
            }}
          >
            ${lanes.map(
              (/** @type {any} */ lane, /** @type {number} */ lane_index) =>
                html`<option
                  value=${lane.id}
                  ?selected=${selected_lane === lane.id}
                >
                  직렬 ${lane_index + 1}
                </option>`
            )}
          </select>
        </label>
        <button
          type="button"
          class="pa-group__submit"
          ?disabled=${submit_blocked}
          @click=${() => void submitGroup(index, group)}
        >
          제출
        </button>
      </footer>
    </section>`;
  }

  /**
   * @param {any} result
   * @returns {import('lit-html').TemplateResult}
   */
  function summaryTemplate(result) {
    const issues = Array.isArray(result.issues) ? result.issues : [];
    const ok_count = issues.filter(
      (/** @type {any} */ issue) => issue.verdict === 'parallel_ok'
    ).length;
    const uncertain_count = issues.filter(
      (/** @type {any} */ issue) => issue.verdict === 'uncertain'
    ).length;
    return html`<div class="pa-summary">
      <span>parallel_ok ${ok_count}</span>
      <span>uncertain ${uncertain_count}</span>
    </div>`;
  }

  function doRender() {
    const analysis = currentAnalysis();
    const result = analysis.last_good?.result;
    render(
      html`
        <div class="pa__container">
          <header class="pa__header">
            <div class="pa__title">병렬성 분석</div>
            <button
              type="button"
              class="pa__close"
              aria-label="닫기"
              @click=${close}
            >
              ×
            </button>
          </header>
          <div class="pa__body">
            ${settingsTemplate()} ${metaTemplate(analysis)}
            ${result
              ? html`${result.groups.map(
                  (/** @type {any} */ group, /** @type {number} */ index) =>
                    groupTemplate(index, group)
                )}
                ${result.groups.length === 0
                  ? html`<p class="pa-empty">직렬 권장 그룹 없음</p>`
                  : ''}
                ${summaryTemplate(result)}`
              : html`<p class="pa-empty">
                  아직 분석 결과가 없습니다 — [✳ 분석]을 눌러 시작하세요
                </p>`}
          </div>
        </div>
      `,
      dialog
    );
  }

  // Tracked separately from `dialog.open` so a pushed snapshot still re-renders
  // where `showModal` is unavailable (jsdom) and the native flag never flips.
  let is_open = false;

  const onDialogClose = () => {
    is_open = false;
  };
  /** @param {MouseEvent} ev */
  const onDialogClick = (ev) => {
    if (ev.target === ev.currentTarget) {
      close();
    }
  };
  dialog.addEventListener('close', onDialogClose);
  dialog.addEventListener('cancel', onDialogClose);
  dialog.addEventListener('click', onDialogClick);

  /** @type {null | (() => void)} */
  let unsubscribe_queue = null;
  if (queueStore && queueStore.subscribe) {
    unsubscribe_queue = queueStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }
  /** @type {null | (() => void)} */
  let unsubscribe_analysis = null;
  if (analysisStore && analysisStore.subscribe) {
    unsubscribe_analysis = analysisStore.subscribe(() => {
      if (is_open) {
        doRender();
      }
    });
  }

  function open() {
    if (is_open) {
      return;
    }
    is_open = true;
    doRender();
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  }

  function close() {
    if (!is_open) {
      return;
    }
    is_open = false;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  }

  return {
    open,
    close,
    destroy() {
      is_open = false;
      dialog.removeEventListener('close', onDialogClose);
      dialog.removeEventListener('cancel', onDialogClose);
      dialog.removeEventListener('click', onDialogClick);
      if (unsubscribe_queue) {
        unsubscribe_queue();
        unsubscribe_queue = null;
      }
      if (unsubscribe_analysis) {
        unsubscribe_analysis();
        unsubscribe_analysis = null;
      }
      dialog.remove();
    }
  };
}
