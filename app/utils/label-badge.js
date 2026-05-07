const CARD_PREFIXES = ['has:', 'reviewed:'];

/**
 * Filter labels using visible prefixes and exact matches.
 *
 * @param {string[] | null | undefined} labels
 * @param {string[] | null | undefined} visible_prefixes
 * @param {string[] | null | undefined} [visible_exact]
 * @returns {string[]}
 */
export function filterVisibleLabels(
  labels,
  visible_prefixes,
  visible_exact = []
) {
  if (!Array.isArray(labels)) {
    return [];
  }

  const prefixes = Array.isArray(visible_prefixes) ? visible_prefixes : [];
  const exact = Array.isArray(visible_exact) ? visible_exact : [];

  return labels.filter(
    (label) =>
      exact.includes(label) ||
      prefixes.some((prefix) => label.startsWith(prefix))
  );
}

/**
 * Filter labels to only those shown on cards and rows.
 *
 * @param {string[] | null | undefined} labels
 * @returns {string[]}
 */
export function filterCardLabels(labels) {
  return filterVisibleLabels(labels, CARD_PREFIXES, []);
}

/**
 * Create a compact badge element for a label.
 *
 * @param {string} label
 * @returns {HTMLSpanElement}
 */
export function createLabelBadge(label) {
  const badge_element = document.createElement('span');
  badge_element.className = 'label-badge';

  let modifier = null;
  if (label.startsWith('has:')) {
    modifier = 'has';
  } else if (label.startsWith('reviewed:')) {
    modifier = 'reviewed';
  } else if (label === 'pr') {
    modifier = 'pr';
  }

  if (modifier) {
    badge_element.classList.add(`label-badge--${modifier}`);
  }

  badge_element.setAttribute('title', label);
  badge_element.setAttribute('aria-label', `Label: ${label}`);
  badge_element.textContent = label;
  return badge_element;
}
