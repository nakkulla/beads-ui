/**
 * The workflow contract's `frontend`/`backend` area judgement, read from the
 * labels alone (UI-wg68 §5.4).
 *
 * dotfiles owns the vocabulary; beads-ui is a CONSUMER (AGENTS.md), so a label
 * outside this list is never drawn and an unreadable attachment is an absent
 * judgement (`[]`), never a throw. Unlike 복잡 there is NO reason key: the label
 * itself is the judgement, so the chip text is the label verbatim.
 */
import { workerLabels } from './worker-eligibility.js';

/**
 * The area labels this UI draws, in contract order.
 *
 * @type {ReadonlyArray<string>}
 */
export const AREA_LABELS = ['frontend', 'backend'];

/**
 * One display sentence per area label — the sibling contract's meaning in one
 * line. Shown as the chip `title` so one judgement reads the same on every
 * surface.
 *
 * @type {Record<string, string>}
 */
export const AREA_LABEL_TEXT = {
  frontend: 'frontend: 렌더된 화면으로 acceptance를 판정하는 작업',
  backend: 'backend: 화면 없는 서버·CLI·스크립트·계약·파이프라인 작업'
};

/**
 * The area labels one bead carries, in contract order and without duplicates.
 * Both labels may stand together (sibling spec), so this answers with a list
 * rather than a single verdict.
 *
 * @param {unknown} labels
 * @returns {string[]}
 */
export function areaLabels(labels) {
  const present = workerLabels(labels);
  return AREA_LABELS.filter((label) => present.includes(label));
}

/**
 * The chip `title` of one area label, or `''` when the label is outside the
 * contract vocabulary (fail-quiet, no throw).
 *
 * @param {unknown} label
 * @returns {string}
 */
export function areaTooltip(label) {
  return typeof label === 'string' ? AREA_LABEL_TEXT[label] || '' : '';
}
