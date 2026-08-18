# Phase 계획 실행자 chip 설계

## 배경

dotfiles workflow의 full-plan Phase는 구현 전에 실행 소유자를 정하지만, 현재
`beads-ui`는 acceptance 뒤 기록되는 `exec_receipt`만 보여 준다. 작업 전에는 child가
delegate 대상인지 main 대상인지 카드에서 알 수 없고, 실행 중 owner가 바뀌어도 계획과
실제를 비교할 수 없다.

canonical producer 작업은 `dotfiles/dotfiles-qxw3`이고 이 consumer 작업은 `UI-6bfu`다.
dotfiles 설계는 모든 Phase에 `실행: delegated|main(<reason>)`을 요구하고 child metadata에
계획값을 기록한다.

## 목표

1. `planned_execution`과 `planned_execution_reason`을 display-only로 안전하게 파싱한다.
2. board child card와 detail panel에서 계획 실행자를 기존 workflow chip 체계와 자연스럽게
   표시한다.
3. 실제 `exec_receipt`가 생긴 뒤에도 계획과 실제를 함께 보여 주고 mismatch를 텍스트로
   식별한다.
4. 기존 Bead, malformed metadata, route/gate 판정의 의미를 바꾸지 않는다.
5. source, tests, generated frontend bundle을 같은 PR에서 갱신한다.

## 비목표

- planned metadata를 편집하는 UI를 만들지 않는다.
- plan을 파싱하거나 child metadata를 쓰지 않는다.
- planned 값으로 route, readiness, gate, Worker scheduling을 판정하지 않는다.
- 기존 child에 값을 backfill하지 않는다.
- `exec_receipt` 형식이나 기존 chip을 대체하지 않는다.
- 이번 작업에서 PR merge 또는 운영 deploy를 수행하지 않는다.

## 입력 계약

서버 enrichment가 소비하는 metadata는 다음과 같다.

| 필드 | 유효값 | 표시 의미 |
|---|---|---|
| `planned_execution` | `delegated`, `main` | 승인 plan의 Phase owner |
| `planned_execution_reason` | 한 줄 비어 있지 않은 문자열 | main owner 선택 사유 |
| `exec_receipt` | 기존 canonical 형식 | acceptance된 실제 owner와 commit |

`delegated`는 reason이 없을 때만 유효하다. `main`은 유효한 reason이 함께 있을 때만 계획
chip을 만든다. unknown enum, 배열/객체, delegated의 stray reason, 빈 reason, newline이
포함된 reason은 malformed로 보고 planned display를 생략한다. 이는 fail-quiet 표시
정책이며 issue payload와 workflow stage를 실패시키지 않는다.

enrichment 결과는 다음 display-only shape를 추가한다.

```js
planned_execution: {
  kind: 'delegated' | 'main',
  reason: string | null
} | null
```

같은 값을 `workflow.planned_execution`과 `workflow.chips.planned_execution`에 제공한다.
actual kind는 기존 `workflow.exec_receipt.kind`에서 읽는다. raw metadata 문자열을 frontend가
다시 파싱하지 않는다.

## Board card 표현

기존 `.ctl-chip` anatomy, spacing, radius, typography, focus/contrast token을 재사용하고
planned 전용 modifier만 추가한다.

- delegated: `계획 · 위임`
- main: `계획 · 메인`
- actual kind가 planned kind와 다를 때: `계획 · 위임 → 메인` 또는
  `계획 · 메인 → 위임`

delegated는 기존 정보성 blue 계열, main은 기존 violet 계열 token을 사용한다. mismatch는
색만 바꾸지 않고 화살표와 실제 kind 텍스트를 추가하며 기존 `exec_receipt` chip도 그대로
옆에 남긴다. main reason과 계획/실제 raw 요약은 `title`에 제공한다.

planned metadata가 child 전용이므로 별도 parent 판정 로직은 넣지 않는다. 필드가 있는
issue에만 chip이 나타난다. 텍스트는 짧게 유지하고 actor/model/SHA는 기존 actual chip이
소유한다.

### 접힌 child rollup

기본 board는 parent가 보이면 Phase child를 독립 카드가 아니라
`.board-card__roll-child` row로 접는다. `app/views/board/index.js`의 rollup projection이
child의 normalized `workflow`/chip 데이터를 보존하고, `app/views/board/card.js`가 같은
label formatter로 compact planned/actual chip을 row 안에 렌더링한다.

- 실행 전: `계획 · 위임` 또는 `계획 · 메인`
- matching actual 뒤: planned chip과 compact `실행 · <kind>` chip을 함께 표시
- mismatch 뒤: `계획 · <planned> → <actual>`과 compact actual chip을 함께 표시

model/SHA와 main reason 전체는 row 폭을 늘리지 않고 tooltip과 detail panel에서 제공한다.
title은 `min-width`/ellipsis를 유지하고 chip은 기존 rollup click target 안에서 읽을 수
있어야 한다. parent가 숨겨져 child가 독립 카드로 fallback되는 경로는 기존 full chip을
사용한다.

## Detail panel 표현

detail summary header에도 board와 같은 planned chip을 사용해 화면 간 vocabulary를
맞춘다. workflow detail key/value 영역에는 다음을 별도 행으로 표시한다.

- `planned_execution`: `delegated` 또는 `main`
- `planned_execution_reason`: main일 때 exact reason
- 기존 `exec_receipt`: 실제 kind, actor/reason, SHA

계획과 실제가 다르면 summary chip의 화살표 표현과 tooltip을 동일하게 사용한다. detail
행은 비교 증거이므로 실제 receipt가 생긴 뒤에도 planned 값을 숨기지 않는다.

## 접근성·시각 규칙

- 의미를 색에만 맡기지 않고 `계획`, `위임|메인`, mismatch 화살표와 실제 kind를 텍스트로
  렌더링한다.
- tooltip은 보조 정보이며 필수 의미는 visible text에 남긴다.
- 기존 CSS custom property를 우선 사용하고 raw 색상 또는 새로운 전역 token을 추가하지
  않는다.
- 긴 main reason은 card 폭을 늘리지 않고 tooltip과 detail row에서만 전체를 보여 준다.
- metadata가 없거나 malformed인 기존 카드의 DOM과 chip 순서는 기존과 동일하게 유지한다.

## 오류와 호환성

- planned metadata 하나라도 유효하지 않으면 planned chip과 detail row만 생략한다.
- malformed planned 값 때문에 issue enrichment 전체를 drop하지 않는다.
- actual receipt만 있는 기존 issue는 지금과 같은 exec chip/detail을 보여 준다.
- planned 값만 있는 실행 전 child는 planned chip만 보여 준다.
- planned/actual mismatch는 오류 gate가 아니라 관찰 가능한 provenance다.

## 구현 surface

- `server/workflow-enrich.js`
- `server/workflow-enrich.test.js`
- `app/views/board/card.js`
- `app/views/board/card.test.js`
- `app/views/board/index.js`
- `app/views/board/index.test.js`
- `app/views/detail-panel/effective-settings-view.js`
- `app/views/detail-panel/effective-card.test.js`
- `app/views/detail-panel/index.js`
- `app/views/detail-panel/index.test.js`
- `app/styles.css`와 필요 시 source style partial
- `app/main.bundle.js`, `app/main.bundle.js.map`

기존 component helper로 board/detail chip 표현을 공유할 수 있으면 재사용하되, 단순한 두
호출 지점을 추상화하기 위해 새 전역 UI framework를 만들지 않는다.

## 교차 저장소 실행과 적용

이 unit과 `dotfiles-qxw3`는 저장소와 owned path가 달라 각 spec 승인 뒤 구현·review를
병렬로 진행할 수 있다. 준비 단계에는 `blocks` dependency를 추가하지 않는다. 두 PR의
delivery와 gate receipt가 모두 고정되면 dotfiles controller가
`dotfiles-qxw3 -> UI-6bfu` foreign `blocks` edge를 추가하고 `bd dep list`/`bd ready`로
readback해 적용 tail만 순차화한다.

적용 순서는 다음과 같다.

1. 두 PR의 non-empty diff, exact head, implementation gate, required verification,
   `pr_url` readback을 확인한다.
2. foreign dependency readback 뒤 이 beads-ui PR을 먼저 `pr-finish`한다.
3. exact merged-SHA containment, previous-base `[deploy]` terminal success, deploy worktree
   final HEAD/clean과 `/healthz`의 `runtime.source_sha == merged SHA` 및 healthy bd
   diagnostics를 live readback한다.
4. 3의 증거가 있을 때만 dotfiles writer PR의 merge/deploy를 허용한다. dotfiles 쪽
   containment, deploy terminal, final HEAD/clean, runtime install/post-merge verifier까지
   확인한 뒤 두 Bead를 close한다.

failure 또는 unknown이면 다음 단계로 진행하지 않는다. 재개는 exact-SHA로 완료된 증거를
재사용하고 첫 미완료 단계부터 시작한다. consumer만 적용된 상태는 필드 부재에 하위
호환이라 안전하다. producer-first 적용은 금지한다. 두 PR과 deploy coverage가 모든
required work를 운반하므로 no-PR residue와 `worker-ineligible`은 없으며, spec receipt
write에서 label 부재를 readback한다.

## Test scope

### Seam 1: server parsing

- delegated, main+reason, 부재를 exact shape로 파싱한다.
- unknown enum, wrong type, delegated with reason, main without reason, empty/multiline
  reason을 fail-quiet null로 만든다.
- planned parsing 실패가 existing route/stage/exec receipt enrichment를 바꾸지 않는다.

### Seam 2: board card

- actual 전 delegated/main planned text가 나타난다.
- matching actual은 planned chip과 기존 exec chip을 함께 렌더링한다.
- mismatch는 `계획 · <planned> → <actual>` visible text와 tooltip을 렌더링한다.
- planned field가 없는 기존 fixture와 malformed fixture에는 chip이 없다.
- folded rollup child가 normalized workflow를 잃지 않고 실행 전, matching, mismatch,
  malformed 상태를 compact row에서 같은 vocabulary로 렌더링하는 `board/index` integration
  fixture를 추가한다.

### Seam 3: detail panel

- summary chip과 exact detail rows가 planned/main reason/actual receipt를 구분한다.
- mismatch와 malformed 동작이 board와 일치한다.
- 기존 workflow metadata가 없는 detail layout을 보존한다.

### Repository verification

```bash
node --version
npm --version
npm ls --depth=0
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
git diff --check
```

`prettier:write`와 build 뒤 owned diff를 다시 확인하고 생성 bundle/map이 source 변경과 함께
포함됐는지 검증한다.

## 완료 기준

- child 카드와 detail에서 계획 owner를 실행 전후에 읽을 수 있다.
- 계획과 실제가 다르면 둘을 덮어쓰지 않고 한눈에 비교할 수 있다.
- 색을 보지 않아도 delegated/main/mismatch 의미를 이해할 수 있다.
- malformed/legacy metadata가 기존 화면이나 workflow gate에 영향을 주지 않는다.
- repository verification이 통과하고 non-empty PR로 전달된다.
