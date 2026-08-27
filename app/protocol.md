# beads-ui WebSocket Protocol

This document defines the JSON messages exchanged between the browser client and
the local server over a single WebSocket connection. The canonical message-type
set lives in `app/protocol.js` (`MESSAGE_TYPES`); this doc describes their
payloads.

- Transport: single WebSocket connection (`/ws`)
- Encoding: JSON text frames
- Correlation: every request/response pair shares the same `id`

## Envelope shapes

- RequestEnvelope: `{ id: string, type: MessageType, payload?: any }`
- ReplyEnvelope:
  `{ id: string, ok: boolean, type: MessageType, payload?: any, error?: { code, message, details? } }`

Server-push events (unsolicited) use the ReplyEnvelope shape with `ok: true` and
a generated `id` (e.g. `evt-…`).

## Connection (no auth)

There is no token auth: a socket may send application messages immediately after
connect. The only handshake-time gate is the **Origin allowlist** for browser
sockets (same-origin, or `BDUI_ALLOWED_ORIGINS`; absent `Origin` = non-browser
client, governed by network isolation). See the README's "Access model" section.

`ping` → `{ ok, payload: { ts } }` is available as a liveness check.

## Issue subscriptions (push protocol)

Read data flows through subscriptions, never one-shot list RPCs.

- `subscribe-list` payload: `{ id: client_id, type, params? }` — starts a
  per-subscription stream; the server replies `ok` then pushes a `snapshot`. The
  `closed-issues` type accepts `params.since` (epoch ms): only issues with
  `closed_at >= since` are streamed. Changing `since` requires an
  `unsubscribe-list` for the client id followed by a fresh `subscribe-list`.
- `unsubscribe-list` payload: `{ id: client_id }`.
- Push events (server → client), keyed by the subscription `id`:
  - `snapshot` payload: `{ type:'snapshot', id, revision, issues:[…] }`
  - `upsert` payload: `{ type:'upsert', id, revision, issue }`
  - `delete` payload: `{ type:'delete', id, revision, issue_id }`

The detail panel uses the same mechanism with a `detail:<id>` client id and an
`issue-detail` spec.

## Issue mutations

- `update-status` payload: `{ id, status }`
- `update-priority` payload: `{ id, priority: 0|1|2|3|4 }`
- `update-assignee` payload: `{ id, assignee }`
- `edit-text` payload:
  `{ id, field: 'title'|'description'|'acceptance'|'notes'|'design', value }`
- `update-exec-settings` payload: `{ id, key, value }` — execution-preference
  metadata (the 12 keys + `workflow_mode`; `workflow_mode='standard'` unsets the
  override key). Replaces the removed v3 `update-workflow-settings`.
- `create-issue` payload: `{ title, type?, priority?, description? }`
- `delete-issue` payload: `{ id }`
- `dep-add` / `dep-remove` payload: `{ a, b, view_id?, root_dir? }` (`a` depends
  on `b`). Absent `root_dir` keeps the connection workspace. When present it
  must resolve exactly to a registered, visible workspace root; otherwise the
  server rejects the request with `bad_request`. Both the bd mutation and its
  `show` readback run in that root.
- `label-add` / `label-remove` payload: `{ id, label }`
- `get-comments` payload: `{ id }`; `add-comment` payload: `{ id, body }`.

## Workspace management

- `list-workspaces` (reply includes `hidden: [abs path]`), `get-workspace`,
  `set-workspace` (`{ path }`), `git-pull-workspace`. `workspace-changed` is a
  server-push event when the default workspace changes.
- `set-workspace-visibility` payload: `{ path, visible }` — toggles whether a
  registered workspace shows in the picker for every client (server-global
  persisted set); reply `{ changed, hidden }`. The path must be absolute and in
  the available-workspace allowlist.

## Manual UI-order channel (spec §2)

Per-workspace persisted manual card ranking shared by the Board columns and the
Worker candidate lane. CAS-guarded like the worker queue.

- `subscribe-ui-order` / `unsubscribe-ui-order` payload: `{ id: client_id }` —
  subscribe replies `ok` then pushes an initial snapshot.
- `ui-order-snapshot` (push) payload: `{ id, revision, order }` where `order`
  maps bead id → numeric rank; pushed to every subscriber after any mutation.
- `ui-order-set` payload: `{ expected_revision, entries: [{ bead_id, rank }] }`
  — reply `{ applied, conflict, revision, order }`; on `conflict` adopt the
  returned snapshot and retry. A WS-originated `update-status` → `closed` prunes
  that bead's rank server-side.

## Periodic refresh

Besides fs-watch-driven pushes, the server re-runs list refreshes every
`poll_interval_seconds` (config, default 30, `0` = off) while at least one
client is connected, so writes from other machines through the central DB
surface without a local fs event.

## Monitor pipeline channel (UI-2gi1)

`subscribe-monitor-pipeline` / `unsubscribe-monitor-pipeline` reuse the existing
server-global monitor channel; this change adds fields to its snapshot and does
not add a WebSocket op. `monitor-pipeline-snapshot` carries
`{ workspaces, workspaces_state }`. Every visible workspace has a
`workspaces_state` row:
`{ root_dir, name, issue_prefix: string|null, auto_advance, auto_merge, slots, revision, runner_catalog }`
plus, since UI-eey2 §9.4, the repo-panel control fields:
`{ serial_lane_count, auto_repair, orchestration_model, orchestration_effort, orchestration_speed, execution_defaults, session_defaults, session_defaults_warnings, counts }`.
`issue_prefix` comes from that workspace's bd config cache; missing, malformed,
or temporarily unreadable config is `null`.

- `serial_lane_count` / `auto_repair` / the three `orchestration_*` values are
  that workspace's own queue state. A legacy queue with no key reads as one
  serial lane, auto-repair ON, and null orchestration pins — the state such a
  workspace is actually in.
- `execution_defaults` is the same read-only projection the worker snapshot
  carries (see below), repeated here so a repo panel can resolve chips for a
  workspace it holds no worker subscription to.
- `session_defaults: Record<string, string>` is that repo's
  `bd kv workflow_session_defaults` layer, normalized by the same rules as
  `get-session-defaults`, with `session_defaults_warnings: string[]` carrying
  the dropped keys / unreadable-kv reasons. The read is ASYNC while this row is
  built SYNCHRONOUSLY, so a cold or expired cache ships `{}` and the fill
  schedules the next push — exactly the `issue_prefix` contract. A successful
  `set-session-defaults` or `apply-impl-preset-global` invalidates the repo it
  wrote and re-pushes.
- `counts: { running, pr_wait, queue, runnable, session_active }` counts each
  bead in EXACTLY ONE lane, on the client's exclusive lane priority (`running` >
  `session_active` > `pr_wait` > `queue` ∪ serial lanes > `runnable`).
  Completion is not counted here: the 완료 period is a client selection, so the
  client counts it from `workspaces[].done[]`. `session_active` (UI-yrzu §4.2)
  is the count of `workspaces[].session_active[]`; `running` stays the worker
  attempt count it always was.

Consumers fail-quiet on every one of these keys being absent (older server) and
render the corresponding control or chip row not at all rather than inventing a
default.

Runnable rows inside `workspaces[].runnable` additionally carry
`blocked: boolean` and `blocked_by: string[]`. They are display-only projections
of the shared `ready_explain` snapshot. A legacy snapshot without that source
uses `false` / `[]` and does not remove the candidate.

The `session-preferred` label is ADVISORY and, unlike `worker-ineligible`, never
removes a row from the runnable verdict — `qualify()` in
`server/worker/runnable-cache.js` does not read it. It is valid only when the
paired `session_preferred_reason` metadata is inside the contract enum
(`exclusive_machine`, `iterative_user_judgment`, `visual_verification`), and it
loses to `worker-ineligible` in display: a row carrying both draws the
`worker-ineligible` treatment only (UI-49mc §5).

Runnable rows also carry `workflow` and `exec_pins` (UI-eey2 §9.1). `workflow`
is the `enrichIssueWorkflow` stepper projection derived from the SAME `bd list`
row — no extra bd call — and is `null` when it could not be computed. In every
`WorkflowSummary`, `stages.spec`/`stages.plan` carry
`doc { path, missing_state }` whenever a document path exists (independent of
`fill`); the other stages never do. `exec_pins: Record<string, string>` is the
row's execution metadata pins only (the per-bead preset axes plus
`claude_account`/`codex_account`); the rest of `metadata` never travels, so the
whole backlog's metadata stays off the wire.

Runnable rows carry `plan_path: string|null` and, on a scope-cache hit only,
`scope: string[]` (UI-qm12 §4.4). `scope` is read from the SAME artifact set as
a queued bead's `bead_scope` entry (`[spec_id, plan_path?]`) at the pinned base,
so loading a candidate into a lane cannot change its overlap verdict. The field
is ADDITIVE: absent means 판정 불가 — not read yet, unreadable, or no spec — and
never "no declared scope".

`workspaces[].session_active[]` (UI-yrzu §4.1) is that repo's beads an
interactive SESSION holds: rows the shared `bd list --all` snapshot reports as
`status: 'in_progress'` with no active worker attempt and no membership in
`queue` ∪ serial lanes ∪ `pr_wait`. `done` membership does NOT remove a row — a
bead a session reopened is being worked on now. Each row carries
`{ bead_id, title, status: 'in_progress', route, spec_id, plan_path, labels, created_at, updated_at, started_at, workflow, blocked, blocked_by }`.
`route` is `metadata.route` or `''` when unpinned, `spec_id` is `''` when absent
or in conflict, and `workflow` / `blocked` / `blocked_by` follow the same rules
as the runnable rows below. `plan_path` (UI-anna §3.1) is `metadata.plan_path`
or `null`, carried for the same reason a runnable row carries it: when the bead
resolves an artifact, its declared scope is read from the SAME artifact set
(`[spec_id, plan_path?]`) as a queued bead's. `scope: string[]` (UI-anna §3.1)
is that declared scope, attached ADDITIVELY in the same shape and with the same
reading as a runnable row's: present only on a scope-cache hit or a description
declaration, and absent means 판정 불가 — not read yet, unreadable, or nothing
declared — never "no scope". The source LADDER is the runnable row's too
(UI-zw6j): the artifact set when `spec_id` resolves one, otherwise the
description's `## scope` section, which ships no artifacts. Its value is the one
the same snapshot's `bead_scope[bead_id].scope` carries, so a bead moving 세션
착수 → 큐 적재 never changes the overlap verdict. Each row also carries
`session_refs: SessionRefView[]` (UI-4xzk §4.1) — `metadata.session_ref`
projected from the SAME scan, so the bucket still costs no extra `bd` process.
One view is
`{ index, provider: 'claude'|'codex', session_id, host, current, locality: 'local'|'remote'|'missing', last_event_at, resume_command }`:
`index` is the position in the contract value (malformed items are dropped
INDIVIDUALLY and the surviving indexes are unchanged), `current` marks the last
valid item, `locality` is `remote` when the host's first label differs from this
server's, `missing` when no transcript file was found, `last_event_at` is that
file's mtime in epoch ms (`null` unless `local`), and `resume_command` is
`claude --resume '<sid>'` / `codex resume '<sid>'` — `null` when the session id
is not a safe single shell argument. The transcript PATH is never on the wire.
An absent key, an all-malformed value, or a projection failure is `[]`. Worker
admission conditions (`worker-ineligible`, the route enum, the `spec_review`
receipt, phase-child parentage) are NOT applied: a session claims whatever issue
it likes. The bucket rides the same scan, TTL and invalidation as `runnable`, so
a session's `bd update` surfaces within one refresh tick rather than
immediately.

`workspaces[].bead_blocked_by` is the worker snapshot's map with one more
filter: a blocker id whose prefix belongs to ANOTHER visible workspace is looked
up (`bd show` in that rig, process-cached) and dropped once it reports `closed`.
Unknown status keeps the id. The map therefore lists open blockers only, on
either side of a rig boundary; a closed predecessor never renders as `(완료)` or
`(미적재)`.

### Stored cross lanes (UI-j92s §4.3/§4.4)

`monitor-pipeline-snapshot` carries one more top-level key:

```
cross_lanes: { revision: number, lanes: Lane[] } | null
Lane: { id: 'cl_<ulid>', status: 'draft'|'confirmed', created_at: ISO, entries: Entry[] }
Entry: { bead_id: string, root_dir: string, dep_created_by_lane?: boolean }
```

`dep_created_by_lane` says whether THIS lane created the `blocks` edge between
the entry and the one right before it (UI-jaua §7.1). `true` means that pair's
`dep-add` SUCCEEDED, not that it was planned, so the value is written in two
stages: a lane op stores `false` for a newly adjacent position and
`monitor-lane-provenance` raises the pairs that actually landed. The server owns
the value — a client-supplied `true` is ignored — and the flag is meaningless on
`entries[0]`, where the store normalizes it away. Every deletion path reverts
`true` pairs ONLY, so a lane stored before UI-jaua reads as `false` throughout
and removes no dependency at all: no migration, converging to the safe side.

A 연결 레인 is stored MEMBERSHIP, not a derived `blocks` component: `entries`
order is the lane order and `bead_blocked_by` stays the execution truth,
unchanged by this channel. The display number `연결 n` is the 1-based position
in `lanes` and is never stored; `id` is server-issued and immutable. One
`bead_id` belongs to at most one lane across the whole state.

`cross_lanes: null` means the lane store could not be READ — distinct from
`{ revision, lanes: [] }` (read fine, holds nothing) and from the key being
absent altogether (older server). A `null` disables the lane ops client-side;
the server refuses them with `state_unreadable` anyway.

Five ops mutate it, all server-global (no `root_dir` — a lane spans repos) and
all CAS-guarded by an integer `expected_revision` taken from the snapshot.
Success replies carry the new `{ revision }` and schedule the usual coalesced
push.

- `monitor-lane-create` → `{ entries?: Entry[], expected_revision }`; replies
  `{ lane_id, revision }`. Appends a `draft` lane, empty or seeded. A `draft`
  creates no dependency and loads no queue.
- `monitor-lane-update` → `{ lane_id, entries: Entry[], expected_revision }`;
  replies `{ lane_id, revision }`. Replaces membership AND order in one write —
  insert, reorder and row-removal are the same op.
- `monitor-lane-confirm` → `{ lane_id, expected_revision }`; replies
  `{ lane_id, revision }`. Flips `status` only; the adjacent `dep-add`s and the
  queue placements ride the client's existing `dep-add` / `worker-queue-place`
  paths right after.
- `monitor-lane-remove` → `{ lane_id, expected_revision }`; replies
  `{ lane_id, revision }`. The `dep-remove`s for a confirmed lane are the
  client's and go BEFORE this op: once the lane is gone nobody can tell which
  adjacent pairs it owned. For the same reason the `worker-queue-disarm` of the
  departing members also precedes it — the client sends `dep-remove` → `disarm`
  → lane op (UI-jaua §7.2).
- `monitor-lane-provenance` →
  `{ lane_id, pairs: Array<{ bead_id, after, value: true }>, expected_revision }`;
  replies `{ lane_id, revision }`. Stage 2 of the `dep_created_by_lane` write
  (UI-jaua §7.1): it runs AFTER the `dep-add`s and raises only the pairs that
  succeeded. A pair names BOTH its members — `bead_id` is the later one
  (`entries[i+1]`), `after` the earlier one — and the server raises it only
  while `after` is still the entry immediately before `bead_id` in the stored
  lane. A bare `bead_id` is refused: without the pair check, a reorder between
  the lane op and this call would stamp lane ownership on an adjacency whose
  `dep-add` never ran, which is the §1.3 accident re-entered through the field
  that exists to prevent it. Only `true` travels — lowering a pair is the lane
  ops' job — and a pair naming `entries[0]`, a bead the lane no longer holds, or
  an adjacency that no longer exists is ignored without error. On a `conflict`
  the client keeps just the pairs still adjacent on the returned lanes, retries
  once, and then gives up silently: staying `false` is the safe direction and
  `재적용` is the recovery path.

The server validates FORMAT and workspace registration only. `Entry.root_dir`
must be a registered workspace — HIDDEN ones included, since a hidden repo's
member is still a member and renders as an `외부` row. A closed or unknown
`bead_id` never blocks a write: right after a redeploy the caches are cold, and
a server that guessed "that bead does not exist" would corrupt a lane the user
can still see. The fixed-row rules are a client concern.

Error codes: `bad_request` (payload shape, an unregistered `root_dir`, a
`confirm` with fewer than two members), `not_found` (`lane_id`), `conflict`
(stale `expected_revision`), `conflict_membership` (the bead is already in
another lane — message `이미 연결 N에 있습니다`, N being that lane's current
position), `conflict_empty_lane` (an empty `create` while an empty draft already
exists), `state_unreadable`. A `conflict` carries the whole current state in
`error.details.cross_lanes` so the client re-plans on the latest lanes instead
of resending a plan built on entries that moved.

## Worker queue channel (worker-phase2 §3/§4/§6)

Per-workspace subscription + CAS-guarded mutations + a whole-queue push.

The waiting area is the parallel lane (`queue`) plus fixed-slot serial lanes
(`serial_lanes`, UI-04vo §1): a serial lane runs a lane-scoped exclusive chain —
the next entry waits until the previous lineage merges-and-cleans or is
discarded — while lanes run concurrently with each other and with the parallel
lane under one shared `slots` cap (`slots: 1` is still a global sequential
override). Completion is decided by the SERVER OBSERVING an open PR, not by the
session's self-report — so a bead moves `queue`/`serial_lanes` → `pr_wait` →
`done`. Nothing merges without a human `[머지]` click.

- `subscribe-worker-queue` / `unsubscribe-worker-queue` payload: `{ id }`.
- `worker-queue-snapshot` (push) payload:
  `{ type: 'worker-queue-snapshot', id, root_dir, queue }` — `root_dir` is the
  workspace this snapshot describes (envelope addressing, not part of `queue`),
  so a client that already repointed to another workspace can drop a snapshot
  from a subscription the server has not torn down yet; the rest is the full
  queue (`revision`, `auto_advance`, `slots`, `serial_lanes[]`,
  `serial_lane_count`, `queue[]`, `pr_wait[]`, `done[]`, `attempts`,
  `admission`, `cleanup_failed`, `exec_defaults`) plus the server-decorated,
  NON-persisted keys: `workspace_info: { slots, repo_ops }`, `runner_catalog`,
  `execution_defaults`, `pr_observations` (per-`pr_wait` PR state + merge-gate
  verdict, memory cache only), `bead_titles` (`Record<bead_id, title>` for the
  `queue`/`pr_wait`/`done` beads, memory cache only), and `declared_base`.
  `bead_titles` is PARTIAL: only titles already cached travel, a miss simply has
  no entry and arrives in a later snapshot once the server's async lookup fills
  it. Consumers fail-quiet on the whole key being absent (older server) and on a
  missing entry — both fall back to displaying the bead id. `bead_labels` is
  likewise a non-persisted partial `Record<bead_id, string[]>` for the same
  `queue`/`pr_wait`/`done` beads. Its arrays are normalized from the same async
  `bd show` fill as titles and times; no entry means label truth is unknown (not
  an empty array), including when an older server omits the whole key. It is UI
  projection only and never Worker scheduler authority.
- `bead_workflow: Record<bead_id, WorkflowSummary|null>` (UI-eey2 §9.2) is the
  stepper projection for the beads a LANE renders: `queue` ∪
  `serial_lanes[].entries` ∪ RUNNING attempts ∪ `pr_wait`. `done` is excluded —
  a finished bead draws no stepper. Non-persisted and PARTIAL on the same
  contract as `bead_titles`: a bead whose record has not been read yet has no
  entry and arrives in a later snapshot, and a bead whose enrich failed carries
  `null`. Freshness rides two hooks besides the 5-minute TTL — the server's own
  `bd show` readbacks after a metadata write, and the observation of a
  `bd update|close|dep` COMPLETING inside a running session's log.
- `bead_scope: Record<bead_id, { scope: string[], artifacts: string[] }|null>`
  (UI-qm12 §4.3) is the DECLARED scope — the spec front-matter `scope:` read at
  the workspace's pinned base, or, for a bead that resolves no artifact, its
  description's `## scope` section (UI-f1qy §4.3) — of the beads the waiting,
  running, PR 대기, 후보 and 세션 lanes render: `queue` ∪
  `serial_lanes[].entries` ∪ the 실행중 레인 beads ∪ `pr_wait` ∪ the runnable
  projection (UI-f3ma) ∪ `session_active` (UI-anna §3.1). The candidate rows are
  in so one can be judged against the queue BEFORE it is loaded into a lane;
  `pr_wait` and the session-held beads are in because a card standing in either
  lane answers the same "무엇과 부딪히나" question every other card does. A
  runnable or session-held bead's artifact set comes from its own
  `spec_id`/`plan_path` rather than the title cache, which has no record for a
  bead that never entered a lane; it is the same artifact set either way, so
  moving such a bead into a lane never changes its verdict. A bead that resolves
  NO artifact falls back to its description's `## scope` section on either path
  (UI-zw6j) — the runnable row carries the parsed section itself, and a session
  row, which carries no description, is read through the title cache, so a
  not-yet-filled record stays NO ENTRY until its fill fanout lands. Both parse
  the same section of the same description, so the verdict is the same one
  either way. The 실행중 레인 membership follows the client's own predicate
  (`activeAttemptStates`), so a paused or unhandled-failed tile is in the set
  too. `done` is the only lane outside it. Non-persisted and PARTIAL on the same
  contract as `bead_titles`, and fail-quiet at every level: nothing here can
  block or delay a snapshot push. Three values, deliberately distinct:
  - NO ENTRY — the scope has not been read yet, or the bead declares one
    nowhere: no artifact AND no `## scope` section in its description. Draw
    nothing.
  - `{ scope: [], artifacts }` — the one source was read successfully and
    declared no valid scope entry: every artifact (spec, and the plan when the
    bead pins one) at the base, or, with `artifacts: []`, the description's
    `## scope` section. This is 판정 불가 made visible, not "parallel is fine".
  - `null` — the read FAILED (artifact absent at the base, git error, unresolved
    base). Draw nothing.

  `artifacts` lists the paths the scope was read from, spec first, plan second.
  The client derives pairwise overlaps from this map itself, exactly as it
  derives dependency chains from `bead_blocked_by`; the server ships facts only.
  An older server omits the whole key, which consumers read as "skip the overlap
  derivation entirely".

- `session_active[]` (UI-0a2m) is the SAME per-repo bucket the monitor
  aggregation ships (UI-yrzu §4.1, row shape and semantics above): beads an
  interactive session holds `in_progress`, minus this snapshot's `queue` ∪
  serial lanes ∪ `pr_wait` members and active-attempt beads. The worker tab
  renders them as `kind:'session'` tiles at the tail of the running grid; they
  occupy no slot and count into neither `실행` nor `over_cap`. Non-persisted,
  riding the runnable cache's scan/TTL/invalidation: a cold subscribe answers
  `[]` and the filled list arrives on the fanout the scan's completion triggers.
  Consumers fail-quiet on the key's absence (older server).
- `execution_defaults` is the read-only display projection paired with
  `runner_catalog`. Shape:
  `{ supported, schema_version, source_commit, digest, session, orchestration }`.
  `session` decodes the exact pinned dotfiles harness artifact; `orchestration`
  carries launcher-owned `{ runtime, model, model_id, effort, speed }` facts
  resolved through the runtime catalog. Artifact absence, parse failure,
  provenance byte/digest mismatch, or unsupported schema produces
  `supported:false` with nullable facts; it never changes dispatch or queue
  persistence. Consumers also accept this whole field being absent from an older
  server and show `기본값 확인 불가` instead of reconstructing defaults.
- A RUNNING attempt inside `attempts` additionally carries the non-persisted
  `last_event_at` (epoch ms) — when the server last saw a session-log line for
  that attempt (UI-53es §1). It is what the monitor row's live heartbeat reads;
  because a log line is not a queue transition, every session-log publish (live
  tail and post-restart re-attach alike) arms a 3-second COALESCED queue fanout,
  so a burst costs one snapshot per window. Live-only: a server restart drops it
  until the next line arrives, and consumers fail-quiet on its absence (no dot
  rather than a stale one).
- A RUNNING attempt also carries two further non-persisted fields (UI-eey2
  §9.3), both live-only and both absent when there is nothing to say:
  - `last_activity: { at, kind, text, tool?, command?, path?, result? }` — the
    attempt's last non-`thinking` transcript line, derived by a per-attempt
    incremental parser (`app/utils/transcript-lines.js`) so a claude `tool_use`
    carries the summary of its paired `tool_result`. `text` is truncated at 160
    characters. A parser fault keeps the last successful value rather than
    clearing it.
  - `legs: Array<{ role, runtime, model, state, ordinal, label }>` — the
    attempt's delegation legs, derived PURELY from the `delegation_sessions[]`
    launches and the `usage_legs[]` receipts it already carries. `state` is
    `live`/`done`/`failed`. No total unit count exists in the durable
    vocabulary, so `label` names the ordinal only (`구현 unit 3 · codex`,
    `review-consult · codex`).
- `declared_base: string|null` — what this workspace DECLARES as its target base
  (`docs/agents/repo-ops.toml` top-level `base`), read from the declaration
  only. An absent file or absent key travels as `'main'`, matching the
  contract's undeclared fallback; an unreadable file, a parse failure, or a
  `base` value that is empty / not a string / shell-unsafe travels as `null`, so
  a client can say "unknown" instead of claiming `main`. The five-step resolve
  (which fetches) stays on the dispatch path and never runs for this key, so a
  `declared_base` string means "declared", never "verified". Consumers
  fail-quiet on the key being absent (older server).
- `worker-queue-place` payload:
  `{ bead_id, lane?: 'parallel' | 's1'..'s5', index?, expected_revision }` — new
  entry and cross-lane move share this op (UI-04vo §5): the server removes the
  bead from its origin lane before inserting. An absent `lane` (or a legacy
  value) lands in the parallel lane; a serial slot beyond the configured count
  is rejected without a write. A successful placement also kicks the live
  dispatch loop (`tick`), so an auto_advance-ON queue with a free slot starts
  the bead without waiting for another trigger.
- `worker-queue-reorder` payload:
  `{ bead_id, lane?: 'parallel' | 's1'..'s5', to_index, expected_revision }` —
  reorders within one lane; cross-lane moves go through `worker-queue-place`.
- `worker-queue-arm` payload: `{ bead_ids, lane_id, expected_revision }` — arms
  this workspace's parallel rows for a Monitor cross lane (UI-jaua §5.1),
  writing `armed_by_lane = lane_id` on each named row. An armed row is a
  dispatch candidate even while `auto_advance` is OFF; the global toggle keeps
  owning automatic candidacy, and the arm adds nothing else to the scan. Bead
  ids absent from this queue are ignored without error — one `▶ 진행` sends the
  whole lane membership to every repo the lane spans. `lane_id` is NOT validated
  against the lane store (server-global `cross-lanes.json` is not a workspace
  input). A successful arm kicks the live dispatch loop (`tick`), like
  `worker-queue-place`.
- `worker-queue-disarm` payload: `{ bead_ids?, lane_id?, expected_revision }` —
  clears `armed_by_lane` on the named rows, or on every row this workspace armed
  to `lane_id` when only the lane is given; at least one of the two is required.
  Both the waiting rows and the `pr_wait` rows are swept, because the arm rides
  that transition. Attempt snapshots are history and are never cleared. No
  `tick`: disarming only removes candidates.
- The `worker-queue-snapshot` carries `disarmed_on_load: string[]` — the cross
  lanes whose arm THIS process's cold load cleared (UI-jaua §5.1), for the same
  restart-safety reason `auto_advance` resets OFF. It is transient, never
  written to `queue.json`, and a successful `worker-queue-arm` drops that lane
  from it. A client unions the value over the workspaces it sees: disarmed in
  any one repo means the lane was stopped by the restart. Consumers fail-quiet
  on the key being absent (older server).
- `worker-queue-toggle` payload: `{ on, expected_revision }` — persists the
  legacy independent `auto_advance` surface and, on turn-ON, kicks the live
  dispatch loop (`tick`).
- `worker-automation-toggle` payload: `{ on, expected_revision }` — atomically
  aligns `auto_advance` and `auto_merge`; OFF also clears ordinary waiting merge
  entries while preserving active and resolution-bound work.
- `worker-auto-repair-toggle` payload: `{ on, expected_revision }` — the
  INDEPENDENT RepoOperation repair axis (master spec §9.3). It neither reads nor
  writes `auto_advance`/`auto_merge`, and neither of those writes it. OFF blocks
  NEW automatic repair dispatch only: a repair session already running is never
  stopped by this mutation. ON reconciles eligible failed operations immediately
  rather than waiting for the periodic pass. Reply carries the authoritative
  `queue` like every other CAS mutation.
- `worker-repo-operation-repair` payload: `{ operation_id }` — the per-failure
  resolve click (master spec §10). Not a retry: the server dispatches a repair
  session through the coordinator, and a NEW attempt exists only after that
  session produced evidence. Reply `{ ok, reason?, attempt_id, queue }`;
  `reason` is the coordinator's refusal code (`repo_operation_not_failed`,
  `repair_chain_closed`, `repair_session_unavailable`,
  `repair_owner_unresolved`, a scheduler reason such as
  `worktree_missing`/`bead_running`, …).
- The `worker-queue-snapshot` carries `auto_repair: boolean` — the durable value
  of that axis; an absent key on a legacy queue reads as ON.
- The `worker-queue-snapshot` carries `repo_operation_policy` — the projection
  of the PINNED contract copy `generated/contracts/repo-operation-policy.json`
  (an exact byte copy of the dotfiles artifact, with its source commit and
  digest in the sibling provenance file). Shape:
  `{ schema_version, supported: boolean, source_commit, digest, worker_automatic: string[], auto_repair: { default, scope, resolution_subject, resolution_ladder: Record<string,unknown>[], manual_human_fix }, completion_chain: Record<string,string>, repair_session_packet: string[], resolution_entry_surface, never_automatic: string[] }`.
  The lists and the ladder are the contract vocabulary VERBATIM: membership is
  decided by the contract alone, never by server or client code. A client
  renders each token through a display dictionary and MUST fall back to the raw
  token, so a contract that gains an entry shows up without a client change.
  `supported` is the consumer decoder guard: it is `false` whenever
  `schema_version` is anything other than `2`, and a client MUST then render the
  schema-mismatch notice instead of the ladder. `supported: false` stops the
  AUTOMATIC ladder steps only — the user-triggered resolution entry stays
  available, which is why a failed card keeps its resolve button either way.
- The `worker-queue-snapshot` carries `repo_operations` — the operation cards,
  newest `requested_at` first. Each card:
  `{ operation_id, kind: 'verify'|'deploy', repo_id, target_base, target_sha, target_tree, effective_base_sha, script_path, script_blob_sha, script_mode, state: 'queued'|'running'|'succeeded'|'failed'|'repairing'|'retry_pending', requested_at, started_at, finished_at, elapsed_ms, exit_code, signal, log_path, log_digest, output_tail, subjects, failure, failure_kind, verify_stage, repair_eligible, repair: { chain_id, owner_bead, auto_budget, auto_used, remaining, session_id, attempt_id, attempt_status, ladder_stage }, retry: { status, first_fingerprint, blocked_reason, absorbed }, dismissed, superseded_by }`.
  `output_tail` and `failure.detail` are SANITIZED (credential-shaped substrings
  redacted) and the tail is bounded — the full log stays behind `log_path`.
  `failure_kind` is a DISPLAY token, not an eligibility verdict: it is
  `verify_script_failure`, `deploy_script_failure`,
  `interrupted_without_terminal_exit`, or — for every other failure — the raw
  `failure.code`. There is no `other` token and no allowlist behind it; under
  contract v2 every unresolved terminal failure is repair-eligible, so
  `repair_eligible` is true for any failed card that is not superseded. The
  token selects the card's resolve button wording, and a client MUST fall back
  to a generic resolve label for an unknown token; there is deliberately no
  generic retry affordance. `retry.status` reports the first ladder step's
  outcome (`unconsumed`, `consumed`, `absorbed`, `not_applicable`) and
  `repair.ladder_stage` the durable stage the subject has reached. `dismissed`
  removes a row from the 해결 필요 tally and from the AUTOMATIC ladder steps
  only — the resolve button stays. A record that cannot be read as a complete
  operation is DROPPED rather than projected partially.
- `cleanup_failed` rows that stop the cleanup cursor are OVERLAID at projection
  time with `subject_id`, `repair_eligible: true`, and a `repair` object, so a
  failure recorded on that surface has the same resolve entry as an operation
  card. Before any repair is prerecorded that object carries only `auto_budget`
  and `remaining`; `chain_id`, `auto_used`, `ladder_stage`, `attempt_id`, and
  `session_id` appear once the coordinator prerecords a dispatch. A client MUST
  therefore treat those fields as absent-until-dispatched. No durable state is
  migrated. A bead that already owns a `failed` or `repairing` operation record
  is NOT overlaid, because that record owns the bead's resolution and carries
  the more specific failure facts.
- `worker-queue-set-slots` payload: `{ slots, expected_revision }` — the
  concurrency cap (lower bound 1).

- `worker-queue-set-serial-lane-count` payload: `{ count, expected_revision }` —
  resizes the fixed serial-lane set (1..5, UI-04vo §1). Truncated lanes return
  their waiting entries to the parallel tail; active lineages are untouched. The
  retired `worker-queue-set-pr-wait-hold` toggle is no longer a route — serial
  lanes carry the hold-until-merge meaning now.
- `worker-queue-snapshot` additionally carries `serial_lanes` /
  `serial_lane_count` (durable), plus the non-persisted `bead_blocked_by`
  (direct `blocks` blocker ids, partial cache — OPEN blockers only: a same-rig
  dependency whose `status` is `closed` is dropped at the source, matching what
  `bd ready` already ignores; a foreign dependency carries no status on the edge
  and stays listed here, and the monitor aggregation drops it once the owning
  rig reports it `closed`). Its id set — shared with `bead_titles`, `bead_times`
  and `bead_labels` — is `queue` ∪ `pr_wait` ∪ `done` ∪ the serial lanes ∪ the
  실행중 레인 beads (UI-anna §3.2), the last so a bead a SESSION started, which
  stands in no lane array, still carries its blockers. Also `lane_states` — per
  serial lane `{ occupied_by, order, corrections, cycle }` derived fresh on
  every snapshot from durable occupancy and blocks edges.
- `worker-queue-remove` payload: `{ bead_id, expected_revision }`
- `worker-attempt-pause` payload: `{ attempt_id }` — pauses (⏸) a running
  attempt while preserving its resumable state. Reply
  `{ attempt_id, paused, phase, reason }` exposes the durable control phase
  (`done` when the pause has settled).
- `worker-attempt-resume` payload:
  `{ attempt_id, expected_revision, continuation?, decision_token?, instructions? }`
  — ▶ on a paused/failed/orphaned attempt; cap-exempt (human-originated).
  `instructions` is an optional 1..4000 character user instruction; blank after
  trimming is treated as absent.
- `worker-attempt-dismiss` payload: `{ attempt_id, expected_revision }` — the
  failure banner's ✕: stamps `dismissed_at` on a `failed`/`orphaned` attempt so
  it stops reading as an unhandled failure. Reply
  `{ attempt_id, dismissed, conflict, reason, queue }`; `reason` is
  `attempt_not_found` / `not_dismissable` / `already_dismissed`.
- `worker-merge-queue-add` payload:
  `{ bead_id, expected_revision, continuation?, decision_token? }` — the
  `[머지]` click (UI-5v7d §3). It QUEUES rather than merges: the durable
  `merge_queue` is FIFO and one server-side driver merges its head, so two
  clicks never merge at once. Everything the direct click used to derive stays
  in the driver's `merge()` call — click-time `gh` re-read, gate re-evaluation
  against the observed head SHA, BEHIND update-branch, DIRTY resolution dispatch
  — so the snapshot badges remain ADVISORY. Reply:
  `{ bead_id, applied, conflict, queued, queue, reason? }`; queuing a bead that
  is already queued is a no-op (`applied:false`). The optional `reason` explains
  a refusal the client surfaces as a toast: `lane_occupied` (the row still sits
  in an execution lane), `pr_identity_unreadable`, `no_attachment`. A durable
  cross-runner `continuation_action` reuses this message to bind `prior_session`
  or `fresh_current` to the server-issued token before the driver resumes.
- `worker-merge-queue-add-all` payload: `{ expected_revision }` — the lane
  header's `[일괄 머지]`: the SERVER picks every currently mergeable `pr_wait`
  row (the same disjuncts the row's `merge_enabled` uses, external rows
  included) and queues them in lane order in one CAS write. Reply
  `{ applied, conflict, queued, queue }` where `queued` is how many rows were
  actually added.
- `worker-merge-queue-remove` payload: `{ bead_id, expected_revision }`, or
  `{ all: true, expected_revision }` — `[취소]` on a WAITING item, and with
  `all` the header's `[일괄 머지 중단]`, which drops every waiting item in ONE
  server-side write (per-row removal would let the active item finish in between
  and promote a waiter whose own removal then refuses). The ACTIVE item is never
  removed; asking for it by id refuses with `reason:'merge_active'`, since its
  merge is already running against GitHub. Reply
  `{ bead_id, applied, conflict, reason, queue }`.
- The `worker-queue-snapshot` carries the queue as `merge_queue`
  (`[{ bead_id, resolution_rounds, resolution?, continuation_action? }]`,
  durable order). The optional `resolution` projection is the exact durable wait
  record (`attempt_id`, `subject_bead_id`, `deadline_at`, `state`, `yielded_at`,
  `settled_at`); older snapshots may omit it. A non-persisted
  `merge_queue_state` = `{ active, failures, waiting }` says which item the
  driver is on, why each skipped one failed, and — as
  `{ bead_id, reason } | null` — which single nonterminal item is deferred
  (`worker_sessions_busy` while an automatic conflict resolver waits for an
  execution slot). `waiting` is re-derived after a restart, and an unknown
  reason renders nothing.
- `worker-revise-fix` accepts the same optional
  `{ continuation, decision_token }` pair as attempt resume.
- Attempt-derived replies may carry `continuation_mismatch` with prior/current
  execution tuples, `prior_available`, and a decision token. The client never
  computes a tuple or reuses a stale token after a CAS conflict.
- `worker-discard` payload:
  `{ bead_id, attempt_id?, operation_id?, expected_revision }` — creates or
  reuses one durable, restart-safe discard operation. It validates the latest
  leaf attempt or worker-owned PR row, archives the exact source before
  destructive effects, fences dispatch/merge, and advances by authoritative
  readback. Reply:
  `{ bead_id, operation_id, accepted, discarded, pending, reused, conflict, phase, reason, receipt, queue }`;
  `pending:'merged_revert'` means the PR was merged during observation and the
  operation is waiting for the revert lifecycle. A displayed `operation_id`
  retries that exact failed durable operation after one CAS re-sync. Terminal
  `receipt` preserves the archive path plus UI-safe original/revert PR links in
  the success toast after the completed operation leaves active snapshots.
- `worker-pr-discard` and `worker-attempt-stop` are retired protocol names. The
  server replies `{ ok:false, error:{ code:'action_retired' } }` and never
  mutates state; active clients use `worker-discard` exclusively.

Every queue mutation replies `{ applied, conflict, queue }`; a stale
`expected_revision` yields `conflict:true` + the current queue for re-sync.

## Parallelism-analysis channel (UI-04vo §5/§9)

Per-workspace subscription for the read-only analyzer. The analyzer runs ONLY on
an explicit start: queue placement, reorder, and auto-advance never call a
model.

- `subscribe-worker-parallel-analysis` / `unsubscribe-worker-parallel-analysis`
  payload: `{ id }`.
- `worker-parallel-analysis-snapshot` (push) payload:
  `{ type, id, root_dir, settings: { revision, runner, model, effort }, job: { job_id, identity, session_id }|null, runs: AnalysisRun[], last_good: { identity_digest, at, result, target_ids }|null }`.
  `result` is the VALIDATED schema-v3 result; each group carries the server's
  `eligible` stamp, and no consumer recomputes that judgment. `job.job_id` IS
  the run id, so the drawer subscribes through the existing
  `subscribe-session-log` with that id in the `attempt_id` slot — the analyzer
  needs no session-log message type of its own. `runs` is the durable history
  (newest first, capped at 20) described below.
- `worker-parallel-analysis-targets` payload: `{ root_dir }` — reply
  `{ qualified: [{ id, title, route, spec_id, plan_path, lane, scope?, overlaps? }], excluded: [{ id, title, reason, lane }] }`.
  The population is the server's ANALYZABLE UNIVERSE, not a lane listing:
  `qualified` is exactly what a `target_ids`-less start would analyze, and
  `excluded` is every other open Bead with its reason. `lane` is
  `'parallel' | 's<n>' | null` (unplaced) and is display-only — an unplaced Bead
  is deliberately included, because the candidate lane exists only on the Board.
  When the pinned base can be resolved, `scope` is the sorted declared artifact
  scope (an empty array means undeclared) and `overlaps` is the sorted list of
  other qualified Bead ids with a server-computed pairwise overlap. Both fields
  are advisory and display-only. Missing workspace context, an unresolved base,
  or a git read error omits both fields and preserves the legacy reply instead
  of failing the target panel.
- `worker-parallel-analysis-prompt` payload: `{ root_dir, run_id }` — reply
  `{ ok: true, prompt }` or `{ ok: false, reason: 'not_found' }`. The stored
  bytes are the exact bytes written to the analyzer's stdin.
- `worker-parallel-analysis-start` payload: `{ force?, target_ids? }` — reply
  `{ applied, cached?, identity?, job_id?, reason?, detail? }`. An identical
  identity (snapshot digest + runner/model/effort) is a cache hit that spawns
  nothing; `force` re-runs while PRESERVING the previous last-good until a new
  success. Omitting `target_ids` keeps the original meaning (the whole qualified
  set). An array is re-judged server-side and must be ENTIRELY qualified: one
  unqualified id refuses the whole request with `target_not_qualified` and the
  offending ids in `detail`, rather than silently shrinking to the intersection.
  An empty array replies `no_targets`. Cancel, timeout, a non-zero exit, and an
  invalid/unvalidatable result all reply `applied:false` and leave the cache
  untouched.
- `worker-parallel-analysis-cancel` payload: `{ job_id }` — reply
  `{ cancelled }`; kills the process group and keeps last-good.
- `worker-parallel-analysis-settings-update` payload:
  `{ expected_revision, runner, model, effort }` — CAS; only a selection that
  passes the catalog+probe validation is stored.
- Durable run history (`runs`): one record per start, newest first, capped at
  20; a rotated-out record's own `analysis-<run_id>-prompt.txt` and
  `sessions/<run_id>.jsonl` are deleted with it. Shape:
  `{ run_id, session_id, runner, model, model_id, effort, target_ids, snapshot_digest, identity, started_at, ended_at, outcome, reason, diagnostic, prompt_saved }`
  with `outcome` in `running|success|failure|cancelled|interrupted`. A `running`
  record with no matching active job is settled to `interrupted`
  (`reason: 'server_restart'`) when the history is READ — the previous process's
  death is the only way that state can be observed.
- `worker-parallel-analysis-submit` payload:
  `{ snapshot_digest, group_index, lane, ordered_bead_ids, expected_revision }`
  — the client's draft is an INPUT, never an authority. The server re-derives
  the pinned snapshot, re-checks the digest, re-judges group eligibility with
  the same function the validator stamped, verifies every id is a current,
  inactive member of that group, and converges through ONE queue CAS with the
  blocks correction as the final order. Reply
  `{ applied, conflict, reason, queue }`; any refusal is all-or-nothing and
  changes neither the queue, nor bd, nor the repository.

## Session-log (transcript) channel (spec §5.6)

Streams a per-attempt raw runner event stream to the transcript viewer.

- `subscribe-session-log` payload:
  `{ id: client_id, attempt_id, launch_id?, session_ref?, root_dir? }` —
  `launch_id`가 없으면 기존 main attempt log를 구독한다. `launch_id`가 있으면
  대상 workspace의 exact attempt와 그 attempt의 normalized delegation summary를
  먼저 확인한 뒤 해당 stream만 구독한다. `root_dir`은 선택이며 (UI-eey2 §9.5)
  있으면 registry allow list로 검증한 그 workspace를, 없으면 현행대로 connection
  workspace를 대상으로 한다 — 등록되지 않은 경로는 `bad_request`다. 구독
  레지스트리는 client id로 키를 잡으므로 충돌이 없다. replies `ok`, then pushes
  a `session-log-snapshot`; a live attempt then pushes `session-log-append` per
  new event. A Done/Failed attempt is snapshot-only.
- `unsubscribe-session-log` payload: `{ id: client_id }`.
- `session-log-snapshot` (push) payload:
  `{ id, attempt_id, launch_id?, lines:[…], last_event_at }` — the persisted raw
  jsonl events plus the log file's mtime in epoch ms (`null` when the file
  cannot be stat'd). The raw events carry no timestamp, so this is where the
  drawer's "얼마 전에 움직였나" starts; live appends are stamped client-side on
  receipt.
- `session-log-append` (push) payload: `{ id, attempt_id, launch_id?, event }` —
  one raw event. Delegation 구독에서는 두 push payload 모두 요청한 `launch_id`를
  echo한다. 다른 workspace의 attempt, unknown launch, unauthorized launch는
  filesystem을 조회하거나 구분 가능한 오류를 내지 않고
  `{ lines: [], last_event_at: null }` empty snapshot으로 fail-quiet 처리한다.

### `session_ref` 변형 (UI-4xzk §4.3)

`session_ref: { bead_id, provider, session_id }`가 있으면 attempt가 아니라
**인터랙티브 세션 자신의 transcript 파일**을 연다. attempt도 runtime broker도
없으므로 `last_activity` overlay 대상이 아니다.

- `launch_id`와 함께 오면 `bad_request`다(두 변형은 배타적이다).
- `attempt_id`는 반드시 `session:<provider>:<session_id>`여야 한다 — 이 값이
  클라이언트 store·drawer의 키이며, 병렬 분석기가 `job_id`를 같은 슬롯에 넣는
  것과 같은 규약이다. 불일치는 `bad_request`.
- `provider`는 `claude|codex` enum, `session_id`는 `^[A-Za-z0-9._-]+$`(경로
  구분자·`..`·셸 해석 문자 차단). 위반은 `bad_request`.
- **인가**: 서버는 대상 workspace에서 `bd show <bead_id> --json`을 읽어
  `metadata.session_ref` 항목 중 `(provider, session_id)`가 일치하는 것이 있을
  때에만 파일을 연다. 없으면 **filesystem을 전혀 조회하지 않고**
  `{ lines: [], last_event_at: null }` empty snapshot이다. 즉 이 경로로 읽히는
  파일은 "어떤 Bead가 자기 세션이라고 기록한 파일"뿐이다.
- host 불일치(`remote`)·파일 없음(`missing`)·읽기 실패·`bd show` 실패도 모두
  같은 empty snapshot이다.
- snapshot은 **마지막 개행까지만** 파싱한다: 끝에 개행 없이 남은 바이트는 쓰는
  중인 레코드일 수 있으므로 snapshot에 넣지 않고, 그 오프셋이 tail follow의
  시작점이 된다 — 그 레코드는 완성된 뒤 append로 정확히 한 번 도착한다.
  `last_event_at`은 파일 mtime(epoch ms)이다.
- 이후 새 완전한 줄마다 `session-log-append`가 온다. 서버 어댑터가 Claude
  프로젝트 JSONL과 Codex rollout을 모두 runner 이벤트 형식으로 투영하므로
  클라이언트 파서는 attempt 로그와 같다. 파일이 삭제·교체돼도 reader는 새 파일을
  다시 열지 않는다 (다시 열면 새 snapshot).
- 두 push payload 모두 `launch_id`를 싣지 않는다.

### session-log 라인의 `user` 종류 (UI-4xzk §5.3)

세션 transcript에는 attempt 로그에 없는 **사람 입력 턴**이 있다. 파서
(`app/utils/transcript-lines.js`)는 이를 `DisplayLine.kind === 'user'`로 낸다:
Claude `type: 'user'` 레코드의 `message.content` 텍스트(문자열이거나 `text` 블록
연결)에서 `<system-reminder>…</system-reminder>`를 제거하고 trim한 결과가 비어
있지 않을 때, 그리고 Codex `item.completed` + `item.type === 'user_message'`일
때다. `user_message`는 beads-ui가 정의한 확장 항목이며, 서버 어댑터가 rollout의
`event_msg`/`user_message`를 그 형식으로 투영한다. Worker attempt 로그의 `user`
레코드는 `tool_result`뿐이라 이 라인이 생기지 않고, `last_activity` overlay에도
규칙이 더해지지 않는다.

## Prompt inspection (UI-rxp3 §4/§5)

Read-only, request/response. The recorded prompts are multi-kilobyte and almost
never rendered, so they are STRIPPED from the worker-queue push
(`attemptsWithUsage`) and fetched only when a reader opens them. Workspace scope
is the TARGET workspace, exactly like `subscribe-session-log`: the connection's
own unless the payload names a validated `root_dir`.

- `get-attempt-prompt` payload: `{ attempt_id, root_dir? }` — replies
  `{ attempt_id, system_prompt, task_prompt, recorded_at }`, or
  `{ missing: true }` for an attempt recorded before the fields existed (or one
  of another workspace). `recorded_at` is the attempt's `started_at` in epoch
  ms.
- `get-bead-prompt` payload: `{ bead_id }` — the same record for the bead's
  NEWEST attempt that recorded one. A bead that was never dispatched replies
  `{ missing: true, default_task_prompt }` — what the next dispatch would send,
  so the panel can preview it without holding a copy of the text.
- `get-session-refs` payload: `{ bead_id, root_dir? }` — replies
  `{ bead_id, sessions: SessionRefView[] }` with the same view shape and the
  same projection rules as `session_active[].session_refs` above. `root_dir`
  follows the `get-attempt-prompt` convention (registry allow list; absent keeps
  the connection workspace). A `bd show` failure, an unknown bead, and an absent
  key all reply `{ bead_id, sessions: [] }` rather than an error — the detail
  panel simply draws no session rows. Bead `status` is deliberately NOT carried:
  the panel already holds it, and two sources of one fact can disagree.
- `get-worker-system-prompt` payload: `{}` — replies
  `{ target_base_placeholder, system_prompt, variants:[{ key, label, condition, system_prompt }] }`.
  Assembled server-side through `runner/preamble.js`, the single owner of the
  contract text; `system_prompt` is the dispatch default (`fast_track`,
  PR-submitting) and `variants` carries each conditional shape with the
  condition that selects it.

## Workspace session defaults and execution presets

The workspace-global execution layer lives in `bd kv workflow_session_defaults`
(key name, allowed keys, and the drop-and-warn rules are owned by dotfiles
`workflow.yaml workspace_kv_defaults`; this repo is a consumer).

- `get-session-defaults` payload: `{ root_dir? }` — replies
  `{ values: Record<string,string>, warnings: string[] }`. Read is fail-quiet:
  an absent key or an out-of-vocabulary value yields an empty/partial layer plus
  warnings rather than an error.
- `set-session-defaults` payload: `{ values, root_dir? }` — STRICT: an unknown
  key or an illegal value is refused before bd is touched. `bd kv` has no CAS,
  so the write re-reads immediately beforehand, making it per-KEY
  last-write-wins, and confirms with a readback.
- `apply-impl-preset-global` payload:
  `{ preset_id, expected_revision, expected_queue_revision, root_dir? }` —
  replaces the kv keys a full-profile preset can carry and the queue's three
  orchestration defaults.

`root_dir` is optional on all three (UI-eey2 §9.5). Absent means the
connection's workspace; present means that validated registry workspace, and an
unregistered path is `bad_request`. For `apply-impl-preset-global` this is a
FIX, not only an extension: `root_dir` previously scoped the QUEUE write alone
while the kv read/write/readback stayed on the connection's workspace, so one
profile applied from another repo's panel split across two repos. All three now
address one repo, and a successful write invalidates that repo's monitor
`session_defaults` cache.

## Removed (historical)

`list-issues`, `epic-status`, `list-ready`, `subscribe-updates` /
`issues-changed`, and `update-workflow-settings` were removed. Use the
subscription push protocol and `update-exec-settings` instead.

## Errors

Errors follow `{ code, message, details? }`. Common codes: `bad_request`
(malformed payload / unknown type), `not_found`, `bd_error`, `unknown_type`.
