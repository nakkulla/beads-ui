/**
 * The `실행` settings pane, extracted from the unified settings dialog so two
 * surfaces can mount the SAME code (UI-eey2 §4.4): the dialog's `실행` tab and
 * the monitor deck's per-repo `⚙` panel.
 *
 * The pane owns one state machine — session-defaults draft over a server
 * baseline, the UI-only orchestration runtime selection, the orchestration
 * draft over the queue snapshot, and execution presets — and draws ONE of its
 * four sections at a time through `render(section)`: `worker` (the execution
 * profile), `quick_fix` (the route-scoped profile and its own preset bar),
 * `session` (what an interactive session reads), `account` (this repo's
 * execution accounts and limit policy). The automation switches are NOT
 * here: the Worker toolbar is their one editing surface (UI-7yh2 §3.12).
 *
 * `binding.root_dir` is the ONE axis that separates the two mounts:
 * - `null` — the connected workspace. Every payload is EXACTLY what the dialog
 *   sent before this extraction; no `root_dir` key appears.
 * - a string — another repo. Every op carries `root_dir`, and the queue-CAS ops
 *   retry ONCE with the revision the conflict response carried, because a
 *   foreign repo's revision moves without this client noticing.
 *
 * The pane uses classes and `data-*` only — never `id` — because the monitor can
 * mount it inline on a page that already holds the dialog's copy.
 *
 * Failure handling follows the dialog's contract (spec §F): a kv value that
 * cannot be parsed shows a warning banner and leaves the layer empty, and a save
 * failure notifies while KEEPING the user's edits in the draft.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */
import { html } from 'lit-html';
import {
  AUTO_LITERAL,
  adoptSessionDefaultValues,
  adoptWorkerCommon,
  buildOrchestrationPatch,
  buildSessionDefaultsPatch,
  isHttpOriginValue,
  narrowImplTarget,
  orchestrationEffortOptions,
  orchestrationModelOptions
} from '../../model/session-model.js';
import { render } from '../../ui/render.js';
import { showToast } from '../../utils/toast.js';
import { createAccountSection } from './execution-accounts.js';
import { createPresetBar } from './execution-presets.js';
import { createExecutionSections } from './execution-sections.js';
import {
  PANE_SECTIONS,
  UNSET,
  errorText,
  isRecord,
  reconcileSessionDraft
} from './execution-shared.js';
import { createSystemPromptSection } from './execution-system-prompt.js';
import { createExecutionView } from './execution-view.js';

export {
  PANE_SECTIONS,
  paneSectionSegmentTemplate
} from './execution-shared.js';

/** The three coupled implementation keys one runtime change re-narrows. */
const IMPL_TARGET_KEYS = ['impl_runtime', 'impl_model', 'impl_effort'];

/**
 * @typedef {Object} ExecutionPaneBinding
 * @property {string|null} root_dir - `null` = the connected workspace.
 * @property {() => any} queue - The queue-like snapshot this pane edits: the
 * dialog hands `queueStore.get()`, the monitor hands that repo's
 * `workspaces_state` row.
 * @property {(type: any, payload?: unknown) => Promise<any>} transport
 * @property {{ get: () => any }} [implPresetStore]
 * @property {{ get: () => any }} [modelVisibilityStore] - Server-global model
 * visibility; its disabled list filters the model and reviewer choices.
 * @property {(message: string) => void} [notify]
 * @property {(queue: any) => void} [onQueueAdopt] - Where an authoritative queue
 * snapshot from a mutation response goes. The dialog writes it back into the
 * shared queue store; the monitor deck adopts it for the tile it belongs to.
 */

/**
 * Mount the `실행` pane into `mount_element`.
 *
 * @param {HTMLElement} mount_element
 * @param {ExecutionPaneBinding} binding
 */
export function createExecutionPane(mount_element, binding) {
  const transport = binding.transport;
  const root_dir =
    typeof binding.root_dir === 'string' && binding.root_dir.length > 0
      ? binding.root_dir
      : null;
  const notify =
    binding.notify || ((message) => showToast(message, 'error', 4000));

  /** Values last read from the server; the diff baseline. */
  /** @type {Record<string, string>} */
  let session_baseline = {};
  /** The user's in-progress edits — deliberately NOT reset on a save failure. */
  /** @type {Record<string, string>} */
  let session_draft = {};
  /**
   * Raw text a free-form session key's box holds that the draft has not
   * adopted: the user is mid-typing, or their last commit failed the key's
   * format. Kept OUT of `session_draft` on purpose — the pane saves the whole
   * session diff on every edit, so parking an unsavable value there would make
   * the next select change ship a patch the server refuses in full.
   *
   * It is written on every keystroke, like a preset bar's name, because the box
   * renders through `live()`: any re-render (the monitor adopting a queue
   * snapshot, another row saving) would otherwise reset the box to the
   * committed value and swallow what the user was typing.
   *
   * @type {Record<string, string>}
   */
  let session_text_draft = {};
  /**
   * Free-form keys whose LAST COMMIT attempt failed the format. Separate from
   * the text above because typing is not a verdict: the box turns red when the
   * user commits something illegal, and goes quiet again as soon as they resume
   * editing it.
   *
   * @type {Record<string, true>}
   */
  let session_text_invalid = {};
  /**
   * Explicit deletions of stored values omitted by normalization.
   *
   * @type {Set<string>}
   */
  const session_deletions = new Set();
  /** @type {string[]} */
  let session_warnings = [];
  let session_loading = false;
  let generation = 0;
  let worker_query = 0;
  /** @type {any} */
  let worker_url = null;
  /** @type {{ value: string, revision: string|null, dirty: boolean }} */
  let common_draft = { value: '', revision: null, dirty: false };
  let common_saving = false;
  let common_invalid = false;

  /**
   * Session-defaults writes run one at a time, for the same two reasons the
   * account writes do (`execution-accounts.js`): `bd kv` has no CAS, and a
   * late response must not adopt over a newer edit. The second one bites
   * hardest on a checkbox: check-then-uncheck while the first write is in
   * flight would otherwise diff the second edit against a baseline that has
   * not moved yet, send nothing, and then adopt the first response over the
   * user's last choice.
   *
   * @type {Promise<void>}
   */
  let session_save_chain = Promise.resolve();

  /**
   * The orchestration provider the model list is narrowed to. UI-only: the
   * queue stores `orchestration_model` alone. `null` means "not chosen yet",
   * and the row then shows the runner the STORED model belongs to.
   *
   * @type {string|null}
   */
  let orchestration_runtime = null;
  /** @type {Record<string, string|null>} */
  let worker_draft = {};

  /** Which of {@link PANE_SECTIONS} this mount currently draws. */
  let active_section = 'worker';

  let destroyed = false;

  // The derived reads, the `계정` section, the preset bars, the system prompt
  // and the section templates live in sibling modules; each reads this pane's
  // state through the getters below and edits it through the pane's handlers.
  const {
    currentOrchestrationValues,
    orchestrationRuntime,
    speedVisibility,
    pruneHiddenSpeeds,
    quickFixDelegated,
    executionDraftSettings
  } = createExecutionView({
    queueOf,
    runnerCatalog,
    executionProjection,
    sessionDraft: () => session_draft,
    workerDraft: () => worker_draft,
    runtimeChoice: () => orchestration_runtime
  });
  const accounts = createAccountSection({
    send,
    rootPayload,
    queueOf,
    sendQueueCas,
    notify,
    doRender,
    isDestroyed: () => destroyed
  });
  const { presetStripTemplate } = createPresetBar({
    binding,
    root_dir,
    queueOf,
    supportsQuickFixLane,
    send,
    rootPayload,
    notify,
    doRender,
    executionDraftSettings,
    adoptPresetApply
  });
  const { systemPromptSection } = createSystemPromptSection({
    send,
    doRender
  });
  const { workerSection, quickFixSection, sessionSection } =
    createExecutionSections({
      binding,
      executionProjection,
      runnerCatalog,
      sessionDraft: () => session_draft,
      sessionTextDraft: () => session_text_draft,
      sessionTextInvalid: () => session_text_invalid,
      onTextInput,
      onTextCommit,
      onSessionChange,
      supportsQuickFixLane,
      currentOrchestrationValues,
      presetStripTemplate,
      systemPromptSection,
      sessionLoading: () => session_loading,
      sessionWarnings: () => session_warnings,
      workerUrl: () => worker_url,
      commonDraft: () => common_draft,
      commonInvalid: () => common_invalid,
      commonSaving: () => common_saving,
      commonEditable,
      onCommonInput,
      saveCommon,
      cancelCommonEdit,
      onWindowFocus,
      onWorkerChange,
      onOrchestrationRuntimeChange,
      orchestrationRuntime,
      speedVisibility,
      quickFixDelegated
    });

  /** @returns {any} */
  function queueOf() {
    const queue = binding.queue ? binding.queue() : null;
    return isRecord(queue) ? queue : null;
  }

  /** @returns {any} */
  function runnerCatalog() {
    const queue = queueOf();
    return queue ? queue.runner_catalog : null;
  }

  /** @returns {Record<string, any>|null} */
  function executionProjection() {
    const queue = queueOf();
    return queue && isRecord(queue.execution_defaults)
      ? queue.execution_defaults
      : null;
  }

  /**
   * Whether the server takes quick_fix values at all. An old server silently
   * applies a preset to the general lane only, so the `적용` button refuses to
   * send rather than dropping the quick_fix half (UI-7yh2 §3.6). A false value
   * is a capability probe, false by absence.
   *
   * @returns {boolean}
   */
  function supportsQuickFixLane() {
    const queue = queueOf();
    return Boolean(
      queue && Object.hasOwn(queue, 'quick_fix_orchestration_model')
    );
  }

  /**
   * The `root_dir` half of a payload. An unbound pane sends NOTHING extra so
   * its wire format is byte-for-byte what the dialog sent before extraction.
   *
   * @returns {Record<string, string>}
   */
  function rootPayload() {
    return root_dir === null ? {} : { root_dir };
  }

  /**
   * Every op goes through here so `destroy()` is a hard stop: a detached
   * control that still carries lit's listener can no longer reach the server.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @returns {Promise<any>}
   */
  async function send(type, payload) {
    if (destroyed || !transport) {
      return null;
    }
    const request_generation = generation;
    const request_root = root_dir;
    const response = await transport(/** @type {any} */ (type), payload);
    return isCurrent(request_generation, request_root) ? response : null;
  }

  /**
   * @param {number} request_generation
   * @param {string|null} request_root
   */
  function isCurrent(request_generation, request_root) {
    return (
      !destroyed &&
      generation === request_generation &&
      root_dir === request_root
    );
  }

  /** @param {any} value */
  function adoptWorkerUrl(value) {
    worker_url = value || null;
    common_draft = adoptWorkerCommon(common_draft, worker_url?.common ?? null);
  }

  /** Permit writes only with a readable common document and revision. */
  function commonEditable() {
    return (
      worker_url?.status === 'ok' &&
      ['configured', 'unset'].includes(worker_url.common.state) &&
      typeof worker_url.common.revision === 'string' &&
      !common_saving
    );
  }

  /** @param {Event} event */
  function onCommonInput(event) {
    common_draft = {
      ...common_draft,
      value: /** @type {HTMLInputElement} */ (event.target).value,
      dirty: true
    };
    common_invalid = false;
    doRender();
  }

  /** Explicitly discard the common edit and bind the latest observed revision. */
  function cancelCommonEdit() {
    common_draft = adoptWorkerCommon(
      common_draft,
      worker_url?.common ?? null,
      true
    );
    common_invalid = false;
    doRender();
  }

  /** @param {boolean} [clear] */
  async function saveCommon(clear = false) {
    if (!commonEditable() || common_draft.revision === null) {
      return;
    }
    const value = clear ? null : common_draft.value.trim() || null;
    if (value !== null && !isHttpOriginValue(value)) {
      common_invalid = true;
      doRender();
      return;
    }
    const request_generation = generation;
    const request_root = root_dir;
    common_saving = true;
    doRender();
    try {
      const res = await send('set-worker-url-common', {
        value,
        expected_revision: common_draft.revision,
        ...rootPayload()
      });
      if (!res || !isCurrent(request_generation, request_root)) {
        return;
      }
      if (res.common_saved === true) {
        ++worker_query;
        session_loading = false;
        common_draft = adoptWorkerCommon(common_draft, res.common, true);
        // The common readback remains usable even if resolving this root failed.
        worker_url = res.worker_url;
        common_invalid = false;
      }
    } catch (err) {
      if (!isCurrent(request_generation, request_root)) {
        return;
      }
      const code = /** @type {any} */ (err).code;
      notify(
        code === 'revision_conflict'
          ? '다른 창에서 변경됨 — 새로고침 후 다시 시도'
          : `공통 기본값 저장 실패: ${errorText(err)}`
      );
    } finally {
      if (isCurrent(request_generation, request_root)) {
        common_saving = false;
        doRender();
      }
    }
  }

  /** Refresh without discarding either form's pending edits. */
  function onWindowFocus() {
    void loadSessionDefaults();
  }

  /** @param {any} res */
  function adoptQueue(res) {
    if (res && isRecord(res.queue)) {
      binding.onQueueAdopt?.(res.queue);
    }
  }

  /**
   * Send one queue-CAS op. A bound pane retries ONCE on conflict with the
   * revision the response carried (§12); an unbound pane keeps the dialog's
   * single-shot behaviour, where the connected queue store is already live.
   *
   * @param {string} type
   * @param {Record<string, unknown>} payload
   * @returns {Promise<any>}
   */
  async function sendQueueCas(type, payload) {
    const queue = queueOf();
    if (!queue || destroyed) {
      return null;
    }
    let res = await send(type, {
      ...payload,
      ...rootPayload(),
      expected_revision: queue.revision
    });
    adoptQueue(res);
    if (root_dir !== null && res && res.conflict) {
      const fresh =
        res.queue && typeof res.queue.revision === 'number'
          ? res.queue.revision
          : (queueOf()?.revision ?? queue.revision);
      res = await send(type, {
        ...payload,
        ...rootPayload(),
        expected_revision: fresh
      });
      adoptQueue(res);
    }
    return res;
  }

  /**
   * Read the workspace session defaults without hiding edits during refresh.
   *
   * @param {{ initial?: boolean, worker_only?: boolean }} [options]
   */
  async function loadSessionDefaults({
    initial = false,
    worker_only = false
  } = {}) {
    const request_generation = generation;
    const request_root = root_dir;
    const query = ++worker_query;
    session_loading = initial;
    doRender();
    try {
      const res = await send('get-session-defaults', { ...rootPayload() });
      if (
        !res ||
        !isCurrent(request_generation, request_root) ||
        query !== worker_query
      ) {
        return;
      }
      adoptWorkerUrl(res.worker_url);
      if (initial) {
        common_draft = adoptWorkerCommon(
          common_draft,
          worker_url?.common ?? null,
          true
        );
        common_invalid = false;
        common_saving = false;
      }
      if (
        initial ||
        (!worker_only &&
          session_deletions.size === 0 &&
          Object.keys(
            buildSessionDefaultsPatch(session_baseline, session_draft)
          ).length === 0 &&
          Object.keys(session_text_draft).length === 0)
      ) {
        session_baseline = adoptSessionDefaultValues(res.values);
        session_draft = { ...session_baseline };
        session_text_draft = {};
        session_text_invalid = {};
      }
      if (!worker_only) {
        session_warnings = Array.isArray(res?.warnings) ? res.warnings : [];
      }
    } catch (err) {
      if (
        !isCurrent(request_generation, request_root) ||
        query !== worker_query
      ) {
        return;
      }
      adoptWorkerUrl({
        status: 'unavailable',
        error: { code: 'workspace_unavailable' }
      });
      session_warnings = ['kv_read_failed'];
      notify(`세션 기본값을 읽지 못했습니다: ${errorText(err)}`);
    } finally {
      if (
        isCurrent(request_generation, request_root) &&
        query === worker_query
      ) {
        session_loading = false;
        doRender();
      }
    }
  }

  /**
   * Queue one session-defaults save behind the ones already in flight, so a
   * later edit always diffs against the baseline its predecessor established.
   */
  function queueSessionSave() {
    const request_generation = generation;
    const request_root = root_dir;
    session_save_chain = session_save_chain.then(() => {
      if (isCurrent(request_generation, request_root)) {
        return saveSessionDefaults();
      }
    });
  }

  /** Save the session-tab diff. On failure the draft is KEPT (spec §F). */
  async function saveSessionDefaults() {
    const request_generation = generation;
    const request_root = root_dir;
    const patch = buildSessionDefaultsPatch(session_baseline, session_draft);
    const sent_deletions = new Set(session_deletions);
    for (const key of sent_deletions) {
      patch[key] = null;
    }
    if (Object.keys(patch).length === 0) {
      return;
    }
    const sent = { ...session_draft };
    try {
      const res = await send('set-session-defaults', {
        values: patch,
        ...rootPayload()
      });
      if (!res || !isCurrent(request_generation, request_root)) {
        return;
      }
      ++worker_query;
      session_loading = false;
      adoptWorkerUrl(res.worker_url);
      session_baseline = adoptSessionDefaultValues(res?.values);
      session_draft = reconcileSessionDraft(
        session_draft,
        sent,
        session_baseline
      );
      for (const key of sent_deletions) {
        session_deletions.delete(key);
      }
      // `session_text_draft` deliberately survives: this save may belong to an
      // unrelated key, and the text box's own commit already cleared its entry
      // on the way in. Dropping it here would silently discard text the user
      // is still fixing.
      session_warnings = Array.isArray(res?.warnings) ? res.warnings : [];
    } catch (err) {
      if (!isCurrent(request_generation, request_root)) {
        return;
      }
      // Keep `session_draft` exactly as the user left it so a retry does not
      // ask them to re-enter anything.
      notify(`세션 기본값 저장 실패: ${errorText(err)}`);
    }
    doRender();
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onSessionChange(key, value) {
    if (IMPL_TARGET_KEYS.includes(key)) {
      onImplTargetChange(key, value);
      return;
    }
    if (value === UNSET) {
      delete session_draft[key];
    } else {
      session_draft[key] = value;
    }
    const pruned = pruneHiddenSpeeds();
    doRender();
    queueSessionSave();
    if (pruned.queue) {
      void saveOrchestration();
    }
  }

  /**
   * Record a free-form key's keystrokes without judging or saving them. No
   * render: the box already shows what was typed, and re-rendering mid-word
   * would fight the caret.
   *
   * @param {string} key
   * @param {string} raw
   */
  function onTextInput(key, raw) {
    session_text_draft[key] = raw;
    delete session_text_invalid[key];
  }

  /**
   * Commit one free-form session key on blur/Enter. An empty box is the
   * deletion request; a value that passes the key's format becomes the draft
   * value and saves; a value that fails is marked invalid and saves NOTHING, so
   * the row can show why without the server refusing an unrelated edit
   * alongside it.
   *
   * @param {string} key
   * @param {string} raw - The box's text, already trimmed.
   * @param {(value: string) => boolean} isValid
   */
  function onTextCommit(key, raw, isValid) {
    session_text_draft[key] = raw;
    if (raw.length > 0 && !isValid(raw)) {
      session_text_invalid[key] = true;
      doRender();
      return;
    }
    delete session_text_draft[key];
    delete session_text_invalid[key];
    if (raw.length === 0) {
      delete session_draft[key];
      if (
        !Object.hasOwn(session_baseline, key) &&
        session_warnings.includes(`invalid_value:${key}`)
      ) {
        session_deletions.add(key);
      }
    } else {
      session_draft[key] = raw;
      session_deletions.delete(key);
    }
    doRender();
    queueSessionSave();
  }

  /**
   * @param {string} key
   * @param {string|undefined} value
   */
  function writeImplTargetKey(key, value) {
    if (typeof value === 'string' && value.length > 0) {
      session_draft[key] = value;
    } else {
      delete session_draft[key];
    }
  }

  /**
   * Edit one of the three coupled implementation keys, then drop whatever the
   * new delegation target cannot run. One render and ONE save: the patch
   * builder sends the cleared keys as `null` alongside the edited one.
   *
   * @param {string} key
   * @param {string} value
   */
  function onImplTargetChange(key, value) {
    const next = value === UNSET ? undefined : value;
    const narrowed = narrowImplTarget(
      {
        impl_runtime:
          key === 'impl_runtime' ? next : session_draft.impl_runtime,
        impl_model: key === 'impl_model' ? next : session_draft.impl_model,
        impl_effort: key === 'impl_effort' ? next : session_draft.impl_effort
      },
      runnerCatalog()
    );
    writeImplTargetKey('impl_runtime', narrowed.impl_runtime);
    writeImplTargetKey('impl_model', narrowed.impl_model);
    writeImplTargetKey('impl_effort', narrowed.impl_effort);
    pruneHiddenSpeeds();
    doRender();
    queueSessionSave();
  }

  /** Save the orchestration diff under the queue CAS. */
  async function saveOrchestration() {
    const queue = queueOf();
    if (!queue) {
      return;
    }
    const baseline = {
      orchestration_model: queue.orchestration_model ?? null,
      orchestration_effort: queue.orchestration_effort ?? null,
      orchestration_speed: queue.orchestration_speed ?? null,
      quick_fix_orchestration_model:
        queue.quick_fix_orchestration_model ?? null,
      quick_fix_orchestration_effort:
        queue.quick_fix_orchestration_effort ?? null,
      quick_fix_orchestration_speed: queue.quick_fix_orchestration_speed ?? null
    };
    const patch = buildOrchestrationPatch(baseline, {
      ...baseline,
      ...worker_draft
    });
    if (Object.keys(patch).length === 0) {
      return;
    }
    try {
      const res = await sendQueueCas(
        'worker-queue-set-orchestration-defaults',
        {
          values: patch
        }
      );
      if (res && res.applied === false) {
        notify('Worker 설정 저장 실패: 다른 클라이언트와 충돌');
        return;
      }
      worker_draft = {};
    } catch (err) {
      notify(`Worker 설정 저장 실패: ${errorText(err)}`);
    }
    doRender();
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onWorkerChange(key, value) {
    worker_draft[key] = value === UNSET ? null : value;
    const pruned = pruneHiddenSpeeds();
    doRender();
    void saveOrchestration();
    if (pruned.session) {
      queueSessionSave();
    }
  }

  /**
   * Pick the orchestration provider, then drop the stored model and effort that
   * provider cannot run — the same narrow-then-save one edit does in
   * {@link onImplTargetChange}. An unset model stays unset: its default belongs
   * to the projection, not to this layer.
   *
   * @param {string} runtime
   */
  function onOrchestrationRuntimeChange(runtime) {
    orchestration_runtime = runtime;
    const catalog = runnerCatalog();
    const current = currentOrchestrationValues();
    let model = current.orchestration_model;
    if (model && !orchestrationModelOptions(catalog, runtime).includes(model)) {
      worker_draft.orchestration_model = null;
      worker_draft.orchestration_effort = null;
      model = null;
    }
    const effort = current.orchestration_effort;
    if (
      effort &&
      !orchestrationEffortOptions(
        catalog,
        runtime,
        model || AUTO_LITERAL
      ).includes(effort)
    ) {
      worker_draft.orchestration_effort = null;
    }
    const pruned = pruneHiddenSpeeds();
    doRender();
    void saveOrchestration();
    if (pruned.session) {
      queueSessionSave();
    }
  }

  /**
   * Adopt the kv + queue halves of an `apply-impl-preset-global` response. The
   * response carries the WHOLE kv layer and the whole queue, so the profile
   * the server did not touch — and both `applied_*_preset` records — arrive
   * with their preserved values (§4.1).
   *
   * @param {any} res
   */
  function adoptPresetApply(res) {
    session_baseline = adoptSessionDefaultValues(res.values);
    session_draft = { ...session_baseline };
    session_warnings = Array.isArray(res.warnings) ? res.warnings : [];
    if (isRecord(res.queue)) {
      binding.onQueueAdopt?.(res.queue);
      worker_draft = {};
      orchestration_runtime = null;
    }
    void loadSessionDefaults({ worker_only: true });
  }

  /**
   * @returns {TemplateResult}
   */
  function paneTemplate() {
    if (active_section === 'quick_fix') {
      return quickFixSection();
    }
    if (active_section === 'session') {
      return sessionSection();
    }
    if (active_section === 'account') {
      return accounts.template();
    }
    return workerSection();
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    render(paneTemplate(), mount_element);
  }

  return {
    /** Reset the per-open drafts and read the bound repo's kv layers. */
    load() {
      ++generation;
      common_saving = false;
      common_invalid = false;
      common_draft = { value: '', revision: null, dirty: false };
      worker_url = null;
      session_baseline = {};
      session_draft = {};
      session_deletions.clear();
      session_warnings = [];
      window.addEventListener('focus', onWindowFocus);
      worker_draft = {};
      orchestration_runtime = null;
      session_text_draft = {};
      session_text_invalid = {};
      /** @type {Promise<void>[]} */
      const pending = [
        loadSessionDefaults({ initial: true }),
        ...accounts.load()
      ];
      return Promise.all(pending).then(() => undefined);
    },
    /**
     * Draw one of {@link PANE_SECTIONS}. Called with nothing it redraws
     * whatever section is on screen, which is what a store fanout wants.
     *
     * @param {string} [section]
     */
    render(section) {
      if (
        typeof section === 'string' &&
        PANE_SECTIONS.some((entry) => entry.id === section)
      ) {
        active_section = section;
      }
      doRender();
    },
    /** Test/inspection seam: the draft this pane would save. */
    sessionDraft: () => ({ ...session_draft }),
    destroy() {
      destroyed = true;
      ++generation;
      window.removeEventListener('focus', onWindowFocus);
      // lit owns every listener it installed inside this host, so clearing the
      // host through lit is what releases them. The clear MUST go through
      // `render` — `replaceChildren()` would
      // eject lit's marker nodes and break the next pane mounted on this same
      // host (the monitor panel reuses one host for every repo).
      render(html``, mount_element);
    }
  };
}
