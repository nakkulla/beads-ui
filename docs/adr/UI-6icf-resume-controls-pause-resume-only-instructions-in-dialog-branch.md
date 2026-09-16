---
id: UI-6icf
title: 세션 재개 조작은 ⏸와 ▶ 재개 둘이며 지시는 재개 다이얼로그의 선택 갈래로 받는다 — durable pause·prior_attempt 서버 계약은 UI 진입점 없이 유지한다
status: accepted
date: 2026-09-16
summary: '세션 재개 조작은 ⏸와 ▶ 재개 둘이며 지시는 재개 다이얼로그의 선택 갈래로 auto 정책과 함께 전달한다; 실행 중 지시 재시작과 prior_attempt의 UI 진입점은 제거하고 durable pause· prior_attempt 서버 계약은 UI 진입점 없이 유지한다'
supersedes: [45]
spec: docs/superpowers/specs/2026-09-16-resume-controls-unify-design.md
bead: UI-6icf
---

# 세션 재개 조작은 ⏸와 ▶ 재개 둘이며 지시는 재개 다이얼로그의 선택 갈래로 받는다

## Context

ADR 0045(UI-qce9)는 실행 타일에 `지시와 함께 재시작`, durable pause가 끝난
일시정지 타일에 `지시와 함께 이어하기`를 두고, 두 버튼이 지침을 필수로 받아
`continuation=prior_attempt`로 기록된 세션·모델·effort·speed·계정을 그대로 잇도록
정했다. 그 결과 실행 타일에는 `지시와 함께 재시작`과 `⏸`, 일시정지 타일에는
`지시와 함께 이어하기`와 `▶ 재개`가 나란히 서서 슬롯 1 조작 묶음의 절반을 긴 라벨
둘이 차지했다.

한편 `▶ 재개`(`runResumeFlow`)는 이미 선택 지침 다이얼로그를 열어 비워 두면 기본
절차로, 채우면 지침을 실어 같은 `worker-attempt-resume`을 보낸다. 지시 입력 기능
자체는 중복이었고, 두 긴 버튼의 남은 차이는 정책(`prior_attempt` 강제)뿐이었다.
사용자는 "일시정지 뒤 다시 시작할 때 지시를 넣을 수 있으면 된다"고 판단했다
(2026-09-16). 서버 쪽 `require_durable` pause·`prior_attempt` 재개·자격 판정은
스케줄러의 durable pause 경로가 쓰는 살아 있는 정책이며, 이번 요청(UI 단순화)의
필요조건이 아니다.

## Decision

**세션 재개 조작은 실행 타일의 `⏸`와 일시정지 타일의 `▶ 재개` 둘이다. 지시는
재개 다이얼로그의 `[지시 입력 후 이어하기]` 갈래로 받고, 두 갈래(`바로 이어하기`·
`지시 입력 후 이어하기`)는 모두 일반 이어하기의 `auto` 정책으로 보낸다. 실행 중
지시 재시작과 `prior_attempt`의 UI 진입점은 제거하되, durable pause와
`prior_attempt`의 서버 계약은 UI 진입점 없이 유지한다.**

바뀐 조항(ADR 0045의 UI 조항 둘과 재진입 문장):

- 실행 타일의 `지시와 함께 재시작`과 durable pause가 끝난 paused 타일의 `지시와
  함께 이어하기` 버튼을 제거한다. 실행 중 세션에 지시를 넣는 일은 `⏸` 뒤 `▶ 재개`의
  두 단계다. 서버 스냅샷의 `instructions_restart` 투영과 클라이언트의 두 요청
  흐름(`runRestartWithInstructionsFlow`)은 소비자가 없어 함께 제거한다.
- "paused 행의 `지시와 함께 이어하기`가 같은 선택으로 재개한다"는 재진입 문장은
  폐기한다. pause 뒤 브라우저가 끊긴 원 attempt는 여전히 paused로 남고 자동 재시작
  의도를 저장하지 않으며, 재개는 `▶ 재개`의 두 갈래 중 하나로 한다.
- 지시 다이얼로그(`requestResumeInstructions`)는 A(선택)·B(입력) 두 상태이고 반환
  계약은 그대로다: 취소·Esc는 `null`, 바로 이어하기는 `''`, 지시 이어하기는 공백을
  제거한 1~4000자 문자열. `kind`는 `session`·`settlement` 둘이며 지침을 필수로 받는
  모드와 두 요청 흐름의 거부 반환 통로(`handlers.onSubmit`)는 없다. 실패 타일의
  `↻ 이어하기`·`↻ 정리 재시도`와 상세 세션 이력의 `↻ 이어하기`, Monitor 탭의 같은
  타일은 같은 다이얼로그를 공유하므로 두 갈래를 함께 얻는다(ADR 0014).
- 두 갈래 모두 `continuation` 없이 보내는 기존 `auto` 경로다. 기록된 러너와 현재
  러너가 다르면 기존 `continuation_mismatch` 대화가 열리고, 세션 ID 부재는
  `no_session_id`로 거부되며, transcript 부재는 서버가 새 세션으로 대체한다. provider
  변경은 기존 `continuation_mismatch`·`exec_override`의 명시적 선택으로만 일어난다
  (ADR 0046).

유지하는 조항(ADR 0045의 서버 정책, UI 진입점 없이 그대로 남는다):

- `worker-attempt-pause`의 `require_durable: true`는 시그널 전에 대상 자격(일반
  구현 attempt, 세션 ID, 프로세스 신원, 완전한 실행 기록, 활성 provider의 명시적
  계정 ID)을 검사해 불완전하면 `prior_session_unavailable`로, process controller가
  없으면 `process_controller_missing`으로 거부한다. 응답은 durable control과 부모의
  전체 정산 체인(`handle.done → onSessionDone → reportCompletionSettlement`)이 끝난
  뒤 부모가 `control.phase=done`·`status=paused`인지 다시 읽어 결정하고, pause·
  discard·stop이 기다리는 `paused_done`도 이 전체 체인을 가리킨다.
- `worker-attempt-resume`의 `continuation=prior_attempt`는 기록된 runner·model·
  effort·speed·`exec_values`·프리셋 ID/revision·계정을 승계하고 미기록을 현재
  기본값으로 채우지 않으며, 활성 provider의 계정 `null`은 거부하고, `exec_override`를
  함께 보내면 `bad_request`다. decision token 대신 source digest가 기록 tuple 전체를
  결속하고 launch 직전 재검증이 변경을 잡는다. 기록된 provider·계정을 현재 환경에서
  쓸 수 없으면 다른 계정·provider로 전환하지 않고 거부한다.
- `prior_attempt`의 자식은 `continuation_choice='prior_attempt'`를 기록한다. Claude
  transcript 사전 부재는 자식 없이 `prior_session_unavailable`, 실행 후 확인된 부재는
  `resume_failed:transcript_missing`으로 기록하되 fresh를 dispatch하지 않는다. 자동
  provider 재개는 같은 선택·세션·tuple을 유지할 때만 허용하고, 계정 전환이 필요한
  재개는 `prior_attempt_locked`로 거부한다.
- 사용자 요청으로 pause된 원 attempt는 실패·provider 장애·retry 소진으로 세지
  않는다.
- 일반 `이어하기`의 `auto`·`prior_session`·`fresh_current`와 transcript 부재 시 fresh
  대체는 그대로다. `server/worker/instructions-restart.js`의 자격 판정은 스케줄러의
  durable pause 경로가 계속 쓴다.

기각한 대안: 타일 분할 버튼(`▶ 재개 | ✎`; 슬롯 1 조작 묶음의 폭을 다시 늘리고 좁은
화면에서 두 조작이 붙어 오조작을 부른다), 라벨만 줄이고 버튼 넷 유지(같은 기능이
두 버튼으로 남는 원인을 그대로 둔다), 다이얼로그에 두 정책 체크박스(`prior_attempt`
강제를 UI 선택으로 남기는 안; 사용자 결정 (1)로 두 갈래가 같은 정책을 쓰기로 했다),
서버 `prior_attempt`·`require_durable`·`instructions-restart.js`의 완전 제거
(스케줄러·큐 저장소·ADR 0046 예외 조항까지 번지는 별개 정리이며 이번 요청의
필요조건이 아니다).

## Consequences

- 타일 조작은 `▤ 세션`·`⏸`/`▶ 재개`·폐기 계열로 줄고, 지시는 한 다이얼로그의 한
  갈래에서만 받는다. 실행 중 세션에 지시를 넣으려면 먼저 `⏸`로 멈춰야 한다.
- 지시 입력 재개가 현재 프리셋의 설정을 적용할 수 있게 되므로, "기록된 설정을
  그대로 잇는" 보장은 UI에서 사라진다. 그 보장이 필요하면 `prior_attempt`를 다시
  UI에 노출하는 별도 설계가 필요하고, 서버 계약은 그때 그대로 쓸 수 있다.
- 서버는 매 스냅샷마다 `instructions_restart` 자격을 계산하지 않는다. 옛 번들이 그
  필드를 읽지 못해도 버튼이 나타나지 않는 것이 맞다(fail-quiet).
- 카드 문법 스펙(2026-08-25) §5.1 슬롯 1 조작 목록과 2026-08-19 지시 스펙,
  `app/protocol.md`의 `prior_attempt` 설명은 이 결정을 정정 문단으로 반영한다.
- 이 선택은 beads-ui 내부 resume UI와 프로토콜 투영이다. dotfiles workflow의 route·
  상태·metadata·실패 분류를 확장하지 않는다(ADR 0012).
