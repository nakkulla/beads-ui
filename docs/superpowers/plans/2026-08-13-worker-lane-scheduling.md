# Worker 대기 레인 스케줄링 재설계 구현 계획

## Context

- Bead: `UI-04vo` (route `full_plan`) · spec:
  `docs/superpowers/specs/2026-08-13-worker-lane-scheduling-design.md` @
  `3a8e1dd65fac67c3df7d99222da835845c130649` (spec_review
  `self@3a8e1dd6…`, impl_entry user-approved). 목업:
  `docs/superpowers/specs/assets/2026-08-13-worker-lanes/mockup.html`.
- 요지: 대기열을 **병렬 레인(기존 `queue` 배열) + 고정 슬롯 직렬 레인
  `serial_lanes[s1..s5]`(개수 dropdown, 기본 2)** 로 재구성한다. 직렬 레인은
  레인 범위 배타 체인 — 이전 항목 lineage가 **머지·정리 완료 또는 폐기**될
  때까지 다음 항목 대기(실패·orphaned·paused도 점유 유지, `dismissed_at`과
  무관), 레인끼리·병렬과는 동시, 전역 `slots` 캡만 공통. `worker-serial`
  라벨 소비·전역 뮤텍스·`pr_wait_holds_slot`·일괄 실행방식 라벨 UI는 은퇴.
  blocks 의존은 소비만(레인 내 topological 자동 정렬 + 표시 전용
  `blocked_by`). 병렬성 분석은 버튼 클릭 시에만 도는 read-only tool-free
  analyzer가 "직렬 그룹+순서"를 편집 가능한 초안으로 제안하고, 제출은
  digest·eligible 그룹·멤버·레인 재검증 후 큐 CAS 한 번(all-or-nothing)
  으로만 수렴한다(bd 무변경).
- 핵심 기존 코드 (탐색 확정):
  - `server/worker/queue-store.js`: `applyMutation`(CAS)/`applyUnconditional`
    (스케줄러 전용) 이중 경로, `normalizeQueue()`(L1708~)의
    `KNOWN_QUEUE_FIELDS`+legacy serial/parallel concat 마이그레이션,
    `Attempt.worker_serial`(L206)·`completion_root_id`(L204),
    `place`/`reorder`는 lane 인자 없음, `setPrWaitHoldsSlot`(L2966).
  - `server/worker/scheduler.js`: `serialCoordinator`(L419)·
    `serialLineageId`(L1692, `completion_root_id ?? bead_id`)·
    `activeSerialLineages`(L1705)·`workerSerialLaunchRefusal`(L1884)·
    lease(acquire/preflight/revalidate L1940~)·`rebuildPendingSerial`(L1811)·
    `dispatch()`(L3383)·`runPass()`(L6428, occupied 계산 L6479에
    pr_wait_holds_slot 분기)·`slotsOf`(L1538)·`failAttempt`(L2019,
    전역 `setAutoAdvance(false)` — 유지)·`reconcile`(L3318).
  - `server/worker/attach.js`: `snapshotBead`(L186~)가 `bd show --json`+
    `bd ready` 이진 판정, `deps: []` 하드코딩(L303) — blocks edge 소스는
    `bd show --json`의 `dependencies[].dependency_type === 'blocks'`.
  - `server/ws/`: 메시지는 `app/protocol.js`(typedef union L12 +
    `MESSAGE_TYPES` L38~) + `server/ws/connection.js` switch(L461~) +
    `worker-handlers.js` 핸들러/`decorateQueue`(L904)/`fanout`(L1458) 3중
    등록. `mutation-handlers.js:43-76 convergeWorkerSerialLabel`이
    worker-serial 특별 경로(제거 대상).
  - `app/views/worker/index.js`: drag 컨트롤러(L3504-3668, `data-lane`
    기반 onDrop 분기), `placeBead`/`reorderBead`(L1291~, CAS 1회 재시도),
    제거 인벤토리 — `selected_queue_ids`(1177)·`selected_execution_mode`
    (1179)·`execution_mode_pending`(1181)·`worker_serial_by_id`(1183,
    rebuild 2014-2056)·`applyExecutionMode`(1358-1435)·
    `executionModeControlsTemplate`(3187-3225, 호출 3365/3396)·체크박스
    핸들러(3718-3741)·`prWaitHoldHintTemplate`(3233-3276). 다이얼로그는
    `exec-defaults-dialog.js` 패턴(mount-once/open/close/destroy,
    store subscribe, showToast), store는
    `app/data/worker-queue-store.js` pub/sub 패턴 복제.
  - 테스트: `fakeBd`(scheduler.test.js:351-499)·`makeFakeRunner`(:243-344)·
    `makeFixtureSpawn`(runner/fixture-spawn.js)·`setup()`(:507-606)·
    e2e `buildSystem()`(server/e2e/worker-flow.test.js:212-307, 임시 git
    repo+XDG mkdtemp = disposable workspace 역할)·드래그 테스트는
    board/index.test.js의 `drop`/`dropOnCard` dataTransfer stub 패턴 이식.
- 계약: 레인 상태는 beads-ui 로컬(queue.json), Bead metadata/라벨 새 키
  없음. dotfiles `worker-serial` 계약 정정은 `dotfiles-9gon`(별도 unit)이
  소유. post-merge는 `docs/agents/repo-ops.toml` `[deploy]` managed
  adapter가 운반한다.
- 실행 메모: Claude 컨트롤러 기준 Phase 1·2·3·4·6·8은
  implementation_complex(opus leaf), Phase 5·7·9는
  implementation_bounded(sonnet leaf), Phase 10은 merge 후 finishing
  lane의 controller 작업. 각 phase 경계에 execution receipt 1개.

## Phase 1: queue-store 레인 스키마·마이그레이션

1. `normalizeQueue()`에 `serial_lanes`(길이==`serial_lane_count`, id
   `s1..s5` 고정, `normalizeLane` 재사용)와 `serial_lane_count`(1..5,
   기본 2) 정규화를 추가하고, `KNOWN_QUEUE_FIELDS` 갱신 +
   `pr_wait_holds_slot`을 legacy-drop 키로 이관, `emptyQueue()` 기본값
   반영. 단일 소속 invariant(병렬+전 직렬 레인에서 bead 정확히 한 곳)를
   정규화·mutator 공통 검증으로 추가.
2. `Attempt`에 `serial_lane_id: string|null` 필드 추가(`makeAttempt`
   정규화 포함). `worker_serial` 필드는 RETIRED 계열로 강등(legacy
   round-trip 보존, 신규 기록 없음). 마이그레이션에서 진행 중 legacy
   `worker_serial=true` attempt는 `serial_lane_id: null` 일반 attempt로
   정산.
3. lane-aware mutator: `place(workspace, {expected_revision, bead_id,
   lane?, index?})`·`reorder(..., lane, to_index)`를 병렬/직렬 공용으로
   확장(원 레인에서 제거 후 삽입), `setSerialLaneCount(workspace,
   {expected_revision, count})` 신설(축소 시 잘린 레인 대기 항목을 병렬
   레인 끝으로 복귀), `setPrWaitHoldsSlot` 제거. dispatch 쪽
   `applyUnconditional` 경로(`moveToPrWait`/`discardAttempt` 등)는 레인
   배열에서도 제거하도록 `removeFromLanes` 일반화.
4. blocks 보조: 직렬 레인 배치·재정렬 결과에 적용할 안정 topological 보정
   헬퍼(blocker→blockee, 사용자 순서 tie-break)를 순수 함수로 추가.
   반환은 `{order, corrections: [{bead_id, after}], cycle: boolean}` 형태로
   보정 원인과 cycle 상태를 결정적으로 노출한다(durable 저장 없음 —
   snapshot+edge에서 언제든 재계산 가능해야 한다). cycle이면 무보정.

검증: `npx vitest run server/worker/queue-store.test.js` — seam A와 seam
C의 topo-helper 슬라이스 RED→GREEN 포함 PASS.

## Phase 2: 스케줄러 레인 뮤텍스·blocks 소비

1. `attach.js` `snapshotBead`에 `bd show --json` `dependencies`에서
   `blocks` edge(blocker→blockee)와 표시 전용 `blocked_by`(직접 blocker
   ID 목록)를 채워 `deps: []` 하드코딩을 대체. scheduler·decorateQueue로
   전달되는 shape에 반영.
2. `activeSerialLineages`를 `activeLaneLineages(q)`로 일반화:
   `serial_lane_id`별 활성 lineage(≤1) 산출. 활성 = attempt가
   running/paused/**failed/orphaned**(`dismissed_at`과 **무관**)이거나
   bead가 `pr_wait`에 있거나 discard operation 진행 중. 해제 =
   `moveToDone`(머지·정리 완료)·`completeDiscardOperation`·
   `discardAttempt`의 terminal `discarded` 정산뿐 — dismiss는 UI 숨김일
   뿐 해제 조건이 아니다. 같은 lineage의 후속 attempt(`appendResumed*`/
   repair)는 `serial_lane_id` 상속.
3. `runPass()` 후보 스캔 재작성: 병렬 레인 ready 항목 + 점유 없는 각 직렬
   레인의 head(entries[0])가 ready일 때만 후보. `slotsOf` 단순화
   (`pr_wait_holds_slot` 분기 제거), occupied 계산에서 pr_wait 분기 제거.
   비-head·점유 중 head의 자동/수동 launch는 fail-visible 거부. 직렬
   head가 blocked면 레인 대기(대기 사유는 Phase 3에서 UI 노출).
   `dispatch()`는 attempt pre-record에 `serial_lane_id` 스냅샷.
4. worker-serial 소비 제거: `workerSerialLaunchRefusal`·serial pending
   fence(`rebuildPendingSerial`/`refreshPendingSerial`)·lease의
   worker_serial 축·`mutation-handlers.js`의 `convergeWorkerSerialLabel`
   제거. lease 구조는 레인 점유 예약(acquire→revalidate→handoff)으로
   개칭·유지. `failAttempt`의 전역 `setAutoAdvance(false)` halt와
   `reconcile`의 dead-attempt 정산은 그대로 두되 레인 점유 유지와 정합.

검증: `npx vitest run server/worker/scheduler.test.js
server/worker/attach.test.js` — seam B(dismissed failed/orphaned lineage가
폐기·정리 전까지 다음 head를 막는 케이스 포함)·seam C의 attach 슬라이스·
seam D의 스케줄러 슬라이스 RED→GREEN 포함 PASS.

## Phase 3: WS 프로토콜·Worker UI 레인

1. 프로토콜: `app/protocol.js`(typedef union + `MESSAGE_TYPES`)와
   `app/protocol.md`에 lane-aware `worker-queue-place`/`-reorder` payload,
   `worker-queue-set-serial-lane-count` 추가, `worker-queue-set-pr-wait-hold`
   제거. `server/ws/connection.js` switch·`worker-handlers.js` 핸들러를
   같은 패턴(검증→CAS→`replyMutation`→`fanout`)으로 확장.
   `decorateQueue`가 `serial_lanes`·레인 점유 상태·`blocked_by`에 더해
   **Phase 1 topo 헬퍼를 스냅샷마다 재실행해 레인별
   `corrections`/`cycle`을 결정적으로 파생**시켜 Worker/Monitor 공용
   스냅샷에 노출한다(저장 없음).
2. `app/views/worker/index.js`: drag 컨트롤러의 `data-lane` 분기를
   `parallel|s1..s5`로 확장하고 `placeBead(bead_id, lane, index)`/
   `reorderBead(bead_id, lane, to_index)`로 개편(CAS 1회 재시도 유지).
   `lanesTemplate`에 직렬 레인 카드 pane(`paneTemplate` 재사용,
   `data-lane=sN`, 순번·ghost 점유 행·빈 레인 점선 드롭 타깃)과 컨트롤
   바 `직렬 레인 [n ▾]` dropdown(축소 시 showToast 스낵바)을 추가.
   snapshot의 `corrections`/`cycle`/`blocked_by`에서 `🔗 <blocker> 뒤
   (blocks 자동)` chip·레인 cycle 경고·`⏸ <blocker> 완료 대기 (blocks)`
   대기 사유 chip을 렌더한다.
3. 은퇴 표면 제거: `selected_queue_ids`·`selected_execution_mode`·
   `execution_mode_pending`·`worker_serial_by_id`·`applyExecutionMode`·
   `executionModeControlsTemplate`·체크박스 change 핸들러·
   `prWaitHoldHintTemplate`·"머지까지 순차" 체크박스. `lanes.js`
   `MiniItem.lane` union 확장, `selectable`/`selected` 제거,
   `worker_serial` chip을 표시 전용 취소선 잔재로 축소
   (`app/utils/worker-serial.js`는 표시 전용으로 축소). CSS는 기존
   `worker-mini__*` 토큰 어휘로 목업과 정합.

검증: `npx vitest run app/views/worker/lanes.test.js
"app/views/worker/index*.test.js" server/ws.worker-queue.test.js` — seam
E·seam C/D의 UI 슬라이스(🔗 보정 chip·cycle 경고·대기 사유) RED→GREEN,
board의 dataTransfer stub 패턴으로 레인 drop 테스트 신설 PASS.

## Phase 4: 분석 target snapshot·artifact bundle (seam F)

1. `server/worker/parallel-analysis-targets.js`: runnable qualification
   재사용 target snapshot(+active lineage 문맥, 제외 규칙, snapshot
   digest)과 `state-paths.js` 확장(설정·캐시 경로).
2. `server/worker/parallel-analysis-bundle.js`: pinned blob collector
   (spec 필수, safe plan, exact tracked source refs, 안전 캡·omission
   manifest, temp dir cleanup).

검증: `npx vitest run server/worker/parallel-analysis-targets.test.js
server/worker/parallel-analysis-bundle.test.js` — seam F RED→GREEN PASS.

## Phase 5: 분석 결과 validator (seam I)

1. `server/worker/parallel-analysis-validator.js`: v2 스키마 —
   issues(`parallel_ok|uncertain`)+groups가 target 정확 분할, 그룹 서로소·
   `order`는 `members` 순열, evidence path/locator 검증, digest 일치,
   위반 시 전체 거부.
2. 그룹별 **submit 가능 판정을 검증 결과에 명시**: `eligible =
   confidence==='high' && strong category ≥1`을 validator가 판정해
   결과에 고정하고, 이후 서버 제출 경로·UI overlay/제출 버튼이 모두 이
   판정에만 바인딩되도록 단일 판정 함수로 노출한다.

검증: `npx vitest run server/worker/parallel-analysis-validator.test.js`
— seam I(weak group 제출 불가 판정 포함) RED→GREEN PASS.

## Phase 6: 분석 read-only runner·isolation (seam H)

1. `server/worker/parallel-analysis-runner.js`: tool-free
   structured-output adapter(Claude `--print --tools "" --safe-mode
   --strict-mcp-config --setting-sources user --no-session-persistence` /
   Codex 전용 transport), capability probe, process-group cancel·300s
   timeout, stdout strict-JSON.
2. isolation fixture 실측: tool 등록 요구·bundle 밖 경로 접근 payload의
   거부, Claude session persistence 차단, 전후 filesystem inventory로
   repository/config/session artifact 무변경, cancel/timeout 후 process
   group 종료.

검증: `npx vitest run server/worker/parallel-analysis-runner.test.js` —
seam H RED→GREEN PASS.

## Phase 7: 분석 settings·cache·job lifecycle (seam G)

1. `server/worker/parallel-analysis-store.js`: 설정
   (`parallel-analysis-settings.json`, CAS, catalog+probe 통과 model만)·
   workspace 캐시(last-good, identity digest)·single-flight job
   lifecycle(cancel/failure 시 last-good 보존, 서버 재시작 orphan idle
   정산).

검증: `npx vitest run server/worker/parallel-analysis-store.test.js` —
seam G RED→GREEN PASS.

## Phase 8: 분석 채널·다이얼로그·제출 (seam J)

1. `server/ws/worker-parallel-analysis-handlers.js` + connection.js/
   protocol 등록: subscribe/unsubscribe/snapshot/start/cancel/
   settings-update와 `worker-parallel-analysis-submit` — 서버가 last-good
   result에서 `group_index` 그룹의 **eligible 판정(Phase 5 함수)을
   재검증**하고 digest 일치·`ordered_bead_ids ⊆ members`(2개 이상)·멤버
   현재성·비활성 lineage·레인 유효성을 모두 통과할 때만 큐 CAS 한 번
   append+topological 보정으로 수렴(all-or-nothing 거부, bd 무변경).
2. `app/data/worker-parallel-analysis-store.js`(pub/sub 패턴)와
   `main.js` 채널 배선. 제출 클라이언트는 CAS conflict 시 **bounded 1회
   재시도**하며 재시도마다 서버의 전체 재검증을 다시 거치고, 두 실패
   모두 큐 무변경임을 테스트한다.
3. `app/views/worker/parallel-analysis-dialog.js`:
   exec-defaults-dialog 패턴 복제 — 설정/진행/취소/재분석, 그룹 카드
   편집 초안(⠿ 순서, ✕ 제외, 되돌리기), 제출 대상 레인 선택(기본 첫 빈
   레인)·[제출], `parallel_ok`/`uncertain` 요약, `✓ 이미 반영됨`·stale
   비활성. 컨트롤 바 `✳ 병렬성 분석` 버튼과 큐 행 추천 overlay chip —
   overlay와 제출 버튼은 **eligible 그룹에만** 활성화.
4. seam K의 e2e RED를 이 phase 말미에 작성:
   `server/e2e/worker-lanes-flow.test.js`(`buildSystem()` 확장 + fake
   tool-free runner + fakeBd)로 레인 배치→드래그 보정→분석 cache hit→
   초안 편집→제출→head dispatch→레인 점유 유지(실패 경로 포함) 전체
   흐름을 기술하고, 이 시점(마감 배선 전)에 실제로 실패함을 고정한다.

검증: `npx vitest run server/ws/worker-parallel-analysis.test.js
app/views/worker/parallel-analysis-dialog.test.js` — seam J(weak group
거부·1회 재시도·양 실패 무변경 포함) RED→GREEN PASS, seam K e2e는 RED로
고정.

## Phase 9: E2E green·번들·pre-handoff 마감 (seam K)

1. Phase 8의 e2e RED를 잔여 배선 완성으로 green으로 닫고, 일반 queue
   add/reorder/auto-advance 경로에서 **analyzer runner 호출 수가 0**임을
   같은 e2e에서 assert(LLM hot-path 부재).
2. 은퇴 심볼 부재 검사: `pr_wait_holds_slot`·`workerSerialLaunchRefusal`
   등이 **active runtime 소비 경로에 없는지** grep으로 확인하되,
   `normalizeQueue`의 legacy-drop 처리와 migration test는 허용 위치로
   제외한다.
3. `npm run build`로 `app/main.bundle.js`(+map) 재생성·포함, protocol.md
   최종 정합.

검증: `npm run tsc && npm test && npm run lint && npm run prettier:write
&& npm run build && git diff --check` 전부 PASS (seam K green 포함).

## Phase 10: Post-merge runtime 검증

1. PR merge 후(pr-finish 또는 beads-ui 머지 클릭 → managed `[deploy]`
   adapter 경로): merged checkout 기준 frontend bundle 최신성 확인,
   managed deploy receipt 확인. 코드 변경 없음 — finishing lane의
   controller 작업이다.
2. runtime readback: shared process가 merged release path에서 실행 중,
   configured port listening, 기본 HTTP 응답 성공(spec 완료 조건 8).
   실패 시 AGENTS.md의 수동 재시작·검증 절차로 복구한다.

검증: managed deploy receipt + process path·port·HTTP readback 3종 통과.

## Test scope

spec `## Test scope`(seam A~K)가 authority다. **seam 슬라이스별 RED는 그
슬라이스를 구현하는 phase 안에서 구현 직전에 추가**한다(이미 green인
assertion·vacuous RED 무효). 매핑: A→P1 · B→P2 · C→P1(topo helper)+
P2(attach edge)+P3(보정 chip·cycle 경고) · D→P2(스케줄러 대기)+P3(사유
노출) · E→P3(+P8 overlay chip) · F→P4 · I→P5 · H→P6 · G→P7 · J→P8 ·
K→P8에서 RED 고정, P9에서 green(analyzer 0-call assertion 포함). 제외:
동적 레인 생성, admission spec/review 검증 변경, blocks 외 dependency
type, anti-starvation 재설계, 실제 provider 과금 호출, 라벨 writer 경로.

## Non-goals / follow-ups

- dotfiles workflow 계약의 `worker-serial` 서술 정정: `dotfiles-9gon`
  (beads-ui 머지 후 별도 unit).
- 잔존 `worker-serial` 라벨의 일괄 정리 UX, 레인별 auto_advance 세분화,
  ordering-only 힌트 표시: 명시적 후속 제안으로만.
