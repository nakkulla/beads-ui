export const WORKER_INELIGIBLE_LABEL = 'worker-ineligible';

/**
 * Keep only label entries the workflow contract can name.
 *
 * @param {unknown} value
 * @returns {string[]}
 */
export function workerLabels(value) {
  return Array.isArray(value)
    ? value.filter((entry) => typeof entry === 'string')
    : [];
}

/**
 * Whether a Bead is explicitly limited to the interactive lane.
 *
 * @param {unknown} labels
 * @returns {boolean}
 */
export function isWorkerIneligible(labels) {
  return workerLabels(labels).includes(WORKER_INELIGIBLE_LABEL);
}
