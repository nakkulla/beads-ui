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
 * Both wire shapes are handled by auto-detecting the line kind per event:
 *   - claude: `{type:'assistant', message:{content:[{type:'text'|'tool_use'…}]}}`,
 *     `{type:'user', message:{content:[{type:'tool_result', tool_use_id, content}]}}`,
 *     `{type:'result', subtype, is_error, result}`. `system`/`thinking` dropped.
 *   - codex: `{type:'item.completed', item:{type:'agent_message'|'error', …}}`,
 *     `{type:'turn.completed'}`, `{type:'turn.failed', error}`, `{type:'error'}`.
 *     `thread.started`/`turn.started` dropped.
 *
 * Line kinds (order-preserving): `assistant` · `tool` · `gate` · `phase` ·
 * `result` · `error` · `blocker`. Assistant text that matches a gate-receipt or
 * a Phase-heading pattern is reclassified into `gate`/`phase` so the drawer can
 * highlight it per the mockup (`✓ spec 게이트 — codex APPROVE`, `Phase 2/4 …`).
 */

/**
 * A parsed display line.
 *
 * @typedef {Object} DisplayLine
 * @property {'assistant'|'tool'|'gate'|'phase'|'result'|'error'|'blocker'} kind
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
  WebFetch: '🌐',
  WebSearch: '🌐'
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
  return line;
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
      } else if (c.type === 'tool_use') {
        const line = toolLine(c);
        if (typeof c.id === 'string') {
          toolsById.set(c.id, line);
        }
        out.push(line);
      }
      // `thinking` blocks are intentionally dropped (not shown in the mockup).
    }
    return out;
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
        }
      }
    }
    return [];
  }
  if (raw.type === 'result') {
    const success = raw.is_error === false && raw.subtype === 'success';
    return [
      {
        kind: 'result',
        success,
        text:
          typeof raw.result === 'string' ? raw.result : success ? 'DONE' : ''
      }
    ];
  }
  return [];
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
    if (item.type === 'error') {
      return [{ kind: 'error', text: String(item.message || '') }];
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
 * Parse a raw runner event stream into ordered display lines.
 *
 * @param {Array<unknown|string>} events - Raw parsed objects or jsonl strings.
 * @returns {DisplayLine[]}
 */
export function parseTranscript(events) {
  /** @type {DisplayLine[]} */
  const lines = [];
  /** @type {Map<string, DisplayLine>} */
  const toolsById = new Map();
  const list = Array.isArray(events) ? events : [];
  for (const entry of list) {
    /** @type {any} */
    let raw = entry;
    if (typeof entry === 'string') {
      const t = entry.trim();
      if (t.length === 0) {
        continue;
      }
      try {
        raw = JSON.parse(t);
      } catch {
        continue;
      }
    }
    if (!isObject(raw)) {
      continue;
    }
    const produced = isCodexShape(raw)
      ? parseCodex(raw)
      : parseClaude(raw, toolsById);
    for (const line of produced) {
      lines.push(line);
    }
  }
  return lines;
}
