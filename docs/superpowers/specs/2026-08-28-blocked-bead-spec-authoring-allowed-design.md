---
scope:
  - app/views/worker/lanes.js
  - app/views/worker/lanes.test.js
  - app/views/worker/workspace-adapter.js
  - app/views/worker/workspace-adapter.test.js
  - app/views/worker/lane-model.js
  - app/views/worker/lane-model.test.js
  - app/utils/spec-after-blocker.js
  - app/utils/spec-after-blocker.test.js
  - app/styles.css
  - AGENTS.md
  - docs/superpowers/specs/2026-08-25-card-header-grammar-unify-design.md
  - app/main.bundle.js
---

# blocked Bead의 spec·plan 작성 허용과 『스펙 대기』 예외 칩 (UI-svh6)

## 1. 문제

`blocks`로 막힌 Bead는 선행이 닫힐 때까지 설계(spec·plan)도 멈춰 있다는 관행이
있다. 계약에는 형제 Bead 규칙(`bead_split.sibling_spec_timing`)에만 "`blocks`
edge는 실행만 막는다"가 있고, 일반 Bead에 대한 규칙이 없다. 그래서 두 가지가
생긴다.

- 사람들은 순서를 알면서도 `blocks`를 걸기를 꺼린다 — 걸면 설계까지 얼어붙는다고
  읽히기 때문이다. 결과로 "block까지는 아니지만 순서가 있는" 이슈들이 edge 없이
  흩어진다.
- 반대로 선행의 **결과**가 후행의 설계 전제인 경우(선행이 API 모양을 정하고 후행이
  그 위에 선다)는 정말로 spec을 기다려야 하는데, 지금은 그 둘을 구분할 표시가 없다.

세션에서 spec을 쓰는 것을 막는 기계 장치는 없다. `impl-gate-hook.py`는
`spec_review` 영수증·`in_progress` claim·승인만 보고 의존 준비 여부는 보지
않는다. 즉 이 문제는 **규칙의 부재**이지 강제의 문제가 아니다.

## 2. 확정 결정

1. **계약 일반 규칙.** `blocks` edge는 구현 실행 진입만 막는다. 의존 미충족
   Bead라도 대화 세션은 spec 작성·발행·`spec_review`, `full_plan`의 plan
   작성·`plan_approval`까지 진행하고, 그 게이트 착지에서 세션을 끝낸다.
   `in_progress` claim과 구현 실행 진입은 dependency-ready(`bd ready`에 나열)가
   조건이다. 이후 구현 진입은 기존 staleness 재리뷰 lane을 타므로, 선행이 남긴
   변화는 거기서 흡수한다. 형제 규칙 `sibling_spec_timing`은 이 일반 규칙의
   특수 사례가 된다.
2. **예외 라벨 `spec-after-blocker`.** 선행의 결과가 이 Bead의 설계 전제라 spec을
   선행 뒤에 써야 할 때 사람이 단다. 자유 변경, 게이트 비결속, 적격성 무관.
   라우터는 이 라벨이 있고 Bead가 **현재 blocked**이면 brainstorming을 시작하지
   않고 사용자에게 알린다. blocked가 아니면 라벨을 무시한다 — 선행이 닫히면
   저절로 무력화되므로 떼는 정리가 필요 없다.
3. **beads-ui는 라벨의 소비자다.** 카드에 판정 칩 『스펙 대기』를 그리고, 클릭은
   사유 팝업이다. Worker 서버·scheduler·admission은 무변경이다 — Worker는 spec을
   쓰지 않는다(admission이 `spec_id`+유효 `spec_review`를 요구하는 것 그대로).
   spec은 브레인스토밍 대화의 산물이라 세션이 쓴다.
4. **`related` 의존은 표시하지 않는다.** `bd-usage`가 `related`를 "어디서도 읽지
   않는 죽은 edge"로 정의하고 형제 연결을 `discovered-from`/`blocks`로만 허용하므로,
   "약한 순서"는 결정 1 뒤에는 그냥 `blocks`로 건다.
5. **훅 강제는 추가하지 않는다.** 결정 1은 prose 규칙이다. Codex 런타임이 같은
   prose를 강제 없이 지니는 것과 같은 수준이며, `impl-gate-hook.py`에 `bd ready`
   조회를 더하는 것은 이 범위 밖이다(§8 관찰).

## 3. 계약 변경 (dotfiles 소유)

계약 문구의 정본은 dotfiles `docs/contracts/workflow-contract.md`와
`docs/contracts/workflow-state.yaml`이다. 아래는 beads-ui가 소비할 의미를 고정한
것이고, 문장은 dotfiles 단위가 쓴다.

### 3.1 `workflow-contract.md` — Route 절

`bead_split.sibling_spec_timing` 문장 자리에 일반 규칙을 두고 형제 문장을 그
특수 사례로 붙인다. 담아야 할 의미:

- `blocks` edge는 implementation execution entry만 막는다(`in_progress` claim
  포함). spec 작성·발행·`spec_review`, plan 작성·`plan_review`·`plan_approval`은
  의존 미충족 Bead에서 허용된다.
- 그 세션은 게이트 착지(`spec_review` 또는 `plan_approval` readback)에서 끝난다.
  구현 진입은 dependency-ready가 조건이며, 재진입은 staleness 재리뷰 lane이다.
- `spec-after-blocker` 라벨이 있고 Bead가 dependency-ready가 아니면 spec 작성을
  시작하지 않고 사용자에게 알린다. dependency-ready면 라벨은 무의미하다.

### 3.2 `workflow-state.yaml` — `labels`

`labels`에 새 그룹 `design_timing`을 두고 라벨 하나를 정의한다.

```yaml
labels:
  design_timing:
    spec-after-blocker:
      status: active
      meaning: predecessor_outcome_is_design_premise_spec_waits_for_blocker
      consumer: [workflow_router, beads-ui]
      writers: [human]
      gate_bound: false
      effective_only_while: dependency_unsatisfied
```

`scheduling`이 아닌 이유: `session-preferred`·`worker-serial`은 "누가/어느 레인에서
돌리나"에 답하고, 이 라벨은 "설계를 언제 시작하나"에 답한다. 사유 키는 두지
않는다 — 사유가 사실상 하나(선행 결과가 설계 전제)라 enum이 과하다.

### 3.3 스킬·복사본·테스트

- `workflow` 스킬 `SKILL.md` Route 절과 `brainstorming` 스킬 진입부에 라벨 소비
  한 문장씩(계약을 가리키고 복제하지 않는다).
- 스킬 리소스 복사본 4파일(`flow/workflow/resources/workflow-state.yaml`,
  `flow/plan-authoring/resources/workflow-state.yaml`,
  `beads/bd-usage/references/workflow-state.yaml`,
  `beads/bd-usage/references/workflow-contract.md`)은
  `tests/test_contracts_layout.py`가 정본과 바이트 동일성을 검사하므로 함께 갱신한다.
- `tests/contracts/test_workflow_contract.py`에 라벨 존재·그룹 검사를 더한다.
  `check-instruction-budgets.py`는 soft 예산이라 `⚠`만 낸다.

## 4. beads-ui 변경

### 4.1 라벨 판정 leaf — `app/utils/spec-after-blocker.js`

`app/utils/session-preferred.js`와 같은 모양의 순수 leaf.

```js
export const SPEC_AFTER_BLOCKER_LABEL = 'spec-after-blocker';
/** 라벨이 붙어 있고 blocker가 남아 있을 때만 true (fail-quiet). */
export function specAfterBlockerActive(labels, blocked_by) {}
```

`blocked_by`가 배열이 아니거나 비어 있으면 `false`다. 라벨만 있고 blocked가 아닌
Bead에는 칩을 그리지 않는다 — 계약 §3.2 `effective_only_while`과 같은 판정이다.

### 4.2 행 데이터

`worker_ineligible`이 흐르는 경로를 그대로 따른다.

- `app/views/worker/workspace-adapter.js` `runnableRows`: `blocker_ids`를 이미
  계산하는 자리에서 `spec_after_blocker: specAfterBlockerActive(it.labels, blocker_ids)`
  를 행에 싣는다.
- `app/views/worker/lane-model.js` 대기 행(`session_preferred`를 echo하는 자리):
  `entry.spec_after_blocker === true`를 그대로 옮긴다.
- Monitor는 ADR 0014의 공유 `buildLanes`와 같은 렌더러를 쓰므로 별도 경로가 없다.

### 4.3 칩 — `app/views/worker/lanes.js`

- `JUDGEMENT_CHIP_KEYS`에 `spec_after_blocker`를 더한다.
- **슬롯은 4a 의존이다.** 카드 문법 스펙 §5.1의 질문 "지금 갈 수 있나"에 답하며,
  `⛓ <ID>` 칩이 말하는 막힘이 **설계까지** 미친다는 사실을 덧붙이는 칩이다.
  `⛓` 칩 바로 다음에 `스펙 대기` 텍스트 칩으로 그린다. 1번 슬롯의
  `worker-ineligible`·`세션 권장`과 상호배제하지 않는다 — 답하는 질문이 다르다.
- 클래스는 `ctl-chip ctl-chip--label judgement-chip worker-card__spec-after-blocker`,
  `data-chip-key="spec_after_blocker"`, `aria-expanded`는 다른 판정 칩과 같다.
- `judgementPopoverContent(item, 'spec_after_blocker')`:
  - `item.spec_after_blocker !== true`면 `null`.
  - title `선행 결과가 설계 전제 — 스펙도 선행 뒤에`
  - lines: `선행: <blocked_by를 ' · '로 이은 문자열>`,
    `선행이 닫히면 이 표시는 저절로 사라진다 — 라벨은 이슈 상세의 라벨 절에서 뗀다`
- 클릭 처리는 `index.js`의 기존 `.judgement-chip` 위임 핸들러가 `chip_key`로
  그대로 연다. 새 핸들러는 없다.

### 4.4 카드 문법 스펙·AGENTS.md

- `2026-08-25-card-header-grammar-unify-design.md` §5.1 표의 4a 행 "지금 실려 있는
  것"에 `스펙 대기`(판정 칩, 클릭=사유 팝업)를 추가하고 정정 문단을 단다.
- `AGENTS.md` "워커·모니터 카드 배치 문법"의 판정 칩 열거에 `스펙 대기`를 더한다.

### 4.5 CSS

`worker-card__spec-after-blocker`는 기존 `ctl-chip--label` 색을 그대로 쓴다. 새
색은 없다.

## 5. 데이터 흐름

```
bd labels + bd ready ──▶ runnableRows(blocker_ids, labels)
                             │ spec_after_blocker = label ∧ blocker_ids ≠ ∅
                             ▼
                       lane-model 대기 행 echo
                             ▼
       candidateCard 4a: ⛓ <ID> · [스펙 대기] ──클릭──▶ chip_popover(judgementPopoverContent)
```

## 6. 오류·경계

- 라벨은 있는데 `blocked_by`가 비었다(선행이 닫혔거나 edge가 없다): 칩 없음. 라벨을
  떼라고 재촉하지 않는다.
- 라벨 없이 blocked: 지금과 같다(`⛓` 칩만).
- `labels`가 배열이 아니다: `workerLabels` 정규화가 빈 배열로 만든다 → 칩 없음.
- 타 레포 blocker(foreign edge): `blocked_by`에 ID가 실리므로 같은 판정이다.

## 7. 테스트

- `app/utils/spec-after-blocker.test.js`: 라벨+blocker → true; 라벨만 → false;
  blocker만 → false; labels 비배열 → false.
- `app/views/worker/workspace-adapter.test.js`: blocked 후보 행에
  `spec_after_blocker`가 실린다; ready 후보에는 라벨이 있어도 실리지 않는다.
- `app/views/worker/lane-model.test.js`: 대기 행이 값을 echo한다.
- `app/views/worker/lanes.test.js`: 4a 줄에 `⛓` 다음 `스펙 대기` 칩이 그려진다;
  `judgementPopoverContent`가 선행 ID 줄을 낸다; 값이 false면 `null`.
- Pre-Handoff 묶음: `npm run tsc` · `npx vitest run --reporter=dot` · `npm run lint`
  · `npm run prettier:write` → `npm run build`.

## 8. 경계·후속

| 종류 | 저장소/rig | admission 클래스 | 분할 근거 | 선행(blocked_by) | Bead ID |
|---|---|---|---|---|---|
| 형제 | dotfiles | awaited_by_consumer | 다른 저장소(계약 정본·스킬 복사본·계약 테스트) — 닫힌 cross-repo 단위, `route=quick_fix` | 없음 | dotfiles-gpio |

이 행이 UI-svh6의 선행이다: hand-off에서 `bd dep add UI-svh6 <dotfiles-id> --type blocks`
를 쓰고 `bd dep list UI-svh6 --json`으로 방향을 확인한다. 계약이 먼저 닫혀야
beads-ui 칩이 소비할 라벨 어휘가 정의된다.

### 8.1 scope 겹침

| Bead | 상태 | 교차 경로 | 관계 |
|---|---|---|---|
| UI-qksl | in_progress | `app/views/worker/lanes.js` | 같은 파일의 다른 절 — 그 스펙은 PR 대기 행의 리뷰 dispatch 표시를, 이 스펙은 `candidateCard` 4a 칩과 `judgementPopoverContent`를 만진다. `JUDGEMENT_CHIP_KEYS`·팝업 함수는 그 스펙이 건드리지 않는다. edge 없음. |
| UI-8wpb | in_progress | `app/views/worker/` (`lane-model.js`) | 같은 디렉터리의 다른 절 — 그 스펙은 attempt 기록·타임라인 projection(`failureProjection`)을, 이 스펙은 대기 행의 `spec_after_blocker` echo 한 필드를 더한다. edge 없음. |

둘 다 이 스펙의 전제를 만드는 산출물이 아니므로 `blocks` edge를 쓰지 않는다. 구현
진입 시 staleness 재리뷰 lane이 그 사이 착지한 델타를 다시 본다.

- 관찰: `impl-gate-hook.py`에 dependency-ready 검사 추가 — 결정 5로 범위 밖.
  prose 규칙 위반이 실제로 관측되면 그때 별도 제기한다.
- 관찰: Worker 설정 화면의 `spec_review_model` 항목은 Worker-dispatched 세션에서는
  읽히지 않는다(스펙이 있어야 admitted). 세션 공통 kv 기본값이라 항목 자체는
  유지한다 — 변경 없음.

## 9. 구현 unit 후보

- `contract`: dotfiles 단위(형제 Bead) — 계약·복사본·스킬 문장·테스트.
- `chip`: beads-ui — `app/utils/spec-after-blocker.js`, `workspace-adapter.js`,
  `lane-model.js`, `lanes.js`, 테스트, 문서.

## 결정 (ADR 후보)

- **`blocks` edge는 구현 실행 진입만 막고, spec·plan 작성은 의존 미충족 Bead에서도
  세션이 진행한다.**
  - 되돌리기 어려움: **성립** — 관행과 계약 문장이 바뀌고, 이 규칙 위에 걸린
    `blocks` edge들이 쌓이면 "설계까지 막는다"로 되돌릴 때 그 edge들의 의미가
    달라진다.
  - 맥락 없이 보면 의아함: **성립** — "blocked인데 왜 스펙을 쓰나"가 남는다.
  - 실제 트레이드오프: **성립** — 대기 시간에 설계를 진행하는 대신 stale spec
    정정 비용(재리뷰 lane)을 받아들인다.
  - `summary`: `blocks` 의존은 구현 진입(`in_progress` claim)만 막는다; 세션은
    blocked Bead의 spec·plan을 쓰고 게이트 착지에서 끝나며, 선행 결과가 설계
    전제인 경우만 `spec-after-blocker` 라벨로 spec을 미룬다.
