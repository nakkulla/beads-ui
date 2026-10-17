---
scope:
  - server/worker/session-lane.js
  - server/worker/scheduler.js
---

# UI-mcth — 세션 레인은 사람 답이 필요한 결과 줄에서 창을 닫지 않는다

## 1. 배경

2026-10-17 08:34 KST, Cortex-cv5(`worker-ineligible`) 세션 레인 attempt
`Cortex-cv5-1792161408113-1`의 Codex 세션은 승인 스펙이 정한 사람 확인 지점(첫 자동
커밋 제외 목록)에 닿았다. 세션은 대화로 묻고 기다리지 않고 `대기 · recovery:authority`
종단 결과 줄을 썼다. beads-ui는 이 줄을 headless와 같은 판정에 넣어
`failAttempt(session_recovery_wait)`로 정리했다. 그리고 5초 뒤 hub 창을 kill했다
(`events.jsonl`: 08:35:13 결과, 08:35:18 `세션 레인 세션 종료 · killed`). 질문은 Bead
댓글에만 남았고, 사용자는 답할 창을 잃었다.

세션 레인의 존재 이유는 "사람이 필요할 때 그 창에 들어가 답한다"이다(UI-lbm5 §1).
그런데 사람 답이 필요한 결과 줄이 나오자마자 창을 닫으면 그 목적이 깨진다.

사용자 결정(2026-10-17):

- 세션 레인 attempt는 착지 전까지 hub 창을 유지한다. 답을 기다리는 동안에도 슬롯을
  점유한다.
- 창을 유지하는 결과 줄은 사람 답이 필요한 것만이다(파킹·실패·환경·recovery 대기).
  Worker가 스스로 처리하는 대기(blocks·external·base_moved)는 지금처럼 정리한다. 슬롯을
  잡은 채 선행 Bead를 기다리다 대기열이 멈추는 일을 막기 위해서다.

## 2. 검증된 전제

기준 base `a68b394f96c1e24759cfc3eb0ce0d2450dca1877`.

- 살아 있는 세션 레인 창의 새 assistant 메시지는 `processSessionLaneMessage`가 한 번씩
  처리한다. 첫 줄이 종단 결과 줄이면 `settleSessionLaneVerdict`로 `onSessionDone`에
  넣고, 기록을 `settled_by: 'done'`으로 닫는다. 그러면 기존 유휴 → `/exit` → kill
  사다리가 창을 닫는다 — server/worker/scheduler.js:11192, :11238-11256
- 결과 줄이 아닌 메시지는 처리 표지(`processed_message_at`)만 남기는 답 대기다 —
  server/worker/scheduler.js:11239-11245
- `onSessionDone`은 먼저 `settleBaseDrift`로 base 착지를 확인해 있으면
  `base_landing_detected`로 닫는다. 그다음 `recovery_wait`·`failure`·`environment`
  결과를 공급자 장애면 보류로, 아니면 `failAttempt`로 닫는다(원인은 각각
  `session_recovery_wait`·`session_failed:reported_failure`·
  `session_hard_stop:environment`) — server/worker/scheduler.js:7051-7063, :7187-7228
- 종단 결과 줄 종류는 `success`·`parked`·`failure`·`environment`·`waiting_blocks`·
  `waiting_external`·`recovery_wait`·`base_moved` 여덟 가지다 —
  server/worker/runner/session.js:98-140
- `sessionLaneVerdict`는 결과 줄을 verdict로 바꾸고, 결과 줄이 아니면 null을 낸다 —
  server/worker/session-lane.js:125-147
- `sessionLaneAwaitsAnswer`는 `question`이거나, `idle`이면서 마지막 메시지가 결과 줄이
  아닐 때 답 대기로 본다 — server/worker/session-lane.js:158-166
- 세션 레인 생존은 pane 관측(`interactive.gone_at`)으로만 판정한다. `running`이고 죽지
  않은 attempt는 `occupiedBeadIds`에서 슬롯을 점유한다 —
  server/worker/scheduler.js:8673-8676, :17623-17641
- 창이 사라지면 `disposeDeadSessionLane`이 `goneSessionLaneVerdict`를 먼저 본다. 마지막
  처리 표지 이후의 결과 줄이 있으면 그 줄로 정산하고, 없으면 `session_exited`로
  닫는다. 처리 표지 이하의 메시지는 보지 않는다 — server/worker/scheduler.js:8836-8845,
  :8879-8921
- 실행 중 대화 카드는 `idle`이고 처리 표지가 있으면 `답 대기`로 그린다 —
  app/views/worker/lanes.js:1765-1774
- `✕ Worker에서 내리기`·`폐기`는 창에 `/exit`를 보내고 유예 뒤 kill한다 —
  server/worker/scheduler.js:20217-20222, :20264-20268
- dotfiles 계약은 세션 레인 세션에게, Bead에 원래 남은 사람 판단 지점에서는 대화로
  묻고 턴을 끝내라고 정한다. `authority` recovery 사유는 승인 범위 밖의 일만 덮는다 —
  dotfiles docs/contracts/workflow-contract.md:133, workflow skill
  references/completion-report.md:29-36
- 세션 레인 기동 env에는 work recovery 준비 env(`BDUI_WORK_RECOVERY_SCHEMA=1`)가
  들어간다 — docs/superpowers/specs/2026-10-16-worker-queue-session-lane-design.md §4.3

## 3. 목표와 비목표

목표

- 살아 있는 세션 레인 창이 보류 대상 결과 줄을 내면, attempt는 `running`으로 남는다.
  창·claim·슬롯은 그대로 두고 카드는 `답 대기`를 보인다.
- 사람이 그 창에서 답하면 세션이 이어서 진행한다. 이어진 메시지는 처음처럼 다시
  판정한다.

비목표

- headless attempt의 결과 줄 처리는 바꾸지 않는다.
- 세션 레인 기동 env(§4.3)는 바꾸지 않는다.
- 이미 `failed`로 닫힌 Cortex-cv5 attempt는 소급 처리하지 않는다. 그 attempt는 카드의
  기존 재개 조작으로 이어 간다.

## 4. 설계

### 4.1 결과 줄 두 갈래

세션 레인에서 종단 결과 줄을 두 갈래로 나눈다. 판정 함수는 하나다(예:
`session-lane.js`의 `sessionLaneHoldsWindow(terminal_result)`).

| 갈래 | 결과 줄 종류 | 처리 |
| --- | --- | --- |
| 보류(창 유지) | `parked`·`failure`·`environment`·`recovery_wait` | §4.2 |
| 정산(현행) | `success`·`waiting_blocks`·`waiting_external`·`base_moved` | 기존 `onSessionDone` → 창 닫기 |

- 결정 — 보류는 사람 답이 필요한 네 종류로 한정한다 (대안: 성공 외 전부 보류; 이유:
  blocks·external·base_moved는 Worker가 자동으로 재개하는 대기인데, 창과 슬롯을 잡고
  있으면 그 재개가 일어나지 않는다. 선행 Bead가 같은 대기열 뒤에 있으면 서로 기다리다
  멈춘다. 사용자 결정 2026-10-17).

### 4.2 보류 처리

살아 있는 창의 새 메시지가 보류 갈래 결과 줄이면 다음과 같이 처리한다.

- 결과 줄이 아닌 메시지와 똑같이 처리 표지와 발췌만 기록한다. `onSessionDone`을
  부르지 않고, attempt 상태도 바꾸지 않는다. 기록을 `settled`로 닫지 않으므로
  유휴 → `/exit` → kill 사다리도 돌지 않는다.
- 타임라인에 `세션 레인 결과 · <결과 줄> — 창 유지` 한 줄을 남긴다. 같은 메시지는 한
  번만 남긴다.
- 슬롯과 claim은 attempt가 `running`이고 pane이 살아 있으므로 기존 판정으로 유지된다.
  새 점유 규칙은 없다.
- Discord 알림은 보내지 않는다. 세션의 Discord 스레드가 턴 종료를 알린다(UI-5chz,
  UI-lbm5 §4.4).

### 4.3 이어진 메시지

- 사람이 답한 뒤 세션이 낸 새 메시지는 §4.1 판정을 처음처럼 다시 탄다. 성공 줄이면
  정산하고 창을 닫는다. 다시 보류 줄이면 다시 창을 유지한다. 결과 줄이 아니면 답
  대기다.
- 서버를 재시작해도 처리 표지가 남아 있으므로 같은 보류 줄을 다시 판정하지 않는다.

### 4.4 보류 중 창이 사라질 때

- 마지막으로 처리한 메시지가 보류 줄인 상태에서 pane이 사라지면, 그 보류 줄로
  정산한다. 즉 headless와 같은 `onSessionDone` 판정을 타며, `session_exited`로
  처리하지 않는다. 기존 정산 우선순위는 그대로다: base 착지가 감지되면
  `base_landing_detected`, 공급자 장애면 보류가 결과 줄보다 먼저다.
- 결정 — 창이 사라지면 세션이 남긴 보류 줄이 결과다 (대안: `session_exited`; 이유:
  세션이 스스로 밝힌 원인(recovery 사유·실패 문장)이 카드와 실패 분류에 남아야 다음
  조치를 고를 수 있다. 처리 표지 때문에 지금의 `goneSessionLaneVerdict`는 그 줄을
  보지 못하므로 이 경우를 따로 읽는다).
- 그 뒤에 새 메시지가 있으면 그 메시지가 우선한다. 새 메시지가 결과 줄이 아니면
  기존처럼 `session_exited`다.

### 4.5 표시

- 카드는 기존 렌더 그대로 `답 대기`와 발췌(보류 줄로 시작)를 보인다. 새 칩·배지·버튼은
  없다.
- 실행 중 타일의 `✕ Worker에서 내리기`·`폐기`는 현행대로 창을 닫고 처분한다.

### 4.6 바꾸지 않는 것

- 결정: headless attempt의 결과 줄 판정과 `failAttempt` 원인 어휘는 바꾸지 않는다 —
  보류는 세션 레인의 살아 있는 창에만 적용된다.
- 결정: 세션 레인 기동 env에서 `BDUI_WORK_RECOVERY_SCHEMA`를 빼지 않는다 (대안: 빼서
  recovery 줄을 막기; 이유: 계약상 대화형 세션은 이 값 없이도 recovery 줄을 쓸 수
  있어서 막지 못한다. §4.3의 headless 동등성도 깨진다).

## 5. 테스트

- 보류 네 종류 각각: 살아 있는 창의 결과 줄이 오면 attempt는 `running`으로 남고,
  `failAttempt`를 부르지 않고, 기록이 `settled`되지 않고, 처리 표지가 기록된다.
- 정산 네 종류(성공·blocks·external·base_moved)는 현행대로 정산하고 기록을 닫는다
  (기존 테스트에 없는 종류는 하나씩 추가).
- 보류 뒤에 성공 줄이 오면 정산하고 창을 닫는다.
- 보류 중 attempt는 `occupiedBeadIds`에 들어간다.
- `sessionLaneAwaitsAnswer`: `idle`이고 마지막 메시지가 보류 줄이면 true, 정산 줄이면
  false.
- base 착지가 없고 공급자 장애가 아닐 때, 보류 줄 뒤에 pane이 사라지면 그 보류 줄의
  원인으로 `failAttempt`하고, `session_exited`가 아니다.
- 서버 재시작 뒤 같은 보류 줄은 다시 처리하지 않는다.
- 타임라인의 `창 유지` 줄은 같은 메시지에 대해 한 번만 남는다.

## 6. 경계·후속

- 관찰: Cortex-cv5 세션은 Bead에 원래 남은 확인을 `recovery:authority`로 썼다. 계약상
  `authority`는 승인 범위 밖의 일만 덮으므로, 이건 계약 위반이다 — 이 스펙이 착지하면
  같은 일이 생겨도 창이 유지되어 피해가 없다. 계약 문구는 이미 맞으므로 dotfiles
  Bead는 만들지 않는다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 결과 줄 어휘와 세션 레인 계약은 dotfiles가 정본이다. beads-ui는
  그 줄을 읽어 창 처리만 정한다.
- 세션 레인은 사람 답이 필요한 결과 줄(파킹·실패·환경·recovery 대기)에서 attempt를
  정산하지 않는다. 대신 창·claim·슬롯을 유지한 채 답 대기로 두고, 성공과 Worker 자동
  대기(blocks·external·base_moved)만 headless와 같은 판정으로 정산해 창을 닫는다.
  보류 중 창이 사라지면 그 보류 줄로 정산한다.
  - 되돌리기 어려움: 함께 움직여야 하는 소비자가 있다. `scheduler.js`의 세션 레인
    메시지 처리와 창 소멸 정산, `session-lane.js` 답 대기 판정, 카드의 답 대기 렌더,
    그리고 세션 레인 결과 줄을 쓰는 dotfiles 계약 쪽 기대다.
  - 의외: 충족. "세션 레인 결과는 headless와 같은 판정"(UI-i7k9)을 읽은 사람은 recovery
    줄 뒤에도 창이 남는 것을 설명 없이는 예상하지 못한다.
  - 대안 있음: 성공 외 전부 보류, recovery만 보류, 현행 유지가 있었다.
  - UI-i7k9와 소비자(`scheduler.js` 세션 레인 정산)가 같으므로 새 주제가 아니다.
    뒤집는 조항은 "결과는 종단 결과 줄로 headless와 같은 판정을 탄다" 하나다.
  - `summary`: "Worker 대기열 배치 추천은 서버가 jev 쌍 판정(두 이슈 재료 digest로 캐시, 선언 scope 겹침은 질문 재료로만 싣는다)과 고정 조건(blocks)으로 쌍 관계를 만들고, jev의 충돌은 해소 세션으로도 풀기 어려운 겹침에만 내며, 화면이 현재 큐·후보 순서로 자리를 계산해 Worker 탭 후보 카드의 별도 [추천 배치] 버튼을 누를 때 점선 미리보기로 보이고([↴ 대기로] 수동 메뉴는 그대로) 레인에는 사람의 [적용]·[전체 적용]만 쓴다; 큐 변화는 jev를 부르지 않고 추천은 blocks 의존을 쓰지 않으며 질문 정의는 beads-ui 서버에 둔다; 배포·빌드 조항은 UI-u6ud-5에서 승계한 그대로다; worker-ineligible과 exec_lane=session인 session-preferred 이슈는 Worker 대기열에서 세션 레인으로 실행된다 — 같은 admission·공유 슬롯·직렬 레인을 거쳐 Worker attempt로 기록되고(fast_track·worker 출처) headless와 같은 계정·가드 훅 env로 Worker 표지 없이 session-hub 대화형 창으로 열리며, 생존은 isDeadAttempt가 마커 pane 관측으로 판정하고(관측 실패는 생존) 결과는 종단 결과 줄로 판정하되 성공과 Worker 자동 대기(blocks·external·base_moved)만 headless와 같은 판정을 타고 창을 닫으며, 사람 답이 필요한 줄(파킹·실패·환경·recovery 대기)은 정산 없이 창·claim·슬롯을 유지한 답 대기로 남고 그 상태에서 창이 사라지면 그 줄로 정산한다; 결과 줄 없는 창 소멸은 클릭 전용 session_exited 실패이고 재개는 세션 레인 attempt의 ↻ 이어하기이며 일시정지는 없다; UI-lbm5가 UI-1eag에서 승계한 나머지 조항은 그대로다" → ADR, supersede UI-i7k9
