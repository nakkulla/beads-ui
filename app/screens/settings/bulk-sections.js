/**
 * The bulk pane's templates: the shared `적용 대상` fieldset, the per-tab
 * result lines, the two profile tabs and the `세션` tab; the `계정` tab comes
 * from `bulk-account-section.js`. Split out of `bulk-pane.js` (UI-dbn6): the
 * pane keeps every value and run, and hands getters and its handlers in.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('../../model/bulk-preset-apply.js').BulkResult} BulkResult
 * @typedef {import('../../model/bulk-observation.js').Observation} Observation
 * @typedef {'worker'|'quick_fix'|'session'|'account'} BulkSection
 * @typedef {ReturnType<typeof import('./bulk-worker-form.js').createBulkWorkerForm>} BulkWorkerForm
 * @typedef {Object} BulkSectionsContext
 * @property {() => Array<Record<string, any>>} rows - The visible monitor rows.
 * @property {() => Array<Record<string, any>>} selectedRows
 * @property {Set<string>} selected - The ticked `root_dir`s.
 * @property {Set<string>} edited - The account and session fields touched.
 * @property {Record<string, string>} session_values - The 세션 tab's rows.
 * @property {Record<'claude_account'|'codex_account', string>} account_values
 * @property {Record<'claude'|'codex', import('./bulk-shared.js').RunnerForm>} runner_forms
 * @property {() => BulkSection} section - The tab on screen.
 * @property {() => { section: BulkSection, done: number, total: number }|null} running
 * @property {() => Record<BulkSection, BulkResult[]|null>} results
 * @property {() => import('./account-catalog.js').AccountCatalog|null} catalog
 * @property {(tab: 'worker'|'quick_fix') => BulkWorkerForm} formOf
 * @property {(tab: 'worker'|'quick_fix') => { targets: unknown[], disabled_reason: string|null }} presetPlan
 * @property {() => { targets: unknown[], disabled_reason: string|null }} sessionPlan
 * @property {() => { targets: unknown[], disabled_reason: string|null }} accountPlan
 * @property {() => boolean} catalogReady
 * @property {(key: string) => Observation} observeSession
 * @property {(key: 'claude_account'|'codex_account') => Observation} observeAccount
 * @property {(runner: 'claude'|'codex', field: 'mode'|'preempt') => Observation} observeLimitField
 * @property {(runner: 'claude'|'codex') => ReturnType<typeof import('../../model/bulk-observation.js').observeSet>} observeLimitAccounts
 * @property {(id: string, observation: { state: string }) => 'mixed'|'pending'|null} holdOf
 * @property {(observation: { state: string }) => 'mixed'|'pending'|null} holdOptionOf
 * @property {(checked: boolean) => void} onAllToggle
 * @property {(root_dir: string, checked: boolean) => void} onRepoToggle
 * @property {() => void} onRetry
 * @property {(run_section: BulkSection) => Promise<void>} startRun
 * @property {() => void} doRender
 * @property {(tab: 'worker'|'quick_fix') => TemplateResult} presetBarTemplate
 * @property {(tab: 'worker'|'quick_fix') => TemplateResult|''} appliedPresetTemplate
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { observationBadge } from '../../model/bulk-observation.js';
import {
  formatBulkResult,
  retryRootsOf
} from '../../model/bulk-preset-apply.js';
import { createBulkAccountSection } from './bulk-account-section.js';
import {
  HOLD,
  HOLD_LABEL,
  ROWS_LOADING,
  SECTION_PROFILE,
  SESSION_ROWS
} from './bulk-shared.js';
import { bulkFormKeysFor } from './bulk-worker-form.js';

/**
 * Build the bulk pane's templates over its state.
 *
 * @param {BulkSectionsContext} ctx
 */
export function createBulkSections(ctx) {
  const { selected, edited, session_values, holdOf, holdOptionOf, doRender } =
    ctx;

  /** @returns {TemplateResult} */
  function targetsTemplate() {
    const list = ctx.rows();
    const running = ctx.running();
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
            ctx.onAllToggle(
              /** @type {HTMLInputElement} */ (ev.target).checked
            )}
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
                ctx.onRepoToggle(
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
   * @param {Observation|{ state: string, value: any, per_repo: any[], pending_count?: number }} observation
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
   * @param {BulkSection} run_section
   * @param {{ targets: unknown[], disabled_reason: string|null }} plan
   * @returns {TemplateResult}
   */
  function applyButtonTemplate(run_section, plan) {
    const running = ctx.running();
    const loading = ctx.rows().length === 0;
    const reason = loading ? ROWS_LOADING : plan.disabled_reason;
    return html`<button
      type="button"
      class="ui-btn ui-btn--primary ui-btn--sm settings-dialog__bulk-apply"
      data-bulk-apply=${run_section}
      title=${reason || ''}
      ?disabled=${reason !== null}
      @click=${() => void ctx.startRun(run_section)}
    >
      ${running
        ? `적용 중 ${running.done}/${running.total}`
        : `선택 ${plan.targets.length}곳에 적용`}
    </button>`;
  }

  /** @returns {TemplateResult|''} */
  function resultsTemplate() {
    const section = ctx.section();
    const list = ctx.results()[section];
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
            class="ui-btn ui-btn--ghost ui-btn--sm settings-dialog__bulk-retry"
            data-bulk-retry=${section}
            ?disabled=${ctx.running() !== null}
            @click=${ctx.onRetry}
          >
            실패·부분 적용 저장소만 다시 적용
          </button>`
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
    const repos = ctx.selectedRows().length;
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
    const form = ctx.formOf(tab);
    const plan = ctx.presetPlan(tab);
    const holds = form.holdCounts();
    return html`${ctx.presetBarTemplate(tab)} ${ctx.appliedPresetTemplate(tab)}
      ${form.template(ctx.running() !== null)}
      <div class="settings-dialog__bulk-hd settings-dialog__bulk-foot">
        <span class="settings-dialog__bulk-count" data-bulk-count
          >${footerCount(
            bulkFormKeysFor(SECTION_PROFILE[tab]).length,
            holds
          )}</span
        >
        ${applyButtonTemplate(tab, plan)}
      </div>`;
  }

  /**
   * One 세션 row (§5). The control shape follows the row's own kind, and the
   * hold option sits on top of the choices exactly as the worker form's does.
   *
   * @param {{ key: string, label: string, kind: 'select'|'text', choices: string[], choice_labels?: Record<string, string> }} row
   * @returns {TemplateResult}
   */
  function sessionRowTemplate(row) {
    const observation = ctx.observeSession(row.key);
    const hold = holdOf(row.key, observation);
    const hold_option = holdOptionOf(observation);
    const value = session_values[row.key] ?? '';
    const disabled = ctx.running() !== null;
    /** @param {string} next */
    const onPick = (next) => {
      if (next === HOLD) {
        edited.delete(row.key);
      } else {
        edited.add(row.key);
        if (next.length > 0) {
          session_values[row.key] = next;
        } else {
          delete session_values[row.key];
        }
      }
      doRender();
    };
    const control =
      row.kind === 'text'
        ? html`<input
            type="text"
            class="ui-input settings-dialog__text"
            aria-label=${row.label}
            data-bulk-session=${row.key}
            placeholder=${hold === null
              ? 'http://호스트:3000'
              : HOLD_LABEL[hold]}
            .value=${live(hold === null ? value : '')}
            ?disabled=${disabled}
            @input=${(/** @type {Event} */ ev) =>
              onPick(String(/** @type {HTMLInputElement} */ (ev.target).value))}
          />`
        : html`<select
            class="ui-select"
            aria-label=${row.label}
            data-bulk-session=${row.key}
            ?disabled=${disabled}
            @change=${(/** @type {Event} */ ev) =>
              onPick(
                String(/** @type {HTMLSelectElement} */ (ev.target).value)
              )}
          >
            ${hold_option === null
              ? ''
              : html`<option value=${HOLD} ?selected=${hold !== null}>
                  ${HOLD_LABEL[hold_option]}
                </option>`}
            <option value="" ?selected=${hold === null && value === ''}>
              ${row.choice_labels?.[''] ?? '기본값 사용'}
            </option>
            ${row.choices.map(
              (choice) =>
                html`<option
                  value=${choice}
                  ?selected=${hold === null && value === choice}
                >
                  ${row.choice_labels?.[choice] ?? choice}
                </option>`
            )}
          </select>`;
    return html`<div class="settings-dialog__row">
      <span class="settings-dialog__row-label">${row.label}</span>
      <span class="settings-dialog__controls">
        ${control}
        ${hold_option !== null && row.kind === 'text'
          ? html`<button
              type="button"
              class="ui-btn ui-btn--ghost ui-btn--sm"
              data-bulk-session-release=${row.key}
              ?disabled=${disabled}
              @click=${() => onPick(HOLD)}
            >
              ↩ 관측으로 되돌리기
            </button>`
          : ''}
        ${badgeTemplate(row.key, observation)}
      </span>
    </div>`;
  }

  /** @returns {TemplateResult} */
  function sessionTemplate() {
    const plan = ctx.sessionPlan();
    let mixed = 0;
    let pending = 0;
    for (const row of SESSION_ROWS) {
      const hold = holdOf(row.key, ctx.observeSession(row.key));
      if (hold === 'mixed') {
        mixed += 1;
      } else if (hold === 'pending') {
        pending += 1;
      }
    }
    return html`<div class="settings-dialog__group" data-bulk-group="session">
        <div class="settings-dialog__group-title">대화형 세션</div>
        ${SESSION_ROWS.map((row) => sessionRowTemplate(row))}
      </div>
      <div class="settings-dialog__bulk-hd settings-dialog__bulk-foot">
        <span class="settings-dialog__bulk-count" data-bulk-count
          >${footerCount(SESSION_ROWS.length, { mixed, pending })}</span
        >
        ${applyButtonTemplate('session', plan)}
      </div>`;
  }

  const { accountTemplate } = createBulkAccountSection(ctx, {
    badgeTemplate,
    footerCount,
    applyButtonTemplate
  });

  /** @returns {TemplateResult} */
  function sectionTemplate() {
    const section = ctx.section();
    if (section === 'worker' || section === 'quick_fix') {
      return profileTemplate(section);
    }
    return section === 'session' ? sessionTemplate() : accountTemplate();
  }

  return { targetsTemplate, resultsTemplate, sectionTemplate };
}
