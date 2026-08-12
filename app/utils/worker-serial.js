import { workerLabels } from './worker-eligibility.js';

export const WORKER_SERIAL_LABEL = 'worker-serial';

/**
 * Whether a Bead must execute exclusively through its serial lineage.
 *
 * @param {unknown} labels
 * @returns {boolean}
 */
export function isWorkerSerial(labels) {
  return workerLabels(labels).includes(WORKER_SERIAL_LABEL);
}
