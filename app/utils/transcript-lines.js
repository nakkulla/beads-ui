/**
 * Pure transcript parser for the session-log viewer (spec §5.6).
 *
 * The session log persists the RAW runner event stream (untransformed jsonl,
 * both claude `stream-json` and codex `--json` shapes — see
 * `server/worker/session-log.js`). This module turns that raw stream into an
 * ordered list of display-line objects for the drawer to render. It is fully
 * deterministic and does NO DOM work: it returns plain line objects, and the
 * drawer owns the lit-html rendering.
 *
 * It lives under `app/utils/` rather than beside the drawer because the SERVER
 * reads it too (UI-eey2 §9.3): `server/worker/session-log.js` keeps one
 * {@link createTranscriptReducer} per attempt so a running attempt's overlay can
 * carry the last display line as `last_activity`. `transcript-render.js` re-exports
 * this module so the drawer's existing import path is unchanged.
 *
 * All wire shapes are handled by auto-detecting the line kind per event:
 *   - claude: `{type:'assistant', message:{content:[{type:'text'|'thinking'|
 *     'tool_use'…}]}}`,
 *     `{type:'user', message:{content:[{type:'tool_result', tool_use_id, content}]}}`,
 *     `{type:'result', subtype, is_error, result}`. `system` dropped.
 *   - codex: `{type:'item.completed', item:{type:'agent_message'|'reasoning'|
 *     'error', …}}`,
 *     `{type:'turn.completed'}`, `{type:'turn.failed', error}`, `{type:'error'}`.
 *     `thread.started`/`turn.started` dropped.
 *   - codex delegation monitor: `{schema:'codex-delegation-monitor-v1', event}`
 *     projected onto the same existing line kinds.
 *
 * Line kinds (order-preserving): `assistant` · `thinking` · `tool` · `gate` ·
 * `phase` · `result` · `error` · `blocker`. Assistant text that matches a
 * gate-receipt or a Phase-heading pattern is reclassified into `gate`/`phase` so
 * the drawer can highlight it per the mockup (`✓ spec 게이트 — codex APPROVE`,
 * `Phase 2/4 …`).
 */

/**
 * A parsed display line.
 *
 * @typedef {Object} DisplayLine
 * @property {'assistant'|'thinking'|'tool'|'gate'|'phase'|'result'|'error'|'blocker'} kind
 * @property {string} [text] - Assistant/error/result/blocker body.
 * @property {boolean} [success] - Result verdict (kind='result').
 * @property {string} [tool] - Tool name (kind='tool').
 * @property {string} [icon] - Display glyph (kind='tool').
 * @property {string} [path] - File path (Read/Edit/Write tools).
 * @property {string} [command] - Shell command (Bash tool).
 * @property {number} [added] - Added line count (Edit/Write).
 * @property {number} [removed] - Removed line count (Edit).
 * @property {string} [result] - One-line tool-output summary (paired tool_result).
 * @property {unknown} [input] - Raw tool input (for click-to-expand).
 * @property {string} [output] - Full tool output (for click-to-expand).
 * @property {boolean} [expandable] - Whether the drawer offers expand-on-click.
 * @property {string} [gate] - Gate name (kind='gate').
 * @property {string} [reviewer] - Reviewer selector (kind='gate').
 * @property {string} [verdict] - Gate verdict APPROVE/REVISE/… (kind='gate').
 * @property {string} [time] - Optional timestamp text (kind='gate').
 * @property {string} [parent_tool_use_id] - The `Agent` launch this line came
 * from, when it is a Claude subagent line (UI-2mpn §6.4). Present ONLY on child
 * lines, which is what lets the drawer fold them under their launch and the
 * server's activity overlay leave them out.
 * @property {string} [launch_id] - The `tool_use.id` of an `Agent` tool line —
 * the other end of the same pairing, and the only place the id a child's
 * `parent_tool_use_id` names is visible on a display line.
 * @property {boolean} [is_error] - Whether the paired `tool_result` reported a
 * failure (kind='tool'). Absent means "no result yet, or it did not say".
 */

/**
 * Tool → glyph map (mockup §5). Unlisted tools fall back to a wrench.
 *
 * @type {Record<string, string>}
 */
const TOOL_ICONS = {
  Read: '📖',
  Edit: '✎',
  MultiEdit: '✎',
  Write: '📝',
  Bash: '⚡',
  Grep: '🔎',
  Glob: '🔎',
  Task: '🤖',
  Agent: '🤖',
  WebFetch: '🌐',
  WebSearch: '🌐'
};

/** @type {Record<string, string>} */
const DELEGATION_ACTIVITY_LABELS = {
  command_execution: '명령 실행',
  file_change: '파일 변경',
  mcp_call: 'MCP 호출',
  web_search: '웹 검색',
  plan: '계획'
};

/**
 * Gate-receipt pattern: `✓ spec 게이트 — codex APPROVE · 14:03`.
 * Captures verdict-glyph, gate name, reviewer, verdict, optional time.
 */
const GATE_RE =
  /^\s*([✓✗⊘])\s*(spec|impl|implementation|plan)\s*게이트\s*[—–-]\s*(\S+)\s+(APPROVE|REVISE|REJECT|BLOCK|SKIP)(?:\s*·\s*(.+))?/;

/** Phase-heading pattern: `Phase 2/4 · 토큰 발급` or `Phase 3: 세션 저장소`. */
const PHASE_RE =
  /^\s*#{0,3}\s*Phase\s+\d+(?:\s*\/\s*\d+)?\s*(?:[·:—–-]\s*.+)?$/;

/**
 * @param {unknown} v
 * @returns {v is Record<string, unknown>}
 */
function isObject(v) {
  return !!v && typeof v === 'object';
}

/**
 * Count lines in a string (empty string counts as 0 lines).
 *
 * @param {unknown} s
 * @returns {string[]}
 */
function toLines(s) {
  if (typeof s !== 'string' || s.length === 0) {
    return [];
  }
  return s.split(/\r?\n/);
}

/**
 * Line-based diff counts for an Edit: lines present only in `next` are added,
 * lines present only in `prev` are removed (multiset difference — deterministic
 * and cheap, no LCS needed for a status glyph).
 *
 * @param {unknown} prev - old_string.
 * @param {unknown} next - new_string.
 * @returns {{ added: number, removed: number }}
 */
export function diffCounts(prev, next) {
  const before = toLines(prev);
  const after = toLines(next);
  /** @type {Map<string, number>} */
  const counts = new Map();
  for (const l of before) {
    counts.set(l, (counts.get(l) || 0) + 1);
  }
  let added = 0;
  for (const l of after) {
    const c = counts.get(l) || 0;
    if (c > 0) {
      counts.set(l, c - 1);
    } else {
      added += 1;
    }
  }
  let removed = 0;
  for (const c of counts.values()) {
    removed += c;
  }
  return { added, removed };
}

/**
 * Collapse a raw tool-output blob to a single short summary line.
 *
 * @param {unknown} content
 * @returns {string}
 */
function summarizeOutput(content) {
  let text = '';
  if (typeof content === 'string') {
    text = content;
  } else if (Array.isArray(content)) {
    // claude tool_result content can be an array of {type:'text', text}.
    text = content
      .map((c) => (isObject(c) && typeof c.text === 'string' ? c.text : ''))
      .join('');
  } else if (isObject(content) && typeof content.text === 'string') {
    text = content.text;
  }
  const firstLine = String(text)
    .split(/\r?\n/)
    .find((l) => l.trim().length > 0);
  const trimmed = (firstLine || '').trim();
  return trimmed.length > 120 ? `${trimmed.slice(0, 117)}…` : trimmed;
}

/**
 * Build a tool display line from a claude `tool_use` content block.
 *
 * @param {Record<string, unknown>} block
 * @returns {DisplayLine}
 */
function toolLine(block) {
  const tool = String(block.name || '');
  const input = /** @type {any} */ (block.input) || {};
  /** @type {DisplayLine} */
  const line = {
    kind: 'tool',
    tool,
    icon: TOOL_ICONS[tool] || '🔧',
    input,
    expandable: true
  };
  if (tool === 'Read' || tool === 'Write') {
    line.path = String(input.file_path || input.path || '');
  }
  if (tool === 'Write') {
    line.added = toLines(input.content).length;
  }
  if (tool === 'Edit') {
    line.path = String(input.file_path || input.path || '');
    const { added, removed } = diffCounts(input.old_string, input.new_string);
    line.added = added;
    line.removed = removed;
  }
  if (tool === 'MultiEdit') {
    line.path = String(input.file_path || input.path || '');
    let added = 0;
    let removed = 0;
    const edits = Array.isArray(input.edits) ? input.edits : [];
    for (const e of edits) {
      const d = diffCounts(
        isObject(e) ? e.old_string : '',
        isObject(e) ? e.new_string : ''
      );
      added += d.added;
      removed += d.removed;
    }
    line.added = added;
    line.removed = removed;
  }
  if (tool === 'Bash') {
    line.command = String(input.command || '');
  }
  if (tool === 'Grep' || tool === 'Glob') {
    line.command = String(input.pattern || input.query || '');
  }
  if (tool === 'Agent') {
    // The launch id is what the child lines' `parent_tool_use_id` points at, so
    // the fold header needs it on the line itself (UI-2mpn §6.4); the
    // description is the only human summary of what the subagent was asked to
    // do, and it rides the existing detail column.
    if (typeof block.id === 'string' && block.id.length > 0) {
      line.launch_id = block.id;
    }
    if (typeof input.description === 'string') {
      line.command = input.description;
    }
  }
  return line;
}

/**
 * A thinking line, or null for a block that carries no visible text. The
 * narrative of a session lives here — the parser keeps the raw text intact and
 * leaves first-line extraction to the drawer.
 *
 * @param {unknown} text
 * @returns {DisplayLine | null}
 */
function thinkingLine(text) {
  if (typeof text !== 'string' || text.trim().length === 0) {
    return null;
  }
  return { kind: 'thinking', text };
}

/**
 * Reclassify an assistant text block into a gate/phase line, or return an
 * assistant line. Multi-line text is only pattern-tested against its first
 * non-empty line so a long prose block is never mis-tagged.
 *
 * @param {string} text
 * @returns {DisplayLine}
 */
function classifyText(text) {
  const first = text.split(/\r?\n/).find((l) => l.trim().length > 0) || '';
  const gate = GATE_RE.exec(first);
  if (gate) {
    const stage = gate[2] === 'implementation' ? 'impl' : gate[2];
    return {
      kind: 'gate',
      gate: stage,
      reviewer: gate[3],
      verdict: gate[4],
      time: gate[5] ? gate[5].trim() : undefined,
      text: first.trim()
    };
  }
  if (PHASE_RE.test(first) && first.trim().length <= 80) {
    return { kind: 'phase', text: first.trim() };
  }
  return { kind: 'assistant', text };
}

/**
 * Parse one raw claude line into zero or more display lines. Tool lines are
 * registered in `toolsById` so a later `tool_result` can back-fill their
 * `result`/`output`.
 *
 * @param {Record<string, unknown>} raw
 * @param {Map<string, DisplayLine>} toolsById
 * @returns {DisplayLine[]}
 */
function parseClaude(raw, toolsById) {
  const parent_tool_use_id =
    typeof raw.parent_tool_use_id === 'string' &&
    raw.parent_tool_use_id.length > 0
      ? raw.parent_tool_use_id
      : null;
  if (raw.type === 'assistant') {
    const msg = /** @type {any} */ (raw.message);
    const content = msg && Array.isArray(msg.content) ? msg.content : [];
    /** @type {DisplayLine[]} */
    const out = [];
    for (const c of content) {
      if (!isObject(c)) {
        continue;
      }
      if (c.type === 'text' && typeof c.text === 'string') {
        out.push(classifyText(c.text));
      } else if (c.type === 'thinking') {
        const line = thinkingLine(c.thinking);
        if (line) {
          out.push(line);
        }
      } else if (c.type === 'tool_use') {
        const line = toolLine(c);
        if (typeof c.id === 'string') {
          toolsById.set(c.id, line);
        }
        out.push(line);
      }
    }
    return parent_tool_use_id ? tagDelegated(out, parent_tool_use_id) : out;
  }
  if (raw.type === 'user') {
    // A user turn only carries tool_result blocks in unattended runs; pair each
    // to its tool line rather than emitting a line of its own.
    const msg = /** @type {any} */ (raw.message);
    const content = msg && Array.isArray(msg.content) ? msg.content : [];
    for (const c of content) {
      if (isObject(c) && c.type === 'tool_result') {
        const line = toolsById.get(String(c.tool_use_id));
        if (line) {
          const summary = summarizeOutput(c.content);
          line.result = summary;
          line.output = typeof c.content === 'string' ? c.content : summary;
          if (c.is_error === true) {
            line.is_error = true;
          }
        }
      }
    }
    return [];
  }
  if (raw.type === 'result') {
    const success = raw.is_error === false && raw.subtype === 'success';
    /** @type {DisplayLine} */
    const line = {
      kind: 'result',
      success,
      text: typeof raw.result === 'string' ? raw.result : success ? 'DONE' : ''
    };
    return parent_tool_use_id
      ? tagDelegated([line], parent_tool_use_id)
      : [line];
  }
  return [];
}

/**
 * Stamp the launch a batch of lines belongs to (UI-2mpn §6.4). Subagent lines
 * are kept, not dropped: the drawer needs them to fill the fold, and the tag is
 * what tells it — and the server's activity overlay — whose work they are.
 *
 * @param {DisplayLine[]} lines
 * @param {string} parent_tool_use_id
 * @returns {DisplayLine[]}
 */
function tagDelegated(lines, parent_tool_use_id) {
  for (const line of lines) {
    line.parent_tool_use_id = parent_tool_use_id;
  }
  return lines;
}

/**
 * Project a completed codex `command_execution` item onto a `tool` line
 * (UI-eey2 §9.3). Only the COMPLETED item is projected: it is the one that
 * carries the exit code and the aggregated output, which is exactly what makes
 * the activity line say what the command actually did rather than only that it
 * started.
 *
 * @param {Record<string, unknown>} item
 * @returns {DisplayLine}
 */
function commandExecutionLine(item) {
  const command = typeof item.command === 'string' ? item.command : '';
  const summary = summarizeOutput(
    item.aggregated_output === undefined ? item.output : item.aggregated_output
  );
  const exit_text =
    typeof item.exit_code === 'number' && Number.isFinite(item.exit_code)
      ? `exit ${item.exit_code}`
      : typeof item.status === 'string' && item.status.length > 0
        ? item.status
        : '';
  const result = [exit_text, summary]
    .filter((part) => part.length > 0)
    .join(' · ');
  /** @type {DisplayLine} */
  const line = {
    kind: 'tool',
    tool: 'shell',
    icon: TOOL_ICONS.Bash,
    command,
    input: { command },
    expandable: true
  };
  if (result.length > 0) {
    line.result = result;
  }
  if (typeof item.aggregated_output === 'string') {
    line.output = item.aggregated_output;
  }
  return line;
}

/**
 * Parse one raw codex line into zero or more display lines.
 *
 * @param {Record<string, unknown>} raw
 * @returns {DisplayLine[]}
 */
function parseCodex(raw) {
  if (raw.type === 'item.completed' && isObject(raw.item)) {
    const item = /** @type {any} */ (raw.item);
    if (item.type === 'agent_message' && typeof item.text === 'string') {
      return [classifyText(item.text)];
    }
    if (item.type === 'reasoning') {
      // No local codex fixture carries this shape; a differing payload keeps the
      // old drop behaviour rather than emitting a half-parsed line.
      const line = thinkingLine(item.text);
      return line ? [line] : [];
    }
    if (item.type === 'error') {
      return [{ kind: 'error', text: String(item.message || '') }];
    }
    if (item.type === 'command_execution') {
      return [commandExecutionLine(item)];
    }
    return [];
  }
  if (raw.type === 'turn.completed') {
    return [{ kind: 'result', success: true, text: 'DONE' }];
  }
  if (raw.type === 'turn.failed') {
    const err = /** @type {any} */ (raw.error);
    return [
      {
        kind: 'error',
        text:
          err && typeof err.message === 'string' ? err.message : 'turn failed'
      }
    ];
  }
  if (raw.type === 'error') {
    return [{ kind: 'error', text: String(raw.message || '') }];
  }
  return [];
}

/**
 * Project a validated producer envelope onto existing drawer line kinds.
 *
 * @param {Record<string, unknown>} raw
 * @returns {DisplayLine[]}
 */
function parseDelegationMonitor(raw) {
  if (raw.schema !== 'codex-delegation-monitor-v1' || !isObject(raw.event)) {
    return [];
  }
  const event = raw.event;
  if (event.type === 'session.started' || event.type === 'turn.started') {
    return [];
  }
  if (
    (event.type === 'item.started' || event.type === 'item.completed') &&
    isObject(event.item)
  ) {
    const item = event.item;
    if (typeof item.id !== 'string' || item.id.length === 0) {
      return [];
    }
    if (
      event.type === 'item.completed' &&
      item.kind === 'agent_message' &&
      typeof item.text === 'string' &&
      item.text.trim().length > 0
    ) {
      return [classifyText(item.text)];
    }
    if (event.type === 'item.completed' && item.kind === 'reasoning') {
      const line = thinkingLine(item.text);
      return line ? [line] : [];
    }
    if (item.kind !== 'activity' || typeof item.activity !== 'string') {
      return [];
    }
    const activity_label = DELEGATION_ACTIVITY_LABELS[item.activity];
    if (!activity_label) {
      return [];
    }
    let lifecycle = '시작';
    let icon = '…';
    /** @type {DisplayLine} */
    const line = {
      kind: 'tool',
      tool: '',
      icon,
      expandable: false
    };
    if (event.type === 'item.completed') {
      if (item.status === 'completed') {
        lifecycle = '완료';
        icon = '✓';
      } else if (item.status === 'failed') {
        lifecycle = '실패';
        icon = '✗';
      } else {
        return [];
      }
      line.result = '';
    }
    line.tool = `${activity_label} · ${lifecycle}`;
    line.icon = icon;
    return [line];
  }
  if (event.type === 'turn.completed' && event.status === 'completed') {
    return [{ kind: 'result', success: true, text: 'DONE' }];
  }
  if (
    event.type === 'turn.failed' &&
    (event.status === 'failed' || event.status === 'interrupted') &&
    typeof event.error_code === 'string' &&
    event.error_code.length > 0
  ) {
    return [{ kind: 'error', text: event.error_code }];
  }
  return [];
}

/**
 * Detect whether a raw event uses the codex wire shape.
 *
 * @param {Record<string, unknown>} raw
 * @returns {boolean}
 */
function isCodexShape(raw) {
  const t = raw.type;
  return (
    typeof t === 'string' &&
    (t === 'error' ||
      t.startsWith('thread.') ||
      t.startsWith('turn.') ||
      t.startsWith('item.'))
  );
}

/**
 * Normalize one raw stream entry into a plain object, or null when the entry
 * carries nothing parseable (blank line, malformed json, non-object).
 *
 * @param {unknown} entry
 * @returns {Record<string, unknown>|null}
 */
function rawObjectOf(entry) {
  /** @type {any} */
  let raw = entry;
  if (typeof entry === 'string') {
    const t = entry.trim();
    if (t.length === 0) {
      return null;
    }
    try {
      raw = JSON.parse(t);
    } catch {
      return null;
    }
  }
  return isObject(raw) ? raw : null;
}

/**
 * An INCREMENTAL transcript parser (UI-eey2 §9.3).
 *
 * The stateful part of the parse is the `tool_use` → `tool_result` pairing: a
 * claude tool line only learns its one-line result summary when the matching
 * `tool_result` arrives in a LATER event, so a caller that wants to follow a
 * live stream event by event cannot re-derive it from one event alone. This
 * reducer holds that pairing across pushes; the back-fill MUTATES the tool line
 * object it already returned, exactly as the batch parse does.
 *
 * @param {{ skip_delegated?: boolean }} [options] - `skip_delegated` drops
 * Claude subagent events outright (UI-2mpn §6.4). The server's activity overlay
 * sets it so a child's tool call never reports as the parent attempt's last
 * activity; the drawer leaves it off, because it folds those lines rather than
 * hiding them.
 * @returns {{ push: (event: unknown) => DisplayLine[] }}
 */
export function createTranscriptReducer(options = {}) {
  const skip_delegated = options.skip_delegated === true;
  /** @type {Map<string, DisplayLine>} */
  const toolsById = new Map();
  return {
    /**
     * @param {unknown} event - One raw parsed object or one jsonl string.
     * @returns {DisplayLine[]} The lines this event newly produced (possibly none).
     */
    push(event) {
      const raw = rawObjectOf(event);
      if (!raw) {
        return [];
      }
      if (
        skip_delegated &&
        typeof raw.parent_tool_use_id === 'string' &&
        raw.parent_tool_use_id.length > 0
      ) {
        return [];
      }
      return raw.schema === 'codex-delegation-monitor-v1'
        ? parseDelegationMonitor(raw)
        : isCodexShape(raw)
          ? parseCodex(raw)
          : parseClaude(raw, toolsById);
    }
  };
}

/**
 * Parse a raw runner event stream into ordered display lines.
 *
 * @param {Array<unknown|string>} events - Raw parsed objects or jsonl strings.
 * @returns {DisplayLine[]}
 */
export function parseTranscript(events) {
  /** @type {DisplayLine[]} */
  const lines = [];
  const reducer = createTranscriptReducer();
  const list = Array.isArray(events) ? events : [];
  for (const entry of list) {
    for (const line of reducer.push(entry)) {
      lines.push(line);
    }
  }
  return lines;
}
