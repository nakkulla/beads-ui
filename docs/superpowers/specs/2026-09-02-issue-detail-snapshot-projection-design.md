---
scope:
  - server/list-adapters.js
  - server/workflow-enrich.js
  - server/workspace-snapshot-coordinator.js
  - server/ws/subscription-handlers.js
  - server/ws/refresh.js
  - app/views/detail-panel/artifacts.js
---

# 이슈 상세 열기 지연 — issue-detail 스냅샷 투영, 비동기 git 프로브 warm, Artifacts 판정 서버 통일

Bead: `UI-wbjx` · 2026-09-02 · 기준 HEAD `0e79482b0a688a4fec48e99f76be0e83d6ad0fb0`

`UI-0d1c`(plan pending 판정 서버 통일)를 흡수한다. 라인 번호는 기준 HEAD의 것이다.

## §0 목적과 실측

사용자 보고 "이슈 상세가 뜨는 속도가 느리다". 상세 하나를 열 때 서버가 하는 일과
이 머신(부하 없음) 실측:

| 단계 | 호출 | 시간 | 이벤트 루프 |
| --- | --- | --- | --- |
| 본문 | `bd show <id> --include-dependents --json` (`list-adapters.js:102-116`, `:937-941`) | 약 54ms | 비동기 |
| HEAD | `git rev-parse HEAD` (`workflow-enrich.js:378`) | 30~120ms | **동기** |
| spec 신선도 | `freshnessAnchor` 2회 + `pathChangedSince` 1회 (`:392-411`, `:438`) | 각 30~66ms | **동기** |
| impl 신선도 | `implFreshness` rev-parse + merge-base (`:561-580`) | 각 30~66ms | **동기** |
| provenance | `bd dep list <id> --json` (`list-adapters.js:790`) | 약 39ms | 비동기 |

합계는 약 350ms이고 그중 200~300ms가 이벤트 루프를 막는다. 상세가 열려 있는 동안
30초 폴링마다(`refresh.js:300`) 같은 비용이 반복되고, 같은 시각에 다른 목록의
동기 enrich(`workflow-enrich.js:641` 주석의 약 930ms)와 겹치면 클릭 응답이 그
뒤로 밀린다.

목표: 상세 열기·재조회에서 상세 전용 `bd` 호출 0회, 투영 경로에서 동기 자식
프로세스 0회, Artifacts 행 판정을 서버 한 곳으로.

설계에 쓴 사실(기준 HEAD에서 실측):

- 스냅샷 `bd list --json --tree=false --all --limit 0`(`workspace-snapshot-coordinator.js:6`)은
  811건 전부(closed 795 포함)에 `metadata`·`notes`·`design`·`acceptance_criteria`·
  `comment_count`·`dependencies`(bare edge `{issue_id, depends_on_id, type}`)를
  싣는다. `bd show`에만 있는 필드는 `schema_version`뿐이며 소비자가 없다.
- `bd show`의 `dependencies`는 대상 이슈 전체, `dependents`는 compact
  `{created_at, dependency_type, id, issue_type, priority, status, title, updated_at}`다.
  상세 패널(`app/views/detail-panel/index.js:1701-1769`)은 `id`·`dependency_type`·
  `title`·`status`만 읽는다.
- 외부 rig 대상(`dotfiles-*` 51건)은 `bd show`도 `{id, dependency_type, title: ''}`
  스텁만 준다.
- `enrichIssueWorkflow`는 동기 API이고 Worker의 `server/worker/title-cache.js:107`·
  `runnable-cache.js:633`이 동기로 부른다.
- `stale_cache`(`workflow-enrich.js:107`)는 `git log` 결과만 `<head>\0<sha>\0<path>`
  키로 캐시한다. anchor·impl 브랜치·dirty 프로브는 캐시가 없다.
- 코디네이터 `request()`는 in-flight가 없으면 요청마다 새 세대(2회 read, 병렬 약
  40ms 벽시계)를 만든다. cold-subscribe도 같다.
- 구독 레지스트리(`subscriptions.js`)는 detach 뒤에도 키별 `cachedSnapshot`을
  보존하므로 **같은 id를 다시 여는 것은 약 1ms의 캐시 적중**이다. 느린 것은 id당
  첫 열기(cold)다. 현재 배포(`3e7ae4a`, 공유 서버)에서 서로 다른 30개 id의 cold
  open 실측: p50 266ms · p95 440ms · 최대 589ms, 같은 id 재열기: p50 1ms.

## §1 issue-detail을 워크스페이스 스냅샷 투영으로

### 1.1 경로 전환

- `server/ws/subscription-handlers.js:93`과 `server/ws/refresh.js:302`의
  `workspace_snapshot: String(spec.type) !== 'issue-detail'`을 `true`로 바꾼다.
  `list-adapters.js:766` `isWorkspaceSnapshotListSpec`은 모든 type에 참이 된다.
- `mapSubscriptionToBdArgs`(`list-adapters.js:102-116`)의 `issue-detail` arm과
  `fetchListForSubscriptionRaw`(`:937-941`)의 `show` 분기·`expected_id`를 제거한다.
  raw 경로에 `issue-detail`이 들어오면 default arm의 `Unknown subscription type`
  badRequest다. `workspace_snapshot:false` raw 경로 자체(목록 arm·
  `enrichIssuesProvenance`)는 옵션 계약으로 그대로 둔다 — 운영 호출자는 위 둘뿐이라
  프로덕션에서는 더 이상 타지 않는다.
- 결과: 상세 열기와 폴링 재조회는 목록과 같은 세대에 합류하고 상세 전용 `bd`
  호출은 0회다. ADR 0008의 세대당 read 2회(legacy 3회)는 그대로다.

### 1.2 투영

`projectWorkspaceSnapshot`(`list-adapters.js:258`)에 `issue-detail` case를 둔다.

- `params.id`를 `snapshot.id_index.get(id)`로 찾는다. 없으면 투영은 빈 배열을
  돌려주고, `fetchWorkspaceSnapshotProjection`이 `issue-detail` + 빈 결과를
  `{ ok: false, error: { code: 'not_found', message: 'Issue not found: <id>' } }`로
  바꾼다. 오늘 `bd show` 실패가 `bd_error`로 가던 자리이며, 클라이언트
  `showFatalFromError`(`app/main.js:275`)는 코드를 읽지 않으므로 표시는 같다.
  refresh 경로는 오늘처럼 `!res.ok`를 로그만 남기고 push하지 않는다.
- stale 세대(`snapshot_result.stale`)는 목록과 같다: cold-subscribe는 stale
  스냅샷으로 그리고 refresh는 건너뛴다.
- `applyClosedIssuesFilter`는 `closed-issues` type만 자르므로 closed 이슈 상세도
  그대로 나온다.

### 1.3 간선 하이드레이션

compact 간선 형태 하나를 쓴다:
`{ id, dependency_type, title, status, issue_type, priority, created_at, updated_at }`.

- `dependencies`: 이 이슈의 bare edge(embedded 모드는 `issue.dependencies`, legacy
  모드는 `snapshot.dependency_edges` 중 `issue_id === id`)를 `depends_on_id`로
  `id_index`에서 풀어 위 형태로 만든다. 배열 순서는 `bd`가 준 순서 그대로다.
  대상이 스냅샷에 없으면(외부 rig) `{ id, dependency_type, title: '' }` 스텁이다.
- `dependents`: 코디네이터의 간선 walk(`buildBlocksIndex`,
  `workspace-snapshot-coordinator.js:712`)를 확장해 모든 type의 역방향 인덱스
  `edges_in: Map<depends_on_id, Array<{ issue_id, type }>>`를 세대당 한 번 만들어
  `WorkspaceSnapshot`에 싣는다. `blocks_in`과 같은 규칙으로 `id_index`가 아는
  issue_id만 넣는다. 상세는 이를 같은 compact 형태(`dependency_type = type`)로
  하이드레이션하고 `id` 오름차순으로 정렬한다 — `deps_signature`
  (`subscriptions.js:151-184`)가 배열 순서에 민감하므로 결정적 순서가 필요하다.
- `from_id`는 모든 투영에 이미 붙는 `attachSnapshotProvenance`(`:718`)로 온다.
  단, 이 함수의 embedded 모드 collector(`collectEmbeddedProvenance`, `:739`)는
  bare edge의 `type`·`depends_on_id`를 읽으므로 **하이드레이션보다 먼저** 원본
  스냅샷 이슈(bare edge 그대로)에 대해 실행한다. 순서: 선택 → provenance 부착 →
  compact 하이드레이션 → warm → enrich. embedded·legacy 두 모드의 issue-detail
  `discovered-from` 테스트를 둔다.
- `schema_version`은 싣지 않는다.

## §2 git 프로브: 투영 전 비동기 warm + 불변 키 캐시

### 2.1 두 종류의 사실

- **가변 사실**(캐시하지 않음, 세대 컨텍스트로 명시 전달): HEAD, 브랜치 tip 전체,
  plan 경로 dirty 여부.
- **불변 사실**(모듈 캐시, 확정 결과만): 경로 변경 `<head>\0<sha>\0<path>`
  (기존 `stale_cache`, `true|false`만), 조상 관계 `<root>\0<a>\0<b>`(exit 0/1만),
  커밋 객체 존재 `<root>\0<sha>`(**존재 확인만**). 상한과 비움은 기존
  `STALE_CACHE_CAP=5000` / 가득 차면 전체 비움 정책을 캐시마다 같이 쓴다.
- **미판정·부재는 불변이 아니다**: 다른 워크트리의 커밋이나 fetch로 객체가 생겨도
  HEAD는 그대로일 수 있다. 따라서 `null`(git 오류)과 "커밋 없음"은 전역 캐시에
  넣지 않고 세대 컨텍스트의 `undetermined: Set<key>`에만 기록해 같은 세대 안의
  재질의만 막고 다음 세대에서 다시 묻는다. 오늘 receipt sha 부재(squash-merge된
  브랜치 sha)로 `git log`가 매 폴링 실패하는 비용은 이렇게 세대당 1회로 줄고
  비동기가 된다.
- 경로 변경 프로브는 `git log <sha>..<captured_head> -- <path>`로 **캡처한 head를
  명시**한다. 오늘의 `..HEAD` 리터럴(`:438`)은 비동기 실행 중 HEAD가 움직이면 결과와
  캐시 키가 어긋난다. 동기 폴백 경로도 같은 형태로 바꾼다(head는 이미 인자다).

### 2.2 `warmWorkflowProbes`

`server/workflow-enrich.js`에 추가한다.

```
async function warmWorkflowProbes(items, workspace_root, generation)
  → Promise<WorkflowProbeContext | null>
generation = { generation: number, all: NormalizedIssue[] }   // 스냅샷의 두 필드
WorkflowProbeContext = {
  head: string | null,
  branch_tips: Map<string, string>,
  dirty_paths: Set<string>,      // 검사한 plan_path 중 dirty인 것
  checked_paths: Set<string>,    // status로 검사한 plan_path 전체
  undetermined: Set<string>      // 이 세대에서 미판정으로 끝난 프로브 키
}
```

- 모든 spawn은 `node:child_process` `execFile`(promisify)이며 fail-quiet다.
  `workspace_root`가 없으면 `null`.
- **세대 컨텍스트**는 `(workspace_root, generation.generation)`당 **공유 in-flight
  Promise 하나**로 만든다(모듈 Map, root당 최신 1건 보관). 같은 세대에 합류한 여러
  투영이 동시에 warm해도 컨텍스트 spawn은 한 번이다. 재료는 이번 items가 아니라
  **`generation.all`** 전체다: `git rev-parse HEAD` 1회,
  `git for-each-ref --format=%(objectname) %(refname:short) refs/heads/` 1회,
  `all` 중 `staleProbesApply(status)`인 full_plan 이슈의 `plan_path` 전체에 대한
  `git status --porcelain -- <paths...>` 1회(경로가 없으면 생략). 첫 투영의 선택
  항목만으로 만들면 같은 세대의 다른 구독이 가진 `plan_path`가 검사에서 빠져
  "깨끗함"으로 오판되므로 `all`이어야 한다. `pathDirty`는
  `checked_paths`에 없는 경로를 `unknown`으로 답한다(가산식 방어). HEAD 실패는
  `head: null`이며 그 뒤 프로브는 오늘처럼 fail-quiet다.
- **이슈별 입력 수집**(순수 계산): `staleProbesApply(status)`인 이슈에서
  spec receipt sha·`last_checked_sha` cursor·published spec path, impl receipt sha·
  `refs/heads/<bead_id>` tip, plan 승인 receipt sha·plan_path를 읽어 `(sha, path)`
  변경 프로브, `(a, b)` 조상 프로브, cursor 존재 프로브로 중복 제거한다.
  `freshnessAnchor`의 두 단계(cursor 존재 → cursor가 head의 조상)는 순차 의존이므로
  존재 결과가 난 뒤 조상 프로브를 낸다.
- 전역 캐시 미스이고 이 세대의 `undetermined`에도 없는 키만 상한 동시성 8로
  실행한다. 실행 중인 프로브는 키별 in-flight Promise 맵으로 공유해 동시 warm이 같은
  미스를 두 번 띄우지 않는다. 확정 결과는 전역 캐시에, 미판정은 `undetermined`에
  넣는다. 두 번째 스펙부터는 세대 컨텍스트 공유와 캐시 히트로 spawn이 거의 없다.

### 2.3 동기 API는 캐시 리더

- `enrichIssuesWorkflow(issues, workspace_root, probes?)`와
  `enrichIssueWorkflow(issue, workspace_root, head?, probes?)`는 동기 시그니처를
  유지한다. `probes`가 있으면 `head`는 `probes.head`다.
- 프로브 함수(`gitHead`·`freshnessAnchor`·`pathChangedSinceOrNull`·`pathDirty`·
  `implFreshness`·`planFreshness`)는 `probes` 인자를 받는다.
  - `probes` **있음**: 캐시와 컨텍스트만 읽는다. 미스는 `null`/`unknown`(미판정,
    fail-quiet)이며 **절대 spawn하지 않는다**. `implFreshness`는
    `probes.branch_tips`에 브랜치가 없으면 `unknown`이다(for-each-ref가 전체
    목록이므로 재조회하지 않는다). `pathDirty`는 경로가 `probes.checked_paths`에
    없으면 `null`(unknown), 있으면 `probes.dirty_paths` 소속 여부다.
  - `probes` **없음**: 오늘과 같은 동기 spawn 경로다. Worker의 `title-cache`·
    `runnable-cache`는 이 경로를 그대로 쓰며 이번 범위 밖이다.
- 이 규칙이 "투영 경로 동기 spawn 0회"를 테스트 가능한 불변식으로 만든다.

### 2.4 호출 지점

`fetchWorkspaceSnapshotProjection`(`list-adapters.js:228`) 하나다.
`projectWorkspaceSnapshot`을 둘로 나눈다: 항목 선택(동기, 기존 switch와
decoration) → `attachSnapshotProvenance`(bare edge 기준) → issue-detail만 compact
하이드레이션 → `await warmWorkflowProbes(items, cwd, snapshot)` →
`enrichIssuesWorkflow(items, cwd, probes)`. `enrichIssuesWorkflow`의 선두 `gitHead`
동기 호출은 `probes` 있을 때 건너뛴다.

## §3 Artifacts 행: 서버 `stages.*.doc`만 읽기 (UI-0d1c)

- `app/views/detail-panel/artifacts.js` `collectArtifacts(issue)`는
  `issue.workflow.stages.spec.doc`와 `stages.plan.doc`의 `{ path, missing_state }`만
  행으로 만든다. `resolveSpecEvidence` import(서버 모듈 의존)와
  `hasPlanAuthoringHistory`(`:26-31`)는 제거한다. `workflow`·`stages`·`doc`이 없으면
  그 행을 생략한다(fail-quiet).
- 서버 판정은 이미 있다: `specStage`(`workflow-enrich.js:788-808`)는 evidence
  `none`이면 doc 없음, `draft`면 `spec_draft`, published면 `null`. `planStage`
  (`:847-883`)는 `plan_path`가 있으면 파일 부재 분기에도 `doc_part`를 실어
  `plan_pending`을 유지한다. 판정 차이 하나를 명시한다: 서버는 키 존재
  (`Object.hasOwn`), 클라이언트는 non-empty 문자열이었다. 이제 서버 판정 하나만
  남는다.
- `md-viewer.js`·`index.js`의 `onOpenDoc(path, missing_state)` 계약은 그대로다.

## §4 수용 기준과 측정

단위 테스트(모두 기존 fixture 방식 — `workflow-enrich.test.js`는 실제 임시 git
repo, `list-adapters.test.js`는 `runBdJsonProjected` mock):

1. `node:child_process` `execFileSync` spy: warm이 성공한 스냅샷 투영
   (issue-detail 포함)에서 호출 0회.
2. issue-detail 투영에서 `runBdJsonProjected`에 `show`·`dep` family 호출 없음.
3. 같은 (head, sha, path)·(a, b)로 두 번째 warm은 spawn 0회; head가 바뀌면 경로
   변경 프로브를 다시 낸다; 경로 프로브의 인자에 캡처한 head가 들어간다(`..HEAD`
   리터럴 없음).
4. 미판정(git 오류)과 커밋 부재는 전역 캐시에 남지 않는다: 같은 세대의 두 번째
   warm은 재질의하지 않고, 다음 세대의 warm은 다시 묻는다(두 경우 각각 테스트).
5. 세대 컨텍스트는 `(root, generation)`당 spawn 1세트다: 서로 다른 항목을 요청하는
   두 투영을 같은 세대에서 동시에 warm해도 `rev-parse`·`for-each-ref`·`status`는
   한 번이고, 첫 투영에 없던 full_plan 이슈의 `plan_path` dirty가 두 번째 투영에서
   맞게 나온다.
6. `probes` 있을 때 캐시 미스는 spawn 없이 `null`/`unknown`이다.
7. `probes` 없을 때(Worker 경로) 기존 동기 결과가 그대로다(기존 테스트 유지).
8. dependents 하이드레이션·id 정렬·외부 rig 스텁·`not_found`·legacy 모드
   `dependency_edges` walk.
9. `edges_in`이 embedded·legacy 두 모드에서 같은 결과.
10. issue-detail의 `from_id`가 embedded·legacy 두 모드에서 붙는다(compact
    하이드레이션 뒤에도 provenance가 살아 있음).
11. `artifacts.test.js` 9건을 `workflow.stages.*.doc` 입력으로 갱신하고, `workflow`
    부재 시 행 생략을 추가한다.
12. 갱신할 기존 테스트: `list-adapters.test.js:203`(issue-detail args),
    `ws.list-subscriptions.test.js:351·398·458`(상세 snapshot·dependents 전달·id
    강제 — 입력을 `bd show` mock에서 스냅샷 mock으로).

배포 후 실측(완료 보고서에 기록):

- WS 클라이언트 스크립트(scratchpad)로 공유 서버에 **서로 다른 30개 id**로
  `subscribe-list issue-detail`을 한 번씩 보내 첫 `snapshot`까지의 p50/p95를 잰다.
  같은 id를 반복하면 구독 레지스트리 캐시 적중(약 1ms)을 재게 되므로 표본은 id당
  첫 열기여야 한다. 변경 전 기준값은 §0에 기록해 두었다(현재 배포 `3e7ae4a`:
  p50 266ms · p95 440ms). 같은 스크립트·같은 id 집합으로 변경 후를 잰다.
  목표: p50 120ms 이하, p95 200ms 이하.
- 이벤트 루프 블로킹 0ms는 계측 대신 기준 1의 구조적 보장으로 답한다.
- 이 실측은 완료 보고서의 잔여 줄로 넘기는 통상 운영 인수 작업이다 —
  `worker-ineligible` 사유가 아니고 `session_preferred_reason`도 없다.

## §5 경계

- ADR 0008 정합: 새 데이터 계층 없음. 세대당 read 2회(legacy 3회) 불변, 상세 전용
  read 2회는 사라진다. 코디네이터가 얻는 것은 순수 계산 인덱스 하나다.
- 신선도: 상세는 목록과 같은 세대를 본다. UI 변경은 `triggerMutationRefreshOnce`,
  외부 `bd` 변경은 watcher가 세대를 만들므로 오늘 `bd show`와 같은 트리거로
  갱신된다.
- Worker 경로(`title-cache`·`runnable-cache`)의 동기 프로브는 범위 밖이다.
- `bd show`의 `--include-dependents` 능력 검사는 없다(grep 결과 소비자는
  `list-adapters.js:111` 하나).

## 구현 unit 후보

- `snapshot-detail`: §1 — `list-adapters.js` issue-detail 투영·하이드레이션,
  `workspace-snapshot-coordinator.js` `edges_in`, `subscription-handlers.js`·
  `refresh.js` 분기 제거, 관련 테스트.
- `probe-warm`: §2 — `workflow-enrich.js` warm·캐시·`probes` 인자, `list-adapters.js`
  호출 지점, `workflow-enrich.test.js`.
- `artifacts-doc`: §3 — `artifacts.js`·`artifacts.test.js`.

세 unit은 파일이 겹치지 않거나(`list-adapters.js`는 §1·§2가 다른 함수) 순서
의존이 없어 한 패킷에서 순차로 간다.

## 경계·후속

- 관찰: Worker `title-cache.js:107`·`runnable-cache.js:633`의 동기 git 프로브 —
  이번 warm의 `probes` 없음 경로를 그대로 쓰며, 호출 빈도가 낮아 별도 Bead를
  만들지 않는다.
- 관찰: `workspace_snapshot:false` raw 경로(`fetchListForSubscriptionRaw`·
  `enrichIssuesProvenance`)는 프로덕션 호출자가 없어진다 — 옵션 계약과 테스트
  54건을 위해 유지하며, 제거는 별도 판단이다.
- 관찰: scope 교차 — `UI-b93d`
  (`docs/superpowers/specs/2026-09-02-discard-orphan-gitlink-and-abandon-exit-design.md`)의
  scope 접두 `server/ws/`가 이 스펙의 `server/ws/subscription-handlers.js`·
  `server/ws/refresh.js`와 겹치나 파일이 다르다: b93d는 `server/ws/connection.js`
  dispatch와 worker-handlers 테스트, 이 스펙은 구독·refresh의 `workspace_snapshot`
  분기다. 의존 관계 없음.

## 결정 (ADR 후보)

- **issue-detail도 워크스페이스 스냅샷 투영 소비자이며 상세 전용 `bd` read는
  없다** — 되돌리기 어려움: 성립(`bd show` arm과 raw 상세 경로가 사라지고
  `dependents`가 코디네이터 인덱스에서 온다). 맥락 없이 놀라움: 성립(`bd show`가
  더 신선해 보이지만 목록과 같은 트리거로 갱신되는 같은 세대가 맞다). 실제
  트레이드오프: 성립(신선도 한 세대 vs 상세당 프로세스 2회와 폴링 반복). →
  summary 초안: "issue-detail은 워크스페이스 스냅샷 세대에서 투영하며
  dependents·provenance는 세대의 간선 인덱스로 만들고 상세 전용 bd read는 없다"
- **투영 경로는 동기 자식 프로세스 0회이고 동기 enrich API는 캐시 리더다** —
  되돌리기 어려움: 성립(프로브 함수의 `probes` 분기와 세대 컨텍스트가 호출 계약이
  된다). 맥락 없이 놀라움: 성립(`probes` 있을 때 미스가 spawn이 아니라 미판정인
  이유). 실제 트레이드오프: 성립(미스는 한 세대 동안 미판정으로 그림 vs 블로킹).
  → summary 초안: "워크스페이스 투영은 warm이 채운 불변 키 캐시와 세대 컨텍스트만
  읽어 동기 자식 프로세스를 띄우지 않고, 미스는 미판정으로 그린다"
