import { externalSpawnedClass } from '../../../app/protocol.js';
import { observeProcessJob } from './adapters/process.js';
import {
  SPAWNED_COMPLETED_ROW_LIMIT,
  observeSlurmJob
} from './adapters/slurm.js';
import { completionDigest } from './decision.js';
import { effectiveObservation } from './observation.js';

/**
 * @typedef {import('./store.js').WaitRecord} WaitRecord
 * @typedef {(workspace:string, record:WaitRecord)=>void|Promise<void>} RecordCallback
 * @typedef {import('./store.js').SlurmJob} SlurmJob
 * @typedef {import('./store.js').Spawned} Spawned
 * @typedef {import('./store.js').SpawnedRow} SpawnedRow
 */

/**
 * The record context of one registered job's sub-job read (UI-q15q §3.1):
 * every registered id is excluded, previously nonterminal rows come back
 * regardless of the row cap, and a later-started sibling in the same place
 * bounds the submission window so each sub-job belongs to one registered job.
 * A sibling without an anchor has not started and owns no sub-job. The
 * sibling ids on the same host let the remote read a start the record has not
 * stored yet, so the first observation already attributes each sub-job once.
 *
 * @param {SlurmJob} job
 * @param {import('./store.js').Job[]} jobs
 * @returns {import('./adapters/slurm.js').SpawnedContext}
 */
function spawnedContext(job, jobs) {
  const own = job.anchor;
  return {
    exclude: jobs.flatMap((other) =>
      other.adapter === 'slurm' ? [other.job_id] : []
    ),
    previous: (job.spawned?.rows || [])
      .filter((row) =>
        ['running', 'pending', 'unknown'].includes(externalSpawnedClass(row))
      )
      .map((row) => row.job_id),
    later: jobs.flatMap((other) =>
      other !== job &&
      other.adapter === 'slurm' &&
      other.ssh_host === job.ssh_host &&
      other.anchor &&
      (!own ||
        (other.anchor.user === own.user &&
          other.anchor.workdir === own.workdir))
        ? [other.anchor.started_at]
        : []
    ),
    siblings: jobs.flatMap((other) =>
      other !== job &&
      other.adapter === 'slurm' &&
      other.ssh_host === job.ssh_host &&
      other.job_id !== job.job_id
        ? [other.job_id]
        : []
    )
  };
}

/**
 * The earliest stored start of a later-started registered sibling in the same
 * place — the end of this job's submission window, `''` without one.
 *
 * @param {SlurmJob} job
 * @param {import('./store.js').Job[]} jobs
 * @returns {string}
 */
function spawnedCutoff(job, jobs) {
  const own = job.anchor;
  if (!own) {
    return '';
  }
  /** @type {string[]} */
  const starts = [];
  for (const other of jobs) {
    if (
      other !== job &&
      other.adapter === 'slurm' &&
      other.ssh_host === job.ssh_host &&
      other.anchor &&
      other.anchor.user === own.user &&
      other.anchor.workdir === own.workdir &&
      other.anchor.started_at > own.started_at
    ) {
      starts.push(other.anchor.started_at);
    }
  }
  return starts.sort()[0] || '';
}

/**
 * Merge one observation's sub-job material into the stored snapshot
 * (UI-q15q §3.4, §4). Failed or absent material keeps the stored value.
 *
 * With a completion file the material is the whole membership since the
 * anchor: its counts stand, and a stored row it no longer carries is dropped —
 * it belongs to another registered job now.
 *
 * Without one the counts start from the whole current queue. A stored row that
 * is neither a returned row nor a capped member (`truncated`) has left the
 * queue: it stays, a nonterminal one as `UNKNOWN`, and is counted. Previously
 * omitted completed rows count again unless they are still in the queue. A
 * stored row submitted at or after `cutoff` belongs to a later sibling and is
 * not carried. Completed rows are capped, oldest end first.
 *
 * @param {Spawned|undefined} previous
 * @param {import('./adapters/slurm.js').SpawnedReading|undefined} material
 * @param {string} [cutoff]
 * @returns {Spawned|undefined}
 */
export function mergeSpawned(previous, material, cutoff = '') {
  if (!material || material.status !== 'ok') {
    return previous;
  }
  const prior_rows = previous?.rows || [];
  const prior = new Map(prior_rows.map((row) => [row.job_id, row]));
  /** @type {Map<string, SpawnedRow>} */
  const merged = new Map();
  for (const row of material.rows) {
    const old = prior.get(row.job_id);
    merged.set(row.job_id, {
      ...row,
      name: row.name || old?.name || '',
      rule: row.rule || old?.rule || ''
    });
  }
  /** @type {import('./store.js').SpawnedCounts} */
  const counts = { ...material.counts, unknown: 0 };
  if (material.completion_log === 'unsupported') {
    const truncated = material.truncated || [];
    const members = new Set([
      ...merged.keys(),
      ...truncated.map((entry) => entry.job_id)
    ]);
    for (const old of prior_rows) {
      if (members.has(old.job_id) || (cutoff && old.submitted_at >= cutoff)) {
        continue;
      }
      const group = externalSpawnedClass(old);
      const carried =
        group === 'running' || group === 'pending'
          ? { ...old, state: 'UNKNOWN' }
          : old;
      merged.set(old.job_id, carried);
      counts[externalSpawnedClass(carried)] += 1;
    }
    const omitted = previous?.omitted || 0;
    const kept_ends = prior_rows
      .filter((row) => externalSpawnedClass(row) === 'completed')
      .map((row) => row.ended_at || '')
      .filter(Boolean)
      .sort();
    const oldest = kept_ends[0];
    let still = 0;
    if (omitted > 0 && oldest) {
      for (const entry of [
        ...material.rows
          .filter((row) => externalSpawnedClass(row) === 'completed')
          .map((row) => ({ job_id: row.job_id, ended_at: row.ended_at || '' })),
        ...truncated
      ]) {
        if (
          !prior.has(entry.job_id) &&
          entry.ended_at &&
          entry.ended_at <= oldest
        ) {
          still += 1;
        }
      }
    }
    counts.completed += Math.max(0, omitted - still);
  }
  const rows = [...merged.values()];
  const kept = new Set(
    rows
      .filter((row) => externalSpawnedClass(row) === 'completed')
      .sort((a, b) =>
        String(b.ended_at || '').localeCompare(String(a.ended_at || ''))
      )
      .slice(0, SPAWNED_COMPLETED_ROW_LIMIT)
  );
  return {
    total:
      counts.running +
      counts.pending +
      counts.completed +
      counts.failed +
      counts.unknown,
    counts,
    rows: rows
      .filter(
        (row) => externalSpawnedClass(row) !== 'completed' || kept.has(row)
      )
      .sort((a, b) => a.submitted_at.localeCompare(b.submitted_at)),
    omitted: Math.max(0, counts.completed - kept.size)
  };
}

/**
 * Store the display-only fields of a registered slurm job. They never touch
 * the job's state, terminal proof or the record's error accounting.
 *
 * @param {SlurmJob} job
 * @param {import('./store.js').Observation} observation
 * @param {import('./store.js').Job[]} jobs
 */
function applySpawned(job, observation, jobs) {
  if (observation.name) {
    job.name = observation.name;
  }
  if (observation.anchor) {
    job.anchor = observation.anchor;
  }
  const spawned = mergeSpawned(
    job.spawned,
    observation.spawned,
    spawnedCutoff(job, jobs)
  );
  if (spawned) {
    job.spawned = spawned;
  }
}

/**
 * Store the display-only pending capacity of a slurm job (UI-qbgj §3.1). A
 * failed read keeps the stored value; a job observed in any other known state
 * drops it. It never touches the job's state, terminal proof or the record's
 * error accounting.
 *
 * @param {SlurmJob} job
 * @param {import('./store.js').Observation} observation
 */
function applyCapacity(job, observation) {
  if (observation.state === 'PENDING') {
    if (observation.capacity?.status === 'ok') {
      job.capacity = observation.capacity.capacity;
    }
  } else if (observation.state !== 'UNKNOWN') {
    delete job.capacity;
  }
}

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
            ? await observeSlurmJob(job, {
                run,
                now,
                spawned: spawnedContext(job, record.jobs)
              })
            : await observeProcessJob(job, { run });
        if (
          job.adapter === 'process' &&
          'process_start' in observation &&
          (typeof observation.process_start === 'string' ||
            observation.process_start === null)
        ) {
          job.process_start = observation.process_start;
        }
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
          applySpawned(job, observation, record.jobs);
          applyCapacity(job, observation);
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
    const effective_observation = effectiveObservation();
    const observed = store.update(workspace, wait_id, (current) => {
      current.jobs = record.jobs;
      current.error_count = errors.length ? current.error_count + 1 : 0;
      current.last_error = errors.length ? errors.join('; ') : null;
      const intervals = record.jobs
        .filter((job) => !job.terminal)
        .map((job) =>
          job.adapter === 'slurm'
            ? effective_observation.slurm_interval_seconds
            : effective_observation.process_interval_seconds
        );
      const seconds = errors.length
        ? effective_observation.error_backoff_seconds[
            Math.min(
              current.error_count - 1,
              effective_observation.error_backoff_seconds.length - 1
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

  return {
    observeRecord,
    tick,
    start,
    stop,
    /** @param {RecordCallback|undefined} callback */
    setOnCompletion(callback) {
      onCompletion = callback;
    },
    /** @param {RecordCallback|undefined} callback */
    setOnRecordChanged(callback) {
      onRecordChanged = callback;
    }
  };
}
