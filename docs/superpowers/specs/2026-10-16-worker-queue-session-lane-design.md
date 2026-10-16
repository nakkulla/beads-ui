---
scope:
  - server/worker/admission.js
  - server/worker/attach.js
  - server/worker/queue-place.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/runnable-cache.js
  - server/worker/tmux-launcher.js
  - server/worker/runner/preamble.js
  - server/worker/notify.js
  - server/ws/worker-handlers.js
  - app/utils/worker-eligibility.js
  - app/utils/session-preferred.js
  - app/views/worker/
  - app/views/monitor/
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md
---

# UI-lbm5 — Worker 대기열 세션 레인

## 1. 배경과 목표

beads-ui는 session-hub로 대화형 Claude 세션을 열 수 있다. 그런데 `worker-ineligible` Bead는 아직 대기열에 오를 수 없다. 후보 레인에 관찰 전용으로 남고, 끌어 놓기가 막혀 있으며, 서버 admission도 거절한다. 그래서 사용자는 세션을 직접 열고 구현 시작 질문부터 답해야 한다.

목표는 대기열 한 곳에서 세 가지를 하는 것이다.

- Worker로 못 돌리는 일도 대기열에 순서대로 올린다.
- 차례가 오면 beads-ui가 대화형 세션을 연다.
- 사람이 필요할 때만 사용자가 그 창에 들어간다.

이 실행 방식을 **세션 레인 실행**이라 부른다. 대기열의 레인(병렬·직렬 s1..s5)은 그대로 두고, 레인 안의 각 행이 headless Worker로 돌지 세션으로 돌지만 다르다.

## 2. 사용자 결정 (2026-10-16)

1. 대기열에 올린 행동 자체가 구현 승인이다. 열린 세션은 구현 시작 질문을 다시 묻지 않는다.
2. 세션은 Worker처럼 fast_track으로 돈다. 절차 질문(구현 시작·리뷰어 선택) 없이 진행하고, 이슈에 원래 남은 사람 판단 지점에서만 멈춘다.
3. 세션 레인 실행은 Worker 동시 실행 칸(`slots`)을 공유한다.
4. 대상은 두 종류다.
   - `worker-ineligible`은 항상 세션 레인으로 간다.
   - `session-preferred`는 기본이 Worker다. `세션 권장` 칩을 누르면 세션 레인으로 바뀐다.
5. 세션의 런타임·모델·effort는 이슈의 실행 프리셋을 따른다. Worker 디스패치와 같은 해석이다.

## 3. 검증된 전제

- admission이 라벨 하나로 거절한다 — server/worker/admission.js:174-176
- 스케줄러도 따로 거절한다:
  - `checkAdmission` — server/worker/scheduler.js:5150-5152
  - 디스패치 재확인 — server/worker/scheduler.js:11309-11312
  - 스캔 건너뜀 — server/worker/scheduler.js:18518-18525
- 후보 카드의 배치 불가 판정은 `placementFromFacts`가 하고, `lane-model`이 `queue_placeable`로 접는다 — app/views/worker/placement.js:162-175, 268; app/views/worker/lane-model.js:4243-4303
- 카드가 끌기와 배치를 이중으로 막는다 — app/views/worker/lanes.js:5034-5044
- `worker-ineligible` 칩과 `세션 권장` 칩은 슬롯 1에서 서로 배타다 — app/views/worker/lanes.js:5149-5167
- 서버 투영이 ineligible이면 `session_preferred_reason`을 비운다 — server/worker/runnable-cache.js:412-460
- Worker 디스패치는 `fast_track`과 `workflow_mode_source=worker`를 쓰고 다시 읽는다 — server/worker/scheduler.js:4141-4174
- receipt 기준선은 `impl_entry`·`plan_approval`·`impl_dispatch`의 이동과 `workflow_mode_source → user`를 위조로 본다 — server/worker/receipt-check.js:900-932
- 비연결 워크스페이스의 대기열 진입은 라벨 하나로 거절한다 — server/worker/attach.js:3432-3443
- 살아 있는 대화 창을 앞으로 부르는 동작은 `focusLiveConversation`이다 — server/ws/worker-handlers.js:7970 이하
- 판정 칩의 현행 클릭은 사유 팝업이다 — docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md:248-262
- headless 디스패치는 `settings.env`에 가드 훅 3키(`GIT_CONFIG_COUNT`·`GIT_CONFIG_KEY_n`·`GIT_CONFIG_VALUE_n`=core.hooksPath)와 work recovery 준비 env를 더한다 — server/worker/scheduler.js:12496-12509, server/worker/guard-hook.js:509-519
- quick_fix 착지 증명은 attempt 훅 디렉터리의 push 기록을 요구한다. 기록이 없으면 `delivery_unproven:push_log_absent`다 — server/worker/quickfix-landing.js:506-520
- claude 계정은 `cswap run <account> --share-history -- claude …` 래퍼로, codex 계정은 `CODEX_HOME` 미러로 적용한다. headless는 Worker 표지 `CLAUDE_HOOK_SUPPRESS=1`도 env에 싣는다 — server/worker/runner/claude.js:895-925, server/worker/scheduler.js:3943-4027
- 생존 판정은 `isDeadAttempt`(pid와 시작 시각) 하나다. 이 판정을 `reconcile`의 정산 후보 선별(:9526), `occupiedBeadIds`(:16793), 재개 자격(:8656)이 쓴다 — server/worker/scheduler.js:8613-8632
- 일시정지는 프로세스 식별이 없으면 `identity_unknown`으로 실패한다 — server/worker/scheduler.js:18785-18792
- 수동 재개 `↻ 이어하기`는 실패·일시정지·고아 attempt를 기존 워크트리에서 새 attempt(`resumed_from`)로 띄운다. 현재 Bead 프리셋으로 설정을 다시 풀고, 러너가 같으면 공급자 세션을 resume한다 — server/worker/scheduler.js:14062-14125
- 해결 세션은 fork 또는 공용 대화 설정의 fresh로 열리고 슬롯을 차지하지 않는다 — server/worker/resolve-session.js:900-958
- ADR UI-1eag(UI-gske·UI-5chz 승계)의 "생존 소유" 조항: 생존(pid probe)·슬롯 점유는 scheduler(`reconcile`·`occupiedBeadIds`)가 소유하고, beads-ui가 띄운 대화형 세션은 슬롯을 점유하지 않는다 — docs/adr/UI-1eag-direct-push-post-merge-jobs-advanced-head.md:859-871
- 대화형 창 기동 API는 `launch({marker, key, cwd, commandArgs, runner, placement})`다. 실패해도 throw하지 않는다. claude 러너에는 `--allow-dangerously-skip-permissions`를 늘 붙인다 — server/worker/tmux-launcher.js:61-90, 732-838, 810
- 창 마커는 세 개다:
  - 기동기 쪽 — server/worker/tmux-launcher.js:24-40
  - ws 쪽 — server/ws/worker-handlers.js:7953
  - 대화 레코드 kind 합집합 — server/worker/queue-store.js:508, 3546
- 30초 대화 정산은 마커 pane을 나열해 생존·`turn_state`·마지막 메시지를 갱신한다 — server/worker/scheduler.js:1391-1399, 10394
- 종단 결과 줄 파서 — server/worker/runner/session.js:98
- headless 세션의 디스패치 맥락은 블록 단위 preamble이다. 순서는 무인 전제 → 시도 사실 → fast_track → 종점 → PR base → 가드 계약 → fix-now → 프로세스 수명이다. 과제 문장은 `defaultTaskPrompt`이고, claude에는 `--append-system-prompt`로 전달된다 — server/worker/runner/preamble.js:462-525, server/worker/runner/claude.js:842-877
- quick_fix의 Worker-dispatched 세션은 공급된 워크트리와 committed candidate 경로를 쓴다 — dotfiles src/shared/skills/flow/workflow/references/execution-quick-fix.md:61
- 칩 클릭으로 이슈 metadata를 바꾸는 선례는 `chip-preset-toggle`이다. (워크스페이스, 이슈)별로 직렬화하고, 재클릭하면 복원한다 — docs/adr/UI-rd2m-exec-presets-and-chips-by-route.md "판정 칩"
- dotfiles의 Attempt continuation 판정: 대기열 `attempts[]`에 그 Bead 행이 하나라도 있는 세션은 fast_track을 이어받는다. 그 세션은 구현 시작 질문을 하지 않고 승인 키도 쓰지 않는다 — dotfiles src/shared/skills/flow/workflow/references/execution-dispatch.md:211-250
- 허브는 열리는 창에서 `BDUI_ATTEMPT_ID`·`CLAUDE_HOOK_SUPPRESS`를 벗긴다. 그래서 세션 레인 세션은 unattended runner로 분류되지 않는다 — dotfiles src/shell/lib/session_hub/env.py:57
- 미확인: 허브 claude 창의 권한 확인 대화상자가 `@agent_attention=question`으로 드러나는지 — 구현 중 실측한다. 드러나지 않으면 §4.4의 답 대기 판정이 그 경우를 놓치므로 관찰 줄로 남긴다.

## 4. 설계

### 4.1 실행 방식 판정

이슈의 **실행 방식**은 디스패치 때 스냅샷 하나로 정한다.

- `worker-ineligible` 라벨이 있으면 → `session`
- 유효한 `session-preferred`(라벨과 enum 사유)가 있고 metadata `exec_lane=session`이면 → `session`
- 그 밖 → `worker`

`exec_lane`은 beads-ui가 쓰는 키다(`applied_exec_preset`와 같은 지위). 라벨 없이 남은 `exec_lane`은 무시한다(fail-quiet). 판정 함수는 하나다. 예: `app/utils/worker-eligibility.js` `execLaneOf(labels, metadata)`. 서버 투영·카드·스케줄러가 모두 이 함수를 쓴다.

### 4.2 대기열 진입

- `worker-ineligible`은 더 이상 admission 거절 사유가 아니다. 다만 같은 이슈가 세션 레인 실행을 받으려면 나머지 admission(route·본문·스펙·receipt·base 등)은 Worker와 똑같이 통과해야 한다.
- 결정 — admission은 라벨 검사만 지우고 나머지 조건은 바꾸지 않는다 (대안: 세션 레인 전용으로 완화한 admission; 이유: 세션도 Worker attempt의 receipt 기준선과 마감 경로를 그대로 타므로 진입 조건이 같아야 한다).
- 세 곳의 거절을 같은 변경으로 지운다: `validateAdmission`, 비연결 워크스페이스 분기(`checkUnattachedWorkerAdmission`), 스케줄러 세 곳(§3).
- 후보 카드의 끌기와 `[대기로 ↴]`가 열린다.

### 4.3 디스패치

스캔·슬롯·직렬 레인 머리·`auto_advance`·공급자 보류 가드·base 재해석·가드 훅·워크트리 생성·`claimBeadForDispatch`·`stampWorkerWorkflowMode`까지는 Worker 디스패치와 같은 경로다. 실행 방식이 `session`이면 `launchSession`(headless spawn) 대신 세션 레인 기동으로 갈린다.

- 기동: `tmux-launcher.launch`를 다음 값으로 부른다.
  - marker: 새 `@bdui_session_lane_bead`
  - key: Bead ID
  - window_name: Bead ID
  - cwd: Bead 워크트리
  - placement: `inquiry`(백그라운드 세션)
  - runner·model·effort: 디스패치 설정값(프리셋)을 쓴다. `conversation_flags`는 끄고, 프리셋의 플래그를 직접 넘긴다.
  - 계정: headless와 같은 계정 적용을 쓴다. claude는 실행 파일을 `cswap`로 하고 `run <account> --share-history -- claude …`로 감싼다. codex는 `CODEX_HOME`을 `--env`로 넘긴다. 따라서 공급자 보류(계정·러너, ADR UI-3v1h)는 headless와 똑같이 적용된다.
  - env: headless 디스패치가 `settings.env`에 더하는 키를 `session-hub open --env`로 넘긴다. 가드 훅 3키, work recovery 준비 env, 계정 env가 여기에 든다. Worker 표지(`BDUI_ATTEMPT_ID`·`CLAUDE_HOOK_SUPPRESS`·`CODEX_SILENT`)와 print 모드 전용 키(`CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS`)는 넘기지 않는다.
  - 결과: attempt 가드 훅(quick_fix는 `record`)이 세션의 git push에 걸리고, push 기록이 남아 quick_fix 착지 증명이 headless와 같이 성립한다.
- claude는 `--session-id <uuid>`로 세션 ID를 미리 정해 attempt에 적는다. codex는 관측될 때 채우고, 그 전에는 `null`이다.
- 디스패치 맥락: headless와 같은 `applyPreamble` 블록 중 다음만 싣는다.
  - 싣는 것: 시도 사실·fast_track·종점(PR 제출 또는 quick_fix 레인)·PR base·fix-now
  - 빼는 것: 무인 전제(`UNATTENDED_PREAMBLE`)·가드 계약·프로세스 수명
  - 대신 넣는 것: 세션 레인 블록(`세션 레인:`으로 시작). 사람이 창에 들어와 답할 수 있고, 남은 사람 판단은 대화로 묻고 턴을 끝낸다는 내용이다.
  - 전달 경로: claude는 `--append-system-prompt`로, codex는 첫 입력 앞에 붙여 보낸다.
  - 이 맥락이 quick_fix 세션에게 Worker-dispatched 경로(공급된 워크트리·committed candidate·Worker 착지)를 알린다.
- 첫 입력: `defaultTaskPrompt(bead_id)`(`Bead <id> 작업을 계약 네이티브 흐름으로 완료하라.`).
  - 결정 — 첫 입력은 headless와 같은 과제 문장이고, Worker 세션 대화 진입 블록 접두 `이 세션은 `으로 시작하지 않는다 (대안: dotfiles 진입 블록 바이트 복제; 이유: 세션 정체는 continuation 판정(대기열 attempts 탐색)과 디스패치 맥락이 정하고, 진입 블록 접두는 가드가 읽기 전용 대화로 분류하기 때문이다).
- 결정 — 세션 레인은 Worker와 같은 계정·가드 훅·env로 열고, Worker 표지만 뺀다 (대안: 허브 기본 로그인과 훅 없는 창; 이유: 계정 보류(UI-3v1h)와 push 가드·quick_fix 착지 증명을 바꾸지 않고 그대로 쓰기 위해서다).
- attempt 기록: 기존 `Attempt`에 `exec: 'session'`과 `interactive: { pane_id, tmux_session, tmux_window }`를 더한다. 상태 어휘는 늘리지 않는다(`running` → `done`/`failed`/…).
- 기동 실패(`not_launched`): attempt를 `failed`(cause `session_launch_failed:<reason>`)로 닫는다. 그러면 Worker가 쓴 claim은 기존 `settleStaleWorkerClaims`가 푼다.

### 4.4 관찰

- 생존: 세션 레인 attempt의 생존은 pid가 아니라 마커 pane이다. 30초 대화 정산이 `@bdui_session_lane_bead` pane을 함께 나열해 `turn_state`·`turn_state_since`·마지막 메시지 발췌를 attempt에 갱신한다.
- 생존 판정 `isDeadAttempt`는 `exec: 'session'` attempt에 대해 pid 대신 pane 관측을 읽는다.
  - 죽음은 "tmux 관측이 성공한 pass에서 그 마커 pane이 없음"일 때만이다.
  - tmux 관측 실패나 아직 관측 전이면 살아 있음으로 본다. 그러면 claim과 슬롯이 유지된다.
  - 이 한 곳을 바꾸면 세 사용처가 같은 판정을 쓴다: `reconcile`의 정산 후보(:9526), `occupiedBeadIds`(:16793), 재개 자격(:8656). 부팅 복구도 같은 `reconcile`을 탄다.
- 테스트: 세 사용처마다 하나씩 둔다. 여기에 더해 pid 없는 살아 있는 세션 레인 attempt가 정산되지 않는 경우와, tmux 관측이 실패해도 claim과 슬롯이 유지되는 경우를 확인한다.
- 답 대기: 다음 둘 중 하나면 답 대기다.
  - `turn_state === 'question'`
  - `turn_state === 'idle'`이고 마지막 assistant 메시지 첫 줄이 종단 결과 줄이 아님
- 알림: 답 대기는 beads-ui가 Discord로 보내지 않는다. 세션의 Discord 스레드(dotfiles 브리지)가 알린다. 카드는 답 대기와 발췌를 보인다(UI-5chz, 사용자 결정 2026-10-16).
- 기동 때 한 번 `▶ 세션 레인 시작 · tmux <session>:<window>`를 보낸다.
- 살아 있는 세션 레인 attempt는 방향 문의·실패 대화 자동 기동의 대상이 아니다. 이미 사람이 들어갈 창이 있기 때문이다.

### 4.5 종료와 결과

- 종단 결과 줄: 마지막 assistant 메시지 첫 줄이 종단 결과 줄(`성공 ·`·`파킹 ·`·`실패 ·`·`환경 ·`·`대기 ·`)이면, `terminalResultOf`로 만든 verdict를 headless와 같은 `onSessionDone` 분기에 넣는다. 성공이면 PR 확인 → PR 대기 또는 완료로, 그 밖이면 실패·보류·대기로 간다. 그 뒤 창은 기존 대화 종료 규칙(유휴 확인 뒤 `/exit`, 유예 뒤 kill)으로 닫는다. 한 메시지는 한 번만 처리한다.
- 창 소멸: 종단 결과 줄 없이 pane이 사라지면 attempt를 `failed`(cause `session_exited`)로 닫는다.
  - 재개는 기존 수동 재개 `↻ 이어하기` 하나다.
    - 세션 레인 attempt에서 그 경로는 새 세션 레인 attempt(`resumed_from`)를 같은 워크트리에서 연다.
    - claim·공유 슬롯·현재 프리셋·§4.3의 디스패치 맥락을 그대로 쓴다.
    - 세션 ID가 있으면 `--resume <id>`로 열고, 없으면 같은 맥락의 새 세션으로 연다.
  - 해결 세션(fork, 공용 대화 설정, 슬롯 미점유)은 쓰지 않는다. `tileResolveFields`는 `session_exited` 세션 레인 행에 `[세션에서 해결]`·`[워커로 이어가기]`를 세우지 않는다.
  - 결정 — `session_exited`는 클릭 전용이다 (대안: 공용 스위치 아래 자동 재개; 이유: 창을 닫은 것은 사람의 행동이다).
- 종단 결과 줄로 끝난 실패·보류·대기는 headless attempt와 같은 실패 행 규칙을 따른다. 단 `worker-ineligible`이면 `[워커로 이어가기]`가 서지 않는다. 두 판정 모두 `tileResolveFields` 하나가 한다.
- 일시정지: 세션 레인 attempt에는 `⏸`/`▶`가 서지 않는다. 일시정지 경로(`pauseDurably`)는 `exec: 'session'` attempt를 `pause_unsupported`로 거절한다. 결정 — 세션 레인은 일시정지가 없다 (대안: pane 기준 일시정지; 이유: 대화형 창은 답하지 않으면 이미 멈춰 있고, 프로세스 정지는 사람이 쓰는 창을 얼린다).
- 중단: 실행 중 타일의 `✕ Worker에서 내리기`·`폐기`는 창에 `/exit`를 보내고, 유예 뒤 kill한다. 슬롯과 claim은 정산 pass가 pane 소멸을 확인한 뒤에만 돌려준다. 그 밖의 처분은 Worker attempt와 같다.
- 서버 재시작: `running`인 세션 레인 attempt는 마커 pane이 살아 있으면 다시 채택한다. 관측 성공 pass에서 pane이 없으면 `session_exited`로 처리한다.

### 4.6 카드

새 요소의 슬롯은 카드 헤더 문법 스펙 §5.1 표에 이 Bead가 행을 더해 정한다.

| 요소 | 슬롯 | 렌더러 |
| --- | --- | --- |
| `세션` exec 칩 (`오케`/`워커` exec 칩과 같은 칩 어휘) | 5b 실행 사실 | 대기 카드·실행 중 타일·PR 대기·완료 |
| `[세션에서 이어가기]` 창 부르기(`.op-btn`) | 1 조작 | 실행 중 세션 레인 타일 |
| 대화 상태 `대화 중 <경과>`·`답 대기`와 발췌 | 3 진행 | 실행 중 세션 레인 타일 (기존 대화 렌더 재사용) |

- 창 부르기는 기존 `focusLiveConversation`과 같은 동작이다(`placement: 'user'`의 `select-window`). Discord 링크가 있으면 `↗ Discord`가 함께 선다.
- `worker-ineligible` 칩 툴팁: `워커 대신 세션 레인으로 실행된다 — 대기열에 올리면 구현 승인`.
- 카드 재료는 `buildLanes`와 `app/views/worker/` 공유 함수에서 만든다. 모니터도 같은 칩·줄·버튼을 갖는다.
  - 결정 — 모니터의 후보·대기 행도 `worker_ineligible`·`session_preferred_reason`·실행 방식 사실을 싣는다. 모니터-Worker 동일성 스펙 §9 의도된 차이에 행을 더하지 않는다 (대안: 모니터에서는 칩을 생략하고 §9에 행 추가; 이유: 모니터에서도 세션 레인 카드를 올리고 불러야 하며, 칩 문법 스펙 :261의 "재료 없음"은 재료를 실으면 사라지는 사유다).
  - 칩 문법 스펙 :261·:397의 모니터 생략 문장은 이 Bead가 함께 고친다.

### 4.7 `세션 권장` 칩 클릭

- 클릭은 서버 op `chip-session-toggle { id, root_dir? }`다. 그 이슈의 `exec_lane`을 `session` ↔ 해제로 바꾸고 다시 읽는다. (워크스페이스, 이슈)별 promise 체인으로 요청 순서대로 직렬화한다(UI-rd2m 선례).
- 칩 모양:
  - 해제 상태는 `세션 권장`이다.
  - 설정 상태는 `세션 실행`(`aria-pressed=true`)이다.
  - 툴팁은 사유 한 줄과 `누르면 세션 레인 ↔ Worker 전환`이다.
- 사유 팝업(현행 클릭 동작)은 툴팁으로 옮긴다. 실행 중 attempt에는 영향이 없고, 다음 디스패치부터 적용된다.

## 5. 오류 처리

- 모든 tmux·허브 실패는 attempt 실패나 정산 건너뜀으로 끝난다. 스케줄러 pass를 깨지 않는다.
- 마커 나열이 실패한 정산 pass는 그 pass의 세션 레인 판정을 통째로 건너뛴다. 기존 정산과 같은 fail-closed다.
- `exec_lane` 쓰기가 실패하거나 다시 읽은 값이 다르면 토스트로 알리고 칩 상태를 되돌리지 않는다. 다음 스냅샷이 진실이다.

## 6. 수용 기준과 테스트

1. `worker-ineligible` 이슈가 admission을 통과하고, 대기열에 놓이고, 디스패치되면 세션 레인으로 기동된다. 서버 세 곳과 클라이언트 배치 판정에 각각 테스트를 둔다.
2. 디스패치는 같은 슬롯을 차지한다. `slots=1`에서 세션 레인이 살아 있으면 다음 Worker 행은 대기한다.
3. 기동 argv: marker, key, cwd(워크트리), placement `inquiry`, 프리셋 runner·model·effort, `--session-id`, `--append-system-prompt`, 첫 입력 문장. 첫 입력이 `이 세션은 `으로 시작하지 않는다.
   - system prompt에 시도 사실·fast_track·종점·PR base·fix-now·세션 레인 블록이 있다.
   - 무인 전제·가드 계약·프로세스 수명 블록은 없다.
   - quick_fix면 종점이 quick_fix 레인 지시다.
   - 생존 판정 네 곳이 `exec: 'session'` attempt를 pane 생존으로 판정한다.
4. 디스패치가 `workflow_mode=fast_track`·`workflow_mode_source=worker`를 쓰고 다시 읽는다.
5. 답 대기 판정 두 갈래. 답 대기에 들어가도 Discord 푸시는 나가지 않는다.
6. 종단 결과 줄(성공·실패)이 headless와 같은 `onSessionDone` 분기로 간다. 결과 줄 없는 pane 소멸은 `session_exited`이고 자동 기동하지 않는다.
   - `↻ 이어하기`는 세션 레인 attempt를 다시 연다. 이때 `--resume`, 같은 슬롯 계산, 프리셋, 맥락을 그대로 쓴다.
   - 일시정지는 `pause_unsupported`로 거절된다.
   - `✕`·폐기 뒤 슬롯은 pane 소멸이 확인된 뒤에만 비워진다.
6a. 세션 레인 quick_fix: 기동 env에 attempt 가드 훅 키가 있다. 세션의 base push가 push 기록을 남겨 `proveDelivery`가 통과한다. env에 Worker 표지는 없다.
7. 재시작 재채택: pane이 살아 있으면 `running` 유지, 없으면 `session_exited`.
8. `chip-session-toggle` 설정·해제·직렬화와, 라벨이 없을 때 `exec_lane` 무시.
9. 카드 동일성 테스트: 같은 세션 레인 Bead가 Worker 탭과 모니터에서 같은 칩·줄·버튼을 갖는다.
10. 렌더 확인: 후보·대기·실행 중 카드를 390px 폭으로 캡처해 넘침이 없음을 본다.

## 7. 비목표

- dotfiles 계약 문구(대기열 등록 = 구현 승인, `worker-ineligible`의 새 뜻)는 형제 Bead가 정한다. 이 Bead는 소비자 구현만 한다.
- 세션 레인 전용 동시 실행 한도는 두지 않는다(사용자 결정 3).
- beads-ui 안에서 답을 입력하는 칸은 만들지 않는다(ADR UI-1eag 승계, UI-gske에서 이어짐). 답은 tmux 창이나 Discord에서 한다.
- `worker-ineligible` 이슈를 headless Worker로 돌리는 경로는 만들지 않는다.

## 8. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | awaited_by_consumer | 다른 저장소 — 대기열 등록을 구현 승인으로 보는 세션 레인 계약의 정본 | 없음 | dotfiles-5qgws |

## 9. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 세션 레인의 뜻과 권한은 dotfiles 계약이 정하고, beads-ui는 그 계약의 소비자로 구현한다.
- 전제: ADR UI-3v1h — 공급자 보류(계정·러너)를 headless와 같게 적용한다.
- 전제: ADR UI-rd2m — 칩 클릭이 이슈 metadata를 쓰는 직렬화 규칙을 따른다.
- 전제: ADR UI-ny0h — 세션 레인의 PR도 단일 순차 머지 큐와 머지 자격을 그대로 탄다.
- 전제: ADR dotfiles/dotfiles-fixnj — 대화형 창은 session-hub로 열고, 허브가 Worker 표지 env를 벗긴다.
- Worker 대기열 행의 실행 방식에 세션 레인을 더한다.
  - `worker-ineligible`은 항상 세션 레인이고, `session-preferred`는 `exec_lane=session`일 때만 세션 레인이다.
  - 세션 레인은 Worker attempt로 기록되어 같은 슬롯·직렬 레인·마감 경로를 쓴다.
  - 생존은 마커 pane으로 보고, 종단 결과 줄은 headless와 같은 판정에 넣는다.
  - 되돌림 어려움: 충족. 함께 움직이는 것: admission 세 곳, 스케줄러 디스패치와 `isDeadAttempt`, 일시정지 거절, tmux 기동기의 계정 래퍼·env 전달, attempt 모양, 카드 슬롯, dotfiles continuation 판정.
  - 의외: 충족. "worker-ineligible인데 Worker 대기열에서 돈다"는 설명 없이는 모순으로 읽힌다.
  - 대안: 충족. 별도 세션 큐, 세션 전용 한도, headless 허용을 검토했다.
  - 소비자 공유: 현행 ADR UI-1eag가 UI-5chz를 거쳐 승계한 UI-gske의 "생존 소유" 조항(`reconcile`·`occupiedBeadIds`·`isDeadAttempt`가 pid로 생존을 소유하고 대화형 세션은 슬롯을 점유하지 않는다)을 바꾼다.
    - 세션 레인 attempt는 pane으로 생존을 판정하고 슬롯을 점유하는 대화형 세션이다.
    - 그래서 UI-1eag를 잇는다. UI-1eag의 나머지 조항(직접 push 착지의 머지 후 잡, UI-5chz의 답 대기 스레드 전용 알림, UI-gske의 세션 소유 사람 필요 행·실패 대화 자동 기동·문의·해결·외부 재개 레코드 등)은 그대로다. 세션 레인의 답 대기를 Discord로 보내지 않는 §4.4는 UI-5chz 조항을 따른 것이다.
    - 계정·공급자 보류는 headless와 같게 두므로 UI-3v1h는 바뀌지 않는다.
  - `summary`: "worker-ineligible과 exec_lane=session인 session-preferred 이슈는 Worker 대기열에서 세션 레인으로 실행된다 — 같은 admission·공유 슬롯·직렬 레인을 거쳐 Worker attempt로 기록되고(fast_track·worker 출처) headless와 같은 계정·가드 훅 env로 Worker 표지 없이 session-hub 대화형 창으로 열리며, 생존은 isDeadAttempt가 마커 pane 관측으로 판정하고(관측 실패는 생존) 결과는 종단 결과 줄로 headless와 같은 판정을 탄다; 결과 줄 없는 창 소멸은 클릭 전용 session_exited 실패이고 재개는 세션 레인 attempt의 ↻ 이어하기이며 일시정지는 없다 — UI-1eag의 나머지 조항은 그대로다" → ADR, supersede UI-1eag
- `session-preferred` 칩 클릭은 `exec_lane`을 토글한다 — 칩 문법의 한 행 변경이고, 위 ADR의 같은 소비자 안에 있다 → ADR 아님
