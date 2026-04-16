import { html, render } from 'lit-html';

/**
 * @typedef {(input: string, init?: RequestInit) => Promise<{ ok?: boolean, json: () => Promise<any> }>} WorkerFetch
 */

/**
 * @param {HTMLElement} mount_element
 * @param {{ fetch_impl?: WorkerFetch }} [options]
 */
export function createWorkerSpecPanel(mount_element, options = {}) {
  const fetch_impl = options.fetch_impl || fetch;
  let issue_id = '';
  let workspace = '';
  let original_content = '';
  let draft_content = '';
  let editing = false;
  let error_message = '';

  function renderView() {
    render(
      html`
        <section class="worker-spec-panel">
          <header class="worker-spec-panel__header">
            <h3>Spec</h3>
            ${editing
              ? html`
                  <div class="worker-spec-panel__actions">
                    <button type="button" data-worker-spec-save @click=${save}>
                      Save
                    </button>
                    <button
                      type="button"
                      data-worker-spec-cancel
                      @click=${cancel}
                    >
                      Cancel
                    </button>
                  </div>
                `
              : html`
                  <button type="button" data-worker-spec-edit @click=${edit}>
                    Edit spec
                  </button>
                `}
          </header>

          ${editing
            ? html`
                <textarea
                  .value=${draft_content}
                  @input=${(/** @type {Event} */ event) => {
                    draft_content = /** @type {HTMLTextAreaElement} */ (
                      event.currentTarget
                    ).value;
                  }}
                ></textarea>
              `
            : html`<pre>${original_content}</pre>`}
          ${error_message
            ? html`
                <p class="worker-spec-panel__error" role="alert">
                  ${error_message}
                </p>
              `
            : ''}
        </section>
      `,
      mount_element
    );
  }

  function edit() {
    editing = true;
    draft_content = original_content;
    error_message = '';
    renderView();
  }

  function cancel() {
    editing = false;
    draft_content = original_content;
    error_message = '';
    renderView();
  }

  async function save() {
    const url = `/api/worker/spec/${encodeURIComponent(issue_id)}?workspace=${encodeURIComponent(workspace)}`;
    try {
      const response = await fetch_impl(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: draft_content })
      });
      const payload = await response.json();
      if (response.ok === false) {
        throw new Error(
          typeof payload?.error === 'string' && payload.error.length > 0
            ? payload.error
            : 'Failed to save spec'
        );
      }
      original_content = payload.content || draft_content;
      draft_content = original_content;
      editing = false;
      error_message = '';
      renderView();
    } catch (error) {
      error_message =
        error instanceof Error && error.message.length > 0
          ? error.message
          : 'Failed to save spec';
      renderView();
    }
  }

  return {
    /**
     * @param {string} next_issue_id
     * @param {string} next_workspace
     */
    async load(next_issue_id, next_workspace) {
      issue_id = next_issue_id;
      workspace = next_workspace;
      const url = `/api/worker/spec/${encodeURIComponent(issue_id)}?workspace=${encodeURIComponent(workspace)}`;
      try {
        const response = await fetch_impl(url);
        const payload = await response.json();
        original_content = payload.content || '';
      } catch {
        original_content = '';
      }
      draft_content = original_content;
      editing = false;
      error_message = '';
      renderView();
    },
    clear() {
      issue_id = '';
      workspace = '';
      original_content = '';
      draft_content = '';
      editing = false;
      error_message = '';
      render(html``, mount_element);
    }
  };
}
