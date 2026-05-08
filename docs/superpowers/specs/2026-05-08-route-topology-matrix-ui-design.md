# Route topology matrix UI design

## 문제 정의

`beads-ui` Detail route editor는 현재 UI-only `topology` preset만 편집한다.
코드와 서버는 두 preset을 hardcode한다.

- `direct` → `workspace_policy=current`, `branch_policy=same`,
  `finish_action=direct`
- `pr` → `workspace_policy=worktree`, `branch_policy=feature`,
  `finish_action=pr`

이 때문에 실제 workflow에서 가능한 `current + feature + pr` 같은 조합이
`Invalid route metadata`로 표시된다. dotfiles contract도 route matrix를 확장할
예정이므로, bdui는 `topology` abstraction 대신 durable concrete metadata를 직접
표시하고 편집해야 한다.

## 목표

- `topology` route field를 bdui config, utility, detail editor, websocket payload에서
  제거한다.
- route editor는 `execution_lane`, `workspace_policy`, `branch_policy`,
  `finish_action` 네 필드를 concrete하게 편집한다.
- bdui는 dotfiles contract와 같은 valid route matrix를 local registry로 가진다.
- invalid tuple은 선택 상태로 볼 수 있지만 저장은 막는다.
- compact route chip/label은 5개 valid tuple을 구분해서 표시한다.
- legacy config가 `topology`를 포함해도 UI가 깨지지 않도록 새 default route config로
  fallback한다.

## 비목표

- bdui 서버가 dotfiles `workflow-core.yaml`을 런타임에 직접 읽지 않는다.
- raw metadata editor를 만들지 않는다.
- review/freshness/delivery metadata 편집 범위를 넓히지 않는다.
- Beads core schema를 바꾸지 않는다.
- dotfiles repo 파일을 bdui 구현에서 수정하지 않는다.

## Route matrix

bdui local registry는 dotfiles companion spec의 matrix와 같은 concrete tuple을
소유한다.

| tuple id | workspace_policy | branch_policy | finish_action | compact label |
| --- | --- | --- | --- | --- |
| `current_same_direct` | `current` | `same` | `direct` | `Direct` |
| `current_feature_direct` | `current` | `feature` | `direct` | `Current direct` |
| `current_feature_pr` | `current` | `feature` | `pr` | `Current PR` |
| `worktree_feature_direct` | `worktree` | `feature` | `direct` | `Worktree direct` |
| `worktree_feature_pr` | `worktree` | `feature` | `pr` | `Worktree PR` |

Invalid combinations:

- `current + same + pr`
- `worktree + same + direct`
- `worktree + same + pr`

`finish_action=direct` with `branch_policy=feature` means the feature branch result
must be landed to target/base without PR and verified there before close. bdui only
records/displays the metadata; execution workflows enforce closure semantics.

## Frontend utility design

`app/utils/workflow-fields.js` should replace `TOPOLOGIES` with a route matrix
registry, for example `ROUTE_TUPLES`.

Expected exported behavior:

- `EXECUTION_LANES` remains `quick_edit`, `spec_backed`, `plan`.
- Add enum lists for `WORKSPACE_POLICIES`, `BRANCH_POLICIES`, and
  `FINISH_ACTIONS`.
- Replace `deriveTopology(metadata)` with `deriveRouteTuple(metadata)` returning:
  - `{ kind: 'valid', id, label }`
  - `{ kind: 'invalid', value: null }`
  - `{ kind: 'absent', value: null }`
- Replace `routeMutationValues(lane, topology)` with concrete value validation,
  for example `routeMutationValues(lane, workspace_policy, branch_policy,
  finish_action)`.
- `buildWorkflowSections()` no longer recognizes `topology` as a route field.
  Route fields are the concrete fields only.

The registry remains app-owned. It should not import or parse dotfiles YAML.

## Detail editor UX

The Route section edit mode shows four selects:

1. Execution lane
2. Workspace
3. Branch
4. Finish

Each select offers its enum values. bdui does not dynamically hide options. If the
currently selected tuple is invalid, the editor shows an inline warning and disables
Save. This makes impossible combinations visible and learnable without allowing bad
metadata writes.

Existing invalid metadata should preload into the editor. The user can change any
field until the tuple becomes valid.

Save sends concrete values:

```json
{
  "id": "UI-123",
  "values": {
    "execution_lane": "plan",
    "workspace_policy": "current",
    "branch_policy": "feature",
    "finish_action": "pr"
  }
}
```

The UI must keep existing pending behavior: controls disabled while save is pending,
failure preserves the draft, success exits edit mode and renders refreshed issue data.

## Server websocket mutation

`server/ws.js` should validate concrete route metadata authoritatively.

- `execution_lane` must be one of the known lanes.
- `workspace_policy`, `branch_policy`, and `finish_action` must form one of the
  5 valid route tuples.
- Invalid combinations fail before calling `bd update`.
- Successful writes set the four metadata keys and sync `lane:*` labels.
- The server no longer accepts or maps a `topology` payload.

The mutation name can remain `update-route-metadata`; only the payload shape changes.

## Config migration behavior

Default route config changes from topology-centric fields to concrete fields:

```toml
[detail.workflow_summary.route]
fields = ["execution_lane", "workspace_policy", "branch_policy", "finish_action"]
editable_fields = ["execution_lane", "workspace_policy", "branch_policy", "finish_action"]
```

`server/config.js` and `app/state.js` should remove `topology` from the route field
allowlist. If a legacy user config includes `topology`, normalization should not leave
Route edit half-enabled. When route fields or editable fields normalize to an
incomplete route editor because legacy `topology` was dropped, use the new default
route config for that section.

This fallback is compatibility behavior, not continued support for `topology` as a
field.

## Board and compact route labels

Board workflow route chips should use the valid tuple label:

- `Direct`
- `Current direct`
- `Current PR`
- `Worktree direct`
- `Worktree PR`

Invalid or absent route metadata should not render a route chip on Board. Detail
remains the surface that shows invalid route metadata and lets users fix it.

## Tests

Update or add focused tests for:

- `app/utils/workflow-fields.test.js`
  - derives all 5 valid route tuples.
  - rejects the 3 invalid tuples.
  - builds concrete route mutation values.
  - route sections no longer include `topology`.
- `app/views/detail.test.js` and `app/views/detail.toast.test.js`
  - renders four route selects.
  - disables Save for invalid tuple.
  - sends concrete payload.
  - preserves draft on save failure.
  - handles legacy invalid route metadata.
- `server/ws.mutations.test.js`
  - writes each valid tuple.
  - rejects invalid tuple before `bd update`.
  - syncs lane labels.
- `server/config.test.js`, `server/app.test.js`, `app/state.test.js`
  - default config uses concrete fields.
  - legacy `topology` config falls back to the new default route config.
- `app/views/board.test.js`
  - renders compact labels for valid tuples.
  - suppresses invalid tuples.

## Verification

Expected verification after implementation:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
```

Because this touches frontend source, the final implementation must include updated
`app/main.bundle.js` and `app/main.bundle.js.map`.

Post-merge runtime validation still follows repo policy: rebuild from the merged
checkout, restart the shared server with `bdui-shared restart`, then verify process
path, listening port, and an HTTP response.

## Coordinated dotfiles work

The companion dotfiles contract spec is expected at:

`docs/superpowers/specs/2026-05-08-route-topology-matrix-contract-design.md`

bdui implementation should not proceed as if it is authoritative until the dotfiles
contract work has either landed or the implementation plan explicitly sequences the
cross-repo dependency.

## Execution lane

`execution_lane=plan`.

Rationale: this migration touches frontend utilities, Detail UI, websocket protocol
shape, server validation, config normalization, Board chips, tests, generated bundle,
and a coordinated dotfiles workflow contract. A separate reviewed implementation plan
is needed before execution.
