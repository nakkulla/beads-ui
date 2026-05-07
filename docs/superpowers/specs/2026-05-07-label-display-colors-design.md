# Label display policy and configurable label colors design

## Problem

`beads-ui` now has two overlapping ways to summarize workflow state on scan
surfaces:

- Board workflow chips derive execution lane, route topology, and PR Delivery
  from issue metadata.
- Board/List/Epics label badges are filtered by `label_display_policy` from
  `~/.config/bdui/config.toml`.

The active shared config currently includes `lane:` and exact labels such as
`pr` and `skill-related`. Those labels are useful as Beads metadata mirrors or
search hints, but showing them on scan surfaces can duplicate richer workflow
chips or expose routing labels that are not intended as user-facing summary
content.

Label colors are also mostly hardcoded. `has:`, `reviewed:`, and `pr` get custom
badge classes, while labels such as `followup:` and `needs:` fall back to the
neutral style even though they carry different workflow urgency.

## Goals

- Keep `~/.config/bdui/config.toml` as the only runtime config source.
- Do not revive `~/.config/bdui/config.json` support.
- Remove duplicate scan-surface display for labels that already have a better
  workflow representation.
- Keep `followup:` and `needs:` labels visible on Board/List/Epics when present.
- Add config-driven label colors for prefix and exact label matches.
- Preserve current fallback colors and behavior when no color config exists.
- Keep Detail's full Labels card unchanged; this design only changes summary
  badge filtering and badge color treatment.

## Non-goals

- Do not change Beads label or metadata semantics.
- Do not change Board workflow chip derivation or chip text.
- Do not make workflow chip colors configurable in this scope.
- Do not add user-specific browser preferences or localStorage color settings.
- Do not load dotfiles workflow YAML at runtime.
- Do not edit `CHANGES.md`.
- Do not make `config.json` a fallback source.

## Current code state

- `server/config.js` resolves config from `BDUI_CONFIG_PATH` or
  `~/.config/bdui/config.toml` and parses TOML with `smol-toml`.
- `server/config.js` normalizes `labels.visible_prefixes`,
  `labels.visible_exact`, workspace config, and Detail workflow summary config.
- `/api/config` and the index bootstrap expose `label_display_policy` to the
  client.
- `app/state.js` and `app/main.js` preserve label display policy during
  bootstrap and config refresh.
- `app/utils/label-badge.js` filters labels with prefix and exact allowlists.
- `createLabelBadge()` assigns custom classes only for `has:`, `reviewed:`, and
  exact `pr`.
- Board removes raw `pr` labels before filtering and shows PR Delivery through a
  workflow chip derived from safe `metadata.pr_url`.
- Board workflow chips already show valid `metadata.execution_lane` values, so a
  visible `lane:*` label duplicates that signal on Board.

## Observed workflow examples

The current dotfiles workspace examples confirm the intended split:

- `dotfiles-vidn` carries `followup:scope-boundary` and follow-up metadata. It
  has no `needs:*` label or human/brainstorming metadata, so no `needs:` badge
  should appear.
- `dotfiles-ihj0` carries `followup:scope-boundary` and `skill-related`. The
  follow-up label is useful on scan surfaces. `skill-related` is a search hint,
  not durable routing metadata, so it does not need scan-surface visibility.

## Design

### Runtime config source

`beads-ui` continues to read only TOML runtime config:

1. `process.env.BDUI_CONFIG_PATH`
2. `~/.config/bdui/config.toml`

A stale `~/.config/bdui/config.json` file has no effect. The implementation
should not add JSON fallback logic or migration-from-JSON behavior.

### Recommended visible label policy

For the shared runtime config, the recommended scan-surface policy is:

```toml
[labels]
visible_prefixes = ["has:", "reviewed:", "followup:", "needs:"]
visible_exact = []
```

Rationale:

- `has:` and `reviewed:` remain useful compact artifact/review indicators.
- `followup:` remains useful because follow-up status should be visible before
  opening Detail.
- `needs:` remains useful for human or brainstorming blockers when those mirror
  labels are present.
- `lane:` is hidden because Board already has an execution lane chip and
  List/Epics do not need route/lane duplication in the first version.
- `pr` is hidden because Board has a PR Delivery chip and Detail has the
  delivery link.
- `skill-related` is hidden because it is a best-effort search label, not a
  routing or finish state summary.

### Label color config schema

Add optional color rules under `labels.colors`:

```toml
[labels.colors.prefix."has:"]
fg = "#16a34a"

[labels.colors.prefix."reviewed:"]
fg = "#2563eb"

[labels.colors.prefix."followup:"]
fg = "#b45309"

[labels.colors.prefix."needs:"]
fg = "#dc2626"

[labels.colors.exact."skill-related"]
fg = "#7c3aed"
```

The client-visible normalized shape should be:

```js
{
  label_display_policy: {
    visible_prefixes: ['has:', 'reviewed:', 'followup:', 'needs:'],
    visible_exact: [],
    colors: {
      prefix: {
        'has:': { fg: '#16a34a' },
        'reviewed:': { fg: '#2563eb' },
        'followup:': { fg: '#b45309' },
        'needs:': { fg: '#dc2626' }
      },
      exact: {
        'skill-related': { fg: '#7c3aed' }
      }
    }
  }
}
```

`fg` is the first supported property. It sets the readable foreground hue; CSS
can derive border and background using `color-mix()` so operators only need to
choose one color per label group.

### Validation

The server should normalize color config conservatively:

- Missing `labels.colors` becomes `{ prefix: {}, exact: {} }`.
- `prefix` and `exact` must be TOML tables.
- Rule keys must be non-empty strings.
- Rule values must be tables.
- `fg` must be a non-empty CSS hex color in `#rgb` or `#rrggbb` form.
- Invalid rules are dropped without failing the entire config.
- Duplicate or overlapping rules keep TOML's parsed final value.

The first version should not accept arbitrary CSS color names, `rgb()`, CSS
variables, or `color-mix()` strings. Hex-only validation avoids injecting
untrusted CSS values into inline styles.

### Color rule precedence

When rendering a label badge:

1. Exact match rule wins.
2. Longest matching prefix rule wins.
3. Existing hardcoded fallback class wins for known labels.
4. Neutral badge style is used when no rule matches.

This allows a broad rule such as `followup:` and a later more specific rule such
as `followup:scope-boundary` without adding another schema field.

### Client propagation

The normalized color policy should flow through the same surfaces as the
existing visible label policy:

- `server/config.js` returns normalized colors.
- `server/app.js` includes colors in `/api/config` and bootstrap payload.
- `app/main.js` reads colors from bootstrap and refresh config responses.
- `app/state.js` stores colors and treats color changes as config changes.
- Board/List/Epics pass the current label color policy to row/card renderers.

`visible_prefixes` and `visible_exact` still decide whether a label is shown.
The color policy only affects badges that are already visible on that surface.

### Badge rendering

Add an optional color policy parameter to
`createLabelBadge(label, color_policy)` or an equivalent small options object.
Existing callers should remain easy to read.

When a color rule matches, set CSS custom properties on the badge element:

- `--label-badge-fg: <fg>`

CSS should derive:

- `color: var(--label-badge-fg, <fallback-fg>)`
- `border-color: color-mix(in srgb, var(--label-badge-fg, <fallback-fg>) 35%, transparent)`
- `background: color-mix(in srgb, var(--label-badge-fg, <fallback-fg>) 8%, transparent)`

Known fallback classes such as `.label-badge--has` and `.label-badge--reviewed`
may remain, but they must consume the same `--label-badge-fg` custom property
with their current color as the fallback. That keeps existing styling when no
config color exists while allowing a configured color to override modifier-class
defaults.

### Detail Labels card

Detail's full Labels card should keep showing all labels for editing/removal. It
may reuse colorized badge rendering later, but this design does not require
changing the edit/remove label UI.

### Installed runtime config cleanup

The implementation may include a documented operator step or follow-up note to
update the active shared `~/.config/bdui/config.toml` to the recommended policy.
It should not silently delete or rewrite `~/.config/bdui/config.json`; that file
is simply ignored by the current server. Deleting stale local files is an
operator cleanup action, not an app requirement.

## Edge cases

- A label hidden by `visible_prefixes`/`visible_exact` remains hidden even if it
  has a color rule.
- If `needs:` is configured but no issue carries a `needs:*` label, no `needs:`
  badge appears.
- If a follow-up issue has `metadata.followup_kind` but the mirror `followup:*`
  label is missing, scan surfaces cannot show the badge until the Beads mirror
  label is repaired. Detail can still show metadata when present.
- If `lane:` remains in a user's local config, the UI should still display it;
  the app should not hard-block operator-chosen visibility.
- If both exact `followup:scope-boundary` and prefix `followup:` color rules
  exist, the exact rule wins.
- If `followup:` and `followup:scope-` prefix rules both match, the longer
  prefix wins.
- Invalid color rules are ignored while valid sibling rules still apply.
- Existing prefix-only configs continue to work and receive empty color rules.

## Testing

Add or update focused tests for:

- `server/config.test.js`
  - parses valid `labels.colors.prefix` and `labels.colors.exact` hex rules.
  - drops invalid colors and malformed rule tables.
  - keeps backward-compatible defaults when color config is missing.
  - preserves explicit `visible_prefixes = []` and `visible_exact = []`.
- `server/app.test.js`
  - `/api/config` and bootstrap payload include normalized colors.
- `app/state.test.js`
  - stores color policy from config.
  - emits config changes when color policy changes.
- `app/main.config-refresh.test.js`
  - refresh propagates updated color policy to state.
- `app/utils/label-badge.test.js`
  - exact color rule beats prefix rule.
  - longest prefix rule beats shorter prefix rule.
  - hidden labels are still filtered by visibility, not by color config.
  - fallback classes still apply without color config.
- Board/List/Epics tests
  - visible labels receive configured color styling.
  - `lane:` is not shown with the recommended config.
  - `followup:` remains visible with the recommended config.
  - `pr` and `skill-related` are not shown when `visible_exact = []`.

Run the normal frontend validation after implementation:

```bash
npm run tsc
npm test
npm run lint
npm run prettier:write
npm run build
```

Because this changes frontend source, implementation handoff must include
updated `app/main.bundle.js` and `app/main.bundle.js.map`.

If the merged change affects the shared runtime, restart and verify the real
server from the merged checkout:

```bash
bdui-shared restart
```

Then verify process path, listening port, and a basic HTTP response such as
`/api/config`.

## Handoff recommendation

This is a focused single-repo UI/config behavior change backed by this spec.
After external spec review, implementation can proceed as `spec_backed` unless
the reviewer finds broader config contract or rollout risk that requires a
separate implementation plan.

Recommended Beads routing after spec handoff:

```text
execution_lane=spec_backed
workspace_policy=worktree
branch_policy=feature
finish_action=pr
```
