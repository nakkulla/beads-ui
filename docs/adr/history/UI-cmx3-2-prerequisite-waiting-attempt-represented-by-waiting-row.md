---
id: UI-cmx3-2
title: 선행 대기 attempt가 있는 bead는 held 타일이 아니라 대기 행이 대표한다
status: superseded
superseded_by: UI-3pu9
date: 2026-09-16
summary: 'prerequisite_unmet waiting attempt가 있는 bead는 held 타일이 아니라 대기 행이 대표하고 실행 중 그리드는 실행·사람 조작 대기만 담는다'
spec: docs/superpowers/specs/2026-09-16-serial-lane-stack-waiting-row-demotion-design.md
bead: UI-cmx3
---

# 선행 대기 attempt가 있는 bead는 held 타일이 아니라 대기 행이 대표한다

## Context

`lane-model.js`의 `activeByBead`는 종료된 `waiting` attempt를 `parked`·`retry_wait`·
`provider_hold`와 함께 held 타일로 승격하고, 같은 bead의 대기 행은 `claimed`로 숨겼다.
ADR 0038은 처분 대기 admission이 선 bead에 대해 이 규칙을 뒤집어 대기 행이 held
타일을 이기게 했지만, 선행 미충족으로 착수하지 않고 끝난 attempt는 여전히 타일이었다.

2026-09-16 관측에서 직렬 레인의 세 bead가 모두 `waiting/prerequisite_unmet`으로 끝나
실행 중 그리드에 `🔓 복귀 대기 · ⚠ 지연 n분`·`⛓ 선행 대기` 타일 세 개가 남았다.
실제로 진행을 막은 것은 서버 재시작으로 `auto_advance`가 꺼진 큐 단위 사정 하나였는데,
화면은 이를 bead 세 개의 실행 중 상태와 행별 지연 판정으로 표현했다. 사용자의
판단은 (1) 실행 중이 아닌 것이 실행 중 레인에 있다 — 세션이 아무것도 하지 않고 끝난
attempt는 실행 흔적이 아니라 큐 순서 정보다; (2) `복귀 대기`는 워커 내부 사정("다음
스캔이 아직 안 돌았다")을 노출한 이름이다; (3) `⚠ 지연`은 원인이 `auto_advance` 하나라
같은 정보의 중복이다.

되돌리기 어렵다: 두 탭·`blockedByFields`·4b 칩 부착·Monitor 라벨·어휘 표·슬롯 표·
테스트가 "행 대표"에 묶이고, 되돌리려면 `복귀 대기` 어휘와 지연 판정을 다시 살려야
한다. 맥락 없이 의외다: `waiting` attempt 레코드가 큐에 살아 있는데 타일이 없고, 코드만
읽으면 왜 `base_moved` `waiting`은 타일이고 `prerequisite_unmet` `waiting`은 행인지
드러나지 않는다. 실제 절충이 있다: 선행 대기 attempt 기록에 대한 폐기·재시도 조작
표면이 사라진다.

## Decision

- 화면 대표는 "무엇을 기다리나"가 정한다. 실행 중 그리드는 세션이 돌거나(running·
  paused) attempt 자체를 사람이 처리해야 하는 것(failed·parked·retry_wait·
  provider_hold, `base_moved`·recovery `waiting`)만 담는다. 선행을 기다리는 bead는
  대기 행이다.
- 강등 판정의 재료는 attempt의 `cause` 하나다: `run_state === 'waiting'`이고
  `attempt.cause === 'prerequisite_unmet'`이면 `activeByBead`는 타일을 만들지 않고
  `claimed`에도 넣지 않아 그 bead의 기존 대기 행(병렬 큐·직렬 레인 entry)이 자기
  레인·순번·진입 시각을 지킨 채 대표한다. `cause`가 `base_moved`·recovery 계열이거나
  미상이면 현행대로 타일이다(fail-closed). Worker·Monitor는 같은 `buildLanes`를 쓰므로
  함께 바뀐다(ADR 0014).
- 기록은 바꾸지 않는다. `waiting` attempt·admission·`wait_notified`·타임라인은
  불변이고(ADR UI-lmqu·0029·0027), 강등은 화면 대표만 바꾼다. 다음 attempt가
  dispatch되면 옛 레코드는 저절로 대표에서 물러나므로 대기 행에 폐기 출구를 두지
  않는다.
- 새 어휘·새 칩·새 레인은 없다. `복귀 대기` 배지·어휘와 서버의 `return_overdue`
  지연 판정은 제거하고, 막던 선행이 해제된 사실은 대기 행 4b의 기존 `🔓 <ID>` 칩이
  말한다 — 선행 대기 기록(`waiting/prerequisite_unmet` attempt 또는 `prerequisite_unmet`
  admission)이 있는 대기 행은 동결 선행에서 지금 열린 선행을 뺀 나머지를 그 칩의
  재료로 얻는다(UI-d13v "후보 행만"의 예외). 열린 선행이 하나도 없으면 서버는
  `prerequisite` 사유 자체를 내지 않고, 행에는 `⛓` 칩도 배지도 흐림도 서지 않는다.
- 시각 정보는 판정 없이 이슈 상세 의존성 절의 참고 줄 하나로만 남긴다(선행 대기
  시작 · 해제 · 해제 후 경과). 외부 작업·공급자 보류의 지연 판정과 알림은 유지한다.
  큐 단위 사정(`auto_advance` 꺼짐)의 표시는 막힌 행의 4a 게이트 칩이다(ADR
  UI-a8rq).

## Consequences

실행 중 그리드는 실제 실행과 사람의 attempt 조작 대기만 담고, 선행 대기는 대기 행의
`⛓ <ID>`·`🔓 <ID>`·`⛓ 선행 대기`·`⏸ 수동 출발`로 모두 말한다. 어휘 표와 슬롯 표에서는
빼기만 한다. 선행 대기 attempt 레코드에 대한 폐기·재시도 조작은 없어지고 이력만 남는다.
`waiting/prerequisite_unmet` attempt가 있는데 그 bead가 어느 레인 entry에도 없으면
대표할 행이 없어 화면에서 사라지고 후보 레인이 `bd ready`에 따라 다시 보여 준다(ADR
0033).

기각한 대안: 타일 유지 + 뱃지 문구 개선(실행 중이 아닌 것이 실행 중 레인에 남는 문제가
그대로), 별도 "선행 대기" 레인 신설(UI-n99w의 "레인 밖으로 옮기지 않는다"와 충돌),
`복귀 대기` 라벨만 바꾸기, 지연 임계 연장(원인이 `auto_advance`라 임계와 무관).
