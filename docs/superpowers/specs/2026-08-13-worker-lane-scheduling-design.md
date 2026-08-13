# Worker 대기 레인 스케줄링 재설계

- Bead: `UI-04vo` (재설계 — 기존
  `docs/superpowers/specs/2026-08-12-worker-parallelism-analysis-design.md`를
  대체한다)
- route: `full_plan`
- 선행 기능: `UI-nrut` (`worker-serial` 배타 실행과 일괄 설정·드래그 UI — 이
  설계가 그 표면의 상당 부분을 은퇴시킨다)
- 목업: `docs/superpowers/specs/assets/2026-08-13-worker-lanes/mockup.html`

## 배경

Worker 대기열은 과거 serial/parallel 2레인에서 단일 `queue` 배열 + 전역 `slots`
캡으로 단순화되었고, 그 위에 `worker-serial` 라벨이 전역 배타 뮤텍스(하나의
serial 이슈가 실행 중이면 다른 모든 launch 거부)로 얹혀 있다. 이 구조에는 두
가지 문제가 있다.

1. 배타성의 단위가 전역뿐이다. "1→2→3은 순차, 4→5→6도 순차, 두 체인은 서로
   병렬"처럼 충돌 그룹별로 독립 체인을 돌릴 방법이 없고, serial 이슈 하나가
   무관한 병렬 이슈까지 전부 멈춘다.
2. 직렬화 의도가 bd 라벨(`worker-serial`)에 실려 있어, 스케줄링 배치를 바꾸는
   일이 Bead 라벨 뮤테이션이 된다. 순서 조정·그룹 조정 같은 가벼운 스케줄링
   결정이 durable Bead 상태를 오염시킨다.

기존 UI-04vo 스펙(병렬성 분석)은 이 라벨 구조를 전제로 "어떤 이슈에
`worker-serial`을 붙일지"를 LLM이 제안하는 설계였다. 이번 재설계는 전제 자체를
바꾼다: 대기열을 병렬 레인 + 고정 슬롯 직렬 레인으로 재구성하고, 분석은 "어떤
이슈들을 어떤 순서로 같은 직렬 레인에 넣을지"를 편집 가능한 초안으로 제안하며,
수락은 큐 상태만 바꾼다.

## 사용자 확정 결정

- 대기 영역은 **병렬 레인(상단 고정) + 고정 슬롯 직렬 레인**으로 나눈다. 직렬
  레인 개수는 컨트롤 바 dropdown으로만 조절한다(기본 2, 1~5). 레인 생성·삭제·
  이름 관리 UI는 없다.
- 직렬 레인 = 레인 범위 배타 체인. 레인 안에서는 이전 항목이 **머지·정리 완료
  또는 폐기**될 때까지 다음 항목이 대기하고, 레인끼리·병렬 레인과는 동시
  진행하며, 전역 `slots` 캡만 공통 상한이다.
- `worker-serial` 라벨의 스케줄링 소비를 **은퇴**한다. 전역 뮤텍스, "머지까지
  단독" 일괄 설정 UI, 라벨 쓰기 경로를 제거하고 기존 라벨은 표시 전용 chip으로만
  남긴다. dotfiles canonical 계약의 정정은 별도 unit으로 제기한다.
- `pr_wait_holds_slot`("머지까지 순차 실행") 토글을 폐기한다. 머지까지 잡아두는
  의미는 직렬 레인의 기본 동작이 대체한다.
- `blocks` 의존성은 이슈 생성 시 에이전트가 거는 **강제** 순서다. 레인은 이를
  소비만 한다: 레인 내 자동 정렬, blocked 이슈의 큐 진입 허용과 ready 전환 시
  dispatch. 레인 UI에서 의존성을 만들지 않는다.
- 직렬화 자체는 **권고 수준**이다. 분석 추천은 편집 가능한 초안이고, 사용자가
  제출한 레인 배치가 유일한 직렬화 근거이며, 언제든 드래그로 되돌릴 수 있다.
- 대기 영역 인터랙션은 **드래그 앤 드롭 하나**다. 체크박스 다중 선택과 일괄
  실행 방식 dropdown은 제거한다.
- 병렬성 분석은 Worker 상단 버튼 클릭 시에만 실행되는 read-only 분석기다. 일반
  queue 적재·reorder·auto-advance는 LLM을 호출하지 않는다. 분석 model/effort는
  사용자가 설정하고, 결과 수락은 큐 상태(레인 배치)만 변경하며 bd 라벨·의존성·
  repository를 변경하지 않는다.

## 목표

1. 대기열을 병렬 레인 + N개 고정 직렬 레인으로 재구성하고, 레인당 활성 lineage
   1개의 배타를 스케줄러가 보장한다.
2. `blocks` edge를 큐 구성원 사이에서 수집해 직렬 레인 내 순서를 자동 정렬하고,
   blocked 이슈도 대기열에 앉아 ready 전환 시 실행되게 한다.
3. `worker-serial` 라벨 소비·전역 뮤텍스·라벨 쓰기 UI를 제거하고 마이그레이션
   한 번으로 정산한다.
4. 병렬성 분석을 "직렬 그룹 + 순서" 추천으로 재정의한다. 추천은 편집 가능한
   초안이고, 제출은 서버 재검증을 거쳐 큐 CAS로만 수렴한다.
5. 분석 비용은 명시적 버튼 클릭에만 발생시키고 동일 snapshot은 cache한다.
   analyzer는 Bead·큐·git·repository를 변경할 수 없다.

## 비목표

- 직렬 레인의 동적 생성·삭제·이름·자동 정리 (고정 슬롯 + 개수 dropdown뿐)
- `worker-serial` 자동 부여·제거, 라벨 어휘 자체의 재정의 (canonical 정의는
  dotfiles 소유 — 여기서는 소비 은퇴만)
- queue 적재 전 자동 LLM preflight, 자동 reorder, `blocks` dependency 자동 작성
- `parallel_safe` 보증 (추천 부재는 병렬 안전 보증이 아니다)
- merge_queue(순차 머지 드라이버)·admission의 spec/review 검증 의미 변경
- Beads CLI/schema 변경, persistent analyzer session, 다중 model voting
- spec/plan에 명시되지 않은 repository 전체의 자유 탐색

## 현재 기반과 재사용 경계

- `server/worker/queue-store.js`: 단일 `queue` 배열·`slots`·atomic write·정수
  `revision` CAS. `queue` 배열은 병렬 레인으로 무변경 재사용한다.
  `normalizeQueue()`의 레거시(serial/parallel v1) 마이그레이션 경로에 이번
  마이그레이션을 추가한다.
- `server/worker/scheduler.js`: `serialCoordinator`·`activeSerialLineages`·
  `workerSerialLaunchRefusal`·lease 프로토콜이 전역 뮤텍스를 구현한다. lineage
  식별(`completion_root_id ?? bead_id`)과 dispatch 시점 재검증 구조는 레인당
  뮤텍스로 일반화해 재사용하고, 전역 배타 판정은 제거한다.
- `server/worker/attach.js`: `bd show --json`/`bd ready` 기반 snapshot이
  `ready`/`blocked`만 계산하고 dependency edge를 버린다. `blocks` edge 수집을
  여기에 추가한다. `blocked`/`ready` 판정 자체는 계속 `bd ready`에 위임한다.
- `server/worker/admission.js`: route/spec/spec_review/base 검증은 유지한다.
  blocked 이슈의 큐 진입 거부만 완화한다(진입 허용, dispatch는 ready 전환 후).
- `app/views/worker/lanes.js`·`index.js`: `miniRow` 행 렌더·drag 컨트롤러를
  재사용한다. 체크박스(`worker-mini__select`)·일괄 실행 방식 dropdown
  (`executionModeControlsTemplate`, `applyExecutionMode`)·"머지까지 단독" 라벨
  쓰기 경로는 제거한다.
- `server/worker/runner-catalog.js`의 model/effort vocabulary와
  `server/ws/mutation-handlers.js`의 `worker-serial` 특별 처리: 전자는 분석 설정
  UI에 재사용, 후자는 제거한다.
- 기존 UI-04vo 스펙에서 승계하는 분석 코어: target snapshot, artifact bundle,
  tool-free read-only runner, analyzer 설정 store, cache/single-flight, strict
  validator, 별도 WS 구독 채널. 승계 경계는 §6~§9에 재서술하며, 이 문서가 유일한
  active 스펙이다.

## Architecture

### 1. 레인 데이터 모델

`queue.json`에 다음을 추가한다.

```js
{
  queue: QueueEntry[],          // 병렬 레인 (기존 필드 무변경)
  serial_lanes: [               // 길이 == serial_lane_count
    { id: 's1', entries: QueueEntry[] },
    { id: 's2', entries: QueueEntry[] }
  ],
  serial_lane_count: 2,         // 1..5, 기본 2
  slots: 2                      // 전역 동시성 캡 (기존)
}
```

- 레인 id는 순번 고정(`s1`..`s5`)이며 사용자 이름·메타가 없다. 배열 순서 =
  레인 표시 순서, `entries` 배열 순서 = 실행 순서다.
- 하나의 bead는 병렬 레인과 직렬 레인 전체에서 정확히 한 곳에만 존재한다
  (invariant, 서버 검증).
- 레인 수 축소 시 잘리는 레인의 대기 항목은 병렬 레인 끝으로 복귀한다(유실
  없음). 활성 lineage는 영향받지 않는다.
- attempt에 `serial_lane_id: string | null`을 dispatch 시점에 durable
  스냅샷한다(기존 `worker_serial` 플래그의 자리). 재시작 시 레인 점유는
  attempts·`pr_wait`·`discard_operations`의 lineage에서 재구성한다.

마이그레이션(`normalizeQueue` 1회):

- `serial_lanes`/`serial_lane_count` 기본값 추가.
- `pr_wait_holds_slot` 필드 폐기.
- 진행 중인 레거시 `worker_serial=true` attempt는 일반 attempt로 정산한다
  (전역 barrier 소멸; `serial_lane_id: null`).

### 2. 스케줄러 — 레인당 뮤텍스

- 각 직렬 레인은 활성 lineage(dispatch → 실행/일시정지 → `pr_wait` → 머지·정리
  완료 또는 폐기)를 **최대 1개** 가진다. 레인 점유 판정은 기존
  `activeSerialLineages`의 lineage 어휘(`completion_root_id ?? bead_id`)를 레인
  id 기준으로 일반화한 것이다.
- dispatch 후보: 병렬 레인의 모든 ready 항목 + 점유 없는 각 직렬 레인의 head
  (entries[0])가 ready인 경우. 전역 실행 중 attempt 수 < `slots`일 때만
  launch한다. `slots=1`이 전역 순차 override로 계속 동작한다.
- dispatch는 기존과 같이 항목을 대기 배열에서 제거한다. 이후 레인 점유는
  entries가 아니라 attempt의 `serial_lane_id` lineage가 이어받으며(§1), UI의
  ghost 행(§4)은 이 lineage에서 파생한다.
- 직렬 레인의 비-head 항목은 자동이든 수동이든 launch를 거부한다(fail-visible;
  먼저 드래그로 head로 올리라는 안내). 같은 레인 head라도 레인이 점유 중이면
  거부한다.
- blocked 항목(`bd ready` 미포함)은 큐에 앉아 있고 dispatch 후보에서 제외되며,
  ready 전환을 관측하면 후보가 된다. 직렬 head가 blocked면 레인은 대기하고 행에
  사유를 표시한다(레인 내부 원인은 자동 정렬이 제거하므로, 남는 대기는 레인 밖
  blocker에 의한 올바른 대기다).
- `worker-serial` 라벨은 스케줄링 판정에서 완전히 제거한다. 전역
  뮤텍스(`workerSerialLaunchRefusal`)·serial pending anti-starvation·라벨 변경
  시 스케줄러 재동기화(`mutation-handlers.js`의 특별 경로)를 함께 제거한다.
- `auto_advance` 재시작 시 강제 off, admission 재검증, lease 재검증 등 기존
  dispatch 안전 장치는 그대로 유지한다.

### 3. blocks 통합

- `attach.js` snapshot에 큐 구성원 간 직접 `blocks` edge를 추가한다. 소스는
  `bd show --json`의 `dependencies`이며 `dependency_type === 'blocks'`만
  스케줄링 신호다. edge 방향은 blocker → blockee. 큐 구성원 밖의 blocker는
  edge로 들지 않고 기존 `ready`/`blocked` 이진 판정으로만 반영된다.
- 직렬 레인 배치·드래그·분석 제출 시 서버가 레인 내 순서를 검증한다: blocker가
  blockee보다 앞이어야 한다. 위반 순서는 사용자 순서를 최대한 보존하는 안정
  topological 보정(사용자 순서 tie-break)을 적용하고, 보정이 일어난 항목에
  UI가 `🔗 <blocker> 뒤 (blocks 자동)` chip을 표시한다.
- 순환 edge를 관측하면(bd가 정상적으로는 막는다) 자동 정렬을 생략하고 해당
  레인에 경고를 fail-visible로 표시한다.

### 4. Worker UI

컨트롤 바: `▶ 자동 진행 · ⇥ 일괄 머지 · 슬롯 [n] · 직렬 레인 [n ▾] ·
✳ 병렬성 분석 · ⚙`. "머지까지 순차 실행" 체크박스는 제거한다.

대기 영역(목업 참조):

- **병렬 대기** 섹션이 항상 맨 위. 기존 queue 행 렌더를 유지하되 체크박스를
  제거하고, blocked 행에 `⏸ <blocker> 완료 대기 (blocks)` chip, 분석 추천
  overlay가 있는 행에 `✳ serial 권장 · <대상>와` chip을 표시한다.
- **직렬 레인 카드**가 그 아래 `serial_lane_count`만큼 고정 표시. 카드 헤더는
  `직렬 N` + 점유 상태 배지(`① 실행 중 · 점유` / `PR 대기 · 점유` / `대기`),
  본문은 ①②③ 순번 행. 실행 중(또는 pr_wait) head는 흐린 ghost 행으로 남아
  점유를 보여준다. 빈 레인은 점선 접힌 카드("비어 있음 — 행을 여기로
  드래그")로 고정 위치 드롭 타깃이 된다.
- 인터랙션은 ⠿ grip 드래그 하나: 병렬 ↔ 직렬 이동, 직렬 간 이동, 레인 내 순서
  변경. 체크박스·일괄 dropdown·"머지까지 단독" chip 쓰기 UI는 제거한다. 기존
  `worker-serial` 라벨이 남아 있는 행은 표시 전용 취소선 chip으로만 보여 준다
  (fail-quiet 잔재 표기; 라벨 정리는 사용자/워크플로 몫).
- 레인 수 dropdown 축소로 항목이 병렬로 복귀할 때는 스낵바로 알린다.

### 5. WebSocket 프로토콜

큐 계열(모두 `expected_revision` CAS, 실패 시 클라이언트 1회 재시도 유지):

- `worker-queue-place { bead_id, lane?: 'parallel' | 's1'..'s5', index?,
  expected_revision }` — 신규 진입과 레인 간 이동을 겸한다(서버가 원 위치에서
  제거 후 삽입). `lane` 생략은 parallel.
- `worker-queue-reorder { bead_id, lane, to_index, expected_revision }`
- `worker-queue-set-serial-lane-count { count, expected_revision }` (1..5)
- 제거: `worker-queue-set-pr-wait-hold`
- `worker-queue-snapshot`이 `serial_lanes`·`serial_lane_count`·blocks edge
  요약·추천 overlay 여부를 포함한다.

분석 계열(§9): `subscribe-worker-parallel-analysis` /
`unsubscribe-worker-parallel-analysis` / `worker-parallel-analysis-snapshot` /
`-start { force? }` / `-cancel { job_id }` /
`-settings-update { expected_revision, runner, model, effort }` /
`worker-parallel-analysis-submit { snapshot_digest, group_index, lane:
's1'..'s5', ordered_bead_ids, expected_revision }`.

### 6. 분석 target snapshot (승계)

한 번의 분석은 registered workspace identity, target base ref/커밋 SHA, sorted
target Bead IDs, 각 Bead의 title·route·native-first `spec_id`·`plan_path`·
직접 dependency·현재 레인, 각 artifact의 target-base blob OID/byte length,
prompt schema version을 immutable snapshot으로 고정한다.

기본 target set은 runnable qualification(open top-level parent,
`spec_backed|full_plan`, native-first `spec_id`, 유효한 `spec_review`,
`worker-ineligible` 부재)을 통과한 이슈 전체이며, 현재 큐·running/paused
attempt·durable `pr_wait`의 completion root를 비교 문맥으로 합친다. active
lineage는 분석에 포함하되 제출 대상이 아니다. closed/phase child/`quick_fix`/
spec conflict/`worker-ineligible`/spec authority 부재는 제외한다. 레인 배치와
live 라벨은 semantic digest에 들어가지 않는 적용 가능성 overlay다.

### 7. Artifact bundle과 read-only runner (승계)

- collector는 pinned commit의 blob만 읽는다(`git cat-file` 동등). spec 필수,
  `full_plan`의 safe `docs/**.md` plan 추가, 문서가 명시한 workspace-relative
  tracked path만 보조 수집. absolute path·`..`·symlink escape·untracked·
  `.git/**`·credential pattern·size/count 캡 초과는 제외하고 omission reason을
  manifest에 남긴다. bundle은 전용 임시 디렉터리에 materialize하고 종료 시
  제거한다.
- runner는 implementation runner와 별도의 tool-free structured-output
  adapter다: 모델 request에 filesystem/shell/network/MCP tool을 하나도 등록하지
  않고 bundle 전체를 stdin/request body로 전달한다. Claude는 `--print`,
  `--tools ""`, `--safe-mode`, `--strict-mcp-config`, `--setting-sources user`,
  `--no-session-persistence` 고정, Codex는 tool 선언이 빈 analyzer 전용
  structured-completion transport만 허용한다. capability probe 실패 runner는
  fail-visible 제외하고 자동 fallback하지 않는다. process group cancel과 300초
  timeout, stdout strict-JSON 소비, stderr 비저장(capped diagnostic code만)을
  유지한다.
- 문서 내용은 untrusted data다. 문서 안 지시 무시를 system prompt에 고정하고,
  격리는 자기보고가 아니라 capability probe·exact argv·종료 후
  repository/config/session artifact diff로 실측한다.
- analyzer 설정은 `$XDG_STATE_HOME/bdui/parallel-analysis-settings.json`
  (`{ revision, runner, model, effort }`, CAS)이며, catalog와 capability probe를
  모두 통과한 exact model/effort만 저장할 수 있다. 미설정 시 버튼은 `분석 모델
  설정 필요`를 표시하고 process를 띄우지 않는다.

### 8. 결과 스키마 v2와 검증

```js
{
  schema_version: 2,
  snapshot_digest: string,
  issues: [
    { bead_id: string, verdict: 'parallel_ok' | 'uncertain', reason: string }
  ],
  groups: [
    {
      members: string[],            // 서로소, target set 부분집합, 2개 이상
      order: string[],              // members의 순열
      confidence: 'high' | 'medium' | 'low',
      categories: string[],         // strong category enum
      reason: string,
      evidence: [
        { path: string, artifact_kind: 'spec' | 'plan' | 'source',
          locator: string }
      ]
    }
  ]
}
```

- `serial 권장`으로 표시·제출 가능한 그룹은 `high` confidence이면서 strong
  category(`shared_mutable_state` · `schema_or_migration` · `canonical_contract`
  · `shared_deploy_surface` · `exclusive_external_resource`) 1개 이상을 가진
  그룹뿐이다. 같은 repo·같은 area·일부 파일 overlap만으로는 strong이 아니다.
- server validator: enum/shape, `issues`와 `groups`가 pinned target 전체를
  정확히 분할(모든 target이 정확히 한 곳에, 중복·누락·추가 없음), 그룹 서로소,
  `order`가 `members`의 순열, evidence path가 bundle manifest에 존재, locator가
  pinned content에 존재, `snapshot_digest` 일치. 하나라도 어기면 전체 result를
  거부하고 약한 verdict를 승격하지 않는다.

### 9. Cache·job lifecycle·다이얼로그·제출

- cache는 `$XDG_STATE_HOME/bdui/<workspace-slug>/parallel-analysis.json`,
  identity는 workspace·target base SHA·sorted target IDs·artifact blob OIDs·
  dependency snapshot·runner/model/effort·prompt version의 digest다. 동일
  identity 재클릭은 cache hit, `재분석`은 우회하되 새 성공 전까지 last-good을
  보존한다. workspace당 active job 1개(single-flight join), 서버 재시작 시
  orphan job은 idle 정산 — 모두 승계.
- 다이얼로그: analyzer model/effort와 설정 버튼, 대상 수·pinned base short
  SHA·분석 시각·cache/stale 표시, 진행/취소, `재분석`. 결과는 그룹 카드
  목록이며 각 카드는 판정·confidence·category·**편집 가능한 초안**(⠿ 순서
  드래그, ✕ 멤버 제외, 제안으로 되돌리기)·사유·evidence·제출 대상 레인
  선택(`제출: [직렬 N ▾]`, 기본 첫 빈 레인)·[제출]로 구성된다. 하단에
  `parallel_ok`/`uncertain` 요약을 표시한다. 현재 레인 배치와 이미 일치하는
  그룹은 `✓ 이미 반영됨`으로 표시한다.
- running/paused/`pr_wait` 멤버는 카드에 문맥으로만 표시하고 초안에서 제외한다.
  target set 이탈·artifact 변경은 stale로 표시하고 제출을 비활성화한다.
- 제출 처리: 서버는 (1) `snapshot_digest`가 last-good result와 일치하는지,
  (2) `group_index`가 result의 serial 권장 그룹을 가리키고 `ordered_bead_ids`가
  그 그룹 `members`의 부분집합(2개 이상)이며 각 id가 현재 큐/레인에 존재하고
  active lineage가 아닌지, (3) 대상 `lane`이 현재 `serial_lane_count` 안의 직렬
  레인인지 검증한 뒤, 큐 CAS 한 번으로 항목들을 대상 레인으로 이동한다. 배치는
  기존 entries 뒤에 제출 순서대로 append하며 blocks 자동 정렬(§3)이 최종
  우선이다. **bd 라벨·의존성·repository는 변경하지 않는다.** 부분 실패는 실패
  항목만 남기고 성공 항목은 유지한다.
- 추천 overlay chip(§4)은 last-good result에서 파생하며 snapshot 갱신마다 stale
  판정을 다시 계산한다.

## Error handling

- target 0건: process를 띄우지 않고 `분석 가능한 이슈 없음` 표시.
- base/spec read 실패: snapshot 생성 중단, 기존 cache 보존.
- plan/source 누락: omission 기록 후 관련 판정을 `uncertain`으로 제한.
- 비호환 model/effort: spawn 전 거부, 설정 화면 안내.
- timeout/cancel: process group 종료 실측, 새 cache 미기록.
- invalid output/evidence: 전체 result 거부, 큐/레인 영향 없음.
- snapshot drift: result stale 표시, 제출 비활성, 재분석 안내.
- 제출 CAS 충돌: 최신 revision으로 1회 재시도(기존 패턴), 재실패는
  fail-visible.
- blocks cycle: 자동 정렬 생략 + 레인 경고.
- 레인 수 축소: 잘린 레인 항목 병렬 복귀 + 스낵바.

## Security boundaries

- analyzer 입력은 exact pinned blob으로 만든 sanitized bundle뿐이다. live
  repository·untracked·config·credential 경로는 포함하지 않는다.
- 모델 request에 tool을 하나도 제공하지 않으며, tool-free capability가 없는
  provider는 실행 전에 거부한다. Claude adapter는 session persistence를 끄고
  종료 후 config/session 경로 무변경을 fixture에서 실측한다.
- artifact text의 prompt injection은 data로만 취급한다. model stdout은 strict
  schema/evidence 검증 전에는 UI result나 큐 mutation source가 아니다.
- 제출 경로는 큐 상태만 변경한다. Bead·라벨·의존성·git·repository 파일은 어떤
  경로로도 변경하지 않는다.

## 계약 경계

- `worker-serial` 라벨 어휘의 canonical 정의는 dotfiles
  `docs/contracts/workflow.md`가 소유한다. 이 설계는 beads-ui의 **소비 은퇴**만
  수행하고 어휘를 재정의하지 않는다. 계약 문서의 `### Worker serial execution`
  (queue barrier·durable snapshot·lineage·release 의미론)과 "beads-ui Worker가
  유일한 기계 소비자"라는 서술의 정정은 dotfiles 별도 unit이 소유한다(핸드오프
  시 dotfiles rig에 Bead 생성).
- 레인 배치·순서는 beads-ui 로컬 스케줄링 상태(queue.json)이며 workflow 계약
  표면이 아니다. Bead metadata·라벨에 새 키를 도입하지 않는다.

## Test scope

| Seam | RED | GREEN | 제외 |
| --- | --- | --- | --- |
| A — queue-store 레인 스키마 | serial_lanes·count·단일 소속 invariant·축소 복귀·`pr_wait_holds_slot` 폐기가 한 경계에 없음 | v(n+1) normalizeQueue, CAS mutator(place/reorder/count), invariant 검증, 레거시 worker_serial attempt 정산 | 동적 레인 생성 |
| B — 스케줄러 레인 뮤텍스 | 전역 뮤텍스 제거 후 레인당 배타·head-only dispatch·점유 재구성을 보장하는 경계가 없음 | 레인당 활성 lineage ≤ 1, head-only·비-head 거부, slots 캡 병행, 재시작 재구성, worker-serial 판정 제거 | anti-starvation 재설계 |
| C — blocks edge·자동 정렬 | dependency edge가 snapshot에 없고 레인 순서가 blocks를 위반할 수 있음 | attach의 blocks edge 수집, 안정 topological 보정(사용자 순서 tie-break), cycle fail-visible | blocks 외 dependency type, edge 자동 작성 |
| D — admission blocked 진입 | blocked 이슈가 큐에 들어올 수 없거나 무검증으로 실행될 수 있음 | 진입 허용 + dispatch에서 ready 재검증, 사유 노출 | spec/review 검증 완화 |
| E — Worker UI 레인 | 레인 카드·드래그 이동·ghost 점유·빈 레인 드롭 타깃·체크박스 제거가 표시와 어긋날 수 있음 | lane 카드 렌더, grip 드래그(병렬↔직렬·순서), 축소 스낵바, 추천/blocked/legacy chip | 체크박스·일괄 dropdown 부활 |
| F — 분석 snapshot/bundle | 승계 seam: dirty worktree·secret path·directory 확장 유입 | pinned blob reader, 안전 캡, omission manifest, temp cleanup | repository archive |
| G — 분석 settings/cache/job | 승계 seam: 설정·freshness의 durable owner 부재, 중복 process | CAS settings, per-workspace cache, exact identity, single-flight, last-good 보존, orphan idle | Bead metadata hint |
| H — read-only runner | 승계 seam: write-capable 또는 live-read runner 재사용 위험 | stdin-only bundle, tool-free probe, no-persistence, escape 차단 실측, timeout/cancel | implementation runner 변경 |
| I — 결과 v2 검증 | malformed/분할 위반/비서로소 그룹/fabricated evidence 표시 위험 | exact-partition invariant, 그룹 서로소·순열, strong verdict 게이트, locator 검증 | 자유 prose parser |
| J — 제출 handler | digest·멤버·레인 무검증 제출이 큐를 오염할 수 있음 | digest 일치, 멤버 현재성·비활성 lineage, 레인 유효성, CAS 이동, 부분 실패 보존, bd 무변경 실측 | 라벨 writer 경로 |
| K — disposable workspace E2E | 레인 드래그→분석→편집→제출→dispatch 흐름이 수동 확인에만 남음 | fake tool-free runner + fixture Beads로 레인 배치, 분석 cache hit, 초안 편집, 제출, head dispatch 순서를 PR 안에서 자동 검증 | 실제 provider 호출 |

이미 green인 assertion이나 snapshot-only golden은 RED를 대신하지 않는다. 각
seam은 focused unit/integration test를 먼저 추가하고 구현 후 green으로 닫는다.

## Verification

Focused verification:

```bash
npx vitest run \
  server/worker/queue-store.test.js \
  server/worker/scheduler.test.js \
  server/worker/attach.test.js \
  server/worker/parallel-analysis-targets.test.js \
  server/worker/parallel-analysis-bundle.test.js \
  server/worker/parallel-analysis-store.test.js \
  server/worker/parallel-analysis-runner.test.js \
  server/worker/parallel-analysis-validator.test.js \
  server/ws/worker-parallel-analysis.test.js \
  app/views/worker/parallel-analysis-dialog.test.js \
  app/views/worker/lanes.test.js
```

Repository verification:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
git diff --check
```

runner isolation은 argv assertion으로 끝내지 않는다: tool registration 요구·
bundle 밖 경로 접근 payload로 tool-free 거부를 실측하고, 전후 filesystem
inventory로 repository/config/session artifact 무변경을 확인한다. pre-handoff
검증에는 seam K의 disposable workspace E2E를 포함한다.

## Post-merge 적용과 runtime 검증

`docs/agents/repo-ops.toml` `[deploy]` managed adapter가 install·pointer
cutover·restart handoff·runtime readback을 소유한다. merge 후 frontend bundle
최신 확인, managed deploy receipt 확인, shared process의 merged release
path·port·HTTP 응답 readback만 검증한다. 기능 검증은 seam K가 PR 안에서
소유하므로 post-merge 수동 기능 확인이나 no-PR residue는 완료 조건이 아니며
`worker-ineligible` 라벨도 필요하지 않다.

## 예상 구현 범위

- `server/worker/queue-store.js` (레인 스키마·마이그레이션·mutator)
- `server/worker/scheduler.js` (레인 뮤텍스, worker-serial 판정 제거)
- `server/worker/attach.js` (blocks edge 수집)
- `server/worker/admission.js` (blocked 진입 완화)
- `server/worker/parallel-analysis-{targets,bundle,store,runner,validator}.js`
- `server/ws/worker-handlers.js`, `server/ws/worker-parallel-analysis-handlers.js`
- `server/ws/mutation-handlers.js` (worker-serial 특별 경로 제거)
- `server/worker/state-paths.js`
- `app/data/worker-parallel-analysis-store.js`
- `app/views/worker/lanes.js`, `app/views/worker/index.js`
- `app/views/worker/parallel-analysis-dialog.js`
- `app/utils/worker-serial.js` (표시 전용으로 축소)
- `app/protocol.js`, `app/protocol.md`
- 대응 unit/integration/e2e tests, frontend bundle과 source map

plan authoring에서 파일 경계는 조정할 수 있지만, 레인당 배타·드래그 단일
인터랙션·read-only analyzer·큐-상태-만 제출 경계·bd 무변경은 변경하지 않는다.

## 완료 조건

1. 대기 영역이 병렬 레인 + 고정 직렬 레인(개수 dropdown)으로 동작하고, 직렬
   레인은 이전 항목 머지·정리/폐기까지 다음 항목을 대기시키며 레인끼리는 동시
   진행한다.
2. `worker-serial` 라벨·전역 뮤텍스·일괄 실행 방식 UI·`pr_wait_holds_slot`이
   스케줄링에서 제거되고 마이그레이션이 기존 상태를 유실 없이 정산한다.
3. blocks edge가 레인 내 순서를 자동 보정하고, blocked 이슈가 큐에서 대기하다
   ready 전환 시 실행된다.
4. 일반 queue add/reorder/auto-advance는 analyzer를 호출하지 않고, 버튼 클릭만
   canonical snapshot에서 configured provider 하나를 read-only로 실행한다.
5. 동일 identity는 cache hit, 변경된 base/artifact/scope/dependency/model은
   stale로 판정된다.
6. strong evidence가 검증된 high-confidence 그룹만 serial 권장으로 표시되고,
   편집된 초안 제출은 서버 digest·멤버·레인 재검증 후 큐 CAS로만 수렴하며 bd
   상태를 변경하지 않는다.
7. cancel·timeout·invalid output·prompt injection·부분 실패가 큐 진행을 막거나
   last-good cache를 손상하지 않는다.
8. disposable workspace E2E와 full repository verification, frontend build,
   managed deploy, process path·port·HTTP readback이 모두 통과한다.
