import { html } from 'lit-html';

/**
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {{ key: string, email: string, alias?: string|null, plan?: string|null, active?: boolean, status?: string }} ExecAccount
 * @typedef {{ accounts: ExecAccount[], active: ExecAccount|null }} ExecAccountProviderCatalog
 * @typedef {{ claude: ExecAccountProviderCatalog|null, codex: ExecAccountProviderCatalog|null }} ExecAccountCatalog
 * @typedef {{ onExecChange: (key: string, value: string) => void }} ExecAccountHandlers
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Keep only account rows that can be selected. The server owns the full row
 * contract; this boundary only needs the stable key and visible email.
 *
 * @param {unknown} value
 * @returns {value is ExecAccount}
 */
function isAccount(value) {
  return (
    isRecord(value) &&
    typeof value.key === 'string' &&
    value.key.length > 0 &&
    typeof value.email === 'string' &&
    value.email.length > 0
  );
}

/**
 * @param {ExecAccountCatalog} catalog
 * @param {'claude'|'codex'} provider_key
 * @returns {ExecAccountProviderCatalog|null}
 */
function providerCatalog(catalog, provider_key) {
  const provider = catalog && catalog[provider_key];
  if (!isRecord(provider) || !Array.isArray(provider.accounts)) {
    return null;
  }
  const accounts = provider.accounts.filter(isAccount);
  const explicit_active = isAccount(provider.active) ? provider.active : null;
  return {
    accounts,
    active:
      explicit_active ||
      accounts.find((account) => account.active === true) ||
      null
  };
}

/**
 * @param {ExecAccount} account
 */
function aliasSuffix(account) {
  return typeof account.alias === 'string' && account.alias.length > 0
    ? ` (${account.alias})`
    : '';
}

/**
 * @param {ExecAccount} account
 */
function claudeLabel(account) {
  const status_suffix =
    typeof account.status === 'string' && account.status !== 'ok'
      ? ` · ${account.status}`
      : '';
  return `${account.email}${aliasSuffix(account)}${status_suffix}`;
}

/**
 * @param {ExecAccount} account
 */
function codexLabel(account) {
  const plan =
    typeof account.plan === 'string' && account.plan.length > 0
      ? account.plan
      : 'plan 확인 불가';
  return `${account.email} · ${plan}${aliasSuffix(account)}`;
}

/**
 * @param {'claude'|'codex'} provider_key
 * @param {ExecAccountProviderCatalog|null} provider
 */
function defaultLabel(provider_key, provider) {
  if (!provider) {
    return '(기본)';
  }
  if (!provider.active) {
    return '기본값 사용 — 현재 로그인(확인 불가)';
  }
  const active_label =
    provider_key === 'claude'
      ? provider.active.email
      : codexLabel({ ...provider.active, alias: null });
  return `기본값 사용 — 현재 로그인(${active_label})`;
}

/**
 * @param {{ key: string, title: string, provider_key: 'claude'|'codex', provider: ExecAccountProviderCatalog|null, selected: string, handlers: ExecAccountHandlers, hint?: string }} model
 * @returns {TemplateResult}
 */
function accountRow(model) {
  const formatter = model.provider_key === 'claude' ? claudeLabel : codexLabel;
  const known = Boolean(
    model.provider?.accounts.some((account) => account.key === model.selected)
  );
  return html`<div class="detail-kv" data-exec-account-row=${model.key}>
    <span class="detail-kv__k">${model.title}</span>
    <span class="detail-kv__vgroup">
      <select
        class=${model.selected
          ? 'detail-kv__v detail-kv__v--sel'
          : 'detail-kv__v'}
        aria-label=${model.title}
        data-exec-key=${model.key}
        @change=${(/** @type {Event} */ event) =>
          model.handlers.onExecChange(
            model.key,
            /** @type {HTMLSelectElement} */ (event.target).value
          )}
      >
        <option value="" ?selected=${model.selected.length === 0}>
          ${defaultLabel(model.provider_key, model.provider)}
        </option>
        ${model.selected && !known
          ? html`<option value=${model.selected} selected>
              ${model.selected} (목록에 없음)
            </option>`
          : ''}
        ${model.provider?.accounts.map(
          (account) =>
            html`<option
              value=${account.key}
              ?selected=${account.key === model.selected}
            >
              ${formatter(account)}
            </option>`
        ) || ''}
      </select>
      ${model.hint
        ? html`<small class="detail-effective__hint">${model.hint}</small>`
        : ''}
      ${model.provider
        ? ''
        : html`<small class="detail-effective__hint"
            >계정 목록을 불러올 수 없습니다</small
          >`}
    </span>
  </div>`;
}

/**
 * The two per-issue account pins. These remain separate from the shared
 * execution-setting key model because accounts are machine-local identities.
 *
 * @param {{ md: Record<string, any>, catalog: ExecAccountCatalog, handlers: ExecAccountHandlers }} input
 * @returns {TemplateResult}
 */
export function execAccountsTemplate({ md, catalog, handlers }) {
  const claude_selected =
    typeof md.claude_account === 'string' ? md.claude_account : '';
  const codex_selected =
    typeof md.codex_account === 'string' ? md.codex_account : '';
  return html`<section class="exec-accounts" data-exec-accounts>
    <div class="detail-section-label">실행 계정</div>
    <div class="exec-settings-core">
      ${accountRow({
        key: 'claude_account',
        title: 'Claude 계정',
        provider_key: 'claude',
        provider: providerCatalog(catalog, 'claude'),
        selected: claude_selected,
        handlers,
        hint: '오케스트레이션 런타임이 claude일 때 적용됩니다'
      })}
      ${accountRow({
        key: 'codex_account',
        title: 'Codex 계정',
        provider_key: 'codex',
        provider: providerCatalog(catalog, 'codex'),
        selected: codex_selected,
        handlers
      })}
    </div>
  </section>`;
}
