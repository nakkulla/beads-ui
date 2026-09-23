---
id: UI-lmqu-2
title: 기준 이동은 보존 세션 이어하기이고 기계 정산은 정리 재시도다
status: superseded
superseded_by: UI-a5l2-2
date: 2026-09-15
summary: 'quick_fix 재개는 종료 사유로 session과 settlement를 구분하며 base_moved는 보존 세션 이어하기이고 기계 정산은 정리 재시도다'
supersedes: [42]
spec: docs/superpowers/specs/2026-09-14-worker-completion-outcome-cleanup-design.md
bead: UI-lmqu
---

# 기준 이동은 보존 세션 이어하기이고 기계 정산은 정리 재시도다

## Context

ADR 0042는 실패 사유로 세션 실행과 기계 정리를 구분하고 각 출구를 `이어하기`와
`정리 재시도`로 통일했다. 기준 이동의 미인도 후보는 구현 세션을 이어야 하지만,
그 사유를 명시하지 않으면 미지 사유의 기본값인 기계 정산으로 잘못 보낸다.

카드 조작·서버 재개·세션 참조를 함께 바꿔야 되돌릴 수 있고, 같은 대기라도 기계
정리를 반복하지 않는 이유에는 후보 보존이라는 맥락이 필요하다. 미지 사유의
기본값에 맡기는 편의보다 명시적인 `session` 항목 하나를 유지하는 비용을 택한다.

## Decision

- 재개 종류는 공용 `resumeKindOf(quickfix_landing)`이 사유 문자열로 정한다.
  `session`의 닫힌 목록에 `base_moved`를 추가한다. 기존 정확 일치
  `push_not_contained`·`invalid_impl_review`·`premature_close`·`head_mismatch`·
  `foreign_deploy_unsupported`·은퇴 토큰 `not_resolved`, 접두 `delivery_unproven:`,
  사유 없음은 유지하고 그 밖의 사유는 `settlement`다. 정산 커서가 재개 종류를
  결정하지 않는다.
- `base_moved`의 `↻ 이어하기`는 ADR UI-lmqu의 보존 후보와 기록 세션을 검증하고
  재개한다. 새 worktree 준비나 정산 전용 재시도로 보내지 않는다. 참조·후보 부재를
  새 구현으로 보충하지 않는다. 공통 실패 어휘와 표식의 정본은 계속 dotfiles다.
- 기계 정산은 같은 attempt에서 실패한 착지 후 단계를 다시 실행하며 버튼은
  `↻ 정리 재시도`다. 세션 실행은 `↻ 이어하기`다. 글자·`title`·`aria-label`,
  다이얼로그, 거부 토스트, 공용 원인 사전과 서버 보고서가 같은 이름을 쓴다.
  대상 단계인 quick_fix 착지 정산과 머지 후 정리는 툴팁에서 구분한다.
- `settlement`의 세션 참조 면제와 `readReceipt` 오류의 `bd_read_failed` 기록은
  유지한다. 재실패 사유가 달라지면 다음 클릭도 그 사유에 맞춰 분류한다. 별도
  사다리·재시도 예산·자동 AI 수리·자동 재디스패치를 만들지 않고 폐기의 기존
  `parent_reset` 파괴성 경계를 유지한다.
- 기존 재개 이벤트·공용 조작 클래스·슬롯을 사용한다. 내부 `settlement`·`settle`
  식별자는 유지하며 사용자에게는 `정리 재시도`와 `이어하기`로 행동을 설명한다.

## Consequences

기준 이동 후보가 기계 정산으로 잘못 들어가지 않는다. 명시적 사유 목록은 UI와
서버가 공용 사전으로 함께 소비해야 한다. 이미 인도한 작업의 기계 정리를 위해
AI 세션을 다시 띄우는 비용은 늘어나지 않는다.
