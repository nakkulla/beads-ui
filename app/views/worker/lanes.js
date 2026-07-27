/**
 * Lane + mini-row templates for the Worker console (spec §5.1).
 *
 * The lane row is the spec's four-column IA (worker-phase2 §7) — 대기 · 실행 중 ·
 * PR 대기 · 완료 — preceded by the candidate SOURCE pane (Board Ready/Blocked,
 * dashed `.worker-pane--src`), which is not a bead state but the feed a bead is
 * dragged out of. Styling mirrors `worker-final.html` (`.pane`/`.mini`/`⠿` grip)
 * via the `worker-*` class namespace.
 *
 * A pane normally renders `items` as rows; 실행 중 hands in its own `body`
 * instead (the running-tile grid), so all five columns share one pane shell
 * rather than growing a second one.
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
 * @property {boolean} [done] - Rendered dimmed with no grip.
 * @property {number|null} [pr_number] - Observed PR number (`pr_wait` rows).
 * @property {string} [pr_url] - Observed PR URL; renders the `#N ↗` link.
 * @property {string[]} [badges] - Gate / base-state badges (worker-phase2 §5).
 * @property {boolean} [alert] - Whether the badges report a state needing a
 * human decision (PR closed, observation error) — rendered in the warn colour.
 * @property {boolean} [merge_action] - Render the [머지] action (`pr_wait` rows
 * only, worker-phase2 §6).
 * @property {boolean} [discard_action] - Render the [폐기] action. Flagged apart
 * from `merge_action` because a merged tile keeps [머지] as its cleanup-retry
 * button while [폐기] must not be offered there at all (discard spec §2).
 * @property {boolean} [merge_enabled] - Whether the gate lets [머지] be clicked.
 * @property {string} [merge_title] - Tooltip: what the click is based on, or
 * why it is refused.
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
  const badges = Array.isArray(item.badges) ? item.badges : [];
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
    ${item.pr_url && item.pr_number
      ? html`<a
          class="worker-mini__pr"
          href=${item.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${item.pr_number} ↗</a
        >`
      : ''}
    ${badges.map(
      (b) =>
        html`<span
          class="worker-mini__badge${item.alert
            ? ' worker-mini__badge--alert'
            : ''}"
          >${b}</span
        >`
    )}
    ${item.reason
      ? html`<span class="worker-mini__reason">${item.reason}</span>`
      : ''}
    ${item.merge_action
      ? html`<button
          type="button"
          class="worker-mini__merge"
          data-bead-id=${item.id}
          ?disabled=${item.merge_enabled === false}
          title=${item.merge_title || ''}
        >
          머지
        </button>`
      : ''}
    ${item.discard_action
      ? html`<button
          type="button"
          class="worker-mini__discard"
          data-bead-id=${item.id}
          title="PR을 닫고 워크트리/브랜치를 폐기합니다 (되돌릴 수 없음). 다시 실행하려면 후보 레인에서 대기 레인으로 옮기세요"
        >
          폐기
        </button>`
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
 * One lane pane. `body` overrides the row rendering for a column whose contents
 * are not mini rows (실행 중); `items` still supplies the header count so every
 * column counts its members the same way. `controls` is an optional strip under
 * the header (candidate display filters, UI-ki09) — a pane that passes none
 * renders exactly as before.
 *
 * @param {{ id: string, lane: 'candidate'|'queue'|'running'|'pr_wait'|'done', title: string, items: MiniItem[], src?: boolean, empty?: string, body?: import('lit-html').TemplateResult, controls?: import('lit-html').TemplateResult }} pane
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
    ${pane.controls ? pane.controls : ''}
    <div class="worker-pane__body">
      ${pane.body
        ? pane.body
        : pane.items.length === 0
          ? html`<div class="worker-pane__empty">${pane.empty || ''}</div>`
          : pane.items.map((it) =>
              pane.lane === 'candidate' ? candidateCard(it) : miniRow(it)
            )}
    </div>
  </section>`;
}
