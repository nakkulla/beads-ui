# 정리 stale 실패 기록 가드 수정과 후손 배포 coverage의 durable superseded 전이

- Bead: UI-b9f4 (UI-0csp 통합 흡수, 2026-08-14)
- Route: spec_backed · 호스트 유닛 `bead:UI-b9f4` + dotfiles `enclosed:UI-b9f4`
- 코드 인용 base: beads-ui `origin/main` = `f1b7020fe48dabd6f6ddf90f0ab9849ab16e87cf`
  (UI-q0uy PR #135 머지 직후). `pr-actions.js`와 `repo-operation-policy.js`는
  UI-q0uy가 건드리지 않았으므로 §3.1 앵커는 이전 base와 동일하다.
- 순서 제약 해소: **UI-q0uy는 `f1b7020`으로 랜딩 완료(Bead closed)**. 이 문서의
  프론트 절은 더 이상 술어 수준 유보가 아니라 랜딩된 표면의 확정 앵커를 쓴다.
  Beads의 `UI-b9f4 blocks-의존 UI-q0uy`는 충족됐다.
- dotfiles 계약 앵커는 그 저장소가 독립적으로 움직이므로 줄 번호가 아니라 식별
  문구로 지정한다(§3.4).

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
   (`repo-operation-coordinator.js:928` `deploymentEvidence`)은 bead cleanup
   경로의 조회 시점 판정일 뿐 아무것도 기록하지 않고, 쓰기 API
   `supersedeRepoOperation`(`queue-store.js:2913`)은 프로덕션 호출처가 0곳이다
   (유일한 `superseded_by` 쓰기는 repair chain 계승 `inheritRepoOperationChain`
   `:2723`). 라이브 실례: beads-ui workspace 행 `f937ab33239f`(failed,
   target_sha=null, effective_base_sha=`beb269d9`)가 후손 `c062a0ea`·`ddb218bb`
   배포 성공 후에도 `superseded_by=null`로 남아, UI-q0uy 재설계 후에도 상태
   스트립의 `해결 필요` 집계(`app/views/worker/lanes.js:115-118`)에 잡히고
   타임라인에서 행동 버튼을 단 `실패` 행으로 렌더된다.

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
operation_id)`를 신설하고, terminal 정착 두 경로 — `settleFailure`(:265, 스토어
호출 :270)와 `settleFromMarker`(:302) 성공 분기의 스토어 호출(:331) — 직후에
호출한다. 재시작 adoption·reconcile 정착도 같은 경로를 지나므로 별도 훅이 없다.

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
  디스패치 게이트 `startRepairLocked`(coordinator :1172-1262)에 `superseded_by`
  없음 조건을 추가하고 — `state !== 'failed'` 거부(:1181)와 같은 등급의
  양 모드 공통 거부로, `auto_repair` 검사(:1191)·`isRepairEligible`
  검사(:1194)보다 앞에 둔다 — 카드 투영 `repair_eligible`
  (`worker-handlers.js:997`)에도 같은 조건을 얹는다. 이미 덮인 행에 자동·수동
  repair session이 낭비 디스패치되지 않게 하는 것이 목적이다.
  `isRepairEligible` 자체(정책 분류 술어, `repo-operation-policy.js:145`)는
  변경하지 않는다.
- 범위는 `kind=deploy`뿐이다. verify 행은 PR head에 결속되어 후손 커버 의미가
  다르므로 범위 밖으로 명시한다.
- 소급 backfill 없음: 기존 failed 행(`f937ab33` 등)은 다음 deploy 성공 정착
  시점의 정방향 sweep이 자연히 덮는다. 이 유닛의 PR을 서버 [머지] lane으로
  머지하면 그 배포 성공이 UI-b9f4 §2의 미충족 수용 기준(non-bootstrap deploy
  row)과 이 커버 증거를 동시에 만든다.

### 3.3 프론트 표시 (UI-q0uy `f1b7020` 표면 확정 앵커)

UI-q0uy가 강제 expand 자체를 제거했으므로(패널이 `<details ?open>`에서 드로어를
여는 `<button>`으로 대체됨) **expand는 더 이상 이 유닛의 증상도 결과도 아니다**.
남은 결함은 집계와 렌더 두 곳이다.

1. **상태 스트립 집계** — `app/views/worker/lanes.js` `repoOpsStripModel`
   (:91-141)의 `unresolved`(:115-118)는 현재
   `card.state === 'failed' && !card.dismissed`다. 여기에 `&& !card.superseded_by`
   를 더한다. UI-q0uy가 도입한 수동 `dismissed`(사람이 접수) 제외와 병렬인
   **자동 제외** 축이다. 이 술어는 스트립 배지 수만 지배하며, 타임라인 행별
   렌더는 아래 2가 따로 규정한다(두 곳 모두 `superseded_by`를 읽지만 게이트는
   별개다). `repairing`은 이 집계에 들어가지 않고 별도 배지(:119-121)이므로
   변경 대상이 아니다 — §3.2가 `repairing` 행을 sweep에서 제외하는 것과 정합한다.
2. **타임라인 렌더** — `app/views/worker/repo-ops-timeline.js`:
   - superseded 행은 상태가 여전히 `failed`이므로 `stateWordOf`(:141-157)의
     `실패`를 **대체하지 않고**, `dismissed`의 `접수됨` 칩(:314-316)과 같은
     자리·같은 quiet 톤(`toneOf` :121-133)으로 `덮임` 칩을 **추가**한다. 실패
     사실과 덮인 사실이 둘 다 읽혀야 감사 경로가 보존된다. 한 행이 dismissed와
     superseded를 동시에 만족하면 두 칩이 함께 나온다.
   - `operationActionsTemplate`(:220-272)의 노출 게이트
     (`state !== 'failed' || operation.dismissed`, :221)에 `|| operation.superseded_by`
     를 더해 덮인 행에서 `자동 해결 세션 시작`·`기록 닫기` 버튼을 없앤다.
     이미 후속 배포가 덮은 행에 사람이 쓸 행동이 없기 때문이다.
   - 원시 실패 코드·script·로그의 `세부` 접힘은 그대로 남긴다(감사 경로 보존).
3. **서버 투영** — `projectRepoOperations`(`ws/worker-handlers.js:928-1021`)의
   `superseded_by` 필드 매핑(:1008)은 이미 있으므로 변경하지 않는다.
   `repair_eligible`(:997)만 §3.2대로 `superseded_by` 없음 조건을 추가로 얻는다.

### 3.4 dotfiles enclosed 유닛 (`.worktrees/.enclosed-UI-b9f4` 직접 랜딩)

dotfiles는 독립적으로 움직이므로 아래 앵커는 줄 번호가 아니라 식별 문구다
(2026-08-14 dotfiles `e0156fcc` 기준 위치를 참고로만 병기).

1. **pr-finish 인터림 deploy 예외 은퇴**: `docs/contracts/workflow.md`의
   "One bounded interim exception applies to that tail…" 문단(현재 :275)이 스스로
   명시한 은퇴 조건 2개 — Worker가 관측된 merged row에서 deploy를 enqueue할 것,
   adoption을 target SHA로 키잉하거나 gate할 것 — 은 UI-b9f4 description §2에서
   충족 확인됐다. 그 문단과 이를 참조하는 pr-finish 표면을 함께 은퇴시킨다:
   `src/shared/skills/review/pr-finish/SKILL.md`의 "except the bounded interim
   deploy lane" 문장(현재 :57), 그리고
   `src/shared/skills/review/pr-finish/references/workflow.md`의 인터림 레인
   서술 5곳(현재 :121, :125, :129, :133, :146 — 특히 :146 "Session fallback
   deploy" 단계 전체) + `generated/` 렌더 + 관련 checker/test.
   **:133은 부분 은퇴다**: 그 항목은 두 문장이 섞여 있어, 첫 문장(prior success의
   `target_sha`가 머지를 포함하면 `descendant_success_covers_ancestor_rows`로
   closure 충족)은 일반 coverage라 **남기고 아래 3에서 정정**하며, 둘째
   문장(linked Bead의 interim-fallback note가 동등하게 충족)만 은퇴시킨다.
2. **lh9k 잔여**: 서버 lane을 타지 않는 머지 경로(bootstrap CLI, github.com 직접
   머지)의 로컬 base ff-sync를 편의 등급(런타임 미적용 아님)으로 계약 문구에
   명문화한다.
3. **enum 의미 서술 정정**: `descendant_success_covers_ancestor_rows`는
   `docs/contracts/workflow.yaml`의 `automation_policy.worker_automatic`
   목록(현재 :856)에 **토큰만** 있고 그 yaml에는 의미 서술이 없다. 실제 의미를
   서술하는 곳은 pr-finish `references/workflow.md`의 "Existing evidence first"
   단계(현재 :133)로, 현재는 *조회 시점* coverage("a prior success whose
   `target_sha` already contains the merge satisfies closure")로만 읽힌다. 이
   유닛이 durable `superseded_by` 전이를 도입하므로, 그 서술이 (a) 전이가 durable
   기록이라는 점, (b) terminal failed 행도 대상이라는 점, (c) 비교 키가
   `target_sha ?? effective_base_sha`라는 점을 포함하도록 최소 정정한다. 새 계약
   어휘를 만들지 않으며 토큰 이름은 그대로 둔다.

## 4. 오류 처리

- sweep의 git 판정 실패는 해당 행만 건너뛰고 정착 흐름을 막지 않는다. sweep
  자체의 예외는 정착 결과를 되돌리지 않는다(정착이 진실, coverage는 부가).
- `supersedeRepoOperation`의 거부(이미 superseded)는 정상 멱등 경로다.
- 프론트는 계약 키 부재 시 fail-quiet(AGENTS.md).

## 5. Test scope

RED-GREEN seam은 아래 여덟이다. 구현 코드를 테스트에 맞춰 변형하지 않는다.

1. `server/worker/pr-actions.test.js` — base fetch 실패로
   `cleanup_failed{step:'base_containment'}` 기록 → 재시도 전 단계 성공 →
   `closeCoveredRow` ok + 기록 제거. 기존 base_containment 실패 실증 2케이스는
   유지한다.
2. `server/worker/repo-operation-coordinator.test.js` — deploy 성공 정착이
   ancestor failed 행(`target_sha` 보유)을 superseded 처리한다.
3. 같은 파일 — `target_sha=null`·`effective_base_sha` 보유 행이
   effective_base_sha 비교로 덮인다 (f937ab33 재현 케이스).
4. 같은 파일 — 역방향: 이미 성공한 후손이 있는 채 늦게 failed로 정착한 행이
   즉시 덮인다. `repairing` 행과 기존 `superseded_by` 행은 불변이다.
5. `app/views/worker/lanes.test.js` — `repoOpsStripModel`(기존 describe
   `'repoOpsStripModel (UI-q0uy §4.1)'`, :323)에 `superseded_by` 행이
   `unresolved`에서 빠지는 케이스를 더한다. 기존 dismissed 제외 케이스(:390-391)와
   `repairing` 우선순위 케이스(:404-413)는 유지한다.
6. `app/views/worker/repo-operations.test.js` — superseded 행이 타임라인에
   `덮임` 칩을 달고 행동 버튼(`자동 해결 세션 시작`·`기록 닫기`)을 내지 않는다.
   `stateWordOf`·`operationActionsTemplate`은 모듈 밖으로 export되지 않으므로
   기존 dismiss 버튼 렌더·클릭 테스트(:545-598)와 같은 통합 경로로 검증한다.
7. `server/worker/repo-operation-coordinator.test.js` — `superseded_by`가
   기록된 failed 행은 `auto_repair` ON·eligible 실패 분류여도
   `startRepairLocked`에서 거부된다(수동 모드도 동일).
8. `server/worker/repo-operation-protocol.test.js` — `superseded_by` 행의 카드
   투영이 `repair_eligible=false`다.

## 6. 수용 기준

1. §5 테스트 green + Pre-Handoff 전체(tsc/test/lint/prettier:write/build,
   `app/main.bundle.js{,.map}` 포함).
2. PR을 **서버 [머지] lane**으로 머지: beads-ui workspace에 non-bootstrap
   deploy row가 생성되고(UI-b9f4 §2 수용 기준), 그 성공 정착의 sweep이
   `f937ab33239f`를 `superseded_by=<신규 성공 op>`로 덮은 것을 queue.json에서
   확인한다. UI에서는 그 행이 상태 스트립 `해결 필요` 수에서 빠지고 타임라인에
   `덮임`으로 행동 버튼 없이 나타난다.
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
