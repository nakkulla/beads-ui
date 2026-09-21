import { observeProcessJob } from './adapters/process.js';
import { observeSlurmJob } from './adapters/slurm.js';
import { OBSERVATION } from './contract.js';
import { completionDigest } from './decision.js';

/**
 * @typedef {import('./store.js').WaitRecord} WaitRecord
 * @typedef {(workspace:string, record:WaitRecord)=>void|Promise<void>} RecordCallback
 */

/**
 * @param {{store:ReturnType<import('./store.js').createExternalWaitStore>, listWorkspaces:()=>string[], run:import('./store.js').Run, now?:()=>number, onRecordChanged?:RecordCallback, onCompletion?:RecordCallback, log?:(message:string)=>void, interval_ms?:number}} options
 */
export function createExternalWaitObserver({
  store,
  listWorkspaces,
  run,
  now = () => Date.now(),
  onRecordChanged,
  onCompletion,
  log = () => {},
  interval_ms = 15000
}) {
  /** @type {Map<string, Promise<WaitRecord|null>>} */
  const active = new Map();
  /** @type {ReturnType<typeof setInterval>|null} */
  let timer = null;
  /** @type {Promise<void>|null} */
  let ticking = null;

  /**
   * @param {RecordCallback|undefined} callback
   * @param {string} workspace
   * @param {WaitRecord} record
   */
  async function notify(callback, workspace, record) {
    if (callback) {
      try {
        await callback(workspace, structuredClone(record));
      } catch {
        log('External wait callback failed');
      }
    }
  }

  /**
   * @param {string} workspace
   * @param {WaitRecord} record
   */
  async function finish(workspace, record) {
    if (
      record.completion &&
      (record.stage === 'hold' || record.stage === 'detached')
    ) {
      record = store.update(workspace, record.wait_id, (current) => {
        current.stage = current.stage === 'hold' ? 'done' : 'completing';
      });
      await notify(onRecordChanged, workspace, record);
      if (record.stage === 'completing') {
        await notify(onCompletion, workspace, record);
      }
    }
    return record;
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   * @returns {Promise<WaitRecord|null>}
   */
  async function observe(workspace, wait_id) {
    const record = store.get(workspace, wait_id);
    if (!record || (record.stage !== 'hold' && record.stage !== 'detached')) {
      return record;
    }
    if (record.completion) {
      return finish(workspace, record);
    }
    /** @type {string[]} */
    const errors = [];
    for (const job of record.jobs) {
      if (job.terminal) {
        continue;
      }
      try {
        const observation =
          job.adapter === 'slurm'
            ? await observeSlurmJob(job, { run, now })
            : await observeProcessJob(job, { run });
        if (observation.error) {
          throw new Error(observation.error);
        }
        job.state = observation.state;
        job.observed_at = new Date(now()).toISOString();
        if (job.adapter === 'slurm') {
          job.time_limit_seconds = observation.time_limit_seconds;
          job.run_time_seconds = observation.run_time_seconds;
          job.unlimited = observation.unlimited;
          job.unparseable = observation.unparseable;
        }
        if (observation.terminal) {
          job.terminal = {
            exit_code: observation.exit_code ?? null,
            evidence: observation.evidence || '',
            expected_results: observation.expected_results || [],
            recovery_needed: observation.recovery_needed !== false,
            completed_at: job.observed_at
          };
        }
      } catch (error) {
        errors.push(
          error instanceof Error
            ? error.message
            : 'External job observation failed'
        );
      }
    }
    // A stop/check/hold request may have changed ownership while SSH was pending.
    const latest = store.get(workspace, wait_id);
    if (
      !latest ||
      latest.completion ||
      (latest.stage !== 'hold' && latest.stage !== 'detached')
    ) {
      return latest;
    }
    const timestamp = now();
    const observed = store.update(workspace, wait_id, (current) => {
      current.jobs = record.jobs;
      current.error_count = errors.length ? current.error_count + 1 : 0;
      current.last_error = errors.length ? errors.join('; ') : null;
      const intervals = record.jobs
        .filter((job) => !job.terminal)
        .map((job) =>
          job.adapter === 'slurm'
            ? OBSERVATION.slurm_interval_seconds
            : OBSERVATION.process_interval_seconds
        );
      const seconds = errors.length
        ? OBSERVATION.error_backoff_seconds[
            Math.min(
              current.error_count - 1,
              OBSERVATION.error_backoff_seconds.length - 1
            )
          ]
        : intervals.length
          ? Math.min(...intervals)
          : 0;
      current.next_observation_at = new Date(
        timestamp + seconds * 1000
      ).toISOString();
      if (current.jobs.every((job) => job.terminal)) {
        current.completion = {
          digest: completionDigest(current.jobs),
          completed_at: new Date(timestamp).toISOString(),
          recovery_needed: current.jobs.some(
            (job) => job.terminal?.recovery_needed
          )
        };
      }
    });
    // Completion is durable in its original stage before any stage/callback effect.
    await notify(onRecordChanged, workspace, observed);
    const current = store.get(workspace, wait_id);
    return current ? finish(workspace, current) : null;
  }

  /**
   * Coalesce manual checks with the periodic observation of the same record.
   *
   * @param {string} workspace
   * @param {string} wait_id
   * @returns {Promise<WaitRecord|null>}
   */
  function observeRecord(workspace, wait_id) {
    const key = JSON.stringify([workspace, wait_id]);
    const pending = active.get(key);
    if (pending) {
      return pending;
    }
    const promise = observe(workspace, wait_id).finally(() =>
      active.delete(key)
    );
    active.set(key, promise);
    return promise;
  }

  /** @returns {Promise<void>} */
  async function scan() {
    const timestamp = now();
    const due = listWorkspaces()
      .flatMap((workspace) =>
        store
          .list(workspace)
          .filter(
            (record) =>
              (record.stage === 'hold' || record.stage === 'detached') &&
              Date.parse(record.next_observation_at) <= timestamp
          )
          .map((record) => ({ workspace, record }))
      )
      .sort(
        (left, right) =>
          Date.parse(left.record.next_observation_at) -
            Date.parse(right.record.next_observation_at) ||
          Date.parse(left.record.registered_at) -
            Date.parse(right.record.registered_at)
      );
    for (const { workspace, record } of due) {
      try {
        await observeRecord(workspace, record.wait_id);
      } catch {
        log(`External wait observation failed: ${record.wait_id}`);
      }
    }
  }

  /** @returns {Promise<void>} */
  function tick() {
    if (!ticking) {
      ticking = scan().finally(() => {
        ticking = null;
      });
    }
    return ticking;
  }

  function start() {
    if (timer === null) {
      // Wait ownership outlives WS clients, so this interval has no client gate.
      timer = setInterval(() => {
        void tick().catch(() => log('External wait tick failed'));
      }, interval_ms);
      timer.unref();
    }
  }

  function stop() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  }

  return { observeRecord, tick, start, stop };
}
