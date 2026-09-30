/**
 * The lane-choice list of `[↴ 대기로]` (UI-j92s §6.4), shared by the issue
 * detail and the retired Worker/Monitor tabs (which import it from here until
 * Phase 4 deletes them). Moved verbatim out of `views/worker/lanes.js`.
 */
import { html } from 'lit-html';

/**
 * @typedef {import('../../model/placement.js').PlaceMenuEntry} PlaceMenuEntry
 */

/**
 * The `[대기로 ↴]` 메뉴 본문 (UI-j92s §6.4): 한 줄에 하나, 라벨 왼쪽·건수
 * 오른쪽인 **세로** 목록. 가로 스크롤 알약이던 예전 모양은 항목이 늘어날수록
 * 화면 밖으로 밀려나 모바일에서 유일한 적재 경로를 감췄다.
 *
 * @param {PlaceMenuEntry[]} entries
 * @param {string} bead_id
 * @returns {import('lit-html').TemplateResult}
 */
export function placeMenuList(entries, bead_id) {
  /** @type {string|undefined} */
  let current_group = undefined;
  /** @type {Array<import('lit-html').TemplateResult>} */
  const rows = [];
  for (const entry of entries) {
    const group = entry.group || '';
    if (group.length > 0 && group !== current_group) {
      rows.push(html`<div class="worker-card__place-group">${group}</div>`);
    }
    current_group = group;
    rows.push(
      html`<button
        type="button"
        class="worker-card__place-lane${group.length > 0
          ? ' worker-card__place-lane--nested'
          : ''}"
        data-bead-id=${bead_id}
        data-lane=${entry.id}
        ?disabled=${entry.disabled === true}
        title=${entry.title || `${entry.label} 대기 맨 뒤에 추가`}
      >
        <span>${entry.label}</span>
        ${typeof entry.count === 'number'
          ? html`<span class="worker-card__place-count">${entry.count}</span>`
          : ''}
      </button>`
    );
  }
  return html`${rows}`;
}
