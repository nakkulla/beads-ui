---
id: 42
title: quick_fix 재개는 실패 사유로 session과 settlement를 가르고 착지 정산 재실행 버튼은 정리 재시도로 부른다
status: accepted
date: 2026-09-08
summary: 'quick_fix 재개는 실패 사유로 session과 settlement를 가르고, 같은 attempt의 착지 정산 재실행 버튼은 정리 재시도로 부른다'
supersedes: [18]
spec: docs/superpowers/specs/2026-09-08-worker-feedback-readability-design.md
bead: UI-kyky
---

# quick_fix 재개는 실패 사유로 session과 settlement를 가르고 착지 정산 재실행 버튼은 정리 재시도로 부른다

## Context

ADR 0018은 quick_fix 착지 실패 타일의 재개 종류를 정산 커서가 아니라 실패 사유로
판정하도록 정했고, 그 Consequences에서 `settlement` 판정의 버튼 문구를 `↻ 정산 재개`
(`착지 정산을 다시 실행`)로 명시했다. 그 뒤 머지 후 정리 실패 행의 버튼은
`정리 재시도`(`cleanup_failed` 분기)로 자리 잡았다. 두 버튼은 모두 "새 AI 세션을
띄우지 않고 실패한 착지 후 기계 단계를 같은 attempt에서 다시 돌린다"는 같은
행동인데 이름이 달라, 실패 팝업이 안내하는 다음 행동과 실제 버튼 문구가 어긋났고
사용자는 `정산`이 세션 재개인지 기계 재실행인지 화면에서 구분할 수 없었다
(UI-kyky 스펙 §1·§4.3).

이름은 공유 원인 사전(`app/utils/failure-sentences.js`의 `bootstrap_not_approved`
문장), 서버 완료 보고서가 읽는 같은 사전, 실패 팝업의 `재개` 행, 실행 타일 버튼의
글자·`title`·`aria-label`, 재개 다이얼로그의 제목·확인 버튼, 거부 토스트에 함께
박혀 있어 한 곳만 고치면 서로 다른 이름이 같은 행동을 가리키게 된다.

## Decision

**재개 판정 규칙은 ADR 0018을 그대로 승계하고, 바뀌는 것은 `settlement` 판정의
버튼 이름뿐이다.**

- 재개 종류는 `app/utils/quickfix-resume-kind.js`의 `resumeKindOf(quickfix_landing)`이
  실패 사유 문자열만 읽어 정한다. `session`은 닫힌 목록(정확 일치
  `push_not_contained`·`invalid_impl_review`·`premature_close`·`head_mismatch`·
  `foreign_deploy_unsupported`·은퇴 토큰 `not_resolved`, 접두 `delivery_unproven:`,
  사유 없음)이고 그 밖의 모든 사유는 `settlement`다. 미지 사유의 기본값이
  `settlement`인 비대칭 근거, `readReceipt` 예외 갈래가 `bd_read_failed`를 기록한다는
  전제, 실패 토큰의 정의는 dotfiles 계약이 소유한다는 경계는 0018 그대로다.
- `settlement` 행의 재실행 버튼은 `↻ 정리 재시도`로 부른다. 세션을 다시 띄우는
  `session` 행의 버튼은 `↻ 이어하기` 그대로다. 글자·`title`·`aria-label`·재개
  다이얼로그 제목(`착지 후 정리 재시도`)·확인 버튼(`정리 재시도`)·거부 토스트
  (`정리 재시도 거부`)·공유 원인 사전의 절차 안내가 같은 이름을 쓴다. 대상 단계
  (quick_fix 착지 정산 / 머지 후 정리)는 `title` 툴팁이 구분한다.
- `resumeKindOf`의 판정, `data-resume-kind`, 클라이언트 이벤트, 서버 resume 로직,
  `resume_eligible`의 `has_session` 면제는 바꾸지 않는다. 클래스·자리·클릭 핸들러도
  그대로라 ADR 0014의 공유 슬롯 표는 갱신되지 않는다.

이름을 `정산 재개`로 두고 툴팁만 보강하는 대안은 팝업의 `다음` 행이 두 이름을
동시에 안내해야 하므로 기각했다. 머지 후 버튼 쪽을 `정산 재개`로 맞추는 대안은
`정산`이 quick_fix 착지에만 있는 내부 용어라 기각했다.

## Consequences

- 실패 팝업의 `다음` 행, 타일 버튼, 다이얼로그, 토스트, 서버 보고서가 읽는 원인
  사전이 한 어휘(`정리 재시도` / `이어하기`)로 같은 행동을 말한다.
- 정산 계열 재개의 나머지 결과 — `resume_eligible`의 `has_session` 면제, 재실패 시
  사유 갱신으로 다음 클릭이 저절로 세션 재실행이 되는 것, 별도 사다리·재시도 예산·
  자동 재디스패치 없음(ADR 0005·0017), `[폐기]`의 `parent_reset` 파괴성 불변 — 는
  0018에서 그대로 승계한다.
- `정산`이라는 내부 용어는 코드 식별자(`resume_kind === 'settlement'`, `settle`)와
  서버 기록에만 남고 사용자 문장에서는 사라진다.
