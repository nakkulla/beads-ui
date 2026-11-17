---
scope:
  - app/views/worker/tile-resolve.js
  - app/views/worker/running-grid.js
  - app/views/worker/lane-model.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/views/monitor/card-parity.test.js
  - app/protocol.md
  - server/ws/worker-handlers.js
  - server/worker/direction-inquiry.js
  - server/worker/session-stall.js
  - server/worker/wait-judgment.js
  - server/worker/scheduler.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-09-02-worker-operation-surface-unify-design.md
---

# 일시정지 타일의 `[세션에서 이어가기]`

Bead: `UI-6kj0` · 날짜: 2026-11-17 · 출처: 사용자 요청(모니터 모바일 캡처의
일시정지 타일)

## 1. 목표

사용자가 `⏸`로 멈춘 Worker attempt의 타일에 `[세션에서 이어가기]`를 세운다.
클릭하면 그 attempt의 세션이 tmux 대화로 다시 열리고, 사용자는 그 창이나 Discord
스레드에서 대화하며 작업을 잇는다. 지금 일시정지 타일의 출구는 `▶ 재개`(지시를
입력한 뒤 Worker가 무인으로 재개) 하나라서, 멈춘 작업을 사람이 들여다보며 이어
갈 길이 없다.

사용자 결정(2026-11-17): 열린 세션은 지시 한 번을 받고 Worker로 돌아가지 않고
대화하며 계속 작업한다. 버튼은 카드 아래 줄(슬롯 6)에 홀로 서고 `▶ 재개`는 지금
자리(슬롯 1)에 남는다.

비목표: 일시정지에 따른 자동 기동·알림, PR 대기 행의 `자동 진행 일시정지`·`충돌
해소 일시정지`, 공급자 보류, 세션 레인 타일.

## 2. 검증된 전제

- 일시정지 타일의 슬롯 1 조작은 `▤ 세션`·`▶ 재개`·폐기·`✕`이고 세션 버튼은 없다 —
  app/views/worker/running-grid.js:1667-1694
- `[세션에서 이어가기]`의 유무는 `tileResolveFields` 하나가 정하고, 행 종류가
  없으면 그리지 않는다. 행은 복구 대기·바로 실행 미해결·외부 작업 완료·실패·파킹
  순이고 일시정지는 없다 — app/views/worker/tile-resolve.js:390-396, 432-434
- 세션 레인의 실행 중·`session_exited` 타일은 이 술어에서 먼저 빠진다 —
  app/views/worker/tile-resolve.js:344-351
- 짝 기준(`pair_anchor`)이 폐기·외부 작업이 아니면 세션 버튼은 슬롯 6 foot에
  선다 — app/views/worker/running-grid.js:1517-1542
- 서버 클릭 처리는 실패 맥락도 외부 작업 완료도 없으면 `no_terminal_failure`로
  거절하고, 행 순서는 복구 대기·바로 실행·외부 작업 완료·파킹·실패다 —
  server/ws/worker-handlers.js:8306-8311, 8336-8344
- 같은 세션 대화 런처는 `awaiting_user`도 복구 사유도 없으면 `invalid_park`로
  거절한다 — server/worker/direction-inquiry.js:856-861
- 그 런처는 attempt의 자기 세션을 `--resume`으로 열고, 러너 프로세스가 살아
  있거나 관측 불가면 거절하며, 문의(`inquiry`) 대화 레코드를 남긴다 —
  server/worker/direction-inquiry.js:425-458, 467-494, 716-748
- 대화 사유의 멈춤 값은 `awaiting_user=<값>`과 `recovery:<사유>` 둘뿐이다 —
  server/worker/session-stall.js:66-80,
  server/worker/direction-inquiry.js:169-171
- 진입 블록은 dotfiles 문서의 바이트 사본이고 sha256을 시험이 고정한다 —
  server/worker/direction-inquiry.js:110-124,
  server/worker/direction-inquiry.test.js:360-363
- dotfiles 진입 블록의 `대화 사유` 줄은 멈춤 두 종류·실패·외부 작업 완료만
  적고, 절차 2는 답이 결정을 주면 같은 턴을 `워커가 이어감`으로 끝내게 한다 —
  dotfiles `src/shared/skills/flow/workflow/references/execution-common.md`:72,
  88 (origin/main `2f28747e596b75d04f54baf3c41a021228440d81`)
- 인계 정산은 `parked`와 복구 대기 attempt만 재개 대상으로 본다 —
  server/worker/scheduler.js:11860-11867
- 재개 함수는 `paused` attempt를 받는다. 그 Bead에 살아 있는 대화가 있는지는
  보지 않는다 — server/worker/scheduler.js:18251-18267,
  server/ws/worker-handlers.js:6545-6556
- 사용자의 `⏸`는 러너를 끝내고 attempt를 원인(`cause`) 없는 `paused`로 남기며
  세션 ID가 없으면 거절한다 — server/worker/scheduler.js:23625-23645,
  23688-23695
- 다른 `paused` 기록은 모두 원인을 싣는다: 공급자 장애 `provider_outage:`,
  내려옴 `withdrawn`, 계정 선점 `account_preempt:` —
  server/worker/scheduler.js:7615-7620,
  server/worker/queue-store.js:6360-6366, 11984-11992
- 공급자 장애로 멈춘 attempt는 화면에서 `provider_hold` 상태로 따로 선다 —
  app/views/worker/lane-model.js:1428-1434, 2155-2156
- 대화 카드의 Discord 링크는 기동 경로와 상관없이 브리지의 세션별 스레드 기록에서
  붙고, 브리지가 살아 있으면 링크 전에는 준비 중으로 보인다 —
  server/ws/worker-handlers.js:3640-3667
- 마무리 뒤 되돌리기는 클릭 때 Bead 상태를 읽어 `open`이 아니면 거절한다 —
  server/worker/scheduler.js:12047-12056
- 대화 진행 줄(`대화 중`·`답 대기`)은 파킹·대기 타일에만 그린다 —
  app/views/worker/running-grid.js:1699-1700
- 답 대기 중 `[워커로 이어가기]`는 서버가 파킹·복구 대기 행의 대기 사유에 실어
  보낸다 — server/worker/wait-judgment.js:449-456, 482-500, 1033
- 현행 ADR은 `[세션에서 이어가기]`가 서는 행을 확인 필요·실패·외부 작업 완료
  셋으로 적는다 — docs/adr/UI-gmww-lone-candidate-recommendable.md:1204-1211
- dotfiles 진입 블록 절의 머리말은 블록이 세 종류의 대화를 섬기고 멈춤은 무인
  Worker 세션이 사람 때문에 멈춘 경우라고 적는다 — dotfiles
  `src/shared/skills/flow/workflow/references/execution-common.md`:13-21
- dotfiles의 Worker 세션 대화 현행 ADR은 `ADR dotfiles/dotfiles-724yw`이고 승계한 사람 멈춤
  조항을 본문에 갖고 있다 — dotfiles `docs/adr/README.md`:10,
  `docs/adr/dotfiles-724yw-worker-conversation-adr-approval.md`:9, 493
- 미확인: `이 대화에서 마무리`로 넘어간 세션이 Bead를 끝냈을 때 멈춰 있던
  attempt의 자리를 푸는 기존 경로가 `paused`도 다루는지 — 파킹 attempt의 정리
  경로를 끝까지 따라가지 못했다. §3.4가 요구 동작을 적는다.

## 3. 설계

### 3.1 대상 행

일시정지 행은 그 Bead의 최신 구현 attempt가 `paused`이고 원인(`cause`)이 비어
있으며 실행 중 칸의 자리를 쥐고 있는 타일이다. 원인이 빈 `paused`는 사용자의
`⏸`(지시 재시작이 거치는 일시정지 포함)가 남긴 기록뿐이다. 화면 술어와 서버 클릭 처리는 이 정의 하나를 쓴다. 다음은
대상이 아니다.

- 공급자 장애로 멈춘 attempt — 프로브가 해제를 판정한다.
- 계정 선점으로 멈춘 attempt — 서버가 다시 띄운다.
- 세션 레인 타일 — `▤ 세션`과 `↻ 이어하기`가 이미 그 창을 연다.
- `✕`로 내려온 attempt — 실행 중 자리가 없고 후보 카드의 `⏏ 내려옴`으로 선다.
- PR 대기 행의 `자동 진행 일시정지`·`충돌 해소 일시정지` — 구현 attempt의
  일시정지가 아니다.

행 순서는 기존 순서의 맨 끝이다. 같은 타일에 실패한 폐기가 있으면 실패 행이
이긴다. 화면 술어와 서버 클릭 처리는 같은 순서를 쓴다.

### 3.2 버튼

- `[세션에서 이어가기]`는 슬롯 6 foot에 홀로 선다. 유무·활성·툴팁은
  `tileResolveFields`가 내고 렌더러는 다시 판정하지 않는다.
- 결정: `▶ 재개`는 슬롯 1에 남는다 — 사용자 결정이고, 좁은 화면의 슬롯 1이
  이미 가득 차 있다.
- 툴팁은 "일시정지한 세션을 같은 세션 그대로 대화로 다시 엽니다 — 대화하며
  작업을 잇고, Worker로 넘기면 Worker가 이어갑니다"다.
- 살아 있는 대화가 있을 때의 세션 버튼은 현행 규칙 그대로다: Discord 링크가
  있으면 서지 않고, 없으면 서서 그 창을 앞으로 부른다.
- 결정: 일시정지 행의 `[워커로 이어가기]`는 `▶ 재개`다. 대화가 없으면 지금처럼
  재개 대화상자를 연다. 대화가 살아 있고 답을 기다리면 대화상자 없이 대화 인계를
  보낸다(창을 닫고 Worker가 같은 세션을 잇는다). 대화가 살아 있고 세션이 턴을
  돌리는 중이면 비활성이다. 툴팁이 세 경우를 각각 말한다. 따로 선 `[워커로
  이어가기]` 버튼은 그리지 않는다 — Worker가 잇는 조작이 한 타일에 둘이면 어느
  것을 눌러야 하는지 다시 읽어야 한다.
- 어느 경우인지는 서버가 그 행에 실어 보내는 대화 인계 조작의 유무와 대화
  레코드로 `tileResolveFields`가 정한다(예: 짝 기준 값 `resume`).
- 대화가 살아 있는 동안 타일은 대화 진행 줄(`대화 중 <경과>`·`답 대기` + 발췌)을
  파킹 타일과 같은 자리에 그린다.
- Worker 탭과 모니터는 같은 재료로 같은 타일을 그린다.

### 3.3 클릭과 기동

- 클릭 op는 기존 `worker-resolve-in-session` 하나다. 서버가 일시정지 행을 읽으면
  문의 런처로 같은 세션 대화를 연다: attempt의 자기 세션, 구현 워크트리, 사람의
  tmux 세션, Discord 중계까지 확인 필요 행과 같다.
- 러너 프로세스 생존·관측 불가, tmux 불가, 인계 예약 중, bd 불가의 거절과
  세션·워크트리가 없을 때의 새 세션 대체는 현행 문의 런처 규칙 그대로다.
- 첫 입력은 dotfiles 진입 블록 사본이다. `대화 사유`는 `멈춤 paused`, `상황`은
  "사용자가 Worker 실행을 일시정지했다 — 세션이 묻던 질문은 없다"다.
- 대화 레코드는 문의 종류 그대로이고 멈춤 사유만 `멈춤 paused`다.
- 결정: 일시정지는 대화를 자동으로 띄우지 않고 `🙋 확인 필요`도 보내지 않는다 —
  사람이 스스로 멈춘 것이라 사람을 부를 일이 없다. 클릭이 유일한 트리거다.
- 결정: 재개하려는 attempt가 `paused`이고 그 Bead에 정산되지 않은 문의 대화가
  있으면 재개 요청을 `conversation_live`로 거절한다. 인계 정산이 부르는 재개만
  예외다 — 한 세션에 프로세스가 둘 붙으면 안 된다. 다른 상태의 재개 경로는
  바꾸지 않는다.
- 결정: 일시정지 행의 대화 기동과 `paused` 재개는 Bead 단위 예약 하나를
  공유한다. 기동은 창을 띄우기 전에 예약을 잡아 대화 레코드를 저장할 때까지
  쥐고, 재개는 attempt를 실행 상태로 바꾸기 전에 같은 예약을 잡는다. 예약이
  이미 잡혀 있으면 뒤에 온 쪽이 거절된다(재개는 `conversation_live`, 기동은
  기존 진행 중 거절). 레코드가 저장되기 전의 틈에 두 경로가 함께 통과하지 않게
  하기 위해서다.
- 지시 재시작처럼 곧 재개되는 일시정지에서 눌린 클릭은 러너 생존 가드나 위
  거절 중 하나로 끝나 한쪽만 선다.
- 휴대폰에서는 대화 타일의 `↗ Discord`로 스레드에 들어가 답한다. 링크는 다른
  대화 행과 같은 브리지 경로로 붙는다.

### 3.4 끝맺음

확인 필요 행의 정산 규칙을 그대로 쓰고 재개 대상에 `paused`를 더한다.

- `워커가 이어감 ·` 결과 줄, 또는 답 대기 중 `▶ 재개`: 창이 사라진 것을 확인한
  pass가 그 attempt를 같은 세션으로 재개한다. 재개는 일시정지 재개의 기존
  admission·실행 설정 규칙을 따르고 `## 대화 결과` 블록을 싣는다. 한 번 규칙은
  확인 필요와 같다(자식 attempt가 있으면 소진).
- `이 대화에서 마무리 ·`: 창을 두고 Worker는 관찰만 한다. 세션 버튼은 숨는다.
  확인 필요 행과 같은 조건(Bead가 `open`)으로 되돌리기가 허용되면 `▶ 재개`가 그
  되돌리기이고, 아니면 `▶ 재개`는 비활성이다.
- `나중에 ·` 또는 결과 줄 없이 창이 사라짐: 타일은 일시정지 그대로 남고
  `[세션에서 이어가기]`와 `▶ 재개`가 다시 선다. 이후의 `▶ 재개`는 대화에서 쌓인
  턴을 포함한 같은 세션을 잇는다.
- 마무리 세션이 Bead를 끝내면 일시정지 타일의 자리는 파킹 attempt가 같은
  상황에서 풀리는 방식으로 풀린다. 기존 경로가 `paused`를 다루지 않으면 같은
  경로에 넣는다.
- 인계가 실행 전에 거절되면 이유를 카드(`이어가기 거절: <사유>`)와 타임라인에
  남기고 타일은 일시정지 그대로다.

### 3.5 dotfiles 진입 블록 (크로스 리포 unit)

정본은 dotfiles `execution-common.md` `## Worker 세션 대화`이고 beads-ui는 그
바이트 사본과 sha256 시험만 갱신한다. dotfiles 쪽이 바꾸는 것은 다음이다.

- 결정: `대화 사유` 값에 `멈춤 paused`를 더한다.
- `상황` 채움 규칙에 일시정지 문장을 더한다.
- 결정: `멈춤 paused` 대화는 자가 수리와 질문 단계를 건너뛴다. 멈춘 지점과 남은
  일을 요약하고 사용자의 지시를 기다린 뒤, 지시에 따라 구현 워크트리 안의
  수정·로컬 검증을 이 대화에서 계속한다. 지시 하나를 결정으로 보아 `워커가
  이어감`으로 닫지 않는다. 결과 줄은 사용자가 Worker로 넘기라고 할 때 `워커가
  이어감`, 여기서 끝까지 가라고 할 때 `이 대화에서 마무리`, 나중에 보겠다고 할
  때 `나중에`다 — 사용자 결정(대화하며 계속 작업).
- 마무리 전 금지 목록(push·PR·Bead 상태 변경 등)은 그대로다.
- 같은 뜻을 싣는 dotfiles 안의 다른 자리(절 머리말의 대화 종류 설명, 계약
  문단, 상태 어휘)의 열거와 갱신은 dotfiles unit이 소유한다. 일시정지 대화는
  사람 클릭으로만 열린다.

### 3.6 문서

- 카드 문법 스펙 §5.1에 정정(UI-6kj0)을 더한다: 일시정지 타일의 슬롯 6에
  `[세션에서 이어가기]`, 슬롯 3에 대화 진행 줄.
- 조작 표면 스펙 §3.2의 `▶ 재개` 행에 정정(UI-6kj0)을 더한다: 대화가 살아
  있을 때의 인계 동작과 비활성 상태.
- `app/protocol.md`에 일시정지 행과 새 거절 사유를 적는다.

## 4. 수용 기준

1. 사용자가 멈춘 Worker attempt 타일은 Worker 탭과 모니터에서 foot에
   `[세션에서 이어가기]`를 보이고, 공급자 보류·세션 레인·내려온 attempt·PR 대기
   행에는 이 변경으로 생기는 버튼이 없다.
2. 클릭하면 그 attempt의 세션이 사람의 tmux 세션에서 열리고 첫 입력의 `대화
   사유`가 `멈춤 paused`다. 일시정지만으로는 대화도 알림도 생기지 않는다.
3. 대화가 살아 있거나 기동 중인 동안 `paused` 재개 요청은 `conversation_live`로
   거절되고, 재개가 진행 중이면 대화 기동이 거절되어, 한 세션 ID에 러너
   프로세스가 둘 붙지 않는다.
4. 답 대기 중 `▶ 재개` 또는 `워커가 이어감 ·` 뒤 Worker가 같은 세션으로 한 번
   재개하고, 재개 프롬프트에 `## 대화 결과` 블록이 있다.
5. `나중에 ·`나 결과 줄 없는 창 닫힘 뒤 타일은 일시정지 그대로이고 두 버튼이
   다시 선다.
6. 진입 블록 사본의 sha256이 dotfiles 착지 커밋의 블록과 같다.
7. 브리지가 살아 있으면 클릭으로 연 일시정지 대화의 타일에 `↗ Discord`(링크
   전에는 준비 중)가 서고, 그 스레드의 답으로 대화가 이어진다.
8. `이 대화에서 마무리 ·` 뒤 세션이 Bead를 끝내면 일시정지 타일이 실행 중 칸의
   자리를 계속 쥐지 않는다.
9. 390px 폭에서 일시정지 타일(대화 없음, 대화 중)의 조작이 타일 밖으로 넘치지
   않는다 — `docs/design-system.md`의 폭 넘침 탐침과 화면 캡처로 확인한다.
10. 카드 동일성 시험이 일시정지 타일의 두 탭 차이를 잡지 않는다.

## 5. Test scope

- `app/views/worker/tile-resolve.test.js` — 일시정지 행의 버튼 유무(대상·비대상
  넷), 행 순서, 대화 없음·답 대기·턴 진행·마무리 네 상태의 `▶ 재개` 재료.
- `app/views/worker/running-grid` 시험 — foot의 세션 버튼, `▶ 재개`의 세 상태,
  대화 진행 줄.
- `app/views/monitor/card-parity.test.js` — 대화 없는 일시정지 fixture에서 두
  탭의 슬롯 6에 세션 버튼이 있음을 먼저 확인한 뒤 타일 동일성을 비교한다.
- `app/views/worker/index.test.js`, `app/views/monitor/index.test.js` — 대화가
  답을 기다릴 때 `▶ 재개` 클릭이 대화상자 없이 대화 인계를 보낸다.
- `server/ws/worker-handlers.resolve-session.test.js` — 일시정지 행 라우팅과
  비대상 거절.
- `server/worker/direction-inquiry.test.js` — 일시정지 기동의 첫 입력과 레코드,
  사본 sha256.
- 경합 시험 — 대화 기동이 레코드를 저장하기 전에 들어온 재개가 거절되고,
  재개가 진행 중일 때 들어온 대화 기동이 거절된다(양방향).
- scheduler 시험 — 인계가 `paused` attempt를 재개, 대화 중 `paused` 재개 거절,
  결과 줄 없는 종료 뒤 일시정지 유지, 마무리 세션이 Bead를 끝낸 뒤 자리 해제.
- `server/worker/wait-judgment.test.js` — 일시정지 행의 대화 인계 조작 투영.

## 6. 경계·후속

- 크로스 리포 unit: dotfiles — §3.5의 진입 블록 변경과 그 시험. beads-ui 구현
  진입 전에 착지해야 하는 선행이다. 처분은 dotfiles rig의 quick_fix Bead이고
  (그 Bead의 ADR 절이 `ADR dotfiles/dotfiles-724yw`를 supersede 대상으로
  지명한다) 이 스펙의 게이트를 닫는
  세션이 만들며, `UI-6kj0`에서 foreign `blocks` 엣지를 건다.
- 관찰: 내려온 일시정지 attempt의 후보 카드 — 실행 중 자리가 없고 사용자 요청
  범위 밖이라 다루지 않는다.
- 관찰: 재개 대화상자의 지시 입력을 대화 인계에 싣는 일 — 대화 중에는 지시를
  대화에서 주므로 다루지 않는다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — workflow 계약 표면은 dotfiles가 정의하고 beads-ui는
  소비한다. 진입 블록을 dotfiles에서 먼저 바꾸는 근거다.
- 전제: ADR UI-gmww — 승계 조항 중 짝의 유무는 `tileResolveFields` 하나가
  정한다, 세 런처가 진입 블록 바이트 사본을 쓰고 sha256을 고정한다, 인계 실행은
  많아야 한 번이다를 그대로 따른다.
- `[세션에서 이어가기]`가 서는 행에 일시정지(사용자가 멈춘 Worker attempt)를
  더한다. 문의 런처가 같은 세션 대화로 열고, 자동 기동과 알림은 없으며, 그 행의
  Worker 출구는 `▶ 재개`다.
  - 되돌리기 어려움: `tile-resolve.js` 술어, `worker-handlers.js` 클릭 라우팅,
    `direction-inquiry.js` 런처와 진입 블록 사본·다이제스트 시험,
    `scheduler.js` 인계 정산과 재개 거절, `wait-judgment.js` 조작 투영, dotfiles
    진입 블록이 함께 움직인다.
  - 맥락 없이 놀라움: 같은 `▶ 재개`가 대화가 살아 있으면 대화상자 없이 창을
    닫고 인계를 보낸다. 질문이 없는 멈춤에도 대화가 열린다.
  - 실제 절충:
    - 얻는 것: 멈춘 작업을 사람이 대화하며 이어 갈 수 있다.
    - 감수하는 것: 대화 대상 목록이 사람 판단 멈춤 밖으로 넓어지고, 대화 중
      재개를 막는 가드가 하나 늘어난다.
    - 대안 둘과 기각 이유:
      - `▶ 재개`의 지시 입력만 둔다: 지시 한 번 뒤 무인 실행이라 대화하며 작업할
        수 없다.
      - 일시정지 전용 대화 종류와 런처를 새로 만든다: 끝맺음·정산 규칙이
        종류마다 갈린다.
  - ADR UI-gmww를 supersede한다. 소비자 집합(`tile-resolve` 술어, 클릭 라우팅,
    문의 런처, 인계 정산)을 공유하며, 그 결정의 "서는 행은 셋" 조항에 일시정지를
    더하고 나머지는 승계한다.
  - `summary`: "[세션에서 이어가기]가 서는 행에 사용자가 멈춘 Worker attempt의 일시정지 타일을 더해 문의 런처가 같은 세션 대화로 열고, 자동 기동·알림 없이 클릭으로만 열리며, 그 행의 Worker 출구는 ▶ 재개이고 대화가 살아 있는 동안의 재개는 답 대기 중 대화 인계로만 간다 — 나머지 조항은 UI-gmww 그대로다" → ADR, supersede UI-gmww
- 세션 버튼은 슬롯 6에 홀로 서고 `▶ 재개`는 슬롯 1에 남는다 — UI 배치·라벨(기본 제외 목록) → ADR 아님
