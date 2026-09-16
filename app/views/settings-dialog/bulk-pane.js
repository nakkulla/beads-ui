/**
 * 여러 저장소 설정 — the settings dialog's bulk mode body (UI-nu43 §3.2–§4.1).
 *
 * The header ⚙ opened from the monitor tab mounts this pane instead of the
 * execution pane. It never edits the connected workspace: every write names a
 * `root_dir` the user ticked in the shared `적용 대상` fieldset.
 *
 * - `워커` applies one execution preset to the selected repos
 *   (`bulk-preset-apply.js`).
 * - `계정` is a bulk edit form whose fields all start at `변경 안 함`; only the
 *   changed fields are written (`bulk-account-apply.js`).
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
  countEditFields,
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

/** Select value for `변경 안 함`. */
const KEEP = '';
/** Select value for `기본값 사용` (sent as `null`). */
const USE_DEFAULT = '__bulk_use_default__';
/** Default preemptive threshold the number box starts from. */
const DEFAULT_PREEMPT_PCT = '80';
/** Loading copy while the monitor rows have not arrived. */
const ROWS_LOADING = '저장소 목록을 불러오는 중입니다';

/** @type {ReadonlyArray<'claude'|'codex'>} */
const RUNNERS = ['claude', 'codex'];

/** @type {ReadonlyArray<[ 'claude_account'|'codex_account', string, 'claude'|'codex' ]>} */
const ACCOUNT_FIELDS = [
  ['claude_account', 'Claude', 'claude'],
  ['codex_account', 'Codex', 'codex']
];

/**
 * @typedef {Object} RunnerForm
 * @property {''|'wait'|'switch'} mode - Limit mode; `''` = 변경 안 함.
 * @property {boolean} accounts_on - Whether the `바꾸기` box is ticked.
 * @property {string[]} accounts - Allow keys chosen while `바꾸기` is on.
 * @property {''|'off'|'pct'} preempt - Threshold choice; `''` = 변경 안 함.
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

/** @returns {RunnerForm} */
function freshRunnerForm() {
  return {
    mode: '',
    accounts_on: false,
    accounts: [],
    preempt: '',
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
  const account_values = { claude_account: KEEP, codex_account: KEEP };
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
   * The form as a `BulkAccountEdit`: only fields that are not `변경 안 함`.
   *
   * @returns {import('../monitor/bulk-account-apply.js').BulkAccountEdit}
   */
  function accountEdit() {
    /** @type {import('../monitor/bulk-account-apply.js').BulkAccountEdit} */
    const edit = { values: {}, patches: {} };
    for (const [key] of ACCOUNT_FIELDS) {
      const value = account_values[key];
      if (value !== KEEP) {
        edit.values[key] = value === USE_DEFAULT ? null : value;
      }
    }
    for (const runner of RUNNERS) {
      const form = runner_forms[runner];
      /** @type {Partial<import('../monitor/bulk-account-apply.js').LimitPatch>} */
      const patch = {};
      if (form.mode !== '') {
        patch.mode = form.mode;
      }
      if (form.accounts_on) {
        patch.accounts = [...form.accounts];
      }
      if (form.preempt === 'off') {
        patch.preempt_pct = null;
      } else if (form.preempt === 'pct') {
        const text = form.pct_text.trim();
        patch.preempt_pct = /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : NaN;
      }
      if (Object.keys(patch).length > 0) {
        edit.patches[runner] = patch;
      }
    }
    return edit;
  }

  /** @returns {import('../monitor/bulk-preset-apply.js').BulkPlan} */
  function presetPlan() {
    return planBulkApply({
      rows: mergedRows(),
      selected_roots: selected,
      preset_state: presetState(),
      preset_id: preset_choice,
      running: running !== null
    });
  }

  /** @returns {import('../monitor/bulk-account-apply.js').BulkAccountPlan} */
  function accountPlan() {
    return planBulkAccountApply({
      rows: mergedRows(),
      selected_roots: selected,
      edit: accountEdit(),
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
        @change=${(/** @type {Event} */ ev) => {
          preset_choice = String(
            /** @type {HTMLSelectElement} */ (ev.target).value
          );
          doRender();
        }}
      >
        <option value="" ?selected=${preset_choice === ''}>실행 프리셋…</option>
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
        ?disabled=${running !== null}
        @change=${(/** @type {Event} */ ev) => {
          account_values[key] = String(
            /** @type {HTMLSelectElement} */ (ev.target).value
          );
          doRender();
        }}
      >
        <option value=${KEEP} ?selected=${value === KEEP}>변경 안 함</option>
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
    /** @type {Array<[''|'wait'|'switch', string]>} */
    const modes = [
      ['', '변경 안 함'],
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
          <label class="settings-dialog__check">
            <input
              type="checkbox"
              data-bulk-limit-accounts-toggle=${runner}
              .checked=${live(form.accounts_on)}
              ?disabled=${disabled}
              @change=${(/** @type {Event} */ ev) => {
                form.accounts_on = /** @type {HTMLInputElement} */ (
                  ev.target
                ).checked;
                form.accounts = [];
                doRender();
              }}
            />
            바꾸기
          </label>
          ${(provider?.accounts || []).map(
            (/** @type {any} */ row) =>
              html`<label class="settings-dialog__check">
                <input
                  type="checkbox"
                  data-bulk-limit-account=${row.key}
                  data-runner=${runner}
                  .checked=${live(
                    form.accounts_on && form.accounts.includes(row.key)
                  )}
                  ?disabled=${disabled || !form.accounts_on}
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
                >계정 목록을 불러올 수 없습니다</span
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
              form.preempt = /** @type {''|'off'|'pct'} */ (
                String(/** @type {HTMLSelectElement} */ (ev.target).value)
              );
              doRender();
            }}
          >
            <option value="" ?selected=${form.preempt === ''}>
              변경 안 함
            </option>
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
    const count = countEditFields(accountEdit());
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
      <div class="settings-dialog__bulk-hd settings-dialog__bulk-foot">
        <span class="settings-dialog__bulk-count" data-bulk-count
          >바꿀 항목 ${count}개</span
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
