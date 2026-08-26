---
scope:
  - server/worker/scope-cache.js
  - server/worker/title-cache.js
  - server/worker/parallel-analysis-targets.js
  - server/worker/runnable-cache.js
  - server/ws/worker-handlers.js
  - server/ws/monitor-handlers.js
  - app/utils/scope-overlap.js
  - app/views/monitor/lanes.js
  - app/views/monitor/index.js
  - app/views/worker/lanes.js
  - app/styles/
  - app/protocol.md
---

# 대기 레인 카드에 scope 겹침 자동 표시 (UI-qm12)

## 1. 문제

- AI 병렬성 분석(`server/worker/parallel-analysis-*.js`)은 실행당 수백 KB
  프롬프트와 분 단위 시간을 쓰고, 결과는 다이얼로그를 열어야 보인다. 사용자가
  실제로 알고 싶은 것은 "이 대기 이슈가 지금 출발하면 누구와 부딪히나"이며,
  그 답의 재료(스펙 front-matter `scope:`)는 이미 모든 스펙에 선언돼 있다.
- 서버는 선언 scope의 겹침을 이미 계산한다(`parallel-analysis-targets.js`
  `scopeItemsOverlap`/`calculateScopeOverlaps`, UI-t4zy §3). 분석 다이얼로그
  대상 패널은 그 신호로 `겹침 UI-xxx` 배지를 그린다(§6.2). 같은 신호를 모니터
  대기 레인 카드에 직접 실으면 분석 실행 없이·비용 없이·즉시 보인다.
- 사용자 결정(2026-08-24): 🔗/🔒는 blocks 의존 전용이므로 재사용하지 않고,
  겹침은 별도 글리프 `⧉`(호박색)로 표시한다. 겹침은 정보 표시가 기본이며,
  팝오버에서 1클릭으로 같은 직렬 레인에 배치할 수 있다. 자동 배치는 하지
  않는다 — 선언 scope는 freshness 선언이지 쓰기 소유권이 아니다.

## 2. 검증된 전제

- 큐 스냅샷은 bead별 partial·비영속 장식(`bead_titles`, `bead_labels`,
  `bead_workflow`)을 비동기로 채워 보낸다(`app/protocol.md` 180-199행,
  `server/ws/worker-handlers.js` `decorateQueue`). miss는 항목 없음으로
  전달되고 다음 스냅샷에 도착한다.
- `bead_workflow`의 대상 집합은 병렬 큐 ∪ 직렬 레인 ∪ 실행 중 attempt ∪ PR
  대기(`beadWorkflowFor`). title-cache 레코드(`title-cache.js`
  `recordFromIssue`)는 `bd show --json` 결과에서 만들어지며 spec 경로는
  아직 싣지 않는다. `resolveSpecId(issue)`(`server/spec-id.js`)가 native
  `spec_id` 우선·metadata 호환으로 경로를 준다.
- 실행가능 후보(`server/worker/runnable-cache.js` `RunnableItem`)는
  `spec_id`를 이미 싣고, 모니터 파이프라인(`server/ws/monitor-handlers.js`
  `buildMonitorPipeline`)이 레포 스냅샷에 `runnable`을 부착한다.
- scope는 pinned base에서 읽는다: `workerAnalysisContext(workspace)`가
  attachment의 `resolveBase({force:false})`(20초 캐시,
  `attach.js` `BASE_RESOLUTION_TTL_MS`)와 `gitRun`을 준다.
  `parallel-analysis-targets.js` `scopeAtBase(gitRun, base_sha, paths)`가
  `git cat-file blob`으로 읽어 `parseArtifactScope`로 파싱한다.
- 클라이언트는 서버가 준 `bead_blocked_by`에서 의존 칩·체인을 파생한다
  (`app/views/monitor/lanes.js` `dependency_chips`, `buildChains`). 위치
  라벨은 `app/views/monitor/blockers.js` `blockerLocationLabel`이 만든다.
- UI-e6hw(대기 레인 레포 통합, 구현 중)는 병렬 통합 큐 `parallel_rows`와 연결
  레인 `chain_lanes`를 만들고 🔗 팝오버·`mon-card-popover`를 제거한다. 의존
  표시는 `🔒 선행 …`/`→ 후속 …` 칩만 남는다. 이 설계는 그 모델 위에 칩을
  얹으므로 UI-e6hw가 닫힌 뒤 착수한다(`blocks` 의존).
- scope 항목은 레포 상대 경로다. 레포가 다른 이슈 사이의 겹침은 정의되지
  않는다.

## 3. 설계 원칙

- **서버는 사실만, 클라이언트가 파생.** 서버는 bead별 선언 scope를 싣고,
  겹침 pairwise는 클라이언트가 계산한다 — `bead_blocked_by` → 체인 파생과
  같은 패턴이다.
- **표시 전용 신호.** 스케줄러·admission·bd 쓰기는 scope를 소비하지 않는다.
- **fail-quiet.** 어떤 실패도 스냅샷 푸시를 막거나 카드를 지우지 않는다.
  신호가 없으면 칩이 없을 뿐이다.
- **빈 scope ≠ 병렬 OK.** 스펙이 있는데 scope가 비어 있으면 판정 불가를
  드러낸다.
- **새 서버 op 없음.** 1클릭 배치는 기존 `worker-queue-place`의 조합이다.

## 4. 서버 — scope 사실을 스냅샷에 싣기

### 4.1 `server/worker/scope-cache.js` (신규, `createScopeCache`)

- 인스턴스 소유: 모듈이 `createScopeCache(options)`(테스트용 factory)와
  프로세스 단일 인스턴스 `scopeCache()`를 함께 export한다. `decorateQueue`와
  `buildMonitorPipeline`은 둘 다 `scopeCache()`를 읽으므로 같은 값을 본다.
- 키(동기 조회용) `${workspace_key}\0${artifact_paths.join('\0')}` → 값
  `{ base_oid: string, scope: string[]|null, at: number }`. 동기 `peek`는
  base를 알 필요가 없다 — base 비교는 `fill`이 한다.
- TTL: 양성 5분(title-cache `POSITIVE_TTL_MS`와 동일), 음성 60초. TTL이 지난
  키는 `peek`가 마지막 값을 그대로 돌려주면서 `fill`을 예약한다(stale-while-
  revalidate). 값이 없으면 `miss`.
- API:
  - `peek(workspace_key, artifact_paths)` → `{ state: 'hit', scope: string[] }
    | { state: 'miss' } | { state: 'failed' }`. 동기. `miss`이거나 TTL 만료면
    `fill`을 예약한다(같은 키의 fill은 중복 예약하지 않는다 — in-flight 집합).
    `failed`는 값의 `scope === null`이다.
  - `fill(workspace_key, artifact_paths)`: `workerAnalysisContext(workspace)`
    → `resolveBase({force:false})` → `base_oid`. 기존 값의 `base_oid`와 같고
    TTL 안이면 읽지 않고 `at`만 갱신한다. 다르거나 값이 없으면
    `scopeAtBase(gitRun, base_oid, artifact_paths, true)`로 읽는다 —
    **어느 한 artifact라도 `cat-file`이 실패하면 전체가 `null`**(§4.3의 읽기
    실패). 성공하면 합집합 scope를(빈 배열 포함) 저장한다. context가 없거나
    base 미해석이면 `scope: null`, `base_oid: ''`로 음성 캐시한다.
  - `onFilled(listener)`: fill이 끝나면 `workspace_key`로 통지. 큐 스냅샷
    푸시 경로에서 title-cache 채움이 `requestSnapshot`/`schedulePush`를
    일으키는 기존 훅과 같은 자리에 리스너를 붙여, partial 항목이 다음
    스냅샷에 도착하게 한다.
- base가 바뀌면 다음 refill이 `base_oid` 불일치를 보고 다시 읽는다. spec
  파일이 base에서 바뀌면 커밋으로 base가 움직이므로 같은 경로로 갱신된다.
  별도 invalidate는 없다.
- `scopeAtBase`는 `parallel-analysis-targets.js`에서 `export`로 승격한다
  (동작 불변). `fail_on_read_error=true`가 "artifact 하나라도 못 읽으면
  `null`"이라는 현재 의미 그대로다.

### 4.2 title-cache 레코드 확장 (`server/worker/title-cache.js`)

- `BeadRecord`에 `spec_id: string`(`resolveSpecId(raw_issue).path`, 없으면
  `''`)과 `plan_path: string|null`(`metadata.plan_path` 문자열일 때만)을
  추가한다. `bd show` 호출은 늘지 않는다.
- `scopeArtifactsFor(workspace, ids)` → `Record<bead_id, string[]>`: 레코드가
  있고 `spec_id`가 비어 있지 않은 bead만 `[spec_id, plan_path?]`를 돌려준다.
  quick_fix·스펙 미발행 bead는 항목이 없다.

### 4.3 스냅샷 필드 `bead_scope` (`decorateQueue`)

- `bead_scope: Record<bead_id, { scope: string[], artifacts: string[] } | null>`.
  - 항목 없음 = 아직 안 읽음(`miss`) 또는 스펙 없음(quick_fix·미발행) →
    클라이언트는 아무 칩도 그리지 않는다.
  - `{ scope: [], artifacts }` = 모든 artifact(spec, 있으면 plan)를 base에서
    **성공적으로 읽었는데** 유효한 scope 항목이 없다 → `scope 없음` 칩. spec
    파일이 base에 없거나 읽기 오류가 난 경우는 여기 오지 않는다.
  - `null` = 읽기 실패(`failed`: artifact 부재·git 오류·base 미해석) → 칩
    없음.
  - `artifacts`는 scope를 읽은 경로 목록(spec, plan 순; 툴팁용).
- 대상 집합 = `beadWorkflowFor`와 같은 집합(병렬 큐 ∪ 직렬 레인 ∪ 실행 중 ∪
  PR 대기) + 세션 항목(`session_active`). 각 bead에 대해 `scopeArtifactsFor`로
  경로를 얻고 `scope_cache.peek`가 `hit`이면 항목을 쓴다. `miss`는 항목 생략,
  `failed`는 `null`. 세션 항목은 레인 배열에 없으므로 자기 행의
  `[spec_id, plan_path?]`를 §4.4와 같은 방식으로 읽는다.
  **정정(UI-anna §3.1):** 원래는 "PR 대기를 뺀 것"이었다. PR 대기 카드도 다른
  레인과 같은 슬롯 4 질문에 답해야 하므로 대상에 넣었고, 세션이 잡은 실행중
  bead도 같은 이유로 재료를 받는다. 실행 중 판정은
  `activeAttemptStates`(클라이언트가 그 레인을 그리는 판정)로 맞춘다.
- 비영속. `app/protocol.md`의 큐 스냅샷 장식 단락에 `bead_scope` 계약(partial·
  fail-quiet·비영속·세 가지 값의 의미)을 추가한다.

### 4.4 실행가능 항목의 `scope` (`buildMonitorPipeline`)

- `RunnableItem`에 `plan_path: string|null`(`metadata.plan_path` 문자열일
  때만)을 추가해 대기·실행 중 bead와 **같은 artifact 집합**(`[spec_id,
  plan_path?]`)을 읽는다 — 같은 bead가 큐에 적재되는 순간 겹침 결과가 달라지지
  않아야 한다.
- runnable 부착 직후, 각 항목의 `spec_id`(비어 있지 않을 때)로 그 artifact
  집합을 `scopeCache().peek`에 넘겨 `hit`이면 `scope: string[]`를 additive로
  붙인다. `miss`/`failed`이면 필드를 생략한다(§5.2는 생략을 "판정 불가"로
  읽는다). `RunnableItem` typedef에 optional `scope`를 추가한다.
- 모니터 파이프라인은 동기이므로 여기서 fill을 기다리지 않는다 — miss가 예약한
  fill의 `onFilled`가 다음 푸시를 만든다.

### 4.5 비용

- 레포당 (대기 + 실행 중 + PR 대기 + 실행가능 + 세션 항목) bead 수만큼
  `git cat-file` 1~2회, 5분에 한 번 (대상 집합 확대는 UI-anna §3.1). `resolveBase`는 이미 캐시된다. 한 스냅샷 푸시가 늘리는 동기 작업은
  Map 조회뿐이다.

## 5. 클라이언트 — 겹침 파생·칩·팝오버·1클릭 배치

### 5.1 공유 순수 함수 `app/utils/scope-overlap.js`

- `scopeItemsOverlap(left, right)`를 이 모듈로 옮기고, `calculateScopeOverlaps`
  안의 쌍별 prefix 계산을 `overlapPrefixes(scope_a, scope_b)`(겹침을 만든 항목
  중 더 긴 prefix 채택·중복 제거·사전순 — UI-t4zy §3.3과 동일)로 추출해 같이
  둔다. `parallel-analysis-targets.js`는 두 함수를 import·re-export하며
  `calculateScopeOverlaps`의 결과는 바뀌지 않는다.
  `transcript-lines.js`(서버·클라이언트 공유)와 같은 선례다.

### 5.2 투영 (`app/views/monitor/lanes.js`, `buildLanes`)

- 레포별 비교 집합 = 그 레포의 실행 중 ∪ 병렬 큐 ∪ 직렬 레인 항목 ∪ 실행가능
  ∪ PR 대기 (PR 대기 포함은 UI-anna §4.4의 정정이다). 각 항목의 scope는
  `bead_scope[id]?.scope`(runnable은 `entry.scope`).
- **비교 단위는 카드가 아니라 bead다** (UI-anna §4.4). head review·repair 세션
  타일은 `non_occupying`이라 그 bead가 PR 대기 레인에도 그대로 서 있어, 카드
  단위로 비교하면 자기 자신과 겹친다는 칩이 서고 제3의 카드에는 같은 상대가 두
  번 적힌다. 레포별 집합은 bead ID로 dedupe하고, 결과(`overlap_chips` ·
  `scope_state`)는 그 ID의 모든 표시 카드에 복사한다.
- 양쪽 모두 scope가 비어 있지 않은 쌍만 pairwise 비교한다. 겹치면 양쪽 항목에
  `overlap_chips.push({ id, title, location_label, prefixes })`. 위치 라벨은
  `blockerLocationLabel`이 만드는 값(`실행중`/`#n`/`s1 #n`/`실행가능`)을
  재사용한다.
- `scope_state: 'declared' | 'missing' | undefined`: `bead_scope[id]`가
  `{scope: []}`이면(또는 runnable이 `spec_id`를 갖고 `scope`가 `[]`이면)
  `'missing'`, 비어 있지 않으면 `'declared'`, 항목이 없거나 `null`이면
  `undefined`.
- 레포 간 비교는 하지 않는다. `bead_scope` 키가 아예 없는 구서버 스냅샷이면
  계산 전체를 건너뛴다.
- `MonitorItem` typedef에 `overlap_chips?`, `scope_state?`를 추가한다.
- **연결 레인 행에도 싣는다.** UI-e6hw는 blocks 체인에 속한 병렬 항목을
  `parallel_rows`에서 숨기고 `chain_lanes[].rows`(`MonitorChainLaneRow`)로
  따로 그린다. 비교 집합은 위와 같지만(숨김과 무관하게 큐 멤버는 전부 포함),
  결과는 그 bead의 `MonitorItem`과 같은 id의 `MonitorChainLaneRow`에도
  `overlap_chips`/`scope_state`로 복사한다. 그래야 체인에 숨은 병렬 멤버도
  화면 어딘가에서 칩을 갖는다.

### 5.3 렌더 (`app/views/worker/lanes.js` `dependencyChipsTemplate`, 모니터 `miniRow`)

- `DependencyChips`에 `overlaps?: OverlapChip[]`와 `scope_missing?: boolean`을
  추가한다. 칩 열 순서: `🔒 선행` → `⧉ 겹침` → `→ 후속`.
- 겹침 칩: 텍스트 `⧉ 겹침 <id> (<위치>)`, 클래스
  `worker-dep worker-dep--overlap`(호박색 배경·테두리, 기존 `worker-dep`
  치수 그대로). 상대가 4개 이상이면 칩 3개 + `+n` 칩. 툴팁: 겹치는 경로를
  줄바꿈으로 나열.
- `scope 없음` 칩: 클래스 `worker-dep worker-dep--muted`(회색), 툴팁
  "겹침 판정 불가 — 스펙에 scope 선언 필요". 레인 분기는 없다 — 실행 중 행과
  PR 대기 행에도 붙는다 (UI-anna §6이 레인별 억제를 걷어냈다).
- 모니터는 §5.2의 `overlap_chips`·`scope_state`를 `dependency_chips`에 합쳐
  `miniRow`에 넘긴다(`index.js`의 기존 `monitor.dependency_chips` 전달 경로).
  UI-e6hw의 연결 레인 행 렌더(`chainRow`)도 같은 `dependencyChipsTemplate`을
  호출하므로 그 행의 `overlap_chips`/`scope_state`를 같은 방식으로 합쳐 넘긴다
  — 칩·팝오버 마크업은 한 벌이다.
- 겹침 칩 클릭 → 팝오버 `mon-overlap__popover`(`role="dialog"`, 카드 안에
  절대 배치, 바깥 클릭·Esc로 닫힘): 상대 id·제목·위치, 겹치는 경로 목록,
  [같은 직렬 레인으로] 버튼 또는 그 자리의 안내 문장(§5.4). `+n` 칩 클릭은
  상대 전부를 한 팝오버에 목록으로 보인다(각 행에 자기 버튼).

### 5.4 1클릭 직렬 배치 (`app/views/monitor/index.js`)

기존 `worker-queue-place { bead_id, lane, index, root_dir, expected_revision }`만
쓴다. 나 = 팝오버를 연 행(대기·실행가능·실행 중 어느 것이든), 상대 = 팝오버
행의 이슈. 버튼 판정은 클릭 시점의 최신 모델로 한다(팝오버는 상대 id만
기억한다).

용어: 한 항목의 **직렬 레인** = 대기 중이면 그 레인, 실행 중이면 출발한 레인
(`serial_lane_id`). 병렬 큐·실행가능·병렬에서 출발한 실행 중은 직렬 레인이
없다. **이동 가능** = 대기(병렬/직렬) 또는 실행가능(실행 중은 이동 불가).

| 나 | 상대 | 동작 |
| --- | --- | --- |
| 어느 쪽이든 | 둘 다 같은 직렬 레인 | 버튼 없음(순서가 이미 있다) |
| 이동 가능 | 직렬 레인 `s_k` 있음 | `place(나, s_k, 끝)` 1 op |
| 직렬 레인 `s_m` 있음(대기 또는 거기서 출발한 실행 중) | 이동 가능, 직렬 레인 없음 | `place(상대, s_m, 끝)` 1 op |
| 이동 가능, 직렬 레인 없음 | 이동 가능, 직렬 레인 없음 | 빈 직렬 레인(`entries` 없음·`occupied_by` 없음) 중 첫 번째 `s_e`로 `place(상대, s_e, 0)` → `place(나, s_e, 1)` 2 op. 두 번째 op의 `expected_revision`은 첫 응답의 revision. 첫 실패에서 중단 |
| 이동 불가(병렬에서 출발한 실행 중) | 이동 불가 | 버튼 없음. 문장 "둘 다 실행 중 — 순서를 만들 수 없습니다" |
| 이동 불가(병렬에서 출발한 실행 중) | 이동 가능, 직렬 레인 없음 | 버튼 없음. 문장 "실행 중 — 순서를 만들려면 상대를 직렬 레인에 두세요" |
| 이동 가능, 직렬 레인 없음 | 이동 불가(병렬에서 출발한 실행 중) | 버튼 없음. 문장 "실행 중 — 종료 후 출발하려면 직렬 레인에 두세요" |

- 규칙 요약: 어느 한쪽에 직렬 레인이 있으면 그 레인을 쓴다(1 op, 빈 레인
  불필요). 둘 다 없을 때만 빈 레인 2 op. 실행 중인 항목은 옮기지 않는다.
- 2 op 분기에서 빈 직렬 레인이 없으면 버튼 비활성 + 툴팁 "빈 직렬 레인 없음 —
  Worker 탭에서 레인 수 조절".
- 실행가능(미적재) 항목을 옮기는 `place`는 기존 드래그 적재와 같은 op다.
- 낙관적 투영 없음. 다음 스냅샷이 실제 상태를 그린다(UI-e6hw §3).

### 5.5 모바일 (≤640px)

- 칩은 기존 의존 칩의 줄바꿈 규칙을 따른다. 팝오버는 카드 폭 전체를 쓰는
  블록으로 카드 아래에 펼친다(별도 시트 컴포넌트 없음).

## 6. 오류 처리

- attachment 없음·`resolveBase` 실패·git 오류 → 해당 bead 항목 생략 또는
  `null` → 칩 없음. 스냅샷 푸시는 막지 않는다.
- 구서버(`bead_scope` 없음)·`runnable[].scope` 없음 → 겹침 계산 생략.
- 1클릭 배치 첫 op 실패 → 두 번째 op를 보내지 않고 기존 오류 토스트. 두 번째
  실패 → 상대만 직렬에 들어간 상태가 다음 스냅샷에 그대로 보인다.
- 팝오버가 열린 사이 스냅샷이 바뀌어 상대 위치가 달라지면 버튼은 최신 모델로
  다시 판정한다.

## 7. 테스트 계획

- `server/worker/scope-cache.test.js`: peek miss → fill 예약(중복 없음) →
  `onFilled` 통지 → hit; TTL 만료 시 stale 값 반환 + refill; refill에서
  `base_oid` 동일이면 읽지 않음·다르면 재읽기; spec 부재/git 실패 →
  `scope: null`(`failed`, `[]`가 아님); context 없음/base 미해석 → `failed`;
  factory와 단일 인스턴스가 분리됨.
- `server/worker/title-cache.test.js`: 레코드 `spec_id`/`plan_path`,
  `scopeArtifactsFor`가 스펙 없는 bead를 생략하고 plan이 있으면 둘 다 싣는다.
- `server/worker/runnable-cache.test.js`: 항목에 `plan_path` 투영.
- `server/ws/worker-handlers.test.js`: `bead_scope`가 §4.3 집합에 partial로
  실림(hit 항목만, failed는 `null`, PR 대기와 세션 항목 포함 — UI-anna §3.1).
- `server/ws/monitor-handlers.test.js`: runnable 항목에 `scope` additive 부착,
  miss면 필드 생략.
- `app/utils/scope-overlap.test.js`: 이동한 순수 함수(기존
  `parallel-analysis-targets.test.js`의 겹침 케이스 통과 유지).
- `app/views/monitor/lanes.test.js`: 실행중×대기·대기×실행가능·직렬×병렬 쌍의
  `overlap_chips`와 위치 라벨; 빈 scope 쌍 미비교; `scope_state='missing'`;
  레포 간 미비교; `bead_scope` 없는 스냅샷에서 계산 생략; blocks 체인에 숨은
  병렬 멤버의 `MonitorChainLaneRow`에 칩 복사.
- `app/views/worker/lanes.test.js`: 칩 순서·`+n` 접기·회색 칩(실행 중 행에도
  선다 — UI-anna §6).
- `app/views/monitor/index.test.js`: 팝오버 버튼 분기(§5.4 표의 모든 행 —
  같은 레인·상대 직렬 1 op·내 직렬 1 op·둘 다 없음 2 op·실행 중 세 문장),
  2 op 순서와 revision 전달, 첫 op 실패 시 중단, 빈 레인 없음 비활성,
  `chainRow`에서 같은 팝오버 동작.
- 배포 후 실제 겹치는 대기 쌍으로 스크린샷 확인(모니터 재설계 관례).

## 8. 비범위

- 스케줄러가 scope를 소비하는 자동 직렬화·admission 거부·bd 라벨/의존 쓰기.
- AI 병렬성 분석 기능 변경(현상 유지; 진행 표시는 UI-bau6).
- Worker 탭 칩 표시(같은 `bead_scope`로 후속 가능).
- 레포 간 겹침, 과소 선언 탐지, scope 저작 보조·lint.
- 직렬 레인 수 조절·레인 이름·팝오버 상태 영속화.

## 9. 구현 unit 후보 (advisory)

1. 서버: `scope-cache.js` + title-cache 필드 + `decorateQueue`/
   `buildMonitorPipeline` 부착 + `scopeAtBase` export + `protocol.md` +
   테스트 — 뷰 없이 닫힘.
2. 클라이언트: `scope-overlap.js` 이동 + `lanes.js` 투영 + 칩 렌더/CSS +
   팝오버·1클릭 배치 + 테스트.
