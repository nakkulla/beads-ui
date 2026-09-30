/**
 * The issue detail's 실행 설정 section (spec §E, UI-dbn6 §3.5): the effective
 * values with their layer rail (pin · 전역 · 기본), the three-state per-row
 * editors, the preset apply bar, and the account rows. Value resolution is
 * `utils/execution-defaults.js` (through `model/effective-settings.js`); the
 * model choices go through the active-model filter (ADR UI-ooc0) and a stored
 * disabled value stays shown as `(비활성)`.
 *
 * The `전역` layer is the workspace `bd kv` session defaults, read with
 * `get-session-defaults` once per (workspace, issue) and again whenever the
 * connected repo's pushed `session_defaults` change — a settings write then
 * reaches an open detail without reopening it. Moved out of the detail panel
 * closure (UI-dbn6 Phase 2) with its write semantics unchanged.
 *
 * @import { DetailContext } from './index.js'
 */
import { html } from 'lit-html';
import {
  buildImplPresetApplyPayload,
  buildThreeStatePayload
} from '../../model/effective-settings.js';
import { disabledModelsOf } from '../../model/model-visibility.js';
import { modelRunnerOf } from '../../model/runner-catalog.js';
import {
  ORCHESTRATION_KEYS,
  QUICK_FIX_ORCHESTRATION_KEYS
} from '../../model/session-model.js';
import { resolveExecutionSettings } from '../../utils/execution-defaults.js';
import { showToast } from '../../utils/toast.js';
import { effectiveSettingsCardTemplate } from './effective-settings-view.js';
import { execAccountsTemplate } from './exec-accounts.js';
import { EXEC_KEYS, normalizeImplTarget } from './exec-settings.js';

/**
 * @param {string} endpoint
 * @returns {Promise<{ accounts: any[], active: any }|null>}
 */
async function fetchExecAccountProvider(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      return null;
    }
    const payload = await response.json();
    if (
      !payload ||
      typeof payload !== 'object' ||
      !Array.isArray(payload.accounts)
    ) {
      return null;
    }
    const accounts = payload.accounts.filter(
      (/** @type {unknown} */ row) =>
        row !== null && typeof row === 'object' && !Array.isArray(row)
    );
    return {
      accounts,
      active:
        accounts.find(
          (/** @type {any} */ account) => account.active === true
        ) || null
    };
  } catch {
    return null;
  }
}

/**
 * The toast one failed `apply-impl-preset` earns, by the code the server
 * refused with. `preset_route_mismatch` names a profile mismatch the dropdown
 * normally prevents, so the copy explains what a user cannot see.
 *
 * @param {unknown} code
 * @returns {string}
 */
function presetApplyFailureMessage(code) {
  if (code === 'bd_readback_failed') {
    return '설정은 전송됐지만 적용 여부 확인이 필요합니다.';
  }
  if (code === 'preset_route_mismatch') {
    return '이 프리셋은 다른 계열이라 이 이슈에 적용할 수 없습니다.';
  }
  return '실행 프리셋 적용 실패';
}

/**
 * Run one of the two exec handlers where the caller has nothing to do with
 * the outcome. Both already restore their draft and toast, so the rejection
 * must be absorbed here rather than escaping as an unhandled one.
 *
 * @param {Promise<void>} pending
 */
function fireAndForgetExec(pending) {
  void pending.catch(() => {});
}

/**
 * @param {DetailContext} ctx
 */
export function createExecSection(ctx) {
  const options = ctx.options;
  /** @type {Record<string, string>} */
  const exec_local = {};
  let selected_preset_id = '';
  let applying_preset = false;
  let effective_expanded = false;
  /**
   * The workspace `bd kv` session defaults — the `전역` layer of the card. An
   * unreadable layer stays empty and every key falls through to `기본` rather
   * than showing a guess (spec §E/§F).
   *
   * @type {Record<string, string>}
   */
  let session_defaults = {};
  /** @type {string|null} */
  let defaults_loaded_for = null;
  /** @type {string|null} */
  let defaults_pushed = null;
  let defaults_request_seq = 0;
  /** @type {{ claude: { accounts: any[], active: any }|null, codex: { accounts: any[], active: any }|null }} */
  let exec_account_catalog = { claude: null, codex: null };
  /**
   * The repo's `bd kv` account default layer, read beside the catalog on the
   * same request seq. A failed read stays null and the panel keeps its
   * current-login wording (UI-d3cb §6.2).
   *
   * @type {import('./exec-accounts.js').WorkspaceAccountsLayer|null}
   */
  let workspace_accounts = null;
  /** @type {string|null} */
  let exec_account_catalog_loaded_for = null;
  let exec_account_catalog_request_seq = 0;

  function clearLocal() {
    for (const key of Object.keys(exec_local)) {
      delete exec_local[key];
    }
  }

  function resetAccounts() {
    exec_account_catalog = { claude: null, codex: null };
    workspace_accounts = null;
    exec_account_catalog_loaded_for = null;
    exec_account_catalog_request_seq += 1;
  }

  /**
   * @returns {Promise<import('./exec-accounts.js').WorkspaceAccountsLayer|null>}
   */
  async function fetchWorkspaceAccounts() {
    const transport = ctx.transport;
    if (!transport) {
      return null;
    }
    try {
      const res = /** @type {any} */ (
        await Promise.resolve(transport('get-workspace-accounts', {}))
      );
      return res && typeof res.state === 'string' ? res : null;
    } catch {
      return null;
    }
  }

  /**
   * @param {string} id
   */
  async function loadExecAccountCatalog(id) {
    exec_account_catalog_loaded_for = id;
    const seq = ++exec_account_catalog_request_seq;
    const [claude, codex, defaults] = await Promise.all([
      fetchExecAccountProvider('/api/claude-usage'),
      fetchExecAccountProvider('/api/codex-usage'),
      fetchWorkspaceAccounts()
    ]);
    if (seq !== exec_account_catalog_request_seq || id !== ctx.id()) {
      return;
    }
    exec_account_catalog = { claude, codex };
    workspace_accounts = defaults;
    ctx.render();
  }

  /** Read the workspace session defaults for the card's `전역` layer. */
  async function loadSessionDefaults() {
    const transport = ctx.transport;
    if (!transport) {
      return;
    }
    const seq = ++defaults_request_seq;
    /** @type {Record<string, string>} */
    let values = {};
    try {
      const res = /** @type {any} */ (
        await Promise.resolve(transport('get-session-defaults', {}))
      );
      values =
        res && res.values && typeof res.values === 'object' ? res.values : {};
    } catch {
      // Fail-quiet: an unreadable workspace layer shows as `기본`, never as a
      // fabricated value.
      values = {};
    }
    if (seq !== defaults_request_seq) {
      return;
    }
    session_defaults = values;
    ctx.render();
  }

  /** @returns {string|null} */
  function pushedDefaults() {
    const q = ctx.queue();
    return q && Object.hasOwn(q, 'session_defaults')
      ? JSON.stringify(q.session_defaults ?? null)
      : null;
  }

  /**
   * The queue snapshot's `runner_catalog` decoration (UI-jrb3 §7). Null before
   * the first snapshot, which the editor degrades fail-quiet.
   *
   * @returns {any}
   */
  function runnerCatalog() {
    const q = ctx.queue();
    return (q && /** @type {any} */ (q).runner_catalog) || null;
  }

  /** @returns {Record<string, any>|null} */
  function executionDefaults() {
    const q = ctx.queue();
    return q && typeof q.execution_defaults === 'object'
      ? q.execution_defaults
      : null;
  }

  /**
   * The workspace layer: session defaults, with the queue's orchestration keys
   * on top.
   *
   * @returns {Record<string, any>}
   */
  function execDefaults() {
    const q = ctx.queue();
    /** @type {Record<string, any>} */
    const values = { ...session_defaults };
    for (const key of [
      ...ORCHESTRATION_KEYS,
      ...QUICK_FIX_ORCHESTRATION_KEYS
    ]) {
      const value = q && /** @type {any} */ (q)[key];
      if (typeof value === 'string') {
        values[key] = value;
      }
    }
    return values;
  }

  /**
   * The provider the orchestration leg resolves to on this exact screen:
   * optimistic local edit, bead metadata, workspace layer, then the fallback.
   *
   * @returns {string|null}
   */
  function effectiveOrchestrationRuntime() {
    const current = ctx.data();
    const metadata =
      current?.metadata && typeof current.metadata === 'object'
        ? current.metadata
        : {};
    const resolved = resolveExecutionSettings({
      pin: { ...metadata, ...exec_local },
      global: execDefaults(),
      execution_defaults: executionDefaults(),
      runner_catalog: runnerCatalog(),
      route: typeof metadata.route === 'string' ? metadata.route : null
    });
    const model = resolved.orchestration_model.value || '';
    return modelRunnerOf(runnerCatalog(), model);
  }

  /** @returns {{ revision: number, presets: any[] }|null} */
  function execPresetState() {
    const store = options.execPresetStore;
    const state = store ? store.get() : null;
    if (!state || typeof state.revision !== 'number') {
      return null;
    }
    return {
      revision: state.revision,
      presets: Array.isArray(state.presets) ? state.presets : []
    };
  }

  /** @param {any} res */
  function adoptExecPresets(res) {
    const store = options.execPresetStore;
    if (
      store &&
      res &&
      typeof res.revision === 'number' &&
      Array.isArray(res.presets)
    ) {
      store.set({ revision: res.revision, presets: res.presets });
    }
  }

  async function applyImplPreset() {
    const state = execPresetState();
    const preset = state?.presets.find(
      (candidate) => candidate.id === selected_preset_id
    );
    const transport = ctx.transport;
    const id = ctx.id();
    // The COORDINATOR judges compatibility against the live catalog; the client
    // never re-derives a verdict that could disagree with the write boundary.
    if (
      !transport ||
      !id ||
      !state ||
      !preset ||
      preset?.compatible === false ||
      applying_preset
    ) {
      return;
    }
    applying_preset = true;
    ctx.render();
    try {
      const res = /** @type {any} */ (
        await Promise.resolve(
          transport(
            'apply-impl-preset',
            buildImplPresetApplyPayload(id, preset.id, state.revision)
          )
        )
      );
      if (res && res.conflict) {
        adoptExecPresets(res);
        showToast(
          '프리셋이 변경됐습니다. 최신 목록에서 다시 적용하세요.',
          'error',
          4000
        );
        return;
      }
      const issue = res && Array.isArray(res.issue) ? res.issue[0] : res?.issue;
      if (res && res.applied && issue && typeof issue === 'object') {
        ctx.setData(issue);
        for (const key of EXEC_KEYS) {
          delete exec_local[key];
        }
        showToast('실행 프리셋을 적용했습니다.', 'success', 4000);
        return;
      }
      showToast(presetApplyFailureMessage(res && res.error), 'error', 4000);
    } catch (err) {
      showToast(
        presetApplyFailureMessage(
          err && typeof err === 'object'
            ? /** @type {any} */ (err).code
            : undefined
        ),
        'error',
        4000
      );
    } finally {
      applying_preset = false;
      ctx.render();
    }
  }

  /**
   * Write one exec-setting key, optimistically first and authoritatively after
   * the readback. Resolves once the server's `bd show` reply is adopted and
   * rejects — after restoring this key's prior draft value and toasting —
   * when it does not arrive (UI-sbum §4).
   *
   * @param {string} key
   * @param {string} value
   * @returns {Promise<void>}
   */
  async function onExecChange(key, value) {
    const had_previous = Object.hasOwn(exec_local, key);
    const previous = exec_local[key];
    exec_local[key] = value;
    ctx.render();
    const transport = ctx.transport;
    const id = ctx.id();
    if (!transport || !id) {
      return;
    }
    try {
      // THREE-STATE (spec §E): an explicit choice is a literal write and only
      // the editor's `(기본)` — carried here as an empty value — deletes the key.
      const res = await Promise.resolve(
        transport(
          'update-exec-settings',
          buildThreeStatePayload(id, key, value.length === 0 ? null : value)
        )
      );
      // The reply is a `bd show` issue (object or single-item array); a
      // swallowed rejection is `[]`, so anything else is a failure.
      const issue = Array.isArray(res) ? res[0] : res;
      if (!issue || typeof issue !== 'object' || !issue.id) {
        throw new Error('exec settings readback failed');
      }
      ctx.setData(issue);
      delete exec_local[key];
      ctx.render();
    } catch (err) {
      if (had_previous) {
        exec_local[key] = previous;
      } else {
        delete exec_local[key];
      }
      ctx.render();
      showToast('실행 설정 변경 실패', 'error');
      throw err;
    }
  }

  /**
   * Save the three linked implementation controls as one optimistic group.
   * Runtime changes cannot leave a mismatched exact model or effort in the
   * local draft, so incompatible values reset to auto before the one mutation.
   *
   * @param {string} key
   * @param {string} value
   * @returns {Promise<void>}
   */
  async function onImplTargetChange(key, value) {
    const data = ctx.data() || {};
    const metadata =
      data.metadata && typeof data.metadata === 'object' ? data.metadata : {};
    /** @type {Record<string, string|undefined>} */
    const target = {};
    for (const target_key of /** @type {const} */ ([
      'impl_runtime',
      'impl_model',
      'impl_effort'
    ])) {
      target[target_key] = Object.hasOwn(exec_local, target_key)
        ? exec_local[target_key]
        : typeof metadata[target_key] === 'string'
          ? metadata[target_key]
          : '';
    }
    target[key] = value;
    const normalized = normalizeImplTarget(
      /** @type {{ impl_runtime: string, impl_model: string, impl_effort: string }} */ (
        target
      ),
      runnerCatalog()
    );
    /** @type {Record<string, string|undefined>} */
    const previous = {};
    for (const target_key of /** @type {const} */ ([
      'impl_runtime',
      'impl_model',
      'impl_effort'
    ])) {
      previous[target_key] = exec_local[target_key];
      exec_local[target_key] = normalized[target_key] || '';
    }
    ctx.render();
    const transport = ctx.transport;
    const id = ctx.id();
    if (!transport || !id) {
      return;
    }
    return Promise.resolve(
      transport('update-impl-target', {
        id,
        ...normalized,
        orchestration_runtime: effectiveOrchestrationRuntime()
      })
    )
      .then((res) => {
        const issue = Array.isArray(res) ? res[0] : res;
        if (!issue || typeof issue !== 'object' || !issue.id) {
          throw new Error('implementation target readback failed');
        }
        ctx.setData(issue);
        for (const target_key of [
          'impl_runtime',
          'impl_model',
          'impl_effort'
        ]) {
          delete exec_local[target_key];
        }
        ctx.render();
      })
      .catch((err) => {
        for (const target_key of [
          'impl_runtime',
          'impl_model',
          'impl_effort'
        ]) {
          if (previous[target_key] === undefined) {
            delete exec_local[target_key];
          } else {
            exec_local[target_key] = previous[target_key];
          }
        }
        ctx.render();
        showToast('구현 target 변경 실패', 'error');
        throw err;
      });
  }

  return {
    exec_local,
    runnerCatalog,
    /** Forget the previous issue's drafts and reads. */
    reset() {
      clearLocal();
      selected_preset_id = '';
      applying_preset = false;
      effective_expanded = false;
      resetAccounts();
      defaults_loaded_for = null;
    },
    /**
     * Read the layers this issue's card needs, once per (workspace, issue),
     * and the `전역` layer again when the repo's pushed defaults moved.
     *
     * @param {string} id
     */
    load(id) {
      const key = `${ctx.workspace()}::${id}`;
      const pushed = pushedDefaults();
      if (defaults_loaded_for !== key || pushed !== defaults_pushed) {
        defaults_loaded_for = key;
        defaults_pushed = pushed;
        void loadSessionDefaults();
      }
      if (exec_account_catalog_loaded_for !== id) {
        void loadExecAccountCatalog(id);
      }
    },
    /**
     * The card and the account rows over the issue with its local drafts.
     *
     * @param {any} effective - The issue with `exec_local` over its metadata.
     */
    template(effective) {
      return html`${effectiveSettingsCardTemplate(
        {
          metadata: effective.metadata,
          route: effective.workflow?.route,
          workspace_values: execDefaults(),
          catalog: runnerCatalog(),
          execution_defaults: executionDefaults(),
          disabled_models: disabledModelsOf(options.modelVisibilityStore),
          expanded: effective_expanded,
          presets: execPresetState()?.presets || [],
          presets_loaded: execPresetState() !== null,
          preset_id: selected_preset_id,
          preset_busy: applying_preset
        },
        {
          onToggle: (open) => {
            effective_expanded = open;
            ctx.render();
          },
          onEdit: (key, value) => {
            if (
              key === 'impl_runtime' ||
              key === 'impl_model' ||
              key === 'impl_effort'
            ) {
              fireAndForgetExec(onImplTargetChange(key, value ?? ''));
              return;
            }
            fireAndForgetExec(onExecChange(key, value ?? ''));
          },
          onPresetSelect: (preset_id) => {
            selected_preset_id = preset_id;
            ctx.render();
          },
          onPresetApply: () => void applyImplPreset()
        }
      )}
      ${execAccountsTemplate({
        md: effective.metadata,
        worker_attempts: ctx.workerAttempts(),
        catalog: exec_account_catalog,
        workspace_defaults: workspace_accounts,
        handlers: {
          onExecChange: (
            /** @type {string} */ key,
            /** @type {string} */ value
          ) => fireAndForgetExec(onExecChange(key, value))
        }
      })}`;
    }
  };
}
