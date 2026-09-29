---
scope:
  - app/
  - server/worker/runnable-cache.js
  - server/worker/title-cache.js
  - server/ws/monitor-handlers.js
  - server/ws/display-policy-handlers.js
  - server/display-policy-store.js
  - server/ws/bench-handlers.js
  - server/worker/bench-runs.js
  - server/worker/compare-projection.js
  - server/ws/connection.js
  - server/ws/index.js
  - server/app.js
  - scripts/build-frontend.js
  - scripts/ui-shots.mjs
  - scripts/ui-fixture-server.mjs
  - test/frontend-budget.test.js
  - test/package-files.test.js
  - package.json
  - docs/adr/
---

# beads-ui 프런트엔드 재작성 구현 계획 — 통합 파이프라인 화면과 모바일 우선 (UI-dbn6)

## Context

- 승인 스펙: `docs/superpowers/specs/2026-09-23-frontend-rewrite-unified-pipeline-design.md`
  @ `27e524291e5f57b5a209bc5ebb0d094aa6066818`
  (`spec_review=astra@27e52429…`, r2 APPROVE). 목업
  `~/tmp/mockups/2026-09-23-beads-ui-redesign.html`
  (`http://100.122.98.8:9000/2026-09-23-beads-ui-redesign.html`) — 예시 데이터의
  시각 산출물이며 동작의 정본은 스펙이다. 스테일 재검토(2026-09-29, base
  `1b0cc9d4224835556f07b284ada8cc710af09a47`): `unchanged` — 기준 이후 scope
  변경은 선행 UI-j2h3(병렬 일괄 러너·gzip 빌드)와 UI-c7bv(gzip 미들웨어 root
  수리)뿐이고 ADR 현재 결정 표는 변동 없다.
- 문제와 목표: `app/` 비테스트 약 4만 줄 + CSS 1만 3천 줄이 4탭(Worker·Monitor·
  비교·ADR)과 설정·상세·전사 드로어를 담고, Monitor는 1초마다 전체 레인을
  재계산·재렌더하며, 모바일에서 드래그 재배치가 안 된다. 서버 코어와
  `app/protocol.md` 계약을 유지한 채 `app/`를 새 정보 구조(파이프라인 화면 하나 +
  범위 전체/레포, 상세·설정·전사는 시트, 모바일 레인 바·이동 시트)와 새 CSS 토큰
  체계로 다시 쓰고, 도움말·벤치·표시 정책·정렬 체인 편집기를 서버까지 제거한다.
- 선행 의존: UI-j2h3은 `closed`(PR #332, `7f7cb077`). 이 계획이 소비하는 것은
  병렬 일괄 러너 `app/views/monitor/bulk-preset-apply.js`·`bulk-account-apply.js`
  (Phase 1에서 `model/`로 이동)와 빌드 시 존재하는 `.js`·`.css`를 전부 gzip하는
  `scripts/build-frontend.js`(삭제·이동에 영향 없음). UI-7xrf(스냅샷 축소)는 이
  Bead 뒤 `spec-after-blocker`다.
- 계약 소유권: WS 프로토콜의 op·payload·`seq`·keyed patch 조립은 바꾸지 않는다.
  허용하는 추가는 스펙 §4.2의 비영속 스냅샷 필드 셋뿐이다 — `runnable[]`·
  `session_active[]`의 `priority`·`issue_type`, `bead_overlay[id]`의
  `priority`·`issue_type`·`labels`·`from_id`, 모니터 행 `bead_children`. 모두
  fail-quiet(부재 시 클라이언트가 칩·필터를 생략). 새 durable metadata 키·새 op
  없음. 제거 op는 마지막 Phase에서 `protocol.md` `## Removed (historical)`에
  기재한다. dotfiles 계약이 소유하는 라벨·키·`status` 어휘는 넓히지 않는다(ADR
  UI-u6ud-2). 서버 코어(`server/index.js`의 Worker 초기화·스케줄러·머지 큐·
  가드)는 건드리지 않는다.
- 조사로 확인한 사실(2026-09-29 인벤토리):
  - 서버(비테스트)가 import하는 `app/` 모듈은 `app/protocol.js`,
    `app/data/keyed-patch.js`, `app/data/closed-range.js`, `app/utils/`의
    `active-attempts`·`worker-eligibility`·`execution-defaults`·`session-preferred`·
    `spec-after-blocker`·`compare-problem-criteria`·`token-usage`·`failure-sentences`·
    `transcript-lines`·`awaiting-user-reason`·`carryover-index`·`complex-judgement`·
    `quickfix-lane`·`quickfix-resume-kind`로 스펙 §4.1 목록과 일치한다. 이들은
    **제자리**에 남고 새 `model/`이 그 경로를 import한다(스펙 §4.1의 `model/`
    나열 중 이 목록과 겹치는 이름은 이동하지 않는다). 서버 **테스트** 10개
    (`server/worker/runnable-cache.test.js`·`title-cache.test.js`·
    `scope-cache.test.js`·`exec-enums.test.js`·`receipt-check.test.js`·
    `artifact-scope.test.js`·`repair-lane-retirement.test.js`,
    `server/ws/monitor-handlers.test.js`·`worker-handlers.bead-scope.test.js`,
    `server/e2e/worker-flow.test.js`)가 `app/views/` 아래 모듈을 import하므로
    이동 Phase에서 그 경로를 함께 갱신한다.
  - 설치 패키지 목록 `package.json#files`(64행)는 `app/index.html`·
    `app/styles.css`·`app/styles/tokens.css`·`app/styles/base.css`·번들·서버
    import 모듈을 **경로로** 나열한다. CSS를 옮기거나 새 화면별 스타일시트를
    더하면 이 목록을 같은 커밋에서 갱신해야 설치본에서 스타일이 빠지지 않는다
    (저장소 안 빌드·캡처로는 드러나지 않는 결함).
  - `RETIRED_MIRROR_LABEL_PREFIXES = ['reviewed:', 'skipped:']`는
    `server/display-policy-store.js`(Phase 4 삭제 대상)에 있다. 값을
    `app/model/label-policy.js` 고정 상수로 복제한다. 정책 인자를 받는 기존
    `app/utils/label-policy.js`는 표시 정책 소비자라 옛 뷰와 함께 Phase 4에서
    지운다.
  - `app/views/worker/lane-model.js`(`buildLanes`, 5,200줄)는
    `server/worker/usage-pricing.js`를 import한다 — 이동 후에도 그대로 둔다.
    `graceChipTemplate`·`startNowButtonTemplate`은 `app/views/worker/lanes.js`
    (렌더, 새로 씀)에 있고 유예 조건 판정만 `lane-model`이 시간 경계로 돌려준다.
  - `scripts/ui-shots.mjs`는 없다(Phase 1 신설). 테스트는 `vitest.config.mjs`의
    두 프로젝트(node: `app/**`를 뺀 `**/*.test.js`, jsdom:
    `app/**/*.test.js`)라 새 `app/model/`·`app/screens/` 테스트는 자동으로
    jsdom이고 `test/*.test.js`는 node다. `server/ws/keyed-frames-fixture.js`(`createKeyedFrameNormalizer`)
    가 스냅샷 fixture 재료다. `app/styles/tokens.css`·`base.css`가 이미 있어
    `app/ui/`로 옮긴다. 테마 토글은 `app/main.js` 인라인이라 `ui/theme.js`로
    뺀다. lit-html `render`는 지금 19개 파일이 직접 import한다.
  - `bdui start`는 `server/index.js:187` `initWorkerRuntime`으로 같은 프로세스
    안에 Worker를 띄우고 시작 시 기존 작업을 reconcile한다. 따라서 워크트리에서
    ad-hoc 서버를 띄우는 미리보기는 운영 큐·상태를 건드린다 — 이 계획은 그런
    시험 기동을 하지 않는다.
- 실행 형태와 착지: 네 Phase 모두 `delegated`(kv 기본 `impl_runtime=claude`·
  `impl_model=opus`, 컨트롤러는 이 세션). landing 힌트 없음 = 모든 Phase를
  parent 브랜치 `UI-dbn6`에 누적하고 마지막에 non-empty PR 하나를 낸다. 머지·
  배포(`repo-ops/config.toml [deploy]`, `bdui-shared restart` 뒤 프로세스·포트·
  HTTP 확인)는 `pr-finish`가 맡고, 사용자의 실제 데이터 확인은 배포 뒤 통상
  결과 확인 인계다. Phase 사이의 사용자 피드백(`session_preferred_reason=
  user_feedback_loop`)은 각 Phase 봉인 때 fixture 환경 캡처(아래)를 tailnet
  목업 페이지(`~/tmp/mockups/<YYYY-MM-DD>-ui-dbn6-phase<N>.html`, PNG `data:`
  URI 인라인, `http://<ts-ip>:9000/...`)로 보내고 그 피드백을 다음 Phase 패킷에
  반영하는 것이며, 다음 Phase 착수를 조건 짓지 않는다. 이 계획은 Worker가
  수행할 수 없는 단계를 두지 않으므로 라벨 변경을 예고하지 않는다.
- Phase 분할: 스펙 §7의 네 Phase 그대로 — 기반+파이프라인 / 상세·전사 /
  설정·ADR·비교 / 정리. 각 Phase는 리뷰 가능한 델타 + 집중 검증 + 다음 Phase에
  넘기는 핀된 handoff(Phase 1의 shell·`ui/` 원시·store 배선·fixture 서버 →
  Phase 2·3의 마운트 지점과 검증 환경, Phase 3까지의 "옛 뷰 마운트 0" → Phase 4의
  삭제 입력)를 갖는다. 새 shell이 아직 안 바꾼 표면은 기존 컴포넌트를 같은
  옵션으로 브리지 마운트하고 기존 CSS는 Phase 4까지 남긴다.
- 작업 위치: `.worktrees/UI-dbn6`(브랜치 `UI-dbn6`), implementation execution
  entry에서 생성. 첫 검증 전 `node --version`이 `package.json#engines`(`>=22`)를
  만족하는지 확인하고 그 워크트리에서 `npm ci`(다른 체크아웃의 `node_modules`
  차용·심링크 금지).
- 공통 Pre-Handoff Validation(각 Phase 봉인 전, 위임 leaf 결과를 컨트롤러가
  재실행; 순서 고정): `npm run tsc` → `npm run lint` → `npx prettier --write
  <변경 파일>` → `npm run build`(번들은 untracked, 커밋에 넣지 않음; 예산
  테스트가 이 산출물을 읽는다) → `npx vitest run --reporter=dot`(전체, timeout
  120초, `set -o pipefail`).
- 검증 환경(운영 상태와 분리): `scripts/ui-fixture-server.mjs`(Phase 1 신설)가
  빌드된 `app/`(index.html·번들·CSS)을 정적으로 서빙하고 같은 포트의 WS에서
  프로토콜 부분집합을 fixture로 흉내 낸다 — `set-workspace`·`list-workspaces`·
  `subscribe-monitor-pipeline`(8개 레포 합성 스냅샷: 5레인 전부·유예 칩·외부
  대기·PR 대기·완료 포함)·`subscribe-worker-queue`·`subscribe-impl-presets`·
  `subscribe-list`(closed·deferred·issue-detail)·`get-*` 요청형 읽기, 그리고
  `worker-queue-reorder`·`-place`·`-remove`·`-start-now`는 메모리 큐에 적용해
  revision을 올린 응답과 keyed patch를 push한다; 그 밖의 op는 `ok` 응답만 준다.
  `bd`·`~/.local/state`·운영 서버·Worker를 전혀 건드리지 않는다. `scripts/
  ui-shots.mjs`는 이 서버를 대상으로 npx 캐시의 Playwright로 (1) 390·1280 폭
  캡처와 `scrollWidth > innerWidth` 보고, (2) 390 폭에서 모든 카드·행·시트 조작
  버튼의 `getBoundingClientRect().height ≥ 44`, (3) 1280 마우스 드래그·390 터치
  길게 누름(350ms) 드래그·이동 시트 `↑ 위로`가 fixture 큐의 순서와 DOM 순서를
  실제로 바꾸는지, (4) 8개 레포 첫 스냅샷 수신부터 첫 렌더 완료까지
  `performance.measure` 100ms 이하(1280), (5) 패치·입력 없는 유휴 60초 동안
  `window.__bdui.render_count` 증가 0을 보고한다. 의존성 추가 없음, Playwright
  부재 시 안내하고 종료.
- 렌더 관측: `app/ui/render.js`가 lit-html `render`를 import하는 **유일한**
  모듈이고(eslint `no-restricted-imports`로 다른 파일의 `lit-html` `render`
  import 금지 — 옛 뷰 삭제 전까지 `app/views/**` 예외), 모든 화면·시트·브리지
  마운트가 이 래퍼로 그린다. 래퍼는 호출 수를 세어 `window.__bdui.render_count`
  로 노출하며 jsdom 테스트와 ui-shots가 같은 값을 본다.
- 겹침 관찰: UI-r6xq(외부 대기 완료 출구 — 카드·상세의 외부 대기 버튼 집합
  변경)가 `app/`에 in-flight다. 이 설계의 전제가 아니며 착지 순서는 큐가 정한다.
  Phase 1·2가 외부 대기 조작을 옮길 때 **그 시점 base**의 버튼 집합·확인 문구를
  기준으로 옮기고, 나중에 착지하는 쪽이 base 동기화에서 충돌을 해소한다.
- 만들지 않는 것: `delete-issue`·`update-assignee`·`worker-queue-toggle`·
  `monitor-auto-toggle` UI(지금도 없음), 도움말 다이얼로그, 실험 벤치, 표시 정책
  탭, 정렬 체인 편집기, `buildLanes` 분할(UI-7xrf 뒤 별도), 서버의 Worker 비활성
  플래그(검증 환경은 fixture 서버가 맡는다).

## Phase 1: 기반과 파이프라인 — 모듈 이동·서버 투영·shell·레인·카드·모바일·드래그

실행: delegated

작업 내용 (스펙 §3.1~3.4·§3.6·§4.1·§4.2·§4.4·§5):

- **디렉터리 이동**(`git mv`, 서명·동작 불변, 테스트 동반, 옛 위치에 re-export
  shim 없음 — 모든 import 경로를 갱신하고 위 서버 테스트 10개도 함께):
  - `app/core/`: `app/ws.js`·`app/router.js`·`app/state.js` →
    `app/core/ws.js`·`router.js`·`state.js`. `app/protocol.js`는 서버 import라
    제자리(`core/protocol.js`를 두지 않고 `app/protocol.js`를 import).
  - `app/model/`: `views/worker/lane-model.js`·`placement.js`·
    `wait-vocabulary.js`·`queue-blockers.js`·`failure-labels.js`·
    `merge-steps.js`·`gate-labels.js`·`pr-wait-progress.js`,
    `views/monitor/adopted-queue.js`·`blockers.js`·`dep-candidates.js`·
    `bulk-preset-apply.js`·`bulk-account-apply.js`,
    `views/settings-dialog/session-model.js`·`bulk-observation.js`,
    `views/child-rollup.js`, `utils/blocker-scope.js`·`exec-settings-chip.js`·
    `chip-preset-binding.js`·`report-marker.js`·`relative-time.js`·
    `scope-overlap.js`·`child-rollup.js`, `data/sort.js`·
    `subscription-issue-store.js`·`subscription-issue-stores.js`·
    `subscriptions-store.js`·`monitor-pipeline-store.js`·`worker-queue-store.js`·
    `exec-preset-store.js`·`session-log-store.js`. 이름이 겹치는
    `utils/child-rollup.js`와 `views/child-rollup.js`는 이동 전에 역할을 확인해
    순수 쪽만 `model/child-rollup.js`로, 렌더 쪽은 옛 뷰에 남긴다. 규칙: `model/`
    은 브라우저 전역을 읽지 않는다(`lane-model.js`의 `usage-pricing.js` import는
    유지).
  - `app/ui/`: `app/styles/tokens.css`·`base.css` → `app/ui/tokens.css`·
    `base.css`. `app/index.html`의 `<link>`와 `package.json#files`를 같은
    커밋에서 갱신하고, 새 화면별 스타일시트(`app/screens/pipeline/pipeline.css`
    등)도 `files`에 더한다.
- **서버 투영**(모두 fail-quiet, 기존 필드·순서 불변):
  - `server/worker/runnable-cache.js`: `RunnableItem`(123행)·
    `SessionActiveItem`(202행)에 `priority: number|null`·`issue_type:
    string|null`(같은 `bd list` 행 값, 부재 `null`). 워크스페이스 목록 스냅샷을
    `parent`로 색인한 `childrenIndexFor(workspace) → Record<parent_id, { ids:
    string[], closed: string[] }>` 읽기 API(스냅샷 세대 캐시, `bd` 추가 호출
    없음 — ADR UI-u6ud).
  - `server/worker/title-cache.js`: `BeadRecord`(102행)에 `priority`·
    `issue_type`·`labels: string[]`·`from_id: string|null`을 같은 `bd show`
    페이로드에서 채운다(예외 → 필드 생략).
  - `server/ws/monitor-handlers.js`: `beadOverlayFor()`(887행)가 위 네 필드를
    통과시키고, 모니터 행 조립(1035~1074행)에 `bead_children`을 붙인다. 대상 id
    집합은 지금과 같다(레인 구성원 ∪ done ∪ runnable ∪ pr_wait ∪ session_active).
  - `app/protocol.md` 모니터 파이프라인 채널 섹션에 세 항목을 문서화한다.
- **`app/model/label-policy.js`**(신설, 고정 규칙 상수 하나):
  `HIDDEN_LABEL_PREFIXES = ['reviewed:', 'skipped:', 'export:', 'provides:']`,
  `HIDDEN_LABELS = ['has:spec', 'pr']`, `JUDGEMENT_LABELS = ['frontend',
  'backend', 'complex', 'session-preferred', 'worker-ineligible',
  'spec-after-blocker']`와 `splitLabels(labels) → { judgement: string[],
  plain: string[] }`.
- **`app/core/router.js` 재작성**: 화면 `#/pipeline`(기본)·`#/compare`·`#/adr`,
  오버레이 `?issue=<id>&root=<encodeURIComponent(root_dir)>`. 레거시
  `#/worker`·`#/monitor`·`#/board`·`#/issues`·`#/epics`·`#/issue/<id>`·
  `#/worker?issue=`는 `#/pipeline`(+`?issue=`)로 정규화하고 `#/monitor`는 범위
  전체, `#/worker`는 저장된 레포로 둔다. `createHashRouter(store)` 형태는 유지.
- **`app/core/state.js`**: 표시 범위 `localStorage beads-ui.scope`(`*` 또는
  root_dir)와 연결 저장소 `beads-ui.workspace`(항상 실제 root_dir, "숨김·미등록
  이면 지운다" 규칙은 이것에만)를 별개 상태로. 레인 접힘은 범위별, 레포별 묶음
  접힘은 `beads-ui.monitor.sections`와 같은 키 모양, 후보 필터·정렬·실행 중
  정렬·완료 기간은 기존 키를 잇는다.
- **`app/main.js` 부트 순서**(스펙 §5.1): 두 값 읽기 → `set-workspace` 1회 →
  `subscribe-monitor-pipeline`(+ 레포 범위면 `subscribe-worker-queue`) →
  `subscribe-impl-presets` 1회 → 첫 스냅샷 `buildLanes` → 렌더. 부팅 목록 구독
  6개는 없다. `set-workspace` 응답 `changed: true` 뒤 열린 표면의 구독(상세
  `issue-detail`, 레포 범위 완료·보류 목록)을 다시 연다. 테마 토글은
  `app/ui/theme.js`(`localStorage beads-ui.theme`·`data-theme` 의미 그대로).
- **`app/ui/`** 원시: `render.js`(위 렌더 관측 래퍼), `tokens.css` 정리(쓰지
  않는 값 삭제, 밝은 테마 오버라이드 유지), `base.css`(리셋·글꼴: 기기 기본
  한글 산세리프 + 모노, 크기 11·12·13.5·15·17·22px), `button.js`·`chip.js`·
  `sheet.js`·`popover.js`·`toast.js`·`dialog.js`(200ms 모션,
  `prefers-reduced-motion` 즉시), `ticker.js`(1초마다 `[data-ts]` 텍스트만 갱신,
  `relative-time` 사용, `render.js`를 부르지 않음), `viewport.js`(`min-width:
  720px`·`1100px` 두 분기 + `pointer: coarse` 판정). 클래스 접두 `pl-`(파이프
  라인)·`ui-`(원시).
- **`app/screens/pipeline/`**: `shell.js`(헤더 한 줄 — 브랜드·범위 선택기·nav·
  요청 진행 표시 `activity-indicator.js` 그대로·사용량 미터(Phase 3까지 기존
  `views/usage-meter.js` 마운트)·테마·⚙·새 이슈; 모바일은 브랜드·범위·사용량·⚙만,
  nav는 범위 선택기 목록 안), `scope.js`, `toolbar.js`(전체: 레포 띠 + 실행·PR
  대기·오늘 완료 수·누적 사용량 / 레포: 자동화 ▶⏸·자동 머지·동시 실행·직렬
  레인 수·검색 + 저장소 작업 줄), `repo-strip.js`(칩 = 이름·실행 n/슬롯·자동화
  점·⚙; 칩 클릭 범위 전환, 점 클릭 `worker-automation-toggle`, ⚙ 레포 설정;
  모바일 가로 스크롤), `lanes.js`(5레인, 전체 범위 레포별 묶음·접기, 레인 머리
  조작: 후보 필터 줄 route·준비도·우선순위·타입·라벨·`blocked 표시`·`표시된
  것만`과 정렬 프리셋 4종, 실행 중 정렬 시작순·경과순, PR 대기 `[일괄 머지]`/
  `[일괄 머지 중단]`, 완료 기간 선택과 보류 선반은 레포 범위만),
  `card.js`·`mini-row.js`·`running-tile.js`(카드 문법 승계: §2 줄 순서·§5.1
  슬롯 표·칩 클릭 의미·`.op-btn` 자리; 바뀌는 셋 — 슬롯 3 stepper를 상단 5칸
  진행 띠로, 굵은 포인터의 대기 행 조작은 `⋯` 하나, 슬롯 7 시각 줄은
  `data-ts`; 라벨 칩은 `model/label-policy.js`; foot 버튼 44px, 둘 넘는 조작은
  `⋯` 시트로, 파괴적 조작은 항상 시트 안 + 확인 문구 유지), `lane-bar.js`
  (모바일 하단 레인 바, 카운트·단계색 점), `move-sheet.js`(`↑ 위로`·`↓ 아래로`·
  `맨 앞으로`·`병렬로`·`직렬 n`·`지금 시작`·`대기에서 빼기` — 각각 기존 op
  하나), `drag.js`(포인터 이벤트; 마우스 즉시, 터치·펜 350ms 길게 누름, 가장자리
  자동 스크롤, 드롭 대상 병렬 영역·직렬 레인·행 사이, 타 레포 직렬 레인 드롭
  거부 유지), 저장소 작업 줄·스크립트 뷰어(`GET /api/repo-ops-script`)·타임라인
  드로어·`[배포 실행]`·opt-out 토글(기존 컴포넌트를 재사용할 수 있으면 같은
  옵션으로 마운트).
- **데이터 계층**: 레인은 두 범위 모두 모니터 행으로 조립하고 레포 범위만
  `worker-queue-store`(`set()`의 낮은 revision 폐기 규칙)를 더한다. 전체 범위의
  변경 응답 채택은 `model/adopted-queue.js`에 규칙을 추가한다 — 저장소별로
  마지막에 관측(모니터 행)하거나 채택한 `revision`보다 낮은 응답은 버리고,
  채택은 모니터 store의 `seq`를 바꾸지 않으며, 모니터 행 revision이 채택분 이상이
  되면 `pruneAdopted`. 완료·보류는 펼칠 때만 `subscribe-list closed-issues`
  (`params.since`)·`deferred-issues`. `buildLanes` 메모 키: 모니터 `seq`·저장소별
  채택 revision·워커 큐 store 세대·완료·보류 목록 세대·범위·검색·필터·정렬·완료
  기간·시간 경계 통과. `lane-model.js`는 결과에 `next_boundary_at`(가장 이른 유예
  만료 시각, 없으면 `null`)을 additive로 더하고, 화면은 그 시각에 해당 레인만
  한 번 다시 렌더한다. lit-html `repeat` 키 지정으로 바뀐 레인만 재렌더.
- **옛 표면 브리지**: 상세 패널·설정 다이얼로그·전사 드로어·문서 뷰어·새 이슈
  다이얼로그·ADR·비교는 기존 컴포넌트를 같은 옵션으로 `ui/render.js` 위에
  마운트하고 연결 저장소의 `worker-queue-store` 데이터·통지를 계속 공급한다.
  `views/worker/index.js`·`views/monitor/index.js`·`help-dialog/`의 진입(탭·
  라우트·단축키)은 지운다(파일 삭제는 Phase 4).
- **검증 도구 신설**: `scripts/ui-fixture-server.mjs`와 `scripts/ui-shots.mjs`
  (Context의 검증 환경 항목대로; 이 Phase는 파이프라인 페이지 항목만 캡처·측정
  하고 상세·설정·ADR·비교 항목은 뒤 Phase가 더한다), `test/package-files.test.js`
  (`package.json#files`의 파일 항목이 모두 존재하고 `app/index.html`이 참조하는
  CSS·JS가 `files`에 포함된다), eslint `no-restricted-imports` 규칙.

검증: RED→GREEN으로 `npx vitest run server/worker/runnable-cache.test.js server/worker/title-cache.test.js server/ws/monitor-handlers.test.js app/model/label-policy.test.js app/model/adopted-queue.test.js app/model/lane-model.test.js app/core app/ui app/screens/pipeline app/main.boot.test.js test/package-files.test.js`를 통과시키고(새 테스트는 §Test scope; 이동한 모듈의 기존 테스트는 경로만 바뀐 채 그대로 통과), 부록 A의 파이프라인·데크·Worker 툴바 행 전부를 체크리스트로 봉인 커밋 메시지 본문(최종 PR 본문에 합침)에 첨부하며, `node scripts/ui-fixture-server.mjs --port 3101`을 띄운 뒤 `node scripts/ui-shots.mjs http://127.0.0.1:3101 --out <scratch>`가 파이프라인(전체·레포) 390·1280 캡처·`scrollWidth` 초과 0·조작 버튼 높이 ≥ 44px·드래그와 이동 시트의 실제 재배치·8개 레포 첫 렌더 100ms 이하·유휴 60초 `render_count` 증가 0을 모두 통과 보고한 뒤, 브라우저에서 fixture 서버에 대한 기본 상태 WS 구독이 monitor-pipeline + impl-presets 둘(레포 범위는 worker-queue 하나 추가)인지 확인하고, Pre-Handoff Validation 전부(고정 순서).

Phase 1 봉인 기준: 부록 A 파이프라인 행 도달 가능, 옛 Worker·Monitor 탭 진입
없음, `protocol.md` 갱신, 서버 테스트 10개의 import 경로 갱신, `package.json#
files` 갱신, 캡처 페이지를 tailnet 목업으로 공유(사용자 피드백 → Phase 2 패킷).
parent 브랜치에 리뷰 가능한 커밋으로 누적.

## Phase 2: 이슈 상세·전사 드로어·새 이슈·문서 뷰어

실행: delegated

작업 내용 (스펙 §3.1·§3.2·§3.5·§3.6·§4.2·§5.4):

- **`app/screens/detail/`**: 데스크톱 오른쪽 패널(560px, 레인 위 오버레이),
  모바일 전체 화면 시트(헤더 ✕·뒤로가기 hash로 닫음). 순서: 머리(ID·route·판정
  칩·닫기) → 제목 → 라벨 stepper → 실행 설정(유효값 + 층 표시, 행별 편집 시트,
  프리셋 적용 바 — 값 해석은 `app/utils/execution-defaults.js` 그대로) → 의존 →
  속성(상태·우선순위·라벨) → 설명(markdown) → 외부 작업 → Worker 이력(세션 행:
  전사·이어하기·재개 명령 복사·토큰 사용량 상세 펼치기; 문의·해결 세션 배지의
  Discord 링크) → 댓글 → 과업 프롬프트(펼침). 조작은 부록 A 상세 행 전부
  (`edit-text`·`update-status`·`update-priority`·`label-add/-remove`·
  `dep-add/-remove`(확인)·`update-workflow-meta`(full_plan 이탈 확인)·
  `update-exec-settings`·`update-impl-target`·`apply-impl-preset`·
  `get-comments`/`add-comment`·`get-bead-prompt`·`get-session-refs`·
  `get-bead-timeline`·`get-session-defaults`/`get-workspace-accounts`·문서
  열기·경로 복사·대기로·외부 대기 조작). 다른 레포 카드를 열면 상세 전에
  `set-workspace` → `changed: true` 뒤 재구독, 범위 표시는 전체 유지, 해시에
  `root` 보존(재로드 시 같은 저장소로 연결 뒤 열기). `subscribe-list
  issue-detail`(`detail:<id>`) + 요청형 읽기.
- **`app/screens/transcript/`**: 드로어(모바일 전체 화면 시트),
  `subscribe-session-log`/`unsubscribe-session-log`(attempt·launch_id·
  session_ref) 표시 중만, `get-attempt-prompt`, 따라가기·접기·복사. 파서는
  `app/utils/transcript-lines.js` 그대로.
- **`app/screens/new-issue/`**: 전체 범위에서 대상 저장소 선택(기본 연결
  저장소; 다른 저장소면 `set-workspace` 뒤 `create-issue`), Ctrl/Cmd+N.
- **`app/screens/doc-viewer/`**: `GET /api/doc` 문서 뷰어(스펙·ADR·플랜 공통).
- 재개·계속 다이얼로그, 복구 선택 다이얼로그, `continuation_mismatch`·
  `prior_session_unavailable` 다이얼로그는 현행 의미로 새 `ui/dialog.js` 위에
  옮긴다. 옛 `detail-panel/`·`transcript-drawer.js` 브리지 마운트를 해제한다.
- fixture 서버에 `issue-detail`·댓글·프롬프트·세션 참조·전사 스트림 fixture를,
  `ui-shots.mjs`에 상세(390·1280)·전사 드로어 항목을 더한다.

검증: RED→GREEN으로 `npx vitest run app/screens/detail app/screens/transcript app/screens/new-issue app/screens/doc-viewer app/core/router.test.js`를 통과시키고(새 테스트는 §Test scope), 부록 A의 상세·전사 행 전부를 체크리스트로 봉인 커밋 본문에 첨부하며, fixture 서버 대상 `ui-shots.mjs`가 상세·전사(390·1280) 캡처·잘림 0·버튼 높이·유휴 렌더 0을 통과 보고한 뒤 Pre-Handoff Validation 전부(고정 순서).

Phase 2 봉인 기준: 부록 A 상세·전사 행 도달 가능, 다른 레포 상세 열기·재로드
복원·재구독이 테스트로 고정, 캡처 페이지 공유(피드백 → Phase 3 패킷).

## Phase 3: 설정(레포·일괄)·사용량 팝업·ADR·비교

실행: delegated

작업 내용 (스펙 §3.7~3.9·§3.6):

- **`app/screens/settings/`**: 레포 모드(레포 범위 ⚙·레포 띠 ⚙·상세의 프리셋
  바꾸기 → 워커 프리셋·세션·계정 3탭), 일괄 모드(전체 범위 ⚙ → 워커 프리셋·
  세션·계정·칩 바인딩 4탭 + 대상 레포 체크, 실패만 재선택·취소). 워커 프리셋
  탭은 UI-7yh2 설계의 배치·모양만 승계하고 의미는 현행: 프리셋은 `applies_to`
  계열(일반/quick_fix) 하나에 속하고 적용 바는 계열별로 하나씩(각각
  `apply-impl-preset-global` 한 번, ADR UI-u6ud-10), 폼 값과 적용 프리셋의 차이
  판정(`applied_exec_preset`·`applied_quick_fix_preset` 대비)도 계열별.
  `impl-preset-create/-update/-delete`, `impl-preset-bind`(일괄 모드 칩 바인딩
  탭), `get-worker-system-prompt`. 세션·계정 탭의 필드·저장 의미(strict 거절,
  per-key 마지막 쓰기)는 현행: `set-session-defaults`·`set-worker-url-common`·
  `set-workspace-accounts`·`worker-provider-limit-policy-set`·
  `worker-queue-set-orchestration-defaults`. 일괄 세션 탭은 `workflow_mode`·
  `bdui_url`·`base_sync_accept_local_commits` 세 필드를 여러 저장소에 쓴다.
  일괄 러너는 `model/bulk-preset-apply.js`·`bulk-account-apply.js`(병렬) 그대로.
  `set-workspace-visibility`·`list-workspaces`·`git-pull-workspace`는 설정의
  저장소 목록에.
- **사용량 팝업**: 헤더 미터(작은 막대 셋)를 새로 그리고 탭하면 계정·전환 팝업
  (`GET /api/claude-usage`·`/api/codex-usage`, `POST /api/claude-account/switch`·
  `/api/codex-account/switch`, 폴링은 표시 중만). 집계는
  `app/utils/token-usage.js` 그대로(ADR UI-u6ud-9). 옛 `views/usage-meter.js`
  브리지 해제.
- **`app/screens/adr/`**: 레포별 머리줄(이름·현재 n·이력 n·신호 배지 둘: 색인·
  인용) 아래 현재 결정 한 줄씩(ID·제목·요약·날짜, 클릭은 문서 뷰어), `이력 n건
  보기` 접기, 배지 클릭은 체커 오류 목록 팝업(`CheckerError` 그대로, 후보 신호·
  교차 인용은 팝업 안), 필터·검색, Bead로 이동. `subscribe-adr` 화면 표시 중만,
  데이터 `adr-snapshot` 그대로(ADR UI-u6ud-2).
- **`app/screens/compare/`**: 표·필터(기간·레포·route·묶기)·판정 기준(접힘)·
  새로고침·행 클릭 → 상세. 실험 섹션·`새 실험` 없음. `get-compare`는
  `include_bench: false` 고정, `runs`·`bench_rows`는 읽지 않는다.
- 옛 `settings-dialog/`·`adr/`·`compare/`·`usage-meter.js` 브리지 마운트 해제.
  fixture 서버에 프리셋·세션 기본값·계정·ADR 스냅샷·비교 fixture를, `ui-shots.mjs`
  에 설정(레포·일괄)·ADR·비교 항목을 더한다.

검증: RED→GREEN으로 `npx vitest run app/screens/settings app/screens/adr app/screens/compare app/screens/pipeline/shell.test.js`를 통과시키고(새 테스트는 §Test scope), 부록 A의 설정·ADR·비교·전역 행 전부를 체크리스트로 봉인 커밋 본문에 첨부하며, fixture 서버 대상 `ui-shots.mjs`가 설정(레포·일괄)·ADR·비교(390·1280) 캡처·잘림 0·버튼 높이·유휴 렌더 0을 통과 보고한 뒤 Pre-Handoff Validation 전부(고정 순서).

Phase 3 봉인 기준: 부록 A 전 행이 새 화면에서 도달 가능(옛 뷰 마운트 0 —
Phase 4 삭제의 입력), 계열별 프리셋 적용·차이 판정 테스트 고정, 캡처 페이지
공유(피드백 → Phase 4 패킷).

## Phase 4: 정리 — 서버 제거·옛 뷰·CSS 삭제·protocol.md·ADR 착지·코드 예산

실행: delegated

작업 내용 (스펙 §4.5·§4.6·§6):

- **서버 제거**: `server/ws/display-policy-handlers.js`·
  `server/display-policy-store.js`와 `subscribe-display-policy`/
  `display-policy-set`; `server/ws/bench-handlers.js`·`server/worker/bench-runs.js`
  와 `bench-run-create`; `server/worker/compare-projection.js`의 `runs`·
  `bench_rows` 조립(`include_bench`는 받으면 무시, `bad_request` 아님);
  `monitor-auto-toggle` 라우트; `server/ws/connection.js` 디스패치 표·
  `server/ws/index.js`·`server/app.js` 배선; `app/protocol.js` `MESSAGE_TYPES`;
  관련 서버 테스트 삭제·갱신. `scripts/check-*-retired.js` 류가 제거 항목을
  참조하면 함께 갱신.
- **클라이언트 삭제**: `app/views/` 전부, `app/data/display-policy-store.js`,
  `app/utils/label-policy.js`, `app/utils/`·`app/data/` 중 새 코드가 import하지
  않는 모듈과 그 테스트, `app/styles.css`·`app/styles/`, `app/main.monitor.e2e.
  test.js`·`app/styles.worker-theme.test.js` 같은 옛 표면 테스트. **예외**: §4.1
  서버 import 모듈(위 Context 목록)은 남긴다. `package.json#files`에서 삭제
  경로를 지우고 eslint 규칙의 `app/views/**` 예외를 없앤다. 삭제 뒤 `grep -rn`
  으로 옛 경로·제거 op 참조 0을 확인한다.
- **`app/protocol.md`**: 제거 op를 `## Removed (historical)`에 기재하고
  `## Bench experiment creation` 섹션·표시 정책 항목·`include_bench` 설명을
  정리한다.
- **ADR 착지**(`adr` 스킬): 스펙 `## 결정 (ADR 후보)`의 후보 1을 materialize하고
  UI-l48z를 supersede한다(스펙 §7이 정리 Phase에 두었다).
  `check-adr-candidates.py --spec <상대경로> --adr-dir docs/adr`가 `ok`.
- **코드 예산 테스트** `test/frontend-budget.test.js`(node 프로젝트): `app/`
  비테스트 `.js` 2만 줄 이하, CSS 4,000줄 이하, 파일당 1,000줄 이하(예외 목록:
  `app/model/lane-model.js`), `npm run build` 산출 `app/main.bundle.js` minify
  350KB 이하·gzip 120KB 이하 — 번들이 없으면 skip이 아니라 "먼저 `npm run
  build`" 메시지로 실패한다(Pre-Handoff 순서가 build → vitest라 항상 현재
  산출물을 본다).
- `.github/workflows/`는 건드리지 않는다.

검증: `test/frontend-budget.test.js`·서버 제거 테스트를 RED→GREEN으로 통과시키고, `grep -rn 'display-policy\|bench-run-create\|monitor-auto-toggle\|include_bench' app server --include='*.js'`(테스트 제외, `app/main.bundle.js` 제외)가 허용된 무시 분기 외 0건인지 확인하며, fixture 서버 대상 `ui-shots.mjs` 전 화면 회귀(잘림 0·버튼 높이·유휴 렌더 0) 뒤 Pre-Handoff Validation 전부(고정 순서: `tsc` → `lint` → `prettier` → `build` → `vitest` 전체).

Phase 4 봉인 기준: §6 코드·제거 기준 충족, ADR 파일·README 색인 갱신, 최종
non-empty PR(`resolved` + `pr_url`, 워크트리 보존, 머지·배포는 `pr-finish`, 배포
뒤 실제 데이터 확인은 사용자 인계).

## Test scope

RED→GREEN 좌석(모든 새 테스트는 "한 테스트 한 동작", 능동 동사 이름, setup →
execution → assertion 빈 줄 구분; 테스트를 통과시키려고 구현을 고치지 않는다):

- Phase 1
  - `server/worker/runnable-cache.test.js`: `bd list` 행의 `priority`·
    `issue_type`이 `RunnableItem`·`SessionActiveItem`에 실리고 부재 시 `null`;
    `childrenIndexFor`가 `parent`별 `ids`·`closed`를 돌려주고 자식 없는 부모는
    키가 없다.
  - `server/worker/title-cache.test.js`: 같은 `bd show` 페이로드에서
    `priority`·`issue_type`·`labels`·`from_id`를 채우고 필드 부재 시 생략한다.
  - `server/ws/monitor-handlers.test.js`: 모니터 행의 `bead_overlay[id]`에 네
    필드가 통과하고 `bead_children`이 붙으며, 캐시 예외 시 두 필드가 생략돼도
    행은 나간다(fail-quiet).
  - `app/model/label-policy.test.js`: 접두 4종·라벨 2종 숨김, 판정 라벨 6종
    분리, 나머지는 plain.
  - `app/core/router.test.js`: 레거시 해시 6종 정규화, `#/monitor` → 범위 전체,
    `?issue=&root=` 파싱·직렬화.
  - `app/core/state.test.js`: `beads-ui.scope`와 `beads-ui.workspace` 분리 저장,
    무효 워크스페이스 삭제 규칙은 후자만.
  - `app/model/adopted-queue.test.js`: 낮은 revision 응답 폐기, 채택이 모니터
    `seq`를 바꾸지 않음, 모니터 행 revision 도달 시 prune.
  - `app/model/lane-model.test.js`: `next_boundary_at`이 가장 이른 유예 만료
    시각이고 없으면 `null`(기존 결과 불변).
  - `app/screens/pipeline/lanes.test.js`: `keyed-frames-fixture` 스냅샷으로
    5레인·레포별 묶음 렌더, 메모 키 하나가 바뀔 때만 `buildLanes` 재호출,
    fake timer로 유휴 60초 동안 `ui/render.js` 호출 0회·시간 경계 시각에 해당
    레인 1회 렌더.
  - `app/screens/pipeline/card.test.js`·`move-sheet.test.js`·`drag.test.js`·
    `repo-strip.test.js`·`toolbar.test.js`: 각 조작 클릭·드롭이 정확한 WS 타입·
    payload(`root_dir`·`expected_revision` 포함)를 `send`로 보내고, 파괴적 조작은
    확인 뒤에만 보내며, 터치 길게 누름 350ms 전에는 드래그가 시작되지 않고 타
    레포 직렬 레인 드롭은 거부된다.
  - `app/ui/render.test.js`·`ticker.test.js`·`viewport.test.js`: 렌더 호출 수
    노출, `data-ts` 텍스트만 갱신(렌더 0회), 분기 판정.
  - `app/main.boot.test.js`: 부팅 구독이 monitor-pipeline + impl-presets 둘(레포
    범위는 worker-queue 하나 추가), `set-workspace` `changed: true` 뒤 열린 표면
    재구독.
  - `test/package-files.test.js`: `files`의 파일 항목 존재, `index.html` 참조
    CSS·JS 포함.
  - 이동한 모듈의 기존 테스트: 경로만 바뀐 채 변경 없이 통과(RED 없음).
- Phase 2
  - `app/screens/detail/*.test.js`: 섹션 순서, 각 조작의 WS 타입·payload, 다른
    레포 카드 열기 시 `set-workspace` 선행과 해시 `root` 보존, 재로드 복원.
  - `app/screens/transcript/*.test.js`: 표시 중만 구독·해제, 따라가기·접기.
  - `app/screens/new-issue/*.test.js`: 전체 범위 대상 저장소 선택 →
    `set-workspace` → `create-issue` 순서.
- Phase 3
  - `app/screens/settings/*.test.js`: 계열별 적용 바가 각각
    `apply-impl-preset-global` 한 번, 계열별 차이 판정, 일괄 세션 탭 세 필드가
    대상 저장소마다 쓰임, strict 거절 표시.
  - `app/screens/adr/*.test.js`·`compare/*.test.js`: `include_bench: false`
    고정과 `runs`·`bench_rows` 미사용, 배지 팝업의 `CheckerError` 표시.
- Phase 4
  - `test/frontend-budget.test.js`: 네 예산 항목과 번들 부재 시 실패 메시지.
  - `server/ws/connection.test.js`(또는 기존 디스패치 테스트): 제거된 op 4종이
    `unknown_type`으로 거절되고 `get-compare`의 `include_bench: true`가 무시된다.

제외: 포인터 캡처·가장자리 자동 스크롤·모션·버튼 높이·첫 렌더 시간·실제
재배치는 jsdom이 아니라 `scripts/ui-shots.mjs`(fixture 서버 + Playwright)가
본다; `buildLanes` 내부 분할·리팩터 테스트는 UI-7xrf 뒤 별도; 서버 코어(Worker
초기화·스케줄러·머지 큐·가드)는 이 계획이 건드리지 않으므로 테스트 변경 없음.
