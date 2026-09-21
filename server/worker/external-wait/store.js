import { randomBytes } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { externalWaitFilePath } from '../state-paths.js';
import {
  ADAPTERS,
  HOLD_BUDGET,
  RECORD_STAGES,
  WAIT_ID_RE
} from './contract.js';

/**
 * @typedef {{path: string, exists: boolean, size: number|null, mtime: number|null}} ExpectedResult
 * @typedef {{exit_code: number|null, evidence: string, expected_results: ExpectedResult[], recovery_needed: boolean, completed_at: string}} Terminal
 * @typedef {{state?: string, observed_at?: string, terminal?: Terminal|null, time_limit_seconds?: number|null, run_time_seconds?: number|null, unlimited?: boolean, unparseable?: boolean}} JobObservation
 * @typedef {JobObservation & {adapter:'slurm', ssh_host:string, job_id:string, submitted_at:string, log_path:string, expected:string[], scheduler_submit_time?:string}} SlurmJob
 * @typedef {JobObservation & {adapter:'process', pid:number, submitted_at:string, workdir:string, log_path:string, expected?:string[], process_start?:string|null}} ProcessJob
 * @typedef {SlurmJob|ProcessJob} Job
 * @typedef {'hold'|'done'|'detached'|'completing'|'resumed'|'stopped'} Stage
 * @typedef {{kind:'worker', attempt_id:string}|{kind:'session', session_ref:string, session_pid:number, session_start:string}} Owner
 * @typedef {{digest:string, completed_at:string, recovery_needed:boolean}} Completion
 * @typedef {{mode:'fork'|'fresh', attempt_id:string|null, reserved_at:string|null, launched_at:string|null, session_id:string|null, error:string|null}} Resume
 * @typedef {{wait_id:string, root_dir:string, bead_id:string, owner:Owner, worktree:string, execution_sha:string, registered_at:string, stage:Stage, budget:{turns_total:number, turns_used:number}, next_observation_at:string, error_count:number, last_error:string|null, jobs:Job[], completion:Completion|null, resume:Resume|null}} WaitRecord
 * @typedef {Pick<WaitRecord, 'root_dir'|'bead_id'|'owner'|'worktree'|'execution_sha'|'jobs'> & Partial<Omit<WaitRecord, 'root_dir'|'bead_id'|'owner'|'worktree'|'execution_sha'|'jobs'>>} WaitInput
 * @typedef {(argv:string[], options:{timeout_ms:number}) => Promise<{code:number, stdout:string, stderr:string}>} Run
 * @typedef {{state:string, terminal:boolean, exit_code?:number|null, evidence?:string, expected_results?:ExpectedResult[], recovery_needed?:boolean, error?:string, time_limit_seconds?:number|null, run_time_seconds?:number|null, unlimited?:boolean, unparseable?:boolean}} Observation
 */

const LIVE_STAGES = new Set(['hold', 'detached', 'completing']);
/** @type {Record<Stage, Stage[]>} */
const TRANSITIONS = {
  hold: ['done', 'detached'],
  detached: ['completing'],
  completing: ['resumed'],
  done: [],
  resumed: [],
  stopped: []
};

/** @returns {string} A new opaque wait identifier. */
export function makeWaitId() {
  return `w-${randomBytes(6).toString('hex')}`;
}

/**
 * @param {unknown} value
 * @returns {boolean}
 */
function isTimestamp(value) {
  return (
    typeof value === 'string' &&
    /^\d{4}-\d\d-\d\dT/.test(value) &&
    Number.isFinite(Date.parse(value))
  );
}

/**
 * Validate the durable shape at the write boundary, including after mutation.
 *
 * @param {WaitRecord} record
 */
function validate(record) {
  if (
    !record ||
    !WAIT_ID_RE.test(record.wait_id) ||
    !RECORD_STAGES.includes(record.stage) ||
    !record.root_dir ||
    !record.bead_id ||
    !record.worktree ||
    !record.execution_sha ||
    !isTimestamp(record.registered_at) ||
    !isTimestamp(record.next_observation_at) ||
    !record.budget ||
    !Number.isInteger(record.budget.turns_total) ||
    record.budget.turns_total < 1 ||
    !Number.isInteger(record.budget.turns_used) ||
    record.budget.turns_used < 0 ||
    !Number.isInteger(record.error_count) ||
    record.error_count < 0 ||
    !(record.last_error === null || typeof record.last_error === 'string') ||
    !Array.isArray(record.jobs)
  ) {
    throw new Error('Invalid external wait record');
  }
  const owner = record.owner;
  if (
    !owner ||
    !(owner.kind === 'worker'
      ? typeof owner.attempt_id === 'string' && owner.attempt_id.length > 0
      : owner.kind === 'session' &&
        typeof owner.session_ref === 'string' &&
        owner.session_ref.length > 0 &&
        Number.isInteger(owner.session_pid) &&
        owner.session_pid > 1 &&
        typeof owner.session_start === 'string' &&
        owner.session_start.length > 0)
  ) {
    throw new Error('Invalid external wait owner');
  }
  for (const job of record.jobs) {
    if (
      !job ||
      !ADAPTERS.includes(job.adapter) ||
      !isTimestamp(job.submitted_at) ||
      typeof job.log_path !== 'string' ||
      !job.log_path ||
      (job.expected !== undefined &&
        (!Array.isArray(job.expected) ||
          job.expected.some((item) => typeof item !== 'string'))) ||
      (job.observed_at !== undefined && !isTimestamp(job.observed_at))
    ) {
      throw new Error('Invalid external wait job');
    }
    if (
      job.adapter === 'slurm'
        ? !job.job_id ||
          !job.ssh_host ||
          job.ssh_host.startsWith('-') ||
          !job.expected.length
        : !Number.isInteger(job.pid) ||
          job.pid <= 1 ||
          !path.isAbsolute(job.workdir) ||
          !path.isAbsolute(job.log_path)
    ) {
      throw new Error('Invalid external wait job identity');
    }
    if (
      job.terminal &&
      (!isTimestamp(job.terminal.completed_at) ||
        !(
          job.terminal.exit_code === null ||
          Number.isInteger(job.terminal.exit_code)
        ) ||
        typeof job.terminal.evidence !== 'string' ||
        typeof job.terminal.recovery_needed !== 'boolean' ||
        !Array.isArray(job.terminal.expected_results) ||
        job.terminal.expected_results.some(
          (item) =>
            typeof item.path !== 'string' ||
            typeof item.exists !== 'boolean' ||
            !(item.size === null || Number.isFinite(item.size)) ||
            !(item.mtime === null || Number.isFinite(item.mtime))
        ))
    ) {
      throw new Error('Invalid external wait terminal');
    }
  }
  if (
    record.completion !== null &&
    (!record.completion ||
      !/^[a-f0-9]{64}$/.test(record.completion.digest) ||
      !isTimestamp(record.completion.completed_at) ||
      typeof record.completion.recovery_needed !== 'boolean' ||
      record.jobs.some((job) => !job.terminal))
  ) {
    throw new Error('Invalid external wait completion');
  }
  if (
    record.resume !== null &&
    (!record.resume ||
      !['fork', 'fresh'].includes(record.resume.mode) ||
      [record.resume.reserved_at, record.resume.launched_at].some(
        (value) => value !== null && !isTimestamp(value)
      ) ||
      [
        record.resume.attempt_id,
        record.resume.session_id,
        record.resume.error
      ].some((value) => value !== null && typeof value !== 'string'))
  ) {
    throw new Error('Invalid external wait resume');
  }
}

/**
 * @param {{filePathFor?:(workspace:string)=>string, now?:()=>number, makeId?:()=>string}} [options]
 */
export function createExternalWaitStore({
  filePathFor = externalWaitFilePath,
  now = () => Date.now(),
  makeId = makeWaitId
} = {}) {
  /** @type {string|null} */
  let last_read_error = null;

  /** @param {string} workspace */
  function list(workspace) {
    last_read_error = null;
    try {
      const data = JSON.parse(fs.readFileSync(filePathFor(workspace), 'utf8'));
      if (data.schema !== 1 || !Array.isArray(data.records)) {
        throw new Error('Invalid external wait file');
      }
      /** @type {WaitRecord[]} */
      const records = data.records;
      /** @type {Set<string>} */
      const ids = new Set();
      /** @type {Set<string>} */
      const live_beads = new Set();
      for (const record of records) {
        validate(record);
        if (
          ids.has(record.wait_id) ||
          (LIVE_STAGES.has(record.stage) && live_beads.has(record.bead_id))
        ) {
          throw new Error('Duplicate external wait record');
        }
        ids.add(record.wait_id);
        if (LIVE_STAGES.has(record.stage)) {
          live_beads.add(record.bead_id);
        }
      }
      return records;
    } catch (error) {
      if (/** @type {NodeJS.ErrnoException} */ (error).code !== 'ENOENT') {
        last_read_error =
          error instanceof Error ? error.message : String(error);
      }
      return [];
    }
  }

  /**
   * @param {string} workspace
   * @param {WaitRecord[]} records
   */
  function persist(workspace, records) {
    const file = filePathFor(workspace);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    const tmp = `${file}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify({ schema: 1, records }, null, 2));
    fs.renameSync(tmp, file);
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   */
  function get(workspace, wait_id) {
    return list(workspace).find((record) => record.wait_id === wait_id) || null;
  }

  /**
   * @param {string} workspace
   * @param {string} bead_id
   */
  function findByBead(workspace, bead_id) {
    return (
      list(workspace).find(
        (record) => record.bead_id === bead_id && LIVE_STAGES.has(record.stage)
      ) || null
    );
  }

  /**
   * @param {string} workspace
   * @param {WaitInput} input
   * @returns {WaitRecord}
   */
  function insert(workspace, input) {
    const timestamp = new Date(now()).toISOString();
    /** @type {WaitRecord} */
    const record = structuredClone({
      wait_id: makeId(),
      registered_at: timestamp,
      stage: 'hold',
      budget: { turns_total: HOLD_BUDGET.turns_total, turns_used: 0 },
      next_observation_at: timestamp,
      error_count: 0,
      last_error: null,
      completion: null,
      resume: null,
      ...input,
      jobs: input.jobs.map((job) => ({
        state: 'UNKNOWN',
        observed_at: timestamp,
        terminal: null,
        ...job
      }))
    });
    validate(record);
    const records = list(workspace);
    if (
      records.some(
        (item) =>
          item.wait_id === record.wait_id ||
          (item.bead_id === record.bead_id &&
            LIVE_STAGES.has(item.stage) &&
            LIVE_STAGES.has(record.stage))
      )
    ) {
      throw new Error('External wait already exists');
    }
    records.push(record);
    persist(workspace, records);
    return structuredClone(record);
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   * @param {(record:WaitRecord)=>void} mutate
   * @returns {WaitRecord}
   */
  function update(workspace, wait_id, mutate) {
    const records = list(workspace);
    const index = records.findIndex((item) => item.wait_id === wait_id);
    if (index < 0) {
      throw new Error('External wait not found');
    }
    const previous = records[index];
    const record = structuredClone(previous);
    mutate(record);
    validate(record);
    if (
      record.wait_id !== previous.wait_id ||
      record.bead_id !== previous.bead_id ||
      record.root_dir !== previous.root_dir
    ) {
      throw new Error('External wait identity is immutable');
    }
    if (
      record.stage !== previous.stage &&
      record.stage !== 'stopped' &&
      !TRANSITIONS[previous.stage].includes(record.stage)
    ) {
      throw new Error(
        `Illegal external wait transition: ${previous.stage} -> ${record.stage}`
      );
    }
    records[index] = record;
    persist(workspace, records);
    return structuredClone(record);
  }

  /**
   * @param {string} workspace
   * @param {string} wait_id
   * @returns {boolean}
   */
  function remove(workspace, wait_id) {
    const records = list(workspace);
    const remaining = records.filter((item) => item.wait_id !== wait_id);
    if (remaining.length === records.length) {
      return false;
    }
    persist(workspace, remaining);
    return true;
  }

  return {
    makeWaitId: makeId,
    list,
    get,
    findByBead,
    insert,
    update,
    remove,
    get last_read_error() {
      return last_read_error;
    }
  };
}
