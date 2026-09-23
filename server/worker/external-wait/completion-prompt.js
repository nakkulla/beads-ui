/**
 * @import { WaitRecord } from './store.js'
 */

/**
 * Give the resumed session observations, without claiming artifact
 * correctness. The Worker fork and the `[세션에서 이어가기]` session resume
 * share these exact bytes (UI-r6xq §4.3-4).
 *
 * @param {WaitRecord} record
 * @returns {string}
 */
export function externalWaitCompletionPrompt(record) {
  const lines = ['## 외부 작업 완료'];
  for (const job of record.jobs) {
    const terminal = job.terminal;
    lines.push(
      `${job.adapter === 'slurm' ? job.job_id : job.pid} · ${job.state} · exit_code=${terminal?.exit_code ?? 'unknown'} · evidence=${terminal?.evidence || 'unknown'}`
    );
    for (const result of terminal?.expected_results || []) {
      lines.push(
        `${result.path} exists=${result.exists} size=${result.size} mtime=${result.mtime}`
      );
    }
    lines.push(
      `recovery_needed=${terminal?.recovery_needed ?? true} · log=${job.log_path}`
    );
  }
  lines.push(
    `completion.digest=${record.completion?.digest}`,
    `recovery_needed=${record.completion?.recovery_needed}`,
    '관찰 완료는 구현 완료가 아니다 — 아티팩트의 의미 검증·복구·커밋·완료는 이 세션이 한다'
  );
  return lines.join('\n');
}
