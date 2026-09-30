/**
 * Fixed label display rule (UI-dbn6 §4.2). The per-workspace display policy
 * channel is retired; the stored policy it served is kept here as constants so
 * cards show the same labels without a subscription.
 *
 * `reviewed:`·`skipped:` are the retired review mirror label prefixes the
 * server's old label store (removed in UI-dbn6 Phase 4) hid. The six judgement
 * labels are drawn as judgement chips by their own card fragments, so they are
 * split out of the plain label chips.
 */

/** @type {ReadonlyArray<string>} */
export const HIDDEN_LABEL_PREFIXES = Object.freeze([
  'reviewed:',
  'skipped:',
  'export:',
  'provides:'
]);

/** @type {ReadonlyArray<string>} */
export const HIDDEN_LABELS = Object.freeze(['has:spec', 'pr']);

/** @type {ReadonlyArray<string>} */
export const JUDGEMENT_LABELS = Object.freeze([
  'frontend',
  'backend',
  'complex',
  'session-preferred',
  'worker-ineligible',
  'spec-after-blocker'
]);

/**
 * Whether the fixed rule hides one label from every card surface.
 *
 * @param {string} label
 * @returns {boolean}
 */
export function isHiddenLabel(label) {
  return (
    HIDDEN_LABELS.includes(label) ||
    HIDDEN_LABEL_PREFIXES.some((prefix) => label.startsWith(prefix))
  );
}

/**
 * Split a bead's labels into judgement labels (in `JUDGEMENT_LABELS` order)
 * and plain label chips (in their original order); hidden labels drop out.
 *
 * @param {unknown} labels
 * @returns {{ judgement: string[], plain: string[] }}
 */
export function splitLabels(labels) {
  const list = Array.isArray(labels)
    ? labels.filter(
        (label) =>
          typeof label === 'string' && label.length > 0 && !isHiddenLabel(label)
      )
    : [];
  return {
    judgement: JUDGEMENT_LABELS.filter((label) => list.includes(label)),
    plain: list.filter((label) => !JUDGEMENT_LABELS.includes(label))
  };
}
