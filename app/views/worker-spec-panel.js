import { html, render } from 'lit-html';

/**
 * @typedef {(input: string, init?: RequestInit) => Promise<{ json: () => Promise<any> }>} WorkerFetch
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
        </section>
      `,
      mount_element
    );
  }

  function edit() {
    editing = true;
    draft_content = original_content;
    renderView();
  }

  function cancel() {
    editing = false;
    draft_content = original_content;
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
      original_content = payload.content || draft_content;
      draft_content = original_content;
      editing = false;
      renderView();
    } catch {
      original_content = draft_content;
      editing = false;
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
      renderView();
    },
    clear() {
      issue_id = '';
      workspace = '';
      original_content = '';
      draft_content = '';
      editing = false;
      render(html``, mount_element);
    }
  };
}
