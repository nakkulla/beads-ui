import {
  SSH_HOST_RE,
  expectedArtifactLines,
  expectedResults,
  remoteShellArgv,
  shellQuote
} from './slurm.js';

/**
 * The read-only observation program of a takeover's local run (UI-qbgj §3.5).
 * The process is probed before the exitcode file is read: the wrapper writes
 * its exit code just before it exits, so a gone process has already written
 * it. Only `ps` output and the exitcode file are read — never the log.
 *
 * @param {import('../store.js').SjobLocalJob} job
 * @returns {string}
 */
function remoteScript(job) {
  const exitcode = shellQuote(job.exitcode_path);
  return [
    'set +e',
    'export LC_ALL=C',
    `__ewm_ps=$(ps -p ${job.pid} -o lstart= 2>&1)`,
    '__ewm_ps_rc=$?',
    `printf '__EWM_PS_RC__=%s\\n__EWM_PS_BEGIN__\\n%s\\n__EWM_PS_END__\\n' "$__ewm_ps_rc" "$__ewm_ps"`,
    `if [ -e ${exitcode} ]; then __ewm_ec=$(cat -- ${exitcode}); __ewm_ec_rc=$?; else __ewm_ec=''; __ewm_ec_rc=absent; fi`,
    `printf '__EWM_EXIT_RC__=%s\\n__EWM_EXIT_BEGIN__\\n%s\\n__EWM_EXIT_END__\\n' "$__ewm_ec_rc" "$__ewm_ec"`,
    ...expectedArtifactLines(job.expected || []),
    'exit 0'
  ].join('\n');
}

/**
 * The text between `__EWM_<name>_BEGIN__` and `__EWM_<name>_END__`, or null
 * when the section is missing.
 *
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

/**
 * @param {string} text
 * @param {string} name
 * @returns {string|null}
 */
function marker(text, name) {
  const match = new RegExp(`(?:^|\\n)__EWM_${name}__=([^\\n]*)`).exec(text);
  return match ? match[1] : null;
}

/**
 * Observe a takeover's local run on its ssh host with one read-only ssh call
 * (UI-qbgj §3.5): a matching nonempty `process_start` is `RUNNING`; a gone or
 * reused PID, or an empty saved start (already finished at takeover), is
 * judged from the integer exitcode file — `COMPLETED` for zero, `FAILED`
 * otherwise — and without one it is `VANISHED`. A failed ssh or read throws so
 * the observer backs off; it is never proof that the process is gone.
 *
 * @param {import('../store.js').SjobLocalJob} job
 * @param {{run:import('../store.js').Run}} options
 * @returns {Promise<import('../store.js').Observation>}
 */
export async function observeSjobLocalJob(job, { run }) {
  if (!SSH_HOST_RE.test(job.ssh_host)) {
    throw new Error('Invalid non-option ssh_host');
  }
  if (!Number.isInteger(job.pid) || job.pid <= 1) {
    throw new Error('Invalid local pid');
  }
  let result;
  try {
    result = await run(remoteShellArgv(job.ssh_host, remoteScript(job)), {
      timeout_ms: 60000
    });
  } catch {
    throw new Error('ssh observation failed');
  }
  if (result.code !== 0) {
    throw new Error('ssh observation failed');
  }
  const text = result.stdout;
  const ps_rc = marker(text, 'PS_RC');
  const ps = section(text, 'PS');
  const exit_rc = marker(text, 'EXIT_RC');
  const exit_text = section(text, 'EXIT');
  if (ps_rc === null || ps === null || exit_rc === null || exit_text === null) {
    throw new Error('remote response missing observation markers');
  }
  const actual = ps.trim();
  const alive = ps_rc === '0' && actual !== '';
  if (!alive && !(ps_rc === '1' && actual === '')) {
    throw new Error('local process probe failed');
  }
  if (exit_rc !== '0' && exit_rc !== 'absent') {
    throw new Error('exitcode unreadable');
  }
  if (alive && job.process_start !== '' && actual === job.process_start) {
    return { state: 'RUNNING', terminal: false };
  }
  const exit = /^(-?\d+)$/.exec(exit_text.trim());
  const exit_code = exit ? Number(exit[1]) : null;
  const expected_results = expectedResults(text, job.expected || []);
  return {
    state:
      exit_code === null
        ? 'VANISHED'
        : exit_code === 0
          ? 'COMPLETED'
          : 'FAILED',
    terminal: true,
    exit_code,
    evidence: exit_code === null ? 'vanished' : 'exitcode',
    expected_results,
    recovery_needed:
      exit_code !== 0 || expected_results.some((item) => !item.exists)
  };
}
