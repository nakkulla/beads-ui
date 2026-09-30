/**
 * The five beads of a card's progress band (UI-dbn6 §3.4 change 1, P1-r2
 * item 13): each bead's fill, whether it is the current stage, and what it
 * opens — the stage's document (spec · plan, the retired stepper's `seg--doc`
 * rule: the server sends `stage.doc` whenever a path exists) or, for the PR
 * bead, the pull request link. Pure: no template.
 */

/** @typedef {'spec'|'plan'|'impl'|'pr'|'merge'} BandStage */

/**
 * The band's stage list and the name a coarse pointer draws under each bead.
 *
 * @type {ReadonlyArray<{ key: BandStage, name: string }>}
 */
export const BAND_STAGES = Object.freeze([
  { key: 'spec', name: 'spec' },
  { key: 'plan', name: 'plan' },
  { key: 'impl', name: '구현' },
  { key: 'pr', name: 'PR' },
  { key: 'merge', name: '머지' }
]);

/**
 * @typedef {Object} BandBead
 * @property {BandStage} key
 * @property {string} name
 * @property {'none'|'done'|'lit'} fill - `done` 산출물 있음, `lit` 리뷰·현재,
 * `none` 미도달.
 * @property {boolean} current
 * @property {{ path: string, missing_state: string|null }|null} doc
 * @property {{ url: string, number: number }|null} pr
 */

/**
 * @param {any} stage
 * @param {boolean} current
 * @returns {'none'|'done'|'lit'}
 */
function fillOf(stage, current) {
  const fill = stage && stage.fill ? stage.fill : 'none';
  if (fill === 'none') {
    return 'none';
  }
  if (current || stage.glyph === 'review' || stage.glyph === 'skip') {
    return 'lit';
  }
  return 'done';
}

/**
 * @param {any} stage
 * @returns {{ path: string, missing_state: string|null }|null}
 */
function docOf(stage) {
  const doc = stage ? stage.doc : null;
  if (!doc || typeof doc.path !== 'string' || doc.path.length === 0) {
    return null;
  }
  return {
    path: doc.path,
    missing_state:
      typeof doc.missing_state === 'string' ? doc.missing_state : null
  };
}

/**
 * The PR link the workflow projection carries, when it is a web URL.
 *
 * @param {any} workflow
 * @returns {{ url: string, number: number }|null}
 */
function prOf(workflow) {
  const pr = workflow && workflow.chips ? workflow.chips.pr : null;
  if (
    !pr ||
    typeof pr.url !== 'string' ||
    !Number.isInteger(pr.number) ||
    pr.number <= 0
  ) {
    return null;
  }
  let protocol = '';
  try {
    protocol = new URL(pr.url).protocol;
  } catch {
    return null;
  }
  return protocol === 'https:' || protocol === 'http:'
    ? { url: pr.url, number: pr.number }
    : null;
}

/**
 * The beads of one card; no workflow stages → `null` (the band is not drawn).
 * The current bead lights only while the issue is progressing and lands on
 * the first fresh `dim` stage.
 *
 * @param {any} workflow
 * @param {string|undefined} status
 * @returns {BandBead[]|null}
 */
export function bandBeads(workflow, status) {
  const stages =
    workflow && workflow.stages && typeof workflow.stages === 'object'
      ? workflow.stages
      : null;
  if (!stages) {
    return null;
  }
  const active = status === 'in_progress' || status === 'resolved';
  let current_marked = !active;
  const pr = prOf(workflow);
  return BAND_STAGES.map(({ key, name }) => {
    const stage = key === 'merge' ? stages.merge || stages.close : stages[key];
    const current =
      !current_marked &&
      !!stage &&
      stage.fill === 'dim' &&
      stage.stale !== true;
    if (current) {
      current_marked = true;
    }
    return {
      key,
      name,
      fill: fillOf(stage, current),
      current,
      doc: key === 'spec' || key === 'plan' ? docOf(stage) : null,
      pr: key === 'pr' ? pr : null
    };
  });
}
