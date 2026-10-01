---
scope:
  - app/
  - server/worker/
  - server/ws/
  - server/workflow-enrich.js
  - server/list-adapters.js
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md
---
# plan 묶음 표시와 plan 일괄 레인 배치 — full_plan 착지 모델 개정의 beads-ui 소비

Bead: `UI-ruwu` · 형제: `dotfiles-b0xsk` · 2026-09-29 · 정정 2026-10-01(`UI-dbn6` 미적용 — 지금 프런트엔드 기준)

## 목적

dotfiles 계약이 full_plan의 착지 모델을 바꾼다. 정본은 dotfiles
`docs/superpowers/specs/2026-09-29-full-plan-landing-issue-model-design.md`이다.

- plan이 확정되면 착지 묶음마다 top-level 이슈가 생긴다.
- 그 이슈들은 같은 `spec_id`, `plan_path`, `plan_approval`을 공유한다.
- 각 이슈는 자기 범위 `plan_task_anchor="Phase <a>[-<b>]"`를 갖고, `blocks`로 이어진다.
- Phase 자식과 이월은 없어진다.

beads-ui는 이 이슈 묶음을 한눈에 보여 주고, 묶음 전체를 한 번에 레인에 올릴 수 있게 해야 한다. 쓸모가
없어진 자식 롤업, 이월 표시, 머지 단계는 정리한다.

## 배경(2026-09-29 코드 읽기, 2026-10-01 지금 프런트엔드 기준 정정)

- **Worker 서버.** 자식 없는 full_plan 이슈를 그대로 받아들인다. 읽는 값은 이슈 자신의 `plan_path`,
  `plan_approval`, `planned_execution`, `exec_receipt`다.
  - 받아들이는 곳: `server/worker/admission.js` full_plan 분기, `receipt-check.js`, `attach.js`,
    `pr-actions.js` `sweepChildren`(자식 0개면 통과).
  - 예외 하나: `receipt-check.js`의 `main:phase_line`은 `planned_execution`이 단일 값 `main`일 때만
    인정한다. 그래서 한 이슈에 실행 담당이 섞인 unit이 있으면, 새 계약의 나열 형식
    `P<a>:delegated; P<b>:main`을 위반으로 본다.
- **묶음 표시.** `plan_path`나 `spec_id`로 이슈를 묶어 보여 주는 곳이 없다.
- **자식 롤업과 이월.**
  - 자식 롤업은 실행 타일 슬롯 3에만 있다(`app/views/child-rollup.js`, `app/utils/child-rollup.js`,
    `running-grid.js`). Worker 탭은 `workspace-adapter.js`가 목록 구독 열에서 자식 색인을 만들어 붙인다.
  - 이월 칩은 완료 행 슬롯 4b에 있다(`lanes.js`, 필드 `carried_to`). Worker 탭은 `workspace-adapter.js`가
    `app/utils/carryover-index.js`로 만들고, 모니터 탭은 `monitor-handlers.js`가 `runnable-cache.js`
    `carriedToFor`를 읽어 단다.
  - 머지 단계 목록에 `child_sweep`("자식 정리")가 있다(`pr-actions.js` `CLOSURE_STEPS`, `merge-steps.js`,
    `pr-wait-progress.js`, `lane-model.js`).
- **레인 배치.**
  - `blocks`로 막힌 이슈도 배치할 수 있다(`placement.js`는 blocker를 보지 않는다).
  - 직렬 레인은 `blocks` 순으로 정렬된다(`server/worker/lane-order.js`).
  - 직렬 레인은 선두 항목만 후보가 된다(`scheduler.js` `runPass`). 선두가 거절되면(막힘 포함) 그 레인은
    그 회차에 진행하지 않는다. 선두의 선행이 닫히면 다음 회차에 선두가 디스패치된다.
  - `queue-store.js` `applySerialGroup`은 이미 큐에 있는 항목의 직렬 묶음·순서만 바꾼다. 큐에 없는 항목은
    `member_absent`로 거부한다. 이 함수를 부르는 WS 핸들러와 UI는 없다.
  - 단건 배치 `placeBeadInQueue`(`server/worker/queue-place.js`)는 서버 배치 자격 검사
    `checkWorkerQueueAdmission`을 거친다. `placement.js`의 `placementFromFacts`는 화면 표시용 판정이다.
  - Worker 조작 요청은 대상 저장소를 `root_dir`로 싣고, `mutationWorkspaceOf`가 부르는
    `targetWorkspaceOf`(`server/ws/workspace-target.js`)가 검증한다. 목록에 없는 저장소면 `bad_request`이고,
    `root_dir`이 없으면 연결 저장소다.
  - 화면 행 입력은 `plan_task_anchor`를 싣지 않는다. 행을 만드는 곳은 셋이고, 모두 같은 워크스페이스
    스냅샷(`snapshot.all`)을 읽는다.
    - 목록 구독 항목: `list-adapters.js` 스냅샷 투영. Worker 탭 후보 레인(`workspace-adapter.js`가 준비·막힘·
      진행·resolved·닫힘·보류 열을 합친다)과 상세 패널 이슈가 이것을 읽는다.
    - 모니터 탭 후보: `runnable-cache.js` `qualify`.
    - 두 탭의 대기·실행·PR 대기·완료 행: `decorateQueue`(`server/ws/worker-handlers.js`)의 `bead_*` 장식
      (`title-cache.js` `recordFromIssue`, `peekWorkspaceSnapshot`을 읽는 `bead_dependents` 등). 모니터 탭도
      같은 함수로 조립한다.
  - 실행 계획 파서 `server/workflow-enrich.js` `parsePlannedExecution`은 scalar만 받는다. 나열 값은 `null`이
    된다.
  - 머지 뒤 정리 단계는 `CLEANUP_STEPS = [base_containment, repo_operations, post_merge_jobs, child_sweep,
    branch_cleanup, parent_close]`이다(`pr-actions.js`). `CLOSURE_STEPS`는 `post_merge_jobs`부터 끝까지다.
- **겹침 칩.** 같은 spec을 공유하는 이슈끼리 `⧉` scope 겹침 칩이 서로 뜰 수 있다. `scope-overlap.js`가
  artifact scope를 비교하기 때문이다(미검증).
- **UI-dbn6 미적용(2026-10-01 사용자 결정).** 처음 이 스펙은 프런트엔드 재작성 `UI-dbn6` 위에 얹도록
  썼다. `UI-dbn6`(PR #338)은 적용하지 않기로 했으므로 이 작업은 지금 프런트엔드 위에서 한다.
  - 카드 렌더러 `candidateCard`·`miniRow`(`app/views/worker/lanes.js`)와 `runningTile`(`running-grid.js`)은
    Worker 탭과 모니터 탭(`app/views/monitor/index.js`)이 같이 쓴다. 판정 칩 팝업은
    `app/views/chip-popover.js`이고 상세 헤더도 같은 팝업을 쓴다.
  - 카드 슬롯 표(`2026-08-25-card-header-grammar-unify-design.md` §5.1)는 지금 값 그대로다. 3 행에 "자식
    롤업", 4b 행에 `이월 → <ID>`가 남아 있다.
  - `UI-dbn6`가 맡기로 했던 프런트엔드 쪽 자식 롤업·이월 칩 정리도 이 이슈가 한다(§6).

## 설계

### 1. 묶음 모델 — `app/utils/plan-group.js`(신규, 순수 모듈)

- **입력.** 서버가 워크스페이스 전체 이슈 스냅샷(`bd list --all`)에서 같은 `plan_path`를 가진 이슈를 모은다.
  이 스냅샷은 `runnable-cache.js`와 `list-adapters.js`가 이미 읽는 `snapshot.all`이다. 새 bd read는 없다
  (ADR UI-u6ud). 화면의 레인 행만으로는 입력이 모자란다. 닫히거나 보류됐거나 화면 필터에 걸린 구성원을
  볼 수 없어서, 순번과 총수가 틀어진다.
- **전달.** 묶음 요약 `plan_group`을 행 투영에 붙여 기존 채널로 보낸다.
  - 대상은 묶음에 속한 행이다.
  - 투영 위치는 배경의 행 생성처 셋이다.
    - `list-adapters.js` 스냅샷 투영: 목록 구독 항목과 상세 이슈에 `plan_group`을 붙인다.
    - `runnable-cache.js` `qualify`: 모니터 탭 후보 행에 붙인다.
    - `decorateQueue`: 레인 구성원 id별 `bead_plan_groups` 장식으로 싣는다. `bead_dependents`처럼
      `peekWorkspaceSnapshot`을 읽고, 두 탭의 대기·실행·PR 대기·완료 행이 이것을 읽는다.
  - `plan_group` 필드: `{ plan_path, slug, index, total, members: [{ id, anchor, status, blocked_by }] }`.
  - `app/utils/plan-group.js`는 이 계산을 하는 순수 모듈이고, 서버와 화면이 같이 쓴다(`scope-overlap.js`와
    같은 자리).
- **모듈 출력.** `plan_path`별 묶음 `{ plan_path, slug, members: [{ id, anchor, first_phase, status, blocked_by }] }`.
  행마다 붙는 `plan_group`은 여기에 그 행의 `index`(1부터)와 `total`(= `members` 수)을 더한 것이다.
  - `members`는 `first_phase`(anchor의 첫 Phase 번호) 오름차순이다.
  - `slug`는 `plan_path`의 파일 이름에서 `YYYY-MM-DD-` 접두와 `.md`를 뗀 것이다.
- **묶음이 되는 조건.** 같은 `plan_path`를 가진 이슈가 2개 이상이고, 모두 anchor가 `Phase <n>` 또는
  `Phase <n>-<m>` 형식이다.
- **표시 생략.** 다음 경우에는 묶음을 만들지 않는다(fail-quiet, ADR UI-u6ud-2).
  - anchor가 없는 이슈. 옛 plan 또는 묶음 하나짜리 plan이다.
  - anchor 형식이 틀린 이슈.
  - 범위가 겹치는 이슈.
- **읽기 전용.** 쓰기는 하지 않는다. 계약 키 `plan_task_anchor`와 `plan_path`는 dotfiles 계약 정본을
  코드 레지스트리 부분집합으로 복사해 쓴다.

### 2. plan 묶음 칩 — 슬롯 5a

- **슬롯.** 칩은 5a "어느 자리의 것인가"에 둔다. 이 슬롯에 이미 있는 소속 칩과 같은 부류다.
  - 카드 문법 스펙 §5.1 표의 5a 행에 `plan <slug> <i>/<n>`을 먼저 추가한다. 이 표 정정은 같은 변경에
    넣는다(ADR UI-nuwy).
  - 같은 표의 3 행에서 "자식 롤업", 4b 행에서 `이월 → <ID>`를 지운다.
- **문구.** `plan <slug> <i>/<n>`이다. `i`는 이 이슈의 묶음 순번이고 `n`은 묶음의 이슈 수다. 진행률은
  칩이 아니라 팝업에서 보여 준다. 진행을 표시하는 슬롯 3과 겹치지 않게 하려는 것이다.
- **표면.** 후보, 대기, 실행 타일, 완료 행, 상세 헤더. 카드 표면은 Worker 탭과 모니터 탭이 같은 렌더러로
  그린다.
- **클릭.** 칩 문법 스펙 §4.5 판정 칩 팝업 방식을 따르며, `data-chip-key="plan"`이다. 팝업 내용은 다음과
  같다.
  - 제목: `plan <slug>`
  - 본문: 묶음 이슈를 순서대로 한 줄씩 나열한다. 각 줄은 ID(클릭하면 열기, `.worker-dep__open`), anchor,
    상태, `⛓ <선행>`이다. 이 이슈의 줄은 강조한다.
  - 끝: `[plan 전체를 레인에 배치]` 버튼(§3). 이 버튼은 카드의 조작 슬롯이 아니라 팝업 안에 두므로, 카드
    줄 문법의 조작 자리 규칙과 충돌하지 않는다.
- **글리프.** 새 글리프는 쓰지 않는다. 텍스트 `plan` 접두만 쓰므로 칩 문법 §3 글리프 표에 추가할 행이
  없다.

### 3. plan 일괄 레인 배치

- **WS 요청.** `worker-queue-place-plan { root_dir, plan_path, lane, expected_revision }`.
  - 대상 저장소는 `root_dir`로 명시하고, 기존 `mutationWorkspaceOf`(→ `targetWorkspaceOf`)가 검증한다.
    팝업은 항목의 저장소를 항상 싣는다.
  - 연결 저장소와 `root_dir`이 다르면 `root_dir` 쪽 큐에 쓰거나, 검증 실패로 거부한다. 연결 저장소로 조용히
    바뀌는 일은 없다.
- **대상 선정.** 서버가 한다.
  - 묶음 이슈 가운데 `open`이고 아직 큐에 없는 것을 anchor 순서로 모은다.
  - 각 이슈에 단건 배치와 같은 서버 배치 자격 검사 `checkWorkerQueueAdmission`을 적용한다.
    `placementFromFacts` 같은 표시용 판정으로 대신하지 않는다. 그래서 대상 개수와 상관없이 자격 판정이
    같다.
  - 검사에서 떨어진 이슈(예: `worker-ineligible`, 영수증 부재)는 배치하지 않고, 응답의 `skipped[]`에
    `{ id, reason }`으로 담는다.
- **배치 동작.** 자격을 통과한 이슈 집합을 한 번의 revision 검사 안에서 원자적으로 큐에 추가한다. 추가하는
  즉시 고른 직렬 레인에 anchor 순으로 묶는다.
  - `queue-store.js`에 이 추가·정렬 연산을 새로 둔다. 예: `applySerialGroup`의 미배치 항목 추가 모드. 기존
    `applySerialGroup`은 이미 큐에 있는 항목만 다루므로 그대로는 쓸 수 없다.
  - `blocks_edges`는 bd의 `blocks` 엣지에서 만들고, 기존 `orderLaneByBlocks` 보정을 그대로 거친다.
  - 대상이 1개면 기존 단건 배치 경로를 쓴다. 0개면 아무것도 쓰지 않고 이유를 돌려준다.
- **레인 선택.** 팝업에서 직렬 레인을 고른다. 기본값은 묶음의 첫 이슈가 이미 놓인 레인이고, 없으면 첫 직렬
  레인이다. 병렬 레인은 고를 수 없다. 묶음은 순서가 기본이기 때문이다.
- **직렬 레인에서의 진행.** 직렬 레인은 선두만 후보가 된다(배경 참조).
  - `선행 없음` 묶음도 같은 레인에서는 앞 항목을 앞질러 가지 않는다. 병렬로 돌리려면 그 이슈를 다른 레인에
    직접 옮긴다.
  - `skipped[]`에 든 이슈를 뒤 이슈가 `blocks`로 기다리면, 레인 선두가 그 이슈가 닫힐 때까지 막혀 있다.
    그 이슈는 세션이 닫는다. 팝업은 이 상태를 `⛓ <ID> · 세션 필요`로 보여 준다.
- **동시성.** `expected_revision`이 맞지 않으면 거부하고, 목록을 다시 읽으라고 알린다. 이는 기존 큐 쓰기
  규칙과 같다.

### 4. 같은 plan 이슈의 `⧉` 억제

`scope-overlap` 계산에서 두 이슈의 `spec_id`가 같거나 `plan_path`가 같으면 겹침 쌍에서 제외한다. 한
plan의 이슈들은 설계상 같은 scope를 나누어 갖기 때문이다. 다른 spec과의 겹침은 그대로 표시한다.

### 5. 실행 계획 표시와 영수증 검사 — unit 나열 형식

- **`receipt-check.js`.**
  - `main:phase_line`: `planned_execution`이 단일 값 `main`이면 지금처럼 인정한다.
  - 나열 형식 `P<a>:<kind>; ...`이면, 다중 unit 영수증 항목마다 그 unit의 계획 값이 `main`인지 본다.
  - 나열에 없는 unit이거나 형식이 틀리면 `main_receipt_unbacked`다.
- **서버 파서 `server/workflow-enrich.js` `parsePlannedExecution`.**
  - scalar(`delegated`, `main` + 사유)는 지금 결과를 그대로 낸다.
  - 나열 형식 `P<a>:<kind>; ...`과 `planned_execution_reason=P<b>:<사유>[; ...]`는
    `{ units: [{ unit, kind, reason }] }`로 정규화해 투영에 싣는다. 투영 타입과 테스트도 같이 고친다.
  - 형식이 틀리면 `null`이다(fail-quiet).
- **`formatPlannedExecution`.** 위 정규화 결과를 받는다. `units`가 있으면 `계획 · 위임 n / 메인 m` 요약 한
  줄과, 팝업·상세용 unit별 목록(unit, 종류, 사유)을 만든다.

### 6. 은퇴 — 자식 롤업·이월·자식 정리 단계

- **서버.**
  - `pr-actions.js`: `CLEANUP_STEPS`에서 `child_sweep`를 뺀다. `CLOSURE_STEPS`는 여기서 파생되므로 따라서
    바뀐다.
    - 새 순서: `base_containment → repo_operations → post_merge_jobs → branch_cleanup → parent_close`. 이는
      dotfiles-b0xsk가 고치는 계약 `post_merge_jobs.runner.position`
      (`between_repo_operations_and_branch_cleanup`)과 같다.
    - 저장된 정리 기록의 재개 위치가 `child_sweep`이면 `branch_cleanup`부터 이어간다.
    - `classifyChildren`의 이월 분기와 `convertToCarryover`를 삭제한다.
  - `runnable-cache.js`: 이월 색인과 `carriedToFor`를 삭제하고, `monitor-handlers.js`의 `carried_to` 장식도
    뺀다.
- **화면.** `UI-dbn6`가 맡기로 했던 몫이다(배경 참조).
  - 실행 타일 슬롯 3의 자식 롤업을 지운다. `app/views/child-rollup.js`, `app/utils/child-rollup.js`와 그것만
    쓰는 모듈, `workspace-adapter.js`의 자식 색인을 삭제한다. 롤업만 쓰던 목록 구독 열은 다른 소비자가
    없으면 함께 뺀다.
  - 완료 행 슬롯 4b의 `이월 → <ID>` 칩과 `carried_to` 필드를 지운다. `app/utils/carryover-index.js`와
    `workspace-adapter.js`의 이월 색인을 삭제한다.
  - `merge-steps.js`, `pr-wait-progress.js`, `lane-model.js`에서 "자식 정리" 항목을 삭제한다.
- **유지.**
  - `isPhaseChild` 제외 규칙. 닫힌 옛 자식과 dotted id 행을 후보에서 계속 빼야 하기 때문이다.
  - 상세 관계의 `⌸ <ID>` 부모 관계 표시. bd의 일반 parent 관계를 보여 주는 것이다.
  - `discard-coordinator.js`의 자식 처리. 자식이 0개면 아무 일도 하지 않는다.
- **전제.** dotfiles-b0xsk가 착지하는 시점에 두 rig 모두 열린 Phase 자식이 0개임이 확인된다. 그래서 이
  은퇴로 진행 중인 부모가 영향을 받지 않는다.

## 경계·후속

| 종류(형제\|발견) | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
| --- | --- | --- | --- | --- | --- |
| 형제 | dotfiles | user_request | 저장소 차이(dotfiles) — 계약·스킬·훅의 착지 모델 개정 | 없음 | dotfiles-b0xsk |

비목표:
- 계약 키의 정의. dotfiles가 소유한다.
- plan 이슈 등록. 세션이 한다.
- 병렬 묶음의 자동 병렬 스케줄.
- plan 문서 뷰어의 변경.

## 결정 (ADR 후보)

- 전제: ADR UI-u6ud-2 — 계약 키(`plan_task_anchor`, `plan_path`, `planned_execution` 나열 형식)는 dotfiles
  정본의 부분집합을 복사해 쓰고, 키가 없으면 표시를 생략한다.
- 전제: ADR UI-nuwy(UI-l48z·UI-ri8n 조항 승계) — 슬롯 표에 없는 새 칩은 카드 문법 스펙 §5.1 슬롯 표를
  먼저 고친 뒤 달고, 그 표 정정은 같은 변경에 넣는다.
- 전제: ADR UI-u6ud — `plan_group`은 같은 워크스페이스 스냅샷 세대에서 투영하고 새 bd read를 띄우지 않는다.
- plan 묶음 칩의 슬롯·문구와 팝업 안 일괄 배치 버튼: 되돌림 어려움=미충족(칩 템플릿·팝업·슬롯 표 한 줄을 고치면 되돌아간다), 의외=미충족(슬롯 표가 자리의 근거를 적는다), 대안=있음(슬롯 3 진행 칩, 상세 패널 버튼). 기본 제외 목록의 UI 배치·표시 형식에 해당한다. → ADR 아님.
- 자식 롤업·이월·자식 정리 단계 은퇴: 되돌림 어려움=충족하지만 그 결정의 소유자는 dotfiles 계약(dotfiles-b0xsk의 ADR 후보)이다, 의외=미충족(계약이 Phase 자식을 폐지했으므로 소비자 정리가 뒤따르는 것은 자연스럽다), 대안=없음(계약 폐지 뒤 유지하면 죽은 코드다). beads-ui가 따로 결정하는 것이 아니다. → ADR 아님.

## Test scope

RED→GREEN 시임:

1. **`app/utils/plan-group.test.js`(신규).**
   - 같은 `plan_path` 2개 이상이면 묶음이 되고 순서가 맞다.
   - anchor가 없거나, 형식이 틀리거나, 범위가 겹치면 묶음을 만들지 않는다.
   - slug를 계산한다.
   - 구성원 하나가 닫혀도 `index`와 `total`이 유지된다.
1a. **서버 투영.** `server/list-adapters.test.js`, `server/worker/runnable-cache.test.js`, `decorateQueue` 장식
   테스트(`server/ws/worker-handlers*.test.js`)를 쓴다.
   - 전체 스냅샷에서 계산한 `plan_group`이 세 투영 위치 모두에서 묶음에 속한 행에 붙는다.
   - 구성원이 닫히거나 보류되거나 화면 필터에 걸려도 `index`, `total`, `members`가 유지된다.
2. **칩 템플릿과 팝업 테스트.** `app/views/worker/lanes.test.js`·`running-grid.test.js`(카드),
   `app/views/worker/index.test.js`·`app/views/monitor/index.test.js`(팝업), `app/views/detail-panel/index.test.js`
   (상세 헤더)를 쓴다.
   - 5a에 `plan <slug> <i>/<n>`이 그려진다.
   - 팝업의 줄 목록과 현재 이슈 강조가 맞다.
   - 재료가 없으면 칩이 없다.
3. **`worker-queue-place-plan`.** `server/ws.worker-queue.test.js`와 `server/worker/queue-store.test.js`를
   쓴다.
   - 미리 배치하지 않은 이슈 2개가 요청 한 번으로 고른 직렬 레인에 anchor 순서로 들어간다. 이 연산은
     원자적이다.
   - 1개면 단건 경로, 0개면 쓰기가 없다.
   - `checkWorkerQueueAdmission`이 거부한 이슈는 `skipped[]`에 사유와 함께 담기고 배치되지 않는다.
   - `root_dir`이 연결 저장소와 다른 요청은 그 저장소 큐에 쓰이거나 검증 실패로 거부된다. 연결 저장소로
     바뀌지 않는다.
   - `expected_revision`이 맞지 않으면 거부한다.
4. **scope-overlap.** 같은 `spec_id`/`plan_path` 쌍은 제외되고, 다른 spec 쌍은 유지된다.
5. **`receipt-check.test.js`.** 나열 형식 `planned_execution`에서 unit별 `main:phase_line`을 인정하거나
   거부한다. 단일 값 경로는 회귀하지 않는다.
6. **`server/workflow-enrich.test.js`, `exec-format.test.js`.**
   - 서버 파서가 나열 형식과 unit별 사유를 `units`로 정규화하고, 형식이 틀리면 `null`이다.
   - 표시 함수가 요약과 목록을 만든다.
   - scalar 경로는 회귀하지 않는다.
7. **`pr-actions.test.js`, `merge-steps` 테스트.**
   - `CLEANUP_STEPS`가 `base_containment, repo_operations, post_merge_jobs, branch_cleanup, parent_close`
     순서다.
   - 재개 위치가 `child_sweep`인 저장 기록은 `branch_cleanup`부터 이어간다.
   - 이월 변환 경로가 없다.
   - 머지 단계 목록에 "자식 정리"가 없다.
8. **화면 은퇴.** `running-grid.test.js`, `lanes.test.js`, `workspace-adapter.test.js`,
   `server/ws/monitor-handlers.test.js`.
   - 실행 타일에 자식 롤업이 그려지지 않는다.
   - 완료 행에 `이월 → <ID>` 칩이 없고, 두 탭의 투영에 `carried_to`가 없다.

제외: 라이브 Worker 실행, dotfiles 계약 검사기.

## 검증

- 위 focused 테스트.
- 저장소의 기본 테스트 명령.
- 스크린샷 확인. 배포된 화면에서 plan 묶음 칩과 팝업을 본다. 이는 운영자 인계로 한다.
