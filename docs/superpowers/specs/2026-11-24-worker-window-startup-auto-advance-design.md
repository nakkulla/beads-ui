---
scope:
  - server/worker/scheduler.js
  - server/worker/tmux-launcher.js
  - server/worker/startup-wait.js
  - server/worker/queue-store.js
  - server/worker/notify.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/monitor/card-parity.test.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# Worker 대화 창의 시작 화면 자동 진행과 대기 표시

Bead: `UI-e5cq` · 날짜: 2026-11-24 · 출처: dotfiles `dotfiles-nk6ea`

## 1. 목표

Worker가 연 대화 창(해결·문의·외부 작업 완료·세션 레인·스펙 작성, Claude와 Codex
모두)이 첫 턴 전에 선택 화면에 걸리면, 화면 종류에 맞는 보기를 Worker가 스스로 골라
넘어간다. 대신 고를 수 없는 화면(로그인, 훅 검토, 약관 같은 금지 범주)과 이유를 모르는
정지는 카드와 이벤트 기록에 보이고, 5분 넘게 이어지면 Discord로 한 번 알린다.

2026-11-24 Worker가 연 Claude 창 두 개가 `Claude in Chrome extension detected` 선택
화면에서 멈췄다. 해결 대화 `hub:resolve-dotfiles-nk6ea`는 01:56부터 7시간, 세션 레인
`hub:dotfiles-rn89c`는 09:09부터 사람이 Enter를 누를 때까지 첫 턴을 시작하지 못했고,
카드에는 대기 표시도 알림도 없었다. 그 화면 자체는 `UI-hdj5`(`--no-chrome`)가 없앴다.
이 설계는 다음에 뜰 다른 화면을 다룬다. 사용자 결정(2026-11-24): 웬만한 화면은 사람을
기다리지 않고 알맞은 보기를 골라 진행하며, Claude와 Codex를 같은 방식으로 맞춘다.

## 2. 검증된 전제

beads-ui는 기준 `5c1d6c4b`, dotfiles는 기준 `acc9695c`의 줄이다.

- 시작 화면 관측 대상은 세션 레인이면서 `provider=codex`인 창뿐이다 — `server/worker/scheduler.js:14517`
- 관측은 창의 `@agent_session`이 채워지면 통과로 보고 `startup_passed_at`을 적으며, 아니면 허브 `codex-startup`으로 화면 종류를 읽어 `startup_wait`를 쓴다. `unknown_screen`과 `screen: null`은 대기가 아니다 — `server/worker/scheduler.js:13575`, `server/worker/tmux-launcher.js:929`
- 같은 화면이 5분을 넘기면 한 번 알린다 — `server/worker/scheduler.js:275`, `server/worker/notify.js:1092`
- 대화형 창 다섯 종류(해결·문의·외부 작업 완료·세션 레인·스펙 작성)는 같은 점검 주기에서 함께 관측된다 — `server/worker/scheduler.js:13475`, `:1513`
- 다섯 종류 모두 프롬프트를 명령줄 인자로 넘긴다. 그래서 정상인 창은 사람 입력 없이 첫 턴을 시작한다 — `server/worker/resolve-session.js:1458`, `:1587`, `server/worker/direction-inquiry.js:728`, `server/worker/scheduler.js:16830`, `server/worker/spec-authoring.js:403`
- Claude 창의 명령줄은 beads-ui가 조립하고 `--no-chrome`을 붙인다 — `server/worker/tmux-launcher.js:864`
- Codex 창은 열기 전에 beads-ui가 작업 폴더의 프로젝트 신뢰를 Codex 설정에 적는다. 그 폴더의 프로젝트 항목이 이미 있으면 값이 무엇이든(명시적인 비신뢰 포함) 그대로 둔다 — `server/worker/tmux-launcher.js:263`, `:285`, `:826`
- 대화형 창의 표지 옵션은 종류마다 하나씩 다섯이고 beads-ui가 정한다 — `server/worker/tmux-launcher.js:24`, `:27`, `:35`, `:43`, `:52`
- 턴 상태는 창 옵션 `@agent_running`·`@agent_attention`에서 오고, 둘 다 비면 `idle`이다 — `server/worker/scheduler.js:1660`
- Claude 창은 `@agent_session`을 갖지 않는다. 살아 있는 Claude 창 모두 비어 있었다 — 명령 `tmux list-panes -a -F '#{window_name} #{@agent_session} #{@agent_running} #{@agent_attention}'`
- 멈춘 Claude 창은 두 옵션이 모두 비어 있었고, Enter로 화면을 넘긴 직후 `@agent_running=1`이 됐다 — 같은 명령, `hub:dotfiles-rn89c` 전후
- 대화형 기록에는 `launched_at`·`last_message`·`startup_wait`·`startup_passed_at`이 있고, 마지막 메시지 시각을 `launched_at`과 비교하는 코드가 이미 있다 — `server/worker/queue-store.js:567`, `:576`, `:581`, `server/worker/scheduler.js:13969`
- 대화 기록을 읽지 못했을 때 서버가 만들어 넣는 안내도 `last_message`에 들어간다. 그래서 `last_message`의 시각만으로는 실제 대화가 있었는지 알 수 없다 — `server/worker/scheduler.js:13961`
- `startup_wait.kind`의 값과 표시 이름은 `hooks`·`update`·`model`·`login`·`trust`·`unknown` 여섯이다 — `server/worker/startup-wait.js:25`
- 세션 레인 타일은 슬롯 3 진행 줄에 `시작 화면 대기 · <이름> <경과>`를 그린다. 다른 종류는 슬롯 1 `▤ 대화 세션` 배지의 꼬리에 턴 낱말을 그리고, 팝업 줄도 같은 꼬리 함수를 쓴다 — `app/views/worker/lanes.js:2184`, `:2020`, `:2074`, `:1929`, `:3129`
- 카드 문법 스펙은 슬롯 3 행과 `정정(UI-ahzh)` 단락에서 이 대기 줄을 Codex 세션 레인으로 한정한다 — `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:281`, `:780`
- 앞 설계(UI-ahzh)는 시작 화면에 키를 대신 누르지 않기로 했고, Claude 창과 세션 레인 밖 대화를 관찰로 남겼다 — `docs/superpowers/specs/2026-11-17-session-lane-codex-startup-wait-design.md:123`, `:160`
- 허브의 Claude 화면 판독은 폴더 신뢰·계획·질문·권한 창만 가리고, 그 밖의 선택 화면은 가리지 못한다. 입력창 판독은 따로 있다 — dotfiles `src/shell/lib/session_hub/screen.py:558`, `:408`, `:369`
- 허브의 Codex 시작 화면 판독은 종류(`hooks`·`update`·`model`·`login`·`unknown`)와 선택된 행을 읽는다. 지문은 종류·머리글·행 라벨로 만들고 선택된 행은 넣지 않는다 — dotfiles `src/shell/lib/session_hub/codex_screen.py:128`, `:162`, `:167`
- 허브의 Codex 업데이트·모델 화면 시험은 머리글에 `Continue`·`Quit` 행을 붙인 합성 화면이다 — dotfiles `tests/session_hub/test_session_hub_codex_screen.py:47`
- 허브의 `codex-startup`은 읽기 전용이고 표지(marker)가 맞는 창만 답한다 — dotfiles `src/shell/lib/session_hub/cli.py:120`, `:286`, `src/shell/lib/session_hub/codex_startup.py:386`
- 허브가 선택 화면에 답하는 기존 방식은 Up/Down으로 커서를 옮기며 매번 화면을 다시 읽고 Enter 하나를 넣는 것이다 — dotfiles `src/shell/lib/session_hub/relay.py:483`
- 허브 문서는 Claude의 폴더 신뢰 창을 주인만 답하는 창으로 둔다 — dotfiles `src/shell/lib/session_hub/claude.py:35`
- 현재 유효한 dotfiles ADR dotfiles-nk6ea의 결정에 "허브는 어떤 시작 화면에도 스스로 보기를 고르지 않는다"(Codex 중계 열기의 시작 선택 화면 절)가 있다. 같은 절은 중계가 아닌 CLI가 시작 핸들을 받지 않는다고 적는다 — dotfiles `docs/adr/dotfiles-nk6ea-base-sync-button-question-authority.md:1812`, `:1807`
- 같은 ADR은 Codex 훅 신뢰에서 trust-all 입력 자동화를 어느 경로에서도 쓰지 않는다고 정하고(H4), 시작 화면을 Hermes 위임 답의 대상에서 뺀다(D1·D2) — 같은 파일 `:1693`, `:1728`, `:1733`
- Claude Code 2.1.331의 Chrome 사용 제안은 설정 `claudeInChromeDefaultEnabled`가 정해지지 않았고 기동 옵션이 `--no-chrome`이 아닐 때만 뜨며, 답하면 그 설정 폴더에 기록된다 — 명령 `grep -a -b -o -F` + `dd`로 실행 파일의 해당 함수 본문 확인
- 미확인: Codex 업데이트·모델 안내 화면의 실제 행 배치 — dotfiles 스펙이 실행 파일 문자열만 확인했고 화면은 폴더 신뢰만 실측했다(`docs/superpowers/specs/2026-11-13-codex-relay-startup-screens-design.md:50`)
- 미확인: Claude 폴더 신뢰 창이 Worker 창에서 실제로 뜨는 경우 — 관측 사례가 없다
- 미확인: Claude 선택 화면에서 머리글과 보기 행을 가르는 빈 줄 구조 — 캡처를 빈 줄을 지운 채로만 읽었다

## 3. 설계

### 3.1 허브 명령 (dotfiles 크로스 리포 unit)

결정: 비중계 하위 명령 두 개를 더한다. 이름과 응답 키는 beads-ui가 소비하는 인터페이스라 여기서 고정한다.

`session-hub startup-screen --runner <claude|codex> --pane <%N> --marker-option <o> --marker-value <v>`

- 읽기 전용이다. 표지 옵션은 beads-ui 대화형 창의 다섯 가지만 받는다. 그 밖의 표지(Hermes
  중계 표지 포함)는 창에 실제로 붙어 있어도 `bad_request`로 거절하고 화면을 읽지 않는다.
  허용 목록의 정본은 허브 코드다.
- 생존 판정은 `alive --pane`과 같고, 살아 있지 않으면
  `{"alive": "dead"|"unknown", "started": false, "screen": null}`이다.
- 살아 있으면 `{"alive": "alive", "started": <bool>, "screen": null}` 또는 `{"alive": "alive", "started": false, "screen": {"dialog": "startup"|"trust"|"unknown_screen", "startup_kind": "<종류>"|null, "fingerprint": "<hex>", "heading": "<글>", "auto": {"choice": "<행 라벨>"}|null}}`를 낸다.
- `startup_kind`는 `dialog=startup`일 때만 값이 있다. Codex는 `hooks`·`update`·`model`·
  `login`·`unknown`, Claude는 `chrome`·`login`·`unknown`이다.
- `auto`는 허브 정책(§3.2)이 이 화면에서 고를 행을 정했을 때만 값이 있다.
- 세션이 이미 시작된 창은 `started: true`, `screen: null`이다. `started: false`에 `screen: null`은
  시작을 확인하지 못했고 읽을 선택 화면도 없다는 뜻이다. Codex는 `@agent_session`이 찼을 때,
  Claude는 `@agent_running`·`@agent_attention` 중 하나가 찼거나 입력창이 보일 때다.
  Claude의 계획·질문·권한 창은 시작 화면이 아니다.
- 결정: 이 두 명령의 `fingerprint`는 `unknown` 화면에서 선택된 행까지 넣어 만든다 — 그 화면은 선택된 행을 그대로 누르므로, 읽은 뒤 커서가 움직였으면 다른 화면으로 봐야 한다. 표에 행이 정해진 화면의 지문은 선택 행과 무관하다.
- 결정: `heading`은 비밀값을 가린 머리글 앞 80자다 — 자동으로 넘긴 화면이 무엇이었는지 이벤트 기록에서 바로 보여야 한다. 보기 목록과 화면 전체 글자는 싣지 않는다.

`session-hub startup-advance --runner <…> --pane <%N> --marker-option <o> --marker-value <v> --fingerprint <hex>`

- 화면을 다시 읽어 지문이 같고 정책이 여전히 행을 정할 때만 그 행을 고른다. 성공하면
  `{"advanced": true, "dialog": …, "startup_kind": …, "choice": "<행 라벨>", "heading": "<글>"}`이다.
- 키를 넣지 않았으면 `{"advanced": false, "key_sent": false, "reason": "<사유>"}`이다. 사유는
  `screen_changed`·`not_auto`·`already_answered`·`busy`·`not_alive`·`started`다.
- Enter를 넣었는데 같은 화면이 남았거나 확인 읽기가 실패하면
  `{"advanced": false, "key_sent": true, "reason": "not_confirmed"}`이다.
- 표지 허용 목록은 읽기 명령과 같다. 키는 기존 방식 그대로다: 창 입력 잠금을 잡고,
  필요하면 Up/Down으로 커서를 옮기며 매번 화면을 다시 읽고, Enter 하나를 넣은 뒤 그 지문의
  화면이 사라졌는지 확인한다. 첫 키 직전에 잠금 안에서 표지와 창 식별을 다시 대조하고,
  어긋나면 키 없이 `not_alive`다.
- 한 창의 한 지문에는 한 번만 답한다. 답 시도 기록은 Enter 전에 쓰므로 `not_confirmed` 뒤의
  같은 지문 호출은 `already_answered`다. 답할 때마다 허브 감사 기록에 러너·표지 값·지문·
  머리글·고른 행·확인 여부를 남긴다.
- 기존 `codex-startup`은 바꾸지 않는다.

화면 판독과 정책 표는 허브가 소유하고 beads-ui는 복제하지 않는다(ADR UI-jlov).

### 3.2 화면별로 고르는 보기

결정: Worker가 연 창의 시작 화면은 아래 표대로 허브가 고른다. 표의 정본은 허브 코드 한 곳이고, 이 스펙은 처음 값을 정한다.

| 러너   | 화면                          | 고르는 행                                                          |
| ------ | ----------------------------- | ------------------------------------------------------------------ |
| claude | 폴더 신뢰                     | `Yes, I trust this folder`                                         |
| claude | Chrome 사용 제안              | `No, keep browser tools off`                                       |
| codex  | 폴더 신뢰                     | `Trust and continue`                                               |
| codex  | 업데이트 안내                 | 이번 실행만 건너뛰는 행(예: `Skip`)                                |
| codex  | 모델 안내                     | `Use existing model`                                               |
| 둘 다  | 그 밖의 선택 화면(`unknown`)  | 화면이 미리 골라 둔 행 그대로(커서를 옮기지 않는다)                |
| 둘 다  | 로그인·API 키                 | 고르지 않는다                                                      |
| codex  | 훅 검토                       | 고르지 않는다                                                      |
| 둘 다  | 금지 범주에 걸린 화면         | 고르지 않는다                                                      |

- 폴더 신뢰를 고르는 근거: 표지가 붙은 창은 Worker가 등록 저장소나 그 워크트리에서 연
  창이고, Codex 창은 지금도 항목이 없는 폴더를 미리 신뢰로 적는다(§2).
- 결정: 기동 때 그 폴더에 신뢰가 아닌 기존 Codex 프로젝트 항목이 있었던 창은 Codex 폴더 신뢰 화면을 자동으로 넘기지 않는다 — 사람이 일부러 적어 둔 비신뢰를 Worker가 뒤집지 않는다. beads-ui가 기동 때 본 사실을 기록에 두고 그 창의 폴더 신뢰 화면에는 `startup-advance`를 부르지 않으며 대기로 다룬다(§3.3).
- 업데이트 안내에서 `Update now`와 `Skip until next version`은 고르지 않는다. 버전은
  dotfiles 설치가 관리하고, 뒤의 것은 영구 설정이다. 건너뛰는 행을 찾지 못하면 고르지 않는다.
- 금지 범주는 머리글이나 행 글자가 다음에 해당하는 화면이다: 로그인·계정·API 키,
  약관·정책·개인정보·데이터 사용 동의, 결제·요금제·체험, 권한 우회 경고, 삭제·초기화.
  글자 목록의 정본은 허브 코드다.
- 결정: Codex 훅 검토는 자동으로 고르지 않는다 — 신뢰하지 않고 넘기면 가드 훅 없이 세션이 돌고, 전부 신뢰하는 입력 자동화는 dotfiles ADR dotfiles-nk6ea H4가 어느 경로에서도 쓰지 않기로 했다. 설치기가 신뢰를 미리 기록하므로 이 화면이 뜨는 것 자체가 확인할 일이다.
- `unknown_screen`(선택 화면 꼴이 아닌 화면)은 고르지 않는다.

### 3.3 관측과 자동 진행 (beads-ui)

- 대상: 살아 있고 정산 전이며 `startup_passed_at`이 빈 대화형 기록 전부. 종류와
  공급자를 가리지 않는다.
- 시작 판정: Codex는 지금처럼 창의 `@agent_session`이 찼을 때. Claude는 창의
  `@agent_running`·`@agent_attention` 중 하나가 찼거나, 허브가 `started: true`를 답했거나,
  실제 대화 기록에서 읽은 메시지의 시각이 `launched_at` 뒤일 때. 서버가 만든 안내(§2)는
  메시지로 세지 않는다. 시작으로 판정하면 `startup_passed_at`을 적고 남은 대기를 지우며
  그 창을 다시 관측하지 않는다.
  결정: Claude의 시작 판정에 기록의 `session_id`를 쓰지 않는다 — Claude는 기동 때 세션 ID를 미리 정하므로 그것으로는 첫 턴을 알 수 없다.
- 시점: 기존 대화형 세션 점검(30초)에서 부른다. 새 타이머는 만들지 않는다.
- 시작 전 창마다 `startup-screen`을 읽는다.
  - `auto`가 있으면 그 지문으로 `startup-advance`를 부른다. 성공하면 §3.4의 이벤트를
    남기고 다음 점검에서 다시 읽는다. 시작 화면은 연달아 뜰 수 있다.
  - 한 창에서 자동 진행은 다섯 번까지고, 같은 지문에는 한 번만 부른다. `key_sent: true`인
    응답은 성공이든 `not_confirmed`든 그 지문을 쓴 것으로 센다. 한도를 넘거나 같은 지문이
    다음 점검에도 남아 있으면 그 화면을 대기로 다룬다.
  - 기동 때 비신뢰 항목이 있었던 Codex 창의 폴더 신뢰 화면은 `auto`가 있어도 부르지 않고
    대기로 다룬다(§3.2).
  - `dialog`가 `startup`·`trust`인데 `auto`가 없으면 대기다. 종류는 `trust`이면 `trust`,
    아니면 `startup_kind`다.
  - `unknown_screen`·`screen: null`·허브 실패는 그 자체로 대기가 아니다.
- 결정: 기동 뒤 2분이 지나도록 시작 판정이 없고 기록된 대기도 없는 창은 종류 `unknown`의 대기로 다룬다 — 판독할 수 없는 화면, 멈춘 프로세스, 허브 명령이 없는 환경을 화면 글자 없이 잡는다. 경과는 `launched_at`부터 센다. 기동 중 화면이 깜빡이지 않게 2분을 둔다.
- 실패: 허브를 부를 수 없거나 응답이 형식에 맞지 않으면 로그를 남긴다. 이미 기록된
  대기는 그대로 두고, 대기가 없는 창에는 위 2분 규칙만 적용한다. `startup-advance`의
  `screen_changed`·`busy`는 이번 점검에서 아무것도 하지 않는다.
- beads-ui는 창에 키를 직접 넣지 않는다. 키는 허브 명령으로만 들어간다.

### 3.4 기록과 이벤트

- `startup_wait`의 모양과 미러(`attempt.interactive.startup_wait`)는 그대로다. `kind`에
  `chrome`(표시 이름 `Chrome 사용 제안`)을 더한다. 2분 규칙의 대기는 창마다 고정된
  지문을 써서 창 하나에 알림이 한 번만 나가게 한다.
- 대화형 기록에 그 창에서 자동 진행한 횟수와 지문을 둔다. 한도와 중복 판정에 쓴다.
- 이벤트(예: 문구는 종류 라벨에 맞춘다):
  - 자동 진행: `<종류> 세션 시작 화면 자동 진행 · <화면 이름> → <고른 행>`. 종류가
    `unknown`이면 화면 이름 뒤에 `heading`을 괄호로 붙인다.
  - 대기 진입·종류 변경: `<종류> 세션 시작 화면 대기 · <화면 이름>`
  - 대기나 자동 진행이 있었던 창이 시작되면: `<종류> 세션 시작 화면 통과`
- 세션 레인의 기존 이벤트 문구(`세션 레인 시작 화면 대기 · …`, `세션 레인 시작 화면 통과`)는
  바꾸지 않는다.

### 3.5 카드 표시

- 세션 레인 타일: 슬롯 3 진행 줄의 기존 `시작 화면 대기 · <이름> <경과>`를 Claude 창에도
  그린다. 새 요소는 없다.
- 그 밖의 종류: 슬롯 1 `▤ 대화 세션` 배지의 꼬리(지금 `대화 중 <경과>`·`답 대기`가 서는
  자리)가 `시작 화면 대기 <경과>`가 된다. 화면 이름은 배지 `title`에 싣는다. 대기 행
  팝업의 `대화 세션 …` 줄도 같은 꼬리를 쓴다. 새 칩·배지·버튼은 없다.
- 꼬리는 지금처럼 공유 함수 한 곳에서 만들고, 재료는 대화형 세션 뷰 투영과
  `buildLanes`를 거쳐 Worker·모니터 두 탭에 같이 간다. 재료가 없으면 그리지 않는다.
- 자동 진행은 카드에 표시하지 않는다. 이벤트 기록에만 남는다.
- 카드 문법 스펙 §5.1 슬롯 3 행의 `Codex 시작 전`을 러너 구분 없는 문구로 고치고,
  슬롯 1 대화형 세션 배지 설명에 꼬리 낱말을 더하며, `정정(UI-e5cq)` 한 단락을 둔다.

### 3.6 알림

- 대기: 같은 지문의 대기가 5분을 넘으면 한 번 알린다. 지금 규칙을 모든 종류와 두
  공급자로 넓힌 것이고, 내용도 지금과 같다(Bead, `시작 화면 대기 · <이름>`, tmux 자리).
- 자동 진행: 표에 이름이 있는 화면은 알리지 않는다. `unknown` 화면을 넘겼을 때만 지문마다
  한 번 알린다 — 처음 보는 화면에서 무엇을 골랐는지 사람이 뒤에 확인하고, 필요하면 표에
  행을 더하게 한다. 내용은 Bead, `시작 화면 자동 진행`, `heading`, 고른 행, tmux 자리다.
- 두 알림 모두 기존 `worker_notify` 설정을 따르고 대기 판정 사유 알림이 아니다.
- 시작 화면 때문에 문의·해결 대화를 새로 띄우지 않는다.

### 3.7 앞 설계와의 관계

UI-ahzh 스펙의 다음 조항을 이 스펙이 바꾼다: §3.2 대상(Codex 세션 레인 → 모든 종류·두
공급자), §3.2의 `unknown_screen` 비표시(그대로 두되 2분 규칙을 더한다), §3.5의 "시작
화면에 키를 대신 누르지도 않는다"(허브 정책이 고른 행은 넣는다), §6의 관찰 두 건(이
스펙이 다룬다). `startup_wait` 기록, 5분 한 번 알림, 슬롯 3 줄은 그대로 쓴다.

## 4. 수락 기준

1. `startup-screen`은 표의 화면에서 `dialog`·`startup_kind`·`fingerprint`·`heading`·`auto.choice`를,
   로그인·훅 검토·금지 범주 화면에서 `auto: null`을, 시작된 창에서 `started: true`와
   `screen: null`을, 표지 값이 다른 창에서 `alive`가 `alive`가 아닌 값을 낸다. 허용 목록 밖
   표지는 창에 붙어 있어도 두 명령 모두 거절하고 키를 넣지 않는다.
2. `startup-advance`는 지문이 같은 표의 화면에서 표의 행을 골라 화면이 사라진 것을
   확인하고 `advanced: true`를 낸다. 지문이 다르면 `screen_changed`, 같은 지문에 두 번째
   호출이면 `already_answered`, `auto`가 없는 화면이면 `not_auto`이고 키를 넣지 않는다.
   `unknown` 화면에서 읽은 뒤 커서만 옮겨졌으면 `screen_changed`다. Enter 뒤에도 화면이
   남으면 `key_sent: true`의 `not_confirmed`이고, 같은 지문의 다음 호출은 `already_answered`다.
3. Chrome 사용 제안이 뜬 Claude 해결 대화 창은 다음 점검에서 `No, keep browser tools off`로
   넘어가고, 이벤트 `… 시작 화면 자동 진행 · Chrome 사용 제안 → No, keep browser tools off`가
   하나 남으며, 알림은 나가지 않는다.
4. `unknown` 선택 화면을 넘긴 창은 이벤트에 `heading`이 실리고 알림이 정확히 한 번 나간다.
5. 로그인 화면이 뜬 창은 키가 들어가지 않고 `startup_wait.kind=login`이 생기며, 5분 뒤
   알림이 한 번 나간다. Codex 훅 검토도 같다(`kind=hooks`). 기동 때 비신뢰 항목이 있었던
   Codex 창의 폴더 신뢰 화면도 키 없이 `kind=trust` 대기가 된다.
6. 허브가 `started: false`에 `screen: null`만 답하거나 실패하는데 2분이 지나도록 시작 판정이
   없고 기록된 대기도 없는 창은 `startup_wait.kind=unknown`이 되고, 경과는 `launched_at`부터
   센다. 2분 안에 시작한 창에는 이 규칙의 대기가 생기지 않는다. 대기가 기록된 뒤 허브가
   실패해도 그 대기는 바뀌지 않는다.
7. Claude 창에서 `@agent_running`이 차거나, 허브가 `started: true`를 답하거나, 대화 기록에서
   읽은 `launched_at` 뒤의 메시지가 생기면 `startup_passed_at`이 적히고 남은 대기가 지워지며, 이후 점검은 그 창에 허브 명령을 부르지 않는다. 기록의
   `session_id`가 미리 채워진 것이나 서버가 만든 안내 메시지만으로는 통과하지 않는다.
8. 한 창에서 자동 진행이 다섯 번을 넘으면 여섯 번째 화면은 대기가 된다. 같은 지문이
   자동 진행 뒤에도 남아 있으면(`not_confirmed` 포함) 다시 부르지 않고 대기가 된다.
9. 해결·문의·외부 작업 완료·스펙 작성 창의 배지 꼬리가 `시작 화면 대기 <경과>`가 되고
   `title`에 화면 이름이 있으며, 같은 Bead의 모니터 카드도 같다. 세션 레인 Claude 창은
   슬롯 3 줄에 선다.
10. 세션 레인 Codex 창의 기존 동작(훅 검토 대기 표시, 5분 알림, 통과 이벤트)이 그대로다.
11. 카드 문법 스펙의 슬롯 1·슬롯 3 문구와 `정정(UI-e5cq)` 단락이 갱신돼 있다.

## 5. 시험

- dotfiles: 두 명령의 수락 1·2 사례. Claude는 Chrome 사용 제안·폴더 신뢰·분류 안 된 선택
  화면·로그인·입력창이 보이는 화면, Codex는 폴더 신뢰·훅 검토·로그인의 기존 고정 화면과,
  고를 행과 피할 행을 함께 넣은 업데이트·모델 화면(기존 합성 화면은 그 행이 없어 쓰지
  않는다). 건너뛰는 행이 없는 업데이트 화면은 키 없음. 금지 범주 글자가 든 화면은
  `auto: null`. 허용 목록 밖 표지(중계 표지)는 두 명령 모두 거절. `unknown` 화면에서 커서만
  바뀐 경우 `screen_changed`. Enter 뒤 화면이 남는 경우 `not_confirmed`와 다음 호출
  `already_answered`. 응답에 보기 목록이 없음.
- `server/worker/scheduler.test.js`: 수락 3~8·10(가짜 launcher, 시계 주입). 종류 다섯과
  공급자 둘의 대상 판정, 비신뢰 항목이 있던 Codex 창의 폴더 신뢰 대기, `started: true`에서
  대기 지움, 서버가 만든 안내 메시지로는 통과하지 않음, 허브 실패 때 기존 대기 유지.
- `server/worker/tmux-launcher.test.js`: 두 허브 응답의 해석과 형식 위반·실패 처리.
- `server/worker/queue-store.test.js`: `kind=chrome` 정규화, 자동 진행 횟수·지문 필드.
- `server/worker/notify.test.js`: 자동 진행 알림 내용, 설정이 꺼졌을 때 미발송.
- `app/views/worker/lanes.test.js`: 배지 꼬리·`title`·팝업 줄, 재료 없음이면 종전 꼬리.
- `app/views/monitor/card-parity.test.js`: 세션 레인 밖 대화의 시작 화면 대기 사례.

## 6. 경계·후속

- 크로스 리포 unit: dotfiles — §3.1의 `startup-screen`·`startup-advance` 명령, §3.2의 정책
  표와 금지 범주, 그 시험. beads-ui 구현 진입 전에 착지해야 하는 선행이다. 처분은
  dotfiles rig의 quick_fix Bead이고 이 스펙의 게이트를 닫는 세션이 만들며, `UI-e5cq`에서
  foreign `blocks` 엣지를 건다. 이 unit은 dotfiles ADR dotfiles-nk6ea의 "허브는 어떤 시작
  화면에도 스스로 보기를 고르지 않는다"를 Worker가 연 표지 창에 한해 바꾼다. 그래서 그
  Bead는 `supersede dotfiles-nk6ea`를 적은 ADR 절을 싣고 사용자 ADR 승인을 받은 뒤에
  구현에 들어간다. 중계 창 조항과 H4는 그대로 재진술한다.
- 관찰: Hermes 중계가 여는 창의 시작 화면 — 지금처럼 사용자가 고른 행으로 답한다. 같은
  정책 명령을 쓰게 맞추는 일은 dotfiles 중계 설계라 여기서 다루지 않는다.
- 관찰: 세션이 시작된 뒤의 질문·계획·권한 창 — 기존 규칙 그대로다.
- 관찰: 허브 `codex-startup` 명령 — beads-ui가 새 명령으로 옮긴 뒤 소비자가 없어진다.
  제거는 dotfiles 쪽 정리다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — dotfiles가 소유한 규칙은 설치본 CLI의 JSON을 소비하고 JS로 복제하지 않는다. 화면 판독과 정책 표를 허브 명령으로 받는 근거다.
- 전제: ADR dotfiles/dotfiles-nk6ea — H4(trust-all 입력 자동화를 쓰지 않는다)를 따라 Codex 훅 검토를 자동으로 고르지 않는다. 같은 ADR의 "허브는 어떤 시작 화면에도 스스로 보기를 고르지 않는다"는 이 설계가 Worker 창에 한해 바꾸는 조항이고, 그 supersede 기록은 §6의 dotfiles unit이 소유한다.
- Worker가 연 창의 시작 화면을 허브 정책이 고른 행으로 자동 진행(beads-ui 쪽) — beads-ui의 `startup-advance` 호출 하나를 지우면 대기 표시만 남아 quick_fix 하나로 되돌아간다. 허브 쪽 조항 변경은 dotfiles ADR이 기록한다 → ADR 아님
- 화면별 고르는 행과 금지 범주 — 허브 코드의 표 한 곳이고 행 추가·삭제가 quick_fix 하나다 → ADR 아님
- 허브 명령 `startup-screen`·`startup-advance`의 이름과 응답 키 — 키·필드 이름(기본 제외 목록) → ADR 아님
- 기동 뒤 2분 미시작 대기, 자동 진행 다섯 번 한도, 5분 알림 — 한도·임계값(기본 제외 목록) → ADR 아님
- 배지 꼬리 `시작 화면 대기 <경과>`의 자리와 문구 — UI 배치·라벨(기본 제외 목록) → ADR 아님
