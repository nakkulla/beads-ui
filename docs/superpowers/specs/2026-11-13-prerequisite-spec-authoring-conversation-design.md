---
scope:
  - server/worker/direction-inquiry.js
  - server/worker/scheduler.js
  - server/worker/tmux-launcher.js
  - server/worker/queue-store.js
  - server/worker/notify.js
  - app/views/worker/lanes.js
  - app/views/worker/gate-labels.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-10-02-monitor-worker-parity-design.md
---

# 대기열 작업을 막는 spec_backed 선행의 스펙 작성 대화 — beads-ui 소비자

Bead: `UI-cdrc` · 날짜: 2026-11-13 · 계약 정본: dotfiles `dotfiles-hid4r` 스펙 `docs/superpowers/specs/2026-11-13-prerequisite-spec-authoring-conversation-design.md`

## 1. 목표

dotfiles 계약 `needs_human_reentry.conversation_auto_launch.prerequisite_spec_authoring`과 진입 블록 `## 스펙 작성 대화`를 소비해 세 가지를 구현한다.

1. Worker 대기열의 작업을 막는 스펙 미발행 `spec_backed` 선행 B에 스펙 작성 대화를 자동으로 연다(공용 스위치가 꺼져 있으면 알림만 보낸다).
2. 사람이 스펙을 확정하거나 구현 진입에 답해야 하는 자리를 카드에 표시한다.
3. 대화를 여는 버튼을 단다.

대상 판정·식별자·한 번 규칙의 정의는 계약이 소유한다. 이 스펙은 그 정의를 코드 registry로 복제해 쓴다(ADR UI-jlov).

## 2. 검증된 전제

- 선행 대기로 끝난 attempt는 `waiting/prerequisite_unmet`과 `cause_detail.blockers`로 정산된다. 이때 알림이나 문의는 없다 — `server/worker/scheduler.js:9022-9061`
- dispatch 패스는 준비되지 않은 대기열 항목에 `prerequisite_unmet`과 막는 선행 목록을 기록한다 — `server/worker/scheduler.js:8705`
- 대화형 세션 종류는 `resolve`·`inquiry`·`external_resume`·`session_lane`이다 — `server/worker/queue-store.js:547`
- 창 표지(pane marker)가 재시작 사이의 중복 기동을 막는다 — `server/worker/tmux-launcher.js:24-49`
- 진입 블록 사본과 슬롯 채우기는 `CONVERSATION_ENTRY_BLOCK`·`fillConversationEntry`가 한다 — `server/worker/direction-inquiry.js:78`, `server/worker/direction-inquiry.js:157`
- 행 게이트는 살아 있는 대화가 있는 행에서 기동을 거부한다 — `server/worker/resolve-session.js:1434`
- 멈춤·실패 대화가 함께 쓰는 자동 기동 스위치는 하나다 — `server/conversation-settings.js:7`
- 확인 필요 알림 경로가 있다 — `server/worker/notify.js:680`
- 후보 카드는 스펙이 발행되지 않으면 slot 4a에 `스펙 미발행`을 단다 — `app/views/worker/lanes.js:1005-1007`
- 카드의 새 요소는 그 요소가 답하는 질문으로 슬롯이 정해지고, 스펙 갱신이 먼저다 — `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:249-252`, `AGENTS.md:29-35`
- 같은 Bead의 카드는 Worker 탭과 모니터 탭에서 같은 재료로 그린다 — `AGENTS.md:42-47`
- 선행이 닫혀 `bd ready`에 다시 들어오면 원 Bead는 자동으로 다시 실행된다 — `docs/superpowers/specs/2026-08-28-worker-prerequisite-wait-tier-design.md`, `docs/superpowers/specs/2026-09-22-prerequisite-wait-residue-session-resume-design.md`
- 미확인: 다른 rig 선행 B의 저장소 루트 해석이 기존 교차 저장소 선행 조회로 충분한지 — 구현 때 `2026-09-03-cross-repo-queue-prerequisite-wait-design.md`의 해석기로 확인한다.

## 3. 설계

### 3.1 대상 판정 (계약 복제)

계약 3.1의 네 조건을 코드 registry로 옮긴다.

- 판정 시점은 두 곳이다. 하나는 attempt를 `waiting/prerequisite_unmet`으로 정산한 직후, 다른 하나는 dispatch 패스가 `prerequisite_unmet`을 기록할 때다.
- B의 route, 상태, `spec-after-blocker` 라벨, ready 여부는 기존 스냅샷과 교차 저장소 조회에서 읽는다. 스펙 근거는 기존 `placement_spec` 판정을 그대로 쓴다.
- 조회가 실패하면 대상이 아니라고 보고, 다음 관측에서 다시 판정한다.

### 3.2 기동

- **새 대화 종류**: `spec_authoring`. 창 표지는 `@bdui_spec_authoring_bead`, 행은 B다. 자동 기동은 백그라운드 문의 tmux 세션에, 클릭은 사용자 세션에 연다.
- **한 번 규칙**: B당 자동 기동 기록을 대기열 저장소에 영속한다. 기록이 있으면 다시 열지 않는다. 판정 시점이 두 곳이고 재시작도 있으므로, 기록이 중복을 막는 정본이다. 창 표지와 행 게이트는 기존대로 그 앞에서 막는다.
- **세션**: B의 저장소 루트에서 새 세션으로 연다. 첫 입력은 계약 진입 블록의 사본에 슬롯을 채운 것이다. 슬롯 값은 B, 막힌 원 Bead 목록, 각 원 Bead의 `prerequisite:` 줄, 원 attempt ID, 보존 워크트리다. runner는 기존 resolver를 따른다.
- **알림**: 기동할 때, 또는 스위치가 꺼진 상태에서 대상이 처음 판정될 때, B당 한 번 확인 필요 경로로 보낸다. 문구는 `🙋 스펙 확정 필요 — <B> (막힌: <O...>)`다.
- **실패**: tmux가 없거나 기동에 실패하면 기존 대화와 같이 실패를 기록하고 알림만 남긴다. 자동 기동 기록은 남겨서 자동으로 재시도하지 않는다. 버튼으로는 다시 열 수 있다.

### 3.3 카드 표시

사람의 답을 기다리는 상태는 두 가지다.

| 상태 | 조건 | B 카드 slot 1 머리 배지 | 원 Bead 카드 slot 4a |
| --- | --- | --- | --- |
| 스펙 확정 필요 | 3.1 대상 | `✍️ 스펙 확정 필요` | `⛓ <B>` 옆 `✍️` |
| 구현 진입 답 필요 | B의 스펙이 `published`이고, B가 `open`이며, 대기열에 없고 실행 중도 아니고, 여전히 대기열 작업을 막음 | `✍️ 구현 진입 답 필요` | `⛓ <B>` 옆 `✍️` |

- 두 번째 상태는 대화가 열리지 않고 표시만 한다. 스펙 발행 뒤 구현 진입 질문에 답이 오지 않아 다시 소리 없이 멈추는 것을 드러내려는 것이다.
- B 카드(후보 카드)의 slot 6, 그리고 원 Bead 카드의 slot 6에 `[스펙 작성 세션]` 버튼을 둔다. 버튼은 B의 대화를 연다. 대화가 살아 있으면 기존 "대화 중" 표시로 바꾼다.
- Worker 탭과 모니터 탭은 같은 공유 함수로 그린다. 카드 배치 문법 스펙 §5.1 슬롯 표에 새 배지·칩·버튼 행을 먼저 더한다.

결정: 머리 배지는 B 카드 slot 1에 둔다 (대안: slot 4a 칩만 둠; 이유: 사용자가 "앞에 다른 이모지로" 사람이 확정할 자리를 표시해 달라고 했고, slot 1은 머리 상태 배지 자리다).

## 4. 수락 기준

1. 공용 스위치가 켜져 있고 B가 대상이면, B당 대화 하나가 열리고 알림이 한 번 나간다. 재시작이나 다음 dispatch 패스로 다시 열리지 않는다.
2. 스위치가 꺼져 있으면 알림만 한 번 나간다. 버튼은 열린다.
3. 제외 대상(quick_fix, route 미설정, `published`, `in_progress`, 준비되지 않은 `spec-after-blocker`, 아무것도 막지 않는 후속)에는 대화도 알림도 없다.
4. 진입 블록 사본이 dotfiles 정본 바이트와 같고, 다이제스트 고정 시험이 이를 확인한다.
5. 대화 기동은 원 Bead의 상태, 클레임, 대기열 자리, 보존 워크트리를 바꾸지 않는다.
6. 3.3의 두 상태가 두 탭에서 같게 그려진다. B가 대기열에 들어가거나 `in_progress`가 되면 표시가 사라진다.
7. 배포 뒤 `dotfiles-p41u6`이 대기 중이면 `dotfiles-0ufwj`에 대화 하나가 열린다(실측).

## 5. 시험

- 대상 판정 단위 시험: 네 조건을 하나씩 어긴 경우와 모두 만족한 경우.
- 한 번 규칙: 두 판정 시점에서 겹친 경우와 재시작을 모사한 경우.
- 스위치 꺼짐 경로, 기동 실패 경로.
- 진입 블록 다이제스트 고정.
- 카드 렌더: 두 상태, 두 탭 동일성(기존 카드 동일성 시험).

## 6. 경계·후속

- 선행: dotfiles `dotfiles-hid4r` 계약 착지(진입 블록 바이트와 계약 키).
- 비목표: 아무것도 막지 않는 후속의 자동 기동, `full_plan` 선행, 스펙 리뷰 뒤 자동 배치.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — 계약 subset을 코드 registry로 복제하고, 계약 키가 없으면 fail-quiet로 표시를 생략한다.
- 스펙 작성 대화 기동 규칙 — 결정의 소비자 집합은 dotfiles 계약(dotfiles-hid4r ADR 후보)이 정하고, 이 저장소는 그것을 복제해 쓸 뿐이다(소비자는 dotfiles 계약 정본 쪽) → ADR 아님
- `✍️` 배지·칩·버튼의 자리와 문구 — UI 배치·라벨·버튼(기본 제외 목록) → ADR 아님
