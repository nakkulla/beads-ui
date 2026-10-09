---
scope:
  - server/worker/session-stall.js
  - server/worker/direction-inquiry.js
  - server/worker/scheduler.js
  - server/worker/wait-judgment.js
  - server/worker/notify.js
---

# 세션이 선언한 `recovery:credential` 대기도 같은 세션 대화로 연다 (UI-c74x)

Bead: UI-c74x. 선행: dotfiles-imy71(멈춤 종류·진입 블록 정본, `blocks`). 기준 base: beads-ui `54cf86947dc97d86b0f8c8120355662ebfb9cae0`,
dotfiles origin/main `3daa38cf2b5f3f6e4d6d476b2e352bdf4b058f79`.

## 1. 목표

Worker 세션이 작업 대상 머신의 인증 문제처럼 사람만 풀 수 있는 자격 증명 부족을 만나면
결과 줄 `대기 · recovery:credential`을 남기고 끝난다. 지금은 이 대기에 자동 대화가 열리지
않고 Discord 알림도 가지 않는다. 그래서 사용자가 모니터를 직접 열어 보기 전까지는 멈춘 줄을
모른다. 2026-10-10 dotfiles-ubf0o가 01:25에 이렇게 멈췄고, 사용자는 06:37에야
`[세션에서 이어가기]`를 눌렀다. 인계 뒤 다시 실행된 세션도 06:50에 같은 사유로 멈췄지만
이번에도 알림이 없었다.

이 스펙은 세션이 선언한 `credential` 대기를 `authority`·`no_progress`와 같은 대화 대상으로
만든다. 멈추는 순간 같은 세션 대화가 자동으로 열리고(공용 자동 기동 스위치가 켜져 있을 때),
스위치와 상관없이 `🙋 확인 필요`가 한 번 간다. 대화를 띄우는 장치·알림 네 종류·인계 재개는
지금 것을 그대로 쓴다. 바뀌는 것은 대상 사유 집합 하나와 진입 블록의 사유 표기 하나다.

어느 멈춤이 사람 대화를 여는지는 dotfiles 계약(`execution-common.md` `## Worker 세션 대화`의
「멈춤」)이 정하고, beads-ui는 그 진입 블록의 바이트를 베껴 다이제스트로 고정한다(ADR UI-u6ud-2).
그래서 계약 쪽 정정(형제 dotfiles-imy71)이 먼저 착지한다.

## 2. 검증된 전제

- 대화 대상 술어는 `isSessionStalledRecovery` 하나이고, 현행 사유 집합은 `authority`·`no_progress`뿐이다 — server/worker/session-stall.js:17-36
- 멈춤 표기(`recovery:<사유>`)도 같은 집합으로 정한다 — server/worker/session-stall.js:65-79
- scheduler는 `waiting` + `cause_detail.recovery`를 기록한 직후, 술어가 참일 때만 `fireDirectionInquiry`를 부른다 — server/worker/scheduler.js:6110-6137, 11104-11120
- `fireDirectionInquiry`는 attempt당 한 번 `confirm_notified_at`을 먼저 찍은 뒤 `onParkedAttempt`를 부른다 — server/worker/scheduler.js:5734-5782
- `onParkedAttempt`는 자동 기동 스위치와 상관없이 `confirm`이면 알림(`announce`)을 보낸다. 기동 여부는 `dispose`가 스위치·tmux·Bead당 1개로 정한다 — server/worker/direction-inquiry.js:725-760
- 대상이 아닌 복구 대기는 verdict `normal`에 `[세션에서 이어가기]`·`폐기`만 붙는다 — server/worker/wait-judgment.js:204-214, 117-123, 689-693
- 대상인 복구 대기는 `judgeStalledSession`이 대화 레코드로 판정하고, 살아 있는 대화가 없으면 `action_required`(`decision`)를 낸다 — server/worker/wait-judgment.js:282-318
- `notify.js`는 `normal`을 보내지 않는다. 대상인 복구 대기는 `⚠ … 지연`을 보내지 않고 대화 알림에 맡긴다 — server/worker/notify.js:225-252
- 세션 선언 `provider`만 스트림 증거로 공급자 보류로 바꾼다. 세션 선언 `credential`은 그대로 `waiting`이다 — server/worker/scheduler.js:2603-2628, server/worker/scheduler.test.js:6180-6200
- Worker 자신의 러너 계정 인증 실패는 공급자 보류(계정 단위)로 가고 복구 대기가 되지 않는다 — docs/adr/UI-3v1h-provider-hold-server-global.md:35, 132-134
- 진입 블록은 dotfiles `execution-common.md`의 바이트 사본이고, 사유 칸이 `멈춤 recovery:<authority|no_progress>`다. 세 테스트가 다이제스트 `c08b50d0…`와 3179바이트로 고정한다 — server/worker/direction-inquiry.js:66-100, server/worker/direction-inquiry.test.js:21-27, 315-325, server/worker/resolve-session.test.js:20-24, server/worker/external-wait/session-resume.test.js:16-20
- 진입 블록의 `상황` 칸은 attempt `cause_detail.summary`의 첫 줄(`blocker:` 접두 제거)이다 — server/worker/direction-inquiry.js:200-208, 544-546, 607-612
- 기동 거절은 `disabled`·`tmux_unavailable`·`already_running`·`runner_alive`·`inquiry_in_flight` 등이고, 전사가 없으면 거절이 아니라 새 세션(`source: 'fresh'`)으로 연다 — server/worker/direction-inquiry.js:368-400, 436, 550-598, 614-650
- 현행 사유 집합은 핀 투영 `result_line_reasons`에서 `provider`·`credential`·`prerequisite`를 뺀 것과 같다고 테스트가 고정한다 — server/worker/session-stall.test.js:54-62
- dotfiles 계약은 Worker가 사람 때문에 멈추는 경우를 설계·범위 충돌(`awaiting_user`·`recovery:authority`)과 같은 원인 반복(`recovery:no_progress`)으로 한정한다. 자격 증명 부족은 대기로만 정의하고, 비밀 값은 찾거나 주입하지 않는다 — dotfiles src/shared/skills/flow/workflow/references/execution-common.md:33-37, 67; docs/contracts/workflow-contract.md:78, 186, 188
- dotfiles 테스트가 진입 블록 다이제스트와 사유 칸 문자열을 고정한다 — dotfiles tests/contracts/test_workflow_contract.py:4840-4860
- 지금 큐 기록에서 세션 선언 `credential` 대기는 dotfiles-ubf0o의 두 attempt뿐이다. 세션 선언 `provider`는 닫힌 UI-kqta 1건이다 — 각 워크스페이스 `~/.local/state/bdui/*/queue.json` attempts 조회(2026-10-10)

## 3. 설계

### 3.1 대상 사유

대화 대상 현행 사유 집합에 `credential`을 더한다(`authority`·`no_progress`·`credential`).
술어 하나가 바뀌므로 다음이 함께 따라온다. 각 경로에 따로 판정을 더하지 않는다.

- **자동 기동과 `🙋 확인 필요`.** `waiting` 기록 직후 scheduler가 대화를 띄운다. 기동은 공용
  자동 기동 스위치·tmux·Bead당 1개 게이트를 그대로 따른다. 알림은 스위치가 꺼져 있어도
  attempt당 한 번 간다.
- **대기 판정.** 살아 있는 대화가 없으면 `action_required`(`decision`)와
  `[세션에서 이어가기]`·`폐기`를 낸다. 대화가 살아 있으면 대화 레코드 표를 따른다.
- **알림 경로.** 대상이 됐으므로 `⚠ … 지연`이 아니라 대화 알림 네 종류(`🙋 확인 필요`·
  `❓ 답 대기`·`↪ Worker가 이어감`·`🙋 사람 인수`)로 말한다.
- **멈춤 표기.** 진입 블록과 알림의 멈춤 사유는 `recovery:credential`이다.

결정: 세션 선언 `provider` 대기(공급자 보류로 바뀌지 않은 것)는 대상에 넣지 않는다 — 사람이
고칠 수 있는 것이 없는 대기라 대화가 맞는 출구가 아니다. 남은 빈틈은 「경계·후속」의 관찰 줄로 둔다.

결정: Worker 자신의 러너 계정 인증 실패의 공급자 보류(ADR UI-3v1h)는 바꾸지 않는다 — 그 경로는
복구 대기가 되지 않으므로 이 집합과 겹치지 않는다.

### 3.2 진입 블록

형제 dotfiles-imy71이 사유 칸을 `멈춤 recovery:<authority|no_progress|credential>`로 바꿔 착지하면,
beads-ui는 착지 커밋의 블록 바이트를 그대로 베끼고 출처 커밋 주석과 세 테스트의 다이제스트·
바이트 수를 새 값으로 바꾼다. 서버가 채우는 칸(사유·상황·두 경로)의 채움 규칙은 그대로다.
`상황`은 attempt의 blocker 문장이다. dotfiles-ubf0o라면 "NAS Codex 로그인 계정이 hub와
다르다"가 들어간다.

대화 세션은 비밀 값을 대신 넣지 않는다. 계약 Hard stops의 자격 증명 조항이 그대로 적용되고,
로그인은 사용자가 하고 대화는 그 결과를 받아 `인계`로 끝난다. 이 스펙은 진입 블록에 새 금지
문장을 더하지 않는다.

인계 뒤 다시 열린 세션이 할 일(사용자가 갖춘 자격 증명을 한 번 확인해 이어가거나, 아직 안 되면 다시
`recovery:credential`로 끝냄)은 형제가 dotfiles `### Resume after 인계` 표의 새 행으로 정한다.
beads-ui는 지금처럼 같은 attempt를 같은 세션으로 재개할 뿐이고, 다시 멈추면 새 attempt에 대해
`🙋 확인 필요`가 다시 한 번 간다.

### 3.3 이미 멈춘 기록

결정: 배포 시점에 이미 `waiting`인 `credential` 기록에는 대화를 소급해 띄우지 않는다 — 자동
기동은 `waiting`을 기록하는 그 순간에만 일어나고, 서버 재시작마다 다시 열리지 않게 막는 새
장치가 필요 없다. 그런 기록은 배포 뒤 판정이 `action_required`로 바뀌어 `[세션에서 이어가기]`로
열린다. 이 판정 변화만으로는 알림이 가지 않는다(대상 복구 대기는 `⚠ … 지연`을 보내지 않음).

## 4. 오류 처리

기동 거절(스위치 꺼짐·tmux 없음·러너 프로세스 생존·이미 진행 중인 대화)과 전사가 없을 때의 새 세션
대체(`fresh`)는 지금 대화 대상과 같은 경로와 알림 문구를 따른다. 새 오류 경로는 없다.

## 5. 수용 기준

1. 세션이 `대기 · recovery:credential`로 끝나면, 자동 기동 스위치가 켜진 경우 같은 세션 대화가
   열리고 `🙋 확인 필요`가 한 번 간다. 스위치가 꺼진 경우에는 알림만 간다.
2. 그 대기의 카드는 살아 있는 대화가 없을 때 `action_required`와
   `[세션에서 이어가기]`·`폐기`를 보이고, `⚠ … 지연` 알림은 가지 않는다.
3. 진입 블록 사유 칸에 `멈춤 recovery:credential`이 들어가고, 블록 바이트는 dotfiles 착지
   커밋과 같다(다이제스트 일치).
4. 세션 선언 `provider` 대기와 러너 계정 인증 실패의 공급자 보류는 지금과 같다.
5. `authority`·`no_progress`·옛 사유의 동작은 바뀌지 않는다.

## 6. 테스트

- `session-stall.test.js`: `credential`을 대상으로 판정한다. `provider`는 계속 제외한다.
  핀 투영 `result_line_reasons` 대조 테스트는 제외 목록에서 `credential`을 뺀다.
- `wait-judgment.test.js`: `credential` 복구 대기가 `action_required`·`decision`과
  `[세션에서 이어가기]`를 낸다. `provider`는 `normal`로 남는다.
- `scheduler.test.js`: 세션 선언 `credential` 대기가 `fireDirectionInquiry`(directionInquiry
  `onParkedAttempt`)를 `recovery.reason: 'credential'`로 한 번 부른다. 기존
  `keeps unmatched recovery waits unchanged`(`status: waiting`·공급자 보류 미호출)는 유지한다.
- `direction-inquiry.test.js`·`resolve-session.test.js`·`external-wait/session-resume.test.js`:
  새 다이제스트·바이트 수. 진입 블록 사유 칸에 `멈춤 recovery:credential`이 채워진다.
- `notify.test.js`: `credential` 복구 대기에 `⚠ … 지연`을 보내지 않는다.

## 7. 대안

- 세션 선언 `credential`에 `⚠ … 지연`만 보내고 대화는 띄우지 않는 안: 알림 문법이 대화 대상과
  둘로 갈리고, 사용자는 결국 `[세션에서 이어가기]`를 눌러야 한다. 택하지 않는다.
- beads-ui만 고치고 진입 블록 사유 칸은 그대로 두는 안: 계약이 정한 멈춤 종류 밖의 값을 채우게
  되어 사본과 정본이 어긋난다. 택하지 않는다.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 멈춤 종류와 진입 블록은 dotfiles 계약이 정하고 beads-ui는 바이트를 베껴 다이제스트로 고정하므로, 계약을 먼저 바꾼다.
- 전제: ADR UI-3v1h — Worker 러너 계정 인증 실패는 계정 단위 공급자 보류로 남는다.
- 세션이 선언한 `recovery:credential` 대기를 `authority`·`no_progress`와 같은 같은-세션 대화 대상으로 둔다. 되돌리기 어렵다: dotfiles 계약 멈춤 종류·진입 블록 바이트·dotfiles 다이제스트 테스트와 beads-ui 술어·진입 블록 사본·세 다이제스트 테스트가 함께 움직여야 한다. 소비자는 계약, 진입 블록, 대화 기동, 대기 판정, 알림이다. 맥락 없이 보면 의외다: UI-jbl1은 `credential`을 공급자 보류 경로로 보냈지만, 세션이 작업 대상 머신의 자격 증명을 선언한 대기는 그 경로에 닿지 않고 사람만 풀 수 있는데 알림 없이 남는다(dotfiles-ubf0o, 5시간). 실제 절충이다: 대안은 (a) `⚠ … 지연` 알림만 보내기 — 계약 변경이 없지만 알림 문법이 대화 대상과 갈리고 사용자가 매번 버튼으로 세션을 연다, (b) 지금처럼 두기 — 무알림 정지가 남는다. 대화가 자동으로 열리는 개입 비용과 두 저장소 동시 변경을 받아들이는 대신 무알림 정지를 없앤다. 이 소비자 집합은 UI-jbl1과 같고, UI-jbl1의 "대화 대상은 `authority`·`no_progress`"(UI-nuwy 승계 조항 L152-156, L491)와 "`credential`은 공급자 보류 경로"(L285, L499) 조항을 뒤집는다. 나머지 조항은 모두 승계한다. `summary`: "실패 종단(배포·post-merge 잡 실패, 머지 게이트 보류, 폐기 실패, 수동 배포 실패)은 공용 대화 자동 기동 스위치가 켜지면 클릭과 같은 해결 세션을 분리 창에 실패당 한 번 자동으로 열고, 알림은 「🙋 확인 필요 · <클래스>」 하나로 통일해 「🚨 사람 필요」를 없앤다; 수동 배포 실패는 「저장소 작업」 서랍의 [세션에서 이어가기]와 작업 식별자 키의 대화 레코드를 가지며 인계는 그 작업 1회 재실행이다; 같은 세션 대화를 여는 복구 대기는 세션이 선언한 `authority`·`no_progress`·`credential`이고, 공급자 보류로 바뀌지 않은 `provider`는 대상이 아니다" → ADR, supersede UI-jbl1
- 이미 `waiting`인 `credential` 기록에 대화를 소급해 띄우지 않음 — 되돌리기 쉬움: 기동 시점 규칙을 그대로 두는 것이고 저장 형식이 바뀌지 않는다 → ADR 아님

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다음 소유자가 앞 결과의 수용을 필요로 함 — 멈춤 종류(`recovery:credential` 추가, ADR dotfiles/dotfiles-va3cr supersede)와 진입 블록 사유 칸의 정본을 착지하고 이 Bead가 그 바이트를 베낀다 | 없음 | dotfiles-imy71 |

- 결정: 이 Bead의 구현은 형제 착지 뒤에만 시작한다(foreign `blocks`) — 진입 블록 바이트와 멈춤 종류의 정본이 형제다(ADR UI-u6ud-2).
- 관찰: 세션 선언 `provider` 대기 중 공급자 보류로 바뀌지 않은 것은 자동 재개도 알림도 없이 남는다 — 사용자 결정(2026-10-10)으로 이번 범위 밖이다. 사람 대화가 아니라 시간 뒤 자동 재시도가 맞는 출구인지는 따로 판단해야 하고, 기록상 1건(UI-kqta, 닫힘)이라 지금 Bead를 만들지 않는다.
