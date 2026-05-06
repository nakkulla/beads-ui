# Detail workflow contract sections and route metadata editing design

## 문제 정의

`beads-ui`의 Detail view는 dotfiles Bead workflow 상태를 더 정확히 보여줘야
한다. 현재 UI는 일부 오래된 workflow metadata(`run_started_at`,
`run_finished_at`, `skill_workflow`)와 `plan|quick_edit` 중심의 workflow
summary를 고정 렌더링한다. 하지만 현재 dotfiles의 active source는
`shared/skills/workflow/resources/workflow-core.yaml`이며, Bead workflow state는
core metadata와 derived label로 나뉜다.

사용자는 Board/List/Epics 같은 scan surface에서는 label만 빠르게 보면 충분하다.
반대로 Detail view에서는 source-of-truth metadata, derived label 상태,
review/freshness evidence, artifact path, delivery/follow-up/human blocker
정보를 section별로 확인해야 한다. 또한 사람이 수정할 수 있는 값은 route
correction에 필요한 최소 metadata로 제한해야 한다.

## 목표

- Board/List/Epics에서 별도 workflow chip을 제거하고 label display policy만
  사용한다.
- `~/.config/bdui/config.toml`의 Detail config로 workflow summary section/field
  표시를 제어한다.
- `beads-ui` 코드 안에 current dotfiles workflow contract subset을 field
  registry로 명시한다.
- Config는 표시 allowlist만 담당하고, field source mapping, allowed values,
  formatter, editability, validation은 code가 소유한다.
- Detail view는 route, artifacts, review gates, freshness, delivery, follow-up,
  human blocker section을 contract field 기반으로 표시한다.
- Route metadata만 명시적 `Edit` / `Save` / `Cancel` UX로 수정한다.
- Route topology는 독립 필드 세 개가 아니라 valid preset(`direct`, `pr`)으로
  편집해 invalid route 조합을 방지한다.
- `execution_lane` 저장 시 `lane:*` mirror labels를 metadata와 동기화한다.
- `spec_id`, `metadata.plan`, `metadata.handoff` path는 read-only full-wrap/copy
  UX로 표시한다.
- dotfiles shared runtime config 기본값/기존 사용자 config drift는 target-owned
  cross-repo follow-up으로 분리한다.

## 비목표

- dotfiles `workflow-core.yaml`을 `beads-ui` 서버가 런타임에 직접 읽는 기능은
  만들지 않는다.
- Raw metadata JSON editor를 만들지 않는다.
- Board/List/Epics에 별도 workflow chip 또는 workflow column을 추가하지 않는다.
- Review/freshness evidence를 사람이 수정할 수 있게 하지 않는다.
- `spec_id`, `plan`, `handoff`, PR, follow-up, human blocker metadata를
  Detail에서 편집 가능하게 하지 않는다.
- dotfiles repository 파일이나 installed `~/.config/bdui/config.toml`을 이
  beads-ui 구현에서 직접 수정하지 않는다.
- run ledger/evidence artifact JSON을 읽거나 표시하는 backend API를 추가하지
  않는다.
- Beads core schema나 dotfiles workflow contract 자체를 변경하지 않는다.

## 현재 상태와 근거

### `UI-hjii` seed context

`UI-hjii`는 `open` 상태의 `feature` issue이며, 기존 spec은
`docs/superpowers/specs/2026-05-05-detail-workflow-config-design.md`이다. Bead
metadata는 `execution_lane=plan`, `workspace_policy=worktree`,
`branch_policy=feature`, `finish_action=pr`로 이미 formal PR topology를
가리킨다.

### current dotfiles workflow contract

현재 active source는 `shared/skills/workflow/resources/workflow-core.yaml`이다.

Relevant contract facts:

- Required Bead work metadata: `execution_lane`, `workspace_policy`,
  `branch_policy`, `finish_action`.
- Execution lanes: `quick_edit`, `spec_backed`, `plan`.
- Allowed route topologies:
  - `direct`: `workspace_policy=current`, `branch_policy=same`,
    `finish_action=direct`
  - `pr`: `workspace_policy=worktree`, `branch_policy=feature`,
    `finish_action=pr`
- Event labels: `reviewed:spec`, `reviewed:plan`, `reviewed:impl`,
  `skill-related`.
- Derived labels:
  - `has:spec` from `spec_id`
  - `has:plan` from `metadata.plan`
  - `has:handoff` from `metadata.handoff`
  - `lane:quick_edit`, `lane:spec_backed`, `lane:plan` from
    `metadata.execution_lane`
  - `human` from `metadata.human_decision_required=yes`
  - `pr` from `metadata.pr_url`
  - `followup:cross-repo`, `followup:scope-boundary`,
    `followup:merge-after-only` from `metadata.followup_kind`
- Review/freshness metadata includes `spec_review_*`, `plan_review_*`,
  `impl_review_*`, `execution_base_sha`, `spec_freshness_checked_at_sha`,
  `plan_freshness_checked_at_sha`, `spec_handoff_*`.
- `metadata.pr_url` is PR Delivery evidence only; closure still belongs to PR
  Finish/base verification.

### current `beads-ui` surfaces

`app/utils/workflow-summary.js` currently normalizes only
`execution_lane=plan|quick_edit`,
`skill_workflow=none|writing_skills|skill_creator`, workflow timestamps, and PR
URL. It returns both Detail rows and Board chips.

`app/views/board.js` currently renders config-filtered labels and extra workflow
chips. The redesigned Board should render only labels.

`app/views/detail.js` currently renders `spec_id`, `metadata.plan`, and
`metadata.handoff` in a separate Metadata card with expand/collapse path
behavior, then renders a fixed Workflow summary card from
`workflowSummaryFromIssue(issue)`. The redesigned Detail should replace both
with config-driven workflow sections and full-wrap/copy artifact paths.

`server/config.js`, `server/app.js`, and `app/state.js` currently normalize only
`label_display_policy.visible_prefixes` plus workspace config. They need to
carry `visible_exact` and `detail.workflow_summary` config.

### dotfiles config rollout state

Dotfiles `install-shell.sh` currently creates `~/.config/bdui/config.toml` only
when missing, and its default label policy remains
`visible_prefixes = ["has:", "reviewed:"]`. Existing user config may contain
stale label values such as standalone `quick_edit` or `followup` prefixes. Since
this is dotfiles-owned runtime rollout policy, `UI-hjii` must not update it
directly; it should create or reuse a target-owned dotfiles follow-up after the
refreshed spec is approved.

## 설계 결정

### 1. `beads-ui` owns a UI field registry, not the runtime YAML reader

`beads-ui` should not require a dotfiles checkout or YAML parser to render
Detail workflow fields. Instead, it should define a small app-owned registry for
the current contract subset it displays and edits. This keeps standalone
`beads-ui` usable outside dotfiles while aligning the shared runtime UI with
current dotfiles semantics.

### 2. Config is display policy only

`config.toml` decides which sections and field ids are shown. It does not define
source metadata keys, enum values, editability, label derivation, save behavior,
or safety rules. Unknown sections and field ids are ignored.

### 3. Scan surfaces show labels only

Board/List/Epics should use `labels.visible_prefixes` and
`labels.visible_exact`. They should not call a workflow chip builder. This
avoids duplicate route/follow-up/PR representation and lets derived labels
remain the scan surface source.

### 4. Detail is the contract inspection surface

Detail should render config-selected workflow sections from canonical fields.
The default set should be useful for current dotfiles work but still hide
missing values. Evidence fields are read-only.

### 5. Route editing uses topology presets

The existing four independent route metadata fields can form invalid
combinations. Detail route edit should expose:

- `execution_lane`: `quick_edit | spec_backed | plan`
- `topology`: `direct | pr`

Saving `topology=direct` writes `workspace_policy=current`,
`branch_policy=same`, `finish_action=direct`. Saving `topology=pr` writes
`workspace_policy=worktree`, `branch_policy=feature`, `finish_action=pr`.

If an issue already has an invalid topology combination, Detail shows the raw
values plus an invalid warning. Save is allowed only after the user chooses a
valid topology preset.

### 6. Evidence stays workflow-owned

Detail route edit must not write review labels, review metadata, freshness
metadata, artifact path metadata, delivery metadata, follow-up metadata, or
human blocker metadata. Workflow/review/finish skills remain the owners of those
fields.

## Config schema

Default config shape:

```toml
[labels]
visible_prefixes = ["has:", "reviewed:", "lane:", "followup:"]
visible_exact = ["pr", "human", "skill-related"]

[detail.workflow_summary]
sections = ["route", "artifacts", "review_gates", "freshness", "delivery", "followup", "human"]

[detail.workflow_summary.route]
fields = ["execution_lane", "topology", "workspace_policy", "branch_policy", "finish_action"]
editable_fields = ["execution_lane", "topology"]

[detail.workflow_summary.artifacts]
fields = ["spec_id", "plan", "handoff"]

[detail.workflow_summary.review_gates]
fields = ["status", "verdict", "final_source", "external_attempts", "reviewed_at_sha", "content_hash"]

[detail.workflow_summary.freshness]
fields = ["execution_base_sha", "spec_freshness_checked_at_sha", "plan_freshness_checked_at_sha", "spec_handoff_at_sha", "spec_handoff_content_hash"]

[detail.workflow_summary.delivery]
fields = ["pr_url"]

[detail.workflow_summary.followup]
fields = ["followup_kind", "source_repo", "source_bead", "source_artifact", "source_pr", "target_repo", "target_paths", "required_action"]

[detail.workflow_summary.human]
fields = ["human_decision_required"]
```

Normalization rules:

- Missing `labels.visible_prefixes` keeps the current backward-compatible app
  default `['has:', 'reviewed:']`. Dotfiles-owned config generation may opt into
  the richer current-contract label defaults through the cross-repo follow-up.
- Missing `labels.visible_exact` becomes `[]` for strict backward compatibility.
- Missing `detail.workflow_summary` uses the app default sections and fields
  above.
- Unknown sections, unknown fields, and non-editable field ids listed under
  `editable_fields` are ignored.
- Invalid TOML keeps existing safe fallback behavior and logs debug output.

## Label display policy

`label_display_policy` becomes prefix plus exact matching.

| Config key                | Meaning                                                         |
| ------------------------- | --------------------------------------------------------------- |
| `labels.visible_prefixes` | Show labels whose text starts with a configured prefix.         |
| `labels.visible_exact`    | Show labels whose full text exactly matches a configured value. |

Recommended current dotfiles values:

- Prefixes: `has:`, `reviewed:`, `lane:`, `followup:`
- Exact: `pr`, `human`, `skill-related`

Standalone legacy labels such as `quick_edit` or generic `followup` are not
route or follow-up source-of-truth. If present, they may be displayed only when
explicitly configured, but they must not influence route/follow-up
interpretation.

## Detail field registry

### `route`

| Field id           | Source                                                            | Display                            | Editable | Allowed values                      |
| ------------------ | ----------------------------------------------------------------- | ---------------------------------- | -------- | ----------------------------------- |
| `execution_lane`   | `metadata.execution_lane`                                         | value/select                       | yes      | `quick_edit`, `spec_backed`, `plan` |
| `topology`         | derived from `workspace_policy`, `branch_policy`, `finish_action` | `direct`, `pr`, or invalid warning | yes      | `direct`, `pr`                      |
| `workspace_policy` | `metadata.workspace_policy`                                       | value text                         | no       | `current`, `worktree`               |
| `branch_policy`    | `metadata.branch_policy`                                          | value text                         | no       | `same`, `feature`                   |
| `finish_action`    | `metadata.finish_action`                                          | value text                         | no       | `direct`, `pr`                      |

Topology derivation:

| Topology | Required metadata                                                        |
| -------- | ------------------------------------------------------------------------ |
| `direct` | `workspace_policy=current`, `branch_policy=same`, `finish_action=direct` |
| `pr`     | `workspace_policy=worktree`, `branch_policy=feature`, `finish_action=pr` |

Any other combination renders as invalid. Missing values render as absent unless
at least one route field exists, in which case the route section may show an
incomplete warning.

### `artifacts`

| Field id  | Source             | Display                         | Editable |
| --------- | ------------------ | ------------------------------- | -------- |
| `spec_id` | `issue.spec_id`    | full path, wraps, click-to-copy | no       |
| `plan`    | `metadata.plan`    | full path, wraps, click-to-copy | no       |
| `handoff` | `metadata.handoff` | full path, wraps, click-to-copy | no       |

The old separate Metadata path card is removed for these fields. Artifact fields
live under the workflow summary `artifacts` section.

### `review_gates`

Review gate rendering is gate-oriented. The section may render one compact row
group for `spec`, `plan`, and `impl` when at least one configured field has a
displayable value.

| Config field id     | Source                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------- |
| `status`            | labels `reviewed:spec`, `reviewed:plan`, `reviewed:impl`                                          |
| `verdict`           | `spec_review_verdict`, `plan_review_verdict`, `impl_review_verdict`                               |
| `final_source`      | `spec_review_final_source`, `plan_review_final_source`, `impl_review_final_source`                |
| `external_attempts` | `spec_review_external_attempts`, `plan_review_external_attempts`, `impl_review_external_attempts` |
| `reviewed_at_sha`   | `spec_reviewed_at_sha`, `plan_reviewed_at_sha`, `impl_reviewed_at_sha`                            |
| `content_hash`      | `spec_content_hash`, `plan_content_hash`; no impl content hash unless later added                 |

Review status is display-only. It is not Bead completion evidence and does not
authorize PR Finish/closure.

### `freshness`

| Field id                        | Source                                   | Editable |
| ------------------------------- | ---------------------------------------- | -------- |
| `execution_base_sha`            | `metadata.execution_base_sha`            | no       |
| `spec_freshness_checked_at_sha` | `metadata.spec_freshness_checked_at_sha` | no       |
| `plan_freshness_checked_at_sha` | `metadata.plan_freshness_checked_at_sha` | no       |
| `spec_handoff_at_sha`           | `metadata.spec_handoff_at_sha`           | no       |
| `spec_handoff_content_hash`     | `metadata.spec_handoff_content_hash`     | no       |

These fields are advanced but important for current dotfiles workflow freshness
checks. They should be displayed only when present or explicitly configured.

### `delivery`

| Field id | Source            | Display                             | Editable |
| -------- | ----------------- | ----------------------------------- | -------- |
| `pr_url` | `metadata.pr_url` | safe `http:`/`https:` external link | no       |

Unsafe, invalid, empty, or relative URLs are hidden. `metadata.pr_url` is
displayed as PR Delivery evidence, not closure evidence.

### `followup`

| Field id          | Source                     | Editable |
| ----------------- | -------------------------- | -------- |
| `followup_kind`   | `metadata.followup_kind`   | no       |
| `source_repo`     | `metadata.source_repo`     | no       |
| `source_bead`     | `metadata.source_bead`     | no       |
| `source_artifact` | `metadata.source_artifact` | no       |
| `source_pr`       | `metadata.source_pr`       | no       |
| `target_repo`     | `metadata.target_repo`     | no       |
| `target_paths`    | `metadata.target_paths`    | no       |
| `required_action` | `metadata.required_action` | no       |

`followup_kind` display values are `cross_repo`, `scope_boundary`, and
`merge_after_only`. The derived labels are `followup:cross-repo`,
`followup:scope-boundary`, and `followup:merge-after-only`.

### `human`

| Field id                  | Source                             | Editable |
| ------------------------- | ---------------------------------- | -------- |
| `human_decision_required` | `metadata.human_decision_required` | no       |

When `metadata.human_decision_required=yes`, label policy may also display the
exact `human` label.

## Route edit UX

Default read-only state:

```text
Route
Execution lane   plan
Topology         pr
Workspace        worktree
Branch           feature
Finish           pr
[Edit]
```

Edit state:

```text
Route
Execution lane   [plan ▼]
Topology         [pr ▼]
Workspace        worktree
Branch           feature
Finish           pr

[Save] [Cancel]
```

Invalid topology state:

```text
Route
Execution lane   plan
Topology         Invalid route metadata
Workspace        current
Branch           feature
Finish           direct

[Edit]
```

When editing invalid route metadata, the topology select starts empty or at
`Choose topology`. Save requires selecting `direct` or `pr`.

Behavior:

- `Edit` creates a draft from current valid values.
- `Cancel` discards the draft.
- `Save` writes all changed route values in one mutation.
- During save, controls are disabled.
- On success, the server returns the readback issue and UI leaves edit mode.
- On failure, existing issue state remains visible and an error toast is shown.

## Route metadata mutation

Add a WebSocket request type such as `update-route-metadata`.

Payload shape:

```ts
{
  id: string,
  values: {
    execution_lane?: 'quick_edit' | 'spec_backed' | 'plan',
    topology?: 'direct' | 'pr'
  }
}
```

Server behavior:

1. Validate issue id and provided values.
2. Expand `topology` into route metadata fields:
   - `direct` → `workspace_policy=current`, `branch_policy=same`,
     `finish_action=direct`
   - `pr` → `workspace_policy=worktree`, `branch_policy=feature`,
     `finish_action=pr`
3. Build one `bd update <id>` command with repeated `--set-metadata key=value`
   flags.
4. If `execution_lane` is provided, sync lane mirror labels in the same command:
   - remove `lane:quick_edit`, `lane:spec_backed`, `lane:plan`
   - add `lane:<execution_lane>`
5. Do not write any non-route metadata or non-lane labels.
6. Read back via `bd show <id> --json` using the existing issue read path.
7. Return the updated issue payload.
8. Trigger the existing post-mutation subscription refresh.

Example command shape:

```bash
bd update UI-hjii \
  --set-metadata execution_lane=plan \
  --set-metadata workspace_policy=worktree \
  --set-metadata branch_policy=feature \
  --set-metadata finish_action=pr \
  --remove-label lane:quick_edit \
  --remove-label lane:spec_backed \
  --remove-label lane:plan \
  --add-label lane:plan
```

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
.workflow-artifact__value {
  white-space: normal;
  overflow-wrap: anywhere;
  word-break: break-word;
}
```

The old expand/collapse path toggle is removed for these fields.

## Data flow

1. Server starts and loads TOML config once via `server/config.js`.
2. Server sends normalized config through root bootstrap and `/api/config`.
3. Client stores normalized config under `state.config`.
4. Board/List/Epics derive visible labels from `visible_prefixes` and
   `visible_exact`.
5. Detail derives visible workflow summary sections/fields from
   `state.config.detail.workflow_summary`.
6. Detail section builder reads the issue payload and the app-owned field
   registry.
7. Route edit sends `update-route-metadata` only for route correction.
8. Server validates, updates Beads, readbacks the issue, returns it, and
   refreshes active subscriptions.
9. Config changes require server restart; open clients pick them up through
   reconnect config refresh or browser refresh.

## Error handling

- Invalid config file: use existing fallback config and log debug output.
- Unknown config ids: ignore them.
- Missing field value: do not render the row.
- Existing invalid enum: render as invalid/absent, never offer it as a select
  option.
- Existing invalid topology: show warning and require valid topology preset
  before save.
- Route save validation failure: reject mutation and show error toast.
- `bd update` failure: return `bd_error`; UI keeps prior issue state and shows
  error toast.
- `bd show` readback failure: return `bd_error`; UI keeps prior issue state and
  shows error toast.
- Clipboard failure: show failure toast and keep UI unchanged.
- Unsafe PR URL: hide link.

## Testing plan

### Config tests

- Reads `labels.visible_exact` from TOML.
- Normalizes default workflow sections, fields, and editable fields.
- Ignores unknown section and field ids.
- Keeps fallback behavior for missing/invalid config.
- Keeps backward compatibility for configs that define only
  `labels.visible_prefixes`.

### Label display tests

- `filterVisibleLabels` keeps prefix matches and exact matches.
- Board/List/Epics show exact labels such as `pr`, `human`, and `skill-related`
  when configured.
- Board workflow chips are absent.
- Standalone legacy `quick_edit` is not treated as `metadata.execution_lane`
  evidence.

### Detail rendering tests

- Detail renders the workflow summary only when at least one configured section
  has displayable rows.
- Workflow summary renders configured sections and fields.
- `execution_lane=spec_backed` renders as a valid route value.
- `topology=direct` renders from `current/same/direct`.
- `topology=pr` renders from `worktree/feature/pr`.
- Invalid topology renders a warning.
- Review gate rows combine `reviewed:*` labels and review metadata.
- Freshness fields render only when present/configured.
- PR URL renders only when safe.
- Follow-up and human sections are read-only.

### Route edit tests

- Route starts read-only.
- `Edit` switches `execution_lane` and `topology` to select controls.
- `Cancel` discards draft values.
- Invalid topology requires selecting a valid topology before Save.
- `Save` sends one route metadata mutation with changed values.
- Save success updates from returned issue and exits edit mode.
- Save failure shows error toast and preserves existing state.
- No UI path attempts to write review, freshness, artifact, delivery, follow-up,
  or human metadata.

### Server mutation tests

- Valid route update calls `bd update` with `--set-metadata` flags.
- `topology=direct` expands to `current/same/direct`.
- `topology=pr` expands to `worktree/feature/pr`.
- `execution_lane` update removes all old lane labels and adds the matching lane
  label.
- Invalid enum values are rejected before invoking `bd`.
- Updated issue is read back and returned.
- Mutation triggers the existing subscription refresh path.

### Artifact path tests

- Artifact paths render inside the workflow summary `artifacts` section.
- Full path is visible without ellipsis behavior.
- Long path wraps.
- Clicking path copies the full value and shows success toast.
- Clipboard failure shows failure toast.

### Required validation

Before implementation handoff, run:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
```

## Rollout notes

This is a UI/config behavior change. Runtime validation after implementation
should use the canonical shared server flow after merge:

```bash
bdui-shared restart
```

Then verify the running process path, listening port, and a basic HTTP response
before claiming the runtime reflects the merged checkout.

If implementation edits frontend source but runs without
`BDUI_FRONTEND_MODE=live`, run `npm run build` before expecting the shared
static bundle to reflect UI changes.

## Follow-up disposition

This spec intentionally splits `beads-ui` implementation from dotfiles runtime
config rollout.

### Create or reuse

- Target repo: `nakkulla/dotfiles`
- Follow-up kind: `cross_repo`
- Source repo: `nakkulla/beads-ui`
- Source bead: `UI-hjii`
- Source artifact:
  `docs/superpowers/specs/2026-05-05-detail-workflow-config-design.md`
- Required action: update dotfiles-owned `~/.config/bdui/config.toml` generation
  and safe existing-config migration guidance for the current beads-ui workflow
  summary config.

Expected future scope:

1. Update dotfiles config generator defaults to include current label policy:
   - `visible_prefixes = ["has:", "reviewed:", "lane:", "followup:"]`
   - `visible_exact = ["pr", "human", "skill-related"]`
2. Decide whether dotfiles should generate default `[detail.workflow_summary]`
   section/field config or rely on beads-ui app defaults.
3. Preserve existing user config by default. Do not blindly overwrite
   `~/.config/bdui/config.toml`.
4. If stale installed config migration is needed, design a target-owned safe
   migration or warning path in dotfiles.

The cross-repo follow-up should be description-only at this handoff. It must not
receive `spec_id`, `has:spec`, `reviewed:*`, review freshness metadata,
`execution_lane`, or lane labels until it goes through its own future
brainstorming/spec/plan/implementation cycle.

### No-create items

- No follow-up is needed for dynamic YAML contract loading because this spec
  explicitly rejects runtime YAML reads.
- No follow-up is needed for Beads core schema changes because this spec
  consumes existing fields only.
- No follow-up is needed for `bd-ralph-v4` or run-ledger emitters because they
  are not active targets for this `beads-ui` UI consumer redesign.

## Acceptance criteria

- Scan surfaces show workflow-related state only through configured labels.
- Detail workflow summary is config-driven and section-based.
- Current dotfiles execution lanes, route topology values, derived labels,
  review/freshness metadata, PR delivery metadata, follow-up metadata, and human
  blocker metadata are represented correctly.
- Route editing cannot create invalid topology combinations.
- Route editing synchronizes `metadata.execution_lane` and `lane:*` mirror
  labels.
- Evidence/artifact/delivery/follow-up/human metadata remains read-only in the
  UI.
- Artifact paths display full values with wrapping and click-to-copy.
- Backward-compatible config behavior remains for existing prefix-only configs.
- Required tests and pre-handoff validation pass, or blockers are documented.
- Dotfiles config rollout is tracked as a cross-repo follow-up after the
  refreshed spec is approved.

## Execution lane

`execution_lane=plan`

Rationale: this touches server config schema, bootstrap/client state, label
rendering, Board/List/Epics behavior, Detail rendering, route mutation behavior,
current dotfiles workflow contract semantics, and tests across several surfaces.
It is not a bounded quick edit, and it needs a reviewed plan before
implementation.

The spec does not replace a plan. After external spec review, execution should
write a reviewed implementation plan before code changes.
