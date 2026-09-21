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

### `blocked-issues` 구독 (UI-dqg9 §2.1)

`blocked-issues`의 소스는 `bd ready --explain`의 `blocked` 목록 하나다 — 즉
**의존성 차단만** 담는다. 저장 상태 `blocked` 조회는 없다: 워크플로우 계약은
사용자 결정 대기를 `metadata.awaiting_user`로 파킹하고 상태를 바꾸지 않으므로,
파킹된 Bead는 자기 상태가 정하는 컬럼(ready / in_progress …)에 그대로 남는다.

- 각 항목은 `blocked_info: { blockers: string[] }`를 얻는다. 먼저 착지해야 하는
  Bead id 목록이며, 그 외 키는 없다.
- 카드의 `⏸ 사용자 리뷰 필요: <값>` chip은 `blocked_info`가 아니라 이슈의
  `metadata.awaiting_user`를 읽는다. 값 어휘는 계약이 소유하고 UI는 검증하지
  않으며, 키가 없거나 metadata를 읽을 수 없으면 chip 없이 렌더한다(fail-quiet).
  chip은 어느 컬럼에서든 같은 자리에 선다.

### `ready-issues` / `blocked-issues` partial decorations (UI-d13v §3.3/§3.5/§3.7)

Items of these two types carry additive display decorations derived from the
workspace snapshot. Every key is OPTIONAL: an absent key means "not known", so a
consumer omits the chip and sorts the row last (fail-quiet). Board reads the
same projections and simply ignores them.

- `release_info?: { released_by: [{ id, closed_at, foreign, root_dir? }], last_released_at }`
  — the CLOSED blockers this issue was waiting on, `closed_at` descending;
  `last_released_at` is the first entry's `closed_at`. Open blockers stay with
  `blocked_info`. A foreign entry appears only once the owning rig's cache
  reports `closed` with a `closed_at`, and carries `root_dir` only when that
  owner is known. An empty `released_by` carries no key.
- `dependents_info?: { count, ids, root_dirs? }` — OPEN issues waiting on this
  one, collected over this workspace's snapshot plus whatever snapshot each
  other visible workspace already had; `ids` is EVERY one of them, alphabetical
  (UI-8x90 §6.1 — the old cap of 5 is gone). `root_dirs` maps an id to the peer
  workspace whose snapshot produced it, exactly as `release_info` does: a
  same-repo id has no entry, and an empty map carries no key. `count === 0`
  carries no key, so 0 and unknown are indistinguishable.
- `decoration_rev: string` — stable serialization of the two keys above (`''`
  when neither is present). NOT display material: it is the delta fingerprint
  that lets an upsert reach the client when only a decoration moved, since
  neither key touches the issue's own `updated_at`/`closed_at`. Other list types
  carry no such key and compare as `''`.

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

Per-workspace persisted manual card ranking consumed by the Board columns only.
The Worker candidate lane orders itself by its sort chain and neither reads nor
writes this channel (UI-d13v §6). CAS-guarded like the worker queue.

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
server-global monitor channel. The first push is `monitor-pipeline-snapshot`:
`{ type, id, seq: 1, workspaces, workspaces_state }`. Subsequent changes arrive
as `monitor-pipeline-patch`:
`{ type, id, seq, set: Record<string, unknown>, unset: string[] }`. The sequence
is continuous (the first patch has `seq: 2`); unchanged content sends no frame.
A sequence gap or regression clears the client store and resubscribes once for a
fresh snapshot. Key splitting and assembly are defined in
[`app/data/keyed-patch.js`](./data/keyed-patch.js).

Every visible workspace has a `workspaces_state` row:
`{ root_dir, name, issue_prefix: string|null, auto_advance, auto_merge, slots, revision, runner_catalog }`
plus, since UI-eey2 §9.4, the repo-panel control fields:
`{ serial_lane_count, orchestration_model, orchestration_effort, orchestration_speed, quick_fix_orchestration_model, quick_fix_orchestration_effort, quick_fix_orchestration_speed, execution_defaults, session_defaults, session_defaults_warnings, counts, provider_limit_policy }`.
`issue_prefix` comes from that workspace's bd config cache; missing, malformed,
or temporarily unreadable config is `null`.

Each `workspaces[]` row may also carry `external_waits[]`. These are read-only
`external_wait` observations with the confirmed repository, gate and consumer
identity; projected job/monitor labels; `job_id`; `stage`; `gate_open` and
`recent_complete`; the validated `watch_id`; `last_observed_at`,
`next_observation_at`, `completed_at`; and bounded `monitor_reason`, `stale`,
and `collected_at` fields. The wire does not include SSH configuration, remote
paths or logs, Worker API addresses, process identity, artifact contents, or the
complete watch document. Older servers omit the array. The corresponding
`workspaces_state[]` row may carry `external_wait_count` and
`external_wait_attention_count`.

- `serial_lane_count` and the six orchestration values are that workspace's own
  queue state. A legacy queue with no key reads as one serial lane and null
  orchestration pins — the state such a workspace is actually in.
- The three `quick_fix_orchestration_*` values are the route-scoped override
  layer a `route=quick_fix` dispatch reads before the general triple. They are
  always PRESENT on this row, `null` included, because the repo panel's
  execution pane probes the key to tell a new server from one that predates the
  lane. The workspace's own orchestration display row keeps showing the general
  triple.
- `provider_limit_policy: { claude, codex }` is that workspace's stored
  per-runner limit policy (`{ mode, accounts, preempt_pct }`), carried verbatim
  from the queue so a repo panel opened from the monitor draws the stored policy
  rather than the default, and so the bulk 계정 적용 section can read its copy
  source (UI-8ncz §5).
- `execution_defaults` is the same read-only projection the worker snapshot
  carries (see below), repeated here so a repo panel can resolve chips for a
  workspace it holds no worker subscription to.
- `session_defaults: Record<string, string|boolean>` is that repo's
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

Candidate placement facts are `route`, `spec_state`, `has_description`,
`awaiting_user`, and `worker_ineligible`. Display observations also carry
`session_preferred_reason` (empty when absent or worker-ineligible),
`spec_after_blocker` (true only with an unsatisfied blocker), and optional
`awaiting_user_reason` (formatted from the complete metadata object). Optional
`release_info` and `dependents_info` use the same snapshot decoration functions
as Ready/Blocked lists. These fields do not change admission or scheduling.

The `session-preferred` label is ADVISORY and, unlike `worker-ineligible`, never
removes a row from the runnable verdict — `qualify()` in
`server/worker/runnable-cache.js` reads it only for display. It is valid only
when the paired `session_preferred_reason` metadata is inside the contract enum
(`external_roundtrip`, `user_feedback_loop`), and it loses to
`worker-ineligible` in display: a row carrying both draws the
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

`WorkflowSummary.worker_created_from: string|null` is the validated immutable
native source ID from `metadata.worker_created_from`. Invalid, blank,
whitespace-padded, control-character, and self-referential values become `null`.
Snapshot list items additionally carry `worker_created_from_root_dir?: string`
only when exactly one visible workspace snapshot contains that source ID; an
absent or ambiguous owner leaves the source chip inactive. Worker `bead_overlay`
preserves both fields across all five issue columns so waiting, running,
PR-wait, and done rows do not depend on the candidate row being present.

Runnable rows also carry `rec: Record<string, string>|null` (UI-sbum §2) — the
workflow's RECOMMENDED execution settings under their original `rec_*` key names
(`rec_orchestration_model`, optional `rec_impl_runtime`, optional `rec_reason`),
enum-checked by the server and `null` when `rec_orchestration_model` is absent
or outside its enum. It is display-only: the worker never reads it, and it stays
OUT of `exec_pins`, which means "the pins the worker applies" — a recommendation
is not one until a person applies it.

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
`{ bead_id, title, status: 'in_progress', route, spec_id, plan_path, labels, created_at, updated_at, started_at, workflow, blocked, blocked_by, session_refs, session_observation? }`.
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

`session_observation` is present only for the current reference when its local
transcript is readable. It carries
`{ provider, session_id, observed_at, model, usage, usage_legs, delegations }`.
`usage` is the current conversation's root usage, `usage_legs` preserves
model/turn splits, unknown residual ranges (`partial:true`) and external child
receipts, and `delegations` carries only observed identity, model, state,
timestamps and per-child usage. Transcript text and paths never travel. Pricing
is absent from this observation and is recomputed from the snapshot's current
`runner_catalog`. Older servers and unreadable, remote or missing references
omit the field; consumers draw no usage or delegation row in that case.

`workspaces[].bead_blocked_by` is the worker snapshot's map with one more
filter: a blocker id whose prefix belongs to ANOTHER visible workspace is looked
up (`bd show` in that rig, process-cached) and dropped once it reports `closed`.
Unknown status keeps the id. The map therefore lists open blockers only, on
either side of a rig boundary; a closed predecessor never renders as `(완료)` or
`(미적재)`.

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
- The first push is a snapshot (`seq: 1`); subsequent changes are
  `worker-queue-patch`:
  `{ type, id, seq, root_dir, set: Record<string, unknown>, unset: string[] }`.
  `seq` is continuous, starting at 2 for the first patch; unchanged content
  sends no frame. A sequence gap or regression clears the client store and
  resubscribes once for a fresh snapshot. Key rules are defined in
  [`app/data/keyed-patch.js`](./data/keyed-patch.js). Mutation reply queues
  overlay keys without resetting the subscription sequence; replies with an
  older queue `revision` are discarded.
- `worker-queue-snapshot` (push) payload:
  `{ type: 'worker-queue-snapshot', id, seq, root_dir, queue }` — `root_dir` is
  the workspace this snapshot describes (envelope addressing, not part of
  `queue`), so a client that already repointed to another workspace can drop a
  snapshot from a subscription the server has not torn down yet; the rest is the
  full queue (`revision`, `auto_advance`, `slots`, `serial_lanes[]`,
  `serial_lane_count`, `queue[]`, `pr_wait[]`, `done[]`, `attempts`,
  `admission`, `cleanup_failed`, `exec_defaults`) — an `admission` record is
  `{ reason, at, stale?, stale_work?, blockers? }`, where `blockers` is
  `Array<{ id, rig: string|null, status }>` carried ONLY by the
  `prerequisite_unmet` reason: the unmet `blocks` prerequisites the scheduler
  proved, same-rig (`rig: null`) and foreign alike (UI-d3i1 §5.1). A malformed
  list is dropped whole, and consumers fail-quiet on the key being absent (older
  server) — plus the server-decorated, NON-persisted keys:
  `workspace_info: { slots, repo_ops }` — where `repo_ops` additionally carries
  `repo_id`, the canonical repository path the registered attachment resolved
  the declaration against, `null` where no attachment is registered —,
  `runner_catalog`, `execution_defaults`, `pr_observations` (per-`pr_wait` PR
  state + merge-gate verdict, memory cache only), `bead_titles`
  (`Record<bead_id, title>` for the `queue`/`pr_wait`/`done` beads, memory cache
  only), and `declared_base`. `bead_titles` is PARTIAL: only titles already
  cached travel, a miss simply has no entry and arrives in a later snapshot once
  the server's async lookup fills it. Consumers fail-quiet on the whole key
  being absent (older server) and on a missing entry — both fall back to
  displaying the bead id. `bead_labels` is likewise a non-persisted partial
  `Record<bead_id, string[]>` for the same `queue`/`pr_wait`/`done` beads. Its
  arrays are normalized from the same async `bd show` fill as titles and times;
  no entry means label truth is unknown (not an empty array), including when an
  older server omits the whole key. It is UI projection only and never Worker
  scheduler authority.
- A `pr_wait` entry the server SYNTHESIZED for an external PR (UI-7agi §2) is
  marked `external: true` and carries `wt_present: boolean`. When the row comes
  from the external-PR registry it additionally carries that registry's own PR
  facts as OPTIONAL fields (UI-kyky §6.1): `foreign?: true` — the url names a
  repository other than this workspace's origin, so nothing here observes,
  merges or cleans it up —, `repo_slug?: string` (`OWNER/REPO`),
  `pr_url?: string` and `pr_number?: number`. Each travels only when the
  registry holds it, so an absent field means "not known", never a default. A
  row synthesized from `queue.merge_queue` alone carries NONE of the four: it
  has no registry row behind it. Consumers must not re-derive `foreign` from
  `repo_slug` — the origin comparison is the server's, and a foreign row's PR
  link is built from these verified values because the poller records
  `pr_repo_foreign` and never observes such a PR. Both the worker snapshot and
  the monitor pipeline read the SAME `withExternalPrWait` result through
  `decorateQueue`.
- `bead_timelines: Record<bead_id, { events: TimelineEvent[], log_path: string|null, log_expired: boolean, log_unreadable?: boolean }>`
  (record-timeline-retention §9) is the 실패 팝오버·파킹 타일 material of the
  beads whose card actually shows a failure or a park — an attempt in
  `failed`/`orphaned`/`parked`. `events` is that bead's LAST FIVE timeline
  lines, oldest first, each
  `{ event_id, at, bead_id, kind, summary, attempt_id?, detail?, log_path? }`;
  `log_path` is the §4 read-resolution order's resolved path, and `log_expired`
  is `true` when that order found the transcript in NONE of its locations while
  the record does name one — the 180-day retention policy deleted it, which the
  tile renders as `만료됨`. `log_unreadable` is present and `true` when that
  order hit a storage fault instead of an absence (a permission or I/O error on
  a candidate); the tile renders that as `읽기 실패`, because a fault is not a
  deletion. Non-persisted, computed per snapshot, and fail-quiet BY OMISSION: a
  bead with no events and no log fact has no entry at all, and an older server
  omits the whole key. It rides the snapshot rather than a request because ADR
  14 makes `buildLanes` the only assembler of a card — a renderer that fetched
  its own rows would be a second assembly path for the same tile. The WHOLE
  timeline is a different question, answered by `get-bead-timeline`.
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

- `bead_dependents: Record<bead_id, { ids: string[], root_dirs?: Record<string, string> }>`
  (UI-8x90 §6.2) is the OPEN follow-ups of the beads in exactly the `bead_scope`
  target set: `queue` ∪ `serial_lanes[].entries` ∪ the 실행중 레인 beads ∪
  `pr_wait` ∪ the runnable projection ∪ `session_active`. The material is the
  workspace list snapshot's `blocks_in` index — this workspace's own plus
  whatever snapshot each other visible workspace already had, peeked and never
  requested — and `root_dirs` names the peer workspace that produced a given id,
  with no entry for a same-repo one. Non-persisted, display only, fail-quiet.
  PARTIAL in a way `bead_blocked_by` is not: an EMPTY array means "none among
  the snapshots this process can see", NOT "none", because a peer with no
  snapshot yet contributes nothing. Consumers must therefore UNION this with the
  후보 행's `dependents_info` rather than letting either source win. The whole
  key is absent when this workspace has no snapshot yet or the lookup context
  would not assemble — that is 모름, and an older server omits it too.

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
- An unfinished implementation attempt may settle with `status: 'waiting'` and
  `cause_detail.recovery: { classification, disposition, reason, policy_schema: 1, no_progress?: { count, key } }`.
  Its original `cause`, summary, and other failure evidence remain intact. A
  recovery wait does not imply prerequisite blockers and does not emit
  `attempt_failed`; its timeline ending is `kind: 'session_ended'` with summary
  `대기 · recovery:<reason> — <original cause>`. Ordinary queue dispatch is
  fenced by `recovery_wait`; manual resume preserves the recorded execution
  selection and any retry origin, consumed count, maximum and exhaustion flag.
  Ending the queue timer keeps that budget on the attempt; an exhausted record
  has `retry.exhausted: true` and `retry.next_at: null`. Two identical repeats
  set reason `no_progress` and refuse provider automatic resume. These fields
  express waiting intent, not resume authority. The comparison uses cause,
  classification, normalized summary, head OID, verification result, PR URL and
  execution preset; incidental timestamps, attempt/run IDs and log SHAs do not
  reset it. Reconcile can reclassify the latest preserved implementation failure
  as waiting, with `reclassified_from: 'failed'` and `reclassified_at` inside
  recovery. Original cause, summary, retry, finish time and `attempt_failed`
  history remain. Dismissed, completed, discarded, superseded and live lineages,
  prerequisite/base-moved waits and matching environment failures are excluded.
  This pass dispatches no session and requires both recovery contracts ready.
- Worker and Monitor tiles project these records as `run_state: 'waiting'`,
  without a failure projection or failure count. Their `wait.recovery` contains
  `{ classification, disposition, reason, no_progress: { count, key }|null, label: string|null, sentence: string|null }`;
  `wait.cause` retains the original cause and `wait.since` is `finished_at`.
  Known labels and sentences come from `app/utils/failure-sentences.js`; unknown
  reasons keep their raw token and no invented sentence. A recorded session with
  no resume child enables the existing `↻ 이어하기` action; the existing waiting
  discard action remains available. When resuming is unavailable,
  `wait.resume_reason` names the missing session or the child that already
  inherited it, using the existing wait body slot. A running attempt resumed
  from a recovery record carries `status_label: '복구 중'`.
- The shared `wait_reasons` model adds kind `recovery` for the latest waiting
  implementation attempt carrying `cause_detail.recovery`, excluding live,
  completed and PR-wait subjects. Its headline combines the state, awaited
  condition, original cause token and any `무진전 N회`; `since` is
  `finished_at`. Reasons `unclassified`, `reconcile`, `authority` and
  `no_progress` have verdict `action_required` with code `recovery_confirm` and
  message `보존된 작업의 원인 확인 또는 이어하기·폐기 결정이 필요함`. Other
  reasons start `normal` and become `overdue` / `settle_overdue` after two
  observation intervals. Actions contain `resume` with
  `{ root_dir, bead_id, attempt_id }` only when the session ID is non-empty.
  `notify_plan` is `{ on_overdue: 'discord', on_complete: 'none' }`; existing
  claim-once suppression prevents repeated sends. Recovery subjects appear in
  blocked summaries, with `action_required` subjects counted once in
  `조치 필요`.
- A TERMINAL attempt inside `attempts` may additionally carry the non-persisted
  `impl_actor: { kind: 'delegated'|'main'|'mixed', model: string|null, effort: string|null, label: string, parts?: { unit, label }[] }`
  (UI-ys18 §5.1) — the actual implementer the attempt's own preserved
  `exec_receipt` names, derived on the server by the preset-comparison parser
  before the internal-field trimming removes `receipt_check`. It is a SNAPSHOT
  of what RAN: a later pin, preset or global-default change never rewrites it,
  and the wire never carries `receipt_check` itself. A multi-unit receipt whose
  units name DIFFERENT executors yields `kind: 'mixed'` (UI-obl0 §2.2), whose
  `label` is `<actor>/혼합` when every unit is delegated to the same actor and
  only effort differs, otherwise `혼합 <n>종` with n the count of DISTINCT unit
  executor labels; `parts` lists `{ unit, label }` per unit in receipt order and
  is present only on `mixed`. Only an unreadable, corrupt or absent receipt — or
  one with a unit that fails to parse — produces NO field at all, which is the
  same thing an older server sends; consumers fail-quiet on the absence by
  omitting the 완료 행's worker chip rather than falling back to current
  settings.
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
    `live`/`done`/`failed`/`interrupted`. No total unit count exists in the
    durable vocabulary, so `label` names the ordinal only
    (`구현 unit 3 · codex`, `review-consult · codex`).
- An attempt may carry
  `usage_segments: Array<{ provider, role, scope_id?, turn_id, model, usage, observed_from?, observed_through?, partial?, partial_reasons?, cost_covered? }>`.
  These model-scoped root ranges survive terminal persistence and replay;
  `scope_id` identifies the thread, turn, model and proven attempt window.
  Observation bounds are epoch milliseconds; raw response IDs stay server-side.
  `partial:true` marks an incomplete observation. A known model still receives
  its configured price; completeness does not erase model identity. Unknown
  model ranges remain unpriced, and ranges without proven attempt ownership stay
  outside the attempt total. Partial state and its reasons survive provider,
  attempt, bead, workspace and comparison aggregation, including medians.
  `cost_covered:true` is present only on model-scoped token segments whose same
  terminal result group also carries a valid reported `total_cost_usd` segment.
  Their token counts remain in totals and model detail, while pricing excludes
  them from priced, estimated, and unpriced leg counts because that reported
  amount already covers the group once.
- An attempt may carry
  `codex_children: Array<{ thread_id, parent_thread_id, launch_id, agent_path, model, effort, status, started_at, completed_at, last_event_at, usage, usage_segments?, usage_partial?, usage_partial_reasons? }>`
  (UI-mn5u §6.2) — Codex NATIVE subagents observed from the rollout files Codex
  wrote, since `codex exec --json` carries no child event at all. It is a
  UI-owned OBSERVATION record: never workflow metadata, never an execution
  receipt, never a gate input, and it is NOT the external
  `delegation_sessions[]`/`usage_legs[]` receipt vocabulary — those validators
  stay strict and unchanged. `status` is `running`/`done`/`failed`/
  `interrupted`, where `interrupted` means the parent ended with no terminal
  evidence for that child, not that anything was killed. `usage` carries only
  the six Codex keys (`input_tokens`, `cached_input_tokens`,
  `cache_write_input_tokens`, `output_tokens`, `reasoning_output_tokens`,
  `total_tokens`) or null. Newly observed direct records produce the sum of the
  child's verified response segments within the attempt window. Legacy rows
  without such segments retain their last cumulative observation for individual
  display. Child segments carry `scope_id`, `turn_id`, `model`, `usage`,
  `observed_from`, `observed_through`, and optional partial state and reasons.
  Parent and child totals use verified direct contributions once, rather than
  adding cumulative snapshots to response usage. Unproven boundaries, missing
  child usage and unresolved receipt overlap leave the total partial. A running
  attempt gets the field as a live overlay; a settled one carries the normalized
  rows on its record. Consumers fail-quiet on its absence: no field means "not
  observed", never zero.

  Historical preparation is asynchronous and shares work for the exact connected
  attempt/session. Synchronous projections consume the prepared observation and
  never scan transcripts or run extra `bd` reads. Missing or truncated originals
  do not replace saved usage with zero. Parent termination alone does not prove
  child completion or a fully drained usage range.

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
- `worker-queue-toggle` payload: `{ on, expected_revision }` — persists the
  legacy independent `auto_advance` surface and, on turn-ON, kicks the live
  dispatch loop (`tick`).
- `worker-automation-toggle` payload: `{ on, expected_revision }` — atomically
  aligns `auto_advance` and `auto_merge`; OFF also clears ordinary waiting merge
  entries while preserving active and resolution-bound work.
- The `worker-queue-snapshot` carries `repo_operation_policy` — the projection
  of the PINNED contract copy `generated/contracts/repo-operation-policy.json`
  (an exact byte copy of the dotfiles artifact, with its source commit and
  digest in the sibling provenance file). Shape:
  `{ schema_version, supported: boolean, source_commit, digest, worker_automatic: string[], resolution_ladder: Record<string,unknown>[], after_ladder: string, after_ladder_recovery: object|null, manual_human_fix: string, never_automatic: string[] }`.
  The lists and the ladder are the contract vocabulary VERBATIM: membership is
  decided by the contract alone, never by server or client code. A client
  renders each token through a display dictionary and MUST fall back to the raw
  token, so a contract that gains an entry shows up without a client change.
  `supported` is the consumer decoder guard: it is `false` whenever
  `schema_version` is anything other than `4`, structure is unusable, or byte
  count, SHA-256, recomputed Git blob or source provenance does not match.
  Recovery readiness and automatic handoff require both this policy and the
  work-recovery policy to validate. Under schema 4 the ladder holds exactly one
  AUTOMATIC step (`script_retry`); there is no repair-session step and no
  user-triggered resolution entry. `after_ladder_recovery` is a deep copy of the
  contract's rules for preserving the raw failed operation and classifying
  waiting or an ordinary workflow repair handoff; it is `null` when absent.
  `supported: false` stops that automatic ladder step only.
- The `worker-queue-snapshot` carries `repo_operations` — the operation cards,
  newest `requested_at` first. Each card:
  `{ operation_id, kind: 'verify'|'deploy', repo_id, target_base, target_sha, target_tree, effective_base_sha, script_path, script_blob_sha, script_mode, state: 'queued'|'running'|'succeeded'|'failed'|'retry_pending', requested_at, started_at, finished_at, elapsed_ms, exit_code, signal, log_path, log_digest, output_tail, subjects, failure, failure_kind, verify_stage, retry: { status, first_fingerprint, first_failure, blocked_reason, absorbed }, source: 'automatic'|'manual', dismissed, superseded_by }`.
  `output_tail` and `failure.detail` are SANITIZED (credential-shaped substrings
  redacted) and the tail is bounded — the full log stays behind `log_path`. The
  optional `repo_operations[*].recovery` field carries
  `{ classification, disposition, reason, code_defect, prover, proof_gap, policy_supported, handoff }`.
  `prover` is `deterministic_owned_script_failure` only when the same pinned
  script failure reproduced after the single retry, its summary announces a
  script failure, and summary/detail contain no environment or auth pattern.
  Otherwise it is `null`; reproduced but unproven failures wait for verification
  with `proof_gap: 'env_or_auth_pattern'|'no_script_failure_line'`. A
  `policy_supported: false` wait is rejudged from raw evidence when support
  returns, preserving the handoff and unknown-outcome evidence. Optional
  `outcome_uncertain: true` preserves a missing retry terminal marker even when
  the ledger retains the first failure and policy support is unavailable. This
  prevents that copied first failure from becoming reproduction proof. `handoff`
  is `null` or
  `{ key, state: 'reserved'|'bead_recorded'|'reused', handoff_bead_id, reserved_at, recorded_at, error, placement?: { route: 'quick_fix', receipt, lane: 'parallel', placed_at } }`.
  Missing or malformed recovery evidence renders nothing. Raw operation state,
  failure, logs, exit, retry and partial effects remain unchanged. A handoff key
  hashes repository, operation kind, target SHA, script blob/mode and failure
  fingerprint. An open repair for the same key is reused across operations and
  restarts; only a confirmed closed repair permits a new reservation on another
  operation. A returned repair id is retained before dependency writes, and
  missing responses are reconciled by `repair_key` metadata before creation. The
  new issue is read back and checked against the quick-fix handoff contract.
  After the checker passes, one update pins `route=quick_fix` and the
  `quick_fix_review=worker@<digest>` receipt; a second readback must recompute
  as reviewed before placement. Existing routed and placed issues are adopted.
  Errors retain the same reservation for restart; absent placement means the
  handoff is incomplete. Repair PR creation alone does not complete the original
  cleanup. Bead history records `kind: 'operation_recovery', seq: operation_id`
  with `복구 분류 — <disposition>:<reason|repair> · <failure code>` and
  `kind: 'repair_handoff', seq: handoff.key` with
  `수정 인계 — <handoff_bead_id> (<reused|created>) · 배치 parallel`. Each
  subject gets the same replay-safe event identity in its `events.jsonl`; queue
  state stores no history. The shared `wait_reasons` model adds one `recovery`
  row for an unfinished subject with an operation handoff:
  `수정 작업 대기 · <handoff_bead_id> · 원인 <failure code>`, an issue target,
  and release `수정 Bead의 PR·배포 뒤 [정리 재시도]`. Its verdict is `normal`;
  the repair issue's own lane judges progress. Operation waits without a handoff
  use the shared recovery sentences, with `action_required/recovery_confirm` for
  unclassified or reconciliation reasons. Existing attempt recovery, base-moved
  and prerequisite rows take precedence, so one subject never gets two recovery
  rows. `failure_kind` is a DISPLAY token: it is `verify_script_failure`,
  `deploy_script_failure`, `interrupted_without_terminal_exit`, or — for every
  other failure — the raw `failure.code`. There is no `other` token and no
  allowlist behind it, and a client MUST render an unknown token verbatim. A
  failed card carries no resolve affordance: the only automatic step is
  `script_retry`, whose outcome `retry.status` reports (`unconsumed`,
  `consumed`, `absorbed`, `not_applicable`) with `retry.blocked_reason`
  (`schema_unsupported`) when it could not run at all, `retry.first_fingerprint`
  for the failure it absorbed, and `retry.absorbed` when it did.
  `retry.first_failure` is the FIRST attempt's failure record
  (`{ code, fingerprint, detail, interrupted }`, `detail` sanitized like every
  other one) — the only way a card whose retry produced a DIFFERENT failure can
  name the one it started from. `source` is provenance, not state: `manual` is a
  배포 실행 click, everything else is `automatic`. `dismissed` removes a row
  from the 해결 필요 tally only; the record keeps its failure and its evidence.
  A record that cannot be read as a complete operation is DROPPED rather than
  projected partially.
- `worker-repo-operation-deploy-run` payload: `{ repo_id }` — the 배포 실행
  click (UI-s582 §3): run the DECLARED deploy script once, now. There is no
  target SHA input and no `expected_revision`: the server pins remote, base and
  the fetched tip through the workspace's one base resolver (never assuming
  `origin`), and reads the `[deploy]` declaration and its script blob from THAT
  tip — the single previous-base exception, manual path only. `repo_id` is
  REQUIRED and names the repository the client drew the button for; it is read
  from `workspace_info.repo_ops.repo_id`, and an absent, empty or non-matching
  value is refused rather than redirected. A snapshot that carries no `repo_id`
  leaves the button disabled instead of sending an uncheckable request. Reply:
  `{ ok: true, operation_id, queue }` or `{ ok: false, reason, queue }` with
  `reason` ∈ `deploy_not_declared` (no `[deploy]` at the tip) ·
  `deploy_opted_out` (this workspace's deploy opt-out is on) ·
  `deploy_in_flight` (a deploy for this repo is `queued`/`running`/
  `retry_pending`) · `target_unresolved` (the base resolver, the declaration
  read, or the ancestry probe could not decide — fail-closed) ·
  `remote_history_not_monotonic` (the deploy worktree HEAD and the tip have
  diverged). All three MONOTONIC relations between that HEAD and the tip are
  allowed — equal, HEAD ahead, HEAD behind — because a manual run means
  redeploy: an equal or already-contained tip aligns and RUNS instead of
  settling as covered. `ok: true` means a record exists and the lane owns it;
  what the script then does lives on the operation card. Every click that gets
  past the guards creates a NEW operation — the identity hashes a server-issued
  monotonic `manual_run_id` — and links the previous record for the same target
  through `superseded_by`. The tip is pinned onto the record at PRERECORD time:
  a manual operation that waits behind another operation still launches at the
  tip its click was authorized against, and a record that lost that SHA settles
  `failed` with `manual_target_missing` rather than binding a newer one.
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
- `worker-attempt-pause` payload: `{ attempt_id, require_durable? }` — pauses
  (⏸) a running attempt while preserving its resumable state. Reply
  `{ attempt_id, paused, phase, reason }` exposes the durable control phase
  (`done` when the pause has settled). `require_durable: true` is the
  instructions-restart entry (UI-qce9 §4): the server checks §2 eligibility
  BEFORE signaling (a missing process controller refuses with
  `process_controller_missing`, an ineligible record with
  `prior_session_unavailable`), then answers only after the durable control AND
  the parent's whole settlement chain finished. A non-boolean value is
  `bad_request`.
- `worker-attempt-resume` payload:
  `{ attempt_id, expected_revision, continuation?, decision_token?, instructions?, exec_override? }`
  — `exec_override` accepts `runner`, `model`, `effort`, `claude_account` and
  `codex_account`; each account key is validated against its own catalog and is
  only accepted for its own runner (codex-orchestration-parity §5.2). — ▶ on a
  paused/failed/orphaned attempt; cap-exempt (human-originated). `instructions`
  is an optional 1..4000 character user instruction; blank after trimming is
  treated as absent. `continuation` is `auto` | `prior_session` |
  `fresh_current` | `prior_attempt`. `prior_attempt` (UI-qce9 §5) means "the
  recorded attempt's session AND its recorded execution settings": it needs NO
  `decision_token` (it is a fixed policy, not a provider choice), refuses
  `exec_override` with `bad_request`, never falls back to a fresh session when
  the transcript is gone, and refuses with `prior_session_unavailable` when the
  recorded runner/account cannot run here. It has no UI entry point since
  UI-6icf; the dialog's two branches both send the ordinary `auto` path.
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

### HTTP 세션 API

등록된 워크스페이스의 절대 경로 `root_dir`로 대기열을 읽고 배치·제거한다. POST
본문은 JSON이다. 변경 요청은 GET에서 읽은 정수 `expected_revision`을 필수로
보내며, 그 사이 큐 버전이 바뀌면 새 스냅샷을 읽어 다시 판단한다. 응답은
`Cache-Control: no-store`이며 CORS 헤더는 제공하지 않는다.

| 요청                                             | 입력                                                      | 성공 응답 (HTTP 200)                                                          |
| ------------------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `GET /api/worker/queue?root_dir=<absolute-path>` | 필수 쿼리 `root_dir`                                      | `{ ok:true, revision, serial_lane_count, lanes, running, pr_wait, attempts }` |
| `POST /api/worker/queue/place`                   | `{ root_dir, bead_id, expected_revision, lane?, index? }` | `{ ok:true, applied:true, lane, index, revision }`                            |
| `POST /api/worker/queue/remove`                  | `{ root_dir, bead_id, expected_revision }`                | `{ ok:true, applied:true, revision }`                                         |

`lanes`는 병렬 레인부터 직렬 레인 순으로 나열한 `{ id, entries }[]`다.
`running`과 `pr_wait`는 `{ bead_id, serial_lane_id }[]`이며 병렬·기존 기록의
레인 값은 `null`이다. `attempts`는 현재 큐가 보유한 구현 시도의
`{ attempt_id, bead_id, status, kind }[]`다. 완료 레인 `done`은 GET에 포함하지
않는다.

배치의 `lane`은 생략하면 `parallel`이며, `parallel` 또는 `s1`부터 `s5`까지
허용한다. 선택한 직렬 레인이 실제 설정 범위를 벗어나면 거부한다. `index`는
선택적 정수이고 생략하면 꼬리에 배치한다. 응답의 `lane`·`index`는 의존성 순서
보정 후 실제 자리다. 제거는 병렬·직렬 대기 레인과 `pr_wait`·`done`에 적용하며,
실행 중인 프로세스를 정지하지 않는다.

| 상황                                       | HTTP 상태 | 응답                                                             |
| ------------------------------------------ | --------- | ---------------------------------------------------------------- |
| 필수 필드 누락·형식 오류·미등록 `root_dir` | 400       | `{ ok:false, error:'bad_request' }`                              |
| 큐 버전 불일치                             | 200       | `{ ok:true, applied:false, conflict:true, revision }`            |
| 활성 폐기 작업 등으로 변경 거부            | 200       | `{ ok:true, applied:false, conflict:false, reason:'rejected' }`  |
| 제거할 Bead가 어느 레인에도 없음           | 200       | `{ ok:true, applied:false, conflict:false, reason:'not_found' }` |
| 배치의 실행 자격 검사 거부                 | 200       | `{ ok:true, applied:false, conflict:false, admission_reason }`   |

없는 항목의 제거는 큐 버전을 바꾸지 않는다. 적용된 배치·제거는 웹소켓 구독자에게
갱신된 스냅샷을 알리고 다음 대기 항목의 실행 판단을 요청한다.

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
  `{ id, attempt_id, launch_id?, lines:[…], last_event_at, expired?, notice? }`
  — the persisted raw jsonl events plus the log file's mtime in epoch ms (`null`
  when the file cannot be stat'd). The raw events carry no timestamp, so this is
  where the drawer's "얼마 전에 움직였나" starts; live appends are stamped
  client-side on receipt. `expired: true` + `notice: '만료됨(180일 보존 정책)'`
  (record-timeline-retention §4) mark a transcript the read-resolution order
  found in NONE of its locations for a SETTLED attempt — the retention policy
  deleted it. Both keys are ABSENT otherwise: "정책이 지웠다"와 "아무것도 쓰지
  않았다"는 다른 대답이므로 빈 `lines`로 겹쳐 말하지 않는다. A running attempt
  whose file has not appeared yet is a one-poll race, never `expired`.
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
  클라이언트 store·drawer의 키다. 불일치는 `bad_request`.
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
- `get-bead-timeline` payload: `{ bead_id, root_dir? }` — replies
  `{ bead_id, events: TimelineEvent[], attempts: Attempt[] }` with the bead's
  WHOLE Worker history, NEWEST FIRST (record-timeline-retention §9), for the
  issue detail panel's `Worker 이력` 섹션. The five lines `bead_timelines` puts
  on the queue snapshot answer the tile's question; this answers the page's, and
  the page reveals the list progressively rather than the server paging it.
  `attempts` is the §7 union of the live queue's rows and the bead's transferred
  `attempts/<attempt_id>.json` records, deduped by `attempt_id` with the live
  row winning: the panel's 세션 이력 and 총 사용량 are computed from that union
  ∪ the client queue store, so a bead whose finished records already left
  `queue.json` still shows its sessions and its cumulative usage. `root_dir`
  follows the `get-attempt-prompt` convention (registry allow list; absent keeps
  the connection workspace). An unknown bead, a workspace with no Worker
  attachment, and a bead that was never dispatched all reply
  `{ bead_id, events: [], attempts: [] }` rather than an error — the section
  then renders nothing at all, not an empty state.
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

`impl_runtime` is `auto | claude | codex`, where `auto` means the controller
picks the provider per delegated unit at run time and beads-ui derives no
provider from it — only an exact `impl_model` token names one.

- `get-session-defaults` payload: `{ root_dir? }` — replies
  `{ values: Record<string,string|boolean>, warnings: string[], worker_url }`.
  Read is fail-quiet: an absent key or an out-of-vocabulary value yields an
  empty/partial layer plus warnings rather than an error. A value is a boolean
  only for a key the contract types `type: bool`.
- `set-session-defaults` payload: `{ values, root_dir? }` — STRICT: an unknown
  key or an illegal value is refused before bd is touched. `bd kv` has no CAS,
  so the write re-reads immediately beforehand, making it per-KEY
  last-write-wins, and confirms with a readback. Success has the same shape as
  GET; a resolver failure does not fail a successful kv write.
- Both replies keep `values.bdui_url` as the stored repository exception only.
  `worker_url` is
  `{ status: 'ok', effective_url: string|null, source: 'workspace'|'common'|'unset', workspace_override: string|null, common: { value: string|null, state: 'configured'|'unset'|'invalid'|'unavailable', revision: string|null }, warnings: unknown[] }`.
  A missing common document uses revision `missing`. Resolver warnings are
  separate from kv `warnings`. Failure is
  `{ status: 'unavailable', effective_url: null, source: null, error: { code: 'helper_unavailable'|'workspace_unavailable' } }`;
  normal absence resolves an empty snapshot, while an unreadable stored value is
  unavailable.
- `set-worker-url-common` payload:
  `{ root_dir?, value: string|null, expected_revision: string }`. A canonical
  HTTP(S) origin sets the common default; only `null` deletes it (empty strings
  are `bad_request`). Root must be registered and revision non-empty. This
  writes neither kv nor queue. Success is
  `{ common_saved: true, common, worker_url }`, including when the follow-up
  root read fails (`worker_url.error.code: 'workspace_unavailable'`). CLI errors
  use the normal error envelope: `revision_conflict`, `invalid_input`,
  `common_invalid`, `common_unavailable`, or `helper_unavailable`. Clients keep
  the draft and its original revision on conflict and never retry automatically.
- `impl-preset-create` payload: `{ expected_revision, name, settings }`;
  `impl-preset-update` adds `id`. `settings` is a sparse 25-key profile: the 14
  per-Bead execution keys, the three general orchestration keys, the five
  `quick_fix_impl_*` keys, and the three `quick_fix_orchestration_*` keys.
  `workflow_mode` is not a preset key. Both mutations validate enum membership
  and the general and quick_fix runtime/model/effort triples; `fast` quick_fix
  implementation speed requires a runner whose catalog exposes that speed tier.
- `apply-impl-preset` payload: `{ id, preset_id, expected_revision }`. It
  replaces the issue's 17 pin keys (three orchestration keys plus 14 session
  keys). For a `route=quick_fix` issue, each orchestration and implementation
  axis uses its `quick_fix_*` preset value before the general value; an exact
  quick_fix model derives its runtime before the general runtime fallback. An
  incompatible projected pin is `impl_preset_incompatible` and no metadata is
  written.
- `apply-impl-preset-global` payload:
  `{ preset_id, expected_revision, expected_queue_revision, root_dir? }`. A
  `lane` field is `bad_request`. One apply replaces all 18 preset-carried kv
  keys and all six general/quick_fix orchestration queue keys; a key absent from
  the sparse preset is unset, so the quick_fix layer falls through to the
  general profile. The kv write and readback happen before the queue CAS and
  remain non-atomic. The response is
  `{ applied, conflict, revision, values, warnings, queue_applied, queue_conflict, queue }`.

  A new client sends a quick_fix apply only when the queue snapshot HAS the
  `quick_fix_orchestration_model` key — the key's presence, not its value, is
  the capability probe. Without it, the client does not send the combined apply
  request to an older server.

`root_dir` is optional on all three (UI-eey2 §9.5). Absent means the
connection's workspace; present means that validated registry workspace, and an
unregistered path is `bad_request`. For `apply-impl-preset-global` this is a
FIX, not only an extension: `root_dir` previously scoped the QUEUE write alone
while the kv read/write/readback stayed on the connection's workspace, so one
profile applied from another repo's panel split across two repos. All three now
address one repo, and a successful write invalidates that repo's monitor
`session_defaults` cache.

## ADR channel (UI-8uz7 §6)

`subscribe-adr` / `unsubscribe-adr` (reply `ok` with `{ id }`) open and close a
SERVER-GLOBAL observation channel: like `subscribe-monitor-pipeline` it is not
scoped to the connection's workspace, and it survives `set-workspace`. The
server pushes `adr-snapshot` with `{ id, workspaces: AdrWorkspaceView[] }`,
where `workspaces` is EVERY visible workspace in the same order the monitor
uses. There are no partial patches — the client replaces its render.

```
AdrWorkspaceView = {
  root_dir, name,                      // name = basename(root_dir)
  name_duplicate: boolean,             // a repo of this name came first
  computing: boolean, computed_at: number | null,
  env_errors: { index: string|null, citations: string|null, candidates: string|null },
  adr_dir_missing: boolean,
  current: AdrRecord[], history: AdrRecord[],
  frontmatter_errors: { file, error }[],
  index_drift: { ok: boolean, detail: string | null } | null,
  citations_stale: CheckerError[],
  candidates: { spec, ok, errors: CheckerError[] }[],
  cross_citations: { file, line, repo, adr, target: { root_dir, status } | null }[]
}
CheckerError = { kind, file, line: number|null, adr: number|string|null, detail }
```

- `env_errors` is PER CHECKER: a failed checker empties only its own result
  (`index_drift: null`, `citations_stale: []`, `candidates: []`) and the table,
  the other checkers' results, and `cross_citations` still ship. A spec's own
  `usage` error is local to that spec's `candidates` row, not an `env_errors`.
- `cross_citations[].target` is joined by the SERVER: the `ADR <repo>/NNNN`
  citation resolves against the visible workspace whose `name` is `repo`, in its
  `current ∪ history`. Unknown repo or unknown number is `null`. On a duplicate
  basename the FIRST workspace is the target and every later one carries
  `name_duplicate: true`.
- Refresh is file-driven, never bd-driven: `fs.watch` on `docs/adr/`,
  `AGENTS.md`, `CLAUDE.md`, `docs/agents/` and `docs/superpowers/specs/` plus a
  fingerprint (`path\0mtimeMs\0size`) comparison, so an unchanged fingerprint
  recomputes nothing. A spawn-free poll every 30 s is the safety net for missed
  events. A workspace still holding an `env_errors` entry is `retry_pending` and
  recomputes once on the next poll even when the fingerprint is unchanged, so a
  transient checker failure cannot become permanent.
- The channel pushes ALL workspaces whenever ONE finishes, because a repo's
  fresh ADR list changes what other repos' `cross_citations[].target` say (join
  only, no recompute on the other side).
- The FIRST subscriber arms one watch per visible workspace, starts a full
  computation each, and is pushed `computing: true` rows immediately.
  `set-workspace-visibility` arms newly visible repos, drops hidden ones, and
  pushes. The LAST unsubscribe (or socket close) drops every watch, timer, and
  cached snapshot.
- On reconnect the client re-sends `subscribe-adr`. If another subscriber kept
  the cache alive it receives the last snapshot immediately; if the cache was
  dropped it receives `computing: true` rows first and the results as they land.
- This channel WRITES nothing — not bd, not files, not kv.

## Preset comparison channel (preset-compare §3.5)

- `get-compare` payload:
  `{ range?, since?, until?, root_dirs?, routes?, include_bench?, group_by?, problem_criteria? }`
  — replies with a `compare-snapshot` envelope carrying
  `{ summary, groups, rows, workspaces, runs, bench_rows, warnings, criteria }`.
  `problem_criteria` may be a partial object; malformed or absent values are
  normalized to server defaults without a `bad_request`. This request/response
  pair reads attempts, workspace issue snapshots and one timeline per bead on
  demand; it does not subscribe or push updates.
- `range` bounds `finished_at` with a `COMPARE_RANGE_OPTIONS` value (default
  `30d`); unknown values mean all history. With `custom`, `since` is an
  inclusive lower bound and `until` is an exclusive upper bound in epoch ms; an
  absent or non-finite boundary is unrestricted. The client converts chosen
  dates at local midnight and sends the midnight after the end date as `until`.
  Preset ranges ignore carried `since` and `until` values. `root_dirs` are
  absolute registry paths, `routes` restricts routes, and `include_bench`
  defaults to false. Legacy `issue_types` is accepted and ignored. `group_by` is
  `preset` (default, also for invalid values), `orchestration`, or `impl_actor`.
- One `rows[]` entry is one terminal implementation attempt, excluding review
  sessions and retired kinds. It retains identity, issue, route, status, cause,
  `verify`, `review`, `usage`, `duration_ms`, `is_retry`, `is_bench`,
  `started_at` and `finished_at`. It adds:
  - `outcome: { kind, evidence, head_sha?, pr_url? }`, where kind is
    `landed|failed|aborted|parked|superseded|waiting|unknown|in_flight`.
    Failed/orphaned and aborted statuses take precedence; earlier done attempts
    are superseded. The latest done (finish time, then greatest attempt id)
    lands through no-change evidence, a successful quick-fix push, or a closed
    issue. A missing issue is unknown; an otherwise open issue is in flight.
    Review and merge verification facts attach only to that representative.
  - `retry_kind: 'env_ladder'|'auto_resume'|'resume'|null` and
    `problems: { failed, retry, review, human, verify, duration, cost, pin, evidence }`.
    The eight booleans are judged only by the normalized request criteria.
    Evidence carries the outcome cause/status, retry origin/kind/cause, review
    counts, selected event summaries, verify source, duration/cost value and
    baseline, and deviated preset keys. Any true key makes one problem session.
    Environment retries and events are excluded by default and included only by
    their toggles.
  - `preset: { id, name, basis, deviated_keys }|null`; basis is `recorded` or
    `inferred`. Recorded ids use the current name, or the recorded name plus
    `(삭제됨)` when deleted. Inference compares route-effective orchestration
    and delegated executor axes using catalog-normalized model names. Equally
    specific matches remain null. Unmatched rows additionally carry
    `preset_candidates: string[]`.
  - `orchestration: { model, effort }`,
    `impl_actor: { kind, label, model, effort, parts? }` with `kind` one of
    `delegated`, `main`, `missing` or `mixed` and `parts` present only on
    `mixed`, and `composition: "<model>/<effort> → <impl_actor.label>"` with
    missing axes labeled `미기록`. Main rows omit `signature`, `signature_parts`
    and `verify_source`.
- Groups use `preset:<id>` or `sig:<composition>` keys on the preset axis,
  `<model>/<effort>` on orchestration, and `main`, executor label, `미기록`, or
  `mixed:<distinct unit executor labels sorted and joined with +>` on
  implementation — the mixed group's `name` is the mixed label, so two cards can
  share a name while their keys differ. Each contains `key`, `name`,
  `badge: 'preset'|'unmatched'|'none'`, `n`, `issue_count`,
  `compositions: { composition, count }[]` (count descending), `landed`,
  `judged`, `in_flight`, `landing_rate`, `problem_count`, `problem_rate`,
  `problems: { failed, retry, review, human, verify, duration, cost, pin }`
  (counts), `duration_ms`, `cost_usd`, `tokens`, `best`, and `attempt_ids`.
  Landing rate is landed / (landed + failed + aborted), null with no judged
  sample. In-flight count includes in-flight, waiting and parked only. Problem
  rate is problem sessions / n, null for an empty summary or when every
  criterion is off. Numeric aggregates carry `{ mean, median, sample, total }`;
  absent values do not enter the sample, and empty samples have null
  mean/median. Cost additionally carries `partial_count`.
- `summary` aggregates the entire filtered row set with the same statistics (no
  group identity or `best`). A group with n ≥ 3 and judged ≥ 3 can earn
  `best: ('landing'|'duration'|'cost')[]` for unique highest landing rate,
  lowest mean duration or lowest mean cost; ties earn nothing. Groups arrive
  sorted by descending landing rate (null last), then ascending mean cost (null
  last). Other sorts are client-owned. The main groups omit the former
  success-rate, verification-sample, pass-caret, failure/retry-count and
  review-stat aggregate fields.
- Missing timeline, receipt or usage evidence fails quiet. An unreadable preset
  store yields `warnings: ['preset_store_unreadable']`, all presets null and
  empty candidate lists; a readable store yields `warnings: []`. Projection
  failure retains the existing error reply and refresh flow.
- `criteria` is `{ effective, is_default, baselines }`. `effective` is the full
  normalized criteria used by the projection. `baselines` is
  `{ duration_ms: { median, sample, active }, cost_usd: { median, sample, active, partial_count } }`;
  both medians use the filtered main rows and become active at five
  value-bearing rows. Bench rows use those same baselines.
- `runs[]` and `bench_rows[]` are the experiment half of the same answer (§4.7).
  `runs` is every visible workspace's run manifests, newest first; `bench_rows`
  is every bench clone row of every visible workspace, deliberately NOT narrowed
  by the request's filters, so choosing an experiment can never show an empty
  table because the main table's period was narrower. There is no second op and
  no second call: §3.5 enumerates the three ops this design adds.
- One `runs[]` entry is its immutable manifest (`run_id`, `source_bead_id`,
  `base_sha`, `presets` with their `resolved_tuple`, `repeats`, `reviewer_mode`,
  `reviewer`, `delegate_forced`, `created_at`) plus `root_dir`, `cell_count` /
  `terminal_count` and a `cells[]` whose per-cell `status`, `attempt_id`,
  `done_kind`, `bench_verify` and `terminal` are PROJECTED from that clone
  bead's attempt records on every read. `terminal` is the shared §4.6 judgment:
  the clone bead is closed AND no attempt sits in a resumable status. The
  manifest itself is never rewritten, so there is no second result ledger to
  keep in step with attempt history.

## Bench experiment creation (preset-compare §4.3)

- `bench-run-create` payload:
  `{ source_id, preset_ids: string[], repeats: 1..5, reviewer_mode: 'fixed'|'preset', reviewer?, root_dir? }`
  — replies `ok` with `{ run }`, the run manifest that was just written. The
  source must be a `route=quick_fix` bead carrying `quick_fix_review`; anything
  else is refused rather than cloned (§4.1·§6). `reviewer_mode: 'fixed'`
  requires `reviewer.impl_review_model` / `impl_review_effort` /
  `impl_review_speed`, which overwrite that triple on every cell; `'preset'`
  leaves each preset's own reviewer keys in place.
- `root_dir` is optional and, when present, must be the connection's own
  workspace: this op WRITES beads, so it may not be steered at a workspace the
  connection did not select.
- Creation is one fail-closed unit. The workspace base tip is read first
  (`bench_base_unreadable` when it cannot be), each preset is resolved into a
  complete execution tuple and checked for completeness and vocabulary
  (`bench_tuple_unresolved` when it cannot be), and a clone that cannot be
  created, stamped or QUEUED into the parallel lane aborts the experiment: every
  clone already created is closed with `bench:<run_id>:aborted`, no manifest is
  written, the error's `details.aborted` names the beads whose close was
  confirmed by readback, and `details.residue` names the ones that could not be
  confirmed and are left for the operator.
- Each created clone is placed into the workspace's parallel waiting lane
  through the same `worker-queue-place` body a person's click uses (§4.4), so an
  admission refusal aborts the experiment rather than leaving a cell that will
  never run.

## Removed (historical)

`list-issues`, `epic-status`, `list-ready`, `subscribe-updates` /
`issues-changed`, and `update-workflow-settings` were removed. Use the
subscription push protocol and `update-exec-settings` instead.

## Errors

Errors follow `{ code, message, details? }`. Common codes: `bad_request`
(malformed payload / unknown type), `not_found`, `bd_error`, `unknown_type`.
