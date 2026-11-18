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
  external_job: '외부 작업을 기다리며 세션과 워크트리를 보존했습니다.',
  external_wait_unproven:
    '이 실행에 연결된 외부 대기 기록을 확인하지 못했습니다.',
  background_shell:
    '백그라운드 셸 태스크를 남기고 턴 종료 — 프로세스 종료로 결과 유실',
  repo_ops_worktree_unowned:
    '배포 워크트리가 아직 Worker 소유가 아니어서 스크립트 실행 전에 중단됐습니다.',
  verify_cmd_failed: '머지 후 검증 명령이 실패했습니다.',
  gh_observation_failed: 'GitHub에서 PR 상태를 읽지 못했습니다.',
  verify_script_failure: '검증 스크립트가 실패했습니다.',
  deploy_script_failure: '배포 스크립트가 실패했습니다.',
  // dotfiles-rnyd9: `[deploy]` exit 75 — the script refused on an outside
  // condition and declared the rerun safe, so nothing is broken yet.
  condition_wait:
    '배포 스크립트가 외부 조건이 맞지 않아 거부했습니다 — Worker가 정해진 간격으로 다시 확인합니다.',
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
  // Consumer copy of the contract failure_classes.pre_merge_hold class name.
  pre_merge_hold:
    '머지 전 검증이 실패했습니다 — 수정 커밋을 push하면 자동으로 다시 검증합니다.',
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
  // UI-k467: enclosed foreign landing의 PR 전달. 핀은 있는데 pr_url이 핀된
  // 저장소 소속이 아니거나, 머지된 외부 PR을 폐기하려 했다.
  foreign_pr_repo_mismatch:
    'foreign_repo 핀이 있는데 기록된 pr_url이 그 저장소의 PR이 아닙니다.',
  foreign_merged_discard_unsupported:
    '이미 머지된 외부 저장소 PR은 Worker가 되돌리지 않습니다.',
  // 계약 failure_classes.foreign_handoff의 분류 문장. 원인별 문장은 아래
  // FOREIGN_HANDOFF_SENTENCES가 따로 갖는다 — quick_fix push 착지의
  // foreign_deploy_unsupported 문장과 분류로 구분한다.
  foreign_handoff: '외부 저장소 PR을 사람에게 넘겼습니다.',
  // quick_fix push 착지 (`server/worker/quickfix-landing.js`
  // `QuickfixLandingReason`). 여기 없는 착지 토큰은 카드에 짧은 라벨 "착지
  // 실패"만 남기므로 표와 typedef의 일치를 테스트가 지킨다. 몇 토큰은 PR 완료
  // 흐름도 쓰므로 문장은 두 흐름 모두에서 참이어야 한다.
  premature_close:
    'Worker가 착지를 확인하기 전에 Bead가 닫혔고, 닫힌 사유가 refuted·no-delta가 아닙니다.',
  invalid_impl_review:
    'Bead가 resolved인데 push한 head에 묶인 impl_review 영수증이 없거나 형식이 틀립니다.',
  head_mismatch: 'impl_review 영수증의 SHA가 착지할 head와 맞지 않습니다.',
  push_not_contained: '리뷰된 head가 원격 base 브랜치에 들어 있지 않습니다.',
  containment_unobservable:
    '리뷰된 head가 원격 base 브랜치에 들어 있는지 확인하지 못했습니다.',
  repo_ops_config_invalid:
    'repo-ops/config.toml 선언을 읽지 못했거나 형식이 틀립니다.',
  repo_operation_failed: '배포·검증 같은 저장소 작업이 실패했습니다.',
  repo_operation_pending: '머지 후 저장소 작업이 아직 끝나지 않았습니다.',
  worktree_remove_failed: '작업 워크트리를 지우지 못했습니다.',
  local_branch_delete_failed: '작업 로컬 브랜치를 지우지 못했습니다.',
  bd_close_failed: 'Bead를 닫지 못했습니다.',
  bd_read_failed: 'Bead 상태를 읽지 못했습니다.',
  bd_record_failed: 'Bead 기록을 쓰거나 다시 읽어 확인하지 못했습니다.',
  delivery_unproven:
    'Bead가 resolved가 아니어서 push 기록과 리뷰 영수증으로 착지를 증명하려 했지만 증명하지 못했습니다.',
  push_log_absent: '이 실행이 base 브랜치로 push한 기록이 없습니다.',
  impl_review_missing: 'impl_review 영수증이 없습니다.',
  impl_review_sha_mismatch:
    'impl_review 영수증의 SHA가 push한 head와 다릅니다.',
  // 레거시 — UI-8w4t 이전에 저장된 saga만 이 토큰을 이름한다. 지금은 로드 시
  // `internal_record_failed:migration:repair_lane_retired`로 접히므로 마지막
  // 구간이 이 문장을 이긴다. 남겨 두는 이유는 접기 이전에 쓰인 기록을 읽는
  // 화면이 여전히 raw 토큰을 만나기 때문이다.
  repair_lane_retired: '자동 수리 레인이 은퇴해 사람 처리로 넘어왔습니다.'
});

/**
 * `foreign_handoff` cause → the PR-flow sentence (UI-k467 §3.7). Read by the
 * class token `foreign_handoff:<cause>`, never by the bare cause: the bare
 * `foreign_deploy_unsupported` is the quick_fix push landing's sentence above,
 * and the two are told apart by class.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const FOREIGN_HANDOFF_SENTENCES = Object.freeze({
  foreign_deploy_unsupported:
    '대상 저장소가 [deploy]를 선언했거나 repo-ops/post-merge.d 파일이 있어 Worker가 머지·마감하지 않습니다. 대상 저장소에서 사람이 처리합니다.',
  foreign_conflict_needs_human:
    '외부 PR이 base와 충돌합니다. Worker는 해소 세션을 띄우지 않습니다 — PR head에 수정을 push하면 다음 관측에서 풀립니다.',
  foreign_pr_base_mismatch:
    '외부 PR의 base가 foreign_base 핀과 다릅니다. PR base나 핀을 고치면 다음 관측에서 풀립니다.'
});

/**
 * The PR-flow sentence of a `foreign_handoff:<cause>` token, or null for any
 * other token.
 *
 * @param {unknown} code
 * @returns {string|null}
 */
export function foreignHandoffSentence(code) {
  if (typeof code !== 'string' || !code.startsWith('foreign_handoff:')) {
    return null;
  }
  const cause = code.slice('foreign_handoff:'.length);
  return Object.hasOwn(FOREIGN_HANDOFF_SENTENCES, cause)
    ? FOREIGN_HANDOFF_SENTENCES[cause]
    : null;
}

/** Recovery reason → what is awaited and what releases the wait. */
/** @type {Readonly<Record<string, string>>} */
export const RECOVERY_WAIT_SENTENCES = Object.freeze({
  provider:
    '공급자·사용량 조건 해제를 기다리며, 회복이 확인되면 이어갈 수 있습니다.',
  credential: '인증 복구를 기다리며, 접근 권한이 확인되면 이어갈 수 있습니다.',
  prerequisite:
    '선행 작업의 완료를 기다리며, 선행 조건이 해제되면 이어갈 수 있습니다.',
  authority:
    '승인·안전 판단을 기다리며, 필요한 결정이 확인되면 이어갈 수 있습니다.',
  verification:
    '검증 오류의 정정을 기다리며, 원인이 고쳐지면 이어갈 수 있습니다.',
  condition:
    '배포 조건이 풀리기를 기다리며, 조건이 맞으면 다시 실행할 수 있습니다.',
  no_progress:
    '같은 오류에 진전이 없어 멈췄으며, 원인이 정정되면 이어갈 수 있습니다.',
  unclassified:
    '세션에서 원인과 결과를 확인하고, 이어갈 지시 또는 폐기를 결정합니다.',
  reconcile:
    '세션에서 원래 실행과 그 효과를 확인하고, 이어갈 지시 또는 폐기를 결정합니다.'
});

/**
 * The scheduled provider wait's release sentence, with its current rung.
 *
 * @param {number} step - Zero-based repeat count.
 * @param {number} total - Number of delay rungs.
 * @returns {string}
 */
export function providerWaitResumeSentence(step, total) {
  return `공급자·사용량 조건 해제를 기다리며, 예정 시각에 자동으로 이어갑니다(${step + 1}/${total}).`;
}

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
  // UI-lx9o §4.2: the failed card names only the controls standing on it, so
  // this sentence says what to fix and the renderer adds the button.
  script_failed:
    '실패한 스크립트의 출력에서 원인을 확인하고 고치는 것이 먼저입니다.',
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
  // 외부 저장소 착지. 이 워크스페이스가 그 배포를 대신하지 않는다.
  foreign_landing_unpinned:
    '외부 대상 저장소의 핀 설정을 확인하거나, 원 세션에서 배포·마감을 확인하세요.',
  foreign_checkout_unavailable:
    '외부 대상 저장소의 핀 설정을 확인하거나, 원 세션에서 배포·마감을 확인하세요.',
  foreign_deploy_unsupported:
    '외부 대상 저장소의 핀 설정을 확인하거나, 원 세션에서 배포·마감을 확인하세요.',
  foreign_pr_repo_mismatch:
    'pr_url과 foreign_repo 핀이 같은 저장소를 가리키는지 확인하세요.',
  foreign_merged_discard_unsupported: '대상 저장소에서 사람이 되돌리세요.',
  foreign_handoff:
    '[세션에서 이어가기]로 대상 저장소의 `pr-finish` Foreign-pinned Bead 절차를 진행하세요.',
  // quick_fix push 착지. 세션이 남긴 증거(영수증·push·close)가 어긋난 경우와
  // 착지 후 절차의 한 단계가 실패한 경우로 나뉜다. 버튼 안내는 렌더러가
  // 재개 종류에 맞춰 덧붙인다.
  premature_close:
    '세션 보고서와 Bead의 close 사유를 확인하세요 — 변경 없이 끝난 작업이면 사유가 `no-delta: …`나 `refuted: …`여야 합니다.',
  invalid_impl_review:
    '세션 보고서를 확인하세요 — 저장소 변경 없이 끝난 작업(no-delta·refuted)이면 세션이 resolved 대신 그 사유로 직접 닫아야 하고, 변경을 push했다면 push한 head에 impl_review 영수증이 있어야 합니다.',
  head_mismatch:
    'push한 head와 impl_review 영수증의 SHA를 세션에서 확인하세요.',
  push_not_contained:
    'push가 원격 base에 실제로 들어갔는지 세션에서 확인하세요.',
  containment_unobservable: '원격 연결과 관측 상태를 확인하는 것이 먼저입니다.',
  repo_ops_config_invalid:
    '대상 base의 repo-ops/config.toml 선언을 확인하는 것이 먼저입니다.',
  repo_operation_failed:
    '실패한 명령과 그 출력을 확인하고 원인을 고치는 것이 먼저입니다.',
  repo_operation_pending: '진행 중인 저장소 작업이 끝나기를 기다리세요.',
  worktree_remove_failed:
    '워크트리에 남은 파일과 잠금 상태를 확인하는 것이 먼저입니다.',
  local_branch_delete_failed: '로컬 브랜치 상태를 확인하는 것이 먼저입니다.',
  bd_close_failed: 'Beads 데이터베이스 연결과 Bead 상태를 확인하세요.',
  bd_read_failed: 'Beads 데이터베이스 연결과 Bead 상태를 확인하세요.',
  bd_record_failed: 'Beads 데이터베이스 연결과 Bead 상태를 확인하세요.',
  delivery_unproven:
    '세션이 base로 push했는지와 push한 head에 impl_review 영수증이 있는지 확인하세요.',
  push_log_absent:
    '세션이 base로 push했는지와 push한 head에 impl_review 영수증이 있는지 확인하세요.',
  impl_review_missing:
    '세션이 base로 push했는지와 push한 head에 impl_review 영수증이 있는지 확인하세요.',
  impl_review_sha_mismatch:
    '세션이 base로 push했는지와 push한 head에 impl_review 영수증이 있는지 확인하세요.',
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
 * Contract token → the human category word. Lives in this dependency-free leaf
 * (UI-lx9o §4.3) so the server's timeline lines say the same word the card
 * badge does.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const FAILURE_CATEGORIES = Object.freeze({
  verify_failed: '검증 실패',
  verify_cmd_failed: '검증 실패',
  verify_script_failure: '검증 실패',
  deploy_failed: '배포 실패',
  deploy_script_failure: '배포 실패',
  // UI-i60a §4. A post-merge job is not a deployment: it runs once per file,
  // against the merged tree, and calling its failure 배포 실패 would send a
  // reader to the deploy script that never ran. The token is derived in THIS
  // repository (`classifyRepoOperationFailure`), so the word is added here with
  // it rather than waiting on the pinned policy artifact.
  job_script_failure: '잡 실패',
  interrupted_without_terminal_exit: '중단됨',
  quickfix_landing_failed: '착지 실패',
  runner_exit: '세션 실패',
  // UI-5ym8 §3: 파킹은 실패가 아니라 사람의 결정을 기다리는 결말이고, 세션이
  // 미해소로 정상 종료한 것은 세션 자체의 실패와 다른 사실이다. 둘 다
  // `session_` 접두 규칙이 '세션 실패'로 뭉뚱그리기 전에 자기 낱말을 얻는다.
  session_parked: '세션 대기',
  session_ended_unresolved: '세션 종료',
  // 선행 대기 계층 §5.3. 실패 팝오버 경로에는 오지 않는다 — 그 타일은 `failure`
  // 투영을 얻지 않는다 — 그러나 attempt 이력과 로그 줄이 cause를 사람 말로
  // 바꿀 때 이 낱말을 읽는다.
  prerequisite_unmet: '선행 대기',
  base_moved: '반영 대기',
  // 착지가 실패한 것이 아니라 착지를 증명할 push 기록·영수증이 모자란 것이다
  // (§5). 합성 코드에서는 앞선 `quickfix_landing_failed`가 먼저 잡히므로 이
  // 낱말은 토큰이 단독으로 올 때 쓰인다.
  delivery_unproven: '착지 증거 부족'
});

/**
 * Exact composite causes whose suffix alone loses the session outcome.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const EXACT_FAILURE_TEXT = Object.freeze({
  'session_hard_stop:failure': '세션이 실패를 보고하고 종료',
  'session_hard_stop:environment': '세션이 환경 오류를 보고하고 종료',
  'resume_failed:transcript_missing':
    '이어하기 대상 세션 기록이 없음 — 새 세션으로 대체'
});

/**
 * The words a failure line uses for a code the dictionary does not know
 * (UI-lx9o §4.2): the raw value stays in the detail's `실패 코드` row only.
 */
export const UNKNOWN_FAILURE_TEXT = '알 수 없는 오류로 끝남';

/** The category word of a `[deploy]` exit-75 condition wait (dotfiles-rnyd9). */
export const CONDITION_WAIT_CATEGORY = '배포 조건 대기';

/**
 * What each landing cursor is called on the bead's timeline
 * (record-timeline-retention §5) and on the failed card's badge (UI-lx9o
 * §4.1). The cursor names are the durable vocabulary the resume judgment
 * already uses, so the history and the record cannot disagree about which step
 * a landing reached.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const LANDING_STEP_LABELS = Object.freeze({
  base_containment: 'base 포함 확인',
  repo_operations: '배포 실행',
  post_merge_jobs: '머지 후 잡',
  branch_cleanup: '브랜치 정리',
  parent_close: 'bead close',
  no_change_close: '무변경 close'
});

/**
 * Repo operation kind → the word the failed card's badge and the timeline use.
 *
 * @type {Readonly<Record<string, string>>}
 */
export const OPERATION_KIND_WORDS = Object.freeze({
  deploy: '배포',
  verify: '검증',
  job: '잡'
});

/**
 * Recovery disposition → word (contract `work-recovery-policy.dispositions`).
 *
 * @type {Readonly<Record<string, string>>}
 */
export const RECOVERY_DISPOSITION_WORDS = Object.freeze({
  repair: '수리 대상',
  wait: '대기',
  reconcile: '대조 필요',
  fatal: '복구 불가'
});

/**
 * Recovery reason → word (contract `work-recovery-policy.wait_reasons`).
 *
 * @type {Readonly<Record<string, string>>}
 */
export const RECOVERY_REASON_WORDS = Object.freeze({
  provider: '공급자·사용량',
  credential: '인증',
  prerequisite: '선행 작업',
  authority: '승인·안전 판단',
  verification: '검증 오류',
  condition: '배포 조건',
  no_progress: '진전 없음',
  unclassified: '미분류',
  reconcile: '원래 실행 대조'
});

/**
 * Sentences only the failed card and the timeline words read (UI-lx9o §4.3).
 * `script_failed` is the coordinator's raw code for any script that exited
 * nonzero; kept out of {@link FAILURE_SENTENCES} so the completion comment,
 * the PR wait row and the operation timeline keep the sentence they say today
 * (§5 non-goals).
 *
 * @type {Readonly<Record<string, string>>}
 */
const WORDS_ONLY_SENTENCES = Object.freeze({
  script_failed: '스크립트가 0이 아닌 코드로 끝났습니다.'
});

/**
 * @param {string} segment
 * @returns {string|null}
 */
function segmentSentence(segment) {
  if (Object.hasOwn(FAILURE_SENTENCES, segment)) {
    return FAILURE_SENTENCES[segment];
  }
  if (Object.hasOwn(WORDS_ONLY_SENTENCES, segment)) {
    return WORDS_ONLY_SENTENCES[segment];
  }
  return null;
}

/**
 * Split a possibly composite code (`verify_failed:gh_observation_failed`) into
 * its segments. A non-string or empty value yields no segments at all.
 *
 * @param {unknown} code
 * @returns {string[]}
 */
export function failureSegments(code) {
  if (typeof code !== 'string' || code.length === 0) {
    return [];
  }
  return code.split(':').filter((segment) => segment.length > 0);
}

/**
 * The mapped category word of a failure code, or null when no segment maps.
 * A landing or cleanup stopped on a `[deploy]` condition wait is a wait, not
 * the lane's failure, whichever segment the lane prefix puts first.
 *
 * @param {unknown} code
 * @returns {string|null}
 */
export function mappedFailureCategory(code) {
  const segments = failureSegments(code);
  if (segments.includes('condition_wait')) {
    return CONDITION_WAIT_CATEGORY;
  }
  for (const segment of segments) {
    // Own-property only: a token like `constructor` or `toString` would
    // otherwise match a prototype member and escape the raw-token fallback.
    if (Object.hasOwn(FAILURE_CATEGORIES, segment)) {
      return FAILURE_CATEGORIES[segment];
    }
    if (segment.startsWith('session_')) {
      return '세션 실패';
    }
  }
  return null;
}

/**
 * The cause sentence of a code: the LAST segment that has one wins.
 *
 * @param {unknown} code
 * @returns {string|null}
 */
export function lastFailureSentence(code) {
  /** @type {string|null} */
  let found = null;
  for (const segment of failureSegments(code)) {
    if (Object.hasOwn(FAILURE_SENTENCES, segment)) {
      found = FAILURE_SENTENCES[segment];
    }
  }
  return found;
}

/**
 * @param {string} sentence
 * @returns {string}
 */
function withoutPeriod(sentence) {
  return sentence.endsWith('.') ? sentence.slice(0, -1) : sentence;
}

/**
 * A failure code said in dictionary words for a timeline line or a card
 * sentence (UI-lx9o §4.2/§4.3). It NEVER returns the raw code or an unknown
 * suffix: an exact composite reads its text, then the last segment with a
 * sentence, then the category word, and anything else reads
 * {@link UNKNOWN_FAILURE_TEXT}.
 *
 * @param {unknown} code
 * @returns {string}
 */
export function failureSummaryWords(code) {
  if (typeof code === 'string' && Object.hasOwn(EXACT_FAILURE_TEXT, code)) {
    return EXACT_FAILURE_TEXT[code];
  }
  /** @type {string|null} */
  let sentence = null;
  for (const segment of failureSegments(code)) {
    sentence = segmentSentence(segment) ?? sentence;
  }
  if (sentence !== null) {
    return withoutPeriod(sentence);
  }
  return mappedFailureCategory(code) ?? UNKNOWN_FAILURE_TEXT;
}

/**
 * A failure code said segment by segment for the detail's `실패 코드` row
 * (UI-lx9o §4.3): `착지 실패 › 스크립트가 0이 아닌 코드로 끝났습니다`. Each
 * segment reads its category word, else its sentence, else the unknown words —
 * the raw code is drawn under it by the caller.
 *
 * @param {unknown} code
 * @returns {string}
 */
export function failureCodeWords(code) {
  if (typeof code === 'string' && Object.hasOwn(EXACT_FAILURE_TEXT, code)) {
    return EXACT_FAILURE_TEXT[code];
  }
  const segments = failureSegments(code);
  if (segments.length === 0) {
    return '';
  }
  return segments
    .map((segment, index) => {
      const category =
        segment === 'condition_wait'
          ? CONDITION_WAIT_CATEGORY
          : Object.hasOwn(FAILURE_CATEGORIES, segment)
            ? FAILURE_CATEGORIES[segment]
            : segment.startsWith('session_')
              ? '세션 실패'
              : null;
      const raw_sentence = segmentSentence(segment);
      const sentence =
        raw_sentence === null ? null : withoutPeriod(raw_sentence);
      // The prefix names the lane and the last segment what went wrong, so
      // only the last one prefers its sentence over its category word.
      const words =
        index === segments.length - 1
          ? (sentence ?? category)
          : (category ?? sentence);
      return words ?? UNKNOWN_FAILURE_TEXT;
    })
    .join(' › ');
}

/**
 * Whether a summary string holds only a code (`script_failed`,
 * `quickfix_landing_failed:script_failed`) rather than a sentence — such a
 * record is treated as a code (UI-lx9o §4.2). A bare word without `_` or `:`
 * is not taken for a code.
 *
 * @param {unknown} text
 * @returns {boolean}
 */
export function isFailureCodeOnly(text) {
  if (typeof text !== 'string') {
    return false;
  }
  const trimmed = text.trim();
  return /^[a-z0-9_]+(?::[a-z0-9_.-]+)*$/.test(trimmed) && /[_:]/.test(trimmed);
}

/**
 * The sentence for a repo-operation script that exited nonzero, naming which
 * script it was when the kind is known (UI-lx9o §4.1).
 *
 * @param {unknown} kind - `deploy`/`verify`/`job`.
 * @param {number} exit_code
 * @returns {string}
 */
export function scriptExitSentence(kind, exit_code) {
  const word =
    typeof kind === 'string' && Object.hasOwn(OPERATION_KIND_WORDS, kind)
      ? `${OPERATION_KIND_WORDS[kind]} `
      : '';
  return `${word}스크립트가 exit ${exit_code}로 끝났습니다.`;
}

/**
 * A recovery classification in words (UI-lx9o §4.3): the disposition word and,
 * when it says more than the disposition, the reason word.
 *
 * @param {unknown} disposition
 * @param {unknown} reason
 * @returns {string}
 */
export function recoveryWords(disposition, reason) {
  const disposition_word =
    typeof disposition === 'string' &&
    Object.hasOwn(RECOVERY_DISPOSITION_WORDS, disposition)
      ? RECOVERY_DISPOSITION_WORDS[disposition]
      : '미분류';
  const reason_word =
    typeof reason === 'string' &&
    reason !== disposition &&
    Object.hasOwn(RECOVERY_REASON_WORDS, reason)
      ? RECOVERY_REASON_WORDS[reason]
      : null;
  return reason_word
    ? `${disposition_word} · ${reason_word}`
    : disposition_word;
}

/**
 * Resume refusals with actionable guidance; unknown reasons keep their code.
 *
 * @type {Readonly<Record<string, (route_change?: { prior_lane: string, current_route: string|null }|null) => string>>}
 */
export const RESUME_REFUSALS = Object.freeze({
  route_changed: routeChangedSentence
});

/**
 * @param {{ prior_lane: string, current_route: string|null }|null} [route_change]
 */
function routeChangedSentence(route_change) {
  const change = route_change
    ? ` ${route_change.prior_lane}에서 ${route_change.current_route}로`
    : '';
  return `승인된 작업 방식이${change} 바뀌어 이전 세션을 이어갈 수 없습니다. [폐기] 뒤 후보에서 대기열에 다시 배치하면 현재 방식으로 새로 시작됩니다.`;
}
