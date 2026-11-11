---
scope:
  - server/worker/direction-inquiry.js
  - server/worker/interactive-progress.js
  - server/worker/scheduler.js
  - server/worker/notify.js
  - server/worker/external-wait/session-resume.js
  - app/views/worker/lanes.js
  - app/views/worker/tile-resolve.js
---

# Worker 대화 결과 줄 새 단어를 읽고, 마무리로 끝난 행을 Worker로 되돌릴 길을 연다 (UI-3713)

## 1. 목표

형제 dotfiles-xipsh(계약 정본, `docs/superpowers/specs/2026-11-11-worker-conversation-result-words-design.md`)가 Worker
세션 대화의 결과 줄을 바꾼다: `인계`→`워커가 이어감`, `인수`→`이 대화에서 마무리`, `보류`→`나중에`이고 옛 줄은 같은 뜻으로
계속 읽는다. `이 대화에서 마무리`로 끝난 행도 Bead가 `open`인 동안은 결과 줄이나 `[워커로 이어가기]`로 Worker에 되돌릴 수
있다. beads-ui는 그 계약의 소비자다(ADR UI-jlov).

지금 beads-ui는 takeover(인수)로 한 번 기록된 대화를 Worker로 돌릴 길이 없다. 2026-11-11 dotfiles-8t7o0에서 대화가
`인수 · …구현은 Worker 대기열이 다시 이어받습니다`로 끝났다. 세션은 Worker가 잇는다고 믿고 멈췄고, 카드는 이어가기 짝을
숨겼다. 사용자가 세션에 `인계 ·` 줄을 쓰게 했지만 서버가 읽지 않았다. 이 설계는 그 막다른 길을 없애고 화면의 단어를
계약 단어에 맞춘다.

## 2. 검증된 전제

기준 커밋: beads-ui `0e9689f26d07de2dbb287383234bffc2d448f510`, dotfiles `91e2afde9d6021f0e5b8f70a9b81025710adfc8c`.

- 진입 블록은 dotfiles 바이트 사본이고 sha256 digest를 테스트가 고정한다 — server/worker/direction-inquiry.js:77-96, server/worker/direction-inquiry.test.js:27, :336-341
- 파서는 첫 줄 접두 `인계 ·`·`인수 ·`·`보류 ·`만 handoff·takeover·hold로 읽는다 — server/worker/interactive-progress.js:24-48
- 결과가 한 번 기록된 대화는 뒤 메시지를 읽지 않는다 — server/worker/scheduler.js:12356-12365
- takeover 결과는 알림만 보내고 창을 닫지 않으며, 창이 사라지면 `ended_by='takeover'`로 정산한다 — server/worker/scheduler.js:12324-12330, :12436-12437, :12465-12466
- `[워커로 이어가기]`는 결과 없는 live 대화(`conversationAwaitsAnswer`)나 `ended_by='pane_gone'`인 닫힌 대화만 받는다 — server/worker/scheduler.js:11257-11265, :11510-11572
- 핸드오프의 이어가기는 `continueConversationHandoff` 하나다. 해제가 이미 쓰인 stale 파킹은 해제 전이 재디스패치, 그 밖은 같은 세션 재개다 — server/worker/scheduler.js:11380-11497
- 해제 전이 감시는 열린 대화가 있는 Bead를 건너뛴다 — server/worker/scheduler.js:21300-21310
- 카드는 대화 뷰의 takeover 결과가 있으면 이어가기 짝을 숨긴다. 버튼 유무는 `tileResolveFields` 하나가 정한다 — app/views/worker/tile-resolve.js:109-117, :364
- 카드의 대화 뷰에는 Bead 상태가 없다. 같은 파일의 `takeover`(:311-321)는 외부 잡 `takeover_unresolved`이고 대화 인수와 다르다 — app/views/worker/tile-resolve.js:309-321, server/worker/wait-judgment.js:740-742
- 배지 꼬리 `사람 인수`, 알림 제목 `🙋 사람 인수` — app/views/worker/lanes.js:1866-1867, server/worker/notify.js:96-100
- 툴팁·타임라인·버튼 줄 문구가 `인계`를 쓴다 — app/views/worker/tile-resolve.js:179-200, :299, :392, server/worker/scheduler.js:11236, :11417, :11547
- 외부 작업 완료 재개 프롬프트가 `인수`를 인용한다 — server/worker/external-wait/session-resume.js:46-54
- Bead 상태는 `deps.bd.readStatus`로 읽는다 — server/worker/scheduler.js:8647
- ADR UI-32oq-2가 결과 줄 세 접두의 처리와 대화 알림 셋(`🙋 확인 필요`·`↪ Worker가 이어감`·`🙋 사람 인수`)을 고정한다 — docs/adr/UI-32oq-2-settings-one-window-target-and-server-tabs.md:537-542

## 3. 설계

### 3.1 진입 블록과 파서

- 진입 블록 사본을 dotfiles-xipsh가 착지한 바이트로 바꾸고 digest 상수를 갱신한다.
- 파서는 새 접두 셋과 옛 접두 셋을 같은 kind로 읽는다: `워커가 이어감 ·`·`인계 ·`→handoff, `이 대화에서 마무리 ·`·`인수 ·`→
  takeover, `나중에 ·`·`보류 ·`→hold. 내부 kind 이름은 바꾸지 않는다.
- 결정: 옛 접두는 지울 날짜 없이 계속 읽는다 (이유: 이미 열린 대화와 옛 전사가 옛 블록을 따른다. dotfiles 결정과 같다).

### 3.2 마무리 뒤 결과 줄로 되돌리기

- takeover 결과가 있고 핸드오프 예약이 없는 live 대화는 계속 새 assistant 메시지를 읽는다. 다른 결과는 지금처럼 더
  읽지 않는다.
- 새 메시지의 첫 줄이 handoff 접두이고 그 Bead 상태가 `open`이면, 처음부터 handoff로 끝난 대화와 같은 기록을 한다:
  결과를 handoff로 바꾸고, `source: 'result_line'` 예약을 걸고, 타임라인에 `대화 결과 · <줄>`을 남기고, 창을 닫는다. 그
  뒤는 지금의 `continueConversationHandoff` 그대로다.
- Bead가 `open`이 아니거나(`in_progress`·`resolved`·`closed`) 상태를 읽지 못하면 그 메시지는 처리한 것으로만 표시하고 행을
  바꾸지 않는다. 읽기 실패는 다음 pass가 다시 묻지 않는다(fail-quiet: 사람이 3.3의 버튼을 누를 수 있다).
- takeover 뒤 hold·takeover 줄은 상태를 바꾸지 않는다.

### 3.3 마무리 행의 `[워커로 이어가기]`

- 서버는 takeover로 끝난 대화(live든 닫혔든)의 투영에 되돌리기 가능 여부 한 값(예: `handback_allowed`)을 싣는다. 그
  값은 Bead 상태가 `open`일 때만 참이고, 상태를 읽지 못하면 거짓이다. `tileResolveFields`는 그 값이 참이면
  `[워커로 이어가기]`를 보이고, 거짓이면 지금처럼 숨긴다. 렌더러는 Bead 상태를 다시 판정하지 않는다.
- 클릭은 `conversationHandoff`로 간다. 서버는 Bead 상태를 다시 읽어 `open`일 때만 받는다.
  - live 대화가 takeover 결과를 가진 경우: `button` 핸드오프를 예약하고 창을 닫는다(결과 없는 live 대화와 같은 길).
  - 창이 이미 닫혀 `ended_by='takeover'`인 경우: `pane_gone`과 같이 `continueConversationHandoff`를 바로 부른다.
  - Bead가 `open`이 아니면 `not_open` 사유로 거절하고 카드에 그 사유를 보인다.
- 결정: 버튼 노출은 Bead `open` 하나로 정한다 (대안: 대화 idle 경과 시간; 이유: 계약이 클레임 여부를 되돌리기 신호로
  정했다. 시간으로는 생각 중인 사람과 버려진 행을 가르지 못한다).
- 결정: 새 슬롯을 만들지 않는다. 기존 `[워커로 이어가기]` 자리를 쓴다(ADR UI-32oq-2의 카드 슬롯 규칙, 슬롯 표 변경 없음).
- 모니터는 같은 `tileResolveFields`를 쓰므로 두 탭이 같은 버튼을 갖는다.

### 3.4 사람이 읽는 단어

결과 줄을 가리키는 `인계`·`인수`·`보류`를 새 말로 바꾼다. 결과 줄과 상관없는 같은 글자(예: 저장소 작업 설정의 "재시작
후 작업 인계", 머지 게이트 보류)는 그대로 둔다.

| 자리 | 지금 | 새 문구 (예) |
| --- | --- | --- |
| 배지 꼬리 | `사람 인수` | `대화에서 마무리 중` |
| 알림 제목 | `🙋 사람 인수` | `🙋 대화에서 마무리` |
| 툴팁 | `인계하면 Worker가 …` | `Worker로 넘기면 Worker가 …` |
| 요청 중 배지 | `인계 요청 중` | `Worker로 넘기는 중` |
| 버튼 결과 줄·타임라인 | `대화 인계 예약`·`대화 인계 거절`·`[워커로 이어가기]로 인계` | `Worker로 넘김 예약`·`Worker로 넘김 거절`·`[워커로 이어가기]로 넘김` |
| 외부 작업 완료 재개 프롬프트 | `` `인수` 뒤 `` | `` `이 대화에서 마무리` 뒤 `` |

`↪ Worker가 이어감` 알림은 이미 새 말과 맞아 그대로다.

### 3.5 순서

dotfiles-xipsh가 먼저 착지한다(`blocks`). 그 전까지 beads-ui는 옛 블록과 옛 접두로 그대로 돈다. 이 Bead는 착지한 dotfiles
블록 바이트를 복사한다.

## 4. 수용 기준

1. digest 테스트가 dotfiles-xipsh 착지 바이트와 같은 값으로 통과한다.
2. 새 접두 셋과 옛 접두 셋이 각각 같은 kind로 파싱된다.
3. takeover로 기록된 live 대화가 Bead `open`일 때 뒤 메시지의 `워커가 이어감 ·`(또는 `인계 ·`)로 handoff가 예약되고
   `continueConversationHandoff`가 돈다. Bead가 `in_progress`면 아무것도 바뀌지 않는다.
4. takeover 행의 카드가 Bead `open`일 때 `[워커로 이어가기]`를 보이고, `in_progress`일 때 보이지 않는다. 모니터도 같다.
5. 버튼 클릭이 live takeover 대화에서는 예약 후 창 닫기, 닫힌 takeover 대화에서는 바로 이어가기로 가고, Bead가 `open`이
   아니면 `not_open`으로 거절된다.
6. 3.4 표의 자리에 옛 단어가 남지 않는다.

## 5. 테스트 범위 (Test scope)

- `server/worker/interactive-progress.test.js`: 새·옛 접두 여섯 사례의 kind.
- `server/worker/direction-inquiry.test.js`: digest 고정값.
- `server/worker/scheduler` 대화 테스트: takeover 뒤 handoff 줄 처리(Bead `open`/`in_progress`), 버튼 핸드오프의 live·닫힌
  takeover 두 길과 `not_open` 거절.
- `app/views/worker/tile-resolve.test.js`: takeover 행 버튼 노출 술어. 카드 동일성 테스트가 모니터를 잡는다.
- 문구 테스트: 배지 꼬리·알림 제목·툴팁 기대 문자열 갱신.
- 검증: `npm run tsc`, `npm run lint`, `npx vitest run --reporter=dot`.

## 6. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 저장소가 다른 계약 정본 — 결과 줄 단어·질문 규칙·마무리 뒤 되돌리기·가드 | 없음 | dotfiles-xipsh |

- 관찰: 해제 전이 감시(onIssuesChanged)가 takeover 창이 닫힌 stale 파킹을 다시 디스패치한다 — 3.3 버튼과 같은 결과라
  지금은 그대로 둔다. 계약상 Bead `open`이면 되돌리기가 허용된다

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — 결과 줄 단어·되돌리기 규칙의 정본은 dotfiles 계약이고 beads-ui는 읽어서 표시한다. 계약 키가 없으면
  표시를 생략한다.
- beads-ui는 결과 줄 새 접두(`워커가 이어감`·`이 대화에서 마무리`·`나중에`)와 옛 접두를 같은 kind로 읽고, takeover로 끝난
  행도 Bead가 `open`이면 뒤 메시지의 handoff 줄이나 `[워커로 이어가기]`로 Worker에 넘기며, 대화 알림 셋째는
  `🙋 대화에서 마무리`다.
  - 되돌리기 어려움: 파서, 스케줄러 대화 처리·버튼 핸드오프, `tileResolveFields`, 알림 제목, 모니터 카드 동일성 테스트가
    함께 움직인다.
  - 맥락 없이는 의외: "사람 인수" 뒤에도 카드에 `[워커로 이어가기]`가 다시 선다.
  - 실제 절충: 마무리한 사람이 클레임하기 전에는 Worker가 행을 가져갈 수 있다. 기각한 대안은 3.1·3.3의 `결정` 줄에 있다.
  - `summary`: "Worker 대화 결과 줄은 새 접두(워커가 이어감·이 대화에서 마무리·나중에)와 옛 접두를 같은 kind로 읽고, takeover로 끝난 행도 Bead가 open이면 뒤 메시지의 handoff 줄이나 [워커로 이어가기]로 Worker에 넘기며, 대화 알림은 🙋 확인 필요·↪ Worker가 이어감·🙋 대화에서 마무리 셋이다 — 나머지 조항은 UI-32oq-2 그대로다"
  → ADR, supersede UI-32oq-2
- 툴팁·타임라인 문구 교체 — 문구는 되돌리기 쉽다 → ADR 아님
