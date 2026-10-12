---
scope:
  - server/config.js
  - server/app.js
  - server/index.js
  - server/ws/connection.js
  - server/workspace-discovery.js
  - server/registry-watcher.js
  - app/index.html
  - app/main.js
  - app/styles/
---

# 표시 이름·안내 띠·보기 전용 모드

- Bead: `UI-vfxh` · 작성 2026-10-12 · base beads-ui `ee55fcf54979`
- 소비자: researchline `RL-b2p` — `docs/superpowers/specs/2026-10-12-researchline-demo-and-framework-design.md`
  §4.1(주 인스턴스 이름), §4.4(공개 데모 인스턴스)

## 1. 목표

1. 설정 값 하나로 화면의 제품 이름을 바꾼다. 사용자의 기존 서비스가 "Researchline"으로 보인다.
2. 설정 값으로 화면 상단에 안내 띠를 띄운다.
3. 보기 전용 모드에서는 서버가 모든 조작을 거부하고, 한 작업 공간만 보이며, 워커를 띄우지 않는다.
   이 인스턴스를 인터넷(Tailscale Funnel)에 열어도 상태가 바뀌거나 다른 작업 공간이 보이지 않는다.

비목표: 사용자 인증, 화면의 단계 이름 변경, 보기 전용이 아닌 인스턴스의 동작 변경.

## 2. 검증된 전제

- 제품 이름은 `app/index.html`의 `<title>`과 `h1.app-title` 두 곳에 박혀 있다 — `app/index.html:6`, `:15`
- 설정 TOML은 `readRuntimeConfig`가 읽고, `toBootstrapPayload`가 `GET /`와 `GET /api/config`로 화면에 넘긴다. 화면은 `readBootstrapConfig`와 `refreshConfigSnapshot`으로 받는다 — `server/config.js:227`, `server/app.js:39`, `app/main.js:57`, `:78`
- 들어오는 WebSocket 메시지는 모두 `handleMessage` 한 곳에서 `req.type`별로 나뉜다. 인증과 읽기 전용 구분은 없다 — `server/ws/connection.js:421`, `:449`
- 상태를 바꾸는 POST 경로는 워커 큐·외부 대기·계정 전환·작업 공간 등록이다 — `server/app.js:171-190`
- 작업 공간은 설정의 `default_workspace`·`workspaces`·`scan_roots`, `POST /api/register-workspace`, `~/.beads/registry.json` 감시에서 모인다 — `server/config.js:83-84`, `server/app.js:190`, `server/index.js:172`
- 서버는 시작할 때마다 워커 런타임을 띄운다 — `server/index.js:243`
- Origin 검사는 같은 Origin을 허용하고 추가 허용은 `BDUI_ALLOWED_ORIGINS`로 받는다 — `server/ws/connection.js:197-215`, launchd plist 환경 변수

## 3. 설계

### 3.1 설정 키

`config.toml`에 세 키를 더한다. 셋 다 없으면 지금과 같다.

| 키 | 형식 | 기본값 | 뜻 |
|---|---|---|---|
| `display_name` | 문자열(1–40자) | `"Beads"` | 창 제목과 머리글 |
| `notice` | 문자열(≤240자) | 없음 | 상단 안내 띠 문구 |
| `viewer_mode` | bool | `false` | 보기 전용 모드 |

형식이 틀린 값은 경고를 남기고 기본값을 쓴다. 단 `viewer_mode`의 값이 bool이 아니면 서버가 시작하지
않는다(fail-closed). bootstrap 값과 `/api/config`에 세 값이 함께 실린다.

### 3.2 화면

- `display_name`으로 `document.title`과 `h1.app-title`을 바꾼다. 이미 열린 화면도 설정 갱신 뒤 바뀐다.
- `notice`가 있으면 머리글 아래에 한 줄 띠를 그린다. 닫기 버튼은 없다.
- `viewer_mode`이면 조작 컨트롤(자동화, 새 이슈, 상태 변경, 설정 저장, 워커 버튼)을 숨기거나 끈다.
  화면 쪽 처리는 편의일 뿐이고 막는 것은 서버다.

### 3.3 보기 전용 모드(서버)

- 결정: WebSocket은 허용 목록 방식이다. `handleMessage`가 `req.type`을 나누기 전에 허용 목록을 확인하고,
  목록에 없으면 `read_only` 오류로 답한다. 금지 목록 방식은 쓰지 않는다 — 새 메시지 종류가 생기면 기본으로
  막히게 하기 위해서다.
- 허용 목록은 보드(Worker 레인), 이슈 상세, 댓글, ADR 패널, 검색을 그리는 데 필요한 읽기·구독 종류뿐이다.
  다음은 읽기라도 넣지 않는다: 세션 전사(`subscribe-session-log`), 프롬프트 조회(`get-attempt-prompt`,
  `get-bead-prompt`, `get-worker-system-prompt`), 계정 정보(`get-workspace-accounts`).
- HTTP: GET·HEAD가 아닌 요청은 모두 403이다. GET도 허용 목록 방식이며 화면 파일, `/api/config`,
  `/healthz`, `/api/doc`, 보드에 필요한 읽기 경로만 연다. 사용량(`/api/claude-usage`,
  `/api/codex-usage`)과 저장소 작업 기록(`/api/repo-ops-*`)은 403이다.
- 작업 공간 고정: `default_workspace` 하나만 쓴다. `workspaces`, `scan_roots`, registry 감시,
  `register-workspace`를 무시한다. `set-workspace`는 그 작업 공간일 때만 받는다. `default_workspace`가
  없거나 `.beads`가 없으면 서버가 시작하지 않는다.
- 워커 런타임을 띄우지 않는다. 스케줄러, 큐, 에이전트 실행이 없다.

## 4. 검증

- 단위: 세 설정 키의 정상값·오류값·기본값, bootstrap과 `/api/config`에 실리는 값.
- WebSocket: `MESSAGE_TYPES`에서 허용 목록을 뺀 모든 종류가 보기 전용 모드에서 `read_only`로 거부된다(종류를
  하나씩 돌리는 테스트). 보기 전용이 아니면 기존 테스트가 그대로 통과한다.
- HTTP: 보기 전용 모드에서 모든 POST와 금지 GET이 403이고, 허용 GET은 200이다.
- 작업 공간: 보기 전용 모드에서 `list-workspaces`가 고정 작업 공간 하나만 돌려준다. registry 파일이나
  `scan_roots`가 있어도 같다.
- 워커: 보기 전용 모드에서 워커 런타임 초기화가 호출되지 않는다.
- 화면: `display_name`·`notice`·`viewer_mode`를 켠 인스턴스에서 보드·상세·ADR이 `read_only` 오류 없이
  그려진다(e2e). 1440×900 캡처로 이름과 띠를 확인한다.
- `npm test`, `npm run lint`, 타입 검사 통과.

## 5. 경계·후속

- 없음. 이 기능의 소비자인 researchline 데모 인스턴스는 `RL-b2p`가 맡는다.

## 6. 결정 (ADR 후보)

- 보기 전용 모드는 서버가 WebSocket·HTTP 허용 목록과 작업 공간 하나 고정으로 강제하고, 새 메시지 종류는
  기본으로 거부된다
  - 되돌리기 어려움: 함께 움직이는 소비자는 WebSocket 디스패처(`handleMessage`)에 메시지를 더하는 모든 기능,
    HTTP 라우터, 작업 공간 탐색, researchline 공개 데모 배치다. 새 메시지를 더할 때마다 허용 목록 판단이 따라와야 한다.
  - 코드만 봐서는 알 수 없음: 기존 설계는 "인증 없음, tailnet 격리로 충분"이다(`server/ws/connection.js:242`).
    인터넷에 노출되는 인스턴스를 허용 목록으로만 연다는 경계는 기록이 없으면 다음 기능 추가 때 깨진다.
  - 새 주제: 가장 가까운 현재 ADR은 UI-u6ud(데이터 계층)이다. 그것은 읽기 경로만 다루고 노출 경계는 다루지 않는다.
  - `summary`: "보기 전용 모드(viewer_mode)는 서버가 WebSocket·HTTP 허용 목록, 작업 공간 하나 고정, 워커 미기동으로 강제하며 허용 목록에 없는 메시지 종류는 기본으로 거부된다; 화면 쪽 숨김은 편의일 뿐이다" → ADR
- 제품 이름과 안내 띠를 설정 값으로 둔다 — 되돌리기 쉬운 표시 설정이다 → ADR 아님
