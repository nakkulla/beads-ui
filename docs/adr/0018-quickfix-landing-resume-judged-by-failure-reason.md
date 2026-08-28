---
id: 18
title: quick_fix 착지 재개는 정산 커서가 아니라 실패 사유로 판정한다
status: accepted
date: 2026-08-28
summary: '세션이 필요한 사유만 닫힌 목록으로 열거하고 나머지는 전부 같은 attempt의 정산을 다시 돌린다. 정산 계열 어휘는 coordinator가 만들어 열려 있고 settle은 멱등이라 기본값은 정산 쪽이 안전하다'
spec: docs/superpowers/specs/2026-08-28-quickfix-settlement-resume-by-reason-design.md
bead: UI-8h1x
---

# quick_fix 착지 재개는 정산 커서가 아니라 실패 사유로 판정한다

## Context

Worker가 디스패치한 quick_fix의 착지 정산(`createQuickfixLanding.settle`)이 실패하면
그 행을 치울 조작은 실패 타일의 `[이어하기]` 하나뿐이다. 그 클릭이 무엇을 하는지는
`server/worker/scheduler.js`의 `quickfix_cleanup_resume` 한 조건이 정했고, 그 조건은
`quickfix_landing.cursor`가 `branch_cleanup`·`parent_close`일 때만 같은 attempt의
정산을 다시 돌렸다. 앞 두 커서(`base_containment`·`repo_operations`)에서 실패한 행은
일반 재개 경로로 가서 **할 일이 없는 세션을 다시 띄웠고**, `[폐기]`는
`discard-coordinator`의 `parent_reset`이 Bead를 `open`으로 되돌리며 `pr_url`·
`impl_review`·`last_checked_sha`를 지웠다(2026-08-28 실사고). 즉 안전한 출구가 없었다.

커서가 판정 입력으로 부적합한 이유는 같은 커서에 성격이 정반대인 사유가 섞이기
때문이다. `base_containment`에는 `push_not_contained`(착지가 정말 안 됐다 — 세션이
할 일이 남았다)와 `containment_unobservable`(착지 여부를 관측하지 못했을 뿐이다 —
세션은 할 일이 없다)이 함께 온다. 커서 기준은 사유 기준의 근사치였고, foreign
착지(UI-jf33)에서 그 근사가 깨졌다.

큐 기록 전수(2026-07~08) 착지 실패 8건 중 커서가 남은 3건이 모두 이 공백에 걸렸고,
그중 `dotfiles-pio7-…`의 `remote_history_not_monotonic`은 foreign 원인과 무관한
배포 단계 실패다. 원인 하나를 고쳐도 공백이 남는다는 증거다.

## Decision

재개 종류는 `app/utils/quickfix-resume-kind.js`의 `resumeKindOf(quickfix_landing)`이
**실패 사유 문자열만** 읽어 정한다. 커서는 판정에서 완전히 빠지고, durable 진행
기록(진행 표시·`head_sha` 결속)으로만 남는다.

열거하는 쪽은 `session`이다.

- 정확 일치: `push_not_contained`, `invalid_impl_review`, `premature_close`,
  `head_mismatch`, `foreign_deploy_unsupported`, 그리고 은퇴 토큰 `not_resolved`.
- 접두 일치: `delivery_unproven:`.
- 사유가 없거나 빈 문자열이면 정산이 시작되기 전이므로 `session`이다.

그 밖의 모든 사유는 `settlement`이며 같은 attempt의 정산을 다시 돌린다.

반대 방향(정산 계열을 열거)이 불가능한 이유는 그 어휘가 **열려 있기** 때문이다.
`settle`은 배포 실패를 `deployed.code || 'repo_operation_failed'`로 저장하고, 그
`code`는 `repo-operation-coordinator.js`가 만든 문자열(`remote_history_not_monotonic`,
`repo_ops_ancestry_check_failed` 등 20종 이상)이 그대로 흘러온 것이라
`QuickfixLandingReason` union에도 없다. 정산 계열을 열거하는 판정표는 새 coordinator
코드가 생길 때마다 같은 결함을 다시 만든다.

미지 토큰의 기본값이 `settlement`인 근거는 비대칭이다. `settle`은 멱등이라 잘못된
`settlement` 판정의 최대 피해는 **정산 한 번을 헛돌리는 것**이고(실제로 착지가 안 된
행은 다시 실패하며 사유를 갱신한다), 잘못된 `session` 판정의 피해는 **할 일 없는
세션을 띄우고 그 행을 계속 치우지 못하는 것**이다.

이 판정의 전제로 `readReceipt`의 `bd.readMetadata` **예외** 갈래는
`invalid_impl_review`가 아니라 `bd_read_failed`를 기록한다. 형식 오류만
`invalid_impl_review`로 남는다 — 분리하지 않으면 일시적 bd 장애가 세션 재실행으로
새어 나간다.

실패 토큰 자체는 dotfiles 계약이 정의한다. **어떤 실패가 정산 재실행으로 풀리는가**는
Worker 내부 판단이라 beads-ui가 소유하며(ADR 0012와 같은 선, `workflow-state.yaml
enclosed_foreign_landing.worker_judgment`가 "judgment owner is beads-ui"로 적은 것과
같다), 이 결정은 계약을 바꾸지 않는다.

## Consequences

- 실패 타일 버튼의 의미가 사유에 따라 갈리므로 보이는 문구·`aria-label`·`title`
  셋을 함께 분기한다(`↻ 정산 재개` / `착지 정산을 다시 실행`). 클래스·자리·클릭
  핸들러는 그대로라 ADR 0014의 공유 슬롯 표는 갱신되지 않는다.
- `settlement` 행의 재개는 서버에서 세션 ID도 워크트리도 요구하지 않으므로
  `resume_eligible`에서 `has_session` 요구가 그 경우에만 빠진다. 커서가 `None`이라
  기존 기준으로는 표현할 수 없던 사유(`bd_read_failed`)도 재개 대상이 된다.
- 정말 세션이 필요한 새 사유가 생기면 `session` 목록에 추가할 때까지 헛도는 정산을
  한 번 치른다. 그 대가로 열린 coordinator 어휘가 자동으로 포섭된다.
- 재개가 다시 실패하면 `settle`이 사유를 새로 쓰므로, 사유가 세션 성격으로 바뀌면
  다음 클릭은 저절로 세션 재실행이 된다. 별도 사다리나 재시도 예산은 없고 자동
  재디스패치도 없다(ADR 0005·0017).
- `[폐기]`의 `parent_reset` 파괴성 자체는 이 결정이 건드리지 않는다. 안전한 출구가
  생겨 오조작 유인이 줄 뿐이다.
