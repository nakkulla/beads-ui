import { html, render } from 'lit-html';

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

const PROVIDERS = [
  { key: 'claude', label: 'Claude', endpoint: '/api/claude-usage' },
  { key: 'codex', label: 'Codex', endpoint: '/api/codex-usage' }
];

/**
 * Render and poll independent provider usage snapshots.
 *
 * @param {HTMLElement} mount_element
 */
export function createUsageMeter(mount_element) {
  let destroyed = false;
  /** @type {ReturnType<typeof setInterval> | null} */
  let interval_id = null;
  /** @type {Map<string, any>} */
  const provider_payloads = new Map();

  /** Hide the fail-quiet mount and discard its previous snapshot. */
  function hide() {
    render(html``, mount_element);
    mount_element.hidden = true;
  }

  /** Render every currently available provider. */
  function renderProviders() {
    const available_providers = PROVIDERS.filter((provider) =>
      provider_payloads.has(provider.key)
    );
    if (available_providers.length === 0) {
      hide();
      return;
    }

    const now_ms = Date.now();
    render(
      html`<div class="usage-meter" aria-label="Usage">
        ${available_providers.map((provider) => {
          const payload = provider_payloads.get(provider.key);
          const stale =
            typeof payload.ageSeconds === 'number' && payload.ageSeconds > 600;
          const stale_note = stale
            ? `${Math.floor(payload.ageSeconds / 60)}분 전 측정`
            : '';
          return html`<span
            class="usage-meter__group${stale
              ? ' usage-meter__group--stale'
              : ''}"
            aria-label=${`${provider.label} usage`}
          >
            <span class="usage-meter__provider">${provider.label}</span>
            ${payload.windows.map((/** @type {any} */ window) => {
              const raw_pct =
                typeof window.pct === 'number' && Number.isFinite(window.pct)
                  ? window.pct
                  : 0;
              const pct = Math.min(100, Math.max(0, raw_pct));
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
            })}
          </span>`;
        })}
      </div>`,
      mount_element
    );
    mount_element.hidden = false;
  }

  /**
   * Fetch one provider and collapse its failure to unavailable.
   *
   * @param {{ key: string, label: string, endpoint: string }} provider
   */
  async function fetchProvider(provider) {
    try {
      const response = await fetch(provider.endpoint);
      if (!response.ok) {
        return null;
      }
      const payload = /** @type {any} */ (await response.json());
      if (
        !payload ||
        payload.available !== true ||
        !Array.isArray(payload.windows)
      ) {
        return null;
      }
      return payload;
    } catch {
      return null;
    }
  }

  /** Refresh every provider independently, then render one coherent tick. */
  async function refresh() {
    const results = await Promise.all(
      PROVIDERS.map(async (provider) => ({
        provider,
        payload: await fetchProvider(provider)
      }))
    );
    if (destroyed) {
      return;
    }
    for (const result of results) {
      if (result.payload) {
        provider_payloads.set(result.provider.key, result.payload);
      } else {
        provider_payloads.delete(result.provider.key);
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
    /** Stop polling and clear the mount. */
    destroy() {
      destroyed = true;
      if (interval_id !== null) {
        clearInterval(interval_id);
        interval_id = null;
      }
      hide();
    }
  };
}
