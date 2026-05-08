# Route topology matrix and review profile UI design

## 문제 정의

`beads-ui` Detail workflow editor는 dotfiles workflow contract의 durable
metadata를 소비하는 UI다. 기존 UI-vmby spec은 route topology matrix 확장을
다루었지만, 이후 dotfiles 쪽에서 두 계약 변경이 구현되었다.

- `dotfiles-o70v`: route topology를 5개 concrete tuple로 승격했다.
- `dotfiles-n76a`: formal review gate intensity를 고르는
  `metadata.review_profile` 계약을 추가했다.

따라서 bdui는 route metadata를 `topology` preset이 아니라 concrete fields로
편집해야 하고, 같은 workflow settings surface에서 `review_profile`도 선택할 수
있어야 한다.

## 목표

- `topology` route field를 bdui config, utility, Detail editor, websocket
  payload에서 제거한다.
- Detail editor는 `Workflow settings` 통합 편집 패널을 제공한다.
- `Workflow settings`는 route concrete fields와 review profile을 한 번에
  편집한다.
- bdui는 dotfiles contract와 같은 valid route matrix를 local registry로 가진다.
- invalid route tuple과 invalid review profile은 Detail에서 보이지만 저장은
  막는다.
- Board compact route chip은 5개 valid tuple을 구분해서 표시한다.
- Board에는 `review_profile` chip을 추가하지 않는다.
- Legacy config가 `route` 또는 `topology`를 포함해도 UI가 깨지지 않도록
  `workflow_settings` default로 fallback한다.

## 비목표

- bdui 서버가 dotfiles `workflow-core.yaml`을 런타임에 직접 읽지 않는다.
- raw metadata editor를 만들지 않는다.
- review/freshness/delivery evidence metadata 편집 범위를 넓히지 않는다.
- `review_profile` 변경으로 기존 `reviewed:*` evidence를 자동 무효화하지 않는다.
- `review_profile` mirror label을 만들지 않는다.
- Beads core schema를 바꾸지 않는다.
- dotfiles repo 파일이나 installed `~/.config/bdui/config.toml`을 bdui 구현에서
  직접 수정하지 않는다.

## Contract facts consumed by bdui

### Route matrix

bdui local registry는 dotfiles workflow contract의 allowed topology matrix와
같은 concrete tuple을 소유한다.

| tuple id                  | workspace_policy | branch_policy | finish_action | compact label     |
| ------------------------- | ---------------- | ------------- | ------------- | ----------------- |
| `current_same_direct`     | `current`        | `same`        | `direct`      | `Direct`          |
| `current_feature_direct`  | `current`        | `feature`     | `direct`      | `Current direct`  |
| `current_feature_pr`      | `current`        | `feature`     | `pr`          | `Current PR`      |
| `worktree_feature_direct` | `worktree`       | `feature`     | `direct`      | `Worktree direct` |
| `worktree_feature_pr`     | `worktree`       | `feature`     | `pr`          | `Worktree PR`     |

Invalid combinations include:

- `current + same + pr`
- `worktree + same + direct`
- `worktree + same + pr`

`finish_action=direct` with `branch_policy=feature` means the feature branch
result must be landed to target/base without PR and verified there before close.
bdui only records/displays metadata; execution workflows enforce closure
semantics.

### Review profile

`metadata.review_profile` is the durable selector for future formal review gate
intensity.

Valid explicit values:

- `light`
- `standard`
- `deep`

When `metadata.review_profile` is absent, the effective profile is the contract
`review.default_profile`, currently `standard`.

bdui should display absent profile metadata as `Default (standard)` and should
save that choice by unsetting `metadata.review_profile`, not by writing a
synthetic `default` value.

Changing `metadata.review_profile` after a Bead already has `reviewed:*`
evidence is allowed. It is a future gate preference only; bdui must not remove
labels, review metadata, attempt counters, or freshness evidence because the
profile changed.

Unknown `metadata.review_profile` values are invalid contract state. Detail
should surface them and allow the user to correct them, not silently treat them
as default.

## Workflow settings section

The Detail workflow summary should replace the old `route` section with a new
`workflow_settings` section.

Default field order:

1. `execution_lane`
2. `workspace_policy`
3. `branch_policy`
4. `finish_action`
5. `review_profile`

Default editable fields are the same five fields.

The section title shown to users is `Workflow settings`.

The edit mode shows five selects:

1. Execution lane
2. Workspace
3. Branch
4. Finish
5. Review profile

The route selects expose all enum values instead of dynamically hiding invalid
combinations. If the selected route tuple is invalid, the editor shows an inline
warning and disables Save. This keeps impossible combinations visible and
learnable without allowing bad metadata writes.

The review profile select exposes:

- `Default (standard)`
- `light`
- `standard`
- `deep`

The default option maps to `review_profile: null` in the client payload so the
server can unset the metadata key. Explicit profile values map to the matching
string.

Existing invalid route metadata and invalid review profile metadata should
preload into the editor. The user can change fields until all values are valid.

## Config migration behavior

Default config changes from route-centric to workflow-settings-centric fields:

```toml
[detail.workflow_summary]
sections = ["workflow_settings", "artifacts", "review_gates", "freshness", "delivery", "followup", "human"]

[detail.workflow_summary.workflow_settings]
fields = ["execution_lane", "workspace_policy", "branch_policy", "finish_action", "review_profile"]
editable_fields = ["execution_lane", "workspace_policy", "branch_policy", "finish_action", "review_profile"]
```

`server/config.js`, `app/state.js`, and app bootstrap defaults should remove
`topology` from the route/workflow allowlist and add `workflow_settings`.

Legacy behavior:

- If config uses `sections = ["route", ...]`, normalize it to
  `workflow_settings`.
- If config includes `topology`, drop it.
- If dropping legacy fields would leave the workflow settings editor incomplete,
  use the new default workflow settings field list.
- Continue to ignore unknown sections and unknown field ids.

This is compatibility behavior, not continued support for `topology` as a
first-class field.

Dotfiles does not need a new config rollout follow-up for this change. The
existing dotfiles config rollout decision leaves `[detail.workflow_summary]`
absent so bdui app defaults own this section and field schema.

## Frontend utility design

`app/utils/workflow-fields.js` should define an app-owned workflow registry.

Expected exported behavior:

- `EXECUTION_LANES` remains `quick_edit`, `spec_backed`, `plan`.
- Add enum lists for `WORKSPACE_POLICIES`, `BRANCH_POLICIES`, `FINISH_ACTIONS`,
  and `REVIEW_PROFILES`.
- Add a default review profile display constant for `Default (standard)`.
- Replace `TOPOLOGIES` with a route matrix registry, for example `ROUTE_TUPLES`.
- Replace `deriveTopology(metadata)` with `deriveRouteTuple(metadata)`
  returning:
  - `{ kind: 'valid', id, label }`
  - `{ kind: 'invalid', value: null }`
  - `{ kind: 'absent', value: null }`
- Add `deriveReviewProfile(metadata)` returning:
  - `{ kind: 'default', value: null, label: 'Default (standard)' }`
  - `{ kind: 'valid', value, label }`
  - `{ kind: 'invalid', value, label: 'Invalid review profile' }`
- Replace `routeMutationValues(lane, topology)` with workflow settings
  validation, for example
  `workflowSettingsMutationValues(lane, workspace_policy, branch_policy, finish_action, review_profile)`.
- `buildWorkflowSections()` recognizes `workflow_settings` and no longer
  recognizes `topology` as a display field.

The registry remains app-owned. It should not import or parse dotfiles YAML.

## Detail editor UX

The old route edit state should become workflow settings edit state.

Save sends concrete values:

```json
{
  "id": "UI-123",
  "values": {
    "execution_lane": "plan",
    "workspace_policy": "current",
    "branch_policy": "feature",
    "finish_action": "pr",
    "review_profile": null
  }
}
```

Rules:

- `review_profile: null` means unset metadata and use contract default.
- `review_profile: "light" | "standard" | "deep"` means set metadata explicitly.
- The UI must keep existing pending behavior: controls disabled while save is
  pending, failure preserves the draft, success exits edit mode and renders
  refreshed issue data.
- The section remains editable even when the issue already has `reviewed:*`
  labels.
- The UI should include concise helper text that review profile affects future
  formal review gates and does not change existing review evidence.

## Server websocket mutation

Replace the route-specific save path with a workflow settings mutation.

Message type:

```text
update-workflow-settings
```

Server validation:

- `execution_lane` must be one of the known lanes.
- `workspace_policy`, `branch_policy`, and `finish_action` must form one of the
  5 valid route tuples.
- `review_profile` must be `null`, `light`, `standard`, or `deep`.
- Invalid combinations fail before calling `bd update`.

Successful writes:

- Set `execution_lane`.
- Set `workspace_policy`, `branch_policy`, and `finish_action`.
- If `review_profile` is `null`, unset `metadata.review_profile`.
- If `review_profile` is explicit, set `metadata.review_profile=<value>`.
- Remove existing `lane:*` labels and add the matching lane label.
- Do not add or remove any review labels.
- Do not alter review evidence metadata.

The old `update-route-metadata` client path can be removed or left as a
temporary server-side alias only if implementation finds a concrete
compatibility need. No external protocol consumer is currently known, so the
default plan should use the new mutation name consistently in protocol, Detail,
server handling, and tests.

## Board and compact route labels

Board workflow route chips should use the valid tuple label:

- `Direct`
- `Current direct`
- `Current PR`
- `Worktree direct`
- `Worktree PR`

Invalid or absent route metadata should not render a route chip on Board. Detail
remains the surface that shows invalid route metadata and lets users fix it.

Board should not render `review_profile` as a chip in this version. Review
intensity is a Detail-level setting, not a primary Board scan signal.

## Existing Beads migration

Current read-only scan found no open, in-progress, or blocked Beads in beads-ui
or dotfiles with `metadata.review_profile` set. Therefore the requested "open
Beads use default" state is already satisfied without durable Beads writes.

If implementation later finds open Beads with `metadata.review_profile=standard`
and no specific reason to pin the profile, it may report them as cleanup
candidates, but this UI spec does not require a tracker migration.

## Tests

Update or add focused tests for:

- `app/utils/workflow-fields.test.js`
  - derives all 5 valid route tuples;
  - rejects the 3 invalid tuples;
  - derives absent review profile as `Default (standard)`;
  - reports unknown review profile as invalid;
  - builds workflow settings mutation values with `review_profile: null` for
    default;
  - no longer includes `topology` rows.
- `app/views/detail.test.js` and `app/views/detail.toast.test.js`
  - renders five workflow settings selects;
  - disables Save for invalid route tuple;
  - disables Save for invalid review profile until corrected;
  - sends `update-workflow-settings` with concrete route fields and review
    profile;
  - preserves draft on save failure;
  - handles legacy invalid route metadata and unknown review profile.
- `server/ws.mutations.test.js`
  - writes each valid route tuple;
  - rejects invalid route tuple before `bd update`;
  - sets explicit `review_profile` values;
  - unsets `review_profile` for default;
  - syncs lane labels and does not write review profile labels.
- `server/config.test.js`, `server/app.test.js`, `app/state.test.js`
  - default config uses `workflow_settings` concrete fields;
  - legacy `route` and `topology` config falls back to the new default workflow
    settings config.
- `app/views/board.test.js`
  - renders compact labels for valid route tuples;
  - suppresses invalid tuples;
  - does not render review profile chips.
- `app/protocol.test.js` if present or nearby protocol tests exist
  - includes `update-workflow-settings` in the client/server message type
    allowlist.

## Verification

Expected verification after implementation:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
```

Because this touches frontend source, the final implementation must include
updated `app/main.bundle.js` and `app/main.bundle.js.map`.

Post-merge runtime validation still follows repo policy: rebuild from the merged
checkout, restart the shared server with `bdui-shared restart`, then verify
process path, listening port, and an HTTP response.

## Coordinated dotfiles work

The route topology companion dotfiles contract was implemented by
`dotfiles-o70v`. The review profile contract was implemented by `dotfiles-n76a`.

bdui should treat both as current contract inputs. It should not modify dotfiles
contract files during this implementation.

## Execution lane

`execution_lane=plan`.

Rationale: this migration touches frontend utilities, Detail UI, websocket
protocol shape, server validation, config normalization, Board chips, tests,
generated bundle, and current dotfiles workflow contract consumers. A separate
reviewed implementation plan is needed before execution.
