/**
 * The machine-local exec account catalog (UI-nu43 §4.1).
 *
 * Accounts belong to the server machine, not to a repo: every repo on the same
 * server accepts the same keys. The execution pane and the bulk pane both read
 * the catalog through this module so their selects name accounts the same way.
 */
import { claudeLabel, codexLabel } from '../detail-panel/exec-accounts.js';

export { claudeLabel, codexLabel };

/**
 * @typedef {{ accounts: any[], active: any }} AccountProviderCatalog
 * @typedef {{ claude: AccountProviderCatalog|null, codex: AccountProviderCatalog|null }} AccountCatalog
 */

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * One provider's selectable rows. Same acceptance as the issue detail panel:
 * the server owns the full row contract, this boundary needs only the stable
 * key and the visible email. Any failure reads as `null` (list unavailable).
 *
 * @param {string} endpoint
 * @returns {Promise<AccountProviderCatalog|null>}
 */
export async function fetchAccountProvider(endpoint) {
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

/**
 * Read both providers' account lists in parallel.
 *
 * @returns {Promise<AccountCatalog>}
 */
export async function loadAccountCatalog() {
  const [claude, codex] = await Promise.all([
    fetchAccountProvider('/api/claude-usage'),
    fetchAccountProvider('/api/codex-usage')
  ]);
  return { claude, codex };
}

/**
 * Name one catalog row's usage windows so an account is picked with the same
 * numbers the top usage meter and the switch decision read (UI-e1ta §6.1). A
 * row with no `windows`, or a window whose `pct` is not a number, loses only
 * the percentage — the account line itself stays (fail-quiet).
 *
 * @param {any} row
 * @returns {string}
 */
export function usageWindowSuffix(row) {
  const windows = Array.isArray(row?.windows) ? row.windows : [];
  const parts = windows
    .filter(
      (/** @type {any} */ window) =>
        isRecord(window) &&
        typeof window.key === 'string' &&
        window.key.length > 0 &&
        typeof window.pct === 'number' &&
        Number.isFinite(window.pct)
    )
    .map(
      (/** @type {any} */ window) => `${window.key} ${Math.round(window.pct)}%`
    );
  return parts.length > 0 ? ` (${parts.join(' · ')})` : '';
}

/**
 * The label a catalog row shows in an account select. Both settings windows
 * call this one formatter, so the bulk window and the single-repo window name
 * an account — and its usage — identically (§6.1).
 *
 * @param {'claude'|'codex'} provider_key
 * @param {any} row
 * @returns {string}
 */
export function accountRowLabel(provider_key, row) {
  const base = provider_key === 'claude' ? claudeLabel(row) : codexLabel(row);
  return `${base}${usageWindowSuffix(row)}`;
}

/**
 * The "no repo default" option label: what that choice falls through to, which
 * is the machine's current login.
 *
 * @param {'claude'|'codex'} provider_key
 * @param {AccountProviderCatalog|null} provider
 * @returns {string}
 */
export function accountDefaultLabel(provider_key, provider) {
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
