/**
 * The pure half of the transcript drawer (UI-2dbn §4.2~§4.5): stage chip
 * tiers, same-tool folds, subagent segments, work bundles and their summary,
 * and the finished/pending reads of a parsed line list. Moved verbatim out of
 * `transcript-drawer.js` (UI-dbn6 Phase 2) — the display grammar is UI-2dbn's
 * and none of it changed; only the fold state is now passed in.
 */
import { formatRelativeTime } from '../../model/relative-time.js';

/**
 * @import { DisplayLine } from './transcript-render.js'
 */

/** A run of this many identical tool lines collapses into one group. */
const FOLD_AT = 5;

/**
 * A past work bundle with this many rows starts collapsed to its summary
 * (UI-2dbn §4.3); the trailing bundle and shorter ones start open.
 */
const WORK_FOLD_AT = 4;

/** How many tool names the work-bundle summary lists. */
const WORK_TOP_TOOLS = 3;

/** How many trailing tool lines the tier-3 stage guess votes over. */
const ACTIVITY_WINDOW = 10;

/** `Task #7 created …` in a TaskCreate tool_result — the only place the id appears. */
const TASK_ID_RE = /Task\s+#(\d+)/;

/** Publishing shell commands (tier-3 bucket). */
const PUBLISH_RE = /\bgh\s+pr\s+create\b|\bgit\s+push\b/;

/** Verification shell commands (tier-3 bucket). */
const VERIFY_RE = /\bnpm\s+(?:run\s+)?(?:test|tsc|lint|build)\b|\bvitest\b/;

/**
 * First non-empty line of a block, trimmed.
 *
 * @param {unknown} text
 * @returns {string}
 */
export function firstLineOf(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return (text.split(/\r?\n/).find((l) => l.trim().length > 0) || '').trim();
}

/**
 * @param {unknown} text
 * @returns {number}
 */
export function lineCountOf(text) {
  if (typeof text !== 'string' || text.length === 0) {
    return 0;
  }
  return text.split(/\r?\n/).length;
}

/**
 * Tier 1 — the last stage the session named out loud. Consumes the parser's
 * existing gate/phase classification only; no new patterns.
 *
 * @param {DisplayLine[]} lines
 * @returns {string|null}
 */
function exactStage(lines) {
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i];
    if (line.kind === 'phase' || line.kind === 'gate') {
      return line.text || null;
    }
  }
  return null;
}

/**
 * Tier 2 — the task the session declared it is inside. `TaskCreate.input`
 * carries the wording but no id, and `TaskUpdate.input` carries the id but no
 * wording, so the two are joined through the `Task #N` the create's tool_result
 * echoes back. A create whose result never arrived (or never matched) is
 * dropped rather than guessed at.
 *
 * @param {DisplayLine[]} lines
 * @returns {string|null}
 */
function taskStage(lines) {
  /** @type {Map<string, { label: string, active: number }>} */
  const tasks = new Map();
  let step = 0;
  for (const line of lines) {
    if (line.kind !== 'tool') {
      continue;
    }
    step += 1;
    const input = /** @type {any} */ (line.input) || {};
    if (line.tool === 'TaskCreate') {
      const echoed = TASK_ID_RE.exec(line.output || line.result || '');
      const label = String(input.activeForm || input.subject || '').trim();
      if (!echoed || label.length === 0) {
        continue;
      }
      tasks.set(echoed[1], {
        label,
        active: input.status === 'in_progress' ? step : 0
      });
      continue;
    }
    if (line.tool !== 'TaskUpdate') {
      continue;
    }
    const task = tasks.get(String(input.taskId ?? ''));
    if (!task) {
      continue;
    }
    const relabel = input.activeForm || input.subject;
    if (typeof relabel === 'string' && relabel.trim().length > 0) {
      task.label = relabel.trim();
    }
    if (typeof input.status === 'string') {
      task.active = input.status === 'in_progress' ? step : 0;
    }
  }
  /** @type {{ label: string, active: number } | null} */
  let latest = null;
  for (const task of tasks.values()) {
    if (task.active > 0 && (!latest || task.active > latest.active)) {
      latest = task;
    }
  }
  return latest ? latest.label : null;
}

/**
 * The activity bucket a single tool line votes for, or null for a tool that
 * says nothing about the stage.
 *
 * @param {DisplayLine} line
 * @returns {string|null}
 */
function activityBucket(line) {
  if (line.tool === 'Bash') {
    const command = line.command || '';
    if (PUBLISH_RE.test(command)) {
      return '~ PR/게시 중';
    }
    return VERIFY_RE.test(command) ? '~ 검증 중' : null;
  }
  if (
    line.tool === 'Edit' ||
    line.tool === 'Write' ||
    line.tool === 'MultiEdit'
  ) {
    return '~ 구현 중';
  }
  if (line.tool === 'Read' || line.tool === 'Grep' || line.tool === 'Glob') {
    return '~ 탐색 중';
  }
  return null;
}

/**
 * Tier 3 — a guess from what the session has been touching. Majority over the
 * trailing {@link ACTIVITY_WINDOW} tool lines so one stray tool cannot flip the
 * chip; a tie goes to whichever bucket signalled most recently.
 *
 * @param {DisplayLine[]} lines
 * @returns {string|null}
 */
function activityStage(lines) {
  const tools = lines.filter((l) => l.kind === 'tool').slice(-ACTIVITY_WINDOW);
  /** @type {Map<string, { count: number, last: number }>} */
  const buckets = new Map();
  tools.forEach((line, i) => {
    const bucket = activityBucket(line);
    if (!bucket) {
      return;
    }
    const seen = buckets.get(bucket) || { count: 0, last: -1 };
    seen.count += 1;
    seen.last = i;
    buckets.set(bucket, seen);
  });
  /** @type {{ label: string, count: number, last: number } | null} */
  let best = null;
  for (const [label, seen] of buckets) {
    if (
      !best ||
      seen.count > best.count ||
      (seen.count === best.count && seen.last > best.last)
    ) {
      best = { label, count: seen.count, last: seen.last };
    }
  }
  return best ? best.label : null;
}

/**
 * The current-stage chip: three sources in priority order, where a higher tier
 * short-circuits the ones below it. Tiers 1-2 are what the session said, tier 3
 * is inference — the `~` prefix and the chip colour keep that difference honest.
 * A finished session keeps its last known stage; this is not a live-only chip.
 *
 * @param {DisplayLine[]} lines
 * @returns {{ text: string, guess: boolean } | null}
 */
export function stageOf(lines) {
  const exact = exactStage(lines);
  if (exact) {
    return { text: exact, guess: false };
  }
  const task = taskStage(lines);
  if (task) {
    return { text: task, guess: false };
  }
  const activity = activityStage(lines);
  return activity ? { text: activity, guess: true } : null;
}

/**
 * How long ago the session last moved, in the drawer's second-level register
 * (UI-rkly §2). `formatRelativeTime` floors everything under a minute to
 * "방금", which is exactly the resolution a heartbeat needs to show.
 *
 * @param {number|null|undefined} at - Epoch ms.
 * @param {number} now_ms
 * @returns {string}
 */
export function formatAgo(at, now_ms) {
  if (typeof at !== 'number') {
    return '';
  }
  const seconds = Math.max(0, Math.floor((now_ms - at) / 1000));
  return seconds < 60 ? `${seconds}초 전` : formatRelativeTime(at, now_ms);
}

/**
 * Whether a top-level segment is work (tool line, same-tool group, subagent,
 * thinking) rather than narrative (UI-2dbn §4.3). Every other kind — including
 * one the parser does not know — is narrative and breaks a work bundle.
 *
 * @param {any} seg
 * @returns {boolean}
 */
function isWorkSegment(seg) {
  if (seg.kind === 'subagent' || seg.kind === 'group') {
    return true;
  }
  return seg.line.kind === 'tool' || seg.line.kind === 'thinking';
}

/**
 * @param {any} seg
 * @returns {boolean}
 */
function isToolSegment(seg) {
  return (
    isWorkSegment(seg) && (seg.kind !== 'line' || seg.line.kind === 'tool')
  );
}

/**
 * Gather each maximal run of work segments into one bundle (UI-2dbn §4.3). A
 * run with no tool-family segment (thinking only, e.g. the session-start line)
 * stays as plain segments — a bundle summary of "작업 0" says nothing.
 *
 * A bundle is followed by narrative exactly when it is not the last block,
 * because the run is maximal.
 *
 * @param {any[]} segments
 * @returns {Array<{ kind: 'seg', seg: any } | { kind: 'work', idx: number, segs: any[], default_open: boolean }>}
 */
export function blocksOf(segments) {
  /** @type {Array<{ kind: 'seg', seg: any } | { kind: 'work', idx: number, segs: any[], default_open: boolean }>} */
  const out = [];
  let i = 0;
  while (i < segments.length) {
    if (!isWorkSegment(segments[i])) {
      out.push({ kind: 'seg', seg: segments[i] });
      i += 1;
      continue;
    }
    let j = i;
    while (j < segments.length && isWorkSegment(segments[j])) {
      j += 1;
    }
    const run = segments.slice(i, j);
    if (run.some(isToolSegment)) {
      const trailing = j === segments.length;
      out.push({
        kind: 'work',
        idx: run[0].idx,
        segs: run,
        default_open: trailing || run.length < WORK_FOLD_AT
      });
    } else {
      for (const seg of run) {
        out.push({ kind: 'seg', seg });
      }
    }
    i = j;
  }
  return out;
}

/**
 * The counts a work-bundle summary shows (UI-2dbn §4.3). A call is one tool
 * line, every line of a same-tool group, or one subagent (its child lines are
 * the subagent's own work). Names tie-break by first appearance, which the
 * stable sort keeps from the insertion order.
 *
 * @param {any[]} segs
 * @returns {{ calls: number, tools: Array<[string, number]>, thinking: number, failed: number }}
 */
export function summarizeWork(segs) {
  let calls = 0;
  let thinking = 0;
  let failed = 0;
  /** @type {Map<string, number>} */
  const by_tool = new Map();
  /**
   * @param {string} name
   * @param {number} n
   */
  const tally = (name, n) => {
    calls += n;
    if (name.length > 0) {
      by_tool.set(name, (by_tool.get(name) || 0) + n);
    }
  };
  for (const seg of segs) {
    if (seg.kind === 'subagent') {
      tally('Agent', 1);
      if (seg.header && seg.header.line.is_error === true) {
        failed += 1;
      }
    } else if (seg.kind === 'group') {
      tally(seg.tool, seg.lines.length);
      failed += seg.lines.filter(
        (/** @type {{ line: DisplayLine }} */ entry) =>
          entry.line.is_error === true
      ).length;
    } else if (seg.line.kind === 'thinking') {
      thinking += 1;
    } else {
      tally(seg.line.tool || '', 1);
      if (seg.line.is_error === true) {
        failed += 1;
      }
    }
  }
  const tools = [...by_tool]
    .sort((a, b) => b[1] - a[1])
    .slice(0, WORK_TOP_TOOLS);
  return { calls, tools, thinking, failed };
}

/**
 * How a session that is not running ended, for the bar's state slot (UI-2dbn
 * §4.2): the last TOP-LEVEL `result` line decides — a subagent's `result` is
 * that subagent's conclusion, not the session's. `status: 'done'` is never
 * evidence, since an interactive session reads `done` for "not the current
 * session".
 *
 * @param {DisplayLine[]} lines
 * @param {string|undefined} status
 * @returns {'done'|'failed'|null}
 */
export function finishedState(lines, status) {
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i];
    const is_child =
      typeof line.parent_tool_use_id === 'string' &&
      line.parent_tool_use_id.length > 0;
    if (line.kind === 'result' && !is_child) {
      return line.success ? 'done' : 'failed';
    }
  }
  return status === 'failed' ? 'failed' : null;
}

/**
 * The colour modifier of a gate verdict: only the verdict word carries colour.
 *
 * @param {string} verdict
 * @returns {string}
 */
export function verdictClass(verdict) {
  if (verdict === 'APPROVE') {
    return ' sv__verdict--ok';
  }
  return verdict === 'REVISE' ? ' sv__verdict--warn' : '';
}

/**
 * Group consecutive same-tool lines so a 30-file read sweep does not bury the
 * one line that says what the session is doing. Anything shorter than
 * {@link FOLD_AT} renders as before — folding two lines hides more than it
 * saves.
 *
 * Runs over already-positioned entries rather than the raw list, so the SAME
 * rule applies inside a subagent fold: a child's read sweep collapses within
 * its own group and never joins a run outside it (UI-2mpn §6.4).
 *
 * @param {Array<{ idx: number, line: DisplayLine }>} entries
 * @param {Set<number>} unfolded - Group idx the reader already unfolded.
 * @returns {any[]}
 */
export function foldRuns(entries, unfolded) {
  /** @type {any[]} */
  const out = [];
  let i = 0;
  while (i < entries.length) {
    const { idx, line } = entries[i];
    if (line.kind === 'tool') {
      let j = i;
      while (
        j < entries.length &&
        entries[j].line.kind === 'tool' &&
        entries[j].line.tool === line.tool
      ) {
        j += 1;
      }
      if (j - i >= FOLD_AT && !unfolded.has(idx)) {
        out.push({
          kind: 'group',
          idx,
          tool: line.tool || '',
          lines: entries.slice(i, j)
        });
        i = j;
        continue;
      }
    }
    out.push({ kind: 'line', idx, line });
    i += 1;
  }
  return out;
}

/**
 * Split the transcript into top-level segments, folding every Claude subagent
 * under the `Agent` call that launched it (UI-2mpn §6.4).
 *
 * A child line is never dropped — it is moved: the `Agent` line becomes the
 * group's header and each line tagged with its launch id renders inside,
 * collapsed until clicked. Children whose header is behind the snapshot
 * boundary still group, under an anonymous header, because a line that says
 * whose work it is beats a line mixed into the parent's.
 *
 * @param {DisplayLine[]} lines
 * @param {Set<number>} unfolded
 * @returns {any[]}
 */
export function segmentsOf(lines, unfolded) {
  /** @type {any[]} */
  const slots = [];
  /** @type {Map<string, any>} */
  const by_launch = new Map();
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const parent = line.parent_tool_use_id;
    if (typeof parent === 'string' && parent.length > 0) {
      let seg = by_launch.get(parent);
      if (!seg) {
        seg = {
          kind: 'subagent',
          idx: i,
          launch_id: parent,
          agent_type: null,
          header: null,
          lines: []
        };
        by_launch.set(parent, seg);
        slots.push(seg);
      }
      seg.lines.push({ idx: i, line });
      continue;
    }
    if (
      line.kind === 'tool' &&
      line.tool === 'Agent' &&
      typeof line.launch_id === 'string' &&
      line.launch_id.length > 0
    ) {
      const agent_type = subagentTypeOf(line);
      const existing = by_launch.get(line.launch_id);
      if (existing) {
        existing.header = { idx: i, line };
        existing.agent_type = agent_type;
        continue;
      }
      const seg = {
        kind: 'subagent',
        idx: i,
        launch_id: line.launch_id,
        agent_type,
        header: { idx: i, line },
        lines: []
      };
      by_launch.set(line.launch_id, seg);
      slots.push(seg);
      continue;
    }
    slots.push({ kind: 'entry', idx: i, line });
  }
  /** @type {any[]} */
  const out = [];
  let i = 0;
  while (i < slots.length) {
    if (slots[i].kind !== 'entry') {
      out.push(slots[i]);
      i += 1;
      continue;
    }
    let j = i;
    while (j < slots.length && slots[j].kind === 'entry') {
      j += 1;
    }
    out.push(...foldRuns(slots.slice(i, j), unfolded));
    i = j;
  }
  return out;
}

/**
 * The `subagent_type` an `Agent` tool line was called with, or null.
 *
 * @param {DisplayLine} line
 * @returns {string|null}
 */
function subagentTypeOf(line) {
  const input = /** @type {any} */ (line.input);
  return input && typeof input.subagent_type === 'string'
    ? input.subagent_type
    : null;
}

/**
 * The tool line the session is inside right now: the last tool line that
 * never got its result back. A finished session (a `result` line landed)
 * has none by definition.
 *
 * Completion is the PRESENCE of `result`, not its truthiness — a tool that
 * finished with empty output would otherwise look pending forever. And tools
 * do not always finish in order (one turn can open several), so a completed
 * tail tool means keep looking, not stop.
 *
 * @param {DisplayLine[]} lines
 * @returns {DisplayLine | null}
 */
export function pendingTool(lines) {
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    const line = lines[i];
    if (line.kind === 'result' || line.kind === 'error') {
      return null;
    }
    if (line.kind === 'tool' && !Object.hasOwn(line, 'result')) {
      return line;
    }
  }
  return null;
}

/**
 * The latest narrative the session produced. Thinking blocks are where a
 * session says why it is doing what it is doing, so the "지금" bar shows the
 * newest one even when no tool is open.
 *
 * @param {DisplayLine[]} lines
 * @returns {DisplayLine | null}
 */
export function lastThinking(lines) {
  for (let i = lines.length - 1; i >= 0; i -= 1) {
    if (lines[i].kind === 'thinking') {
      return lines[i];
    }
  }
  return null;
}
