import { createHash } from 'node:crypto';
import { HOLD_BUDGET } from './contract.js';

/**
 * @param {import('./store.js').Job[]} jobs
 * @param {{turns_total:number, turn_seconds:number}} [budget]
 * @returns {'done'|'detached'|'hold'}
 */
export function registrationDecision(jobs, budget = HOLD_BUDGET) {
  const pending = jobs.filter((job) => !job.terminal);
  if (pending.length === 0) {
    return 'done';
  }
  for (const job of pending) {
    if (job.adapter !== 'slurm') {
      continue;
    }
    // 첫 관찰이 상태를 못 읽은 잡(UNKNOWN)은 §4 규칙 4의 hold 쪽이다.
    if (
      job.state !== 'RUNNING' &&
      job.state !== 'COMPLETING' &&
      job.state !== 'UNKNOWN'
    ) {
      return 'detached';
    }
    if (
      job.state === 'RUNNING' &&
      (job.unlimited ||
        job.unparseable ||
        !Number.isFinite(job.time_limit_seconds) ||
        !Number.isFinite(job.run_time_seconds) ||
        /** @type {number} */ (job.time_limit_seconds) -
          /** @type {number} */ (job.run_time_seconds) >
          budget.turns_total * budget.turn_seconds)
    ) {
      return 'detached';
    }
  }
  return 'hold';
}

/**
 * @param {Pick<import('./store.js').WaitRecord, 'budget'>} record
 * @returns {{decision:'hold'|'detached', observe:boolean}}
 */
export function holdDecision(record) {
  return record.budget.turns_used >= record.budget.turns_total
    ? { decision: 'detached', observe: false }
    : { decision: 'hold', observe: true };
}

/**
 * @param {unknown} value
 * @returns {unknown} Recursively sorted JSON keys, preserving array order.
 */
function canonical(value) {
  if (Array.isArray(value)) {
    return value.map(canonical);
  }
  if (value !== null && typeof value === 'object') {
    const fields = /** @type {Record<string, unknown>} */ (value);
    return Object.fromEntries(
      Object.keys(fields)
        .sort()
        .map((key) => [key, canonical(fields[key])])
    );
  }
  return value;
}

/**
 * @param {import('./store.js').Job[]} jobs
 * @returns {string}
 */
export function completionDigest(jobs) {
  const projection = jobs.map((job) => {
    if (!job.terminal) {
      throw new Error('Completion requires terminal jobs');
    }
    return {
      adapter: job.adapter,
      ...(job.adapter === 'slurm' ? { job_id: job.job_id } : { pid: job.pid }),
      exit_code: job.terminal.exit_code,
      evidence: job.terminal.evidence,
      expected_results: job.terminal.expected_results.map(
        ({ path, exists, size, mtime }) => ({ path, exists, size, mtime })
      ),
      recovery_needed: job.terminal.recovery_needed
    };
  });
  return createHash('sha256')
    .update(JSON.stringify(canonical(projection)))
    .digest('hex');
}
