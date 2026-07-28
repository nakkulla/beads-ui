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
import { formatUsageTotal, usageTooltip } from './usage.js';

/**
 * @typedef {Object} MiniItem
 * @property {string} id - Bead id.
 * @property {string} title - Bead title (falls back to id).
 * @property {string} [reason] - Candidate reason chip (spec 없음 / 🔒 target).
 * @property {boolean} draggable - Whether this row can be dragged.
 * @property {'candidate'|'queue'|'pr_wait'|'done'} lane - Owning lane.
 * @property {boolean} [done] - Rendered dimmed with no grip.
 * @property {boolean} [external] - PR 대기 행이 외부 세션이 배달한 PR인지
 * (UI-w0hi §4). 좌측 액센트 보더 + 미세 배경 틴트로 구분만 하고 행동은 바꾸지
 * 않는다.
 * @property {number|null} [pr_number] - Observed PR number (`pr_wait` rows).
 * @property {string} [pr_url] - Observed PR URL; renders the `#N ↗` link.
 * @property {string[]} [badges] - Gate / base-state badges (worker-phase2 §5).
 * @property {string|null} [live_badge] - Which of {@link MiniItem.badges}
 * reports live server activity rather than a settled state (UI-raqh §3); it is
 * drawn neutral with a breathing dot instead of the alert colour.
 * @property {boolean} [alert] - Whether the badges report a state needing a
 * human decision (PR closed, observation error) — rendered in the warn colour.
 * @property {boolean} [merge_action] - Render the [머지] action (`pr_wait` rows
 * only, worker-phase2 §6).
 * @property {boolean} [discard_action] - Render the [폐기] action. Flagged apart
 * from `merge_action` because a merged tile keeps [머지] as its cleanup-retry
 * button while [폐기] must not be offered there at all (discard spec §2).
 * @property {boolean} [merge_enabled] - Whether the gate lets [머지] be clicked.
 * @property {boolean} [discard_enabled] - Whether [폐기] may be clicked; false
 * while a merge is in flight (UI-raqh §4) or a conflict-resolution session owns
 * the bead (UI-dxgz §1).
 * @property {string} [discard_title] - Tooltip for a refused [폐기]; absent
 * keeps the merge-in-flight wording (UI-dxgz §1).
 * @property {string} [merge_label] - Text of the [머지] button; absent renders
 * 머지. A conflicting gate dispatches a resolution session instead of merging,
 * so its button says so (UI-dxgz §2).
 * @property {boolean} [revise_action] - Render the REVISE-disposition actions
 * (`queue` rows parked at `spec_review_stale:revise`, UI-hs11 §3.5).
 * @property {boolean} [revise_enabled] - Whether the two disposition buttons
 * may be clicked; false while a disposition click of this row is in flight.
 * @property {string} [revise_title] - Tooltip carrying the findings summary.
 * @property {{ label: string, index: number, total: number, percent: number }|null} [merge_step] -
 * The merge's current step, when one is running (UI-raqh §4).
 * @property {string} [merge_title] - Tooltip: what the click is based on, or
 * why it is refused.
 * @property {(import('../board/stepper.js').WorkflowSummary & { route_source?: string, chips?: { route?: string, route_source?: string } }) | null} [workflow] - Server-enriched workflow (candidate cards only).
 * @property {string} [status] - Issue status, for the stepper glow (candidate cards only).
 * @property {import('./usage.js').UsageRecord|null} [usage] - Token usage of
 * the bead's last attempt (UI-raqh §1); absent/null renders nothing.
 */

/**
 * One `.mini` row.
 *
 * PR 대기 레인만 다단 카드로 그린다 (UI-k59y §1): 한 줄에 ID·제목·PR·뱃지·
 * reason·usage·[머지]/[폐기]를 전부 실으면 제목이 몇 글자만 남기 때문이다.
 * 부속 요소가 적은 대기/완료 레인은 한 줄 그대로 둔다 — 거기서는 카드화가
 * 과하다. 두 변형 모두 같은 `.worker-mini` 껍데기를 쓰므로 드래그 계약
 * (`data-bead-id`/`data-lane`)과 머지 진행 시각화는 변형과 무관하게 유지된다.
 *
 * @param {MiniItem} item
 * @returns {import('lit-html').TemplateResult}
 */
export function miniRow(item) {
  const draggable = item.draggable && !item.done;
  const badges = Array.isArray(item.badges) ? item.badges : [];
  const usage_label = formatUsageTotal(item.usage);
  const merging = item.merge_step || null;
  const card = item.lane === 'pr_wait';
  const grip = draggable
    ? html`<span class="worker-mini__grip" aria-hidden="true">⠿</span>`
    : '';
  const id_el = html`<span class="worker-mini__id" title="클릭하면 ID 복사"
    >${item.id}</span
  >`;
  const title_el = html`<span class="worker-mini__title">${item.title}</span>`;
  const pr_el =
    item.pr_url && item.pr_number
      ? html`<a
          class="worker-mini__pr"
          href=${item.pr_url}
          target="_blank"
          rel="noreferrer noopener"
          title="PR 열기"
          >#${item.pr_number} ↗</a
        >`
      : '';
  const badge_els = badges.map((b) =>
    b === item.live_badge
      ? // Live server activity (UI-raqh §3): neutral, never the warn colour —
        // nothing here asks the reader to act, it only says work is running.
        // The breathing dot carries the aliveness a colour would overstate.
        html`<span
          class="worker-mini__badge worker-mini__badge--activity"
          title="서버가 이 PR을 처리하는 중입니다"
          ><span class="act-dot" aria-hidden="true"></span>${b}</span
        >`
      : html`<span
          class="worker-mini__badge${item.alert
            ? ' worker-mini__badge--alert'
            : ''}"
          >${b}</span
        >`
  );
  const reason_el = item.reason
    ? html`<span class="worker-mini__reason">${item.reason}</span>`
    : '';
  const usage_el = usage_label
    ? html`<span class="worker-usage" title=${usageTooltip(item.usage)}
        >${usage_label}</span
      >`
    : '';
  const merge_step_el = merging
    ? // The one place this board raises its voice (UI-raqh §4): a merge is
      // irreversible and minutes long, so the row itself becomes the gauge —
      // side rail, bottom progress line, step name and n/7. No spinner: the
      // counter says more than a spinner can.
      html`<span class="merge-step"
        >${merging.label}<span class="merge-step__n"
          >${merging.index}/${merging.total}</span
        ></span
      >`
    : '';
  const merge_el = item.merge_action
    ? html`<button
        type="button"
        class="worker-mini__merge"
        data-bead-id=${item.id}
        ?disabled=${item.merge_enabled === false}
        title=${item.merge_title || ''}
      >
        ${item.merge_label || '머지'}
      </button>`
    : '';
  const discard_el = item.discard_action
    ? html`<button
        type="button"
        class="worker-mini__discard"
        data-bead-id=${item.id}
        ?disabled=${item.discard_enabled === false}
        title=${item.discard_enabled === false
          ? item.discard_title || '머지 진행 중 — 폐기할 수 없습니다'
          : 'PR을 닫고 워크트리/브랜치를 폐기합니다 (되돌릴 수 없음). 다시 실행하려면 후보 레인에서 대기 레인으로 옮기세요'}
      >
        폐기
      </button>`
    : '';
  // 파킹 처분 두 버튼 (UI-hs11 §3.5). 대기 레인 행에만 붙고, 머지/폐기와 같은
  // 클릭 위임·CAS 재시도 계약을 쓴다. findings 상세는 카드 클릭 → 이슈 상세로
  // 가고 여기서는 툴팁 요약만 싣는다.
  const revise_els = item.revise_action
    ? html`<button
          type="button"
          class="worker-mini__revise-fix"
          data-bead-id=${item.id}
          ?disabled=${item.revise_enabled === false}
          title=${item.revise_title ||
          'notes의 REVISE finding을 스펙에 반영하는 처분 세션을 띄웁니다'}
        >
          finding 수용·수정
        </button>
        <button
          type="button"
          class="worker-mini__revise-approve"
          data-bead-id=${item.id}
          ?disabled=${item.revise_enabled === false}
          title="델타를 사용자 권한으로 승인해 영수증을 갱신하고 파킹을 해제합니다 (세션 없음)"
        >
          승인하고 진행
        </button>`
    : '';
  const has_foot = !!(
    usage_label ||
    merging ||
    item.merge_action ||
    item.discard_action
  );
  return html`<div
    class="worker-mini${card ? ' worker-mini--card' : ''}${draggable
      ? ''
      : ' worker-mini--static'}${item.done ? ' worker-mini--done' : ''}${merging
      ? ' worker-mini--merging'
      : ''}${item.external ? ' worker-mini--external' : ''}"
    style=${merging ? `--progress: ${merging.percent}%` : ''}
    draggable=${draggable ? 'true' : 'false'}
    data-bead-id=${item.id}
    data-lane=${item.lane}
  >
    ${card
      ? html`<div class="worker-mini__head">
            ${grip}${id_el}${pr_el}${badge_els}${reason_el}
          </div>
          <div class="worker-mini__body">${title_el}</div>
          ${has_foot
            ? html`<div class="worker-mini__foot">
                ${usage_el}${merge_step_el}
                <span class="worker-mini__actions"
                  >${merge_el}${discard_el}</span
                >
              </div>`
            : ''}`
      : html`${grip}${id_el}${title_el}${pr_el}${badge_els}${reason_el}${usage_el}${merge_step_el}${merge_el}${discard_el}${revise_els}`}
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
    <div
      class="worker-card__foot${item.reason
        ? ''
        : ' worker-card__foot--actions-only'}"
    >
      ${item.reason
        ? html`<span
            class="worker-card__reason${danger
              ? ' worker-card__reason--danger'
              : ''}"
            >${item.reason}</span
          >`
        : ''}
      <!-- 버튼식 큐 적재 (UI-58y2 §[대기로 ↴]): 드래그의 보완재이지 대체재가
           아니므로 자격 조건은 드래그와 완전히 같다 — spec 없는 후보만 막고,
           blocked-with-spec은 드래그와 마찬가지로 적재할 수 있다. 표시 조건
           (coarse pointer / 좁은 화면)은 CSS가 소유한다. -->
      <button
        type="button"
        class="worker-card__place"
        data-bead-id=${item.id}
        ?disabled=${!draggable}
        title=${draggable
          ? '대기 큐 맨 뒤에 추가'
          : 'spec이 없어 대기 큐에 넣을 수 없습니다'}
      >
        대기로 ↴
      </button>
    </div>
  </div>`;
}

/**
 * One lane pane. `body` overrides the row rendering for a column whose contents
 * are not mini rows (실행 중); `items` still supplies the header count so every
 * column counts its members the same way. `controls` is an optional strip under
 * the header (candidate display filters, UI-ki09) and `header_control` an
 * optional trailing element INSIDE it (the candidate sort select, UI-raqh §2) —
 * a pane that passes neither renders exactly as before.
 *
 * `collapsible` turns the header into the accordion toggle used by the mobile
 * layout (UI-58y2): a collapsed pane renders no body but keeps its `data-lane`,
 * so 후보→대기 still drops onto the strip. `live` marks the lane whose work is
 * actually running, which is the only lane whose header dot breathes.
 *
 * @param {{ id: string, lane: 'candidate'|'queue'|'running'|'pr_wait'|'done', title: string, items: MiniItem[], src?: boolean, empty?: string, body?: import('lit-html').TemplateResult, controls?: import('lit-html').TemplateResult, header_control?: import('lit-html').TemplateResult, live?: boolean, collapsible?: boolean, collapsed?: boolean, preview?: string }} pane
 * @returns {import('lit-html').TemplateResult}
 */
export function paneTemplate(pane) {
  const collapsed = !!pane.collapsible && !!pane.collapsed;
  const head_inner = html`<span
      class="worker-pane__dot worker-pane__dot--${pane.lane}"
      aria-hidden="true"
    ></span>
    <span class="worker-pane__title">${pane.title}</span>
    ${collapsed && pane.preview
      ? html`<span class="worker-pane__preview">${pane.preview}</span>`
      : ''}
    <span class="worker-pane__count">${pane.items.length}</span>`;
  return html`<section
    class="worker-pane worker-pane--lane-${pane.lane}${pane.src
      ? ' worker-pane--src'
      : ''}${pane.live ? ' worker-pane--live' : ''}${pane.collapsible
      ? ' worker-pane--collapsible'
      : ''}${collapsed ? ' worker-pane--collapsed' : ''}"
    id=${pane.id}
    data-lane=${pane.lane}
  >
    ${pane.collapsible
      ? html`<button
          type="button"
          class="worker-pane__hd worker-pane__hd--toggle"
          data-lane=${pane.lane}
          aria-expanded=${collapsed ? 'false' : 'true'}
        >
          ${head_inner}
          <span class="worker-pane__caret" aria-hidden="true"
            >${collapsed ? '▸' : '▾'}</span
          >
        </button>`
      : html`<header class="worker-pane__hd">
          ${head_inner}${pane.header_control ? pane.header_control : ''}
        </header>`}
    ${collapsed
      ? ''
      : html`${pane.controls ? pane.controls : ''}
          <div class="worker-pane__body">
            ${pane.body
              ? pane.body
              : pane.items.length === 0
                ? html`<div class="worker-pane__empty">
                    ${pane.empty || ''}
                  </div>`
                : pane.items.map((it) =>
                    pane.lane === 'candidate' ? candidateCard(it) : miniRow(it)
                  )}
          </div>`}
  </section>`;
}
