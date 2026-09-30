/**
 * The 막힘 summary of the pipeline toolbar (UI-0bvr §6.2, UI-n99w §8): the
 * `막힘 N · ⛔ M` chip, its sheet listing the wait groups, and the reveal that
 * unfolds the chosen card's lane and highlights the card without changing the
 * queue order. The counting rule is `model/blocked-summary.js`.
 */
import { html } from 'lit-html';
import { revealLaneOf, summaryItemText } from '../../model/blocked-summary.js';
import { SUMMARY_CHIPS } from '../../model/wait-vocabulary.js';
import { sheetTemplate } from '../../ui/sheet.js';

/**
 * @import { blockedSummary } from '../../model/blocked-summary.js'
 * @typedef {ReturnType<typeof blockedSummary>} BlockedSummary
 * @typedef {import('lit-html').TemplateResult} TemplateResult
 */

/** How long a revealed card keeps its highlight (the retired 2s). */
export const HIGHLIGHT_MS = 2000;

/**
 * The toolbar chip; nothing blocked draws nothing (fail-quiet).
 *
 * @param {BlockedSummary|null} summary
 * @returns {TemplateResult|''}
 */
export function blockedChip(summary) {
  if (!summary || summary.count === 0) {
    return '';
  }
  const prefix =
    SUMMARY_CHIPS.find((row) => row.id === 'blocked')?.prefix || '막힘';
  return html`<button
    type="button"
    class="ui-chip pl-stat pl-stat--blocked"
    data-op="blocked-open"
    aria-haspopup="dialog"
    title="대기 사유가 있는 원래 이슈 수 — 누르면 사유별 목록"
  >
    <span
      >${prefix} <b>${summary.count}</b>${summary.action_count > 0
        ? html` ·
            <span class="pl-stat__alert">⛔ ${summary.action_count}</span>`
        : ''}</span
    >
  </button>`;
}

/**
 * The 막힘 sheet: one section per wait group, one button per reason.
 *
 * @param {BlockedSummary} summary
 * @param {number} now
 * @returns {TemplateResult}
 */
export function blockedSheet(summary, now) {
  return sheetTemplate({
    title: '막힘 요약',
    body: html`${summary.groups.map(
      (group) =>
        html`<section class="pl-blocked__group">
          <h3 class="pl-blocked__group-head">
            ${group.label} <b>${group.entries.length}</b>
          </h3>
          ${group.entries.map((entry) =>
            entry.reasons.map(
              (reason) =>
                html`<button
                  type="button"
                  class="ui-btn ui-btn--plain pl-blocked__item"
                  data-op="blocked-pick"
                  data-root-dir=${entry.root_dir}
                  data-bead-id=${entry.id}
                >
                  ${summaryItemText(entry, reason, now)}
                </button>`
            )
          )}
        </section>`
    )}`
  });
}

/**
 * Bring a revealed card into view and highlight it for {@link HIGHLIGHT_MS}.
 *
 * @param {ParentNode} root
 * @param {string} lane
 * @param {string} root_dir
 * @param {string} bead_id
 * @returns {boolean} Whether the card was found.
 */
export function highlightCard(root, lane, root_dir, bead_id) {
  const card = Array.from(
    root.querySelectorAll(
      `[data-lane-body="${lane}"] .pl-card, [data-lane-body="${lane}"] .pl-row, [data-lane-body="${lane}"] .pl-tile`
    )
  ).find(
    (node) =>
      node instanceof HTMLElement &&
      node.dataset.beadId === bead_id &&
      node.dataset.rootDir === root_dir
  );
  if (!(card instanceof HTMLElement)) {
    return false;
  }
  for (let parent = card.parentElement; parent; parent = parent.parentElement) {
    if (parent instanceof HTMLDetailsElement) {
      parent.open = true;
    }
  }
  if (typeof card.scrollIntoView === 'function') {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  card.classList.add('is-highlight');
  card.setAttribute('tabindex', '-1');
  card.focus({ preventScroll: true });
  setTimeout(() => card.classList.remove('is-highlight'), HIGHLIGHT_MS);
  return true;
}

/**
 * Unfold the lane, area and bundle holding a 막힘 subject, then bring its card
 * into view and highlight it (UI-n99w §8 `expandWaitSubject`).
 *
 * @param {{ model: () => any, prefs: any, vs: { mobile_lane: any }, ui: { sheet: any }, scopeKind: () => 'all'|'repo', render: () => void, root: ParentNode }} env
 * @param {string} root_dir
 * @param {string} bead_id
 */
export function revealSubject(env, root_dir, bead_id) {
  const where = revealLaneOf(env.model(), root_dir, bead_id);
  env.ui.sheet = null;
  if (where) {
    const kind = env.scopeKind();
    env.prefs.setLaneCollapsed(kind, where.lane, false);
    if (where.area) {
      env.prefs.setAreaCollapsed(kind, where.area, false);
    }
    if (kind === 'all') {
      env.prefs.setBundleCollapsed(root_dir, where.bundle, false);
    }
    env.vs.mobile_lane = where.lane;
  }
  env.render();
  if (where) {
    highlightCard(env.root, where.lane, root_dir, bead_id);
  }
}
