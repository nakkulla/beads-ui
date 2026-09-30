/**
 * The line, bundle, group and subagent templates of the transcript drawer
 * (UI-2dbn §4.3~§4.5), moved verbatim out of `transcript-drawer.js` (UI-dbn6
 * Phase 2). The drawer owns the fold/expand state and hands it in as a
 * {@link TranscriptView}; these templates only read it and call its toggles.
 */
import { html } from 'lit-html';
import { renderMarkdown } from '../../utils/markdown.js';
import {
  blocksOf,
  firstLineOf,
  foldRuns,
  lineCountOf,
  segmentsOf,
  summarizeWork,
  verdictClass
} from './transcript-blocks.js';

/**
 * @import { DisplayLine } from './transcript-render.js'
 */

/**
 * The drawer's fold/expand state and toggles.
 *
 * @typedef {Object} TranscriptView
 * @property {Set<number>} expanded - Line idx whose detail is open.
 * @property {Set<number>} unfolded - Group or subagent idx the reader opened.
 * @property {Map<number, boolean>} bundle_open - Work bundles the reader toggled.
 * @property {(idx: number) => void} toggleExpand
 * @property {(idx: number, is_open: boolean) => void} toggleBundle
 * @property {(idx: number) => void} unfoldGroup
 */

/**
 * @param {number} idx
 * @param {DisplayLine} line
 * @param {TranscriptView} view
 * @returns {import('lit-html').TemplateResult | string}
 */
export function lineTemplate(idx, line, view) {
  if (line.kind === 'gate') {
    if (!line.gate || !line.verdict) {
      return html`<div class="sv__gate">${line.text}</div>`;
    }
    return html`<div class="sv__gate" title=${line.text || ''}>
      <span class="sv__gate-name">${line.gate}</span>
      ${line.reviewer
        ? html`<span class="sv__gate-reviewer">${line.reviewer}</span>`
        : ''}
      <span class="sv__verdict${verdictClass(line.verdict)}"
        >${line.verdict}</span
      >
    </div>`;
  }
  if (line.kind === 'phase') {
    return html`<div class="sv__phase">${line.text}</div>`;
  }
  if (line.kind === 'result') {
    // The verdict lives in the card head; the report body is markdown in the
    // body colour, so a long report no longer reads as one green block.
    return html`<div
      class="sv__result${line.success
        ? ' sv__result--ok'
        : ' sv__result--fail'}"
    >
      <div class="sv__result-head">${line.success ? '✓ 완료' : '✗ 실패'}</div>
      ${line.text
        ? html`<div class="sv__result-body">${renderMarkdown(line.text)}</div>`
        : ''}
    </div>`;
  }
  if (line.kind === 'thinking') {
    const is_expanded = view.expanded.has(idx);
    return html`<div
      class="sv__think${is_expanded ? ' sv__think--expanded' : ''}"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${() => view.toggleExpand(idx)}
    >
      <span class="sv__think-line">💭 ${firstLineOf(line.text)}</span>
      ${is_expanded
        ? html`<pre class="sv__think-expand">${line.text}</pre>`
        : ''}
    </div>`;
  }
  if (line.kind === 'user') {
    // What a person typed (UI-4xzk §5.4). Never through `renderMarkdown` —
    // an instruction is prose, and a stray `#` or `_` is a character, not
    // formatting. Long prompts collapse the way thinking blocks do so one
    // paste cannot fill the drawer.
    const is_expanded = view.expanded.has(idx);
    return html`<div
      class="sv__line sv__line--user${is_expanded ? ' sv__line--expanded' : ''}"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${() => view.toggleExpand(idx)}
    >
      <div class="sv__user-bubble">
        <span class="sv__user-who">사람 입력</span>
        <span class="sv__user-line">▷ ${firstLineOf(line.text)}</span>
        ${is_expanded
          ? html`<pre class="sv__user-expand">${line.text}</pre>`
          : ''}
      </div>
    </div>`;
  }
  if (line.kind === 'error') {
    return html`<div class="sv__error">⛔ ${line.text}</div>`;
  }
  if (line.kind === 'blocker') {
    return html`<div class="sv__error">⛔ ${line.text}</div>`;
  }
  if (line.kind === 'tool') {
    const is_expanded = view.expanded.has(idx);
    // A heredoc folded onto one nowrap line is unreadable; show its opening
    // line and say how much is hidden.
    const command_lines = line.tool === 'Bash' ? lineCountOf(line.command) : 0;
    const detail =
      line.tool === 'Bash'
        ? command_lines > 1
          ? firstLineOf(line.command)
          : line.command
        : line.path || line.command || '';
    // The detail is ellipsized to keep the row one line; the title carries
    // what the ellipsis cut, including a heredoc's hidden lines.
    const detail_full = line.tool === 'Bash' ? line.command || '' : detail;
    return html`<div
      class="sv__tool${line.is_error === true
        ? ' sv__tool--error'
        : ''}${is_expanded ? ' sv__tool--expanded' : ''}"
      role="button"
      tabindex="0"
      @click=${() => view.toggleExpand(idx)}
    >
      <span class="sv__tool-line">
        <span class="sv__tool-icon">${line.icon}</span>
        <span class="sv__tool-name">${line.tool}</span>
        ${detail
          ? html`<span class="sv__tool-detail" title=${detail_full}
              >${detail}</span
            >`
          : ''}
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
          ? html`<span class="sv__tool-out" title=${line.result}
              >${line.result}</span
            >`
          : ''}
      </span>
      ${is_expanded
        ? html`<pre class="sv__tool-expand">${expandTemplate(line)}</pre>`
        : ''}
    </div>`;
  }
  // assistant — session output is untrusted, and renderMarkdown sanitizes
  // through DOMPurify before it reaches the DOM.
  return html`<div class="sv__as">${renderMarkdown(line.text || '')}</div>`;
}

/**
 * The expanded tool pane: the call, then its output under a `출력` label.
 *
 * @param {DisplayLine} line
 * @returns {import('lit-html').TemplateResult}
 */
function expandTemplate(line) {
  let call = '';
  if (
    line.tool === 'Bash' &&
    typeof line.command === 'string' &&
    line.command.length > 0
  ) {
    // Verbatim, not the JSON-escaped input blob — the command is the thing
    // the reader came to read.
    call = line.command;
  } else if (line.input !== undefined) {
    try {
      call = `input: ${JSON.stringify(line.input, null, 2)}`;
    } catch {
      /* ignore */
    }
  }
  const output =
    typeof line.output === 'string' && line.output.length > 0
      ? line.output
      : '';
  return html`${call}${output
    ? html`<span class="sv__tool-expand-label">출력</span>${output}`
    : ''}`;
}

/**
 * One top-level segment outside or inside a work bundle — the same renderer
 * either way, so folding rules do not depend on where a segment lands.
 *
 * @param {any} seg
 * @param {TranscriptView} view
 */
export function segmentTemplate(seg, view) {
  if (seg.kind === 'subagent') {
    return subagentTemplate(seg, view);
  }
  return seg.kind === 'group'
    ? groupTemplate(seg, view)
    : lineTemplate(seg.idx, seg.line, view);
}

/**
 * One work bundle (UI-2dbn §4.3): a one-line summary, and the rows while
 * open. The reader's own toggle wins over the default rule.
 *
 * @param {{ idx: number, segs: any[], default_open: boolean }} block
 * @param {TranscriptView} view
 */
export function workTemplate(block, view) {
  const chosen = view.bundle_open.get(block.idx);
  const is_open = typeof chosen === 'boolean' ? chosen : block.default_open;
  const summary = summarizeWork(block.segs);
  // A native button: a collapsed bundle hides rows by default, so its toggle
  // has to answer Enter/Space as well as a click.
  return html`<div class="sv__work${is_open ? ' sv__work--open' : ''}">
    <button
      type="button"
      class="sv__work-sum"
      aria-expanded=${is_open ? 'true' : 'false'}
      @click=${() => view.toggleBundle(block.idx, is_open)}
    >
      <span class="sv__work-caret" aria-hidden="true"
        >${is_open ? '▾' : '▸'}</span
      >
      <span class="sv__work-title">작업 ${summary.calls}</span>
      ${summary.tools.length > 0
        ? html`<span class="sv__work-tools"
            >${summary.tools
              .map(([name, count]) => `${name} ${count}`)
              .join(' · ')}</span
          >`
        : ''}
      ${summary.thinking > 0
        ? html`<span class="sv__work-think">생각 ${summary.thinking}</span>`
        : ''}
      ${summary.failed > 0
        ? html`<span class="sv__work-err">✗ ${summary.failed}</span>`
        : ''}
    </button>
    ${is_open
      ? html`<div class="sv__work-rows">
          ${block.segs.map((seg) => segmentTemplate(seg, view))}
        </div>`
      : ''}
  </div>`;
}

/**
 * @param {{ idx: number, tool: string, lines: Array<{ idx: number, line: DisplayLine }> }} seg
 * @param {TranscriptView} view
 */
function groupTemplate(seg, view) {
  return html`<div
    class="sv__group"
    role="button"
    tabindex="0"
    title="펼치기"
    @click=${() => view.unfoldGroup(seg.idx)}
  >
    <span class="sv__group-icon">${seg.lines[0].line.icon}</span>
    <span class="sv__group-name">${seg.tool}</span>
    <span class="sv__group-count">${seg.lines.length}</span>
    <span class="sv__group-caret" aria-hidden="true">▸</span>
  </div>`;
}

/**
 * One folded Claude subagent (UI-2mpn §6.4): the `Agent` call as the header,
 * its child lines indented under it, collapsed by default.
 *
 * @param {{ idx: number, launch_id: string, agent_type: string|null, header: { idx: number, line: DisplayLine }|null, lines: Array<{ idx: number, line: DisplayLine }> }} seg
 * @param {TranscriptView} view
 */
function subagentTemplate(seg, view) {
  const open = view.unfolded.has(seg.idx);
  const header = seg.header ? seg.header.line : null;
  // No header means the snapshot began mid-subagent, so nothing is known
  // about how it ended — the state glyph is omitted rather than guessed.
  const state = !header
    ? ''
    : header.is_error === true
      ? '✗'
      : typeof header.result === 'string'
        ? '✓'
        : '⟳';
  const detail = header && header.command ? header.command : '';
  return html`<div class="sv__sub${open ? ' sv__sub--open' : ''}">
    <div
      class="sv__sub-head"
      role="button"
      tabindex="0"
      title="펼치기"
      @click=${() => view.unfoldGroup(seg.idx)}
    >
      <span class="sv__sub-icon" aria-hidden="true">🤖</span>
      <span class="sv__sub-name">${seg.agent_type || 'subagent'}</span>
      ${detail ? html`<span class="sv__sub-detail">${detail}</span>` : ''}
      <span class="sv__sub-count">${seg.lines.length}줄</span>
      ${state
        ? html`<span
            class="sv__sub-state${state === '✓'
              ? ' sv__sub-state--ok'
              : state === '✗'
                ? ' sv__sub-state--bad'
                : ''}"
            >${state}</span
          >`
        : ''}
      ${open
        ? ''
        : html`<span class="sv__sub-caret" aria-hidden="true">▸</span>`}
    </div>
    ${open
      ? html`<div class="sv__sub-body">
          ${foldRuns(seg.lines, view.unfolded).map((child) =>
            child.kind === 'group'
              ? groupTemplate(child, view)
              : lineTemplate(child.idx, child.line, view)
          )}
        </div>`
      : ''}
  </div>`;
}

/**
 * The transcript body: every block in order, or the empty line.
 *
 * @param {DisplayLine[]} lines
 * @param {TranscriptView} view
 * @returns {import('lit-html').TemplateResult}
 */
export function bodyTemplate(lines, view) {
  return html`${lines.length === 0
    ? html`<div class="sv__empty">세션 로그 없음</div>`
    : blocksOf(segmentsOf(lines, view.unfolded)).map((block) =>
        block.kind === 'work'
          ? workTemplate(block, view)
          : segmentTemplate(block.seg, view)
      )}`;
}
