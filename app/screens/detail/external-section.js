/**
 * The issue detail's 외부 작업 section (UI-l48z §4.2, UI-r6xq §4.1): the
 * expected-path observation of a consumer issue — its wait badge and headline,
 * one row per job (host · id, state, exit, expected results, the log path that
 * copies on click), the server's `actions[]` INCLUDING the `placement:
 * 'detail'` ones, and the time line. An action with `confirm` asks first; the
 * op and payload are the pipeline's (`runExternalWaitAction`). Drawn only when
 * the connected repo's projection names a live record for this issue.
 *
 * @import { DetailContext } from './index.js'
 * @import { ExternalWaitObservation } from '../../protocol.js'
 */
import { html } from 'lit-html';
import { opButton } from '../pipeline/chips.js';
import { runExternalWaitAction } from '../pipeline/external-wait-action.js';
import { waitLines } from '../pipeline/wait.js';

/**
 * @param {DetailContext} ctx
 */
export function createExternalSection(ctx) {
  /** @type {Set<string>} */
  const pending = new Set();

  /**
   * The detail is a sibling of the pipeline mount, so the pipeline's delegated
   * handler never sees these buttons; the section sends the same op and
   * payload itself.
   *
   * @param {Event} event
   */
  async function onOp(event) {
    const target = /** @type {HTMLElement|null} */ (event.target);
    const button = /** @type {HTMLButtonElement|null} */ (
      target?.closest('[data-external-wait-op]') || null
    );
    if (!button) {
      return;
    }
    event.stopPropagation();
    const root_dir = button.dataset.rootDir || '';
    const wait_id = button.dataset.waitId || '';
    const key = `${root_dir}:${wait_id}`;
    const transport = ctx.transport;
    if (!transport || !root_dir || !wait_id || pending.has(key)) {
      return;
    }
    pending.add(key);
    button.disabled = true;
    try {
      await runExternalWaitAction(button, { transport });
    } finally {
      pending.delete(key);
      button.disabled = false;
      ctx.render();
    }
  }

  /**
   * @returns {ExternalWaitObservation|null}
   */
  function recordOf() {
    const root_dir = ctx.workspace();
    const id = ctx.id();
    const rows =
      ctx.queue()?.external_waits ?? ctx.pipelineRow()?.external_waits ?? [];
    return (
      rows.find(
        (/** @type {ExternalWaitObservation} */ row) =>
          row.root_dir === root_dir &&
          row.bead_id === id &&
          ['hold', 'detached', 'completing'].includes(row.stage)
      ) || null
    );
  }

  return {
    /**
     * @returns {import('lit-html').TemplateResult|''}
     */
    template() {
      const record = recordOf();
      if (!record || !record.jobs.length) {
        return '';
      }
      const id = ctx.id();
      const reason = ctx
        .waitReasons()
        .find(
          (entry) =>
            entry.kind === 'external_job' && entry.subject.bead_id === id
        );
      const labels = Array.isArray(ctx.data()?.labels) ? ctx.data().labels : [];
      const lines = waitLines(reason, {
        surface: 'detail',
        external_wait: record,
        session_preferred: labels.includes('session-preferred'),
        now: Date.now()
      });
      return html`<section
        class="detail-external-wait dt-section"
        data-section="external"
      >
        <div class="detail-section-label">외부 작업</div>
        ${lines.badge}${lines.body}
        <table class="detail-external-wait__jobs">
          <thead>
            <tr>
              <th>잡</th>
              <th>상태</th>
              <th>exit</th>
              <th>expected 경로별 결과</th>
              <th>로그</th>
            </tr>
          </thead>
          <tbody>
            ${record.jobs.map(
              (job) =>
                html`<tr>
                  <td>
                    ${[job.ssh_host, job.job_id ?? job.pid]
                      .filter((value) => value !== undefined)
                      .join(' · ')}
                  </td>
                  <td>${job.state || ''}</td>
                  <td>${job.terminal?.exit_code ?? ''}</td>
                  <td>
                    ${(job.terminal?.expected_results || []).map(
                      (result) =>
                        html`<div>
                          <code>${result.path}</code> ·
                          ${result.exists ? '존재' : '없음'}${result.size ===
                          null
                            ? ''
                            : ` · ${result.size} bytes`}
                          ${result.mtime === null
                            ? ''
                            : ` · mtime ${result.mtime}`}
                        </div>`
                    )}
                  </td>
                  <td>
                    ${job.log_path
                      ? html`<button
                          type="button"
                          class="detail-external-wait__log"
                          title="클릭하면 복사"
                          @click=${() => ctx.copyText(job.log_path || '')}
                        >
                          ${job.log_path}
                        </button>`
                      : ''}
                  </td>
                </tr>`
            )}
          </tbody>
        </table>
        ${lines.ops.length > 0
          ? html`<div class="detail-external-wait__ops" @click=${onOp}>
              ${lines.ops.map((op) => opButton(op))}
            </div>`
          : ''}
        ${lines.times}
      </section>`;
    }
  };
}
