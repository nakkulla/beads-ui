import {
  externalJobDisplayName,
  externalSpawnedClass,
  externalSpawnedCountParts
} from '../../../app/protocol.js';

/**
 * @import { WaitRecord, Job } from './store.js'
 */

/** Failed sub-job lines one registered job lists (UI-q15q §3.7). */
const FAILED_SPAWNED_LINE_LIMIT = 10;

/**
 * The sub-job lines under one registered job: a count line, then one line per
 * failed sub-job, most recently ended first. No sub-job gives no line.
 *
 * @param {Job} job
 * @returns {string[]}
 */
function spawnedLines(job) {
  const spawned = job.adapter === 'slurm' ? job.spawned : undefined;
  const parts = externalSpawnedCountParts(spawned?.counts);
  if (!spawned || parts.length === 0) {
    return [];
  }
  const total = parts.reduce((sum, part) => sum + part.count, 0);
  const failed = spawned.rows
    .filter((row) => externalSpawnedClass(row) === 'failed')
    .sort((a, b) =>
      String(b.ended_at || '').localeCompare(String(a.ended_at || ''))
    )
    .slice(0, FAILED_SPAWNED_LINE_LIMIT);
  return [
    `하위 잡 ${total}개 · ${parts.map((part) => `${part.label} ${part.count}`).join(' · ')}`,
    ...failed.map((row) => {
      const name = externalJobDisplayName(row).name;
      return `✕ ${row.job_id}${name ? ` ${name}` : ''} · ${row.state} · exit=${row.exit_code ?? 'unknown'}`;
    })
  ];
}

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
      `recovery_needed=${terminal?.recovery_needed ?? true} · log=${job.log_path}`,
      ...spawnedLines(job)
    );
  }
  lines.push(
    `completion.digest=${record.completion?.digest}`,
    `recovery_needed=${record.completion?.recovery_needed}`,
    '관찰 완료는 구현 완료가 아니다 — 아티팩트의 의미 검증·복구·커밋·완료는 이 세션이 한다'
  );
  return lines.join('\n');
}
