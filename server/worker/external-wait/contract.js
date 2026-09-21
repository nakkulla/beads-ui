/**
 * External-wait code-level field registry (ADR 0012). dotfiles
 * `docs/contracts/workflow-state.yaml` owns these values; beads-ui only
 * copies and consumes its `external_wait` contract block.
 */

/** Metadata key whose presence blocks ordinary admission. */
export const EXTERNAL_WAIT_KEY = 'external_wait';

/** Canonical wait record identifier format. */
export const WAIT_ID_RE = Object.freeze(/^w-[0-9a-f]{12}$/);

/** Maximum number and duration of foreground hold calls. */
export const HOLD_BUDGET = Object.freeze({ turns_total: 3, turn_seconds: 540 });

/** Observation intervals and error backoff, in seconds. */
export const OBSERVATION = Object.freeze({
  slurm_interval_seconds: 120,
  process_interval_seconds: 30,
  error_backoff_seconds: Object.freeze([60, 120, 300, 900])
});

/** Supported external job observation adapters. */
export const ADAPTERS = Object.freeze(['slurm', 'process']);

/** Persisted external wait record stages. */
export const RECORD_STAGES = Object.freeze([
  'hold',
  'done',
  'detached',
  'completing',
  'resumed',
  'stopped'
]);

/** Worker attempt cause for a proven external wait. */
export const EXTERNAL_WAIT_CAUSE = 'external_job';

/** Prefix of a session's external-wait terminal result line. */
export const RESULT_LINE_PREFIX = '대기 · external:';

/** Prefix of an external-wait note on the owning Bead. */
export const NOTES_LINE_PREFIX = 'external-wait: ';

/**
 * Read an own string value without validating its format. Admission must check
 * key presence directly: empty and non-string values still block admission.
 *
 * @param {Record<string, unknown>|null|undefined} metadata
 * @returns {string}
 */
export function externalWaitIdOf(metadata) {
  if (!metadata || !Object.hasOwn(metadata, EXTERNAL_WAIT_KEY)) {
    return '';
  }
  const wait_id = metadata[EXTERNAL_WAIT_KEY];
  return typeof wait_id === 'string' ? wait_id : '';
}
