import { html, render } from 'lit-html';
import { formatElapsedMs } from '../data/worker-selectors.js';
import { workerPrPanelTemplate } from './worker-pr-panel.js';
import { workerPrSummaryTemplate } from './worker-pr-summary.js';
import { createWorkerSpecPanel } from './worker-spec-panel.js';

/**
 * @typedef {{ id: string, title?: string, status?: string }} WorkerDetailIssue
 * @typedef {{ id?: string, status?: string, issueId?: string, command?: string, prNumber?: number, elapsedMs?: number, isCancellable?: boolean, errorSummary?: string, workspace?: string }} WorkerDetailJob
 * @typedef {{ number: number, title: string, state?: string }} WorkerPullRequest
 * @typedef {(input: string, init?: RequestInit) => Promise<{ ok?: boolean, json: () => Promise<any> }>} WorkerFetch
 */

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   fetch_impl?: WorkerFetch,
 *   onRunRalph?: (issue_id: string) => void,
 *   onRunPrReview?: (target: { issueId: string, prNumber?: number }) => void,
 *   onCancelJob?: (job_id: string) => void
 * }} [options]
 */
export function createWorkerDetailView(mount_element, options = {}) {
  const fetch_impl = options.fetch_impl || fetch;
  /** @type {WorkerDetailIssue | null} */
  let current_issue = null;
  let current_workspace = '';
  /** @type {WorkerDetailJob[]} */
  let jobs = [];
  /** @type {string[]} */
  let log_tail = [];
  let log_error = '';

  /**
   * @param {WorkerPullRequest[]} [selected_prs]
   * @param {WorkerPullRequest[]} [workspace_prs]
   */
  async function renderShell(selected_prs = [], workspace_prs = []) {
    const issue = current_issue;
    const issue_jobs = issue
      ? jobs.filter((job) => job.issueId === issue.id)
      : [];
    const current_job =
      issue_jobs.find((job) =>
        ['queued', 'starting', 'running', 'cancelling'].includes(
          String(job.status)
        )
      ) || null;
    const recent_jobs = current_job
      ? issue_jobs.filter((job) => job.id !== current_job.id)
      : issue_jobs;

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
                    ${current_job
                      ? html`<span class="worker-badge worker-badge--active"
                          >${current_job.status}</span
                        >`
                      : null}
                  </div>
                  <div class="worker-detail__actions">
                    <button
                      type="button"
                      ?disabled=${!!current_job}
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
          ${issue
            ? html`
                <section class="worker-detail__jobs">
                  <h3>Current job</h3>
                  ${current_job
                    ? html`
                        <div class="worker-detail__job-card">
                          <div>${current_job.command || 'worker job'}</div>
                          <div>${current_job.status}</div>
                          <div>${formatElapsedMs(current_job.elapsedMs)}</div>
                          ${current_job.isCancellable
                            ? html`
                                <button
                                  type="button"
                                  data-cancel-job=${current_job.id}
                                  @click=${() => {
                                    if (current_job.id) {
                                      options.onCancelJob?.(current_job.id);
                                    }
                                  }}
                                >
                                  Cancel
                                </button>
                              `
                            : null}
                        </div>
                        <div class="worker-detail__log-preview">
                          <h4>Log preview</h4>
                          ${log_error
                            ? html`<p>${log_error}</p>`
                            : log_tail.length > 0
                              ? html`<pre>${log_tail.join('\n')}</pre>`
                              : html`<p>No log output yet.</p>`}
                        </div>
                      `
                    : html`<p>No active job.</p>`}

                  <h3>Recent jobs</h3>
                  <ul>
                    ${recent_jobs.map(
                      (job) => html`
                        <li>
                          <span>${job.status}</span>
                          <span>${formatElapsedMs(job.elapsedMs)}</span>
                          ${job.errorSummary
                            ? html`<span>${job.errorSummary}</span>`
                            : null}
                        </li>
                      `
                    )}
                  </ul>
                </section>
              `
            : null}

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
      log_tail = [];
      log_error = '';
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

      const current_job = jobs.find(
        (job) =>
          job.issueId === issue.id &&
          ['queued', 'starting', 'running', 'cancelling'].includes(
            String(job.status)
          )
      );
      if (current_job?.id) {
        try {
          const log_response = await fetch_impl(
            `/api/worker/jobs/${encodeURIComponent(current_job.id)}/log?workspace=${encodeURIComponent(workspace)}&tail=20`
          );
          const log_payload = await log_response.json();
          log_tail = Array.isArray(log_payload.tail) ? log_payload.tail : [];
        } catch {
          log_tail = [];
          log_error = 'Failed to load log preview.';
        }
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
      log_tail = [];
      log_error = '';
      render(html``, mount_element);
    }
  };
}
