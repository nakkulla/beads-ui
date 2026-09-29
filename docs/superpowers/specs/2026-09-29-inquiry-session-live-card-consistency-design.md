---
scope:
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/tmux-launcher.js
  - server/worker/wait-judgment.js
  - server/worker/notify.js
  - server/worker/interactive-progress.js
  - server/ws/worker-handlers.js
  - app/views/worker/lane-model.js
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/tile-resolve.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/protocol.md
---

# 문의 세션이 살아 있는 동안의 카드 정합 — 멈춤 배지는 조용해지고, 문의 배지가 단계를 말하며, `[세션에서 해결]`은 서지 않는다

Bead: `UI-ri8n` · route: `spec_backed` · 작성일: 2026-09-29 · 사용자 결정: §1

## 0. 배경 (2026-09-29 실측, beads rig `beads-sw1`)

| 시각 (KST) | 사건 | 카드가 보인 것 |
| --- | --- | --- |
| 17:06 | Codex quick_fix 시도가 `대기 · recovery:verification`을 선언하고 종료. Worker가 곧바로 문의 세션을 `codex fork`로 `bdui-inquiry:beads-sw1`에 기동 | `⛔ 세션이 멈춤 · 조치 필요` · `▤ 문의 세션 · fork` · `대기 · recovery:verification` · `[세션에서 해결]` `[폐기]` |
| 17:07 | 브리지가 Discord 스레드를 만들고 질문을 보냄 | 같은 카드 |
| 17:12 | 사용자가 `[세션에서 해결]` 클릭 → 서버 `already_running` → 토스트 「이미 열려 있습니다 · beads-sw1」(error 톤) | 같은 카드 |
| 17:13 | Discord 답 "이어가자" 수신·주입 성공. 문의 세션이 한 턴으로 12분 넘게 작업(중첩 `codex exec fork`로 `make test` 재실행) | 같은 카드, `22분째 대기` |

카드가 틀린 것은 셋이다.

1. **판정이 사실을 안 본다.** `server/worker/wait-judgment.js:466-491`은 `waiting` + `cause_detail.recovery`에서 `isSessionStalledRecovery`(`session-stall.js`)가 참이면 — 세션이 선언한 `authority`·`verification`·`no_progress`·`reconcile`·`unclassified`, 선행 목록 없는 `prerequisite` — 항상 `action_required`(`decision`)를 낸다(`provider`·`credential` 등 다른 복구는 `normal`이며 이 스펙의 대상이 아니다). 문의 세션이 살아서 사람 답을 이미 받아 작업 중이어도 배지는 `⛔ … 조치 필요`다. 사람이 지금 할 일은 없다. `notify.js:127-139`는 여기에 더해 복구 문의가 있으면 판정을 `action_required`로 덮어쓰므로, 판정을 고쳐도 알림 억제 키는 그대로 남는다.
2. **진행이 어디에도 없다.** reconcile(`scheduler.js:9252-9325`)은 살아 있는 미정산 문의 세션에 대해 `last_seen_alive_at`과 `@agent_session`만 쓴다. `@agent_running`·`@agent_attention`·전사는 정산된 세션의 idle 판정에만 읽는다. 클라이언트 `InteractiveSessionView`는 `mode`·`source`·`session_id`·`discord_url`뿐이라 배지 꼬리가 `· fork`에서 멈춘다. Discord 스레드는 턴 종료(`stop`)와 질문만 받으므로 긴 턴 중에는 아무것도 뜨지 않는다(브리지 소유, 이 스펙은 바꾸지 않는다).
3. **출구가 이미 열린 창을 다시 가리킨다.** `running-grid.js:1338-1351`은 `waiting && wait.recovery`면 `[세션에서 해결]`을 항상 그리고, 서버 `launchForClick`(`direction-inquiry.js:844-887`)은 마커 pane이 살아 있으면 `already_running`을 돌려준다. 버튼이 답하는 질문 "이 대기를 어떻게 처분하나"에 대한 답은 이미 문의 세션이 하고 있다. `tileResolveFields`(`tile-resolve.js`)는 `parked:false`로 불려 복구 타일에는 툴팁·pending 잠금도 없다.

같은 결함이 실패 타일의 해결 세션(`resolve`)에도 있다: 해결 세션이 살아 있어도 `[세션에서 해결]`이 서고 `already_running`으로 거절된다.

## 1. 사용자 결정 (2026-09-29)

1. 문의 세션이 살아서 작업 중이면 슬롯 1 대기 배지는 `⛔`·`조치 필요` 없이 조용한 `⏸ 세션이 멈춤`이고, 기존 `▤ 문의 세션` 배지가 단계 꼬리(`· 작업 중 8분` / `· 질문 대기` / `· 턴 종료 3분`)를 단다. 문의 세션이 질문을 기다리거나 죽으면 `⛔ 세션이 멈춤 · 조치 필요`로 돌아온다. 대기 어휘 4종(ADR UI-l48z)은 그대로다.
2. 문의 세션이 진행 중이면 카드는 그 진행을 보여야 한다.
3. `[세션에서 해결]`은 살아 있는 문의·해결 세션이 있는 동안 그리지 않는다.
4. Codex fork 문의 세션이 프롬프트 3항 "기록 세션을 fork해"를 문자 그대로 받아 재-fork한 문제는 별도 dotfiles quick_fix로 고치고(문구 정본 `execution-common.md` Direction inquiry 절), 이 Bead는 그것을 기다리지 않는다(§경계·후속).

## 2. 접근 대안

- **A. 레코드에 단계를 싣고 판정·카드가 그 레코드를 본다 (채택).** reconcile이 이미 30초마다 pane을 세므로 같은 pass에서 `@agent_running`·`@agent_attention`과 전사 tail을 읽어 `interactive_sessions` 레코드에 쓴다. 대기 판정(`wait-judgment.js`)은 `queue.interactive_sessions`를 입력으로 받아 verdict를 정하고, 클라이언트는 레코드 필드만 그린다. 서버 한 곳이 사실을 정하고(ADR UI-u6ud-6: 대화형 세션의 생존·종료는 reconcile 소유) Worker·Monitor가 같은 것을 그린다.
- **B. 클라이언트가 transcript 서랍 구독으로 진행을 파생.** 카드마다 `subscribe-session-log`를 열어야 하고, 판정(배지)이 서버와 클라이언트로 갈린다. 기각.
- **C. 브리지 스풀·manifest를 서버가 읽어 마지막 메시지를 얻는다.** 스풀은 Discord ack 뒤 삭제되고 manifest에는 메시지가 없다(2026-09-29 조사). 기각.

## 3. 설계

### 3.1 서버 관측 — `interactive_sessions` 레코드의 단계 필드

`InteractiveSession`(`queue-store.js:493-517`)에 nullable 필드 넷을 더한다. 정규화(`normalizeInteractiveSessions`)는 부재·잘못된 값을 `null`로 떨어뜨리고 레코드를 버리지 않는다.

```
turn_state:       'running'|'question'|'limit'|'idle'|null
turn_state_since: number|null        // turn_state가 마지막으로 바뀐 시각(epoch ms)
last_message:     { text: string, at: number|null }|null   // 세션의 마지막 assistant 메시지 한 줄, ≤160자
last_message_read_at: number|null    // 전사 파일을 마지막으로 읽은 시각
```

**단계 판정(pane 옵션).** reconcile pass(`scheduler.js` `reconcileInteractivePass`)가 살아 있는 **미정산** 레코드에도 `@agent_running`·`@agent_attention`을 읽는다. 두 옵션은 `listPanesExtended`의 포맷에 `#{@agent_running}:#{@agent_attention}`로 붙여 pass당 `list-panes` 3회 밖의 추가 tmux 호출을 만들지 않는다(`tmux-launcher.js:105` 포맷 확장, `readPaneOption` 호출 제거 아님 — 정산 idle 판정은 그대로 둔다).

| `@agent_running` | `@agent_attention` | `turn_state` |
| --- | --- | --- |
| `1` | (무관) | `running` |
| 비어 있음 | `question` · `plan` | `question` |
| 비어 있음 | `limit` | `limit` |
| 비어 있음 | 비어 있음 · `done` · `stopped` | `idle` |

두 옵션이 모두 비어 있어도 `idle`이다 — 턴이 돌지 않고 대화상자도 없다는 관측이다. `null`은 아직 한 번도 관측하지 않은 레코드(기동 직후 첫 pass 전)에만 남는다. 값이 바뀔 때만 `turn_state_since = now()`를 쓴다. 이 두 옵션은 dotfiles 훅이 쓴다(Claude `stop-hook.sh`, Codex `codex-notifier-service.py`). `@agent_attention`은 사람이 그 pane을 포커스하면 `limit` 외에는 지워지므로(tmux `after-select-pane` 훅) 질문이 화면에 남아 있어도 `idle`로 읽힐 수 있다 — 브리지의 `MODAL_BLOCKED` 가드와 같은 한계이며 이 스펙은 감수한다(§4).

**마지막 메시지(전사 tail).** `session_id`가 있고 `resolveSessionFile({provider, session_id, host: os.hostname()})`이 `local`이면, 파일 mtime이 `last_message_read_at`보다 새로울 때만 끝에서 64KB를 읽어 `createSessionRefTranscript(provider).project(line)`로 투영하고, 마지막 assistant 텍스트(Claude `assistant` 레코드의 text 블록, Codex `agent_message`)의 첫 줄을 160자로 잘라 `last_message`에 쓴다. 이 추출은 새 모듈 `server/worker/interactive-progress.js`가 소유한다(`readLastAssistantMessage({ provider, file, since_offset })`, 순수 함수 + fs 주입). Codex 문의 세션은 `session_id`가 첫 pass에서 `@agent_session`으로 채워진 뒤부터 읽힌다.

**쓰기 빈도.** 단계·메시지가 바뀌지 않은 pass는 `last_seen_alive_at`만 쓴다(현행). 지금도 매 pass가 revision을 올려 `queue/interactive_sessions`를 재푸시하므로 fanout 횟수는 늘지 않는다.

### 3.2 서버 대기 판정 — 살아 있는 문의 세션이 verdict를 정한다

`judgeWaitReasons`(`wait-judgment.js:245`)의 `recovery` 분기 중 `isSessionStalledRecovery`가 참인 경우와 `awaiting_user` 분기만 `input.queue.interactive_sessions[<bead_id>:inquiry]`를 읽는다 — 문의 세션이 자동 기동되는 집합과 같다. `provider`·`credential`·선행 목록 있는 `prerequisite` 등 다른 복구 대기의 현행 판정(`normal`)은 바뀌지 않는다. 레코드가 있고 `state === 'live'`이며 `settled_at === null`이면 "살아 있는 문의"다.

| 살아 있는 문의 | `turn_state` | verdict | `verdict_reason` | `actions` |
| --- | --- | --- | --- | --- |
| 없음 | — | `action_required` | `decision` · 「사용자의 답변이 필요함」 (현행) | `[세션에서 해결]` · `폐기` (현행) |
| 있음 | `question` · `limit` | `action_required` | `decision` · 「문의 세션이 답을 기다림 — Discord 스레드 또는 tmux 창에서 답」 | `폐기` |
| 있음 | `running` · `idle` · `null` | `normal` | 없음 | `폐기` |

`headline`은 그대로 세션이 남긴 blocker 문장이다(UI-8gem: 슬롯 3은 headline 한 줄). `since`는 그대로 `attempt.finished_at`이다.

**알림(`notify.js`).** `notifyWaitReasons`(`notify.js:112-160`)는 복구 문의가 있는 항목의 verdict를 `action_required`·`decision`으로 덮어쓴다(`:127-139`). 이 덮어쓰기를 없애고 judge가 준 `verdict`·`verdict_reason`을 그대로 쓴다 — headline `세션이 멈춤` 강제와 `detail.inquiry` 첨부(알림 본문의 `질의 세션:` 줄)는 유지한다. 그러면 억제 키 `(bead, recovery, decision)`는 verdict가 `normal`인 동안 `by_key`에서 빠져 `claimWaitNotifications`가 재무장하고, 질문 대기로 바뀌면 1회 난다. 새 알림 종류는 없다. 검증 시나리오: 질문(알림 1회) → 답 수신·작업 중(0회) → 두 번째 질문(1회) → 문의 세션 사망(현행 `decision` 문구로 1회).

같은 규칙을 `awaiting_user` 파킹 분기(`:576-585`)에 적용한다. 파킹은 `status='parked'` 경로라 클라이언트 `failure` 투영을 타지만, 배지 재료는 같은 `wait_reasons`다.

### 3.3 클라이언트 — 슬롯 표 (ADR 0014 슬롯 표, `2026-08-25-card-header-grammar-unify-design.md` §5.1)

`InteractiveSessionView`(`lane-model.js:398-414`)에 `turn_state`·`turn_state_since`·`last_message`를 더한다. 한 경로(`buildLanes`)가 접고 Worker·Monitor가 같은 것을 그린다.

| 요소 | 슬롯 | 재료 | 규칙 |
| --- | --- | --- | --- |
| 대기 배지 `⏸ 세션이 멈춤` / `⛔ 세션이 멈춤 · 조치 필요` | 1 정체성 | `wait_reasons` verdict (§3.2) | 클라이언트 변경 없음 — `waitStatusBadge`가 verdict를 그대로 그린다. 배지 팝업의 첫 줄은 `verdict_reason.message`이고, 살아 있는 문의가 있으면 그 아래에 `문의 세션 <tmux_session:tmux_window> · <단계 꼬리>` 한 줄을 더한다 |
| `▤ 문의 세션 · fork` 배지의 단계 꼬리 | 1 정체성 (배지 안) | `turn_state`·`turn_state_since`·`launched_at` | 꼬리는 `· fork`/`· 새 세션`/`· 복구` 뒤에 ` · <단계>`: `running` → `작업 중 <경과>`, `question` → `질문 대기`, `limit` → `한도 대기`, `idle` → `턴 종료 <경과>`, `null` → 꼬리 없음. `<경과>`는 `turn_state_since` 기준 `formatElapsedSince` 값에서 `째`를 뺀 `8분`·`1시간` 형식. 해결 세션(`resolve`)·재개 세션(`external_resume`) 배지도 같은 꼬리를 단다 |
| 문의 진행 줄 | 3 진행 (활동 줄) | `last_message` | held 타일(`heldBodyTemplate` `kind === 'waiting'`·파킹)에 `.rtile__activity.rtile__activity--session` 한 줄을 headline **뒤에** 그린다: `▤ <last_message.text>` + 오른쪽 `N분 전`(`last_message.at`). 재료가 없으면 줄 자체를 그리지 않는다. 대기 행(`miniRow` 카드 변형)은 같은 줄을 reason 줄 아래에 둔다 |
| `[세션에서 해결]` | 6 foot | `interactive_sessions`·`wait`·`failure`·`discard` | §3.4의 술어 하나가 정한다. 살아 있는 문의·해결 세션이 있으면 그리지 않는다 |
| `폐기` | 6 foot | 현행 | 바뀌지 않는다 |
| 시각 줄 `N분째 대기` | 7 시각 | `reason.since` | 살아 있는 문의가 있으면 `문의 세션 <n>분째`(`launched_at` 기준)로 바꾼다. 없으면 현행 |

- 대기 요약 칩(`막힘 N`)·범례(`help-dialog`)의 `세션이 멈춤` 행은 그대로다. 범례 `action` 문구는 `[세션에서 해결] · 폐기 — 문의 세션이 살아 있으면 폐기만`으로 정정한다.
- Worker 탭은 이 타일에 주기 렌더가 없다. 단계 경과는 30초 reconcile fanout마다 갱신되면 충분하다(Monitor는 1초 tick으로 이미 갱신된다).

### 3.4 `[세션에서 해결]` 술어 — 한 함수, 모든 행·타일, 두 탭

`app/views/worker/tile-resolve.js`의 `tileResolveFields(item, resolve_pending)`가 유일한 판정이 된다. 입력은 lane-model이 이미 모든 항목에 붙이는 재료뿐이다: `item.run_state === 'parked'`, `item.wait?.recovery`(실행 타일), `item.wait_reasons`(대기 행·타일 공통, `lane-model.js:4761-4796`이 붙인다), `item.discard?.error`, `item.interactive_sessions`.

```
eligible = parked || !!wait?.recovery || wait_reasons.some(r => r.kind === 'recovery') || !!discard?.error
live     = interactive_sessions.some(v => v.state === 'live' && !v.closing && (v.kind === 'inquiry' || v.kind === 'resolve'))
resolve_action  = eligible && !live
resolve_enabled = !resolve_pending
```

- 호출자 여섯이 같은 함수를 부른다: Worker 실행 타일(`worker/index.js:3190`), Monitor 실행 타일(`monitor/index.js:1345`), Worker 대기 행·ghost 행(`worker/index.js:4092`·`4147`), Monitor 대기 행 `parallelRow`·`serialRow`(`monitor/index.js:1058`·`1081` — 지금은 부르지 않고 렌더러 fallback에 기대므로 호출을 추가한다). 렌더러의 두 fallback — `running-grid.js:1338`의 `(waiting && !!wait?.recovery)`, `lanes.js:3483`의 `wait_reasons.some(r => r.kind === 'recovery')` — 는 없앤다. 자리 판정을 렌더러가 다시 하지 않는다.
- PR 대기 행(`worker/index.js:1453` `prWaitRow`)의 `resolve_action`(needs_human·holding·cleanup_failed·discard.error)은 그 자리에서 그대로 계산하되 같은 `live` 술어를 AND한다 — 해결 세션이 살아 있으면 숨긴다. `external_resume` 세션은 `live`에 세지 않는다(외부 대기 조작은 슬롯 6의 다른 버튼 묶음이다).
- 툴팁: 복구·파킹은 「멈춘 세션을 사람이 이어받는 대화형 세션을 띄웁니다 — 기록된 세션이 있으면 fork」, 폐기 실패는 현행 문구. `resolve_pending` 잠금이 모든 호출자에 걸린다(복구 타일에 잠금이 없던 현행 결함 정정).
- 서버 `launchForClick`의 `already_running` 응답과 토스트는 남는다 — 버튼이 사라진 뒤에도 타임라인 `[세션에서 해결]`(`repo-ops-timeline.js`)이나 오래된 스냅샷에서 올 수 있는 클릭의 방어다. 토스트 톤은 `error`가 아니라 `info`로 바꾼다(거절이 아니라 안내다).

### 3.5 문의 세션이 작업을 이어갈 때의 경계

`recovery` 문의 세션이 "이어가기" 답을 받아 작업을 잇는 동안 attempt는 `waiting`으로 남고 카드는 §3.3대로 진행을 보인다. 끝은 현행 정산 write다: 세션이 quick_fix tail로 Bead를 `closed`하면 reconcile 1단계가 `bd_closed`로 정산하고(UI-tqqp: closed Bead는 대기 레인에서 물러난다), PR 경로면 `done` 이동이 정산한다. 문의 세션에는 pre-push 가드 훅이 없으므로 Worker의 push 로그 기반 착지 판정은 그 세션의 push를 보지 못한다 — 이 스펙은 그 경계를 바꾸지 않고 관찰로 남긴다(§경계·후속).

### 3.6 바꾸지 않는 것

- 문의 세션의 자동 기동 게이트·프롬프트 다이제스트·`bridge_active`·Discord 스레드 생성 시점·브리지 이벤트 종류. 브리지는 dotfiles 소유이고 턴 종료마다 `stop`을 이미 보낸다 — 실측의 공백은 12분짜리 한 턴이었다.
- `interactive_sessions` 레코드의 생존·정산·종료 규칙(ADR UI-u6ud-6), transcript 서랍 인가, `discord_url`.
- 대기 어휘 4종과 대표 사유 순서(UI-l48z), 슬롯 6의 `폐기`.
- 결정: `[세션에서 해결]`의 서버 `already_running` 응답은 없애지 않는다 — 버튼 부재는 클라이언트 투영이고 방어는 서버가 갖는다.

## 4. 오류 처리·fail-quiet

| 상황 | 처리 |
| --- | --- |
| `list-panes` 확장 포맷에서 두 옵션이 모두 비어 있음 | §3.1 표대로 `idle`(꼬리 `턴 종료 <경과>`, verdict `normal`) — 살아 있는 세션을 `조치 필요`로 승격하지 않는다. `null`은 첫 pass 전 레코드뿐이다 |
| `@agent_attention`이 포커스로 지워짐 | `idle`로 읽혀 배지가 `⏸`로 내려간다. 질문은 Discord 스레드와 tmux 창에 그대로 있다. 감수 |
| `session_id` 없음(Codex 첫 pass 전, 복구 레코드의 Claude) | `last_message` 생략, 단계 꼬리만 |
| 전사 파일 부재·읽기 오류·투영 실패 | `last_message` 유지(이전 값) 또는 `null`; 오류는 debug 로그. pass는 계속된다 |
| 전사 tail 64KB 안에 assistant 메시지가 없음 | `last_message` 유지 |
| tmux 도달 불가 | 현행대로 pass 전체를 판정하지 않는다 |
| `interactive_sessions`가 없는 구 서버 스냅샷 | 클라이언트는 현행 카드(배지·버튼) 그대로 |

## 5. 검증과 수용 기준

### Test scope

- `server/worker/interactive-progress.test.js`(신설): Claude JSONL·Codex rollout 고정 tail에서 마지막 assistant 첫 줄 160자 추출, 메시지 없음 → `null`, 잘린 첫 줄(64KB 경계) 무시.
- `server/worker/scheduler.test.js` `reconcileInteractivePass`: 살아 있는 미정산 레코드에 `turn_state`·`turn_state_since`가 옵션 조합표대로 써지고 값이 같으면 `since`가 유지됨; 옵션 둘 다 비면 `idle`; 첫 pass 전 레코드는 `null`; mtime이 같으면 전사를 다시 읽지 않음.
- `server/worker/wait-judgment.test.js`: 표 §3.2의 세 행(문의 없음 / `question` / `running`)에서 verdict·`verdict_reason`·`actions`; `provider` 복구 대기는 살아 있는 문의가 있어도 현행 `normal` 그대로(회귀).
- `server/worker/notify.test.js`: §3.2 알림 시나리오 — 질문(1회) → 작업 중(0회, 키 재무장) → 두 번째 질문(1회) → 문의 세션 사망(1회); `inquiry` 첨부와 headline `세션이 멈춤`은 그대로.
- `server/worker/queue-store.test.js`: 새 필드 정규화(부재 → `null`, 잘못된 `turn_state` → `null`, 레코드 유지).
- `app/views/worker/tile-resolve.test.js`: §3.4 술어 — 복구(`wait.recovery`)·복구 대기 행(`wait_reasons` recovery)·파킹·폐기 실패 각각에 살아 있는 문의/해결/재개 세션이 있을 때와 없을 때, `closing` 세션은 살아 있음으로 세지 않음, `resolve_pending` 잠금.
- `app/views/worker/running-grid.test.js`·`lanes.test.js`: 단계 꼬리 4종·`null`, held 타일의 진행 줄 유무, `문의 세션 N분째` 시각 줄, 렌더러 fallback 제거(`resolve_action` 없이는 실행 타일·대기 행 어느 쪽에도 버튼이 없음).
- `app/views/worker/lane-model.test.js`: `InteractiveSessionView`에 세 필드가 실림.
- `app/views/worker/index.test.js`·`app/views/monitor/index.test.js`: 실행 타일·대기 행·ghost 행·Monitor `parallelRow`·`serialRow`가 같은 `tileResolveFields`를 거쳐 문의 세션 생존→종료 전환에서 버튼이 사라졌다 다시 서는 것; PR 대기 행의 해결 세션 억제.

### 수용 기준

1. beads-sw1과 같은 상태(문의 세션 live·`running`)에서 카드는 `⏸ 세션이 멈춤` · `▤ 문의 세션 · fork · 작업 중 <n>분` · headline · `▤ <마지막 메시지>` · `문의 세션 <n>분째`를 보이고 `[세션에서 해결]`이 없다. `폐기`는 있다.
2. 문의 세션이 질문을 내면(`@agent_attention=question`) 30초 안에 `⛔ 세션이 멈춤 · 조치 필요`가 되고 팝업 첫 줄이 「문의 세션이 답을 기다림 …」이며 Discord 알림이 1회 난다.
3. 문의 세션 pane이 죽으면 다음 pass에서 배지가 `⛔ … 조치 필요`(현행 문구)로 돌아오고 `[세션에서 해결]`이 다시 선다.
4. 실패 타일의 해결 세션이 살아 있는 동안 `[세션에서 해결]`이 없고, 죽으면 다시 선다.
5. Worker·Monitor 두 탭에서 1~4가 같다(스크린샷 검증, 390px 포함).
6. `npm run tsc`·`npm run lint`·`npx vitest run --reporter=dot` 통과.

## 6. 문서 정정 (ADR 0014 — 공유 슬롯 표를 먼저 고친다)

구현이 다음 정정 문단을 각 스펙에 더한다.

- `2026-08-25-card-header-grammar-unify-design.md` §5.1 — **정정(UI-ri8n)**: 슬롯 1 대화형 세션 배지에 단계 꼬리(`작업 중 <경과>`·`질문 대기`·`한도 대기`·`턴 종료 <경과>`), 슬롯 3에 held 타일·대기 행의 문의 진행 줄(`▤ <마지막 메시지>`), 슬롯 6 파킹 처분 버튼 중 `[세션에서 해결]`은 살아 있는 대화형 세션이 없을 때만, 슬롯 7 시각 줄은 살아 있는 문의가 있으면 `문의 세션 <n>분째`.
- `2026-09-22-interactive-session-projection-fork-source-and-exit-design.md` §3.7 — **정정(UI-ri8n)**: 「`[세션에서 해결]` 버튼은 현행 그대로 그린다 … 뱃지는 그 사실을 클릭 전에 보여 주는 추가 표면이다」를 대체: 살아 있는 세션이 있으면 버튼을 그리지 않고 뱃지가 단계를 말한다. 서버 `already_running`은 방어로 남는다. §3.3 레코드에 단계 필드 넷.
- `2026-09-21-worker-wait-guard-simplification-design.md` §3.3 카드 — **정정(UI-ri8n)**: 「슬롯 1 `⛔ 세션이 멈춤 · 조치 필요`」는 문의 세션이 없거나 답을 기다릴 때이고, 작업 중이면 `⏸ 세션이 멈춤`이다.
- `2026-09-16-wait-surface-density-vocabulary-design.md` §5.2·§6.2 — **정정(UI-ri8n)**: `세션이 멈춤` 행의 verdict는 「항상 `action_required`」에서 §3.2 표로; 배지 팝업에 문의 세션 줄.
- `AGENTS.md` 「워커·모니터 카드 배치 문법」에 문장 하나: 「`[세션에서 해결]`의 유무는 `tileResolveFields` 하나가 정한다 — 렌더러는 다시 판정하지 않는다」.

## 7. 구현 unit 후보

- `server-progress`: `interactive-progress.js`(신설) · `queue-store.js` 필드·정규화 · `tmux-launcher.js` 포맷 확장 · `scheduler.js` reconcile 단계 쓰기.
- `server-verdict`: `wait-judgment.js` §3.2 · `notify.js` 덮어쓰기 제거(§3.2 알림) · `app/protocol.md` 필드 문서.
- `client-card`: `lane-model.js` 뷰 필드 · `tile-resolve.js` 술어 · `running-grid.js`·`lanes.js` 렌더 · `wait-vocabulary.js` 범례 문구 · `worker/index.js`·`monitor/index.js` 호출자·토스트 톤 · 문서 정정(§6).

## 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |

- 크로스 리포 unit(dotfiles, quick_fix, 사용자 결정 §1-4): `execution-common.md` Direction inquiry 절 `recovery` 블록 3항을 fork 모드별로 나눈다 — 이미 fork로 뜬 문의 세션은 「이 세션에서 그대로 계속」, fresh 세션만 「기록 세션을 fork해」. 금지 목록에 「공급자 세션 상태 파일(sqlite 등) 직접 수정 · 중첩 헤드리스 세션 기동」을 더한다. 인계 시 dotfiles rig에 생성하고 이 Bead는 `blocks`로 기다리지 않는다. 그 착지 뒤 beads-ui `RECOVERY_INQUIRY_PROMPT` 다이제스트 동기화는 그때 beads-ui quick_fix로 잇는다.
- 관찰: 문의 세션이 작업을 이어가 base에 push하면 Worker의 push 로그 기반 착지 판정이 그 push를 보지 못한다(문의 세션에는 pre-push 가드 훅이 없다) — 정산은 Bead close·`done` 이동에 의존한다(§3.5). 별도 설계.
- 관찰: reconcile이 매 pass `interactive_session:*:started` 이벤트를 다시 append한다(`scheduler.js:9266`; 읽기 시 event_id dedup이라 화면엔 한 번). 파일만 자란다 — 레코드 생성 시 1회 append로 바꾸는 것은 구현 중 fix-now 흡수 대상.
- 관찰: `wait-judgment.js`가 만드는 `actions`(`worker-resolve-in-session`·`worker-discard`)를 클라이언트가 그리지 않는다(`lanes.js:2431-2483`). 이 스펙은 §3.4 술어로 클라이언트가 정하고 서버 `actions`는 §3.2대로만 맞춘다 — 서버 `actions` 렌더 통일은 별도.
- 관찰: Codex 시도 종료 시 임시 `CODEX_HOME` 삭제로 `codex fork`·`resume`이 실패하는 근본 결함은 `UI-3z1e`(quick_fix)가 다룬다.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-6 — 대화형 세션은 `interactive_sessions` 큐 레코드로 투영되고 생존·복구·종료는 reconcile이 소유한다. 이 스펙은 같은 reconcile pass가 그 레코드에 단계 필드 넷을 더 쓰게 할 뿐, 그 ADR의 조항(이력 SoT·`queue.json` 이관·생존/정산/종료 소유·fork 원천·claim 규칙) 어느 것도 뒤집지 않는다 — 전부 그대로 승계. 소비자 집합이 다르다: UI-u6ud-6의 소비자는 `events.jsonl` 기록기·이관·reconcile·claim 경로이고, 아래 후보의 소비자는 대기 판정·알림 억제·카드 출구·클릭 응답이다. 따라서 supersede 대상은 아니며 가장 가까운 현행 ADR로 여기 명시한다.
- 전제: ADR UI-l48z — 대기 어휘 4종·대표 사유 순서·슬롯 6 파킹 처분 버튼; 이 스펙은 어휘와 순서를 유지하고 `세션이 멈춤`의 verdict 조항과 `[세션에서 해결]` 조항만 뒤집는다.
- 「`세션이 멈춤`의 판정은 살아 있는 문의 세션의 단계가 정하고, `[세션에서 해결]`은 살아 있는 문의·해결 세션이 없을 때만 선다」 — (1) 되돌리기 어려움: 충족 — `wait-judgment.js`의 verdict 표, `notify.js`의 억제 키, `tile-resolve.js` 술어, `running-grid.js`·`lanes.js`의 fallback 제거, `direction-inquiry.js` 클릭 응답 톤이 함께 움직이며, 되돌리려면 이 다섯 소비자를 같은 커밋에서 되돌려야 한다. (2) 맥락 없이는 의외: 충족 — attempt는 `waiting`으로 남아 있는데 배지가 조용하고(⏸) 출구 버튼이 없다. 코드만 보면 "멈춘 세션에 조치 버튼이 없다"가 결함처럼 읽히고, 그 근거(문의 세션이 곧 작업 세션이라 사람이 지금 할 일이 없다)는 이 결정에만 남는다. (3) 실제 절충: 충족 — 대안 「대기 배지를 숨기고 문의 배지만」은 카드가 단순하지만 attempt가 멈춰 있다는 사실과 `막힘 N` 요약이 어긋나 기각했고, 대안 「버튼을 남기고 `already_running` 토스트만」은 코드 변경이 가장 적지만 이미 열린 창을 다시 가리키는 조작이 남아 실측에서 사용자가 두 번 헤맸으므로 기각했다. UI-l48z의 「`세션이 멈춤` … 항상 `action_required`·코드 `decision`」과 「`[세션에서 해결]`은 살아 있는 문의 세션이 있으면 그 pane을 가리키고(`already_running`)」 두 조항을 뒤집는다. `summary`: "세션이 멈춤의 verdict는 살아 있는 문의 세션의 단계가 정한다 — 작업 중이면 normal(⏸ 배지, 문의 배지 단계 꼬리), 질문·한도 대기이거나 문의 세션이 없으면 action_required이고 알림은 그 전환마다 1회; [세션에서 해결]은 살아 있는 문의·해결 세션이 없을 때만 서고 서버 already_running은 방어로 남는다; 단계는 reconcile이 pane 옵션과 전사 tail로 레코드에 쓴다" → ADR, supersede UI-l48z
