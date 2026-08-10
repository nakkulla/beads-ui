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

/**
 * Render and poll the active Claude Code account usage snapshot.
 *
 * @param {HTMLElement} mount_element
 */
export function createUsageMeter(mount_element) {
  let destroyed = false;
  /** @type {ReturnType<typeof setInterval> | null} */
  let interval_id = null;

  /** Hide the fail-quiet mount and discard its previous snapshot. */
  function hide() {
    render(html``, mount_element);
    mount_element.hidden = true;
  }

  /** Fetch and render one snapshot. */
  async function refresh() {
    try {
      const response = await fetch('/api/claude-usage');
      if (!response.ok) {
        throw new Error(`usage request failed: ${response.status}`);
      }
      const payload = /** @type {any} */ (await response.json());
      if (destroyed) {
        return;
      }
      if (
        !payload ||
        payload.available !== true ||
        !Array.isArray(payload.windows)
      ) {
        hide();
        return;
      }

      const stale =
        typeof payload.ageSeconds === 'number' && payload.ageSeconds > 600;
      const stale_note = stale
        ? `${Math.floor(payload.ageSeconds / 60)}분 전 측정`
        : '';
      const now_ms = Date.now();
      render(
        html`<div
          class="usage-meter${stale ? ' usage-meter--stale' : ''}"
          aria-label="Claude Code usage"
        >
          ${payload.windows.map((/** @type {any} */ window) => {
            const pct =
              typeof window.pct === 'number' && Number.isFinite(window.pct)
                ? window.pct
                : 0;
            const progress = Math.min(100, Math.max(0, pct));
            const reset_time = formatResetTime(window.resetsAt, now_ms);
            const title = `resets ${reset_time}${stale ? ` · ${stale_note}` : ''}`;
            return html`<span
              class="usage-meter__window ${colorClass(pct)}"
              style=${`--progress: ${progress}%`}
              title=${title}
            >
              <span class="usage-meter__label">${window.key}</span>
              <span class="usage-meter__track" aria-hidden="true">
                <span class="usage-meter__fill"></span>
              </span>
              <span class="usage-meter__pct">${pct}%</span>
            </span>`;
          })}
        </div>`,
        mount_element
      );
      mount_element.hidden = false;
    } catch {
      if (!destroyed) {
        hide();
      }
    }
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
