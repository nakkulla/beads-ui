/**
 * Label visibility resolution against the workspace display policy.
 *
 * Cards show every bead label by default; the policy only subtracts. Three
 * rules apply in strict order, so a single label can escape a broad prefix
 * rule without disabling that rule for everything else:
 *
 * 1. `visible_labels` (exact) — always shown,
 * 2. `hidden_labels` (exact) — hidden,
 * 3. `hidden_prefixes` — hidden when the label starts with one,
 * 4. otherwise shown.
 *
 * A null policy (no snapshot yet, or a client that never subscribed) shows
 * everything: hiding on an unknown policy would flash labels away once the
 * real snapshot lands.
 *
 * @typedef {Object} DisplayPolicyChips
 * @property {boolean} route
 * @property {boolean} fast_track
 * @property {boolean} pr
 * @property {boolean} from
 * @property {boolean} blocked
 * @property {boolean} stepper
 */
/**
 * @typedef {Object} DisplayPolicy
 * @property {number} revision
 * @property {string[]} hidden_labels
 * @property {string[]} hidden_prefixes
 * @property {string[]} visible_labels
 * @property {DisplayPolicyChips} chips
 */

/**
 * @param {unknown} value
 * @returns {string[]}
 */
function stringList(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === 'string')
    : [];
}

/**
 * Resolve whether one label renders under a policy.
 *
 * @param {string} label
 * @param {DisplayPolicy | null | undefined} policy
 * @returns {boolean}
 */
export function isLabelVisible(label, policy) {
  if (!policy || typeof label !== 'string' || label.length === 0) {
    return true;
  }
  if (stringList(policy.visible_labels).includes(label)) {
    return true;
  }
  if (stringList(policy.hidden_labels).includes(label)) {
    return false;
  }
  return !stringList(policy.hidden_prefixes).some(
    (prefix) => prefix.length > 0 && label.startsWith(prefix)
  );
}

/**
 * Filter a bead's labels down to the ones the policy shows, preserving order.
 *
 * @param {unknown} labels
 * @param {DisplayPolicy | null | undefined} policy
 * @returns {string[]}
 */
export function visibleLabels(labels, policy) {
  return stringList(labels).filter((label) => isLabelVisible(label, policy));
}

/**
 * Read one derived-chip toggle. Unknown or absent toggles default to on, so a
 * policy written by an older server never blanks a chip the client knows about.
 *
 * @param {DisplayPolicy | null | undefined} policy
 * @param {keyof DisplayPolicyChips} chip
 * @returns {boolean}
 */
export function isChipEnabled(policy, chip) {
  const value = policy && policy.chips ? policy.chips[chip] : undefined;
  return typeof value === 'boolean' ? value : true;
}

/**
 * The label a bench experiment clone carries (preset-compare §4.3). Owned by
 * beads-ui alone — the workflow contract only declares that ownership (§5.3).
 */
export const BENCH_LABEL = 'bench';

/**
 * Whether a bead is one of the bench clones the Board hides by default (§4.8).
 *
 * @param {unknown} issue
 * @returns {boolean}
 */
export function hasBenchLabel(issue) {
  const labels =
    issue && typeof issue === 'object'
      ? /** @type {any} */ (issue).labels
      : null;
  return stringList(labels).includes(BENCH_LABEL);
}

/**
 * Whether the Board lists bench clones (§4.8). The flag is carried by the
 * existing policy's `visible_labels`: an explicit decision to SHOW the `bench`
 * label is the same decision as listing the beads that carry it, so the toggle
 * needs no second storage path and no new policy key.
 *
 * The default — and an absent policy — is EXCLUDE. Unlike a label chip, a
 * clone row that appears and then disappears would move every card below it,
 * so the quiet state here is the one §4.8 declares.
 *
 * @param {DisplayPolicy | null | undefined} policy
 * @returns {boolean}
 */
export function isBenchIncluded(policy) {
  return !!policy && stringList(policy.visible_labels).includes(BENCH_LABEL);
}
