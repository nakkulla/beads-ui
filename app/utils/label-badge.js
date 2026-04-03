const CARD_PREFIXES = ['has:', 'reviewed:'];

/**
 * Filter labels to only those shown on cards and rows.
 *
 * @param {string[] | null | undefined} labels
 * @returns {string[]}
 */
export function filterCardLabels(labels) {
  if (!Array.isArray(labels)) {
    return [];
  }

  return labels.filter((label) =>
    CARD_PREFIXES.some((prefix) => label.startsWith(prefix))
  );
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
  }

  if (modifier) {
    badge_element.classList.add(`label-badge--${modifier}`);
  }

  badge_element.setAttribute('title', label);
  badge_element.setAttribute('aria-label', `Label: ${label}`);
  badge_element.textContent = label;
  return badge_element;
}
