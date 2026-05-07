# Board card workflow chips design

## Problem

The Board is the primary scan surface for deciding what to work on next. Recent
workflow metadata is visible in Detail through configurable workflow sections,
but Board cards no longer show the execution lane or route topology. That makes
it hard to distinguish `plan`, `quick_edit`, and `spec_backed` work at a glance.

The current Board also derives a visible `pr` label from a safe
`metadata.pr_url`. That shows PR Delivery evidence, but it mixes workflow
evidence into the label row and does not distinguish route topology from actual
PR delivery.

This design intentionally revises the prior Detail workflow config decision that
Board cards should show only labels. The revision is narrow: Board gets a
separate workflow chip row; List and Epics remain unchanged.

## Goals

- Show workflow execution lane on Board cards.
- Show route topology on Board cards when the metadata forms a valid topology.
- Show PR Delivery evidence on Board cards without confusing it with route
  topology.
- Keep workflow chips visually and semantically separate from label badges.
- Avoid duplicate `PR` chip plus `pr` label output for the same delivery
  evidence.
- Preserve existing card navigation, drag behavior, sorting, and label display
  policy behavior outside the PR delivery adjustment.

## Non-goals

- Do not add workflow chips or workflow columns to List or Epics.
- Do not make Board workflow chips editable.
- Do not make the Board `PR` chip clickable.
- Do not read run ledger or evidence artifact JSON.
- Do not change Beads core schema or dotfiles workflow contracts.
- Do not treat `metadata.pr_url` as closure or PR Finish evidence.
- Do not expose unsafe, invalid, relative, or empty PR URLs.

## Terminology

- **Execution lane** is `metadata.execution_lane`. Valid display values are
  `plan`, `quick_edit`, and `spec_backed`.
- **Route topology** is derived from the route metadata triplet:
  `workspace_policy`, `branch_policy`, and `finish_action`.
  - `direct`: `current` + `same` + `direct`
  - `pr`: `worktree` + `feature` + `pr`
- **PR Delivery** means a safe `http:` or `https:` `metadata.pr_url` exists. It
  is delivery evidence only. It is not closure evidence and does not imply the
  PR has been merged or post-merge runtime validation has passed.

`pr` can mean two different things in casual conversation, so the UI must keep
them distinct:

- route topology `pr` means the work is intended to finish through a PR.
- PR Delivery means a PR URL exists.

## Current code state

- `app/views/board.js` renders a title, label badges, type, priority, issue id,
  and created-relative time.
- Board labels come from the issue labels after filtering through
  `label_display_policy`.
- Board currently calls `deriveBoardLabels(issue)`, which removes raw `pr` from
  labels and re-adds `pr` only when `metadata.pr_url` is a safe URL.
- Detail renders configurable workflow sections with `buildWorkflowSections()`
  from `app/utils/workflow-fields.js`.
- `app/utils/workflow-fields.js` already contains route topology derivation and
  a safe workflow URL helper.
- The current contract subset recognizes execution lanes `quick_edit`,
  `spec_backed`, and `plan`.

## Design

### Board chip row

Each Board card should render a workflow chip row immediately below the title
when at least one workflow chip is displayable.

The row should be separate from `.board-card__labels`. Workflow chips are not
label badges and are not controlled by the label display policy. Board cards
rendered through the push-store path and the fallback fetch path should derive
and render the same workflow chips from the same issue metadata.

Recommended display order:

1. execution lane chip
2. route topology chip
3. PR Delivery chip

### Chip labels

Use human-facing text on the card:

| Source                    | Raw value     | Chip text     |
| ------------------------- | ------------- | ------------- |
| `metadata.execution_lane` | `plan`        | `Plan`        |
| `metadata.execution_lane` | `quick_edit`  | `Quick edit`  |
| `metadata.execution_lane` | `spec_backed` | `Spec-backed` |
| derived topology          | `direct`      | `Direct`      |
| derived topology          | `pr`          | `PR route`    |
| safe `metadata.pr_url`    | present       | `PR`          |

The chip model may keep machine-readable fields such as `kind` and `value`, but
the visible card text should use the human-facing labels above.

### Data sources and validation

Board chips should be derived from metadata, not from labels:

- execution lane chip:
  - show only exact canonical values `plan`, `quick_edit`, or `spec_backed`.
  - hide absent, empty, case-mismatched, or unknown values.
- route topology chip:
  - derive from the exact triplet.
  - show `Direct` only for `workspace_policy=current`, `branch_policy=same`,
    `finish_action=direct`.
  - show `PR route` only for `workspace_policy=worktree`,
    `branch_policy=feature`, `finish_action=pr`.
  - hide absent or invalid route metadata on Board.
  - Detail remains the place to show invalid route metadata warnings.
- PR Delivery chip:
  - show only when `metadata.pr_url` parses as a safe `http:` or `https:` URL.
  - hide unsafe, invalid, relative, empty, or non-string values.
  - do not use `metadata.pr_number` alone to show a Board PR chip.

### PR label interaction

The derived `pr` label on Board should move into the workflow chip row.

Implications:

- Board should no longer force-add `pr` to `visible_exact`.
- Board should no longer add a derived `pr` label from `metadata.pr_url`.
- Raw or stale `pr` labels should continue to be hidden on Board, regardless of
  label display policy, because Board treats PR delivery as metadata-derived
  workflow evidence rather than as a user label.
- The safe `metadata.pr_url` evidence should show as the `PR` workflow chip
  instead of as a label badge.

This avoids rendering both `PR` and `pr` for the same delivery evidence.

### Interaction

Workflow chips are indicators only.

- Clicking anywhere on the card should continue to navigate to issue detail.
- Drag behavior should remain unchanged.
- The `PR` workflow chip should not be an anchor.
- Users can open the PR from Detail's Delivery section, where the safe PR URL is
  already rendered as an external link.

### Visual treatment

Add styles that are related to, but distinct from, label badges.

The chips should be compact enough to scan in dense columns and visibly grouped
as workflow metadata rather than user labels. Suggested class family:

- `.board-card__workflow`
- `.workflow-chip`
- `.workflow-chip--lane`
- `.workflow-chip--route`
- `.workflow-chip--delivery`

## Edge cases

- If only execution lane exists, show one lane chip.
- If only route topology exists, show one route chip.
- If only safe `metadata.pr_url` exists, show one `PR` chip.
- If route topology is invalid, hide the route chip on Board.
- If route topology is `pr` but no PR URL exists, show `PR route` only. This
  means PR route is intended, but delivery has not happened yet.
- If PR URL exists but route topology is `direct`, show `Direct` and `PR`. This
  exposes the data as-is without treating Board as a validator.
- If PR URL exists and route topology is `pr`, show `PR route` and `PR`. This
  distinguishes intended route from delivered PR evidence.

## Testing

Add or update focused tests for:

- Board renders workflow chips below title in lane → route → delivery order.
- `plan`, `quick_edit`, and `spec_backed` all render as human-facing lane chips.
- Valid direct topology renders `Direct`.
- Valid PR topology renders `PR route`.
- Safe `metadata.pr_url` renders a non-clickable `PR` workflow chip.
- Safe `metadata.pr_url` no longer renders a derived `pr` label badge.
- Unsafe PR URL renders no delivery chip and no derived `pr` label.
- Raw/stale `pr` label does not appear on Board, even if the issue carries that
  label.
- Invalid lane and invalid route metadata are suppressed on Board.
- Existing label display policy behavior remains unchanged for non-PR labels.
- List and Epics remain unchanged and do not render Board workflow chip rows.
- Push-store and fallback fetch Board cards both render the same workflow chips
  from metadata.
- Card click and drag tests continue to pass.

Run the normal frontend validation after implementation:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
```

Because this changes frontend source, the implementation handoff must include
updated `app/main.bundle.js` and `app/main.bundle.js.map`.

## Handoff recommendation

This is a focused single-repo UI behavior change backed by this spec. After
external spec review, the implementation can proceed as `spec_backed` unless the
reviewer finds broader interaction or config-policy risk that requires a
separate implementation plan.
