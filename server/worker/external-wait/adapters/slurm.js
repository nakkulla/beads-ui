import {
  SLURM_RUNNING_STATES,
  SLURM_TERMINAL_STATES,
  externalSpawnedClass
} from '../../../../app/protocol.js';

const TERMINAL_STATES = new Set(SLURM_TERMINAL_STATES);

/**
 * @param {string} value
 * @returns {string}
 */
function shellQuote(value) {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

/** Completed sub-job rows a record keeps (UI-q15q §3.4). */
export const SPAWNED_COMPLETED_ROW_LIMIT = 300;

/** Safety ceiling of lines read from one sub-job material. */
const SPAWNED_MATERIAL_LINE_LIMIT = 200000;

const ISO_AWK =
  '/^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]T[0-9][0-9]:[0-9][0-9]:[0-9][0-9]$/';

// The anchor exists only once the registered job has started: a pending job's
// StartTime is a scheduler estimate.
const ANCHOR_AWK = `
{
  for (i = 1; i <= NF; i++) {
    p = index($i, "=")
    if (p > 1) {
      k = substr($i, 1, p - 1)
      if (!(k in v)) { v[k] = substr($i, p + 1) }
    }
  }
  if ($0 ~ /^[[:space:]]*WorkDir=/) {
    w = $0
    sub(/^[[:space:]]*WorkDir=/, "", w)
    v["WorkDir"] = w
  }
}
END {
  n = split(started_states, a, " ")
  for (i = 1; i <= n; i++) { ok[a[i]] = 1 }
  state = v["JobState"]
  user = v["UserId"]
  sub(/\\(.*$/, "", user)
  if (!(state in ok) || user == "" || v["WorkDir"] == "" || v["StartTime"] !~ ${ISO_AWK}) { exit }
  print user
  print v["WorkDir"]
  print v["StartTime"]
}`;

// Reads the job-completion file newest first and stops at the first line that
// ended before the anchor; EndTime is monotonic in jobcomp/filetxt.
const COMPLETION_AWK = `
function val(key,    line, p, s) {
  line = " " $0
  p = index(line, " " key "=")
  if (p == 0) { return "" }
  s = substr(line, p + length(key) + 2)
  sub(/ .*$/, "", s)
  return s
}
$0 == "__EWM_TAC_FAIL__" { print "__EWM_COMP_FAIL__"; exit }
{
  end = val("EndTime")
  if (end ~ ${ISO_AWK} && end < start) { exit }
  if (index(" " $0, " UserId=" user "(") == 0) { next }
  if (++printed > limit) { exit }
  mem = ""
  n = split(val("Tres"), parts, ",")
  for (i = 1; i <= n; i++) { if (substr(parts[i], 1, 4) == "mem=") { mem = substr(parts[i], 5) } }
  print "C|" val("JobId") "|" val("Name") "||" val("JobState") "|" val("SubmitTime") "|" val("StartTime") "|" end "||" val("TimeLimit") "|" val("ProcCnt") "|" mem "|" val("ExitCode") "|" val("WorkDir")
}`;

// Normalized row: src|id|name|comment|state|submit|start|end|runtime|limit|cpus|mem|exit|workdir.
// Counts cover every member before the completed rows are capped remotely.
const MERGE_AWK = `
BEGIN {
  OFS = "|"
  n = split(running_states, a, " ")
  for (i = 1; i <= n; i++) { run[a[i]] = 1 }
  n = split(terminal_states, a, " ")
  for (i = 1; i <= n; i++) { term[a[i]] = 1 }
  n = split(exclude, a, " ")
  for (i = 1; i <= n; i++) { skip[a[i]] = 1 }
  n = split(previous, a, " ")
  for (i = 1; i <= n; i++) { prev[a[i]] = 1 }
  cutoff = ""
  n = split(later, a, " ")
  for (i = 1; i <= n; i++) { if (a[i] > start && (cutoff == "" || a[i] < cutoff)) { cutoff = a[i] } }
}
NR > limit { exit }
NF >= 14 {
  wd = $14
  for (i = 15; i <= NF; i++) { wd = wd "|" $i }
  id = $2
  if (id == "" || (id in skip) || wd != workdir || $6 !~ ${ISO_AWK} || $6 < start || (cutoff != "" && $6 >= cutoff)) { next }
  if (!(id in row)) { order[++count] = id }
  if ($1 == "Q") {
    c = $4
    if (c == "(null)") { c = "" }
    comment[id] = c
    if (src[id] != "C") { row[id] = $0; src[id] = "Q" }
  } else {
    row[id] = $0
    src[id] = "C"
  }
}
END {
  for (k = 1; k <= count; k++) {
    id = order[k]
    $0 = row[id]
    $4 = comment[id]
    st = $5
    sub(/[ +].*$/, "", st)
    ex = $13
    sub(/:.*$/, "", ex)
    if (st in run) { cls = "running" }
    else if (st in term) { cls = (st == "COMPLETED" && (ex == "" || ex == "0")) ? "completed" : "failed" }
    else { cls = "pending" }
    counts[cls]++
    if (cls == "completed" && !(id in prev)) { print "__EWM_SPAWN_DONE__=" $8 "|" $0 }
    else { print "__EWM_SPAWN_ROW__=" $0 }
  }
  print "__EWM_SPAWN_COUNTS__=" (counts["running"] + 0) "|" (counts["pending"] + 0) "|" (counts["completed"] + 0) "|" (counts["failed"] + 0)
}`;

/**
 * @typedef {{exclude?: string[], previous?: string[], later?: string[]}} SpawnedContext
 */

/**
 * The read-only sub-job section of the observation program (UI-q15q §3.2):
 * the user queue and, under `jobcomp/filetxt`, the completion file read
 * backward to the anchor. It never submits, cancels or changes a job.
 *
 * @param {import('../store.js').SlurmJob} job
 * @param {SpawnedContext} context
 * @returns {string[]}
 */
function spawnedScript(job, context) {
  const stored = job.anchor;
  /** @param {string[]|undefined} values */
  const list = (values) => shellQuote((values || []).join(' '));
  return [
    "printf '\\n__EWM_SPAWN_BEGIN__\\n'",
    "__ewm_anchor=''",
    `if [ "$__ewm_ctl_rc" -eq 0 ]; then __ewm_anchor=$(printf '%s\\n' "$__ewm_ctl" | awk -v started_states=${shellQuote([...SLURM_RUNNING_STATES, ...SLURM_TERMINAL_STATES].join(' '))} ${shellQuote(ANCHOR_AWK)}); fi`,
    `__ewm_su=$(printf '%s\\n' "$__ewm_anchor" | sed -n 1p)`,
    `__ewm_sw=$(printf '%s\\n' "$__ewm_anchor" | sed -n 2p)`,
    `__ewm_ss=$(printf '%s\\n' "$__ewm_anchor" | sed -n 3p)`,
    `if [ -z "$__ewm_su" ] || [ -z "$__ewm_sw" ] || [ -z "$__ewm_ss" ]; then __ewm_su=${shellQuote(stored?.user || '')}; __ewm_sw=${shellQuote(stored?.workdir || '')}; __ewm_ss=${shellQuote(stored?.started_at || '')}; fi`,
    'if [ -z "$__ewm_su" ] || [ -z "$__ewm_sw" ] || [ -z "$__ewm_ss" ]; then',
    "printf '__EWM_SPAWN__=none\\n'",
    'else',
    `printf '__EWM_SPAWN_USER__=%s\\n__EWM_SPAWN_WORKDIR__=%s\\n__EWM_SPAWN_START__=%s\\n' "$__ewm_su" "$__ewm_sw" "$__ewm_ss"`,
    `__ewm_uq=$(squeue -h -r -u "$__ewm_su" -t all -o '%i|%j|%k|%T|%V|%S|%e|%M|%l|%C|%m||%Z')`,
    '__ewm_uq_rc=$?',
    '__ewm_cfg=$(scontrol show config 2>/dev/null)',
    '__ewm_cfg_rc=$?',
    `__ewm_ctype=$(printf '%s\\n' "$__ewm_cfg" | awk '$1 == "JobCompType" { sub(/^[^=]*=[ ]*/, ""); print; exit }')`,
    `__ewm_cloc=$(printf '%s\\n' "$__ewm_cfg" | awk '$1 == "JobCompLoc" { sub(/^[^=]*=[ ]*/, ""); print; exit }')`,
    "__ewm_cl=''",
    'if [ "$__ewm_cfg_rc" -ne 0 ]; then __ewm_comp=failed',
    `elif [ "$__ewm_ctype" != 'jobcomp/filetxt' ] || [ -z "$__ewm_cloc" ] || [ ! -e "$__ewm_cloc" ]; then __ewm_comp=unsupported`,
    'elif [ ! -r "$__ewm_cloc" ]; then __ewm_comp=failed',
    `else __ewm_cl=$({ tac -- "$__ewm_cloc" || printf '__EWM_TAC_FAIL__\\n'; } 2>/dev/null | awk -v user="$__ewm_su" -v start="$__ewm_ss" -v limit=${SPAWNED_MATERIAL_LINE_LIMIT} ${shellQuote(COMPLETION_AWK)}); case "$__ewm_cl" in *__EWM_COMP_FAIL__*) __ewm_comp=failed;; *) __ewm_comp=filetxt;; esac`,
    'fi',
    `printf '__EWM_SPAWN_UQ_RC__=%s\\n__EWM_SPAWN_COMP__=%s\\n' "$__ewm_uq_rc" "$__ewm_comp"`,
    'if [ "$__ewm_uq_rc" -eq 0 ] && [ "$__ewm_comp" != failed ]; then',
    `__ewm_merged=$({ printf '%s\\n' "$__ewm_uq" | sed 's/^/Q|/'; if [ "$__ewm_comp" = filetxt ]; then printf '%s\\n' "$__ewm_cl"; fi; } | awk -F '|' -v workdir="$__ewm_sw" -v start="$__ewm_ss" -v limit=${SPAWNED_MATERIAL_LINE_LIMIT} -v exclude=${list(context.exclude)} -v previous=${list(context.previous)} -v later=${list(context.later)} -v running_states=${shellQuote(SLURM_RUNNING_STATES.join(' '))} -v terminal_states=${shellQuote(SLURM_TERMINAL_STATES.join(' '))} ${shellQuote(MERGE_AWK)})`,
    `printf '%s\\n' "$__ewm_merged" | grep -v '^__EWM_SPAWN_DONE__='`,
    `printf '%s\\n' "$__ewm_merged" | grep '^__EWM_SPAWN_DONE__=' | sort -r | head -n ${SPAWNED_COMPLETED_ROW_LIMIT}`,
    `printf '__EWM_SPAWN_NOW__=%s\\n' "$(date +%Y-%m-%dT%H:%M:%S)"`,
    'fi',
    "printf '__EWM_SPAWN_END__\\n'",
    'fi'
  ];
}

/**
 * @param {import('../store.js').SlurmJob} job
 * @param {SpawnedContext} [context]
 * @returns {string}
 */
function remoteScript(job, context = {}) {
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
    `__ewm_ctl=$(scontrol show job ${shellQuote(job.job_id)})`,
    '__ewm_ctl_rc=$?',
    'printf "%s\\n" "$__ewm_ctl"',
    'printf "\\n__EWM_SCONTROL_RC__=%s\\n" "$__ewm_ctl_rc"',
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
  lines.push(...spawnedScript(job, context));
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

const REMOTE_TIME_RE = /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d$/;

/**
 * Seconds between two instants of the same remote clock; zone-free.
 *
 * @param {string|null} from
 * @param {string|null} to
 * @returns {number|null}
 */
function remoteSeconds(from, to) {
  if (!from || !to || !REMOTE_TIME_RE.test(from) || !REMOTE_TIME_RE.test(to)) {
    return null;
  }
  const seconds = (Date.parse(`${to}Z`) - Date.parse(`${from}Z`)) / 1000;
  return Number.isFinite(seconds) ? Math.max(0, seconds) : null;
}

/**
 * A Slurm duration in any squeue form: `[D-]H:MM:SS`, `M:SS`.
 *
 * @param {string} value
 * @returns {number|null}
 */
function looseDurationSeconds(value) {
  const match = /^(?:(\d+)-)?(?:(\d+):)?(\d+):(\d{2})$/.exec(value);
  if (!match) {
    return null;
  }
  return (
    Number(match[1] || 0) * 86400 +
    Number(match[2] || 0) * 3600 +
    Number(match[3]) * 60 +
    Number(match[4])
  );
}

/**
 * One normalized remote row as a stored sub-job row.
 *
 * @param {string} line
 * @param {string|null} remote_now
 * @returns {import('../store.js').SpawnedRow|null}
 */
function spawnedRow(line, remote_now) {
  const parts = line.split('|');
  if (parts.length < 14 || !parts[1]) {
    return null;
  }
  const [source, job_id, name, comment, raw_state, submitted, started, ended] =
    parts;
  const state = raw_state.split(/[ +]/)[0].toUpperCase();
  const limit = parts[9];
  const exit = /^(-?\d+)(?::\d+)?$/.exec(parts[12]);
  const cpus = /^\d+$/.test(parts[10]) ? Number(parts[10]) : null;
  const started_at = REMOTE_TIME_RE.test(started) ? started : null;
  const exit_code = exit ? Number(exit[1]) : null;
  const group = externalSpawnedClass({ state, exit_code });
  const terminal = group === 'completed' || group === 'failed';
  const ended_at = terminal && REMOTE_TIME_RE.test(ended) ? ended : null;
  return {
    job_id,
    name,
    rule: comment.startsWith('rule_') ? comment : '',
    state,
    submitted_at: submitted,
    started_at: group === 'pending' ? null : started_at,
    ended_at,
    elapsed_seconds:
      group === 'running'
        ? looseDurationSeconds(parts[8])
        : group === 'pending'
          ? remoteSeconds(submitted, remote_now)
          : remoteSeconds(started_at, ended_at),
    time_limit_seconds:
      source === 'C' && /^\d+$/.test(limit)
        ? Number(limit) * 60
        : looseDurationSeconds(limit),
    unlimited: limit === 'UNLIMITED',
    cpus,
    memory: parts[11],
    exit_code
  };
}

/**
 * The sub-job section of the remote output (UI-q15q §3.2, §4). Any read or
 * parse failure is `failed`, which leaves the stored rows unchanged; it never
 * throws, so it cannot reach the registered job's error accounting.
 *
 * @param {string} text
 * @returns {{anchor?: import('../store.js').SpawnedAnchor, spawned: import('../store.js').SpawnedMaterial}}
 */
function parseSpawned(text) {
  try {
    const section = /(?:^|\n)__EWM_SPAWN_BEGIN__\n([\s\S]*)$/.exec(text);
    if (!section) {
      return { spawned: { status: 'failed' } };
    }
    const lines = section[1].split('\n');
    if (lines.includes('__EWM_SPAWN__=none')) {
      return { spawned: { status: 'none' } };
    }
    /** @param {string} key */
    const value = (key) => {
      const prefix = `__EWM_SPAWN_${key}__=`;
      const line = lines.find((entry) => entry.startsWith(prefix));
      return line === undefined ? null : line.slice(prefix.length);
    };
    const user = value('USER');
    const workdir = value('WORKDIR');
    const started_at = value('START');
    const anchor =
      user && workdir && started_at && REMOTE_TIME_RE.test(started_at)
        ? { user, workdir, started_at }
        : undefined;
    const counts = /^(\d+)\|(\d+)\|(\d+)\|(\d+)$/.exec(value('COUNTS') || '');
    const completion_log = value('COMP');
    if (
      !anchor ||
      !lines.includes('__EWM_SPAWN_END__') ||
      value('UQ_RC') !== '0' ||
      (completion_log !== 'filetxt' && completion_log !== 'unsupported') ||
      !counts
    ) {
      return { anchor, spawned: { status: 'failed' } };
    }
    const now = value('NOW');
    const remote_now = now && REMOTE_TIME_RE.test(now) ? now : null;
    /** @type {import('../store.js').SpawnedRow[]} */
    const rows = [];
    for (const line of lines) {
      const body = line.startsWith('__EWM_SPAWN_ROW__=')
        ? line.slice('__EWM_SPAWN_ROW__='.length)
        : line.startsWith('__EWM_SPAWN_DONE__=')
          ? line.slice('__EWM_SPAWN_DONE__='.length).replace(/^[^|]*\|/, '')
          : null;
      const row = body === null ? null : spawnedRow(body, remote_now);
      if (row) {
        rows.push(row);
      }
    }
    return {
      anchor,
      spawned: {
        status: 'ok',
        completion_log,
        counts: {
          running: Number(counts[1]),
          pending: Number(counts[2]),
          completed: Number(counts[3]),
          failed: Number(counts[4])
        },
        rows
      }
    };
  } catch {
    return { spawned: { status: 'failed' } };
  }
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
  const display = parseSpawned(result.artifacts);
  const extras = {
    ...(typeof fields.JobName === 'string' && fields.JobName
      ? { name: fields.JobName }
      : {}),
    ...(display.anchor ? { anchor: display.anchor } : {}),
    spawned: display.spawned
  };
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
    return { state, terminal: false, ...timing, ...extras };
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
    return { state: 'UNKNOWN', terminal: false, ...timing, ...extras };
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
    ...extras,
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
 * @param {{run:import('../store.js').Run, now?:()=>number, spawned?:SpawnedContext}} options
 * @returns {Promise<import('../store.js').Observation>}
 */
export async function observeSlurmJob(job, { run, spawned = {} }) {
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
        `sh -c ${shellQuote(remoteScript(job, spawned))}`
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
