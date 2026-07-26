/**
 * Lane + mini-row templates for the Worker console (spec §5.1).
 *
 * Three lanes: candidates (Board Ready/Blocked, dashed `.pane.src`), the single
 * waiting queue (worker-phase2 §3 — the serial/parallel split is gone), and
 * Done. Styling mirrors `worker-final.html` (`.pane`/`.mini`/`⠿` grip) via the
 * `worker-*` class namespace.
 */
import { html } from 'lit-html';
import { stepperTemplate } from '../board/stepper.js';

/**
 * @typedef {Object} MiniItem
 * @property {string} id - Bead id.
 * @property {string} title - Bead title (falls back to id).
 * @property {string} [reason] - Candidate reason chip (spec 없음 / 🔒 target).
 * @property {boolean} draggable - Whether this row can be dragged.
 * @property {'candidate'|'queue'|'pr_wait'|'done'} lane - Owning lane.
 * `pr_wait` rows render inside the Done pane until Phase 6's 4-column IA.
 * @property {boolean} [done] - Rendered dimmed with no grip.
 * @property {(import('../board/stepper.js').WorkflowSummary & { route_source?: string, chips?: { route?: string, route_source?: string } }) | null} [workflow] - Server-enriched workflow (candidate cards only).
 * @property {string} [status] - Issue status, for the stepper glow (candidate cards only).
 */

/**
 * One `.mini` row.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
export function miniRow(item) {
  const draggable = item.draggable && !item.done;
  return html`<div
    class="worker-mini${draggable ? '' : ' worker-mini--static'}${item.done
      ? ' worker-mini--done'
      : ''}"
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    ${draggable
      ? html`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`
      : ''}
    <span class="worker-mini__id" title="클릭하면 ID 복사">${item.id}</span>
    <span class="worker-mini__title">${item.title}</span>
    ${item.reason
      ? html`<span class="worker-mini__reason">${item.reason}</span>`
      : ''}
  </div>`;
}

/**
 * One candidate `.worker-card` (spec §2, mockup 변형 B). Richer than
 * {@link miniRow}: a route chip + the Board's route-driven stepper. It keeps
 * miniRow's drag contract (`draggable` / `data-bead-id` / `data-lane`) so the
 * drag controller treats it identically. An issue without `workflow` (inactive
 * workspace) renders without the chip/stepper and never throws.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
export function candidateCard(item) {
  const draggable = item.draggable && !item.done;
  const workflow = item.workflow;
  const chips = (workflow && workflow.chips) || {};
  const route = chips.route || (workflow && workflow.route);
  const derived =
    chips.route_source === 'derived' ||
    !!(workflow && workflow.route_source === 'derived');
  const danger =
    typeof item.reason === 'string' && item.reason.startsWith('⛔');
  return html`<div
    class="worker-card${draggable ? '' : ' worker-card--static'}"
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    <div class="worker-card__head">
      ${draggable
        ? html`<span class="worker-card__grip" aria-hidden="true">⠿</span>`
        : ''}
      <span class="worker-card__id" title="클릭하면 ID 복사">${item.id}</span>
      ${workflow && route
        ? html`<span
            class="ctl-chip ctl-chip--route${derived ? ' is-derived' : ''}"
            title=${derived ? 'route 추론값 (metadata 미핀)' : 'route'}
            >${derived ? `${route} ?` : route}</span
          >`
        : ''}
    </div>
    <div class="worker-card__title">${item.title}</div>
    ${workflow ? stepperTemplate(workflow, item.status) : ''}
    ${item.reason
      ? html`<div class="worker-card__foot">
          <span
            class="worker-card__reason${danger
              ? ' worker-card__reason--danger'
              : ''}"
            >${item.reason}</span
          >
        </div>`
      : ''}
  </div>`;
}

/**
 * One lane pane.
 *
 * @param {{ id: string, lane: 'candidate'|'queue'|'done', title: string, items: MiniItem[], src?: boolean, empty?: string }} pane
 * @returns {import('lit-html').TemplateResult}
 */
export function paneTemplate(pane) {
  return html`<section
    class="worker-pane${pane.src ? ' worker-pane--src' : ''}"
    id=${pane.id}
    data-lane=${pane.lane}
  >
    <header class="worker-pane__hd">
      <span class="worker-pane__title">${pane.title}</span>
      <span class="worker-pane__count">${pane.items.length}</span>
    </header>
    <div class="worker-pane__body">
      ${pane.items.length === 0
        ? html`<div class="worker-pane__empty">${pane.empty || ''}</div>`
        : pane.items.map((it) =>
            pane.lane === 'candidate' ? candidateCard(it) : miniRow(it)
          )}
    </div>
  </section>`;
}
