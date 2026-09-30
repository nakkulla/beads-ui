/**
 * 여러 저장소 설정 — the settings dialog's bulk mode body
 * (UI-nu43 §3.2–§4.1, 편집면은 UI-628r §3–§4.4).
 *
 * The header ⚙ opened from the monitor tab mounts this pane instead of the
 * execution pane. It never edits the connected workspace: every write names a
 * `root_dir` the user ticked in the shared `적용 대상` fieldset.
 *
 * Every tab shows what the ticked repos currently hold (UI-e1ta §3): each row
 * starts from `bulk-observation.js`'s reading of them, and a row whose repos
 * disagree — or whose layer one repo has not read yet — stands on nothing and
 * stays out of the apply until the user touches it. A row that DOES stand on a
 * value is written untouched, which is UI-628r's contract unchanged.
 *
 * - `워커` is the 17-row general execution profile form (`bulk-worker-form.js`)
 *   with its own preset bar; a preset fills it and the apply takes one of two
 *   paths (`bulk-preset-apply.js`).
 * - `quick fix` is the same form over the 8-row quick_fix profile, with its own
 *   preset bar and its own apply record; choosing a preset there edits that
 *   tab's rows alone (UI-uohc §6.2).
 * - `세션` is the three interactive-session rows, written per repo with
 *   `set-session-defaults` (§5).
 * - `계정` is the execution accounts and limit policy form, applied whole
 *   (`bulk-account-apply.js`).
 *
 * Requests run sequentially per repo; each response queue is adopted so the
 * next plan reads the newest revision (`adopted-queue.js`). Switching the tab
 * or destroying the pane stops a run from sending its remaining targets.
 *
 * The templates live in `bulk-sections.js` (targets, results, profile and
 * 세션 tabs), `bulk-account-section.js` (계정 tab) and `bulk-preset-bar.js`
 * (preset bars); this module keeps the state, the plans and the runs.
 *
 * @typedef {import('../../model/bulk-preset-apply.js').BulkResult} BulkResult
 * @typedef {import('./account-catalog.js').AccountCatalog} AccountCatalog
 * @typedef {import('./bulk-shared.js').RunnerForm} RunnerForm
 */
import { html } from 'lit-html';
import { mergeQueue, pruneAdopted } from '../../model/adopted-queue.js';
import {
  planBulkAccountApply,
  runBulkAccountApply
} from '../../model/bulk-account-apply.js';
import { observeKey, observeSet } from '../../model/bulk-observation.js';
import {
  defaultSelectedRoots,
  planBulkApply,
  retryRootsOf,
  runBulkApply,
  supportsQuickFixLane
} from '../../model/bulk-preset-apply.js';
import { disabledModelsOf } from '../../model/model-visibility.js';
import { normalizeAppliesTo } from '../../model/session-model.js';
import { render } from '../../ui/render.js';
import { loadAccountCatalog } from './account-catalog.js';
import { createBulkPresetBar } from './bulk-preset-bar.js';
import { createBulkSections } from './bulk-sections.js';
import {
  ACCOUNT_FIELDS,
  APPLY_BANNER,
  DEFAULT_PREEMPT_PCT,
  RUNNERS,
  SECTION_PROFILE,
  SESSION_ROWS,
  USE_DEFAULT,
  freshRunnerForm,
  isRecord,
  runBulkSessionApply
} from './bulk-shared.js';
import { createBulkWorkerForm } from './bulk-worker-form.js';

/**
 * @typedef {Object} BulkPaneOptions
 * @property {(type: any, payload?: unknown) => Promise<any>} transport
 * @property {() => Array<Record<string, any>>} rows - The monitor pipeline
 * store's `workspaces_state`.
 * @property {(fn: () => void) => () => void} [subscribeRows]
 * @property {{ get: () => any }} [implPresetStore]
 * @property {{ get: () => any }} [modelVisibilityStore] - Server-global model
 * visibility the profile forms filter their model choices by.
 * @property {(root_dirs: string[]) => void} [onBulkApplied] - Called once when
 * a run ends, with the repos whose result is `applied` or `partial`.
 */

/**
 * Mount the bulk pane into `host`.
 *
 * @param {HTMLElement} host
 * @param {BulkPaneOptions} options
 */
export function createBulkPane(host, options) {
  /** @type {'worker'|'quick_fix'|'session'|'account'} */
  let section = 'worker';
  let destroyed = false;

  /** Mutation response queues per repo (newer than the aggregate rows). */
  /** @type {Map<string, any>} */
  const adopted = new Map();

  /** @type {Set<string>} */
  const selected = new Set();
  /** The default selection is taken once, from the first non-empty rows. */
  let selection_seeded = false;

  /**
   * The selected preset PER PROFILE tab: the two bars list different presets,
   * so one selection must not travel to the other tab (§6.2).
   *
   * @type {Record<string, string>}
   */
  const preset_choice = { worker: '', quick_fix: '' };
  /**
   * The preset name box of each tab, written on every keystroke like the
   * single window.
   *
   * @type {Record<string, string>}
   */
  const preset_name_draft = { worker: '', quick_fix: '' };
  /**
   * The last preset save/delete refusal of each tab, shown beside its bar (§9).
   *
   * @type {Record<string, string>}
   */
  const preset_error = { worker: '', quick_fix: '' };

  /** @type {{ worker: BulkResult[]|null, quick_fix: BulkResult[]|null, session: BulkResult[]|null, account: BulkResult[]|null }} */
  let results = {
    worker: null,
    quick_fix: null,
    session: null,
    account: null
  };
  /** @type {{ section: 'worker'|'quick_fix'|'session'|'account', done: number, total: number }|null} */
  let running = null;
  let run_token = 0;

  /**
   * Which account-tab and session-tab fields the user has touched. Keyed by
   * the row's own id (`claude_account`, `claude.mode`, `workflow_mode`, …) so
   * one set answers for every control shape (§3.1).
   *
   * @type {Set<string>}
   */
  const edited = new Set();

  /** @type {Record<'claude_account'|'codex_account', string>} */
  const account_values = {
    claude_account: USE_DEFAULT,
    codex_account: USE_DEFAULT
  };
  /** @type {Record<'claude'|'codex', RunnerForm>} */
  const runner_forms = {
    claude: freshRunnerForm(),
    codex: freshRunnerForm()
  };
  /** The 세션 tab's three rows, as the screen holds them. */
  /** @type {Record<string, string>} */
  const session_values = {};

  /** @type {AccountCatalog|null} */
  let catalog = null;

  /** @returns {Array<Record<string, any>>} */
  function rows() {
    const list = options.rows ? options.rows() : [];
    return Array.isArray(list) ? list.filter((row) => isRecord(row)) : [];
  }

  /**
   * Rows with adopted queues laid over them, in monitor row order.
   *
   * @returns {Array<Record<string, any>>}
   */
  function mergedRows() {
    return rows().map((row) => mergeQueue(row, adopted.get(row.root_dir)));
  }

  /** @returns {Array<Record<string, any>>} */
  function selectedRows() {
    return mergedRows().filter((row) => selected.has(String(row.root_dir)));
  }

  /**
   * The rows both profile forms read their catalog from: the SELECTED repos,
   * or every visible one while nothing is ticked, so the form keeps drawing
   * instead of blanking (UI-628r §4.1).
   *
   * @returns {Array<Record<string, any>>}
   */
  function formRows() {
    const chosen = selectedRows();
    return chosen.length > 0 ? chosen : mergedRows();
  }

  /**
   * Whether any visible repo's server takes quick_fix values at all. The rows
   * the quick fix form reads are the rows this probe reads, so its bar and its
   * fields lock together (§6.1). A capability probe is false by absence.
   *
   * @returns {boolean}
   */
  function quickFixSupported() {
    return supportsQuickFixLane(formRows());
  }

  /** The `워커` tab's 17-row form (§6.2). */
  const worker_form = createBulkWorkerForm({
    rows: formRows,
    profile: 'general',
    // 관측은 고른 저장소만 본다 — 안 고른 저장소의 값은 이 회차의 사실이 아니다.
    selectedRows: () => selectedRows(),
    onChange: () => doRender(),
    disabledModels: () => disabledModelsOf(options.modelVisibilityStore)
  });

  /**
   * The `quick fix` tab's 8-row form. Its labels resolve against the `워커`
   * tab's screen values, which is what makes an empty quick_fix row name the
   * general row it falls through to (§6.2).
   */
  const quick_fix_form = createBulkWorkerForm({
    rows: formRows,
    profile: 'quick_fix',
    selectedRows: () => selectedRows(),
    resolutionValues: () => worker_form.values(),
    onChange: () => doRender(),
    disabledModels: () => disabledModelsOf(options.modelVisibilityStore)
  });

  /**
   * The form of one profile tab.
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {ReturnType<typeof createBulkWorkerForm>}
   */
  function formOf(tab) {
    return tab === 'quick_fix' ? quick_fix_form : worker_form;
  }

  /**
   * Observe one account-layer key across the ticked repos (§6).
   *
   * @param {'claude_account'|'codex_account'} key
   * @returns {import('../../model/bulk-observation.js').Observation}
   */
  function observeAccount(key) {
    return observeKey(selectedRows(), key, 'workspace_accounts');
  }

  /**
   * One repo's stored limit policy for a runner, or `null` when the row does
   * not carry the projection at all.
   *
   * @param {Record<string, any>} row
   * @param {'claude'|'codex'} runner
   * @returns {Record<string, any>|null}
   */
  function policyOf(row, runner) {
    const policy = isRecord(row.provider_limit_policy)
      ? row.provider_limit_policy[runner]
      : null;
    return isRecord(policy) ? policy : null;
  }

  /**
   * Observe one scalar field of a runner's stored limit policy. The policy
   * rides on the monitor row itself, so it has no lookup state (§3).
   *
   * @param {'claude'|'codex'} runner
   * @param {'mode'|'preempt'} field
   * @returns {import('../../model/bulk-observation.js').Observation}
   */
  function observeLimitField(runner, field) {
    const projected = selectedRows().map((row) => {
      const policy = policyOf(row, runner);
      /** @type {string|null} */
      let value = null;
      if (policy && field === 'mode') {
        value = typeof policy.mode === 'string' ? policy.mode : null;
      } else if (policy) {
        value =
          typeof policy.preempt_pct === 'number'
            ? String(policy.preempt_pct)
            : 'off';
      }
      return { ...row, __limit_field: value };
    });
    return observeKey(projected, '__limit_field', 'queue');
  }

  /**
   * Observe one runner's allow SET. Two repos agree only when the members
   * match exactly (§6).
   *
   * @param {'claude'|'codex'} runner
   */
  function observeLimitAccounts(runner) {
    return observeSet(selectedRows(), (row) => {
      const policy = policyOf(row, runner);
      return policy && Array.isArray(policy.accounts)
        ? policy.accounts.filter(
            (/** @type {unknown} */ key) => typeof key === 'string'
          )
        : [];
    });
  }

  /**
   * Observe one 세션 row. All three live in the session-defaults layer, so a
   * repo that has not read that layer makes the row `미확인` (§5).
   *
   * @param {string} key
   * @returns {import('../../model/bulk-observation.js').Observation}
   */
  function observeSession(key) {
    return observeKey(selectedRows(), key, 'session_defaults');
  }

  /**
   * Whether a field stands on a hold rather than a value.
   *
   * @param {string} id - The field's own edit id.
   * @param {{ state: string }} observation
   * @returns {'mixed'|'pending'|null}
   */
  function holdOf(id, observation) {
    return edited.has(id) ? null : holdOptionOf(observation);
  }

  /**
   * Whether the control OFFERS the hold option. An edited control keeps
   * offering it — re-picking it is how the user withdraws the edit (§3.1) — so
   * this reads the observation alone.
   *
   * @param {{ state: string }} observation
   * @returns {'mixed'|'pending'|null}
   */
  function holdOptionOf(observation) {
    return observation.state === 'mixed' || observation.state === 'pending'
      ? /** @type {'mixed'|'pending'} */ (observation.state)
      : null;
  }

  /**
   * Re-read every account-tab and session-tab row the user has not touched
   * (§3.1). A run in flight freezes the recomputation (§9).
   */
  function observeForms() {
    if (running !== null) {
      return;
    }
    worker_form.observe(false);
    quick_fix_form.observe(false);
    for (const [key] of ACCOUNT_FIELDS) {
      if (edited.has(key)) {
        continue;
      }
      const observation = observeAccount(key);
      account_values[key] =
        observation.state === 'same' && observation.value !== null
          ? observation.value
          : USE_DEFAULT;
    }
    for (const runner of RUNNERS) {
      const form = runner_forms[runner];
      if (!edited.has(`${runner}.mode`)) {
        const mode = observeLimitField(runner, 'mode');
        form.mode =
          mode.state === 'same' && mode.value === 'wait' ? 'wait' : 'switch';
      }
      if (!edited.has(`${runner}.accounts`)) {
        const accounts = observeLimitAccounts(runner);
        form.accounts = accounts.state === 'same' ? [...accounts.value] : [];
      }
      if (!edited.has(`${runner}.preempt`)) {
        const preempt = observeLimitField(runner, 'preempt');
        const numeric =
          preempt.state === 'same' && preempt.value !== null
            ? preempt.value
            : null;
        form.preempt = numeric !== null && numeric !== 'off' ? 'pct' : 'off';
        form.pct_text =
          numeric !== null && numeric !== 'off' ? numeric : DEFAULT_PREEMPT_PCT;
      }
    }
    for (const row of SESSION_ROWS) {
      if (edited.has(row.key)) {
        continue;
      }
      const observation = observeSession(row.key);
      if (observation.state === 'same' && observation.value !== null) {
        session_values[row.key] = observation.value;
      } else {
        delete session_values[row.key];
      }
    }
  }

  /** Seed the default selection once and drop repos that left the rows. */
  function reconcileRows() {
    const list = rows();
    pruneAdopted(adopted, list);
    if (!selection_seeded && list.length > 0) {
      selection_seeded = true;
      for (const root_dir of defaultSelectedRoots(list)) {
        selected.add(root_dir);
      }
    }
    const visible = new Set(list.map((row) => String(row.root_dir)));
    for (const root_dir of [...selected]) {
      if (!visible.has(root_dir)) {
        selected.delete(root_dir);
      }
    }
  }

  /** @returns {{ revision: number, presets: Array<Record<string, any>> }|null} */
  function presetState() {
    const state = options.implPresetStore?.get();
    return isRecord(state) && Array.isArray(state.presets)
      ? /** @type {any} */ (state)
      : null;
  }

  /**
   * One tab's presets — the store list narrowed to that tab's profile. A
   * preset stored before `applies_to` existed reads as `general` (§3.1).
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {Array<Record<string, any>>}
   */
  function presetsOf(tab) {
    const state = presetState();
    const profile = SECTION_PROFILE[tab];
    return (state?.presets || []).filter(
      (preset) => preset && normalizeAppliesTo(preset.applies_to) === profile
    );
  }

  /**
   * The preset one tab has selected, looked up inside that tab's own list.
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {Record<string, any>|null}
   */
  function chosenPreset(tab) {
    const id = preset_choice[tab];
    if (id === '') {
      return null;
    }
    return presetsOf(tab).find((preset) => preset.id === id) || null;
  }

  /**
   * Whether BOTH runners' account lists are on hand. Loading and a failed read
   * are the same answer here: the tab may not write what the user cannot see
   * (§3.3).
   *
   * @returns {boolean}
   */
  function catalogReady() {
    return catalog !== null && !!catalog.claude && !!catalog.codex;
  }

  /**
   * The form as a `BulkAccountEdit`. Every field that STANDS ON A VALUE is
   * carried; a field still holding `갈림`이나 `미확인` is omitted, which leaves
   * each repo's own value alone (§3.2). The edit type is already partial, so
   * omission needs no new wire shape.
   *
   * @returns {import('../../model/bulk-account-apply.js').BulkAccountEdit}
   */
  function accountEdit() {
    /** @type {import('../../model/bulk-account-apply.js').BulkAccountEdit} */
    const edit = { values: {}, patches: {} };
    for (const [key] of ACCOUNT_FIELDS) {
      if (holdOf(key, observeAccount(key)) !== null) {
        continue;
      }
      const value = account_values[key];
      edit.values[key] = value === USE_DEFAULT ? null : value;
    }
    for (const runner of RUNNERS) {
      const form = runner_forms[runner];
      const text = form.pct_text.trim();
      /** @type {Partial<import('../../model/bulk-account-apply.js').LimitPatch>} */
      const patch = {};
      if (
        holdOf(`${runner}.mode`, observeLimitField(runner, 'mode')) === null
      ) {
        patch.mode = form.mode;
      }
      if (holdOf(`${runner}.accounts`, observeLimitAccounts(runner)) === null) {
        patch.accounts = [...form.accounts];
      }
      if (!preemptHeld(runner)) {
        patch.preempt_pct =
          form.preempt === 'off'
            ? null
            : /^-?\d+(\.\d+)?$/.test(text)
              ? Number(text)
              : NaN;
      }
      if (Object.keys(patch).length > 0) {
        edit.patches[runner] = patch;
      }
    }
    return edit;
  }

  /**
   * Whether this runner's preemptive threshold is still on a hold. The number
   * box follows the select, so a held select sends no `preempt_pct` (§6).
   *
   * @param {'claude'|'codex'} runner
   * @returns {boolean}
   */
  function preemptHeld(runner) {
    return (
      holdOf(`${runner}.preempt`, observeLimitField(runner, 'preempt')) !== null
    );
  }

  /**
   * One profile tab's plan. Only that tab's form and selection feed it, so a
   * preset chosen on the other tab makes no targets here (§6.2).
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {import('../../model/bulk-preset-apply.js').BulkPlan}
   */
  function presetPlan(tab) {
    const preset = chosenPreset(tab);
    const form = formOf(tab);
    return planBulkApply({
      rows: mergedRows(),
      selected_roots: selected,
      preset_state: presetState(),
      preset_id: preset ? preset_choice[tab] : '',
      form: {
        kv_values: form.kvValues(),
        queue_values: form.queueValues(),
        equals_preset: preset !== null && form.equalsPreset(preset.settings)
      },
      running: running !== null,
      applies_to: tab === 'quick_fix' ? 'quick_fix' : 'general'
    });
  }

  /** @returns {import('../../model/bulk-account-apply.js').BulkAccountPlan} */
  function accountPlan() {
    return planBulkAccountApply({
      rows: mergedRows(),
      selected_roots: selected,
      edit: accountEdit(),
      catalog_ready: catalogReady(),
      running: running !== null
    });
  }

  /**
   * The 세션 tab's payload: the rows that stand on a value, `기본값 사용` rows
   * included as `null` deletions (§5). `base_sync_accept_local_commits` is a
   * contract `bool`, so its two screen values are `true` and the deletion.
   *
   * @returns {Record<string, string|boolean|null>}
   */
  function sessionValues() {
    /** @type {Record<string, string|boolean|null>} */
    const out = {};
    for (const row of SESSION_ROWS) {
      if (holdOf(row.key, observeSession(row.key)) !== null) {
        continue;
      }
      const value = session_values[row.key];
      const present = typeof value === 'string' && value.length > 0;
      if (row.key === 'base_sync_accept_local_commits') {
        out[row.key] = present ? true : null;
        continue;
      }
      out[row.key] = present ? value : null;
    }
    return out;
  }

  /**
   * The 세션 tab's plan, in the same shape the two other tabs' plans carry so
   * one apply button template serves all three.
   *
   * @returns {{ targets: Array<Record<string, any>>, disabled_reason: string|null }}
   */
  function sessionPlan() {
    const values = sessionValues();
    const targets = selectedRows().map((row) => ({
      root_dir: String(row.root_dir),
      name: typeof row.name === 'string' ? row.name : String(row.root_dir),
      values
    }));
    /** @type {string|null} */
    let disabled_reason = null;
    if (running !== null) {
      disabled_reason = '적용 중입니다';
    } else if (targets.length === 0) {
      disabled_reason = '적용할 저장소를 고르세요';
    }
    return { targets, disabled_reason };
  }

  /** Stop a run in flight: the remaining targets are not sent. */
  function cancelRun() {
    run_token += 1;
    running = null;
  }

  /**
   * The plan of one tab.
   *
   * @param {'worker'|'quick_fix'|'session'|'account'} run_section
   * @returns {{ targets: Array<any>, disabled_reason: string|null }}
   */
  function planOf(run_section) {
    if (run_section === 'worker' || run_section === 'quick_fix') {
      return presetPlan(run_section);
    }
    return run_section === 'session' ? sessionPlan() : accountPlan();
  }

  /**
   * Run the active tab's plan.
   *
   * @param {'worker'|'quick_fix'|'session'|'account'} run_section
   */
  async function startRun(run_section) {
    const plan = planOf(run_section);
    if (plan.disabled_reason !== null || rows().length === 0) {
      return;
    }
    cancelRun();
    const token = run_token;
    const targets = plan.targets;
    results = { ...results, [run_section]: null };
    running = { section: run_section, done: 0, total: targets.length };
    doRender();
    const input = {
      targets: /** @type {any} */ (targets),
      send: (/** @type {string} */ type, /** @type {any} */ payload) =>
        options.transport(type, payload),
      adopt: (/** @type {string} */ root_dir, /** @type {any} */ queue) => {
        adopted.set(root_dir, queue);
      },
      onProgress: (
        /** @type {{ done: number, total: number, results: BulkResult[] }} */ progress
      ) => {
        if (token !== run_token) {
          return;
        }
        running = {
          section: run_section,
          done: progress.done,
          total: progress.total
        };
        results = { ...results, [run_section]: [...progress.results] };
        doRender();
      },
      isCancelled: () => destroyed || token !== run_token
    };
    /** @type {BulkResult[]} */
    let outcome;
    if (run_section === 'worker' || run_section === 'quick_fix') {
      outcome = await runBulkApply(input);
    } else if (run_section === 'session') {
      outcome = await runBulkSessionApply({
        targets: /** @type {any} */ (targets),
        send: input.send,
        onProgress: input.onProgress,
        isCancelled: input.isCancelled
      });
    } else {
      outcome = await runBulkAccountApply(input);
    }
    if (token === run_token && !destroyed) {
      running = null;
      results = { ...results, [run_section]: outcome };
      doRender();
    }
    // A stopped run still wrote to the repos it reached, so the open repo card
    // pane is told either way.
    options.onBulkApplied?.(
      outcome
        .filter(
          (result) => result.state === 'applied' || result.state === 'partial'
        )
        .map((result) => result.root_dir)
    );
  }

  /**
   * @param {string} root_dir
   * @param {boolean} checked
   */
  function onRepoToggle(root_dir, checked) {
    if (checked) {
      selected.add(root_dir);
    } else {
      selected.delete(root_dir);
    }
    doRender();
  }

  /**
   * Take every visible repository into the selection, or drop them all. The
   * rows on screen are the whole vocabulary: `reconcileRows` has already
   * dropped anything that left them, so clearing the set is exact.
   *
   * @param {boolean} checked
   */
  function onAllToggle(checked) {
    selected.clear();
    if (checked) {
      for (const row of rows()) {
        selected.add(String(row.root_dir));
      }
    }
    doRender();
  }

  /** Narrow the selection to the failed and partial repos of this tab. */
  function onRetry() {
    const list = results[section];
    if (!list) {
      return;
    }
    selected.clear();
    for (const root_dir of retryRootsOf(list)) {
      selected.add(root_dir);
    }
    doRender();
  }

  // The preset bars and every template live in sibling modules; they read this
  // pane's state through the getters and shared objects handed in here and
  // edit it through the pane's own handlers.
  const { presetBarTemplate, appliedPresetTemplate } = createBulkPresetBar({
    transport: (type, payload) => options.transport(type, payload),
    presetState,
    presetsOf,
    chosenPreset,
    formOf,
    preset_choice,
    preset_name_draft,
    preset_error,
    isRunning: () => running !== null,
    quickFixSupported,
    selectedRows,
    doRender
  });
  const { targetsTemplate, resultsTemplate, sectionTemplate } =
    createBulkSections({
      rows,
      selectedRows,
      selected,
      edited,
      session_values,
      account_values,
      runner_forms,
      section: () => section,
      running: () => running,
      results: () => results,
      catalog: () => catalog,
      formOf,
      presetPlan,
      sessionPlan,
      accountPlan,
      catalogReady,
      observeSession,
      observeAccount,
      observeLimitField,
      observeLimitAccounts,
      holdOf,
      holdOptionOf,
      onAllToggle,
      onRepoToggle,
      onRetry,
      startRun,
      doRender,
      presetBarTemplate,
      appliedPresetTemplate
    });

  function doRender() {
    if (destroyed) {
      return;
    }
    reconcileRows();
    observeForms();
    render(
      html`<div class="settings-dialog__bulk" data-bulk-section=${section}>
        ${targetsTemplate()}
        <p class="settings-dialog__banner" data-bulk-banner>${APPLY_BANNER}</p>
        ${sectionTemplate()} ${resultsTemplate()}
      </div>`,
      host
    );
  }

  /** @type {null|(() => void)} */
  let unsubscribe_rows = options.subscribeRows
    ? options.subscribeRows(() => doRender())
    : null;

  void loadAccountCatalog().then((loaded) => {
    if (destroyed) {
      return;
    }
    catalog = loaded;
    doRender();
  });

  return {
    /**
     * Draw one tab. Switching to another tab stops a run in flight; called
     * with nothing it redraws the tab on screen.
     *
     * @param {'worker'|'quick_fix'|'session'|'account'} [next]
     */
    render(next) {
      if (
        (next === 'worker' ||
          next === 'quick_fix' ||
          next === 'session' ||
          next === 'account') &&
        next !== section
      ) {
        if (running !== null) {
          cancelRun();
        }
        section = next;
      }
      doRender();
    },
    destroy() {
      destroyed = true;
      cancelRun();
      if (unsubscribe_rows) {
        unsubscribe_rows();
        unsubscribe_rows = null;
      }
      render(html``, host);
    }
  };
}
