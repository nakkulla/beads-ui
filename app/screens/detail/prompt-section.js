/**
 * The issue detail's 과업 프롬프트 section (UI-rxp3 §5): collapsed by default,
 * `get-bead-prompt` on the first expand, cached per (workspace, bead) — a
 * second open of the same issue does not re-request, and switching issues
 * drops it. Moved out of the detail panel closure (UI-dbn6 Phase 2) with its
 * behaviour unchanged.
 *
 * @import { DetailContext } from './index.js'
 */
import { taskPromptTemplate } from './task-prompt.js';

/**
 * @param {DetailContext} ctx
 */
export function createPromptSection(ctx) {
  let prompt_expanded = false;
  let prompt_loading = false;
  let prompt_error = false;
  /** @type {any} */
  let prompt_data = null;
  /** @type {string|null} */
  let prompt_loaded_for = null;
  // Guards a late reply from an issue the reader has already left.
  let prompt_request_seq = 0;

  /**
   * The cache key: the WORKSPACE plus the bead. A workspace switch leaves the
   * overlay open with the same `selected_id`, so a bead-only key would serve
   * the previous workspace's send for a same-id bead in the new one — and the
   * reply is resolved server-side against the connection's workspace, so the
   * two really are different records.
   *
   * @param {string} id
   * @returns {string}
   */
  function promptCacheKey(id) {
    return `${ctx.workspace()}::${id}`;
  }

  function reset() {
    prompt_expanded = false;
    prompt_loading = false;
    prompt_error = false;
    prompt_data = null;
    prompt_loaded_for = null;
    prompt_request_seq += 1;
  }

  /**
   * Fetch the bead's recorded send. The reply is either a record or the missing
   * shape carrying the default task prompt — both are rendered, neither is an
   * error.
   *
   * @param {string} id
   */
  async function fetchTaskPrompt(id) {
    const transport = ctx.transport;
    if (!transport) {
      return;
    }
    const seq = ++prompt_request_seq;
    prompt_loading = true;
    prompt_error = false;
    ctx.render();
    try {
      const res = await Promise.resolve(
        transport('get-bead-prompt', { bead_id: id })
      );
      if (seq !== prompt_request_seq) {
        return;
      }
      // A swallowed failure comes back as `[]`; an array is never a valid
      // reply here, so it stays a failure.
      if (!res || typeof res !== 'object' || Array.isArray(res)) {
        prompt_error = true;
      } else {
        prompt_data = res;
        prompt_loaded_for = promptCacheKey(id);
      }
    } catch {
      if (seq === prompt_request_seq) {
        prompt_error = true;
      }
    } finally {
      if (seq === prompt_request_seq) {
        prompt_loading = false;
        ctx.render();
      }
    }
  }

  function toggle() {
    prompt_expanded = !prompt_expanded;
    const id = ctx.id();
    if (prompt_expanded && id && prompt_loaded_for !== promptCacheKey(id)) {
      prompt_data = null;
      void fetchTaskPrompt(id);
      return;
    }
    ctx.render();
  }

  return {
    reset,
    template() {
      return taskPromptTemplate(
        {
          expanded: prompt_expanded,
          loading: prompt_loading,
          error: prompt_error,
          data: prompt_data
        },
        { onToggle: toggle }
      );
    }
  };
}
