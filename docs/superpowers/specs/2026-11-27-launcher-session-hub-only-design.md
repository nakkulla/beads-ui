---
scope:
  - server/worker/tmux-launcher.js
  - server/worker/scheduler.js
  - server/worker/resolve-session.js
  - server/worker/direction-inquiry.js
  - server/worker/spec-authoring.js
  - server/worker/external-wait/session-resume.js
  - server/worker/session-inquiry/
  - server/worker/notify.js
  - server/ws/
  - server/config.js
  - app/views/worker/
  - app/views/usage-meter.js
  - app/protocol.js
---

# 대화 세션 런처는 tmux를 직접 부르지 않고 session hub만 쓴다 — 설계

Bead: `UI-3xxa0` · route `spec_backed` · 2026-11-27 · 출처: dotfiles/dotfiles-ozcj2

## 1. 목표

beads-ui가 여는 대화 세션(방향 문의, 스펙 작성, 세션에서 해결, 외부 대기 재개, 세션 레인)은 지금 tmux에만 생긴다. 여는 일은 `session-hub` CLI로 하지만 목록·상태·종료·초점은 `tmux` 명령을 직접 부르기 때문이다. 이 설계가 끝나면 다음이 성립한다.

- 런처와 그 호출자는 `session-hub` CLI만 부른다. hub의 설정(`mux.backend`)이 `herdr`면 대화 세션이 herdr에 열리고 `tmux`면 지금과 같다. beads-ui에는 고르는 설정이 없다.
- 표식으로 창 찾기, 생존 판정, 턴 상태, 서버 재시작 뒤 넘겨받기, 종료가 두 쪽에서 같은 결과를 낸다.
- 화면과 알림의 문구가 tmux를 가정하지 않는다.

사용자 결정(2026-11-27, dotfiles 세션): tmux는 herdr로 전면 대체하되 Mac Studio부터 하고 tmux가 기본값으로 남는다. 창 조작은 session hub 한 곳이 소유한다(dotfiles 스펙 `docs/superpowers/specs/2026-11-27-session-hub-herdr-surface-design.md` §3.4).

## 2. 검증된 전제

- 런처는 두 길로 tmux에 닿는다: PATH의 bare `tmux`와 `~/bin/session-hub` — `server/worker/tmux-launcher.js:408`, `:412`
- 여는 일과 표식으로 찾기는 이미 hub CLI다(`open`, `find`) — `server/worker/tmux-launcher.js:759`, `:868`
- tmux를 직접 부르는 동작: 표식 달린 창 목록과 상태(`listPanesExtended`), 창 옵션 읽기, 종료 명령 보내기, 창 닫기, 화면 끝줄 읽기, 창 목록, 초점 옮기기 둘 — `server/worker/tmux-launcher.js:491`, `:544`, `:562`, `:577`, `:591`, `:620`, `:721`, `:736`
- 런처는 hub가 돌려준 창 번호가 `%숫자` 모양이고 `tmux_session`, `window`가 있어야 위치로 받는다 — `server/worker/tmux-launcher.js:704-713`
- 표식 다섯 개는 이름이 고정이다 — `server/worker/tmux-launcher.js:24`, `:27`, `:35`, `:43`, `:52`
- 턴 상태는 창 옵션 둘에서 읽는다: 실행 중 표시와 주의 종류 — `server/worker/scheduler.js:1701`
- 대화 세션 맞춰 보기는 표식마다 창 목록을 읽고, 서버 재시작 뒤 표식 달린 살아 있는 창을 넘겨받는다 — `server/worker/scheduler.js:14191`, `:15678`
- 세션 레인 창 닫기는 Claude면 종료 명령을 보내고 기다린 뒤 닫는다 — `server/worker/scheduler.js:26207`
- 원래 세션의 창 위치는 Claude의 세션 등록 파일에 적힌 tmux 위치 문자열과 `tmux display-message`로 찾는다 — `server/worker/external-wait/session-resume.js:141`, `:253`, `:650`
- 시작 때 tmux에 닿는지 확인하고, 스펙 작성은 창 목록을 못 읽으면 열지 않는다 — `server/worker/direction-inquiry.js:1008`, `server/worker/spec-authoring.js:387`
- 자리 이름은 `[worker.direction_inquiry] tmux_session`(기본 `bdui-inquiry`)이다 — `server/config.js:19`, `:136`
- 화면과 알림에 tmux 문구와 `tmux_session`·`tmux_window` 필드가 있다 — `app/views/worker/lanes.js:2090`, `:2210`, `app/views/worker/tile-resolve.js:229`, `app/views/usage-meter.js:96`, `app/views/worker/wait-vocabulary.js:945`, `server/worker/notify.js:487`
- 계정 로그인 창은 자기 tmux 세션(`bdui-login`)을 직접 만들어 쓴다 — `server/routes/account-login.js:142`
- 위 줄 번호는 커밋 `6b9421e929e0fad852ef6e4a07f341be182cb40d` 기준이다.
- 미확인: dotfiles 쪽 CLI의 새 동작 이름과 JSON 필드 — dotfiles 스펙은 동작만 정하고 이름은 구현이 정한다. 이 설계의 구현은 dotfiles 배포 뒤 설치된 CLI에서 읽어 맞춘다.

## 3. 설계

### 3.1 런처는 hub CLI만 부른다

- 결정: `tmux-launcher.js`의 bare `tmux` 호출을 모두 없애고 hub CLI의 동작으로 바꾼다. 런처를 쓰는 모듈(스케줄러, 세션에서 해결, 방향 문의, 스펙 작성, 외부 대기 재개, 세션 문의)은 런처의 함수만 쓰고 멀티플렉서를 모른다 — 창 조작의 소유자가 hub 한 곳이어야 hub가 구현을 바꿀 때 beads-ui가 따라 바뀌지 않는다.
- 대응:

| 지금(bare tmux) | hub CLI 동작 |
| --- | --- |
| 표식 달린 창 목록과 실행 중·주의 종류·런타임·cwd | 표식 달린 창 목록 |
| 창 옵션에서 세션 ID 읽기 | 같은 목록의 세션 ID |
| 종료 명령 보내고 창 닫기 | 표식이 맞는 창 닫기(Claude는 종료 명령 뒤 대기) |
| 화면 끝줄 읽기 | 창의 마지막 입력 줄 읽기 |
| 창으로 초점 옮기기 | 창 또는 세션 ID로 초점 옮기기 |
| 원래 세션의 창 위치 찾기 | 세션 ID가 도는 창의 위치 |

- 한 번의 맞춰 보기에서 표식마다 따로 부르던 목록 읽기는 한 번의 호출로 묶는다(hub 목록이 표식 여럿을 받는다). 호출이 실패하면 지금처럼 그 회차를 건너뛴다.
- 시작 때의 "tmux에 닿는가" 확인과 스펙 작성의 창 목록 확인은 hub에 묻는다. 실패 코드는 지금 이름(`tmux_unavailable`)을 그대로 받는다(dotfiles 스펙의 결정).

### 3.2 창 위치

- 창 손잡이는 hub가 준 문자열을 그대로 쓴다. `%숫자` 모양 검사를 없애고 비어 있지 않은 문자열이면 받는다.
- 기록의 필드 이름(`pane_id`, `tmux_session`, `tmux_window`)은 그대로 두고 값만 hub가 준 것을 담는다 — 이름을 바꾸면 저장된 기록과 화면 프로토콜이 함께 움직이는데 얻는 것이 없다. hub가 주는 구현 이름을 기록에 더한다.
- 원래 세션의 창 위치는 세션 등록 파일의 tmux 문자열을 풀지 않고 hub에 세션 ID로 묻는다. hub가 모르면 지금처럼 "위치를 확인하지 못했습니다"다.
- 자리 이름 설정 `tmux_session`은 그대로 읽고 hub에 넘긴다. herdr에서는 작업공간 이름이 된다.

### 3.3 화면과 알림 문구

- tmux를 이름으로 부르는 문구를 "대화 세션 창"으로 바꾼다. 창 위치 표시는 hub가 준 자리 이름과 창 이름을 그대로 보인다.
- 구현 이름은 타일의 창 위치 옆에 작게 보인다(tmux와 herdr가 함께 있는 동안 어디서 찾을지 알 수 있게).

### 3.4 경계

- 결정: 계정 로그인 창(`server/routes/account-login.js`)은 바꾸지 않는다 — 사람이 보는 창이 아니라 로그인 명령을 붙들어 두는 자체 tmux 세션이고, tmux 실행 파일은 은퇴 뒤에도 도구로 남는다.
- Worker 무인 실행(창 없이 도는 attempt)은 이 설계와 무관하다.
- agy 실행 런타임 계획(`UI-ufgo`, `docs/superpowers/plans/2026-11-26-agy-runtime.md`)이 같은 런처와 스케줄러 파일을 고친다. 그 계획은 hub CLI의 `open` 인자와 시작 화면 판독에 agy를 더하는 것이라 이 설계와 뜻이 부딪히지 않는다. 이 설계는 dotfiles 배포를 기다리므로 보통 뒤에 착지하고, 먼저 착지한 쪽 위에 얹는다.

## 4. 수용 기준

1. `server/`와 `app/`의 비테스트 코드에서 `tmux` 실행은 `server/routes/account-login.js`에만 남는다(정적 검사 테스트).
2. hub가 tmux일 때 대화 세션 열기, 중복 열기 방지, 턴 상태 표시, 서버 재시작 뒤 넘겨받기, 세션 레인 종료가 이 변경 전과 같다(기존 테스트 통과).
3. hub가 herdr일 때 방향 문의 대화 하나를 열면 herdr 작업공간에 창이 생기고, 타일에 위치와 턴 상태가 보이며, 대화가 끝나면 창이 닫힌다(Mac Studio에서 한 건 확인해 완료 보고서에 남긴다).
4. beads-ui를 재시작하면 herdr에 열려 있던 표식 창을 다시 넘겨받는다.
5. `[세션에서 이어가기]`와 `원래 창으로 이동`이 herdr 창으로 초점을 옮긴다.
6. hub가 닿지 않으면 스펙 작성은 열지 않고 지금과 같은 안내를 보인다.
7. 화면과 Discord 알림에 "tmux"라는 말이 계정 로그인 도구 표시(`cswap·tmux`) 밖에는 없다.

## 5. Test scope

- `server/worker/tmux-launcher.test.js`, `server/worker/tmux-launcher-hub.test.js` — bare tmux 가짜를 hub CLI 가짜로 바꾼 뒤 같은 사례
- `server/worker/scheduler.test.js`의 대화 세션 맞춰 보기·넘겨받기·세션 레인 종료 사례
- `server/worker/resolve-session.test.js`, `server/worker/direction-inquiry.test.js`, `server/worker/external-wait/session-resume.test.js`, `server/worker/session-inquiry/service.test.js` — 창 손잡이가 `%숫자`가 아닌 값일 때
- 새 정적 검사 테스트 — 비테스트 코드의 `tmux` 실행 위치
- 화면 문구 테스트(`app/views/worker/` 기존 묶음)
- 저장소 기본 검증(이 저장소의 `repo-ops/script/verify`)

## 6. 결정 (ADR 후보)

- 없음 — 창 조작을 session hub만 거친다는 결정은 dotfiles 스펙(`dotfiles-ozcj2`)의 ADR 후보가 소유하고 이 설계는 beads-ui 쪽에서 그것을 따른다. 기록 필드 이름 유지와 문구는 기본 제외 목록(이름, 표시 형식)이다

## 7. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 독립 승인·실패·재개가 가능한 외부 효과: hub CLI의 새 동작이 먼저 배포돼야 한다 | dotfiles-awow6 | dotfiles-ozcj2 |
