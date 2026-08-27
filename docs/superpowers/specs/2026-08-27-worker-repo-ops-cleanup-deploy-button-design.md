---
scope:
  - app/views/worker/repo-ops-timeline.js
  - app/views/worker/repo-ops-settings.js
  - app/views/worker/failure-labels.js
  - app/views/worker/parallel-analysis-dialog.js
  - app/views/worker/index.js
  - app/protocol.js
  - app/protocol.md
  - server/worker/repo-operation-coordinator.js
  - server/worker/resolution-ladder.js
  - server/worker/repair-session-adapter.js
  - server/worker/repo-operation-policy.js
  - server/worker/attach.js
  - server/worker/scheduler.js
  - server/worker/queue-store.js
  - server/worker/runtime.js
  - server/worker/scope-cache.js
  - server/ws/worker-handlers.js
  - server/ws/connection.js
  - server/ws/worker-parallel-analysis-handlers.js
  - app/main.js
  - server/worker/parallel-analysis-runner.js
  - server/worker/parallel-analysis-bundle.js
  - server/worker/parallel-analysis-runs.js
  - server/worker/parallel-analysis-store.js
  - server/worker/parallel-analysis-targets.js
  - server/worker/parallel-analysis-validator.js
  - generated/contracts/repo-operation-policy.json
  - generated/contracts/repo-operation-policy.provenance.json
---

# Worker 저장소 작업 정리 — AI 수리 경로·병렬성 분석 제거, 수동 배포 실행 버튼 (UI-s582)

## 배경

Worker 탭 저장소 작업 섹션은 검증/배포 스크립트 실패를 AI 세션으로 고치는 경로를
갖고 있다: 실패 카드의 해결 버튼 4종, `자동 해결` 토글, 해결 사다리
`script_retry → auto_repair_session → user_triggered_session`(UI-vobi). 별도로
큐 툴바에 병렬성 분석 다이얼로그(UI-04vo)가 있다.

실제 운영에서 AI가 개입해야 하는 저장소 작업은 **머지 충돌 해소 세션** 하나뿐이고,
이는 scheduler/merge-queue가 자동으로 디스패치하며 위 수리 경로와 코드가 분리돼
있다. 병렬성은 Monitor의 scope 겹침 칩(`queue-overlaps.js`)이 이미 처리한다.
반면 사람이 배포를 시작할 수단은 없다 — 프로토콜에 deploy 요청 메시지 자체가
없어서, `[deploy]` 활성화 착지(previous-base에 선언이 없어 자동 배포가 생기지
않는 첫 착지)는 운영자가 durable checkout에서 손으로 install해야 했다.

## 목표

1. 검증/배포 실패의 AI 수리 경로(버튼·토글·사다리 AI 단계·coordinator repair)를 제거한다.
2. `script_retry`(동일 스크립트 1회 자동 재실행)는 유지하되 토글 없이 항상 켜고,
   실패 카드가 **왜 죽었는지**(종료 원인, 재시도 결과)를 보여준다.
3. 병렬성 분석 기능을 코드·테스트·프로토콜에서 제거한다.
4. 저장소 작업 deploy 레인에 수동 **배포 실행** 버튼을 추가한다.
5. dotfiles의 `repo_operations.automation_policy` 계약을 같은 형태로 축소한다(크로스레포).

비목표: 충돌 해소 세션, Monitor scope 겹침 칩, 레인 스케줄링, `[verify]` 레인의
실행 의미는 바꾸지 않는다.

## 1. AI 수리 경로 제거

### UI
- `repo-ops-timeline.js` `operationActionsTemplate()`: `RESOLVE_LABELS` 기반 해결
  버튼(검증 실패 해결 / 검증 실패 해결 후 머지 / 배포 실패 해결 / 중단된 작업 진단 /
  실패 해결 세션 시작)과 "해결 세션 보기"를 제거한다. 남는 액션은 **기록 닫기**
  (`worker-repo-op__dismiss`) 하나. `cleanupEventTemplate()`의 "실패 해결 세션
  시작"도 제거한다.
- `repo-ops-settings.js`: `자동 해결` 토글(`saveAutoRepair`)과 "해결 사다리"
  (`resolutionLadder()`) 표시를 제거한다. 레인별 "이 workspace에서 실행" opt-out과
  스크립트 보기 버튼은 유지.
- `index.js`: `resolveRepoOperation()`과 해당 click 라우팅 제거.

### 프로토콜 (`app/protocol.js`, `app/protocol.md`)
- 제거: `worker-repo-operation-repair`, `worker-auto-repair-toggle`.
- `worker-queue-snapshot.repo_operations[]`: `repair` 객체와 `repair_eligible` 제거.
  `retry` 객체는 유지. `state` enum에서 `repairing` 제거.
- `repo_operation_policy` 투영은 새 schema(§5)를 그대로 전달한다.

### 서버
- `repo-operation-coordinator.js`: `startRepair`, `startRepairLocked`,
  `startCleanupRepairLocked`, `reconcileRepairsLocked`, repair chain/budget 계산,
  `ladder_stage` 기록 제거. `settleRepoOperation`은 `ladder_stage` 없이 종단
  `failed`만 기록한다.
- `repair-session-adapter.js` 삭제. `repo-operation-policy.js`의
  `isRepairEligible`, `repairSessionProhibitions` 삭제;
  `classifyRepoOperationFailure`는 실패 범주 표시에 쓰이므로 유지.
- `resolution-ladder.js`: `scriptIdentity`, `normalizeScriptRetry`,
  `scriptRetryApplicable`, `scriptRetryConsumptionKey`만 남기고
  `normalizeResolutionSubjects`, `resolutionAccess`의 session 단계, subject/stage
  계산을 제거한다.
- `attach.js` `startWorkerRepoOperationRepair`, `worker-handlers.js`
  `handleWorkerRepoOperationRepair`/`handleWorkerAutoRepairToggle` 제거.
- `scheduler.js`: `repairSessionPrompt` import와 수리 세션 디스패치 경로
  (`scheduler.js:5421` 부근)를 제거한다. 충돌 해소 세션 디스패치는 별도 경로이며
  건드리지 않는다.
- `queue-store.js`: `auto_repair` 정규화·저장, `repair` 객체 기록,
  `toggleAutoRepair`, `repairing` 상태 전이를 제거한다. **로드 시 정규화**는 이
  모듈의 스냅샷 로드 지점에서 수행한다: 저장된 `state: 'repairing'` operation은
  `failed`로, `repair` 객체와 `auto_repair` 키는 버린다. 마이그레이션 파일은 없다.
- `sanitizeOutput`(출력 비밀값 제거)은 `worker-handlers.js:83`이
  `repair-session-adapter.js`에서 가져온다. 삭제 전에 `server/worker/output-sanitize.js`로
  옮기고 기존 테스트를 함께 옮긴다 — 비밀값 제거 동작은 그대로 유지한다.

### 유지
충돌 해소 세션(`scheduler.resolveConflict`, `pr-actions.js`, `merge-queue.js`,
`running-grid.js` 충돌 배지)은 변경하지 않는다.

## 2. script_retry — 유지, 게이트 상수화, 원인 표시

- 재시도 조건·1회 한도·소비 키(`attempt_id`, `target_sha`, `script_identity`)·
  `retry_pending` 상태·`absorbed` 기록은 현재 그대로.
- 게이트: `resolutionAccess`에서 `auto_repair` 조건을 제거해
  `policy_supported && !dismissed && (running|retry_pending) && scriptRetryApplicable`
  로 줄인다. `retry_blocked_reason`에서 `auto_repair_off` 값이 사라지고
  `schema_unsupported`만 남는다.
- 실패 카드(`repo-ops-timeline.js`)에 두 줄을 추가한다. 렌더 전용이며 투영 카드
  (`projectRepoOperations` 출력, `protocol.md` `repo_operations[]`)의 기존 필드만
  쓴다: operation 최상위 `exit_code`, `signal`, `elapsed_ms`와 `failure.code`,
  `retry.status`, `retry.blocked_reason`, `retry.first_fingerprint`,
  `retry.absorbed`, `failure.fingerprint`.
  - **종료 원인**: `exit 1 · 42s`(exit_code 있음) / `signal SIGKILL · 3m 10s` /
    `타임아웃 <timeout_ms/1000>s 초과`(`failure.code === 'timeout'`) /
    `종료 기록 없음 — 중단됨`(`failure.code === 'interrupted'` 또는
    `interrupted_without_terminal_exit`). 선언/대기 단계 실패
    (`repo_operation_timeout_unresolved`, `repo_ops_*`)는 스크립트가 돌지 않았으므로
    기존 원인 문장만 쓰고 이 줄은 생략한다. 판정 순서: timeout → interrupted →
    signal → exit_code; 아무 필드도 없으면 줄 생략.
  - **재시도 결과**: 판정 순서는 `retry.blocked_reason` 우선이다.
    `retry.blocked_reason`이 있으면 `자동 재시도 못 함 — <사유>`
    (`schema_unsupported`; 실행 전에 막힌 경우로 fingerprint 비교를 하지 않는다);
    `absorbed`면 `자동 재시도로 해소됨 — 첫 실패: <원인>`(성공 카드에 표시);
    `consumed`이고 `failure.fingerprint === retry.first_fingerprint`면
    `자동 재시도 1회 — 같은 실패`; `consumed`이고 다르면
    `자동 재시도 1회 — 다른 실패: <원인>`; `not_applicable`이면
    `재시도 대상 아님 — 스크립트 실행 전 실패`. 문구는 `failure-labels.js`에
    추가해 카드·스트립·세션 배너가 같은 어휘를 쓴다.

## 3. 배포 실행 버튼

### 위치
`repo-ops-settings.js` deploy 레인, 스크립트 보기 버튼 옆에 **배포 실행** 버튼.
`repo_ops.deploy` 선언이 없거나 워크스페이스 deploy opt-out이면 렌더하지 않는다.
in-flight deploy(queued/running/retry_pending)가 있으면 비활성 + 툴팁
`배포 진행 중`.

### 프로토콜
- 클라이언트 → 서버: `worker-repo-operation-deploy-run { repo_id }`. 대상 SHA 입력은
  없다.
- 응답: `{ ok: true, operation_id }` 또는 `{ ok: false, reason }`; `reason` ∈
  `deploy_not_declared` · `deploy_opted_out` · `deploy_in_flight` ·
  `target_unresolved`(fetch 실패) · `remote_history_not_monotonic`.

### 서버 (`attach.js` `startWorkerRepoOperationDeployRun` → coordinator `runManualDeploy()`)
1. **대상 권한**: 등록된 attachment의 base resolver(`attach.js` `resolveBase` →
   `target-base.js`)가 remote·base·fetched tip SHA를 한 번에 핀한다
   (`resolveBase({ force: true })`, bounded fetch, 기존 deploy 경로와 같은 타임아웃).
   `origin`을 가정하지 않는다. resolver 실패는 `target_unresolved`.
2. 정책·스크립트는 **그 tip의** `repo-ops/config.toml`과 script blob에서 읽는다.
   이것이 previous-base 규칙의 유일한 예외이며, 수동 경로에만 적용된다. 근거: 이
   tip은 이미 `<remote>/<base>`에 착지(리뷰·머지 완료)된 커밋이므로 "리뷰 안 된
   스크립트가 자신을 실행"하는 구멍이 아니다.
3. 가드: 선언 없음 → `deploy_not_declared`; opt-out → `deploy_opted_out`; 같은 repo에
   queued/running/retry_pending deploy → `deploy_in_flight`.
4. **ancestry**(repo-operation lock 안에서 deploy 워크트리 HEAD와 tip을 비교):
   - HEAD == tip, tip이 HEAD의 조상(이미 배포된 tip), HEAD가 tip의 조상(정상 전진)
     — 모두 **허용**. 수동 경로는 `superseded` 단락으로 끝내지 않고 tip으로 정렬한
     뒤 실행한다(재배포 의도).
   - 양쪽 모두 조상이 아님 → `remote_history_not_monotonic`으로 거부.
   - ancestry 판정 자체가 실패(git 오류) → `target_unresolved`, fail-closed.
5. **실행 식별자**: 자동 경로의 `operationId()`는 (repo, target_base, target_sha,
   effective_base_sha, script) 해시라 같은 tip의 두 번째 수동 실행이 기존 종단
   기록을 adopt해 버린다. 수동 실행은 `operationId()` 입력에
   `manual_run_id`(서버가 lock 안에서 발급하는 단조 증가 시퀀스)를 추가해 **매 요청이
   새 operation**이 된다. 이전 수동/자동 operation은 `superseded_by`로 연결한다.
6. `ensureDeploy(subject)`로 큐에 넣는다.
   `subject = { source: 'manual', manual_run_id, target_sha, target_base, policy_source: 'target_tip' }`.
   이후 lock·정렬·스크립트 실행·readback·script_retry·실패 표시는 자동 경로와 동일.
7. operation 카드에 `수동` 배지를 붙인다(`source: 'manual'`).

## 4. 병렬성 분석 제거

- 삭제(클라이언트): `index.js`의 `.worker-analysis-btn`(✳ 병렬성)과 다이얼로그
  wiring, 제안 오버레이/칩(`index.js` 3336-3345 부근),
  `app/views/worker/parallel-analysis-dialog.js`, **`app/main.js`의 `analysisStore`
  생성·구독·Worker 뷰 주입**.
- 삭제(서버): `parallel-analysis-runner.js` · `parallel-analysis-bundle.js` ·
  `parallel-analysis-runs.js` · `parallel-analysis-store.js` ·
  `parallel-analysis-targets.js` · `parallel-analysis-validator.js`,
  **`server/ws/worker-parallel-analysis-handlers.js`와 그 테스트**,
  **`server/ws/connection.js`의 분석 메시지 분기**, **`server/worker/runtime.js`의
  분석 store/run 전역 상태**, 관련 프로토콜 메시지와 `protocol.md` 절, 테스트.
- **선행 이동**: `scope-cache.js:23`이 `parallel-analysis-targets.js`의 `scopeAtBase`를
  Monitor 겹침 칩 계산에 쓴다. `scopeAtBase`(와 그 테스트)를
  `server/worker/scope-at-base.js`로 먼저 옮기고 `scope-cache.js` import를 바꾼 뒤
  분석 모듈을 삭제한다. 이 순서를 지키지 않으면 유지 대상인 Monitor 칩이 깨진다.
- `placeIntoSameSerialLane`은 scope 겹침 칩의 "같은 레인에 두기"
  (`.mon-overlap__place`) 호출자가 있으므로 유지한다. 분석 제안 오버레이에서 이
  함수로 이어지던 경로만 제거한다.
- Monitor scope 겹침 칩(`queue-overlaps.js`, UI-251y)은 별개 기능이며 손대지 않는다.

### 은퇴 문서 (파일은 그대로 두고 이력으로 남긴다)
- `docs/superpowers/specs/2026-08-12-worker-parallelism-analysis-design.md`,
  `docs/superpowers/plans/2026-08-12-worker-parallelism-analysis.md` (UI-04vo)
- `docs/superpowers/specs/2026-08-18-parallel-analysis-codex-runner-design.md`
- `docs/superpowers/specs/2026-08-19-parallel-analysis-observability-design.md`
- `docs/superpowers/specs/2026-08-20-parallel-analysis-scope-signal-design.md`
- `docs/superpowers/specs/2026-08-13-worker-repo-operation-auto-repair-design.md`,
  `docs/superpowers/plans/2026-08-13-worker-repo-operation-auto-repair.md` (UI-vobi;
  coordinator·deploy 워크트리·RepoOperation journal 설계는 유효, repair 사다리
  절만 은퇴)
- `docs/superpowers/specs/2026-08-14-repo-ops-ui-redesign-design.md` (UI-q0uy)의
  §4.2 해결 버튼 절만 은퇴, 나머지 유효.

## 5. 크로스레포 — dotfiles 계약 축소

beads-ui는 `generated/contracts/repo-operation-policy.json`을 핀된 계약 사본으로
읽으므로 dotfiles 변경이 **먼저** 착지해야 한다.

- `docs/contracts/workflow-state.yaml repo_operations.automation_policy`:
  `resolution_ladder`를 `script_retry` 한 단계로 줄이고, `auto_repair`
  (default/scope/resolution_subject), `completion_chain`의 repair 관련 항목,
  `repair_session_packet`, `resolution_entry_surface`를 제거한다.
  `never_automatic`은 `bounded_single_script_retry_exceeded`를 유지한다.
  `schema_version`을 3으로 올린다.
- `docs/contracts/workflow-contract.md` "Repo operations and deployment"의
  `script_retry → auto_repair_session → user_triggered_session` 문구를
  `script_retry`(1회) 뒤 종단 `failed`·수동 재실행으로 바꾼다.
- `generated/contracts/repo-operation-policy.json` 재생성, 계약 checker와 테스트,
  스킬 alias 갱신(`docs/contracts/contract-maintenance.md` 절차).
- beads-ui의 핀된 사본은 **JSON과 provenance를 원자적으로** 다시 핀한다:
  `generated/contracts/repo-operation-policy.json` bytes와
  `generated/contracts/repo-operation-policy.provenance.json`의 `source_commit`
  (dotfiles-us9w 착지 SHA), `source_blob_sha`, `sha256`, `bytes`를 같은 커밋에서
  갱신하고, `repo-operation-policy.test.js`의 `APPROVED_SOURCE_COMMIT`과 digest
  고정값을 새 값으로 바꾼다.
- beads-ui `repo-operation-policy.js`는 `schema_version: 3`을 읽고, 2는
  `schema_unsupported`로 처리한다. **착지 순서와 중단 안전성**: dotfiles-us9w가 먼저
  착지하고, beads-ui PR은 새 사본을 핀한 상태로 착지한다. 만약 beads-ui가 schema 3
  코드로 배포됐는데 핀된 사본이 아직 2라면 `policySupported()`가 false가 되어
  script_retry는 `schema_unsupported`로 막히고 수동 배포 실행은 정책 없이 거부된다
  (fail-closed) — 자동 deploy 자체는 정책 무관하게 계속 돈다. 반대로 사본만 3이고
  코드가 2를 기대하는 상태는 같은 PR에서 함께 바뀌므로 발생하지 않는다.

## 구현 unit 후보
- `ui-remove`: §1 UI·프로토콜 + §4 클라이언트 (app/views/worker, app/main.js,
  app/protocol.*)
- `server-remove`: §1 서버 + §2 게이트 + §4 서버 (server/worker/
  repo-operation-coordinator.js, resolution-ladder.js, repair-session-adapter.js →
  output-sanitize.js, scheduler.js, queue-store.js, runtime.js, scope-cache.js →
  scope-at-base.js, server/ws/worker-handlers.js, connection.js,
  worker-parallel-analysis-handlers.js)
- `deploy-run`: §3 (server/worker/repo-operation-coordinator.js runManualDeploy,
  attach.js, worker-handlers.js, repo-ops-settings.js)
- `failure-display`: §2 카드 표시 (repo-ops-timeline.js, failure-labels.js)

## 검증
- 제거된 기능의 테스트 파일 삭제 후 `npm test` 전체 green:
  `repo-ops-timeline.test.js`, `failure-labels.test.js`, `repo-operations.test.js`,
  `index.test.js`(해결 버튼·병렬성 케이스 제거), `repo-operation-coordinator.test.js`
  · `repo-operation-repair.test.js`(삭제) · `resolution-ladder.test.js` ·
  `repair-session-adapter.test.js`(삭제) · `repo-operation-policy.test.js` ·
  `repo-operation-protocol.test.js`, `parallel-analysis-*.test.js`(삭제).
- 이동 후 유지 테스트: `output-sanitize`(구 `sanitizeOutput`), `scope-at-base`
  (구 `scopeAtBase`), `queue-store.test.js`·`scheduler.test.js`의 수리 케이스 제거.
- 신규 테스트:
  - `worker-repo-operation-deploy-run` 핸들러: 가드 3종, resolver로 핀한 tip의 정책
    읽기(previous-base 아님), ancestry 세 허용 케이스·양방향 비조상 거부·판정 오류
    `target_unresolved`, **같은 tip에서 연속 두 번 요청 시 두 operation 모두 실행**
    (두 번째는 첫 번째 종료 후), `source: 'manual'`·`manual_run_id` 기록.
  - 실패 카드 종료 원인/재시도 결과 줄 렌더: 서버 `projectRepoOperations` 실제 출력
    형태로 exit/signal/`timeout`/interrupted, `blocked_reason` 우선, consumed
    동일·상이/absorbed/not_applicable.
  - coordinator: `auto_repair` 없이 script_retry가 `retry_pending`으로 가고 1회 후
    `failed`로 종단; queue-store 로드 시 `repairing` → `failed` 정규화, `repair`·
    `auto_repair` 키 폐기.
  - `repo-operation-policy.js`: schema 3 수용, 2 거부; provenance `source_commit`·
    digest 고정값 일치.
- 라이브: Mac Studio beads-ui 재배포 후 dotfiles 워크스페이스에서 배포 실행 1회 →
  operation 카드 `수동` 배지 + succeeded readback.

## 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | blocks 대상 | Bead ID |
|---|---|---|---|---|---|
| 형제 | dotfiles | awaited_by_consumer | 다른 Git 저장소의 계약·checker·generated 산출물 변경(§5); beads-ui가 새 schema를 소비하므로 선행 착지 필요 | UI-s582 | dotfiles-us9w |
