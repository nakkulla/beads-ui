# Detail workflow config and route metadata editing design

## 문제 정의

`beads-ui`는 현재 Board card에 workflow chip을 별도 렌더링하고, Detail sidebar에는
일부 workflow metadata와 `spec_id` / `metadata.plan` / `metadata.handoff` path를
고정된 방식으로 표시한다. 하지만 dotfiles workflow contract 기준으로는 Bead의
workflow state가 metadata와 derived label에 나뉘어 있고, 사용자가 보고 싶은 정보는
상황마다 다를 수 있다.

특히 Board/List/Epics 같은 스캔 surface에서는 derived label만으로 충분하다.
반대로 Detail view에서는 source-of-truth metadata를 section별로 자세히 확인하고,
일부 route metadata는 사람이 안전하게 수정할 수 있어야 한다.

## 목표

- Board workflow chip을 제거하고 label display policy만 사용한다.
- `~/.config/bdui/config.toml`의 Detail config로 workflow summary section과 field 표시를
  제어한다.
- Detail workflow summary는 contract metadata를 section/field 기반으로 표시한다.
- Route metadata만 명시적 `Edit` / `Save` / `Cancel` UX로 수정할 수 있게 한다.
- Route metadata 저장 시 `execution_lane`의 mirror label인 `lane:*`를 자동 동기화한다.
- `spec_id`, `plan`, `handoff` path는 read-only로 항상 full path를 줄바꿈 표시하고,
  클릭하면 전체 path를 clipboard에 복사한다.
- Config 수정 후 server restart로 새 표시 정책이 반영되게 한다.

## 비목표

- Raw metadata JSON editor를 만들지 않는다.
- Board/List/Epics에 별도 workflow chip 또는 workflow column을 추가하지 않는다.
- Review/freshness evidence를 사람이 수정할 수 있게 하지 않는다.
- `spec_id`, `plan`, `handoff`, PR, follow-up, human blocker metadata를 Detail에서
  편집 가능하게 하지 않는다.
- dotfiles contract 파일이나 `bd-ralph-v4` emitter를 이 repo에서 수정하지 않는다.
- run ledger/evidence artifact JSON을 읽거나 표시하는 backend API를 추가하지 않는다.

## 현재 상태

### Label display policy

`server/config.js`는 `~/.config/bdui/config.toml` 또는 `BDUI_CONFIG_PATH`에서
`[labels].visible_prefixes`를 읽고, bootstrap payload와 `/api/config`로 client에
전달한다. Client는 reconnect 후 `/api/config`를 다시 fetch해 config state를 갱신한다.

현재 label policy는 prefix만 지원한다. `pr`, `human`, `skill-related`처럼 exact label을
보여주려면 exact-match allowlist가 추가로 필요하다.

### Workflow summary

`app/utils/workflow-summary.js`는 `run_started_at`, `run_finished_at`, `pr_url`,
`pr_number`, `execution_lane`, `skill_workflow`를 고정 로직으로 normalize하고,
Board chip과 Detail row를 만든다. 현재 `execution_lane`은 `plan | quick_edit`만
허용해 dotfiles core contract의 `spec_backed` lane과 맞지 않는다.

### Metadata paths

`app/views/detail.js`는 `spec_id`, `metadata.plan`, `metadata.handoff`를 별도 metadata path
card로 보여준다. 현재 path value는 길 때 축약/확장 toggle UX를 가진다. 새 정책에서는
별도 metadata path card를 workflow summary의 `artifacts` section으로 흡수하고, 항상 full
path를 줄바꿈 표시하므로 expand/collapse 개념이 필요 없다.

## 설계 결정

### Surface 분리

- Board/List/Epics: label display policy만 사용한다.
- Detail: config-driven workflow summary section/field rendering으로 source metadata를 보여준다.
- Board workflow chip은 제거한다.

### Config는 표시 allowlist만 담당한다

Config는 어떤 section/field를 표시할지 결정한다. Field의 source mapping, formatter,
validation, click behavior, editability semantics는 code가 소유한다.

### Route만 편집 가능하다

Route metadata는 사람이 workflow route를 정정하고 싶을 수 있으므로 검증된 select editor로
열어둔다. Durable workflow evidence에 해당하는 review/freshness 값과 artifact path는
읽기 전용으로 유지한다.

### Artifact path는 read-only reference다

`spec_id`, `plan`, `handoff`는 edit target이 아니라 reference target이다. 항상 전체 path를
표시하고, 긴 값은 줄바꿈하며, 클릭하면 전체 path를 복사한다.

## Config schema

기본 config 예시는 다음과 같다.

```toml
[labels]
visible_prefixes = ["has:", "reviewed:", "lane:", "followup:"]
visible_exact = ["pr", "human", "skill-related"]

[detail.workflow_summary]
sections = ["route", "artifacts", "review_gates", "pr", "followup", "human_blocker"]

[detail.workflow_summary.route]
fields = ["execution_lane", "workspace_policy", "branch_policy", "finish_action"]
editable_fields = ["execution_lane", "workspace_policy", "branch_policy", "finish_action"]

[detail.workflow_summary.artifacts]
fields = ["spec_id", "plan", "handoff"]

[detail.workflow_summary.review_gates]
fields = ["status", "final_source", "external_attempts"]

[detail.workflow_summary.pr]
fields = ["pr_url"]

[detail.workflow_summary.followup]
fields = ["followup_kind", "target_repo", "target_paths", "required_action"]

[detail.workflow_summary.human_blocker]
fields = ["human_decision_required"]
```

Unknown section, field, or editable field ids are ignored. Invalid TOML keeps the existing safe
fallback behavior.

## Label policy

`label_display_policy` is extended from prefix-only to prefix plus exact matching.

| Config key | Meaning |
| --- | --- |
| `labels.visible_prefixes` | Show labels whose text starts with any configured prefix. |
| `labels.visible_exact` | Show labels whose full text exactly matches any configured value. |

Default behavior remains backward-compatible when `visible_exact` is omitted.

## Detail section and field mapping

### `route`

| Field id | Source | Display | Editable | Allowed values |
| --- | --- | --- | --- | --- |
| `execution_lane` | `metadata.execution_lane` | value text/select | yes | `quick_edit`, `spec_backed`, `plan` |
| `workspace_policy` | `metadata.workspace_policy` | value text/select | yes | `current`, `worktree` |
| `branch_policy` | `metadata.branch_policy` | value text/select | yes | `same`, `feature` |
| `finish_action` | `metadata.finish_action` | value text/select | yes | `direct`, `pr` |

### `artifacts`

| Field id | Source | Display | Editable |
| --- | --- | --- | --- |
| `spec_id` | `issue.spec_id` | full path text, click-to-copy | no |
| `plan` | `metadata.plan` | full path text, click-to-copy | no |
| `handoff` | `metadata.handoff` | full path text, click-to-copy | no |

### `review_gates`

Review gate status combines event labels and provenance metadata.

| Field id | Source | Display | Editable |
| --- | --- | --- | --- |
| `status` | labels `reviewed:spec`, `reviewed:plan`, `reviewed:impl` | per-gate reviewed/missing status | no |
| `final_source` | `spec_review_final_source`, `plan_review_final_source`, `impl_review_final_source` | source value | no |
| `external_attempts` | `spec_review_external_attempts`, `plan_review_external_attempts`, `impl_review_external_attempts` | attempt count | no |

### `pr`

| Field id | Source | Display | Editable |
| --- | --- | --- | --- |
| `pr_url` | `metadata.pr_url` | safe `http:`/`https:` external link | no |

Unsafe, invalid, empty, or relative URLs are hidden.

### `followup`

| Field id | Source | Display | Editable |
| --- | --- | --- | --- |
| `followup_kind` | `metadata.followup_kind` | value text | no |
| `target_repo` | `metadata.target_repo` | value text | no |
| `target_paths` | `metadata.target_paths` | compact JSON/string value | no |
| `required_action` | `metadata.required_action` | value text | no |

### `human_blocker`

| Field id | Source | Display | Editable |
| --- | --- | --- | --- |
| `human_decision_required` | `metadata.human_decision_required` | value text | no |

### Advanced/future fields

Freshness/debug-lite fields may be added later as read-only fields, but are not in the default section
list for this spec.

Candidate future field ids:

- `spec_content_hash`
- `spec_reviewed_at_sha`
- `plan_content_hash`
- `plan_reviewed_at_sha`
- `impl_reviewed_at_sha`
- `impl_reviewed_diff_range`

## Route edit UX

Default state is read-only:

```text
Route
Execution lane   plan
Workspace        worktree
Branch           feature
Finish           pr
[Edit]
```

When the user clicks `Edit`, configured editable route fields become select controls:

```text
Route
Execution lane   [plan ▼]
Workspace        [worktree ▼]
Branch           [feature ▼]
Finish           [pr ▼]

[Save] [Cancel]
```

- `Save` writes all changed route fields in one mutation.
- `Cancel` discards local draft changes.
- During save, controls are disabled.
- On success, the server returns/readbacks the updated issue and the UI leaves edit mode.
- On failure, existing issue state remains visible and an error toast is shown.

## Route metadata mutation

Add a server/client mutation for route metadata, for example `update-route-metadata`.

Payload shape:

```ts
{
  id: string,
  values: {
    execution_lane?: 'quick_edit' | 'spec_backed' | 'plan',
    workspace_policy?: 'current' | 'worktree',
    branch_policy?: 'same' | 'feature',
    finish_action?: 'direct' | 'pr'
  }
}
```

Server behavior:

1. Validate issue id and every provided field/value.
2. Build a single `bd update <id>` command with repeated `--set-metadata key=value` flags.
3. If `execution_lane` changes or is provided, sync `lane:*` mirror labels:
   - remove `lane:quick_edit`, `lane:spec_backed`, `lane:plan`
   - add the matching `lane:<value>` label
4. Read back the updated issue via the existing issue read path.
5. Return the updated issue payload.

No route mutation writes `reviewed:*`, review provenance, artifact path, PR, follow-up, or human blocker metadata.

## Artifact path copy UX

For every configured `artifacts` field with a displayable value:

- Render the full value.
- Use wrapping, not ellipsis or horizontal scrolling.
- Render as a button-like copy target.
- Click copies the full value to clipboard.
- Success toast: `Copied path`
- Failure toast: `Failed to copy path`

CSS direction:

```css
.metadata-path__value {
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}
```

The old separate metadata path card and expand/collapse path toggle are removed for these fields.

## Data flow

1. Server starts and loads TOML config once via `server/config.js`.
2. Server sends normalized config through root bootstrap and `/api/config`.
3. Client stores normalized config under `state.config`.
4. Board/List/Epics derive visible labels from `visible_prefixes` and `visible_exact`.
5. Detail view derives visible workflow summary sections/fields from `state.config.detail`.
6. Config changes require server restart; open clients pick them up through reconnect config refresh or browser refresh.

## Error handling

- Invalid config file: use existing fallback config and log debug output.
- Unknown config ids: ignore them.
- Missing field value: do not render the row.
- Invalid route value in existing metadata: show it as absent rather than offering an invalid select option.
- Route save validation failure: reject mutation and show error toast.
- Clipboard failure: show failure toast and keep UI unchanged.

## Testing plan

### Config tests

- Reads `labels.visible_exact` from TOML.
- Normalizes default workflow sections, fields, and editable fields.
- Ignores unknown field ids.
- Keeps fallback behavior for missing/invalid config.

### Label display tests

- `filterVisibleLabels` keeps prefix matches and exact matches.
- Board/List/Epics show exact labels such as `pr` and `human` when configured.
- Board workflow chips are absent.

### Detail rendering tests

- Detail renders the workflow summary only when at least one configured section has displayable rows.
- Workflow summary renders configured sections and fields.
- `execution_lane=spec_backed` renders as a valid route value.
- Missing/invalid values are hidden.
- Review gate rows combine labels and provenance metadata.

### Route edit tests

- Route starts read-only.
- `Edit` switches route fields to select controls.
- `Cancel` discards draft values.
- `Save` sends one route metadata mutation with changed values.
- Save success updates from returned issue and exits edit mode.
- Save failure shows error toast and preserves existing state.

### Server mutation tests

- Valid route update calls `bd update` with `--set-metadata` flags.
- `execution_lane` update removes old lane labels and adds the new lane label.
- Invalid enum values are rejected before invoking `bd`.
- Updated issue is read back and returned.

### Artifact path tests

- Artifact paths render inside the workflow summary `artifacts` section.
- Full path is visible without ellipsis behavior.
- Long path wraps.
- Clicking path copies the full value and shows success toast.

## Rollout notes

This is a UI/config behavior change. Runtime validation after implementation should use the canonical shared server flow when merged:

```bash
bdui-shared restart
```

Then verify the running process path, listening port, and a basic HTTP response before claiming the runtime reflects the merged checkout.

## Execution lane

Recommended execution lane: `plan`.

Rationale: this touches server config schema, client state/config, label rendering, Detail rendering, server mutation behavior, contract-derived metadata semantics, and tests across several surfaces. It is not a bounded quick edit, and it needs a reviewed plan before implementation.
