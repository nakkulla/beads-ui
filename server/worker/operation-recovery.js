import { createHash } from 'node:crypto';
import { scriptIdentity } from './resolution-ladder.js';

const OWNERSHIP_FAILURES = new Set([
  'repo_ops_worktree_unowned',
  'repo_ops_ancestry_check_failed',
  'remote_history_not_monotonic',
  'repo_ops_worktree_align_failed',
  'manual_target_missing',
  'bootstrap_not_approved'
]);

/**
 * Classify terminal evidence without changing the failed operation or retry.
 *
 * @param {{ operation: any, policy_supported: boolean, classify: (key: string) => { classification: string, disposition: string, reason: string|null }|null }} input
 */
export function classifyOperationRecovery({
  operation,
  policy_supported,
  classify
}) {
  if (operation?.state !== 'failed') {
    return null;
  }
  const failure = operation.failure || {};
  const retry = operation.retry;
  let key = 'unknown_error';
  if (!policy_supported || retry?.blocked_reason === 'schema_unsupported') {
    key = 'unknown_error';
  } else if (
    failure.interrupted === true ||
    failure.code === 'interrupted_without_terminal_exit'
  ) {
    key = 'unknown_outcome';
  } else if (OWNERSHIP_FAILURES.has(failure.code)) {
    key = 'ownership_uncertain';
  } else if (failure.fetch_failure || failure.code === 'timeout') {
    key = 'unknown_error';
  } else if (
    ['verify', 'deploy', 'job'].includes(operation.kind) &&
    failure.code === 'script_failed' &&
    retry?.outcome === 'consumed' &&
    typeof failure.fingerprint === 'string' &&
    failure.fingerprint.length > 0 &&
    retry.first_failure?.fingerprint === failure.fingerprint &&
    scriptIdentity(operation) !== null &&
    typeof operation.target_sha === 'string'
  ) {
    key = 'local_code_defect';
  } else if (
    failure.code === 'script_failed' &&
    (retry?.outcome === 'not_applicable' ||
      (retry?.first_failure &&
        retry.first_failure.fingerprint !== failure.fingerprint))
  ) {
    key = 'verification_failure';
  } else if (failure.code === 'credential_missing') {
    key = 'credential_missing';
  }
  const classification = classify(key) || {
    classification: 'unknown_error',
    disposition: 'wait',
    reason: 'unclassified'
  };
  const code_defect =
    key === 'local_code_defect' && classification.disposition === 'repair';
  return {
    classification: classification.classification,
    disposition: classification.disposition,
    reason: classification.reason,
    code_defect,
    handoff_key: code_defect
      ? createHash('sha256')
          .update(
            JSON.stringify({
              repo_id: operation.repo_id,
              kind: operation.kind,
              target_sha: operation.target_sha,
              script_blob_sha: operation.script_blob_sha,
              script_mode: operation.script_mode,
              failure_code: failure.code,
              fingerprint: failure.fingerprint
            })
          )
          .digest('hex')
      : null
  };
}

/**
 * Build the ordinary workflow handoff; logs remain references, never contents.
 *
 * @param {{ operation_id: string, operation: any }} input
 * @returns {string}
 */
export function repairHandoffDescription({ operation_id, operation }) {
  const failure = operation.failure || {};
  const script_path = operation.script_path || '(스크립트 경로 확인 필요)';
  return [
    '## 출처/배경',
    `- 원본 Bead: ${operation.subjects.map((/** @type {any} */ subject) => subject.bead_id).join(', ')}`,
    `- operation: ${operation_id}`,
    `- 대상: ${operation.target_sha} (base ${operation.target_base}, 정책 ${operation.effective_base_sha})`,
    `- 스크립트: ${script_path} (blob ${operation.script_blob_sha}, mode ${operation.script_mode})`,
    `- 실패: ${failure.code} · exit ${operation.exit_code} · ${failure.summary || '(요약 없음)'}`,
    `- 로그: ${operation.log_path || '(없음)'}`,
    '',
    '## 기대 효과',
    '동일 입력에서 재현된 소유 코드 결함을 수정하고 검증된 PR·배포 뒤 원래 정리를 재시도한다.',
    '',
    '## 영향 surface와 경계',
    '일반 workflow의 승인·검토·PR·배포를 따른다. 원본 실패·로그·부분 효과를 보존하며 공유 배포 worktree에서 수정하지 않는다.',
    '일회성 잡은 explicit replaces와 실제 실행·산출·clean 검증을 거친 뒤 원래 정리를 재시도한다. 수정 PR 생성만으로 원본을 닫지 않는다.',
    '',
    '## scope',
    `- ${script_path}`,
    '',
    '## 검증 bundle',
    `- baseline_red: command=${script_path} --mode ${operation.script_mode} @ ${operation.target_sha}`,
    '- 동일 실패 재현 근거와 승인 artifact를 확인하고 원인 수정 뒤 저장소 필수 검증을 실행한다.',
    '- 수정 대상의 실제 종료·산출·clean 및 배포 성공을 확인한 뒤 원본 [정리 재시도]와 닫힘을 확인한다.'
  ].join('\n');
}
