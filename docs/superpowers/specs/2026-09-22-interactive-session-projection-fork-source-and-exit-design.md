---
scope:
  - server/worker/
  - server/ws/
  - app/views/worker/
  - app/views/monitor/
---

# `[세션에서 해결]`은 attempt 세션을 fork하고, 대화형 세션은 큐에 투영돼 서랍·Discord 스레드로 이어지며, Bead가 끝나면 `/exit`로 닫혀 스레드가 아카이브된다

Bead: `UI-6pif` · route: `spec_backed` · 작성일: 2026-09-22 · 사용자 결정: §1 · 선행: `dotfiles-na5v`(foreign `blocks`, §3.9)

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
3. **종료가 없다.** `server/worker/tmux-launcher.js`는 `{ listPanes, launch, bridgeActive }`만 내보내고 pane 마커는 `(marker, key)` 단위의 중복 기동 방지만 한다. Discord 브리지는 SessionEnd 훅의 `session_end` 스풀 이벤트로만 스레드를 아카이브하므로, 창이 남으면 스레드도 남는다. 창이 훅 없이 죽으면(kill·크래시) manifest가 `ended`가 되지 않아 브리지의 부팅 스윕도 그 스레드를 건너뛴다.

### 0.2 목표

- `[세션에서 해결]`이 Worker attempt의 기록 세션을 fork한다(attempt 우선 → `session_ref` → fresh).
- beads-ui가 띄운 **대화형 세션**(해결 세션·문의 세션, claude·codex 러너 모두)은 큐 스냅샷의 레코드로 투영돼 그 Bead의 행·타일에 열림 상태가 보이고, transcript 서랍으로 진행을 읽으며, Discord 스레드 링크로 이어진다.
- 그 Bead가 정산되면(머지·close·폐기 완료) Worker가 세션을 종료하고, 브리지가 스레드를 아카이브한다 — 정상 종료(`/exit` → SessionEnd)와 강제 종료(pane 소멸 → 브리지 dead-pane 스윕) 어느 쪽이든.

### 0.3 비목표

- 자동 완료(수정 push → 자동 재검증·머지)는 바꾸지 않는다 — 2026-09-15 「사람 확인 최소화」 방향.
- 수동 `[세션 닫기]` 조작은 두지 않는다(요청 없음; 서랍·tmux·Discord에서 사람이 직접 `/exit` 가능).
- 브리지의 스레드 생성 시점(첫 Stop/question 이벤트)은 바꾸지 않는다. 링크는 세션의 첫 턴이 끝난 뒤 나타난다.
- `[세션에서 해결]` 버튼의 자리·문구·서버 `already_running` 응답(ADR 0036 §2, UI-a5l2-2 §3)과, 파킹/복구에서 문의 세션을·그 밖 실패에서 해결 세션을 띄우는 이중 분기(2026-09-03 §3.3)와 두 마커의 구분은 바꾸지 않는다.
- codex 러너 세션에 슬래시 종료 명령을 보내지 않는다(검증된 명령이 없다). codex는 idle 판정 뒤 `kill-window`로 닫고 스레드 아카이브는 브리지 dead-pane 스윕이 맡는다.

## 1. 사용자 결정 (2026-09-22)

1. fork 원천은 attempt `session_id` 우선.
2. 해결 세션을 모니터링할 수 있어야 하고, Discord에서도 그 세션으로 연결 가능해야 한다.
3. Bead가 끝나면 세션도 끝내 Discord 스레드가 아카이브되게 한다. 종료 규칙은 **idle이면 `/exit`, 턴 중이면 턴이 끝난 뒤**.
4. 파킹·복구 대기의 문의 세션(자동 기동 포함)도 같은 투영·링크·종료 규칙에 넣는다.
5. Discord 링크 재료는 브리지가 `threads.json`에 URL을 기록하고 beads-ui는 읽기만 한다(dotfiles 유닛).

## 2. 접근 대안

- **A. 큐 레코드 + reconcile 소유 생존 (채택).** 기동 시 `interactive_sessions` 레코드를 durable로 쓰고, scheduler tick이 pane 생존·정산·종료를 판정한다. ADR 0021(review_session의 생존은 reconcile이 판정)과 같은 모양이라 재시작 뒤에도 pane 마커·pane id로 복구된다. 비용: 큐 스키마 한 키와 상태기계 하나.
- **B. 무상태 — 매 decorate마다 tmux 마커를 읽어 파생.** 큐 스키마를 안 건드리지만 fanout마다 `tmux list-panes`를 돌려야 하고(ADR 0043: 투영은 동기 자식 프로세스를 띄우지 않는다), 세션 id·fork 여부·정산 시각처럼 tmux에 없는 사실을 실을 곳이 없다. 기각.
- **C. 대화형 세션을 Worker attempt로 등록.** 슬롯·admission·usage 집계·정산 규칙이 전부 딸려오고, ADR 0005/0022의 「자동 수리 세션이 아니라 사람의 세션」 경계가 흐려진다. 기각.

## 3. 설계

### 3.1 fork 원천 — attempt 우선, 한 함수

`server/worker/session-ref.js`에 `qualifyInteractiveForkSource({ attempt, metadata, hostname, options })`를 둔다. `direction-inquiry.js` `forkTarget`(L480–541)의 규칙을 그대로 옮긴 것이고 두 런처가 같이 쓴다.

| 순서 | 재료                                                                                       | 결과                                                                            |
| ---- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| 1    | 최신 implementation attempt(`isImplementationAttempt`)의 `runner`·`session_id`, transcript가 `local` | `{ session_id, provider: attempt.runner, source: 'attempt', fallback_reason: null }` |
| 2    | 1이 없거나 transcript 부재 → bd `session_ref` 마지막 항목(`qualifySessionFork(metadata, null)`)  | `{ session_id, provider, source: 'session_ref', fallback_reason: null }`         |
| 3    | 둘 다 아니면 fresh                                                                          | `{ session_id: null, provider, source: 'fresh', fallback_reason }`               |

- `fallback_reason`은 attempt가 있었으면 `attempt_transcript_missing`, 없었으면 `qualifySessionFork`의 사유(`no_session_ref`·`unsafe_session_id`·`not_local`). fresh의 provider는 attempt 러너 → `session_ref` provider → 현재 실행 설정 순(ADR 0046: 기록 provider 보존).
- `resolve-session.js` `forkTarget`은 이 함수 호출로 바뀌고, `resolve()` 입력에 큐 스냅샷의 최신 attempt를 넘긴다(핸들러 `handleWorkerResolveInSession`은 이미 `latest_attempt`를 찾는다). `direction-inquiry.js`의 자체 `forkTarget`은 이 함수를 호출하는 얇은 어댑터가 된다.
- 응답과 레코드에 `source`가 실린다. 토스트는 fresh일 때만 사유를 말하는 현행을 유지하고(§3.7의 뱃지가 fork를 말한다), 뱃지 툴팁이 `fork · attempt <attempt_id 짧게>` / `fork · session_ref` / `새 세션 · <fallback_reason>`을 말한다.
- 이 순서는 dotfiles 계약 `resolve_in_session.resume`의 정정(`dotfiles-na5v`, §3.9)과 같은 문장이다.

### 3.2 세션 id — claude는 기동 시 UUID, codex는 pane 옵션에서

claude 러너는 기동 argv에 `--session-id <uuid>`를 넣는다. `claude --help`와 바이너리 문자열로 확인한 규칙: `--session-id`는 `--resume`/`--continue`와 `--fork-session`이 함께 있을 때만 병용 가능하다.

| 러너·모드      | argv                                                                | `session_id` 출처                                        |
| -------------- | ------------------------------------------------------------------- | -------------------------------------------------------- |
| claude · fork  | `claude --resume <src> --fork-session --session-id <uuid> <prompt>` | 기동 전 `crypto.randomUUID()` (레코드와 argv에 같은 값)   |
| claude · fresh | `claude --session-id <uuid> <prompt>`                               | 같음                                                     |
| codex · fork   | `codex fork <src> <prompt>` (현행)                                  | 기동 직후 `null`; reconcile이 pane 옵션 `@agent_session`을 읽어 채운다 |
| codex · fresh  | `codex <prompt>` (현행)                                             | 같음                                                     |

codex 러너의 pane 옵션은 dotfiles `src/codex/hooks/codex-notifier-service.py`가 세션마다 `@agent_runtime=codex`·`@agent_session=<sid>`·`@agent_running`·`@agent_attention`으로 투영한다. reconcile(§3.4-1)은 `session_id`가 `null`인 레코드마다 `tmux show-options -pqv -t <pane_id> @agent_session`을 읽어 값이 있으면 레코드에 쓴다(`session_id_source: 'pane_option'`). transcript 경로는 두 러너 모두 현행 `resolveSessionFile({ provider, session_id, host })`가 찾는다(claude는 cwd 슬러그 아래, codex는 rollout 디렉터리).

### 3.3 큐 레코드 `interactive_sessions`

`Queue`에 `interactive_sessions: Record<record_key, InteractiveSession>`을 더한다. `record_key`는 `<bead_id>:<kind>` — 런처의 중복 방지가 `(marker, key)` 단위라 같은 Bead에 해결 세션과 문의 세션이 동시에 살 수 있고, 그 둘을 모두 기록·관측·종료한다.

```
InteractiveSession {
  bead_id, kind: 'resolve'|'inquiry',
  provider: 'claude'|'codex',
  session_id: string|null, session_id_source: 'launch'|'pane_option'|null,
  mode: 'fork'|'fresh'|null, source: 'attempt'|'session_ref'|'fresh'|'recovered',
  forked_from: string|null, fallback_reason: string|null,
  attempt_id: string|null,            // 문의 세션은 파킹 attempt, 해결 세션은 최신 implementation attempt
  failure_class: string|null,         // 해결 세션: resolveFailureContext의 클래스
  tmux_session, tmux_window, pane_id, cwd,
  launched_at, last_seen_alive_at,
  settled_at: number|null, settled_by: 'done'|'discard'|'bd_closed'|null,
  state: 'live'|'exiting', exit_requested_at: number|null, defer_since: number|null
}
```

- **공개 store 메서드.** `queue-store.js`가 `recordInteractiveSession(workspace, record)`·`updateInteractiveSession(workspace, key, patch)`·`removeInteractiveSession(workspace, key)`·`markInteractiveSessionsSettled(workspace, bead_id, settled_by)`를 내보내고, 내부에서 기존 `applyUnconditional`로 쓴다. 클라이언트 CAS op는 없다(모두 서버 소유 write).
- **쓰기 지점.** `tmux-launcher.js` `launch`가 `pane_id`를 결과에 싣고(`new-window -P -F '#{pane_id}'` 값, 현재는 버린다), `resolve-session.js` `resolve()`와 `direction-inquiry.js`의 두 기동 경로(`launchForClick`·자동 기동 `dispose`)가 `launched`를 받은 직후 `recordInteractiveSession`을 부른다. `already_running`이면 쓰지 않는다(레코드가 없는데 마커 pane이 살아 있으면 §3.4-2 복구가 채운다).
- **타임라인.** `server/worker/bead-timeline.js` `TIMELINE_KINDS`에 `interactive_session`을 더한다. `event_id`는 작성기 규칙 `<kind>:<bead_id>:<seq>`를 따르고 `seq`는 `<kind_of_session>:<launched_at>:<started|ended>`다(예: `interactive_session:UI-7nhi:resolve:1790030288074:started`). summary는 시작 `해결 세션 시작 · fork attempt` / `문의 세션 시작 · 새 세션 (no_session_ref)`, 종료 `해결 세션 종료 · exit_sent` / `… pane_gone` / `… killed`.
- **정규화.** `normalizeQueue`에 분기를 두고 `emptyQueue()` 기본값 `{}`. 필수 필드는 `bead_id`·`kind`·`provider`·`pane_id`·`tmux_session`·`tmux_window`·`launched_at`·`state`이고 나머지는 nullable이다. 필수 필드가 깨진 레코드는 버린다(fail-quiet). §3.4-2의 복구 레코드는 필수 필드를 전부 채우므로 정규화를 통과한다.
- **수명.** ADR 0027(queue.json은 진행 중인 것만): 세션이 끝나면 레코드를 지우고 타임라인 종료 이벤트만 남긴다. 클라이언트에는 살아 있는 동안만 보이고, 끝난 세션의 이력은 `get-bead-timeline`이 갖는다.
- **투영.** `decorateQueue`는 `interactive_sessions`를 그대로 내보내되 §3.5의 `discord_url`을 붙인다. `completion_intents`처럼 지우는 내부 필드가 아니다.

### 3.4 생존·정산·종료 — scheduler reconcile

`tickPass`에 `reconcileInteractiveSessions(workspace)`를 더한다(30초 poll). 상수는 `INTERACTIVE_EXIT_GRACE_MS = 90_000`(exit 요청 뒤 pane 소멸 대기), `INTERACTIVE_EXIT_DEFER_MAX_MS = 1_800_000`(idle을 기다리는 상한).

**정산 write(트리거).** 정산은 정적 상태의 술어가 아니라 전이 시점의 write다 — 과거의 `done` 행이나 완료된 백업 작업이 살아 있는 문의 세션을 닫지 않게.

| 전이                                                          | 호출자                                                                                   | write                                                    |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| 머지·배포 뒤 Bead가 `done`으로 이동                            | `pr-actions.js` `closeCoveredRow` 등 `moveToDone` 호출자, `moveToDone` 성공 직후          | `markInteractiveSessionsSettled(ws, bead_id, 'done')`     |
| 폐기 작업 완료 — `kind`가 `stale_work_backup_fresh`가 **아닌** 것 | `discard-coordinator.js` `driveOperation`의 `completeDiscardOperation` 호출 세 곳 중 해당 분기 | `markInteractiveSessionsSettled(ws, bead_id, 'discard')`  |
| 워크스페이스 이슈 스냅샷에서 그 Bead의 `status === 'closed'` 관측 | reconcile pass 1단계(세션 소유 quick_fix close·수동 close를 잡는 안전망)                  | `markInteractiveSessionsSettled(ws, bead_id, 'bd_closed')` |

`abandoned` 폐기와 `stale_work_backup_fresh` 완료는 정산이 아니다(Bead가 이전 자리로 돌아가거나 새 attempt가 이어진다). 파킹 문의 세션은 파킹이 풀려 새 attempt가 돌더라도 정산 write가 없으면 닫지 않는다(문의가 구현을 finish까지 잇는 `impl_review_conflict:design` — ADR 0036 §4). 두 호출자는 정산 write 직후 `reconcileInteractiveSessions`를 한 번 즉시 부른다 — 30초 지연 없이 닫히게.

**pass.** 레코드마다 순서대로:

1. **생존.** `listPanes(marker)`로 `pane_id`·마커 키가 같은 살아 있는 pane을 찾는다. 없으면 이전 `state`로 가른다: `exiting`이면 `exit_sent`, `live`면 `pane_gone` — 둘 다 레코드 삭제·타임라인 종료 이벤트. tmux에 닿지 못하면(`tmux_unavailable`) 이번 pass는 아무것도 판정하지 않는다(direction-inquiry의 FAIL-CLOSED 원칙). 살아 있으면 `last_seen_alive_at`을 쓰고, `session_id`가 `null`이면 `@agent_session`을 읽어 채운다(§3.2).
2. **복구.** 레코드가 없는데 `@bdui_resolve_bead`/`@bdui_inquiry_bead` 마커 pane이 살아 있으면(서버 재시작 전 기동·구버전 창) `listPanes`의 확장 포맷(`#{session_name}:#{window_name}:#{pane_id}:#{pane_dead}:#{pane_current_path}:#{@agent_runtime}:#{마커}`)에서 레코드를 만든다: `kind`는 마커에서, `bead_id`는 마커 값, `provider`는 `@agent_runtime`이 `codex`면 `codex` 아니면 `claude`, `tmux_session`·`tmux_window`·`pane_id`·`cwd`는 포맷 값, `launched_at`은 지금, `state: 'live'`, `source: 'recovered'`, `mode`·`session_id`·`attempt_id`·`failure_class`는 `null`. 종료 대상 지정(`pane_id`·`tmux_session:tmux_window`)이 이 레코드에 있으므로 종료 분기는 다른 레코드와 같다.
3. **종료 진입 (`state: 'live'` ∧ `settled_at`).** idle 술어를 판정한다:
   - `@agent_running`이 비어 있고,
   - `@agent_attention`이 비어 있거나 `done`·`stopped`이며(`question`·`plan`·`limit`은 대화상자·제한 대기 — 미룬다; `stop-hook.sh`·`codex-notifier-service.py`가 이 옵션을 그렇게 쓴다),
   - claude 러너는 `tmux capture-pane -p -t <pane_id>`의 마지막 비공백 줄이 프롬프트 표시(`❯`)로 시작하고 그 뒤가 비어 있다(기본 입력창이 비어 있음 — 초안이나 대화상자 위에 `/exit`를 얹지 않기 위해). codex 러너는 이 줄 검사를 하지 않는다(다음 항목의 `kill-window`라 입력창에 글자를 넣지 않는다).
   idle이면: claude는 `tmux send-keys -t <pane_id> -l '/exit'` 뒤 `tmux send-keys -t <pane_id> Enter`를 보내고 `state:'exiting'`·`exit_requested_at`을 쓴다. codex는 곧바로 `tmux kill-window -t <tmux_session>:<tmux_window>` 뒤 `killed`로 종료 처리한다. idle이 아니면 `defer_since`(처음 미룬 시각)를 쓰고 다음 pass로 넘긴다.
4. **미룸 상한.** `defer_since`가 `INTERACTIVE_EXIT_DEFER_MAX_MS`를 넘기면 대화상자·진행 중 턴과 무관하게 `kill-window`로 닫고 `killed`로 종료 처리한다. 정산된 Bead의 세션이 30분 넘게 사람 입력을 기다리는 상태라 잃는 것은 그 대기뿐이다.
5. **exiting 감시.** `exiting`인 채 pane이 `INTERACTIVE_EXIT_GRACE_MS`를 넘겨 살아 있으면(권한 프롬프트 등이 `/exit`를 삼킨 경우) `kill-window`로 닫고 `killed`로 종료 처리한다. pane이 죽었으면 1단계가 `exit_sent`로 처리한다.

**스레드 아카이브의 소유.** `/exit`로 끝난 세션은 SessionEnd 훅이 `session_end`를 스풀에 넣어 브리지가 스레드를 아카이브한다. `kill-window`·크래시로 끝난 세션은 훅이 돌지 않으므로, 브리지의 dead-pane 스윕(`dotfiles-na5v`: manifest의 `tmux_pane`이 죽어 있으면 `ended:true`를 쓰고 아카이브, 60초 주기)이 맡는다. beads-ui는 아카이브를 확인하지 않는다(브리지 소유, 관측 수단 없음) — 종료 이벤트 summary에 `exit_sent`/`killed`만 적는다.

### 3.5 Discord 스레드 링크

- **브리지(dotfiles, `dotfiles-na5v`).** `bridge.py` `_get_thread`가 레코드를 쓸 때 `guild_id: thread.guild.id`와 `url: https://discord.com/channels/<guild_id>/<thread_id>`를 함께 쓴다. 기존 레코드는 다음 send에서 `updated_epoch`를 갱신하는 자리(L524–527)에서 같은 두 필드를 채운다. 읽기 코드는 두 필드가 없어도 동작한다.
- **beads-ui.** `tmux-launcher.js`가 `heartbeat_path`를 만드는 것과 같은 기준(`deps.bridgeStateDir` 기본 `~/tmp/claude-discord-bridge/state`)으로 `threads.json`을 읽는 `readBridgeThreads()`를 둔다. mtime이 같으면 캐시를 돌려주고, 파일 부재·JSON 오류는 빈 맵이다. `decorateQueue`가 각 `interactive_sessions` 레코드의 `session_id`로 조회해 `url`이 있을 때만 `discord_url`을 붙인다. 파일은 300KB 남짓이므로 mtime 캐시면 fanout 비용은 stat 한 번이다.
- 브리지가 아직 스레드를 만들지 않았으면(첫 턴 전) 링크가 없고, 첫 턴이 끝난 다음 fanout부터 나타난다. `dotfiles-na5v`가 착지·배포되기 전에는 `url`이 없어 링크가 비어 있다(fail-quiet). threads.json은 브리지가 쓰고 beads-ui는 읽기만 한다.

### 3.6 transcript 서랍 인가 확장

`server/ws/worker-handlers.js` `followSessionRefLog`(L3527–3611)는 지금 `(provider, session_id)`가 Bead의 `session_ref` metadata에 있어야 따라간다. 여기에 두 번째 인가 원천을 더한다: 큐 스냅샷 `interactive_sessions`에 같은 `bead_id`·`provider`·`session_id`의 레코드가 있으면 통과. 그 밖의 경로(`resolveSessionFile` → `readSessionSnapshot` → tail)는 그대로다. 클라이언트는 `transcript-drawer.open({ attempt_id: 'session:<provider>:<session_id>', session_ref: { bead_id, provider, session_id } })`를 그대로 쓴다.

### 3.7 클라이언트 표면 (ADR 0014 슬롯 표)

| 요소                                        | 슬롯                    | 재료                                                | 클릭                                              |
| ------------------------------------------- | ----------------------- | --------------------------------------------------- | ------------------------------------------------- |
| `▤ 해결 세션` / `▤ 문의 세션` 상태 뱃지        | 1 정체성                | 그 Bead의 `interactive_sessions` 레코드, `kind`      | `session_id`가 있으면 transcript 서랍, 없으면 없음  |
| 뱃지 꼬리 `· fork` / `· 새 세션` / `· 복구`   | (뱃지 안)               | `mode`·`source`                                     | 툴팁: §3.1 문구 + `tmux_session:tmux_window`         |
| `↗ Discord` 링크                             | 1 정체성 (뱃지 옆)       | `discord_url`                                       | 새 탭                                              |
| `세션 닫는 중` 라벨                           | 1 조작 (경과 라벨 자리)  | `state === 'exiting'` 또는 `settled_at`이 있는 `live` | —                                                 |

- 뱃지는 "어떤 상태인가"의 답이므로 슬롯 1 정체성이고, 실행 중 타일·PR 대기 행·파킹 타일·완료 행(정산 뒤 종료까지) 어디든 같은 재료로 그린다. 레코드가 둘이면 뱃지도 둘이다. lane-model 한 경로가 사실 키를 접고 Worker·Monitor가 같은 것을 그린다(UI-mfm1).
- `[세션에서 해결]` 버튼은 현행 그대로 그린다(ADR 0036 §2·UI-a5l2-2 §3의 카드 조작). 살아 있는 세션이 있을 때의 클릭은 서버가 `already_running`으로 답하고 토스트 「이미 열려 있습니다 · <창>」이 뜬다 — 지금과 같다. 뱃지는 그 사실을 클릭 전에 보여 주는 추가 표면이다.
- 세션이 끝나면 레코드가 사라지고 뱃지도 사라진다. 이력은 타임라인(`get-bead-timeline`)이 갖는다.
- 문의 세션의 자동 기동 알림(`awaitingUser`)과 해결 세션의 응답 형식은 바꾸지 않는다.

### 3.8 프롬프트 한 줄

`buildResolvePrompt`와 문의 프롬프트의 공통 안내 줄(2026-09-21 §4.7의 「이 세션은 Worker attempt를 이어받은 승계 세션이다 …」) 뒤에 한 문장을 더한다:
「이 Bead가 머지·close·폐기로 정산되면 Worker가 이 세션을 닫고(claude: `/exit`) Discord 스레드는 아카이브된다.」 문의 프롬프트 본문은 dotfiles가 소유하고 beads-ui가 바이트 복사를 다이제스트로 고정하므로(ADR 0036 §1) 이 줄은 **다이제스트 밖의 beads-ui 접미**로 붙인다 — 프롬프트 상수는 바뀌지 않는다.

### 3.9 선행 dotfiles 유닛 — `dotfiles-na5v` (target-rig quick_fix, foreign `blocks`)

계약과 브리지는 dotfiles가 정의자다(ADR 0012). dotfiles rig에 quick_fix Bead `dotfiles-na5v`를 만들고 이 Bead가 그것에 `blocks`로 의존한다 — 구현 진입만 막고 이 스펙의 저작·게이트는 진행한다(ADR 0020). 내용은 그 Bead 본문이 정본이고 여기서는 이 스펙이 전제하는 세 가지만 적는다.

| 항목            | 내용                                                                                                                                                                                                                                       |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 계약 문구       | `docs/contracts/workflow-contract.md` Needs-human re-entry 절의 `[세션에서 해결]` 문장: 재개 원천을 「the latest implementation attempt runner session when its transcript is local, else the last `session_ref` entry」로, fresh 조건을 「only when neither source resolves」로. `workflow-state.yaml` `resolve_in_session.resume: attempt_runner_session_else_session_ref_last_with_resume_flag`. |
| 브리지          | `threads.json` 레코드에 `guild_id`·`url`(§3.5); 60초 주기 dead-pane 스윕이 manifest `tmux_pane`이 죽은 세션을 `ended:true`로 쓰고 스레드를 아카이브(§3.4).                                                                                       |
| 착지·배포 확인  | dotfiles `origin/main`에 착지한 SHA를 `bd show dotfiles-na5v --json`의 `exec_receipt`로 읽고, 런타임 사본 `~/.claude/scripts/discord-bridge/bridge.py`에 `guild_id`가 있으며 브리지 재시작 뒤 heartbeat가 갱신되는 것을 `dotfiles-na5v`의 완료 보고서가 확인한다. |

이 Bead의 구현은 `dotfiles-na5v`가 `closed`가 되어 `bd ready`에 다시 오를 때 들어간다. 그 전에 beads-ui 코드가 착지하면 링크만 비어 있고(fail-quiet) 강제 종료된 세션의 스레드가 스윕 배포 전까지 남는다 — 그래서 `blocks`다.

## 4. 오류 처리·복구

| 상황                                                   | 처리                                                                                                       |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| 기동은 됐는데 레코드 쓰기 실패                          | 다음 pass의 복구(§3.4-2)가 마커 pane에서 레코드를 재구성한다(`source: 'recovered'`, `session_id`는 codex면 pane 옵션에서, claude면 없음). |
| 서버 재시작                                              | 레코드는 durable. 첫 pass가 pane 생존을 다시 판정한다.                                                       |
| tmux 서버 죽음                                           | `tmux_unavailable` — 판정 보류. 사람이 tmux를 되살리면 다음 pass가 `pane_gone`으로 정리한다.                  |
| `/exit`를 보냈는데 세션이 안 죽음(권한 프롬프트 등)        | 90초 뒤 `kill-window`, 스레드는 브리지 dead-pane 스윕이 아카이브.                                             |
| 정산 뒤 세션이 대화상자·턴 중                             | idle까지 미루고, 30분 상한 뒤 `kill-window`.                                                                 |
| threads.json 없음·손상·필드 부재·`dotfiles-na5v` 미배포   | 링크 생략(fail-quiet).                                                                                       |
| `--session-id` 충돌(같은 uuid 재사용)                    | 발생하지 않는다 — 기동마다 새 UUID.                                                                          |
| 정산 뒤 사람이 그 창에서 다른 일을 시작                   | `@agent_running` 동안 미루고 턴이 끝나면 닫는다(§1-3 결정). 그 창에서 새 Bead 작업을 잇는 것은 지원 범위가 아니다. |

## 5. 테스트 범위

- `server/worker/session-ref.test.js`: `qualifyInteractiveForkSource` 순서(attempt local → session_ref → fresh), `fallback_reason` 4종, provider 승계.
- `server/worker/resolve-session.test.js`: fork argv에 `--resume … --fork-session --session-id`, fresh argv에 `--session-id`, `recordInteractiveSession` 호출(`already_running`이면 없음), 프롬프트 접미 줄.
- `server/worker/direction-inquiry.test.js`: 두 기동 경로가 레코드를 쓰고 `already_running`이면 쓰지 않는다.
- `server/worker/tmux-launcher.test.js`: 결과에 `pane_id`, 확장 `listPanes` 포맷 파싱, `readBridgeThreads` mtime 캐시·손상 파일.
- `server/worker/bead-timeline.test.js`: `interactive_session` kind와 `event_id` 형태.
- `server/worker/queue-store.test.js`: `interactive_sessions` 정규화·빈 기본값·깨진 레코드 폐기·공개 메서드 4종·`markInteractiveSessionsSettled`가 그 Bead의 레코드 전부에 `settled_at`을 쓴다.
- `server/worker/scheduler.*.test.js`: reconcile 상태기계 — `pane_gone`/`exit_sent` 구분·idle 술어(`@agent_running`·`@agent_attention`·프롬프트 줄)·미룸과 30분 상한·`exiting` 90초 타임아웃→`kill-window`·codex `kill-window`·복구 레코드·codex `@agent_session` 채움; `moveToDone`/일반 폐기 완료 직후 정산 write와 즉시 pass, `stale_work_backup_fresh`·`abandoned`는 정산 아님, bd `closed` 관측 정산.
- `server/ws/worker-handlers.*.test.js`: 서랍 인가가 `interactive_sessions`로도 통과, `decorateQueue`가 `discord_url`을 붙인다.
- 클라이언트 `lane-model`·`lanes`·`running-grid`·`index`·`monitor` 테스트: 뱃지(복수 레코드)·링크·`세션 닫는 중`·버튼 불변·서랍 open 인자.
- dotfiles(`dotfiles-na5v` 본문): 레코드 `guild_id`·`url`·백필, dead-pane 스윕 판정 순수 함수.
- 검증 절차는 AGENTS.md Pre-Handoff Validation.

## 6. 구현 unit 후보

- unit-a `server/worker/session-ref.js`·`resolve-session.js`·`direction-inquiry.js`·`tmux-launcher.js`·`bead-timeline.js` — fork 원천·session id·pane_id·레코드 write·타임라인 kind·프롬프트 접미.
- unit-b `server/worker/queue-store.js`·`scheduler.js`·`pr-actions.js`·`discard-coordinator.js`·`server/ws/worker-handlers.js` — 스키마·공개 메서드·정산 write·reconcile 상태기계·서랍 인가·`discord_url` 투영.
- unit-c `app/views/**` — 뱃지·링크·`세션 닫는 중`·서랍 배선(Worker·Monitor).

## 경계·후속

- 크로스 리포 unit: dotfiles `dotfiles-na5v`(quick_fix, `route` 핀 뒤 Worker 인계) — 계약 문구 2곳·브리지 `guild_id`/`url`·dead-pane 스윕(§3.9). 이 Bead가 `blocks`로 의존한다(`bd dep list UI-6pif`).
- 관찰: codex 러너의 슬래시 종료 명령은 검증하지 못해 `kill-window`로 닫는다. 명령이 확인되면 claude와 같은 `/exit` 경로로 옮길 수 있다(설계 변경 없이 상수 하나).
- 관찰: 수동 `[세션 닫기]` — 요청 없음. 정산 전 닫아야 하는 경우가 실측되면 슬롯 1 조작으로 단다.
- 관찰: 첫 클릭(07:21) 기동 실패의 원인 로그 부재 — `worker:resolve-session` debug 로거가 꺼져 있어 확정하지 못했다. 기동 결과는 이제 타임라인 `interactive_session` 시작 이벤트로 남아 재발 시 읽을 수 있다.

## 결정 (ADR 후보)

- 전제: ADR 0036 — 파킹 출구는 문의 세션뿐이고 `[세션에서 해결]`은 살아 있는 세션을 가리킨다(`already_running`); 버튼과 응답은 그대로 두고 뱃지를 더한다.
- 전제: ADR UI-a5l2-2 — 복구 대기의 출구는 문의 세션이며 카드 조작은 `[세션에서 해결]`·`폐기`다; 조작은 불변이고 잔재 자동 처분에 대화형 세션 잔재가 더해진다.
- 전제: ADR 0027 — queue.json은 진행 중 상태만, 이력은 events.jsonl; 종료된 세션 레코드는 지우고 타임라인에 남긴다.
- 전제: ADR 0021 — 세션 생존·정산 시작은 scheduler reconcile이 판정한다; 대화형 세션도 같은 소유.
- 전제: ADR 0020 — `blocks`는 구현 진입만 막는다; `dotfiles-na5v` 선행 아래서 이 스펙의 저작·게이트는 진행한다.
- 전제: ADR 0014 — 새 뱃지·링크·라벨은 슬롯 표에 먼저 자리를 정한다(§3.7).
- 전제: ADR 0012 — beads-ui는 계약의 소비자다; 재개 원천 문구는 dotfiles에서 정정한다(§3.9).
- 전제: ADR 0046 — 세션 재개는 기록된 provider를 보존한다.
- 전제: ADR 0043 — 투영은 동기 자식 프로세스를 띄우지 않는다; 생존 판정은 reconcile에서만 tmux를 부른다.
- beads-ui가 띄운 대화형 세션(해결·문의)은 큐의 `interactive_sessions` 레코드로 투영되고 생존·종료는 scheduler reconcile이 소유하며, fork 원천은 attempt 러너 세션 → `session_ref` → fresh 순이고, Bead 정산 write 뒤 idle pane을 닫아(claude `/exit`, codex `kill-window`) 브리지가 스레드를 아카이브하게 한다 — 되돌리기 어렵다(큐 스키마 키·타임라인 kind·계약 문구·브리지 레코드 형식이 함께 바뀌고 소비자가 셋이다); 맥락 없이 보면 「닫힌 Bead의 세션이 저절로 끝난다」와 「Worker attempt 세션을 사람 세션이 fork한다」가 놀랍다; 절충이 실재한다 — durable 레코드와 상태기계를 갖는 대신 무상태 파생(B: fanout마다 tmux 조회, 세션 id·정산 시각을 실을 곳 없음)과 attempt 등록(C: 슬롯·usage·admission이 딸려옴)을 버렸고, 정상 종료를 위해 `/exit` 주입이라는 입력창 조작 위험(초안·대화상자)을 idle 술어와 30분 상한으로 감수한다. `summary`: "beads-ui가 띄운 대화형 세션은 큐 레코드로 투영되고 생존·종료는 reconcile이 소유하며, fork 원천은 attempt 세션 → session_ref → fresh 순이고, Bead 정산 write 뒤 idle pane을 닫아 브리지가 Discord 스레드를 아카이브하게 한다" → ADR
