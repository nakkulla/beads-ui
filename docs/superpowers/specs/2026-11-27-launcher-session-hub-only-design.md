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
  - server/worker/queue-store.js
  - server/worker/session-lane.js
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
- 계정 로그인 창은 자기 tmux 세션(`bdui-login-<서버 pid>`)을 직접 만들어 쓴다 — `server/routes/account-login.js:823-824`
- 세션에서 해결의 시작 확인은 창의 화면 전체에서 Codex의 fork·신뢰·훅 질문을 찾는다 — `server/worker/resolve-session.js:1451-1463`, `server/worker/tmux-launcher.js:608`
- attempt 기록 정규화는 아는 필드만 남긴다 — `server/worker/queue-store.js:4338`, `:4619`
- `[세션에서 이어가기]`와 원래 창으로 이동은 원래 세션의 tmux 위치 문자열이 있을 때만 초점 이동을 부른다 — `server/worker/session-inquiry/service.js:421-445`, `server/worker/scheduler.js:19599-19607`
- 런처는 화면에 보일 창 이름을 hub 응답과 따로 돌려준다 — `server/worker/tmux-launcher.js:786-787`, `:941-942`
- Accepted ADR UI-19sj는 대화형 기동과 도달성 확인에 tmux를, Discord 알림 본문에 `tmux <세션:창>`을 적는다 — `docs/adr/UI-19sj-conversation-automatic-proceed.md:1372`, `:1377`, `:1501`, `:2003`
- 위 줄 번호는 커밋 `6b9421e929e0fad852ef6e4a07f341be182cb40d` 기준이다.
- 미확인: dotfiles 쪽 CLI의 새 명령 이름 — dotfiles 스펙은 동작과 응답의 뜻을 정하고 명령 이름은 그 구현이 정한다. 이 설계의 구현은 dotfiles 배포 뒤 설치된 CLI에서 이름을 읽어 맞춘다.

## 3. 설계

### 3.1 런처는 hub CLI만 부른다

- 결정: `tmux-launcher.js`의 bare `tmux` 호출을 모두 없애고 hub CLI의 동작으로 바꾼다. 런처를 쓰는 모듈(스케줄러, 세션에서 해결, 방향 문의, 스펙 작성, 외부 대기 재개, 세션 문의)은 런처의 함수만 쓰고 멀티플렉서를 모른다 — 창 조작의 소유자가 hub 한 곳이어야 hub가 구현을 바꿀 때 beads-ui가 따라 바뀌지 않는다.
- 대응:

| 지금(bare tmux) | hub CLI 동작 |
| --- | --- |
| 표식 달린 창 목록과 실행 중·주의 종류·런타임·cwd | 표식 달린 창 목록 |
| 창 옵션에서 세션 ID 읽기 | 같은 목록의 세션 ID |
| 종료 명령 보내고 창 닫기 | 표식이 맞는 창 닫기(Claude는 종료 명령 뒤 대기) |
| 화면 읽기(끝줄 판정과 시작 질문 찾기) | 표식이 맞는 창의 보이는 화면 전체 읽기. 끝줄 판정과 질문 찾기는 지금처럼 런처가 한다 |
| 창으로 초점 옮기기 | 창 또는 세션 ID로 초점 옮기기 |
| 원래 세션의 창 위치 찾기 | 세션 ID가 도는 창의 위치 |

- 한 번의 맞춰 보기에서 표식마다 따로 부르던 목록 읽기는 한 번의 호출로 묶는다(hub 목록이 표식 여럿을 받는다. dotfiles 스펙 §3.4). 호출이 실패하면 지금처럼 그 회차의 생존·넘겨받기 판정을 건너뛴다. 표식 달린 창이 없다는 성공 응답과 조회 실패는 다른 응답이다.
- 시작 때의 "tmux에 닿는가" 확인과 스펙 작성의 창 목록 확인은 hub에 묻는다. 실패 코드는 지금 이름(`tmux_unavailable`)을 그대로 받는다(dotfiles 스펙의 결정).

### 3.2 창 위치

- 창 손잡이는 hub가 준 문자열을 그대로 쓴다. `%숫자` 모양 검사를 없애고 비어 있지 않은 문자열이면 받는다.
- 결정: 기록은 구현 이름과 창 ID를 함께 담고 생존 대조도 둘을 함께 본다. 구현 이름이 없는 옛 기록은 tmux로 읽는다. 기록 정규화가 새 필드를 버리지 않게 한다.
- herdr 창은 다른 작업공간으로 옮기면 창 ID가 바뀐다. 기록의 창 ID가 목록에 없더라도 같은 표식 값의 살아 있는 창이 있으면 그 창이 같은 대화이고, 기록의 위치를 그 창으로 고친다. 표식 값이 맞는 창이 없을 때만 종료로 본다.
- 기록의 필드 이름(`pane_id`, `tmux_session`, `tmux_window`)은 그대로 두고 값만 hub가 준 것을 담는다 — 이름을 바꾸면 저장된 기록과 화면 프로토콜이 함께 움직이는데 얻는 것이 없다. hub가 주는 구현 이름을 기록에 더한다.
- 원래 세션의 창 위치는 세션 등록 파일의 tmux 문자열을 풀지 않고 hub에 세션 ID로 묻는다. hub가 모르면 지금처럼 "위치를 확인하지 못했습니다"다.
- `[세션에서 이어가기]`와 원래 창으로 이동은 tmux 위치 문자열 대신 확인된 세션 ID를 hub의 초점 이동에 넘긴다. 세션 문의와 외부 대기 두 경로 모두 그렇다. 위치 확인 실패와 세션이 바뀐 경우의 지금 거절은 그대로다.
- 화면에 보이는 창 이름은 지금처럼 런처가 연 때 정한 이름(Bead ID, `resolve-<bead>`)이다. hub가 주는 `window` 값(herdr에서는 탭 ID)은 조작에만 쓰고 보이지 않는다.
- 자리 이름 설정 `tmux_session`은 그대로 읽고 hub에 넘긴다. herdr에서는 작업공간 이름이 된다.

### 3.3 화면과 알림 문구

- tmux를 이름으로 부르는 문구를 "대화 세션 창"으로 바꾼다. 두 구현에서 같은 문구를 쓴다. 창 위치 표시는 hub가 준 자리 이름과 위의 창 이름이다.
- Discord 알림의 대화 줄도 `대화: Discord 스레드 · <자리>:<창 이름>`으로 쓴다.

### 3.4 경계

- 결정: 계정 로그인 창(`server/routes/account-login.js`)은 바꾸지 않는다 — 사람이 보는 창이 아니라 로그인 명령을 붙들어 두는 자체 tmux 세션이고, tmux 실행 파일은 은퇴 뒤에도 도구로 남는다.
- Worker 무인 실행(창 없이 도는 attempt)은 이 설계와 무관하다.
- agy 실행 런타임 계획(`UI-ufgo`, `docs/superpowers/plans/2026-11-26-agy-runtime.md`)이 같은 런처와 스케줄러 파일을 고친다. 그 계획은 hub CLI의 `open` 인자와 시작 화면 판독에 agy를 더하는 것이라 이 설계와 뜻이 부딪히지 않는다. 이 설계는 dotfiles 배포를 기다리므로 보통 뒤에 착지하고, 먼저 착지한 쪽 위에 얹는다.

### 3.5 배포와 확인

1. dotfiles 쪽(`dotfiles-ozcj2`)이 배포돼 설치된 `session-hub`에 새 동작이 있는지 확인한다. 없으면 이 구현을 시작하지 않는다(`blocks` 간선이 같은 것을 막는다).
2. 이 저장소의 `[deploy]`가 대상 커밋으로 서버를 다시 띄우고 `/healthz`와 대상 SHA를 확인한다(기존). 멈추면 같은 커밋으로 다시 돌린다.
3. herdr 쪽 수용 기준 3·4·5는 구현 세션이 머지 전에 확인한다: 임시 hub 설정(`mux.backend=herdr`)을 가리키는 환경으로 런처 통합 테스트를 Mac Studio의 떠 있는 herdr 서버에 돌려, 열기·넘겨받기·초점·종료를 hub 응답으로 판정하고 자기가 연 창을 닫는다. 결과는 완료 보고서의 검증에 적는다. hub 기본값이 tmux인 동안 배포된 서버는 tmux에 연다.

## 4. 수용 기준

1. `server/`와 `app/`의 비테스트 코드에서 `tmux` 실행은 `server/routes/account-login.js`에만 남는다(정적 검사 테스트).
2. hub가 tmux일 때 대화 세션 열기, 중복 열기 방지, 턴 상태 표시, 서버 재시작 뒤 넘겨받기, 세션 레인 종료가 이 변경 전과 같다(기존 테스트 통과).
3. hub가 herdr일 때 대화 하나를 열면 herdr 작업공간에 창이 생기고, 기록에 구현 이름과 위치와 턴 상태가 담기며, 닫으면 창이 닫힌다(3.5의 머지 전 확인).
4. beads-ui를 재시작하면 herdr에 열려 있던 표식 창을 다시 넘겨받는다.
5. `[세션에서 이어가기]`와 `원래 창으로 이동`이 herdr 창으로 초점을 옮긴다.
6. hub가 닿지 않으면 스펙 작성은 열지 않고 지금과 같은 안내를 보인다.
7. 화면과 Discord 알림에 "tmux"라는 말이 계정 로그인 도구 표시(`cswap·tmux`) 밖에는 없다. 구현 이름은 화면에 보이지 않는다.
8. 세션 ID가 아직 없는 창의 시작 질문(Codex의 fork·신뢰·훅 질문)이 입력 줄 밖에 있어도 지금처럼 찾아진다.
9. herdr 창의 ID가 바뀐 뒤(작업공간 이동)에도 같은 표식 값의 창이 살아 있으면 종료로 처리하지 않고 기록의 위치가 고쳐진다.

## 5. Test scope

- `server/worker/tmux-launcher.test.js`, `server/worker/tmux-launcher-hub.test.js` — 새 사례(지금 코드에서 실패): bare tmux 가짜 없이 hub 응답만으로 목록·생존·넘겨받기·종료·초점이 판정된다; `%숫자`가 아닌 창 ID를 위치로 받는다; 빈 목록과 조회 실패를 다르게 다룬다; 입력 줄 밖의 시작 질문을 찾는다. 이미 통과하는 기존 사례는 회귀 확인이다.
- `server/worker/queue-store` 테스트 — 구현 이름 필드가 정규화를 지나 남고, 없는 옛 기록은 tmux로 읽힌다
- `server/worker/scheduler.test.js`의 대화 세션 맞춰 보기·넘겨받기·세션 레인 종료 사례
- `server/worker/resolve-session.test.js`, `server/worker/direction-inquiry.test.js`, `server/worker/external-wait/session-resume.test.js`, `server/worker/session-inquiry/service.test.js` — 창 손잡이가 `%숫자`가 아닌 값일 때
- 새 정적 검사 테스트 — 비테스트 코드의 `tmux` 실행 위치
- 화면 문구 테스트(`app/views/worker/` 기존 묶음)
- 저장소 기본 검증(이 저장소의 `repo-ops/script/verify`)

## 6. 결정 (ADR 후보)

- 전제: ADR UI-19sj — 대화 세션의 기동 게이트, 배치, 생존·복구·종료 규칙(이 설계는 그 규칙의 뜻을 그대로 두고 창을 다루는 길만 바꾼다)
- 대화 세션의 기동·도달성 확인·생존 관측·알림의 창 위치는 tmux가 아니라 session hub를 거치고, 창이 열리는 곳은 hub의 설정이 고른 tmux 또는 herdr다.
  - 되돌리기 어렵다: 공용 기동기, 스케줄러의 맞춰 보기와 넘겨받기, 세션에서 해결, 방향 문의, 스펙 작성, 외부 대기 재개, attempt 기록 모양, 화면과 Discord 알림 문구, dotfiles의 hub CLI가 함께 움직인다.
  - 맥락 없이는 놀랍다: ADR UI-19sj의 조항들이 tmux를 이름으로 적고 있어, 런처에 tmux 호출이 없고 알림에 tmux 위치가 없는 이유가 드러나지 않는다.
  - 실제 대안이 있었다: beads-ui에 herdr 런처를 따로 두고 설정으로 고르는 안을, 창 조작의 소유자가 둘이 되고 hub와 표식·잠금이 어긋나서 버렸다.
  - `summary`: "실패 대화의 결과 줄 자동 진행은 서버가 형식·실패 종류·대화를 열 때의 실패 대상·대상 커밋을 검사한 뒤에만 받아 같은 실패 지문에 한 번 실패 기록의 커밋 그대로 실패 단계를 다시 돌리고, 쓴 지문으로 다시 열리는 대화에 소진 표지를 싣는다 — 대화 세션의 기동·도달성 확인·생존 관측·알림의 창 위치는 tmux가 아니라 session hub를 거치고 창은 hub 설정이 고른 tmux 또는 herdr에 열리며, 나머지 조항은 UI-19sj 그대로다" → ADR, supersede UI-19sj
- 기록 필드 이름 유지와 화면 문구 — 기본 제외 목록의 이름과 표시 형식 → ADR 아님

## 7. 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 독립 승인·실패·재개가 가능한 외부 효과: hub CLI의 새 동작이 먼저 배포돼야 한다 | dotfiles-awow6 | dotfiles-ozcj2 |
