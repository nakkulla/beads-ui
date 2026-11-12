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
 * - `실행` has worker, quick fix and session review sub tabs. The first two
 *   have independent preset bars and apply records; session review edits only
 *   the six repository review keys and writes no queue values.
 * - `계정` is the pinned accounts and limit policy form, applied whole
 *   (`bulk-account-apply.js`).
 *
 * Requests run sequentially per repo; each response queue is adopted so the
 * next plan reads the newest revision (`adopted-queue.js`). Switching the tab
 * or destroying the pane stops a run from sending its remaining targets.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../monitor/bulk-preset-apply.js').BulkResult} BulkResult
 * @typedef {import('./account-catalog.js').AccountCatalog} AccountCatalog
 */
import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { disabledModelsOf } from '../../utils/model-visibility.js';
import { showToast } from '../../utils/toast.js';
import { mergeQueue, pruneAdopted } from '../monitor/adopted-queue.js';
import {
  CATALOG_REASON,
  planBulkAccountApply,
  runBulkAccountApply
} from '../monitor/bulk-account-apply.js';
import {
  defaultSelectedRoots,
  formatBulkResult,
  messageOf,
  planBulkApply,
  retryRootsOf,
  runBulkApply,
  runBulkTargets,
  supportsQuickFixLane
} from '../monitor/bulk-preset-apply.js';
import {
  accountDefaultLabel,
  accountRowLabel,
  loadAccountCatalog
} from './account-catalog.js';
import {
  appliedPresetProjected,
  observationBadge,
  observeAppliedPreset,
  observeKey,
  observeSet
} from './bulk-observation.js';
import {
  bulkFormKeysFor,
  bulkFormRowKeysFor,
  createBulkWorkerForm
} from './bulk-worker-form.js';
import { createCodexCreditControls } from './codex-credit-controls.js';
import {
  SESSION_REVIEW_NOTICE,
  executionSubtabs
} from './execution-subtabs.js';
import { normalizeAppliesTo } from './session-model.js';

/** Select value for `기본값 사용` (sent as `null`). */
const USE_DEFAULT = '__bulk_use_default__';
/** Default preemptive threshold the number box starts from. */
const DEFAULT_PREEMPT_PCT = '80';
/** Loading copy while the monitor rows have not arrived. */
const ROWS_LOADING = '저장소 목록을 불러오는 중입니다';
/** The sentinel a `갈림 — 유지`·`미확인 — 유지` option carries (§3). */
const HOLD = '__bulk_hold__';
/** What that option is called, by the observation that put it there. */
const HOLD_LABEL = { mixed: '갈림 — 유지', pending: '미확인 — 유지' };
/**
 * Hint next to one tab's preset select (§4.1). The count is that tab's own row
 * count — a preset fills the tab it was chosen on and nothing else (§6.2).
 *
 * @param {'general'|'quick_fix'} profile
 * @returns {string}
 */
function presetHintFor(profile) {
  return `고르면 아래 ${bulkFormRowKeysFor(profile).length}행이 그 프리셋 값으로 채워집니다`;
}

/** The preset profile each bulk tab edits (§6.2). */
const SECTION_PROFILE = Object.freeze({
  worker: 'general',
  quick_fix: 'quick_fix'
});
/** Copy for a runner whose account list could not be read. */
const CATALOG_MISSING = '계정 목록을 불러올 수 없습니다';
/** What the read-only `적용된 프리셋` line says for an id nothing names (§4.1). */
const DELETED_PRESET = '삭제된 프리셋';
/** What that line says for a repo with no record at all. */
const NO_APPLIED_PRESET = '없음';
/** Copy a server with no quick_fix lane locks that whole tab with (§6.1). */
const QUICK_FIX_UNSUPPORTED = '서버가 quick_fix 레인을 지원하지 않습니다';
/**
 * What every preset bar says about the list it edits: one list lives on the
 * server, so a save or a delete here is seen by every workspace (§6.1).
 */
const PRESET_LIST_GLOBAL =
  '프리셋 목록은 서버 전역이라 저장·삭제가 모든 저장소의 목록을 바꿉니다';

/** @type {ReadonlyArray<'claude'|'codex'>} */
const RUNNERS = ['claude', 'codex'];

/**
 * The credit section's scope line: it writes ONE server-global value, not the
 * ticked repos (UI-9y1k §4.6).
 */
const CREDIT_BULK_SCOPE =
  '모든 저장소에 적용(전역) — 위 저장소 선택과 무관하게 바로 저장됩니다';

/** @type {ReadonlyArray<[ 'claude_account'|'codex_account', string, 'claude'|'codex' ]>} */
const ACCOUNT_FIELDS = [
  ['claude_account', 'Claude', 'claude'],
  ['codex_account', 'Codex', 'codex']
];

/**
 * One apply button's own plan, run and results (UI-32oq §4.4).
 *
 * @typedef {'worker'|'quick_fix'|'session_review'|'account'} RunSection
 */

/**
 * @typedef {Object} RunnerForm
 * @property {'wait'|'switch'} mode - Limit mode; the queue default to start.
 * @property {string[]} accounts - The allow set exactly as the boxes show it.
 * @property {'off'|'pct'} preempt - Threshold choice.
 * @property {string} pct_text - Raw number box text, written on every input.
 */

/**
 * @typedef {Object} BulkPaneOptions
 * @property {(type: any, payload?: unknown) => Promise<any>} transport
 * @property {import('./execution-subtabs.js').ExecutionSubtab} [executionSubtab]
 * @property {(tab: import('./execution-subtabs.js').ExecutionSubtab) => void} [onExecutionSubtabChange]
 * @property {() => Array<Record<string, any>>} rows - The monitor pipeline
 * store's `workspaces_state`.
 * @property {(fn: () => void) => () => void} [subscribeRows]
 * @property {{ get: () => any }} [implPresetStore]
 * @property {{ get: () => any }} [modelVisibilityStore] - Server-global model
 * visibility the profile forms filter their model choices by.
 * @property {{ get: () => any, set?: (state: any) => void, subscribe?: (fn: () => void) => () => void }} [codexCreditStore]
 * - Server-global Codex credit settings (UI-9y1k §4.6), written at once by the
 * `계정` tab's credit section.
 * @property {(message: string) => void} [notify]
 * @property {(root_dirs: string[]) => void} [onBulkApplied] - Called once when
 * a run ends, with the repos whose result is `applied` or `partial`.
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The limit form every runner starts from: the queue's own defaults, because
 * this tab has no `변경 안 함` to start from (§3.3).
 *
 * @returns {RunnerForm}
 */
function freshRunnerForm() {
  return {
    mode: 'switch',
    accounts: [],
    preempt: 'off',
    pct_text: DEFAULT_PREEMPT_PCT
  };
}

/**
 * Mount the bulk pane into `host`.
 *
 * @param {HTMLElement} host
 * @param {BulkPaneOptions} options
 */
export function createBulkPane(host, options) {
  /** @type {'execution'|'account'} */
  let section = 'execution';
  /** @type {import('./execution-subtabs.js').ExecutionSubtab} */
  let execution_subtab = options.executionSubtab || 'worker';
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

  /** @type {Record<RunSection, BulkResult[]|null>} */
  let results = {
    worker: null,
    quick_fix: null,
    session_review: null,
    account: null
  };
  /** @type {{ section: RunSection, done: number, total: number }|null} */
  let running = null;
  let run_token = 0;

  /**
   * Which account-tab fields the user has touched. Keyed by the row's own id
   * (`claude_account`, `claude.mode`, …) so one set answers for every control
   * shape (§3.1).
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
  /** @type {AccountCatalog|null} */
  let catalog = null;

  /**
   * The global credit section. It writes the server-global store directly,
   * never through the apply plan, so the repo selection does not touch it.
   */
  const codex_credit_controls = createCodexCreditControls({
    store: options.codexCreditStore,
    transport: options.transport,
    notify: options.notify || ((message) => showToast(message, 'error', 4000)),
    onChange: () => doRender()
  });

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

  /** The worker profile's eleven-row form. */
  const worker_form = createBulkWorkerForm({
    rows: formRows,
    profile: 'general',
    // 관측은 고른 저장소만 본다 — 안 고른 저장소의 값은 이 회차의 사실이 아니다.
    selectedRows: () => selectedRows(),
    onChange: () => doRender(),
    disabledModels: () => disabledModelsOf(options.modelVisibilityStore)
  });

  /**
   * The quick fix profile's eleven-row form. Its labels resolve against the `워커`
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

  const session_review_form = createBulkWorkerForm({
    rows: formRows,
    profile: 'session_review',
    selectedRows: () => selectedRows(),
    onChange: () => doRender(),
    disabledModels: () => disabledModelsOf(options.modelVisibilityStore)
  });

  /**
   * The form of one profile tab.
   *
   * @param {'worker'|'quick_fix'|'session_review'} tab
   * @returns {ReturnType<typeof createBulkWorkerForm>}
   */
  function formOf(tab) {
    if (tab === 'session_review') {
      return session_review_form;
    }
    return tab === 'quick_fix' ? quick_fix_form : worker_form;
  }

  /**
   * Observe one account-layer key across the ticked repos (§6).
   *
   * @param {'claude_account'|'codex_account'} key
   * @returns {import('./bulk-observation.js').Observation}
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
   * @returns {import('./bulk-observation.js').Observation}
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
   * match exactly (§6). The list is the switch ORDER (UI-9y1k §4.6; Claude too
   * since UI-iopp), so the same members in another order disagree too.
   *
   * @param {'claude'|'codex'} runner
   */
  function observeLimitAccounts(runner) {
    return observeSet(
      selectedRows(),
      (row) => {
        const policy = policyOf(row, runner);
        return policy && Array.isArray(policy.accounts)
          ? policy.accounts.filter(
              (/** @type {unknown} */ key) => typeof key === 'string'
            )
          : [];
      },
      { ordered: true }
    );
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
   * Re-read every account-tab row the user has not touched
   * (§3.1). A run in flight freezes the recomputation (§9).
   */
  function observeForms() {
    if (running !== null) {
      return;
    }
    worker_form.observe(false);
    quick_fix_form.observe(false);
    session_review_form.observe(false);
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
   * @returns {import('../monitor/bulk-account-apply.js').BulkAccountEdit}
   */
  function accountEdit() {
    /** @type {import('../monitor/bulk-account-apply.js').BulkAccountEdit} */
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
      /** @type {Partial<import('../monitor/bulk-account-apply.js').LimitPatch>} */
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
   * @param {'worker'|'quick_fix'|'session_review'} tab
   * @returns {import('../monitor/bulk-preset-apply.js').BulkPlan}
   */
  function presetPlan(tab) {
    const preset = tab === 'session_review' ? null : chosenPreset(tab);
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

  /** @returns {import('../monitor/bulk-account-apply.js').BulkAccountPlan} */
  function accountPlan() {
    return planBulkAccountApply({
      rows: mergedRows(),
      selected_roots: selected,
      edit: accountEdit(),
      catalog_ready: catalogReady(),
      running: running !== null
    });
  }

  /** Stop a run in flight: the remaining targets are not sent. */
  function cancelRun() {
    run_token += 1;
    running = null;
  }

  /**
   * The plan of one apply button.
   *
   * @param {RunSection} run_section
   * @returns {{ targets: Array<any>, disabled_reason: string|null }}
   */
  function planOf(run_section) {
    if (run_section !== 'account') {
      return presetPlan(run_section);
    }
    return accountPlan();
  }

  /**
   * Run one apply button's plan.
   *
   * @param {RunSection} run_section
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
    if (run_section === 'session_review') {
      outcome = await runBulkTargets({
        targets,
        skippedResult: (target) => ({
          root_dir: target.root_dir,
          name: target.name,
          state: 'skipped',
          detail: '중단됨'
        }),
        runOne: async (target) => {
          /** @type {BulkResult} */
          const result = {
            root_dir: target.root_dir,
            name: target.name,
            state: 'failed',
            detail: ''
          };
          try {
            const response = await options.transport(
              'set-session-defaults',
              target.kv_payload
            );
            result.state =
              isRecord(response) &&
              !response.error &&
              response.applied !== false
                ? 'applied'
                : 'failed';
            result.detail =
              result.state === 'applied' ? '' : messageOf(response);
          } catch (err) {
            result.detail = err instanceof Error ? err.message : String(err);
          }
          return { result, stopped: false, cancelled: false };
        },
        onProgress: input.onProgress,
        isCancelled: input.isCancelled
      });
    } else if (run_section === 'worker' || run_section === 'quick_fix') {
      outcome = await runBulkApply(input);
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

  /**
   * Narrow the selection to the failed and partial repos of one apply.
   *
   * @param {RunSection} run_section
   */
  function onRetry(run_section) {
    const list = results[run_section];
    if (!list) {
      return;
    }
    selected.clear();
    for (const root_dir of retryRootsOf(list)) {
      selected.add(root_dir);
    }
    doRender();
  }

  /** @returns {TemplateResult} */
  function targetsTemplate() {
    const list = rows();
    if (list.length === 0) {
      return html`<p class="settings-dialog__bulk-loading" data-bulk-loading>
        ${ROWS_LOADING}
      </p>`;
    }
    const chosen = list.filter((row) =>
      selected.has(String(row.root_dir))
    ).length;
    return html`<fieldset class="settings-dialog__bulk-targets">
      <legend>적용 대상</legend>
      <label class="settings-dialog__bulk-repo settings-dialog__bulk-repo--all">
        <input
          type="checkbox"
          data-bulk-all
          .checked=${live(chosen === list.length)}
          .indeterminate=${live(chosen > 0 && chosen < list.length)}
          ?disabled=${running !== null}
          @change=${(/** @type {Event} */ ev) =>
            onAllToggle(/** @type {HTMLInputElement} */ (ev.target).checked)}
        />
        <span>전체</span>
      </label>
      ${list.map(
        (row) =>
          html`<label class="settings-dialog__bulk-repo" title=${row.root_dir}>
            <input
              type="checkbox"
              data-bulk-repo=${row.root_dir}
              .checked=${live(selected.has(row.root_dir))}
              ?disabled=${running !== null}
              @change=${(/** @type {Event} */ ev) =>
                onRepoToggle(
                  row.root_dir,
                  /** @type {HTMLInputElement} */ (ev.target).checked
                )}
            />
            <span>${row.name}</span>
          </label>`
      )}
    </fieldset>`;
  }

  /**
   * The badge one observed row carries, or nothing when it stands on its own
   * value with nothing to explain (§3).
   *
   * @param {string} id - The row's edit id.
   * @param {import('./bulk-observation.js').Observation|{ state: string, value: any, per_repo: any[], pending_count?: number }} observation
   * @param {(value: string|null) => string} [labelOf]
   * @returns {TemplateResult|''}
   */
  function badgeTemplate(id, observation, labelOf) {
    if (edited.has(id)) {
      return html`<span
        class="settings-dialog__obs settings-dialog__obs--edited"
        data-bulk-badge=${id}
        >편집됨</span
      >`;
    }
    const badge = observationBadge(
      /** @type {any} */ ({ pending_count: 0, ...observation }),
      labelOf
    );
    if (!badge) {
      return '';
    }
    return html`<span
      class=${`settings-dialog__obs settings-dialog__obs--${badge.state}`}
      data-bulk-badge=${id}
      data-bulk-observation=${badge.state}
      title=${badge.title}
      >${badge.text}</span
    >`;
  }

  /**
   * @param {RunSection} run_section
   * @param {{ targets: unknown[], disabled_reason: string|null }} plan
   * @returns {TemplateResult}
   */
  function applyButtonTemplate(run_section, plan) {
    const loading = rows().length === 0;
    const reason = loading ? ROWS_LOADING : plan.disabled_reason;
    return html`<button
      type="button"
      class="op-btn op-btn--primary settings-dialog__bulk-apply"
      data-bulk-apply=${run_section}
      title=${reason || ''}
      ?disabled=${reason !== null}
      @click=${() => void startRun(run_section)}
    >
      ${running && running.section === run_section
        ? `적용 중 ${running.done}/${running.total}`
        : `선택 ${plan.targets.length}곳에 적용`}
    </button>`;
  }

  /**
   * One apply button's per-repo results.
   *
   * @param {RunSection} run_section
   * @returns {TemplateResult|''}
   */
  function resultsTemplate(run_section) {
    const list = results[run_section];
    if (!list || list.length === 0) {
      return '';
    }
    const retryable = retryRootsOf(list).length > 0;
    return html`<div class="settings-dialog__bulk-results" data-bulk-results>
      ${list.map((result) => {
        const line = formatBulkResult(result);
        return html`<span
          class=${`settings-dialog__bulk-result is-${result.state}`}
          data-bulk-result=${result.root_dir}
          >${line.icon} ${line.text}</span
        >`;
      })}
      ${retryable
        ? html`<button
            type="button"
            class="op-btn settings-dialog__bulk-retry"
            data-bulk-retry=${run_section}
            ?disabled=${running !== null}
            @click=${() => onRetry(run_section)}
          >
            실패·부분 적용 저장소만 다시 적용
          </button>`
        : ''}
    </div>`;
  }

  /**
   * The preset select fills THIS TAB's form and nothing else: the apply path
   * is decided later by comparing that form against it (§2.2), and the other
   * tab's rows keep their own observations (§6.2).
   *
   * @param {'worker'|'quick_fix'} tab
   * @param {string} id
   */
  function onPresetChoice(tab, id) {
    preset_choice[tab] = id;
    const preset = chosenPreset(tab);
    if (preset) {
      formOf(tab).applyPreset(preset.settings);
      return;
    }
    doRender();
  }

  /**
   * Save this tab's rows as a preset OF THIS TAB'S PROFILE: create when
   * nothing is selected, overwrite the selected one otherwise. Same three ops
   * and the same `expected_revision` race judgement as the single-repo window
   * (§4.1).
   *
   * @param {'worker'|'quick_fix'} tab
   */
  async function onSavePreset(tab) {
    const state = presetState();
    if (!state) {
      return;
    }
    const profile = SECTION_PROFILE[tab];
    const settings = formOf(tab).presetSettings();
    const chosen = chosenPreset(tab);
    const name = preset_name_draft[tab].trim() || (chosen ? chosen.name : '');
    if (!name) {
      return;
    }
    try {
      const res = chosen
        ? await options.transport('impl-preset-update', {
            expected_revision: state.revision,
            id: chosen.id,
            name,
            settings
          })
        : await options.transport('impl-preset-create', {
            expected_revision: state.revision,
            name,
            applies_to: profile,
            settings
          });
      if (isRecord(res) && res.applied === true) {
        preset_name_draft[tab] = '';
        if (!chosen && Array.isArray(res.presets)) {
          const created = res.presets.find(
            (/** @type {any} */ preset) =>
              preset &&
              preset.name === name &&
              normalizeAppliesTo(preset.applies_to) === profile
          );
          preset_choice[tab] = created ? created.id : preset_choice[tab];
        }
      } else {
        preset_error[tab] = '프리셋 저장 실패: 다른 곳에서 방금 변경되었습니다';
      }
    } catch (err) {
      preset_error[tab] = `프리셋 저장 실패: ${messageOf(err)}`;
    }
    doRender();
  }

  /**
   * Delete this tab's selected preset; nothing else is touched (§4.1).
   *
   * @param {'worker'|'quick_fix'} tab
   */
  async function onDeletePreset(tab) {
    const state = presetState();
    const chosen = chosenPreset(tab);
    if (!state || !chosen) {
      return;
    }
    try {
      const res = await options.transport('impl-preset-delete', {
        expected_revision: state.revision,
        id: chosen.id
      });
      if (isRecord(res) && res.applied === true) {
        preset_choice[tab] = '';
      } else {
        preset_error[tab] = '프리셋 삭제 실패: 다른 곳에서 방금 변경되었습니다';
      }
    } catch (err) {
      preset_error[tab] = `프리셋 삭제 실패: ${messageOf(err)}`;
    }
    doRender();
  }

  /**
   * The read-only `적용된 프리셋` line of ONE tab (§4.1): each tab reads its
   * own profile's record, and the two are independent. The record's identity
   * is its `id`, and the NAME is looked up in the preset list the window
   * already holds — the stored `name` is a copy from apply time and lies after
   * a rename. An id nothing names is `삭제된 프리셋`, never an invented name.
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {TemplateResult|''}
   */
  function appliedPresetTemplate(tab) {
    const chosen = selectedRows();
    const profile = SECTION_PROFILE[tab];
    if (!appliedPresetProjected(chosen, profile)) {
      return '';
    }
    const observation = observeAppliedPreset(chosen, profile);
    const presets = presetState()?.presets || [];
    /** @param {string|null} id */
    const nameOf = (id) => {
      if (id === null) {
        return NO_APPLIED_PRESET;
      }
      const found = presets.find(
        (/** @type {any} */ preset) => preset && preset.id === id
      );
      return found ? String(found.name) : DELETED_PRESET;
    };
    const badge = observationBadge(observation, nameOf);
    return html`<div class="settings-dialog__row" data-bulk-applied-preset>
      <span class="settings-dialog__row-label">적용된 프리셋</span>
      <span class="settings-dialog__controls">
        <span data-bulk-applied-preset-value
          >${nameOf(
            observation.state === 'same' ? observation.value : null
          )}</span
        >
        ${badge
          ? html`<span
              class=${`settings-dialog__obs settings-dialog__obs--${badge.state}`}
              data-bulk-observation=${badge.state}
              title=${badge.title}
              >${badge.text}</span
            >`
          : ''}
      </span>
    </div>`;
  }

  /**
   * One tab's preset bar. The list is that tab's profile alone, so neither bar
   * ever offers the other's presets (§6.2). A server with no quick_fix lane
   * locks the quick fix bar whole — select, name, save and delete — with the
   * same copy its rows carry (§6.1); the worker bar is untouched by that probe.
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {TemplateResult}
   */
  function presetBarTemplate(tab) {
    const profile = SECTION_PROFILE[tab];
    const form = formOf(tab);
    const presets = presetsOf(tab);
    const chosen_id = preset_choice[tab];
    const chosen = chosenPreset(tab);
    const row_count = bulkFormRowKeysFor(profile).length;
    const holds = form.holdCounts();
    const unsettled = holds.mixed + holds.pending;
    const lane_locked = tab === 'quick_fix' && !quickFixSupported();
    const lane_title = lane_locked ? QUICK_FIX_UNSUPPORTED : '';
    const save_title = lane_locked
      ? QUICK_FIX_UNSUPPORTED
      : unsettled > 0
        ? `값이 서지 않은 ${unsettled}행을 먼저 정하세요`
        : `${
            chosen
              ? `현재 화면의 ${row_count}행을 이 프리셋에 저장합니다`
              : `현재 화면의 ${row_count}행을 새 프리셋으로 저장합니다`
          } — ${PRESET_LIST_GLOBAL}`;
    return html`<div
      class="settings-dialog__bulk-hd settings-dialog__preset-bar"
      data-bulk-preset-bar=${profile}
    >
      <select
        class="ui-select ui-select--bare settings-dialog__bulk-preset"
        aria-label="적용할 실행 프리셋"
        data-bulk-preset
        title=${lane_title}
        ?disabled=${running !== null || lane_locked}
        @change=${(/** @type {Event} */ ev) =>
          onPresetChoice(
            tab,
            String(/** @type {HTMLSelectElement} */ (ev.target).value)
          )}
      >
        <option value="" ?selected=${chosen_id === ''}>실행 프리셋…</option>
        ${presets.map(
          (preset) =>
            html`<option
              value=${preset.id}
              ?selected=${preset.id === chosen_id}
              ?disabled=${preset.compatible === false}
              title=${preset.compatible === false
                ? preset.incompatibility_reason || ''
                : ''}
            >
              ${preset.name}
            </option>`
        )}
      </select>
      <input
        type="text"
        class="ui-input settings-dialog__preset-name"
        aria-label="프리셋 이름"
        data-bulk-preset-name
        placeholder=${chosen ? '이름 (비우면 유지)' : '새 프리셋 이름'}
        title=${lane_title}
        .value=${live(preset_name_draft[tab])}
        ?disabled=${running !== null || lane_locked}
        @input=${(/** @type {Event} */ ev) => {
          preset_name_draft[tab] = String(
            /** @type {HTMLInputElement} */ (ev.target).value
          );
        }}
      />
      <button
        type="button"
        class="op-btn"
        data-bulk-preset-save
        title=${save_title}
        ?disabled=${running !== null || unsettled > 0 || lane_locked}
        @click=${() => void onSavePreset(tab)}
      >
        ${chosen ? '현재 설정으로 덮어쓰기' : '새 프리셋 저장'}
      </button>
      <button
        type="button"
        class="op-btn"
        data-bulk-preset-delete
        title=${lane_title}
        ?disabled=${running !== null || chosen === null || lane_locked}
        @click=${() => void onDeletePreset(tab)}
      >
        삭제
      </button>
      <span class="settings-dialog__hint" data-bulk-preset-hint
        >${presetHintFor(profile)}</span
      >
      ${preset_error[tab]
        ? html`<span class="settings-dialog__bulk-reason" data-bulk-preset-error
            >${preset_error[tab]}</span
          >`
        : ''}
    </div>`;
  }

  /**
   * The footer line: how many rows drop out this round and how many are
   * actually written (§3.2).
   *
   * @param {number} total
   * @param {{ mixed: number, pending: number }} holds
   * @returns {string}
   */
  function footerCount(total, holds) {
    const repos = selectedRows().length;
    const parts = [];
    if (holds.mixed > 0) {
      parts.push(`갈림 ${holds.mixed}행`);
    }
    if (holds.pending > 0) {
      parts.push(`미확인 ${holds.pending}행`);
    }
    const applied = total - holds.mixed - holds.pending;
    return parts.length > 0
      ? `${parts.join(' · ')}은 적용에서 빠집니다 · 나머지 ${applied}행을 저장소 ${repos}곳에 씁니다`
      : `${applied}행을 저장소 ${repos}곳에 씁니다`;
  }

  /**
   * One profile tab: its preset bar, its read-only apply record, its rows and
   * its own footer count and apply button (§6.2).
   *
   * @param {'worker'|'quick_fix'} tab
   * @returns {TemplateResult}
   */
  function profileTemplate(tab) {
    const form = formOf(tab);
    const plan = presetPlan(tab);
    const holds = form.holdCounts();
    return html`${presetBarTemplate(tab)} ${appliedPresetTemplate(tab)}
      ${form.template(running !== null)}
      <div class="settings-dialog__bulk-hd settings-dialog__bulk-foot">
        <span class="settings-dialog__bulk-count" data-bulk-count
          >${footerCount(
            bulkFormKeysFor(SECTION_PROFILE[tab]).length,
            holds
          )}</span
        >
        ${applyButtonTemplate(tab, plan)}
      </div>
      ${resultsTemplate(tab)}`;
  }

  /**
   * @param {'claude_account'|'codex_account'} key
   * @param {string} label
   * @param {'claude'|'codex'} provider_key
   * @returns {TemplateResult}
   */
  function accountSelectTemplate(key, label, provider_key) {
    const provider = catalog ? catalog[provider_key] : null;
    const observation = observeAccount(key);
    const hold = holdOf(key, observation);
    const hold_option = holdOptionOf(observation);
    const value = hold === null ? account_values[key] : HOLD;
    // A stored account the catalog does not carry keeps its own option, so the
    // select never looks like `기본값 사용` while the apply still writes the
    // hidden value (execution-pane `accountRow` does the same).
    const orphan_value =
      value !== HOLD &&
      value !== USE_DEFAULT &&
      typeof value === 'string' &&
      value.length > 0 &&
      !(provider?.accounts || []).some(
        (/** @type {any} */ entry) => entry.key === value
      )
        ? value
        : null;
    /** @param {string|null} stored */
    const nameOf = (stored) => {
      if (stored === null) {
        return '기본값 사용';
      }
      const row = (provider?.accounts || []).find(
        (/** @type {any} */ entry) => entry.key === stored
      );
      return row ? accountRowLabel(provider_key, row) : stored;
    };
    return html` <span class="settings-dialog__row-label">${label}</span>
      <span class="settings-dialog__controls">
        <select
          class="ui-select ui-select--bare"
          aria-label=${`${provider_key === 'claude' ? 'Claude' : 'Codex'} ${label}`}
          data-bulk-account=${key}
          ?disabled=${running !== null || !provider}
          @change=${(/** @type {Event} */ ev) => {
            const next = String(
              /** @type {HTMLSelectElement} */ (ev.target).value
            );
            if (next === HOLD) {
              edited.delete(key);
            } else {
              edited.add(key);
              account_values[key] = next;
            }
            doRender();
          }}
        >
          ${hold_option === null
            ? ''
            : html`<option value=${HOLD} ?selected=${hold !== null}>
                ${HOLD_LABEL[hold_option]}
              </option>`}
          <option value=${USE_DEFAULT} ?selected=${value === USE_DEFAULT}>
            ${accountDefaultLabel(provider)}
          </option>
          ${orphan_value === null
            ? ''
            : html`<option value=${orphan_value} selected>
                ${`${orphan_value} (목록에 없음)`}
              </option>`}
          ${(provider?.accounts || []).map(
            (/** @type {any} */ row) =>
              html`<option value=${row.key} ?selected=${row.key === value}>
                ${accountRowLabel(provider_key, row)}
              </option>`
          )}
        </select>
        ${badgeTemplate(key, observation, nameOf)}
      </span>`;
  }

  /**
   * @param {'claude'|'codex'} runner
   * @param {string} label
   * @returns {TemplateResult}
   */
  function limitGroupTemplate(runner, label) {
    const form = runner_forms[runner];
    const provider = catalog ? catalog[runner] : null;
    const disabled = running !== null;
    const mode_observation = observeLimitField(runner, 'mode');
    const mode_hold = holdOf(`${runner}.mode`, mode_observation);
    // A settled `기다림` never switches, so the allow set and the threshold have
    // nothing to drive; a split or unread mode stays live because some
    // repositories may still switch.
    const switch_off = mode_hold === null && form.mode === 'wait';
    const switch_locked = disabled;
    const switch_dim = switch_off ? ' settings-dialog__row--off' : '';
    const accounts_observation = observeLimitAccounts(runner);
    const accounts_hold = holdOf(`${runner}.accounts`, accounts_observation);
    const preempt_observation = observeLimitField(runner, 'preempt');
    const preempt_hold = holdOf(`${runner}.preempt`, preempt_observation);
    const mode_hold_option = holdOptionOf(mode_observation);
    const preempt_hold_option = holdOptionOf(preempt_observation);
    /**
     * Toggle one allow-set member. Pressing any box means the SCREEN's set is
     * now the runner's set (ADR UI-a5l2), so a hold counts from empty.
     *
     * @param {string} account_key
     * @param {boolean} checked
     */
    const toggleAccount = (account_key, checked) => {
      edited.add(`${runner}.accounts`);
      // The list keeps the screen's ORDER (UI-9y1k §4.6, UI-iopp): a new pick
      // goes to the end, a dropped one leaves the rest where they were.
      const base = accounts_hold === null ? form.accounts : [];
      form.accounts = checked
        ? base.includes(account_key)
          ? [...base]
          : [...base, account_key]
        : base.filter((key) => key !== account_key);
      doRender();
    };
    /**
     * Move one picked account up or down; the apply sends this order.
     *
     * @param {string} account_key
     * @param {-1|1} delta
     */
    const moveAccount = (account_key, delta) => {
      const index = form.accounts.indexOf(account_key);
      const target = index + delta;
      if (index < 0 || target < 0 || target >= form.accounts.length) {
        return;
      }
      edited.add(`${runner}.accounts`);
      const next = form.accounts.slice();
      next[index] = form.accounts[target];
      next[target] = account_key;
      form.accounts = next;
      doRender();
    };
    /**
     * The allow list in switch order: picked accounts with ▲/▼ (a member the
     * catalog lacks keeps its place, marked `목록에 없음`), then the catalog
     * rows not picked. A held (`갈림`·`미확인`) row shows every box off
     * in catalog order, as before.
     *
     * @returns {TemplateResult}
     */
    const accountsTemplate = () => {
      const picked = accounts_hold === null ? form.accounts : [];
      const last = picked.length - 1;
      /** @type {Map<string, any>} */
      const by_key = new Map(
        (provider?.accounts || []).map((/** @type {any} */ entry) => [
          String(entry.key),
          entry
        ])
      );
      return html`${picked.map((key, index) => {
        const entry = by_key.get(key);
        const text = entry
          ? accountRowLabel(runner, entry)
          : `${key} (목록에 없음)`;
        return html`<span
          class="settings-dialog__limit-order"
          data-bulk-limit-order-item=${key}
        >
          <label class="settings-dialog__check">
            <input
              type="checkbox"
              data-bulk-limit-account=${key}
              data-runner=${runner}
              .checked=${live(true)}
              ?disabled=${switch_locked}
              @change=${(/** @type {Event} */ ev) =>
                toggleAccount(
                  key,
                  /** @type {HTMLInputElement} */ (ev.target).checked
                )}
            />
            ${`${index + 1}. ${text}`}
          </label>
          <button
            type="button"
            class="op-btn op-btn--ghost op-btn--icon"
            aria-label=${`${text} 위로`}
            title="위로"
            data-bulk-limit-move="up"
            data-bulk-limit-move-account=${key}
            ?disabled=${switch_locked || index === 0}
            @click=${() => moveAccount(key, -1)}
          >
            ▲
          </button>
          <button
            type="button"
            class="op-btn op-btn--ghost op-btn--icon"
            aria-label=${`${text} 아래로`}
            title="아래로"
            data-bulk-limit-move="down"
            data-bulk-limit-move-account=${key}
            ?disabled=${switch_locked || index === last}
            @click=${() => moveAccount(key, 1)}
          >
            ▼
          </button>
        </span>`;
      })}
      ${(provider?.accounts || [])
        .filter((/** @type {any} */ entry) => !picked.includes(entry.key))
        .map(
          (/** @type {any} */ entry) =>
            html`<label class="settings-dialog__check">
              <input
                type="checkbox"
                data-bulk-limit-account=${entry.key}
                data-runner=${runner}
                .checked=${live(false)}
                ?disabled=${switch_locked}
                @change=${(/** @type {Event} */ ev) =>
                  toggleAccount(
                    entry.key,
                    /** @type {HTMLInputElement} */ (ev.target).checked
                  )}
              />
              ${accountRowLabel(runner, entry)}
            </label>`
        )}`;
    };
    /** @type {Array<['wait'|'switch', string]>} */
    const modes = [
      ['switch', '켬'],
      ['wait', '끔']
    ];
    return html`<div class="settings-dialog__group" data-bulk-limit=${runner}>
      <div class="settings-dialog__group-title">${label} 이 저장소 Worker</div>
      <div class="settings-dialog__row">
        <span class="settings-dialog__row-label">자동 전환</span>
        <span class="settings-dialog__controls">
          <span
            class="settings-dialog__seg"
            role="group"
            aria-label=${`${label} 자동 전환`}
            data-bulk-limit-mode-runner=${runner}
          >
            ${mode_hold_option === null
              ? ''
              : html`<button
                  type="button"
                  class=${mode_hold !== null ? 'op-btn is-active' : 'op-btn'}
                  data-bulk-limit-mode=${HOLD}
                  aria-pressed=${String(mode_hold !== null)}
                  ?disabled=${disabled}
                  @click=${() => {
                    edited.delete(`${runner}.mode`);
                    doRender();
                  }}
                >
                  ${HOLD_LABEL[mode_hold_option]}
                </button>`}
            ${modes.map(
              ([mode, text]) =>
                html`<button
                  type="button"
                  class=${mode_hold === null && form.mode === mode
                    ? 'op-btn is-active'
                    : 'op-btn'}
                  data-bulk-limit-mode=${mode}
                  aria-pressed=${String(
                    mode_hold === null && form.mode === mode
                  )}
                  ?disabled=${disabled}
                  @click=${() => {
                    edited.add(`${runner}.mode`);
                    form.mode = mode;
                    doRender();
                  }}
                >
                  ${text}
                </button>`
            )}
          </span>
          ${badgeTemplate(`${runner}.mode`, mode_observation)}
        </span>
      </div>
      <div class="settings-dialog__row">
        ${accountSelectTemplate(
          runner === 'claude' ? 'claude_account' : 'codex_account',
          'default 계정',
          runner
        )}
      </div>
      <div class=${`settings-dialog__row${switch_dim}`}>
        <span class="settings-dialog__row-label">전환 허용 계정</span>
        <span class="settings-dialog__controls settings-dialog__bulk-accounts">
          ${accountsTemplate()}
          ${provider
            ? ''
            : html`<span class="settings-dialog__hint"
                >${CATALOG_MISSING}</span
              >`}
          ${edited.has(`${runner}.accounts`)
            ? html`<button
                type="button"
                class="op-btn"
                data-bulk-limit-accounts-release=${runner}
                ?disabled=${switch_locked}
                @click=${() => {
                  edited.delete(`${runner}.accounts`);
                  doRender();
                }}
              >
                ↩ 갈림으로 되돌리기
              </button>`
            : ''}
          ${badgeTemplate(`${runner}.accounts`, accounts_observation)}
        </span>
      </div>
      <div class=${`settings-dialog__row${switch_dim}`}>
        <span class="settings-dialog__row-label">옮기는 시점</span>
        <span class="settings-dialog__controls">
          <select
            class="ui-select ui-select--bare"
            aria-label=${`${label} 선제 전환`}
            data-bulk-preempt=${runner}
            ?disabled=${switch_locked}
            @change=${(/** @type {Event} */ ev) => {
              const next = String(
                /** @type {HTMLSelectElement} */ (ev.target).value
              );
              if (next === HOLD) {
                edited.delete(`${runner}.preempt`);
              } else {
                edited.add(`${runner}.preempt`);
                form.preempt = /** @type {'off'|'pct'} */ (next);
              }
              doRender();
            }}
          >
            ${preempt_hold_option === null
              ? ''
              : html`<option value=${HOLD} ?selected=${preempt_hold !== null}>
                  ${HOLD_LABEL[preempt_hold_option]}
                </option>`}
            <option
              value="off"
              ?selected=${preempt_hold === null && form.preempt === 'off'}
            >
              끔
            </option>
            <option
              value="pct"
              ?selected=${preempt_hold === null && form.preempt === 'pct'}
            >
              사용량 기준
            </option>
          </select>
          <input
            type="number"
            class="ui-input settings-dialog__text settings-dialog__bulk-pct"
            min="1"
            max="99"
            step="1"
            inputmode="numeric"
            aria-label=${`${label} 선제 전환 기준(%)`}
            data-bulk-preempt-pct=${runner}
            .value=${live(form.pct_text)}
            ?disabled=${switch_locked ||
            preempt_hold !== null ||
            form.preempt !== 'pct'}
            @input=${(/** @type {Event} */ ev) => {
              edited.add(`${runner}.preempt`);
              form.pct_text = /** @type {HTMLInputElement} */ (ev.target).value;
              doRender();
            }}
          />
          <span class="settings-dialog__hint">% 이상이면 미리 전환</span>
          ${badgeTemplate(`${runner}.preempt`, preempt_observation)}
        </span>
      </div>
    </div>`;
  }

  /**
   * The global Codex credit section (UI-9y1k §4.6). It is not an apply row: it
   * writes the one server-global setting at once, whatever repos are ticked,
   * so it neither counts in the footer nor waits for `적용`.
   *
   * @returns {TemplateResult|''}
   */
  function creditGroupTemplate() {
    const body = codex_credit_controls.template(
      catalog?.codex?.accounts || [],
      CREDIT_BULK_SCOPE
    );
    if (body === '') {
      return '';
    }
    return html`<div class="settings-dialog__group" data-bulk-codex-credits>
      <div class="settings-dialog__group-title">
        Codex 크레딧 · 모든 저장소에 적용(전역)
      </div>
      ${body}
    </div>`;
  }

  /** @returns {TemplateResult} */
  function accountTemplate() {
    const plan = accountPlan();
    return html`${limitGroupTemplate('claude', 'Claude')}
      ${limitGroupTemplate('codex', 'Codex')} ${creditGroupTemplate()}
      ${catalogReady()
        ? ''
        : html`<p class="settings-dialog__bulk-reason" data-bulk-reason>
            ${CATALOG_REASON}
          </p>`}
      <div class="settings-dialog__bulk-hd settings-dialog__bulk-foot">
        <span class="settings-dialog__bulk-count" data-bulk-count
          >${footerCount(ACCOUNT_FIELDS.length + RUNNERS.length * 3, {
            mixed: accountHoldCounts().mixed,
            pending: accountHoldCounts().pending
          })}</span
        >
        ${applyButtonTemplate('account', plan)}
      </div>
      ${resultsTemplate('account')}`;
  }

  /**
   * How many of the account tab's eight rows are still on a hold (§3.2).
   *
   * @returns {{ mixed: number, pending: number }}
   */
  function accountHoldCounts() {
    let mixed = 0;
    let pending = 0;
    /** @type {Array<[string, { state: string }]>} */
    const rows_of = [];
    for (const [key] of ACCOUNT_FIELDS) {
      rows_of.push([key, observeAccount(key)]);
    }
    for (const runner of RUNNERS) {
      rows_of.push([`${runner}.mode`, observeLimitField(runner, 'mode')]);
      rows_of.push([`${runner}.accounts`, observeLimitAccounts(runner)]);
      rows_of.push([`${runner}.preempt`, observeLimitField(runner, 'preempt')]);
    }
    for (const [id, observation] of rows_of) {
      const hold = holdOf(id, observation);
      if (hold === 'mixed') {
        mixed += 1;
      } else if (hold === 'pending') {
        pending += 1;
      }
    }
    return { mixed, pending };
  }

  /**
   * The execution sub tab selector and the selected form.
   *
   * @returns {TemplateResult}
   */
  function executionTemplate() {
    return html`${executionSubtabs(execution_subtab, (tab) => {
      execution_subtab = tab;
      options.onExecutionSubtabChange?.(tab);
      doRender();
    })}
    ${execution_subtab === 'worker'
      ? html`<section class="settings-dialog__block" data-bulk-block="worker">
          <div class="settings-dialog__block-title">워커</div>
          ${profileTemplate('worker')}
        </section> `
      : execution_subtab === 'quick_fix'
        ? html`<section
            class="settings-dialog__block"
            data-bulk-block="quick_fix"
          >
            <div class="settings-dialog__block-title">quick fix</div>
            ${profileTemplate('quick_fix')}
          </section>`
        : html`<section
            class="settings-dialog__block"
            data-bulk-block="session_review"
          >
            <p class="settings-dialog__hint">${SESSION_REVIEW_NOTICE}</p>
            ${session_review_form.template(running !== null)}
            <div class="settings-dialog__bulk-hd settings-dialog__bulk-foot">
              <span class="settings-dialog__bulk-count" data-bulk-count
                >${footerCount(6, session_review_form.holdCounts())}</span
              >
              ${applyButtonTemplate(
                'session_review',
                presetPlan('session_review')
              )}
            </div>
            ${resultsTemplate('session_review')}
          </section>`}`;
  }

  /** @returns {TemplateResult} */
  function sectionTemplate() {
    return section === 'account' ? accountTemplate() : executionTemplate();
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    reconcileRows();
    observeForms();
    render(
      html`<div class="settings-dialog__bulk" data-bulk-section=${section}>
        ${targetsTemplate()} ${sectionTemplate()}
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
     * @param {'execution'|'account'} [next]
     */
    render(next) {
      if ((next === 'execution' || next === 'account') && next !== section) {
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
      codex_credit_controls.destroy();
      if (unsubscribe_rows) {
        unsubscribe_rows();
        unsubscribe_rows = null;
      }
      render(html``, host);
    }
  };
}
