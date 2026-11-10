/**
 * The one display name of a Claude or Codex account (UI-32oq §4.3) — the copy
 * server notifications and app views both read.
 *
 * It lives in `app/utils/` with no imports, like `failure-sentences.js`: pure
 * data shared by both runtimes, so a notification and a card never name the
 * same account two ways.
 *
 * Rules: the login email; `email (alias)` with an alias. A list that holds one
 * email more than once (Codex workspaces) says `email · plan`, and `#<number>`
 * is appended when that is still ambiguous. A key the list does not hold keeps
 * the caller's fallback (fail-quiet).
 *
 * @typedef {{ key?: string, email?: string, alias?: string|null, plan?: string|null, number?: number }} AccountNameRow
 */

/**
 * The identity a row is looked up by: Codex `account_key`, else the Claude
 * email (a Claude row's key is its email).
 *
 * @param {AccountNameRow} row
 * @returns {string|null}
 */
function identityOf(row) {
  if (typeof row.key === 'string' && row.key.length > 0) {
    return row.key;
  }
  return typeof row.email === 'string' && row.email.length > 0
    ? row.email
    : null;
}

/**
 * The email, widened by the plan when the list repeats the email.
 *
 * @param {AccountNameRow} row
 * @param {readonly AccountNameRow[]} rows
 * @returns {string}
 */
function baseOf(row, rows) {
  const email = /** @type {string} */ (row.email);
  const repeated = rows.some((other) => other !== row && other.email === email);
  return repeated && typeof row.plan === 'string' && row.plan.length > 0
    ? `${email} · ${row.plan}`
    : email;
}

/**
 * Name one account the way every notice and view does.
 *
 * @param {readonly AccountNameRow[]|null|undefined} accounts - The list the
 * key belongs to; absent or not an array means the fallback.
 * @param {string|null|undefined} key - Codex `account_key` or Claude email.
 * @param {string} [fallback] - Shown when the list cannot name the key;
 * defaults to the key itself.
 * @returns {string}
 */
export function accountDisplayName(accounts, key, fallback) {
  const unnamed = fallback ?? (typeof key === 'string' ? key : '');
  if (!Array.isArray(accounts) || typeof key !== 'string') {
    return unnamed;
  }
  const rows = accounts.filter(
    (row) =>
      row &&
      typeof row === 'object' &&
      typeof row.email === 'string' &&
      row.email.length > 0
  );
  const row = rows.find((candidate) => identityOf(candidate) === key);
  if (!row) {
    return unnamed;
  }
  const base = baseOf(row, rows);
  const ambiguous = rows.some(
    (other) => other !== row && baseOf(other, rows) === base
  );
  const alias =
    typeof row.alias === 'string' && row.alias.length > 0
      ? ` (${row.alias})`
      : '';
  const number =
    ambiguous && Number.isInteger(row.number) ? ` #${row.number}` : '';
  return `${base}${alias}${number}`;
}
