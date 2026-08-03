# 화면 리디자인·가독성 실행 계획 (UI-rkly)

- Bead: UI-rkly
- Route: full_plan (`spec_backed` → 승격, 트리거 `independent_phases_2_plus`)
- Spec: `docs/superpowers/specs/2026-08-03-board-reskin-session-readability-design.md`
  (spec 게이트 `codex@dfa40739443cecb265cd3a0bed5f398faaa03538`)
- 날짜: 2026-08-03

## Context

승인된 스펙은 서로 독립적인 세 영역을 담고 있다 — (1) Board의 시각 어휘를 Worker
관제탑 룩으로 통일, (2) 세션 드로어에서 진행 여부가 한눈에 보이게, (3) Worker
완료 레인 행을 2줄로. 파일도 테스트도 겹치지 않으므로 phase로 분해한다.

관측된 현재 코드 사실(구현 판단의 근거):

- Board CSS는 `app/styles/base.css`의 `/* --- board view --- */` 블록(152행~).
  컬럼 헤더는 `.board-column__header` + `.board-column__title-text::before`의
  `●` 점으로 상태색을 표현하고, 색 지정은 `#blocked-col` 등 **컬럼 id 셀렉터**로
  건다. 카드는 `.board-card`(`--bg-card`/`--border-card`/`--r-8`). 이미 토큰만
  쓰고 raw hex는 없다 → 스펙대로 raw hex 가드는 **회귀 가드**다.
- Worker 어휘는 `app/styles.css`의 `Worker console` 블록(2416행~): 레인 페인은
  `border-top: 2px solid var(--stage-*-dim)` 스파인 + 헤더 점(`--stage-*-on`) +
  카운트 필(색이 스테이지색을 따름), 실행 타일은 `.rtile`.
- 세션 로그는 서버가 `subscribe-session-log`에서
  `runtime.sessionLog.read()` 결과를 `emitSessionLogSnapshot`으로 밀고
  (`server/ws/worker-handlers.js:658`, `server/ws/context.js:429`),
  클라이언트는 `app/main.js:236`에서 `sessionLogStore.set()`으로 받는다. payload
  이벤트에는 시각이 없다 → 스펙대로 snapshot은 **로그 파일 mtime**, append는
  **클라이언트 수신 시각**이 `last_event_at`의 원천이다.
- 드로어(`app/views/worker/transcript-drawer.js`)는 `open()` 시점 `meta`만 갖고
  있고 `updateMeta()`로만 갱신된다. 다만 Worker 뷰에는 이미
  `refreshOpenDrawerMeta()`(`app/views/worker/index.js:2757`)가 있어 큐 스토어
  구독(`:3037`)마다 `metaForAttempt()`의 `status`를 포함한 최신 레코드를
  `updateMeta()`로 밀고 있다 → **새 호출을 추가하면 중복 렌더가 된다.** 스펙이
  말한 "open 시점 status만 전달" 문제는 이 경로가 이미 덮으므로, 남은 일은
  드로어가 그 `status`를 하트비트 표시에 실제로 반영하는 것과 그 경로를 통합
  테스트로 고정하는 것이다.
- 완료 레인 행은 `miniRow()`(`app/views/worker/lanes.js:125`)의 **한 줄 변형**
  (`card === false`)이라 `__line` 하나에 그립·ID·제목·뱃지·reason·usage가 전부
  실린다. `timesMeta()`는 생성/수정 시각만 그리며 완료 시각(`added_at`)은 넣지
  않는다.

## Phase 1: Board 시각 어휘 통일

1. `app/styles.board-theme.test.js`를 새로 만들어 새 CSS 계약을 RED로 고정한다 —
   6개 컬럼의 스파인 토큰 매핑(스펙 표 그대로: Blocked `--accent-warn`, Ready
   `--stage-plan-on`, In progress `--stage-impl-on`, Resolved `--stage-merge-on`,
   Deferred `--text-dim`, Closed `--stage-merge-dim`), In progress 컬럼의
   `--bg-tile-run` 서페이스, 그리고 board 블록 raw hex 금지 **회귀 가드**.
2. `app/styles/base.css`의 board 블록을 Worker 어휘로 맞춘다 — 컬럼 상단
   스파인(`border-top: 2px solid`) + 헤더 점/카운트 필의 스테이지색, In progress
   컬럼 서페이스, 카드 보더·호버·타이포·간격을 `.rtile`/`.worker-pane` 문법과
   통일. 칸반 구조·DOM·클래스명·드래그 계약은 손대지 않는다. 스펙 §1이 요구한
   대로 픽셀 수준 결정(간격·크기·호버 디테일)은 `frontend-design` 스킬을 실제로
   적용해서 잡는다 — 이 단계 시작 전에 스킬을 로드하고, 스킬이 준 방향을
   커밋 메시지/Phase 영수증에 한 줄로 남긴다.
3. `#closed-col` 계열 셀렉터가 실제 DOM id와 맞는지 `app/views/board/`에서
   확인하고, 없으면 존재하는 훅(`.board-column--closed`)으로 매핑한다.

검증: `npx vitest run app/styles.board-theme.test.js app/styles.worker-theme.test.js app/main.theme.test.js` 전부 통과(1번 RED → 2번 후 GREEN).

## Phase 2: `last_event_at` 데이터 경로

1. `server/worker/session-log.js`에 로그 파일 mtime 조회를 추가하고
   (`read`와 같은 fail-quiet 규약: 읽을 수 없으면 `null`),
   `server/ws/worker-handlers.js`의 `handleSubscribeSessionLog`가 그 값을
   `emitSessionLogSnapshot`에 넘기도록 `server/ws/context.js`의 payload에
   `last_event_at`을 추가한다.
2. `app/data/session-log-store.js`에 `last_event_at`을 도입한다 — `set()`은
   인자로 받은 시각(없으면 `null`), `append()`는 클라이언트 수신 시각으로 갱신.
   `get()` 반환에 포함한다.
3. `app/main.js`의 `session-log-snapshot` 핸들러가 payload의 `last_event_at`을
   전달하도록 배선하고, `app/protocol.md`의 payload 설명을 갱신한다.

검증: `npx vitest run app/data server/ws.session-log.test.js server/worker/session-log.test.js` 통과 — snapshot은 mtime, append는 수신 시각(fake timer)으로 `last_event_at`이 갱신됨.

## Phase 3: 세션 드로어 진행 가시성

1. `.sv__bar`에 라이브 하트비트 점 + `last_event_at` 기반 경과시간을 그린다.
   라이브 attempt(= `meta.status === 'running'`)가 아니면 생략.
2. 경과시간은 새 이벤트가 없어도 흘러야 한다 — 라이브일 때만 도는 주기 갱신
   타이머(1초 간격)를 드로어가 소유하고, `status`가 running이 아니게 되는 순간·
   `close()`·`destroy()`에서 반드시 해제한다(조용한 실행 중에 "3초 전"이 굳거나,
   닫힌 드로어가 타이머를 남기지 않게).
3. running→done 반영은 **새 호출을 추가하지 않는다** — 기존
   `refreshOpenDrawerMeta()`(`index.js:2757`)가 이미 큐 스냅샷마다 최신 `status`를
   `updateMeta()`로 밀고 있으므로, 드로어가 그 `status` 변화를 하트비트 표시와
   타이머 해제에 반영하기만 하면 된다. 이 경로는 `index.test.js`의 통합
   assertion으로 고정한다.
4. phase/gate 라인을 구분선 수준 시각 계층으로 승격하고, 마지막 미완료 tool
   라인을 드로어 하단 sticky로 고정(완료되면 해제), 같은 종류 tool 라인이 5개
   이상 연속되면 접힌 그룹으로 렌더하고 클릭 시 펼친다. `follow` 동작은 유지.

검증: `npx vitest run app/views/worker/transcript-drawer.test.js app/views/worker/index.test.js` 통과 — 하트비트 표시/생략, 이벤트 없이 fake timer만 진행했을 때 경과시간 문구 변화, running→done 시 하트비트·타이머 제거, sticky 고정/해제, 연속 tool 접기.

## Phase 4: Worker 완료 레인 2줄 행

1. `miniRow()`에 완료 레인 전용 2줄 배치를 넣는다 — 1줄은 ID + 제목만(가로
   전체, usage 배지 금지), 2줄은 τ·비용 + `added_at` 기반 완료 시각 + 액션.
   드래그 계약(`data-bead-id`/`data-lane`)과 `worker-mini--done`은 유지.
2. 완료 시각을 행에 전달하기 위해 `app/views/worker/index.js`의 done 아이템
   빌드에서 `added_at`을 `MiniItem`으로 넘기고, `lanes.js`가 기존
   `formatRelativeTime`/`formatTimestampLocal` 표기 규약으로 그린다.
3. `app/styles.css`의 `.worker-mini` 계열에 완료 2줄 변형 스타일을 추가한다
   (기존 `--card` 변형과 충돌하지 않게 별도 modifier).

검증: `npx vitest run app/views/worker` 통과 — 1줄에 usage 부재·2줄에 메타 배치를 직접 확인하는 단위 테스트(“2줄 존재”만 보는 vacuous 검사 금지).

## Phase 5: 통합 검증·번들

1. Pre-Handoff Validation을 **포맷 먼저** 순서로 돌린다 —
   `npm run prettier:write` → `npm run tsc` → `npm test` → `npm run lint`.
   (포맷터가 나중에 파일을 바꾸면 앞선 green이 최종 소스에 결속되지 않는다.)
2. `npm run build` 후 `app/main.bundle.js`·`app/main.bundle.js.map` 포함 커밋.
3. 실제 렌더 확인: `BDUI_FRONTEND_MODE=live bdui restart --host 127.0.0.1
   --port 3001`로 ad-hoc 로컬 서버를 띄우고, 프로세스 경로·포트·HTTP 응답을
   확인해 번들이 아니라 이 워크트리 소스가 서빙되는지 검증한다. 세 완료 기준
   (Board가 Worker 어휘로 보임 / 드로어 라이브·현재 작업 파악 / 완료 레인 제목
   비절단)을 이 서버에서 눈으로 확인하고, 확인 결과를 Phase 영수증에 남긴다.
   확인이 끝나면 ad-hoc 서버를 정리한다(공유 서비스 포트는 건드리지 않는다).
4. 통합 diff 자체 점검 → `implementation` 게이트 → PR 제출(머지 금지).

검증: 위 5개 명령 모두 green, 3번의 로컬 서버 확인 기록이 남고, `git status`에
미추적 잔여물이 없다.

## Test scope

- Phase 1 (RED→GREEN): `app/styles.board-theme.test.js` — 컬럼 스파인 토큰 매핑
  표, In progress `--bg-tile-run` 서페이스. 회귀 가드(현재도 통과): board 블록
  raw hex 금지, 기존 `app/styles.worker-theme.test.js`·`app/main.theme.test.js`.
- Phase 2 (RED→GREEN): `app/data/session-log-store.test.js`(신규) — snapshot
  mtime / append 수신 시각(fake timer). `server/worker/session-log.test.js` —
  로그 파일 mtime 반환, 파일 부재·읽기 실패 시 `null`(fail-quiet). 그 위에
  `server/ws.session-log.test.js`에 snapshot payload의 `last_event_at`
  assertion 추가(값의 원천은 앞의 두 곳이 증명한다).
- Phase 3 (RED→GREEN): `app/views/worker/transcript-drawer.test.js` — 하트비트
  표시/생략, 새 이벤트 없이 fake timer 진행 시 경과시간 문구 갱신, close/destroy
  시 타이머 해제, sticky 고정/해제, 연속 tool 접기.
  `app/views/worker/index.test.js` — 기존 `refreshOpenDrawerMeta()` 경로로
  queue snapshot의 running→done 전환이 열린 드로어의 하트비트를 제거하는 통합
  assertion.
- Phase 4 (RED→GREEN): `app/views/worker/index.test.js` 또는 lanes 단위 테스트 —
  완료 행 1줄 usage 부재·2줄 메타 배치.
- 제외: Board 레이아웃 재구성, 대기 레인 파킹 행(UI-ww8x), 모바일 리본,
  `transcript-render.js`의 이벤트 파싱 의미 — 스펙 비범위.
