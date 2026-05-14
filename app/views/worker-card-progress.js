import { html } from 'lit-html';
import { formatElapsedMs } from '../data/worker-selectors.js';

/**
 * @param {unknown} value
 * @returns {number}
 */
function toNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function formatRemaining(value) {
  return formatElapsedMs(toNumber(value));
}

/**
 * @param {any} card
 * @param {any} state
 * @returns {any | null}
 */
function getReviewWait(card, state) {
  const waits = state?.worker?.pr_review_waits || {};
  return waits[card.id] || null;
}

/**
 * @param {Event} event
 */
function stopClick(event) {
  event.stopPropagation();
}

/**
 * @param {any} card
 * @param {any} state
 * @param {{
 *   onCancelJob?: (job_id: string) => void,
 *   onFinishNow?: (issue_id: string) => void,
 *   onCancelAutoPrFinish?: (issue_id: string) => void,
 *   onRunPrFinish?: (issue_id: string) => void
 * }} handlers
 */
export function workerCardProgressTemplate(card, state, handlers) {
  const wait = getReviewWait(card, state);
  const sub_state = wait ? 'pr_review_wait' : card.sub_state;
  const active_job = card.active_job || null;

  if (sub_state === 'goal_running') {
    return html`
      <section class="worker-card-progress worker-card-progress--goal">
        <div class="worker-card-progress__title">
          <span class="worker-card-progress__blink" aria-hidden="true">●</span>
          /goal running
        </div>
        <div class="worker-card-progress__meta">
          ${active_job?.sessionId || active_job?.session_id
            ? html`<span
                >session ${active_job.sessionId || active_job.session_id}</span
              >`
            : null}
          ${active_job?.lastLogLine || active_job?.last_log_line
            ? html`<span
                >${active_job.lastLogLine || active_job.last_log_line}</span
              >`
            : null}
          ${active_job?.elapsedMs
            ? html`<span>${formatElapsedMs(active_job.elapsedMs)}</span>`
            : null}
        </div>
        ${active_job?.isCancellable && active_job?.id
          ? html`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                @click=${(/** @type {Event} */ event) => {
                  stopClick(event);
                  handlers.onCancelJob?.(active_job.id);
                }}
              >
                Cancel
              </button>
            `
          : null}
      </section>
    `;
  }

  if (sub_state === 'pr_review_wait') {
    const remaining = wait?.remainingMs ?? wait?.remaining_ms ?? null;
    return html`
      <section class="worker-card-progress worker-card-progress--review-wait">
        <div class="worker-card-progress__title">Review wait</div>
        ${remaining != null
          ? html`<div class="worker-card-progress__meta">
              ${formatRemaining(remaining)} remaining
            </div>`
          : null}
        <div class="worker-card-progress__actions">
          <button
            type="button"
            class="worker-btn worker-btn--primary"
            @click=${(/** @type {Event} */ event) => {
              stopClick(event);
              handlers.onFinishNow?.(card.id);
            }}
          >
            Finish now
          </button>
          <button
            type="button"
            class="worker-btn worker-btn--secondary"
            @click=${(/** @type {Event} */ event) => {
              stopClick(event);
              handlers.onCancelAutoPrFinish?.(card.id);
            }}
          >
            Cancel auto pr-finish
          </button>
        </div>
      </section>
    `;
  }

  if (sub_state === 'pr_finish_running') {
    return html`
      <section class="worker-card-progress worker-card-progress--pr-finish">
        <div class="worker-card-progress__title">
          <span class="worker-card-progress__blink" aria-hidden="true">●</span>
          $pr-finish running
        </div>
        <div class="worker-card-progress__meta">
          ${active_job?.sessionId || active_job?.session_id
            ? html`<span
                >session ${active_job.sessionId || active_job.session_id}</span
              >`
            : null}
          ${active_job?.lastLogLine || active_job?.last_log_line
            ? html`<span
                >${active_job.lastLogLine || active_job.last_log_line}</span
              >`
            : null}
        </div>
        ${active_job?.isCancellable && active_job?.id
          ? html`
              <button
                type="button"
                class="worker-btn worker-btn--danger"
                @click=${(/** @type {Event} */ event) => {
                  stopClick(event);
                  handlers.onCancelJob?.(active_job.id);
                }}
              >
                Cancel
              </button>
            `
          : null}
      </section>
    `;
  }

  if (card.metadata?.worker_pr_review_wait_cancelled === 'true') {
    return html`
      <section class="worker-card-progress worker-card-progress--cancelled">
        <div class="worker-card-progress__title">Review wait cancelled</div>
        <button
          type="button"
          class="worker-btn worker-btn--secondary"
          @click=${(/** @type {Event} */ event) => {
            stopClick(event);
            handlers.onRunPrFinish?.(card.id);
          }}
        >
          Run pr-finish
        </button>
      </section>
    `;
  }

  return null;
}
