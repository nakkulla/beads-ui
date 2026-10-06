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
export function shellQuote(value) {
  return `'${value.replaceAll("'", "'\\''")}'`;
}

/** A non-option ssh alias the observation accepts. */
export const SSH_HOST_RE = Object.freeze(/^[A-Za-z0-9_][A-Za-z0-9_.@:-]*$/);

/**
 * The batch-mode ssh argv that runs one generated program, quoted as a single
 * remote-shell argument, on `ssh_host`.
 *
 * @param {string} ssh_host
 * @param {string} script
 * @returns {string[]}
 */
export function remoteShellArgv(ssh_host, script) {
  return [
    'ssh',
    '-o',
    'BatchMode=yes',
    '-o',
    'ConnectTimeout=10',
    ssh_host,
    `sh -c ${shellQuote(script)}`
  ];
}

/**
 * Remote `stat` lines of the expected artifacts, one marker line per path.
 *
 * @param {string[]} expected
 * @returns {string[]}
 */
export function expectedArtifactLines(expected) {
  return expected.map((item, index) => {
    const quoted = shellQuote(item);
    return `if [ -e ${quoted} ]; then stat -c '__EWM_ARTIFACT__${index}=1|%s|%Y' -- ${quoted}; else printf '__EWM_ARTIFACT__${index}=0|-|-\\n'; fi`;
  });
}

/**
 * The expected results read back from {@link expectedArtifactLines} output; a
 * missing or malformed line reads as absent.
 *
 * @param {string} text
 * @param {string[]} expected
 * @returns {import('../store.js').ExpectedResult[]}
 */
export function expectedResults(text, expected) {
  const artifacts = new Map(
    [
      ...text.matchAll(/^__EWM_ARTIFACT__(\d+)=(0|1)\|([^|\n]+)\|([^\n]+)$/gm)
    ].map((match) => [Number(match[1]), match])
  );
  return expected.map((path, index) => {
    const item = artifacts.get(index);
    const exists =
      !!item &&
      item[2] === '1' &&
      /^\d+$/.test(item[3]) &&
      /^-?\d+$/.test(item[4]);
    return {
      path,
      exists,
      size: exists ? Number(item[3]) : null,
      mtime: exists ? Number(item[4]) : null
    };
  });
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
  if (++printed > limit) { over = 1; exit }
  mem = ""
  n = split(val("Tres"), parts, ",")
  for (i = 1; i <= n; i++) { if (substr(parts[i], 1, 4) == "mem=") { mem = substr(parts[i], 5) } }
  print "C|" val("JobId") "|" val("Name") "||" val("JobState") "|" val("SubmitTime") "|" val("StartTime") "|" end "||" val("TimeLimit") "|" val("ProcCnt") "|" mem "|" val("ExitCode") "|" val("WorkDir")
}
END { if (over) { print "__EWM_COMP_FAIL__" } }`;

// Normalized row: src|id|name|comment|state|submit|start|end|runtime|limit|cpus|mem|exit|workdir.
// Counts cover every member before the completed rows are capped remotely.
// A registered sibling seen started in the same place bounds the submission
// window like a stored later anchor; a pending StartTime is only an estimate,
// and an ended job whose start equals its end never ran. The window applies
// once every row is read, so the attribution does not depend on input order.
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
  n = split(siblings, a, " ")
  for (i = 1; i <= n; i++) { sib[a[i]] = 1 }
  cutoff = ""
  n = split(later, a, " ")
  for (i = 1; i <= n; i++) { if (a[i] > start && (cutoff == "" || a[i] < cutoff)) { cutoff = a[i] } }
}
NR > limit { over = 1; exit }
NF >= 14 {
  wd = $14
  for (i = 15; i <= NF; i++) { wd = wd "|" $i }
  id = $2
  if (id in sib) {
    st = $5
    sub(/[ +].*$/, "", st)
    began = (st in run) || (($1 == "C" || (st in term)) && $8 ~ ${ISO_AWK} && $7 < $8)
    if (began && wd == workdir && $7 ~ ${ISO_AWK} && $7 > start && (cutoff == "" || $7 < cutoff)) { cutoff = $7 }
    next
  }
  if (id == "" || (id in skip) || wd != workdir || $6 !~ ${ISO_AWK} || $6 < start) { next }
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
  if (over) {
    print "__EWM_SPAWN_FAIL__"
    exit
  }
  for (k = 1; k <= count; k++) {
    id = order[k]
    $0 = row[id]
    if (cutoff != "" && $6 >= cutoff) { continue }
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
 * @typedef {{exclude?: string[], previous?: string[], later?: string[], siblings?: string[]}} SpawnedContext
 */

/**
 * Seconds each sub-job read may take under coreutils `timeout` (UI-q15q §4).
 * Together they stay well inside the 60 s observation ssh, so a stuck read
 * fails only the sub-job material, never the registered job's observation.
 */
export const SPAWNED_TIMEOUT_SECONDS = Object.freeze({
  queue: 10,
  config: 5,
  completion: 15
});

/** Seconds each pending-capacity read may take under `timeout` (UI-qbgj §3.1). */
export const CAPACITY_TIMEOUT_SECONDS = 5;

const TIMEOUT_FUNCTION =
  '__ewm_to() { if command -v timeout >/dev/null 2>&1; then timeout -k 2 "$@"; else shift; "$@"; fi; }';

// First occurrence of each key of `scontrol show job`; one `|` row for the
// capacity section: Reason|StartTime|Partition|Priority|SubmitTime.
const CAPACITY_JOB_AWK = String.raw`
{
  for (i = 1; i <= NF; i++) {
    p = index($i, "=")
    if (p > 1) {
      k = substr($i, 1, p - 1)
      if (!(k in v)) { v[k] = substr($i, p + 1) }
    }
  }
}
END { print v["Reason"] "|" v["StartTime"] "|" v["Partition"] "|" v["Priority"] "|" v["SubmitTime"] }`;

// Rows `id|priority|submit|reason|cpus` of the partition's pending jobs, array
// tasks expanded. Earlier means higher priority, or equal priority submitted
// first; held, dependent and deferred jobs cannot run next and are not counted.
const CAPACITY_AHEAD_AWK = String.raw`
$2 !~ /^[0-9]+$/ || $5 !~ /^[0-9]+$/ { next }
$1 == job || index($1, job "_") == 1 { next }
$4 ~ /^(Dependency|JobHeld|BeginTime)/ { next }
{
  if ($2 + 0 > priority + 0 || ($2 + 0 == priority + 0 && $3 < submit)) { jobs++; cpus += $5 }
}
END { print (jobs + 0) "|" (cpus + 0) }`;

// `scontrol show node -o` lines summed over the partition's nodes; every node
// must report all four numbers or nothing is printed.
const CAPACITY_SLURM_AWK = String.raw`
BEGIN {
  n = split(nodes, a, " ")
  for (i = 1; i <= n; i++) { if (!(a[i] in want)) { want[a[i]] = 1; total++ } }
}
{
  split("", v)
  for (i = 1; i <= NF; i++) {
    p = index($i, "=")
    if (p > 1) {
      k = substr($i, 1, p - 1)
      if (!(k in v)) { v[k] = substr($i, p + 1) }
    }
  }
  if (!(v["NodeName"] in want)) { next }
  if (v["CPUAlloc"] !~ /^[0-9]+$/ || v["CPUTot"] !~ /^[0-9]+$/ || v["AllocMem"] !~ /^[0-9]+$/ || v["RealMemory"] !~ /^[0-9]+$/) { bad = 1; next }
  found++
  cpu_alloc += v["CPUAlloc"]
  cpu_total += v["CPUTot"]
  mem_alloc += v["AllocMem"]
  mem_total += v["RealMemory"]
}
END { if (total > 0 && found == total && !bad) { print cpu_alloc "|" cpu_total "|" mem_alloc "|" mem_total } }`;

/**
 * The read-only capacity section of the observation program (UI-qbgj §3.1).
 * It runs only for a pending job, inside the same ssh, and each query is
 * bounded by {@link CAPACITY_TIMEOUT_SECONDS}. The first failed read stops the
 * section (`__EWM_CAP_OK__=0`), so a stuck cluster costs one bounded wait.
 * The ssh host's own load is read only when it is one of the partition nodes.
 *
 * @param {import('../store.js').SlurmJob} job
 * @returns {string[]}
 */
function capacityScript(job) {
  const to = `__ewm_to ${CAPACITY_TIMEOUT_SECONDS}`;
  return [
    "printf '\\n__EWM_CAP_BEGIN__\\n'",
    TIMEOUT_FUNCTION,
    `__ewm_cap_state=$(printf '%s\\n' "$__ewm_queue" | awk 'NF { s = $1 } END { sub(/\\+.*$/, "", s); print s }')`,
    `if [ -z "$__ewm_cap_state" ] && [ "$__ewm_ctl_rc" -eq 0 ]; then __ewm_cap_state=$(printf '%s\\n' "$__ewm_ctl" | awk '{ for (i = 1; i <= NF; i++) { if (index($i, "JobState=") == 1) { s = substr($i, 10); sub(/\\+.*$/, "", s); print s; exit } } }'); fi`,
    'if [ "$__ewm_cap_state" = PENDING ]; then',
    '__ewm_cap_ok=1',
    "__ewm_cj=''",
    `if [ "$__ewm_ctl_rc" -eq 0 ]; then __ewm_cj=$(printf '%s\\n' "$__ewm_ctl" | awk ${shellQuote(CAPACITY_JOB_AWK)}); else __ewm_cap_ok=0; fi`,
    `__ewm_cap_reason=$(printf '%s\\n' "$__ewm_cj" | cut -d '|' -f 1)`,
    `__ewm_cap_part=$(printf '%s\\n' "$__ewm_cj" | cut -d '|' -f 3)`,
    `__ewm_cap_prio=$(printf '%s\\n' "$__ewm_cj" | cut -d '|' -f 4)`,
    `__ewm_cap_submit=$(printf '%s\\n' "$__ewm_cj" | cut -d '|' -f 5)`,
    'case "$__ewm_cap_part" in \'\'|*[!A-Za-z0-9_.,-]*) __ewm_cap_ok=0;; esac',
    'case "$__ewm_cap_prio" in \'\'|*[!0-9]*) __ewm_cap_ok=0;; esac',
    'if [ -z "$__ewm_cap_reason" ] || [ -z "$__ewm_cap_submit" ]; then __ewm_cap_ok=0; fi',
    "__ewm_cap_q=''; __ewm_cap_nodes=''; __ewm_cap_nd=''; __ewm_cap_host=''",
    `if [ "$__ewm_cap_ok" -eq 1 ]; then __ewm_cap_q=$(${to} squeue -h -r -t PD -p "$__ewm_cap_part" -o '%i|%Q|%V|%r|%C') || __ewm_cap_ok=0; fi`,
    `if [ "$__ewm_cap_ok" -eq 1 ]; then __ewm_cap_nodes=$(${to} sinfo -h -N -p "$__ewm_cap_part" -o '%N') || __ewm_cap_ok=0; fi`,
    `if [ "$__ewm_cap_ok" -eq 1 ]; then __ewm_cap_nd=$(${to} scontrol show node -o) || __ewm_cap_ok=0; fi`,
    `__ewm_cap_nodes=$(printf '%s\\n' "$__ewm_cap_nodes" | sort -u | tr '\\n' ' ')`,
    `__ewm_cap_ahead=''; __ewm_cap_slurm=''`,
    `if [ "$__ewm_cap_ok" -eq 1 ]; then __ewm_cap_ahead=$(printf '%s\\n' "$__ewm_cap_q" | awk -F '|' -v job=${shellQuote(job.job_id)} -v priority="$__ewm_cap_prio" -v submit="$__ewm_cap_submit" ${shellQuote(CAPACITY_AHEAD_AWK)}); __ewm_cap_slurm=$(printf '%s\\n' "$__ewm_cap_nd" | awk -v nodes="$__ewm_cap_nodes" ${shellQuote(CAPACITY_SLURM_AWK)}); if [ -z "$__ewm_cap_ahead" ] || [ -z "$__ewm_cap_slurm" ]; then __ewm_cap_ok=0; fi; fi`,
    `if [ "$__ewm_cap_ok" -eq 1 ]; then __ewm_cap_hn=$(${to} hostname -s) || __ewm_cap_ok=0; fi`,
    `if [ "$__ewm_cap_ok" -eq 1 ] && printf '%s\\n' "$__ewm_cap_nodes" | tr ' ' '\\n' | grep -qxF -- "$__ewm_cap_hn"; then`,
    `__ewm_cap_cpus=$(${to} nproc) || __ewm_cap_ok=0`,
    `__ewm_cap_la=$(${to} cat /proc/loadavg) || __ewm_cap_ok=0`,
    `__ewm_cap_mi=$(${to} cat /proc/meminfo) || __ewm_cap_ok=0`,
    `__ewm_cap_load=$(printf '%s\\n' "$__ewm_cap_la" | awk '{ print $1; exit }')`,
    `__ewm_cap_mem=$(printf '%s\\n' "$__ewm_cap_mi" | awk '/^MemAvailable:/ { printf "%d\\n", $2 / 1024; exit }')`,
    `__ewm_cap_host="$__ewm_cap_hn|$__ewm_cap_cpus|$__ewm_cap_load|$__ewm_cap_mem"`,
    'fi',
    `printf '__EWM_CAP_NOW__=%s\\n' "$(date +%Y-%m-%dT%H:%M:%S)"`,
    'if [ "$__ewm_cap_ok" -eq 1 ]; then',
    `printf '__EWM_CAP_JOB__=%s\\n__EWM_CAP_AHEAD__=%s\\n__EWM_CAP_SLURM__=%s\\n' "$__ewm_cj" "$__ewm_cap_ahead" "$__ewm_cap_slurm"`,
    `if [ -n "$__ewm_cap_host" ]; then printf '__EWM_CAP_HOST__=%s\\n' "$__ewm_cap_host"; fi`,
    'fi',
    `printf '__EWM_CAP_OK__=%s\\n' "$__ewm_cap_ok"`,
    'fi',
    "printf '__EWM_CAP_END__\\n'"
  ];
}

/**
 * The read-only sub-job section of the observation program (UI-q15q §3.2):
 * the user queue and, under `jobcomp/filetxt`, the completion file read
 * backward to the anchor. It never submits, cancels or changes a job. Without
 * a completion file the completed members beyond the row cap still name
 * themselves (`__EWM_SPAWN_OMIT__=<end>|<id>`), so the server can tell a capped
 * row from one that left the queue.
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
    TIMEOUT_FUNCTION,
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
    `__ewm_uq=$(__ewm_to ${SPAWNED_TIMEOUT_SECONDS.queue} squeue -h -r -u "$__ewm_su" -t all -o '%i|%j|%k|%T|%V|%S|%e|%M|%l|%C|%m||%Z')`,
    '__ewm_uq_rc=$?',
    `__ewm_cfg=$(__ewm_to ${SPAWNED_TIMEOUT_SECONDS.config} scontrol show config 2>/dev/null)`,
    '__ewm_cfg_rc=$?',
    `__ewm_ctype=$(printf '%s\\n' "$__ewm_cfg" | awk '$1 == "JobCompType" { sub(/^[^=]*=[ ]*/, ""); print; exit }')`,
    `__ewm_cloc=$(printf '%s\\n' "$__ewm_cfg" | awk '$1 == "JobCompLoc" { sub(/^[^=]*=[ ]*/, ""); print; exit }')`,
    "__ewm_cl=''",
    'if [ "$__ewm_cfg_rc" -ne 0 ]; then __ewm_comp=failed',
    `elif [ "$__ewm_ctype" != 'jobcomp/filetxt' ] || [ -z "$__ewm_cloc" ] || [ ! -e "$__ewm_cloc" ]; then __ewm_comp=unsupported`,
    'elif [ ! -r "$__ewm_cloc" ]; then __ewm_comp=failed',
    `else __ewm_cl=$({ __ewm_to ${SPAWNED_TIMEOUT_SECONDS.completion} tac -- "$__ewm_cloc" || printf '__EWM_TAC_FAIL__\\n'; } 2>/dev/null | awk -v user="$__ewm_su" -v start="$__ewm_ss" -v limit=${SPAWNED_MATERIAL_LINE_LIMIT} ${shellQuote(COMPLETION_AWK)}); case "$__ewm_cl" in *__EWM_COMP_FAIL__*) __ewm_comp=failed;; *) __ewm_comp=filetxt;; esac`,
    'fi',
    `printf '__EWM_SPAWN_UQ_RC__=%s\\n__EWM_SPAWN_COMP__=%s\\n' "$__ewm_uq_rc" "$__ewm_comp"`,
    'if [ "$__ewm_uq_rc" -eq 0 ] && [ "$__ewm_comp" != failed ]; then',
    `__ewm_merged=$({ printf '%s\\n' "$__ewm_uq" | sed 's/^/Q|/'; if [ "$__ewm_comp" = filetxt ]; then printf '%s\\n' "$__ewm_cl"; fi; } | awk -F '|' -v workdir="$__ewm_sw" -v start="$__ewm_ss" -v limit=${SPAWNED_MATERIAL_LINE_LIMIT} -v exclude=${list(context.exclude)} -v previous=${list(context.previous)} -v later=${list(context.later)} -v siblings=${list(context.siblings)} -v running_states=${shellQuote(SLURM_RUNNING_STATES.join(' '))} -v terminal_states=${shellQuote(SLURM_TERMINAL_STATES.join(' '))} ${shellQuote(MERGE_AWK)})`,
    `printf '%s\\n' "$__ewm_merged" | grep -v '^__EWM_SPAWN_DONE__='`,
    `printf '%s\\n' "$__ewm_merged" | grep '^__EWM_SPAWN_DONE__=' | sort -r | head -n ${SPAWNED_COMPLETED_ROW_LIMIT}`,
    `if [ "$__ewm_comp" = unsupported ]; then printf '%s\\n' "$__ewm_merged" | grep '^__EWM_SPAWN_DONE__=' | sort -r | tail -n +${SPAWNED_COMPLETED_ROW_LIMIT + 1} | cut -d '|' -f 1,3 | sed 's/^__EWM_SPAWN_DONE__=/__EWM_SPAWN_OMIT__=/'; fi`,
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
  lines.push(...expectedArtifactLines(job.expected));
  lines.push(...spawnedScript(job, context));
  lines.push(...capacityScript(job));
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
 * Sub-job material as read from one observation. Without a completion file,
 * `truncated` names the completed members the remote row cap left out.
 *
 * @typedef {import('../store.js').SpawnedMaterial & {truncated?: Array<{job_id: string, ended_at: string}>}} SpawnedReading
 */

/**
 * One normalized remote row as a stored sub-job row.
 *
 * @param {string} line
 * @param {string|null} remote_now
 * @returns {import('../store.js').SpawnedRow|null}
 */
function spawnedRow(line, remote_now) {
  const parts = line.split('|');
  if (parts.length < 14 || !parts[1] || !REMOTE_TIME_RE.test(parts[5])) {
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
 * parse failure — a malformed row, or a material that reached its line limit —
 * is `failed`, which leaves the stored rows unchanged; it never throws, so it
 * cannot reach the registered job's error accounting.
 *
 * @param {string} text
 * @returns {{anchor?: import('../store.js').SpawnedAnchor, spawned: SpawnedReading}}
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
      lines.includes('__EWM_SPAWN_FAIL__') ||
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
    /** @type {Array<{job_id: string, ended_at: string}>} */
    const truncated = [];
    for (const line of lines) {
      const omit = line.startsWith('__EWM_SPAWN_OMIT__=')
        ? /^__EWM_SPAWN_OMIT__=([^|]*)\|([^|]+)$/.exec(line)
        : undefined;
      if (omit !== undefined) {
        if (!omit || !REMOTE_TIME_RE.test(omit[1])) {
          return { anchor, spawned: { status: 'failed' } };
        }
        truncated.push({ job_id: omit[2], ended_at: omit[1] });
        continue;
      }
      const body = line.startsWith('__EWM_SPAWN_ROW__=')
        ? line.slice('__EWM_SPAWN_ROW__='.length)
        : line.startsWith('__EWM_SPAWN_DONE__=')
          ? line.slice('__EWM_SPAWN_DONE__='.length).replace(/^[^|]*\|/, '')
          : null;
      if (body === null) {
        continue;
      }
      const row = spawnedRow(body, remote_now);
      if (!row) {
        return { anchor, spawned: { status: 'failed' } };
      }
      rows.push(row);
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
        rows,
        ...(completion_log === 'unsupported' ? { truncated } : {})
      }
    };
  } catch {
    return { spawned: { status: 'failed' } };
  }
}

/**
 * The pending-capacity section of the remote output (UI-qbgj §3.1). Any
 * missing, failed or malformed part makes the whole reading `failed`, which
 * leaves the stored capacity unchanged; it never throws, so it cannot reach
 * the registered job's error accounting. `est_start` is kept only when it is
 * after the remote clock, and the host only when the program read it.
 *
 * @param {string} text
 * @param {string} observed_at
 * @returns {import('../store.js').CapacityMaterial}
 */
function parseCapacity(text, observed_at) {
  try {
    const section =
      /(?:^|\n)__EWM_CAP_BEGIN__\n([\s\S]*?)\n__EWM_CAP_END__(?:\n|$)/.exec(
        text
      );
    if (!section) {
      return { status: 'failed' };
    }
    const lines = section[1].split('\n');
    /** @param {string} key */
    const value = (key) => {
      const prefix = `__EWM_CAP_${key}__=`;
      const line = lines.find((entry) => entry.startsWith(prefix));
      return line === undefined ? null : line.slice(prefix.length);
    };
    const job = (value('JOB') || '').split('|');
    const ahead = /^(\d+)\|(\d+)$/.exec(value('AHEAD') || '');
    const slurm = /^(\d+)\|(\d+)\|(\d+)\|(\d+)$/.exec(value('SLURM') || '');
    const host_line = value('HOST');
    const host =
      host_line === null
        ? null
        : /^([^|]+)\|(\d+)\|(\d+(?:\.\d+)?)\|(\d+)$/.exec(host_line);
    if (
      value('OK') !== '1' ||
      job.length !== 5 ||
      !job[0] ||
      !job[2] ||
      !ahead ||
      !slurm ||
      (host_line !== null && !host)
    ) {
      return { status: 'failed' };
    }
    const now = value('NOW');
    const est_start =
      REMOTE_TIME_RE.test(job[1]) &&
      now !== null &&
      REMOTE_TIME_RE.test(now) &&
      job[1] > now
        ? job[1]
        : null;
    return {
      status: 'ok',
      capacity: {
        reason: job[0],
        est_start,
        partition: job[2],
        ahead: { jobs: Number(ahead[1]), cpus: Number(ahead[2]) },
        slurm: {
          cpu_alloc: Number(slurm[1]),
          cpu_total: Number(slurm[2]),
          mem_alloc_mb: Number(slurm[3]),
          mem_total_mb: Number(slurm[4])
        },
        host: host
          ? {
              name: host[1],
              cpus: Number(host[2]),
              load1: Number(host[3]),
              mem_available_mb: Number(host[4])
            }
          : null,
        observed_at
      }
    };
  } catch {
    return { status: 'failed' };
  }
}

/**
 * @param {import('../store.js').SlurmJob} job
 * @param {string} stdout
 * @param {string} observed_at
 * @returns {import('../store.js').Observation}
 */
function parseObservation(job, stdout, observed_at) {
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
    spawned: display.spawned,
    capacity: parseCapacity(result.artifacts, observed_at)
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
  const expected_results = expectedResults(result.artifacts, job.expected);
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
export async function observeSlurmJob(
  job,
  { run, now = () => Date.now(), spawned = {} }
) {
  if (!SSH_HOST_RE.test(job.ssh_host)) {
    throw new Error('Invalid non-option ssh_host');
  }
  let result;
  try {
    result = await run(
      remoteShellArgv(job.ssh_host, remoteScript(job, spawned)),
      { timeout_ms: 60000 }
    );
  } catch {
    throw new Error('ssh observation failed');
  }
  if (result.code !== 0) {
    throw new Error('ssh observation failed');
  }
  return parseObservation(job, result.stdout, new Date(now()).toISOString());
}
