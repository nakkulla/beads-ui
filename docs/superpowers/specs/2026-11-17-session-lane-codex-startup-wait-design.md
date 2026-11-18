---
scope:
  - server/worker/tmux-launcher.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/notify.js
  - app/views/worker/lanes.js
  - app/views/worker/lane-model.js
  - app/views/monitor/card-parity.test.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
---

# 세션 레인 Codex 세션의 시작 화면 대기 표시

Bead: `UI-ahzh` · 날짜: 2026-11-17 · 출처: dotfiles `dotfiles-lbltf`
(스펙 `docs/superpowers/specs/2026-11-15-codex-hook-trust-installer-record-design.md` §7)

## 1. 목표

세션 레인 Codex 세션이 시작 화면(훅 확인·업데이트 안내·모델 안내·로그인·폴더
신뢰)에서 사람 입력을 기다리면 카드와 이벤트 기록이 그 사실과 화면 종류를
보여 주고, 같은 화면이 5분 넘게 이어지면 Discord로 한 번 알린다. 2026-11-15
09:19 KST 두 세션이 `Hooks need review`에서 31분 동안 멈췄는데, 카드는 `세션 실행`
칩과 경과 시간만 보였고 알림도 없었다.

Bead 본문의 권고 방향("`session-hub open` 응답의 `dialog`·`startup_kind`를 읽는다")은
쓸 수 없다. 그 필드는 Hermes 중계 모드 응답에만 있고, beads-ui가 쓰는 비중계
`open` 응답에는 없다(§2). 그래서 이 설계는 dotfiles 허브에 창 하나의 시작 화면을
묻는 조회 명령을 더하고(크로스 리포 unit), beads-ui가 기존 세션 점검 주기에서 그
명령을 부른다.

## 2. 검증된 전제

- beads-ui 세션 레인 창은 비중계 `session-hub open --marker-option … -- <codex>`로 열리고, 응답에서 `status`·`pane`·`tmux_session`만 읽는다 — `server/worker/tmux-launcher.js:824-892`
- 비중계 `open` 응답은 `status`·`session_id`·`tmux_session`·`window`·`pane`·`pid`·`server_started`·`placement`·`note`뿐이고 `dialog`가 없다 — dotfiles `src/shell/lib/session_hub/launch.py:391-399`, `src/shell/lib/session_hub/cli.py:222-246`
- `--agent codex`는 중계 모드에서만 허용되고, 중계 모드는 `--marker-option`을 거부한다 — dotfiles `src/shell/lib/session_hub/cli.py:226`, `:330`
- 허브의 `codex_screen.startup()`은 SessionStart 이전 화면을 `dialog=startup|trust|unknown_screen`으로 나누고, `startup`에는 `startup_kind=hooks|update|model|login|unknown`을 붙인다. 입력 프롬프트가 보이면 `None`이다 — dotfiles `src/shell/lib/session_hub/codex_screen.py:128-170`
- 선택지 형식이 아닌 화면은 로그인 문구가 보이는 경우(`startup/login`)를 빼고 모두 `unknown_screen`이다(첫 선택 화면 전 기동 중 화면 포함) — dotfiles `src/shell/lib/session_hub/codex_screen.py:147-154`, `:166-168`
- 재개 기동은 실행 전에 `resume_session_id`를 레코드 `session_id`(`session_id_source=launch`)에 적으므로, 레코드 `session_id`의 유무로는 SessionStart 통과를 알 수 없다 — `server/worker/scheduler.js:16435-16436`, `:16529-16534`
- 중계 모드의 시작 화면 관측은 화면을 답한 뒤 다음 화면이 뜰 때까지 다시 관측한다. 시작 화면은 연달아 뜰 수 있다 — dotfiles `src/shell/lib/session_hub/codex_startup.py:176-246`
- 허브는 `alive --pane --marker-option --marker-value`로 마커를 확인하며 창 하나의 생존을 답한다 — dotfiles `src/shell/lib/session_hub/cli.py:110-115`, `:256-275`
- beads-ui는 대화형 세션 점검을 30초마다 돌리고, 그때 창의 `@agent_running`·`@agent_attention`으로 `turn_state`를 정한다. 두 옵션이 비면 `idle`이다 — `server/worker/attach.js:470`, `server/worker/scheduler.js:1639-1650`, `:14144-14157`
- `session_id`가 없으면 같은 점검이 창 옵션 `@agent_session`을 읽어 채운다. Codex 쪽은 알림 훅이 이 옵션을 쓴다 — `server/worker/scheduler.js:14158-14180`, dotfiles `src/codex/hooks/codex-notifier-service.py:1207`
- 세션 레인 창의 turn 사실은 시도 기록 `attempt.interactive`로 옮겨 적힌다 — `server/worker/scheduler.js:11532-11566`
- 실행 중 세션 레인 타일의 슬롯 3 진행 줄은 `interactiveTurnWord`가 고른 낱말(`대화 중`·`답 대기`)과 마지막 발췌를 그린다. `idle`에 처리한 메시지가 없으면 낱말이 비어 줄이 사라진다 — `app/views/worker/lanes.js:1938-1956`, `:2165-2189`
- 카드 문법 슬롯 3 행에는 `세션 레인 대화 상태 줄(`대화 중 <경과>`·`답 대기` + 발췌)`이 있다 — `docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md:272`
- 세션 레인 기동 알림은 기동할 때 한 번만 보내고, 그 뒤 답 대기는 beads-ui가 보내지 않는다 — `server/worker/notify.js:795-808`
- 현행 결정(ADR UI-1fss가 UI-6xw7에서 승계한 조항)에 따라 대기 판정 사유 알림(`action_required`·`overdue`)은 꺼져 있다 — `docs/adr/UI-1fss-quickfix-landing-failure-conversation.md:1186`
- 실행 중 세션 레인 타일에는 `[세션에서 이어가기]`·`[워커로 이어가기]`가 서지 않는다 — `app/views/worker/tile-resolve.js:347-355`
- 이벤트 기록은 기동 때 `<라벨> 세션 시작 · <출처>` 한 줄을 남긴다 — `server/worker/scheduler.js:14100-14106`

## 3. 설계

### 3.1 허브 조회 명령 (dotfiles 크로스 리포 unit)

결정: 비중계 하위 명령 `session-hub codex-startup --pane <%N> --marker-option <o> --marker-value <v>`를 더한다. 이름과 응답 키는 beads-ui가 소비하는 인터페이스라 여기서 고정한다.

- 마커 확인과 생존 판정은 `alive --pane`과 같다. 살아 있지 않으면
  `{"alive": "dead"|"unknown", "screen": null}`.
- 살아 있으면 중계 시작 관측과 같은 방식으로 창을 캡처해 `codex_screen.startup()`으로
  분류하고 `{"alive": "alive", "screen": null}` 또는
  `{"alive": "alive", "screen": {"dialog": "startup"|"trust"|"unknown_screen", "startup_kind": "<종류>"|null, "fingerprint": "<hex>"}}`를 낸다.
  `startup_kind`는 `dialog=startup`일 때만 값이 있다.
- 화면 글자·제목·선택지는 응답에 싣지 않는다. beads-ui에는 종류만 있으면 되고,
  터미널 글자를 다른 저장소로 옮기지 않는다.
- 읽기 전용이다. 키를 보내지 않고 허브 상태 파일도 쓰지 않는다. 거절은 다른
  허브 명령과 같은 `{"ok": false, "code": …}` 형식이다.

분류 규칙은 허브가 소유하고 beads-ui는 복제하지 않는다(ADR UI-jlov).

### 3.2 관측 (beads-ui)

- 대상: 세션 레인 대화형 레코드 가운데 `provider=codex`, `state=live`이고 창이 살아
  있으며, 그 창의 `@agent_session` 옵션이 아직 비어 있는 것. 새 세션이든 재개
  세션이든 같다.
  결정: 종료 조건은 레코드 `session_id`가 아니라 현재 창의 `@agent_session`이다 — 재개 기동은 레코드 `session_id`를 미리 채워 두므로(§2) 그것으로 판정하면 재개 중 시작 화면을 놓친다.
- 창 옵션이 채워지면 SessionStart를 지난 것이므로 조회를 멈추고 대기 표시를 지운다.
  레코드에 이 통과 사실을 남겨 같은 창에서 다시 조회하지 않는다.
- 시점: 기존 대화형 세션 점검(30초)에서 `turn_state` 관측 다음에 부른다. 새 타이머는
  만들지 않는다. 시작 화면이 연달아 뜰 수 있어 기동 때 한 번만 보지 않는다.
- 해석: `dialog=startup`이면 종류는 `startup_kind`, `dialog=trust`이면 `trust`다.
  `unknown_screen`과 `screen: null`은 대기가 아니다.
  결정: `unknown_screen`은 표시하지 않는다 — 기동 중 화면도 같은 값이라 표시하면 기동할 때마다 깜빡인다.
- 실패: 허브를 부를 수 없거나 응답이 형식에 맞지 않으면 로그만 남기고 이전 값을
  유지한다. 그 실패로 새 알림을 보내지 않는다.

### 3.3 기록과 이벤트

- 대화형 레코드에 `startup_wait: { kind, fingerprint, since, notified_at } | null`을 둔다.
  `kind`는 `hooks|update|model|login|trust|unknown`이고, 정규화는 목록 밖 값을 `null`로
  읽는다. `fingerprint`가 바뀌면 `since`를 그때로 다시 잡고 `notified_at`을 비운다.
- 기존 turn 사실 미러와 같은 경로로 `attempt.interactive.startup_wait`에 옮겨 적는다.
  Bead 본문의 "시도 기록에 남긴다"가 이것이다.
- 이벤트: 대기에 들어가거나 화면 종류가 바뀌면 `세션 레인 시작 화면 대기 · <라벨>`,
  SessionStart로 풀리면 `세션 레인 시작 화면 통과` 한 줄을 남긴다. 대기 중 창이
  사라지면 기존 종료 이벤트로 충분하다.
- 라벨: `hooks` 훅 확인 · `update` 업데이트 안내 · `model` 모델 안내 · `login` 로그인 ·
  `trust` 폴더 신뢰 · `unknown` 기타 시작 화면.

### 3.4 카드 표시

- 자리: 슬롯 3 세션 레인 대화 상태 줄(사용자 결정 2026-11-17). 새 칩·배지·버튼은 없다.
- 실행 중 세션 레인 타일의 진행 줄 낱말은 `startup_wait`가 있으면
  `시작 화면 대기 · <라벨>`이 된다. 경과는 `since`부터 센다. 예: `▤ 시작 화면 대기 · 훅 확인 6분`.
  툴팁은 `tmux 창에서 선택해야 세션이 시작됩니다`이다.
- 슬롯 1의 `세션 실행` 칩과 경과 시간은 그대로다. 재료가 없으면 지금처럼 그리지
  않는다(fail-quiet).
- 재료는 대화형 세션 뷰 투영에 실려 `buildLanes`를 거쳐 Worker·모니터 두 탭에
  같이 간다. 탭 파일은 재료를 다시 조립하지 않는다.
- 카드 문법 스펙(`2026-08-25-card-header-grammar-unify-design.md`) §5.1 슬롯 3 행에
  `시작 화면 대기 · <종류> <경과>`를 더하고, 같은 절에 `UI-ahzh` 정정 한 단락을 둔다.

### 3.5 알림

- 같은 `fingerprint`의 대기가 `since`부터 5분을 넘고 `notified_at`이 비어 있으면,
  다음 점검에서 Discord로 한 번 알리고 `notified_at`을 적는다(사용자 결정 2026-11-17).
- 내용: 머리줄(Bead ID·제목), `시작 화면 대기 · <라벨>`, `tmux <session>:<window>`,
  `tmux 창에서 선택해야 시작됩니다`. 기존 `worker_notify` 설정을 따르고, 꺼져 있으면
  보내지 않는다.
- 시작 화면 대기는 대기 판정(`wait-judgment.js`) 사유가 아니라 실행 중 세션을 관측한
  사실이다. 그래서 ADR UI-1fss가 승계한 "대기 사유 알림은 끈다" 조항을 뒤집지 않는다.
- 대화 자동 기동과의 관계: 이 세션이 이미 사람이 답할 창이므로 문의·해결 대화를
  따로 띄우지 않는다. 시작 화면에 키를 대신 누르지도 않는다.

## 4. 수락 기준

1. 허브 명령은 시작 화면이 떠 있는 Codex 창에서 `dialog`·`startup_kind`·`fingerprint`를,
   프롬프트가 보이는 창에서 `screen: null`을, 마커가 다른 창에서 `alive`가 `alive`가
   아닌 값을 낸다. 응답에 화면 글자가 없다.
2. 창 `@agent_session`이 빈 세션 레인 Codex 레코드에서 허브가 `startup/hooks`를 답하면
   다음 점검 뒤 레코드와 `attempt.interactive`에 `startup_wait.kind=hooks`가 생기고,
   이벤트 `세션 레인 시작 화면 대기 · 훅 확인`이 하나 남는다. 레코드 `session_id`가
   미리 채워진 재개 기동(`mode=resume`)도 같다.
3. 창 `@agent_session`이 채워지면 `startup_wait`가 지워지고 `세션 레인 시작 화면 통과`가
   남으며, 이후 점검은 그 창에 허브 조회를 부르지 않는다.
4. `unknown_screen`·허브 실패·Claude 레코드는 `startup_wait`를 만들지 않는다. 허브
   실패는 이전 값을 바꾸지 않는다.
5. 실행 중 세션 레인 타일 진행 줄에 `시작 화면 대기 · 훅 확인 <경과>`가 서고, 같은
   Bead의 모니터 카드도 같은 줄을 그린다.
6. 같은 화면이 5분을 넘기면 알림이 정확히 한 번 나가고, `fingerprint`가 바뀐 뒤 다시
   5분을 넘기면 한 번 더 나간다. 5분 전에 풀리면 나가지 않는다.
7. 카드 문법 스펙 §5.1 슬롯 3 행과 `UI-ahzh` 정정 단락이 갱신돼 있다.

## 5. 시험

- dotfiles: `codex-startup` 명령의 훅 확인·업데이트 안내·프롬프트·마커 불일치 사례(기존
  `codex_screen` 고정 화면 재사용), 응답에 화면 글자가 없음.
- `server/worker/scheduler.test.js`: 수락 2(새 세션·재개 세션)·3·4·6(가짜 launcher, 시계 주입).
- `server/worker/queue-store.test.js`: `startup_wait` 정규화(목록 밖 `kind`는 `null`).
- `server/worker/tmux-launcher.test.js`: 허브 응답 해석과 실패 처리.
- `app/views/worker/lanes.test.js`: 진행 줄 낱말·경과·툴팁, 재료 없음이면 빈 줄.
- `app/views/monitor/card-parity.test.js`: 시작 화면 대기 사례를 두 탭에 더한다.

## 6. 경계·후속

- 크로스 리포 unit: dotfiles — §3.1의 `session-hub codex-startup` 비중계 조회 명령과
  그 시험. beads-ui 구현 진입 전에 착지해야 하는 선행이다. 처분은 dotfiles rig의
  quick_fix Bead이고 이 스펙의 게이트를 닫는 세션이 만들며, `UI-ahzh`에서 foreign
  `blocks` 엣지를 건다.
- 관찰: Claude 러너 세션 레인의 시작 화면 — 허브 분류기가 Codex 전용이고 이번 사고도
  Codex라 다루지 않는다.
- 관찰: 문의·해결 대화(세션 레인 밖 대화형 세션)의 Codex 시작 화면 — 같은 점검을
  쓰지만 카드 자리가 다르고 사고 범위 밖이라 다루지 않는다.

## 7. 결정 (ADR 후보)

- 전제: ADR UI-jlov — dotfiles가 소유한 규칙은 설치본 CLI의 JSON을 소비하고 JS로 복제하지 않는다. 시작 화면 분류를 허브 명령으로 받는 근거다.
- 세션 레인 시작 화면 대기 관측과 `startup_wait` 기록 — 관측 호출 하나와 레코드 필드 하나라 같은 저장소 안에서 되돌리기 쉽다 → ADR 아님
- 시작 화면 대기 5분 단일 알림 — 알림 호출 하나를 지우면 되돌아가고, 대기 판정 사유 알림 조항(ADR UI-1fss 승계분)을 바꾸지 않는다 → ADR 아님
- 진행 줄 낱말 `시작 화면 대기 · <라벨>`의 자리와 문구 — UI 배치·라벨(기본 제외 목록) → ADR 아님
