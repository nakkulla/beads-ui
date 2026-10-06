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
 * What the log popup needs to find one log on the server (UI-i8cy §5.5): the
 * registered workspace, which record holds the path, and that record's id. The
 * request never carries the path itself.
 *
 * @typedef {Object} LogViewMaterial
 * @property {string} workspace - Absolute workspace path.
 * @property {'operation'|'cleanup'|'completion'} source
 * @property {string} id - Operation id, or the bead id of a cleanup/completion.
 */

/**
 * @param {unknown} material
 * @returns {material is LogViewMaterial}
 */
function isLogViewMaterial(material) {
  if (!material || typeof material !== 'object') {
    return false;
  }
  const value = /** @type {Record<string, unknown>} */ (material);
  return (
    typeof value.workspace === 'string' &&
    value.workspace.length > 0 &&
    (value.source === 'operation' ||
      value.source === 'cleanup' ||
      value.source === 'completion') &&
    typeof value.id === 'string' &&
    value.id.length > 0
  );
}

/**
 * The copy control bound to one path value.
 *
 * @param {string} value
 * @returns {TemplateResult}
 */
function copyButtonTemplate(value) {
  return html`<button
    type="button"
    class="op-btn op-btn--icon worker-ev__copy"
    data-seam="log-path-copy"
    title="로그 경로 복사"
    aria-label=${`로그 경로 복사: ${value}`}
    @click=${() => void copyPath(value)}
  >
    ⧉
  </button>`;
}

/**
 * A log path plus the controls that move it somewhere useful.
 *
 * With the popup material (UI-i8cy §5.5) the path is not printed inline: a
 * `[로그 보기]` control opens the log in the page's one log popup (delegated
 * click on `data-seam="log-view-open"`), and the path moves into that popup's
 * header, with the copy icon kept beside the button. Without all three pieces
 * of material — a surface that cannot name its record — the old path + copy
 * pair stands, so nothing is lost (fail-quiet).
 *
 * The control is bound to the value, never drawn on its own: a failure that
 * happened BEFORE the RepoOperation started has no log file, and a button for a
 * path that does not exist is worse than no button. Callers pass only a present
 * path; an empty one renders nothing at all.
 *
 * @param {unknown} value
 * @param {unknown} [material] - {@link LogViewMaterial} for the popup.
 * @returns {TemplateResult|string}
 */
export function logPathTemplate(value, material) {
  if (typeof value !== 'string' || value.length === 0) {
    return '';
  }
  if (isLogViewMaterial(material)) {
    return html`<span class="worker-ev__copyline"
      ><button
        type="button"
        class="op-btn worker-ev__log-view"
        data-seam="log-view-open"
        data-workspace=${material.workspace}
        data-log-source=${material.source}
        data-log-id=${material.id}
        data-log-path=${value}
        title=${`로그 보기 — ${value}`}
      >
        로그 보기</button
      >${copyButtonTemplate(value)}</span
    >`;
  }
  return html`<span class="worker-ev__copyline"
    ><code class="worker-ev__path">${value}</code>${copyButtonTemplate(
      value
    )}</span
  >`;
}
