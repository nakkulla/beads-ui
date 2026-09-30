---
scope:
  - server/worker/tmux-launcher.js
  - server/worker/direction-inquiry.js
  - server/worker/resolve-session.js
  - server/worker/external-wait/session-resume.js
  - server/worker/scheduler.js
  - server/worker/runtime.js
  - server/config.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/worker/running-grid.js
  - app/views/worker/wait-vocabulary.js
  - app/views/worker/external-wait-action.js
  - app/views/worker/index.js
  - app/views/monitor/index.js
  - app/styles.css
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 외부 작업 카드는 잡마다 한 줄로 진행을 말하고, 사람이 누른 세션 창은 사용자의 tmux 세션에 활성 창으로 열린다

- Bead: UI-a119 (`spec_backed`)
- 작성: 2026-09-30 · r1 (spec_review r1 astra REVISE b1/m3 반영 — 종결 잡 경과는 잡별 고정
  `observed_at`, `[세션에서 해결]` 두 경로의 프롬프트 구분, stop 훅 알림 주장 정정, dotfiles 인용 경로)
- 사용자 결정: 2026-09-30 대화 — 클릭 기동 자리(사용자 tmux 세션·활성 창), 대체 없이도 Terminus로
  보이면 된다(붙은 클라이언트 불필요), 재개 첫 프롬프트(요약 뒤 지시 대기), `[세션에서 해결]`도
  같은 규칙과 성공 표시, 잡 줄 형태(잡마다 한 줄), 카드 안내 줄 제거

## 1. 목표

1. 외부 작업 대기 카드에서 어느 서버의 어떤 잡이 어떤 상태로 얼마나 돌았는지, 몇 건이 끝났는지를
   한눈에 읽는다. 카드의 안내 줄(`완료되면 같은 세션을 이어간다`,
   `완료 · [세션에서 이어가기] 또는 [워커로 이어가기]`)은 없앤다.
2. 사람이 누르는 세션 조작(`[세션에서 이어가기]`·`[세션에서 해결]`)은 bdui 전용 세션이 아니라
   사용자의 tmux 세션에 새 창을 열고 그 세션의 활성 창으로 둔다. 데스크톱에 붙어 있으면 바로
   보이고, 붙어 있지 않으면 나중에 Terminus로 붙을 때 그 창이 보인다.
3. `[세션에서 이어가기]`로 열린 세션은 혼자 진행하지 않고 완료 정보를 요약한 뒤 사람의 지시를
   기다린다 — `[워커로 이어가기]`와 행동이 갈린다.
4. 창이 열리면 카드가 그 자리(`dev:7`)를 계속 보이고, 재개 창이 살아 있는 동안 카드는 후보
   레인으로 떨어지지 않는다.

## 2. 검증된 전제

기준: `origin/main` `02f9a015`(코드 파일은 로컬 `f2cf8080`과 같다).

- 사람 클릭 세 경로가 tmux 창을 연다: 외부 대기 재개 `session-resume.js`, 파킹·복구의
  `launchForClick`, 그 밖 실패의 `resolveSession.resolve` — server/worker/external-wait/session-resume.js:427-434, server/ws/worker-handlers.js:6373, server/ws/worker-handlers.js:6385
- 자동 기동은 `onParkedAttempt`(게이트 `worker_direction_inquiry.enabled`)이고 클릭은 게이트를
  읽지 않는다 — server/worker/direction-inquiry.js:6-10
- 세 경로 모두 설정 세션(기본 `bdui-inquiry`)에 연다. 그 세션은 "사용자의 작업 세션에 끼어들지
  않도록" 따로 둔 것이다 — server/config.js:13-17, server/worker/direction-inquiry.js:544, server/worker/resolve-session.js:473, server/worker/scheduler.js:1416-1417
- launcher는 대상 세션이 없으면 `new-session -d`로 만들고 창은 `new-window -d`로 연다 —
  server/worker/tmux-launcher.js:602-610, server/worker/tmux-launcher.js:641-656
- pane 생존·중복 판정은 `list-panes -a`라 창이 어느 세션에 있든 같다 — server/worker/tmux-launcher.js:374-379, server/worker/tmux-launcher.js:498-502
- `new-window`에서 `-d`를 빼면 새 창이 그 세션의 현재 창이 되고, 한 번도 붙지 않은 세션은
  `session_last_attached`가 비어 있다 — 명령: 격리 소켓 `tmux -L bdui-a119-probe`(3.6a)에서
  `new-window -d` 뒤 활성 1, `new-window` 뒤 활성 3, `list-sessions`의 `last=` 빈 값
- 지금 tmux: `dev`만 `session_last_attached` 값이 있고 `bdui-inquiry`·`claude-retry-*`는 비어
  있다 — 명령: `tmux list-sessions -F '#{session_name} #{session_last_attached}'`
- Analysis-owzn 재개: `resume.launched_at` 04:12:28Z, Bead `updated_at`(클레임) 04:12:58Z, 창은
  `bdui-inquiry:2` — 명령: `external-wait.json` 레코드 `w-5f01de7ee2c6` 읽기, `bd show`, `tmux list-windows -a`
- 재개 프롬프트 머리는 "워크플로 절차대로 in_progress를 클레임한다"로 자동 진행을 지시하고,
  서버는 창 확인 뒤 키를 지운다 — server/worker/external-wait/session-resume.js:40-41, server/worker/external-wait/session-resume.js:282
- dotfiles 계약은 첫 프롬프트가 완료 블록이고 첫 편집 전 키 부재 확인·클레임만 요구한다 — dotfiles
  src/shared/skills/flow/workflow/references/external-wait.md:67-72
- 파킹·복구의 `[세션에서 해결]`은 dotfiles 진입 블록 하나(`CONVERSATION_ENTRY_BLOCK`)로 같은 세션
  대화를 열고, 그 밖 실패의 `[세션에서 해결]`은 자체 프롬프트(`buildResolvePrompt`)로 수정·push를
  지시한다 — server/worker/direction-inquiry.js:104-124, server/worker/resolve-session.js:235-278
- 키가 없는 `open` 행은 `qualifySession` 대상이 아니라 후보가 된다 — server/worker/runnable-cache.js:523-536
- 대화형 세션 레코드는 후보를 포함한 모든 항목에 bead별로 붙는다 — app/views/worker/lane-model.js:2917-2941, app/views/worker/lane-model.js:4751-4760
- 대화형 세션 배지 라벨은 종류·모드·꼬리이고 창 자리는 `title`에만 있다 — app/views/worker/lanes.js:1647-1685
- 같은 세션 대화 성공 토스트는 문장이 없다(`null`) — app/views/worker/index.js:507-528
- 외부 대기 재개 토스트는 창 자리를 4초 보인다 — app/views/worker/external-wait-action.js:27-60
- 카드 슬롯 3은 headline 뒤에 외부 대기의 `release` 줄을 그린다 — app/views/worker/lanes.js:2634-2656
- 서버 headline은 잡 1건이면 `<host> 작업 <id> · <STATE> · 경과`, 여러 건이면 개수 요약이다 — server/worker/wait-judgment.js:332-360
- 카드에 붙는 레코드 투영은 `jobs`·`completion`을 싣고, 잡마다 `submitted_at`·`state`·`observed_at`과
  `terminal`(exit·근거·`recovery_needed`·기대 산출물, 잡별 `completed_at`은 없음)을 싣는다 —
  app/protocol.js:115-129, server/worker/attach.js:145-163
- 관찰기는 종결된 잡을 다시 관찰하지 않으므로 잡의 `observed_at`은 종결을 관찰한 시각에 고정된다
  (그 시각이 `terminal.completed_at`이다) — server/worker/external-wait/observer.js:81-83, server/worker/external-wait/observer.js:101-116
- 잡 상태 어휘: slurm 종결 상태 11종, process는 `RUNNING`·`UNKNOWN`·`COMPLETED`·`FAILED`·`VANISHED` —
  server/worker/external-wait/adapters/slurm.js:1-13, server/worker/external-wait/adapters/process.js:39-63, server/worker/external-wait/adapters/process.js:92-99
- 완료 배지는 `✅ 완료 · 이어하기 대기`, 진행 배지는 `⏳ 외부 작업`이다 — app/views/worker/lanes.js:3859-3867
- 슬롯 규칙: 슬롯 3 대기 문장은 headline 한 줄, `release`는 배지 팝업, 작업 번호·상태는 슬롯 3,
  슬롯 5는 저장소·호스트만(UI-8gem); 카드의 ssh·잡 번호·log 칩은 없고 잡 표는 상세(UI-l48z) —
  docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:437-444, docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:484-496
- ADR UI-nuwy는 기동 조건(게이트·tmux fail-closed·Bead당 하나)을 정하지만 창을 여는 tmux 세션은
  정하지 않는다 — docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:60-61, docs/adr/UI-nuwy-same-worker-session-conversation-and-return.md:239-241
- dotfiles stop 훅은 창 가시성을 로그 라벨에만 쓰고 Discord 알림은 가시성과 무관하게 쿨다운으로만
  거른다 — dotfiles src/claude/hooks/stop-hook.sh:320-339
- 재작성 UI-dbn6는 이 문서 이후 착지한 카드 동작을 승계하고 `lane-model.js`를 `app/model/`로 옮긴다 —
  docs/superpowers/specs/2026-09-23-frontend-rewrite-unified-pipeline-design.md:146-155(origin/main), docs/superpowers/plans/2026-09-29-frontend-rewrite-unified-pipeline.md:203(origin/main)

## 3. 설계

### 3.1 사람 클릭 기동의 창 자리

- 적용 대상은 사람 클릭 세 경로다(§2 첫 줄). 자동 기동(`onParkedAttempt`와 복구 대기 자동 대화)은
  바꾸지 않는다 — 설정 세션에 `-d`로 연다.
- 결정: 창 자리 선택은 launcher 한 곳이 한다. 호출자는 "사용자 자리" 또는 "inquiry 자리"만
  요청하고(예: `launch({ placement: 'user' })`), 결과는 실제로 쓴 자리를 싣는다
  (예: `placement: 'user'|'inquiry'`, `tmux_session`, `tmux_window`).
- 사용자 세션 선택: 기동 때마다 `list-sessions`로 `session_last_attached`가 비어 있지 않은 세션 중
  값이 가장 큰 세션. 설정된 inquiry 세션 이름은 후보에서 뺀다. 동률이면 이름 사전순 첫째.
  붙은 클라이언트가 지금 있는지는 보지 않는다 — 세션은 detached여도 살아 있고, 나중에 붙으면 그
  창이 보인다(사용자 결정).
- 사용자 자리의 창은 `new-window`에 `-d`를 주지 않아 그 세션의 현재 창이 된다. 클라이언트를 다른
  세션으로 옮기는 `switch-client`는 하지 않는다. 창 이름·marker·명령은 지금과 같다.
- 후보 세션이 없거나 `list-sessions`가 실패하면 inquiry 세션에 `-d`로 연다(지금 동작). tmux 자체가
  닿지 않으면 지금처럼 `tmux_unavailable`로 기동하지 않는다.
- 이미 열린 창(`already_running`)을 클릭이 다시 가리키면 새 창을 만들지 않고 그 창을 그 세션의
  활성 창으로 만든다(`select-window`, 실패는 기록만 하고 응답은 그대로). 창을 다른 세션으로 옮기지
  않는다.
- 결과: 데스크톱에서 `dev`에 붙어 있으면 클릭한 창이 바로 보인다. Discord 알림은 창 자리와
  무관하게 지금과 같다(§2 stop 훅 줄).

### 3.2 `[세션에서 이어가기]`의 첫 프롬프트

- 완료 블록(`externalWaitCompletionPrompt`)은 그대로 두고 앞머리 문장만 바꾼다. 새 머리가 말할 것:
  사람이 `[세션에서 이어가기]`로 이 세션을 사용자의 tmux 창에서 재개했다 · 아래 완료 블록을 몇 줄로
  요약하고 사람의 지시를 기다린다 · 지시 전에는 클레임·파일 편집·잡 제출을 하지 않는다 · 대기
  키는 서버가 창 기동을 확인한 뒤 해제한다 · 지시를 받아 작업을 시작할 때 첫 편집 전에
  `bd show --json`으로 `external_wait` 키 부재를 확인하고 워크플로 절차대로 `in_progress`를
  클레임한다.
- 이 문장은 dotfiles `external-wait.md`의 조항(첫 프롬프트 = 완료 블록, 첫 편집 전 키 확인·클레임)과
  모순되지 않으므로 dotfiles는 바꾸지 않는다.
- `[세션에서 해결]`의 프롬프트는 두 경로 모두 바꾸지 않는다(§2 해당 줄). 파킹·복구 경로는 dotfiles
  진입 블록 하나로 같은 세션 대화를 열어 사람 답을 기다리고, 그 밖 실패 경로는 지금의
  `buildResolvePrompt` 지시(수정·push)를 그대로 쓴다. 두 경로에서 바뀌는 것은 창 자리뿐이다.
- 원래 세션이 살아 있거나 확인되지 않을 때 창을 열지 않고 재개 명령을 복사하는 동작은 그대로다.

### 3.3 창이 열렸다는 표시와 레인 자리

- 토스트: 세 클릭 경로 모두 기동 성공이면 창 자리를 말한다 — 사용자 자리
  `dev:7에 열었습니다 · 활성 창`, inquiry 대체 `bdui-inquiry:3에 열었습니다 · 사용자 tmux 세션을
  찾지 못함`, 이미 열림 `이미 열려 있습니다 · dev:7`. 같은 세션 대화 성공도 이제 문장이 있다.
  새 세션 대체의 사유 문구(`<runner> 새 세션으로 시작 (<사유>)`)는 자리 뒤에 붙여 유지한다.
- 카드 지속 표시: 슬롯 1 대화형 세션 배지 라벨에 창 자리를 넣는다 —
  `▤ <종류> 세션[ · <모드>] · <tmux_session>:<tmux_window>[ · <꼬리>]`. 모드 낱말은 fork·새
  세션·복구일 때만 라벨에 남고 같은 세션(`resume`)은 `title`로 간다. 예: `▤ 재개 세션 · dev:7`,
  `▤ 문의 세션 · dev:7 · 대화 중 5m`, `▤ 해결 세션 · 새 세션 · dev:7`. 창이 닫혀 레코드가 정산되면
  배지는 지금처럼 `세션 닫는 중`을 거쳐 사라진다.
- 레인 자리: `external_wait` 키가 없는 `open` Bead라도 살아 있는(`state: 'live'`이고 정산 전)
  `external_resume` 레코드가 있으면 후보 카드가 아니라 실행 중 레인의 세션 타일로 선다. 세션이
  클레임하면 기존 `in_progress` 세션 타일 규칙이 이어받고, 창이 닫히면 이 규칙이 풀려 원래 자리로
  돌아간다. 판정은 `buildLanes` 한 곳이고 Worker·Monitor가 같다. 서버 `qualifySession`은 바꾸지
  않는다 — 레코드는 클라이언트 모델만 안다.

### 3.4 외부 작업 카드의 잡 줄

- 결정: 잡 줄 판정은 순수 함수 하나(예: `externalJobRows(record, now)`)가 하고 렌더러는 그리기만
  한다 — 재작성 뒤의 렌더러도 같은 함수를 부른다. 재료는 카드에 붙는 레코드 투영의 `jobs`·`completion`
  이며 서버 필드를 늘리지 않는다. 레코드가 없으면(키만 남은 `wait_record_missing`) 지금처럼 서버
  headline 한 줄이다.
- 한 잡은 한 줄 `<글리프> <호스트> <잡 번호> <상태어> <경과>`다. 호스트가 없으면 `로컬`, 잡 번호는
  slurm `job_id`, process는 `pid <n>`. 원래 state·exit code·근거는 그 줄의 `title`이다.

| 조건 | 글리프 | 상태어 |
| --- | --- | --- |
| 종결, state `COMPLETED`, exit가 0 또는 없음, `recovery_needed` 아님 | `✓` | 완료 |
| 종결, state `VANISHED` | `?` | 결과 모름 |
| 그 밖의 종결(실패 상태·exit ≠ 0·`recovery_needed`) | `✕` | 실패 |
| 비종결 `RUNNING` | `◐` | 실행 중 |
| 비종결 `PENDING`·`CONFIGURING`·`REQUEUED` | `○` | 대기 중 |
| 비종결 `UNKNOWN` | `·` | 확인 중 |
| 그 밖 | `·` | 원래 state |

- 경과: 비종결은 `now − submitted_at`, 종결은 그 잡의 `observed_at − submitted_at`이다 — 종결 잡의
  `observed_at`은 종결을 관찰한 시각에 고정된다(§2 관찰기 줄). 레코드 전체의 `completion.completed_at`은
  마지막 잡이 끝난 시각이라 잡별 경과에 쓰지 않는다. 형식은 1시간 이상
  `1h29m`, 1분 이상 `19m`, 그 아래 `<1m`, 재료가 없으면 칸을 생략한다.
- 정렬: 실행 중 → 대기 중·확인 중·그 밖 비종결 → 실패·결과 모름 → 완료, 같은 묶음 안에서는
  `submitted_at` 오름차순. 줄은 최대 4줄이고, 잡이 5건 이상이면 앞 3줄 뒤에
  `외 <n>건 · 전체는 상세의 잡 표`를 쓴다.
- 배지(슬롯 1): 잡이 2건 이상이면 종류 라벨 뒤에 `· <종결 수>/<전체> 완료`
  (`⏳ 외부 작업 · 1/2 완료`). 종결 수는 실패·결과 모름을 포함한다 — 끝났는지를 세고, 성패는 잡
  줄의 글리프가 말한다. 완료 배지는 `✅ 외부 작업 완료`이고 2건 이상이면 `· <n>건`이 붙는다.
  판정 배지(`⛔ 조치 필요 · …`·`⚠ 지연 · …`)는 지금처럼 이것들보다 우선이고 꼬리를 붙이지 않는다.
- 카드 슬롯 3에는 잡 줄과 관찰 오류 줄(`관찰 오류 n회 · …`)만 선다. `release` 문장은 카드에 그리지
  않고 배지 팝업의 판정 근거에만 남는다(UI-8gem 규칙과 맞춘다). 서버 `release`·headline 문자열은
  알림 등 다른 소비자를 위해 그대로 둔다.
- 배치: 잡 줄은 5열 격자(글리프·호스트·번호·상태어·경과), 경과는 오른쪽 정렬 `tabular-nums`,
  상태어 색은 기존 성공·위험·진행·중립 토큰. 390px 폭에서 가로 스크롤이 없고, 넘치면 호스트 칸이
  줄을 넘긴다.
- 적용 렌더러: 외부 대기 카드 조각을 쓰는 전부(`runningTile` 세션 타일·`candidateCard`·`miniRow`
  카드 변형, Worker·Monitor 동일). 이슈 상세의 잡 표는 바꾸지 않는다.

### 3.5 카드 슬롯 표 정정

`2026-08-25-card-header-grammar-unify-design.md` §5.1에 `**정정(UI-a119).**` 문단을 더한다:
외부 작업 대기의 슬롯 3은 headline 한 줄 대신 잡 줄(최대 4줄)이고 답하는 질문은 "어디까지
왔나"다 · 슬롯 5에 잡 번호·호스트 칩을 되살리지 않는다(UI-l48z 유지) · 슬롯 1 외부 대기 배지의
완료 수 꼬리와 `✅ 외부 작업 완료` · 슬롯 1 대화형 세션 배지 라벨의 창 자리. 근거는 이 문서 §3.3·§3.4.

### 3.6 재작성 UI-dbn6와의 관계

서버 부분(§3.1·§3.2)은 재작성과 무관하다. 모델 부분(§3.3 레인 자리, §3.4 `externalJobRows`)은
순수 함수라 `lane-model.js`든 `app/model/`이든 같은 규칙으로 들어간다. 렌더 부분은 구현 진입 때
살아 있는 렌더러에 적용한다. 먼저 착지한 쪽이 뒤에 착지하는 쪽 staleness 재검토의 입력이다 —
재작성 스펙 §3.4의 "이 문서 기준 이후 착지한 카드 동작 승계" 절이 이 문서를 인용하게 된다.

## 4. 오류와 대체

- 사용자 세션 후보 없음·`list-sessions` 실패 → inquiry 자리(§3.1). 선택한 세션이 기동 직전에
  사라져 `new-window`가 실패하면 지금의 `launch_failed:new_window` 응답이다 — 다시 누르면 새로
  고른다.
- `select-window` 실패는 응답을 바꾸지 않는다.
- 레인 자리 규칙은 `live` 레코드만 읽는다. 레코드 부재·깨짐은 규칙을 걸지 않는다(fail-quiet).
- 잡 재료가 빠진 칸은 생략하고, 한 잡의 칸이 모두 비면 그 줄을 생략한다. 모든 줄이 생략되면 서버
  headline으로 돌아간다.

## 5. 수용 기준

1. 원래 세션이 꺼진 세션 소유 외부 대기 완료 카드에서 `[세션에서 이어가기]`를 누르면 가장 최근에
   붙은 사용자 tmux 세션에 Bead ID 이름의 창이 생기고 그 세션의 현재 창이 된다. inquiry 세션에는
   창이 생기지 않는다.
2. 그 세션의 첫 프롬프트는 §3.2 머리 + 완료 블록이고, 머리는 "지시를 기다린다"와 "지시 전 클레임·
   편집·잡 제출 없음"을 담는다.
3. `[세션에서 해결]`의 두 서버 경로도 1과 같은 자리 규칙을 쓴다. 자동 기동은 inquiry 세션 `-d`
   그대로다.
4. 사용자 세션 후보가 없으면 inquiry 세션에 `-d`로 열고 토스트가 그 사실을 말한다.
5. 이미 열린 창을 가리키는 클릭은 새 창 없이 그 창을 활성 창으로 만들고 자리를 말한다.
6. 성공 토스트가 창 자리를 말하고, 창이 사는 동안 카드의 대화형 세션 배지가 `<세션>:<창>`을 보인다.
7. 재개 창이 살아 있는 키 없는 `open` Bead는 실행 중 레인 세션 타일이고, 창이 닫히면 후보로
   돌아간다(Worker·Monitor 같음).
8. 외부 작업 카드 슬롯 3은 §3.4 표·정렬·상한대로 잡 줄을 그리고 `release` 줄은 카드에 없다.
9. 배지는 2건 이상 `· a/n 완료` 꼬리, 완료는 `✅ 외부 작업 완료`, 판정 배지가 우선이다.
10. 390px 뷰포트에서 잡 2건 카드와 5건 카드가 가로 스크롤 없이 보인다(스크린샷).
11. 카드 문법 스펙 §5.1에 정정(UI-a119) 문단이 있다.

## 6. 테스트

- `server/worker/tmux-launcher.test.js`: 사용자 세션 선택(최대 `last_attached`·빈 값 제외·inquiry
  이름 제외·동률 이름순), 후보 없음 → inquiry `-d`, 사용자 자리 `new-window`에 `-d` 없음,
  `already_running` 클릭의 `select-window`.
- `server/worker/external-wait/session-resume.test.js`: 사용자 자리 요청, 새 머리 문장, 결과 자리.
- `server/worker/direction-inquiry.test.js`: `launchForClick`은 사용자 자리, `onParkedAttempt`는
  inquiry `-d`. `server/worker/resolve-session.test.js`: `resolve`는 사용자 자리.
- `app/views/worker/lane-model.test.js`: `live` `external_resume` 레코드가 있는 키 없는 `open`
  항목 → 실행 중 세션 타일, 정산된 레코드 → 후보.
- 잡 줄 순수 함수 테스트: 상태어 표 각 행, 정렬, 4줄 상한과 `외 n건`, 경과 형식, `로컬`·`pid`,
  종료 시각이 다른 두 종결 잡의 경과가 각자의 `observed_at`으로 갈리는 경우, 일부만 종결된 레코드
  (종결 잡은 고정 경과, 비종결 잡은 `now` 기준).
- `app/views/worker/lanes.test.js`·`running-grid.test.js`·`app/views/monitor/index.test.js`: 슬롯 3
  잡 줄, `release` 줄 부재, 배지 꼬리, 대화형 세션 배지 라벨의 자리. 카드에 `release` 줄이
  있다고 단언하던 기존 테스트는 이 스펙의 동작으로 갱신한다.
- `app/views/worker/external-wait-action.test.js`·`index.test.js`: 토스트 문구(사용자·대체·이미 열림·
  같은 세션 성공).
- 수동: Playwright 390px 캡처(수용 기준 10), 실제 `dev` 세션에서 클릭 한 번(수용 기준 1·6).

## 7. 비목표

- 자동 기동의 창 자리, `[워커로 이어가기]`·`[새 세션으로]`·`[대기 해제]`·`[관찰 중단]` 동작.
- 원래 세션이 살아 있을 때의 재개 명령 복사, Codex 재개 지원.
- 이슈 상세 잡 표, 서버 `release`·headline 문자열, dotfiles 진입 블록·`external-wait.md`.
- 창을 다른 tmux 세션으로 옮기기, 클라이언트 `switch-client`.

## 결정 (ADR 후보)

- 전제: ADR UI-nuwy — 같은 세션 대화의 기동 조건(자동 게이트·tmux fail-closed·Bead당 하나)과
  진입 블록, 대화형 세션 배지 꼬리, "카드에 ssh·잡 번호·log 칩 없음, 잡 표는 상세" 조항을 따른다.
  창을 여는 tmux 세션은 그 ADR이 정하지 않는 자리라 이 문서가 정한다.
- 전제: ADR UI-nuwy-2 — beads-ui가 띄운 대화형 세션은 슬롯을 점유하지 않는 별도 큐 레코드이고
  생존·종료는 reconcile이 소유한다. §3.3 레인 자리는 그 레코드의 `live`만 읽는다.
- 사람 클릭 기동 창은 가장 최근 붙은 사용자 tmux 세션의 활성 창, 자동 기동은 inquiry 세션
  백그라운드 — 되돌리기 쉬움: launcher의 자리 선택 하나와 `-d` 인자이고 함께 움직일 다른 소비자가
  없다 → ADR 아님
- 외부 작업 카드 슬롯 3의 잡 줄과 배지 완료 수 꼬리 — UI 레이아웃·표시 형식(기본 제외 목록) → ADR 아님
- 재개 세션 첫 프롬프트는 요약 뒤 지시 대기 — 문구(기본 제외 목록) → ADR 아님
- 살아 있는 재개 세션이 있는 키 없는 `open` Bead는 실행 중 레인 세션 타일 — 되돌리기 쉬움:
  `buildLanes` 판정 하나 → ADR 아님
