---
scope:
  - server/worker/notify.js
  - server/worker/scheduler.js
  - server/worker/interactive-progress.js
---

# 대화 세션의 답 대기는 세션 Discord 스레드에서만 알린다 (UI-5chz)

## 1. 배경과 목표

2026-10-16 사용자 보고: Worker 대화 세션(Cortex-ppg 충돌 해소 대화)이 턴을 끝낼 때마다 같은 내용이 두 곳에 왔다.
- 세션 Discord 스레드 `🙋 Worker 대화 · <id>`: dotfiles Discord 브리지가 그 세션의 질문 카드와 턴 종료를 올린다.
- `#beads-worker` 채널: beads-ui 서버가 같은 마지막 메시지 발췌를 `❓ 답 대기 — <id>` / `<발췌>` / `답: Discord 스레드 · tmux <window>`로 다시 보낸다.

사용자 결정(2026-10-16): 질문은 세션 스레드에만 뜨면 된다. 채널 푸시를 없앤다. 같은 원칙을 아직 구현 전인 UI-lbm5(세션 레인)의 `🙋 확인 필요 · 세션 답 대기`에도 적용한다.

목표:
- 대화 단계의 답 대기는 beads-ui가 Discord로 보내지 않는다. 세션 스레드가 유일한 알림 경로다.
- 답 대기 판정(verdict `action_required`), 카드 배지 `답 대기`, `[세션에서 이어가기]`, 결과 줄 처리는 그대로 둔다.

함께 보고된 "질문 카드 바로 뒤 `응답 완료`" 표시는 Codex 알림 판정기 결함이다. dotfiles-g01d3이 따로 고치며 이 스펙의 범위가 아니다.

## 2. 검증된 전제

기준 base: `2358c5c0a6c020ab71cbd963df1b2e46db885da5`.

- reconcile은 결과 줄이 아닌 새 assistant 메시지를 처리할 때마다 `conversationAnswer`를 부른다. 같은 처리에서 `processed_message_at`·`message_excerpt`를 레코드에 쓴다 — server/worker/scheduler.js:10641-10647, server/worker/scheduler.js:10700-10705
- notifier의 `conversationAnswer`가 `❓ 답 대기` 세 줄을 만든다 — server/worker/notify.js:94, server/worker/notify.js:670-681
- 대화 알림 네 종류(`🙋 확인 필요`·`❓ 답 대기`·`↪ Worker가 이어감`·`🙋 사람 인수`)와 "같은 멈춤의 재알림은 `❓`가 맡는다"는 현행 ADR UI-gske가 UI-nuwy에서 승계한 조항이다 — docs/adr/UI-gske-session-inquiry-row-and-failure-auto-launch.md:175, :247, :293-296, :384-396
- dotfiles 브리지는 세 대화 레코드 종류(문의·해결·외부 재개)의 pane 마커를 읽어 세션 스레드 이름을 `🙋 Worker 대화 · <id>`로 단다. 그 스레드에 질문·턴 종료 이벤트가 올라간다 — dotfiles src/claude/scripts/discord-bridge/bridge.py:692-700, :533
- 브리지에 spool하지 못하면 훅이 `discord` 명령으로 질문·턴 종료를 직접 보낸다 — dotfiles(1540954a) src/claude/hooks/stop-hook.sh:390-395, :435-439, src/codex/hooks/codex-notifier-service.py:2378-2379
- 서버는 브리지 스레드 목록으로 레코드에 `discord_url`을 붙인다. 카드는 링크가 없을 때만 `[세션에서 이어가기]`(창 포커스)를 세운다 — server/worker/attach.js:1661-1663, server/ws/worker-handlers.js:3402, app/views/worker/tile-resolve.js:37-45
- 답 대기 verdict의 해결 문장은 `답 대기 — Discord 스레드 또는 tmux 창에서 답`이다 — server/worker/wait-judgment.js:328
- `message_excerpt`는 공개 프로토콜 필드다. UI-lbm5는 세션 레인 타일에 답 대기 발췌를 그릴 예정이다 — app/protocol.md:518, docs/superpowers/specs/2026-10-16-worker-queue-session-lane-design.md:167
- UI-lbm5 스펙은 답 대기에 들어갈 때마다 `🙋 확인 필요 · 세션 답 대기`를 한 번 보내기로 정했다. 이 스펙도 ADR UI-gske를 supersede한다. 리뷰는 끝났고 구현은 아직이다 — docs/superpowers/specs/2026-10-16-worker-queue-session-lane-design.md:140, :242; `bd show UI-lbm5 --json`(status `open`, `spec_review` 있음, `impl_entry` 없음)

## 3. 설계

### 3.1 서버 동작

- 결정: 대화 레코드가 결과 줄이 아닌 새 assistant 메시지를 처리해도 Discord 푸시를 보내지 않는다.
  - 처리 자체(처리 식별자 `processed_message_at`, 발췌 `message_excerpt` 기록, verdict 재판정)는 그대로다.
  - 결과 줄 `인계 ·`·`인수 ·`·`보류 ·`의 처리와 그 알림(`🙋 사람 인수`, 인계 뒤 `↪ Worker가 이어감`)은 그대로다.
- notifier에서 답 대기 푸시 경로를 지운다. 예: `conversationAnswer` 메서드, `CONVERSATION_TITLE.answer`, `ConversationAnswerInput` typedef, scheduler의 `notifyLifecycle('conversationAnswer', …)` 호출과 이벤트 이름 목록의 항목.
- 결정: `message_excerpt`는 계속 기록한다. 이유: 공개 프로토콜 모양을 바꾸지 않는다. UI-lbm5의 타일 발췌가 이 값을 읽을 예정이다. 발췌 길이 상수의 주석은 알림 대신 표시용 발췌로 고친다(server/worker/interactive-progress.js:14).

### 3.2 남는 대화 알림

| 종류 | 언제 | 바뀜 |
| --- | --- | --- |
| `🙋 확인 필요` | 대화 대상 멈춤 기록 직후 1회 | 그대로 |
| `↪ Worker가 이어감` | 인계 재개 launch 성공 | 그대로 |
| `🙋 사람 인수` | `인수` 관측 | 그대로 |

- 같은 멈춤의 재알림은 세션 Discord 스레드(dotfiles 브리지)가 맡는다. 브리지가 꺼져 있으면 dotfiles 훅이 `discord` 명령으로 직접 보내는 대체 경로가 있다. 이 경로의 소유자는 dotfiles다.
- `🙋 확인 필요`는 처음 멈출 때 채널로 한 번 알리는 신호다. 스레드가 아직 없을 수 있어 남긴다.

### 3.3 카드와 판정

- 바꾸지 않는다: verdict 표, 배지 꼬리 `답 대기`, `[세션에서 이어가기]`(Discord 링크가 없을 때), `[워커로 이어가기]`, 해결 문장.

### 3.4 UI-lbm5와의 관계

- 결정: 세션 레인의 답 대기도 Discord 채널로 보내지 않는다.
  - UI-lbm5 스펙의 §4.4 알림 줄과 수용 기준 5는 이 스펙과 같은 커밋 흐름에서 정정·게시했다(`🙋 확인 필요 · 세션 답 대기` 삭제, 답 대기에서 Discord 푸시 없음). 그래서 두 스펙은 같은 원칙을 말한다.
  - UI-lbm5 notes에 `rereview: intent_conflict — UI-5chz: 세션 레인 답 대기 채널 알림 제거(스펙 정정 게시됨)` 한 줄을 남긴다. 정정된 스펙의 재리뷰는 UI-lbm5의 staleness 재리뷰가 맡는다.
- 두 스펙 모두 ADR UI-gske를 supersede한다. 나중에 착지하는 쪽이 먼저 착지한 쪽의 ADR을 승계하고, supersede 대상을 그 ADR로 고친다(staleness 정정). 순서는 정하지 않는다.

## 4. 수용 기준

1. 대화 레코드가 결과 줄이 아닌 새 assistant 메시지를 처리하면 `processed_message_at`·`message_excerpt`가 기록되고 verdict는 `action_required`다. Discord 푸시는 나가지 않는다. 관측 사이에 끝난 턴도 같다.
2. 결과 줄 처리와 `🙋 확인 필요`·`↪ Worker가 이어감`·`🙋 사람 인수`는 현행 문구·억제 키 그대로 나간다.
3. notifier가 답 대기 푸시를 만드는 경로를 더 이상 갖지 않는다.
4. 카드의 `답 대기` 배지와 `[세션에서 이어가기]` 술어 결과가 변경 전과 같다.
5. base의 UI-lbm5 스펙에 답 대기 Discord 알림 조항이 없고, UI-lbm5 notes에 3.4의 `rereview:` 줄이 readback된다.

## 5. Test scope

- `server/worker/scheduler.test.js`, `server/worker/scheduler.external-wait.test.js`
  - 지금 `conversationAnswer` 호출로 "메시지를 한 번 처리했다"를 확인하는 테스트는 레코드의 `processed_message_at` readback으로 바꾼다.
  - 새 메시지 처리 뒤 notifier에 답 대기 계열 호출이 없다.
  - 결과 줄·인수·보류 분기 테스트는 그대로 통과한다.
- `server/worker/notify.test.js`: `conversationAnswer` 문구 테스트를 지운다. 나머지 세 종류는 그대로 통과한다.
- `server/worker/wait-judgment.test.js`, `app/views/worker/tile-resolve.test.js`: 바꾸지 않고 통과한다(수용 기준 4).
- 저장소 기본 검증은 `AGENTS.md` Pre-Handoff Validation 그대로다.

## 6. 경계·후속

- 관찰: dotfiles 브리지는 세션 레인 pane 마커(`@bdui_session_lane_bead`)를 스레드 이름에 반영하지 않는다 — 세션 레인이 착지하기 전이라 대상이 없다. 필요하면 UI-lbm5의 dotfiles 형제가 다룬다.
- 관찰: 함께 보고된 Codex `응답 완료` 동시 표시 — dotfiles-g01d3(quick_fix)이 소유한다. 이 스펙과 선후가 없다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 세션 스레드를 만드는 브리지와 훅 직접 전송은 dotfiles가 소유하고, beads-ui는 스레드 목록을 읽기만 한다.
- 대화 세션(문의·해결·외부 재개)의 답 대기는 Discord 채널 푸시 없이 세션 스레드로만 알린다. 대화 알림은 `🙋 확인 필요`·`↪ Worker가 이어감`·`🙋 사람 인수` 셋이다. 세션 레인의 답 대기도 같은 원칙이다.
  - 되돌리기 어려움: `notify.js` 대화 알림 집합, `scheduler.js` reconcile의 메시지 처리 뒤 알림, 재알림을 맡는 쪽(dotfiles 브리지)에 대한 의존이 함께 움직인다. 진행 중인 UI-lbm5의 세션 레인 알림 설계도 따라 바뀐다.
  - 맥락 없이 놀라움: 사람이 답해야 하는 상태인데 `#beads-worker` 채널에는 아무 알림이 없다. 첫 멈춤의 `🙋 확인 필요`는 채널로 나간다.
  - 실제 절충:
    - 얻는 것: 같은 턴 종료가 두 곳에 오는 중복이 사라지고, 답할 곳(스레드)에서만 알림을 받는다.
    - 감수하는 것: 채널만 보는 사람은 대화가 이어지는 동안의 답 대기를 모른다. 브리지가 꺼지면 재알림은 훅 직접 전송에 달려 있다.
    - 대안과 기각 이유:
      - 스레드가 없는 세션에만 채널 푸시: 브리지가 돌고 있으면 대화 세션마다 스레드가 생겨 거의 쓰이지 않는데, 스레드 목록에 기대는 서버 배선만 는다. 스레드 없는 세션은 카드 배지와 `[세션에서 이어가기]`로 드러난다(사용자, 2026-10-16 이 대안 대신 같은 원칙 적용 선택).
      - 현행 유지: 사용자가 중복을 결함으로 보고했다.
  - 소비자 공유: ADR UI-gske(UI-nuwy 승계 조항)의 "알림은 넷"과 "같은 멈춤의 재알림은 `❓`가 맡는다"를 뒤집는다. 나머지 조항은 모두 승계한다.
  - `summary`: "대화 세션(문의·해결·외부 재개)과 세션 레인의 답 대기는 beads-ui가 Discord로 보내지 않고 dotfiles 브리지의 세션 스레드로만 알린다 — 메시지 처리·verdict action_required·배지·[세션에서 이어가기]는 그대로이고 대화 알림은 🙋 확인 필요·↪ Worker가 이어감·🙋 사람 인수 셋이다; UI-gske의 나머지 조항은 그대로다" → ADR, supersede UI-gske
- 발췌 길이 상수 주석 정정 — 표면 문구(카피) → ADR 아님
