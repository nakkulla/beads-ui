import { html } from 'lit-html';
import { canMoveWorkerCard } from '../data/worker-board-selectors.js';
import { workerCardTemplate } from './worker-card.js';

const LANES = [
  ['inbox', 'Inbox'],
  ['waiting', 'Waiting'],
  ['progress', 'Progress'],
  ['done', 'Done']
];
const ACTIVE_JOB_STATUSES = new Set([
  'queued',
  'starting',
  'running',
  'cancelling'
]);

/** @type {{ issue_id: string, lane: string } | null} */
let active_drag = null;

/**
 * @param {Record<string, any[]>} board
 * @param {string} issue_id
 * @returns {any | null}
 */
function findCard(board, issue_id) {
  for (const lane of LANES.map((entry) => entry[0])) {
    const card = (board[lane] || []).find((item) => item.id === issue_id);
    if (card) {
      return card;
    }
  }
  return null;
}

/**
 * @param {any} state
 * @returns {boolean}
 */
function hasSerialBusyJob(state) {
  const live_jobs = state?.worker?.live_jobs || {};
  return Object.values(live_jobs).some((/** @type {any} */ job) => {
    const status = String(job?.status || '');
    return ACTIVE_JOB_STATUSES.has(status) && job?.parallel !== true;
  });
}

/**
 * @param {DragEvent} event
 * @returns {string}
 */
function getDroppedIssueId(event) {
  const transfer_id = event.dataTransfer?.getData('text/plain') || '';
  return transfer_id || active_drag?.issue_id || '';
}

/**
 * @param {any} card
 * @param {DragEvent} event
 */
function startDrag(card, event) {
  active_drag = { issue_id: card.id, lane: card.lane };
  if (event.dataTransfer) {
    event.dataTransfer.setData('text/plain', card.id);
    try {
      event.dataTransfer.effectAllowed = 'move';
    } catch {
      // ignore readonly mocks
    }
  }
}

/**
 * @param {DragEvent} event
 */
function allowDrop(event) {
  event.preventDefault();
  if (event.dataTransfer) {
    try {
      event.dataTransfer.dropEffect = 'move';
    } catch {
      // ignore readonly mocks
    }
  }
}

/**
 * @param {Record<string, any[]>} board
 * @param {any} state
 * @param {string} to_lane
 * @param {DragEvent} event
 * @param {{
 *   onMoveCard?: (input: { issueId: string, fromLane: string, toLane: string, beforeId?: string | null, afterId?: string | null }) => void,
 *   onShowToast?: (message: string) => void
 * }} handlers
 */
function dropCard(board, state, to_lane, event, handlers) {
  event.preventDefault();
  const issue_id = getDroppedIssueId(event);
  const card = findCard(board, issue_id);
  if (!card) {
    return;
  }
  const from_lane =
    active_drag?.issue_id === issue_id ? active_drag.lane : card.lane;
  const result = canMoveWorkerCard(card, from_lane, to_lane, {
    serial_busy: hasSerialBusyJob(state)
  });
  active_drag = null;
  if (!result.ok) {
    handlers.onShowToast?.(result.reason || 'Invalid worker move');
    return;
  }
  handlers.onMoveCard?.({
    issueId: issue_id,
    fromLane: from_lane,
    toLane: to_lane,
    beforeId: null,
    afterId: null
  });
}

/**
 * @param {Record<string, any[]>} board
 * @param {any} state
 * @param {{
 *   selected_parent_id?: string | null,
 *   onSelectCard: (id: string) => void,
 *   onMoveCard?: (input: { issueId: string, fromLane: string, toLane: string, beforeId?: string | null, afterId?: string | null }) => void,
 *   onShowToast?: (message: string) => void,
 *   onCancelJob?: (job_id: string) => void,
 *   onFinishNow?: (issue_id: string) => void,
 *   onCancelAutoPrFinish?: (issue_id: string) => void,
 *   onRunPrFinish?: (issue_id: string) => void
 * }} handlers
 */
export function workerBoardTemplate(board, state, handlers) {
  return html`
    <section class="worker-board" aria-label="Worker board">
      ${LANES.map(([lane, title]) => {
        const cards = board[lane] || [];
        return html`
          <section
            class="worker-board__lane"
            id="worker-lane-${lane}"
            data-worker-lane=${lane}
            @dragover=${allowDrop}
            @drop=${(/** @type {DragEvent} */ event) =>
              dropCard(board, state, lane, event, handlers)}
          >
            <header class="worker-board__lane-header">
              <h3>${title}</h3>
              <span class="worker-board__lane-count">${cards.length}</span>
            </header>
            <div class="worker-board__lane-body">
              ${cards.length === 0
                ? html`<div class="worker-board__empty">No cards</div>`
                : cards.map((card) =>
                    workerCardTemplate(card, state, {
                      ...handlers,
                      selected: handlers.selected_parent_id === card.id,
                      onDragStart: startDrag
                    })
                  )}
            </div>
          </section>
        `;
      })}
    </section>
  `;
}
