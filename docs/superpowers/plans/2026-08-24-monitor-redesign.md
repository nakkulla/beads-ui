---
scope:
  - app/views/monitor/
  - app/views/worker/lanes.js
  - app/views/worker/running-grid.js
  - app/views/worker/transcript-drawer.js
  - app/views/worker/transcript-render.js
  - app/views/settings-dialog/
  - app/utils/transcript-lines.js
  - app/main.js
  - app/styles.css
  - app/protocol.md
  - server/ws/monitor-handlers.js
  - server/ws/worker-handlers.js
  - server/ws/session-defaults-handlers.js
  - server/ws/exec-preset-handlers.js
  - server/ws/context.js
  - server/session-defaults.js
  - server/worker/runnable-cache.js
  - server/worker/title-cache.js
  - server/worker/session-log.js
  - server/worker/bd-metadata.js
  - server/worker/runtime.js
  - server/worker/attach.js
  - server/workflow-enrich.js
---

# 모니터 탭 전면 재설계 구현 계획 (UI-eey2)

## Context

- 승인 스펙: `docs/superpowers/specs/2026-08-23-monitor-redesign-design.md`
  @ `7adc66e3b6280d3535dd747cad26c76518b10637`
  (`spec_review=codex@7adc66e3b6280d3535dd747cad26c76518b10637`, spec gate
  REVISE 10건 반영 후 컨트롤러 전체 self-review로 닫음). 목업
  `~/tmp/mockups/2026-08-23-monitor-redesign.html`(실제 앱 CSS 인라인).
- 문제: 모니터 탭은 Worker 탭과 다른 3열 그리드·전용 `mon-*` 카드라 같은 사실이
  다른 모양으로 보이고, 실행가능 카드에 stepper가 없으며(runnable 투영에
  `workflow` 부재), 실행중 카드는 heartbeat·토큰뿐이라 "무엇을 하는지" 안 보이고
  (서버 attempt 투영에 단계/활동 필드 부재), 레포별 자동화·모델 설정을 한
  화면에서 다룰 자리가 없고(설정 다이얼로그는 연결 workspace 한 곳), ID 복사·
  레포 라벨 이동·`대기로` 데스크톱 노출 같은 상호작용 결함이 있다. 닫힌 선행
  blocker 경고는 quick_fix `ddb55ee898eb37b5c976fd68d0f76174d3f1aed5`로 이미
  착지·배포됐다(스펙 §10) — 이 계획은 그 위에서 시작하고 blocker 정정을 다시
  다루지 않는다.
- 목표: (1) Worker 템플릿(`paneTemplate`/`candidateCard`/`miniRow`/
  `runningTile`)을 재사용하는 세로 5레인 + 레포 섹션, (2) 실행중 진행 상세
  (stepper·최근 활동·위임 칩·후속 칩), (3) 레포 데크(슬롯 레일·자동화/머지
  스위치·오케/워커 모델 칩·⚙ 레포 바인딩 실행 설정 pane·포커스 필터), (4) 🔗
  연결 체인·선행/후속 의존 칩, (5) ID 클릭 복사·레포 라벨→Worker 탭·드래그
  1차/버튼은 coarse 포인터만, (6) "기본은 접고 중요한 것만" 원칙, (7) 헤더
  사용량 리본 모바일 폭. 마스터 `전체 자동화` 토글과 `다음 ▶` 예측 배지는 두지
  않는다(스펙 §4.1·§6.3).
- 계약 소유권: dotfiles `docs/contracts/workflow.{md,yaml}`이 소유하는 라벨·
  durable metadata 키·status 어휘는 넓히지 않는다. 새 durable 키 없음, 새 ws op
  없음 — 선택적 `root_dir`(`get/set-session-defaults`·`subscribe-session-log`·
  `get-attempt-prompt`)과 `apply-impl-preset-global`의 `root_dir` 의미 확장(kv
  까지), 그리고 비영속 snapshot 필드 추가만이다(스펙 §9).
- 실행 형태: 세 Phase 모두 `delegated`(full_plan 기본 dispatch). 같은 레포·
  같은 검증 번들이지만 서버 계약(Phase 1) → 그 계약을 소비하는 레인 재구성
  (Phase 2) → 설정 pane 추출과 데크(Phase 3)는 각각 리뷰 가능한 델타·집중
  검증·핀된 handoff(Phase 1의 `protocol.md`와 테스트가 Phase 2의 입력, Phase 2의
  모니터 뼈대가 Phase 3의 마운트 지점)를 가지므로 세 sealable unit으로 나눈다.
  landing 힌트 없음 = 모두 parent 브랜치에 누적, 마지막에 non-empty PR 하나.
- 작업 위치: `.worktrees/UI-eey2`(브랜치 `UI-eey2`), implementation execution
  entry에서 생성. 첫 검증 전 `node --version`이 `package.json#engines`를
  만족하는지와 `npm ls --depth=0` 성공을 확인하고, 없으면 그 worktree 안에서
  lockfile 기반 설치(다른 checkout의 `node_modules` 차용·symlink 금지 — 소스맵
  경로 독립).
- 공통 Pre-Handoff Validation(각 Phase 봉인 전): `npm run tsc` · `npm test` ·
  `npm run lint` · `npm run prettier:write` · 프론트 소스가 바뀐 Phase는
  `npm run build`로 `app/main.bundle.js`·`app/main.bundle.js.map` 갱신·포함.
  `[verify]`(`repo-ops/script/verify`)는 머지 직전 안전망이라 여기서 대신하지
  않는다.

## Phase 1: 서버 투영·계약 — stepper·활동·위임·레포 상태·root_dir

실행: delegated

작업 내용 (스펙 §9):

- **transcript 파서 이동·증분화** (`app/utils/transcript-lines.js` 신설,
  `app/views/worker/transcript-render.js`는 re-export): `parseTranscript`와
  내부 `parseClaude/parseCodex/parseDelegationMonitor`·`toolLine`·
  `thinkingLine`·`classifyText`·`GATE_RE`/`PHASE_RE`를 옮기고
  `createTranscriptReducer() → { push(event): DisplayLine[] }`를 추가한다
  (`toolsById` 짝맞춤 상태 보존; `parseTranscript(events)`는 reducer를 돌려
  같은 결과). `parseCodex`에 main-session `item.completed` +
  `item.type === 'command_execution'`을 `tool` 줄(command + exit/결과 요약)로
  투영하는 분기를 더한다. 드로어 렌더 무변경.
- **`session-log.js` `last_activity`**: attempt(+delegation `launch_id`)별
  reducer 맵; `publish()`마다 `push`해 마지막 비-`thinking` 줄을
  `{ at, kind, text(≤160), tool?, command?, path?, result? }`로 보관,
  `lastActivity(workspace, attempt_id)` 읽기 API. reducer `push`는 예외 경계
  안에서 부르고(파서 예외·malformed 이벤트 → 그 이벤트만 버리고 **마지막 성공
  `last_activity` 유지**, `publish()` 흐름·`last_event_at`·fanout은 계속; 스펙
  §12, plan review finding 2). 같은 자리에서 bd 쓰기 명령
  (`bd update|close|dep …` — Claude `Bash` tool_use의 짝 `tool_result` 도착 /
  Codex `command_execution` `item.completed`)을 관측하면 `options.onBeadWrite
  (workspace, bead_id)` 콜백을 부른다(명령 인자에서 bead id 추출; 실패는
  무시). 재시작 시 소실(live-only).
- **`title-cache.js`**: `BeadRecord.workflow` 추가 — 같은 `bd show` fill에서
  `enrichIssueWorkflow(issue, workspace)`(`server/workflow-enrich.js`)를
  계산(예외 → `null`). `workflowFor(workspace, ids)` 읽기(partial, 없으면 키
  생략) + `expire(workspace, bead_id)`(즉시 만료 → 다음 조회에서 refill).
  **wiring 두 곳**(plan review finding 1): (a) `server/worker/attach.js`가
  `createBdMetadata`를 만드는 지점에서 metadata 쓰기 readback(`bd show`
  결과)을 `titleCache.refreshFromIssue(workspace, issue)`로 흘리는 `onReadback`
  훅을 달고, (b) `server/worker/runtime.js`의 `createSessionLog(...)` 생성
  지점에서 `onBeadWrite: (workspace, bead_id) => titleCache.expire(workspace,
  bead_id)`를 넘긴다. 두 연결은 runtime/attach 테스트로 고정한다.
- **`runnable-cache.js`**: `RunnableItem`에 `workflow`(같은 `bd list` 행으로
  `enrichIssueWorkflow`, 실패 `null`)와 `exec_pins`(`metadata` 중
  `exec-enums.js BEAD_APPLY_KEYS` + `claude_account`/`codex_account`만 추린
  `Record<string,string>`)를 더한다. `spec_reviewer`/`plan_state`는 유지.
- **`worker-handlers.js`**: `decorateQueue`에 `bead_workflow: Record<bead_id,
  WorkflowSummary>`(대상 = `queue` ∪ `serial_lanes[].entries` ∪ running
  attempts ∪ `pr_wait`; `titleCache.workflowFor`, partial). `attemptsWithUsage`
  RUNNING overlay에 `last_activity`(sessionLog)와 `legs`(기존
  `delegation_sessions[]` + `usage_legs[]`만으로 `{ role, runtime, model,
  state: live|done|failed, ordinal, label }` — 라벨 `구현 unit <n> · <runtime>`
  / `review-consult · <runtime>`, 총수 없음). `handleSubscribeSessionLog`·
  `handleGetAttemptPrompt`가 선택적 `root_dir`을 `targetWorkspaceOf`로 받아
  대상 workspace의 exact attempt를 구독·조회(부재 시 현행).
  (`onBeadWrite`/`onReadback` 연결 자체는 위 title-cache 항목의 wiring 두 곳이
  소유한다.)
- **`context.js`·`session-defaults-handlers.js`·`exec-preset-handlers.js`**:
  `kvGetJsonAtRoot(root_dir, key)`/`kvSetJsonAtRoot(root_dir, key, value)`
  (같은 `requireBdJsonCapabilityForWorkspace('kv', root_dir)` 게이트, 기존
  `kvGetJsonInWorkspace/kvSetJsonInWorkspace`는 그 위의 얇은 래퍼로).
  `get/set-session-defaults`는 선택적 `root_dir`(`targetWorkspaceOf` 검증,
  `bad_request`)로 그 루트의 kv를 읽고/쓴다. `apply-impl-preset-global`은
  `root_dir`이 있으면 kv read/write/readback 전부를 그 루트에서 수행(현행은
  queue만). 성공 시 모니터 `session_defaults` 캐시 무효화 훅을 호출한다.
- **`monitor-handlers.js`**: `workspaces_state[]`에 `serial_lane_count,
  auto_repair, orchestration_model/effort/speed, execution_defaults,
  session_defaults, session_defaults_warnings, counts: { running, pr_wait,
  queue, runnable }`. `session_defaults`는 레포별 비동기 캐시(성공 5분 TTL,
  실패 `{}`+warning+1분 재시도, fill 완료 시 `schedulePush`, `set`/preset apply
  성공 시 그 레포 무효화 → push) — `issue_prefix` 캐시와 같은 모양. `counts`는
  클라이언트 `buildLanes()`와 같은 배타 우선순위(running > pr_wait > queue∪serial
  > runnable, 한 버드 한 칸). `invalidateSessionDefaults(root_dir)` export.
- **`app/protocol.md`**: `workspaces_state` 행 확장, `workspaces[].runnable[]`
  의 `workflow`/`exec_pins`, `worker-queue-snapshot`의 `bead_workflow`, RUNNING
  attempt의 `last_activity`/`legs`, 네 op의 `root_dir`, `apply-impl-preset-global`
  의 kv 범위 확장을 문서화.

검증: RED→GREEN으로
`npm test -- app/views/worker/transcript-render.test.js app/utils/transcript-lines.test.js server/worker/session-log.test.js server/worker/title-cache.test.js server/worker/runtime.test.js server/worker/attach.test.js server/worker/runnable-cache.test.js server/ws.worker-queue.test.js server/ws/worker-handlers.session-log.test.js server/ws/monitor-handlers.test.js server/ws/session-defaults-handlers.test.js server/ws/exec-preset-apply.test.js`
를 통과시키고(새 테스트는 §Test scope), 이어서 `npm run tsc` · `npm test`
전체 · `npm run lint` · `npm run prettier:write`. `transcript-lines`는
`app/`에 있어 번들에 들어가므로 `npm run build`로 번들·소스맵을 갱신해 커밋에
포함한다. 라이브 확인(선택): `BDUI_FRONTEND_MODE=live bdui start --host
127.0.0.1 --port 3001`로 `monitor-pipeline-snapshot`에 새 필드가 실리는지 ws
페이로드로 확인.

Phase 1 봉인 기준: 위 집중 테스트 + 전체 검증 녹색, `protocol.md` 갱신, 기존
클라이언트(모니터·Worker)는 새 필드 없이도 동작(fail-quiet)하며 렌더 변경 없음.
parent 브랜치에 리뷰 가능한 커밋으로 누적.

## Phase 2: 모니터 레인 재구성 — Worker 템플릿·레포 섹션·진행 상세·체인·상호작용

실행: delegated

작업 내용 (스펙 §3·§5–§8·§11·§12):

- **Worker 템플릿 옵션** (`app/views/worker/lanes.js`, `running-grid.js`):
  `candidateCard(item, place_menu, { exec_chips_mode: 'always'|'pinned_only' })`
  (기본 `always` — Worker 탭 불변; `pinned_only`는 핀이 레포 기본값과 다를 때만
  `exec-chip--pin` 칩). `miniRow`에 `dependency_chips: { predecessors[],
  successors[] }` 렌더(`🔒 선행 <id> (<위치>)`+✕ / `→ 후속 <id> (<위치>)`, 스펙
  §5.1 어휘·툴팁)와 완료 3줄 변형(`done_layout: 'three_line'` — 레포·ID·완료시각
  / 제목 / 토큰·작업). `runningTile(tile, now, selected, { monitor: { repo,
  workflow, last_activity, legs, successors } })`로 레포 배지·stepper
  (`stepperTemplate(workflow, 'in_progress')`)·활동 줄·위임 칩(진행 중만 펼침,
  끝난 것은 `✓ n`+툴팁)·후속 칩 줄을 추가(옵션 없으면 현행 DOM 그대로).
- **`app/views/monitor/lanes.js` 재작성**: `buildLanes()`가 Worker 아이템 형태
  (`workspace_name`·`root_dir`·`expected_revision`·raw 큐 좌표 보존)를 만들고,
  레포 섹션(`sections[]`: 실행가능 = 후보 있는 레포, 대기 = 큐 or 후보 있는
  레포 — 빈 큐는 `병렬` pane만; 섹션 헤더 오른쪽에 읽기 전용 `● 자동`/
  `○ 수동` 상태 점과 툴팁; 빈 직렬 레인은 한 줄 힌트로 접고 `is-dragging`에
  pane으로 펼치되 **설정 레인 수가 1이고 그마저 비었으면 힌트도 생략**; plan
  review finding 4), 실행가능 필터(`🔒 blocked` 기본 표시·
  `전체/spec 있음/spec 없음`·정렬 3종 — `레포 · spec 우선`/`레포 · 최신 수정`은
  레포 섹션 안 정렬, **`최신 수정(레포 무시)`는 섹션을 만들지 않는 평면 목록**
  (카드에 레포 배지 표시; plan review finding 3); 키
  `beads-ui.monitor.candidate-filter`/`bdui.monitor.candidate_sort`), 의존 칩 파생(전 레포 `blocked_by`/
  `bead_blocked_by` + `blockers.js` 위치 맵 → 선행·역방향 후속, 레인 밖 후속
  생략), 🔗 연결 체인(2노드 이상 연결 성분, 같은 직렬 레인만의 체인 제외, 위상
  순서·분기 들여쓰기·사이클 한 줄), 실행 타일 `monitor` 옵션 재료, 완료 3줄
  행, 기존 `mon-*` 카드 템플릿(`monitorRunnableCard/QueueRow/RunningTile/
  PrCard/DoneRow`·`monitorCardBody`·`monitorGroupHeaderTemplate`·
  `monitorTopBarTemplate`) 삭제. `blockers.js`는 위치 맵·prefix 판정 유지,
  `buildSerialLinkCandidates` 유지.
- **`app/views/monitor/index.js` 재작성**: `paneTemplate` 5개(`.worker-lanes`
  flex, 실행중 `flex:1.35`, 실행가능 `1.05`), 레인 헤더 컨트롤(실행가능 정렬,
  실행중 `시작순/레포순`(키 `bdui.monitor.running_sort`), PR `일괄 머지`, 완료
  기간 select(키 `bdui.monitor.done-range`)), 섹션 접기(키
  `beads-ui.monitor.sections`), 체인 블록 접기, 데크 마운트 지점(`.mon2-deck`
  빈 컨테이너 — Phase 3가 채움). 클릭 위임: `.worker-card__id/.worker-mini__id/
  .rtile__id` → `copyToClipboard` + 토스트(상세 안 열림); `.worker-mini__repo/
  .worker-card__repo/.mon2-sec__worker` → `switchWorkspace(root)` →
  `router.gotoView('worker')`(실패 토스트); 카드 본문 → 현행 `openRow`. 드래그
  컨트롤러: Worker와 같은 좌표 산식, 같은 레포 안 실행가능→대기(병렬/직렬 lane
  +index), 병렬↔직렬·직렬↔직렬 이동, 레인 내 재정렬, 실행가능 섹션으로 끌어
  제거(`worker-queue-place/reorder/remove` + `root_dir` + CAS 1회 재시도),
  `dragstart`에 루트 `is-dragging`(빈 직렬 레인 펼침)·`dragend/drop` 해제.
  `[대기로 ↴]` 레인 메뉴·`↑↓✕`는 Worker 템플릿/CSS 조건 그대로(데스크톱 숨김),
  모니터 전용 `.mon-place__popover` 제거. 운영 버튼(일시정지/재개/폐기/실패
  닫기/머지/취소/revise 처분/🔗 연결/선행 ✕ 해제)은 현행 op·CAS 규약 유지.
  `▤ 세션` → 모니터 루트 하단 `createTranscriptDrawer` 1개, `open({ attempt_id,
  root_dir, meta })`. `transcript-drawer.js` `open()`에 `root_dir?` 추가 →
  `subscribe-session-log`·`get-attempt-prompt` payload에 실음(없으면 현행).
  `monitor-auto-toggle` UI 제거(서버 op 유지).
- **`app/main.js`**: 모니터 뷰 옵션에 `router`(gotoView)·`sessionLogStore`·
  드로어 마운트 전달; 기존 `ensureMonitorPipelineChannel` 등 전환 부작용 유지.
- **CSS (`app/styles.css`)**: `.mon-lanes` 3열 grid·모바일 가로 스와이프·
  `mon-*` 카드 규칙 제거; 모니터 전용 추가(레포 섹션 sticky 헤더, 체인 블록,
  의존 칩 두 색, 완료 3줄, 빈 직렬 레인 힌트/`is-dragging` 펼침, 실행 타일
  활동·위임 줄, 모바일 `.worker-lanes > .worker-pane--lane-*` order
  실행중→대기→실행가능→PR→완료) — 전부 `tokens.css` 변수만. §11.1 헤더 사용량
  리본 `≤640px` 전폭 두 행 블록(`.usage-meter-mount` flex-basis 100%/order,
  provider당 한 행, 막대 `flex:1 1 20px` 공유, 마크업 무변경).
- 기존 테스트 정리: `app/views/monitor/index.test.js`·`lanes.test.js`·
  `app/main.monitor.e2e.test.js`·`styles.*` 가드 중 삭제된 `mon-*` 템플릿을
  전제한 케이스는 새 DOM으로 옮기고, 사용자 가치가 같은 시나리오(CAS 재시도·
  revision 충돌·`monitor-auto-toggle` 제외)는 유지한다.

검증: RED→GREEN으로
`npm test -- app/views/monitor/lanes.test.js app/views/monitor/index.test.js app/views/monitor/blockers.test.js app/views/worker/lanes.test.js app/views/worker/running-grid.test.js app/views/worker/transcript-drawer.test.js app/main.monitor.e2e.test.js app/styles.worker-theme.test.js`
(+ 새 CSS 가드 `app/styles.monitor-theme.test.js`), 이어서 `npm run tsc` ·
`npm test` 전체 · `npm run lint` · `npm run prettier:write` · `npm run build`
(번들·소스맵 커밋 포함). 수동: `BDUI_FRONTEND_MODE=live bdui start --host
127.0.0.1 --port 3001`로 1440/1600px 5레인·레포 섹션·드래그·ID 복사·레포 배지
이동·실행 타일 진행 상세·체인 블록, 390px(실기기 또는 iframe) 스택 순서·
`대기로 ↴`/`↑↓✕` 노출·사용량 리본 두 행·가로 스크롤 없음, Worker 탭 렌더
불변(스크린샷 비교).

Phase 2 봉인 기준: 모니터가 Phase 1 필드를 소비해 스펙 §3·§5–§8·§11의 화면을
그리고 데크 자리만 비어 있으며, Worker 탭 DOM/CSS 회귀 없음, 전체 검증 녹색,
번들 갱신 커밋. parent 브랜치에 누적.

## Phase 3: 레포 데크·실행 설정 pane — 슬롯 레일·스위치·모델 칩·⚙·포커스 필터

실행: delegated

작업 내용 (스펙 §4):

- **`app/views/settings-dialog/execution-pane.js` 추출**:
  `createExecutionPane(mount_element, binding)` — 다이얼로그 `실행` 탭의 상태·
  렌더·저장 로직(세션 기본값 draft/baseline·warnings, orchestration draft·
  runtime filter, preset diff/apply, slots)을 `index.js`에서 옮기고 자동화
  섹션(자동화/머지/자동 해결 토글, 동시 실행, 직렬 레인)을 추가. `binding =
  { root_dir: string|null, queue: () => QueueLike|null, transport,
  implPresetStore, notify }`; `root_dir`이 문자열이면 pane이 보내는 모든 op
  (`get/set-session-defaults`·`worker-queue-set-orchestration-defaults`·
  `worker-queue-set-slots`·`worker-queue-set-serial-lane-count`·
  `worker-automation-toggle`·`worker-merge-auto-toggle`·
  `worker-auto-repair-toggle`·`apply-impl-preset-global`)에 `root_dir` + 그
  레포 revision CAS 1회 재시도; `null`이면 현행 payload 그대로. pane 내부는
  id 대신 클래스·`data-*`만(인라인 두 번 마운트 가능). 반환 `{ load(),
  render(), destroy() }`. `createSettingsDialog`는 `실행` 탭 영역에 이 pane을
  마운트(`queue: () => queueStore.get()`, `root_dir: null`) — 기존
  `settings-dialog/index.test.js` 시나리오 보호.
- **`app/views/monitor/deck.js`** `createRepoDeck(mount, options)`: 소스
  `workspaces_state[]`(+ `workspaces[]`의 `done[]`로 기간 완료 수). 합계 칸
  (`실행 n · 대기 n · PR n · <기간> 완료 n` + `Claude τ`·`Codex τ`,
  `crossRepoTokenTotal` 재사용, 상세 툴팁; 마스터 토글 없음). 활성 타일
  (`counts.running||queue||pr_wait||runnable > 0`): 레포명·`Worker ↗`·슬롯
  레일(`▮`=running, 점선=빈 칸)·`n/슬롯 실행 · 대기 n · PR n`·`▶/⏸ 자동화`·
  `🔀 머지`·`⚙`·오케/워커 exec 칩(`resolveExecutionSettings`에 `session_defaults`
  +orchestration을 `global`로; **`execution_defaults`·`runner_catalog`·
  `session_defaults` 중 하나라도 행에 없으면(구버전 서버) 칩 줄 자체를 생략** —
  `기본값 확인 불가` 행을 만들지 않는다, 스펙 §12, plan review finding 5). 조용한 레포는 기본 접힌 `▸ 파이프라인 없음 N`
  토글(키 `beads-ui.monitor.deck` `{ quiet_open }`) → pill(레포명·레일·
  `▶/⏸`·`🔀`·`⚙`·`↗`). 스위치 = `worker-automation-toggle`/
  `worker-merge-auto-toggle` + `root_dir` + revision CAS 재시도. 타일 클릭 =
  포커스 필터(루트 `has-focus` + 섹션/카드/타일 `is-focus`, `Esc`·재클릭 해제,
  세션 메모리; 해당 레포가 visible에서 빠지면 해제). `⚙` = 데크 아래 패널에
  `createExecutionPane(binding{ root_dir, queue: () => 그 레포 workspaces_state
  행 })` 마운트, 다른 `⚙` 클릭 시 `destroy()` 후 재마운트, ✕로 닫기.
  `role=button tabindex=0` Enter/Space.
- **`app/views/monitor/index.js`**: Phase 2가 남긴 `.mon2-deck` 컨테이너에
  데크 마운트, 포커스 필터 클래스 적용, `workspaces_state` 구독 전달.
- **CSS**: 데크·타일·슬롯 레일·pill·설정 패널·포커스 흐림(`opacity .38`
  `saturate(.6)`, 타일 `.55`)·모바일(데크 세로 스택, 타일 strip 가로 스크롤,
  패널 1열) — `tokens.css` 변수만.

검증: RED→GREEN으로
`npm test -- app/views/settings-dialog/index.test.js app/views/settings-dialog/execution-pane.test.js app/views/monitor/deck.test.js app/views/monitor/index.test.js app/main.monitor.e2e.test.js app/styles.monitor-theme.test.js`,
이어서 `npm run tsc` · `npm test` 전체 · `npm run lint` ·
`npm run prettier:write` · `npm run build`(번들·소스맵 커밋 포함). 수동: ⚙로
다른 레포(연결 workspace ≠ 대상)의 orchestration 모델·impl runtime을 바꾼 뒤
그 레포 Worker 탭 ⚙에서 같은 값 확인, 연결 레포의 kv 불변 확인(`bd kv get
workflow_session_defaults --json`), 타일 스위치 토글 → 그 레포 Worker 탭 헤더
반영, 포커스 필터·`Esc`, 조용한 레포 토글 기억, 모바일 데크 스와이프.

Phase 3 봉인 기준: 데크·설정 pane이 스펙 §4대로 동작하고 Worker/Board ⚙
다이얼로그가 같은 pane으로 회귀 없이 동작, 전체 검증 녹색, 번들 갱신 커밋.
최종 Phase이므로 landing 힌트 없이 누적 → Delivery.

## Test scope

Phase별 RED→GREEN 시임(새 테스트는 기존 파일 패턴·vitest·jsdom을 따른다):

- Phase 1
  - `app/utils/transcript-lines.test.js`: reducer `push` 누적 결과 ==
    `parseTranscript`(기존 fixture 전부), Codex `command_execution` 투영.
  - `server/worker/session-log.test.js`: `lastActivity` 갱신(Claude tool_use→
    tool_result 짝 결과 요약·assistant, Codex agent_message/command_execution,
    delegation monitor), thinking 무시, 160자 절단, bd 쓰기 명령 **완료**
    관측 → `onBeadWrite` 콜백, 파서 예외·malformed 이벤트 뒤 기존
    `last_activity` 유지·`last_event_at` 갱신 계속.
  - `server/worker/title-cache.test.js`: `workflow` 레코드, `expire` 후
    refill, `refreshFromIssue` 경유.
  - `server/worker/runtime.test.js`·`server/worker/attach.test.js`(또는
    `bd-metadata.test.js`): `createSessionLog`에 `onBeadWrite`가 전달돼
    `titleCache.expire`를 부른다 / metadata 쓰기 readback이
    `titleCache.refreshFromIssue`로 흐른다.
  - `server/worker/runnable-cache.test.js`: `workflow`·`exec_pins` 투영,
    enrich 실패 `null`.
  - `server/ws.worker-queue.test.js`: `bead_workflow` partial, RUNNING overlay
    `last_activity`/`legs`(비실행 attempt 없음).
  - `server/ws/worker-handlers.session-log.test.js`: `subscribe-session-log`·
    `get-attempt-prompt` `root_dir` 대상 workspace, 부재 시 현행.
  - `server/ws/monitor-handlers.test.js`: `workspaces_state` 확장 필드·`counts`
    배타 집계(실행 중 중복 없음·직렬 포함·runnable), `session_defaults` async
    fill → push 예약(첫 빈 스냅샷 뒤 채워진 스냅샷), 무효화.
  - `server/ws/session-defaults-handlers.test.js`·
    `server/ws/exec-preset-apply.test.js`: `root_dir` 검증(`bad_request`)·cwd
    전달·부재 시 불변; 연결 레포 A에서 `root_dir=B` preset apply 시 B의
    queue·kv만 바뀌고 A 불변.
- Phase 2
  - `app/views/monitor/lanes.test.js`: 레포 섹션(빈 섹션 생략·순서·빈 큐 섹션은
    후보 있을 때만·헤더 `● 자동`/`○ 수동`·빈 직렬 레인 힌트/1개뿐이면 생략),
    필터 3종·정렬 3종(`최신 수정(레포 무시)`는 섹션 없는 평면 DOM 순서)·섹션
    건수, 선행/후속 칩 파생(역방향·
    위치 표기·레인 밖 후속 생략), 연결 체인(2노드 이상·같은 직렬 레인 제외·
    분기·사이클), exec 칩 `pinned_only`, 완료 3줄, 실행 타일 `monitor` 옵션
    매핑(끝난 위임 접기), 구버전 payload fail-quiet.
  - `app/views/monitor/index.test.js`·`app/main.monitor.e2e.test.js`: ID 클릭
    복사(상세 안 열림), 레포 배지 → `switchWorkspace`+`gotoView('worker')`,
    드래그 place/reorder/remove 좌표(실행 중으로 빠진 버드 포함)·`is-dragging`,
    `▤ 세션` 드로어 `root_dir`, CAS 충돌 1회 재시도, `monitor-auto-toggle` UI
    부재.
  - `app/views/worker/lanes.test.js`·`running-grid.test.js`: 옵션 없는 호출의
    DOM 불변(스냅샷), 옵션 있는 호출의 추가 줄.
  - `app/styles.monitor-theme.test.js`(신설): `.mon-lanes` 3열/스와이프 규칙
    부재, 모바일 order 규칙 존재, `.usage-meter__track { display: block }`
    ≤640 블록 존재, 새 블록 raw hex 없음.
- Phase 3
  - `app/views/settings-dialog/execution-pane.test.js`: `root_dir` null →
    payload 불변, 문자열 → 열거된 모든 op에 `root_dir` + CAS 재시도, 자동화
    섹션 토글/slots/직렬 레인, `destroy()` 후 리스너·타이머 없음.
  - `app/views/settings-dialog/index.test.js`: 기존 시나리오 유지(pane 마운트
    경유).
  - `app/views/monitor/deck.test.js`(신설): 활성/조용 분류(runnable 포함), 슬롯
    레일, 합계(기간 완료 수·토큰), 구버전 `workspaces_state`(확장 필드 부재)에서
    모델 칩 줄 생략·나머지 타일 정상, 스위치 op + `root_dir` + CAS, 포커스 필터
    토글/`Esc`/visible 이탈 해제, 조용한 레포 토글 기억, `⚙` pane 마운트·교체·
    destroy.

제외: 스케줄러·큐 스토어 테스트 변경 없음(계약 불변), blocker 정정(§10,
착지 완료), `monitor-auto-toggle` 서버 테스트 유지(op 존속), E2E 브라우저
자동화(수동 확인으로 대체).

## Delivery

- 세 Phase 누적 후 `.worktrees/UI-eey2` 브랜치에서 non-empty PR 하나를
  `origin`(`nakkulla/beads-ui`) `main`으로 연다. 소스·테스트·`app/protocol.md`·
  `app/main.bundle.js`·`app/main.bundle.js.map` 포함. `resolved`+`pr_url` 기록,
  완료 보고서(`## 🤖 작업 보고서`) 작성, worktree 보존, 머지 전 정지.
- 머지 후 런타임 반영은 `repo-ops/config.toml` `[deploy]`(`repo-ops/script/
  deploy`, 공유 서비스 재시작)가 소유한다 — 별도 대화형 단계 없음
  (`worker-ineligible` 불필요). 머지 후 healthz `source_sha`·모니터 탭 실물
  확인은 pr-finish 단계의 검증이다.
