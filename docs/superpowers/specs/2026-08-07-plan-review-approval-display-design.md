# plan review·approval receipt 표시 정합 설계

- Bead: `UI-7ntb`
- Route: `spec_backed`
- Provider: dotfiles `dotfiles-q1zb`

## 요약

dotfiles workflow가 plan draft 검토와 native 사용자 승인을 분리한다. beads-ui는 provider cutover보다 먼저 legacy와 새 metadata를 모두 읽을 수 있어야 한다. 이 단위는 workflow enrichment, stepper, detail panel의 표시만 확장하고 Worker admission 또는 scheduler 실행 조건은 바꾸지 않는다.

## 입력 계약

새 형식:

- `metadata.plan_review=<reviewer>@<draft-sha256-12>` 또는 `skipped@<draft-sha256-12>`
- `metadata.plan_approval=user@<plan-commit-40sha>`

legacy 형식:

- `metadata.plan_check=<reviewer>@<draft-sha256-12>` 또는 `skipped@<draft-sha256-12>`
- `metadata.plan_review=user@<plan-commit-40sha>`

closed Bead는 migration하지 않는다. consumer가 두 형식을 dual-read한다.

## Enrichment 동작

full_plan의 plan stage는 두 축을 분리한다.

- review glyph: 새 `plan_review`가 draft-hash 형식이면 이를 우선 사용한다. 없으면 legacy `plan_check`를 사용한다.
- approval/freshness: 새 `plan_approval`을 우선 사용한다. 없으면 legacy `plan_review=user@<40sha>`를 사용한다.
- approval freshness는 plan path에 대한 commit reachability, 이후 변경, working-tree dirty 상태를 기존 규칙대로 계산한다.
- malformed 또는 missing metadata는 예외를 던지지 않고 해당 표시를 생략하거나 미완료 상태로 둔다.
- 새 review receipt가 malformed이면 legacy key로 조용히 승격하지 않는다. key precedence는 presence가 아니라 valid parsed value 기준으로 하되, 서로 다른 의미의 값을 혼합해 합성 receipt를 만들지 않는다.

workflow summary는 plan stage에서 review와 approval을 별도 필드로 노출한다. detail panel도 `Plan review`와 `Plan approval`을 구분해 표시한다.

## Stepper 동작

- `spec_backed`: spec, implementation, PR, merge의 4-cell을 유지하고 plan cell을 만들지 않는다.
- `full_plan`: 기존 5-cell을 유지한다.
- plan cell의 glyph는 review 상태를 우선 표현하고 approval/freshness 상태를 별도 accessible text 또는 detail로 제공한다.
- 새 receipt, legacy pair, skip, stale, malformed, missing 조합이 기존 stepper visual rules를 깨지 않는다.

## Worker 경계

Worker admission과 scheduler는 실행 인가에 새 plan receipt를 요구하지 않는다. 기존 spec receipt 검사를 그대로 유지한다. 이 단위는 표시 계층의 dual-read이며 실행 조건 확장이 아니다.

## 오류 처리

- metadata object 부재 또는 비문자열 값: fail-quiet, stage 미완료 표시.
- review hash 길이 또는 charset 오류: review evidence 없음.
- approval token 또는 commit SHA 오류: approval 없음, freshness 계산 생략.
- plan path 부재: 파일 probe 없이 approval/freshness 미완료.
- git probe 오류: 기존 enrichment의 fail-quiet 결과를 유지한다.

## Test scope

Seams under test (RED→GREEN):

- `enrichIssueWorkflow`가 새 review+approval pair를 분리 파싱하고 plan stage summary에 두 값을 노출한다.
- `enrichIssueWorkflow`가 legacy `plan_check` + `plan_review=user@40sha`를 동일한 표시 의미로 읽는다.
- 새 receipt 우선순위, review skip, malformed, missing, unreachable, stale, dirty-plan 조합이 fail-quiet 결과를 만든다.
- `stepperTemplate`이 `spec_backed` 4-cell과 `full_plan` 5-cell을 유지하며 review glyph와 approval/freshness 상태를 구분한다.
- detail panel이 `Plan review`와 `Plan approval`을 별도 값으로 표시하고 legacy pair도 같은 사용자 의미로 보인다.
- Worker admission과 scheduler tests가 plan receipt를 새 실행 조건으로 요구하지 않음을 확인한다.

Excluded from red-green:

- dotfiles writer, marker, native Plan Mode lifecycle은 provider `dotfiles-q1zb` plan이 소유한다.
- visual vocabulary 신설은 없다. 기존 stepper glyph, dim/stale, metadata row 패턴만 재사용한다.
- closed Bead bulk migration은 하지 않는다.

## 검증과 배포

- focused enrichment, stepper, detail, admission/scheduler tests
- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:check`
- `npm run build` 및 bundle/map 포함 확인
- merge 후 main에서 `bdui-shared restart`
- runtime config, process executable/cwd, bind/port, HTTP 응답 확인

## 완료 조건

- 새 receipt와 legacy pair가 같은 semantic stage를 표현한다.
- review와 approval이 summary/detail에서 구분된다.
- `spec_backed` 4-cell과 full_plan 5-cell이 유지된다.
- malformed/missing metadata가 UI 또는 worker를 crash시키지 않는다.
- Worker admission/scheduler의 spec-only 인가 계약이 유지된다.
- bundle과 service deployment 검증이 완료된다.
