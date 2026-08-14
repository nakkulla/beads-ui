# 정리 stale 실패 기록 가드 수정과 후손 배포 coverage의 durable superseded 전이

- Bead: UI-b9f4 (UI-0csp 통합 흡수, 2026-08-14)
- Route: spec_backed · 호스트 유닛 `bead:UI-b9f4` + dotfiles `enclosed:UI-b9f4`
- 서버 코드 인용 base: beads-ui `origin/main` = `572c85c404a5d50b58152d80996eda5fff290057`
  (서버 코드는 UI-b9f4 description 기준 base `ddb218bb98`과 동일 — 사이 3커밋은
  docs/assets만 변경)
- 순서 제약: **UI-q0uy(저장소 작업 UI 재설계, in_progress) 랜딩 이후에 구현**한다.
  Beads에 `UI-b9f4 blocks-의존 UI-q0uy`로 고정했다. 프론트 표시 변경은 재설계된
  표면 위에 적용하며, 이 문서의 프론트 절은 줄 번호가 아니라 술어 수준으로만
  규정한다.

## 1. 문제

두 결함 모두 "나중의 성공이 앞의 실패 기록을 정리하지 못해 stale 실패가 영구
잔존"하는 Worker 정리/operation 영역 결함이다. 상세 진단·실측은 UI-b9f4
description §1(가드)과 §6(coverage)이 소유하며 이 문서는 반복하지 않는다.

1. **정리 가드**: `server/worker/pr-actions.js` `closeCoveredRow`(:1325)의 손
   나열 가드가 `base_containment` 실패 기록의 통과 경로를 갖지 않아, 재시도가
   전부 성공해도 기록이 지워지지 않고 Bead close가 영구 차단되며 [정리] 클릭마다
   deploy가 재실행된다. 원인은 정본 `CLEANUP_STEPS`(:77)와 손 나열의 드리프트다.
2. **deploy coverage**: 후손 SHA 배포가 terminal success에 도달해도 ancestor
   대상의 terminal failed deploy 행이 덮이지 않는다. coverage 판정
   (`repo-operation-coordinator.js:852` `deploymentEvidence`)은 bead cleanup
   경로의 조회 시점 판정일 뿐 아무것도 기록하지 않고, 쓰기 API
   `supersedeRepoOperation`(`queue-store.js:3675`)은 프로덕션 호출처가 0곳이다.
   라이브 실례: beads-ui workspace 행 `f937ab33239f`(failed, target_sha=null,
   effective_base_sha=`beb269d9`)가 후손 `c062a0ea`·`ddb218bb` 배포 성공 후에도
   `superseded_by=null`로 남아 '해결 필요' 집계에 잡힌다.

## 2. 계약 고정점

- 성공한 재시도는 자기 앞의 실패 기록을 남기지 않는다 (가드).
- Worker automatic enum `descendant_success_covers_ancestor_rows`(dotfiles 소유):
  같은 repo·kind에서 후손 SHA 배포가 terminal success에 도달하면 ancestor 대상의
  실패 행은 자동으로 덮여 해결 필요 집계에서 빠진다 (coverage).

## 3. 설계

### 3.1 가드 수정 — CLEANUP_STEPS 위치 파생 (확정안 A)

`closeCoveredRow`의 손 나열(`closure_steps` 배열 + `!== 'repo_operations'`
특례)을 정본 `CLEANUP_STEPS` 위치 기반 판정으로 교체한다.

- closure 경계는 `child_sweep`이다: `CLEANUP_STEPS.indexOf(prior_failure.step)
  >= CLEANUP_STEPS.indexOf('child_sweep')`인 실패만 `resume_failure` 없이 차단.
- pre-closure 실패(`base_containment`, `repo_operations`)는 가드를 통과시켜 기존
  `clearCleanupFailure` 호출(:1353)이 기록을 지우게 한다. `repo_operations`
  특례의 기존 의미는 보존되고 `base_containment`가 같은 등급으로 합류한다.
- `resume_index` 계산 등 closure 재개 로직은 동일 파생 목록을 쓰되 동작 불변.
- 스토어 API·durable schema 변경 없음. `resumeRepoOperations`(:2425)의
  `!cleanup_failed[bead_id]` 필터는 의도된 설계로 변경하지 않는다.

### 3.2 superseded 전이 — terminal 정착 시점 sweep (확정안 a)

`repo-operation-coordinator.js`에 `sweepDescendantCoverage(workspace,
operation_id)`를 신설하고, terminal 정착 두 경로 — `settleFailure`(:194 인접)와
`settleFromMarker` 성공 분기(:255 인접) — 직후에 호출한다. 재시작
adoption·reconcile 정착도 같은 경로를 지나므로 별도 훅이 없다.

- **정방향**: 정착된 operation이 `kind=deploy`·`state=succeeded`이면, 같은
  workspace·repo의 `kind=deploy`·`state=failed`·`superseded_by=null` 행 F마다
  `ancestor_ref = F.target_sha ?? F.effective_base_sha`로
  `git merge-base --is-ancestor <ancestor_ref> <succeeded.target_sha>`가 성립할
  때 `supersedeRepoOperation(F → succeeded operation_id)`를 기록한다.
- **역방향**: 정착된 operation이 `kind=deploy`·`state=failed`이면, 기존
  `state=succeeded`·`target_sha` 보유 행들을 상대로 같은 판정을 돌려 이미 덮인
  채 늦게 실패한 행을 즉시 superseded 처리한다(순서 꼬임 케이스).
- 제외·불변 조건: `repairing` 행은 sweep 대상이 아니다(활성 repair 세션 소유).
  기존 `superseded_by`는 덮지 않는다(스토어가 이미 거부하며 sweep은 멱등).
  같은 SHA의 성공은 같은 SHA의 실패를 덮는다(`--is-ancestor`는 동일 SHA에
  참). ancestry 판정 불가(모르는 SHA, git 오류)는 fail-quiet로 그 행만
  건너뛴다 — 행은 남고 다음 성공 정착 때 재시도된다.
- 덮인 행의 repair chain/budget은 **소멸**한다: 계승도 환불도 없다.
  `superseded_by` 기록 외에 repair 필드는 건드리지 않으며, 행은 감사용으로
  `failed` 상태 그대로 남는다.
- **auto repair 상호작용**: superseded 행은 자동 repair 대상이 아니다. repair
  디스패치 게이트(coordinator :1118 인접의 `isRepairEligible` 판정 지점)와
  카드 투영 `repair_eligible`(`worker-handlers.js:1000`)에 `superseded_by`
  없음 조건을 추가한다 — `auto_repair` 재-ON reconcile(:1203)이 이미 덮인
  행에 repair session을 낭비 디스패치하지 않게 한다. `isRepairEligible`
  자체(정책 분류 술어)는 변경하지 않는다.
- 범위는 `kind=deploy`뿐이다. verify 행은 PR head에 결속되어 후손 커버 의미가
  다르므로 범위 밖으로 명시한다.
- 소급 backfill 없음: 기존 failed 행(`f937ab33` 등)은 다음 deploy 성공 정착
  시점의 정방향 sweep이 자연히 덮는다. 이 유닛의 PR을 서버 [머지] lane으로
  머지하면 그 배포 성공이 UI-b9f4 §2의 미충족 수용 기준(non-bootstrap deploy
  row)과 이 커버 증거를 동시에 만든다.

### 3.3 프론트 표시 (UI-q0uy 랜딩 이후 표면)

- 해결 필요(미해제) 술어를 `state=failed(또는 repairing 포함 기존 술어) &&
  dismissed 아님 && superseded_by 없음`으로 확장한다 — UI-q0uy가 도입하는
  수동 dismiss 제외와 병렬인 **자동 제외** 축이다. 패널/스트립 강제 expand
  집계와 실패 타일 노출 모두 같은 단일 술어를 쓴다.
- superseded 행은 목록/타임라인에서 '후속 배포로 덮임' + successor operation
  참조로 표시한다(감사 가능, 행동 버튼 없음). 구체 마크업·용어는 랜딩된
  UI-q0uy 표면의 어휘를 따른다.
- 서버 `ws/worker-handlers.js`의 `superseded_by` 필드 매핑은 이미 있으므로
  변경하지 않되, `repair_eligible` 카드 투영은 §3.2대로 `superseded_by` 없음
  조건을 추가로 얻는다.

### 3.4 dotfiles enclosed 유닛 (`.worktrees/.enclosed-UI-b9f4` 직접 랜딩)

1. **pr-finish 인터림 deploy 예외 은퇴**: `docs/contracts/workflow.md:249`의 은퇴
   조건 2개(merged row에서 Worker deploy enqueue, target SHA 키잉)는 UI-b9f4
   description §2에서 충족 확인됨. `docs/contracts/workflow.md`,
   `src/shared/skills/review/pr-finish/SKILL.md`,
   `src/shared/skills/review/pr-finish/references/workflow.md` + `generated/`
   렌더 + 관련 checker/test를 함께 정합한다.
2. **lh9k 잔여**: 서버 lane을 타지 않는 머지 경로(bootstrap CLI, github.com 직접
   머지)의 로컬 base ff-sync를 편의 등급(런타임 미적용 아님)으로 계약 문구에
   명문화한다.
3. **enum 문구 정정**: `descendant_success_covers_ancestor_rows`가 durable
   `superseded_by` 전이·terminal failed 행 포함·`target_sha ?? effective_base_sha`
   비교를 정확히 서술하도록 필요한 최소 정정.

## 4. 오류 처리

- sweep의 git 판정 실패는 해당 행만 건너뛰고 정착 흐름을 막지 않는다. sweep
  자체의 예외는 정착 결과를 되돌리지 않는다(정착이 진실, coverage는 부가).
- `supersedeRepoOperation`의 거부(이미 superseded)는 정상 멱등 경로다.
- 프론트는 계약 키 부재 시 fail-quiet(AGENTS.md).

## 5. Test scope

RED-GREEN seam은 아래 일곱이다. 구현 코드를 테스트에 맞춰 변형하지 않는다.

1. `server/worker/pr-actions.test.js` — base fetch 실패로
   `cleanup_failed{step:'base_containment'}` 기록 → 재시도 전 단계 성공 →
   `closeCoveredRow` ok + 기록 제거. 기존 base_containment 실패 실증 2케이스는
   유지한다.
2. coordinator 테스트 — deploy 성공 정착이 ancestor failed 행(`target_sha`
   보유)을 superseded 처리한다.
3. coordinator 테스트 — `target_sha=null`·`effective_base_sha` 보유 행이
   effective_base_sha 비교로 덮인다 (f937ab33 재현 케이스).
4. coordinator 테스트 — 역방향: 이미 성공한 후손이 있는 채 늦게 failed로
   정착한 행이 즉시 덮인다. `repairing` 행과 기존 `superseded_by` 행은
   불변이다.
5. 프론트 테스트 — 미해제 집계가 `superseded_by` 행을 제외하고 강제 expand가
   발생하지 않는다 (UI-q0uy 랜딩 후 표면 기준).
6. coordinator 테스트 — `superseded_by`가 기록된 failed 행은 `auto_repair`
   ON·eligible 실패 분류여도 자동 repair 디스패치 게이트에서 거부된다.
7. worker-handlers 테스트 — `superseded_by` 행의 카드 투영이
   `repair_eligible=false`다.

## 6. 수용 기준

1. §5 테스트 green + Pre-Handoff 전체(tsc/test/lint/prettier:write/build,
   `app/main.bundle.js{,.map}` 포함).
2. PR을 **서버 [머지] lane**으로 머지: beads-ui workspace에 non-bootstrap
   deploy row가 생성되고(UI-b9f4 §2 수용 기준), 그 성공 정착의 sweep이
   `f937ab33239f`를 `superseded_by=<신규 성공 op>`로 덮은 것을 queue.json에서
   확인하며, 레포 오퍼레이션 패널의 강제 expand가 사라진다.
3. deploy operation terminal success + Post-Merge Runtime Validation(프로세스
   경로·포트·`/healthz` SHA) 통과.
4. dotfiles enclosed: 계약 checker/test green, `target_base` 직접 랜딩 +
   exact-SHA readback, beads-ui 통합 diff와 함께 implementation 게이트 union
   리뷰.

## 7. 범위 밖

- verify kind로의 coverage 확장.
- `resumeRepoOperations` 필터 변경([정리] 클릭 = 유일 재시도 트리거 설계 유지).
- `land-reviewed-artifact.py` caller-checkout 불변 설계 변경 (lh9k에서 기각).
- 기존 잔재 4행과 미정리 브랜치(dotfiles `dotfiles-3vb8`, beads-ui
  `origin/UI-f17c`) 정리 — UI-b9f4 §5대로 수정 대상 아님.
- UI-q0uy가 소유한 재설계 표면 자체의 변경(우리는 술어 확장과 덮임 표시만
  얹는다).
