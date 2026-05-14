import { html, render } from 'lit-html';
import { formatElapsedMs } from '../data/worker-selectors.js';
import { createWorkerSpecPanel } from './worker-spec-panel.js';

/**
 * @typedef {{ id: string, title?: string, status?: string, metadata?: Record<string, string> }} WorkerDetailIssue
 * @typedef {{ id?: string, status?: string, issueId?: string, command?: string, prNumber?: number, elapsedMs?: number, isCancellable?: boolean, errorSummary?: string, workspace?: string, wasForceKilled?: boolean }} WorkerDetailJob
 * @typedef {(input: string, init?: RequestInit) => Promise<{ ok?: boolean, json: () => Promise<any> }>} WorkerFetch
 */

/**
 * @param {HTMLElement} mount_element
 * @param {{
 *   fetch_impl?: WorkerFetch,
 *   onCancelJob?: (job_id: string) => void,
 *   onUpdateWorkerMetadata?: (issue_id: string, values: { worker_parallel?: string, worker_model?: string, worker_effort?: string }) => void
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

  function saveWorkerOverrides() {
    const issue = current_issue;
    if (!issue) {
      return;
    }
    const parallel_input = /** @type {HTMLInputElement | null} */ (
      mount_element.querySelector('[name="worker-parallel"]')
    );
    const model_input = /** @type {HTMLInputElement | null} */ (
      mount_element.querySelector('[name="worker-model"]')
    );
    const effort_select = /** @type {HTMLSelectElement | null} */ (
      mount_element.querySelector('[name="worker-effort"]')
    );
    options.onUpdateWorkerMetadata?.(issue.id, {
      worker_parallel: parallel_input?.checked ? 'true' : 'false',
      worker_model: (model_input?.value || '').trim(),
      worker_effort: effort_select?.value || ''
    });
  }

  async function renderShell() {
    const issue = current_issue;
    const metadata = issue?.metadata || {};
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
                  <div class="worker-detail__overrides">
                    <label class="worker-detail__override">
                      <input
                        type="checkbox"
                        name="worker-parallel"
                        .checked=${metadata.worker_parallel === 'true'}
                      />
                      <span>Parallel</span>
                    </label>
                    <label class="worker-detail__override">
                      <span>Model</span>
                      <input
                        type="text"
                        name="worker-model"
                        .value=${metadata.worker_model || ''}
                        placeholder="default"
                      />
                    </label>
                    <label class="worker-detail__override">
                      <span>Effort</span>
                      <select
                        name="worker-effort"
                        .value=${metadata.worker_effort || ''}
                      >
                        <option value="">Default</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </label>
                    <button
                      type="button"
                      class="worker-btn worker-btn--secondary"
                      data-worker-overrides-save
                      @click=${saveWorkerOverrides}
                    >
                      Save overrides
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
                          ${current_job.wasForceKilled
                            ? html`<div>Force killed</div>`
                            : null}
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
                          ${job.wasForceKilled
                            ? html`<span>Force killed</span>`
                            : null}
                        </li>
                      `
                    )}
                  </ul>
                </section>
              `
            : null}

          <section id="worker-detail-spec-host"></section>
        </section>
      `,
      mount_element
    );

    if (current_issue) {
      const detail_issue = current_issue;
      const host = /** @type {HTMLElement | null} */ (
        mount_element.querySelector('#worker-detail-spec-host')
      );
      if (host) {
        const nested_panel = createWorkerSpecPanel(host, { fetch_impl });
        await nested_panel.load(detail_issue.id, current_workspace);
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
        await renderShell();
        return;
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
          if (!log_response.ok) {
            throw new Error('log not ok');
          }
          const log_payload = await log_response.json();
          log_tail = Array.isArray(log_payload.tail) ? log_payload.tail : [];
        } catch {
          log_tail = [];
          log_error = 'Failed to load log preview.';
        }
      }

      await renderShell();
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
