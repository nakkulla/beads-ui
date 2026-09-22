---
scope:
  - server/worker/resolve-session.js
  - server/worker/direction-inquiry.js
  - server/worker/tmux-launcher.js
  - server/worker/session-ref.js
  - server/worker/queue-store.js
  - server/worker/scheduler.js
  - server/worker/pr-actions.js
  - server/worker/discard-coordinator.js
  - server/ws/worker-handlers.js
  - app/views/worker/index.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/worker/tile-resolve.js
  - app/views/worker/transcript-drawer.js
  - app/views/monitor/index.js
---

# `[세션에서 해결]`은 attempt 세션을 fork하고, 대화형 세션은 큐에 투영돼 서랍·Discord 스레드로 이어지며, Bead가 끝나면 `/exit`로 닫혀 스레드가 아카이브된다

Bead: `UI-6pif` · route: `spec_backed` · 작성일: 2026-09-22 · 사용자 결정: §1

## 0. 배경·목표·비목표

### 0.1 실측 (2026-09-22, UI-7nhi)

| 시각 (KST) | 사건                                                                                                          | 사람이 본 것                                            |
| ---------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| 02:27      | Worker attempt 성공 · PR #321 (세션 `40ba4cd0`, transcript는 `~/.claude/projects/…--worktrees-UI-7nhi/`에 존재) | PR 대기 행                                              |
| 02:30      | 머지 전 verify 실패 (main 선재 실패) → `holding` 보류 · Discord 알림                                           | 「머지 전 검증 실패」 배지 · `[세션에서 해결]`          |
| 07:21      | 첫 클릭 — 창·transcript 없음 (07:35 UI-gcf6 배포 전, tmux 창 목록 파싱 버그 구간)                              | 토스트 한 번                                            |
| 07:38      | 둘째 클릭 — `bdui-inquiry:resolve-UI-7nhi`에 **새 세션**(`no_session_ref`) · Discord 스레드 생성               | 토스트 4초 「claude 새 세션으로 시작 (no_session_ref)」 |
| 07:45      | 세션이 수정 커밋 push → 07:47 자동 재검증·squash 머지·배포 · Bead closed                                       | 행이 완료로 이동. 세션 존재 흔적 없음                   |
| 이후       | tmux 창 `resolve-UI-7nhi`와 Discord 스레드가 그대로 남음. 창에 다른 작업 지시가 입력됨                        | —                                                       |

원인은 셋이다.

1. **fork 원천이 `session_ref`뿐이다.** `server/worker/resolve-session.js` `forkTarget`은 bd metadata `session_ref`만 읽는데, dotfiles 계약(`workflow-contract.md` Session reference)은 Worker 러너 세션이 `session_ref`를 쓰지 않는다고 정한다 — attempt 기록이 그 세션을 이미 갖고 있기 때문이다. 그래서 Worker가 처리한 Bead의 `[세션에서 해결]`은 **항상** `no_session_ref`로 새 세션이 된다(closed 400건 중 `session_ref` 보유 32건, 전부 세션 소유 Bead). 파킹·복구 문의 `server/worker/direction-inquiry.js` `forkTarget`은 attempt의 `session_id`를 먼저 보고 `session_ref`를 차선으로 두므로 규칙 자체는 이미 있다.
2. **투영이 없다.** 클릭 응답은 토스트 하나로 끝나고(`resolveSessionToast`는 fork 성공이면 `null`), 큐 스냅샷·타임라인·transcript 서랍 어디에도 세션이 없다. 파킹 타일 문구 「살아 있는 문의 세션이 있으면 그 창을 가리킵니다」를 뒷받침하는 사실 재료도 없다. 설계된 관측면은 Discord 스레드였으나 UI에서 그리로 갈 링크가 없다.
3. **종료가 없다.** `server/worker/tmux-launcher.js`는 `{ listPanes, launch, bridgeActive }`만 내보내고 pane 마커는 중복 기동 방지만 한다. Discord 브리지는 SessionEnd 훅의 `session_end` 스풀 이벤트로만 스레드를 아카이브하므로, 창이 남으면 스레드도 남는다.

### 0.2 목표

- `[세션에서 해결]`이 Worker attempt의 기록 세션을 fork한다(attempt 우선 → `session_ref` → fresh).
- beads-ui가 띄운 **대화형 세션**(해결 세션·문의 세션)은 큐 스냅샷의 레코드로 투영돼 그 Bead의 행·타일에 열림 상태가 보이고, transcript 서랍으로 진행을 읽으며, Discord 스레드 링크로 이어진다.
- 그 Bead가 정산되면(머지·close·폐기 완료) Worker가 세션을 정상 종료해 SessionEnd → `session_end` → 스레드 아카이브가 이어지고 tmux 창이 닫힌다.

### 0.3 비목표

- 자동 완료(수정 push → 자동 재검증·머지)는 바꾸지 않는다 — 2026-09-15 「사람 확인 최소화」 방향.
- 수동 `[세션 닫기]` 조작은 두지 않는다(요청 없음; 서랍·tmux·Discord에서 사람이 직접 `/exit` 가능).
- 브리지의 스레드 생성 시점(첫 Stop/question 이벤트)은 바꾸지 않는다. 링크는 세션의 첫 턴이 끝난 뒤 나타난다.
- codex 러너 세션의 id 파악·서랍·Discord 링크는 하지 않는다(`codex fork`는 새 id를 돌려주지 않고 브리지의 `@agent_running` 재료도 Claude 훅 것이다). codex 세션은 레코드·종료(유예 뒤 `kill-window`)만 받는다.
- `[세션에서 해결]`이 파킹/복구에서 문의 세션을, 그 밖 실패에서 해결 세션을 띄우는 이중 분기(2026-09-03 §3.3)와 두 마커의 구분은 유지한다.

## 1. 사용자 결정 (2026-09-22)

1. fork 원천은 attempt `session_id` 우선.
2. 해결 세션을 모니터링할 수 있어야 하고, Discord에서도 그 세션으로 연결 가능해야 한다.
3. Bead가 끝나면 세션도 끝내 Discord 스레드가 아카이브되게 한다. 종료 규칙은 **idle이면 `/exit`, 턴 중이면 턴이 끝난 뒤**.
4. 파킹·복구 대기의 문의 세션(자동 기동 포함)도 같은 투영·링크·종료 규칙에 넣는다.
5. Discord 링크 재료는 브리지가 `threads.json`에 URL을 기록하고 beads-ui는 읽기만 한다(dotfiles 유닛).

## 2. 접근 대안

- **A. 큐 레코드 + reconcile 소유 생존 (채택).** 기동 시 `interactive_sessions[bead_id]`를 durable로 쓰고, scheduler tick이 pane 생존·Bead 정산·종료를 판정한다. ADR 0021(review_session의 생존은 reconcile이 판정)과 같은 모양이라 재시작 뒤에도 pane 마커·pane id로 복구된다.
- **B. 무상태 — 매 decorate마다 tmux 마커를 읽어 파생.** 큐 스키마를 안 건드리지만 fanout마다 `tmux list-panes`를 돌려야 하고(ADR 0043: 투영은 동기 자식 프로세스를 띄우지 않는다), 세션 id·fork 여부·Discord 링크처럼 tmux에 없는 사실을 실을 곳이 없다. 기각.
- **C. 대화형 세션을 Worker attempt로 등록.** 슬롯·admission·usage 집계·정산 규칙이 전부 딸려오고, ADR 0005/0022의 「자동 수리 세션이 아니라 사람의 세션」 경계가 흐려진다. 기각.

## 3. 설계

### 3.1 fork 원천 — attempt 우선, 한 함수

`server/worker/session-ref.js`에 `qualifyInteractiveForkSource({ attempt, metadata, hostname, options })`를 둔다. `direction-inquiry.js` `forkTarget`(L480–541)의 규칙을 그대로 옮긴 것이고 두 런처가 같이 쓴다.

판정 순서와 결과:

| 순서 | 재료                                                                                       | 결과                                                                            |
| ---- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| 1    | 최신 implementation attempt(`isImplementationAttempt`)의 `runner`·`session_id`, transcript가 `local` | `{ session_id, provider: attempt.runner, source: 'attempt', fallback_reason: null }` |
| 2    | 1이 없거나 transcript 부재 → bd `session_ref` 마지막 항목(`qualifySessionFork(metadata, null)`)  | `{ session_id, provider, source: 'session_ref', fallback_reason: null }`         |
| 3    | 둘 다 아니면 fresh                                                                          | `{ session_id: null, provider, source: 'fresh', fallback_reason }`               |

- `fallback_reason`은 attempt가 있었으면 `attempt_transcript_missing`, 없었으면 `qualifySessionFork`의 사유(`no_session_ref`·`unsafe_session_id`·`not_local`). fresh의 provider는 attempt 러너 → `session_ref` provider → 현재 실행 설정 순(ADR 0046: 기록 provider 보존).
- `resolve-session.js` `forkTarget`은 이 함수 호출로 바뀌고, `resolve()` 입력에 큐 스냅샷의 최신 attempt를 넘긴다(핸들러 `handleWorkerResolveInSession`은 이미 `latest_attempt`를 찾는다). `direction-inquiry.js`의 자체 `forkTarget`은 이 함수를 호출하는 얇은 어댑터가 된다.
- 응답과 레코드에 `source`가 실린다. 토스트는 fresh일 때만 사유를 말하는 현행을 유지하되(§3.7의 배지가 fork를 말한다), 배지 툴팁이 `fork · attempt <attempt_id 짧게>` / `fork · session_ref` / `새 세션 · <fallback_reason>`을 말한다.

### 3.2 세션 id 부여 — 기동 시 UUID

claude 러너는 기동 argv에 `--session-id <uuid>`를 넣는다. `claude --help`와 바이너리 문자열로 확인한 규칙: `--session-id`는 `--resume`/`--continue`와 `--fork-session`이 함께 있을 때만 병용 가능하다.

| 모드  | argv                                                                   |
| ----- | ---------------------------------------------------------------------- |
| fork  | `claude --resume <src> --fork-session --session-id <uuid> <prompt>`    |
| fresh | `claude --session-id <uuid> <prompt>`                                  |
| codex | 현행 유지(`codex fork <src> <prompt>` / `codex <prompt>`), `session_id: null` |

`uuid`는 `crypto.randomUUID()`이고 런처 호출 전에 만들어 레코드(§3.3)와 argv에 같은 값을 쓴다. `forkArgs`/`forkCommand`가 인자를 하나 더 받는다. transcript 경로는 `resolveSessionFile({ provider:'claude', session_id, host })`가 cwd 슬러그 아래에서 찾는다(현행 로케이터, 변경 없음).

### 3.3 큐 레코드 `interactive_sessions`

`Queue`에 `interactive_sessions: Record<bead_id, InteractiveSession>`을 더한다. Bead당 하나(마커 「Bead당 살아 있는 세션 하나」와 같은 카디널리티).

```
InteractiveSession {
  bead_id, kind: 'resolve'|'inquiry',
  provider: 'claude'|'codex', session_id: string|null,
  mode: 'fork'|'fresh', source: 'attempt'|'session_ref'|'fresh',
  forked_from: string|null, fallback_reason: string|null,
  attempt_id: string|null,            // 문의 세션은 파킹 attempt, 해결 세션은 최신 implementation attempt
  failure_class: string|null,         // 해결 세션: resolveFailureContext의 클래스
  tmux_session, tmux_window, pane_id, cwd,
  launched_at, last_seen_alive_at,
  state: 'live'|'exiting', exit_requested_at: number|null, exit_reason: string|null
}
```

- **쓰기 지점.** `tmux-launcher.js` `launch`가 `pane_id`를 결과에 싣고(`new-window -P -F '#{pane_id}'` 값, 현재는 버린다), `resolve-session.js` `resolve()`와 `direction-inquiry.js`의 두 기동 경로(`launchForClick`·자동 기동 `dispose`)가 `launched`를 받은 직후 `queueStore().applyUnconditional`로 레코드를 쓴다. 기동이 `already_running`이면 레코드는 그대로다(레코드가 없는데 마커 pane이 살아 있으면 §3.4 복구가 채운다). 같은 write에 타임라인 `interactive_session` 이벤트(`summary: '해결 세션 시작 · fork attempt' 등`)를 남긴다.
- **정규화.** `normalizeQueue`에 분기를 두고 `emptyQueue()` 기본값 `{}`. 필수 필드가 깨진 레코드는 버린다(fail-quiet).
- **수명.** ADR 0027(queue.json은 진행 중인 것만): 세션이 끝나면 레코드를 **지우고** 타임라인에 `interactive_session` 종료 이벤트(`summary: '해결 세션 종료 · exit_sent'|'… pane_gone'|'… killed'`)만 남긴다. 클라이언트에는 살아 있는 동안만 보인다.
- **투영.** `decorateQueue`는 `interactive_sessions`를 그대로 내보내되 §3.5의 `discord_url`을 붙인다. `completion_intents`처럼 지우는 내부 필드가 아니다.

### 3.4 생존·정산·종료 — scheduler reconcile

`tickPass`에 `reconcileInteractiveSessions(workspace)`를 더한다(30초 poll). 추가로 `moveToDone`(queue-store L8734)과 `completeDiscardOperation`(L8506)의 호출자(`pr-actions.js` `closeCoveredRow`, `discard-coordinator.js` `driveOperation`)가 성공 직후 같은 pass를 한 번 즉시 부른다 — 30초 지연 없이 닫히게.

pass는 레코드마다 순서대로 판정한다.

1. **생존.** `listPanes(marker)`로 `pane_id`·마커 키가 같은 살아 있는 pane을 찾는다. 없으면 `pane_gone`으로 종료 처리(레코드 삭제·타임라인). tmux에 닿지 못하면(`tmux_unavailable`) 이번 pass는 판정하지 않는다(direction-inquiry의 FAIL-CLOSED 원칙).
2. **복구.** 레코드가 없는데 `@bdui_resolve_bead`/`@bdui_inquiry_bead` 마커 pane이 살아 있으면 `{ kind, bead_id, pane_id, tmux_window, session_id: null, source: 'unknown' }`으로 레코드를 만든다(서버 재시작·구버전 창). `session_id`가 없는 레코드는 서랍·Discord 링크 없이 배지만 그린다.
3. **정산 판정 `beadSettled(bead_id)`.** 다음 중 하나면 참: `queue.done`에 그 Bead의 행이 있다 · 그 Bead의 `discard_operations` 항목이 `phase:'done'`이다 · 워크스페이스 이슈 스냅샷의 `status`가 `closed`다. `abandoned` 폐기는 Bead를 이전 자리로 돌려놓으므로 정산이 아니다. 파킹 문의 세션은 파킹이 풀려 새 attempt가 돌더라도 Bead가 정산되기 전에는 닫지 않는다(문의가 구현을 finish까지 잇는 `impl_review_conflict:design`이 있다 — ADR 0036 §4).
4. **종료 (state `live` → `exiting`).** 정산이면 `tmux show-options -p -t <pane_id> -v @agent_running`을 읽는다. 값이 있으면 턴 중이므로 다음 pass로 미룬다. 없으면(idle) `tmux send-keys -t <pane_id> -l '/exit'` 뒤 `send-keys Enter`를 보내고 `state:'exiting'`, `exit_requested_at`을 쓴다. codex 러너는 `@agent_running` 재료가 없으므로 정산 뒤 `INTERACTIVE_EXIT_GRACE_MS`(90초)를 기다린 다음 6으로 간다.
5. **exiting 감시.** 다음 pass에서 pane이 죽어 있으면 `exit_sent`로 종료 처리. SessionEnd 훅이 `session_end`를 스풀에 넣고 브리지가 스레드를 아카이브한다 — beads-ui는 아카이브를 확인하지 않는다(브리지 소유, 관측 수단 없음).
6. **강제 종료.** `exiting`이 `INTERACTIVE_EXIT_GRACE_MS`를 넘겨도 pane이 살아 있으면 `tmux kill-window -t <tmux_session>:<tmux_window>`로 닫고 `killed`로 종료 처리한다. 이 경우 훅이 돌지 않아 스레드는 브리지의 부팅 스윕까지 남는다 — 타임라인 summary에 `스레드 아카이브 안 됨`을 적는다.

idle 판정의 한계: 사람이 입력창에 초안을 써 놓고 제출하지 않은 상태는 tmux 옵션으로 알 수 없다. `/exit`가 그 초안 뒤에 붙어 한 프롬프트로 제출될 수 있는데, 정산된 Bead의 세션이므로 잃는 것은 초안뿐이다. 이 위험은 §1의 결정에 포함된 것으로 두고 더 막지 않는다.

### 3.5 Discord 스레드 링크

- **브리지(dotfiles).** `bridge.py` `_get_thread`가 레코드를 쓸 때 `guild_id: thread.guild.id`와 `url: f"https://discord.com/channels/{guild_id}/{thread_id}"`를 함께 쓴다. 기존 레코드는 다음 send에서 `updated_epoch`를 갱신하는 자리(L524–527)에서 같은 두 필드를 채운다. 읽기 코드는 두 필드가 없어도 동작한다.
- **beads-ui.** `tmux-launcher.js`가 `heartbeat_path`를 만드는 것과 같은 기준(`deps.bridgeStateDir` 기본 `~/tmp/claude-discord-bridge/state`)으로 `threads.json`을 읽는 `readBridgeThreads()`를 둔다. mtime이 같으면 캐시를 돌려주고, 파일 부재·JSON 오류는 빈 맵이다. `decorateQueue`가 각 `interactive_sessions` 레코드의 `session_id`로 조회해 `url`이 있을 때만 `discord_url`을 붙인다. 파일은 300KB 남짓이므로 mtime 캐시면 fanout 비용은 stat 한 번이다.
- 브리지가 아직 스레드를 만들지 않았으면(첫 턴 전) 링크가 없고, 첫 턴이 끝난 다음 fanout부터 나타난다. threads.json은 브리지가 쓰고 beads-ui는 읽기만 한다 — 어느 쪽도 상대 파일을 만들지 않는다.

### 3.6 transcript 서랍 인가 확장

`server/ws/worker-handlers.js` `followSessionRefLog`(L3527–3611)는 지금 `(provider, session_id)`가 Bead의 `session_ref` metadata에 있어야 따라간다. 여기에 두 번째 인가 원천을 더한다: 큐 스냅샷 `interactive_sessions[bead_id]`의 `(provider, session_id)`와 같으면 통과. 그 밖의 경로(`resolveSessionFile` → `readSessionSnapshot` → tail)는 그대로다. 클라이언트는 `transcript-drawer.open({ attempt_id: 'session:<provider>:<session_id>', session_ref: { bead_id, provider, session_id } })`를 그대로 쓴다.

### 3.7 클라이언트 표면 (ADR 0014 슬롯 표)

| 요소                                    | 슬롯            | 재료                                                     | 클릭                                            |
| --------------------------------------- | --------------- | -------------------------------------------------------- | ----------------------------------------------- |
| `▤ 해결 세션` / `▤ 문의 세션` 상태 뱃지    | 1 정체성        | `interactive_sessions[bead_id]` 존재, `kind`              | `session_id`가 있으면 transcript 서랍, 없으면 없음 |
| 뱃지 꼬리 `· fork` / `· 새 세션`          | (뱃지 안)       | `mode`                                                   | 툴팁: §3.1 문구 + `tmux_session:tmux_window`      |
| `↗ Discord` 링크                         | 1 정체성 (뱃지 옆) | `discord_url`                                            | 새 탭                                            |
| `세션 닫는 중` 라벨                       | 1 조작 (경과 라벨 자리) | `state === 'exiting'`                                 | —                                               |

- 뱃지는 "어떤 상태인가"의 답이므로 슬롯 1 정체성이고, 실행 중 타일·PR 대기 행·파킹 타일·완료 행(정산 뒤 exiting 동안)에 같은 재료로 그린다. lane-model 한 경로가 사실 키를 접고 Worker·Monitor가 같은 것을 그린다(UI-mfm1).
- 레코드가 살아 있는 동안 `[세션에서 해결]` 버튼은 그리지 않는다. ADR 0036 §2의 「살아 있는 문의 세션이 있으면 그 창을 가리킨다」는 뱃지로 구현된 것이고, 서버 핸들러의 `already_running` 응답은 낡은 화면의 클릭을 위해 그대로 둔다. `tileResolveFields` 문구 「…살아 있는 문의 세션이 있으면 그 창을 가리킵니다」는 뱃지가 그 사실을 말하므로 삭제한다.
- 세션이 끝나면 레코드가 사라지고 뱃지도 사라진다. 이력은 타임라인(`get-bead-timeline`)이 갖는다.
- 문의 세션의 자동 기동 알림(`awaitingUser`)과 해결 세션의 응답 형식은 바꾸지 않는다.

### 3.8 프롬프트 한 줄

`buildResolvePrompt`와 문의 프롬프트의 공통 안내 줄(2026-09-21 §4.7의 「이 세션은 Worker attempt를 이어받은 승계 세션이다 …」) 뒤에 한 문장을 더한다:
「이 Bead가 머지·close·폐기로 정산되면 Worker가 이 세션에 `/exit`를 보내 닫고 Discord 스레드는 아카이브된다.」 문의 프롬프트 본문은 dotfiles가 소유하고 beads-ui가 바이트 복사를 다이제스트로 고정하므로(ADR 0036 §1) 이 줄은 **다이제스트 밖의 beads-ui 접미**로 붙인다 — 프롬프트 상수는 바뀌지 않는다.

### 3.9 dotfiles 정정 — 계약 문구와 브리지

한 개의 enclosed foreign unit(dotfiles rig)으로 같은 Bead에서 처리한다. 계약 문구는 승인 시점에 바이트가 정해져야 하므로 여기 적는다.

**`docs/contracts/workflow-contract.md` Needs-human re-entry 절**, 현행:

> `[세션에서 해결]` resumes the recorded `session_ref` session with `--resume` and relays it over Discord through `claude-discord-bridge`, taking `--fork-session` when the original session must be preserved or run in parallel and a fresh session plus a notes-lineage citation only when resume is impossible; …

정정:

> `[세션에서 해결]` resumes the recorded session with `--resume` — the latest implementation attempt's runner session when its transcript is local, else the last `session_ref` entry — and relays it over Discord through `claude-discord-bridge`, taking `--fork-session` when the original session must be preserved or run in parallel and a fresh session plus a notes-lineage citation only when neither source resolves; …

**`docs/contracts/workflow-state.yaml` `needs_human_reentry.actions.resolve_in_session`**: `resume: recorded_session_ref_with_resume_flag` → `resume: attempt_runner_session_else_session_ref_last_with_resume_flag`. 파킹 문의의 현행 구현(attempt 우선)과 같은 규칙이라 다른 소비자의 동작은 바뀌지 않는다. beads-ui의 핀 사본에 이 키가 있으면 재발행한다(없으면 무관).

**브리지 `src/claude/scripts/discord-bridge/bridge.py`**: §3.5의 `guild_id`·`url` 두 필드. 테스트는 브리지의 기존 단위 테스트 패턴을 따른다.

## 4. 오류 처리·복구

| 상황                                        | 처리                                                                                              |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 기동은 됐는데 레코드 쓰기 실패               | 다음 pass의 복구(§3.4-2)가 마커 pane에서 레코드를 재구성한다(`session_id` 없이).                    |
| 서버 재시작                                   | 레코드는 durable. 첫 pass가 pane 생존을 다시 판정한다.                                              |
| tmux 서버 죽음                                | `tmux_unavailable` — 판정 보류. 사람이 tmux를 되살리면 다음 pass가 `pane_gone`으로 정리한다.         |
| `/exit`를 보냈는데 세션이 안 죽음(권한 프롬프트 등) | 90초 뒤 `kill-window`, 타임라인에 `스레드 아카이브 안 됨`.                                          |
| threads.json 없음·손상·필드 부재              | 링크 생략(fail-quiet).                                                                             |
| `--session-id` 충돌(같은 uuid 재사용)         | 발생하지 않는다 — 기동마다 새 UUID.                                                                 |
| Bead 정산 뒤 사람이 그 창에서 다른 일을 시작   | `@agent_running` 동안 미루고 턴이 끝나면 닫는다(§1-3 결정). 그 창에서 새 Bead 작업을 잇는 것은 지원 범위가 아니다. |

## 5. 테스트 범위

- `session-ref.test.js`: `qualifyInteractiveForkSource` 순서(attempt local → session_ref → fresh), `fallback_reason` 4종, provider 승계.
- `resolve-session.test.js`: fork argv에 `--resume … --fork-session --session-id`, fresh argv에 `--session-id`, 레코드 write 호출, 프롬프트 접미 줄.
- `direction-inquiry.test.js`: 두 기동 경로가 레코드를 쓰고 `already_running`이면 쓰지 않는다.
- `tmux-launcher.test.js`: 결과에 `pane_id`, `readBridgeThreads` mtime 캐시·손상 파일.
- `queue-store.test.js`: `interactive_sessions` 정규화·빈 기본값·깨진 레코드 폐기.
- `scheduler.*.test.js`: reconcile 상태기계 — `pane_gone`·idle→`/exit`·`@agent_running` 연기·`exiting` 타임아웃→`kill-window`·복구(마커 pane, 레코드 없음)·`beadSettled` 세 조건·`abandoned` 비정산; `moveToDone`/폐기 완료 직후 즉시 pass.
- `worker-handlers.*.test.js`: 서랍 인가가 `interactive_sessions`로도 통과, `decorateQueue`가 `discord_url`을 붙인다.
- 클라이언트 `lane-model`·`lanes`·`running-grid`·`index`·`monitor` 테스트: 뱃지·링크·`세션 닫는 중`·버튼 숨김(레코드 있을 때)·서랍 open 인자.
- 브리지(dotfiles): 레코드에 `guild_id`·`url`, 구 레코드 백필.
- 검증 절차는 AGENTS.md Pre-Handoff Validation.

## 6. 구현 unit 후보

- unit-a `server/worker/session-ref.js`·`resolve-session.js`·`direction-inquiry.js`·`tmux-launcher.js` — fork 원천·session id·pane_id·레코드 write·프롬프트 접미.
- unit-b `server/worker/queue-store.js`·`scheduler.js`·`pr-actions.js`·`discard-coordinator.js`·`server/ws/worker-handlers.js` — 스키마·reconcile 상태기계·서랍 인가·`discord_url` 투영.
- unit-c `app/views/**` — 뱃지·링크·버튼 숨김·서랍 배선(Worker·Monitor).
- foreign unit dotfiles — 계약 문구 2곳·브리지 2필드(§3.9).

## 경계·후속

- 크로스 리포 unit: dotfiles — `docs/contracts/workflow-contract.md`·`workflow-state.yaml`의 `resolve_in_session` 재개 원천 문구 정정과 `src/claude/scripts/discord-bridge/bridge.py`의 threads.json `guild_id`·`url` 기록(§3.9). 같은 Bead의 enclosed foreign unit이며 이 저장소의 구현이 먼저 착지해도 링크만 비어 있다(fail-quiet).
- 관찰: codex 러너 세션의 id·서랍·Discord 링크 — `codex fork`가 새 id를 돌려주지 않아 재료가 없다. 필요해지면 codex 세션 파일 탐색 규칙을 따로 설계한다.
- 관찰: 수동 `[세션 닫기]` — 요청 없음. 정산 전 닫아야 하는 경우가 실측되면 슬롯 1 조작으로 단다.
- 관찰: 첫 클릭(07:21) 기동 실패의 원인 로그 부재 — `worker:resolve-session` debug 로거가 꺼져 있어 확정하지 못했다. 기동 실패는 이제 타임라인 `user_action` 옆에 결과가 남으므로(§3.3 이벤트) 재발 시 읽을 수 있다.

## 결정 (ADR 후보)

- 전제: ADR 0036 — 파킹 출구는 문의 세션뿐이고 `[세션에서 해결]`은 살아 있는 세션을 가리킨다; 가리킴을 뱃지로 구현한다.
- 전제: ADR UI-a5l2-2 — 복구 대기의 출구는 문의 세션이며 잔재는 자동 처분한다; 대화형 세션 잔재의 처분이 여기 더해진다.
- 전제: ADR 0027 — queue.json은 진행 중 상태만, 이력은 events.jsonl; 종료된 세션 레코드는 지우고 타임라인에 남긴다.
- 전제: ADR 0021 — 세션 생존·정산 시작은 scheduler reconcile이 판정한다; 대화형 세션도 같은 소유.
- 전제: ADR 0014 — 새 뱃지·링크·라벨은 슬롯 표에 먼저 자리를 정한다(§3.7).
- 전제: ADR 0012 — beads-ui는 계약의 소비자다; 재개 원천 문구는 dotfiles에서 정정한다(§3.9).
- 전제: ADR 0046 — 세션 재개는 기록된 provider를 보존한다.
- 전제: ADR 0043 — 투영은 동기 자식 프로세스를 띄우지 않는다; 생존 판정은 reconcile에서만 tmux를 부른다.
- beads-ui가 띄운 대화형 세션(해결·문의)은 큐의 `interactive_sessions` 레코드로 투영되고 생존·종료는 scheduler reconcile이 소유하며, fork 원천은 attempt 러너 세션 → `session_ref` → fresh 순이고, Bead 정산 시 idle pane에 `/exit`를 보내 SessionEnd 훅이 Discord 스레드를 아카이브하게 한다 — 되돌리기 어렵고(큐 스키마·계약 문구·브리지 레코드가 함께 바뀜), 여러 표면(런처 둘·서랍·Worker·Monitor·브리지)에 걸치며, 맥락 없이 보면 「닫힌 Bead의 세션이 저절로 끝난다」가 놀랍다. `summary`: "beads-ui가 띄운 대화형 세션은 큐 레코드로 투영되고 생존·종료는 reconcile이 소유하며, fork 원천은 attempt 세션 → session_ref → fresh 순이고, Bead 정산 시 idle pane에 /exit를 보내 SessionEnd 훅이 Discord 스레드를 아카이브하게 한다" → ADR
