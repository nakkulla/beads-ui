---
scope:
  - app/
  - server/worker/
  - server/ws/
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - docs/superpowers/specs/2026-08-28-chip-grammar-unify-design.md
---
# plan 묶음 표시와 plan 일괄 레인 배치 — full_plan 착지 모델 개정의 beads-ui 소비

Bead: `UI-ruwu` · 형제: `dotfiles-b0xsk` · 선행: `UI-dbn6` · 2026-09-29

## 목적

dotfiles 계약이 full_plan의 착지 모델을 바꾼다. 정본은 dotfiles
`docs/superpowers/specs/2026-09-29-full-plan-landing-issue-model-design.md`이다.

- plan이 확정되면 착지 묶음마다 top-level 이슈가 생긴다.
- 그 이슈들은 같은 `spec_id`, `plan_path`, `plan_approval`을 공유한다.
- 각 이슈는 자기 범위 `plan_task_anchor="Phase <a>[-<b>]"`를 갖고, `blocks`로 이어진다.
- Phase 자식과 이월은 없어진다.

beads-ui는 이 이슈 묶음을 한눈에 보여 주고, 묶음 전체를 한 번에 레인에 올릴 수 있게 해야 한다. 쓸모가
없어진 자식 롤업, 이월 표시, 머지 단계는 정리한다.

## 배경(2026-09-29 코드 읽기)

- **Worker 서버.** 자식 없는 full_plan 이슈를 그대로 받아들인다. 읽는 값은 이슈 자신의 `plan_path`,
  `plan_approval`, `planned_execution`, `exec_receipt`다.
  - 받아들이는 곳: `server/worker/admission.js` full_plan 분기, `receipt-check.js`, `attach.js`,
    `pr-actions.js` `sweepChildren`(자식 0개면 통과).
  - 예외 하나: `receipt-check.js`의 `main:phase_line`은 `planned_execution`이 단일 값 `main`일 때만
    인정한다. 그래서 한 이슈에 실행 담당이 섞인 unit이 있으면, 새 계약의 나열 형식
    `P<a>:delegated; P<b>:main`을 위반으로 본다.
- **묶음 표시.** `plan_path`나 `spec_id`로 이슈를 묶어 보여 주는 곳이 없다.
- **자식 롤업과 이월.**
  - 자식 롤업은 Worker 실행 타일에만 있다(슬롯 3, `child-rollup.js`).
  - 이월 칩은 완료 행 슬롯 4b에 있다(`carryover-index.js`, `lanes.js`).
  - 머지 단계 목록에 `child_sweep`("자식 정리")가 있다(`pr-actions.js` `CLOSURE_STEPS`, `merge-steps.js`,
    `pr-wait-progress.js`).
- **레인 배치.**
  - `blocks`로 막힌 이슈도 배치할 수 있다(`placement.js`는 blocker를 보지 않는다).
  - 직렬 레인은 `blocks` 순으로 정렬된다(`server/worker/lane-order.js`).
  - 스케줄러는 막힌 항목을 건너뛰고, 선행이 닫히면 다시 디스패치한다(`scheduler.js` 주석).
  - 여러 이슈를 원자적으로 직렬 배치하는 `queue-store.js` `applySerialGroup`이 있지만, 이를 부르는 WS
    핸들러와 UI가 없다.
- **겹침 칩.** 같은 spec을 공유하는 이슈끼리 `⧉` scope 겹침 칩이 서로 뜰 수 있다. `scope-overlap.js`가
  artifact scope를 비교하기 때문이다(미검증).
- **UI-dbn6 선행.** 이 작업은 프런트엔드 재작성 `UI-dbn6` 위에 얹는다.
  - `UI-dbn6`는 dotfiles-b0xsk 뒤에서 정정된다. 정정 내용은 새 프런트엔드에 자식 롤업·이월 칩 렌더와
    `bead_children` 투영을 만들지 않는 것이다.
  - 서버 쪽 `carryover-index` 같은 코드는 이 이슈가 은퇴시킨다.
  - 새 프런트엔드는 카드 슬롯 표(`2026-08-25-card-header-grammar-unify-design.md` §5.1)를 승계한다.

## 설계

### 1. 묶음 모델 — `model/plan-group.js`(신규, 순수 모듈)

- **입력.** 워크스페이스의 이슈 목록 스냅샷(보드·레인이 이미 받는 행).
- **출력.** `plan_path`별 묶음 `{ plan_path, slug, issues: [{ id, anchor, first_phase, status, blocked_by }] }`.
  - `issues`는 `first_phase`(anchor의 첫 Phase 번호) 오름차순이다.
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
  - 카드 문법 스펙 §5.1 표의 5a 행에 `plan <slug> <i>/<n>`을 먼저 추가한다(ADR UI-l48z).
  - 같은 표의 3 행에서 "자식 롤업", 4b 행에서 `이월 → <ID>`를 지운다.
- **문구.** `plan <slug> <i>/<n>`이다. `i`는 이 이슈의 묶음 순번이고 `n`은 묶음의 이슈 수다. 진행률은
  칩이 아니라 팝업에서 보여 준다. 진행을 표시하는 슬롯 3과 겹치지 않게 하려는 것이다.
- **표면.** 후보, 대기, 실행 타일, 완료 행, 상세 헤더.
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

- **WS 요청.** `worker-queue-place-plan { workspace, plan_path, lane, expected_revision }`.
- **대상.**
  - 묶음 이슈 가운데 `open`이고 아직 레인에 없으며 기존 `placement.js` 배치 판정을 통과한 것을 순서대로
    모은다.
  - 판정에서 떨어진 이슈(예: `worker-ineligible`)는 배치하지 않고, 응답의 `skipped[]`에 사유와 함께 담는다.
  - 뒤 이슈는 떨어진 이슈에 `blocks`로 걸려 있으므로, 레인에서 대기하다가 세션이 그 이슈를 닫으면 풀린다.
- **배치 동작.**
  - 대상이 2개 이상이면 `applySerialGroup`을 부른다. 인자는 `ordered_bead_ids`와 bd의 `blocks` 엣지에서
    만든 `blocks_edges`다.
  - 대상이 1개면 기존 단건 배치 경로를 쓴다.
  - 대상이 0개면 아무것도 쓰지 않고 이유를 돌려준다.
- **레인 선택.** 팝업에서 직렬 레인을 고른다. 기본값은 묶음의 첫 이슈가 이미 놓인 레인이고, 없으면 첫 직렬
  레인이다. 병렬 레인은 고를 수 없다. 묶음은 순서가 기본이기 때문이다. `선행 없음` 묶음도 같은 직렬
  레인에서 순서대로 돈다.
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
- **`formatPlannedExecution`.** 나열 형식이면 `계획 · 위임 n / 메인 m` 요약 한 줄과, 팝업·상세용 unit별
  목록을 만든다. 형식이 틀리면 표시를 생략한다(fail-quiet).

### 6. 은퇴 — 자식 롤업·이월·자식 정리 단계

- **서버.**
  - `pr-actions.js`: `CLOSURE_STEPS`에서 `child_sweep`를 뺀다. `classifyChildren`의 이월 분기와
    `convertToCarryover`를 삭제한다.
  - `runnable-cache.js`: 이월 색인을 삭제한다. `app/utils/carryover-index.js`는 삭제하거나, 서버 import가
    남아 있으면 그 import와 함께 삭제한다.
  - `merge-steps.js`와 `pr-wait-progress.js`에서 "자식 정리" 항목을 삭제한다.
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
- 전제: ADR UI-l48z — 새 칩은 카드 문법 스펙 §5.1 슬롯 표를 먼저 고친 뒤 단다.
- plan 묶음 칩의 슬롯·문구와 팝업 안 일괄 배치 버튼: 기본 제외 목록의 UI 배치·표시 형식에 해당한다. → ADR 아님.
- 자식 롤업·이월·자식 정리 단계 은퇴: dotfiles 계약 변경(dotfiles-b0xsk의 ADR 후보)을 소비하는 것이고, beads-ui가 따로 결정하는 것이 아니다. → ADR 아님.

## Test scope

RED→GREEN 시임:

1. **`model/plan-group.test.js`(신규).**
   - 같은 `plan_path` 2개 이상이면 묶음이 되고 순서가 맞다.
   - anchor가 없거나, 형식이 틀리거나, 범위가 겹치면 묶음을 만들지 않는다.
   - slug를 계산한다.
2. **칩 템플릿과 팝업 테스트.** UI-dbn6 재작성 후의 카드·팝업 테스트 파일을 쓴다.
   - 5a에 `plan <slug> <i>/<n>`이 그려진다.
   - 팝업의 줄 목록과 현재 이슈 강조가 맞다.
   - 재료가 없으면 칩이 없다.
3. **`worker-queue-place-plan`.** `server/ws.worker-queue.test.js`와 `server/worker/queue-store.test.js`를
   쓴다.
   - 2개 이상이면 `applySerialGroup`, 1개면 단건, 0개면 쓰기가 없다.
   - `skipped[]`가 채워진다.
   - `expected_revision`이 맞지 않으면 거부한다.
4. **scope-overlap.** 같은 `spec_id`/`plan_path` 쌍은 제외되고, 다른 spec 쌍은 유지된다.
5. **`receipt-check.test.js`.** 나열 형식 `planned_execution`에서 unit별 `main:phase_line`을 인정하거나
   거부한다. 단일 값 경로는 회귀하지 않는다.
6. **`exec-format.test.js`.** 나열 형식의 요약과 목록을 만들고, 형식이 틀리면 생략한다.
7. **`pr-actions.test.js`, `merge-steps` 테스트.**
   - `CLOSURE_STEPS`에 `child_sweep`가 없다.
   - 이월 변환 경로가 없다.
   - 머지 단계 목록에 "자식 정리"가 없다.

제외: 라이브 Worker 실행, dotfiles 계약 검사기.

## 검증

- 위 focused 테스트.
- 저장소의 기본 테스트 명령.
- 스크린샷 확인. 배포된 화면에서 plan 묶음 칩과 팝업을 본다. 이는 운영자 인계로 한다.
