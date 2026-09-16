---
scope:
  - app/utils/resume-instructions-dialog.js
  - app/utils/resume-instructions-dialog.test.js
  - app/utils/resume-flow.js
  - app/utils/resume-flow.test.js
  - app/views/worker/running-grid.js
  - app/views/worker/running-grid.test.js
  - app/views/worker/index.js
  - app/views/worker/index.test.js
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
  - app/views/monitor/index.js
  - app/views/monitor/index.test.js
  - app/styles.css
  - app/protocol.md
  - server/ws/worker-handlers.js
  - server/ws.worker-queue.test.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-19-resume-user-instructions-design.md
  - docs/adr/
---

# 재개 조작 단일화 — 타일에는 ⏸와 ▶ 재개만 두고 지시는 재개 다이얼로그의 한 갈래로 받는다

## 문서 상태

- Bead: `UI-6icf`
- 경로: `spec_backed`; beads-ui 안에서 하나의 구현·검증·인도 묶음으로 처리한다.
- 기준: `main` / `aa4107ac2d2d0bb5b8777c52073f8f953ecbd772`
- 상태: 사용자 검토용 완성 초안. 스펙 게이트 승인 전이다.
- 사용자 결정(2026-09-16): (1) `지시 입력 후 재개`는 `바로 재개`와 같은 재개
  정책(`auto`)을 쓰고 차이는 지침 유무뿐이다. (2) 두 갈래 다이얼로그는 지시
  다이얼로그를 쓰는 모든 재개(일시정지 타일·실패 타일·모니터)에 적용한다.

## 1. 문제와 확인한 사실

실행 타일에는 `지시와 함께 재시작`과 `⏸`, 일시정지 타일에는 `지시와 함께 이어하기`와
`▶ 재개`가 나란히 서 있다(`app/views/worker/running-grid.js`
`instructions_restart_button`·`instructions_resume_button`). 긴 라벨 둘이 슬롯 1
조작 묶음의 절반을 차지해 타일이 투박하고, 사용자는 "일시정지 뒤 다시 시작할 때
지시를 넣을 수 있으면 된다"고 판단했다.

확인한 사실은 다음과 같다.

- `▶ 재개`(`app/utils/resume-flow.js` `runResumeFlow`)는 이미
  `requestResumeInstructions`를 열어 선택 지침을 받는다. 비워 두면 지침 없이
  같은 `worker-attempt-resume`을 보낸다. 지침 입력 기능 자체는 중복이다.
- 두 긴 버튼의 남은 차이는 UI-qce9(ADR 0045)의 정책이다: 지침을 필수로 받고
  `continuation=prior_attempt`로 기록된 세션·모델·effort·speed·계정을 그대로
  잇는다. `▶ 재개`는 `auto`로 보내 현재 설정을 적용할 수 있고 기록이 없으면
  `continuation_mismatch` 대화(`app/utils/continuation-dialog.js`)로 새 세션
  대체를 묻는다.
- `지시와 함께 재시작`은 `worker-attempt-pause`(`require_durable: true`) 뒤
  `worker-attempt-resume`(`prior_attempt`)을 한 다이얼로그에서 묶는 두 요청
  흐름(`runRestartWithInstructionsFlow`)이다. 서버는 이 자격을
  `instructions_restart: { eligible, reason }`로 스냅샷의 running·paused
  attempt마다 투영한다(`server/ws/worker-handlers.js`
  `attemptsWithInstructionsRestart`).
- Worker 탭과 Monitor 탭은 같은 `runningTile` 렌더러와 같은 흐름 모듈을 쓴다(ADR
  0014). 대기 행의 `▶ 재개`(`worker-mini__hold-resume`, 큐 정지 해제)와 상세
  세션 이력의 `⧉ 재개`(명령 복사)는 이름만 같은 다른 조작이며 이 설계의 대상이
  아니다.

## 2. 검토한 접근과 선택

1. **타일의 긴 버튼 둘을 없애고 `▶ 재개` 다이얼로그를 `[바로 이어하기]`·
   `[지시 입력 후 이어하기]` 두 갈래로 재구성한다**를 선택한다. 조작 수가 줄고,
   이미 있는 공유 다이얼로그(`.op-dialog` 토큰) 하나만 바꾼다. 실행 중 세션에
   지시를 넣는 일은 `⏸` 뒤 `▶ 재개`의 두 단계가 된다.
2. 타일에 분할 버튼(`▶ 재개 | ✎`)을 두는 안은 다이얼로그를 건너뛸 수 있지만
   슬롯 1 조작 묶음의 폭을 다시 늘리고 좁은 화면에서 두 조작이 붙어 오조작을
   부른다.
3. 라벨만 줄이고 버튼 넷을 유지하는 안은 같은 기능이 두 버튼으로 남는 원인을
   그대로 둔다.

선택 1은 사용자 결정 (1)에 따라 두 갈래가 같은 재개 정책을 쓴다. 따라서
`prior_attempt`의 UI 진입점은 사라진다.

## 3. 조작 표면

- 실행 타일(일반 구현 세션): `▤ 세션` · `⏸` · 폐기 계열. `지시와 함께 재시작`을
  제거한다. `⏸`의 표시 조건·툴팁·`can_pause` 판정은 바꾸지 않는다.
- 일시정지 타일: `▤ 세션` · `▶ 재개` · 폐기 계열. `지시와 함께 이어하기`를
  제거한다. `▶ 재개`의 툴팁은 "같은 세션으로 이어서 재개 — 바로 재개하거나 지시를
  입력할 수 있음"으로 바꾼다.
- 실패 타일·`provider_hold` 타일의 `↻ 이어하기`·`↻ 정리 재시도`·`⋯ 다른 방법으로`,
  대기 행의 `▶ 재개`·`[지금 시작]`, 상세 세션 이력의 버튼은 자리와 동작을 바꾸지
  않는다. 실패 타일의 두 버튼은 §4의 다이얼로그를 그대로 공유하므로 두 갈래
  모양을 함께 얻는다.
- Monitor 탭은 같은 `runningTile`을 그리므로 같은 결과다. Monitor의
  `restartAttemptWithInstructions`와 두 클릭 분기(`rtile__restart-instructions`·
  `rtile__resume-instructions`)를 제거한다.
- 카드 문법(ADR 0014): 슬롯 1 조작 묶음에서 두 항목을 빼는 변경이며 새 슬롯·칩·
  색을 만들지 않는다. §6의 정정 문단으로 슬롯 표를 갱신한다.

## 4. 재개 다이얼로그 두 갈래

`requestResumeInstructions(context)`(`app/utils/resume-instructions-dialog.js`)의
반환 계약은 그대로다: 취소는 `null`, 바로 재개는 `''`, 지시 재개는 공백을 제거한
1~4000자 문자열. 호출부(`runResumeFlow`)는 바꾸지 않는다. `kind`는
`'session' | 'settlement'` 둘만 남기고 `'restart'`·`'resume_recorded'`와
`handlers.onSubmit`(두 요청 흐름이 거부를 다이얼로그 안으로 되돌리던 통로)을
제거한다.

상태는 둘이다.

```text
[A 선택]  세션 이어하기                          (settlement: 착지 후 정리 재시도)
          UI-xxxx · claude fable high               ← 기존 target 줄, 재료 없으면 생략
          [▶ 바로 이어하기] [✎ 지시 입력 후 이어하기] [취소]

[B 입력]  세션 이어하기
          UI-xxxx · claude fable high
          ┌ 이번 재개에 전달할 지침 ───────────────┐
          │                                          │
          └──────────────────────────────────────────┘
          [이어하기] [취소]                          ← 지침이 비어 있으면 [이어하기] 비활성
```

- A의 첫 버튼이 `.op-btn--primary`이고 초기 포커스를 받는다. 클릭은 `''`로
  resolve한다. 둘째 버튼은 `aria-expanded`를 가지며 클릭하면 B로 바뀌고
  textarea에 포커스한다. B의 확인은 `.op-btn--primary`이며 지침이 비면 비활성,
  `Ctrl/Cmd+Enter`는 확인과 같다. `Esc`와 `취소`는 두 상태 모두 `null`이다.
- 라벨은 `kind`별 한 표에서 읽는다. `session`: `세션 이어하기` / `▶ 바로 이어하기` /
  `✎ 지시 입력 후 이어하기` / `이어하기`. `settlement`: `착지 후 정리 재시도` /
  `▶ 바로 정리 재시도` / `✎ 지시 입력 후 정리 재시도` / `정리 재시도`. 실패 타일의
  `RESUME_LABELS`(`running-grid.js`)와 같은 어휘를 쓰며 서로 어긋나면 테스트가
  잡는다.
- 지침의 서버 의미는 기존 그대로다(`worker-attempt-resume`의 `instructions`,
  resume prompt 뒤에 붙는 한 문단). `settlement`가 지침을 받는 범위도 바꾸지
  않는다.
- 형태는 `.op-dialog`·`.op-btn` 토큰(2026-09-02 worker-operation-surface §3·§5.3)을
  그대로 쓰고, 이 다이얼로그 고유 규칙은 A 상태의 버튼 줄이 좁은 화면에서
  줄바꿈되는 것과 B의 textarea 크기뿐이다. 375px·1280px 두 폭과 두 테마에서
  가로 넘침이 없어야 한다.
- 재시작 전용 설명 문장("실행을 중단한 뒤 …")과 `restart`용 제목·확인 문구는
  제거한다. 거부는 기존처럼 `runResumeFlow`가 토스트로 보여 주며 다이얼로그는
  제출과 함께 닫힌다.

## 5. 흐름·프로토콜·서버

- `runResumeFlow`는 바꾸지 않는다. `runRestartWithInstructionsFlow`와 그 테스트를
  제거한다. Worker의 `restartAttemptWithInstructions`(`app/views/worker/index.js`)와
  두 클릭 분기, Monitor의 같은 함수와 분기를 제거한다.
- `lane-model.js`의 `instructions_restart` 통과(`liveAttemptFields` 근처 두 곳)와
  `LiveAttempt` 타입 필드를 제거한다. `running-grid.js`의 `RunningTile` 타입
  필드도 함께 지운다.
- 서버 스냅샷 투영 `attemptsWithInstructionsRestart`(`server/ws/worker-handlers.js`)와
  `app/protocol.md`의 `instructions_restart` 항목을 제거한다. 소비자가 없는 필드를
  매 스냅샷마다 계산하지 않기 위해서다. 옛 번들이 이 필드를 읽지 못해도 버튼이
  나타나지 않는 것이 맞다(fail-quiet).
- 결정: `worker-attempt-pause`의 `require_durable`, `worker-attempt-resume`의
  `continuation=prior_attempt`와 `continuation_choice` 기록, `server/worker/
  instructions-restart.js`의 자격 판정(스케줄러의 durable pause 경로가 쓴다)은
  바꾸지 않는다 — 제거는 `scheduler.js`·`queue-store.js`의 재개 정책과 ADR 0046의
  예외 조항까지 번지는 별개 정리이며 이번 요청(UI 단순화)의 필요조건이 아니다.
  UI 진입점이 없는 서버 정책으로 남고, 그 사실을 ADR 대체문과 `protocol.md`의
  `prior_attempt` 설명에 한 문장으로 적는다.
- 두 갈래 모두 `continuation` 없이 보내는 기존 `auto` 경로다. 기록이 없으면 기존
  `continuation_mismatch` 대화가 열리고, 지침은 `runResumeFlow`의 base payload에
  실려 재전송·충돌 재시도·`refresh`에서 보존된다(기존 규칙).

## 6. 정본 반영

- `2026-08-25-card-header-grammar-unify-design.md` §5.1 슬롯 1 조작 목록에서
  `지시와 함께 재시작`·`지시와 함께 이어하기`를 빼고 다음 정정을 덧붙인다.

  > 정정(UI-6icf). UI-qce9가 둔 `지시와 함께 재시작`·`지시와 함께 이어하기`는
  > 제거한다. 실행 타일의 세션 조작은 `⏸`, 일시정지 타일은 `▶ 재개` 하나이며
  > 지시는 재개 다이얼로그의 `지시 입력 후 이어하기` 갈래로 받는다. 실행 중
  > 세션에 지시를 넣는 일은 `⏸` 뒤 `▶ 재개`의 두 단계다.

- `2026-08-19-resume-user-instructions-design.md`의 UI-qce9 정정 문단 뒤에 다음을
  덧붙인다.

  > 정정(UI-6icf). 지시 다이얼로그는 `[바로 이어하기]`·`[지시 입력 후 이어하기]`
  > 두 갈래이며 둘 다 일반 이어하기의 auto 정책을 쓴다. 실행 중 지시 진입점과
  > prior_attempt의 UI 진입점은 제거했고 서버 계약은 남아 있다.

- `app/protocol.md`: `instructions_restart` 항목 삭제, `prior_attempt` 설명에 "UI
  진입점 없음(UI-6icf)" 한 문장 추가.
- UI-qce9 스펙 본문은 이력으로 두고 고치지 않는다. ADR 0045의 대체는 아래 후보로
  기록하고 `adr` 스킬이 마감 때 실체화한다.

## 7. 테스트 범위와 인도 조건

RED-GREEN 전용 seam은 승인하지 않는다. 아래 행위 검증과 저장소 필수 검증을
수행한다.

| 검증 경계 | 수락 조건 |
| --- | --- |
| 다이얼로그 상태 | A에서 첫 버튼 클릭은 `''`, 둘째 클릭은 B 전환·textarea 포커스·`aria-expanded=true`; B에서 빈 입력은 확인 비활성, 입력 후 확인·`Ctrl+Enter`는 trim 문자열; `Esc`·취소는 두 상태 모두 `null`; `kind` 두 값의 라벨이 표와 일치 |
| 흐름 | `runResumeFlow`가 `''`에서 `instructions` 키 없이, 문자열에서 같은 값을 첫 전송·충돌 재시도·mismatch 재전송 모두에 싣는다(기존 테스트 유지); `runRestartWithInstructionsFlow` export 부재 |
| 타일 렌더 | 실행 타일에 `rtile__restart-instructions` 없음, 일시정지 타일에 `rtile__resume-instructions` 없음, `⏸`·`▶ 재개`·`▤ 세션`·폐기는 그대로; `instructions_restart`가 실린 옛 스냅샷에도 버튼이 없음 |
| 화면 배선 | Worker·Monitor에서 `▶ 재개` 클릭이 다이얼로그를 열고 A 첫 버튼이 `worker-attempt-resume`을 `continuation`·`instructions` 없이 1회 보냄; 제거한 두 클래스 클릭은 아무 전송도 없음 |
| 투영 | `lane-model`이 `instructions_restart`를 통과시키지 않음; 서버 스냅샷에 그 필드가 없음; `prior_attempt` resume과 `require_durable` pause는 기존 서버 테스트 그대로 통과 |
| 문서 | 카드 문법 §5.1·2026-08-19 스펙·`protocol.md` 정정이 들어 있음 |

기존 테스트를 갱신한다: resume-instructions-dialog, resume-flow, running-grid,
worker/index, monitor/index, lane-model, ws.worker-queue. 인도 전 Node engines
확인, 자체 의존성 설치 후 `npm run tsc`, `npm run lint`, 변경 파일 Prettier,
`npx vitest run --reporter=dot`(120초 상한)를 수행한다. `npm run build` 뒤 실제
브라우저에서 일시정지 타일 `▶ 재개` → 바로 이어하기와 지시 입력 후 이어하기,
실패 타일 `↻ 이어하기`, Monitor 같은 타일을 375px·1280px 두 폭에서 확인한다.
구현 PR 인도와 공유 서비스 배포 확인은 저장소의 기존 절차를 따른다.

## 결정 (ADR 후보)

- 전제: ADR 0014 — Worker·Monitor는 같은 `runningTile`을 그리고 슬롯 1 조작 묶음의
  항목 제거는 슬롯 표 정정으로 기록한다.
- 전제: ADR 0046 — 두 갈래 모두 기존 `auto` 재개이며 provider 변경은 기존
  `continuation_mismatch`·`exec_override`의 명시적 선택으로만 일어난다.
- 세션 재개 조작은 `⏸`·`▶ 재개` 둘이고 지시는 재개 다이얼로그의 한 갈래다:
  되돌림 비용 있음(두 화면의 조작·흐름·서버 투영·슬롯 표), 배경 없이 의외임(ADR
  0045가 둔 실행 중 지시 재시작과 기록 고정 재개의 UI 진입점을 없앰), 실재 대안
  있음(분할 버튼·라벨 축소·두 정책 체크박스). `summary`: "세션 재개 조작은 ⏸와
  ▶ 재개 둘이며 지시는 재개 다이얼로그의 선택 갈래로 auto 정책과 함께 전달한다;
  실행 중 지시 재시작과 prior_attempt의 UI 진입점은 제거하고 durable pause·
  prior_attempt 서버 계약은 UI 진입점 없이 유지한다" → ADR, supersede 0045
- 두 갈래 다이얼로그의 상태·라벨·포커스 규칙: 되돌림 비용 낮음, 배경 없이 의외
  아님, 실재 대안 있음. 검증 가능한 UI 설계이므로 별도 ADR로 만들지
  않는다 → ADR 아님

대체 ADR에는 ADR 0045의 살아 있는 조항을 재기록한다: `require_durable` pause가
자격 검사 뒤 durable control과 부모 정산 체인 완료 후에 답하는 것,
`prior_attempt` 재개가 기록된 tuple·계정을 승계하고 `exec_override`를 거부하며
transcript 부재 시 fresh를 dispatch하지 않는 것, 자식의
`continuation_choice='prior_attempt'` 기록과 ADR 0046의 예외 조항. 실행 타일·paused
타일의 두 버튼과 paused 행의 `지시와 함께 이어하기` 진입점 조항은 이 설계로
대체한다.

## 경계·후속

다른 저장소에서 구현할 필수 작업과 별도 형제 Bead는 없다. dotfiles 계약·Worker
스케줄러의 재개 정책·`continuation_mismatch` 대화·`provider-resume-dialog`·큐 정지
해제 `▶ 재개`·카드 슬롯 자체를 바꾸지 않는다.

- 관찰: 서버 `prior_attempt`·`require_durable`·`instructions-restart.js`의 완전
  제거 — UI 진입점이 없어진 뒤에도 남는 서버 정책이지만, 스케줄러·큐 저장소·ADR
  0046까지 번지는 별개 정리이고 이번 요청의 필요조건이 아니어서 만들지 않는다.
