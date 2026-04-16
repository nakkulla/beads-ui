import { html, render } from 'lit-html';
import { createWorkerSpecPanel } from './worker-spec-panel.js';
import { workerPrPanelTemplate } from './worker-pr-panel.js';
import { workerPrSummaryTemplate } from './worker-pr-summary.js';

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   fetch_impl?: typeof fetch,
 *   onRunRalph?: (issue_id: string) => void,
 *   onRunPrReview?: (target: { issueId: string, prNumber?: number }) => void
 * }} [options]
 */
export function createWorkerDetailView(mount_element, options = {}) {
  const fetch_impl = options.fetch_impl || fetch;
  let current_issue = null;
  let current_workspace = '';
  /** @type {any[]} */
  let jobs = [];

  async function renderShell(selected_prs = [], workspace_prs = []) {
    render(
      html`
        <section class="worker-detail">
          ${current_issue
            ? html`
                <header class="worker-detail__summary">
                  <h2>${current_issue.id}</h2>
                  <p>${current_issue.title || '(no title)'}</p>
                  <div class="worker-detail__badges">
                    <span>${current_issue.status || 'open'}</span>
                    ${jobs
                      .filter((job) => job.issueId === current_issue.id)
                      .map(
                        (job) => html`
                          <span class="worker-badge worker-badge--active"
                            >${job.status}</span
                          >
                        `
                      )}
                  </div>
                  <div class="worker-detail__actions">
                    <button
                      type="button"
                      @click=${() => options.onRunRalph?.(current_issue.id)}
                    >
                      Run bd-ralph-v2
                    </button>
                  </div>
                </header>
              `
            : html`<div class="worker-empty">No parent selected.</div>`}

          <section id="worker-detail-spec-host"></section>
          ${workerPrPanelTemplate(selected_prs, {
            onRunPrReview: (item) =>
              options.onRunPrReview?.({
                issueId: current_issue?.id || '',
                prNumber: item.number
              })
          })}
          ${workerPrSummaryTemplate(workspace_prs)}
        </section>
      `,
      mount_element
    );

    if (current_issue) {
      const host = /** @type {HTMLElement | null} */ (
        mount_element.querySelector('#worker-detail-spec-host')
      );
      if (host) {
        const nested_panel = createWorkerSpecPanel(host, { fetch_impl });
        await nested_panel.load(current_issue.id, current_workspace);
      }
    }
  }

  return {
    async load(issue, workspace, next_jobs = []) {
      current_issue = issue;
      current_workspace = workspace;
      jobs = next_jobs;
      if (!issue || !workspace) {
        await renderShell([], []);
        return;
      }

      const issue_response = await fetch_impl(
        `/api/worker/prs/${encodeURIComponent(issue.id)}?workspace=${encodeURIComponent(workspace)}`
      );
      const issue_payload = await issue_response.json();
      const workspace_response = await fetch_impl(
        `/api/worker/prs?workspace=${encodeURIComponent(workspace)}`
      );
      const workspace_payload = await workspace_response.json();

      await renderShell(
        Array.isArray(issue_payload.items) ? issue_payload.items : [],
        Array.isArray(workspace_payload.items) ? workspace_payload.items : []
      );
    },
    clear() {
      current_issue = null;
      current_workspace = '';
      jobs = [];
      render(html``, mount_element);
    }
  };
}
