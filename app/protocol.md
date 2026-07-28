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
  metadata (the 5 keys + `workflow_mode`; `workflow_mode='standard'` unsets the
  override key). Replaces the removed v3 `update-workflow-settings`.
- `create-issue` payload: `{ title, type?, priority?, description? }`
- `delete-issue` payload: `{ id }`
- `dep-add` / `dep-remove` payload: `{ a, b, view_id? }` (`a` depends on `b`).
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

## Worker queue channel (worker-phase2 §3/§4/§6)

Per-workspace subscription + CAS-guarded mutations + a whole-queue push.

There is ONE waiting lane. The retired serial/parallel split is replaced by a
single `queue` plus a `slots` concurrency cap (`slots: 1` is the old serial
meaning), and completion is decided by the SERVER OBSERVING an open PR, not by
the session's self-report — so a bead moves `queue` → `pr_wait` → `done`.
Nothing merges without a human `[머지]` click.

- `subscribe-worker-queue` / `unsubscribe-worker-queue` payload: `{ id }`.
- `worker-queue-snapshot` (push) payload:
  `{ type: 'worker-queue-snapshot', id, root_dir, queue }` — `root_dir` is the
  workspace this snapshot describes (envelope addressing, not part of `queue`),
  so a client that already repointed to another workspace can drop a snapshot
  from a subscription the server has not torn down yet; the rest is the full
  queue (`revision`, `auto_advance`, `slots`, `queue[]`, `pr_wait[]`, `done[]`,
  `attempts`, `admission`, `cleanup_failed`, `exec_defaults`) plus three
  server-decorated, NON-persisted keys: `workspace_info: { verify_cmd, slots }`,
  `pr_observations` (per-`pr_wait` PR state + merge-gate verdict, memory cache
  only), and `bead_titles` (`Record<bead_id, title>` for the
  `queue`/`pr_wait`/`done` beads, memory cache only). `bead_titles` is PARTIAL:
  only titles already cached travel, a miss simply has no entry and arrives in a
  later snapshot once the server's async lookup fills it. Consumers fail-quiet
  on the whole key being absent (older server) and on a missing entry — both
  fall back to displaying the bead id.
- `worker-queue-place` payload: `{ bead_id, index?, expected_revision }` — a
  successful placement also kicks the live dispatch loop (`tick`), so an
  auto_advance-ON queue with a free slot starts the bead without waiting for
  another trigger.
- `worker-queue-reorder` payload: `{ bead_id, to_index, expected_revision }`
- `worker-queue-toggle` payload: `{ on, expected_revision }` — persists
  `auto_advance` and, on turn-ON, kicks the live dispatch loop (`tick`).
- `worker-queue-set-slots` payload: `{ slots, expected_revision }` — the
  concurrency cap (lower bound 1).
- `worker-queue-set-exec-default` payload:
  `{ key: <one of the 5 exec keys>, value: string|null, expected_revision }` —
  workspace-global exec default; null/`''` unsets.
- `worker-queue-remove` payload: `{ bead_id, expected_revision }`
- `worker-attempt-pause` / `worker-attempt-stop` payload: `{ attempt_id }` —
  pauses (⏸) or discards (■) a running attempt (group-kill + `workflow_mode`
  revert); stop replies `{ attempt_id, stopped }`.
- `worker-attempt-resume` payload: `{ attempt_id, expected_revision }` — ▶ on a
  paused/failed/orphaned attempt; cap-exempt (human-originated).
- `worker-attempt-dismiss` payload: `{ attempt_id, expected_revision }` — the
  failure banner's ✕: stamps `dismissed_at` on a `failed`/`orphaned` attempt so
  it stops reading as an unhandled failure. Reply
  `{ attempt_id, dismissed, conflict, reason, queue }`; `reason` is
  `attempt_not_found` / `not_dismissable` / `already_dismissed`.
- `worker-merge-queue-add` payload: `{ bead_id, expected_revision }` — the
  `[머지]` click (UI-5v7d §3). It QUEUES rather than merges: the durable
  `merge_queue` is FIFO and one server-side driver merges its head, so two
  clicks never merge at once. Everything the direct click used to derive stays
  in the driver's `merge()` call — click-time `gh` re-read, gate re-evaluation
  against the observed head SHA, BEHIND update-branch, DIRTY resolution dispatch
  — so the snapshot badges remain ADVISORY. Reply:
  `{ bead_id, applied, conflict, queued, queue }`; queuing a bead that is
  already queued is a no-op (`applied:false`).
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
  (`[{ bead_id, resolution_rounds }]`, durable order) plus a non-persisted
  `merge_queue_state` = `{ active, failures }` — which item the driver is on and
  why each skipped one failed.
- `worker-pr-discard` payload: `{ bead_id, expected_revision }` — `[폐기]`:
  re-read the PR state authoritatively, close it when it is still OPEN (`MERGED`
  refuses with `pr_already_merged`, an unreadable state fails closed), put bd
  back to `open` without `pr_url`, discard the worktree/branch, and REMOVE the
  bead from `pr_wait`. It is NOT re-queued and nothing is dispatched — the bead
  reappears in the candidate lane and re-running it is a drag back into 대기,
  which re-passes admission. Reply `{ bead_id, discarded, conflict, reason }`.

Every queue mutation replies `{ applied, conflict, queue }`; a stale
`expected_revision` yields `conflict:true` + the current queue for re-sync.

## Session-log (transcript) channel (spec §5.6)

Streams a per-attempt raw runner event stream to the transcript viewer.

- `subscribe-session-log` payload: `{ id: client_id, attempt_id }` — replies
  `ok`, then pushes a `session-log-snapshot`; a live attempt then pushes
  `session-log-append` per new event. A Done/Failed attempt is snapshot-only.
- `unsubscribe-session-log` payload: `{ id: client_id }`.
- `session-log-snapshot` (push) payload: `{ id, attempt_id, lines:[…] }` — the
  persisted raw jsonl events.
- `session-log-append` (push) payload: `{ id, attempt_id, event }` — one raw
  event.

## Removed (historical)

`list-issues`, `epic-status`, `list-ready`, `subscribe-updates` /
`issues-changed`, and `update-workflow-settings` were removed. Use the
subscription push protocol and `update-exec-settings` instead.

## Errors

Errors follow `{ code, message, details? }`. Common codes: `bad_request`
(malformed payload / unknown type), `not_found`, `bd_error`, `unknown_type`.
