/**
 * The active-login status lines of the settings dialog (UI-32oq §4.4).
 *
 * - `활성 계정` tab: one line per runner naming the current login and, while a
 *   departure record stands, when the default comes back, then the note that
 *   repos without a pinned account run their Workers on this login too.
 * - `계정` tab: the same facts on one line with a link to the `활성 계정` tab,
 *   and per runner the warning a waiting repo needs when its empty pin follows
 *   the active-login auto switch.
 *
 * Every account name goes through `accountDisplayName`, and the return wording
 * is the one the server notices use (`app/utils/active-login-return.js`).
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 * @typedef {'claude'|'codex'} LoginRunner
 * @typedef {import('../../utils/active-login-return.js').DepartureRecord} DepartureRecord
 * @typedef {{ accounts: any[], active: any }|null} ProviderCatalog
 * @typedef {{ claude: ProviderCatalog, codex: ProviderCatalog }} LoginCatalog
 * @typedef {import('../../data/limit-policy-settings-store.js').LimitPolicySettingsState} LimitPolicySettingsState
 */
import { html, render } from 'lit-html';
import {
  departuresOf,
  isLimitPolicySnapshot
} from '../../data/limit-policy-settings-store.js';
import { accountDisplayName } from '../../utils/account-display-name.js';
import { returnHintOf } from '../../utils/active-login-return.js';
import { loadAccountCatalog } from './account-catalog.js';

/** @type {ReadonlyArray<[LoginRunner, string]>} */
export const LOGIN_RUNNERS = [
  ['claude', 'Claude'],
  ['codex', 'Codex']
];

/** The note under the `활성 계정` tab's status lines. */
export const WORKER_LOGIN_NOTE =
  '저장소 고정 계정이 없는 저장소의 Worker도 이 로그인을 씁니다.';

/** The `계정` tab warning for a waiting repo with an empty pin. */
export const PINNED_EMPTY_WARNING =
  '고정 계정이 비어 있어 활성 계정 자동 전환을 따라갑니다. 기다림을 지키려면 고정 계정을 고르세요.';

/** What a line says when the account list cannot name the login. */
const UNKNOWN_LOGIN = '확인 불가';

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The current login's display name, or `확인 불가` when the list is missing
 * or marks no row active.
 *
 * @param {ProviderCatalog} provider
 * @returns {string}
 */
export function activeLoginName(provider) {
  const active = provider ? provider.active : null;
  if (!isRecord(active) || typeof active.key !== 'string') {
    return UNKNOWN_LOGIN;
  }
  return accountDisplayName(provider?.accounts, active.key, active.email);
}

/**
 * The return hint naming the default by its display name, e.g. `default
 * a@x.com 리셋 14:00 뒤 복귀`, or `default a@x.com 사용량 회복 확인 뒤 복귀`
 * when `until` is null.
 *
 * @param {DepartureRecord} record
 * @param {ProviderCatalog} provider
 * @returns {string}
 */
export function departureHintText(record, provider) {
  return returnHintOf(
    record,
    accountDisplayName(provider?.accounts, record.default_account)
  );
}

/**
 * One runner's status text for the `활성 계정` tab: `Claude 활성 로그인
 * <이름>`, plus the return hint while a departure record stands.
 *
 * @param {string} label - The runner's display name (`Claude`, `Codex`).
 * @param {ProviderCatalog} provider
 * @param {DepartureRecord|null} record
 * @returns {string}
 */
export function runnerStatusText(label, provider, record) {
  const head = `${label} 활성 로그인 ${activeLoginName(provider)}`;
  return record === null
    ? head
    : `${head} · ${departureHintText(record, provider)}`;
}

/**
 * The `계정` tab's one status line: every runner's current login, each with
 * its return hint in parentheses while a record stands.
 *
 * @param {LoginCatalog} catalog
 * @param {Record<LoginRunner, DepartureRecord|null>} departures
 * @returns {string}
 */
export function accountTabStatusText(catalog, departures) {
  const parts = LOGIN_RUNNERS.map(([runner, label]) => {
    const provider = catalog[runner];
    const record = departures[runner];
    const name = `${label} ${activeLoginName(provider)}`;
    return record === null
      ? name
      : `${name} (${departureHintText(record, provider)})`;
  });
  return `활성 로그인: ${parts.join(' · ')}`;
}

/**
 * Whether a repo's `계정` tab warns for one runner: the repo waits, its pin
 * for that runner is empty, and that runner's active-login auto switch is
 * on. Nothing is locked either way.
 *
 * @param {{ mode: 'wait'|'switch', pinned: string, auto_switch: boolean }} input
 * @returns {boolean}
 */
export function warnsPinnedEmpty(input) {
  return (
    input.mode === 'wait' &&
    input.pinned.length === 0 &&
    input.auto_switch === true
  );
}

/**
 * A key that changes whenever a departure record does, so a view can re-read
 * the account list once the login it names has moved.
 *
 * @param {unknown} state
 * @returns {string}
 */
export function departureSignature(state) {
  return JSON.stringify(departuresOf(state));
}

/**
 * Mount the `활성 계정` tab's status lines into `host`. The account list is
 * read on mount and again whenever a departure record changes, since a record
 * appearing or ending is exactly when the active login moved.
 *
 * @param {HTMLElement} host
 * @param {{
 *   limitPolicySettingsStore?: { get: () => LimitPolicySettingsState|null, subscribe?: (fn: () => void) => () => void },
 *   loadCatalog?: () => Promise<LoginCatalog>
 * }} options
 * @returns {{ render: () => void, destroy: () => void }}
 */
export function createActiveLoginStatus(host, options) {
  let destroyed = false;
  /** @type {LoginCatalog} */
  let catalog = { claude: null, codex: null };
  let catalog_read = false;
  let last_signature = departureSignature(snapshot());
  /** @type {(() => void)|null} */
  let unsubscribe = null;

  /** @returns {LimitPolicySettingsState|null} */
  function snapshot() {
    const state = options.limitPolicySettingsStore?.get() ?? null;
    return isLimitPolicySnapshot(state) ? state : null;
  }

  function reloadCatalog() {
    void (options.loadCatalog ?? loadAccountCatalog)().then((loaded) => {
      if (destroyed) {
        return;
      }
      catalog = loaded;
      catalog_read = true;
      doRender();
    });
  }

  function onStoreChange() {
    const signature = departureSignature(snapshot());
    if (signature !== last_signature) {
      last_signature = signature;
      reloadCatalog();
    }
    doRender();
  }

  function doRender() {
    if (destroyed) {
      return;
    }
    if (!catalog_read && snapshot() === null) {
      render(html``, host);
      return;
    }
    const departures = departuresOf(snapshot());
    render(
      html`<div data-active-login-status aria-live="polite">
        ${LOGIN_RUNNERS.map(
          ([runner, label]) =>
            html`<p
              class="settings-dialog__hint-block settings-dialog__login-line"
              data-active-login-line=${runner}
            >
              ${runnerStatusText(label, catalog[runner], departures[runner])}
            </p>`
        )}
        <p class="settings-dialog__hint-block" data-active-login-note>
          ${WORKER_LOGIN_NOTE}
        </p>
      </div>`,
      host
    );
  }

  if (options.limitPolicySettingsStore?.subscribe) {
    unsubscribe = options.limitPolicySettingsStore.subscribe(onStoreChange);
  }
  reloadCatalog();

  return {
    render: doRender,
    destroy() {
      destroyed = true;
      unsubscribe?.();
      unsubscribe = null;
      render(html``, host);
    }
  };
}
