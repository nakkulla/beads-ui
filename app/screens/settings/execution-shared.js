/**
 * Constants and pure helpers the `실행` pane's modules share. They moved out of
 * `execution-pane.js` when the pane was split into its state machine and its
 * templates (UI-dbn6); no module here holds state. `execution-pane.js`
 * re-exports the two public names, so importers keep their path.
 *
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */
import { html } from 'lit-html';
import { WORKSPACE_KV_KEYS } from '../../model/session-model.js';

/** The `(기본)` sentinel a select uses for "no explicit value". */
export const UNSET = '';

/** Copy a server with no quick_fix lane locks that whole tab with (§6.1). */
export const QUICK_FIX_UNSUPPORTED =
  '서버가 quick_fix 레인을 지원하지 않습니다';

/**
 * The four sections one mounted pane can draw, in rail and segment order. The
 * dialog's rail and the monitor panel's segment both name these ids.
 *
 * @type {ReadonlyArray<{ id: string, label: string }>}
 */
export const PANE_SECTIONS = [
  { id: 'worker', label: '워커' },
  { id: 'quick_fix', label: 'quick fix' },
  { id: 'session', label: '세션' },
  { id: 'account', label: '계정' }
];

/**
 * The `[워커|quick fix|세션|계정]` segment both mounts draw, so the section
 * chooser is written once. The monitor panel renders it in its own head; the
 * dialog rail uses its tab buttons instead and never calls this.
 *
 * @param {string} active - The section id currently drawn.
 * @param {(section: string) => void} onSelect
 * @returns {TemplateResult}
 */
export function paneSectionSegmentTemplate(active, onSelect) {
  return html`<span
    class="settings-dialog__seg ui-seg"
    role="group"
    aria-label="실행 설정 구역"
    data-pane-sections
  >
    ${PANE_SECTIONS.map(
      (section) =>
        html`<button
          type="button"
          data-pane-section=${section.id}
          aria-pressed=${String(active === section.id)}
          @click=${() => onSelect(section.id)}
        >
          ${section.label}
        </button>`
    )}
  </span>`;
}

/**
 * @param {unknown} value
 * @returns {value is Record<string, any>}
 */
export function isRecord(value) {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

/**
 * Adopt a fresh baseline without discarding an edit made while the write was
 * in flight. A key still holding what that request carried takes the server's
 * value; a key the user moved since keeps their newer choice, so the chained
 * next save diffs it against the new baseline and actually sends it.
 *
 * Without this, check-then-uncheck on a boolean row ends up stored the wrong
 * way round: the second edit diffs against a baseline the first write has not
 * updated yet and sends nothing, and the arriving response then puts the
 * first choice back.
 *
 * @param {Record<string, string>} current - The draft as it stands now.
 * @param {Record<string, string>} sent - The draft as the request left.
 * @param {Record<string, string>} baseline - The readback the reply carried.
 * @returns {Record<string, string>}
 */
export function reconcileSessionDraft(current, sent, baseline) {
  /** @type {Record<string, string>} */
  const next = { ...baseline };
  for (const key of WORKSPACE_KV_KEYS) {
    const value = current[key];
    if (value === sent[key]) {
      continue;
    }
    if (typeof value === 'string') {
      next[key] = value;
    } else {
      delete next[key];
    }
  }
  return next;
}

/**
 * The text of a failed request: an `Error`'s message, the `message` of the
 * server's refusal object (`{ code, message }` — a strict validation names its
 * reason there), or the value itself.
 *
 * @param {unknown} err
 * @returns {string}
 */
export function errorText(err) {
  if (err instanceof Error) {
    return err.message;
  }
  const message = /** @type {any} */ (err)?.message;
  if (typeof message === 'string' && message.length > 0) {
    return message;
  }
  const code = /** @type {any} */ (err)?.code;
  return typeof code === 'string' && code.length > 0 ? code : String(err);
}
