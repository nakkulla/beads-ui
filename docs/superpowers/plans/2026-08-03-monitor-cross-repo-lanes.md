# 모니터 탭을 전체 레포 워커 통합 관제로 전환 (UI-qrfo)

## Context

모니터 탭(UI-nprg)은 전체 활성 레포의 워커 파이프라인을 한 화면에 모으지만 **읽기
전용**이다. 단계별로 행을 나열할 뿐이고, 무엇을 실행할지·자동화를 켤지 끌지는 전부
Worker 탭에서 레포를 하나씩 바꿔가며 해야 한다. 게다가 집계 payload에는 **아직
실행되지 않은 후보가 아예 없어서**, "spec 리뷰가 끝나 지금 실행할 수 있는 이슈"는
모니터에서 보이지 않는다. 토큰·비용 지표도 없다.

이 작업은 모니터를 Worker 탭의 **크로스 레포 상위집합**으로 만든다. 사용자가 확정한
설계는 하이브리드 레인 — 통합 레인이되 대기 레인만 레포별 그룹으로 나누고, 그 그룹
헤더가 그 레포의 workspace 단위 제어를 싣는다. 대기 큐·슬롯·자동화가 레포마다
독립이기 때문이다.

- 승인된 스펙: `docs/superpowers/specs/2026-08-03-monitor-cross-repo-lanes-design.md`
  @ `4b5ec0d11fff6aac9f683cd21e217a024fd4ee8e` (spec 게이트 `codex@4b5ec0d`)
- Worker 탭은 유지한다 — 단일 레포 심층 작업(후보 필터·정렬, 트랜스크립트 드로어)의
  자리다. 기간 select와 토큰 KPI는 Worker 탭에 **이미 있으므로 건드리지 않고**,
  모니터를 같은 어휘(`app/data/closed-range.js`)에 맞춘다.

Phase 1과 Phase 2는 서로 독립이다 — 어느 쪽만 머지해도 각각 동작하고 각각 검증된다
(전자는 읽기 전용 모니터가 데이터를 더 받을 뿐, 후자는 Worker 탭이 `root_dir`
선택 필드를 안 보낼 뿐). 이것이 `full_plan` 승격의 근거다. 두 Phase가 같은 파일을
쓰지 않도록, runnable 캐시 무효화는 `worker-handlers.js`(Phase 2가 고치는 파일)가
아니라 `server/worker/queue-events.js`의 `onQueueChanged`를 monitor-handlers가 직접
구독해 건다.

## Phase 0: 스펙 정정 + 영수증 갱신 (실행 진입 전)

계획 검토에서 승인된 스펙의 두 곳이 구현 불가능함이 드러났다. 실행을 시작하기
전에 스펙을 고친다 — 실행 중에 고치면 영수증 갱신 경로가 닫힌다.

1. **§4 집계 payload 구조** — `workspaces_state` 항목에 `revision`과 `exec_defaults`를
   더한다. 파이프라인이 빈 workspace는 무거운 배열에 없으므로, 그 레포의 그룹 헤더가
   CAS 제어(자동 진행 · 자동 머지 · 슬롯 · 실행 기본값) 넷을 보내려면 **그
   workspace의 현재 revision**이 있어야 하고, 실행 기본값 다이얼로그는 현재
   `exec_defaults` 값을 그려야 한다. 5필드로는 빈 레포 제어가 성립하지 않는다.
   두 값 모두 `queue-store.js`의 `Queue`에 이미 있다(`revision`, `exec_defaults`:
   `Record<string, string>`) — 새 상태를 만드는 것이 아니라 이미 있는 것을 싣는다.
2. **§4 무효화 경로** — "큐 mutation 후 무효화"를 `onQueueChanged` 구독으로 구체화한다.
3. **§9 파일 표** — 전송 경로 3파일을 추가한다: `server/ws/context.js`(envelope
   직렬화), `app/main.js`(payload → store), `app/data/monitor-pipeline-store.js`
   (두 값 보관). 이들이 없으면 `workspaces_state`가 서버에서 만들어져도 UI에
   도달하지 않는다.

정정 후 커밋 · 게시(fetch → ff-only → push → `ahead == 0`)하고, 이 delta를
self-review해 `spec_review`를 `self@<new-sha>`로 갱신한다(같은 `bd update`에 notes
lineage와 actor binding, readback). delta는 localized · deterministic이며 승인된
의도를 바꾸지 않고 **실현 가능하게 만드는** 정정이다.

검증: `git show --stat`으로 정정 커밋이 스펙 1파일인지 · `ahead == 0` · `bd show
UI-qrfo --json`의 `spec_review`가 새 SHA인지.

## Phase 1: 집계 확장 — runnable + workspaces_state (서버 → store 전송 경로 포함)

`server/worker/runnable-cache.js` (신규)를 `server/worker/title-cache.js` 패턴으로
만든다: 동기 읽기 + 비동기 fill + `setOnFilled` 콜백, `now`/TTL/`runJson` 전부 주입
가능. title-cache와 달리 **workspace 단위**로 캐시한다 — `bd list --status open
--limit 1000 --json` 한 번이 그 workspace 전체를 답하고 `metadata`까지 실려 오므로
`bd show` 추가 호출이 없다(실측 144ms). 성공 TTL 30초, 실패 TTL 60초.

판정 조건은 스펙 §4 그대로다. 영수증 정규식은 `server/worker/admission.js`의
`ADMISSION_RECEIPT_RE`와 **같은 값**을 써야 한다 — 두 곳이 다르면 표시와 실행이
어긋난다. phase child 판정은 `app/views/worker/index.js` `isPhaseChild()`와 같다.

`server/ws/monitor-handlers.js`:
- `buildMonitorPipeline()`에 `runnable` 추가, `hasPipeline()` 판정에 `runnable` 포함
  (빠지면 실행 대기 후보만 있는 레포가 통째로 사라진다)
- `done`의 `startOfLocalDay()` 필터와 그 export 제거 (기간 선택이 클라이언트로 간다)
- payload에 `workspaces_state` 배열 추가 — 모든 visible workspace의
  `{ root_dir, name, auto_advance, auto_merge, slots, revision, exec_defaults }`.
  파이프라인이 비어 있어도 싣는다(마스터 토글 분모 + 빈 큐 레포 그룹 헤더의 CAS
  제어가 이것을 요구한다)
- **주기 driver**: 구독자가 1명 이상인 동안 `poll_interval_seconds`(기본 30초)마다
  refill + push, 마지막 구독자가 떠나면 정지. `server/poller.js` `createPoller()`가
  "클라이언트가 있을 때만 틱 + `unref()`" 패턴을 이미 갖고 있으니 그것을 쓴다.
  이것이 없으면 큐가 조용한 동안 fill이 영영 걸리지 않는다.
- **무효화**: `server/worker/queue-events.js`의 `onQueueChanged`를 여기서 직접
  구독해 해당 workspace의 `runnable`을 버린다. `worker-handlers.js`의 mutation
  지점에 거는 것이 자연스러워 보이지만 그러면 Phase 2와 같은 파일을 쓰게 되어 두
  Phase가 write-independent하지 않게 된다. `onQueueChanged`는 실제 큐 변경에만
  발화하므로(title fill의 `fanout`과 달리) 과도 무효화도 없다.
- 캐시 인스턴스는 `server/worker/runtime.js`에 둔다 (`titleCache`와 같은 자리)

**전송 경로**(Phase 0 §3): `server/ws/context.js`의
`emitMonitorPipelineSnapshot()`이 지금은 `workspaces` 배열 하나만 직렬화하므로
`workspaces_state`를 envelope에 더하고, `app/main.js`의
`monitor-pipeline-snapshot` 핸들러와 `app/data/monitor-pipeline-store.js`가 두 값을
함께 보관하도록 넓힌다. 이 세 곳을 빠뜨리면 서버가 만든 `workspaces_state`가 UI에
도달하지 않는다.

검증: `npx vitest run server/worker/runnable-cache server/ws/monitor-handlers` 통과 +
`npm run tsc` + 실제 WebSocket envelope → store 전달이 테스트로 확인됨.

## Phase 2: 서버 mutation 경로 — workspace 지정 + 마스터 토글

`server/ws/workspace-target.js` (신규) `targetWorkspaceOf(ws, payload)`:
`payload.root_dir`가 절대 경로면 `path.resolve()` 후 `getAvailableWorkspaces()`
허용 목록과 대조하고, 목록에 없으면 `null`(호출자가 `bad_request`). 없으면 기존
연결 workspace로 폴백. 검증 규약은 `server/ws/workspace-handlers.js`
`handleSetWorkspace()`와 같다.

`server/ws/worker-handlers.js`의 mutation 핸들러 **17개 전부**에서
`workspaceKeyOf(ws)`를 이 헬퍼로 교체한다 (`worker-queue-place` ·
`worker-queue-reorder` · `worker-queue-toggle` · `worker-queue-set-slots` ·
`worker-queue-set-exec-default` · `worker-queue-remove` · `worker-attempt-pause` ·
`worker-attempt-stop` · `worker-attempt-resume` · `worker-attempt-dismiss` ·
`worker-merge-queue-add` · `worker-merge-queue-add-all` · `worker-merge-auto-toggle` ·
`worker-merge-queue-remove` · `worker-pr-discard` · `worker-revise-fix` ·
`worker-revise-approve`). 새 액션 이름을 만들지 않으므로 Worker 탭은 페이로드를
바꾸지 않아도 그대로 동작한다.

`monitor-auto-toggle` 핸들러 (`monitor-handlers.js`, 페이로드 `{ on }`):
- 두 축 모두 **사용자 mutation 경로**를 쓴다 — `toggleAutoAdvance(workspace, …)`와
  `toggleAutoMerge(workspace, …)`에 **서버가 읽은 현재 revision**을 넣는다.
  `setAutoAdvance()`는 스케줄러가 실패 시 정지에 쓰는 무조건 API라 사용자 명령이
  그것을 빌려 쓰면 두 경로의 의미가 섞인다. 클라이언트 CAS 전제만 없애는 것이지
  CAS 자체를 우회하지 않는다
- 첫 토글이 revision을 올리므로, `toggleAutoMerge`에는 `toggleAutoAdvance` 결과의
  **갱신된 revision**을 넣는다 (처음 읽은 값을 두 번 쓰면 두 번째가 충돌한다)
- 부수효과 재현: ON은 각 workspace에 `tickWorkerQueue(key)` 발화, OFF는
  `clear_waiting: true` + `keep: <현재 active>`로 한 번의 쓰기
- 레포별 결과 집계 → `{ applied, failed: [{ root_dir, reason }] }`, 완료 후 push 1회
- `server/ws/connection.js` 라우팅 + `app/protocol.js` `MessageType` 추가

검증: `npx vitest run server/ws/workspace-target server/ws/monitor-auto-toggle
server/ws/worker-handlers` 통과 + `npm run tsc`.

## Phase 3: 클라이언트 레인 재작성

`app/views/monitor/lanes.js` (신규):
- 레인 빌더 — 배타 우선순위 `running > pr_wait > queue > runnable > done`
- 대기 레인의 레포 그룹 분할. 그룹은 `workspaces_state`를 돌며 만들므로 **큐가 빈
  레포에도 헤더가 렌더된다**(자동 진행이 꺼져 큐가 빈 레포가 바로 그 상태를 풀어야
  하는 레포다). 순번은 그룹 안에서만 매긴다
- 그룹 헤더 4제어: `▶/⏸`(auto_advance) · `🔀`(auto_merge) · 슬롯 · 실행 기본값
- 상단 바: 마스터 토글(`3/4` 부분 상태) · 전체 카운트

`app/views/monitor/index.js` 재작성: 레인 렌더, mutation 전송(카드가 속한
workspace의 `root_dir` + 그 workspace의 revision, CAS 충돌 시 1회 재시도), 마스터
토글 OFF의 확인 다이얼로그(머지 대기열을 전 레포에서 비우므로).

템플릿은 `app/views/worker/lanes.js`의 `paneTemplate`/`miniRow`/`candidateCard`를
그대로 쓴다. 레포 뱃지를 위해 `MiniItem`에 선택 필드 `workspace_name`/`root_dir`을
더하고, 값이 없으면 뱃지를 그리지 않게 해 Worker 탭 렌더를 그대로 둔다.

`app/views/monitor/row.js`와 `row.test.js`는 제거하고, `index.test.js`의
`buildSections` 테스트는 `lanes.test.js`로 옮긴다. `app/styles.css`에 모니터 레인 ·
그룹 헤더 · 상단 바 스타일.

완료 레인은 이 Phase에서 **기간 필터 없이** 전체를 그린다 — 기간 상태는 Phase 4가
들여오므로, 여기서 기간별 필터를 검증하려 하면 Phase 3 검증이 독립적으로 green일
수 없다.

검증: `npx vitest run app/views/monitor` 통과 + `npm run lint`.

## Phase 4: 기간·토큰 합계 + 통합 마감

기간 select는 `app/data/closed-range.js`의 `CLOSED_RANGE_OPTIONS`/`closedRangeSince()`를
그대로 쓴다(기본 `today`, localStorage 키 `bdui.monitor.done-range` — Worker 탭
키와 분리해 두 탭이 서로 다른 기간을 볼 수 있게). 상단 바에 두는 이유는 이 기간이
완료 레인과 토큰 KPI **둘 다**를 지배하기 때문이다. 완료 레인 제목도 기간을 말한다.

토큰·비용 합계는 Worker 탭 `token_total`과 **같은 산식**을 전 레포로 확장한다 —
4개 usage 필드 누적, 보고되지 않았으면 합계를 그리지 않음, **합산 대상 전부가
비용을 보고했을 때만** `$` 표시, 툴팁도 같은 문구("선택 기간에 완료된 이슈들이 생애
전체에 쓴 토큰 누적 … 이 기간에 소모된 양이 아니다"). 다른 산식을 쓰면 같은 레포에
대해 두 탭이 다른 숫자를 말한다.

마감은 스펙 §12의 순서를 그대로 따른다: 소스 편집 완료 → `npm run build` →
`app/main.bundle.js`와 `.map`을 **같은 PR에** 커밋 → **그 상태에서** `npm run all`
(tsc/lint/prettier/test). 검증이 build 이전 상태를 보면 최종 산출물이 검증을 받지
못한다. 머지 후 재시작·검증은 워커 sweep의 verify·deploy 단계가 소유하므로
(`[worker.verify]`/`[worker.deploy]`, `detached=true`) 수동 절차를 따로 두지 않는다.

검증: 번들이 커밋에 포함된 상태에서 `npm run all` green.

## Test scope

RED → GREEN 시임 (스펙 §11이 시임 권한):

| 시임 | 파일 | Phase |
| --- | --- | --- |
| 판정 조건 필터 · TTL 만료 · 실패 TTL · **`onQueueChanged` 발화 시 해당 workspace 무효화** · **구독자 0에서 cache-read가 `runJson`을 호출하지 않음** | `server/worker/runnable-cache.test.js` (신규) | 1 |
| 주기 driver — 큐 이벤트 없이 fake clock만 진행해도 refill+push, 마지막 구독 해제 시 정지, 구독자 0에서 미틱 | `server/worker/runnable-cache.driver.test.js` (신규) | 1 |
| 집계에 `runnable` 적재 · `done` 미절단 · **`runnable`만 있는 workspace 잔존** · `workspaces_state`가 빈 레포까지 포함하고 `revision`·`exec_defaults`를 실음 · hidden 제외 | `server/ws/monitor-handlers.test.js` (확장) | 1 |
| **envelope → store 전달** — `emitMonitorPipelineSnapshot()`이 `workspaces_state`를 직렬화하고 클라이언트 store가 그것을 보관 | `server/ws/monitor-handlers.test.js` + `app/main.monitor.e2e.test.js` (확장) | 1 |
| 허용 목록 밖 경로 거부 · 상대 경로 거부 · `root_dir` 부재 시 폴백 · `..` 포함 경로 resolve 후 대조 | `server/ws/workspace-target.test.js` (신규) | 2 |
| 전 visible 적용 · hidden 제외 · 부분 실패 보고 · **ON의 tick 발화** · **OFF의 `clear_waiting`+`keep`** · **두 번째 토글이 갱신된 revision을 씀** | `server/ws/monitor-auto-toggle.test.js` (신규) | 2 |
| 17개 액션 **table-driven** — `root_dir` 적용/미적용/거부 | `server/ws/worker-handlers.workspace-target.test.js` (신규) | 2 |
| 배타 우선순위 · 레포 그룹 분할 · 그룹별 순번 · **빈 큐 레포의 그룹 헤더** · **빈 레포 그룹의 CAS 제어가 그 workspace revision을 씀** | `app/views/monitor/lanes.test.js` (신규) | 3 |
| **기간별 완료 필터 · `added_at` 없는 엔트리 제외** | `app/views/monitor/lanes.test.js` (확장) | 4 |
| 전 레포 토큰 합계 · 일부만 비용 보고 시 `$` 미표시 · 미보고 시 합계 미표시 · 기간 변경 시 합계 변경 | `app/views/monitor/usage.test.js` (신규) | 4 |
| 카드 클릭이 올바른 `root_dir` 전송 · 마스터 OFF 확인 다이얼로그 · 기간 select 지속성 · 그룹 헤더 4제어의 액션 전송 | `app/main.monitor.e2e.test.js` (확장) | 4 |

단일 mutation 테스트는 나머지 16개 핸들러의 `workspaceKeyOf` 잔존을 잡지 못하므로
table-driven이 필수다.

제외:
- 실제 `bd` 프로세스 연동 — `runJson` 주입으로 mock (title-cache 테스트와 같은 패턴).
  실제 CLI 왕복은 이 유닛이 바꾸는 계약이 아니다.
- 실제 `bdui-shared restart` — 워커 deploy 단계가 소유하고 `detached=true`로 발사되며,
  이 유닛이 그 경로를 바꾸지 않는다.
- Worker 탭의 기간·KPI 동작 — 이미 목표 동작을 갖고 있어 변경 대상이 아니다.

## 실행 방식

- Phase 0: main (승인된 스펙의 계약 정정 + 영수증 갱신 — 게이트 판단이라 위임 불가)
- Phase 1: opus 위임 (캐시 설계 + 집계 계약 변경, 전송 경로까지 교차 파일 판단)
- Phase 2: opus 위임 (17개 기계적 교체는 단순하나 마스터 토글의 revision 순서가 판단)
- Phase 3: opus 위임 (대규모 뷰 재작성 + 템플릿 공유 경계)
- Phase 4: sonnet 위임 (기존 산식·기간 어휘 복제) — 마감 검증은 main

각 Phase 경계에서 controller가 `git diff` · 위임 결과 · `git status` · 해당 검증을
직접 확인한다.
