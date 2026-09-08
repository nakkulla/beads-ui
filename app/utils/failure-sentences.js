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
  // 첫 `[deploy]` 선언의 bootstrap 게이트(2026-08-13 compat spec §3.5). 자동
  // 경로는 이전 base의 스크립트만 실행하므로, 이전 base에 선언이 없는 첫
  // 활성화는 사람 승인 없이 돌지 않는다 — 문장이 출구까지 말해야 카드가 답이 된다.
  bootstrap_not_approved:
    '첫 [deploy] 선언은 사람 승인 없이 실행하지 않습니다. Worker 설정의 [배포 실행]으로 원격 base tip을 한 번 배포한 뒤 [정리 재시도]를 누르세요 — 그 뒤 머지부터는 자동 배포됩니다.',
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

/**
 * Contract token → the sentence that says WHAT TO DO FIRST (UI-kyky §4.2).
 *
 * Separate from {@link FAILURE_SENTENCES} because the two answer different
 * questions: that one says what happened, this one says what the reader has to
 * look at before pressing anything. Keeping them apart is also what lets the
 * server's completion report keep quoting the cause alone — a report has no
 * buttons, so a screen-only next action must not ride along with the cause.
 *
 * No DOM, no network, no queue judgment lives here (§4.1). The renderer reads
 * the current resume kind, `resume_eligible` and the controls it actually drew,
 * and finishes the sentence. An unknown token has no entry and the `다음` row is
 * omitted entirely (fail-quiet) — a guessed action is worse than none.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const FAILURE_NEXT_ACTIONS = Object.freeze({
  // 실행한 명령이 남긴 출력이 원인을 이미 말한다.
  verify_cmd_failed:
    '실패한 명령과 그 출력을 확인하고 원인을 고치는 것이 먼저입니다.',
  verify_script_failure:
    '실패한 명령과 그 출력을 확인하고 원인을 고치는 것이 먼저입니다.',
  deploy_script_failure:
    '실패한 명령과 그 출력을 확인하고 원인을 고치는 것이 먼저입니다.',
  verify_red: '실패한 명령과 그 출력을 확인하고 원인을 고치는 것이 먼저입니다.',
  // 원격을 읽지 못한 실패 — 고칠 코드가 아니라 확인할 연결이다.
  base_fetch_failed: '원격 연결과 관측 상태를 확인하는 것이 먼저입니다.',
  gh_observation_failed: '원격 연결과 관측 상태를 확인하는 것이 먼저입니다.',
  base_ref_unobserved: '원격 연결과 관측 상태를 확인하는 것이 먼저입니다.',
  merge_sha_unobserved: '원격 연결과 관측 상태를 확인하는 것이 먼저입니다.',
  base_rev_unavailable: '원격 연결과 관측 상태를 확인하는 것이 먼저입니다.',
  deployment_candidate_ancestry_check_failed:
    '원격 연결과 관측 상태를 확인하는 것이 먼저입니다.',
  // 대상·소유·브랜치가 어긋난 실패. 문구가 reset·삭제를 지시하지 않는다 —
  // 무엇이 어긋났는지는 세션에서 사람이 읽고 정한다.
  base_ff_diverged: '대상 브랜치와 소유·브랜치 상태를 세션에서 확인하세요.',
  deployment_target_not_covering_merge:
    '대상 브랜치와 소유·브랜치 상태를 세션에서 확인하세요.',
  repo_ops_worktree_unowned:
    '대상 브랜치와 소유·브랜치 상태를 세션에서 확인하세요.',
  manual_target_missing:
    '대상 브랜치와 소유·브랜치 상태를 세션에서 확인하세요.',
  base_unresolved: '대상 브랜치와 소유·브랜치 상태를 세션에서 확인하세요.',
  // 사람 승인 게이트. 진입점은 Worker 설정이지 이 카드의 버튼이 아니다.
  bootstrap_not_approved:
    'Worker 설정의 [배포 실행]으로 원격 base tip을 한 번 배포하는 것이 먼저입니다.',
  // 외부 저장소 착지. 이 워크스페이스가 그 배포를 대신하지 않는다.
  foreign_landing_unpinned:
    '외부 대상 저장소의 핀 설정을 확인하거나, 원 세션에서 배포·마감을 확인하세요.',
  foreign_checkout_unavailable:
    '외부 대상 저장소의 핀 설정을 확인하거나, 원 세션에서 배포·마감을 확인하세요.',
  foreign_deploy_unsupported:
    '외부 대상 저장소의 핀 설정을 확인하거나, 원 세션에서 배포·마감을 확인하세요.',
  // 세부를 아직 모르는 종단. 남아 있는 원인·기록이 유일한 재료다.
  interrupted_without_terminal_exit:
    '남아 있는 원인과 실행 기록을 먼저 확인하세요.',
  cleanup_failed: '남아 있는 원인과 실행 기록을 먼저 확인하세요.',
  retry_exhausted: '남아 있는 원인과 실행 기록을 먼저 확인하세요.',
  conflict_unresolved: '남아 있는 원인과 실행 기록을 먼저 확인하세요.',
  internal_record_failed: '남아 있는 원인과 실행 기록을 먼저 확인하세요.',
  repair_lane_retired: '남아 있는 원인과 실행 기록을 먼저 확인하세요.'
});

/**
 * Stale-work action refusal `reason` → the sentence the toast says (UI-kyky §5).
 *
 * These are the reasons the SERVER answers a stale-work click with, so they are
 * a different vocabulary from `STALE_WORK_CAUSES`, which explains why leftover
 * work exists at all — the two stay in their own modules rather than merging
 * into one map that would answer two questions with one lookup (§4.1).
 *
 * `ownership_unknown` is deliberately absent: it is an admission cause, never an
 * answer to this action. A reason with no entry keeps the caller's existing
 * fallback — the generic conflict sentence, or the raw reason — because a
 * sentence invented for an unknown code would state a remedy nobody verified.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const STALE_WORK_REFUSALS = Object.freeze({
  revision_conflict:
    '작업 목록이 갱신되었습니다. 현재 상태를 확인한 뒤 다시 선택하세요.',
  stale_work_conflict:
    '이전 작업의 확인 결과가 바뀌었습니다. 현재 표시된 상태를 확인하세요.',
  waiting_lane_changed:
    '대기열 배치가 바뀌었습니다. 현재 위치를 확인한 뒤 다시 선택하세요.',
  discard_in_progress:
    '이 작업의 폐기가 진행 중입니다. 끝난 뒤 상태를 확인하세요.',
  action_in_flight: '다른 작업 처리가 진행 중입니다. 끝난 뒤 다시 선택하세요.',
  bead_running: '이 이슈의 세션이 실행 중입니다. 실행 상태를 먼저 확인하세요.',
  external_pr_owner:
    '다른 세션이 관리하는 PR이 있습니다. 해당 PR과 세션 상태를 먼저 확인하세요.',
  remote_branch_owner:
    '원격 브랜치가 남아 있어 자동으로 처리할 수 없습니다. 브랜치와 PR 상태를 확인하세요.',
  base_identity_changed:
    '기준 브랜치의 상태가 바뀌었습니다. 현재 기준 브랜치를 확인하세요.',
  worktree_identity_changed:
    '작업 디렉터리의 식별 정보가 바뀌었습니다. 해당 작업 디렉터리를 확인하세요.',
  remote_ref_observe_failed:
    '원격 PR·브랜치 상태를 확인하지 못했습니다. 연결과 접근 권한을 확인한 뒤 다시 선택하세요.'
});
