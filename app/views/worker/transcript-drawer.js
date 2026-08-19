/**
 * Session transcript drawer (spec §5.6, mockup `worker-session-log.html`).
 *
 * A running tile (or a session-history row) opens this drawer as a modal
 * overlay above the lanes — the host owns the overlay/backdrop chrome, the
 * drawer only renders its own bar+body. It subscribes to the live append
 * stream via `subscribe-session-log` (server pushes a snapshot then per-event
 * appends into `sessionLogStore`), parses the raw stream with `parseTranscript`,
 * and renders assistant / thinking / tool / gate / phase / result / error lines.
 * The same viewer opens a Done/Failed session's persisted log (snapshot-only —
 * no appends ever fire for a finished attempt).
 *
 * Readability (UI-dixx): assistant and result bodies are markdown, so they go
 * through `renderMarkdown` (marked + DOMPurify) instead of `pre-wrap`; thinking
 * blocks — the only place a session says *why* — show as a dim one-liner that
 * expands; and the bar carries a current-stage chip sourced in three tiers
 * (see {@link stageOf}).
 *
 * Live-follow: the `⇣` pill auto-scrolls to the tail on each append while ON;
 * a manual scroll-up flips it OFF; clicking the pill toggles it back.
 */
import { html, render } from 'lit-html';
import { copyToClipboard } from '../../utils/clipboard.js';
import { renderMarkdown } from '../../utils/markdown.js';
import { formatRelativeTime } from '../../utils/relative-time.js';
import { showToast } from '../../utils/toast.js';
import {
  formatRecordedAt,
  promptBlockTemplate,
  promptStatusTemplate
} from '../prompt-block.js';
import { parseTranscript } from './transcript-render.js';

/**
 * @import { DisplayLine } from './transcript-render.js'
 */

/** A run of this many identical tool lines collapses into one group. */
const FOLD_AT = 5;

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
function firstLineOf(text) {
  if (typeof text !== 'string') {
    return '';
  }
  return (text.split(/\r?\n/).find((l) => l.trim().length > 0) || '').trim();
}

/**
 * @param {unknown} text
 * @returns {number}
 */
function lineCountOf(text) {
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
function stageOf(lines) {
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
function formatAgo(at, now_ms) {
  if (typeof at !== 'number') {
    return '';
  }
  const seconds = Math.max(0, Math.floor((now_ms - at) / 1000));
  return seconds < 60 ? `${seconds}초 전` : formatRelativeTime(at, now_ms);
}

/**
 * @typedef {Object} DrawerMeta
 * @property {string} [runner] - claude/codex/ccx.
 * @property {string} [model]
 * @property {string} [role]
 * @property {string} [effort]
 * @property {string} [worktree] - Worktree path shown in the bar.
 * @property {string} [status] - running/done/failed (for the bar label).
 * @property {string} [session_id] - Runner session id (claude session_id /
 * codex thread_id) for `--resume`; shown short (first 8) + click-to-copy (§2).
 */

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   transport?: (type: string, payload?: unknown) => Promise<any>,
 *   sessionLogStore?: { get: (id: string) => { lines: unknown[], last_event_at?: number|null } | null, subscribe: (fn: () => void) => () => void },
 *   onClose?: () => void
 * }} [options]
 * @returns {{ open: (input: { attempt_id: string, launch_id?: string, meta?: DrawerMeta }) => void, updateMeta: (meta: DrawerMeta) => void, close: () => void, isOpen: () => boolean, destroy: () => void }}
 */
export function createTranscriptDrawer(mount_element, options = {}) {
  const { transport, sessionLogStore, onClose } = options;

  /** @type {string | null} */
  let attempt_id = null;
  /** @type {string | null} */
  let launch_id = null;
  /** @type {string | null} */
  let subscription_id = null;
  /** @type {DrawerMeta} */
  let meta = {};
  let follow = true;
  /** @type {Set<number>} */
  const expanded = new Set();
  /** @type {Set<number>} */
  const unfolded = new Set();
  /** @type {null | (() => void)} */
  let storeOff = null;
  /** @type {ReturnType<typeof setInterval> | null} */
  let heartbeat = null;
  // The attempt's recorded send (UI-rxp3 §5), collapsed by default and fetched
  // on first expand. Scoped to the open attempt: opening another one drops it.
  let prompt_expanded = false;
  let prompt_loading = false;
  let prompt_error = false;
  /** @type {any} */
  let prompt_data = null;
  /** @type {string|null} */
  let prompt_loaded_for = null;

  function resetPrompt() {
    prompt_expanded = false;
    prompt_loading = false;
    prompt_error = false;
    prompt_data = null;
    prompt_loaded_for = null;
  }

  /**
   * Fetch the open attempt's send. Workspace scope is the server's: the request
   * resolves against the connection's verified workspace, the same one
   * `subscribe-session-log` reads, so an attempt of another workspace simply
   * comes back missing.
   *
   * @param {string} id
   */
  async function fetchPrompt(id) {
    if (!transport) {
      return;
    }
    prompt_loading = true;
    prompt_error = false;
    doRender();
    try {
      const res = await Promise.resolve(
        transport('get-attempt-prompt', { attempt_id: id })
      );
      if (attempt_id !== id) {
        return;
      }
      if (!res || typeof res !== 'object' || Array.isArray(res)) {
        prompt_error = true;
      } else {
        prompt_data = res;
        prompt_loaded_for = id;
      }
    } catch {
      if (attempt_id === id) {
        prompt_error = true;
      }
    } finally {
      if (attempt_id === id) {
        prompt_loading = false;
        doRender();
      }
    }
  }

  function togglePrompt() {
    prompt_expanded = !prompt_expanded;
    if (prompt_expanded && attempt_id && prompt_loaded_for !== attempt_id) {
      void fetchPrompt(attempt_id);
      return;
    }
    doRender();
  }

  /**
   * The sent-prompt panel under the bar. Rendered only while expanded — the body is
   * the transcript's, and a prompt pinned above it would push the log down.
   *
   * @returns {import('lit-html').TemplateResult|''}
   */
  function promptTemplate() {
    if (!prompt_expanded) {
      return '';
    }
    const status = promptStatusTemplate({
      loading: prompt_loading,
      error: prompt_error
    });
    if (status) {
      return html`<div class="sv__prompt" data-seam="attempt-prompt">
        ${status}
      </div>`;
    }
    if (!prompt_data) {
      return '';
    }
    if (prompt_data.missing) {
      return html`<div class="sv__prompt" data-seam="attempt-prompt">
        <div class="prompt-block__status">
          기록 없음 — 프롬프트 기록 이전에 실행된 attempt입니다
        </div>
      </div>`;
    }
    const recorded_at = formatRecordedAt(prompt_data.recorded_at);
    return html`<div class="sv__prompt" data-seam="attempt-prompt">
      ${recorded_at
        ? html`<div class="prompt-block__meta">${recorded_at} 발송</div>`
        : ''}
      ${typeof prompt_data.task_prompt === 'string'
        ? promptBlockTemplate('과업 (user)', prompt_data.task_prompt)
        : ''}
      ${typeof prompt_data.system_prompt === 'string'
        ? promptBlockTemplate(
            '시스템 계약 (--append-system-prompt)',
            prompt_data.system_prompt
          )
        : ''}
    </div>`;
  }

  /**
   * @returns {import('./transcript-render.js').DisplayLine[]}
   */
  function currentLines() {
    if (!subscription_id || !sessionLogStore) {
      return [];
    }
    const rec = sessionLogStore.get(subscription_id);
    return parseTranscript(rec ? rec.lines : []);
  }

  /**
   * When the session last moved (epoch ms), or null for a log with no known
   * time (an old snapshot, or a store without the field).
   *
   * @returns {number|null}
   */
  function lastEventAt() {
    if (!subscription_id || !sessionLogStore) {
      return null;
    }
    const rec = sessionLogStore.get(subscription_id);
    const at = rec ? rec.last_event_at : null;
    return typeof at === 'number' ? at : null;
  }

  function isLive() {
    return meta.status === 'running';
  }

  /**
   * The heartbeat's elapsed label has to move on its own — a session can go
   * minutes without emitting an event, and a frozen "3초 전" reads as a dead
   * drawer. Only a live attempt gets the ticker, and it stops the moment the
   * attempt stops being live (or the drawer closes).
   */
  function syncHeartbeat() {
    if (isLive() && attempt_id) {
      if (!heartbeat) {
        heartbeat = setInterval(() => doRender(), 1000);
      }
      return;
    }
    stopHeartbeat();
  }

  function stopHeartbeat() {
    if (heartbeat) {
      clearInterval(heartbeat);
      heartbeat = null;
    }
  }

  /**
   * Group consecutive same-tool lines so a 30-file read sweep does not bury the
   * one line that says what the session is doing. Anything shorter than
   * {@link FOLD_AT} renders as before — folding two lines hides more than it
   * saves.
   *
   * @param {import('./transcript-render.js').DisplayLine[]} lines
   * @returns {Array<{ kind: 'line', idx: number, line: import('./transcript-render.js').DisplayLine } | { kind: 'group', idx: number, tool: string, lines: Array<{ idx: number, line: import('./transcript-render.js').DisplayLine }> }>}
   */
  function segmentsOf(lines) {
    /** @type {any[]} */
    const out = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      if (line.kind === 'tool') {
        let j = i;
        while (
          j < lines.length &&
          lines[j].kind === 'tool' &&
          lines[j].tool === line.tool
        ) {
          j += 1;
        }
        if (j - i >= FOLD_AT && !unfolded.has(i)) {
          out.push({
            kind: 'group',
            idx: i,
            tool: line.tool || '',
            lines: lines.slice(i, j).map((l, k) => ({ idx: i + k, line: l }))
          });
          i = j;
          continue;
        }
      }
      out.push({ kind: 'line', idx: i, line });
      i += 1;
    }
    return out;
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
   * @param {import('./transcript-render.js').DisplayLine[]} lines
   * @returns {import('./transcript-render.js').DisplayLine | null}
   */
  function pendingTool(lines) {
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
   * @param {import('./transcript-render.js').DisplayLine[]} lines
   * @returns {import('./transcript-render.js').DisplayLine | null}
   */
  function lastThinking(lines) {
    for (let i = lines.length - 1; i >= 0; i -= 1) {
      if (lines[i].kind === 'thinking') {
        return lines[i];
      }
    }
    return null;
  }

  /**
   * @param {number} idx
   * @param {import('./transcript-render.js').DisplayLine} line
   * @returns {import('lit-html').TemplateResult | string}
   */
  function lineTemplate(idx, line) {
    if (line.kind === 'gate') {
      return html`<div class="sv__gate">${line.text}</div>`;
    }
    if (line.kind === 'phase') {
      return html`<div class="sv__phase">${line.text}</div>`;
    }
    if (line.kind === 'result') {
      // The final report is markdown too — the glyph and the verdict colour are
      // the drawer's own signal, so only the body goes through the renderer.
      return html`<div
        class="sv__result${line.success
          ? ' sv__result--ok'
          : ' sv__result--fail'}"
      >
        <span class="sv__result-glyph">${line.success ? '✓' : '✗'}</span>
        <span class="sv__result-body"
          >${renderMarkdown(
            line.text || (line.success ? 'DONE' : '실패')
          )}</span
        >
      </div>`;
    }
    if (line.kind === 'thinking') {
      const is_expanded = expanded.has(idx);
      return html`<div
        class="sv__think${is_expanded ? ' sv__think--expanded' : ''}"
        role="button"
        tabindex="0"
        title="펼치기"
        @click=${() => toggleExpand(idx)}
      >
        <span class="sv__think-line">💭 ${firstLineOf(line.text)}</span>
        ${is_expanded
          ? html`<pre class="sv__think-expand">${line.text}</pre>`
          : ''}
      </div>`;
    }
    if (line.kind === 'error') {
      return html`<div class="sv__error">⛔ ${line.text}</div>`;
    }
    if (line.kind === 'blocker') {
      return html`<div class="sv__error">⛔ ${line.text}</div>`;
    }
    if (line.kind === 'tool') {
      const is_expanded = expanded.has(idx);
      // A heredoc folded onto one nowrap line is unreadable; show its opening
      // line and say how much is hidden.
      const command_lines =
        line.tool === 'Bash' ? lineCountOf(line.command) : 0;
      const detail =
        line.tool === 'Bash'
          ? command_lines > 1
            ? firstLineOf(line.command)
            : line.command
          : line.path || line.command || '';
      return html`<div
        class="sv__tool${is_expanded ? ' sv__tool--expanded' : ''}"
        role="button"
        tabindex="0"
        @click=${() => toggleExpand(idx)}
      >
        <span class="sv__tool-line">
          <span class="sv__tool-icon">${line.icon}</span>
          <span class="sv__tool-name">${line.tool}</span>
          ${detail ? html`<span class="sv__tool-detail">${detail}</span>` : ''}
          ${command_lines > 1
            ? html`<span class="sv__tool-more">⋯ ${command_lines}줄</span>`
            : ''}
          ${typeof line.added === 'number'
            ? html`<span class="sv__diff-add">+${line.added}</span>`
            : ''}
          ${typeof line.removed === 'number'
            ? html`<span class="sv__diff-del">−${line.removed}</span>`
            : ''}
          ${line.result
            ? html`<span class="sv__tool-ok">→ ${line.result}</span>`
            : ''}
        </span>
        ${is_expanded
          ? html`<pre class="sv__tool-expand">${expandBody(line)}</pre>`
          : ''}
      </div>`;
    }
    // assistant — session output is untrusted, and renderMarkdown sanitizes
    // through DOMPurify before it reaches the DOM.
    return html`<div class="sv__as">${renderMarkdown(line.text || '')}</div>`;
  }

  /**
   * @param {import('./transcript-render.js').DisplayLine} line
   * @returns {string}
   */
  function expandBody(line) {
    const parts = [];
    if (
      line.tool === 'Bash' &&
      typeof line.command === 'string' &&
      line.command.length > 0
    ) {
      // Verbatim, not the JSON-escaped input blob — the command is the thing
      // the reader came to read.
      parts.push(line.command);
    } else if (line.input !== undefined) {
      try {
        parts.push(`input: ${JSON.stringify(line.input, null, 2)}`);
      } catch {
        /* ignore */
      }
    }
    if (typeof line.output === 'string' && line.output.length > 0) {
      parts.push(`output:\n${line.output}`);
    }
    return parts.join('\n\n');
  }

  function template() {
    if (!attempt_id) {
      return html``;
    }
    const lines = currentLines();
    // runner/model/effort stay inline; the worktree path is its own element so
    // ≤640px can hide it (title keeps the full path) without dropping the rest.
    const metaBits = (
      launch_id ? [meta.model] : [meta.runner, meta.model, meta.effort]
    )
      .filter(Boolean)
      .join(' · ');
    const session_id = meta.session_id || '';
    const follow_label = `라이브 따라가기 ${follow ? 'ON' : 'OFF'}`;
    const live = isLive();
    const ago = live ? formatAgo(lastEventAt(), Date.now()) : '';
    // Only a live attempt has a "지금" — a paused or finished session's dangling
    // tool line is history, and pinning it would claim work that is not running.
    const pending = live ? pendingTool(lines) : null;
    const thinking = live ? lastThinking(lines) : null;
    const stage = stageOf(lines);
    return html`<div class="sv" data-attempt-id=${attempt_id}>
      <div class="sv__bar">
        <span class="sv__id">${launch_id ? meta.role || '' : attempt_id}</span>
        ${stage
          ? html`<span
              class="sv__stage${stage.guess ? ' sv__stage--guess' : ''}"
              title=${stage.text}
              >${stage.text}</span
            >`
          : ''}
        ${live
          ? html`<span
              class="sv__live"
              title="세션이 진행 중입니다"
              aria-label=${ago ? `진행 중 · 마지막 이벤트 ${ago}` : '진행 중'}
              ><span class="sv__live-dot" aria-hidden="true"></span>${ago
                ? html`<span class="sv__live-ago">${ago}</span>`
                : ''}</span
            >`
          : ''}
        ${session_id
          ? html`<button
              type="button"
              class="sv__session"
              title=${session_id}
              aria-label=${`세션 ID 복사: ${session_id}`}
              @click=${() => copySession(session_id)}
            >
              ⧉ ${session_id.slice(0, 8)}
            </button>`
          : ''}
        ${metaBits ? html`<span class="sv__meta">${metaBits}</span>` : ''}
        ${meta.worktree
          ? html`<span class="sv__wt" title=${meta.worktree}
              >${meta.worktree}</span
            >`
          : ''}
        ${launch_id
          ? ''
          : html`<button
              type="button"
              class="sv__prompt-toggle${prompt_expanded
                ? ' sv__prompt-toggle--on'
                : ''}"
              data-seam="attempt-prompt-toggle"
              aria-pressed=${prompt_expanded ? 'true' : 'false'}
              aria-label="발송 프롬프트 보기"
              title="이 세션에 실제로 보낸 시스템·과업 프롬프트"
              @click=${togglePrompt}
            >
              ✉ 프롬프트
            </button>`}
        <button
          type="button"
          class="sv__follow${follow ? ' sv__follow--on' : ''}"
          aria-pressed=${follow ? 'true' : 'false'}
          aria-label=${follow_label}
          @click=${toggleFollow}
        >
          <span class="sv__follow-full">⇣ ${follow_label}</span>
          <span class="sv__follow-short">⇣ ${follow ? 'ON' : 'OFF'}</span>
        </button>
        <button
          type="button"
          class="sv__close"
          aria-label="닫기"
          @click=${() => close()}
        >
          ✕
        </button>
      </div>
      ${launch_id ? '' : promptTemplate()}
      <div class="sv__body">
        ${lines.length === 0
          ? html`<div class="sv__empty">세션 로그 없음</div>`
          : segmentsOf(lines).map((seg) =>
              seg.kind === 'group'
                ? groupTemplate(seg)
                : lineTemplate(seg.idx, seg.line)
            )}
      </div>
      ${pending || thinking
        ? html`<div class="sv__now">
            <span class="sv__now-label">지금</span>
            ${pending
              ? html`<span class="sv__now-icon">${pending.icon}</span>
                  <span class="sv__now-name">${pending.tool}</span>
                  <span class="sv__now-detail"
                    >${pending.tool === 'Bash'
                      ? firstLineOf(pending.command)
                      : pending.path || pending.command || ''}</span
                  >`
              : ''}
            ${thinking
              ? html`<span class="sv__now-think"
                  >💭 ${firstLineOf(thinking.text)}</span
                >`
              : ''}
          </div>`
        : ''}
    </div>`;
  }

  /**
   * @param {{ idx: number, tool: string, lines: Array<{ idx: number, line: import('./transcript-render.js').DisplayLine }> }} seg
   */
  function groupTemplate(seg) {
    return html`<div
      class="sv__group"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${() => unfoldGroup(seg.idx)}
    >
      <span class="sv__group-icon">${seg.lines[0].line.icon}</span>
      <span class="sv__group-name">${seg.tool}</span>
      <span class="sv__group-count">${seg.lines.length}</span>
      <span class="sv__group-caret" aria-hidden="true">▸</span>
    </div>`;
  }

  /**
   * @param {number} idx
   */
  function unfoldGroup(idx) {
    unfolded.add(idx);
    doRender();
  }

  function doRender() {
    render(template(), mount_element);
    syncHeartbeat();
    if (follow) {
      scrollToTail();
    }
  }

  function scrollToTail() {
    const body = mount_element.querySelector('.sv__body');
    if (body) {
      body.scrollTop = body.scrollHeight;
    }
  }

  /**
   * @param {number} idx
   */
  function toggleExpand(idx) {
    if (expanded.has(idx)) {
      expanded.delete(idx);
    } else {
      expanded.add(idx);
    }
    doRender();
  }

  function toggleFollow() {
    follow = !follow;
    doRender();
  }

  /**
   * Copy the full session id to the clipboard (Board `복사됨`/`복사 실패` toast
   * convention).
   *
   * @param {string} value
   */
  function copySession(value) {
    void copyToClipboard(value).then((ok) => {
      if (ok) {
        showToast('복사됨', 'success', 1200);
      } else {
        showToast('복사 실패', 'error', 1600);
      }
    });
  }

  /**
   * Merge fresh meta into the open drawer (spec §2 late arrival): the session id
   * lands on the stream's first event, so a drawer opened before that must be
   * refreshed from the attempt record without re-opening (which would reset
   * follow/expand state).
   *
   * @param {DrawerMeta} next
   */
  function updateMeta(next) {
    if (!attempt_id || !next) {
      return;
    }
    meta = { ...meta, ...next };
    doRender();
  }

  /**
   * A manual scroll-up (away from the tail) auto-disables live-follow.
   *
   * @param {Event} ev
   */
  function onScroll(ev) {
    const body = /** @type {HTMLElement} */ (ev.target);
    if (!body || !body.classList || !body.classList.contains('sv__body')) {
      return;
    }
    const atBottom =
      body.scrollHeight - body.scrollTop - body.clientHeight <= 4;
    if (!atBottom && follow) {
      follow = false;
      doRender();
    }
  }

  mount_element.addEventListener('scroll', onScroll, true);

  /**
   * @param {{ attempt_id: string, launch_id?: string, meta?: DrawerMeta }} input
   */
  function open(input) {
    const next_id = input && input.attempt_id;
    if (!next_id) {
      return;
    }
    const previous_subscription_id = subscription_id;
    attempt_id = next_id;
    launch_id =
      typeof input.launch_id === 'string' && input.launch_id.length > 0
        ? input.launch_id
        : null;
    subscription_id = launch_id
      ? `session-log:${attempt_id}:${launch_id}`
      : `session-log:${attempt_id}`;
    // Switching rows inside an open drawer replaces the subscription rather
    // than adding one: the server keys a subscription by (connection,
    // client_id), so a new id leaves the old listener pushing forever.
    if (
      transport &&
      previous_subscription_id &&
      previous_subscription_id !== subscription_id
    ) {
      void Promise.resolve(
        transport('unsubscribe-session-log', { id: previous_subscription_id })
      ).catch(() => {});
    }
    meta = input.meta || {};
    follow = true;
    expanded.clear();
    unfolded.clear();
    resetPrompt();
    if (!storeOff && sessionLogStore) {
      storeOff = sessionLogStore.subscribe(doRender);
    }
    if (transport) {
      void Promise.resolve(
        transport('subscribe-session-log', {
          id: subscription_id,
          attempt_id,
          ...(launch_id ? { launch_id } : {})
        })
      ).catch(() => {});
    }
    doRender();
  }

  function close() {
    const id = subscription_id;
    attempt_id = null;
    launch_id = null;
    subscription_id = null;
    expanded.clear();
    unfolded.clear();
    resetPrompt();
    stopHeartbeat();
    if (transport && id) {
      void Promise.resolve(transport('unsubscribe-session-log', { id })).catch(
        () => {}
      );
    }
    render(html``, mount_element);
    if (onClose) {
      onClose();
    }
  }

  return {
    open,
    updateMeta,
    close,
    isOpen() {
      return attempt_id !== null;
    },
    destroy() {
      stopHeartbeat();
      if (storeOff) {
        storeOff();
        storeOff = null;
      }
      mount_element.removeEventListener('scroll', onScroll, true);
      attempt_id = null;
      launch_id = null;
      subscription_id = null;
      render(html``, mount_element);
    }
  };
}
