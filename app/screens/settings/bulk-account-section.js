/**
 * The bulk pane's `계정` tab: the two execution-account selects, each runner's
 * limit-response group, the catalog reason and the footer (UI-628r §3.3).
 * Split out of `bulk-pane.js` (UI-dbn6); the pane keeps the form values and
 * the edit set, and hands them in by reference with its observations.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {import('./bulk-sections.js').BulkSectionsContext} BulkSectionsContext
 * @typedef {import('./bulk-sections.js').BulkSection} BulkSection
 * @typedef {import('../../model/bulk-observation.js').Observation} Observation
 * @typedef {Object} BulkAccountParts
 * @property {(id: string, observation: any, labelOf?: (value: string|null) => string) => TemplateResult|''} badgeTemplate
 * @property {(total: number, holds: { mixed: number, pending: number }) => string} footerCount
 * @property {(run_section: BulkSection, plan: { targets: unknown[], disabled_reason: string|null }) => TemplateResult} applyButtonTemplate
 */
import { html } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import { CATALOG_REASON } from '../../model/bulk-account-apply.js';
import { accountDefaultLabel, accountRowLabel } from './account-catalog.js';
import {
  ACCOUNT_FIELDS,
  CATALOG_MISSING,
  HOLD,
  HOLD_LABEL,
  RUNNERS,
  USE_DEFAULT
} from './bulk-shared.js';

/**
 * Build the `계정` tab over the pane's account form.
 *
 * @param {BulkSectionsContext} ctx
 * @param {BulkAccountParts} parts - The shared badge, footer and apply button.
 */
export function createBulkAccountSection(ctx, parts) {
  const {
    edited,
    account_values,
    runner_forms,
    observeAccount,
    observeLimitField,
    observeLimitAccounts,
    holdOf,
    holdOptionOf,
    doRender
  } = ctx;
  const { badgeTemplate, footerCount, applyButtonTemplate } = parts;

  /**
   * @param {'claude_account'|'codex_account'} key
   * @param {string} label
   * @param {'claude'|'codex'} provider_key
   * @returns {TemplateResult}
   */
  function accountSelectTemplate(key, label, provider_key) {
    const catalog = ctx.catalog();
    const provider = catalog ? catalog[provider_key] : null;
    const observation = observeAccount(key);
    const hold = holdOf(key, observation);
    const hold_option = holdOptionOf(observation);
    const value = hold === null ? account_values[key] : HOLD;
    // A stored account the catalog does not carry keeps its own option, so the
    // select never looks like `기본값 사용` while the apply still writes the
    // hidden value (execution-accounts `accountRow` does the same).
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
    return html`<span class="settings-dialog__bulk-field">
      <span class="settings-dialog__row-label">${label}</span>
      <select
        class="ui-select"
        aria-label=${`${label} 실행 계정`}
        data-bulk-account=${key}
        ?disabled=${ctx.running() !== null || !provider}
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
          ${accountDefaultLabel(provider_key, provider)}
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
    const catalog = ctx.catalog();
    const provider = catalog ? catalog[runner] : null;
    const disabled = ctx.running() !== null;
    const mode_observation = observeLimitField(runner, 'mode');
    const mode_hold = holdOf(`${runner}.mode`, mode_observation);
    const accounts_observation = observeLimitAccounts(runner);
    const accounts_hold = holdOf(`${runner}.accounts`, accounts_observation);
    const preempt_observation = observeLimitField(runner, 'preempt');
    const preempt_hold = holdOf(`${runner}.preempt`, preempt_observation);
    const mode_hold_option = holdOptionOf(mode_observation);
    const preempt_hold_option = holdOptionOf(preempt_observation);
    const catalog_keys = (provider?.accounts || []).map(
      (/** @type {any} */ entry) => String(entry.key)
    );
    // Members the catalog does not carry still belong to the allow set, so they
    // get their own checkbox and keep their place in the written order — the
    // screen and the request say the same thing (execution-accounts
    // `limitPolicyBlock`).
    const orphans =
      accounts_hold === null
        ? form.accounts.filter((key) => !catalog_keys.includes(key))
        : [];
    const account_order = [...catalog_keys, ...orphans];
    /**
     * Toggle one allow-set member. Pressing any box means the SCREEN's set is
     * now the runner's set (ADR UI-a5l2), so a hold counts from empty.
     *
     * @param {string} account_key
     * @param {boolean} checked
     */
    const toggleAccount = (account_key, checked) => {
      edited.add(`${runner}.accounts`);
      const keys = new Set(accounts_hold === null ? form.accounts : []);
      if (checked) {
        keys.add(account_key);
      } else {
        keys.delete(account_key);
      }
      form.accounts = [...new Set([...account_order, account_key])].filter(
        (key) => keys.has(key)
      );
      doRender();
    };
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
            class="settings-dialog__seg ui-seg"
            role="group"
            aria-label=${`${label} 대응 방식`}
            data-bulk-limit-mode-runner=${runner}
          >
            ${mode_hold_option === null
              ? ''
              : html`<button
                  type="button"
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
        <span class="settings-dialog__row-label">전환 허용 계정</span>
        <span class="settings-dialog__controls settings-dialog__bulk-accounts">
          ${(provider?.accounts || []).map(
            (/** @type {any} */ row) =>
              html`<label class="settings-dialog__check">
                <input
                  type="checkbox"
                  data-bulk-limit-account=${row.key}
                  data-runner=${runner}
                  .checked=${live(
                    accounts_hold === null && form.accounts.includes(row.key)
                  )}
                  ?disabled=${disabled}
                  @change=${(/** @type {Event} */ ev) =>
                    toggleAccount(
                      row.key,
                      /** @type {HTMLInputElement} */ (ev.target).checked
                    )}
                />
                ${accountRowLabel(runner, row)}
              </label>`
          )}
          ${orphans.map(
            (key) =>
              html`<label class="settings-dialog__check">
                <input
                  type="checkbox"
                  data-bulk-limit-account=${key}
                  data-runner=${runner}
                  .checked=${live(true)}
                  ?disabled=${disabled}
                  @change=${(/** @type {Event} */ ev) =>
                    toggleAccount(
                      key,
                      /** @type {HTMLInputElement} */ (ev.target).checked
                    )}
                />
                ${`${key} (목록에 없음)`}
              </label>`
          )}
          ${provider
            ? ''
            : html`<span class="settings-dialog__hint"
                >${CATALOG_MISSING}</span
              >`}
          ${edited.has(`${runner}.accounts`)
            ? html`<button
                type="button"
                class="ui-btn ui-btn--ghost ui-btn--sm"
                data-bulk-limit-accounts-release=${runner}
                ?disabled=${disabled}
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
      <div class="settings-dialog__row">
        <span class="settings-dialog__row-label">선제 전환</span>
        <span class="settings-dialog__controls">
          <select
            class="ui-select"
            aria-label=${`${label} 선제 전환`}
            data-bulk-preempt=${runner}
            ?disabled=${disabled}
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
            class="ui-input ui-input--num settings-dialog__text settings-dialog__bulk-pct"
            min="1"
            max="99"
            step="1"
            inputmode="numeric"
            aria-label=${`${label} 선제 전환 기준(%)`}
            data-bulk-preempt-pct=${runner}
            .value=${live(form.pct_text)}
            ?disabled=${disabled ||
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

  /** @returns {TemplateResult} */
  function accountTemplate() {
    const plan = ctx.accountPlan();
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
      ${ctx.catalogReady()
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
      </div>`;
  }

  return { accountTemplate };
}
