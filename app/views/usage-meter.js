import { html, render } from 'lit-html';
import { live } from 'lit-html/directives/live.js';
import {
  departuresOf,
  isLimitPolicySnapshot,
  limitPolicyStateOf
} from '../data/limit-policy-settings-store.js';
import { accountDisplayName } from '../utils/account-display-name.js';
import { returnWhenOf } from '../utils/active-login-return.js';
import { copyToClipboard } from '../utils/clipboard.js';
import { errorText } from '../utils/error-text.js';
import { showToast } from '../utils/toast.js';

/**
 * @typedef {{ key: string, pct: number, resetsAt: string }} UsageWindow
 * @typedef {{ key: string, number: number, email: string, alias: string | null, plan: string | null, active: boolean, status: string, windows: UsageWindow[], fetchedAt: string | null, ageSeconds: number | null }} UsageAccount
 * @typedef {{ available: boolean, windows: UsageWindow[], ageSeconds: number | null, accounts: UsageAccount[], receivedAtMs: number, held: boolean }} ProviderSnapshot
 * @typedef {{ key: string, label: string, endpoint: string, switch_endpoint: string, remove_endpoint: string, login_tools: string }} ProviderDescriptor
 * @typedef {{ kind: 'ok' | 'warn' | 'error' | 'confirm' | 'remove_confirm', text: string }} RowMessage
 * @typedef {{
 *   provider: string,
 *   mode: 'relogin' | 'add',
 *   number: number | null,
 *   login_id: string | null,
 *   state: string,
 *   url: string | null,
 *   user_code: string | null,
 *   needs_code: boolean,
 *   code: string,
 *   busy: boolean,
 *   copied: boolean,
 *   error_text: string | null
 * }} LoginPanel
 * @typedef {{ kind: 'ok', snapshot: ProviderSnapshot } | { kind: 'empty' } | { kind: 'error' }} ProviderRead
 * @typedef {import('../data/limit-policy-settings-store.js').LimitPolicySettingsState} LimitPolicySettingsState
 * @typedef {{
 *   store: { get: () => LimitPolicySettingsState|null, set?: (state: LimitPolicySettingsState|null) => void, subscribe?: (fn: () => void) => () => void },
 *   transport: (type: any, payload?: unknown) => Promise<any>,
 *   toast?: (message: string, kind?: string) => void
 * }} LimitPolicyBinding
 */

const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const CARD_ID = 'usage-meter-card';
// Body-level host of the open card and its scrim. The header carries a
// `backdrop-filter`, which makes it the containing block of every
// `position: fixed` descendant: rendered inside the mount, the mobile bottom
// sheet anchored `bottom: 0` to the header and grew upward out of the viewport.
const LAYER_ID = 'usage-meter-layer';
const STALE_AGE_SECONDS = 600;
const POLL_MS = 60_000;
const RELOGIN_STATUSES = ['token_expired', 'relogin_required'];
const LOGIN_POLL_MS = 2_000;
const LOGIN_END_STATES = ['done', 'failed', 'cancelled', 'expired'];
const ERROR_CODE_RE = /^[a-z][a-z0-9_]*$/;

/**
 * Why a login session failed, keyed by the server's `error` code
 * (UI-xm29 §4.6); `not_found` names the provider's tools at render time.
 *
 * @type {Record<string, string>}
 */
const LOGIN_FAILURE_TEXT = {
  device_auth_unavailable: '기기 코드 로그인을 시작하지 못함',
  login_url_missing: '로그인 링크를 받지 못함',
  login_incomplete: '로그인이 끝나지 않음',
  switch_in_flight: '계정 전환 중이라 저장하지 못함 — 잠시 뒤 다시 시도',
  cleanup_incomplete: '로그인 창·프로세스를 정리하지 못함',
  unsupported_account: '지원하지 않는 계정',
  account_not_found: '목록에서 계정을 찾지 못함',
  import_failed: '계정을 목록에 넣지 못함',
  active_auth_update_failed: '활성 로그인을 새 자격으로 바꾸지 못함',
  import_unverified: '넣은 계정을 목록에서 확인하지 못함',
  account_list_unavailable: '계정 목록을 읽지 못함',
  tmux_failed: 'tmux 창을 열지 못함',
  invalid_output: '로그인 도구의 출력을 읽지 못함',
  login_not_found: '로그인 세션이 이미 끝남'
};

/**
 * Why a pasted Claude code was refused, keyed by the server's `error` code.
 *
 * @type {Record<string, string>}
 */
const CODE_ERROR_TEXT = {
  invalid_code: '코드 형식이 맞지 않음',
  code_not_supported: '이 로그인은 코드를 받지 않음',
  code_already_sent: '코드를 이미 보냄',
  not_awaiting_code: '지금은 코드를 받지 않음',
  code_send_failed: '코드를 넣지 못함',
  login_not_found: '로그인 세션이 이미 끝남'
};

/**
 * The `error` code of a response body, or null when it carries none the card
 * may show.
 *
 * @param {any} body
 * @returns {string | null}
 */
function errorCodeOf(body) {
  return body &&
    typeof body.error === 'string' &&
    ERROR_CODE_RE.test(body.error)
    ? body.error
    : null;
}

/**
 * The failure sentence of a login start or session end (UI-xm29 §4.6). An
 * unknown code is shown as is; a body without one says only that it failed.
 *
 * @param {ProviderDescriptor} provider
 * @param {any} body - The start response or the session status.
 * @returns {string}
 */
export function loginFailureText(provider, body) {
  const code = errorCodeOf(body);
  const message =
    body && typeof body.message === 'string' && body.message.length > 0
      ? body.message
      : null;
  if (code === 'identity_mismatch') {
    const email =
      body && typeof body.logged_in_email === 'string' && body.logged_in_email
        ? body.logged_in_email
        : null;
    return email === null
      ? '다른 계정으로 로그인됨 — 저장하지 않음'
      : `${email}로 로그인됨 — 다른 계정`;
  }
  if (code === 'not_found') {
    return `로그인 실패 — 도구를 찾지 못함 (${provider.login_tools})`;
  }
  if (code === 'login_failed') {
    const hint =
      provider.key === 'codex'
        ? ' · Mac 터미널에서 codex-auth login으로 로그인하세요'
        : '';
    return `로그인 실패${message === null ? '' : ` — ${message}`}${hint}`;
  }
  if (code === null) {
    return '로그인 실패';
  }
  return `로그인 실패 — ${LOGIN_FAILURE_TEXT[code] ?? code}`;
}

/**
 * The row or section message a finished login leaves behind.
 *
 * @param {ProviderDescriptor} provider
 * @param {any} status - The final session status.
 * @param {string} name - The account's display name for a success.
 * @returns {RowMessage}
 */
function loginEndMessage(provider, status, name) {
  if (status.state === 'done') {
    const added = status.result?.outcome === 'added';
    return { kind: 'ok', text: `${added ? '추가됨' : '로그인됨'} — ${name}` };
  }
  if (status.state === 'cancelled') {
    return { kind: 'warn', text: '로그인 취소됨' };
  }
  if (status.state === 'expired') {
    return {
      kind: 'error',
      text: '로그인 시간 초과(15분) — 다시 시도하세요'
    };
  }
  return { kind: 'error', text: loginFailureText(provider, status) };
}

/**
 * Why a remove request was refused (UI-xm29 §4.4-3 blocks and the request
 * errors). Confirmation cannot pass any of these.
 *
 * @param {any} body
 * @returns {string}
 */
function removeRefusalText(body) {
  const code = errorCodeOf(body);
  if (code === 'account_in_use') {
    const in_use = Array.isArray(body.in_use)
      ? body.in_use.filter(
          (/** @type {unknown} */ id) => typeof id === 'string'
        )
      : [];
    return `실행 중인 워커가 이 계정을 사용 중이라 지울 수 없음${
      in_use.length > 0 ? ` (${in_use.join(', ')})` : ''
    }`;
  }
  /** @type {Record<string, string>} */
  const sentences = {
    account_active: '활성 계정은 지울 수 없음',
    in_use_unchecked: '실행 중 사용 여부를 확인하지 못해 지우지 않음',
    account_changed: '계정 목록이 바뀌어 지우지 않음 — 목록을 다시 읽었습니다',
    switch_in_flight: '계정 전환 중 — 잠시 뒤 다시 시도',
    account_list_unavailable: '계정 목록을 읽지 못해 지우지 않음',
    not_found: '삭제 도구를 찾지 못함'
  };
  if (code !== null && sentences[code] !== undefined) {
    return sentences[code];
  }
  if (code === 'remove_failed') {
    const message =
      typeof body.message === 'string' && body.message.length > 0
        ? ` — ${body.message}`
        : '';
    return `삭제 실패${message}`;
  }
  return `삭제 실패${code === null ? '' : ` — ${code}`}`;
}

/**
 * The confirm line of a remove: the settings that still name the account
 * (`평소 계정 · 저장소 2곳 고정 · 허용 목록`), the repos that could not be read,
 * and the note that a removed usual account stops the automatic return
 * (UI-xm29 §4.4-7) — or a bare `삭제할까요?` when nothing names it.
 *
 * @param {unknown} refs_input
 * @param {unknown} unchecked_input
 * @returns {string}
 */
export function removeConfirmText(refs_input, unchecked_input) {
  const refs = Array.isArray(refs_input) ? refs_input : [];
  /** @param {string} kind */
  const count = (kind) =>
    refs.filter((ref) => ref && typeof ref === 'object' && ref.kind === kind)
      .length;
  /** @type {string[]} */
  const parts = [];
  const is_default = count('default_account') > 0;
  if (is_default) {
    parts.push('평소 계정');
  }
  const pins = count('workspace_pin');
  if (pins > 0) {
    parts.push(`저장소 ${pins}곳 고정`);
  }
  if (count('active_allow_list') > 0) {
    parts.push('허용 목록');
  }
  const policies = count('workspace_policy');
  if (policies > 0) {
    parts.push(`저장소 ${policies}곳 한도 정책`);
  }
  const unchecked =
    typeof unchecked_input === 'number' &&
    Number.isInteger(unchecked_input) &&
    unchecked_input > 0
      ? unchecked_input
      : 0;
  if (unchecked > 0) {
    parts.push(`저장소 ${unchecked}곳 확인 못 함`);
  }
  if (parts.length === 0) {
    return '삭제할까요?';
  }
  const note = is_default ? ' 평소 계정이 사라지면 자동 복귀가 멈춥니다.' : '';
  return `${parts.join(' · ')} — 그래도 삭제할까요?${note}`;
}

/**
 * POST a JSON body and read the JSON answer whatever the HTTP status; a
 * network or parse failure is null.
 *
 * @param {string} url
 * @param {unknown} body
 * @returns {Promise<any>}
 */
async function postJson(url, body) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Format a number as two decimal digits.
 *
 * @param {number} value
 */
function pad(value) {
  return String(value).padStart(2, '0');
}

/**
 * Format time remaining using cswap's compact day/hour/minute vocabulary.
 *
 * @param {number} reset_ms
 * @param {number} now_ms
 */
function formatCountdown(reset_ms, now_ms) {
  const total_minutes = Math.max(0, Math.ceil((reset_ms - now_ms) / 60_000));
  const days = Math.floor(total_minutes / (24 * 60));
  const hours = Math.floor((total_minutes % (24 * 60)) / 60);
  const minutes = total_minutes % 60;
  if (days > 0) {
    return `${days}d${hours > 0 ? ` ${hours}h` : ''}`;
  }
  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`;
  }
  return `${minutes}m`;
}

/**
 * Format a reset as its local clock: `HH:MM` on the same day, `Mon D HH:MM`
 * otherwise. Unparseable input is empty.
 *
 * @param {string} resets_at
 * @param {number} [now_ms]
 */
export function formatResetClock(resets_at, now_ms = Date.now()) {
  const reset_ms = Date.parse(resets_at);
  if (!Number.isFinite(reset_ms)) {
    return '';
  }
  const reset = new Date(reset_ms);
  const now = new Date(now_ms);
  const clock = `${pad(reset.getHours())}:${pad(reset.getMinutes())}`;
  const same_day =
    reset.getFullYear() === now.getFullYear() &&
    reset.getMonth() === now.getMonth() &&
    reset.getDate() === now.getDate();
  return same_day
    ? clock
    : `${MONTH_NAMES[reset.getMonth()]} ${reset.getDate()} ${clock}`;
}

/**
 * Format a reset as `countdown · local time` at render time.
 *
 * @param {string} resets_at
 * @param {number} [now_ms]
 */
export function formatResetTime(resets_at, now_ms = Date.now()) {
  const reset_ms = Date.parse(resets_at);
  if (!Number.isFinite(reset_ms)) {
    return '';
  }
  return `${formatCountdown(reset_ms, now_ms)} · ${formatResetClock(resets_at, now_ms)}`;
}

/**
 * Format a snapshot age with the card's second/minute/hour vocabulary.
 *
 * @param {number} age_seconds
 */
export function formatAge(age_seconds) {
  const seconds = Math.max(0, Math.floor(age_seconds));
  if (seconds < 60) {
    return `${seconds}초 전`;
  }
  if (seconds < 3_600) {
    return `${Math.floor(seconds / 60)}분 전`;
  }
  return `${Math.floor(seconds / 3_600)}시간 전`;
}

/**
 * @param {number} pct
 */
function colorClass(pct) {
  if (pct >= 85) {
    return 'usage-meter__window--danger';
  }
  if (pct >= 60) {
    return 'usage-meter__window--warn';
  }
  return 'usage-meter__window--success';
}

/**
 * @param {unknown} pct
 */
function clampPct(pct) {
  const raw_pct = typeof pct === 'number' && Number.isFinite(pct) ? pct : 0;
  return Math.min(100, Math.max(0, raw_pct));
}

/** @type {ProviderDescriptor[]} */
const PROVIDERS = [
  {
    key: 'claude',
    label: 'Claude',
    endpoint: '/api/claude-usage',
    switch_endpoint: '/api/claude-account/switch',
    remove_endpoint: '/api/claude-account/remove',
    login_tools: 'cswap·tmux'
  },
  {
    key: 'codex',
    label: 'Codex',
    endpoint: '/api/codex-usage',
    switch_endpoint: '/api/codex-account/switch',
    remove_endpoint: '/api/codex-account/remove',
    login_tools: 'codex·codex-auth'
  }
];

/**
 * Keep only the windows the meter can actually draw.
 *
 * @param {unknown[]} input
 * @returns {UsageWindow[]}
 */
function normalizeWindows(input) {
  /** @type {UsageWindow[]} */
  const windows = [];
  for (const candidate of input) {
    if (!candidate || typeof candidate !== 'object') {
      continue;
    }
    const window = /** @type {any} */ (candidate);
    if (typeof window.key !== 'string' || window.key.length === 0) {
      continue;
    }
    if (typeof window.pct !== 'number' || !Number.isFinite(window.pct)) {
      continue;
    }
    windows.push({
      key: window.key,
      pct: window.pct,
      resetsAt: typeof window.resetsAt === 'string' ? window.resetsAt : ''
    });
  }
  return windows;
}

/**
 * Normalize one `accounts[]` row; a row that does not match the contract is
 * dropped so a malformed row never removes the rest of the card.
 *
 * @param {unknown} input
 * @returns {UsageAccount | null}
 */
function normalizeAccountRow(input) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const row = /** @type {any} */ (input);
  if (!Number.isInteger(row.number) || row.number <= 0) {
    return null;
  }
  if (typeof row.email !== 'string' || row.email.length === 0) {
    return null;
  }
  if (typeof row.status !== 'string' || row.status.length === 0) {
    return null;
  }
  if (typeof row.active !== 'boolean' || !Array.isArray(row.windows)) {
    return null;
  }
  return {
    key:
      typeof row.key === 'string' && row.key.length > 0 ? row.key : row.email,
    number: row.number,
    email: row.email,
    alias:
      typeof row.alias === 'string' && row.alias.length > 0 ? row.alias : null,
    plan: typeof row.plan === 'string' && row.plan.length > 0 ? row.plan : null,
    active: row.active,
    status: row.status,
    windows: normalizeWindows(row.windows),
    fetchedAt: typeof row.fetchedAt === 'string' ? row.fetchedAt : null,
    ageSeconds:
      typeof row.ageSeconds === 'number' && Number.isFinite(row.ageSeconds)
        ? row.ageSeconds
        : null
  };
}

/**
 * Collapse one usage response into what the header and the card render. A
 * provider stays visible when either the active account or at least one
 * account row is usable.
 *
 * @param {unknown} input
 * @param {number} received_at_ms
 * @returns {ProviderSnapshot | null}
 */
function normalizeSnapshot(input, received_at_ms) {
  if (!input || typeof input !== 'object') {
    return null;
  }
  const payload = /** @type {any} */ (input);
  /** @type {UsageAccount[]} */
  const accounts = [];
  if (Array.isArray(payload.accounts)) {
    for (const row of payload.accounts) {
      const account = normalizeAccountRow(row);
      if (account) {
        accounts.push(account);
      }
    }
  }
  const available =
    payload.available === true && Array.isArray(payload.windows);
  if (!available && accounts.length === 0) {
    return null;
  }
  return {
    available,
    windows: available ? normalizeWindows(payload.windows) : [],
    ageSeconds:
      typeof payload.ageSeconds === 'number' &&
      Number.isFinite(payload.ageSeconds)
        ? payload.ageSeconds
        : null,
    accounts,
    receivedAtMs: received_at_ms,
    held: false
  };
}

/**
 * Separate an empty-but-successful provider response from a failed lookup.
 *
 * The two collapse to the same `available: false` shape on the wire, but only
 * a failure may keep the previous snapshot on screen: the server attaches
 * `accounts[]` to every payload it could parse, so a missing array is the tool
 * itself failing (`cswap`/`codex-auth` non-zero, killed at the route timeout,
 * unparsable stdout), while an empty array is a provider that genuinely
 * manages no account.
 *
 * @param {unknown} input
 * @param {number} received_at_ms
 * @returns {ProviderRead}
 */
function readPayload(input, received_at_ms) {
  if (!input || typeof input !== 'object') {
    return { kind: 'error' };
  }
  const snapshot = normalizeSnapshot(input, received_at_ms);
  if (snapshot) {
    return { kind: 'ok', snapshot };
  }
  return Array.isArray(/** @type {any} */ (input).accounts)
    ? { kind: 'empty' }
    : { kind: 'error' };
}

/**
 * Seconds since the snapshot's measurement, counting the time it has been held
 * on screen. The server's `ageSeconds` is fixed at fetch time, so without this
 * a held snapshot would keep claiming the age it had when it arrived.
 *
 * @param {ProviderSnapshot} snapshot
 * @param {number} now_ms
 */
function effectiveAgeSeconds(snapshot, now_ms) {
  const measured = snapshot.ageSeconds === null ? 0 : snapshot.ageSeconds;
  return measured + Math.max(0, now_ms - snapshot.receivedAtMs) / 1_000;
}

/**
 * What a snapshot renders as right now. A held snapshot keeps its numbers only
 * while they are fresh enough to act on; past the stale bound it degrades to
 * the provider's empty state, so the header group keeps its place without
 * presenting a long-dead measurement as current.
 *
 * @param {ProviderSnapshot} snapshot
 * @param {number} now_ms
 */
function displaySnapshot(snapshot, now_ms) {
  if (!snapshot.held) {
    return snapshot;
  }
  if (effectiveAgeSeconds(snapshot, now_ms) <= STALE_AGE_SECONDS) {
    return snapshot;
  }
  return { ...snapshot, available: false, windows: [], accounts: [] };
}

/**
 * Whether a snapshot reads as stale right now, and the note its tooltips add.
 * A held snapshot is stale from the first failed poll, however young its
 * measurement was: the number stopped tracking the provider.
 *
 * @param {ProviderSnapshot} snapshot
 * @param {number} now_ms
 * @returns {{ stale: boolean, stale_note: string }}
 */
function staleOf(snapshot, now_ms) {
  const age_seconds = effectiveAgeSeconds(snapshot, now_ms);
  const stale =
    snapshot.available && (snapshot.held || age_seconds > STALE_AGE_SECONDS);
  return {
    stale,
    stale_note: stale ? `${Math.floor(age_seconds / 60)}분 전 측정` : ''
  };
}

/**
 * Row-message key: the tool number is unique per provider, the email is not.
 *
 * @param {string} provider_key
 * @param {number} account_number
 */
function rowKey(provider_key, account_number) {
  return `${provider_key}:${account_number}`;
}

/**
 * Render and poll independent provider usage snapshots.
 *
 * With the active-login settings bound (at creation or later through
 * `bindLimitPolicy`), each card section also says `자동 전환 켬/끔 · default
 * <이름>` and, while a departure record stands, when the default comes back;
 * every account row gets a ★ that makes it that runner's default account, or
 * clears the default when it already is (UI-32oq §4.4). Without a settings
 * snapshot neither is drawn (fail-quiet).
 *
 * @param {HTMLElement} mount_element
 * @param {{ limitPolicy?: LimitPolicyBinding }} [options]
 */
export function createUsageMeter(mount_element, options = {}) {
  let destroyed = false;
  /** @type {LimitPolicyBinding|null} */
  let limit_policy = null;
  /** @type {(() => void)|null} */
  let unsubscribe_limit_policy = null;
  // Runners whose ★ write is in flight; their stars wait for the answer.
  /** @type {Set<string>} */
  const default_saving = new Set();
  // Provider key of the open card section. One provider at a time: each header
  // group is its own toggle, so the card shows only that provider's accounts.
  /** @type {string | null} */
  let open_provider = null;
  // provider key -> the account number currently switching. Keyed per provider
  // because the server allows one concurrent switch per provider, not one
  // globally, so a Codex switch must not be swallowed while Claude switches.
  /** @type {Map<string, number>} */
  const switching_rows = new Map();
  /** @type {ReturnType<typeof setInterval> | null} */
  let interval_id = null;
  /** @type {Map<string, ProviderSnapshot>} */
  const provider_snapshots = new Map();
  /** @type {Map<string, RowMessage>} */
  const row_messages = new Map();
  // provider key -> a notice that belongs to no row: an add that failed or
  // added a row without a number, a removal, a list that moved under a click.
  /** @type {Map<string, RowMessage>} */
  const section_messages = new Map();
  // provider key -> its login panel (UI-xm29 §4.5). The server runs one login
  // per provider and the card shows one provider, so the card holds at most
  // one panel. Kept outside the render so the usage poll's re-render keeps the
  // typed code and the session's last status.
  /** @type {Map<string, LoginPanel>} */
  const login_panels = new Map();
  // `<provider>:<login_id>` the status poll follows, and its timer.
  /** @type {string | null} */
  let login_poll_target = null;
  /** @type {ReturnType<typeof setInterval> | null} */
  let login_poll_timer = null;
  let login_poll_busy = false;
  // Providers whose [관리] is on, and the provider whose remove is in flight.
  /** @type {Set<string>} */
  const manage_providers = new Set();
  /** @type {Set<string>} */
  const removing_providers = new Set();
  // A poll started before an account switch can settle after the post-switch
  // refresh; only the newest refresh may write the snapshots.
  let refresh_generation = 0;
  /** @type {HTMLElement | null} */
  let layer_element = null;
  const doc = mount_element.ownerDocument;
  /**
   * What the header last drew, as {@link headerSignature}; `''` once the empty
   * mount is drawn, so an empty poll does not draw it again; `null` before the
   * first draw.
   *
   * @type {string | null}
   */
  let drawn = null;
  /** A poll came due while the page was hidden. */
  let missed_poll = false;

  /** @returns {boolean} */
  function pageShown() {
    return doc.visibilityState !== 'hidden';
  }

  /** Hide the fail-quiet mount and discard its previous snapshot. */
  function hide() {
    if (drawn !== '') {
      render(html``, mount_element);
      drawn = '';
    }
    mount_element.hidden = true;
    removeLayer();
  }

  /** The body-level layer, created on first use. */
  function ensureLayer() {
    if (layer_element === null) {
      const doc = mount_element.ownerDocument;
      layer_element = doc.createElement('div');
      layer_element.id = LAYER_ID;
      layer_element.className = 'usage-meter__layer';
      doc.body.appendChild(layer_element);
    }
    return layer_element;
  }

  /** Clear and detach the body-level layer. */
  function removeLayer() {
    if (layer_element === null) {
      return;
    }
    render(html``, layer_element);
    layer_element.remove();
    layer_element = null;
  }

  /**
   * Open the card on one provider, attaching the document listeners that
   * close it. Switching from another provider keeps the listeners.
   *
   * @param {string} provider_key
   */
  function openCard(provider_key) {
    if (open_provider === provider_key) {
      return;
    }
    if (open_provider === null) {
      document.addEventListener('mousedown', onDocMousedown);
      document.addEventListener('keydown', onDocKeydown);
      window.addEventListener('resize', onWindowResize);
    }
    open_provider = provider_key;
  }

  /**
   * Detach the document listeners and turn [관리] off, so delete controls
   * never wait on a closed card. A login panel stays: its poll stops with the
   * render and resumes when the card opens on that provider again. Callers
   * re-render.
   */
  function closeCard() {
    if (open_provider === null) {
      return;
    }
    for (const provider_key of manage_providers) {
      clearRemoveConfirms(provider_key);
    }
    manage_providers.clear();
    open_provider = null;
    document.removeEventListener('mousedown', onDocMousedown);
    document.removeEventListener('keydown', onDocKeydown);
    window.removeEventListener('resize', onWindowResize);
  }

  /**
   * Close on an outside mousedown. Anything inside the mount (the meter) or
   * the layer (the card, its buttons) keeps the card open; the scrim closes it
   * explicitly.
   *
   * @param {MouseEvent} ev
   */
  function onDocMousedown(ev) {
    const target = /** @type {Node | null} */ (ev.target);
    if (
      target &&
      (mount_element.contains(target) ||
        (layer_element !== null && layer_element.contains(target)))
    ) {
      return;
    }
    closeCard();
    renderProviders();
  }

  /** The desktop popover anchors to the header group; re-anchor on resize. */
  function onWindowResize() {
    renderProviders();
  }

  /**
   * @param {KeyboardEvent} ev
   */
  function onDocKeydown(ev) {
    if (ev.key === 'Escape') {
      closeCard();
      renderProviders();
    }
  }

  /**
   * Toggle the card from one provider's header group: the same provider
   * closes it, another provider switches the section without closing.
   *
   * @param {string} provider_key
   */
  function onToggleClick(provider_key) {
    if (open_provider === provider_key) {
      closeCard();
    } else {
      openCard(provider_key);
    }
    renderProviders();
  }

  /** Close the mobile bottom sheet from its scrim. */
  function onScrimMousedown() {
    closeCard();
    renderProviders();
  }

  /**
   * Switch the active account of one provider. Failures stay on the row: no
   * global toast, and the usage cache is left to the server.
   *
   * @param {ProviderDescriptor} provider
   * @param {number} account_number
   * @param {boolean} [confirm]
   */
  async function switchAccount(provider, account_number, confirm = false) {
    if (switching_rows.has(provider.key)) {
      return;
    }
    const row_key = rowKey(provider.key, account_number);
    switching_rows.set(provider.key, account_number);
    row_messages.delete(row_key);
    renderProviders();

    /** @type {any} */
    let body = null;
    try {
      const response = await fetch(provider.switch_endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number: account_number,
          ...(confirm ? { confirm: true } : {})
        })
      });
      body = await response.json();
    } catch {
      body = null;
    }
    if (destroyed) {
      return;
    }
    if (provider.key !== 'claude' || !body || body.ok !== true) {
      switching_rows.delete(provider.key);
    }

    if (body && body.ok === false && body.error === 'account_in_use') {
      const in_use = Array.isArray(body.in_use)
        ? body.in_use.filter(
            (/** @type {unknown} */ id) => typeof id === 'string'
          )
        : [];
      row_messages.set(row_key, {
        kind: 'confirm',
        text: `실행 중인 워커가 이 계정을 사용 중입니다${in_use.length > 0 ? ` (${in_use.join(', ')})` : ''}. 전환하면 토큰 갱신 충돌로 워커의 로그인이 풀릴 수 있습니다.`
      });
      renderProviders();
      return;
    }

    if (!body || body.ok !== true) {
      const error_text =
        body && typeof body.error === 'string' && body.error.length > 0
          ? body.error
          : 'network_error';
      row_messages.set(row_key, {
        kind: 'error',
        text: `전환 실패 — ${error_text}`
      });
      renderProviders();
      return;
    }

    const warnings = Array.isArray(body.warnings)
      ? body.warnings.filter(
          (/** @type {unknown} */ warning) =>
            typeof warning === 'string' && warning.length > 0
        )
      : [];
    if (warnings.length > 0) {
      row_messages.set(row_key, { kind: 'warn', text: warnings.join(' · ') });
    }
    renderProviders();
    await refresh();
    if (provider.key === 'claude') {
      switching_rows.delete(provider.key);
      if (!destroyed) {
        renderProviders();
      }
    }
  }

  /**
   * The bound settings snapshot, or null while none is known.
   *
   * @returns {LimitPolicySettingsState|null}
   */
  function limitPolicyState() {
    const state = limit_policy?.store.get() ?? null;
    return isLimitPolicySnapshot(state) ? state : null;
  }

  /**
   * One runner's settings entry, or null.
   *
   * @param {string} provider_key
   */
  function limitEntryOf(provider_key) {
    const state = limitPolicyState();
    if (!state || (provider_key !== 'claude' && provider_key !== 'codex')) {
      return null;
    }
    return state.runners[provider_key] ?? null;
  }

  /**
   * Adopt a snapshot a write answered with, so a refused ★ redraws from the
   * latest values.
   *
   * @param {unknown} next
   */
  function adoptLimitPolicy(next) {
    if (limit_policy && isLimitPolicySnapshot(next)) {
      limit_policy.store.set?.(limitPolicyStateOf(next));
    }
  }

  /**
   * @param {string} message
   */
  function limitPolicyToast(message) {
    const toast =
      limit_policy?.toast ||
      ((/** @type {string} */ text) => showToast(text, 'error', 4000));
    toast(message, 'error');
  }

  /**
   * Make one account a runner's default account, or clear the default
   * (`next: null`), through the settings channel's revision CAS. A conflict
   * is not re-sent: the click was computed from a snapshot someone else
   * moved, so the meter adopts the latest snapshot, says so and redraws.
   *
   * @param {string} provider_key
   * @param {string|null} next
   */
  async function setDefaultAccount(provider_key, next) {
    const binding = limit_policy;
    const state = limitPolicyState();
    if (!binding || !state || default_saving.has(provider_key)) {
      return;
    }
    default_saving.add(provider_key);
    renderProviders();
    try {
      const res = await binding.transport('limit-policy-settings-set', {
        expected_revision: state.revision,
        runners: { [provider_key]: { default_account: next } }
      });
      adoptLimitPolicy(res?.snapshot);
      if (res?.ok === false) {
        limitPolicyToast(
          res.code === 'conflict'
            ? 'default 계정 저장 실패: 다른 곳에서 먼저 바꿨습니다 — 최신 값으로 다시 그렸습니다'
            : `default 계정 저장 실패: ${res.message ?? res.code}`
        );
      }
    } catch (err) {
      adoptLimitPolicy(/** @type {any} */ (err)?.details?.snapshot);
      limitPolicyToast(`default 계정 저장 실패: ${errorText(err)}`);
    } finally {
      default_saving.delete(provider_key);
      if (!destroyed) {
        renderProviders();
      }
    }
  }

  /**
   * The ★ of one account row, or nothing without a settings snapshot.
   *
   * @param {ProviderDescriptor} provider
   * @param {UsageAccount} account
   * @param {string} name - The row's display name.
   */
  function defaultStarTemplate(provider, account, name) {
    const entry = limitEntryOf(provider.key);
    if (!entry) {
      return '';
    }
    const is_default = entry.default_account === account.key;
    const label = is_default
      ? `default 계정 비우기 — ${name}`
      : `default 계정으로 — ${name}`;
    return html`<button
      type="button"
      class=${`op-btn op-btn--ghost op-btn--icon usage-meter__default${
        is_default ? ' is-active' : ''
      }`}
      aria-pressed=${String(is_default)}
      aria-label=${label}
      title=${label}
      data-default-account=${account.key}
      ?disabled=${default_saving.has(provider.key)}
      @click=${() =>
        void setDefaultAccount(provider.key, is_default ? null : account.key)}
    >
      ${is_default ? '★' : '☆'}
    </button>`;
  }

  /**
   * The section's head line: `자동 전환 켬/끔 · default <이름>`, plus when the
   * default comes back while a departure record stands.
   *
   * @param {ProviderDescriptor} provider
   * @param {UsageAccount[]} accounts
   */
  function policyLineTemplate(provider, accounts) {
    const entry = limitEntryOf(provider.key);
    if (!entry) {
      return '';
    }
    const record =
      departuresOf(limitPolicyState())[
        /** @type {'claude'|'codex'} */ (provider.key)
      ];
    const parts = [
      `자동 전환 ${entry.auto_switch === true ? '켬' : '끔'}`,
      typeof entry.default_account !== 'string' || entry.default_account === ''
        ? 'default 비움'
        : `default ${accountDisplayName(accounts, entry.default_account)}`
    ];
    if (record !== null) {
      parts.push(returnWhenOf(record));
    }
    return html`<p
      class="usage-meter__policy"
      data-limit-policy-line=${provider.key}
    >
      ${parts.join(' · ')}
    </p>`;
  }

  /**
   * Bind the active-login settings: their store, the transport a ★ writes
   * through and the toast a refused write raises. A departure record change
   * also re-reads the account lists.
   *
   * @param {LimitPolicyBinding} binding
   */
  function bindLimitPolicy(binding) {
    unsubscribe_limit_policy?.();
    limit_policy = binding;
    let departure_signature = JSON.stringify(departuresOf(limitPolicyState()));
    unsubscribe_limit_policy =
      binding.store.subscribe?.(() => {
        if (destroyed) {
          return;
        }
        renderProviders();
        // A record that appears or ends means the active login moved; read
        // the lists now so the rows' `active` agrees with the head line.
        const signature = JSON.stringify(departuresOf(limitPolicyState()));
        if (signature !== departure_signature) {
          departure_signature = signature;
          void refresh();
        }
      }) ?? null;
    if (!destroyed) {
      renderProviders();
    }
  }

  /**
   * Dismiss the row confirmation without issuing a switch request.
   *
   * @param {string} provider_key
   * @param {number} account_number
   */
  function cancelSwitch(provider_key, account_number) {
    row_messages.delete(rowKey(provider_key, account_number));
    renderProviders();
  }

  /**
   * @param {string} provider_key
   * @returns {ProviderDescriptor}
   */
  function providerOf(provider_key) {
    return /** @type {ProviderDescriptor} */ (
      PROVIDERS.find((provider) => provider.key === provider_key)
    );
  }

  /**
   * The provider's current account rows, or none.
   *
   * @param {string} provider_key
   * @returns {UsageAccount[]}
   */
  function accountsOf(provider_key) {
    return provider_snapshots.get(provider_key)?.accounts ?? [];
  }

  /**
   * Drop the remove confirm lines of one provider.
   *
   * @param {string} provider_key
   */
  function clearRemoveConfirms(provider_key) {
    for (const [key, message] of row_messages) {
      if (
        message.kind === 'remove_confirm' &&
        key.startsWith(`${provider_key}:`)
      ) {
        row_messages.delete(key);
      }
    }
  }

  /**
   * Put a notice on the row of `account_number` when the list still has it,
   * else on the section.
   *
   * @param {string} provider_key
   * @param {number | null} account_number
   * @param {RowMessage} message
   */
  function setNotice(provider_key, account_number, message) {
    const has_row =
      account_number !== null &&
      accountsOf(provider_key).some(
        (account) => account.number === account_number
      );
    if (has_row) {
      row_messages.set(
        rowKey(provider_key, /** @type {number} */ (account_number)),
        message
      );
    } else {
      section_messages.set(provider_key, message);
    }
  }

  /**
   * Run the status poll exactly while a login panel with a session is shown:
   * the card is open on the panel's provider and the meter is alive. Every
   * render ends here, so closing the card, switching its provider or ending
   * the session stops the poll; reopening resumes it.
   */
  function syncLoginPoll() {
    const panel = openLoginPanel();
    const target =
      !destroyed && panel !== null && panel.login_id !== null
        ? `${panel.provider}:${panel.login_id}`
        : null;
    if (target === login_poll_target) {
      return;
    }
    if (login_poll_timer !== null) {
      clearInterval(login_poll_timer);
      login_poll_timer = null;
    }
    login_poll_target = target;
    if (target !== null) {
      login_poll_timer = setInterval(() => void pollLogin(), LOGIN_POLL_MS);
      void pollLogin();
    }
  }

  /**
   * Whether `panel` is still the open login panel of session `login_id`.
   *
   * @param {LoginPanel} panel
   * @param {string} login_id
   */
  function isCurrentPanel(panel, login_id) {
    return (
      !destroyed &&
      login_panels.get(panel.provider) === panel &&
      panel.login_id === login_id
    );
  }

  /**
   * The login panel of the provider the card shows, or null.
   *
   * @returns {LoginPanel | null}
   */
  function openLoginPanel() {
    return open_provider === null
      ? null
      : (login_panels.get(open_provider) ?? null);
  }

  /**
   * Adopt one status snapshot into the panel, or end the panel on a final
   * state.
   *
   * @param {LoginPanel} panel
   * @param {any} status
   */
  async function adoptLoginStatus(panel, status) {
    if (status.mode === 'relogin' || status.mode === 'add') {
      panel.mode = status.mode;
    }
    // The session names its account; a 409 jump from a row's [재로그인]
    // into a running add must not keep the clicked row's number.
    panel.number = Number.isInteger(status.number) ? status.number : null;
    if (typeof status.state === 'string') {
      panel.state = status.state;
    }
    panel.url = typeof status.url === 'string' ? status.url : null;
    panel.user_code =
      typeof status.user_code === 'string' ? status.user_code : null;
    panel.needs_code = status.needs_code === true;
    if (LOGIN_END_STATES.includes(panel.state)) {
      await finishLogin(panel, status);
      return;
    }
    renderProviders();
  }

  /** Read the followed session's status once. */
  async function pollLogin() {
    const panel = openLoginPanel();
    if (login_poll_busy || panel === null || panel.login_id === null) {
      return;
    }
    const login_id = panel.login_id;
    login_poll_busy = true;
    /** @type {any} */
    let body = null;
    try {
      const response = await fetch(
        `/api/account-login/${encodeURIComponent(login_id)}`
      );
      body = await response.json();
    } catch {
      body = null;
    } finally {
      login_poll_busy = false;
    }
    if (!isCurrentPanel(panel, login_id) || !body) {
      return;
    }
    if (body.ok === true) {
      await adoptLoginStatus(panel, body);
      return;
    }
    if (body.error === 'login_not_found') {
      await finishLogin(panel, { state: 'failed', error: 'login_not_found' });
    }
  }

  /**
   * Close the panel and leave the result where the account is: the row for a
   * relogin or a known number, else the section. A success re-reads usage
   * first so a new row exists and the name comes from the fresh list.
   * Idempotent: only the panel still open ends.
   *
   * @param {LoginPanel} panel
   * @param {any} status
   */
  async function finishLogin(panel, status) {
    if (login_panels.get(panel.provider) !== panel) {
      return;
    }
    login_panels.delete(panel.provider);
    const provider = providerOf(panel.provider);
    if (status.state === 'done') {
      renderProviders();
      await refresh();
      if (destroyed) {
        return;
      }
      const result = status.result ?? {};
      const number = Number.isInteger(result.number)
        ? result.number
        : panel.number;
      const fallback =
        typeof result.email === 'string' && result.email.length > 0
          ? result.email
          : typeof result.key === 'string'
            ? result.key
            : '';
      const name = accountDisplayName(
        accountsOf(provider.key),
        typeof result.key === 'string' ? result.key : null,
        fallback
      );
      setNotice(provider.key, number, loginEndMessage(provider, status, name));
      renderProviders();
      return;
    }
    setNotice(
      provider.key,
      panel.mode === 'relogin' ? panel.number : null,
      loginEndMessage(provider, status, '')
    );
    renderProviders();
  }

  /**
   * Start a login session: a relogin of one row or a new account. A session
   * already running for the provider (409 `login_in_flight`) opens that
   * session's panel instead; its first status names its mode and account.
   *
   * @param {ProviderDescriptor} provider
   * @param {'relogin' | 'add'} mode
   * @param {number | null} account_number
   */
  async function startLogin(provider, mode, account_number) {
    if (login_panels.has(provider.key)) {
      return;
    }
    /** @type {LoginPanel} */
    const panel = {
      provider: provider.key,
      mode,
      number: account_number,
      login_id: null,
      state: 'starting',
      url: null,
      user_code: null,
      needs_code: false,
      code: '',
      busy: true,
      copied: false,
      error_text: null
    };
    login_panels.set(provider.key, panel);
    section_messages.delete(provider.key);
    if (account_number !== null) {
      row_messages.delete(rowKey(provider.key, account_number));
    }
    renderProviders();

    const body = await postJson('/api/account-login', {
      provider: provider.key,
      mode,
      ...(account_number === null ? {} : { number: account_number })
    });
    if (destroyed || login_panels.get(provider.key) !== panel) {
      return;
    }
    panel.busy = false;
    const login_id =
      body && typeof body.login_id === 'string' && body.login_id.length > 0
        ? body.login_id
        : null;
    if (
      login_id !== null &&
      (body.ok === true || body.error === 'login_in_flight')
    ) {
      panel.login_id = login_id;
      renderProviders();
      return;
    }
    login_panels.delete(provider.key);
    setNotice(provider.key, mode === 'relogin' ? account_number : null, {
      kind: 'error',
      text: loginFailureText(provider, body)
    });
    renderProviders();
  }

  /**
   * Send the pasted Claude code of a panel once.
   *
   * @param {LoginPanel} panel
   */
  async function submitLoginCode(panel) {
    if (panel.login_id === null || panel.busy) {
      return;
    }
    const code = panel.code.trim();
    if (code.length === 0) {
      panel.error_text = '받은 코드를 붙여 넣으세요';
      renderProviders();
      return;
    }
    const login_id = panel.login_id;
    panel.busy = true;
    panel.error_text = null;
    renderProviders();
    const body = await postJson(
      `/api/account-login/${encodeURIComponent(login_id)}/code`,
      { code }
    );
    if (!isCurrentPanel(panel, login_id)) {
      return;
    }
    panel.busy = false;
    if (body && body.ok === true) {
      panel.state = 'verifying';
      panel.needs_code = false;
      panel.code = '';
    } else {
      const error = errorCodeOf(body);
      panel.error_text =
        error === null
          ? '코드를 보내지 못함'
          : (CODE_ERROR_TEXT[error] ?? `코드를 보내지 못함 — ${error}`);
    }
    renderProviders();
  }

  /**
   * Cancel a panel's session; the server's answer ends the panel.
   *
   * @param {LoginPanel} panel
   */
  async function cancelLogin(panel) {
    if (panel.login_id === null || panel.busy) {
      return;
    }
    const login_id = panel.login_id;
    panel.busy = true;
    panel.error_text = null;
    renderProviders();
    const body = await postJson(
      `/api/account-login/${encodeURIComponent(login_id)}/cancel`,
      {}
    );
    if (!isCurrentPanel(panel, login_id)) {
      return;
    }
    panel.busy = false;
    if (body && body.ok === true) {
      await finishLogin(panel, {
        state: typeof body.state === 'string' ? body.state : 'cancelled',
        error: body.error
      });
      return;
    }
    if (body && body.error === 'login_not_found') {
      await finishLogin(panel, { state: 'failed', error: 'login_not_found' });
      return;
    }
    panel.error_text =
      body && body.error === 'login_finishing'
        ? '마무리 중이라 취소할 수 없음 — 결과를 기다립니다'
        : '취소하지 못함';
    renderProviders();
  }

  /**
   * Copy the Codex device code; the label says whether it landed.
   *
   * @param {LoginPanel} panel
   */
  async function copyLoginCode(panel) {
    if (panel.user_code === null) {
      return;
    }
    const copied = await copyToClipboard(panel.user_code);
    if (destroyed || login_panels.get(panel.provider) !== panel) {
      return;
    }
    panel.copied = copied;
    renderProviders();
  }

  /**
   * Toggle [관리] of one provider. Turning it off drops its confirm lines.
   *
   * @param {string} provider_key
   */
  function toggleManage(provider_key) {
    if (manage_providers.has(provider_key)) {
      manage_providers.delete(provider_key);
      clearRemoveConfirms(provider_key);
    } else {
      manage_providers.add(provider_key);
    }
    renderProviders();
  }

  /**
   * Ask the server to remove one account. Without `confirm` the server never
   * deletes: it answers with a block, or the references the confirm line
   * shows (UI-xm29 §4.4-5). Only the confirm line's [삭제] sends `confirm`.
   *
   * @param {ProviderDescriptor} provider
   * @param {UsageAccount} account
   * @param {boolean} [confirm]
   */
  async function removeAccount(provider, account, confirm = false) {
    if (removing_providers.has(provider.key)) {
      return;
    }
    const row_key = rowKey(provider.key, account.number);
    const name = accountDisplayName(
      accountsOf(provider.key),
      account.key,
      account.email
    );
    removing_providers.add(provider.key);
    row_messages.delete(row_key);
    section_messages.delete(provider.key);
    renderProviders();

    const body = await postJson(provider.remove_endpoint, {
      number: account.number,
      key: account.key,
      ...(confirm ? { confirm: true } : {})
    });
    if (destroyed) {
      return;
    }
    removing_providers.delete(provider.key);

    if (body && body.ok === true) {
      section_messages.set(provider.key, {
        kind: 'ok',
        text: `삭제됨 — ${name}`
      });
      renderProviders();
      await refresh();
      return;
    }
    if (body && body.error === 'confirm_required') {
      row_messages.set(row_key, {
        kind: 'remove_confirm',
        text: removeConfirmText(body.refs, body.unchecked_repos)
      });
      renderProviders();
      return;
    }
    if (body && body.error === 'account_changed') {
      // The number may now name another account: say it on the section.
      section_messages.set(provider.key, {
        kind: 'error',
        text: removeRefusalText(body)
      });
      renderProviders();
      await refresh();
      return;
    }
    row_messages.set(row_key, { kind: 'error', text: removeRefusalText(body) });
    renderProviders();
  }

  /**
   * One usage window of the collapsed header meter.
   *
   * @param {UsageWindow} window
   * @param {boolean} stale
   * @param {string} stale_note
   * @param {number} now_ms
   */
  function renderHeaderWindow(window, stale, stale_note, now_ms) {
    const pct = clampPct(window.pct);
    // The header names the reset clock only; the countdown lives in the card,
    // so a poll that reads the same usage leaves the header untouched.
    const reset_time = formatResetClock(window.resetsAt, now_ms);
    const title = `resets ${reset_time}${stale ? ` · ${stale_note}` : ''}`;
    return html`<span
      class="usage-meter__window ${colorClass(pct)}"
      style=${`--progress: ${pct}%`}
      title=${title}
    >
      <span class="usage-meter__label">${window.key}</span>
      <span class="usage-meter__track" aria-hidden="true">
        <span class="usage-meter__fill"></span>
      </span>
      <span class="usage-meter__pct">${pct}%</span>
    </span>`;
  }

  /**
   * One provider group of the collapsed header meter. With accounts[] the
   * group is the toggle for that provider's card section; without it the
   * group stays a static span.
   *
   * @param {ProviderDescriptor} provider
   * @param {ProviderSnapshot} snapshot
   * @param {number} now_ms
   */
  function renderGroup(provider, snapshot, now_ms) {
    const { stale, stale_note } = staleOf(snapshot, now_ms);
    const inactive_count = snapshot.accounts.filter(
      (account) => !account.active
    ).length;
    const group_class = `usage-meter__group${
      stale ? ' usage-meter__group--stale' : ''
    }`;
    const content = html`<span class="usage-meter__provider"
        >${provider.label}</span
      >
      ${snapshot.available
        ? snapshot.windows.map((window) =>
            renderHeaderWindow(window, stale, stale_note, now_ms)
          )
        : html`<span class="usage-meter__empty">사용량 없음</span>`}
      ${inactive_count > 0
        ? html`<span class="usage-meter__badge">+${inactive_count}</span>`
        : ''}`;
    if (snapshot.accounts.length === 0) {
      return html`<span
        class=${group_class}
        aria-label=${`${provider.label} usage`}
        >${content}</span
      >`;
    }
    const is_open = open_provider === provider.key;
    return html`<button
      type="button"
      class=${`op-btn usage-meter__toggle ${group_class}`}
      aria-label=${`${provider.label} usage`}
      aria-expanded=${is_open ? 'true' : 'false'}
      aria-controls=${CARD_ID}
      @click=${() => onToggleClick(provider.key)}
    >
      ${content}
    </button>`;
  }

  /**
   * Every value the header draws from these entries, so an equal signature
   * means an equal header DOM.
   *
   * @param {{ provider: ProviderDescriptor, snapshot: ProviderSnapshot }[]} entries
   * @param {number} now_ms
   * @returns {string}
   */
  function headerSignature(entries, now_ms) {
    return JSON.stringify({
      open: open_provider,
      groups: entries.map(({ provider, snapshot }) => ({
        key: provider.key,
        available: snapshot.available,
        ...staleOf(snapshot, now_ms),
        inactive: snapshot.accounts.filter((account) => !account.active).length,
        toggle: snapshot.accounts.length > 0,
        windows: snapshot.windows.map((window) => [
          window.key,
          clampPct(window.pct),
          formatResetClock(window.resetsAt, now_ms)
        ])
      }))
    });
  }

  /**
   * @param {{ provider: ProviderDescriptor, snapshot: ProviderSnapshot }[]} entries
   * @param {number} now_ms
   */
  function renderMeter(entries, now_ms) {
    return html`<span class="usage-meter" aria-label="Usage">
      ${entries.map((entry) =>
        renderGroup(entry.provider, entry.snapshot, now_ms)
      )}
    </span>`;
  }

  /**
   * One usage window of a card row. The color modifier is shared with the
   * header because it only carries `--usage-meter-color`; the bar element
   * itself is a separate class so the 900px header rule cannot fold it. The
   * reset is spelled out here because the header only has room for it in a
   * tooltip, which touch devices cannot open.
   *
   * @param {UsageWindow} window
   * @param {number} now_ms
   */
  function renderAccountWindow(window, now_ms) {
    const pct = clampPct(window.pct);
    const reset_time = formatResetTime(window.resetsAt, now_ms);
    return html`<span
      class="usage-meter__account-window ${colorClass(pct)}"
      style=${`--progress: ${pct}%`}
    >
      <span class="usage-meter__account-key">${window.key}</span>
      <span class="usage-meter__account-track" aria-hidden="true">
        <span class="usage-meter__account-fill"></span>
      </span>
      <span class="usage-meter__account-pct">${pct}%</span>
      <span class="usage-meter__account-reset"
        >${reset_time.length > 0 ? `↻ ${reset_time}` : ''}</span
      >
    </span>`;
  }

  /**
   * The status line of a row without usage; an expired login says only
   * `토큰 만료` because the row carries its [재로그인] (UI-xm29 §4.5).
   *
   * @param {string} status
   */
  function statusText(status) {
    if (RELOGIN_STATUSES.includes(status)) {
      return '토큰 만료';
    }
    return '사용량 없음';
  }

  /**
   * @param {RowMessage['kind']} kind
   */
  function messageModifier(kind) {
    if (kind === 'confirm' || kind === 'remove_confirm') {
      return 'warn';
    }
    return kind;
  }

  /**
   * The row's [삭제] while [관리] is on, or the muted note on the active row.
   * Hidden while the row's remove confirm line is shown.
   *
   * @param {ProviderDescriptor} provider
   * @param {UsageAccount} account
   * @param {RowMessage | undefined} message
   */
  function removeControlTemplate(provider, account, message) {
    if (!manage_providers.has(provider.key)) {
      return '';
    }
    if (account.active) {
      return html`<span class="usage-meter__remove-note"
        >활성 계정은 지울 수 없음</span
      >`;
    }
    if (message?.kind === 'remove_confirm') {
      return '';
    }
    return html`<button
      type="button"
      class="op-btn op-btn--danger usage-meter__remove"
      ?disabled=${removing_providers.has(provider.key)}
      @click=${() => void removeAccount(provider, account)}
    >
      삭제
    </button>`;
  }

  /**
   * The buttons a row message carries: the switch confirm or the remove
   * confirm.
   *
   * @param {ProviderDescriptor} provider
   * @param {UsageAccount} account
   * @param {RowMessage} message
   * @param {boolean} provider_switching
   */
  function messageActionsTemplate(
    provider,
    account,
    message,
    provider_switching
  ) {
    if (message.kind === 'confirm') {
      return html`<button
          type="button"
          class="op-btn usage-meter__switch usage-meter__confirm"
          ?disabled=${provider_switching}
          @click=${() => void switchAccount(provider, account.number, true)}
        >
          그래도 전환
        </button>
        <button
          type="button"
          class="op-btn usage-meter__switch usage-meter__cancel"
          @click=${() => cancelSwitch(provider.key, account.number)}
        >
          취소
        </button>`;
    }
    if (message.kind === 'remove_confirm') {
      return html`<span class="usage-meter__message-ops">
        <button
          type="button"
          class="op-btn op-btn--danger usage-meter__remove-confirm"
          ?disabled=${removing_providers.has(provider.key)}
          @click=${() => void removeAccount(provider, account, true)}
        >
          삭제
        </button>
        <button
          type="button"
          class="op-btn usage-meter__remove-cancel"
          @click=${() => cancelSwitch(provider.key, account.number)}
        >
          취소
        </button>
      </span>`;
    }
    return '';
  }

  /**
   * One account row of the card.
   *
   * @param {ProviderDescriptor} provider
   * @param {UsageAccount} account
   * @param {UsageAccount[]} accounts - The provider's whole list, which decides
   * whether the name needs the plan or number to stay unambiguous.
   * @param {number} now_ms
   */
  function renderAccount(provider, account, accounts, now_ms) {
    const is_ok = account.status === 'ok';
    const stale =
      typeof account.ageSeconds === 'number' &&
      account.ageSeconds > STALE_AGE_SECONDS;
    const message = row_messages.get(rowKey(provider.key, account.number));
    const switching_number = switching_rows.get(provider.key);
    const provider_switching = switching_number !== undefined;
    const row_switching = switching_number === account.number;
    const needs_relogin = RELOGIN_STATUSES.includes(account.status);
    /** @type {string[]} */
    const classes = ['usage-meter__account'];
    if (account.active) {
      classes.push('usage-meter__account--active');
    }
    if (!is_ok) {
      classes.push('usage-meter__account--unavailable');
    }
    if (stale) {
      classes.push('usage-meter__account--stale');
    }

    const name = accountDisplayName(accounts, account.key, account.email);
    return html`<div class=${classes.join(' ')}>
      <div class="usage-meter__account-head">
        ${defaultStarTemplate(provider, account, name)}
        <span class="usage-meter__account-label" title=${account.email}
          >${name}</span
        >
        ${account.plan === null
          ? ''
          : html`<span class="usage-meter__account-tag">${account.plan}</span>`}
        ${account.active
          ? html`<span
              class="usage-meter__account-tag usage-meter__account-tag--active"
              >active</span
            >`
          : ''}
        ${account.ageSeconds === null
          ? ''
          : html`<span class="usage-meter__account-age"
              >${formatAge(account.ageSeconds)}</span
            >`}
        ${account.active || message?.kind === 'confirm'
          ? ''
          : html`<button
              type="button"
              class="op-btn usage-meter__switch"
              ?disabled=${provider_switching}
              @click=${() => void switchAccount(provider, account.number)}
            >
              ${row_switching ? '전환 중…' : '전환'}
            </button>`}
      </div>
      ${manage_providers.has(provider.key)
        ? html`<div class="usage-meter__account-ops">
            ${removeControlTemplate(provider, account, message)}
          </div>`
        : ''}
      ${is_ok
        ? html`<div class="usage-meter__account-windows">
            ${account.windows.map((window) =>
              renderAccountWindow(window, now_ms)
            )}
          </div>`
        : html`<div class="usage-meter__account-state">
            <span class="usage-meter__account-status"
              >${statusText(account.status)}</span
            >
            ${needs_relogin
              ? html`<button
                  type="button"
                  class="op-btn op-btn--primary usage-meter__relogin"
                  ?disabled=${login_panels.has(provider.key)}
                  @click=${() =>
                    void startLogin(provider, 'relogin', account.number)}
                >
                  재로그인
                </button>`
              : ''}
          </div>`}
      ${message === undefined
        ? ''
        : html`<div
            class="usage-meter__account-message usage-meter__account-message--${messageModifier(
              message.kind
            )}"
          >
            <span class="usage-meter__message-text">${message.text}</span>
            ${messageActionsTemplate(
              provider,
              account,
              message,
              provider_switching
            )}
          </div>`}
    </div>`;
  }

  /**
   * The open login panel of this provider (UI-xm29 §4.5), or nothing.
   *
   * @param {ProviderDescriptor} provider
   * @param {UsageAccount[]} accounts
   */
  function loginPanelTemplate(provider, accounts) {
    const panel = login_panels.get(provider.key);
    if (panel === undefined) {
      return '';
    }
    const target_row =
      panel.mode === 'relogin'
        ? accounts.find((account) => account.number === panel.number)
        : undefined;
    const title =
      panel.mode === 'add'
        ? `${provider.label} 계정 추가`
        : `재로그인 — ${
            target_row === undefined
              ? panel.number === null
                ? provider.label
                : `#${panel.number}`
              : accountDisplayName(accounts, target_row.key, target_row.email)
          }`;
    const awaiting = panel.state === 'awaiting_user' && panel.url !== null;
    const link = awaiting
      ? html`<a
          class="op-btn op-btn--primary usage-meter__login-link"
          href=${/** @type {string} */ (panel.url)}
          target="_blank"
          rel="noopener"
          title=${/** @type {string} */ (panel.url)}
          >로그인 링크 열기 ↗</a
        >`
      : '';
    /** @type {unknown} */
    let body = html`<p class="usage-meter__login-wait">
      ${panel.state === 'verifying' ? '확인하는 중…' : '로그인 준비 중…'}
    </p>`;
    if (awaiting && provider.key === 'codex') {
      body = html`<p class="usage-meter__login-hint">
          이 링크를 열어 로그인하고 코드를 입력하세요
        </p>
        <div class="usage-meter__login-row">${link}</div>
        ${panel.user_code === null
          ? ''
          : html`<div class="usage-meter__login-row">
              <code class="usage-meter__login-code">${panel.user_code}</code>
              <button
                type="button"
                class="op-btn usage-meter__login-copy"
                @click=${() => void copyLoginCode(panel)}
              >
                ${panel.copied ? '복사됨' : '복사'}
              </button>
            </div>`}
        <p class="usage-meter__login-wait">기다리는 중…</p>`;
    } else if (awaiting && panel.needs_code) {
      body = html`<p class="usage-meter__login-hint">
          이 링크를 열어 로그인한 뒤 받은 코드를 붙여 넣으세요
        </p>
        <div class="usage-meter__login-row">${link}</div>
        <div class="usage-meter__login-row">
          <input
            type="text"
            class="ui-input usage-meter__login-input"
            aria-label="받은 코드"
            autocomplete="off"
            spellcheck="false"
            .value=${live(panel.code)}
            ?disabled=${panel.busy}
            @input=${(/** @type {Event} */ ev) => {
              panel.code = /** @type {HTMLInputElement} */ (ev.target).value;
            }}
            @keydown=${(/** @type {KeyboardEvent} */ ev) => {
              if (ev.key === 'Enter') {
                ev.preventDefault();
                void submitLoginCode(panel);
              }
            }}
          />
          <button
            type="button"
            class="op-btn op-btn--primary usage-meter__login-submit"
            ?disabled=${panel.busy}
            @click=${() => void submitLoginCode(panel)}
          >
            확인
          </button>
        </div>`;
    } else if (awaiting) {
      body = html`<div class="usage-meter__login-row">${link}</div>
        <p class="usage-meter__login-wait">확인하는 중…</p>`;
    }
    return html`<div
      class="usage-meter__login"
      data-login-provider=${provider.key}
      data-login-state=${panel.state}
    >
      <p class="usage-meter__login-title">${title}</p>
      ${body}
      ${panel.error_text === null
        ? ''
        : html`<div
            class="usage-meter__account-message usage-meter__account-message--error"
          >
            ${panel.error_text}
          </div>`}
      <div class="usage-meter__login-row">
        <button
          type="button"
          class="op-btn usage-meter__login-cancel"
          ?disabled=${panel.login_id === null || panel.busy}
          @click=${() => void cancelLogin(panel)}
        >
          취소
        </button>
      </div>
    </div>`;
  }

  /**
   * @param {ProviderDescriptor} provider
   * @param {ProviderSnapshot} snapshot
   * @param {number} now_ms
   */
  function renderSection(provider, snapshot, now_ms) {
    const active_count = snapshot.accounts.filter(
      (account) => account.active
    ).length;
    const managing = manage_providers.has(provider.key);
    const section_message = section_messages.get(provider.key);
    return html`<section class="usage-meter__section">
      <div class="usage-meter__section-head">
        <h2 class="usage-meter__section-title">
          ${provider.label} · 활성 ${active_count} / 전체
          ${snapshot.accounts.length}
        </h2>
        <div class="usage-meter__section-ops">
          <button
            type="button"
            class="op-btn usage-meter__add"
            ?disabled=${login_panels.has(provider.key)}
            @click=${() => void startLogin(provider, 'add', null)}
          >
            + 계정 추가
          </button>
          <button
            type="button"
            class=${`op-btn usage-meter__manage${managing ? ' is-active' : ''}`}
            aria-pressed=${String(managing)}
            @click=${() => toggleManage(provider.key)}
          >
            관리
          </button>
        </div>
      </div>
      ${policyLineTemplate(provider, snapshot.accounts)}
      ${loginPanelTemplate(provider, snapshot.accounts)}
      ${section_message === undefined
        ? ''
        : html`<p
            class="usage-meter__account-message usage-meter__account-message--${messageModifier(
              section_message.kind
            )} usage-meter__section-message"
          >
            ${section_message.text}
          </p>`}
      ${snapshot.accounts.map((account) =>
        renderAccount(provider, account, snapshot.accounts, now_ms)
      )}
    </section>`;
  }

  /**
   * The card of the open provider only.
   *
   * @param {{ provider: ProviderDescriptor, snapshot: ProviderSnapshot }} entry
   * @param {number} now_ms
   */
  function renderCard(entry, now_ms) {
    return html`<div
      class="usage-meter__card"
      id=${CARD_ID}
      role="dialog"
      aria-label=${`${entry.provider.label} 계정 사용량`}
    >
      ${renderSection(entry.provider, entry.snapshot, now_ms)}
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`;
  }

  /**
   * Render every currently available provider, then start or stop the login
   * status poll to match what is shown.
   */
  function renderProviders() {
    drawProviders();
    syncLoginPoll();
  }

  /** Draw every currently available provider. */
  function drawProviders() {
    const now_ms = Date.now();
    /** @type {{ provider: ProviderDescriptor, snapshot: ProviderSnapshot }[]} */
    const entries = [];
    for (const provider of PROVIDERS) {
      const snapshot = provider_snapshots.get(provider.key);
      if (snapshot) {
        entries.push({ provider, snapshot: displaySnapshot(snapshot, now_ms) });
      }
    }
    if (entries.length === 0) {
      closeCard();
      hide();
      return;
    }

    // The open provider must still have accounts to show; a poll that drops
    // them closes the card instead of rendering an empty section.
    const open_entry = entries.find(
      (entry) =>
        entry.provider.key === open_provider &&
        entry.snapshot.accounts.length > 0
    );
    if (!open_entry) {
      closeCard();
    }

    // Draw the header only when what it shows changed (UI-yu2o): an idle page
    // whose polls read the same usage renders nothing.
    const signature = headerSignature(entries, now_ms);
    if (signature !== drawn) {
      drawn = signature;
      render(renderMeter(entries, now_ms), mount_element);
    }
    mount_element.hidden = false;
    if (open_entry) {
      renderLayer(open_entry, now_ms);
    } else {
      removeLayer();
    }
  }

  /**
   * Render the scrim and card into the body-level layer. The desktop popover
   * is `position: fixed` there, so it takes the mount's viewport rect as its
   * anchor; the mobile sheet ignores the anchor and docks to the bottom.
   *
   * @param {{ provider: ProviderDescriptor, snapshot: ProviderSnapshot }} entry
   * @param {number} now_ms
   */
  function renderLayer(entry, now_ms) {
    const layer = ensureLayer();
    const rect = mount_element.getBoundingClientRect();
    const viewport_width =
      mount_element.ownerDocument.documentElement.clientWidth;
    layer.style.setProperty('--usage-meter-anchor-top', `${rect.bottom}px`);
    layer.style.setProperty(
      '--usage-meter-anchor-right',
      `${Math.max(0, viewport_width - rect.right)}px`
    );
    render(
      html`<div
          class="usage-meter__scrim"
          aria-hidden="true"
          @mousedown=${onScrimMousedown}
        ></div>
        ${renderCard(entry, now_ms)}`,
      layer
    );
  }

  /**
   * Fetch one provider, separating a failed lookup from an empty one.
   *
   * @param {ProviderDescriptor} provider
   * @returns {Promise<ProviderRead>}
   */
  async function fetchProvider(provider) {
    try {
      const response = await fetch(provider.endpoint);
      if (!response.ok) {
        return { kind: 'error' };
      }
      return readPayload(await response.json(), Date.now());
    } catch {
      return { kind: 'error' };
    }
  }

  /**
   * Refresh every provider independently, then render one coherent tick. A
   * failed lookup holds the provider's last good snapshot instead of dropping
   * it: the usage tools fail for seconds at a time (a lock wait, a token
   * refresh, a slow window fetch), and dropping the snapshot made the whole
   * group vanish from the header for a poll interval or more.
   */
  async function refresh() {
    refresh_generation += 1;
    const generation = refresh_generation;
    const results = await Promise.all(
      PROVIDERS.map(async (provider) => ({
        provider,
        read: await fetchProvider(provider)
      }))
    );
    if (destroyed || generation !== refresh_generation) {
      return;
    }
    for (const result of results) {
      const provider_key = result.provider.key;
      if (result.read.kind === 'ok') {
        provider_snapshots.set(provider_key, result.read.snapshot);
        continue;
      }
      if (result.read.kind === 'empty') {
        provider_snapshots.delete(provider_key);
        continue;
      }
      const previous = provider_snapshots.get(provider_key);
      if (previous !== undefined && !previous.held) {
        provider_snapshots.set(provider_key, { ...previous, held: true });
      }
    }
    renderProviders();
  }

  /**
   * A poll tick (UI-yu2o): read now while the page shows, else remember that a
   * poll came due so the page reads once when it shows again.
   */
  function onTick() {
    if (pageShown()) {
      void refresh();
    } else {
      missed_poll = true;
    }
  }

  /** The page shows again: run the poll that came due while it was hidden. */
  function onVisibilityChange() {
    if (pageShown() && missed_poll) {
      missed_poll = false;
      void refresh();
    }
  }

  hide();
  if (options.limitPolicy) {
    bindLimitPolicy(options.limitPolicy);
  }
  onTick();
  interval_id = setInterval(onTick, POLL_MS);
  doc.addEventListener('visibilitychange', onVisibilityChange);

  return {
    bindLimitPolicy,
    /** Stop polling, release the document listeners and clear the mount. */
    destroy() {
      destroyed = true;
      if (interval_id !== null) {
        clearInterval(interval_id);
        interval_id = null;
      }
      doc.removeEventListener('visibilitychange', onVisibilityChange);
      unsubscribe_limit_policy?.();
      unsubscribe_limit_policy = null;
      closeCard();
      hide();
      syncLoginPoll();
    }
  };
}
