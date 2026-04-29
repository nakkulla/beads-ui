# Detail Run Summary

## 문제 정의

Bdui의 issue detail 화면은 현재 title, status, priority, labels, dependency,
comments, description, acceptance, notes, design, 그리고 일부 metadata path(spec,
plan, handoff)를 보여준다. 그러나 `bd-ralph-v3` 실행이 끝난 parent bead에는 실행
요약 metadata가 저장되어 있어도, 사용자가 Bdui에서 선택한 이슈의 실제 실행 시간과
연결된 PR을 바로 확인할 수 없다.

`bd-ralph-v3` finish flow는 parent bead metadata에 다음 실행 결과를 sync한다.

- `metadata.run_started_at`
- `metadata.run_finished_at`
- `metadata.pr_url`
- `metadata.pr_number`
- `metadata.audit_artifact`

이번 작업의 목표는 **이슈를 클릭해 열린 기존 detail 화면에서 run duration과 PR
link를 확인할 수 있게 하는 것**이다. 목록 row, worker parent row, board column은
복잡하게 만들지 않는다.

## 목표

- 기존 issue detail 화면에 `Run summary` card를 추가한다.
- `run_started_at`과 `run_finished_at`을 기준으로 소요시간을 계산해 표시한다.
- `pr_url`을 사용해 PR을 클릭 가능한 외부 링크로 표시한다.
- 기존 spec/plan/handoff metadata path 표시와 detail layout은 유지한다.
- run metadata가 없는 이슈에서는 새 card를 숨긴다.

## 비목표

- Issues list, Board, Worker parent row에 duration 또는 PR URL을 추가하지 않는다.
- issue `created_at`, `updated_at`, `closed_at`으로 실행 소요시간을 추정하지 않는다.
- `bd-ralph-v3`가 metadata를 쓰는 방식은 변경하지 않는다.
- 모든 raw metadata를 노출하는 generic metadata viewer를 만들지 않는다.
- PR 목록 조회 API나 worker PR panel의 데이터 contract를 변경하지 않는다.

## 현재 상태

### Detail metadata 표시

`app/views/detail.js`는 issue의 `metadata.plan`과 `metadata.handoff`, 그리고
`spec_id`를 이용해 sidebar의 metadata path card를 렌더링한다. path value는 긴
문자열을 줄임 표시하고 클릭으로 확장할 수 있다.

### Run metadata source

`bd-ralph-v3/scripts/finish_branch.sh`는 finish 단계에서 parent bead에 다음 값을
저장한다.

- `pr_url`
- `pr_number`
- `run_started_at`
- `run_finished_at`
- `audit_artifact`

Bdui server는 `bd show <id> --json` 결과와 list subscription 결과를 normalize하면서
원본 issue field를 보존한다. 따라서 detail view가 받는 issue object의
`metadata`에 위 key가 들어오면 client-side에서 바로 렌더링할 수 있다.

### Existing duration helper

`app/data/worker-selectors.js`에는 worker job용 `formatElapsedMs()`가 있다. 이
helper는 현재 `m s` 단위 표현에 맞춰져 있으며, detail issue run duration은 별도
helper로 두거나 detail-local helper로 시작하는 편이 영향 범위가 작다.

## 결정 요약

### 선택한 방향

기존 issue detail sidebar에 **Run summary card**를 추가한다.

표시 항목은 다음으로 제한한다.

| Field    | Source metadata                             | 표시 조건                         |
| -------- | ------------------------------------------- | --------------------------------- |
| Duration | `run_started_at` + `run_finished_at` 차이   | 두 timestamp가 모두 valid일 때    |
| Started  | `run_started_at`                            | timestamp가 valid일 때            |
| Finished | `run_finished_at`                           | timestamp가 valid일 때            |
| PR       | `pr_url`, optional `pr_number`              | safe `http:`/`https:` URL일 때    |

`audit_artifact`는 이번 UI에는 표시하지 않는다. 사용자가 요청한 핵심은 소요시간과
PR URL이며, audit artifact까지 추가하면 detail sidebar가 execution audit surface로
확장되어 범위가 커진다.

### 왜 이 방향인가

- 사용자는 “이슈를 클릭해서 상세 화면에서 볼 수 있도록”을 원했다.
- detail sidebar는 이슈 단위의 부가 정보를 담기에 적합하다.
- 목록 row에 duration/PR을 넣지 않으면 dense list의 가독성을 유지할 수 있다.
- `bd-ralph-v3` metadata contract를 그대로 사용하므로 backend 변경 없이 client
  rendering 중심으로 구현할 수 있다.

## UI 설계

Run summary card는 기존 properties/metadata path card와 같은 detail sidebar 흐름에
배치한다. 정확한 위치는 기존 detail layout을 따르되, metadata path card와 가까운
곳에 둔다.

예상 표시 형태:

```text
Run summary
Duration   2h 14m
Started    2026-04-29 10:11
Finished   2026-04-29 12:25
PR         PR #42 ↗
```

PR link는 다음 속성을 가진다.

- `href=<metadata.pr_url>`
- `target="_blank"`
- `rel="noreferrer noopener"`

Link text는 `pr_number`가 있으면 `PR #<pr_number>`, 없으면 `PR`로 표시한다.
`pr_url`은 `http:` 또는 `https:` scheme만 허용한다. 빈 문자열, parse 불가 URL,
상대 URL, 그리고 `javascript:`/`data:` 같은 non-web scheme은 invalid로 취급해 PR
row를 렌더링하지 않는다.

## Data handling

### Timestamp parsing

- `run_started_at`과 `run_finished_at`은 ISO-like string을 기대한다.
- `Date.parse()`가 finite number를 반환할 때만 valid timestamp로 취급한다.
- invalid timestamp는 해당 row를 숨긴다.

### Duration 계산

- `started_ms = Date.parse(metadata.run_started_at)`
- `finished_ms = Date.parse(metadata.run_finished_at)`
- 두 값이 모두 valid이고 `finished_ms >= started_ms`일 때만 duration을 표시한다.
- 음수 duration은 잘못된 metadata로 보고 숨긴다.

### Duration format

Duration은 사람이 읽기 쉬운 compact format으로 표시한다.

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

Started/Finished는 현재 detail 화면의 timestamp style과 충돌하지 않는 간결한
local format을 사용한다.

- `YYYY-MM-DD HH:mm`
- Browser local timezone 기준

기존 timestamp utility가 같은 목적에 맞으면 재사용하고, 맞지 않으면 detail-local
formatter를 둔다.

## Rendering rules

Run summary card는 다음 중 하나라도 있으면 표시한다.

- valid `run_started_at`
- valid `run_finished_at`
- safe `http:`/`https:` `pr_url`

각 row는 독립적으로 표시한다.

- Duration row: valid start/end pair가 있을 때만 표시
- Started row: valid start timestamp가 있을 때만 표시
- Finished row: valid finished timestamp가 있을 때만 표시
- PR row: safe `http:`/`https:` `pr_url`이 있을 때만 표시

새 card가 표시되지 않는 경우에도 기존 detail 화면은 그대로 렌더링되어야 한다.

## 구현 범위

### `app/views/detail.js`

- issue metadata typedef를 run summary key까지 확장한다.
- detail-local helper를 추가한다.
  - `parseRunTimestamp(value)`
  - `formatRunTimestamp(ms)`
  - `formatRunDuration(start_ms, finished_ms)`
  - helper 이름은 구현 시 existing naming style에 맞춘다.
- `detailTemplate()`에서 `run_summary_block`을 만들고 sidebar에 배치한다.
- 기존 metadata path block은 변경하지 않는다.

### `app/views/detail.test.js`

다음 focused tests를 추가한다.

1. `renders run summary from bd-ralph metadata`
   - `run_started_at`, `run_finished_at`, `pr_url`, `pr_number`가 모두 있을 때
     Duration, Started, Finished, PR link가 표시된다.
2. `hides run summary when run metadata is absent`
   - 기존 이슈 detail에서 새 card가 나타나지 않는다.
3. `renders partial run summary metadata`
   - PR만 있거나 timestamp 일부만 valid한 경우 가능한 row만 표시된다.
4. `hides invalid duration`
   - invalid timestamp 또는 negative duration에서는 Duration row가 숨겨진다.

## 접근성 및 보안

- PR link는 keyboard로 접근 가능한 `<a>`로 렌더링한다.
- 새 탭 link에는 `rel="noreferrer noopener"`를 사용한다.
- `pr_url`은 `new URL()` 또는 동등한 parsing으로 검증하고, `http:`와 `https:`
  scheme만 허용한다.
- `pr_url`은 text로 직접 삽입하지 않고 검증된 URL만 `href` attribute에 사용하며,
  link label은 `pr_number` 기반 또는 fixed fallback text를 사용한다.
- `pr_url`이 비어 있거나 unsafe URL이면 PR row를 렌더링하지 않는다.

## 검증

Pre-handoff validation은 repo 표준을 따른다.

- `npm run tsc`
- `npm test`
- `npm run lint`
- `npm run prettier:write`

구현 중에는 focused test를 먼저 실행할 수 있다.

- `npm test -- app/views/detail.test.js`

## Acceptance criteria

- 이슈 detail 화면에서 `bd-ralph-v3` run metadata가 있는 이슈는 Run summary card를
  표시한다.
- 소요시간은 `metadata.run_started_at`과 `metadata.run_finished_at` 차이로만
  계산한다.
- PR URL은 detail 화면에서 클릭 가능한 link로 보인다.
- 기존 spec/plan/handoff metadata path 표시는 유지된다.
- run metadata가 없는 이슈에서는 Run summary card가 표시되지 않는다.
- invalid timestamp나 negative duration은 UI 오류를 만들지 않고 해당 row만 숨긴다.

## Classification

- `skill_related=no`
- `skill_related_reason=Application UI feature; no skill artifacts are changed.`
- `quick_edit=no`
- `quick_edit_decision_reason=The implementation is small, but the user explicitly requested a spec-first flow.`
- `quick_edit_decided_by=brainstorming`
- `execution_lane=plan`
