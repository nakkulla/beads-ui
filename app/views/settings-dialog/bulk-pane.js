/**
 * 여러 저장소 설정 — the settings dialog's bulk mode body
 * (UI-nu43 §3.2–§4.1, 편집면은 UI-628r §3–§4.4).
 *
 * The header ⚙ opened from the monitor tab mounts this pane instead of the
 * execution pane. It never edits the connected workspace: every write names a
 * `root_dir` the user ticked in the shared `적용 대상` fieldset.
 *
 * Neither tab shows what a repo currently holds. Both are edit surfaces for ONE
 * set of values that `[적용]` writes to every ticked repo, so there is no
 * `변경 안 함` anywhere and the banner says as much (UI-628r §2.3–§2.4).
 *
 * - `워커` is the 24-key execution profile form (`bulk-worker-form.js`); a
 *   preset fills it and the apply takes one of two paths
 *   (`bulk-preset-apply.js`).
 * - `계정` is the execution accounts and limit policy form, applied whole
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
import { mergeQueue, pruneAdopted } from '../monitor/adopted-queue.js';
import {
  CATALOG_REASON,
  planBulkAccountApply,
  runBulkAccountApply
} from '../monitor/bulk-account-apply.js';
import {
  defaultSelectedRoots,
  formatBulkResult,
  planBulkApply,
  retryRootsOf,
  runBulkApply
} from '../monitor/bulk-preset-apply.js';
import {
  accountDefaultLabel,
  accountRowLabel,
  loadAccountCatalog
} from './account-catalog.js';
import { BULK_FORM_KEYS, createBulkWorkerForm } from './bulk-worker-form.js';

/** Select value for `기본값 사용` (sent as `null`). */
const USE_DEFAULT = '__bulk_use_default__';
/** Default preemptive threshold the number box starts from. */
const DEFAULT_PREEMPT_PCT = '80';
/** Loading copy while the monitor rows have not arrived. */
const ROWS_LOADING = '저장소 목록을 불러오는 중입니다';
/** The one-line warning both tabs carry under `적용 대상` (§3.1). */
const APPLY_BANNER =
  '화면에 보이는 값이 그대로 쓰입니다 — 손대지 않은 행도 함께 적용됩니다.';
/** Hint next to the preset select (§3.2). */
const PRESET_HINT = `고르면 아래 ${BULK_FORM_KEYS.length}행이 그 프리셋 값으로 채워집니다`;
/** Copy for a runner whose account list could not be read. */
const CATALOG_MISSING = '계정 목록을 불러올 수 없습니다';

/** @type {ReadonlyArray<'claude'|'codex'>} */
const RUNNERS = ['claude', 'codex'];

/** @type {ReadonlyArray<[ 'claude_account'|'codex_account', string, 'claude'|'codex' ]>} */
const ACCOUNT_FIELDS = [
  ['claude_account', 'Claude', 'claude'],
  ['codex_account', 'Codex', 'codex']
];

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
 * @property {() => Array<Record<string, any>>} rows - The monitor pipeline
 * store's `workspaces_state`.
 * @property {(fn: () => void) => () => void} [subscribeRows]
 * @property {{ get: () => any }} [implPresetStore]
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
  /** @type {'worker'|'account'} */
  let section = 'worker';
  let destroyed = false;

  /** Mutation response queues per repo (newer than the aggregate rows). */
  /** @type {Map<string, any>} */
  const adopted = new Map();

  /** @type {Set<string>} */
  const selected = new Set();
  /** The default selection is taken once, from the first non-empty rows. */
  let selection_seeded = false;

  let preset_choice = '';

  /** @type {{ worker: BulkResult[]|null, account: BulkResult[]|null }} */
  let results = { worker: null, account: null };
  /** @type {{ section: 'worker'|'account', done: number, total: number }|null} */
  let running = null;
  let run_token = 0;

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
   * The 24-key form. Its catalog comes from the first SELECTED repo; with
   * nothing ticked the visible rows still name one server's catalog, so the
   * form keeps drawing instead of blanking (UI-628r §4.1).
   */
  const worker_form = createBulkWorkerForm({
    rows: () => {
      const chosen = selectedRows();
      return chosen.length > 0 ? chosen : mergedRows();
    },
    onChange: () => doRender()
  });

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

  /** @returns {Record<string, any>|null} */
  function chosenPreset() {
    const state = presetState();
    if (!state || preset_choice === '') {
      return null;
    }
    return (
      state.presets.find((preset) => preset && preset.id === preset_choice) ||
      null
    );
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
   * The form as a `BulkAccountEdit`. Every field is carried: this tab has no
   * `변경 안 함`, so the screen's values are what gets written (§2.4).
   *
   * @returns {import('../monitor/bulk-account-apply.js').BulkAccountEdit}
   */
  function accountEdit() {
    /** @type {import('../monitor/bulk-account-apply.js').BulkAccountEdit} */
    const edit = { values: {}, patches: {} };
    for (const [key] of ACCOUNT_FIELDS) {
      const value = account_values[key];
      edit.values[key] = value === USE_DEFAULT ? null : value;
    }
    for (const runner of RUNNERS) {
      const form = runner_forms[runner];
      const text = form.pct_text.trim();
      edit.patches[runner] = {
        mode: form.mode,
        accounts: [...form.accounts],
        preempt_pct:
          form.preempt === 'off'
            ? null
            : /^-?\d+(\.\d+)?$/.test(text)
              ? Number(text)
              : NaN
      };
    }
    return edit;
  }

  /** @returns {import('../monitor/bulk-preset-apply.js').BulkPlan} */
  function presetPlan() {
    const preset = chosenPreset();
    return planBulkApply({
      rows: mergedRows(),
      selected_roots: selected,
      preset_state: presetState(),
      preset_id: preset_choice,
      form: {
        kv_values: worker_form.kvValues(),
        queue_values: worker_form.queueValues(),
        equals_preset:
          preset !== null && worker_form.equalsPreset(preset.settings)
      },
      running: running !== null
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
   * Run the active tab's plan.
   *
   * @param {'worker'|'account'} run_section
   */
  async function startRun(run_section) {
    const plan = run_section === 'worker' ? presetPlan() : accountPlan();
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
    const outcome =
      run_section === 'worker'
        ? await runBulkApply(input)
        : await runBulkAccountApply(input);
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

  /** @returns {TemplateResult} */
  function targetsTemplate() {
    const list = rows();
    if (list.length === 0) {
      return html`<p class="settings-dialog__bulk-loading" data-bulk-loading>
        ${ROWS_LOADING}
      </p>`;
    }
    return html`<fieldset class="settings-dialog__bulk-targets">
      <legend>적용 대상</legend>
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
   * @param {'worker'|'account'} run_section
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
      ${running
        ? `적용 중 ${running.done}/${running.total}`
        : `선택 ${plan.targets.length}곳에 적용`}
    </button>`;
  }

  /** @returns {TemplateResult|''} */
  function resultsTemplate() {
    const list = results[section];
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
            data-bulk-retry=${section}
            ?disabled=${running !== null}
            @click=${onRetry}
          >
            실패·부분 적용 저장소만 다시 적용
          </button>`
        : ''}
    </div>`;
  }

  /**
   * The preset select fills the form and nothing else: the apply path is
   * decided later by comparing the form against it (§2.2).
   *
   * @param {string} id
   */
  function onPresetChoice(id) {
    preset_choice = id;
    const preset = chosenPreset();
    if (preset) {
      worker_form.applyPreset(preset.settings);
      return;
    }
    doRender();
  }

  /** @returns {TemplateResult} */
  function workerTemplate() {
    const state = presetState();
    const plan = presetPlan();
    return html`<div class="settings-dialog__bulk-hd">
        <select
          class="settings-dialog__bulk-preset"
          aria-label="적용할 실행 프리셋"
          data-bulk-preset
          ?disabled=${running !== null}
          @change=${(/** @type {Event} */ ev) =>
            onPresetChoice(
              String(/** @type {HTMLSelectElement} */ (ev.target).value)
            )}
        >
          <option value="" ?selected=${preset_choice === ''}>
            실행 프리셋…
          </option>
          ${(state?.presets || []).map(
            (preset) =>
              html`<option
                value=${preset.id}
                ?selected=${preset.id === preset_choice}
                ?disabled=${preset.compatible === false}
                title=${preset.compatible === false
                  ? preset.incompatibility_reason || ''
                  : ''}
              >
                ${preset.name}
              </option>`
          )}
        </select>
        <span class="settings-dialog__hint" data-bulk-preset-hint
          >${PRESET_HINT}</span
        >
      </div>
      ${worker_form.template(running !== null)}
      <div class="settings-dialog__bulk-hd settings-dialog__bulk-foot">
        <span class="settings-dialog__bulk-count" data-bulk-count
          >저장소 ${selectedRows().length}곳에 ${BULK_FORM_KEYS.length}개
          항목</span
        >
        ${applyButtonTemplate('worker', plan)}
      </div>`;
  }

  /**
   * @param {'claude_account'|'codex_account'} key
   * @param {string} label
   * @param {'claude'|'codex'} provider_key
   * @returns {TemplateResult}
   */
  function accountSelectTemplate(key, label, provider_key) {
    const provider = catalog ? catalog[provider_key] : null;
    const value = account_values[key];
    return html`<span class="settings-dialog__bulk-field">
      <span class="settings-dialog__row-label">${label}</span>
      <select
        aria-label=${`${label} 실행 계정`}
        data-bulk-account=${key}
        ?disabled=${running !== null || !provider}
        @change=${(/** @type {Event} */ ev) => {
          account_values[key] = String(
            /** @type {HTMLSelectElement} */ (ev.target).value
          );
          doRender();
        }}
      >
        <option value=${USE_DEFAULT} ?selected=${value === USE_DEFAULT}>
          ${accountDefaultLabel(provider_key, provider)}
        </option>
        ${(provider?.accounts || []).map(
          (/** @type {any} */ row) =>
            html`<option value=${row.key} ?selected=${row.key === value}>
              ${accountRowLabel(provider_key, row)}
            </option>`
        )}
      </select>
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
    /** @type {Array<['wait'|'switch', string]>} */
    const modes = [
      ['wait', '기다림'],
      ['switch', '자동 전환']
    ];
    return html`<div class="settings-dialog__group" data-bulk-limit=${runner}>
      <div class="settings-dialog__group-title">${label} 한도 대응</div>
      <div class="settings-dialog__row">
        <span class="settings-dialog__row-label">대응 방식</span>
        <span class="settings-dialog__controls">
          <span
            class="settings-dialog__seg"
            role="group"
            aria-label=${`${label} 대응 방식`}
            data-bulk-limit-mode-runner=${runner}
          >
            ${modes.map(
              ([mode, text]) =>
                html`<button
                  type="button"
                  data-bulk-limit-mode=${mode}
                  aria-pressed=${String(form.mode === mode)}
                  ?disabled=${disabled}
                  @click=${() => {
                    form.mode = mode;
                    doRender();
                  }}
                >
                  ${text}
                </button>`
            )}
          </span>
        </span>
      </div>
      <div class="settings-dialog__row">
        <span class="settings-dialog__row-label">전환 허용 계정</span>
        <span class="settings-dialog__controls settings-dialog__bulk-accounts">
          ${(provider?.accounts || []).map(
            (/** @type {any} */ row) =>
              html`<label class="settings-dialog__check">
                <input
                  type="checkbox"
                  data-bulk-limit-account=${row.key}
                  data-runner=${runner}
                  .checked=${live(form.accounts.includes(row.key))}
                  ?disabled=${disabled}
                  @change=${(/** @type {Event} */ ev) => {
                    const checked = /** @type {HTMLInputElement} */ (ev.target)
                      .checked;
                    const keys = new Set(form.accounts);
                    if (checked) {
                      keys.add(row.key);
                    } else {
                      keys.delete(row.key);
                    }
                    form.accounts = (provider?.accounts || [])
                      .map((/** @type {any} */ entry) => entry.key)
                      .filter((/** @type {string} */ key) => keys.has(key));
                    doRender();
                  }}
                />
                ${accountRowLabel(runner, row)}
              </label>`
          )}
          ${provider
            ? ''
            : html`<span class="settings-dialog__hint"
                >${CATALOG_MISSING}</span
              >`}
        </span>
      </div>
      <div class="settings-dialog__row">
        <span class="settings-dialog__row-label">선제 전환</span>
        <span class="settings-dialog__controls">
          <select
            aria-label=${`${label} 선제 전환`}
            data-bulk-preempt=${runner}
            ?disabled=${disabled}
            @change=${(/** @type {Event} */ ev) => {
              form.preempt = /** @type {'off'|'pct'} */ (
                String(/** @type {HTMLSelectElement} */ (ev.target).value)
              );
              doRender();
            }}
          >
            <option value="off" ?selected=${form.preempt === 'off'}>끔</option>
            <option value="pct" ?selected=${form.preempt === 'pct'}>
              사용량 기준
            </option>
          </select>
          <input
            type="number"
            class="settings-dialog__text settings-dialog__bulk-pct"
            min="1"
            max="99"
            step="1"
            inputmode="numeric"
            aria-label=${`${label} 선제 전환 기준(%)`}
            data-bulk-preempt-pct=${runner}
            .value=${live(form.pct_text)}
            ?disabled=${disabled || form.preempt !== 'pct'}
            @input=${(/** @type {Event} */ ev) => {
              form.pct_text = /** @type {HTMLInputElement} */ (ev.target).value;
              doRender();
            }}
          />
          <span class="settings-dialog__hint">% 이상이면 미리 전환</span>
        </span>
      </div>
    </div>`;
  }

  /** @returns {TemplateResult} */
  function accountTemplate() {
    const plan = accountPlan();
    return html`<div class="settings-dialog__group">
        <div class="settings-dialog__group-title">실행 계정</div>
        <div class="settings-dialog__controls settings-dialog__bulk-row">
          ${ACCOUNT_FIELDS.map(([key, label, provider_key]) =>
            accountSelectTemplate(key, label, provider_key)
          )}
        </div>
      </div>
      ${limitGroupTemplate('claude', 'Claude')}
      ${limitGroupTemplate('codex', 'Codex')}
      ${catalogReady()
        ? ''
        : html`<p class="settings-dialog__bulk-reason" data-bulk-reason>
            ${CATALOG_REASON}
          </p>`}
      <div class="settings-dialog__bulk-hd settings-dialog__bulk-foot">
        <span class="settings-dialog__bulk-count" data-bulk-count
          >저장소 ${selectedRows().length}곳에 계정 ${ACCOUNT_FIELDS.length}개 ·
          한도 정책 ${RUNNERS.length}벌</span
        >
        ${applyButtonTemplate('account', plan)}
      </div>`;
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    reconcileRows();
    render(
      html`<div class="settings-dialog__bulk" data-bulk-section=${section}>
        ${targetsTemplate()}
        <p class="settings-dialog__banner" data-bulk-banner>${APPLY_BANNER}</p>
        ${section === 'worker' ? workerTemplate() : accountTemplate()}
        ${resultsTemplate()}
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
     * Draw one tab. Switching to the other tab stops a run in flight; called
     * with nothing it redraws the tab on screen.
     *
     * @param {'worker'|'account'} [next]
     */
    render(next) {
      if ((next === 'worker' || next === 'account') && next !== section) {
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
