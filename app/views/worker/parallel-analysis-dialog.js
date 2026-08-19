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
 * @typedef {{ get: () => any, set: (s: any) => void, isPending?: () => boolean, setPending?: (p: boolean) => void, subscribe?: (fn: () => void) => () => void }} AnalysisStore
 * @typedef {Object} ParallelAnalysisOptions
 * @property {QueueStore} queueStore
 * @property {AnalysisStore} analysisStore
 * @property {(type: import('../../protocol.js').MessageType, payload?: unknown) => Promise<any>} [transport]
 * @property {() => string|null|undefined} [getWorkspacePath]
 * @property {(run_id: string, meta: import('./transcript-drawer.js').DrawerMeta) => void} [onOpenTranscript]
 */
import { html, render } from 'lit-html';
import { analyzerEfforts } from '../../data/analyzer-efforts.js';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../utils/toast.js';

/** @type {Set<string>} Attempt statuses that no longer own their bead. */
const TERMINAL_ATTEMPT_STATUSES = new Set([
  'done',
  'failed',
  'orphaned',
  'stopped',
  'discarded'
]);

/** @type {Record<string, string>} Server exclusion reason to reader label. */
const EXCLUSION_REASON_LABELS = {
  spec_missing: '스펙 없음',
  route: 'route 미달',
  spec_review: '스펙 리뷰 없음',
  spec_conflict: '스펙 충돌',
  phase_child: 'phase child',
  worker_ineligible: 'worker 제외'
};

/** @type {Record<string, string>} Durable run outcome to reader label. */
const RUN_OUTCOME_LABELS = {
  running: '실행 중',
  success: '성공',
  failure: '실패',
  cancelled: '취소',
  interrupted: '중단'
};

/** @type {Record<string, string>} Run outcome to drawer attempt-status token. */
const RUN_DRAWER_STATUSES = {
  running: 'running',
  success: 'done',
  failure: 'failed',
  cancelled: 'stopped',
  interrupted: 'orphaned'
};

/**
 * Project one durable run record (or the active job payload) into the shared
 * transcript drawer's meta shape. Exported because the worker view re-feeds it
 * on every snapshot push: the session id lands after the drawer is already
 * open, exactly as it does for an attempt.
 *
 * @param {any} run
 * @returns {import('./transcript-drawer.js').DrawerMeta}
 */
export function analysisRunDrawerMeta(run) {
  return {
    runner: run.runner || undefined,
    model: run.model || undefined,
    effort: run.effort || undefined,
    status:
      RUN_DRAWER_STATUSES[run.outcome] ||
      (typeof run.job_id === 'string' ? 'running' : undefined),
    session_id: run.session_id || undefined
  };
}

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
  const {
    queueStore,
    analysisStore,
    transport,
    getWorkspacePath,
    onOpenTranscript
  } = options;

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
  /**
   * Whether a start/submit request is in flight. Cancel is deliberately NOT
   * gated on it: `start` stays pending for the whole analysis, so gating cancel
   * on it would disable the button exactly while the run it cancels is alive.
   *
   * @type {boolean}
   */
  let pending = false;
  /**
   * A runner the reader just picked, held until the server's snapshot confirms
   * it. Without it the model/effort lists would keep describing the OLD runner
   * until the round trip lands, and the reader would be choosing from a
   * vocabulary that no longer applies.
   *
   * @type {string|null}
   */
  let staged_runner = null;
  /** @type {ReturnType<typeof setInterval>|null} Elapsed-time ticker. */
  let elapsed_timer = null;
  /** @type {{ qualified: any[], excluded: any[] }|null} */
  let targets = null;
  /** @type {Set<string>} Browser-local target selection. */
  const selected_target_ids = new Set();
  let targets_loading = false;
  let targets_request_sequence = 0;
  /** @type {{ run_id: string, prompt: string }|null} */
  let prompt_popup = null;
  /** @type {Set<string>} */
  const prompt_pending_ids = new Set();

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
        runs: [],
        last_good: null
      }
    );
  }

  /**
   * @returns {string}
   */
  function workspacePath() {
    return getWorkspacePath ? getWorkspacePath() || '' : '';
  }

  /** Load the server-owned analysis universe each time the dialog opens. */
  async function loadTargets() {
    if (!transport) {
      return;
    }
    const request_sequence = ++targets_request_sequence;
    targets_loading = true;
    targets = null;
    selected_target_ids.clear();
    doRender();
    try {
      const result = /** @type {any} */ (
        await transport('worker-parallel-analysis-targets', {
          root_dir: workspacePath()
        })
      );
      if (request_sequence !== targets_request_sequence || !is_open) {
        return;
      }
      const qualified = Array.isArray(result?.qualified)
        ? result.qualified
        : [];
      const excluded = Array.isArray(result?.excluded) ? result.excluded : [];
      targets = { qualified, excluded };
      for (const target of qualified) {
        if (target && typeof target.id === 'string') {
          selected_target_ids.add(target.id);
        }
      }
    } catch {
      if (request_sequence === targets_request_sequence && is_open) {
        targets = { qualified: [], excluded: [] };
        showToast('분석 대상을 불러오지 못했습니다', 'error', 2800);
      }
    } finally {
      if (request_sequence === targets_request_sequence) {
        targets_loading = false;
        if (is_open) {
          doRender();
        }
      }
    }
  }

  /**
   * The durable run history the channel snapshot carries (§5.4). It rides the
   * same push as settings and job, so history stays live without a second
   * request per fanout.
   *
   * @param {any} analysis
   * @returns {any[]}
   */
  function currentRuns(analysis) {
    return Array.isArray(analysis.runs) ? analysis.runs : [];
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
   * Members of a drafted group that have LEFT the waiting area since the
   * analysis ran (UI-04vo §9 stale). The server refuses such a submit anyway;
   * showing it here is what stops the reader from clicking a button that can
   * only fail. Artifact-level drift stays server-side — re-deriving the pinned
   * snapshot on every push would put a `bd list` + git read on the fanout path.
   *
   * @param {string[]} order
   * @returns {string[]}
   */
  function departedMembers(order) {
    return order.filter((bead_id) => laneOf(bead_id) === null);
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
    // The 준비 중 stage (UI-yqw9 §4.0): the server has no job to announce until
    // the snapshot and the bundle exist, and that is the longest silent wait in
    // the whole flow. Only THIS path raises it — a group submit or a settings
    // save is not an analysis run.
    analysisStore?.setPending?.(true);
    try {
      const result = /** @type {any} */ (
        await sendAnalysis('worker-parallel-analysis-start', {
          force,
          target_ids: Array.from(selected_target_ids)
        })
      );
      if (result && result.applied === false && result.reason) {
        if (
          result.reason === 'target_not_qualified' &&
          Array.isArray(result.detail)
        ) {
          showToast(
            `분석 대상 자격 변경: ${result.detail.join(', ')}`,
            'error',
            3200
          );
        } else {
          showToast(`분석 실패: ${result.reason}`, 'error', 2800);
        }
      }
    } finally {
      // Every exit clears it: success, an early refusal like
      // `settings_incompatible`, and a transport throw alike.
      analysisStore?.setPending?.(false);
    }
  }

  async function cancelAnalysis() {
    const job = currentAnalysis().job;
    if (!transport || !job) {
      return;
    }
    await transport('worker-parallel-analysis-cancel', {
      job_id: job.job_id
    });
  }

  /**
   * Fetch and show the exact prompt bytes saved for one analysis run.
   *
   * @param {string} run_id
   */
  async function openPrompt(run_id) {
    if (!transport || prompt_pending_ids.has(run_id)) {
      return;
    }
    prompt_pending_ids.add(run_id);
    doRender();
    try {
      const result = /** @type {any} */ (
        await transport('worker-parallel-analysis-prompt', {
          root_dir: workspacePath(),
          run_id
        })
      );
      if (!is_open) {
        return;
      }
      if (result?.ok === true && typeof result.prompt === 'string') {
        prompt_popup = { run_id, prompt: result.prompt };
        return;
      }
      showToast(
        result?.reason === 'not_found'
          ? '저장된 분석 프롬프트를 찾을 수 없습니다'
          : '분석 프롬프트를 불러오지 못했습니다',
        'error',
        2800
      );
    } finally {
      prompt_pending_ids.delete(run_id);
      doRender();
    }
  }

  /** Close the analysis prompt popup. */
  function closePrompt() {
    prompt_popup = null;
    doRender();
  }

  /** Copy the unmodified prompt content. */
  async function copyPrompt() {
    if (!prompt_popup) {
      return;
    }
    const copied = await copyToClipboard(prompt_popup.prompt);
    showToast(
      copied ? '복사됨' : '복사 실패',
      copied ? 'success' : 'error',
      1400
    );
  }

  /**
   * @param {string} run_id
   * @param {any} meta_source
   */
  function openTranscript(run_id, meta_source) {
    if (onOpenTranscript) {
      onOpenTranscript(run_id, analysisRunDrawerMeta(meta_source));
    }
  }

  /**
   * @returns {any} The resolved runner catalog the queue snapshot carries.
   */
  function catalogOf() {
    return currentQueue().runner_catalog;
  }

  /**
   * @param {string} runner
   * @returns {string[]}
   */
  function modelsOf(runner) {
    return Object.keys(catalogOf()?.runners?.[runner]?.models || {});
  }

  /**
   * The runner's preferred model — its catalog `default_model` when the
   * catalog still carries it, else the first one it lists.
   *
   * @param {string} runner
   * @returns {string}
   */
  function defaultModelOf(runner) {
    const models = modelsOf(runner);
    const declared = catalogOf()?.runners?.[runner]?.default_model;
    return typeof declared === 'string' && models.includes(declared)
      ? declared
      : models[0] || '';
  }

  /**
   * The triple the three selects display: the stored selection, or — while a
   * runner change is staged — the derived selection for the new runner. The
   * effort is carried over only when the new pair actually accepts it.
   *
   * @returns {{ runner: string, model: string, effort: string, models: string[], efforts: string[] }}
   */
  function currentSelection() {
    const settings = currentAnalysis().settings;
    const runner = staged_runner || settings.runner || 'claude';
    const models = modelsOf(runner);
    const model = staged_runner
      ? defaultModelOf(runner)
      : settings.model || models[0] || '';
    const efforts = analyzerEfforts(catalogOf(), runner, model);
    const stored_effort = settings.effort || '';
    const effort = efforts.includes(stored_effort)
      ? stored_effort
      : efforts[0] || '';
    return { runner, model, effort, models, efforts };
  }

  /**
   * Send ONE CAS carrying all three fields (UI-yqw9 §2). The server takes the
   * triple or nothing, so a runner change that implies a new model and effort
   * still travels as a single update.
   *
   * @param {{ runner: string, model: string, effort: string }} selection
   */
  async function updateSettings(selection) {
    const settings = currentAnalysis().settings;
    const result = /** @type {any} */ (
      await sendAnalysis('worker-parallel-analysis-settings-update', {
        expected_revision: settings.revision,
        runner: selection.runner,
        model: selection.model,
        effort: selection.effort
      })
    );
    if (!result || result.applied !== true) {
      // Nothing was stored, so the staged runner would keep describing a
      // vocabulary the server never accepted.
      staged_runner = null;
      doRender();
      if (result && result.reason) {
        showToast(`분석 설정 거부: ${result.reason}`, 'error', 2800);
      }
    }
  }

  /**
   * @param {string} runner
   */
  function chooseRunner(runner) {
    staged_runner = runner;
    doRender();
    const selection = currentSelection();
    void updateSettings({
      runner,
      model: selection.model,
      effort: selection.effort
    });
  }

  /**
   * @param {string} model
   */
  function chooseModel(model) {
    const selection = currentSelection();
    const efforts = analyzerEfforts(catalogOf(), selection.runner, model);
    void updateSettings({
      runner: selection.runner,
      model,
      effort: efforts.includes(selection.effort)
        ? selection.effort
        : efforts[0] || ''
    });
  }

  /**
   * @param {string} effort
   */
  function chooseEffort(effort) {
    const selection = currentSelection();
    void updateSettings({
      runner: selection.runner,
      model: selection.model,
      effort
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
    const runners = Object.keys(catalogOf()?.runners || {});
    const selection = currentSelection();
    return html`<div class="pa-settings">
      <label class="pa-settings__field"
        >러너
        <select
          class="pa-settings__runner"
          aria-label="분석 러너"
          @change=${(/** @type {Event} */ ev) =>
            chooseRunner(/** @type {HTMLSelectElement} */ (ev.target).value)}
        >
          ${runners.map(
            (runner) =>
              html`<option
                value=${runner}
                ?selected=${selection.runner === runner}
              >
                ${runner}
              </option>`
          )}
        </select>
      </label>
      <label class="pa-settings__field"
        >분석 모델
        <select
          class="pa-settings__model"
          aria-label="분석 모델"
          @change=${(/** @type {Event} */ ev) =>
            chooseModel(/** @type {HTMLSelectElement} */ (ev.target).value)}
        >
          ${selection.models.map(
            (model) =>
              html`<option
                value=${model}
                ?selected=${selection.model === model}
              >
                ${model}
              </option>`
          )}
        </select>
      </label>
      <label class="pa-settings__field"
        >effort
        <select
          class="pa-settings__effort-select"
          aria-label="분석 effort"
          @change=${(/** @type {Event} */ ev) =>
            chooseEffort(/** @type {HTMLSelectElement} */ (ev.target).value)}
        >
          ${selection.efforts.map(
            (effort) =>
              html`<option
                value=${effort}
                ?selected=${selection.effort === effort}
              >
                ${effort}
              </option>`
          )}
        </select>
      </label>
      ${settingsStateTemplate(settings)}
    </div>`;
  }

  /**
   * The one line that says whether the current selection is usable: unset,
   * running on the built-in default, no longer offered by the catalog, or
   * simply fine.
   *
   * @param {any} settings
   * @returns {import('lit-html').TemplateResult|string}
   */
  function settingsStateTemplate(settings) {
    // An unusable DEFAULT is not a broken user choice — there is nothing stored
    // to repair, so it reads as unconfigured exactly like the refusal the
    // server sends for it (`settings_missing`, UI-yqw9 §3).
    if (!isConfigured(settings) || isDefaultUnusable(settings)) {
      return html`<span class="pa-settings__unset">분석 모델 설정 필요</span>`;
    }
    if (settings.compatible === false) {
      // The STORED triple, not the clamped one the selects show: the reader
      // cannot fix a selection the screen no longer names (UI-yqw9 §2.1).
      return html`<span class="pa-settings__incompatible"
        >설정 비호환 — 저장된 ${settings.runner}/${settings.model} · effort
        ${settings.effort} 을(를) 카탈로그가 더는 제공하지 않습니다</span
      >`;
    }
    return settings.is_default === true
      ? html`<span class="pa-settings__default">기본값</span>`
      : '';
  }

  /**
   * @param {any} settings
   * @returns {boolean}
   */
  function isDefaultUnusable(settings) {
    return settings.is_default === true && settings.compatible === false;
  }

  /**
   * @param {any} settings
   * @returns {boolean}
   */
  function isConfigured(settings) {
    return !!(settings.runner && settings.model && settings.effort);
  }

  /**
   * Whether the analyze buttons may run at all: a selection the catalog no
   * longer offers is refused before spawn anyway (UI-yqw9 §2.1), so offering
   * the click would only produce a guaranteed failure.
   *
   * @param {any} settings
   * @returns {boolean}
   */
  function isRunnable(settings) {
    return isConfigured(settings) && settings.compatible !== false;
  }

  /**
   * @param {number} ms
   * @returns {string}
   */
  function elapsedText(ms) {
    const total = Math.max(0, Math.floor(ms / 1000));
    const minutes = Math.floor(total / 60);
    const seconds = total % 60;
    return `${minutes}:${String(seconds).padStart(2, '0')}`;
  }

  /**
   * The progress line (UI-yqw9 §4.3). Two stages, and the job WINS: the
   * preparation flag is this browser's alone, while a job is server-global, so
   * once one exists every tab must read the same thing.
   *
   * @param {any} analysis
   * @returns {import('lit-html').TemplateResult|string}
   */
  function progressTemplate(analysis) {
    const job = analysis.job;
    if (job) {
      const started_at =
        typeof job.started_at === 'number' ? job.started_at : 0;
      const identity = `${job.runner || '?'}/${job.model || '?'}`;
      const elapsed = started_at
        ? ` · 경과 ${elapsedText(Date.now() - started_at)}`
        : '';
      const session_id =
        typeof job.session_id === 'string' ? job.session_id : '';
      const run = currentRuns(analysis).find(
        (/** @type {any} */ item) => item.run_id === job.job_id
      );
      return html`<span class="pa-meta__progress">
        <span
          >분석 중 — ${identity} · effort ${job.effort || '?'}${elapsed}</span
        >
        ${session_id
          ? html`<code class="pa-session-id" title=${session_id}
              >${session_id.slice(0, 8)}</code
            >`
          : ''}
        <button
          type="button"
          class="pa-monitor"
          @click=${() => openTranscript(job.job_id, run || job)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-prompt-open"
          ?disabled=${run?.prompt_saved !== true ||
          prompt_pending_ids.has(job.job_id)}
          @click=${() => void openPrompt(job.job_id)}
        >
          프롬프트
        </button>
      </span>`;
    }
    return isPending()
      ? html`<span class="pa-meta__progress"
          >준비 중 — 대상과 아티팩트 수집 중</span
        >`
      : '';
  }

  /**
   * @returns {boolean} Whether this browser has a start request in flight.
   */
  function isPending() {
    return analysisStore?.isPending?.() === true;
  }

  /**
   * @param {any} analysis
   * @returns {import('lit-html').TemplateResult}
   */
  function metaTemplate(analysis) {
    const running = !!analysis.job;
    const runnable = isRunnable(analysis.settings);
    const no_selection = targets !== null && selected_target_ids.size === 0;
    const busy = running || pending || isPending() || targets_loading;
    return html`<div class="pa-meta">
      ${analysis.last_good
        ? html`<span class="pa-meta__at"
            >분석 ${new Date(analysis.last_good.at || 0).toLocaleString()}</span
          >`
        : html`<span class="pa-meta__at">분석 결과 없음</span>`}
      ${progressTemplate(analysis)}
      <button
        type="button"
        class="pa-run"
        ?disabled=${!runnable || busy || no_selection}
        @click=${() => void startAnalysis(false)}
      >
        ✳ 분석
      </button>
      <button
        type="button"
        class="pa-rerun"
        ?disabled=${!runnable || busy || no_selection}
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
   * @param {string|null|undefined} lane
   * @returns {string}
   */
  function laneLabel(lane) {
    return typeof lane === 'string' && lane.length > 0 ? lane : '미배치';
  }

  /**
   * @param {string} target_id
   * @param {boolean} checked
   */
  function chooseTarget(target_id, checked) {
    if (checked) {
      selected_target_ids.add(target_id);
    } else {
      selected_target_ids.delete(target_id);
    }
    doRender();
  }

  /**
   * @returns {import('lit-html').TemplateResult}
   */
  function targetsTemplate() {
    const qualified = targets?.qualified || [];
    const excluded = targets?.excluded || [];
    return html`<section class="pa-targets">
      <header class="pa-targets__header">
        <strong>분석 대상</strong>
        <span class="pa-targets__summary"
          >${targets_loading
            ? '조회 중…'
            : `자격 ${qualified.length} · 제외 ${excluded.length}`}</span
        >
      </header>
      ${targets && qualified.length > 0
        ? html`<ul class="pa-targets__list">
            ${qualified.map(
              (/** @type {any} */ target) =>
                html`<li class="pa-target">
                  <label class="pa-target__label">
                    <input
                      type="checkbox"
                      class="pa-target__check"
                      data-target-id=${target.id}
                      .checked=${selected_target_ids.has(target.id)}
                      @change=${(/** @type {Event} */ event) =>
                        chooseTarget(
                          target.id,
                          /** @type {HTMLInputElement} */ (event.target).checked
                        )}
                    />
                    <span class="pa-target__title">${target.title}</span>
                  </label>
                  <span class="pa-target__route">${target.route}</span>
                  <span class="pa-target__lane">${laneLabel(target.lane)}</span>
                </li>`
            )}
          </ul>`
        : targets && qualified.length === 0
          ? html`<p class="pa-empty">자격 있는 분석 대상이 없습니다</p>`
          : ''}
      ${targets && excluded.length > 0
        ? html`<details class="pa-targets__excluded">
            <summary>제외 대상 ${excluded.length}</summary>
            <ul class="pa-targets__list">
              ${excluded.map(
                (/** @type {any} */ target) =>
                  html`<li class="pa-target pa-target--excluded">
                    <label class="pa-target__label">
                      <input type="checkbox" disabled />
                      <span class="pa-target__title">${target.title}</span>
                    </label>
                    <span class="pa-target__reason"
                      >${EXCLUSION_REASON_LABELS[target.reason] ||
                      target.reason}</span
                    >
                    <span class="pa-target__lane"
                      >${laneLabel(target.lane)}</span
                    >
                  </li>`
              )}
            </ul>
          </details>`
        : ''}
    </section>`;
  }

  /**
   * @param {any} run
   * @returns {import('lit-html').TemplateResult}
   */
  function runTemplate(run) {
    const has_session =
      typeof run.session_id === 'string' && run.session_id.length > 0;
    const session_id = has_session ? run.session_id : '';
    // Monitoring is gated on the transcript, not on the session id: every run
    // opens its session log at start, while the id only appears if the provider
    // emitted an init event (§2 treats a missing id as blank, not a failure).
    // A rotated-out run has no history row left to click.
    return html`<li class="pa-run-row">
      <span class="pa-run-row__status pa-run-row__status--${run.outcome}"
        >${RUN_OUTCOME_LABELS[run.outcome] || run.outcome}</span
      >
      <time class="pa-run-row__time"
        >${new Date(run.started_at || 0).toLocaleString()}</time
      >
      <span class="pa-run-row__identity"
        >${run.runner || '?'} / ${run.model || '?'} / ${run.effort || '?'}</span
      >
      ${has_session
        ? html`<code class="pa-session-id" title=${session_id}
            >${session_id.slice(0, 8)}</code
          >`
        : html`<span class="pa-run-row__no-session">세션 없음</span>`}
      ${run.outcome === 'failure' && run.reason
        ? html`<span class="pa-run-row__reason">${run.reason}</span>`
        : ''}
      <span class="pa-run-row__actions">
        <button
          type="button"
          class="pa-run-row__monitor"
          @click=${() => openTranscript(run.run_id, run)}
        >
          모니터링
        </button>
        <button
          type="button"
          class="pa-run-row__prompt"
          ?disabled=${run.prompt_saved !== true ||
          prompt_pending_ids.has(run.run_id)}
          @click=${() => void openPrompt(run.run_id)}
        >
          프롬프트
        </button>
      </span>
    </li>`;
  }

  /**
   * @param {any[]} runs
   * @returns {import('lit-html').TemplateResult}
   */
  function runsTemplate(runs) {
    return html`<section class="pa-runs">
      <header class="pa-runs__header"><strong>최근 실행</strong></header>
      ${runs.length > 0
        ? html`<ul class="pa-runs__list">
            ${runs.map((run) => runTemplate(run))}
          </ul>`
        : html`<p class="pa-empty">실행 이력 없음</p>`}
    </section>`;
  }

  /**
   * @returns {import('lit-html').TemplateResult|string}
   */
  function promptPopupTemplate() {
    if (!prompt_popup) {
      return '';
    }
    return html`<div
      class="pa-prompt-popup"
      role="dialog"
      aria-modal="true"
      aria-label="분석 프롬프트"
    >
      <div class="pa-prompt-popup__backdrop" @click=${closePrompt}></div>
      <section class="pa-prompt-popup__panel">
        <header class="pa-prompt-popup__header">
          <div class="pa-prompt-popup__identity">
            <strong>분석 프롬프트</strong>
            <code>${prompt_popup.run_id}</code>
          </div>
          <div class="pa-prompt-popup__actions">
            <button type="button" @click=${() => void copyPrompt()}>
              복사
            </button>
            <button
              type="button"
              class="pa-prompt-popup__close"
              aria-label="분석 프롬프트 팝업 닫기"
              @click=${closePrompt}
            >
              ✕
            </button>
          </div>
        </header>
        <pre class="pa-prompt-popup__content" tabindex="0">
${prompt_popup.prompt}</pre
        >
      </section>
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
    const departed = departedMembers(order);
    const applied = alreadyApplied(order);
    const lanes = Array.isArray(currentQueue().serial_lanes)
      ? currentQueue().serial_lanes
      : [];
    const selected_lane = lane_choice.get(index) || firstEmptyLane();
    const submit_blocked =
      group.eligible !== true ||
      order.length < 2 ||
      blocked_members.length > 0 ||
      departed.length > 0 ||
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
        ${departed.length > 0
          ? html`<span class="pa-group__stale"
              >stale — ${departed.join(', ')} 대기 영역 이탈</span
            >`
          : ''}
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

  /**
   * Run the elapsed ticker ONLY while the dialog is open and a job exists
   * (UI-yqw9 §4.3). 준비 중 has no elapsed reading, and a closed dialog has no
   * reader — a timer surviving either would re-render an invisible tree once a
   * second forever.
   */
  function syncElapsedTimer() {
    const needed = is_open && !!currentAnalysis().job;
    if (needed && elapsed_timer === null) {
      elapsed_timer = setInterval(() => doRender(), 1_000);
      return;
    }
    if (!needed && elapsed_timer !== null) {
      clearInterval(elapsed_timer);
      elapsed_timer = null;
    }
  }

  function doRender() {
    const analysis = currentAnalysis();
    if (staged_runner && analysis.settings.runner === staged_runner) {
      // The server confirmed the runner; the stored settings are authoritative
      // again.
      staged_runner = null;
    }
    const result = analysis.last_good?.result;
    syncElapsedTimer();
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
            ${settingsTemplate()} ${metaTemplate(analysis)} ${targetsTemplate()}
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
            ${runsTemplate(currentRuns(analysis))}
          </div>
        </div>
        ${promptPopupTemplate()}
      `,
      dialog
    );
  }

  // Tracked separately from `dialog.open` so a pushed snapshot still re-renders
  // where `showModal` is unavailable (jsdom) and the native flag never flips.
  let is_open = false;

  const onDialogClose = () => {
    is_open = false;
    prompt_popup = null;
    targets_request_sequence += 1;
    syncElapsedTimer();
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
    void loadTargets();
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
    prompt_popup = null;
    targets_request_sequence += 1;
    syncElapsedTimer();
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
      if (elapsed_timer !== null) {
        clearInterval(elapsed_timer);
        elapsed_timer = null;
      }
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
