---
scope:
  - server/worker/direction-inquiry.js
  - server/worker/session-stall.js
  - server/worker/scheduler.js
  - server/worker/wait-judgment.js
  - server/worker/notify.js
  - server/worker/admission.js
  - server/worker/interactive-progress.js
  - server/worker/tmux-launcher.js
  - server/worker/queue-store.js
  - server/worker/work-recovery-policy.js
  - server/ws/worker-handlers.js
  - app/views/worker/
  - generated/contracts/
---

# 같은 Worker 세션 대화와 무인 복귀 (UI-nuwy)

선행이자 형제: dotfiles `dotfiles-dolcw`, 스펙 `docs/superpowers/specs/2026-09-30-worker-stop-conditions-session-conversation-design.md`.
- 멈춤 분류, 사람 대화 사유, 대화 진입 블록 바이트, 결과 줄(`인계`·`인수`·`보류`), 재개 세션이 하는 일은 그 정본이 정한다.
- 이 스펙은 beads-ui가 그것을 어떻게 기동·관측·재개·알리는지 정한다.

## 1. 배경과 목표

2026-09-29 `beads-sw1`에서 문의 세션(fork)이 검증까지 하고 마무리를 못 한 채 산문으로 다시 물었다. 카드와 Discord는 조용했다. 원인은 두 가지다.
- Worker는 복구 대기의 재개를 네 곳에서 막는다. 출구는 Bead close뿐이다.
- Codex 산문 질문은 `idle`로 읽혀 verdict가 `normal`이 된다.

사용자 결정(2026-09-30)은 세 가지다.
- 사람이 필요한 멈춤에서는 같은 Worker 세션을 대화로 가져와 해결한다.
- 해결되면 Worker가 같은 세션을 무인으로 이어간다.
- Discord 알림은 단계별로 구분한다.

목표는 다섯 가지다.
- 문의 세션의 fork 기동을 같은 세션의 대화형 재개로 바꾼다.
- 대화 결과 줄을 관측해 창을 닫고 같은 attempt를 `resume()`한다.
- 대화 단계의 턴 종료를 답 대기로 판정한다.
- 알림 네 종류를 둔다.
- 새 정본(schema 2 투영, 진입 블록 한 개)으로 핀을 동기화한다.

## 2. 검증된 전제

beads-ui 기준은 `3cf13f3d`다.

- 문의 세션은 fork(`codex fork`·`claude --resume … --fork-session`)로 뜬다 — server/worker/direction-inquiry.js:531,543,700-704
- 프롬프트 4종은 바이트 사본이고 SHA-256을 고정한다 — server/worker/direction-inquiry.js:13-15,96,123,164
- 멈춤 술어는 recovery 사유 `authority`·`verification`·`no_progress`·`reconcile`와 세션 선언 `unclassified`·빈 blockers `prerequisite`다 — server/worker/session-stall.js:8-19
- Worker 재개 차단 네 곳:
  - WS `recovery_requires_inquiry` — server/ws/worker-handlers.js:5421
  - 공급자 자동 재개 `recovery_wait` — server/worker/scheduler.js:12831
  - `settledAttemptFence` — server/worker/scheduler.js:15974,15992
  - 카드 `↻` 없음(ADR UI-ri8n 승계 조항)
- `resume()`는 복구 대기를 받는다(`recovery_wait`). 그때 실행 설정은 기록값 `recordedDispatchSettings(prior)`이고, 세션은 `prior.session_id` 같은 세션이다. `parked`는 `not_failed`로 거절한다 — server/worker/scheduler.js:12468,12472,12490-12506,13878-13890,15484
- admission은 `awaiting_user` 키가 있으면 거절한다. 예외 플래그 선례는 `allow_external_wait_resume`이다 — server/worker/admission.js:132-141,169
- 재개 프롬프트 블록 선례는 `resumePrompt`·`prerequisiteReturnBlock`(`## 선행 완료`)이다 — server/worker/scheduler.js:11665,11703
- 재개 launch에는 가드 훅 설치와 `GIT_CONFIG_*` 주입이 붙는다 — server/worker/scheduler.js:4039,11018,14370
- 같은 세션 tmux 재개(fork 없음)와 "세션 ID당 프로세스 하나" 원칙의 선례는 외부 대기 [세션에서 이어가기]다 — server/worker/external-wait/session-resume.js:1-22
- 대화형 Codex 창은 `CODEX_HOME`을 기본 홈으로 준다 — server/worker/tmux-launcher.js:226,653
- 미확인: 대화형 창이 기본 홈에서 attempt 세션을 `codex resume`로 이어 쓰고, 그 뒤 새 attempt 홈(`sessions`가 같은 실제 디렉터리로 심링크)에서 `codex exec resume`가 같은 rollout을 찾는가 — 조사 보고(codex-account-home.js:76, 심링크 realpath 동일성 테스트)로 추정했고 실행 검증은 하지 않았다
- 단계는 reconcile이 pane 옵션으로 정한다(`interactiveTurnState`). 시작 이벤트는 레코드당 1회다 — server/worker/scheduler.js:1309,9151,9359
- 마지막 assistant 메시지는 첫 줄만 160자까지 읽는다 — server/worker/interactive-progress.js:71,108
- 대기 판정과 문구:
  - `judgeStalledSession`: 살아 있는 문의가 있으면 `running`·`idle`은 `normal`이다 — server/worker/wait-judgment.js:106,187,200-213
  - 알림 문구는 `⚠ … 지연 · <headline> · <message>` — server/worker/notify.js:519-528
  - 시작 제목 `startedTitle`은 `resume`·`conflict` 두 분기만 따로 이름이 있고, 나머지는 `시작`이다 — server/worker/notify.js:49,482
- 대화형 reconcile 주기는 30초다 — server/worker/attach.js:369
- 파킹 해제 전이 재디스패치: `onIssuesChanged`는 `awaiting_user_present:true`를 기록한 attempt의 키가 사라지면, 대화 생존과 무관하게 한 번(`parked_resumed_at`) 다시 dispatch한다 — server/worker/scheduler.js:16005-16016
- `resume()`은 자식 attempt(`resumed_from`)를 launch 전에 기록한다. 자식이 있으면 원 attempt는 성공·실패와 무관하게 `already_resumed`로 소진된다 — server/worker/scheduler.js:12553-12560,14523,14593
- 배포는 `[deploy]` 스크립트가 재시작 marker, `bdui-shared restart`, `healthz` 소스 확인으로 한다 — repo-ops/script/deploy:62,112,124
- `[세션에서 해결]` 유무는 `tileResolveFields` 하나가 정한다 — app/views/worker/tile-resolve.js:28
- 대화형 레코드의 `settled_by`는 `done`·`discard`·`bd_closed`다 — server/worker/queue-store.js:513,3161
- 핀 투영 검증은 `result_line_reasons === 'wait_reasons_plus_reconcile'`을 요구하고, 결과 줄 사유는 거기서 파생한다 — server/worker/work-recovery-policy.js:118-127,228-233

## 3. 설계

### 3.1 대화 대상

- 대상은 두 가지다.
  - 파킹(`awaiting_user` 문자열, 어휘 안팎 모두)
  - 복구 대기 중 사유가 `authority`·`no_progress`인 것
- 이미 기록된 attempt의 옛 사유(`verification`·`reconcile`·세션 선언 `unclassified`·빈 blockers `prerequisite`)도 읽기 호환으로 대상에 넣는다. 배포 시점에 대기 중인 Bead가 버려지지 않게 하기 위해서다.
- 결정: 술어는 한 곳(`session-stall.js`)에 둔다. 새 사유 집합은 핀 투영의 정본 목록과 대조하는 테스트로 고정한다.

### 3.2 대화 기동: 같은 세션, fork 없음

- 기동 조건은 현행과 같다. 자동 게이트 `worker_direction_inquiry.enabled`, tmux, Bead당 하나를 지키고, 사람 클릭 `[세션에서 해결]`은 게이트를 읽지 않는다.
- 명령은 attempt의 기록 세션을 그대로 대화형으로 연다. 첫 입력은 진입 블록이고 cwd는 attempt 워크트리다.
  - Codex: `codex resume <session_id> <진입 블록>`
  - Claude: `claude --resume <session_id> <진입 블록>` (`--fork-session`·새 `--session-id` 없음)
  - 레코드는 `mode: 'resume'`이고 `session_id`를 기동 시점에 안다. pane 옵션으로 잡을 필요가 없다.
- 결정: 한 세션 ID에는 프로세스 하나만 둔다. attempt의 `process_identity`가 가리키는 러너 프로세스가 살아 있지 않음을 확인한 뒤에만 기동한다. Worker 재개도 대화 창의 소멸을 reconcile이 확인한 뒤에만 한다.
- 대체 경로:
  - 기록 세션을 열 수 없으면(전사 없음, 다른 호스트, 러너 불명) 같은 provider의 fresh 세션에 진입 블록을 주고 `fallback_reason`을 기록한다.
  - 그 경우 `인계` 뒤 재개는 `resume()`의 기존 사다리가 정한다(같은 세션이 없으면 same-provider fresh와 인계 블록).
- 은퇴: fork 문의 경로와 프롬프트 4종 상수.
- 진입 블록은 dotfiles 정본의 바이트 사본 하나이고 다이제스트 테스트로 고정한다.
- 배포 시점에 살아 있는 fork 문의 레코드(`mode: 'fork'`)는 옛 규칙대로 정산하고 이행하지 않는다.

### 3.3 대화 단계 관측과 판정

- 대화가 살아 있는 동안(`state==='live'`, 미정산) 단계는 현행 reconcile이 pane 옵션으로 정한다.
- 결정: 결과 줄과 답 대기는 단계 전환이 아니라 **새 assistant 메시지** 단위로 처리한다.
  - 매 pass(30초)마다 reconcile은 전사 끝에서 마지막 assistant 메시지와 그 식별자(메시지 시각 또는 전사 위치, 예: `message_at`)를 읽는다.
  - 레코드에 적힌 마지막 처리 식별자보다 새 메시지이고 단계가 `running`이 아니면, 그 메시지를 한 번 처리한다.
    - 첫 줄이 `인계 ·`·`인수 ·`·`보류 ·`로 시작하면 결과 줄로 처리한다(3.4-3.6).
    - 그 밖이면 답 대기다.
  - 처리한 식별자와 알림 발췌용 앞부분(예: 400자)을 레코드에 쓴다.
  - 관측 사이에 시작하고 끝난 턴(`running`을 한 번도 못 본 턴)도 새 메시지로 잡힌다.
- 결정: verdict는 다음 표를 따른다. 이유: 대화 단계의 세션은 사람 메시지에만 반응하므로 턴이 끝나면 사람 차례다. 이는 UI-ri8n의 `idle → normal`을 뒤집는 것이다.

  | 대화 레코드 상태 | verdict |
  | --- | --- |
  | `running` | `normal` (대화 중) |
  | 기동 뒤 assistant 메시지 없음(`idle`·`null`) | `normal` (기동 중) |
  | `question`·`limit`, 또는 기동 뒤 결과 줄이 아닌 메시지가 있는 `idle` | `action_required` (답 대기) |
- 결과 줄 없이 창이 사라지면 현행처럼 레코드를 지우고 확인 필요로 되돌린다(`[세션에서 해결]` 재기동).

### 3.4 인계: Worker가 같은 세션을 이어감

1. `인계 ·` 관측 → 레코드에 `handoff` 예약(결과 줄·메시지 식별자)을 쓴다 → 창을 닫는다(Claude `/exit`, Codex 창 종료, 기존 정산 종료 primitive) → 소멸을 확인한다.
2. 결정: 살아 있는 대화나 `handoff` 예약이 있는 동안 `onIssuesChanged`의 파킹 해제 전이 재디스패치는 보류한다. 창 소멸을 확인한 뒤 이어가는 경로는 하나뿐이다.
   - `awaiting_user`가 이미 해제돼 있으면(대화의 사용자 답 턴에서 `plan_approval`과 함께 해제된 경우) 기존 해제 전이 재디스패치가 한 번 잇고 `resume()`은 부르지 않는다.
   - 그렇지 않으면 3의 `resume()`이다.
   - 재개된 자식 attempt가 실행 중에 해제를 쓴 경우(예: `spec_review_stale` 재개 세션의 발행·해제)에도, 해제 전이 재디스패치는 그 자식이 끝난 뒤에만 선다. 기존 `claimed`·dispatch 거절 fence(server/worker/scheduler.js:16038-16046)로 충족되는지 테스트로 고정한다.
3. 대기(또는 파킹) attempt에 `resume(workspace, attempt_id, { continuation: 'prior_session', conversation_return })`을 부른다.
   - `resume()`은 자식 attempt(`resumed_from=<대기 attempt>`, 같은 `session_id`)를 먼저 기록하고 launch한다. "같은 세션을 이어간다"는 이 자식을 뜻한다.
   - 실행 설정은 기록값이다. 가드 훅·push 로그·착지 판정은 일반 재개와 같다.
4. 이 경로에만 필요한 예외:
   - `parked`를 재개 가능 상태로 받는다.
   - admission의 `awaiting_user` 거절을 같은 계보에 한해 건너뛴다. 해제는 재개 세션의 영수증 쓰기가 한다.
   - WS `recovery_requires_inquiry`, `settledAttemptFence`, 공급자 자동 재개 차단은 그대로다. 사람 `↻`나 자동 재디스패치로는 여전히 재개하지 않는다.
5. 재개 프롬프트 첫머리에 `## 대화 결과` 블록(beads-ui 소유, `## 선행 완료`와 같은 층)을 둔다. 담는 것은 셋이다. notes는 읽지 않는다. 블록은 이 세 사실만 말하고 새 권한을 주지 않는다.
   - 이 세션이 대화 뒤 무인 attempt로 돌아왔다는 사실
   - **이번 대화**(기동 뒤 메시지)에서 관측한 결과 줄 원문
   - "대화 단계의 금지는 풀리고 무인 규칙·가드가 다시 적용된다. 남은 단계는 dotfiles `Worker 세션 대화` 절의 표 순서대로 한다"
6. 실패 처리:
   - 자식 기록 전의 거절(admission·레인 불일치·전사 부재 등)은 예약을 지우고 확인 필요로 되돌리며 이유를 카드에 남긴다.
   - 자식 기록 뒤의 실패는 그 자식 attempt의 일반 실패 처리(재시도 사다리·실패 타일·복구 대기)가 맡는다. 대기 attempt는 `already_resumed`로 소진되고, 카드는 자식이 대표한다.

### 3.5 인수와 보류

- **`인수 ·`**
  - 레코드를 인수로 표시하고 창을 그대로 둔다. Worker는 재개하지 않고, 정산은 Bead close·PR 관측(현행 `bd_closed`·`done`)으로 한다.
  - 판정은 `normal`, 배지는 `🙋 사람 인수`다. 조작은 `[폐기]`만 남는다.
  - 인수 세션의 push는 가드 밖이다. 사람이 명시적으로 소유한 것으로 보고 감수한다.
- **`보류 ·`**
  - 창을 닫는다. attempt는 대기로 남고 카드는 확인 필요에 `[세션에서 해결]`·`[폐기]`를 낸다. 알림은 없다(사용자가 방금 고른 것이다).

### 3.6 사람 버튼 `[워커로 이어가기]`

결과 줄 없이 사용자가 해결을 끝낸 경우를 위한 대체 출구다.
- 선다: 대화가 살아 있고 답 대기(3.3 표)일 때, 또는 결과 줄 없이 창이 사라진 대기 attempt.
- 누르면: 3.4와 같은 경로를 탄다. 결과 줄 자리에 "사용자가 [워커로 이어가기]로 인계"를 싣는다.
- 결정: 재개 세션은 이번 대화의 결정(같은 세션의 자기 대화 맥락)이 있으면 그것을 적용한다. 없으면 원래 멈춤을 다시 판단하고, 필요하면 다시 멈춘다. notes의 이전 `대화 결정:` 줄은 쓰지 않는다. 이유: 사람의 명시 클릭을 결정으로 위조하지 않고, 다른 멈춤의 답을 재사용하지 않는다.
- `tileResolveFields`가 `[세션에서 해결]`과 함께 이 버튼의 유무를 정한다. 렌더러는 다시 판정하지 않는다.

### 3.7 Discord 알림

| 종류 | 언제 | 문구 | 억제 키 |
| --- | --- | --- | --- |
| `🙋 확인 필요` | 대화 대상 멈춤 기록 직후 1회 | `🙋 확인 필요 — <id> <제목>` / `이유: 설계 충돌 · <값>` \| `범위 충돌` \| `같은 원인 반복` / `세션: <남긴 문장>` / `대화: Discord 스레드 · tmux <session:window>`(기동 실패면 `대화를 열지 못함 · <사유> — Worker 탭 [세션에서 해결]`) / `리포: <repo>` | `(bead, attempt_id, confirm)` |
| `❓ 답 대기` | 결과 줄이 아닌 새 assistant 메시지를 처리할 때마다(3.3) | `❓ 답 대기 — <id>` / `<마지막 메시지 발췌>` / `답: Discord 스레드 · tmux <window>` | `(bead, launched_at, message_at)` |
| `↪ Worker가 이어감` | 인계 재개 launch 성공 | `↪ Worker가 이어감 — <id> <제목>` / `결정: <결과 줄>` / `실행: <runner model> / <effort> / <speed>` | launch당 1회 |
| `🙋 사람 인수` | `인수` 관측 | `🙋 사람 인수 — <id>` / `Worker는 정산만 관찰` | 레코드당 1회 |

- `🙋 확인 필요`는 이 대상의 `⏸️ 파킹`과 `⚠ … 지연 · 세션이 멈춤`을 대체한다.
- 대화가 시작되면 `확인 필요` 키는 소비된 채로 둔다. 같은 멈춤의 재알림은 `❓`가 맡는다.
- `↪`는 새 `launch_kind: 'conversation_return'`의 시작 제목이다. `startedTitle`의 기존 `resume`·`conflict` 분기는 그대로 둔다. 결정 줄은 입력 필드로 받는다.
- 보류·대화 중(`running`)은 알림하지 않는다. 최종 `✅`·`📬`·`❌`는 그대로다.

### 3.8 카드

- 대기 어휘 `세션이 멈춤` 행의 라벨은 `확인 필요`다.
- 대화형 세션 배지 꼬리: `대화 중 <경과>` / `답 대기` / `사람 인수`.
- 조작은 `[세션에서 해결]`(살아 있는 대화 없음), `[워커로 이어가기]`(3.6), `[폐기]`다.
- 슬롯 표·`buildLanes` 경로·Monitor 동등성은 UI-ri8n을 승계한다.
- 표면 판정은 서버 투영(`wait-judgment`의 actions·`tileResolveFields`)에만 둔다. 이유: 진행 중인 UI-dbn6 재작성과 겹치지 않게 한다.

### 3.9 정본 동기화

- 핀 `generated/contracts/work-recovery-policy.json`과 provenance를 schema 2로 갱신한다.
- `validPolicy`는 schema 2의 `result_line_reasons` 명시 목록을 받는다. `recoveryResultLineReasons()`는 그 목록을 그대로 광고한다.
- schema 1 핀은 더 받지 않는다(fail-closed, 현행 규칙).

### 3.10 적용 순서

배포 수단은 기존 `[deploy]` 스크립트다(§2). 이 스펙은 그 위의 순서와 단계별 증거만 정한다.

1. **선행 확인**
   - `dotfiles-dolcw`가 closed다. 그 스펙 3.7의 dotfiles 설치 증거가 readback된 뒤다.
   - foreign `blocks` 때문에 그 전에는 이 Bead가 dispatch되지 않는다.
2. **이 PR**
   - dotfiles가 착지한 SHA의 `generated/contracts/work-recovery-policy.json`을 핀 사본과 provenance로 복사한다.
   - 진입 블록 바이트를 복사하고 다이제스트 테스트를 둔다.
   - 핀과 런타임 변경은 한 PR에 둔다. 이유: 새 핀만 먼저 들어가면 현행 판정이 schema 2를 읽지 못한다.
3. **머지 → beads-ui `[deploy]`**: 재시작 marker 기록 → `bdui-shared restart` → `healthz` readback(소스 identity = target SHA).
   - 증거:
     - `queue.json` `repo_operations`에 해당 deploy가 terminal 성공으로 남는다.
     - `projectmgr status`가 `running`이다.
     - `http://<host>:3000/healthz`가 200이고 소스가 target SHA다.
4. **배포 뒤 첫 reconcile**
   - 이미 대기 중인 attempt(옛 사유 포함)는 새 술어로 판정되어 확인 필요로 선다.
   - 살아 있는 `mode: 'fork'` 문의 레코드는 옛 규칙으로 정산한다.
5. **중단과 재채택**
   - deploy가 실패하면 `script_retry`·`[배포 실행]`으로 다시 한다.
   - 재시작 전에 멈추면 옛 서버가 그대로 돌아 동작이 바뀌지 않는다.
   - 재시작 뒤 `healthz`가 불일치하면 deploy 실패로 남는다. 재시작 marker(`.repo-ops-deploy.restart.json`)가 같은 target SHA의 재채택 기준이다.

## 4. 수용 기준

1. 대화 대상 멈춤이 기록되면 attempt의 같은 `session_id`가 tmux 대화형으로 열린다(fork 아님). 레코드 `mode`는 `resume`이다.
2. 결과 줄이 아닌 새 assistant 메시지가 생기면 verdict는 `action_required`(답 대기)이고 `❓ 답 대기`가 메시지마다 한 번 나간다. 관측 사이에 끝난 턴도 같다. `running`이면 `normal`이다.
3. 첫 줄 `인계 ·`를 관측하면 창이 닫힌다.
   - 소멸을 확인한 뒤 자식 attempt가 같은 세션·기록 실행 설정으로 재개되고, 가드 훅이 붙는다.
   - `awaiting_user`가 남은 파킹도 이 경로로 재개된다.
   - 사람 `↻`·자동 재디스패치로는 여전히 재개되지 않는다.
   - 살아 있는 대화·예약 중에는 파킹 해제 전이 재디스패치가 일어나지 않는다. 창 소멸 뒤에는 한 경로만 실행된다.
4. `인수 ·`면 재개하지 않는다. Bead close·PR로 정산하고 `🙋 사람 인수`가 1회 나간다.
5. `보류 ·`면 창이 닫히고 대기로 남으며 알림은 없다.
6. `[워커로 이어가기]`는 3.6 조건에서만 서고, 누르면 3.4 경로로 재개된다.
7. 알림 네 종류가 3.7 문구·억제 키대로 나가고, 이 대상에는 `⏸️ 파킹`·`⚠ … 세션이 멈춤`이 나가지 않는다.
8. 핀이 schema 2이고, 진입 블록 다이제스트가 dotfiles 정본과 같다.
9. 이미 기록된 옛 사유 대기 attempt도 대화 대상이다.
10. 자식 기록 전 거절은 확인 필요로 되돌아간다. 자식 기록 뒤 실패는 자식의 일반 실패 처리로 간다.
11. 머지 뒤 3.10의 3단계 증거가 readback된다.

## 5. Test scope

- `server/worker/direction-inquiry.test.js`: 같은 세션 resume 명령(Codex·Claude), fresh 대체, 진입 블록 다이제스트, 러너 프로세스 생존 시 기동 거절.
- `server/worker/session-stall.test.js`: 새 대상 집합과 옛 사유 읽기 호환.
- `server/worker/scheduler.test.js`
  - 결과 줄 관측 → 창 종료 → 소멸 확인 → `resume()` 순서
  - 관측 사이에 끝난 턴의 결과 줄·답 대기 처리
  - 파킹·`awaiting_user` 예외
  - 대화 중 `plan_approval` 해제와 인계의 경합: 해제 전이 재디스패치 보류, 창 소멸 뒤 한 경로
  - `already_resumed` 1회
  - 자식 기록 전·후 실패 구분
  - 인수·보류 분기, 창 소멸 시 되돌림
- `server/worker/wait-judgment.test.js`: 대화 단계 verdict 표와 actions.
- `server/worker/notify.test.js`: 네 종류 문구·억제 키, 대체된 두 알림의 부재.
- `server/worker/admission.test.js`: 대화 복귀 예외 범위.
- `server/worker/work-recovery-policy.test.js`: schema 2 수용, schema 1 거절.
- `app/views/worker/tile-resolve.test.js`: 두 버튼 술어.
- 저장소 기본 검증은 `AGENTS.md` Unit Testing Standards·Pre-Handoff Validation 그대로다.

## 6. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 다음 소유자가 앞 결과의 수용을 필요로 함 — 이 저장소가 동기화할 정본(진입 블록·schema 2 투영)을 착지 | 없음 | dotfiles-dolcw |

- 결정: 인수 세션에 가드 훅을 주입하지 않는다. 이유: 사람이 명시적으로 소유한 대화형 세션이고, 현행 문의 세션과 같다.
- 관찰: `UI-dbn6`(프런트엔드 재작성)와 `app/views/worker/` 경로가 겹친다 — 표면 판정을 서버 투영에 두어 렌더러 변경을 라벨·버튼 두 개로 줄인다.
- 관찰: 외부 대기 [세션에서 이어가기]·`[워커로 이어가기]`는 바꾸지 않는다 — 같은 라벨의 버튼이 대기 종류별로 다른 경로를 탄다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — dotfiles 계약 subset을 핀 사본으로 소비한다.
- 전제: ADR UI-a5l2 — 재개 attempt는 가드(실행 전 거부·pre-push·사후 착지 감지)를 그대로 받는다.
- 사람 대화는 같은 Worker 세션을 fork 없이 대화형으로 열고, 결과 줄 `인계`를 관측하면 창 소멸 뒤 같은 attempt를 같은 세션·기록 설정으로 재개한다. 대화 단계의 턴 종료는 답 대기다.
  - 되돌리기 어려움: `direction-inquiry.js` 기동, `scheduler.js` reconcile·resume 예외, `admission.js`, `wait-judgment.js` verdict 표, `notify.js` 네 종류, `tile-resolve.js` 술어, 핀 투영이 함께 움직인다.
  - 맥락 없이 놀라움: 파킹된 attempt가 `awaiting_user`를 단 채 재개되고, 사람 `↻`는 여전히 없다.
  - 실제 절충:
    - 얻는 것: 멈춤이 사람 답 대기로 반드시 드러난다. 해결 뒤 가드·관측 아래에서 끝까지 간다.
    - 감수하는 것: 메시지 단위 관측을 위한 전사 읽기 비용(30초마다 끝 64KB). 파킹 attempt를 `awaiting_user`가 남은 채 재개하는 admission 예외.
    - 대안 둘과 기각 이유:
      - fork 문의 세션이 끝까지 가는 현행: 가드·관측이 없고 끝내지 못한다.
      - fork 수리 뒤 fork 세션 재개: fork ID 포착이 취약하다.
  - ADR UI-ri8n을 supersede한다. 소비자 집합(`wait-judgment` verdict 표·`notify` 억제·`tile-resolve` 술어)을 공유하며, 그 결정의 `idle → normal`과 "복구 대기의 출구는 문의 세션·`↻` 없음" 승계 조항을 뒤집고 나머지는 승계한다.
  - `summary`: "사람이 필요한 멈춤(파킹, recovery authority·no_progress, 옛 사유 읽기 호환)은 같은 Worker 세션을 fork 없이 tmux 대화형으로 열어 해결한다; 대화 턴 종료는 답 대기(action_required)이고 첫 줄 인계를 관측하면 창 소멸 확인 뒤 같은 attempt를 같은 세션·기록 실행 설정으로 재개하며(parked·awaiting_user 예외는 이 경로뿐, 사람 ↻·자동 재디스패치는 없음) 인수면 관찰만, 보류면 대기로 남는다; 알림은 확인 필요·답 대기·Worker가 이어감·사람 인수 넷이다" → ADR, supersede UI-ri8n
- 대화(문의) 세션의 원천은 fork가 아니라 attempt 러너 세션의 fork 없는 재개다. 대화형 세션 정산 write에 `인계`(창 소멸 뒤 재개 경로 하나)·`보류`(창 종료)가 더해진다. 해결(resolve) 세션의 fork 원천 순서와 나머지 조항은 승계한다.
  - 되돌리기 어려움: `direction-inquiry.js` 기동 명령, `scheduler.js` `reconcileInteractivePass`의 정산·종료, `queue-store.js` 대화형 레코드 필드(`mode: 'resume'`, `handoff` 예약, 처리한 메시지 식별자)가 함께 움직인다.
  - 맥락 없이 놀라움: 대화형 세션인데 fork가 아니라 무인 attempt와 같은 세션 ID를 번갈아 쓴다.
  - 실제 절충:
    - 얻는 것: 맥락이 이어지고, 기동 뒤 세션 ID를 pane 옵션으로 잡을 필요가 없다.
    - 감수하는 것: 한 세션 ID를 두 프로세스가 번갈아 쓰는 순서 관리, 무인 세션 이력에 대화가 섞이는 것.
    - 대안: 현행 fork 원천 유지. 결정 맥락이 원래 세션과 갈린다.
  - ADR UI-u6ud-6을 supersede한다. 소비자 집합(대화형 레코드·reconcile 정산)을 공유하며, 그 결정의 "대화형 세션의 fork 원천"과 "대화형 세션의 정산" 조항을 문의 종류에 한해 뒤집고 이력 SoT·`queue.json`·생존/종료 reconcile 소유·in_progress 선점 조항은 승계한다. 위 후보와 소비자 집합(판정·알림·타일 술어)이 달라 둘째 ADR(-2)로 둔다.
  - `summary`: "Worker 이력의 SoT는 bead별 append-only events.jsonl이고 queue.json은 살아 있는 상태만 담으며 살아 있는 queue.attempts는 bead 이력의 최신 접미다; 구현·리뷰 attempt의 생존·슬롯 점유·정산 시작은 scheduler reconcile이, 결과 판정은 큐가 소유한다; beads-ui가 띄운 대화형 세션은 슬롯을 점유하지 않는 별도 큐 레코드로 투영되고 그 생존·종료만 reconcile이 소유하며, 문의(대화) 세션은 attempt 러너 세션을 fork 없이 재개하고 그 정산에 인계(창 소멸 뒤 재개 경로 하나)·보류가 더해진다; Worker는 구현 attempt dispatch에서만 open Bead를 in_progress로 선점하고 session_ref는 쓰지 않는다" → ADR, supersede UI-u6ud-6
- 알림 네 종류의 문구·억제 키 — 표면 문구는 기본 제외 목록(카피) → ADR 아님
- `[워커로 이어가기]` 대체 버튼 — 위 ADR의 출구 조항 하나로 소비자 집합이 같음 → ADR 아님
