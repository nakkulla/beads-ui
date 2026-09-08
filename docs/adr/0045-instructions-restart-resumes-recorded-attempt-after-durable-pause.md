---
id: 45
title: 구현 세션의 지시 재시작은 durable pause 뒤 기록된 세션과 설정으로 재개하며 새 세션으로 대체하지 않는다
status: accepted
date: 2026-09-08
summary: "구현 세션의 지시 재시작은 기존 durable pause 뒤 기록된 세션과 설정으로 재개하며, pause 뒤 연결 끊김은 paused로 남기고 transcript 부재 시 새 세션으로 대체하지 않는다"
spec: docs/superpowers/specs/2026-09-08-running-session-instructions-restart-design.md
bead: UI-qce9
---

# 구현 세션의 지시 재시작은 durable pause 뒤 기록된 세션과 설정으로 재개하며 새 세션으로 대체하지 않는다

## Context

Worker가 띄우는 구현 세션은 headless이고 stdin을 닫은 채 spawn되므로, 살아 있는
세션에 텍스트를 넣는 경로가 없다. 지시를 전달할 수 있는 유일한 기존 경로는 실패한
attempt의 `이어하기`가 여는 지시 다이얼로그였고, 그 지시는 `--resume` 재개 시에만
prompt에 실렸다.

기존 `이어하기`의 `auto`는 같은 세션 ID를 잇더라도 **현재** 프리셋의
모델·effort·계정을 적용할 수 있고, Claude transcript가 없으면 실행 전 또는 실패
정산 후 새 세션으로 자동 대체한다. "실행 중 세션을 멈추고 지시를 담아 같은 세션과
같은 설정으로 이어간다"는 요청은 이 두 동작과 정면으로 충돌한다 — 그대로 쓰면
사용자가 확인한 실행 설정이 조용히 바뀌거나, 지시가 아무 맥락 없는 새 세션에
전달된다.

또 하나의 결함은 종료 확인의 단위였다. 기존 durable pause는 프로세스 소멸만
확인하고 답하는데, 부모의 `handle.done → onSessionDone → reportCompletionSettlement`
체인은 그 뒤에도 이슈 단위 `claimed`를 지우고 stamp를 되돌린다. 프로세스 소멸 직후
자식을 만들면 늦은 부모 콜백이 자식의 점유를 해제한다.

## Decision

**지시 재시작은 기존 durable pause를 먼저 완료한 뒤, `prior_attempt` 선택으로 기록된
세션과 기록된 실행 설정을 그대로 잇는 자식 attempt를 만든다. 새 재시작 상태 기계·
원장·타이머·coordinator는 만들지 않는다.**

- 중단은 기존 `worker-attempt-pause`에 `require_durable: true`를 더한 요청이다. 서버는
  시그널 전에 대상 자격(일반 구현 attempt, 세션 ID, 프로세스 신원, 완전한 실행
  기록, 활성 provider의 명시적 계정 ID)을 검사해 불완전하면
  `prior_session_unavailable`로 거부하고, process controller가 없으면
  `process_controller_missing`으로 거부한다. 응답은 durable control과 부모의 **전체
  정산 체인**이 끝난 뒤 부모가 `control.phase=done`·`status=paused`인지 다시 읽어
  결정한다. 살아 있는 실행 항목은 그 체인의 Promise를 `settled`로 보존하고, pause·
  discard·stop이 기다리는 `paused_done`도 이 전체 체인을 가리킨다.
- 재개는 기존 `worker-attempt-resume`의 `continuation` enum에 더한 `prior_attempt`다.
  기록된 runner·model·effort·speed·`exec_values`·프리셋 ID/revision·계정을 승계하고
  미기록을 현재 기본값으로 채우지 않는다. 활성 provider의 계정 `null`은 당시 로그인
  계정의 증거가 아니므로 거부한다. `exec_override`를 함께 보내면 `bad_request`다.
  decision token을 요구하지 않는 대신 source digest가 기록 tuple 전체를 결속하고,
  launch 직전 재검증이 변경을 잡는다. 기록된 provider·계정을 현재 환경에서 쓸 수
  없으면 다른 계정·provider로 전환하지 않고 거부한다.
- 자식은 `continuation_choice='prior_attempt'`를 기록한다. Claude transcript 사전
  부재는 자식 없이 `prior_session_unavailable`, 실행 후 확인된 부재는
  `resume_failed:transcript_missing`으로 기록하되 fresh를 dispatch하지 않는다. 자동
  provider 재개는 같은 선택·세션·tuple을 유지할 때만 허용하고, 계정 전환이 필요한
  재개는 `prior_attempt_locked`로 거부한다. 명시적인 다른 계정·새 세션 재개는 별도
  사용자 선택으로만 이 정책을 벗어난다.
- pause 뒤 브라우저가 끊기면 원 attempt는 paused로 남는다. 자동 재시작 의도는
  저장하지 않으며, paused 행의 `지시와 함께 이어하기`가 같은 선택으로 재개한다.
  사용자 요청으로 pause된 원 attempt는 실패·provider 장애·retry 소진으로 세지
  않는다.
- 일반 `이어하기`의 `auto`·`prior_session`·`fresh_current`와 transcript 부재 시 fresh
  대체는 그대로다. 버튼은 일반 구현 세션의 실행 타일과 durable pause가 완료된
  paused 타일에만 있고, 리뷰·해소·REVISE 처분·머지·배포·정리·외부 세션에는 없다.

기각한 대안: 살아 있는 headless 세션에 stdin·tmux 키 입력(runner가 직접 입력을 받는
세션이 아니고 provider마다 수신 계약이 다름), 지시를 영속 저장하고 서버가 재시작을
자동 완주(별도 요청 수명·취소·복구 책임이 필요하고 요구의 필수 조건이 아님),
`onSessionDone`의 `claimed` 삭제 위치만 옮기기(stopped 분기의 base drift·실패 정산이
여전히 뒤늦게 부모와 Bead를 바꿈).

## Consequences

- 지시 재시작이 만든 자식은 원 실행과 같은 세션·모델·effort·speed·계정으로 돌고,
  현재 프리셋을 바꿔도 영향을 받지 않는다. 대가로 기록이 불완전하거나 환경이
  바뀐 실행은 재시작할 수 없고, 그 사유가 비활성 버튼의 툴팁과 서버 거부로 같은
  술어에서 나온다.
- `paused_done`이 전체 체인을 가리키므로 ■·폐기도 부모의 점유 해제와 stamp 복원이
  끝난 뒤에 움직인다.
- 실행 중 도구의 완료는 여전히 보장하지 않는다. 기존 process controller의
  TERM/KILL 유예 그대로이며, 작업 디렉터리는 보존된다.
- 이 선택은 beads-ui 내부 resume 프로토콜과 attempt 정책이다. dotfiles workflow의
  route·상태·metadata·실패 분류를 확장하지 않는다(ADR 0012).
