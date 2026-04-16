import { html, render } from 'lit-html';
import { workerPrPanelTemplate } from './worker-pr-panel.js';
import { workerPrSummaryTemplate } from './worker-pr-summary.js';
import { createWorkerSpecPanel } from './worker-spec-panel.js';

/**
 * @typedef {{ id: string, title?: string, status?: string }} WorkerDetailIssue
 * @typedef {{ status?: string, issueId?: string, command?: string, prNumber?: number }} WorkerDetailJob
 * @typedef {{ number: number, title: string, state?: string }} WorkerPullRequest
 * @typedef {(input: string, init?: RequestInit) => Promise<{ json: () => Promise<any> }>} WorkerFetch
 */

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   fetch_impl?: WorkerFetch,
 *   onRunRalph?: (issue_id: string) => void,
 *   onRunPrReview?: (target: { issueId: string, prNumber?: number }) => void
 * }} [options]
 */
export function createWorkerDetailView(mount_element, options = {}) {
  const fetch_impl = options.fetch_impl || fetch;
  /** @type {WorkerDetailIssue | null} */
  let current_issue = null;
  let current_workspace = '';
  /** @type {WorkerDetailJob[]} */
  let jobs = [];

  /**
   * @param {WorkerPullRequest[]} [selected_prs]
   * @param {WorkerPullRequest[]} [workspace_prs]
   */
  async function renderShell(selected_prs = [], workspace_prs = []) {
    const issue = current_issue;
    render(
      html`
        <section class="worker-detail">
          ${issue
            ? html`
                <header class="worker-detail__summary">
                  <h2>${issue.id}</h2>
                  <p>${issue.title || '(no title)'}</p>
                  <div class="worker-detail__badges">
                    <span>${issue.status || 'open'}</span>
                    ${jobs
                      .filter((job) => job.issueId === issue.id)
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
                      @click=${() => {
                        if (current_issue) {
                          options.onRunRalph?.(current_issue.id);
                        }
                      }}
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
                issueId: issue?.id || '',
                prNumber: item.number
              })
          })}
          ${workerPrSummaryTemplate(workspace_prs)}
        </section>
      `,
      mount_element
    );

    if (current_issue) {
      const issue = current_issue;
      const host = /** @type {HTMLElement | null} */ (
        mount_element.querySelector('#worker-detail-spec-host')
      );
      if (host) {
        const nested_panel = createWorkerSpecPanel(host, { fetch_impl });
        await nested_panel.load(issue.id, current_workspace);
      }
    }
  }

  return {
    /**
     * @param {WorkerDetailIssue | null} issue
     * @param {string} workspace
     * @param {WorkerDetailJob[]} [next_jobs]
     */
    async load(issue, workspace, next_jobs = []) {
      current_issue = issue;
      current_workspace = workspace;
      jobs = next_jobs;
      if (!issue || !workspace) {
        await renderShell([], []);
        return;
      }

      /** @type {{ items?: any[] }} */
      let issue_payload = { items: [] };
      /** @type {{ items?: any[] }} */
      let workspace_payload = { items: [] };
      try {
        const issue_response = await fetch_impl(
          `/api/worker/prs/${encodeURIComponent(issue.id)}?workspace=${encodeURIComponent(workspace)}`
        );
        issue_payload = await issue_response.json();
      } catch {
        issue_payload = { items: [] };
      }
      try {
        const workspace_response = await fetch_impl(
          `/api/worker/prs?workspace=${encodeURIComponent(workspace)}`
        );
        workspace_payload = await workspace_response.json();
      } catch {
        workspace_payload = { items: [] };
      }

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
