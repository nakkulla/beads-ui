import { html, render } from 'lit-html';

/**
 * @typedef {{ key: string, pct: number, resetsAt: string }} UsageWindow
 * @typedef {{ number: number, email: string, alias: string | null, plan: string | null, active: boolean, status: string, windows: UsageWindow[], fetchedAt: string | null, ageSeconds: number | null }} UsageAccount
 * @typedef {{ available: boolean, windows: UsageWindow[], ageSeconds: number | null, accounts: UsageAccount[] }} ProviderSnapshot
 * @typedef {{ key: string, label: string, endpoint: string, switch_endpoint: string, tool: string }} ProviderDescriptor
 * @typedef {{ kind: 'warn' | 'error', text: string }} RowMessage
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
const STALE_AGE_SECONDS = 600;
const RELOGIN_STATUSES = ['token_expired', 'relogin_required'];

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
  const reset = new Date(reset_ms);
  const now = new Date(now_ms);
  const clock = `${pad(reset.getHours())}:${pad(reset.getMinutes())}`;
  const same_day =
    reset.getFullYear() === now.getFullYear() &&
    reset.getMonth() === now.getMonth() &&
    reset.getDate() === now.getDate();
  const local_time = same_day
    ? clock
    : `${MONTH_NAMES[reset.getMonth()]} ${reset.getDate()} ${clock}`;
  return `${formatCountdown(reset_ms, now_ms)} · ${local_time}`;
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
    tool: 'cswap'
  },
  {
    key: 'codex',
    label: 'Codex',
    endpoint: '/api/codex-usage',
    switch_endpoint: '/api/codex-account/switch',
    tool: 'codex-auth'
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
 * @returns {ProviderSnapshot | null}
 */
function normalizeSnapshot(input) {
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
    accounts
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
 * @param {HTMLElement} mount_element
 */
export function createUsageMeter(mount_element) {
  let destroyed = false;
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
  // A poll started before an account switch can settle after the post-switch
  // refresh; only the newest refresh may write the snapshots.
  let refresh_generation = 0;

  /** Hide the fail-quiet mount and discard its previous snapshot. */
  function hide() {
    render(html``, mount_element);
    mount_element.hidden = true;
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
    }
    open_provider = provider_key;
  }

  /** Detach the document listeners. Callers re-render. */
  function closeCard() {
    if (open_provider === null) {
      return;
    }
    open_provider = null;
    document.removeEventListener('mousedown', onDocMousedown);
    document.removeEventListener('keydown', onDocKeydown);
  }

  /**
   * Close on an outside mousedown. Anything inside the mount (the meter, the
   * card, its buttons) keeps the card open; the scrim closes it explicitly.
   *
   * @param {MouseEvent} ev
   */
  function onDocMousedown(ev) {
    const target = /** @type {Node | null} */ (ev.target);
    if (target && mount_element.contains(target)) {
      return;
    }
    closeCard();
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
   */
  async function switchAccount(provider, account_number) {
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
        body: JSON.stringify({ number: account_number })
      });
      body = await response.json();
    } catch {
      body = null;
    }
    if (destroyed) {
      return;
    }
    switching_rows.delete(provider.key);

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
    const reset_time = formatResetTime(window.resetsAt, now_ms);
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
    const stale =
      snapshot.available &&
      typeof snapshot.ageSeconds === 'number' &&
      snapshot.ageSeconds > STALE_AGE_SECONDS;
    const stale_note =
      stale && typeof snapshot.ageSeconds === 'number'
        ? `${Math.floor(snapshot.ageSeconds / 60)}분 전 측정`
        : '';
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
      class=${`usage-meter__toggle ${group_class}`}
      aria-label=${`${provider.label} usage`}
      aria-expanded=${is_open ? 'true' : 'false'}
      aria-controls=${CARD_ID}
      @click=${() => onToggleClick(provider.key)}
    >
      ${content}
    </button>`;
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
   * @param {ProviderDescriptor} provider
   * @param {string} status
   */
  function statusText(provider, status) {
    if (RELOGIN_STATUSES.includes(status)) {
      return `토큰 만료 — ${provider.tool} 재로그인 필요`;
    }
    return '사용량 없음';
  }

  /**
   * One account row of the card.
   *
   * @param {ProviderDescriptor} provider
   * @param {UsageAccount} account
   * @param {number} now_ms
   */
  function renderAccount(provider, account, now_ms) {
    const is_ok = account.status === 'ok';
    const stale =
      typeof account.ageSeconds === 'number' &&
      account.ageSeconds > STALE_AGE_SECONDS;
    const message = row_messages.get(rowKey(provider.key, account.number));
    const switching_number = switching_rows.get(provider.key);
    const provider_switching = switching_number !== undefined;
    const row_switching = switching_number === account.number;
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

    return html`<div class=${classes.join(' ')}>
      <div class="usage-meter__account-head">
        <span class="usage-meter__account-label" title=${account.email}
          >${account.alias === null ? account.email : account.alias}</span
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
        ${account.active
          ? ''
          : html`<button
              type="button"
              class="usage-meter__switch"
              ?disabled=${provider_switching}
              @click=${() => void switchAccount(provider, account.number)}
            >
              ${row_switching ? '전환 중…' : '전환'}
            </button>`}
      </div>
      ${is_ok
        ? html`<div class="usage-meter__account-windows">
            ${account.windows.map((window) =>
              renderAccountWindow(window, now_ms)
            )}
          </div>`
        : html`<div class="usage-meter__account-status">
            ${statusText(provider, account.status)}
          </div>`}
      ${message === undefined
        ? ''
        : html`<div
            class="usage-meter__account-message usage-meter__account-message--${message.kind}"
          >
            ${message.text}
          </div>`}
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
    return html`<section class="usage-meter__section">
      <h2 class="usage-meter__section-title">
        ${provider.label} · 활성 ${active_count} / 전체
        ${snapshot.accounts.length}
      </h2>
      ${snapshot.accounts.map((account) =>
        renderAccount(provider, account, now_ms)
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

  /** Render every currently available provider. */
  function renderProviders() {
    /** @type {{ provider: ProviderDescriptor, snapshot: ProviderSnapshot }[]} */
    const entries = [];
    for (const provider of PROVIDERS) {
      const snapshot = provider_snapshots.get(provider.key);
      if (snapshot) {
        entries.push({ provider, snapshot });
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

    const now_ms = Date.now();
    render(
      html`${renderMeter(entries, now_ms)}
      ${open_entry
        ? html`<div
              class="usage-meter__scrim"
              aria-hidden="true"
              @mousedown=${onScrimMousedown}
            ></div>
            ${renderCard(open_entry, now_ms)}`
        : ''}`,
      mount_element
    );
    mount_element.hidden = false;
  }

  /**
   * Fetch one provider and collapse its failure to unavailable.
   *
   * @param {ProviderDescriptor} provider
   * @returns {Promise<ProviderSnapshot | null>}
   */
  async function fetchProvider(provider) {
    try {
      const response = await fetch(provider.endpoint);
      if (!response.ok) {
        return null;
      }
      return normalizeSnapshot(await response.json());
    } catch {
      return null;
    }
  }

  /** Refresh every provider independently, then render one coherent tick. */
  async function refresh() {
    refresh_generation += 1;
    const generation = refresh_generation;
    const results = await Promise.all(
      PROVIDERS.map(async (provider) => ({
        provider,
        snapshot: await fetchProvider(provider)
      }))
    );
    if (destroyed || generation !== refresh_generation) {
      return;
    }
    for (const result of results) {
      if (result.snapshot) {
        provider_snapshots.set(result.provider.key, result.snapshot);
      } else {
        provider_snapshots.delete(result.provider.key);
      }
    }
    renderProviders();
  }

  hide();
  void refresh();
  interval_id = setInterval(() => {
    void refresh();
  }, 60_000);

  return {
    /** Stop polling, release the document listeners and clear the mount. */
    destroy() {
      destroyed = true;
      if (interval_id !== null) {
        clearInterval(interval_id);
        interval_id = null;
      }
      closeCard();
      hide();
    }
  };
}
