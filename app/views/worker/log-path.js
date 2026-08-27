/**
 * The failure log path plus the control that moves it somewhere useful
 * (UI-8w4t §4).
 *
 * Two surfaces show the same value — the timeline operation card's `세부` and
 * the Worker `pr_wait` row's completion `needs_human` card — so they share ONE
 * template rather than each growing its own copy. A path a reader can copy on
 * one card and only stare at on the other is the same defect this spec was
 * written to remove.
 *
 * The `worker-ev__*` class names are kept as-is: the pattern (and its CSS) was
 * born in the timeline block, and renaming it here would fork the styling for
 * no behavioural gain.
 *
 * @import { TemplateResult } from 'lit-html'
 */
import { html } from 'lit-html';
import { copyToClipboard } from '../../utils/clipboard.js';
import { showToast } from '../../utils/toast.js';

/**
 * Put one absolute path on the clipboard. Board's `복사됨`/`복사 실패` toast
 * convention, because that is the only feedback a copy can honestly give.
 *
 * @param {string} value
 */
async function copyPath(value) {
  const copied = await copyToClipboard(value);
  showToast(
    copied ? '복사됨' : '복사 실패',
    copied ? 'success' : 'error',
    1200
  );
}

/**
 * A path value plus its copy control. The log a failure left behind is read in
 * a terminal, not here, so the path is only worth showing if it can be carried
 * out of the browser.
 *
 * The control is bound to the value, never drawn on its own: a failure that
 * happened BEFORE the RepoOperation started has no log file, and a copy button
 * for a path that does not exist is worse than no button. Callers pass only a
 * present path; an empty one renders nothing at all.
 *
 * @param {unknown} value
 * @returns {TemplateResult|string}
 */
export function logPathTemplate(value) {
  if (typeof value !== 'string' || value.length === 0) {
    return '';
  }
  return html`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${value}</code
    ><button
      type="button"
      class="worker-ev__copy"
      data-seam="log-path-copy"
      title="로그 경로 복사"
      aria-label=${`로그 경로 복사: ${value}`}
      @click=${() => void copyPath(value)}
    >
      ⧉
    </button></span
  >`;
}
