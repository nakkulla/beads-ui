/**
 * The `실행` settings pane, extracted from the unified settings dialog so two
 * surfaces can mount the SAME code (UI-eey2 §4.4): the dialog's `실행` tab and
 * the monitor deck's per-repo `⚙` panel.
 *
 * The pane owns the tab's whole state machine — session-defaults draft over a
 * server baseline, the UI-only orchestration runtime filter, the orchestration
 * draft over the queue snapshot, execution presets, and the automation section
 * (자동화 · 머지 · 자동 해결 · 동시 실행 · 직렬 레인).
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
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { showToast } from '../../utils/toast.js';
import { claudeLabel, codexLabel } from '../detail-panel/exec-accounts.js';
import { modelRunnerOf } from '../detail-panel/exec-settings.js';
import { promptBlockTemplate, promptStatusTemplate } from '../prompt-block.js';
import {
  AUTO_LITERAL,
  IMPL_PRESET_KEYS,
  IMPL_RUNTIMES,
  IMPL_SPEEDS,
  ORCHESTRATION_KEYS,
  PLAN_REVIEW_MODELS,
  REVIEW_EFFORTS,
  REVIEW_STEP_MODELS,
  WORKFLOW_MODES,
  buildExecutionOptionView,
  buildOrchestrationPatch,
  buildPresetDiff,
  buildSessionDefaultsPatch,
  implEffortOptions,
  implModelOptions,
  narrowImplTarget,
  orchestrationEffortOptions,
  orchestrationModelOptions
} from './session-model.js';

/** The `(기본)` sentinel a select uses for "no explicit value". */
const UNSET = '';

/** The three coupled implementation keys one runtime change re-narrows. */
const IMPL_TARGET_KEYS = ['impl_runtime', 'impl_model', 'impl_effort'];

/**
 * Upper bound on a repo's serial lane count, mirroring the Worker console's own
 * bound (`app/views/worker/index.js`). The server rejects an out-of-range value
 * rather than clamping it, so the stepper carries the bound.
 */
const SERIAL_LANE_MAX = 5;

/** Lower bound on both steppers; the server rejects 0. */
const MIN_COUNT = 1;

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * @typedef {Object} ExecutionPaneBinding
 * @property {string|null} root_dir - `null` = the connected workspace.
 * @property {() => any} queue - The queue-like snapshot this pane edits: the
 * dialog hands `queueStore.get()`, the monitor hands that repo's
 * `workspaces_state` row.
 * @property {(type: any, payload?: unknown) => Promise<any>} transport
 * @property {{ get: () => any }} [implPresetStore]
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
  /** @type {string[]} */
  let session_warnings = [];
  let session_loading = false;

  /**
   * The repo's `bd kv` exec account layer as the server last reported it
   * (UI-d3cb §6.1). `unusable` is a normal response, not a failure: it means
   * this repo's dispatch is refused right now, which is exactly what the banner
   * must say.
   *
   * @type {{ state: 'absent'|'usable'|'unusable', values: Record<string, string>, warnings: string[] }}
   */
  let account_layer = { state: 'absent', values: {}, warnings: [] };
  /** The user's account edits — kept as-is when a save fails. */
  /** @type {Record<string, string>} */
  let account_draft = {};
  /**
   * Accounts are MACHINE-local, so this list is independent of `root_dir` and
   * is read once per mounted pane rather than once per bound repo.
   *
   * @type {{ claude: { accounts: any[], active: any }|null, codex: { accounts: any[], active: any }|null }}
   */
  let account_catalog = { claude: null, codex: null };
  let account_catalog_loaded = false;

  /** UI-only Worker runtime filter; never stored. */
  /** @type {string|null} */
  let worker_runtime_filter = null;
  /** @type {Record<string, string|null>} */
  let worker_draft = {};

  /** @type {string} */
  let preset_choice = '';
  /** Draft name for saving the current execution settings as a preset. */
  let preset_name_draft = '';

  // The worker system prompt: read-only, server-assembled. It moved here with
  // the retired exec-defaults dialog so the surface is not lost (UI-rxp3 §4).
  let prompt_expanded = false;
  let prompt_loading = false;
  let prompt_error = false;
  /** @type {any} */
  let prompt_data = null;

  let destroyed = false;

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

  /** @returns {{ revision: number, presets: any[] }|null} */
  function presetState() {
    const state = binding.implPresetStore?.get();
    return isRecord(state) && Array.isArray(state.presets)
      ? /** @type {any} */ (state)
      : null;
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
    return await transport(/** @type {any} */ (type), payload);
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

  /** Read the workspace session defaults; a failure leaves the tab empty. */
  async function loadSessionDefaults() {
    session_loading = true;
    doRender();
    try {
      const res = await send('get-session-defaults', { ...rootPayload() });
      session_baseline = isRecord(res?.values) ? { ...res.values } : {};
      session_draft = { ...session_baseline };
      session_warnings = Array.isArray(res?.warnings) ? res.warnings : [];
    } catch (err) {
      session_warnings = ['kv_read_failed'];
      notify(
        `세션 기본값을 읽지 못했습니다: ${err instanceof Error ? err.message : String(err)}`
      );
    } finally {
      session_loading = false;
      doRender();
    }
  }

  /** Save the session-tab diff. On failure the draft is KEPT (spec §F). */
  async function saveSessionDefaults() {
    const patch = buildSessionDefaultsPatch(session_baseline, session_draft);
    if (Object.keys(patch).length === 0) {
      return;
    }
    try {
      const res = await send('set-session-defaults', {
        values: patch,
        ...rootPayload()
      });
      session_baseline = isRecord(res?.values) ? { ...res.values } : {};
      session_draft = { ...session_baseline };
      session_warnings = Array.isArray(res?.warnings) ? res.warnings : [];
    } catch (err) {
      // Keep `session_draft` exactly as the user left it so a retry does not
      // ask them to re-enter anything.
      notify(
        `세션 기본값 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * Adopt one `get`/`set` account response as the new baseline AND draft. A
   * null response means the pane is detached or has no transport, which must
   * not be read as "the repo has no defaults".
   *
   * @param {any} res
   */
  function adoptAccountResponse(res) {
    if (!isRecord(res)) {
      return;
    }
    const state = res.state;
    account_layer = {
      state:
        state === 'usable' || state === 'unusable' || state === 'absent'
          ? state
          : 'absent',
      values: isRecord(res.values) ? { ...res.values } : {},
      warnings: Array.isArray(res.warnings) ? res.warnings : []
    };
    account_draft = { ...account_layer.values };
  }

  /** Read the repo's exec account defaults. */
  async function loadWorkspaceAccounts() {
    try {
      adoptAccountResponse(
        await send('get-workspace-accounts', {
          ...rootPayload()
        })
      );
    } catch (err) {
      account_layer = {
        state: 'unusable',
        values: {},
        warnings: ['kv_read_failed']
      };
      account_draft = {};
      notify(
        `실행 계정 기본값을 읽지 못했습니다: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * One provider's selectable rows. Same acceptance as the issue detail panel:
   * the server owns the full row contract, this boundary needs only the stable
   * key and the visible email.
   *
   * @param {string} endpoint
   * @returns {Promise<{ accounts: any[], active: any }|null>}
   */
  async function fetchAccountProvider(endpoint) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        return null;
      }
      const payload = await response.json();
      if (!isRecord(payload) || !Array.isArray(payload.accounts)) {
        return null;
      }
      const accounts = payload.accounts.filter(
        (/** @type {unknown} */ row) =>
          isRecord(row) &&
          typeof row.key === 'string' &&
          row.key.length > 0 &&
          typeof row.email === 'string' &&
          row.email.length > 0
      );
      return {
        accounts,
        active:
          accounts.find((/** @type {any} */ row) => row.active === true) || null
      };
    } catch {
      return null;
    }
  }

  /** Read both account lists once, in parallel. */
  async function loadAccountCatalog() {
    account_catalog_loaded = true;
    const [claude, codex] = await Promise.all([
      fetchAccountProvider('/api/claude-usage'),
      fetchAccountProvider('/api/codex-usage')
    ]);
    if (destroyed) {
      return;
    }
    account_catalog = { claude, codex };
    doRender();
  }

  /**
   * Save ONE account key immediately, the way every other row on this pane
   * saves. On failure the draft is KEPT so a retry costs no re-entry (§6.1).
   *
   * @param {string} key
   */
  async function saveWorkspaceAccounts(key) {
    const next = Object.hasOwn(account_draft, key) ? account_draft[key] : null;
    try {
      adoptAccountResponse(
        await send('set-workspace-accounts', {
          values: { [key]: next },
          ...rootPayload()
        })
      );
    } catch (err) {
      notify(
        `실행 계정 기본값 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onAccountChange(key, value) {
    if (value === UNSET) {
      delete account_draft[key];
    } else {
      account_draft[key] = value;
    }
    doRender();
    void saveWorkspaceAccounts(key);
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
    doRender();
    void saveSessionDefaults();
  }

  /**
   * The runtime an `inherit` delegation would adopt: the runner behind the
   * effective orchestration model, or `null` when neither the draft nor the
   * projection names one.
   *
   * @returns {string|null}
   */
  function controllerRuntime() {
    const chosen = currentOrchestrationValues().orchestration_model;
    const resolved = resolveExecutionSettings({
      global: { orchestration_model: chosen ?? undefined },
      execution_defaults: executionProjection(),
      runner_catalog: runnerCatalog()
    }).orchestration_model.value;
    return resolved ? modelRunnerOf(runnerCatalog(), resolved) : null;
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
      runnerCatalog(),
      controllerRuntime()
    );
    writeImplTargetKey('impl_runtime', narrowed.impl_runtime);
    writeImplTargetKey('impl_model', narrowed.impl_model);
    writeImplTargetKey('impl_effort', narrowed.impl_effort);
    doRender();
    void saveSessionDefaults();
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
      orchestration_speed: queue.orchestration_speed ?? null
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
      notify(
        `Worker 설정 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * @param {string} key
   * @param {string} value
   */
  function onWorkerChange(key, value) {
    worker_draft[key] = value === UNSET ? null : value;
    doRender();
    void saveOrchestration();
  }

  /**
   * Narrow the UI-only runtime filter, clearing the stored orchestration values
   * the new filter can no longer offer. Returning to `전체` narrows nothing, and
   * an unset model stays unset — its default belongs to the projection, not to
   * this layer.
   *
   * @param {string|null} filter
   */
  function onWorkerRuntimeFilterChange(filter) {
    worker_runtime_filter = filter;
    if (!filter) {
      doRender();
      return;
    }
    const catalog = runnerCatalog();
    const current = currentOrchestrationValues();
    let model = current.orchestration_model;
    if (model && !orchestrationModelOptions(catalog, filter).includes(model)) {
      worker_draft.orchestration_model = null;
      model = null;
    }
    const effort = current.orchestration_effort;
    if (
      effort &&
      !orchestrationEffortOptions(
        catalog,
        filter,
        model || AUTO_LITERAL
      ).includes(effort)
    ) {
      worker_draft.orchestration_effort = null;
    }
    doRender();
    void saveOrchestration();
  }

  /** @param {number} slots */
  async function onSlotsChange(slots) {
    if (!queueOf() || slots < MIN_COUNT) {
      return;
    }
    try {
      await sendQueueCas('worker-queue-set-slots', { slots });
    } catch (err) {
      notify(
        `slots 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /** @param {number} count */
  async function onSerialLaneCountChange(count) {
    if (!queueOf() || count < MIN_COUNT || count > SERIAL_LANE_MAX) {
      return;
    }
    try {
      await sendQueueCas('worker-queue-set-serial-lane-count', { count });
    } catch (err) {
      notify(
        `직렬 레인 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * @param {'auto_advance'|'auto_merge'|'auto_repair'} key
   * @param {boolean} on
   */
  async function onAutomationToggle(key, on) {
    const type =
      key === 'auto_advance'
        ? 'worker-automation-toggle'
        : key === 'auto_merge'
          ? 'worker-merge-auto-toggle'
          : 'worker-auto-repair-toggle';
    try {
      await sendQueueCas(type, { on });
    } catch (err) {
      notify(
        `자동화 설정 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /**
   * Current explicit execution values as preset settings — what the pane shows,
   * not what the stores hold. Orchestration reads the same draft-over-queue
   * overlay the rows render, so a value whose queue save failed is still the
   * one a save captures.
   *
   * @returns {Record<string, string>}
   */
  function executionDraftSettings() {
    /** @type {Record<string, string>} */
    const settings = {};
    const orchestration = currentOrchestrationValues();
    for (const key of IMPL_PRESET_KEYS) {
      const value = ORCHESTRATION_KEYS.includes(key)
        ? orchestration[key]
        : session_draft[key];
      if (typeof value === 'string' && value.length > 0) {
        settings[key] = value;
      }
    }
    return settings;
  }

  /**
   * Save the current execution settings as a preset: create when no
   * preset is selected, update the selected one otherwise. Conflicts notify
   * and re-render — the store snapshot arrives through the presets fanout.
   *
   * Presets are workspace-independent (one global catalog), so these three ops
   * take no `root_dir`.
   */
  async function onSavePreset() {
    const state = presetState();
    if (!state) {
      return;
    }
    const settings = executionDraftSettings();
    if (Object.keys(settings).length === 0) {
      notify('저장할 실행 설정이 없습니다 — 먼저 실행 값을 선택하세요');
      return;
    }
    const selected = (state.presets || []).find(
      (/** @type {any} */ preset) => preset.id === preset_choice
    );
    const name = preset_name_draft.trim() || (selected ? selected.name : '');
    if (!name) {
      notify('프리셋 이름을 입력하세요');
      return;
    }
    try {
      const res = selected
        ? await send('impl-preset-update', {
            expected_revision: state.revision,
            id: selected.id,
            name,
            settings
          })
        : await send('impl-preset-create', {
            expected_revision: state.revision,
            name,
            settings
          });
      if (res && res.applied) {
        preset_name_draft = '';
        if (!selected && Array.isArray(res.presets)) {
          const created = res.presets.find(
            (/** @type {any} */ preset) => preset.name === name
          );
          preset_choice = created ? created.id : preset_choice;
        }
        doRender();
      } else {
        notify('프리셋 저장 실패: 다른 곳에서 방금 변경되었습니다');
        doRender();
      }
    } catch (err) {
      notify(
        `프리셋 저장 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  /** Delete the selected execution preset. */
  async function onDeletePreset() {
    const state = presetState();
    if (!state || preset_choice.length === 0) {
      return;
    }
    try {
      const res = await send('impl-preset-delete', {
        expected_revision: state.revision,
        id: preset_choice
      });
      if (res && res.applied) {
        preset_choice = '';
        doRender();
      } else {
        notify('프리셋 삭제 실패: 다른 곳에서 방금 변경되었습니다');
        doRender();
      }
    } catch (err) {
      notify(
        `프리셋 삭제 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  /**
   * Adopt the kv + queue halves of an `apply-impl-preset-global` response.
   *
   * @param {any} res
   */
  function adoptPresetApply(res) {
    session_baseline = isRecord(res.values) ? { ...res.values } : {};
    session_draft = { ...session_baseline };
    session_warnings = Array.isArray(res.warnings) ? res.warnings : [];
    if (isRecord(res.queue)) {
      binding.onQueueAdopt?.(res.queue);
      worker_draft = {};
    }
  }

  /** Apply the chosen execution preset across the kv and queue stores. */
  async function onApplyPresetGlobally() {
    const state = presetState();
    const queue = queueOf();
    if (!state || !queue || preset_choice.length === 0) {
      return;
    }
    /** @param {number} queue_revision */
    const payloadFor = (queue_revision) => ({
      preset_id: preset_choice,
      expected_revision: state.revision,
      expected_queue_revision: queue_revision,
      ...rootPayload()
    });
    try {
      let res = await send(
        'apply-impl-preset-global',
        payloadFor(queue.revision)
      );
      if (res && res.applied) {
        adoptPresetApply(res);
      }
      // A bound pane races a repo whose queue this client does not subscribe
      // to, so the queue half gets the same one-shot CAS retry as every other
      // op here (§12).
      if (root_dir !== null && res && res.queue_applied === false) {
        const fresh =
          res.queue && typeof res.queue.revision === 'number'
            ? res.queue.revision
            : (queueOf()?.revision ?? queue.revision);
        res = await send('apply-impl-preset-global', payloadFor(fresh));
        if (res && res.applied) {
          adoptPresetApply(res);
        }
      }
      if (res && res.applied) {
        if (res.queue_applied === false) {
          notify('오케스트레이션 값은 적용되지 않았습니다 — 다시 시도하세요');
        }
      } else if (res && res.conflict) {
        notify('실행 프리셋 적용 실패: 프리셋이 방금 변경되었습니다');
      }
    } catch (err) {
      notify(
        `실행 프리셋 적용 실패: ${err instanceof Error ? err.message : String(err)}`
      );
    }
    doRender();
  }

  /** Fetch the assembled contract; the client holds no copy to drift from it. */
  async function fetchSystemPrompt() {
    prompt_loading = true;
    prompt_error = false;
    doRender();
    try {
      const res = await send('get-worker-system-prompt', {});
      if (!res || typeof res !== 'object' || Array.isArray(res)) {
        prompt_error = true;
      } else {
        prompt_data = res;
      }
    } catch {
      prompt_error = true;
    } finally {
      prompt_loading = false;
      doRender();
    }
  }

  function toggleSystemPrompt() {
    prompt_expanded = !prompt_expanded;
    if (prompt_expanded && !prompt_data) {
      void fetchSystemPrompt();
      return;
    }
    doRender();
  }

  /**
   * @returns {TemplateResult|''}
   */
  function systemPromptBody() {
    const status = promptStatusTemplate({
      loading: prompt_loading,
      error: prompt_error
    });
    if (status) {
      return status;
    }
    if (!prompt_data) {
      return '';
    }
    const variants = Array.isArray(prompt_data.variants)
      ? prompt_data.variants
      : [];
    return html`<div class="settings-dialog__sp-body">
      ${prompt_data.target_base_placeholder
        ? html`<div class="prompt-block__meta">
            \`${prompt_data.target_base_placeholder}\`는 디스패치 시점에 해석된
            base로 치환됩니다.
          </div>`
        : ''}
      ${variants.map(
        (/** @type {any} */ v) =>
          html`<div class="settings-dialog__sp-variant" data-variant=${v.key}>
            <div class="settings-dialog__sp-cond">${v.condition}</div>
            ${promptBlockTemplate(v.label, v.system_prompt)}
          </div>`
      )}
    </div>`;
  }

  /**
   * @returns {TemplateResult}
   */
  function systemPromptSection() {
    return html`<section
      class="settings-dialog__group"
      data-seam="system-prompt"
    >
      <div class="settings-dialog__group-title">
        워커 시스템 프롬프트
        <span class="settings-dialog__hint">읽기 전용 — 서버가 조립</span>
      </div>
      <button
        type="button"
        class="settings-dialog__btn"
        data-seam="system-prompt-toggle"
        aria-expanded=${prompt_expanded ? 'true' : 'false'}
        @click=${toggleSystemPrompt}
      >
        ${prompt_expanded ? '접기' : '전문 보기'}
      </button>
      ${prompt_expanded ? systemPromptBody() : ''}
    </section>`;
  }

  /**
   * The bare `(기본)`-first select control. `?selected` covers the first
   * render (a `.value` property binding lands before the option children
   * exist) and `live(...)` re-syncs later renders against DOM state.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onChange
   * @param {Record<string, string|null|undefined>} source
   * @param {boolean} [disabled]
   * @param {Record<string, string|null|undefined>} [resolution_source] - Label
   * resolution input when the row's own source is not the whole workspace layer.
   * @returns {TemplateResult}
   */
  function selectControl(
    key,
    label,
    choices,
    onChange,
    source,
    disabled,
    resolution_source
  ) {
    const selected = source[key] ?? UNSET;
    const view = buildExecutionOptionView(
      key,
      choices,
      source,
      executionProjection(),
      runnerCatalog(),
      resolution_source
    );
    const selected_option = view.options.find(
      (option) => option.value === selected
    );
    const full_value =
      selected === UNSET ? view.full_value : selected_option?.full_value;
    return html`<select
        class=${selected === UNSET ? 'settings-dialog__unset' : ''}
        data-key=${key}
        aria-label=${label}
        title=${full_value || ''}
        ?disabled=${disabled === true || view.disabled}
        .value=${live(String(selected))}
        @change=${(/** @type {Event} */ ev) =>
          onChange(
            key,
            String(/** @type {HTMLSelectElement} */ (ev.target).value)
          )}
      >
        <option value=${UNSET} ?selected=${selected === UNSET}>
          ${view.unset_label}
        </option>
        ${view.options.map(
          (option) =>
            html`<option
              value=${option.value}
              title=${option.full_value || ''}
              ?selected=${option.value === selected}
            >
              ${option.label}
            </option>`
        )}
      </select>
      ${selected === UNSET
        ? html`<span class="settings-dialog__source-badge">기본</span>`
        : ''}`;
  }

  /**
   * One `(기본)`-first select row.
   *
   * @param {string} key
   * @param {string} label
   * @param {ReadonlyArray<string>} choices
   * @param {(key: string, value: string) => void} onChange
   * @param {Record<string, string|null|undefined>} source
   * @param {boolean} [disabled]
   * @param {Record<string, string|null|undefined>} [resolution_source]
   * @returns {TemplateResult}
   */
  function selectRow(
    key,
    label,
    choices,
    onChange,
    source,
    disabled = false,
    resolution_source
  ) {
    return html`<div
      class=${`settings-dialog__row${disabled ? ' settings-dialog__row--off' : ''}`}
    >
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        ${selectControl(
          key,
          label,
          choices,
          onChange,
          source,
          disabled,
          resolution_source
        )}
      </span>
    </div>`;
  }

  /**
   * The empty option's label: what "no repo default" actually falls through to,
   * which is the machine's current login (§6.1).
   *
   * @param {'claude'|'codex'} provider_key
   * @param {{ accounts: any[], active: any }|null} provider
   */
  function accountDefaultLabel(provider_key, provider) {
    const active = provider ? provider.active : null;
    if (!isRecord(active)) {
      return '기본값 사용 — 현재 로그인(확인 불가)';
    }
    const active_label =
      provider_key === 'claude'
        ? active.email
        : codexLabel(/** @type {any} */ ({ ...active, alias: null }));
    return `기본값 사용 — 현재 로그인(${active_label})`;
  }

  /**
   * One repo-scoped account row. A stored value the list does not carry stays
   * as its own option, so an unreadable list never silently drops a selection.
   *
   * @param {string} key
   * @param {string} label
   * @param {'claude'|'codex'} provider_key
   * @returns {TemplateResult}
   */
  function accountRow(key, label, provider_key) {
    const provider = account_catalog[provider_key];
    const selected = Object.hasOwn(account_draft, key)
      ? account_draft[key]
      : UNSET;
    const formatter = provider_key === 'claude' ? claudeLabel : codexLabel;
    const known = Boolean(
      provider?.accounts.some((/** @type {any} */ row) => row.key === selected)
    );
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        <select
          aria-label=${label}
          data-account-key=${key}
          @change=${(/** @type {Event} */ ev) =>
            onAccountChange(
              key,
              String(/** @type {HTMLSelectElement} */ (ev.target).value)
            )}
        >
          <option value=${UNSET} ?selected=${selected.length === 0}>
            ${accountDefaultLabel(provider_key, provider)}
          </option>
          ${selected.length > 0 && !known
            ? html`<option value=${selected} selected>
                ${selected} (목록에 없음)
              </option>`
            : ''}
          ${provider?.accounts.map(
            (/** @type {any} */ row) =>
              html`<option value=${row.key} ?selected=${row.key === selected}>
                ${formatter(row)}
              </option>`
          ) || ''}
        </select>
        ${provider
          ? ''
          : html`<span class="settings-dialog__hint"
              >계정 목록을 불러올 수 없습니다</span
            >`}
      </span>
    </div>`;
  }

  /**
   * The account layer's own banner. `unusable` states the CONSEQUENCE rather
   * than the code, because that is what the user is looking at this pane to
   * undo — re-picking a value rewrites a legal object and clears it (§6.1).
   *
   * @returns {string|null}
   */
  function accountBannerText() {
    const detail = account_layer.warnings.join(', ');
    if (account_layer.state === 'unusable') {
      return `실행 계정 기본값을 해석할 수 없어 이 레포의 디스패치가 거부됩니다 — ${detail} · 계정을 다시 고르면 해소됩니다`;
    }
    if (account_layer.warnings.length > 0) {
      return `실행 계정 기본값에 알 수 없는 키가 있습니다 — ${detail}`;
    }
    return null;
  }

  /**
   * One review gate row: the gate's stage dot, its model select, and its
   * effort select side by side (spec §D — 게이트당 모델+effort 쌍).
   *
   * @param {string} label
   * @param {string} stage - Stage token suffix (spec|plan|impl).
   * @param {string} model_key
   * @param {ReadonlyArray<string>} model_choices
   * @param {string} effort_key
   * @returns {TemplateResult}
   */
  function gateRow(label, stage, model_key, model_choices, effort_key) {
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">
        <i
          class="settings-dialog__stage-dot"
          style=${`background: var(--stage-${stage}-on)`}
        ></i>
        ${label}
      </span>
      <span class="settings-dialog__controls">
        ${selectControl(
          model_key,
          `${label} 모델`,
          model_choices,
          onSessionChange,
          session_draft,
          false
        )}
        ${selectControl(
          effort_key,
          `${label} effort`,
          REVIEW_EFFORTS,
          onSessionChange,
          session_draft,
          false
        )}
      </span>
    </div>`;
  }

  /**
   * One automation on/off row (§4.4). The button carries the state so a reader
   * never has to infer it from a checkbox's rendering.
   *
   * @param {'auto_advance'|'auto_merge'|'auto_repair'} key
   * @param {string} label
   * @param {string} hint
   * @param {boolean} on
   * @returns {TemplateResult}
   */
  function toggleRow(key, label, hint, on) {
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        <button
          type="button"
          class=${`settings-dialog__toggle${on ? ' is-on' : ''}`}
          data-automation=${key}
          aria-pressed=${on ? 'true' : 'false'}
          aria-label=${label}
          @click=${() => onAutomationToggle(key, !on)}
        >
          ${on ? '켜짐' : '꺼짐'}
        </button>
        <span class="settings-dialog__hint">${hint}</span>
      </span>
    </div>`;
  }

  /**
   * One `− n +` stepper row.
   *
   * @param {string} seam
   * @param {string} label
   * @param {number} value
   * @param {(next: number) => void} onChange
   * @returns {TemplateResult}
   */
  function stepperRow(seam, label, value, onChange) {
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        <span class="settings-dialog__stepper" data-stepper=${seam}>
          <button
            type="button"
            aria-label=${`${label} 감소`}
            @click=${() => onChange(value - 1)}
          >
            −
          </button>
          <span class="settings-dialog__stepper-value">${value}</span>
          <button
            type="button"
            aria-label=${`${label} 증가`}
            @click=${() => onChange(value + 1)}
          >
            +
          </button>
        </span>
      </span>
    </div>`;
  }

  /**
   * The `현재 → 프리셋` preview for the selected preset. A global apply REPLACES
   * the compared keys, so a key the preset omits reads as `기본(해제)`.
   *
   * @param {{ rows: import('./session-model.js').PresetDiffRow[], ignored_keys: string[] }} diff
   * @returns {TemplateResult}
   */
  function presetDiffTemplate(diff) {
    return html`<div class="settings-dialog__preset-diff" data-preset-diff>
      <div class="settings-dialog__preset-diff-head">
        ${diff.rows.length > 0
          ? `변경 ${diff.rows.length}개 · 적용하면 아래와 같이 바뀝니다`
          : '현재 설정과 같습니다 — 적용할 변경이 없습니다'}
      </div>
      ${diff.rows.map(
        (row) =>
          html`<div
            class="settings-dialog__preset-diff-row"
            data-diff-kind=${row.kind}
          >
            <span class="settings-dialog__preset-diff-label">${row.label}</span>
            <span class="settings-dialog__preset-diff-value"
              >${row.before ?? '기본'}</span
            >
            <span class="settings-dialog__preset-diff-arrow">→</span>
            <span
              class="settings-dialog__preset-diff-value settings-dialog__preset-diff-after"
              >${row.after ?? '기본(해제)'}</span
            >
          </div>`
      )}
      ${diff.ignored_keys.length > 0
        ? html`<div class="settings-dialog__preset-diff-note">
            ${diff.ignored_keys.join(', ')}은(는) 전역 적용이 쓰지 않는 키라
            무시됩니다
          </div>`
        : ''}
    </div>`;
  }

  /** @returns {Record<string, string|null>} */
  function currentOrchestrationValues() {
    const queue = queueOf();
    /** @type {Record<string, string|null>} */
    const current = {};
    for (const key of ORCHESTRATION_KEYS) {
      current[key] = Object.prototype.hasOwnProperty.call(worker_draft, key)
        ? worker_draft[key]
        : queue && typeof queue[key] === 'string'
          ? queue[key]
          : null;
    }
    return current;
  }

  /**
   * @returns {TemplateResult}
   */
  function paneTemplate() {
    const catalog = runnerCatalog();
    // No 실행 방식 row here: `impl_dispatch` is user_write_only per bead and has
    // no workspace-global storage (UI-bu6d §6), so this layer can never disable
    // the delegation rows and never offers the choice that would.
    const runtime = session_draft.impl_runtime;
    const model = session_draft.impl_model;
    const state = presetState();
    const queue = queueOf();
    const orchestration = currentOrchestrationValues();
    const orchestration_models = orchestrationModelOptions(
      catalog,
      worker_runtime_filter
    );
    // Every catalog token, runtime-independent: the delegation runtime is DERIVED
    // from this key's model, so the 위임 대상 row must not narrow it. `auto` is
    // out of the contract's vocabulary here.
    const quick_fix_models = implModelOptions(catalog, undefined).filter(
      (token) => token !== AUTO_LITERAL
    );
    const orchestration_efforts = orchestrationEffortOptions(
      catalog,
      worker_runtime_filter,
      orchestration.orchestration_model || AUTO_LITERAL
    ).filter((effort) => effort !== AUTO_LITERAL);
    const selected_preset = preset_choice
      ? (state?.presets || []).find(
          (/** @type {any} */ preset) => preset.id === preset_choice
        )
      : null;
    const preset_diff = selected_preset
      ? buildPresetDiff(
          executionDraftSettings(),
          isRecord(selected_preset.settings) ? selected_preset.settings : {}
        )
      : null;
    const slots =
      queue && typeof queue.slots === 'number' ? queue.slots : MIN_COUNT + 1;
    const serial_lane_count =
      queue && typeof queue.serial_lane_count === 'number'
        ? queue.serial_lane_count
        : MIN_COUNT;
    const projection_available = executionProjection()?.supported === true;
    const account_banner = accountBannerText();
    const workflow_view = buildExecutionOptionView(
      'workflow_mode',
      WORKFLOW_MODES,
      session_draft,
      executionProjection(),
      catalog
    );
    return html`
      ${session_warnings.length > 0
        ? html`<div class="settings-dialog__banner" role="alert">
            워크스페이스 기본값을 일부 읽지 못했습니다 —
            ${session_warnings.join(', ')}
          </div>`
        : ''}
      ${account_banner
        ? html`<div
            class="settings-dialog__banner"
            data-account-warning
            role="alert"
          >
            ${account_banner}
          </div>`
        : ''}
      ${!projection_available
        ? html`<div
            class="settings-dialog__banner settings-dialog__banner--projection"
            data-execution-defaults-warning
            role="alert"
          >
            실행 기본값 projection을 확인할 수 없습니다 — 기본값 확인 불가
          </div>`
        : ''}
      ${session_loading
        ? html`<div class="settings-dialog__empty">불러오는 중…</div>`
        : html`
            <div class="settings-dialog__preset-bar">
              <select
                aria-label="실행 프리셋"
                .value=${live(preset_choice)}
                @change=${(/** @type {Event} */ ev) => {
                  preset_choice = String(
                    /** @type {HTMLSelectElement} */ (ev.target).value
                  );
                  doRender();
                }}
              >
                <option value="" ?selected=${preset_choice === ''}>
                  실행 프리셋…
                </option>
                ${(state?.presets || []).map(
                  (preset) =>
                    html`<option
                      value=${preset.id}
                      ?selected=${preset.id === preset_choice}
                    >
                      ${preset.name}
                    </option>`
                )}
              </select>
              <button
                type="button"
                class="settings-dialog__btn settings-dialog__btn--primary"
                data-preset-apply-global
                ?disabled=${!preset_diff || preset_diff.rows.length === 0}
                @click=${onApplyPresetGlobally}
              >
                적용
              </button>
              <input
                type="text"
                class="settings-dialog__preset-name"
                placeholder=${preset_choice
                  ? '이름 (비우면 유지)'
                  : '새 프리셋 이름'}
                aria-label="프리셋 이름"
                .value=${live(preset_name_draft)}
                @input=${(/** @type {Event} */ ev) => {
                  preset_name_draft = String(
                    /** @type {HTMLInputElement} */ (ev.target).value
                  );
                }}
              />
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-save
                title=${preset_choice
                  ? '현재 화면의 실행 설정을 이 프리셋에 저장합니다 (프리셋 → 설정 방향이 아님)'
                  : '현재 화면의 실행 설정을 새 프리셋으로 저장합니다'}
                @click=${onSavePreset}
              >
                ${preset_choice ? '현재 설정으로 덮어쓰기' : '새 프리셋 저장'}
              </button>
              <button
                type="button"
                class="settings-dialog__btn"
                data-preset-delete
                ?disabled=${preset_choice.length === 0}
                @click=${onDeletePreset}
              >
                삭제
              </button>
            </div>
            ${preset_diff ? presetDiffTemplate(preset_diff) : ''}

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">오케스트레이션</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">런타임</span>
                <span class="settings-dialog__controls">
                  <select
                    aria-label="런타임"
                    data-key="orchestration_runtime_filter"
                    .value=${live(worker_runtime_filter || UNSET)}
                    @change=${(/** @type {Event} */ ev) => {
                      const next = String(
                        /** @type {HTMLSelectElement} */ (ev.target).value
                      );
                      onWorkerRuntimeFilterChange(next === UNSET ? null : next);
                    }}
                  >
                    <option value=${UNSET} ?selected=${!worker_runtime_filter}>
                      전체
                    </option>
                    <option
                      value="claude"
                      ?selected=${worker_runtime_filter === 'claude'}
                    >
                      claude
                    </option>
                    <option
                      value="codex"
                      ?selected=${worker_runtime_filter === 'codex'}
                    >
                      codex
                    </option>
                  </select>
                  <span class="settings-dialog__hint"
                    >모델 목록을 좁힙니다</span
                  >
                </span>
              </div>
              ${selectRow(
                'orchestration_model',
                '모델',
                orchestration_models,
                onWorkerChange,
                orchestration
              )}
              ${selectRow(
                'orchestration_effort',
                'effort',
                orchestration_efforts,
                onWorkerChange,
                orchestration
              )}
              ${selectRow(
                'orchestration_speed',
                '속도',
                IMPL_SPEEDS,
                onWorkerChange,
                orchestration
              )}
            </div>

            <div class="settings-dialog__group" data-exec-accounts-group>
              <div class="settings-dialog__group-title">실행 계정</div>
              ${accountRow('claude_account', 'Claude', 'claude')}
              ${accountRow('codex_account', 'Codex', 'codex')}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">워크플로우</div>
              <div class="settings-dialog__row">
                <span class="settings-dialog__row-label">모드</span>
                <span class="settings-dialog__controls">
                  <span class="settings-dialog__seg" role="group">
                    <button
                      type="button"
                      data-mode=${UNSET}
                      aria-pressed=${String(!session_draft.workflow_mode)}
                      @click=${() => onSessionChange('workflow_mode', UNSET)}
                    >
                      ${workflow_view.unset_label}
                    </button>
                    ${!session_draft.workflow_mode
                      ? html`<span class="settings-dialog__source-badge"
                          >기본</span
                        >`
                      : ''}
                    ${WORKFLOW_MODES.map(
                      (mode) =>
                        html`<button
                          type="button"
                          data-mode=${mode}
                          aria-pressed=${String(
                            session_draft.workflow_mode === mode
                          )}
                          @click=${() => onSessionChange('workflow_mode', mode)}
                        >
                          ${mode}
                        </button>`
                    )}
                  </span>
                </span>
              </div>
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                리뷰 게이트
                <span class="settings-dialog__hint">모델 · effort</span>
              </div>
              ${gateRow(
                '사양 리뷰',
                'spec',
                'spec_review_model',
                REVIEW_STEP_MODELS,
                'spec_review_effort'
              )}
              ${gateRow(
                '계획 리뷰',
                'plan',
                'plan_review_model',
                PLAN_REVIEW_MODELS,
                'plan_review_effort'
              )}
              ${gateRow(
                '구현 리뷰',
                'impl',
                'impl_review_model',
                REVIEW_STEP_MODELS,
                'impl_review_effort'
              )}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                구현
                <span class="settings-dialog__hint"
                  >이슈 핀이 있으면 핀이 우선합니다</span
                >
              </div>
              ${selectRow(
                'impl_runtime',
                '위임 대상',
                IMPL_RUNTIMES,
                onSessionChange,
                session_draft
              )}
              ${selectRow(
                'impl_model',
                '모델',
                implModelOptions(catalog, runtime),
                onSessionChange,
                session_draft
              )}
              ${selectRow(
                'impl_effort',
                'effort',
                implEffortOptions(catalog, runtime, model),
                onSessionChange,
                session_draft
              )}
              ${selectRow(
                'impl_speed',
                '속도',
                IMPL_SPEEDS,
                onSessionChange,
                session_draft
              )}
              ${selectRow(
                'quick_fix_impl_model',
                'quick_fix 구현 모델',
                quick_fix_models,
                onSessionChange,
                session_draft,
                false,
                { ...session_draft, ...orchestration }
              )}
            </div>

            <div class="settings-dialog__group">
              <div class="settings-dialog__group-title">
                자동화
                <span class="settings-dialog__hint"
                  >이 레포의 워커 큐가 스스로 진행하는 범위</span
                >
              </div>
              ${toggleRow(
                'auto_advance',
                '자동화',
                '슬롯이 비면 대기 앞 행이 출발합니다',
                queue?.auto_advance === true
              )}
              ${toggleRow(
                'auto_merge',
                '머지',
                '자격이 생기는 PR을 계속 머지합니다',
                queue?.auto_merge === true
              )}
              ${toggleRow(
                'auto_repair',
                '자동 해결',
                '실패한 저장소 작업을 세션이 자동으로 복구합니다',
                queue?.auto_repair === true
              )}
              ${stepperRow('slots', '동시 실행', slots, (next) =>
                onSlotsChange(next)
              )}
              ${stepperRow(
                'serial-lane-count',
                '직렬 레인',
                serial_lane_count,
                (next) => onSerialLaneCountChange(next)
              )}
            </div>
            ${systemPromptSection()}
          `}
    `;
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
      worker_draft = {};
      /** @type {Promise<void>[]} */
      const pending = [loadSessionDefaults(), loadWorkspaceAccounts()];
      if (!account_catalog_loaded) {
        pending.push(loadAccountCatalog());
      }
      return Promise.all(pending).then(() => undefined);
    },
    render: doRender,
    /** Test/inspection seam: the draft this pane would save. */
    sessionDraft: () => ({ ...session_draft }),
    destroy() {
      destroyed = true;
      // lit owns every listener it installed inside this host, so clearing the
      // host through lit is what releases them; the pane installs none of its
      // own. The clear MUST go through `render` — `replaceChildren()` would
      // eject lit's marker nodes and break the next pane mounted on this same
      // host (the monitor panel reuses one host for every repo).
      render(html``, mount_element);
    }
  };
}
