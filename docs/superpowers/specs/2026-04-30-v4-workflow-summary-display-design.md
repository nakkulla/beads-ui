# v4 workflow summary display

Parent bead: UI-uf7m
Supersedes: UI-uyoa, UI-vhdx

## 문제 정의

`bd-ralph-v4` / `pr-review-v4`는 workflow evidence를 v4 contract 기준으로
정리하려는 canary workflow다. `beads-ui`는 현재 issue detail에서 spec/plan/handoff
metadata path를 보여주고, board/list에서는 일부 label만 요약 표시한다. 그러나 v4
contract가 도입한 실행 분류와 결과 요약은 UI에서 바로 확인하기 어렵다.

기존 `UI-vhdx` spec은 detail 화면에 `bd-ralph-v3` 실행요약(duration/PR)을 표시하는
것에 초점을 맞췄다. 이번 재설계는 `UI-uyoa`의 목표인 **v4 workflow contract
metadata 표시 정합성**을 중심으로 기존 실행요약 요구를 흡수한다.

사용자가 확인하고 싶은 핵심 정보는 다음이다.

- 이 이슈가 `plan` 실행인지 `quick_edit` 실행인지
- skill artifact 작업인지, 그렇다면 `writing_skills`인지 `skill_creator`인지
- 실행이 끝났다면 얼마나 걸렸고 어떤 PR로 연결됐는지

반대로 run ledger artifact 자체는 audit/debug 용도이며, 이번 `beads-ui` UI surface에
직접 노출할 필요가 없다.

## 목표

- Board card에서 v4 contract metadata 기반 workflow chip을 보여준다.
- Issue detail에서 `Workflow summary` card를 보여준다.
- Detail summary에는 duration, started, finished, PR, execution lane, skill workflow를 표시한다.
- UI는 v4 contract 기준 parent metadata를 primary source로 사용한다.
- Run ledger / evidence artifact link는 이번 UI scope에서 표시하지 않는다.
- 기존 label display policy, spec/plan/handoff metadata path 표시, navigation/editing behavior를 유지한다.

## 비목표

- `bd-ralph-v4` 또는 dotfiles contract emitter를 이 repo에서 수정하지 않는다.
- run ledger JSON 파일을 읽는 backend API를 추가하지 않는다.
- `metadata.run_ledger` 또는 `metadata.audit_artifact`를 UI에 표시하지 않는다.
- Issues/List/Epics table row에 새 workflow column을 추가하지 않는다.
- legacy metadata(`skill_related`, `skill_creator_required`, `skill_eval_fast_path`)를 UI primary source로 사용하지 않는다.
- PR 목록 조회, Worker PR panel, GitHub API integration을 변경하지 않는다.

## 현재 상태

### Detail metadata 표시

`app/views/detail.js`는 detail sidebar에서 `spec_id`, `metadata.plan`,
`metadata.handoff`를 metadata path card로 표시한다. 긴 path는 줄임 표시하고,
사용자가 클릭하면 확장할 수 있다.

### Board card 표시

`app/views/board.js`는 card title, label badges, type, priority, issue id, created
relative time을 표시한다. label badge는 `app/utils/label-badge.js`와 config 기반
visible prefix 정책을 사용한다.

### List/Epics row 표시

`app/views/issue-row.js`는 reusable table row renderer로 title/status/assignee/
priority/labels/dependency count 등을 표시한다. table row는 이미 밀도가 높고,
새 workflow column을 추가하면 layout 영향이 board card보다 크다.

### v4 contract 관련 관찰

`dotfiles/docs/contracts/workflow-contract.yaml`과
`dotfiles/shared/skills/bd-ralph-v4/resources/workflow-contract.yaml`은 v4 workflow
contract의 metadata로 `pr_url`, `execution_lane`, `skill_workflow`, `run_ledger` 등을
정의한다.

`bd-ralph-v4/scripts/finish_branch.sh`는 현재 parent bead에 `pr_url`, `pr_number`,
`run_started_at`, `run_finished_at` 등을 sync한다. run ledger file은 생성하지만 parent
metadata pointer는 현재 `audit_artifact` 중심으로 sync되는 흐름이 관찰된다. 이번 UI
설계는 ledger pointer를 표시하지 않으므로, 이 drift를 UI fallback으로 흡수하지
않는다. 대신 dotfiles 쪽 contract/emitter 정합성 follow-up으로 명시한다.

## 결정 요약

### 선택한 방향

**Hybrid summary UI**를 사용한다.

- Board card에는 스캔용 workflow chip만 표시한다.
- Issue detail에는 자세한 `Workflow summary` card를 표시한다.
- Run ledger/evidence link는 표시하지 않는다.
- Primary source는 v4 contract 기준 parent metadata다.

### 왜 이 방향인가

1. Board card는 한눈에 workflow lane과 skill workflow를 찾는 용도에 적합하다.
2. Duration과 timestamp는 card에 넣으면 밀도를 높이므로 detail에 두는 편이 낫다.
3. Detail view는 PR, duration, classification을 함께 확인하기 좋은 공간이다.
4. Run ledger는 audit artifact이며 일반 UI에서 자주 확인할 정보가 아니다.
5. UI가 ledger file reader가 되지 않으면 backend/protocol 변경 없이 구현할 수 있다.

## Contract data model

`beads-ui`가 읽는 primary metadata는 다음으로 제한한다.

| UI 의미 | Source |
| --- | --- |
| Run started | `issue.metadata.run_started_at` |
| Run finished | `issue.metadata.run_finished_at` |
| Duration | `run_finished_at - run_started_at` |
| PR URL | `issue.metadata.pr_url` |
| PR number | `issue.metadata.pr_number` optional |
| Execution lane | `issue.metadata.execution_lane` |
| Skill workflow | `issue.metadata.skill_workflow` |

Primary source로 사용하지 않는 key:

- `metadata.audit_artifact`
- `metadata.run_ledger`
- `metadata.skill_related`
- `metadata.skill_creator_required`
- `metadata.skill_eval_fast_path`

### Contract alignment follow-up

이번 `beads-ui` spec은 contract consumer 설계다. dotfiles 쪽에서는 별도 follow-up으로
다음 정합성을 맞춰야 한다.

- `run_started_at` / `run_finished_at`을 v4 contract metadata registry에 canonical UI
  summary source로 포함할지 결정한다.
- `bd-ralph-v4`가 parent bead에 v4 contract metadata를 실제로 sync하도록 맞춘다.
- `run_ledger`와 `audit_artifact`의 관계를 정리한다. `beads-ui`는 ledger를 표시하지
  않지만, contract-first workflow promotion 전에는 emitter/contract naming이 맞아야 한다.

## UI 설계

### Board card workflow chips

Board card에는 metadata에서 파생한 workflow chip을 표시한다.

예:

```text
[plan] [skill_creator] [PR]
[quick_edit] [writing_skills]
```

표시 조건:

- `execution_lane=plan|quick_edit`이면 lane chip 표시
- `skill_workflow=writing_skills|skill_creator`이면 skill chip 표시
- `skill_workflow=none`은 board card에서 숨김
- safe `http:`/`https:` `pr_url`이 있으면 `PR` chip 표시
- unknown enum value는 chip으로 표시하지 않음

이 chip은 label badge가 아니다. `labels` 배열과 label display policy가 아니라
`metadata`에서 파생한 workflow indicator다. 따라서 class/style도 label badge와
분리한다.

### Detail Workflow summary card

Issue detail sidebar에 `Workflow summary` card를 추가한다. 기존 metadata path card와
가까운 위치에 두되, 기존 card의 동작과 layout은 유지한다.

예상 표시 형태:

```text
Workflow summary
Duration       46m 38s
Started        2026-04-29 20:42
Finished       2026-04-29 21:28
PR             PR #92 ↗
Lane           plan
Skill workflow skill_creator
```

표시 조건:

- 표시 가능한 row가 하나라도 있으면 card를 렌더링한다.
- 아무 row도 없으면 card 전체를 숨긴다.
- `pr_url`이 safe URL일 때만 PR row를 표시한다.
- `pr_number`가 있으면 link text는 `PR #<number>`, 없으면 `PR`이다.
- `execution_lane=plan|quick_edit`만 표시한다.
- `skill_workflow=none|writing_skills|skill_creator`만 표시한다.
- `skill_workflow=none`은 detail에서는 표시해도 된다. 이는 “skill workflow 없음”을
  명확히 보여주는 값이기 때문이다.

## Data handling

### Timestamp parsing

- timestamp input은 string만 valid 후보로 취급한다.
- `Date.parse()` 결과가 finite number일 때만 valid timestamp다.
- invalid timestamp는 해당 row를 숨긴다.

### Duration 계산

- `started_ms = Date.parse(metadata.run_started_at)`
- `finished_ms = Date.parse(metadata.run_finished_at)`
- 두 값이 모두 valid이고 `finished_ms > started_ms`일 때만 duration을 표시한다.
- `finished_ms <= started_ms`는 잘못된 metadata로 보고 duration row를 숨긴다.

### Duration format

Compact human format을 사용한다.

- 60초 미만: `Xs`
- 60분 미만: `Xm Ys`
- 24시간 미만: `Xh Ym`
- 24시간 이상: `Xd Xh`

예:

- `45s`
- `7m 03s`
- `2h 14m`
- `1d 3h`

### Timestamp format

Started/Finished는 browser local timezone 기준의 간결한 format을 사용한다.

- `YYYY-MM-DD HH:mm`

기존 utility가 같은 목적에 맞으면 재사용한다. 맞지 않으면 workflow summary helper에
작은 formatter를 둔다.

### PR URL safety

- `new URL()` 또는 동등한 parsing으로 검증한다.
- `http:`와 `https:` scheme만 허용한다.
- invalid URL, relative URL, `javascript:`, `data:` URL은 렌더링하지 않는다.
- link에는 `target="_blank"`, `rel="noreferrer noopener"`를 사용한다.

## 구현 구조

### 새 helper

새 helper를 추가한다.

```text
app/utils/workflow-summary.js
```

역할:

- `normalizeExecutionLane(value)`
- `normalizeSkillWorkflow(value)`
- `parseWorkflowTimestamp(value)`
- `formatWorkflowTimestamp(ms)`
- `formatWorkflowDuration(start_ms, finished_ms)`
- `safeWorkflowUrl(value)`
- `workflowSummaryFromIssue(issue)`

이 helper는 runtime `.js` 파일이며 JSDoc type annotation을 사용한다.

### `app/views/detail.js`

- `workflowSummaryFromIssue(issue)`를 호출한다.
- summary rows가 있으면 sidebar에 `Workflow summary` card를 렌더링한다.
- 기존 spec/plan/handoff metadata path card는 유지한다.

### `app/views/board.js`

- board card에서 workflow chips를 렌더링한다.
- chip source는 `metadata.execution_lane`, `metadata.skill_workflow`, safe
  `metadata.pr_url`이다.
- 기존 label badges와 label display policy는 그대로 둔다.

### `app/views/issue-row.js`

이번 scope에서는 변경하지 않는다.

이유:

- table row는 이미 많은 column을 갖고 있다.
- 새 workflow column은 layout/test 영향이 크다.
- 사용자가 말한 “이슈 카드”는 board card로 해석하는 것이 더 작고 안전한 범위다.
- detail에서는 항상 workflow summary를 확인할 수 있다.

### `app/styles.css`

새 class를 추가한다.

- `.workflow-chip`
- `.workflow-chip--lane`
- `.workflow-chip--skill`
- `.workflow-chip--pr`
- `.workflow-summary`
- `.workflow-summary__row`
- `.workflow-summary__label`
- `.workflow-summary__value`

기존 label badge와 혼동되지 않도록 색상과 shape를 약간 구분한다.

## Accessibility and security

- PR link는 keyboard 접근 가능한 `<a>`로 렌더링한다.
- 새 탭 link에는 `rel="noreferrer noopener"`를 사용한다.
- unsafe URL은 DOM에 link로 넣지 않는다.
- workflow chip은 decorative status text이므로 card navigation/click behavior를 방해하지 않는다.
- 색만으로 의미를 전달하지 않고 chip text를 그대로 표시한다.

## 테스트 계획

### `app/utils/workflow-summary.test.js`

- valid timestamps로 duration을 계산한다.
- invalid timestamp 또는 `finished <= started`에서는 duration을 숨긴다.
- safe `http:`/`https:` PR URL만 허용한다.
- `execution_lane`은 `plan|quick_edit`만 normalize한다.
- `skill_workflow`은 `none|writing_skills|skill_creator`만 normalize한다.

### `app/views/detail.test.js`

- contract metadata가 있으면 `Workflow summary` card를 렌더링한다.
- PR link는 새 탭 안전 속성을 가진다.
- 일부 metadata만 있어도 가능한 row만 렌더링한다.
- metadata가 모두 없으면 summary card를 숨긴다.

### `app/views/board.test.js`

- board card에 `plan`, `quick_edit`, `writing_skills`, `skill_creator`, `PR` chip이 조건부 표시된다.
- invalid/unknown metadata는 chip으로 표시되지 않는다.
- 기존 label badge display는 유지된다.

## 검증

Pre-handoff validation은 repo 표준을 따른다.

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

구현 중 focused verification:

```bash
npm test -- app/utils/workflow-summary.test.js app/views/detail.test.js app/views/board.test.js
```

## Acceptance criteria

- Board card에서 v4 contract metadata 기반 lane/skill workflow/PR chip을 볼 수 있다.
- Detail 화면에서 `Workflow summary` card가 duration, started, finished, PR, lane,
  skill workflow를 보여준다.
- Run ledger/evidence link는 이번 UI에 표시하지 않는다.
- Primary source는 `metadata.run_started_at`, `metadata.run_finished_at`,
  `metadata.pr_url`, `metadata.pr_number`, `metadata.execution_lane`,
  `metadata.skill_workflow`다.
- invalid timestamp, unsafe URL, unknown enum value는 UI 오류 없이 숨긴다.
- 기존 label display policy와 spec/plan/handoff metadata path UI는 유지된다.
- dotfiles/bd-ralph-v4 contract/emitter 정합성은 별도 follow-up으로 명시된다.

## Beads handling

- Canonical parent: `UI-uf7m`
- Superseded issues: `UI-uyoa`, `UI-vhdx`
- `UI-uyoa`와 `UI-vhdx`는 새 통합 이슈 `UI-uf7m`로 흡수되어 closed 상태다.
- `UI-uf7m`에는 이 spec을 `spec_id`로 연결하고 `has:spec` label을 유지한다.
- 기존 `UI-vhdx`의 detail-run-summary 요구는 이번 spec에 흡수된다.

## Classification

- `quick_edit=no`
- `quick_edit_decision_reason=Contract consumer UI plus cross-repo contract alignment requires a reviewed spec and plan.`
- `quick_edit_decided_by=brainstorming`
- `execution_lane=plan`
- `skill_workflow=none`
- `skill_workflow_reason=Application UI change only; no skill artifacts are created or modified.`
