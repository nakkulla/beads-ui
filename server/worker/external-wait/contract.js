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

/**
 * Contract copy of `external_wait.observation.interval_policy`: the two
 * interval values above are defaults, and only the named override fields may be
 * replaced by the beads-ui server-global timing settings. Error backoff is not
 * an override field.
 */
export const INTERVAL_POLICY = Object.freeze({
  values: 'defaults',
  override_owner: 'beads_ui_worker',
  override_source: 'server_global_timing_settings',
  override_fields: Object.freeze([
    'slurm_interval_seconds',
    'process_interval_seconds'
  ])
});

/** Supported external job observation adapters of a stored record. */
export const ADAPTERS = Object.freeze(['slurm', 'process', 'sjob_local']);

/**
 * Adapters the registration API accepts. `sjob_local` is created only by an
 * in-place takeover (UI-qbgj §3.5), never registered.
 */
export const REGISTRATION_ADAPTERS = Object.freeze(['slurm', 'process']);

/** States of the persisted takeover progress marker on a slurm job. */
export const TAKEOVER_PROGRESS_STATES = Object.freeze(['pending', 'unknown']);

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
