const TERMINAL_STATES = new Set([
  'COMPLETED',
  'FAILED',
  'CANCELLED',
  'TIMEOUT',
  'NODE_FAIL',
  'OUT_OF_MEMORY',
  'PREEMPTED',
  'BOOT_FAIL',
  'DEADLINE',
  'REVOKED',
  'SPECIAL_EXIT'
]);

/**
 * @param {string} value
 * @returns {string}
 */
function shellQuote(value) {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

/**
 * @param {import('../store.js').SlurmJob} job
 * @returns {string}
 */
function remoteScript(job) {
  const projection = `
/^===== Job Started: .*=====[[:space:]]*$/ { started=$0; job_id=""; finished=""; exit_line=""; next }
started != "" && /^Job ID:[[:space:]]*/ { job_id=$0; next }
started != "" && /^===== Job Finished: .*=====[[:space:]]*$/ { finished=$0; exit_line=""; next }
started != "" && finished != "" && /^Exit code:[[:space:]]*-?[0-9]+[[:space:]]*$/ { exit_line=$0 }
END {
  if (started != "") print "__EWM_LOG_START__=" substr(started, 1, 512)
  if (job_id != "") print "__EWM_LOG_JOB_ID__=" substr(job_id, 1, 512)
  if (finished != "") print "__EWM_LOG_FINISH__=" substr(finished, 1, 512)
  if (exit_line != "") print "__EWM_LOG_EXIT__=" substr(exit_line, 1, 512)
}`;
  const lines = [
    'set +e',
    'export LC_ALL=C',
    `__ewm_queue=$(squeue -h -j ${shellQuote(job.job_id)} -o '%T')`,
    '__ewm_queue_rc=$?',
    // A purged id can fail -j; only a successful full query proves absence.
    `if [ "$__ewm_queue_rc" -ne 0 ]; then __ewm_all=$(squeue -h -r -o '%i|%T'); __ewm_queue_rc=$?; __ewm_queue=$(printf '%s\\n' "$__ewm_all" | awk -F '|' -v job=${shellQuote(job.job_id)} '$1 == job { print $2 }'); fi`,
    'printf "%s\\n" "$__ewm_queue"',
    'printf "\\n__EWM_SQUEUE_RC__=%s\\n" "$__ewm_queue_rc"',
    `scontrol show job ${shellQuote(job.job_id)}`,
    'printf "\\n__EWM_SCONTROL_RC__=%s\\n" "$?"',
    `__ewm_tail=$(tail -n 200 -- ${shellQuote(job.log_path)})`,
    '__ewm_log_rc=$?',
    `__ewm_projection=$(printf '%s\\n' "$__ewm_tail" | awk ${shellQuote(projection)})`,
    'printf "%s\\n" "$__ewm_projection"',
    `__ewm_started=$(printf '%s\\n' "$__ewm_projection" | sed -n 's/^__EWM_LOG_START__====== Job Started: \\(.*\\) =====$/\\1/p')`,
    `__ewm_numeric=$(printf '%s\\n' "$__ewm_started" | sed -nE 's/^([0-9]{4})\\. +([0-9]{2})\\. +([0-9]{2})\\. +\\([^()]+\\) +([0-9]{2}:[0-9]{2}:[0-9]{2}) +(KST|UTC|GMT|[+-][0-9]{4})$/\\1-\\2-\\3 \\4 \\5/p')`,
    `if [ -n "$__ewm_numeric" ]; then __ewm_started=$(printf '%s\\n' "$__ewm_numeric" | sed 's/ KST$/ +0900/'); fi`,
    'if [ -n "$__ewm_started" ]; then __ewm_epoch=$(date -d "$__ewm_started" +%s 2>/dev/null); if [ $? -eq 0 ]; then printf "__EWM_LOG_START_EPOCH__=%s\\n" "$__ewm_epoch"; fi; fi',
    'printf "\\n__EWM_LOG_RC__=%s\\n" "$__ewm_log_rc"'
  ];
  for (const [index, expected] of job.expected.entries()) {
    const quoted = shellQuote(expected);
    lines.push(
      `if [ -e ${quoted} ]; then stat -c '__EWM_ARTIFACT__${index}=1|%s|%Y' -- ${quoted}; else printf '__EWM_ARTIFACT__${index}=0|-|-\\n'; fi`
    );
  }
  // A purged job can fail scontrol; section return codes carry that evidence.
  lines.push('exit 0');
  return lines.join('\n');
}

/**
 * @param {string} text
 */
function splitRemoteOutput(text) {
  const match =
    /^([\s\S]*?)\n__EWM_SQUEUE_RC__=(\d+)\n([\s\S]*?)\n__EWM_SCONTROL_RC__=(\d+)\n([\s\S]*?)\n__EWM_LOG_RC__=(\d+)\n([\s\S]*)$/.exec(
      text
    );
  if (!match) {
    throw new Error('remote response missing observation markers');
  }
  return {
    queue: match[1].trim(),
    queue_rc: Number(match[2]),
    control: match[3].trim(),
    control_rc: Number(match[4]),
    log: match[5],
    log_rc: Number(match[6]),
    artifacts: match[7]
  };
}

/**
 * @param {string|undefined} value
 * @returns {number|null}
 */
function durationSeconds(value) {
  const match = /^(?:(\d+)-)?(\d+):(\d{2}):(\d{2})$/.exec(value || '');
  if (!match || Number(match[3]) >= 60 || Number(match[4]) >= 60) {
    return null;
  }
  const seconds =
    Number(match[1] || 0) * 86400 +
    Number(match[2]) * 3600 +
    Number(match[3]) * 60 +
    Number(match[4]);
  return Number.isSafeInteger(seconds) ? seconds : null;
}

/**
 * @param {string} log
 * @param {import('../store.js').SlurmJob} job
 * @returns {number|null}
 */
function lastLogCompletion(log, job) {
  const fields = Object.fromEntries(
    [
      ...log.matchAll(
        /^__EWM_LOG_(START|START_EPOCH|JOB_ID|FINISH|EXIT)__=([^\n]*)$/gm
      )
    ].map((match) => [match[1], match[2]])
  );
  if (
    !/^===== Job Started: .*=====\s*$/.test(fields.START || '') ||
    !/^===== Job Finished: .*=====\s*$/.test(fields.FINISH || '') ||
    (fields.JOB_ID || '').replace(/^Job ID:\s*/, '').trim() !== job.job_id ||
    !/^-?\d+$/.test(fields.START_EPOCH || '')
  ) {
    return null;
  }
  const submitted = Date.parse(job.submitted_at);
  if (
    !Number.isFinite(submitted) ||
    Number(fields.START_EPOCH) < Math.floor(submitted / 1000)
  ) {
    return null;
  }
  const exit = /^Exit code:\s*(-?\d+)\s*$/.exec(fields.EXIT || '');
  return exit ? Number(exit[1]) : null;
}

/**
 * @param {import('../store.js').SlurmJob} job
 * @param {string} stdout
 * @returns {import('../store.js').Observation}
 */
function parseObservation(job, stdout) {
  const result = splitRemoteOutput(stdout);
  if (result.queue_rc !== 0) {
    throw new Error('squeue query failed');
  }
  const fields =
    result.control_rc === 0
      ? Object.fromEntries(
          [
            ...result.control.matchAll(/(?:^|\s)([A-Za-z][A-Za-z0-9]*)=(\S+)/g)
          ].map((match) => [match[1], match[2]])
        )
      : {};
  if (
    Object.keys(fields).length &&
    (fields.JobId !== job.job_id ||
      (job.scheduler_submit_time !== undefined &&
        fields.SubmitTime !== job.scheduler_submit_time))
  ) {
    throw new Error('scontrol identity mismatch');
  }
  const time_limit_seconds = durationSeconds(fields.TimeLimit);
  const run_time_seconds = durationSeconds(fields.RunTime);
  const timing = {
    time_limit_seconds,
    run_time_seconds,
    unlimited: fields.TimeLimit === 'UNLIMITED',
    unparseable:
      (fields.TimeLimit !== 'UNLIMITED' && time_limit_seconds === null) ||
      run_time_seconds === null
  };
  const queue_state = result.queue.split('\n').filter(Boolean).at(-1) || '';
  const control_state = (fields.JobState || '').split('+')[0].toUpperCase();
  let state = (queue_state || control_state || 'UNKNOWN')
    .split('+')[0]
    .toUpperCase();
  if (state !== 'UNKNOWN' && !TERMINAL_STATES.has(state)) {
    return { state, terminal: false, ...timing };
  }
  const exit = /^(-?\d+):(\d+)$/.exec(fields.ExitCode || '');
  /** @type {number|null} */
  let exit_code = null;
  let evidence = '';
  if (
    fields.JobId === job.job_id &&
    TERMINAL_STATES.has(control_state) &&
    exit
  ) {
    state = control_state;
    exit_code = Number(exit[1]);
    evidence = 'scontrol';
  } else if (!result.queue && result.log_rc === 0) {
    exit_code = lastLogCompletion(result.log, job);
    if (exit_code !== null) {
      state = exit_code === 0 ? 'COMPLETED' : 'FAILED';
      evidence = 'log';
    }
  }
  if (exit_code === null) {
    return { state: 'UNKNOWN', terminal: false, ...timing };
  }
  const artifacts = new Map(
    [
      ...result.artifacts.matchAll(
        /^__EWM_ARTIFACT__(\d+)=(0|1)\|([^|\n]+)\|([^\n]+)$/gm
      )
    ].map((match) => [Number(match[1]), match])
  );
  const expected_results = job.expected.map((expected, index) => {
    const item = artifacts.get(index);
    const exists =
      !!item &&
      item[2] === '1' &&
      /^\d+$/.test(item[3]) &&
      /^-?\d+$/.test(item[4]);
    return {
      path: expected,
      exists,
      size: exists ? Number(item[3]) : null,
      mtime: exists ? Number(item[4]) : null
    };
  });
  return {
    state,
    terminal: true,
    ...timing,
    exit_code,
    evidence,
    expected_results,
    recovery_needed:
      exit_code !== 0 ||
      state !== 'COMPLETED' ||
      expected_results.some((item) => !item.exists)
  };
}

/**
 * @param {import('../store.js').SlurmJob} job
 * @param {{run:import('../store.js').Run, now?:()=>number}} options
 * @returns {Promise<import('../store.js').Observation>}
 */
export async function observeSlurmJob(job, { run }) {
  if (!/^[A-Za-z0-9_][A-Za-z0-9_.@:-]*$/.test(job.ssh_host)) {
    throw new Error('Invalid non-option ssh_host');
  }
  let result;
  try {
    result = await run(
      [
        'ssh',
        '-o',
        'BatchMode=yes',
        '-o',
        'ConnectTimeout=10',
        job.ssh_host,
        `sh -c ${shellQuote(remoteScript(job))}`
      ],
      { timeout_ms: 60000 }
    );
  } catch {
    throw new Error('ssh observation failed');
  }
  if (result.code !== 0) {
    throw new Error('ssh observation failed');
  }
  return parseObservation(job, result.stdout);
}
