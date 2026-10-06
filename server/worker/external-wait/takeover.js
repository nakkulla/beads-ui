import path from 'node:path';
import {
  SLURM_RUNNING_STATES,
  SLURM_TERMINAL_STATES
} from '../../../app/protocol.js';
import { SSH_HOST_RE, remoteShellArgv, shellQuote } from './adapters/slurm.js';

/**
 * `▶ 바로 실행` (UI-qbgj §3.2, §3.4): the one explicit action that mutates an
 * external job. `sjob takeover` on the job's own ssh host holds the pending
 * Slurm job, starts the same launch locally and cancels the Slurm job; the
 * record then replaces that job in place with an `sjob_local` job.
 *
 * @typedef {import('./store.js').SlurmJob} SlurmJob
 * @typedef {import('./store.js').SjobLocalJob} SjobLocalJob
 * @typedef {import('./store.js').Run} Run
 * @typedef {{state:'started'|'done', local_id:string, pid:number, process_start:string, workdir:string, log_path:string, exitcode_path:string, cpus:number, mem_gb:number, slurm_cancel_failed:boolean|null}} TakeoverResult
 * @typedef {{kind:'started', result:TakeoverResult}|{kind:'refused', reason:string, message:string}|{kind:'unknown', reason:string, message:string}} TakeoverOutcome
 * @typedef {{kind:'started', result:TakeoverResult}|{kind:'clear'}|{kind:'unresolved'}} RecoveryOutcome
 */

/** Bound of one takeover or recovery ssh in ms (UI-qbgj §3.4 step 5). */
export const TAKEOVER_TIMEOUT_MS = 60000;

/** The remote takeover can outlive its 60 s ssh but its pre-hold steps are timeout-bounded, so past this window an unheld `no_takeover` read is final (UI-qbgj §3.4). */
export const TAKEOVER_SETTLE_MS = 5 * 60_000;

// A non-interactive ssh PATH lacks `sjob`; it is installed under ~/.local/bin.
const SJOB = '"$HOME/.local/bin/sjob"';

/** Korean sentence for each `sjob takeover` refusal reason (UI-qbgj §3.2). */
export const TAKEOVER_REASON_MESSAGES = Object.freeze({
  not_found: 'Slurm 작업을 찾지 못해 바로 실행하지 않았습니다',
  not_owner: '다른 사용자의 Slurm 작업이라 바로 실행할 수 없습니다',
  not_pending: 'Slurm 작업이 대기 중이 아니어서 바로 실행하지 않았습니다',
  no_launch_record:
    'sjob 실행 기록(launch.json)이 없는 작업이라 바로 실행할 수 없습니다',
  workflow_local_profile_missing:
    '워크플로에 profiles/server-local 프로필이 없어 바로 실행할 수 없습니다',
  insufficient_host_capacity:
    '요청한 CPU·메모리가 서버의 실제 여유보다 커서 바로 실행하지 않았습니다',
  local_start_failed:
    '로컬 실행을 시작하지 못해 Slurm 작업을 대기 상태로 되돌렸습니다',
  busy: '같은 작업의 바로 실행이 진행 중이거나 이전 결과가 남아 있어 결과를 확인합니다'
});

/** Reply sentence when the takeover outcome could not be read. */
export const TAKEOVER_UNKNOWN_MESSAGE =
  '바로 실행 결과를 확인하지 못했습니다 — 다음 관찰에서 결과를 확인합니다';

/**
 * The Korean sentence of a refusal reason; an unknown reason keeps the raw
 * reason and message.
 *
 * @param {string} reason
 * @param {string} [message]
 * @returns {string}
 */
export function takeoverReasonMessage(reason, message = '') {
  if (Object.hasOwn(TAKEOVER_REASON_MESSAGES, reason)) {
    return TAKEOVER_REASON_MESSAGES[
      /** @type {keyof typeof TAKEOVER_REASON_MESSAGES} */ (reason)
    ];
  }
  return `바로 실행이 거부되었습니다 · ${reason}${message ? ` · ${message}` : ''}`;
}

/**
 * The single job `▶ 바로 실행` may take over, or null (UI-qbgj §3.4 노출): the
 * record is at `hold` or `detached` without a completion, holds exactly one
 * job, and that job is a nonterminal `PENDING` slurm job without a takeover
 * marker or a known prerequisite blocker. The stored record and its public
 * projection share this check.
 *
 * @param {{stage?: unknown, completion?: unknown, jobs?: unknown}|null|undefined} record
 * @returns {SlurmJob|null}
 */
export function takeoverTarget(record) {
  const jobs = Array.isArray(record?.jobs) ? record.jobs : [];
  const job = jobs[0];
  if (
    !record ||
    (record.stage !== 'hold' && record.stage !== 'detached') ||
    record.completion ||
    jobs.length !== 1 ||
    !job ||
    job.adapter !== 'slurm' ||
    job.state !== 'PENDING' ||
    job.terminal ||
    job.takeover ||
    job.capacity?.takeover_blocker
  ) {
    return null;
  }
  return job;
}

/**
 * The last stdout line that parses as a JSON object; sjob prints exactly one.
 *
 * @param {string} text
 * @returns {Record<string, unknown>|null}
 */
function lastJsonObject(text) {
  const lines = String(text || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('{'));
  for (const line of lines.reverse()) {
    try {
      const value = JSON.parse(line);
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        return value;
      }
    } catch {
      // Not the JSON line.
    }
  }
  return null;
}

/**
 * A strictly valid `started`/`done` takeover record for `job_id`, or null.
 *
 * @param {Record<string, unknown>} value
 * @param {string} job_id
 * @returns {TakeoverResult|null}
 */
export function takeoverResult(value, job_id) {
  const result = /** @type {Record<string, any>} */ (value);
  if (
    result.ok !== true ||
    (result.state !== 'started' && result.state !== 'done') ||
    result.slurm_job_id !== job_id ||
    typeof result.local_id !== 'string' ||
    !/^L\d+$/.test(result.local_id) ||
    !Number.isInteger(result.pid) ||
    result.pid <= 1 ||
    typeof result.process_start !== 'string' ||
    ![result.workdir, result.log_path, result.exitcode_path].every(
      (item) => typeof item === 'string' && path.posix.isAbsolute(item)
    ) ||
    !Number.isInteger(result.cpus) ||
    result.cpus < 1 ||
    !Number.isInteger(result.mem_gb) ||
    result.mem_gb < 1 ||
    !(
      result.slurm_cancel_failed === undefined ||
      result.slurm_cancel_failed === null ||
      typeof result.slurm_cancel_failed === 'boolean'
    )
  ) {
    return null;
  }
  return {
    state: result.state,
    local_id: result.local_id,
    pid: result.pid,
    process_start: result.process_start.trim(),
    workdir: result.workdir,
    log_path: result.log_path,
    exitcode_path: result.exitcode_path,
    cpus: result.cpus,
    mem_gb: result.mem_gb,
    slurm_cancel_failed:
      typeof result.slurm_cancel_failed === 'boolean'
        ? result.slurm_cancel_failed
        : null
  };
}

/**
 * The `sjob_local` job that replaces `job` in place (UI-qbgj §3.5). The ssh
 * host, expected paths and name come from the slurm job, never from the
 * result's `host`; the last sub-job snapshot is kept for display and the
 * pending capacity is dropped. A `started` record has not confirmed the Slurm
 * cancellation, so only `done` with `slurm_cancel_failed: false` clears it.
 *
 * @param {SlurmJob} job
 * @param {TakeoverResult} result
 * @param {string} at - The takeover time (the marker's `requested_at`).
 * @returns {SjobLocalJob}
 */
export function sjobLocalJob(job, result, at) {
  return {
    adapter: 'sjob_local',
    ssh_host: job.ssh_host,
    local_id: result.local_id,
    pid: result.pid,
    process_start: result.process_start,
    workdir: result.workdir,
    log_path: result.log_path,
    exitcode_path: result.exitcode_path,
    submitted_at: at,
    expected: [...job.expected],
    ...(job.name === undefined ? {} : { name: job.name }),
    cpus: result.cpus,
    mem_gb: result.mem_gb,
    takeover_from: {
      job_id: job.job_id,
      at,
      cancel_failed: !(
        result.state === 'done' && result.slurm_cancel_failed === false
      )
    },
    ...(job.spawned === undefined ? {} : { spawned: job.spawned }),
    state: 'UNKNOWN',
    observed_at: at,
    terminal: null
  };
}

/**
 * Run `sjob takeover <id> -c <cpus> -m <mem_gb> --json` on the job's ssh host
 * (UI-qbgj §3.4 step 5). sjob exits 1 on refusal yet still prints its JSON, so
 * stdout is read whatever the exit code. A `busy` refusal can mean a holding
 * record is preserved on the host, so it is read as an unknown outcome and
 * left to recovery; every other refusal released the job and changed nothing.
 * An ssh failure, timeout or unreadable output is an unknown outcome.
 *
 * @param {SlurmJob} job
 * @param {{cpus:number, mem_gb:number}} request
 * @param {Run} run
 * @returns {Promise<TakeoverOutcome>}
 */
export async function requestTakeover(job, { cpus, mem_gb }, run) {
  /** @type {{code:number, stdout:string, stderr:string}} */
  let response;
  try {
    response = await run(
      remoteShellArgv(
        job.ssh_host,
        `${SJOB} takeover ${shellQuote(job.job_id)} -c ${cpus} -m ${mem_gb} --json`
      ),
      { timeout_ms: TAKEOVER_TIMEOUT_MS }
    );
  } catch {
    return {
      kind: 'unknown',
      reason: 'takeover_unknown',
      message: TAKEOVER_UNKNOWN_MESSAGE
    };
  }
  const value = lastJsonObject(response.stdout);
  if (value?.ok === true) {
    const result = takeoverResult(value, job.job_id);
    if (result) {
      return { kind: 'started', result };
    }
  } else if (
    value?.ok === false &&
    typeof value.reason === 'string' &&
    value.reason.length > 0
  ) {
    const message = typeof value.message === 'string' ? value.message : '';
    if (value.reason === 'busy') {
      return {
        kind: 'unknown',
        reason: 'busy',
        message: takeoverReasonMessage('busy')
      };
    }
    return {
      kind: 'refused',
      reason: value.reason,
      message: takeoverReasonMessage(value.reason, message)
    };
  }
  return {
    kind: 'unknown',
    reason: 'takeover_unknown',
    message: TAKEOVER_UNKNOWN_MESSAGE
  };
}

/**
 * The read-only recovery program: the saved takeover record first, then the
 * original job's queue state, reason and priority. Reading the record first
 * means a hold placed between the two reads shows as held, never as unheld.
 *
 * @param {SlurmJob} job
 * @returns {string}
 */
function recoveryScript(job) {
  const id = shellQuote(job.job_id);
  return [
    'set +e',
    'export LC_ALL=C',
    `__ewm_tk=$(${SJOB} takeover ${id} --result --json 2>/dev/null)`,
    `printf '__EWM_TK_BEGIN__\\n%s\\n__EWM_TK_END__\\n' "$__ewm_tk"`,
    `__ewm_q=$(squeue -h -j ${id} -o '%T|%r|%Q')`,
    '__ewm_q_rc=$?',
    // A purged id can fail -j; only a successful full query proves absence.
    `if [ "$__ewm_q_rc" -ne 0 ]; then __ewm_all=$(squeue -h -r -o '%i|%T|%r|%Q'); __ewm_q_rc=$?; __ewm_q=$(printf '%s\\n' "$__ewm_all" | awk -F '|' -v job=${id} '$1 == job { print $2 "|" $3 "|" $4 }'); fi`,
    `printf '__EWM_Q_RC__=%s\\n__EWM_Q_BEGIN__\\n%s\\n__EWM_Q_END__\\n' "$__ewm_q_rc" "$__ewm_q"`,
    'exit 0'
  ].join('\n');
}

/**
 * @param {string} text
 * @param {string} name
 * @returns {string|null}
 */
function section(text, name) {
  const match = new RegExp(
    `(?:^|\\n)__EWM_${name}_BEGIN__\\n([\\s\\S]*?)\\n__EWM_${name}_END__(?:\\n|$)`
  ).exec(text);
  return match ? match[1] : null;
}

const UNHELD_PENDING_STATES = new Set(['PENDING', 'CONFIGURING']);

/**
 * Whether the original job's queue row lets the marker clear after a
 * `no_takeover` reading: unheld pending, running, or ended by Slurm itself.
 * A held or cancelled job, a vanished one, or any other state needs a human.
 *
 * @param {string} line - `state|reason|priority`, `''` when the job is gone.
 * @returns {boolean}
 */
function untouchedByTakeover(line) {
  if (!line) {
    return false;
  }
  const [raw_state = '', reason = '', priority = ''] = line.split('|');
  const state = raw_state.split(/[+ ]/)[0].toUpperCase();
  if (UNHELD_PENDING_STATES.has(state)) {
    return !/^JobHeld/.test(reason.trim()) && priority.trim() !== '0';
  }
  return (
    SLURM_RUNNING_STATES.includes(state) ||
    (SLURM_TERMINAL_STATES.includes(state) && state !== 'CANCELLED')
  );
}

/**
 * Recover a takeover whose outcome is not known (UI-qbgj §3.4 결과 불명 복구)
 * with one read-only ssh: `started`/`done` replaces the job, `no_takeover`
 * with an untouched original job may clear the marker once
 * {@link TAKEOVER_SETTLE_MS} has passed, and a `holding` record or a held,
 * cancelled or vanished original job stays `unresolved`. A failed or
 * unreadable read throws, so the observer backs off with the marker kept.
 *
 * @param {SlurmJob} job
 * @param {Run} run
 * @returns {Promise<RecoveryOutcome>}
 */
export async function recoverTakeover(job, run) {
  if (!SSH_HOST_RE.test(job.ssh_host)) {
    throw new Error('Invalid non-option ssh_host');
  }
  let response;
  try {
    response = await run(remoteShellArgv(job.ssh_host, recoveryScript(job)), {
      timeout_ms: TAKEOVER_TIMEOUT_MS
    });
  } catch {
    throw new Error('ssh takeover recovery failed');
  }
  if (response.code !== 0) {
    throw new Error('ssh takeover recovery failed');
  }
  const record_text = section(response.stdout, 'TK');
  const queue_text = section(response.stdout, 'Q');
  const queue_rc = /(?:^|\n)__EWM_Q_RC__=(\d+)/.exec(response.stdout);
  if (record_text === null || queue_text === null || !queue_rc) {
    throw new Error('remote response missing takeover markers');
  }
  const record = lastJsonObject(record_text);
  if (!record) {
    throw new Error('takeover result unreadable');
  }
  if (record.ok === true) {
    const result = takeoverResult(record, job.job_id);
    if (!result) {
      throw new Error('takeover result malformed');
    }
    return { kind: 'started', result };
  }
  if (record.state === 'holding') {
    return { kind: 'unresolved' };
  }
  if (record.ok !== false || record.reason !== 'no_takeover') {
    throw new Error('takeover result unavailable');
  }
  if (queue_rc[1] !== '0') {
    throw new Error('squeue query failed');
  }
  const line =
    queue_text
      .split('\n')
      .map((entry) => entry.trim())
      .filter(Boolean)
      .at(-1) || '';
  return untouchedByTakeover(line) ? { kind: 'clear' } : { kind: 'unresolved' };
}
