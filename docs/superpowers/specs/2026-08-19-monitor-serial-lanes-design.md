# 모니터 직렬 레인 정합과 cross-repo 직렬 진행 설계 (UI-2gi1)

- 작성일: 2026-08-19
- 상태: spec gate REVISE(blocking 3) 전건 반영, controller self-review 완료
- Bead: `UI-2gi1`
- route: `spec_backed`
- 목업: `~/tmp/mockups/2026-08-19-monitor-serial-lanes.html` (tailnet mockup service)
- 관련: UI-04vo(직렬 레인), UI-qrfo(모니터 집계), UI-ki09(후보 필터)

## 1. 문제

모니터 탭 집계는 직렬 레인(`serial_lanes`)을 어느 경로에서도 처리하지 않는다.
표시 이전에 정합성 결함이 두 개 있고, 표시 자체가 없으며, 레포를 가로지르는
직렬 진행(선행 이슈가 close될 때까지 후행을 재우는 것)은 성립하지만 화면에서
보이지도, 만들 수도 없다.

1. **실행가능 재노출 (실사고 경로)**: `server/ws/monitor-handlers.js`
   `lanedBeadIds()`가 `queue`/`pr_wait`/`done`만 제외해, 직렬 레인에서 대기
   중인 버드가 모니터 실행가능 레인에 다시 나타난다. 거기서 [대기로 ↴]를
   누르면 `worker-queue-place`가 원 레인에서 제거 후 병렬 큐 맨 뒤로 옮겨
   직렬 적재가 조용히 풀린다.
2. **레포 증발**: 같은 파일 `hasPipeline()`이 `serial_lanes`를 세지 않아,
   직렬 레인만 차 있는 레포는 모니터 집계에서 레포째 빠진다.
3. **미표시**: `app/views/monitor/lanes.js` `buildLanes()`가 `serial_lanes`를
   소비하지 않는다. 스냅샷에는 `serial_lanes`·`lane_states`·`bead_blocked_by`가
   이미 실려 온다(`app/protocol.md` worker-queue-snapshot 절).

## 2. 검증된 전제

설치된 bd fork(1.2.0-fork.1, 1.1.0-fork.3+ 계보)의 foreign issue dependency
계약(`bd-usage` references):

- `bd dep add <local> <foreign-id>`는 쓰기 시점에 foreign 대상을 검증한다
  (부재 대상, 미지/중복 prefix, non-server 모드 거부).
- `bd ready`는 foreign 이슈가 **closed**될 때까지(`resolved`로는 안 풀림)
  소비자를 제외한다.

스케줄러는 디스패치 직전 `bd ready`를 재판독하고 blocked head는
`not_ready:<status>` 배지를 달고 대기하므로(`scheduler.js runPass`),
cross-repo 직렬 대기는 **스케줄러 변경 없이** 성립한다. 후행 버드는 자기
레포의 레인에서 기다리고, 선행이 close되면 다음 재판독에서 자동 출발한다.
bd 의존 그래프가 유일한 중계자다.

## 3. 설계 원칙

- 레포 간 공유 직렬 레인은 만들지 않는다. 큐 스토어·스케줄러·CAS revision·
  레인 점유가 전부 workspace 단위다. **레포 안 순서 = 그 레포의 직렬 레인
  (topo 자동 교정), 레포 간 순서 = bd foreign `blocks` 엣지.**
- blocked 적재를 막지 않는다. 판정은 `bd ready`에 위임하고, 위험(미적재
  blocker, 교차 대기)은 표시로 드러낸다 — fail-visible.
- 신규 ws op 없음. 프로토콜 변경은 기존 표면의 추가 필드 둘뿐이다 —
  `dep-add`/`dep-remove` payload의 선택적 `root_dir`(§6.6),
  `workspaces_state`·runnable projection의 판정/표시 필드(§6.1·§6.3). 레인
  표시 자체는 스냅샷 기존 필드(`serial_lanes`/`lane_states`/`bead_blocked_by`)
  재사용.
- Worker 탭과 같은 사실은 같은 소스로 같은 문구로 그린다(lane_states,
  blocked 숨김 토글 규약).

## 4. 범위 1 — 집계 제외 집합 결함 수정

`server/ws/monitor-handlers.js`:

- `lanedBeadIds(snapshot)`: `serial_lanes[].entries[].bead_id`를 제외 집합에
  포함한다.
- `hasPipeline(snapshot)`: `serial_lanes` 중 entries가 비어 있지 않은 레인이
  하나라도 있으면 파이프라인 있음으로 판정한다.

두 함수 모두 `serial_lanes` 부재(구버전 스냅샷)에서 기존 동작과 동일해야
한다(fail-quiet).

## 5. 범위 2 — 대기 레인 직렬 서브레인 표시 + 레인 선택 적재

### 5.1 투영 (`app/views/monitor/lanes.js`)

- `buildLanes()`가 각 workspace의 `serial_lanes`·`lane_states`를 소비한다.
- 배타 우선순위 확장: `running > pr_wait > (병렬 queue ∪ 직렬 lanes) >
  runnable > done`. `claimed` 집합에 직렬 멤버를 포함한다.
- 전 레포 합산 `queue` 배열(=KPI '대기'와 pane count의 소스)에 직렬 멤버를
  포함한다. 실행 중으로 빠진 버드는 기존 배타 규칙대로 대기 수에서 제외된다.
- `MonitorQueueGroup`에 서브레인 구조를 추가한다:
  `sublanes: { parallel: MonitorItem[], serial: Array<{ id: 's1'..'s5',
  index: number, items: MonitorItem[], occupied_by: string|null,
  corrections: number, cycle: boolean }> }`. 기존 `items`(병렬)는 호환을 위해
  유지하되 렌더는 `sublanes`를 쓴다.
- 직렬 카드의 `lane`은 `'s1'..'s5'`, `queue_position`/`queue_index`/
  `queue_length`는 소속 레인 기준.
- 실행 중 카드에 소속 직렬 레인 칩: 그 버드가 어떤 `serial_lanes[].entries`에
  들어 있으면 lane id를 `serial_lane_id`로 실어 카드에 작은 칩으로 그린다.

### 5.2 렌더 (`app/views/monitor/index.js` + `lanes.js` 템플릿)

- 레포 그룹 내부를 서브섹션으로: 병렬 + **비어 있지 않은** 직렬 레인만.
  모니터에는 드래그가 없으므로 빈 레인은 드롭 타깃으로 두지 않는다.
- 직렬 레인 헤더에 lane_states 투영: 점유 중
  (`● 점유 중 · <bead> (머지까지 유지)`), 순서 자동 교정 N건(배지),
  사이클(`⛔ 의존 사이클 — 자동 교정 불가`).
- 카드 조작은 기존 op 재사용: 레인 내 ↑/↓ = `worker-queue-reorder`(lane
  인자), 적재 = `worker-queue-place`(lane `'s1'..'s5'`). CAS
  `expected_revision`은 기존 그룹 헤더 규약 그대로.

### 5.3 [대기로 ↴] 레인 선택 팝오버

- 실행가능 카드의 [대기로 ↴] 클릭 시 팝오버를 연다: 첫 항목 병렬(현행과
  같은 "그 레포 병렬 큐 맨 뒤"), 이어서 설정된 직렬 레인(s1..sN;
  `serial_lane_count` 기준)을 점유·대기 수와 함께 나열. 직렬 선택 시 해당
  레인 맨 뒤에 적재(`place_index` = 그 레인 길이).
- 숨은 제스처(길게 누르기 등) 없이 클릭/터치 한 단계 추가로 동작한다.

### 5.4 비범위 (범위 2)

모니터에서의 레인 간 이동(대기↔직렬, 직렬↔직렬)은 이번 범위가 아니다 —
Worker 탭 드래그가 소유한다. 모니터는 적재 시 레인 선택과 레인 내 ↑/↓까지만.

## 6. 범위 3 — blocker 가시화 + '직렬로 연결' UX

### 6.1 실행가능 blocked 투영 (서버)

- `server/worker/runnable-cache.js` `RunnableItem`에 `blocked: boolean`,
  `blocked_by: string[]`(직접 blocks blocker id)를 추가한다. `blocked`는
  `workspace-snapshot-coordinator`가 이미 뽑는 `ready_explain`
  (`bd ready --explain --json`의 ready/blocked 배열)의 blocked 멤버십으로
  판정한다. `blocked_by`는 같은 coordinator 스냅샷에서 얻을 수 있는 직접
  blocks 엣지(explain 행이 blocker id를 실으면 그것, 아니면 행의
  dependencies 투영)로 파생하고, 어느 원천도 없으면 `[]`로 두어 칩만
  생략한다. `ready_explain`이 없는 경로(레거시 `bd list` fallback)에서는 두
  필드를 `false`/`[]`로 두고 표시를 생략한다(fail-quiet).
- qualify 판정 자체는 바꾸지 않는다 — blocked 후보도 목록에 남는 현행 유지.

### 6.2 blocked 숨김 토글 (클라이언트)

- 모니터 실행가능 레인에 Worker 후보 필터와 같은 규약의 토글: blocked 기본
  숨김, 토글 시 흐린 카드 + 🔒 칩으로 표시. localStorage 키는 모니터 소유로
  분리(`beads-ui.monitor.candidate-filter`).

### 6.3 blocker 위치 칩

- 대기(병렬·직렬)·실행가능 카드의 blocker id를 집계 payload에서 해석해
  칩으로 표시한다. 소스: 대기 카드는 스냅샷 `bead_blocked_by`, 실행가능
  카드는 §6.1 `blocked_by`.
- 위치 해석은 클라이언트 순수 함수: 전 workspace의
  running/pr_wait/병렬/직렬/실행가능/done을 스캔해
  `bead_id → { workspace_name, lane, position|state }` 맵을 만든다.
- **내부/외부 판정은 위치 맵 부재가 아니라 rig prefix로 한다** (spec gate
  finding 3): `workspaces_state`의 각 workspace에 `issue_prefix: string|null`
  을 추가한다. 서버가 그 workspace의 bd 설정에서 읽어 캐시하고, 조회 실패
  시 `null`(fail-quiet). blocker id의 prefix(`<PREFIX>-` 앞부분)가 어느
  visible workspace의 `issue_prefix`와 일치하면 **내부**, 어느 것과도
  일치하지 않고 모든 visible workspace의 prefix가 알려져 있으면 **외부**,
  prefix를 모르는 workspace가 하나라도 있으면 **판정 불가**다.
- 칩 표기:
  - 같은 레인 앞: 회색 칩 `🔒 <id> (같은 레인 앞)` — 정상 대기.
  - 위치 해석 가능: `🔒 <id> (<repo> · <lane> #<n>)` / `(실행중)` /
    `(PR 대기)` 등.
  - 내부인데 위치 맵에 없음: `🔒 <id> (미적재)` — §6.4 경고 대상.
  - 외부: `🔒 <id> (외부)` — 경고 없음(bd ready가 게이트).
  - 판정 불가: `🔒 <id> (위치 미확인)` — 중립 표시, 외부로 단정하지 않는다.
- `bead_blocked_by`는 partial cache다: 항목이 없으면 칩을 생략한다
  (fail-quiet). 칩은 표시 전용이며 스케줄링 입력이 아니다.

### 6.4 경고 2종 (표시 전용)

- **미적재 blocker**: §6.3 판정이 **내부**인 blocker가 위치 맵에서 done도,
  실행/PR 대기도, 어떤 대기 레인 멤버도 아니면 카드 아래에 경고 —
  `⚠ 선행 <id>가 어느 레인에도 없고 실행 중도 아님 — 수동 개입 전까지 이
  자리에서 정지`. '외부'는 경고 없음, '판정 불가'는 §6.3의 중립 표시만.
- **교차 대기(상호 정지)**: 레인 head 대기 그래프에서 사이클 감지. 노드는 전
  레포의 직렬 레인, 간선은 "레인 A의 head가 레인 B 소속 버드에 blocked"일 때
  A→B. 사이클에 낀 레인 헤더에 `⚠ 상호 정지 — <repo>·<lane>과 교차 대기`
  배지. 클라이언트 파생, 표시 전용.

### 6.5 '직렬로 연결' 검색 팝오버

- 진입점: 대기(병렬·직렬)·실행가능 카드의 🔗 버튼.
- 팝오버: 검색 입력 + 전 레포 후보 목록(id·제목·위치, 집계 payload의
  runnable/병렬/직렬/실행중/PR대기에서 수집; 자기 자신 제외) + 목록에 없는
  id 직접 입력 행.
- 선택/입력 확정 시 `dep-add { a: <카드 버드>, b: <선택 버드>,
  root_dir: <카드 버드의 레포> }`를 보낸다. 반영 경로는 §6.6의 refresh
  계약을 따른다.
- 같은 레포 쌍이면 이 엣지가 레인 topo 교정(`applyLaneBlocksOrder`)의
  입력이다. **단 topo 교정은 place/reorder 시에만 돌므로, 연결만으로는
  이미 적재된 레인의 순서가 고쳐지지 않는다** (spec gate finding 1):
  `dep-add`(root_dir) 성공 readback 후 `a`와 `b`가 그 workspace의 **같은
  직렬 레인**에 함께 있으면, 서버가 placement와 같은 edges 소스로 그 레인에
  `applyLaneBlocksOrder`를 재적용하고 스냅샷을 publish한다. 사이클이면
  기존 계약대로 순서를 바꾸지 않고 `cycle` fail-visible로 남는다. 다른 레포
  쌍이면 foreign 엣지가 그대로 cross-repo 게이트다. 두 경우 모두 SoT는 bd
  의존 그래프 하나다.
- 연결 해제: 🔒 칩의 ✕ → `dep-remove { a, b, root_dir }` (대칭).

### 6.6 `dep-add`/`dep-remove` op 확장 (서버)

`server/ws/mutation-handlers.js`:

- payload에 선택적 `root_dir: string`을 추가한다. 부재 시 현행과 동일
  (연결의 workspace). 존재 시:
  - 등록된 visible workspace의 root와 정확히 일치해야 한다. 불일치는
    `bad_request` 거부.
  - 기존 쓰기 게이트 `requireBdJsonCapabilityForWorkspace('write', root_dir)`를
    그 root로 통과한다.
  - `bd dep add|remove`와 readback(`bd show <a> --json`)을 `cwd: root_dir`로
    실행한다.
- `runBdInWorkspace`의 "모든 WS bd 쓰기는 한 문으로" 불변식을 지키기 위해,
  connection workspace 대신 명시 root를 쓰는 변형은 같은 파일의 같은 게이트를
  경유하는 하나의 진입점으로 만든다(별도 우회 경로 금지).
- **refresh 계약** (spec gate finding 2): `root_dir`가 connection workspace와
  다를 수 있으므로, `dep-add`/`dep-remove`(root_dir) 성공 시 기존
  `triggerMutationRefreshOnce(ws)`(connection workspace의 list 구독 갱신)에
  더해 **대상 root 기준으로**:
  1. 그 workspace의 runnable cache를 invalidate하고 refill을 큐잉한다
     (`blocked`/`blocked_by` 최신화, §6.1).
  2. 그 workspace의 worker-queue 스냅샷 재파생·publish를 트리거해
     `bead_blocked_by`와 §6.5의 레인 재교정 결과가 구독자에게 반영되게 한다.
  3. 모니터 집계 rebuild를 트리거한다(기존 queue-changed 관측 경로 재사용).
- `app/protocol.md`의 `dep-add`/`dep-remove` payload 문서와
  `workspaces_state`의 `issue_prefix` 필드(§6.3)를 같은 변경에서 갱신한다.

## 7. 에러 처리

- bd가 거부한 연결(부재 대상, 미지 prefix, non-server 모드)은 팝오버에 bd
  오류 문구를 그대로 표시하고 어떤 상태도 바꾸지 않는다.
- readback 실패는 기존 `bd_readback_failed` 규약 유지 — 쓰기는 이미
  반영됐으므로 재전송하지 않는다.
- `ready_explain`·`serial_lanes`·`lane_states`·`bead_blocked_by` 부재는 모두
  해당 표시 생략으로 수렴하고 레인 렌더 자체는 깨지지 않는다.
- `issue_prefix` 조회 실패는 그 workspace만 `null`로 남기고(§6.3), 해당
  판정은 '판정 불가' 분기로 수렴한다 — 오류를 외부/내부 어느 쪽으로도
  단정하지 않는다.
- 위치 칩·경고·사이클 감지는 스냅샷 사이의 경합으로 순간적으로 틀릴 수 있는
  표시 전용 파생값이다 — 다음 push가 고친다. 어떤 조작의 가드로도 쓰지
  않는다.

## 8. 테스트 계획

- `monitor-handlers` 단위: 직렬 레인 멤버가 실행가능 제외 집합에 포함된다 /
  직렬 레인만 찬 레포가 집계에 남는다 / `serial_lanes` 부재 스냅샷에서 기존
  판정 불변.
- `lanes.test.js`(monitor): 직렬 서브레인 투영(빈 레인 생략, lane_states
  배지), 배타 우선순위(직렬 멤버가 실행가능·완료에 중복 노출되지 않음), KPI
  대기 합산, 실행 중 카드의 레인 칩.
- `runnable-cache` 단위: `ready_explain` 기반 `blocked`/`blocked_by` 투영,
  부재 시 fail-quiet.
- `mutation-handlers` 단위: `root_dir` 일치 검증(미등록 root 거부), 게이트
  경유, `cwd` 전달, readback 경로. 부재 시 현행 동작 불변. **connection
  workspace ≠ 대상 root**인 경우의 refresh 계약(§6.6: runnable cache
  invalidate, worker-queue publish, 모니터 rebuild 트리거).
- 레인 재교정(§6.5) 단위: 같은 레인 역순 엣지 연결 후 순서가 교정되어
  publish된다 / 사이클 엣지는 순서 불변 + `cycle` fail-visible / 다른
  레인·다른 레포 쌍은 재교정을 트리거하지 않는다.
- 순수 함수 단위: blocker 위치 해석 맵, prefix 기반 내부/외부/판정 불가
  3분기(§6.3 — 직접 입력한 내부 미적재 blocker가 '외부'로 오판되지 않음),
  미적재 경고 판정, 레인 head 대기 그래프 사이클 감지.
- Pre-Handoff Validation 전체(`tsc`/`test`/`lint`/`prettier`/`build` +
  번들 포함).

## 9. 비범위

- 스케줄러 변경 없음(디스패치 판정 현행 유지). 큐 스토어는 §6.5의 레인
  재교정 진입점 추가 외 계약 불변(topo 교정 알고리즘·점유 계약 현행 유지).
- 레포 간 공유 직렬 레인 없음.
- Worker 탭 렌더 무변경(후보 필터·레인 렌더 현행 유지).
- 신규 ws op 없음(기존 `dep-add`/`dep-remove` payload 확장과 §3의 추가
  필드만).
- bd fork 수정 없음(foreign 게이팅은 검증된 현행 계약 소비).
- 모니터에서의 레인 간 이동 없음(§5.4).
