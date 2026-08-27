/**
 * The cause sentence for one failure contract token — the ONE copy both the
 * client card vocabulary (`app/views/worker/failure-labels.js`) and the
 * server's completion failure comment read (UI-8w4t §4).
 *
 * It lives here, with no imports, because the server may not pull the client's
 * label module: that one imports `lanes.js` and therefore lit-html. The
 * precedent is `app/utils/worker-eligibility.js`, which `server/worker/
 * attach.js` already imports — pure data shared by both runtimes, not a new
 * layer.
 *
 * The tokens themselves are owned by dotfiles' workflow contract; this map is a
 * CONSUMER that only says a known one in Korean. An unknown token is never
 * guessed at — every caller falls back to the raw code.
 */

/**
 * Contract token → the cause sentence.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const FAILURE_SENTENCES = Object.freeze({
  repo_ops_worktree_unowned:
    '배포 워크트리가 아직 Worker 소유가 아니어서 스크립트 실행 전에 중단됐습니다.',
  verify_cmd_failed: '머지 후 검증 명령이 실패했습니다.',
  gh_observation_failed: 'GitHub에서 PR 상태를 읽지 못했습니다.',
  verify_script_failure: '검증 스크립트가 실패했습니다.',
  deploy_script_failure: '배포 스크립트가 실패했습니다.',
  interrupted_without_terminal_exit: '작업이 종료 기록 없이 중단됐습니다.',
  manual_target_missing:
    '수동 배포 기록에 핀된 대상 SHA가 없어 실행하지 않았습니다.',
  // Cleanup step 1 (base 포함 확인). This step runs before any repo operation
  // exists, so a stop here produces no operation card and no failure_kind —
  // the cleanup record's raw reason is the ONLY thing that can say what
  // happened, and these sentences are what turns it into an answer.
  base_unresolved: 'PR이 어느 base 브랜치로 머지되는지 확정하지 못했습니다.',
  base_ref_unobserved: 'PR의 base 브랜치를 아직 관측하지 못했습니다.',
  merge_sha_unobserved: '머지 커밋 SHA를 아직 관측하지 못했습니다.',
  base_fetch_failed: '원격 base 브랜치를 fetch하지 못했습니다.',
  base_rev_unavailable: 'fetch한 원격 base 브랜치의 커밋을 읽지 못했습니다.',
  base_ff_diverged:
    '로컬 base 브랜치가 원격과 갈라져 fast-forward로 정렬할 수 없습니다.',
  deployment_target_not_covering_merge:
    '배포 대상 base가 이 머지 커밋을 포함하지 않습니다.',
  deployment_candidate_ancestry_check_failed:
    '배포 대상 base가 이 머지 커밋을 포함하는지 확인하지 못했습니다.',
  // 머지 뒤 완료 흐름이 스스로 내는 두 종단 코드 (UI-8w4t §3). 자동 AI 수리
  // 레인이 사라진 뒤로 이 둘은 곧장 사람에게 오므로, 카드가 raw 토큰 대신
  // 무슨 일이 있었는지를 말해야 한다.
  verify_red: '머지 후 검증이 실패했습니다.',
  repair_lane_retired: '자동 수리 레인이 은퇴해 사람 처리로 넘어왔습니다.'
});
