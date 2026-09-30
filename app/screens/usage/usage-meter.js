/**
 * The header usage meter (UI-dbn6 §3.6): per provider one small group — the
 * provider name (from 720px; below it the one-letter `mark`, so two equal
 * percentages still say whose they are), one small bar per usage window and the highest
 * window's percentage — and, where the provider reports managed accounts, the
 * group is the toggle of that provider's account card: every account with its
 * window meters and resets, and `전환` (`POST /api/<provider>-account/switch`).
 * The card is a popover under the meter from 720px and a bottom sheet below.
 *
 * Polling (`GET /api/claude-usage`·`/api/codex-usage`, every 60s) runs only
 * while the page is shown; a poll missed while hidden runs when the page shows
 * again. The meter draws through `ui/render.js` and only when what it shows
 * changed, so an idle page with steady usage renders nothing. The payload
 * reading is `model/usage-snapshot.js`.
 *
 * @import { ProviderDescriptor, ProviderSnapshot, UsageAccount, UsageWindow } from '../../model/usage-snapshot.js'
 * @typedef {{ kind: 'warn' | 'error', text: string }} RowMessage
 * @typedef {{ provider: ProviderDescriptor, snapshot: ProviderSnapshot }} ProviderEntry
 */
import { html } from 'lit-html';
import {
  PROVIDERS,
  RELOGIN_STATUSES,
  STALE_AGE_SECONDS,
  clampPct,
  displaySnapshot,
  effectiveAgeSeconds,
  formatAge,
  formatResetClock,
  formatResetTime,
  readPayload,
  toneOf
} from '../../model/usage-snapshot.js';
import { render } from '../../ui/render.js';

export { formatAge, formatResetTime };

const CARD_ID = 'usage-meter-card';
// Body-level host of the open card and its scrim: a header with a
// `backdrop-filter` becomes the containing block of every `position: fixed`
// descendant, so the card must not live inside the mount.
const LAYER_ID = 'usage-meter-layer';
const POLL_MS = 60_000;

/**
 * Row-message key: the tool number is unique per provider, the email is not.
 *
 * @param {string} provider_key
 * @param {number} account_number
 * @returns {string}
 */
function rowKey(provider_key, account_number) {
  return `${provider_key}:${account_number}`;
}

/**
 * The header view of one provider: everything the group draws, so an equal
 * view means an equal DOM.
 *
 * @param {ProviderEntry} entry
 * @param {number} now_ms
 */
function groupView(entry, now_ms) {
  const { snapshot } = entry;
  const age_seconds = effectiveAgeSeconds(snapshot, now_ms);
  // A held snapshot is stale from the first failed poll, however young its
  // measurement was: the number stopped tracking the provider.
  const stale =
    snapshot.available && (snapshot.held || age_seconds > STALE_AGE_SECONDS);
  return {
    key: entry.provider.key,
    label: entry.provider.label,
    mark: entry.provider.mark,
    available: snapshot.available,
    stale,
    stale_note: stale ? `${Math.floor(age_seconds / 60)}분 전 측정` : '',
    windows: snapshot.windows.map((window) => ({
      key: window.key,
      pct: clampPct(window.pct),
      clock: formatResetClock(window.resetsAt, now_ms)
    })),
    inactive: snapshot.accounts.filter((account) => !account.active).length,
    toggle: snapshot.accounts.length > 0
  };
}

/**
 * Render and poll independent provider usage snapshots.
 *
 * @param {HTMLElement} mount_element
 */
export function createUsageMeter(mount_element) {
  const doc = mount_element.ownerDocument;
  const view_window = doc.defaultView || globalThis;
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
  /** @type {HTMLElement | null} */
  let layer_element = null;
  /** What the header last drew; `null` while hidden. */
  /** @type {string | null} */
  let drawn = null;
  /** A poll came due while the page was hidden. */
  let missed_poll = false;

  /** @returns {boolean} */
  function pageShown() {
    return doc.visibilityState !== 'hidden';
  }

  /** Hide the fail-quiet mount and discard its previous snapshot. */
  function hide() {
    if (drawn !== null || !mount_element.hidden) {
      render(html``, mount_element);
    }
    drawn = null;
    mount_element.hidden = true;
    removeLayer();
  }

  /** @returns {HTMLElement} The body-level layer, created on first use. */
  function ensureLayer() {
    if (layer_element === null) {
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
   * Open the card on one provider, attaching the listeners that close it.
   * Switching from another provider keeps the listeners.
   *
   * @param {string} provider_key
   */
  function openCard(provider_key) {
    if (open_provider === provider_key) {
      return;
    }
    if (open_provider === null) {
      doc.addEventListener('mousedown', onDocMousedown);
      doc.addEventListener('keydown', onDocKeydown);
      view_window.addEventListener('resize', onWindowResize);
    }
    open_provider = provider_key;
  }

  /** Detach the card's listeners. Callers re-render. */
  function closeCard() {
    if (open_provider === null) {
      return;
    }
    open_provider = null;
    doc.removeEventListener('mousedown', onDocMousedown);
    doc.removeEventListener('keydown', onDocKeydown);
    view_window.removeEventListener('resize', onWindowResize);
  }

  /**
   * Close on an outside mousedown. Anything inside the mount (the meter) or
   * the layer (the card, its buttons) keeps the card open; the scrim closes
   * it explicitly.
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

  /** The desktop popover anchors to the meter; re-anchor on resize. */
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
   * Toggle the card from one provider's group: the same provider closes it,
   * another provider switches the section without closing.
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
   * One provider group of the header meter. With accounts[] the group is the
   * toggle of that provider's card section; without it a static span.
   *
   * @param {ReturnType<typeof groupView>} view
   */
  function groupTemplate(view) {
    const max = view.windows.reduce(
      (top, window) => Math.max(top, window.pct),
      0
    );
    const summary = view.windows
      .map((window) => `${window.key} ${window.pct}%`)
      .join(' · ');
    const group_class = `usage-meter__group${
      view.stale ? ' usage-meter__group--stale' : ''
    }`;
    const content = html`<span class="usage-meter__provider">${view.label}</span
      ><span class="usage-meter__mark" aria-hidden="true" title=${view.label}
        >${view.mark}</span
      >
      ${view.available && view.windows.length > 0
        ? html`<span class="usage-meter__bars" aria-hidden="true"
              >${view.windows.map(
                (window) =>
                  html`<span
                    class="usage-meter__window usage-meter__window--${toneOf(
                      window.pct
                    )}"
                    data-key=${window.key}
                    style=${`--progress: ${window.pct}%`}
                    title=${`${window.key} ${window.pct}%${
                      window.clock ? ` · 리셋 ${window.clock}` : ''
                    }${view.stale ? ` · ${view.stale_note}` : ''}`}
                    ><span class="usage-meter__fill"></span
                  ></span>`
              )}</span
            ><span class="usage-meter__pct usage-meter__pct--${toneOf(max)}"
              >${max}%</span
            >`
        : html`<span class="usage-meter__empty">사용량 없음</span>`}
      ${view.inactive > 0
        ? html`<span class="usage-meter__badge">+${view.inactive}</span>`
        : ''}`;
    const title = `${view.label}${summary ? ` · ${summary}` : ''}${
      view.stale ? ` · ${view.stale_note}` : ''
    }`;
    if (!view.toggle) {
      return html`<span
        class=${group_class}
        aria-label=${`${view.label} usage`}
        title=${title}
        >${content}</span
      >`;
    }
    const is_open = open_provider === view.key;
    return html`<button
      type="button"
      class=${`usage-meter__toggle ${group_class}`}
      aria-label=${`${view.label} usage`}
      aria-expanded=${is_open ? 'true' : 'false'}
      aria-controls=${CARD_ID}
      title=${title}
      @click=${() => onToggleClick(view.key)}
    >
      ${content}
    </button>`;
  }

  /**
   * One usage window of a card row: key, bar, percentage and the reset
   * spelled out (touch devices cannot open the header's tooltip).
   *
   * @param {UsageWindow} window
   * @param {number} now_ms
   */
  function accountWindowTemplate(window, now_ms) {
    const pct = clampPct(window.pct);
    const reset_time = formatResetTime(window.resetsAt, now_ms);
    return html`<span
      class="usage-meter__account-window usage-meter__window--${toneOf(pct)}"
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
   * @returns {string}
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
  function accountTemplate(provider, account, now_ms) {
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
          : html`<span class="ui-chip usage-meter__account-tag"
              >${account.plan}</span
            >`}
        ${account.active
          ? html`<span
              class="ui-chip usage-meter__account-tag usage-meter__account-tag--active"
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
              class="ui-btn ui-btn--sm usage-meter__switch"
              ?disabled=${provider_switching}
              @click=${() => void switchAccount(provider, account.number)}
            >
              ${row_switching ? '전환 중…' : '전환'}
            </button>`}
      </div>
      ${is_ok
        ? html`<div class="usage-meter__account-windows">
            ${account.windows.map((window) =>
              accountWindowTemplate(window, now_ms)
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
   * The card of the open provider only.
   *
   * @param {ProviderEntry} entry
   * @param {number} now_ms
   */
  function cardTemplate(entry, now_ms) {
    const { provider, snapshot } = entry;
    const active_count = snapshot.accounts.filter(
      (account) => account.active
    ).length;
    return html`<div
      class="ui-popover usage-meter__card"
      id=${CARD_ID}
      role="dialog"
      aria-label=${`${provider.label} 계정 사용량`}
    >
      <section class="usage-meter__section">
        <header class="usage-meter__section-head">
          <h2 class="usage-meter__section-title">
            ${provider.label} · 활성 ${active_count} / 전체
            ${snapshot.accounts.length}
          </h2>
          <button
            type="button"
            class="ui-btn ui-btn--icon ui-btn--sm usage-meter__close"
            aria-label="닫기"
            @click=${() => {
              closeCard();
              renderProviders();
            }}
          >
            ✕
          </button>
        </header>
        ${snapshot.accounts.map((account) =>
          accountTemplate(provider, account, now_ms)
        )}
      </section>
      <p class="usage-meter__note">전환은 새로 시작하는 세션부터 적용됩니다.</p>
    </div>`;
  }

  /** Render every currently available provider. */
  function renderProviders() {
    if (destroyed) {
      return;
    }
    const now_ms = Date.now();
    /** @type {ProviderEntry[]} */
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

    const views = entries.map((entry) => groupView(entry, now_ms));
    const signature = JSON.stringify({ views, open: open_provider });
    if (signature !== drawn) {
      drawn = signature;
      render(
        html`<span class="usage-meter" aria-label="Usage"
          >${views.map((view) => groupTemplate(view))}</span
        >`,
        mount_element
      );
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
   * @param {ProviderEntry} entry
   * @param {number} now_ms
   */
  function renderLayer(entry, now_ms) {
    const layer = ensureLayer();
    const rect = mount_element.getBoundingClientRect();
    const viewport_width = doc.documentElement.clientWidth;
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
        ${cardTemplate(entry, now_ms)}`,
      layer
    );
  }

  /**
   * Fetch one provider, separating a failed lookup from an empty one.
   *
   * @param {ProviderDescriptor} provider
   */
  async function fetchProvider(provider) {
    try {
      const response = await fetch(provider.endpoint);
      if (!response.ok) {
        return /** @type {const} */ ({ kind: 'error' });
      }
      return readPayload(await response.json(), Date.now());
    } catch {
      return /** @type {const} */ ({ kind: 'error' });
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

  /** A poll tick: read now while the page shows, else remember it. */
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

  mount_element.hidden = true;
  void refresh();
  interval_id = setInterval(onTick, POLL_MS);
  doc.addEventListener('visibilitychange', onVisibilityChange);

  return {
    /** Stop polling, release the listeners and clear the mount. */
    destroy() {
      destroyed = true;
      if (interval_id !== null) {
        clearInterval(interval_id);
        interval_id = null;
      }
      doc.removeEventListener('visibilitychange', onVisibilityChange);
      closeCard();
      hide();
    }
  };
}
