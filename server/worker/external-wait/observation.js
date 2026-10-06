/**
 * Effective external-wait observation values: the contract copy
 * ({@link OBSERVATION}) with the two interval fields the contract lets
 * beads-ui override (`INTERVAL_POLICY.override_fields`) replaced by the
 * server-global timing settings. Error backoff is never overridden.
 */
import { getTimingSettings } from '../../timing-settings.js';
import { INTERVAL_POLICY, OBSERVATION } from './contract.js';

/**
 * The observation values in effect right now. Read at the moment a time is
 * computed; a recorded `next_observation_at` is never rewritten.
 *
 * @returns {{ slurm_interval_seconds: number, process_interval_seconds: number, error_backoff_seconds: ReadonlyArray<number> }}
 */
export function effectiveObservation() {
  const settings = getTimingSettings();
  const effective = { ...OBSERVATION };
  for (const field of INTERVAL_POLICY.override_fields) {
    const value = settings[`external_wait_${field}`];
    if (typeof value === 'number') {
      /** @type {Record<string, unknown>} */ (effective)[field] = value;
    }
  }
  return effective;
}

/**
 * The observation interval of one job: `process` jobs use the process
 * interval, and `slurm` and `sjob_local` (a remote ssh read alike, UI-qbgj
 * §3.5) use the slurm interval.
 *
 * @param {{adapter?: unknown}} job
 * @param {{ slurm_interval_seconds: number, process_interval_seconds: number }} observation
 * @returns {number}
 */
export function jobIntervalSeconds(job, observation) {
  return job.adapter === 'process'
    ? observation.process_interval_seconds
    : observation.slurm_interval_seconds;
}
