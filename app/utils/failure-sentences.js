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
  // 머지 뒤 완료 흐름이 사람에게 넘기는 5종 (UI-5ym8 §7). 접기 뒤에는 모든
  // 종단 사유가 `<가족>:<세부>` 꼴이고, 문장 조회는 콜론 구간별로 뒤에서부터
  // 이기므로 — `failure-labels.js failureSentence` — 가족 문장은 세부 토큰에
  // 문장이 있으면 자연히 그쪽에 자리를 내준다. 즉 여기 5종은 "세부를 아직
  // 모르는 카드"의 바닥이지 세부를 가리는 덮개가 아니다.
  verify_red: '머지 후 검증이 실패했습니다.',
  cleanup_failed: '머지 후 정리가 끝나지 못했습니다.',
  retry_exhausted: '자동 재시도를 모두 쓰고도 같은 실패가 이어졌습니다.',
  conflict_unresolved: '충돌 해소가 끝나지 못했습니다.',
  internal_record_failed: 'Worker 내부 기록이 실패해 진행을 멈췄습니다.',
  // UI-jf33: enclosed foreign landing — 착지가 rig가 아닌 다른 저장소에서
  // 일어난 quick_fix. 판정 저장소를 고르지 못한 이유를 각각 이름한다.
  foreign_landing_unpinned:
    '다른 저장소 착지인데 foreign_repo·foreign_path·foreign_base 핀이 없거나 형식이 틀립니다.',
  foreign_checkout_unavailable:
    '핀된 대상 저장소 체크아웃이 없거나 foreign_repo와 같은 URL의 remote가 없습니다.',
  foreign_deploy_unsupported:
    '대상 저장소가 [deploy]를 선언해 Worker가 배포 증거를 만들 수 없습니다. 세션이 배포와 마감을 소유합니다.',
  // 레거시 — UI-8w4t 이전에 저장된 saga만 이 토큰을 이름한다. 지금은 로드 시
  // `internal_record_failed:migration:repair_lane_retired`로 접히므로 마지막
  // 구간이 이 문장을 이긴다. 남겨 두는 이유는 접기 이전에 쓰인 기록을 읽는
  // 화면이 여전히 raw 토큰을 만나기 때문이다.
  repair_lane_retired: '자동 수리 레인이 은퇴해 사람 처리로 넘어왔습니다.'
});
