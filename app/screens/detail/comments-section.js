/**
 * The issue detail's 댓글 section (UI-ucq6 §변경 3): `get-comments` once per
 * issue and again only when the snapshot's `comment_count` moves (that field
 * is what carries an external write into the client), `add-comment` whose
 * reply is the refreshed list, and the report cards' open state. Moved out of
 * the detail panel closure (UI-dbn6 Phase 2) with its behaviour unchanged.
 *
 * @import { DetailContext } from './index.js'
 */
import { showToast } from '../../utils/toast.js';
import { commentsTemplate } from './comments.js';

/**
 * @param {DetailContext} ctx
 */
export function createCommentsSection(ctx) {
  /** @type {import('./comments.js').IssueComment[]} */
  let comments = [];
  /** @type {string|null} */
  let comments_loaded_for = null;
  /** @type {number|null} */
  let last_comment_count = null;
  let comments_error = false;
  let comment_draft = '';
  let comment_sending = false;
  // Guards a late reply from an issue the reader has already left.
  let comments_request_seq = 0;
  /** @type {Set<string>} */
  const comments_expanded = new Set();

  function reset() {
    comments = [];
    comments_loaded_for = null;
    last_comment_count = null;
    comments_error = false;
    comment_draft = '';
    comment_sending = false;
    comments_request_seq += 1;
    comments_expanded.clear();
  }

  /**
   * Fetch the comment list for one issue.
   *
   * The failure branch needs a transport that propagates its rejection;
   * `get-comments` is one of the shell's propagated request types, so a failed
   * read shows the failure line rather than the "댓글 없음" empty state.
   *
   * @param {string} id
   */
  async function fetchComments(id) {
    const transport = ctx.transport;
    if (!transport) {
      return;
    }
    const seq = ++comments_request_seq;
    try {
      const res = await Promise.resolve(transport('get-comments', { id }));
      if (seq !== comments_request_seq || id !== ctx.id()) {
        return;
      }
      comments = Array.isArray(res) ? res : [];
      comments_error = false;
    } catch {
      if (seq !== comments_request_seq || id !== ctx.id()) {
        return;
      }
      comments_error = true;
    }
    ctx.render();
  }

  /**
   * Fetch on first open, then only when `comment_count` actually moves. A
   * snapshot without the field stops the auto-refetch and keeps the first fetch
   * (fail-quiet) — an older server should lose freshness, not the section.
   */
  function sync() {
    const id = ctx.id();
    if (!ctx.transport || !id) {
      return;
    }
    const current = ctx.data();
    const count =
      current && typeof current.comment_count === 'number'
        ? current.comment_count
        : null;
    if (comments_loaded_for !== id) {
      comments_loaded_for = id;
      last_comment_count = count;
      void fetchComments(id);
      return;
    }
    if (count !== null && count !== last_comment_count) {
      last_comment_count = count;
      void fetchComments(id);
    }
  }

  /**
   * @param {string} comment_id
   */
  function toggleReport(comment_id) {
    if (comments_expanded.has(comment_id)) {
      comments_expanded.delete(comment_id);
    } else {
      comments_expanded.add(comment_id);
    }
    ctx.render();
  }

  /**
   * Re-render only at the empty↔non-empty boundary, which is the only thing the
   * draft drives in the template (the submit button). Rendering on every
   * keystroke would rewrite the textarea's `.value` and move the caret.
   *
   * @param {string} value
   */
  function onDraftInput(value) {
    const was_blank = comment_draft.trim().length === 0;
    comment_draft = value;
    if (was_blank !== (value.trim().length === 0)) {
      ctx.render();
    }
  }

  /**
   * `handleAddComment` answers with the refreshed comment array and is the one
   * mutation handler that triggers no list refresh, so the reply payload — not
   * a refetch and not the `comment_count` path — is what updates the list.
   */
  async function submit() {
    const text = comment_draft.trim();
    const id = ctx.id();
    const transport = ctx.transport;
    if (!transport || !id || text.length === 0 || comment_sending) {
      return;
    }
    comment_sending = true;
    ctx.render();
    let ok = false;
    try {
      const res = await Promise.resolve(transport('add-comment', { id, text }));
      // A successful add always yields at least the comment just written, so an
      // empty array is the transport's swallowed error rather than a result.
      if (Array.isArray(res) && res.length > 0) {
        ok = true;
        if (id === ctx.id()) {
          comments = res;
          comments_error = false;
          comment_draft = '';
          last_comment_count = res.length;
        }
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      showToast('댓글 추가 실패', 'error');
    }
    if (id === ctx.id()) {
      comment_sending = false;
    }
    ctx.render();
  }

  const handlers = { onToggle: toggleReport, onDraftInput, onSubmit: submit };

  return {
    reset,
    sync,
    template() {
      return commentsTemplate(comments, handlers, {
        expanded: comments_expanded,
        draft: comment_draft,
        sending: comment_sending,
        error: comments_error
      });
    }
  };
}
