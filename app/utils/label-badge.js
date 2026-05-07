const CARD_PREFIXES = ['has:', 'reviewed:'];
const HEX_COLOR_RE = /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

/**
 * @typedef {{ fg: string }} LabelColorRule
 */

/**
 * @typedef {{ prefix?: Record<string, LabelColorRule>, exact?: Record<string, LabelColorRule> }} LabelColorPolicy
 */

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
 * @param {unknown} value
 * @returns {value is Record<string, unknown>}
 */
function isObjectTable(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * @param {unknown} rule
 * @returns {string | null}
 */
function getRuleColor(rule) {
  if (!isObjectTable(rule) || typeof rule.fg !== 'string') {
    return null;
  }

  return HEX_COLOR_RE.test(rule.fg) ? rule.fg : null;
}

/**
 * @param {string} label
 * @param {LabelColorPolicy | null | undefined} color_policy
 * @returns {string | null}
 */
function findLabelColor(label, color_policy) {
  const exact_color = getRuleColor(color_policy?.exact?.[label]);
  if (exact_color) {
    return exact_color;
  }

  const prefix_rules = color_policy?.prefix;
  if (!isObjectTable(prefix_rules)) {
    return null;
  }

  let best_prefix = '';
  /** @type {string | null} */
  let best_color = null;
  for (const [prefix, rule] of Object.entries(prefix_rules)) {
    const color = getRuleColor(rule);
    if (
      color &&
      label.startsWith(prefix) &&
      prefix.length > best_prefix.length
    ) {
      best_prefix = prefix;
      best_color = color;
    }
  }

  return best_color;
}

/**
 * Create a compact badge element for a label.
 *
 * @param {string} label
 * @param {LabelColorPolicy | null | undefined} [color_policy]
 * @returns {HTMLSpanElement}
 */
export function createLabelBadge(label, color_policy = undefined) {
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

  const configured_color = findLabelColor(label, color_policy);
  if (configured_color) {
    badge_element.style.setProperty('--label-badge-fg', configured_color);
  }

  badge_element.setAttribute('title', label);
  badge_element.setAttribute('aria-label', `Label: ${label}`);
  badge_element.textContent = label;
  return badge_element;
}
